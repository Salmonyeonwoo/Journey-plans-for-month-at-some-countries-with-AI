/* A non-modal chapter/page chooser. Existing book state and routes remain authoritative. */
(function () {
  'use strict';
  const copy = {
    ko: { short: '목차', open: '전체 목차 열기', title: '장·페이지 이동', chapters: '장 선택', pages: '이 장의 페이지', close: '목차 닫기' },
    en: { short: 'Contents', open: 'Open all contents', title: 'Chapters & pages', chapters: 'Choose a chapter', pages: 'Pages in this chapter', close: 'Close contents' },
    ja: { short: '目次', open: '全目次を開く', title: '章・ページへ移動', chapters: '章を選択', pages: 'この章のページ', close: '目次を閉じる' },
    zh: { short: '目录', open: '打开完整目录', title: '章节与页面导航', chapters: '选择章节', pages: '本章页面', close: '关闭目录' }
  };
  let menu, opener;
  function text() {
    const lang = typeof currentLang !== 'undefined' ? currentLang : document.documentElement.lang;
    return copy[lang] || copy.ko;
  }
  function chapterLabel(id) {
    return document.querySelector('#' + id + ' .book-chapter-badge [data-i18n]')?.textContent.trim() || id;
  }
  function setExpanded(open) {
    document.querySelectorAll('.book-menu-toggle').forEach(button => button.setAttribute('aria-expanded', open && button === opener ? 'true' : 'false'));
  }
  function closeMenu(restoreFocus = false) {
    if (!menu || menu.hidden) return;
    menu.hidden = true;
    menu.setAttribute('aria-hidden', 'true');
    setExpanded(false);
    if (restoreFocus && opener?.isConnected) opener.focus({ preventScroll: true });
  }
  function positionMenu() {
    if (!menu || menu.hidden) return;
    const top = Math.max(8, (document.getElementById('mainHeader')?.getBoundingClientRect().bottom || 58) + 8);
    menu.style.top = top + 'px';
    menu.style.maxHeight = Math.max(120, window.innerHeight - top - (window.innerWidth < 1080 ? 88 : 24)) + 'px';
  }
  function navigate(chapter, page) {
    closeMenu(false);
    window.switchGuidebookChapter(chapter, false);
    window.goToBookPage(chapter, page, true);
    document.querySelector('#' + chapter + ' .book-menu-toggle')?.focus({ preventScroll: true });
    syncPageTabs();
  }
  function makeButton(label, active, onClick) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'guide-menu-item' + (active ? ' active' : '');
    button.textContent = label;
    button.addEventListener('click', onClick);
    return button;
  }
  function renderMenu() {
    const t = text();
    const chapter = window.currentActiveChapter || 'chapter-overview';
    const page = window.currentBookPage?.[chapter] || 0;
    menu.setAttribute('aria-label', t.title);
    menu.querySelector('#guidebookMenuTitle').textContent = t.title;
    menu.querySelector('.guide-menu-close').setAttribute('aria-label', t.close);
    menu.querySelector('#guideMenuChaptersTitle').textContent = t.chapters;
    menu.querySelector('#guideMenuPagesTitle').textContent = t.pages + ' · ' + chapterLabel(chapter);
    const chapters = menu.querySelector('.guide-menu-chapters');
    const pages = menu.querySelector('.guide-menu-pages');
    chapters.replaceChildren();
    pages.replaceChildren();
    document.querySelectorAll('#sidebarChapterNav [data-chapter]').forEach(source => {
      const id = source.dataset.chapter;
      const button = makeButton(chapterLabel(id), id === chapter, () => navigate(id, window.currentBookPage?.[id] || 0));
      button.dataset.menuChapter = id;
      if (id === chapter) button.setAttribute('aria-current', 'true');
      chapters.appendChild(button);
    });
    document.querySelectorAll('#tabs-' + chapter + ' .bookmark-chip').forEach((source, index) => {
      const button = makeButton(source.textContent.trim().replace(/\s+/g, ' '), index === page, () => navigate(chapter, index));
      button.dataset.menuPage = String(index);
      if (index === page) button.setAttribute('aria-current', 'page');
      pages.appendChild(button);
    });
  }
  function refreshLabels() {
    const t = text();
    document.querySelectorAll('[data-guide-menu-label]').forEach(label => { label.textContent = t.short; });
    document.querySelectorAll('.book-menu-toggle').forEach(button => {
      const name = button.classList.contains('book-chapter-badge') ? t.open + ' · ' + button.querySelector('[data-i18n]').textContent.trim() : t.open;
      button.setAttribute('aria-label', name);
      button.title = name;
    });
    document.querySelectorAll('.book-bookmark-tabs').forEach(tabs => tabs.setAttribute('aria-label', t.pages));
    if (menu && !menu.hidden) renderMenu();
  }
  function syncPageTabs() {
    document.querySelectorAll('.bookmark-chip').forEach(chip => chip.setAttribute('aria-pressed', chip.classList.contains('active') ? 'true' : 'false'));
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
  function openMenu(trigger, keyboard = false) {
    init();
    const settings = document.getElementById('settingsDropdownPanel');
    if (settings && settings.style.display !== 'none' && typeof toggleSettingsPanel === 'function') toggleSettingsPanel(false);
    opener = trigger;
    renderMenu();
    menu.hidden = false;
    menu.setAttribute('aria-hidden', 'false');
    setExpanded(true);
    positionMenu();
    if (keyboard) menu.querySelector('.guide-menu-pages [aria-current="page"]')?.focus({ preventScroll: true });
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
    menu.innerHTML = '<div class="guide-menu-heading"><h2 id="guidebookMenuTitle"></h2><button type="button" class="guide-menu-close">×</button></div><h3 id="guideMenuChaptersTitle"></h3><div class="guide-menu-chapters" aria-labelledby="guideMenuChaptersTitle"></div><h3 id="guideMenuPagesTitle"></h3><div class="guide-menu-pages" aria-labelledby="guideMenuPagesTitle"></div>';
    document.body.appendChild(menu);
    menu.querySelector('.guide-menu-close').addEventListener('click', () => closeMenu(true));
    menu.addEventListener('keydown', event => {
      // Book shortcuts must not run while operating the chooser. Tab remains native/non-modal.
      event.stopPropagation();
      if (event.key === 'Escape') { event.preventDefault(); closeMenu(true); return; }
      if (!['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) return;
      event.preventDefault();
      const buttons = Array.from(menu.querySelectorAll('button'));
      const index = buttons.indexOf(document.activeElement);
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
    const pageObserver = new MutationObserver(syncPageTabs);
    document.querySelectorAll('.book-bookmark-tabs, #mobileBottomNav').forEach(tabs => pageObserver.observe(tabs, { subtree: true, attributes: true, attributeFilter: ['class'] }));
    refreshLabels();
    syncPageTabs();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
