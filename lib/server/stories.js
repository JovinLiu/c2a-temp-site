import { randomUUID } from 'node:crypto';
import { mutateStore as defaultMutateStore } from './store.js';
import { saveMedia as defaultSaveMedia } from './media.js';
import { MEDIA_FORMATS, MEDIA_LIMITS } from '../config/workspace.js';

// Explicit adapters let tests use memory storage; HTTP and filesystem details stay outside the workflow.
export async function handleStoryAction(
  form,
  { mutateStore = defaultMutateStore, saveMedia = defaultSaveMedia } = {},
) {
  const action = form.get('action');
  const id = String(form.get('id') || randomUUID());
  if (action === 'delete') {
    return await mutateStore((db) => {
      db.stories = db.stories.filter((s) => s.id !== id);
      return db.stories;
    });
  }
  if (action !== 'save') throw Error('Invalid action.');
  const title = String(form.get('title') || '')
    .trim()
    .slice(0, 160);
  const description = String(form.get('description') || '')
    .trim()
    .slice(0, 4000);
  if (!title || !description) throw Error('Add a title and a description.');
  const files = form.getAll('media').filter((f) => typeof f !== 'string' && f.size);
  if (
    files.length > MEDIA_LIMITS.count ||
    files.reduce((s, f) => s + f.size, 0) > MEDIA_LIMITS.uploadBytes
  )
    throw Error('Upload up to 12 files, totalling no more than 60 MB.');
  for (const f of files) {
    if (!MEDIA_FORMATS[f.type] || f.size > MEDIA_LIMITS.fileBytes)
      throw Error('Use JPG, PNG, WebP, MP4 or WebM files up to 50 MB each.');
  }
  const media = await saveMedia(files, title);
  const stories = await mutateStore((db) => {
    const old = db.stories.find((s) => s.id === id);
    const keep = JSON.parse(String(form.get('keep') || '[]'));
    if (!Array.isArray(keep)) throw Error('Invalid media selection.');
    const selected = [...(old?.media || []).filter((m) => keep.includes(m.name)), ...media];
    if (selected.length > MEDIA_LIMITS.count) throw Error('A story can have up to 12 media files.');
    if (form.get('published') === 'true' && !selected.length)
      throw Error('Add a photograph or video before publishing.');
    const story = {
      id,
      title,
      description,
      location: String(form.get('location') || '').slice(0, 160),
      category: String(form.get('category') || 'Whole-home cabinetry').slice(0, 100),
      published: form.get('published') === 'true',
      media: selected,
      createdAt: old?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    db.stories = old ? db.stories.map((s) => (s.id === id ? story : s)) : [story, ...db.stories];
    return db.stories;
  });
  return stories;
}
