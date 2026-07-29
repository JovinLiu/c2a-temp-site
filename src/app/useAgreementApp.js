import { useEffect, useMemo, useState } from 'react';
import { clearSavedAgreement, loadAgreement, mergeAgreement, saveAgreement } from '../utils/storage.js';
import { calculateInstallationQuotation } from '../editors/installation/utils/installationQuotationCalculations.js';
import { ACTIVE_EDITOR_KEY, VALID_EDITORS } from './constants.js';
import { editorConfigs } from './editorConfig.js';
import { migrateInstallationAgreement, migrateSupplyAgreement } from './migrations.js';

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function createUpdater(setData) {
  return (path, value) => {
    setData((current) => {
      const next = clone(current);
      const keys = path.split('.');
      let target = next;

      keys.slice(0, -1).forEach((key) => {
        target = target[key];
      });

      target[keys[keys.length - 1]] = value;
      return next;
    });
  };
}

function savedTime() {
  return new Intl.DateTimeFormat('en-AU', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }).format(new Date());
}

export function useAgreementApp() {
  const [hasEnteredApp, setHasEnteredApp] = useState(false);
  const [activeEditor, setActiveEditor] = useState(() => {
    const saved = window.localStorage.getItem(ACTIVE_EDITOR_KEY);
    return VALID_EDITORS.has(saved) ? saved : 'supply';
  });
  const [supplyData, setSupplyData] = useState(() =>
    migrateSupplyAgreement(loadAgreement(editorConfigs.supply.storageKey, clone(editorConfigs.supply.defaultData))),
  );
  const [preliminaryData, setPreliminaryData] = useState(() =>
    loadAgreement(editorConfigs.preliminary.storageKey, clone(editorConfigs.preliminary.defaultData)),
  );
  const [installationData, setInstallationData] = useState(() =>
    migrateInstallationAgreement(
      loadAgreement(editorConfigs.installation.storageKey, clone(editorConfigs.installation.defaultData)),
    ),
  );
  const [savedAt, setSavedAt] = useState('');

  const updateSupply = useMemo(() => createUpdater(setSupplyData), []);
  const updatePreliminary = useMemo(() => createUpdater(setPreliminaryData), []);
  const updateInstallation = useMemo(() => createUpdater(setInstallationData), []);

  useEffect(() => {
    window.localStorage.setItem(ACTIVE_EDITOR_KEY, activeEditor);
  }, [activeEditor]);

  useEffect(() => {
    saveAgreement(editorConfigs.supply.storageKey, supplyData);
    setSavedAt(savedTime());
  }, [supplyData]);

  useEffect(() => {
    saveAgreement(editorConfigs.preliminary.storageKey, preliminaryData);
    setSavedAt(savedTime());
  }, [preliminaryData]);

  useEffect(() => {
    saveAgreement(editorConfigs.installation.storageKey, installationData);
    setSavedAt(savedTime());
  }, [installationData]);

  useEffect(() => {
    const calculation = calculateInstallationQuotation(installationData.installationQuotation);
    if (!calculation.hasCalculatedFee) return;

    const calculatedContractSum = calculation.totalFee.toFixed(2);
    setInstallationData((current) => {
      if (String(current.commercial.contractSum ?? '') === calculatedContractSum) return current;
      return {
        ...current,
        commercial: {
          ...current.commercial,
          contractSum: calculatedContractSum,
        },
      };
    });
  }, [installationData.installationQuotation]);

  const editors = {
    supply: {
      data: supplyData,
      setData: setSupplyData,
      update: updateSupply,
      ...editorConfigs.supply,
    },
    preliminary: {
      data: preliminaryData,
      setData: setPreliminaryData,
      update: updatePreliminary,
      ...editorConfigs.preliminary,
    },
    installation: {
      data: installationData,
      setData: setInstallationData,
      update: updateInstallation,
      ...editorConfigs.installation,
    },
  };

  const active = editors[activeEditor] || editors.supply;

  function exportJson() {
    const safeName = active.safeFileName(active.data.client.name);
    const blob = new Blob([JSON.stringify(active.data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = `${active.filePrefix}-${safeName}.json`;
    anchor.click();
    URL.revokeObjectURL(url);
  }

  function importJson(event) {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(reader.result);
        const merged = mergeAgreement(clone(active.defaultData), parsed);
        active.setData(
          activeEditor === 'supply'
            ? migrateSupplyAgreement(merged)
            : activeEditor === 'installation'
              ? migrateInstallationAgreement(merged)
              : merged,
        );
      } catch (error) {
        console.error(error);
        window.alert('The selected JSON file could not be read. / 无法读取所选 JSON 文件。');
      }
    };
    reader.readAsText(file);
    event.target.value = '';
  }

  function resetTemplate() {
    const confirmed = window.confirm('Reset the current agreement to its original template? / 是否重置当前协议模板？');
    if (!confirmed) return;
    clearSavedAgreement(active.storageKey);
    active.setData(clone(active.defaultData));
  }

  return {
    activeEditor,
    setActiveEditor,
    active,
    hasEnteredApp,
    setHasEnteredApp,
    savedAt,
    exportJson,
    importJson,
    resetTemplate,
  };
}
