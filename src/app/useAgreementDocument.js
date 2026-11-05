import { useEffect, useMemo, useState } from 'react';
import { loadAgreement, saveAgreement } from '../utils/storage.js';
import { clone, updateAtPath } from '../utils/documentData.js';

export function useAgreementDocument(config, onSaved) {
  const [data, setData] = useState(() =>
    config.migrate(loadAgreement(config.storageKey, clone(config.defaultData))),
  );
  const update = useMemo(
    () => (path, value) => setData((current) => updateAtPath(current, path, value)),
    [],
  );
  useEffect(() => {
    saveAgreement(config.storageKey, data);
    onSaved(
      new Intl.DateTimeFormat('en-AU', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      }).format(new Date()),
    );
  }, [config, data, onSaved]);
  return { data, setData, update, ...config };
}
