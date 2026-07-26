import FormSection from '../../../components/FormSection.jsx';
import { Field, SelectField, TextArea } from '../../../components/Field.jsx';
import Toolbar from '../../../components/Toolbar.jsx';
import { calculateInstallationQuotation } from '../utils/installationQuotationCalculations.js';

function BilingualClauseEditor({ item, path, update, rows = 5 }) {
  return (
    <div className="clause-editor">
      <Field
        label="Clause number / 条款编号"
        value={item.number}
        onChange={(value) => update(`${path}.number`, value)}
      />
      <TextArea
        label="English / 英文"
        value={item.en}
        onChange={(value) => update(`${path}.en`, value)}
        rows={rows}
      />
      <TextArea
        label="Chinese / 中文"
        value={item.zh}
        onChange={(value) => update(`${path}.zh`, value)}
        rows={rows}
      />
    </div>
  );
}

export default function Sidebar({
  data,
  update,
  onPrint,
  onExport,
  onImport,
  onReset,
  activeEditor,
  onEditorChange,
  onLogout,
}) {
  const installationCalculation = calculateInstallationQuotation(data.installationQuotation);
  const contractSumIsSynced = installationCalculation.hasCalculatedFee;

  return (
    <aside className="sidebar">
      <button className="button sidebar-logout" type="button" onClick={onLogout}>
        Log out / 退出登录
      </button>

      <div className="editor-switcher">
        <label htmlFor="agreement-editor-select">Agreement editor / 协议编辑器</label>
        <select
          id="agreement-editor-select"
          value={activeEditor}
          onChange={(event) => onEditorChange(event.target.value)}
        >
          <option value="preliminary">Preliminary Design Agreement / 前期设计协议</option>
          <option value="supply">Supply & Installation Agreement / 供货安装协议</option>
          <option value="installation">Installation Agreement / 安装协议</option>
        </select>
      </div>

      <div className="brand brand--after-switcher">
        <div className="brand__mark">C2A</div>
        <div>
          <h1>Installation Agreement Editor</h1>
          <p>仅限全屋定制安装服务协议</p>
        </div>
      </div>

      <Toolbar
        onPrint={onPrint}
        onExport={onExport}
        onImport={onImport}
        onReset={onReset}
      />

      <div className="language-selector" role="group" aria-label="Agreement language display">
        <button
          className={`language-selector__button ${!data.display.showChinese ? 'is-active' : ''}`}
          type="button"
          onClick={() => update('display.showChinese', false)}
        >
          English only
        </button>
        <button
          className={`language-selector__button ${data.display.showChinese ? 'is-active' : ''}`}
          type="button"
          onClick={() => update('display.showChinese', true)}
        >
          English + 中文
        </button>
      </div>

      <p className="sidebar__note">
        Installation services only. No product supply, freight or stone quotation is included. / 本协议仅适用于安装服务，不包含产品供应、运输或石材报价。
      </p>

      <FormSection title="1. Agreement details / 协议信息" open>
        <Field label="Agreement title / 英文标题" value={data.meta.title} onChange={(value) => update('meta.title', value)} />
        <Field label="Chinese title / 中文标题" value={data.meta.titleZh} onChange={(value) => update('meta.titleZh', value)} />
        <div className="field-grid">
          <Field label="Agreement date / 协议日期" type="date" value={data.meta.agreementDate} onChange={(value) => update('meta.agreementDate', value)} />
          <Field label="Reference / 协议编号" value={data.meta.reference} onChange={(value) => update('meta.reference', value)} placeholder="e.g. C2A-INSTALL-001" />
        </div>
        <TextArea label="Completion note — English / 填写提示英文" value={data.meta.statusNote} onChange={(value) => update('meta.statusNote', value)} rows={3} />
        <TextArea label="Completion note — Chinese / 填写提示中文" value={data.meta.statusNoteZh} onChange={(value) => update('meta.statusNoteZh', value)} rows={3} />
      </FormSection>

      <FormSection title="2. Client and project / 客户及项目" open>
        <Field label="Client name / 客户姓名" value={data.client.name} onChange={(value) => update('client.name', value)} />
        <Field label="Client address / 客户地址" value={data.client.address} onChange={(value) => update('client.address', value)} />
        <div className="field-grid">
          <Field label="Phone / 电话" value={data.client.phone} onChange={(value) => update('client.phone', value)} />
          <Field label="Email / 电子邮箱" type="email" value={data.client.email} onChange={(value) => update('client.email', value)} />
        </div>
        <Field label="Installation address / 安装地址" value={data.client.projectAddress} onChange={(value) => update('client.projectAddress', value)} />
      </FormSection>

      <FormSection title="3. Contract sum and payments / 合同金额及付款" open>
        <div className="field-grid">
          <Field
            label={`Contract sum (AUD) / 合同金额${contractSumIsSynced ? ' — synced from installation calculator / 已从安装费计算表同步' : ''}`}
            type="number"
            min="0"
            step="0.01"
            value={contractSumIsSynced ? installationCalculation.totalFee.toFixed(2) : data.commercial.contractSum}
            readOnly={contractSumIsSynced}
            onChange={(value) => update('commercial.contractSum', value)}
          />
          <SelectField
            label="GST wording / GST 表述"
            value={data.commercial.gstWording}
            onChange={(value) => update('commercial.gstWording', value)}
            options={[
              { value: 'plus GST', label: 'plus GST / 另加 GST' },
              { value: 'including GST', label: 'including GST / 已含 GST' },
              { value: 'GST not applicable', label: 'GST not applicable / 不适用 GST' },
            ]}
          />
        </div>

        {data.paymentStages.map((stage, index) => (
          <div className="payment-stage-editor" key={`${stage.title}-${index}`}>
            <h4>{index + 1}. {stage.title} / {stage.titleZh}</h4>
            <div className="field-grid">
              <Field label="Title — English / 英文名称" value={stage.title} onChange={(value) => update(`paymentStages.${index}.title`, value)} />
              <Field label="Title — Chinese / 中文名称" value={stage.titleZh} onChange={(value) => update(`paymentStages.${index}.titleZh`, value)} />
            </div>
            <Field label="Amount or percentage / 金额或比例" value={stage.amount} onChange={(value) => update(`paymentStages.${index}.amount`, value)} />
            <TextArea label="When payable — English / 付款节点英文" value={stage.whenPayable} onChange={(value) => update(`paymentStages.${index}.whenPayable`, value)} rows={3} />
            <TextArea label="When payable — Chinese / 付款节点中文" value={stage.whenPayableZh} onChange={(value) => update(`paymentStages.${index}.whenPayableZh`, value)} rows={3} />
            <div className="field-grid">
              <Field label="Due date — English / 到期日英文" value={stage.dueDate} onChange={(value) => update(`paymentStages.${index}.dueDate`, value)} />
              <Field label="Due date — Chinese / 到期日中文" value={stage.dueDateZh} onChange={(value) => update(`paymentStages.${index}.dueDateZh`, value)} />
            </div>
          </div>
        ))}

        <TextArea label="Retention clause — English / 保留款条款英文" value={data.retention.en} onChange={(value) => update('retention.en', value)} rows={5} />
        <TextArea label="Retention clause — Chinese / 保留款条款中文" value={data.retention.zh} onChange={(value) => update('retention.zh', value)} rows={5} />
        <TextArea label="Payment method — English / 付款方式英文" value={data.paymentMethod.en} onChange={(value) => update('paymentMethod.en', value)} rows={2} />
        <TextArea label="Payment method — Chinese / 付款方式中文" value={data.paymentMethod.zh} onChange={(value) => update('paymentMethod.zh', value)} rows={2} />
        <Field label="Bank account name / 银行账户名称" value={data.bank.accountName} onChange={(value) => update('bank.accountName', value)} />
        <div className="field-grid">
          <Field label="BSB" value={data.bank.bsb} onChange={(value) => update('bank.bsb', value)} />
          <Field label="Account number / 银行账号" value={data.bank.accountNumber} onChange={(value) => update('bank.accountNumber', value)} />
        </div>
      </FormSection>

      <FormSection title="4. Scope of works / 安装工作范围">
        {data.scopeClauses.map((item, index) => (
          <BilingualClauseEditor
            key={`${item.number}-${index}`}
            item={item}
            path={`scopeClauses.${index}`}
            update={update}
            rows={index === 4 ? 10 : 5}
          />
        ))}
      </FormSection>

      <FormSection title="5. Programme / 工期安排">
        <Field label="Commencement date / 开工日期" type="date" value={data.programme.commencementDate} onChange={(value) => update('programme.commencementDate', value)} />
        <TextArea label="Delay clause — English / 延误条款英文" value={data.programme.delay} onChange={(value) => update('programme.delay', value)} rows={6} />
        <TextArea label="Delay clause — Chinese / 延误条款中文" value={data.programme.delayZh} onChange={(value) => update('programme.delayZh', value)} rows={6} />
      </FormSection>

      <FormSection title="6. Warranty and quality / 质保及质量说明">
        {data.warrantyClauses.map((item, index) => (
          <BilingualClauseEditor
            key={`${item.number}-${index}`}
            item={item}
            path={`warrantyClauses.${index}`}
            update={update}
            rows={index === 2 ? 7 : 4}
          />
        ))}
      </FormSection>

      <FormSection title="7. Variations / 变更">
        {data.variationClauses.map((item, index) => (
          <BilingualClauseEditor
            key={`${item.number}-${index}`}
            item={item}
            path={`variationClauses.${index}`}
            update={update}
          />
        ))}
      </FormSection>

      <FormSection title="8. Client responsibilities / 客户责任">
        {data.clientResponsibilities.map((item, index) => (
          <BilingualClauseEditor
            key={`${item.number}-${index}`}
            item={item}
            path={`clientResponsibilities.${index}`}
            update={update}
            rows={3}
          />
        ))}
      </FormSection>

      <FormSection title="9. Contractor responsibilities / 承包方责任">
        {data.contractorResponsibilities.map((item, index) => (
          <BilingualClauseEditor
            key={`${item.number}-${index}`}
            item={item}
            path={`contractorResponsibilities.${index}`}
            update={update}
            rows={3}
          />
        ))}
      </FormSection>

      <FormSection title="10. Contractor and signatures / 承包方及签署信息">
        <Field label="Contractor name / 承包方名称" value={data.contractor.name} onChange={(value) => update('contractor.name', value)} />
        <Field label="ABN" value={data.contractor.abn} onChange={(value) => update('contractor.abn', value)} />
        <Field label="Address (optional) / 地址（可选）" value={data.contractor.address} onChange={(value) => update('contractor.address', value)} />
        <div className="field-grid">
          <Field label="Phone / 电话" value={data.contractor.phone} onChange={(value) => update('contractor.phone', value)} />
          <Field label="Email / 电子邮箱" type="email" value={data.contractor.email} onChange={(value) => update('contractor.email', value)} />
        </div>
        <TextArea label="Execution clause — English / 签署条款英文" value={data.execution.en} onChange={(value) => update('execution.en', value)} rows={3} />
        <TextArea label="Execution clause — Chinese / 签署条款中文" value={data.execution.zh} onChange={(value) => update('execution.zh', value)} rows={3} />
        <div className="field-grid">
          <Field label="Contractor signatory / 承包方签署人" value={data.signatures.contractorName} onChange={(value) => update('signatures.contractorName', value)} />
          <Field label="Client signatory / 客户签署人" value={data.signatures.clientName} onChange={(value) => update('signatures.clientName', value)} />
        </div>
      </FormSection>
    </aside>
  );
}
