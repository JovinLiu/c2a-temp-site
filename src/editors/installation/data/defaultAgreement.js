export const defaultAgreement = {
  display: {
    showChinese: true,
  },
  meta: {
    title: 'Joinery Installation Agreement',
    titleZh: '全屋定制安装协议',
    agreementDate: '',
    reference: '',
    statusNote:
      'Complete the Client, project, contract sum, commencement date and payment details before signing.',
    statusNoteZh:
      '签署前请填写客户、项目、合同金额、开工日期及付款信息。',
  },
  contractor: {
    name: 'C2A Joinery Pty Ltd',
    abn: '93 696 720 091',
    address: '',
    phone: '0413 685 018',
    email: 'liujovin@gmail.com',
  },
  client: {
    name: '',
    address: '',
    phone: '',
    email: '',
    projectAddress: '',
  },
  scopeClauses: [
    {
      number: '1.1',
      en: 'The Contractor will install custom joinery products at the project address in accordance with the designs and shop drawings provided by the building designer and joinery manufacturer.',
      zh: '承包方将根据建筑设计师及全屋定制产品制造商提供的设计和施工图，在项目地址安装全屋定制产品。',
    },
    {
      number: '1.2',
      en: 'Unless otherwise agreed in writing, the installation works include cabinetry, drawers, cabinet doors, hinges, handles and other supplied hardware, LED strip lighting, finishing/filler panels, integrated dishwasher panels, integrated refrigerator panels, and final clean-up of the Contractor’s work area.',
      zh: '除非双方另有书面约定，安装工作包括柜体、抽屉、柜门、铰链、拉手及其他随货供应的五金、LED 灯带、收口板或填充板、嵌入式洗碗机门板、嵌入式冰箱门板，以及承包方施工区域的最终清洁。',
    },
    {
      number: '1.3',
      en: 'Installation of appliances, including rangehoods and ovens, is not included in this Agreement and will be charged separately.',
      zh: '本协议不包含电器安装，包括抽油烟机及烤箱；如需安装，将另行收费。',
    },
    {
      number: '1.4',
      en: 'Unless otherwise agreed in writing, the installation works do not include joinery transportation; the installation of stone products, including stone benchtops, stone splashbacks and other stonework; sinks; tapware; power outlets; silicone sealing or caulking; or works by other trades.',
      zh: '除非双方另有书面约定，安装工作不包括全屋定制产品运输、石材产品安装（包括石材台面、石材背板及其他石材工程）、水槽、水龙头、电源插座、硅胶密封或填缝，以及其他工种的工作。',
    },
    {
      number: '1.5',
      en: 'The Client acknowledges that joinery products manufactured overseas, including products manufactured in China, must be properly coordinated with the Australian building structure, site conditions, measurements, services and construction tolerances before installation. If, in the Contractor’s reasonable opinion, the joinery products are not suitable for installation due to inadequate coordination, inaccurate site measurements, design discrepancies, structural issues, unsafe site conditions, or any other site condition beyond the Contractor’s control, the Contractor has the right to refuse, suspend or delay the installation until the issue has been rectified. The Contractor will not be responsible for any delay, additional cost, defect, damage or non-compliance arising from such issues unless caused by the Contractor’s own installation work.',
      zh: '客户确认，在海外制造（包括在中国制造）的全屋定制产品，在安装前必须与澳大利亚建筑结构、现场条件、测量数据、各项设施及施工公差进行妥善协调。如承包方基于合理判断认为，由于协调不足、现场测量不准确、设计不一致、结构问题、现场不安全或承包方无法控制的其他现场条件，相关产品不适合安装，承包方有权拒绝、暂停或延迟安装，直至问题得到整改。除非相关问题由承包方自身的安装工作造成，否则承包方不对由此产生的延误、额外费用、缺陷、损坏或不合规承担责任。',
    },
  ],
  programme: {
    commencementDate: '',
    delay:
      'If the works are delayed by force majeure or circumstances beyond the Contractor’s reasonable control, including weather, Client-requested changes, material shortages, or delays by other trades, the Contractor will notify the Client as soon as practicable. Any affected timeframe will be adjusted accordingly.',
    delayZh:
      '如工程因不可抗力或承包方合理控制范围以外的情况而延误，包括天气、客户要求的变更、材料短缺或其他工种延误，承包方将尽快通知客户，受影响的工期应相应调整。',
  },
  commercial: {
    contractSum: '',
    gstWording: 'plus GST',
  },
  installationQuotation: {
    title: 'Installation Fee Calculator',
    titleZh: '安装费计算表',
    defaultRate: '',
    rows: [
      {
        spaceName: '',
        joineryName: '',
        length: '',
        height: '',
        carcassFinish: '',
        doorFinish: '',
        description: '',
      },
    ],
  },
  paymentStages: [
    {
      title: 'First Payment',
      titleZh: '第一笔付款',
      amount: '50%',
      whenPayable: 'When approximately 50% of the installation work has been completed.',
      whenPayableZh: '当安装工作完成约 50% 时。',
      dueDate: 'Within 14 days of invoice',
      dueDateZh: '发票开具后 14 天内',
    },
    {
      title: 'Second Payment',
      titleZh: '第二笔付款',
      amount: '50%',
      whenPayable: 'Upon completion of the project and acceptance by the Client.',
      whenPayableZh: '项目完成并经客户验收后。',
      dueDate: 'Within 14 days of invoice',
      dueDateZh: '发票开具后 14 天内',
    },
  ],
  retention: {
    en: 'If the works cannot be fully completed because additional materials are required or other trades or work stages must be completed first, the Client may instead pay 40% or 45% as the second payment and retain 10% or 5% as the final balance, payable once all work is completed.',
    zh: '如因需要补充材料，或须先完成其他工种或施工阶段，导致工程无法全部完成，客户可将第二笔付款调整为 40% 或 45%，并保留 10% 或 5% 作为最终余额，待全部工作完成后支付。',
  },
  paymentMethod: {
    en: 'Payment is to be made by bank transfer.',
    zh: '付款应通过银行转账完成。',
  },
  bank: {
    accountName: 'C2A Joinery Pty Ltd',
    bsb: '067-873',
    accountNumber: '2325-1885',
  },
  warrantyClauses: [
    {
      number: '4.1',
      en: 'The Contractor provides a 5-year workmanship warranty for the installation services performed under this Agreement.',
      zh: '承包方对本协议项下完成的安装服务提供 5 年施工工艺质保。',
    },
    {
      number: '4.2',
      en: 'This warranty does not cover damage caused by misuse, improper maintenance, defects in the products themselves, or other external factors.',
      zh: '本质保不涵盖因使用不当、维护不当、产品本身缺陷或其他外部因素造成的损坏。',
    },
    {
      number: '4.3',
      en: 'The parties acknowledge that the final presentation of custom joinery is the combined result of the manufacturing quality of the supplied products and the workmanship of the local installation team. As installation is a manual service and may be affected by site conditions and trade tolerances, the Contractor does not guarantee an absolutely perfect final finish.',
      zh: '双方确认，全屋定制产品的最终呈现效果由所供应产品的制造质量与本地安装团队的施工工艺共同决定。由于安装属于人工服务，并可能受到现场条件及各工种施工公差的影响，承包方不保证最终效果达到绝对完美。',
    },
  ],
  variationClauses: [
    {
      number: '5.1',
      en: 'Any change to the scope of works or the contract price must be made in writing and agreed by both parties.',
      zh: '对工作范围或合同价格的任何变更，必须以书面形式提出并由双方同意。',
    },
    {
      number: '5.2',
      en: 'Variations may result in additional costs and may affect the completion timeframe. Any such additional costs and revised timeframe must be agreed by both parties.',
      zh: '变更可能产生额外费用，并可能影响完工时间。任何额外费用及调整后的工期均须由双方同意。',
    },
  ],
  clientResponsibilities: [
    {
      number: '6.1',
      en: 'Provide access to the site during the agreed working hours.',
      zh: '在约定的工作时间内提供现场进入条件。',
    },
    {
      number: '6.2',
      en: 'Ensure the site is safe and ready for installation, including being free from unnecessary obstructions.',
      zh: '确保现场安全并具备安装条件，包括清除不必要的障碍物。',
    },
    {
      number: '6.3',
      en: 'Provide approvals or feedback in a timely manner where required.',
      zh: '在需要时及时提供批准或反馈。',
    },
    {
      number: '6.4',
      en: 'Acknowledge that the Contractor is not responsible for product damage caused during transportation.',
      zh: '确认承包方不对运输过程中造成的产品损坏负责。',
    },
  ],
  contractorResponsibilities: [
    {
      number: '7.1',
      en: 'Carry out the works with reasonable care and skill, in a professional and timely manner.',
      zh: '以合理的谨慎与技能，专业并及时地完成工作。',
    },
    {
      number: '7.2',
      en: 'Maintain the cleanliness and safety of the work area.',
      zh: '保持施工区域清洁和安全。',
    },
    {
      number: '7.3',
      en: 'Rectify defects or issues relating to installation workmanship during the warranty period.',
      zh: '在质保期内修复与安装工艺有关的缺陷或问题。',
    },
    {
      number: '7.4',
      en: 'Notify the Client promptly if any product damage is identified during unloading or handling at site. The Contractor is not responsible for damage caused during transportation.',
      zh: '如在现场卸货或搬运过程中发现产品损坏，应及时通知客户。承包方不对运输过程中造成的损坏负责。',
    },
  ],
  execution: {
    en: 'By signing below, both parties confirm that they have read and accepted the terms of this Agreement.',
    zh: '双方在下方签字，即确认已经阅读并接受本协议条款。',
  },
  signatures: {
    contractorName: '',
    clientName: '',
  },
};
