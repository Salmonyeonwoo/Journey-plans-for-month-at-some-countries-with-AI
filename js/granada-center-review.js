(function () {
  'use strict';

  const official = {
    manueles: [
      'https://losmanueles.es/mejores-restaurantes-de-granada-centro/reyes-catolicos/',
      'https://losmanueles.es/carta-restaurante-los-manueles/',
      'https://losmanueles.es/'
    ],
    cueva: [
      'https://lacuevade1900.es/restaurantes/santa-ana-1/',
      'https://lacuevade1900.es/comidas-y-cenas/'
    ],
    oliver: [
      'https://restauranteoliver.es/',
      'https://restauranteoliver.es/wp-content/uploads/2026/08/Carta-Espanol.pdf'
    ],
    tapas: 'https://turismo.granada.org/es/granada-24-horas',
    salt: ['https://dle.rae.es/sin', 'https://dle.rae.es/poco'],
    tickets: 'https://tickets.alhambra-patronato.es/en/producto/alhambra-general/'
  };

  const copy = {
    ko: {
      eyebrow: '독립 정보 패널 · GRANADA CENTRO', title: '그라나다 중심가 식당 후보',
      subtitle: '기존 도시별 후보 목록과 별도인 정보성 참고입니다. 식당 선택·예약·여행 일정 변경이 아닙니다.',
      date: '공식 자료 확인 기준: 2026-11-13. 메뉴·가격은 바뀔 수 있으며 2026-11-14 실제 영업·점심 주방 운영·좌석은 확인되지 않았습니다.',
      cards: [
        { name: 'Los Manueles · Reyes Católicos', address: 'Reyes Católicos 61, 18010 Granada · Plaza Nueva 옆', text: '공식 연혁상 식당은 1917년에 시작했지만, 현 주소 지점이 1917년에 개업했다는 뜻은 아닙니다. 공식 메뉴에 Croqueta Manueles가 있습니다. Pollo a la Alhambra는 공개 공식 메뉴에서 확인되지 않았습니다. 홈페이지 일반 안내는 매일 12:00–00:00, 주방 연속 운영입니다. 11/14 예외와 실제 제공은 미확인입니다.' },
        { name: 'La Cueva de 1900 · Santa Ana', address: 'Plaza de Santa Ana 1, Granada', text: '이 패널은 공식 Santa Ana 지점을 가리킵니다(“Isabel la Católica 광장 지점”으로 혼동하지 않음). 지점 게시 시간은 금–일 09:00–00:00이나 당일 예외·점심 주방·좌석은 미확인입니다. 체인 공통 메뉴에는 시크레토 이베리코 튀김 타코와 하몬 이베리코가 들어간 메뉴 등이 있지만, 이 지점의 당일 제공 및 이베리코 스테이크는 확인되지 않았습니다.' },
        { name: 'Restaurante Oliver', address: 'Plaza Pescadería 12, Granada', text: '공식 사이트는 바와 테라스를 소개하고 월–토 09:00–00:00을 게시합니다. 공식 메뉴 PDF에는 Paella de marisco €20/인, 최소 2인이 기재되어 있습니다(2026-11-13 확인; 가격·당일 제공은 변동 가능). 11/14 영업, 점심 주방, 테라스·좌석은 미확인입니다. Almejas a la marinera는 현행 공식 메뉴에서 확인되지 않았습니다.' }
      ],
      caution: '세 곳 모두 후보일 뿐입니다. 계단·무단차 접근·좌석·개인별 편안함을 보장하지 않습니다. 접근 조건이 중요하면 방문 전 식당에 직접 확인하세요.',
      ticket: '2026-11-14 알함브라 14:20 티켓의 시간 지정 구역은 미확인입니다. 시내에서 점심을 먹는다면 실제 티켓 구역을 먼저 확인하세요. 14:20이 나스르 궁전 지정 입장이라면 15–16시 알함브라 도착으로는 놓칠 수 있으니 이동 여유를 확인하세요.',
      tapas: '그라나다 관광청은 많은 곳에서 음료와 무료 타파스를 제공한다고 안내하지만, 모든 업소·모든 음료에 보장되지는 않습니다. 주문 전에 “¿La tapa va incluida con esta bebida?”(이 음료에 타파스가 포함되나요?)라고 확인하세요.',
      salt: '저염을 원하면 “poca sal, por favor”(소금을 조금만) 또는 “sin sal, por favor”(소금 없이)라고 요청할 수 있습니다. 빠에야가 미리 조리된 경우 조절이 어려울 수 있으므로 “¿Se puede preparar con poca sal?”(소금을 적게 넣어 조리할 수 있나요?)라고 미리 물어보세요.',
      links: '공식 자료', linkNames: ['지점 안내', '공식 메뉴', '공식 홈페이지', 'Santa Ana 지점', '체인 메뉴', '공식 홈페이지', '공식 메뉴 PDF', '그라나다 관광청: 무료 타파스 안내']
    },
    en: {
      eyebrow: 'INDEPENDENT INFORMATION PANEL · GRANADA CENTRO', title: 'Granada-centre restaurant candidates',
      subtitle: 'Informational context separate from the city candidate list—not a restaurant choice, reservation, or itinerary change.',
      date: 'Official information checked 13 Nov 2026. Menus and prices can change; actual opening, lunch-kitchen service and seating on 14 Nov 2026 are unverified.',
      cards: [
        { name: 'Los Manueles · Reyes Católicos', address: 'Reyes Católicos 61, 18010 Granada · beside Plaza Nueva', text: 'The official history says the restaurant began in 1917; this does not mean the current address opened in 1917. Croqueta Manueles appears on the official menu. Pollo a la Alhambra was not found on the published official menu. The homepage gives general hours of daily 12:00–00:00 with a continuous kitchen; 14 Nov exceptions and actual availability are unverified.' },
        { name: 'La Cueva de 1900 · Santa Ana', address: 'Plaza de Santa Ana 1, Granada', text: 'This refers to the official Santa Ana branch, not a supposed “Plaza Isabel la Católica branch.” The branch posts Fri–Sun 09:00–00:00; same-day exceptions, lunch kitchen service and seating are unverified. The chain menu includes items such as fried secreto Ibérico tacos and dishes with Ibérico ham, but same-day availability at this branch and an Ibérico steak are unverified.' },
        { name: 'Restaurante Oliver', address: 'Plaza Pescadería 12, Granada', text: 'The official site describes a bar and terrace and posts Mon–Sat 09:00–00:00. Its official menu PDF lists Paella de marisco at €20 per person, minimum two people (checked 13 Nov 2026; price and same-day availability may change). Opening, lunch kitchen, terrace and seating on 14 Nov are unverified. Almejas a la marinera was not found on the current official menu.' }
      ],
      caution: 'These are candidates only. Steps, step-free access, seating and individual comfort are not guaranteed. Contact the venue in advance if access conditions matter.',
      ticket: 'The timed area for the user-confirmed Alhambra ticket at 14:20 on 14 Nov 2026 is unknown. If having lunch in town, first check the actual ticket area. If 14:20 is the Nasrid Palaces timed entry, arriving at the Alhambra at 15:00–16:00 could miss it; allow for travel time.',
      tapas: 'Granada tourism says many places serve a free tapa with a drink, but this is not guaranteed at every venue or with every drink. Ask before ordering: “¿La tapa va incluida con esta bebida?” (Is a tapa included with this drink?)',
      salt: 'For less salt, ask “poca sal, por favor”; “sin sal, por favor” means no salt. Paella may be pre-cooked and hard to adjust, so ask in advance: “¿Se puede preparar con poca sal?” (Can it be prepared with less salt?)',
      links: 'Official sources', linkNames: ['Branch information', 'Official menu', 'Official homepage', 'Santa Ana branch', 'Chain menu', 'Official homepage', 'Official menu PDF', 'Granada tourism: free tapas information']
    },
    ja: {
      eyebrow: '独立情報パネル · GRANADA CENTRO', title: 'グラナダ中心部の飲食店候補',
      subtitle: '都市別候補一覧とは別の情報参考です。店の選定・予約・旅程変更ではありません。',
      date: '公式情報の確認日：2026-11-13。メニュー・価格は変更される場合があります。2026-11-14の実際の営業、昼の厨房営業、座席は未確認です。',
      cards: [
        { name: 'Los Manueles · Reyes Católicos', address: 'Reyes Católicos 61, 18010 Granada · Plaza Nueva隣', text: '公式沿革はレストランが1917年に始まったとしていますが、現在の住所の店舗が1917年に開業した意味ではありません。公式メニューにCroqueta Manuelesが掲載されています。Pollo a la Alhambraは公開中の公式メニューで確認できませんでした。公式サイトの通常案内は毎日12:00–00:00、厨房は連続営業。11月14日の例外営業と当日の提供は未確認です。' },
        { name: 'La Cueva de 1900 · Santa Ana', address: 'Plaza de Santa Ana 1, Granada', text: '公式Santa Ana店を指します。「Plaza Isabel la Católica店」と取り違えないでください。店舗掲載時間は金～日09:00–00:00ですが、当日の例外・昼の厨房営業・座席は未確認です。チェーン共通メニューにはセクレト・イベリコの揚げタコスやイベリコハム入り料理などがありますが、この店での当日提供やイベリコステーキは未確認です。' },
        { name: 'Restaurante Oliver', address: 'Plaza Pescadería 12, Granada', text: '公式サイトはバーとテラスを紹介し、月～土09:00–00:00を掲載。公式メニューPDFにはPaella de marisco €20／人、2人以上と記載（2026-11-13確認。価格・当日提供は変更の場合あり）。11月14日の営業、昼の厨房、テラス・座席は未確認です。Almejas a la marineraは現行の公式メニューで確認できませんでした。' }
      ],
      caution: 'いずれも候補情報です。階段、段差のないアクセス、座席、個人ごとの快適さは保証されません。アクセス条件が重要な場合は事前に店舗へ確認してください。',
      ticket: '利用者確認済みの2026年11月14日14:20のアルハンブラチケットについて、時間指定エリアは未確認です。市内で昼食をとる場合は、まず実際のチケットの対象エリアを確認してください。14:20がナスル宮殿の指定入場なら、15～16時の到着では入場を逃す可能性があるため、移動時間に余裕を見てください。',
      tapas: 'グラナダ観光局によると、多くの店で飲み物に無料タパスが付きますが、すべての店・すべての飲み物で保証されるわけではありません。注文前に「¿La tapa va incluida con esta bebida?」（この飲み物にタパスは付きますか）と確認してください。',
      salt: '塩を控えたい場合は「poca sal, por favor」（塩を少なめに）、塩抜きなら「sin sal, por favor」と頼めます。パエリアは作り置きだと調整が難しい場合があるため、事前に「¿Se puede preparar con poca sal?」（塩を少なめに調理できますか）と尋ねてください。',
      links: '公式資料', linkNames: ['店舗案内', '公式メニュー', '公式サイト', 'Santa Ana店', 'チェーンメニュー', '公式サイト', '公式メニューPDF', 'グラナダ観光局：無料タパス案内']
    },
    zh: {
      eyebrow: '独立信息面板 · GRANADA CENTRO', title: '格拉纳达市中心餐厅候选',
      subtitle: '这是独立于各城市候选清单的信息参考，不代表选择餐厅、预订或更改行程。',
      date: '官方资料核对日期：2026-11-13。菜单和价格可能变化；2026-11-14实际营业、午餐厨房服务及座位均未核实。',
      cards: [
        { name: 'Los Manueles · Reyes Católicos', address: 'Reyes Católicos 61, 18010 Granada · Plaza Nueva旁', text: '官网沿革称餐厅始于1917年，但这不代表现址分店于1917年开业。官方菜单列有Croqueta Manueles。公开的官方菜单未查到Pollo a la Alhambra。官网一般营业信息为每日12:00–00:00、厨房连续营业；11月14日是否例外及当日是否供应未核实。' },
        { name: 'La Cueva de 1900 · Santa Ana', address: 'Plaza de Santa Ana 1, Granada', text: '这里指官网Santa Ana分店，不是所谓“Plaza Isabel la Católica分店”。该分店公布周五至周日09:00–00:00；当日例外、午餐厨房服务和座位未核实。连锁菜单包括炸伊比利亚猪梅花肉塔可及含伊比利亚火腿的菜品等，但该分店当天是否供应及是否有伊比利亚猪排均未核实。' },
        { name: 'Restaurante Oliver', address: 'Plaza Pescadería 12, Granada', text: '官网介绍酒吧和露台，公布周一至周六09:00–00:00。官方菜单PDF列海鲜饭Paella de marisco，每人€20，至少两人（2026-11-13核对；价格和当天供应可能变化）。11月14日营业、午餐厨房、露台及座位未核实。现行官方菜单未查到Almejas a la marinera。' }
      ],
      caution: '以上仅为候选信息。不能保证没有台阶、无台阶通道、座位或每个人都感到舒适。如通行条件重要，请提前联系餐厅确认。',
      ticket: '用户已确认持有2026年11月14日14:20的阿尔罕布拉门票，但尚未确认该时间对应的区域。如在市中心用午餐，请先查看门票上的实际区域。如果14:20是纳斯里德宫定时入场，15:00–16:00才抵达阿尔罕布拉可能错过入场；请预留交通时间。',
      tapas: '格拉纳达旅游局称许多地方会随饮料提供免费小吃，但并非每家店或每种饮料都保证提供。点单前可问：“¿La tapa va incluida con esta bebida?”（这杯饮料包含小吃吗？）',
      salt: '想少放盐可说“poca sal, por favor”；“sin sal, por favor”表示不加盐。海鲜饭若已预先烹制，可能难以调整；请提前询问：“¿Se puede preparar con poca sal?”（可以少放盐烹制吗？）',
      links: '官方资料', linkNames: ['分店信息', '官方菜单', '官网', 'Santa Ana分店', '连锁菜单', '官网', '官方菜单PDF', '格拉纳达旅游局：免费Tapas信息']
    }
  };

  const link = (href, label) => `<a href="${href}" target="_blank" rel="noopener noreferrer">${label}</a>`;
  const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));
  const allowed = ['ko', 'en', 'ja', 'zh'];
  function normalizeLang(lang) {
    if (allowed.includes(lang)) return lang;
    const siteLang = typeof window.currentLang === 'string' ? window.currentLang : '';
    if (allowed.includes(siteLang)) return siteLang;
    try {
      const stored = window.localStorage && window.localStorage.getItem('travel_user_lang');
      if (allowed.includes(stored)) return stored;
    } catch (_) { /* Storage may be unavailable; use the site default. */ }
    return 'ko';
  }

  window.renderGranadaCenterReview = function (lang) {
    const language = normalizeLang(lang);
    const t = copy[language];
    const root = document.getElementById('granada-center-review');
    if (!root) return false;
    const sources = [
      [official.manueles[0], t.linkNames[0]], [official.manueles[1], t.linkNames[1]], [official.manueles[2], t.linkNames[2]],
      [official.cueva[0], t.linkNames[3]], [official.cueva[1], t.linkNames[4]],
      [official.oliver[0], t.linkNames[5]], [official.oliver[1], t.linkNames[6]], [official.tapas, t.linkNames[7]]
    ];
    root.innerHTML = `<section class="avr-panel" aria-labelledby="granada-center-review-title" lang="${language}">
      <header class="avr-hero"><div><p class="avr-eyebrow">${t.eyebrow}</p><h2 id="granada-center-review-title">${t.title}</h2><p class="avr-subtitle">${t.subtitle}</p></div></header>
      <aside class="avr-note">${t.date}</aside>
      <div class="avr-grid">${t.cards.map((card, index) => `<article class="avr-card"><span class="avr-card-index">0${index + 1}</span><div><h3>${card.name}</h3><p><strong>${card.address}</strong></p><p>${card.text}</p></div></article>`).join('')}</div>
      <aside class="avr-note">${t.caution}</aside>
      <aside class="avr-note">${t.ticket}</aside>
      <article class="avr-card avr-card-wide"><span class="avr-card-index">＋</span><div><h3>${language === 'ko' ? '그라나다 무료 타파스' : language === 'en' ? 'Free tapas in Granada' : language === 'ja' ? 'グラナダの無料タパス' : '格拉纳达免费Tapas'}</h3><p>${t.tapas}</p><p>${t.salt}</p></div></article>
      <details class="avr-sources"><summary>${t.links}</summary><nav aria-label="${t.links}">${sources.map(([href, label]) => link(href, label)).join('')}</nav></details>
    </section>`;
    return true;
  };

  window.buildGranadaCenterReviewChatResponse = function (query, lang) {
    const language = normalizeLang(lang);
    const text = String(query || '').toLocaleLowerCase();
    if (!text.trim()) return null;

    // Do not intercept questions that belong to the general Alhambra admission/toilet helper.
    const alhambra = /alhambra|nasrid|palacios\s+nazar|알함브라|나스르|アルハンブラ|ナスル|阿尔罕布拉|纳斯里德|纳斯瑞德/iu.test(text);
    const admissionOrToilet = /ticket|admission|entry|entrance|timed|toilet|restroom|bathroom|washroom|\bwc\b|화장실|입장|티켓|トイレ|入場|チケット|厕所|洗手间|门票|入场/iu.test(text);
    const hasNamedRestaurant = /los\s+manueles|manueles|로스\s*마누엘레스|마누엘레스|ロス・マヌエレス|マヌエレス|洛斯马努埃莱斯|la\s+cueva\s+de\s+1900|cueva\s+de\s+1900|라\s*쿠에바\s*데\s*1900|쿠에바\s*데\s*1900|ラ・クエバ・デ・1900|クエバ・デ・1900|1900洞穴|restaurante\s+oliver|restaurant\s+oliver|\boliver\b|레스토랑\s*올리버|올리버|レストラン・オリベル|オリベル|奥利弗餐厅/iu.test(text);
    const diningIntent = /restaurant|dining|menu|dish|food|eat|lunch|dinner|opening|hours|address|where|price|cost|available|availability|reservation|table|seating|access|stairs|terrace|paella|croqueta|iberico|ib[eé]rico|tapas?|tapa|salt|sodium|restaurant|restaurante|comida|comer|horario|carta|direcci[oó]n|precio|reserva|mesa|acceso|terraza|sal|tapas?|식당|맛집|메뉴|음식|먹|점심|저녁|영업|시간|주소|가격|예약|좌석|접근|계단|테라스|빠에야|타파스|소금|염분|レストラン|食事|メニュー|料理|昼食|夕食|営業時間|住所|価格|予約|席|アクセス|階段|テラス|塩|餐厅|菜单|菜|吃|午餐|晚餐|营业|时间|地址|价格|预订|座位|通行|台阶|露台|海鲜饭|盐/iu.test(text);
    if (alhambra && admissionOrToilet && !hasNamedRestaurant && !diningIntent) return null;

    const venue = hasNamedRestaurant ? (
      /los\s+manueles|manueles|로스\s*마누엘레스|마누엘레스|ロス・マヌエレス|マヌエレス|洛斯马努埃莱斯/iu.test(text) ? 'manueles' :
      /la\s+cueva\s+de\s+1900|cueva\s+de\s+1900|라\s*쿠에바\s*데\s*1900|쿠에바\s*데\s*1900|ラ・クエバ・デ・1900|クエバ・デ・1900|1900洞穴/iu.test(text) ? 'cueva' : 'oliver'
    ) : null;
    const freeTapas = /tapas?|타파스|タパス|小吃/iu.test(text);
    const lowSalt = /salt|salty|sodium|poca\s+sal|sin\s+sal|sal\s+reduc|less\s+salt|low\s+salt|塩|減塩|少盐|少鹽|低盐|低鹽|鹽|盐|소금|저염|염분|짜지|덜짜/iu.test(text);
    const granadaContext = /granada|그라나다|グラナダ|格拉纳达/iu.test(text);
    const mentionsTime = /14\s*[:：.]\s*20|14\s*20|2:20\s*pm|14時20分|14点20分|알함브라.{0,30}(?:시|시간|입장)|(?:시|시간|입장).{0,30}알함브라|alhambra.{0,50}(?:time|timed|entry|ticket)|(?:time|timed|entry|ticket).{0,50}alhambra|アルハンブラ.{0,30}(?:時間|入場)|(?:時間|入場).{0,30}アルハンブラ|阿尔罕布拉.{0,30}(?:时间|入场)|(?:时间|入场).{0,30}阿尔罕布拉/iu.test(text);
    const excludedCity = /madrid|sevilla|seville|c[oó]rdoba|c[oó]rdoba|m[aá]laga|ronda|마드리드|세비야|코르도바|말라가|론다|マドリード|セビリア|コルドバ|マラガ|ロンダ|马德里|塞维利亚|科尔多瓦|马拉加|龙达/iu.test(text);
    if (excludedCity && !granadaContext) return null;

    let topic = null;
    if (venue && (diningIntent || granadaContext || /los\s+manueles|la\s+cueva\s+de\s+1900|restaurante\s+oliver|로스\s*마누엘레스|라\s*쿠에바|レストラン・オリベル|洛斯马努埃莱斯/iu.test(text))) topic = venue;
    else if (mentionsTime && diningIntent && (alhambra || granadaContext)) topic = 'timing';
    else if (freeTapas && (granadaContext || venue)) topic = 'tapas';
    else if (lowSalt && (granadaContext || venue) && /restaurant|restaurante|food|dish|meal|menu|eat|comer|comida|sal|salt|sodium|tapa|paella|식당|음식|식사|메뉴|먹|소금|염분|타파스|빠에야|レストラン|食事|料理|メニュー|塩|タパス|パエリア|餐厅|吃|菜|菜单|盐|Tapas|海鲜饭/iu.test(text)) topic = 'salt';
    else if (granadaContext && !alhambra && /restaurant|restaurante|dining|food|lunch|dinner|식당|맛집|점심|저녁|식사|レストラン|食事|昼食|夕食|餐厅|美食|午餐|晚餐/iu.test(text)) topic = 'overview';
    else if (venue && /14\s*[:：.]\s*20|14\s*20|알함브라|alhambra|アルハンブラ|阿尔罕布拉/iu.test(text)) topic = venue;
    if (!topic) return null;

    const t = copy[language];
    const venueAnswers = {
      manueles: {
        ko: 'Los Manueles Reyes Católicos는 Plaza Nueva 옆 Reyes Católicos 61입니다. 공식 연혁의 1917년은 식당의 시작이며 현 주소 지점의 개업 연도로 볼 수 없습니다. 공식 메뉴에는 Croqueta Manueles가 있고 Pollo a la Alhambra는 공개 메뉴에서 확인되지 않았습니다. 홈페이지 일반 시간은 매일 12:00–00:00, 연속 주방 운영이나 11/14 실제 운영·메뉴는 미확인입니다.',
        en: 'Los Manueles Reyes Católicos is at Reyes Católicos 61, beside Plaza Nueva. The official 1917 history refers to the restaurant’s beginnings, not necessarily the opening of this address. The official menu lists Croqueta Manueles; Pollo a la Alhambra was not found on the published menu. General homepage hours are daily 12:00–00:00 with a continuous kitchen; actual 14 Nov service and menu are unverified.',
        ja: 'Los Manueles Reyes CatólicosはPlaza Nueva隣のReyes Católicos 61です。公式沿革の1917年はレストランの創業を指し、現住所の開店年とは限りません。公式メニューにはCroqueta Manuelesがあり、Pollo a la Alhambraは公開メニューで確認できません。通常案内は毎日12:00–00:00、厨房連続営業ですが、11月14日の実営業・メニューは未確認です。',
        zh: 'Los Manueles Reyes Católicos位于Plaza Nueva旁的Reyes Católicos 61。官网所述1917年是餐厅创立时间，不代表现址分店开业年份。官方菜单列有Croqueta Manueles；公开菜单未查到Pollo a la Alhambra。官网一般时间为每日12:00–00:00、厨房连续营业；11月14日实际营业及菜单未核实。'
      },
      cueva: {
        ko: '공식 지점은 La Cueva de 1900 Santa Ana, Plaza de Santa Ana 1입니다. “Isabel la Católica 광장 지점”과 혼동하지 마세요. 지점 게시 시간은 금–일 09:00–00:00이나 11/14 예외·점심 주방·좌석은 미확인입니다. 체인 메뉴에 시크레토 이베리코 튀김 타코와 하몬 이베리코 포함 메뉴 등이 있지만 지점 당일 제공과 이베리코 스테이크는 확인되지 않았습니다.',
        en: 'The official branch is La Cueva de 1900 Santa Ana, Plaza de Santa Ana 1—not a “Plaza Isabel la Católica branch.” Posted branch hours are Fri–Sun 09:00–00:00; 14 Nov exceptions, lunch kitchen service and seating are unverified. The chain menu includes fried secreto Ibérico tacos and dishes with Ibérico ham, but this branch’s same-day availability and an Ibérico steak are unverified.',
        ja: '公式店はLa Cueva de 1900 Santa Ana、Plaza de Santa Ana 1です。「Plaza Isabel la Católica店」と混同しないでください。掲載時間は金～日09:00–00:00ですが、11月14日の例外・昼の厨房・座席は未確認です。チェーンメニューにはセクレト・イベリコの揚げタコスやイベリコハム入り料理がありますが、この店での当日提供やイベリコステーキは未確認です。',
        zh: '官网分店为La Cueva de 1900 Santa Ana，地址Plaza de Santa Ana 1，不是“Plaza Isabel la Católica分店”。公布时间为周五至周日09:00–00:00；11月14日例外、午餐厨房服务和座位未核实。连锁菜单有炸伊比利亚猪梅花肉塔可及含伊比利亚火腿的菜品，但该店当天供应及伊比利亚猪排均未核实。'
      },
      oliver: {
        ko: 'Restaurante Oliver 주소는 Plaza Pescadería 12입니다. 공식 사이트는 바·테라스와 월–토 09:00–00:00을 게시합니다. 공식 메뉴의 Paella de marisco는 €20/인, 최소 2인(11/13 확인)이며 변동 가능하고 11/14 제공은 미확인입니다. Almejas a la marinera는 현행 메뉴에서 확인되지 않았습니다.',
        en: 'Restaurante Oliver is at Plaza Pescadería 12. Its official site lists a bar, terrace and Mon–Sat 09:00–00:00. The official menu lists Paella de marisco at €20 per person, minimum two (checked 13 Nov); price may change and 14 Nov availability is unverified. Almejas a la marinera was not found on the current menu.',
        ja: 'Restaurante OliverはPlaza Pescadería 12です。公式サイトはバー・テラスと月～土09:00–00:00を掲載。公式メニューのPaella de mariscoは1人€20、2人以上（11/13確認）で、価格は変更の場合があり11/14提供は未確認です。Almejas a la marineraは現行メニューで確認できません。',
        zh: 'Restaurante Oliver地址为Plaza Pescadería 12。官网列有酒吧、露台及周一至周六09:00–00:00。官方菜单列海鲜饭每人€20、至少两人（11月13日核对）；价格可能变动，11月14日是否供应未核实。现行菜单未查到Almejas a la marinera。'
      }
    };

    let answer;
    let hrefs = [];
    if (topic === 'manueles') { answer = venueAnswers.manueles[language]; hrefs = official.manueles; }
    else if (topic === 'cueva') { answer = venueAnswers.cueva[language]; hrefs = official.cueva; }
    else if (topic === 'oliver') { answer = venueAnswers.oliver[language]; hrefs = official.oliver; }
    else if (topic === 'timing') { answer = t.ticket; hrefs = [official.tickets]; }
    else if (topic === 'tapas') { answer = t.tapas; hrefs = [official.tapas]; }
    else if (topic === 'overview') {
      answer = t.cards.map((card) => `${card.name}: ${card.address}`).join(' · ') + ' ' + t.caution + ' ' + t.ticket;
      hrefs = [official.manueles[0], official.cueva[0], official.oliver[0], official.tickets];
    }
    else { answer = t.salt; hrefs = official.salt; }

    const labels = {
      ko: ['공식 자료'], en: ['Official sources'], ja: ['公式資料'], zh: ['官方资料']
    }[language];
    let html = `<div><p>${escapeHtml(answer)}</p>${hrefs.length ? `<p>${hrefs.map((href) => link(href, labels[0])).join(' · ')}</p>` : ''}`;
    if (freeTapas && topic !== 'tapas') html += `<p>${escapeHtml(t.tapas)} ${link(official.tapas, labels[0])}</p>`;
    if (lowSalt && topic !== 'salt') html += `<p>${escapeHtml(t.salt)} ${official.salt.map((href) => link(href, labels[0])).join(' · ')}</p>`;
    const restaurantTogether = Boolean(venue) || (granadaContext && diningIntent);
    if (mentionsTime && restaurantTogether && topic !== 'timing' && topic !== 'overview') html += `<p>${escapeHtml(t.ticket)} ${link(official.tickets, labels[0])}</p>`;
    html += '</div>';
    return html;
  };
})();
