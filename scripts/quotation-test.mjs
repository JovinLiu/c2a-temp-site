import assert from 'node:assert/strict';
import { test } from 'node:test';
import { migrateSupplyAgreement } from '../src/app/migrations.js';
import { defaultAgreement } from '../src/editors/supply/data/defaultAgreement.js';
import { numericValue } from '../src/editors/supply/utils/formatters.js';
import { calculateAppendixTotals, calculateSupplyAgreementAmounts } from '../src/editors/supply/utils/quotationCalculations.js';
import { mergeAgreement } from '../src/utils/storage.js';

for (const kind of ['joinery', 'stone']) {
  const row = (rate) => ({ length: '2000', height: '1500', width: '1500', rate });
  const quotation = (rows) => ({ rows, defaultRate: '', totalPriceOverride: '', syncToContractPrice: true });
  const total = (value) => calculateAppendixTotals({ [kind]: value })[kind];

  test(`${kind}: independent rates, decimals, zero, empty and deleted rows`, () => {
    const value = quotation([row('100.50'), row('200'), row('0'), row('')]);
    assert.equal(total(value).totalPrice, 901.5);
    assert.equal(total({ ...value, rows: value.rows.slice(1) }).totalPrice, 600);
    assert.equal(total(quotation([row('0')])).hasPrice, true);
    assert.equal(total(quotation([row('')])).hasPrice, false);
    assert.equal(total(quotation([])).totalPrice, 0);
  });

  test(`${kind}: legacy migration preserves amounts and survives export/import`, () => {
    const rows = ['', undefined, null, '0', 0, '200'].map(row);
    const value = { ...quotation(rows), defaultRate: '150' };
    const expected = rows.reduce((sum, item) => sum + 3 * (numericValue(item.rate) || 150), 0);
    const original = { appendix: { [kind]: value } };
    const migrated = migrateSupplyAgreement(original);
    assert.equal(total(migrated.appendix[kind]).totalPrice, expected);
    assert.equal(original.appendix[kind].defaultRate, '150');
    assert.equal(migrated.appendix[kind].defaultRate, '');
    assert.deepEqual(migrateSupplyAgreement(migrated), migrated);
    migrated.appendix[kind].rows[0].rate = '0';
    const restored = migrateSupplyAgreement(mergeAgreement(defaultAgreement, JSON.parse(JSON.stringify(migrated))));
    assert.equal(restored.appendix[kind].rows[0].rate, '0');
    assert.equal(total(restored.appendix[kind]).totalPrice, expected - 450);
  });

  test(`${kind}: total override and agreement synchronisation`, () => {
    const value = quotation([row('100'), row('200')]);
    const data = mergeAgreement(defaultAgreement, { appendix: { [kind]: value }, commercial: { includeStone: true } });
    assert.equal(calculateSupplyAgreementAmounts(data)[`${kind}Price`], 900);
    data.appendix[kind].totalPriceOverride = '1200';
    assert.equal(calculateSupplyAgreementAmounts(data)[`${kind}Price`], 1200);
    data.appendix[kind].totalPriceOverride = '0';
    assert.equal(calculateSupplyAgreementAmounts(data)[`${kind}Price`], 0);
    data.appendix[kind].totalPriceOverride = '';
    assert.equal(calculateSupplyAgreementAmounts(data)[`${kind}Price`], 900);
    data.appendix[kind].syncToContractPrice = false;
    data.commercial[`${kind}Price`] = '700';
    assert.equal(calculateSupplyAgreementAmounts(data)[`${kind}Price`], '700');
  });
}
