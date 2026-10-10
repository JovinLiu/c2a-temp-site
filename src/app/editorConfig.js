import SupplyAgreementPreview from '../editors/supply/components/AgreementPreview.jsx';
import SupplySidebar from '../editors/supply/components/Sidebar.jsx';
import { defaultAgreement as defaultSupplyAgreement } from '../editors/supply/data/defaultAgreement.js';
import { safeFileName as safeSupplyFileName } from '../editors/supply/utils/formatters.js';
import PreliminaryAgreementPreview from '../editors/preliminary/components/AgreementPreview.jsx';
import PreliminarySidebar from '../editors/preliminary/components/Sidebar.jsx';
import { defaultAgreement as defaultPreliminaryAgreement } from '../editors/preliminary/data/defaultAgreement.js';
import { safeFileName as safePreliminaryFileName } from '../editors/preliminary/utils/formatters.js';
import InstallationAgreementPreview from '../editors/installation/components/AgreementPreview.jsx';
import InstallationSidebar from '../editors/installation/components/Sidebar.jsx';
import { defaultAgreement as defaultInstallationAgreement } from '../editors/installation/data/defaultAgreement.js';
import { safeFileName as safeInstallationFileName } from '../editors/installation/utils/formatters.js';
import {
  SUPPLY_STORAGE_KEY,
  PRELIMINARY_STORAGE_KEY,
  INSTALLATION_STORAGE_KEY,
} from './constants.js';

export const editorConfigs = {
  supply: {
    storageKey: SUPPLY_STORAGE_KEY,
    defaultData: defaultSupplyAgreement,
    filePrefix: 'C2A-Supply-Installation-Agreement',
    safeFileName: safeSupplyFileName,
    displayName: 'Supply & Installation Agreement',
    Sidebar: SupplySidebar,
    Preview: SupplyAgreementPreview,
  },
  preliminary: {
    storageKey: PRELIMINARY_STORAGE_KEY,
    defaultData: defaultPreliminaryAgreement,
    filePrefix: 'C2A-Preliminary-Design-Agreement',
    safeFileName: safePreliminaryFileName,
    displayName: 'Preliminary Design Agreement',
    Sidebar: PreliminarySidebar,
    Preview: PreliminaryAgreementPreview,
  },
  installation: {
    storageKey: INSTALLATION_STORAGE_KEY,
    defaultData: defaultInstallationAgreement,
    filePrefix: 'C2A-Joinery-Installation-Agreement',
    safeFileName: safeInstallationFileName,
    displayName: 'Joinery Installation Agreement',
    Sidebar: InstallationSidebar,
    Preview: InstallationAgreementPreview,
  },
};
