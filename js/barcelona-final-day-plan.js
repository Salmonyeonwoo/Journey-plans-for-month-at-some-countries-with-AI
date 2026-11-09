/* Barcelona final-day route proposal (9–10 Nov 2026).
 * Supplemental only: keeps every confirmed itinerary item and booking unchanged.
 */
(function () {
  'use strict';

  const guide = window.BARCELONA_LOCAL_GUIDE;
  if (!guide || !guide.content || !guide.sources) return;

  const sources = {
    santPauHours: {
      url: 'https://santpaubarcelona.org/en/visita/visita-lliure/',
      names: { ko: '산트 파우 공식 자유 관람·11월 운영시간', en: 'Sant Pau official self-guided visit & November hours', ja: 'サン・パウ公式自由見学・11月の営業時間', zh: '圣保罗官方自助参观与11月开放时间' }
    },
    santPauPrep: {
      url: 'https://santpaubarcelona.org/en/prepara-la-teva-visita/',
      names: { ko: '산트 파우 공식 방문 준비·접근 안내', en: 'Sant Pau official visit planning & access', ja: 'サン・パウ公式訪問準備・アクセス', zh: '圣保罗官方参观准备与通行信息' }
    },
    gaudiAvenue: {
      url: 'https://ajuntament.barcelona.cat/eixample/ca/el-districte-i-els-seus-barris/la-sagrada-familia/historia-de-la-sagrada-familia',
      names: { ko: '바르셀로나 시청 · 가우디 거리와 두 건축물', en: 'Barcelona City Council · Gaudí Avenue and the two landmarks', ja: 'バルセロナ市 · ガウディ通りと二つの建築物', zh: '巴塞罗那市政府 · 高迪大道与两处建筑' }
    },
    sagradaHours: {
      url: 'https://sagradafamilia.org/en/schedules-how-to-get',
      names: { ko: '사그라다 파밀리아 공식 운영시간·교통', en: 'Sagrada Família official hours & directions', ja: 'サグラダ・ファミリア公式営業時間・アクセス', zh: '圣家堂官方开放时间与交通' }
    },
    sagradaFaq: {
      url: 'https://sagradafamilia.org/en/faqs',
      names: { ko: '사그라다 파밀리아 공식 입장·접근 FAQ', en: 'Sagrada Família official entry & access FAQs', ja: 'サグラダ・ファミリア公式入場・アクセスFAQ', zh: '圣家堂官方入场与通行常见问题' }
    },
    elGlopGaudi: {
      url: 'https://elglop.com/en/el-glop-gaudi/',
      names: { ko: 'El Glop Gaudí 공식 지점·운영시간', en: 'El Glop Gaudí official branch & hours', ja: 'El Glop Gaudí公式店舗・営業時間', zh: 'El Glop Gaudí官方门店与营业时间' }
    },
    santaCaterina: {
      url: 'https://www.barcelona.cat/en/conocebcn/pics/mercat-de-santa-caterina-92086009448',
      names: { ko: '바르셀로나 시청 · 산타 카테리나 시장 시간·주소', en: 'Barcelona City Council · Santa Caterina hours & address', ja: 'バルセロナ市 · サンタ・カテリーナ市場の時間・住所', zh: '巴塞罗那市政府 · 圣卡特琳娜市场时间与地址' }
    },
    portVell: {
      url: 'https://www.portdebarcelona.cat/en/port-vell/public-space',
      names: { ko: '바르셀로나 항만청 · Port Vell 공공 공간', en: 'Port of Barcelona · Port Vell public space', ja: 'バルセロナ港湾局 · Port Vell公共空間', zh: '巴塞罗那港务局 · Port Vell公共空间' }
    },
    arenasViewpoint: {
      url: 'https://turismo.arenasdebarcelona.com/landing-arenas-en.html',
      names: { ko: 'Arenas 운영처 · 전망대 소개(당일 개방시간 미확인)', en: 'Arenas operator · viewpoint page (date-specific hours unverified)', ja: 'Arenas運営者・展望台案内（当日の営業時間未確認）', zh: 'Arenas运营方 · 观景台介绍（当日开放时间未确认）' }
    },
    arenasHours: {
      url: 'https://www.arenasdebarcelona.com/EN/horarios',
      names: { ko: 'Arenas 운영처 · 시간표(전망대 운영은 확인 불가)', en: 'Arenas operator · hours page (viewpoint schedule not established)', ja: 'Arenas運営者・営業時間（展望台の時間は未確認）', zh: 'Arenas运营方 · 时间表（未确认观景台时间）' }
    },
    placaReial: {
      url: 'https://meet.barcelona.cat/en/discover-barcelona/districts/ciutat-vella/placa-reial',
      names: { ko: '바르셀로나 시 관광 안내 · Plaça Reial', en: 'Barcelona city visitor guide · Plaça Reial', ja: 'バルセロナ市観光案内・Plaça Reial', zh: '巴塞罗那市旅游指南 · Plaça Reial' }
    },
    tmbPlanner: {
      url: 'https://www.tmb.cat/en/barcelona/journey-planner',
      names: { ko: 'TMB 공식 대중교통 경로 검색', en: 'TMB official public-transport journey planner', ja: 'TMB公式公共交通ルート検索', zh: 'TMB官方公共交通路线规划' }
    }
  };
  Object.assign(guide.sources, sources);

  const routeMaps = {
    hotelSantPau: 'https://www.google.com/maps/dir/?api=1&origin=Suites+Marina+Abapart,+Carrer+de+la+Marina,+306,+08025+Barcelona&destination=Recinte+Modernista+de+Sant+Pau,+Carrer+de+Sant+Antoni+Maria+Claret,+167,+08025+Barcelona&travelmode=walking',
    santPauSagrada: 'https://www.google.com/maps/dir/?api=1&origin=Recinte+Modernista+de+Sant+Pau,+Barcelona&destination=Sagrada+Familia,+Barcelona&travelmode=walking',
    santaCaterinaSagrada: 'https://www.google.com/maps/dir/?api=1&origin=Mercat+de+Santa+Caterina,+Barcelona&destination=Sagrada+Familia,+Barcelona&travelmode=walking',
    ramblaSagrada: 'https://www.google.com/maps/dir/?api=1&origin=Rambla+de+Mar,+Barcelona&destination=Sagrada+Familia,+Barcelona&travelmode=walking',
    placaReial: 'https://www.google.com/maps/search/?api=1&query=Pla%C3%A7a+Reial,+Barcelona',
    elGlop: 'https://www.google.com/maps/search/?api=1&query=El+Glop+Gaud%C3%AD,+Barcelona'
  };
  const mapLinks = {
    ko: [
      { label: '숙소 → 산트 파우 도보 지도', url: routeMaps.hotelSantPau },
      { label: '산트 파우 → 사그라다 · 가우디 거리 도보 지도', url: routeMaps.santPauSagrada },
      { label: 'El Glop Gaudí 지도', url: routeMaps.elGlop },
      { label: '산타 카테리나 → 사그라다 도보 비교', url: routeMaps.santaCaterinaSagrada },
      { label: 'Rambla de Mar → 사그라다 도보 비교', url: routeMaps.ramblaSagrada },
      { label: 'Plaça Reial 지도', url: routeMaps.placaReial }
    ],
    en: [
      { label: 'Hotel → Sant Pau walking map', url: routeMaps.hotelSantPau },
      { label: 'Sant Pau → Sagrada via Gaudí Avenue', url: routeMaps.santPauSagrada },
      { label: 'El Glop Gaudí map', url: routeMaps.elGlop },
      { label: 'Santa Caterina → Sagrada walking comparison', url: routeMaps.santaCaterinaSagrada },
      { label: 'Rambla de Mar → Sagrada walking comparison', url: routeMaps.ramblaSagrada },
      { label: 'Plaça Reial map', url: routeMaps.placaReial }
    ],
    ja: [
      { label: '宿泊先 → サン・パウ徒歩地図', url: routeMaps.hotelSantPau },
      { label: 'サン・パウ → ガウディ通り → サグラダ徒歩地図', url: routeMaps.santPauSagrada },
      { label: 'El Glop Gaudí 地図', url: routeMaps.elGlop },
      { label: 'サンタ・カテリーナ → サグラダ徒歩比較', url: routeMaps.santaCaterinaSagrada },
      { label: 'Rambla de Mar → サグラダ徒歩比較', url: routeMaps.ramblaSagrada },
      { label: 'Plaça Reial 地図', url: routeMaps.placaReial }
    ],
    zh: [
      { label: '住宿 → 圣保罗步行地图', url: routeMaps.hotelSantPau },
      { label: '圣保罗 → 高迪大道 → 圣家堂步行地图', url: routeMaps.santPauSagrada },
      { label: 'El Glop Gaudí地图', url: routeMaps.elGlop },
      { label: '圣卡特琳娜市场 → 圣家堂步行对比', url: routeMaps.santaCaterinaSagrada },
      { label: 'Rambla de Mar → 圣家堂步行对比', url: routeMaps.ramblaSagrada },
      { label: 'Plaça Reial地图', url: routeMaps.placaReial }
    ]
  };

  const copy = {
    ko: {
      title: '바르셀로나 11/9–11/10 · 마지막 동선 제안',
      paragraphs: [
        '오늘(11/9) 보케리아 방문은 오늘 일정으로 유지하고 11/10에는 넣지 않습니다. 오늘 밤에는 Arenas 전망대와 Plaça Reial을 한 코스로 묶지 않는 편이 낫습니다. 보케리아·람블라스 쪽에 계속 계신다면, 람블라에서 가까운 Plaça Reial 한 곳만 짧게 고려하세요. 시 관광 안내는 광장이 람블라에서 내려갈 때 왼편이며 Liceu 가까이에 있다고 설명하지만, 당일 주변 업소 영업시간은 별도 확인이 필요합니다. Arenas의 운영처 페이지에서는 공개 전망대의 오늘 개방시간이나 전망대 접근 경로를 확인하지 못해 야경 관람을 확정 코스로 권하지 않습니다.',
        '내일(11/10) 오전에는 산트 파우 모더니스타 단지를 먼저 보는 안을 추천합니다. 10:00–11:30은 관람과 쉬는 시간을 포함한 제안 블록입니다. 공식 자유 관람은 45–60분이며 11–3월 게시 운영시간은 09:30–17:00, 마지막 입장은 16:30입니다.',
        '이후 사그라다 파밀리아까지는 두 건축물을 잇는 가우디 거리(Avinguda de Gaudí)를 걷는 경로가 가장 직선적입니다. Google 지도 도보 추정은 약 950m·12분이고 TMB의 도보 선택지는 14분으로 표시됩니다. TMB는 11/9 06:39 조회에서 산트 파우 | Dos de Maig–사그라다 파밀리아역(L5) 구간에 “도보+L5+도보” 경로를 8분으로 제시했고 도보 구간은 5분과 3분으로 표시했습니다. 이는 당시 실시간 경로 결과이지 11/10의 대기·운행 보장은 아니므로 출발 직전 다시 확인하세요. 지도·대중교통 시간은 추정치이며 평탄성·보행 연속성·접근성을 보장하지 않습니다. 걷기가 부담되면 택시도 고려하세요.',
        '12:30–14:30은 사그라다 주변에서 점심과 휴식을 두는 제안입니다. El Glop Gaudí는 공식 지점 페이지가 성당에서 몇 미터 거리라고 설명하고 화–금 포함 평일 08:30–23:30 운영으로 게시하므로 후보가 될 수 있습니다. 다만 공식 페이지에서 정확한 주소·당일 메뉴·좌석은 확인되지 않았으니 방문 전 확인하세요. 예약된 식당은 아닙니다.',
        '14:45–15:15에는 입구 근처에 여유 있게 도착하는 버퍼를 두고, 15:30 내부 입장은 기존 확정 일정 그대로 유지합니다. 공식 FAQ는 티켓이 선택한 시각에만 유효하고 늦으면 입장할 수 없다고 안내하며 공식 사진 신분증을 요구합니다. 11–2월 일반 운영시간은 월–토 09:00–18:00입니다. 관람 후에는 체력에 따라 짧은 근거리 산책 또는 택시 귀환만 두고, 먼 명소를 추가하지 않는 편이 좋습니다.',
        '대안 비교: 산타 카테리나 시장은 화요일 07:30–20:30으로 시청에 게시되어 있지만 사그라다까지 지도상 도보 약 2.4km·35분이며, 오늘 보케리아를 다녀온 뒤 시장을 한 번 더 넣게 됩니다. Rambla de Mar는 사그라다까지 약 4.0km·56분 도보 추정으로 별도 항만 우회가 됩니다. 둘 다 이번 오전 추천에서는 제외했습니다. 꼭 원하면 둘 중 하나만 고르고 대중교통·택시 경로를 당일 확인하세요.'
      ],
      note: '15:30 사그라다 입장만 확정이고 나머지 시간은 제안입니다. 지도 시간은 바뀔 수 있으며 평탄·무단차·안전 보장이 아닙니다. 거리별 경사·계단·벤치·화장실을 모두 확인한 것은 아니므로 부모님 컨디션에 맞춰 걷기·대중교통·택시 중 선택하세요. 전망대·식당은 방문 당일 운영을 다시 확인하세요.',
      chatChip: '11월 10일 마지막 날 동선',
      chatQuery: '바르셀로나 11월 10일 마지막 날 일정 산트 파우 사그라다',
      chatTitle: '11월 10일 추천 동선',
      chatBody: '보케리아는 11/9 방문으로 두고 11/10에는 제외합니다. 오전 산트 파우 후 가우디 거리를 따라 사그라다 쪽으로 가는 안이 가장 직선적입니다. Google 지도 도보 추정은 약 950m·12분, TMB 도보 선택지는 14분입니다. TMB의 11/9 06:39 결과에는 “도보+L5+도보” 8분 경로(도보 구간 5분·3분)가 표시됐지만 11/10에도 같다는 보장은 없어 출발 직전 다시 확인하세요. 점심·휴식은 사그라다 주변에 두고 15:30 입장은 그대로 유지하세요. 산타 카테리나와 Rambla de Mar는 이번 오전안에서 제외했습니다.',
      chatLink: '11월 9–10일 제안과 출처 보기',
      nightChip: '오늘 밤 Plaça Reial·Arenas 검토',
      nightQuery: '바르셀로나 11월 9일 오늘 밤 Arenas Plaça Reial 야경',
      nightTitle: '오늘(11/9) 저녁 선택',
      nightBody: '오늘 보케리아 방문은 유지합니다. 두 야경지를 묶지 마세요. 보케리아·람블라스 쪽에서 일정을 마친다면 Plaça Reial 한 곳만 고려하는 편이 동선상 간단합니다. 시 관광 안내는 광장이 람블라·Liceu 인근이라고 설명하지만 오늘 주변 업소 운영시간은 확인되지 않았습니다. Arenas의 공식 페이지에서는 공개 전망대의 오늘 운영시간·접근 경로를 확인하지 못했으므로 야경 전망을 전제로 하지 마세요.',
      nightLink: '오늘 밤 제안과 출처 보기'
    },
    en: {
      title: 'Barcelona, 9–10 Nov · proposed final routes',
      paragraphs: [
        'Keep the confirmed Boqueria visit on 9 Nov; do not repeat it on 10 Nov. Do not bundle Arenas viewpoint and Plaça Reial into one night route. If you are already around Boqueria/La Rambla, Plaça Reial alone is the simpler nearby option: the city guide places it just off La Rambla and near Liceu. Check any specific venue’s hours on the day. Arenas’ public operator pages reviewed here do not establish tonight’s public-viewpoint hours or access route, so do not plan on a guaranteed rooftop view.',
        'For Tue 10 Nov morning, start with Recinte Modernista de Sant Pau. The suggested 10:00–11:30 block allows for the self-guided visit and breaks. The operator says the visit takes 45–60 minutes; its published Nov–Mar hours are 09:30–17:00, last access 16:30.',
        'Continue toward Sagrada Família along Avinguda de Gaudí, the direct connection between the landmarks described by Barcelona City Council. Google Maps estimates about 950 m / 12 minutes on foot; TMB’s walking option showed 14 minutes. At 06:39 on 9 Nov, TMB also displayed a Walk + L5 + Walk route from Sant Pau | Dos de Maig to Sagrada Família station (523), with 8 minutes shown and 5- and 3-minute walking legs. This was a live result, not a promise for 10 Nov; recheck shortly before leaving. Map and transit times are estimates and do not guarantee a flat, uninterrupted or accessible route. Consider a taxi if walking is tiring.',
        'Use 12:30–14:30 as a flexible lunch-and-rest window near Sagrada Família. El Glop Gaudí is an option: its official page says it is metres from the Basilica and lists weekday hours of 08:30–23:30, including Tuesday. The page does not confirm an exact street address, that day’s menu or table availability; verify before going. It is not booked.',
        'Keep a suggested buffer near the entrance around 14:45–15:15 and preserve the confirmed 15:30 interior entry. The official FAQ says tickets are valid only for their selected time, late arrivals cannot enter, and official photo ID is required. Published Nov–Feb hours are Mon–Sat 09:00–18:00. After the visit, keep only a short nearby stroll or taxi return, depending on energy; avoid adding a distant attraction.',
        'Alternatives: the city lists Santa Caterina Market on Tuesdays 07:30–20:30, but Maps estimates 2.4 km / 35 minutes on foot to Sagrada Família; it also repeats a market visit after today’s Boqueria. Rambla de Mar is about 4.0 km / 56 minutes away on foot and creates a separate waterfront detour. Neither is the recommended morning route. If one is a priority, choose only one and check transit or taxi options that day.'
      ],
      note: 'Only the 15:30 Sagrada Família entry is confirmed; all other times are suggestions. Map durations can change and do not guarantee a flat, step-free or safe route. Gradients, steps, benches and toilets were not checked street by street. Choose walking, transit or taxi to match your parents’ comfort; recheck same-day venue operations.',
      chatChip: 'Nov 10 final-day route',
      chatQuery: 'Barcelona Nov 10 final day itinerary Sant Pau Sagrada Familia',
      chatTitle: 'Suggested route for 10 Nov',
      chatBody: 'Keep Boqueria on 9 Nov and omit it on 10 Nov. Start with Sant Pau, then continue along Avinguda de Gaudí toward Sagrada Família. Google Maps estimates about 950 m / 12 minutes on foot; TMB’s walking option showed 14 minutes. At 06:39 on 9 Nov, TMB displayed a Walk + L5 + Walk option in 8 minutes, with 5- and 3-minute walking legs; recheck because this live result is not guaranteed for 10 Nov. Keep lunch/rest nearby and the confirmed 15:30 entry unchanged.',
      chatLink: 'See the 9–10 Nov proposal and sources',
      nightChip: 'Check tonight: Plaça Reial / Arenas',
      nightQuery: 'Barcelona Nov 9 tonight Arenas Plaça Reial night view',
      nightTitle: 'Tonight, 9 Nov',
      nightBody: 'Keep today’s Boqueria visit. Do not combine both night stops. If you are finishing near Boqueria/La Rambla, Plaça Reial alone is the simpler nearby option; the city guide places it just off La Rambla and near Liceu, but does not confirm tonight’s venue hours. Arenas’ official pages reviewed here do not establish public-viewpoint hours or access tonight, so do not count on a rooftop view.',
      nightLink: 'See tonight’s suggestion and sources'
    },
    ja: {
      title: 'バルセロナ 11月9〜10日 · 最終日の動線案',
      paragraphs: [
        'ボケリア市場は確認済みの11月9日の予定に残し、11月10日には入れません。夜はArenas展望台とPlaça Reialを一つのコースにまとめない方がよいでしょう。ボケリア／ランブラス周辺で一日を終える場合は、ランブラス沿いでLiceu近くにあると市の案内に記載されたPlaça Reialだけを候補にできます。周辺店舗の当日営業時間は別途確認してください。Arenasの公式ページでは、一般向け展望台の当日営業時間やアクセス経路を確認できず、屋上からの眺望を前提にした予定はおすすめしません。',
        '11月10日（火）の午前は、サン・パウ・モダニスタ地区から始める案が最もまとまっています。10:00〜11:30は自由見学と休憩を含む提案枠です。公式案内では見学は45〜60分、11〜3月の掲載時間は09:30〜17:00、最終入場は16:30です。',
        'その後は、バルセロナ市が二つの建築物を結ぶと説明するAvinguda de Gaudíを通ってサグラダ・ファミリアへ向かいます。Googleマップの徒歩推定は約950m・12分、TMBの徒歩選択肢は14分です。11月9日06:39のTMB検索では、サン・パウ | Dos de Maigからサグラダ・ファミリア駅（523）まで「徒歩＋L5＋徒歩」のルートが8分と表示され、徒歩区間は5分・3分でした。これは同時点の結果で、11月10日の運行や待ち時間を保証しないため出発直前に再検索してください。地図・交通の所要時間は目安で、坂・歩道の連続性・アクセシビリティは保証されません。歩行が負担ならタクシーも検討してください。',
        '12:30〜14:30はサグラダ周辺で昼食と休憩を取る候補時間です。El Glop Gaudíは公式ページが聖堂から数メートルと案内し、平日08:30〜23:30と掲載しているため候補になります。ただし正確な住所、当日のメニュー、席の有無は確認できず、予約もしていません。訪問前に確認してください。',
        '14:45〜15:15頃に入口近くで余裕を持って待機する案にし、確定済みの15:30内部入場は変えません。公式FAQによるとチケットは指定時刻のみ有効で、遅刻すると入場できず、公的写真付き身分証が必要です。11〜2月の通常営業時間は月〜土09:00〜18:00です。見学後は体力に合わせて近場を短く歩くか、タクシーで戻り、遠い名所は足さない方がよいでしょう。',
        '代案比較：市の案内ではサンタ・カテリーナ市場は火曜07:30〜20:30ですが、サグラダまで徒歩約2.4km・35分の地図推定で、今日ボケリアを訪れた後に市場を重ねることになります。Rambla de Marからは徒歩約4.0km・56分の推定で、港への寄り道になります。今回は午前案に採用せず、どうしても行きたい場合はどちらか一つにし、当日の公共交通・タクシーを確認してください。'
      ],
      note: '確定しているのは15:30のサグラダ入場のみで、ほかの時刻は提案です。地図の所要時間は変わることがあり、平坦・段差なし・安全を保証しません。坂、階段、ベンチ、トイレを区間ごとに確認したわけではありません。ご両親の体調に合わせて徒歩・公共交通・タクシーを選び、当日の営業状況を再確認してください。',
      chatChip: '11月10日 最終日の動線',
      chatQuery: 'バルセロナ 11月10日 最終日 サン・パウ サグラダ・ファミリア 行程',
      chatTitle: '11月10日の動線案',
      chatBody: 'ボケリアは11月9日に訪れ、10日は外します。午前にサン・パウを見学し、Avinguda de Gaudíを通ってサグラダへ向かう案が最も直線的です。Googleマップの徒歩推定は約950m・12分、TMBの徒歩案は14分。11月9日06:39のTMB検索では「徒歩＋L5＋徒歩」8分（徒歩区間は5分・3分）も表示されましたが、11月10日の運行を保証しないため当日再確認してください。昼食・休憩はサグラダ周辺、15:30の入場はそのままです。',
      chatLink: '11月9〜10日の提案と出典を見る',
      nightChip: '今夜のPlaça Reial・Arenas案',
      nightQuery: 'バルセロナ 11月9日 今夜 Arenas Plaça Reial 夜景',
      nightTitle: '今夜（11月9日）の候補',
      nightBody: '今日のボケリア訪問はそのままにし、夜の二か所を一つにまとめないでください。ボケリア／ランブラス周辺で終えるなら、ランブラス沿いでLiceu近くにあるPlaça Reialだけが簡単な候補です。ただし周辺店の今夜の営業時間は未確認です。Arenasの公式ページでは一般向け展望台の今夜の営業時間・アクセスを確認できないため、屋上の眺望は前提にしないでください。',
      nightLink: '今夜の提案と出典を見る'
    },
    zh: {
      title: '巴塞罗那 11月9–10日 · 最后行程建议',
      paragraphs: [
        '保留今天（11月9日）已确认的博盖利亚市场行程，11月10日不再安排。晚上不建议把Arenas观景台和Plaça Reial串成一条路线。如果当天在博盖利亚／兰布拉附近结束，可只短暂考虑Plaça Reial；市政府旅游页面称它位于兰布拉旁、靠近Liceu。周边店铺当晚是否营业需要另行确认。Arenas运营方公开页面未能确认公共观景台今晚的开放时间或进入路线，因此不要把屋顶观景当成已确定项目。',
        '11月10日（周二）上午建议先去圣保罗现代主义建筑群。建议预留10:00–11:30，包含自助参观和休息。官方称参观约45–60分钟，11月至次年3月公布的开放时间为09:30–17:00，最晚入场为16:30。',
        '之后沿Avinguda de Gaudí前往圣家堂最直接。巴塞罗那市政府说明这条大道连接两处建筑；Google地图步行估算约950米、12分钟，TMB步行选项为14分钟。11月9日06:39的TMB查询还显示，从Sant Pau | Dos de Maig到圣家堂站（523）的“步行＋L5＋步行”路线显示为8分钟，步行段分别为5分钟和3分钟。这是当时的实时结果，不保证11月10日的班次或等待时间，请出发前重新查询。地图和公共交通时间都只是估算，不保证道路平坦、步行连续或无障碍；步行吃力可考虑出租车。',
        '建议12:30–14:30在圣家堂附近安排午餐和休息。El Glop Gaudí官方页面称餐厅距圣家堂仅数米，公布工作日营业时间为08:30–23:30，周二也在其中，可作为候选。不过页面没有确认准确门牌、当天菜单或是否有座位；出发前请核实。这不是已预订餐厅。',
        '建议14:45–15:15在入口附近留出缓冲，已确认的15:30堂内入场保持不变。官方常见问题称门票仅在所选时段有效，迟到不能入场，并要求出示官方带照片证件。11月至次年2月通常周一至周六09:00–18:00开放。参观结束后按体力选择附近短暂散步或乘出租车返回，不再追加远处景点。',
        '备选比较：市政府列出的圣卡特琳娜市场周二营业时间为07:30–20:30，但步行至圣家堂的地图估算为约2.4公里、35分钟；而且今天已去过博盖利亚，再加市场会重复。Rambla de Mar步行到圣家堂约4公里、56分钟估算，会形成单独的港口绕行。本次不把两者纳入上午路线。如确实想去，只选一个，并当天确认公共交通或出租车路线。'
      ],
      note: '只有15:30圣家堂入场已确认，其他时间均为建议。地图耗时会变化，不保证道路平坦、无台阶或安全；未逐段核实坡度、台阶、长椅和厕所。请按长辈体力选择步行、公共交通或出租车，并在当天再次确认场所是否营业。',
      chatChip: '11月10日最后一天路线',
      chatQuery: '巴塞罗那 11月10日最后一天 圣保罗 圣家堂 行程',
      chatTitle: '11月10日建议路线',
      chatBody: '博盖利亚安排在11月9日，10日不再去。上午先看圣保罗，再沿Avinguda de Gaudí前往圣家堂。Google地图步行估算约950米/12分钟，TMB步行选项为14分钟；11月9日06:39的TMB查询显示“步行＋L5＋步行”路线为8分钟（步行段5分钟和3分钟），但不保证11月10日的班次，请当天重新查询。午餐和休息放在圣家堂附近，15:30入场保持不变。',
      chatLink: '查看11月9–10日建议与来源',
      nightChip: '今晚Plaça Reial与Arenas备选',
      nightQuery: '巴塞罗那 11月9日今晚 Arenas Plaça Reial 夜景',
      nightTitle: '今晚（11月9日）的选择',
      nightBody: '保留今天去博盖利亚的安排，晚上不要把两个夜景点都串起来。如果今天在博盖利亚／兰布拉附近结束，只考虑短暂去Plaça Reial会更简单；市政府页面称它靠近兰布拉和Liceu，但未确认周边店铺今晚的营业时间。Arenas运营方页面未能确认公共观景台今晚的开放时间或进入路线，不要预设能上屋顶看景。',
      nightLink: '查看今晚建议与来源'
    }
  };

  const sourceIds = Object.keys(sources);
  const cardByLocale = {};
  Object.keys(copy).forEach(lang => {
    const text = copy[lang];
    const card = {
      id: 'bcn-card-final-day-plan',
      icon: '🧭',
      title: text.title,
      paragraphs: text.paragraphs,
      note: text.note,
      links: mapLinks[lang],
      sources: sourceIds
    };
    cardByLocale[lang] = card;
    const cards = guide.content[lang] && guide.content[lang].guide && guide.content[lang].guide.cards;
    if (Array.isArray(cards) && !cards.some(item => item.id === card.id)) cards.push(card);
    if (typeof CHATBOT_I18N !== 'undefined' && CHATBOT_I18N[lang] && Array.isArray(CHATBOT_I18N[lang].chips)) {
      [
        { text: text.nightChip, q: text.nightQuery },
        { text: text.chatChip, q: text.chatQuery }
      ].forEach(chip => {
        if (!CHATBOT_I18N[lang].chips.some(item => item.q === chip.q)) CHATBOT_I18N[lang].chips.unshift(chip);
      });
    }
  });

  function esc(value) {
    return String(value == null ? '' : value).replace(/[&<>"']/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));
  }
  function localeFor(lang) {
    return copy[lang] ? lang : 'ko';
  }
  const previousChat = window.buildBarcelonaLocalChatResponse;
  const dateIntent = /(?:2026[./\-\s]*11[./\-\s]*10|11\s*[./-]\s*10|11\s*월\s*10\s*일|10\s*(?:nov(?:ember)?|novembre)|10\s*月\s*10\s*日|10\s*月\s*10\s*号)/i;
  const finalIntent = /(?:final\s*day|last\s*day|final\s*route|itinerary|schedule|route\s*plan|마지막\s*날|최종\s*일정|동선|코스|일정|最終日|最終行程|行程|路线|最后一天|最后行程)/i;
  const nightDateIntent = /(?:tonight|this\s*evening|today|11\s*[./-]\s*9|9\s*nov|9\s*월\s*9\s*일|오늘\s*밤|오늘\s*저녁|오늘\s*야경|今夜|今日\s*の夜|11\s*月\s*9\s*日|今晚|今天晚上)/i;
  const nightPlaceIntent = /(?:arenas|pla[cç]a\s*reial|plaza\s*real|야경|夜景|观景)/i;
  window.buildBarcelonaLocalChatResponse = function (query, lang) {
    const q = String(query || '').toLowerCase();
    const locale = localeFor(lang || window.currentLang || 'ko');
    const text = copy[locale];
    const isFinalDay = (dateIntent.test(q) && finalIntent.test(q)) || /(?:final\s*day|last\s*day|마지막\s*날|最終日|最后一天)/i.test(q);
    const isTonight = !isFinalDay && nightDateIntent.test(q) && nightPlaceIntent.test(q);
    if (!isFinalDay && !isTonight) return typeof previousChat === 'function' ? previousChat(query, lang) : null;
    const title = isFinalDay ? text.chatTitle : text.nightTitle;
    const body = isFinalDay ? text.chatBody : text.nightBody;
    const link = isFinalDay ? text.chatLink : text.nightLink;
    const refIds = isFinalDay
      ? ['santPauHours', 'gaudiAvenue', 'tmbPlanner', 'sagradaHours', 'santaCaterina', 'portVell']
      : ['placaReial', 'arenasViewpoint', 'arenasHours'];
    const sourceHtml = refIds.map(id => {
      const source = guide.sources[id];
      return `<a class="bcn-transit-source" href="${esc(source.url)}" target="_blank" rel="noopener noreferrer">${esc(source.names[locale])}</a>`;
    }).join('');
    const topic = 'final-day-plan';
    return `<div class="bcn-transit-chat-answer"><strong>${esc(title)}</strong><p>${esc(body)}</p><div class="bcn-transit-sources">${sourceHtml}</div><button type="button" class="chat-quick-chip" onclick="openBarcelonaLocalTopic('${topic}')">${esc(link)}</button></div>`;
  };

  const previousOpenTopic = window.openBarcelonaLocalTopic;
  window.openBarcelonaLocalTopic = function (topic) {
    if (topic !== 'final-day-plan') return typeof previousOpenTopic === 'function' ? previousOpenTopic(topic) : undefined;
    window.switchGuidebookChapter?.('chapter-practical', false);
    window.goToBookPage?.('chapter-practical', 4, false);
    window.setTimeout(() => {
      const card = document.getElementById('bcn-card-final-day-plan');
      if (card) { card.open = true; card.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    }, 160);
    if (window.closeChatWindow) window.closeChatWindow();
  };

  window.BARCELONA_FINAL_DAY_PLAN = { content: copy, sources, routeMaps, cardByLocale };
  if (typeof guide.render === 'function') guide.render(window.currentLang || 'ko');
})();
