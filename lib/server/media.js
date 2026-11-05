import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { randomUUID } from 'node:crypto';
import { dataDir } from './store.js';
import { MEDIA_FORMATS } from '../config/workspace.js';

export async function saveMedia(files, title) {
  const media = [];
  await mkdir(path.join(dataDir, 'media'), { recursive: true });
  for (const f of files) {
    const name = randomUUID() + '.' + MEDIA_FORMATS[f.type];
    await writeFile(path.join(dataDir, 'media', name), Buffer.from(await f.arrayBuffer()));
    media.push({ name, type: f.type, alt: title });
  }
  return media;
}
