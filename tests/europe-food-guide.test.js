'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const LANGS = ['ko', 'en', 'ja', 'zh'];
const dataPath = path.join(__dirname, '..', 'js', 'europe-country-nightlife-data.js');
const rendererPath = path.join(__dirname, '..', 'js', 'europe-country-nightlife-guide.js');
const dataSource = fs.readFileSync(dataPath, 'utf8');
const data = JSON.parse(dataSource.slice(dataSource.indexOf('[')).trim().replace(/;\s*$/, ''));
assert.equal(data.length, 51, 'the existing Europe and neighboring-region coverage remains at 51 countries/regions');

function localized(value, label) {
  assert.ok(value && typeof value === 'object', `${label}: localized object exists`);
  for (const lang of LANGS) assert.ok(String(value[lang] || '').trim(), `${label}: ${lang} translation exists`);
}
function sourceUrls(sources, label) {
  assert.ok(Array.isArray(sources) && sources.length > 0, `${label}: citations exist`);
  for (const url of sources) assert.match(url, /^https:\/\//i, `${label}: uses HTTPS citation`);
}

for (const country of data) {
  const guide = country.local_food && country.local_food.food_guide;
  assert.ok(guide && Array.isArray(guide.cities) && guide.cities.length > 0, `${country.country_id}: food guide exists`);
  for (const city of guide.cities) {
    localized(city.city, `${country.country_id} city name`);
    localized(city.intro, `${country.country_id}/${city.city.en} intro`);
    assert.ok(Array.isArray(city.dishes) && city.dishes.length >= (country.country_id === 'italy' ? 3 : 2), `${country.country_id}/${city.city.en}: enough sourced dishes`);
    assert.ok(Array.isArray(city.venues) && city.venues.length > 0, `${country.country_id}/${city.city.en}: at least one sourced dining candidate`);
    sourceUrls((city.sources || []).map(source => source.url), `${country.country_id}/${city.city.en} intro`);
    for (const [index, dish] of city.dishes.entries()) {
      localized(dish.name, `${country.country_id} dish ${index + 1} name`);
      localized(dish.note, `${country.country_id} dish ${index + 1} description`);
      sourceUrls(dish.source_urls, `${country.country_id} dish ${index + 1}`);
    }
    for (const [index, venue] of city.venues.entries()) {
      assert.ok(venue.name, `${country.country_id} venue ${index + 1} name`);
      for (const field of ['type', 'focus', 'why_candidate']) localized(venue[field], `${country.country_id} venue ${index + 1} ${field}`);
      sourceUrls(venue.source_urls, `${country.country_id} venue ${index + 1}`);
    }
  }
}
const italy = data.find(country => country.country_id === 'italy');
assert.ok(['Italian', 'Italia', 'イタリア料理', '意大利美食', '이탈리아 음식'].every(alias => italy.aliases.includes(alias)), 'Italy has country-language aliases for chatbot intent');
const italyCities = italy.local_food.food_guide.cities.map(city => city.city.en).sort();
assert.deepEqual(italyCities, ['Florence', 'Naples', 'Rome'], 'Italy covers Naples, Florence and Rome');

const mount = { innerHTML: '', querySelectorAll: () => [] };
const results = { innerHTML: '', querySelectorAll: () => [] };
const count = { textContent: '' };
const search = { value: '', addEventListener() {} };
const expand = { addEventListener() {} };
const document = {
  readyState: 'complete',
  documentElement: { lang: 'ko' },
  getElementById(id) {
    return ({
      europeCountryNightlifeMount: mount,
      ecgResults: results,
      ecgResultCount: count,
      ecgSearch: search,
      ecgExpandAll: expand
    })[id] || null;
  }
};
const CHATBOT_I18N = Object.fromEntries(LANGS.map(lang => [lang, { chips: [], welcome: '' }]));
const window = { EUROPE_COUNTRY_GUIDE_DATA: data, currentLang: 'ko', CHATBOT_I18N, LANDMARK_HISTORY_ENTRIES: [] };
const context = { window, document, CHATBOT_I18N, URL, console };
vm.createContext(context);
vm.runInContext(fs.readFileSync(rendererPath, 'utf8'), context, { filename: rendererPath });

for (const lang of LANGS) {
  window.renderEuropeCountryNightlifeGuide(lang);
  assert.ok(results.innerHTML.includes('ecg-food-intro'), `${lang}: city food introductions render`);
  assert.ok(results.innerHTML.includes('ecg-category-dish'), `${lang}: dish cards render`);
  assert.ok(results.innerHTML.includes('ecg-category-venue'), `${lang}: dining cards render`);
  assert.ok(results.innerHTML.includes('https://'), `${lang}: source links render`);
  assert.ok(CHATBOT_I18N[lang].chips.length >= 2, `${lang}: general and food-specific chatbot chips are present`);
  const queries = {
    ko: '이탈리아 음식 추천',
    en: 'Italian food recommendations',
    ja: 'イタリア料理のおすすめ',
    zh: '意大利美食推荐'
  };
  const response = window.buildEuropeCountryGuideChatResponse(queries[lang], lang);
  assert.ok(response, `${lang}: food question receives an answer`);
  assert.ok(response.includes('Naples') || response.includes('나폴리') || response.includes('ナポリ') || response.includes('那不勒斯'), `${lang}: Naples is represented`);
  assert.ok(response.includes('Florence') || response.includes('피렌체') || response.includes('フィレンツェ') || response.includes('佛罗伦萨'), `${lang}: Florence is represented`);
  assert.ok(response.includes('Rome') || response.includes('로마') || response.includes('ローマ') || response.includes('罗马'), `${lang}: Rome is represented`);
  assert.ok(response.includes('https://'), `${lang}: chatbot response cites sources`);
}
const multiCityQueries = {
  ko: '이탈리아 나폴리 피렌체 로마 식당 추천',
  en: 'Italy Naples Florence Rome restaurants',
  ja: 'イタリア ナポリ フィレンツェ ローマ レストラン',
  zh: '意大利 那不勒斯 佛罗伦萨 罗马 餐厅推荐'
};
const italianCityNames = {
  ko: ['나폴리', '피렌체', '로마'],
  en: ['Naples', 'Florence', 'Rome'],
  ja: ['ナポリ', 'フィレンツェ', 'ローマ'],
  zh: ['那不勒斯', '佛罗伦萨', '罗马']
};
for (const lang of LANGS) {
  const response = window.buildEuropeCountryGuideChatResponse(multiCityQueries[lang], lang);
  for (const city of italianCityNames[lang]) assert.ok(response.includes(city), `${lang}: multi-city food answer includes ${city}`);
  assert.ok(!response.includes('Local specialty ·'), `${lang}: restaurant candidates are not mislabeled as dishes`);
}
const italyModulePath = path.join(__dirname, '..', 'js', 'italy-local-food-guide.js');
vm.runInContext(fs.readFileSync(italyModulePath, 'utf8'), context, { filename: italyModulePath });
const italyFoodQueries = { ko: '이탈리아 음식 추천', en: 'Italian food recommendations', ja: 'イタリア料理のおすすめ', zh: '意大利美食推荐' };
const generalQueries = { ko: '맛집 알려줘', en: 'Where should I eat?', ja: 'おすすめの食事は？', zh: '推荐吃什么？' };
for (const lang of LANGS) {
  const response = window.buildItalyFoodChatReply(lang, italyFoodQueries[lang], null);
  for (const city of italianCityNames[lang]) assert.ok(response.includes(city), `${lang}: Italy chatbot delegates to sourced city guide`);
  const general = window.buildItalyFoodChatReply(lang, generalQueries[lang], null);
  assert.ok(general.includes('#italy-local-food-guide'), `${lang}: general fallback links to the updated guide`);
  assert.ok(!/50 Kalò|Zà Zà|Da Francesco/.test(general), `${lang}: generic fallback does not repeat the stale fixed restaurant list`);
}
console.log('PASS: 51 country/region guides, localized dishes and venue candidates, source coverage, three Italian cities, four-language page rendering and chatbot food answers.');
