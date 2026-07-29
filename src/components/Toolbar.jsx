export default function Toolbar({ onPrint, onExport, onImport, onReset }) {
  return (
    <div className="toolbar">
      <button className="button button--primary" type="button" onClick={onPrint}>
        Print / Save PDF<br />打印 / 保存 PDF
      </button>
      <button className="button" type="button" onClick={onExport}>
        Export JSON<br />导出 JSON
      </button>
      <label className="button button--file">
        Import JSON<br />导入 JSON
        <input type="file" accept="application/json,.json" onChange={onImport} />
      </label>
      <button className="button button--danger" type="button" onClick={onReset}>
        Reset template<br />重置模板
      </button>
    </div>
  );
}
