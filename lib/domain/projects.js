import { randomUUID } from 'node:crypto';
import { PROJECT_STAGES, PROJECT_PRIORITIES } from '../config/workspace.js';

export function normalizeProject(item) {
  if (!item || typeof item !== 'object') throw Error('Invalid project.');
  const text = (v, max = 200) =>
    String(v || '')
      .trim()
      .slice(0, max);
  const entry = {
    id: text(item.id) || randomUUID(),
    name: text(item.name),
    client: text(item.client),
    owner: text(item.owner),
    due: text(item.due, 10),
    status: text(item.status),
    priority: text(item.priority),
    notes: text(item.notes, 2000),
  };
  if (!entry.name) throw Error('Project name is required.');
  if (!PROJECT_STAGES.includes(entry.status)) throw Error('Invalid status.');
  if (!PROJECT_PRIORITIES.includes(entry.priority)) throw Error('Invalid priority.');
  if (entry.due && !/^\d{4}-\d{2}-\d{2}$/.test(entry.due)) throw Error('Invalid date.');
  return entry;
}

export function applyProjectAction(db, action, item) {
  if (!item || typeof item !== 'object') throw Error('Invalid project.');
  if (action === 'delete') {
    db.board = db.board.filter((project) => project.id !== item.id);
    return db;
  }
  if (action !== 'save') throw Error('Unknown action.');
  const entry = normalizeProject(item);
  const index = db.board.findIndex((project) => project.id === entry.id);
  if (index < 0) db.board.push(entry);
  else db.board[index] = entry;
  return db;
}
