'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.join(__dirname, '..');
const indexSource = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const serviceWorkerSource = fs.readFileSync(path.join(root, 'sw.js'), 'utf8');
const contentSource = fs.readFileSync(path.join(root, 'js', 'florence-guide-content.js'), 'utf8');
const historyContentSource = fs.readFileSync(path.join(root, 'js', 'florence-history-content.js'), 'utf8');
const odeonContentSource = fs.readFileSync(path.join(root, 'js', 'florence-odeon-content.js'), 'utf8');
const savingsCopySource = fs.readFileSync(path.join(root, 'js', 'florence-guide-savings-copy.js'), 'utf8');
const odeonCopySource = fs.readFileSync(path.join(root, 'js', 'florence-guide-odeon-copy.js'), 'utf8');
const librarySource = fs.readFileSync(path.join(root, 'js', 'florence-guide-library.js'), 'utf8');
const uffiziDataSource = fs.readFileSync(path.join(root, 'js', 'florence-uffizi-catalog-data.js'), 'utf8');
const uffiziCatalogSource = fs.readFileSync(path.join(root, 'js', 'florence-uffizi-catalog.js'), 'utf8');
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
vm.runInContext(historyContentSource, context, { filename: 'florence-history-content.js' });
vm.runInContext(odeonContentSource, context, { filename: 'florence-odeon-content.js' });
vm.runInContext(savingsCopySource, context, { filename: 'florence-guide-savings-copy.js' });
vm.runInContext(odeonCopySource, context, { filename: 'florence-guide-odeon-copy.js' });
vm.runInContext(librarySource, context, { filename: 'florence-guide-library.js' });
vm.runInContext(uffiziDataSource, context, { filename: 'florence-uffizi-catalog-data.js' });
vm.runInContext(uffiziCatalogSource, context, { filename: 'florence-uffizi-catalog.js' });

const api = window.FLORENCE_GUIDE_LIBRARY;
const uffizi = window.FLORENCE_UFFIZI_CATALOG;
const uffiziData = window.FLORENCE_UFFIZI_CATALOG_DATA;
assert.ok(api, 'library API is exposed');
assert.ok(uffizi, 'Uffizi catalogue API is exposed');
assert.equal(api.order.length, 8, 'all eight Florence guides are available');
assert.ok(indexSource.includes('js/florence-guide-savings-copy.js'), 'localized savings copy is loaded by the page');
assert.ok(indexSource.indexOf('js/florence-guide-savings-copy.js') < indexSource.indexOf('js/florence-guide-library.js'), 'localized savings copy loads before the guide library');
assert.ok(indexSource.includes('js/florence-odeon-content.js'), 'localized Pinocchio/Odeon content is loaded by the page');
assert.ok(indexSource.includes('js/florence-guide-odeon-copy.js'), 'localized Pinocchio/Odeon copy is loaded by the page');
assert.ok(indexSource.indexOf('js/florence-odeon-content.js') < indexSource.indexOf('js/florence-guide-library.js'), 'Pinocchio/Odeon content loads before the guide library');
assert.ok(indexSource.indexOf('js/florence-guide-odeon-copy.js') < indexSource.indexOf('js/florence-guide-library.js'), 'Pinocchio/Odeon copy loads before the guide library');
assert.ok(serviceWorkerSource.includes("'./js/florence-guide-odeon-copy.js'"), 'localized Pinocchio/Odeon copy is included in offline cache');
assert.ok(serviceWorkerSource.includes("'./js/florence-odeon-content.js'"), 'Pinocchio/Odeon content is included in offline cache');
const expected = {
  ko: {
    source: '첨부 원문·번역',
    titles: ['피렌체 두오모 3가지 패스', '두오모 돔 꼭대기', '피렌체 비 오는 날 실내 쇼핑', '우피치 미술관 필수 걸작', '피렌체 두오모 성당, 우피치처럼 싸게 들어가는 법 있을까?', '산타 마리아 노벨라 성당·약국: 역사와 사진 가이드', '포르테차 다 바소: 역사 가이드', 'Giunti Odeon: 피노키오 특별전과 분수'],
    query: ['두오모 패스 비교', '미켈란젤로 언덕 동선', '비 오는 날 피렌체 쇼핑', '우피치 관람 규정', '피렌체 두오모 입장료·할인·절약 팁'],
    historyQuery: '산타 마리아 노벨라 오데온', fortQuery: '포르테차 다 바소', odeonQuery: '피노키오 전시'
  },
  en: {
    source: 'Attached source and translation',
    titles: ['Complete Comparison of 3 Florence Duomo Passes', 'Best Days &amp; Perfect Route Guide', 'Perfect Recommendations Guide to Indoor Shopping', 'Uffizi Gallery Must-See Masterpieces', 'Florence Cathedral (Duomo): Is There a Way to Get In Cheaply', 'Santa Maria Novella Basilica &amp; Pharmacy: History and Photo Guide', 'Fortezza da Basso: History Guide', 'Giunti Odeon: Pinocchio exhibition and fountain'],
    query: ['Florence Duomo pass comparison', 'Piazzale Michelangelo route', 'indoor shopping in Florence on a rainy day', 'Uffizi visitor rules', 'Florence Duomo ticket prices, discounts, and savings tips'],
    historyQuery: 'Santa Maria Novella Odeon history', fortQuery: 'Fortezza da Basso', odeonQuery: 'Pinocchio exhibition'
  },
  zh: {
    source: '附件原文与译文',
    titles: ['佛罗伦萨大教堂三种通票', '最佳星期与完美路线指南', '佛罗伦萨雨天室内购物', '乌菲兹美术馆必看杰作', '佛罗伦萨大教堂，能不能像乌菲兹美术馆那样便宜入场', '新圣母玛利亚大殿与药房：历史及照片指南', '巴索要塞：历史指南', 'Giunti Odeon：皮诺曹特别展与喷泉'],
    query: ['佛罗伦萨大教堂通票', '米开朗基罗广场路线', '佛罗伦萨雨天室内购物', '乌菲兹参观规定', '佛罗伦萨大教堂票价、优惠与省钱技巧'],
    historyQuery: '新圣母大殿和Odeon历史', fortQuery: '巴索要塞历史', odeonQuery: '皮诺曹展览'
  },
  ja: {
    source: '添付原文・翻訳',
    titles: ['フィレンツェのドゥオーモ、3種類のパス', 'ドゥオーモのクーポラ頂上', 'フィレンツェの雨の日・屋内ショッピング', 'ウフィツィ美術館 必見の傑作', 'フィレンツェのドゥオーモに、ウフィツィのように安く入る方法はある？', 'サンタ・マリア・ノヴェッラ聖堂・薬局：歴史と写真ガイド', 'フォルテッツァ・ダ・バッソ：歴史ガイド', 'Giunti Odeon：ピノキオ特別展と噴水'],
    query: ['ドゥオーモのパス比較', 'ミケランジェロ広場の動線', '雨の日のフィレンツェショッピング', 'ウフィツィ観覧規則', 'フィレンツェのドゥオーモ料金・割引・節約のコツ'],
    historyQuery: 'サンタ・マリア・ノヴェッラ オデオン', fortQuery: 'フォルテッツァ・ダ・バッソ', odeonQuery: 'ピノキオ展'
  }
};
for (const lang of ['ko', 'en', 'zh', 'ja']) {
  const rendered = api.render(lang);
  assert.ok(rendered.includes(`lang="${lang}"`), `${lang}: language attribute is set`);
  assert.equal((rendered.match(/class="fgl-guide"/g) || []).length, 8, `${lang}: eight accordion guides render`);
  assert.ok(rendered.includes(expected[lang].source), `${lang}: original/translation label is present`);
  assert.ok(rendered.includes('fgl-notice'), `${lang}: separate fact-check notices render`);
  assert.ok(rendered.includes('duomo.firenze.it') || rendered.includes('www.uffizi.it'), `${lang}: official sources are linked`);
  assert.ok(rendered.includes('rinascente.it'), `${lang}: existing savings guide source links render`);
  assert.equal(api.copy[lang].notice['duomo-savings'].length, 8, `${lang}: all eight separate savings notices are present`);
  assert.equal(api.copy[lang].notice['odeon-pinocchio'].length, 8, `${lang}: eight separate Pinocchio/Odeon fact-check notices are present`);
  for (const title of expected[lang].titles) assert.ok(rendered.includes(title), `${lang}: localized guide title is present: ${title}`);
  assert.equal(api.copy[lang].sourceNames.slice(-32).length, 32, `${lang}: 32 localized Pinocchio/Odeon source labels are present`);
  const odeonStart = rendered.indexOf('id="fg-odeon-pinocchio"');
  const sourcesStart = rendered.indexOf('<details class="fgl-sources"', odeonStart);
  const sourcesEnd = rendered.indexOf('</details>', sourcesStart);
  const odeonSources = rendered.slice(sourcesStart, sourcesEnd);
  assert.equal((odeonSources.match(/target="_blank"/g) || []).length, 32, `${lang}: all 32 Pinocchio/Odeon source URLs render`);
  assert.ok(!odeonSources.includes('undefined'), `${lang}: source names and URLs are aligned`);
  window.currentLang = lang;
  window.document.documentElement.lang = lang;
  const answer = api.answer(expected[lang].query[0]);
  assert.ok(answer && answer.includes('fgl-chat-answer'), `${lang}: chatbot answers with a guide card`);
  assert.ok(answer.includes('openFlorenceGuide'), `${lang}: chatbot can open the matched guide`);
  const savingsAnswer = api.answer(expected[lang].query[4]);
  assert.ok(savingsAnswer && savingsAnswer.includes('duomo-savings'), `${lang}: savings query opens the new guide`);
  const historyAnswer = api.answer(expected[lang].historyQuery);
  const fortAnswer = api.answer(expected[lang].fortQuery);
  const odeonAnswer = api.answer(expected[lang].odeonQuery);
  assert.ok(historyAnswer && historyAnswer.includes("openFlorenceGuide('smn-history')"), `${lang}: Santa Maria Novella query opens its guide`);
  assert.ok(fortAnswer && fortAnswer.includes("openFlorenceGuide('fortezza-history')"), `${lang}: Fortezza query opens its guide`);
  assert.ok(odeonAnswer && odeonAnswer.includes("openFlorenceGuide('odeon-pinocchio')"), `${lang}: Pinocchio query opens the new guide`);
  assert.equal(api.copy[lang].notice['smn-history'].length, 7, `${lang}: seven separate Santa Maria Novella fact-check notes are present`);
  assert.equal(api.copy[lang].notice['fortezza-history'].length, 7, `${lang}: seven separate Fortezza fact-check notes are present`);
  assert.equal(window.CHATBOT_I18N[lang].chips.length, 9, `${lang}: eight guide chips and one Uffizi photo-search chip are registered`);
}
const odeonKo = window.FLORENCE_GUIDE_CONTENT['odeon-pinocchio'].ko.html;
for (const asset of [
  'odeon-source-photo1-1000344788.webp',
  'odeon-source-photo2-1000344789.webp',
  'odeon-fountain-user-1000344792.webp',
  'odeon-unassigned-1000344787.webp'
]) assert.ok(odeonKo.includes(asset), `Odeon guide includes the intended user asset ${asset}`);
assert.ok(odeonKo.includes('fgh-user-photo'), 'new photos use non-cropping full-image presentation');
assert.ok(odeonKo.includes('파일명') && odeonKo.includes('확인되지'), 'photo/source filename uncertainty is explicit');
assert.ok(serviceWorkerSource.includes("'./img/florence-user-photos/odeon-fountain-user-1000344792.webp'"), 'the user-provided fountain image is cached offline');
assert.ok(serviceWorkerSource.includes("'./img/florence-user-photos/odeon-unassigned-1000344787.webp'"), 'the unassigned user image is cached offline');
assert.ok(serviceWorkerSource.includes('slowtravel-offline-v20261127_florence_plan_v1'), 'service worker cache version is incremented');
assert.ok(window.FLORENCE_GUIDE_CONTENT['smn-history'].ko.html.includes('santa-maria-novella-basilica.webp'), 'confirmed Basilica image is attached to the correct guide');
assert.ok(window.FLORENCE_GUIDE_CONTENT['smn-history'].ko.html.includes('odeon-interior-books-3.webp'), 'unattributed interiors are shown only with an explicit caveat');
assert.ok(window.FLORENCE_GUIDE_CONTENT['fortezza-history'].ko.html.includes('fgh-no-photo'), 'Fortezza guide explicitly reports its missing photos');
assert.ok(!window.FLORENCE_GUIDE_CONTENT['fortezza-history'].ko.html.includes('florence-user-photos'), 'no unrelated user photo is attached to Fortezza');
assert.ok(!window.FLORENCE_GUIDE_CONTENT['fortezza-history'].ko.html.includes('salmonyeonwoo.github.io'), 'task instructions are excluded from the published guide text');
assert.ok(serviceWorkerSource.includes('./js/florence-history-content.js'), 'history content is included in offline cache');
assert.ok(serviceWorkerSource.includes('./img/florence-user-photos/odeon-exterior.webp'), 'user photo assets are included in offline cache');
assert.ok(indexSource.includes('js/florence-history-content.js'), 'history content is loaded by the page');
const zhRoute = window.FLORENCE_GUIDE_CONTENT['dome-sunset-route'].zh.html;
assert.ok(zhRoute.includes('Yeonwoo'), 'the Simplified Chinese draft does not leave the name in Korean');
assert.ok(!zhRoute.includes('연우님'), 'the Korean honorific residue is removed from the Chinese translation');
assert.ok(window.FLORENCE_GUIDE_CONTENT['rainy-day-shopping'].zh.html.includes('香氛干花'), 'potpourri is rendered with a faithful Chinese translation');
assert.ok(window.FLORENCE_GUIDE_CONTENT['pass-comparison'].ja.html.includes('ドームや鐘楼の登頂はなし'), 'Japanese wording clarifies no Dome/Bell Tower climb without claiming a step-free visit');
assert.equal(uffiziData.photoCount, 118, 'all 118 uploaded photos are in scope');
assert.equal(uffiziData.exactDuplicateCount, 0, 'there are no exact duplicate image files');
assert.equal(uffiziData.records.length, 73, 'the catalog separates confirmed and pending work records');
assert.equal(uffiziData.records.filter(item => item.status === 'identified').length, 39, 'identified records are counted');
assert.equal(uffiziData.records.filter(item => item.status !== 'identified').length, 34, 'uncertain identifications remain pending');
assert.equal(uffiziData.sameWorkPairs.length, 6, 'six confirmed same-work photo relationships are grouped');
const listedFiles = new Set([...uffiziData.records.flatMap(item => item.files), ...uffiziData.contextPhotos.map(item => item.file)]);
assert.equal(listedFiles.size, 118, 'every uploaded photo is represented without bringing in out-of-scope files');
for (const file of listedFiles) {
  assert.match(file, /^100034\d{4}\.(?:jpg|heic)$/i, `photo is within the allowed filename pattern: ${file}`);
  assert.ok(fs.existsSync(path.join(root, 'img', 'uffizi-upload', file.replace(/\.(?:jpg|heic)$/i, '.webp'))), `converted photo asset exists: ${file}`);
}
for (const record of uffiziData.records) {
  for (const lang of ['ko','en','zh','ja']) {
    assert.ok(record.title[lang] && record.description[lang], `${record.id} has a title and detailed description in ${lang}`);
    if (record.status !== 'identified') {
      assert.ok(record.uncertainty[lang], `${record.id} has an uncertainty note in ${lang}`);
      assert.equal(record.sources.length, 0, `${record.id} does not cite sources for an unconfirmed identification`);
    }
  }
}
const byRecord = id => uffiziData.records.find(item => item.id === id);
assert.deepEqual(Array.from(byRecord('domenico-veneziano-santa-lucia').files), ['1000344861.jpg','1000344952.heic','1000344953.heic'], 'A004/A024 are merged with all three photos');
assert.ok(byRecord('rosso-fiorentino-four-saints').files.includes('1000344960.heic'), 'A005 and A029 4960 are merged as Rosso Fiorentino');
assert.ok(byRecord('andrea-del-sarto-noli-me-tangere').files.includes('1000344961.heic'), 'A029 4961 remains a separate Noli me tangere');
assert.equal(byRecord('unidentified-4868').status, 'pending', 'A008 4868 is not misidentified as the A019 Crucifixion');
assert.ok(uffiziData.records.some(item => item.files.includes('1000344885.heic') && item.title.en.includes('Crucifixion')), 'A019 4885 remains the separately identified Crucifixion');
assert.equal(uffiziData.records.filter(item => item.files.includes('1000344878.jpg')).length, 2, 'one photo can represent two distinct works without merging them');
assert.equal(uffiziData.records.filter(item => ['1000344889.jpg','1000344890.jpg','1000344891.jpg','1000344892.jpg'].some(file => item.files.includes(file))).length, 3, 'the three Leonardo/Verrocchio works are separate records');
assert.equal(byRecord('albertinelli-visitation').status, 'identified', 'A027 identifies the central Visitation while keeping gallery context');
assert.equal(byRecord('albertinelli-visitation').recapturePairs.length, 1, 'A027 groups two views of the same altarpiece');
assert.ok(byRecord('caravaggio-sacrifice-of-isaac').title.en.includes('Sacrifice of Isaac'), 'A044 5033 has the corrected Caravaggio title');
assert.ok(byRecord('rembrandt-old-rabbi').description.en.includes('not documented'), 'A046 includes the Uffizi caveat about the sitter identity');
assert.ok(byRecord('incredulity-saint-thomas-copy').sources.some(source => source.url.includes('uffizi.it')), 'A044 5034 links to the Uffizi collection record');
assert.ok(uffiziData.records.some(item => item.id === 'unidentified-table-scene' && item.files.includes('1000345038.heic')), 'A044 5035/5038 recaptures stay together, separate from other paintings');
assert.ok(indexSource.includes('css/florence-uffizi-catalog.css'), 'the catalogue stylesheet is loaded');
assert.ok(indexSource.indexOf('js/florence-guide-library.js') < indexSource.indexOf('js/florence-uffizi-catalog-data.js'), 'catalogue data loads after preserved guide library');
assert.ok(indexSource.indexOf('js/florence-uffizi-catalog-data.js') < indexSource.indexOf('js/florence-uffizi-catalog.js'), 'catalogue data loads before the catalogue UI');
assert.ok(serviceWorkerSource.includes("'./css/florence-uffizi-catalog.css'"), 'catalogue CSS is cached offline');
assert.ok(serviceWorkerSource.includes("'./js/florence-uffizi-catalog-data.js'"), 'catalogue data is cached offline');
assert.ok(serviceWorkerSource.includes("'./js/florence-uffizi-catalog.js'"), 'catalogue UI is cached offline');
assert.ok(serviceWorkerSource.includes('./img/uffizi-upload/100034${id}.webp'), 'all uploaded WebP photos are included in offline precache generation');
const cachedPhotoIds = serviceWorkerSource.match(/\.\.\.\[([\d,]+)\]/);
assert.ok(cachedPhotoIds, 'service worker contains the explicit upload-photo ID list');
const cachedIds = cachedPhotoIds[1].split(',').map(Number).sort((a,b) => a-b);
const actualIds = fs.readdirSync(path.join(root, 'img', 'uffizi-upload')).filter(file => file.endsWith('.webp')).map(file => Number(file.match(/(\d{4})\.webp$/)[1])).sort((a,b) => a-b);
assert.deepEqual(cachedIds, actualIds, 'offline precache IDs exactly match the 118 uploaded photo assets');
for (const lang of ['ko','en','zh','ja']) {
  const renderedCatalog = uffizi.render(lang);
  assert.ok(renderedCatalog.includes(`lang="${lang}"`), `${lang}: the photo catalogue has a localized section`);
  assert.ok(renderedCatalog.includes('1000344868.jpg'), `${lang}: unresolved photo is represented`);
  assert.ok(renderedCatalog.includes('1000345046.heic'), `${lang}: final in-scope photo is represented`);
  assert.ok(renderedCatalog.includes('target="_blank"'), `${lang}: collection/reference sources are clickable`);
}
window.currentLang = 'en';
assert.ok(uffizi.answer('1000344885.heic').includes('Crucifixion'), 'chatbot resolves an exact uploaded filename');
assert.ok(uffizi.answer('The Baptism of Christ').includes('Baptism'), 'chatbot resolves an exact confirmed artwork title');
assert.ok(uffizi.answer('Find works in my Uffizi photos').includes('fuc-chat-answer'), 'chatbot search chip opens the catalogue');
assert.equal(uffizi.answer('Tell me about the Uffizi Museum'), null, 'generic Uffizi questions are left to the existing guide/chatbot');
assert.equal(window.handleLocalChat('Tell me about the Uffizi Museum'), api.answer('Tell me about the Uffizi Museum'), 'generic Uffizi questions retain the existing Uffizi guide response');
assert.ok(!contentSource.includes('FLORENCE_UFFIZI_CATALOG'), 'the preserved original guide source is not modified with catalog content');
console.log('PASS: existing Florence guides preserved; 73 four-language records include 39 confirmed works and cover all 118 photos; duplicate merges, uncertainty, chatbot routing, references and offline cache verified.');
