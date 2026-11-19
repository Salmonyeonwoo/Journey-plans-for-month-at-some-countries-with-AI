const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');

const modulePath = path.join(__dirname, '..', 'js', 'seville-date-itinerary.js');
const context = { window: {} };
vm.runInNewContext(fs.readFileSync(modulePath, 'utf8'), context, { filename: modulePath });
const api = context.window;
const dates = ['2026-11-20', '2026-11-21'];
const languages = ['ko', 'en', 'ja', 'zh'];

for (const date of dates) {
  for (const lang of languages) {
    const day = api.getSevilleDateItineraryForDate(date, lang);
    assert.ok(day, `missing day ${date}/${lang}`);
    assert.ok(day.theme && day.morning && day.rest && day.evening, `missing summary fields ${date}/${lang}`);
    assert.ok(day.stops.length >= 7, `too few stops ${date}/${lang}`);
    for (const [index, stop] of day.stops.entries()) {
      assert.ok(stop.title && stop.detail && stop.note, `incomplete stop ${date}/${lang}`);
      const isPersonalChecklist = date === '2026-11-21' && index === day.stops.length - 1;
      if (!isPersonalChecklist) assert.ok(stop.sources.length, `missing source link ${date}/${lang}: ${stop.title}`);
    }
    const html = api.renderSevilleDateItineraryDetails(date, lang);
    assert.match(html, /https:\/\//, `missing links in rendered details ${date}/${lang}`);
  }
}

assert.equal(api.getSevilleDateItineraryForDate('2026-11-22', 'ko'), null, '22 Nov must remain unchanged');
assert.equal(api.buildSevilleDateItineraryChatResponse('Show me a Seville restaurant menu', 'en'), null, 'unrelated chat query should pass through');
assert.match(api.buildSevilleDateItineraryChatResponse('11/20 Seville itinerary', 'en'), /Archivo General de Indias/);
assert.match(api.buildSevilleDateItineraryChatResponse('11월 20일 일정', 'ko'), /알카사르/);
assert.match(api.buildSevilleDateItineraryChatResponse('11月20日 日程', 'ja'), /アルカサル/);
assert.match(api.buildSevilleDateItineraryChatResponse('11월 21일 산 호르헤 성 유적', 'ko'), /현재 폐쇄/);
assert.match(api.buildSevilleDateItineraryChatResponse('Tell me about Alcázar hours', 'en'), /09:30–17:00/);
assert.match(api.buildSevilleDateItineraryChatResponse('11月21日 特里亚纳市场', 'zh'), /关闭/);

const activity = fs.readFileSync(path.join(__dirname, '..', 'js', 'activity-guide.js'), 'utf8');
assert.doesNotMatch(activity, /11\/18–21|18–21 Nov|11月18〜21|11月18–21日/);
console.log('Seville itinerary tests passed: dates, four locales, citations, closure handling and chatbot routing.');
