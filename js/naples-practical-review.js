/* Naples practical context supplement — four languages; contextual links, not duplicate restaurant cards. */
(function (root) {
  'use strict';

  const LANGS = ['ko', 'en', 'ja', 'zh'];
  const COPY = {
    ko: {
      eyebrow: '나폴리 · 이동·쇼핑 실전 메모',
      title: '나폴리 실용 메모',
      intro: '기존 교통 안내와 이탈리아 음식 가이드에 덧붙이는 짧은 확인사항입니다. 아래 식당명은 별도 카드가 아니라 기존 음식 가이드로 연결되는 참고 링크입니다.',
      transport: '교통권·개찰구 확인',
      transit1: 'ANM 일일권 금액(€4.50/€5.40로 인용된 자료 포함)과 적용 노선·자정 만료 여부는 구매 시점의 공식 상품 조건으로 확인하세요. 전체 포함 노선은 여기서 보증하지 않습니다.',
      transit2: '나폴리 메트로 2호선은 Trenitalia 운영 안내를 별도로 확인하고, ANM권 유효성이 확인되지 않았다면 별도 유효 승차권을 준비하세요. 메트로·케이블카는 게이트를 통과할 때마다 검표 지침을 따르고, 버스는 해당 운영사의 탑승 규칙을 따르세요.',
      transit3: 'Trenitalia Tap&amp;Tap은 지원 역에서만 이용할 수 있습니다. 사용할 때는 같은 결제카드로 승차·하차 태그를 하고 적용 조건을 확인하세요. 임의의 요금을 가정하지 마세요.',
      streets: '거리와 쇼핑 동선',
      streets1: 'Via Toledo와 Via Chiaia는 쇼핑 거리 이름이지, 전 구간이 평탄하거나 보행자 전용이라는 보장은 아닙니다. 경사·포장·차량 구간은 실제 이동 경로에서 따로 확인하세요.',
      streets2: 'Gay-Odin 공식 지점 안내는 Via Toledo 427을 기재하고, 회사 연혁은 1894년 시작을 설명합니다. Foresta는 공식 역사 페이지에 소개된 초콜릿입니다. 현 재고나 가격은 보장하지 않습니다.',
      streets3: 'Passalacqua의 공식 브랜드 역사에는 Piazza Dante가 등장하지만, 현재 직영점 소유관계나 해당 주소의 판매점 운영은 확인하지 못했습니다. L’Amico per la pelle의 Via Toledo 292 주소와 운영 정보도 별도 확인이 필요합니다.',
      markets: '식료품점·기념품 구매',
      markets1: 'Conad 공식 매장 페이지에서 Via Pietro Colletta 89와 Via Duomo 346 지점을 확인할 수 있습니다. 영업시간·당일 영업 여부, 커피·파스타·오일·주류의 브랜드·가격·재고는 페이지와 매장에서 다시 확인하세요.',
      markets2: '올리브오일·리몬첼로를 항공 기내에 가져갈 수 있다고 가정하지 마세요. EU 공식 수하물 안내와 출발 공항·항공사의 현재 액체류·수하물 규정을 확인하고, 필요하면 위탁 수하물 조건을 확인하세요.',
      food: '식당 이름은 기존 음식 가이드에서 확인',
      foodIntro: 'Il Gobbetto, Signora Bettola Medina, Nennella, da Donato, Tandem Via Paladino는 현재 영업시간·좌석·메뉴를 보증하지 않는 공식/매장 채널 참고입니다. 방문 전 직접 재확인하세요.',
      foodLink: '이탈리아 음식 가이드 열기',
      rail: '철도 방향은 노선별로 확인',
      railText: '이탈리아 도로는 우측 통행입니다. RFI 규정은 일부 복선의 통상 좌측 운행과 함께 양방향 운행·예외도 다룹니다. 이를 모든 철도나 지하철에 일반화하지 말고, 역 안내와 운행 지시를 따르세요. 1839년 나폴리–포르티치 철도는 이탈리아 철도사의 초기 사례입니다.',
      verify: '시간·요금·운영·재고는 변동될 수 있습니다. 아래 공식 출처와 현장 안내를 방문 당일 확인하세요.',
      sources: '공식 출처 및 확인 링크',
      chatbotQuestion: '나폴리 교통권과 쇼핑 실용 팁',
      chatbotChip: '🚇 나폴리 교통·쇼핑',
      answerTitle: '나폴리 실용 확인사항',
      answer: 'ANM 일일권의 가격·노선 유효성·만료 조건은 구매 때 공식 상품 조건으로 확인하세요. Linea 2는 Trenitalia 별도 안내를 확인하고, ANM권 유효성이 확인되지 않으면 별도 승차권을 준비하세요. Via Toledo·Via Chiaia가 전 구간 평탄하거나 보행자 전용이라고 가정하지 마세요. Gay-Odin 공식 지점은 Via Toledo 427입니다. 식당별 설명은 <a href="#italy-local-food-guide">이탈리아 음식 가이드</a>에서 확인하고, 메뉴·운영시간·좌석은 방문 전에 직접 확인하세요.',
      viewTransit: '📍 이탈리아 교통 탭 보기'
    },
    en: {
      eyebrow: 'NAPLES · PRACTICAL TRANSIT & SHOPPING NOTES',
      title: 'Naples practical notes',
      intro: 'A concise supplement to the existing transit section and Italy food guide. Restaurant names below are contextual links to that guide, not duplicate restaurant cards.',
      transport: 'Check tickets and gates',
      transit1: 'Verify the ANM day-pass product terms at purchase, including any quoted €4.50/€5.40 amounts, route validity and whether it expires at midnight. This guide does not confirm the complete list of included routes.',
      transit2: 'Check Trenitalia’s separate information for Metro Line 2. If ANM-pass validity is not confirmed, obtain a valid separate ticket. Follow gate-validation instructions each time you enter metro or funicular gates; follow the relevant operator’s rule on buses.',
      transit3: 'Trenitalia Tap&amp;Tap is available only at supported stations. When using it, tap in and out with the same payment card and check the applicable conditions. Do not assume an unpublished fare.',
      streets: 'Streets and shopping routes',
      streets1: 'Via Toledo and Via Chiaia are shopping-street names, not a guarantee that every stretch is flat or pedestrian-only. Check gradients, paving and vehicle sections on your actual route.',
      streets2: 'Gay-Odin’s official store locator lists Via Toledo 427; its company history describes a start in 1894. Foresta is described on the official history page. Current stock and prices are not guaranteed.',
      streets3: 'Passalacqua’s official brand history mentions Piazza Dante, but current direct ownership or a currently operating retail outlet at that address was not verified. The Via Toledo 292 address and current operation of L’Amico per la pelle also need independent confirmation.',
      markets: 'Groceries and souvenirs',
      markets1: 'Conad’s official store pages list branches at Via Pietro Colletta 89 and Via Duomo 346. Recheck opening hours and same-day operation, and confirm brands, prices and stock of coffee, pasta, oil or alcohol with the store.',
      markets2: 'Do not assume olive oil or limoncello can be carried in the aircraft cabin. Check the EU’s official luggage guidance and the current liquid/baggage rules of your departure airport and airline; confirm checked-baggage requirements if needed.',
      food: 'Restaurant names: see the existing food guide',
      foodIntro: 'Il Gobbetto, Signora Bettola Medina, Nennella, da Donato and Tandem Via Paladino are pointers to venue channels, not guarantees of current hours, seating or menus. Recheck directly before visiting.',
      foodLink: 'Open the Italy food guide',
      rail: 'Rail direction is route-specific',
      railText: 'Road traffic in Italy keeps to the right. RFI rules describe left-hand running as the ordinary direction on some double-track lines, while also covering bidirectional operation and exceptions. Do not generalize this to all railways or metros; follow station information and operating instructions. The 1839 Naples–Portici railway is an early chapter in Italian rail history.',
      verify: 'Hours, fares, operations and stock can change. Check the official sources and local notices on the day of travel.',
      sources: 'Official sources and references',
      chatbotQuestion: 'Naples transit tickets and shopping tips',
      chatbotChip: '🚇 Naples transit & shopping',
      answerTitle: 'Naples practical checks',
      answer: 'Check the ANM day-pass price, route validity and expiry terms on the official product when purchasing. For Linea 2, check Trenitalia’s separate guidance; if ANM validity is not confirmed, use a separate valid ticket. Do not assume all of Via Toledo or Via Chiaia is flat or pedestrian-only. Gay-Odin’s official locator lists Via Toledo 427. For restaurant notes, see the <a href="#italy-local-food-guide">Italy food guide</a>; confirm menus, hours and seating directly before visiting.',
      viewTransit: '📍 Open the Italy transit tab'
    },
    ja: {
      eyebrow: 'ナポリ · 交通・ショッピング実用メモ',
      title: 'ナポリの実用メモ',
      intro: '既存の交通案内とイタリア食ガイドを補足する短い確認事項です。下記の飲食店名は独立した重複カードではなく、既存ガイドへの参考リンクです。',
      transport: '乗車券・改札の確認',
      transit1: 'ANM 1日券は、購入時に公式商品の条件を確認してください。資料にある€4.50／€5.40という金額、対象路線、深夜0時までの有効性も含め、全路線の適用をここでは保証しません。',
      transit2: '地下鉄2号線はTrenitaliaの別案内を確認してください。ANM券の有効性が確認できなければ、別途有効な乗車券を用意します。地下鉄・フニコラーレは改札を通るたびに検札・認証方法を確認し、バスは各運行会社の規則に従ってください。',
      transit3: 'TrenitaliaのTap&amp;Tapは対応駅のみ利用できます。利用時は同じ決済カードで乗車・降車時にタッチし、適用条件を確認してください。根拠のない運賃を想定しないでください。',
      streets: '通りと買い物ルート',
      streets1: 'Via ToledoとVia Chiaiaは商店街の名称であり、全区間が平坦・歩行者専用とは限りません。実際の経路で坂、路面、車両通行区間を確認してください。',
      streets2: 'Gay-Odinの公式店舗案内にはVia Toledo 427が掲載され、会社沿革は1894年の創業を説明しています。Forestaは公式沿革ページで紹介されています。現在の在庫・価格は保証されません。',
      streets3: 'Passalacquaの公式ブランド史にはPiazza Danteが登場しますが、現在の直営関係や同住所での小売営業は確認できていません。L’Amico per la pelleのVia Toledo 292という住所と現在の営業状況も別途確認が必要です。',
      markets: '食料品店・お土産',
      markets1: 'Conad公式店舗ページにはVia Pietro Colletta 89とVia Duomo 346の店舗が掲載されています。営業時間・当日の営業、コーヒー・パスタ・オイル・酒類のブランド、価格、在庫は店舗で再確認してください。',
      markets2: 'オリーブオイルやリモンチェッロを機内持ち込みできると決めつけないでください。EU公式の手荷物案内と出発空港・航空会社の最新の液体物・手荷物規則を確認し、必要なら預け荷物の条件も確認してください。',
      food: '飲食店名は既存の食ガイドへ',
      foodIntro: 'Il Gobbetto、Signora Bettola Medina、Nennella、da Donato、Tandem Via Paladinoは各店舗の参考リンクです。現在の営業時間、座席、メニューを保証するものではありません。訪問前に直接ご確認ください。',
      foodLink: 'イタリア食ガイドを開く',
      rail: '鉄道の進行方向は路線ごとに確認',
      railText: 'イタリアの道路は右側通行です。RFI規則は一部複線の通常の左側通行を説明する一方、双方向運転や例外も扱っています。これをすべての鉄道・地下鉄に一般化せず、駅表示と運行指示に従ってください。1839年のナポリ〜ポルティチ鉄道はイタリア鉄道史の初期事例です。',
      verify: '営業時間・運賃・運行・在庫は変わることがあります。旅行当日に公式情報と現地表示をご確認ください。',
      sources: '公式情報・参照リンク',
      chatbotQuestion: 'ナポリの交通券と買い物の実用情報',
      chatbotChip: '🚇 ナポリ交通・買い物',
      answerTitle: 'ナポリで確認したい実用情報',
      answer: 'ANM 1日券の料金・路線有効性・期限は購入時に公式商品で確認してください。2号線はTrenitaliaの別案内を確認し、ANM券の有効性が不明なら別の有効な乗車券を用意します。Via Toledo・Via Chiaiaの全区間が平坦または歩行者専用とは限りません。Gay-Odin公式店舗案内にはVia Toledo 427が掲載されています。飲食店の情報は<a href="#italy-local-food-guide">イタリア食ガイド</a>で確認し、メニュー・営業時間・座席は訪問前に店舗へお問い合わせください。',
      viewTransit: '📍 イタリア交通タブを見る'
    },
    zh: {
      eyebrow: '那不勒斯 · 交通与购物实用提示',
      title: '那不勒斯实用提示',
      intro: '这是对现有交通栏目和意大利美食指南的简短补充。下列餐厅名称仅链接至现有指南，不另建重复餐厅卡片。',
      transport: '核对车票与闸机',
      transit1: '购买时请核对ANM日票的官方产品条款，包括资料中出现的€4.50/€5.40金额、适用线路及是否午夜到期。本指南不保证完整线路覆盖。',
      transit2: '那不勒斯地铁2号线请另查Trenitalia说明。若无法确认ANM票有效，应购买另一张有效车票。每次通过地铁或缆车闸机时按现场要求验票；公交请遵循相应运营方的规则。',
      transit3: 'Trenitalia Tap&amp;Tap仅在支持的车站可用。使用时须用同一张支付卡进站和出站刷卡，并核对适用条件；不要臆测票价。',
      streets: '街道与购物路线',
      streets1: 'Via Toledo和Via Chiaia是购物街名称，不代表全程平坦或仅供行人通行。请按实际路线核实坡度、路面及车辆通行路段。',
      streets2: 'Gay-Odin官网门店查询列有Via Toledo 427，公司历史介绍其创立于1894年。Foresta见官网历史页面。当前库存与价格不作保证。',
      streets3: 'Passalacqua官方品牌历史提到Piazza Dante，但未核实目前是否为直营、该地址是否仍有零售门店。L’Amico per la pelle的Via Toledo 292地址及当前营业状态也需另行确认。',
      markets: '超市与伴手礼',
      markets1: 'Conad官方门店页面列有Via Pietro Colletta 89和Via Duomo 346。请重新确认营业时间及当日是否营业，并向门店核实咖啡、意面、橄榄油或酒类的品牌、价格和库存。',
      markets2: '不要假设橄榄油或柠檬酒可带入客舱。请查看欧盟官方行李说明、出发机场及航空公司的最新液体和行李规定；如有需要，确认托运行李要求。',
      food: '餐厅名称请见现有美食指南',
      foodIntro: 'Il Gobbetto、Signora Bettola Medina、Nennella、da Donato和Tandem Via Paladino仅提供店家渠道参考，不保证当前营业时间、座位或菜单。到访前请直接核实。',
      foodLink: '打开意大利美食指南',
      rail: '铁路行驶方向须按线路核实',
      railText: '意大利道路为右侧通行。RFI规则说明部分双线线路通常左侧行驶，同时也涉及双向运行与例外。不要将此概括为所有铁路或地铁的通则；请遵循车站信息和运营指示。1839年那不勒斯—波蒂奇铁路是意大利铁路史的早期篇章。',
      verify: '营业时间、票价、运营和库存可能变化。出行当日请查看官方来源和现场告示。',
      sources: '官方来源与参考链接',
      chatbotQuestion: '那不勒斯交通票与购物提示',
      chatbotChip: '🚇 那不勒斯交通·购物',
      answerTitle: '那不勒斯实用核对事项',
      answer: '购买ANM日票时，请核对官方产品的票价、线路有效性和到期条件。2号线请查看Trenitalia独立说明；若无法确认ANM票有效，请另购有效车票。不要假设Via Toledo或Via Chiaia全程平坦或仅供行人通行。Gay-Odin官网门店查询列有Via Toledo 427。餐厅信息请参阅<a href="#italy-local-food-guide">意大利美食指南</a>，菜单、营业时间和座位请在到访前直接确认。',
      viewTransit: '📍 查看意大利交通标签页'
    }
  };

  const SOURCES = [
    { label: 'Gay-Odin official store locator', url: 'https://gay-odin.it/punti-vendita' },
    { label: 'Gay-Odin official history (1894)', url: 'https://gay-odin.it/storia-gayodin' },
    { label: 'Passalacqua official brand history', url: 'https://www.passalacqua.com/en/pages/our-story' },
    { label: 'Conad City · Via Pietro Colletta 89', url: 'https://www.conad.it/ricerca-negozi/conad-city-via-pietro-colletta-89-80139-napoli--009043' },
    { label: 'Conad City · Via Duomo 346', url: 'https://www.conad.it/ricerca-negozi/conad-city-via-duomo-346-80133-napoli--010103' },
    { label: 'ANM metro and funicular rules', url: 'https://www.anm.it/s/regolamento-metro-e-funicolari' },
    { label: 'Trenitalia · Naples Metro', url: 'https://www.trenitalia.com/it/regionale/campania/metro-napoli.html' },
    { label: 'Trenitalia Tap&Tap', url: 'https://www.trenitalia.com/en/information/tap-and-tap.html' },
    { label: 'RFI worksite protection instruction', url: 'https://www.rfi.it/content/dam/rfi/fornitori-e-gare/qualificazione-operatori-economici/informazioni-per-qualificarsi/regole-e-documentazione-abilitazioni/Istruzione_Protezione_Cantieri_RFI.pdf' },
    { label: 'Fondazione FS · Railway Museum', url: 'https://www.fondazionefs.it/en/explore-museum.html' },
    { label: 'EU luggage restrictions', url: 'https://europa.eu/youreurope/citizens/travel/carry/luggage-restrictions/index_en.htm' },
    { label: 'Il Gobbetto · menu', url: 'https://osteria-il-gobbetto3.webnode.it/menu/' },
    { label: 'Signora Bettola · Medina menu', url: 'https://www.signorabettola.com/menu-medina/' },
    { label: 'Trattoria Nennella · official site', url: 'https://www.trattorianennella.it/' },
    { label: 'Tandem · Via Paladino', url: 'https://www.tandemnapoli.it/tandem-via-paladino/' },
    { label: 'da Donato · venue social channel', url: 'https://www.instagram.com/dadonatonapoli/' }
  ];

  function h(value) {
    return String(value).replace(/[&<>"']/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[ch]);
  }

  function currentLang() {
    const lang = (root.currentLang || 'ko').toLowerCase();
    return COPY[lang] ? lang : 'ko';
  }

  function render(lang) {
    const l = COPY[lang] ? lang : 'ko';
    const t = COPY[l];
    const sourcesHtml = SOURCES.map(source => `<li><a href="${h(source.url.replace('&amp;', '&'))}" target="_blank" rel="noopener noreferrer">${h(source.label)} ↗</a></li>`).join('');
    return `<section class="naples-practical-review" id="naples-practical-review" lang="${l}" aria-labelledby="naples-practical-title">
      <div class="naples-review-heading"><span class="naples-review-eyebrow">${h(t.eyebrow)}</span><h3 id="naples-practical-title">${h(t.title)}</h3><p>${h(t.intro)}</p></div>
      <div class="naples-review-grid">
        <article class="naples-review-card"><h4>🎫 ${h(t.transport)}</h4><ul><li>${t.transit1}</li><li>${t.transit2}</li><li>${t.transit3}</li></ul></article>
        <article class="naples-review-card"><h4>🛍️ ${h(t.streets)}</h4><ul><li>${h(t.streets1)}</li><li>${h(t.streets2)}</li><li>${h(t.streets3)}</li></ul></article>
        <article class="naples-review-card"><h4>🧺 ${h(t.markets)}</h4><ul><li>${h(t.markets1)}</li><li>${h(t.markets2)}</li></ul></article>
        <article class="naples-review-card"><h4>🍽️ ${h(t.food)}</h4><p>${h(t.foodIntro)}</p><a class="naples-food-guide-link" href="#italy-local-food-guide" onclick="openItalyFoodGuide(); return false;">${h(t.foodLink)} ↗</a></article>
        <article class="naples-review-card naples-review-card-wide"><h4>🚆 ${h(t.rail)}</h4><p>${h(t.railText)}</p></article>
      </div>
      <p class="naples-review-caveat">ℹ️ ${h(t.verify)}</p>
      <details class="naples-review-sources"><summary>${h(t.sources)}</summary><ul>${sourcesHtml}</ul></details>
    </section>`;
  }

  function mount() {
    const panel = document.getElementById('italyTransitGuidePanel');
    if (!panel) return;
    const markup = render(currentLang());
    const old = panel.querySelector('#naples-practical-review');
    if (old) old.outerHTML = markup;
    else panel.insertAdjacentHTML('beforeend', markup);
  }

  function openGuide() {
    if (typeof root.switchGuidebookChapter === 'function') root.switchGuidebookChapter('chapter-practical');
    if (typeof root.goToBookPage === 'function') root.goToBookPage('chapter-practical', 2, false);
    if (typeof root.switchTransitHotelSubTab === 'function') root.switchTransitHotelSubTab('italy');
    window.setTimeout(() => document.getElementById('naples-practical-review')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 120);
  }
  root.openNaplesPracticalReview = openGuide;

  // Extend the existing Italy transit renderer without altering its source file.
  if (typeof root.renderItalyTransitGuide === 'function') {
    const originalRender = root.renderItalyTransitGuide;
    root.renderItalyTransitGuide = function () {
      const result = originalRender.apply(this, arguments);
      mount();
      return result;
    };
  }
  if (typeof root.switchLanguage === 'function') {
    const originalSwitchLanguage = root.switchLanguage;
    root.switchLanguage = function () {
      const result = originalSwitchLanguage.apply(this, arguments);
      if (document.getElementById('naples-practical-review')) mount();
      return result;
    };
  }

  // Local, deterministic answer: integrate with the existing on-device chatbot.
  function classify(query) {
    const q = String(query || '').toLocaleLowerCase();
    const city = /naples|napoli|나폴리|ナポリ|那不勒斯/.test(q);
    // Keep route planning and venue-specific restaurant questions in the existing
    // handlers, even when they mention Naples and a practical-sounding keyword.
    const intercityRoute = /(?:naples|napoli|나폴리|ナポリ|那不勒斯)\s*(?:\bto\b|\ba\b|→|から|到|에서)\s*(?:[\p{L}][\p{L}\s'-]{1,30})/iu.test(q) ||
      /(?:\bfrom\b|\bda\b|\bde\b|から|从|에서)\s+(?:[\p{L}][\p{L}\s'-]{1,30})\s+(?:\bto\b|\ba\b|→|まで|到|으로)\s+(?:[\p{L}][\p{L}\s'-]{1,30})/iu.test(q) ||
      (/(?:naples|napoli|나폴리|ナポリ|那不勒斯).*?\bto\b\s+[\p{L}][\p{L}\s'-]{1,30}/iu.test(q) && /train|rail|bus|flight|ferry|기차|철도|버스|비행기|列車|鉄道|電車|バス|火车|铁路|公交|飞机/.test(q));
    const restaurant = /nennella|il\s+gobbetto|gobbetto|signora\s+bettola|bettola|tandem|da\s+donato|donato/.test(q);
    if (intercityRoute || restaurant) return false;

    const localPlace = city || /via toledo|via chiaia|conad|gay.?odin|passalacqua|l.?amico/.test(q);
    const ticketIntent = /anm|tap.?and.?tap|tap.?&.?tap|metro|subway|funicular|transit|ticket|day pass|rail pass|fare|교통|지하철|승차권|교통권|교통券|车票|地铁|交通|乘车券|買い物券|乗車券|地下鉄|交通|チケット/.test(q);
    const shoppingIntent = /shopping|shop|supermarket|chocolate|coffee|olive oil|limoncello|via toledo|via chiaia|conad|gay.?odin|passalacqua|l.?amico|교통|쇼핑|마트|초콜릿|커피|올리브오일|리몬첼로|购物|超市|巧克力|橄榄油|買い物|スーパー|チョコレート|オリーブオイル|リモンチェッロ/.test(q);
    const railDirectionIntent = /(?:rail|train|철도|기차|铁路|鉄道|列車).*(?:direction|which side|left|right|run|running|방향|좌측|우측|왼쪽|오른쪽|方向|左侧|右侧|進行|左右|どちら側|走行)|(?:direction|which side|left|right|run|running|방향|좌측|우측|왼쪽|오른쪽|方向|左侧|右侧|進行|左右|どちら側|走行).*(?:rail|train|철도|기차|铁路|鉄道|列車)/.test(q);
    return localPlace && (ticketIntent || shoppingIntent || railDirectionIntent);
  }
  function answer(query) {
    if (!classify(query)) return null;
    const lang = typeof root.getEffectiveLang === 'function' ? root.getEffectiveLang(query) : currentLang();
    const t = COPY[lang] || COPY[currentLang()];
    const foodGuideLink = t.answer.replace(/href="#italy-local-food-guide"/g, 'href="#italy-local-food-guide" onclick="openItalyFoodGuide(); return false;"');
    return `<strong>ℹ️ ${h(t.answerTitle)}</strong><br><br>${foodGuideLink}<br><br><button type="button" class="chat-quick-chip naples-review-chat-link" onclick="openNaplesPracticalReview()">${h(t.viewTransit)}</button>`;
  }
  function openItalyFoodGuide() {
    if (typeof root.switchGuidebookChapter === 'function') root.switchGuidebookChapter('chapter-guide', false);
    if (typeof root.goToBookPage === 'function') root.goToBookPage('chapter-guide', 0, false);
    let target = document.getElementById('italy-local-food-guide');
    if (!target && typeof root.renderItalyLocalFoodGuide === 'function') {
      root.renderItalyLocalFoodGuide(currentLang());
      target = document.getElementById('italy-local-food-guide');
    }
    if (target) window.setTimeout(() => target.scrollIntoView({ behavior: 'smooth', block: 'start' }), 120);
  }
  root.openItalyFoodGuide = openItalyFoodGuide;
  if (typeof root.handleLocalChat === 'function') {
    const originalHandleLocalChat = root.handleLocalChat;
    root.handleLocalChat = function (query) {
      const localAnswer = answer(query);
      return localAnswer || originalHandleLocalChat.apply(this, arguments);
    };
  }

  // Add one localized quick question to the built-in chatbot's localized chip bank.
  const chatbotI18n = root.CHATBOT_I18N;
  if (chatbotI18n) {
    LANGS.forEach(lang => {
      const dictionary = chatbotI18n[lang];
      const text = COPY[lang];
      if (!dictionary || !Array.isArray(dictionary.chips) || dictionary.chips.some(chip => String(chip.q || '') === text.chatbotQuestion)) return;
      dictionary.chips.push({ q: text.chatbotQuestion, text: text.chatbotChip });
    });
    if (typeof root.updateChatbotLanguage === 'function') root.updateChatbotLanguage(currentLang());
  }

  // A small named export supports local syntax/unit checks and other guide modules.
  root.NAPLES_PRACTICAL_REVIEW = { render, answer, openGuide, sources: SOURCES.slice() };
})(window);
