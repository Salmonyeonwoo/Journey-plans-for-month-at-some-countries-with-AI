/* Date-specific Seville plan (20–21 Nov 2026).
 * Kept separate from the generic 30-day route so later dates and bookings stay unchanged.
 * All operational claims are qualified in the per-stop notes and linked to their source.
 */
(function (global) {
  'use strict';

  const LANGS = ['ko', 'en', 'ja', 'zh'];
  const TXT = (value, lang) => value[lang] || value.ko;
  const safe = value => String(value == null ? '' : value).replace(/[&<>"']/g, ch => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[ch]));

  const SOURCE_LABELS = {
    alcazar: { ko: '알카사르 공식 방문 안내', en: 'Official Alcázar visitor information', ja: 'アルカサル公式来訪案内', zh: '阿尔卡萨官方参观信息' },
    visitSeville: { ko: '세비야 공식 관광 안내', en: 'Official Seville tourism guide', ja: 'セビリア公式観光案内', zh: '塞维利亚官方旅游指南' },
    unesco: { ko: '유네스코 세계유산 설명', en: 'UNESCO World Heritage description', ja: 'ユネスコ世界遺産の解説', zh: '联合国教科文组织世界遗产说明' },
    pilatos: { ko: '메디나셀리 재단 방문 안내', en: 'Medinaceli Foundation visitor information', ja: 'メディナセリ財団の来訪案内', zh: '梅迪纳塞利基金会参观信息' },
    spainInfo: { ko: '스페인 공식 관광 포털', en: 'Spain’s official tourism portal', ja: 'スペイン政府観光公式サイト', zh: '西班牙官方旅游网站' },
    waterAlley: { ko: '물 골목 공식 안내', en: 'Official Water Alley guide', ja: '水の小径の公式案内', zh: '水巷官方介绍' },
    santaCruz: { ko: '산타 크루스 공식 안내', en: 'Official Santa Cruz guide', ja: 'サンタ・クルス公式案内', zh: '圣克鲁斯官方介绍' },
    archive: { ko: '스페인 문화부 방문 안내', en: 'Spanish Ministry of Culture visitor information', ja: 'スペイン文化省の来訪案内', zh: '西班牙文化部参观信息' },
    archiveTransport: { ko: '고문서관 교통 안내', en: 'Archive transport information', ja: '文書館への交通案内', zh: '档案馆交通信息' },
    naval: { ko: '해군박물관 재단 안내', en: 'Naval Museum Foundation guide', ja: '海軍博物館財団の案内', zh: '海军博物馆基金会介绍' },
    cruise: { ko: '유람선 운영사 안내', en: 'Cruise operator information', ja: 'クルーズ運航会社の案内', zh: '游船运营方信息' },
    river: { ko: '과달키비르강 공식 안내', en: 'Official Guadalquivir guide', ja: 'グアダルキビル川の公式案内', zh: '瓜达尔基维尔河官方介绍' },
    trianaBridge: { ko: '트리아나 다리 공식 안내', en: 'Official Triana Bridge guide', ja: 'トリアナ橋の公式案内', zh: '特里亚纳桥官方介绍' },
    betis: { ko: '칼레 베티스 공식 안내', en: 'Official Calle Betis guide', ja: 'カジェ・ベティス公式案内', zh: '贝蒂斯街官方介绍' },
    cityWalk: { ko: '세비야 시청 강변 산책로 안내', en: 'Seville City Council riverwalk guide', ja: 'セビリア市役所の河岸遊歩道案内', zh: '塞维利亚市政府河岸步道介绍' },
    comercio: { ko: '세비야 상인회 업소 안내', en: 'Seville business association listing', ja: 'セビリア商店会の店舗案内', zh: '塞维利亚商户协会店铺介绍' },
    bullring: { ko: '투우장 공식 방문 안내', en: 'Official bullring visitor information', ja: '闘牛場公式来訪案内', zh: '斗牛场官方参观信息' },
    bullHistory: { ko: '소유 기관의 건축사', en: 'Owner institution’s construction history', ja: '所有機関による建設史', zh: '所有机构的建筑史' },
    market: { ko: '트리아나 시장 공식 관광 안내', en: 'Official Triana Market tourism guide', ja: 'トリアナ市場の公式観光案内', zh: '特里亚纳市场官方旅游介绍' },
    marketHours: { ko: '시장 공식 시간표', en: 'Official market hours', ja: '市場公式営業時間', zh: '市场官方营业时间' },
    castle: { ko: '산 호르헤 성 공식 상태 안내', en: 'Official San Jorge Castle status', ja: 'サン・ホルヘ城の公式状況', zh: '圣豪尔赫城堡官方状态' },
    duenas: { ko: '두에냐스 궁전 공식 방문 안내', en: 'Official Dueñas Palace visitor information', ja: 'ドゥエニャス宮殿公式来訪案内', zh: '杜埃尼亚斯宫官方参观信息' },
    atalaya: { ko: '아탈라야 전망대 운영자 안내', en: 'Atalaya operator information', ja: 'アタラヤ展望台の運営者案内', zh: '阿塔拉亚观景台运营方信息' },
    elCorte: { ko: '엘 꼬르떼 잉글레스 지점 안내', en: 'El Corte Inglés store information', ja: 'エル・コルテ・イングレス店舗案内', zh: 'El Corte Inglés门店信息' },
    rinconcillo: { ko: '엘 린콘시요 공식 역사·예약 안내', en: 'El Rinconcillo history and reservations', ja: 'エル・リンコンシージョの歴史・予約案内', zh: 'El Rinconcillo历史与预约信息' }
  };

  const DAYS = {
    '2026-11-20': {
      dateLabel: { ko: '11월 20일(금)', en: 'Fri, 20 November', ja: '11月20日（金）', zh: '11月20日（周五）' },
      city: { ko: '세비야', en: 'Seville', ja: 'セビリア', zh: '塞维利亚' },
      theme: {
        ko: '알카사르 정원 · 대항해시대 기록 · 과달키비르강 유람선',
        en: 'Alcázar gardens · Age of Discovery records · Guadalquivir cruise',
        ja: 'アルカサル庭園・大航海時代の記録・グアダルキビル川クルーズ',
        zh: '阿尔卡萨花园 · 大航海时代档案 · 瓜达尔基维尔河游船'
      },
      labels: {
        morning: { ko: '오전: 궁전과 안뜰 중심', en: 'Morning: palace and courtyards', ja: '午前：宮殿と中庭を中心に', zh: '上午：以宫殿与庭院为主' },
        rest: { ko: '점심·실내 관람 중 앉아 쉬기', en: 'Sit-down lunch and indoor break', ja: '昼食と屋内見学で座って休憩', zh: '午餐与室内参观中坐下休息' },
        evening: { ko: '강변과 트리아나 짧게', en: 'Keep the riverfront and Triana short', ja: '川辺とトリアナは短めに', zh: '河岸与特里亚纳短程游览' }
      },
      morning: {
        ko: '10:00 알카사르 입장권이 있을 때 궁전·안뜰과 정원 일부를 여유 있게 봅니다. 표가 없으면 Casa de Pilatos를 대체안으로 확인하세요.',
        en: 'At 10:00, visit the palace, courtyards and a small part of the gardens only if you have an Alcázar ticket. If tickets are unavailable, consider Casa de Pilatos instead.',
        ja: '10:00はアルカサルの入場券がある場合に、宮殿・中庭と庭園の一部をゆっくり見学します。券がなければ代替案としてカサ・デ・ピラトスを検討してください。',
        zh: '10:00仅在持有阿尔卡萨门票时参观宫殿、庭院和部分花园。若无票，可考虑改去皮拉托斯之家。'
      },
      rest: {
        ko: '12:45 산타 크루스에서 앉아 점심을 먹고 골목은 짧게 둘러봅니다. 14:30 인디아스 고문서관은 당일 개방을 확인한 경우에만 들르세요.',
        en: 'Have a seated lunch in Santa Cruz at 12:45 and keep the alley walk short. Visit the Archivo at 14:30 only after confirming it is open that day.',
        ja: '12:45にサンタ・クルスで座って昼食を取り、路地歩きは短くします。14:30のインディアス総文書館は当日の開館を確認できた場合のみ訪問してください。',
        zh: '12:45在圣克鲁斯坐下用午餐，巷弄只短程散步。只有确认当天开放后，才安排14:30参观印度总档案馆。'
      },
      evening: {
        ko: '16:00 황금의 탑은 우선 강변 외관을 보고, 확인된 다음 출항편이 있으면 약 1시간 유람선을 탑니다. 18:30 트리아나 다리·베티스 거리는 짧게 걷고 피곤하면 택시를 이용하세요.',
        en: 'At 16:00, see the Torre del Oro from the riverfront first; take the roughly one-hour cruise only if a sailing is confirmed. Keep the 18:30 Triana Bridge/Calle Betis walk short and take a taxi if tired.',
        ja: '16:00はまず川辺から黄金の塔を眺め、出航を確認できた場合に約1時間のクルーズに乗ります。18:30のトリアナ橋・カジェ・ベティスは短く歩き、疲れたらタクシーを使ってください。',
        zh: '16:00先在河岸看黄金塔；只有确认有船后才乘坐约1小时游船。18:30的特里亚纳桥与贝蒂斯街步行应缩短，疲劳时可乘出租车。'
      },
      walk: {
        ko: '낮음~중간. 왕궁과 골목, 강변을 모두 길게 걷지 말고 한 구간씩 쉬어가세요. 구시가지와 강변의 바닥 상태·경사는 구간별로 다를 수 있어 평탄·무장애를 보장하지 않습니다.',
        en: 'Low to moderate. Do not try to walk every palace garden, alley and riverfront stretch; pause between sections. Historic paving and river paths vary, so a fully flat or step-free route is not guaranteed.',
        ja: '歩行量は少〜中程度。宮殿の庭、路地、川辺をすべて長く歩かず、区間ごとに休みます。歴史地区や河岸の路面・傾斜は場所ごとに異なり、全区間の平坦・段差なしを保証できません。',
        zh: '步行量为低至中等。不要把宫殿花园、巷弄和整段河岸都走完，分段休息。历史街区与河边路面、坡度各不相同，不保证全程平坦或无台阶。'
      },
      transport: {
        ko: '도보 + 필요 시 택시. 유람선은 날짜별 운항과 선박별 승선 조건을 확인한 뒤 이용합니다.',
        en: 'Walk, with a taxi if needed. Check the date-specific sailing and boarding arrangements for the chosen boat before relying on the cruise.',
        ja: '徒歩＋必要に応じてタクシー。クルーズを予定に入れる前に、当日の運航と船ごとの乗船条件を確認してください。',
        zh: '步行，必要时乘出租车。把游船纳入安排前，先核实当天班次及所选船只的登船条件。'
      },
      meal: {
        ko: '산타 크루스 점심, 트리아나 강변 저녁 후보. 식당 영업시간·좌석은 당일 확인이 필요합니다.',
        en: 'Lunch in Santa Cruz; dinner by the Triana riverfront is an option. Check restaurant hours and seating on the day.',
        ja: 'サンタ・クルスで昼食、トリアナの川辺で夕食を検討。店舗の営業と席は当日確認してください。',
        zh: '圣克鲁斯午餐；可考虑在特里亚纳河边晚餐。餐厅营业与座位请当天确认。'
      },
      events: {
        ko: ['알카사르 또는 대체 궁전', '산타 크루스 점심', '인디아스 고문서관(개방 확인)', '강 유람선(출항 확인)', '트리아나 강변'],
        en: ['Alcázar or palace alternative', 'Santa Cruz lunch', 'Archivo (check opening)', 'River cruise (check sailing)', 'Triana riverfront'],
        ja: ['アルカサルまたは代替宮殿', 'サンタ・クルスで昼食', '総文書館（開館確認）', '川のクルーズ（運航確認）', 'トリアナ川辺'],
        zh: ['阿尔卡萨或替代宫殿', '圣克鲁斯午餐', '总档案馆（先确认开放）', '河上游船（先确认班次）', '特里亚纳河岸']
      },
      caveatTitle: { ko: '방문 전 확인', en: 'Check before setting out', ja: '出発前に確認', zh: '出发前请核实' },
      caveat: {
        ko: '알카사르의 11월 일반 겨울 시간은 09:30–17:00이나 입장권 재고는 확인하지 않았습니다. 인디아스 고문서관과 황금의 탑 내부의 11월 20일 날짜별 운영시간도 확인되지 않았습니다. 유람선 운영사의 겨울 일반 시간표는 매시 출항(11:00–19:00)이지만, 11월 20일 개별 운항은 확인되지 않았습니다. 예약·결제는 하지 않았습니다.',
        en: 'The Alcázar’s general winter hours are 09:30–17:00, but ticket availability was not checked. Date-specific 20 November hours for the Archivo and Torre del Oro interior were not confirmed. The cruise operator lists a general winter timetable with hourly departures from 11:00 to 19:00, but the 20 November sailing was not verified. Nothing has been booked or paid for.',
        ja: 'アルカサルの一般的な冬季時間は09:30〜17:00ですが、入場券の空きは確認していません。11月20日のインディアス総文書館と黄金の塔内部の個別営業時間も未確認です。運航会社の一般冬季表は11:00〜19:00の毎時出航ですが、11月20日の便は確認していません。予約・支払いはしていません。',
        zh: '阿尔卡萨冬季一般开放时间为09:30–17:00，但未核实门票余量。印度总档案馆与黄金塔内部在11月20日的具体开放时间也未确认。游船运营方公布的冬季一般时刻表为11:00–19:00每小时一班，但未核实11月20日的实际班次。尚未预订或付款。'
      },
      stops: [
        {
          time: '10:00', title: { ko: '알카사르 왕궁과 정원', en: 'Real Alcázar and gardens', ja: 'レアル・アルカサルと庭園', zh: '塞维利亚王宫与花园' },
          detail: {
            ko: '10세기 무슬림 통치자의 궁전 터에서 발전한 왕궁 복합체입니다. 14세기 페드로 1세의 무데하르 궁전과 안뜰에서 이슬람·기독교 안달루시아 건축이 겹쳐진 모습을 볼 수 있습니다. 정원은 넓으므로 부모님과는 모든 구역을 걷기보다 궁전·안뜰과 일부 정원만 여유 있게 고르는 편이 좋습니다.',
            en: 'A palace complex that grew from a 10th-century Muslim ruler’s palace site. The 14th-century Mudéjar palace of Pedro I and its courtyards show Andalusian Islamic and Christian influences together. The grounds are extensive, so with your parents, focus on the palace, courtyards and only part of the gardens rather than trying to cover everything.',
            ja: '10世紀のイスラム統治者の宮殿跡から発展した宮殿群です。ペドロ1世の14世紀ムデハル宮殿と中庭には、アンダルシアのイスラム・キリスト教建築が重なります。敷地は広いため、ご両親とは全域を歩かず、宮殿・中庭と庭園の一部に絞るのがおすすめです。',
            zh: '这座宫殿群发展自10世纪穆斯林统治者的宫殿遗址。佩德罗一世的14世纪穆德哈尔宫殿与庭院展现了安达卢西亚伊斯兰和基督教建筑的交融。园区很大，建议陪父母重点看宫殿、庭院和部分花园，不必走遍全部区域。'
          },
          note: {
            ko: '일반 겨울 운영시간은 매일 09:30–17:00, 퇴장 시작 17:45입니다. 실시간 입장권은 확인하지 않았습니다. UNESCO 등재는 대성당·알카사르·인디아스 고문서관을 포함한 세비야 기념물군이며, 알카사르 단독 등재로 표현하지 않습니다.',
            en: 'General winter hours are 09:30–17:00 daily, with visitors asked to leave from 17:45. Live ticket stock was not checked. UNESCO listing covers Seville’s group of monuments including the Cathedral, Alcázar and Archivo; do not describe the Alcázar as a standalone listing.',
            ja: '一般的な冬季営業時間は毎日09:30〜17:00、退場開始は17:45です。リアルタイムのチケット在庫は確認していません。ユネスコ登録は大聖堂・アルカサル・総文書館を含むセビリアの記念物群であり、アルカサル単独の登録とは表現しません。',
            zh: '冬季一般开放时间为每日09:30–17:00，17:45开始清场。未查询实时余票。联合国教科文组织列入的是包括大教堂、王宫和总档案馆在内的塞维利亚纪念建筑群，不应写成王宫单独列入。'
          },
          aliases: ['alcázar', 'alcazar', 'real alcázar', 'real alcazar', '알카사르', '알카사르 왕궁', 'アルカサル', 'アルカサール', '阿尔卡萨', '塞维利亚王宫'],
          sources: [
            ['alcazar', 'https://alcazarsevilla.org/prepara-la-visita/'],
            ['visitSeville', 'https://visitasevilla.es/real-alcazar-de-sevilla/'],
            ['unesco', 'https://whc.unesco.org/en/list/383/']
          ]
        },
        {
          time: '10:00 · 대안', title: { ko: '플랜 B · 카사 데 필라토스', en: 'Plan B · Casa de Pilatos', ja: '代替案・カサ・デ・ピラトス', zh: '备选方案 · 皮拉托斯之家' },
          detail: {
            ko: '세비야 귀족 저택으로, 주 안뜰의 타일·석고 장식과 대리석 기둥에서 고딕·무데하르·르네상스 요소를 함께 볼 수 있습니다. 알카사르 입장권을 구하지 못한 경우 궁전 분위기의 대체 방문지로 검토하세요.',
            en: 'A Seville aristocratic residence whose main courtyard combines tile and plaster decoration with Gothic, Mudéjar and Renaissance elements. Consider it as a palace-style alternative if you cannot obtain Alcázar tickets.',
            ja: 'セビリアの貴族邸宅で、主中庭のタイル・漆喰装飾や大理石柱にゴシック、ムデハル、ルネサンスの要素が見られます。アルカサルの入場券が取れない場合の宮殿風の代替訪問先として検討できます。',
            zh: '这是一座塞维利亚贵族宅邸，主庭院的瓷砖、灰泥装饰和大理石柱融合了哥特、穆德哈尔与文艺复兴元素。若买不到王宫门票，可将其作为宫殿风格的替代选择。'
          },
          note: {
            ko: '재단 페이지의 일반 표기는 매일 09:00–18:00이며 마지막 입장은 확인되지 않았습니다. 입장 대기·계단 우회·접근성은 보장되지 않으니 현장 확인이 필요합니다.',
            en: 'The foundation lists general hours of 09:00–18:00 daily; a last-entry time was not confirmed. Queues, stair-free routes and accessibility are not guaranteed; check on site.',
            ja: '財団の一般案内は毎日09:00〜18:00ですが、最終入場時刻は確認できていません。待ち時間、階段を避ける経路、アクセシビリティは保証されないため現地で確認してください。',
            zh: '基金会公布的一般开放时间为每日09:00–18:00，未确认最后入场时间。排队情况、无楼梯路线和无障碍条件均不保证，请现场确认。'
          },
          aliases: ['casa de pilatos', 'casa pilatos', '필라토스의 집', '카사 데 필라토스', 'カサ・デ・ピラトス', '皮拉托斯之家'],
          sources: [
            ['pilatos', 'https://fundacionmedinaceli.org/en/monuments/house-of-pilate/'],
            ['spainInfo', 'https://www.spain.info/en/places-of-interest/casa-pilatos/']
          ]
        },
        {
          time: '12:45', title: { ko: '산타 크루스와 칼레혼 델 아구아', en: 'Santa Cruz and Callejón del Agua', ja: 'サンタ・クルスとカジェホン・デル・アグア', zh: '圣克鲁斯与水巷' },
          detail: {
            ko: '산타 크루스는 중세 유대인 지구의 역사를 지닌 동네입니다. 칼레혼 델 아구아는 성벽을 따라 이어지는 약 140m 골목으로, 과거 카르모나 수로에서 알카사르 정원으로 물을 보냈던 수로의 기억을 간직합니다. 골목은 좁고 구불구불하므로 짧게 걷고 점심은 앉아서 쉬세요.',
            en: 'Santa Cruz has a history as Seville’s medieval Jewish quarter. Callejón del Agua is an approximately 140-metre lane alongside the city wall, recalling conduits that once carried water from the Carmona aqueduct to the Alcázar gardens. The alleys are narrow and winding; keep the walk short and sit down for lunch.',
            ja: 'サンタ・クルスは中世セビリアのユダヤ人街の歴史を持つ地区です。カジェホン・デル・アグアは城壁沿いの約140mの小径で、カルモナ水道からアルカサル庭園へ水を運んだ水路の記憶を伝えます。路地は狭く曲がりくねるため、歩行は短くし、昼食では座って休みましょう。',
            zh: '圣克鲁斯有塞维利亚中世纪犹太区的历史。水巷沿城墙而行，约140米长，令人想起曾将卡莫纳水道的水引入王宫花园的水渠。巷道狭窄且曲折，建议短程散步，并坐下用午餐休息。'
          },
          note: {
            ko: '11월 20일의 식당 영업이나 골목现场 통제는 확인되지 않았습니다. 정확한 포장·경사·무단차 여부도 공식 자료에서 확인되지 않으므로 걷기 부담이 있으면 골목 산책을 생략할 수 있습니다.',
            en: 'Restaurant hours and any lane restrictions for 20 November were not checked. Official sources do not establish the paving, gradient or step-free status; skip the alley walk if it feels demanding.',
            ja: '11月20日の飲食店営業や路地の規制は確認していません。路面・傾斜・段差の有無も公式資料では確認できないため、負担があれば路地歩きは省いてください。',
            zh: '未核实11月20日餐厅营业或巷道管制。官方资料未确认路面、坡度或无台阶情况；若步行吃力，可跳过巷弄散步。'
          },
          aliases: ['santa cruz', 'barrio de santa cruz', 'callejón del agua', 'callejon del agua', '산타 크루스', '산타크루스', '물 골목', 'カジェホン・デル・アグア', 'サンタ・クルス', '圣克鲁斯', '水巷'],
          sources: [
            ['waterAlley', 'https://visitasevilla.es/en/water-alley/'],
            ['santaCruz', 'https://visitasevilla.es/en/barrio-de-santa-cruz/']
          ]
        },
        {
          time: '14:30 · 개방 확인', title: { ko: '인디아스 고문서관 (Archivo General de Indias)', en: 'Archivo General de Indias', ja: 'インディアス総文書館', zh: '印度总档案馆' },
          detail: {
            ko: '1585년 상인 거래소 Casa Lonja로 지어진 건물이 1785년 인디아스 총문서관이 되었습니다. 아메리카와 스페인의 관계를 보여주는 기록을 보존하는 장소여서, 종교 건축과 다른 관점으로 대항해시대의 행정·교역 역사를 접할 수 있습니다.',
            en: 'Built in 1585 as the merchants’ exchange Casa Lonja, the building became the General Archive of the Indies in 1785. It preserves records relating to Spain and the Americas, offering a different lens on the Age of Discovery from Seville’s religious monuments.',
            ja: '1585年に商人取引所カサ・ロンハとして建てられ、1785年にインディアス総文書館となりました。スペインとアメリカ大陸に関する記録を保存し、セビリアの宗教建築とは異なる視点から大航海時代の行政・交易史を見られます。',
            zh: '这座建筑于1585年作为商人交易所Casa Lonja建成，1785年改为印度总档案馆。馆藏保存了西班牙与美洲相关档案，让游客从行政与贸易角度认识大航海时代，不同于宗教建筑的参观体验。'
          },
          note: {
            ko: '공식 안내는 무료·자유 관람과 수용 인원에 따른 입장 제한 가능성을 안내합니다. 11월 20일 날짜별 운영시간은 확인되지 않았으므로 방문 직전 확인하세요. 전시 중인 특정 항해 지도나 원본 문서는 미리 단정하지 않습니다.',
            en: 'Official information describes free, self-guided visits but notes that capacity limits may restrict entry. Date-specific hours for 20 November were not confirmed; check before going. No particular chart or original document is promised to be on display.',
            ja: '公式案内では無料・自由見学ですが、収容人数により入場制限の可能性があります。11月20日の個別営業時間は未確認のため、訪問直前に確認してください。特定の海図や原本資料が展示中とは断定しません。',
            zh: '官方说明为免费自助参观，但可能因容量限制入场。11月20日的具体开放时间未确认，请出发前核实。不保证某幅航海图或特定原件正在展出。'
          },
          aliases: ['archivo general de indias', 'archivo de indias', '인디아스 고문서관', '인디아스 총문서관', 'インディアス総文書館', '印度总档案馆'],
          sources: [
            ['archive', 'https://www.cultura.gob.es/cultura/areas/archivos/mc/archivos/agi/visitas.html'],
            ['archiveTransport', 'https://www.cultura.gob.es/cultura/areas/archivos/mc/archivos/agi/comollegar.html'],
            ['unesco', 'https://whc.unesco.org/en/list/383/']
          ]
        },
        {
          time: '16:00', title: { ko: '황금의 탑 (Torre del Oro)', en: 'Torre del Oro (Golden Tower)', ja: '黄金の塔（トーレ・デル・オロ）', zh: '黄金塔（Torre del Oro）' },
          detail: {
            ko: '과달키비르강을 지키기 위해 13세기 초 세워진 방어탑입니다. 내부 해군박물관은 두 개의 관람층과 테라스에 해도·항해 도구·선박 모형 등을 전시합니다. 강변 외관만 보는 짧은 방문도 일정에 충분히 어울립니다.',
            en: 'A defensive tower built in the early 13th century to guard the Guadalquivir. Its Naval Museum has two visitor levels and a terrace, with charts, navigation instruments and ship models. A brief exterior stop by the river is also worthwhile.',
            ja: 'グアダルキビル川を守るため13世紀初頭に建てられた防御塔です。海軍博物館は見学できる2つの階とテラスを備え、海図・航海器具・船の模型などを展示しています。川辺から外観を見る短い立寄りもできます。',
            zh: '这座防御塔建于13世纪初，用于守护瓜达尔基维尔河。海军博物馆设有两层展区和露台，展出海图、航海仪器与船模。也可以只在河边短暂停留，欣赏塔的外观。'
          },
          note: {
            ko: '공식 기관마다 일반 개관시간 안내가 서로 달라 11월 20일 내부 운영시간은 확정하지 않았습니다. 입장료도 안내하지 않습니다. 일정은 외관 중심으로 잡고, 내부 관람은 당일 공식 확인 후 선택하세요.',
            en: 'Official institutions publish conflicting general opening hours, so the Torre’s interior hours for 20 November are not confirmed here. No admission price is stated. Plan for the exterior; enter only after checking official information that day.',
            ja: '公式機関同士で一般営業時間の表記が異なるため、11月20日の内部営業時間は確定していません。入場料も記載しません。外観を中心に予定し、内部見学は当日の公式情報を確認してから選択してください。',
            zh: '不同官方机构公布的一般开放时间互有出入，因此未确认11月20日内部开放时间，也不标注门票价格。以外观参观为主；当天核实官方信息后再决定是否入内。'
          },
          aliases: ['torre del oro', 'golden tower', '황금의 탑', '황금탑', '黄金の塔', '黄金塔'],
          sources: [
            ['visitSeville', 'https://visitasevilla.es/torre-del-oro/'],
            ['naval', 'https://www.fundacionmuseonaval.com/museonavalsevilla.html']
          ]
        },
        {
          time: '다음 확인편 · 약 1시간', title: { ko: '과달키비르강 유람선', en: 'Guadalquivir River cruise', ja: 'グアダルキビル川クルーズ', zh: '瓜达尔基维尔河游船' },
          detail: {
            ko: '토레 델 오로 맞은편 마르케스 데 콘타데로 선착장에서 출발하는 순환 유람선으로, 운영사는 약 1시간 코스와 강변의 다리·탑·궁전 전망을 안내합니다. 앉아서 강 풍경을 보는 시간이지만, 선착장 이동과 승하선은 별도로 필요합니다.',
            en: 'The operator describes a roughly one-hour loop from the Marqués de Contadero landing opposite the Torre del Oro, with views of the riverfront bridges, towers and palaces. The ride offers seated sightseeing, but reaching the landing and boarding still require movement.',
            ja: '運航会社によると、黄金の塔向かいのマルケス・デ・コンタデロ船着場から出る約1時間の周遊便で、川沿いの橋・塔・宮殿を眺められます。船内は座って見学できますが、船着場への移動と乗降は必要です。',
            zh: '运营方介绍的环线游船约1小时，从黄金塔对面的Marqués de Contadero码头出发，可眺望河畔桥梁、塔楼与宫殿。船上可以坐着观景，但仍需步行到码头并上下船。'
          },
          note: {
            ko: '운영사의 일반 겨울 안내는 10–4월 매시 11:00–19:00 출항이지만 11월 20일 개별 운항을 확인한 것은 아닙니다. 16:30/노을 출항으로 확정하지 말고, 방문 당일 운항·잔여석·승선 조건을 확인하세요. 모든 선박의 휠체어 접근을 보장하지 않습니다.',
            en: 'The operator’s general winter guidance lists hourly departures from 11:00 to 19:00 in October–April, but this does not verify a 20 November sailing. Do not treat 16:30 or a sunset cruise as confirmed; check departures, space and boarding arrangements that day. Wheelchair access is not guaranteed on every boat.',
            ja: '運航会社の一般冬季案内は10〜4月の11:00〜19:00毎時出航ですが、11月20日の便を確認したものではありません。16:30便やサンセット便と決めつけず、当日に運航・空席・乗船条件を確認してください。すべての船で車椅子利用が可能とは限りません。',
            zh: '运营方的一般冬季说明为10月至次年4月11:00–19:00每小时发船，但并未核实11月20日具体班次。不要把16:30或日落航次当作已确认；当天需核实班次、余位与登船条件。并非每艘船都保证轮椅可达。'
          },
          aliases: ['guadalquivir cruise', 'river cruise', 'cruceros torre del oro', 'crucero por el guadalquivir', '과달키비르강 유람선', '강 유람선', '川クルーズ', '河上游船', '瓜达尔基维尔河游船'],
          sources: [
            ['cruise', 'https://crucerosensevilla.com/entradas/paseo-en-barco-por-sevilla/'],
            ['river', 'https://visitasevilla.es/el-rio-guadalquivir/']
          ]
        },
        {
          time: '18:30', title: { ko: '트리아나 다리와 칼레 베티스', en: 'Triana Bridge and Calle Betis', ja: 'トリアナ橋とカジェ・ベティス', zh: '特里亚纳桥与贝蒂斯街' },
          detail: {
            ko: '1852년 개통한 이사벨 2세 다리를 건너 트리아나 쪽 강변을 짧게 둘러봅니다. 칼레 베티스는 과거 강가 항구와 선착장·창고가 이어졌던 거리로, 강 건너 구시가지 풍경을 볼 수 있습니다. 강변 바닥은 구간에 따라 알베로와 작은 돌 포장이 섞일 수 있습니다.',
            en: 'Cross the Isabel II Bridge, opened in 1852, and take a short look along the Triana riverfront. Calle Betis was associated with the old river port, landing places and warehouses, with views back toward the historic centre. Some nearby paths use albero and small stone paving.',
            ja: '1852年開通のイサベル2世橋を渡り、トリアナ側の川辺を短く見ます。カジェ・ベティスはかつて川港や船着場、倉庫に関わる通りで、旧市街を望めます。近くの遊歩道にはアルベロや小さな石畳が使われる区間があります。',
            zh: '走过1852年开通的伊莎贝尔二世桥，在特里亚纳一侧河岸短暂游览。贝蒂斯街曾与河港、码头和仓库相关，可回望历史城区。附近部分步道使用albero土料与小块石铺面。'
          },
          note: {
            ko: '다리와 강변 산책로의 바닥은 전 구간이 같지 않을 수 있습니다. 요철·포석이 불편하면 다리와 강변을 모두 왕복하지 말고 짧게 본 뒤 택시로 이동하세요. 저녁 식당의 날짜별 영업은 확인되지 않았습니다.',
            en: 'Paving may vary along the bridge and river paths. If uneven stones are uncomfortable, avoid a long return walk: see a short stretch and take a taxi onward. Date-specific restaurant hours were not checked.',
            ja: '橋と川辺の路面は全区間で同じとは限りません。石畳や凹凸が負担なら長い往復は避け、短く見た後はタクシーで移動してください。夕食店の当日営業は未確認です。',
            zh: '桥面与河边步道的铺装可能不一致。若凹凸石路不舒服，不要长距离往返；短程看看后可乘出租车离开。未核实餐厅当天营业。'
          },
          aliases: ['puente de triana', 'puente de isabel ii', 'calle betis', 'triana bridge', '트리아나 다리', '이사벨 2세 다리', '베티스 거리', 'トリアナ橋', 'カジェ・ベティス', '特里亚纳桥', '贝蒂斯街'],
          sources: [
            ['trianaBridge', 'https://visitasevilla.es/puente-de-triana/'],
            ['betis', 'https://visitasevilla.es/calle-betis/'],
            ['cityWalk', 'https://www.sevilla.org/servicios/medio-ambiente-parques-jardines/parques/paseos-arbolados/paseo-nuestra-senora-de-la-o']
          ]
        }
      ]
    },
    '2026-11-21': {
      dateLabel: { ko: '11월 21일(토)', en: 'Sat, 21 November', ja: '11月21日（土）', zh: '11月21日（周六）' },
      city: { ko: '세비야', en: 'Seville', ja: 'セビリア', zh: '塞维利亚' },
      theme: {
        ko: '마에스트란사 투우장 · 트리아나 로컬 시장 · 저택 또는 전망대',
        en: 'Maestranza bullring · Triana market · palace or viewpoint',
        ja: 'マエストランサ闘牛場・トリアナ市場・宮殿または展望台',
        zh: '马埃斯特兰萨斗牛场 · 特里亚纳市场 · 宫邸或观景台'
      },
      labels: {
        morning: { ko: '오전: 추로스와 투우장', en: 'Morning: churros and bullring', ja: '午前：チュロスと闘牛場', zh: '上午：吉事果与斗牛场' },
        rest: { ko: '시장 점심 후 한 곳만 선택', en: 'Market lunch, then choose one visit', ja: '市場で昼食後、見学先は一つだけ', zh: '市场午餐后只选一处参观' },
        evening: { ko: '쇼핑·저녁 후 21시 숙소 복귀', en: 'Shopping and dinner; return by 21:00', ja: '買い物・夕食後、21時までに宿へ', zh: '购物与晚餐后21:00前回住宿处' }
      },
      morning: {
        ko: '09:30 Bar El Comercio에서 추로스(영업 확인 필요), 10:30 마에스트란사 투우장 방문(당일 관람시간 확인).',
        en: 'At 09:30, try churros at Bar El Comercio if open; visit the Maestranza at 10:30 only after confirming that day’s visitor hours.',
        ja: '09:30に営業を確認できればBar El Comercioでチュロス、10:30に当日の見学時間を確認してマエストランサ闘牛場へ。',
        zh: '09:30若确认营业，可在Bar El Comercio吃吉事果；10:30参观马埃斯特兰萨前先核实当天开放时间。'
      },
      rest: {
        ko: '12:15 트리아나 시장에서 점심과 짧은 시장 구경. 산 호르헤 성 유적 내부는 공식 관광 안내에 폐쇄로 표시되어 있으므로 일정에서 제외합니다. 14:45 Dueñas 또는 Atalaya 중 하나만 고르세요.',
        en: 'Have lunch and a short market visit at Triana Market around 12:15. The official tourism page currently marks the San Jorge Castle archaeological site closed, so it is not part of the interior itinerary. At 14:45, choose either Dueñas or Atalaya—not both.',
        ja: '12:15頃にトリアナ市場で昼食と短い見学。公式観光ページでサン・ホルヘ城の遺跡は現在閉鎖表示のため、内部見学は予定に入れません。14:45はドゥエニャス宮殿かアタラヤのどちらか一つを選んでください。',
        zh: '12:15左右在特里亚纳市场午餐并短暂参观。目前塞维利亚官方旅游页面将圣豪尔赫城堡遗址标为关闭，因此不安排内部参观。14:45只选杜埃尼亚斯宫或阿塔拉亚其中之一。'
      },
      evening: {
        ko: '17:00 엘 꼬르떼 잉글레스 쇼핑은 선택 사항입니다. 19:00 El Rinconcillo는 영업을 확인한 경우 방문하고, 아니면 가족이 좋아한 다른 저녁 메뉴로 바꾸세요. 21:00까지 숙소로 돌아와 탑승권 3명분 오프라인 저장을 확인하고, 호텔에 11/22 일요일 07:00 공항행 택시를 요청합니다(예약 여부 미확인).',
        en: 'El Corte Inglés at 17:00 is optional. Go to El Rinconcillo at 19:00 only if it is open then; otherwise choose another family-favourite dinner. Return by 21:00, confirm offline boarding passes for all three travellers, and ask the hotel to arrange a taxi to the airport for Sunday 22 November at 07:00 (not yet confirmed).',
        ja: '17:00のエル・コルテ・イングレスは任意です。19:00のエル・リンコンシージョは営業を確認できた場合のみ訪れ、閉店ならご家族のお気に入りの夕食に変更します。21:00までに宿へ戻り、3人分の搭乗券をオフライン保存できるか確認し、ホテルに11月22日（日）07:00発の空港タクシーを依頼します（予約未確認）。',
        zh: '17:00的El Corte Inglés购物可选。只有确认营业时才在19:00去El Rinconcillo，否则改吃家人喜欢的其他晚餐。21:00前回到住宿处，确认3人的登机牌已离线保存，并请酒店安排11月22日（周日）07:00前往机场的出租车（尚未确认预订）。'
      },
      walk: {
        ko: '낮음~중간. 시장·투우장 내부에 걷기와 계단·바닥 변화가 있을 수 있습니다. 오후 궁전/전망대는 하나만 선택하고, 아탈라야는 도심에서 택시 이동을 고려하세요.',
        en: 'Low to moderate, but the market and bullring may involve walking, stairs or changing surfaces. Choose only one afternoon attraction; consider a taxi to Atalaya, which is away from the historic centre.',
        ja: '歩行量は少〜中程度ですが、市場・闘牛場内には歩行や階段、路面の変化があり得ます。午後は一か所だけにし、旧市街から離れたアタラヤへはタクシーを検討してください。',
        zh: '步行量为低至中等，但市场与斗牛场内可能需要步行、上下台阶或经过不同路面。下午只选一处景点；阿塔拉亚远离历史城区，可考虑乘出租车。'
      },
      transport: {
        ko: '도보 + 필요 시 택시. 아탈라야 선택 시 시장에서 도보 10분으로 단정하지 말고 실제 이동을 별도로 확인하세요. 다음 날 택시는 호텔에 요청만 할 예정입니다.',
        en: 'Walk, with a taxi if needed. If choosing Atalaya, do not assume it is a 10-minute walk from the market; check the actual transfer. The next-day taxi is only to be requested from the hotel.',
        ja: '徒歩＋必要ならタクシー。アタラヤを選ぶ場合、市場から徒歩10分とは限らないため実際の移動を確認してください。翌朝のタクシーはホテルに依頼する予定です。',
        zh: '步行，必要时乘出租车。若选阿塔拉亚，不要假定从市场步行10分钟即可到达，请另行核实交通。次日出租车目前只是计划向酒店提出请求。'
      },
      meal: {
        ko: 'Bar El Comercio 추로스(영업 확인), 트리아나 시장 점심, 저녁은 El Rinconcillo 또는 가족 선호 식당(영업 확인).',
        en: 'Bar El Comercio churros if open; lunch at Triana Market; dinner at El Rinconcillo or another family choice if open.',
        ja: 'Bar El Comercioのチュロス（営業確認）、トリアナ市場で昼食、夕食はエル・リンコンシージョまたはご家族のお気に入り（営業確認）。',
        zh: 'Bar El Comercio吉事果（先确认营业）、特里亚纳市场午餐；晚餐可选El Rinconcillo或家人喜欢的餐厅（先确认营业）。'
      },
      events: {
        ko: ['Bar El Comercio 추로스(확인)', '마에스트란사 투우장', '트리아나 시장', 'Dueñas 또는 Atalaya 택 1', '탑승권·공항 택시 체크'],
        en: ['Churros (check opening)', 'Maestranza bullring', 'Triana Market', 'Choose Dueñas or Atalaya', 'Boarding passes and airport taxi'],
        ja: ['チュロス（営業確認）', 'マエストランサ闘牛場', 'トリアナ市場', 'ドゥエニャスまたはアタラヤ', '搭乗券・空港タクシー確認'],
        zh: ['吉事果（确认营业）', '马埃斯特兰萨斗牛场', '特里亚纳市场', '杜埃尼亚斯或阿塔拉亚二选一', '检查登机牌与机场出租车']
      },
      caveatTitle: { ko: '영업·이동 확인', en: 'Check opening and transfers', ja: '営業・移動を確認', zh: '请核实营业与交通' },
      caveat: {
        ko: '시장 상점의 일반 토요일 게시시간은 09:00–14:30이나 날짜별 공지는 확인하지 않았습니다. 산 호르헤 성 유적은 공식 관광 안내에 현재 폐쇄로 표시됩니다. 투우장·카페·식당과 Dueñas의 11월 21일 운영은 별도 확인이 필요합니다. Atalaya 일반 겨울 안내(2026-10-25~2027-03-27)는 11:00–01:00이며, 날짜별 변경·입장 조건은 확인해야 합니다. 일정은 제안이며 예약이나 택시를 확정하지 않았습니다.',
        en: 'The market’s posted general Saturday shop hours are 09:00–14:30, but no date-specific notice was checked. The official tourism page currently marks the San Jorge Castle site closed. Confirm 21 November opening for the bullring, cafés, restaurants and Dueñas. Atalaya’s general winter listing for 25 Oct 2026–27 Mar 2027 is 11:00–01:00; check for date-specific changes and entry conditions. This is a proposal; no reservations or taxi have been confirmed.',
        ja: '市場が掲示する一般的な土曜の店舗時間は09:00〜14:30ですが、日付別のお知らせは未確認です。公式観光ページではサン・ホルヘ城遺跡は現在閉鎖表示です。闘牛場・カフェ・飲食店・ドゥエニャスの11月21日の営業を確認してください。アタラヤの一般冬季案内（2026年10月25日〜2027年3月27日）は11:00〜01:00ですが、日付別変更と入場条件の確認が必要です。提案日程であり、予約やタクシーは確定していません。',
        zh: '市场公布的一般周六店铺时间为09:00–14:30，但未核对该日期的特别通知。官方旅游页面目前将圣豪尔赫城堡遗址标为关闭。斗牛场、咖啡馆、餐厅和杜埃尼亚斯宫11月21日是否营业均需确认。阿塔拉亚公布的一般冬季时间（2026年10月25日至2027年3月27日）为11:00–01:00；请核实当天是否变更及入场条件。此行程仅为建议，未确认任何预订或出租车。'
      },
      stops: [
        {
          time: '09:30', title: { ko: 'Bar El Comercio · 추로스와 핫초코', en: 'Bar El Comercio · churros and chocolate', ja: 'Bar El Comercio・チュロスとチョコレート', zh: 'Bar El Comercio · 吉事果与热巧克力' },
          detail: {
            ko: 'Calle Lineros의 전통 카페 겸 바입니다. 지역 상인회는 ‘1904년 카페’로 소개하고, 초콜릿과 추로스를 대표 메뉴로 안내합니다. 세비야식 아침 간식에 앉아 쉬는 정류장으로 활용하세요.',
            en: 'A traditional café and bar on Calle Lineros. The local business association calls it a “café of 1904” and highlights churros with chocolate. Use it as a seated snack stop rather than adding a long walk.',
            ja: 'カジェ・リネロスにある伝統的なカフェ兼バーです。地元商店会は「1904年のカフェ」と紹介し、チュロスとチョコレートを挙げています。長い散歩を加えず、座って朝食を取る立寄り先にしましょう。',
            zh: '这是一家位于Lineros街的传统咖啡馆兼酒吧。当地商户协会称其为“1904年的咖啡馆”，并介绍吉事果和巧克力。可把它作为坐下吃早餐的短暂停留点。'
          },
          note: {
            ko: '1904년 이후 영업이 끊기지 않았다는 의미로 확대하지 않습니다. 11월 21일 영업시간·대기는 확인되지 않았으므로 출발 전에 확인하세요.',
            en: 'The “1904” description does not prove uninterrupted operation since that year. Opening hours and queues for 21 November were not checked; confirm before setting out.',
            ja: '「1904年」はその年以降ずっと営業が続いたことを証明する表現ではありません。11月21日の営業時間と待ち時間は未確認のため、出発前に確認してください。',
            zh: '“1904年”这一介绍并不能证明此后从未停业。未核实11月21日营业时间或排队情况，请出发前确认。'
          },
          aliases: ['bar el comercio', 'el comercio', '바르 엘 코메르시오', '엘 코메르시오', 'チュロス', '吉事果'],
          sources: [['comercio', 'https://www.alcentro.es/socio/bar-el-comercio']]
        },
        {
          time: '10:30', title: { ko: '마에스트란사 투우장과 박물관', en: 'Maestranza bullring and museum', ja: 'マエストランサ闘牛場・博物館', zh: '马埃斯特兰萨斗牛场与博物馆' },
          detail: {
            ko: '18세기부터 오랜 기간에 걸쳐 지어진 세비야의 대표 투우장입니다. 셀프 가이드 관람에서 경기장·말의 안뜰·투우사 예배당·전시실을 볼 수 있고, 전시품은 투우 문화의 역사를 다룹니다. 관람은 역사와 건축을 이해하는 관점으로 선택할 수 있습니다.',
            en: 'Seville’s landmark bullring was built over a long period beginning in the 18th century. The self-guided visit covers the arena, Patio de Caballos, bullfighters’ chapel and exhibition rooms, with objects relating to the history of bullfighting. You can approach it as a visit to the site’s architecture and historical context.',
            ja: '18世紀に建設が始まり、長い期間をかけて完成したセビリアの代表的な闘牛場です。セルフガイド見学ではアリーナ、馬の中庭、闘牛士の礼拝堂、展示室を見学でき、展示品は闘牛文化の歴史を扱います。建築と歴史的背景を学ぶ訪問として選べます。',
            zh: '这是塞维利亚标志性斗牛场，18世纪开始建造并历经多年完成。自助参观路线涵盖竞技场、马匹庭院、斗牛士礼拜堂和展厅，展品介绍斗牛文化历史。可从建筑与历史背景角度了解此地。'
          },
          note: {
            ko: '11월 21일의 정확한 운영시간·투우 행사 여부는 확인되지 않았습니다. 일부 동선에는 관람석·모래 경기장과 계단이 있으므로 “완전 평지”나 정해진 45~60분 관람을 보장하지 않습니다. 몸 상태에 맞춰 범위를 줄이고 접근 조건을 문의하세요.',
            en: 'Exact opening hours and any bullfighting event on 21 November were not confirmed. The route can include seating tiers, the sand arena and stairs; a completely flat visit or a fixed 45–60-minute duration is not guaranteed. Adjust the route to your parents’ comfort and ask about access needs.',
            ja: '11月21日の営業時間や闘牛開催は未確認です。見学には観客席・砂のアリーナ・階段が含まれる場合があるため、完全に平坦な見学や45〜60分の所要時間は保証しません。ご両親の体調に合わせて範囲を調整し、アクセス条件を問い合わせてください。',
            zh: '未确认11月21日开放时间或是否有斗牛活动。参观可能涉及观众席、沙地竞技场和台阶，不保证全程平坦，也不保证固定45–60分钟。请按父母体力缩短路线，并咨询通行条件。'
          },
          aliases: ['maestranza', 'plaza de toros de la real maestranza', 'plaza de toros', 'bullring', '투우장', '마에스트란사', 'マエストランサ', '闘牛場', '斗牛场'],
          sources: [
            ['bullring', 'https://visitaplazadetorosdesevilla.com/en/how-to-visit/'],
            ['bullHistory', 'https://www.realmaestranza.com/en/royal-bullring/history-of-the-construction/'],
            ['visitSeville', 'https://visitasevilla.es/en/plaza-de-toros-de-la-maestranza/']
          ]
        },
        {
          time: '12:15', title: { ko: '트리아나 시장 (Mercado de Triana)', en: 'Mercado de Triana', ja: 'トリアナ市場', zh: '特里亚纳市场' },
          detail: {
            ko: '시장은 1823년부터 이어진 장소로, 옛 산 호르헤 성터 위에 세워졌습니다. 시장 안에서 현지 농산물·해산물 점포와 타파스 바를 둘러보며 일상적인 트리아나 분위기를 느껴보세요. 12:15 방문은 토요일 점포가 문을 닫기 전 시장을 보기 위한 제안입니다.',
            en: 'The market dates from 1823 and stands over the former site of San Jorge Castle. Browse local produce and seafood stalls and tapas bars to experience everyday Triana. A 12:15 visit is suggested to see the market before shops close for the day.',
            ja: '1823年から続く市場で、かつてのサン・ホルヘ城跡に建っています。地元の青果・魚介の店やタパスバーを見て、日常のトリアナを感じられます。12:15の訪問は土曜の店舗が閉まる前に市場を見るための提案です。',
            zh: '市场自1823年延续至今，建在旧圣豪尔赫城堡遗址上。可逛本地农产品、海鲜摊和小吃吧，感受特里亚纳日常生活。建议12:15到访，以便在周六店铺收摊前参观。'
          },
          note: {
            ko: '시장의 일반 게시시간은 토요일 상점 09:00–14:30, 음식·음료 업소는 별도 시간이지만 2026년 11월 21일 공지는 확인하지 않았습니다. 시장 전체를 모두 돌 필요는 없습니다. 산 호르헤 성 고고학 유적은 별도 항목처럼 생각하지 마세요(현재 공식 관광 안내상 폐쇄).',
            en: 'The market’s general listing gives Saturday shop hours of 09:00–14:30, with separate hours for food and drink, but no notice specific to 21 November 2026 was checked. There is no need to cover the whole market. Do not count the San Jorge archaeological site as a separate visit; it is currently marked closed on the official tourism page.',
            ja: '市場の一般案内は土曜の店舗を09:00〜14:30、飲食店は別時間としていますが、2026年11月21日付のお知らせは未確認です。市場全体を歩く必要はありません。サン・ホルヘ城遺跡は公式観光ページで現在閉鎖表示のため、別の見学先として数えないでください。',
            zh: '市场一般公布的周六店铺时间为09:00–14:30，餐饮店时间另计，但未核对2026年11月21日特别通知。无需逛完整个市场。官方旅游页面目前将圣豪尔赫城堡考古遗址标为关闭，不应把它计作单独的参观项目。'
          },
          aliases: ['mercado de triana', 'triana market', 'mercado triana', '트리아나 시장', '트리아나시장', 'トリアナ市場', '特里亚纳市场'],
          sources: [
            ['market', 'https://visitasevilla.es/en/mercado-de-triana/'],
            ['marketHours', 'https://mercadodetrianasevilla.com/horarios/']
          ]
        },
        {
          time: '시장 인근 · 내부 관람 제외', title: { ko: '산 호르헤 성 유적 (현재 폐쇄 표시)', en: 'San Jorge Castle ruins (currently listed closed)', ja: 'サン・ホルヘ城遺跡（現在は閉鎖表示）', zh: '圣豪尔赫城堡遗址（目前标为关闭）' },
          detail: {
            ko: '과거 요새와 종교재판소 역사에 관한 고고학 유적·전시 공간입니다. 그러나 세비야 공식 관광 페이지가 현재 유적지를 폐쇄로 표시하므로, 내부 관람을 전제로 계획하지 않습니다. 시장 자체 방문은 그대로 가능합니다.',
            en: 'An archaeological and interpretive site about the former fortress and the history of the Inquisition. However, Seville’s official tourism page currently lists the archaeological site as closed, so do not plan on an interior visit. The market visit remains separate.',
            ja: '旧要塞と異端審問所の歴史を扱う考古学・解説施設です。ただしセビリア公式観光ページでは現在、遺跡は閉鎖表示のため内部見学を予定に入れないでください。市場の見学は別にできます。',
            zh: '这是介绍旧堡垒与宗教裁判所历史的考古遗址和展示空间。但塞维利亚官方旅游页面目前将遗址标为关闭，因此不要安排内部参观；市场本身仍可单独游览。'
          },
          note: {
            ko: '관광 안내소 로비 시간은 유적 관람시간이 아닙니다. 2026년 11월 재개장 정보는 확인되지 않았습니다.',
            en: 'Tourist-office lobby hours are not archaeological-site opening hours. No November 2026 reopening information was found.',
            ja: '観光案内所ロビーの時間は遺跡の開館時間ではありません。2026年11月の再開情報は確認できていません。',
            zh: '旅游咨询处大厅开放时间不等于遗址开放时间。未查到2026年11月重新开放的信息。'
          },
          aliases: ['castillo de san jorge', 'san jorge castle', 'castillo san jorge', '산 호르헤 성', '산호르헤 성', 'サン・ホルヘ城', '圣豪尔赫城堡'],
          sources: [['castle', 'https://visitasevilla.es/en/castillo-de-san-jorge/']]
        },
        {
          time: '14:45 · 옵션 A', title: { ko: '두에냐스 궁전 (Palacio de las Dueñas)', en: 'Palacio de las Dueñas (Dueñas Palace)', ja: 'ドゥエニャス宮殿', zh: '杜埃尼亚斯宫' },
          detail: {
            ko: '알바 가문과 연관된 세비야 귀족 저택으로, 여러 세기의 건축 양식과 정원·안뜰·실내 컬렉션을 볼 수 있습니다. 알카사르와 Casa de Pilatos와는 다른 실제 귀족 가옥의 생활 공간을 보여주며, 시인 안토니오 마차도와도 연결됩니다.',
            en: 'A Seville aristocratic residence associated with the House of Alba, with gardens, courtyards and interiors reflecting several architectural periods. It offers a different view of domestic noble life from the Alcázar or Casa de Pilatos and is linked with the poet Antonio Machado.',
            ja: 'アルバ家ゆかりのセビリア貴族邸宅で、複数の時代の建築、庭園・中庭・室内コレクションを見学できます。アルカサルやカサ・デ・ピラトスとは異なる貴族の住まいを知る場所で、詩人アントニオ・マチャドとも縁があります。',
            zh: '这是一座与阿尔巴家族相关的塞维利亚贵族宅邸，拥有不同历史时期的建筑、花园、庭院和室内藏品。它展现了不同于王宫或皮拉托斯之家的贵族生活，也与诗人安东尼奥·马查多有关。'
          },
          note: {
            ko: '일반 겨울 안내는 10:00–18:00, 입장 마감 17:15이지만 11월 21일 변경 여부는 확인되지 않았습니다. 공식 동선에는 계단 구간이 있으며 부엌·위층은 관람하지 않습니다. 전날 Casa de Pilatos를 못 봤다면 후보로 고려하되, 오후 선택지는 하나만 두세요.',
            en: 'General winter information lists 10:00–18:00, with last entry at 17:15, but changes for 21 November were not confirmed. The official route includes stairs; the kitchen and upper floor are not open to visitors. Consider it if you did not visit Casa de Pilatos, but choose only one afternoon attraction.',
            ja: '一般冬季案内は10:00〜18:00、最終入場17:15ですが、11月21日の変更は未確認です。公式見学路には階段があり、台所と上階は公開されていません。前日にカサ・デ・ピラトスへ行かなかった場合の候補ですが、午後の見学先は一つにしてください。',
            zh: '一般冬季信息为10:00–18:00，17:15停止入场，但未确认11月21日是否有变更。官方路线包含楼梯，厨房和上层不对游客开放。若前一天没去皮拉托斯之家，可考虑此处；下午只选一处。'
          },
          aliases: ['palacio de las dueñas', 'palacio de las duenas', 'duenas palace', 'dueñas palace', '두에냐스 궁전', '두에냐스', 'ドゥエニャス宮殿', '杜埃尼亚斯宫'],
          sources: [
            ['duenas', 'https://www.lasduenas.es/en/info-al-visitante'],
            ['visitSeville', 'https://visitasevilla.es/en/palacio-de-duenas/']
          ]
        },
        {
          time: '14:45 · 옵션 B', title: { ko: '토레 세비야 아탈라야 전망대', en: 'Torre Sevilla Atalaya viewpoint', ja: 'トーレ・セビリアのアタラヤ展望台', zh: '塞维利亚塔阿塔拉亚观景台' },
          detail: {
            ko: '토레 세비야 37층의 아탈라야는 실내 전망 공간과 야외 테라스에서 세비야 구시가지와 과달키비르강을 바라보는 현대적 선택지입니다. 역사 궁전 방문을 이미 충분히 했거나 실내에서 쉬며 전망을 보고 싶을 때 Dueñas 대신 하나만 고르세요.',
            en: 'Atalaya on the 37th floor of Torre Sevilla offers views of the historic centre and Guadalquivir from indoor spaces and an outdoor terrace. Choose it instead of Dueñas if you have already had enough palace visits or prefer a modern viewpoint with an indoor break.',
            ja: 'トーレ・セビリア37階のアタラヤは屋内展望エリアと屋外テラスから旧市街とグアダルキビル川を眺める現代的な選択肢です。宮殿見学が続いている場合や、屋内で休みながら景色を楽しみたい場合に、ドゥエニャスの代わりとして一つだけ選びます。',
            zh: '位于塞维利亚塔37层的阿塔拉亚设有室内观景区和户外露台，可俯瞰历史城区与瓜达尔基维尔河。若已看过足够多的宫殿，或想在室内休息并看景，可用它替代杜埃尼亚斯宫，二选一即可。'
          },
          note: {
            ko: '운영자의 일반 겨울 시간은 2026-10-25~2027-03-27 11:00–01:00입니다. 특정 날짜 입장·요금·엘리베이터 조건은 확인되지 않았습니다. 시장에서 도보 10분이라고 단정하지 말고 택시 등 실제 이동을 확인하세요. 무료 전망이라고 가정하지 않습니다.',
            en: 'The operator’s general winter hours for 25 Oct 2026–27 Mar 2027 are 11:00–01:00. Date-specific entry, price and lift arrangements were not checked. Do not assume a 10-minute walk from the market; verify the transfer, such as by taxi. Do not assume admission is free.',
            ja: '運営者の一般冬季時間（2026年10月25日〜2027年3月27日）は11:00〜01:00です。特定日の入場・料金・エレベーター条件は未確認です。市場から徒歩10分と決めつけず、タクシーなどの移動を確認してください。無料とは限りません。',
            zh: '运营方公布的一般冬季时间（2026年10月25日至2027年3月27日）为11:00–01:00。未核实当天入场、价格或电梯条件。不要假定从市场步行10分钟可达，请核实出租车等交通；也不要默认免费入场。'
          },
          aliases: ['torre sevilla', 'atalaya', 'mirador atalaya', '토레 세비야', '아탈라야', '전망대', 'アタラヤ', 'セビリア・タワー', '阿塔拉亚', '塞维利亚塔'],
          sources: [
            ['atalaya', 'https://www.torre-sevilla.com/torre-sevilla/mirador-atalaya'],
            ['visitSeville', 'https://visitasevilla.es/en/torre-sevilla-y-mirador-torre-atalaya/']
          ]
        },
        {
          time: '17:00 · 선택', title: { ko: '엘 꼬르떼 잉글레스 · 플라사 델 두케점', en: 'El Corte Inglés · Plaza del Duque', ja: 'エル・コルテ・イングレス・プラサ・デル・ドゥケ店', zh: 'El Corte Inglés · Plaza del Duque店' },
          detail: {
            ko: '구시가지 중심의 백화점으로, 올리브오일·투론·만사니야 꿀·캐모마일 차 등 선물 쇼핑과 간단한 실내 휴식에 활용할 수 있습니다. 올리브오일처럼 액체류를 살 예정이면 항공사 수하물 기준을 먼저 확인하세요.',
            en: 'A department store in the historic-centre area for gifts such as olive oil, turrón, manzanilla honey and chamomile tea, plus a short indoor break. Check airline baggage rules before buying liquids such as olive oil.',
            ja: '旧市街中心部の百貨店で、オリーブオイル、トゥロン、マンサニーリャ（カモミール）蜂蜜、カモミールティーなどの土産探しや短い屋内休憩に利用できます。オリーブオイルなど液体を買う前に航空会社の手荷物規則を確認してください。',
            zh: '这家百货商店位于历史城区，可购买橄榄油、图隆糖、洋甘菊蜂蜜、洋甘菊茶等礼物，也可短暂室内休息。购买橄榄油等液体前请先确认航空公司的行李规定。'
          },
          note: {
            ko: '11월 21일 영업시간은 확인되지 않았습니다. 피곤하거나 다음 날 출국 준비가 밀리면 생략하세요.',
            en: 'Opening hours for 21 November were not confirmed. Skip it if tired or if departure preparations are running late.',
            ja: '11月21日の営業時間は未確認です。疲れている場合や翌日の準備が遅れている場合は省いてください。',
            zh: '未确认11月21日营业时间。若感到疲倦或次日出行准备延误，可跳过。'
          },
          aliases: ['el corte inglés', 'el corte ingles', 'plaza del duque', '엘 꼬르떼 잉글레스', '엘 코르테 잉글레스', 'エル・コルテ・イングレス', 'El Corte Inglés', '英格列斯百货'],
          sources: [['elCorte', 'https://www.elcorteingles.es/centroscomerciales/es/eci/centros/centro-comercial-plaza-del-duque-de-la-victoria']]
        },
        {
          time: '19:00 · 영업 확인', title: { ko: '마지막 저녁 · El Rinconcillo 또는 가족 선호 식당', en: 'Farewell dinner · El Rinconcillo or a family favourite', ja: '最後の夕食・エル・リンコンシージョまたはご家族のお気に入り', zh: '告别晚餐 · El Rinconcillo或家人喜欢的餐厅' },
          detail: {
            ko: 'El Rinconcillo는 1670년 개업으로 소개되는 구시가지 타파스 바입니다. 오래된 타일·목재 천장과 분필로 주문을 적는 관습이 특징입니다. 세비야에서 특히 맛있게 드셨던 메뉴가 있다면 마지막 저녁은 익숙한 가족 선호 식당으로 바꿔도 좋습니다.',
            en: 'El Rinconcillo describes itself as opening in 1670 and is a historic tapas bar in the old town. It is known for old tiles, timber ceilings and the custom of writing orders in chalk. If your family has a favourite Sevillian dish or restaurant, choose that instead for the final dinner.',
            ja: 'エル・リンコンシージョは1670年創業と紹介される旧市街のタパスバーです。古いタイルや木の天井、チョークで注文を書く習慣が特徴です。セビリアで特に気に入った料理や店があれば、最後の夕食はご家族のお気に入りに変更できます。',
            zh: 'El Rinconcillo自称创立于1670年，是老城区一家历史悠久的小吃酒吧，以旧瓷砖、木质天花板和用粉笔写订单的传统为特色。若家人有更喜欢的塞维利亚菜或餐厅，也可改选熟悉的店作为告别晚餐。'
          },
          note: {
            ko: '19:00 영업 여부는 확인되지 않았습니다. 공식 안내상 식당 좌석만 예약할 수 있고 타파스 바는 예약을 받지 않습니다. 당일 영업·좌석을 확인하고, 열지 않으면 다른 식당을 선택하세요.',
            en: 'Opening at 19:00 was not confirmed. The restaurant’s official information says dining-room tables can be reserved, while the tapas bar does not take reservations. Check hours and seating; choose another restaurant if it is not open.',
            ja: '19:00の営業は確認されていません。公式案内ではレストラン席のみ予約可能で、タパスバーは予約を受けません。当日の営業と席を確認し、開いていなければ別の店を選んでください。',
            zh: '未确认19:00是否营业。官方说明只接受餐厅座位预订，小吃吧不接受预订。请核实当天营业和座位；若未营业则选择其他餐厅。'
          },
          aliases: ['el rinconcillo', '린콘시요', '엘 린콘시요', 'エル・リンコンシージョ', 'El Rinconcillo', '林孔西略'],
          sources: [
            ['rinconcillo', 'https://www.elrinconcillo.es/en/history/'],
            ['rinconcillo', 'https://www.elrinconcillo.es/en/contact/']
          ]
        },
        {
          time: '21:00', title: { ko: '숙소 복귀 · 탑승권과 다음 날 택시', en: 'Return to lodging · boarding passes and next-day taxi', ja: '宿へ戻る・搭乗券と翌朝のタクシー', zh: '返回住宿处 · 检查登机牌与次日出租车' },
          detail: {
            ko: '21:00까지 숙소로 돌아와 위즈에어 모바일 탑승권 3명분이 오프라인에서도 열리는지 확인합니다. 호텔 프런트에 11월 22일 일요일 07:00 세비야 공항행 택시를 요청하세요.',
            en: 'Return by 21:00 and make sure all three Wizz Air mobile boarding passes can be opened offline. Ask the hotel front desk for a taxi to Seville Airport at 07:00 on Sunday, 22 November.',
            ja: '21:00までに宿へ戻り、ウィズエアーのモバイル搭乗券3人分をオフラインでも開けるか確認します。ホテルのフロントに11月22日（日）07:00のセビリア空港行きタクシーを依頼してください。',
            zh: '21:00前回到住宿处，确认3人的Wizz Air手机登机牌在离线状态下也能打开。请酒店前台安排11月22日（周日）07:00前往塞维利亚机场的出租车。'
          },
          note: {
            ko: '탑승권 오프라인 저장과 택시 예약은 아직 확인되지 않은 체크리스트입니다. 이 일정 수정에서는 탑승권·택시를 조작하거나 예약하지 않았습니다.',
            en: 'Offline boarding-pass access and the taxi are checklist items, not yet confirmed. This itinerary update did not access boarding passes or book a taxi.',
            ja: '搭乗券のオフライン保存とタクシーは、まだ確認していないチェック項目です。この日程更新では搭乗券の操作やタクシー予約は行っていません。',
            zh: '离线登机牌与出租车仍是待核对事项。此次行程修改没有操作登机牌，也没有预订出租车。'
          },
          aliases: ['wizz air', 'boarding pass', 'airport taxi', '위즈에어', '탑승권', '공항 택시', 'ウィズエアー', '搭乗券', '机场出租车', '登机牌']
        }
      ]
    }
  };

  function getDay(date, lang) {
    const day = DAYS[String(date || '').slice(0, 10)];
    if (!day) return null;
    const locale = LANGS.includes(lang) ? lang : 'ko';
    return {
      date: String(date).slice(0, 10),
      dateLabel: TXT(day.dateLabel, locale),
      city: TXT(day.city, locale),
      theme: TXT(day.theme, locale),
      labels: Object.fromEntries(Object.entries(day.labels).map(([key, map]) => [key, TXT(map, locale)])),
      morning: TXT(day.morning, locale),
      rest: TXT(day.rest, locale),
      evening: TXT(day.evening, locale),
      walk: TXT(day.walk, locale),
      transport: TXT(day.transport, locale),
      meal: TXT(day.meal, locale),
      events: day.events[locale] || day.events.ko,
      caveatTitle: TXT(day.caveatTitle, locale),
      caveat: TXT(day.caveat, locale),
      stops: day.stops.map(stop => ({
        time: stop.time,
        title: TXT(stop.title, locale),
        detail: TXT(stop.detail, locale),
        note: TXT(stop.note, locale),
        sources: (stop.sources || []).map(([key, url]) => ({ label: TXT(SOURCE_LABELS[key] || { ko: key }, locale), url })),
        aliases: stop.aliases || []
      }))
    };
  }

  function renderDetails(date, lang) {
    const day = getDay(date, lang);
    if (!day) return '';
    const sourceList = sources => sources.length ? `<ul class="sv-date-sources">${sources.map(source => `<li><a href="${safe(source.url)}" target="_blank" rel="noopener noreferrer">${safe(source.label)}</a></li>`).join('')}</ul>` : '';
    const stops = day.stops.map((stop, index) => `
      <details class="sv-date-stop"${index === 0 ? ' open' : ''}>
        <summary><span class="sv-date-time">${safe(stop.time)}</span><span class="sv-date-stop-title">${safe(stop.title)}</span></summary>
        <div class="sv-date-stop-body"><p>${safe(stop.detail)}</p><p class="sv-date-note">${safe(stop.note)}</p>${sourceList(stop.sources)}</div>
      </details>`).join('');
    const labels = {
      ko: { heading: '명소 설명 · 운영 확인', sources: '근거 링크' },
      en: { heading: 'Attraction notes · opening checks', sources: 'Sources' },
      ja: { heading: '見どころ・営業確認', sources: '出典リンク' },
      zh: { heading: '景点说明 · 营业核实', sources: '来源链接' }
    }[lang] || { heading: '명소 설명 · 운영 확인', sources: '근거 링크' };
    return `<section class="sv-date-details" aria-label="${safe(labels.heading)}"><h4>${safe(labels.heading)}</h4><div class="sv-date-caveat"><strong>${safe(day.caveatTitle)}</strong><p>${safe(day.caveat)}</p></div><div class="sv-date-stop-list">${stops}</div></section>`;
  }

  function normalize(value) {
    return String(value || '').toLocaleLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\s+/g, ' ').trim();
  }

  function dateFromQuery(query) {
    const q = String(query || '').toLocaleLowerCase().replace(/[／．。]/g, '/').replace(/\s+/g, ' ').trim();
    if (/2026\s*[-/.年]\s*11\s*[-/.月]\s*20\s*(日)?/.test(q) || /(^|\D)11\s*[-/.月]\s*20\s*(日)?/.test(q) || /\b(?:nov(?:ember)?\s*20|20\s*(?:nov|november))\b/.test(q) || /11月\s*20日|11月20|11월\s*20일|11월20일/.test(q)) return '2026-11-20';
    if (/2026\s*[-/.年]\s*11\s*[-/.月]\s*21\s*(日)?/.test(q) || /(^|\D)11\s*[-/.月]\s*21\s*(日)?/.test(q) || /\b(?:nov(?:ember)?\s*21|21\s*(?:nov|november))\b/.test(q) || /11月\s*21日|11月21|11월\s*21일|11월21일/.test(q)) return '2026-11-21';
    return null;
  }

  function matchingStop(query, date) {
    const q = normalize(query);
    const days = date ? [[date, DAYS[date]]] : Object.entries(DAYS);
    const matches = [];
    days.forEach(([dayDate, day]) => {
      day.stops.forEach(stop => {
        const alias = (stop.aliases || []).find(item => {
          const term = normalize(item);
          return term.length > 1 && q.includes(term);
        });
        if (alias) matches.push({ date: dayDate, stop, length: normalize(alias).length });
      });
    });
    return matches.sort((a, b) => b.length - a.length)[0] || null;
  }

  function buildChatResponse(query, lang) {
    const raw = String(query || '');
    const q = normalize(raw);
    const locale = LANGS.includes(lang) ? lang : 'ko';
    const date = dateFromQuery(raw);
    const stopMatch = matchingStop(raw, date);
    const hasSeville = ['seville', 'sevilla', '세비야', 'セビリア', '塞维利亚'].some(term => q.includes(normalize(term)));
    const itineraryIntent = /(itinerary|schedule|plan|route|what is planned|what's planned|what do i do|activities|timing|hours|旅程|日程|予定|行程|スケジュール|計画|コース|安排|行程|日程|计划|路线|几点|开放时间|일정|코스|계획|시간표|운영 시간|몇 시|무엇을|뭐 해|계획된)/i.test(raw);
    const day = date ? getDay(date, locale) : null;
    if (date && !day && !stopMatch) return null;
    if (!date && !stopMatch && !(hasSeville && itineraryIntent)) return null;

    const sourceHtml = sources => sources.length ? `<ul class="sv-date-chat-sources">${sources.map(source => `<li><a href="${safe(source.url)}" target="_blank" rel="noopener noreferrer">${safe(source.label)}</a></li>`).join('')}</ul>` : '';
    if (stopMatch) {
      const localizedDay = getDay(stopMatch.date, locale);
      const stop = localizedDay.stops.find(item => item.title === TXT(stopMatch.stop.title, locale));
      if (!stop) return null;
      const labels = {
        ko: { prefix: '제안 일정', caveat: '확인 사항' }, en: { prefix: 'Suggested plan', caveat: 'Check' },
        ja: { prefix: '提案日程', caveat: '確認事項' }, zh: { prefix: '建议安排', caveat: '请核实' }
      }[locale];
      return `<div class="sv-date-chat"><strong>${safe(stop.title)}</strong><p class="sv-date-chat-time">${safe(localizedDay.dateLabel)} · ${safe(stop.time)} · ${safe(labels.prefix)}</p><p>${safe(stop.detail)}</p><p class="sv-date-note"><strong>${safe(labels.caveat)}:</strong> ${safe(stop.note)}</p>${sourceHtml(stop.sources)}</div>`;
    }

    const selectedDays = date ? [[date, day]] : Object.keys(DAYS).map(key => [key, getDay(key, locale)]);
    const intro = {
      ko: '아래는 제안 일정이며 예약·입장권·당일 운영이 확정된 것은 아닙니다.',
      en: 'This is a suggested itinerary, not a confirmed booking, ticket or date-specific operating schedule.',
      ja: '以下は提案日程であり、予約・入場券・当日の運行が確定したものではありません。',
      zh: '以下为建议行程，并非已确认的预订、门票或当天运营安排。'
    }[locale];
    const cards = selectedDays.map(([key, selected]) => `<section class="sv-date-chat-day"><strong>${safe(selected.dateLabel)} · ${safe(selected.theme)}</strong><ol>${selected.stops.map(stop => `<li><span>${safe(stop.time)} — ${safe(stop.title)}</span></li>`).join('')}</ol><p class="sv-date-note">${safe(selected.caveat)}</p>${sourceHtml(selected.stops.flatMap(stop => stop.sources).slice(0, 5))}</section>`).join('');
    return `<div class="sv-date-chat"><p>${safe(intro)}</p>${cards}</div>`;
  }

  global.getSevilleDateItineraryForDate = getDay;
  global.renderSevilleDateItineraryDetails = renderDetails;
  global.buildSevilleDateItineraryChatResponse = buildChatResponse;
  global.SEVILLE_DATE_ITINERARY_2026 = DAYS;
})(window);
