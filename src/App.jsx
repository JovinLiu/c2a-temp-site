import { useEffect, useMemo, useState } from 'react';
import SupplyAgreementPreview from './editors/supply/components/AgreementPreview.jsx';
import SupplySidebar from './editors/supply/components/Sidebar.jsx';
import { defaultAgreement as defaultSupplyAgreement } from './editors/supply/data/defaultAgreement.js';
import { safeFileName as safeSupplyFileName } from './editors/supply/utils/formatters.js';
import PreliminaryAgreementPreview from './editors/preliminary/components/AgreementPreview.jsx';
import PreliminarySidebar from './editors/preliminary/components/Sidebar.jsx';
import { defaultAgreement as defaultPreliminaryAgreement } from './editors/preliminary/data/defaultAgreement.js';
import { safeFileName as safePreliminaryFileName } from './editors/preliminary/utils/formatters.js';
import InstallationAgreementPreview from './editors/installation/components/AgreementPreview.jsx';
import InstallationSidebar from './editors/installation/components/Sidebar.jsx';
import { defaultAgreement as defaultInstallationAgreement } from './editors/installation/data/defaultAgreement.js';
import { safeFileName as safeInstallationFileName } from './editors/installation/utils/formatters.js';
import { calculateInstallationQuotation } from './editors/installation/utils/installationQuotationCalculations.js';
import { clearSavedAgreement, loadAgreement, mergeAgreement, saveAgreement } from './utils/storage.js';

const SUPPLY_STORAGE_KEY = 'c2a-supply-installation-agreement-v1.9';
const PRELIMINARY_STORAGE_KEY = 'c2a-preliminary-design-agreement-v1.2';
const INSTALLATION_STORAGE_KEY = 'c2a-joinery-installation-agreement-v1.0';
const ACTIVE_EDITOR_KEY = 'c2a-active-agreement-editor-v3';
const VALID_EDITORS = new Set(['preliminary', 'supply', 'installation']);

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

const OLD_SECOND_PAYMENT_CALCULATIONS = new Set([
  '',
  '50% of the Joinery Product Price and Stone Product Price, plus 50% of the estimated Sea and Land Transport Cost',
]);
const OLD_SECOND_PAYMENT_CALCULATIONS_ZH = new Set([
  '',
  '全屋定制产品价格及石材产品价格的 50%，另加预计海运及陆运费用的 50%',
]);
const OLD_THIRD_PAYMENT_CALCULATIONS = new Set([
  '',
  'The outstanding balance of all Joinery and Stone Product Prices, together with any outstanding balance of the final Sea and Land Transport Cost',
  '50% of the combined Joinery Product Price, Stone Product Price and estimated Sea and Land Transport Cost',
]);
const OLD_THIRD_PAYMENT_CALCULATIONS_ZH = new Set([
  '',
  '全部全屋定制及石材产品费用的剩余余额，以及最终海运及陆运费用的任何未付余额',
  '全屋定制产品价格、石材产品价格及预计海运和陆运费用合计金额的 50%',
]);
const OLD_THIRD_PAYMENT_TIMINGS = new Set([
  '',
  'On the day all products are delivered to the project site, the Client must pay the outstanding balance so that all Joinery and Stone Product Prices are paid in full. Any outstanding balance of the final sea and land transport charge is also payable on that day.',
]);
const OLD_THIRD_PAYMENT_TIMINGS_ZH = new Set([
  '',
  '在全部产品交付至项目现场当天，客户必须支付全部未付产品款，使全屋定制及石材产品费用全部结清。最终海运及陆运费用如有任何未付余额，也应于当天支付。',
]);


const OLD_INSTALLATION_SCOPE_14_EN = new Set([
  'Unless otherwise agreed in writing, the installation works do not include joinery transportation, sinks, tapware, power outlets, silicone sealing or caulking, or works by other trades.',
  'Unless otherwise agreed in writing, the installation works do not include joinery transportation; installation of stone benchtops, stone splashbacks or other stonework; sinks; tapware; power outlets; silicone sealing or caulking; or works by other trades.',
]);
const OLD_INSTALLATION_SCOPE_14_ZH = new Set([
  '除非双方另有书面约定，安装工作不包括全屋定制产品运输、水槽、水龙头、电源插座、硅胶密封或填缝，以及其他工种的工作。',
  '除非双方另有书面约定，安装工作不包括全屋定制产品运输、石头台面、石头背板等石材安装、水槽、水龙头、电源插座、硅胶密封或填缝，以及其他工种的工作。',
]);

function migrateSupplyAgreement(value) {
  const next = clone(value);
  const secondPayment = next.paymentStages?.[1];
  const thirdPayment = next.paymentStages?.[2];
  const defaultSecondPayment = defaultSupplyAgreement.paymentStages[1];
  const defaultThirdPayment = defaultSupplyAgreement.paymentStages[2];

  if (secondPayment && defaultSecondPayment) {
    if (OLD_SECOND_PAYMENT_CALCULATIONS.has(secondPayment.calculation ?? '')) {
      secondPayment.calculation = defaultSecondPayment.calculation;
    }

    if (OLD_SECOND_PAYMENT_CALCULATIONS_ZH.has(secondPayment.calculationZh ?? '')) {
      secondPayment.calculationZh = defaultSecondPayment.calculationZh;
    }
  }

  if (thirdPayment && defaultThirdPayment) {
    if (OLD_THIRD_PAYMENT_CALCULATIONS.has(thirdPayment.calculation ?? '')) {
      thirdPayment.calculation = defaultThirdPayment.calculation;
    }

    if (OLD_THIRD_PAYMENT_CALCULATIONS_ZH.has(thirdPayment.calculationZh ?? '')) {
      thirdPayment.calculationZh = defaultThirdPayment.calculationZh;
    }

    if (OLD_THIRD_PAYMENT_TIMINGS.has(thirdPayment.timing ?? '')) {
      thirdPayment.timing = defaultThirdPayment.timing;
    }

    if (OLD_THIRD_PAYMENT_TIMINGS_ZH.has(thirdPayment.timingZh ?? '')) {
      thirdPayment.timingZh = defaultThirdPayment.timingZh;
    }
  }

  return next;
}


function migrateInstallationAgreement(value) {
  const next = clone(value);
  const clause = next.scopeClauses?.find((item) => item?.number === '1.4');
  const defaultClause = defaultInstallationAgreement.scopeClauses.find((item) => item.number === '1.4');

  if (clause && defaultClause) {
    if (OLD_INSTALLATION_SCOPE_14_EN.has(clause.en ?? '')) {
      clause.en = defaultClause.en;
    }

    if (OLD_INSTALLATION_SCOPE_14_ZH.has(clause.zh ?? '')) {
      clause.zh = defaultClause.zh;
    }
  }

  return next;
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

export default function App() {
  const [activeEditor, setActiveEditor] = useState(() => {
    const saved = window.localStorage.getItem(ACTIVE_EDITOR_KEY);
    return VALID_EDITORS.has(saved) ? saved : 'supply';
  });
  const [supplyData, setSupplyData] = useState(() =>
    migrateSupplyAgreement(loadAgreement(SUPPLY_STORAGE_KEY, clone(defaultSupplyAgreement))),
  );
  const [preliminaryData, setPreliminaryData] = useState(() =>
    loadAgreement(PRELIMINARY_STORAGE_KEY, clone(defaultPreliminaryAgreement)),
  );
  const [installationData, setInstallationData] = useState(() =>
    migrateInstallationAgreement(
      loadAgreement(INSTALLATION_STORAGE_KEY, clone(defaultInstallationAgreement)),
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
    saveAgreement(SUPPLY_STORAGE_KEY, supplyData);
    setSavedAt(savedTime());
  }, [supplyData]);

  useEffect(() => {
    saveAgreement(PRELIMINARY_STORAGE_KEY, preliminaryData);
    setSavedAt(savedTime());
  }, [preliminaryData]);

  useEffect(() => {
    saveAgreement(INSTALLATION_STORAGE_KEY, installationData);
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
      defaultData: defaultSupplyAgreement,
      storageKey: SUPPLY_STORAGE_KEY,
      filePrefix: 'C2A-Supply-Installation-Agreement',
      safeFileName: safeSupplyFileName,
      displayName: 'Supply & Installation Agreement',
      Sidebar: SupplySidebar,
      Preview: SupplyAgreementPreview,
    },
    preliminary: {
      data: preliminaryData,
      setData: setPreliminaryData,
      update: updatePreliminary,
      defaultData: defaultPreliminaryAgreement,
      storageKey: PRELIMINARY_STORAGE_KEY,
      filePrefix: 'C2A-Preliminary-Design-Agreement',
      safeFileName: safePreliminaryFileName,
      displayName: 'Preliminary Design Agreement',
      Sidebar: PreliminarySidebar,
      Preview: PreliminaryAgreementPreview,
    },
    installation: {
      data: installationData,
      setData: setInstallationData,
      update: updateInstallation,
      defaultData: defaultInstallationAgreement,
      storageKey: INSTALLATION_STORAGE_KEY,
      filePrefix: 'C2A-Joinery-Installation-Agreement',
      safeFileName: safeInstallationFileName,
      displayName: 'Joinery Installation Agreement',
      Sidebar: InstallationSidebar,
      Preview: InstallationAgreementPreview,
    },
  };

  const active = editors[activeEditor] || editors.supply;
  const ActiveSidebar = active.Sidebar;
  const ActivePreview = active.Preview;

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

  async function logout() {
    try {
      await fetch('/api/logout', { method: 'POST' });
    } finally {
      window.location.assign('/login.html');
    }
  }

  const sidebarProps = {
    data: active.data,
    update: active.update,
    onPrint: () => window.print(),
    onExport: exportJson,
    onImport: importJson,
    onReset: resetTemplate,
    activeEditor,
    onEditorChange: setActiveEditor,
    onLogout: logout,
  };

  return (
    <div className="app-shell">
      <ActiveSidebar {...sidebarProps} />

      <main className="preview-area">
        <div className="preview-toolbar">
          <span>{active.displayName} · Auto-saved at {savedAt || '—'}</span>
          <button className="button button--primary" type="button" onClick={() => window.print()}>
            Print / Save PDF / 打印或保存 PDF
          </button>
        </div>
        <ActivePreview data={active.data} update={active.update} />
      </main>
    </div>
  );
}
