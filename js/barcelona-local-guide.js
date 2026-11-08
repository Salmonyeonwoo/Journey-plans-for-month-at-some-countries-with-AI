/* Barcelona pocket guide: supplemental, multilingual, and deliberately separate from confirmed bookings. */
(function () {
  'use strict';

  const sources = {
    portes: {
      url: 'https://7portes.com/en/7-portes-restaurant/restaurant/',
      names: { ko: '7 Portes · 식당 소개', en: '7 Portes · Restaurant', ja: '7 Portes · レストラン', zh: '7 Portes · 餐厅介绍' }
    },
    portesMenu: {
      url: 'https://7portes.com/downloads/menusgrupos7portesmayo2026_es.pdf',
      names: { ko: '7 Portes · 2026년 5월 메뉴 PDF', en: '7 Portes · May 2026 menu PDF', ja: '7 Portes · 2026年5月メニューPDF', zh: '7 Portes · 2026年5月菜单 PDF' }
    },
    canMajo: {
      url: 'https://www.canmajo.es/es/cocina/',
      names: { ko: 'Can Majó · 요리 안내', en: 'Can Majó · Cuisine', ja: 'Can Majó · 料理案内', zh: 'Can Majó · 菜品介绍' }
    },
    peninsular: {
      url: 'https://tabernaycafetin.es/la-peninsular/',
      names: { ko: 'La Peninsular · 공식 소개', en: 'La Peninsular · Official page', ja: 'La Peninsular · 公式案内', zh: 'La Peninsular · 官方介绍' }
    },
    peninsularLocal: {
      url: 'https://www.barcelona-metropolitan.com/locations/la-peninsular/',
      names: { ko: 'Barcelona Metropolitan · 위치 안내', en: 'Barcelona Metropolitan · Listing', ja: 'Barcelona Metropolitan · 店舗案内', zh: 'Barcelona Metropolitan · 地点介绍' }
    },
    port: {
      url: 'https://www.portdebarcelona.cat/en/port-vell/public-space',
      names: { ko: '바르셀로나 항만청 · Port Vell 공공 공간', en: 'Port of Barcelona · Port Vell public space', ja: 'バルセロナ港湾局 · Port Vell公共空間', zh: '巴塞罗那港务局 · Port Vell公共空间' }
    },
    wBarcelona: {
      url: 'https://www.marriott.com/en-us/hotels/bcnwh-w-barcelona/overview/',
      names: { ko: 'Marriott · W Barcelona 위치', en: 'Marriott · W Barcelona location', ja: 'Marriott · W Barcelonaの場所', zh: 'Marriott · W Barcelona位置' }
    },
    mnac: {
      url: 'https://www.museunacional.cat/en/rooftop-viewpoint-0',
      names: { ko: 'MNAC · 루프톱 전망대', en: 'MNAC · Rooftop viewpoint', ja: 'MNAC · 屋上展望台', zh: 'MNAC · 屋顶观景台' }
    },
    castleVisit: {
      url: 'https://ajuntament.barcelona.cat/castelldemontjuic/en/visit/planning-your-visit',
      names: { ko: '바르셀로나 시청 · 몬주익 성 방문 안내', en: 'Barcelona City Council · Castle visit', ja: 'バルセロナ市 · モンジュイック城の見学案内', zh: '巴塞罗那市政府 · 蒙特惠奇城堡参观' }
    },
    castleAccess: {
      url: 'https://ajuntament.barcelona.cat/castelldemontjuic/en/visit/contact-us-getting-here',
      names: { ko: '바르셀로나 시청 · 몬주익 성 가는 법', en: 'Barcelona City Council · Getting to the Castle', ja: 'バルセロナ市 · 城へのアクセス', zh: '巴塞罗那市政府 · 前往城堡' }
    },
    fountain: {
      url: 'https://www.barcelona.cat/en/what-to-do-in-bcn/magic-fountain',
      names: { ko: '바르셀로나 시청 · 마법의 분수 공지', en: 'Barcelona City Council · Magic Fountain notice', ja: 'バルセロナ市 · マジカ噴水のお知らせ', zh: '巴塞罗那市政府 · 魔幻喷泉公告' }
    },
    "fountainNotice2026": {
      "url": "https://ajuntament.barcelona.cat/premsa/2026/10/21/la-font-magica-de-montjuic-saturara-de-l1-al-15-de-novembre-per-fer-les-tasques-de-manteniment-anual/",
      "names": {
        "ko": "바르셀로나 시청 · 2026 분수 정비·재개 공지",
        "en": "Barcelona City Council · 2026 fountain maintenance notice",
        "ja": "バルセロナ市 · 2026年噴水整備・再開のお知らせ",
        "zh": "巴塞罗那市政府 · 2026年喷泉维护与恢复公告"
      }
    },
    "fountainArticle2026": {
      "url": "https://www.barcelona.cat/ca/que-pots-fer-a-bcn/parc-montjuic/noticies/la-font-magica-satura-de-l1-al-15-de-novembre-42420",
      "names": {
        "ko": "Barcelona.cat · 2026 분수 정비 공지",
        "en": "Barcelona.cat · 2026 fountain notice",
        "ja": "Barcelona.cat · 2026年噴水のお知らせ",
        "zh": "Barcelona.cat · 2026年喷泉公告"
      }
    },
    "fountainTimes": {
      "url": "https://www.barcelona.cat/en/what-to-do-in-bcn/magic-fountain/magic-fountains-show-times",
      "names": {
        "ko": "바르셀로나 시청 · 분수쇼 시간표",
        "en": "Barcelona City Council · Fountain show times",
        "ja": "バルセロナ市 · 噴水ショーの時間",
        "zh": "巴塞罗那市政府 · 喷泉演出时间"
      }
    },
    "arenasServices": {
      "url": "https://www.arenasdebarcelona.com/EN/servicios",
      "names": {
        "ko": "Arenas de Barcelona · 시설 안내",
        "en": "Arenas de Barcelona · Services",
        "ja": "Arenas de Barcelona · 施設案内",
        "zh": "Arenas de Barcelona · 服务设施"
      }
    },
    "arenasViewpoint": {
      "url": "https://turismo.arenasdebarcelona.com/landing-arenas-en.html",
      "names": {
        "ko": "Arenas de Barcelona · 전망대 안내",
        "en": "Arenas de Barcelona · Viewpoint information",
        "ja": "Arenas de Barcelona · 展望台案内",
        "zh": "Arenas de Barcelona · 观景台介绍"
      }
    },
    "arenasHours": {
      "url": "https://www.arenasdebarcelona.com/EN/horarios",
      "names": {
        "ko": "Arenas de Barcelona · 운영시간 안내",
        "en": "Arenas de Barcelona · Opening hours",
        "ja": "Arenas de Barcelona · 営業時間",
        "zh": "Arenas de Barcelona · 营业时间"
      }
    },
    "torresHeritage": {
      "url": "https://invarquit.cultura.gencat.cat/card/41190",
      "names": {
        "ko": "카탈루냐 문화유산 목록 · 1929 전시회 입구 탑",
        "en": "Catalan Heritage Inventory · 1929 Exhibition entrance towers",
        "ja": "カタルーニャ文化遺産目録 · 1929年博覧会入口の塔",
        "zh": "加泰罗尼亚文化遗产名录 · 1929年博览会入口塔"
      }
    },
    "torresGuide": {
      "url": "https://guia.barcelona.cat/en/directoris/detall/torres-venecianes_92086009260.html",
      "names": {
        "ko": "바르셀로나 시청 · 베네치아 탑 안내",
        "en": "Barcelona City Council · Venetian Towers",
        "ja": "バルセロナ市 · ベネチア塔",
        "zh": "巴塞罗那市政府 · 威尼斯塔"
      }
    },
    "blaiMap": {
      "url": "https://www.google.com/maps/dir/?api=1&origin=Pla%C3%A7a+d%27Espanya,+Barcelona&destination=Carrer+de+Blai+%26+Carrer+del+Roser,+Barcelona&travelmode=walking",
      "names": {
        "ko": "Google 지도 · 에스파냐 광장–블라이/로세르 도보 경로",
        "en": "Google Maps · Plaça d’Espanya–Blai/Roser walking directions",
        "ja": "Google マップ · スペイン広場〜Blai/Roser徒歩ルート",
        "zh": "Google 地图 · 西班牙广场至Blai/Roser步行路线"
      }
    },
    "blaiCity": {
      "url": "https://www.barcelona.cat/infobarcelona/ca/tema/urbanisme-i-infraestructures/reparem-el-paviment-del-carrer-de-blai_40368.html",
      "names": {
        "ko": "바르셀로나 시청 · 블라이 거리 보도 보수",
        "en": "Barcelona City Council · Carrer de Blai paving repairs",
        "ja": "バルセロナ市 · Carrer de Blaiの舗装補修",
        "zh": "巴塞罗那市政府 · Blai街路面维修"
      }
    },
    "blaiVenue": {
      "url": "https://www.latasquetadeblai.com/en/contact",
      "names": {
        "ko": "La Tasqueta de Blai · 공식 영업시간·가격 안내",
        "en": "La Tasqueta de Blai · Official hours and prices",
        "ja": "La Tasqueta de Blai · 公式営業時間・料金",
        "zh": "La Tasqueta de Blai · 官方营业时间与价格"
      }
    },
    "claraRae": {
      "url": "https://dle.rae.es/clara",
      "names": {
        "ko": "스페인 왕립학술원 · clara 뜻",
        "en": "RAE · Definition of clara",
        "ja": "スペイン王立アカデミー · claraの定義",
        "zh": "西班牙皇家语言学院 · clara释义"
      }
    },
    xalet: {
      url: 'https://xaletdemontjuic.com/en/the-restaurant-with-the-best-views-of-barcelona-discover-el-xalet-de-montjuic/',
      names: { ko: 'El Xalet · 공식 전망·위치 안내', en: 'El Xalet · Official views and location', ja: 'El Xalet · 公式の眺望・場所案内', zh: 'El Xalet · 官方景观与位置介绍' }
    },
    xaletTourism: {
      url: 'https://www.barcelonaturisme.com/wv3/en/restaurant/183708/xalet-de-montjuic.html',
      names: { ko: 'Barcelona 관광청 · El Xalet', en: 'Barcelona Tourism · El Xalet', ja: 'バルセロナ観光局 · El Xalet', zh: '巴塞罗那旅游局 · El Xalet' }
    },
    martinez: {
      url: 'https://martinezbarcelona.com/en/menu/',
      names: { ko: 'Terraza Martínez · 공식 메뉴', en: 'Terraza Martínez · Official menu', ja: 'Terraza Martínez · 公式メニュー', zh: 'Terraza Martínez · 官方菜单' }
    },
    martinezBooking: {
      url: 'https://martinezbarcelona.com/en/reservation/',
      names: { ko: 'Terraza Martínez · 예약 조건', en: 'Terraza Martínez · Reservation terms', ja: 'Terraza Martínez · 予約条件', zh: 'Terraza Martínez · 预订须知' }
    },
    elCorte: {
      url: 'https://www.elcorteingles.es/hosteleria/nuevos-conceptos/la-plasa-catalunya/',
      names: { ko: 'El Corte Inglés · La Plaça Catalunya', en: 'El Corte Inglés · La Plaça Catalunya', ja: 'El Corte Inglés · La Plaça Catalunya', zh: 'El Corte Inglés · La Plaça Catalunya' }
    },
    xurreria: {
      url: 'https://www.instagram.com/xurreriatrebol/?hl=en',
      names: { ko: 'Xurreria Trebol · 공식 프로필', en: 'Xurreria Trebol · Official profile', ja: 'Xurreria Trebol · 公式プロフィール', zh: 'Xurreria Trebol · 官方主页' }
    },
    xurreriaAddress: {
      url: 'https://au.trip.com/restaurant/spain/barcelona/detail/xurreria-trebol-31372930/',
      names: { ko: 'Trip.com · 주소 참고(제3자)', en: 'Trip.com · Address reference (third party)', ja: 'Trip.com · 住所参考（第三者）', zh: 'Trip.com · 地址参考（第三方）' }
    },
    churros: {
      url: 'https://www.177milkstreet.com/digital-library/churros-and-hot-chocolate-at-xurerria-el-trebol-barcelona-spain',
      names: { ko: 'Milk Street · 츄러스·초콜릿 방문기', en: 'Milk Street · Churros and hot chocolate', ja: 'Milk Street · チュロスとホットチョコレート', zh: 'Milk Street · 吉事果与热巧克力' }
    }
  };

  const copy = {
    ko: {
      nav: ['홈', '일정', '장소', '야경', '도움'],
      chatChip: '🇪🇸 바르셀로네타 식사 팁',
      chatQuery: 'Barcelona Barceloneta restaurants and today menu',
      nightChatChip: "🌆 에스파냐 광장 분수쇼 대안",
      nightChatQuery: "에스파냐 광장 분수쇼 대안 부모님",
      snapshot: {
        kicker: 'BARCELONA · FAMILY TRIP', title: '필요한 정보를 한눈에',
        lead: '바르셀로나 11/5–11/11 · 3인 가족(60대 부모님 동행). 확정 일정은 그대로 두고, 이동·식사·야경 참고만 모았습니다.',
        facts: ['6박 7일', '하루 1–2곳 + 오후 휴식', '교통·영업은 당일 재확인'],
        links: [
          { icon: '🗓️', title: '일정 보기', sub: '하루 동선·휴식', action: 'plan' },
          { icon: '📍', title: '장소 보기', sub: '지역별 가이드', action: 'places' },
          { icon: '🍴', title: '현지 요약', sub: '바다·몬주익·식사', action: 'local' },
          { icon: '🌆', title: '야경 보기', sub: '축제·전망 포인트', action: 'night' }
        ]
      },
      guide: {
        kicker: 'BARCELONA · POCKET GUIDE', title: "바르셀로네타 · 몬주익 · 에스파냐 광장 야경",
        intro: "기존 일정의 7 Portes·항구 산책·해변 휴식은 반복하지 않고, 부모님과 고를 수 있는 에스파냐 광장 저녁 대안도 덧붙입니다. 아래는 아이디어이며 예약이나 확정 일정이 아닙니다.",
        updated: "운영·가격 확인 기준: 2026.11.08 · 현장 운영은 달라질 수 있으니 방문 전 공식 안내를 확인하세요.",
        cards: [
          {
            id: 'bcn-card-food', icon: '🍽️', title: '바르셀로네타 · 식사 후보',
            paragraphs: ['7 Portes는 기존 일정에도 등장하는 1836년부터 이어온 식당입니다. 공식 2026년 5월 단체 메뉴에는 생선 Paella Parellada와 갑오징어·조개를 넣은 Arroz Negro가 있지만, 당일 제공 여부를 확인하세요.', 'Can Majó는 바르셀로네타의 해산물 식당으로, 공식 소개에 랍스터 쌀요리가 나옵니다. La Peninsular는 메뉴가 매일 달라지는 해산물 타파스 보데가이므로, 문어·새우 등은 오늘 메뉴인지 물어보세요.'],
            note: 'Paella Parellada의 해산물 껍질을 벗겨 준다는 설명은 확인되지 않았습니다. 식당 테라스에서는 휴대전화·지갑을 테이블에 두지 말고, 해변에서 사진을 찍을 때는 가방을 손에서 놓지 마세요.',
            links: [
              { label: '7 Portes 지도', query: '7 Portes Barcelona' },
              { label: 'Can Majó 지도', query: 'Can Majó Barcelona' },
              { label: 'La Peninsular 지도', query: 'La Peninsular Barcelona' },
              { label: '소매치기 예방 보기', action: 'safety' },
              { label: '소금 조절 회화', action: 'phrases' }
            ], sources: ['portes', 'portesMenu', 'canMajo', 'peninsular', 'peninsularLocal']
          },
          {
            id: 'bcn-card-waterfront', icon: '🌊', title: 'Port Vell · 바닷가 산책',
            paragraphs: ['Port Vell과 Rambla de Mar는 기존 동선에 이미 포함돼 있습니다. 항만청은 Port Vell을 시민·방문객에게 열린 수변 공공 공간으로 소개하며, Rambla de Mar도 산책·휴식 장소로 안내합니다.', '바르셀로네타 산책로 끝의 W Barcelona는 돛 모양 건물로, 바깥 산책로에서 보는 가족 사진 배경으로 좋습니다. 호텔 내부 시설은 숙박객·예약 조건과 구분하세요.', '이른 아침 해변 산책은 선택 아이디어이며 새 확정 일정이 아닙니다. 기존 13:30–16:00 그늘 휴식과 Port Olímpic 저녁 산책은 그대로 유지하세요. 치링기토(비치 바)는 당일 영업·좌석·화장실 이용 조건을 확인한 뒤 쉬어갈 후보로 보세요.'],
            note: '해변 모래사장에 짐을 두고 일행이 함께 멀어지지 마세요. 걷는 양을 늘리기보다 기존 해변 휴식·Port Olímpic 일정을 우선 유지하세요.',
            links: [
              { label: 'Port Vell 지도', query: 'Port Vell Barcelona Rambla de Mar' },
              { label: 'W Barcelona 지도', query: 'W Barcelona' },
              { label: '교통·경로 보기', action: 'transit' }
            ], sources: ['port', 'wBarcelona']
          },
          {
            id: 'bcn-card-montjuic', icon: '⛰️', title: '몬주익 · 전망과 분수 공지',
            paragraphs: ['MNAC 루프톱은 360도 전망을 제공하지만 미술관 입장권 또는 별도 €2 티켓이 필요합니다. 박물관 운영시간 밖의 일몰·야경 개방은 보장되지 않으니, 외부 계단 전망과 루프톱을 구분해 확인하세요.', '몬주익 성은 11–2월 공식 안내 기준 10:00–18:00, 성인 €12입니다. Plaça d’Espanya에서 150번 버스를 이용할 수 있고 케이블카 요금은 성 입장권과 별도입니다. 푸니쿨라 상부역에서 성까지는 계속 오르막이며 가파른 구간이 있습니다.', "바르셀로나 시청의 2026.10.21 공지는 마법의 분수와 마리아 크리스티나 대로 분수들이 11월 1–15일 연례 정비로 멈추고 그 기간 공연이 없다고 밝혔습니다. 분수쇼는 11월 19일 재개 예정이며, 이후 2027년 3월 31일까지 목·금·토 20:00–21:00로 안내됩니다. 가족 체류 기간인 11월 5–11일에는 공연 일정이 없으며, 실제 재개 여부는 방문 당일 다시 확인하세요."],
            note: "11월 5–11일에는 분수쇼가 예정되어 있지 않습니다. 11월 19일 재개는 공지된 일정이므로 현장 운영을 당일 재확인하고, 늦은 시간까지 기다리는 계획은 피하세요.",
            links: [
              { label: '교통·케이블카 안내', action: 'transit' },
              { label: 'MNAC 지도', query: 'Museu Nacional d’Art de Catalunya' },
              { label: '몬주익 성 지도', query: 'Castell de Montjuïc Barcelona' }
            ], sources: ['mnac', 'castleVisit', 'castleAccess', 'fountainNotice2026', 'fountainArticle2026', 'fountainTimes']
          },
          {
            "id": "bcn-card-espanya",
            "icon": "🌃",
            "title": "에스파냐 광장 · 분수쇼 없이 즐기는 저녁 후보",
            "paragraphs": [
              "Arenas de Barcelona 공식 안내는 꼭대기 층의 360° 전망대와 테라스·식당을 소개하고, 파노라마 승강기와 에스컬레이터도 시설로 열거합니다. 하지만 두 설비가 전망대에 연결되는지, 내부 무료 경로·승강기 요금·전망대 야간 운영시간은 공식 자료에서 확인되지 않았습니다. 무료 입장을 전제로 하지 말고 방문 전 계단 없는 동선, 요금과 마감 시각을 운영처에 확인하세요.",
              "베네치아 탑은 1929년 박람회 입구 탑으로 확인됩니다. 공식 자료끼리 높이는 44m와 47m로 다르고 건축가 이름 표기도 달라 정확한 수치를 단정하지 않습니다. 현재 조명 일정이나 내부 출입 여부도 확인되지 않았습니다. 공식적으로 지정된 촬영 지점은 찾지 못했으므로 사진은 보행로에서 찍고, 중앙 교통섬·차도에는 서지 말며 표시된 횡단보도만 이용하세요.",
              "블라이 거리의 한 사례인 La Tasqueta de Blai는 공식 페이지에 핀초 €1.90–€4.50, 일–목 11:00–24:00, 금·토 11:00–01:00을 게시합니다. 이는 한 가게의 표시 가격·시간이지 거리 전체 기준은 아닙니다. 시청은 보행자 이용·테라스와 2026년 포장 보수 작업을 소개하지만, 거리 전체가 보행자 전용이라고 확인해 주지는 않습니다. Plaça d’Espanya에서 Blai/Roser 교차로까지 지도 경로는 1.6–1.8km, 약 22–25분이며 ‘대체로 평탄’으로 표시되지만 정확한 경사·노면·공사 상황은 확인되지 않았습니다. 무릎이 불편하면 쉬운 도보 코스로 단정하지 말고 택시나 대중교통을 고려하세요."
            ],
            "note": "부모님 무릎 상태에 맞춰 한 곳만 골라도 충분합니다. Arenas의 전망대 접근 경로·운영시간은 별도 확인이 필요하고, 가격과 영업은 바뀔 수 있습니다. Clara는 맥주가 들어간 알코올 음료이며 레몬 등 조합은 매장에 확인하세요.",
            "links": [
              {
                "label": "Arenas 전망대 지도",
                "query": "Arenas de Barcelona viewpoint"
              },
              {
                "label": "베네치아 탑 지도",
                "query": "Torres Venecianes Barcelona"
              },
              {
                "label": "블라이/로세르 도보 경로",
                "url": "https://www.google.com/maps/dir/?api=1&origin=Pla%C3%A7a+d%27Espanya,+Barcelona&destination=Carrer+de+Blai+%26+Carrer+del+Roser,+Barcelona&travelmode=walking"
              },
              {
                "label": "La Tasqueta de Blai 안내",
                "url": "https://www.latasquetadeblai.com/en/contact"
              },
              {
                "label": "분수 정비·재개 공지",
                "url": "https://ajuntament.barcelona.cat/premsa/2026/10/21/la-font-magica-de-montjuic-saturara-de-l1-al-15-de-novembre-per-fer-les-tasques-de-manteniment-anual/"
              }
            ],
            "sources": [
              "arenasViewpoint",
              "arenasServices",
              "arenasHours",
              "torresHeritage",
              "torresGuide",
              "blaiMap",
              "blaiCity",
              "blaiVenue",
              "claraRae"
            ]
          },
          {
            id: 'bcn-card-breaks', icon: '☕', title: '쉬어가기 · 도심 저녁 산책',
            paragraphs: ['El Xalet de Montjuïc은 몬주익 공원의 Avinguda Miramar 31에 있으며 푸니쿨라와 가깝고, 공식 안내에 테라스와 시내 전망이 소개됩니다. 음료만 이용 가능한지는 확인되지 않았으니 방문 전 문의하세요.', 'Terraza Martínez는 몬주익 언덕의 해산물·쌀요리 식당으로 항구와 시내 전망을 내세웁니다. 공식 메뉴에서 현재 빠에야는 확인되지 않았고, 예약해도 특정 전망 좌석은 보장되지 않습니다.', '엘 코르테 잉글레스의 La Plaça Catalunya는 전망이 있는 식사 공간으로 안내됩니다. 공식 페이지는 9층 위치나 무료 전망대 이용을 확인해 주지 않으므로, 전망대처럼 가정하지 말고 층·운영시간·이용 조건을 확인하세요. Xurreria Trebol은 그라시아의 Còrsega 341 주소가 제3자 안내에 있으며, 츄러스와 진한 핫초콜릿으로 알려져 있습니다. 영업시간과 접근성은 미확인입니다.', '그라시아 거리의 카사 바트요·카사 밀라 외관이나 고딕 지구 대성당 광장은 식사 전후 짧은 산책 후보입니다. 피곤하면 무리해 이어 걷지 말고 택시나 대중교통으로 돌아가세요.'],
            note: '두 레스토랑 모두 몬주익 경사면에 있습니다. 부모님 동행 시 계단·경사·하차 지점과 귀가 수단을 미리 확인하세요.',
            links: [
              { label: 'El Xalet 지도', query: 'El Xalet de Montjuïc' },
              { label: 'Terraza Martínez 지도', query: 'Terraza Martínez Barcelona' },
              { label: 'La Plaça Catalunya 지도', query: 'La Plaça Catalunya El Corte Inglés Barcelona' },
              { label: 'Xurreria Trebol 지도', query: 'Xurreria Trebol Barcelona' }
            ], sources: ['xalet', 'xaletTourism', 'martinez', 'martinezBooking', 'elCorte', 'xurreria', 'xurreriaAddress', 'churros']
          }
        ],
        linkLabels: { transit: '교통 가이드 열기', safety: '소매치기 예방', phrases: '회화집에서 주문 표현 보기' }
      },
      chat: {
        title: '바르셀로나 현지 참고 안내',
        body: "바르셀로나 시청의 2026.10.21 공지는 마법의 분수쇼가 11월 1–15일 중단되고 11월 19일 재개 예정이라고 합니다. 11월 5–11일 가족 체류 동안에는 공연이 없습니다. 대안으로 Arenas 꼭대기 전망대, 베네치아 탑 외관, Carrer de Blai의 핀초 가게를 볼 수 있지만, Arenas 무료·야간 접근은 공식 확인되지 않았고 Blai까지는 지도상 약 22–25분입니다. 무릎 상태와 당일 운영을 확인하세요.",
        link: '현지 요약 보기'
      }
    },
    en: {
      nav: ['Home', 'Plan', 'Places', 'Views', 'More'],
      chatChip: '🇪🇸 Barceloneta dining tips',
      chatQuery: 'Barcelona Barceloneta restaurants and today menu',
      nightChatChip: "🌆 Plaça d’Espanya evening alternatives",
      nightChatQuery: "Plaça d’Espanya Magic Fountain evening alternatives for parents",
      snapshot: {
        kicker: 'BARCELONA · FAMILY TRIP', title: 'The essentials at a glance',
        lead: 'Barcelona, Nov 5–11 · family of three with parents in their 60s. Confirmed plans stay unchanged; this gathers optional food, transit and view notes.',
        facts: ['6 nights / 7 days', '1–2 sights + afternoon rest', 'Recheck service on the day'],
        links: [
          { icon: '🗓️', title: 'Itinerary', sub: 'Daily plan & rest', action: 'plan' },
          { icon: '📍', title: 'Places', sub: 'Regional guide', action: 'places' },
          { icon: '🍴', title: 'Local notes', sub: 'Beach, hill & food', action: 'local' },
          { icon: '🌆', title: 'Night views', sub: 'Events & viewpoints', action: 'night' }
        ]
      },
      guide: {
        kicker: 'BARCELONA · POCKET GUIDE', title: "Barceloneta · Montjuïc · Plaça d’Espanya evenings",
        intro: "This adds optional evening choices near Plaça d’Espanya without repeating the existing 7 Portes, waterfront walk or beach-rest plans. These are ideas, not confirmed bookings or fixed schedule items.",
        updated: "Source check: 8 Nov 2026 · Hours, prices and operations can change; check official information before setting out.",
        cards: [
          {
            id: 'bcn-card-food', icon: '🍽️', title: 'Barceloneta · places to eat',
            paragraphs: ['7 Portes is already in the plan and has served food since 1836. Its official May 2026 group menu lists fish Paella Parellada and Arroz Negro with cuttlefish and clams; check the day’s menu before relying on either dish.', 'Can Majó is a Barceloneta seafood restaurant; its official cuisine page features lobster rice. La Peninsular is a seafood-tapas bodega with a changing daily menu, so ask what is available today if you want octopus or prawns.'],
            note: 'The claim that Paella Parellada arrives with shellfish already peeled was not verified. On terraces, keep phones and wallets off the table; do not leave bags unattended on the sand. ',
            links: [
              { label: '7 Portes map', query: '7 Portes Barcelona' },
              { label: 'Can Majó map', query: 'Can Majó Barcelona' },
              { label: 'La Peninsular map', query: 'La Peninsular Barcelona' },
              { label: 'Pickpocket tips', action: 'safety' },
              { label: 'Ordering phrases', action: 'phrases' }
            ], sources: ['portes', 'portesMenu', 'canMajo', 'peninsular', 'peninsularLocal']
          },
          {
            id: 'bcn-card-waterfront', icon: '🌊', title: 'Port Vell · waterfront stroll',
            paragraphs: ['Port Vell and Rambla de Mar are already part of the existing route. The Port Authority describes Port Vell as a public waterfront space open to residents and visitors, with areas for walking and resting.', 'W Barcelona is the sail-shaped building at the end of the Barceloneta boardwalk. It makes an easy exterior photo backdrop; hotel facilities have their own guest and reservation conditions.', 'An early-morning beach stroll is an optional idea, not a new confirmed visit. Keep the existing 13:30–16:00 shaded rest and evening Port Olímpic promenade unchanged. Treat chiringuitos (beach bars) as possible rest stops only after checking that day’s opening, seating and toilet conditions.'],
            note: 'Do not leave a bag on the beach while everyone steps away for a photo. Keep the existing beach-rest and Port Olímpic plan rather than adding a long walk.',
            links: [
              { label: 'Port Vell map', query: 'Port Vell Barcelona Rambla de Mar' },
              { label: 'W Barcelona map', query: 'W Barcelona' },
              { label: 'Transit & routes', action: 'transit' }
            ], sources: ['port', 'wBarcelona']
          },
          {
            id: 'bcn-card-montjuic', icon: '⛰️', title: 'Montjuïc · views & fountain notice',
            paragraphs: ['MNAC’s rooftop viewpoint offers 360-degree views, but requires museum admission or a separate €2 ticket. Sunset or night access is not guaranteed outside the museum’s published hours; check the rooftop and exterior steps separately.', 'Montjuïc Castle’s official November–February hours are 10:00–18:00; adult admission is €12. Bus 150 from Plaça d’Espanya is listed as an access option; the cable car fare is separate from castle admission. The walk up from the funicular’s upper station is continuously uphill, with steep sections.', "Barcelona City Council’s notice dated 21 Oct 2026 says the Magic Fountain and fountains along Avinguda de la Reina Maria Cristina are stopped for annual maintenance from 1–15 November, with no shows during that period. The Fountain show is announced to resume on 19 November, then run Thursday–Saturday, 20:00–21:00, through 31 March 2027. No show is scheduled during the family’s 5–11 November stay. Recheck actual operations on the visit date."],
            note: "No Fountain show is scheduled during 5–11 November. The 19 November restart is an announced schedule, not live confirmation; check the day-of notice and do not wait late on the assumption of a show.",
            links: [
              { label: 'Transit & cable cars', action: 'transit' },
              { label: 'MNAC map', query: 'Museu Nacional d’Art de Catalunya' },
              { label: 'Montjuïc Castle map', query: 'Castell de Montjuïc Barcelona' }
            ], sources: ['mnac', 'castleVisit', 'castleAccess', 'fountainNotice2026', 'fountainArticle2026', 'fountainTimes']
          },
          {
            "id": "bcn-card-espanya",
            "icon": "🌃",
            "title": "Plaça d’Espanya · evening options without a Fountain show",
            "paragraphs": [
              "Arenas de Barcelona’s official pages describe a top-floor viewpoint with 360° views and terraces/restaurants, and list a panoramic elevator and escalators among centre services. They do not confirm that either route reaches the viewpoint, that an internal route is free, the lift fare, or separate night-time viewpoint hours. Do not assume free entry; ask the operator about a step-free route, price and closing time before going.",
              "The Venetian Towers are identified as entrance towers for the 1929 Exhibition. Official sources disagree on their height (44 m versus 47 m) and spell the architect’s name differently, so this guide does not settle either detail. Current lighting times and interior access were not verified. No officially designated photo point was found; take photos from pedestrian areas, stay off the roadway and traffic islands, and use marked crossings.",
              "For one Carrer de Blai example, La Tasqueta de Blai’s official page lists pinchos at €1.90–€4.50 and hours of 11:00–24:00 Sunday–Thursday and 11:00–01:00 Friday–Saturday. That is one venue’s posted range and schedule, not a street-wide average. The City describes pedestrian activity and terraces and reported 2026 paving repairs, but does not establish that the entire street is pedestrian-only. Google Maps gives 1.6–1.8 km and about 22–25 minutes from Plaça d’Espanya to Blai/Roser, labelled “mostly flat”; exact grade, surface and current works were not verified. If knees are painful, do not assume this is an easy walk; consider a taxi or transit."
            ],
            "note": "One stop may be enough for older parents. Confirm the viewpoint route and hours with Arenas; prices and operations can change. A clara contains beer and is alcoholic; ask the venue how it is mixed, including whether it contains lemon.",
            "links": [
              {
                "label": "Arenas viewpoint map",
                "query": "Arenas de Barcelona viewpoint"
              },
              {
                "label": "Venetian Towers map",
                "query": "Torres Venecianes Barcelona"
              },
              {
                "label": "Walking directions to Blai/Roser",
                "url": "https://www.google.com/maps/dir/?api=1&origin=Pla%C3%A7a+d%27Espanya,+Barcelona&destination=Carrer+de+Blai+%26+Carrer+del+Roser,+Barcelona&travelmode=walking"
              },
              {
                "label": "La Tasqueta de Blai details",
                "url": "https://www.latasquetadeblai.com/en/contact"
              },
              {
                "label": "Fountain maintenance/restart notice",
                "url": "https://ajuntament.barcelona.cat/premsa/2026/10/21/la-font-magica-de-montjuic-saturara-de-l1-al-15-de-novembre-per-fer-les-tasques-de-manteniment-anual/"
              }
            ],
            "sources": [
              "arenasViewpoint",
              "arenasServices",
              "arenasHours",
              "torresHeritage",
              "torresGuide",
              "blaiMap",
              "blaiCity",
              "blaiVenue",
              "claraRae"
            ]
          },
          {
            id: 'bcn-card-breaks', icon: '☕', title: 'A rest stop · central evening ideas',
            paragraphs: ['El Xalet de Montjuïc is at Avinguda Miramar 31 in Montjuïc Park, near the funicular. Its official information describes terraces and city views; it does not confirm drinks-only terrace access, so ask before going.', 'Terraza Martínez is on the Montjuïc hillside and promotes harbor and city views with seafood and rice dishes. Its current official menu did not confirm paella, and a reservation does not guarantee a particular view table.', 'La Plaça Catalunya at El Corte Inglés is described by the retailer as a food space with views. Its official page does not confirm a 9th-floor location or free observation-deck access, so check the floor, hours and conditions rather than assuming it is a free viewpoint. Xurreria Trebol is listed at Còrsega 341 in Gràcia by a third-party source and is known for churros with thick hot chocolate; current hours and accessibility are unverified.', 'Casa Batlló and Casa Milà on Passeig de Gràcia, or the Cathedral square in the Gothic Quarter, are options for a short exterior evening stroll. If tired, do not force a longer walk; use transit or a taxi back.'],
            note: 'Both hillside restaurants are on Montjuïc slopes. With older parents, confirm stairs, gradients, drop-off and return transport first.',
            links: [
              { label: 'El Xalet map', query: 'El Xalet de Montjuïc' },
              { label: 'Terraza Martínez map', query: 'Terraza Martínez Barcelona' },
              { label: 'La Plaça Catalunya map', query: 'La Plaça Catalunya El Corte Inglés Barcelona' },
              { label: 'Xurreria Trebol map', query: 'Xurreria Trebol Barcelona' }
            ], sources: ['xalet', 'xaletTourism', 'martinez', 'martinezBooking', 'elCorte', 'xurreria', 'xurreriaAddress', 'churros']
          }
        ],
        linkLabels: { transit: 'Open transit guide', safety: 'Pickpocket tips', phrases: 'Ordering phrases' }
      },
      chat: {
        title: 'Barcelona quick guide',
        body: "Barcelona City Council’s 21 Oct 2026 notice says the Magic Fountain is stopped 1–15 November, with a resumption announced for 19 November. No show is scheduled during the family’s 5–11 November stay. Alternatives include the Arenas top-floor viewpoint, exterior views of the Venetian Towers and a pincho stop on Carrer de Blai; however, free/night access to the Arenas viewpoint is unverified, and Blai is about 22–25 minutes away on the mapped walking options. Check mobility needs and current operations.",
        link: 'Open local guide'
      }
    },
    ja: {
      nav: ['ホーム', '日程', '場所', '夜景', 'その他'],
      chatChip: '🇪🇸 バルセロネータの食事メモ',
      chatQuery: 'バルセロネータ レストラン 当日のメニュー',
      nightChatChip: "🌆 スペイン広場・噴水ショーの代替案",
      nightChatQuery: "スペイン広場 噴水ショー 代替 夜景 両親",
      snapshot: {
        kicker: 'BARCELONA · FAMILY TRIP', title: '必要な情報をひと目で',
        lead: 'バルセロナ 11/5–11/11 · 60代のご両親を含む3人家族。確定済みの日程は変えず、食事・移動・夜景の参考情報をまとめました。',
        facts: ['6泊7日', '1日1〜2か所＋午後休憩', '運行・営業は当日再確認'],
        links: [
          { icon: '🗓️', title: '日程を見る', sub: '毎日の予定・休憩', action: 'plan' },
          { icon: '📍', title: '場所を見る', sub: '地域別ガイド', action: 'places' },
          { icon: '🍴', title: '現地メモ', sub: '海辺・丘・食事', action: 'local' },
          { icon: '🌆', title: '夜景を見る', sub: 'イベント・展望', action: 'night' }
        ]
      },
      guide: {
        kicker: 'BARCELONA · POCKET GUIDE', title: "バルセロネータ · モンジュイック · スペイン広場の夜景",
        intro: "既存の日程にある7 Portes、港の散策、海辺の休憩は繰り返さず、ご両親と選べるスペイン広場周辺の夕方の候補を補足します。以下は候補であり、予約済み・確定済みの予定ではありません。",
        updated: "情報確認日：2026年11月8日 · 営業時間・料金・運行状況は変わるため、訪問前に公式情報をご確認ください。",
        cards: [
          {
            id: 'bcn-card-food', icon: '🍽️', title: 'バルセロネータ · 食事候補',
            paragraphs: ['7 Portesは既存日程にも登場する1836年創業のレストランです。公式の2026年5月団体メニューには魚のPaella Parelladaとイカ・アサリ入りArroz Negroが掲載されていますが、当日の提供状況を確認してください。', 'Can Majóはバルセロネータのシーフード店で、公式料理案内にロブスターの米料理があります。La Peninsularは日替わりメニューの海鮮タパス店です。タコやエビを希望する場合は当日のメニューを尋ねてください。'],
            note: 'Paella Parelladaの貝殻が外されて提供されるという情報は確認できませんでした。テラスではスマートフォンや財布をテーブルに置かず、砂浜で写真を撮る際も荷物から目を離さないでください。',
            links: [
              { label: '7 Portes 地図', query: '7 Portes Barcelona' },
              { label: 'Can Majó 地図', query: 'Can Majó Barcelona' },
              { label: 'La Peninsular 地図', query: 'La Peninsular Barcelona' },
              { label: 'スリ対策', action: 'safety' },
              { label: '注文フレーズ', action: 'phrases' }
            ], sources: ['portes', 'portesMenu', 'canMajo', 'peninsular', 'peninsularLocal']
          },
          {
            id: 'bcn-card-waterfront', icon: '🌊', title: 'Port Vell · 海辺の散歩',
            paragraphs: ['Port VellとRambla de Marは既存ルートに含まれています。港湾局はPort Vellを市民・観光客に開かれた水辺の公共空間として紹介し、散歩や休憩ができる場所を案内しています。', 'バルセロネータ海岸遊歩道の端にあるW Barcelonaは帆のような外観の建物です。外からの記念写真に向いていますが、ホテル内施設には宿泊・予約条件があります。', '早朝の海辺散歩は任意の案で、新たな確定予定ではありません。既存の13:30〜16:00の日陰休憩と夕方のPort Olímpic散歩はそのままにしてください。チリンギート（ビーチバー）は当日の営業・座席・トイレ利用条件を確認してから休憩候補にしましょう。'],
            note: '写真撮影の際、全員が荷物から離れないでください。長い散歩を追加するより、既存の海辺休憩とPort Olímpicの予定を優先しましょう。',
            links: [
              { label: 'Port Vell 地図', query: 'Port Vell Barcelona Rambla de Mar' },
              { label: 'W Barcelona 地図', query: 'W Barcelona' },
              { label: '交通・ルート', action: 'transit' }
            ], sources: ['port', 'wBarcelona']
          },
          {
            id: 'bcn-card-montjuic', icon: '⛰️', title: 'モンジュイック · 展望と噴水情報',
            paragraphs: ['MNACの屋上展望台から360度の眺望を楽しめますが、館内への入場券または別途€2のチケットが必要です。美術館の開館時間外に夕景・夜景を見られるとは限らないため、屋上と屋外階段を分けて確認してください。', 'モンジュイック城の公式案内では、11〜2月の開館時間は10:00〜18:00、一般料金は€12です。Plaça d’Espanyaから150番バスを利用でき、ケーブルカー料金は城の入場料に含まれません。フニクラの上駅から城まではずっと上り坂で、急な区間があります。', "バルセロナ市の2026年10月21日付発表によると、マジカ噴水とAvinguda de la Reina Maria Cristina沿いの噴水は年次整備のため11月1〜15日に停止し、その間ショーはありません。噴水ショーは11月19日に再開予定で、その後2027年3月31日まで木・金・土の20:00〜21:00に開催予定です。ご家族の滞在日11月5〜11日にショーは予定されていません。実際の運行は訪問日に再確認してください。"],
            note: "11月5〜11日に噴水ショーは予定されていません。11月19日の再開は発表済みの予定であり、当日の運行確認ではありません。ショーを前提に夜遅くまで待たないでください。",
            links: [
              { label: '交通・ケーブルカー', action: 'transit' },
              { label: 'MNAC 地図', query: 'Museu Nacional d’Art de Catalunya' },
              { label: 'モンジュイック城 地図', query: 'Castell de Montjuïc Barcelona' }
            ], sources: ['mnac', 'castleVisit', 'castleAccess', 'fountainNotice2026', 'fountainArticle2026', 'fountainTimes']
          },
          {
            "id": "bcn-card-espanya",
            "icon": "🌃",
            "title": "スペイン広場 · 噴水ショーに頼らない夕方の候補",
            "paragraphs": [
              "Arenas de Barcelonaの公式案内は、最上階の360°展望台とテラス・レストランを紹介し、施設サービスとしてパノラマエレベーターとエスカレーターを掲載しています。ただし、どちらが展望台に通じるか、館内ルートが無料か、エレベーター料金、展望台の夜間営業時間は確認できません。無料入場を前提にせず、段差の少ない経路・料金・閉館時刻を事前に問い合わせてください。",
              "ベネチア塔は1929年博覧会会場の入口塔として確認されています。公式資料で高さは44mと47mに分かれ、建築家名の表記も異なるため、ここでは一つの数値に決めません。現在のライトアップ時間や内部公開も確認できませんでした。公式に指定された撮影場所は確認できていないため、写真は歩道から撮り、車道や交通島には立ち入らず、横断歩道を利用してください。",
              "Carrer de Blaiの例として、La Tasqueta de Blai公式ページはピンチョスを€1.90〜€4.50、営業時間を日〜木11:00〜24:00、金・土11:00〜翌1:00と掲載しています。これは一店舗の表示価格・営業時間で、通り全体の相場ではありません。市は歩行者の多い通りとテラス、2026年の舗装補修を紹介していますが、通り全体が歩行者専用とは確認できません。Google マップではスペイン広場からBlai/Roser交差点まで1.6〜1.8km、約22〜25分、「おおむね平坦」と表示されますが、正確な勾配・路面・工事状況は未確認です。膝が痛む場合は楽な徒歩コースと決めつけず、タクシーや公共交通も検討してください。"
            ],
            "note": "ご両親の膝の状態に合わせて一か所だけ選んでも十分です。Arenas展望台への経路と営業時間は事前確認が必要で、料金や営業状況も変わります。claraにはビールが含まれ、アルコール飲料です。レモンなどの配合は店に確認してください。",
            "links": [
              {
                "label": "Arenas展望台 地図",
                "query": "Arenas de Barcelona viewpoint"
              },
              {
                "label": "ベネチア塔 地図",
                "query": "Torres Venecianes Barcelona"
              },
              {
                "label": "Blai/Roserへの徒歩ルート",
                "url": "https://www.google.com/maps/dir/?api=1&origin=Pla%C3%A7a+d%27Espanya,+Barcelona&destination=Carrer+de+Blai+%26+Carrer+del+Roser,+Barcelona&travelmode=walking"
              },
              {
                "label": "La Tasqueta de Blai 案内",
                "url": "https://www.latasquetadeblai.com/en/contact"
              },
              {
                "label": "噴水の整備・再開告知",
                "url": "https://ajuntament.barcelona.cat/premsa/2026/10/21/la-font-magica-de-montjuic-saturara-de-l1-al-15-de-novembre-per-fer-les-tasques-de-manteniment-anual/"
              }
            ],
            "sources": [
              "arenasViewpoint",
              "arenasServices",
              "arenasHours",
              "torresHeritage",
              "torresGuide",
              "blaiMap",
              "blaiCity",
              "blaiVenue",
              "claraRae"
            ]
          },
          {
            id: 'bcn-card-breaks', icon: '☕', title: '休憩先 · 市内の夜散歩',
            paragraphs: ['El Xalet de Montjuïcはモンジュイック公園のAvinguda Miramar 31にあり、フニクラの近くです。公式案内はテラスと市街の眺望を紹介していますが、飲み物だけでテラスを利用できるかは確認できません。事前に問い合わせてください。', 'Terraza Martínezはモンジュイックの斜面にあるシーフード・米料理店で、港と市街の眺望を案内しています。現在の公式メニューでパエリアは確認できず、予約しても特定の眺望席は保証されません。', 'El Corte InglésのLa Plaça Catalunyaは、眺望のある飲食スペースとして公式に案内されています。ただし公式ページでは9階の場所や無料展望台利用を確認できないため、階・営業時間・利用条件を確かめてください。Xurreria Trebolは第三者情報でグラシア地区Còrsega 341とされ、濃厚なホットチョコレートとチュロスで知られます。営業時間とアクセシビリティは未確認です。', 'Passeig de GràciaのCasa Batlló・Casa Milàの外観やゴシック地区の大聖堂前広場は、食事の前後に短く散歩する候補です。疲れたら無理に歩かず、交通機関やタクシーで戻りましょう。'],
            note: '丘のレストラン2店はモンジュイックの斜面にあります。ご両親と訪れる場合は階段・坂・降車場所・帰りの交通を先に確認してください。',
            links: [
              { label: 'El Xalet 地図', query: 'El Xalet de Montjuïc' },
              { label: 'Terraza Martínez 地図', query: 'Terraza Martínez Barcelona' },
              { label: 'La Plaça Catalunya 地図', query: 'La Plaça Catalunya El Corte Inglés Barcelona' },
              { label: 'Xurreria Trebol 地図', query: 'Xurreria Trebol Barcelona' }
            ], sources: ['xalet', 'xaletTourism', 'martinez', 'martinezBooking', 'elCorte', 'xurreria', 'xurreriaAddress', 'churros']
          }
        ],
        linkLabels: { transit: '交通ガイドを開く', safety: 'スリ対策を見る', phrases: '注文フレーズを見る' }
      },
      chat: {
        title: 'バルセロナ現地メモ',
        body: "バルセロナ市の2026年10月21日付告知では、マジカ噴水は11月1〜15日に停止し、11月19日に再開予定です。ご家族の滞在11月5〜11日にショーはありません。代替候補はArenas最上階の展望台、ベネチア塔の外観、Carrer de Blaiのピンチョス店ですが、Arenas展望台の無料・夜間アクセスは未確認で、Blaiまでは地図上約22〜25分です。歩行負担と当日の運行をご確認ください。",
        link: '現地ガイドを開く'
      }
    },
    zh: {
      nav: ['首页', '行程', '地点', '夜景', '更多'],
      chatChip: '🇪🇸 巴塞罗内塔用餐提示',
      chatQuery: '巴塞罗内塔餐厅 当日菜单',
      nightChatChip: "🌆 西班牙广场喷泉秀替代夜游",
      nightChatQuery: "西班牙广场 魔幻喷泉 替代夜景 长辈",
      snapshot: {
        kicker: 'BARCELONA · FAMILY TRIP', title: '常用信息一眼查看',
        lead: '巴塞罗那 11月5–11日 · 三人家庭（同行长辈60多岁）。不改已确定行程，只汇总交通、用餐和夜景参考。',
        facts: ['6晚7天', '每天1–2个景点＋午后休息', '当天再查运营信息'],
        links: [
          { icon: '🗓️', title: '查看行程', sub: '每日路线与休息', action: 'plan' },
          { icon: '📍', title: '查看地点', sub: '分区指南', action: 'places' },
          { icon: '🍴', title: '当地速览', sub: '海边、山上与用餐', action: 'local' },
          { icon: '🌆', title: '查看夜景', sub: '活动与观景点', action: 'night' }
        ]
      },
      guide: {
        kicker: 'BARCELONA · POCKET GUIDE', title: "巴塞罗内塔 · 蒙特惠奇 · 西班牙广场夜景",
        intro: "补充西班牙广场周边适合与长辈商量的晚间选择，不重复原计划中的7 Portes、港口散步和海边休息。以下只是备选建议，并非已预订或确定的行程。",
        updated: "资料核对：2026年11月8日 · 营业、价格和运营可能变化，出发前请查看官方信息。",
        cards: [
          {
            id: 'bcn-card-food', icon: '🍽️', title: '巴塞罗内塔 · 用餐选择',
            paragraphs: ['7 Portes已在原行程中出现，餐厅自1836年营业。其官方2026年5月团体菜单列有鱼肉Paella Parellada，以及含墨鱼和蛤蜊的Arroz Negro；是否当天供应请先确认。', 'Can Majó是巴塞罗内塔的海鲜餐厅，官网介绍了龙虾米饭。La Peninsular是菜单每日变化的海鲜小吃酒馆；如果想吃章鱼或虾，请先询问当天菜单。'],
            note: '没有找到Paella Parellada会预先剥好海鲜外壳的依据。露台用餐时不要把手机、钱包放在桌上；在沙滩拍照也不要让行李无人看管。',
            links: [
              { label: '7 Portes地图', query: '7 Portes Barcelona' },
              { label: 'Can Majó地图', query: 'Can Majó Barcelona' },
              { label: 'La Peninsular地图', query: 'La Peninsular Barcelona' },
              { label: '防扒提示', action: 'safety' },
              { label: '点餐短语', action: 'phrases' }
            ], sources: ['portes', 'portesMenu', 'canMajo', 'peninsular', 'peninsularLocal']
          },
          {
            id: 'bcn-card-waterfront', icon: '🌊', title: 'Port Vell · 海滨散步',
            paragraphs: ['Port Vell和Rambla de Mar已经包含在原路线中。巴塞罗那港务局将Port Vell介绍为向市民和游客开放的海滨公共空间，可散步、休息。', 'W Barcelona位于巴塞罗内塔海滨步道尽头，是帆形建筑，可作为外部合影背景。酒店内部设施另有住客和预订条件。', '清晨海边散步只是可选想法，不是新增的确定行程。原有13:30–16:00的阴凉处休息和傍晚Port Olímpic散步保持不变。Chiringuito（海滩酒吧）仅作为休息候选，请先确认当天营业、座位和洗手间使用条件。'],
            note: '拍照时不要让全体同行者同时离开行李。与其增加较长步行，不如优先保留原有海滩休息和Port Olímpic安排。',
            links: [
              { label: 'Port Vell地图', query: 'Port Vell Barcelona Rambla de Mar' },
              { label: 'W Barcelona地图', query: 'W Barcelona' },
              { label: '查看交通路线', action: 'transit' }
            ], sources: ['port', 'wBarcelona']
          },
          {
            id: 'bcn-card-montjuic', icon: '⛰️', title: '蒙特惠奇 · 观景与喷泉公告',
            paragraphs: ['MNAC屋顶观景台可360度眺望城市，但需要博物馆门票或另购€2门票。不能假设博物馆开放时间外仍可在日落或夜间进入；请分别确认屋顶和外部台阶的开放情况。', '城堡官网列出的11月至次年2月开放时间为10:00–18:00，成人门票€12。可从Plaça d’Espanya搭乘150路公交；缆车票价不含城堡门票。从缆车铁路上站步行到城堡一路上坡，部分路段较陡。', "巴塞罗那市政府2026年10月21日公告称，魔幻喷泉及玛丽亚·克里斯蒂娜大道沿线喷泉将于11月1–15日因年度维护停运，期间没有演出。喷泉演出计划于11月19日恢复，之后至2027年3月31日安排在周四、周五和周六20:00–21:00。家人11月5–11日停留期间没有演出安排。实际是否恢复请在出行当天再次确认。"],
            note: "11月5–11日没有喷泉演出安排。11月19日恢复是公告中的计划，不代表当天实时确认；请出行当日再查，不要为了等演出而逗留到很晚。",
            links: [
              { label: '交通与缆车', action: 'transit' },
              { label: 'MNAC地图', query: 'Museu Nacional d’Art de Catalunya' },
              { label: '蒙特惠奇城堡地图', query: 'Castell de Montjuïc Barcelona' }
            ], sources: ['mnac', 'castleVisit', 'castleAccess', 'fountainNotice2026', 'fountainArticle2026', 'fountainTimes']
          },
          {
            "id": "bcn-card-espanya",
            "icon": "🌃",
            "title": "西班牙广场 · 不等喷泉演出的晚间选择",
            "paragraphs": [
              "Arenas de Barcelona官网介绍了顶层360°观景台、露台和餐厅，并在设施列表中列出全景电梯与自动扶梯。但官网没有确认它们是否通往观景台、馆内路线是否免费、全景电梯票价或观景台夜间开放时间。不要假设可以免费进入；出发前向运营方确认无台阶路线、价格和闭场时间。",
              "威尼斯塔被官方资料列为1929年博览会入口塔。官方资料对高度分别记为44米和47米，建筑师姓名拼写也不一致，因此这里不确定一个数字。当前亮灯时间和内部开放情况也未核实。没有找到官方指定的拍照点；请在步行区域拍照，不要站在车道或交通岛上，并使用有标线的人行横道。",
              "以Carrer de Blai的一家店为例，La Tasqueta de Blai官网标注pinchos价格为€1.90–€4.50，营业时间为周日至周四11:00–24:00、周五周六11:00–次日01:00。这只是单店标价和时间，不代表整条街的平均水平。市政府介绍该街行人活动和露台，并提及2026年路面维修，但没有确认整条街都是步行专用街。Google地图显示从西班牙广场到Blai/Roser路口约1.6–1.8公里、22–25分钟，标注为“大致平坦”；实际坡度、路面和施工情况未经核实。如膝盖不适，不要把它当成轻松步行路线，可考虑出租车或公共交通。"
            ],
            "note": "陪长辈时选一个地点即可。请向Arenas确认观景台路线和开放时间；价格与运营可能变化。clara含啤酒，属于含酒精饮品；柠檬等调配方式请向店家确认。",
            "links": [
              {
                "label": "Arenas观景台地图",
                "query": "Arenas de Barcelona viewpoint"
              },
              {
                "label": "威尼斯塔地图",
                "query": "Torres Venecianes Barcelona"
              },
              {
                "label": "步行至Blai/Roser路线",
                "url": "https://www.google.com/maps/dir/?api=1&origin=Pla%C3%A7a+d%27Espanya,+Barcelona&destination=Carrer+de+Blai+%26+Carrer+del+Roser,+Barcelona&travelmode=walking"
              },
              {
                "label": "La Tasqueta de Blai详情",
                "url": "https://www.latasquetadeblai.com/en/contact"
              },
              {
                "label": "喷泉维护与恢复公告",
                "url": "https://ajuntament.barcelona.cat/premsa/2026/10/21/la-font-magica-de-montjuic-saturara-de-l1-al-15-de-novembre-per-fer-les-tasques-de-manteniment-anual/"
              }
            ],
            "sources": [
              "arenasViewpoint",
              "arenasServices",
              "arenasHours",
              "torresHeritage",
              "torresGuide",
              "blaiMap",
              "blaiCity",
              "blaiVenue",
              "claraRae"
            ]
          },
          {
            id: 'bcn-card-breaks', icon: '☕', title: '休息点 · 市区夜间散步',
            paragraphs: ['El Xalet de Montjuïc位于蒙特惠奇公园Avinguda Miramar 31，靠近缆车铁路。官网介绍了露台和城市景观，但没有确认只点饮料是否可使用露台，出发前请咨询。', 'Terraza Martínez位于蒙特惠奇山坡，主打海港和城市景观、海鲜与米饭菜式。其当前官方菜单未确认有海鲜饭；预订也不保证具体观景座位。', 'El Corte Inglés的La Plaça Catalunya被官方介绍为可看景的餐饮空间。官网未确认其位于9楼或可免费作为观景台使用，请先核实楼层、营业时间与使用条件。第三方信息将Xurreria Trebol地址列为格拉西亚区Còrsega 341，以吉事果和浓稠热巧克力知名；当前营业时间和无障碍信息未核实。', 'Passeig de Gràcia上的Casa Batlló、Casa Milà外观，或哥特区大教堂广场，可作为餐前餐后的短程散步选择。累了就不要勉强长走，搭乘交通工具或出租车返回。'],
            note: '两家山坡餐厅都在蒙特惠奇斜坡上。陪长辈前往时，请先确认台阶、坡度、下车位置和返程方式。',
            links: [
              { label: 'El Xalet地图', query: 'El Xalet de Montjuïc' },
              { label: 'Terraza Martínez地图', query: 'Terraza Martínez Barcelona' },
              { label: 'La Plaça Catalunya地图', query: 'La Plaça Catalunya El Corte Inglés Barcelona' },
              { label: 'Xurreria Trebol地图', query: 'Xurreria Trebol Barcelona' }
            ], sources: ['xalet', 'xaletTourism', 'martinez', 'martinezBooking', 'elCorte', 'xurreria', 'xurreriaAddress', 'churros']
          }
        ],
        linkLabels: { transit: '打开交通指南', safety: '查看防扒提示', phrases: '查看点餐短语' }
      },
      chat: {
        title: '巴塞罗那当地提示',
        body: "巴塞罗那市政府2026年10月21日公告称，魔幻喷泉11月1–15日停运，计划于11月19日恢复。家人11月5–11日停留期间没有演出。备选包括Arenas顶层观景台、威尼斯塔外观和Carrer de Blai的pinchos店；但Arenas观景台免费或夜间开放未获官方确认，步行至Blai的地图估算约22–25分钟。请结合膝盖情况并核实当天运营。",
        link: '查看当地速览'
      }
    }
  };

  function esc(value) {
    return String(value == null ? '' : value).replace(/[&<>"']/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));
  }

  function currentLocale(lang) { return copy[lang] ? lang : 'ko'; }

  function mapUrl(query) {
    return 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(query);
  }

  function injectMounts() {
    const overview = document.querySelector('#page-overview-0 .hero-content-wrap');
    const heroHeader = overview && overview.querySelector('.hero-header-row');
    if (heroHeader && !document.getElementById('tripSnapshotMount')) {
      const mount = document.createElement('div');
      mount.id = 'tripSnapshotMount';
      heroHeader.before(mount);
    }

    const transitMount = document.getElementById('barcelona-transit-guide-mount');
    if (transitMount && !document.getElementById('barcelonaLocalGuideMount')) {
      const wrapper = transitMount.closest('.wrap') || transitMount.parentElement;
      if (wrapper) {
        const mount = document.createElement('div');
        mount.className = 'wrap';
        mount.id = 'barcelonaLocalGuideMount';
        wrapper.insertAdjacentElement('afterend', mount);
      }
    }
  }

  function openTopic(topic) {
    if (topic === 'plan') {
      window.switchGuidebookChapter?.('chapter-planner');
      window.goToBookPage?.('chapter-planner', 0, false);
    } else if (topic === 'places') {
      window.switchGuidebookChapter?.('chapter-guide');
      window.goToBookPage?.('chapter-guide', 0, false);
    } else if (topic === 'night') {
      window.switchGuidebookChapter?.('chapter-festivals');
      window.goToBookPage?.('chapter-festivals', 0, false);
    } else if (topic === 'transit') {
      window.goToBarcelonaTransitGuide?.();
      return;
    } else if (topic === 'safety' || topic === 'phrases') {
      window.switchGuidebookChapter?.('chapter-practical');
      window.goToBookPage?.('chapter-practical', topic === 'safety' ? 3 : 1, false);
    } else {
      window.switchGuidebookChapter?.('chapter-practical', false);
      window.goToBookPage?.('chapter-practical', 4, false);
      const detailIds = { food: 'bcn-card-food', montjuic: 'bcn-card-montjuic', waterfront: 'bcn-card-waterfront', breaks: 'bcn-card-breaks', espanya: 'bcn-card-espanya' };
      const detailId = detailIds[topic] || '';
      window.setTimeout(() => {
        if (detailId) {
          const detail = document.getElementById(detailId);
          if (detail) { detail.open = true; detail.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
        } else {
          const section = document.getElementById('barcelona-local-guide');
          if (section) section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 140);
    }
    if (window.closeChatWindow) window.closeChatWindow();
  }

  window.openBarcelonaLocalTopic = openTopic;
  window.goToBarcelonaLocalGuide = () => openTopic('local');

  function renderSnapshot(lang) {
    const mount = document.getElementById('tripSnapshotMount');
    if (!mount) return;
    const c = copy[currentLocale(lang)].snapshot;
    mount.innerHTML = `<section class="trip-snapshot" aria-labelledby="tripSnapshotTitle">
      <div class="trip-snapshot-head"><div><p class="trip-snapshot-kicker">${esc(c.kicker)}</p><h2 id="tripSnapshotTitle">${esc(c.title)}</h2><p class="trip-snapshot-lead">${esc(c.lead)}</p></div></div>
      <div class="trip-snapshot-facts">${c.facts.map(text => `<span class="trip-snapshot-fact">${esc(text)}</span>`).join('')}</div>
      <div class="trip-snapshot-links">${c.links.map(item => `<button type="button" class="trip-snapshot-link" onclick="openBarcelonaLocalTopic('${esc(item.action)}')"><span class="snap-icon" aria-hidden="true">${esc(item.icon)}</span><span class="snap-text"><strong>${esc(item.title)}</strong><small>${esc(item.sub)}</small></span></button>`).join('')}</div>
    </section>`;
  }

  function renderCard(card, lang) {
    const paragraphs = card.paragraphs.map(text => `<p>${esc(text)}</p>`).join('');
    const links = card.links.map(item => {
      if (item.action) return `<button type="button" class="bcn-local-link" onclick="openBarcelonaLocalTopic('${esc(item.action)}')">${esc(item.label)}</button>`;
      const href = item.url || mapUrl(item.query);
      return `<a class="bcn-local-link" href="${esc(href)}" target="_blank" rel="noopener noreferrer">${esc(item.label)} ↗</a>`;
    }).join('');
    const sourceLinks = card.sources.map(id => `<a href="${esc(sources[id].url)}" target="_blank" rel="noopener noreferrer">${esc(sources[id].names[lang])} ↗</a>`).join('');
    return `<details class="bcn-local-card" id="${esc(card.id)}"><summary><span class="bcn-local-card-icon" aria-hidden="true">${esc(card.icon)}</span><span>${esc(card.title)}</span></summary><div class="bcn-local-card-body">${paragraphs}<p class="bcn-local-note">${esc(card.note)}</p><div class="bcn-local-links">${links}</div><div class="bcn-local-source-list" aria-label="${lang === 'ko' ? '출처' : lang === 'ja' ? '出典' : lang === 'zh' ? '来源' : 'Sources'}">${sourceLinks}</div></div></details>`;
  }

  function renderGuide(lang) {
    const mount = document.getElementById('barcelonaLocalGuideMount');
    if (!mount) return;
    const c = copy[currentLocale(lang)].guide;
    const labels = c.linkLabels;
    mount.innerHTML = `<section class="bcn-local-guide" id="barcelona-local-guide" lang="${currentLocale(lang)}" aria-labelledby="barcelonaLocalGuideTitle">
      <header class="bcn-local-guide-head"><div><p class="bcn-local-kicker">${esc(c.kicker)}</p><h2 id="barcelonaLocalGuideTitle">${esc(c.title)}</h2><p class="bcn-local-intro">${esc(c.intro)}</p></div></header>
      <div class="bcn-local-guide-grid">${c.cards.map(card => renderCard(card, currentLocale(lang))).join('')}</div>
      <div class="bcn-local-links">
        <button type="button" class="bcn-local-link" onclick="openBarcelonaLocalTopic('transit')">${esc(labels.transit)}</button>
        <button type="button" class="bcn-local-link" onclick="openBarcelonaLocalTopic('safety')">${esc(labels.safety)}</button>
        <button type="button" class="bcn-local-link" onclick="openBarcelonaLocalTopic('phrases')">${esc(labels.phrases)}</button>
      </div>
      <p class="bcn-local-update">${esc(c.updated)}</p>
    </section>`;
  }

  function render(lang) {
    const locale = currentLocale(lang || window.currentLang || 'ko');
    injectMounts();
    const navKeys = ['m_nav_overview', 'm_nav_planner', 'm_nav_guide', 'm_nav_festivals', 'm_nav_practical'];
    Object.keys(copy).forEach(language => {
      if (typeof I18N_DICTIONARY !== 'undefined' && I18N_DICTIONARY[language]) {
        navKeys.forEach((key, index) => { I18N_DICTIONARY[language][key] = copy[language].nav[index]; });
      }
      if (typeof CHATBOT_I18N !== 'undefined' && CHATBOT_I18N[language] && Array.isArray(CHATBOT_I18N[language].chips)) {
        const chips = [
          { text: copy[language].chatChip, q: copy[language].chatQuery },
          { text: copy[language].nightChatChip, q: copy[language].nightChatQuery }
        ];
        chips.slice().reverse().forEach(chip => {
          if (!CHATBOT_I18N[language].chips.some(item => item.q === chip.q)) CHATBOT_I18N[language].chips.unshift(chip);
        });
      }
    });
    navKeys.forEach((key, index) => {
      document.querySelectorAll(`#mobileBottomNav [data-i18n="${key}"]`).forEach(element => { element.textContent = copy[locale].nav[index]; });
    });
    renderSnapshot(locale);
    renderGuide(locale);
  }

  function buildChatResponse(query, lang) {
    const q = String(query || '').toLowerCase();
    const espanyaIntent = /pla[cç]a d.?espanya|españa square|spain square|에스파냐 광장|スペイン広場|西班牙广场|arenas de barcelona|arenas viewpoint|arenas rooftop|아레나스|베네치아 탑|torres venecianes|venetian towers|ベネチア塔|威尼斯塔|carrer de blai|blai\/roser|blai street|블라이|ブライ|布拉伊|pinchos?|pintxos?|핀초스|ピンチョス|(?:magic fountain|font m[aà]gica|マジカ噴水|魔幻喷泉|마법의 분수|噴水).{0,18}(?:alternative|instead|replacement|대안|대체|代替|替代)|(?:alternative|replacement|代替|替代).{0,18}(?:magic fountain|font m[aà]gica|マジカ噴水|魔幻喷泉|마법의 분수|噴水)/i.test(q);
    const routeIntent = /t[-\s]?familiar|transfer|route|directions|bus|funicular|cable car|교통|환승|버스|푸니쿨라|ケーブル|乗換|公交|换乘/i.test(q);
    if (routeIntent && !espanyaIntent) return null;
    const foodIntent = /7 portes|can maj|la peninsular|xurreria|terraza mart|el xalet|el corte|la plaça|paella|arroz negro|tapas|tap[aá]s|restaurant|food|dining|eat|맛집|식당|빠에야|먹물|해산물|타파스|추로스|주문|메뉴|バル|レストラン|食事|パエリア|タパス|チュロス|菜单|海鲜|餐厅|吃饭|吉事果|carrer de blai|pinchos?|pintxos?|블라이|핀초스|ブライ|ピンチョス|布拉伊/i.test(q);
    const viewIntent = /montju|mnac|magic fountain|font m[aà]gica|castle|castell|port vell|rambla de mar|w barcelona|viewpoint|sunset|night view|fountain|early morning|morning beach|야경|전망|분수|몬주익|성|항구|산책|이른 아침|展望|噴水|夜景|城|港|早朝|景色|观景|喷泉|夜景|城堡|港口|清晨|arenas|torres venecianes|venetian towers|pla[cç]a d.?espanya|españa square|スペイン広場|西班牙广场|ベネチア塔|威尼斯塔/i.test(q);
    const breaksIntent = /xurreria|terraza mart|el xalet|el corte|la plaça/.test(q);
    if (!foodIntent && !viewIntent && !espanyaIntent) return null;
    lang = currentLocale(lang || window.currentLang || 'ko');
    const c = copy[lang];
    const topic = espanyaIntent ? 'espanya' : breaksIntent ? 'breaks' : foodIntent && !viewIntent ? 'food'
      : /montju|mnac|fountain|font m[aà]gica|magic fountain|castle|castell|분수|몬주익|噴水|城堡|蒙特惠奇|喷泉/.test(q) ? 'montjuic'
      : /port vell|rambla de mar|w barcelona|early morning|morning beach|항구|산책|이른 아침|港|港口|早朝|清晨/.test(q) ? 'waterfront' : 'breaks';
    const cardIds = { food: 'bcn-card-food', montjuic: 'bcn-card-montjuic', waterfront: 'bcn-card-waterfront', breaks: 'bcn-card-breaks', espanya: 'bcn-card-espanya' };
    const card = c.guide.cards.find(item => item.id === cardIds[topic]);
    const asksFountain = /fountain|font m[aà]gica|magic fountain|분수|噴水|喷泉|마법의 분수|マジカ噴水/.test(q);
    const asksMorning = /early morning|morning beach|이른 아침|아침 해변|早朝|清晨/.test(q);
    const plazaParagraph = /arenas|아레나스/.test(q) ? 0
      : /torres venecianes|venetian towers|베네치아 탑|ベネチア塔|威尼斯塔/.test(q) ? 1
      : /carrer de blai|blai\/roser|blai street|블라이|핀초스|ピンチョス|布拉伊|pinchos?|pintxos?/.test(q) ? 2 : -1;
    const breakParagraph = /el corte|la plaça|xurreria/.test(q) ? 2 : /terraza mart/.test(q) ? 1 : /el xalet/.test(q) ? 0 : -1;
    const foodParagraph = /7 portes/.test(q) ? 0 : /can maj|la peninsular/.test(q) ? 1 : -1;
    const body = topic === 'espanya' && plazaParagraph >= 0 ? card.paragraphs[plazaParagraph]
      : topic === 'espanya' ? c.chat.body
      : topic === 'montjuic' && asksFountain ? card.paragraphs[2]
      : topic === 'waterfront' && asksMorning ? card.paragraphs[2]
      : topic === 'breaks' && breakParagraph >= 0 ? card.paragraphs[breakParagraph]
      : topic === 'food' && foodParagraph >= 0 ? card.paragraphs[foodParagraph]
      : card ? card.paragraphs.slice(0, 2).join(' ') : c.chat.body;
    const specificSources = /arenas|아레나스/.test(q) ? ['arenasViewpoint', 'arenasServices', 'arenasHours']
      : /torres venecianes|venetian towers|베네치아 탑|ベネチア塔|威尼斯塔/.test(q) ? ['torresHeritage', 'torresGuide']
      : /carrer de blai|blai\/roser|blai street|블라이|핀초스|ピンチョス|布拉伊|pinchos?|pintxos?/.test(q) ? ['blaiMap', 'blaiCity', 'blaiVenue', 'claraRae']
      : /7 portes/.test(q) ? ['portes', 'portesMenu']
      : /can maj/.test(q) ? ['canMajo']
      : /la peninsular/.test(q) ? ['peninsular', 'peninsularLocal']
      : /el corte|la plaça/.test(q) ? ['elCorte']
      : /xurreria/.test(q) ? ['xurreria', 'xurreriaAddress', 'churros']
      : /terraza mart/.test(q) ? ['martinez', 'martinezBooking']
      : /el xalet/.test(q) ? ['xalet', 'xaletTourism'] : null;
    const references = topic === 'montjuic' && asksFountain ? ['fountainNotice2026', 'fountainArticle2026', 'fountainTimes']
      : topic === 'espanya' && asksFountain ? ['fountainNotice2026', 'arenasViewpoint', 'blaiMap']
      : specificSources || (card ? card.sources.slice(0, 4) : ['port', 'wBarcelona']);
    const sourceHtml = references.map(id => `<a class="bcn-transit-source" href="${esc(sources[id].url)}" target="_blank" rel="noopener noreferrer">${esc(sources[id].names[lang])}</a>`).join('');
    return `<div class="bcn-transit-chat-answer"><strong>${esc(c.chat.title)}</strong><p>${esc(body)}</p><div class="bcn-transit-sources">${sourceHtml}</div><button type="button" class="chat-quick-chip" onclick="openBarcelonaLocalTopic('${topic}')">${esc(c.chat.link)}</button></div>`;
  }

  window.BARCELONA_LOCAL_GUIDE = { content: copy, sources, render };
  window.renderBarcelonaLocalGuide = render;
  window.buildBarcelonaLocalChatResponse = buildChatResponse;

  injectMounts();
  document.addEventListener('DOMContentLoaded', () => render(window.currentLang || 'ko'));
  if (document.readyState !== 'loading') render(window.currentLang || 'ko');
})();
