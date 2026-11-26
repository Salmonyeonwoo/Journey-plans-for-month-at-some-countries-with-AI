/* Four-language Uffizi photo catalogue; isolated from preserved Florence guide source. */
(function (root) {
  'use strict';
  const DATA = root.FLORENCE_UFFIZI_CATALOG_DATA;
  if (!DATA) return;
  const LANGS = ['ko', 'en', 'zh', 'ja'];
  const ID = 'florence-uffizi-catalog';
  let lastLang = '';
  let scheduled = false;

  function esc(value) {
    return String(value == null ? '' : value).replace(/[&<>"']/g, ch => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' })[ch]);
  }
  function langOf(value) {
    const key = String(value || '').toLowerCase();
    return LANGS.includes(key) ? key : 'ko';
  }
  function currentLang() {
    return langOf(root.currentLang || (root.document && root.document.documentElement && root.document.documentElement.lang) || 'ko');
  }
  function photoPath(file) {
    return `./img/uffizi-upload/${String(file).replace(/\.(?:jpg|heic)$/i, '.webp')}`;
  }
  function isRecapture(record, file) {
    return record.recapturePairs.some(pair => pair.includes(file));
  }
  function renderPhoto(record, file, lang) {
    const t = DATA.languages[lang];
    const badges = [];
    if (isRecapture(record, file)) badges.push(t.recapture);
    return `<figure class="fuc-photo"><img src="${esc(photoPath(file))}" alt="${esc(record.title[lang])} — ${esc(file)}" loading="lazy" decoding="async"><figcaption>${esc(t.filePrefix)}: ${esc(file)}${badges.length ? ` · <span>${esc(badges.join(' · '))}</span>` : ''}</figcaption></figure>`;
  }
  function renderRecord(record, lang, index) {
    const t = DATA.languages[lang];
    const search = [record.title[lang], record.artist, record.description[lang], ...record.files, ...record.keywords].join(' ').toLocaleLowerCase();
    const statusLabel = record.status === 'identified' ? t.identifiedTag : t.pendingTag;
    const photos = record.files.map(file => renderPhoto(record, file, lang)).join('');
    const sources = record.sources.map(source => `<li><a href="${esc(source.url)}" target="_blank" rel="noopener noreferrer">${esc(source.name)} ↗</a></li>`).join('');
    const uncertain = record.status === 'identified' ? '' : `<aside class="fuc-uncertainty"><strong>${esc(t.uncertainty)}</strong><p>${esc(record.uncertainty[lang])}</p></aside>`;
    const artist = record.artist ? `<p class="fuc-artist"><span>${esc(t.artist)}:</span> ${esc(record.artist)}</p>` : '';
    const contextNote = record.photoContext[lang] ? `<p class="fuc-photo-context">${esc(record.photoContext[lang])}</p>` : '';
    const sourceDetails = sources ? `<details class="fuc-sources"><summary>${esc(t.sources)}</summary><ul>${sources}</ul></details>` : '';
    const keywords = esc(search);
    return `<details class="fuc-record" data-record-id="${esc(record.id)}" data-status="${esc(record.status)}" data-search="${keywords}"${index === 0 ? ' open' : ''}><summary><span>${esc(record.title[lang])}</span><small class="fuc-status ${record.status === 'identified' ? 'is-identified' : 'is-pending'}">${esc(statusLabel)}</small></summary><div class="fuc-record-body">${artist}<div class="fuc-photos">${photos}</div>${contextNote}<p class="fuc-description">${esc(record.description[lang])}</p>${uncertain}${sourceDetails}</div></details>`;
  }
  function renderContext(item, lang, index) {
    const t = DATA.languages[lang];
    return `<figure class="fuc-context-photo"><img src="${esc(photoPath(item.file))}" alt="${esc(item.title[lang])} — ${esc(item.file)}" loading="lazy" decoding="async"><figcaption><strong>${esc(item.title[lang])}</strong><span>${esc(t.filePrefix)}: ${esc(item.file)}</span><p>${esc(item.description[lang])}</p></figcaption></figure>`;
  }
  function render(lang) {
    const l = langOf(lang);
    const t = DATA.languages[l];
    const identified = DATA.records.filter(record => record.status === 'identified').length;
    const pending = DATA.records.length - identified;
    const cards = DATA.records.map((record, i) => renderRecord(record, l, i)).join('');
    const context = DATA.contextPhotos.map((item, i) => renderContext(item, l, i)).join('');
    return `<section class="florence-uffizi-catalog" id="${ID}" lang="${l}" aria-labelledby="fuc-title"><header class="fuc-header"><span class="fuc-eyebrow">${esc(t.eyebrow)}</span><h3 id="fuc-title">${esc(t.title)}</h3><p>${esc(t.intro)}</p><div class="fuc-stats" aria-label="${esc(t.title)}"><span><strong>${DATA.photoCount}</strong> ${esc(t.count)}</span><span><strong>${DATA.records.length}</strong> ${esc(t.works)}</span><span><strong>${identified}</strong> ${esc(t.identified)}</span><span><strong>${pending}</strong> ${esc(t.pending)}</span></div><label class="fuc-search-label" for="fuc-search">${esc(t.search)}</label><input class="fuc-search" id="fuc-search" type="search" autocomplete="off" placeholder="${esc(t.search)}" oninput="filterUffiziCatalog()"><div class="fuc-filters" role="group" aria-label="${esc(t.title)}"><button type="button" class="is-active" data-filter="all" onclick="filterUffiziCatalog('all')">${esc(t.all)}</button><button type="button" data-filter="identified" onclick="filterUffiziCatalog('identified')">${esc(t.confirmed)}</button><button type="button" data-filter="pending" onclick="filterUffiziCatalog('pending')">${esc(t.unresolved)}</button></div><p class="fuc-source-help">${esc(t.sourcesHelp)}</p></header><div class="fuc-record-list">${cards}<p class="fuc-no-results" hidden>${esc(t.notFound)}</p></div><details class="fuc-context"><summary><span>${esc(t.contextTitle)}</span><small>${DATA.contextPhotos.length}</small></summary><p>${esc(t.contextIntro)}</p><div class="fuc-context-grid">${context}</div></details></section>`;
  }
  let activeFilter = 'all';
  function filterUffiziCatalog(filter) {
    if (filter && ['all','identified','pending'].includes(filter)) activeFilter = filter;
    const doc = root.document;
    if (!doc) return;
    const section = doc.getElementById(ID);
    if (!section) return;
    const input = section.querySelector('.fuc-search');
    const query = input ? input.value.trim().toLocaleLowerCase() : '';
    const records = Array.from(section.querySelectorAll('.fuc-record'));
    let shown = 0;
    records.forEach(card => {
      const statusMatches = activeFilter === 'all' || (activeFilter === 'identified' ? card.dataset.status === 'identified' : card.dataset.status !== 'identified');
      const queryMatches = !query || card.dataset.search.includes(query);
      card.hidden = !(statusMatches && queryMatches);
      if (!card.hidden) shown += 1;
    });
    section.querySelectorAll('.fuc-filters button').forEach(button => button.classList.toggle('is-active', button.dataset.filter === activeFilter));
    const noResults = section.querySelector('.fuc-no-results');
    if (noResults) noResults.hidden = shown !== 0;
  }
  root.filterUffiziCatalog = filterUffiziCatalog;

  function openCatalog(query) {
    if (typeof root.switchGuidebookChapter === 'function') root.switchGuidebookChapter('chapter-planner');
    if (typeof root.goToBookPage === 'function') root.goToBookPage('chapter-planner', 3, false);
    root.setTimeout(() => {
      const doc = root.document;
      const section = doc && doc.getElementById(ID);
      if (!section) return;
      section.scrollIntoView({ behavior:'smooth', block:'start' });
      const input = section.querySelector('.fuc-search');
      if (input && query) { input.value = query; activeFilter = 'all'; filterUffiziCatalog(); input.focus({ preventScroll:true }); }
    }, 220);
  }
  function openRecord(id) {
    openCatalog();
    root.setTimeout(() => {
      const doc = root.document;
      const card = doc && doc.querySelector(`#${ID} [data-record-id="${String(id).replace(/[^a-z0-9_-]/gi,'')}"]`);
      if (card) { card.open = true; card.scrollIntoView({ behavior:'smooth', block:'start' }); }
    }, 320);
  }
  root.openUffiziCatalog = openCatalog;
  root.openUffiziRecord = openRecord;

  function norm(value) {
    return String(value || '').toLocaleLowerCase().normalize('NFKC').replace(/[“”‘’'".,:;!?()[\]{}]/g,' ').replace(/\s+/g,' ').trim();
  }
  function matchingRecord(query) {
    const q = norm(query);
    if (!q) return null;
    const idMatch = q.match(/100034\d{4}/);
    if (idMatch) {
      const digits = idMatch[0];
      return DATA.records.find(record => record.files.some(file => file.startsWith(digits))) || null;
    }
    for (const record of DATA.records) {
      for (const lang of LANGS) {
        const title = norm(record.title[lang]);
        if (title.length >= 7 && q.includes(title)) return record;
      }
    }
    // Require the museum name to avoid hijacking broad artist/topic questions.
    const hasUffizi = /uffizi|우피치|ウフィツィ|乌菲兹|烏菲茲/.test(q);
    if (hasUffizi) {
      for (const record of DATA.records) {
        if (record.artist && norm(record.artist).length > 4 && q.includes(norm(record.artist))) return record;
      }
    }
    return null;
  }
  function answer(query) {
    const lang = currentLang();
    const t = DATA.languages[lang];
    const q = String(query || '').trim();
    const record = matchingRecord(q);
    if (record) {
      const title = esc(record.title[lang]);
      const description = esc(record.description[lang]);
      const excerpt = description.length > 360 ? `${description.slice(0,357)}…` : description;
      const status = record.status === 'identified' ? t.identifiedTag : t.pendingTag;
      const sources = record.sources.slice(0,2).map(source => `<a href="${esc(source.url)}" target="_blank" rel="noopener noreferrer">${esc(source.name)} ↗</a>`).join(' · ');
      return `<div class="fuc-chat-answer"><strong>${title}</strong><small>${esc(status)}</small><p>${excerpt}</p>${sources ? `<div class="fuc-chat-sources">${sources}</div>` : ''}<button type="button" class="chat-quick-chip" onclick="openUffiziRecord('${esc(record.id)}')">${esc(t.open)} ↗</button></div>`;
    }
    const catalogIntent = /my uffizi photos|uffizi photo|uffizi upload|find works in my photos|우피치.*(사진|업로드|작품 찾아|내 사진)|사진.*우피치|乌菲兹.*(照片|上传)|照片.*乌菲兹|ウフィツィ.*(写真|アップロード)|写真.*ウフィツィ/i.test(q);
    if (catalogIntent) {
      return `<div class="fuc-chat-answer"><strong>${esc(t.ask)}</strong><p>${esc(t.intro)}</p><button type="button" class="chat-quick-chip" onclick="openUffiziCatalog()">${esc(t.open)} ↗</button></div>`;
    }
    return null;
  }

  function mount() {
    const doc = root.document;
    if (!doc || typeof doc.getElementById !== 'function' || !doc.body) return;
    const planner = doc.getElementById('chapter-planner');
    const anchor = doc.getElementById('florence-guide-library') || doc.getElementById('florence-duomo-visit-guide');
    if (!planner || !anchor) return;
    const lang = currentLang();
    let section = doc.getElementById(ID);
    if (!section) {
      const holder = doc.createElement('div');
      holder.innerHTML = render(lang);
      section = holder.firstElementChild;
      anchor.insertAdjacentElement('afterend', section);
      lastLang = lang;
    } else if (lastLang !== lang) {
      section.outerHTML = render(lang);
      section = doc.getElementById(ID);
      lastLang = lang;
    } else if (section.previousElementSibling !== anchor) {
      anchor.insertAdjacentElement('afterend', section);
    }
  }
  function scheduleUpdate() {
    if (scheduled) return;
    scheduled = true;
    const run = () => { scheduled = false; mount(); };
    if (typeof root.requestAnimationFrame === 'function') root.requestAnimationFrame(run);
    else root.setTimeout(run, 0);
  }
  function init() {
    const doc = root.document;
    if (!doc || !doc.body || typeof doc.getElementById !== 'function') return;
    const planner = doc.getElementById('chapter-planner');
    if (root.MutationObserver && planner) {
      const observer = new root.MutationObserver(scheduleUpdate);
      observer.observe(planner, { childList:true, subtree:true });
      const languageObserver = new root.MutationObserver(scheduleUpdate);
      languageObserver.observe(doc.documentElement, { attributes:true, attributeFilter:['lang'] });
    }
    mount();
  }
  if (typeof root.switchLanguage === 'function') {
    const originalSwitchLanguage = root.switchLanguage;
    root.switchLanguage = function () { const result = originalSwitchLanguage.apply(this, arguments); scheduleUpdate(); return result; };
  }
  if (typeof root.handleLocalChat === 'function') {
    const originalHandleLocalChat = root.handleLocalChat;
    root.handleLocalChat = function (query) { return answer(query) || originalHandleLocalChat.apply(this, arguments); };
  }
  const prompts = {
    ko:{q:'내 우피치 사진 속 작품 찾기',text:'🖼️ 우피치 사진 속 작품'},
    en:{q:'Find works in my Uffizi photos',text:'🖼️ My Uffizi photos'},
    zh:{q:'查找我上传的乌菲兹照片中的作品',text:'🖼️ 乌菲兹照片'},
    ja:{q:'アップロードしたウフィツィ写真から作品を探す',text:'🖼️ ウフィツィ写真'}
  };
  const chips = root.CHATBOT_I18N;
  if (chips) LANGS.forEach(lang => {
    const dict = chips[lang];
    if (dict && Array.isArray(dict.chips) && !dict.chips.some(chip => chip.q === prompts[lang].q)) dict.chips.push(prompts[lang]);
  });
  if (typeof root.updateChatbotLanguage === 'function') root.updateChatbotLanguage(currentLang());
  root.FLORENCE_UFFIZI_CATALOG = { render, answer, matchingRecord, openCatalog, openRecord, filter:filterUffiziCatalog, data:DATA };
  if (root.document && root.document.readyState === 'loading') root.document.addEventListener('DOMContentLoaded', init, { once:true });
  else init();
})(window);
