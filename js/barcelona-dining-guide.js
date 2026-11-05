(function () {
  const mapLinks = {
    ciutat: 'https://www.google.com/maps/search/?api=1&query=Ciutat+Comtal%2C+Barcelona',
    vinitus: 'https://www.google.com/maps/search/?api=1&query=Vinitus%2C+Barcelona',
    laFlauta: 'https://maps.app.goo.gl/m1FoxwqeHFDz4k718',
    elGlopGaudi: 'https://maps.app.goo.gl/MZmg9NwvcTJzhBpx9',
    elGlopPlaca: 'https://maps.app.goo.gl/AH9MtQDuzFN5qteG8',
    puertecillo: 'https://maps.app.goo.gl/yh6TcaTz3HjahXnU7'
  };

  const routeOrigin = 'Suites Marina Abapart, Barcelona';
  const routeDestinations = {
    'Ciutat Comtal': 'Ciutat Comtal, Barcelona',
    'Vinitus': 'Vinitus, Barcelona',
    'La Flauta': 'La Flauta, Barcelona',
    'El Glop Gaudí': 'El Glop Gaudí, Barcelona',
    'El Glop Plaça Catalunya': 'El Glop Braseria, Carrer de Casp 21, 08010 Barcelona',
    'Puertecillo Sagrada Família': 'Puertecillo Sagrada Família, Passatge de Simó 18, 08025 Barcelona'
  };
  const mapActionLabels = {
    ko: { map: '지도', route: '숙소 출발 도보 길찾기' },
    en: { map: 'Map', route: 'Walk from lodging' },
    ja: { map: '地図', route: '宿泊先から徒歩' },
    zh: { map: '地图', route: '从住宿地步行' }
  };

  function buildWalkingDirections(destination) {
    return `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(routeOrigin)}&destination=${encodeURIComponent(destination)}&travelmode=walking`;
  }

  const sourceLinks = [
    { label: { ko: 'La Flauta Group 공식 브랜드 안내', en: 'La Flauta Group: official brand guide', ja: 'La Flauta Group 公式ブランド案内', zh: 'La Flauta Group 官方品牌介绍' }, url: 'https://www.laflautagroup.com/en' },
    { label: { ko: 'El Glop 공식 바르셀로나 지점 안내', en: 'El Glop: official Barcelona locations', ja: 'El Glop 公式バルセロナ店舗案内', zh: 'El Glop 官方巴塞罗那门店' }, url: 'https://elglop.com/en/restaurantes-en-barcelona/' },
    { label: { ko: '푸에르테시요 공식 안내·FAQ', en: 'Puertecillo: official guide and FAQ', ja: 'Puertecillo 公式案内・FAQ', zh: 'Puertecillo 官方介绍与常见问题' }, url: 'https://puertecillo.es/en/' },
    { label: { ko: '푸에르테시요 사그라다 파밀리아 지점', en: 'Puertecillo Sagrada Família branch', ja: 'Puertecillo サグラダ・ファミリア店', zh: 'Puertecillo 圣家堂店' }, url: 'https://puertecillo.es/en/puertecillo-sagrada-familia/' },
    { label: { ko: '스페인 공식 관광청: 여름 음료', en: 'Spain tourism: summer drinks', ja: 'スペイン政府観光局：夏の飲み物', zh: '西班牙官方旅游网站：夏日饮品' }, url: 'https://www.spain.info/en/discover-spain/recipe-for-summer-in-spain-cool-drinks/' },
    { label: { ko: 'Damm 공식 Inedit 제품 안내', en: 'Damm: official Inedit product guide', ja: 'Damm 公式 Inedit 製品案内', zh: 'Damm 官方 Inedit 产品介绍' }, url: 'https://www.damm.com/en/beers/inedit' },
    { label: { ko: 'Mercadona 공식 상품: 꿀맛 카모마일 인퓨전', en: 'Mercadona: honey-flavour chamomile infusion', ja: 'Mercadona 公式商品：はちみつ風味カモミール', zh: 'Mercadona 官方商品：蜂蜜风味洋甘菊茶' }, url: 'https://tienda.mercadona.es/product/11454/infusion-manzanilla-sabor-miel-hacendado-con-edulcorante' },
    { label: { ko: 'FAA: 비에어로졸 오일 수하물 안내', en: 'FAA: non-aerosol oils in baggage', ja: 'FAA：非エアゾール油の手荷物規則', zh: 'FAA：非气雾式食用油行李规定' }, url: 'https://www.faa.gov/hazmat/packsafe/oils' },
    { label: { ko: 'TSA: 조리용 스프레이 수하물 안내', en: 'TSA: cooking spray baggage rules', ja: 'TSA：クッキングスプレーの手荷物規則', zh: 'TSA：烹饪喷雾行李规定' }, url: 'https://www.tsa.gov/travel/security-screening/whatcanibring/items/cooking-spray' }
  ];

  const foodPhotoAssets = [
    {
      src: 'img/gourmet/barcelona-pan-con-tomate-user.jpg',
      caption: { ko: 'Pan con tomate · 토마토 빵', en: 'Pan con tomate · tomato bread', ja: 'パン・コン・トマテ · トマトパン', zh: 'Pan con tomate · 番茄面包' },
      alt: { ko: '토마토를 얹은 구운 빵이 접시에 담겨 있다.', en: 'Toasted bread topped with tomato on a plate.', ja: 'トマトをのせたトーストが皿に盛られている。', zh: '一盘抹有番茄的烤面包。' }
    },
    {
      src: 'img/gourmet/barcelona-prawns-user.jpg',
      caption: { ko: '새우 요리 예시', en: 'Prawn dish example', ja: 'エビ料理の例', zh: '虾类菜品示例' },
      alt: { ko: '소스에 담긴 익힌 새우가 접시에 놓여 있다.', en: 'Cooked prawns in sauce on a plate.', ja: 'ソースをまとったエビ料理が皿に盛られている。', zh: '一盘浸在酱汁中的熟虾。' }
    },
    {
      src: 'img/gourmet/barcelona-jamon-user.jpg',
      caption: { ko: '하몬과 토마토 빵', en: 'Jamón and tomato bread', ja: 'ハモンとトマトパン', zh: '火腿与番茄面包' },
      alt: { ko: '얇게 썬 하몬과 토마토 빵이 한 접시에 놓여 있다.', en: 'Thinly sliced jamón and tomato bread on a plate.', ja: '薄切りのハモンとトマトパンが一皿に盛られている。', zh: '一盘薄切火腿和番茄面包。' }
    },
    {
      src: 'img/gourmet/barcelona-croquetas-user.jpg',
      caption: { ko: '크로케타 예시', en: 'Croquettes example', ja: 'コロッケの例', zh: '可乐饼示例' },
      alt: { ko: '노릇하게 튀긴 크로케타가 접시에 담겨 있고 두 개는 속이 보이게 잘려 있다.', en: 'Golden fried croquettes on a plate, with two cut open to show the filling.', ja: 'きつね色のコロッケが皿に盛られ、2つは中身が見えるように切られている。', zh: '一盘金黄色炸可乐饼，其中两个切开露出馅料。' }
    }
  ];

  const content = {
    ko: {
      title: '바르셀로나 맛집·메뉴·마트 참고 안내',
      badge: '여행 아이디어 · 방문/예약 미확정',
      intro: '아래 식당과 날짜는 선택 가능한 후보입니다. 예약되었거나 확정된 방문으로 표시하지 않습니다. 메뉴·운영시간·가격은 바뀔 수 있으니 방문 전 공식 안내와 지도에서 다시 확인하세요.',
      routeNote: '각 식당의 지도 링크와 함께 숙소 Suites Marina Abapart에서 출발하는 도보 길찾기를 제공합니다. Google 지도에서 현재 경로와 소요 시간을 확인하세요.',
      photoGallery: {
        title: '사용자 제공 메뉴 사진 예시',
        note: '참고용으로 제공된 사진이며 특정 식당에서 촬영했거나 해당 식당의 실제 메뉴·제공 품목을 나타내는 것은 아닙니다.'
      },
      groupCard: {
        title: '타파스 후보: Ciutat Comtal · Vinitus · La Flauta',
        body: '세 브랜드는 La Flauta Group의 공식 브랜드 소개에 함께 나오지만 메뉴가 같다는 뜻은 아닙니다. 공식 소개도 Vinitus는 타파스, La Flauta는 전통 요리·타파스·flautas, Ciutat Comtal은 전통 및 창작 타파스로 각각 구분합니다.',
        label: '여행 가이드가 제안한 메뉴 (현재 메뉴·재고 확인 필요)',
        items: ['Pan con tomate(토마토 빵), gambas al ajillo(마늘 새우), bacalao al allioli de miel(꿀 알리올리 대구), pincho de solomillo(안심 핀초)를 메뉴에 있는지 물어보세요.', '취향에 따라 patatas bravas, huevos cabreados, 닭고기·하몬 크로케타, jamón ibérico도 물어볼 수 있습니다. 이름·조리법·제공 여부는 식당별로 다를 수 있습니다.', 'Ciutat Comtal·Vinitus·La Flauta 각각의 메뉴가 동일하다는 확인은 없습니다. 가까운 지점을 지도에서 고르고 그 지점의 당일 메뉴를 확인하세요.'],
        maps: [['Ciutat Comtal', mapLinks.ciutat], ['Vinitus', mapLinks.vinitus], ['La Flauta', mapLinks.laFlauta]]
      },
      glopCard: {
        title: '카탈루냐 요리 후보: El Glop',
        body: 'El Glop 공식 사이트는 카탈루냐 요리를 소개하고 여러 바르셀로나 지점 정보를 제공합니다. Gaudí·Plaça Catalunya 링크는 후보일 뿐이며, 공식 지점 안내 페이지에서 현재 지점명·주소·영업 여부를 확인하세요.',
        label: '여행 가이드의 메뉴 제안 (공식 최신 메뉴에서 확인되지 않음)',
        items: ['해산물 빠에야·arroz negro(먹물 밥), 숯불 이베리코 돼지갈비와 흰콩을 메뉴에 있는지 물어볼 수 있습니다.', '메뉴, 가격, 제공량·주문 조건은 지점과 날짜에 따라 달라질 수 있습니다. 도보 시간이나 특정 지점의 운영시간은 여기서 확정하지 않습니다.'],
        maps: [['El Glop Gaudí', mapLinks.elGlopGaudi], ['El Glop Plaça Catalunya', mapLinks.elGlopPlaca]]
      },
      seafoodCard: {
        title: '해산물 후보: Puertecillo Sagrada Família',
        body: '공식 안내는 셀프서비스 방식이라고 설명합니다. 가격은 품목에 따라 무게 또는 개수 기준이며, 먹고 싶은 양을 고르는 방식이라고 안내합니다. 지점 주소는 Passatge de Simò 18, 08025 Barcelona입니다. 이 주소만으로 숙소까지의 도보 시간을 보장할 수는 없으니 현재 지도 경로를 확인하세요.',
        label: '가이드 제안 메뉴 (현재 진열·가격 확인 필요)',
        items: ['새우, 가리비, 맛조개(navajas), 문어, 꼴뚜기, 홍합 요리를 물어볼 수 있지만 당일 판매와 조리 방식은 보장되지 않습니다.', '주문 전에 품목별 단위(중량/개수), 수량, 총액을 직원에게 확인하세요. 사이드 선택·계산·수령 절차는 현장 안내를 따르세요.', '운영시간과 가격은 바뀔 수 있으므로 공식 지점 안내와 당일 정보를 확인하세요. 제안된 메뉴 페이지에서는 현재 품목·가격을 확인하지 못했습니다.'],
        maps: [['Puertecillo Sagrada Família', mapLinks.puertecillo]]
      },
      orderCard: {
        title: '주문 표현과 음료',
        body: '“Sin sal, por favor”는 “소금 없이 주세요”라는 뜻입니다. 소금을 완전히 빼기보다 적게 넣어 달라는 뜻이라면 “Con poca sal, por favor”라고 하세요.',
        label: '음료는 선택 사항이며 알코올 여부를 확인하세요',
        items: ['Clara는 맥주와 레몬 탄산음료를 섞은 술이고, tinto de verano는 레드와인에 탄산음료를 섞은 술입니다. 둘 다 알코올 음료이며 저도수·무알코올이라고 단정하지 않습니다.', '원하면 물·탄산수·일반 탄산음료 같은 무알코올 대안을 고르세요. Cava도 스파클링 와인이므로 알코올을 원할 때만 선택하세요.']
      },
      datesTitle: '선택 가능한 방문 후보일',
      datesText: '11월 6일 또는 7일은 타파스·El Glop, 11월 9일 또는 10일은 Puertecillo를 고려할 수 있습니다. 11월 10일에는 15:30 사그라다 파밀리아 입장 예약이 확정되어 있으므로 관람 종료 시각과 식당 영업시간을 확인하세요. 식당 방문은 제안일 뿐이며 예약·확정된 일정이 아닙니다.',
      shoppingTitle: '마트에서 살펴볼 수 있는 것',
      shopping: [
        ['Estrella Damm Inedit', 'Damm이 Ferran Adrià 및 elBulli 소믈리에 팀과 만든 4.8% 맥주입니다. 샴페인이 아니며 가격·용량은 매장별로 다릅니다.'],
        ['Manzanilla sabor a miel', 'Mercadona 온라인 상품에는 Hacendado 꿀맛 카모마일 인퓨전(감미료 포함)이 올라와 있습니다. 실제 꿀 함유나 Mercadona 독점 판매, 현재 매장 재고·가격을 뜻하지 않습니다.'],
        ['올리브오일·스프레이', '비에어로졸 일반 식용유와 에어로졸 스프레이는 규정이 다릅니다. 불꽃 표시가 없다는 이유만으로 스프레이 반입 가능 여부를 판단하지 마세요.']
      ],
      baggageTitle: '비행기 수하물 주의',
      baggageText: 'FAA 기준상 비가연성·비에어로졸 식용유는 기내/위탁 수하물에 허용되지만, 미국 TSA 보안검색의 기내 액체는 용기당 100mL 제한을 받습니다. FAA는 가연성 추진제를 쓰는 오일 에어로졸을 기내·위탁 모두 금지하고, TSA는 조리용 스프레이를 두 수하물 모두 허용하지 않는다고 안내합니다. 제품의 추진제·분류를 모르면 허용이라고 가정하지 말고 실제 운항 항공사와 출발 공항의 최신 규정을 확인하세요. 미국 FAA/TSA 기준이 모든 국제선에 자동 적용되는 것은 아닙니다.',
      sourcesTitle: '공식 확인 자료',
      chat: '🍽️ 바르셀로나 식당은 방문 후보이며 예약/확정된 일정이 아닙니다. Ciutat Comtal·Vinitus·La Flauta는 같은 그룹의 브랜드로 소개되지만 메뉴가 동일하다는 근거는 없습니다. 가이드가 제안한 pan con tomate, gambas al ajillo, 꿀 알리올리 대구, 안심 핀초 등은 현재 메뉴에서 확인하세요. El Glop의 빠에야·숯불 이베리코 갈비도 당일 메뉴에 있는지 물어보세요. Puertecillo는 공식 안내상 셀프서비스이며 품목별 무게 또는 개수 기준 가격입니다. 가격·운영시간·숙소 경로는 방문 전 확인하세요. “Sin sal, por favor”는 무염, “Con poca sal, por favor”는 소금을 적게 넣어 달라는 뜻입니다. Clara와 tinto de verano는 알코올 음료입니다. 11월 6·7·9·10일은 제안 후보일뿐 예약일이 아닙니다. 11월 10일 15:30 사그라다 파밀리아 관람 후 방문한다면 종료 시각과 영업시간을 먼저 확인하세요.'
    },
    en: {
      title: 'Barcelona dining, menus and shopping guide',
      badge: 'Trip ideas · no restaurant visit or booking confirmed',
      intro: 'Restaurants and dates below are optional candidates, not confirmed visits or reservations. Menus, hours and prices can change; check the venue’s current official information and map before going.',
      routeNote: 'Each restaurant has a map link and a walking route from Suites Marina Abapart. Check the live route and travel time in Google Maps.',
      photoGallery: {
        title: 'User-provided menu photo examples',
        note: 'These are illustrative photos provided by the user; they are not identified as photos taken at, or as dishes actually served by, any particular restaurant.'
      },
      groupCard: {
        title: 'Tapas options: Ciutat Comtal · Vinitus · La Flauta',
        body: 'The three brands appear in La Flauta Group’s official portfolio, but that does not mean they share one menu. The group describes Vinitus as tapas, La Flauta as traditional dishes, tapas and flautas, and Ciutat Comtal as traditional and creative tapas.',
        label: 'Dishes suggested by the tour guide (check the current menu and availability)',
        items: ['Ask whether pan con tomate (tomato bread), gambas al ajillo (garlic prawns), bacalao al allioli de miel (cod with honey allioli), or a pincho de solomillo (beef-tenderloin skewer/toast) is available.', 'You could also ask about patatas bravas, huevos cabreados, chicken-and-ham croquettes, or jamón ibérico. Names, preparation and availability may vary by restaurant.', 'There is no confirmation that Ciutat Comtal, Vinitus and La Flauta have identical menus. Pick a convenient branch on the map and check that branch’s menu for the day.'],
        maps: [['Ciutat Comtal', mapLinks.ciutat], ['Vinitus', mapLinks.vinitus], ['La Flauta', mapLinks.laFlauta]]
      },
      glopCard: {
        title: 'Catalan cuisine option: El Glop',
        body: 'El Glop’s official site presents Catalan cuisine and lists multiple Barcelona locations. The Gaudí and Plaça Catalunya map links are options, not an exhaustive branch list; check the official locations page for current names, addresses and opening status.',
        label: 'Menu ideas from the tour guide (not verified on the latest official menu)',
        items: ['Ask whether seafood paella, arroz negro (squid-ink rice), or charcoal-grilled Iberian pork ribs with white beans is on the menu.', 'Menu, price, portion and ordering terms can vary by location and date. No walking time or branch opening hours are guaranteed here.'],
        maps: [['El Glop Gaudí', mapLinks.elGlopGaudi], ['El Glop Plaça Catalunya', mapLinks.elGlopPlaca]]
      },
      seafoodCard: {
        title: 'Seafood option: Puertecillo Sagrada Família',
        body: 'The official guide describes a self-service system. Prices are by weight and, for some items, by unit; you choose the amount. The branch address is Passatge de Simò 18, 08025 Barcelona. This address alone does not establish the walking time from your accommodation, so check the current map route.',
        label: 'Seafood suggestions from the guide (check the display and prices on the day)',
        items: ['You can ask about prawns, scallops, razor clams (navajas), octopus, squid or mussels, but same-day stock and preparation are not guaranteed.', 'Before ordering, confirm each item’s pricing unit (weight or piece), quantity and total. Follow the staff’s current instructions for sides, payment and collection.', 'Check the official branch information for current hours and prices. The menu page we could access did not expose current items or prices.'],
        maps: [['Puertecillo Sagrada Família', mapLinks.puertecillo]]
      },
      orderCard: {
        title: 'Ordering phrase and drinks',
        body: '“Sin sal, por favor” means “No salt, please.” If you mean less salt rather than none, say “Con poca sal, por favor.”',
        label: 'Drinks are optional; check whether they contain alcohol',
        items: ['A clara mixes beer with fizzy lemonade, and tinto de verano mixes red wine with a fizzy soft drink. Both are alcoholic; do not assume they are low-alcohol or non-alcoholic.', 'Choose water, sparkling water or a soft drink if you prefer a non-alcoholic option. Cava is also sparkling wine, so choose it only if you want alcohol.']
      },
      datesTitle: 'Optional date ideas',
      datesText: 'You could consider tapas or El Glop on November 6 or 7, and Puertecillo on November 9 or 10. Sagrada Família entry is confirmed for November 10 at 15:30, so check the visit end time and restaurant hours first. Restaurant visits are suggestions only; no reservation or restaurant booking is confirmed.',
      shoppingTitle: 'Things to look for at a supermarket',
      shopping: [
        ['Estrella Damm Inedit', 'A 4.8% beer made by Damm with Ferran Adrià and the elBulli sommelier team. It is beer, not champagne; price and bottle size vary by store.'],
        ['Manzanilla sabor a miel', 'Mercadona’s online catalog lists Hacendado honey-flavour chamomile infusion with sweetener. This does not establish actual honey content, exclusive availability at Mercadona, or current local stock or price.'],
        ['Olive oil and spray cans', 'Rules differ for ordinary non-aerosol oil and aerosol sprays. The absence of a flame icon alone does not establish that a spray can be carried.']
      ],
      baggageTitle: 'Airline baggage caution',
      baggageText: 'Under FAA guidance, nonflammable, non-aerosol food oil is allowed in carry-on or checked baggage, while TSA limits carry-on liquids to 100 ml per container at its U.S. checkpoint. FAA guidance prohibits oil aerosols using a flammable propellant in both bags, and TSA lists cooking spray as prohibited in both. If the propellant or product classification is unclear, do not assume it is allowed: check your operating airline and departure airport’s current rules. U.S. FAA/TSA guidance is not an automatic guarantee for every international flight.',
      sourcesTitle: 'Official references',
      chat: '🍽️ Barcelona restaurant visits are suggestions, not confirmed bookings. Ciutat Comtal, Vinitus and La Flauta appear in one group portfolio, but identical menus are not verified. Ask whether the guide’s suggested pan con tomate, garlic prawns, honey-allioli cod or beef-tenderloin pincho is on the current menu. Check for paella or grilled Iberian ribs at El Glop. Puertecillo describes a self-service system with prices by weight or, for some items, by unit. Verify current menu, prices, hours and your route before going. “Sin sal” means no salt; “con poca sal” means less salt. A clara and tinto de verano contain alcohol. November 6, 7, 9 and 10 are candidate dates only, not bookings. If considering Puertecillo after the confirmed 15:30 Sagrada Família entry on November 10, check the end time and opening hours first.'
    },
    ja: {
      title: 'バルセロナの食事・メニュー・買い物ガイド',
      badge: '旅行候補 · 飲食店の訪問・予約は未確定',
      intro: '以下の店舗や日付は任意の候補で、訪問や予約が確定したものではありません。メニュー・営業時間・価格は変更されるため、出発前に店舗の最新公式情報と地図を確認してください。',
      routeNote: '各店の地図リンクに加え、Suites Marina Abapartからの徒歩ルートを開けます。現在のルートと所要時間はGoogleマップで確認してください。',
      photoGallery: {
        title: 'ユーザー提供の料理写真（イメージ）',
        note: '参考用としてユーザーが提供した写真です。特定の飲食店で撮影された写真、またはその店で実際に提供される料理を示すものではありません。'
      },
      groupCard: {
        title: 'タパス候補：Ciutat Comtal · Vinitus · La Flauta',
        body: '3ブランドはLa Flauta Groupの公式ブランド紹介に掲載されていますが、同じメニューという意味ではありません。公式説明では、Vinitusはタパス、La Flautaは伝統料理・タパス・flautas、Ciutat Comtalは伝統的・創作タパスとしてそれぞれ紹介されています。',
        label: 'ツアーガイド提案の料理（当日のメニュー・提供状況を確認）',
        items: ['pan con tomate（トマトパン）、gambas al ajillo（エビのガーリックオイル煮）、bacalao al allioli de miel（ハニーアイオリのタラ）、pincho de solomillo（牛ヒレ肉のピンチョ）があるか尋ねてみてください。', 'patatas bravas、huevos cabreados、鶏肉とハモンのコロッケ、jamón ibéricoも候補です。名称・調理法・提供状況は店舗ごとに異なる場合があります。', '3店のメニューが同一であるとの確認はありません。地図で便利な店舗を選び、その店舗の当日メニューを確認してください。'],
        maps: [['Ciutat Comtal', mapLinks.ciutat], ['Vinitus', mapLinks.vinitus], ['La Flauta', mapLinks.laFlauta]]
      },
      glopCard: {
        title: 'カタルーニャ料理の候補：El Glop',
        body: 'El Glop公式サイトはカタルーニャ料理を紹介し、バルセロナの複数店舗を掲載しています。Gaudí・Plaça Catalunyaの地図リンクは候補で、全店舗の一覧ではありません。現在の店名・住所・営業状況は公式店舗案内で確認してください。',
        label: 'ツアーガイド提案の料理（最新公式メニューで未確認）',
        items: ['シーフードパエリア、arroz negro（イカ墨ご飯）、白いんげん豆添えの炭火焼きイベリコ豚リブがあるか尋ねてみてください。', 'メニュー、価格、量や注文条件は店舗・日付によって異なります。徒歩所要時間や各店の営業時間はここでは保証しません。'],
        maps: [['El Glop Gaudí', mapLinks.elGlopGaudi], ['El Glop Plaça Catalunya', mapLinks.elGlopPlaca]]
      },
      seafoodCard: {
        title: 'シーフードの候補：Puertecillo Sagrada Família',
        body: '公式案内ではセルフサービス方式です。価格は品目によって重量単位、または一部は個数単位で、食べたい量を選ぶと説明されています。店舗住所はPassatge de Simò 18, 08025 Barcelonaです。この住所だけでは宿泊先からの徒歩時間は確定できないため、最新の地図ルートを確認してください。',
        label: 'ガイド提案の魚介（当日の品ぞろえ・価格を確認）',
        items: ['エビ、ホタテ、マテ貝（navajas）、タコ、イカ、ムール貝を尋ねることはできますが、当日の在庫や調理方法は保証されません。', '注文前に各品目の価格単位（重量・個数）、量、合計金額を確認してください。サイド、支払い、受け取りは現地スタッフの案内に従ってください。', '営業時間と価格は公式店舗案内で再確認してください。今回確認できたメニューページでは最新の品目・価格を確認できませんでした。'],
        maps: [['Puertecillo Sagrada Família', mapLinks.puertecillo]]
      },
      orderCard: {
        title: '注文フレーズと飲み物',
        body: '「Sin sal, por favor」は「塩なしでお願いします」という意味です。塩を完全に抜くのではなく「少なめ」にしたい場合は「Con poca sal, por favor」と伝えます。',
        label: '飲み物は任意です。アルコールの有無を確認してください',
        items: ['claraはビールと炭酸レモネード、tinto de veranoは赤ワインと炭酸飲料を合わせたお酒です。どちらもアルコール飲料で、低アルコール・ノンアルコールとは限りません。', 'ノンアルコールなら水、炭酸水、ソフトドリンクを選べます。Cavaもスパークリングワインなので、アルコールを希望する場合だけ選んでください。']
      },
      datesTitle: '任意の日程候補',
      datesText: '11月6日または7日はタパス・El Glop、11月9日または10日はPuertecilloを候補にできます。11月10日15:30のサグラダ・ファミリア入場は確定しているため、見学終了時刻と店舗営業時間を先に確認してください。飲食店訪問は提案のみで、予約・確定した予定ではありません。',
      shoppingTitle: 'スーパーで探せる商品',
      shopping: [
        ['Estrella Damm Inedit', 'DammがFerran AdriàとelBulliのソムリエチームと作ったアルコール度数4.8%のビールです。シャンパンではありません。価格・容量は店舗によって異なります。'],
        ['Manzanilla sabor a miel', 'Mercadonaのオンライン商品一覧には、甘味料入りHacendadoのはちみつ風味カモミールティーが掲載されています。実際にはちみつが入っていること、Mercadona限定販売、現地の在庫・価格までは確認できません。'],
        ['オリーブオイルとスプレー', '通常の非エアゾール油とエアゾールスプレーでは規則が異なります。炎のマークがないだけでスプレー缶を持ち込めるとは判断しないでください。']
      ],
      baggageTitle: '航空機の手荷物に関する注意',
      baggageText: 'FAAの案内では、非可燃性・非エアゾールの食用油は機内・預け入れ荷物に持ち込めますが、米国TSAの検査では機内液体は容器1個あたり100ml以下です。FAAは可燃性推進剤を使う油のエアゾールを機内・預け入れとも禁止し、TSAはクッキングスプレーをどちらの荷物にも認めていません。推進剤や製品区分が不明なら許可と考えず、実際に利用する航空会社と出発空港の最新規則を確認してください。米国のFAA/TSA案内がすべての国際線に自動適用されるわけではありません。',
      sourcesTitle: '公式情報',
      chat: '🍽️ バルセロナの飲食店は候補で、予約・確定予定ではありません。Ciutat Comtal・Vinitus・La Flautaは同じグループのブランド紹介に載っていますが、同一メニューとは確認できません。ガイド提案のpan con tomate、エビのガーリックオイル煮、ハニーアイオリのタラ、牛ヒレのピンチョなどは当日メニューで確認してください。El Glopのパエリアやイベリコ豚リブも提供状況を尋ねてください。Puertecilloは公式案内上セルフサービスで、重量または一部個数単位の価格です。メニュー、価格、営業時間、宿からのルートを確認してから訪問しましょう。「Sin sal」は塩なし、「Con poca sal」は塩少なめです。claraとtinto de veranoはアルコール飲料です。11月6・7・9・10日は候補日で、予約日ではありません。11月10日15:30のサグラダ・ファミリア見学後に行くなら、終了時刻と営業時間を先に確認してください。'
    },
    zh: {
      title: '巴塞罗那餐厅、菜单与购物参考',
      badge: '旅行建议 · 餐厅行程/预订尚未确认',
      intro: '以下餐厅和日期仅供选择，并非已确认的行程或预订。菜单、营业时间和价格可能变化，请出发前查看店家最新官方信息和地图。',
      routeNote: '每家餐厅都提供地图链接，以及从 Suites Marina Abapart 出发的步行路线。请在 Google 地图中查看实时路线和耗时。',
      photoGallery: {
        title: '用户提供的菜品示意照片',
        note: '这些是用户提供的参考照片，不表示照片拍摄于某家特定餐厅，也不代表该餐厅实际供应这些菜品。'
      },
      groupCard: {
        title: 'Tapas 备选：Ciutat Comtal · Vinitus · La Flauta',
        body: '这三个品牌都出现在 La Flauta Group 的官方品牌介绍中，但这不代表它们使用同一份菜单。官方分别将 Vinitus 描述为 tapas，La Flauta 描述为传统菜、tapas 和 flautas，Ciutat Comtal 则提供传统及创意 tapas。',
        label: '导游建议的菜品（请确认当日菜单与供应情况）',
        items: ['可询问是否有 pan con tomate（番茄面包）、gambas al ajillo（蒜香虾）、bacalao al allioli de miel（蜂蜜蒜泥蛋黄酱鳕鱼）或 pincho de solomillo（牛里脊串/面包小吃）。', '也可询问 patatas bravas、huevos cabreados、鸡肉火腿可乐饼或 jamón ibérico。各店的菜名、做法和供应情况可能不同。', '目前没有证据证明 Ciutat Comtal、Vinitus 和 La Flauta 菜单完全相同。请在地图上选择方便的门店，并查看该店当天菜单。'],
        maps: [['Ciutat Comtal', mapLinks.ciutat], ['Vinitus', mapLinks.vinitus], ['La Flauta', mapLinks.laFlauta]]
      },
      glopCard: {
        title: '加泰罗尼亚菜备选：El Glop',
        body: 'El Glop 官方网站介绍加泰罗尼亚菜，并列有巴塞罗那多个门店。Gaudí 和 Plaça Catalunya 地图链接只是候选，并非完整门店名单；请在官方门店页面核对现有店名、地址和营业情况。',
        label: '导游建议的菜品（未能从最新官方菜单确认）',
        items: ['可询问是否供应海鲜饭、arroz negro（墨鱼汁饭），或配白豆的炭烤伊比利亚猪肋排。', '菜单、价格、份量和点餐条件会因门店和日期而异。这里不保证步行时间或具体门店营业时间。'],
        maps: [['El Glop Gaudí', mapLinks.elGlopGaudi], ['El Glop Plaça Catalunya', mapLinks.elGlopPlaca]]
      },
      seafoodCard: {
        title: '海鲜备选：Puertecillo Sagrada Família',
        body: '官方介绍称其采用自助式服务。价格按重量计算，部分商品按件计价，顾客自行选择数量。该门店地址为 Passatge de Simò 18, 08025 Barcelona。仅凭这个地址无法确认到住宿的步行时间，请查看最新地图路线。',
        label: '导游建议的海鲜（请确认当天品种与价格）',
        items: ['可询问虾、扇贝、蛏子（navajas）、章鱼、鱿鱼或贻贝，但不保证当天有货或采用所述做法。', '下单前确认每种海鲜的计价单位（按重量或按件）、数量和总价。配菜、付款和取餐方式请遵循现场员工说明。', '营业时间和价格请查看官方门店信息。此次可访问的菜单页面未显示当前菜品和价格。'],
        maps: [['Puertecillo Sagrada Família', mapLinks.puertecillo]]
      },
      orderCard: {
        title: '点餐用语与饮品',
        body: '“Sin sal, por favor”意思是“请不要放盐”。如果是要少放盐、而不是完全不放，可以说“Con poca sal, por favor”。',
        label: '饮品可选；点单前确认是否含酒精',
        items: ['Clara 是啤酒加气泡柠檬饮料，tinto de verano 是红葡萄酒加气泡饮料；两者都含酒精，不应默认它们酒精度低或不含酒精。', '不想饮酒可选择水、气泡水或软饮料。Cava 也是起泡葡萄酒，仅在想喝酒时选择。']
      },
      datesTitle: '可选日期建议',
      datesText: '可考虑在 11 月 6 日或 7 日吃 tapas 或去 El Glop，11 月 9 日或 10 日考虑 Puertecillo。11 月 10 日 15:30 的圣家堂入场已确认，因此请先核对参观结束时间和餐厅营业时间。餐厅只是建议，并非已确认行程或已预订。',
      shoppingTitle: '超市可留意的商品',
      shopping: [
        ['Estrella Damm Inedit', '由 Damm、Ferran Adrià 和 elBulli 品酒师团队共同打造的 4.8% 啤酒，不是香槟。价格和瓶装规格因商店而异。'],
        ['Manzanilla sabor a miel', 'Mercadona 在线商品目录列有 Hacendado 蜂蜜风味甘菊茶（含甜味剂）。这并不能证明含有真正的蜂蜜、仅在 Mercadona 独家销售，或当地门店有现货/当前价格。'],
        ['橄榄油与喷雾罐', '普通非气雾式食用油和气雾喷雾的规定不同。不能仅凭没有火焰标志，就判断喷雾罐可以携带。']
      ],
      baggageTitle: '航空行李提示',
      baggageText: '按 FAA 指引，非易燃、非气雾式食用油可放在随身或托运行李中；但在美国 TSA 安检处，随身液体每个容器限 100 毫升。FAA 禁止使用易燃推进剂的油类气雾剂放入随身或托运行李，TSA 也将烹饪喷雾列为两类行李都禁止。若不清楚推进剂或产品分类，不要假设可以携带；请核对实际承运航空公司和出发机场的最新规定。美国 FAA/TSA 指引不自动适用于所有国际航班。',
      sourcesTitle: '官方资料',
      chat: '🍽️ 巴塞罗那餐厅只是备选，并非已确认预订。Ciutat Comtal、Vinitus 和 La Flauta 出现在同一集团的品牌介绍中，但没有证据表明菜单相同。请核对导游建议的番茄面包、蒜香虾、蜂蜜蒜泥蛋黄酱鳕鱼和牛里脊小吃是否在当日菜单上；也可询问 El Glop 是否供应海鲜饭或烤伊比利亚猪肋排。Puertecillo 官方介绍为自助式，价格按重量或部分按件计算。出发前确认菜单、价格、营业时间和住宿路线。“Sin sal”是不要盐，“Con poca sal”是少放盐。Clara 和 tinto de verano 都含酒精。11 月 6、7、9、10 日只是建议日期，并未预订。如计划在 11 月 10 日 15:30 圣家堂参观后去餐厅，请先核对参观结束时间和营业时间。'
    }
  };

  function normalizeLang(lang) {
    return Object.prototype.hasOwnProperty.call(content, lang) ? lang : 'ko';
  }

  function linkList(items, lang, className) {
    return (items || []).map(item => `<a class="${className || 'bcn-link'}" href="${item.url}" target="_blank" rel="noopener noreferrer">${item.label[lang]}</a>`).join('');
  }

  function renderRestaurantLinks(items, lang) {
    const labels = mapActionLabels[lang] || mapActionLabels.ko;
    return `<div class="bcn-map-links">${items.map(([name, url]) => `<a class="bcn-link" href="${url}" target="_blank" rel="noopener noreferrer">${name} · ${labels.map} ↗</a><a class="bcn-link" href="${buildWalkingDirections(routeDestinations[name])}" target="_blank" rel="noopener noreferrer">${name} · ${labels.route} ↗</a>`).join('')}</div>`;
  }

  function renderCard(card, lang, extraClass) {
    return `<article class="bcn-card ${extraClass || ''}"><h3>${card.title}</h3><p>${card.body}</p>${card.label ? `<h4>${card.label}</h4>` : ''}${card.items ? `<ul>${card.items.map(item => `<li>${item}</li>`).join('')}</ul>` : ''}${card.maps ? renderRestaurantLinks(card.maps, lang) : ''}</article>`;
  }

  function renderFoodPhotoGallery(gallery, lang) {
    return `<section class="bcn-photo-gallery" aria-labelledby="bcn-photo-gallery-title"><h3 id="bcn-photo-gallery-title">${gallery.title}</h3><p class="bcn-photo-note">${gallery.note}</p><div class="bcn-photo-grid">${foodPhotoAssets.map(photo => `<figure class="bcn-photo-figure"><img src="${photo.src}" alt="${photo.alt[lang]}" loading="lazy" decoding="async"><figcaption>${photo.caption[lang]}</figcaption></figure>`).join('')}</div></section>`;
  }

  function ensureStyles() {
    if (document.getElementById('bcn-dining-guide-styles')) return;
    const style = document.createElement('style');
    style.id = 'bcn-dining-guide-styles';
    style.textContent = `
      .bcn-guide{margin:0 0 30px;padding:22px;border:1px solid var(--line,#e5e5e5);border-radius:18px;background:var(--card,#fff);color:var(--ink,#222);box-shadow:0 8px 24px rgba(25,35,30,.06)}
      .bcn-guide h2{margin:0 0 8px;font-size:clamp(21px,3vw,28px);line-height:1.25}
      .bcn-guide .bcn-badge{display:inline-flex;margin:0 0 12px;padding:6px 10px;border-radius:999px;background:#fff4de;color:#795519;font-size:12px;font-weight:700}
      .bcn-guide .bcn-intro{margin:0 0 18px;color:var(--muted,#666);line-height:1.65}
      .bcn-route-note{margin:0 0 16px;color:var(--muted,#666);font-size:13px;line-height:1.6}
      .bcn-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,290px),1fr));gap:14px}
      .bcn-card{padding:16px;border:1px solid var(--line,#e5e5e5);border-radius:14px;background:var(--surface,#fbfbf9);line-height:1.62}
      .bcn-card h3{margin:0 0 8px;font-size:17px;line-height:1.35}
      .bcn-card h4{margin:14px 0 5px;font-size:13px;color:var(--muted,#666)}
      .bcn-card p{margin:0;color:var(--muted,#555)}
      .bcn-card ul{margin:7px 0 0;padding-left:20px}
      .bcn-card li{margin:7px 0}
      .bcn-map-links{display:flex;flex-wrap:wrap;gap:8px;margin-top:13px}
      .bcn-link{display:inline-flex;align-items:center;gap:4px;color:var(--accent,#246b58);font-size:12px;font-weight:700;text-decoration:underline;text-underline-offset:2px}
      .bcn-info{margin-top:14px;padding:15px;border-radius:14px;background:var(--surface,#f6f7f4);line-height:1.65}
      .bcn-info h3{margin:0 0 7px;font-size:16px}
      .bcn-info p{margin:0;color:var(--muted,#555)}
      .bcn-shopping{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,230px),1fr));gap:10px;margin-top:9px}
      .bcn-shopping div{padding:12px;border:1px solid var(--line,#e5e5e5);border-radius:12px;background:var(--card,#fff)}
      .bcn-shopping strong{display:block;margin-bottom:5px}
      .bcn-safety{border-left:4px solid #c77b20;background:#fff8ee}
      .bcn-sources{display:flex;flex-wrap:wrap;gap:9px 14px;margin-top:10px}
      .bcn-chat-answer{line-height:1.65}
      .bcn-photo-gallery{margin:0 0 18px;padding:14px;border:1px solid var(--line,#e5e5e5);border-radius:14px;background:var(--surface,#fbfbf9)}
      .bcn-photo-gallery h3{margin:0 0 5px;font-size:16px;line-height:1.4}
      .bcn-photo-note{margin:0 0 12px;color:var(--muted,#666);font-size:12px;line-height:1.55}
      .bcn-photo-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:10px}
      .bcn-photo-figure{min-width:0;margin:0;overflow:hidden;border:1px solid var(--line,#e5e5e5);border-radius:11px;background:var(--card,#fff)}
      .bcn-photo-figure img{display:block;width:100%;height:170px;object-fit:contain;background:#f2efe9}
      .bcn-photo-figure figcaption{padding:8px 9px;font-size:12px;font-weight:700;line-height:1.4}
      @media(max-width:760px){.bcn-photo-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.bcn-photo-figure img{height:150px}}
      @media(max-width:600px){.bcn-guide{padding:16px;border-radius:15px}.bcn-card{padding:14px}.bcn-photo-gallery{padding:12px}.bcn-photo-figure img{height:140px}.bcn-photo-figure figcaption{padding:7px;font-size:11px}}
    `;
    document.head.appendChild(style);
  }

  function renderBarcelonaDiningGuide(lang) {
    const mount = document.getElementById('barcelona-dining-guide-mount');
    if (!mount) return;
    const l = normalizeLang(lang || window.currentLang || localStorage.getItem('travel_user_lang'));
    const c = content[l];
    ensureStyles();
    mount.innerHTML = `<section class="bcn-guide" aria-labelledby="bcn-guide-title"><span class="bcn-badge">${c.badge}</span><h2 id="bcn-guide-title">${c.title}</h2><p class="bcn-intro">${c.intro}</p><p class="bcn-route-note">${c.routeNote}</p>${renderFoodPhotoGallery(c.photoGallery, l)}<div class="bcn-grid">${renderCard(c.groupCard, l)}${renderCard(c.glopCard, l)}${renderCard(c.seafoodCard, l)}${renderCard(c.orderCard, l)}</div><div class="bcn-info"><h3>${c.datesTitle}</h3><p>${c.datesText}</p></div><div class="bcn-info"><h3>${c.shoppingTitle}</h3><div class="bcn-shopping">${c.shopping.map(([title, text]) => `<div><strong>${title}</strong><span>${text}</span></div>`).join('')}</div></div><div class="bcn-info bcn-safety"><h3>${c.baggageTitle}</h3><p>${c.baggageText}</p></div><div class="bcn-info"><h3>${c.sourcesTitle}</h3><div class="bcn-sources">${linkList(sourceLinks, l)}</div></div></section>`;
  }

  function buildBarcelonaDiningChatResponse(lang) {
    const l = normalizeLang(lang);
    const c = content[l];
    const restaurantMaps = [...c.groupCard.maps, ...c.glopCard.maps, ...c.seafoodCard.maps];
    return `<div class="bcn-chat-answer">${c.chat}<p class="bcn-route-note">${c.routeNote}</p>${renderRestaurantLinks(restaurantMaps, l)}<div class="bcn-sources">${linkList(sourceLinks.slice(0, 4), l, 'bcn-link')}</div></div>`;
  }

  window.BARCELONA_DINING_GUIDE = { content, sourceLinks, mapLinks, buildWalkingDirections };
  window.renderBarcelonaDiningGuide = renderBarcelonaDiningGuide;
  window.buildBarcelonaDiningChatResponse = buildBarcelonaDiningChatResponse;
  document.addEventListener('DOMContentLoaded', () => renderBarcelonaDiningGuide(window.currentLang || localStorage.getItem('travel_user_lang') || 'ko'));
})();
