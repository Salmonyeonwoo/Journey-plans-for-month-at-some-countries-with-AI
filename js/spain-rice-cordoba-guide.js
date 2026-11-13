/* Córdoba rice, San Pablo and Tendillas educational guide.
 * Additive candidate/learning content only: no itinerary, lodging, schedule, or booking edits.
 * Intended to load after js/ronda-granada-dining-guide.js and before js/app.js.
 */
(function () {
  'use strict';
  const LANGS = ['ko', 'en', 'ja', 'zh'];
  const SOURCES = {
    riceSpain: 'https://www.mapa.gob.es/es/agricultura/temas/producciones-agricolas/cultivos-herbaceos/arroz/informacion_general_sector-arroz',
    riceStudy: 'https://www.mdpi.com/2073-4395/11/6/1095',
    valencia: 'https://blog.visitvalencia.com/en/paella-valenciana',
    bomba: 'https://www.foodswinesfromspain.com/en/food/products/legumes---rice/arroz-de-valencia-pdo',
    sanPablo: 'https://www.turismodecordoba.org/church-of-san-pablo',
    sanPabloHeritage: 'https://www.dipucordoba.es/cordobaturismo/iglesia-de-san-pablo-y-templo-romano/',
    fernandinaNews: 'https://diocesisdecordoba.es/noticias/el-cabildo-reabre-la-ruta-de-las-iglesias-fernandinas',
    fernandinaRoute: 'https://fernandinas.mezquita-catedraldecordoba.es/',
    tendillasCity: 'https://www.cordoba.es/servicios/cultura-ocio-y-naturaleza/fiestas/fiestas/navidad/fin-de-ano',
    tendillasNews: 'https://www.canalsur.es/noticias/andalucia/cordoba/reloj-tendillas-cordoba-cumple-60_1_1126676.html'
  };
  const cityLabels = {
    ko: '🇪🇸 코르도바', en: '🇪🇸 Córdoba', ja: '🇪🇸 コルドバ', zh: '🇪🇸 科尔多瓦'
  };
  const links = {
    ko: ['코르도바 관광청: 산 파블로 성당', '코르도바 지방정부: 성당 역사와 건축', '코르도바 교구: 페르난디나 성당 루트 재개 안내', '대성당 참사회 페르난디나 루트 공식 사이트', '코르도바 시청: 텐디야스 시계와 연말 행사', 'Canal Sur: 텐디야스 시계 60주년'],
    en: ['Córdoba tourism: San Pablo Church', 'Córdoba provincial heritage: church history and architecture', 'Diocese: Fernandina churches route reopened', 'Cathedral Chapter: official Fernandina route', 'Córdoba City: Tendillas clock and year-end events', 'Canal Sur: 60 years of the Tendillas clock'],
    ja: ['コルドバ観光局：サン・パブロ教会', 'コルドバ県：教会の歴史と建築', 'コルドバ教区：フェルナンディナ教会ルート再開', '大聖堂参事会：フェルナンディナ公式ルート', 'コルドバ市：テンディージャス時計と年末行事', 'Canal Sur：テンディージャス時計60周年'],
    zh: ['科尔多瓦旅游局：圣巴勃罗教堂', '科尔多瓦省政府：教堂历史与建筑', '科尔多瓦教区：费尔南迪纳教堂路线重开', '主教座堂参事会：费尔南迪纳路线官网', '科尔多瓦市政府：滕西利亚斯钟与年末活动', 'Canal Sur：滕西利亚斯钟60周年']
  };
  const riceSources = {
    ko: ['스페인 농림수산식품부 쌀 산업 자료', '학술 논문: 스페인 쌀 생산·관개 환경', 'Visit Valencia: 발렌시아식 파에야', 'Foods and Wines from Spain: 발렌시아 PDO 쌀'],
    en: ['Spain’s Ministry of Agriculture: rice sector', 'Study: rice production and irrigation in Spain', 'Visit Valencia: Valencian paella', 'Foods and Wines from Spain: Valencia PDO rice'],
    ja: ['スペイン農業省：米産業資料', '研究論文：スペインの稲作・灌漑環境', 'Visit Valencia：バレンシア風パエリア', 'Foods and Wines from Spain：バレンシアPDO米'],
    zh: ['西班牙农业部：稻米产业资料', '研究论文：西班牙稻作与灌溉环境', 'Visit Valencia：瓦伦西亚烩饭', 'Foods and Wines from Spain：瓦伦西亚PDO大米']
  };

  const entries = [
    {
      id: 'pc-cordoba-san-pablo', cityId: 'cordoba', cityName: '코르도바', cityEn: 'Córdoba', mapQuery: 'Real Iglesia de San Pablo Córdoba Spain',
      name: { ko: 'Real Iglesia de San Pablo (산 파블로 왕립 성당)', en: 'Real Iglesia de San Pablo (Royal Church of San Pablo)', ja: 'Real Iglesia de San Pablo（サン・パブロ王立教会）', zh: 'Real Iglesia de San Pablo（圣巴勃罗皇家教堂）' },
      copy: {
        ko: { typeBadge: '🏛️ 역사 성당', subTypeTag: '코르도바 페르난디나 성당 루트 후보', verifyBadge: '코르도바 관광청·교구·대성당 참사회 자료 확인 · 2026-11-13', highlights: '메스키타(모스크-대성당)와 별개의 성당입니다. 페르난도 3세 시대의 도미니코회 기원과 연결되며, 로마네스크-고딕 핵심부와 무데하르 목조 천장이 소개됩니다. 제공 사진에는 장미창이 보입니다.', hours: '사진의 흰 미사 안내문은 10월 1일~4월 1일 기간을 명시합니다. 이를 연중 관광 개방시간으로 해석하지 마세요. 방문 시간·입장 가능 여부는 방문 전에 공식 성당/교구 안내로 확인하세요.', seniorCaution: '사진에서 계단과 고르지 않은 바닥이 보입니다. 무단차·휠체어 접근 여부는 확인되지 않았으므로 접근성이 필요한 경우 먼저 성당에 문의하세요. 사진의 붉은 표지에는 페르난디나 성당 루트 설명 앱이 언급되지만 QR의 실제 주소·오류 원인은 확인되지 않았습니다.' },
        en: { typeBadge: '🏛️ Historic church', subTypeTag: 'Candidate stop on Córdoba’s Fernandina churches route', verifyBadge: 'Córdoba tourism, Diocese and Cathedral Chapter sources checked · 2026-11-13', highlights: 'A separate church, not the Mosque-Cathedral. Its historic Dominican origins are linked to Fernando III; sources describe a Romanesque-Gothic core and a Mudéjar wooden ceiling. The supplied photo shows its rose window.', hours: 'The white mass notice in the photo is explicitly for 1 October–1 April; it is not an annual tourist-opening timetable. Check current visiting access and hours with the church/Diocese before going.', seniorCaution: 'Steps and uneven paving are visible in the photos. Step-free or wheelchair access is unverified; contact the church first if access matters. A red sign mentions an explanatory app for the Fernandina churches route, but the QR destination and any error cause have not been verified.' },
        ja: { typeBadge: '🏛️ 歴史ある教会', subTypeTag: 'コルドバのフェルナンディナ教会ルート候補', verifyBadge: 'コルドバ観光局・教区・大聖堂参事会資料を確認 · 2026-11-13', highlights: 'モスク・大聖堂とは別の教会です。フェルナンド3世時代のドミニコ会起源に結び付けられ、ロマネスク・ゴシック様式の主要部とムデハル様式の木造天井が紹介されています。提供写真にはバラ窓が写っています。', hours: '写真の白いミサ案内は10月1日～4月1日の期間を明記しています。年間の観光開館時間として扱わないでください。訪問・入場可能時間は事前に教会または教区の公式案内で確認してください。', seniorCaution: '写真には階段と凹凸のある舗装が写っています。段差のない入口・車いす対応は未確認のため、必要なら教会に事前確認してください。赤い案内板にはフェルナンディナ教会ルートの解説アプリとありますが、QRの実際のリンク先やエラー原因は確認できていません。' },
        zh: { typeBadge: '🏛️ 历史教堂', subTypeTag: '科尔多瓦费尔南迪纳教堂路线候选', verifyBadge: '已核对科尔多瓦旅游局、教区及主教座堂参事会资料 · 2026-11-13', highlights: '这是独立教堂，不是清真寺—主教座堂。其历史多明我会渊源与费尔南多三世相关；资料介绍了罗马式—哥特式主体及穆德哈尔木质天花。用户照片可见玫瑰窗。', hours: '照片中的白色弥撒时间牌明确写的是10月1日至4月1日期间，不是全年旅游开放时间。出发前请向教堂或教区官方渠道确认参观安排。', seniorCaution: '照片中可见台阶和不平整铺地。无台阶或轮椅通行条件未核实；如有需要请先联系教堂。红色标牌写有费尔南迪纳教堂路线说明应用，但二维码实际网址及任何报错原因均未核实。' },
        sourceLabels: {
          ko: ['코르도바 관광청 산 파블로 성당 소개', '코르도바 지방정부 성당 역사·건축', '코르도바 교구 페르난디나 루트 공지', '대성당 참사회 공식 루트'],
          en: ['Córdoba tourism: San Pablo Church', 'Córdoba provincial heritage: church history and architecture', 'Diocese: Fernandina route notice', 'Cathedral Chapter route site'],
          ja: ['コルドバ観光局：サン・パブロ教会', 'コルドバ県：教会の歴史と建築', '教区：フェルナンディナ案内', '大聖堂参事会：公式ルート'],
          zh: ['科尔多瓦旅游局：圣巴勃罗教堂', '科尔多瓦省政府：教堂历史与建筑', '教区：费尔南迪纳路线公告', '主教座堂参事会路线官网']
        }
      },
      sources: [SOURCES.sanPablo, SOURCES.sanPabloHeritage, SOURCES.fernandinaNews, SOURCES.fernandinaRoute]
    },
    {
      id: 'pc-cordoba-tendillas-clock', cityId: 'cordoba', cityName: '코르도바', cityEn: 'Córdoba', mapQuery: 'Reloj de las Tendillas Córdoba Spain',
      name: { ko: 'Plaza de las Tendillas 시계', en: 'Plaza de las Tendillas clock', ja: 'Plaza de las Tendillasの時計', zh: '滕西利亚斯广场钟' },
      copy: {
        ko: { typeBadge: '🕰️ 도시 문화·시계', subTypeTag: '코르도바 시내 광장 랜드마크', verifyBadge: '코르도바 시청·Canal Sur 자료 확인 · 2026-11-13', highlights: '시계는 정각뿐 아니라 15분·30분·45분에도 시각을 알립니다. 1961년부터 기타 연주자 후안 세라노(Juan Serrano)의 기타 선율을 사용했다고 보도되었습니다. 이 소리가 실제로 들린 것이 이 시계인지는 확인되지 않았습니다.', hours: '공공 광장의 시계이며 예약 대상이 아닙니다. 정확한 방문 시간이나 다른 장소에서의 거리·소요시간은 여기서 단정하지 않습니다.', seniorCaution: '광장 주변의 보행 환경과 현장 접근성은 방문 당일 확인하세요. 위치 간 정확한 거리·도보시간은 제시하지 않습니다.' },
        en: { typeBadge: '🕰️ Civic landmark clock', subTypeTag: 'City-centre plaza landmark in Córdoba', verifyBadge: 'Córdoba City and Canal Sur sources checked · 2026-11-13', highlights: 'The clock chimes at quarter-hours as well as on the hour. Reports say its chime has used guitarist Juan Serrano’s guitar music since 1961. It is not established that a sound heard elsewhere came from this clock.', hours: 'A public-square clock, not a bookable attraction. No exact visit duration, distance or walking time to another place is asserted here.', seniorCaution: 'Check the plaza’s current pedestrian conditions on the day. No precise distance or walk-time claim is made.' },
        ja: { typeBadge: '🕰️ 街の時計・文化ランドマーク', subTypeTag: 'コルドバ中心部の広場にあるランドマーク', verifyBadge: 'コルドバ市・Canal Sur資料を確認 · 2026-11-13', highlights: '時計は毎正時だけでなく15分・30分・45分にも鳴ります。報道によると、1961年からギタリストJuan Serranoのギター曲が時報に使われています。別の場所で聞こえた音がこの時計のものとは確認できていません。', hours: '公共広場の時計で、予約制の施設ではありません。正確な見学所要時間や他の場所からの距離・徒歩時間は断定しません。', seniorCaution: '広場の歩行環境は当日確認してください。正確な距離・徒歩時間は示していません。' },
        zh: { typeBadge: '🕰️ 城市文化钟', subTypeTag: '科尔多瓦市中心广场地标', verifyBadge: '已核对科尔多瓦市政府及Canal Sur资料 · 2026-11-13', highlights: '钟在每刻钟以及整点报时。报道说自1961年起，报时使用吉他演奏家Juan Serrano的吉他曲。无法确认在别处听到的声音一定来自这座钟。', hours: '这是公共广场上的钟，不是需要预约的景点。此处不推断具体游览时长、距离或步行时间。', seniorCaution: '请根据当天情况确认广场步行环境。本文不提供精确距离或步行时间。' },
        sourceLabels: {
          ko: ['코르도바 시청 텐디야스 시계·연말 안내', 'Canal Sur 시계 60주년 보도'],
          en: ['Córdoba City: Tendillas clock and year-end note', 'Canal Sur: 60th-anniversary report'],
          ja: ['コルドバ市：テンディージャス時計・年末案内', 'Canal Sur：時計60周年記事'],
          zh: ['科尔多瓦市政府：滕西利亚斯钟与年末说明', 'Canal Sur：时钟60周年报道']
        }
      },
      sources: [SOURCES.tendillasCity, SOURCES.tendillasNews]
    }
  ];

  function appendCandidates() {
    const data = window.PRACTICAL_CITY_CANDIDATES_DATA;
    const i18n = window.PRACTICAL_CANDIDATES_I18N;
    if (!data || !Array.isArray(data.items) || !i18n || !i18n.items || !i18n.ui) return;
    const previousCount = String(data.items.length);
    const previousCityCount = String(new Set(data.items.map(item => item.cityId)).size);
    const ids = new Set(data.items.map(item => item.id));
    entries.forEach(entry => {
      const ko = entry.copy.ko;
      if (!ids.has(entry.id)) {
        data.items.push({
          id: entry.id, cityId: 'cordoba', cityName: entry.cityName, cityEn: 'Córdoba', country: '스페인', flag: '🇪🇸', name: entry.name.ko,
          categoryKey: 'historic_site', typeKey: 'cultural_site', typeColor: 'cultural_site', typeBadge: ko.typeBadge,
          subTypeTag: ko.subTypeTag, isOneStopRecommended: false, oneStopReason: '', highlights: ko.highlights, hours: ko.hours,
          verifyNotice: ko.verifyBadge, seniorCaution: ko.seniorCaution, broadcastNote: '',
          sources: entry.sources.map((url, index) => ({ url, label: entry.copy.sourceLabels.ko[index] })), verifiedDate: '2026-11-13 확인', mapQuery: entry.mapQuery
        });
        ids.add(entry.id);
      }
      if (!i18n.items[entry.id]) i18n.items[entry.id] = {};
      LANGS.forEach(lang => {
        if (lang === 'ko' || !i18n.items[entry.id][lang]) {
          const copy = entry.copy[lang];
          i18n.items[entry.id][lang] = {
            name: entry.name[lang], typeBadge: copy.typeBadge, subTypeTag: copy.subTypeTag, verifyBadge: copy.verifyBadge,
            highlights: copy.highlights, hours: copy.hours, seniorCaution: copy.seniorCaution,
            broadcastNote: '', oneStopReason: '', sourceLabels: entry.copy.sourceLabels[lang]
          };
        }
      });
    });

    const count = String(data.items.length);
    const cityCount = String(new Set(data.items.map(item => item.cityId)).size);
    LANGS.forEach(lang => {
      const ui = i18n.ui[lang];
      if (!ui) return;
      ui.cities = ui.cities || {};
      ui.cityEnMap = ui.cityEnMap || {};
      ui.cities.cordoba = cityLabels[lang];
      ui.cityEnMap.cordoba = 'Córdoba';
      // Replace each old count by its meaning, regardless of word order in each language.
      ['subnavCandidates', 'resultCountSuffix', 'mainTitle', 'emptyDesc', 'cityFilterLabel'].forEach(key => {
        if (typeof ui[key] !== 'string') return;
        ui[key] = ui[key].replace(/\d+/g, value => {
          if (value === previousCount) return count;
          if (value === previousCityCount) return cityCount;
          return value;
        });
      });
    });
  }
  appendCandidates();

  const copy = {
    ko: {
      title: '스페인 쌀과 코르도바: 세 가지 이야기', eyebrow: '먹거리와 문화 · 후보 정보만 추가', intro: '스페인 쌀은 한 가지 기후나 한 가지 요리로 설명되지 않습니다. 관개·물 관리의 맥락, 발렌시아의 쌀 요리 전통, 코르도바의 별도 역사 명소와 도시 시계를 함께 살펴봅니다.',
      riceTitle: '스페인 쌀 · 파에야 · 봄바 쌀', riceText: '스페인 각 지역의 기후는 다양합니다. 발렌시아 알부페라와 과달키비르 습지대 같은 쌀 재배지는 관리되는 관개와 계절별 물 공급에 의존합니다. 이베리아반도에 쌀이 퍼진 시기를 단정하기는 어렵고, 무슬림 시대의 확산 연대도 불확실합니다. 발렌시아에는 쌀과 파에야의 뚜렷한 전통이 있으며, 전통적인 발렌시아식 파에야는 닭고기·토끼고기·콩을 쓰는 버전입니다. 파에야가 반드시 해산물 요리인 것은 아닙니다. 봄바 쌀은 액체와 풍미를 잘 흡수하면서 알갱이가 비교적 분리된 채 익는 특성이 있습니다. 이는 모든 스페인 쌀요리에 적용되는 규칙도, 세계 최고라는 순위 주장도 아닙니다.',
      churchTitle: 'Real Iglesia de San Pablo · 성당과 페르난디나 루트', churchText: '산 파블로는 메스키타와 별개의 성당입니다. 도미니코회 기원은 페르난도 3세 시대와 연결되고, 건축은 로마네스크-고딕 핵심부와 무데하르 목조 천장으로 설명됩니다. 제공 사진에는 장미창, 성당 표지와 입구 주변의 계단·고르지 않은 바닥이 보입니다. 페르난디나 루트는 코르도바 대성당 참사회가 운영하는 체계입니다. 사진의 붉은 표지는 루트 설명 앱을 가리키지만 QR의 실제 목적지나 접속 오류 원인은 모릅니다. 흰 미사 안내는 10월 1일~4월 1일에 한정된 표기이므로 연중 방문시간이 아닙니다. 관광 방문 가능 여부와 접근성은 공식 안내로 확인하세요.',
      clockTitle: 'Plaza de las Tendillas · 시계', clockText: '텐디야스 광장의 시계는 15분·30분·45분과 정각에 울립니다. 보도에 따르면 1961년부터 후안 세라노의 기타 선율을 사용합니다. 어디선가 들린 소리가 이 시계에서 왔다고 단정할 수 없으며, 다른 장소와의 정확한 거리나 도보시간도 제시하지 않습니다.',
      galleryTitle: '여행자가 제공한 현장 사진', galleryNote: '개인 제공 사진을 안내 목적으로 축소·재인코딩했습니다. 사진에 보이는 모습만 설명하며 운영·접근성을 추정하지 않습니다.', captions: ['성당 입구의 표지와 안내판. 미사 시간표는 사진에 적힌 10월 1일~4월 1일 기간 한정입니다.', 'Real Iglesia de San Pablo의 정면과 장미창.', '성당 이름 표지와 입구 주변 계단·바닥 모습. 무단차 접근은 확인되지 않았습니다.'],
      sourceTitle: '자료와 추가 확인', sourceNote: '링크는 기관·지역 관광·학술 자료입니다. 방문 전 운영과 입장 가능 여부를 해당 공식 기관에서 확인하세요.',
      riceLinks: ['스페인 농림수산식품부 쌀 산업 자료', '스페인 쌀 생산·관개에 관한 학술 논문', 'Visit Valencia: 발렌시아식 파에야', 'Foods and Wines from Spain: 발렌시아 PDO 쌀'],
      churchLinks: ['코르도바 관광청: 산 파블로 성당', '코르도바 지방정부: 성당 역사와 건축', '코르도바 교구: 페르난디나 루트 공지', '대성당 참사회: 공식 페르난디나 루트'],
      clockLinks: ['코르도바 시청: 시계·연말 행사 안내', 'Canal Sur: 텐디야스 시계 60주년'],
      note: '후보·교육 정보만 추가했습니다. 일정, 숙박, 날짜, 예약은 변경하지 않았습니다.'
    },
    en: {
      title: 'Spanish rice & Córdoba: three stories', eyebrow: 'Food & culture · informational candidates only', intro: 'Spanish rice is not defined by one climate or one dish. This short guide connects managed irrigation and seasonal water to rice-growing areas, Valencia’s rice tradition, and two separate Córdoba landmarks.',
      riceTitle: 'Spanish rice · paella · Bomba', riceText: 'Spain has varied regional climates. Rice areas such as Valencia’s Albufera and wetlands of the Guadalquivir depend on managed irrigation and seasonal water. The timing of rice’s spread across Iberia is difficult to pin down; dates for its dissemination in the Muslim period are uncertain. Valencia has a strong rice and paella tradition. A traditional Valencian paella version uses chicken, rabbit and beans; paella is not necessarily a seafood dish. Bomba rice absorbs liquid and flavour while tending to remain separate-grained. That is not a rule for every Spanish rice dish, nor a claim that it is the world’s best rice.',
      churchTitle: 'Real Iglesia de San Pablo · church & Fernandina route', churchText: 'San Pablo is a separate church, not the Mezquita-Catedral. Its Dominican origins are linked to Fernando III; descriptions note a Romanesque-Gothic core and a Mudéjar wooden ceiling. The supplied photos show a rose window, church signage, steps and uneven paving near the entrance. The Fernandina route operates within the Cathedral Chapter’s system. The red sign in the photo mentions an explanatory route app, but the QR’s actual destination and any connection error are unknown. The white mass notice is seasonal (1 October–1 April), not year-round tourist hours. Verify visiting access and accessibility with official sources.',
      clockTitle: 'Plaza de las Tendillas · clock', clockText: 'The Tendillas clock chimes at quarter-hours and on the hour. Reports say guitarist Juan Serrano’s music has been used since 1961. A sound heard elsewhere cannot be confidently attributed to this clock; no exact distance or walking time to another place is asserted.',
      galleryTitle: 'Traveller-provided photographs', galleryNote: 'These personal photos were resized and re-encoded for this guide. Captions describe visible evidence only; they do not establish hours or accessibility.', captions: ['Signage at the church gate. The mass notice shown is limited to 1 October–1 April.', 'The façade and rose window of Real Iglesia de San Pablo.', 'Church sign and visible steps/paving by the entrance; step-free access is unverified.'],
      sourceTitle: 'Sources & checking before a visit', sourceNote: 'Links lead to institutional, local tourism or scholarly sources. Check current opening/visiting access with the responsible official body before going.',
      riceLinks: ['Spain Ministry of Agriculture: rice sector', 'Study of Spanish rice production and irrigation', 'Visit Valencia: Valencian paella', 'Foods and Wines from Spain: Valencia PDO rice'],
      churchLinks: ['Córdoba tourism: San Pablo Church', 'Córdoba provincial heritage: church history and architecture', 'Diocese: Fernandina route notice', 'Cathedral Chapter: official Fernandina route'],
      clockLinks: ['Córdoba City: clock and year-end note', 'Canal Sur: Tendillas clock anniversary'],
      note: 'Only candidate and educational information was added. It does not change the itinerary, lodging, dates or bookings.'
    },
    ja: {
      title: 'スペインの米とコルドバ：3つの話', eyebrow: '食文化・文化案内 · 候補情報のみ', intro: 'スペインの米を単一の気候や料理だけで説明することはできません。灌漑と季節の水、バレンシアの米料理の伝統、コルドバの別々の文化的見どころを紹介します。',
      riceTitle: 'スペインの米 · パエリア · ボンバ米', riceText: 'スペイン各地の気候は多様です。バレンシアのアルブフェラやグアダルキビル川の湿地などの稲作地は、管理された灌漑と季節ごとの水供給に依存します。イベリア半島で米が広まった時期を正確に定めるのは難しく、イスラム時代の伝播年代も不確かです。バレンシアには米料理・パエリアの伝統があります。伝統的なバレンシア風パエリアの一例は鶏肉、ウサギ肉、豆を使い、必ずしも魚介料理ではありません。ボンバ米は液体や旨味を吸収しつつ、粒が比較的分かれて炊き上がる傾向があります。これはスペインのすべての米料理に当てはまる規則でも、世界一という評価でもありません。',
      churchTitle: 'Real Iglesia de San Pablo · 教会とフェルナンディナ・ルート', churchText: 'サン・パブロ教会はメスキータ（モスク・大聖堂）とは別の教会です。ドミニコ会の起源はフェルナンド3世の時代に結び付けられ、ロマネスク・ゴシック様式の主要部とムデハル様式の木造天井が紹介されています。提供写真にはバラ窓、教会の案内板、入口付近の階段と凹凸のある舗装が写っています。フェルナンディナ・ルートは大聖堂参事会の制度内で運営されています。写真の赤い案内板はルート解説アプリに触れていますが、QRのリンク先や接続エラーの原因は不明です。白いミサ案内は10月1日～4月1日の季節限定で、年間の観光開館時間ではありません。見学可否・アクセスは公式情報で確認してください。',
      clockTitle: 'Plaza de las Tendillas · 時計', clockText: 'テンディージャスの時計は15分・30分・45分と正時に鳴ります。報道によると、1961年からギタリストJuan Serranoの曲が使われています。他所で聞いた音をこの時計の音と断定できません。また、他の場所からの正確な距離や徒歩時間は示しません。',
      galleryTitle: '旅行者提供の写真', galleryNote: '個人提供写真をガイド用に縮小・再エンコードしました。写真に見える内容だけを説明し、営業時間やアクセスを推測しません。', captions: ['教会門の案内板。写真のミサ案内は10月1日～4月1日の期間限定です。', 'Real Iglesia de San Pabloの正面とバラ窓。', '教会名の表示と入口付近の階段・舗装。段差のない経路は未確認です。'],
      sourceTitle: '出典と訪問前の確認', sourceNote: '公的機関、地域観光、学術資料へのリンクです。訪問前に担当機関の公式情報で見学可否・営業時間を確認してください。',
      riceLinks: ['スペイン農業省：米産業資料', 'スペインの稲作・灌漑に関する研究', 'Visit Valencia：バレンシア風パエリア', 'Foods and Wines from Spain：バレンシアPDO米'],
      churchLinks: ['コルドバ観光局：サン・パブロ教会', 'コルドバ県：教会の歴史と建築', '教区：フェルナンディナ案内', '大聖堂参事会：公式ルート'],
      clockLinks: ['コルドバ市：時計・年末行事', 'Canal Sur：テンディージャス時計の記事'],
      note: '候補・教育情報のみを追加しました。旅程、宿泊、日付、予約は変更していません。'
    },
    zh: {
      title: '西班牙稻米与科尔多瓦：三个故事', eyebrow: '饮食与文化 · 仅供参考的候选信息', intro: '西班牙稻米不能用单一气候或一道菜概括。本指南简述管理灌溉与季节性水源、瓦伦西亚稻米传统，以及科尔多瓦两处彼此独立的文化地标。',
      riceTitle: '西班牙稻米 · 西班牙烩饭 · Bomba米', riceText: '西班牙各地气候多样。瓦伦西亚阿尔布费拉和瓜达尔基维尔河湿地等稻区依赖管理灌溉和季节性供水。稻米传入伊比利亚半岛的具体时间难以确定；其在穆斯林时期传播的年代也不确定。瓦伦西亚拥有深厚的稻米与海鲜饭传统。传统瓦伦西亚烩饭的一种做法使用鸡肉、兔肉和豆类；西班牙烩饭不一定含海鲜。Bomba米较能吸收液体和风味，同时倾向保持米粒分明。这并非所有西班牙米饭的通则，也不是“世界最好”的排名结论。',
      churchTitle: 'Real Iglesia de San Pablo · 教堂与费尔南迪纳路线', churchText: '圣巴勃罗教堂是独立教堂，不是清真寺—主教座堂。其多明我会历史渊源与费尔南多三世相关；资料介绍其罗马式—哥特式主体和穆德哈尔木质天花。用户照片显示玫瑰窗、教堂标识及入口附近台阶和不平整铺地。费尔南迪纳路线由主教座堂参事会体系运营。照片中的红色标牌提到路线说明应用，但二维码实际网址及任何连接错误原因未知。白色弥撒告示仅适用于10月1日至4月1日，并非全年旅游开放时间。参观安排和通行条件请查官方信息。',
      clockTitle: 'Plaza de las Tendillas · 广场钟', clockText: '滕西利亚斯钟会在每刻钟及整点报时。报道说自1961年起，报时使用吉他演奏家Juan Serrano的吉他曲。无法据此断定在别处听到的声音来自这座钟；本文也不推断准确距离或步行时间。',
      galleryTitle: '旅行者提供的照片', galleryNote: '个人提供的照片已为本指南缩小并重新编码。说明仅依据画面可见内容，不据此推断开放时间或无障碍条件。', captions: ['教堂门口的标识。照片中的弥撒时间告示仅标明10月1日至4月1日。', 'Real Iglesia de San Pablo正面与玫瑰窗。', '教堂名称标牌及入口附近可见的台阶与铺地；无台阶通道未核实。'],
      sourceTitle: '来源与出行前核实', sourceNote: '链接指向机构、当地旅游或学术资料。出发前请向相关官方机构核实参观安排及开放时间。',
      riceLinks: ['西班牙农业部：稻米产业资料', '西班牙稻作与灌溉研究', 'Visit Valencia：瓦伦西亚烩饭', 'Foods and Wines from Spain：瓦伦西亚PDO大米'],
      churchLinks: ['科尔多瓦旅游局：圣巴勃罗教堂', '科尔多瓦省政府：教堂历史与建筑', '教区：费尔南迪纳路线公告', '主教座堂参事会：费尔南迪纳路线官网'],
      clockLinks: ['科尔多瓦市政府：钟与年末活动', 'Canal Sur：滕西利亚斯钟报道'],
      note: '仅增加候选及教育信息，不改动行程、住宿、日期或预订。'
    }
  };
  const photoFiles = ['sign.jpg', 'facade.jpg', 'direction.jpg'];

  function esc(value) {
    return String(value == null ? '' : value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
  }
  function sourceAnchors(urls, labels) {
    return urls.map((url, index) => `<a href="${esc(url)}" target="_blank" rel="noopener noreferrer">${esc(labels[index] || 'Source')} ↗</a>`).join(' ');
  }
  function sourceBlock(title, urls, labels) {
    return `<div class="src-links" aria-label="${esc(title)}">${sourceAnchors(urls, labels)}</div>`;
  }

  window.renderSpainRiceCordobaGuide = function renderSpainRiceCordobaGuide(lang) {
    const active = LANGS.includes(lang) ? lang : 'ko';
    const t = copy[active];
    let mount = document.getElementById('spain-rice-cordoba-guide');
    if (!mount) {
      mount = document.createElement('section');
      mount.id = 'spain-rice-cordoba-guide';
      const host = document.querySelector('main') || document.body;
      if (!host) return;
      host.appendChild(mount);
    }
    const pics = photoFiles.map((file, index) => `<figure><img src="img/user-cordoba-san-pablo/${file}" alt="${esc(t.captions[index])}" loading="lazy" decoding="async"><figcaption>${esc(t.captions[index])}</figcaption></figure>`).join('');
    mount.innerHTML = `<style>
      #spain-rice-cordoba-guide{--crc-ink:#172f37;--crc-muted:#536b70;--crc-line:#d9e5df;--crc-paper:#fff;--crc-wash:#f3f7f3;--crc-accent:#176c5a;color:var(--crc-ink);font:inherit;margin:1rem 0}
      #spain-rice-cordoba-guide *{box-sizing:border-box} #spain-rice-cordoba-guide .crc-shell{max-width:1100px;margin:auto;border:1px solid var(--crc-line);border-radius:20px;overflow:hidden;background:var(--crc-paper);box-shadow:0 10px 28px rgba(27,58,53,.08)}
      #spain-rice-cordoba-guide .crc-head{padding:clamp(1.1rem,3vw,2rem);background:linear-gradient(120deg,#e9f3ed,#fbf4e8)} #spain-rice-cordoba-guide .crc-kicker{font-size:.82rem;font-weight:750;letter-spacing:.035em;color:#315c50;margin:0 0 .45rem}
      #spain-rice-cordoba-guide h2{font-size:clamp(1.45rem,3vw,2.1rem);line-height:1.2;margin:.15rem 0 .7rem} #spain-rice-cordoba-guide h3{font-size:1.16rem;line-height:1.3;margin:0 0 .55rem}
      #spain-rice-cordoba-guide .crc-intro{max-width:75ch;color:#314b4d;margin:0;line-height:1.65} #spain-rice-cordoba-guide .crc-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:1rem;padding:1rem}
      #spain-rice-cordoba-guide .crc-card{border:1px solid var(--crc-line);border-radius:14px;padding:1rem;background:#fff;min-width:0} #spain-rice-cordoba-guide .crc-card p{margin:.35rem 0 .65rem;line-height:1.63;color:#354c4d}
      #spain-rice-cordoba-guide .crc-card-wide{grid-column:1/-1;background:var(--crc-wash)} #spain-rice-cordoba-guide .src-links{display:flex;flex-wrap:wrap;gap:.5rem;margin-top:.8rem}
      #spain-rice-cordoba-guide .src-links a{display:inline-flex;align-items:center;padding:.48rem .65rem;border:1px solid #b9d0c4;border-radius:999px;color:#155847;text-decoration:underline;text-underline-offset:2px;font-size:.88rem;line-height:1.35;background:#fff}
      #spain-rice-cordoba-guide a:focus-visible,#spain-rice-cordoba-guide summary:focus-visible{outline:3px solid #df9f31;outline-offset:3px} #spain-rice-cordoba-guide details{border-top:1px solid var(--crc-line);padding:1rem}
      #spain-rice-cordoba-guide summary{cursor:pointer;font-weight:750;padding:.2rem 0} #spain-rice-cordoba-guide .crc-gallery-note{color:var(--crc-muted);font-size:.93rem;line-height:1.5;margin:.5rem 0}
      #spain-rice-cordoba-guide .crc-gallery{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:.8rem;margin-top:.8rem} #spain-rice-cordoba-guide figure{margin:0;border:1px solid var(--crc-line);border-radius:12px;overflow:hidden;background:#fff}
      #spain-rice-cordoba-guide figure img{display:block;width:100%;height:auto;max-height:420px;object-fit:contain;background:#eef1ed} #spain-rice-cordoba-guide figcaption{font-size:.88rem;line-height:1.45;padding:.65rem;color:#354c4d}
      #spain-rice-cordoba-guide .crc-footer{padding:.8rem 1rem 1.1rem;color:var(--crc-muted);font-size:.88rem} @media(max-width:700px){#spain-rice-cordoba-guide .crc-grid{grid-template-columns:1fr;padding:.7rem}#spain-rice-cordoba-guide .crc-card-wide{grid-column:auto}#spain-rice-cordoba-guide .crc-gallery{grid-template-columns:1fr 1fr}}
      @media(max-width:430px){#spain-rice-cordoba-guide .crc-gallery{grid-template-columns:1fr}} @media(prefers-reduced-motion:reduce){#spain-rice-cordoba-guide *{scroll-behavior:auto!important;transition:none!important}}
    </style><div class="crc-shell" lang="${active}"><header class="crc-head"><p class="crc-kicker">${esc(t.eyebrow)}</p><h2>${esc(t.title)}</h2><p class="crc-intro">${esc(t.intro)}</p></header>
      <div class="crc-grid"><article class="crc-card"><h3>${esc(t.riceTitle)}</h3><p>${esc(t.riceText)}</p>${sourceBlock(t.sourceTitle,[SOURCES.riceSpain,SOURCES.riceStudy,SOURCES.valencia,SOURCES.bomba],t.riceLinks)}</article>
      <article class="crc-card"><h3>${esc(t.churchTitle)}</h3><p>${esc(t.churchText)}</p>${sourceBlock(t.sourceTitle,[SOURCES.sanPablo,SOURCES.sanPabloHeritage,SOURCES.fernandinaNews,SOURCES.fernandinaRoute],t.churchLinks)}</article>
      <article class="crc-card crc-card-wide"><h3>${esc(t.clockTitle)}</h3><p>${esc(t.clockText)}</p>${sourceBlock(t.sourceTitle,[SOURCES.tendillasCity,SOURCES.tendillasNews],t.clockLinks)}</article></div>
      <details><summary>${esc(t.galleryTitle)}</summary><p class="crc-gallery-note">${esc(t.galleryNote)}</p><div class="crc-gallery">${pics}</div></details><footer class="crc-footer">${esc(t.note)}</footer></div>`;
    return mount;
  };

  const answerCopy = {
    ko: {
      rice: `<h3>스페인 쌀·파에야·봄바 쌀</h3><p>스페인 지역의 기후는 다양하며, 발렌시아 알부페라와 과달키비르 습지대의 쌀 재배는 관리되는 관개와 계절별 물 공급에 의존합니다. 무슬림 시대에 쌀이 퍼진 정확한 연대는 불확실합니다. 발렌시아는 쌀·파에야 전통이 있고, 전통적인 발렌시아식 파에야는 닭고기·토끼고기·콩을 쓰는 버전으로, 꼭 해산물 요리인 것은 아닙니다. 봄바 쌀은 액체와 풍미를 흡수하면서 비교적 알갱이를 분리해 익히는 품종 특성이지 모든 스페인 쌀이나 ‘세계 최고’라는 뜻은 아닙니다.</p>${sourceBlock('쌀 출처',[SOURCES.riceSpain,SOURCES.riceStudy,SOURCES.valencia,SOURCES.bomba],riceSources.ko)}`,
      church: `<h3>Real Iglesia de San Pablo와 페르난디나 QR</h3><p>산 파블로는 메스키타와 별개의 성당입니다. 도미니코회 기원은 페르난도 3세 시대와 연결되며, 로마네스크-고딕 핵심부와 무데하르 목조 천장이 소개됩니다. 페르난디나 성당 루트는 대성당 참사회 체계에서 운영됩니다. 사진의 붉은 표지에는 루트 설명 앱이 적혀 있지만 QR 실제 주소와 오류 원인은 확인되지 않았습니다. 미사 안내는 10월 1일~4월 1일 한정이며 연중 관광 개방시간이 아닙니다. 계단·고르지 않은 바닥이 사진에 보이고 무단차 접근은 미확인입니다. 방문 가능 시간·접근성은 공식 기관에 확인하세요.</p>${sourceBlock('성당 출처',[SOURCES.sanPablo,SOURCES.sanPabloHeritage,SOURCES.fernandinaNews,SOURCES.fernandinaRoute],links.ko.slice(0,4))}`,
      clock: `<h3>텐디야스 광장 시계</h3><p>15분·30분·45분과 정각에 울리며, 보도에 따르면 1961년부터 후안 세라노의 기타 선율을 사용합니다. 다른 곳에서 들은 소리가 이 시계였다고 단정할 수 없고, 정확한 거리·도보시간도 확인하지 않았습니다.</p>${sourceBlock('시계 출처',[SOURCES.tendillasCity,SOURCES.tendillasNews],links.ko.slice(4))}`
    },
    en: {
      rice: `<h3>Spanish rice, paella & Bomba</h3><p>Spain has varied regional climates. Rice at Valencia’s Albufera and the Guadalquivir wetlands relies on managed irrigation and seasonal water. The dates of rice dissemination in the Muslim period are uncertain. Valencia has a rice and paella tradition; a traditional Valencian version uses chicken, rabbit and beans, and is not necessarily seafood. Bomba absorbs liquid and flavour while tending to stay separate-grained; that is not a rule for all Spanish rice or a “world’s best” claim.</p>${sourceBlock('Rice sources',[SOURCES.riceSpain,SOURCES.riceStudy,SOURCES.valencia,SOURCES.bomba],riceSources.en)}`,
      church: `<h3>San Pablo & the Fernandina QR</h3><p>San Pablo is a separate church, not the Mezquita-Catedral. Its Dominican origin is linked to Fernando III; descriptions note a Romanesque-Gothic core and Mudéjar wooden ceiling. The Fernandina churches route operates within the Cathedral Chapter’s system. The photo’s red sign mentions an explanatory route app, but the QR destination and any error cause are unknown. The mass notice is limited to 1 October–1 April, not annual tourist hours. Steps and uneven paving are visible; step-free access is unverified. Check visiting access and accessibility officially.</p>${sourceBlock('Church sources',[SOURCES.sanPablo,SOURCES.sanPabloHeritage,SOURCES.fernandinaNews,SOURCES.fernandinaRoute],links.en.slice(0,4))}`,
      clock: `<h3>Tendillas clock</h3><p>It chimes at quarter-hours and on the hour. Reports say guitarist Juan Serrano’s music has been used since 1961. A sound heard elsewhere cannot be attributed to this clock with certainty; no exact distance or walk time is claimed.</p>${sourceBlock('Clock sources',[SOURCES.tendillasCity,SOURCES.tendillasNews],links.en.slice(4))}`
    },
    ja: {
      rice: `<h3>スペインの米・パエリア・ボンバ米</h3><p>スペイン各地の気候は多様です。アルブフェラやグアダルキビル川湿地の稲作は管理灌漑と季節の水に依存します。イスラム時代の米の伝播年代は不確かです。バレンシアには米・パエリアの伝統があり、伝統的なバレンシア風の一例は鶏肉、ウサギ肉、豆を使い、必ずしも魚介料理ではありません。ボンバ米は液体と旨味を吸いながら粒が分かれて炊き上がる傾向がありますが、全スペイン料理の規則でも「世界一」という主張でもありません。</p>${sourceBlock('米の出典',[SOURCES.riceSpain,SOURCES.riceStudy,SOURCES.valencia,SOURCES.bomba],riceSources.ja)}`,
      church: `<h3>サン・パブロ教会とフェルナンディナのQR</h3><p>サン・パブロ教会はメスキータとは別の教会です。ドミニコ会起源はフェルナンド3世時代に結び付き、ロマネスク・ゴシック様式の主要部とムデハル様式の木造天井が紹介されています。フェルナンディナ教会ルートは大聖堂参事会の制度内で運営。写真の赤い案内板にはルート解説アプリとありますが、QRのリンク先やエラー原因は不明です。ミサ案内は10月1日～4月1日の期間限定で、年間の観光開館時間ではありません。階段と凹凸舗装が見え、段差のないアクセスは未確認です。見学可否・アクセスは公式情報で確認してください。</p>${sourceBlock('教会の出典',[SOURCES.sanPablo,SOURCES.sanPabloHeritage,SOURCES.fernandinaNews,SOURCES.fernandinaRoute],links.ja.slice(0,4))}`,
      clock: `<h3>テンディージャスの時計</h3><p>15分・30分・45分と正時に鳴り、報道によると1961年からJuan Serranoのギター曲を使っています。他所で聞いた音をこの時計の音と断定できず、正確な距離・徒歩時間も示しません。</p>${sourceBlock('時計の出典',[SOURCES.tendillasCity,SOURCES.tendillasNews],links.ja.slice(4))}`
    },
    zh: {
      rice: `<h3>西班牙稻米、西班牙烩饭与Bomba米</h3><p>西班牙各地气候不同。阿尔布费拉和瓜达尔基维尔河湿地的稻作依赖管理灌溉与季节性水源。稻米在穆斯林时期传播的年代并不确定。瓦伦西亚有稻米和西班牙烩饭传统；一种传统瓦伦西亚做法使用鸡肉、兔肉和豆类，并不一定是海鲜菜。Bomba米较能吸收液体和风味且倾向粒粒分明，这不是所有西班牙米饭的规则，也不代表“世界最好”。</p>${sourceBlock('稻米来源',[SOURCES.riceSpain,SOURCES.riceStudy,SOURCES.valencia,SOURCES.bomba],riceSources.zh)}`,
      church: `<h3>圣巴勃罗教堂与费尔南迪纳二维码</h3><p>圣巴勃罗教堂是独立教堂，不是清真寺—主教座堂。其多明我会渊源与费尔南多三世相关；资料介绍罗马式—哥特式主体和穆德哈尔木质天花。费尔南迪纳教堂路线由主教座堂参事会体系运营。照片中的红色标牌提到路线说明应用，但二维码网址及报错原因未知。弥撒时间告示仅适用于10月1日至4月1日，不是全年旅游开放时间。照片可见台阶及不平整铺地；无台阶通道未核实。请查官方渠道确认参观安排和通行情况。</p>${sourceBlock('教堂来源',[SOURCES.sanPablo,SOURCES.sanPabloHeritage,SOURCES.fernandinaNews,SOURCES.fernandinaRoute],links.zh.slice(0,4))}`,
      clock: `<h3>滕西利亚斯广场钟</h3><p>钟在每刻钟和整点报时。报道说自1961年起使用吉他演奏家Juan Serrano的吉他曲。无法确定别处听到的声音来自这座钟；本文不推断准确距离或步行时间。</p>${sourceBlock('时钟来源',[SOURCES.tendillasCity,SOURCES.tendillasNews],links.zh.slice(4))}`
    }
  };
  const matchers = {
    rice: /\bbomba\b|\bspanish rice\b|\barroz de valencia\b|\bvalencia rice\b|\bpaella valenciana\b|\bpaella.{0,24}(origin|history|valencia|traditional|rice)|\b(origin|history).{0,20}paella\b|봄바|스페인 쌀|쌀의 기원|발렌시아 쌀|파에야.{0,12}(기원|유래|역사|발렌시아|전통|쌀)|쌀.{0,10}파에야|ボンバ米|スペイン米|バレンシア米|パエリア.{0,12}(起源|由来|歴史|バレンシア|伝統|米)|米.{0,10}パエリア|Bomba米|西班牙米|西班牙稻米|瓦伦西亚米|瓦倫西亞米|海鲜饭.{0,12}(起源|历史|瓦伦西亚|传统)|海鮮飯.{0,12}(起源|歷史|瓦倫西亞|傳統)|西班牙海鲜饭|西班牙海鮮飯|西班牙烩饭|瓦伦西亚烩饭|烩饭.{0,12}(起源|历史|瓦伦西亚|传统)/i,
    church: /san\s*pablo|real iglesia de san pablo|iglesias fernandinas|fernandina churches route|fernandina route|fernandina.*qr|qr.*fernandina|fernando\s*iii.{0,20}church|페르난디나( 성당)?( 루트| 교회 루트| QR)?|산\s*파블로( 성당)?|산파블로( 성당)?|성당.{0,12}QR|QR.{0,12}성당|フェルナンディナ(教会)?(ルート|QR)?|サン.?パブロ(教会)?|教会.{0,12}QR|QR.{0,12}教会|科尔多瓦.{0,12}(费尔南迪纳|圣巴勃罗)|费尔南迪纳(教堂)?路线|费尔南迪纳.{0,8}二维码|二维码.{0,8}费尔南迪纳|圣巴勃罗(教堂)?|費爾南迪納(教堂)?路线/i,
    clock: /reloj de las tendillas|tendillas clock|텐디야스( 광장)? 시계|텐디야스 시계|텐디야스.{0,12}(시계|종)|후안 세라노.{0,12}(시계|종)|テンディージャス(広場)?の時計|テンディージャス時計|テンディージャス.{0,10}(時計|鐘)|滕西利亚斯(广场)?(钟|时钟)|滕迪利亚斯(广场)?钟|滕西利亚斯.{0,8}(钟|时钟)/i
  };
  window.buildSpainRiceCordobaChatResponse = function buildSpainRiceCordobaChatResponse(query, lang) {
    if (typeof query !== 'string' || !query.trim()) return null;
    const text = query.normalize('NFKC').toLowerCase();
    let topic = null;
    // Specific clock/site aliases take precedence; only explicitly related topics are handled.
    if (matchers.clock.test(text)) topic = 'clock';
    else if (matchers.church.test(text)) topic = 'church';
    else if (matchers.rice.test(text)) topic = 'rice';
    if (!topic) return null;
    const active = LANGS.includes(lang) ? lang : 'ko';
    // Query text is never interpolated into the returned HTML; all displayed copy and hrefs are fixed/localized.
    return `<section class="cordoba-guide-chat" lang="${active}">${answerCopy[active][topic]}</section>`;
  };
})();
