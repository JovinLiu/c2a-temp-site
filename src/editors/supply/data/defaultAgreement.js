export const defaultAgreement = {
  display: {
    showChinese: true,
  },
  meta: {
    title: 'Joinery/Stone Supply and Installation Agreement',
    titleZh: '全屋定制及石材供货与安装协议',
    agreementDate: '',
    reference: '',
    statusNote:
      'Complete all highlighted commercial fields and review the final drawings, product schedule and payment amounts before signing.',
    statusNoteZh:
      '签署前请填写所有商业信息，并核对最终图纸、产品清单及各阶段付款金额。',
  },
  supplier: {
    name: 'C2A Joinery Pty Ltd',
    abn: '93 696 720 091',
    address: '16 Highland Cres, Mooroolbark VIC 3138',
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
  scope: {
    intro:
      'The Supplier and Installer agrees to supply and install custom joinery products and stone products for the Client in accordance with the Client’s design requirements and the final approved drawings.',
    introZh:
      '供应及安装方同意根据客户的设计要求及最终批准的图纸，为客户供应并安装全屋定制产品及石材产品。',
    productSchedule:
      'The products to be supplied are listed in the Product and Price Schedule attached to this Agreement.',
    productScheduleZh:
      '本协议项下供应的产品以本协议所附《产品及价格清单》为准。',
    finalDrawings:
      'The final configuration, dimensions, finishes and materials of the custom joinery shall be based on the final CAD drawings approved by the Client. If the Client requests any material or substantial change after this Agreement is signed, the Supplier and Installer may revise the contract price, production timeframe, freight cost and installation schedule accordingly. The final product price and sea freight charges shall be calculated by reference to the final approved CAD drawings.',
    finalDrawingsZh:
      '全屋定制的最终布局、尺寸、表面处理及材料以客户最终批准的 CAD 图纸为准。如客户在本协议签署后提出任何重大或实质性变更，供应及安装方可相应调整合同价格、生产周期、运输费用及安装时间。最终产品价格及海运费用应根据最终批准的 CAD 图纸计算。',
    exclusions:
      'Installation does not include plumbing or electrical works, including taps, power outlets, appliance connections or any other plumbing or electrical connection, unless expressly included in writing.',
    exclusionsZh:
      '除非双方另有书面约定，安装工作不包括给排水或电气工程，包括水龙头、电源插座、电器连接或任何其他给排水及电气连接。',
  },
  scopeItems: [
    {
      enabled: true,
      key: 'transport',
      en: 'All land transport, sea freight and delivery services from the factory to the Client’s project address.',
      zh: '从工厂至客户项目地址的全部陆运、海运及送货服务。',
    },
    {
      enabled: true,
      key: 'joineryInstallation',
      en: 'Full installation of the custom joinery products supplied by C2A Joinery Pty Ltd.',
      zh: '对 C2A Joinery Pty Ltd 所供应全屋定制产品进行完整安装。',
    },
    {
      enabled: true,
      key: 'stoneInstallation',
      visibility: 'stone',
      en: 'Full installation of stone products supplied by C2A Joinery Pty Ltd.',
      zh: '对 C2A Joinery Pty Ltd 所供应石材产品进行完整安装。',
    },
    {
      enabled: true,
      key: 'touchUp',
      en: 'Touch-up and surface repair for accidental transport or installation damage where reasonably repairable.',
      zh: '对运输或安装过程中意外造成且可合理修复的损伤进行补漆及表面修复。',
    },
    {
      enabled: true,
      key: 'cabinetHardware',
      en: 'Installation of cabinetry, drawers, cabinet doors, hinges, handles and other hardware shown on the approved drawings.',
      zh: '安装批准图纸中所示的柜体、抽屉、柜门、铰链、拉手及其他五金。',
    },
    {
      enabled: true,
      key: 'ledLighting',
      en: 'Installation of cabinet-integrated LED strip lighting supplied as part of the joinery package.',
      zh: '安装作为全屋定制套餐一部分供应的柜内集成 LED 灯带。',
    },
    {
      enabled: true,
      key: 'finishingPanels',
      en: 'Installation of finishing panels and other finishing components shown on the approved drawings.',
      zh: '安装批准图纸中所示的收口板及其他收口部件。',
    },
    {
      enabled: true,
      key: 'appliancePanels',
      en: 'Installation and adjustment of integrated dishwasher and integrated refrigerator panels, based on the approved appliance specifications.',
      zh: '根据批准的电器规格，安装并调整嵌入式洗碗机及嵌入式冰箱门板。',
    },
    {
      enabled: true,
      key: 'finalCleaning',
      en: 'Reasonable final cleaning of the installed joinery and stone work areas.',
      zh: '对已安装全屋定制产品及石材施工区域进行合理的最终清洁。',
    },
  ],
  commercial: {
    includeStone: true,
    joineryPrice: '',
    stonePrice: '',
    freightCost: '',
    handlingFee: '',
    wasteDisposalFee: '',
    installationFee: '',
    totalOverride: '',
    gstWording: 'plus GST',
    priceNote:
      'The sea and land transport amount is an estimate. The final transport charge may be adjusted to reflect the final approved drawings, actual shipment volume, carrier charges, delivery access conditions and other transport costs.',
    priceNoteZh:
      '海运及陆运金额为预计费用。最终运输费用可根据最终批准图纸、实际运输体积、承运人收费、现场送货条件及其他运输成本进行调整。',
  },
  schedule: {
    estimatedCommencement: '',
    productionPeriod: 'approximately 4 weeks',
    productionPeriodZh: '约 4 周',
    seaFreightPeriod: 'approximately 3 to 4 weeks from vessel departure to arrival at the Port of Melbourne',
    seaFreightPeriodZh: '自船舶离港至抵达墨尔本港约 3 至 4 周',
    estimatedInstallation: '',
    shippingDelay:
      'The sea freight period is an estimate only and does not constitute a guaranteed delivery date. If arrival is delayed due to circumstances beyond the Supplier and Installer’s reasonable control, including shipping line schedule changes, rolled cargo, transshipment, port congestion, customs or quarantine inspection, weather, strikes, government action or other uncontrollable factors, the Supplier and Installer will consult with the Client as soon as reasonably practicable.',
    shippingDelayZh:
      '海运时间仅为预计时间，并不构成保证交付日期。如因供应及安装方合理控制范围以外的情况导致到港延误，包括船公司船期变更、甩柜、转运、港口拥堵、海关或检疫查验、天气、罢工、政府行为或其他不可控因素，供应及安装方将尽快与客户沟通。',
    forceMajeure:
      'If the works are delayed because of force majeure or other unforeseen circumstances, including weather conditions, Client variations or material shortages, the Supplier and Installer will notify the Client as soon as reasonably practicable.',
    forceMajeureZh:
      '如工程因不可抗力或其他不可预见情况而延误，包括天气状况、客户变更或材料短缺，供应及安装方将尽快通知客户。',
  },
  paymentStages: [
    {
      title: 'First Payment',
      titleZh: '第一笔付款',
      amount: '2000',
      calculation: 'Fixed deposit amount, less any eligible preliminary measurement and design fee credit',
      calculationZh: '固定定金金额，扣除符合条件的前期量尺及设计服务费抵扣额',
      timing:
        'The Client shall pay this amount as the initial deposit. If the Client previously entered into a Preliminary Measurement and Design Services Agreement with the Supplier and paid the relevant service fee, that paid fee will be credited against the First Payment. Any credit exceeding the First Payment may be applied against the later product charges under this Agreement.',
      timingZh:
        '客户应支付该款项作为首笔定金。如客户此前已与供应方签订《前期量尺及设计服务协议》并支付相关服务费，该已付费用应从第一笔付款中抵扣。如抵扣金额超过第一笔付款，超出部分可继续抵扣本协议项下后续产品费用。',
    },
    {
      title: 'Second Payment',
      titleZh: '第二笔付款',
      amount: '',
      calculation:
        '50% of the combined Joinery Product Price, Stone Product Price and estimated Sea and Land Transport Cost, less the First Payment',
      calculationZh:
        '全屋定制产品价格、石材产品价格及预计海运和陆运费用合计金额的 50%，再扣除第一笔付款',
      timing:
        'The Second Payment is payable before production commences. Production is not required to commence until cleared payment has been received.',
      timingZh:
        '第二笔付款应在生产开始前支付。在供应及安装方收到已到账款项之前，无须开始生产。',
    },
    {
      title: 'Third Payment',
      titleZh: '第三笔付款',
      amount: '',
      calculation:
        '50% of the combined Joinery Product Price, Stone Product Price and estimated Sea and Land Transport Cost, plus the Handling Fee and Packaging, Pallets and Waste Disposal Fee',
      calculationZh:
        '全屋定制产品价格、石材产品价格及预计海运和陆运费用合计金额的 50%，再加搬运费用及包装、托盘和垃圾处理费用',
      timing:
        'The Third Payment is payable on the day all products are delivered to the project site.',
      timingZh:
        '第三笔付款应在全部产品交付至项目现场当天支付。',
    },
    {
      title: 'Fourth Payment',
      titleZh: '第四笔付款',
      amount: '',
      calculation: '50% of the total Installation Fee',
      calculationZh: '安装费用总额的 50%',
      timing:
        'The Client must pay 50% of the total Installation Fee when approximately 50% of the installation works have been completed. Payment must be made within 7 days after the Client receives the relevant invoice.',
      timingZh:
        '当安装工作完成约 50% 时，客户须向供应及安装方支付安装费用总额的 50%。客户应在收到相关付款发票后 7 天内完成支付。',
    },
    {
      title: 'Fifth Payment',
      titleZh: '第五笔付款',
      amount: '',
      calculation: '50% of the total Installation Fee',
      calculationZh: '安装费用总额的 50%',
      timing:
        'The Client must pay the remaining 50% of the total Installation Fee after the project has been completed and the products and installation works have been inspected and accepted by the Client. Payment must be made within 7 days after the Client receives the relevant invoice.',
      timingZh:
        '项目完成并经客户检查及验收后，客户须向供应及安装方支付安装费用总额剩余的 50%。客户应在收到相关付款发票后 7 天内完成支付。',
    },
  ],
  payments: {
    customMadeNonRefundable:
      'Because the products under this Agreement are custom-made specifically for the Client, once production has commenced, the first and second payments are non-refundable.',
    customMadeNonRefundableZh:
      '由于本协议项下产品为客户专门定制，一旦生产开始，第一笔及第二笔付款不予退还。',
    retentionFrom: '5',
    retentionTo: '10',
    retention:
      'If the installation works cannot be fully completed because additional materials are required, or because the Supplier and Installer must wait for other trades or work stages to be completed, the Client may retain the stated percentage range of the installation fee as the final balance. The retained balance must be paid once all remaining works have been completed.',
    retentionZh:
      '如因需要额外材料，或供应及安装方须等待其他工种或施工阶段完成而无法完成全部安装工作，客户可在所填写的比例范围内保留部分安装费作为最终尾款。全部剩余工作完成后，客户应支付该保留款。',
    bankTransfer: true,
    alipay: true,
  },
  bank: {
    accountName: 'C2A Joinery Pty Ltd',
    bsb: '067-873',
    accountNumber: '2325-1885',
  },
  warranty: {
    years: '5',
    intro:
      'The Supplier and Installer provides a warranty for the products supplied and installation services performed under this Agreement, including free standard call-out rectification for defects falling within the warranty scope.',
    introZh:
      '供应及安装方对本协议项下供应的产品及完成的安装服务提供质保。对于属于质保范围的缺陷，供应及安装方将提供免费的标准上门检查及整改服务。',
    explanatoryNote:
      'The following list describes potential issues, remedies and warranty coverage so the Client can understand the after-sales process. These are low-probability or occasional scenarios and do not imply that the products are defective or that the issues will necessarily occur.',
    explanatoryNoteZh:
      '以下内容列出可能出现的问题、处理方式及质保范围，以便客户了解售后服务流程。这些情况通常发生概率较低或仅偶尔出现，并不表示产品存在缺陷或相关问题一定会发生。',
    exclusions:
      'Warranty does not cover damage caused by misuse, deliberate or accidental damage, external impact, unauthorised alteration, dismantling or third-party works; leaks, dampness, mould, pests, building settlement or structural movement; plumbing or electrical issues; normal wear and tear; or minor colour, grain, glue-line and joint variation within reasonable industry tolerances.',
    exclusionsZh:
      '质保不包括因误用、故意或意外损坏、外部撞击、未经授权的改装、拆卸或第三方施工造成的损坏；渗漏、潮湿、霉菌、虫害、建筑沉降或结构移动造成的损坏；给排水或电气问题造成的损坏；正常磨损；以及合理行业公差范围内的轻微色差、纹理差异、胶线及接缝差异。',
    callout:
      'Where an issue falls within warranty coverage, rectification and standard call-out attendance will be free of charge. Where an issue falls outside warranty coverage, the Supplier and Installer may charge a call-out fee and/or material and labour costs and will advise the Client of the costs before carrying out the work.',
    calloutZh:
      '如问题属于质保范围，整改及标准上门服务不收费。如问题不属于质保范围，供应及安装方可收取上门费、材料费及人工费，并会在开展相关工作前告知客户费用。',
  },
  warrantyItems: [
    {
      title: 'Door and Drawer Front Alignment Issues',
      titleZh: '柜门及抽屉面板对齐问题',
      body:
        'Examples include slight panel misalignment, uneven gaps or difficulty opening and closing, particularly during the initial period of use or because of minor building movement. Remedy may include hinge adjustment, gap alignment and position correction. Covered where the issue falls within installation adjustment and commissioning.',
      bodyZh:
        '例如面板轻微错位、缝隙不均或开启关闭不顺，尤其可能发生在初期使用阶段或建筑物轻微移动后。处理方式包括调整铰链、校正缝隙及位置。属于安装调试范围的问题在质保期内免费处理。',
    },
    {
      title: 'Panel Warping, Distortion or Expansion',
      titleZh: '板材翘曲、变形或膨胀',
      body:
        'The Supplier and Installer will inspect site conditions and heat protection and, where reasonably repairable, rectify the issue or replace the affected panel. Covered where caused by product quality, manufacturing defects or an unreasonable design outcome under normal use. Not covered where caused by water ingress, extreme environmental conditions or direct heat exposure.',
      bodyZh:
        '供应及安装方将检查现场环境及隔热保护，并在可合理修复的情况下进行整改或更换受影响板件。在正常使用条件下因产品质量、制造缺陷或不合理设计结果造成的问题属于质保范围；因进水、极端环境或直接高温造成的问题不属于质保范围。',
    },
    {
      title: 'Surface Scratches, Chips or Paint Damage',
      titleZh: '表面划痕、崩边或漆面损坏',
      body:
        'Transport or installation damage raised before acceptance will be rectified. After acceptance, defects caused by material quality or manufacturing issues will also be repaired or replaced. Damage caused by misuse, scratching or impact is not covered.',
      bodyZh:
        '在验收前提出的运输或安装损伤将由供应及安装方整改。验收后，如缺陷由材料质量或制造问题造成，也将进行维修或更换。因使用不当、刮擦或撞击造成的损坏不属于质保范围。',
    },
    {
      title: 'Loose Hinges, Noise, or Soft-Close / Rebound Failure',
      titleZh: '铰链松动、异响或缓冲／反弹功能失效',
      body:
        'Remedy may include tightening, lubrication, adjustment or replacement of hinges. Covered where caused by hardware defects or installation issues. Not covered where caused by misuse, pulling, impact or deformation due to external force.',
      bodyZh:
        '处理方式包括紧固、润滑、调整或更换铰链。因五金缺陷或安装问题造成的情况属于质保范围；因误用、拉扯、撞击或外力变形造成的情况不属于质保范围。',
    },
    {
      title: 'Drawer Runner Jamming, Poor Return, or Drawer Sagging',
      titleZh: '抽屉滑轨卡滞、回位不良或抽屉下沉',
      body:
        'Remedy may include cleaning foreign matter from the runners, re-adjustment, re-fixing or replacement. Covered where caused by product defects or installation issues. Not covered where caused by overloading, long-term excessive weight or obstruction in the track.',
      bodyZh:
        '处理方式包括清理滑轨异物、重新调整、重新固定或更换滑轨。因产品缺陷或安装问题造成的情况属于质保范围；因超载、长期放置过重物品或轨道堵塞造成的情况不属于质保范围。',
    },
    {
      title: 'Loose Handles, C-Channel Handles, or J-Channel Handles',
      titleZh: '拉手、C 型槽拉手或 J 型槽拉手松动',
      body:
        'Remedy may include re-tightening screws or replacing handles, screws or profile sections. Covered where caused by product defects or installation issues. Not covered where caused by misuse, impact damage or unauthorised removal or modification.',
      bodyZh:
        '处理方式包括重新紧固螺丝，或更换拉手、螺丝及型材部件。因产品缺陷或安装问题造成的情况属于质保范围；因误用、撞击损坏或未经授权的拆卸及改装造成的情况不属于质保范围。',
    },
    {
      title: 'Edge Banding Delamination or Lifting',
      titleZh: '封边脱胶或翘起',
      body:
        'The Supplier and Installer may re-bond the edge banding or replace the affected panel. Covered where caused by manufacturing or workmanship defects. Not covered where caused by prolonged moisture exposure or water damage.',
      bodyZh:
        '供应及安装方可重新粘合封边或更换受影响板件。因制造或工艺缺陷造成的问题属于质保范围；因长期受潮或水损造成的问题不属于质保范围。',
    },
    {
      title: 'Loose Cabinet Connectors or Sagging Shelves',
      titleZh: '柜体连接件松动或层板下沉',
      body:
        'Remedy may include reinforcing fittings, adjusting shelf supports, adding support components or replacing the shelf. Covered where caused by installation or material defects. Not covered where caused by long-term overloading or excessive weight storage.',
      bodyZh:
        '处理方式包括加固连接件、调整层板托、增加支撑部件或更换层板。因安装或材料缺陷造成的问题属于质保范围；因长期超载或存放过重物品造成的问题不属于质保范围。',
    },
    {
      visibility: 'stone',
      title: 'Benchtop and Stone Splashback Joint Issues',
      titleZh: '台面及石材防溅板接缝问题',
      body:
        'This includes noticeable colour variation at a joint or joint and sealant lines that are excessively visible. Remedy may include grinding, polishing, resealing or reapplying joint filler. Covered where caused by workmanship and where the result exceeds reasonable industry tolerances.',
      bodyZh:
        '包括接缝处明显色差，或接缝线及密封胶线过于明显。处理方式包括打磨、抛光、重新密封或重新填补接缝。因施工工艺造成且超出合理行业公差的问题属于质保范围。',
    },
    {
      visibility: 'stone',
      title: 'Stone Chipping, Cracking, or Thermal Fracture',
      titleZh: '石材崩边、开裂或热裂',
      body:
        'Minor chips may be repaired and polished; cracks may require replacement of the affected section depending on their extent. Covered where caused by material defects or inadequate installation support under normal use. Not covered where caused by impact, improper use, unsupported loading or direct exposure to excessive heat.',
      bodyZh:
        '轻微崩边可进行修补及抛光；裂缝视程度可能需要更换受影响部分。在正常使用条件下因材料缺陷或安装支撑不足造成的问题属于质保范围；因撞击、使用不当、无支撑受力或直接接触过高温度造成的问题不属于质保范围。',
    },
    {
      visibility: 'led',
      title: 'LED Strip Lighting Failure or Flickering',
      titleZh: 'LED 灯带失效或闪烁',
      body:
        'Remedy may include inspection and repair or replacement of the LED strip, driver, wiring and connectors. Covered for cabinet-integrated LED strips, drivers and associated wiring supplied as part of the joinery package. Not covered where caused by electrical supply issues, electrician-installed wiring faults or Client-supplied components.',
      bodyZh:
        '处理方式包括检查并维修或更换 LED 灯带、驱动器、线路及连接件。作为全屋定制套餐一部分供应的集成 LED 灯带、驱动器及相关线路属于质保范围；因供电问题、电工安装线路故障或客户自备部件造成的问题不属于质保范围。',
    },
    {
      visibility: 'appliance',
      title: 'Misalignment of Integrated Appliance Panels',
      titleZh: '嵌入式电器门板对齐问题',
      body:
        'Remedy may include adjusting panel sizes, clearances and fixing methods in accordance with appliance specifications and, where necessary, replacing the affected panel. If the appliance model or dimensions provided by the Client differ from the approved specifications, or third-party appliance installation causes the issue, the rectification will be treated as a variation and additional charges may apply.',
      bodyZh:
        '处理方式包括根据电器规格调整门板尺寸、间隙及固定方式，必要时更换受影响门板。如客户提供的电器型号或尺寸与批准规格不符，或第三方安装电器造成相关问题，整改将作为变更处理，并可能产生额外费用。',
    },
  ],
  clauses: {
    acceptance:
      'The Client must inspect the products and installation after completion and notify the Supplier and Installer of any alleged defect or incomplete item as soon as reasonably practicable. Minor defects or incomplete finalisation items that do not prevent reasonable use do not entitle the Client to withhold the entire outstanding balance, subject to the agreed retention provision.',
    acceptanceZh:
      '安装完成后，客户应检查产品及安装工作，并在合理可行的情况下尽快通知供应及安装方任何所称缺陷或未完成事项。对于不影响合理使用的轻微缺陷或收尾事项，客户无权扣留全部未付款项，但双方约定的保留款条款除外。',
    variations:
      'Any variation to the scope of supply or installation works must be made in writing and agreed by both parties. A variation may change the contract price, production period, freight cost, delivery date and installation schedule.',
    variationsZh:
      '任何对供货或安装工作范围的变更，均须以书面形式提出并经双方同意。变更可能影响合同价格、生产周期、运输费用、交付日期及安装时间。',
    clientResponsibilities:
      'The Client must provide access to the work site during agreed working hours; ensure the site is safe, ready for installation and free of obstructions; provide timely approvals and feedback for designs and documentation; provide accurate appliance models and specifications; and coordinate other trades so the installation can proceed.',
    clientResponsibilitiesZh:
      '客户应在约定工作时间内提供现场进入条件；确保现场安全、具备安装条件且无障碍物；及时对设计及文件提供批准或反馈；提供准确的电器型号及规格；并协调其他工种，以便安装工作顺利进行。',
    supplierResponsibilities:
      'The Supplier and Installer must complete the works professionally and within a reasonable timeframe; maintain reasonable cleanliness and safety at the work site; and rectify defects or issues relating to the supplied products or installation services where they fall within the warranty scope.',
    supplierResponsibilitiesZh:
      '供应及安装方应以专业方式并在合理时间内完成工作；保持施工现场合理的清洁及安全；并对属于质保范围的所供应产品或安装服务缺陷进行整改。',
    execution:
      'Both parties agree to the terms of this Agreement and confirm their acceptance by signing below.',
    executionZh:
      '双方同意本协议条款，并通过在下方签字确认接受本协议。',
  },

  appendix: {
    title: 'Schedule 1 – Joinery and Stone Quotations',
    titleZh: '附录一——全屋定制及石材报价单',
    joinery: {
      title: 'Custom Joinery Quotation',
      titleZh: '全屋定制报价单',
      defaultRate: '',
      totalPriceOverride: '',
      syncToContractPrice: true,
      hardwareStatement:
        'Hardware: ______________________________. Hinges: ______________________________. Drawer runners: ______________________________.',
      rows: [
        { spaceName: '', joineryName: '', length: '', height: '', carcassFinish: '', doorFinish: '', description: '', rate: '' },
      ],
    },
    stone: {
      title: 'Stone Quotation',
      titleZh: '石材报价单',
      defaultRate: '',
      totalPriceOverride: '',
      syncToContractPrice: true,
      noteStatement: 'Note:',
      rows: [
        { spaceName: '', joineryName: '', length: '', width: '', colourPattern: '', thickness: '', rate: '' },
      ],
    },
  },
  attachments: {
    en: 'Schedule 1 – Joinery and Stone Quotations\nSchedule 2 – Final Approved CAD Drawings, if applicable\nSchedule 3 – Materials, Finishes and Hardware Schedule, if applicable\nSchedule 4 – Approved Variations, if any',
    zh: '附录一——全屋定制及石材报价单\n附件二——最终批准的 CAD 图纸（如适用）\n附件三——材料、表面处理及五金清单（如适用）\n附件四——经批准的变更（如有）',
  },
  signatures: {
    supplierName: '',
    clientName: '',
  },
};
