/* Category-based guidebook contents. Existing chapter/page controls, hashes and content remain authoritative. */
(function () {
  'use strict';

  const CHAPTERS = [
    'chapter-overview', 'chapter-planner', 'chapter-guide',
    'chapter-festivals', 'chapter-practical'
  ];

  const UI = {
    ko: {
      short: '목차', open: '콘텐츠별 전체 목차 열기', title: '어디부터 볼까요?',
      intro: '콘텐츠 종류별로 찾거나, 기존 5개 장과 23개 페이지로 바로 이동하세요. 섹션 바로가기는 해당 페이지를 연 뒤 그 위치로 이동합니다.',
      chapters: '장 바로가기', categories: '콘텐츠 종류', searchLabel: '목차 검색', searchPlaceholder: '페이지·도시·주제 검색',
      close: '목차 닫기', pageWord: '페이지', pageUnit: '페이지', sectionUnit: '섹션', sectionWord: '섹션 바로가기',
      groupOverview: '여행 계획 · 개요', groupItinerary: '일정 · 날짜별 플랜',
      groupDestinations: '목적지 · 지도', groupFood: '음식 · 식당',
      groupExperiences: '체험 · 축제 · 야경', groupEssentials: '교통 · 여행 필수정보',
      groupTools: '도구 · 저장 목록', noResults: '일치하는 목차가 없습니다. 다른 검색어를 입력해 보세요.',
      pageTip: '페이지', sectionTip: '페이지 안의 섹션',
      secCurated: '지도 큐레이션 · 가족 추천 31선', secNerja: '말라가 · 네르하 당일치기 가이드',
      secCandidates: '도시별 추가 맛집 · 시장 · 전망 후보', secMasterFood: '도시별 미식 마스터 가이드',
      secMarkets: '4개 도시 시장 · 저녁 음식 가이드', secDiningSearch: '검증 맛집 92선 검색',
      secBarcelonaDining: '바르셀로나 식당 보충 가이드',
      secSpainGuide: '스페인 지역 루트 · 명소 안내', secHotels: '확정 숙소 요약',
      secEuropeTaxi: '유럽 택시 앱 · 호출 팁', secFlamenco: '플라멩코 공연 가이드',
      secActivities: '활동 · 스파 가이드', sectionsNote: '이 페이지에는 여러 보충 가이드가 함께 실려 있습니다. 아래 섹션 바로가기를 이용하면 원하는 자료로 곧바로 이동할 수 있습니다.'
    },
    en: {
      short: 'Contents', open: 'Open contents by type', title: 'Where would you like to go?',
      intro: 'Browse by content type, or jump directly to any of the five chapters and 23 existing pages. Section shortcuts open the page first, then scroll to that section.',
      chapters: 'Jump to a chapter', categories: 'Browse by content type', searchLabel: 'Search contents', searchPlaceholder: 'Search pages, places or topics',
      close: 'Close contents', pageWord: 'pages', pageUnit: 'pages', sectionUnit: 'sections', sectionWord: 'section shortcuts',
      groupOverview: 'Trip planning & overview', groupItinerary: 'Itinerary & day-by-day plans',
      groupDestinations: 'Destinations & maps', groupFood: 'Food & dining',
      groupExperiences: 'Experiences, festivals & night views', groupEssentials: 'Transport & essentials',
      groupTools: 'Tools & saved lists', noResults: 'No contents match that search. Try another term.',
      pageTip: 'Page', sectionTip: 'Section within a page',
      secCurated: 'Curated map picks · 31 family favorites', secNerja: 'Málaga · Nerja day-trip guide',
      secCandidates: 'More city food, markets & viewpoints', secMasterFood: 'Regional food master guide',
      secMarkets: 'Markets & evening food · four cities', secDiningSearch: 'Search the 92-place dining directory',
      secBarcelonaDining: 'Barcelona dining supplement',
      secSpainGuide: 'Spain regional routes & highlights', secHotels: 'Confirmed-stay summary',
      secEuropeTaxi: 'European taxi apps & booking tips', secFlamenco: 'Flamenco show guide',
      secActivities: 'Activities & spa guide', sectionsNote: 'This page brings together several supplementary guides. Use a section shortcut below to jump straight to the material you need.'
    },
    ja: {
      short: '目次', open: '内容別の全目次を開く', title: 'どこから見ますか？',
      intro: '内容の種類から探すか、既存の5章・23ページへ直接移動できます。セクションのショートカットはページを開いてから該当箇所へ移動します。',
      chapters: '章へ移動', categories: '内容の種類', searchLabel: '目次を検索', searchPlaceholder: 'ページ・都市・テーマを検索',
      close: '目次を閉じる', pageWord: 'ページ', pageUnit: 'ページ', sectionUnit: 'セクション', sectionWord: 'セクションへ',
      groupOverview: '旅行計画・概要', groupItinerary: '日程・日ごとのプラン',
      groupDestinations: '目的地・地図', groupFood: '食事・レストラン',
      groupExperiences: '体験・祭り・夜景', groupEssentials: '交通・旅行の基本情報',
      groupTools: 'ツール・保存リスト', noResults: '該当する目次がありません。別の語句で検索してください。',
      pageTip: 'ページ', sectionTip: 'ページ内のセクション',
      secCurated: '地図のおすすめ · 家族向け31選', secNerja: 'マラガ · ネルハ日帰りガイド',
      secCandidates: '各都市の追加グルメ・市場・展望候補', secMasterFood: '各都市のグルメ総合ガイド',
      secMarkets: '4都市の市場・夕食ガイド', secDiningSearch: '厳選レストラン92選を検索',
      secBarcelonaDining: 'バルセロナの食事補足ガイド',
      secSpainGuide: 'スペイン各地域のルート・見どころ', secHotels: '確定した宿泊先の概要',
      secEuropeTaxi: '欧州のタクシーアプリ・利用のヒント', secFlamenco: 'フラメンコ公演ガイド',
      secActivities: 'アクティビティ・スパガイド', sectionsNote: 'このページには複数の補足ガイドがあります。下のセクションショートカットから目的の情報へ直接移動できます。'
    },
    zh: {
      short: '目录', open: '按内容类型打开完整目录', title: '想从哪里开始？',
      intro: '可按内容类型浏览，也可直接前往现有5章中的任一章节和23个页面。分区快捷入口会先打开页面，再滚动到对应内容。',
      chapters: '跳转章节', categories: '按内容类型浏览', searchLabel: '搜索目录', searchPlaceholder: '搜索页面、地点或主题',
      close: '关闭目录', pageWord: '页', pageUnit: '页', sectionUnit: '分区', sectionWord: '分区快捷入口',
      groupOverview: '旅行规划与概览', groupItinerary: '行程与每日计划',
      groupDestinations: '目的地与地图', groupFood: '美食与餐厅',
      groupExperiences: '体验、节庆与夜景', groupEssentials: '交通与旅行必备',
      groupTools: '工具与已保存列表', noResults: '没有匹配的目录，请尝试其他关键词。',
      pageTip: '页面', sectionTip: '页面内分区',
      secCurated: '精选地图 · 31个家庭推荐', secNerja: '马拉加 · 内尔哈一日游指南',
      secCandidates: '各城市补充美食、市场与观景点', secMasterFood: '城市美食综合指南',
      secMarkets: '四座城市的市场与晚餐指南', secDiningSearch: '搜索92家精选餐厅',
      secBarcelonaDining: '巴塞罗那餐饮补充指南',
      secSpainGuide: '西班牙分区路线与景点', secHotels: '已确认住宿汇总',
      secEuropeTaxi: '欧洲打车应用与使用提示', secFlamenco: '弗拉门戈演出指南',
      secActivities: '活动与水疗指南', sectionsNote: '此页面汇集了多个补充指南。使用下方的分区快捷入口，可直接前往所需内容。'
    }
  };

  // Page references use the existing stable chapter id and zero-based tab index.
  // Every current book page is listed in at least one content category; some intentionally recur.
  const CATEGORIES = [
    { key: 'groupOverview', icon: '✦', pages: ['chapter-overview:0', 'chapter-overview:1', 'chapter-overview:2'], sections: [{ route: 'chapter-planner:0', target: 'summary-hotels', key: 'secHotels', icon: '🏨' }] },
    { key: 'groupItinerary', icon: '⌁', pages: ['chapter-planner:0', 'chapter-planner:1', 'chapter-planner:2', 'chapter-planner:3'], sections: [] },
    { key: 'groupDestinations', icon: '⌖', pages: ['chapter-guide:0', 'chapter-guide:1', 'chapter-guide:2', 'chapter-guide:3', 'chapter-guide:4'], sections: [
      { route: 'chapter-guide:1', target: 'granada-malaga-general-guide', key: 'secSpainGuide', icon: '🇪🇸' },
      { route: 'chapter-practical:0', target: 'curated-family-places', key: 'secCurated', icon: '💖' },
      { route: 'chapter-practical:0', target: 'practical-city-candidates', key: 'secCandidates', icon: '📍' }
    ] },
    { key: 'groupFood', icon: '◉', pages: ['chapter-practical:0'], sections: [
      { route: 'chapter-practical:0', target: 'practical-master-gourmet', key: 'secMasterFood', icon: '🥘' },
      { route: 'chapter-practical:0', target: 'spanish-market-food-guide', key: 'secMarkets', icon: '🥕' },
      { route: 'chapter-practical:0', target: 'barcelona-dining-guide-mount', key: 'secBarcelonaDining', icon: '🍽️' },
      { route: 'chapter-practical:0', target: 'globalDiningSearch', key: 'secDiningSearch', icon: '🔎' }
    ] },
    { key: 'groupExperiences', icon: '✧', pages: ['chapter-festivals:0', 'chapter-festivals:1', 'chapter-festivals:2', 'chapter-practical:5'], sections: [
      { route: 'chapter-practical:0', target: 'nerja-daytrip-guide', key: 'secNerja', icon: '🚌' },
      { route: 'chapter-practical:5', target: 'flamenco-guide-mount', key: 'secFlamenco', icon: '💃' },
      { route: 'chapter-practical:5', target: 'activity-guide-mount', key: 'secActivities', icon: '♨️' }
    ] },
    { key: 'groupEssentials', icon: '➜', pages: ['chapter-practical:1', 'chapter-practical:2', 'chapter-practical:3', 'chapter-practical:4'], sections: [
      // The Europe transport guide is generated in a hidden subtab; its shortcut first activates that subtab.
      { route: 'chapter-practical:2', target: 'europeTaxiAppGuide', key: 'secEuropeTaxi', icon: '🚕', activate: activateEuropeTaxiTab }
    ] },
    { key: 'groupTools', icon: '▤', pages: ['chapter-practical:6', 'chapter-festivals:3', 'chapter-guide:4'], sections: [] }
  ];

  let menu = null;
  let opener = null;
  let activeFilter = '';
  let pageObserver = null;

  function lang() {
    const value = typeof currentLang !== 'undefined' ? currentLang : document.documentElement.lang;
    return UI[value] ? value : 'ko';
  }
  function copy() { return UI[lang()]; }
  function routeParts(route) {
    const parts = route.split(':');
    return { chapter: parts[0], page: Number(parts[1]) };
  }
  function chapterName(chapter) {
    const source = document.querySelector('#' + chapter + ' .book-chapter-badge [data-i18n]') ||
      document.querySelector('#sidebarChapterNav [data-chapter="' + chapter + '"] .chapter-name');
    return source?.textContent.trim().replace(/\s+/g, ' ') || chapter;
  }
  function pageSources(chapter) {
    return Array.from(document.querySelectorAll('#tabs-' + chapter + ' .bookmark-chip'));
  }
  function pageName(chapter, index) {
    const source = pageSources(chapter)[index];
    const label = source?.querySelector('[data-i18n^="page_"]') || source;
    return label?.textContent.trim().replace(/\s+/g, ' ') || (copy().pageWord + ' ' + (index + 1));
  }
  function pageCount() {
    return CHAPTERS.reduce((count, chapter) => count + pageSources(chapter).length, 0);
  }
  function setExpanded(open) {
    document.querySelectorAll('.book-menu-toggle').forEach(button => button.setAttribute('aria-expanded', open && button === opener ? 'true' : 'false'));
  }
  function positionMenu() {
    if (!menu || menu.hidden) return;
    const header = document.getElementById('mainHeader');
    const top = Math.max(8, (header?.getBoundingClientRect().bottom || 58) + 8);
    menu.style.top = top + 'px';
    menu.style.maxHeight = Math.max(120, window.innerHeight - top - (window.innerWidth < 1080 ? 80 : 20)) + 'px';
  }
  function closeMenu(restoreFocus) {
    if (!menu || menu.hidden) return;
    menu.hidden = true;
    menu.setAttribute('aria-hidden', 'true');
    setExpanded(false);
    if (restoreFocus && opener?.isConnected) opener.focus({ preventScroll: true });
  }
  function activateEuropeTaxiTab() {
    if (typeof window.switchTransitHotelSubTab === 'function') window.switchTransitHotelSubTab('europe');
  }
  function jumpTo(route, section) {
    const { chapter, page } = routeParts(route);
    closeMenu(false);
    if (typeof window.switchGuidebookChapter !== 'function' || typeof window.goToBookPage !== 'function') return;
    window.switchGuidebookChapter(chapter, false);
    window.goToBookPage(chapter, page, false);

    const scrollTarget = function () {
      const target = section ? document.getElementById(section.target) : null;
      const pageEl = document.getElementById('page-' + chapter.replace('chapter-', '') + '-' + page);
      const destination = target || pageEl || document.getElementById('bookBar-' + chapter);
      if (destination) {
        const margin = parseFloat(window.getComputedStyle(destination).scrollMarginTop) || 116;
        const distance = destination.getBoundingClientRect().top - margin;
        if (Math.abs(distance) > 700) {
          const root = document.documentElement;
          const body = document.body;
          const rootBehavior = root.style.scrollBehavior;
          const bodyBehavior = body.style.scrollBehavior;
          root.style.scrollBehavior = 'auto';
          body.style.scrollBehavior = 'auto';
          window.scrollTo(0, window.scrollY + distance);
          root.style.scrollBehavior = rootBehavior;
          body.style.scrollBehavior = bodyBehavior;
        } else {
          window.scrollBy({ top: distance, behavior: 'smooth' });
        }
      }
      const focusTarget = document.querySelector('#tabs-' + chapter + ' .bookmark-chip:nth-child(' + (page + 1) + ')');
      focusTarget?.setAttribute('aria-current', 'page');
    };

    if (section?.activate) section.activate();
    // Renderers and selected subtabs create their content synchronously; the frame delay lets layout settle.
    window.setTimeout(scrollTarget, section?.activate ? 140 : 70);
  }
  function jumpToChapter(chapter) {
    closeMenu(false);
    if (typeof window.switchGuidebookChapter === 'function') window.switchGuidebookChapter(chapter, true);
  }
  function makePageButton(route, active, section) {
    const { chapter, page } = routeParts(route);
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'guide-menu-entry' + (section ? ' guide-menu-section-entry' : '') + (active && !section ? ' is-current' : '');
    button.dataset.route = route;
    if (section) button.dataset.section = section.target;
    button.setAttribute('aria-label', section ? (pageName(chapter, page) + ' — ' + copy()[section.key]) : pageName(chapter, page));
    button.title = section ? copy().sectionTip : copy().pageTip;
    if (!section && active) button.setAttribute('aria-current', 'page');
    const icon = document.createElement('span');
    icon.className = 'guide-menu-entry-icon';
    icon.setAttribute('aria-hidden', 'true');
    icon.textContent = section?.icon || (active ? '●' : '○');
    const content = document.createElement('span');
    content.className = 'guide-menu-entry-content';
    const title = document.createElement('span');
    title.className = 'guide-menu-entry-title';
    title.textContent = section ? copy()[section.key] : pageName(chapter, page);
    const meta = document.createElement('span');
    meta.className = 'guide-menu-entry-meta';
    meta.textContent = section ? (chapterName(chapter) + ' · ' + copy().sectionWord) : (chapterName(chapter) + ' · ' + copy().pageWord + ' ' + (page + 1));
    content.append(title, meta);
    const arrow = document.createElement('span');
    arrow.className = 'guide-menu-entry-arrow';
    arrow.setAttribute('aria-hidden', 'true');
    arrow.textContent = '↗';
    button.append(icon, content, arrow);
    button.addEventListener('click', () => jumpTo(route, section));
    return button;
  }
  function activeRoute() {
    const chapter = window.currentActiveChapter || 'chapter-overview';
    const page = Number(window.currentBookPage?.[chapter] || 0);
    return chapter + ':' + page;
  }
  function renderMenu() {
    if (!menu) return;
    const t = copy();
    const current = activeRoute();
    const currentChapter = current.split(':')[0];
    const currentLang = lang();
    menu.setAttribute('aria-label', t.title);
    menu.querySelector('#guidebookMenuTitle').textContent = t.title;
    menu.querySelector('#guidebookMenuIntro').textContent = t.intro;
    menu.querySelector('.guide-menu-close').setAttribute('aria-label', t.close);
    menu.querySelector('label[for="guideMenuSearch"]').textContent = t.searchLabel;
    menu.querySelector('#guideMenuSearch').placeholder = t.searchPlaceholder;
    menu.querySelector('#guideMenuChaptersTitle').textContent = t.chapters;
    menu.querySelector('#guideMenuCategoriesTitle').textContent = t.categories;
    menu.querySelector('#guideMenuPageCount').textContent = pageCount() + ' ' + t.pageWord;
    menu.querySelector('#guideMenuNoResults').textContent = t.noResults;
    menu.querySelector('#guideMenuSectionsNote').textContent = t.sectionsNote;

    const chapterWrap = menu.querySelector('.guide-menu-chapters');
    chapterWrap.replaceChildren();
    CHAPTERS.forEach(chapter => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'guide-menu-chapter' + (chapter === currentChapter ? ' is-current' : '');
      button.textContent = chapterName(chapter);
      button.setAttribute('aria-label', chapterName(chapter));
      if (chapter === currentChapter) button.setAttribute('aria-current', 'true');
      button.addEventListener('click', () => jumpToChapter(chapter));
      chapterWrap.appendChild(button);
    });

    const categoryWrap = menu.querySelector('.guide-menu-categories');
    categoryWrap.replaceChildren();
    CATEGORIES.forEach(category => {
      const details = document.createElement('details');
      details.className = 'guide-menu-category';
      details.dataset.category = category.key;
      const summary = document.createElement('summary');
      const symbol = document.createElement('span');
      symbol.className = 'guide-menu-category-icon';
      symbol.setAttribute('aria-hidden', 'true');
      symbol.textContent = category.icon;
      const label = document.createElement('span');
      label.className = 'guide-menu-category-name';
      label.textContent = t[category.key];
      const count = document.createElement('span');
      count.className = 'guide-menu-category-count';
      count.textContent = category.pages.length + ' ' + t.pageUnit + ' · ' + category.sections.length + ' ' + t.sectionUnit;
      count.setAttribute('aria-label', category.pages.length + ' ' + t.pageUnit + ', ' + category.sections.length + ' ' + t.sectionWord);
      summary.append(symbol, label, count);
      details.appendChild(summary);
      const entries = document.createElement('div');
      entries.className = 'guide-menu-category-entries';
      category.pages.forEach(route => {
        const parts = routeParts(route);
        entries.appendChild(makePageButton(route, route === current, null));
        if (parts.chapter === 'chapter-practical' && parts.page === 0 && category.key === 'groupFood') {
          // Supplementary food/place links below are represented by explicit section items, not guessed from page labels.
        }
      });
      category.sections.forEach(section => entries.appendChild(makePageButton(section.route, section.route === current, section)));
      details.appendChild(entries);
      categoryWrap.appendChild(details);
    });
    if (activeFilter) applyFilter(activeFilter);
    else updateSummaryCounts();
    menu.dataset.language = currentLang;
  }
  function updateSummaryCounts() {
    if (!menu) return;
    menu.querySelectorAll('.guide-menu-category').forEach(details => {
      const visible = Array.from(details.querySelectorAll('.guide-menu-entry')).filter(entry => !entry.hidden).length;
      details.dataset.visibleCount = String(visible);
    });
  }
  function applyFilter(query) {
    activeFilter = query.trim().toLocaleLowerCase();
    if (!menu) return;
    let found = false;
    menu.querySelectorAll('.guide-menu-category').forEach(details => {
      let categoryMatches = false;
      details.querySelectorAll('.guide-menu-entry').forEach(entry => {
        const matches = !activeFilter || entry.textContent.toLocaleLowerCase().includes(activeFilter) || entry.getAttribute('aria-label').toLocaleLowerCase().includes(activeFilter);
        entry.hidden = !matches;
        if (matches) { categoryMatches = true; found = true; }
      });
      details.hidden = !categoryMatches;
      if (activeFilter && categoryMatches) details.open = true;
    });
    menu.querySelector('#guideMenuNoResults').hidden = found;
    updateSummaryCounts();
  }
  function refreshLabels() {
    const t = copy();
    document.querySelectorAll('[data-guide-menu-label]').forEach(label => { label.textContent = t.short; });
    document.querySelectorAll('.book-menu-toggle').forEach(button => {
      const chapter = button.classList.contains('book-chapter-badge') ? button.querySelector('[data-i18n]')?.textContent.trim() : '';
      const name = chapter ? t.open + ' · ' + chapter : t.open;
      button.setAttribute('aria-label', name);
      button.title = name;
    });
    document.querySelectorAll('.book-bookmark-tabs').forEach(tabs => tabs.setAttribute('aria-label', t.pageWord));
    if (menu && !menu.hidden) renderMenu();
  }
  function syncPageTabs() {
    document.querySelectorAll('.bookmark-chip').forEach(chip => {
      chip.setAttribute('aria-pressed', chip.classList.contains('active') ? 'true' : 'false');
      chip.removeAttribute('aria-current');
    });
    const chapter = window.currentActiveChapter || 'chapter-overview';
    const page = Number(window.currentBookPage?.[chapter] || 0);
    const currentTab = pageSources(chapter)[page];
    currentTab?.setAttribute('aria-current', 'page');
    document.querySelectorAll('#mobileBottomNav [data-chapter]').forEach(button => {
      if (button.classList.contains('active')) button.setAttribute('aria-current', 'page');
      else button.removeAttribute('aria-current');
    });
    const tabs = document.querySelector('.guidebook-chapter.active .book-bookmark-tabs');
    const chip = tabs?.querySelector('.bookmark-chip.active');
    if (!chip || tabs.scrollWidth <= tabs.clientWidth) return;
    const row = tabs.getBoundingClientRect();
    const item = chip.getBoundingClientRect();
    if (item.left < row.left) tabs.scrollLeft -= row.left - item.left + 4;
    else if (item.right > row.right) tabs.scrollLeft += item.right - row.right + 4;
  }
  function openMenu(trigger, keyboard) {
    init();
    const settings = document.getElementById('settingsDropdownPanel');
    if (settings && settings.style.display !== 'none' && typeof window.toggleSettingsPanel === 'function') window.toggleSettingsPanel(false);
    opener = trigger;
    renderMenu();
    menu.hidden = false;
    menu.setAttribute('aria-hidden', 'false');
    setExpanded(true);
    positionMenu();
    if (keyboard) window.requestAnimationFrame(() => menu.querySelector('#guideMenuSearch')?.focus({ preventScroll: true }));
  }
  window.toggleGuidebookMenu = function (trigger, event) {
    if (menu && !menu.hidden) closeMenu(false);
    else openMenu(trigger, event?.detail === 0);
  };
  function init() {
    if (menu) return;
    menu = document.createElement('nav');
    menu.id = 'guidebookMenu';
    menu.className = 'guidebook-menu';
    menu.hidden = true;
    menu.setAttribute('aria-hidden', 'true');
    menu.innerHTML = '<div class="guide-menu-heading"><div class="guide-menu-heading-copy"><p class="guide-menu-eyebrow">SLOW · TRAVEL</p><h2 id="guidebookMenuTitle"></h2></div><button type="button" class="guide-menu-close"><span aria-hidden="true">×</span></button></div><p class="guide-menu-intro" id="guidebookMenuIntro"></p><div class="guide-menu-search"><label for="guideMenuSearch"></label><input type="search" id="guideMenuSearch" autocomplete="off" /></div><section class="guide-menu-chapter-section" aria-labelledby="guideMenuChaptersTitle"><div class="guide-menu-section-head"><h3 id="guideMenuChaptersTitle"></h3><span id="guideMenuPageCount"></span></div><div class="guide-menu-chapters"></div></section><section class="guide-menu-category-section" aria-labelledby="guideMenuCategoriesTitle"><div class="guide-menu-section-head"><h3 id="guideMenuCategoriesTitle"></h3><span class="guide-menu-section-count">7</span></div><div class="guide-menu-categories"></div><p id="guideMenuNoResults" class="guide-menu-no-results" hidden></p></section><p class="guide-menu-sections-note" id="guideMenuSectionsNote"></p>';
    document.body.appendChild(menu);
    menu.querySelector('.guide-menu-close').addEventListener('click', () => closeMenu(true));
    menu.querySelector('#guideMenuSearch').addEventListener('input', event => applyFilter(event.currentTarget.value));
    menu.querySelector('#guideMenuSearch').addEventListener('keydown', event => {
      if (event.key === 'Escape' && event.currentTarget.value) { event.preventDefault(); event.currentTarget.value = ''; applyFilter(''); }
      else if (event.key === 'Enter') {
        const first = menu.querySelector('.guide-menu-entry:not([hidden])');
        if (first) { event.preventDefault(); first.click(); }
      }
    });
    menu.addEventListener('keydown', event => {
      // Keep the chooser non-modal; stop only the book's global navigation shortcuts.
      event.stopPropagation();
      if (event.key === 'Escape') {
        event.preventDefault();
        if (activeFilter) { const input = menu.querySelector('#guideMenuSearch'); input.value = ''; applyFilter(''); input.focus(); }
        else closeMenu(true);
        return;
      }
      if (!['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key) || event.target.matches('input, summary')) return;
      const buttons = Array.from(menu.querySelectorAll('button:not([hidden])')).filter(button => !button.closest('[hidden]'));
      const index = buttons.indexOf(document.activeElement);
      if (index < 0 || !buttons.length) return;
      event.preventDefault();
      const next = event.key === 'Home' ? 0 : event.key === 'End' ? buttons.length - 1 : (index + (event.key === 'ArrowDown' ? 1 : -1) + buttons.length) % buttons.length;
      buttons[next].focus();
    });
    document.querySelectorAll('.book-menu-toggle').forEach(button => button.addEventListener('keydown', event => {
      if (event.key === 'Escape') { event.preventDefault(); closeMenu(true); }
      if (event.key === 'ArrowDown') { event.preventDefault(); openMenu(button, true); }
      if (['Escape', 'ArrowDown', 'ArrowUp', 'ArrowLeft', 'ArrowRight', '[', ']', '1', '2', '3', '4', '5', 'PageUp', 'PageDown'].includes(event.key)) event.stopPropagation();
    }));
    document.addEventListener('pointerdown', event => {
      if (!menu.hidden && !menu.contains(event.target) && !event.target.closest('.book-menu-toggle')) closeMenu(false);
    }, true);
    document.addEventListener('focusin', event => {
      if (!menu.hidden && !menu.contains(event.target) && !event.target.closest('.book-menu-toggle')) closeMenu(false);
    });
    window.addEventListener('hashchange', () => closeMenu(false));
    window.addEventListener('resize', () => { positionMenu(); syncPageTabs(); });
    new MutationObserver(refreshLabels).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
    pageObserver = new MutationObserver(syncPageTabs);
    document.querySelectorAll('.book-bookmark-tabs, #mobileBottomNav').forEach(tabs => pageObserver.observe(tabs, { subtree: true, attributes: true, attributeFilter: ['class'] }));
    refreshLabels();
    syncPageTabs();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
