const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const dataPath = path.join(__dirname, '..', 'js', 'data.js');
const source = `${fs.readFileSync(dataPath, 'utf8')}\n;globalThis.__regressionData = { plans: PLANS_DAYS_I18N_DATA.IBERIA, regional: REGIONAL_PLANS.IBERIA, hotels: FULL_HOTELS_DATA };`;
const context = { window: {} };
vm.runInNewContext(source, context, { filename: dataPath, timeout: 5000 });
const { plans, regional, hotels } = context.__regressionData;
const locales = ['ko', 'en', 'ja', 'zh'];
const dynamicDateMarkers = {
  ko: ['카드', '동적'],
  en: ['card', 'dynamic'],
  ja: ['カード', '動的'],
  zh: ['卡片', '动态'],
};
const proposalMarker = /2026-11-25/;

assert.ok(plans.length > 23, 'the Florence itinerary days are present');
const transferToFlorence = plans[20];
const existingDuomoPlan = plans[21];
const existingUffiziPlan = plans[22];
const marketDay = plans[23];
const transferToRome = plans[24];

// The proposal keeps its original plan ordering; the Uffizi suggestion stays an alternative.
assert.match(existingDuomoPlan.theme.en, /Duomo/);
assert.match(existingUffiziPlan.theme.en, /Uffizi/);
assert.ok(existingUffiziPlan.rest.en.includes('Optional proposal only (not selected)'));
assert.ok(existingUffiziPlan.rest.en.includes('replaces that order rather than adding simultaneous visits'));

for (const lang of locales) {
  for (const [label, text] of [
    ['sunset/current plan', existingDuomoPlan.evening[lang]],
    ['existing Uffizi date', existingUffiziPlan.morning[lang]],
    ['optional Uffizi alternative', existingUffiziPlan.rest[lang]],
    ['market dates', marketDay.morning[lang]],
    ['Florence transfer schedule', transferToFlorence.morning[lang]],
    ['Florence arrival estimate', transferToFlorence.rest[lang]],
    ['Nov 29 train schedule', transferToRome.events[lang][0]],
  ]) {
    assert.ok(proposalMarker.test(text), `${label} in ${lang} identifies the fixed 2026 proposal`);
    for (const marker of dynamicDateMarkers[lang]) {
      assert.ok(text.includes(marker), `${label} in ${lang} distinguishes the proposal date from the dynamic card date`);
    }
  }

  const pharmacyText = marketDay.morning[lang];
  const pharmacyTerms = {
    ko: ['산타 마리아 노벨라 약국', '장미수'],
    en: ['Santa Maria Novella Pharmacy', 'rose water'],
    ja: ['サンタ・マリア・ノヴェッラ薬局', 'ローズウォーター'],
    zh: ['新圣母药妆店', '玫瑰水'],
  }[lang];
  for (const term of pharmacyTerms) assert.ok(pharmacyText.includes(term), `Nov 28 pharmacy/rose-water stop remains in ${lang}`);
  assert.doesNotMatch(pharmacyText, /800-year|800年|800년|800年/);
}

const florenceHotel = hotels.find((hotel) => hotel.name === 'Artemente Florence B&B');
assert.ok(florenceHotel, 'Florence lodging candidate is present');
for (const lang of locales) {
  assert.ok(proposalMarker.test(florenceHotel.features[lang]), `hotel proposal dates are explicit in ${lang}`);
  assert.ok(florenceHotel.features[lang].includes(dynamicDateMarkers[lang][0]), `hotel dates are separate from dynamic card dates in ${lang}`);
}
assert.ok(existingDuomoPlan.meal.en.includes('booking status is unverified'));
assert.ok(existingUffiziPlan.evening.en.includes('booking unverified'));

const regionalFlorenceMarket = regional.days.find((day) => day.city === '피렌체' && day.morning.includes('산타 마리아 노벨라 약국'));
assert.ok(regionalFlorenceMarket, 'Korean base itinerary retains the Nov 28 pharmacy stop');
assert.ok(regionalFlorenceMarket.morning.includes('2026-11-25'));
assert.ok(regionalFlorenceMarket.morning.includes('카드 동적 날짜'));
console.log('Naples–Florence regression tests passed: proposal date context, itinerary order, pharmacy stop and booking uncertainty.');
