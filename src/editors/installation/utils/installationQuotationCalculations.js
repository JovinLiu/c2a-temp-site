function numericValue(value) {
  if (value === '' || value === null || value === undefined) return 0;
  const number = Number(String(value).replace(/[^0-9.-]/g, ''));
  return Number.isFinite(number) ? number : 0;
}

function hasEnteredValue(value) {
  return value !== '' && value !== null && value !== undefined;
}

export function calculateProjectionArea(length, height) {
  const lengthValue = numericValue(length);
  const heightValue = numericValue(height);
  if (!lengthValue || !heightValue) return 0;
  return (lengthValue * heightValue) / 1_000_000;
}

export function calculateInstallationQuotation(quotation = {}) {
  const defaultRate = numericValue(quotation.defaultRate);
  const rows = (quotation.rows || []).map((row) => {
    const area = calculateProjectionArea(row.length, row.height);
    return {
      ...row,
      area,
      amount: area * defaultRate,
    };
  });

  const totalArea = rows.reduce((sum, row) => sum + row.area, 0);
  const totalFee = rows.reduce((sum, row) => sum + row.amount, 0);
  const hasDimensions = rows.some((row) => hasEnteredValue(row.length) || hasEnteredValue(row.height));
  const hasCalculationInput = hasEnteredValue(quotation.defaultRate) || hasDimensions;
  const hasCalculatedFee = defaultRate > 0 && rows.some((row) => row.area > 0);

  return {
    rows,
    defaultRate,
    totalArea,
    totalFee,
    hasCalculationInput,
    hasCalculatedFee,
  };
}
