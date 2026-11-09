/* Source-checked Barcelona transit guide. Static guidance only; recheck live status on travel day. */
(function () {
  'use strict';

  const sourceDefs = {
    tmbTfa: { url: 'https://www.tmb.cat/en/barcelona-fares-metro-bus/t-familiar', names: { ko: 'TMB · T-familiar', en: 'TMB · T-familiar', ja: 'TMB · T-familiar', zh: 'TMB · T-familiar' } },
    tmbTerms: { url: 'https://www.tmb.cat/en/barcelona-fares-metro-bus/terms-use-tickets', names: { ko: 'TMB · 승차권 이용 약관', en: 'TMB · Ticket terms', ja: 'TMB · 乗車券の利用条件', zh: 'TMB · 车票使用条款' } },
    atm: { url: 'https://www.atm.cat/en/titols-tarifes/sistema-de-transport/funcionament-del-sistema-tarifari-integrat', names: { ko: 'ATM · 통합요금 환승 규칙', en: 'ATM · Integrated-fare transfers', ja: 'ATM · 運賃統合と乗換', zh: 'ATM · 综合票制换乘规则' } },
    funicular: { url: 'https://www.tmb.cat/en/barcelona/other-transport-tmb/montjuic-funicular', names: { ko: 'TMB · 몬주익 푸니쿨라', en: 'TMB · Montjuïc Funicular', ja: 'TMB · モンジュイック・フニクラ', zh: 'TMB · 蒙特惠奇缆车铁路' } },
    tmbHours: { url: 'https://www.tmb.cat/ca/transport-barcelona/horari-metro-bus', names: { ko: 'TMB · 공식 운행시간', en: 'TMB · Official operating hours', ja: 'TMB · 公式運行時間', zh: 'TMB · 官方运营时间' } },
    bus150: { url: 'https://www.tmb.cat/ca/barcelona/autobusos/-/lineabus/150', names: { ko: 'TMB · 150번 버스', en: 'TMB · Bus 150', ja: 'TMB · 150番バス', zh: 'TMB · 150路公交' } },
    bus150Guide: { url: 'https://gentmb.tmb.cat/seccio/actualitat/nou-bus-150-entre-placa-despanya-i-castell-montjuic', names: { ko: 'TMB · Espanya–Castell 150번 안내', en: 'TMB · 150 between Espanya and Castell', ja: 'TMB · Espanya–Castell間の150番案内', zh: 'TMB · 西班牙广场至城堡的150路说明' } },
    bus150Stop: { url: 'https://www.tmb.cat/en/barcelona/buses/-/lineabus/150/parada/344', names: { ko: 'TMB · MNAC 인근 150번 정류장', en: 'TMB · Bus 150 stop near MNAC', ja: 'TMB · MNAC近くの150番停留所', zh: 'TMB · MNAC附近的150路站点' } },
    castleAccess: { url: 'https://ajuntament.barcelona.cat/castelldemontjuic/en/visit/contact-us-getting-here', names: { ko: '바르셀로나 시청 · 몬주익성 교통 안내', en: 'Barcelona City Council · Castle access', ja: 'バルセロナ市役所 · 城へのアクセス', zh: '巴塞罗那市政府 · 城堡交通指南' } },
    tmbFares: { url: 'https://www.tmb.cat/en/barcelona-fares-metro-bus/transport-ticket-fares', names: { ko: 'TMB · 2026 교통 요금표', en: 'TMB · 2026 transit fares', ja: 'TMB · 2026年の交通運賃', zh: 'TMB · 2026年交通票价' } },
    mnacTerraces: { url: 'https://www.museunacional.cat/es/terrazas-mirador', names: { ko: 'MNAC · 테라스 전망대 운영시간', en: 'MNAC · Terrace viewpoint hours', ja: 'MNAC · テラス展望台の時間', zh: 'MNAC · 露台观景台开放时间' } },
    mnacPrices: { url: "https://www.museunacional.cat/en/opening-hours-and-prices", names: {"ko": "MNAC · 무료입장·운영시간·요금", "en": "MNAC · Free entry, hours and prices", "ja": "MNAC · 無料入場・開館時間・料金", "zh": "MNAC · 免费入场、开放时间与票价"} },
    castleVisit: { url: "https://ajuntament.barcelona.cat/castelldemontjuic/en/visit/planning-your-visit", names: {"ko": "바르셀로나 시청 · 몬주익 성 방문 안내", "en": "Barcelona City Council · Castle visitor information", "ja": "バルセロナ市役所 · モンジュイック城の案内", "zh": "巴塞罗那市政府 · 蒙特惠奇城堡参观指南"} },
    arcTriomf: { url: "https://www.barcelonaturisme.com/wv3/en/page/1211/arc-de-triomf.html", names: {"ko": "바르셀로나 공식 관광 · 개선문", "en": "Barcelona Tourism · Arc de Triomf", "ja": "バルセロナ公式観光 · 凱旋門", "zh": "巴塞罗那旅游局 · 凯旋门"} },
    ciutadella: { url: "https://www.barcelona.cat/en/what-to-do-in-bcn/parks-and-gardens/parc-de-la-ciutadella-92086011921", names: {"ko": "바르셀로나 시청 · 시우타데야 공원", "en": "Barcelona City Council · Ciutadella Park", "ja": "バルセロナ市役所 · シウタデリャ公園", "zh": "巴塞罗那市政府 · 城堡公园"} },
    palauHistory: { url: "https://www.palaumusica.cat/en/the-history-of-the-palau-de-la-musica_1671659", names: {"ko": "카탈루냐 음악당 · 건축과 외관", "en": "Palau de la Música · Architecture and façade", "ja": "カタルーニャ音楽堂 · 建築と外観", "zh": "加泰罗尼亚音乐宫 · 建筑与外观"} },
    unescoPalau: { url: "https://whc.unesco.org/en/list/804/", names: {"ko": "UNESCO · 음악당·산트파우 공동 세계유산", "en": "UNESCO · Palau and Sant Pau World Heritage listing", "ja": "UNESCO · 音楽堂・サン・パウ共同世界遺産", "zh": "UNESCO · 音乐宫与圣十字圣保罗医院联合遗产"} },
    placaFountains: { url: "https://www.barcelona.cat/infobarcelona/en/tema/urban-planning-and-infrastructures/twin-fountains-in-placa-catalunya-operational-again_1652868.html", names: {"ko": "바르셀로나 시청 · 카탈루냐 광장 분수 공지", "en": "Barcelona City Council · Plaça de Catalunya fountains", "ja": "バルセロナ市役所 · カタルーニャ広場の噴水", "zh": "巴塞罗那市政府 · 加泰罗尼亚广场喷泉"} },
    cityCondal: { url: "https://www.laflautagroup.com/", names: {"ko": "Grupo La Flauta · 식당 공식 정보", "en": "Grupo La Flauta · Restaurant information", "ja": "Grupo La Flauta · レストラン案内", "zh": "Grupo La Flauta · 餐厅信息"} },
    walkRoute: { url: "https://www.google.com/maps/dir/?api=1&origin=Arc+de+Triomf,+Barcelona&destination=Ciudad+Condal,+Rambla+de+Catalunya+18,+Barcelona&waypoints=Cascada+Monumental,+Barcelona%7CPalau+de+la+M%C3%BAsica+Catalana,+Barcelona%7CPla%C3%A7a+de+Catalunya,+Barcelona&travelmode=walking", names: {"ko": "Google 지도 · 사진 명소 경유 도보 경로", "en": "Google Maps · Walking route via photo stops", "ja": "Google Maps · 写真スポット経由の徒歩ルート", "zh": "Google 地图 · 经拍照景点的步行路线"} },
    joanMiroVisit: { url: "https://www.fmirobcn.org/en/visit-us/plan-your-visit/", names: {"ko": "Fundació Joan Miró · 방문·카페 안내", "en": "Fundació Joan Miró · Visit and café information", "ja": "Fundació Joan Miró · 来館・カフェ案内", "zh": "Fundació Joan Miró · 参观与咖啡馆信息"} },
    joanMiroCafe: { url: "https://agenda500.barcelona.cat/en/detall/restaurant-cafeteria-de-la-fundacio-joan-miro_92086000173.html", names: {"ko": "바르셀로나 시청 · 미로 재단 카페 주소", "en": "Barcelona City Council · Joan Miró café address", "ja": "バルセロナ市役所 · ミロ財団カフェ住所", "zh": "巴塞罗那市政府 · 米罗基金会咖啡馆地址"} },
    busNetwork: { url: 'https://www.tmb.cat/en/get-to-know-tmb/transport-network-improvements/new-bus-network/evolution', names: { ko: 'TMB · 버스망 개요', en: 'TMB · Bus-network overview', ja: 'TMB · バス路線網の概要', zh: 'TMB · 公交网络概览' } },
    beachNotice: { url: 'https://www.tmb.cat/en/detall-avis/-/asset_publisher/T008gFXWe2mx/', names: { ko: 'TMB · 해변 접근·교통 공지', en: 'TMB · Beach access and notices', ja: 'TMB · ビーチアクセス・運行案内', zh: 'TMB · 海滩交通与运营公告' } },
    busMap: { url: 'https://www.tmb.cat/en/barcelona-transport/metro-bus-map', names: { ko: 'TMB · 지하철·버스 지도', en: 'TMB · Metro and bus map', ja: 'TMB · 地下鉄・バス路線図', zh: 'TMB · 地铁与公交线路图' } },
    v15: { url: 'https://www.tmb.cat/en/barcelona/buses/-/lineabus/V15', names: { ko: 'TMB · V15 실시간 노선·정류장', en: 'TMB · V15 live route and stops', ja: 'TMB · V15の運行・停留所', zh: 'TMB · V15实时线路与站点' } },
    d20: { url: 'https://www.tmb.cat/en/barcelona/buses/-/lineabus/D20', names: { ko: 'TMB · D20 실시간 노선·정류장', en: 'TMB · D20 live route and stops', ja: 'TMB · D20の運行・停留所', zh: 'TMB · D20实时线路与站点' } },
    v21: { url: 'https://www.tmb.cat/en/barcelona/buses/-/lineabus/V21', names: { ko: 'TMB · V21 실시간 노선·정류장', en: 'TMB · V21 live route and stops', ja: 'TMB · V21の運行・停留所', zh: 'TMB · V21实时线路与站点' } },
    barcelonetaStation: { url: 'https://www.tmb.cat/en/barcelona/metro/-/lineametro/L4/estacion/422', names: { ko: 'TMB · Barceloneta L4 역', en: 'TMB · Barceloneta L4 station', ja: 'TMB · Barceloneta駅（L4）', zh: 'TMB · Barceloneta站（L4）' } },
    montjuicFares: { url: 'https://www.telefericdemontjuic.cat/en/teleferic-fares-and-prices', names: { ko: '운영사 · Montjuïc Cable Car 요금·구매', en: 'Operator · Montjuïc Cable Car fares and tickets', ja: '運営会社 · モンジュイック・ケーブルカー料金', zh: '运营方 · 蒙特惠奇缆车票价与购票' } },
    montjuicHours: { url: 'https://www.telefericdemontjuic.cat/en/teleferic-timetables-seasons', names: { ko: '운영사 · Montjuïc Cable Car 시간표', en: 'Operator · Montjuïc Cable Car timetable', ja: '運営会社 · モンジュイック・ケーブルカー時刻', zh: '运营方 · 蒙特惠奇缆车时刻表' } },
    montjuicRoute: { url: 'https://www.telefericdemontjuic.cat/en/cable-car-route', names: { ko: '운영사 · Montjuïc Cable Car 노선·역', en: 'Operator · Montjuïc Cable Car route and stops', ja: '運営会社 · モンジュイック・ケーブルカー路線', zh: '运营方 · 蒙特惠奇缆车线路与站点' } },
    montjuicCastle: { url: 'https://www.telefericdemontjuic.cat/en/cable-car-route/castell-stop', names: { ko: '운영사 · Castell 정류장과 성 접근', en: 'Operator · Castell stop and castle access', ja: '運営会社 · Castell駅と城へのアクセス', zh: '运营方 · Castell站与城堡入口' } },
    portFaq: { url: 'https://www.telefericodebarcelona.com/frequently-asked-questions/', names: { ko: '운영사 · Port Cable Car 자주 묻는 질문', en: 'Operator · Port Cable Car FAQ', ja: '運営会社 · ポート・ケーブルカーFAQ', zh: '运营方 · 港口缆车常见问题' } },
    portRoute: { url: 'https://www.telefericodebarcelona.com/teleferico-de-barcelona-route/', names: { ko: '운영사 · Port Cable Car 노선·역', en: 'Operator · Port Cable Car route and stations', ja: '運営会社 · ポート・ケーブルカー路線', zh: '运营方 · 港口缆车线路与站点' } },
    portFare: { url: 'https://www.telefericodebarcelona.com/schedulestelefericodel-puerto/', names: { ko: '운영사 · Port Cable Car 요금·접근', en: 'Operator · Port Cable Car fares and access', ja: '運営会社 · ポート・ケーブルカー料金・アクセス', zh: '运营方 · 港口缆车票价与交通' } },
    portTech: { url: 'https://www.telefericodebarcelona.com/history-and-technical-data/', names: { ko: '운영사 · Port Cable Car 기술자료', en: 'Operator · Port Cable Car technical data', ja: '運営会社 · ポート・ケーブルカー技術情報', zh: '运营方 · 港口缆车技术资料' } }
  };

  const routes = [
    { id: 'sagradaParallel', origin: 'Sagrada Família, Barcelona', destination: 'Paral·lel station, Barcelona' },
    { id: 'catalunyaParallel', origin: 'Plaça de Catalunya, Barcelona', destination: 'Paral·lel station, Barcelona' },
    { id: 'espanyaCastell', origin: 'Plaça d’Espanya, Barcelona', destination: 'Castell de Montjuïc, Barcelona' },
    { id: 'catalunyaBeach', origin: 'Plaça de Catalunya, Barcelona', destination: 'Platja de la Barceloneta, Barcelona' },
    { id: 'sagradaBeach', origin: 'Sagrada Família, Barcelona', destination: 'Platja de la Barceloneta, Barcelona' }
  ];

  const content = {
    ko: {
      pageTransit: '5. 바르셀로나 교통', pageActivity: '6. 활동·스파 아이디어', pageAi: '7. 실시간 AI 검색',
      kicker: '바르셀로나 · 공식 교통 안내를 바탕으로 한 보충 정보', title: '바르셀로나 대중교통, 환승과 케이블카',
      intro: '확정 일정은 그대로 두고, 교통권·몬주익 이동·바르셀로네타 해변 접근에 필요한 정보를 따로 모았습니다. 지도 링크는 선택한 날짜의 현재 경로를 여는 참고 링크이며, 도착 시간이나 최단 경로를 보장하지 않습니다.',
      statusTitle: '기존 일정과 예약은 변경하지 않습니다', status: '바르셀로나 체류 2026.11.05–11.11 및 사그라다 파밀리아 11.10 16:45 입장은 그대로 유지합니다. 기존의 13:30–16:00 바르셀로네타 그늘 휴식과 저녁 Port Olímpic 산책도 바꾸지 않습니다. 이 페이지는 보충 안내입니다.',
      dateNoteTitle: '운행시간은 출발 당일 다시 확인하세요', dateNote: '확인 기준 2026-11-08. TMB의 2026.10.26–2027.03.28 계절표에서 몬주익 푸니쿨라는 월–금 07:30–20:00, 토·일·공휴일 09:00–20:00입니다. Montjuïc Cable Car는 11–12월 매일 10:00–18:00이며 마지막 입장은 폐장 15분 전, 전체 노선 이용은 20분 전입니다. 별도 막차 시각은 게시되지 않습니다. 150번은 날짜별 TMB 시간표를 확인하고, Port Cable Car는 당일 운영사 공지를 확인하세요. 요금과 운행은 바뀔 수 있습니다.',
      fareTitle: 'T-familiar와 환승: 일행별로 검표', fare: 'T-familiar는 첫 검표일부터 연속 30일 동안 쓰는 통합 8회 다인권이며, 2026년 1존 가격은 €11.50입니다. 일반 1회권은 €2.90이지만 통합 환승권이 아니므로 지하철에서 푸니쿨라로 갈아탈 때 ‘무료 환승’이라고 단정하지 마세요. 함께 이동하는 승객 수만큼 각각 검표해야 하므로 두 분이면 2회분이 사용됩니다. 적격 통합 다회권은 1존 기준 첫 검표부터 마지막 환승 검표까지 75분 안에 최대 3회(최대 4개 교통수단) 환승할 수 있어, 조건을 만족하면 L2/L3에서 FM 푸니쿨라로 갈아타도 별도 여정이 차감되지 않습니다. 존 수에 따라 시간이 늘어나며, 같은 버스 노선 재탑승·지하철 재입장·귀환·중단 후 다시 시작은 새 여정일 수 있습니다. 버스에서는 카드를 든 사람이 마지막에 내리고 지하철에서는 일행이 함께 이동해야 합니다. T-familiar는 L9 Sud 공항 T1·T2 역에서 유효하지 않습니다.',
      montTitle: 'Paral·lel에서 푸니쿨라로 몬주익까지', mont: '사그라다 파밀리아 주변에서는 L2, Catalunya에서는 L3로 Paral·lel까지 이동한 뒤 FM 몬주익 푸니쿨라로 환승합니다. 같은 역 안의 연결이지만 L2/L3에서 FM으로 갈아타는 환승입니다. FM은 Paral·lel–Parc de Montjuïc 두 역을 잇고, 푸니쿨라 구간 자체는 TMB 안내상 약 2분입니다. 푸니쿨라는 통합요금 대상이지만 환승 혜택은 승차권 종류·존·시간 조건에 따릅니다. Parc de Montjuïc은 성 안이 아닙니다. 성으로 더 올라가려면 별도 요금의 Montjuïc Cable Car를 타거나, Plaça d’Espanya에서 150번 버스로 Castell 방향을 확인할 수 있습니다. 출발지별 가장 빠르거나 편한 방법이라고 단정하지 않습니다.',
      comboTitle: '부모님 동행용 선택 코스: 편도 케이블카와 150번', combo: '오르막 걷기를 줄이고 싶다면 Paral·lel에서 FM 푸니쿨라로 Parc de Montjuïc까지 간 뒤, 별도 유료 Montjuïc Cable Car를 편도 타고 Castell로 오르는 선택안이 있습니다(2026년 성인 €12, 케이블카 역 매표소에서만 구매). 성 주변을 본 다음 150번 버스로 Plaça d’Espanya 방향으로 내려올 수 있고, TMB 정류장 목록에는 MNAC 인근 “Piscines Picornell–Museu Nacional”이 있습니다. MNAC 테라스 공식 운영시간은 화–토 10:00–20:00, 일·공휴일 10:00–15:00으로 안내되어 일요일 노을 코스로는 맞지 않습니다. 들를 경우 방문 날짜의 전망대 개방 여부와 150번 방향·시간표를 확인하세요. T-familiar는 버스에서도 동행 인원마다 검표하며, 1존에서 첫 검표 후 75분이 지나 버스를 타면 새 여정입니다. MNAC 정류장에서 내린 뒤 같은 150번을 다시 타는 것도 별도 여정으로 계산하세요. 케이블카는 T-familiar에 포함되지 않습니다. 이 코스는 선택안이며, 걷기가 적거나 무단차라고 보장하지 않습니다. 역·성·정류장 사이 보행과 당일 운행 상황을 확인하세요.',
      freeVisitTitle: "무료입장: MNAC와 몬주익 성은 요일이 다릅니다",
      freeVisit: "MNAC(카탈루냐 미술관)는 매주 토요일 15:00부터 무료이며, 매월 첫째 일요일은 10:00–15:00 무료로 안내합니다. 무료 시간대도 온라인 사전 입장권 예약을 권장합니다. 겨울철(10–4월) 화–토 10:00–18:00, 일요일·공휴일 10:00–15:00이며 월요일은 휴관(공휴일 제외)입니다. 무료 시간의 임시전시·테라스 포함 범위는 안내에서 명확히 구분하지 않으니 예매 화면에서 확인하세요. 2026년 11월 8일은 둘째 일요일이므로 MNAC의 ‘첫째 일요일 무료’에 해당하지 않습니다.\n\n몬주익 성(Castell de Montjuïc)은 매주 일요일 15:00 이후 무료이고, 매월 첫째 일요일은 하루 종일 무료입니다. 일반 성인 입장료는 €12이므로 유료일에 성인 3명이 모두 일반요금 대상이면 €36입니다. 11–2월은 10:00–18:00 개방, 매표소는 17:30에 닫지만 이 시각을 무료입장 최종 시각이라고 단정할 근거는 없습니다. 2026년 11월 8일(일)은 성 무료입장 시간에 해당합니다. 방문 당일 공지와 입장 안내를 확인하세요.",
      walkTitle: "사진 산책: 개선문에서 Ciutat Comtal까지",
      walk: "경로 예시: Arc de Triomf → Passeig de Lluís Companys → Parc de la Ciutadella의 Cascada Monumental → Palau de la Música Catalana 외관 → Plaça de Catalunya → Rambla de Catalunya 18의 Ciutat Comtal(통칭 Ciudad Condal). 지도상 약 3.1km·도보 44분이며, 사진 정차를 더하면 대략 60–85분을 잡으세요. 지도와 보행 속도에 따른 추정치이지 보장 시간은 아닙니다.\n\n개선문은 붉은 벽돌의 네오무데하르 양식입니다. Cascada Monumental은 Josep Fontserè가 설계했고 젊은 Antoni Gaudí가 보조자로 참여했습니다. ‘황금 분수대’나 트레비 분수와의 우열 비교는 확인된 사실이 아니므로 ‘기념비적 폭포 분수’로 표현하세요. Palau 외관의 붉은 벽돌·세라믹 기둥과 모자이크를 볼 수 있으며, 이 건물은 Hospital de Sant Pau와 함께 등재된 UNESCO 공동 세계유산입니다. Plaça de Catalunya의 분수는 계절 운영 공지가 있었으므로 11월에도 물이 나온다고 단정하지 마세요. 공원은 매일 07:00부터 해질 때까지 열지만 공사에 따른 우회·구역 제한 가능성이 있습니다.\n\nCiutat Comtal은 Rambla de Catalunya 18, Plaça de Catalunya에서 지도상 약 300m·도보 4분입니다(‘광장 길 건너편’보다는 ‘광장 가까이’). 식당 그룹은 크리스마스를 제외하고 매일 영업한다고 안내하지만 세부 영업시간은 공식 자료에서 확인되지 않았습니다. 꿀대구·감바스·끌라라의 현행 메뉴 판매와 ‘13:30 이후 대기가 매우 길다’는 주장도 공식 확인이 안 되므로, 메뉴·영업시간은 당일 확인하고 대기 시간을 보장하지 않는다고 안내하세요.",
      cafePlanTitle: "푸니쿨라 상부역 근처 카페와 15시 입장 일정",
      cafePlan: "특정 카페를 앞서 말씀하셨는지는 확인되지 않았습니다. 확인 가능한 후보는 Fundació Joan Miró의 바-레스토랑 카페(Avinguda de Miramar 1)입니다. 재단 안내상 화–일 10:00–19:00이고 카페 이용은 박물관 유료 입장 없이 가능합니다. 푸니쿨라 Parc de Montjuïc 상부역과 가까우며 도보 약 5–8분은 위치 기반 추정입니다. 상부역에서 몬주익 성까지는 오르막 도보 20–25분(카페와 역 사이 이동은 별도)이라고 시청이 안내합니다.\n\n14:15에 점심을 마치고 나서 15시 무료입장까지 카페를 들르는 건 환승·대기·오르막 때문에 빠듯합니다. 여유를 둔 예시(운행·대기시간은 보장되지 않음): 10:30–11:55 사진 산책, 12:00–13:00 점심, 13:00–13:45 L3·푸니쿨라로 상부역 이동, 13:45–14:00 카페 짧게, 14:00–14:35 성까지 오르막 이동 후 15시 무료입장 시작까지 대기. 지도 경로와 당일 운행을 확인하고, 지연되면 카페를 생략하거나 더 일찍 출발하세요. 성까지는 별도 요금의 Montjuïc Cable Car를 탈 수도 있습니다. 150번 버스는 Plaça d’Espanya–성 노선이므로 정류장·방향과 당일 운행을 확인하세요.",
      chatChipFree: "무료입장·카페 정보",
      chatQueryFree: "MNAC와 몬주익 성 무료입장 시간, 푸니쿨라 근처 카페",
      chatChipWalk: "사진 산책 코스",
      chatQueryWalk: "개선문에서 Ciutat Comtal까지 사진 산책 거리와 명소",
      beachTitle: '바르셀로네타 해변: 구간에 맞춰 접근', beach: 'TMB는 Platja de la Barceloneta의 가까운 지하철역으로 Barceloneta(L4)를 안내합니다. 해변이 길어 실제로 갈 모래사장 입구에 따라 도보 동선은 달라집니다. TMB 자료에서 V15와 D20은 바르셀로네타 해변 쪽 노선으로 안내됩니다. TMB 버스망 개요는 V15를 Barceloneta–Vall d’Hebron 구간으로 적지만, 최신 방향·정류장은 라이브 노선 페이지에서 다시 확인하세요. D20의 종점은 Passeig Marítim–Ernest Lluch이며 Plaça Catalunya에서 출발하는 직행으로 보지 마세요. TMB 버스망 개요에는 V21이 Passeig Marítim–Montbau로 적혀 있지만, 이 자료만으로 사그라다 파밀리아에서 탈 정확한 정류장은 확정할 수 없습니다. 계단 없음이나 특정 도보시간은 보장하지 않습니다.',
      cablesTitle: '서로 다른 두 케이블카 서비스', montCableTitle: 'Montjuïc Cable Car · 산 위', montCable: '푸니쿨라와 별도인 유료 관광 케이블카입니다. Parc de Montjuïc–Mirador–Castell 역을 잇고, Castell 역은 성 근처이지 성 내부 입구가 아닙니다. 운영사 2026 요금표의 성인 편도는 €12(역 매표소에서만 구매), 왕복은 정가 €19 또는 Hola Barcelona 온라인 10% 할인 적용 시 €17.10입니다. 왕복권은 같은 날 사용해야 하며, 온라인 구매 바우처는 매표소에서 제시해야 합니다. 11–12월 운영시간은 매일 10:00–18:00이며, 운영사가 정한 마지막 입장 기준은 폐장 15분 전, 전체 노선 이용은 20분 전입니다. 별도 ‘막차 출발 시각’은 게시하지 않습니다.',
      portCableTitle: 'Port Cable Car · 항구 횡단', portCable: 'Montjuïc Cable Car와 다른 노선·요금의 서비스입니다. Barceloneta의 Torre de San Sebastián에서 Montjuïc의 Miramar까지 운행하며, Torre Jaime I는 폐쇄되어 정차하지 않습니다. 공식 요금은 편도 €12.50·왕복 €20.00, 표는 매표소 또는 온라인에서 살 수 있습니다. 운영사는 12월 25일을 제외한 연중 운행이라고 안내하지만 11월 상세 시간표와 막차 시각은 찾지 못했습니다. 편도 소요시간도 공식 자료끼리 달라 숫자를 확정하지 않습니다. 운영사 FAQ는 San Sebastián 타워의 엘리베이터·경사로와 Miramar 승강장의 계단을 설명합니다. 접근성이 중요하면 왕복·도착 측 동선을 운영사에 미리 확인하세요.',
      careTitle: '부모님과 이동할 때 확인할 점', care: '역 출구, 리프트 운행 여부, 노면과 경사, 횡단보도 대기, 케이블카 정류장까지의 보행은 경로·당일 상태에 따라 달라집니다. 특정 경로가 계단 없이 이어지거나 모든 분에게 편하다고 보장하지 않습니다. 여유 시간을 두고 정류장·출구별 경로를 확인하며, 이동 부담이 크면 일정 사이 휴식을 유지하세요.',
      routesTitle: '현재 경로 열기', routesNote: 'Google Maps에서 대중교통 경로를 확인합니다. 실시간 운행·공사·대기 상황은 링크를 연 날에 다시 확인하세요.',
      sourcesTitle: '공식 출처', openRoute: '대중교통 경로 보기', openTmb: 'TMB 노선 확인', guideButton: '교통 페이지 열기', chatChip: '몬주익 부모님 동행 이동안', chatQuery: '몬주익 부모님 동행 이동안: 푸니쿨라, 케이블카 편도, 150번 버스', chatTitle: '바르셀로나 교통 안내', chatLink: '교통 가이드 열기',
      routeLabels: { sagradaParallel: '사그라다 파밀리아 → Paral·lel', catalunyaParallel: '카탈루냐 광장 → Paral·lel', espanyaCastell: 'Espanya 광장 → Montjuïc 성', catalunyaBeach: '카탈루냐 광장 → 바르셀로네타 해변', sagradaBeach: '사그라다 파밀리아 주변 → 바르셀로네타 해변' }
    },
    en: {
      pageTransit: '5. Barcelona transit', pageActivity: '6. Activity & spa ideas', pageAi: '7. Live AI search',
      kicker: 'BARCELONA · SUPPLEMENTAL GUIDE BASED ON OFFICIAL TRANSIT SOURCES', title: 'Barcelona transit: transfers and cable cars',
      intro: 'This adds practical transit context without changing the confirmed itinerary. The map links open a route for the selected day; they do not promise an arrival time or the fastest route.',
      statusTitle: 'Confirmed plans and bookings stay unchanged', status: 'Barcelona stay 5–11 Nov 2026 and Sagrada Família entry on 10 Nov at 16:45 remain as they are. The existing 13:30–16:00 shaded Barceloneta rest and evening Port Olímpic walk also stay unchanged. This page is supplemental guidance.',
      dateNoteTitle: 'Recheck service on the day of travel', dateNote: 'Checked 8 Nov 2026. TMB’s seasonal timetable for 26 Oct 2026–28 Mar 2027 lists the Montjuïc Funicular Mon–Fri 07:30–20:00 and Saturdays, Sundays and public holidays 09:00–20:00. The Montjuïc Cable Car runs daily 10:00–18:00 in Nov–Dec; last access is 15 minutes before closing, or 20 minutes before to complete the full route. No separate last departure is published. Check the TMB day-specific timetable for bus 150 and operator notices for Port Cable Car details. Fares and service can change.',
      fareTitle: 'T-familiar and transfers: validate for each rider', fare: 'T-familiar is an integrated, shareable 8-journey ticket, valid for 30 consecutive days from first validation; its 2026 one-zone price is €11.50. A standard single ticket costs €2.90 but does not include integrated transfers, so do not assume a “free” change from the metro to the funicular on one single ticket. Each rider must validate, so two people use two journeys. Eligible integrated multi-journey tickets allow up to 3 transfers (up to 4 modes) within 75 minutes from first to last validation in 1 zone; the time increases with zones and the ticket must cover them. When conditions are met, changing from L2/L3 to FM does not use an extra journey. Reboarding the same bus line, re-entering the metro, returning or resuming an interrupted journey can count as a new journey. On a bus the cardholder must get off last; in the metro the group travels together. T-familiar is not valid at Aeroport T1/T2 on L9 Sud.',
      montTitle: 'Via Paral·lel and the funicular to Montjuïc', mont: 'From the Sagrada Família area, take L2; from Plaça de Catalunya, take L3 to Paral·lel, then change to the FM Montjuïc Funicular. The lines connect within the station, but changing from L2/L3 to FM is still a transfer. FM links Paral·lel and Parc de Montjuïc; TMB gives about 2 minutes for the funicular segment itself. The funicular is integrated into the fare system, but transfer treatment depends on ticket type, zones and time. Parc de Montjuïc is not the castle. To continue uphill, use the separately ticketed Montjuïc Cable Car, or check bus 150 from Plaça d’Espanya toward Castell. No route is labelled fastest or most comfortable for every origin.',
      comboTitle: 'Optional route with parents: one-way cable car + bus 150', combo: 'If you want to reduce uphill walking, one option is the FM Funicular from Paral·lel to Parc de Montjuïc, then the separately ticketed Montjuïc Cable Car one way to Castell (2026 adult fare €12; sold only at cable-car station ticket offices). After the castle area, bus 150 can take you down toward Plaça d’Espanya; TMB lists “Piscines Picornell – Museu Nacional” near MNAC. The museum’s official terrace page lists Tue–Sat 10:00–20:00 and Sundays/public holidays 10:00–15:00, so it is not a Sunday sunset stop. Check terrace access, bus direction and the day-specific timetable before getting off there. T-familiar requires a validation for each rider on the bus; if you board more than 75 minutes after the first validation in zone 1, it is a new journey. Leaving at the MNAC-area stop and reboarding the same 150 line later is also a new journey. The cable car is not included in T-familiar. This is an optional idea, not a fixed schedule or a guarantee of little walking or step-free access; walking between stations, the castle and stops remains, so check conditions on the day.',
      freeVisitTitle: "Free entry: MNAC and Montjuïc Castle have different days",
      freeVisit: "MNAC (National Art Museum of Catalonia) lists free entry every Saturday from 15:00 and on the first Sunday of each month from 10:00 to 15:00. Its free-entry notice also recommends booking an admission ticket online in advance. In winter (Oct–Apr), hours are Tue–Sat 10:00–18:00 and Sundays/public holidays 10:00–15:00; closed Mondays except public holidays. The notice does not clearly say whether temporary exhibitions and the terrace are included in free entry, so check the booking page. 8 Nov 2026 is the second Sunday, not MNAC’s first-Sunday free day.\n\nCastell de Montjuïc is free every Sunday after 15:00; the first Sunday of each month is free all day. Standard adult admission is €12, so €36 for three adults applies only when all pay the standard rate on a paid visit. From November to February the castle is open 10:00–18:00 and the ticket office closes at 17:30; the official information does not identify that as the last admission time for free visitors. Sunday 8 Nov 2026 qualifies for the after-15:00 free period. Check notices and admission information on the day.",
      walkTitle: "Photo walk: Arc de Triomf to Ciutat Comtal",
      walk: "Example route: Arc de Triomf → Passeig de Lluís Companys → Cascada Monumental in Parc de la Ciutadella → exterior of Palau de la Música Catalana → Plaça de Catalunya → Ciutat Comtal (also known as Ciudad Condal), Rambla de Catalunya 18. The mapped route is about 3.1 km/44 minutes on foot; allow roughly 60–85 minutes with photo stops. These are map and walking-pace estimates, not guaranteed times.\n\nThe arch is red-brick Neo-Mudéjar. Josep Fontserè designed Cascada Monumental, with the young Antoni Gaudí assisting; “golden waterfall” and comparisons claiming it rivals Rome’s Trevi Fountain are not verified facts, so describe it as a monumental cascade/fountain. The Palau façade features brick, ceramic columns and mosaics; it is one component of the UNESCO World Heritage listing shared with Hospital de Sant Pau. Plaça de Catalunya’s fountains have seasonal operating notices, so do not promise they will be running in November. Ciutadella Park is listed as open daily from 07:00 until sunset, though works may reroute visitors or restrict areas.\n\nCiutat Comtal is at Rambla de Catalunya 18, about 300 m/4 minutes on foot from Plaça de Catalunya according to the map—not directly across the street. The restaurant group says it opens daily except Christmas but does not publish detailed hours in the checked official information. Current availability of honey cod, prawns and clara, and the claim of very long waits after 13:30, were not verified officially. Check the day’s menu and hours; do not promise a specific queue or arrival time.",
      cafePlanTitle: "Café near the funicular and the 15:00 entry plan",
      cafePlan: "The conversation does not establish which café you may have meant. A verified candidate is the bar-restaurant café at Fundació Joan Miró, Avinguda de Miramar 1. The foundation lists it as open Tue–Sun 10:00–19:00, and café access does not require a paid museum ticket. It is near the Parc de Montjuïc funicular station; a 5–8 minute walk is a location-based estimate. The City Council says it is a 20–25 minute uphill walk from the upper funicular station to the castle, not including the café-to-station walk.\n\nLeaving lunch at 14:15 and adding transfers, waiting, a café stop and the uphill walk before 15:00 leaves too little slack. A more buffered example (transit and waits are not guaranteed): 10:30–11:55 photo walk, 12:00–13:00 lunch, 13:00–13:45 L3 and funicular to the upper station, 13:45–14:00 quick café stop, 14:00–14:35 uphill toward the castle, then wait for free entry at 15:00. Check the live route and service; if delayed, skip the café or leave earlier. The separately ticketed Montjuïc Cable Car is another option. Bus 150 runs between Plaça d’Espanya and the castle; check the stop, direction and live service.",
      chatChipFree: "Free entry and café",
      chatQueryFree: "MNAC and Montjuïc Castle free-entry times and café near the funicular",
      chatChipWalk: "Photo walk",
      chatQueryWalk: "Photo walk from Arc de Triomf to Ciutat Comtal: route and sights",
      beachTitle: 'Barceloneta Beach: choose for the beach section', beach: 'TMB lists Barceloneta (L4) as the nearby metro station for Platja de la Barceloneta. The actual walk depends on which beach entrance you want. TMB beach information lists V15 and D20 among routes for the Barceloneta beach area. TMB’s network overview describes V15 between Barceloneta and Vall d’Hebron; recheck today’s direction and stops on its live route page. D20 runs between Passeig Marítim and Ernest Lluch; do not treat it as a direct bus from Plaça de Catalunya. TMB’s network overview lists V21 between Passeig Marítim and Montbau, but the exact Sagrada Família boarding stop is not established by that static source. No stair-free path or precise walking time is guaranteed.',
      cablesTitle: 'Two different cable-car services', montCableTitle: 'Montjuïc Cable Car · up the hill', montCable: 'This is a separately ticketed tourist cable car, not the funicular. It links Parc de Montjuïc–Mirador–Castell; the Castell station is near the castle, not the castle entrance itself. The operator’s 2026 adult fare is €12 one-way (sold only at cable-car station ticket offices) or €19 standard return / €17.10 with the 10% Hola Barcelona online discount. Return tickets must be used the same day; show an online voucher at the ticket office. November–December hours are daily 10:00–18:00. The operator says last access is 15 minutes before closing, or 20 minutes before if completing the full route; it does not publish a separate last-departure time.',
      portCableTitle: 'Port Cable Car · across the harbour', portCable: 'This is a different route and fare from the Montjuïc Cable Car. It runs from Torre de San Sebastián in Barceloneta to Miramar on Montjuïc; Torre Jaime I is closed and is not a stop. The operator lists €12.50 one-way / €20 return, with tickets at the ticket office or online. It says the service runs year-round except 25 December, but I could not verify detailed November hours or a last departure. Official trip-duration figures differ, so no single duration is stated. The FAQ describes a lift and ramp at San Sebastián Tower and stairs at the Miramar platform. If access matters, confirm the full outbound and return path with the operator.',
      careTitle: 'A note for travelling with parents', care: 'Exits, lift status, pavement and slope, crossing waits, and the walk to each cable-car station vary by route and day. No route is guaranteed to be step-free or comfortable for everyone. Leave slack between stops, check the route for the exact entrance, and keep rest time if walking is tiring.',
      routesTitle: 'Open a current route', routesNote: 'Check a public-transport route in Google Maps. Recheck live service, works and waiting conditions when you open it.',
      sourcesTitle: 'Official sources', openRoute: 'Open transit route', openTmb: 'Check TMB route', guideButton: 'Open transit guide', chatChip: 'Montjuïc route idea for parents', chatQuery: 'Montjuïc route idea for parents: funicular, one-way cable car and bus 150', chatTitle: 'Barcelona transit guide', chatLink: 'Open the transit guide',
      routeLabels: { sagradaParallel: 'Sagrada Família → Paral·lel', catalunyaParallel: 'Plaça de Catalunya → Paral·lel', espanyaCastell: 'Plaça d’Espanya → Montjuïc Castle', catalunyaBeach: 'Plaça de Catalunya → Barceloneta Beach', sagradaBeach: 'Sagrada Família area → Barceloneta Beach' }
    },
    ja: {
      pageTransit: '5. バルセロナの交通', pageActivity: '6. 体験・スパの候補', pageAi: '7. リアルタイムAI検索',
      kicker: 'バルセロナ · 公式交通情報に基づく補足ガイド', title: 'バルセロナ交通：乗換とケーブルカー',
      intro: '確定済みの日程は変更せず、交通券・モンジュイック・バルセロネータ海岸への移動情報をまとめました。地図リンクは指定日に経路を調べるためのもので、所要時間や最短ルートを保証するものではありません。',
      statusTitle: '確定した予定・予約はそのまま', status: 'バルセロナ滞在 2026年11月5～11日、サグラダ・ファミリア入場 11月10日16:45は変更しません。既存の13:30～16:00のバルセロネータ日陰休憩と夜のPort Olímpic散歩もそのままです。このページは補足情報です。',
      dateNoteTitle: '利用当日に運行状況を再確認', dateNote: '確認日：2026年11月8日。TMBの2026年10月26日～2027年3月28日の季節時刻表では、モンジュイック・フニクラは月～金7:30～20:00、土・日・祝日9:00～20:00です。Montjuïc Cable Carは11～12月毎日10:00～18:00。最終入場は閉館15分前、全区間を利用する場合は20分前で、別途の最終出発時刻は公表されていません。150番バスは利用日ごとのTMB時刻表を確認し、Port Cable Carの詳細は当日の運営会社案内をご確認ください。運賃・運行は変更される場合があります。',
      fareTitle: 'T-familiarと乗換：人数分の検札が必要', fare: 'T-familiarは初回検札から連続30日有効の統合8回・複数人用チケットで、2026年の1ゾーン料金は€11.50です。通常の1回券は€2.90ですが、統合乗換の対象ではないため、地下鉄からフニクラへの乗換が「無料」とは限りません。一緒に移動する人数分の検札が必要なので、2人なら2回分を使います。対象となる統合回数券では、1ゾーンの乗換時間は最初から最後の乗換検札まで最大75分、乗換は最大3回（最大4つの交通機関）です。条件を満たせばL2/L3からFMフニクラへの乗換で別の乗車回数は消費しません。ゾーン数により時間は延び、同じバス路線への再乗車、地下鉄への再入場、折返しや中断後の再開は新たな旅程として扱われる場合があります。バスではカード保持者が最後に降り、地下鉄ではグループで一緒に移動します。T-familiarはL9 Sudの空港T1・T2駅では使えません。',
      montTitle: 'Paral·lelでフニクラに乗換えてモンジュイックへ', mont: 'サグラダ・ファミリア周辺からはL2、Plaça de CatalunyaからはL3でParal·lelへ行き、FMモンジュイック・フニクラに乗換えます。駅構内で接続しますが、L2/L3からFMへの乗換です。FMはParal·lelとParc de Montjuïcを結び、フニクラ区間自体はTMB案内で約2分です。フニクラは統合運賃の対象ですが、乗換扱いは券種・ゾーン・時間条件によります。Parc de Montjuïcは城の中ではありません。さらに上る場合は別料金のMontjuïc Cable Car、またはPlaça d’EspanyaからCastell方面の150番バスを確認してください。すべての出発地で最速・最も楽とは断定しません。',
      comboTitle: 'ご両親との移動案：片道ケーブルカー＋150番バス', combo: '上り坂を歩く距離を減らしたい場合の選択肢として、Paral·lelからFMフニクラでParc de Montjuïcへ行き、別料金のMontjuïc Cable Carに片道乗車してCastellへ向かえます（2026年の大人片道€12、ケーブルカー各駅の窓口のみで販売）。城の周辺を見た後は150番バスでPlaça d’Espanya方面へ下れます。TMBの停留所一覧にはMNAC近くの「Piscines Picornell – Museu Nacional」があります。MNAC公式のテラス案内は火～土10:00～20:00、日曜・祝日10:00～15:00のため、日曜の夕景スポットとしては利用できません。利用日はテラスの開放状況、バスの方向と時刻表を確認してください。T-familiarはバスでも乗車人数分の検札が必要です。1ゾーンで最初の検札から75分を超えて乗る場合は新しい旅程になり、MNAC付近で降りた後に同じ150番へ再乗車する場合も別の旅程です。ケーブルカーはT-familiarに含まれません。これは任意の案で、徒歩が少ない、または段差がないことを保証するものではありません。駅・城・停留所間の歩行と当日の運行状況をご確認ください。',
      freeVisitTitle: "無料入場：MNACとモンジュイック城は曜日が異なります",
      freeVisit: "MNAC（カタルーニャ美術館）は毎週土曜15:00以降、毎月第1日曜10:00～15:00を無料入場と案内しています。無料時間帯もオンラインで事前入場券を予約するよう案内されています。冬季（10～4月）は火～土10:00～18:00、日曜・祝日10:00～15:00、月曜休館（祝日を除く）です。無料時間に企画展やテラスが含まれるかは案内で明確に区別されていないため、予約画面で確認してください。2026年11月8日は第2日曜なので、MNACの第1日曜無料には該当しません。\n\nモンジュイック城は毎週日曜15:00以降無料で、毎月第1日曜は終日無料です。通常の大人料金は€12のため、大人3人€36は全員が通常料金を払う有料日の場合のみです。11～2月の開館は10:00～18:00、窓口は17:30終了ですが、これを無料入場者の最終入場時刻とする公式案内は確認できません。2026年11月8日（日）は15時以降の無料対象です。当日の告知と入場案内を確認してください。",
      walkTitle: "写真散歩：凱旋門からCiutat Comtalまで",
      walk: "ルート例：Arc de Triomf → Passeig de Lluís Companys → Parc de la CiutadellaのCascada Monumental → Palau de la Música Catalana外観 → Plaça de Catalunya → Rambla de Catalunya 18のCiutat Comtal（Ciudad Condalとも呼ばれます）。地図上は約3.1km・徒歩44分。撮影時間を加えて約60～85分を見込みます。地図と歩く速さによる目安で、所要時間を保証するものではありません。\n\n凱旋門は赤レンガのネオ・ムデハル様式です。Cascada MonumentalはJosep Fontserè設計で、若きAntoni Gaudíが補助者として参加しました。「黄金の滝」やローマのトレビの泉に匹敵するという比較は確認された事実ではないため、「記念碑的な滝状噴水」と表現してください。Palauの外観にはレンガ、セラミック柱、モザイクがあり、サン・パウ病院とともに登録されたUNESCO世界遺産の構成要素です。Plaça de Catalunyaの噴水は季節運転の案内があるため、11月も稼働すると断定しないでください。シウタデリャ公園は毎日7:00から日没まで開園と案内されていますが、工事により迂回・区域制限があり得ます。\n\nCiutat ComtalはRambla de Catalunya 18、Plaça de Catalunyaから地図上約300m・徒歩4分で、「広場の真向かい」ではありません。運営グループはクリスマスを除き毎日営業と案内しますが、確認できた公式情報に詳細な営業時間はありません。蜂蜜入り鱈、エビ、claraの現行提供や「13:30以降は非常に長い行列」という主張も公式確認できていません。当日の営業時間・メニューを確認し、待ち時間は保証しないでください。",
      cafePlanTitle: "フニクラ上部駅近くのカフェと15時入場案",
      cafePlan: "会話から、以前話題にした特定のカフェは確認できません。確認できた候補はFundació Joan Miróのバー・レストランカフェ（Avinguda de Miramar 1）です。公式案内では火～日10:00～19:00、カフェ利用に有料の美術館入場券は不要です。Parc de Montjuïcフニクラ駅近くで、徒歩5～8分は場所からの推定です。市の案内では上部駅から城まで上り坂を徒歩20～25分（カフェと駅の間は別）です。\n\n14:15に昼食を終えてから乗換・待ち時間・カフェ・上り坂を経て15時の無料入場に間に合わせるのは余裕がありません。余裕を見込んだ例（運行・待ち時間は保証されません）：10:30～11:55写真散歩、12:00～13:00昼食、13:00～13:45にL3とフニクラで上部駅へ、13:45～14:00に短時間カフェ、14:00～14:35に城へ上り、15:00の無料入場まで待つ計画です。当日の経路・運行を確認し、遅れたらカフェを省くか、さらに早く出発してください。別料金のMontjuïc Cable Carも選択肢です。150番バスはPlaça d’Espanyaと城を結ぶため、停留所・方向・当日の運行をご確認ください。",
      chatChipFree: "無料入場とカフェ",
      chatQueryFree: "MNACとモンジュイック城の無料時間、フニクラ近くのカフェ",
      chatChipWalk: "写真散歩",
      chatQueryWalk: "凱旋門からCiutat Comtalまでの写真散歩ルートと見どころ",
      beachTitle: 'バルセロネータ海岸：海岸区間に合わせて選ぶ', beach: 'TMBはPlatja de la Barcelonetaに近い地下鉄駅としてBarceloneta（L4）を案内しています。実際の徒歩経路は利用する海岸入口によって変わります。TMBの海岸案内にはV15とD20もバルセロネータ付近の路線として掲載されています。TMBの路線網概要ではV15をBarceloneta–Vall d’Hebronとしていますが、当日の方向・停留所は最新の路線ページで再確認してください。D20の区間はPasseig Marítim–Ernest Lluchで、Plaça de Catalunyaからの直通バスではありません。TMBの路線網概要はV21をPasseig Marítim–Montbauとしていますが、静的資料だけではサグラダ・ファミリアの正確な乗車停留所を確認できません。階段のない経路や正確な徒歩時間は保証しません。',
      cablesTitle: '別々の2つのケーブルカー', montCableTitle: 'Montjuïc Cable Car · 山の上へ', montCable: 'フニクラとは別料金の観光ケーブルカーです。Parc de Montjuïc–Mirador–Castellを結び、Castell駅は城の近くですが城の入口そのものではありません。運営会社の2026年大人料金は片道€12（駅窓口のみ）、往復は通常€19／Hola Barcelonaのオンライン10%割引で€17.10です。往復券は同日利用です。オンライン購入の場合は、窓口でバウチャーを提示します。11～12月は毎日10:00～18:00。閉館15分前までに最終入場、全区間利用は20分前までの入場と案内されています。別途の最終出発時刻は公表されていません。',
      portCableTitle: 'Port Cable Car · 港を横断', portCable: 'こちらはMontjuïc Cable Carとは別の路線・料金です。バルセロネータのTorre de San SebastiánからモンジュイックのMiramarまで運行し、Torre Jaime Iは閉鎖中で停車しません。公式料金は片道€12.50・往復€20.00、窓口またはオンラインで購入できます。運営会社は12月25日を除き通年運行としていますが、11月の詳細時間・最終便は確認できません。公式資料の所要時間が一致しないため、単一の時間は記載しません。FAQではSan Sebastián塔にエレベーターとスロープ、Miramar乗り場に階段があると説明しています。アクセスが重要な場合、往復全体の動線を事前に確認してください。',
      careTitle: 'ご両親と移動するときの確認点', care: '駅出口、エレベーターの運転、歩道・坂、横断歩道の待ち時間、ケーブルカー駅までの徒歩は経路や当日の状況によって異なります。階段なし、誰にとっても楽、とは保証できません。停留所・入口ごとの経路を確認し、移動に余裕を持たせてください。',
      routesTitle: '現在の経路を開く', routesNote: 'Google Mapsで公共交通の経路を確認できます。運行・工事・待ち時間は開いた日に再確認してください。',
      sourcesTitle: '公式情報', openRoute: '公共交通の経路', openTmb: 'TMB路線を確認', guideButton: '交通ガイドを開く', chatChip: '両親と行くモンジュイックの移動案', chatQuery: '両親向けのモンジュイック移動案：フニクラ、片道ケーブルカー、150番バス', chatTitle: 'バルセロナ交通案内', chatLink: '交通ガイドを開く',
      routeLabels: { sagradaParallel: 'サグラダ・ファミリア → Paral·lel', catalunyaParallel: 'Plaça de Catalunya → Paral·lel', espanyaCastell: 'Plaça d’Espanya → モンジュイック城', catalunyaBeach: 'Plaça de Catalunya → バルセロネータ海岸', sagradaBeach: 'サグラダ・ファミリア周辺 → バルセロネータ海岸' }
    },
    zh: {
      pageTransit: '5. 巴塞罗那交通', pageActivity: '6. 活动与水疗备选', pageAi: '7. 实时AI搜索',
      kicker: '巴塞罗那 · 基于官方交通资料的补充指南', title: '巴塞罗那交通：换乘与缆车',
      intro: '在不改变已确认行程的前提下，补充交通票、蒙特惠奇和巴塞罗内塔海滩出行信息。地图链接用于查看所选日期的路线，不保证到达时间或最快路线。',
      statusTitle: '已确认的行程和预订保持不变', status: '巴塞罗那停留 2026年11月5日至11日，以及圣家堂11月10日16:45入场均保持不变。原有13:30–16:00巴塞罗内塔海滩树荫休息和晚间Port Olímpic散步也不变。本页仅为补充指南。',
      dateNoteTitle: '出发当天再次核对运营信息', dateNote: '核对日期：2026年11月8日。TMB的2026年10月26日至2027年3月28日季节时刻表列出蒙特惠奇缆车铁路：周一至周五7:30–20:00，周六、周日和节假日9:00–20:00。Montjuïc Cable Car在11–12月每日10:00–18:00；停止入场时间为闭馆前15分钟，如需完成全线则为提前20分钟，未另行公布末班发车时刻。150路公交请按出行日期查看TMB时刻表；Port Cable Car详细运营信息请查看当天运营方公告。票价与运营可能变化。',
      fareTitle: 'T-familiar与换乘：每位乘客都要验证', fare: 'T-familiar是首次验证起连续30天有效的综合8次多人票，2026年1区价格为€11.50。普通单程票为€2.90，但不包含综合换乘优惠，因此不要假设凭一张单程票从地铁换乘缆车铁路就是“免费换乘”。同行人数需要分别验证，两人同行会使用2次。符合条件的综合多次票在1区内从首次到最后一次换乘验证最多75分钟，最多换乘3次（最多乘坐4种交通工具）；跨区时限会延长，车票区数必须覆盖行程。满足条件时，从L2/L3换乘FM缆车铁路不会额外扣一次行程。同一公交线路再次上车、重新进地铁、往返或中断后继续都可能算新行程。公交上持卡人需最后下车；乘地铁时同行者需一起行动。T-familiar不适用于L9 Sud机场T1/T2站。',
      montTitle: '在Paral·lel换乘缆车铁路前往蒙特惠奇', mont: '从圣家堂附近乘L2，从Plaça de Catalunya乘L3到Paral·lel，再换乘FM蒙特惠奇缆车铁路。线路在站内连接，但从L2/L3换到FM仍属于换乘。FM连接Paral·lel与Parc de Montjuïc，TMB给出的缆车铁路区间本身约2分钟。缆车铁路属于综合票制，但换乘优惠取决于票种、区数与时限。Parc de Montjuïc并不是城堡内部。继续上山可另购Montjuïc Cable Car车票，也可查看从Plaça d’Espanya开往Castell的150路公交。不要对所有起点都称为最快或最舒适路线。',
      comboTitle: '陪父母游蒙特惠奇：单程缆车＋150路公交方案', combo: '如果想减少上坡步行，可以考虑从Paral·lel乘FM缆车铁路到Parc de Montjuïc，再另购Montjuïc Cable Car单程票前往Castell（2026年成人€12，仅在缆车站售票处购买）。参观城堡周边后，可乘150路公交往Plaça d’Espanya方向下山；TMB站点列表列有MNAC附近的“Piscines Picornell – Museu Nacional”。MNAC官方露台页面列出的开放时间为周二至周六10:00–20:00、周日及节假日10:00–15:00，因此周日傍晚不适合作为观赏日落的停留点。下车前请核对露台开放情况、公交方向和出行日期时刻表。T-familiar乘公交时每位乘客都要验证；1区行程若在首次验证75分钟后乘车，就属于新行程。在MNAC附近下车后再乘同一条150路，也需按新行程计算。缆车不包含在T-familiar内。这只是可选方案，不保证步行少或无台阶；车站、城堡和站点之间仍需步行，请查看当天运营信息。',
      freeVisitTitle: "免费入场：MNAC与蒙特惠奇城堡的日期不同",
      freeVisit: "MNAC（加泰罗尼亚国家艺术博物馆）公布：每周六15:00起免费入场；每月第一个周日10:00–15:00免费。免费时段也建议在线提前预约入场票。冬季（10月至4月）开放时间为周二至周六10:00–18:00、周日及节假日10:00–15:00，周一闭馆（节假日除外）。免费时段是否包括临时展览和露台，官方说明没有明确区分，请查看预约页面。2026年11月8日是当月第二个周日，不属于MNAC的第一个周日免费日。\n\n蒙特惠奇城堡每周日15:00后免费；每月第一个周日全天免费。成人标准票€12，因此€36仅适用于三位成人在收费日均按标准价购票。11月至次年2月开放时间为10:00–18:00，售票处17:30关闭；官方资料没有说明这就是免费访客的最后入场时间。2026年11月8日（周日）适用15:00后的免费时段。请在出行当天查看公告和入场说明。",
      walkTitle: "拍照步行路线：从凯旋门到Ciutat Comtal",
      walk: "路线示例：Arc de Triomf → Passeig de Lluís Companys → 城堡公园内的Cascada Monumental → 加泰罗尼亚音乐宫外观 → Plaça de Catalunya → Rambla de Catalunya 18的Ciutat Comtal（也称Ciudad Condal）。地图路线约3.1公里、步行44分钟；加上拍照停留，建议预留约60–85分钟。这是地图和步行速度估算，不保证固定时长。\n\n凯旋门为红砖新穆德哈尔风格。Cascada Monumental由Josep Fontserè设计，年轻时的Antoni Gaudí曾担任助手。“黄金瀑布”或“媲美罗马特莱维喷泉”的说法未获核实，建议称为纪念性瀑布喷泉。音乐宫外观有砖、陶瓷柱和马赛克；它与圣十字圣保罗医院共同构成UNESCO世界遗产项目。加泰罗尼亚广场喷泉有季节性运营公告，不要保证11月仍喷水。城堡公园公布的开放时间为每日07:00至日落，但施工可能造成绕行或区域限制。\n\nCiutat Comtal地址为Rambla de Catalunya 18，地图显示距Plaça de Catalunya约300米、步行4分钟，并非“广场正对面”。餐厅集团称除圣诞节外每日营业，但已查阅的官方资料未列详细时间。蜂蜜鳕鱼、虾、clara是否仍在售，以及“13:30后排队非常久”的说法，均未由官方确认。请当天核对营业时间和菜单，不要承诺排队时长。",
      cafePlanTitle: "缆车铁路上站附近的咖啡馆与15:00入场安排",
      cafePlan: "当前对话无法确认此前提到的具体咖啡馆。可核实的候选是Fundació Joan Miró的酒吧餐厅咖啡馆（Avinguda de Miramar 1）。基金会官网列出的营业时间为周二至周日10:00–19:00，进入咖啡馆无需购买博物馆门票。它靠近Parc de Montjuïc缆车铁路上站；步行约5–8分钟是按位置估算。市政府说明从缆车铁路上站到城堡需上坡步行20–25分钟，不包括咖啡馆与车站间的步行。\n\n14:15才结束午餐再出发，还要换乘、等候、去咖啡馆并上坡，赶15:00免费入场没有足够余量。较宽松的示例（公交与等候时间不作保证）：10:30–11:55拍照步行，12:00–13:00午餐，13:00–13:45乘L3和缆车铁路到上站，13:45–14:00短暂停留咖啡馆，14:00–14:35上坡前往城堡，然后等候15:00免费入场。请查看当日路线和运营；若有延误，请省略咖啡馆或更早出发。也可乘需另购票的Montjuïc Cable Car。150路公交连接Plaça d’Espanya与城堡，请核对站点、方向和当天运营。",
      chatChipFree: "免费入场与咖啡馆",
      chatQueryFree: "MNAC和蒙特惠奇城堡免费时段及缆车铁路附近咖啡馆",
      chatChipWalk: "拍照步行路线",
      chatQueryWalk: "从凯旋门到Ciutat Comtal的拍照路线与景点",
      beachTitle: '巴塞罗内塔海滩：按海滩区段选择', beach: 'TMB将Barceloneta（L4）列为Platja de la Barceloneta附近的地铁站。具体步行路线取决于要去哪个海滩入口。TMB海滩指南也将V15和D20列为巴塞罗内塔海滩附近的公交线路。TMB公交网络概览将V15列为Barceloneta–Vall d’Hebron；当天方向和站点请查看其实时线路页。D20两端为Passeig Marítim与Ernest Lluch，不要将其说成从Plaça de Catalunya直达。TMB公交网络概览列出V21连接Passeig Marítim与Montbau，但该静态资料无法确认圣家堂的具体上车站。不保证无台阶路线或具体步行时间。',
      cablesTitle: '两种不同的缆车服务', montCableTitle: 'Montjuïc Cable Car · 上山', montCable: '这是与缆车铁路不同、需另购票的观光缆车。线路为Parc de Montjuïc–Mirador–Castell；Castell站靠近城堡，但不是城堡入口本身。运营方2026年成人票价：单程€12（仅在缆车站售票处购买），往返原价€19；通过Hola Barcelona在线购票享10%折扣为€17.10。往返票须当天使用。在线购买后须在售票处出示凭证。11–12月每日10:00–18:00。运营方规定闭园前15分钟停止入场；若要完成全线，应提前20分钟入场。没有单独公布末班发车时刻。',
      portCableTitle: 'Port Cable Car · 横越港口', portCable: '这条线路和票价均不同于Montjuïc Cable Car。它连接巴塞罗内塔的Torre de San Sebastián与蒙特惠奇的Miramar；Torre Jaime I已关闭，不停靠。官方票价为单程€12.50、往返€20.00，可在售票处或网上购票。运营方称全年运营（12月25日除外），但未能确认11月的详细时间或末班时刻。官方资料对行程时间说法不一致，因此不写单一时长。FAQ说明San Sebastián塔有电梯和坡道，Miramar站台有台阶。如需无障碍路线，请提前向运营方确认往返和到达端的完整路径。',
      careTitle: '与父母同行时的注意事项', care: '车站出口、电梯运行、路面和坡度、过街等待、步行至缆车站的距离都会因路线和当天情况而不同。不保证无台阶或适合所有人。预留换乘时间，按具体入口查看路线；若步行负担较大，请保留休息时间。',
      routesTitle: '打开当日路线', routesNote: '在Google Maps查看公共交通路线。打开链接时请重新核对实时运营、施工和候车情况。',
      sourcesTitle: '官方来源', openRoute: '查看公共交通路线', openTmb: '查看TMB线路', guideButton: '打开交通指南', chatChip: '陪父母游蒙特惠奇的交通方案', chatQuery: '陪父母游蒙特惠奇的交通方案：缆车铁路、单程缆车、150路公交', chatTitle: '巴塞罗那交通指南', chatLink: '打开交通指南',
      routeLabels: { sagradaParallel: '圣家堂 → Paral·lel', catalunyaParallel: '加泰罗尼亚广场 → Paral·lel', espanyaCastell: '西班牙广场 → 蒙特惠奇城堡', catalunyaBeach: '加泰罗尼亚广场 → 巴塞罗内塔海滩', sagradaBeach: '圣家堂附近 → 巴塞罗内塔海滩' }
    }
  };

  const sectionSources = {
    fare: ['tmbTfa', 'tmbTerms', 'atm', 'tmbFares'],
    mont: ['funicular', 'bus150', 'bus150Guide', 'tmbHours', 'busMap', 'castleAccess'],
    combo: ['funicular', 'tmbTfa', 'tmbTerms', 'atm', 'tmbFares', 'montjuicFares', 'montjuicHours', 'montjuicRoute', 'bus150', 'bus150Guide', 'bus150Stop', 'castleAccess', 'mnacTerraces'],
    freeVisit: ['mnacPrices', 'castleVisit'],
    walk: ['arcTriomf', 'ciutadella', 'palauHistory', 'unescoPalau', 'placaFountains', 'cityCondal', 'walkRoute'],
    cafePlan: ['joanMiroVisit', 'joanMiroCafe', 'funicular', 'castleAccess', 'castleVisit', 'montjuicHours'],
    beach: ['beachNotice', 'barcelonetaStation', 'busNetwork', 'v15', 'd20', 'v21', 'busMap'],
    cable: ['montjuicFares', 'montjuicHours', 'montjuicRoute', 'montjuicCastle', 'portFaq', 'portRoute', 'portFare', 'portTech'],
    care: ['barcelonetaStation', 'portFaq', 'portFare', 'montjuicRoute']
  };

  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));
  }

  function routeUrl(route) {
    const params = new URLSearchParams({ api: '1', origin: route.origin, destination: route.destination, travelmode: 'transit' });
    return `https://www.google.com/maps/dir/?${params.toString()}`;
  }

  function sourceLinks(ids, lang) {
    return ids.map(id => {
      const item = sourceDefs[id];
      return `<a class="bcn-transit-source" href="${item.url}" target="_blank" rel="noopener noreferrer">${escapeHtml(item.names[lang])}</a>`;
    }).join('');
  }

  function render(lang) {
    lang = content[lang] ? lang : 'ko';
    const mount = document.getElementById('barcelona-transit-guide-mount');
    if (!mount) return;
    const c = content[lang];
    const sections = [
      ['freeVisit', c.freeVisitTitle, c.freeVisit],
      ['walk', c.walkTitle, c.walk],
      ['cafePlan', c.cafePlanTitle, c.cafePlan],
      ['fare', c.fareTitle, c.fare],
      ['mont', c.montTitle, c.mont],
      ['combo', c.comboTitle, c.combo],
      ['beach', c.beachTitle, c.beach],
      ['cable', c.cablesTitle, `<h3>${escapeHtml(c.montCableTitle)}</h3><p>${escapeHtml(c.montCable)}</p><h3>${escapeHtml(c.portCableTitle)}</h3><p>${escapeHtml(c.portCable)}</p>`],
      ['care', c.careTitle, c.care]
    ];
    const cards = sections.map(([key, title, body]) => {
      const bodyHtml = key === 'cable' ? body : body.split(/\n\n/).map(text => `<p>${escapeHtml(text)}</p>`).join('');
      return `<article class="bcn-transit-card"><h2>${escapeHtml(title)}</h2>${bodyHtml}<div class="bcn-transit-sources" aria-label="${escapeHtml(c.sourcesTitle)}">${sourceLinks(sectionSources[key], lang)}</div></article>`;
    }).join('');
    const routeHtml = routes.map(route => `<a class="bcn-transit-route" href="${routeUrl(route)}" target="_blank" rel="noopener noreferrer"><span>${escapeHtml(c.routeLabels[route.id])}</span><small>${escapeHtml(c.openRoute)} ↗</small></a>`).join('');
    const liveSources = ['v15', 'd20', 'v21', 'beachNotice'].map(id => `<a class="bcn-transit-source" href="${sourceDefs[id].url}" target="_blank" rel="noopener noreferrer">${escapeHtml(sourceDefs[id].names[lang])}</a>`).join('');
    mount.innerHTML = `<div class="bcn-transit-guide" lang="${lang}">
      <header class="bcn-transit-hero"><div class="bcn-transit-kicker">${escapeHtml(c.kicker)}</div><h1>${escapeHtml(c.title)}</h1><p>${escapeHtml(c.intro)}</p></header>
      <div class="bcn-transit-notice"><strong>${escapeHtml(c.statusTitle)}</strong><p>${escapeHtml(c.status)}</p></div>
      <div class="bcn-transit-alert"><strong>${escapeHtml(c.dateNoteTitle)}</strong><p>${escapeHtml(c.dateNote)}</p><div class="bcn-transit-sources">${sourceLinks(['tmbHours', 'montjuicHours', 'bus150', 'portFaq'], lang)}</div></div>
      <div class="bcn-transit-grid">${cards}</div>
      <section class="bcn-transit-route-section"><h2>${escapeHtml(c.routesTitle)}</h2><p>${escapeHtml(c.routesNote)}</p><div class="bcn-transit-route-grid">${routeHtml}</div><div class="bcn-transit-sources">${liveSources}</div></section>
    </div>`;
  }

  function goToGuide() {
    if (typeof window.switchGuidebookChapter === 'function') window.switchGuidebookChapter('chapter-practical');
    if (typeof window.goToBookPage === 'function') window.goToBookPage('chapter-practical', 4, true);
    if (typeof window.closeChatWindow === 'function') window.closeChatWindow();
  }

  function sectionForQuery(query) {
    const q = String(query || '').toLowerCase();
    if (/t[-\s]?familiar|환승|검표|乗換|换乘|transfer|validate|validation|แชร์|다인/.test(q)) return 'fare';
    if (/caf[eé]|cafe|coffee|카페|カフェ|咖啡|15:00|3 ?pm|three ?pm/.test(q)) return 'cafePlan';
    if (/mnac|castell|castle|free entry|free admission|free-entry|무료입장|무료 입장|입장료|無料入場|免费入场|domingo.*grat|gratis/.test(q)) return 'freeVisit';
    if (/arc de triomf|凱旋門|凯旋门|ciutadella|cascada|palau de la música|ciutat comtal|ciudad condal|사진|散歩|步行|徒步|photo walk|walking route|산책|写真|拍照/.test(q)) return 'walk';
    if (/barceloneta|바르셀로네타|バルセロネータ|巴塞罗内塔|beach|해변|海岸|海滩|platja|v15|d20|v21/.test(q)) return 'beach';
    if (/port cable|port cable car|teleférico del puerto|port cab|항구 케이블|포트 케이블|港湾缆车|港口缆车|ポート.*ケーブル/.test(q)) return 'cable';
    if (/parent|family|부모|어르신|両親|ご家族|父母|爸妈|조합|組み合わせ|组合|bus\s*150|150\s*(bus|번|路)|150번/.test(q)) return 'combo';
    if (/cable car|telefèric|teleferic|케이블카|缆车|ロープウェイ|cableway/.test(q)) return 'cable';
    return 'mont';
  }

  function buildChatResponse(query, lang) {
    const q = String(query || '').toLowerCase();
    const keywords = [
      'barcelona', '바르셀로나', 'バルセロナ', '巴塞罗那', 't-familiar', 't familiar',
      'montju', '몬주익', 'モンジュイック', '蒙特惠奇', 'funicular', '푸니쿨라', '缆车铁路', '缆车',
      'barceloneta', '바르셀로네타', 'バルセロネータ', '巴塞罗内塔', 'beach', '해변', '海滩', '海岸',
      'v15', 'd20', 'v21', '150', 'mnac', 'parents', 'family', '부모님', '어르신', '両親', '父母', '爸妈', '조합', '組み合わせ', '组合', 'cable car', '케이블카', 'ロープウェイ', '港口缆车', 'port cable', '환승', '乗換', '换乘',
      'free entry', 'free admission', 'castle', 'castell', '무료입장', '무료 입장', '무료', '入場無料', '無料入場', '免费入场', '免费', 'arc de triomf', 'ciutadella', 'cascada', 'palau de la música', 'ciutat comtal', 'ciudad condal', 'photo walk', 'walking route', '사진', '산책', 'カフェ', '咖啡馆', 'cafe', 'café', '카페'
    ];
    if (!keywords.some(word => q.includes(word))) return null;
    lang = content[lang] ? lang : (content[window.currentLang] ? window.currentLang : 'ko');
    const c = content[lang];
    const key = sectionForQuery(query);
    const summary = { fare: c.fare, beach: c.beach, cable: `${c.montCable}\n\n${c.portCable}`, combo: c.combo, freeVisit: c.freeVisit, walk: c.walk, cafePlan: `${c.cafePlan}\n\n${c.freeVisit}`, mont: c.mont }[key];
    const body = summary.split(/\n\n/).map(text => `<p>${escapeHtml(text)}</p>`).join('');
    return `<div class="bcn-transit-chat-answer"><strong>${escapeHtml(c.chatTitle)}</strong>${body}<div class="bcn-transit-sources">${sourceLinks(sectionSources[key], lang)}</div><button type="button" class="chat-quick-chip" onclick="goToBarcelonaTransitGuide()">${escapeHtml(c.chatLink)}</button></div>`;
  }

  for (const lang of Object.keys(content)) {
    if (typeof I18N_DICTIONARY !== 'undefined' && I18N_DICTIONARY[lang]) {
      Object.assign(I18N_DICTIONARY[lang], {
        page_practical_5: content[lang].pageTransit,
        page_practical_6: content[lang].pageActivity,
        page_practical_7: content[lang].pageAi
      });
    }
    if (typeof CHATBOT_I18N !== 'undefined' && CHATBOT_I18N[lang] && Array.isArray(CHATBOT_I18N[lang].chips)) {
      CHATBOT_I18N[lang].chips.unshift(
        { text: content[lang].chatChipWalk, q: content[lang].chatQueryWalk },
        { text: content[lang].chatChipFree, q: content[lang].chatQueryFree },
        { text: content[lang].chatChip, q: content[lang].chatQuery }
      );
    }
  }

  window.BARCELONA_TRANSIT_GUIDE = { content, routes, sources: sourceDefs, render };
  window.renderBarcelonaTransitGuide = render;
  window.buildBarcelonaTransitChatResponse = buildChatResponse;
  window.goToBarcelonaTransitGuide = goToGuide;
  document.addEventListener('DOMContentLoaded', () => render(window.currentLang || 'ko'));
})();
