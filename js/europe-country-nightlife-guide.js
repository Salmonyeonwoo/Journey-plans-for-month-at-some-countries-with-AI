/* Europe country guide renderer and local-chat integration.
 * Content is supplied by js/europe-country-nightlife-data.js; no network/API call is made.
 */
(function (root) {
  'use strict';

  const LANGS = ['ko', 'en', 'ja', 'zh'];
  const LABELS = {
    ko: {
      kicker: 'EUROPE · COUNTRY GUIDE', title: '유럽 국가별 명소 · 먹거리 · 야경',
      intro: '유럽과 경계 지역 51개국에서 고른 대표 예시입니다. 국가나 도시를 검색하거나 관심 주제로 좁혀 보세요.',
      scope: '이 목록은 각 나라의 대표 후보를 담은 편집 가이드이며 모든 명소·식당의 완전 목록은 아닙니다. 영업·운영시간·가격·예약·교통·안전은 실시간 확인이 아닙니다. 방문 전 공식 안내를 확인하세요. 언덕·계단·자갈길 등은 현장별로 다르며 접근성이나 안전을 보장하지 않습니다.',
      searchLabel: '국가·도시·장소 검색', searchPlaceholder: '예: 프랑스, Paris, 야경, 현지 음식',
      filtersLabel: '주제 선택', all: '모두', sights: '명소', food: '먹거리·식당', night: '야경',
      count: (countries, items) => `${countries}개국 · ${items}개 추천 항목`,
      countryCount: n => `${n}개국`, city: '대표 도시', source: '출처', sources: '공식·참고 출처',
      itemCount: n => `${n}개 항목`, terrain: '보행·접근 참고', dish: '대표 음식', venue: '식당 후보',
      foodIntroTitle: '지역 미식 안내', foodGuideNote: '지역 음식과 식당은 조사한 후보입니다. 현재 메뉴·영업·예약 가능 여부는 방문 전 공식 채널에서 확인하세요. 어떤 곳도 예약하지 않았습니다.',
      foodPrompt: '유럽 각 나라와 도시의 대표 음식과 현지 식당 후보를 추천해줘', foodChip: '🍽️ 유럽 현지 음식·식당 후보',
      nightWalkChip: '🌙 나폴리 밤 산책·야경',
      searchEmpty: '검색어에 맞는 국가가 없습니다.', noData: '아직 표시할 국가별 자료가 없습니다.',
      expand: '모두 펼치기', collapse: '모두 접기', sourceMissing: '이 항목의 출처 링크를 확인할 수 없습니다.',
      chatbotTitle: '유럽 국가별 추천 가이드', chatbotQuery: '유럽 각 나라의 대표 명소, 현지 음식과 야경을 나라별로 추천해줘',
      chatbotPrompt: '유럽 국가별 명소·먹거리·야경 가이드',
      chatbotIntro: '챕터 4의 「파노라마 야경」 페이지에서 51개 국가별 추천을 검색할 수 있습니다. 이 자료는 대표 후보이며 운영·안전·접근성을 실시간 보증하지 않습니다.',
      catLandmark: '명소', catFood: '먹거리', catNight: '야경',
      broadLabel: '유럽 전역의 대표 예시입니다. 보편적인 순위가 아닙니다.',
      openGuide: '유럽 국가별 가이드 열기'
    },
    en: {
      kicker: 'EUROPE · COUNTRY GUIDE', title: 'European sights · local food · night views',
      intro: 'Representative picks from 51 European and border-region countries. Search a country or city, or filter by interest.',
      scope: 'An editorial selection of representative ideas, not an exhaustive list of every sight or restaurant. Current opening status, hours, prices, reservations, transport and safety are not checked live. Verify official information before visiting. Hills, stairs and cobbles vary by site; accessibility and safety are not guaranteed.',
      searchLabel: 'Search countries, cities or places', searchPlaceholder: 'e.g. France, Paris, night view, local food',
      filtersLabel: 'Filter by topic', all: 'All', sights: 'Sights', food: 'Food & dining', night: 'Night views',
      count: (countries, items) => `${countries} countries · ${items} picks`,
      countryCount: n => `${n} countries`, city: 'Featured city', source: 'Source', sources: 'Official & reference sources',
      itemCount: n => `${n} picks`, terrain: 'Walking & access note', dish: 'Local specialty', venue: 'Dining candidate',
      foodIntroTitle: 'Local food guide', foodGuideNote: 'Food and restaurant entries are researched candidates. Verify current menus, operations and booking availability with official channels before visiting. Nothing has been booked.',
      foodPrompt: 'Recommend local dishes and dining candidates across European countries and cities', foodChip: '🍽️ European food & dining candidates',
      nightWalkChip: '🌙 Naples evening walk & night views',
      searchEmpty: 'No countries match that search.', noData: 'No country data is available yet.',
      expand: 'Expand all', collapse: 'Collapse all', sourceMissing: 'No source link is available for this item.',
      chatbotTitle: 'European country guide', chatbotQuery: 'Recommend representative sights, local food, and night views by European country',
      chatbotPrompt: 'European country guide to sights, food and night views',
      chatbotIntro: 'Search the 51-country directory on Chapter 4, “Panoramic Night Views.” These are representative ideas, not live guarantees of operations, safety, or accessibility.',
      catLandmark: 'Sight', catFood: 'Food', catNight: 'Night view',
      broadLabel: 'Examples from across Europe; not a universal ranking.',
      openGuide: 'Open the Europe country guide'
    },
    ja: {
      kicker: 'EUROPE · COUNTRY GUIDE', title: 'ヨーロッパ各国の名所・郷土料理・夜景',
      intro: 'ヨーロッパおよび周辺地域51か国から選んだ代表例です。国・都市名で検索するか、テーマで絞り込めます。',
      scope: '各国の代表的な候補を集めた編集ガイドで、すべての名所・飲食店を網羅するものではありません。営業状況・営業時間・料金・予約・交通・安全情報はリアルタイム確認ではありません。訪問前に公式情報をご確認ください。坂道・階段・石畳の状況は場所により異なり、アクセシビリティや安全を保証しません。',
      searchLabel: '国・都市・場所を検索', searchPlaceholder: '例：フランス、パリ、夜景、郷土料理',
      filtersLabel: 'テーマで絞り込む', all: 'すべて', sights: '名所', food: '郷土料理・飲食店', night: '夜景',
      count: (countries, items) => `${countries}か国 · ${items}件`,
      countryCount: n => `${n}か国`, city: '代表都市', source: '出典', sources: '公式・参考資料',
      itemCount: n => `${n}件`, terrain: '徒歩・アクセスの注意', dish: '郷土料理', venue: '飲食店候補',
      foodIntroTitle: '郷土料理ガイド', foodGuideNote: '料理と飲食店は調査した候補です。訪問前に現行メニュー・営業状況・予約の可否を公式窓口でご確認ください。予約はしていません。',
      foodPrompt: 'ヨーロッパ各国・各都市の郷土料理と飲食店候補を教えて', foodChip: '🍽️ ヨーロッパ郷土料理・飲食店候補',
      nightWalkChip: '🌙 ナポリの夜散歩・夜景',
      searchEmpty: '検索に一致する国はありません。', noData: '国別データはまだありません。',
      expand: 'すべて展開', collapse: 'すべて閉じる', sourceMissing: 'この項目の出典リンクを確認できません。',
      chatbotTitle: 'ヨーロッパ各国ガイド', chatbotQuery: 'ヨーロッパ各国の代表的な名所、郷土料理、夜景を国別に教えて',
      chatbotPrompt: 'ヨーロッパ各国の名所・郷土料理・夜景ガイド',
      chatbotIntro: '第4章「パノラマ夜景」の51か国ディレクトリを検索できます。代表例であり、営業・安全・アクセスをリアルタイムで保証するものではありません。',
      catLandmark: '名所', catFood: '料理', catNight: '夜景',
      broadLabel: 'ヨーロッパ各地の例です。絶対的なランキングではありません。',
      openGuide: 'ヨーロッパ各国ガイドを開く'
    },
    zh: {
      kicker: 'EUROPE · COUNTRY GUIDE', title: '欧洲各国景点 · 地方美食 · 夜景',
      intro: '精选欧洲及周边地区51个国家的代表性推荐。可搜索国家或城市，也可按主题筛选。',
      scope: '这是各国代表性建议的编辑精选，并非所有景点和餐厅的完整清单。营业状态、开放时间、价格、预约、交通与安全情况均未实时核实。出行前请查看官方信息。坡道、台阶和石板路因地点而异；不保证无障碍条件或安全。',
      searchLabel: '搜索国家、城市或地点', searchPlaceholder: '例如：法国、巴黎、夜景、地方美食',
      filtersLabel: '按主题筛选', all: '全部', sights: '景点', food: '美食与餐饮', night: '夜景',
      count: (countries, items) => `${countries}个国家 · ${items}项推荐`,
      countryCount: n => `${n}个国家`, city: '代表城市', source: '来源', sources: '官方与参考来源',
      itemCount: n => `${n}项`, terrain: '步行与通行提示', dish: '地方特色菜', venue: '餐厅候选',
      foodIntroTitle: '地方美食指南', foodGuideNote: '地方菜和餐厅均为经资料核对的候选建议。到访前请通过官方渠道确认最新菜单、营业状态和预订情况；未替您预订任何餐厅。',
      foodPrompt: '请推荐欧洲各国和城市的地方菜及当地餐厅候选', foodChip: '🍽️ 欧洲地方菜与餐厅候选',
      nightWalkChip: '🌙 那不勒斯夜间漫步与夜景',
      searchEmpty: '没有符合搜索条件的国家。', noData: '目前没有国家资料。',
      expand: '全部展开', collapse: '全部收起', sourceMissing: '无法确认此条目的来源链接。',
      chatbotTitle: '欧洲各国指南', chatbotQuery: '请按国家推荐欧洲各国的代表景点、地方美食和夜景',
      chatbotPrompt: '欧洲各国景点、美食与夜景指南',
      chatbotIntro: '可在第4章“全景夜景”页面搜索51国目录。内容为代表性建议，并非实时营业、安全或无障碍保证。',
      catLandmark: '景点', catFood: '美食', catNight: '夜景',
      broadLabel: '以下为欧洲各地的代表性示例，不是绝对排名。',
      openGuide: '打开欧洲各国指南'
    }
  };

  const state = { query: '', category: 'all', openIds: new Set() };
  const DATA = Array.isArray(root.EUROPE_COUNTRY_GUIDE_DATA) ? root.EUROPE_COUNTRY_GUIDE_DATA : [];
  const HOME_SHORTCUT_LABELS = {
    ko: { kicker: 'EUROPE · QUICK ACCESS', title: '기존 유럽 가이드 바로가기', intro: '새 목적지 내용을 만들지 않고, 플래너에 이미 있는 가이드로 이동합니다.', cities: '도시 바로가기', regions: '지역 가이드', countries: n => `🌍 국가·인접 지역 가이드 전체 보기 (${n})`, countryNote: '국가별 추천 자료가 있는 기존 디렉터리로 이동합니다.', rome: '🇮🇹 로마 · 도시 가이드', florence: '🇮🇹 피렌체 · 도시 가이드', venice: '🇮🇹 베네치아 · 도시 가이드', naples: '🇮🇹 나폴리·카프리 · 도시 가이드', milan: '🇮🇹 밀라노 · 두오모 지도', spain: '🇪🇸 스페인 · 지역 가이드', portugal: '🇵🇹 포르투갈 · 명소 가이드', europeMap: '🗺️ 기타 유럽 · 명소 지도' },
    en: { kicker: 'EUROPE · QUICK ACCESS', title: 'Existing Europe guides', intro: 'These shortcuts open guides already in the planner; no destination content has been invented.', cities: 'City guides', regions: 'Regional guides', countries: n => `🌍 All country & neighboring-region guides (${n})`, countryNote: 'Opens the existing country-by-country recommendation directory.', rome: '🇮🇹 Rome · city guide', florence: '🇮🇹 Florence · city guide', venice: '🇮🇹 Venice · city guide', naples: '🇮🇹 Naples & Capri · city guide', milan: '🇮🇹 Milan · Duomo map', spain: '🇪🇸 Spain · regional guide', portugal: '🇵🇹 Portugal · sights guide', europeMap: '🗺️ Other Europe · sights map' },
    ja: { kicker: 'EUROPE · QUICK ACCESS', title: '既存のヨーロッパガイド', intro: '新しい目的地情報は追加せず、プランナー内にあるガイドへ移動します。', cities: '都市ガイド', regions: '地域ガイド', countries: n => `🌍 国・周辺地域ガイドをすべて表示（${n}）`, countryNote: '既存の国別おすすめディレクトリを開きます。', rome: '🇮🇹 ローマ · 都市ガイド', florence: '🇮🇹 フィレンツェ · 都市ガイド', venice: '🇮🇹 ベネチア · 都市ガイド', naples: '🇮🇹 ナポリ・カプリ · 都市ガイド', milan: '🇮🇹 ミラノ · ドゥオーモ地図', spain: '🇪🇸 スペイン · 地域ガイド', portugal: '🇵🇹 ポルトガル · 名所ガイド', europeMap: '🗺️ その他のヨーロッパ · 名所地図' },
    zh: { kicker: 'EUROPE · QUICK ACCESS', title: '现有欧洲指南快捷入口', intro: '不编写新的目的地内容，直接打开规划器中已有的指南。', cities: '城市指南', regions: '区域指南', countries: n => `🌍 查看全部国家与周边地区指南（${n}）`, countryNote: '打开现有的逐国推荐目录。', rome: '🇮🇹 罗马 · 城市指南', florence: '🇮🇹 佛罗伦萨 · 城市指南', venice: '🇮🇹 威尼斯 · 城市指南', naples: '🇮🇹 那不勒斯与卡普里 · 城市指南', milan: '🇮🇹 米兰 · 大教堂地图', spain: '🇪🇸 西班牙 · 区域指南', portugal: '🇵🇹 葡萄牙 · 景点指南', europeMap: '🗺️ 欧洲其他地区 · 景点地图' }
  };
  const text = (value, lang, fallback = '') => {
    if (value && typeof value === 'object') return String(value[lang] || value.ko || value.en || fallback || '');
    return String(value == null ? fallback : value);
  };
  const esc = value => String(value == null ? '' : value).replace(/[&<>"']/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));
  const normalize = value => String(value || '').toLowerCase().normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '').normalize('NFC').replace(/[^a-z0-9\u3040-\u30ff\u3400-\u9fff\uac00-\ud7af]+/g, ' ').trim().replace(/\s+/g, ' ');
  const locale = () => LANGS.includes(root.currentLang) ? root.currentLang : (LANGS.includes(document.documentElement.lang) ? document.documentElement.lang : 'ko');
  function openItalyShortcut(cityId) {
    if (!['rome', 'florence', 'venice', 'capri'].includes(cityId)) return;
    root.switchGuidebookChapter?.('chapter-guide', false);
    root.goToBookPage?.('chapter-guide', 0, false);
    window.setTimeout(() => {
      root.selectItalyCity?.(cityId);
      document.getElementById('italyCityNavBar')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 160);
  }
  function openRegionShortcut(regionId) {
    const pages = { spain: 1, portugal: 2 };
    if (!(regionId in pages)) return;
    root.switchGuidebookChapter?.('chapter-guide', false);
    root.goToBookPage?.('chapter-guide', pages[regionId], false);
    window.setTimeout(() => {
      const targetId = regionId === 'spain' ? 'landmarksSpainGrid' : 'landmarksPortugalGrid';
      document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 160);
  }
  function openEuropeMapShortcut(filter) {
    if (!['EUROPE', 'MILAN'].includes(filter)) return;
    root.switchGuidebookChapter?.('chapter-guide', false);
    root.goToBookPage?.('chapter-guide', 4, false);
    window.setTimeout(() => {
      root.filterBigLandmarksMap?.(filter);
      document.getElementById('landmarksBigMapContainer')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 260);
  }
  function openEuropeanCountryShortcut(countryId) {
    if (!DATA.some(country => country.country_id === countryId)) return;
    state.query = '';
    state.category = 'all';
    state.openIds = new Set([countryId]);
    render(locale());
    root.switchGuidebookChapter?.('chapter-festivals', false);
    root.goToBookPage?.('chapter-festivals', 2, false);
    window.setTimeout(() => {
      const country = document.querySelector(`#ecgResults [data-country="${countryId}"]`);
      if (country) {
        country.open = true;
        country.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 180);
  }
  function renderHomeShortcuts(langValue) {
    const lang = LANGS.includes(langValue) ? langValue : locale();
    const label = HOME_SHORTCUT_LABELS[lang] || HOME_SHORTCUT_LABELS.ko;
    const mount = document.getElementById('homeEuropeGuideShortcutsMount');
    if (!mount) return;
    const countries = DATA.filter(country => country.country_id && /^[a-z0-9-]+$/.test(country.country_id));
    const countryButtons = countries.map(country => `<button type="button" class="egh-chip egh-country-chip" data-home-action="country" data-target="${esc(country.country_id)}">${esc(text(country.country_name, lang, country.country_id))}</button>`).join('');
    mount.innerHTML = `<section class="egh-card" aria-labelledby="eghTitle">
      <div class="egh-heading"><p class="egh-kicker">${esc(label.kicker)}</p><h2 id="eghTitle">${esc(label.title)}</h2><p>${esc(label.intro)}</p></div>
      <div class="egh-group"><h3>${esc(label.cities)}</h3><div class="egh-chip-row">
        <button type="button" class="egh-chip" data-home-action="italy" data-target="rome">${esc(label.rome)}</button>
        <button type="button" class="egh-chip" data-home-action="italy" data-target="florence">${esc(label.florence)}</button>
        <button type="button" class="egh-chip" data-home-action="italy" data-target="venice">${esc(label.venice)}</button>
        <button type="button" class="egh-chip" data-home-action="italy" data-target="capri">${esc(label.naples)}</button>
        <button type="button" class="egh-chip" data-home-action="map" data-target="MILAN">${esc(label.milan)}</button>
      </div></div>
      <div class="egh-group"><h3>${esc(label.regions)}</h3><div class="egh-chip-row">
        <button type="button" class="egh-chip egh-chip-region" data-home-action="region" data-target="spain">${esc(label.spain)}</button>
        <button type="button" class="egh-chip egh-chip-region" data-home-action="region" data-target="portugal">${esc(label.portugal)}</button>
        <button type="button" class="egh-chip egh-chip-map" data-home-action="map" data-target="EUROPE">${esc(label.europeMap)}</button>
      </div></div>
      <details class="egh-countries"><summary>${esc(label.countries(countries.length))}</summary><p>${esc(label.countryNote)}</p><div class="egh-country-grid">${countryButtons}</div></details>
    </section>`;
    mount.querySelectorAll('[data-home-action]').forEach(button => button.addEventListener('click', () => {
      const { homeAction, target } = button.dataset;
      if (homeAction === 'country') openEuropeanCountryShortcut(target);
      else if (homeAction === 'italy') openItalyShortcut(target);
      else if (homeAction === 'region') openRegionShortcut(target);
      else if (homeAction === 'map') openEuropeMapShortcut(target);
    }));
  }
  const countryItems = country => {
    const items = (country.landmarks || []).map((item, index) => ({ ...item, city: item.city || country.featured_city, id: `${country.country_id}-sight-${index + 1}`, category: 'sight', label: 'catLandmark' }));
    const foodGuide = country.local_food && country.local_food.food_guide;
    const guideVenueNames = new Set();
    if (foodGuide && Array.isArray(foodGuide.cities)) {
      foodGuide.cities.forEach((cityGuide, cityIndex) => {
        const city = cityGuide.city || country.featured_city;
        (cityGuide.dishes || []).forEach((dish, index) => items.push({
          id: `${country.country_id}-food-dish-${cityIndex + 1}-${index + 1}`, category: 'food', label: 'dish', foodKind: 'dish', city,
          names: dish.name, description: dish.note,
          sources: (dish.source_urls || []).map(url => ({ url, title: (() => { try { return new URL(url).hostname.replace(/^www\\./, ''); } catch (_) { return url; } })() }))
        }));
        (cityGuide.venues || []).forEach((venue, index) => {
          const names = { en: venue.name, ko: venue.name, ja: venue.name, zh: venue.name };
          guideVenueNames.add(normalize(venue.name));
          const description = Object.fromEntries(LANGS.map(lang => [lang, [venue.area, text(venue.why_candidate, lang), text(venue.focus, lang)].filter(Boolean).join(' · ')]));
          const urls = [...new Set([venue.official_url, ...(venue.source_urls || [])].filter(Boolean))];
          items.push({
            id: `${country.country_id}-food-venue-${cityIndex + 1}-${index + 1}`, category: 'food', label: 'venue', foodKind: 'venue', city,
            names, description,
            sources: urls.map(url => ({ url, title: (() => { try { return new URL(url).hostname.replace(/^www\\./, ''); } catch (_) { return url; } })() }))
          });
        });
      });
    }
    if (country.local_food && country.local_food.venue && !foodGuideVenueDuplicate(country, guideVenueNames)) {
      items.push({ ...country.local_food.venue, city: country.local_food.venue.city || country.featured_city, id: `${country.country_id}-food`, category: 'food', label: 'catFood', dish: country.local_food.dish });
    }
    const nightViews = [...(country.night_view ? [country.night_view] : []), ...(country.additional_night_views || [])];
    nightViews.forEach((item, index) => items.push({ ...item, city: item.city || country.featured_city, id: `${country.country_id}-night-${index + 1}`, category: 'night', label: 'catNight' }));
    return items;
  };
  function foodGuideVenueDuplicate(country, guideVenueNames) {
    if (country.country_id === 'vatican-city' && country.local_food && country.local_food.food_guide) return true;
    const legacyName = normalize(text(country.local_food && country.local_food.venue && country.local_food.venue.names, 'en'));
    return legacyName && [...guideVenueNames].some(name => name === legacyName || name.startsWith(`${legacyName} `) || legacyName.startsWith(`${name} `));
  }
  const categories = lang => LABELS[lang];
  function itemSearchText(country, item, lang) {
    const pieces = [country.country_id, ...Object.values(country.country_name || {}), ...Object.values(country.featured_city || {}), ...Object.values(item.city || {}),
      ...Object.values(item.names || {}), ...Object.values(item.description || {}), ...Object.values(item.mobilityNote || {}),
      ...Object.values(item.dish || {}), ...(country.aliases || [])];
    return normalize(pieces.join(' '));
  }
  function matches(country, lang) {
    const items = countryItems(country).filter(item => state.category === 'all' || item.category === state.category);
    if (!state.query) return items.length > 0;
    const q = normalize(state.query);
    const countryText = normalize([country.country_id, ...Object.values(country.country_name || {}), ...Object.values(country.featured_city || {}), ...(country.aliases || [])].join(' '));
    const ignored = new Set(['night', 'nights', 'view', 'views', 'food', 'restaurant', 'restaurants', 'dining', 'recommend', 'recommendations', 'best', 'top', '야경', '전망', '명소', '맛집', '음식', '식당', '추천', '夜景', '展望', '名所', '料理', 'グルメ', 'おすすめ', '夜晚', '景点', '美食', '餐厅', '推荐']);
    const terms = q.split(' ').filter(term => term && !ignored.has(term));
    const includesTerms = value => terms.length > 0 && terms.every(term => value.includes(term));
    return countryText.includes(q) || includesTerms(countryText) || items.some(item => {
      const searchable = itemSearchText(country, item, lang);
      return searchable.includes(q) || includesTerms(searchable);
    });
  }
  function getSourceLinks(sources, lang, label) {
    const links = (Array.isArray(sources) ? sources : []).filter(source => source && /^https:\/\//i.test(source.url || ''));
    if (!links.length) return `<p class="ecg-source-missing">${esc(label.sourceMissing)}</p>`;
    return `<div class="ecg-sources"><span>${esc(label.sources)}:</span>${links.map(source => `<a href="${esc(source.url)}" target="_blank" rel="noopener noreferrer">${esc(source.title || label.source)} ↗</a>`).join('')}</div>`;
  }
  function renderPhoto(item, className = 'ecg-photo', langValue) {
    if (!item.image) return '';
    const sourceUrl = /^https:\/\//i.test(item.image_source_url || '') ? item.image_source_url : '';
    const licenseUrl = /^https:\/\//i.test(item.image_license_url || '') ? item.image_license_url : '';
    const lang = LANGS.includes(langValue) ? langValue : locale();
    const caption = esc(text(item.image_caption, lang));
    const title = esc(item.image_title || 'Image source');
    const credit = esc(item.image_credit || 'Image credit');
    const license = esc(item.image_license || 'License');
    return `<figure class="${esc(className)}"><img loading="lazy" decoding="async" src="${esc(item.image)}" alt="${esc(text(item.image_alt, lang))}"><figcaption>${caption}<br>${sourceUrl ? `<a href="${esc(sourceUrl)}" target="_blank" rel="noopener noreferrer">${title}</a>` : title} · ${sourceUrl ? `<a href="${esc(sourceUrl)}" target="_blank" rel="noopener noreferrer">Credit: ${credit}</a>` : `Credit: ${credit}`} · ${licenseUrl ? `<a href="${esc(licenseUrl)}" target="_blank" rel="noopener noreferrer">${license}</a>` : license}</figcaption></figure>`;
  }
  function renderItem(item, country, lang, label) {
    const heading = item.category === 'food'
      ? (item.foodKind ? esc(text(item.names, lang)) : `${esc(text(item.dish, lang, label.dish))} · ${esc(text(item.names, lang))}`)
      : esc(text(item.names, lang));
    const body = esc(text(item.description, lang));
    const note = esc(text(item.mobilityNote, lang));
    const itemCity = text(item.city, lang);
    const featuredCity = text(country.featured_city, lang);
    const cityNote = itemCity && normalize(itemCity) !== normalize(featuredCity) ? `<p class="ecg-item-city">${esc(itemCity)}</p>` : '';
    return `<article class="ecg-item ecg-item-${esc(item.category)}${item.foodKind ? ` ecg-item-${esc(item.foodKind)}` : ''}"><div class="ecg-item-heading"><span class="ecg-category ecg-category-${esc(item.foodKind || item.category)}">${esc(label[item.label])}</span><h4>${heading}</h4></div>${renderPhoto(item, 'ecg-photo', lang)}${cityNote}<p>${body}</p>${note ? `<p class="ecg-mobility"><strong>${esc(label.terrain)}:</strong> ${note}</p>` : ''}${getSourceLinks(item.sources, lang, label)}</article>`;
  }
  function renderCountry(country, lang, label) {
    const allItems = countryItems(country);
    const query = normalize(state.query);
    const cityItems = query ? allItems.filter(item => Object.values(item.city || {}).map(normalize).includes(query)) : [];
    const items = (cityItems.length ? cityItems : allItems).filter(item => state.category === 'all' || item.category === state.category);
    const countryName = text(country.country_name, lang, country.country_id);
    const cityName = text(country.featured_city, lang);
    const isOpen = state.openIds.has(country.country_id) || (state.query && matches(country, lang));
    const visibleFoodCities = [...new Set(items.filter(item => item.category === 'food').map(item => normalize(text(item.city, lang))))];
    const foodGuides = country.local_food && country.local_food.food_guide && Array.isArray(country.local_food.food_guide.cities) ? country.local_food.food_guide.cities : [];
    const intros = state.category !== 'sight' && state.category !== 'night' ? foodGuides.filter(cityGuide => visibleFoodCities.includes(normalize(text(cityGuide.city, lang)))).map(cityGuide => `<div class="ecg-food-intro"><strong>${esc(text(cityGuide.city, lang))} · ${esc(label.foodIntroTitle)}</strong><p>${esc(text(cityGuide.intro, lang))}</p>${getSourceLinks(cityGuide.sources, lang, label)}</div>`).join('') : '';
    const foodNotice = foodGuides.length && state.category !== 'sight' && state.category !== 'night' ? `<p class="ecg-food-note">${esc(label.foodGuideNote)}</p>` : '';
    return `<details class="ecg-country" data-country="${esc(country.country_id)}" ${isOpen ? 'open' : ''}><summary><span class="ecg-country-name">${esc(countryName)}</span><span class="ecg-country-city">${esc(label.city)}: ${esc(cityName)}</span><span class="ecg-country-count">${esc(label.itemCount(items.length))}</span></summary><div class="ecg-country-body">${foodNotice}${intros}${items.map(item => renderItem(item, country, lang, label)).join('')}${country.editorial_note ? `<p class="ecg-editorial-note">${esc(text(country.editorial_note, lang))}</p>` : ''}</div></details>`;
  }
  function renderResults(lang) {
    const label = categories(lang);
    const result = document.getElementById('ecgResults');
    const count = document.getElementById('ecgResultCount');
    if (!result || !count) return;
    const found = DATA.filter(country => matches(country, lang));
    const totalItems = found.reduce((sum, country) => sum + countryItems(country).filter(item => state.category === 'all' || item.category === state.category).length, 0);
    count.textContent = label.count(found.length, totalItems);
    result.innerHTML = found.length ? found.map(country => renderCountry(country, lang, label)).join('') : `<p class="ecg-empty">${esc(DATA.length ? label.searchEmpty : label.noData)}</p>`;
    result.querySelectorAll('.ecg-country').forEach(details => {
      details.addEventListener('toggle', () => {
        if (details.open) state.openIds.add(details.dataset.country);
        else state.openIds.delete(details.dataset.country);
      });
    });
  }
  function render(langValue) {
    const lang = LANGS.includes(langValue) ? langValue : locale();
    const label = categories(lang);
    const mount = document.getElementById('europeCountryNightlifeMount');
    if (!mount) return;
    const chips = [['all', label.all], ['sight', label.sights], ['food', label.food], ['night', label.night]];
    mount.innerHTML = `<section class="ecg-guide" aria-labelledby="ecgTitle"><div class="ecg-header"><p class="ecg-kicker">${esc(label.kicker)}</p><h2 id="ecgTitle">🌍 ${esc(label.title)}</h2><p class="ecg-intro">${esc(label.intro)}</p><p class="ecg-scope">${esc(label.scope)}</p></div><div class="ecg-controls"><label class="ecg-search-label" for="ecgSearch">${esc(label.searchLabel)}</label><input id="ecgSearch" type="search" value="${esc(state.query)}" placeholder="${esc(label.searchPlaceholder)}" autocomplete="off"><div class="ecg-filter-row" role="group" aria-label="${esc(label.filtersLabel)}">${chips.map(([key, value]) => `<button type="button" class="ecg-filter${state.category === key ? ' active' : ''}" data-filter="${esc(key)}" aria-pressed="${state.category === key}">${esc(value)}</button>`).join('')}<button type="button" class="ecg-expand" id="ecgExpandAll">${esc(label.expand)}</button></div><p id="ecgResultCount" class="ecg-result-count" aria-live="polite"></p></div><div id="ecgResults" class="ecg-results"></div></section>`;
    const search = document.getElementById('ecgSearch');
    search.addEventListener('input', () => { state.query = search.value; renderResults(lang); });
    mount.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => {
      state.category = button.dataset.filter;
      mount.querySelectorAll('[data-filter]').forEach(chip => { const active = chip === button; chip.classList.toggle('active', active); chip.setAttribute('aria-pressed', String(active)); });
      renderResults(lang);
      const expand = document.getElementById('ecgExpandAll');
      if (expand) expand.textContent = label.expand;
    }));
    const expand = document.getElementById('ecgExpandAll');
    expand.addEventListener('click', () => {
      const details = [...document.querySelectorAll('#ecgResults .ecg-country')];
      const shouldExpand = details.some(item => !item.open);
      details.forEach(item => { item.open = shouldExpand; if (shouldExpand) state.openIds.add(item.dataset.country); else state.openIds.delete(item.dataset.country); });
      expand.textContent = shouldExpand ? label.collapse : label.expand;
    });
    renderResults(lang);
    renderHomeShortcuts(lang);
  }

  function categoryFromQuery(query) {
    const q = String(query || '').toLowerCase();
    if (/(night ?view|nightscape|night ?walk|night ?guide|evening walk|after dark|skyline|야경|밤 ?산책|야간 ?산책|전망|노을|뷰포인트|夜景|夜景スポット|夜の景色|夜の散歩|夜晚|夜间漫步|夜间散步|观景|夜色)/i.test(q)) return 'night';
    if (/(restaurant|dining|food|dish|cuisine|맛집|음식|식당|먹거리|먹을|美食|餐厅|餐館|食物|菜品|郷土料理|料理|グルメ|レストラン|食事)/i.test(q)) return 'food';
    if (/(landmark|attraction|sight|what to see|명소|관광지|볼거리|유적|景点|景區|名所|観光|見どころ)/i.test(q)) return 'sight';
    return 'all';
  }
  function createChatResponse(query, langValue) {
    const lang = LANGS.includes(langValue) ? langValue : locale();
    const label = categories(lang);
    const q = normalize(query);
    const naplesNightPlaceIntent = /(castel dell ovo|egg castle|lungomare|via partenope|san martino|certosa|산 마르티노|카스텔 델로보|나폴리.*산책|サン マルティーノ|卵城|圣马蒂诺|蛋堡|海滨大道)/i.test(q);
    const naplesArtTransitIntent = /(toledo.*duomo|duomo.*toledo|톨레도.*두오모|두오모.*톨레도|トレド.*ドゥオーモ|ドゥオーモ.*トレド|托莱多.*主教座堂|主教座堂.*托莱多|metro art|art station|地下鉄.*芸術|지하철.*아트|地铁.*艺术)/i.test(q);
    const requestedCategory = categoryFromQuery(query);
    const category = requestedCategory === 'all' && naplesNightPlaceIntent ? 'night' : requestedCategory;
    const countryMatch = DATA.find(country => {
      const names = [...Object.values(country.country_name || {}), ...Object.values(country.featured_city || {}), ...(country.aliases || []), ...countryItems(country).flatMap(item => Object.values(item.city || {}))].map(normalize).filter(v => v.length > 2);
      return names.some(name => q.includes(name));
    });
    const placeMatch = DATA.find(country => countryItems(country).some(item => [...Object.values(item.names || {}), ...Object.values(item.city || {})].map(normalize).some(name => {
      const cjk = /[\u3040-\u30ff\u3400-\u9fff\uac00-\ud7af]/.test(name);
      return name.length > (cjk ? 1 : 3) && q.includes(name);
    })));
    const naplesCityNightQuery = category === 'night' && countryMatch && countryMatch.country_id === 'italy' && Object.values(countryMatch.featured_city || {}).map(normalize).some(name => name && q.includes(name));
    const naplesTargetedGuideIntent = naplesNightPlaceIntent || naplesArtTransitIntent || naplesCityNightQuery;
    const detected = countryMatch || placeMatch || (naplesTargetedGuideIntent ? DATA.find(country => country.country_id === 'italy') : null);
    const guideIntent = category !== 'all' || /(recommend|suggest|best|top|famous|popular|where to eat|what to see|guide|추천|추천해|유명|대표|알려줘|볼거리|가이드|おすすめ|有名|教えて|見どころ|ガイド|推荐|著名|有哪些|指南)/i.test(String(query || ''));
    const mentionsEurope = /(europe|european|유럽|유럽의|ヨーロッパ|欧洲|歐洲)/i.test(String(query || ''));
    const transportIntent = /(how to get|travel from|route|train|flight|bus|transport|transfer|가는 법|이동|교통|노선|기차|열차|버스|항공|電車|移動|交通|路線|火车|铁路|大巴|航班|路线)/i.test(String(query || ''));
    if (transportIntent && category === 'all' && !naplesArtTransitIntent) return null;
    if (detected && !placeMatch && ['spain', 'italy'].includes(normalize(detected.country_name?.en || detected.country_id)) && !(category === 'food' && normalize(detected.country_id) === 'italy') && !naplesTargetedGuideIntent) return null;
    if (!guideIntent && !placeMatch && !naplesArtTransitIntent) return null;
    if (!detected && !mentionsEurope) return null;
    let countries = detected ? [detected] : DATA;
    if (!detected) {
      const featuredIds = ['france', 'italy', 'hungary', 'czechia', 'spain'];
      const featured = featuredIds.map(id => DATA.find(country => country.country_id === id)).filter(Boolean);
      countries = featured.length ? featured : DATA;
    }
    const picked = countries.map(country => {
      const allItems = countryItems(country);
      const nightTerms = q.split(' ').filter(term => term.length > 2 && !/^(at|the|and|night|nightscape|nightview|views|view|guide|walk|evening|after|dark|best|recommend|naples|city)$/.test(term));
      const explicitNightItems = allItems.filter(item => item.category === 'night' && nightTerms.length > 0 && nightTerms.every(term => itemSearchText(country, item, lang).includes(term)));
      const citySpecificItems = allItems.filter(item => Object.values(item.city || {}).map(normalize).some(name => {
        const cjk = /[\u3040-\u30ff\u3400-\u9fff\uac00-\ud7af]/.test(name);
        return name.length > (cjk ? 1 : 2) && q.includes(name);
      }));
      const candidates = naplesArtTransitIntent && country.country_id === 'italy'
        ? allItems.filter(item => item.category === 'night' && /toledo/i.test(text(item.names, 'en')) && /duomo/i.test(text(item.names, 'en')))
        : explicitNightItems.length ? explicitNightItems : citySpecificItems.length ? citySpecificItems : allItems;
      let entries;
      if (naplesArtTransitIntent && country.country_id === 'italy') {
        entries = candidates.slice(0, 1);
      } else if (country.country_id === 'italy' && category === 'food') {
        const foodCities = (country.local_food && country.local_food.food_guide && country.local_food.food_guide.cities) || [];
        const requestedCities = foodCities.filter(cityGuide => Object.values(cityGuide.city || {}).map(normalize).some(name => {
          const cjk = /[\u3040-\u30ff\u3400-\u9fff\uac00-\ud7af]/.test(name);
          return name.length > (cjk ? 1 : 2) && q.includes(name);
        }));
        const explicitFoodItems = allItems.filter(item => item.category === 'food' && Object.values(item.names || {}).map(normalize).some(name => name.length > 3 && q.includes(name)));
        entries = [];
        const selectedCities = requestedCities.length || explicitFoodItems.length || citySpecificItems.length ? requestedCities : foodCities;
        if (explicitFoodItems.length && !requestedCities.length) entries = explicitFoodItems.slice(0, 4);
        else selectedCities.forEach(cityGuide => {
          const cityKey = normalize(text(cityGuide.city, lang));
          const cityFood = allItems.filter(item => item.category === 'food' && normalize(text(item.city, lang)) === cityKey);
          const dish = cityFood.find(item => item.foodKind === 'dish');
          const venue = cityFood.find(item => item.foodKind === 'venue');
          if (dish) entries.push(dish);
          if (venue) entries.push(venue);
        });
        if (!entries.length) entries = candidates.filter(item => item.category === 'food').slice(0, 4);
      } else {
        const naplesCityMention = Object.values(country.featured_city || {}).map(normalize).some(name => name && q.includes(name));
        const limit = category === 'night' && country.country_id === 'italy' && (naplesCityMention || naplesNightPlaceIntent) ? 8 : category === 'all' ? 4 : category === 'food' ? 4 : 2;
        entries = candidates.filter(item => category === 'all' || item.category === category).slice(0, limit);
      }
      return { country, entries };
    }).filter(row => row.entries.length).slice(0, detected ? 1 : 5);
    if (!picked.length) return null;
    const countryCards = picked.map(({ country, entries }) => {
      const entryCities = [...new Set(entries.map(item => text(item.city, lang)).filter(Boolean))];
      const headerCity = entryCities.length === 1 ? entryCities[0] : text(country.featured_city, lang);
      return `<section class="ecg-chat-country"><strong>${esc(text(country.country_name, lang))} · ${esc(headerCity)}</strong>${entries.map(item => {
      const heading = item.category !== 'food' || item.foodKind ? text(item.names, lang) : `${text(item.dish, lang, label.dish)} · ${text(item.names, lang)}`;
      const itemCity = text(item.city, lang);
      const cityNote = itemCity && normalize(itemCity) !== normalize(headerCity) ? `<small>${esc(itemCity)}</small><br>` : '';
      const kind = label[item.label];
      const links = (item.sources || []).filter(source => /^https:\/\//i.test(source.url || '')).map(source => `<a href="${esc(source.url)}" target="_blank" rel="noopener noreferrer">${esc(source.title || label.source)} ↗</a>`).join(' ');
      return `<p>${cityNote}<b>${esc(kind)}: ${esc(heading)}</b><br>${esc(text(item.description, lang))}${item.mobilityNote ? `<br><i>${esc(text(item.mobilityNote, lang))}</i>` : ''}${links ? `<br>${links}` : ''}</p>${renderPhoto(item, 'ecg-chat-photo', lang)}`;
      }).join('')}</section>`;
    }).join('');
    const ui = label.chatbotIntro;
    const notice = lang === 'en' ? 'Representative picks only; verify current operations, access, transport and local safety before a visit.' : lang === 'ja' ? '代表例です。訪問前に営業状況・アクセス・交通・現地の安全情報をご確認ください。' : lang === 'zh' ? '仅为代表性推荐；出行前请核实营业、通行、交通与当地安全信息。' : '대표 후보입니다. 방문 전 운영·접근·교통·현지 안전 정보를 확인하세요.';
    const broad = detected ? '' : `<p class="ecg-chat-note">${esc(label.broadLabel)}</p>`;
    return `<div class="ecg-chat-answer"><p>${esc(ui)}</p>${broad}${countryCards}<p class="ecg-chat-note">${esc(notice)}</p><button type="button" onclick="if(typeof switchGuidebookChapter==='function')switchGuidebookChapter('chapter-festivals');if(typeof goToBookPage==='function')goToBookPage('chapter-festivals',2);setTimeout(()=>document.getElementById('europeCountryNightlifeMount')?.scrollIntoView({behavior:'smooth',block:'start'}),150)">${esc(label.openGuide)}</button></div>`;
  }

  function registerChatbot() {
    const labels = {
      ko: { title: '유럽 전역 · 스페인·이탈리아 여행 AI 메이트', chip: '🌍 유럽 51개국 명소·먹거리·야경', tagline: '기존 스페인·이탈리아 가족 여행 정보에 더해, 유럽·주변 51개국의 대표 지역 음식과 출처를 확인한 식당 후보, 명소·야경을 안내합니다.' },
      en: { title: 'Spain, Italy & Europe AI Travel Mate', chip: '🌍 51-country Europe guide', tagline: 'Alongside Spain and Italy family-trip information, the guide adds regional dishes and source-checked dining candidates across 51 European and neighboring countries, plus representative sights and night views.' },
      ja: { title: 'スペイン・イタリア・ヨーロッパ AIトラベルメイト', chip: '🌍 ヨーロッパ51か国ガイド', tagline: 'スペイン・イタリアの家族旅行情報に加え、ヨーロッパと周辺地域51か国の郷土料理や出典を確認した飲食店候補、名所・夜景も案内します。' },
      zh: { title: '西班牙、意大利与欧洲 AI旅行助手', chip: '🌍 欧洲51国景点·美食·夜景', tagline: '除西班牙和意大利家庭旅行信息外，指南还新增欧洲及周边51个国家的地方菜和经来源核对的餐厅候选，并介绍代表性景点与夜景。' }
    };
    const prompts = {
      ko: '유럽 각 나라의 대표 명소, 현지 음식과 야경을 나라별로 추천해줘',
      en: 'Recommend representative sights, local food, and night views by European country',
      ja: 'ヨーロッパ各国の代表的な名所、郷土料理、夜景を国別に教えて',
      zh: '请按国家推荐欧洲各国的代表景点、地方美食和夜景'
    };
    const nightWalkPrompts = {
      ko: '나폴리 밤 산책과 야경을 추천해줘',
      en: 'Naples evening walk and night views',
      ja: 'ナポリの夜散歩と夜景を教えて',
      zh: '请推荐那不勒斯夜间漫步和夜景'
    };
    if (typeof root.CHATBOT_I18N === 'object') LANGS.forEach(lang => {
      const chatbot = root.CHATBOT_I18N[lang];
      if (!chatbot) return;
      const copy = labels[lang];
      chatbot.title = copy.title;
      if (!String(chatbot.welcome || '').includes(copy.tagline)) chatbot.welcome = `${chatbot.welcome || ''}<br><br>${esc(copy.tagline)}`;
      if (Array.isArray(chatbot.chips) && !chatbot.chips.some(chip => chip.q === prompts[lang])) chatbot.chips.unshift({ text: copy.chip, q: prompts[lang] });
      if (Array.isArray(chatbot.chips) && !chatbot.chips.some(chip => chip.q === nightWalkPrompts[lang])) chatbot.chips.unshift({ text: LABELS[lang].nightWalkChip, q: nightWalkPrompts[lang] });
      const foodPrompt = LABELS[lang].foodPrompt;
      if (Array.isArray(chatbot.chips) && !chatbot.chips.some(chip => chip.q === foodPrompt)) chatbot.chips.unshift({ text: LABELS[lang].foodChip, q: foodPrompt });
    });
    const existing = root.LANDMARK_HISTORY_ENTRIES || (root.LANDMARK_HISTORY_ENTRIES = []);
    DATA.forEach(country => countryItems(country).forEach(item => {
      const id = `europe-country-${item.id}`;
      if (existing.some(entry => entry.id === id)) return;
      existing.push({
        id, kind: item.category === 'food' ? 'dining' : 'attraction', city: text(item.city || country.featured_city, 'en'),
        name: item.names, aliases: [country.country_id, ...Object.values(country.country_name || {}), ...Object.values(country.featured_city || {}), ...Object.values(item.city || {}), ...Object.values(item.names || {})],
        history: item.description, foodContext: item.category === 'food' ? item.dish : undefined,
        sources: (item.sources || []).map(source => ({ url: source.url, label: source.title })), surface: 'europe-country-guide-and-chatbot'
      });
    }));
    root.EUROPE_COUNTRY_GUIDE_AUDIT = { countryCount: DATA.length, itemCount: DATA.reduce((sum, country) => sum + countryItems(country).length, 0), languageCodes: LANGS.slice(), chatbotEntries: DATA.reduce((sum, country) => sum + countryItems(country).length, 0) };
  }

  root.renderEuropeCountryNightlifeGuide = render;
  root.openEuropeanCountryShortcut = openEuropeanCountryShortcut;
  root.openEuropeMapShortcut = openEuropeMapShortcut;
  root.renderEuropeHomeShortcuts = renderHomeShortcuts;
  root.buildEuropeCountryGuideChatResponse = createChatResponse;
  registerChatbot();
  const initialize = () => render(locale());
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initialize, { once: true });
  else initialize();
})(typeof window !== 'undefined' ? window : globalThis);
