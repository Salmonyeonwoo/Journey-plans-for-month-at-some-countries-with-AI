(function () {
  'use strict';

  const UI = {
    ko: {
      title: '로마 5박 6일 맞춤 일정',
      intro: '11월 29일~12월 4일 마스터 일정과 OZ562 귀국편 파업 가이드를 각각 확인할 수 있습니다.',
      sourceNote: '제공된 원문은 임의로 검증하거나 수정하지 않았으며, 번역은 표현을 옮긴 것입니다.',
      back: '플래너로 돌아가기', language: '표시 언어', eyebrow: 'ROME · 2026',
      masterTab: '5박 6일 마스터 일정', strikeTab: '12/4 파업 · OZ562 귀국 가이드',
      pageTitle: '로마 5박 6일 맞춤 일정 | Slow Travel',
      unavailable: '이 문서를 표시할 수 없습니다. 페이지를 새로고침해 주세요.'
    },
    en: {
      title: 'Rome: A Tailored 5-Night, 6-Day Itinerary',
      intro: 'Open the Nov 29–Dec 4 master schedule or the strike-impact guide for the OZ562 return flight.',
      sourceNote: 'The supplied source text has not been independently checked or edited; translations carry its wording into another language.',
      back: 'Back to the planner', language: 'Display language', eyebrow: 'ROME · 2026',
      masterTab: '5-night, 6-day master schedule', strikeTab: 'Dec 4 strike · OZ562 return guide',
      pageTitle: 'Rome: 5-Night, 6-Day Itinerary | Slow Travel',
      unavailable: 'This document could not be displayed. Please refresh the page.'
    },
    zh: {
      title: '罗马5晚6天家庭定制行程',
      intro: '可分别查看11月29日至12月4日的总行程，以及OZ562返程航班的罢工影响指南。',
      sourceNote: '提供的原文未被擅自核实或修改；译文仅将原有表述转为其他语言。',
      back: '返回行程规划', language: '显示语言', eyebrow: 'ROME · 2026',
      masterTab: '5晚6天总行程', strikeTab: '12月4日罢工 · OZ562返程指南',
      pageTitle: '罗马5晚6天行程 | Slow Travel',
      unavailable: '无法显示此文档，请刷新页面。'
    },
    ja: {
      title: 'ローマ5泊6日・家族向けカスタム日程',
      intro: '11月29日〜12月4日のマスタースケジュールと、OZ562帰国便へのストライキ影響ガイドをそれぞれ確認できます。',
      sourceNote: '提供された原文は独自に検証・修正していません。翻訳は原文の表現を別の言語に移したものです。',
      back: 'プランナーに戻る', language: '表示言語', eyebrow: 'ROME · 2026',
      masterTab: '5泊6日マスタースケジュール', strikeTab: '12/4ストライキ・OZ562帰国ガイド',
      pageTitle: 'ローマ5泊6日の日程 | Slow Travel',
      unavailable: 'この文書を表示できません。ページを再読み込みしてください。'
    }
  };
  const query = new URLSearchParams(window.location.search);
  const langSelect = document.getElementById('romeLanguage');
  const content = document.getElementById('romeDocumentContent');
  const tabButtons = Array.from(document.querySelectorAll('[data-document]'));
  const validLang = (value) => Object.prototype.hasOwnProperty.call(UI, value) ? value : 'ko';
  const validDoc = (value) => value === 'strike' ? 'strike' : 'master';

  let currentLang = validLang(query.get('lang') || readStoredLanguage());
  let currentDoc = validDoc(query.get('doc'));

  function readStoredLanguage() {
    try { return localStorage.getItem('travel_user_lang') || 'ko'; }
    catch (error) { return 'ko'; }
  }

  function applyUi() {
    const copy = UI[currentLang];
    document.documentElement.lang = currentLang;
    document.title = copy.pageTitle;
    document.querySelectorAll('[data-ui]').forEach((element) => {
      const key = element.getAttribute('data-ui');
      if (copy[key] !== undefined) element.textContent = copy[key];
    });
    if (langSelect) {
      langSelect.value = currentLang;
      langSelect.setAttribute('aria-label', copy.language);
    }
    updateTabs();
  }

  function updateTabs() {
    tabButtons.forEach((button) => {
      const selected = button.dataset.document === currentDoc;
      button.classList.toggle('is-active', selected);
      button.setAttribute('aria-selected', selected ? 'true' : 'false');
      button.tabIndex = selected ? 0 : -1;
    });
    content.setAttribute('aria-labelledby', currentDoc === 'strike' ? 'romeTabStrike' : 'romeTabMaster');
  }

  function assignFocusIds() {
    const headings = Array.from(content.querySelectorAll('h1, h2, h3, h4'));
    const dayTwo = headings.find((heading) => /11\s*\/\s*30|11\s*月\s*30|nov(?:ember)?\s*\.?\s*30/i.test(heading.textContent));
    if (dayTwo) dayTwo.id = 'rome-day2';

    const candidates = [...content.querySelectorAll('li'), ...content.querySelectorAll('p')];
    const departure = candidates.find((element) => {
      const text = element.textContent.replace(/\s+/g, ' ');
      return text.includes('OZ562') && /22\s*:\s*50/.test(text);
    });
    if (departure) departure.id = 'rome-oz562-departure';
  }

  function wrapTables() {
    content.querySelectorAll('table').forEach((table) => {
      if (table.parentElement && table.parentElement.classList.contains('rome-table-scroll')) return;
      const wrapper = document.createElement('div');
      wrapper.className = 'rome-table-scroll';
      table.parentNode.insertBefore(wrapper, table);
      wrapper.appendChild(table);
    });
  }

  function renderDocument(scrollToHash) {
    const html = window.ROME_ITINERARY_CONTENT?.[currentLang]?.[currentDoc];
    if (!html) {
      content.textContent = UI[currentLang].unavailable;
      return;
    }
    content.innerHTML = html;
    wrapTables();
    assignFocusIds();
    updateTabs();
    if (scrollToHash) {
      const requested = window.location.hash.slice(1);
      const target = requested && document.getElementById(requested);
      if (target) window.setTimeout(() => target.scrollIntoView({ block: 'start', behavior: 'auto' }), 80);
    }
  }

  function selectDocument(doc, updateHash) {
    currentDoc = validDoc(doc);
    renderDocument(false);
    if (updateHash) {
      const url = new URL(window.location.href);
      url.searchParams.set('doc', currentDoc);
      window.history.replaceState({}, '', url);
    }
  }

  function selectLanguage(lang) {
    currentLang = validLang(lang);
    try { localStorage.setItem('travel_user_lang', currentLang); }
    catch (error) { /* Storage is optional; the page still works without it. */ }
    applyUi();
    renderDocument(false);
    const url = new URL(window.location.href);
    url.searchParams.set('lang', currentLang);
    window.history.replaceState({}, '', url);
  }

  langSelect?.addEventListener('change', (event) => selectLanguage(event.target.value));
  tabButtons.forEach((button) => button.addEventListener('click', () => selectDocument(button.dataset.document, true)));
  document.getElementById('romeDocumentTabs')?.addEventListener('keydown', (event) => {
    if (!['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
    event.preventDefault();
    const next = currentDoc === 'master' ? 'strike' : 'master';
    selectDocument(next, true);
    document.querySelector(`[data-document="${next}"]`)?.focus();
  });

  applyUi();
  renderDocument(true);
})();
