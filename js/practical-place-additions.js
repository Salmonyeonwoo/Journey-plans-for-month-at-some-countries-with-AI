/* Supplemental practical-place cards and source-backed refinements.
 * Loaded after data.js; does not modify the confirmed day-by-day itinerary or saved settings.
 */
(function () {
  const locales = ['ko', 'en', 'ja', 'zh'];
  const sourceById = {
    'pc-bcn-sant-pau': [
      ['Sant Pau official free-visit guide', 'https://santpaubarcelona.org/en/visita/visita-lliure/'],
      ['Sant Pau official visit preparation and accessibility', 'https://santpaubarcelona.org/en/prepara-la-teva-visita/']
    ],
    'pc-svq-setas-rooftop': [
      ['Setas de Sevilla official FAQ', 'https://setasdesevilla.com/en/preguntas-frecuentes/'],
      ['tvN Joy — The Thrifters on Tour EP.106', 'https://www.youtube.com/watch?v=eWzxTH4PTCE']
    ],
    'pc-svq-duenas': [
      ['Palacio de las Dueñas official visit route', 'https://www.lasduenas.es/en/post/la-visita-a-las-duenas'],
      ['Palacio de las Dueñas visitor information', 'https://www.lasduenas.es/en/info-al-visitante']
    ],
    'pc-grx-chikito': [
      ['Restaurante Chikito official website', 'https://restaurantechikito.com/en/'],
      ['Restaurante Chikito official history', 'https://restaurantechikito.com/en/history/'],
      ['KBS Spain travel clip (Granada context only)', 'https://www.youtube.com/watch?v=gIUbLpUK0D0']
    ],
    'pc-agp-picasso-museum': [
      ['Museo Picasso Málaga official visitor information', 'https://www.museopicassomalaga.org/en/visita'],
      ['KBS Walking Around the World — Picasso Museum in Málaga', 'https://www.youtube.com/watch?v=EvVjIKxpIvo']
    ],
    'pc-flr-davanzati': [
      ['Bargello Museums official Palazzo Davanzati guide', 'https://bargellomusei.it/en/museum/palazzo-davanzati/'],
      ['FeelFlorence official Palazzo Davanzati information', 'https://www.feelflorence.it/en/points-interest/museo-di-palazzo-davanzati']
    ],
    'pc-rom-orange-garden': [
      ['Turismo Roma official Orange Garden guide', 'https://www.turismoroma.it/en/places/savello-park-or-orange-garden'],
      ['EBS World Trip replay (Aventine garden; exact site not confirmed)', 'https://home.ebs.co.kr/worldtrip/replayView?siteCd=KH&courseId=BP0PAPD0000000013&stepId=60057411&lectId=60438138']
    ]
  };

  const placeCopy = {
    'pc-bcn-sant-pau': {
      ko: {
        name: 'Recinte Modernista de Sant Pau (산트 파우 모더니스타 단지)',
        typeBadge: '🏛️ 모더니스타 건축 단지 · 자유 관람',
        subTypeTag: '자유 관람 약 45~60분 · 사그라다 파밀리아와는 별도 방문 후보',
        verifyBadge: '방문 전 확인 · 공간 이용 가능 여부 변동 가능',
        highlights: '지도와 각 공간의 안내를 따라 도메네크 이 몬타네르의 모더니스타 건축 단지를 자유 관람할 수 있습니다. 공식 안내 기준 관람은 약 45~60분이며, 방문 동선은 공간 이용 가능 여부에 따라 바뀔 수 있습니다.',
        hours: '11~3월 09:30~17:00 (마지막 입장 16:30) · 4~10월 09:30~18:30 (마지막 입장 18:00) · 12월 25일 휴관. 공식 페이지 안내 요금은 14:00 전 €18, 이후 €17이며 방문 전에 재확인하세요.',
        seniorCaution: '공식 준비 안내는 접근 가능한 입구와 방문 동선의 접근성을 설명하고 촉각 지도·점자 안내도 제공합니다. 다만 계단·경사 및 구간별 이동 조건은 세부적으로 밝히지 않으므로 필요한 접근 조건은 방문 전 장소에 확인하세요.',
        broadcastNote: ''
      },
      en: {
        name: 'Recinte Modernista de Sant Pau',
        typeBadge: '🏛️ Modernist complex · self-guided visit',
        subTypeTag: 'About 45–60 minutes · separate from Sagrada Família',
        verifyBadge: 'Check before visiting · access may vary by space',
        highlights: 'Explore Domènech i Montaner’s Modernist complex with the visitor map and on-site guidance. The official guide estimates 45–60 minutes; the route may change depending on space availability.',
        hours: 'Nov–Mar 09:30–17:00 (last entry 16:30) · Apr–Oct 09:30–18:30 (last entry 18:00) · closed Dec 25. The official page lists €18 before 14:00 and €17 afterward; reconfirm before visiting.',
        seniorCaution: 'The official preparation guide describes an accessible entrance and visitor route, and lists tactile maps and Braille information. It does not detail stairs, gradients or conditions in each area; contact the venue ahead if those details matter.',
        broadcastNote: ''
      },
      ja: {
        name: 'Recinte Modernista de Sant Pau（サン・パウ・モダニスタ地区）',
        typeBadge: '🏛️ モダニズム建築群・自由見学',
        subTypeTag: '所要約45～60分・サグラダ・ファミリアとは別の訪問候補',
        verifyBadge: '訪問前に確認・利用可能な空間は変更の場合あり',
        highlights: 'ドメネク・イ・モンタネール設計のモダニズム建築群を、公式マップと現地案内に沿って自由見学できます。公式案内の所要時間は約45～60分で、見学ルートは空間の利用状況により変更される場合があります。',
        hours: '11～3月 09:30～17:00（最終入場16:30）・4～10月 09:30～18:30（最終入場18:00）・12月25日休館。公式ページ掲載料金は14時前€18、14時以降€17。訪問前に再確認してください。',
        seniorCaution: '公式の訪問準備案内は、アクセス可能な入口と見学ルートを案内し、触知図や点字案内も紹介しています。一方、階段・勾配・各区画の移動条件は詳しく記載されていないため、必要な条件は事前に施設へ確認してください。',
        broadcastNote: ''
      },
      zh: {
        name: 'Recinte Modernista de Sant Pau（圣保罗现代主义建筑群）',
        typeBadge: '🏛️ 现代主义建筑群 · 自助参观',
        subTypeTag: '约45–60分钟 · 与圣家堂为不同参观点',
        verifyBadge: '到访前请核实 · 部分空间开放情况可能变化',
        highlights: '可按照官方地图和现场说明，自助参观多梅内克·蒙塔内尔设计的现代主义建筑群。官方建议游览约45–60分钟；参观路线可能因空间开放情况而调整。',
        hours: '11月至3月 09:30–17:00（16:30停止入场）· 4月至10月 09:30–18:30（18:00停止入场）· 12月25日闭馆。官网标示14:00前€18、14:00后€17，出发前请再次核实。',
        seniorCaution: '官方参观准备指南说明入口及参观路线可供无障碍通行，并提供触觉地图和盲文信息；但未详列台阶、坡度或各区域的具体通行条件。如有特定需求，请提前联系场馆确认。',
        broadcastNote: ''
      },
      sourceLabels: {
        ko: ['산트 파우 공식 자유 관람 안내', '산트 파우 공식 방문 준비·접근성 안내'],
        en: ['Sant Pau official free-visit guide', 'Sant Pau official visit preparation and accessibility'],
        ja: ['サン・パウ公式自由見学案内', 'サン・パウ公式訪問準備・アクセシビリティ案内'],
        zh: ['圣保罗官方自由参观指南', '圣保罗官方参观准备与无障碍信息']
      }
    },
    'pc-svq-setas-rooftop': {
      ko: {
        name: 'Setas de Sevilla (Metropol Parasol) · 지붕 전망 산책로',
        typeBadge: '🎟️ 유료 전망 산책로 · 기존 무료 광장 산책과 구분',
        subTypeTag: '지하층에서 표 구매 후 엘리베이터로 지붕 이동',
        verifyBadge: '방문 전 공식 FAQ 확인 · 접근 세부정보 미확인',
        highlights: '이미 일정에 있는 무료 야외 광장 산책과 구별되는 전망대 방문 후보입니다. 공식 FAQ는 Antiquarium 입구 옆 지하층에서 표를 구매한 뒤 엘리베이터로 지붕에 올라가는 동선을 안내합니다.',
        hours: '확인한 공식 FAQ에서 최신 운영시간·요금은 확정하지 않았습니다. 티켓 조건과 방문 당일 운영을 공식 FAQ에서 확인하세요.',
        seniorCaution: 'FAQ에는 이동이 불편한 방문객의 접근성 질문이 있으나 확인 가능한 답변은 없습니다. 엘리베이터 안내 외에 경사·계단·지붕 구간의 휠체어 접근은 확인되지 않아 방문 전 장소에 확인하세요. 60대 부모님과 저녁에 방문한다면 귀가 교통을 미리 계획하고 어두운 시간의 장거리 보행을 전제로 하지 마세요.',
        broadcastNote: '방송 출처 확인: tvN Joy의 「더 짠내투어」 EP.106 영상 제목에 세비야 메트로폴 파라솔이 언급됩니다. 영상 링크는 아래 출처에 있으며, 제목에서 확인되는 범위를 넘는 장면·출연자 정보는 단정하지 않습니다.'
      },
      en: {
        name: 'Setas de Sevilla (Metropol Parasol) · Rooftop Walkway',
        typeBadge: '🎟️ Ticketed rooftop visit · distinct from the free plaza stroll',
        subTypeTag: 'Buy a ticket downstairs, then take the elevator to the roof',
        verifyBadge: 'Check the official FAQ · access details unconfirmed',
        highlights: 'This is a rooftop-observation visit, distinct from the free outdoor plaza stroll already mentioned in the itinerary. The official FAQ directs visitors to buy tickets on the lower level beside the Antiquarium entrance, then take the elevator to the roof.',
        hours: 'The official FAQ checked here did not establish current opening hours or prices. Confirm ticket terms and same-day operations on the official FAQ.',
        seniorCaution: 'The FAQ includes a question about access for visitors with reduced mobility, but no answer was visible. Apart from the elevator instruction, gradients, stairs and wheelchair access on the rooftop route are unconfirmed; contact the venue before visiting. With parents in their 60s, plan return transport if visiting in the evening and do not assume a long after-dark walk.',
        broadcastNote: 'Broadcast source: the title of tvN Joy’s The Thrifters on Tour EP.106 names Metropol Parasol in Seville. The linked clip is below; no details beyond what the title supports are asserted.'
      },
      ja: {
        name: 'Setas de Sevilla（メトロポール・パラソル）・屋上展望ルート',
        typeBadge: '🎟️ 有料の屋上見学・既存の無料広場散策とは別',
        subTypeTag: '地下階でチケット購入後、エレベーターで屋上へ',
        verifyBadge: '公式FAQを確認・アクセス詳細は未確認',
        highlights: '行程に記載済みの無料屋外広場散策とは区別した、屋上展望の訪問候補です。公式FAQは、アンティクアリウム入口横の地下階でチケットを購入し、エレベーターで屋上へ上がる方法を案内しています。',
        hours: '確認した公式FAQでは、最新の営業時間・料金を確定できませんでした。チケット条件と当日の運営状況を公式FAQで確認してください。',
        seniorCaution: 'FAQには移動に不自由のある方のアクセスに関する質問がありますが、確認できる回答はありません。エレベーターの案内以外、勾配・階段・屋上ルートの車いす利用可否は未確認のため、訪問前に施設へ確認してください。60代のご両親と夕方以降に訪れる場合は、帰路の交通手段を事前に計画し、暗くなってからの長距離歩行を前提にしないでください。',
        broadcastNote: '放送出典：tvN Joy「더 짠내투어」EP.106の動画タイトルに、セビリアのメトロポール・パラソルが記載されています。動画リンクは下記の出典に掲載しています。タイトルで確認できる範囲を超える内容は断定していません。'
      },
      zh: {
        name: 'Setas de Sevilla（都市阳伞）· 屋顶观景步道',
        typeBadge: '🎟️ 需购票的屋顶参观 · 区别于已列出的免费广场漫步',
        subTypeTag: '先在地下层购票，再乘电梯上屋顶',
        verifyBadge: '请查阅官方FAQ · 无障碍细节未确认',
        highlights: '这是屋顶观景参观，与行程中已提到的免费户外广场漫步不同。官方FAQ指引游客到Antiquarium入口旁的地下层购票，再乘电梯上屋顶。',
        hours: '本次查阅的官方FAQ未能确认最新开放时间和票价。请通过官方FAQ核实票务条件和到访当天的运营情况。',
        seniorCaution: 'FAQ列有行动不便访客的通行问题，但可查看内容中没有答案。除电梯说明外，屋顶路线的坡度、台阶和轮椅通行情况均未确认；到访前请联系场馆。陪同60多岁父母傍晚前往时，请提前安排返程交通，不要预设天黑后仍适合长距离步行。',
        broadcastNote: '节目来源说明：tvN Joy《더 짠내투어》第106集视频标题提到塞维利亚都市阳伞。链接见下方来源；不对标题未能证明的具体镜头或出演者作出断言。'
      },
      sourceLabels: {
        ko: ['Setas 공식 FAQ', 'tvN Joy 「더 짠내투어」 EP.106 직접 영상'],
        en: ['Setas official FAQ', 'Direct tvN Joy clip — The Thrifters on Tour EP.106'],
        ja: ['Setas公式FAQ', 'tvN Joy「더 짠내투어」EP.106の動画'],
        zh: ['Setas官方常见问题', 'tvN Joy《더 짠내투어》第106集视频']
      }
    },
    'pc-svq-duenas': {
      ko: {
        name: 'Palacio de las Dueñas (두에냐스 궁전)',
        typeBadge: '🏛️ 세비야 궁전 주택·정원',
        subTypeTag: '일반 관람 약 90분 · 일부 공간 비공개',
        verifyBadge: '방문 전 확인 · 계단·접근 조건 문의 권장',
        highlights: '정원에서 관람을 시작해 공개된 1층 생활 공간과 정원·중정·예배당 등을 둘러보는 궁전 주택입니다. 현재 거주 공간인 주방과 위층은 공개되지 않으며, 공식 일반 관람 안내는 약 90분을 제시합니다.',
        hours: '운영시간·입장료는 방문일에 바뀔 수 있으므로 공식 방문자 안내에서 최신 정보를 확인하세요.',
        seniorCaution: '공식 동선 목록에 “LADDER” 구간이 표시되지만 계단의 위치·개수·대체 동선은 설명되지 않습니다. 휠체어 접근 여부도 확인되지 않아 방문 전 궁전에 문의하세요.',
        broadcastNote: ''
      },
      en: {
        name: 'Palacio de las Dueñas',
        typeBadge: '🏛️ Seville palace house and gardens',
        subTypeTag: 'About 90 minutes · some rooms are private',
        verifyBadge: 'Check before visiting · ask about stairs and access',
        highlights: 'The visit begins in the garden and continues through the publicly accessible ground-floor rooms, gardens, courtyards and chapel. The kitchen and upper floor remain private; the official visitor information suggests about 90 minutes.',
        hours: 'Opening hours and admission can change; check the current official visitor information before going.',
        seniorCaution: 'The official route list includes a “LADDER” section, but gives no location, number of steps or alternative route. Wheelchair access is also not confirmed; contact the palace before visiting.',
        broadcastNote: ''
      },
      ja: {
        name: 'Palacio de las Dueñas（ドゥエニャス宮殿）',
        typeBadge: '🏛️ セビリアの宮殿住宅と庭園',
        subTypeTag: '所要約90分・非公開の部屋あり',
        verifyBadge: '訪問前に確認・階段とアクセス条件を問い合わせ',
        highlights: '庭園から見学を始め、公開されている1階の居室、庭園、中庭、礼拝堂などを巡ります。現在も居住空間として使われている台所と上階は非公開で、公式案内の一般見学所要時間は約90分です。',
        hours: '営業時間・入場料は変更される場合があります。訪問前に公式の来館者案内で最新情報を確認してください。',
        seniorCaution: '公式ルート一覧には「LADDER」の区間がありますが、場所・段数・代替ルートは説明されていません。車いす利用の可否も未確認のため、訪問前に宮殿へ問い合わせてください。',
        broadcastNote: ''
      },
      zh: {
        name: 'Palacio de las Dueñas（杜埃尼亚斯宫）',
        typeBadge: '🏛️ 塞维利亚宫邸与庭园',
        subTypeTag: '约90分钟 · 部分房间不对外开放',
        verifyBadge: '到访前请核实 · 建议咨询台阶和通行条件',
        highlights: '参观从花园开始，沿路线游览对外开放的一层居室、花园、中庭和礼拜堂等。仍作居住空间使用的厨房和上层不开放；官方一般参观建议约90分钟。',
        hours: '开放时间和门票可能变化，出发前请查阅官方访客信息。',
        seniorCaution: '官方参观路线列有“LADDER”一段，但未说明位置、台阶数量或替代路线；轮椅通行情况也未确认。到访前请联系宫殿咨询。',
        broadcastNote: ''
      },
      sourceLabels: {
        ko: ['두에냐스 궁전 공식 관람 동선', '두에냐스 궁전 공식 방문자 정보'],
        en: ['Official Palacio de las Dueñas visit route', 'Official visitor information'],
        ja: ['ドゥエニャス宮殿公式見学ルート', '公式来館者案内'],
        zh: ['杜埃尼亚斯宫官方参观路线', '官方访客信息']
      }
    },
    'pc-grx-chikito': {
      ko: {
        name: 'Restaurante Chikito (레스토랑 치키토)',
        typeBadge: '🍽️ 그라나다 타파스 식당 후보',
        subTypeTag: '일반 식당 추천 · 방송 출연 확인 안 됨',
        verifyBadge: '방문 전 확인 · 영업시간·접근성 문의',
        highlights: '공식 홈페이지는 Plaza del Campillo의 나무 그늘 테라스와 바에서 즐기는 그라나다 전통 타파스를 소개합니다. 공식 역사 페이지에는 옛 Alameda Café와 문학 모임 El Rinconcillo를 기리는 로르카 동상이 언급됩니다.',
        hours: '확인한 공식 페이지에서 최신 영업시간·메뉴 가격을 확인하지 못했습니다. 예약·운영시간은 식당에 직접 확인하세요.',
        seniorCaution: '테라스와 출입구의 계단·경사·휠체어 접근 정보는 확인되지 않았습니다. 좌석·출입 조건을 식당에 문의하고, 야간 이동이 필요하면 귀가 교통을 미리 정하세요.',
        broadcastNote: '방송 출연으로 표시하지 않습니다. 제공된 KBS 영상은 그라나다 여행을 다루지만 Restaurante Chikito가 등장했다는 근거는 확인되지 않았습니다. 일반 식당 추천입니다.'
      },
      en: {
        name: 'Restaurante Chikito',
        typeBadge: '🍽️ Granada tapas restaurant suggestion',
        subTypeTag: 'General dining suggestion · TV appearance unverified',
        verifyBadge: 'Check before visiting · ask about hours and access',
        highlights: 'The official website describes a tree-shaded terrace on Plaza del Campillo and traditional Granada tapas at the bar. Its history page mentions the former Alameda Café and a statue of Lorca honoring the literary gathering El Rinconcillo.',
        hours: 'Current opening hours and menu prices were not confirmed on the official pages checked. Ask the restaurant about hours and reservations.',
        seniorCaution: 'The terrace and entrance are not described for stairs, gradients or wheelchair access. Ask the restaurant about seating and entry conditions; plan transport back in advance if visiting at night.',
        broadcastNote: 'Not labelled as a TV-featured restaurant. The supplied KBS clip covers travel in Granada, but does not establish that Restaurante Chikito appears; this is a general dining suggestion.'
      },
      ja: {
        name: 'Restaurante Chikito（レストラン・チキート）',
        typeBadge: '🍽️ グラナダのタパス店候補',
        subTypeTag: '一般的な飲食候補・番組登場は未確認',
        verifyBadge: '訪問前に確認・営業時間とアクセスを問い合わせ',
        highlights: '公式サイトは、Plaza del Campilloの木陰のテラスと、バーで楽しめるグラナダ伝統のタパスを紹介しています。歴史ページには旧Alameda Caféと、文学サークルEl Rinconcilloを記念するロルカ像が記載されています。',
        hours: '確認した公式ページでは最新営業時間・メニュー価格を確認できませんでした。営業時間と予約は店舗に直接確認してください。',
        seniorCaution: 'テラスや入口の階段・勾配・車いすアクセスは案内されていません。座席と入店条件を店に確認し、夜に訪れる場合は帰路の交通手段を先に決めてください。',
        broadcastNote: 'テレビ番組で紹介された店とは表示していません。提供されたKBS動画はグラナダ旅行を扱いますが、Restaurante Chikitoの登場を示す根拠は確認できないため、一般的な飲食候補です。'
      },
      zh: {
        name: 'Restaurante Chikito（奇基托餐厅）',
        typeBadge: '🍽️ 格拉纳达塔帕斯餐厅建议',
        subTypeTag: '一般餐饮推荐 · 未确认节目中出现',
        verifyBadge: '到访前请核实 · 咨询营业时间与通行条件',
        highlights: '官网介绍了Plaza del Campillo树荫环绕的露台，以及在吧台享用格拉纳达传统塔帕斯。餐厅历史页面还提到旧Alameda Café和纪念文学聚会El Rinconcillo的洛尔迦雕像。',
        hours: '查阅的官方页面未能确认最新营业时间和菜单价格。请直接向餐厅确认营业时间与预订方式。',
        seniorCaution: '官方页面未说明露台和入口的台阶、坡度或轮椅通行情况。请先咨询座位和入店条件；若晚间前往，建议提前安排返程交通。',
        broadcastNote: '不标注为电视节目推荐餐厅。所提供的KBS视频涉及格拉纳达旅行，但无法证明Restaurante Chikito曾在节目中出现；这里只作一般餐厅建议。'
      },
      sourceLabels: {
        ko: ['치키토 공식 홈페이지', '치키토 공식 역사 안내', 'KBS 스페인 여행 영상 (그라나다 맥락만 확인)'],
        en: ['Chikito official website', 'Chikito official history', 'KBS Spain travel clip (Granada context only)'],
        ja: ['チキート公式サイト', 'チキート公式歴史案内', 'KBSスペイン旅行動画（グラナダの話題のみ）'],
        zh: ['奇基托餐厅官网', '奇基托餐厅官方历史介绍', 'KBS西班牙旅行视频（仅作格拉纳达背景参考）']
      }
    },
    'pc-agp-picasso-museum': {
      ko: {
        name: 'Museo Picasso Málaga (말라가 피카소 미술관)',
        typeBadge: '🏛️ 피카소 미술관 · 구시가지 명소',
        subTypeTag: '11~2월 10:00~18:00 · 마지막 입장 폐관 30분 전',
        verifyBadge: '방문 전 확인 · 시간·요금 변동 가능',
        highlights: '말라가 구시가지에 있으며 대성당·알카사바·로마 극장과 가깝습니다. 공식 안내 기준 11~2월 운영시간은 10:00~18:00, 마지막 입장은 폐관 30분 전입니다. KBS 영상 제목은 피카소 미술관을 명시합니다.',
        hours: '11~2월 10:00~18:00 (마지막 입장 17:30) · 12월 25일, 1월 1일, 1월 6일 휴관 안내. 공식 안내상 성인 €13, 할인 €11; 방문 전 최신 정보를 확인하세요.',
        seniorCaution: '확인한 박물관 방문 안내에는 접근로의 계단·경사·휠체어 이동 경로가 설명되어 있지 않습니다. 이동 편의가 필요하면 방문 전에 박물관에 확인하세요. KBS 영상 제목에 미술관이 명시된 것이 방송 출처의 근거이며 제휴를 뜻하지 않습니다.',
        broadcastNote: '방송 소개 확인: 제공된 KBS 「걸어서 세계속으로」 직접 영상 제목이 말라가 피카소 미술관을 명시해 해당 영상의 소개 장소로 표시합니다. 아래 링크에서 확인할 수 있으며 공식 제휴·후원을 뜻하지 않습니다.'
      },
      en: {
        name: 'Museo Picasso Málaga',
        typeBadge: '🏛️ Picasso museum · Málaga old town',
        subTypeTag: 'Nov–Feb 10:00–18:00 · last entry 30 minutes before closing',
        verifyBadge: 'Check before visiting · hours and prices may change',
        highlights: 'In Málaga’s historic centre, close to the Cathedral, Alcazaba and Roman Theatre. The official visitor page lists Nov–Feb hours as 10:00–18:00, with last entry 30 minutes before closing. The supplied KBS video title names the Picasso Museum.',
        hours: 'Nov–Feb 10:00–18:00 (last entry 17:30) · listed closed Dec 25, Jan 1 and Jan 6. Official page lists €13 full admission and €11 reduced; reconfirm before visiting.',
        seniorCaution: 'The visitor page checked does not specify steps, gradients or a wheelchair route to the museum. Contact the museum ahead if access arrangements matter. The KBS video title is the basis for the broadcast reference; it does not imply partnership.',
        broadcastNote: 'Broadcast feature confirmed: the supplied direct KBS Walking Around the World video title explicitly names Museo Picasso Málaga, so this card identifies it as featured in that clip. See the direct link below; this does not imply museum partnership or endorsement.'
      },
      ja: {
        name: 'Museo Picasso Málaga（マラガ・ピカソ美術館）',
        typeBadge: '🏛️ ピカソ美術館・マラガ旧市街の名所',
        subTypeTag: '11～2月 10:00～18:00・最終入場は閉館30分前',
        verifyBadge: '訪問前に確認・時間・料金は変更の場合あり',
        highlights: 'マラガ旧市街にあり、大聖堂・アルカサバ・ローマ劇場に近い美術館です。公式案内では11～2月の営業時間は10:00～18:00、最終入場は閉館30分前です。提供されたKBS動画タイトルにピカソ美術館が記載されています。',
        hours: '11～2月 10:00～18:00（最終入場17:30）・12月25日、1月1日、1月6日休館の案内。公式掲載料金は一般€13、割引€11。訪問前に再確認してください。',
        seniorCaution: '確認した来館案内には、アクセス道路の階段・勾配・車いすルートの説明がありません。移動上の配慮が必要な場合は事前に美術館へ確認してください。KBSの放送出典は動画タイトルが根拠であり、提携を示すものではありません。',
        broadcastNote: '放送での紹介を確認：提供されたKBS「걸어서 세계속으로」直接動画のタイトルにマラガ・ピカソ美術館が明記されているため、このカードでは同動画の紹介先として表示します。下記リンクで確認できます。公式提携・後援を意味するものではありません。'
      },
      zh: {
        name: 'Museo Picasso Málaga（马拉加毕加索博物馆）',
        typeBadge: '🏛️ 毕加索博物馆 · 马拉加旧城区景点',
        subTypeTag: '11月至2月 10:00–18:00 · 闭馆前30分钟停止入场',
        verifyBadge: '到访前请核实 · 开放时间和票价可能变化',
        highlights: '博物馆位于马拉加老城区，靠近大教堂、阿尔卡萨瓦城堡和罗马剧场。官网列出的11月至2月开放时间为10:00–18:00，闭馆前30分钟停止入场。所提供的KBS视频标题点名毕加索博物馆。',
        hours: '11月至2月 10:00–18:00（17:30停止入场）· 官网列示12月25日、1月1日和1月6日闭馆。官网标示全票€13、优惠票€11，出发前请再次核实。',
        seniorCaution: '查阅的访客指南没有说明抵达路线的台阶、坡度或轮椅通行路线。如需无障碍安排，请提前联系博物馆。节目来源以KBS视频标题为依据，不表示官方合作或赞助。',
        broadcastNote: '已确认节目中介绍：所提供的KBS《걸어서 세계속으로》直接视频标题明确写有马拉加毕加索博物馆，因此本卡将其标为该视频介绍的地点。下方可查看原视频链接；这不代表官方合作或赞助。'
      },
      sourceLabels: {
        ko: ['피카소 미술관 공식 방문 안내', 'KBS 「걸어서 세계속으로」 피카소 미술관 영상'],
        en: ['Museo Picasso Málaga official visitor guide', 'KBS Walking Around the World — Picasso Museum clip'],
        ja: ['ピカソ美術館公式来館案内', 'KBS「걸어서 세계속으로」ピカソ美術館動画'],
        zh: ['毕加索博物馆官方访客指南', 'KBS《걸어서 세계속으로》毕加索博物馆视频']
      }
    },
    'pc-flr-davanzati': {
      ko: {
        name: 'Palazzo Davanzati Museum (다반자티 궁전 박물관)',
        typeBadge: '🏛️ 14세기 피렌체 주거 궁전 박물관',
        subTypeTag: '입구 플랫폼은 사전 요청 · 엘리베이터 있음',
        verifyBadge: '방문 전 연락 필수 · 출입구 단차 확인',
        highlights: '14세기 상인·은행가 가문의 주거 궁전에서 중세 벽화와 부유층 가정의 생활상을 살펴볼 수 있습니다. 박물관은 엘리베이터와 지상층 접근 가능 화장실을 안내합니다.',
        hours: '확인한 안내에는 매표소가 폐관 40분 전에 닫는다고 적혀 있습니다. 정확한 개관시간·요금과 방문일의 전시실 운영을 공식 페이지에서 확인하세요.',
        seniorCaution: '주 출입구에 약 12cm 높이 차와 6cm 문턱이 있습니다. 이동식 플랫폼 설치를 위해 직원에게 미리 연락해야 하며 입구 초인종은 없습니다. 엘리베이터는 상층으로 연결되지만 방 사이 최대 6cm 문턱은 직원 요청 시 경사판을 이용해야 합니다. 계단·모든 방의 접근성은 방문 전 확인하세요.',
        broadcastNote: ''
      },
      en: {
        name: 'Palazzo Davanzati Museum',
        typeBadge: '🏛️ 14th-century Florentine house museum',
        subTypeTag: 'Request the entrance platform in advance · elevator available',
        verifyBadge: 'Contact ahead · check entrance thresholds',
        highlights: 'Explore medieval frescoes and domestic life in a 14th-century merchant-banker residence. The museum lists an elevator and an accessible toilet on the ground floor.',
        hours: 'The information checked says the ticket office closes 40 minutes before closing. Confirm opening hours, prices and room access for your date on the official pages.',
        seniorCaution: 'The main entrance has an approximately 12 cm rise and a 6 cm threshold. Contact staff in advance to arrange the portable platform; there is no doorbell. An elevator reaches upper floors, but room thresholds up to 6 cm require a ramp requested from staff. Ask ahead about stairs and access to every room.',
        broadcastNote: ''
      },
      ja: {
        name: 'Palazzo Davanzati Museum（ダヴァンツァーティ宮殿博物館）',
        typeBadge: '🏛️ 14世紀フィレンツェの邸宅博物館',
        subTypeTag: '入口の移動式平台は事前依頼・エレベーターあり',
        verifyBadge: '事前連絡が必要・入口の段差を確認',
        highlights: '14世紀の商人・銀行家の邸宅で、中世の壁画や裕福な家庭の暮らしを見学できます。館内にエレベーターがあり、1階にアクセシブルトイレがあると案内されています。',
        hours: '確認した案内では、チケット売場は閉館40分前に終了します。開館時間・料金・訪問日の各室の公開状況は公式ページで確認してください。',
        seniorCaution: '主入口には約12cmの高さの違いと6cmの敷居があります。移動式平台の設置をスタッフへ事前依頼してください。入口に呼び鈴はありません。エレベーターは上階へ通じますが、各室の最大6cmの敷居にはスタッフに依頼するスロープが必要です。階段と全室のアクセスは事前確認してください。',
        broadcastNote: ''
      },
      zh: {
        name: 'Palazzo Davanzati Museum（达万扎蒂宫博物馆）',
        typeBadge: '🏛️ 14世纪佛罗伦萨住宅博物馆',
        subTypeTag: '入口移动平台须提前联系 · 设有电梯',
        verifyBadge: '建议提前联系 · 核实入口门槛',
        highlights: '可在14世纪商人和银行家宅邸中了解中世纪壁画与富裕家庭生活。馆方说明楼内设有电梯，地面层设有无障碍卫生间。',
        hours: '查阅的信息说明售票处在闭馆前40分钟停止售票。请通过官方页面核实开放时间、票价及到访当天各展室开放情况。',
        seniorCaution: '主入口约有12厘米高差和6厘米门槛。需提前联系工作人员准备移动平台；入口没有门铃。电梯可通往上层，但房间之间最高约6厘米的门槛需向工作人员申请坡板。台阶及所有房间的通行条件请提前确认。',
        broadcastNote: ''
      },
      sourceLabels: {
        ko: ['바르젤로 박물관 공식 안내', '피렌체 공식 관광포털 FeelFlorence 안내'],
        en: ['Bargello Museums official guide', 'FeelFlorence official guide'],
        ja: ['バルジェッロ美術館公式案内', 'フィレンツェ公式観光サイトFeelFlorence'],
        zh: ['巴杰罗博物馆官方指南', '佛罗伦萨官方旅游网站FeelFlorence']
      }
    },
    'pc-rom-orange-garden': {
      ko: {
        name: 'Giardino degli Aranci (오렌지 정원·사벨로 공원)',
        typeBadge: '🌳 아벤티노 언덕 정원·전망 명소',
        subTypeTag: '일반 전망 후보 · 보행 조건 현장 확인',
        verifyBadge: '방문 전 확인 · 경사·계단·노면 미확인',
        highlights: '아벤티노 언덕의 사벨로 공원은 1932년에 조성된 정원으로, 중앙 산책로 끝 전망대에서 테베레강과 성 베드로 대성당 방향의 로마 전망을 볼 수 있습니다. 일반 방문 추천이며 일정에 자동 추가하지 않습니다.',
        hours: '로마 관광청 안내의 계절별 운영 월이 서로 겹쳐 표기되어 있어 시간을 단정하지 않습니다. 방문 당일 공식 안내와 현장 표지를 확인하세요.',
        seniorCaution: '공식 안내는 접근 가능한 입구·경사·계단·포장 상태를 구체적으로 설명하지 않습니다. 짧은 전망 방문에 적합한지는 현장 확인이 필요하며, 부모님 보행에 무리가 없도록 방문 전 교통과 귀가 동선을 확인하세요.',
        broadcastNote: '방송 귀속 미확인: 제공된 EBS 자료는 아벤티노 언덕의 정원을 언급하지만 Giardino degli Aranci를 특정하지 않습니다. 이 정원을 방송에 나온 장소로 표시하지 않습니다.'
      },
      en: {
        name: 'Giardino degli Aranci (Orange Garden / Savello Park)',
        typeBadge: '🌳 Aventine Hill garden and viewpoint',
        subTypeTag: 'General viewpoint suggestion · check the walking route',
        verifyBadge: 'Check before visiting · slope, steps and paving unconfirmed',
        highlights: 'Savello Park, the Orange Garden on Aventine Hill, was laid out in 1932. Its central path leads to a lookout over the Tiber and toward St Peter’s Basilica. This is a general suggestion and is not added to the itinerary.',
        hours: 'Turismo Roma lists overlapping months for seasonal opening hours, so no single schedule is asserted here. Check the official listing and on-site signs on the day.',
        seniorCaution: 'The official guide does not specify accessible entrances, gradients, steps or paving. Confirm whether a short viewpoint stop suits your parents, and check transport and the return route before going.',
        broadcastNote: 'Broadcast attribution unconfirmed: the supplied EBS material mentions a garden on Aventine Hill but does not identify Giardino degli Aranci. This garden is not labelled as featured on the programme.'
      },
      ja: {
        name: 'Giardino degli Aranci（オレンジ公園・サヴェッロ公園）',
        typeBadge: '🌳 アヴェンティーノの丘の庭園・展望地',
        subTypeTag: '一般的な展望候補・歩行ルートは現地確認',
        verifyBadge: '訪問前に確認・勾配・階段・路面は未確認',
        highlights: 'アヴェンティーノの丘にあるサヴェッロ公園（オレンジ公園）は1932年に整備されました。中央の小道の先に展望台があり、テヴェレ川やサン・ピエトロ大聖堂方面の景色を楽しめます。一般的な候補であり、行程には自動追加しません。',
        hours: 'ローマ観光局の季節別開園月には重複表記があるため、時間を断定していません。当日の公式案内と現地表示を確認してください。',
        seniorCaution: '公式案内にはアクセス可能な入口、勾配、階段、路面の詳細がありません。ご両親に無理のない短時間の展望訪問か現地で確認し、訪問前に交通と帰路を確認してください。',
        broadcastNote: '放送との関連は未確認です。提供されたEBS資料にはアヴェンティーノの丘の庭園とありますが、Giardino degli Aranciとは特定されていません。番組で紹介された場所とは表示しません。'
      },
      zh: {
        name: 'Giardino degli Aranci（橘园／萨韦洛公园）',
        typeBadge: '🌳 阿文蒂诺山丘花园与观景点',
        subTypeTag: '一般观景建议 · 步行路线需现场确认',
        verifyBadge: '到访前请核实 · 坡度、台阶和路面未确认',
        highlights: '阿文蒂诺山丘上的萨韦洛公园（橘园）建于1932年。中央步道通往观景台，可眺望台伯河及圣彼得大教堂方向的罗马景色。这是一般建议，不会自动加入行程。',
        hours: '罗马旅游局页面的季节开放月份存在重叠，因此这里不作确定时间说明。请在到访当天查看官方信息和现场标牌。',
        seniorCaution: '官方指南没有具体说明无障碍入口、坡度、台阶或路面情况。请确认短暂停留是否适合长辈，并提前核实交通及返程路线。',
        broadcastNote: '节目关联未确认：所提供的EBS资料提到阿文蒂诺山丘的一座花园，但没有点明Giardino degli Aranci，因此不标注为节目介绍过的地点。'
      },
      sourceLabels: {
        ko: ['로마 관광청 오렌지 정원 공식 안내', 'EBS 다시보기 (아벤티노 정원 언급·장소 특정 안 됨)'],
        en: ['Turismo Roma official Orange Garden guide', 'EBS replay (Aventine garden mentioned; exact site unconfirmed)'],
        ja: ['ローマ観光局・オレンジ公園公式案内', 'EBS見逃し配信（アヴェンティーノの庭園に言及・場所未特定）'],
        zh: ['罗马旅游局橘园官方指南', 'EBS回放（提及阿文蒂诺花园，但未确认具体地点）']
      }
    }
  };

  const meta = {
    'pc-bcn-sant-pau': { cityId: 'barcelona', cityName: '바르셀로나', country: '스페인', flag: '🇪🇸', categoryKey: 'attraction', typeKey: 'cultural_site', mapQuery: 'Recinte Modernista de Sant Pau Barcelona' },
    'pc-svq-setas-rooftop': { cityId: 'seville', cityName: '세비야', country: '스페인', flag: '🇪🇸', categoryKey: 'attraction', typeKey: 'cultural_site', mapQuery: 'Setas de Sevilla Metropol Parasol' },
    'pc-svq-duenas': { cityId: 'seville', cityName: '세비야', country: '스페인', flag: '🇪🇸', categoryKey: 'attraction', typeKey: 'cultural_site', mapQuery: 'Palacio de las Dueñas Seville' },
    'pc-grx-chikito': { cityId: 'granada', cityName: '그라나다', country: '스페인', flag: '🇪🇸', categoryKey: 'restaurant', typeKey: 'evening_food_hall', mapQuery: 'Restaurante Chikito Plaza del Campillo Granada' },
    'pc-agp-picasso-museum': { cityId: 'malaga', cityName: '말라가', country: '스페인', flag: '🇪🇸', categoryKey: 'attraction', typeKey: 'cultural_site', mapQuery: 'Museo Picasso Málaga' },
    'pc-flr-davanzati': { cityId: 'florence', cityName: '피렌체', country: '이탈리아', flag: '🇮🇹', categoryKey: 'attraction', typeKey: 'cultural_site', mapQuery: 'Palazzo Davanzati Museum Florence' },
    'pc-rom-orange-garden': { cityId: 'rome', cityName: '로마', country: '이탈리아', flag: '🇮🇹', categoryKey: 'attraction', typeKey: 'cultural_site', mapQuery: 'Giardino degli Aranci Savello Park Rome' }
  };

  const addedItems = Object.keys(placeCopy).map(id => {
    const ko = placeCopy[id].ko;
    const m = meta[id];
    const translations = {};
    for (const lang of ['en', 'ja', 'zh']) {
      translations[lang] = {
        ...placeCopy[id][lang],
        oneStopReason: '',
        sourceLabels: placeCopy[id].sourceLabels[lang]
      };
    }
    PRACTICAL_CANDIDATES_I18N.items[id] = translations;
    return {
      id,
      ...m,
      name: ko.name,
      typeBadge: ko.typeBadge,
      typeColor: m.typeKey,
      subTypeTag: ko.subTypeTag,
      isOneStopRecommended: false,
      oneStopReason: '',
      highlights: ko.highlights,
      hours: ko.hours,
      verifyNotice: ko.verifyBadge,
      seniorCaution: ko.seniorCaution,
      broadcastNote: ko.broadcastNote,
      sources: sourceById[id].map(([label, url]) => ({ label, url })),
      verifiedDate: '2026-10-31 확인',
      mapQuery: m.mapQuery
    };
  });
  PRACTICAL_CITY_CANDIDATES_DATA.items.push(...addedItems);

  const uiCopy = {
    ko: {
      mainTitle: '🗂️ 도시별 추가 맛집·시장·전망·문화 명소 후보 24선',
      subnavCandidates: '✨ 도시별 추가 후보 (24선)',
      policyVerifiedDate: '📌 카드별 공식 출처 확인일 표시',
      mainDesc: '기존 일정·명소·식당 안내와 대조해 중복 장소를 별도 카드로 반복하지 않고, 새 정보가 있는 후보만 수록했습니다. 60대 부모님과 동행할 때는 늦은 밤 장거리 보행보다 한 곳에서 해결하는 후보를 우선하고, 저녁 명소는 귀가 교통을 미리 계획하세요. 낮 시장·저녁 식당가·전망지·박물관·궁전·정원을 구분합니다. Setas 지붕 산책은 기존 무료 광장 산책과 다른 유료 관람입니다.',
      emptyDesc: '도시나 유형 필터를 초기화하면 7개 도시의 추가 후보 24곳을 모두 확인할 수 있습니다.',
      resultCountSuffix: '/ 전체 24개 후보',
      labelVerifiedDate: '공식 출처 확인:',
      dedupSummary: '✅ <strong>중복 대조 완료:</strong> 7개 도시의 실용정보·명소·식당·야경을 대조했습니다. 로마교·Gambrinus·Borghese는 기존 안내를 유지하고 새 카드로 반복하지 않았습니다.',
      types: { cultural_site: '박물관·궁전·정원·문화 명소' }
    },
    en: {
      mainTitle: '🗂️ 24 Additional City Picks: Food, Markets, Views & Cultural Sights',
      subnavCandidates: '✨ 24 Added City Dining, Market, View & Cultural Candidates',
      policyVerifiedDate: '📌 Official sources · verification date shown per card',
      mainDesc: 'Candidates were checked against existing itinerary, attraction, dining and night-view content; duplicates are not repeated as separate cards. For parents in their 60s, we favor manageable one-stop options over long after-dark walks and recommend planning return transport before visiting evening spots. Day markets, evening dining, viewpoints, museums, palaces and gardens are clearly distinguished. The Setas rooftop walk is ticketed and distinct from the free plaza stroll already listed.',
      emptyDesc: 'Reset the city or category filters to view all 24 additional candidates across 7 cities.',
      resultCountSuffix: 'of 24 candidates',
      labelVerifiedDate: 'Official source checked:',
      dedupSummary: '✅ <strong>Deduplication checked:</strong> Practical, attraction, dining and night-view content across 7 cities was compared. Puente Romano, Gambrinus and Borghese remain in their existing entries rather than being repeated as cards.',
      types: { cultural_site: 'Museums, Palaces, Gardens & Cultural Sights' }
    },
    ja: {
      mainTitle: '🗂️ 都市別追加候補24選：グルメ・市場・展望・文化名所',
      subnavCandidates: '✨ 都市別追加候補（24件）',
      policyVerifiedDate: '📌 カードごとに公式出典の確認日を表示',
      mainDesc: '既存の日程・名所・飲食・夜景情報と照合し、重複する場所は別カードとして繰り返さず、新情報のある候補を掲載しました。60代のご両親と同行する場合は、夜間の長距離歩行より負担の少ない候補を優先し、夕方以降の訪問前に帰路の交通手段を計画してください。昼の市場・夜の飲食店・展望地・美術館・宮殿・庭園を区別します。Setasの屋上散策は、既掲載の無料広場散策とは異なる有料見学です。',
      emptyDesc: '都市またはタイプのフィルターをリセットすると、7都市24件の追加候補をすべて確認できます。',
      resultCountSuffix: '/ 全24候補',
      labelVerifiedDate: '公式出典確認:',
      dedupSummary: '✅ <strong>重複照合済み:</strong> 7都市の実用情報・名所・飲食・夜景情報を照合しました。ローマ橋、Gambrinus、ボルゲーゼ美術館は既存案内を維持し、別カードとして重複掲載していません。',
      types: { cultural_site: '美術館・宮殿・庭園・文化名所' }
    },
    zh: {
      mainTitle: '🗂️ 7城24处新增建议：美食、市场、观景与文化景点',
      subnavCandidates: '✨ 按城市新增候选（24处）',
      policyVerifiedDate: '📌 每张卡片显示官方来源核实日期',
      mainDesc: '已与现有行程、景点、餐饮和夜景信息对照，不为重复地点另建卡片，只收录能补充新信息的建议。陪同60多岁的父母出行时，优先选择轻松的一站式安排，避免深夜长距离步行，并建议提前规划晚间返程交通。白天市场、晚间餐饮、观景点、博物馆、宫殿和花园分别标示。Setas屋顶步道需购票，与已列出的免费广场漫步不同。',
      emptyDesc: '重置城市或类型筛选即可查看7座城市的全部24处新增建议。',
      resultCountSuffix: '/ 共24处候选',
      labelVerifiedDate: '官方来源核实:',
      dedupSummary: '✅ <strong>已完成查重:</strong> 对照了7城的实用信息、景点、餐饮与夜景内容。罗马桥、Gambrinus和博尔盖塞美术馆保留在原有介绍中，不另建重复卡片。',
      types: { cultural_site: '博物馆、宫殿、花园与文化景点' }
    }
  };
  for (const lang of locales) {
    Object.assign(PRACTICAL_CANDIDATES_I18N.ui[lang], uiCopy[lang]);
    Object.assign(PRACTICAL_CANDIDATES_I18N.ui[lang].types, uiCopy[lang].types);
  }

  const findBaseline = cityId => PRACTICAL_CITY_CANDIDATES_DATA.deduplicationBaseline.find(row => row.cityId === cityId);
  const baselineAdds = {
    barcelona: {
      ko: ' · Recinte Modernista de Sant Pau', en: ' · Recinte Modernista de Sant Pau', ja: ' · サン・パウ・モダニスタ地区', zh: ' · 圣保罗现代主义建筑群'
    },
    seville: {
      ko: ' · Palacio de las Dueñas · Setas 유료 지붕 산책 (기존 무료 광장 산책과 별도)',
      en: ' · Palacio de las Dueñas · ticketed Setas rooftop walk (separate from the existing free plaza stroll)',
      ja: ' · ドゥエニャス宮殿 · Setas有料屋上散策（既存の無料広場散策とは別）',
      zh: ' · 杜埃尼亚斯宫 · Setas付费屋顶步道（与现有免费广场漫步不同）'
    },
    granada: {
      ko: ' · Restaurante Chikito (일반 식당 추천 · 방송 출연 미확인)',
      en: ' · Restaurante Chikito (general dining suggestion; TV appearance unverified)',
      ja: ' · Restaurante Chikito（一般的な飲食候補・番組登場未確認）',
      zh: ' · Restaurante Chikito（一般餐饮建议；未确认节目中出现）'
    },
    malaga: {
      ko: ' · Museo Picasso Málaga (방문 안내·접근 정보 보강)',
      en: ' · Museo Picasso Málaga (visitor and access details added)',
      ja: ' · Museo Picasso Málaga（来館・アクセス情報を補足）',
      zh: ' · Museo Picasso Málaga（补充参观与通行信息）'
    },
    florence: {
      ko: ' · Palazzo Davanzati Museum (입구 단차·플랫폼·엘리베이터 안내)',
      en: ' · Palazzo Davanzati Museum (entrance threshold, platform and elevator notes)',
      ja: ' · ダヴァンツァーティ宮殿博物館（入口段差・平台・エレベーター情報）',
      zh: ' · 达万扎蒂宫博物馆（入口门槛、移动平台和电梯信息）'
    },
    rome: {
      ko: ' · Giardino degli Aranci (일반 전망 추천 · 방송 출연 미확인)',
      en: ' · Giardino degli Aranci (general viewpoint suggestion; TV appearance unconfirmed)',
      ja: ' · Giardino degli Aranci（一般的な展望候補・番組登場未確認）',
      zh: ' · Giardino degli Aranci（一般观景建议；节目关联未确认）'
    }
  };
  for (const [cityId, byLang] of Object.entries(baselineAdds)) {
    const row = findBaseline(cityId);
    if (row) row.addedSummary += byLang.ko;
    for (const lang of ['en', 'ja', 'zh']) {
      const translated = PRACTICAL_CANDIDATES_I18N.dedup[cityId]?.[lang];
      if (translated) translated.added += byLang[lang];
    }
  }

  const romeRow = findBaseline('rome');
  if (romeRow && !romeRow.existingItems.includes('보르게세 미술관')) {
    romeRow.existingItems += ' · 보르게세 미술관 (이탈리아 명소 가이드 기존 수록 · 중복 제외)';
  }
  for (const [lang, label] of Object.entries({
    en: ' · Borghese Gallery (already in Italy attractions guide; no duplicate card)',
    ja: ' · ボルゲーゼ美術館（イタリア名所ガイドに掲載済み・重複カードなし）',
    zh: ' · 博尔盖塞美术馆（已收录于意大利景点指南，不重复建卡）'
  })) {
    const translated = PRACTICAL_CANDIDATES_I18N.dedup.rome?.[lang];
    if (translated && !translated.existing.includes('Borghese')) translated.existing += label;
  }

  PRACTICAL_CITY_CANDIDATES_DATA.deduplicationBaseline.push({
    cityId: 'cordoba',
    cityName: '코르도바',
    flag: '🇪🇸',
    stayInfo: '기존 일정 내 장소 언급 · 신규 일정 아님',
    existingItems: 'Puente Romano (기존 일몰 다리 횡단 안내)',
    addedSummary: '중복 방지: 새 카드 미추가. 기존 안내에 짧은 늦은 오후 전망·접근 조건 미확인 주의와 공식 출처를 보강.'
  });
  PRACTICAL_CANDIDATES_I18N.dedup.cordoba = {
    en: { city: '🇪🇸 Córdoba · already mentioned in the itinerary', existing: 'Puente Romano (existing sunset bridge-crossing suggestion)', added: 'No duplicate card. The existing guide is supplemented with a short late-afternoon viewpoint note, an access caveat and the official source.' },
    ja: { city: '🇪🇸 コルドバ・既存行程に記載', existing: 'Puente Romano（既存の日没時の橋歩き案内）', added: '重複カードは追加しません。既存ガイドに短時間の夕方展望案内、アクセス上の注意、公式出典を補足します。' },
    zh: { city: '🇪🇸 科尔多瓦 · 已在现有行程中提及', existing: 'Puente Romano（现有日落时过桥建议）', added: '不新增重复卡片；在原有指南中补充短时傍晚观景建议、通行注意事项和官方来源。' }
  };

  const cityGuideNotes = {
    ko: {
      must_odb_night: '<br><small>⚠️ 60대 부모님 동행 시 짧은 늦은 오후 전망 정차로만 고려하고, 어두워진 뒤 장거리 다리 걷기를 전제로 하지 마세요. 노면·경사·계단은 확인되지 않았습니다. 현지에 확인하고 귀가 교통을 미리 계획하세요. <a href="https://www.turismodecordoba.org/puente-romano" target="_blank" rel="noopener noreferrer">코르도바 관광청 공식 안내 ↗</a></small>',
      must_nap_food: '<br><small>⚠️ 60대 부모님과 저녁 식사로 방문할 경우 입구 계단·경사·접근성이 확인되지 않았으므로 식당에 먼저 문의하고 귀가 교통을 계획하세요. <a href="https://grancaffegambrinus.com/en/the-gambrinus-and-tourism/" target="_blank" rel="noopener noreferrer">공식 소개 ↗</a> · <a href="https://menu.grancaffegambrinus.com/en/" target="_blank" rel="noopener noreferrer">공식 메뉴 ↗</a> · <a href="https://www.italia.it/en/campania/naples/things-to-do/4-itineraries-for-10000-steps-plan-in-naples" target="_blank" rel="noopener noreferrer">Italia.it 나폴리 걷기 코스 ↗</a></small>'
    },
    en: {
      must_odb_night: '<br><small>⚠️ With parents in their 60s, treat Puente Romano as a brief late-afternoon viewpoint stop; do not assume a long after-dark bridge walk. Paving, gradient and steps are unconfirmed. Check locally and plan return transport ahead. <a href="https://www.turismodecordoba.org/puente-romano" target="_blank" rel="noopener noreferrer">Official Córdoba tourism guide ↗</a></small>',
      must_nap_food: '<br><small>⚠️ For an evening meal with parents in their 60s, entrance steps, gradients and accessibility remain unconfirmed; ask the café first and plan return transport. <a href="https://grancaffegambrinus.com/en/the-gambrinus-and-tourism/" target="_blank" rel="noopener noreferrer">Official introduction ↗</a> · <a href="https://menu.grancaffegambrinus.com/en/" target="_blank" rel="noopener noreferrer">Official menu ↗</a> · <a href="https://www.italia.it/en/campania/naples/things-to-do/4-itineraries-for-10000-steps-plan-in-naples" target="_blank" rel="noopener noreferrer">Italia.it Naples walking routes ↗</a></small>'
    },
    ja: {
      must_odb_night: '<br><small>⚠️ 60代のご両親と同行する場合は、夕方の短時間の展望立ち寄りとしてご検討ください。暗くなってから長距離の橋歩きをする前提にしないでください。路面・勾配・階段は未確認です。現地で確認し、帰路の交通手段を事前に計画してください。<a href="https://www.turismodecordoba.org/puente-romano" target="_blank" rel="noopener noreferrer">コルドバ公式観光案内 ↗</a></small>',
      must_nap_food: '<br><small>⚠️ 60代のご両親と夕食で訪れる場合、入口の階段・勾配・アクセス条件は未確認のため、店舗に問い合わせて帰路の交通手段を計画してください。<a href="https://grancaffegambrinus.com/en/the-gambrinus-and-tourism/" target="_blank" rel="noopener noreferrer">公式紹介 ↗</a>・<a href="https://menu.grancaffegambrinus.com/en/" target="_blank" rel="noopener noreferrer">公式メニュー ↗</a>・<a href="https://www.italia.it/en/campania/naples/things-to-do/4-itineraries-for-10000-steps-plan-in-naples" target="_blank" rel="noopener noreferrer">Italia.it ナポリの徒歩ルート ↗</a></small>'
    },
    zh: {
      must_odb_night: '<br><small>⚠️ 陪同60多岁父母时，建议仅将罗马桥作为傍晚短暂停留的观景点，不要预设天黑后仍要长距离步行过桥。路面、坡度和台阶情况未确认；请向当地核实并提前安排返程交通。<a href="https://www.turismodecordoba.org/puente-romano" target="_blank" rel="noopener noreferrer">科尔多瓦官方旅游指南 ↗</a></small>',
      must_nap_food: '<br><small>⚠️ 陪同60多岁父母晚餐时，Gambrinus入口的台阶、坡度和通行条件仍未确认；请先联系咖啡馆并安排返程交通。<a href="https://grancaffegambrinus.com/en/the-gambrinus-and-tourism/" target="_blank" rel="noopener noreferrer">官方介绍 ↗</a> · <a href="https://menu.grancaffegambrinus.com/en/" target="_blank" rel="noopener noreferrer">官方菜单 ↗</a> · <a href="https://www.italia.it/en/campania/naples/things-to-do/4-itineraries-for-10000-steps-plan-in-naples" target="_blank" rel="noopener noreferrer">Italia.it 那不勒斯步行路线 ↗</a></small>'
    }
  };
  for (const lang of locales) {
    I18N_DICTIONARY[lang].must_odb_night += cityGuideNotes[lang].must_odb_night;
    I18N_DICTIONARY[lang].must_nap_food += cityGuideNotes[lang].must_nap_food;
  }

  const borghese = ITALY_CITIES_GUIDE_DATA.cities.rome.districts
    .flatMap(district => district.spots || [])
    .find(spot => spot.id === 'borghese-gallery');
  if (borghese) {
    borghese.walkingLevel = 'medium';
    borghese.walking = {
      ko: '접근 동선은 사전 확인 권장 🟠 (계단 리프트·소형 휠체어 안내)',
      en: 'Plan access in advance 🟠 (stair lift; wheelchair size limits)',
      ja: 'アクセスは事前確認 🟠（階段昇降機・車いすサイズ制限あり）',
      zh: '建议提前确认通行安排 🟠（楼梯升降机及轮椅尺寸限制）'
    };
    borghese.details = {
      ko: '시간 지정 입장으로 매시 시작하며 일반 관람은 약 2시간입니다 (17:45 회차 제외). 전면 계단 옆 계단 리프트가 있고, 계단을 피하려면 Piazzale Scipione Borghese 5번지 후면 입구로 들어가 조각 전시층을 관람할 수 있습니다. 2층 엘리베이터에는 대형 휠체어가 들어가지 않아 미술관 제공 휠체어로 옮겨 타야 합니다. 자세한 동선은 방문 전 문의하세요.',
      en: 'Timed entry starts every hour and visits last about two hours, except the 17:45 slot. A stair lift is beside the front steps; visitors wishing to avoid the stairs can use the rear entrance at Piazzale Scipione Borghese 5 for the sculpture floor. The elevator to the picture gallery cannot take a large wheelchair; the museum asks visitors to transfer to a museum-provided chair. Confirm arrangements before visiting.',
      ja: '時間指定入場は毎時開始し、通常の見学時間は約2時間です（17:45の回を除く）。正面階段横に階段昇降機があり、階段を避ける場合はPiazzale Scipione Borghese 5の裏口から彫刻展示階へ入れます。絵画館階へのエレベーターには大型車いすが入らず、館内用車いすへの乗り換えが必要です。訪問前に利用条件を確認してください。',
      zh: '预约场次每小时开始，普通参观约2小时（17:45场次除外）。正面台阶旁设有楼梯升降机；如需避开台阶，可从Piazzale Scipione Borghese 5后门进入雕塑展层。通往绘画展层的电梯无法容纳大型轮椅，馆方要求改用馆内提供的轮椅。请在到访前确认安排。'
    };
    borghese.hours = {
      ko: '화~일 09:00~19:00 · 월요일 휴관 · 마지막 입장 17:45 · 매시 시작하는 시간 지정 회차',
      en: 'Tue–Sun 09:00–19:00 · closed Mon · last entry 17:45 · timed slots start hourly',
      ja: '火～日 09:00～19:00・月曜休館・最終入場17:45・毎時開始の時間指定制',
      zh: '周二至周日 09:00–19:00 · 周一闭馆 · 17:45停止入场 · 每小时开始一场预约参观'
    };
    borghese.verifiedDate = '2026-10-31';
    borghese.officialUrl = 'https://galleriaborghese.cultura.gov.it/en/visita/info-biglietti/';
    borghese.accessibilityUrl = 'https://galleriaborghese.cultura.gov.it/en/visita/accessibilita/';
  }
})();
