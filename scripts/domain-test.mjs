import assert from 'node:assert/strict';
import { test } from 'node:test';
import { EMPTY_PROJECT, PROJECT_STAGES } from '../lib/config/workspace.js';
import { normalizeProject, applyProjectAction } from '../lib/domain/projects.js';
import { handleStoryAction } from '../lib/server/stories.js';
import { updateAtPath } from '../src/utils/documentData.js';
import { mergeAgreement } from '../src/utils/storage.js';
import { formatCurrency, numericValue, formatDate, safeFileName } from '../src/utils/formatters.js';

test('project validation and lifecycle preserve records and reject invalid input', () => {
  const db = { board: [], stories: [] };
  const item = { ...EMPTY_PROJECT, name: ' Kitchen ', client: ' Client ' };
  applyProjectAction(db, 'save', item);
  assert.equal(db.board[0].name, 'Kitchen');
  assert.equal(db.board[0].client, 'Client');
  const id = db.board[0].id;
  for (const status of PROJECT_STAGES) applyProjectAction(db, 'save', { ...item, id, status });
  assert.equal(db.board.length, 1);
  assert.equal(db.board[0].status, 'Completed');
  for (const invalid of [
    { name: '' },
    { status: 'Unknown' },
    { priority: 'Urgent' },
    { due: 'tomorrow' },
  ]) {
    assert.throws(() => normalizeProject({ ...item, ...invalid }));
  }
  assert.throws(() => applyProjectAction(db, 'invalid', item));
  applyProjectAction(db, 'delete', { id });
  assert.equal(db.board.length, 0);
});

function storyForm(values = {}) {
  const form = new FormData();
  for (const [key, value] of Object.entries({
    action: 'save',
    id: 'test-story',
    title: 'Kitchen',
    description: 'Oak doors',
    keep: '[]',
    ...values,
  }))
    form.set(key, value);
  return form;
}
function memoryStories() {
  const db = { stories: [] };
  const uploaded = [];
  const adapters = {
    mutateStore: async (update) => {
      const next = structuredClone(db);
      const result = await update(next);
      db.stories = next.stories;
      return result;
    },
    saveMedia: async (files, title) => {
      uploaded.push(...files);
      return files.map((file, index) => ({
        name: `test-${index}.png`,
        type: file.type,
        alt: title,
      }));
    },
  };
  return { db, uploaded, adapters };
}

test('story service supports draft, upload, publication, edit and delete with injected storage', async () => {
  const { db, adapters } = memoryStories();
  await handleStoryAction(storyForm(), adapters);
  assert.equal(db.stories[0].published, false);
  const createdAt = db.stories[0].createdAt;
  const upload = storyForm({ published: 'true' });
  upload.append('media', new Blob(['test'], { type: 'image/png' }), 'test.png');
  await handleStoryAction(upload, adapters);
  assert.equal(db.stories[0].published, true);
  assert.equal(db.stories[0].media.length, 1);
  await handleStoryAction(storyForm({ title: 'Updated', keep: '["test-0.png"]' }), adapters);
  assert.equal(db.stories.length, 1);
  assert.equal(db.stories[0].createdAt, createdAt);
  assert.equal(db.stories[0].media.length, 1);
  assert.equal(db.stories[0].published, false);
  await handleStoryAction(storyForm({ action: 'delete' }), adapters);
  assert.equal(db.stories.length, 0);
});

test('story validation rejects unsupported uploads, invalid selections and publication without media', async () => {
  const { db, uploaded, adapters } = memoryStories();
  await assert.rejects(
    handleStoryAction(storyForm({ published: 'true' }), adapters),
    /photograph or video/,
  );
  await assert.rejects(
    handleStoryAction(storyForm({ title: '' }), adapters),
    /title and a description/,
  );
  await assert.rejects(handleStoryAction(storyForm({ keep: '{}' }), adapters), /Invalid media/);
  const upload = storyForm();
  upload.append('media', new Blob(['test'], { type: 'text/plain' }), 'test.txt');
  await assert.rejects(handleStoryAction(upload, adapters), /Use JPG/);
  assert.equal(uploaded.length, 0);
  assert.equal(db.stories.length, 0);
});

test('document updates preserve original state and exported row overrides', () => {
  const source = { appendix: { joinery: { rows: [{ rate: '100', areaOverride: '2.5' }] } } };
  const edited = updateAtPath(source, 'appendix.joinery.rows.0.amountOverride', '300');
  assert.equal(source.appendix.joinery.rows[0].amountOverride, undefined);
  assert.equal(edited.appendix.joinery.rows[0].areaOverride, '2.5');
  assert.deepEqual(mergeAgreement(source, JSON.parse(JSON.stringify(edited))), edited);
});

test('shared formatting preserves currency, missing values, dates and file names', () => {
  assert.equal(formatCurrency(''), '[Insert amount]');
  assert.equal(formatCurrency('0'), '$0.00');
  assert.equal(formatCurrency('1234.5'), '$1,234.50');
  assert.equal(numericValue('$1,234.50'), 1234.5);
  assert.equal(numericValue('invalid'), 0);
  assert.equal(formatDate('2026-11-05'), '5 November 2026');
  assert.equal(safeFileName('Example Client'), 'Example-Client');
});
