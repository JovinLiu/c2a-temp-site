import useQuotationRowOrder from './useQuotationRowOrder.js';
import {
  BilingualHeader,
  EditableTextCell,
  EditableNumber,
  RowAmountEditor,
  PriceEditor,
  RowAreaEditor,
} from './QuotationFields.jsx';
import QuotationHeader from './QuotationHeader.jsx';
import { emptyJoineryRow } from '../../data/quotationRows.js';

export default function JoineryQuotation({ data, update, totals }) {
  const rowOrder = useQuotationRowOrder(data.appendix.joinery.rows, (rows) =>
    update('appendix.joinery.rows', rows),
  );
  const removeJoineryRow = (index) => {
    if (data.appendix.joinery.rows.length <= 1) return;
    update(
      'appendix.joinery.rows',
      data.appendix.joinery.rows.filter((_, rowIndex) => rowIndex !== index),
    );
  };
  return (
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
            onChange={(event) =>
              update('appendix.joinery.syncToContractPrice', event.target.checked)
            }
          />
          <span>Sync total to agreement price / 同步至协议产品价格</span>
        </label>
      </div>

      <div className="quotation-table-scroll">
        <table className="quotation-table quotation-table--joinery">
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
                <BilingualHeader en="Height (mm)" zh="高（毫米）" />
              </th>
              <th>
                <BilingualHeader en="Projection Area (m²)" zh="投影面积（平方米）" />
              </th>
              <th>
                <BilingualHeader en="Carcass Finish" zh="柜体饰面" />
              </th>
              <th>
                <BilingualHeader en="Door Finish" zh="柜门饰面" />
              </th>
              <th>
                <BilingualHeader en="Description" zh="说明" />
              </th>
              <th className="quotation-amount-column">
                <BilingualHeader en="Amount (AUD)" zh="金额（澳元）" />
              </th>
              <th className="no-print quotation-rate-column">
                <BilingualHeader en="Rate (AUD/m²)" zh="单价（澳元/平方米）" />
              </th>
              <th className="no-print quotation-delete-column" aria-label="Row actions / 行操作" />
            </tr>
          </thead>
          <tbody>
            {totals.rows.map((row, index) => (
              <tr key={`joinery-quotation-${index}`} {...rowOrder.rowProps(index)}>
                <td className="quotation-reorder-cell">
                  <button
                    type="button"
                    className="quotation-drag-handle no-print"
                    aria-label={`Move joinery row ${index + 1} / 移动本行`}
                    title="Drag to reorder / 拖动排序；↑↓ 调整位置"
                    {...rowOrder.handleProps(index)}
                  >
                    <span aria-hidden="true">☰</span>
                  </button>
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
                    onChange={(value) =>
                      update(`appendix.joinery.rows.${index}.joineryName`, value)
                    }
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
                <td className="quotation-number quotation-formula">
                  <RowAreaEditor
                    row={row}
                    ariaLabel={`Joinery row ${index + 1} projection area`}
                    onChange={(value) =>
                      update(`appendix.joinery.rows.${index}.areaOverride`, value)
                    }
                  />
                </td>
                <td>
                  <EditableTextCell
                    value={row.carcassFinish}
                    ariaLabel={`Joinery row ${index + 1} carcass finish`}
                    onChange={(value) =>
                      update(`appendix.joinery.rows.${index}.carcassFinish`, value)
                    }
                  />
                </td>
                <td>
                  <EditableTextCell
                    value={row.doorFinish}
                    ariaLabel={`Joinery row ${index + 1} door finish`}
                    onChange={(value) => update(`appendix.joinery.rows.${index}.doorFinish`, value)}
                  />
                </td>
                <td>
                  <EditableTextCell
                    value={row.description}
                    ariaLabel={`Joinery row ${index + 1} description`}
                    onChange={(value) =>
                      update(`appendix.joinery.rows.${index}.description`, value)
                    }
                  />
                </td>
                <td className="quotation-number quotation-amount-column">
                  <RowAmountEditor
                    row={row}
                    ariaLabel={`Joinery row ${index + 1} amount`}
                    onChange={(value) =>
                      update(`appendix.joinery.rows.${index}.amountOverride`, value)
                    }
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
                    onChange={(event) =>
                      update(`appendix.joinery.rows.${index}.rate`, event.target.value)
                    }
                  />
                </td>
                <td className="no-print quotation-delete-column">
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
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <th colSpan="4">
                <BilingualHeader en="Total Projection Area" zh="投影面积总计" />
              </th>
              <td className="quotation-number quotation-total-value">
                {totals.totalArea.toFixed(2)} m²
              </td>
              <th colSpan="3">
                <BilingualHeader en="Total Price" zh="总价格" />
              </th>
              <td className="quotation-total-value">
                <PriceEditor
                  value={data.appendix.joinery.totalPriceOverride}
                  calculatedValue={totals.totalPrice}
                  hasCalculatedPrice={totals.hasPrice}
                  onChange={(value) => update('appendix.joinery.totalPriceOverride', value)}
                />
              </td>
              <td className="no-print quotation-rate-column" />
              <td className="no-print quotation-delete-column" />
            </tr>
          </tfoot>
        </table>
      </div>

      <button
        className="quotation-add-row no-print"
        type="button"
        onClick={() =>
          update('appendix.joinery.rows', [...data.appendix.joinery.rows, emptyJoineryRow()])
        }
      >
        + Add row / 添加一行
      </button>

      <div className="quotation-statement quotation-statement--editable">
        <textarea
          className="quotation-statement__input no-print"
          rows="2"
          value={data.appendix.joinery.hardwareStatement}
          aria-label="Hardware statement"
          onChange={(event) => update('appendix.joinery.hardwareStatement', event.target.value)}
        />
        <span className="print-only quotation-print-value">
          {data.appendix.joinery.hardwareStatement}
        </span>
      </div>
    </section>
  );
}
