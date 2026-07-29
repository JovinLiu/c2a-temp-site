import CustomerLandingPage from './components/CustomerLandingPage.jsx';
import { useAgreementApp } from './app/useAgreementApp.js';

export default function App() {
  const {
    activeEditor,
    setActiveEditor,
    active,
    hasEnteredApp,
    setHasEnteredApp,
    savedAt,
    exportJson,
    importJson,
    resetTemplate,
  } = useAgreementApp();

  const ActiveSidebar = active.Sidebar;
  const ActivePreview = active.Preview;

  const sidebarProps = {
    data: active.data,
    update: active.update,
    onPrint: () => window.print(),
    onExport: exportJson,
    onImport: importJson,
    onReset: resetTemplate,
    activeEditor,
    onEditorChange: setActiveEditor,
  };

  if (!hasEnteredApp) {
    return <CustomerLandingPage onEnterApp={() => setHasEnteredApp(true)} />;
  }

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
