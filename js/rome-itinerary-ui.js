/* Small guidebook labels for the separate Rome itinerary page. Loaded after data.js and before components.js. */
(function () {
  'use strict';
  const labels = {
    ko: { rome_itinerary_link_title: '로마 5박 6일 상세 일정 보기', rome_itinerary_link_desc: '11/29–12/4 Salotto Monti · 11/30 콜로세움 · 12/4 OZ562 22:50 · 파업 대응 가이드' },
    en: { rome_itinerary_link_title: 'Open the detailed 5-night, 6-day Rome itinerary', rome_itinerary_link_desc: 'Nov 29–Dec 4 · Salotto Monti · Nov 30 Colosseum · Dec 4 OZ562 at 22:50 · strike guide' },
    zh: { rome_itinerary_link_title: '查看罗马5晚6天详细行程', rome_itinerary_link_desc: '11/29–12/4 · Salotto Monti · 11/30斗兽场 · 12/4 OZ562 22:50 · 罢工应对指南' },
    ja: { rome_itinerary_link_title: 'ローマ5泊6日の詳細日程を見る', rome_itinerary_link_desc: '11/29〜12/4・Salotto Monti・11/30コロッセオ・12/4 OZ562 22:50・ストライキ対策ガイド' }
  };
  const dictionary = window.I18N_DICTIONARY;
  if (!dictionary) return;
  Object.entries(labels).forEach(([language, entries]) => {
    if (!dictionary[language]) dictionary[language] = {};
    Object.assign(dictionary[language], entries);
  });
})();
