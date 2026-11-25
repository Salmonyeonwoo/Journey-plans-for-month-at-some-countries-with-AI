'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const modulePath = path.join(__dirname, '..', 'js', 'naples-practical-review.js');
const source = fs.readFileSync(modulePath, 'utf8');
const locales = ['ko', 'en', 'ja', 'zh'];
const chatI18n = Object.fromEntries(locales.map((lang) => [lang, { chips: [] }]));
let activeLocale = 'en';
let fallbackCalls = 0;
let foodGuideMount = null;
let navEvents = [];
let foodGuideScrolls = 0;
const fallbackThis = { marker: 'prior-handler-context' };
const window = {
  CHATBOT_I18N: chatI18n,
  getEffectiveLang: () => activeLocale,
  switchGuidebookChapter: (...args) => navEvents.push(['chapter', ...args]),
  goToBookPage: (...args) => navEvents.push(['page', ...args]),
  renderItalyLocalFoodGuide: (locale) => {
    navEvents.push(['render-food-guide', locale]);
    foodGuideMount = { scrollIntoView: () => { foodGuideScrolls += 1; } };
  },
  setTimeout: (callback) => { callback(); return 1; },
  handleLocalChat(query, extra) {
    assert.equal(this, fallbackThis, 'fallback preserves the original receiver');
    assert.equal(extra, 'forwarded argument', 'fallback preserves additional arguments');
    fallbackCalls += 1;
    return `prior-handler:${query}`;
  }
};
const document = {
  getElementById(id) {
    return id === 'italy-local-food-guide' ? foodGuideMount : null;
  }
};
const context = { window, document, console };
vm.createContext(context);
vm.runInContext(source, context, { filename: modulePath });

const api = window.NAPLES_PRACTICAL_REVIEW;
assert.ok(api, 'practical review API is exposed');

// Every localized chip must be registered and the wrapper must produce that locale's answer.
const chipPrompts = {
  ko: '나폴리 교통권과 쇼핑 실용 팁',
  en: 'Naples transit tickets and shopping tips',
  ja: 'ナポリの交通券と買い物の実用情報',
  zh: '那不勒斯交通票与购物提示'
};
for (const locale of locales) {
  activeLocale = locale;
  const chips = chatI18n[locale].chips;
  assert.equal(chips.length, 1, `${locale}: exactly one local practical chip is registered`);
  assert.equal(chips[0].q, chipPrompts[locale], `${locale}: chip prompt remains localized`);
  const reply = window.handleLocalChat.call(fallbackThis, chips[0].q, 'forwarded argument');
  assert.ok(reply.includes(api.answer(chips[0].q)), `${locale}: chip returns the specific practical answer`);
  assert.ok(reply.includes('naples-review-chat-link'), `${locale}: chip answer includes its guide action`);
  assert.ok(reply.includes('onclick="openItalyFoodGuide(); return false;"'), `${locale}: chatbot food link uses scoped navigation`);
}

const panelHtml = api.render('en');
assert.ok(panelHtml.includes('onclick="openItalyFoodGuide(); return false;"'), 'transit panel food link uses scoped navigation');
window.currentLang = 'en';
window.openItalyFoodGuide();
assert.deepEqual(navEvents.slice(0, 3), [
  ['chapter', 'chapter-guide', false],
  ['page', 'chapter-guide', 0, false],
  ['render-food-guide', 'en']
], 'food navigation selects the host chapter/page and ensures the guide is mounted');
assert.equal(foodGuideScrolls, 1, 'food navigation scrolls the mounted target');

// Local ticket, shopping, and explicit rail-direction questions continue to receive the local answer.
const localQueries = [
  ['en', 'How do I validate my ANM day pass in Naples?'],
  ['en', 'Where can I buy chocolate near Via Toledo in Naples?'],
  ['en', 'Which side do trains run on in Naples?'],
  ['ko', '나폴리 지하철 승차권'],
  ['ja', 'ナポリの地下鉄乗車券'],
  ['zh', '那不勒斯地铁车票']
];
for (const [locale, query] of localQueries) {
  activeLocale = locale;
  const before = fallbackCalls;
  const reply = window.handleLocalChat.call(fallbackThis, query, 'forwarded argument');
  assert.ok(reply.includes('naples-review-chat-link'), `${locale}: ${query} is answered locally`);
  assert.ok(fallbackCalls === before, `${locale}: local query does not reach fallback`);
}

// Intercity routes and venue-specific restaurant questions must use the pre-existing handlers.
const fallthroughQueries = [
  'Naples to Florence train',
  'Naples Nennella opening hours',
  'Nennella menu in Naples',
  'How do I get from Naples to Rome by train?',
  'Naples train tickets to Florence',
  'Naples Nennella menu and reservations'
];
for (const locale of locales) {
  activeLocale = locale;
  for (const query of fallthroughQueries) {
    const before = fallbackCalls;
    const reply = window.handleLocalChat.call(fallbackThis, query, 'forwarded argument');
    assert.equal(reply, `prior-handler:${query}`, `${locale}: ${query}: exact prior-handler response is preserved`);
    assert.equal(fallbackCalls, before + 1, `${locale}: ${query}: prior handler is called exactly once`);
  }
}

console.log('PASS: localized chips, local queries, scoped food-guide navigation, and full-wrapper fallthrough across four locales.');
