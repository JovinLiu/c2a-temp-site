import c2aLogo from '../../../../assets/c2a-cabinetry-logo.png';
function gstQuotationNotice(gstWording) {
  const notices = {
    'plus GST': {
      en: 'All prices shown in this quotation are exclusive of GST unless otherwise stated.',
      zh: '除非另有说明，本报价单所列价格均不含 GST。',
    },
    'including GST': {
      en: 'All prices shown in this quotation include GST unless otherwise stated.',
      zh: '除非另有说明，本报价单所列价格均已包含 GST。',
    },
    'GST not applicable': {
      en: 'GST is not applicable to the prices shown in this quotation.',
      zh: '本报价单所列价格不适用 GST。',
    },
  };

  return (
    notices[gstWording] || {
      en: `GST treatment: ${gstWording || 'not specified'}.`,
      zh: `GST 处理方式：${gstWording || '未注明'}。`,
    }
  );
}

export default function QuotationHeader({ title, titleZh, reference, projectAddress, gstWording }) {
  const gstNotice = gstQuotationNotice(gstWording);

  return (
    <header className="quotation-header">
      <div className="quotation-header__logo-row">
        <img src={c2aLogo.src || c2aLogo} alt="C2A Cabinetry logo" />
      </div>
      <h2>{title}</h2>
      <div className="quotation-header__title-zh" lang="zh-CN">
        {titleZh}
      </div>
      <div className="quotation-header__meta">
        <span>
          Agreement reference: {reference || '________________'}
          <span lang="zh-CN">协议编号：{reference || '________________'}</span>
        </span>
        <span>
          Project address: {projectAddress || '________________'}
          <span lang="zh-CN">项目地址：{projectAddress || '________________'}</span>
        </span>
      </div>
      <div className="quotation-header__gst-note">
        <span>{gstNotice.en}</span>
        <span lang="zh-CN">{gstNotice.zh}</span>
      </div>
    </header>
  );
}
