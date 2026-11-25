/* Four-language supplement for the host's Florence handwritten map. */
(function (root) {
  'use strict';

  const LANGS = ['ko', 'en', 'ja', 'zh'];
  const ID = 'florence-host-map-guide';
  const TEXT = {
    ko: {
      tab: '🗺️ 지도 메모', eyebrow: 'HOST MAP · TRANSCRIPTION & CHECKS',
      title: '숙소 호스트 손지도에서 읽힌 피렌체 메모',
      intro: '호스트 손지도에서 식별되는 장소와 표시를 옮긴 보충 가이드입니다. 장소명과 주소는 확인 가능한 범위에서 대조했으며, 손글씨만으로 불분명한 두 이름은 추측하지 않았습니다.',
      notice: '평점·리뷰 수·도보 거리와 일부 영업시간은 지도 해독문에 적힌 값으로, 현재 사실로 확인되지 않았습니다. 이 페이지는 기존 일정을 바꾸거나 예약하지 않습니다.',
      restaurants: '🍽️ 손지도 속 식당·카페·젤라토 후보',
      restaurantIntro: '장소명은 손지도 기록을 따릅니다. 영업·메뉴·예약은 방문 전에 공식 채널에서 확인하세요.',
      existing: '이미 등록된 항목', openExisting: '기존 피렌체 음식 가이드 열기',
      mapNotes: '🧭 지도 기호와 기존 플래너 연결',
      localFood: '🍴 음식 메모', odeon: '📚 Giunti Odeon — 서점 & 영화관',
      unconfirmed: '✍️ 읽을 수 없는 손글씨 (미확인)', alternative: '☔ 11월 26일 비 오는 날 동선 메모 — 선택형 대안',
      sourceDetails: '확인한 출처', openOfficial: '공식 페이지 ↗', openMap: '지도에서 검색 ↗',
      openAttraction: '기존 명소 카드 열기', openTransit: '기존 교통 안내 열기', openFood: '기존 음식 가이드 열기',
      noteLabel: '손지도 해독 메모', officialLabel: '공식 페이지에 게시된 정보', cautionLabel: '확인 필요',
      existingFlag: '중복 추가하지 않음', hostStar: '손지도에 별표 표시',
      chatbotQuestion: '피렌체 손지도 메모', chatbotChip: '🗺️ 피렌체 손지도',
      chatbotTitle: '피렌체 손지도 보충 안내',
      chatbotAnswer: '손지도에서 확인되는 식당 후보, 지도 기호, 음식 메모와 미확인 필기를 네 언어 가이드에 정리했습니다. Zà Zà·두오모·베키오 다리·중앙시장은 기존 항목으로 연결하며, 일정은 변경하지 않았습니다.',
      viewGuide: '지도 메모 열기',
      sources: { official: '공식 웹사이트', social: '업체 공식 소셜 계정', map: '지도 서비스 등록', city: '피렌체 관광청 안내', history: '역사 자료', food: 'Visit Tuscany 음식 안내' },
      venues: [
        { name: 'Osteria Vecchio Cancello', type: '오스테리아 · 식당 후보', address: 'Via Guelfa 138/R, 50129 Firenze', description: '손지도에 숙소 가까운 추천으로 적힌 곳입니다. 이름과 주소는 업체 계정·지도 등록에서 일치합니다. 업체 소셜 계정의 “dal 1635” 표기는 독립 자료로 확인되지 않아 사실로 단정하지 않습니다.', hours: '손지도에는 매일 12:00–14:00, 19:00–22:00로 적혀 있고 Apple Maps에도 같은 시간이 표시됩니다. 업체가 직접 확인한 운영시간은 아니므로 출발 전 확인하세요.', mapQuery: 'Osteria Vecchio Cancello, Via Guelfa 138R, Florence', links: [{type:'social',url:'https://www.instagram.com/osteriavecchiocancello/?hl=en'},{type:'map',url:'https://maps.apple.com/place?place-id=IC9CF7880A89C6236'},{type:'history',url:'https://blog.apicius.it/osteria-vecchio-cancello/'}] },
        { name: 'Trattoria La Gratella', type: '트라토리아 · 식당 후보', address: 'Via Guelfa 81/R, 50129 Firenze', description: '공식 사이트와 연락처 페이지에서 이름과 주소를 확인했습니다. 손지도에 적힌 가족 운영·숯불 그릴 설명은 확인된 공식 정보로 취급하지 않습니다.', hours: '손지도 해독문은 매일 12:00–15:00, 19:00–23:00라고 적었지만, 공식 홈페이지는 “From 12 AM to 3 PM” 및 “From 7 PM to 11 PM”로 표기하고 요일도 쓰지 않습니다. 첫 시간이 모호하므로 시간을 확정 정보로 옮기지 않았습니다.', mapQuery: 'Trattoria La Gratella, Via Guelfa 81R, Florence', links: [{type:'official',url:'https://www.lagratella.eu/'},{type:'official',url:'https://www.lagratella.eu/contacts/'}] },
        { name: 'La Ménagère', type: '레스토랑 · 비스트로 · 부티크', address: 'Via de’ Ginori 8/R, 50123 Firenze', description: '손지도에서 별표가 붙은 곳입니다. 공식 사이트는 레스토랑·비스트로·부티크 공간을 소개합니다. 공식 연혁에는 원래 매장이 1896년에 문을 열었고, 현 공간이 2015년에 다시 문을 열었다고 적혀 있습니다.', hours: '손지도에는 08:00–02:00로 적혀 있으나, 확인한 공식 페이지에서는 해당 영업시간을 확인하지 못했습니다. 방문 전에 직접 확인하세요.', mapQuery: 'La Ménagère, Via de Ginori 8R, Florence', links: [{type:'official',url:'https://www.lamenagere.it/en/'},{type:'history',url:'https://www.lamenagere.it/en/florence/boutique/'},{type:'history',url:'https://shop.lamenagere.it/en'}], hostStar: true },
        { name: 'NAB Firenze', type: '카페 · 바 · 음식점 후보', address: 'Via Ventisette Aprile 28R, Firenze', description: '공식 사이트는 음식·음료 메뉴를 안내하며, 공식 음료 페이지에는 매일 16:00–20:00 아페리티보가 게시되어 있습니다.', hours: '손지도는 요일별로 07:00–22:00, 07:00–24:00, 07:00–23:00로 나누어 적었지만, 현재 공식 연락처 페이지는 매일 07:00–22:00로 게시합니다. 공식 게시시간도 방문 전에 다시 확인하세요.', mapQuery: 'NAB Firenze, Via Ventisette Aprile 28R, Florence', links: [{type:'official',url:'https://www.nabfirenze.com/'},{type:'official',url:'https://www.nabfirenze.com/drink'},{type:'official',url:'https://www.nabfirenze.com/eat'}] },
        { name: 'Ostaria dei Centopoveri', type: '토스카나 음식 · 식당 후보', address: '주소 미확정 — 아래 출처의 표기가 서로 다릅니다.', description: '업체 사이트는 토스카나 음식과 피자를 소개하고, 공식 연혁은 1992년 개업이라고 설명합니다. 손지도 해독문의 Via del Porcellana 41R과 공식 사이트의 Via Palazzuolo 31r 표기가 일치하지 않아 길 안내용 주소를 선택하지 않았습니다.', hours: '손지도에는 매일 12:00–15:00, 19:00–23:00로 적혀 있으나, 확인한 공식 페이지에서는 현재 영업시간을 확인하지 못했습니다. 방문 전 업체에 주소와 영업 여부를 직접 확인하세요.', mapQuery: '', links: [{type:'official',url:'http://www.centopoveri.it/it/'},{type:'history',url:'http://www.centopoveri.it/it/ristorante-firenze-chi-siamo.php'},{type:'social',url:'https://www.instagram.com/ostariadeicentopoveri/?hl=en'}] },
        { name: 'Gelateria La Carraia', type: '젤라테리아 · 젤라토 후보', address: 'Piazza Nazario Sauro 25/r, 50124 Firenze', description: '공식 사이트에서 이름과 주소를 확인했습니다. 공식 연혁에는 1990년에 젤라토를 만들고 판매하기 시작했다고 적혀 있습니다.', hours: '손지도에는 매일 11:00–22:30로 적혀 있습니다. 공식 사이트는 매일 11:00–00:00와 겨울철 11:00–22:00를 게시하지만, 겨울 시간의 적용 기간은 쓰지 않았습니다. 출발 전 확인하세요.', mapQuery: 'Gelateria La Carraia, Piazza Nazario Sauro 25R, Florence', links: [{type:'official',url:'https://www.gelaterialacarraia.it/en/'},{type:'history',url:'https://www.gelaterialacarraia.it/en/florence-ice-cream-history/'},{type:'official',url:'https://www.gelaterialacarraia.it/en/florence-ice-cream-contacts/'}] }
      ],
      zaza: { name:'Trattoria Zà Zà', address:'손지도 주소 메모: Piazza del Mercato Centrale 26/R', hours:'손지도에는 매일 11:00–23:00로 적혀 있습니다. 기존 피렌체 음식 카드의 최신 확인 안내를 우선하세요.', linkText:'기존 식당 카드 보기' },
      mapItems: [
        {title:'보라색 테두리 원', text:'호스트가 표시한 피렌체 구시가지·아르노강 남쪽 관광 권역의 대략적인 범위입니다. 공식 행정구역 경계나 확정 도보 동선은 아닙니다.'},
        {title:'보라색 점 — Artemente Florence', text:'Via della Fortezza 6 숙소 표시입니다. 기존 숙소 일정에 이미 있으므로 별도 숙소 카드를 만들지 않았습니다.'},
        {title:'주황색 영역 — Firenze S.M.N.', text:'산타 마리아 노벨라 역과 성당 주변을 가리키는 지도 영역 표시입니다. 역 안내는 기존 피렌체 교통 탭에 연결합니다.', action:'transit'},
        {title:'Mercato Centrale 층 메모', text:'GF는 거리와 같은 층(piano terra)의 전통 식재료 시장, 1st floor는 한 층 위의 실내 푸드홀을 가리키는 표기로 읽힙니다(한국식 층수로는 각각 1층·2층). 기존 시장·음식 안내를 열어 보세요.', action:'food'},
        {title:'Ponte Vecchio', text:'아르노강의 베키오 다리 표시입니다. 기존 피렌체 명소 카드를 다시 만들지 않고 연결합니다.', action:'ponte'},
        {title:'Duomo 및 옛 웹주소', text:'두오모 관련 손글씨 URL은 과거 주소 메모로만 취급합니다. 현재 확인할 공식 방문 안내는 Opera del Duomo 사이트이며, 두오모 명소 카드는 기존 목록에 있습니다.', action:'duomo', url:'https://duomo.firenze.it/en'},
        {title:'Firenze Card', text:'손지도에 적힌 €85·72시간 표기는 공식 페이지와 일치합니다. 공식 사이트는 첫 입장부터 72시간, €85, 60곳 이상의 참여 박물관을 안내합니다. 실제 절약액과 예약·입장 조건은 방문 계획에 따라 달라지므로 구매 전 공식 안내를 다시 확인하세요.', url:'https://www.firenzecard.it/en'}
      ],
      foods: [
        {name:'Bistecca alla Fiorentina', text:'피렌체식 티본스테이크. 기존 피렌체 음식 목록에 있으므로 새로 중복 등록하지 않았습니다.', action:'dining'},
        {name:'Crostini Toscani / crostini neri', text:'토스카나식 구운 빵 전채. Visit Tuscany의 crostini neri 설명에는 닭간·채소·케이퍼 등을 넣은 스프레드가 나오며, 조리법은 달라질 수 있습니다.', url:'https://www.visittuscany.com/en/recipes/crostini-neri/'},
        {name:'Lampredotto', text:'소의 제4위(omasum/abomasum으로 불리는 위의 일부)를 국물에 익혀 빵에 넣는 피렌체식 샌드위치. 기존 음식 가이드에 있어 중복 등록하지 않았습니다.', action:'food', url:'https://www.visittuscany.com/en/flavors/tripe-lamprodotto/'},
        {name:'Trippa alla Fiorentina', text:'소 위의 다른 부위를 토마토와 조리하는 별도 요리입니다. Lampredotto와 같은 음식이 아니므로, 손글씨의 등호 표기는 바로잡았습니다.', url:'https://www.visittuscany.com/en/flavors/tripe-lamprodotto/'}
      ],
      odeonDetails: { address:'공식 주소: Via degli Anselmi 3-5-7, Piazza Strozzi 모퉁이, Firenze. 피렌체 관광청은 같은 장소를 Piazza degli Strozzi 2로 표기합니다.', text:'공식 사이트는 Giunti Odeon을 서점과 영화관으로 소개하며, 극장 역사를 1922년부터라고 설명합니다. 관광청은 영화관이 Palazzo dello Strozzino 안에 조성되었다고 안내합니다.', hours:'관광청 페이지에는 서점 08:30–21:00, 영화관 21:00부터라고 나오지만, 공식 사이트에서는 현재 시간표를 확인하지 못했습니다. 상영·방문 가능 시간은 당일 공식 프로그램에서 확인하세요. 손글씨 해독문의 드라마 촬영·출연자 관련 주장은 열린 공식 출처에서 확인되지 않아 사실로 싣지 않았습니다.', links:[{type:'official',url:'https://www.giuntiodeon.com/'},{type:'official',url:'https://www.giuntiodeon.com/en/cinema'},{type:'city',url:'https://www.feelflorence.it/it/punti-di-interesse/giunti-odeon-libreria-e-cinema'}] },
      unclear: [
        {title:'숙소 점 오른쪽의 초록 필기', text:'읽히는 부분은 “Tratt. …”뿐입니다. 뒷이름은 판독할 수 없어 특정 식당명으로 확정하지 않았습니다.'},
        {title:'NAB 아래 파란 흘림체', text:'읽히는 부분은 “La …”뿐입니다. 뒷이름은 판독할 수 없어 특정 장소로 확정하지 않았습니다.'}
      ],
      rain: '해독문에는 11월 26일 대안으로 오전 아카데미아 또는 중앙시장 → 점심 → 14:00–15:30 Giunti Odeon → 16:00 우피치 방문이 적혀 있습니다. 이 시간표·우피치 할인액·날씨는 확인되지 않았고, 기존 플래너는 우피치 방문을 11월 27일에 두고 있어 이 대안을 일정에 반영하지 않았습니다. 선택 전 기존 일정을 직접 확인하세요.'
    },
    en: {
      tab: '🗺️ Map notes', eyebrow: 'HOST MAP · TRANSCRIPTION & CHECKS',
      title: 'Florence notes decoded from the host’s handwritten map',
      intro: 'This supplement transcribes the places and symbols that can be identified on the host’s map. Names and addresses were checked where possible; two unclear handwritten names remain unguessed.',
      notice: 'Ratings, review counts, walking distances and some hours in the transcription were not verified as current facts. This page does not change the existing itinerary or make bookings.',
      restaurants: '🍽️ Restaurants, café and gelato candidates from the map',
      restaurantIntro: 'Names follow the handwritten map. Check current operation, menus and booking availability through the venue before visiting.',
      existing: 'Already listed', openExisting: 'Open the existing Florence food guide',
      mapNotes: '🧭 Map symbols linked to the existing planner',
      localFood: '🍴 Food notes', odeon: '📚 Giunti Odeon — bookshop & cinema',
      unconfirmed: '✍️ Unreadable handwriting (unconfirmed)', alternative: '☔ Nov 26 rainy-day route note — optional alternative',
      sourceDetails: 'Sources checked', openOfficial: 'Official page ↗', openMap: 'Search map ↗',
      openAttraction: 'Open existing attraction card', openTransit: 'Open existing transit guide', openFood: 'Open existing food guide',
      noteLabel: 'Handwritten-map note', officialLabel: 'Information posted by the official venue', cautionLabel: 'Check before visiting',
      existingFlag: 'Not added twice', hostStar: 'Starred on the host map',
      chatbotQuestion: 'Florence handwritten map notes', chatbotChip: '🗺️ Florence map notes',
      chatbotTitle: 'Florence handwritten-map guide',
      chatbotAnswer: 'The four-language guide covers the map’s restaurant candidates, symbols, food notes and unreadable writing. Zà Zà, the Duomo, Ponte Vecchio and Mercato Centrale link to existing entries; the itinerary was not changed.',
      viewGuide: 'Open map notes',
      sources: { official: 'Official website', social: 'Venue’s official social account', map: 'Map listing', city: 'Florence tourism authority', history: 'History source', food: 'Visit Tuscany food guide' },
      venues: [
        { name: 'Osteria Vecchio Cancello', type: 'Osteria · restaurant candidate', address: 'Via Guelfa 138/R, 50129 Firenze', description: 'Marked on the map as a nearby recommendation. The venue name and address match its social account and a map listing. Its account says “dal 1635,” but that founding date was not established by the independent history source opened, so it is not presented as verified.', hours: 'The transcription says daily 12:00–14:00 and 19:00–22:00; Apple Maps shows the same times. This is not direct confirmation from the venue, so check before setting out.', mapQuery: 'Osteria Vecchio Cancello, Via Guelfa 138R, Florence', links: [{type:'social',url:'https://www.instagram.com/osteriavecchiocancello/?hl=en'},{type:'map',url:'https://maps.apple.com/place?place-id=IC9CF7880A89C6236'},{type:'history',url:'https://blog.apicius.it/osteria-vecchio-cancello/'}] },
        { name: 'Trattoria La Gratella', type: 'Trattoria · restaurant candidate', address: 'Via Guelfa 81/R, 50129 Firenze', description: 'The official site and contact page confirm the name and address. The map’s family-run and charcoal-grill description is not treated as verified official information.', hours: 'The transcription says daily 12:00–15:00 and 19:00–23:00, but the official homepage prints “From 12 AM to 3 PM” and “From 7 PM to 11 PM,” without days. The first period is ambiguous, so no reliable schedule is asserted.', mapQuery: 'Trattoria La Gratella, Via Guelfa 81R, Florence', links: [{type:'official',url:'https://www.lagratella.eu/'},{type:'official',url:'https://www.lagratella.eu/contacts/'}] },
        { name: 'La Ménagère', type: 'Restaurant · bistro · boutique', address: 'Via de’ Ginori 8/R, 50123 Firenze', description: 'Starred on the host’s map. The official site describes a restaurant, bistro and boutique. Its official history says the original shop opened in 1896 and the venue reopened in the original premises in 2015.', hours: 'The map transcription says 08:00–02:00, but the official pages checked did not confirm those hours. Check directly before visiting.', mapQuery: 'La Ménagère, Via de Ginori 8R, Florence', links: [{type:'official',url:'https://www.lamenagere.it/en/'},{type:'history',url:'https://www.lamenagere.it/en/florence/boutique/'},{type:'history',url:'https://shop.lamenagere.it/en'}], hostStar: true },
        { name: 'NAB Firenze', type: 'Café · bar · dining candidate', address: 'Via Ventisette Aprile 28R, Firenze', description: 'The official site lists food and drink; its drinks page posts daily aperitivo from 16:00 to 20:00.', hours: 'The map transcribes different weekday/weekend hours (07:00–22:00, 07:00–24:00 or 07:00–23:00). The current official contact page instead posts 07:00–22:00 daily. Recheck the venue’s own page before visiting.', mapQuery: 'NAB Firenze, Via Ventisette Aprile 28R, Florence', links: [{type:'official',url:'https://www.nabfirenze.com/'},{type:'official',url:'https://www.nabfirenze.com/drink'},{type:'official',url:'https://www.nabfirenze.com/eat'}] },
        { name: 'Ostaria dei Centopoveri', type: 'Tuscan food · restaurant candidate', address: 'Address unresolved — the sources below differ.', description: 'The venue’s website describes Tuscan cuisine and pizza; its official history says it opened in 1992. The map transcription gives Via del Porcellana 41R, while indexed text on the official site gives Via Palazzuolo 31r. No navigation address has been selected.', hours: 'The transcription says daily 12:00–15:00 and 19:00–23:00; the official pages checked did not confirm current hours. Contact the venue to confirm both location and service before going.', mapQuery: '', links: [{type:'official',url:'http://www.centopoveri.it/it/'},{type:'history',url:'http://www.centopoveri.it/it/ristorante-firenze-chi-siamo.php'},{type:'social',url:'https://www.instagram.com/ostariadeicentopoveri/?hl=en'}] },
        { name: 'Gelateria La Carraia', type: 'Gelateria · gelato candidate', address: 'Piazza Nazario Sauro 25/r, 50124 Firenze', description: 'The official site confirms the name and address. Its history page says it began making and selling gelato in 1990.', hours: 'The map says daily 11:00–22:30. The official site posts 11:00–00:00 daily and a winter schedule of 11:00–22:00, but does not specify when the winter schedule applies. Check before going.', mapQuery: 'Gelateria La Carraia, Piazza Nazario Sauro 25R, Florence', links: [{type:'official',url:'https://www.gelaterialacarraia.it/en/'},{type:'history',url:'https://www.gelaterialacarraia.it/en/florence-ice-cream-history/'},{type:'official',url:'https://www.gelaterialacarraia.it/en/florence-ice-cream-contacts/'}] }
      ],
      zaza: { name:'Trattoria Zà Zà', address:'Map note: Piazza del Mercato Centrale 26/R', hours:'The map says daily 11:00–23:00. Use the existing Florence restaurant card for its current-check caveat.', linkText:'Open existing restaurant card' },
      mapItems: [
        {title:'Large purple outline', text:'An approximate walking-area mark for the host’s central Florence/Oltrarno suggestions, not an official district boundary or a confirmed route.'},
        {title:'Purple dot — Artemente Florence', text:'The lodging marker at Via della Fortezza 6. It is already in the stay plan, so no duplicate accommodation card was added.'},
        {title:'Orange area — Firenze S.M.N.', text:'A map-area marker for Santa Maria Novella station and basilica. The existing Florence transit tab is linked here.', action:'transit'},
        {title:'Mercato Centrale floor note', text:'GF appears to mean the street-level (piano terra) traditional market; “1st floor” is the indoor food hall one level above (Korean floor numbering: 1F and 2F). Open the existing market/food guide.', action:'food'},
        {title:'Ponte Vecchio', text:'The blue circle marks the bridge over the Arno. Its existing Florence attraction card is linked rather than duplicated.', action:'ponte'},
        {title:'Duomo and legacy web address', text:'The handwritten URL is treated as an old address note. The current official visitor information is on Opera del Duomo; the attraction is already listed.', action:'duomo', url:'https://duomo.firenze.it/en'},
        {title:'Firenze Card', text:'The handwritten €85/72-hour note matches the official page. It lists €85 and 72 hours from first entry, with 60+ participating museums. Savings and reservation/admission rules depend on your actual visits; recheck the official terms before buying.', url:'https://www.firenzecard.it/en'}
      ],
      foods: [
        {name:'Bistecca alla Fiorentina', text:'Florentine T-bone steak. Already present in the Florence food list; not duplicated.', action:'dining'},
        {name:'Crostini Toscani / crostini neri', text:'Tuscan toasted-bread antipasto. Visit Tuscany’s crostini neri description uses a chicken-liver spread with vegetables and capers; recipes can vary.', url:'https://www.visittuscany.com/en/recipes/crostini-neri/'},
        {name:'Lampredotto', text:'A Florentine sandwich with cow’s fourth stomach (abomasum/omasum) cooked in broth. It is already in the food guide and is not duplicated.', action:'food', url:'https://www.visittuscany.com/en/flavors/tripe-lamprodotto/'},
        {name:'Trippa alla Fiorentina', text:'A separate dish made with another part of the cow’s stomach, traditionally cooked with tomatoes. It is not the same dish as lampredotto; the handwritten equals sign has been corrected.', url:'https://www.visittuscany.com/en/flavors/tripe-lamprodotto/'}
      ],
      odeonDetails: { address:'Official address: Via degli Anselmi 3-5-7, at Piazza Strozzi. The Florence tourism authority lists the same venue at Piazza degli Strozzi 2.', text:'The official site identifies Giunti Odeon as a bookshop and cinema and says its cinema-theatre history dates to 1922. The tourism authority says the cinema was created inside Palazzo dello Strozzino.', hours:'The tourism listing reports bookstore hours of 08:30–21:00 and cinema from 21:00, but the official site did not confirm these as current. Check the day’s official programme before visiting. The transcription’s drama/cast claims were not confirmed by the official sources opened and are not presented as fact.', links:[{type:'official',url:'https://www.giuntiodeon.com/'},{type:'official',url:'https://www.giuntiodeon.com/en/cinema'},{type:'city',url:'https://www.feelflorence.it/it/punti-di-interesse/giunti-odeon-libreria-e-cinema'}] },
      unclear: [
        {title:'Green writing to the right of the lodging marker', text:'Only “Tratt. …” can be read. The rest is unclear, so no restaurant name is assigned.'},
        {title:'Blue cursive below NAB', text:'Only “La …” can be read. The rest is unclear, so no place is assigned.'}
      ],
      rain: 'The transcription proposes an optional Nov 26 idea: Accademia or Mercato Centrale in the morning → lunch → Giunti Odeon 14:00–15:30 → Uffizi at 16:00. These times, the quoted Uffizi discount and the weather were not verified. The existing planner places the Uffizi visit on Nov 27, so this alternative was not applied; check the existing plan before choosing it.'
    },
    ja: {
      tab: '🗺️ 地図メモ', eyebrow: 'HOST MAP · TRANSCRIPTION & CHECKS',
      title: '宿の手書き地図から読み取ったフィレンツェのメモ',
      intro: '宿の手書き地図で判読できる場所と記号を整理した補足ガイドです。確認できる範囲で名称・住所を照合し、読めない2つの店名は推測していません。',
      notice: '地図の解読文にある評価・口コミ数・徒歩距離・一部の営業時間は、現在の事実として確認できていません。このページは既存の日程を変更せず、予約もしません。',
      restaurants: '🍽️ 地図にあるレストラン・カフェ・ジェラート候補',
      restaurantIntro: '名称は手書き地図の記載に沿っています。営業状況・メニュー・予約可否は訪問前に店舗の公式情報でご確認ください。',
      existing: 'すでに掲載済み', openExisting: '既存のフィレンツェ食ガイドを開く',
      mapNotes: '🧭 地図記号と既存プランナーのリンク',
      localFood: '🍴 料理メモ', odeon: '📚 Giunti Odeon — 書店＆映画館',
      unconfirmed: '✍️ 読み取れない手書き（未確認）', alternative: '☔ 11月26日の雨天ルートメモ — 任意の代案',
      sourceDetails: '確認した情報源', openOfficial: '公式ページ ↗', openMap: '地図で検索 ↗',
      openAttraction: '既存の名所カードを開く', openTransit: '既存の交通案内を開く', openFood: '既存の食ガイドを開く',
      noteLabel: '手書き地図のメモ', officialLabel: '公式施設が掲載する情報', cautionLabel: '訪問前に確認',
      existingFlag: '重複登録なし', hostStar: '地図で星印あり',
      chatbotQuestion: 'フィレンツェの手書き地図メモ', chatbotChip: '🗺️ フィレンツェ地図メモ',
      chatbotTitle: 'フィレンツェ手書き地図ガイド',
      chatbotAnswer: '地図の飲食店候補・記号・料理メモと未判読の文字を4言語ガイドにまとめました。Zà Zà、ドゥオーモ、ヴェッキオ橋、中央市場は既存項目にリンクし、日程は変更していません。',
      viewGuide: '地図メモを開く',
      sources: { official: '公式ウェブサイト', social: '店舗の公式SNS', map: '地図サービスの掲載', city: 'フィレンツェ観光局', history: '歴史資料', food: 'Visit Tuscanyの料理案内' },
      venues: [
        { name: 'Osteria Vecchio Cancello', type: 'オステリア・レストラン候補', address: 'Via Guelfa 138/R, 50129 Firenze', description: '地図では宿の近くのおすすめとして記載されています。店舗名と住所は公式SNSと地図掲載で一致します。公式SNSの「dal 1635」という創業年は、確認した独立した歴史資料では裏付けられなかったため、確定情報としていません。', hours: '解読文には毎日12:00–14:00、19:00–22:00とあります。Apple Mapsも同じ時間を掲載していますが、店舗から直接確認した営業時間ではないため、出発前にご確認ください。', mapQuery: 'Osteria Vecchio Cancello, Via Guelfa 138R, Florence', links: [{type:'social',url:'https://www.instagram.com/osteriavecchiocancello/?hl=en'},{type:'map',url:'https://maps.apple.com/place?place-id=IC9CF7880A89C6236'},{type:'history',url:'https://blog.apicius.it/osteria-vecchio-cancello/'}] },
        { name: 'Trattoria La Gratella', type: 'トラットリア・レストラン候補', address: 'Via Guelfa 81/R, 50129 Firenze', description: '公式サイトと連絡先ページで名称と住所を確認しました。地図の家族経営・炭火グリルという説明は、確認済みの公式情報として扱っていません。', hours: '解読文は毎日12:00–15:00、19:00–23:00としていますが、公式トップページは「From 12 AM to 3 PM」「From 7 PM to 11 PM」と曜日なしで掲載。最初の時間表記が曖昧なため、確定営業時間として載せていません。', mapQuery: 'Trattoria La Gratella, Via Guelfa 81R, Florence', links: [{type:'official',url:'https://www.lagratella.eu/'},{type:'official',url:'https://www.lagratella.eu/contacts/'}] },
        { name: 'La Ménagère', type: 'レストラン・ビストロ・ブティック', address: 'Via de’ Ginori 8/R, 50123 Firenze', description: '宿の地図では星印が付いています。公式サイトはレストラン、ビストロ、ブティックを紹介。公式の沿革では、元の店舗が1896年に開業し、同じ場所で2015年に再び開業したと説明しています。', hours: '解読文は08:00–02:00と記載していますが、確認した公式ページではその営業時間を確認できませんでした。訪問前に直接ご確認ください。', mapQuery: 'La Ménagère, Via de Ginori 8R, Florence', links: [{type:'official',url:'https://www.lamenagere.it/en/'},{type:'history',url:'https://www.lamenagere.it/en/florence/boutique/'},{type:'history',url:'https://shop.lamenagere.it/en'}], hostStar: true },
        { name: 'NAB Firenze', type: 'カフェ・バー・飲食店候補', address: 'Via Ventisette Aprile 28R, Firenze', description: '公式サイトは食事・ドリンクを掲載し、公式ドリンクページは毎日16:00–20:00のアペリティーボを案内しています。', hours: '地図の解読文は曜日別に07:00–22:00、07:00–24:00、07:00–23:00としています。一方、現在の公式連絡先ページは毎日07:00–22:00と掲載。公式掲載時間も訪問前に再確認してください。', mapQuery: 'NAB Firenze, Via Ventisette Aprile 28R, Florence', links: [{type:'official',url:'https://www.nabfirenze.com/'},{type:'official',url:'https://www.nabfirenze.com/drink'},{type:'official',url:'https://www.nabfirenze.com/eat'}] },
        { name: 'Ostaria dei Centopoveri', type: 'トスカーナ料理・レストラン候補', address: '住所未確定 — 下記情報源の表記が異なります。', description: '店舗サイトはトスカーナ料理とピザを紹介し、公式沿革は1992年開業としています。地図の解読文はVia del Porcellana 41R、公式サイトの検索表示はVia Palazzuolo 31rと記載するため、ナビ用の住所は選んでいません。', hours: '解読文は毎日12:00–15:00、19:00–23:00としていますが、確認した公式ページで現在の営業時間は確認できませんでした。訪問前に店舗へ所在地と営業状況を確認してください。', mapQuery: '', links: [{type:'official',url:'http://www.centopoveri.it/it/'},{type:'history',url:'http://www.centopoveri.it/it/ristorante-firenze-chi-siamo.php'},{type:'social',url:'https://www.instagram.com/ostariadeicentopoveri/?hl=en'}] },
        { name: 'Gelateria La Carraia', type: 'ジェラテリア・ジェラート候補', address: 'Piazza Nazario Sauro 25/r, 50124 Firenze', description: '公式サイトで名称と住所を確認。公式沿革では1990年にジェラートの製造・販売を始めたとしています。', hours: '地図は毎日11:00–22:30と記載。公式サイトは毎日11:00–00:00、冬季11:00–22:00としていますが、冬季時間の適用期間は記載なし。訪問前にご確認ください。', mapQuery: 'Gelateria La Carraia, Piazza Nazario Sauro 25R, Florence', links: [{type:'official',url:'https://www.gelaterialacarraia.it/en/'},{type:'history',url:'https://www.gelaterialacarraia.it/en/florence-ice-cream-history/'},{type:'official',url:'https://www.gelaterialacarraia.it/en/florence-ice-cream-contacts/'}] }
      ],
      zaza: { name:'Trattoria Zà Zà', address:'地図の住所メモ：Piazza del Mercato Centrale 26/R', hours:'地図では毎日11:00–23:00と記載。最新確認の注意書きがある既存のフィレンツェ店舗カードをご覧ください。', linkText:'既存の店舗カードを開く' },
      mapItems: [
        {title:'大きな紫色の輪郭', text:'宿の方が示したフィレンツェ中心部・オルトラルノ周辺の散策範囲の目安です。公式の地区境界や確定ルートではありません。'},
        {title:'紫色の点 — Artemente Florence', text:'Via della Fortezza 6の宿泊先表示です。宿の予定に既にあるため、重複カードは追加していません。'},
        {title:'オレンジ色の範囲 — Firenze S.M.N.', text:'サンタ・マリア・ノヴェッラ駅と教会周辺を示す地図上の範囲です。既存のフィレンツェ交通タブにつなぎます。', action:'transit'},
        {title:'Mercato Centraleの階数メモ', text:'GFは地上階（piano terra）の伝統的な食材市場、「1st floor」はその上の屋内フードホールと読めます（日本式では1階・2階）。既存の市場・食ガイドをご覧ください。', action:'food'},
        {title:'Ponte Vecchio', text:'アルノ川のヴェッキオ橋を示す青い丸です。重複を避け、既存の名所カードにリンクします。', action:'ponte'},
        {title:'ドゥオーモと旧ウェブアドレス', text:'手書きURLは古いアドレスのメモとして扱います。現在の公式訪問案内はOpera del Duomoのサイトにあり、名所カードも既存一覧にあります。', action:'duomo', url:'https://duomo.firenze.it/en'},
        {title:'Firenze Card', text:'手書きの€85・72時間という記載は公式案内と一致。公式サイトは初回入場から72時間、€85、60以上の参加施設を案内しています。実際の節約額や予約・入場条件は訪問先によって異なるため、購入前に公式情報をご確認ください。', url:'https://www.firenzecard.it/en'}
      ],
      foods: [
        {name:'Bistecca alla Fiorentina', text:'フィレンツェ風Tボーンステーキ。既存のフィレンツェ料理一覧にあるため重複登録していません。', action:'dining'},
        {name:'Crostini Toscani / crostini neri', text:'トスカーナ風のパン前菜。Visit Tuscanyのcrostini neriは鶏レバー、野菜、ケーパーなどのペーストを紹介しています。レシピには違いがあります。', url:'https://www.visittuscany.com/en/recipes/crostini-neri/'},
        {name:'Lampredotto', text:'牛の第四胃（abomasum/omasum）を煮込みパンに挟むフィレンツェのサンドイッチ。既存の食ガイドにあるため重複登録していません。', action:'food', url:'https://www.visittuscany.com/en/flavors/tripe-lamprodotto/'},
        {name:'Trippa alla Fiorentina', text:'牛の別の胃の部位を伝統的にトマトで煮る料理です。Lampredottoとは別料理のため、手書きの等号は修正しました。', url:'https://www.visittuscany.com/en/flavors/tripe-lamprodotto/'}
      ],
      odeonDetails: { address:'公式住所：Via degli Anselmi 3-5-7、Piazza Strozzi角。フィレンツェ観光局は同じ施設をPiazza degli Strozzi 2と表記しています。', text:'公式サイトはGiunti Odeonを書店・映画館として紹介し、劇場の歴史を1922年からと説明しています。観光局はPalazzo dello Strozzino内に映画館が造られたと案内しています。', hours:'観光局の掲載では書店08:30–21:00、映画館は21:00からですが、公式サイトでは現在の営業時間を確認できませんでした。当日の上映・訪問時間は公式プログラムでご確認ください。解読文のドラマ・出演者に関する主張は、確認した公式情報では裏付けられず、事実として掲載していません。', links:[{type:'official',url:'https://www.giuntiodeon.com/'},{type:'official',url:'https://www.giuntiodeon.com/en/cinema'},{type:'city',url:'https://www.feelflorence.it/it/punti-di-interesse/giunti-odeon-libreria-e-cinema'}] },
      unclear: [
        {title:'宿の印の右側にある緑色の文字', text:'判読できるのは「Tratt. …」までです。後半は読めないため、店名を特定していません。'},
        {title:'NABの下にある青い筆記体', text:'判読できるのは「La …」までです。後半は読めないため、場所を特定していません。'}
      ],
      rain: '解読文には11月26日の任意案として、午前アカデミアまたは中央市場 → 昼食 → 14:00–15:30 Giunti Odeon → 16:00 ウフィツィという案があります。時刻・ウフィツィの割引額・天気は未確認です。既存プランナーではウフィツィは11月27日なので、この案は反映していません。選ぶ前に既存日程をご確認ください。'
    },
    zh: {
      tab: '🗺️ 手绘地图备注', eyebrow: 'HOST MAP · TRANSCRIPTION & CHECKS',
      title: '从住宿方手绘地图中辨读的佛罗伦萨备注',
      intro: '本补充指南整理了住宿方手绘地图上可以辨认的地点和符号。能核对的名称与地址已作比对；两处模糊手写名称不作猜测。',
      notice: '解读稿中的评分、评论数、步行距离及部分营业时间未核实为当前事实。本页不会更改现有行程，也不会进行预订。',
      restaurants: '🍽️ 地图上的餐厅、咖啡馆与冰淇淋店候选',
      restaurantIntro: '名称按手绘地图记录。到访前请通过商家官方渠道核实营业、菜单和预订情况。',
      existing: '已在指南中', openExisting: '打开现有佛罗伦萨美食指南',
      mapNotes: '🧭 地图符号与现有行程规划链接',
      localFood: '🍴 食物备注', odeon: '📚 Giunti Odeon — 书店与电影院',
      unconfirmed: '✍️ 无法辨认的手写内容（未确认）', alternative: '☔ 11月26日雨天路线备注 — 可选备选方案',
      sourceDetails: '已核对的来源', openOfficial: '官方网站 ↗', openMap: '在地图中搜索 ↗',
      openAttraction: '打开现有景点卡片', openTransit: '打开现有交通指南', openFood: '打开现有美食指南',
      noteLabel: '手绘地图备注', officialLabel: '官方场所发布的信息', cautionLabel: '到访前请核实',
      existingFlag: '不重复添加', hostStar: '住宿方在地图上标星',
      chatbotQuestion: '佛罗伦萨手绘地图备注', chatbotChip: '🗺️ 佛罗伦萨地图',
      chatbotTitle: '佛罗伦萨手绘地图指南',
      chatbotAnswer: '四语指南整理了地图中的餐饮候选、符号、食物备注和无法辨认的字迹。Zà Zà、大教堂、老桥和中央市场链接到现有内容，行程没有更改。',
      viewGuide: '打开地图备注',
      sources: { official: '官方网站', social: '商家官方社交账号', map: '地图服务列表', city: '佛罗伦萨旅游局', history: '历史资料', food: 'Visit Tuscany 美食指南' },
      venues: [
        { name: 'Osteria Vecchio Cancello', type: 'Osteria · 餐厅候选', address: 'Via Guelfa 138/R, 50129 Firenze', description: '地图将其标作住宿附近的推荐。商家社交账号与地图列表中的名称和地址一致。商家账号自称“dal 1635”，但我们打开的独立历史资料无法证实其创立年份，因此不作为已核实事实。', hours: '解读稿写着每日12:00–14:00、19:00–22:00；Apple Maps也显示相同时间。但这不是商家直接确认的营业时间，出发前请再核实。', mapQuery: 'Osteria Vecchio Cancello, Via Guelfa 138R, Florence', links: [{type:'social',url:'https://www.instagram.com/osteriavecchiocancello/?hl=en'},{type:'map',url:'https://maps.apple.com/place?place-id=IC9CF7880A89C6236'},{type:'history',url:'https://blog.apicius.it/osteria-vecchio-cancello/'}] },
        { name: 'Trattoria La Gratella', type: 'Trattoria · 餐厅候选', address: 'Via Guelfa 81/R, 50129 Firenze', description: '商家官网和联系页面确认了名称及地址。地图中“家庭经营、炭火烤肉”的描述未作为已核实的官方信息。', hours: '解读稿写着每日12:00–15:00、19:00–23:00，但官网首页写作“From 12 AM to 3 PM”和“From 7 PM to 11 PM”，且未注明星期。第一段时间含义不清，因此未将营业时间作为可靠信息。', mapQuery: 'Trattoria La Gratella, Via Guelfa 81R, Florence', links: [{type:'official',url:'https://www.lagratella.eu/'},{type:'official',url:'https://www.lagratella.eu/contacts/'}] },
        { name: 'La Ménagère', type: '餐厅 · 小酒馆 · 精品店', address: 'Via de’ Ginori 8/R, 50123 Firenze', description: '住宿方在地图上标了星号。官网介绍其餐厅、小酒馆和精品店空间。官方历史资料称原店于1896年开业，现址于2015年重新开业。', hours: '解读稿记载08:00–02:00，但核对的官网页面没有确认该时间。到访前请直接核实。', mapQuery: 'La Ménagère, Via de Ginori 8R, Florence', links: [{type:'official',url:'https://www.lamenagere.it/en/'},{type:'history',url:'https://www.lamenagere.it/en/florence/boutique/'},{type:'history',url:'https://shop.lamenagere.it/en'}], hostStar: true },
        { name: 'NAB Firenze', type: '咖啡馆 · 酒吧 · 餐饮候选', address: 'Via Ventisette Aprile 28R, Firenze', description: '官网列出餐食与饮品；官方饮品页面标注每日16:00–20:00供应aperitivo。', hours: '地图解读稿按星期分别记为07:00–22:00、07:00–24:00或07:00–23:00。当前官网联系页面则列出每日07:00–22:00。到访前请重新核对商家官网。', mapQuery: 'NAB Firenze, Via Ventisette Aprile 28R, Florence', links: [{type:'official',url:'https://www.nabfirenze.com/'},{type:'official',url:'https://www.nabfirenze.com/drink'},{type:'official',url:'https://www.nabfirenze.com/eat'}] },
        { name: 'Ostaria dei Centopoveri', type: '托斯卡纳料理 · 餐厅候选', address: '地址未能确定 — 下方来源的写法不一致。', description: '商家网站介绍托斯卡纳菜和披萨；官方历史页面称其于1992年开业。地图解读稿写Via del Porcellana 41R，官网索引文字则写Via Palazzuolo 31r，因此没有选择任何一个导航地址。', hours: '解读稿写着每日12:00–15:00、19:00–23:00，但核对的官网页面未确认当前营业时间。到访前请联系商家确认地址与营业情况。', mapQuery: '', links: [{type:'official',url:'http://www.centopoveri.it/it/'},{type:'history',url:'http://www.centopoveri.it/it/ristorante-firenze-chi-siamo.php'},{type:'social',url:'https://www.instagram.com/ostariadeicentopoveri/?hl=en'}] },
        { name: 'Gelateria La Carraia', type: 'Gelateria · 冰淇淋候选', address: 'Piazza Nazario Sauro 25/r, 50124 Firenze', description: '官网确认了名称与地址。官方历史页面称其于1990年开始制作和销售意式冰淇淋。', hours: '地图记载每日11:00–22:30。官网公布每日11:00–00:00，冬季时段为11:00–22:00，但没有注明冬季时段的具体日期。出发前请核实。', mapQuery: 'Gelateria La Carraia, Piazza Nazario Sauro 25R, Florence', links: [{type:'official',url:'https://www.gelaterialacarraia.it/en/'},{type:'history',url:'https://www.gelaterialacarraia.it/en/florence-ice-cream-history/'},{type:'official',url:'https://www.gelaterialacarraia.it/en/florence-ice-cream-contacts/'}] }
      ],
      zaza: { name:'Trattoria Zà Zà', address:'地图地址备注：Piazza del Mercato Centrale 26/R', hours:'地图写着每日11:00–23:00。最新信息请以现有佛罗伦萨餐厅卡片的核实提示为准。', linkText:'打开现有餐厅卡片' },
      mapItems: [
        {title:'紫色大圈', text:'住宿方标示的佛罗伦萨中心与奥尔特拉诺步行范围参考，并非官方城区边界或已确认路线。'},
        {title:'紫色点 — Artemente Florence', text:'Via della Fortezza 6的住宿标记。住宿已在行程中，不再创建重复卡片。'},
        {title:'橙色区域 — Firenze S.M.N.', text:'地图上标记圣母百花圣殿火车站及教堂周边区域；链接到现有佛罗伦萨交通标签。', action:'transit'},
        {title:'Mercato Centrale楼层备注', text:'GF似乎指与街道同层的传统食材市场（piano terra）；“1st floor”指楼上一层的室内美食大厅（中文楼层为1层与2层）。可查看现有市场与美食指南。', action:'food'},
        {title:'Ponte Vecchio', text:'蓝圈标注阿诺河上的老桥。链接到现有景点卡，不重复添加。', action:'ponte'},
        {title:'大教堂与旧网址', text:'手写网址仅作为旧地址备注。当前官方参观信息见Opera del Duomo；大教堂已在现有景点列表中。', action:'duomo', url:'https://duomo.firenze.it/en'},
        {title:'Firenze Card', text:'手写的€85、72小时信息与官方网站一致。官网列出€85、首次入场起72小时有效，并覆盖60多家参与场馆。实际节省金额、预约和入场规则取决于行程，购买前请查看官网条款。', url:'https://www.firenzecard.it/en'}
      ],
      foods: [
        {name:'Bistecca alla Fiorentina', text:'佛罗伦萨T骨牛排。已列入现有佛罗伦萨美食清单，不重复添加。', action:'dining'},
        {name:'Crostini Toscani / crostini neri', text:'托斯卡纳烤面包前菜。Visit Tuscany的crostini neri说明采用鸡肝、蔬菜和刺山柑等制成抹酱；做法可能有差异。', url:'https://www.visittuscany.com/en/recipes/crostini-neri/'},
        {name:'Lampredotto', text:'佛罗伦萨三明治，使用炖煮的牛第四胃（abomasum/omasum）。现有美食指南已列出，不重复添加。', action:'food', url:'https://www.visittuscany.com/en/flavors/tripe-lamprodotto/'},
        {name:'Trippa alla Fiorentina', text:'传统上用牛胃的另一部分加番茄烹制，是与Lampredotto不同的菜肴。已纠正手写稿中的等号说法。', url:'https://www.visittuscany.com/en/flavors/tripe-lamprodotto/'}
      ],
      odeonDetails: { address:'官网地址：Via degli Anselmi 3-5-7，Piazza Strozzi街角。佛罗伦萨旅游局将同一场所标为Piazza degli Strozzi 2。', text:'官网将Giunti Odeon介绍为书店与电影院，并称影院剧场历史始于1922年。旅游局称影院建于Palazzo dello Strozzino内部。', hours:'旅游局页面列出书店08:30–21:00、电影院21:00开始，但官网没有确认这些是否为当前时间。请查看当天官方节目。解读稿提到的电视剧和演员说法未从已打开的官方来源中得到证实，因此没有作为事实发布。', links:[{type:'official',url:'https://www.giuntiodeon.com/'},{type:'official',url:'https://www.giuntiodeon.com/en/cinema'},{type:'city',url:'https://www.feelflorence.it/it/punti-di-interesse/giunti-odeon-libreria-e-cinema'}] },
      unclear: [
        {title:'住宿标记右侧的绿色手写字', text:'只能辨认出“Tratt. …”，后面的名称无法读清，因此没有确定餐厅名。'},
        {title:'NAB下方的蓝色连笔字', text:'只能辨认出“La …”，后面的名称无法读清，因此没有确定地点。'}
      ],
      rain: '解读稿提出的11月26日可选想法：上午去学院美术馆或中央市场 → 午餐 → 14:00–15:30 Giunti Odeon → 16:00去乌菲兹。时间、乌菲兹所称折扣和天气都未核实。现有行程把乌菲兹安排在11月27日，因此没有采用此备选方案；选择前请先核对原行程。'
    }
  };

  function esc(value) {
    return String(value == null ? '' : value).replace(/[&<>"']/g, ch => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' })[ch]);
  }
  function langOf(value) {
    return LANGS.includes(value) ? value : 'ko';
  }
  function sourceLinks(items, ui) {
    if (!items || !items.length) return '';
    return `<details class="fhmg-sources"><summary>${esc(ui.sourceDetails)}</summary><ul>${items.map(item => `<li><a href="${esc(item.url)}" target="_blank" rel="noopener noreferrer">${esc(ui.sources[item.type] || ui.sources.official)} ↗</a></li>`).join('')}</ul></details>`;
  }
  function internalAction(action, ui) {
    if (!action) return '';
    const fn = action === 'transit' ? 'openFlorenceHostMapTransit()' :
      action === 'food' ? 'openFlorenceHostMapFood()' :
      action === 'dining' ? 'openFlorenceHostMapDining()' :
      action === 'duomo' ? 'openFlorenceHostMapSpot(\'spot-duomo-complex\')' :
      action === 'ponte' ? 'openFlorenceHostMapSpot(\'spot-ponte-vecchio\')' : '';
    if (!fn) return '';
    const label = ['transit'].includes(action) ? ui.openTransit :
      ['food','dining'].includes(action) ? ui.openFood : ui.openAttraction;
    return `<button type="button" class="fhmg-inline-action" onclick="${fn}">${esc(label)} ↗</button>`;
  }
  function render(lang) {
    const l = langOf(lang);
    const t = TEXT[l];
    const venueCards = t.venues.map(venue => {
      const mapUrl = venue.mapQuery ? `https://maps.google.com/?q=${encodeURIComponent(venue.mapQuery)}` : '';
      return `<article class="fhmg-card"><div class="fhmg-card-top"><span class="fhmg-type">${esc(venue.type)}</span>${venue.hostStar ? `<span class="fhmg-star">★ ${esc(t.hostStar)}</span>` : ''}</div><h5>${esc(venue.name)}</h5><p class="fhmg-address">📍 ${esc(venue.address)}</p><p>${esc(venue.description)}</p><p class="fhmg-hours"><strong>${esc(t.cautionLabel)}:</strong> ${esc(venue.hours)}</p><div class="fhmg-links">${mapUrl ? `<a href="${esc(mapUrl)}" target="_blank" rel="noopener noreferrer">${esc(t.openMap)}</a>` : ''}${sourceLinks(venue.links, t)}</div></article>`;
    }).join('');
    const mapCards = t.mapItems.map(item => `<article class="fhmg-note-card"><h5>${esc(item.title)}</h5><p>${esc(item.text)}</p>${item.action ? internalAction(item.action, t) : ''}${item.url ? `<a class="fhmg-inline-action fhmg-link-button" href="${esc(item.url)}" target="_blank" rel="noopener noreferrer">${esc(t.openOfficial)}</a>` : ''}</article>`).join('');
    const foodCards = t.foods.map(item => `<article class="fhmg-note-card"><h5>${esc(item.name)}</h5><p>${esc(item.text)}</p>${item.action ? internalAction(item.action, t) : ''}${item.url ? `<a class="fhmg-inline-action fhmg-link-button" href="${esc(item.url)}" target="_blank" rel="noopener noreferrer">${esc(t.openOfficial)}</a>` : ''}</article>`).join('');
    const unclearCards = t.unclear.map(item => `<article class="fhmg-note-card fhmg-unreadable"><h5>${esc(item.title)}</h5><p>${esc(item.text)}</p></article>`).join('');
    return `<section class="florence-host-map-guide" id="${ID}" lang="${l}" aria-labelledby="fhmg-title"><header class="fhmg-header"><span class="fhmg-eyebrow">${esc(t.eyebrow)}</span><h3 id="fhmg-title">${esc(t.title)}</h3><p>${esc(t.intro)}</p><div class="fhmg-notice">${esc(t.notice)}</div></header><section class="fhmg-section"><h4>${esc(t.restaurants)}</h4><p class="fhmg-section-intro">${esc(t.restaurantIntro)}</p><div class="fhmg-grid">${venueCards}<article class="fhmg-card fhmg-existing"><div class="fhmg-card-top"><span class="fhmg-type">${esc(t.existing)}</span><span class="fhmg-star">${esc(t.existingFlag)}</span></div><h5>${esc(t.zaza.name)}</h5><p class="fhmg-address">📍 ${esc(t.zaza.address)}</p><p>${esc(t.zaza.hours)}</p><button type="button" class="fhmg-inline-action" onclick="openFlorenceHostMapFood()">${esc(t.zaza.linkText)} ↗</button></article></div></section><section class="fhmg-section"><h4>${esc(t.mapNotes)}</h4><div class="fhmg-grid">${mapCards}</div></section><section class="fhmg-section"><h4>${esc(t.localFood)}</h4><div class="fhmg-grid">${foodCards}</div></section><section class="fhmg-section"><h4>${esc(t.odeon)}</h4><article class="fhmg-note-card fhmg-card-wide"><p class="fhmg-address">📍 ${esc(t.odeonDetails.address)}</p><p>${esc(t.odeonDetails.text)}</p><p class="fhmg-hours"><strong>${esc(t.cautionLabel)}:</strong> ${esc(t.odeonDetails.hours)}</p>${sourceLinks(t.odeonDetails.links, t)}</article></section><section class="fhmg-section"><h4>${esc(t.unconfirmed)}</h4><div class="fhmg-grid">${unclearCards}</div></section><section class="fhmg-section"><h4>${esc(t.alternative)}</h4><div class="fhmg-notice fhmg-alternative">${esc(t.rain)}</div></section></section>`;
  }

  function currentLang() {
    const active = String(root.currentLang || (root.document && root.document.documentElement.lang) || 'ko').toLowerCase();
    return langOf(active);
  }
  function openGuide() {
    if (typeof root.selectItalyCity === 'function') root.selectItalyCity('florence');
    if (typeof root.selectItalySubTab === 'function') root.selectItalySubTab('map-notes');
    root.setTimeout(() => {
      const target = root.document && root.document.getElementById(ID);
      if (target) target.scrollIntoView({ behavior:'smooth', block:'start' });
    }, 120);
  }
  function openSpot(id) {
    if (typeof root.selectItalyCity === 'function') root.selectItalyCity('florence');
    if (typeof root.selectItalySubTab === 'function') root.selectItalySubTab('attractions');
    root.setTimeout(() => {
      const target = root.document && root.document.getElementById(id);
      if (target) target.scrollIntoView({ behavior:'smooth', block:'start' });
    }, 120);
  }
  function openTransit() {
    if (typeof root.selectItalyCity === 'function') root.selectItalyCity('florence');
    if (typeof root.selectItalySubTab === 'function') root.selectItalySubTab('transit');
  }
  function openDining() {
    if (typeof root.selectItalyCity === 'function') root.selectItalyCity('florence');
    if (typeof root.selectItalySubTab === 'function') root.selectItalySubTab('dining');
  }
  function openFood() {
    root.currentItalyFoodGuideCity = 'florence';
    if (typeof root.renderItalyLocalFoodGuide === 'function') root.renderItalyLocalFoodGuide(currentLang());
    root.setTimeout(() => {
      const target = root.document && root.document.getElementById('italy-local-food-guide');
      if (target) target.scrollIntoView({ behavior:'smooth', block:'start' });
    }, 80);
  }
  root.openFlorenceHostMapGuide = openGuide;
  root.openFlorenceHostMapSpot = openSpot;
  root.openFlorenceHostMapTransit = openTransit;
  root.openFlorenceHostMapDining = openDining;
  root.openFlorenceHostMapFood = openFood;

  function isRelevant(query) {
    const q = String(query || '').toLocaleLowerCase();
    const mapIntent = /handwritten map|host map|map notes|map transcription|decoded map|host recommendation|손지도|숙소 호스트|지도 메모|지도 해독|손글씨 지도|手書き地図|地図メモ|手绘地图|地图备注|手写地图|地图解读/.test(q);
    const placeOrTopic = /florence|firenze|피렌체|フィレンツェ|佛罗伦萨|vecchio cancello|la gratella|menag[eè]re|nab firenze|centopoveri|la carraia|zà\s*zà|za\s*za|giunti odeon|giunti|mercato centrale|ponte vecchio|firenze card|lampredotto|crostini|trippa|두오모|베키오|중앙시장|람프레도토|크로스티니|트리파|피렌체 카드|쥰티 오데온|주니티 오데온|ドゥオーモ|ヴェッキオ橋|中央市場|ランプレドット|トリッパ|乌菲兹|老桥|中央市场|兰普雷多托|牛肚|菲レンツェ卡/.test(q);
    return mapIntent || placeOrTopic;
  }
  function answer(query) {
    if (!isRelevant(query)) return null;
    const detected = typeof root.getEffectiveLang === 'function' ? root.getEffectiveLang(query) : currentLang();
    const t = TEXT[langOf(detected)];
    return `<div class="fhmg-chat-answer"><strong>🗺️ ${esc(t.chatbotTitle)}</strong><p>${esc(t.chatbotAnswer)}</p><button type="button" class="chat-quick-chip" onclick="openFlorenceHostMapGuide()">${esc(t.viewGuide)} ↗</button></div>`;
  }

  function registerTabLabel() {
    const dictionaries = typeof I18N_DICTIONARY !== 'undefined' ? I18N_DICTIONARY : root.I18N_DICTIONARY;
    if (dictionaries) LANGS.forEach(lang => { if (dictionaries[lang]) dictionaries[lang].subtab_florence_map = TEXT[lang].tab; });
  }
  function mountTabState() {
    const button = root.document && root.document.querySelector('#italySubTabBar [data-subtab="map-notes"]');
    if (button) {
      button.hidden = (root.currentItalyCity || 'rome') !== 'florence';
      const span = button.querySelector('[data-i18n="subtab_florence_map"]');
      if (span) span.textContent = TEXT[currentLang()].tab;
    }
  }
  function init() {
    registerTabLabel();
    mountTabState();
    const doc = root.document;
    if (doc && root.MutationObserver) {
      const languageObserver = new root.MutationObserver(() => mountTabState());
      languageObserver.observe(doc.documentElement, { attributes:true, attributeFilter:['lang'] });
    }
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
      if (!dictionary || !Array.isArray(dictionary.chips) || dictionary.chips.some(chip => String(chip.q || '') === TEXT[lang].chatbotQuestion)) return;
      dictionary.chips.push({ q:TEXT[lang].chatbotQuestion, text:TEXT[lang].chatbotChip });
    });
    if (typeof root.updateChatbotLanguage === 'function') root.updateChatbotLanguage(currentLang());
  }
  root.FLORENCE_HOST_MAP_GUIDE = { render, answer, isRelevant, openGuide, copy:TEXT };
  if (root.document && root.document.readyState === 'loading') root.document.addEventListener('DOMContentLoaded', init, { once:true });
  else init();
})(window);
