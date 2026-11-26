'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.resolve(__dirname, '..');
const originalSource = fs.readFileSync(path.join(root, 'js/florence-black-friday-original.js'), 'utf8');
const shoppingSource = fs.readFileSync(path.join(root, 'js/florence-black-friday-shopping.js'), 'utf8');
const windowMock = { currentLang: 'ko' };
vm.runInNewContext(originalSource, { window: windowMock, console });
vm.runInNewContext(shoppingSource, { window: windowMock, console });
const api = windowMock.FlorenceBlackFridayShopping;
assert.ok(api, 'module publishes a testable API');
assert.equal(api.products.length, 8, 'exactly eight recommendation cards are configured');
assert.equal(api.products.filter((item) => item.category === 'bag').length, 5, 'five handbag ideas are present');
assert.equal(api.products.filter((item) => item.category === 'apparel').length, 2, 'two apparel/outerwear ideas are present');
assert.equal(api.products.filter((item) => item.category === 'shoes').length, 1, 'one shoe idea is present');

const expectedImages = ['furla', 'michael-kors', 'ferragamo', 'gucci', 'bottega', 'ralph-lauren', 'north-face', 'nike'];
function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
}
for (const locale of ['ko', 'en', 'zh', 'ja']) {
  const html = api.render(locale);
  assert.ok(html.includes(`lang="${locale}"`), `${locale}: shopping guide language is marked`);
  assert.equal((html.match(/<article class="fbb-product-card"/g) || []).length, 8, `${locale}: all eight cards render`);
  assert.ok(html.includes(`<section class="florence-original" lang="${locale}">`), `${locale}: actual companion source module renders in selected language`);
  assert.ok(html.includes('별도 사실 확인 안내') || locale !== 'ko', 'Korean original contains separate factual caveats');
  assert.ok(html.includes('up to 70%') || locale !== 'en', 'English original retains sourced source-copy details');
  assert.ok(html.includes('2026'), `${locale}: year context is retained`);
  for (const slug of expectedImages) assert.ok(html.includes(`assets/florence-black-friday/${slug}.jpg`), `${locale}: ${slug} local photo is used`);
  for (const product of api.products) {
    const cardStart = html.indexOf(`<article class="fbb-product-card" data-product="${product.id}">`);
    assert.notEqual(cardStart, -1, `${locale}: ${product.id} card exists`);
    const cardEnd = html.indexOf('</article>', cardStart);
    assert.notEqual(cardEnd, -1, `${locale}: ${product.id} card is closed`);
    const card = html.slice(cardStart, cardEnd);
    assert.ok(card.includes(product.image), `${locale}: ${product.id} photo is paired with the card`);
    assert.ok(card.includes(product.productUrl), `${locale}: ${product.id} has official product link`);
    assert.ok(card.includes(product.storeUrl), `${locale}: ${product.id} has official store source`);
    assert.ok(card.includes(escapeHtml(product.copy[locale].alt)), `${locale}: ${product.id} has localized alt text`);
    assert.ok(card.includes(escapeHtml(product.copy[locale].description)), `${locale}: ${product.id} has translated description beside photo`);
  }
}

const allTranslations = JSON.stringify({ guide: api.copy, products: api.products });
for (const phrase of [
  'cannot be treated as a 2026 offer', 'does not confirm Italian outlet availability', 'does not establish', 'does not mean this model is stocked',
  '不能视为2026年活动', '不表示Barberino门店', '2026年のセールとはみなせません', '在庫があるという意味ではありません',
  '2026년 행사로 볼 수 없습니다', '재고를 뜻하지 않습니다'
]) assert.ok(allTranslations.includes(phrase), `sale/stock caveat is localized: ${phrase}`);
assert.ok(allTranslations.includes('Black Friday history') && allTranslations.includes('red to black'), 'history is framed as a later interpretation, not a proven origin');
assert.ok(!/€\s?\d/.test(allTranslations), 'recommendations do not invent current local prices');

const index = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
assert.ok(index.includes('css/florence-black-friday-shopping.css'), 'stylesheet is registered');
assert.ok(index.indexOf('js/florence-black-friday-original.js') < index.indexOf('js/florence-black-friday-shopping.js'), 'faithful original module loads before shopping guide');
const sw = fs.readFileSync(path.join(root, 'sw.js'), 'utf8');
for (const asset of ['./css/florence-black-friday-shopping.css', './js/florence-black-friday-original.js', './js/florence-black-friday-shopping.js', ...expectedImages.map((slug) => `./assets/florence-black-friday/${slug}.jpg`)]) {
  assert.ok(sw.includes(asset), `service worker precaches ${asset}`);
}
console.log('PASS: eight localized product cards, paired images/descriptions, official links, sale/history caveats, real original-source integration, and offline asset registration.');
