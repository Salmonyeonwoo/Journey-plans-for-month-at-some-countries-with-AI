/* Source-checked flamenco show guide and matching offline chatbot knowledge. No booking or itinerary mutation. */
(function () {
  'use strict';

  const sources = {
    unesco: 'https://ich.unesco.org/en/RL/flamenco-00363',
    teatro: 'https://teatroflamencosevilla.com/en/',
    teatroTickets: 'https://teatroflamencosevilla.com/ticketing/experiencias/purchase-form/all/calendario/2026-11-08/2026-11-30',
    teatroRefund: 'https://teatroflamencosevilla.com/en/refund-policy',
    museoTickets: 'https://tickets.museodelbaileflamenco.com/eng/index.php',
    museoFaq: 'https://museodelbaileflamenco.com/en/faqs/',
    museoAccess: 'https://museodelbaileflamenco.com/en/accesibility/',
    arenalTickets: 'https://centralreservas.tablaoelarenal.com/booking-center/',
    arenalShow: 'https://tablaoelarenal.com/en/the-art/',
    arenalFood: 'https://tablaoelarenal.com/en/gastronomy/',
    arenalRefund: 'https://centralreservas.tablaoelarenal.com/politica-de-devoluciones-y-pagos-2/',
    cordobesTickets: 'https://booking.tablaocordobes.es/en',
    cordobesSchedule: 'https://tablaocordobes.es/schedules/',
    cordobesFaq: 'https://tablaocordobes.es/frequently-asked-questions-tablao-flamenco-cordobes/'
  };

  const content = {
    ko: {
      kicker: '공식 공연 일정 · 예매 참고', title: '부모님과 보는 플라멩코 공연 가이드',
      trip: '바르셀로나 2026.11.05–11.11 · 세비야 2026.11.11–11.22',
      intro: 'UNESCO는 안달루시아를 플라멩코의 중심지로 설명하면서 무르시아와 에스트레마두라에도 뿌리가 있다고 안내합니다. 바르셀로나 공연이 관광객 전용이라는 뜻은 아닙니다. 도시와 실제 좌석·시간·접근 조건을 비교해 고르세요.',
      status: '공식 페이지 조회 기준: 2026년 11월 8일, 스페인 현지 시각(Europe/Madrid, CET). 아래는 공식 페이지에서 확인한 공연 시작 시각과 당시 표시 가격이지 예약이나 좌석 확보가 아닙니다. 실시간 재고는 변경될 수 있습니다. Cordobes 재고 조회는 2인 입력에 한정되어 가족 3명의 가능 여부로 해석하지 않았습니다. Museo의 세비야 체류일별 회차는 확인되지 않았습니다.',
      earlyTitle: '가장 이른 회차 비교', early: 'Teatro Flamenco Sevilla는 세비야 체류 중 11/11–22 날짜별 달력에 17:00 회차가 있습니다. Cordobes는 11/9–10에만 17:40, El Arenal은 매일 첫 회차가 19:00입니다. Museo의 17:00은 일반 안내 시각일 뿐, 해당 날짜 회차는 확인되지 않았습니다. 이른 시각이 좌석 재고나 접근성을 보장하지는 않습니다.',
      timeLabel: '공식 회차·공연 시간', priceLabel: '티켓·포함 사항', accessLabel: '좌석·부모님 동행 참고', termsLabel: '취소·변경 조건(공식 안내)', addressLabel: '주소', sourcesLabel: '공식 안내 및 예매', checklistTitle: '결정 전 확인할 점',
      checklist: ['실제 배정 좌석, 무대 시야, 계단 또는 무단차 동선, 보조기구, 휴식 좌석을 해당 공연장에 직접 문의하세요. “부모님 맞춤”이나 극장 이름만으로 편안함·접근성을 보장할 수 없습니다.', '귀가 교통과 숙소까지의 이동, 저녁 식사 시간을 함께 확인하세요. 가장 이른 회차도 날짜별로 다르며, Museo의 표준 시각은 날짜별 확정 회차가 아닙니다.', '표시된 가격·조건은 바뀔 수 있습니다. 결제 직전 선택한 날짜·인원·상품의 공식 예매 화면에서 최종 확인하세요. 이 안내로 일정·숙소·교통·기존 예약을 변경하지 않았고, 티켓을 구매하지 않았습니다.'],
      venues: [
        {
          id: 'teatro', city: '세비야', name: 'Teatro Flamenco Sevilla', duration: '공연 60분',
          schedule: '날짜별 공식 달력: 11/11·12·15–19·22에는 17:00, 19:00, 20:45. 11/13·14·20·21에는 같은 세 회차에 22:15가 추가됩니다. 모두 공연장 현지 시각입니다.',
          tickets: '11/8 조회 화면의 성인 General은 €29, Premium은 €39이며 Premium에 웰컴 드링크 1잔이 포함됩니다. Premium은 2–5열, General은 6–12열, Promo는 13–16열로 표시됩니다. 가격·프로모션은 바뀔 수 있습니다.',
          access: '좌석은 도착 순서대로 엄격히 배정되며 공연장은 20분 전 도착을 권합니다. 이동성/휠체어 선택 항목은 있으나 계단 수와 무단차 진입 경로는 안내 페이지에서 확인되지 않았습니다. 필요한 좌석과 접근 동선을 문의하세요.',
          terms: '공식 환불 안내는 공연 24시간 전까지 날짜 변경 요청, 24시간 전까지 통보한 취소의 티켓 전액 환불을 안내합니다. 그 이후 취소는 환불되지 않는다고 명시합니다. 별도 취소 보장 상품은 조건과 추가 요금이 다르므로 결제 화면에서 확인하세요.',
          address: 'Calle Cuna, 15, 41004 Sevilla',
          links: [['공식 공연·장소 안내', 'teatro'], ['공식 날짜별 예매 달력', 'teatroTickets'], ['공식 환불 정책', 'teatroRefund']]
        },
        {
          id: 'museo', city: '세비야', name: 'Museo del Baile Flamenco', duration: '공연 60분',
          schedule: 'FAQ의 일반 공연 시각은 17:00, 19:00, 20:45입니다. 세비야 체류 기간(11/11–22)의 날짜별 회차는 이번 확인에서 찾지 못했으므로, 이 시각을 매일 확정된 회차로 보지 마세요.',
          tickets: 'Puro Flamenco 성인 티켓은 €29로 안내됩니다. 이 티켓에 음료가 포함된다고 가정하면 안 됩니다. 별도 상품인 Flamenco Dreams 설명에는 음료 포함이라고 적혀 있습니다.',
          access: '좌석 미지정·선착순이며 공연장 문은 시작 45분 전에 열립니다. 공식 접근성 안내는 엘리베이터로 4개 층 모두 이동 가능하고 장애인용 화장실이 있다고 설명합니다. 계단 수와 구체적인 무단차 진입 경로는 별도로 명시되지 않았습니다.',
          terms: 'FAQ 기준 일정 변경은 하루 이상 전에 요청하면 무료입니다. 48시간 이전 취소는 무료, 48시간 이내 취소는 50%, 공연 당일은 100% 취소 수수료라고 안내합니다. 선택한 상품의 최신 조건을 확인하세요.',
          address: 'Calle Manuel Rojas Marcos, 3, 41003 Sevilla',
          links: [['공식 티켓 판매처', 'museoTickets'], ['공식 FAQ·시각·취소 조건', 'museoFaq'], ['공식 접근성 안내', 'museoAccess']]
        },
        {
          id: 'arenal', city: '세비야', name: 'Tablao Flamenco El Arenal', duration: '공연 60분',
          schedule: '공식 예약 달력에는 11/11–22 매일 19:00와 21:30 회차가 표시됩니다. 디너 패스는 각각 공연 전 18:00 또는 20:30에 시작합니다. 달력의 좌석 재고는 별도로 바뀝니다.',
          tickets: '공식 홈페이지 표시 상품은 공연+음료 €45, 타파스+음료+디저트 €71, 디너 €86입니다. 음료·타파스 상품은 VAT 별도라고 표시되어 있습니다. 최종 금액은 선택 상품 화면에서 확인하세요.',
          access: '확인한 공식 페이지에서 좌석 배정 방식, 계단, 무단차 진입이나 휠체어 접근 정보를 찾지 못했습니다. 좌석 위치와 접근 조건을 공연장에 직접 확인한 뒤 선택하세요.',
          terms: '공식 예약 정책은 공연 48시간 전까지 전액 환불 또는 날짜 변경이 가능하며, 48시간 이내에는 환불·변경이 불가하다고 안내합니다.',
          address: 'Calle Rodo, 7, 41001 Sevilla',
          links: [['공식 날짜별 예약 달력', 'arenalTickets'], ['공식 공연 안내', 'arenalShow'], ['공식 메뉴·식사 안내', 'arenalFood'], ['공식 환불 정책', 'arenalRefund']]
        },
        {
          id: 'cordobes', city: '바르셀로나', name: 'Tablao Cordobes', duration: '공연 70분 · 휴식 없음',
          schedule: '공식 예매 달력의 11/8 회차는 19:15·21:00, 11/9–10은 17:40·19:15·21:00·22:30, 11/11은 19:15·21:00·22:30입니다. 쇼만 보는 상품 기준입니다. 11/5–7은 확인 시점에 이미 지난 날짜입니다.',
          tickets: '표준 공연 티켓은 €48이며 음료 1잔이 포함됩니다. 마지막 열 €35 상품은 무대 시야가 제한된다고 표시됩니다. 스페인식 시식 뷔페+공연은 €86이며, 뷔페 시작은 18:00·19:30·21:15(각각 19:15·21:00·22:30 공연에 대응)입니다.',
          access: 'FAQ는 이동이 불편한 관객에게 우선 입장을 위해 사전 연락하도록 안내하고 엘리베이터 크기를 표시합니다(문 너비 70cm, 내부 90×90cm). 무단차 진입 경로와 계단 수는 명시되지 않았습니다. 좌석 배정은 예약 순서이며 디너·공연 상품은 좌석 우선이 안내됩니다.',
          terms: '공식 예매 약관은 구매 후 법정 철회 기간과 환불 절차를 설명하며, 서비스 시작 48시간 이내에는 취소·변경을 받지 않는다고 안내합니다. 해당 상품의 최신 약관을 결제 전에 확인하세요.',
          address: 'La Rambla, 35, 08002 Barcelona',
          links: [['공식 티켓 예매', 'cordobesTickets'], ['공식 회차 안내', 'cordobesSchedule'], ['공식 FAQ·접근성 안내', 'cordobesFaq']]
        }
      ]
    },
    en: {
      kicker: 'OFFICIAL SHOWTIMES · TICKET REFERENCE', title: 'A flamenco show guide for parents and family',
      trip: 'Barcelona: Nov 5–11, 2026 · Seville: Nov 11–22, 2026',
      intro: 'UNESCO describes Andalusia as flamenco’s heartland, while noting roots in Murcia and Extremadura too. That does not mean Barcelona shows are only for tourists. Compare the city, actual seats, times and access conditions.',
      status: 'Official pages checked Nov 8, 2026, local Europe/Madrid time (CET). These are listed performance times and prices shown then—not reservations or held seats. Live inventory can change. The Cordobes inventory query used two people only and does not establish availability for a family of three. Museo date-specific sessions for the Seville stay were not verified.',
      earlyTitle: 'Earliest show comparison', early: 'Teatro Flamenco Sevilla lists a 17:00 show on date-specific calendars during the Seville stay (Nov 11–22). Cordobes has a 17:40 show only on Nov 9–10; El Arenal’s first show is 19:00. Museo’s 17:00 is a general listed time, not a verified date-specific slot. Earlier times do not guarantee seats or access.',
      timeLabel: 'Official schedule and showtime', priceLabel: 'Tickets and inclusions', accessLabel: 'Seating and parent considerations', termsLabel: 'Official cancellation/change terms', addressLabel: 'Address', sourcesLabel: 'Official information and tickets', checklistTitle: 'Check before deciding',
      checklist: ['Ask each venue about the actual seat, stage view, stairs or step-free route, mobility aids and places to rest. A “parent-friendly” label or a theatre name is not a guarantee of comfort or accessibility.', 'Check the return journey to your lodging and dinner timing. The earliest show varies by date, and Museo’s general schedule is not a date-confirmed listing.', 'Prices and terms can change. Recheck the official page for your selected date, party size and ticket before payment. This guide does not alter the itinerary, lodging, transport or existing reservations; no tickets were purchased.'],
      venues: [
        {
          id: 'teatro', city: 'Seville', name: 'Teatro Flamenco Sevilla', duration: '60-minute show',
          schedule: 'Official dated calendar: Nov 11, 12, 15–19 and 22 at 17:00, 19:00 and 20:45. Nov 13, 14, 20 and 21 add a 22:15 show. Venue-local times.',
          tickets: 'On the panel checked Nov 8, adult General was €29 and Premium €39; Premium includes one welcome drink. Premium is listed in rows 2–5, General 6–12, Promo 13–16. Prices and promotions can change.',
          access: 'Seats are occupied in strict order of arrival; the venue recommends arriving 20 minutes early. A reduced-mobility/wheelchair selection is offered, but the pages checked do not specify steps or a step-free entrance route. Ask about the seat and access you need.',
          terms: 'The official refund policy allows date changes up to 24 hours before the show and a full ticket refund for cancellations notified at least 24 hours ahead; later cancellations are non-refundable. An optional cancellation product has separate terms and fee—check the checkout page.',
          address: 'Calle Cuna, 15, 41004 Sevilla',
          links: [['Official venue and show', 'teatro'], ['Official dated ticket calendar', 'teatroTickets'], ['Official refund policy', 'teatroRefund']]
        },
        {
          id: 'museo', city: 'Seville', name: 'Museo del Baile Flamenco', duration: '60-minute show',
          schedule: 'The FAQ lists general showtimes of 17:00, 19:00 and 20:45. A date-specific schedule for Nov 11–22 was not found in this check; do not treat these as confirmed daily slots.',
          tickets: 'The Puro Flamenco adult ticket is listed at €29. Do not assume it includes a drink. A separate Flamenco Dreams product description says a drink is included.',
          access: 'Seating is unassigned and first come; doors open 45 minutes before the show. The official accessibility page says a lift reaches all four floors and an adapted toilet is available. It does not state the number of steps or a specific step-free route.',
          terms: 'The FAQ says date changes are free if requested at least a day ahead; cancellation more than 48 hours ahead is free, within 48 hours is charged 50%, and on the event day 100%. Recheck the selected product’s terms.',
          address: 'Calle Manuel Rojas Marcos, 3, 41003 Sevilla',
          links: [['Official ticket sales', 'museoTickets'], ['Official FAQ, times and cancellation', 'museoFaq'], ['Official accessibility information', 'museoAccess']]
        },
        {
          id: 'arenal', city: 'Seville', name: 'Tablao Flamenco El Arenal', duration: '60-minute show',
          schedule: 'The official booking calendar lists 19:00 and 21:30 shows every day from Nov 11–22. Dinner passes start at 18:00 or 20:30 before those shows. Calendar inventory changes separately.',
          tickets: 'The official homepage lists show + drink €45, tapas + drink + dessert €71, and dinner €86. It says VAT is excluded from the drink and tapas products. Confirm the final amount for the selected option.',
          access: 'The official pages checked did not specify seat assignment, steps, a step-free entrance or wheelchair access. Ask the venue about seating and access before choosing.',
          terms: 'The official booking policy allows a full refund or date change up to 48 hours before the show; it says no refund or change is possible within 48 hours.',
          address: 'Calle Rodo, 7, 41001 Sevilla',
          links: [['Official dated booking calendar', 'arenalTickets'], ['Official show information', 'arenalShow'], ['Official menu and dinner options', 'arenalFood'], ['Official refund policy', 'arenalRefund']]
        },
        {
          id: 'cordobes', city: 'Barcelona', name: 'Tablao Cordobes', duration: '70-minute show · no interval',
          schedule: 'The official booking calendar lists show-only times on Nov 8 at 19:15 and 21:00; Nov 9–10 at 17:40, 19:15, 21:00 and 22:30; and Nov 11 at 19:15, 21:00 and 22:30. Nov 5–7 had passed when checked.',
          tickets: 'The standard show ticket is €48 and includes one drink. The €35 last-row product warns of reduced stage visibility. Spanish tasting buffet + show is €86; buffet starts at 18:00, 19:30 and 21:15 for the 19:15, 21:00 and 22:30 shows, respectively.',
          access: 'The FAQ asks guests with reduced mobility to give prior notice for priority access and lists lift dimensions (70 cm doorway; 90 × 90 cm inside). It does not specify a step-free route or number of steps. Seats are assigned in booking order; dinner-and-show guests receive seating priority.',
          terms: 'The official booking terms describe the statutory withdrawal period and refund process, and say cancellations or changes are not accepted within 48 hours of the service. Check the latest terms for the selected ticket before payment.',
          address: 'La Rambla, 35, 08002 Barcelona',
          links: [['Official ticket booking', 'cordobesTickets'], ['Official show schedules', 'cordobesSchedule'], ['Official FAQ and access information', 'cordobesFaq']]
        }
      ]
    },
    ja: {
      kicker: '公式公演時間・チケット案内', title: 'ご両親と楽しむフラメンコ公演ガイド',
      trip: 'バルセロナ：2026年11月5〜11日 · セビリア：11月11〜22日',
      intro: 'UNESCOはアンダルシアをフラメンコの中心地としつつ、ムルシアやエストレマドゥーラにもルーツがあると説明しています。バルセロナの公演が観光客専用という意味ではありません。都市、実際の座席、時間、アクセス条件を比べて選んでください。',
      status: '公式ページ確認：2026年11月8日、Europe/Madrid現地時間（CET）。以下は確認時に掲載されていた公演時間・料金で、予約や座席確保ではありません。在庫は変動します。Cordobesの在庫照会は2名で行われたため、家族3名分の空席を示すものではありません。Museoのセビリア滞在期間の日付別公演枠は確認できませんでした。',
      earlyTitle: '最も早い公演枠の比較', early: 'Teatro Flamenco Sevillaはセビリア滞在中の11月11〜22日、日付別カレンダーに17:00公演を掲載。Cordobesは11月9・10日のみ17:40、El Arenalの最初の公演は19:00です。Museoの17:00は通常案内で、日付別の公演枠ではありません。早い時間でも空席やアクセスは保証されません。',
      timeLabel: '公式日程・開演時間', priceLabel: 'チケット・含まれるもの', accessLabel: '座席・ご両親同伴の確認点', termsLabel: '公式の取消・変更条件', addressLabel: '住所', sourcesLabel: '公式案内・チケット', checklistTitle: '決定前に確認',
      checklist: ['実際の座席、舞台の見え方、階段や段差のない経路、補助具、休憩席について各会場に直接問い合わせてください。「親向け」や劇場という名称だけで快適さ・アクセシビリティは保証されません。', '宿までの帰路と夕食の時間も確認してください。最も早い公演は日によって異なり、Museoの通常時間は日付確定の公演枠ではありません。', '料金・条件は変更される場合があります。支払い前に選択した日付・人数・チケットの公式画面で再確認してください。この案内で旅程、宿泊、交通、既存予約は変更しておらず、チケットも購入していません。'],
      venues: [
        {
          id: 'teatro', city: 'セビリア', name: 'Teatro Flamenco Sevilla', duration: '公演60分',
          schedule: '公式の日付別カレンダー：11月11・12・15〜19・22日は17:00、19:00、20:45。11月13・14・20・21日はこれに22:15が追加されます。会場現地時間です。',
          tickets: '11月8日の表示では大人General €29、Premium €39。Premiumにはウェルカムドリンク1杯が含まれます。Premiumは2〜5列、Generalは6〜12列、Promoは13〜16列と表示。料金・プロモーションは変更されます。',
          access: '座席は到着順に厳密に案内され、20分前の到着が推奨されています。移動に関する配慮・車椅子の選択欄はありますが、階段数や段差のない入口経路は確認したページに記載されていません。必要な座席・動線を問い合わせてください。',
          terms: '公式返金案内では、公演24時間前までの日程変更と、24時間前までに連絡した取消の全額返金が可能です。それ以降の取消は返金不可。別料金の取消保証商品には異なる条件があるため、決済画面で確認してください。',
          address: 'Calle Cuna, 15, 41004 Sevilla',
          links: [['公式会場・公演案内', 'teatro'], ['公式日付別チケットカレンダー', 'teatroTickets'], ['公式返金ポリシー', 'teatroRefund']]
        },
        {
          id: 'museo', city: 'セビリア', name: 'Museo del Baile Flamenco', duration: '公演60分',
          schedule: 'FAQに掲載された通常の開演時間は17:00、19:00、20:45です。11月11〜22日の各日公演枠は今回確認できなかったため、毎日確定している時間とはみなさないでください。',
          tickets: 'Puro Flamencoの大人料金は€29。ドリンク付きとは限りません。別商品Flamenco Dreamsの説明にはドリンク付きと記載されています。',
          access: '座席指定なし・先着順で、開場は公演45分前。公式アクセシビリティ案内ではエレベーターで4フロアすべてに移動でき、バリアフリートイレもあります。階段数や具体的な段差なし経路は明記されていません。',
          terms: 'FAQでは、1日以上前の変更は無料、48時間より前の取消は無料、48時間以内は50%、当日は100%の取消料と案内されています。選択する商品の条件を再確認してください。',
          address: 'Calle Manuel Rojas Marcos, 3, 41003 Sevilla',
          links: [['公式チケット販売', 'museoTickets'], ['公式FAQ・時間・取消条件', 'museoFaq'], ['公式アクセシビリティ案内', 'museoAccess']]
        },
        {
          id: 'arenal', city: 'セビリア', name: 'Tablao Flamenco El Arenal', duration: '公演60分',
          schedule: '公式予約カレンダーには11月11〜22日の毎日19:00と21:30の公演が掲載されています。ディナーパスはそれぞれ公演前の18:00または20:30開始。在庫は別途変動します。',
          tickets: '公式サイトの商品は公演+ドリンク€45、タパス+ドリンク+デザート€71、ディナー€86。ドリンク・タパス商品はVAT別と記載されています。選択した商品の最終金額を確認してください。',
          access: '確認した公式ページでは座席指定、階段、段差なしの入口、車椅子アクセスの詳細は見つかりませんでした。選ぶ前に座席とアクセスを会場へ問い合わせてください。',
          terms: '公式予約ポリシーでは、公演48時間前までは全額返金または日程変更が可能で、48時間以内は返金・変更不可とされています。',
          address: 'Calle Rodo, 7, 41001 Sevilla',
          links: [['公式日付別予約カレンダー', 'arenalTickets'], ['公式公演案内', 'arenalShow'], ['公式メニュー・ディナー', 'arenalFood'], ['公式返金ポリシー', 'arenalRefund']]
        },
        {
          id: 'cordobes', city: 'バルセロナ', name: 'Tablao Cordobes', duration: '公演70分・休憩なし',
          schedule: '公式予約カレンダー：11月8日は19:15・21:00、9〜10日は17:40・19:15・21:00・22:30、11日は19:15・21:00・22:30（ショーのみ）。確認時点で11月5〜7日は過去の日付でした。',
          tickets: '通常チケット€48にはドリンク1杯が付きます。最後列€35のチケットは舞台の見え方が限られると明記されています。スペイン風テイスティングビュッフェ+公演は€86。ビュッフェ開始は18:00・19:30・21:15で、それぞれ19:15・21:00・22:30公演に対応します。',
          access: 'FAQは移動に制約のある方に優先入場のため事前連絡を求め、エレベーター寸法（入口幅70cm、内部90×90cm）を記載しています。段差なし経路や段差数は明記されていません。座席は予約順で、ディナー付き公演は座席優先と案内されています。',
          terms: '公式予約条件は法定の撤回期間と返金手続きを説明し、サービス開始48時間以内の取消・変更は受け付けないとしています。購入前に選択商品の最新条件を確認してください。',
          address: 'La Rambla, 35, 08002 Barcelona',
          links: [['公式チケット予約', 'cordobesTickets'], ['公式公演時間', 'cordobesSchedule'], ['公式FAQ・アクセス案内', 'cordobesFaq']]
        }
      ]
    },
    zh: {
      kicker: '官方演出时间 · 购票参考', title: '陪父母观看弗拉门戈演出指南',
      trip: '巴塞罗那：2026年11月5–11日 · 塞维利亚：11月11–22日',
      intro: 'UNESCO称安达卢西亚是弗拉门戈的核心地区，同时指出穆尔西亚和埃斯特雷马杜拉也有相关根源。这并不意味着巴塞罗那的演出只面向游客。请比较城市、实际座位、时间和通行条件。',
      status: '官方页面核对时间：2026年11月8日，Europe/Madrid当地时间（CET）。以下为当时公布的演出时间与页面价格，不是预订或留座；实时库存可能变化。Cordobes库存查询仅按2人进行，不能据此确认三口之家的名额。未核实Museo在塞维利亚停留日期内的逐日演出场次。',
      earlyTitle: '较早场次对比', early: 'Teatro Flamenco Sevilla在塞维利亚停留期间（11月11–22日）的逐日官方日历列有17:00场。Cordobes仅在11月9–10日有17:40场；El Arenal每天最早为19:00。Museo的17:00只是常规公布时间，未核实具体日期场次。较早开场不代表有票或通行无障碍。',
      timeLabel: '官方场次与演出时间', priceLabel: '票价与包含内容', accessLabel: '座位与陪父母注意事项', termsLabel: '官方取消/改期条件', addressLabel: '地址', sourcesLabel: '官方信息与购票', checklistTitle: '决定前请确认',
      checklist: ['请直接向场馆询问实际座位、舞台视野、楼梯或无台阶路线、助行器和休息座位。“适合父母”或“剧院”名称都不能保证舒适或无障碍。', '同时确认回住宿的路线和晚餐时间。最早场次因日期而异；Museo公布的常规时间不等于逐日确认的场次。', '价格和条件可能变化。付款前请在所选日期、人数和票种的官方页面复核。此指南未更改行程、住宿、交通或现有预订，也未购买门票。'],
      venues: [
        {
          id: 'teatro', city: '塞维利亚', name: 'Teatro Flamenco Sevilla', duration: '演出60分钟',
          schedule: '官方逐日场次日历：11月11、12、15–19、22日为17:00、19:00、20:45；11月13、14、20、21日另有22:15场。均为场馆当地时间。',
          tickets: '11月8日页面显示成人General €29、Premium €39；Premium含一杯欢迎饮品。Premium为第2–5排，General第6–12排，Promo第13–16排。价格和促销可能变化。',
          access: '座位严格按到场顺序安排，场馆建议提前20分钟到。页面有行动便利/轮椅选项，但未说明台阶数量或无台阶入口路线。请询问所需座位和通行方式。',
          terms: '官方退款政策允许演出前24小时以上改期；至少提前24小时通知取消可全额退票。之后取消不退款。另有收费的取消保障产品，条件不同，请在结账页核对。',
          address: 'Calle Cuna, 15, 41004 Sevilla',
          links: [['官方场馆与演出介绍', 'teatro'], ['官方逐日购票日历', 'teatroTickets'], ['官方退款政策', 'teatroRefund']]
        },
        {
          id: 'museo', city: '塞维利亚', name: 'Museo del Baile Flamenco', duration: '演出60分钟',
          schedule: 'FAQ公布的常规演出时间为17:00、19:00、20:45。本次未查到11月11–22日的逐日场次，不能把这些时间视为每天都已确认。',
          tickets: 'Puro Flamenco成人票标价€29，不要默认含饮品。另一个Flamenco Dreams产品说明注明含饮品。',
          access: '座位不指定、先到先得；演出前45分钟开门。官方无障碍页面说明电梯可到达全部四层，并设有无障碍卫生间，但未说明台阶数量或具体无台阶路线。',
          terms: 'FAQ说明：至少提前一天申请改期免费；提前48小时以上取消免费；48小时内取消收取50%，演出当天收取100%。请重新核对所选产品条款。',
          address: 'Calle Manuel Rojas Marcos, 3, 41003 Sevilla',
          links: [['官方售票页面', 'museoTickets'], ['官方FAQ、时间与取消条件', 'museoFaq'], ['官方无障碍信息', 'museoAccess']]
        },
        {
          id: 'arenal', city: '塞维利亚', name: 'Tablao Flamenco El Arenal', duration: '演出60分钟',
          schedule: '官方预订日历列出11月11–22日每天19:00和21:30演出。晚餐场次分别于演出前18:00或20:30开始；库存另行实时变化。',
          tickets: '官网列出演出+饮品€45、塔帕斯+饮品+甜点€71、晚餐€86。页面注明饮品/塔帕斯产品未含VAT。请确认所选选项的最终金额。',
          access: '已查阅的官方页面未说明座位分配、台阶、无台阶入口或轮椅通行情况。选择前请直接向场馆确认座位和通行条件。',
          terms: '官方预订政策说明：演出前48小时以上可全额退款或改期；演出前48小时内不接受退款或更改。',
          address: 'Calle Rodo, 7, 41001 Sevilla',
          links: [['官方逐日预订日历', 'arenalTickets'], ['官方演出介绍', 'arenalShow'], ['官方菜单与晚餐选项', 'arenalFood'], ['官方退款政策', 'arenalRefund']]
        },
        {
          id: 'cordobes', city: '巴塞罗那', name: 'Tablao Cordobes', duration: '演出70分钟 · 无中场休息',
          schedule: '官方购票日历的纯演出场次：11月8日19:15、21:00；11月9–10日17:40、19:15、21:00、22:30；11月11日19:15、21:00、22:30。核对时11月5–7日已过。',
          tickets: '标准演出票€48含一杯饮品。€35最后几排产品注明舞台视野受限。西班牙品尝自助餐+演出€86；自助餐于18:00、19:30、21:15开始，分别对应19:15、21:00、22:30的演出。',
          access: 'FAQ建议行动不便的观众提前联系以安排优先入场，并列出电梯尺寸（门宽70厘米，内部90×90厘米）。未说明无台阶路线或台阶数量。座位按预订顺序安排；晚餐+演出客人有座位优先安排。',
          terms: '官方购票条款说明法定撤回期和退款流程，并注明服务开始前48小时内不接受取消或更改。付款前请核对所选票种的最新条款。',
          address: 'La Rambla, 35, 08002 Barcelona',
          links: [['官方购票', 'cordobesTickets'], ['官方演出时间', 'cordobesSchedule'], ['官方FAQ与通行信息', 'cordobesFaq']]
        }
      ]
    }
  };

  const labels = {
    ko: { venue: '공연장', duration: '공연 시간', schedule: '회차', tickets: '티켓', access: '좌석·접근', terms: '취소·변경', visit: '가이드 열기', chatTitle: '공식 확인 기반 플라멩코 공연 안내', query: '플라멩코 공연·티켓·시간·접근성 정보' },
    en: { venue: 'Venue', duration: 'Duration', schedule: 'Showtimes', tickets: 'Tickets', access: 'Seating and access', terms: 'Cancellation and changes', visit: 'Open the guide', chatTitle: 'Flamenco show details from official sources', query: 'Flamenco show, ticket, time and access information' },
    ja: { venue: '会場', duration: '公演時間', schedule: '公演枠', tickets: 'チケット', access: '座席・アクセス', terms: '取消・変更', visit: 'ガイドを開く', chatTitle: '公式情報に基づくフラメンコ公演案内', query: 'フラメンコ公演・チケット・時間・アクセス情報' },
    zh: { venue: '场馆', duration: '演出时长', schedule: '演出场次', tickets: '票价', access: '座位与通行', terms: '取消与改期', visit: '打开指南', chatTitle: '依据官方信息的弗拉门戈演出指南', query: '弗拉门戈演出、门票、时间与通行信息' }
  };

  const aliases = [
    'flamenco', 'flamenca', 'tablao', 'teatro flamenco', 'museo del baile flamenco', 'el arenal', 'cordobes', 'cordobès', 'flamenco show', 'flamenco ticket', 'espectaculo flamenco', 'espectáculo flamenco',
    '플라멩코', '타블라오', '테아트로 플라멩코', '플라멩코 춤 박물관', '엘 아레날', '코르도베스',
    'フラメンコ', 'タブラオ', 'テアトロ・フラメンコ', 'エル・アレナル', 'コルドベス',
    '弗拉门戈', '塔布劳', '弗拉门戈演出', '弗拉门戈门票', '埃尔阿雷纳尔', '科尔多贝斯'
  ];

  function normalize(value) {
    return String(value || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim();
  }
  function esc(value) {
    return String(value).replace(/[&<>"']/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));
  }
  function getLang(lang) {
    return Object.prototype.hasOwnProperty.call(content, lang) ? lang : 'ko';
  }
  function urlFor(key) { return sources[key] || '#'; }
  function renderVenue(venue, lang, compact) {
    const c = content[lang], l = labels[lang];
    const links = venue.links.map(([name, key]) => `<a href="${esc(urlFor(key))}" target="_blank" rel="noopener noreferrer">${esc(name)} ↗</a>`).join('');
    return `<article class="flamenco-venue-card${compact ? ' flamenco-chat-card' : ''}" data-flamenco-venue="${esc(venue.id)}"><div class="flamenco-venue-meta"><span>${esc(venue.city)}</span><span>${esc(venue.duration)}</span></div><h3>${esc(venue.name)}</h3><dl><div><dt>${esc(l.schedule)}</dt><dd>${esc(venue.schedule)}</dd></div><div><dt>${esc(l.tickets)}</dt><dd>${esc(venue.tickets)}</dd></div><div><dt>${esc(l.access)}</dt><dd>${esc(venue.access)}</dd></div><div><dt>${esc(l.terms)}</dt><dd>${esc(venue.terms)}</dd></div></dl><p class="flamenco-address"><strong>${esc(c.addressLabel)}:</strong> ${esc(venue.address)}</p><div class="flamenco-links">${links}</div></article>`;
  }
  function renderFlamencoGuide(lang) {
    const mount = document.getElementById('flamenco-guide-mount');
    if (!mount) return;
    const locale = getLang(lang || window.currentLang || localStorage.getItem('travel_user_lang'));
    const c = content[locale];
    mount.innerHTML = `<section class="flamenco-guide" data-flamenco-locale="${locale}" aria-labelledby="flamenco-guide-title"><header class="flamenco-guide-header"><p class="flamenco-kicker">${esc(c.kicker)}</p><h2 id="flamenco-guide-title">${esc(c.title)}</h2><p class="flamenco-trip">${esc(c.trip)}</p><p>${esc(c.intro)}</p><p class="flamenco-source-inline"><a href="${esc(sources.unesco)}" target="_blank" rel="noopener noreferrer">UNESCO · ${locale === 'ko' ? '무형문화유산 플라멩코' : locale === 'ja' ? '無形文化遺産・フラメンコ' : locale === 'zh' ? '非物质文化遗产·弗拉门戈' : 'Intangible Cultural Heritage: Flamenco'} ↗</a></p></header><aside class="flamenco-status"><strong>${esc(c.status)}</strong></aside><aside class="flamenco-early"><strong>${esc(c.earlyTitle)}</strong><p>${esc(c.early)}</p></aside><div class="flamenco-venue-grid">${c.venues.map(venue => renderVenue(venue, locale, false)).join('')}</div><aside class="flamenco-checklist"><h3>${esc(c.checklistTitle)}</h3><ul>${c.checklist.map(item => `<li>${esc(item)}</li>`).join('')}</ul></aside></section>`;
  }

  function buildFlamencoChatResponse(query, lang) {
    const q = normalize(query);
    if (!aliases.some(term => q.includes(normalize(term)))) return null;
    const locale = getLang(lang), c = content[locale], l = labels[locale];
    const specific = [];
    if (q.includes('teatro flamenco') || q.includes('테아트로') || q.includes('テアトロ') || q.includes('teatro')) specific.push('teatro');
    if (q.includes('museo') || q.includes('박물관') || q.includes('博物館') || q.includes('博物馆')) specific.push('museo');
    if (q.includes('arenal') || q.includes('아레날') || q.includes('アレナル') || q.includes('阿雷纳尔')) specific.push('arenal');
    if (q.includes('cordobes') || q.includes('cordobès') || q.includes('코르도베스') || q.includes('コルドベス') || q.includes('科尔多贝斯')) specific.push('cordobes');
    const isBarcelona = ['barcelona', '바르셀로나', 'バルセロナ', '巴塞罗那'].some(term => q.includes(normalize(term)));
    const isSeville = ['seville', 'sevilla', '세비야', 'セビリア', 'セビリヤ', '塞维利亚'].some(term => q.includes(normalize(term)));
    const selected = specific.length
      ? c.venues.filter(venue => specific.includes(venue.id))
      : isBarcelona ? c.venues.filter(venue => venue.id === 'cordobes')
        : isSeville ? c.venues.filter(venue => ['teatro', 'museo', 'arenal'].includes(venue.id))
          : c.venues;
    return `<div class="flamenco-chat-answer" data-flamenco-chat-locale="${locale}"><strong>${esc(l.chatTitle)}</strong><p>${esc(c.status)}</p><aside class="flamenco-early flamenco-chat-early"><strong>${esc(c.earlyTitle)}</strong><p>${esc(c.early)}</p></aside><div class="flamenco-chat-grid">${selected.map(venue => renderVenue(venue, locale, true)).join('')}</div><button type="button" class="chat-quick-chip" onclick="goToFlamencoGuide()">${esc(l.visit)}</button></div>`;
  }

  function goToFlamencoGuide() {
    if (typeof switchGuidebookChapter === 'function') switchGuidebookChapter('chapter-practical');
    if (typeof goToBookPage === 'function') goToBookPage('chapter-practical', 5);
    if (typeof closeChatWindow === 'function') closeChatWindow();
    window.setTimeout(() => document.getElementById('flamenco-guide-mount')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 160);
  }

  ['ko', 'en', 'ja', 'zh'].forEach(lang => {
    if (typeof CHATBOT_I18N !== 'undefined' && CHATBOT_I18N[lang] && Array.isArray(CHATBOT_I18N[lang].chips)) {
      const q = labels[lang].query;
      if (!CHATBOT_I18N[lang].chips.some(chip => chip.q === q)) CHATBOT_I18N[lang].chips.unshift({ text: content[lang].title, q });
    }
  });

  window.FLAMENCO_GUIDE = { content, labels, sources };
  window.renderFlamencoGuide = renderFlamencoGuide;
  window.buildFlamencoChatResponse = buildFlamencoChatResponse;
  window.goToFlamencoGuide = goToFlamencoGuide;

  const baseRender = window.renderActivityGuide;
  if (typeof baseRender === 'function') {
    window.renderActivityGuide = function (lang) {
      const result = baseRender(lang);
      renderFlamencoGuide(lang);
      return result;
    };
  }
  document.addEventListener('DOMContentLoaded', () => renderFlamencoGuide(window.currentLang || localStorage.getItem('travel_user_lang') || 'ko'));
})();
