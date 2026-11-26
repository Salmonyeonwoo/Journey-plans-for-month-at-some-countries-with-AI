/* Four-language, date-bounded Florence Duomo supplement. Keeps the existing itinerary intact. */
(function (root) {
  'use strict';

  const LANGS = ['ko', 'en', 'zh', 'ja'];
  const ID = 'florence-duomo-visit-guide';
  const COPY = {
    ko: {
      eyebrow: '피렌체 · 두오모 방문 전 확인',
      title: '두오모 돔·패스 방문 메모',
      intro: '현재 플래너 일정은 그대로 두고, 티켓 선택과 입장·운영·교통 확인만 보충합니다.',
      dateNote: '날짜 한정 정보: 일정·날씨·교통 공지는 2026년 11월 26–29일에만 적용됩니다. 이 날짜 이후에는 과거 안내이므로 공식 페이지에서 새로 확인하세요.',
      cards: [
        {
          title: '패스 가격과 포함 시설',
          lines: [
            '공식 안내의 성인 표시 가격: Brunelleschi Pass €30(돔·종탑·세례당·박물관·산타 레파라타), Giotto Pass €20(종탑·세례당·박물관·산타 레파라타, 돔 제외), Ghiberti Pass €15(세례당·박물관·산타 레파라타). 결제 직전 공식 티켓 화면에서 가격을 다시 확인하세요.',
            '각 패스는 선택일을 포함해 3일 동안 유효하며, 포함 시설은 각 1회 방문입니다. 선택일보다 앞서 사용할 수 없습니다.'
          ]
        },
        {
          title: '예약 시간과 돔 입장',
          lines: [
            '시간 지정은 Brunelleschi의 돔, Giotto의 종탑, Ghiberti의 산타 레파라타에 각각 필요합니다. 나머지 포함 시설은 3일 유효기간 안에서 이용합니다. Ghiberti의 산타 레파라타는 구매 때 선택한 날짜·시간에 맞춰야 합니다.',
            '돔은 463계단이며 엘리베이터가 없습니다. 북쪽 Porta della Mandorla로 입장하고, 티켓 명의 확인을 위해 티켓과 신분증을 지참하세요. 공식 안내는 예약 시작 10분 전 대기와 최대 5분 지각 허용을 안내하며, 발권 후 예약 변경·취소는 불가합니다. 여권만 필수라고 한정하지 않습니다.'
          ]
        },
        {
          title: '가방·종탑·세례당 공사',
          lines: [
            '배낭·여행가방·중대형 가방 등은 Piazza Duomo 38/r 보관소에 맡겨야 합니다. 허용 물품과 운영시간은 방문 전에 공식 보관 안내를 확인하세요.',
            '조토 종탑은 복원 공사 중입니다. 공식 안내상 꼭대기 테라스는 개방되지만 전망이 일부 가려질 수 있고, 등반은 414계단이며 엘리베이터가 없습니다.',
            '세례당 돔 모자이크는 2023–2028년 복원 계획입니다. 2026년 9월부터 남쪽 문으로 바뀌었다는 주장은 확인되지 않았습니다. 일반 입구와 당일 변경 공지는 공식 방문 안내에서 확인하세요.'
          ]
        },
        {
          title: '운영시간·날씨·일몰 · 11월 26–29일 한정',
          lines: [
            '공식 기본 시간표에서 돔은 평일 08:15–18:45, 토요일 08:15–16:30, 일요일 12:45–16:30입니다. 이는 해당 네 날짜의 확정 시간표가 아닙니다. 공식 날짜표와 일반 안내가 달랐던 시설도 있어 방문 직전 날짜별 운영·입장 슬롯을 확인하세요.',
            '첨부의 날짜별 강수확률·강수량·기온 수치는 최신 공식 예보로 확인되지 않아 여기에 옮기지 않았습니다. 출발 전 LaMMA의 최신 예보를 확인하세요.',
            '일몰 계산 시각(현지): 11/26 16:41, 11/27 16:40, 11/28 16:40, 11/29 16:39. 이는 이 날짜에만 해당합니다.'
          ]
        },
      {
        title: '버스·요금 · 11월 26–29일 한정',
        lines: [
          'Autolinee Toscane 공지는 Ponte Vespucci 공사로 12·13·39번이 2026년 11월 5일부터 다리를 통과하지 못한다고 안내합니다. 세부 우회경로와 종료일은 확인되지 않았으므로 출발 직전 공식 공지와 at bus 앱의 정류장별 도착정보를 확인하세요.',
          '공식 정류장 목록에는 13번의 Fortezza T1 Strozzi·임시 Piazza Piave·Piazzale Il David, 12번의 Indipendenza Nazionale가 표시됩니다. 노선과 방향에 따라 달라지므로 정류장을 서로 바꿔 안내하지 않습니다.',
          'Autolinee Toscane 공식 요금표 기준 2026년 8월 1일부터 Firenze 시내권은 90분 €2.00입니다. Tip Tap contactless는 추가요금이 없으며, 버스에 탈 때 태그하고 기기 하나는 승객 한 명이 사용합니다. 구매 전 공식 페이지에서 재확인하세요.'
          ]
        }
      ],
      planButton: '기존 피렌체 일정 보기',
      sourceDetails: '공식 출처 및 당일 확인 링크',
      sourceLabels: {
        plan: '두오모 공식 운영·방문 안내', brunelleschi: 'Brunelleschi Pass 공식 안내', giotto: 'Giotto Pass 공식 안내',
        ghiberti: 'Ghiberti Pass 공식 안내', entry: '돔 입장 규칙', bags: '공식 짐 보관 안내', tower: '종탑 복원·방문 안내',
        mosaics: '세례당 모자이크 복원', service: 'Autolinee Toscane 공지', line12: '12번 공식 노선', line13: '13번 공식 노선',
        fare: '2026 공식 교통 요금표', taptap: 'Tip Tap 공식 안내', app: 'at bus 앱', weather: 'LaMMA 피렌체 예보', sunset: '2026년 11월 일몰 계산'
      },
      chatbotQuestion: '피렌체 두오모 패스·돔 입장 안내',
      chatbotChip: '🏛️ 두오모 패스·입장',
      chatbotTitle: '피렌체 두오모 방문 안내',
      chatbotAnswer: '성인 표시 가격은 Brunelleschi €30, Giotto €20, Ghiberti €15이며, 돔 등반에는 Brunelleschi Pass가 포함됩니다. 돔은 463계단이고 엘리베이터는 없습니다. Firenze 시내권 버스표는 2026년 8월 1일부터 €2.00·90분 유효하며, Tip Tap 비접촉 결제는 추가요금이 없습니다. 2026년 11월 26–29일 운영시간과 교통 공지는 방문 직전 공식 정보를 확인하세요.',
      chatbotButton: '두오모 확인 메모 열기',
      chatSource: '공식 티켓·운영 안내',
      chatTransitSource: '2026 공식 버스 요금표'
    },
    en: {
      eyebrow: 'FLORENCE · CHECK BEFORE YOUR DUOMO VISIT',
      title: 'Duomo dome and pass notes',
      intro: 'The existing planner itinerary stays as it is. This supplement covers ticket choice and checks for entry, opening times and transit.',
      dateNote: 'Date-limited information: itinerary, weather and transit notices here apply only to 26–29 November 2026. After those dates, treat them as historical and check current official information.',
      cards: [
        {
          title: 'Pass prices and inclusions',
          lines: [
            'Official adult prices shown: Brunelleschi Pass €30 (Dome, Bell Tower, Baptistery, Museum and Santa Reparata); Giotto Pass €20 (Bell Tower, Baptistery, Museum and Santa Reparata; no Dome); Ghiberti Pass €15 (Baptistery, Museum and Santa Reparata). Recheck the official ticket screen before paying.',
            'Each pass is valid for three days starting on the selected date, with one visit to each included site. It cannot be used before that date.'
          ]
        },
        {
          title: 'Timed entry and the Dome',
          lines: [
            'A time slot is required for the Dome with Brunelleschi, the Bell Tower with Giotto, and Santa Reparata with Ghiberti. Other included sites can be visited during the three-day validity. Ghiberti’s Santa Reparata visit must use the date and time selected at purchase.',
            'The Dome climb has 463 steps and no lift. Use the north entrance, Porta della Mandorla, and bring the ticket plus an identity document for the name check. Official guidance says to queue 10 minutes early and allows up to 5 minutes’ lateness; bookings cannot be changed or cancelled after issue. The rule does not specify a passport-only requirement.'
          ]
        },
        {
          title: 'Bags, tower and Baptistery works',
          lines: [
            'Backpacks, suitcases and medium or large bags must be left at the luggage deposit at Piazza Duomo 38/r. Check accepted items and opening times in the official storage notice before visiting.',
            'Giotto’s Bell Tower is under restoration. The official notice says the top terrace remains open, though views may be partly obstructed. The climb is 414 steps with no lift.',
            'The Baptistery vault mosaics are in a restoration programme planned for 2023–2028. The claim that the entrance changed to the south door in September 2026 was not confirmed. Check the official visitor guidance and same-day notices for the entrance.'
          ]
        },
        {
          title: 'Hours, weather and sunset · 26–29 Nov only',
          lines: [
            'The official standard schedule lists the Dome at 08:15–18:45 on weekdays, 08:15–16:30 on Saturdays and 12:45–16:30 on Sundays. This is not a confirmed timetable for each of these four dates. Some facilities showed different times on the official date view and general page, so check the date-specific hours and entry slots just before visiting.',
            'The attached daily rain probabilities, rainfall and temperature figures could not be verified against a current official forecast, so they are not repeated here. Check the latest LaMMA forecast before setting out.',
            'Calculated local sunset: 16:41 on Nov 26, 16:40 on Nov 27, 16:40 on Nov 28 and 16:39 on Nov 29. These times apply only to those dates.'
          ]
        },
      {
        title: 'Buses and fares · 26–29 Nov only',
        lines: [
          'Autolinee Toscane says routes 12, 13 and 39 have been unable to cross Ponte Vespucci because of works since 5 November 2026. The detailed diversion and end date were not confirmed; check the latest notice and stop-by-stop arrivals in the at bus app before setting out.',
          'The published stop lists show Fortezza T1 Strozzi, temporary Piazza Piave and Piazzale Il David on route 13, and Indipendenza Nazionale on route 12. Stops depend on the route and direction; do not treat the lists as interchangeable.',
          'The official Autolinee Toscane fare table sets the Florence urban ticket at €2.00 for 90 minutes from 1 August 2026. Tip Tap contactless has no surcharge: tap when boarding, with one device per passenger. Recheck the official fare page before buying.'
          ]
        }
      ],
      planButton: 'Open the existing Florence itinerary',
      sourceDetails: 'Official sources and day-of checks',
      sourceLabels: {
        plan: 'Official Duomo hours and visit plan', brunelleschi: 'Official Brunelleschi Pass', giotto: 'Official Giotto Pass',
        ghiberti: 'Official Ghiberti Pass', entry: 'Dome entry rules', bags: 'Official luggage storage notice', tower: 'Bell Tower restoration and visit guide',
        mosaics: 'Baptistery mosaic restoration', service: 'Autolinee Toscane service notice', line12: 'Official route 12', line13: 'Official route 13',
        fare: '2026 official transit fare table', taptap: 'Official Tip Tap guidance', app: 'at bus app', weather: 'LaMMA Florence forecast', sunset: 'November 2026 sunset calculation'
      },
      chatbotQuestion: 'Florence Duomo passes and Dome entry',
      chatbotChip: '🏛️ Duomo passes & entry',
      chatbotTitle: 'Florence Duomo visit notes',
      chatbotAnswer: 'The displayed adult prices are €30 for Brunelleschi, €20 for Giotto and €15 for Ghiberti; the Dome climb is included in Brunelleschi. The Dome has 463 steps and no lift. Florence’s urban bus ticket is €2.00 for 90 minutes from 1 August 2026; Tip Tap contactless has no surcharge. Check official hours and the 26–29 Nov 2026 transit notices before visiting.',
      chatbotButton: 'Open Duomo visit notes',
      chatSource: 'Official ticket and visit information',
      chatTransitSource: '2026 official bus fare table'
    },
    zh: {
      eyebrow: '佛罗伦萨 · 参观大教堂前请核对',
      title: '大教堂穹顶与通票备注',
      intro: '现有行程保持不变。本补充仅整理门票选择、入场、开放时间与交通核对事项。',
      dateNote: '限时信息：这里的行程、天气和交通公告仅适用于2026年11月26日至29日。此后请将其视为历史信息，并重新查看官方最新内容。',
      cards: [
        {
          title: '通票价格与包含景点',
          lines: [
            '官网显示的成人价格：Brunelleschi Pass €30（穹顶、钟楼、洗礼堂、博物馆和Santa Reparata）；Giotto Pass €20（钟楼、洗礼堂、博物馆和Santa Reparata，不含穹顶）；Ghiberti Pass €15（洗礼堂、博物馆和Santa Reparata）。付款前请重新核对官方购票页面。',
            '每种通票自所选日期起有效三天，每个包含景点可入场一次，不能在所选日期之前使用。'
          ]
        },
        {
          title: '预约时段与穹顶入场',
          lines: [
            'Brunelleschi需为穹顶预约时段，Giotto需为钟楼预约，Ghiberti需为Santa Reparata预约。其他包含景点可在三天有效期内参观。Ghiberti的Santa Reparata必须按购买时选择的日期与时间入场。',
            '穹顶需攀登463级台阶，没有电梯。请从北侧Porta della Mandorla入口进入，并携带门票和身份证件以核对姓名。官方指引建议提前10分钟排队，最多可迟到5分钟；出票后不能更改或取消预约。官方规则并未限定必须出示护照。'
          ]
        },
        {
          title: '行李、钟楼与洗礼堂施工',
          lines: [
            '背包、行李箱及中大型行李须寄存在Piazza Duomo 38/r行李寄存处。到访前请查看官方公告中的可寄存物品和开放时间。',
            '乔托钟楼正在修复。官方说明称顶部露台仍开放，但视野可能部分受遮挡。攀登需走414级台阶，没有电梯。',
            '洗礼堂穹顶马赛克的修复计划为2023至2028年。未查到“2026年9月起改走南门”的依据。普通入口与当天临时通知请查看官方参观指南。'
          ]
        },
        {
          title: '开放时间、天气与日落 · 仅限11月26–29日',
          lines: [
            '官方一般时刻表列出穹顶平日08:15–18:45、周六08:15–16:30、周日12:45–16:30。这不是这四天逐日确认的时间表。部分设施在官方日期页面与一般页面显示的时间不同，请在到访前查看指定日期的营业时间和入场时段。',
            '附件中的每日降雨概率、降雨量和气温未能通过最新官方预报核实，因此不在此重复。出发前请查看LaMMA最新预报。',
            '计算的当地日落时间：11月26日16:41、27日16:40、28日16:40、29日16:39。仅适用于这些日期。'
          ]
        },
      {
        title: '公交与票价 · 仅限11月26–29日',
        lines: [
          'Autolinee Toscane公告称，因施工，12、13、39路自2026年11月5日起不能经过Ponte Vespucci。公告未确认详细绕行路线和结束日期；出发前请查看最新通知及at bus应用中的站点到站信息。',
          '官方站点列表显示，13路包括Fortezza T1 Strozzi、临时站Piazza Piave和Piazzale Il David；12路包括Indipendenza Nazionale。站点随线路与方向而异，不能互相替代。',
          'Autolinee Toscane官方票价表显示，自2026年8月1日起佛罗伦萨市区票为€2.00、有效90分钟。Tip Tap非接触支付不加收费用：上车时刷卡，每位乘客需使用一台设备。购买前请重新核对官网票价。'
          ]
        }
      ],
      planButton: '查看现有佛罗伦萨行程',
      sourceDetails: '官方来源与当日核对链接',
      sourceLabels: {
        plan: '大教堂官方开放时间与参观指南', brunelleschi: 'Brunelleschi Pass官方说明', giotto: 'Giotto Pass官方说明',
        ghiberti: 'Ghiberti Pass官方说明', entry: '穹顶入场规则', bags: '官方行李寄存公告', tower: '钟楼修复与参观指南',
        mosaics: '洗礼堂马赛克修复', service: 'Autolinee Toscane服务公告', line12: '12路官方线路', line13: '13路官方线路',
        fare: '2026官方交通票价表', taptap: 'Tip Tap官方说明', app: 'at bus应用', weather: 'LaMMA佛罗伦萨天气预报', sunset: '2026年11月日落计算'
      },
      chatbotQuestion: '佛罗伦萨大教堂通票与穹顶入场',
      chatbotChip: '🏛️ 通票与入场',
      chatbotTitle: '佛罗伦萨大教堂参观备注',
      chatbotAnswer: '官网显示的成人票价为Brunelleschi €30、Giotto €20、Ghiberti €15；穹顶攀登包含在Brunelleschi Pass中。穹顶有463级台阶且没有电梯。自2026年8月1日起，佛罗伦萨市区公交票为€2.00、有效90分钟，Tip Tap非接触支付不加收费用。请在到访前核对官方开放时间及2026年11月26–29日的交通公告。',
      chatbotButton: '打开大教堂参观备注',
      chatSource: '官方门票与参观信息',
      chatTransitSource: '2026年官方公交票价表'
    },
    ja: {
      eyebrow: 'フィレンツェ · ドゥオーモ訪問前の確認',
      title: 'ドームとパスの訪問メモ',
      intro: '既存の行程は変更せず、チケット選びと入場・営業時間・交通の確認事項だけを補足します。',
      dateNote: '期間限定情報：日程・天気・交通の告知は2026年11月26〜29日のみ対象です。その後は過去情報として扱い、最新の公式情報をご確認ください。',
      cards: [
        {
          title: 'パスの料金と対象施設',
          lines: [
            '公式案内に表示された大人料金：Brunelleschi Pass €30（ドーム・鐘楼・洗礼堂・博物館・サンタ・レパラータ）、Giotto Pass €20（鐘楼・洗礼堂・博物館・サンタ・レパラータ、ドームを除く）、Ghiberti Pass €15（洗礼堂・博物館・サンタ・レパラータ）。支払い前に公式チケット画面で再確認してください。',
            '各パスは選択日を含む3日間有効で、対象施設は各1回入場できます。選択日より前には利用できません。'
          ]
        },
        {
          title: '時間指定とドーム入場',
          lines: [
            '時間指定が必要なのは、Brunelleschiのドーム、Giottoの鐘楼、Ghibertiのサンタ・レパラータです。ほかの対象施設は3日間の有効期間内に利用できます。Ghibertiのサンタ・レパラータは購入時に選んだ日時に入場します。',
            'ドームは463段の階段で、エレベーターはありません。北側のPorta della Mandorlaから入り、チケット記名確認のためチケットと身分証明書を持参してください。公式案内は10分前の整列と最大5分の遅刻許容を示し、発券後の予約変更・キャンセルはできません。パスポート限定とは記載されていません。'
          ]
        },
        {
          title: '荷物・鐘楼と洗礼堂の工事',
          lines: [
            'リュックサック、スーツケース、中・大型の荷物はPiazza Duomo 38/rの荷物預かり所に預ける必要があります。預けられる荷物と営業時間は訪問前に公式案内をご確認ください。',
            'ジョットの鐘楼は修復工事中です。公式案内では最上部のテラスは開放される一方、眺望が一部遮られる可能性があります。階段は414段で、エレベーターはありません。',
            '洗礼堂ドームのモザイクは2023〜2028年の修復計画です。「2026年9月から南扉に変更」という情報は確認できませんでした。通常の入口と当日の変更は公式訪問案内をご確認ください。'
          ]
        },
        {
          title: '営業時間・天気・日没 · 11月26〜29日限定',
          lines: [
            '公式の通常時間は、ドームが平日08:15〜18:45、土曜08:15〜16:30、日曜12:45〜16:30です。この4日間それぞれの確定時刻ではありません。施設によって公式の日付別画面と一般案内に差があったため、訪問直前に日付別の営業時間と入場枠をご確認ください。',
            '添付の降水確率・降水量・気温は最新の公式予報として確認できなかったため掲載していません。出発前にLaMMAの最新予報をご確認ください。',
            '現地の日没計算時刻：11月26日16:41、27日16:40、28日16:40、29日16:39。この日付のみに適用されます。'
          ]
        },
      {
        title: 'バスと運賃 · 11月26〜29日限定',
        lines: [
          'Autolinee Toscaneの告知によると、工事のため12・13・39番は2026年11月5日からPonte Vespucciを通行できません。迂回経路の詳細と終了日は確認できていないため、出発直前に公式告知とat busアプリの停留所別到着情報をご確認ください。',
          '公式停留所一覧では、13番にFortezza T1 Strozzi・臨時Piazza Piave・Piazzale Il David、12番にIndipendenza Nazionaleが掲載されています。停留所は路線・方向によって異なり、相互に置き換えられません。',
          'Autolinee Toscane公式運賃表では、2026年8月1日からフィレンツェ市内券は€2.00・90分有効です。Tip Tapのタッチ決済に追加料金はありません。乗車時にタッチし、1台の端末につき乗客1人が利用します。購入前に公式運賃をご確認ください。'
          ]
        }
      ],
      planButton: '既存のフィレンツェ行程を見る',
      sourceDetails: '公式情報と当日の確認リンク',
      sourceLabels: {
        plan: 'ドゥオーモ公式営業時間・訪問案内', brunelleschi: 'Brunelleschi Pass公式案内', giotto: 'Giotto Pass公式案内',
        ghiberti: 'Ghiberti Pass公式案内', entry: 'ドーム入場規則', bags: '公式荷物預かり案内', tower: '鐘楼修復・訪問案内',
        mosaics: '洗礼堂モザイク修復', service: 'Autolinee Toscane運行告知', line12: '12番公式路線', line13: '13番公式路線',
        fare: '2026年公式交通運賃表', taptap: 'Tip Tap公式案内', app: 'at busアプリ', weather: 'LaMMAフィレンツェ天気予報', sunset: '2026年11月の日没計算'
      },
      chatbotQuestion: 'フィレンツェのドゥオーモパスとドーム入場',
      chatbotChip: '🏛️ パス・入場案内',
      chatbotTitle: 'フィレンツェ・ドゥオーモ訪問メモ',
      chatbotAnswer: '公式案内の大人料金はBrunelleschi €30、Giotto €20、Ghiberti €15で、ドーム登頂はBrunelleschi Passに含まれます。ドームは463段でエレベーターはありません。2026年8月1日から、フィレンツェ市内バス券は€2.00・90分有効で、Tip Tapのタッチ決済に追加料金はありません。訪問前に営業時間と2026年11月26〜29日の交通告知をご確認ください。',
      chatbotButton: 'ドゥオーモ訪問メモを開く',
      chatSource: '公式チケット・訪問案内',
      chatTransitSource: '2026年公式バス運賃表'
    }
  };

  const SOURCES = [
    { key:'plan', url:'https://duomo.firenze.it/en/visit/plan-your-visit' },
    { key:'brunelleschi', url:'https://duomo.firenze.it/en/720/brunelleschi-pass' },
    { key:'giotto', url:'https://duomo.firenze.it/en/725/giotto-pass' },
    { key:'ghiberti', url:'https://duomo.firenze.it/en/728/ghiberti-pass' },
    { key:'entry', url:'https://duomo.firenze.it/en/opera-magazine/post/11413/brunelleschi-s-dome-all-the-new-entry-rules-from-march-1-2025' },
    { key:'bags', url:'https://duomo.firenze.it/en/news/8952/the-use-of-the-luggage-storage-is-mandatory-for-visitors-to-the-monumental-complex-of-piazza-duomo' },
    { key:'tower', url:'https://duomo.firenze.it/en/discover/giotto-s-bell-tower' },
    { key:'mosaics', url:'https://duomo.firenze.it/en/opera-magazine/post/8538/the-restoration-of-the-mosaics-on-the-vault-of-the-florence-baptistery' },
    { key:'service', url:'https://www.at-bus.it/it/scopri/novita/servizio' },
    { key:'line12', url:'https://www.at-bus.it/it/linee-e-orari/firenze-urbano-12' },
    { key:'line13', url:'https://www.at-bus.it/it/linee-e-orari/firenze-urbano-13' },
    { key:'fare', url:'https://files.at-bus.it/s3fs-public/documents/AT_Carta_Servizi_2026.pdf' },
    { key:'taptap', url:'https://www.at-bus.it/it/tiptap' },
    { key:'app', url:'https://www.at-bus.it/it/app' },
    { key:'weather', url:'https://www.lamma.toscana.it/meteo/meteo-firenze' },
    { key:'sunset', url:'https://www.timeanddate.com/sun/italy/firenze?month=11&year=2026' }
  ];

  function esc(value) {
    return String(value == null ? '' : value).replace(/[&<>"']/g, ch => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' })[ch]);
  }
  function langOf(value) {
    const key = String(value || '').toLowerCase();
    return LANGS.includes(key) ? key : 'ko';
  }
  function currentLang() {
    return langOf(root.currentLang || (root.document && root.document.documentElement && root.document.documentElement.lang) || 'ko');
  }
  function sourceList(t) {
    return SOURCES.map(source => `<li><a href="${esc(source.url)}" target="_blank" rel="noopener noreferrer">${esc(t.sourceLabels[source.key])} ↗</a></li>`).join('');
  }
  function render(lang) {
    const l = langOf(lang);
    const t = COPY[l];
    const cards = t.cards.map(card => `<article class="fdvg-card"><h4>${esc(card.title)}</h4>${card.lines.map(line => `<p>${esc(line)}</p>`).join('')}</article>`).join('');
    return `<section class="florence-duomo-visit-guide" id="${ID}" lang="${l}" aria-labelledby="fdvg-title"><header class="fdvg-header"><span class="fdvg-eyebrow">${esc(t.eyebrow)}</span><h3 id="fdvg-title">${esc(t.title)}</h3><p>${esc(t.intro)}</p><div class="fdvg-date-note">${esc(t.dateNote)}</div></header><div class="fdvg-grid">${cards}</div><div class="fdvg-actions"><button type="button" class="fdvg-plan-link" onclick="openFlorenceDuomoVisitPlan()">${esc(t.planButton)} ↗</button></div><details class="fdvg-sources"><summary>${esc(t.sourceDetails)}</summary><ul>${sourceList(t)}</ul></details></section>`;
  }
  function openGuide() {
    if (typeof root.switchGuidebookChapter === 'function') root.switchGuidebookChapter('chapter-planner');
    if (typeof root.goToBookPage === 'function') root.goToBookPage('chapter-planner', 3, false);
    root.setTimeout(() => {
      const target = root.document && root.document.getElementById(ID);
      if (target) target.scrollIntoView({ behavior:'smooth', block:'start' });
    }, 150);
  }
  root.openFlorenceDuomoVisitPlan = openGuide;

  function isRelevant(query) {
    const q = String(query || '').toLocaleLowerCase();
    const city = /florence|firenze|피렌체|フィレンツェ|佛罗伦萨/.test(q);
    const explicit = /brunelleschi|ghiberti|giotto\s*pass|giotto.?s?\s*(?:bell\s*)?tower|dome\s*pass|duomo\s*(?:pass|ticket|hours|opening)|두오모\s*(?:패스|돔|입장|티켓|시간)|쿠폴라|돔\s*(?:패스|입장|티켓)|조토의?\s*(?:종탑|패스)|기베르티|브루넬레스키|ドゥオーモ.*(?:パス|チケット|時間|入場)|クーポラ|ジョット.*(?:鐘楼|パス)|ギベルティ|ブルネレスキ|大教堂.*(?:通票|门票|开放|时间|穹顶)|布鲁内莱斯基|乔托.*钟楼|吉贝尔蒂|洗礼堂.*(?:通票|入口)/.test(q);
    const florenceTopic = /(?:duomo|dome|cupola|baptistery|santa reparata|bell tower|piazzale michelangelo|bus|fare|public transport|transit|autolinee|tiptap|tip tap|sunset|opening hours|피렌체.*(?:운영시간|영업시간|버스|일몰|교통|요금|승차권)|버스|요금|승차권|교통|미켈란젤로.*(?:버스|언덕)|두오모|돔|세례당|산타 레파라타|종탑|미켈란젤로 언덕|フィレンツェ.*(?:営業時間|バス|日没|運賃|乗車券|交通)|バス|運賃|乗車券|交通|ドゥオーモ|ドーム|洗礼堂|鐘楼|サンタ・レパラータ|ミケランジェロ広場|佛罗伦萨.*(?:开放时间|公交|日落|票价|车票|交通)|公交|票价|车票|交通|主教座堂|穹顶|洗礼堂|钟楼|米开朗基罗广场)/.test(q);
    const otherCity = /\b(?:naples|napoli|rome|roma|venice|venezia|milan|milano)\b|나폴리|로마|베네치아|밀라노|ナポリ|ローマ|ベネチア|ミラノ|那不勒斯|罗马|威尼斯|米兰/.test(q);
    return !otherCity && (explicit || (city && florenceTopic));
  }
  function answer(query) {
    if (!isRelevant(query)) return null;
    const detected = typeof root.getEffectiveLang === 'function' ? root.getEffectiveLang(query) : currentLang();
    const t = COPY[langOf(detected)];
    const fareSource = SOURCES.find(source => source.key === 'fare');
    return `<div class="fdvg-chat-answer"><strong>🏛️ ${esc(t.chatbotTitle)}</strong><p>${esc(t.chatbotAnswer)}</p><a href="https://duomo.firenze.it/en/visit/plan-your-visit" target="_blank" rel="noopener noreferrer">${esc(t.chatSource)} ↗</a> · <a href="${esc(fareSource.url)}" target="_blank" rel="noopener noreferrer">${esc(t.chatTransitSource)} ↗</a><br><button type="button" class="chat-quick-chip fdvg-chat-link" onclick="openFlorenceDuomoVisitPlan()">${esc(t.chatbotButton)} ↗</button></div>`;
  }

  function mount() {
    const doc = root.document;
    if (!doc) return;
    const grids = Array.prototype.slice.call(doc.querySelectorAll('#timelineGrid1, #timelineGrid2, #timelineGrid3'));
    const cityNames = ['피렌체', 'Florence', 'フィレンツェ', '佛罗伦萨'];
    const cards = [];
    grids.forEach(grid => Array.prototype.forEach.call(grid.querySelectorAll('.day-card'), card => {
      const city = card.querySelector('.city-tag');
      if (city && cityNames.some(name => String(city.textContent || '').includes(name))) cards.push(card);
    }));
    let guide = doc.getElementById(ID);
    if (!cards.length) {
      if (guide && guide.parentNode) guide.parentNode.removeChild(guide);
      lastRenderedLang = '';
      return;
    }
    const anchor = doc.getElementById('florence-street-art-safety-guide') || doc.getElementById('florence-photo-review-gallery') || cards[cards.length - 1];
    const lang = currentLang();
    if (!guide) {
      const holder = doc.createElement('div');
      holder.innerHTML = render(lang);
      guide = holder.firstElementChild;
      lastRenderedLang = lang;
    } else if (lastRenderedLang !== lang) {
      guide.outerHTML = render(lang);
      guide = doc.getElementById(ID);
      lastRenderedLang = lang;
    }
    if (guide && (guide.parentElement !== anchor.parentElement || guide.previousElementSibling !== anchor)) {
      anchor.insertAdjacentElement('afterend', guide);
    }
  }

  let lastRenderedLang = '';
  let scheduled = false;
  function scheduleUpdate() {
    if (scheduled) return;
    scheduled = true;
    const run = () => { scheduled = false; mount(); };
    if (typeof root.requestAnimationFrame === 'function') root.requestAnimationFrame(run);
    else root.setTimeout(run, 0);
  }
  function init() {
    const doc = root.document;
    if (!doc || !doc.body) return;
    const planner = doc.getElementById('chapter-planner') || doc.body;
    if (root.MutationObserver) {
      const plannerObserver = new root.MutationObserver(scheduleUpdate);
      plannerObserver.observe(planner, { childList:true, subtree:true });
      const languageObserver = new root.MutationObserver(scheduleUpdate);
      languageObserver.observe(doc.documentElement, { attributes:true, attributeFilter:['lang'] });
    }
    mount();
  }
  if (typeof root.switchLanguage === 'function') {
    const originalSwitchLanguage = root.switchLanguage;
    root.switchLanguage = function () {
      const result = originalSwitchLanguage.apply(this, arguments);
      scheduleUpdate();
      return result;
    };
  }
  if (typeof root.handleLocalChat === 'function') {
    const originalHandleLocalChat = root.handleLocalChat;
    root.handleLocalChat = function (query) {
      return answer(query) || originalHandleLocalChat.apply(this, arguments);
    };
  }
  const chatbotI18n = root.CHATBOT_I18N;
  if (chatbotI18n) {
    LANGS.forEach(lang => {
      const dictionary = chatbotI18n[lang];
      const text = COPY[lang];
      if (!dictionary || !Array.isArray(dictionary.chips) || dictionary.chips.some(chip => String(chip.q || '') === text.chatbotQuestion)) return;
      dictionary.chips.push({ q:text.chatbotQuestion, text:text.chatbotChip });
    });
    if (typeof root.updateChatbotLanguage === 'function') root.updateChatbotLanguage(currentLang());
  }
  root.FLORENCE_DUOMO_VISIT_GUIDE = { render, answer, isRelevant, openGuide, copy:COPY, sources:SOURCES.slice() };
  if (root.document && root.document.readyState === 'loading') root.document.addEventListener('DOMContentLoaded', init, { once:true });
  else init();
})(window);
