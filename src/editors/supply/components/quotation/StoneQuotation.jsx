import {
  BilingualHeader,
  EditableTextCell,
  EditableNumber,
  RowAmountEditor,
  PriceEditor,
} from './QuotationFields.jsx';
import QuotationHeader from './QuotationHeader.jsx';
import { emptyStoneRow } from '../../data/quotationRows.js';

export default function StoneQuotation({ data, update, totals }) {
  const removeStoneRow = (index) => {
    if (data.appendix.stone.rows.length <= 1) return;
    update(
      'appendix.stone.rows',
      data.appendix.stone.rows.filter((_, rowIndex) => rowIndex !== index),
    );
  };
  return (
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
              <th>
                <BilingualHeader en="Space Name" zh="空间名称" />
              </th>
              <th>
                <BilingualHeader en="Joinery Name" zh="家具名称" />
              </th>
              <th>
                <BilingualHeader en="Length (mm)" zh="长（毫米）" />
              </th>
              <th>
                <BilingualHeader en="Width (mm)" zh="宽（毫米）" />
              </th>
              <th>
                <BilingualHeader en="Colour / Pattern" zh="花色" />
              </th>
              <th>
                <BilingualHeader en="Thickness (mm)" zh="厚度（毫米）" />
              </th>
              <th className="quotation-amount-column">
                <BilingualHeader en="Amount (AUD)" zh="金额（澳元）" />
              </th>
              <th className="no-print quotation-rate-column">
                <BilingualHeader en="Rate (AUD/m²)" zh="单价（澳元/平方米）" />
              </th>
            </tr>
          </thead>
          <tbody>
            {totals.rows.map((row, index) => (
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
                    onChange={(value) =>
                      update(`appendix.stone.rows.${index}.colourPattern`, value)
                    }
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
                    onChange={(value) =>
                      update(`appendix.stone.rows.${index}.amountOverride`, value)
                    }
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
                    onChange={(event) =>
                      update(`appendix.stone.rows.${index}.rate`, event.target.value)
                    }
                  />
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <th colSpan="6">
                <BilingualHeader en="Total Price" zh="总价格" />
              </th>
              <td className="quotation-total-value">
                <PriceEditor
                  value={data.appendix.stone.totalPriceOverride}
                  calculatedValue={totals.totalPrice}
                  hasCalculatedPrice={totals.hasPrice}
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
        onClick={() =>
          update('appendix.stone.rows', [...data.appendix.stone.rows, emptyStoneRow()])
        }
      >
        + Add row / 添加一行
      </button>

      <div className="quotation-statement quotation-statement--editable">
        <textarea
          className="quotation-statement__input no-print"
          rows="2"
          value={data.appendix.stone.noteStatement}
          aria-label="Stone quotation notes"
          onChange={(event) => update('appendix.stone.noteStatement', event.target.value)}
        />
        <span className="print-only quotation-print-value">
          {data.appendix.stone.noteStatement}
        </span>
      </div>
    </section>
  );
}
