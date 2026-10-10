import c2aLogo from '../../../assets/c2a-cabinetry-logo.png';
import QuotationAppendix from './QuotationAppendix.jsx';
import { calculateSupplyAgreementAmounts } from '../utils/quotationCalculations.js';
import { formatCurrency, formatDate, numericValue } from '../utils/formatters.js';

function Value({ children, fallback = '________________' }) {
  const empty = children === '' || children === null || children === undefined;
  return <span className={empty ? 'placeholder' : ''}>{empty ? fallback : children}</span>;
}

function BilingualParagraph({ en, zh, className = '' }) {
  return (
    <div className={`bilingual-paragraph ${className}`.trim()}>
      <p className="bilingual-paragraph__en">{en}</p>
      <p className="bilingual-paragraph__zh" lang="zh-CN">{zh}</p>
    </div>
  );
}

function BilingualListItem({ en, zh }) {
  return (
    <li>
      <div className="bilingual-line__en">{en}</div>
      <div className="bilingual-line__zh" lang="zh-CN">{zh}</div>
    </li>
  );
}

function BilingualCell({ en, zh }) {
  return (
    <>
      <div className="bilingual-line__en">{en}</div>
      <div className="bilingual-line__zh" lang="zh-CN">{zh}</div>
    </>
  );
}

function ContractSection({ number, title, titleZh, children }) {
  return (
    <section className="contract-section">
      <h2>
        <span>{number}. {title}</span>
        <span lang="zh-CN">{number}. {titleZh}</span>
      </h2>
      {children}
    </section>
  );
}

function gstChinese(wording) {
  const labels = {
    'plus GST': '另加 GST',
    'including GST': '已含 GST',
    'GST not applicable': '不适用 GST',
  };
  return labels[wording] || wording;
}

function isScopeEnabled(data, key) {
  return Boolean(data.scopeItems.find((item) => item.key === key)?.enabled);
}

function isVisibleByProject(data, visibility) {
  if (!visibility) return true;
  if (visibility === 'stone') return data.commercial.includeStone;
  if (visibility === 'led') return isScopeEnabled(data, 'ledLighting');
  if (visibility === 'appliance') return isScopeEnabled(data, 'appliancePanels');
  return true;
}

export default function AgreementPreview({ data, update }) {
  const showChinese = data.display?.showChinese !== false;
  const visibleScopeItems = data.scopeItems.filter(
    (item) => item.enabled && isVisibleByProject(data, item.visibility),
  );
  const visibleWarrantyItems = data.warrantyItems.filter((item) =>
    isVisibleByProject(data, item.visibility),
  );

  const calculated = calculateSupplyAgreementAmounts(data);
  const { joineryPrice, stonePrice } = calculated;
  const priceInputs = [
    joineryPrice,
    data.commercial.includeStone ? stonePrice : '',
    data.commercial.freightCost,
    data.commercial.handlingFee,
    data.commercial.wasteDisposalFee,
    data.commercial.installationFee,
  ];
  const calculatedTotal = priceInputs.reduce((sum, value) => sum + numericValue(value), 0);
  const hasAnyPrice = priceInputs.some((value) => value !== '' && value !== null && value !== undefined);
  const totalValue = data.commercial.totalOverride || (hasAnyPrice ? calculatedTotal : '');

  const paymentMethodsEn = [
    data.payments.bankTransfer ? 'Bank transfer' : null,
    data.payments.alipay ? 'Alipay third-party payment link' : null,
  ].filter(Boolean);
  const paymentMethodsZh = [
    data.payments.bankTransfer ? '银行转账' : null,
    data.payments.alipay ? '支付宝第三方付款链接' : null,
  ].filter(Boolean);

  return (
    <article className={`document ${showChinese ? 'document--bilingual' : 'document--english-only'}`}>
      <header className="document-header document-header--with-logo">
        <div className="document-header__logo-row">
          <img className="document-header__logo" src={c2aLogo.src || c2aLogo} alt="C2A Cabinetry logo" />
        </div>
        <div className="document-header__titles">
          <h1>{data.meta.title}</h1>
          <div className="document-title-zh" lang="zh-CN">{data.meta.titleZh}</div>
        </div>
        <div className="document-header__meta">
          <div>
            <span>Agreement date: <Value>{formatDate(data.meta.agreementDate)}</Value></span>
            <span lang="zh-CN">协议日期：<Value>{formatDate(data.meta.agreementDate)}</Value></span>
          </div>
          <div>
            <span>Reference: <Value>{data.meta.reference}</Value></span>
            <span lang="zh-CN">协议编号：<Value>{data.meta.reference}</Value></span>
          </div>
        </div>
      </header>

      <div className="completion-note">
        <div>{data.meta.statusNote}</div>
        <div lang="zh-CN">{data.meta.statusNoteZh}</div>
      </div>

      <div className="party-grid">
        <section className="party-card">
          <h3><span>Supplier and Installer</span><span lang="zh-CN">供应及安装方</span></h3>
          <p>
            <strong>{data.supplier.name}</strong>
            <br />ABN: {data.supplier.abn}
            <br />Address: {data.supplier.address}
            <br />Phone: {data.supplier.phone}
            <br />Email: {data.supplier.email}
          </p>
          <p className="party-card__zh" lang="zh-CN">
            澳大利亚商业号码：{data.supplier.abn}
            <br />地址：{data.supplier.address}
            <br />电话：{data.supplier.phone}
            <br />电子邮箱：{data.supplier.email}
          </p>
        </section>

        <section className="party-card">
          <h3><span>Client</span><span lang="zh-CN">客户</span></h3>
          <p>
            <strong><Value>{data.client.name}</Value></strong>
            <br />Address: <Value>{data.client.address}</Value>
            <br />Phone: <Value>{data.client.phone}</Value>
            <br />Email: <Value>{data.client.email}</Value>
          </p>
          <p className="party-card__zh" lang="zh-CN">
            姓名：<Value>{data.client.name}</Value>
            <br />地址：<Value>{data.client.address}</Value>
            <br />电话：<Value>{data.client.phone}</Value>
            <br />电子邮箱：<Value>{data.client.email}</Value>
          </p>
        </section>
      </div>

      <div className="project-address">
        <div><strong>Project address for supply and installation:</strong> <Value>{data.client.projectAddress}</Value></div>
        <div lang="zh-CN"><strong>供货及安装项目地址：</strong><Value>{data.client.projectAddress}</Value></div>
      </div>

      <BilingualParagraph
        className="intro-line"
        en="This Agreement is made between the Supplier and Installer and the Client for the project identified above."
        zh="本协议由供应及安装方与客户就上述项目共同签订。"
      />

      <ContractSection number="1" title="Scope of Work" titleZh="工作范围">
        <BilingualParagraph en={data.scope.intro} zh={data.scope.introZh} />
        <BilingualParagraph en={data.scope.productSchedule} zh={data.scope.productScheduleZh} />
        <BilingualParagraph en={data.scope.finalDrawings} zh={data.scope.finalDrawingsZh} />
        <ul>
          {visibleScopeItems.map((item) => (
            <BilingualListItem key={item.key} en={item.en} zh={item.zh} />
          ))}
        </ul>
        <BilingualParagraph
          en={<><strong>Excluded works:</strong> {data.scope.exclusions}</>}
          zh={<><strong>不包含的工作：</strong>{data.scope.exclusionsZh}</>}
        />
      </ContractSection>

      <ContractSection number="2" title="Schedule" titleZh="时间安排">
        <ul>
          <BilingualListItem
            en={<>Estimated production commencement date: <Value>{formatDate(data.schedule.estimatedCommencement)}</Value>.</>}
            zh={<>预计生产开始日期：<Value>{formatDate(data.schedule.estimatedCommencement)}</Value>。</>}
          />
          <BilingualListItem
            en={<>Estimated production period: <Value>{data.schedule.productionPeriod}</Value>.</>}
            zh={<>预计生产周期：<Value>{data.schedule.productionPeriodZh}</Value>。</>}
          />
          <BilingualListItem
            en={<>Estimated sea freight period: <Value>{data.schedule.seaFreightPeriod}</Value>.</>}
            zh={<>预计海运时间：<Value>{data.schedule.seaFreightPeriodZh}</Value>。</>}
          />
          <BilingualListItem
            en={<>Estimated installation date: <Value>{formatDate(data.schedule.estimatedInstallation)}</Value>.</>}
            zh={<>预计安装日期：<Value>{formatDate(data.schedule.estimatedInstallation)}</Value>。</>}
          />
        </ul>
        <BilingualParagraph en={data.schedule.shippingDelay} zh={data.schedule.shippingDelayZh} />
        <BilingualParagraph en={data.schedule.forceMajeure} zh={data.schedule.forceMajeureZh} />
      </ContractSection>

      <ContractSection number="3" title="Contract Price and Payment Terms" titleZh="合同价格及付款条款">
        <table className="summary-table price-table">
          <thead>
            <tr>
              <th><BilingualCell en="Price item" zh="价格项目" /></th>
              <th><BilingualCell en="Amount" zh="金额" /></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><BilingualCell en="Joinery Product Price" zh="全屋定制产品价格" /></td>
              <td><BilingualCell en={`${formatCurrency(joineryPrice)} ${data.commercial.gstWording}`} zh={`${formatCurrency(joineryPrice)}，${gstChinese(data.commercial.gstWording)}`} /></td>
            </tr>
            {data.commercial.includeStone && (
              <tr>
                <td><BilingualCell en="Stone Product Price" zh="石材产品价格" /></td>
                <td><BilingualCell en={`${formatCurrency(stonePrice)} ${data.commercial.gstWording}`} zh={`${formatCurrency(stonePrice)}，${gstChinese(data.commercial.gstWording)}`} /></td>
              </tr>
            )}
            <tr>
              <td><BilingualCell en="Estimated Sea and Land Transport Cost from Factory to Site" zh="从工厂到现场预计海运及陆运费用" /></td>
              <td><BilingualCell en={`${formatCurrency(data.commercial.freightCost)} ${data.commercial.gstWording}`} zh={`${formatCurrency(data.commercial.freightCost)}，${gstChinese(data.commercial.gstWording)}`} /></td>
            </tr>
            <tr>
              <td><BilingualCell en="Handling Fee" zh="搬运费用" /></td>
              <td><BilingualCell en={`${formatCurrency(data.commercial.handlingFee)} ${data.commercial.gstWording}`} zh={`${formatCurrency(data.commercial.handlingFee)}，${gstChinese(data.commercial.gstWording)}`} /></td>
            </tr>
            <tr>
              <td><BilingualCell en="Packaging, Pallets and Waste Disposal Fee" zh="包装、托盘及垃圾处理费用" /></td>
              <td><BilingualCell en={`${formatCurrency(data.commercial.wasteDisposalFee)} ${data.commercial.gstWording}`} zh={`${formatCurrency(data.commercial.wasteDisposalFee)}，${gstChinese(data.commercial.gstWording)}`} /></td>
            </tr>
            <tr>
              <td><BilingualCell en="Joinery and Stone Installation Fee" zh="全屋定制及石材安装费用" /></td>
              <td><BilingualCell en={`${formatCurrency(data.commercial.installationFee)} ${data.commercial.gstWording}`} zh={`${formatCurrency(data.commercial.installationFee)}，${gstChinese(data.commercial.gstWording)}`} /></td>
            </tr>
            <tr className="total-row">
              <td><BilingualCell en="Total Contract Price" zh="合同总价" /></td>
              <td><BilingualCell en={`${formatCurrency(totalValue)} ${data.commercial.gstWording}`} zh={`${formatCurrency(totalValue)}，${gstChinese(data.commercial.gstWording)}`} /></td>
            </tr>
          </tbody>
        </table>

        <BilingualParagraph en={data.commercial.priceNote} zh={data.commercial.priceNoteZh} />

        <div className="payment-stages">
          {data.paymentStages.map((stage, index) => (
            <div className="payment-stage" key={`${stage.title}-${index}`}>
              <h3>
                <span>{index + 1}. {stage.title}</span>
                <span lang="zh-CN">{index + 1}. {stage.titleZh}</span>
              </h3>
              <div className="payment-stage__amount">
                <BilingualCell
                  en={<><strong>Amount:</strong> {formatCurrency(calculated.automaticPaymentAmounts[index] ?? stage.amount)} {data.commercial.gstWording}{stage.calculation ? ` (${stage.calculation})` : ''}</>}
                  zh={<><strong>金额：</strong>{formatCurrency(calculated.automaticPaymentAmounts[index] ?? stage.amount)}，{gstChinese(data.commercial.gstWording)}{stage.calculationZh ? `（${stage.calculationZh}）` : ''}</>}
                />
              </div>
              <BilingualParagraph en={stage.timing} zh={stage.timingZh} />
            </div>
          ))}
        </div>

        <BilingualParagraph en={data.payments.customMadeNonRefundable} zh={data.payments.customMadeNonRefundableZh} />
        <BilingualParagraph
          en={<><strong>Retention for incomplete finalisation:</strong> The Client may retain {data.payments.retentionFrom}% to {data.payments.retentionTo}% of the installation fee in the circumstances described below. {data.payments.retention}</>}
          zh={<><strong>未完成收尾工作的保留款：</strong>在下述情况下，客户可保留安装费的 {data.payments.retentionFrom}% 至 {data.payments.retentionTo}%。{data.payments.retentionZh}</>}
        />

        <BilingualParagraph
          en={<><strong>Accepted payment methods:</strong> {paymentMethodsEn.length ? paymentMethodsEn.join('; ') : '________________'}.</>}
          zh={<><strong>接受的付款方式：</strong>{paymentMethodsZh.length ? paymentMethodsZh.join('；') : '________________'}。</>}
        />

        {data.payments.bankTransfer && (
          <table className="summary-table bank-table">
            <tbody>
              <tr>
                <th><BilingualCell en="Account Name" zh="账户名称" /></th>
                <td>{data.bank.accountName}</td>
              </tr>
              <tr>
                <th>BSB</th>
                <td>{data.bank.bsb}</td>
              </tr>
              <tr>
                <th><BilingualCell en="Account Number" zh="账号" /></th>
                <td>{data.bank.accountNumber}</td>
              </tr>
            </tbody>
          </table>
        )}
      </ContractSection>

      <ContractSection number="4" title="Inspection and Acceptance" titleZh="检查及验收">
        <BilingualParagraph en={data.clauses.acceptance} zh={data.clauses.acceptanceZh} />
      </ContractSection>

      <ContractSection number="5" title="Materials and Warranty" titleZh="材料及质保">
        <BilingualParagraph
          en={`${data.warranty.intro} The warranty period is ${data.warranty.years} years.`}
          zh={`${data.warranty.introZh} 质保期为 ${data.warranty.years} 年。`}
        />
        <BilingualParagraph en={data.warranty.explanatoryNote} zh={data.warranty.explanatoryNoteZh} />

        <div className="warranty-list">
          {visibleWarrantyItems.map((item, index) => (
            <div className="warranty-item" key={`${item.title}-${index}`}>
              <h3>
                <span>{index + 1}. {item.title}</span>
                <span lang="zh-CN">{index + 1}. {item.titleZh}</span>
              </h3>
              <BilingualParagraph en={item.body} zh={item.bodyZh} />
            </div>
          ))}
        </div>

        <BilingualParagraph
          en={<><strong>Warranty exclusions:</strong> {data.warranty.exclusions}</>}
          zh={<><strong>质保除外责任：</strong>{data.warranty.exclusionsZh}</>}
        />
        <BilingualParagraph
          en={<><strong>Call-out fee principles:</strong> {data.warranty.callout}</>}
          zh={<><strong>上门费原则：</strong>{data.warranty.calloutZh}</>}
        />
      </ContractSection>

      <ContractSection number="6" title="Variations" titleZh="变更">
        <BilingualParagraph en={data.clauses.variations} zh={data.clauses.variationsZh} />
      </ContractSection>

      <ContractSection number="7" title="Client Responsibilities" titleZh="客户责任">
        <BilingualParagraph en={data.clauses.clientResponsibilities} zh={data.clauses.clientResponsibilitiesZh} />
      </ContractSection>

      <ContractSection number="8" title="Supplier and Installer Responsibilities" titleZh="供应及安装方责任">
        <BilingualParagraph en={data.clauses.supplierResponsibilities} zh={data.clauses.supplierResponsibilitiesZh} />
      </ContractSection>

      <ContractSection number="9" title="Contract Documents and Attachments" titleZh="合同文件及附件">
        <div className="attachments-block">
          <div>{data.attachments.en}</div>
          <div lang="zh-CN">{data.attachments.zh}</div>
        </div>
      </ContractSection>

      <ContractSection number="10" title="Execution" titleZh="签署">
        <BilingualParagraph en={data.clauses.execution} zh={data.clauses.executionZh} />
        <table className="signature-table">
          <thead>
            <tr>
              <th><BilingualCell en="Supplier and Installer" zh="供应及安装方" /></th>
              <th><BilingualCell en="Client" zh="客户" /></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                {showChinese ? 'Name / 姓名' : 'Name'}: {data.signatures.supplierName || '____________________________'}
                <br /><br />{showChinese ? 'Signature / 签名' : 'Signature'}: __________________________
                <br /><br />{showChinese ? 'Date / 日期' : 'Date'}: ______________________________
              </td>
              <td>
                {showChinese ? 'Name / 姓名' : 'Name'}: {data.signatures.clientName || data.client.name || '____________________________'}
                <br /><br />{showChinese ? 'Signature / 签名' : 'Signature'}: __________________________
                <br /><br />{showChinese ? 'Date / 日期' : 'Date'}: ______________________________
              </td>
            </tr>
          </tbody>
        </table>
      </ContractSection>

      <QuotationAppendix data={data} update={update} />

      <footer className="document-footer">
        <div>{data.supplier.name} — Joinery/Stone Supply and Installation Agreement</div>
        <div lang="zh-CN">{data.supplier.name} — 全屋定制及石材供货与安装协议</div>
      </footer>
    </article>
  );
}
