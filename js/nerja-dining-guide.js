(function () {
  'use strict';

  var LANGS = ['ko', 'en', 'ja', 'zh'];
  var UI = {
    ko: {
      heading: '네르하 식당·카페 추천',
      intro: '업체 안내와 현지 참고 자료에서 확인한 선택형 후보입니다. 메뉴와 영업 여부는 달라질 수 있으니 방문 전에 최신 안내를 확인하세요.',
      restaurants: '식당',
      cafes: '카페·베이커리',
      location: '위치',
      mapSearch: 'Google 지도에서 검색',
      mapListing: 'Google 지도 장소',
      sources: '정보 출처',
      sourceOfficial: '공식 웹사이트',
      sourceOfficialMenu: '공식 메뉴',
      sourceOfficialAddress: '업체 주소 안내',
      sourceLocalGuide: '현지 가이드',
      sourceIndependentGuide: '독립 참고 자료',
      sourceBusinessProfile: '업체 프로필',
      sourceManagedListing: '업체 관리 등록',
      sourceListing: '업체 페이지·최근 후기',
      sourceDirectory: '현지 디렉터리',
      sourceSocial: '공식 소셜 프로필',
      sourceFallback: '참고 링크',
      losGatosTitle: 'Los Gatos · Málaga',
      sourceLinks: '관련 참고 링크'
    },
    en: {
      heading: 'Nerja restaurants & cafés',
      intro: 'A shortlist based on venue information and local references. Menus and opening status can change, so check the latest details before visiting.',
      restaurants: 'Restaurants',
      cafes: 'Cafés & bakeries',
      location: 'Location',
      mapSearch: 'Search Google Maps',
      mapListing: 'Google Maps place',
      sources: 'Sources',
      sourceOfficial: 'Official website',
      sourceOfficialMenu: 'Official menu',
      sourceOfficialAddress: 'Venue address information',
      sourceLocalGuide: 'Local guide',
      sourceIndependentGuide: 'Independent reference',
      sourceBusinessProfile: 'Business profile',
      sourceManagedListing: 'Business-managed listing',
      sourceListing: 'Venue page & recent reviews',
      sourceDirectory: 'Local directory',
      sourceSocial: 'Official social profile',
      sourceFallback: 'Reference link',
      losGatosTitle: 'Los Gatos · Málaga',
      sourceLinks: 'Related references'
    },
    ja: {
      heading: 'ネルハのレストラン・カフェ',
      intro: '店舗情報と現地の参考資料で確認した候補です。メニューや営業状況は変わるため、訪問前に最新情報をご確認ください。',
      restaurants: 'レストラン',
      cafes: 'カフェ・ベーカリー',
      location: '場所',
      mapSearch: 'Google マップで検索',
      mapListing: 'Google マップの場所',
      sources: '情報源',
      sourceOfficial: '公式サイト',
      sourceOfficialMenu: '公式メニュー',
      sourceOfficialAddress: '店舗の住所案内',
      sourceLocalGuide: '現地ガイド',
      sourceIndependentGuide: '独立した参考資料',
      sourceBusinessProfile: '店舗プロフィール',
      sourceManagedListing: '店舗管理の掲載情報',
      sourceListing: '店舗ページ・最近の口コミ',
      sourceDirectory: '現地ディレクトリ',
      sourceSocial: '公式ソーシャルプロフィール',
      sourceFallback: '参考リンク',
      losGatosTitle: 'Los Gatos · マラガ',
      sourceLinks: '関連参考リンク'
    },
    zh: {
      heading: '内尔哈餐厅与咖啡馆',
      intro: '以下候选信息来自店家介绍与当地参考资料。菜单和营业情况可能变化，请在到访前核实最新信息。',
      restaurants: '餐厅',
      cafes: '咖啡馆与面包店',
      location: '地址',
      mapSearch: '在 Google 地图中搜索',
      mapListing: 'Google 地图地点',
      sources: '信息来源',
      sourceOfficial: '官方网站',
      sourceOfficialMenu: '官方菜单',
      sourceOfficialAddress: '店家地址信息',
      sourceLocalGuide: '当地指南',
      sourceIndependentGuide: '独立参考资料',
      sourceBusinessProfile: '店家资料页',
      sourceManagedListing: '店家管理的页面',
      sourceListing: '店家页面与近期评价',
      sourceDirectory: '当地目录',
      sourceSocial: '官方社交主页',
      sourceFallback: '参考链接',
      losGatosTitle: 'Los Gatos · 马拉加',
      sourceLinks: '相关参考链接'
    }
  };

  var VENUES = [
    {
      id: 'oliva', category: 'restaurant', name: 'Restaurante Oliva',
      address: 'Plaza de España, 29780 Nerja, Málaga, Spain',
      mapQuery: 'Restaurante Oliva, Plaza de España, Nerja, Málaga',
      aliases: ['Restaurante Oliva', 'Oliva Nerja', 'Oliva restaurant Nerja', '올리바', '네르하 올리바', 'オリバ ネルハ', '奥利瓦 内尔哈'],
      summary: {
        ko: '네르하 Plaza de España의 지중해식 레스토랑입니다. 공식 메뉴는 계절에 맞춰 바뀌며 알라카르트와 테이스팅 메뉴를 안내합니다.',
        en: 'A Mediterranean restaurant at Plaza de España in Nerja. Its official menu changes seasonally and lists à-la-carte and tasting options.',
        ja: 'ネルハのPlaza de Españaにある地中海料理店です。公式メニューは季節ごとに変わり、アラカルトとテイスティングメニューが案内されています。',
        zh: '位于内尔哈 Plaza de España 的地中海餐厅。官网介绍菜单会随季节更换，并提供单点与品鉴菜单。'
      },
      sources: [
        { type: 'official', name: 'Restaurante Oliva', url: 'https://www.restauranteoliva.com/en/' },
        { type: 'officialMenu', name: 'Restaurante Oliva', url: 'http://www.restauranteoliva.com/menu.html' },
        { type: 'listing', name: 'Tripadvisor', url: 'https://www.tripadvisor.com/Restaurant_Review-g315917-d1929114-Reviews-Oliva-Nerja_Costa_del_Sol_Province_of_Malaga_Andalucia.html' }
      ]
    },
    {
      id: 'el-pulguilla', category: 'restaurant', name: 'El Pulguilla',
      address: 'Calle Almirante Ferrándiz 26, 29780 Nerja, Málaga, Spain',
      mapQuery: 'El Pulguilla, Calle Almirante Ferrándiz 26, Nerja, Málaga',
      aliases: ['El Pulguilla', 'Pulguilla Nerja', '엘 풀기야', '엘풀기야', 'エル・プルギージャ', '埃尔普尔吉利亚'],
      summary: {
        ko: '네르하 구시가지, 유럽의 발코니 인근에 있습니다. 공식 안내는 튀긴 생선을 특기로 들고 해산물·타파스·나눠 먹는 요리를 소개합니다.',
        en: 'In Nerja’s old town near the Balcón de Europa. The official site highlights fried fish, seafood, tapas and sharing portions.',
        ja: 'ネルハ旧市街、ヨーロッパのバルコニー近くにあります。公式案内では、揚げ魚、シーフード、タパス、シェア向け料理を紹介しています。',
        zh: '位于内尔哈老城区、欧洲阳台附近。官网重点介绍炸鱼、海鲜、塔帕斯和适合分享的份量。'
      },
      sources: [
        { type: 'official', name: 'El Pulguilla', url: 'https://www.elpulguilla.com/en/' },
        { type: 'officialAddress', name: 'El Pulguilla', url: 'https://www.elpulguilla.com/en/politica-de-privacidad/' },
        { type: 'localGuide', name: 'Málaga Online', url: 'https://malaga-online.com/restaurant/el-pulguilla-nerja/' }
      ]
    },
    {
      id: 'chiringuito-ayo', category: 'restaurant', name: 'Chiringuito Ayo',
      address: 'Paseo Burriana 15, 29780 Nerja, Málaga, Spain',
      mapQuery: 'Chiringuito Ayo, Paseo Burriana 15, Nerja, Málaga',
      aliases: ['Chiringuito Ayo', 'Ayo Nerja', 'Ayo Burriana', '치링기토 아요', '아요 네르하', 'チリンギート・アヨ', '阿约 Burriana'],
      summary: {
        ko: '부리아나 해변의 치링기토입니다. 공식 사이트가 장작불 빠에야, 구운 정어리와 당일 생선을 대표 메뉴로 소개합니다.',
        en: 'A beachside chiringuito at Burriana. Its official site highlights wood-fired paella, grilled sardines and the fish of the day.',
        ja: 'ブルリアナ海岸の海辺のレストランです。公式サイトでは、薪火のパエリア、イワシのグリル、その日の魚を紹介しています。',
        zh: '位于布里亚纳海滩的海滨餐厅。官网重点介绍柴火海鲜饭、烤沙丁鱼和当日鲜鱼。'
      },
      sources: [
        { type: 'official', name: 'Chiringuito Ayo', url: 'https://chiringuitoayonerja.es/en/' },
        { type: 'officialMenu', name: 'Chiringuito Ayo', url: 'https://chiringuitoayonerja.es/en/carta/' }
      ]
    },
    {
      id: 'good-stuff-cafe', category: 'cafe', name: 'Good Stuff Cafe',
      address: 'Calle Castilla Pérez 2 (unit 4), 29780 Nerja, Málaga, Spain',
      mapQuery: 'Good Stuff Cafe, Calle Castilla Pérez 2, Nerja, Málaga',
      aliases: ['Good Stuff Cafe', 'Good Stuff Café', 'Good Stuff Nerja', '굿스터프 카페', 'グッドスタッフカフェ', 'Good Stuff 内尔哈'],
      summary: {
        ko: '업체가 관리하는 등록 페이지와 현지 안내에는 조식·브런치, 수제 케이크, 키시, 샌드위치와 커피가 소개되어 있습니다.',
        en: 'The business-managed listing and local guide describe breakfast and brunch, homemade cakes, quiche, sandwiches and coffee.',
        ja: '店舗管理の掲載情報と現地ガイドでは、朝食・ブランチ、自家製ケーキ、キッシュ、サンドイッチ、コーヒーが紹介されています。',
        zh: '店家管理的页面和当地指南介绍了早餐与早午餐、自制蛋糕、咸派、三明治和咖啡。'
      },
      sources: [
        { type: 'managedListing', name: 'Tripadvisor', url: 'https://www.tripadvisor.com/Restaurant_Review-g315917-d5937584-Reviews-Good_Stuff_Cafe-Nerja_Costa_del_Sol_Province_of_Malaga_Andalucia.html' },
        { type: 'localGuide', name: 'esNerja', url: 'https://esnerja.com/en/cafes/good-stuff-cafe' },
        { type: 'independentGuide', name: 'Mapping Spain', url: 'https://mappingspain.com/why-we-love-the-good-stuff-cafe-nerja/' }
      ]
    },
    {
      id: 'cafelatte', category: 'cafe', name: 'Cafelatte',
      address: 'Calle Pintada 35, 29780 Nerja, Málaga, Spain',
      mapQuery: 'CafeLatte Coffee Shop, Calle Pintada 35, Nerja',
      aliases: ['Cafelatte', 'CafeLatte Nerja', 'Cafelatte Coffee Shop', '카페라테 네르하', 'カフェラテ ネルハ', 'Cafelatte 内尔哈'],
      summary: {
        ko: '네르하 중심가 Calle Pintada의 카페입니다. 업체 프로필은 조식·브런치와 네르하에서 로스팅한 스페셜티 커피를 소개합니다. 공식 인스타그램에는 최근 게시물이 있지만, 지도·현지 안내의 영업 표기가 엇갈려 방문 전 운영 여부를 직접 확인하세요.',
        en: 'A central Nerja café on Calle Pintada. Its profile describes breakfast, brunch and specialty coffee roasted in Nerja. A recent post appeared on its official Instagram, but map and local listings disagree on its status; confirm it is operating before going.',
        ja: 'ネルハ中心部のCalle Pintadaにあるカフェです。店舗プロフィールでは朝食・ブランチとネルハ焙煎のスペシャルティコーヒーを紹介しています。公式Instagramには最近の投稿がありますが、地図・現地案内の営業状況が一致しないため、訪問前に営業中か直接ご確認ください。',
        zh: '位于内尔哈中心 Calle Pintada 的咖啡馆。店家资料介绍早餐、早午餐和在内尔哈烘焙的精品咖啡。其官方 Instagram 有近期动态，但地图和当地指南的营业状态不一致；到访前请确认店铺仍在营业。'
      },
      sources: [
        { type: 'social', name: 'Cafelatte Instagram', url: 'https://www.instagram.com/cafelatte_coffeeshop/' },
        { type: 'localGuide', name: 'Nerja Amigos', url: 'https://www.nerjaamigos.com/gastronome/cafelatte-coffee-shop-specialty-coffee-amp-family-warmth-in-the-heart-of-nerja' },
        { type: 'official', name: 'Cafelatte', url: 'https://www.cafelatte.es/' }
      ]
    },
    {
      id: 'nybakat', category: 'cafe', name: 'Nybakat Café & Bakery',
      address: 'Camino de Burriana, Ed. Burriana Playa, local 5, 29780 Nerja, Málaga, Spain',
      mapQuery: 'Nybakat Cafe Bakery, Camino de Burriana, Nerja',
      aliases: ['Nybakat', 'Nybakat Cafe', 'Nybakat Café & Bakery', '니바카트', 'ニーバカット', 'Nybakat 内尔哈'],
      summary: {
        ko: '부리아나 해변 가까이의 노르딕 베이커리·카페입니다. 현지 가이드에는 사워도우, 스웨덴식 시나몬 번과 페이스트리, 커피가 소개되어 있습니다.',
        en: 'A Nordic bakery-café near Burriana Beach. Local guides list sourdough, Swedish cinnamon buns and pastries, and coffee.',
        ja: 'ブルリアナ海岸近くの北欧系ベーカリーカフェです。現地ガイドではサワードウ、スウェーデン風シナモンロールやペストリー、コーヒーが紹介されています。',
        zh: '靠近布里亚纳海滩的北欧风格面包咖啡馆。当地指南介绍了酸面包、瑞典肉桂卷与糕点以及咖啡。'
      },
      sources: [
        { type: 'localGuide', name: 'Nerja Amigos', url: 'https://www.nerjaamigos.com/gastronome/nybakat-a-taste-of-sweden-by-burriana-beach' },
        { type: 'independentGuide', name: 'Oh My Costa', url: 'https://www.ohmycosta.nl/en/restaurants/nybakat/' },
        { type: 'listing', name: 'Tripadvisor', url: 'https://www.tripadvisor.com/Restaurant_Review-g315917-d23881395-Reviews-Nybakat_Cafe_Bakery-Nerja_Costa_del_Sol_Province_of_Malaga_Andalucia.html' },
        { type: 'directory', name: 'esNerja', url: 'https://esnerja.com/en/bakeries' }
      ]
    }
  ];

  var LOS_GATOS = {
    aliases: ['Los Gatos', 'LosGatos', 'Cervecería Los Gatos', 'Cerveceria Los Gatos', '로스 가토스', '로스가토스', '말라가 로스가토스', 'ロス・ガトス', 'ロスガトス', '马拉加 Los Gatos', '马拉加罗加托斯'],
    mapUrl: 'https://maps.app.goo.gl/DWL69rbppcQekUtSA?g_st=ac',
    copy: {
      ko: {
        title: 'Los Gatos · Málaga',
        body: '주소는 Plaza Uncibay 9, 29008 Málaga로 현지 참고 자료에서 확인했습니다. 방문자 제공 메모: 사장님이 추천한 해산물 한상을 먹었지만, 정확한 스페인어 메뉴명은 확인되지 않아 메뉴명을 단정하지 않았습니다. 현재 메뉴와 영업시간은 방문 전에 업소에 확인하세요.'
      },
      en: {
        title: 'Los Gatos · Málaga',
        body: 'A local reference lists the address as Plaza Uncibay 9, 29008 Málaga. Visitor-reported note: the owner recommended a seafood feast, but its exact Spanish menu name could not be verified. Check the current menu and opening details with the venue before visiting.'
      },
      ja: {
        title: 'Los Gatos · マラガ',
        body: '現地の参考資料では、住所はPlaza Uncibay 9, 29008 Málagaとされています。訪問者からのメモ：店主おすすめのシーフード料理を食べましたが、正確なスペイン語の料理名は確認できないため記載していません。訪問前に最新メニューと営業時間をご確認ください。'
      },
      zh: {
        title: 'Los Gatos · 马拉加',
        body: '当地参考资料列出的地址为 Plaza Uncibay 9, 29008 Málaga。访客提供的记录：店主推荐了一份海鲜盛宴，但无法确认其准确的西班牙语菜单名称，因此不对菜名作推断。到访前请向店家核实最新菜单和营业情况。'
      }
    },
    sources: [
      { type: 'mapListing', name: 'Google Maps', url: 'https://maps.app.goo.gl/DWL69rbppcQekUtSA?g_st=ac' },
      { type: 'localGuide', name: 'MyMálaga', url: 'https://www.mymalaga.pl/los-gatos-en' },
      { type: 'independentGuide', name: 'Málaga Guru', url: 'https://malagaguru.com/eat-drink/los-gatos/' }
    ]
  };

  function getLanguage(value) {
    var code = String(value || '').toLowerCase().split(/[-_]/)[0];
    return LANGS.indexOf(code) >= 0 ? code : 'ko';
  }

  function escapeHtml(value) {
    return String(value == null ? '' : value).replace(/[&<>"']/g, function (char) {
      return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char];
    });
  }

  function normalizeQuery(value) {
    return String(value == null ? '' : value).toLocaleLowerCase().normalize('NFKC')
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '').normalize('NFC').replace(/[\s\u3000]+/g, ' ').trim();
  }

  function containsAlias(text, alias) {
    var normalizedAlias = normalizeQuery(alias);
    if (!normalizedAlias) return false;
    if (/^[\x00-\x7f]+$/.test(normalizedAlias)) {
      return new RegExp('(^|[^a-z0-9])' + normalizedAlias.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '([^a-z0-9]|$)', 'i').test(text);
    }
    return text.indexOf(normalizedAlias) !== -1;
  }

  function matchesAny(text, aliases) {
    return aliases.some(function (alias) { return containsAlias(text, alias); });
  }

  function getSourceLabel(source, lang) {
    var labels = UI[lang];
    var labelKey = source.type === 'mapListing'
      ? 'mapListing'
      : 'source' + source.type.charAt(0).toUpperCase() + source.type.slice(1);
    var label = labels[labelKey] || labels.sourceFallback;
    return source.name ? label + ' · ' + source.name : label;
  }

  function mapsSearchUrl(query) {
    return 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(query);
  }

  function addLink(container, text, url, className) {
    var link = document.createElement('a');
    link.className = className || '';
    link.href = url;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.textContent = text;
    container.appendChild(link);
  }

  function ensureStyles() {
    if (document.getElementById('nerja-dining-guide-style')) return;
    var style = document.createElement('style');
    style.id = 'nerja-dining-guide-style';
    style.textContent = [
      '#nerja-daytrip-guide .nerja-dining{box-sizing:border-box;margin:24px 0 12px;padding:22px;border:1px solid #d5e3d9;border-radius:20px;background:#f9fcfa;color:#1d2e2a;line-height:1.6;overflow-wrap:anywhere}',
      '#nerja-daytrip-guide .nerja-dining *{box-sizing:border-box}',
      '#nerja-daytrip-guide .nerja-dining h3{margin:0 0 6px;font-size:clamp(20px,2.4vw,25px);line-height:1.3;color:#1a5249}',
      '#nerja-daytrip-guide .nerja-dining-intro{margin:0 0 18px;color:#52635d;font-size:14px}',
      '#nerja-daytrip-guide .nerja-dining-group{margin:18px 0 0}',
      '#nerja-daytrip-guide .nerja-dining-group h4{margin:0 0 10px;color:#263b35;font-size:17px}',
      '#nerja-daytrip-guide .nerja-dining-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px}',
      '#nerja-daytrip-guide .nerja-dining-card{min-width:0;padding:15px;border:1px solid #dfe9e2;border-radius:14px;background:#fff;box-shadow:0 3px 12px rgba(26,82,73,.04)}',
      '#nerja-daytrip-guide .nerja-dining-card h5{margin:0 0 7px;font-size:16px;line-height:1.35;color:#1c2e2c}',
      '#nerja-daytrip-guide .nerja-dining-card p{margin:0 0 9px;font-size:13px;color:#4c5d58}',
      '#nerja-daytrip-guide .nerja-dining-card .nerja-dining-address{font-size:12px;color:#596d65}',
      '#nerja-daytrip-guide .nerja-dining-links{display:flex;flex-wrap:wrap;gap:8px 12px;margin-top:10px;font-size:12px}',
      '#nerja-daytrip-guide .nerja-dining a{color:#0645ad;text-decoration:underline;text-underline-offset:2px;overflow-wrap:anywhere}',
      '#granada-malaga-general-guide .gm-guide-los-gatos{border-left:4px solid #1a5249}',
      '@media(max-width:760px){#nerja-daytrip-guide .nerja-dining{padding:17px;border-radius:15px}#nerja-daytrip-guide .nerja-dining-grid{grid-template-columns:1fr;gap:9px}}',
      '@media(max-width:420px){#nerja-daytrip-guide .nerja-dining{margin:18px 0;padding:14px}#nerja-daytrip-guide .nerja-dining-card{padding:13px}}'
    ].join('\n');
    document.head.appendChild(style);
  }

  function renderVenueCard(venue, lang) {
    var card = document.createElement('article');
    card.className = 'nerja-dining-card';
    var title = document.createElement('h5');
    title.textContent = venue.name;
    card.appendChild(title);

    var summary = document.createElement('p');
    summary.textContent = venue.summary[lang] || venue.summary.ko;
    card.appendChild(summary);

    var address = document.createElement('p');
    address.className = 'nerja-dining-address';
    address.textContent = UI[lang].location + ': ' + venue.address;
    card.appendChild(address);

    var links = document.createElement('div');
    links.className = 'nerja-dining-links';
    addLink(links, UI[lang].mapSearch, mapsSearchUrl(venue.mapQuery));
    venue.sources.forEach(function (source) {
      addLink(links, getSourceLabel(source, lang), source.url);
    });
    card.appendChild(links);
    return card;
  }

  function renderNerjaDiningRecommendations(lang) {
    var mount = document.getElementById('nerja-daytrip-guide');
    if (!mount) return false;
    var currentLang = getLanguage(lang || (typeof currentLang !== 'undefined' ? currentLang : 'ko'));
    var old = mount.querySelector('#nerja-dining-recommendations');
    if (old) old.remove();
    ensureStyles();

    var section = document.createElement('section');
    section.id = 'nerja-dining-recommendations';
    section.className = 'nerja-dining';
    section.lang = currentLang;
    section.setAttribute('aria-labelledby', 'nerja-dining-heading');

    var heading = document.createElement('h3');
    heading.id = 'nerja-dining-heading';
    heading.textContent = UI[currentLang].heading;
    section.appendChild(heading);

    var intro = document.createElement('p');
    intro.className = 'nerja-dining-intro';
    intro.textContent = UI[currentLang].intro;
    section.appendChild(intro);

    [
      { category: 'restaurant', label: UI[currentLang].restaurants },
      { category: 'cafe', label: UI[currentLang].cafes }
    ].forEach(function (groupInfo) {
      var group = document.createElement('div');
      group.className = 'nerja-dining-group';
      var groupHeading = document.createElement('h4');
      groupHeading.textContent = groupInfo.label;
      group.appendChild(groupHeading);
      var grid = document.createElement('div');
      grid.className = 'nerja-dining-grid';
      grid.setAttribute('role', 'list');
      VENUES.filter(function (venue) { return venue.category === groupInfo.category; })
        .forEach(function (venue) {
          var card = renderVenueCard(venue, currentLang);
          card.setAttribute('role', 'listitem');
          grid.appendChild(card);
        });
      group.appendChild(grid);
      section.appendChild(group);
    });

    mount.appendChild(section);
    return true;
  }

  function renderLosGatos(lang) {
    var mount = document.getElementById('granada-malaga-general-guide');
    if (!mount) return false;
    var groups = mount.querySelectorAll('.gm-guide-group');
    if (groups.length < 2) return false;
    var group = groups[1];
    var old = group.querySelector('.gm-guide-los-gatos');
    if (old) old.remove();

    var currentLang = getLanguage(lang);
    var data = LOS_GATOS.copy[currentLang];
    var details = document.createElement('details');
    details.className = 'gm-guide-topic gm-guide-los-gatos';
    var summary = document.createElement('summary');
    summary.textContent = data.title;
    details.appendChild(summary);

    var content = document.createElement('div');
    content.className = 'gm-guide-topic-content';
    var paragraph = document.createElement('p');
    paragraph.textContent = data.body;
    content.appendChild(paragraph);

    var list = document.createElement('ul');
    list.className = 'gm-guide-sources';
    LOS_GATOS.sources.forEach(function (source) {
      var item = document.createElement('li');
      var label = document.createElement('a');
      label.href = source.url;
      label.target = '_blank';
      label.rel = 'noopener noreferrer';
      label.textContent = getSourceLabel(source, currentLang);
      item.appendChild(label);
      list.appendChild(item);
    });
    content.appendChild(list);
    details.appendChild(content);
    group.appendChild(details);
    return true;
  }

  function buildVenueResponse(venue, lang) {
    var primary = venue.sources[0];
    var links = '<a href="' + escapeHtml(mapsSearchUrl(venue.mapQuery)) + '" target="_blank" rel="noopener noreferrer">' + escapeHtml(UI[lang].mapSearch) + ' ↗</a>';
    if (primary) {
      links += '<br><a href="' + escapeHtml(primary.url) + '" target="_blank" rel="noopener noreferrer">' + escapeHtml(getSourceLabel(primary, lang)) + ' ↗</a>';
    }
    return '<strong>' + escapeHtml(venue.name) + '</strong><br>' + escapeHtml(venue.summary[lang] || venue.summary.ko) +
      '<br><strong>' + escapeHtml(UI[lang].location) + ':</strong> ' + escapeHtml(venue.address) + '<br>' + links;
  }

  function buildLosGatosResponse(lang) {
    var data = LOS_GATOS.copy[lang];
    var links = LOS_GATOS.sources.map(function (source) {
      return '<a href="' + escapeHtml(source.url) + '" target="_blank" rel="noopener noreferrer">' +
        escapeHtml(getSourceLabel(source, lang)) + ' ↗</a>';
    }).join('<br>');
    return '<strong>' + escapeHtml(data.title) + '</strong><br>' + escapeHtml(data.body) + '<br><br>' +
      escapeHtml(UI[lang].sourceLinks) + ':<br>' + links;
  }

  function buildNerjaDiningResponse(query, lang) {
    var normalized = normalizeQuery(query);
    if (!normalized) return null;

    if (matchesAny(normalized, LOS_GATOS.aliases)) return buildLosGatosResponse(lang);

    var specific = null;
    VENUES.some(function (venue) {
      if (matchesAny(normalized, venue.aliases)) {
        specific = venue;
        return true;
      }
      return false;
    });
    if (specific) return buildVenueResponse(specific, lang);

    var nerjaContext = matchesAny(normalized, ['Nerja', '네르하', 'ネルハ', '内尔哈', '内爾哈']);
    var foodContext = matchesAny(normalized, [
      'restaurant', 'restaurants', 'food', 'dining', 'eat', 'cafe', 'café', 'coffee', 'brunch', 'meal', 'recommend',
      '맛집', '식당', '카페', '커피', '음식', '먹거리', '밥집', '메뉴', '점심', '추천',
      'レストラン', '食事', 'カフェ', 'コーヒー', '飲食店', 'おすすめ',
      '餐厅', '餐館', '美食', '咖啡馆', '咖啡', '餐饮', '推荐', '吃'
    ]);
    if (nerjaContext && foodContext) {
      var intro = UI[lang].intro;
      var list = VENUES.map(function (venue) {
        var primary = venue.sources[0];
        var links = '<a href="' + escapeHtml(mapsSearchUrl(venue.mapQuery)) + '" target="_blank" rel="noopener noreferrer">' + escapeHtml(UI[lang].mapSearch) + ' ↗</a>';
        if (primary) {
          links += ' · <a href="' + escapeHtml(primary.url) + '" target="_blank" rel="noopener noreferrer">' + escapeHtml(getSourceLabel(primary, lang)) + ' ↗</a>';
        }
        return '<li><strong>' + escapeHtml(venue.name) + '</strong> — ' + escapeHtml(venue.summary[lang] || venue.summary.ko) +
          '<br><span>' + escapeHtml(UI[lang].location) + ': ' + escapeHtml(venue.address) + '</span><br>' + links + '</li>';
      }).join('');
      return '<strong>' + escapeHtml(UI[lang].heading) + '</strong><br>' + escapeHtml(intro) + '<ul>' + list + '</ul>';
    }

    var malagaContext = matchesAny(normalized, ['Málaga', 'Malaga', '말라가', 'マラガ', '马拉加']);
    var seafoodContext = matchesAny(normalized, ['seafood', 'fish', 'pescado', 'marisco', '해산물', '생선', '해산', '海鲜', '海鮮', '魚', '鱼']);
    var restaurantContext = foodContext || matchesAny(normalized, ['restaurant', 'restaurants', '식당', '맛집', 'レストラン', '餐厅', '美食']);
    if (malagaContext && seafoodContext && restaurantContext) return buildLosGatosResponse(lang);
    return null;
  }

  var previousRender = window.renderGranadaMalagaGeneralGuide;
  if (typeof previousRender === 'function') {
    window.renderGranadaMalagaGeneralGuide = function (lang) {
      var rendered = previousRender.apply(this, arguments);
      if (rendered) renderLosGatos(lang);
      return rendered;
    };
  }

  var previousChat = window.buildGranadaMalagaGeneralChatResponse;
  window.buildGranadaMalagaGeneralChatResponse = function (query, lang) {
    var currentLang = getLanguage(lang);
    return buildNerjaDiningResponse(query, currentLang) ||
      (typeof previousChat === 'function' ? previousChat.apply(this, arguments) : null);
  };

  window.renderNerjaDiningRecommendations = renderNerjaDiningRecommendations;
  window.NERJA_DINING_GUIDE_DATA = VENUES;
}());
