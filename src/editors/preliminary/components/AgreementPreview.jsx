import c2aLogo from '../../../assets/c2a-cabinetry-logo.png';
import { serviceKeys } from '../data/defaultAgreement.js';
import { formatCurrency, formatDate } from '../utils/formatters.js';

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

export default function AgreementPreview({ data }) {
  const showChinese = data.display?.showChinese !== false;
  const selectedServices = serviceKeys.filter((key) => data.services[key]);
  const extraRateEn = data.commercial.extraWorkRate
    ? `${formatCurrency(data.commercial.extraWorkRate)} plus GST per hour`
    : 'A rate advised and agreed in writing before the additional work begins';
  const extraRateZh = data.commercial.extraWorkRate
    ? `每小时 ${formatCurrency(data.commercial.extraWorkRate)}，另加 GST`
    : '在额外工作开始前由供应方告知并经双方书面同意的费率';

  const creditSentenceEn = `${data.commercial.creditCondition} If this occurs, the Supplier will credit ${data.commercial.creditPercentage}% of the Design Fee against the product or production price payable under the separate supply and installation agreement.`;
  const creditSentenceZh = `${data.commercial.creditConditionZh} 在该情况下，供应方将把设计费的 ${data.commercial.creditPercentage}% 抵扣后续另行签订的供货及安装协议项下应支付的产品或生产费用。`;

  return (
    <article className={`document ${showChinese ? 'document--bilingual' : 'document--english-only'}`}>
      <header className="document-header document-header--with-logo">
        <div className="document-header__logo-row">
          <img className="document-header__logo" src={c2aLogo} alt="C2A Cabinetry logo" />
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
          <h3><span>Supplier</span><span lang="zh-CN">供应方</span></h3>
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
        <div><strong>Project address:</strong> <Value>{data.client.projectAddress}</Value></div>
        <div lang="zh-CN"><strong>项目地址：</strong><Value>{data.client.projectAddress}</Value></div>
      </div>

      <BilingualParagraph
        className="intro-line"
        en="This Agreement is made between the Supplier and the Client for the project identified above."
        zh="本协议由供应方与客户就上述项目共同签订。"
      />

      <ContractSection number="1" title="Purpose of this Agreement" titleZh="本协议的目的">
        <BilingualParagraph en={data.clauses.purpose} zh={data.clausesZh.purpose} />
        <BilingualParagraph
          en="This Agreement covers preliminary professional services only. It is not an agreement for the supply, manufacture, delivery or installation of joinery, stone or other products."
          zh="本协议仅适用于前期专业服务，并非柜体、石材或其他产品的供应、生产、运输或安装协议。"
        />
      </ContractSection>

      <ContractSection number="2" title="Services" titleZh="服务内容">
        <BilingualParagraph en={data.clauses.scopeIntro} zh={data.clausesZh.scopeIntro} />
        <ul>
          {selectedServices.map((key) => (
            <BilingualListItem
              key={key}
              en={data.serviceLabels[key]}
              zh={data.serviceLabelsZh[key]}
            />
          ))}
          {data.services.customIncludedServices && (
            <BilingualListItem
              en={data.services.customIncludedServices}
              zh={data.services.customIncludedServicesZh || '其他约定的服务内容'}
            />
          )}
        </ul>
        <BilingualParagraph
          en={<><strong>Excluded services:</strong> {data.clauses.exclusions}</>}
          zh={<><strong>不包含的服务：</strong>{data.clausesZh.exclusions}</>}
        />
      </ContractSection>

      <ContractSection number="3" title="Design Fee and Payment" titleZh="设计费及付款">
        <table className="summary-table">
          <tbody>
            <tr>
              <th><BilingualCell en="Design Fee" zh="设计费" /></th>
              <td>
                <BilingualCell
                  en={`${formatCurrency(data.commercial.designFee)} ${data.commercial.gstWording}`}
                  zh={`${formatCurrency(data.commercial.designFee)}，${gstChinese(data.commercial.gstWording)}`}
                />
              </td>
            </tr>
            <tr>
              <th><BilingualCell en="Included revision rounds" zh="包含的修改轮数" /></th>
              <td><Value>{data.commercial.includedRevisionRounds}</Value></td>
            </tr>
            <tr>
              <th><BilingualCell en="Additional work" zh="额外工作" /></th>
              <td><BilingualCell en={extraRateEn} zh={extraRateZh} /></td>
            </tr>
          </tbody>
        </table>
        <BilingualParagraph en={data.commercial.paymentDue} zh={data.commercial.paymentDueZh} />
        <BilingualParagraph en={data.clauses.feeNonRefundable} zh={data.clausesZh.feeNonRefundable} />
      </ContractSection>

      <ContractSection
        number="4"
        title="Credit Toward a Later Supply and Installation Agreement"
        titleZh="后续供货及安装协议的费用抵扣"
      >
        <BilingualParagraph en={creditSentenceEn} zh={creditSentenceZh} />
        <BilingualParagraph en={data.clauses.feeCredit} zh={data.clausesZh.feeCredit} />
      </ContractSection>

      <ContractSection number="5" title="Timing" titleZh="时间安排">
        <BilingualParagraph
          en={<>Estimated commencement date: <Value>{formatDate(data.commercial.estimatedStart)}</Value>.</>}
          zh={<>预计开始日期：<Value>{formatDate(data.commercial.estimatedStart)}</Value>。</>}
        />
        <BilingualParagraph en={data.commercial.estimatedDelivery} zh={data.commercial.estimatedDeliveryZh} />
        <BilingualParagraph
          en="Any timeframe is an estimate and may change where information, approvals, access or third-party details are delayed, or where the Client changes the project requirements."
          zh="所有时间均为预计时间。如资料、审批、现场进入条件或第三方信息延迟，或客户更改项目要求，完成时间可能相应调整。"
        />
      </ContractSection>

      <ContractSection number="6" title="Revisions and Additional Work" titleZh="修改及额外工作">
        <BilingualParagraph en={data.clauses.revisions} zh={data.clausesZh.revisions} />
      </ContractSection>

      <ContractSection number="7" title="Preliminary Quotation" titleZh="初步报价">
        <BilingualParagraph en={data.clauses.quotationStatus} zh={data.clausesZh.quotationStatus} />
      </ContractSection>

      <ContractSection number="8" title="Client Responsibilities" titleZh="客户责任">
        <BilingualParagraph en={data.clauses.clientResponsibilities} zh={data.clausesZh.clientResponsibilities} />
      </ContractSection>

      <ContractSection number="9" title="Measurements and Site Conditions" titleZh="量尺及现场条件">
        <BilingualParagraph en={data.clauses.measurements} zh={data.clausesZh.measurements} />
      </ContractSection>

      <ContractSection
        number="10"
        title="Intellectual Property and Use of Documents"
        titleZh="知识产权及文件使用"
      >
        <BilingualParagraph en={data.clauses.intellectualProperty} zh={data.clausesZh.intellectualProperty} />
        <BilingualParagraph en={data.clauses.thirdPartyReliance} zh={data.clausesZh.thirdPartyReliance} />
      </ContractSection>

      <ContractSection number="11" title="Cancellation" titleZh="终止协议">
        <BilingualParagraph en={data.clauses.cancellation} zh={data.clausesZh.cancellation} />
      </ContractSection>

      <ContractSection number="12" title="Liability and Consumer Law" titleZh="责任及消费者法">
        <BilingualParagraph en={data.clauses.liability} zh={data.clausesZh.liability} />
      </ContractSection>

      <ContractSection number="13" title="Privacy" titleZh="隐私">
        <BilingualParagraph en={data.clauses.privacy} zh={data.clausesZh.privacy} />
      </ContractSection>

      <ContractSection
        number="14"
        title="Entire Agreement and Governing Law"
        titleZh="完整协议及适用法律"
      >
        <BilingualParagraph en={data.clauses.entireAgreement} zh={data.clausesZh.entireAgreement} />
        <BilingualParagraph en={data.clauses.governingLaw} zh={data.clausesZh.governingLaw} />
      </ContractSection>

      <ContractSection number="15" title="Acceptance and Signatures" titleZh="接受及签署">
        <BilingualParagraph
          en="By signing below, both parties confirm that they have read, understood and accepted this Agreement."
          zh="双方在下方签字，即确认已经阅读、理解并接受本协议。"
        />
        <table className="signature-table">
          <thead>
            <tr>
              <th><BilingualCell en="Supplier" zh="供应方" /></th>
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

      <footer className="document-footer">
        <div>{data.supplier.name} — Preliminary Design, Measurement and Quotation Agreement</div>
        <div lang="zh-CN">{data.supplier.name} — 初步设计、量尺及报价服务协议</div>
      </footer>
    </article>
  );
}
