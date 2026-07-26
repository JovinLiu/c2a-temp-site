import FormSection from '../../../components/FormSection.jsx';
import { CheckboxField, Field, SelectField, TextArea } from '../../../components/Field.jsx';
import Toolbar from '../../../components/Toolbar.jsx';
import { calculateSupplyAgreementAmounts } from '../utils/quotationCalculations.js';

function BilingualTextEditor({ label, value, valueZh, onChange, onChangeZh, rows = 4 }) {
  return (
    <>
      <TextArea label={`${label} — English / 英文`} value={value} onChange={onChange} rows={rows} />
      <TextArea label={`${label} — Chinese / 中文`} value={valueZh} onChange={onChangeZh} rows={rows} />
    </>
  );
}



export default function Sidebar({ data, update, onPrint, onExport, onImport, onReset, activeEditor, onEditorChange, onLogout }) {
  const calculated = calculateSupplyAgreementAmounts(data);

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
          <h1>Supply & Installation Editor</h1>
          <p>全屋定制及石材供货与安装协议</p>
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
        <BilingualTextEditor
          label="Completion note / 填写提示"
          value={data.meta.statusNote}
          valueZh={data.meta.statusNoteZh}
          onChange={(v) => update('meta.statusNote', v)}
          onChangeZh={(v) => update('meta.statusNoteZh', v)}
          rows={3}
        />
      </FormSection>

      <FormSection title="2. Client and project / 客户及项目" open>
        <Field label="Client name / 客户姓名" value={data.client.name} onChange={(v) => update('client.name', v)} />
        <Field label="Client address / 客户地址" value={data.client.address} onChange={(v) => update('client.address', v)} />
        <div className="field-grid">
          <Field label="Phone / 电话" value={data.client.phone} onChange={(v) => update('client.phone', v)} />
          <Field label="Email / 电子邮箱" type="email" value={data.client.email} onChange={(v) => update('client.email', v)} />
        </div>
        <Field label="Project address / 项目地址" value={data.client.projectAddress} onChange={(v) => update('client.projectAddress', v)} />
        <div className="field-grid">
          <Field
            label="Estimated production commencement date / 预计生产开始日期"
            type="date"
            value={data.schedule.estimatedCommencement}
            onChange={(v) => update('schedule.estimatedCommencement', v)}
          />
          <Field
            label="Estimated installation date / 预计安装日期"
            type="date"
            value={data.schedule.estimatedInstallation}
            onChange={(v) => update('schedule.estimatedInstallation', v)}
          />
        </div>
      </FormSection>

      <FormSection title="3. Prices and project inclusions / 价格及项目选择" open>
        <CheckboxField
          label="Include stone products and stone installation / 包含石材产品及安装"
          checked={data.commercial.includeStone}
          onChange={(v) => update('commercial.includeStone', v)}
        />
        <div className="field-grid">
          <Field
            label={`Joinery price (AUD) / 全屋定制产品价格${calculated.joineryIsSynced ? ' — synced from quotation / 已从报价单同步' : ''}`}
            type="number"
            min="0"
            step="0.01"
            value={calculated.joineryPrice}
            readOnly={calculated.joineryIsSynced}
            onChange={(v) => update('commercial.joineryPrice', v)}
          />
          {data.commercial.includeStone && (
            <Field
              label={`Stone price (AUD) / 石材产品价格${calculated.stoneIsSynced ? ' — synced from quotation / 已从报价单同步' : ''}`}
              type="number"
              min="0"
              step="0.01"
              value={calculated.stonePrice}
              readOnly={calculated.stoneIsSynced}
              onChange={(v) => update('commercial.stonePrice', v)}
            />
          )}
        </div>
        <div className="field-grid">
          <Field label="Estimated sea + land transport (AUD) / 预计海运及陆运费用" type="number" min="0" step="100" value={data.commercial.freightCost} onChange={(v) => update('commercial.freightCost', v)} />
          <Field label="Handling fee (AUD) / 搬运费用" type="number" min="0" step="100" value={data.commercial.handlingFee} onChange={(v) => update('commercial.handlingFee', v)} />
        </div>
        <div className="field-grid">
          <Field label="Packaging, pallets and waste disposal (AUD) / 包装、托盘及垃圾处理费用" type="number" min="0" step="100" value={data.commercial.wasteDisposalFee} onChange={(v) => update('commercial.wasteDisposalFee', v)} />
          <Field label="Installation fee (AUD) / 安装费用" type="number" min="0" step="100" value={data.commercial.installationFee} onChange={(v) => update('commercial.installationFee', v)} />
        </div>
        <Field label="Total override (optional) / 总价手动覆盖（可选）" type="number" min="0" step="100" value={data.commercial.totalOverride} onChange={(v) => update('commercial.totalOverride', v)} />
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
        <BilingualTextEditor
          label="Transport and price note / 运输及价格说明"
          value={data.commercial.priceNote}
          valueZh={data.commercial.priceNoteZh}
          onChange={(v) => update('commercial.priceNote', v)}
          onChangeZh={(v) => update('commercial.priceNoteZh', v)}
          rows={4}
        />
      </FormSection>

      <FormSection title="4. Scope of work / 工作范围">
        <BilingualTextEditor
          label="Main scope / 主要范围"
          value={data.scope.intro}
          valueZh={data.scope.introZh}
          onChange={(v) => update('scope.intro', v)}
          onChangeZh={(v) => update('scope.introZh', v)}
        />
        <BilingualTextEditor
          label="Product schedule reference / 产品清单说明"
          value={data.scope.productSchedule}
          valueZh={data.scope.productScheduleZh}
          onChange={(v) => update('scope.productSchedule', v)}
          onChangeZh={(v) => update('scope.productScheduleZh', v)}
        />
        <BilingualTextEditor
          label="Final drawings and variations / 最终图纸及变更"
          value={data.scope.finalDrawings}
          valueZh={data.scope.finalDrawingsZh}
          onChange={(v) => update('scope.finalDrawings', v)}
          onChangeZh={(v) => update('scope.finalDrawingsZh', v)}
          rows={6}
        />
        {data.scopeItems.map((item, index) => (
          <div className="service-editor" key={item.key || index}>
            <CheckboxField
              label={`${item.en} / ${item.zh}`}
              checked={item.enabled}
              onChange={(v) => update(`scopeItems.${index}.enabled`, v)}
            />
            <Field label="Displayed wording — English / 显示英文" value={item.en} onChange={(v) => update(`scopeItems.${index}.en`, v)} />
            <Field label="Displayed wording — Chinese / 显示中文" value={item.zh} onChange={(v) => update(`scopeItems.${index}.zh`, v)} />
          </div>
        ))}
        <BilingualTextEditor
          label="Excluded works / 不包含工作"
          value={data.scope.exclusions}
          valueZh={data.scope.exclusionsZh}
          onChange={(v) => update('scope.exclusions', v)}
          onChangeZh={(v) => update('scope.exclusionsZh', v)}
        />
      </FormSection>

      <FormSection title="5. Schedule / 时间安排">
        <div className="field-grid">
          <Field label="Production period — English / 生产周期英文" value={data.schedule.productionPeriod} onChange={(v) => update('schedule.productionPeriod', v)} />
          <Field label="Production period — Chinese / 生产周期中文" value={data.schedule.productionPeriodZh} onChange={(v) => update('schedule.productionPeriodZh', v)} />
        </div>
        <TextArea label="Sea freight period — English / 海运时间英文" value={data.schedule.seaFreightPeriod} onChange={(v) => update('schedule.seaFreightPeriod', v)} rows={3} />
        <TextArea label="Sea freight period — Chinese / 海运时间中文" value={data.schedule.seaFreightPeriodZh} onChange={(v) => update('schedule.seaFreightPeriodZh', v)} rows={3} />
        <BilingualTextEditor
          label="Shipping delay clause / 海运延误条款"
          value={data.schedule.shippingDelay}
          valueZh={data.schedule.shippingDelayZh}
          onChange={(v) => update('schedule.shippingDelay', v)}
          onChangeZh={(v) => update('schedule.shippingDelayZh', v)}
          rows={6}
        />
        <BilingualTextEditor
          label="Force majeure and unforeseen delay / 不可抗力及意外延误"
          value={data.schedule.forceMajeure}
          valueZh={data.schedule.forceMajeureZh}
          onChange={(v) => update('schedule.forceMajeure', v)}
          onChangeZh={(v) => update('schedule.forceMajeureZh', v)}
          rows={5}
        />
      </FormSection>

      <FormSection title="6. Payment stages / 分阶段付款">
        {data.paymentStages.map((stage, index) => (
          <div className="payment-stage-editor" key={`${stage.title}-${index}`}>
            <h4>{index + 1}. {stage.title} / {stage.titleZh}</h4>
            <div className="field-grid">
              <Field label="Stage title — English / 阶段英文名称" value={stage.title} onChange={(v) => update(`paymentStages.${index}.title`, v)} />
              <Field label="Stage title — Chinese / 阶段中文名称" value={stage.titleZh} onChange={(v) => update(`paymentStages.${index}.titleZh`, v)} />
            </div>
            <Field
              label={index === 0
                ? 'Amount (AUD) / 金额'
                : 'Amount (AUD) — automatically calculated / 金额（自动计算）'}
              type="number"
              step="0.01"
              value={calculated.automaticPaymentAmounts[index] ?? stage.amount}
              readOnly={index > 0}
              onChange={(v) => update(`paymentStages.${index}.amount`, v)}
            />
            <div className="field-grid">
              <Field label="Calculation — English / 计算方式英文" value={stage.calculation} onChange={(v) => update(`paymentStages.${index}.calculation`, v)} placeholder="e.g. 50% of product price" />
              <Field label="Calculation — Chinese / 计算方式中文" value={stage.calculationZh} onChange={(v) => update(`paymentStages.${index}.calculationZh`, v)} placeholder="例如：产品价格的 50%" />
            </div>
            <TextArea label="Payment timing — English / 付款条件英文" value={stage.timing} onChange={(v) => update(`paymentStages.${index}.timing`, v)} rows={4} />
            <TextArea label="Payment timing — Chinese / 付款条件中文" value={stage.timingZh} onChange={(v) => update(`paymentStages.${index}.timingZh`, v)} rows={4} />
          </div>
        ))}
        <BilingualTextEditor
          label="Custom-made product non-refundable clause / 定制产品不退款条款"
          value={data.payments.customMadeNonRefundable}
          valueZh={data.payments.customMadeNonRefundableZh}
          onChange={(v) => update('payments.customMadeNonRefundable', v)}
          onChangeZh={(v) => update('payments.customMadeNonRefundableZh', v)}
          rows={5}
        />
        <div className="field-grid">
          <Field label="Retention from (%) / 保留款起始比例" type="number" min="0" max="100" value={data.payments.retentionFrom} onChange={(v) => update('payments.retentionFrom', v)} />
          <Field label="Retention to (%) / 保留款最高比例" type="number" min="0" max="100" value={data.payments.retentionTo} onChange={(v) => update('payments.retentionTo', v)} />
        </div>
        <BilingualTextEditor
          label="Retention wording / 保留款条款"
          value={data.payments.retention}
          valueZh={data.payments.retentionZh}
          onChange={(v) => update('payments.retention', v)}
          onChangeZh={(v) => update('payments.retentionZh', v)}
          rows={5}
        />
        <CheckboxField label="Accept bank transfer / 接受银行转账" checked={data.payments.bankTransfer} onChange={(v) => update('payments.bankTransfer', v)} />
        <CheckboxField label="Accept Alipay payment link / 接受支付宝付款链接" checked={data.payments.alipay} onChange={(v) => update('payments.alipay', v)} />
      </FormSection>

      <FormSection title="7. Supplier and bank details / 供应方及银行信息">
        <Field label="Supplier name / 公司名称" value={data.supplier.name} onChange={(v) => update('supplier.name', v)} />
        <Field label="ABN / 澳大利亚商业号码" value={data.supplier.abn} onChange={(v) => update('supplier.abn', v)} />
        <Field label="Address / 地址" value={data.supplier.address} onChange={(v) => update('supplier.address', v)} />
        <div className="field-grid">
          <Field label="Phone / 电话" value={data.supplier.phone} onChange={(v) => update('supplier.phone', v)} />
          <Field label="Email / 电子邮箱" value={data.supplier.email} onChange={(v) => update('supplier.email', v)} />
        </div>
        <Field label="Account name / 账户名称" value={data.bank.accountName} onChange={(v) => update('bank.accountName', v)} />
        <div className="field-grid">
          <Field label="BSB" value={data.bank.bsb} onChange={(v) => update('bank.bsb', v)} />
          <Field label="Account number / 账号" value={data.bank.accountNumber} onChange={(v) => update('bank.accountNumber', v)} />
        </div>
      </FormSection>

      <FormSection title="8. Warranty / 质保">
        <Field label="Warranty period (years) / 质保年限" value={data.warranty.years} onChange={(v) => update('warranty.years', v)} />
        <BilingualTextEditor
          label="Warranty introduction / 质保说明"
          value={data.warranty.intro}
          valueZh={data.warranty.introZh}
          onChange={(v) => update('warranty.intro', v)}
          onChangeZh={(v) => update('warranty.introZh', v)}
          rows={5}
        />
        <BilingualTextEditor
          label="After-sales explanation / 售后说明"
          value={data.warranty.explanatoryNote}
          valueZh={data.warranty.explanatoryNoteZh}
          onChange={(v) => update('warranty.explanatoryNote', v)}
          onChangeZh={(v) => update('warranty.explanatoryNoteZh', v)}
          rows={5}
        />
        {data.warrantyItems.map((item, index) => (
          <div className="warranty-editor" key={`${item.title}-${index}`}>
            <h4>{index + 1}. {item.title}</h4>
            <Field label="Issue title — English / 问题标题英文" value={item.title} onChange={(v) => update(`warrantyItems.${index}.title`, v)} />
            <Field label="Issue title — Chinese / 问题标题中文" value={item.titleZh} onChange={(v) => update(`warrantyItems.${index}.titleZh`, v)} />
            <TextArea label="Remedy and coverage — English / 处理及质保英文" value={item.body} onChange={(v) => update(`warrantyItems.${index}.body`, v)} rows={6} />
            <TextArea label="Remedy and coverage — Chinese / 处理及质保中文" value={item.bodyZh} onChange={(v) => update(`warrantyItems.${index}.bodyZh`, v)} rows={6} />
          </div>
        ))}
        <BilingualTextEditor
          label="Warranty exclusions / 质保除外责任"
          value={data.warranty.exclusions}
          valueZh={data.warranty.exclusionsZh}
          onChange={(v) => update('warranty.exclusions', v)}
          onChangeZh={(v) => update('warranty.exclusionsZh', v)}
          rows={7}
        />
        <BilingualTextEditor
          label="Call-out fee principles / 上门费原则"
          value={data.warranty.callout}
          valueZh={data.warranty.calloutZh}
          onChange={(v) => update('warranty.callout', v)}
          onChangeZh={(v) => update('warranty.calloutZh', v)}
          rows={6}
        />
      </FormSection>

      <FormSection title="9. General clauses / 一般条款">
        <BilingualTextEditor
          label="Inspection and acceptance / 检查及验收"
          value={data.clauses.acceptance}
          valueZh={data.clauses.acceptanceZh}
          onChange={(v) => update('clauses.acceptance', v)}
          onChangeZh={(v) => update('clauses.acceptanceZh', v)}
          rows={6}
        />
        <BilingualTextEditor
          label="Variations / 变更"
          value={data.clauses.variations}
          valueZh={data.clauses.variationsZh}
          onChange={(v) => update('clauses.variations', v)}
          onChangeZh={(v) => update('clauses.variationsZh', v)}
          rows={5}
        />
        <BilingualTextEditor
          label="Client responsibilities / 客户责任"
          value={data.clauses.clientResponsibilities}
          valueZh={data.clauses.clientResponsibilitiesZh}
          onChange={(v) => update('clauses.clientResponsibilities', v)}
          onChangeZh={(v) => update('clauses.clientResponsibilitiesZh', v)}
          rows={6}
        />
        <BilingualTextEditor
          label="Supplier responsibilities / 供应方责任"
          value={data.clauses.supplierResponsibilities}
          valueZh={data.clauses.supplierResponsibilitiesZh}
          onChange={(v) => update('clauses.supplierResponsibilities', v)}
          onChangeZh={(v) => update('clauses.supplierResponsibilitiesZh', v)}
          rows={6}
        />
        <BilingualTextEditor
          label="Execution clause / 签署条款"
          value={data.clauses.execution}
          valueZh={data.clauses.executionZh}
          onChange={(v) => update('clauses.execution', v)}
          onChangeZh={(v) => update('clauses.executionZh', v)}
          rows={4}
        />
      </FormSection>

      <FormSection title="10. Attachments and signatures / 附件及签字">
        <TextArea label="Attachments — English / 附件英文" value={data.attachments.en} onChange={(v) => update('attachments.en', v)} rows={6} />
        <TextArea label="Attachments — Chinese / 附件中文" value={data.attachments.zh} onChange={(v) => update('attachments.zh', v)} rows={6} />
        <Field label="Supplier signatory name / 供应方签字人" value={data.signatures.supplierName} onChange={(v) => update('signatures.supplierName', v)} />
        <Field label="Client signatory name / 客户签字人" value={data.signatures.clientName} onChange={(v) => update('signatures.clientName', v)} />
      </FormSection>



    </aside>
  );
}
