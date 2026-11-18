(function () {
  'use strict';

  const DATA = window.EUROPE_ACTIVITY_GUIDE_DATA;
  if (!DATA || !Array.isArray(DATA.entries)) return;

  const LANGS = ['ko', 'en', 'ja', 'zh'];
  const COPY = {
    ko: {
      sectionTitle: '유럽 전역 체험형 액티비티',
      sectionIntro: '플래너가 다루는 51개 국가·지역의 후보를 검토해 48곳에서 활동 아이디어 52건을 골랐습니다. 활동 강도와 이동 조건은 서로 다르므로 평지·무장애·저강도라고 가정하지 말고 카드의 주의점을 확인하세요.',
      filterPlaceholder: '국가, 도시 또는 체험 검색', countLabel: '{count}개 활동 · {countries}개 지역 · 여행경보로 추천 제외 {blocked}곳',
      emptyFilterMessage: '일치하는 활동이 없습니다. 국가나 도시 이름을 바꿔 검색해 보세요.',
      chatChip: '유럽 체험 활동 살펴보기',
      chatQuery: '유럽 전역 체험형 액티비티 아이디어와 이동·보행 주의점을 알려줘',
      searchPreset: '유럽 체험 활동의 공식 정보와 정확한 예약 상품명 확인',
      statusLabel: '출처 확인된 아이디어 · 예약·운행 미확정',
      noRecommendationTitle: '여가 활동 추천 제외',
      verifiedActivityLabel: '활동 아이디어',
      noAvailabilityNotice: '특정 날짜의 운행·영업, 가격, 재고, 예약 가능 여부는 확인하지 않았습니다. 방문 전 공식 운영자에게 최신 일정과 승선·계단·보행 조건을 확인하세요.',
      sourcesLabel: '출처', officialLabel: '공식 정보', bookingLabel: '확인된 제3자 상품명',
      bookingUnavailable: '동일 활동의 정확한 제3자 예약 상품은 확인되지 않았습니다.', careLabel: '이동·보행 참고',
      extraOfficialLabel: '추가 공식 출처', advisoryLabel: '공식 여행 안내', openGuide: '전체 유럽 활동 목록 열기'
    },
    en: {
      sectionTitle: 'Hands-on activities across Europe',
      sectionIntro: 'We selected 52 activity ideas across 48 of the planner’s 51 covered countries and regions. Activities vary in effort and access; do not assume a route is flat, step-free, or low-effort—check each card’s notes.',
      filterPlaceholder: 'Search by country, city, or activity', countLabel: '{count} activities · {countries} countries/regions · {blocked} omitted on travel-advice grounds',
      emptyFilterMessage: 'No matching activities. Try another country or city name.',
      chatChip: 'Explore activities across Europe',
      chatQuery: 'Show me hands-on activity ideas across Europe and note walking and access considerations',
      searchPreset: 'Find official information and exact booking names for European activities',
      statusLabel: 'Sourced ideas · no booking or date confirmed',
      noRecommendationTitle: 'No leisure recommendation shown',
      verifiedActivityLabel: 'activity idea',
      noAvailabilityNotice: 'Operation on a particular date, prices, inventory, and booking availability were not checked. Before visiting, confirm current schedules and boarding, stair, and walking conditions with the official operator.',
      sourcesLabel: 'Sources', officialLabel: 'Official information', bookingLabel: 'Verified third-party listing',
      bookingUnavailable: 'No exact third-party booking listing for this same activity was verified.', careLabel: 'Walking and access notes',
      extraOfficialLabel: 'Additional official source', advisoryLabel: 'Official travel advice', openGuide: 'Open the full Europe activity list'
    },
    ja: {
      sectionTitle: 'ヨーロッパ各地の体験型アクティビティ',
      sectionIntro: 'プランナー対象の51か国・地域を確認し、48か所で52件の体験案を選びました。運動量や移動条件はそれぞれ異なります。平坦・段差なし・低負荷とは限らないため、各カードの注意点をご確認ください。',
      filterPlaceholder: '国・都市・体験を検索', countLabel: '{count}件の体験案 · {countries}か国・地域 · 旅行情報を理由に{blocked}か所は掲載なし',
      emptyFilterMessage: '一致する体験がありません。国名や都市名を変えてお試しください。',
      chatChip: 'ヨーロッパ各地の体験を探す',
      chatQuery: 'ヨーロッパ各地の体験型アクティビティ案と、歩行・移動上の注意点を教えてください',
      searchPreset: 'ヨーロッパ体験の公式情報と予約商品の正確な名称を検索',
      statusLabel: '出典確認済みの候補 · 予約・日程未確認',
      noRecommendationTitle: 'レジャー活動のおすすめを掲載していません',
      verifiedActivityLabel: '体験案',
      noAvailabilityNotice: '特定日の運航・営業、料金、在庫、予約可否は確認していません。訪問前に公式運営者へ最新日程と乗船・階段・歩行条件を確認してください。',
      sourcesLabel: '出典', officialLabel: '公式情報', bookingLabel: '確認済みの第三者掲載名',
      bookingUnavailable: '同一アクティビティの正確な第三者予約掲載は確認できていません。', careLabel: '歩行・移動の注意',
      extraOfficialLabel: '追加の公式情報', advisoryLabel: '公式渡航情報', openGuide: 'ヨーロッパ全体の一覧を開く'
    },
    zh: {
      sectionTitle: '欧洲各地的体验式活动',
      sectionIntro: '我们核对了规划器覆盖的51个国家和地区，并为其中48个地区选出52项活动建议。活动强度和通行条件各不相同；不要默认路线平坦、无台阶或轻松，请查看每张卡片的注意事项。',
      filterPlaceholder: '按国家、城市或活动搜索', countLabel: '{count}项活动 · {countries}个国家/地区 · 因旅行提示未推荐{blocked}处',
      emptyFilterMessage: '没有匹配的活动。请尝试其他国家或城市名称。',
      chatChip: '查看欧洲各地体验活动',
      chatQuery: '请介绍欧洲各地的体验式活动，并说明步行和通行注意事项',
      searchPreset: '搜索欧洲活动的官方信息和准确预订商品名称',
      statusLabel: '已核对来源的活动建议 · 未确认预订或日期',
      noRecommendationTitle: '未列出休闲活动建议',
      verifiedActivityLabel: '项活动建议',
      noAvailabilityNotice: '未核实特定日期的运营、价格、余量或预订情况。出行前请向官方运营方确认最新时间，以及登船、台阶和步行条件。',
      sourcesLabel: '来源', officialLabel: '官方信息', bookingLabel: '已核实的第三方商品名称',
      bookingUnavailable: '未核实到与此活动完全对应的第三方预订商品。', careLabel: '步行与通行提示',
      extraOfficialLabel: '其他官方来源', advisoryLabel: '官方旅行提示', openGuide: '打开欧洲活动完整列表'
    }
  };

  function locale(lang) { return LANGS.includes(lang) ? lang : 'ko'; }
  function esc(value) {
    return String(value == null ? '' : value).replace(/[&<>"']/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));
  }
  function text(value, lang) {
    if (typeof value === 'string') return value;
    if (value && typeof value === 'object') return value[lang] || value.en || value.ko || '';
    return '';
  }
  function ui(key, lang) {
    const l = locale(lang);
    const source = DATA.ui && (DATA.ui[l] || DATA.ui.en) || {};
    const candidate = source[key] || DATA[key] && text(DATA[key], l) || '';
    return candidate || COPY[l][key] || COPY.ko[key] || '';
  }
  function countryName(row, lang) {
    return text(row.country_names || row.countryNames, locale(lang)) || row.country || row.country_id || '';
  }
  function getNoRecommendations() {
    return DATA.no_recommendation || DATA.noRecommendation || DATA.no_recommendations || [];
  }
  function safeUrl(url) {
    return /^https?:\/\//i.test(String(url || '')) ? String(url) : '';
  }
  function urlLink(url, label) {
    const href = safeUrl(url);
    if (!href) return '';
    return `<a href="${esc(href)}" target="_blank" rel="noopener noreferrer">${esc(label)} ↗</a>`;
  }
  function uniqueUrls(row) {
    const values = [];
    [row.official_url, row.officialUrl, ...(row.official_urls || row.officialUrls || [])].forEach(url => {
      const safe = safeUrl(url);
      if (safe && !values.includes(safe)) values.push(safe);
    });
    return values;
  }
  function bookingTitle(row) { return row.exact_booking_title || row.exactBookingTitle || ''; }
  function bookingUrl(row) { return row.booking_url || row.bookingUrl || ''; }
  function location(row, lang) { return text(row.location || row.city || row.city_or_region, locale(lang)); }
  function cardTitle(row, lang) { return text(row.title || row.display_title || row.displayTitle || row.activity_name || row.activity_name_en, locale(lang)); }
  function cardCategory(row, lang) { return text(row.category || row.activity_type || row.activity_type_en, locale(lang)); }
  function cardSummary(row, lang) { return text(row.summary || row.highlight || row.description, locale(lang)); }
  function cardCare(row, lang) { return text(row.care || row.mobility || row.effort_and_mobility, locale(lang)); }
  function sourceLinks(row, lang) {
    const links = [];
    uniqueUrls(row).forEach((url, index) => links.push(urlLink(url, index === 0 ? ui('officialLabel', lang) : ui('extraOfficialLabel', lang))));
    if (bookingTitle(row) && safeUrl(bookingUrl(row))) links.push(urlLink(bookingUrl(row), `${ui('bookingLabel', lang)}: ${bookingTitle(row)}`));
    return links.filter(Boolean);
  }
  function renderEntryCard(row, lang) {
    const sources = sourceLinks(row, lang).join('');
    const booking = bookingTitle(row) && safeUrl(bookingUrl(row)) ? '' : `<span class="europe-activity-booking-note">${esc(ui('bookingUnavailable', lang))}</span>`;
    const operator = row.operator ? `<span class="europe-activity-operator">${esc(row.operator)}</span>` : '';
    const place = [countryName(row, lang), location(row, lang)].filter(Boolean).join(' · ');
    return `<article class="activity-card europe-activity-card" data-europe-result="activity">
      <span class="activity-city">${esc(place)}</span>
      <span class="activity-badge">${esc(cardCategory(row, lang))}</span>
      <h3>${esc(cardTitle(row, lang))}</h3>
      ${operator ? `<p class="europe-activity-operator-line">${operator}</p>` : ''}
      <p class="activity-summary">${esc(cardSummary(row, lang))}</p>
      <div class="activity-care"><strong>${esc(ui('careLabel', lang))}</strong><p>${esc(cardCare(row, lang))}</p></div>
      <div class="europe-activity-sources" aria-label="${esc(ui('sourcesLabel', lang))}">${sources}${booking}</div>
    </article>`;
  }
  function advisoryUrls(row) {
    const list = row.advisory_urls || row.official_advisory_urls || row.advisoryUrls || [];
    return Array.isArray(list) ? list : [];
  }
  function noRecommendationReason(row, lang) {
    return text(row.reason || row.status || row.status_en, locale(lang)) || COPY[locale(lang)].noRecommendationTitle;
  }
  function renderNoRecommendationCard(row, lang) {
    const links = advisoryUrls(row).map(url => urlLink(url, ui('advisoryLabel', lang))).filter(Boolean).join('');
    return `<article class="activity-card europe-activity-card europe-activity-norec" data-europe-result="advice">
      <span class="activity-city">${esc(countryName(row, lang))}</span>
      <h3>${esc(ui('noRecommendationTitle', lang))}</h3>
      <p class="activity-summary">${esc(noRecommendationReason(row, lang))}</p>
      <div class="europe-activity-sources" aria-label="${esc(ui('sourcesLabel', lang))}">${links}</div>
    </article>`;
  }
  function groupRows(lang) {
    const groups = new Map();
    (DATA.entries || []).forEach(row => {
      const id = row.country_id || row.country_id_en || row.id;
      if (!groups.has(id)) groups.set(id, { id, name: countryName(row, lang), entries: [], noRec: null });
      const group = groups.get(id);
      group.entries.push(row);
      group.searchFields = (group.searchFields || []).concat(LANGS.flatMap(code => [countryName(row, code), location(row, code), cardTitle(row, code), cardCategory(row, code), cardSummary(row, code)]));
    });
    getNoRecommendations().forEach(row => {
      const id = row.country_id || row.id;
      if (!groups.has(id)) groups.set(id, { id, name: countryName(row, lang), entries: [], noRec: row, searchFields: [] });
      const group = groups.get(id);
      group.noRec = row;
      group.name = countryName(row, lang);
      group.searchFields = (group.searchFields || []).concat(LANGS.flatMap(code => [countryName(row, code), noRecommendationReason(row, code)]));
    });
    return Array.from(groups.values()).sort((a, b) => String(a.name).localeCompare(String(b.name), lang));
  }
  function makeCountryGroup(group, lang) {
    const countText = group.noRec ? ui('noRecommendationTitle', lang) : activityCount(group.entries.length, lang);
    const contents = group.noRec ? renderNoRecommendationCard(group.noRec, lang) : group.entries.map(row => renderEntryCard(row, lang)).join('');
    const search = (group.searchFields || []).join(' ');
    return `<details class="europe-activity-country" data-europe-country="${esc(group.id)}" data-search="${esc(search)}">
      <summary><span class="europe-activity-country-name">${esc(group.name)}</span><span class="europe-activity-country-meta">${esc(countText)}</span></summary>
      <div class="europe-activity-country-body"><div class="europe-activity-cards">${contents}</div></div>
    </details>`;
  }
  function activityCount(count, lang) {
    const l = locale(lang);
    if (l === 'ko') return `${count}개 활동`;
    if (l === 'ja') return `${count}件の体験案`;
    if (l === 'zh') return `${count}项活动`;
    return `${count} ${count === 1 ? 'activity' : 'activities'}`;
  }
  function countText(visibleGroups, lang) {
    const entries = visibleGroups.reduce((sum, group) => sum + group.entries.length, 0);
    const blocked = visibleGroups.filter(group => group.noRec).length;
    const l = locale(lang);
    const candidate = ui('countLabel', l);
    const template = /\{(?:count|countries|blocked|notRecommended)\}/.test(candidate) ? candidate : COPY[l].countLabel;
    return template.replace(/\{count\}/g, String(entries)).replace(/\{countries\}/g, String(visibleGroups.length)).replace(/\{blocked\}/g, String(blocked)).replace(/\{notRecommended\}/g, String(blocked));
  }
  function filterDirectory(root, query, lang, groups) {
    if (!root) return;
    const q = normalize(query);
    let visible = [];
    root.querySelectorAll('[data-europe-country]').forEach(node => {
      const hit = !q || normalize(node.dataset.search || '').includes(q);
      node.hidden = !hit;
      if (hit) {
        const group = groups.find(item => item.id === node.dataset.europeCountry);
        if (group) visible.push(group);
        if (q) node.open = true;
      } else node.open = false;
    });
    const counter = root.querySelector('.europe-activity-count');
    if (counter) counter.textContent = countText(visible, lang);
    const empty = root.querySelector('.europe-activity-empty');
    if (empty) empty.hidden = Boolean(visible.length);
  }
  function renderEuropeActivityGuide(lang) {
    const l = locale(lang || window.currentLang || document.documentElement.lang || 'ko');
    const mount = document.getElementById('activity-guide-mount');
    const guide = mount && mount.querySelector('.activity-guide');
    if (!guide) return false;
    const previous = guide.querySelector('#europe-activity-directory');
    if (previous) previous.remove();
    const groups = groupRows(l);
    const directory = `<section class="europe-activity-directory" id="europe-activity-directory" aria-labelledby="europe-activity-directory-title">
      <h2 id="europe-activity-directory-title">${esc(ui('sectionTitle', l))}</h2>
      <p class="europe-activity-intro">${esc(ui('sectionIntro', l))}</p>
      <p class="europe-activity-intro">${esc(ui('noAvailabilityNotice', l))}</p>
      <div class="europe-activity-controls"><input id="europe-activity-filter" class="europe-activity-filter" type="search" autocomplete="off" placeholder="${esc(ui('filterPlaceholder', l))}" aria-label="${esc(ui('filterPlaceholder', l))}"><span class="europe-activity-count" aria-live="polite">${esc(countText(groups, l))}</span></div>
      <div class="europe-activity-countries">${groups.map(group => makeCountryGroup(group, l)).join('')}</div>
      <p class="europe-activity-empty" hidden>${esc(ui('emptyFilterMessage', l))}</p>
    </section>`;
    guide.insertAdjacentHTML('beforeend', directory);
    const root = guide.querySelector('#europe-activity-directory');
    const input = root && root.querySelector('#europe-activity-filter');
    if (input) input.addEventListener('input', () => filterDirectory(root, input.value, l, groups));
    return true;
  }

  function normalize(value) {
    return String(value || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').normalize('NFC').replace(/[‐‑–—]/g, '-');
  }
  const ACTIVITY_TERMS = [
    'activity', 'activities', 'experience', 'experiences', 'tour', 'tours', 'things to do', 'what to do', 'recommend', 'suggest', 'workshop', 'class', 'cruise', 'boat', 'ride', 'sightseeing',
    '체험', '액티비티', '활동', '투어', '체험형', '추천', '공방', '클래스', '수업', '유람선', '보트', '즐길', '할 거리',
    '体験', 'アクティビティ', 'ツアー', 'クルーズ', 'ボート', '体験型', 'おすすめ', '工房', '料理教室', '観光', '体験案',
    '体验', '活动', '旅游', '旅行', '游船', '工作坊', '课程', '推荐', '做什么', '观光', '手作'
  ].map(normalize);
  const NARROW_TERMS = [
    'boat', 'cruise', 'rowing', 'row', 'workshop', 'craft', 'cooking', 'baking', 'wine', 'sauna', 'walk', 'hike', 'bike', 'e-bike', 'golf cart', 'pottery', 'glass', 'ceramic', 'cable car', 'chairlift', 'train', 'museum', 'concert', 'ferry', 'food', 'boat ride',
    '보트', '배', '유람선', '조정', '공예', '쿠킹', '요리', '와인', '사우나', '걷기', '하이킹', '자전거', '골프카트', '도자기', '유리공예', '케이블카', '의자식 리프트', '기차', '박물관', '공연', '음식',
    'ボート', '船', 'クルーズ', 'ボート漕ぎ', '工芸', '料理', 'ワイン', 'サウナ', '散歩', 'ハイキング', '自転車', 'ゴルフカート', '陶芸', 'ガラス', 'ケーブルカー', 'リフト', '列車', '博物館', 'コンサート', '食事',
    '游船', '划船', '手工', '烹饪', '做饭', '葡萄酒', '桑拿', '步行', '徒步', '骑行', '高尔夫球车', '陶艺', '玻璃', '缆车', '吊椅', '火车', '博物馆', '音乐会', '美食'
  ].map(normalize);
  const EUROPE_TERMS = ['europe', 'european', '유럽', 'ヨーロッパ', '欧洲'];
  const RECOMMEND_TERMS = ['recommend', 'suggest', '추천', 'おすすめ', '推荐'];
  const DIRECT_STOPWORDS = new Set([...ACTIVITY_TERMS, ...NARROW_TERMS, 'the', 'and', 'of', 'with', 'from', 'in', 'to', 'for', 'a', 'an', 'guided', 'traditional', 'classic', 'scenic', 'return', 'ticket', 'visit', 'city', 'route', 'supervised', '체험', '활동', '추천', '에서', '하는', '만들기', '주변', '観光', '体験', 'の', 'は', 'が', 'を', 'に', 'で', 'と', '体验', '活动', '推荐'].map(normalize));
  function rowLocaleText(row, lang) {
    return LANGS.flatMap(code => [countryName(row, code), location(row, code), cardTitle(row, code), cardCategory(row, code), cardSummary(row, code)]).concat([bookingTitle(row), row.operator || '']).map(normalize).join(' ');
  }
  function countryHits(query, lang) {
    const rows = [...(DATA.entries || []), ...getNoRecommendations()];
    const hits = new Set();
    rows.forEach(row => {
      const names = LANGS.map(code => normalize(countryName(row, code))).filter(Boolean);
      if (names.some(name => query.includes(name))) hits.add(row.country_id || row.id);
    });
    return hits;
  }
  function directNameHits(query, lang) {
    let remainder = normalize(query);
    [...DIRECT_STOPWORDS].sort((a, b) => b.length - a.length).forEach(term => {
      if (term.length >= 2) remainder = remainder.split(term).join(' ');
    });
    remainder = remainder.replace(/[のはがをにでとへも]/g, ' ');
    const tokens = new Set((remainder.match(/[a-z0-9]{3,}/g) || []));
    (remainder.match(/[\u3040-\u30ff\u3400-\u9fff\uac00-\ud7a3]{2,}/g) || []).forEach(run => {
      for (let size = 3; size <= Math.min(8, run.length); size++) {
        for (let start = 0; start + size <= run.length; start++) tokens.add(run.slice(start, start + size));
      }
    });
    return (DATA.entries || []).filter(row => {
      const candidates = LANGS.flatMap(code => [cardTitle(row, code), location(row, code)]).concat([bookingTitle(row), row.operator || '']).map(normalize).filter(Boolean);
      return candidates.some(name => name.length >= 8 && query.includes(name)) || [...tokens].some(token => !DIRECT_STOPWORDS.has(token) && candidates.some(name => name.includes(token)));
    });
  }
  function linksForChat(row, lang) {
    const source = sourceLinks(row, lang);
    return source.length ? `<div class="activity-chat-sources">${source.join('')}</div>` : '';
  }
  function chatEntry(row, lang) {
    const place = [countryName(row, lang), location(row, lang)].filter(Boolean).join(' · ');
    return `<section class="europe-activity-chat-card"><h4>${esc(cardTitle(row, lang))}</h4><p><strong>${esc(place)}</strong> · ${esc(cardCategory(row, lang))}</p><p>${esc(cardSummary(row, lang))}</p><p><strong>${esc(ui('careLabel', lang))}:</strong> ${esc(cardCare(row, lang))}</p>${linksForChat(row, lang)}</section>`;
  }
  function chatNoRecommendation(row, lang) {
    const links = advisoryUrls(row).map(url => urlLink(url, ui('advisoryLabel', lang))).filter(Boolean).join('');
    return `<section class="europe-activity-chat-card"><h4>${esc(countryName(row, lang))} · ${esc(ui('noRecommendationTitle', lang))}</h4><p>${esc(noRecommendationReason(row, lang))}</p><div class="activity-chat-sources">${links}</div></section>`;
  }
  function openGuideButton(lang) {
    return `<button type="button" class="chat-quick-chip" onclick="if(typeof goToActivityGuide==='function'){goToActivityGuide()}else{switchGuidebookChapter('chapter-practical');goToBookPage('chapter-practical',5)}">${esc(ui('openGuide', lang))}</button>`;
  }
  function buildEuropeActivityResponse(query, lang) {
    const l = locale(lang), q = normalize(query);
    if (!q) return null;
    const countryIds = countryHits(q, l);
    const noRec = getNoRecommendations().filter(row => countryIds.has(row.country_id || row.id));
    const named = directNameHits(q, l);
    const narrow = NARROW_TERMS.some(term => q.includes(term));
    const hasActivity = ACTIVITY_TERMS.some(term => q.includes(term));

    if (noRec.length && (hasActivity || narrow || named.length)) {
      const body = noRec.map(row => chatNoRecommendation(row, l)).join('');
      return `<div class="activity-chat-answer" data-europe-activity-answer="${l}"><strong>${esc(ui('statusLabel', l))}</strong><p class="activity-chat-status">${esc(ui('noAvailabilityNotice', l))}</p>${body}${openGuideButton(l)}</div>`;
    }

    if (named.length) {
      const body = named.slice(0, 4).map(row => chatEntry(row, l)).join('');
      return `<div class="activity-chat-answer" data-europe-activity-answer="${l}"><strong>${esc(ui('statusLabel', l))}</strong><p class="activity-chat-status">${esc(ui('noAvailabilityNotice', l))}</p>${body}${openGuideButton(l)}</div>`;
    }

    if (countryIds.size && hasActivity) {
      const allForCountry = (DATA.entries || []).filter(row => countryIds.has(row.country_id));
      if (narrow) {
        const matched = allForCountry.filter(row => NARROW_TERMS.some(term => q.includes(term) && rowLocaleText(row, l).includes(term)));
        if (!matched.length) return null;
        const body = matched.slice(0, 4).map(row => chatEntry(row, l)).join('');
        return `<div class="activity-chat-answer" data-europe-activity-answer="${l}"><strong>${esc(ui('statusLabel', l))}</strong><p class="activity-chat-status">${esc(ui('noAvailabilityNotice', l))}</p>${body}${openGuideButton(l)}</div>`;
      }
      const body = allForCountry.slice(0, 4).map(row => chatEntry(row, l)).join('');
      return `<div class="activity-chat-answer" data-europe-activity-answer="${l}"><strong>${esc(ui('statusLabel', l))}</strong><p class="activity-chat-status">${esc(ui('noAvailabilityNotice', l))}</p>${body}${openGuideButton(l)}</div>`;
    }

    const mentionsEurope = EUROPE_TERMS.some(term => q.includes(normalize(term)));
    const wantsSuggestions = hasActivity || RECOMMEND_TERMS.some(term => q.includes(normalize(term)));
    if (mentionsEurope && wantsSuggestions) {
      const examples = ['albania-1', 'belgium-1', 'italy-3'].map(id => (DATA.entries || []).find(row => row.id === id)).filter(Boolean);
      const body = examples.map(row => chatEntry(row, l)).join('');
      return `<div class="activity-chat-answer" data-europe-activity-answer="${l}"><strong>${esc(ui('statusLabel', l))}</strong><p class="activity-chat-status">${esc(ui('sectionIntro', l))}</p>${body}<p class="activity-chat-anchors">${esc(ui('noAvailabilityNotice', l))}</p>${openGuideButton(l)}</div>`;
    }
    return null;
  }

  const activityChatBase = window.buildActivityChatResponse;
  window.buildActivityChatResponse = function (query, lang) {
    return buildEuropeActivityResponse(query, lang) || (typeof activityChatBase === 'function' ? activityChatBase(query, lang) : null);
  };

  const activityGuideBase = window.renderActivityGuide;
  if (typeof activityGuideBase === 'function') {
    window.renderActivityGuide = function (lang) {
      const result = activityGuideBase(lang);
      renderEuropeActivityGuide(lang || window.currentLang || document.documentElement.lang || 'ko');
      return result;
    };
  }
  document.addEventListener('DOMContentLoaded', () => {
    window.setTimeout(() => {
      if (!document.getElementById('europe-activity-directory') && typeof window.renderActivityGuide === 'function') {
        window.renderActivityGuide(window.currentLang || document.documentElement.lang || 'ko');
      }
    }, 0);
  });

  LANGS.forEach(lang => {
    const l = locale(lang);
    const copy = COPY[l];
    if (typeof CHATBOT_I18N !== 'undefined' && CHATBOT_I18N[l]) {
      const dict = CHATBOT_I18N[l];
      const query = ui('chatQuery', l);
      if (Array.isArray(dict.chips) && !dict.chips.some(chip => chip.q === query)) dict.chips.unshift({ text: ui('chatChip', l), q: query });
      const topic = { ko: '유럽 체험 활동', en: 'Europe activities', ja: 'ヨーロッパの体験', zh: '欧洲体验活动' }[l];
      if (!dict.title.includes(topic)) dict.title = `${dict.title} · ${topic}`;
      const welcomeNote = `<p>${esc(ui('noAvailabilityNotice', l))}</p>`;
      if (!dict.welcome.includes(welcomeNote)) dict.welcome += welcomeNote;
    }
    try {
      if (typeof AI_PRESETS_I18N !== 'undefined' && Array.isArray(AI_PRESETS_I18N[l]) && !AI_PRESETS_I18N[l].includes(ui('searchPreset', l))) {
        AI_PRESETS_I18N[l].push(ui('searchPreset', l));
      }
    } catch (e) { /* Search presets are optional in isolated test contexts. */ }
  });

  window.EUROPE_ACTIVITY_GUIDE = {
    data: DATA,
    render: renderEuropeActivityGuide,
    filter: filterDirectory,
    respond: buildEuropeActivityResponse
  };
})();
