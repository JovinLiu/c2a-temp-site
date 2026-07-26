export function mergeAgreement(defaultValue, savedValue) {
  if (Array.isArray(defaultValue)) {
    return Array.isArray(savedValue) ? savedValue : defaultValue;
  }

  if (defaultValue && typeof defaultValue === 'object') {
    const source = savedValue && typeof savedValue === 'object' ? savedValue : {};
    return Object.fromEntries(
      Object.entries(defaultValue).map(([key, value]) => [
        key,
        mergeAgreement(value, source[key]),
      ]),
    );
  }

  return savedValue === undefined || savedValue === null ? defaultValue : savedValue;
}

export function loadAgreement(storageKey, fallback) {
  try {
    const raw = window.localStorage.getItem(storageKey);
    return raw ? mergeAgreement(fallback, JSON.parse(raw)) : fallback;
  } catch (error) {
    console.warn('Could not load saved agreement:', error);
    return fallback;
  }
}

export function saveAgreement(storageKey, data) {
  try {
    window.localStorage.setItem(storageKey, JSON.stringify(data));
  } catch (error) {
    console.warn('Could not save agreement:', error);
  }
}

export function clearSavedAgreement(storageKey) {
  window.localStorage.removeItem(storageKey);
}
