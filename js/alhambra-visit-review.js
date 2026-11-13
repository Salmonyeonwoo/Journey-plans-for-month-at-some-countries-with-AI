(function () {
  'use strict';

  const sources = {
    faq: 'https://www.alhambra-patronato.es/en/visit/faq',
    map: 'https://www.alhambra-patronato.es/wp-content/uploads/2021/03/plano-alhambra.pdf',
    tickets: 'https://tickets.alhambra-patronato.es/en/producto/alhambra-general/',
    gardens: 'https://www.jardinesalberto.es/restaurante/',
    meats: 'https://www.jardinesalberto.es/carnes/',
    parador: 'https://paradores.es/en/restaurant-parador-de-granada',
    bus: 'http://www.movilidadgranada.com/bus_linea.php?linea=C30'
  };

  const copy = {
    ko: {
      eyebrow: '독립 방문 검토 · GRANADA', title: '알함브라 방문 안내', subtitle: '확인된 정보와 현장 확인이 필요한 사항을 구분한 참고용 패널',
      confirmedLabel: '사용자 확인', confirmed: '2026년 11월 14일(토) 방문 및 14:20 티켓은 사용자 확인. 14:20이 적용되는 구역은 확인되지 않았습니다.',
      timeTitle: '입장 시간과 티켓', timeText: '공식 동절기 일반 관람시간은 해당 날짜 기준 08:30–18:00입니다. 이는 일반 관람시간이며 실제 티켓의 유효 범위나 입장 조건과는 별개입니다. 티켓에서 시간 지정 구역과 포함 구역(야간 입장 포함 여부 포함)을 먼저 확인하세요. 14:20이 Palacios Nazaríes(나스르 궁전) 입장 시각이라면 그 시각에 궁전 입구에 도착해야 합니다. 15–16시에 도착하면 입장을 놓칠 수 있습니다. 14:20이 나스르 궁전 시각이라고 단정할 수는 없습니다.',
      accessTitle: '동선 참고', accessText: '공식 지도에서 매표소 파빌리온과 나스르 궁전은 서로 다른 위치입니다. 계단과 고르지 않은 노면이 있을 수 있습니다. 이동 시간·접근성은 보장되지 않으므로 티켓과 현장 표지판을 확인하세요.',
      toiletTitle: '화장실', toiletText: '공식 FAQ는 매표소 옆, Generalife 및 나스르 궁전 “구역”의 화장실을 안내합니다. 궁전 건물 내부의 정확한 위치, 관람 중 접근 가능 여부, 무료 여부는 확인되지 않았습니다. 현장 직원이나 표지판에 확인하세요.',
      busTitle: '그라나다 버스', busText: '시 공식 안내의 C30은 Centro–Alhambra 노선입니다. 중심가 정류장 488 Plaza Isabel la Católica 4에서 타고 1005 Alhambra–Generalife 2에서 내리는 안내가 있습니다. C32는 Alhambra–Albaicín 순환 노선으로 C30과 다릅니다. 노선은 당일 바뀔 수 있고 무계단 탑승이나 좌석은 보장되지 않습니다.',
      diningTitle: '식당 선택지', gardensTitle: 'Jardines de Alberto', gardensText: '공식 안내상 매표소 건물 및 Generalife 입구 옆입니다. 게시된 동절기(10/15–3/31) 시간은 식당 08:30–18:00, 주방 11:30–17:00입니다. 11월 14일의 예외 운영과 좌석은 확인되지 않았습니다. 공식 메뉴에서 Rabo de Toro €26.90(11/13 확인 시점)을 확인했지만 총액은 아니며, Secreto Ibérico 제공 여부도 확인되지 않았습니다. 예약이 가능하다는 안내는 예약이 필수라는 뜻이 아닙니다. 도보 2분·평지·좌석 보장은 없습니다.',
      paradorTitle: 'Parador de Granada', paradorText: '공식 자료상 알함브라 안에 있고 홀과 테라스에서 Generalife 전망을 안내합니다. 좌석별 전망, 당일 영업·메뉴, 레스토랑 예약만으로 표 없이 접근 가능한지는 확인되지 않았습니다. 방문 전 +34 958 221 440으로 문의하세요.',
      uncertainty: '메뉴·가격·운영시간·교통은 시점과 현장 사정에 따라 바뀔 수 있습니다. 예약이나 일정 변경이 아니라 정보성 대안입니다.',
      chatbotTitle: '질문 도우미', chatbotSub: '입장·화장실·교통·위 두 식당 정보만 답합니다.', placeholder: '예: C30은 어디서 타나요?', ask: '답변 보기', prompt: '질문을 입력해 주세요.', noAnswer: '이 도우미는 알함브라 입장·화장실·교통과 Jardines de Alberto 또는 알함브라 내 Parador de Granada 정보만 다룹니다. 이 주제에 해당하는 질문으로 다시 입력해 주세요.',
      linkFaq: '공식 FAQ', linkMap: '공식 지도 (PDF)', linkTickets: '공식 일반 티켓', linkGardens: 'Jardines 공식 식당 안내', linkMeats: 'Jardines 공식 메뉴', linkParador: 'Parador 공식 식당 안내', linkBus: '그라나다 시 공식 C30 안내', links: '공식 정보 확인'
    },
    en: {
      eyebrow: 'INDEPENDENT VISIT REVIEW · GRANADA', title: 'Alhambra visit guide', subtitle: 'A practical reference separating confirmed details from items to verify on site',
      confirmedLabel: 'User-confirmed', confirmed: 'The user confirmed a visit on Saturday, 14 November 2026, and a 14:20 ticket. Which area the 14:20 time applies to has not been verified.',
      timeTitle: 'Admission time & ticket', timeText: 'The official general winter visiting hours for this date are 08:30–18:00. These general hours are distinct from the actual ticket’s scope and admission conditions. Check the ticket for its timed area and included areas (including whether night admission is included). If 14:20 is the Palacios Nazaríes admission time, you need to arrive at the Nasrid Palaces entrance at that time; arriving at 15:00–16:00 could mean missing entry. Do not assume that 14:20 is the Nasrid Palaces time.',
      accessTitle: 'Route notes', accessText: 'The official map shows the ticket-office pavilion and Nasrid Palaces as separate locations. Stairs and uneven surfaces may be present. Travel time and accessibility are not guaranteed; check your ticket and on-site signs.',
      toiletTitle: 'Toilets', toiletText: 'The official FAQ lists toilets beside the ticket office and in the Generalife and Nasrid Palaces “areas.” It does not confirm exact locations inside palace buildings, access during a visit, or whether they are free. Ask staff or follow on-site signs.',
      busTitle: 'Granada buses', busText: 'The city’s official information identifies C30 as Centro–Alhambra. In the city centre, board at stop 488 Plaza Isabel la Católica 4; the listed Alhambra stop is 1005 Alhambra–Generalife 2. C32 is the Alhambra–Albaicín circular route, distinct from C30. Routes may change on the day; step-free boarding and a seat are not guaranteed.',
      diningTitle: 'Dining options', gardensTitle: 'Jardines de Alberto', gardensText: 'Official restaurant information places it beside the ticket-office building and the Generalife entrance. Posted winter hours (15 Oct–31 Mar) are restaurant 08:30–18:00 and kitchen 11:30–17:00. Exceptions or seating on 14 November are unverified. The official menu listed Rabo de Toro at €26.90 (checked 13 Nov); this is not a confirmed total, and availability of Secreto Ibérico is unverified. Reservations being available does not mean they are required. A two-minute walk, level route, or available seat is not guaranteed.',
      paradorTitle: 'Parador de Granada', paradorText: 'Official information places it inside the Alhambra and describes Generalife views from the dining room and terrace. Views from a particular seat, that day’s opening/menu, and access without an admission ticket based only on a restaurant reservation are unverified. Call +34 958 221 440 to ask before going.',
      uncertainty: 'Menus, prices, hours and transport can change by date and local conditions. These are informational alternatives, not changes to an itinerary or booking.',
      chatbotTitle: 'Topic helper', chatbotSub: 'Answers only about admission, toilets, transport, and the two restaurants below.', placeholder: 'Try: Where do I board C30?', ask: 'Get answer', prompt: 'Enter a question.', noAnswer: 'This helper covers only Alhambra admission, toilets and transport, plus Jardines de Alberto or the Parador de Granada inside the Alhambra. Please ask about one of those topics.',
      linkFaq: 'Official FAQ', linkMap: 'Official map (PDF)', linkTickets: 'Official general ticket', linkGardens: 'Jardines official restaurant info', linkMeats: 'Jardines official menu', linkParador: 'Parador official restaurant info', linkBus: 'Granada city C30 information', links: 'Check official sources'
    },
    ja: {
      eyebrow: '独立した訪問確認 · GRANADA', title: 'アルハンブラ訪問ガイド', subtitle: '確認済みの情報と現地確認が必要な点を分けた参考案内',
      confirmedLabel: '利用者確認済み', confirmed: '2026年11月14日（土）の訪問と14:20のチケットは利用者確認済みです。14:20が適用されるエリアは未確認です。',
      timeTitle: '入場時間とチケット', timeText: '公式の冬季一般見学時間は、この日について08:30–18:00です。これは一般時間であり、実際のチケットの対象範囲・入場条件とは別です。チケットで時間指定エリアと含まれるエリア（夜間入場が含まれるかも含む）を確認してください。14:20がナスル宮殿（Palacios Nazaríes）の入場時刻なら、その時刻に宮殿入口へ到着する必要があります。15～16時の到着では入場を逃す可能性があります。14:20がナスル宮殿の時刻だとは断定できません。',
      accessTitle: '移動の参考', accessText: '公式地図ではチケット売場パビリオンとナスル宮殿は別の場所です。階段や凹凸のある路面がある場合があります。所要時間や移動のしやすさは保証されません。チケットと現地表示を確認してください。',
      toiletTitle: 'トイレ', toiletText: '公式FAQでは、チケット売場の隣、ヘネラリフェおよびナスル宮殿の「エリア」にトイレがあると案内しています。宮殿建物内の正確な場所、見学中に利用できるか、無料かどうかは確認されていません。現地スタッフまたは案内表示に確認してください。',
      busTitle: 'グラナダのバス', busText: '市の公式案内ではC30はCentro–Alhambra線です。中心部の乗車停留所は488 Plaza Isabel la Católica 4、案内されている下車停留所は1005 Alhambra–Generalife 2です。C32はAlhambra–Albaicín循環線で、C30とは別です。路線は当日変更の可能性があり、段差のない乗車や座席は保証されません。',
      diningTitle: '食事の選択肢', gardensTitle: 'Jardines de Alberto', gardensText: '公式案内ではチケット売場の建物およびヘネラリフェ入口の隣です。公表されている冬季（10/15–3/31）の時間はレストラン08:30–18:00、キッチン11:30–17:00です。11月14日の例外営業や空席は未確認です。公式メニューにはRabo de Toro €26.90（11/13確認時点）とありますが、総額ではなく、Secreto Ibéricoの提供も未確認です。予約可能であることは予約必須を意味しません。徒歩2分、平坦な道、座席確保は保証されません。',
      paradorTitle: 'Parador de Granada', paradorText: '公式情報ではアルハンブラ内にあり、ダイニングホールとテラスからヘネラリフェを望めると案内しています。特定の席からの眺望、当日の営業・メニュー、レストラン予約だけで入場券なしにアクセスできるかは未確認です。訪問前に +34 958 221 440 へ問い合わせてください。',
      uncertainty: 'メニュー・価格・営業時間・交通は日付や現地状況により変更されます。予約や旅程変更ではなく、情報提供としての選択肢です。',
      chatbotTitle: '質問ヘルパー', chatbotSub: '入場・トイレ・交通と、下記2軒の飲食店についてのみ回答します。', placeholder: '例：C30はどこから乗りますか？', ask: '回答を見る', prompt: '質問を入力してください。', noAnswer: 'このヘルパーはアルハンブラの入場・トイレ・交通、Jardines de Alberto、またはアルハンブラ内のParador de Granadaの情報のみを扱います。該当する内容を入力してください。',
      linkFaq: '公式FAQ', linkMap: '公式地図 (PDF)', linkTickets: '公式一般チケット', linkGardens: 'Jardines公式レストラン案内', linkMeats: 'Jardines公式メニュー', linkParador: 'Parador公式レストラン案内', linkBus: 'グラナダ市公式C30案内', links: '公式情報を確認'
    },
    zh: {
      eyebrow: '独立访客核查 · GRANADA', title: '阿尔罕布拉宫参观指南', subtitle: '区分已确认信息与需现场核实事项的参考面板',
      confirmedLabel: '用户已确认', confirmed: '用户已确认于2026年11月14日（星期六）参观，并持有14:20的门票；尚未确认14:20对应的区域。',
      timeTitle: '入场时间与门票', timeText: '官方冬季常规参观时间在该日为08:30–18:00。这是常规开放时间，不代表实际门票的适用范围或入场条件。请先查看门票，确认定时入场区域和包含区域（包括是否含夜间入场）。如果14:20是纳斯里德宫（Palacios Nazaríes）的入场时间，须在该时刻到达宫殿入口；15:00–16:00才到可能会错过入场。不能假定14:20就是纳斯里德宫的时间。',
      accessTitle: '路线提示', accessText: '官方地图显示售票亭与纳斯里德宫位于不同位置。途中可能有楼梯和不平整路面。行程时间与无障碍情况无法保证，请查看门票及现场标识。',
      toiletTitle: '洗手间', toiletText: '官方FAQ提到售票处旁、赫内拉利费及纳斯里德宫“区域”内设有洗手间。宫殿建筑内部的确切位置、参观期间是否可用及是否免费均未确认。请询问现场工作人员或查看标识。',
      busTitle: '格拉纳达公交', busText: '市政府官方信息将C30列为Centro–Alhambra线路。市中心可在488 Plaza Isabel la Católica 4站上车，所列下车站为1005 Alhambra–Generalife 2。C32是Alhambra–Albaicín环线，与C30不同。线路可能当日调整；无台阶上车和有座位均不保证。',
      diningTitle: '餐饮选择', gardensTitle: 'Jardines de Alberto', gardensText: '官方餐厅信息显示其位于售票处建筑及赫内拉利费入口旁。公布的冬季（10/15–3/31）时间为餐厅08:30–18:00、厨房11:30–17:00。11月14日是否有例外及是否有座位尚未确认。官方菜单列出Rabo de Toro €26.90（11月13日查看）；这不是已确认的总价，是否供应Secreto Ibérico也未确认。可预约不等于必须预约。不保证步行2分钟、路线平坦或有座位。',
      paradorTitle: 'Parador de Granada', paradorText: '官方资料称其位于阿尔罕布拉宫内，餐厅大厅和露台可眺望赫内拉利费。特定座位是否有景观、当日营业与菜单，以及仅凭餐厅预订能否无门票进入，均未确认。出发前请致电 +34 958 221 440 查询。',
      uncertainty: '菜单、价格、营业时间和交通会随日期及现场情况变化。这是信息参考选项，不是更改行程或预订。',
      chatbotTitle: '主题问答', chatbotSub: '仅回答入场、洗手间、交通及下列两家餐厅的信息。', placeholder: '例如：C30在哪里乘坐？', ask: '查看回答', prompt: '请输入问题。', noAnswer: '此问答仅涉及阿尔罕布拉宫的入场、洗手间、交通，以及Jardines de Alberto或宫内Parador de Granada。请改问这些主题。',
      linkFaq: '官方常见问题', linkMap: '官方地图 (PDF)', linkTickets: '官方普通门票', linkGardens: 'Jardines官方餐厅信息', linkMeats: 'Jardines官方菜单', linkParador: 'Parador官方餐厅信息', linkBus: '格拉纳达市官方C30信息', links: '查看官方信息'
    }
  };

  const esc = (value) => String(value).replace(/[&<>"']/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));
  const normalizedLang = (lang) => Object.prototype.hasOwnProperty.call(copy, lang) ? lang : 'ko';
  const link = (href, label) => `<a href="${href}" target="_blank" rel="noopener noreferrer">${label}</a>`;

  window.renderAlhambraVisitReview = function (lang) {
    const t = copy[normalizedLang(lang)];
    const root = document.getElementById('alhambra-visit-review');
    if (!root) return false;
    root.innerHTML = `
      <section class="avr-panel" aria-labelledby="avr-title" lang="${normalizedLang(lang)}">
        <header class="avr-hero">
          <div class="avr-hero-copy"><p class="avr-eyebrow">${t.eyebrow}</p><h2 id="avr-title">${t.title}</h2><p class="avr-subtitle">${t.subtitle}</p></div>
        </header>
        <div class="avr-confirmed"><span class="avr-confirmed-label">${t.confirmedLabel}</span><p>${t.confirmed}</p></div>
        <div class="avr-grid">
          <article class="avr-card avr-card-wide"><span class="avr-card-index">01</span><div><h3>${t.timeTitle}</h3><p>${t.timeText}</p></div></article>
          <article class="avr-card"><span class="avr-card-index">02</span><div><h3>${t.accessTitle}</h3><p>${t.accessText}</p></div></article>
          <article class="avr-card"><span class="avr-card-index">03</span><div><h3>${t.toiletTitle}</h3><p>${t.toiletText}</p></div></article>
          <article class="avr-card avr-card-wide"><span class="avr-card-index">04</span><div><h3>${t.busTitle}</h3><p>${t.busText}</p></div></article>
          <article class="avr-card"><span class="avr-card-index">05</span><div><h3>${t.gardensTitle}</h3><p>${t.gardensText}</p></div></article>
          <article class="avr-card"><span class="avr-card-index">06</span><div><h3>${t.paradorTitle}</h3><p>${t.paradorText}</p></div></article>
        </div>
        <aside class="avr-note">${t.uncertainty}</aside>
        <details class="avr-sources"><summary>${t.links}</summary><nav aria-label="${t.links}">${link(sources.faq, t.linkFaq)}${link(sources.map, t.linkMap)}${link(sources.tickets, t.linkTickets)}${link(sources.gardens, t.linkGardens)}${link(sources.meats, t.linkMeats)}${link(sources.parador, t.linkParador)}${link(sources.bus, t.linkBus)}</nav></details>
      </section>`;
    return true;
  };

  window.buildAlhambraVisitReviewChatResponse = function (query, lang) {
    const language = normalizedLang(lang);
    const text = String(query || '').toLocaleLowerCase();
    if (!text.trim()) return null;

    // Exclude history questions, and Parador questions explicitly about another city.
    const history = /history|historical|historic|origin|origins|dynasty|nasrid.*(past|history)|histor(y|ical)|역사|유래|왕조|歴史|由来|王朝|历史|起源|王朝/iu;
    if (history.test(text)) return null;
    const otherCityParador = /parador.{0,40}(?:madrid|sevilla|seville|cordoba|córdoba|malaga|málaga|ronda|toledo|santiago|グラナダ以外|マドリード|セビリア|コルドバ|马德里|塞维利亚|科尔多瓦)|(?:madrid|sevilla|seville|cordoba|córdoba|malaga|málaga|ronda|toledo|santiago).{0,40}parador|パラドール.{0,30}(?:マドリード|セビリア|コルドバ)|(?:马德里|塞维利亚|科尔多瓦).{0,30}Parador/iu;
    if (otherCityParador.test(text)) return null;

    const re = {
      entry: /ticket|admission|entry|entrance|timed|time slot|14\s*[:：.]\s*20|opening hour|opening time|entrada|billete|boleto|입장|티켓|입장권|시간|入場|チケット|時刻|入场|门票|时间|14時20分|14点20分/iu,
      toilet: /toilet|restroom|bathroom|\bwc\b|washroom|aseo|baño|화장실|トイレ|厕所|洗手間|洗手间/iu,
      bus: /\bc\s*30\b|\bc\s*32\b|bus|stop|route|버스|미니버스|정류장|교통|乗り場|停留所|バス|公交|站点|线路/iu,
      busNumber: /\bc\s*(?:30|32)\b/iu,
      gardens: /jardines?\s+(?:de\s+)?alberto|하르디네스\s*데\s*알베르토|하르디네스|アルベルト|哈迪内斯/iu,
      parador: /parador|파라도르|パラドール|帕拉多/iu,
      restaurant: /restaurant|dining|menu|kitchen|food|eat|reservation|table|comer|restaurante|식당|맛집|점심|저녁|식사|메뉴|レストラン|食事|メニュー|餐厅|菜单|用餐/iu,
      alhambra: /alhambra|nasrid|nazar[ií]|palacios nazar|알함브라|나스르|アルハンブラ|ナスル|阿尔罕布拉|纳斯里德|纳斯瑞德/iu,
      granada: /granada|그라나다|グラナダ|格拉纳达/iu
    };
    const hasAlhambra = re.alhambra.test(text);
    const hasGranada = re.granada.test(text);
    const isParador = re.parador.test(text) && (hasGranada || hasAlhambra);
    const isGardens = re.gardens.test(text);
    const hasEntry = re.entry.test(text) && (hasAlhambra || (hasGranada && /14\s*[:：.]\s*20|14時20分|14点20分/iu.test(text)));
    const hasToilet = re.toilet.test(text) && hasAlhambra;
    const hasBus = re.bus.test(text) && (hasAlhambra || re.busNumber.test(text));
    const generalRestaurant = re.restaurant.test(text) && hasAlhambra;
    const topics = [];
    if (isParador) topics.push('parador');
    if (isGardens) topics.push('gardens');
    if (hasEntry) topics.push('entry');
    if (hasToilet) topics.push('toilet');
    if (hasBus) topics.push('bus');
    if (generalRestaurant && !isParador && !isGardens) topics.push('restaurant');
    if (!topics.length) return null;

    const answers = {
      ko: {
        entry: '2026-11-14(토) 방문과 14:20 티켓은 사용자 확인 사항이지만, 14:20 적용 구역은 미확인입니다. 티켓에서 시간 지정 구역과 포함 여부(야간 입장 포함 여부 포함)를 확인하세요. 공식 동절기 일반 관람시간은 해당 날짜 08:30–18:00이며 실제 표의 범위·입장 조건과는 별개입니다. 14:20이 나스르 궁전 시각이라면 그 시각에 궁전 입구에 도착해야 하며, 15–16시 도착은 입장을 놓칠 수 있습니다. 14:20이 나스르 시각이라고 단정하지 마세요. 매표소 파빌리온과 궁전은 별개 위치이고 계단·고르지 않은 바닥이 있을 수 있습니다. 공식 티켓: ' + sources.tickets + ' | 지도: ' + sources.map,
        toilet: '공식 FAQ는 매표소 옆과 Generalife 및 나스르 궁전 “구역”의 화장실을 안내합니다. 궁전 건물 내부의 정확한 위치, 관람 중 이용 가능 여부, 무료 여부는 확인되지 않았으니 현장 직원·표지판에 확인하세요. ' + sources.faq,
        bus: '시 공식 안내상 C30은 Centro–Alhambra입니다. 중심가 488 Plaza Isabel la Católica 4에서 승차, 1005 Alhambra–Generalife 2에서 하차 안내입니다. C32는 Alhambra–Albaicín 순환 노선으로 별도이며, 당일 노선 변경 가능성과 개인별 접근성·좌석 미보장을 유의하세요. ' + sources.bus,
        gardens: 'Jardines de Alberto는 공식 안내상 매표소 건물 및 Generalife 입구 옆입니다. 동절기(10/15–3/31) 게시 시간은 식당 08:30–18:00, 주방 11:30–17:00이나 11/14 예외 운영·좌석은 미확인입니다. Rabo de Toro €26.90은 11/13 확인 메뉴 가격이며 총액이나 당일 제공을 보장하지 않고 Secreto Ibérico도 미확인입니다. 예약 가능은 필수가 아닙니다. ' + sources.gardens + ' | 메뉴: ' + sources.meats,
        parador: 'Parador de Granada는 공식 자료상 알함브라 안에 있고 홀·테라스에서 Generalife 전망을 안내합니다. 특정 좌석 전망, 당일 영업·메뉴 및 식당 예약만으로 입장권 없이 접근 가능한지는 미확인입니다. +34 958 221 440으로 문의하세요. ' + sources.parador,
        restaurant: '알함브라 방문객을 위한 식당 정보는 Jardines de Alberto(매표소 건물 및 Generalife 입구 옆)와 알함브라 내 Parador de Granada가 있습니다. 당일 영업·메뉴·좌석과 표 없이 식당 접근 가능 여부는 확인이 필요합니다. Parador는 +34 958 221 440으로 문의하세요. ' + sources.gardens + ' | ' + sources.parador
      },
      en: {
        entry: 'The user confirmed a visit on Sat 14 Nov 2026 and a 14:20 ticket, but the area tied to 14:20 is unverified. Check the ticket for its timed area and included areas (including night admission). Official general winter hours for that date are 08:30–18:00; they are separate from the actual ticket scope and admission conditions. If 14:20 is the Nasrid Palaces time, arrive at that entrance then; arriving at 15:00–16:00 could miss entry. Do not assume 14:20 is the Nasrid time. The ticket-office pavilion and palace are separate locations; stairs and uneven surfaces may occur. Official ticket: ' + sources.tickets + ' | map: ' + sources.map,
        toilet: 'The official FAQ lists toilets beside the ticket office and in the Generalife and Nasrid Palaces “areas.” Exact locations inside palace buildings, access during a visit, and whether they are free are unverified; ask staff or check signs. ' + sources.faq,
        bus: 'The city’s official information lists C30 as Centro–Alhambra: board at city-centre stop 488 Plaza Isabel la Católica 4 and alight at listed stop 1005 Alhambra–Generalife 2. C32 is a separate Alhambra–Albaicín circular route. Routes may change on the day, and individual accessibility or seating is not guaranteed. ' + sources.bus,
        gardens: 'Jardines de Alberto is listed beside the ticket-office building and Generalife entrance. Posted winter hours (15 Oct–31 Mar): restaurant 08:30–18:00, kitchen 11:30–17:00; 14 Nov exceptions and seating are unverified. Rabo de Toro was listed at €26.90 when checked 13 Nov; this is not a guaranteed total or same-day availability. Secreto Ibérico is unverified. Reservations being possible does not make them mandatory. ' + sources.gardens + ' | menu: ' + sources.meats,
        parador: 'Official information places Parador de Granada inside the Alhambra and describes Generalife views from its dining room and terrace. A particular seat’s view, same-day opening/menu, and access without an admission ticket based solely on a restaurant reservation are unverified. Call +34 958 221 440. ' + sources.parador,
        restaurant: 'The relevant dining options are Jardines de Alberto (beside the ticket-office building and Generalife entrance) and Parador de Granada inside the Alhambra. Same-day hours, menu, seating, and whether restaurant access is possible without an admission ticket need confirmation. Call the Parador at +34 958 221 440. ' + sources.gardens + ' | ' + sources.parador
      },
      ja: {
        entry: '2026年11月14日（土）の訪問と14:20のチケットは利用者確認済みですが、14:20の対象エリアは未確認です。チケットで時間指定エリアと含まれるエリア（夜間入場を含むかも）を確認してください。この日の公式冬季一般時間は08:30–18:00で、実際のチケット範囲・条件とは別です。14:20がナスル宮殿の時刻なら、その時刻に入口へ到着する必要があり、15～16時到着では入場を逃す可能性があります。14:20がナスル宮殿の時刻とは断定しないでください。チケット売場パビリオンと宮殿は別の場所で、階段・不整地の場合があります。公式チケット: ' + sources.tickets + ' | 地図: ' + sources.map,
        toilet: '公式FAQではチケット売場の隣、ヘネラリフェとナスル宮殿の「エリア」にトイレがあると案内しています。建物内部の正確な場所、見学中の利用可否、無料かは未確認です。現地スタッフ・表示に確認してください。 ' + sources.faq,
        bus: '市の公式案内ではC30はCentro–Alhambra線です。中心部の488 Plaza Isabel la Católica 4で乗車し、案内上の1005 Alhambra–Generalife 2で下車します。C32は別のAlhambra–Albaicín循環線です。当日変更の可能性があり、個人のアクセシビリティや座席は保証されません。 ' + sources.bus,
        gardens: 'Jardines de Albertoは公式案内上、チケット売場の建物とヘネラリフェ入口の隣です。公表冬季時間（10/15–3/31）はレストラン08:30–18:00、キッチン11:30–17:00ですが、11/14の例外や空席は未確認です。Rabo de Toro €26.90は11/13確認時点のメニュー価格で、総額や当日提供を保証せず、Secreto Ibéricoも未確認です。予約可能は必須を意味しません。 ' + sources.gardens + ' | メニュー: ' + sources.meats,
        parador: '公式情報ではParador de Granadaはアルハンブラ内にあり、ダイニングホール・テラスからヘネラリフェを望めるとされています。特定席の眺望、当日営業・メニュー、レストラン予約だけで入場券なしに入れるかは未確認です。+34 958 221 440へ電話で確認してください。 ' + sources.parador,
        restaurant: '該当する食事先は、チケット売場の建物・ヘネラリフェ入口の隣にあるJardines de Albertoと、アルハンブラ内のParador de Granadaです。当日の営業時間・メニュー・席、入場券なしでレストランへ行けるかは要確認です。Paradorは+34 958 221 440へ。 ' + sources.gardens + ' | ' + sources.parador
      },
      zh: {
        entry: '用户已确认2026年11月14日（星期六）参观及14:20门票，但14:20对应区域尚未核实。请查看门票确认定时区域和包含区域（包括是否含夜间入场）。该日官方冬季常规时间为08:30–18:00，与实际门票范围和入场条件不同。如果14:20是纳斯里德宫时间，须在该时刻到达宫殿入口；15:00–16:00才到可能错过入场。不要假定14:20就是纳斯里德宫时间。售票亭与宫殿位置不同，可能有楼梯和不平整路面。官方门票：' + sources.tickets + ' | 地图：' + sources.map,
        toilet: '官方FAQ称售票处旁、赫内拉利费及纳斯里德宫“区域”内设有洗手间。宫殿建筑内的确切位置、参观时能否使用及是否免费均未核实，请询问工作人员或查看标识。' + sources.faq,
        bus: '市政府官方信息显示C30为Centro–Alhambra线：在市中心488 Plaza Isabel la Católica 4上车，所列下车站为1005 Alhambra–Generalife 2。C32是另一条Alhambra–Albaicín环线。线路可能当日调整，个人无障碍条件及座位不保证。' + sources.bus,
        gardens: '官方信息称Jardines de Alberto位于售票处建筑及赫内拉利费入口旁。公布冬季时间（10/15–3/31）为餐厅08:30–18:00、厨房11:30–17:00；11月14日例外及座位未核实。Rabo de Toro €26.90为11月13日查看时的菜单价格，不代表总价或当日一定供应；Secreto Ibérico也未确认。可预约不等于必须预约。' + sources.gardens + ' | 菜单：' + sources.meats,
        parador: '官方资料称Parador de Granada位于阿尔罕布拉宫内，餐厅大厅和露台可眺望赫内拉利费。具体座位景观、当日营业和菜单，以及仅凭餐厅预订能否无门票进入，均未核实。请致电+34 958 221 440查询。' + sources.parador,
        restaurant: '相关餐饮选择包括售票处建筑及赫内拉利费入口旁的Jardines de Alberto，以及宫内的Parador de Granada。当日营业、菜单、座位和无门票能否进入餐厅均需确认。Parador电话：+34 958 221 440。' + sources.gardens + ' | ' + sources.parador
      }
    };
    const selected = answers[language];
    const paragraphs = topics.map((topic) => esc(selected[topic]).replace(/https?:\/\/[^\s|<]+/g, (url) => `<a href="${url}" target="_blank" rel="noopener noreferrer">${url}</a>`));
    return `<div class="chat-curated-answer">${paragraphs.map((paragraph) => `<p>${paragraph}</p>`).join('')}</div>`;
  };
})();
