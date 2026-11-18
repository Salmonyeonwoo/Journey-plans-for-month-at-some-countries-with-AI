const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.resolve(__dirname, '..');
const mount = { innerHTML: '' };
const context = {
  document: { getElementById(id) { return id === 'seville-general-guide' ? mount : null; } },
  window: {}
};
vm.createContext(context);
vm.runInContext(fs.readFileSync(path.join(root, 'js/seville-general-guide.js'), 'utf8'), context, {
  filename: 'seville-general-guide.js'
});

const languages = ['ko', 'en', 'ja', 'zh'];
const photos = [
  'plaza-espana-tower-cropped.webp',
  'casino-exposicion-cropped.webp',
  'palacio-san-telmo.webp',
  'real-fabrica-tabacos.webp'
];
const queries = {
  plaza: {
    ko: '세비야 스페인 광장 탑', en: 'Plaza de España towers',
    ja: 'スペイン広場の塔', zh: '塞维利亚西班牙广场'
  },
  casino: {
    ko: '카지노 데 라 엑스포시시온', en: 'Casino de la Exposición',
    ja: 'カジノ・デ・ラ・エクスポシシオン', zh: '塞维利亚博览会赌场'
  },
  santelmo: {
    ko: '산 텔모 궁전', en: 'Palacio de San Telmo',
    ja: 'サン・テルモ宮殿', zh: '圣特尔莫宫'
  },
  tabacos: {
    ko: '구 왕립 담배 공장', en: 'Royal Tobacco Factory',
    ja: '旧王立たばこ工場', zh: '旧皇家烟草厂'
  }
};

for (const lang of languages) {
  assert.equal(context.window.renderSevilleGeneralGuide(lang), true, `${lang} guide mounts`);
  assert.match(mount.innerHTML, new RegExp(`<section class="sg-guide" lang="${lang}">`));
  assert.equal((mount.innerHTML.match(/class="sg-guide-photo"/g) || []).length, 4, `${lang} has four photo cards`);
  assert.equal((mount.innerHTML.match(/<img src="img\/user-seville-landmarks\//g) || []).length, 4, `${lang} references four local photos`);
  assert.equal((mount.innerHTML.match(/target="_blank" rel="noopener noreferrer"/g) || []).length >= 12, true, `${lang} includes linked sources`);
  for (const photo of photos) {
    assert.ok(fs.existsSync(path.join(root, 'img/user-seville-landmarks', photo)), `${photo} exists`);
    assert.ok(mount.innerHTML.includes(photo), `${lang} renders ${photo}`);
  }
  for (const [topic, names] of Object.entries(queries)) {
    const answer = context.window.buildSevilleGeneralChatResponse(names[lang], lang);
    assert.ok(answer && answer.includes('↗'), `${lang} chatbot recognizes ${topic}`);
    assert.ok(answer.includes('https://'), `${lang} ${topic} response links sources`);
  }
}

assert.equal(context.window.buildSevilleGeneralChatResponse('How do I get to the Royal Tobacco Factory tomorrow?', 'en'), null,
  'itinerary/directions questions continue to fall through to the existing travel-planning behavior');
assert.equal(context.window.buildSevilleGeneralChatResponse('What is the best route to Palacio de San Telmo?', 'en'), null,
  'directions requests are not replaced with a landmark-history answer');

console.log('PASS: four Seville photo cards, local images, source links, and landmark chatbot queries render in ko/en/ja/zh.');
console.log('PASS: route and directions questions retain the existing chatbot fallback behavior.');
