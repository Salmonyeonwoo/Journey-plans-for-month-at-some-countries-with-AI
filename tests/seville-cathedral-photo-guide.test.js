const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.resolve(__dirname, '..');
const children = [];
const mount = {
  querySelector(selector) { return children.find((node) => `#${node.id}` === selector) || null; },
  appendChild(node) { node.parentNode = this; children.push(node); },
  get innerHTML() { return children.map((node) => node.innerHTML).join(''); }
};
const document = {
  getElementById(id) { return id === 'seville-general-guide' ? mount : null; },
  createElement(tag) {
    return {
      tagName: tag.toUpperCase(),
      attributes: {},
      setAttribute(name, value) { this.attributes[name] = value; },
      remove() {
        const index = children.indexOf(this);
        if (index >= 0) children.splice(index, 1);
      }
    };
  }
};
let fallbackCalls = 0;
const window = {
  renderSevilleGeneralGuide() { return true; },
  buildSevilleGeneralChatResponse() { fallbackCalls += 1; return null; }
};
const context = { document, window };
vm.createContext(context);
vm.runInContext(fs.readFileSync(path.join(root, 'js/seville-cathedral-photo-guide.js'), 'utf8'), context, {
  filename: 'seville-cathedral-photo-guide.js'
});

const languages = ['ko', 'en', 'ja', 'zh'];
const expectedHeadings = {
  ko: '세비야 대성당과 주변 예술 공간',
  en: 'Seville Cathedral and its surrounding art spaces',
  ja: 'セビリア大聖堂と周辺の美術空間',
  zh: '塞维利亚主教座堂及周边艺术空间'
};
const aliases = {
  history: { ko: '세비야 대성당 역사', en: 'Giralda', ja: 'セビリア大聖堂', zh: '吉拉尔达塔' },
  interior: { ko: '콜럼버스 묘', en: 'main altarpiece', ja: '主祭壇衝立', zh: '哥伦布墓' },
  chapels: { ko: '고통의 성모 예배당', en: 'Goya and sacristy', ja: '悲しみの聖母礼拝堂', zh: '苦难圣母小堂' },
  antecabildo: { ko: '안테카빌도', en: 'Antecabildo', ja: 'アンテカビルド', zh: '安特卡比尔多' }
};
const allImages = new Set();

for (const lang of languages) {
  assert.equal(window.renderSevilleGeneralGuide(lang), true, `${lang} base guide remains mounted`);
  assert.equal(window.renderSevilleGeneralGuide(lang), true, `${lang} review guide renders`);
  const section = children.find((node) => node.id === 'sg-seville-cathedral-review');
  assert.ok(section, `${lang} section exists`);
  assert.equal(section.attributes.lang, lang, `${lang} lang attribute is correct`);
  assert.ok(section.innerHTML.includes(expectedHeadings[lang]), `${lang} heading is translated`);
  assert.equal((section.innerHTML.match(/<details class="sg-guide-topic sg-cathedral-topic"/g) || []).length, 4,
    `${lang} has four review topics`);
  const sources = [...section.innerHTML.matchAll(/href="([^"]+)"/g)].map((match) => match[1]);
  assert.ok(sources.length >= 20, `${lang} has source links`);
  assert.ok(sources.every((href) => href.startsWith('https://')), `${lang} source links use HTTPS`);
  const images = [...section.innerHTML.matchAll(/<img src="([^"]+)" alt="([^"]+)"/g)];
  assert.equal(images.length, 17, `${lang} has 17 mapped photos`);
  for (const [, src, alt] of images) {
    assert.ok(alt.trim(), `${lang} image has translated alt text`);
    allImages.add(src);
    assert.ok(fs.existsSync(path.join(root, src)), `${src} exists in the review repository`);
  }
  assert.ok(section.innerHTML.includes('PAX VOBIS'), `${lang} keeps the visible inscription`);
  assert.ok(!section.innerHTML.includes('1000342177'), `${lang} does not expose visitor-heavy original filenames`);
  assert.ok(!section.innerHTML.includes('1000342182'), `${lang} does not expose visitor-heavy original filenames`);
  assert.ok(!section.innerHTML.includes('1000342185'), `${lang} does not expose visitor-heavy original filenames`);

  for (const [topic, query] of Object.entries(aliases).map(([topic, byLanguage]) => [topic, byLanguage[lang]])) {
    const answer = window.buildSevilleGeneralChatResponse(query, lang);
    assert.ok(answer && answer.includes('https://'), `${lang} chatbot recognizes ${topic} and cites sources`);
  }
}

assert.equal(allImages.size, 17, '17 distinct images are mapped');
for (const [lang, query] of Object.entries({
  en: 'How do I get to Seville Cathedral tomorrow?',
  ko: '세비야 대성당 운영시간',
  ja: 'セビリア大聖堂の開館時間',
  zh: '塞维利亚主教座堂开放时间'
})) {
  assert.equal(window.buildSevilleGeneralChatResponse(query, lang), null,
    `${lang} operational/directions question falls through to existing behavior`);
}
assert.ok(fallbackCalls >= 4, 'planning/operations requests reach the pre-existing chatbot fallback');
assert.equal(window.buildSevilleGeneralChatResponse('How do I get to the Royal Tobacco Factory tomorrow?', 'en'), null,
  'existing route fallback is preserved');

console.log('PASS: four language versions render four topics and 17 photo copies with source links.');
console.log('PASS: history, interior, chapel and Antecabildo chatbot queries cite sources in ko/en/ja/zh.');
console.log('PASS: route and opening-hours questions retain the existing chatbot fallback.');
