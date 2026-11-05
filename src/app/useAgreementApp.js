import { useEffect, useState } from 'react';
import { clearSavedAgreement, mergeAgreement } from '../utils/storage.js';
import { calculateInstallationQuotation } from '../editors/installation/utils/installationQuotationCalculations.js';
import { ACTIVE_EDITOR_KEY, VALID_EDITORS } from './constants.js';
import { editorConfigs } from './editorConfig.js';
import { useAgreementDocument } from './useAgreementDocument.js';
import { clone } from '../utils/documentData.js';

export function useAgreementApp() {
  const [hasEnteredApp, setHasEnteredApp] = useState(false);
  const [activeEditor, setActiveEditor] = useState(() => {
    const saved = window.localStorage.getItem(ACTIVE_EDITOR_KEY);
    return VALID_EDITORS.has(saved) ? saved : 'supply';
  });
  const [savedAt, setSavedAt] = useState('');
  const supply = useAgreementDocument(editorConfigs.supply, setSavedAt);
  const preliminary = useAgreementDocument(editorConfigs.preliminary, setSavedAt);
  const installation = useAgreementDocument(editorConfigs.installation, setSavedAt);
  const { data: installationData, setData: setInstallationData } = installation;

  useEffect(() => {
    window.localStorage.setItem(ACTIVE_EDITOR_KEY, activeEditor);
  }, [activeEditor]);

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
  }, [installationData.installationQuotation, setInstallationData]);

  const editors = { supply, preliminary, installation };

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
        active.setData(active.migrate(merged));
      } catch (error) {
        console.error(error);
        window.alert('The selected JSON file could not be read. / 无法读取所选 JSON 文件。');
      }
    };
    reader.readAsText(file);
    event.target.value = '';
  }

  function resetTemplate() {
    const confirmed = window.confirm(
      'Reset the current agreement to its original template? / 是否重置当前协议模板？',
    );
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
