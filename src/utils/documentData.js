// Agreement documents are JSON data: cloning keeps updates and imports isolated.
export function clone(value) {
  return JSON.parse(JSON.stringify(value));
}
export function updateAtPath(document, path, value) {
  const next = clone(document);
  const keys = path.split('.');
  let target = next;
  for (const key of keys.slice(0, -1)) target = target[key];
  target[keys[keys.length - 1]] = value;
  return next;
}
