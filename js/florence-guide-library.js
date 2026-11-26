/* Four-language Florence guide library with separate fact-check notices. */
(function (root) {
  'use strict';

  const LANGS = ['ko', 'en', 'zh', 'ja'];
  const ID = 'florence-guide-library';
  const ORDER = ['pass-comparison', 'dome-sunset-route', 'rainy-day-shopping', 'uffizi-masterpieces', 'duomo-savings'];
  const GUIDE_META = {
    'pass-comparison': { anchor: 'fg-pass-comparison' },
    'dome-sunset-route': { anchor: 'fg-dome-sunset-route' },
    'rainy-day-shopping': { anchor: 'fg-rainy-day-shopping' },
    'uffizi-masterpieces': { anchor: 'fg-uffizi-masterpieces' },
    'duomo-savings': { anchor: 'fg-duomo-savings' }
  };

  const COPY = {
    ko: {
      eyebrow: '피렌체 · 첨부 가이드 4종', title: '피렌체 방문 가이드 모음',
      intro: '첨부된 한국어 원문과 번역의 본문은 유지했습니다. 공식 안내와 다른 주장과 최신 확인이 필요한 정보는 각 가이드의 별도 주의문에서 확인하세요.',
      dateNote: '기준일이 적힌 날씨·영업시간·운행·예약 정보는 실시간 자료가 아닙니다. 방문 직전에 공식 채널에서 확인하고, 해당 날짜가 지난 정보는 과거 자료로 취급하세요.',
      noteTitle: '공식 안내와의 차이 · 확인이 필요한 점', noteLead: '아래 내용은 원문을 고치지 않고 별도로 덧붙인 검증 메모입니다.',
      officialSources: '공식 출처 확인', originalLabel: '첨부 원문·번역', openGuide: '가이드 열기',
      chipText: ['🏛️ 두오모 패스 비교', '🌅 돔·언덕 동선', '☔ 비 오는 날 쇼핑', '🎨 우피치 작품·규정'],
      prompts: ['피렌체 두오모 3가지 패스 비교', '피렌체 두오모 돔과 미켈란젤로 언덕 동선', '피렌체 비 오는 날 실내 쇼핑', '우피치 필수 작품과 관람 규정'],
      chatTitle: ['두오모 패스 비교 안내', '두오모·미켈란젤로 언덕 동선 안내', '비 오는 날 피렌체 쇼핑 안내', '우피치 작품·관람 규정 안내'],
      chatAnswer: [
        '세 가지 패스 비교와 입장 규정을 정리한 가이드를 열었습니다. 여권만 필수라는 표현, 5분 지각 규정, 세례당 남쪽 문 정보는 공식 안내와 차이가 있어 별도 주의문을 확인하세요.',
        '돔·미켈란젤로 언덕 일정 가이드를 열었습니다. 날짜별 예보와 입장 가능 시간은 확정 정보가 아니므로 출발 전 공식 정보를 다시 확인하세요.',
        '실내 쇼핑 가이드와 주소·운영시간·할인 정보에 대한 별도 검증 메모를 열었습니다. 지점별 최신 운영시간과 재고를 확인하세요.',
        '우피치 작품·동선 가이드와 소요시간, A9 접근, 촬영·물품 규정에 대한 공식 안내 차이를 열었습니다.'
      ],
      sourceNames: ['공식 두오모 방문 안내', 'Brunelleschi Pass 공식 안내', 'Ghiberti Pass 공식 안내', 'Autolinee Toscane 공식 요금표', 'COIN 공식 웹사이트', 'Mercato Centrale 공식 웹사이트', 'Farmacia SS. Annunziata 공식 웹사이트', 'I Gigli 공식 웹사이트', '우피치 공식 웹사이트'],
      notice: {
        'pass-comparison': [
          '원문과 번역은 돔 입장 시 실물 여권 대조가 필수라고 표현합니다. 현재 공식 규정은 명의 지정 티켓과 신분증(ID)을 안내하지만, 여권만 허용한다고 한정하지 않습니다. 허용되는 신분증을 방문일 전에 확인하세요.',
          '원문은 예약 시각에서 정확히 5분 늦어도 입장이 거부된다고 적습니다. 현재 공식 Brunelleschi Pass 안내는 최대 5분 지연을 허용한다고 안내합니다. 구매 시 조건을 다시 확인하세요.',
          '원문은 2026년 9월부터 세례당 입구가 남쪽 문으로 바뀌었다고 적지만, 확인한 공식 패스 안내는 북쪽 문(마르텔리 거리 쪽)을 안내합니다. 당일 입구 공지를 확인하세요.',
          '원문의 “계단 등반 0개”는 돔·종탑을 오르지 않는다는 뜻으로 읽으세요. Santa Reparata 접근은 짧은 계단을 내려가는 구간이 있어 완전한 무계단 동선이라고 단정할 수 없습니다.',
          '패스 가격, 매진 여부, 운영시간, 수리 진행 상황은 바뀔 수 있습니다. 표의 날짜별 날씨 수치에는 확인 가능한 예보 기준 시각이 없어 현재 예보로 간주하지 말고 최신 공식 정보를 확인하세요.'
        ],
        'dome-sunset-route': [
          '표의 날짜별 강수확률·강수량·기온은 기준 시각이 확인되지 않아 최신 공식 예보로 검증하지 못했습니다. 현재 예보처럼 사용하지 말고 출발 전 공식 기상정보를 확인하세요.',
          '일요일 돔·Santa Reparata 시간은 공식 일반 안내와 대체로 일치하지만, 특정 날짜의 휴관·입장 슬롯·예약 가능 여부까지 확정하지 않습니다. 공식 날짜별 안내와 예약 화면을 확인하세요.',
          '여권만 필수라는 표현, 정확히 5분 늦으면 거부된다는 표현은 공식 안내와 다릅니다. 공식 안내는 신분증 제시와 최대 5분 지연 허용을 설명합니다. 현장 입구·티켓 조건을 다시 확인하세요.',
          '이 일정의 주소·교통편·식당 운영·요금은 특정 날짜와 이동 조건에 묶여 있습니다. 노선 우회, 정류장, 운영시간, 예약 가능 여부를 이용 직전에 확인하세요.'
        ],
        'rainy-day-shopping': [
          'COIN 주소 중 Via dei Calzaiuoli 56/R은 현재 공식 지점 정보와 일치하지 않습니다. 원문 주소는 바꾸지 않았으므로 실제 지점 주소를 공식 매장 안내에서 확인하세요.',
          '원문은 중앙시장 1층 평일 마감을 약 14:00로 적지만, 확인한 공식 안내의 마감은 약 15:00입니다. 원문 동선의 14시 마감 판단을 그대로 의존하지 말고 당일 시간을 확인하세요.',
          'Farmacia SS. Annunziata는 지점별 영업시간이 다릅니다. 두 지점에 같은 10:30–19:00 시간이 적용된다고 가정하지 말고 방문할 지점의 시간을 따로 확인하세요. I Gigli도 매장과 식당 운영시간이 서로 다를 수 있습니다.',
          '쿠폰·할인, 별점, 이동거리·시간, 재고·서비스와 택스리펀 기준·공항 처리 절차는 공식 자료로 확인되지 않은 원문 주장입니다. 구매·이동 전에 매장, 세관·세금환급 안내에서 개별 확인하세요.',
          '날짜별 영업시간과 “현재 오픈 중” 표시는 실시간 정보가 아닙니다. 비 오는 날의 이동 경로와 우피치 입장 슬롯도 해당 날짜에 맞춰 다시 확인하세요.'
        ],
        'uffizi-masterpieces': [
          '제시된 구간은 40+45+10+35+10분으로 합계 140분(2시간 20분)입니다. 이를 “2시간 코스”로 그대로 계획하지 마세요. 공식 브로슈어는 두 층을 모두 보는 Classic 코스에 2시간 초과가 걸린다고 안내합니다.',
          '원문은 보티첼리 작품이 A9에 있다고 설명하지만, 현재 공식 공지상 A9는 공사로 폐쇄 대상입니다. A9의 현재 접근 가능 여부와 작품 위치를 현장 안내도에서 확인하세요.',
          '촬영, 우산 반입, 물품보관 규정은 원문의 단정적 표현과 공식 방문 안내 사이에 차이가 있습니다. 세부 허용 범위·보관 조건을 우피치의 최신 관람 규정으로 확인하세요.',
          '물 반입 안내는 우피치 공식 페이지끼리도 서로 일치하지 않습니다. 원문의 “생수병 금지”를 확정 규정으로 간주하지 말고 방문 당일 공식 지침이나 현장 안내를 확인하세요.',
          '2026년 10월 지도·11월 26일 입장·할인·폐관 시간은 날짜가 특정된 정보입니다. 지금 열려 있는 전시실, 입장 시간, 티켓 조건을 공식 예약·방문 안내에서 확인하세요.'
        ]
      }
    },
    en: {
      eyebrow: 'FLORENCE · FOUR ATTACHED GUIDES', title: 'Florence visit guide collection',
      intro: 'The attached Korean originals and translations are preserved. Separate notes under each guide flag statements that differ from official guidance and details that need a fresh check.',
      dateNote: 'Dated weather, opening hours, service and booking details are not live data. Check official channels just before visiting; treat information for past dates as historical.',
      noteTitle: 'Differences from official guidance · items to check', noteLead: 'These fact-check notes are separate from the original wording, which has not been rewritten.',
      officialSources: 'Check official sources', originalLabel: 'Attached source and translation', openGuide: 'Open guide',
      chipText: ['🏛️ Duomo pass comparison', '🌅 Dome & hill route', '☔ Rainy-day shopping', '🎨 Uffizi art & rules'],
      prompts: ['Compare the 3 Florence Duomo passes', 'Florence Duomo Dome and Piazzale Michelangelo route', 'Indoor shopping in Florence on a rainy day', 'Uffizi must-see works and visitor rules'],
      chatTitle: ['Duomo pass comparison', 'Dome and Piazzale Michelangelo route', 'Rainy-day Florence shopping', 'Uffizi works and visitor rules'],
      chatAnswer: [
        'I opened the pass comparison and entry-rule guide. Check its separate notes: passport-only wording, the five-minute lateness rule and the Baptistery south-door claim differ from official guidance.',
        'I opened the Dome and Piazzale Michelangelo route guide. Its date-specific forecast and entry hours are not confirmed live information; check official sources before setting out.',
        'I opened the indoor shopping guide and separate notes on addresses, hours and discounts. Verify the exact branch hours and availability.',
        'I opened the Uffizi art and route guide with separate notes on duration, access to A9, photography and storage rules.'
      ],
      sourceNames: ['Official Duomo visit plan', 'Official Brunelleschi Pass', 'Official Ghiberti Pass', 'Autolinee Toscane official fare table', 'COIN official website', 'Mercato Centrale official website', 'Farmacia SS. Annunziata official website', 'I Gigli official website', 'Official Uffizi website'],
      notice: {
        'pass-comparison': [
          'The source and translations say a physical passport is required for the Dome name check. Current official rules call for a named ticket and an identity document (ID), but do not say that only a passport is accepted. Confirm acceptable ID before visiting.',
          'The source says entry is refused if you are exactly five minutes late. The current official Brunelleschi Pass guidance allows up to five minutes of delay. Recheck the terms shown at purchase.',
          'The source says the Baptistery entrance changed to the south door in September 2026; this was not confirmed. The official pass guidance checked points to the north door on the Via de\' Martelli side. Check same-day entrance notices.',
          'Read the source’s “0 stair climbs” as no Dome or Bell Tower climb. Access to Santa Reparata includes a short descent by stairs, so this is not a guarantee of step-free access.',
          'Pass prices, sell-outs, hours and restoration status can change. The source’s daily weather figures have no verifiable forecast timestamp; do not treat them as a current forecast.'
        ],
        'dome-sunset-route': [
          'The dated rain probability, rainfall and temperature figures have no verified as-of time and could not be confirmed as a current official forecast. Check the latest official forecast before setting out.',
          'The Sunday Dome and Santa Reparata hours broadly match general official guidance, but that does not confirm operations, entry slots or ticket availability for a specific date. Check the official date view and booking screen.',
          'The passport-only and “refused at exactly five minutes late” statements differ from official guidance, which asks for an identity document and allows up to five minutes of delay. Recheck ticket terms and entrance notices.',
          'Addresses, transport, restaurant hours and fares in this route depend on a specific date and travel conditions. Verify diversions, stops, opening times and availability immediately before use.'
        ],
        'rainy-day-shopping': [
          'The COIN address Via dei Calzaiuoli 56/R does not match the current official branch information checked. The source address is retained; verify the exact branch address in COIN’s official store listing.',
          'The source says the Central Market ground-floor market closes around 14:00 on weekdays; the official information checked gives about 15:00. Do not rely on the source’s 14:00 cutoff without checking the day’s hours.',
          'Farmacia SS. Annunziata hours vary by branch; do not assume 10:30–19:00 applies to both locations. Check the branch you plan to visit. I Gigli shop and restaurant hours may also differ.',
          'Coupons and discounts, ratings, distances and travel times, stock and services, and the tax-refund threshold and airport procedure are source claims that were not confirmed in official information. Verify them with the store and current customs/tax-refund guidance.',
          'Dated hours and “open now” labels are not live data. Recheck the route and Uffizi entry slot for the actual visit date.'
        ],
        'uffizi-masterpieces': [
          'The listed blocks total 40+45+10+35+10 = 140 minutes (2 hours 20 minutes), not two hours. Do not plan it as a two-hour route. The official brochure says the Classic route covering both floors takes more than two hours.',
          'The source places Botticelli works in A9, but current official notices list A9 among rooms closed for works. Check the current map and on-site directions before relying on A9 access or room assignments.',
          'The source’s categorical statements on photography, umbrellas and cloakroom rules differ in scope/details from official visitor guidance. Check the latest Uffizi rules for the exact allowances and storage conditions.',
          'Official Uffizi pages conflict on bringing water. Do not treat the source’s bottled-water ban as settled policy; check the current official or on-site guidance on the day.',
          'The October 2026 map and the November 26 entry, discount and closing details are date-specific. Confirm current room access, entry time and ticket terms in the official visit and booking information.'
        ]
      }
    },
    zh: {
      eyebrow: '佛罗伦萨 · 四份附件指南', title: '佛罗伦萨参观指南汇编',
      intro: '保留附件中的韩文原文及其译文。各指南下方另列注意事项，标出与官方指引不同或需要重新核实的内容。',
      dateNote: '带日期的天气、开放时间、交通和预约信息并非实时数据。出发前请查看官方渠道；已过日期的信息应视为历史资料。',
      noteTitle: '与官方指引的差异 · 请核对', noteLead: '以下是单独附加的核查说明，不会改写原文。',
      officialSources: '查看官方来源', originalLabel: '附件原文与译文', openGuide: '打开指南',
      chipText: ['🏛️ 大教堂通票比较', '🌅 穹顶与山顶路线', '☔ 雨天购物', '🎨 乌菲兹作品与规定'],
      prompts: ['比较佛罗伦萨大教堂三种通票', '佛罗伦萨大教堂穹顶与米开朗基罗广场路线', '佛罗伦萨雨天室内购物', '乌菲兹必看作品与参观规定'],
      chatTitle: ['大教堂通票比较', '穹顶与米开朗基罗广场路线', '佛罗伦萨雨天购物', '乌菲兹作品与参观规定'],
      chatAnswer: [
        '已打开通票比较与入场规则指南。请查看单独注意事项：仅限护照、迟到五分钟规则和洗礼堂南门说法与官方指引存在差异。',
        '已打开穹顶与米开朗基罗广场路线指南。日期限定的天气预报和入场时间并非实时确认信息，出发前请再次查看官方资料。',
        '已打开室内购物指南及地址、营业时间和折扣的核查说明。请确认具体分店营业时间与商品供应。',
        '已打开乌菲兹作品与路线指南，并附有参观时长、A9开放情况、拍摄与寄存规定的核查说明。'
      ],
      sourceNames: ['大教堂官方参观指南', 'Brunelleschi Pass官方说明', 'Ghiberti Pass官方说明', 'Autolinee Toscane官方票价表', 'COIN官方网站', 'Mercato Centrale官方网站', 'Farmacia SS. Annunziata官方网站', 'I Gigli官方网站', '乌菲兹官方网站'],
      notice: {
        'pass-comparison': [
          '原文及译文称进入穹顶必须出示实体护照以核对姓名。当前官方规则要求实名门票和身份证件（ID），但没有限定只能使用护照。请在到访前确认可接受的证件。',
          '原文称预约时间迟到正好五分钟也会被拒绝入场。当前Brunelleschi Pass官方说明允许最多迟到五分钟。购买时请重新核对条款。',
          '原文称洗礼堂入口于2026年9月改为南门；此说法未获确认。核对过的官方通票说明指向北门（Via de\' Martelli一侧）。请查看当天入口通知。',
          '原文“无需爬任何台阶”应理解为无需攀登穹顶或钟楼。Santa Reparata入口包含一段短楼梯下行，因此不能据此认定全程无台阶。',
          '通票价格、售罄情况、开放时间和修复进度都可能变化。原文每日天气数字没有可核实的预报时间戳，不应当作当前预报。'
        ],
        'dome-sunset-route': [
          '表中的日期降雨概率、降雨量和气温没有可核实的发布时间，无法确认是最新官方预报。出发前请查看最新官方天气信息。',
          '周日穹顶与Santa Reparata的时间大体符合官方一般说明，但不能据此确认某个具体日期的开放、预约时段或余票。请查看官方日期页面和订票页面。',
          '“必须出示护照”和“正好迟到五分钟也拒绝入场”与官方指引不同；官方要求身份证件并允许最多迟到五分钟。请重新核对票务条款和入口通知。',
          '路线中的地址、交通、餐厅时间和票价都受具体日期与交通状况影响。使用前请核对绕行、站点、营业时间和余位。'
        ],
        'rainy-day-shopping': [
          'COIN的Via dei Calzaiuoli 56/R地址与核对过的当前官方门店信息不符。原文地址仍予保留，请在COIN官方门店列表确认具体分店地址。',
          '原文称中央市场一层传统市场工作日约14:00关门；核对过的官方信息约为15:00。请勿未经核对便按原文14:00截止时间安排行程。',
          'Farmacia SS. Annunziata各分店营业时间不同，不要假设10:30–19:00适用于两处地址，请分别查看计划前往的分店。I Gigli的商店与餐厅营业时间也可能不同。',
          '优惠券与折扣、评分、距离和耗时、库存与服务、退税门槛及机场办理流程均为尚未通过官方资料确认的原文说法。请向商店及当前海关/退税渠道核实。',
          '带日期的营业时间和“正在营业”不是实时信息。请按实际到访日期重新确认路线及乌菲兹入场时段。'
        ],
        'uffizi-masterpieces': [
          '列出的时间段合计40+45+10+35+10=140分钟（2小时20分钟），并非两小时。不要按两小时行程安排。官方手册称参观两层的Classic路线需要超过两小时。',
          '原文称波提切利作品位于A9，但当前官方公告将A9列为因施工关闭的展厅。请在依赖A9或房间编号前核对最新地图和现场指示。',
          '原文对拍照、雨伞和衣帽寄存规则的绝对表述与官方参观指引在适用范围/细节上存在差异。请查看乌菲兹最新规定，确认具体允许范围和寄存条件。',
          '乌菲兹不同官方页面对能否带水的说明相互矛盾。不要把原文“禁止瓶装水”视为已确定的规定；请查看当天官方或现场指引。',
          '2026年10月地图及11月26日的入场、优惠和闭馆信息都是日期限定内容。请通过官方参观与订票信息确认当前展厅开放、入场时间和票务条款。'
        ]
      }
    },
    ja: {
      eyebrow: 'フィレンツェ · 添付ガイド4件', title: 'フィレンツェ訪問ガイド集',
      intro: '添付された韓国語原文と翻訳本文はそのまま掲載しています。公式案内との差や、改めて確認が必要な情報は各ガイドの別枠で示します。',
      dateNote: '日付付きの天気・営業時間・運行・予約情報はリアルタイム情報ではありません。訪問直前に公式情報を確認し、過去の日付の情報は参考記録として扱ってください。',
      noteTitle: '公式案内との差 · 要確認事項', noteLead: '以下は原文を書き換えず、別途追加した確認メモです。',
      officialSources: '公式情報を確認', originalLabel: '添付原文・翻訳', openGuide: 'ガイドを開く',
      chipText: ['🏛️ ドゥオーモのパス比較', '🌅 ドーム・丘の動線', '☔ 雨の日の買い物', '🎨 ウフィツィ作品・規則'],
      prompts: ['フィレンツェのドゥオーモ3種類のパスを比較', 'ドゥオーモのドームとミケランジェロ広場の動線', '雨の日のフィレンツェ屋内ショッピング', 'ウフィツィ必見作品と観覧規則'],
      chatTitle: ['ドゥオーモのパス比較', 'ドームとミケランジェロ広場の動線', '雨の日のフィレンツェ買い物', 'ウフィツィ作品と観覧規則'],
      chatAnswer: [
        'パス比較と入場規則のガイドを開きました。「パスポート限定」「5分遅刻の扱い」「洗礼堂の南扉」は公式案内と異なるため、別枠の注意事項をご確認ください。',
        'ドームとミケランジェロ広場の動線ガイドを開きました。日付別の天気予報や入場時間は最新確定情報ではないため、出発前に公式情報を確認してください。',
        '屋内ショッピングガイドと、住所・営業時間・割引に関する確認メモを開きました。店舗ごとの営業時間や在庫をご確認ください。',
        'ウフィツィの作品・動線ガイドを開きました。所要時間、A9へのアクセス、撮影・荷物預かり規則について別枠の注意事項があります。'
      ],
      sourceNames: ['ドゥオーモ公式訪問案内', 'Brunelleschi Pass公式案内', 'Ghiberti Pass公式案内', 'Autolinee Toscane公式運賃表', 'COIN公式サイト', 'Mercato Centrale公式サイト', 'Farmacia SS. Annunziata公式サイト', 'I Gigli公式サイト', 'ウフィツィ公式サイト'],
      notice: {
        'pass-comparison': [
          '原文と翻訳は、ドーム入場時に実物のパスポート照合が必須としています。現在の公式規則は記名式チケットと身分証明書（ID）を求めていますが、パスポート限定とはしていません。利用可能な身分証を事前に確認してください。',
          '原文は予約時刻からちょうど5分遅れても入場拒否としています。現在のBrunelleschi Pass公式案内は最大5分の遅刻を認めています。購入時の条件を再確認してください。',
          '原文は2026年9月から洗礼堂入口が南扉に変更としていますが、確認できませんでした。確認した公式パス案内はVia de\' Martelli側の北扉を案内しています。当日の入口告知をご確認ください。',
          '原文の「階段の上り下りは0段」は、ドームや鐘楼を登らない意味として読んでください。サンタ・レパラータへのアクセスには短い階段の下りがあり、完全な段差なしとは限りません。',
          'パス料金、売り切れ、営業時間、修復状況は変わることがあります。原文の日別天気数値には確認できる予報時刻がなく、現在の予報として扱わないでください。'
        ],
        'dome-sunset-route': [
          '日付別の降水確率・降水量・気温には確認可能な発表時刻がなく、最新の公式予報とは確認できませんでした。出発前に最新の公式予報をご確認ください。',
          '日曜のドームとサンタ・レパラータの時間は公式の通常案内とおおむね一致しますが、特定日の営業、入場枠、空席までは確定しません。公式の日付別案内と予約画面をご確認ください。',
          '「パスポート必須」「ちょうど5分遅れると入場拒否」という記述は、身分証明書を求め最大5分の遅刻を認める公式案内と異なります。チケット条件と入口告知を再確認してください。',
          '住所、交通、飲食店の営業時間、運賃は特定の日と移動状況に左右されます。迂回、停留所、営業時間、空き状況を利用直前にご確認ください。'
        ],
        'rainy-day-shopping': [
          'COINの住所のうちVia dei Calzaiuoli 56/Rは、確認した現在の公式店舗情報と一致しません。原文の住所は残しているため、実際の店舗住所をCOIN公式一覧で確認してください。',
          '原文は中央市場1階の平日終了を約14:00としていますが、確認した公式案内では約15:00です。原文の14時を前提にせず、当日の時間をご確認ください。',
          'Farmacia SS. Annunziataは店舗ごとに営業時間が異なります。10:30〜19:00が両店舗に当てはまると考えず、行く店舗ごとに確認してください。I Gigliも店舗と飲食店で営業時間が異なる場合があります。',
          'クーポン・割引、評価、距離・所要時間、在庫・サービス、免税の基準と空港での手続きは、公式情報で確認できていない原文の記述です。店舗および最新の税関・免税案内で個別に確認してください。',
          '日付付き営業時間や「現在営業中」はリアルタイム情報ではありません。実際の訪問日に合わせて動線とウフィツィの入場枠を再確認してください。'
        ],
        'uffizi-masterpieces': [
          '記載された時間は40+45+10+35+10分で合計140分（2時間20分）です。2時間コースとして計画しないでください。公式ブローシャーでは両フロアを見るClassicコースは2時間を超えると案内しています。',
          '原文はボッティチェリ作品がA9にあるとしていますが、現在の公式告知ではA9は工事のため閉鎖対象です。A9への入場や展示室番号に頼る前に最新マップと現地表示をご確認ください。',
          '撮影、傘の持ち込み、クローク規則について、原文の断定的な表現と公式案内では適用範囲・詳細に差があります。最新のウフィツィ観覧規則で許可範囲と預け入れ条件をご確認ください。',
          '水の持ち込みについて、ウフィツィの公式ページ間で案内が一致していません。原文の「ボトル水禁止」を確定規則とせず、当日の公式案内または現地表示をご確認ください。',
          '2026年10月の地図と11月26日の入館・割引・閉館時刻は日付限定情報です。現在の展示室、入館時刻、チケット条件を公式の訪問・予約案内で確認してください。'
        ]
      }
    }
  };

  const savingsCopy = root.FLORENCE_GUIDE_SAVINGS_COPY || {};
  LANGS.forEach(lang => {
    const addition = savingsCopy[lang];
    if (!addition) return;
    const locale = COPY[lang];
    locale.eyebrow = addition.eyebrow;
    locale.title = addition.title;
    locale.chipText.push(addition.chipText);
    locale.prompts.push(addition.prompt);
    locale.chatTitle.push(addition.chatTitle);
    locale.chatAnswer.push(addition.chatAnswer);
    locale.sourceNames.push(...addition.sourceNames);
    locale.notice['duomo-savings'] = addition.notice;
  });

  const SOURCE_URLS = [
    'https://duomo.firenze.it/en/visit/plan-your-visit',
    'https://duomo.firenze.it/en/720/brunelleschi-pass',
    'https://duomo.firenze.it/en/728/ghiberti-pass',
    'https://files.at-bus.it/s3fs-public/documents/AT_Carta_Servizi_2026.pdf',
    'https://www.coin.it/',
    'https://www.mercatocentrale.it/',
    'https://www.farmaciassannunziata1561.com/',
    'https://www.igigli.it/',
    'https://www.uffizi.it/en/',
    'https://duomo.firenze.it/en/713/tickets',
    'https://duomo.firenze.it/en/didactic-tours',
    'https://duomo.firenze.it/en/discover/cathedral',
    'https://duomo.firenze.it/en/discover/crypt-of-santa-reparata',
    'https://duomo.firenze.it/en/projects-for-accessibility',
    'https://www.firenzecard.it/en/',
    'https://www.firenzecard.it/en/faq',
    'https://www.toscanino.com/toscanino-firenze/',
    'https://www.rinascente.it/en/ristoranti-terrazza-store-firenze-piazza-della-repubblica',
    'https://www.feelflorence.it/en/points-interest/piazzale-michelangiolo',
    'https://duomo.firenze.it/en/news/8991/from-1-august-2023-to-visit-santa-reparata-ghiberti-pass-holders-must-access-the-time-slot-chosen-at-the-time-of-purchase',
    'https://duomo.firenze.it/en/home'
  ];
  const SOURCES_BY_GUIDE = {
    'pass-comparison': [0, 1, 2],
    'dome-sunset-route': [0, 1, 2, 3],
    'rainy-day-shopping': [4, 5, 6, 7, 8],
    'uffizi-masterpieces': [8],
    'duomo-savings': [0, 1, 2, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
  };

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
  function displayTitle(id, lang) {
    const data = root.FLORENCE_GUIDE_CONTENT && root.FLORENCE_GUIDE_CONTENT[id] && root.FLORENCE_GUIDE_CONTENT[id][lang];
    return data ? data.title : id;
  }
  function renderGuide(id, lang, t) {
    const data = root.FLORENCE_GUIDE_CONTENT && root.FLORENCE_GUIDE_CONTENT[id] && root.FLORENCE_GUIDE_CONTENT[id][lang];
    if (!data) return '';
    const index = ORDER.indexOf(id);
    const notes = t.notice[id].map(note => `<li>${esc(note)}</li>`).join('');
    const links = SOURCES_BY_GUIDE[id].map(sourceIndex => `<li><a href="${esc(SOURCE_URLS[sourceIndex])}" target="_blank" rel="noopener noreferrer">${esc(t.sourceNames[sourceIndex])} ↗</a></li>`).join('');
    return `<details class="fgl-guide" id="${GUIDE_META[id].anchor}"><summary><span>${esc(data.title)}</span><small>${esc(t.openGuide)}</small></summary><div class="fgl-guide-body"><aside class="fgl-notice"><h4>${esc(t.noteTitle)}</h4><p>${esc(t.noteLead)}</p><ul>${notes}</ul><details class="fgl-sources"><summary>${esc(t.officialSources)}</summary><ul>${links}</ul></details></aside><article class="fgl-original"><div class="fgl-original-label">${esc(t.originalLabel)}</div>${data.html}</article></div></details>`;
  }
  function render(lang) {
    const l = langOf(lang);
    const t = COPY[l];
    const guides = ORDER.map(id => renderGuide(id, l, t)).join('');
    const shortcuts = ORDER.map((id, index) => `<button type="button" onclick="openFlorenceGuide('${id}')">${esc(t.chipText[index])}</button>`).join('');
    return `<section class="florence-guide-library" id="${ID}" lang="${l}" aria-labelledby="fgl-title"><header class="fgl-header"><span class="fgl-eyebrow">${esc(t.eyebrow)}</span><h3 id="fgl-title">${esc(t.title)}</h3><p>${esc(t.intro)}</p><div class="fgl-date-note">${esc(t.dateNote)}</div><nav class="fgl-shortcuts" aria-label="${esc(t.title)}">${shortcuts}</nav></header><div class="fgl-list">${guides}</div></section>`;
  }
  function openGuide(id) {
    const doc = root.document;
    if (typeof root.switchGuidebookChapter === 'function') root.switchGuidebookChapter('chapter-planner');
    if (typeof root.goToBookPage === 'function') root.goToBookPage('chapter-planner', 3, false);
    root.setTimeout(() => {
      const target = doc && doc.getElementById(ID);
      const detail = doc && doc.getElementById(GUIDE_META[id] && GUIDE_META[id].anchor);
      if (detail) detail.open = true;
      if (target) target.scrollIntoView({ behavior:'smooth', block:'start' });
    }, 150);
  }
  root.openFlorenceGuide = openGuide;

  function matchGuide(query) {
    const q = String(query || '').toLocaleLowerCase();
    const otherCity = /\b(?:naples|napoli|rome|roma|venice|venezia|milan|milano)\b|나폴리|로마|베네치아|밀라노|ナポリ|ローマ|ベネチア|ミラノ|那不勒斯|罗马|威尼斯|米兰/.test(q);
    if (otherCity) return -1;
    if (/uffizi|우피치|ウフィツィ|乌菲兹|乌菲茲/.test(q)) return 3;
    if (/duomo.{0,24}(?:saving|save|discount|cheap|price|fee|free)|(?:saving|save|discount|cheap|price|fee|free).{0,24}duomo|두오모.{0,12}(?:절약|할인|저렴|입장료|요금|무료)|(?:절약|할인|저렴|입장료|요금).{0,12}두오모|大教堂.{0,12}(?:省钱|优惠|折扣|便宜|票价|免费)|(?:省钱|优惠|折扣|便宜|票价).{0,12}大教堂|ドゥオーモ.{0,12}(?:節約|割引|安く|料金|無料)|(?:節約|割引|安く|料金).{0,12}ドゥオーモ/i.test(q)) return 4;
    if (/rain|shopping|shop|market|pharmacy|tax.?free|discount|coupon|비\s*오는\s*날|쇼핑|시장|약국|면세|할인|雨|购物|購物|市场|市場|药妆|免税|買い物|ショッピング|市場|薬局|免税|割引/.test(q)) return 2;
    if (/piazzale|michelangelo|sunset|sunset|hill|언덕|일몰|노을|미켈란젤로|米开朗基罗|日落|米開朗基羅|夕日|ミケランジェロ|広場/.test(q)) return 1;
    if (/brunelleschi|ghiberti|giotto\s*pass|duomo\s*pass|두오모\s*(?:패스|통합권)|대성당.*통票|通票|ドゥオーモ.*パス|クーポラ.*パス|大教堂.*通票/.test(q)) return 0;
    return -1;
  }
  function answer(query) {
    const index = matchGuide(query);
    if (index < 0) return null;
    const lang = currentLang();
    const t = COPY[lang];
    const key = ORDER[index];
    return `<div class="fgl-chat-answer"><strong>${esc(t.chatTitle[index])}</strong><p>${esc(t.chatAnswer[index])}</p><button type="button" class="chat-quick-chip" onclick="openFlorenceGuide('${key}')">${esc(t.openGuide)} ↗</button></div>`;
  }

  function mount() {
    const doc = root.document;
    if (!doc || !doc.body) return;
    const planner = doc.getElementById('chapter-planner');
    if (!planner) return;
    const anchor = doc.getElementById('florence-duomo-visit-guide');
    if (!anchor) return;
    const lang = currentLang();
    let section = doc.getElementById(ID);
    if (!section) {
      const holder = doc.createElement('div');
      holder.innerHTML = render(lang);
      section = holder.firstElementChild;
      anchor.insertAdjacentElement('afterend', section);
      lastRenderedLang = lang;
    } else if (lastRenderedLang !== lang) {
      section.outerHTML = render(lang);
      section = doc.getElementById(ID);
      lastRenderedLang = lang;
    } else if (section.previousElementSibling !== anchor) {
      anchor.insertAdjacentElement('afterend', section);
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
    const planner = doc.getElementById('chapter-planner');
    if (root.MutationObserver && planner) {
      const observer = new root.MutationObserver(scheduleUpdate);
      observer.observe(planner, { childList:true, subtree:true });
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

  const chatI18n = root.CHATBOT_I18N;
  if (chatI18n) {
    LANGS.forEach(lang => {
      const dictionary = chatI18n[lang];
      const t = COPY[lang];
      if (!dictionary || !Array.isArray(dictionary.chips)) return;
      ORDER.forEach((key, index) => {
        if (!dictionary.chips.some(chip => String(chip.q || '') === t.prompts[index])) {
          dictionary.chips.push({ q:t.prompts[index], text:t.chipText[index] });
        }
      });
    });
    if (typeof root.updateChatbotLanguage === 'function') root.updateChatbotLanguage(currentLang());
  }

  root.FLORENCE_GUIDE_LIBRARY = { render, answer, matchGuide, openGuide, copy:COPY, order:ORDER.slice() };
  if (root.document && root.document.readyState === 'loading') root.document.addEventListener('DOMContentLoaded', init, { once:true });
  else init();
})(window);
