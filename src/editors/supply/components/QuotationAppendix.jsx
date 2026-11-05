import { calculateAppendixTotals } from '../utils/quotationCalculations.js';
import JoineryQuotation from './quotation/JoineryQuotation.jsx';
import StoneQuotation from './quotation/StoneQuotation.jsx';

export default function QuotationAppendix({ data, update }) {
  const totals = calculateAppendixTotals(data.appendix);
  return (
    <section className="quotation-appendix">
      <div className="appendix-heading">
        <h1>{data.appendix.title}</h1>
        <div lang="zh-CN">{data.appendix.titleZh}</div>
      </div>
      <JoineryQuotation data={data} update={update} totals={totals.joinery} />
      {data.commercial.includeStone && (
        <StoneQuotation data={data} update={update} totals={totals.stone} />
      )}
    </section>
  );
}
