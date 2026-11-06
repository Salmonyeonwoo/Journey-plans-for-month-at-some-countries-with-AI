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
      statusTitle: '기존 일정과 예약은 변경하지 않습니다', status: '바르셀로나 체류 2026.11.05–11.11 및 사그라다 파밀리아 11.10 15:30 입장은 그대로 유지합니다. 기존의 13:30–16:00 바르셀로네타 그늘 휴식과 저녁 Port Olímpic 산책도 바꾸지 않습니다. 이 페이지는 보충 안내입니다.',
      dateNoteTitle: '운행시간은 출발 당일 다시 확인하세요', dateNote: '확인 기준 2026-11-06. 요금과 운행시간은 바뀔 수 있습니다. TMB 공개 시간표에서 2026년 11월 몬주익 푸니쿨라 적용 시간을 확인하지 못했고, Port Cable Car도 11월 상세 영업시간·막차를 공개하지 않습니다. 여름 시간표나 과거 시간표를 11월에 대입하지 말고, 출발 당일 TMB·운영사 공지를 확인하세요.',
      fareTitle: 'T-familiar와 환승: 일행별로 검표', fare: 'T-familiar는 첫 검표일부터 연속 30일 동안 쓰는 통합 8회 다인권입니다. 함께 이동하는 승객 수만큼 각각 검표해야 하므로 두 분이면 2회분이 사용됩니다. 적격 통합 다회권의 환승은 1존 기준 첫 검표부터 마지막 환승 검표까지 75분 안에 최대 3회(최대 4개 교통수단) 조건입니다. 존 수에 따라 시간이 늘어나며, 각 승객의 여정·승차권 존이 맞아야 합니다. 같은 버스 노선 연속 탑승, 지하철 재입장, 귀환·중단 후 다시 시작까지 한 번으로 보장되지 않습니다. 버스에서는 카드를 든 사람이 마지막에 내리고, 지하철에서는 일행이 함께 이동해야 합니다. T-familiar는 L9 Sud 공항 T1·T2 역에서는 유효하지 않습니다.',
      montTitle: 'Paral·lel에서 푸니쿨라로 몬주익까지', mont: '사그라다 파밀리아 주변에서는 L2, Catalunya에서는 L3로 Paral·lel까지 이동한 뒤 FM 몬주익 푸니쿨라로 환승합니다. 같은 역 안의 연결이지만 L2/L3에서 FM으로 갈아타는 환승입니다. FM은 Paral·lel–Parc de Montjuïc 두 역을 잇고, 푸니쿨라 구간 자체는 TMB 안내상 약 2분입니다. 푸니쿨라는 통합요금 대상이지만 환승 혜택은 승차권 종류·존·시간 조건에 따릅니다. Parc de Montjuïc은 성 안이 아닙니다. 성으로 더 올라가려면 별도 요금의 Montjuïc Cable Car를 타거나, Plaça d’Espanya에서 150번 버스로 Castell 방향을 확인할 수 있습니다. 출발지별 가장 빠르거나 편한 방법이라고 단정하지 않습니다.',
      beachTitle: '바르셀로네타 해변: 구간에 맞춰 접근', beach: 'TMB는 Platja de la Barceloneta의 가까운 지하철역으로 Barceloneta(L4)를 안내합니다. 해변이 길어 실제로 갈 모래사장 입구에 따라 도보 동선은 달라집니다. TMB 자료에서 V15와 D20은 바르셀로네타 해변 쪽 노선으로 안내됩니다. TMB 버스망 개요는 V15를 Barceloneta–Vall d’Hebron 구간으로 적지만, 최신 방향·정류장은 라이브 노선 페이지에서 다시 확인하세요. D20의 종점은 Passeig Marítim–Ernest Lluch이며 Plaça Catalunya에서 출발하는 직행으로 보지 마세요. TMB 버스망 개요에는 V21이 Passeig Marítim–Montbau로 적혀 있지만, 이 자료만으로 사그라다 파밀리아에서 탈 정확한 정류장은 확정할 수 없습니다. 계단 없음이나 특정 도보시간은 보장하지 않습니다.',
      cablesTitle: '서로 다른 두 케이블카 서비스', montCableTitle: 'Montjuïc Cable Car · 산 위', montCable: '푸니쿨라와 별도인 유료 관광 케이블카입니다. Parc de Montjuïc–Mirador–Castell 역을 잇고, Castell 역은 성 근처이지 성 내부 입구가 아닙니다. 운영사 2026 요금표의 성인 편도는 €12(역 매표소에서만 구매), 왕복은 정가 €19 또는 Hola Barcelona 온라인 10% 할인 적용 시 €17.10입니다. 왕복권은 같은 날 사용해야 하며, 온라인 구매 바우처는 매표소에서 제시해야 합니다. 11–12월 운영시간은 매일 10:00–18:00이며, 운영사가 정한 마지막 입장 기준은 폐장 15분 전, 전체 노선 이용은 20분 전입니다. 별도 ‘막차 출발 시각’은 게시하지 않습니다.',
      portCableTitle: 'Port Cable Car · 항구 횡단', portCable: 'Montjuïc Cable Car와 다른 노선·요금의 서비스입니다. Barceloneta의 Torre de San Sebastián에서 Montjuïc의 Miramar까지 운행하며, Torre Jaime I는 폐쇄되어 정차하지 않습니다. 공식 요금은 편도 €12.50·왕복 €20.00, 표는 매표소 또는 온라인에서 살 수 있습니다. 운영사는 12월 25일을 제외한 연중 운행이라고 안내하지만 11월 상세 시간표와 막차 시각은 찾지 못했습니다. 편도 소요시간도 공식 자료끼리 달라 숫자를 확정하지 않습니다. 운영사 FAQ는 San Sebastián 타워의 엘리베이터·경사로와 Miramar 승강장의 계단을 설명합니다. 접근성이 중요하면 왕복·도착 측 동선을 운영사에 미리 확인하세요.',
      careTitle: '부모님과 이동할 때 확인할 점', care: '역 출구, 리프트 운행 여부, 노면과 경사, 횡단보도 대기, 케이블카 정류장까지의 보행은 경로·당일 상태에 따라 달라집니다. 특정 경로가 계단 없이 이어지거나 모든 분에게 편하다고 보장하지 않습니다. 여유 시간을 두고 정류장·출구별 경로를 확인하며, 이동 부담이 크면 일정 사이 휴식을 유지하세요.',
      routesTitle: '현재 경로 열기', routesNote: 'Google Maps에서 대중교통 경로를 확인합니다. 실시간 운행·공사·대기 상황은 링크를 연 날에 다시 확인하세요.',
      sourcesTitle: '공식 출처', openRoute: '대중교통 경로 보기', openTmb: 'TMB 노선 확인', guideButton: '교통 페이지 열기', chatChip: '바르셀로나 교통·환승 안내', chatQuery: '바르셀로나 T-familiar 환승과 몬주익·바르셀로네타 교통 안내', chatTitle: '바르셀로나 교통 안내', chatLink: '교통 가이드 열기',
      routeLabels: { sagradaParallel: '사그라다 파밀리아 → Paral·lel', catalunyaParallel: '카탈루냐 광장 → Paral·lel', espanyaCastell: 'Espanya 광장 → Montjuïc 성', catalunyaBeach: '카탈루냐 광장 → 바르셀로네타 해변', sagradaBeach: '사그라다 파밀리아 주변 → 바르셀로네타 해변' }
    },
    en: {
      pageTransit: '5. Barcelona transit', pageActivity: '6. Activity & spa ideas', pageAi: '7. Live AI search',
      kicker: 'BARCELONA · SUPPLEMENTAL GUIDE BASED ON OFFICIAL TRANSIT SOURCES', title: 'Barcelona transit: transfers and cable cars',
      intro: 'This adds practical transit context without changing the confirmed itinerary. The map links open a route for the selected day; they do not promise an arrival time or the fastest route.',
      statusTitle: 'Confirmed plans and bookings stay unchanged', status: 'Barcelona stay 5–11 Nov 2026 and Sagrada Família entry on 10 Nov at 15:30 remain as they are. The existing 13:30–16:00 shaded Barceloneta rest and evening Port Olímpic walk also stay unchanged. This page is supplemental guidance.',
      dateNoteTitle: 'Recheck service on the day of travel', dateNote: 'Checked 6 Nov 2026. Fares and operating hours can change. The public TMB timetable page does not show a November 2026 Montjuïc Funicular schedule, and the Port Cable Car operator does not publish detailed November hours or a last departure. Do not carry a summer or past timetable into November; check TMB and operator notices on the day.',
      fareTitle: 'T-familiar and transfers: validate for each rider', fare: 'T-familiar is an integrated 8-journey multi-person ticket, valid for 30 consecutive days from first validation. Each rider must validate, so two people use two journeys. With an eligible integrated multi-journey ticket, the 1-zone transfer window is up to 75 minutes from first to last transfer validation, with at most 3 transfers (up to 4 modes). The time increases with zones; ticket zones must cover the journey. This is not a blanket promise for boarding the same bus line again, re-entering the metro, returning, or resuming a broken journey. On a bus the cardholder must get off last; in the metro the group travels together. T-familiar is not valid at Aeroport T1/T2 on L9 Sud.',
      montTitle: 'Via Paral·lel and the funicular to Montjuïc', mont: 'From the Sagrada Família area, take L2; from Plaça de Catalunya, take L3 to Paral·lel, then change to the FM Montjuïc Funicular. The lines connect within the station, but changing from L2/L3 to FM is still a transfer. FM links Paral·lel and Parc de Montjuïc; TMB gives about 2 minutes for the funicular segment itself. The funicular is integrated into the fare system, but transfer treatment depends on ticket type, zones and time. Parc de Montjuïc is not the castle. To continue uphill, use the separately ticketed Montjuïc Cable Car, or check bus 150 from Plaça d’Espanya toward Castell. No route is labelled fastest or most comfortable for every origin.',
      beachTitle: 'Barceloneta Beach: choose for the beach section', beach: 'TMB lists Barceloneta (L4) as the nearby metro station for Platja de la Barceloneta. The actual walk depends on which beach entrance you want. TMB beach information lists V15 and D20 among routes for the Barceloneta beach area. TMB’s network overview describes V15 between Barceloneta and Vall d’Hebron; recheck today’s direction and stops on its live route page. D20 runs between Passeig Marítim and Ernest Lluch; do not treat it as a direct bus from Plaça de Catalunya. TMB’s network overview lists V21 between Passeig Marítim and Montbau, but the exact Sagrada Família boarding stop is not established by that static source. No stair-free path or precise walking time is guaranteed.',
      cablesTitle: 'Two different cable-car services', montCableTitle: 'Montjuïc Cable Car · up the hill', montCable: 'This is a separately ticketed tourist cable car, not the funicular. It links Parc de Montjuïc–Mirador–Castell; the Castell station is near the castle, not the castle entrance itself. The operator’s 2026 adult fare is €12 one-way (sold only at cable-car station ticket offices) or €19 standard return / €17.10 with the 10% Hola Barcelona online discount. Return tickets must be used the same day; show an online voucher at the ticket office. November–December hours are daily 10:00–18:00. The operator says last access is 15 minutes before closing, or 20 minutes before if completing the full route; it does not publish a separate last-departure time.',
      portCableTitle: 'Port Cable Car · across the harbour', portCable: 'This is a different route and fare from the Montjuïc Cable Car. It runs from Torre de San Sebastián in Barceloneta to Miramar on Montjuïc; Torre Jaime I is closed and is not a stop. The operator lists €12.50 one-way / €20 return, with tickets at the ticket office or online. It says the service runs year-round except 25 December, but I could not verify detailed November hours or a last departure. Official trip-duration figures differ, so no single duration is stated. The FAQ describes a lift and ramp at San Sebastián Tower and stairs at the Miramar platform. If access matters, confirm the full outbound and return path with the operator.',
      careTitle: 'A note for travelling with parents', care: 'Exits, lift status, pavement and slope, crossing waits, and the walk to each cable-car station vary by route and day. No route is guaranteed to be step-free or comfortable for everyone. Leave slack between stops, check the route for the exact entrance, and keep rest time if walking is tiring.',
      routesTitle: 'Open a current route', routesNote: 'Check a public-transport route in Google Maps. Recheck live service, works and waiting conditions when you open it.',
      sourcesTitle: 'Official sources', openRoute: 'Open transit route', openTmb: 'Check TMB route', guideButton: 'Open transit guide', chatChip: 'Barcelona transit and transfers', chatQuery: 'Barcelona T-familiar transfers and transit to Montjuïc and Barceloneta', chatTitle: 'Barcelona transit guide', chatLink: 'Open the transit guide',
      routeLabels: { sagradaParallel: 'Sagrada Família → Paral·lel', catalunyaParallel: 'Plaça de Catalunya → Paral·lel', espanyaCastell: 'Plaça d’Espanya → Montjuïc Castle', catalunyaBeach: 'Plaça de Catalunya → Barceloneta Beach', sagradaBeach: 'Sagrada Família area → Barceloneta Beach' }
    },
    ja: {
      pageTransit: '5. バルセロナの交通', pageActivity: '6. 体験・スパの候補', pageAi: '7. リアルタイムAI検索',
      kicker: 'バルセロナ · 公式交通情報に基づく補足ガイド', title: 'バルセロナ交通：乗換とケーブルカー',
      intro: '確定済みの日程は変更せず、交通券・モンジュイック・バルセロネータ海岸への移動情報をまとめました。地図リンクは指定日に経路を調べるためのもので、所要時間や最短ルートを保証するものではありません。',
      statusTitle: '確定した予定・予約はそのまま', status: 'バルセロナ滞在 2026年11月5～11日、サグラダ・ファミリア入場 11月10日15:30は変更しません。既存の13:30～16:00のバルセロネータ日陰休憩と夜のPort Olímpic散歩もそのままです。このページは補足情報です。',
      dateNoteTitle: '利用当日に運行状況を再確認', dateNote: '確認日：2026年11月6日。運賃と運行時間は変更される場合があります。TMBの公開時刻表では2026年11月のモンジュイック・フニクラの運行時間を確認できず、Port Cable Car運営会社も11月の詳細時間・最終便を公表していません。夏季や過去の時刻表を11月に当てはめず、当日にTMBと運営会社の案内をご確認ください。',
      fareTitle: 'T-familiarと乗換：人数分の検札が必要', fare: 'T-familiarは初回検札から連続30日有効の統合8回・複数人用チケットです。一緒に移動する人数分の検札が必要なため、2人なら2回分を使います。対象となる統合回数券では、1ゾーンの乗換時間は最初から最後の乗換検札まで最大75分、乗換は最大3回（最大4つの交通機関）です。ゾーン数により時間は延び、チケットのゾーンが移動範囲をカバーする必要があります。同じバス路線への再乗車、地下鉄への再入場、折返しや中断後の再開まで一律に1回扱いになるわけではありません。バスではカード保持者が最後に降り、地下鉄ではグループで一緒に移動します。T-familiarはL9 Sudの空港T1・T2駅では使えません。',
      montTitle: 'Paral·lelでフニクラに乗換えてモンジュイックへ', mont: 'サグラダ・ファミリア周辺からはL2、Plaça de CatalunyaからはL3でParal·lelへ行き、FMモンジュイック・フニクラに乗換えます。駅構内で接続しますが、L2/L3からFMへの乗換です。FMはParal·lelとParc de Montjuïcを結び、フニクラ区間自体はTMB案内で約2分です。フニクラは統合運賃の対象ですが、乗換扱いは券種・ゾーン・時間条件によります。Parc de Montjuïcは城の中ではありません。さらに上る場合は別料金のMontjuïc Cable Car、またはPlaça d’EspanyaからCastell方面の150番バスを確認してください。すべての出発地で最速・最も楽とは断定しません。',
      beachTitle: 'バルセロネータ海岸：海岸区間に合わせて選ぶ', beach: 'TMBはPlatja de la Barcelonetaに近い地下鉄駅としてBarceloneta（L4）を案内しています。実際の徒歩経路は利用する海岸入口によって変わります。TMBの海岸案内にはV15とD20もバルセロネータ付近の路線として掲載されています。TMBの路線網概要ではV15をBarceloneta–Vall d’Hebronとしていますが、当日の方向・停留所は最新の路線ページで再確認してください。D20の区間はPasseig Marítim–Ernest Lluchで、Plaça de Catalunyaからの直通バスではありません。TMBの路線網概要はV21をPasseig Marítim–Montbauとしていますが、静的資料だけではサグラダ・ファミリアの正確な乗車停留所を確認できません。階段のない経路や正確な徒歩時間は保証しません。',
      cablesTitle: '別々の2つのケーブルカー', montCableTitle: 'Montjuïc Cable Car · 山の上へ', montCable: 'フニクラとは別料金の観光ケーブルカーです。Parc de Montjuïc–Mirador–Castellを結び、Castell駅は城の近くですが城の入口そのものではありません。運営会社の2026年大人料金は片道€12（駅窓口のみ）、往復は通常€19／Hola Barcelonaのオンライン10%割引で€17.10です。往復券は同日利用です。オンライン購入の場合は、窓口でバウチャーを提示します。11～12月は毎日10:00～18:00。閉館15分前までに最終入場、全区間利用は20分前までの入場と案内されています。別途の最終出発時刻は公表されていません。',
      portCableTitle: 'Port Cable Car · 港を横断', portCable: 'こちらはMontjuïc Cable Carとは別の路線・料金です。バルセロネータのTorre de San SebastiánからモンジュイックのMiramarまで運行し、Torre Jaime Iは閉鎖中で停車しません。公式料金は片道€12.50・往復€20.00、窓口またはオンラインで購入できます。運営会社は12月25日を除き通年運行としていますが、11月の詳細時間・最終便は確認できません。公式資料の所要時間が一致しないため、単一の時間は記載しません。FAQではSan Sebastián塔にエレベーターとスロープ、Miramar乗り場に階段があると説明しています。アクセスが重要な場合、往復全体の動線を事前に確認してください。',
      careTitle: 'ご両親と移動するときの確認点', care: '駅出口、エレベーターの運転、歩道・坂、横断歩道の待ち時間、ケーブルカー駅までの徒歩は経路や当日の状況によって異なります。階段なし、誰にとっても楽、とは保証できません。停留所・入口ごとの経路を確認し、移動に余裕を持たせてください。',
      routesTitle: '現在の経路を開く', routesNote: 'Google Mapsで公共交通の経路を確認できます。運行・工事・待ち時間は開いた日に再確認してください。',
      sourcesTitle: '公式情報', openRoute: '公共交通の経路', openTmb: 'TMB路線を確認', guideButton: '交通ガイドを開く', chatChip: 'バルセロナ交通・乗換案内', chatQuery: 'バルセロナのT-familiar乗換とモンジュイック・バルセロネータの交通', chatTitle: 'バルセロナ交通案内', chatLink: '交通ガイドを開く',
      routeLabels: { sagradaParallel: 'サグラダ・ファミリア → Paral·lel', catalunyaParallel: 'Plaça de Catalunya → Paral·lel', espanyaCastell: 'Plaça d’Espanya → モンジュイック城', catalunyaBeach: 'Plaça de Catalunya → バルセロネータ海岸', sagradaBeach: 'サグラダ・ファミリア周辺 → バルセロネータ海岸' }
    },
    zh: {
      pageTransit: '5. 巴塞罗那交通', pageActivity: '6. 活动与水疗备选', pageAi: '7. 实时AI搜索',
      kicker: '巴塞罗那 · 基于官方交通资料的补充指南', title: '巴塞罗那交通：换乘与缆车',
      intro: '在不改变已确认行程的前提下，补充交通票、蒙特惠奇和巴塞罗内塔海滩出行信息。地图链接用于查看所选日期的路线，不保证到达时间或最快路线。',
      statusTitle: '已确认的行程和预订保持不变', status: '巴塞罗那停留 2026年11月5日至11日，以及圣家堂11月10日15:30入场均保持不变。原有13:30–16:00巴塞罗内塔海滩树荫休息和晚间Port Olímpic散步也不变。本页仅为补充指南。',
      dateNoteTitle: '出发当天再次核对运营信息', dateNote: '核对日期：2026年11月6日。票价与运营时间可能调整。TMB公开时刻表页面未列出2026年11月蒙特惠奇缆车铁路的适用时刻，Port Cable Car运营方也未公布11月详细营业时间或末班时刻。不要把夏季或旧时刻表套用到11月；请在出发当天查看TMB和运营方公告。',
      fareTitle: 'T-familiar与换乘：每位乘客都要验证', fare: 'T-familiar是首次验证起连续30天有效的综合8次多人票。同行人数需要分别验证，因此两人同行会使用2次。符合条件的综合多次票在1区内从首次到最后一次换乘验证最多75分钟，最多换乘3次（最多乘坐4种交通工具）。跨区时限会延长，车票区数必须覆盖行程。这并不保证同一公交线路再次上车、重新进地铁、往返或中断后继续都只算一次。公交上持卡人需最后下车；乘地铁时同行者需一起行动。T-familiar不适用于L9 Sud机场T1/T2站。',
      montTitle: '在Paral·lel换乘缆车铁路前往蒙特惠奇', mont: '从圣家堂附近乘L2，从Plaça de Catalunya乘L3到Paral·lel，再换乘FM蒙特惠奇缆车铁路。线路在站内连接，但从L2/L3换到FM仍属于换乘。FM连接Paral·lel与Parc de Montjuïc，TMB给出的缆车铁路区间本身约2分钟。缆车铁路属于综合票制，但换乘优惠取决于票种、区数与时限。Parc de Montjuïc并不是城堡内部。继续上山可另购Montjuïc Cable Car车票，也可查看从Plaça d’Espanya开往Castell的150路公交。不要对所有起点都称为最快或最舒适路线。',
      beachTitle: '巴塞罗内塔海滩：按海滩区段选择', beach: 'TMB将Barceloneta（L4）列为Platja de la Barceloneta附近的地铁站。具体步行路线取决于要去哪个海滩入口。TMB海滩指南也将V15和D20列为巴塞罗内塔海滩附近的公交线路。TMB公交网络概览将V15列为Barceloneta–Vall d’Hebron；当天方向和站点请查看其实时线路页。D20两端为Passeig Marítim与Ernest Lluch，不要将其说成从Plaça de Catalunya直达。TMB公交网络概览列出V21连接Passeig Marítim与Montbau，但该静态资料无法确认圣家堂的具体上车站。不保证无台阶路线或具体步行时间。',
      cablesTitle: '两种不同的缆车服务', montCableTitle: 'Montjuïc Cable Car · 上山', montCable: '这是与缆车铁路不同、需另购票的观光缆车。线路为Parc de Montjuïc–Mirador–Castell；Castell站靠近城堡，但不是城堡入口本身。运营方2026年成人票价：单程€12（仅在缆车站售票处购买），往返原价€19；通过Hola Barcelona在线购票享10%折扣为€17.10。往返票须当天使用。在线购买后须在售票处出示凭证。11–12月每日10:00–18:00。运营方规定闭园前15分钟停止入场；若要完成全线，应提前20分钟入场。没有单独公布末班发车时刻。',
      portCableTitle: 'Port Cable Car · 横越港口', portCable: '这条线路和票价均不同于Montjuïc Cable Car。它连接巴塞罗内塔的Torre de San Sebastián与蒙特惠奇的Miramar；Torre Jaime I已关闭，不停靠。官方票价为单程€12.50、往返€20.00，可在售票处或网上购票。运营方称全年运营（12月25日除外），但未能确认11月的详细时间或末班时刻。官方资料对行程时间说法不一致，因此不写单一时长。FAQ说明San Sebastián塔有电梯和坡道，Miramar站台有台阶。如需无障碍路线，请提前向运营方确认往返和到达端的完整路径。',
      careTitle: '与父母同行时的注意事项', care: '车站出口、电梯运行、路面和坡度、过街等待、步行至缆车站的距离都会因路线和当天情况而不同。不保证无台阶或适合所有人。预留换乘时间，按具体入口查看路线；若步行负担较大，请保留休息时间。',
      routesTitle: '打开当日路线', routesNote: '在Google Maps查看公共交通路线。打开链接时请重新核对实时运营、施工和候车情况。',
      sourcesTitle: '官方来源', openRoute: '查看公共交通路线', openTmb: '查看TMB线路', guideButton: '打开交通指南', chatChip: '巴塞罗那交通与换乘', chatQuery: '巴塞罗那T-familiar换乘以及去蒙特惠奇和巴塞罗内塔的交通', chatTitle: '巴塞罗那交通指南', chatLink: '打开交通指南',
      routeLabels: { sagradaParallel: '圣家堂 → Paral·lel', catalunyaParallel: '加泰罗尼亚广场 → Paral·lel', espanyaCastell: '西班牙广场 → 蒙特惠奇城堡', catalunyaBeach: '加泰罗尼亚广场 → 巴塞罗内塔海滩', sagradaBeach: '圣家堂附近 → 巴塞罗内塔海滩' }
    }
  };

  const sectionSources = {
    fare: ['tmbTfa', 'tmbTerms', 'atm'],
    mont: ['funicular', 'bus150', 'bus150Guide', 'tmbHours', 'busMap'],
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
      ['fare', c.fareTitle, c.fare],
      ['mont', c.montTitle, c.mont],
      ['beach', c.beachTitle, c.beach],
      ['cable', c.cablesTitle, `<h3>${escapeHtml(c.montCableTitle)}</h3><p>${escapeHtml(c.montCable)}</p><h3>${escapeHtml(c.portCableTitle)}</h3><p>${escapeHtml(c.portCable)}</p>`],
      ['care', c.careTitle, c.care]
    ];
    const cards = sections.map(([key, title, body]) => {
      const bodyHtml = key === 'cable' ? body : `<p>${escapeHtml(body)}</p>`;
      return `<article class="bcn-transit-card"><h2>${escapeHtml(title)}</h2>${bodyHtml}<div class="bcn-transit-sources" aria-label="${escapeHtml(c.sourcesTitle)}">${sourceLinks(sectionSources[key], lang)}</div></article>`;
    }).join('');
    const routeHtml = routes.map(route => `<a class="bcn-transit-route" href="${routeUrl(route)}" target="_blank" rel="noopener noreferrer"><span>${escapeHtml(c.routeLabels[route.id])}</span><small>${escapeHtml(c.openRoute)} ↗</small></a>`).join('');
    const liveSources = ['v15', 'd20', 'v21', 'beachNotice'].map(id => `<a class="bcn-transit-source" href="${sourceDefs[id].url}" target="_blank" rel="noopener noreferrer">${escapeHtml(sourceDefs[id].names[lang])}</a>`).join('');
    mount.innerHTML = `<div class="bcn-transit-guide" lang="${lang}">
      <header class="bcn-transit-hero"><div class="bcn-transit-kicker">${escapeHtml(c.kicker)}</div><h1>${escapeHtml(c.title)}</h1><p>${escapeHtml(c.intro)}</p></header>
      <div class="bcn-transit-notice"><strong>${escapeHtml(c.statusTitle)}</strong><p>${escapeHtml(c.status)}</p></div>
      <div class="bcn-transit-alert"><strong>${escapeHtml(c.dateNoteTitle)}</strong><p>${escapeHtml(c.dateNote)}</p><div class="bcn-transit-sources">${sourceLinks(['tmbHours', 'portFaq'], lang)}</div></div>
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
    if (/barceloneta|바르셀로네타|バルセロネータ|巴塞罗内塔|beach|해변|海岸|海滩|platja|v15|d20|v21/.test(q)) return 'beach';
    if (/port cable|port cable car|teleférico del puerto|port cab|항구 케이블|포트 케이블|港湾缆车|港口缆车|ポート.*ケーブル/.test(q)) return 'cable';
    if (/cable car|telefèric|teleferic|케이블카|缆车|ロープウェイ|cableway/.test(q)) return 'cable';
    return 'mont';
  }

  function buildChatResponse(query, lang) {
    const q = String(query || '').toLowerCase();
    const keywords = [
      'barcelona', '바르셀로나', 'バルセロナ', '巴塞罗那', 't-familiar', 't familiar',
      'montju', '몬주익', 'モンジュイック', '蒙特惠奇', 'funicular', '푸니쿨라', '缆车铁路', '缆车',
      'barceloneta', '바르셀로네타', 'バルセロネータ', '巴塞罗内塔', 'beach', '해변', '海滩', '海岸',
      'v15', 'd20', 'v21', 'cable car', '케이블카', 'ロープウェイ', '港口缆车', 'port cable', '환승', '乗換', '换乘'
    ];
    if (!keywords.some(word => q.includes(word))) return null;
    lang = content[lang] ? lang : (content[window.currentLang] ? window.currentLang : 'ko');
    const c = content[lang];
    const key = sectionForQuery(query);
    const summary = { fare: c.fare, beach: c.beach, cable: `${c.montCable}\n\n${c.portCable}`, mont: c.mont }[key];
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
      CHATBOT_I18N[lang].chips.unshift({ text: content[lang].chatChip, q: content[lang].chatQuery });
    }
  }

  window.BARCELONA_TRANSIT_GUIDE = { content, routes, sources: sourceDefs, render };
  window.renderBarcelonaTransitGuide = render;
  window.buildBarcelonaTransitChatResponse = buildChatResponse;
  window.goToBarcelonaTransitGuide = goToGuide;
  document.addEventListener('DOMContentLoaded', () => render(window.currentLang || 'ko'));
})();
