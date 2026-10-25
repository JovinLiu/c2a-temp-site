import c2aLogo from '../../../assets/c2a-cabinetry-logo.png';
import { formatCurrency } from '../utils/formatters.js';
import { calculateAppendixTotals } from '../utils/quotationCalculations.js';

const emptyJoineryRow = () => ({
  spaceName: '',
  joineryName: '',
  length: '',
  height: '',
  carcassFinish: '',
  doorFinish: '',
  description: '',
  rate: '',
  amountOverride: '',
});

const emptyStoneRow = () => ({
  spaceName: '',
  joineryName: '',
  length: '',
  width: '',
  colourPattern: '',
  thickness: '',
  rate: '',
  amountOverride: '',
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

function RowAmountEditor({ row, ariaLabel, onChange }) {
  return (
    <>
      <div className="quotation-row-amount-editor no-print">
        <input
          className="quotation-input quotation-input--number"
          type="number"
          min="0"
          step="0.01"
          value={row.hasAmountOverride ? row.amountOverride : row.hasAmount ? row.amount.toFixed(2) : ''}
          aria-label={ariaLabel}
          title="Enter an amount to override; clear to calculate automatically / 输入金额覆盖，清空恢复自动计算"
          onChange={(event) => onChange(event.target.value)}
        />
        {row.hasAmountOverride && (
          <button type="button" onClick={() => onChange('')} aria-label={`${ariaLabel} restore automatic calculation`}>
            Auto / 自动
          </button>
        )}
      </div>
      <span className="print-only">{row.hasAmount ? formatCurrency(row.amount) : ''}</span>
    </>
  );
}

function displayArea(value) {
  return value > 0 ? value.toFixed(2) : '';
}

function gstQuotationNotice(gstWording) {
  const notices = {
    'plus GST': {
      en: 'All prices shown in this quotation are exclusive of GST unless otherwise stated.',
      zh: '除非另有说明，本报价单所列价格均不含 GST。',
    },
    'including GST': {
      en: 'All prices shown in this quotation include GST unless otherwise stated.',
      zh: '除非另有说明，本报价单所列价格均已包含 GST。',
    },
    'GST not applicable': {
      en: 'GST is not applicable to the prices shown in this quotation.',
      zh: '本报价单所列价格不适用 GST。',
    },
  };

  return notices[gstWording] || {
    en: `GST treatment: ${gstWording || 'not specified'}.`,
    zh: `GST 处理方式：${gstWording || '未注明'}。`,
  };
}

function QuotationHeader({ title, titleZh, reference, projectAddress, gstWording }) {
  const gstNotice = gstQuotationNotice(gstWording);

  return (
    <header className="quotation-header">
      <div className="quotation-header__logo-row">
        <img src={c2aLogo.src || c2aLogo} alt="C2A Cabinetry logo" />
      </div>
      <h2>{title}</h2>
      <div className="quotation-header__title-zh" lang="zh-CN">{titleZh}</div>
      <div className="quotation-header__meta">
        <span>
          Agreement reference: {reference || '________________'}
          <span lang="zh-CN">协议编号：{reference || '________________'}</span>
        </span>
        <span>
          Project address: {projectAddress || '________________'}
          <span lang="zh-CN">项目地址：{projectAddress || '________________'}</span>
        </span>
      </div>
      <div className="quotation-header__gst-note">
        <span>{gstNotice.en}</span>
        <span lang="zh-CN">{gstNotice.zh}</span>
      </div>
    </header>
  );
}

function PriceEditor({ value, calculatedValue, hasCalculatedPrice, onChange }) {
  return (
    <>
      <div className="quotation-price-editor no-print">
        <span>AUD</span>
        <input
          type="number"
          min="0"
          step="100"
          value={value}
          placeholder={hasCalculatedPrice ? String(calculatedValue.toFixed(2)) : 'Enter total price'}
          aria-label="Total price override"
          onChange={(event) => onChange(event.target.value)}
        />
      </div>
      <span className="print-only">
        {hasCalculatedPrice || value !== '' ? formatCurrency(value !== '' ? value : calculatedValue) : '[Insert amount]'}
      </span>
    </>
  );
}

export default function QuotationAppendix({ data, update }) {
  const totals = calculateAppendixTotals(data.appendix);
  const showStone = data.commercial.includeStone;

  const removeJoineryRow = (index) => {
    if (data.appendix.joinery.rows.length <= 1) return;
    update(
      'appendix.joinery.rows',
      data.appendix.joinery.rows.filter((_, rowIndex) => rowIndex !== index),
    );
  };

  const removeStoneRow = (index) => {
    if (data.appendix.stone.rows.length <= 1) return;
    update(
      'appendix.stone.rows',
      data.appendix.stone.rows.filter((_, rowIndex) => rowIndex !== index),
    );
  };

  return (
    <section className="quotation-appendix">
      <div className="appendix-heading">
        <h1>{data.appendix.title}</h1>
        <div lang="zh-CN">{data.appendix.titleZh}</div>
      </div>

      <section className="quotation-sheet quotation-sheet--joinery">
        <QuotationHeader
          title={data.appendix.joinery.title}
          titleZh={data.appendix.joinery.titleZh}
          reference={data.meta.reference}
          projectAddress={data.client.projectAddress}
          gstWording={data.commercial.gstWording}
        />

        <div className="quotation-edit-controls no-print">
          <label className="quotation-sync-control">
            <input
              type="checkbox"
              checked={data.appendix.joinery.syncToContractPrice}
              onChange={(event) => update('appendix.joinery.syncToContractPrice', event.target.checked)}
            />
            <span>Sync total to agreement price / 同步至协议产品价格</span>
          </label>
        </div>

        <div className="quotation-table-scroll">
          <table className="quotation-table quotation-table--joinery">
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
                <th className="quotation-amount-column"><BilingualHeader en="Amount (AUD)" zh="金额（澳元）" /></th>
                <th className="no-print quotation-rate-column"><BilingualHeader en="Rate (AUD/m²)" zh="单价（澳元/平方米）" /></th>
              </tr>
            </thead>
            <tbody>
              {totals.joinery.rows.map((row, index) => (
                <tr key={`joinery-quotation-${index}`}>
                  <td>
                    <EditableTextCell
                      value={row.spaceName}
                      ariaLabel={`Joinery row ${index + 1} space name`}
                      onChange={(value) => update(`appendix.joinery.rows.${index}.spaceName`, value)}
                    />
                  </td>
                  <td>
                    <EditableTextCell
                      value={row.joineryName}
                      ariaLabel={`Joinery row ${index + 1} joinery name`}
                      onChange={(value) => update(`appendix.joinery.rows.${index}.joineryName`, value)}
                    />
                  </td>
                  <td className="quotation-number">
                    <EditableNumber
                      value={row.length}
                      ariaLabel={`Joinery row ${index + 1} length`}
                      onChange={(value) => update(`appendix.joinery.rows.${index}.length`, value)}
                    />
                  </td>
                  <td className="quotation-number">
                    <EditableNumber
                      value={row.height}
                      ariaLabel={`Joinery row ${index + 1} height`}
                      onChange={(value) => update(`appendix.joinery.rows.${index}.height`, value)}
                    />
                  </td>
                  <td className="quotation-number quotation-formula">{displayArea(row.area)}</td>
                  <td>
                    <EditableTextCell
                      value={row.carcassFinish}
                      ariaLabel={`Joinery row ${index + 1} carcass finish`}
                      onChange={(value) => update(`appendix.joinery.rows.${index}.carcassFinish`, value)}
                    />
                  </td>
                  <td>
                    <EditableTextCell
                      value={row.doorFinish}
                      ariaLabel={`Joinery row ${index + 1} door finish`}
                      onChange={(value) => update(`appendix.joinery.rows.${index}.doorFinish`, value)}
                    />
                  </td>
                  <td className="quotation-row-action-cell">
                    <EditableTextCell
                      value={row.description}
                      ariaLabel={`Joinery row ${index + 1} description`}
                      onChange={(value) => update(`appendix.joinery.rows.${index}.description`, value)}
                    />
                    <button
                      className="quotation-remove-row no-print"
                      type="button"
                      title="Remove row / 删除本行"
                      aria-label={`Remove joinery row ${index + 1}`}
                      disabled={data.appendix.joinery.rows.length <= 1}
                      onClick={() => removeJoineryRow(index)}
                    >
                      ×
                    </button>
                  </td>
                  <td className="quotation-number quotation-amount-column">
                    <RowAmountEditor
                      row={row}
                      ariaLabel={`Joinery row ${index + 1} amount`}
                      onChange={(value) => update(`appendix.joinery.rows.${index}.amountOverride`, value)}
                    />
                  </td>
                  <td className="no-print quotation-rate-column">
                    <input
                      className="quotation-input quotation-input--number"
                      type="number"
                      min="0"
                      step="0.01"
                      value={data.appendix.joinery.rows[index].rate ?? ''}
                      aria-label={`Joinery row ${index + 1} rate per square metre`}
                      onChange={(event) => update(`appendix.joinery.rows.${index}.rate`, event.target.value)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <th colSpan="4"><BilingualHeader en="Total Projection Area" zh="投影面积总计" /></th>
                <td className="quotation-number quotation-total-value">{totals.joinery.totalArea.toFixed(2)} m²</td>
                <th colSpan="3"><BilingualHeader en="Total Price" zh="总价格" /></th>
                <td className="quotation-total-value">
                  <PriceEditor
                    value={data.appendix.joinery.totalPriceOverride}
                    calculatedValue={totals.joinery.totalPrice}
                    hasCalculatedPrice={totals.joinery.hasPrice}
                    onChange={(value) => update('appendix.joinery.totalPriceOverride', value)}
                  />
                </td>
                <td className="no-print quotation-rate-column" />
              </tr>
            </tfoot>
          </table>
        </div>

        <button
          className="quotation-add-row no-print"
          type="button"
          onClick={() => update('appendix.joinery.rows', [...data.appendix.joinery.rows, emptyJoineryRow()])}
        >
          + Add row / 添加一行
        </button>

        <div className="quotation-statement quotation-statement--editable">
          <textarea
            className="quotation-statement__input"
            rows="2"
            value={data.appendix.joinery.hardwareStatement}
            aria-label="Hardware statement"
            onChange={(event) => update('appendix.joinery.hardwareStatement', event.target.value)}
          />
        </div>
      </section>

      {showStone && (
        <section className="quotation-sheet quotation-sheet--stone">
          <QuotationHeader
            title={data.appendix.stone.title}
            titleZh={data.appendix.stone.titleZh}
            reference={data.meta.reference}
            projectAddress={data.client.projectAddress}
            gstWording={data.commercial.gstWording}
          />

          <div className="quotation-edit-controls no-print">
            <label className="quotation-sync-control">
              <input
                type="checkbox"
                checked={data.appendix.stone.syncToContractPrice}
                onChange={(event) => update('appendix.stone.syncToContractPrice', event.target.checked)}
              />
              <span>Sync total to agreement price / 同步至协议产品价格</span>
            </label>
          </div>

          <div className="quotation-table-scroll">
            <table className="quotation-table quotation-table--stone">
              <thead>
                <tr>
                  <th><BilingualHeader en="Space Name" zh="空间名称" /></th>
                  <th><BilingualHeader en="Joinery Name" zh="家具名称" /></th>
                  <th><BilingualHeader en="Length (mm)" zh="长（毫米）" /></th>
                  <th><BilingualHeader en="Width (mm)" zh="宽（毫米）" /></th>
                  <th><BilingualHeader en="Colour / Pattern" zh="花色" /></th>
                  <th><BilingualHeader en="Thickness (mm)" zh="厚度（毫米）" /></th>
                  <th className="quotation-amount-column"><BilingualHeader en="Amount (AUD)" zh="金额（澳元）" /></th>
                  <th className="no-print quotation-rate-column"><BilingualHeader en="Rate (AUD/m²)" zh="单价（澳元/平方米）" /></th>
                </tr>
              </thead>
              <tbody>
                {totals.stone.rows.map((row, index) => (
                  <tr key={`stone-quotation-${index}`}>
                    <td>
                      <EditableTextCell
                        value={row.spaceName}
                        ariaLabel={`Stone row ${index + 1} space name`}
                        onChange={(value) => update(`appendix.stone.rows.${index}.spaceName`, value)}
                      />
                    </td>
                    <td>
                      <EditableTextCell
                        value={row.joineryName}
                        ariaLabel={`Stone row ${index + 1} joinery name`}
                        onChange={(value) => update(`appendix.stone.rows.${index}.joineryName`, value)}
                      />
                    </td>
                    <td className="quotation-number">
                      <EditableNumber
                        value={row.length}
                        ariaLabel={`Stone row ${index + 1} length`}
                        onChange={(value) => update(`appendix.stone.rows.${index}.length`, value)}
                      />
                    </td>
                    <td className="quotation-number">
                      <EditableNumber
                        value={row.width}
                        ariaLabel={`Stone row ${index + 1} width`}
                        onChange={(value) => update(`appendix.stone.rows.${index}.width`, value)}
                      />
                    </td>
                    <td>
                      <EditableTextCell
                        value={row.colourPattern}
                        ariaLabel={`Stone row ${index + 1} colour or pattern`}
                        onChange={(value) => update(`appendix.stone.rows.${index}.colourPattern`, value)}
                      />
                    </td>
                    <td className="quotation-number quotation-row-action-cell">
                      <EditableNumber
                        value={row.thickness}
                        ariaLabel={`Stone row ${index + 1} thickness`}
                        onChange={(value) => update(`appendix.stone.rows.${index}.thickness`, value)}
                      />
                      <button
                        className="quotation-remove-row no-print"
                        type="button"
                        title="Remove row / 删除本行"
                        aria-label={`Remove stone row ${index + 1}`}
                        disabled={data.appendix.stone.rows.length <= 1}
                        onClick={() => removeStoneRow(index)}
                      >
                        ×
                      </button>
                    </td>
                    <td className="quotation-number quotation-amount-column">
                      <RowAmountEditor
                        row={row}
                        ariaLabel={`Stone row ${index + 1} amount`}
                        onChange={(value) => update(`appendix.stone.rows.${index}.amountOverride`, value)}
                      />
                    </td>
                    <td className="no-print quotation-rate-column">
                      <input
                        className="quotation-input quotation-input--number"
                        type="number"
                        min="0"
                        step="0.01"
                        value={data.appendix.stone.rows[index].rate ?? ''}
                        aria-label={`Stone row ${index + 1} rate per square metre`}
                        onChange={(event) => update(`appendix.stone.rows.${index}.rate`, event.target.value)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <th colSpan="6"><BilingualHeader en="Total Price" zh="总价格" /></th>
                  <td className="quotation-total-value">
                    <PriceEditor
                      value={data.appendix.stone.totalPriceOverride}
                      calculatedValue={totals.stone.totalPrice}
                      hasCalculatedPrice={totals.stone.hasPrice}
                      onChange={(value) => update('appendix.stone.totalPriceOverride', value)}
                    />
                  </td>
                  <td className="no-print quotation-rate-column" />
                </tr>
              </tfoot>
            </table>
          </div>

          <button
            className="quotation-add-row no-print"
            type="button"
            onClick={() => update('appendix.stone.rows', [...data.appendix.stone.rows, emptyStoneRow()])}
          >
            + Add row / 添加一行
          </button>


          <div className="quotation-statement quotation-statement--editable">
            <textarea
              className="quotation-statement__input"
              rows="2"
              value={data.appendix.stone.noteStatement}
              aria-label="Stone quotation notes"
              onChange={(event) => update('appendix.stone.noteStatement', event.target.value)}
            />
          </div>
        </section>
      )}
    </section>
  );
}
