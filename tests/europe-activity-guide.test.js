const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const plannerRoot = path.resolve(__dirname, '..');
const dataScript = fs.readFileSync(path.join(plannerRoot, 'js/europe-activity-guide-data.js'), 'utf8');
const guideScript = fs.readFileSync(path.join(plannerRoot, 'js/europe-activity-guide.js'), 'utf8');
const chat = Object.fromEntries(['ko', 'en', 'ja', 'zh'].map(lang => [lang, { title: 'Travel', welcome: 'Hello', placeholder: 'Ask', tooltip: 'Chat', status: 'Ready', chips: [] }]));
const presets = Object.fromEntries(['ko', 'en', 'ja', 'zh'].map(lang => [lang, []]));
const context = {
  console,
  CHATBOT_I18N: chat,
  AI_PRESETS_I18N: presets,
  document: {
    documentElement: { lang: 'ko' },
    addEventListener() {},
    getElementById() { return null; }
  },
  window: {
    currentLang: 'ko',
    setTimeout() {},
    buildActivityChatResponse() { return '<div>base activity response</div>'; },
    renderActivityGuide() { return 'base-render-result'; }
  }
};
vm.createContext(context);
vm.runInContext(dataScript, context, { filename: 'europe-activity-guide-data.js' });
vm.runInContext(guideScript, context, { filename: 'europe-activity-guide.js' });

const api = context.window.EUROPE_ACTIVITY_GUIDE;
assert.ok(api, 'guide module exposes its data and functions');
assert.equal(api.data.entries.length, 52, '52 activity cards are loaded');
assert.equal(new Set(api.data.entries.map(row => row.id)).size, 52, 'activity ids are unique');
assert.equal(new Set(api.data.entries.map(row => row.country_id)).size, 48, 'cards cover 48 countries');
assert.equal(api.data.no_recommendation.length, 3, 'three travel-advice exclusions are loaded');
assert.equal(api.data.entries.filter(row => row.booking_url).length, 20, 'only 20 exact third-party listings are linked');

for (const row of api.data.entries) {
  for (const field of ['country_names', 'location', 'title', 'category', 'summary', 'care']) {
    for (const lang of ['ko', 'en', 'ja', 'zh']) {
      assert.ok(row[field] && row[field][lang], `${row.id} ${field}.${lang} is present`);
    }
  }
  if (row.booking_url) {
    assert.ok(row.exact_booking_title, `${row.id} booking link has an exact product title`);
    assert.match(row.booking_url, /^https?:\/\//, `${row.id} booking URL is external HTTP(S)`);
  }
}

const naplesBoat = api.data.entries.find(row => row.id === 'italy-5');
assert.ok(naplesBoat, 'the official Naples Gulf boat outing is included');
assert.equal(naplesBoat.booking_url, '', 'no unverified third-party booking link is added');
assert.ok(naplesBoat.official_urls.includes('https://www.seasidenapoli.com/en/'), 'the operator source is linked');
const naplesPizza = api.data.entries.find(row => row.id === 'italy-6');
assert.ok(naplesPizza, 'the AVPN pizza workshop is included');
assert.equal(naplesPizza.exact_booking_title, 'Neapolitan Pizzamaker for One Day', 'the exact third-party title is retained');
assert.equal(naplesPizza.booking_url, 'https://www.tripadvisor.com/AttractionProductReview-g187785-d18910449-Neapolitan_Pizzamaker_for_One_Day-Naples_Province_of_Naples_Campania.html', 'the matching Tripadvisor product is linked');
assert.ok(naplesPizza.official_urls.includes('https://www.pizzanapoletana.org/en/pizzaiolo_napoletano_per_un_giorno'), 'the AVPN official workshop page is linked');
assert.ok(naplesPizza.care.en.includes('not wheelchair accessible'), 'the listing access caution is shown in the care note');
assert.ok(['ko', 'en', 'ja', 'zh'].every(lang => api.data.ui[lang].sectionIntro.includes('52')), 'the four-language overview states 52 activities');
const italyAnswer = api.respond('Italy activities', 'en');
assert.ok(italyAnswer.includes('Naples at Sunset'), 'the Italy chatbot answer includes the Naples boat outing');
assert.ok(italyAnswer.includes('https://www.seasidenapoli.com/en/'), 'the Italy chatbot answer links the operator source');
assert.ok(italyAnswer.includes('Neapolitan Pizzamaker for One Day'), 'the Italy chatbot answer includes the verified pizza class');
assert.ok(italyAnswer.includes(naplesPizza.booking_url), 'the Italy chatbot answer links the exact pizza class listing');

for (const [lang, query] of [
  ['ko', '이탈리아 체험 활동 추천'],
  ['en', 'Italy activities'],
  ['ja', 'イタリアの体験アクティビティ'],
  ['zh', '意大利体验活动']
]) {
  const answer = api.respond(query, lang);
  assert.ok(answer && answer.includes('data-europe-activity-answer'), `${lang} Italy query is handled`);
  assert.ok(answer.includes('Florence') || answer.includes('フィレンツェ') || answer.includes('피렌체') || answer.includes('佛罗伦萨'), `${lang} answer includes a Florence option`);
}

const belgium = api.respond('Choco-Story Brussels', 'en');
assert.ok(belgium.includes('Brussels: Chocolate Museum Visit with Workshop'), 'chat shows the exact verified listing name');
assert.ok(belgium.includes('https://www.getyourguide.com/brussels-l8/chocolate-museum-brussels-visit-with-workshop-t316807/'), 'chat uses the exact verified listing URL');

const ukraine = api.respond('Ukraine activities', 'en');
assert.ok(ukraine.includes(api.data.no_recommendation.find(row => row.country_id === 'ukraine').reason.en), 'the travel-advice exclusion is explained');
assert.ok(ukraine.includes('https://www.gov.uk/foreign-travel-advice/ukraine'), 'the official advice link is retained');

const europe = api.respond('Europe activity ideas', 'en');
assert.ok(europe.includes('data-europe-activity-answer'), 'a Europe-wide query returns a short overview');
assert.ok(europe.includes(api.data.ui.en.noAvailabilityNotice), 'chat does not imply live availability');
assert.equal(api.respond('Rome golf cart tour', 'en'), null, 'unmatched Rome request is not fabricated from unrelated cards');
assert.equal(context.window.buildActivityChatResponse('Rome golf cart tour', 'en'), '<div>base activity response</div>', 'unmatched requests fall through to the existing chatbot');

for (const lang of ['ko', 'en', 'ja', 'zh']) {
  assert.ok(chat[lang].chips.some(chip => chip.q === api.data.ui[lang].chatQuery), `${lang} chatbot chip is added`);
  assert.ok(presets[lang].includes(api.data.ui[lang].searchPreset), `${lang} AI search preset is added`);
}

// Exercise language re-render and the English query filter while the UI is Korean.
const renderedDetails = [
  { dataset: { europeCountry: 'italy', search: '이탈리아 italy italian florence venezia' }, hidden: false, open: false },
  { dataset: { europeCountry: 'france', search: '프랑스 france paris' }, hidden: false, open: false }
];
const input = { value: '', addEventListener(event, callback) { if (event === 'input') this.onInput = callback; } };
const counter = { textContent: '' };
const empty = { hidden: false };
let renderedHtml = '';
const root = {
  querySelector(selector) {
    if (selector === '#europe-activity-filter') return input;
    if (selector === '.europe-activity-count') return counter;
    if (selector === '.europe-activity-empty') return empty;
    return null;
  },
  querySelectorAll() { return renderedDetails; }
};
const guide = {
  querySelector(selector) { return selector === '#europe-activity-directory' && renderedHtml ? root : null; },
  insertAdjacentHTML(_position, html) { renderedHtml += html; }
};
const mount = { querySelector(selector) { return selector === '.activity-guide' ? guide : null; } };
context.document.getElementById = id => id === 'activity-guide-mount' ? mount : null;
assert.equal(context.window.renderActivityGuide('ko'), 'base-render-result', 'wrapped renderer preserves the existing render return value');
assert.equal((renderedHtml.match(/data-europe-result="activity"/g) || []).length, 52, 'the directory renders all 52 activity cards');
assert.equal((renderedHtml.match(/data-europe-country=/g) || []).length, 51, 'the directory renders all 51 country/region groups');
input.value = 'Italy';
input.onInput();
assert.equal(renderedDetails[0].hidden, false, 'the English country alias remains searchable in Korean UI');
assert.equal(renderedDetails[0].open, true, 'matching country opens when filtered');
assert.equal(renderedDetails[1].hidden, true, 'nonmatching country is hidden');
assert.equal(empty.hidden, true, 'empty state stays hidden when a result matches');
input.value = 'no-such-place';
input.onInput();
assert.equal(empty.hidden, false, 'empty state appears when the filter has no match');

console.log('PASS: 52 cards, 48 countries, 20 exact booking listings, 3 travel-advice exclusions');
console.log('PASS: four-language content, chatbot/search wiring, source links, existing Rome fallback, render and cross-language filtering');
