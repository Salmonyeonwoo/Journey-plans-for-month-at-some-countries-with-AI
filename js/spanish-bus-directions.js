/* Source-checked, four-language guidance for checking bus direction and stops in Spanish cities. */
(function () {
  'use strict';

  const sources = {
    tmbPlanner: { url: 'https://www.tmb.cat/en/barcelona/journey-planner', names: { ko: 'TMB · 여정 플래너', en: 'TMB · Journey planner', ja: 'TMB · 乗換・経路検索', zh: 'TMB · 行程规划器' } },
    tmbBusGuide: { url: 'https://www.tmb.cat/en/customer-services/user-guide/how-to-travel-by-bus', names: { ko: 'TMB · 버스 이용·행선지 확인', en: 'TMB · How to travel by bus', ja: 'TMB · バスの乗り方', zh: 'TMB · 公交乘车指南' } },
    tmbMap: { url: 'https://www.tmb.cat/en/barcelona-transport/metro-bus-map', names: { ko: 'TMB · 버스·지하철 지도', en: 'TMB · Bus and metro map', ja: 'TMB · バス・地下鉄路線図', zh: 'TMB · 公交与地铁地图' } },
    tussamMap: { url: 'https://www.tussam.es/sites/default/files/2026-01/Plano2026_EN.pdf', names: { ko: 'TUSSAM · 2026 노선도', en: 'TUSSAM · 2026 network map', ja: 'TUSSAM · 2026年路線図', zh: 'TUSSAM · 2026年线路图' } },
    tussamFaq: { url: 'https://www.tussam.es/en/faqs-ingles', names: { ko: 'TUSSAM · 공식 FAQ·여정 검색', en: 'TUSSAM · Official FAQ and journey search', ja: 'TUSSAM · 公式FAQ・経路検索', zh: 'TUSSAM · 官方常见问题与路线查询' } },
    tussamApp: { url: 'https://www.tussam.es/en/descarga-app', names: { ko: 'TUSSAM · 앱·정류장 도착 정보', en: 'TUSSAM · App and stop arrivals', ja: 'TUSSAM · アプリ・停留所到着情報', zh: 'TUSSAM · 应用与站点到站信息' } },
    tussamLine1: { url: 'https://www.tussam.es/es/avisos-generales/modificacion-de-recorrido-en-sector-macarena', names: { ko: 'TUSSAM · 1번 임시 우회 공지(2026-03-02)', en: 'TUSSAM · Line 1 temporary diversion notice (2 Mar 2026)', ja: 'TUSSAM · 1番の臨時迂回告知（2026年3月2日）', zh: 'TUSSAM · 1路临时改道公告（2026年3月2日）' } },
    granadaLine4: { url: 'http://www.movilidadgranada.com/bus_linea.php?idioma=en&linea=4', names: { ko: '그라나다 시 교통센터 · 4번 노선', en: 'Granada City Mobility Center · Line 4', ja: 'グラナダ市モビリティセンター · 4番', zh: '格拉纳达城市交通中心 · 4路' } },
    granadaLines: { url: 'http://www.movilidadgranada.com/autobuses.php', names: { ko: '그라나다 시 교통센터 · 버스 노선', en: 'Granada City Mobility Center · Bus lines', ja: 'グラナダ市モビリティセンター · バス路線', zh: '格拉纳达城市交通中心 · 公交线路' } },
    aucorsaLines: { url: 'https://aucorsa.es/lineas-y-horarios/', names: { ko: 'AUCORSA · 노선·시간표', en: 'AUCORSA · Lines and schedules', ja: 'AUCORSA · 路線・時刻表', zh: 'AUCORSA · 线路与时刻表' } },
    aucorsa32: { url: 'https://aucorsa.es/linea/32/', names: { ko: 'AUCORSA · Feria 특별 32번 예시', en: 'AUCORSA · Special Feria Line 32 example', ja: 'AUCORSA · Feria臨時32番の例', zh: 'AUCORSA · Feria特别32路示例' } },
    aucorsaFair: { url: 'https://aucorsa.es/aucorsa-pone-en-marcha-un-amplio-dispositivo-especial-para-la-feria-2026-con-13-lineas-especiales-y-un-autobus-tematizado/', names: { ko: 'AUCORSA · 2026 Feria 특별 운행 기간', en: 'AUCORSA · 2026 Feria special-service dates', ja: 'AUCORSA · 2026年Feria臨時運行期間', zh: 'AUCORSA · 2026年Feria特别运营日期' } },
    aucorsaNearby: { url: 'https://aucorsa.es/aucorsa-muestra-la-parada-mas-cercana-a-tu-ubicacion/', names: { ko: 'AUCORSA · 주변 정류장·도착 정보', en: 'AUCORSA · Nearby stops and arrivals', ja: 'AUCORSA · 近くの停留所・到着情報', zh: 'AUCORSA · 附近站点与到站信息' } },
    emtMalagaLine1: { url: 'https://www.emtmalaga.es/emt-mobile/informacionLinea.html?codLinea=1.0&sentido=1', names: { ko: 'EMT Málaga · 1번 노선 정보', en: 'EMT Málaga · Line 1 information', ja: 'EMT Málaga · 1番路線情報', zh: 'EMT Málaga · 1路线信息' } },
    emtMalaga119: { url: 'https://www.emtmalaga.es/emt-mobile/informacionParada.html?codParada=119', names: { ko: 'EMT Málaga · 정류장 119', en: 'EMT Málaga · Stop 119', ja: 'EMT Málaga · 停留所119', zh: 'EMT Málaga · 119号站' } },
    emtMalaga171: { url: 'https://www.emtmalaga.es/emt-mobile/informacionParada.html?codParada=171', names: { ko: 'EMT Málaga · 정류장 171', en: 'EMT Málaga · Stop 171', ja: 'EMT Málaga · 停留所171', zh: 'EMT Málaga · 171号站' } },
    nerjaOperator: { url: 'https://www.grupoveranoazul.com/urbanos-de-nerja.php', names: { ko: 'Urbanos de Nerja · 운영사 공지', en: 'Urbanos de Nerja · Operator notices', ja: 'Urbanos de Nerja · 運営会社のお知らせ', zh: 'Urbanos de Nerja · 运营方公告' } },
    nerjaMap: { url: 'https://www.grupoveranoazul.com/imagenes/urbanodenerja2024small.pdf', names: { ko: 'Urbanos de Nerja · 노선도·시간표 PDF', en: 'Urbanos de Nerja · Route map and timetable PDF', ja: 'Urbanos de Nerja · 路線図・時刻表PDF', zh: 'Urbanos de Nerja · 线路图与时刻表PDF' } },
    emtMadrid27: { url: 'https://www.emtmadrid.es/Bloques-EMT-Contenido/EMT-BUS/Mi-linea-(1).aspx?linea=27&lang=en-GB', names: { ko: 'EMT Madrid · 27번 방향별 정류장', en: 'EMT Madrid · Line 27 by direction', ja: 'EMT Madrid · 27番の方向別停留所', zh: 'EMT Madrid · 27路分方向站点' } },
    emtMadridMyBus: { url: 'https://www.emtmadrid.es/EMTBUS/Mibus?lang=en-GB', names: { ko: 'EMT Madrid · My bus 정류장 도착 정보', en: 'EMT Madrid · My bus stop arrivals', ja: 'EMT Madrid · My bus 到着情報', zh: 'EMT Madrid · My bus站点到站信息' } }
  };

  const content = {
    ko: {
      title: '스페인 버스: 노선번호보다 방향·정류장 확인',
      lead: '스페인의 모든 도로가 일방통행이거나 모든 버스가 도시 전체를 도는 루프인 것은 아닙니다. 말레이시아 구시가지와의 비교는 참고 비유일 뿐, 같은 교통정책이나 역사적 원인을 뜻하지 않습니다.',
      rule: '탑승 전에 공식 여정 플래너·노선 정보에서 정확한 출발지와 목적지 방향을 선택하고, 정류장명·코드와 차량 전면 행선지를 대조하세요. 표지와 앱이 다르거나 헷갈리면 추측해 타지 말고 운영사 공지나 운전기사에게 확인하세요. Google Maps는 경로를 살펴보는 출발점으로 활용하고, 탑승 직전에는 해당 도시 운영사의 최신 노선·정류장·우회 정보를 함께 확인하세요. 반대편 정류장까지의 거리는 노선마다 다르며, 택시 우회만으로 정당한 우회인지 사기인지 단정할 수 없습니다.',
      chatChip: '스페인 버스 방향·정류장 확인',
      chatQuery: '스페인 버스 방향과 도시별 정류장 확인 방법',
      chatTitle: '스페인 버스 방향·정류장 안내',
      chatLink: '교통 안내 페이지 열기',
      cities: [
        { id: 'barcelona', name: '바르셀로나', aliases: ['barcelona', '바르셀로나', 'バルセロナ', '巴塞罗那'], text: 'TMB 지도는 노선 방향과 기종점을 표시하지만, 확인한 자료만으로 특정 노선의 반대 방향 정류장 쌍을 입증하지 못했습니다. TMB 여정 플래너와 차량 앞 행선지를 확인하세요. H6·V13은 짧은 종점 운행 변형 안내 사례이지, 양방향 정류장 차이를 증명하는 사례는 아닙니다.', sources: ['tmbPlanner', 'tmbBusGuide', 'tmbMap'] },
        { id: 'sevilla', name: '세비야', aliases: ['seville', 'sevilla', '세비야', 'セビリア', '塞维利亚'], text: 'TUSSAM 노선도·여정 검색·앱에서 방향과 정류장 정보를 확인하세요. 2026년 3월 2일 1번 노선 공사 우회 공지는 방향별 경로 차이를 보여 주지만 임시 사례입니다. 현재 운행 여부를 다시 확인하고 다른 노선의 일반 규칙으로 확대하지 마세요.', sources: ['tussamMap', 'tussamFaq', 'tussamApp', 'tussamLine1'] },
        { id: 'granada', name: '그라나다', aliases: ['granada', '그라나다', 'グラナダ', '格拉纳达'], text: '시 교통센터의 4번 노선 페이지는 Zaidín→Chana와 반대 방향을 별도 정류장 목록으로 제시합니다. 예시로 Gran Vía 4–Catedral(1512)과 Gran Vía 7–Catedral(1506)이 각각 다른 방향에 나옵니다. 페이지에 마지막 갱신일(2024-11-27)이 표시되어 있으므로 최신 공지를 확인하세요.', sources: ['granadaLine4', 'granadaLines'] },
        { id: 'cordoba', name: '코르도바', aliases: ['cordoba', 'córdoba', '코르도바', 'コルドバ', '科尔多瓦'], text: 'AUCORSA의 Feria 특별 32번은 2026년 5월 22–30일 한시 운행으로, ida/vuelta의 정류장 목록을 다르게 표시했습니다. 이미 종료된 계절 특별노선 사례이므로 정규 노선에 일반화하지 마세요. 실제 이용은 최신 노선·시간표와 주변 정류장 지도로 확인하세요.', sources: ['aucorsaLines', 'aucorsaNearby', 'aucorsa32', 'aucorsaFair'] },
        { id: 'malaga', name: '말라가', aliases: ['malaga', 'málaga', '말라가', 'マラガ', '马拉加'], text: 'EMT 1번의 Alameda Principal 구간에서 San Andrés행은 정류장 119(Alameda Principal–Norte), Parque del Sur행은 171(Alameda Principal–Sur)로 표시됩니다. 이 노선·구간의 방향별 사례이며, 두 정류장 사이 거리를 뜻하지는 않습니다.', sources: ['emtMalagaLine1', 'emtMalaga119', 'emtMalaga171'] },
        { id: 'nerja', name: '네르하', aliases: ['nerja', '네르하', 'ネルハ', '内尔哈'], text: 'Urbanos de Nerja 운영사는 L1·L2·L3 노선 정보를 제공하지만, 검토한 자료에서 특정 노선의 양방향 정류장 차이는 확인하지 못했습니다. 운영사 페이지에는 정류장 16·17 운휴 공지가 표시되어 있으므로 방문 전 현재 공지를 확인하세요.', sources: ['nerjaOperator', 'nerjaMap'] },
        { id: 'madrid', name: '마드리드', aliases: ['madrid', '마드리드', 'マドリード', '马德里'], text: 'EMT 27번은 Embajadores–Plaza Castilla와 반대 방향을 따로 제시하고 정류장 순서도 다릅니다. 목적지에 맞는 방향을 고른 뒤 탑승 정류장이 그 방향 목록에 있는지 확인하세요. 이 사례만으로 모든 노선이나 정류장 간 거리를 일반화할 수 없습니다.', sources: ['emtMadrid27', 'emtMadridMyBus'] }
      ]
    },
    en: {
      title: 'Spanish buses: check direction and stop, not just the route number',
      lead: 'Not every Spanish street is one-way, and not every bus makes a city-wide loop. The comparison with old-town areas in Malaysia is only a loose travel analogy; it does not establish the same traffic policy or historical cause.',
      rule: 'Before boarding, use the official journey planner or route information for your exact origin and destination direction, then match the stop name or code with the bus destination sign. If the app and stop sign disagree, do not guess: check the operator notice or ask the driver. Google Maps can be a useful starting point, but cross-check the operator’s current route, stop and diversion information before boarding. Opposite-direction stops vary by route; a taxi detour alone does not prove either a legitimate route or a scam.',
      chatChip: 'Check Spanish bus direction and stops',
      chatQuery: 'How to check bus direction and stops in Spanish cities',
      chatTitle: 'Spanish bus direction and stop guide',
      chatLink: 'Open the transit guide',
      cities: [
        { id: 'barcelona', name: 'Barcelona', aliases: ['barcelona', '바르셀로나', 'バルセロナ', '巴塞罗那'], text: 'TMB’s map marks route directions and termini, but the reviewed materials did not verify a named pair of opposite-direction stops. Use TMB’s Journey Planner and check the front destination sign. H6 and V13 are examples of shorter destination variants, not proof of opposite-direction stop differences.', sources: ['tmbPlanner', 'tmbBusGuide', 'tmbMap'] },
        { id: 'sevilla', name: 'Seville', aliases: ['seville', 'sevilla', '세비야', 'セビリア', '塞维利亚'], text: 'Use TUSSAM’s network map, journey search and app to check direction and stops. A 2 March 2026 works-diversion notice for Line 1 showed direction-specific paths, but that is a temporary example. Recheck whether any notice is still in force; do not generalize it to other lines.', sources: ['tussamMap', 'tussamFaq', 'tussamApp', 'tussamLine1'] },
        { id: 'granada', name: 'Granada', aliases: ['granada', '그라나다', 'グラナダ', '格拉纳达'], text: 'The City Mobility Center’s Line 4 page lists Zaidín→Chana and the reverse direction separately, with different stop lists. For example, Gran Vía 4–Catedral (1512) and Gran Vía 7–Catedral (1506) appear in opposite-direction lists. The page shows a last-update date of 27 Nov 2024, so check current notices.', sources: ['granadaLine4', 'granadaLines'] },
        { id: 'cordoba', name: 'Córdoba', aliases: ['cordoba', 'córdoba', '코르도바', 'コルドバ', '科尔多瓦'], text: 'AUCORSA’s special Feria Line 32 listed different stops for ida and vuelta during 22–30 May 2026. This seasonal special service has ended; do not treat it as a regular-line rule. Check the current line and timetable and use the nearby-stop map for an actual trip.', sources: ['aucorsaLines', 'aucorsaNearby', 'aucorsa32', 'aucorsaFair'] },
        { id: 'malaga', name: 'Málaga', aliases: ['malaga', 'málaga', '말라가', 'マラガ', '马拉加'], text: 'On EMT Line 1 at Alameda Principal, stop 119 (Alameda Principal–Norte) is listed toward San Andrés, while stop 171 (Alameda Principal–Sur) is listed toward Parque del Sur. This is a route- and corridor-specific example; it does not establish the distance between stops.', sources: ['emtMalagaLine1', 'emtMalaga119', 'emtMalaga171'] },
        { id: 'nerja', name: 'Nerja', aliases: ['nerja', '네르하', 'ネルハ', '内尔哈'], text: 'Urbanos de Nerja publishes L1, L2 and L3 service information, but the reviewed material did not verify a named opposite-direction stop pair. The operator page displays a notice suspending stops 16 and 17; check the current notice before travelling.', sources: ['nerjaOperator', 'nerjaMap'] },
        { id: 'madrid', name: 'Madrid', aliases: ['madrid', '마드리드', 'マドリード', '马德里'], text: 'EMT Line 27 lists Embajadores–Plaza Castilla and the reverse direction separately, with a different stop sequence. Choose the direction matching your destination and confirm your boarding stop appears in that list. Do not generalize this example to every route or infer a stop-to-stop distance.', sources: ['emtMadrid27', 'emtMadridMyBus'] }
      ]
    },
    ja: {
      title: 'スペインのバス：系統番号だけでなく方向・停留所を確認',
      lead: 'スペインのすべての道路が一方通行というわけでも、すべてのバスが市内を一周するわけでもありません。マレーシアの旧市街との比較は旅行上の大まかな例えであり、同じ交通政策や歴史的原因を示すものではありません。',
      rule: '乗車前に公式経路検索で出発地と目的地に合う方向を選び、停留所名・番号と車両前面の行先表示を照合してください。アプリと停留所表示が異なる場合は推測で乗らず、運行会社のお知らせや運転手に確認しましょう。Google Mapsは経路確認の出発点として使えますが、乗車直前に運行会社の最新路線・停留所・迂回情報も確認してください。反対方向の停留所までの距離は路線ごとに異なり、タクシーの迂回だけで正当な経路か詐欺かを断定できません。',
      chatChip: 'スペインのバス方向・停留所を確認',
      chatQuery: 'スペイン各都市でバスの方向と停留所を確認する方法',
      chatTitle: 'スペインのバス方向・停留所ガイド',
      chatLink: '交通ガイドを開く',
      cities: [
        { id: 'barcelona', name: 'バルセロナ', aliases: ['barcelona', '바르셀로나', 'バルセロナ', '巴塞罗那'], text: 'TMBの路線図には方向と起終点が示されていますが、確認した公式資料では特定路線の反対方向の停留所ペアを確認できませんでした。TMBの経路検索と車両前面の行先表示を確認してください。H6・V13は短縮運行の例であり、反対方向の停留所が異なる証拠ではありません。', sources: ['tmbPlanner', 'tmbBusGuide', 'tmbMap'] },
        { id: 'sevilla', name: 'セビリア', aliases: ['seville', 'sevilla', '세비야', 'セビリア', '塞维利亚'], text: 'TUSSAMの路線図・経路検索・アプリで方向と停留所を確認してください。2026年3月2日の1番工事迂回案内には方向別の経路が示されていますが、臨時の例です。現在も有効か再確認し、他の路線へ一般化しないでください。', sources: ['tussamMap', 'tussamFaq', 'tussamApp', 'tussamLine1'] },
        { id: 'granada', name: 'グラナダ', aliases: ['granada', '그라나다', 'グラナダ', '格拉纳达'], text: '市のモビリティセンターの4番ページでは、Zaidín→Chanaと逆方向を別々の停留所一覧で表示します。例としてGran Vía 4–Catedral（1512）とGran Vía 7–Catedral（1506）がそれぞれ反対方向の一覧にあります。ページの最終更新日は2024年11月27日と表示されるため、最新のお知らせも確認してください。', sources: ['granadaLine4', 'granadaLines'] },
        { id: 'cordoba', name: 'コルドバ', aliases: ['cordoba', 'córdoba', '코르도바', 'コルドバ', '科尔多瓦'], text: 'AUCORSAのFeria臨時32番は2026年5月22～30日の期間、idaとvueltaで異なる停留所を掲載しました。季節限定の臨時運行はすでに終了しており、通常路線の規則として扱わないでください。実際の利用時は最新の路線・時刻表と近くの停留所情報を確認してください。', sources: ['aucorsaLines', 'aucorsaNearby', 'aucorsa32', 'aucorsaFair'] },
        { id: 'malaga', name: 'マラガ', aliases: ['malaga', 'málaga', '말라가', 'マラガ', '马拉加'], text: 'EMT 1番のAlameda Principalでは、San Andrés方面が停留所119（Alameda Principal–Norte）、Parque del Sur方面が171（Alameda Principal–Sur）と表示されます。この路線・区間に限った例で、停留所間の距離を示すものではありません。', sources: ['emtMalagaLine1', 'emtMalaga119', 'emtMalaga171'] },
        { id: 'nerja', name: 'ネルハ', aliases: ['nerja', '네르하', 'ネルハ', '内尔哈'], text: 'Urbanos de NerjaはL1・L2・L3の情報を掲載していますが、確認した資料では特定路線の反対方向の停留所ペアを確認できませんでした。運営会社のページには停留所16・17の運休案内が表示されているため、出発前に最新情報を確認してください。', sources: ['nerjaOperator', 'nerjaMap'] },
        { id: 'madrid', name: 'マドリード', aliases: ['madrid', '마드리드', 'マドリード', '马德里'], text: 'EMT 27番はEmbajadores–Plaza Castillaと逆方向を別々に掲載し、停留所の順序も異なります。目的地に合う方向を選び、乗車停留所がその一覧にあるか確認してください。この例をすべての路線に一般化したり、停留所間の距離を推測したりしないでください。', sources: ['emtMadrid27', 'emtMadridMyBus'] }
      ]
    },
    zh: {
      title: '西班牙公交：确认方向和站点，不要只看线路号',
      lead: '西班牙并非所有道路都是单行道，也不是每条公交线路都会绕城市一圈。与马来西亚老城区的比较只是旅行中的粗略类比，不能说明交通政策或历史成因相同。',
      rule: '上车前，请在官方路线规划或线路信息中按准确的起点、目的地选择方向，并核对站名/站号与车辆前方显示的终点。若应用和站牌信息不一致，不要猜测上车；请查看运营方公告或询问司机。Google地图可作为规划起点，但上车前还应核对运营方最新线路、站点和改道信息。反方向站点距离因线路而异，不能仅凭出租车绕行就判断是合理路线还是诈骗。',
      chatChip: '确认西班牙公交方向与站点',
      chatQuery: '如何确认西班牙各城市公交方向和站点',
      chatTitle: '西班牙公交方向与站点指南',
      chatLink: '打开交通指南',
      cities: [
        { id: 'barcelona', name: '巴塞罗那', aliases: ['barcelona', '바르셀로나', 'バルセロナ', '巴塞罗那'], text: 'TMB线路图标出线路方向和起终点，但已核查的资料未能证明某条线路存在特定的反方向站点组合。请使用TMB行程规划器，并核对车辆前方显示的终点。H6和V13是短线终点变体的例子，并不能证明反方向站点不同。', sources: ['tmbPlanner', 'tmbBusGuide', 'tmbMap'] },
        { id: 'sevilla', name: '塞维利亚', aliases: ['seville', 'sevilla', '세비야', 'セビリア', '塞维利亚'], text: '请用TUSSAM线路图、路线查询和应用确认方向与站点。2026年3月2日的1路线施工改道公告列出了方向不同的路径，但这只是临时案例。请重新确认公告是否仍有效，不要推广到其他线路。', sources: ['tussamMap', 'tussamFaq', 'tussamApp', 'tussamLine1'] },
        { id: 'granada', name: '格拉纳达', aliases: ['granada', '그라나다', 'グラナダ', '格拉纳达'], text: '市交通中心4路线页面将Zaidín→Chana和反方向分开列出，并提供不同站点清单。例如Gran Vía 4–Catedral（1512）和Gran Vía 7–Catedral（1506）分别出现在不同方向列表中。页面标注的最后更新日期是2024年11月27日，请再查看最新公告。', sources: ['granadaLine4', 'granadaLines'] },
        { id: 'cordoba', name: '科尔多瓦', aliases: ['cordoba', 'córdoba', '코르도바', 'コルドバ', '科尔多瓦'], text: 'AUCORSA Feria特别32路在2026年5月22日至30日的临时服务中，分别列出不同的去程和返程站点。这项季节性特别服务已结束，不应当作常规线路规则。实际出行请查看当前线路、时刻表和附近站点地图。', sources: ['aucorsaLines', 'aucorsaNearby', 'aucorsa32', 'aucorsaFair'] },
        { id: 'malaga', name: '马拉加', aliases: ['malaga', 'málaga', '말라가', 'マラガ', '马拉加'], text: '在EMT 1路的Alameda Principal路段，开往San Andrés方向列出119号站（Alameda Principal–Norte），开往Parque del Sur方向列出171号站（Alameda Principal–Sur）。这只适用于该线路和路段，并不能说明两个站相距多远。', sources: ['emtMalagaLine1', 'emtMalaga119', 'emtMalaga171'] },
        { id: 'nerja', name: '内尔哈', aliases: ['nerja', '네르하', 'ネルハ', '内尔哈'], text: 'Urbanos de Nerja运营方发布L1、L2和L3的信息，但已核查资料未能确认某条线路的特定反方向站点组合。运营方页面显示16号和17号站暂停服务的公告，出行前请查看当前通知。', sources: ['nerjaOperator', 'nerjaMap'] },
        { id: 'madrid', name: '马德里', aliases: ['madrid', '마드리드', 'マドリード', '马德里'], text: 'EMT 27路分别列出Embajadores–Plaza Castilla及反方向，站点顺序也不同。请按目的地选择方向，并确认上车站出现在该方向的列表中。不要把这个案例推广到所有线路，也不要据此推断站点间距离。', sources: ['emtMadrid27', 'emtMadridMyBus'] }
      ]
    }
  };

  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));
  }

  function sourceLinks(ids, lang) {
    return ids.map(id => {
      const item = sources[id];
      return `<a class="bcn-transit-source" href="${escapeHtml(item.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(item.names[lang])}</a>`;
    }).join('');
  }

  function render(lang) {
    lang = content[lang] ? lang : 'ko';
    const guide = document.querySelector('#barcelona-transit-guide-mount .bcn-transit-guide');
    if (!guide) return;
    const c = content[lang];
    const previous = guide.querySelector('#spanish-bus-directions');
    if (previous) previous.remove();
    const rows = c.cities.map(city => `<article class="bcn-transit-route"><span>${escapeHtml(city.name)}</span><p>${escapeHtml(city.text)}</p><div class="bcn-transit-sources">${sourceLinks(city.sources, lang)}</div></article>`).join('');
    const section = `<section class="bcn-transit-route-section" id="spanish-bus-directions"><h2>${escapeHtml(c.title)}</h2><p>${escapeHtml(c.lead)}</p><div class="bcn-transit-notice"><strong>${escapeHtml(c.chatTitle)}</strong><p>${escapeHtml(c.rule)}</p></div><div class="bcn-transit-route-grid">${rows}</div></section>`;
    const currentGrid = guide.querySelector('.bcn-transit-grid');
    if (currentGrid) currentGrid.insertAdjacentHTML('beforebegin', section);
    else guide.insertAdjacentHTML('beforeend', section);
  }

  function matchesTransitIntent(query) {
    const q = String(query || '').toLowerCase();
    return /\b(?:bus|buses|autobus|autobús|transit|transport|route|direction|stop|one[-\s]?way|street|taxi|uber)\b|버스|대중교통|교통|노선|정류장|방향|일방통행|우회|택시|우버|バス|交通|路線|停留所|方向|一方通行|迂回|タクシー|公交|巴士|公共交通|线路|站点|方向|单行|改道|出租车|打车/.test(q);
  }

  function buildChatResponse(query, lang) {
    const q = String(query || '').toLowerCase();
    if (!matchesTransitIntent(q)) return null;
    lang = content[lang] ? lang : (content[window.currentLang] ? window.currentLang : 'ko');
    const c = content[lang];
    const matched = c.cities.filter(city => city.aliases.some(alias => q.includes(alias.toLowerCase())));
    const rows = matched.length ? matched : c.cities;
    const allSources = [...new Set(rows.flatMap(city => city.sources))];
    const body = [c.lead, c.rule, ...rows.map(city => `${city.name}: ${city.text}`)].map(text => `<p>${escapeHtml(text)}</p>`).join('');
    return `<div class="bcn-transit-chat-answer"><strong>${escapeHtml(c.chatTitle)}</strong>${body}<div class="bcn-transit-sources">${sourceLinks(allSources, lang)}</div><button type="button" class="chat-quick-chip" onclick="goToBarcelonaTransitGuide()">${escapeHtml(c.chatLink)}</button></div>`;
  }

  for (const lang of Object.keys(content)) {
    if (typeof CHATBOT_I18N !== 'undefined' && CHATBOT_I18N[lang] && Array.isArray(CHATBOT_I18N[lang].chips)) {
      const chip = { text: content[lang].chatChip, q: content[lang].chatQuery };
      if (!CHATBOT_I18N[lang].chips.some(item => item.q === chip.q)) CHATBOT_I18N[lang].chips.unshift(chip);
    }
  }

  const originalRender = window.renderBarcelonaTransitGuide;
  if (typeof originalRender === 'function') {
    window.renderBarcelonaTransitGuide = function (lang) {
      originalRender(lang);
      render(lang || window.currentLang || 'ko');
    };
  }
  window.renderSpanishBusDirections = render;
  window.buildSpainBusDirectionsChatResponse = buildChatResponse;
  window.SPANISH_BUS_DIRECTIONS = { content, sources, render };
  document.addEventListener('DOMContentLoaded', () => render(window.currentLang || 'ko'));
})();
