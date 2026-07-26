import FormSection from '../../../components/FormSection.jsx';
import { CheckboxField, Field, SelectField, TextArea } from '../../../components/Field.jsx';
import Toolbar from '../../../components/Toolbar.jsx';
import { serviceKeys } from '../data/defaultAgreement.js';

const clauseLabels = {
  purpose: ['Purpose', '协议目的'],
  scopeIntro: ['Scope introduction', '服务范围说明'],
  exclusions: ['Excluded services', '不包含的服务'],
  feeNonRefundable: ['Non-refundable design fee', '设计费不退还'],
  feeCredit: ['Design fee credit', '设计费抵扣'],
  quotationStatus: ['Preliminary quotation status', '初步报价性质'],
  revisions: ['Revisions and additional work', '修改及额外工作'],
  clientResponsibilities: ['Client responsibilities', '客户责任'],
  measurements: ['Measurements and site conditions', '量尺及现场条件'],
  intellectualProperty: ['Intellectual property', '知识产权'],
  thirdPartyReliance: ['Third-party reliance', '第三方使用限制'],
  cancellation: ['Cancellation', '终止协议'],
  liability: ['Liability and consumer law', '责任及消费者法'],
  privacy: ['Privacy', '隐私'],
  entireAgreement: ['Entire agreement', '完整协议'],
  governingLaw: ['Governing law', '适用法律'],
};

export default function Sidebar({ data, update, onPrint, onExport, onImport, onReset, activeEditor, onEditorChange, onLogout }) {
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
          <h1>Design Agreement Editor</h1>
          <p>双语初步设计、量尺及报价协议</p>
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
        Changes are saved automatically. 修改会自动保存在当前浏览器中；建议每个客户单独导出一个 JSON 文件。
      </p>

      <FormSection title="1. Agreement details / 协议信息" open>
        <Field label="Agreement title / 英文标题" value={data.meta.title} onChange={(v) => update('meta.title', v)} />
        <Field label="Chinese title / 中文标题" value={data.meta.titleZh} onChange={(v) => update('meta.titleZh', v)} />
        <div className="field-grid">
          <Field label="Agreement date / 协议日期" type="date" value={data.meta.agreementDate} onChange={(v) => update('meta.agreementDate', v)} />
          <Field label="Reference / 协议编号" value={data.meta.reference} onChange={(v) => update('meta.reference', v)} placeholder="e.g. C2A-2026-001" />
        </div>
        <TextArea label="Completion note — English / 完成提示英文" value={data.meta.statusNote} onChange={(v) => update('meta.statusNote', v)} rows={3} />
        <TextArea label="Completion note — Chinese / 完成提示中文" value={data.meta.statusNoteZh} onChange={(v) => update('meta.statusNoteZh', v)} rows={3} />
      </FormSection>

      <FormSection title="2. Client and project / 客户及项目" open>
        <Field label="Client name / 客户姓名" value={data.client.name} onChange={(v) => update('client.name', v)} />
        <Field label="Client address / 客户地址" value={data.client.address} onChange={(v) => update('client.address', v)} />
        <div className="field-grid">
          <Field label="Phone / 电话" value={data.client.phone} onChange={(v) => update('client.phone', v)} />
          <Field label="Email / 电子邮箱" type="email" value={data.client.email} onChange={(v) => update('client.email', v)} />
        </div>
        <Field label="Project address / 项目地址" value={data.client.projectAddress} onChange={(v) => update('client.projectAddress', v)} />
      </FormSection>

      <FormSection title="3. Design fee and credit / 设计费及抵扣" open>
        <div className="field-grid">
          <Field label="Design fee (AUD) / 设计费" type="number" min="0" step="100" value={data.commercial.designFee} onChange={(v) => update('commercial.designFee', v)} />
          <SelectField
            label="GST wording / GST 表述"
            value={data.commercial.gstWording}
            onChange={(v) => update('commercial.gstWording', v)}
            options={[
              { value: 'plus GST', label: 'plus GST / 另加 GST' },
              { value: 'including GST', label: 'including GST / 已含 GST' },
              { value: 'GST not applicable', label: 'GST not applicable / 不适用 GST' },
            ]}
          />
        </div>
        <TextArea label="Payment timing — English / 付款时间英文" value={data.commercial.paymentDue} onChange={(v) => update('commercial.paymentDue', v)} rows={3} />
        <TextArea label="Payment timing — Chinese / 付款时间中文" value={data.commercial.paymentDueZh} onChange={(v) => update('commercial.paymentDueZh', v)} rows={3} />
        <Field label="Credit percentage / 抵扣比例 (%)" type="number" min="0" max="100" value={data.commercial.creditPercentage} onChange={(v) => update('commercial.creditPercentage', v)} />
        <TextArea label="Credit condition — English / 抵扣条件英文" value={data.commercial.creditCondition} onChange={(v) => update('commercial.creditCondition', v)} rows={4} />
        <TextArea label="Credit condition — Chinese / 抵扣条件中文" value={data.commercial.creditConditionZh} onChange={(v) => update('commercial.creditConditionZh', v)} rows={4} />
        <Field
          label="Included revision rounds / 包含修改轮数"
          type="text"
          value={data.commercial.includedRevisionRounds}
          onChange={(v) => update('commercial.includedRevisionRounds', v)}
          placeholder="Enter for each project / 每个项目填写"
        />
      </FormSection>

      <FormSection title="4. Included services / 包含服务">
        {serviceKeys.map((key) => (
          <div className="service-editor" key={key}>
            <CheckboxField
              label={`${data.serviceLabels[key]} / ${data.serviceLabelsZh[key]}`}
              checked={data.services[key]}
              onChange={(v) => update(`services.${key}`, v)}
            />
            <Field
              label="Displayed wording — English / 显示英文"
              value={data.serviceLabels[key]}
              onChange={(v) => update(`serviceLabels.${key}`, v)}
            />
            <Field
              label="Displayed wording — Chinese / 显示中文"
              value={data.serviceLabelsZh[key]}
              onChange={(v) => update(`serviceLabelsZh.${key}`, v)}
            />
          </div>
        ))}
        <TextArea
          label="Additional included services — English / 其他服务英文"
          value={data.services.customIncludedServices}
          onChange={(v) => update('services.customIncludedServices', v)}
          rows={4}
        />
        <TextArea
          label="Additional included services — Chinese / 其他服务中文"
          value={data.services.customIncludedServicesZh}
          onChange={(v) => update('services.customIncludedServicesZh', v)}
          rows={4}
        />
      </FormSection>

      <FormSection title="5. Timing and revisions / 时间及修改">
        <Field label="Estimated start date / 预计开始日期" type="date" value={data.commercial.estimatedStart} onChange={(v) => update('commercial.estimatedStart', v)} />
        <TextArea label="Estimated delivery — English / 预计交付英文" value={data.commercial.estimatedDelivery} onChange={(v) => update('commercial.estimatedDelivery', v)} rows={4} />
        <TextArea label="Estimated delivery — Chinese / 预计交付中文" value={data.commercial.estimatedDeliveryZh} onChange={(v) => update('commercial.estimatedDeliveryZh', v)} rows={4} />
        <Field label="Extra work rate (AUD/hour) / 额外工作时薪" type="number" min="0" value={data.commercial.extraWorkRate} onChange={(v) => update('commercial.extraWorkRate', v)} />
      </FormSection>

      <FormSection title="6. Supplier details / 供应方信息">
        <Field label="Supplier name / 供应方名称" value={data.supplier.name} onChange={(v) => update('supplier.name', v)} />
        <Field label="ABN / 澳大利亚商业号码" value={data.supplier.abn} onChange={(v) => update('supplier.abn', v)} />
        <Field label="Address / 地址" value={data.supplier.address} onChange={(v) => update('supplier.address', v)} />
        <div className="field-grid">
          <Field label="Phone / 电话" value={data.supplier.phone} onChange={(v) => update('supplier.phone', v)} />
          <Field label="Email / 电子邮箱" type="email" value={data.supplier.email} onChange={(v) => update('supplier.email', v)} />
        </div>
      </FormSection>

      <FormSection title="7. Contract clauses / 合同条款">
        {Object.entries(data.clauses).map(([key, value]) => {
          const [englishLabel, chineseLabel] = clauseLabels[key] || [key, key];
          return (
            <div className="clause-editor" key={key}>
              <TextArea
                label={`${englishLabel} — English`}
                value={value}
                onChange={(v) => update(`clauses.${key}`, v)}
                rows={6}
              />
              <TextArea
                label={`${chineseLabel} — 中文`}
                value={data.clausesZh[key]}
                onChange={(v) => update(`clausesZh.${key}`, v)}
                rows={6}
              />
            </div>
          );
        })}
      </FormSection>
    </aside>
  );
}
