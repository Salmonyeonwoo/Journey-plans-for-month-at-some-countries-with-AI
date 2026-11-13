/* Ronda regional dining and Granada Alhambra-view restaurants.
 * Candidate-only guidance: does not alter dates, routes, or bookings.
 * Loaded after practical-place-additions.js and before app.js.
 */
(function () {
  'use strict';
  const langs = ['ko', 'en', 'ja', 'zh'];
  const cityNames = {
    ronda: { ko: '🇪🇸 론다', en: '🇪🇸 Ronda', ja: '🇪🇸 ロンダ', zh: '🇪🇸 龙达' },
    granada: { ko: '🇪🇸 그라나다', en: '🇪🇸 Granada', ja: '🇪🇸 グラナダ', zh: '🇪🇸 格拉纳达' }
  };
  const entries = [
    {
      id: 'pc-rnd-lechuguita', cityId: 'ronda', cityName: '론다', cityEn: 'Ronda', typeKey: 'evening_food_hall',
      name: { ko: 'El Lechuguita (엘 레추기타)', en: 'El Lechuguita', ja: 'El Lechuguita', zh: 'El Lechuguita' },
      mapQuery: 'El Lechuguita Calle Virgen de los Remedios 35 Ronda',
      copy: {
        ko: { typeBadge: '🍴 전통 안달루시아 타파스', subTypeTag: '가성비·현지식 후보 · 전망 맛집으로 검증되지 않음', verifyBadge: '공식 식당·론다 관광청 자료 확인 · 2026-11-12', highlights: '식당은 안달루시아 전통 요리와 현지 공급처를 소개합니다. 공식 메뉴에는 론다 초리소, 초리소·모르시야 병아리콩, 살모레호, 토르티야 등이 있습니다. Puente Nuevo 전망은 공식적으로 확인되지 않았습니다.', hours: '2026-11-16(월) 영업 확정 아님. 공식 식당 페이지는 월요일 12:30–16:00·20:00–23:00, 론다 관광청은 13:00–15:30·20:30–23:30으로 서로 다르게 표기합니다. 예약은 받지 않으며 선착순이라고 안내합니다. 방문 전 직접 확인하세요.', seniorCaution: '공식 자료에서 계단·무단차 입구·화장실 등 접근성은 확인되지 않았습니다. 식당은 예약을 받지 않으므로 대기·좌석을 보장할 수 없습니다. 필요하면 입구와 좌석 조건을 문의하세요.' },
        en: { typeBadge: '🍴 Traditional Andalusian tapas', subTypeTag: 'Value/local-food idea · no verified bridge view', verifyBadge: 'Restaurant and Ronda tourism sources checked · 2026-11-12', highlights: 'The restaurant describes traditional Andalusian cooking and local suppliers. Its official menu lists Ronda chorizo, chickpeas with chorizo and morcilla, salmorejo and tortilla. No Puente Nuevo view is verified.', hours: 'Not confirmed for Mon 16 Nov 2026. The restaurant page lists Mon 12:30–16:00 and 20:00–23:00, while Ronda tourism lists 13:00–15:30 and 20:30–23:30. The restaurant says it does not take reservations and seats guests in arrival order. Check directly before going.', seniorCaution: 'Official sources do not specify steps, step-free entry, toilets or other access features. The venue does not accept reservations, so a seat or wait time is not guaranteed. Ask about entry and seating if needed.' },
        ja: { typeBadge: '🍴 アンダルシア伝統タパス', subTypeTag: '手頃な郷土料理候補・橋の眺望は未確認', verifyBadge: '店舗・ロンダ観光公式情報を確認 · 2026-11-12', highlights: '店は伝統的なアンダルシア料理と地元の仕入れ先を紹介。公式メニューにはロンダ産チョリソ、チョリソとモルシージャ入りひよこ豆、サルモレホ、トルティージャなどがあります。Puente Nuevoの眺望は確認できていません。', hours: '2026年11月16日（月）の営業は未確認。店舗公式ページは月曜12:30–16:00・20:00–23:00、ロンダ観光局は13:00–15:30・20:30–23:30と異なる時間を掲載しています。予約不可・来店順と案内。訪問前に直接ご確認ください。', seniorCaution: '公式資料では階段、段差のない入口、トイレなどのアクセス情報を確認できません。予約を受け付けていないため、待ち時間や席は保証されません。必要なら入口と座席条件を問い合わせてください。' },
        zh: { typeBadge: '🍴 安达卢西亚传统Tapas', subTypeTag: '平价地方菜候选 · 未核实桥景', verifyBadge: '已核对餐厅及龙达旅游官方资料 · 2026-11-12', highlights: '餐厅介绍传统安达卢西亚烹饪及本地供应商。官网菜单列有龙达风味香肠、香肠与血肠炖鹰嘴豆、冷汤salmorejo和西班牙蛋饼等。未核实可看到新桥景色。', hours: '未确认2026年11月16日（周一）营业。餐厅官网列周一12:30–16:00、20:00–23:00，龙达旅游局则列13:00–15:30、20:30–23:30，时间冲突。餐厅称不接受预订、按到店顺序安排座位。出发前请直接确认。', seniorCaution: '官方资料未说明台阶、无台阶入口、洗手间等通行条件。餐厅不接受预订，因此无法保证座位或等候时间；如有需要，请询问入口和座位情况。' },
        sourceLabels: {
          ko: ['El Lechuguita 공식 사이트·메뉴', 'El Lechuguita 공식 영업·예약 안내', '론다 관광청 공식 식당 정보'],
          en: ['El Lechuguita official site and menu', 'Official hours and reservation note', 'Ronda tourism restaurant listing'],
          ja: ['El Lechuguita公式サイト・メニュー', '公式営業時間・予約案内', 'ロンダ観光局の店舗情報'],
          zh: ['El Lechuguita官网及菜单', '官网营业与预订说明', '龙达旅游局餐厅资料']
        }
      },
      sources: [
        'https://carta.ellechuguita.com/',
        'https://ellechuguita.com/index.php/contacto/',
        'https://turismoderonda.es/en/ronda/restaurantes/restaurant_baratos,tapas/el_lechuguita'
      ]
    },
    {
      id: 'pc-rnd-tragata', cityId: 'ronda', cityName: '론다', cityEn: 'Ronda', typeKey: 'evening_food_hall',
      name: { ko: 'Tragatá (트라가타)', en: 'Tragatá', ja: 'Tragatá（トラガタ）', zh: 'Tragatá（特拉加塔）' },
      mapQuery: 'Tragata Calle Nueva 4 Ronda',
      copy: {
        ko: { typeBadge: '🍽️ 현대적 안달루시아 타파스', subTypeTag: '전통 지중해·스페인 요리에 창의적 접근', verifyBadge: '식당·론다 관광청 공식 자료 확인 · 2026-11-12', highlights: '론다 관광청은 전형적인 지중해·스페인 요리에 독창성을 더한 식당으로 소개하고 비건·채식·글루텐프리 선택지를 표기합니다. 확인한 공식 페이지에서는 현재 메뉴 세부를 읽을 수 없어 특정 요리는 단정하지 않습니다. 협곡 전망도 확인되지 않았습니다.', hours: '2026-11-16(월) 날짜별 영업은 미확인. 식당 페이지는 매일 13:00–15:45·20:00–22:45, 관광청은 월요일 13:00–16:00·20:00–23:00으로 표기해 차이가 있습니다. 방문 전 식당에 확인하세요.', seniorCaution: '계단·무단차 입구·좌석 접근성은 공식 자료에서 확인되지 않았습니다. C. Nueva 4에 있으며 전망이나 특정 좌석은 안내되지 않습니다. 필요하면 식당에 직접 문의하세요.' },
        en: { typeBadge: '🍽️ Modern Andalusian tapas', subTypeTag: 'Mediterranean and Spanish cooking with an original touch', verifyBadge: 'Restaurant and Ronda tourism sources checked · 2026-11-12', highlights: 'Ronda tourism describes typical Mediterranean and Spanish food with an original touch and lists vegan, vegetarian and gluten-free options. The official pages checked did not expose a readable current menu, so no specific dish is promised. No gorge view is verified.', hours: 'Date-specific opening on Mon 16 Nov 2026 is unconfirmed. The restaurant page lists daily 13:00–15:45 and 20:00–22:45; Ronda tourism lists Monday 13:00–16:00 and 20:00–23:00. Confirm directly before visiting.', seniorCaution: 'Official sources do not verify stairs, step-free entry or seating access. The address is C. Nueva 4; no gorge view or view-facing seat is documented. Contact the venue about access needs.' },
        ja: { typeBadge: '🍽️ モダンなアンダルシア風タパス', subTypeTag: '地中海・スペイン料理に独創性を加えた店', verifyBadge: '店舗・ロンダ観光公式情報を確認 · 2026-11-12', highlights: 'ロンダ観光局は、地中海・スペイン料理に独創性を加えた店と紹介し、ヴィーガン・ベジタリアン・グルテンフリーの選択肢を掲載。確認した公式ページでは現行メニューを読み取れず、具体的な料理は断定しません。渓谷の眺望も未確認です。', hours: '2026年11月16日（月）の営業は未確認。店舗公式ページは毎日13:00–15:45・20:00–22:45、観光局は月曜13:00–16:00・20:00–23:00と異なります。訪問前に直接確認してください。', seniorCaution: '公式資料では階段、段差のない入口、座席へのアクセスを確認できません。住所はC. Nueva 4。渓谷の眺望や眺望席の案内はありません。必要な条件を店に問い合わせてください。' },
        zh: { typeBadge: '🍽️ 创意安达卢西亚Tapas', subTypeTag: '地中海与西班牙料理的创新表达', verifyBadge: '已核对餐厅及龙达旅游官方资料 · 2026-11-12', highlights: '龙达旅游局将其介绍为带有创意的地中海与西班牙料理，并列出纯素、素食和无麸质选择。所查官网未能读取当前菜单，因此不承诺具体菜品。未核实峡谷景观。', hours: '未确认2026年11月16日（周一）当天营业。餐厅官网列每日13:00–15:45、20:00–22:45；旅游局列周一13:00–16:00、20:00–23:00，时间不一致。到访前请直接确认。', seniorCaution: '官方资料未核实台阶、无台阶入口或座位通行情况。地址为C. Nueva 4；未介绍峡谷景观或观景座位。如有需要请联系餐厅确认。' },
        sourceLabels: {
          ko: ['Tragatá 론다 공식 식당 페이지', '론다 관광청 Tragatá 공식 소개'],
          en: ['Tragatá official Ronda page', 'Ronda tourism profile for Tragatá'],
          ja: ['Tragatá公式ロンダ店ページ', 'ロンダ観光局のTragatá紹介'],
          zh: ['Tragatá龙达官方餐厅页面', '龙达旅游局Tragatá介绍']
        }
      },
      sources: ['https://www.tragata.com/ronda', 'https://turismoderonda.es/en/ronda/restaurantes/trendy/tragata']
    },
    {
      id: 'pc-rnd-casa-maria', cityId: 'ronda', cityName: '론다', cityEn: 'Ronda', typeKey: 'evening_food_hall',
      name: { ko: 'Restaurante Casa María (카사 마리아)', en: 'Restaurante Casa María', ja: 'Restaurante Casa María（カサ・マリア）', zh: 'Restaurante Casa María（卡萨玛丽亚）' },
      mapQuery: 'Restaurante Casa Maria Plaza Ruedo Alameda Ronda',
      copy: {
        ko: { typeBadge: '🥘 제철 시장 식재료 코스형 식사', subTypeTag: '정해진 메뉴판 없이 취향에 맞춰 추천하는 식당', verifyBadge: '론다 관광청·식당 공식 소셜 자료 확인 · 2026-11-12', highlights: '론다 관광청은 당일 신선한 식재료를 사서 손님의 취향에 맞춰 요리를 추천하며 고기·생선·수제 디저트를 낸다고 설명합니다. 식당 자체 소개도 제철·시장 식재료와 ‘sin carta(고정 메뉴판 없음)’를 언급합니다. 테라스는 확인되지만 다리 전망은 확인되지 않았습니다.', hours: '관광청 게시 시간은 수–일 16:00–22:00이며 월요일 시간은 없습니다. 따라서 2026-11-16(월) 영업은 확인되지 않으며 방문 전 직접 확인해야 합니다. 당일 요리와 가격은 고정 메뉴가 아닐 수 있습니다.', seniorCaution: '계단·경사·무단차 입구 등 접근성은 확인되지 않았습니다. 공식 관광 자료에 좁고 자갈이 있는 구시가지 골목 언급이 있어 이동이 불편하면 입구·차량 하차 지점과 좌석을 식당에 확인하세요. 알바이신 언덕길과는 무관합니다.' },
        en: { typeBadge: '🥘 Seasonal, market-led dining', subTypeTag: 'The restaurant recommends dishes to suit guests; no à-la-carte menu', verifyBadge: 'Ronda tourism and restaurant social sources checked · 2026-11-12', highlights: 'Ronda tourism says the restaurant buys fresh food daily and recommends dishes to suit guests’ tastes, including meat, fish and homemade desserts. Its own profile says “sin carta” (no fixed à-la-carte menu) and mentions seasonal market produce. A terrace is mentioned, but no bridge view is verified.', hours: 'Ronda tourism lists Wed–Sun 16:00–22:00 and no Monday hours. Opening on Mon 16 Nov 2026 is not confirmed; check directly. Dishes and prices may vary with the day’s ingredients.', seniorCaution: 'Steps, gradients and step-free access are unverified. Official tourism material mentions narrow, cobbled old-town lanes; if mobility is a concern, ask the restaurant about the drop-off point, entrance and seating. This is in Ronda, not Granada’s Albaicín.' },
        ja: { typeBadge: '🥘 市場食材・季節のコース風料理', subTypeTag: '固定メニューなし・好みに合わせて料理を提案', verifyBadge: 'ロンダ観光局・店舗公式SNSを確認 · 2026-11-12', highlights: 'ロンダ観光局によると、毎日食材を仕入れ、好みに合わせて肉・魚・自家製デザートなどを提案します。店の公式プロフィールは季節の市場食材と「sin carta（固定メニューなし）」を説明。テラスは確認できますが、橋の眺望は確認できていません。', hours: '観光局掲載時間は水～日16:00–22:00で、月曜は記載なし。2026年11月16日（月）の営業は未確認です。訪問前に直接確認してください。料理と価格は日によって変わる場合があります。', seniorCaution: '階段・勾配・段差のない入口は未確認。観光局資料は旧市街の狭い石畳路地に触れています。移動が不安な場合は降車場所・入口・座席を店に確認してください。グラナダのアルバイシンではありません。' },
        zh: { typeBadge: '🥘 时令市场食材料理', subTypeTag: '无固定菜单 · 按客人口味推荐菜品', verifyBadge: '已核对龙达旅游局及餐厅官方社交资料 · 2026-11-12', highlights: '龙达旅游局称餐厅每天采购新鲜食材，并按客人口味推荐肉类、鱼类和自制甜点。餐厅自己的资料提到时令市场食材及“sin carta”（无固定菜单）。可确认有露台，但未核实桥景。', hours: '龙达旅游局列出的营业时间为周三至周日16:00–22:00，未列周一。未确认2026年11月16日（周一）营业，请直接核实。菜品和价格可能随当天食材变化。', seniorCaution: '台阶、坡度及无台阶入口均未核实。旅游局资料提及老城区狭窄的石板路；如行动不便，请向餐厅确认下车点、入口和座位。此处在龙达，并非格拉纳达阿尔拜辛区。' },
        sourceLabels: {
          ko: ['론다 관광청 Casa María 공식 등록', 'Casa María 공식 프로필·제철 식재료 설명'],
          en: ['Casa María official Ronda tourism listing', 'Casa María restaurant profile'],
          ja: ['ロンダ観光局のCasa María公式掲載', 'Casa María公式プロフィール'],
          zh: ['龙达旅游局Casa María官方资料', 'Casa María餐厅官方简介']
        }
      },
      sources: ['https://turismoderonda.es/en/ronda/restaurantes/tradicionales/casa_maria', 'https://www.instagram.com/casamaria_ronda/']
    },
    {
      id: 'pc-rnd-arrabal', cityId: 'ronda', cityName: '론다', cityEn: 'Ronda', typeKey: 'evening_view',
      name: { ko: 'Arrabal Restaurante (아라발)', en: 'Arrabal Restaurante', ja: 'Arrabal Restaurante（アラバル）', zh: 'Arrabal Restaurante（阿拉瓦尔）' },
      mapQuery: 'Arrabal Restaurante Calle Tenorio 12 Ronda',
      copy: {
        ko: { typeBadge: '🌉 Puente Nuevo 전망 다이닝 후보', subTypeTag: '공식 소개는 야외 테라스 전망을 명시', verifyBadge: '식당 공식 사이트·메뉴 확인 · 2026-11-12', highlights: '식당 공식 홈페이지는 야외 테라스 3곳에서 Serranía de Ronda와 Puente Nuevo 파노라마를 안내합니다. 실내 식당도 있지만 실내 좌석 전망은 확인되지 않았습니다. 메뉴에는 꿀 곁들인 가지 튀김, 아티초크와 푸아그라, 이베리코 돼지 쌀요리, 새끼염소 어깨구이 등이 실려 있습니다(메뉴 업데이트일 미표기).', hours: '공식 확인 페이지에서 최신 영업시간을 찾지 못했습니다. 2026-11-16(월) 영업은 미확인이며, 연락 전 특정 날짜 운영을 전제로 하지 마세요. 식당은 테이블을 도착 순서로 배정한다고 안내합니다.', seniorCaution: '테라스의 계단·경사·무단차 접근과 실내 좌석 전망은 공식 페이지에서 확인되지 않았습니다. 구시가지 Calle Tenorio 12에 있습니다. 야외 테라스와 전망 좌석을 요청하더라도 보장되지 않으니 접근·좌석 조건을 문의하세요.' },
        en: { typeBadge: '🌉 Puente Nuevo view-dining idea', subTypeTag: 'The restaurant assigns the view to its outdoor terraces', verifyBadge: 'Restaurant site and menu checked · 2026-11-12', highlights: 'The official homepage says its three outdoor terraces have panoramic views of the Serranía de Ronda and Puente Nuevo. It also has indoor dining rooms, but their views are not established. Its undated menu lists fried aubergine with honey, artichokes with foie, Iberian-pork rice and suckling-kid shoulder, among other dishes.', hours: 'Current official hours were not found on the pages checked. Monday 16 Nov 2026 operation is unconfirmed; do not plan around that date without checking. The restaurant says tables are assigned in arrival order.', seniorCaution: 'The restaurant has not published verified terrace steps, gradients, step-free access or indoor sightlines. It is at Calle Tenorio 12 in the old town. Ask about access and seating; an outdoor view table is not guaranteed.' },
        ja: { typeBadge: '🌉 Puente Nuevo眺望の食事候補', subTypeTag: '公式案内は屋外テラスの眺望を明記', verifyBadge: '店舗公式サイト・メニューを確認 · 2026-11-12', highlights: '公式サイトは屋外テラス3か所からSerranía de RondaとPuente Nuevoを一望できると案内。屋内席もありますが、室内からの眺望は確認できません。更新日不明のメニューには、蜂蜜がけナス、アーティチョークとフォアグラ、イベリコ豚の米料理、子ヤギ肩肉のローストなどがあります。', hours: '確認した公式ページに最新営業時間はありません。2026年11月16日（月）の営業は未確認のため、訪問前に確認してください。テーブルは来店順に割り当てると案内されています。', seniorCaution: 'テラスの階段・勾配・段差のないアクセス、屋内席からの眺望は公式情報で未確認。旧市街Calle Tenorio 12にあります。アクセス・座席を問い合わせてください。テラスの眺望席は保証されません。' },
        zh: { typeBadge: '🌉 新桥景观餐饮候选', subTypeTag: '官网明确指向室外露台景观', verifyBadge: '已核对餐厅官网及菜单 · 2026-11-12', highlights: '餐厅官网称三个室外露台可眺望隆达山脉与新桥Puente Nuevo。餐厅也有室内用餐区，但未证实室内能看到同样景色。未注明日期的菜单列有蜂蜜炸茄子、洋蓟配鹅肝、伊比利亚猪肉米饭和烤乳山羊肩等。', hours: '所查官网页面未找到最新营业时间。未确认2026年11月16日（周一）营业；出发前请核实。餐厅称按到店顺序安排桌位。', seniorCaution: '官方资料未核实露台台阶、坡度、无台阶通道或室内视野。餐厅位于老城区Calle Tenorio 12。请询问通行与座位情况；不能保证分配到室外观景桌。' },
        sourceLabels: {
          ko: ['Arrabal 공식 소개·테라스 전망', 'Arrabal 공식 메뉴', 'Arrabal 공식 위치·예약 안내'],
          en: ['Arrabal official homepage and terrace views', 'Arrabal official menu', 'Arrabal official location/contact'],
          ja: ['Arrabal公式紹介・テラス眺望', 'Arrabal公式メニュー', 'Arrabal公式所在地・連絡案内'],
          zh: ['Arrabal官网露台景观介绍', 'Arrabal官方菜单', 'Arrabal官方地址与联系信息']
        }
      },
      sources: ['https://arrabalrestaurante.com/', 'https://arrabalrestaurante.com/services/', 'https://arrabalrestaurante.com/donde-comer-en-ronda-andalucia/']
    },
    {
      id: 'pc-rnd-albacara', cityId: 'ronda', cityName: '론다', cityEn: 'Ronda', typeKey: 'evening_view',
      name: { ko: 'Restaurante Albacara (알바카라)', en: 'Restaurante Albacara', ja: 'Restaurante Albacara（アルバカラ）', zh: 'Restaurante Albacara（阿尔巴卡拉）' },
      mapQuery: 'Restaurante Albacara Hotel Montelirio Ronda',
      copy: {
        ko: { typeBadge: '🌄 타호 협곡 위 식사 후보', subTypeTag: '공식 관광 자료는 Serranía 전망을 안내 · 좌석별 시야 미확인', verifyBadge: '호텔·말라가 관광청 공식 자료 확인 · 2026-11-12', highlights: 'Hotel Montelirio의 레스토랑으로, 말라가 지방 관광청은 타호 협곡 위쪽에 있으며 Serranía 전망이 있다고 소개합니다. 호텔은 론다 지역식 요리를 강조하고 해산물 미트볼, 오리 푸아그라, 새끼돼지 구이, 소금구이 농어 등을 예로 듭니다. 연결된 계절 메뉴는 현행 메뉴로 단정하지 않습니다.', hours: '공식 확인 페이지에서 월요일 및 최신 영업시간을 찾지 못했습니다. 2026-11-16(월) 운영은 미확인이며, 예약·메뉴·전망 좌석을 직접 문의하세요.', seniorCaution: '계단·경사·무단차 입구와 식당 내부/테라스의 전망 구역은 확인되지 않았습니다. 호텔 주소는 Calle Tenorio 8입니다. 부모님과 방문할 경우 차량 하차 위치·입구·좌석 접근성을 식당에 확인하세요.' },
        en: { typeBadge: '🌄 Dining above the El Tajo gorge', subTypeTag: 'Official tourism lists Serranía views; seating sightline is unclear', verifyBadge: 'Hotel and Málaga tourism sources checked · 2026-11-12', highlights: 'The restaurant is at Hotel Montelirio. Málaga provincial tourism describes it above the Tajo with views toward the Serranía. The hotel highlights local Rondeño cooking, with examples such as seafood meatballs, duck foie gras, roast suckling pig and salt-baked sea bass. A linked seasonal menu is not treated as current.', hours: 'Current or Monday hours were not found on the official pages checked. Opening on Mon 16 Nov 2026 is unconfirmed. Ask directly about hours, menu and view-facing seating.', seniorCaution: 'Steps, gradients, step-free entry and which dining areas have the view are unverified. The hotel address is Calle Tenorio 8. Ask about drop-off, entrance and seating access when traveling with older family.' },
        ja: { typeBadge: '🌄 El Tajo渓谷上の食事候補', subTypeTag: '公式観光情報はSerranía眺望を掲載・席ごとの視界は不明', verifyBadge: 'ホテル・マラガ観光公式情報を確認 · 2026-11-12', highlights: 'Hotel Montelirio内のレストラン。マラガ県観光局はタホ渓谷の上にあり、Serraníaの眺望があると紹介。ホテルはロンダ地方料理を掲げ、魚介のミートボール、鴨のフォアグラ、仔豚のロースト、塩焼きスズキなどを例示。リンクされた季節メニューは現行メニューとは断定しません。', hours: '確認した公式ページで最新・月曜営業時間を確認できませんでした。2026年11月16日（月）の営業は未確認です。営業時間・メニュー・眺望席を直接問い合わせてください。', seniorCaution: '階段・勾配・段差のない入口、眺望のある客席は未確認。ホテル住所はCalle Tenorio 8です。ご両親と訪問する場合、降車場所・入口・座席アクセスを確認してください。' },
        zh: { typeBadge: '🌄 塔霍峡谷上方用餐候选', subTypeTag: '官方旅游资料称可望隆达山脉 · 未核实具体座位视野', verifyBadge: '已核对酒店及马拉加旅游官方资料 · 2026-11-12', highlights: '餐厅位于Hotel Montelirio内。马拉加省旅游资料称其位于塔霍峡谷上方，可眺望隆达山脉。酒店介绍隆达地方料理，菜品示例包括海鲜丸子、鸭鹅肝、烤乳猪和盐焗海鲈鱼。官网链接的季节菜单不视为当前菜单。', hours: '所查官网未列最新或周一营业时间。未确认2026年11月16日（周一）营业；请直接询问营业、菜单和观景座位。', seniorCaution: '台阶、坡度、无台阶入口以及哪些用餐区有景观均未核实。酒店地址为Calle Tenorio 8。与长辈同行时，请确认下车点、入口及座位通行情况。' },
        sourceLabels: {
          ko: ['Hotel Montelirio 공식 레스토랑 안내', '말라가 지방 관광청 Albacara 안내'],
          en: ['Hotel Montelirio official restaurant page', 'Málaga provincial tourism listing'],
          ja: ['Hotel Montelirio公式レストラン案内', 'マラガ県観光局のAlbacara案内'],
          zh: ['Hotel Montelirio官方餐厅页面', '马拉加省旅游局Albacara资料']
        }
      },
      sources: ['https://www.hotelmontelirio.com/en/restaurant/', 'https://www.malaga.es/es/laprovincia/establecimientos/lis_cd-7952/restaurante-albacara-del-hotel-montelirio-establecimiento-singular']
    },
    {
      id: 'pc-rnd-parador-dining', cityId: 'ronda', cityName: '론다', cityEn: 'Ronda', typeKey: 'evening_view',
      name: { ko: 'Restaurante Parador de Ronda (파라도르 레스토랑)', en: 'Restaurante Parador de Ronda', ja: 'Restaurante Parador de Ronda', zh: 'Restaurante Parador de Ronda（龙达国营酒店餐厅）' },
      mapQuery: 'Parador de Ronda Plaza de Espana restaurant',
      copy: {
        ko: { typeBadge: '🏰 Puente Nuevo 옆 전통 안달루시아 식사', subTypeTag: '기존 파라도르 테라스 방문 후보의 식당 정보 보강', verifyBadge: 'Paradores·접근성 자료 확인 · 2026-11-12', highlights: '파라도르 운영사는 신교 옆 타호 협곡 전망 테라스에서 파노라마를 즐길 수 있다고 안내합니다. 레스토랑은 론다 산악 지역 요리·스튜·구이와 소꼬리찜, 미가스, 새끼염소 구이 등을 소개합니다. 테라스 전망은 확인되지만 실내 식당 좌석 전망은 확인되지 않았습니다.', hours: '공식 식당 페이지에서 이용 가능한 최신 운영시간을 확인하지 못했습니다. 2026-11-16(월) 영업은 미확인입니다. 방문 전 운영·메뉴·테라스 접근 및 좌석을 확인하세요.', seniorCaution: 'Tur4all은 건물 주 출입구의 보조가 필요한 경사로와 건물 엘리베이터를 안내하지만, 식당까지의 무단차 경로와 식당 내 접근성은 확인되지 않았습니다. 입구 램프 사용에 도움이 필요할 수 있습니다. 전망은 특정 테이블에서 보장되지 않습니다.' },
        en: { typeBadge: '🏰 Andalusian dining beside Puente Nuevo', subTypeTag: 'Expands the existing Parador-terrace idea; no itinerary stop added', verifyBadge: 'Paradores and access sources checked · 2026-11-12', highlights: 'The operator says the Parador beside Puente Nuevo overlooks the Tajo gorge and offers a panorama from its terrace. Its restaurant describes Ronda-highland dishes, stews and roasts, including oxtail stew, migas and roast kid. Terrace views are verified at property level, but an indoor restaurant view is not.', hours: 'Usable current hours were not found on the official restaurant page. Monday 16 Nov 2026 opening is unconfirmed. Check hours, menu, terrace access and seating before visiting.', seniorCaution: 'Tur4all lists a ramp at the main entrance that may require assistance and an elevator in the property, but a step-free route to the restaurant and restaurant-specific access are unverified. Help may be needed at the ramp. No table-specific view is guaranteed.' },
        ja: { typeBadge: '🏰 Puente Nuevo隣のアンダルシア料理', subTypeTag: '既存パラドール展望テラス案の食事情報を補足・行程追加なし', verifyBadge: 'Paradores・アクセス資料を確認 · 2026-11-12', highlights: '運営会社はPuente Nuevo隣の施設からタホ渓谷を望み、テラスでパノラマを楽しめると案内。レストランはロンダ山地の料理、煮込み・ロースト、牛テール煮込み、ミガス、仔ヤギのローストなどを紹介。テラスの眺望は施設レベルで確認できますが、屋内レストラン席からの眺望は未確認です。', hours: '公式レストランページで利用可能な最新営業時間を確認できませんでした。2026年11月16日（月）の営業は未確認。営業時間・メニュー・テラスの通行条件を確認してください。', seniorCaution: 'Tur4allは建物の正面入口に介助が必要な場合のあるスロープ、建物内エレベーターを掲載しますが、レストランまでの段差のない経路や飲食区画のアクセスは未確認。スロープで介助が必要な可能性があります。特定席の眺望は保証されません。' },
        zh: { typeBadge: '🏰 新桥旁的安达卢西亚料理', subTypeTag: '补充现有Parador露台候选的餐饮信息，不新增行程停留', verifyBadge: '已核对Paradores及通行资料 · 2026-11-12', highlights: '运营方称酒店位于新桥旁、俯瞰塔霍峡谷，露台可欣赏全景。餐厅介绍隆达山区料理、炖菜和烤肉，包括炖牛尾、面包屑炒菜migas和烤乳山羊。可确认酒店露台景观，但未证实室内餐厅座位能看到景色。', hours: '所查餐厅官网未提供可确认的最新营业时间。未确认2026年11月16日（周一）营业。到访前请确认营业、菜单、露台通行及座位。', seniorCaution: 'Tur4all称主入口有可能需要他人协助的坡道，酒店内有电梯，但未核实到餐厅的无台阶路线或餐厅内部通行情况。使用坡道可能需要帮助；不能保证具体座位有景观。' },
        sourceLabels: {
          ko: ['Paradores 파라도르 공식 숙소·테라스 안내', 'Paradores 공식 레스토랑 설명', 'Tur4all 파라도르 출입구 정보'],
          en: ['Paradores official property and terrace page', 'Paradores official restaurant description', 'Tur4all Parador entrance access listing'],
          ja: ['Paradores公式施設・テラス案内', 'Paradores公式レストラン紹介', 'Tur4allの入口アクセス情報'],
          zh: ['Paradores酒店及露台官方介绍', 'Paradores餐厅官方介绍', 'Tur4all酒店入口通行资料']
        }
      },
      sources: ['https://paradores.es/en/parador-de-ronda', 'https://paradores.es/en/restaurant-parador-de-ronda', 'https://www.tur4all.com/resources/parador-de-turismo-de-ronda']
    },
    {
      id: 'pc-grx-huerto-juan-ranas', cityId: 'granada', cityName: '그라나다', cityEn: 'Granada', typeKey: 'evening_view',
      name: { ko: 'El Huerto de Juan Ranas (엘 우에르토)', en: 'El Huerto de Juan Ranas', ja: 'El Huerto de Juan Ranas', zh: 'El Huerto de Juan Ranas（胡安·拉纳斯庭院餐厅）' },
      mapQuery: 'El Huerto de Juan Ranas Calle Atarazana Vieja 6 Granada',
      copy: {
        ko: { typeBadge: '🌇 알함브라 정면 테라스 다이닝', subTypeTag: '세 후보 중 전망 근거가 가장 명확 · 좌석별 보장은 아님', verifyBadge: '식당 공식 홈페이지·메뉴 확인 · 2026-11-12', highlights: '식당 공식 사이트는 야외 테라스가 알함브라를 마주한다고 명시합니다. 라이브 메뉴에는 공유 전채, 샐러드, 생선, 고기, 빠에야와 디저트 등이 있으며 지역·제철 식재료를 강조합니다. 실내 좌석의 전망은 확인되지 않았습니다.', hours: '2026-11-16(월) 영업 확정 아님. 공식 연락 페이지는 겨울 화–토 13:30–00:00, 테라스 페이지는 월–금 13:00–19:00(계절별 변경 가능)으로 서로 다릅니다. 날짜별 영업 및 저녁 시간 운영을 직접 확인하세요.', seniorCaution: '알바이신/산 니콜라스 인근 주소입니다. 공식 페이지에서 무단차 접근·계단·경사와 귀가 동선을 확인하지 못했습니다. 부모님과는 이동 경로와 입구를 먼저 문의하고, 전망 좌석은 별도 요청하되 보장되지 않음을 유의하세요.' },
        en: { typeBadge: '🌇 Alhambra-facing terrace dining', subTypeTag: 'Clearest documented view claim of these picks · no table guarantee', verifyBadge: 'Restaurant official site and menu checked · 2026-11-12', highlights: 'The restaurant’s official site says its outdoor terrace faces the Alhambra. Its live menu lists sharing starters, salads, fish, meat, paella and desserts, and it emphasizes local/seasonal ingredients. An Alhambra view from indoor dining rooms is not verified.', hours: 'Not confirmed for Mon 16 Nov 2026. The official contact page lists a winter Tue–Sat schedule of 13:30–00:00; the terrace page lists Mon–Fri 13:00–19:00, subject to seasonal change. Confirm date-specific service and evening hours directly.', seniorCaution: 'The address is near San Nicolás in the Albaicín. Official sources checked do not verify step-free access, stairs/gradients or a return route. Ask about the approach and entrance when traveling with older parents; request a view-facing seat but do not assume one is guaranteed.' },
        ja: { typeBadge: '🌇 アルハンブラ正面のテラスダイニング', subTypeTag: '候補中、眺望の公式根拠が最も明確・席は保証されない', verifyBadge: '店舗公式サイト・メニューを確認 · 2026-11-12', highlights: '公式サイトは屋外テラスがアルハンブラに面していると明記。ライブメニューにはシェア前菜、サラダ、魚、肉、パエリア、デザートなどがあり、地元・季節食材を重視。屋内席からの眺望は未確認です。', hours: '2026年11月16日（月）の営業は未確認。公式連絡ページは冬季火～土13:30–00:00、テラスページは月～金13:00–19:00（季節で変更）と異なります。当日営業と夜の時間帯を直接確認してください。', seniorCaution: '住所はアルバイシンのサン・ニコラス付近。公式資料で段差のないアクセス、階段・勾配、帰路は確認できません。ご両親と訪れる場合は経路と入口を問い合わせ、眺望席を希望しても保証されない点にご留意ください。' },
        zh: { typeBadge: '🌇 正对阿尔罕布拉的露台餐厅', subTypeTag: '三家中景观官方依据最明确 · 不保证具体桌位', verifyBadge: '已核对餐厅官网及菜单 · 2026-11-12', highlights: '餐厅官网明确称室外露台面向阿尔罕布拉宫。实时菜单列有分享前菜、沙拉、鱼肉、海鲜饭和甜点，并强调本地及时令食材。未核实室内座位也能看到宫殿。', hours: '未确认2026年11月16日（周一）营业。官网联系页列冬季周二至周六13:30–00:00；露台页面列周一至周五13:00–19:00，且可能随季节变化。请直接确认当日营业及晚间服务。', seniorCaution: '地址在阿尔拜辛区圣尼古拉斯附近。所查官方资料未核实无台阶通道、台阶/坡度或返程路线。与长辈同行时请先询问路线和入口；可申请观景座位，但不保证能安排。' },
        sourceLabels: {
          ko: ['Juan Ranas 공식 홈페이지·알함브라 전망', 'Juan Ranas 공식 테라스·예약 안내', 'Juan Ranas 공식 연락·시간 안내', '식당이 연결한 실시간 메뉴'],
          en: ['Juan Ranas official homepage and Alhambra view', 'Official terrace and booking page', 'Official contact and hours page', 'Restaurant-linked live menu'],
          ja: ['Juan Ranas公式サイト・アルハンブラ眺望', '公式テラス・予約案内', '公式連絡・営業時間案内', '店舗リンクのライブメニュー'],
          zh: ['Juan Ranas官网及阿尔罕布拉景观', '官网露台与预订说明', '官网联系与营业时间', '餐厅链接的实时菜单']
        }
      },
      sources: ['https://www.elhuertodejuanranas.com/en', 'https://www.elhuertodejuanranas.com/en/la-terraza-juanranas', 'https://www.elhuertodejuanranas.com/en/contact', 'https://smartmenu.agorapos.com/?id=40g7mfgg#/']
    },
    {
      id: 'pc-grx-morayma', cityId: 'granada', cityName: '그라나다', cityEn: 'Granada', typeKey: 'evening_view',
      name: { ko: 'Mirador de Morayma (미라도르 데 모라이마)', en: 'Mirador de Morayma', ja: 'Mirador de Morayma（ミラドール・デ・モライマ）', zh: 'Mirador de Morayma（莫拉伊马观景餐厅）' },
      mapQuery: 'Mirador de Morayma Calle Pianista Garcia Carrillo 2 Granada',
      copy: {
        ko: { typeBadge: '🌿 알함브라 전망 카르멘 레스토랑', subTypeTag: '테라스 정원·그라나다 전통 음식', verifyBadge: '식당 공식 홈페이지·연락 안내 확인 · 2026-11-12', highlights: '식당 공식 홈페이지는 알함브라 전망, 계단식 정원과 여러 작은 다이닝룸을 소개하고 그라나다 전통·제철·지역 식재료 요리를 안내합니다. 모든 식사 공간의 전망이나 지정 좌석은 보장되지 않습니다.', hours: '공식 연락 페이지는 화–토 13:30–00:00을 게시하고 월요일은 기재하지 않습니다. 2026-11-16(월) 영업은 확인되지 않았습니다. 예약 전 직접 확인하세요.', seniorCaution: '알바이신 지역에 있지만 공식 페이지에서 무단차 접근, 계단 수, 경사 및 좌석별 접근성은 확인되지 않았습니다. 구체적인 이동 경로를 추정하지 말고, 부모님과 방문하기 전에 차량 하차 지점·입구를 식당에 문의하세요.' },
        en: { typeBadge: '🌿 Alhambra-view carmen restaurant', subTypeTag: 'Terraced garden and traditional Granadian food', verifyBadge: 'Restaurant official pages checked · 2026-11-12', highlights: 'The official site advertises an Alhambra view, terraced gardens and several small dining rooms, and describes traditional Granadian cooking with seasonal/local produce. It does not guarantee a view from every dining area or a particular assigned table.', hours: 'The official contact page lists Tue–Sat 13:30–00:00 and no Monday hours. Opening on Mon 16 Nov 2026 is not confirmed; check directly before planning around it.', seniorCaution: 'In the Albaicín, but the official pages checked do not verify step-free access, stair count, gradients or seating access. Do not assume a route; ask the restaurant about the drop-off point and entrance before visiting with older parents.' },
        ja: { typeBadge: '🌿 アルハンブラ眺望のカルメンレストラン', subTypeTag: '段々庭園・グラナダ伝統料理', verifyBadge: '店舗公式サイト・連絡案内を確認 · 2026-11-12', highlights: '公式サイトはアルハンブラの眺望、段々の庭園、小さなダイニングルームを紹介し、地元・季節食材を使うグラナダ伝統料理を案内。すべての食事スペースや指定席からの眺望は保証されません。', hours: '公式連絡ページは火～土13:30–00:00を掲載し、月曜は記載なし。2026年11月16日（月）の営業は未確認です。訪問前に直接確認してください。', seniorCaution: 'アルバイシン地区ですが、公式ページでは段差のないアクセス、階段数、勾配、座席へのアクセスは未確認。経路を推測せず、ご両親と訪れる前に降車場所と入口を店に確認してください。' },
        zh: { typeBadge: '🌿 阿尔罕布拉景观庭院餐厅', subTypeTag: '阶梯式花园 · 格拉纳达传统料理', verifyBadge: '已核对餐厅官网及联系信息 · 2026-11-12', highlights: '餐厅官网宣传阿尔罕布拉宫景观、阶梯式花园和多个小型用餐厅，并介绍使用本地及时令食材的格拉纳达传统料理。官网未保证所有用餐区或指定桌位都有景观。', hours: '官网联系页面列周二至周六13:30–00:00，未列周一。未确认2026年11月16日（周一）营业；请直接核实。', seniorCaution: '餐厅在阿尔拜辛区，但所查官网未核实无台阶通道、台阶数量、坡度或座位通行情况。不要推测路线；与长辈同行前请向餐厅确认下车点和入口。' },
        sourceLabels: {
          ko: ['Mirador de Morayma 공식 음식·전망 안내', '공식 연락·영업시간 안내'],
          en: ['Mirador de Morayma official food and view page', 'Official contact and hours page'],
          ja: ['Mirador de Morayma公式料理・眺望案内', '公式連絡・営業時間案内'],
          zh: ['Mirador de Morayma官网料理与景观介绍', '官网联系与营业时间']
        }
      },
      sources: ['https://miradordemorayma.com/en/', 'https://miradordemorayma.com/en/contacto/']
    },
    {
      id: 'pc-grx-aben-humeya', cityId: 'granada', cityName: '그라나다', cityEn: 'Granada', typeKey: 'evening_view',
      name: { ko: 'Carmen de Aben Humeya (카르멘 데 아벤 우메야)', en: 'Carmen de Aben Humeya', ja: 'Carmen de Aben Humeya（カルメン・デ・アベン・ウメヤ）', zh: 'Carmen de Aben Humeya（阿本·乌梅亚庭院餐厅）' },
      mapQuery: 'Carmen de Aben Humeya Granada',
      copy: {
        ko: { typeBadge: '🌆 모든 테이블 알함브라 전망 표방', subTypeTag: '현대적 요리와 그라나다 전통 재해석', verifyBadge: '식당 공식 메뉴·FAQ 확인 · 2026-11-12', highlights: '식당은 모든 테이블에서 알함브라가 보인다고 공식 홈페이지에 표기합니다. 메뉴는 현대적 요리와 그라나다 전통을 결합하며 그라나다식 대구, 그라나다 치즈, 사크로몬테식 요리 등을 소개합니다. 메뉴 날짜는 표시되지 않아 당일 제공은 미확정입니다.', hours: '공식 페이지에서 월요일 또는 2026-11-16 영업시간을 확인하지 못했습니다. 방문·예약 전에 직접 확인하세요.', seniorCaution: '식당 FAQ는 접근 도로 양쪽 끝에 계단이 있고 마지막 구간은 걸어와야 한다고 안내합니다. 무단차 경로·휠체어 접근은 확인되지 않았습니다. 알바이신의 경사와 귀가 교통을 고려해 부모님과는 방문 전 이동 가능 여부를 확인하세요.' },
        en: { typeBadge: '🌆 Advertised Alhambra views from every table', subTypeTag: 'Contemporary cooking with Granadian traditions', verifyBadge: 'Restaurant official menu and FAQ checked · 2026-11-12', highlights: 'The restaurant’s official homepage says every table has an Alhambra view. Its menu combines contemporary cooking with Granada traditions and lists Granada-style cod, Granada cheese and a Sacromonte-inspired dish. The menu is undated, so current availability is not assured.', hours: 'No Monday or date-specific hours for Mon 16 Nov 2026 were found on the official pages checked. Confirm directly before visiting or reserving.', seniorCaution: 'The restaurant FAQ says the access street has stairs at both ends and the final approach is on foot. Step-free or wheelchair access is not verified. Consider Albaicín gradients and return transport; check whether the approach is suitable for older parents.' },
        ja: { typeBadge: '🌆 全テーブルからアルハンブラを望むと案内', subTypeTag: '現代料理にグラナダ伝統を取り入れる', verifyBadge: '店舗公式メニュー・FAQを確認 · 2026-11-12', highlights: '公式サイトはすべてのテーブルからアルハンブラが見えると案内。メニューは現代料理とグラナダの伝統を組み合わせ、グラナダ風タラ、グラナダチーズ、サクロモンテ風料理を掲載。メニューは日付不明のため、当日の提供は未確認です。', hours: '確認した公式ページに月曜または2026年11月16日の営業時間はありません。訪問・予約前に直接確認してください。', seniorCaution: '公式FAQによると、アクセスする通りの両端に階段があり、最後の区間は徒歩です。段差のない経路・車いすアクセスは未確認。アルバイシンの坂道と帰路の交通を考慮し、ご両親に適した経路か事前に確認してください。' },
        zh: { typeBadge: '🌆 官网称每张桌子均可眺望阿尔罕布拉', subTypeTag: '现代烹饪融合格拉纳达传统', verifyBadge: '已核对餐厅官方菜单及FAQ · 2026-11-12', highlights: '餐厅官网称每张桌子都能看到阿尔罕布拉宫。菜单将现代烹饪与格拉纳达传统结合，列有格拉纳达风味鳕鱼、格拉纳达奶酪和萨克罗蒙特风味菜式。菜单未标日期，不能保证当日供应。', hours: '所查官网未提供周一或2026年11月16日的营业时间。到访或预订前请直接核实。', seniorCaution: '餐厅FAQ称通往餐厅的街道两端都有台阶，最后一段需步行。未核实无台阶或轮椅通道。请考虑阿尔拜辛坡道和返程交通，并提前确认路线是否适合长辈。' },
        sourceLabels: {
          ko: ['Carmen de Aben Humeya 공식 전망·위치 안내', '공식 영문 메뉴', '공식 FAQ·계단 접근 안내'],
          en: ['Carmen de Aben Humeya official view/location page', 'Official English menu', 'Official FAQ and stair access note'],
          ja: ['Carmen de Aben Humeya公式眺望・所在地案内', '公式英語メニュー', '公式FAQ・階段アクセス案内'],
          zh: ['Carmen de Aben Humeya官网景观与地址', '官方英文菜单', '官网FAQ及台阶通行说明']
        }
      },
      sources: ['https://abenhumeya.com/', 'https://abenhumeya.com/carta-aben-humeya-ingles/', 'https://abenhumeya.com/faq/']
    }
  ];

  const items = window.PRACTICAL_CITY_CANDIDATES_DATA && window.PRACTICAL_CITY_CANDIDATES_DATA.items;
  const i18n = window.PRACTICAL_CANDIDATES_I18N;
  if (!Array.isArray(items) || !i18n || !i18n.items || !i18n.ui) return;
  const existingIds = new Set(items.map(item => item.id));
  entries.forEach(entry => {
    if (existingIds.has(entry.id)) return;
    const ko = entry.copy.ko;
    const sources = entry.sources.map((url, index) => ({ url, label: entry.copy.sourceLabels.ko[index] }));
    items.push({
      id: entry.id, cityId: entry.cityId, cityName: entry.cityName, cityEn: entry.cityEn,
      country: entry.cityId === 'ronda' ? '스페인' : '스페인', flag: '🇪🇸', name: entry.name.ko,
      categoryKey: 'restaurant', typeKey: entry.typeKey, typeColor: entry.typeKey,
      typeBadge: ko.typeBadge, subTypeTag: ko.subTypeTag, isOneStopRecommended: false, oneStopReason: '',
      highlights: ko.highlights, hours: ko.hours, verifyNotice: ko.verifyBadge, seniorCaution: ko.seniorCaution,
      broadcastNote: '', sources, verifiedDate: '2026-11-12 확인', mapQuery: entry.mapQuery
    });
    i18n.items[entry.id] = {};
    ['en', 'ja', 'zh'].forEach(lang => {
      const copy = entry.copy[lang];
      i18n.items[entry.id][lang] = {
        name: entry.name[lang], typeBadge: copy.typeBadge, subTypeTag: copy.subTypeTag,
        verifyBadge: copy.verifyBadge, highlights: copy.highlights, hours: copy.hours,
        seniorCaution: copy.seniorCaution, broadcastNote: '', oneStopReason: '', sourceLabels: entry.copy.sourceLabels[lang]
      };
    });
  });

  const ui = {
    ko: {
      mainTitle: '🗂️ 35개 도시별 맛집·시장·전망·문화 후보', subnavCandidates: '✨ 도시별 추가 후보 (35선)',
      mainDesc: '기존 일정에 식당을 추가하거나 예약하지 않고, 공식 근거가 확인된 도시별 후보를 보강했습니다. 론다는 전통 타파스와 지역 요리, 누에보 다리·타호 전망 식당을 구분하고, 그라나다는 알함브라 전망을 식사와 함께 즐길 후보를 담았습니다. 2026년 11월 16일(월) 영업은 어느 후보도 날짜별로 확정되지 않았으므로 직접 확인하세요. 부모님과 동행할 때는 계단·경사·좌석별 전망 조건을 미리 문의하세요.',
      emptyDesc: '도시나 유형 필터를 초기화하면 8개 도시의 추가 후보 35곳을 확인할 수 있습니다.', resultCountSuffix: '/ 전체 35개 후보',
      dedupSummary: '✅ <strong>중복 대조:</strong> 론다의 Parador는 기존 Puente Nuevo 산책·테라스 언급을 식당 정보로 확장한 후보이며 새 일정이 아닙니다. 그라나다의 San Nicolás·San Cristóbal 전망지와 별개로, 식당 자체가 알함브라 전망을 안내하는 세 후보를 추가했습니다.',
      cityFilterLabel: '📍 도시별 바로 찾기 (8개 도시)',
      cities: { ronda: '🇪🇸 론다' }, cityEnMap: { ronda: 'Ronda' }
    },
    en: {
      mainTitle: '🗂️ 35 City Picks: Dining, Markets, Views & Culture', subnavCandidates: '✨ 35 Added City Dining, Market, View & Cultural Candidates',
      mainDesc: 'This adds source-backed city candidates without changing the itinerary or making a booking. Ronda’s traditional tapas/local cooking is separated from Puente Nuevo–Tajo view dining; Granada’s picks are restaurants that themselves advertise an Alhambra view. No venue is confirmed open for Monday 16 November 2026. Check directly, and ask about steps, gradients and view-facing seats when traveling with older parents.',
      emptyDesc: 'Reset filters to view all 35 additional candidates across 8 cities.', resultCountSuffix: 'of 35 candidates',
      dedupSummary: '✅ <strong>Deduplication:</strong> The Parador card expands the existing Puente Nuevo walk/terrace mention; it is not a new itinerary stop. Three Granada restaurants advertise an Alhambra view and are separate from the existing San Nicolás and San Cristóbal viewpoints.',
      cityFilterLabel: '📍 Filter by City (8 Cities)',
      cities: { ronda: '🇪🇸 Ronda' }, cityEnMap: { ronda: 'Ronda' }
    },
    ja: {
      mainTitle: '🗂️ 都市別候補35選：飲食・市場・眺望・文化', subnavCandidates: '✨ 都市別追加候補（35件）',
      mainDesc: '既存行程を変更したり予約したりせず、公式根拠のある候補を追加。ロンダでは伝統タパス・郷土料理とPuente Nuevo／タホ渓谷の眺望レストランを分け、グラナダでは店舗自身がアルハンブラ眺望を案内する候補を紹介します。2026年11月16日（月）の営業はどの店も日付指定で確認できていません。ご両親と訪れる場合は階段・坂道・眺望席を事前に確認してください。',
      emptyDesc: 'フィルターを解除すると8都市35件の追加候補を確認できます。', resultCountSuffix: '/ 全35候補',
      dedupSummary: '✅ <strong>重複照合:</strong> Paradorは既存のPuente Nuevo散策・テラス案内を食事情報で補足するもので、新しい行程ではありません。グラナダでは既存のSan Nicolás・San Cristóbal展望地とは別に、店舗がアルハンブラ眺望を案内する3店を追加。',
      cityFilterLabel: '📍 都市別に探す（8都市）',
      cities: { ronda: '🇪🇸 ロンダ' }, cityEnMap: { ronda: 'Ronda' }
    },
    zh: {
      mainTitle: '🗂️ 8城35处新增美食、市场、观景与文化候选', subnavCandidates: '✨ 按城市新增候选（35处）',
      mainDesc: '本次补充有官方资料支持的城市候选，不改动行程，也未预订。龙达部分区分传统Tapas/地方菜与新桥、塔霍峡谷景观餐厅；格拉纳达推荐餐厅自身明确宣传阿尔罕布拉宫景观。所有店都未确认2026年11月16日（周一）当天营业。陪同长辈时请提前询问台阶、坡度及观景桌位。',
      emptyDesc: '重置筛选即可查看8座城市的全部35处新增候选。', resultCountSuffix: '/ 共35处候选',
      dedupSummary: '✅ <strong>查重说明：</strong>Parador卡片是对现有新桥步行/露台提及的餐饮信息补充，并非新增行程停留。格拉纳达新增三家自称可望阿尔罕布拉宫的餐厅，与现有圣尼古拉斯、圣克里斯托瓦尔观景点不同。',
      cityFilterLabel: '📍 按城市筛选（8城）',
      cities: { ronda: '🇪🇸 龙达' }, cityEnMap: { ronda: 'Ronda' }
    }
  };
  const candidateCount = String(items.length);
  const cityCount = String(new Set(items.map(item => item.cityId)).size);
  for (const lang of langs) {
    const localized = ui[lang];
    localized.mainTitle = localized.mainTitle.replace(/35/g, candidateCount).replace(/8/g, cityCount);
    localized.subnavCandidates = localized.subnavCandidates.replace(/35/g, candidateCount);
    localized.emptyDesc = localized.emptyDesc.replace(/35/g, candidateCount).replace(/8/g, cityCount);
    localized.resultCountSuffix = localized.resultCountSuffix.replace(/35/g, candidateCount);
    localized.cityFilterLabel = localized.cityFilterLabel.replace(/8/g, cityCount);
  }
  langs.forEach(lang => Object.assign(i18n.ui[lang], ui[lang]));
  i18n.ui.ko.cityEnMap.granada = 'Granada';
  i18n.ui.en.cities.ronda = '🇪🇸 Ronda';
  i18n.ui.ja.cities.ronda = '🇪🇸 ロンダ';
  i18n.ui.zh.cities.ronda = '🇪🇸 龙达';
  i18n.ui.ko.cities.ronda = '🇪🇸 론다';
  i18n.ui.ko.cityEnMap.ronda = 'Ronda';
  i18n.ui.en.cityEnMap.ronda = 'Ronda';
  i18n.ui.ja.cityEnMap.ronda = 'Ronda';
  i18n.ui.zh.cityEnMap.ronda = 'Ronda';

  const rondaBaseline = window.PRACTICAL_CITY_CANDIDATES_DATA.deduplicationBaseline;
  const rondaExisting = rondaBaseline.find(row => row.cityId === 'ronda');
  if (!rondaExisting) {
    rondaBaseline.push({
      cityId: 'ronda', cityName: '론다', flag: '🇪🇸', stayInfo: '기존 계획에 포함된 론다 당일치기 후보 · 새 일정 아님',
      existingItems: 'Puente Nuevo · El Tajo · Parador terrace (기존 명소·산책 언급)',
      addedSummary: '현지식 후보 El Lechuguita·Tragatá·Casa María와 전망 식당 후보 Arrabal·Albacara·Parador를 추가 정보로 보강. Parador 카드는 기존 명소 언급의 식당 정보 확장입니다.'
    });
  }
  if (!i18n.dedup.ronda) i18n.dedup.ronda = {
    en: { city: '🇪🇸 Ronda · existing optional day-trip', existing: 'Puente Nuevo · El Tajo · Parador terrace already mentioned', added: 'Adds local-food candidates El Lechuguita, Tragatá and Casa María, plus view-dining details for Arrabal, Albacara and the Parador. The Parador card expands an existing mention; it is not a new stop.' },
    ja: { city: '🇪🇸 ロンダ・既存の日帰り候補', existing: 'Puente Nuevo・El Tajo・Paradorテラスは既に言及', added: '郷土料理候補El Lechuguita、Tragatá、Casa Maríaと、眺望食事候補Arrabal、Albacara、Paradorの情報を補足。Paradorは既存案内の拡張で、新しい立ち寄り先ではありません。' },
    zh: { city: '🇪🇸 龙达 · 现有一日游候选', existing: '已提及Puente Nuevo、新桥峡谷El Tajo及Parador露台', added: '补充El Lechuguita、Tragatá、Casa María地方菜候选，以及Arrabal、Albacara和Parador景观用餐信息。Parador卡片扩展现有介绍，不是新增行程停留。' }
  };
  const granadaBaseline = rondaBaseline.find(row => row.cityId === 'granada');
  if (granadaBaseline && !granadaBaseline.addedSummary.includes('El Huerto de Juan Ranas')) {
    granadaBaseline.addedSummary += ' · Alhambra-view restaurants: El Huerto de Juan Ranas, Mirador de Morayma, Carmen de Aben Humeya (separate from San Nicolás viewpoint)';
  }
  if (i18n.dedup.granada) {
    const added = {
      en: ' · Alhambra-view dining: El Huerto de Juan Ranas, Mirador de Morayma, Carmen de Aben Humeya (separate from viewpoints)',
      ja: ' · アルハンブラ眺望レストラン：El Huerto de Juan Ranas、Mirador de Morayma、Carmen de Aben Humeya（展望地とは別）',
      zh: ' · 阿尔罕布拉景观餐厅：El Huerto de Juan Ranas、Mirador de Morayma、Carmen de Aben Humeya（与观景点区分）'
    };
    langs.slice(1).forEach(lang => { if (i18n.dedup.granada[lang]) i18n.dedup.granada[lang].added += added[lang]; });
  }

  function includesAny(text, words) { return words.some(word => text.includes(word)); }
  function escapeHtml(value) {
    return String(value == null ? '' : value).replace(/[&<>"']/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));
  }
  window.buildRondaGranadaDiningChatResponse = function (query, lang) {
    const q = String(query || '').toLowerCase();
    const l = langs.includes(lang) ? lang : 'ko';
    const rondaNames = ['lechuguita', 'tragata', 'tragatá', 'casa maria', 'casa maría', 'arrabal', 'albacara', 'parador de ronda'];
    const granadaNames = ['juan ranas', 'morayma', 'aben humeya'];
    const isRonda = includesAny(q, ['ronda', '론다', 'ロンダ', '龙达', 'puente nuevo', 'el tajo']) || includesAny(q, rondaNames);
    const isGranada = includesAny(q, ['granada', '그라나다', 'グラナダ', '格拉纳达', 'alhambra', '알함브라', 'アルハンブラ', '阿尔罕布拉', 'san nicol', '산 니콜라스', '圣尼古拉斯']) || includesAny(q, granadaNames);
    const foodIntent = includesAny(q, ['restaurant', 'dining', 'food', 'eat', 'tapas', 'menu', 'where to eat', '맛집', '식당', '음식', '먹거리', '타파스', 'レストラン', '料理', '食事', 'グルメ', '餐厅', '美食', '吃饭', '塔帕斯']);
    const viewIntent = includesAny(q, ['view', 'sunset', 'night', 'terrace', 'puente nuevo', 'el tajo', 'tajo', 'gorge', 'alhambra', 'san nicol', '전망', '일몰', '노을', '야경', '테라스', '협곡', '누에보', '알함브라', '산 니콜라스', '眺望', '夕日', '夕景', '夜景', 'テラス', '展望', '峡谷', '日落', '夜景', '观景', '露台', '峡谷']);
    if ((!isRonda && !isGranada) || (!foodIntent && !viewIntent)) return null;
    let selectedIds, cityId, title, note, filterType;
    if (isGranada && viewIntent) {
      cityId = 'granada';
      selectedIds = ['pc-grx-huerto-juan-ranas', 'pc-grx-aben-humeya', 'pc-grx-morayma'];
      title = { ko: '🌇 그라나다 알함브라 전망 저녁 식당 후보', en: '🌇 Granada dining with Alhambra views', ja: '🌇 グラナダのアルハンブラ眺望レストラン', zh: '🌇 格拉纳达阿尔罕布拉景观餐厅' }[l];
      note = { ko: '가장 명확한 테라스 전망 근거는 El Huerto de Juan Ranas입니다. 다만 2026년 11월 16일 월요일 영업은 세 곳 모두 확정되지 않았고, Carmen de Aben Humeya는 접근로 양끝 계단과 마지막 도보 구간이 공식 FAQ에 적혀 있습니다.', en: 'El Huerto de Juan Ranas has the clearest documented terrace sightline. None is confirmed open for Monday 16 Nov 2026; Carmen de Aben Humeya’s FAQ notes stairs at both ends of the access street and a final walk.', ja: 'テラスの眺望根拠が最も明確なのはEl Huerto de Juan Ranasです。3店とも2026年11月16日（月）の営業は未確認。Carmen de Aben Humeyaはアクセス道路両端の階段と最後の徒歩区間を公式FAQで案内しています。', zh: 'El Huerto de Juan Ranas的露台景观官方依据最明确。三家均未确认2026年11月16日（周一）营业；Carmen de Aben Humeya的FAQ明确提示通道两端有台阶，最后一段需步行。' }[l];
      filterType = 'evening_view';
    } else if (isRonda && viewIntent) {
      cityId = 'ronda';
      selectedIds = ['pc-rnd-arrabal', 'pc-rnd-parador-dining', 'pc-rnd-albacara'];
      title = { ko: '🌉 론다 Puente Nuevo·타호 전망 식당 후보', en: '🌉 Ronda dining with Puente Nuevo / El Tajo views', ja: '🌉 ロンダのPuente Nuevo・El Tajo眺望レストラン', zh: '🌉 龙达新桥与塔霍峡谷景观餐厅' }[l];
      note = { ko: '야외 테라스의 다리 전망을 공식적으로 명시한 곳은 Arrabal입니다. Parador·Albacara도 전망 근거가 있으나 식당 내 특정 좌석의 시야는 보장되지 않습니다. 월요일 운영과 접근성은 방문 전 확인하세요.', en: 'Arrabal explicitly documents Puente Nuevo views from its outdoor terraces. Parador and Albacara have view evidence too, but no specific restaurant seat is guaranteed. Confirm Monday hours and access.', ja: 'Arrabalは屋外テラスからPuente Nuevoを望むと公式に明記。ParadorとAlbacaraにも眺望資料がありますが、特定席の視界は保証されません。月曜営業とアクセスを確認してください。', zh: 'Arrabal官网明确称室外露台可望新桥。Parador和Albacara也有景观依据，但不能保证餐厅具体桌位的视野。请确认周一营业与通行条件。' }[l];
      filterType = 'evening_view';
    } else if (isRonda) {
      cityId = 'ronda';
      selectedIds = ['pc-rnd-lechuguita', 'pc-rnd-tragata', 'pc-rnd-casa-maria'];
      title = { ko: '🥘 론다 전통 음식·타파스 식당 후보', en: '🥘 Ronda local-food and tapas ideas', ja: '🥘 ロンダの郷土料理・タパス候補', zh: '🥘 龙达地方菜与Tapas餐厅' }[l];
      note = { ko: '지역 음식 예시로 론다 초리소·병아리콩 요리와 시장 제철 식재료를 확인했습니다. El Lechuguita는 예약을 받지 않으며 월요일 시간이 공식 자료끼리 충돌합니다. 전망이 목적이면 별도의 Arrabal·Parador·Albacara 후보를 확인하세요.', en: 'Verified local-food examples include Ronda chorizo, chickpea dishes and seasonal market cooking. El Lechuguita does not take reservations, and its published Monday hours conflict. For views, see the separate Arrabal, Parador and Albacara candidates.', ja: 'ロンダ産チョリソ、ひよこ豆料理、市場の季節食材が確認できました。El Lechuguitaは予約不可で、月曜営業時間の公式情報が食い違います。眺望が目的ならArrabal、Parador、Albacaraの候補もご覧ください。', zh: '已核实的地方菜例子包括龙达香肠、鹰嘴豆菜式和时令市场食材。El Lechuguita不接受预订，官网与旅游局的周一时间冲突。如想看景，可另看Arrabal、Parador和Albacara。' }[l];
      filterType = 'evening_food_hall';
    } else return null;
    const itemMap = new Map(items.map(item => [item.id, item]));
    const cards = selectedIds.map(id => {
      const item = itemMap.get(id);
      if (!item) return '';
      const trans = (i18n.items[id] && i18n.items[id][l]) || {};
      const name = trans.name || item.name;
      const desc = trans.highlights || item.highlights;
      const hours = trans.hours || item.hours;
      const links = item.sources.slice(0, 2).map((src, index) => {
        const label = trans.sourceLabels && trans.sourceLabels[index] ? trans.sourceLabels[index] : src.label;
        return `<a href="${escapeHtml(src.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(label)} ↗</a>`;
      }).join(' · ');
      return `<li><strong>${escapeHtml(name)}</strong> — ${escapeHtml(desc)}<br><small>${escapeHtml(hours)}</small><br><small>${links}</small></li>`;
    }).join('');
    const action = {
      ko: '도시별 후보 카드 보기', en: 'Open the city candidate cards', ja: '都市別候補カードを見る', zh: '查看城市候选卡片'
    }[l];
    return `<div class="chat-curated-answer"><strong>${escapeHtml(title)}</strong><ul>${cards}</ul><p>${escapeHtml(note)}</p><button type="button" class="chat-quick-chip" onclick="filterPracticalCandidatesCity('${cityId}');filterPracticalCandidatesType('${filterType}');document.getElementById('practical-city-candidates')?.scrollIntoView({behavior:'smooth',block:'start'})">${escapeHtml(action)} ↗</button></div>`;
  };
})();
