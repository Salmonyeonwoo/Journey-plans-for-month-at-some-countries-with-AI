const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.resolve(__dirname, '..');
const mount = { innerHTML: '' };
const context = {
  document: { getElementById(id) { return id === 'ronda-setenil-history-guide' ? mount : null; } },
  window: {}
};
vm.createContext(context);
vm.runInContext(fs.readFileSync(path.join(root, 'js/ronda-setenil-history-guide.js'), 'utf8'), context, {
  filename: 'ronda-setenil-history-guide.js'
});

const languages = ['ko', 'en', 'ja', 'zh'];
const photos = [
  'ronda-el-tajo-overlook.webp',
  'ronda-el-tajo-cliff-view-cropped.webp',
  'ronda-santa-maria-tower-cropped.webp',
  'ronda-plaza-socorro-user.webp',
  'setenil-village-user.webp'
];
const queries = {
  ko: [
    '론다 엘 타호 협곡 치수',
    '산타 마리아 라 마요르 미나렛',
    '론다 소코로 광장 안달루시아 깃발',
    '세테닐 이름 septem nihil 전승',
    '세테닐 바위 주택 성채'
  ],
  en: [
    'Ronda El Tajo gorge width',
    'Santa María la Mayor minaret',
    'Plaza del Socorro Andalusian flag',
    'Setenil name septem nihil',
    'Setenil rock houses Torre del Homenaje'
  ],
  ja: [
    'ロンダ エル・タホ 渓谷',
    'サンタ・マリア・ラ・マヨール ミフラーブ',
    'ソコロ広場 アンダルシア旗',
    'セテニルの語源 septem nihil',
    'セテニル 岩窟住居 トーレ・デル・オメナヘ'
  ],
  zh: [
    '龙达 塔霍峡谷',
    '圣玛丽亚 米哈拉布 宣礼塔',
    '索科罗广场 安达卢西亚旗',
    '塞特尼尔词源 septem nihil',
    '塞特尼尔岩屋 主塔'
  ]
};

for (const lang of languages) {
  assert.equal(context.window.renderRondaSetenilHistoryGuide(lang), true, `${lang} guide mounts`);
  assert.ok(mount.innerHTML.includes(`<section class="rsh-guide" lang="${lang}"`), `${lang} guide language is set`);
  assert.equal((mount.innerHTML.match(/class="rsh-card"/g) || []).length, 5, `${lang} renders five history topics`);
  assert.equal((mount.innerHTML.match(/class="rsh-photos"/g) || []).length, 4, `${lang} renders four photo groups`);
  assert.equal((mount.innerHTML.match(/<img src="img\/user-ronda-setenil\//g) || []).length, 5, `${lang} renders five user photo files`);
  assert.equal((mount.innerHTML.match(/<details class="rsh-sources"/g) || []).length, 5, `${lang} provides sources for all topics`);
  assert.equal((mount.innerHTML.match(/target="_blank" rel="noopener noreferrer"/g) || []).length, 17, `${lang} renders all source links safely`);
  for (const photo of photos) {
    assert.ok(fs.existsSync(path.join(root, 'img/user-ronda-setenil', photo)), `${photo} exists`);
    assert.ok(mount.innerHTML.includes(photo), `${lang} references ${photo}`);
  }
  for (const query of queries[lang]) {
    const answer = context.window.buildRondaSetenilHistoryChatResponse(query, lang);
    assert.ok(answer && answer.includes('https://'), `${lang} chatbot recognizes ${query} and links sources`);
  }
}

assert.equal(context.window.buildRondaSetenilHistoryChatResponse('How do I get to El Tajo tomorrow?', 'en'), null,
  'directions and date-specific itinerary questions fall through to existing planning behavior');
assert.equal(context.window.buildRondaSetenilHistoryChatResponse('세테닐 택시 경로', 'ko'), null,
  'Korean transport questions retain the existing planning flow');
assert.equal(context.window.buildRondaSetenilHistoryChatResponse('What is the weather forecast in Ronda?', 'en'), null,
  'current weather questions are not answered with history content');
assert.equal(context.window.buildRondaSetenilHistoryChatResponse('세테닐 맛집 추천', 'ko'), null,
  'restaurant questions are not answered with history content');
assert.equal(context.window.buildRondaSetenilHistoryChatResponse('what should I pack for Ronda?', 'en'), null,
  'unrelated city-name questions are not intercepted');
assert.ok(context.window.buildRondaSetenilHistoryChatResponse('론다 역사 소개', 'ko'),
  'generic history questions still receive the history overview');

const index = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const components = fs.readFileSync(path.join(root, 'js/components.js'), 'utf8');
const app = fs.readFileSync(path.join(root, 'js/app.js'), 'utf8');
const nav = fs.readFileSync(path.join(root, 'js/guidebook-navigation.js'), 'utf8');
assert.match(index, /ronda-setenil-history-guide\.css/);
assert.match(index, /ronda-setenil-history-guide\.js/);
assert.match(components, /id="ronda-setenil-history-guide"/);
assert.match(app, /renderRondaSetenilHistoryGuide\(lang\)/);
assert.match(app, /buildRondaSetenilHistoryChatResponse/);
assert.match(nav, /secRondaSetenil/);

console.log('PASS: five fact-checked topics, five local photos, and 17 source links render in ko/en/ja/zh.');
console.log('PASS: all five topic-specific chatbot queries work in each supported language.');
console.log('PASS: route, transport, weather and date-specific questions fall through to existing planning behavior.');
console.log('PASS: module, style, page mount, render hook, chatbot and contents shortcut are integrated.');
