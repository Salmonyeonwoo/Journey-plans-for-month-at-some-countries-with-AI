(function () {
  'use strict';

  const LANGS = ['ko', 'en', 'ja', 'zh'];
  const SOURCES = {
    renfeTerms: { label: 'Renfe — Condiciones Generales Renfe Viajeros', url: 'https://www.renfe.com/es/es/ayuda/informacion-legal-viajeros/condiciones-generales/condiciones-generales-renfe-viajeros' },
    renfeChanges: { label: 'Renfe — Cambiar billete', url: 'https://www.renfe.com/es/es/ayuda/cambiar-billete' },
    renfeCancellations: { label: 'Renfe — Anular billete', url: 'https://www.renfe.com/es/es/ayuda/anular-billete' },
    alsaChannels: { label: 'ALSA — Ticket prices by purchase channel', url: 'https://www.alsa.com/it/ayuda/precio-canales-compra' },
    alsaChildren: { label: 'ALSA — Discount for children and babies', url: 'https://www.alsa.com/en/faqs/discount-for-children-and-babies' },
    sncfFare: { label: 'SNCF Connect — Questions sur la consultation des horaires et tarifs', url: 'https://www.sncf-connect.com/aide/questions-sur-la-consultation-des-horaires-et-tarifs' },
    sncfAfterSales: { label: 'SNCF Connect — Exchange, cancellation and refund terms', url: 'https://www.sncf-connect.com/aide/conditions-d-echange-d-annulation-et-de-remboursement-de-mon-billet-de-train' },
    sncfCard: { label: 'SNCF — Carte Avantage Adulte', url: 'https://www.sncf-voyageurs.com/fr/voyagez-avec-nous/en-france/tarifs-grandes-lignes/carte-avantage/carte-avantage-adulte/' },
    dbSaver: { label: 'Deutsche Bahn — Saver fare', url: 'https://int.bahn.de/en/offers/saver-fare-flexible-fare/saver-fare' },
    dbFlexible: { label: 'Deutsche Bahn — Flexible fare', url: 'https://int.bahn.de/en/offers/saver-fare-flexible-fare/flexible-fare' },
    dbRefunds: { label: 'Deutsche Bahn — Exchanges and refunds', url: 'https://int.bahn.de/en/booking-information/exchanges-refunds' },
    trenitaliaFares: { label: 'Trenitalia — Rail Fares information', url: 'https://www.trenitalia.com/en/html/trenitalia/Info_Tariffe_en_LeFrecce.html' },
    trenitaliaYoung: { label: 'Trenitalia — Young Offer', url: 'https://www.trenitalia.com/en/offers/young-offer.html' },
    obbSparschiene: { label: 'ÖBB — Sparschiene', url: 'https://www.oebb.at/en/tickets-kundenkarten/oesterreich-europa/sparschiene' },
    obbChannels: { label: 'ÖBB — All options to get your ticket', url: 'https://www.oebb.at/en/tickets-kundenkarten/weg-zum-ticket' },
    obbDiscounts: { label: 'ÖBB — Vorteilscard: variants and benefits', url: 'https://www.oebb.at/en/tickets-kundenkarten/kundenkarten/vorteilscard' },
    westbahnRoute: { label: 'Westbahn — Salzburg route', url: 'https://westbahn.at/en/news/our-travel-destinations/salzburg/' },
    westbahnFleet: { label: 'Westbahn — About Westbahn / fleet', url: 'https://corporate.westbahn.at/en/about-westbahn/' },
    westbahnFare: { label: 'Westbahn — WestSuperpreis', url: 'https://westbahn.at/en/fares/westsuperpreis/' },
    railAdvance: { label: 'National Rail — Advance tickets', url: 'https://www.nationalrail.co.uk/tickets-railcards-and-offers/ticket-types/advance-tickets/' },
    railBuying: { label: 'National Rail — Buying a ticket', url: 'https://www.nationalrail.co.uk/tickets-railcards-and-offers/buying-a-ticket/' },
    nationalExpressFares: { label: 'National Express — Tickets and fares', url: 'https://www.nationalexpress.com/en/help/tickets' },
    nationalExpressFees: { label: 'National Express — How to book and fees', url: 'https://www.nationalexpress.com/en/help/how-to-book-special-offers-fees' },
    nationalExpressYoung: { label: 'National Express — Young Persons Coachcard', url: 'https://www.nationalexpress.com/en/offers/coachcards/young-person' },
    omioFees: { label: 'Omio — Fees included in a booking', url: 'https://help.omio.com/hc/en-us/articles/13705582843292-What-fees-are-included-in-my-booking' },
    omioServiceFee: { label: 'Omio — Service fee and booking rate', url: 'https://help.omio.com/hc/en-us/articles/13705489840796-What-is-the-service-fee-What-is-the-booking-rate-Can-I-be-charged-with-both' },
    omioChanges: { label: 'Omio — Ticket price changed before booking completed', url: 'https://help.omio.com/hc/en-us/articles/207086669-The-price-of-my-ticket-changed-before-I-finished-booking' }
  };

  const COPY = {
    ko: {
      kicker: '공식 운송사·판매처 규정 사례',
      title: '기차·장거리버스 요금은 같은 조건으로 비교하세요',
      lead: '유럽의 운임·판매 채널·할인 규정은 운송사와 표 종류마다 다릅니다. 아래는 공식 약관의 사례이며 실시간 요금 견적이 아닙니다.',
      observationTitle: '네르하 사례',
      observation: '네르하에서 버스를 타며 확인한 내용은 개인 현장 관찰로만 다룹니다. 구간·날짜·승객 조건·결제 내역이 제공되지 않아 유럽 전역의 가격 규칙을 뒷받침하는 근거로 확대하지 않습니다.',
      checklistTitle: '가격을 비교할 때 맞춰 볼 항목',
      checklist: [
        '같은 출발지·도착지, 날짜와 출발 시각, 편도·왕복 및 환승 조건',
        '같은 인원·연령과 할인 카드·회원 자격·필요한 증빙',
        '같은 열차·운행편, 좌석 등급, 운임명, 수하물·좌석 선택 등 포함 서비스',
        '검색 화면 가격이 아니라 결제 직전 총액; 예약·서비스·관리 수수료와 운송사 부과금도 확인',
        '지정 열차·날짜 조건, 변경·환불·취소 규정',
        '같은 시점에 확인하고 운임·좌석 재고가 결제 전에 바뀔 수 있음을 고려'
      ],
      correctionNote: '정정: 모든 중개사·역 창구·앱 중 항상 최저가인 채널은 확인되지 않았습니다. 관광객 국적만으로 할인 자격을 일괄 판단할 수 없고, 모든 60세 이상·25세 미만에게 통하는 공통 할인도 없습니다. 당일 표가 항상 기본 운임이라는 규칙도 확인되지 않았습니다.',
      casesTitle: '공식 안내에서 확인한 사례',
      sourcesLabel: '공식 자료',
      cards: [
        { title: 'Renfe · 스페인 철도', route: '예시 구간: 마드리드–바르셀로나 · 실제 가격은 확인하지 않음', body: [
          'Renfe는 상업 운임이 열차·날짜·출발/도착지·판매 채널·선택한 조건과 수요·공급에 따라 달라질 수 있고, 채널별 발권 비용이 붙을 수 있다고 안내합니다.',
          '변경·환불은 운임과 열차 종류별 규정에 따릅니다. 이 자료로 앱·웹·역·중개사 가운데 늘 싼 채널을 정할 수는 없습니다.'
        ], sources: ['renfeTerms', 'renfeChanges', 'renfeCancellations'] },
        { title: 'ALSA · 스페인 장거리버스', route: '구매 채널 규정 예시 · 특정 구간의 가격 비교 아님', body: [
          'ALSA는 표 자체 가격이 구매 채널별로 같다고 설명하지만, 일부 ALSA PLUS+ 비회원은 웹·앱·전화 구매에서 별도 관리 수수료를 낼 수 있습니다. FAQ에는 수수료액이 적혀 있지 않습니다.',
          '아동·대가족 할인과 변경·환불은 연령·증빙·노선·표 종류 등에 조건이 있으므로 해당 표의 규정을 확인해야 합니다.'
        ], sources: ['alsaChannels', 'alsaChildren'] },
        { title: 'SNCF / TGV INOUI · 프랑스', route: '예시 구간: 파리–리옹 · 실제 가격은 확인하지 않음', body: [
          'SNCF Connect는 요금 요소로 좌석 등급, 예약 시점, 날짜·시간·성수기, 할인 카드, 교환·환불 서비스 등을 들며, 결제 확정 전에 선택한 운임이 더 이상 이용 불가할 수 있다고 안내합니다.',
          'Carte Avantage Adulte는 연령(27–59세)과 여행 유형 등 자체 자격이 있는 할인 카드 사례이지, 모든 관광객에게 적용되는 공통 할인은 아닙니다.'
        ], sources: ['sncfFare', 'sncfAfterSales', 'sncfCard'] },
        { title: 'Deutsche Bahn · 독일 철도', route: '예시 구간: 베를린–뮌헨 · 실제 가격은 확인하지 않음', body: [
          'Saver·Super Saver 운임은 지정 장거리 열차에 묶이고, Flexible Fare와 이용·취소 규정이 다릅니다. 할인도 BahnCard와 승객 연령·동행 조건 등 상품별 요건을 확인해야 합니다.',
          '검토한 자료에서는 역·앱·웹·중개 채널의 일반적인 가격 우위나 공통 수수료를 확인하지 못했습니다.'
        ], sources: ['dbSaver', 'dbFlexible', 'dbRefunds'] },
        { title: 'Trenitalia Frecce · 이탈리아', route: '예시 구간: 로마–피렌체 · 실제 가격은 확인하지 않음', body: [
          'Base·Economy·Super Economy는 한정된 운임 단계·좌석과 서로 다른 판매 시점·변경·환불 규정이 있습니다.',
          'Young Offer는 30세 미만뿐 아니라 CartaFRECCIA 또는 X-GO 회원 등 요건과 서비스별 제한 좌석이 있는 사례입니다.'
        ], sources: ['trenitaliaFares', 'trenitaliaYoung'] },
        { title: 'ÖBB와 Westbahn · 오스트리아', route: '예시 구간: 빈–잘츠부르크 · 같은 날짜의 가격 비교는 안 함', body: [
          'ÖBB Sparschiene는 수량이 제한되고 선택한 열차에 묶이는 운임이며, ÖBB는 일찍 예약할 때 더 낮은 운임을 찾을 수 있다고 안내합니다. 별도 판매 경로 수수료가 있더라도 특정 조건을 다른 채널 전체에 일반화하면 안 됩니다. ÖBB Vorteilscard Senior는 65세 이상 조건이 있는 카드 사례로, 60세 이상 모두에게 자동 적용되는 할인은 아닙니다.',
          'Westbahn도 이 구간을 운행합니다. 공식 차량 소개에는 이층 열차와 SMILE 고속열차가 함께 있어 전 차량이 이층은 아닙니다. 동일 조건의 공식 가격 비교가 없어 어느 쪽이 늘 더 싸다고 할 근거도 없습니다.'
        ], sources: ['obbSparschiene', 'obbChannels', 'obbDiscounts', 'westbahnRoute', 'westbahnFleet', 'westbahnFare'] },
        { title: '영국 · National Rail과 National Express', route: '예시 구간: 런던–맨체스터 · 실제 가격은 확인하지 않음', body: [
          'National Rail Advance는 수량 제한·지정 열차 운임으로 보통 최대 12주 전에 판매되며, 일부 노선은 출발 직전까지 판매될 수 있습니다. 따라서 당일은 언제나 기본 운임이라고 단정할 수 없습니다.',
          'National Express는 운임 유형마다 변경·환불 조건이 다르고 예약 수수료를 별도로 둘 수 있습니다. Railcard·Coachcard 혜택 역시 나이·카드·표 종류에 따라 자격이 달라집니다.'
        ], sources: ['railAdvance', 'railBuying', 'nationalExpressFares', 'nationalExpressFees', 'nationalExpressYoung'] },
        { title: 'Omio · 비교·예약 플랫폼', route: '여러 운송사 상품을 다루며 특정 판매처와의 실시간 가격 비교는 안 함', body: [
          'Omio는 예약에 따라 서비스 수수료와 booking rate가 붙을 수 있고, 두 항목이 없을 수도 있다고 설명합니다. 적용되는 표값·수수료·운송사 부과금과 결제 총액은 결제 전에 확인할 수 있습니다.',
          '수수료는 여정·플랫폼·예약일·여행일 등에 따라 달라질 수 있고, 운송사가 표값·재고를 갱신해 결제 전에 바뀔 수도 있습니다. Omio가 항상 더 비싸거나 싸다는 근거는 확인되지 않았습니다.'
        ], sources: ['omioFees', 'omioServiceFee', 'omioChanges'] }
      ],
      disclaimer: '도시 쌍은 규정 사례를 설명하기 위한 예시이며, 현재 운행표·좌석 재고·가격을 조회한 것이 아닙니다. 실제 구매 전 운송사와 판매처의 해당 운임 조건 및 결제 직전 총액을 확인하세요.',
      chatChip: '유럽 기차·버스 운임 비교',
      chatQuestion: '유럽 기차와 장거리버스 요금은 어떤 조건으로 비교해야 하고 할인·수수료는 어떻게 확인해?',
      chatAnswer: '운송사·운임 종류·판매 경로에 따라 규칙이 다릅니다. 같은 구간·날짜·시간·승객 연령·운임과 포함 서비스를 맞춘 뒤 결제 직전 총액과 변경·환불 조건을 비교하세요. 관광객·연령 할인은 각 카드와 표의 자격을 확인해야 합니다. 이 안내는 현재 요금 견적이 아닙니다.',
      chatGuide: '유럽 운임 안내 열기', chatSources: '공식 예시: '
    },
    en: {
      kicker: 'Official operator and seller rules',
      title: 'Compare intercity train and coach fares on equal terms',
      lead: 'European operators use different fare types, sales-channel rules and discount conditions. These are official rule examples, not live fare quotes.',
      observationTitle: 'The Nerja observation',
      observation: 'The Nerja point is treated only as an individual observation made while riding a bus. No route, date, passenger conditions or payment record was supplied, so it is not evidence of a Europe-wide pricing rule.',
      checklistTitle: 'Match these details before comparing prices',
      checklist: [
        'Same origin and destination, date and departure time, one-way/return and transfer conditions',
        'Same passenger count and ages, discount cards, membership eligibility and required proof',
        'Same train/service, class, named fare, baggage, seat selection and included extras',
        'Compare the final checkout total, not just the search result; check booking, service, management and carrier fees',
        'Check train-specific or date-specific restrictions and change, refund and cancellation terms',
        'Compare at the same time; fares and inventory can change before payment'
      ],
      correctionNote: 'Correction: the sources do not establish an always-cheapest reseller, station counter or app. Tourist nationality alone does not settle discount eligibility; there is no shared discount for every passenger aged 60+ or under 25. Nor is every same-day ticket necessarily a base fare.',
      casesTitle: 'What official sources show',
      sourcesLabel: 'Official sources',
      cards: [
        { title: 'Renfe · Spain rail', route: 'Illustrative corridor: Madrid–Barcelona · no price checked', body: [
          'Renfe says commercial fares may vary with train, date, origin/destination, sales channel, selected conditions and supply and demand; channel-dependent ticket-issuance charges may also apply.',
          'Changes and refunds depend on the fare and train type. These sources do not show that the app, web, station or an aggregator is always cheapest.'
        ], sources: ['renfeTerms', 'renfeChanges', 'renfeCancellations'] },
        { title: 'ALSA · Spain intercity coach', route: 'Purchase-channel example · not a route-price comparison', body: [
          'ALSA says the ticket price itself is the same across purchase channels, while a separate management fee may apply to non-ALSA PLUS+ customers buying on web, app or telephone. The FAQ does not state the amount.',
          'Child and large-family discounts, changes and refunds have age, proof, route and ticket conditions that must be checked for the selected service.'
        ], sources: ['alsaChannels', 'alsaChildren'] },
        { title: 'SNCF / TGV INOUI · France', route: 'Illustrative corridor: Paris–Lyon · no price checked', body: [
          'SNCF Connect lists class, booking timing, travel date/time and peak periods, discount-card status, and exchange/refund services among fare factors. A displayed fare may become unavailable before the booking is validated.',
          'Carte Avantage Adulte is a card with its own age range (27–59) and journey conditions, not a universal tourist discount.'
        ], sources: ['sncfFare', 'sncfAfterSales', 'sncfCard'] },
        { title: 'Deutsche Bahn · Germany rail', route: 'Illustrative corridor: Berlin–Munich · no price checked', body: [
          'Saver and Super Saver fares are tied to a specified long-distance train and have different use/cancellation terms from Flexible Fare. Discounts also have product-specific BahnCard, age or companion conditions.',
          'The reviewed pages do not establish a general price advantage or fee for station, app, web or aggregator purchases.'
        ], sources: ['dbSaver', 'dbFlexible', 'dbRefunds'] },
        { title: 'Trenitalia Frecce · Italy', route: 'Illustrative corridor: Rome–Florence · no price checked', body: [
          'Base, Economy and Super Economy have limited fare levels/seats and different purchase, change and refund conditions.',
          'The Young Offer is one example with age-under-30, CartaFRECCIA or X-GO membership, service and limited-seat requirements.'
        ], sources: ['trenitaliaFares', 'trenitaliaYoung'] },
        { title: 'ÖBB and Westbahn · Austria', route: 'Illustrative corridor: Vienna–Salzburg · no matched-date quote', body: [
          'ÖBB Sparschiene is limited and train-specific; ÖBB says earlier booking can help find a lower fare. Any fee for a narrowly defined sales situation should not be generalized to all channels. The Vorteilscard Senior is an age-card example for eligible passengers aged 65+, not an automatic discount for everyone aged 60+.',
          'Westbahn also serves this corridor. Its fleet page lists double-decker trains as well as SMILE high-speed trains, so not every Westbahn train is a double-decker. No same-condition official price comparison here shows either operator is consistently cheaper.'
        ], sources: ['obbSparschiene', 'obbChannels', 'obbDiscounts', 'westbahnRoute', 'westbahnFleet', 'westbahnFare'] },
        { title: 'UK · National Rail and National Express', route: 'Illustrative corridor: London–Manchester · no price checked', body: [
          'National Rail Advance is limited and train-specific, usually released up to 12 weeks ahead, with some routes offering it close to departure. Same-day travel is therefore not universally a base-fare case.',
          'National Express has different change/refund terms by fare type and may charge booking fees separately. Railcard and Coachcard eligibility also depends on the card, age and ticket.'
        ], sources: ['railAdvance', 'railBuying', 'nationalExpressFares', 'nationalExpressFees', 'nationalExpressYoung'] },
        { title: 'Omio · comparison and booking platform', route: 'Multi-operator service · no live seller-price comparison checked', body: [
          'Omio says a booking may include a service fee and a separate booking rate, or neither. The applicable ticket price, fees, carrier charges and total are available before payment.',
          'Fees can vary with journey, platform, booking date and travel date; the carrier may update ticket price or inventory before payment. The official material does not say Omio is always more expensive or cheaper.'
        ], sources: ['omioFees', 'omioServiceFee', 'omioChanges'] }
      ],
      disclaimer: 'City pairs are illustrative examples of fare rules; no current timetable, seat inventory or prices were queried. Before buying, check the selected fare terms and final checkout total with the operator and seller.',
      chatChip: 'Compare European train and coach fares',
      chatQuestion: 'How should I compare European train and coach fares, discounts and fees?',
      chatAnswer: 'Rules differ by operator, fare type and seller. Match route, date, time, passenger ages, fare and included services, then compare the checkout total and change/refund terms. Check each card’s eligibility rules; this guide is not a live fare quote.',
      chatGuide: 'Open the European fare guide', chatSources: 'Official examples: '
    },
    ja: {
      kicker: '運行会社・販売事業者の公式規則',
      title: '都市間の鉄道・長距離バス運賃は条件をそろえて比較',
      lead: '欧州では、運行会社ごとに運賃タイプ、販売チャネル、割引条件が異なります。以下は公式規則の例で、リアルタイムの運賃見積もりではありません。',
      observationTitle: 'ネルハでの観察について',
      observation: 'ネルハの件は、バス乗車中に確認した個人の観察としてのみ扱います。区間・日付・乗客条件・決済記録が示されていないため、欧州全体の価格規則の根拠にはしません。',
      checklistTitle: '比較時にそろえる条件',
      checklist: [
        '同じ出発地・到着地、日付・出発時刻、片道／往復、乗換条件',
        '同じ人数・年齢、割引カード・会員資格・必要な証明',
        '同じ列車・便、座席クラス、運賃名、手荷物・座席指定などのサービス',
        '検索結果ではなく決済直前の合計額を比較し、予約・サービス・管理・運行会社の手数料も確認',
        '列車・日付の指定条件と、変更・払い戻し・取消規則',
        '同じ時点で確認する。運賃や座席在庫は決済前に変わることがあります'
      ],
      correctionNote: '訂正：仲介サイト・駅窓口・アプリのうち常に最安の販売チャネルは、確認した資料からは分かりません。観光客の国籍だけで割引資格は決まらず、60歳以上または25歳未満に共通する割引もありません。当日券が常に基本運賃とも限りません。',
      casesTitle: '公式資料で確認した例',
      sourcesLabel: '公式資料',
      cards: [
        { title: 'Renfe · スペイン鉄道', route: '例：マドリード〜バルセロナ · 運賃未確認', body: [
          'Renfeは商業運賃が列車・日付・区間・販売チャネル・選択した条件や需給によって変動し、チャネルにより発券手数料が加算される場合があると説明しています。',
          '変更・払い戻しは運賃と列車の種類ごとに異なります。アプリ・ウェブ・駅・仲介業者のいずれかが常に安いとは確認されていません。'
        ], sources: ['renfeTerms', 'renfeChanges', 'renfeCancellations'] },
        { title: 'ALSA · スペイン長距離バス', route: '購入チャネルの例 · 特定区間の価格比較ではありません', body: [
          'ALSAは乗車券本体の価格は購入チャネル間で同じと説明する一方、ALSA PLUS+以外の利用者にはウェブ・アプリ・電話購入で別途管理手数料がかかる場合があるとしています（FAQに金額なし）。',
          '子ども・大家族割引、変更・払い戻しには、年齢・証明・路線・乗車券タイプなどの条件があります。'
        ], sources: ['alsaChannels', 'alsaChildren'] },
        { title: 'SNCF / TGV INOUI · フランス', route: '例：パリ〜リヨン · 運賃未確認', body: [
          'SNCF Connectは座席クラス、予約時期、乗車日・時刻・繁忙期、割引カード、変更・払い戻しサービスなどを運賃要因として挙げています。決済確定前に表示運賃が利用できなくなる場合もあります。',
          'Carte Avantage Adulteは27〜59歳など独自の資格・利用条件があるカードの例で、観光客共通の割引ではありません。'
        ], sources: ['sncfFare', 'sncfAfterSales', 'sncfCard'] },
        { title: 'Deutsche Bahn · ドイツ鉄道', route: '例：ベルリン〜ミュンヘン · 運賃未確認', body: [
          'Saver／Super Saverは指定の長距離列車に限定され、Flexible Fareとは利用・取消条件が異なります。割引にもBahnCard、年齢、同行条件など商品ごとの要件があります。',
          '確認した資料では、駅・アプリ・ウェブ・仲介販売の一般的な価格優位や手数料は示されていません。'
        ], sources: ['dbSaver', 'dbFlexible', 'dbRefunds'] },
        { title: 'Trenitalia Frecce · イタリア', route: '例：ローマ〜フィレンツェ · 運賃未確認', body: [
          'Base・Economy・Super Economyは、販売数や座席数に限りがあり、購入期限・変更・払い戻し条件も異なります。',
          'Young Offerには30歳未満に加え、CartaFRECCIAまたはX-GO会員資格、対象サービス、座席数の条件があります。'
        ], sources: ['trenitaliaFares', 'trenitaliaYoung'] },
        { title: 'ÖBB と Westbahn · オーストリア', route: '例：ウィーン〜ザルツブルク · 同日の価格比較なし', body: [
          'ÖBB Sparschieneは数に限りがあり、選択した列車に限定されます。ÖBBは早めの予約でより低い運賃を見つけやすいと案内しています。特定の購入状況の手数料を全チャネルに当てはめることはできません。Vorteilscard Seniorは65歳以上を対象とするカード例で、60歳以上に自動適用される割引ではありません。',
          'Westbahnも同区間を運行します。公式の車両紹介には2階建て列車とSMILE高速列車の両方が掲載されており、全車両が2階建てではありません。同条件の公式価格比較がないため、どちらが常に安いとも言えません。'
        ], sources: ['obbSparschiene', 'obbChannels', 'obbDiscounts', 'westbahnRoute', 'westbahnFleet', 'westbahnFare'] },
        { title: '英国 · National Rail と National Express', route: '例：ロンドン〜マンチェスター · 運賃未確認', body: [
          'National Rail Advanceは数量限定で列車指定の運賃です。通常は最大12週間前から販売され、一部路線では出発直前まで購入できるため、当日は常に基本運賃とは限りません。',
          'National Expressは運賃タイプで変更・払い戻し条件が異なり、予約手数料が別途かかる場合があります。Railcard・Coachcardの資格もカード・年齢・乗車券によって異なります。'
        ], sources: ['railAdvance', 'railBuying', 'nationalExpressFares', 'nationalExpressFees', 'nationalExpressYoung'] },
        { title: 'Omio · 比較・予約プラットフォーム', route: '複数の交通機関を扱うサービス · 販売価格の実比較なし', body: [
          'Omioによると、予約によってサービス手数料やbooking rateがかかる場合と、どちらもかからない場合があります。乗車券価格・手数料・運行会社の請求額を含む合計は決済前に確認できます。',
          '手数料は区間・利用端末・予約日・旅行日などで異なる場合があり、運行会社が価格・在庫を更新すると決済前に変わることもあります。Omioが常に高い／安いという根拠は確認されていません。'
        ], sources: ['omioFees', 'omioServiceFee', 'omioChanges'] }
      ],
      disclaimer: '都市名は運賃規則を説明する例であり、現在の時刻表・座席在庫・価格は検索していません。購入前に選択した運賃条件と決済直前の合計を運行会社・販売店で確認してください。',
      chatChip: '欧州の鉄道・バス運賃を比較',
      chatQuestion: '欧州の鉄道や長距離バスの運賃・割引・手数料はどう比べればよいですか？',
      chatAnswer: '規則は運行会社、運賃タイプ、販売店ごとに異なります。同じ区間・日付・時刻・乗客の年齢・運賃・付帯サービスをそろえ、決済直前の合計と変更・払い戻し条件を比較してください。割引の資格は各カードや乗車券の規則を確認してください。この案内は実際の運賃見積もりではありません。',
      chatGuide: '欧州運賃ガイドを開く', chatSources: '公式例：'
    },
    zh: {
      kicker: '运营商与销售平台的官方规则',
      title: '比较欧洲城际火车与长途巴士票价时要统一条件',
      lead: '欧洲各运营商的票种、销售渠道和折扣资格各不相同。以下是官方规则示例，不是实时票价报价。',
      observationTitle: '关于内尔哈的观察',
      observation: '内尔哈部分仅作为乘坐巴士时亲自观察到的个案。没有提供线路、日期、乘客条件或付款记录，因此不能据此推断欧洲范围的票价规律。',
      checklistTitle: '比较价格前请统一这些条件',
      checklist: [
        '相同的出发地、目的地、日期和发车时间，以及单程／往返和换乘条件',
        '相同的人数和年龄、折扣卡／会员资格及所需证明',
        '相同的列车／班次、座席等级、票种、行李、选座和包含服务',
        '比较结账前的总价，而不只是搜索结果；核对预订、服务、管理及承运商费用',
        '核对指定列车／日期限制以及改签、退款和取消条件',
        '在同一时间查看；票价与余票可能在付款前变化'
      ],
      correctionNote: '更正：已查资料不能证明中介平台、车站柜台或应用中有任何渠道始终最便宜。游客国籍本身不能决定是否符合折扣资格；也没有适用于所有60岁以上或25岁以下乘客的统一折扣。当天购票也不一定总是基础票价。',
      casesTitle: '官方资料中的例子',
      sourcesLabel: '官方来源',
      cards: [
        { title: 'Renfe · 西班牙铁路', route: '示例线路：马德里–巴塞罗那 · 未查询票价', body: [
          'Renfe表示，商业票价可能随列车、日期、出发地／目的地、销售渠道、所选条件及供需变化；某些渠道还可能收取出票费用。',
          '改签与退款规则因票种和列车类型而异。资料并不能证明应用、网站、车站或中介平台中的任何一种始终更便宜。'
        ], sources: ['renfeTerms', 'renfeChanges', 'renfeCancellations'] },
        { title: 'ALSA · 西班牙城际巴士', route: '购买渠道规则示例 · 非特定线路票价比较', body: [
          'ALSA称车票本身的价格在不同购买渠道相同，但非ALSA PLUS+用户通过网站、应用或电话购买时可能另付管理费；其FAQ未列明金额。',
          '儿童及大家庭折扣、改签和退款都可能受年龄、证明、线路及票种限制，购买前应查看对应车票规则。'
        ], sources: ['alsaChannels', 'alsaChildren'] },
        { title: 'SNCF / TGV INOUI · 法国', route: '示例线路：巴黎–里昂 · 未查询票价', body: [
          'SNCF Connect列出的票价因素包括座席等级、预订时间、日期／时刻与旺季、折扣卡以及改签／退款服务。付款确认前，页面显示的票价也可能不再可售。',
          'Carte Avantage Adulte是有自身年龄范围（27–59岁）和行程条件的折扣卡，并非所有游客都适用。'
        ], sources: ['sncfFare', 'sncfAfterSales', 'sncfCard'] },
        { title: 'Deutsche Bahn · 德国铁路', route: '示例线路：柏林–慕尼黑 · 未查询票价', body: [
          'Saver和Super Saver绑定指定的长途列车，使用及取消规则不同于Flexible Fare。折扣也可能取决于BahnCard、乘客年龄或同行条件。',
          '查阅的资料没有证明车站、应用、网站或中介平台存在普遍的价格优势或统一手续费。'
        ], sources: ['dbSaver', 'dbFlexible', 'dbRefunds'] },
        { title: 'Trenitalia Frecce · 意大利', route: '示例线路：罗马–佛罗伦萨 · 未查询票价', body: [
          'Base、Economy和Super Economy的可售票价档位／座位数量有限，购买期限、改签和退款条件也不同。',
          'Young Offer是需要未满30岁、CartaFRECCIA或X-GO会员资格，并受适用服务和限量座位条件约束的例子。'
        ], sources: ['trenitaliaFares', 'trenitaliaYoung'] },
        { title: 'ÖBB 与 Westbahn · 奥地利', route: '示例线路：维也纳–萨尔茨堡 · 未比较同日票价', body: [
          'ÖBB Sparschiene数量有限且绑定所选列车；ÖBB表示提早预订有助于找到较低票价。特定购票情形中的费用不能泛化到所有销售渠道。例如，Vorteilscard Senior是面向符合条件的65岁及以上乘客的卡，并非所有60岁以上乘客自动享有的折扣。',
          'Westbahn也运营该线路。其官方车队介绍同时列有双层列车和SMILE高速列车，因此并非所有Westbahn列车都是双层。没有同条件官方比价资料证明哪家始终更便宜。'
        ], sources: ['obbSparschiene', 'obbChannels', 'obbDiscounts', 'westbahnRoute', 'westbahnFleet', 'westbahnFare'] },
        { title: '英国 · National Rail 与 National Express', route: '示例线路：伦敦–曼彻斯特 · 未查询票价', body: [
          'National Rail Advance数量有限且绑定具体列车，通常可提前最多12周购买；部分线路也可能在临近出发时仍有销售，因此当天旅行不一定只能买基础票价。',
          'National Express不同票种的改签／退款规则不同，也可能另收预订费。Railcard和Coachcard折扣同样取决于卡种、年龄和票种。'
        ], sources: ['railAdvance', 'railBuying', 'nationalExpressFares', 'nationalExpressFees', 'nationalExpressYoung'] },
        { title: 'Omio · 比价与预订平台', route: '多运营商平台 · 未进行实时卖家比价', body: [
          'Omio表示，订单可能收取服务费和单独的booking rate，也可能两者都不收。付款前可查看适用的车票价格、费用、承运商收费及总额。',
          '费用可能随线路、平台、预订日和出行日变化；承运商更新价格或余票时，付款前票价也可能改变。官方资料没有说Omio始终更贵或始终更便宜。'
        ], sources: ['omioFees', 'omioServiceFee', 'omioChanges'] }
      ],
      disclaimer: '城市对只是解释票价规则的示例；未查询当前时刻表、余票或价格。购买前请向运营商和销售平台确认所选票种条件及结账前总额。',
      chatChip: '比较欧洲火车与长途巴士票价',
      chatQuestion: '欧洲火车和长途巴士的票价、折扣与费用应该如何比较？',
      chatAnswer: '规则因运营商、票种和销售平台而异。请统一线路、日期、时刻、乘客年龄、票种和包含服务，再比较结账前总额以及改签／退款条件。折扣资格请查看具体卡片和车票规则。本指南不是实时票价报价。',
      chatGuide: '打开欧洲票价指南', chatSources: '官方示例：'
    }
  };

  const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));

  function sourceLinks(ids, lang) {
    const copy = COPY[lang] || COPY.ko;
    return ids.map((id) => {
      const source = SOURCES[id];
      if (!source) return '';
      return `<a href="${escapeHtml(source.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(source.label)} ↗</a>`;
    }).join('');
  }

  function renderEuropeIntercityFaresGuide(lang) {
    const mount = document.getElementById('europe-intercity-fares-guide-mount');
    if (!mount) return false;
    const locale = COPY[lang] ? lang : 'ko';
    const copy = COPY[locale];
    const cards = copy.cards.map((card) => `
      <article class="eif-card">
        <h3>${escapeHtml(card.title)}</h3>
        <p class="eif-corridor">${escapeHtml(card.route)}</p>
        ${card.body.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join('')}
        <p class="eif-kicker">${escapeHtml(copy.sourcesLabel)}</p>
        <div class="eif-sources">${sourceLinks(card.sources, locale)}</div>
      </article>`).join('');
    mount.innerHTML = `
      <section class="eif-guide" aria-labelledby="eif-title">
        <p class="eif-kicker">${escapeHtml(copy.kicker)}</p>
        <h2 id="eif-title">${escapeHtml(copy.title)}</h2>
        <p class="eif-lead">${escapeHtml(copy.lead)}</p>
        <aside class="eif-observation"><strong>${escapeHtml(copy.observationTitle)}</strong>${escapeHtml(copy.observation)}</aside>
        <h3 class="eif-check-title">${escapeHtml(copy.checklistTitle)}</h3>
        <ul class="eif-checklist">${copy.checklist.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul>
        <p class="eif-bottom-note">${escapeHtml(copy.correctionNote)}</p>
        <h3 class="eif-case-heading">${escapeHtml(copy.casesTitle)}</h3>
        <div class="eif-cards">${cards}</div>
        <p class="eif-disclaimer">${escapeHtml(copy.disclaimer)}</p>
      </section>`;
    return true;
  }

  const FARE_TERMS = [
    /\b(price|prices|fare|fares|cost|fee|fees|charge|charges|ticket|tickets|discount|cheapest|cheaper|expensive|refund|cancel|cancellation|change|senior|youth|under\s*25|60\s*\+)\b/i,
    /(요금|운임|표값|가격|수수료|할인|저렴|최저가|비싸|환불|취소|변경|시니어|청년|관광객|당일|당일권)/,
    /(運賃|料金|価格|値段|手数料|割引|安い|最安|高い|払い戻し|取消|変更|シニア|若者|当日)/,
    /(票价|价格|费用|手续费|折扣|便宜|最便宜|更贵|退款|退票|改签|取消|老人|青年|当天)/
  ];
  const TRANSIT_TERMS = [
    /\b(train|rail|bus|coach|intercity|omio|renfe|alsa|sncf|bahn|deutsche\s*bahn|trenitalia|obb|oebb|westbahn|national\s*rail|national\s*express|european?)\b/i,
    /(기차|열차|철도|버스|장거리|유럽|오미오|렌페|알사|오스트리아|프랑스|독일|이탈리아|영국)/,
    /(電車|列車|鉄道|バス|長距離|ヨーロッパ|欧州|オミオ|オーストリア|フランス|ドイツ|イタリア|英国)/,
    /(火车|铁路|巴士|长途|欧洲|欧州|奥米奥|奥地利|法国|德国|意大利|英国)/
  ];

  function buildEuropeFareChatResponse(query, lang) {
    const raw = String(query || '');
    const locale = COPY[lang] ? lang : 'ko';
    const fareIntent = FARE_TERMS.some((pattern) => pattern.test(raw));
    const transitContext = TRANSIT_TERMS.some((pattern) => pattern.test(raw));
    if (!fareIntent || !transitContext) return null;
    const copy = COPY[locale];
    const quickSources = locale === 'ko' ? ['omioFees', 'alsaChannels', 'renfeTerms'] : ['omioFees', 'alsaChannels', 'renfeTerms'];
    return `<strong>${escapeHtml(copy.title)}</strong><br>${escapeHtml(copy.chatAnswer)}<br><a href="#europe-intercity-fares-guide">${escapeHtml(copy.chatGuide)}</a><br><span>${escapeHtml(copy.chatSources)}</span> ${sourceLinks(quickSources, locale)}`;
  }

  function addChatChips() {
    if (typeof CHATBOT_I18N === 'undefined' || !CHATBOT_I18N) return;
    LANGS.forEach((lang) => {
      const chat = CHATBOT_I18N[lang];
      const copy = COPY[lang];
      if (!chat || !Array.isArray(chat.chips) || !copy) return;
      if (!chat.chips.some((item) => item && item.q === copy.chatQuestion)) {
        chat.chips.push({ text: copy.chatChip, q: copy.chatQuestion });
      }
    });
  }

  addChatChips();
  window.renderEuropeIntercityFaresGuide = renderEuropeIntercityFaresGuide;
  window.buildEuropeFareChatResponse = buildEuropeFareChatResponse;
  window.EUROPE_INTERCITY_FARES = { languages: LANGS.slice(), content: COPY, sources: SOURCES, render: renderEuropeIntercityFaresGuide, respond: buildEuropeFareChatResponse };
})();
