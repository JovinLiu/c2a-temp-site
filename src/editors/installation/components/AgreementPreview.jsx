import c2aLogo from '../../../assets/c2a-cabinetry-logo.png';
import InstallationFeeCalculator from './InstallationFeeCalculator.jsx';
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

function NumberedClause({ item }) {
  return (
    <div className="numbered-clause">
      <BilingualParagraph
        en={<><strong>{item.number}</strong> {item.en}</>}
        zh={<><strong>{item.number}</strong> {item.zh}</>}
      />
    </div>
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

export default function AgreementPreview({ data, update }) {
  const showChinese = data.display?.showChinese !== false;

  return (
    <>
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

      <BilingualParagraph
        className="intro-line"
        en={<>This Joinery Installation Agreement (&quot;Agreement&quot;) is made on <Value>{formatDate(data.meta.agreementDate)}</Value> between the following parties.</>}
        zh={<>本《全屋定制安装协议》（以下简称“本协议”）由以下双方于 <Value>{formatDate(data.meta.agreementDate)}</Value> 签订。</>}
      />

      <div className="party-grid">
        <section className="party-card">
          <h3><span>Contractor</span><span lang="zh-CN">承包方</span></h3>
          <p>
            <strong>{data.contractor.name}</strong>
            <br />ABN: {data.contractor.abn}
            {data.contractor.address && <><br />Address: {data.contractor.address}</>}
            <br />Phone: {data.contractor.phone}
            <br />Email: {data.contractor.email}
          </p>
          <p className="party-card__zh" lang="zh-CN">
            澳大利亚商业号码：{data.contractor.abn}
            {data.contractor.address && <><br />地址：{data.contractor.address}</>}
            <br />电话：{data.contractor.phone}
            <br />电子邮箱：{data.contractor.email}
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
        <div><strong>Installation project address:</strong> <Value>{data.client.projectAddress}</Value></div>
        <div lang="zh-CN"><strong>安装项目地址：</strong><Value>{data.client.projectAddress}</Value></div>
      </div>

      <ContractSection number="1" title="Scope of Works" titleZh="工作范围">
        {data.scopeClauses.map((item, index) => (
          <NumberedClause item={item} key={`${item.number}-${index}`} />
        ))}
      </ContractSection>

      <ContractSection number="2" title="Programme" titleZh="工期安排">
        <BilingualParagraph
          en={<><strong>2.1</strong> Commencement Date: <Value>{formatDate(data.programme.commencementDate)}</Value>.</>}
          zh={<><strong>2.1</strong> 开工日期：<Value>{formatDate(data.programme.commencementDate)}</Value>。</>}
        />
        <BilingualParagraph
          en={<><strong>2.2</strong> {data.programme.delay}</>}
          zh={<><strong>2.2</strong> {data.programme.delayZh}</>}
        />
      </ContractSection>

      <ContractSection number="3" title="Contract Sum and Payment Terms" titleZh="合同金额及付款条款">
        <BilingualParagraph
          en={<><strong>3.1 Contract Sum:</strong> {formatCurrency(data.commercial.contractSum)} {data.commercial.gstWording}.</>}
          zh={<><strong>3.1 合同金额：</strong>{formatCurrency(data.commercial.contractSum)}，{gstChinese(data.commercial.gstWording)}。</>}
        />

        <table className="summary-table installation-payment-table">
          <thead>
            <tr>
              <th><BilingualCell en="Stage" zh="阶段" /></th>
              <th><BilingualCell en="Amount" zh="金额" /></th>
              <th><BilingualCell en="When Payable" zh="付款节点" /></th>
              <th><BilingualCell en="Due Date" zh="到期日" /></th>
            </tr>
          </thead>
          <tbody>
            {data.paymentStages.map((stage, index) => (
              <tr key={`${stage.title}-${index}`}>
                <td><BilingualCell en={stage.title} zh={stage.titleZh} /></td>
                <td>{stage.amount}</td>
                <td><BilingualCell en={stage.whenPayable} zh={stage.whenPayableZh} /></td>
                <td><BilingualCell en={stage.dueDate} zh={stage.dueDateZh} /></td>
              </tr>
            ))}
          </tbody>
        </table>

        <BilingualParagraph en={data.retention.en} zh={data.retention.zh} />
        <BilingualParagraph
          en={<><strong>3.2</strong> {data.paymentMethod.en}</>}
          zh={<><strong>3.2</strong> {data.paymentMethod.zh}</>}
        />

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
      </ContractSection>

      <ContractSection number="4" title="Warranty and Quality Statement" titleZh="质保及质量说明">
        {data.warrantyClauses.map((item, index) => (
          <NumberedClause item={item} key={`${item.number}-${index}`} />
        ))}
      </ContractSection>

      <ContractSection number="5" title="Variations" titleZh="变更">
        {data.variationClauses.map((item, index) => (
          <NumberedClause item={item} key={`${item.number}-${index}`} />
        ))}
      </ContractSection>

      <ContractSection number="6" title="Client Responsibilities" titleZh="客户责任">
        {data.clientResponsibilities.map((item, index) => (
          <NumberedClause item={item} key={`${item.number}-${index}`} />
        ))}
      </ContractSection>

      <ContractSection number="7" title="Contractor Responsibilities" titleZh="承包方责任">
        {data.contractorResponsibilities.map((item, index) => (
          <NumberedClause item={item} key={`${item.number}-${index}`} />
        ))}
      </ContractSection>

      <ContractSection number="8" title="Signatures" titleZh="签署">
        <BilingualParagraph en={data.execution.en} zh={data.execution.zh} />
        <table className="signature-table">
          <thead>
            <tr>
              <th><BilingualCell en="Contractor" zh="承包方" /></th>
              <th><BilingualCell en="Client" zh="客户" /></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                {showChinese ? 'Name / 姓名' : 'Name'}: {data.signatures.contractorName || '____________________________'}
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
        <div>{data.contractor.name} — Joinery Installation Agreement</div>
        <div lang="zh-CN">{data.contractor.name} — 全屋定制安装协议</div>
      </footer>
      </article>

      <InstallationFeeCalculator data={data} update={update} />
    </>
  );
}
