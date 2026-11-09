(function () {
  'use strict';

  const LANGS = ['ko', 'en', 'ja', 'zh'];
  const SOURCES = {
    boqueriaHours: {
      url: 'https://www.boqueria.barcelona/market-open-a-35-en',
      label: { ko: '보케리아 공식 운영시간', en: 'La Boqueria official hours', ja: 'ボケリア市場の公式営業時間', zh: '博盖利亚市场官方营业时间' }
    },
    elQuimMenu: {
      url: 'https://elquimdelaboqueria.com/menu-2?lang=en',
      label: { ko: 'El Quim 공식 메뉴', en: 'El Quim official menu', ja: 'El Quim 公式メニュー', zh: 'El Quim 官方菜单' }
    },
    elQuimSite: {
      url: 'https://elquimdelaboqueria.com/',
      label: { ko: 'El Quim 공식 사이트·예약 안내', en: 'El Quim official site & booking note', ja: 'El Quim 公式サイト・予約案内', zh: 'El Quim 官网与预约说明' }
    },
    elQuimTourism: {
      url: 'https://thisisbarcelona.com/gastronomy/restaurants/el-quim-de-la-boqueria',
      label: { ko: '바르셀로나 관광청 식당 안내', en: 'Barcelona tourism restaurant guide', ja: 'バルセロナ観光局のレストラン案内', zh: '巴塞罗那旅游局餐厅介绍' }
    },
    olivesFrancesc: {
      url: 'https://www.boqueria.barcelona/olives-francesc-p-154-es',
      label: { ko: 'Olives Francesc 공식 판매대 안내', en: 'Olives Francesc official stall listing', ja: 'Olives Francesc 公式売店案内', zh: 'Olives Francesc 官方摊位介绍' }
    },
    morilla: {
      url: 'https://www.boqueria.barcelona/resultados-busqueda',
      label: { ko: '보케리아 공식 판매대 디렉터리', en: 'La Boqueria official stall directory', ja: 'ボケリア公式売店ディレクトリ', zh: '博盖利亚官方摊位目录' }
    },
    encarnacionTourism: {
      url: 'https://visitasevilla.es/en/setas-y-mercado-de-la-encarnacion/',
      label: { ko: '세비야 관광청·엔카르나시온 시장', en: 'Visit Sevilla · Encarnación Market', ja: 'セビリア観光局・エンカルナシオン市場', zh: '塞维利亚旅游局·恩卡纳西翁市场' }
    },
    encarnacionOfficial: {
      url: 'https://www.mercadodelaencarnacion.es/',
      label: { ko: 'Mercado de la Encarnación 공식 사이트', en: 'Mercado de la Encarnación official site', ja: 'Mercado de la Encarnación 公式サイト', zh: 'Mercado de la Encarnación 官网' }
    },
    coliseo: {
      url: 'https://barcoliseo.es/',
      label: { ko: 'Coliseo Bar 공식 메뉴·시간', en: 'Coliseo Bar official menu & hours', ja: 'Coliseo Bar 公式メニュー・営業時間', zh: 'Coliseo Bar 官方菜单与营业时间' }
    },
    casaRicardo: {
      url: 'https://casaricardosevilla.com/',
      label: { ko: 'Casa Ricardo 공식 메뉴·시간', en: 'Casa Ricardo official menu & hours', ja: 'Casa Ricardo 公式メニュー・営業時間', zh: 'Casa Ricardo 官方菜单与营业时间' }
    },
    granadaMarket: {
      url: 'https://turismo.granada.org/es/espacios-gastronomicos',
      label: { ko: '그라나다 관광청 미식 공간 안내', en: 'Granada tourism · gastronomic spaces', ja: 'グラナダ観光局・食のスポット', zh: '格拉纳达旅游局·美食空间' }
    },
    granadaTapas: {
      url: 'https://turismo.granada.org/en/what-do/tapas-granada',
      label: { ko: '그라나다 관광청 타파스 구역 안내', en: 'Granada tourism · tapas areas', ja: 'グラナダ観光局・タパス地区', zh: '格拉纳达旅游局·Tapas 区域' }
    },
    botanico: {
      url: 'https://botanicocafe.es/carta/',
      label: { ko: 'Botánico Café 공식 메뉴', en: 'Botánico Café official menu', ja: 'Botánico Café 公式メニュー', zh: 'Botánico Café 官方菜单' }
    },
    "tostadero": {
      url: 'https://www.cafessolycrema.com/',
      label: { ko: 'El Antiguo Tostadero 상품 안내', en: 'El Antiguo Tostadero product shop', ja: 'El Antiguo Tostadero 商品案内', zh: 'El Antiguo Tostadero 商品介绍' }
    },
    atarazanasCity: {
      url: 'https://www.malaga.eu/la-ciudad/instalaciones-y-espacios/detalle-de-la-instalacion/?id=160',
      label: { ko: '말라가 시청 Atarazanas 시장 안내', en: 'Málaga City · Atarazanas Market', ja: 'マラガ市・アタラサナス市場', zh: '马拉加市政府·阿塔拉萨纳斯市场' }
    },
    malagaProducts: {
      url: 'https://visita.malaga.eu/es/conoce-malaga/gastronomia/sabores-para-recordar-productos-locales',
      label: { ko: '말라가 관광청 지역 상품 안내', en: 'Málaga tourism · local products', ja: 'マラガ観光局・地元の特産品', zh: '马拉加旅游局·本地特产' }
    },
    picasMenu: {
      url: 'https://www.restaurantepicas.com/menu/',
      label: { ko: 'Picas 공식 메뉴', en: 'Picas official menu', ja: 'Picas 公式メニュー', zh: 'Picas 官方菜单' }
    },
    picasFaq: {
      url: 'https://www.restaurantepicas.com/faq/',
      label: { ko: 'Picas 알레르기·예약·접근 안내', en: 'Picas allergy, booking & access FAQ', ja: 'Picas アレルギー・予約・アクセス FAQ', zh: 'Picas 过敏、预约与无障碍 FAQ' }
    },
    patios: {
      url: 'https://lospatiosdebeatas.com/contacto/',
      label: { ko: 'Los Patios de Beatas 공식 연락처·시간', en: 'Los Patios de Beatas official contact & hours', ja: 'Los Patios de Beatas 公式連絡先・営業時間', zh: 'Los Patios de Beatas 官方联系与营业时间' }
    },
    koreaApqa: {
      url: 'https://eminwon.qia.go.kr/departure/animal_import_call_info.html',
      label: { ko: '농림축산검역본부 입국 신고 안내', en: 'APQA official arrival declaration leaflet', ja: '韓国検疫本部・入国申告案内', zh: '韩国检疫本部入境申报指南' }
    },
    koreaAirport: {
      url: 'https://www.airport.kr/ap_ko/916/subview.do',
      label: { ko: '인천공항 동·식물 검역 안내', en: 'Incheon Airport animal & plant quarantine', ja: '仁川空港・動植物検疫案内', zh: '仁川机场动植物检疫指南' }
    },
    koreaMafra: {
      url: 'https://www.mafra.go.kr/sn3hcv_v2023/view.jsp?filepath=/home/atchmnfl/bbs/877/E7AE2430-A39D-4DBB-9A16-25D136BD5556.hwpx',
      label: { ko: '농림축산식품부 수입금지지역 고시', en: 'Korean agriculture ministry import-restriction notice', ja: '韓国農林畜産食品部・輸入制限地域告示', zh: '韩国农林畜产食品部进口限制地区公告' }
    },
    koreaCustoms: {
      url: 'https://www.customs.go.kr/dbTest/cm/cntnts/cntntsView.do?cntntsId=5283&mi=10481',
      label: { ko: '인천세관 입국 시 신고 안내', en: 'Incheon Customs arrival declaration guide', ja: '仁川税関・入国時申告案内', zh: '仁川海关入境申报指南' }
    }
  };

  const COPY = {
    ko: {
      title: '스페인 시장·저녁 식사 보충 가이드',
      intro: '시장 운영시간과 개별 점포 영업은 다를 수 있습니다. 아래는 공식 게시 정보를 바탕으로 한 선택지이며, 가격·재고·당일 영업·대기시간을 보장하지 않습니다. 현장 가격표와 재료를 확인하세요.',
      nightNote: '야시장 확인: 확인한 최신 공식 자료에서는 네 도시의 여행일 정기 식품 야시장을 확정하지 못했습니다. 낮 시장과 저녁 식당은 별도 일정으로 보세요. 늦게까지 여는 식당이나 연도 미표기 계절 장터를 야시장으로 부르지 않습니다.',
      labels: { market: '시장·시간', food: '먹거리·식당', shopping: '쇼핑', night: '야시장 여부', sources: '공식 출처' },
      borderTitle: '한국 입국 전 육류·하몽 반입 확인',
      borderText: "햄은 진공포장 여부와 관계없이 신고 대상 축산물입니다. 농림축산식품부의 현행 수입금지지역 고시에서 스페인은 돼지고기 관련 국가 목록에 포함되어 있으므로, 스페인산 하몬이 반입 가능하다고 가정하지 마세요. 국가 목록만으로 개별 여행자 휴대품의 허용 여부를 확정할 수도 없습니다. 구매 전 농림축산검역본부에 제품·가공 방식·검역증명서 요건을 확인하고, 불명확하면 가져오지 마세요. 이미 가지고 있다면 숨기거나 검사를 피하려 이동 중 먹지 말고 입국 때 신고해 검역관에게 제시하세요. 미신고에는 법령상 과태료 등 조치가 있을 수 있지만, 고정 금액이 자동 부과되거나 모든 경우 자동 압수된다고 단정할 수 없습니다. 식물성 선물에도 별도 규정이 적용됩니다.",
      borderShort: '하몬을 귀국 선물로 사기 전 공식 검역 요건을 확인하세요. 진공포장도 신고·검역 요건을 없애지 않습니다.',
      shoppingTitle: '시장 선물 후보 (비육류 상품도 반입 규정 확인)',
      shoppingIntro: '공식 시장·관광 안내에 나온 상품군을 현장 선택지로만 제안합니다. 재고·가격·포장·한국 반입 가능 여부는 구매 전에 확인하세요.',
      cities: {
        barcelona: {
          title: '바르셀로나 · Mercat de la Boqueria',
          market: '정기 운영시간은 월–토 08:00–20:30입니다. 2026년 11월 9일(월)은 정기 운영 요일이며, 확인한 자료에서 날짜별 휴무 공지는 찾지 못했지만 당일 휴무가 없다고 보장되지는 않습니다. 안내소는 월–토 09:00–15:00입니다. 방문 직전 공식 공지와 개별 점포 시간을 확인하세요.',
          food: 'El Quim의 공식 메뉴에는 작은 오징어를 곁들인 달걀 프라이가 대표 요리로 게시되어 있고 가격은 €19.75로 표시됩니다. 당일 가격·제공은 변동될 수 있습니다. 식당은 예약을 받지 않으며 관광 안내에는 줄이 있을 수 있다고 나옵니다. 대기시간은 확인되지 않았으므로 부모님이 오래 서 있기 어렵다면 대기를 일정의 전제로 두지 마세요. 달걀·오징어 알레르기와 교차접촉은 직원에게 확인하세요.',
          shopping: 'Olives Francesc 공식 점포 안내에는 올리브, 절임·보존식품, 소스, 오일, 식초, 향신료가 나옵니다. 가격·성분·포장·재고를 판매대에서 확인하세요. 고정 과일주스 가격, 시장 안쪽이 더 싸다는 비교, 하몬 콘 판매, 트러플 제품의 가격 우위는 확인되지 않았습니다. 뚜론/Torrons Vicens는 기존 쇼핑 안내에 이미 있어 새 카드로 반복하지 않습니다.',
          night: '정기 운영시간은 20:30까지로 안내되며 별도 야간시장 행사 공지는 확인되지 않았습니다. 야시장으로 분류하지 않습니다.',
          sources: ['boqueriaHours', 'elQuimMenu', 'elQuimSite', 'elQuimTourism', 'olivesFrancesc']
        },
        seville: {
          title: '세비야 · Mercado de la Encarnación',
          market: 'Plaza de la Encarnación의 이 시장은 세비야 관광청이 월–토 08:00–15:00로 안내합니다. 저녁 일정과 분리하고, 공휴일과 개별 점포 운영은 방문 당일 확인하세요. Mercado de Triana는 기존 가이드에 이미 있어 중복 카드로 만들지 않습니다.',
          food: '저녁 타파스 후보 Coliseo Bar는 공식 사이트에 매일 11:30–00:00, 주방 12:30–23:30을 게시하고 tortillitas de camarones(새우 튀김전)를 메뉴 예시로 안내합니다. 갑각류 알레르기·교차접촉은 주문 전 확인하세요. 대안인 Casa Ricardo는 화–토 13:00–16:00 및 20:00–00:00, 일요일 13:00–16:00, 월요일 휴무로 게시되어 있습니다. 메뉴·좌석·계단 없는 접근은 매장에 확인하세요.',
          shopping: 'Encarnación 시장 공식 사이트는 올리브·절임류, 보존식품, 향신료, 견과류 등 점포 상품군을 안내합니다. 포장·성분·가격·재고 및 한국 반입 규정은 판매대와 공식 검역 안내에서 확인하세요.',
          night: '여행일의 정기 식품 야시장을 확인한 최신 공식 근거는 찾지 못했습니다. Triana의 기존 낮 시장 카드와 저녁 식음업장은 별개이며, 늦게 여는 음식점을 야시장으로 부르지 않습니다.',
          sources: ['encarnacionTourism', 'encarnacionOfficial', 'coliseo', 'casaRicardo']
        },
        granada: {
          title: '그라나다 · Mercado de San Agustín',
          market: '그라나다 관광청은 평일 오전 개장만 안내하며 정확한 시각은 게시하지 않습니다. 토요일과 오후 운영은 최신 공식 자료에서 확인되지 않았습니다. 기존 카드의 월–토 09:00–15:00 및 점심 혼잡 시간 주장은 근거가 부족해 정정했습니다. 방문 전 시장 관리처로 운영을 확인하세요: +34 958 278 279.',
          food: '저녁 식사 후보 Botánico Café의 공식 메뉴에는 채식 메뉴와 변경 옵션이 있습니다. 메뉴에 유제품·견과류·참깨·밀 등이 표시되어 있으므로 알레르기와 교차접촉을 직접 확인하세요. 좌석·예약 가능 여부와 당일 영업은 별도로 확인해야 합니다. 타파스 구역 안내는 특정 식당이나 무료 타파 제공을 보장하지 않습니다.',
          shopping: '관광청은 El Antiguo Tostadero를 San Antón 48/50의 커피·차·초콜릿 가게로 소개하며, 상점 사이트에는 커피·차·인퓨전과 선물 세트가 있습니다. 당일 영업과 재고를 확인하세요.',
          night: '최신 공식 자료에서 정기 식품 야시장을 확인하지 못했습니다. Mercado de San Agustín은 평일 오전 시장으로 안내되어 있으며 야간시장으로 소개하지 않습니다.',
          sources: ['granadaMarket', 'granadaTapas', 'botanico', 'tostadero']
        },
        malaga: {
          title: '말라가 · Mercado Central de Atarazanas',
          market: '말라가 시청은 월–토 08:00–15:00로 안내합니다. 일요일 운영은 페이지에 기재되지 않았습니다. 개별 매대 영업과 당일 예외는 공식 안내 및 현장에서 확인하세요.',
          food: '저녁 후보 Picas(Plaza de la Merced 지점)는 공식 메뉴에 채식·글루텐프리 표시가 있고, FAQ에서 알레르기 확인과 전화 예약을 안내합니다. 메뉴 표시는 알레르기 안전 보증이 아니므로 교차접촉을 직원에게 물어보세요. 식당은 주말 20:00–21:00를 붐비는 시간으로 안내합니다. 대기시간은 보장되지 않습니다. Los Patios de Beatas는 저녁 식사 대안으로 공식 시간표·예약 정보를 확인하세요.',
          shopping: '말라가 관광청이 안내한 시장·지역 상품 범위에는 올리브유, 양념 올리브, 전통 과자와 보존식품 등이 있습니다. 시장의 당일 재고, 성분·포장 및 한국 반입 규정은 구매 전에 확인하세요.',
          night: '연중 정기 야시장은 확인하지 못했습니다. 관광청의 계절 장터 안내는 연도가 명시되지 않아 2026년 11월 방문일 운영 근거로 쓸 수 없습니다. Atarazanas는 낮 시장으로, 저녁 식당과 분리합니다.',
          sources: ['atarazanasCity', 'malagaProducts', 'picasMenu', 'picasFaq', 'patios']
        }
      }
    },
    en: {
      title: 'Spain markets & evening food: a four-city add-on',
      intro: 'Market schedules and individual stall hours can differ. These are options based on official published information, not guarantees of same-day opening, price, stock or waiting time. Check posted prices and ingredients before ordering.',
      nightNote: 'Night-market check: the current official sources reviewed did not confirm a recurring food night market for the travel dates in these four cities. Treat daytime markets and evening restaurants as separate plans. A late-opening restaurant or an undated seasonal market is not evidence of a regular night market.',
      labels: { market: 'Market & hours', food: 'Food & dining', shopping: 'Shopping', night: 'Night-market status', sources: 'Official sources' },
      borderTitle: 'Before bringing meat or jamón into Korea',
      borderText: "Ham is a reportable animal product whether vacuum-packed or not. Spain appears in the pork-related country listing in the Ministry’s current import-restricted-area notice, so do not assume Spanish jamón is admissible. The listing alone does not determine whether an individual traveller-carried product qualifies. Before buying, ask Korea’s Animal and Plant Quarantine Agency about the product, processing and certificate requirements; if unclear, leave it behind. If already carrying it, do not hide it or eat it en route to avoid inspection—declare it and present it on arrival. Non-declaration can lead to statutory administrative penalties, but the sources do not support describing a fixed fine or automatic confiscation in every case. Plant-based gifts have separate rules.",
      borderShort: 'Before buying jamón as a take-home gift, check the official quarantine rules. Vacuum packaging does not remove declaration or inspection requirements.',
      shoppingTitle: 'Market gift ideas (non-meat items still need import checks)',
      shoppingIntro: 'These product categories are listed by official market or tourism sources. They are shopping ideas only; stock, price, packaging and Korean import eligibility must be checked before buying.',
      cities: {
        barcelona: {
          title: 'Barcelona · Mercat de la Boqueria',
          market: 'Regular hours are Monday–Saturday, 08:00–20:30. Monday, 9 November 2026, is a regular opening day; no date-specific closure notice was found in the sources checked, but this is not a guarantee of no same-day closure. The information desk is listed as Monday–Saturday, 09:00–15:00. Check the official notice and individual stall hours before leaving.',
          food: 'El Quim’s official menu lists its fried eggs with baby squid as a house speciality, shown at €19.75. Price and availability may change. The restaurant says it does not take bookings, and the tourism page notes that queues can occur; no wait time is stated. Do not build a long standing queue into a plan for your parents. Ask about egg/squid allergies and cross-contact.',
          shopping: 'Olives Francesc’s official stall page lists olives, preserved foods, sauces, oils, vinegar and spices. Check price, ingredients, packaging and stock at the stall. Fixed fruit-juice prices, a claim that inner stalls are cheaper, a jamón cone listing and cheaper truffle products were not verified. Turrón/Torrons Vicens is already covered in the existing shopping guide and is not repeated as a new card.',
          night: 'The regular market schedule ends at 20:30, and no separate night-market event notice was found. Do not label it a night market.',
          sources: ['boqueriaHours', 'elQuimMenu', 'elQuimSite', 'elQuimTourism', 'olivesFrancesc']
        },
        seville: {
          title: 'Seville · Mercado de la Encarnación',
          market: 'Visit Sevilla lists this market at Plaza de la Encarnación as Monday–Saturday, 08:00–15:00. Keep it separate from evening dining; check holiday and individual-stall hours on the day. Mercado de Triana is already in the existing guide, so it is not duplicated as a new card.',
          food: 'For evening tapas, Coliseo Bar posts daily hours of 11:30–00:00 and kitchen hours of 12:30–23:30; its menu includes tortillitas de camarones (shrimp fritters). Check shellfish allergies and cross-contact before ordering. Casa Ricardo is an alternative, with posted hours Tue–Sat 13:00–16:00 and 20:00–00:00, Sun 13:00–16:00, closed Monday. Ask the venues about seating and step-free access.',
          shopping: 'The official Encarnación market site lists olives/pickles, preserved foods, spices, nuts and other stall categories. Check packaging, ingredients, price, stock and Korean import rules at purchase.',
          night: 'The current official sources reviewed did not confirm a recurring food night market for the travel dates. Triana’s existing daytime-market entry and evening food businesses are separate; a late-opening restaurant is not a night market.',
          sources: ['encarnacionTourism', 'encarnacionOfficial', 'coliseo', 'casaRicardo']
        },
        granada: {
          title: 'Granada · Mercado de San Agustín',
          market: 'Granada’s tourism office lists weekday-morning opening only and gives no exact hours. Saturday and afternoon operation were not confirmed in current official material. The older card’s Mon–Sat 09:00–15:00 schedule and lunch-peak claims were not supported and have been corrected. Confirm hours with market management before going: +34 958 278 279.',
          food: 'Botánico Café’s official menu includes vegetarian dishes and modification options. It also lists dairy, nuts, sesame and wheat among ingredients, so ask the restaurant about allergies and cross-contact. Confirm same-day hours, seating and reservations; tapas-area descriptions do not promise a particular restaurant or free tapas.',
          shopping: 'Tourism lists El Antiguo Tostadero at San Antón 48/50 as a coffee, tea and chocolate shop; its store site lists coffee, tea/infusions and gift sets. Check current opening and stock.',
          night: 'No current official evidence of a recurring food night market was found. San Agustín is listed as a weekday-morning market, not a night market.',
          sources: ['granadaMarket', 'granadaTapas', 'botanico', 'tostadero']
        },
        malaga: {
          title: 'Málaga · Mercado Central de Atarazanas',
          market: 'Málaga City lists the market as Monday–Saturday, 08:00–15:00; Sunday opening is not listed. Confirm individual stall hours and same-day exceptions through official information or on site.',
          food: 'Picas (Plaza de la Merced location) shows vegetarian and gluten-free menu markers and directs guests with allergies to check with staff; its FAQ also gives a phone booking option. Menu markers are not an allergy-safety guarantee—ask about cross-contact. The restaurant identifies weekends 20:00–21:00 as busy; actual waits are not stated. Los Patios de Beatas is another evening option; recheck its published hours and booking details.',
          shopping: 'Málaga tourism lists olive oil, seasoned olives, traditional sweets and preserved foods among local market/product options. Check day-of stock, ingredients, packaging and Korean import rules before buying.',
          night: 'No year-round recurring night market was confirmed. The tourism page for seasonal markets does not state a year, so it cannot establish operation for November 2026. Atarazanas is a daytime market; plan dinner separately.',
          sources: ['atarazanasCity', 'malagaProducts', 'picasMenu', 'picasFaq', 'patios']
        }
      }
    },
    ja: {
      title: 'スペイン市場と夕食：4都市の補足ガイド',
      intro: '市場全体の営業時間と各売店の営業時間は異なる場合があります。以下は公式掲載情報に基づく候補で、当日の営業・価格・在庫・待ち時間を保証するものではありません。注文前に表示価格と原材料を確認してください。',
      nightNote: '夜市の確認：確認した最新の公式資料では、4都市の旅行日に定期開催される食品夜市を確認できませんでした。昼の市場と夕食の店は別々に計画してください。夜遅くまで営業する飲食店や年が記載されていない季節市を、定期夜市と呼びません。',
      labels: { market: '市場・営業時間', food: '食事・レストラン', shopping: '買い物', night: '夜市について', sources: '公式情報' },
      borderTitle: '韓国へ肉製品・ハモンを持ち帰る前に',
      borderText: "ハムは真空包装の有無にかかわらず申告対象の畜産物です。農林畜産食品部の現行の輸入禁止地域告示では、豚肉関連の国別リストにスペインが含まれているため、スペイン産ハモンを持ち込めると決めつけないでください。このリストだけでは、個別の旅行者携帯品が持ち込み可能かどうかは確定できません。購入前に韓国の農林畜産検疫本部へ、製品・加工方法・検疫証明書の要件を確認し、不明なら持ち込まないでください。すでに携帯している場合は、検査を避けるために隠したり移動中に食べたりせず、到着時に申告して検疫担当者に提示してください。未申告には法令上の行政処分があり得ますが、すべてのケースで一定額の罰金や自動没収があるとは確認できません。植物性の土産には別の規則があります。",
      borderShort: 'ハモンを持ち帰り用に買う前に、公式検疫規則を確認してください。真空包装でも申告・検疫の要件はなくなりません。',
      shoppingTitle: '市場で探せる土産候補（肉以外の食品も輸入規則を確認）',
      shoppingIntro: '公式市場・観光資料に記載された商品カテゴリーのみを候補として紹介します。在庫・価格・包装・韓国への持ち込み可否は購入前に確認してください。',
      cities: {
        barcelona: {
          title: 'バルセロナ · Mercat de la Boqueria',
          market: '通常営業時間は月〜土08:00〜20:30です。2026年11月9日（月）は通常営業曜日で、確認した資料では日付指定の休業告知は見つかりませんでしたが、当日の休業がない保証ではありません。案内所は月〜土09:00〜15:00と掲載されています。出発前に公式告知と各売店の営業時間を確認してください。',
          food: 'El Quimの公式メニューには小イカを添えた目玉焼きが看板料理として掲載され、表示価格は€19.75です。価格や提供は当日変更の可能性があります。予約は受け付けていないと公式サイトにあり、観光案内には行列ができる場合が記載されていますが、待ち時間は示されていません。ご両親が長時間立つのが難しい場合、行列を前提に予定を組まないでください。卵・イカのアレルギーや交差接触を店員に確認してください。',
          shopping: 'Olives Francescの公式売店案内にはオリーブ、保存食品、ソース、オイル、酢、スパイスが掲載されています。価格・原材料・包装・在庫は売店で確認してください。ジュースの固定価格、市場の奥ほど安いという比較、ハモンコーン販売、トリュフ商品の割安さは確認できませんでした。トゥロン／Torrons Vicensは既存の買い物ガイドにあるため、新しいカードとして重ねて掲載しません。',
          night: '通常の市場営業時間は20:30までで、別途夜市イベントの告知は確認できませんでした。夜市とは分類しません。',
          sources: ['boqueriaHours', 'elQuimMenu', 'elQuimSite', 'elQuimTourism', 'olivesFrancesc']
        },
        seville: {
          title: 'セビリア · Mercado de la Encarnación',
          market: 'Visit SevillaはPlaza de la Encarnaciónの市場を月〜土08:00〜15:00と案内しています。夕食とは別に計画し、祝日や各売店の営業は当日確認してください。Mercado de Trianaは既存ガイドに掲載済みのため、新しい重複カードにはしません。',
          food: '夕食のタパス候補Coliseo Barは公式サイトに毎日11:30〜00:00、厨房12:30〜23:30と掲載し、メニュー例にtortillitas de camarones（エビのフリッター）があります。甲殻類アレルギーと交差接触を注文前に確認してください。代案のCasa Ricardoは火〜土13:00〜16:00・20:00〜00:00、日曜13:00〜16:00、月曜休業と掲載されています。座席や段差のない入口は各店に確認してください。',
          shopping: 'Mercado de la Encarnación公式サイトにはオリーブ・ピクルス、保存食品、スパイス、ナッツなどの売店カテゴリーが掲載されています。包装・原材料・価格・在庫と韓国の持ち込み規則を購入前に確認してください。',
          night: '旅行日の定期食品夜市を裏付ける最新公式資料は見つかりませんでした。既存ガイドのTriana昼市場と夜の飲食店は別で、遅くまで営業する店を夜市とは呼びません。',
          sources: ['encarnacionTourism', 'encarnacionOfficial', 'coliseo', 'casaRicardo']
        },
        granada: {
          title: 'グラナダ · Mercado de San Agustín',
          market: 'グラナダ観光局は平日午前の営業のみを掲載し、正確な時間は記載していません。土曜・午後の営業は最新の公式情報で確認できませんでした。以前の「月〜土09:00〜15:00」や昼の混雑時間の記述は根拠不足のため修正しました。訪問前に市場管理者へ確認してください：+34 958 278 279。',
          food: '夕食候補のBotánico Café公式メニューにはベジタリアン料理や変更オプションがあります。乳製品・ナッツ・ゴマ・小麦などの表示があるため、アレルギーや交差接触を店に直接確認してください。当日の営業時間、座席、予約も別途確認が必要です。タパス地区の案内は特定の店や無料タパスを保証しません。',
          shopping: '観光局はEl Antiguo TostaderoをSan Antón 48/50のコーヒー・紅茶・チョコレート店として掲載し、店舗サイトにはコーヒー、紅茶・インフュージョン、ギフトセットがあります。営業と在庫を確認してください。',
          night: '定期的な食品夜市を示す最新の公式情報は確認できませんでした。San Agustínは平日午前の市場として案内され、夜市とはされていません。',
          sources: ['granadaMarket', 'granadaTapas', 'botanico', 'tostadero']
        },
        malaga: {
          title: 'マラガ · Mercado Central de Atarazanas',
          market: 'マラガ市は月〜土08:00〜15:00と案内しています。日曜営業はページに記載されていません。各売店の営業時間や当日の例外は公式情報または現地で確認してください。',
          food: '夕食候補のPicas（Plaza de la Merced店）は公式メニューにベジタリアン・グルテンフリー表示があり、FAQでアレルギー確認と電話予約を案内しています。表示はアレルギー安全の保証ではありません。交差接触を店員に確認してください。週末20:00〜21:00は混みやすい時間として案内されていますが、待ち時間は保証されません。Los Patios de Beatasも夕食候補で、営業時間・予約情報を再確認してください。',
          shopping: 'マラガ観光局が案内する市場・地元商品にはオリーブオイル、味付けオリーブ、伝統菓子、保存食品などがあります。当日の在庫、原材料、包装、韓国への持ち込み規則を購入前に確認してください。',
          night: '通年定期の夜市は確認できませんでした。観光局の季節市場ページには年の記載がなく、2026年11月の営業を裏付ける資料にはなりません。Atarazanasは昼市場で、夕食とは別に計画してください。',
          sources: ['atarazanasCity', 'malagaProducts', 'picasMenu', 'picasFaq', 'patios']
        }
      }
    },
    zh: {
      title: '西班牙市场与晚餐：四城补充指南',
      intro: '市场营业时间与各摊位营业时间可能不同。以下是依据官方发布信息整理的备选项，不保证当天营业、价格、库存或等候时间。下单前请查看标价并询问食材。',
      nightNote: '夜市核查：查阅的最新官方资料未能确认这四座城市在旅行日期有定期食品夜市。白天市场与晚间餐厅应分开安排。营业至较晚的餐馆或未标年份的季节市集，不等于常设夜市。',
      labels: { market: '市场与时间', food: '食物与餐厅', shopping: '购物', night: '夜市情况', sources: '官方来源' },
      borderTitle: '将肉类或伊比利亚火腿带入韩国前',
      borderText: "火腿无论是否真空包装，都属于需要申报的畜产品。韩国农林畜产食品部现行的进口限制地区公告将西班牙列入猪肉相关国家名单，因此不要假设西班牙火腿可以入境。该名单本身不能确定某一件旅客携带产品是否符合入境条件。购买前请向韩国动物植物检疫机构确认产品、加工方式和检疫证明要求；如不明确，请不要携带。若已携带，请勿为逃避检查而藏匿或在途中吃掉；入境时申报并交由检疫人员检查。未申报可能受到法定行政处罚，但现有资料不支持说所有情况都会自动处以固定罚款或自动没收。植物类礼物适用不同规定。",
      borderShort: '购买火腿作为回国礼物前，请先查阅官方检疫规定。真空包装不会免除申报或检疫要求。',
      shoppingTitle: '市场礼品候选（非肉类食品也需核实入境规定）',
      shoppingIntro: '仅把官方市场或旅游资料列出的商品类别作为选购线索。库存、价格、包装及能否带入韩国，都应在购买前确认。',
      cities: {
        barcelona: {
          title: '巴塞罗那 · Mercat de la Boqueria',
          market: '常规营业时间为周一至周六08:00–20:30。2026年11月9日（周一）属于常规营业日；查阅的资料未找到该日特别休市通知，但这不等于保证当天不会临时停业。服务台列出的时间为周一至周六09:00–15:00。出发前查看官方通知及各摊位时间。',
          food: 'El Quim官网菜单将煎蛋配小鱿鱼列为招牌菜，标价€19.75；当天价格和供应可能变化。餐厅官网称不接受预订，旅游介绍提到可能排队，但没有公布等候时间。如果父母不适合久站，不要把排队当作确定安排。请向店员确认鸡蛋、小鱿鱼过敏及交叉接触。',
          shopping: 'Olives Francesc官方摊位资料列有橄榄、腌制/保存食品、酱料、油、醋和香料。购买时确认价格、成分、包装和库存。固定果汁价格、市场里面比入口便宜、火腿纸筒摊位以及松露产品更便宜等说法均未核实。杜隆糖/Torrons Vicens已经在原购物指南中，不重复新增卡片。',
          night: '常规市场时间截至20:30，未查到独立夜市活动通知，因此不将其称为夜市。',
          sources: ['boqueriaHours', 'elQuimMenu', 'elQuimSite', 'elQuimTourism', 'olivesFrancesc']
        },
        seville: {
          title: '塞维利亚 · Mercado de la Encarnación',
          market: '塞维利亚旅游局将Plaza de la Encarnación的市场营业时间列为周一至周六08:00–15:00。请与晚餐分开安排，并在当天核实节假日及各摊位时间。Mercado de Triana已在原指南中，因此不重复新增市场卡片。',
          food: '晚餐Tapas备选Coliseo Bar官网列出的营业时间为每天11:30–00:00、厨房12:30–23:30，菜单示例包括tortillitas de camarones（虾饼）。下单前确认甲壳类过敏及交叉接触。另一备选Casa Ricardo官网列出的时间为周二至周六13:00–16:00及20:00–00:00，周日13:00–16:00，周一休息。座位和无台阶入口请向餐厅确认。',
          shopping: 'Encarnación市场官网列出橄榄/腌菜、保存食品、香料、坚果等摊位类别。购买前核实包装、成分、价格、库存及韩国入境规定。',
          night: '查阅的最新官方资料未能确认旅行日期有定期食品夜市。原指南中的Triana白天市场与晚间餐饮商户是不同安排；营业至较晚的餐馆不等于夜市。',
          sources: ['encarnacionTourism', 'encarnacionOfficial', 'coliseo', 'casaRicardo']
        },
        granada: {
          title: '格拉纳达 · Mercado de San Agustín',
          market: '格拉纳达旅游局只列出工作日上午营业，没有具体时刻。最新官方资料未确认周六或下午营业。原卡片中的“周一至周六09:00–15:00”及午餐高峰说法证据不足，现已更正。出发前请向市场管理方确认：+34 958 278 279。',
          food: '晚餐备选Botánico Café官网菜单列有素食菜品和调整选项。菜单同时标注乳制品、坚果、芝麻、小麦等成分，请直接询问过敏和交叉接触。当天营业、座位及预订需另行确认。Tapas区域介绍不保证特定餐厅或免费Tapas。',
          shopping: '旅游局将El Antiguo Tostadero列为San Antón 48/50的咖啡、茶和巧克力店；其商店网站列有咖啡、茶/浸泡饮品及礼盒。请核实当日营业和库存。',
          night: '未找到最新官方资料证明有定期食品夜市。San Agustín被介绍为工作日上午的市场，不是夜市。',
          sources: ['granadaMarket', 'granadaTapas', 'botanico', 'tostadero']
        },
        malaga: {
          title: '马拉加 · Mercado Central de Atarazanas',
          market: '马拉加市政府列出的营业时间为周一至周六08:00–15:00；网页未列周日营业。各摊位营业和当天临时变更请通过官方信息或现场核实。',
          food: '晚餐备选Picas（Plaza de la Merced分店）官网菜单标有素食和无麸质选择，FAQ建议过敏者向员工确认，并提供电话预约方式。菜单标识不等于过敏安全保证，请询问交叉接触。餐厅将周末20:00–21:00列为较繁忙时段，但未承诺等候时间。Los Patios de Beatas也是晚餐备选，请重新确认营业和预订信息。',
          shopping: '马拉加旅游局介绍的市场和本地商品包括橄榄油、调味橄榄、传统甜点和保存食品。购买前核实当天库存、成分、包装及韩国入境规定。',
          night: '未确认有全年定期夜市。旅游局的季节市集页面没有标明年份，不能证明2026年11月的营业安排。Atarazanas是白天市场，晚餐应另行安排。',
          sources: ['atarazanasCity', 'malagaProducts', 'picasMenu', 'picasFaq', 'patios']
        }
      }
    }
  };

  const UI_LABELS = {
    ko: '🥕 네 도시 시장·저녁 식사',
    en: '🥕 Markets & evening food · 4 cities',
    ja: '🥕 4都市の市場・夕食',
    zh: '🥕 四城市场与晚餐'
  };

  function normaliseLang(lang) {
    return LANGS.includes(lang) ? lang : 'ko';
  }

  function escapeHtml(value) {
    return String(value == null ? '' : value).replace(/[&<>"']/g, ch => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    })[ch]);
  }

  function sourceLinks(ids, lang) {
    return (ids || []).map(id => {
      const source = SOURCES[id];
      if (!source) return '';
      const label = source.label[lang] || source.label.ko;
      return `<a href="${escapeHtml(source.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(label)} ↗</a>`;
    }).filter(Boolean).join(' · ');
  }

  let chatInstanceCounter = 0;

  function renderCityCard(cityKey, lang, headingLevel, idPrefix) {
    const copy = COPY[lang];
    const city = copy && copy.cities[cityKey];
    if (!city) return '';
    const headingTag = headingLevel || 'h3';
    const titleId = `market-food-${idPrefix || 'guide'}-${cityKey}-${lang}-title`;
    return `<article class="spanish-market-city-card" aria-labelledby="${titleId}" style="flex:1 1 275px;min-width:0;max-width:560px;background:#fff;border:1px solid #dbe3ee;border-radius:14px;padding:16px;box-shadow:0 2px 8px rgba(15,23,42,.05);">
      <${headingTag} id="${titleId}" style="margin:0 0 12px;color:#12314a;font-size:1.08rem;line-height:1.35;">${escapeHtml(city.title)}</${headingTag}>
      <p style="margin:0 0 10px;line-height:1.6;color:#1f2937;"><strong>${escapeHtml(copy.labels.market)}:</strong> ${escapeHtml(city.market)}</p>
      <p style="margin:0 0 10px;line-height:1.6;color:#1f2937;"><strong>${escapeHtml(copy.labels.food)}:</strong> ${escapeHtml(city.food)}</p>
      <p style="margin:0 0 10px;line-height:1.6;color:#1f2937;"><strong>${escapeHtml(copy.labels.shopping)}:</strong> ${escapeHtml(city.shopping)}</p>
      <p style="margin:0 0 12px;line-height:1.6;color:#334155;"><strong>${escapeHtml(copy.labels.night)}:</strong> ${escapeHtml(city.night)}</p>
      <div style="border-top:1px solid #e2e8f0;padding-top:9px;font-size:.88rem;line-height:1.65;color:#1d4ed8;"><strong style="color:#334155;">${escapeHtml(copy.labels.sources)}:</strong> ${sourceLinks(city.sources, lang)}</div>
    </article>`;
  }

  function renderBorderNote(lang, idSuffix) {
    const copy = COPY[lang];
    const ids = ['koreaApqa', 'koreaAirport', 'koreaMafra', 'koreaCustoms'];
    return `<aside class="korea-meat-import-note" aria-labelledby="korea-meat-import-title-${lang}-${idSuffix || 'guide'}" style="margin:16px 0;padding:14px 16px;border:1px solid #f5c56b;border-left:5px solid #c2410c;border-radius:12px;background:#fff7ed;color:#431407;">
      <h3 id="korea-meat-import-title-${lang}-${idSuffix || 'guide'}" style="margin:0 0 8px;font-size:1rem;line-height:1.4;">${escapeHtml(copy.borderTitle)}</h3>
      <p style="margin:0 0 10px;line-height:1.65;">${escapeHtml(copy.borderText)}</p>
      <div style="font-size:.88rem;line-height:1.65;">${sourceLinks(ids, lang)}</div>
    </aside>`;
  }

  function renderGuide(lang) {
    const l = normaliseLang(lang);
    const copy = COPY[l];
    const cards = ['barcelona', 'seville', 'granada', 'malaga'].map(key => renderCityCard(key, l, 'h3', 'guide')).join('');
    return `<section id="spanish-market-food-guide-content" lang="${l}" aria-labelledby="spanish-market-food-guide-title-${l}" style="margin:18px 0 30px;padding:18px;background:#f8fafc;border:1px solid #dbe3ee;border-radius:16px;">
      <header style="margin-bottom:14px;">
        <div style="font-size:.78rem;font-weight:800;letter-spacing:.08em;color:#0f766e;text-transform:uppercase;">${l === 'ko' ? '공식 정보 확인 · 2026-11-08 업데이트' : l === 'ja' ? '公式情報を確認 · 2026-11-08更新' : l === 'zh' ? '已核对官方信息 · 更新于2026-11-08' : 'Officially checked · updated 2026-11-08'}</div>
        <h2 id="spanish-market-food-guide-title-${l}" style="margin:6px 0 8px;color:#102a43;font-size:1.35rem;line-height:1.35;">${escapeHtml(copy.title)}</h2>
        <p style="margin:0;color:#334155;line-height:1.6;">${escapeHtml(copy.intro)}</p>
      </header>
      <div class="spanish-market-city-grid" style="display:flex;flex-wrap:wrap;align-items:stretch;gap:12px;">${cards}</div>
      <aside style="margin-top:14px;padding:12px 14px;border:1px solid #c7d2fe;border-left:5px solid #4f46e5;border-radius:10px;background:#eef2ff;color:#1e1b4b;line-height:1.6;">
        <strong>${escapeHtml(copy.nightNote)}</strong>
      </aside>
      ${renderBorderNote(l, 'guide')}
    </section>`;
  }

  function renderMountedGuide(lang) {
    const mount = document.getElementById('spanish-market-food-guide');
    if (!mount) return false;
    mount.innerHTML = renderGuide(lang);
    return true;
  }

  function detectCity(q) {
    if (/\b(barcelona|boquer[ií]a|el quim)\b|바르셀로나|보케리아|ボケリア|バルセロナ|博盖利亚/i.test(q)) return 'barcelona';
    if (/\b(seville|sevilla|triana|encarnaci[oó]n|coliseo|casa ricardo)\b|세비야|トリアナ|セビリア|塞维利亚/i.test(q)) return 'seville';
    if (/\b(granada|san agust[ií]n|bot[aá]nico|tostadero)\b|그라나다|グラナダ|格拉纳达/i.test(q)) return 'granada';
    if (/\b(m[aá]laga|atarazanas|picas|los patios de beatas)\b|말라가|マラガ|马拉加/i.test(q)) return 'malaga';
    return null;
  }

  function shoppingResponse(lang, idSuffix) {
    const l = normaliseLang(lang);
    const copy = COPY[l];
    const items = [
      { text: l === 'ko' ? '바르셀로나: Olives Francesc — 올리브·절임식품·오일·향신료' : l === 'ja' ? 'バルセロナ：Olives Francesc — オリーブ、保存食品、オイル、スパイス' : l === 'zh' ? '巴塞罗那：Olives Francesc——橄榄、腌制品、油和香料' : 'Barcelona: Olives Francesc — olives, preserves, oils and spices', link: 'olivesFrancesc' },
      { text: l === 'ko' ? '세비야: Encarnación 시장 — 올리브·향신료·견과류·보존식품' : l === 'ja' ? 'セビリア：Encarnación市場 — オリーブ、スパイス、ナッツ、保存食品' : l === 'zh' ? '塞维利亚：Encarnación市场——橄榄、香料、坚果和保存食品' : 'Seville: Encarnación Market — olives, spices, nuts and preserves', link: 'encarnacionOfficial' },
      { text: l === 'ko' ? '그라나다: El Antiguo Tostadero — 커피·차·초콜릿·선물 세트' : l === 'ja' ? 'グラナダ：El Antiguo Tostadero — コーヒー、茶、チョコレート、ギフトセット' : l === 'zh' ? '格拉纳达：El Antiguo Tostadero——咖啡、茶、巧克力和礼盒' : 'Granada: El Antiguo Tostadero — coffee, tea, chocolate and gift sets', link: 'tostadero' },
      { text: l === 'ko' ? '말라가: Atarazanas·관광 안내의 올리브유·전통 과자·보존식품' : l === 'ja' ? 'マラガ：Atarazanas・観光案内にあるオリーブオイル、伝統菓子、保存食品' : l === 'zh' ? '马拉加：Atarazanas及旅游资料中的橄榄油、传统甜点和保存食品' : 'Málaga: olive oil, traditional sweets and preserves listed for Atarazanas/local products', link: 'malagaProducts' }
    ];
    return `<div class="spanish-shopping-chat" lang="${l}"><h3>${escapeHtml(copy.shoppingTitle)}</h3><p>${escapeHtml(copy.shoppingIntro)}</p><ul>${items.map(item => `<li>${escapeHtml(item.text)} — ${sourceLinks([item.link], l)}</li>`).join('')}</ul>${renderBorderNote(l, idSuffix)}</div>`;
  }

  function buildChatResponse(query, lang) {
    const q = String(query || '').toLowerCase();
    const l = normaliseLang(lang);
    const replyId = `reply-${++chatInstanceCounter}`;
    const city = detectCity(q);
    const hasAnimalFood = /jam[oó]n|iberian ham|cured ham|ham|pork|meat product|carne|하몬|하몽|햄|생햄|육류|육가공|肉类|肉製品|ハモン|生ハム|豚肉|火腿|肉制品/i.test(q);
    const hasCrossBorder = /korea|south korea|corea|한국|韓国|韩国|귀국|입국|반입|가져오|진공|vacuum|import|importar|aduana|llevar|traer|bring back|take home|luggage|手荷物|持ち帰|持ち込|带回|入境|申报/i.test(q);
    const hasSpanishContext = /spain|spanish|espa[nñ]a|espa[nñ]ol|andaluc[ií]a|andalusia|스페인|안달루시아|スペイン|アンダルシア|西班牙|安达卢西亚|바르셀로나|세비야|그라나다|말라가|barcelona|seville|sevilla|granada|m[aá]laga/i.test(q);
    const hasShoppingIntent = /souvenir|gift|shopping|shop|present|regalo|comprar|compras|기념품|선물|쇼핑|お土産|土産|買い物|购物|伴手礼|礼物|纪念品|特产/i.test(q);
    const hasMarketIntent = /market|markets|mercado|mercat|night market|市集|市场|市場|야시장|시장|ボケリア|博盖利亚|boquer[ií]a|encarnaci[oó]n|atarazanas|san agust[ií]n|ham cone|jam[oó]n cone|truffle oil|fruit juice price|올리브|하몬 콘|트러플 오일|주스 가격|夜市|市場|夜市|火腿纸筒|火腿紙筒/i.test(q);
    const hasDiningIntent = /food|restaurant|dining|eat|menu|hours|opening|tapas|snack|comida|restaurante|horario|cena|menu|営業時間|料理|レストラン|タパス|食事|美食|餐厅|小吃|营业时间|吃饭/i.test(q);
    if (hasAnimalFood && hasCrossBorder) return renderBorderNote(l, replyId);
    if (hasShoppingIntent && hasSpanishContext) return shoppingResponse(l, replyId);
    if (city && (hasMarketIntent || hasDiningIntent)) return `<div class="spanish-market-chat-answer" lang="${l}">${renderCityCard(city, l, 'h3', replyId)}${renderBorderNote(l, replyId)}</div>`;
    if (hasMarketIntent && hasSpanishContext) return renderGuide(l);
    return null;
  }

  LANGS.forEach(lang => {
    const dict = window.I18N_DICTIONARY && window.I18N_DICTIONARY[lang];
    if (dict) dict.subnav_chip_market_food = UI_LABELS[lang];
  });

  window.SPANISH_MARKET_FOOD_GUIDE = {
    copy: COPY,
    sources: SOURCES,
    render: renderGuide,
    renderMounted: renderMountedGuide,
    buildChatResponse
  };
  window.renderSpanishMarketFoodGuide = renderMountedGuide;
  window.buildSpanishMarketFoodChatResponse = buildChatResponse;
})();
