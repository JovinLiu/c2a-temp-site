import { numericValue } from './formatters.js';

export function calculateArea(length, heightOrWidth) {
  const lengthValue = numericValue(length);
  const secondValue = numericValue(heightOrWidth);
  if (!lengthValue || !secondValue) return 0;
  return (lengthValue * secondValue) / 1_000_000;
}

function effectiveRate(rowRate, defaultRate) {
  return numericValue(rowRate) || numericValue(defaultRate);
}

function hasEnteredValue(value) {
  return value !== '' && value !== null && value !== undefined;
}

export function calculateJoineryQuotation(joinery) {
  const rows = joinery?.rows || [];
  const calculatedRows = rows.map((row) => {
    const area = calculateArea(row.length, row.height);
    const rate = effectiveRate(row.rate, joinery.defaultRate);
    return { ...row, area, rate, amount: area * rate };
  });
  const totalArea = calculatedRows.reduce((sum, row) => sum + row.area, 0);
  const calculatedPrice = calculatedRows.reduce((sum, row) => sum + row.amount, 0);
  const override = numericValue(joinery?.totalPriceOverride);
  const hasOverride = hasEnteredValue(joinery?.totalPriceOverride);
  const hasCalculatedPrice = calculatedRows.some((row) => row.area > 0 && row.rate > 0);
  const totalPrice = hasOverride ? override : calculatedPrice;
  return { rows: calculatedRows, totalArea, totalPrice, hasPrice: hasOverride || hasCalculatedPrice };
}

export function calculateStoneQuotation(stone) {
  const rows = stone?.rows || [];
  const calculatedRows = rows.map((row) => {
    const area = calculateArea(row.length, row.width);
    const rate = effectiveRate(row.rate, stone.defaultRate);
    return { ...row, area, rate, amount: area * rate };
  });
  const calculatedPrice = calculatedRows.reduce((sum, row) => sum + row.amount, 0);
  const override = numericValue(stone?.totalPriceOverride);
  const hasOverride = hasEnteredValue(stone?.totalPriceOverride);
  const hasCalculatedPrice = calculatedRows.some((row) => row.area > 0 && row.rate > 0);
  const totalPrice = hasOverride ? override : calculatedPrice;
  return { rows: calculatedRows, totalPrice, hasPrice: hasOverride || hasCalculatedPrice };
}

export function calculateAppendixTotals(appendix) {
  return {
    joinery: calculateJoineryQuotation(appendix?.joinery || {}),
    stone: calculateStoneQuotation(appendix?.stone || {}),
  };
}

/**
 * Returns the effective agreement prices and the four automatically calculated
 * payment amounts. Quotation totals take precedence whenever their sync switch
 * is enabled and a quotation price is available.
 */
export function calculateSupplyAgreementAmounts(data) {
  const appendixTotals = calculateAppendixTotals(data?.appendix);
  const commercial = data?.commercial || {};
  const paymentStages = data?.paymentStages || [];

  const joineryIsSynced = Boolean(
    data?.appendix?.joinery?.syncToContractPrice && appendixTotals.joinery.hasPrice,
  );
  const stoneIsSynced = Boolean(
    commercial.includeStone
      && data?.appendix?.stone?.syncToContractPrice
      && appendixTotals.stone.hasPrice,
  );

  const joineryPrice = joineryIsSynced
    ? appendixTotals.joinery.totalPrice
    : commercial.joineryPrice;
  const stonePrice = commercial.includeStone
    ? (stoneIsSynced ? appendixTotals.stone.totalPrice : commercial.stonePrice)
    : '';

  const productAndFreightTotal = numericValue(joineryPrice)
    + numericValue(stonePrice)
    + numericValue(commercial.freightCost);
  const hasProductAndFreightValue = joineryIsSynced
    || stoneIsSynced
    || hasEnteredValue(commercial.joineryPrice)
    || (commercial.includeStone && hasEnteredValue(commercial.stonePrice))
    || hasEnteredValue(commercial.freightCost);

  const firstPayment = paymentStages[0]?.amount ?? '';
  const installationFee = commercial.installationFee;
  const hasInstallationFee = hasEnteredValue(installationFee);

  const handlingFee = commercial.handlingFee;
  const wasteDisposalFee = commercial.wasteDisposalFee;
  const hasThirdPaymentValue = hasProductAndFreightValue
    || hasEnteredValue(handlingFee)
    || hasEnteredValue(wasteDisposalFee);

  const automaticPaymentAmounts = [
    firstPayment,
    hasProductAndFreightValue
      ? productAndFreightTotal / 2 - numericValue(firstPayment)
      : '',
    hasThirdPaymentValue
      ? productAndFreightTotal / 2
        + numericValue(handlingFee)
        + numericValue(wasteDisposalFee)
      : '',
    hasInstallationFee ? numericValue(installationFee) / 2 : '',
    hasInstallationFee ? numericValue(installationFee) / 2 : '',
  ];

  return {
    appendixTotals,
    joineryPrice,
    stonePrice,
    joineryIsSynced,
    stoneIsSynced,
    productAndFreightTotal,
    automaticPaymentAmounts,
  };
}
