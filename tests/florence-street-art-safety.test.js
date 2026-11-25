'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const modulePath = path.join(__dirname, '..', 'js', 'florence-street-art-safety.js');
const source = fs.readFileSync(modulePath, 'utf8');
const locales = ['ko', 'en', 'ja', 'zh'];
const chatI18n = Object.fromEntries(locales.map((lang) => [lang, { chips: [] }]));
let activeLocale = 'ko';
let fallbackCalls = 0;
let insertionAnchor = null;
let scrolls = 0;
const navEvents = [];
const fallbackThis = { marker: 'previous-handler-context' };
const parent = {};
const guideElement = {
  id: 'florence-street-art-safety-guide',
  parentElement: null,
  previousElementSibling: null,
  html: '',
  set outerHTML(value) { this.html = value; },
  scrollIntoView: () => { scrolls += 1; }
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
const gallery = {
  id: 'florence-photo-review-gallery',
  parentElement: parent,
  previousElementSibling: card,
  insertAdjacentElement(position, element) {
    assert.equal(position, 'afterend');
    insertionAnchor = this;
    element.parentElement = parent;
    element.previousElementSibling = this;
  }
};
let attachedGuide = null;
const grid1 = { querySelectorAll: () => [] };
const grid2 = { querySelectorAll: () => [] };
const grid3 = { querySelectorAll: (selector) => selector === '.day-card' ? [card] : [] };
const planner = {};
const document = {
  readyState: 'complete',
  body: {},
  documentElement: { lang: 'ko' },
  querySelectorAll(selector) {
    return selector === '#timelineGrid1, #timelineGrid2, #timelineGrid3' ? [grid1, grid2, grid3] : [];
  },
  getElementById(id) {
    if (id === 'chapter-planner') return planner;
    if (id === 'florence-photo-review-gallery') return gallery;
    if (id === 'florence-street-art-safety-guide') return attachedGuide;
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

const api = window.FLORENCE_STREET_ART_SAFETY;
assert.ok(api, 'translation module API is exposed');
assert.ok(attachedGuide, 'the guide mounts when Florence itinerary cards are present');
assert.equal(insertionAnchor, gallery, 'the guide follows the Florence photo supplement');

const expected = {
  ko: ["🚨 피렌체 '길바닥 그림 밟기'의 정체 & 완벽 대처 가이드", '장당 €1~€2', '€50 ~ €200', '99% 즉시'],
  en: ['The Truth About Florence', '€1–€2 each', '€50–€200', '99% of the time'],
  ja: ['詐欺の正体', '1枚€1～€2', '€50～€200', '99％はすぐに'],
  zh: ['骗局真相', '每张€1~€2', '€50 ~ €200', '99%会立刻']
};
const prompts = {
  ko: '피렌체 길바닥 그림 밟기 안내',
  en: 'Florence sidewalk-art stepping guide',
  ja: 'フィレンツェの路上絵を踏ませる案内',
  zh: '佛罗伦萨地面画踩踏指南'
};
const queries = {
  ko: '피렌체 길바닥 그림 밟기 안내',
  en: 'Florence sidewalk art scam',
  ja: 'フィレンツェ 路上絵 詐欺',
  zh: '佛罗伦萨地面画诈骗'
};
for (const locale of locales) {
  activeLocale = locale;
  window.currentLang = locale;
  const chips = chatI18n[locale].chips;
  assert.equal(chips.length, 1, `${locale}: one localized chatbot chip is registered`);
  assert.equal(chips[0].q, prompts[locale], `${locale}: the chip prompt matches the translated guide`);
  const rendered = api.render(locale);
  assert.ok(rendered.includes(`lang="${locale}"`), `${locale}: the guide marks its language`);
  const translationData = JSON.stringify(api.copy[locale]);
  for (const phrase of expected[locale]) assert.ok(translationData.includes(phrase), `${locale}: source detail remains in the translation: ${phrase}`);
  assert.equal((rendered.match(/<article class="fsa-card"/g) || []).length, 5, `${locale}: all five original sections are present`);
  assert.ok(!rendered.includes('FirenzeToday'), `${locale}: no review-only sources were silently inserted into the supplied copy`);
  const answer = window.handleLocalChat.call(fallbackThis, queries[locale], 'forwarded argument');
  assert.ok(answer.includes('fsa-chat-answer'), `${locale}: relevant chat query returns the navigation answer`);
  assert.ok(answer.includes('openFlorenceStreetArtSafetyGuide'), `${locale}: chatbot links to the full source text`);
}

window.switchLanguage('en');
assert.ok(guideElement.html.includes('lang="en"'), 'the mounted guide follows the language selector');
api.openGuide();
assert.deepEqual(navEvents.slice(-2), [
  ['chapter', 'chapter-planner'],
  ['page', 'chapter-planner', 3, false]
], 'the chatbot action opens the Florence itinerary page');
assert.equal(scrolls, 1, 'the guide action scrolls to the mounted guide');

const fallthroughQueries = ['Naples street art scam?', 'Florence restaurants', 'Rome pavement-picture scam'];
for (const query of fallthroughQueries) {
  const before = fallbackCalls;
  const answer = window.handleLocalChat.call(fallbackThis, query, 'forwarded argument');
  assert.equal(answer, `previous-handler:${query}`, `${query}: unrelated intent uses the existing handler`);
  assert.equal(fallbackCalls, before + 1, `${query}: the existing handler is called exactly once`);
}

console.log('PASS: original copy retained in four languages, Florence-page placement, chatbot navigation, language switching, and fallthrough.');
