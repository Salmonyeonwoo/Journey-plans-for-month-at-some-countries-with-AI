'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const modulePath = path.join(__dirname, '..', 'js', 'europe-intercity-fares-guide.js');
const source = fs.readFileSync(modulePath, 'utf8');
const supported = ['ko', 'en', 'ja', 'zh'];
const CHATBOT_I18N = Object.fromEntries(supported.map((lang) => [lang, { chips: [] }]));
const root = { innerHTML: '' };
const document = {
  getElementById(id) {
    return id === 'europe-intercity-fares-guide-mount' ? root : null;
  }
};
const window = {};
const context = { window, document, CHATBOT_I18N, console };
vm.createContext(context);
vm.runInContext(source, context, { filename: modulePath });

const api = window.EUROPE_INTERCITY_FARES;
assert.ok(api, 'guide API is exposed');
assert.equal(api.languages.join(','), supported.join(','), 'four supported locales are registered');
assert.equal(Object.keys(api.content).sort().join(','), ['en', 'ja', 'ko', 'zh'].join(','));
assert.equal(Object.keys(api.sources).length, 27, 'official source catalog is complete');

for (const lang of supported) {
  const copy = api.content[lang];
  assert.equal(copy.cards.length, 8, `${lang}: eight representative operator/platform examples`);
  assert.equal(copy.checklist.length, 6, `${lang}: comparison checklist is translated`);
  assert.ok(copy.observation.includes('Nerja') || copy.observation.includes('ネルハ') || copy.observation.includes('内尔哈') || copy.observation.includes('네르하'));
  assert.ok(Array.isArray(CHATBOT_I18N[lang].chips));
  assert.equal(CHATBOT_I18N[lang].chips.length, 1, `${lang}: chatbot quick prompt is added`);
  assert.equal(CHATBOT_I18N[lang].chips[0].q, copy.chatQuestion, `${lang}: prompt uses the matching localized question`);

  for (const card of copy.cards) {
    assert.ok(card.title && card.route && card.body.length > 0, `${lang}: card has localized title, route caveat and body`);
    assert.ok(card.sources.length > 0, `${lang}: card cites official sources`);
    for (const id of card.sources) assert.ok(api.sources[id], `${lang}: source ${id} exists`);
  }

  assert.equal(api.render(lang), true, `${lang}: renderer finds the mount node`);
  assert.equal((root.innerHTML.match(/class="eif-card"/g) || []).length, 8, `${lang}: all cards render`);
  assert.ok(root.innerHTML.includes(copy.title), `${lang}: localized title renders`);
  assert.ok(root.innerHTML.includes('https://'), `${lang}: source links render`);
}

const chatQueries = {
  ko: '유럽 기차와 버스 요금 할인 수수료 비교해줘',
  en: 'Compare European train ticket prices, discounts and fees',
  ja: 'ヨーロッパの電車運賃と割引手数料を比べたい',
  zh: '比较欧洲火车票价、折扣和手续费'
};
for (const lang of supported) {
  const reply = api.respond(chatQueries[lang], lang);
  assert.ok(reply && reply.includes(api.content[lang].chatAnswer), `${lang}: fare question gets a localized rule-based answer`);
  assert.ok(reply.includes('#europe-intercity-fares-guide'), `${lang}: answer links to the guide`);
  assert.ok(reply.includes('omio.com') && reply.includes('alsa.com'), `${lang}: answer includes official seller/operator citations`);
}

assert.equal(api.respond('How do I get from Paris to Lyon?', 'en'), null, 'ordinary route-planning question does not trigger fare copy');
assert.equal(api.respond('빈에서 잘츠부르크 가는 열차 시간은?', 'ko'), null, 'ordinary timetable question does not trigger fare copy');
assert.equal(api.respond('European train fares and fees', 'xx').includes(api.content.ko.chatAnswer), true, 'unknown chatbot locale falls back to Korean');
assert.equal(api.render('xx'), true, 'unknown page locale falls back safely');
assert.ok(root.innerHTML.includes(api.content.ko.title));

console.log('PASS: four locales, eight cases, source links, Nerja caveat, chatbot intent/scope, and safe locale fallback.');
