/* Optional activity ideas. No booking, itinerary mutation, external AI call or live inventory claim. */
(function () {
  'use strict';

  const locales = ['ko', 'en', 'ja', 'zh'];
  const sources = {
    aireBarcelona: { name: 'AIRE Barcelona', url: 'https://beaire.com/en/aire-ancient-baths-barcelona' },
    aireSeville: { name: 'AIRE Sevilla', url: 'https://beaire.com/en/aire-ancient-baths-sevilla' },
    aireWineBarcelona: { name: 'AIRE Barcelona · Signature Wine Experience', url: 'https://beaire.com/en/aire-ancient-baths-barcelona/experiences/the-signature-wine-experience-for-two' },
    aireWineSeville: { name: 'AIRE Sevilla · Signature Wine Experience', url: 'https://beaire.com/en/aire-ancient-baths-sevilla/experiences/the-signature-wine-experience-2' },
    aireTermsBarcelona: { name: 'AIRE Barcelona · Terms', url: 'https://beaire.com/en/terms-barcelona' },
    aireTermsSeville: { name: 'AIRE Sevilla · Terms', url: 'https://beaire.com/en/terms-sevilla' },
    hammamTourism: { name: 'Málaga Turismo · Hammam', url: 'https://visita.malaga.eu/en/plan/tourist-information/health-wellness/wellness-resources/hammam-al-andalus-p103681' },
    hammamMenu: { name: 'Hammam Al Ándalus Málaga', url: 'https://malaga.hammamalandalus.com/en/service-menu-massages-malaga/' },
    hammamFaq: { name: 'Hammam Al Ándalus · FAQ', url: 'https://hammamalandalus.com/faqs/?lang=en' },
    codorniu: { name: 'Codorníu', url: 'https://www.codorniu.com/en/visits' },
    codorniuIconic: { name: 'Codorníu · Iconic Tour', url: 'https://www.codorniu.com/en/visits/iconic-tour' },
    r4: { name: 'Rodalies · R4', url: 'https://rodalies.gencat.cat/en/sobre-rodalies/linies-i-estacions/servei_rodalia_barcelona/r4/index.html' },
    seville: { name: 'Sevilla Turismo · 2026', url: 'https://visitasevilla.es/en/wp-content/uploads/sites/2/2026/08/Sevilla_Ruta_Familia_ENG.pdf' },
    cruise: { name: 'Cruceros Torre del Oro', url: 'https://crucerosensevilla.com/entradas/paseo-en-barco-por-sevilla/' },
    pizzo: { name: 'Sorrento Lemon Farm · Pizzo', url: 'https://www.sorrentolemonfarm.com/lemon-tours-pizzo-en.php' },
    amalfi: { name: 'Amalfi Lemon Experience · Classic', url: 'https://www.amalfilemonexperience.it/tour/classic-lemon-tour/' },
    amalfiAccess: { name: 'Amalfi Lemon Experience · Meeting point', url: 'https://www.amalfilemonexperience.it/meeting-point/' },
    chianti: { name: 'Italy & Wine · Chianti', url: 'https://www.italyandwine.net/half-day-chianti-vineyard-tour' },
    cooking: { name: 'Mama Florence · Pizza & Gelato', url: 'https://www.mamaflorence.com/pizza-gelato-cooking-class' },
    rome: { name: 'Rolling Rome · Golf Cart', url: 'https://rollingrome.com/rome-by-golf-cart-tour/' },
    romeWine: { name: 'Rolling Rome · Wine Dinner', url: 'https://rollingrome.com/private-golf-cart-tour-of-rome-with-legendary-wine-tasting/' }
  };
  const cardSources = {
    aire: ['aireBarcelona', 'aireSeville', 'aireWineBarcelona', 'aireWineSeville', 'aireTermsBarcelona', 'aireTermsSeville'],
    hammam: ['hammamTourism', 'hammamMenu', 'hammamFaq'],
    codorniu: ['codorniu', 'codorniuIconic', 'r4'],
    seville: ['seville', 'cruise'],
    lemon: ['pizzo', 'amalfi', 'amalfiAccess'],
    florence: ['chianti', 'cooking'],
    rome: ['rome', 'romeWine']
  };
  const ids = Object.keys(cardSources);

  const content = {
    ko: {
      pageTitle: '6. 활동·스파 아이디어', aiPageTitle: '7. 실시간 AI 검색',
      kicker: '스페인·이탈리아 / 색다른 휴식과 체험',
      title: '부모님과 함께 고르는 활동·스파 아이디어', badge: '7가지 후보 · 예약 아님',
      intro: '온욕, 와이너리, 강 유람선, 레몬 농장, 쿠킹 클래스, 골프카트까지. 원문 아이디어 중 공식 출처로 확인한 내용만 추려 담았습니다. 이동과 실제 보행 부담을 함께 보고 한 번에 한 가지씩 골라 보세요.',
      statusTitle: '확정 일정과 활동 후보는 별개입니다',
      status: '아래 체험은 모두 제안이며 예약·결제·일정 확정이 아닙니다. 선택 날짜의 운영·잔여석·요금은 확인되지 않았습니다. 기존 예약이나 일정은 이 가이드로 변경되지 않습니다.',
      anchorsTitle: '그대로 유지하는 확정 기준',
      anchors: '바르셀로나 2026.11.05–11.11 · 세비야 11.11–11.22 · 나폴리 숙소 11.22 체크인–11.25 체크아웃 · 이탈리아 12.04까지. 사그라다 파밀리아 입장은 11.10 15:30입니다.',
      commonTitle: '예약 전에 함께 확인할 것',
      common: ['가격·운영일·언어·집결지·취소 조건은 선택 상품의 공식 예약 화면에서 다시 확인하세요. 여기에는 고정 가격이나 날짜별 운항을 보장하지 않습니다.', '부모님 동행이라고 모두 평지·무장애인 것은 아닙니다. 계단·승하차·미끄러운 바닥·보조기구·휴식 좌석을 운영사에 구체적으로 문의하세요. 치료 효과나 무릎 보호를 보장하지 않습니다.', '까바·와인·리몬첼로·프로세코는 주류입니다. 마시지 않아도 되는지, 성인용 무알코올 대체 음료와 시음이 가능한지 별도로 확인하세요.'],
      spaTitle: '온욕·스파', toursTitle: '도시와 근교 체험', careLabel: '부모님 동행 체크', whenLabel: '조건부 날짜 아이디어', sourcesLabel: '공식 안내·이용 조건',
      chatChip: '활동·스파 아이디어', chatQuery: '스페인 이탈리아 활동·스파 아이디어 알려줘', chatButton: '챗봇에 물어보기', chatTitle: '활동·스파 후보 안내', openGuide: '활동 가이드 열기',
      cards: {
        aire: { city: '바르셀로나 / 세비야', title: 'AIRE Ancient Baths · 온욕과 Wine Experience', summary: '도심에서 고르는 성인 전용 온욕 체험. 두 지점의 상품과 이용 조건을 구분해 확인하세요.', facts: ['바르셀로나는 Passeig de Picasso 22, 세비야는 C. Aire 15에 있습니다. 온탕·냉탕·스팀·소금탕 등의 온욕 회로와 마사지 조합은 상품별로 다릅니다.', '공식 “Signature Wine Experience”에는 Wine Bath가 있지만, 욕조를 레드와인으로 가득 채운다고 단정할 근거는 없습니다. 와인 한 잔 등을 곁들이는 상품입니다.', '무알코올을 원하면 주스 선택이 명시된 다른 온욕 상품을 살피거나 Wine Experience의 대체 음료 가능 여부를 문의하세요.'], care: '만 18세 이상. 역사 건물의 접근 동선과 보조기구 이용 제한이 있으니 두 지점 중 방문할 곳에 필요한 도움을 미리 문의하세요.', when: '바르셀로나 11/5–11 또는 세비야 11/11–22의 여유 시간 후보. 세비야 11/18–21은 사용자 제안일일 뿐 예약일이 아닙니다.' },
        hammam: { city: '말라가 · 방문 여부 미확정', title: 'Hammam Al Ándalus Málaga · 물의 여정', summary: '아랍식 목욕 공간에서 온도가 다른 욕탕과 선택형 마사지·리추얼을 살펴보는 실내 후보입니다.', facts: ['말라가 공식 관광 안내의 주소는 Plaza de los Mártires 5이며, 온도가 다른 다섯 욕탕을 소개합니다. 마사지나 온열 돌침대 리추얼은 선택 상품에 따라 다릅니다.', '운영사는 휴식 공간의 차와 물, 수영복 착용·맨발 이용, 수건과 사물함 제공을 안내합니다. “민트티 무제한”은 보장하지 않습니다.'], care: '맨발로 이용하는 시설입니다. 필요한 계단 없는 동선과 보조기구 이용 가능 여부는 예약 전에 직접 확인하세요. 숙소에서 도보 3분이라는 동선은 확인되지 않았습니다.', when: '11/16 또는 11/17 저녁은 말라가 방문·왕복 이동을 실제로 정할 때만 검토할 아이디어입니다. 말라가 숙박이나 체험 예약이 확정된 것은 아닙니다.' },
        codorniu: { city: '바르셀로나 근교 · Sant Sadurní d’Anoia', title: 'Codorníu · 모더니즘 셀러와 까바', summary: '와이너리의 건축·지하 셀러와 스파클링 와인 문화를 만나는 후보입니다.', facts: ['공식 Iconic Tour는 까바 3종과 초콜릿 3종의 조합을 소개합니다. 까바 시음은 알코올이 포함된 체험입니다.', '확인한 공식 상품 설명만으로 지하 꼬마기차 탑승 포함 여부는 확정할 수 없습니다. 열차·시음 구성·소요시간은 예약할 상품에서 확인하세요.', 'R4는 바르셀로나와 Sant Sadurní d’Anoia를 잇는 대중교통 노선이지 와이너리 픽업이 아닙니다. 당일 철도 운행과 역에서 와이너리까지의 이동을 별도로 확인하세요.'], care: '셀러 보행·계단·좌석 및 성인용 무알코올 시음 가능 여부를 문의하세요. 기차를 탄다는 이유로 걷지 않는 투어라고 판단하지 마세요.', when: '바르셀로나 11/5–11/11 중 여유가 있을 때의 근교 후보입니다. 이동 시간을 포함해 검토하고 11/10 15:30 사그라다 파밀리아 입장은 그대로 유지합니다.' },
        seville: { city: '세비야', title: '전통 마차 또는 과달키비르강 유람선', summary: '기존 스페인 광장 마차 아이디어는 이 안내에서 함께 검토하세요. 마차와 강 유람선은 서로 다른 선택지입니다.', facts: ['시 공식 2026 가족 가이드는 스페인 광장·마리아 루이사 공원을 지나는 마차 추천 경로와 마리아 루이사 공원·Puerta Jerez 등의 연중 승차 지점을 안내합니다. 현행 요금과 승차 지점은 다시 확인하세요.', 'Cruceros Torre del Oro는 황금의 탑 선착장에서 출발하는 약 1시간 강 유람선과 10–4월 시간표를 안내합니다. 특정 2026년 11월 출항이나 “선셋 크루즈”를 확정한 것은 아닙니다.', '스페인 광장 운하의 노 젓는 배는 과달키비르강 유람선과 별개입니다.'], care: '마차의 발판·승하차, 선착장까지의 이동과 배 탑승을 확인하세요. 휠체어 이용 선박·구역은 운영사에 사전 문의해야 합니다. “다리 힘 0”이나 전체 평지를 보장하지 않습니다.', when: '세비야 11/11–22 체류 중 여유 시간 후보. 11/18–21의 구체적인 체험·시간은 모두 제안이며 미예약입니다.' },
        lemon: { city: '소렌토·아말피 근교 · 나폴리 출발 이동 별도', title: '레몬 농장 산책과 레모네이드·리몬첼로', summary: '농장별 지형·집결지·시음 구성이 크게 다른 근교 체험입니다. 늦가을 운영부터 문의하세요.', facts: ['Sorrento Lemon Farm의 Pizzo 상품은 Sant’Agnello 농장의 가이드 산책과 마멀레이드·레모네이드·리몬첼로 시음을 소개합니다. 리몬첼로는 주류이고 레모네이드는 무알코올입니다.', 'Amalfi Lemon Experience의 Classic은 계단식 레몬밭 산책과 레몬 케이크·레모네이드·리몬첼로 체험입니다. 공용 투어는 농장 집결이며 오르막 접근이 필요하고 차량이 농장까지 직접 갈 수 없습니다.', '아말피의 전동카트 이동은 별도 프라이빗 상품의 안내입니다. 모든 레몬 투어에 픽업·카트·레몬 수확이 포함되는 것은 아닙니다.'], care: '아말피 운영사는 이동에 어려움이 있는 손님에게 Classic 코스를 권하지 않습니다. 부모님의 보행 조건, 나폴리에서의 왕복 교통, 무알코올 시음 선택을 확인하세요.', when: '나폴리 숙소 11/22 체크인–11/25 체크아웃은 유지합니다. 이 기간 근교 방문은 실제 늦은 11월 운영과 이동 여유가 확인될 때만 검토하며 예약된 활동이 아닙니다.' },
        florence: { city: '피렌체 · 체류일 미확정', title: '키안티 반일 와이너리 또는 피자·젤라또 수업', summary: '근교 와인 투어와 도심 쿠킹 클래스는 따로 선택하는 활동입니다. 하나의 패키지로 묶지 않습니다.', facts: ['Italy & Wine의 반일 예시는 09:30–14:30 미니밴 이동, 키안티 클라시코 와이너리 두 곳, 와인·올리브오일 시음과 점심을 안내합니다. 지정 집결지 출발이며 호텔 픽업이 아닙니다.', 'Mama Florence는 직접 피자와 젤라또를 만드는 수업을 안내하며 조리 중 서서 참여합니다. 식사와 와인·맥주·프로세코 등의 구성은 선택 상품에서 확인하세요.', '와이너리까지 “30–40분이면 충분”하거나 모든 상품에 특정 치즈·살라미·트러플이 나온다고 가정하지 않습니다.'], care: '집결지 이동, 셀러 보행, 수업 중 서 있는 시간과 의자 사용, 알레르기 및 성인용 무알코올 대체 음료를 운영사에 문의하세요.', when: '11/28 피렌체는 사용자 제안일일 뿐 체류·투어가 확정된 날짜가 아닙니다. 피렌체 방문을 정한 뒤 실제 운영과 동선을 확인하세요.' },
        rome: { city: '로마 · 체류일 미확정', title: '골프카트로 보는 로마 시내', summary: '장소 사이를 카트로 이동하고 정차 후 일부 구간을 걸어서 살펴보는 시내 관광 후보입니다.', facts: ['Rolling Rome은 맞춤형 프라이빗 시내 투어와 약 2–3시간 형식을 안내합니다. 일반 관광은 정차 후 도보 구간이 있으며, 유료 유적의 입장·내부 가이드가 기본 포함되지는 않습니다.', '트레비 분수·판테온 등은 제안 경로의 예시이지 모든 상품의 보장 정차지나 문 앞 하차 장소가 아닙니다.', '와인·프로세코가 모든 골프카트 투어의 기본 서비스는 아닙니다. 와인 저녁식사 등 별도 상품과 일반 관광을 구분하고 무알코올 선택을 문의하세요.'], care: '“걷기 0분”이나 무릎 보호를 보장하지 않습니다. 승하차, 정차 후 보행, 휴식, 보조기구의 접이·수납 가능 여부를 사전 확인하세요.', when: '12/2 로마는 사용자 제안일이며 로마 체류·투어 예약일이 아닙니다. 이탈리아 12/4까지의 기존 여행 범위 안에서 방문 도시와 시간을 정한 뒤 검토하세요.' }
      }
    },
    en: {
      pageTitle: '6. Activity & spa ideas', aiPageTitle: '7. Live AI search',
      kicker: 'SPAIN & ITALY / REST AND EXPERIENCES', title: 'Activity and spa ideas to choose with your parents', badge: '7 ideas · not booked',
      intro: 'Baths, wineries, a river cruise, lemon farms, cooking and golf carts: these are the source-checked parts of the proposed ideas. Compare transfers and the actual walking involved, and choose one experience at a time.',
      statusTitle: 'Confirmed travel and activity ideas are separate', status: 'Every experience below is a suggestion, not a reservation, payment or confirmed schedule. Operation, spaces and prices on your chosen date are unverified. This guide does not change existing bookings or the itinerary.',
      anchorsTitle: 'Confirmed anchors kept unchanged', anchors: 'Barcelona 5–11 Nov 2026 · Seville 11–22 Nov · Naples lodging: check-in 22 Nov, checkout 25 Nov · Italy through 4 Dec. Sagrada Família entry remains 10 Nov at 15:30.',
      commonTitle: 'Check together before booking', common: ['Recheck the selected product’s dates, price, language, meeting point and cancellation terms on the official booking page. No fixed price or date-specific departure is guaranteed here.', 'A parent-friendly idea is not automatically flat or step-free. Ask about steps, boarding, wet floors, mobility aids and resting seats. No therapeutic effect or knee-protection guarantee is made.', 'Cava, wine, limoncello and Prosecco contain alcohol. Check whether tasting can be skipped and whether adult non-alcoholic drinks or tastings are available; substitutes are not assumed.'],
      spaTitle: 'Baths and spas', toursTitle: 'City and countryside experiences', careLabel: 'Check for your parents', whenLabel: 'Conditional date idea', sourcesLabel: 'Official details and terms',
      chatChip: 'Activity & spa ideas', chatQuery: 'Show activity and spa ideas in Spain and Italy', chatButton: 'Ask the chatbot', chatTitle: 'Activity and spa ideas', openGuide: 'Open the activity guide',
      cards: {
        aire: { city: 'Barcelona / Seville', title: 'AIRE Ancient Baths · Baths and Wine Experience', summary: 'An adults-only city bath experience. Compare the products and terms for the two locations separately.', facts: ['Barcelona is at Passeig de Picasso 22; Seville is at C. Aire 15. Thermal circuits with warm/hot/cold, steam and salt baths, and massage combinations, vary by product.', 'A “Signature Wine Experience” with a Wine Bath is officially offered, but the description does not establish that the tub is filled with red wine. The experience includes a glass of wine and other accompaniments.', 'For a non-alcoholic visit, look at other bath products that explicitly offer juice, or ask whether the Wine Experience allows a substitute drink.'], care: 'Minimum age 18. Historic-building access and mobility-aid restrictions apply; contact the chosen location in advance about the assistance you need.', when: 'An option during free time in Barcelona, 5–11 Nov, or Seville, 11–22 Nov. The suggested Seville dates of 18–21 Nov are ideas, not reservations.' },
        hammam: { city: 'Málaga · visit not confirmed', title: 'Hammam Al Ándalus Málaga · Water Journey', summary: 'An indoor option with baths at different temperatures and optional massage or ritual packages in an Arab-bath setting.', facts: ['Málaga’s official tourism listing gives Plaza de los Mártires 5 and describes five baths at different temperatures. Massage and heated-stone rituals depend on the selected product.', 'The operator lists tea and water in the rest area, swimwear and barefoot use, and provided towels and lockers. Unlimited mint tea is not guaranteed.'], care: 'Guests use the facility barefoot. Ask about the step-free route and mobility aids you need before booking. A three-minute walk from your lodging has not been verified.', when: 'An evening on 16 or 17 Nov is only an idea if you actually choose a Málaga visit and arrange the return journey. Neither a Málaga stay nor this experience is confirmed.' },
        codorniu: { city: 'Near Barcelona · Sant Sadurní d’Anoia', title: 'Codorníu · Modernist cellars and cava', summary: 'A winery candidate for architecture, underground cellars and sparkling-wine culture.', facts: ['The official Iconic Tour describes three cavas paired with three chocolates. Cava tasting is an alcohol-inclusive experience.', 'The official descriptions checked do not establish that a cellar-train ride is included. Verify the train, tasting selection and duration in the exact product you book.', 'R4 is public rail connecting Barcelona and Sant Sadurní d’Anoia, not a winery pickup service. Check that day’s rail operation and the station-to-winery transfer separately.'], care: 'Ask about cellar walking, steps, seating and adult non-alcoholic tastings. A train component would not make the whole visit walking-free.', when: 'A countryside option if there is free time during Barcelona, 5–11 Nov. Allow for transfers and keep Sagrada Família entry on 10 Nov at 15:30 unchanged.' },
        seville: { city: 'Seville', title: 'A carriage ride or a Guadalquivir cruise', summary: 'Review the existing Plaza de España carriage idea here. A carriage ride and river cruise are separate choices.', facts: ['The city’s official 2026 family guide lists a recommended carriage route past Plaza de España and María Luisa Park, and year-round stops including María Luisa Park and Puerta Jerez. Recheck the current fare and boarding point.', 'Cruceros Torre del Oro lists a roughly one-hour river cruise from the Torre del Oro landing and an October–April timetable. This does not confirm a particular November 2026 sailing or a sunset departure.', 'The rowing boats in Plaza de España’s canal are not the Guadalquivir river cruise.'], care: 'Check carriage steps and boarding, the route to the landing and boat access. Contact the cruise operator about wheelchair spaces or areas in advance. No zero-effort or entirely flat route is promised.', when: 'An option during the Seville stay, 11–22 Nov. Any activity or time suggested for 18–21 Nov remains unbooked.' },
        lemon: { city: 'Sorrento / Amalfi · transfer from Naples separate', title: 'Lemon groves, lemonade and limoncello', summary: 'The terrain, meeting point and tasting differ by farm. Ask about late-autumn operation first.', facts: ['Sorrento Lemon Farm’s Pizzo product describes a guided walk at the Sant’Agnello estate and marmalade, lemonade and limoncello tastings. Limoncello contains alcohol; lemonade is non-alcoholic.', 'Amalfi Lemon Experience’s Classic includes terraced-grove walking, lemon cake, lemonade and a limoncello experience. Shared tours meet at the farm, require uphill access and cannot be reached directly by vehicle.', 'Electric-cart transport in Amalfi belongs to a separate private product. Pickup, a cart ride or lemon harvesting is not included in every lemon tour.'], care: 'The Amalfi operator does not recommend the Classic for guests with mobility difficulties. Check your parents’ walking needs, the Naples round trip and non-alcoholic tasting choices.', when: 'Keep Naples lodging check-in on 22 Nov and checkout on 25 Nov. Consider a side trip in this window only after late-November operation and transport time are confirmed; no activity is booked.' },
        florence: { city: 'Florence · stay dates not confirmed', title: 'A Chianti half-day or pizza-and-gelato class', summary: 'A countryside wine tour and a city cooking class are separate activities, not one combined package.', facts: ['Italy & Wine’s half-day example runs 09:30–14:30 by minivan, visits two Chianti Classico wineries and includes wine/olive-oil tastings and lunch. It leaves from a designated meeting point, not hotel pickup.', 'Mama Florence describes hands-on pizza and gelato making with standing participation. Check the chosen product for meal and wine, beer or Prosecco inclusions.', 'Do not assume a 30–40-minute transfer is sufficient or that every tour serves specific cheese, salami or truffle products.'], care: 'Ask about reaching the meeting point, cellar walking, standing time and seating in class, allergies and adult non-alcoholic alternatives.', when: 'Florence on 28 Nov is a user-suggested possibility, not a confirmed stay or tour date. Choose the city visit first, then check operation and logistics.' },
        rome: { city: 'Rome · stay dates not confirmed', title: 'A Rome city overview by golf cart', summary: 'A sightseeing option that uses a cart between places, with some exploring on foot at stops.', facts: ['Rolling Rome describes customizable private tours, typically around 2–3 hours. Ordinary sightseeing has walking stops and does not automatically include entry or interior guiding at ticketed monuments.', 'Trevi Fountain and the Pantheon are examples of suggested sights, not guaranteed stops or doorstep drop-offs on every product.', 'Wine or Prosecco is not a standard inclusion on all golf-cart tours. Separate wine-dinner products from ordinary sightseeing and ask about non-alcoholic choices.'], care: 'There is no zero-walking or knee-protection guarantee. Confirm boarding, walking at stops, rest breaks and whether your mobility aid can be folded and carried.', when: 'Rome on 2 Dec is an idea, not a confirmed stay or tour reservation. Decide the city and time within the existing Italy trip through 4 Dec before choosing a product.' }
      }
    },
    ja: {
      pageTitle: '6. 体験・スパの候補', aiPageTitle: '7. リアルタイムAI検索', kicker: 'スペイン・イタリア / 休息と体験', title: 'ご両親と選ぶ体験・スパのアイデア', badge: '7つの候補・未予約',
      intro: '温浴、ワイナリー、川のクルーズ、レモン農園、料理教室、ゴルフカート。提案のうち公式情報で確認できた内容をまとめました。移動と実際の歩行負担を比べ、一度に一つずつ選んでください。',
      statusTitle: '確定旅程と体験候補は別です', status: '以下はすべて提案であり、予約・決済・確定日程ではありません。希望日の営業・空き・料金は未確認です。このガイドによって既存の予約や旅程は変更されません。',
      anchorsTitle: '変更しない確定条件', anchors: 'バルセロナ 2026年11月5〜11日・セビリア 11月11〜22日・ナポリの宿は11月22日チェックイン〜25日チェックアウト・イタリアは12月4日まで。サグラダ・ファミリア入場は11月10日15:30のままです。',
      commonTitle: '予約前に一緒に確認', common: ['選ぶ商品の日程・料金・言語・集合場所・取消条件を公式予約画面で再確認してください。固定料金や特定日の運行は保証していません。', 'ご両親向けの候補でも、全区間が平坦・段差なしとは限りません。階段、乗降、濡れた床、補助具、休憩席を具体的に問い合わせてください。治療効果や膝の保護は保証しません。', 'カヴァ、ワイン、リモンチェッロ、プロセッコはお酒です。試飲を省略できるか、大人向けのノンアルコール飲料・試飲があるかを個別に確認してください。代替品は保証されません。'],
      spaTitle: '温浴・スパ', toursTitle: '街と近郊の体験', careLabel: 'ご両親同伴の確認点', whenLabel: '条件付きの日程案', sourcesLabel: '公式案内・利用条件', chatChip: '体験・スパの候補', chatQuery: 'スペインとイタリアの体験・スパの候補を教えて', chatButton: 'チャットボットに質問', chatTitle: '体験・スパの候補案内', openGuide: '体験ガイドを開く',
      cards: {
        aire: { city: 'バルセロナ / セビリア', title: 'AIRE Ancient Baths・温浴とWine Experience', summary: '街中で選ぶ大人専用の温浴体験です。2店舗の商品・利用条件を分けて確認してください。', facts: ['バルセロナはPasseig de Picasso 22、セビリアはC. Aire 15です。温水・熱水・冷水、スチーム、塩水浴などの回路とマッサージの組合せは商品ごとに異なります。', '公式の「Signature Wine Experience」にはWine Bathがありますが、浴槽が赤ワインで満たされているとは断定できません。ワイン1杯などを含む商品です。', '飲酒を避ける場合はジュースの選択が明記された別の温浴商品を探すか、Wine Experienceの代替飲料を問い合わせてください。'], care: '18歳以上。歴史的建物の動線や補助具には制限があるため、利用店舗へ必要な支援を事前に相談してください。', when: 'バルセロナ11月5〜11日、またはセビリア11月11〜22日の空き時間候補です。セビリア11月18〜21日は提案日であり予約日ではありません。' },
        hammam: { city: 'マラガ・訪問未確定', title: 'Hammam Al Ándalus Málaga・水の旅', summary: 'アラブ式浴場で温度の異なる浴槽と、選択式のマッサージ・リチュアルを検討する屋内候補です。', facts: ['マラガ公式観光案内の住所はPlaza de los Mártires 5で、温度の異なる5つの浴槽を紹介しています。マッサージや温めた石の施術は選ぶ商品によります。', '運営者は休憩場所のお茶・水、水着着用・裸足利用、タオルとロッカーの提供を案内しています。「ミントティー飲み放題」は保証していません。'], care: '裸足で利用する施設です。必要な段差なし動線や補助具の利用可否を予約前に確認してください。宿から徒歩3分という経路は未確認です。', when: '11月16日または17日の夜は、マラガ訪問と往復移動を実際に決める場合だけの案です。マラガ宿泊や体験予約は確定していません。' },
        codorniu: { city: 'バルセロナ近郊・Sant Sadurní d’Anoia', title: 'Codorníu・モデルニスモのセラーとカヴァ', summary: '建築、地下セラー、スパークリングワインの文化を体験するワイナリー候補です。', facts: ['公式Iconic Tourはカヴァ3種とチョコレート3種の組合せを紹介しています。カヴァ試飲はアルコールを含む体験です。', '確認した公式商品説明だけでは地下列車の乗車が含まれると確定できません。列車、試飲内容、所要時間は予約する商品で確認してください。', 'R4はバルセロナとSant Sadurní d’Anoiaを結ぶ公共鉄道で、ワイナリー送迎ではありません。当日の運行と駅からワイナリーへの移動は別途確認してください。'], care: 'セラー内の歩行、階段、座席、大人向けノンアルコール試飲を問い合わせてください。列車があっても全行程が歩行不要になるわけではありません。', when: 'バルセロナ11月5〜11日に余裕がある場合の近郊候補です。移動時間を加味し、11月10日15:30のサグラダ・ファミリア入場は変更しません。' },
        seville: { city: 'セビリア', title: '伝統馬車またはグアダルキビル川クルーズ', summary: '既存のスペイン広場の馬車案はこの案内で一緒に検討してください。馬車と川のクルーズは別の選択肢です。', facts: ['市の2026年公式ファミリーガイドは、スペイン広場・マリア・ルイサ公園を通る馬車の推奨経路と、公園やPuerta Jerezなどの通年乗車場所を案内しています。現行料金と乗り場は再確認してください。', 'Cruceros Torre del Oroは黄金の塔の船着場発、約1時間の川クルーズと10〜4月の時刻表を案内しています。特定の2026年11月便やサンセット便の確定情報ではありません。', 'スペイン広場の運河の手漕ぎボートは、グアダルキビル川クルーズとは別です。'], care: '馬車の踏み台・乗降、船着場への移動と船へのアクセスを確認してください。車椅子対応の船・区画は事前問い合わせが必要です。歩行負担ゼロや全区間平坦は保証しません。', when: 'セビリア11月11〜22日の滞在中の空き時間候補です。11月18〜21日の体験・時刻はいずれも提案で未予約です。' },
        lemon: { city: 'ソレント / アマルフィ・ナポリからの移動は別', title: 'レモン農園、レモネードとリモンチェッロ', summary: '地形、集合場所、試食内容は農園によって大きく異なります。晩秋の営業から問い合わせてください。', facts: ['Sorrento Lemon FarmのPizzo商品は、Sant’Agnelloの農園散策とマーマレード、レモネード、リモンチェッロの試食・試飲を紹介しています。リモンチェッロは酒、レモネードはノンアルコールです。', 'Amalfi Lemon ExperienceのClassicは段々畑の散策、レモンケーキ、レモネード、リモンチェッロ体験です。混載ツアーは農園集合で、上り坂があり車で直接農園まで行けません。', 'アマルフィの電動カート移動は別のプライベート商品の案内です。送迎、カート、レモン収穫が全ツアーに含まれるわけではありません。'], care: 'アマルフィ運営者は移動に困難のある方にClassicを推奨していません。ご両親の歩行条件、ナポリ往復交通、ノンアルコールの選択を確認してください。', when: 'ナポリ宿の11月22日チェックイン〜25日チェックアウトは維持します。この間の近郊訪問は11月下旬の営業と移動の余裕が確認できた場合のみ検討し、予約済み体験ではありません。' },
        florence: { city: 'フィレンツェ・滞在日未確定', title: 'キアンティ半日またはピザ・ジェラート教室', summary: '郊外のワインツアーと市内の料理教室は別の体験で、一つのセットではありません。', facts: ['Italy & Wineの半日例は09:30〜14:30、ミニバンでキアンティ・クラシコのワイナリー2か所を訪れ、ワイン・オリーブオイル試飲と昼食を含みます。指定集合場所発でホテル送迎ではありません。', 'Mama Florenceはピザとジェラートを自分で作る教室を案内し、調理中は立って参加します。食事やワイン・ビール・プロセッコの内容は選ぶ商品で確認してください。', '片道30〜40分で十分、または全商品に特定のチーズ・サラミ・トリュフが出るとは考えないでください。'], care: '集合場所への移動、セラー内歩行、教室の立ち時間と椅子、アレルギー、大人用ノンアルコール代替品を問い合わせてください。', when: '11月28日のフィレンツェは提案日で、滞在・ツアーの確定日ではありません。訪問を決めた後に実際の営業と動線を確認してください。' },
        rome: { city: 'ローマ・滞在日未確定', title: 'ゴルフカートでローマ市内観光', summary: '地点間はカートで移動し、停車後は一部を徒歩で見学する市内観光候補です。', facts: ['Rolling Romeはカスタマイズ可能なプライベート観光と約2〜3時間の形式を案内しています。通常観光には徒歩の立寄りがあり、有料遺跡の入場や内部ガイドが自動的に含まれるわけではありません。', 'トレビの泉やパンテオンは推奨経路の例で、全商品の立寄りや入口前降車を保証するものではありません。', 'ワインやプロセッコは全ゴルフカートツアーの基本サービスではありません。ワイン夕食などの別商品と通常観光を分け、ノンアルコールの選択を問い合わせてください。'], care: '「歩行0分」や膝の保護は保証しません。乗降、停車後の歩行、休憩、補助具を折りたたんで運べるかを確認してください。', when: '12月2日のローマは提案日で、滞在・ツアー予約日ではありません。12月4日までの既存イタリア旅行の範囲で都市と時間を決めてから検討してください。' }
      }
    },
    zh: {
      pageTitle: '6. 活动与水疗备选', aiPageTitle: '7. 实时AI搜索', kicker: '西班牙与意大利 / 休息和体验', title: '与父母一起选择的活动与水疗体验', badge: '7项备选 · 尚未预订',
      intro: '温浴、酒庄、河上游船、柠檬农场、烹饪课和高尔夫球车：这里仅保留原提案中有官方依据的内容。请同时比较交通与实际步行负担，一次选择一项体验。',
      statusTitle: '已确认行程与活动备选是两回事', status: '以下全部是建议，不代表预订、付款或确定日程。所选日期的营业、名额与价格尚未核实。本指南不会更改已有预订或行程。',
      anchorsTitle: '保持不变的已确认安排', anchors: '巴塞罗那：2026年11月5–11日；塞维利亚：11月11–22日；那不勒斯住宿：11月22日入住、25日退房；意大利行程至12月4日。圣家堂入场仍为11月10日15:30。',
      commonTitle: '预订前一起确认', common: ['请在所选产品的官方预订页面重新确认日期、价格、语言、集合地点与取消条款。这里不保证固定价格或特定日期的班次。', '适合与父母讨论的备选不等于全程平坦、无台阶。请具体询问楼梯、上下车船、湿滑地面、助行器和休息座位。不承诺疗效或保护膝盖。', '卡瓦、葡萄酒、柠檬酒与普罗塞克均含酒精。请另行确认能否不试酒，以及是否有成人无酒精饮品或品尝替代方案；不要默认提供替代品。'],
      spaTitle: '温浴与水疗', toursTitle: '城市与近郊体验', careLabel: '与父母同行须知', whenLabel: '有条件的日期建议', sourcesLabel: '官方说明与使用条款', chatChip: '活动与水疗备选', chatQuery: '请介绍西班牙和意大利的活动与水疗备选', chatButton: '向聊天助手提问', chatTitle: '活动与水疗备选指南', openGuide: '打开活动指南',
      cards: {
        aire: { city: '巴塞罗那 / 塞维利亚', title: 'AIRE Ancient Baths · 温浴与Wine Experience', summary: '位于市区、仅限成人的温浴体验。请分别核对两家分店的产品与条款。', facts: ['巴塞罗那地址为Passeig de Picasso 22，塞维利亚为C. Aire 15。温水、热水、冷水、蒸汽和盐水浴等回路与按摩组合因产品而异。', '官方确有含Wine Bath的“Signature Wine Experience”，但说明不足以证明浴缸装满红酒。该体验包含一杯葡萄酒等内容。', '如不饮酒，可查看明确列有果汁选项的其他温浴产品，或询问Wine Experience能否更换饮品。'], care: '须年满18岁。历史建筑的通行与助行器使用存在限制，请提前向所选分店说明所需协助。', when: '可在巴塞罗那11月5–11日或塞维利亚11月11–22日的空闲时段考虑。塞维利亚11月18–21日仅为用户建议日期，并非预约。' },
        hammam: { city: '马拉加 · 尚未确定到访', title: 'Hammam Al Ándalus Málaga · 水之旅', summary: '在阿拉伯浴场环境中体验不同温度的浴池，可另选按摩或护理项目的室内备选。', facts: ['马拉加官方旅游资料列明地址为Plaza de los Mártires 5，并介绍五个不同水温的浴池。按摩和热石床护理依所选产品而定。', '运营方说明休息区有茶与水，须穿泳衣、赤脚使用，并提供毛巾和储物柜。不保证“薄荷茶无限畅饮”。'], care: '这里要求赤脚使用。预订前请确认所需的无台阶路线与助行器使用条件。尚未核实从住宿步行三分钟的说法。', when: '11月16日或17日晚仅是在实际决定马拉加到访与往返交通后可考虑的建议，并非已确认住宿或体验预订。' },
        codorniu: { city: '巴塞罗那近郊 · Sant Sadurní d’Anoia', title: 'Codorníu · 现代主义酒窖与卡瓦', summary: '了解建筑、地下酒窖与起泡酒文化的酒庄备选。', facts: ['官方Iconic Tour介绍三款卡瓦搭配三种巧克力。卡瓦品尝属于含酒精体验。', '已查阅的官方产品说明不足以确认包含地下小火车。请在具体预订产品中核对火车、品尝内容与时长。', 'R4是连接巴塞罗那与Sant Sadurní d’Anoia的公共铁路，不是酒庄接送。请另行确认当天列车运行和车站至酒庄的交通。'], care: '请询问酒窖步行、楼梯、座位与成人无酒精品尝选项。即使有小火车，也不代表全程无需步行。', when: '可在巴塞罗那11月5–11日有空闲时考虑近郊体验。须计入交通时间，保持11月10日15:30圣家堂入场不变。' },
        seville: { city: '塞维利亚', title: '传统马车或瓜达尔基维尔河游船', summary: '原有西班牙广场马车建议统一参考这里。马车与河上游船是两个独立选项。', facts: ['市官方2026家庭指南介绍途经西班牙广场和玛丽亚·路易莎公园的马车推荐路线，以及公园、Puerta Jerez等全年乘车点。请重新确认现行票价与上车地点。', 'Cruceros Torre del Oro介绍从黄金塔码头出发、约一小时的河游船及10月至4月时刻表，但这不代表某个2026年11月班次或日落航次已确认。', '西班牙广场运河上的手划船不是瓜达尔基维尔河游船。'], care: '请核对马车踏板与上下车、到码头的路线及登船条件。轮椅可用船只或区域须提前向运营方确认。不保证“腿部零负担”或全程平地。', when: '可在塞维利亚11月11–22日停留期间的空闲时考虑。11月18–21日的具体活动与时刻全部只是建议，尚未预订。' },
        lemon: { city: '索伦托 / 阿马尔菲 · 那不勒斯交通另计', title: '柠檬农场、柠檬水与柠檬酒', summary: '各农场地形、集合点与品尝内容差异很大，请先询问深秋是否营业。', facts: ['Sorrento Lemon Farm的Pizzo产品介绍Sant’Agnello庄园导览散步，以及果酱、柠檬水和柠檬酒品尝。柠檬酒含酒精，柠檬水不含酒精。', 'Amalfi Lemon Experience的Classic包含梯田式柠檬园步行、柠檬蛋糕、柠檬水和柠檬酒体验。拼团须在农场集合，需上坡，车辆无法直达农场。', '阿马尔菲的电动小车交通安排属于另一种私人产品。并非每个柠檬游都包含接送、电动小车或采摘。'], care: '阿马尔菲运营方不建议行动不便者参加Classic。请确认父母的步行需求、那不勒斯往返交通与无酒精品尝选择。', when: '保持那不勒斯住宿11月22日入住、25日退房不变。期间近郊游仅在核实11月下旬营业和交通时间后考虑，尚无活动预订。' },
        florence: { city: '佛罗伦萨 · 停留日期未确定', title: '基安蒂半日酒庄游或披萨冰淇淋课', summary: '近郊葡萄酒游与市区烹饪课是独立活动，并非同一个套餐。', facts: ['Italy & Wine的半日示例为09:30–14:30小型面包车行程，参观两家经典基安蒂酒庄，含葡萄酒、橄榄油品尝和午餐。须到指定地点集合，不含酒店接送。', 'Mama Florence介绍亲手制作披萨与意式冰淇淋的课程，烹饪时站立参与。餐食以及葡萄酒、啤酒或普罗塞克内容须核对所选产品。', '不要假定单程30–40分钟就足够，也不要认为每个产品都含特定奶酪、萨拉米或松露食品。'], care: '请询问到集合点的交通、酒窖步行、课程站立时长与座椅、过敏需求及成人无酒精替代饮品。', when: '11月28日佛罗伦萨仅是用户建议，并非已确认停留或游览日期。先决定是否到访，再核对营业与路线。' },
        rome: { city: '罗马 · 停留日期未确定', title: '乘高尔夫球车看罗马市区', summary: '在地点之间乘车、停靠后部分步行游览的市区观光备选。', facts: ['Rolling Rome介绍可定制私人观光，通常约2–3小时。普通观光包含下车步行，并不自动包含收费古迹门票或内部讲解。', '特雷维喷泉和万神殿等只是建议路线示例，并非所有产品都保证停靠或在门口下车。', '并非所有高尔夫球车游都默认含葡萄酒或普罗塞克。请区分葡萄酒晚餐等独立产品与普通观光，并询问无酒精选择。'], care: '不承诺“步行零分钟”或保护膝盖。请提前确认上下车、停靠后的步行、休息以及助行器能否折叠携带。', when: '12月2日罗马仅为建议，并非已确认停留或游览预约。请在至12月4日的现有意大利旅程范围内，确定城市与时间后再选择。' }
      }
    }
  };

  function normalizeLang(lang) { return locales.includes(lang) ? lang : 'ko'; }
  function html(value) { return String(value).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])); }
  function sourceLinks(id, lang) {
    const terms = { ko: '이용 조건', en: 'Terms', ja: '利用条件', zh: '使用条款' };
    const meeting = { ko: '집결지', en: 'Meeting point', ja: '集合場所', zh: '集合地点' };
    return cardSources[id].map(key => {
      const name = sources[key].name.replace('Terms', terms[lang] || terms.ko).replace('Meeting point', meeting[lang] || meeting.ko);
      return `<a href="${html(sources[key].url)}" target="_blank" rel="noopener noreferrer">${html(name)} ↗</a>`;
    }).join('');
  }
  function renderCard(id, lang) {
    const c = content[lang], card = c.cards[id];
    return `<article class="activity-card" data-activity-id="${id}"><span class="activity-city">${html(card.city)}</span><h3>${html(card.title)}</h3><p class="activity-summary">${html(card.summary)}</p><ul>${card.facts.map(f => `<li>${html(f)}</li>`).join('')}</ul><div class="activity-care"><strong>${c.careLabel}</strong><p>${html(card.care)}</p></div><div class="activity-date"><strong>${c.whenLabel}</strong><p>${html(card.when)}</p></div><details class="activity-sources"><summary>${c.sourcesLabel}</summary><div>${sourceLinks(id, lang)}</div></details></article>`;
  }
  function renderActivityGuide(lang) {
    const mount = document.getElementById('activity-guide-mount');
    if (!mount) return;
    const l = normalizeLang(lang || window.currentLang || localStorage.getItem('travel_user_lang'));
    const c = content[l];
    mount.innerHTML = `<section class="activity-guide" data-activity-locale="${l}" aria-labelledby="activity-guide-title"><header class="activity-header"><div class="activity-kicker">${c.kicker}</div><span class="activity-badge">${c.badge}</span><h2 id="activity-guide-title">${c.title}</h2><p>${c.intro}</p><button type="button" class="activity-chat-button" onclick="event.stopPropagation();openChatWindow();handleQuickChatChip('${html(c.chatQuery)}')">${c.chatButton}</button></header><aside class="activity-status"><h3>${c.statusTitle}</h3><p>${c.status}</p><strong>${c.anchorsTitle}</strong><p>${c.anchors}</p></aside><h2 class="activity-group-title">${c.spaTitle}</h2><div class="activity-grid">${['aire', 'hammam'].map(id => renderCard(id, l)).join('')}</div><h2 class="activity-group-title">${c.toursTitle}</h2><div class="activity-grid">${['codorniu', 'seville', 'lemon', 'florence', 'rome'].map(id => renderCard(id, l)).join('')}</div><aside class="activity-common"><h3>${c.commonTitle}</h3><ul>${c.common.map(t => `<li>${html(t)}</li>`).join('')}</ul></aside></section>`;
  }

  function normalized(query) { return String(query || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, ''); }
  function includesAny(q, terms) { return terms.some(term => q.includes(normalized(term))); }
  function activityIntent(query) {
    const q = normalized(query);
    const city = {
      barcelona: includesAny(q, ['barcelona', '바르셀로나', 'バルセロナ', '巴塞罗那']),
      seville: includesAny(q, ['seville', 'sevilla', '세비야', 'セビリア', 'セビリャ', '塞维利亚']),
      malaga: includesAny(q, ['malaga', '말라가', 'マラガ', '马拉加']),
      lemon: includesAny(q, ['naples', 'napoli', 'sorrento', 'amalfi', '나폴리', '소렌토', '아말피', 'ナポリ', 'ソレント', 'アマルフィ', '那不勒斯', '索伦托', '阿马尔菲']),
      florence: includesAny(q, ['florence', 'firenze', '피렌체', 'フィレンツェ', '佛罗伦萨']),
      rome: includesAny(q, ['rome', 'roma', '로마', 'ローマ', '罗马'])
    };
    const spa = /\b(?:spa|spas|bath|baths)\b/.test(q) || includesAny(q, ['스파', '온욕', '목욕', '온천', 'スパ', '温浴', 'お風呂', '水疗', '温泉', '浴场']);
    const wineVisit = includesAny(q, ['winery', 'wine tour', 'cava', '와이너리', '와인 투어', '와인투어', '까바', '카바 투어', 'ワイナリー', 'ワインツアー', '酒庄', '葡萄酒游']);
    const matched = [];
    if (includesAny(q, ['aire', '아이레', 'アイレ', '艾尔', 'wine bath', '와인 배스', '와인 스파', '레드와인 스파', 'ワイン風呂', '红酒浴', '葡萄酒浴']) || (spa && (city.barcelona || city.seville))) matched.push('aire');
    if (includesAny(q, ['hammam', '하맘', '함맘', 'ハマム', '哈马姆', '哈曼']) || (spa && city.malaga)) matched.push('hammam');
    if (includesAny(q, ['codorni', '꼬도르', '코도르', 'コドル', '科多', 'cava tour', '까바 투어', '카바 투어', 'カヴァ', '卡瓦', '꼬마기차', 'cellar train', '地下列車', '地下小火车']) || (city.barcelona && wineVisit)) matched.push('codorniu');
    if (includesAny(q, ['carriage', '마차', '馬車', '马车', 'guadalquivir', '과달키비르', 'グアダルキビル', '瓜达尔基维尔']) || (city.seville && includesAny(q, ['cruise', '크루즈', '유람선', 'クルーズ', '游船']))) matched.push('seville');
    if (includesAny(q, ['lemon tour', '레몬 투어', '레몬투어', 'レモンツアー', '柠檬游', '柠檬之旅', 'lemon farm', 'lemon grove', '레몬 농장', '레몬농장', 'レモン農園', 'レモン畑', '柠檬农场', '柠檬园', 'limoncello', '리몬첼로', 'リモンチェッロ', '柠檬酒'])) matched.push('lemon');
    if (includesAny(q, ['chianti', '키안티', 'キアンティ', '基安蒂', 'pizza making', 'gelato making', 'cooking class', '피자 만들', '젤라또 만들', '쿠킹 클래스', '料理教室', 'ピザ作り', 'ジェラート作り', '披萨制作', '冰淇淋制作', '烹饪课']) || (city.florence && wineVisit)) matched.push('florence');
    if (includesAny(q, ['golf cart', 'golf-cart', 'golfcart', '골프카트', '골프 카트', 'ゴルフカート', '高尔夫球车', '高尔夫车']) || (city.rome && includesAny(q, ['prosecco', '프로세코', 'プロセッコ', '普罗塞克', '카트 투어', '카트투어', 'cart tour', 'buggy', 'カート', '电瓶车']))) matched.push('rome');
    const generic = spa || includesAny(q, ['activity', 'activities', '액티비티', '활동', '이색 투어', '체험', 'アクティビティ', '体験', '活动', '体验', 'tour ideas', 'tour recommendations', '투어 추천', '투어추천', 'ツアーのおすすめ']);
    const status = includesAny(q, ['booked', 'booking', 'confirmed', 'reservation', '예약', '확정', '予約', '確定', '预订', '预约', '确认']);
    const candidateStatus = status && ((city.malaga && /11[/.\-]?(16|17)|nov(ember)?\s*(16|17)|11月(16|17)|11월\s*(16|17)/.test(q)) || (city.florence && /11[/.\-]?28|nov(ember)?\s*28|11月28|11월\s*28/.test(q)) || (city.rome && /12[/.\-]?0?2|dec(ember)?\s*2|12月2|12월\s*2/.test(q)));
    if (matched.length) return { ids: matched, overview: false };
    if (!generic && !candidateStatus) return null;
    const selected = [];
    if (city.barcelona) selected.push('aire', 'codorniu');
    if (city.seville) selected.push('aire', 'seville');
    if (city.malaga) selected.push('hammam');
    if (city.lemon) selected.push('lemon');
    if (city.florence) selected.push('florence');
    if (city.rome) selected.push('rome');
    return { ids: selected.length ? [...new Set(selected)] : ids, overview: selected.length === 0 };
  }
  function buildActivityChatResponse(query, lang) {
    const intent = activityIntent(query);
    if (!intent) return null;
    const l = normalizeLang(lang), c = content[l];
    const body = intent.overview
      ? `<ul>${intent.ids.map(id => `<li><strong>${html(c.cards[id].title)}</strong><br>${html(c.cards[id].summary)}</li>`).join('')}</ul><p>${html(c.common[2])}</p>`
      : intent.ids.map(id => { const card = c.cards[id]; return `<section data-activity-id="${id}"><h4>${html(card.title)}</h4><ul>${card.facts.map(t => `<li>${html(t)}</li>`).join('')}</ul><p><strong>${c.careLabel}:</strong> ${html(card.care)}</p><p><strong>${c.whenLabel}:</strong> ${html(card.when)}</p><div class="activity-chat-sources">${sourceLinks(id, l)}</div></section>`; }).join('');
    return `<div class="activity-chat-answer" data-activity-guide-answer="${l}"><strong>${c.chatTitle}</strong><p class="activity-chat-status">${html(c.status)}</p>${body}<p class="activity-chat-anchors">${html(c.anchors)}</p><button type="button" class="chat-quick-chip" onclick="goToActivityGuide()">${c.openGuide}</button></div>`;
  }

  function goToActivityGuide() {
    if (typeof switchGuidebookChapter === 'function') switchGuidebookChapter('chapter-practical');
    if (typeof goToBookPage === 'function') goToBookPage('chapter-practical', 5);
    if (typeof closeChatWindow === 'function') closeChatWindow();
  }

  // Align the related existing landmark note, without changing itinerary or booking data.
  const plazaAccess = {
    ko: '광장 전체가 평지·무장애라고 보장하지 않습니다. 마차는 선택 활동이며 현행 승차 지점·요금·승하차 도움과 11월 방문일 운행을 미리 확인하세요.',
    en: 'Do not assume the whole square is flat or step-free. A carriage ride is optional; recheck the current boarding point, fare, boarding assistance and operation on your November date.',
    ja: '広場全体が平坦・段差なしとは限りません。馬車は任意の体験です。現行の乗り場・料金・乗降の支援・11月訪問日の運行を事前に確認してください。',
    zh: '不要假定广场全程平坦、无台阶。马车是可选活动；请提前核对现行上车地点、票价、上下车协助和11月到访日的运营。'
  };
  if (typeof GLOBAL_LANDMARKS_DATA !== 'undefined') {
    const plaza = GLOBAL_LANDMARKS_DATA.find(item => item.slug === 'plaza-espana');
    if (plaza) plaza.seniorAccess = plazaAccess.ko;
  }
  if (typeof LANDMARK_I18N_DATA !== 'undefined' && LANDMARK_I18N_DATA['세비야 스페인 광장 (Plaza de España)']) {
    LANDMARK_I18N_DATA['세비야 스페인 광장 (Plaza de España)'].seniorAccess = { ...plazaAccess };
  }

  locales.forEach(lang => {
    if (typeof I18N_DICTIONARY !== 'undefined' && I18N_DICTIONARY[lang]) {
      Object.assign(I18N_DICTIONARY[lang], { page_practical_6: content[lang].pageTitle, page_practical_7: content[lang].aiPageTitle });
    }
    if (typeof CHATBOT_I18N !== 'undefined' && CHATBOT_I18N[lang] && CHATBOT_I18N[lang].chips) {
      CHATBOT_I18N[lang].chips.unshift({ text: content[lang].chatChip, q: content[lang].chatQuery });
    }
  });
  window.ACTIVITY_GUIDE = { content, sources, cardSources, ids, activityIntent };
  window.renderActivityGuide = renderActivityGuide;
  window.buildActivityChatResponse = buildActivityChatResponse;
  window.goToActivityGuide = goToActivityGuide;
  document.addEventListener('DOMContentLoaded', () => renderActivityGuide(window.currentLang || localStorage.getItem('travel_user_lang') || 'ko'));
})();
