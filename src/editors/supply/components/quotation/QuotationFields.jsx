import { formatCurrency } from '../../utils/formatters.js';
export function BilingualHeader({ en, zh }) {
  return (
    <>
      <span>{en}</span>
      <span lang="zh-CN">{zh}</span>
    </>
  );
}

export function EditableTextCell({ value, onChange, ariaLabel }) {
  return (
    <>
      <textarea
        className="quotation-input quotation-input--text no-print"
        rows="2"
        value={value ?? ''}
        aria-label={ariaLabel}
        onChange={(event) => onChange(event.target.value)}
      />
      <span className="print-only quotation-print-value">{value ?? ''}</span>
    </>
  );
}

export function EditableNumber({ value, onChange, ariaLabel }) {
  return (
    <>
      <input
        className="quotation-input quotation-input--number no-print"
        type="number"
        min="0"
        step="1"
        value={value ?? ''}
        aria-label={ariaLabel}
        onChange={(event) => onChange(event.target.value)}
      />
      <span className="print-only quotation-print-value">{value ?? ''}</span>
    </>
  );
}

export function RowAmountEditor({ row, ariaLabel, onChange }) {
  return (
    <>
      <div className="quotation-row-amount-editor no-print">
        <input
          className="quotation-input quotation-input--number"
          type="number"
          min="0"
          step="0.01"
          value={
            row.hasAmountOverride ? row.amountOverride : row.hasAmount ? row.amount.toFixed(2) : ''
          }
          aria-label={ariaLabel}
          title="Enter an amount to override; clear to calculate automatically / 输入金额覆盖，清空恢复自动计算"
          onChange={(event) => onChange(event.target.value)}
        />
        {row.hasAmountOverride && (
          <button
            type="button"
            onClick={() => onChange('')}
            aria-label={`${ariaLabel} restore automatic calculation`}
          >
            Auto / 自动
          </button>
        )}
      </div>
      <span className="print-only">{row.hasAmount ? formatCurrency(row.amount) : ''}</span>
    </>
  );
}

export function RowAreaEditor({ row, ariaLabel, onChange }) {
  const displayedArea = row.hasAreaOverride || row.area > 0 ? row.area.toFixed(2) : '';
  return (
    <>
      <div className="quotation-row-amount-editor no-print">
        <input
          className="quotation-input quotation-input--number"
          type="number"
          min="0"
          step="0.01"
          value={row.hasAreaOverride ? row.areaOverride : displayedArea}
          aria-label={ariaLabel}
          title="Enter area in m² to override; clear to calculate automatically / 输入平方米面积覆盖，清空恢复自动计算"
          onChange={(event) => onChange(event.target.value)}
        />
        {row.hasAreaOverride && (
          <button
            type="button"
            onClick={() => onChange('')}
            aria-label={`${ariaLabel} restore automatic calculation`}
          >
            Auto / 自动
          </button>
        )}
      </div>
      <span className="print-only">{displayedArea}</span>
    </>
  );
}

export function PriceEditor({ value, calculatedValue, hasCalculatedPrice, onChange }) {
  return (
    <>
      <div className="quotation-price-editor no-print">
        <span>AUD</span>
        <input
          type="number"
          min="0"
          step="100"
          value={value}
          placeholder={
            hasCalculatedPrice ? String(calculatedValue.toFixed(2)) : 'Enter total price'
          }
          aria-label="Total price override"
          onChange={(event) => onChange(event.target.value)}
        />
      </div>
      <span className="print-only">
        {hasCalculatedPrice || value !== ''
          ? formatCurrency(value !== '' ? value : calculatedValue)
          : '[Insert amount]'}
      </span>
    </>
  );
}
