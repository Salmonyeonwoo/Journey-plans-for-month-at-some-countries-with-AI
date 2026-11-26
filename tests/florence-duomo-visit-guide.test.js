'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const modulePath = path.join(__dirname, '..', 'js', 'florence-duomo-visit-guide.js');
const source = fs.readFileSync(modulePath, 'utf8');
const itinerarySource = fs.readFileSync(path.join(__dirname, '..', 'js', 'data.js'), 'utf8');
const farePdf = 'https://files.at-bus.it/s3fs-public/documents/AT_Carta_Servizi_2026.pdf';
assert.equal((itinerarySource.match(new RegExp(farePdf.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')) || []).length, 5, 'the 2026 fare correction appears in the base itinerary and all four language versions');
for (const staleFare of ['€1.70', '€1,70', '1.70 euro', '1.70ユーロ', '1.70欧元']) {
  assert.ok(!itinerarySource.includes(staleFare), `the itinerary no longer states the obsolete fare: ${staleFare}`);
}
assert.ok(!source.includes('€1.70'), 'the guide and localized chatbot no longer contain the obsolete fare');
assert.ok(source.includes('€2.00') && source.includes('1 August 2026'), 'the guide states the €2.00 fare effective 1 August 2026');
const locales = ['ko', 'en', 'zh', 'ja'];
const chatI18n = Object.fromEntries(locales.map((lang) => [lang, { chips: [] }]));
let activeLocale = 'ko';
let fallbackCalls = 0;
let insertionAnchor = null;
let scrolls = 0;
const navEvents = [];
const fallbackThis = { marker: 'previous-handler-context' };
const parent = {};
const guideElement = {
  id: 'florence-duomo-visit-guide',
  parentElement: null,
  previousElementSibling: null,
  html: '',
  set outerHTML(value) { this.html = value; },
  scrollIntoView: () => { scrolls += 1; }
};
const safetyGuide = {
  id: 'florence-street-art-safety-guide',
  parentElement: parent,
  insertAdjacentElement(position, element) {
    assert.equal(position, 'afterend');
    insertionAnchor = this;
    element.parentElement = parent;
    element.previousElementSibling = this;
  }
};
const card = {
  parentElement: parent,
  querySelector(selector) {
    return selector === '.city-tag' ? { textContent: 'Florence' } : null;
  },
  insertAdjacentElement(position, element) {
    assert.equal(position, 'afterend');
    insertionAnchor = this;
    element.parentElement = parent;
    element.previousElementSibling = this;
  }
};
let attachedGuide = null;
const grids = [{ querySelectorAll: () => [] }, { querySelectorAll: () => [] }, {
  querySelectorAll: (selector) => selector === '.day-card' ? [card] : []
}];
const planner = {};
const document = {
  readyState: 'complete',
  body: {},
  documentElement: { lang: 'ko' },
  querySelectorAll(selector) {
    return selector === '#timelineGrid1, #timelineGrid2, #timelineGrid3' ? grids : [];
  },
  getElementById(id) {
    if (id === 'chapter-planner') return planner;
    if (id === 'florence-street-art-safety-guide') return safetyGuide;
    if (id === 'florence-duomo-visit-guide') return attachedGuide;
    return null;
  },
  createElement(tag) {
    assert.equal(tag, 'div');
    const holder = {};
    Object.defineProperty(holder, 'innerHTML', { set: (html) => { holder.html = html; } });
    Object.defineProperty(holder, 'firstElementChild', { get: () => {
      guideElement.html = holder.html;
      attachedGuide = guideElement;
      return guideElement;
    } });
    return holder;
  }
};
class MockMutationObserver {
  constructor(callback) { this.callback = callback; }
  observe() {}
}
const window = {
  CHATBOT_I18N: chatI18n,
  currentLang: 'ko',
  document,
  MutationObserver: MockMutationObserver,
  requestAnimationFrame: (callback) => callback(),
  getEffectiveLang: () => activeLocale,
  switchGuidebookChapter: (...args) => navEvents.push(['chapter', ...args]),
  goToBookPage: (...args) => navEvents.push(['page', ...args]),
  switchLanguage(locale) {
    activeLocale = locale;
    window.currentLang = locale;
    document.documentElement.lang = locale;
    return 'language-switched';
  },
  updateChatbotLanguage: () => {},
  setTimeout(callback) { callback(); return 1; },
  handleLocalChat(query, extra) {
    assert.equal(this, fallbackThis, 'unrelated questions preserve the original handler receiver');
    assert.equal(extra, 'forwarded argument', 'unrelated questions preserve additional arguments');
    fallbackCalls += 1;
    return `previous-handler:${query}`;
  }
};
const context = { window, document, console };
vm.createContext(context);
vm.runInContext(source, context, { filename: modulePath });

const api = window.FLORENCE_DUOMO_VISIT_GUIDE;
assert.ok(api, 'the supplement API is exposed');
assert.ok(attachedGuide, 'the supplement mounts when Florence itinerary cards are present');
assert.equal(insertionAnchor, safetyGuide, 'the supplement follows the existing Florence safety supplement');
assert.equal((guideElement.html.match(/class="fdvg-card"/g) || []).length, 5, 'the initial Korean module has five topic cards');

const expected = {
  ko: ['Brunelleschi Pass €30', '463계단', '€2.00', '2026년 11월 26–29일'],
  en: ['Brunelleschi Pass €30', '463 steps', '€2.00', '26–29 November 2026'],
  zh: ['Brunelleschi Pass €30', '463级台阶', '€2.00', '2026年11月26日至29日'],
  ja: ['Brunelleschi Pass €30', '463段', '€2.00', '2026年11月26〜29日']
};
const prompts = {
  ko: '피렌체 두오모 패스·돔 입장 안내',
  en: 'Florence Duomo passes and Dome entry',
  zh: '佛罗伦萨大教堂通票与穹顶入场',
  ja: 'フィレンツェのドゥオーモパスとドーム入場'
};
const queries = {
  ko: '피렌체 두오모 돔 패스 가격',
  en: 'Florence Duomo pass and Dome hours',
  zh: '佛罗伦萨大教堂通票和穹顶',
  ja: 'フィレンツェ ドゥオーモ パスとドーム'
};
const fareQueries = {
  ko: '피렌체 시내 버스 요금 90분권',
  en: 'Florence bus fare and 90-minute ticket',
  zh: '佛罗伦萨 公交票价 90分钟',
  ja: 'フィレンツェ バス 運賃 90分'
};
for (const locale of locales) {
  activeLocale = locale;
  window.currentLang = locale;
  const chips = chatI18n[locale].chips;
  assert.equal(chips.length, 1, `${locale}: one localized chatbot chip is registered`);
  assert.equal(chips[0].q, prompts[locale], `${locale}: the quick-chip prompt is localized`);
  const rendered = api.render(locale);
  assert.ok(rendered.includes(`lang="${locale}"`), `${locale}: rendered guide declares its language`);
  assert.equal((rendered.match(/class="fdvg-card"/g) || []).length, 5, `${locale}: all five topic cards render`);
  assert.ok(rendered.includes('2026'), `${locale}: date-limited notes remain visible`);
  assert.ok(rendered.includes('Ponte Vespucci'), `${locale}: the named official service notice is present`);
  assert.ok(rendered.includes('duomo.firenze.it'), `${locale}: official Duomo sources are linked`);
  assert.ok(rendered.includes('at-bus.it'), `${locale}: official bus sources are linked`);
  const copy = JSON.stringify(api.copy[locale]);
  for (const phrase of expected[locale]) assert.ok(copy.includes(phrase), `${locale}: verified core fact is present: ${phrase}`);
  assert.ok(!rendered.includes('Artemente'), `${locale}: lodging details are not copied into the new content`);
  assert.ok(!/(?:Italo|Frecciarossa)/.test(rendered), `${locale}: train details are not repeated`);
  const answer = window.handleLocalChat.call(fallbackThis, queries[locale], 'forwarded argument');
  assert.ok(answer.includes('fdvg-chat-answer'), `${locale}: relevant chatbot query returns the localized guide answer`);
  assert.ok(answer.includes('€2.00'), `${locale}: the chatbot states the official urban-ticket fare`);
  assert.ok(answer.includes(farePdf), `${locale}: the chatbot links the official 2026 fare table`);
  assert.ok(answer.includes('openFlorenceDuomoVisitPlan'), `${locale}: chatbot answer links to the full supplement`);
  const fareAnswer = window.handleLocalChat.call(fallbackThis, fareQueries[locale], 'forwarded argument');
  assert.ok(fareAnswer.includes('fdvg-chat-answer'), `${locale}: a localized city-bus fare query is recognized`);
  assert.ok(fareAnswer.includes('€2.00'), `${locale}: the fare query returns the corrected amount`);
}

window.switchLanguage('en');
assert.ok(guideElement.html.includes('lang="en"'), 'the mounted supplement follows the language selector');
api.openGuide();
assert.deepEqual(navEvents.slice(-2), [
  ['chapter', 'chapter-planner'],
  ['page', 'chapter-planner', 3, false]
], 'the guide opens the Florence itinerary page containing the supplement');
assert.equal(scrolls, 1, 'the guide action scrolls to the mounted supplement');

const fallthroughQueries = ['Naples Duomo tickets', 'Florence restaurants', 'Rome bus 12'];
for (const query of fallthroughQueries) {
  const before = fallbackCalls;
  const answer = window.handleLocalChat.call(fallbackThis, query, 'forwarded argument');
  assert.equal(answer, `previous-handler:${query}`, `${query}: unrelated intent uses the existing handler`);
  assert.equal(fallbackCalls, before + 1, `${query}: the existing handler is called exactly once`);
}

assert.ok(api.sources.length >= 14, 'official source links are available in the guide');
assert.ok(api.isRelevant('Brunelleschi Pass'), 'a specific pass question is recognized without a city name');
assert.ok(!api.isRelevant('Florence restaurants'), 'unrelated Florence requests are not intercepted');
console.log('PASS: four-language guide, official source links, date boundary, chatbot sync/fallthrough, privacy exclusions, page placement and navigation.');
