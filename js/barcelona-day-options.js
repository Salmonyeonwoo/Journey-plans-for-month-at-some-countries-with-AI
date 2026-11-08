/* Optional Barcelona slow-day themes. Extends the existing local guide without
 * adding duplicate attraction/venue records or changing confirmed itinerary data.
 */
(function () {
  'use strict';

  const guide = window.BARCELONA_LOCAL_GUIDE;
  if (!guide || !guide.content || !guide.sources) return;

  const sources = {
    santPauVisit: {
      url: 'https://santpaubarcelona.org/en/visita/visita-lliure/',
      names: { ko: '산트 파우 공식 자유 관람·시간·요금', en: 'Sant Pau official self-guided visit, hours & tickets', ja: 'サン・パウ公式自由見学・時間・料金', zh: '圣保罗官方自由参观·时间·门票' }
    },
    santPauAccess: {
      url: 'https://santpaubarcelona.org/en/prepara-la-teva-visita/',
      names: { ko: '산트 파우 공식 접근성·방문 준비', en: 'Sant Pau official accessibility & visit planning', ja: 'サン・パウ公式アクセシビリティ・訪問準備', zh: '圣保罗官方无障碍与参观准备' }
    },
    santPauMap: {
      url: 'https://www.google.com/maps/dir/?api=1&origin=Suites+Marina+Abapart,+Carrer+de+la+Marina,+306,+08025+Barcelona&destination=Recinte+Modernista+de+Sant+Pau,+Carrer+de+Sant+Antoni+Maria+Claret,+167,+08025+Barcelona&travelmode=walking',
      names: { ko: 'Google 지도 · 숙소에서 산트 파우 도보 경로', en: 'Google Maps · Walk from Suites Marina Abapart', ja: 'Googleマップ · 宿泊先からサン・パウへの徒歩', zh: 'Google地图 · 从住宿步行至圣保罗' }
    },
    boqueriaMarket: {
      url: 'https://www.boqueria.barcelona/market-boqueria',
      names: { ko: '보케리아 시장 공식 운영 안내', en: 'La Boqueria official market information', ja: 'ボケリア市場公式案内', zh: '博盖利亚市场官方信息' }
    },
    boqueriaCity: {
      url: 'https://www.meet.barcelona/en/visit-and-love-it/points-interest-city/mercat-boqueria-sant-josep-92086009447',
      names: { ko: '바르셀로나 시 관광 안내 · 보케리아', en: 'Barcelona city guide · La Boqueria', ja: 'バルセロナ市観光案内・ボケリア', zh: '巴塞罗那市旅游指南·博盖利亚' }
    },
    boqueriaServices: {
      url: 'https://www.boqueria.barcelona/services',
      names: { ko: '보케리아 공식 서비스·화장실 안내', en: 'La Boqueria official services & toilets', ja: 'ボケリア公式サービス・トイレ案内', zh: '博盖利亚官方服务与洗手间信息' }
    },
    elQuimMenu: {
      url: 'https://elquimdelaboqueria.com/menu-2?lang=en',
      names: { ko: 'El Quim de la Boqueria · 메뉴', en: 'El Quim de la Boqueria · Menu', ja: 'El Quim de la Boqueria · メニュー', zh: 'El Quim de la Boqueria · 菜单' }
    },
    boqueriaAccess: {
      url: 'https://wheelieguides.com/en/barcelona/attractions/la-boqueria/',
      names: { ko: 'WheelieGuides · 보케리아 이동·접근 정보', en: 'WheelieGuides · Boqueria access notes', ja: 'WheelieGuides・ボケリアのアクセス情報', zh: 'WheelieGuides·博盖利亚通行信息' }
    },
    boqueriaCrowds: {
      url: 'https://bethgraham.com/la-boqueria-market-in-barcelona/',
      names: { ko: 'Beth Graham · 보케리아 방문·좌석 참고', en: 'Beth Graham · Boqueria visit and seating notes', ja: 'Beth Graham・ボケリア訪問・座席情報', zh: 'Beth Graham·博盖利亚参观与座位参考' }
    },
    gothicTourism: {
      url: 'https://bid.barcelonaturisme.com/wv3/en/page/376/barri-gotic.html',
      names: { ko: '바르셀로나 관광청 · 고딕 지구', en: 'Barcelona Tourism · Gothic Quarter', ja: 'バルセロナ観光局・ゴシック地区', zh: '巴塞罗那旅游局·哥特区' }
    },
    santJaume: {
      url: 'https://bid.barcelonaturisme.com/wv3/en/page/1245/placa-sant-jaume.html',
      names: { ko: '바르셀로나 관광청 · Plaça Sant Jaume', en: 'Barcelona Tourism · Plaça Sant Jaume', ja: 'バルセロナ観光局・Plaça Sant Jaume', zh: '巴塞罗那旅游局·Plaça Sant Jaume' }
    },
    placaRei: {
      url: 'https://meet.barcelona.cat/en/discover-barcelona/districts/ciutat-vella/placa-del-rei',
      names: { ko: '바르셀로나 시 · Plaça del Rei 방문·접근 안내', en: 'Barcelona city · Plaça del Rei visitor/access information', ja: 'バルセロナ市・Plaça del Reiの見学・アクセス情報', zh: '巴塞罗那市·Plaça del Rei参观与通行信息' }
    },
    gothicSafety: {
      url: 'https://www.barcelona.cat/infobarcelona/en/tema/security-and-prevention/crime-figures-for-the-city-in-2023_1371745.html',
      names: { ko: '바르셀로나 시청 · 2023년 도시 범죄 통계', en: 'Barcelona City Council · 2023 city crime figures', ja: 'バルセロナ市・2023年市内犯罪統計', zh: '巴塞罗那市政府·2023年城市犯罪数据' }
    },
    sabaterStore: {
      url: 'https://sabaterhnos.com/en/pages/contact',
      names: { ko: 'Sabater Hnos. 공식 매장·주소·영업시간', en: 'Sabater Hnos. official store, address & hours', ja: 'Sabater Hnos.公式店舗・住所・営業時間', zh: 'Sabater Hnos.官方门店、地址与营业时间' }
    },
    sabaterProcess: {
      url: 'https://sabaterhnos.com/en/pages/nosotros',
      names: { ko: 'Sabater Hnos. 공식 소개·비누 제작 방식', en: 'Sabater Hnos. official story & soap-making', ja: 'Sabater Hnos.公式紹介・石けん製法', zh: 'Sabater Hnos.官方介绍与制皂方式' }
    },
    laPallaresa: {
      url: 'https://onacg3.wixsite.com/lapallaresa',
      names: { ko: 'Granja La Pallaresa · 장소·운영 안내', en: 'Granja La Pallaresa · venue information', ja: 'Granja La Pallaresa・店舗案内', zh: 'Granja La Pallaresa·店铺信息' }
    },
    laPallaresaMenu: {
      url: 'https://onacg3.wixsite.com/lapallaresa/menus',
      names: { ko: 'Granja La Pallaresa · 게시 메뉴(가격 갱신일 미표시)', en: 'Granja La Pallaresa · posted menu (price date not shown)', ja: 'Granja La Pallaresa・掲載メニュー（価格更新日不明）', zh: 'Granja La Pallaresa·所列菜单（未标价格更新时间）' }
    },
    laPallaresaSuizo: {
      url: 'https://www.granjaixocolaterialapallaresa.com/chocolate-suizo-nata-es.html',
      names: { ko: 'La Pallaresa · suizo 핫초콜릿 설명', en: 'La Pallaresa · suizo hot chocolate description', ja: 'La Pallaresa・suizoホットチョコレート説明', zh: 'La Pallaresa·suizo热巧克力介绍' }
    },
    vicensStores: {
      url: 'https://www.vicens.com/es/tiendas',
      names: { ko: 'Torrons Vicens 공식 매장 목록', en: 'Torrons Vicens official store list', ja: 'Torrons Vicens公式店舗一覧', zh: 'Torrons Vicens官方门店列表' }
    },
    vicensProducts: {
      url: 'https://www.vicens.com/es/nuestros-productos',
      names: { ko: 'Torrons Vicens 공식 뚜론 제품 안내', en: 'Torrons Vicens official turrón products', ja: 'Torrons Vicens公式トゥロン商品案内', zh: 'Torrons Vicens官方牛轧糖产品介绍' }
    }
  };

  Object.assign(guide.sources, sources);

  const sourceIds = Object.keys(sources);
  const mapLinks = {
    ko: [
      { label: '산파우 · 숙소에서 도보 경로', url: sources.santPauMap.url },
      { label: '보케리아 시장 지도', query: 'Mercat de la Boqueria Barcelona' },
      { label: '고딕 지구 · Plaça Sant Jaume 지도', query: 'Plaça Sant Jaume Barcelona Gothic Quarter' },
      { label: 'Sabater Hnos. 지도', query: 'Sabater Hnos Plaça Sant Felip Neri Barcelona' },
      { label: 'La Pallaresa 지도', query: 'Granja La Pallaresa Carrer de Petritxol 11 Barcelona' },
      { label: 'Torrons Vicens · Boqueria 31 지도', query: 'Torrons Vicens Carrer de la Boqueria 31 Barcelona' }
    ],
    en: [
      { label: 'Sant Pau · walking route from the hotel', url: sources.santPauMap.url },
      { label: 'La Boqueria map', query: 'Mercat de la Boqueria Barcelona' },
      { label: 'Gothic Quarter · Plaça Sant Jaume map', query: 'Plaça Sant Jaume Barcelona Gothic Quarter' },
      { label: 'Sabater Hnos. map', query: 'Sabater Hnos Plaça Sant Felip Neri Barcelona' },
      { label: 'La Pallaresa map', query: 'Granja La Pallaresa Carrer de Petritxol 11 Barcelona' },
      { label: 'Torrons Vicens · Boqueria 31 map', query: 'Torrons Vicens Carrer de la Boqueria 31 Barcelona' }
    ],
    ja: [
      { label: 'サン・パウ · 宿泊先から徒歩', url: sources.santPauMap.url },
      { label: 'ボケリア市場 地図', query: 'Mercat de la Boqueria Barcelona' },
      { label: 'ゴシック地区 · Plaça Sant Jaume 地図', query: 'Plaça Sant Jaume Barcelona Gothic Quarter' },
      { label: 'Sabater Hnos. 地図', query: 'Sabater Hnos Plaça Sant Felip Neri Barcelona' },
      { label: 'La Pallaresa 地図', query: 'Granja La Pallaresa Carrer de Petritxol 11 Barcelona' },
      { label: 'Torrons Vicens · Boqueria 31 地図', query: 'Torrons Vicens Carrer de la Boqueria 31 Barcelona' }
    ],
    zh: [
      { label: '圣保罗 · 从住宿步行路线', url: sources.santPauMap.url },
      { label: '博盖利亚市场地图', query: 'Mercat de la Boqueria Barcelona' },
      { label: '哥特区 · Plaça Sant Jaume地图', query: 'Plaça Sant Jaume Barcelona Gothic Quarter' },
      { label: 'Sabater Hnos.地图', query: 'Sabater Hnos Plaça Sant Felip Neri Barcelona' },
      { label: 'La Pallaresa地图', query: 'Granja La Pallaresa Carrer de Petritxol 11 Barcelona' },
      { label: 'Torrons Vicens · Boqueria 31地图', query: 'Torrons Vicens Carrer de la Boqueria 31 Barcelona' }
    ]
  };

  const copy = {
    ko: {
      title: '여유로운 바르셀로나 하루 · 선택형 3테마',
      paragraphs: [
        '1) 산파우 모더니스타 단지: 기존 명소 후보에 이미 등록된 곳입니다. 숙소 Suites Marina Abapart에서 Google 지도 도보 경로는 850–900m, 약 12–13분으로 표시되고 “대체로 평탄”으로 분류되지만 무단차·접근성 보장은 아닙니다. 공식 자유 관람은 약 45–60분, 11월 게시 운영시간은 09:30–17:00(마지막 입장 16:30), 요금은 14시 전 €18·이후 €17입니다. 공식 안내에 입구 접근과 내부 경사로·엘리베이터가 있지만 추천 지하 통로 진입에는 정원 계단이 있으니 이동 조건을 확인하세요.',
        '2) 보케리아 시장 & 람블라스: 시장 정규 시간은 월–토 08:00–20:30이며 일요일은 정규 개장일이 아닙니다. El Quim의 메뉴에는 맛조개 €16이 게시되어 있지만 당일 영업·재고·가격은 보장되지 않습니다. 방문 참고 자료는 좁은 통로, 제한된 카운터 좌석, 늦은 오전 혼잡 가능성을 언급합니다. 공식 서비스 안내에는 화장실이 시장 사무실 건물 지하 1층으로 나오지만 승강기 접근은 확인되지 않았습니다. 주스 €1–2, 하몬+치즈 튀김콘, 11월 납작복숭아는 확인된 현행 근거가 없어 추천 항목에서 뺐습니다.',
        '3) 고딕 지구 & 간식 가게: 관광청이 좁은 골목과 광장이 이어진다고 설명하므로 구역 전체를 걷기보다 Plaça Sant Jaume–Carrer del Bisbe–Plaça del Rei처럼 범위를 정해 현장 여건에 맞춰 짧게 둘러보세요. Sabater Hnos. 공식 매장은 Plaça Sant Felip Neri 1(게시 시간 월–토 11:00–14:00·15:00–20:00, 일 12:00–18:00)이며 수제 비누를 소개합니다. Granja La Pallaresa는 Petritxol 11; 공개 페이지에 월–토 09:00–13:00·16:00–21:00, 일 09:00–13:00·17:00–21:00로 게시되어 있고 suizo는 휘핑크림을 얹은 핫초콜릿으로 설명됩니다. 메뉴 가격은 갱신일이 없어 현행가로 단정하지 않습니다. Torrons Vicens 공식 목록에는 Carrer de la Boqueria 31 등이 있으나 영업시간·시식 제공은 확인되지 않았습니다.'
      ],
      note: '세 테마는 기존 확정 일정을 바꾸지 않는 선택 아이디어입니다. 고딕 지구 전체의 낮 시간 안전, 평탄성, 무단차 동선은 보장할 수 없고 골목별 포장·경사·계단·벤치·공중화장실도 확인되지 않았습니다. 혼잡·당일 영업·메뉴·가격은 출발 전 재확인하고 부모님 컨디션에 맞춰 한 곳만 고르세요.',
      chatChip: '🗓️ 바르셀로나 여유로운 하루 후보',
      chatQuery: '바르셀로나 부모님과 여유로운 하루 코스',
      chatTitle: '바르셀로나 여유로운 하루 후보',
      chatBody: '하루에 한 테마만 고르세요: 산파우(공식 관람 45–60분, 숙소에서 지도상 850–900m), 월–토 운영하는 보케리아 시장, 또는 골목 전체를 돌지 않는 짧은 고딕 지구 산책입니다. 지도 시간·접근성·당일 영업은 현장 상황에 따라 달라질 수 있고, 확정 일정은 변경하지 않습니다.',
      chatLink: '선택형 하루 코스와 출처 보기'
    },
    en: {
      title: 'A relaxed day in Barcelona · 3 optional themes',
      paragraphs: [
        '1) Sant Pau Art Nouveau Site: this attraction is already listed in the existing places guide. Google Maps currently estimates an 850–900 m walk (about 12–13 minutes) from Suites Marina Abapart and labels it “mostly flat”; that is not a step-free or accessibility guarantee. The official self-guided visit takes about 45–60 minutes; its November listing is 09:30–17:00 (last entry 16:30), with tickets listed at €18 before 14:00 and €17 afterward. The official guide describes an accessible entrance, internal ramps and lifts, but its suggested underground passage starts via garden steps, so check which route suits your party.',
        '2) La Boqueria Market & La Rambla: regular market hours are Monday–Saturday, 08:00–20:30; Sunday is not a regular opening day. El Quim’s menu lists razor clams at €16, but today’s operation, stock and price are not guaranteed. Visitor sources note narrow aisles, limited counter seating and possible late-morning crowds. The market’s official service page places its toilets on level -1; elevator access was not confirmed. Claims of €1–2 juice, a ham-and-cheese fried cone or in-season flat peaches in November were not supported by current evidence and are omitted.',
        '3) Gothic Quarter & a snack stop: the tourism office describes a network of narrow lanes and squares, so choose a short stretch such as Plaça Sant Jaume–Carrer del Bisbe–Plaça del Rei rather than assume the whole quarter is easy to walk. Sabater Hnos.’ official store page lists Plaça Sant Felip Neri 1 and hours of Mon–Sat 11:00–14:00 and 15:00–20:00; Sun 12:00–18:00, and describes its handmade soaps. Granja La Pallaresa is at Petritxol 11; public pages list Mon–Sat 09:00–13:00 and 16:00–21:00, Sun 09:00–13:00 and 17:00–21:00. Its suizo is described as hot chocolate topped with whipped cream; the menu’s price date is not shown, so do not treat it as current. Torrons Vicens’ official list includes Carrer de la Boqueria 31, but current hours and in-store tastings are not confirmed.'
      ],
      note: 'These are optional ideas, not changes to confirmed plans. Do not assume the Gothic Quarter is safe by day, flat or step-free throughout; paving, gradients, steps, benches and public toilets were not verified street by street. Recheck crowds, opening, menus and prices before setting out, and choose one area to match your parents’ energy.',
      chatChip: '🗓️ A relaxed day in Barcelona',
      chatQuery: 'Barcelona relaxed day for parents',
      chatTitle: 'A relaxed day in Barcelona',
      chatBody: 'Choose one theme rather than packing in all three: Sant Pau (45–60 minutes for the official visit; 850–900 m on the map from the hotel), La Boqueria (regularly open Mon–Sat), or a short Gothic Quarter stroll instead of covering every lane. Map estimates, access and same-day openings can change; confirmed plans stay as they are.',
      chatLink: 'See the optional day themes and sources'
    },
    ja: {
      title: 'バルセロナでゆったり過ごす一日 · 3つの候補',
      paragraphs: [
        '1）サン・パウ・モダニスタ地区：既存の名所ガイドにも登録済みです。GoogleマップはSuites Marina Abapartから850～900m、約12～13分の徒歩ルートを示し「ほぼ平坦」と表示しますが、段差なし・アクセシブルという保証ではありません。公式セルフガイド見学は約45～60分、11月の掲載時間は09:30～17:00（最終入場16:30）、料金は14時前€18・14時以降€17です。公式案内には入口のアクセス、内部のスロープとエレベーターがありますが、推奨ルートの地下通路へは庭園の階段から入るため、同行者に合う見学範囲を確認してください。',
        '2）ボケリア市場とランブラス通り：市場の通常営業時間は月～土08:00～20:30で、日曜は通常営業日に含まれません。El Quimのメニューにはマテ貝€16が掲載されていますが、当日の営業・在庫・価格は保証されません。訪問情報では通路が狭く、カウンター席が限られ、午前遅めは混雑する可能性があるとされています。公式サービス案内ではトイレは市場事務所の地下1階ですが、エレベーターで行けるかは確認できませんでした。ジュース€1～2、ハモンとチーズの揚げスナック、11月の平たい桃は、現行の根拠が確認できないため掲載していません。',
        '3）ゴシック地区と軽食：観光局は細い路地と広場が続くと説明しているため、地区全体を歩きやすいと想定せず、Plaça Sant Jaume～Carrer del Bisbe～Plaça del Reiなど短い範囲を現地の状況に合わせて選びましょう。Sabater Hnos.公式ページはPlaça Sant Felip Neri 1と営業時間（月～土11:00～14:00・15:00～20:00、日12:00～18:00）を掲載し、手作り石けんを紹介しています。Granja La PallaresaはPetritxol 11にあり、公開ページには月～土09:00～13:00・16:00～21:00、日09:00～13:00・17:00～21:00と掲載されています。suizoはホイップクリームをのせたホットチョコレートと説明されていますが、メニュー価格の更新日は不明です。Torrons Vicensの公式店舗一覧にはCarrer de la Boqueria 31などがありますが、営業時間と店頭試食は確認できません。'
      ],
      note: 'いずれも確定済み予定を変えない任意の候補です。ゴシック地区全体について昼間の安全性、平坦さ、段差のない経路は保証できません。路面・坂・階段・ベンチ・公衆トイレを区間ごとに確認できていないため、混雑・営業・メニュー・価格を出発前に再確認し、ご両親の体調に合わせて一つのエリアを選んでください。',
      chatChip: '🗓️ バルセロナでゆったり過ごす一日',
      chatQuery: 'バルセロナ ご両親とゆったりした一日',
      chatTitle: 'バルセロナでゆったり過ごす一日',
      chatBody: '3つすべてを回るのではなく、一つを選びましょう。サン・パウ（公式見学は約45～60分、宿泊先から地図上で850～900m）、月～土に通常営業するボケリア市場、または路地を全部歩かない短いゴシック地区散策が候補です。地図の所要時間・アクセス・当日の営業は変わることがあり、確定済み予定は変更しません。',
      chatLink: '候補と出典を見る'
    },
    zh: {
      title: '巴塞罗那轻松一日 · 3种可选主题',
      paragraphs: [
        '1）圣保罗现代主义建筑群：原有景点指南中已收录此处。Google地图目前显示，从Suites Marina Abapart步行约850–900米、12–13分钟，并标注“基本平坦”；这不代表全程无台阶或保证无障碍。官方自助参观约45–60分钟；11月公布的开放时间为09:30–17:00（16:30停止入场），门票标价14:00前€18、14:00后€17。官方说明入口可供轮椅通行，内部有坡道和电梯；但建议路线中的地下通道从花园台阶进入，请按同行者情况确认参观范围。',
        '2）博盖利亚市场与兰布拉大道：市场常规开放时间为周一至周六08:00–20:30，周日不属于常规营业日。El Quim菜单列有烤蛏子€16，但不保证当天营业、库存或价格。参观资料提到通道狭窄、柜台座位有限，上午较晚时可能拥挤。市场官方服务页面称洗手间位于市场办公室地下一层；未确认电梯是否可达。现有资料不足以确认1–2欧元果汁、火腿芝士炸小吃或11月仍是扁桃旺季，因此不作推荐承诺。',
        '3）哥特区与小吃店：旅游局介绍此区由狭窄街巷和广场组成，不要假设整个区域都容易步行；可根据现场情况缩短至Plaça Sant Jaume–Carrer del Bisbe–Plaça del Rei一带。Sabater Hnos.官网列出的地址为Plaça Sant Felip Neri 1，营业时间为周一至周六11:00–14:00、15:00–20:00，周日12:00–18:00，并介绍手工皂。Granja La Pallaresa位于Petritxol 11；公开页面列出周一至周六09:00–13:00、16:00–21:00，周日09:00–13:00、17:00–21:00。其suizo介绍为加鲜奶油的热巧克力，但菜单价格未标更新时间，不能当作当前价格。Torrons Vicens官网门店表列有Carrer de la Boqueria 31等地址，但未确认营业时间或现场试吃。'
      ],
      note: '以上只是可选想法，不会改动已确定的行程。不能笼统保证哥特区白天安全、全程平坦或无台阶；街道路面、坡度、台阶、长椅和公共厕所未逐段核实。出发前请再次确认拥挤程度、营业、菜单和价格，并按长辈体力只选一个区域。',
      chatChip: '🗓️ 巴塞罗那轻松一日选择',
      chatQuery: '巴塞罗那 父母 轻松一日',
      chatTitle: '巴塞罗那轻松一日选择',
      chatBody: '建议只选一个主题，不要把三条都塞进一天：圣保罗（官方参观约45–60分钟，地图显示距住宿850–900米）、周一至周六常规开放的博盖利亚市场，或缩短路线的哥特区漫步。地图时间、通行条件和当天营业可能变化；已确定行程不变。',
      chatLink: '查看可选主题与来源'
    }
  };

  const allCardSources = sourceIds;
  const cardByLocale = {};
  Object.keys(copy).forEach(lang => {
    const text = copy[lang];
    const card = {
      id: 'bcn-card-day-options', icon: '🌿', title: text.title,
      paragraphs: text.paragraphs, note: text.note, links: mapLinks[lang], sources: allCardSources
    };
    cardByLocale[lang] = card;
    guide.content[lang].guide.cards.push(card);
    guide.content[lang].dayOptions = text;
    guide.content[lang].guide.updated = {
      ko: '정보 확인: 2026.11.08 · 운영·가격·메뉴는 바뀔 수 있으니 방문 전 공식 안내를 확인하세요.',
      en: 'Source check: 8 Nov 2026 · Hours, prices and menus can change; check official information before visiting.',
      ja: '情報確認：2026年11月8日 · 営業時間・料金・メニューは変わるため、訪問前に公式情報をご確認ください。',
      zh: '资料核实：2026年11月8日 · 营业时间、价格与菜单可能变化，出发前请查看官方信息。'
    }[lang];
    if (typeof CHATBOT_I18N !== 'undefined' && CHATBOT_I18N[lang] && Array.isArray(CHATBOT_I18N[lang].chips)) {
      if (!CHATBOT_I18N[lang].chips.some(chip => chip.q === text.chatQuery)) {
        CHATBOT_I18N[lang].chips.unshift({ text: text.chatChip, q: text.chatQuery });
      }
    }
  });

  function esc(value) {
    return String(value == null ? '' : value).replace(/[&<>"']/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));
  }

  function localeFor(lang) {
    return copy[lang] ? lang : 'ko';
  }

  const oldChatResponse = window.buildBarcelonaLocalChatResponse;
  const dayPattern = /(sant\s*pau|recinte modernista|boqueria|la rambla|ramblas|gothic quarter|barri g[oò]tic|gothic|old town|sabater|pallaresa|petritxol|torrons vicens|vicens|relaxed day|slow day|parents|family day|산파우|산 파우|보케리아|람블라|고딕|사바테르|팔라레사|비센스|여유로운 하루|부모님|サン・パウ|サンパウ|ボケリア|ランブラス|ゴシック|旧市街|サバテル|ビセンス|ゆったりした一日|ご両親|圣保罗|博盖利亚|兰布拉|哥特区|维森斯|轻松一日|父母)/i;
  window.buildBarcelonaLocalChatResponse = function (query, lang) {
    const q = String(query || '').toLowerCase();
    if (!dayPattern.test(q)) return typeof oldChatResponse === 'function' ? oldChatResponse(query, lang) : null;
    const locale = localeFor(lang || window.currentLang || 'ko');
    const text = copy[locale];
    const card = cardByLocale[locale];
    let paragraphIndex = -1;
    let referenceIds = ['santPauVisit', 'boqueriaMarket', 'gothicTourism'];
    if (/(sant\s*pau|recinte modernista|산파우|산 파우|サン・パウ|サンパウ|圣保罗)/i.test(q)) {
      paragraphIndex = 0;
      referenceIds = ['santPauVisit', 'santPauAccess', 'santPauMap'];
    } else if (/(boqueria|la rambla|ramblas|보케리아|람블라|ボケリア|ランブラス|博盖利亚|兰布拉)/i.test(q)) {
      paragraphIndex = 1;
      referenceIds = ['boqueriaMarket', 'boqueriaCity', 'boqueriaServices', 'elQuimMenu', 'boqueriaAccess', 'boqueriaCrowds'];
    } else if (/(sabater|사바테르|サバテル)/i.test(q)) {
      paragraphIndex = 2;
      referenceIds = ['gothicTourism', 'sabaterStore', 'sabaterProcess'];
    } else if (/(pallaresa|petritxol|팔라레사)/i.test(q)) {
      paragraphIndex = 2;
      referenceIds = ['gothicTourism', 'laPallaresa', 'laPallaresaMenu', 'laPallaresaSuizo'];
    } else if (/(vicens|torrons|비센스|ビセンス|维森斯)/i.test(q)) {
      paragraphIndex = 2;
      referenceIds = ['vicensStores', 'vicensProducts'];
    } else if (/(gothic|barri g[oò]tic|old town|고딕|ゴシック|旧市街|哥特区)/i.test(q)) {
      paragraphIndex = 2;
      referenceIds = ['gothicTourism', 'santJaume', 'placaRei', 'gothicSafety'];
    }
    const body = paragraphIndex >= 0 ? card.paragraphs[paragraphIndex] : text.chatBody;
    const sourceHtml = referenceIds.map(id => {
      const source = guide.sources[id];
      return `<a class="bcn-transit-source" href="${esc(source.url)}" target="_blank" rel="noopener noreferrer">${esc(source.names[locale])}</a>`;
    }).join('');
    return `<div class="bcn-transit-chat-answer"><strong>${esc(text.chatTitle)}</strong><p>${esc(body)}</p><div class="bcn-transit-sources">${sourceHtml}</div><button type="button" class="chat-quick-chip" onclick="openBarcelonaLocalTopic('day-options')">${esc(text.chatLink)}</button></div>`;
  };

  const oldOpenTopic = window.openBarcelonaLocalTopic;
  window.openBarcelonaLocalTopic = function (topic) {
    if (topic !== 'day-options') return typeof oldOpenTopic === 'function' ? oldOpenTopic(topic) : undefined;
    window.switchGuidebookChapter?.('chapter-practical', false);
    window.goToBookPage?.('chapter-practical', 4, false);
    window.setTimeout(() => {
      const card = document.getElementById('bcn-card-day-options');
      if (card) { card.open = true; card.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    }, 160);
    if (window.closeChatWindow) window.closeChatWindow();
  };

  window.BARCELONA_DAY_OPTIONS = { content: copy, sources, cardByLocale };
})();
