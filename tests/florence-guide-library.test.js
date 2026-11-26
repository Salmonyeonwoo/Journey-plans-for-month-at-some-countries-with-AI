'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.join(__dirname, '..');
const indexSource = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const serviceWorkerSource = fs.readFileSync(path.join(root, 'sw.js'), 'utf8');
const contentSource = fs.readFileSync(path.join(root, 'js', 'florence-guide-content.js'), 'utf8');
const savingsCopySource = fs.readFileSync(path.join(root, 'js', 'florence-guide-savings-copy.js'), 'utf8');
const librarySource = fs.readFileSync(path.join(root, 'js', 'florence-guide-library.js'), 'utf8');
const window = {
  currentLang: 'ko',
  document: { readyState: 'complete', documentElement: { lang: 'ko' } },
  CHATBOT_I18N: Object.fromEntries(['ko', 'en', 'zh', 'ja'].map(lang => [lang, { chips: [] }])),
  switchLanguage(lang) {
    this.currentLang = lang;
    this.document.documentElement.lang = lang;
  },
  handleLocalChat(query) { return `fallback:${query}`; },
  updateChatbotLanguage() {}
};
const context = { window, console };
vm.createContext(context);
vm.runInContext(contentSource, context, { filename: 'florence-guide-content.js' });
vm.runInContext(savingsCopySource, context, { filename: 'florence-guide-savings-copy.js' });
vm.runInContext(librarySource, context, { filename: 'florence-guide-library.js' });

const api = window.FLORENCE_GUIDE_LIBRARY;
assert.ok(api, 'library API is exposed');
assert.equal(api.order.length, 5, 'all five attached guides are available');
assert.ok(indexSource.includes('js/florence-guide-savings-copy.js'), 'localized savings copy is loaded by the page');
assert.ok(indexSource.indexOf('js/florence-guide-savings-copy.js') < indexSource.indexOf('js/florence-guide-library.js'), 'localized savings copy loads before the guide library');
assert.ok(serviceWorkerSource.includes('./js/florence-guide-savings-copy.js'), 'localized savings copy is included in offline cache');
const expected = {
  ko: {
    source: '첨부 원문·번역',
    titles: ['피렌체 두오모 3가지 패스', '두오모 돔 꼭대기', '피렌체 비 오는 날 실내 쇼핑', '우피치 미술관 필수 걸작', '피렌체 두오모 성당, 우피치처럼 싸게 들어가는 법 있을까?'],
    query: ['두오모 패스 비교', '미켈란젤로 언덕 동선', '비 오는 날 피렌체 쇼핑', '우피치 관람 규정', '피렌체 두오모 입장료·할인·절약 팁']
  },
  en: {
    source: 'Attached source and translation',
    titles: ['Complete Comparison of 3 Florence Duomo Passes', 'Best Days &amp; Perfect Route Guide', 'Perfect Recommendations Guide to Indoor Shopping', 'Uffizi Gallery Must-See Masterpieces', 'Florence Cathedral (Duomo): Is There a Way to Get In Cheaply'],
    query: ['Florence Duomo pass comparison', 'Piazzale Michelangelo route', 'indoor shopping in Florence on a rainy day', 'Uffizi visitor rules', 'Florence Duomo ticket prices, discounts, and savings tips']
  },
  zh: {
    source: '附件原文与译文',
    titles: ['佛罗伦萨大教堂三种通票', '最佳星期与完美路线指南', '佛罗伦萨雨天室内购物', '乌菲兹美术馆必看杰作', '佛罗伦萨大教堂，能不能像乌菲兹美术馆那样便宜入场'],
    query: ['佛罗伦萨大教堂通票', '米开朗基罗广场路线', '佛罗伦萨雨天室内购物', '乌菲兹参观规定', '佛罗伦萨大教堂票价、优惠与省钱技巧']
  },
  ja: {
    source: '添付原文・翻訳',
    titles: ['フィレンツェのドゥオーモ、3種類のパス', 'ドゥオーモのクーポラ頂上', 'フィレンツェの雨の日・屋内ショッピング', 'ウフィツィ美術館 必見の傑作', 'フィレンツェのドゥオーモに、ウフィツィのように安く入る方法はある？'],
    query: ['ドゥオーモのパス比較', 'ミケランジェロ広場の動線', '雨の日のフィレンツェショッピング', 'ウフィツィ観覧規則', 'フィレンツェのドゥオーモ料金・割引・節約のコツ']
  }
};
for (const lang of ['ko', 'en', 'zh', 'ja']) {
  const rendered = api.render(lang);
  assert.ok(rendered.includes(`lang="${lang}"`), `${lang}: language attribute is set`);
  assert.equal((rendered.match(/class="fgl-guide"/g) || []).length, 5, `${lang}: five accordion guides render`);
  assert.ok(rendered.includes(expected[lang].source), `${lang}: original/translation label is present`);
  assert.ok(rendered.includes('fgl-notice'), `${lang}: separate fact-check notices render`);
  assert.ok(rendered.includes('duomo.firenze.it') || rendered.includes('www.uffizi.it'), `${lang}: official sources are linked`);
  assert.ok(rendered.includes('rinascente.it'), `${lang}: new guide source links render`);
  assert.equal(api.copy[lang].notice['duomo-savings'].length, 8, `${lang}: all eight separate savings notices are present`);
  for (const title of expected[lang].titles) assert.ok(rendered.includes(title), `${lang}: localized guide title is present: ${title}`);
  window.currentLang = lang;
  window.document.documentElement.lang = lang;
  const answer = api.answer(expected[lang].query[0]);
  assert.ok(answer && answer.includes('fgl-chat-answer'), `${lang}: chatbot answers with a guide card`);
  assert.ok(answer.includes('openFlorenceGuide'), `${lang}: chatbot can open the matched guide`);
  const savingsAnswer = api.answer(expected[lang].query[4]);
  assert.ok(savingsAnswer && savingsAnswer.includes('duomo-savings'), `${lang}: savings query opens the new guide`);
  assert.equal(window.CHATBOT_I18N[lang].chips.length, 5, `${lang}: five localized quick chips are registered`);
}
const zhRoute = window.FLORENCE_GUIDE_CONTENT['dome-sunset-route'].zh.html;
assert.ok(zhRoute.includes('Yeonwoo'), 'the Simplified Chinese draft does not leave the name in Korean');
assert.ok(!zhRoute.includes('연우님'), 'the Korean honorific residue is removed from the Chinese translation');
assert.ok(window.FLORENCE_GUIDE_CONTENT['rainy-day-shopping'].zh.html.includes('香氛干花'), 'potpourri is rendered with a faithful Chinese translation');
assert.ok(window.FLORENCE_GUIDE_CONTENT['pass-comparison'].ja.html.includes('ドームや鐘楼の登頂はなし'), 'Japanese wording clarifies no Dome/Bell Tower climb without claiming a step-free visit');
console.log('PASS: five-guide library, four-language notices and chatbot chips, official source links, and audited translation fixes.');
