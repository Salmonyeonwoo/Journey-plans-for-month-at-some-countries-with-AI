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
        kicker: 'BARCELONA · POCKET GUIDE', title: '바르셀로네타 · 몬주익 · 시내 야경',
        intro: '기존 일정의 7 Portes·항구 산책·해변 휴식은 반복하지 않고, 주변 선택지를 짧게 보탭니다. 아래 항목은 아이디어이며 예약이나 확정 일정이 아닙니다.',
        updated: '운영·가격 확인 기준: 2026.11.07 · 현장 운영은 달라질 수 있으니 방문 전 공식 안내를 확인하세요.',
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
            paragraphs: ['MNAC 루프톱은 360도 전망을 제공하지만 미술관 입장권 또는 별도 €2 티켓이 필요합니다. 박물관 운영시간 밖의 일몰·야경 개방은 보장되지 않으니, 외부 계단 전망과 루프톱을 구분해 확인하세요.', '몬주익 성은 11–2월 공식 안내 기준 10:00–18:00, 성인 €12입니다. Plaça d’Espanya에서 150번 버스를 이용할 수 있고 케이블카 요금은 성 입장권과 별도입니다. 푸니쿨라 상부역에서 성까지는 계속 오르막이며 가파른 구간이 있습니다.', '시청의 현재 공지는 마법의 분수와 Reina Maria Cristina 대로 분수들이 11월 1–15일 정비로 운영되지 않으며 공연도 없다고 안내합니다. 공지에 연도가 적혀 있지 않고, 11월 15일 이후 재개 일정도 이 페이지에서 확인되지 않았습니다.'],
            note: '야간 분수쇼를 전제로 늦게까지 머무르지 마세요. 몬주익 이동 수단·성 입장·MNAC 루프톱 운영시간을 당일 공식 페이지에서 다시 확인하세요.',
            links: [
              { label: '교통·케이블카 안내', action: 'transit' },
              { label: 'MNAC 지도', query: 'Museu Nacional d’Art de Catalunya' },
              { label: '몬주익 성 지도', query: 'Castell de Montjuïc Barcelona' }
            ], sources: ['mnac', 'castleVisit', 'castleAccess', 'fountain']
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
        body: '바르셀로네타 식당은 당일 메뉴와 예약 여부를 확인하세요. 7 Portes 공식 2026년 5월 메뉴에는 Paella Parellada와 갑오징어·조개 Arroz Negro가 있지만, 해산물 껍질 제거는 확인되지 않았습니다. 몬주익 성은 11–2월 10:00–18:00 안내이며, 시청 공지는 분수 정비 기간(11월 1–15일) 공연이 없다고 합니다. 이후 재개 일정은 별도 확인이 필요합니다.',
        link: '현지 요약 보기'
      }
    },
    en: {
      nav: ['Home', 'Plan', 'Places', 'Views', 'More'],
      chatChip: '🇪🇸 Barceloneta dining tips',
      chatQuery: 'Barcelona Barceloneta restaurants and today menu',
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
        kicker: 'BARCELONA · POCKET GUIDE', title: 'Barceloneta · Montjuïc · city evenings',
        intro: 'This adds nearby options without repeating the existing 7 Portes, waterfront walk or beach-rest itinerary. These are ideas, not confirmed bookings or fixed schedule items.',
        updated: 'Source check: 7 Nov 2026 · Hours, prices and operations can change; check official information before setting out.',
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
            paragraphs: ['MNAC’s rooftop viewpoint offers 360-degree views, but requires museum admission or a separate €2 ticket. Sunset or night access is not guaranteed outside the museum’s published hours; check the rooftop and exterior steps separately.', 'Montjuïc Castle’s official November–February hours are 10:00–18:00; adult admission is €12. Bus 150 from Plaça d’Espanya is listed as an access option; the cable car fare is separate from castle admission. The walk up from the funicular’s upper station is continuously uphill, with steep sections.', 'Barcelona City Council’s current notice says the Magic Fountain and fountains along Avinguda de la Reina Maria Cristina are out of operation for annual maintenance from 1–15 November, with no shows during that period. The notice does not state a year, and the page does not confirm a restart after 15 November.'],
            note: 'Do not plan a late stay around a fountain show. Recheck transport, castle entry and MNAC rooftop hours on the official pages on the day.',
            links: [
              { label: 'Transit & cable cars', action: 'transit' },
              { label: 'MNAC map', query: 'Museu Nacional d’Art de Catalunya' },
              { label: 'Montjuïc Castle map', query: 'Castell de Montjuïc Barcelona' }
            ], sources: ['mnac', 'castleVisit', 'castleAccess', 'fountain']
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
        body: 'Check today’s menu and booking status before choosing a Barceloneta restaurant. 7 Portes’ official May 2026 menu lists Paella Parellada and Arroz Negro with cuttlefish and clams; pre-peeled shellfish was not verified. The city notice says the fountains are off for maintenance 1–15 November, with no show during that period; a later restart is not confirmed there.',
        link: 'Open local guide'
      }
    },
    ja: {
      nav: ['ホーム', '日程', '場所', '夜景', 'その他'],
      chatChip: '🇪🇸 バルセロネータの食事メモ',
      chatQuery: 'バルセロネータ レストラン 当日のメニュー',
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
        kicker: 'BARCELONA · POCKET GUIDE', title: 'バルセロネータ · モンジュイック · 市内の夜',
        intro: '既存の日程にある7 Portes、港の散策、海辺の休憩は繰り返さず、周辺の選択肢を補足します。以下は候補であり、予約済み・確定済みの予定ではありません。',
        updated: '情報確認日：2026年11月7日 · 営業時間・料金・運行状況は変わるため、訪問前に公式情報をご確認ください。',
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
            paragraphs: ['MNACの屋上展望台から360度の眺望を楽しめますが、館内への入場券または別途€2のチケットが必要です。美術館の開館時間外に夕景・夜景を見られるとは限らないため、屋上と屋外階段を分けて確認してください。', 'モンジュイック城の公式案内では、11〜2月の開館時間は10:00〜18:00、一般料金は€12です。Plaça d’Espanyaから150番バスを利用でき、ケーブルカー料金は城の入場料に含まれません。フニクラの上駅から城まではずっと上り坂で、急な区間があります。', 'バルセロナ市の現在の告知では、マジカ噴水とAvinguda de la Reina Maria Cristina沿いの噴水は11月1〜15日の年次整備で停止し、その期間はショーもありません。告知には年の記載がなく、11月15日以降の再開予定もこのページでは確認できません。'],
            note: '噴水ショーを前提に夜遅くまで滞在しないでください。交通、城の入場、MNAC屋上の時間は当日に公式ページで再確認してください。',
            links: [
              { label: '交通・ケーブルカー', action: 'transit' },
              { label: 'MNAC 地図', query: 'Museu Nacional d’Art de Catalunya' },
              { label: 'モンジュイック城 地図', query: 'Castell de Montjuïc Barcelona' }
            ], sources: ['mnac', 'castleVisit', 'castleAccess', 'fountain']
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
        body: 'バルセロネータの飲食店は当日のメニューと予約状況を確認してください。7 Portesの公式2026年5月メニューにはPaella Parelladaとイカ・アサリ入りArroz Negroがありますが、貝殻を外して提供するかは確認できませんでした。市の告知では噴水は11月1〜15日の整備期間中は停止し、ショーもありません。15日以降の再開は未確認です。',
        link: '現地ガイドを開く'
      }
    },
    zh: {
      nav: ['首页', '行程', '地点', '夜景', '更多'],
      chatChip: '🇪🇸 巴塞罗内塔用餐提示',
      chatQuery: '巴塞罗内塔餐厅 当日菜单',
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
        kicker: 'BARCELONA · POCKET GUIDE', title: '巴塞罗内塔 · 蒙特惠奇 · 市区夜景',
        intro: '不重复已排入行程的7 Portes、港口散步和海边休息，只补充附近可选信息。以下均为参考，不代表已预订或确定安排。',
        updated: '资料核对：2026年11月7日 · 营业、价格和运营可能变化，出发前请查看官方信息。',
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
            paragraphs: ['MNAC屋顶观景台可360度眺望城市，但需要博物馆门票或另购€2门票。不能假设博物馆开放时间外仍可在日落或夜间进入；请分别确认屋顶和外部台阶的开放情况。', '城堡官网列出的11月至次年2月开放时间为10:00–18:00，成人门票€12。可从Plaça d’Espanya搭乘150路公交；缆车票价不含城堡门票。从缆车铁路上站步行到城堡一路上坡，部分路段较陡。', '巴塞罗那市政府当前公告称，魔幻喷泉及Reina Maria Cristina大道沿线喷泉因年度维护于11月1–15日停运，该期间没有喷泉表演。公告未写明年份，也没有确认11月15日之后的恢复安排。'],
            note: '不要把喷泉表演当作晚间行程前提。请在当天查看交通、城堡入场和MNAC屋顶开放信息。',
            links: [
              { label: '交通与缆车', action: 'transit' },
              { label: 'MNAC地图', query: 'Museu Nacional d’Art de Catalunya' },
              { label: '蒙特惠奇城堡地图', query: 'Castell de Montjuïc Barcelona' }
            ], sources: ['mnac', 'castleVisit', 'castleAccess', 'fountain']
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
        body: '选择巴塞罗内塔餐厅前，请确认当天菜单和预订情况。7 Portes官方2026年5月菜单列有Paella Parellada和墨鱼蛤蜊Arroz Negro，但没有确认海鲜会预先剥壳。市政府公告称喷泉在11月1–15日维护期间停运且无表演；15日后的恢复安排未确认。',
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
      const detailIds = { food: 'bcn-card-food', montjuic: 'bcn-card-montjuic', waterfront: 'bcn-card-waterfront', breaks: 'bcn-card-breaks' };
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
        const chip = { text: copy[language].chatChip, q: copy[language].chatQuery };
        if (!CHATBOT_I18N[language].chips.some(item => item.q === chip.q)) CHATBOT_I18N[language].chips.unshift(chip);
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
    const routeIntent = /t[-\s]?familiar|transfer|route|directions|bus|funicular|cable car|교통|환승|버스|푸니쿨라|ケーブル|乗換|公交|换乘/.test(q);
    if (routeIntent) return null;
    const foodIntent = /7 portes|can maj|la peninsular|xurreria|terraza mart|el xalet|el corte|la plaça|paella|arroz negro|tapas|tap[aá]s|restaurant|food|dining|eat|맛집|식당|빠에야|먹물|해산물|타파스|추로스|주문|메뉴|バル|レストラン|食事|パエリア|タパス|チュロス|菜单|海鲜|餐厅|吃饭|吉事果/.test(q);
    const viewIntent = /montju|mnac|magic fountain|font m[aà]gica|castle|castell|port vell|rambla de mar|w barcelona|viewpoint|sunset|night view|fountain|early morning|morning beach|야경|전망|분수|몬주익|성|항구|산책|이른 아침|展望|噴水|夜景|城|港|早朝|景色|观景|喷泉|夜景|城堡|港口|清晨/.test(q);
    const breaksIntent = /xurreria|terraza mart|el xalet|el corte|la plaça/.test(q);
    if (!foodIntent && !viewIntent) return null;
    lang = currentLocale(lang || window.currentLang || 'ko');
    const c = copy[lang];
    const topic = breaksIntent ? 'breaks' : foodIntent && !viewIntent ? 'food'
      : /montju|mnac|fountain|font m[aà]gica|magic fountain|castle|castell|분수|몬주익|噴水|城堡|蒙特惠奇|喷泉/.test(q) ? 'montjuic'
      : /port vell|rambla de mar|w barcelona|early morning|morning beach|항구|산책|이른 아침|港|港口|早朝|清晨/.test(q) ? 'waterfront' : 'breaks';
    const cardIds = { food: 'bcn-card-food', montjuic: 'bcn-card-montjuic', waterfront: 'bcn-card-waterfront', breaks: 'bcn-card-breaks' };
    const card = c.guide.cards.find(item => item.id === cardIds[topic]);
    const asksFountain = /fountain|font m[aà]gica|magic fountain|분수|噴水|喷泉/.test(q);
    const asksMorning = /early morning|morning beach|이른 아침|아침 해변|早朝|清晨/.test(q);
    const breakParagraph = /el corte|la plaça|xurreria/.test(q) ? 2 : /terraza mart/.test(q) ? 1 : /el xalet/.test(q) ? 0 : -1;
    const foodParagraph = /7 portes/.test(q) ? 0 : /can maj|la peninsular/.test(q) ? 1 : -1;
    const body = topic === 'montjuic' && asksFountain ? card.paragraphs[2]
      : topic === 'waterfront' && asksMorning ? card.paragraphs[2]
      : topic === 'breaks' && breakParagraph >= 0 ? card.paragraphs[breakParagraph]
      : topic === 'food' && foodParagraph >= 0 ? card.paragraphs[foodParagraph]
      : card ? card.paragraphs.slice(0, 2).join(' ') : c.chat.body;
    const specificSources = /7 portes/.test(q) ? ['portes', 'portesMenu']
      : /can maj/.test(q) ? ['canMajo']
      : /la peninsular/.test(q) ? ['peninsular', 'peninsularLocal']
      : /el corte|la plaça/.test(q) ? ['elCorte']
      : /xurreria/.test(q) ? ['xurreria', 'xurreriaAddress', 'churros']
      : /terraza mart/.test(q) ? ['martinez', 'martinezBooking']
      : /el xalet/.test(q) ? ['xalet', 'xaletTourism'] : null;
    const references = topic === 'montjuic' && asksFountain ? ['fountain']
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
