import { defaultAgreement as defaultSupplyAgreement } from '../editors/supply/data/defaultAgreement.js';
import { defaultAgreement as defaultInstallationAgreement } from '../editors/installation/data/defaultAgreement.js';

const OLD_SECOND_PAYMENT_CALCULATIONS = new Set([
  '',
  '50% of the Joinery Product Price and Stone Product Price, plus 50% of the estimated Sea and Land Transport Cost',
]);
const OLD_SECOND_PAYMENT_CALCULATIONS_ZH = new Set([
  '',
  '全屋定制产品价格及石材产品价格的 50%，另加预计海运及陆运费用的 50%',
]);
const OLD_THIRD_PAYMENT_CALCULATIONS = new Set([
  '',
  'The outstanding balance of all Joinery and Stone Product Prices, together with any outstanding balance of the final Sea and Land Transport Cost',
  '50% of the combined Joinery Product Price, Stone Product Price and estimated Sea and Land Transport Cost',
]);
const OLD_THIRD_PAYMENT_CALCULATIONS_ZH = new Set([
  '',
  '全部全屋定制及石材产品费用的剩余余额，以及最终海运及陆运费用的任何未付余额',
  '全屋定制产品价格、石材产品价格及预计海运和陆运费用合计金额的 50%',
]);
const OLD_THIRD_PAYMENT_TIMINGS = new Set([
  '',
  'On the day all products are delivered to the project site, the Client must pay the outstanding balance so that all Joinery and Stone Product Prices are paid in full. Any outstanding balance of the final sea and land transport charge is also payable on that day.',
]);
const OLD_THIRD_PAYMENT_TIMINGS_ZH = new Set([
  '',
  '在全部产品交付至项目现场当天，客户必须支付全部未付产品款，使全屋定制及石材产品费用全部结清。最终海运及陆运费用如有任何未付余额，也应于当天支付。',
]);

const OLD_INSTALLATION_SCOPE_14_EN = new Set([
  'Unless otherwise agreed in writing, the installation works do not include joinery transportation, sinks, tapware, power outlets, silicone sealing or caulking, or works by other trades.',
  'Unless otherwise agreed in writing, the installation works do not include joinery transportation; installation of stone benchtops, stone splashbacks or other stonework; sinks; tapware; power outlets; silicone sealing or caulking; or works by other trades.',
]);
const OLD_INSTALLATION_SCOPE_14_ZH = new Set([
  '除非双方另有书面约定，安装工作不包括全屋定制产品运输、水槽、水龙头、电源插座、硅胶密封或填缝，以及其他工种的工作。',
  '除非双方另有书面约定，安装工作不包括全屋定制产品运输、石头台面、石头背板等石材安装、水槽、水龙头、电源插座、硅胶密封或填缝，以及其他工种的工作。',
]);

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

export function migrateSupplyAgreement(value) {
  const next = clone(value);
  const secondPayment = next.paymentStages?.[1];
  const thirdPayment = next.paymentStages?.[2];
  const defaultSecondPayment = defaultSupplyAgreement.paymentStages[1];
  const defaultThirdPayment = defaultSupplyAgreement.paymentStages[2];

  if (secondPayment && defaultSecondPayment) {
    if (OLD_SECOND_PAYMENT_CALCULATIONS.has(secondPayment.calculation ?? '')) {
      secondPayment.calculation = defaultSecondPayment.calculation;
    }

    if (OLD_SECOND_PAYMENT_CALCULATIONS_ZH.has(secondPayment.calculationZh ?? '')) {
      secondPayment.calculationZh = defaultSecondPayment.calculationZh;
    }
  }

  if (thirdPayment && defaultThirdPayment) {
    if (OLD_THIRD_PAYMENT_CALCULATIONS.has(thirdPayment.calculation ?? '')) {
      thirdPayment.calculation = defaultThirdPayment.calculation;
    }

    if (OLD_THIRD_PAYMENT_CALCULATIONS_ZH.has(thirdPayment.calculationZh ?? '')) {
      thirdPayment.calculationZh = defaultThirdPayment.calculationZh;
    }

    if (OLD_THIRD_PAYMENT_TIMINGS.has(thirdPayment.timing ?? '')) {
      thirdPayment.timing = defaultThirdPayment.timing;
    }

    if (OLD_THIRD_PAYMENT_TIMINGS_ZH.has(thirdPayment.timingZh ?? '')) {
      thirdPayment.timingZh = defaultThirdPayment.timingZh;
    }
  }

  return next;
}

export function migrateInstallationAgreement(value) {
  const next = clone(value);
  const clause = next.scopeClauses?.find((item) => item?.number === '1.4');
  const defaultClause = defaultInstallationAgreement.scopeClauses.find((item) => item.number === '1.4');

  if (clause && defaultClause) {
    if (OLD_INSTALLATION_SCOPE_14_EN.has(clause.en ?? '')) {
      clause.en = defaultClause.en;
    }

    if (OLD_INSTALLATION_SCOPE_14_ZH.has(clause.zh ?? '')) {
      clause.zh = defaultClause.zh;
    }
  }

  return next;
}
