import { formatCurrency } from '../utils/formatters.js';
import { calculateInstallationQuotation } from '../utils/installationQuotationCalculations.js';

const emptyRow = () => ({
  spaceName: '',
  joineryName: '',
  length: '',
  height: '',
  carcassFinish: '',
  doorFinish: '',
  description: '',
});

function BilingualHeader({ en, zh }) {
  return (
    <>
      <span>{en}</span>
      <span lang="zh-CN">{zh}</span>
    </>
  );
}

function EditableTextCell({ value, onChange, ariaLabel }) {
  return (
    <textarea
      className="quotation-input quotation-input--text"
      rows="2"
      value={value ?? ''}
      aria-label={ariaLabel}
      onChange={(event) => onChange(event.target.value)}
    />
  );
}

function EditableNumber({ value, onChange, ariaLabel }) {
  return (
    <input
      className="quotation-input quotation-input--number"
      type="number"
      min="0"
      step="1"
      value={value ?? ''}
      aria-label={ariaLabel}
      onChange={(event) => onChange(event.target.value)}
    />
  );
}

function displayArea(value) {
  return value > 0 ? value.toFixed(2) : '';
}

export default function InstallationFeeCalculator({ data, update }) {
  const quotation = data.installationQuotation;
  const totals = calculateInstallationQuotation(quotation);

  const removeRow = (index) => {
    if (quotation.rows.length <= 1) return;
    update(
      'installationQuotation.rows',
      quotation.rows.filter((_, rowIndex) => rowIndex !== index),
    );
  };

  return (
    <section className="document installation-fee-calculator no-print" aria-label="Installation fee calculator">
      <header className="installation-fee-calculator__header">
        <h2>{quotation.title}</h2>
        <div lang="zh-CN">{quotation.titleZh}</div>
        <p>
          This calculator is for editing only and will not appear in the printed or PDF agreement.
          <span lang="zh-CN">此计算表仅供编辑使用，不会显示在最终打印或 PDF 协议中。</span>
        </p>
        <div className="installation-fee-calculator__meta">
          <span>Agreement reference: {data.meta.reference || '________________'}</span>
          <span>Project address: {data.client.projectAddress || '________________'}</span>
        </div>
      </header>

      <div className="quotation-edit-controls">
        <label>
          <span>Default rate per m² / 默认每平方米单价</span>
          <input
            type="number"
            min="0"
            step="1"
            value={quotation.defaultRate}
            onChange={(event) => update('installationQuotation.defaultRate', event.target.value)}
          />
        </label>
        <div className="installation-fee-calculator__sync-status">
          Calculated installation fee is automatically synced to Contract Sum.
          <span lang="zh-CN">计算出的安装费会自动同步到协议合同金额。</span>
        </div>
      </div>

      <div className="quotation-table-scroll">
        <table className="quotation-table quotation-table--joinery installation-fee-table">
          <thead>
            <tr>
              <th><BilingualHeader en="Space Name" zh="空间名称" /></th>
              <th><BilingualHeader en="Joinery Name" zh="家具名称" /></th>
              <th><BilingualHeader en="Length (mm)" zh="长（毫米）" /></th>
              <th><BilingualHeader en="Height (mm)" zh="高（毫米）" /></th>
              <th><BilingualHeader en="Projection Area (m²)" zh="投影面积（平方米）" /></th>
              <th><BilingualHeader en="Carcass Finish" zh="柜体饰面" /></th>
              <th><BilingualHeader en="Door Finish" zh="柜门饰面" /></th>
              <th><BilingualHeader en="Description" zh="说明" /></th>
            </tr>
          </thead>
          <tbody>
            {totals.rows.map((row, index) => (
              <tr key={`installation-calculator-row-${index}`}>
                <td>
                  <EditableTextCell
                    value={row.spaceName}
                    ariaLabel={`Installation row ${index + 1} space name`}
                    onChange={(value) => update(`installationQuotation.rows.${index}.spaceName`, value)}
                  />
                </td>
                <td>
                  <EditableTextCell
                    value={row.joineryName}
                    ariaLabel={`Installation row ${index + 1} joinery name`}
                    onChange={(value) => update(`installationQuotation.rows.${index}.joineryName`, value)}
                  />
                </td>
                <td className="quotation-number">
                  <EditableNumber
                    value={row.length}
                    ariaLabel={`Installation row ${index + 1} length`}
                    onChange={(value) => update(`installationQuotation.rows.${index}.length`, value)}
                  />
                </td>
                <td className="quotation-number">
                  <EditableNumber
                    value={row.height}
                    ariaLabel={`Installation row ${index + 1} height`}
                    onChange={(value) => update(`installationQuotation.rows.${index}.height`, value)}
                  />
                </td>
                <td className="quotation-number quotation-formula">{displayArea(row.area)}</td>
                <td>
                  <EditableTextCell
                    value={row.carcassFinish}
                    ariaLabel={`Installation row ${index + 1} carcass finish`}
                    onChange={(value) => update(`installationQuotation.rows.${index}.carcassFinish`, value)}
                  />
                </td>
                <td>
                  <EditableTextCell
                    value={row.doorFinish}
                    ariaLabel={`Installation row ${index + 1} door finish`}
                    onChange={(value) => update(`installationQuotation.rows.${index}.doorFinish`, value)}
                  />
                </td>
                <td className="quotation-row-action-cell">
                  <EditableTextCell
                    value={row.description}
                    ariaLabel={`Installation row ${index + 1} description`}
                    onChange={(value) => update(`installationQuotation.rows.${index}.description`, value)}
                  />
                  <button
                    className="quotation-remove-row"
                    type="button"
                    title="Remove row / 删除本行"
                    aria-label={`Remove installation row ${index + 1}`}
                    disabled={quotation.rows.length <= 1}
                    onClick={() => removeRow(index)}
                  >
                    ×
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <th colSpan="4"><BilingualHeader en="Total Projection Area" zh="投影面积总计" /></th>
              <td className="quotation-number quotation-total-value">{totals.totalArea.toFixed(2)} m²</td>
              <th colSpan="2"><BilingualHeader en="Calculated Installation Fee" zh="计算安装费" /></th>
              <td className="quotation-total-value">
                {totals.hasCalculatedFee ? formatCurrency(totals.totalFee) : '[Enter dimensions and rate]'}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      <button
        className="quotation-add-row"
        type="button"
        onClick={() => update('installationQuotation.rows', [...quotation.rows, emptyRow()])}
      >
        + Add row / 添加一行
      </button>
    </section>
  );
}
