/* Málaga place additions for the regional guide and local rule-based chatbot.
 * Loaded after granada-malaga-general-guide.js; it augments the existing Málaga group
 * without duplicating the existing Muelle Uno or Gibralfaro entries.
 */
(function () {
  'use strict';

  if (window.__malagaPlaceAdditionsLoaded) return;
  window.__malagaPlaceAdditionsLoaded = true;

  var LANGS = ['ko', 'en', 'ja', 'zh'];
  var COPY = {
    ko: {
      sourceLabel: '공식 출처 및 안내',
      topics: {
        atarazanas: {
          title: 'Atarazanas 중앙시장 (Mercado Central de Atarazanas)',
          body: '말라가 시청 안내 기준 월~토 08:00–15:00에 운영되며, 260개 점포가 있는 말라가 공설시장입니다. 신선식품과 지역 식료품을 판매하는 19세기 시장 건물로, 옛 기념문이 정면에 남아 있습니다. 이 시간은 시장 전체 안내이며 점포별 영업·재고는 다를 수 있고, 일요일 운영은 안내에 기재되어 있지 않습니다. 시청 페이지에는 이동이 불편한 이용자를 위한 시설이 없다고 표시되어 있으니, 접근 조건은 방문 전에 다시 확인하세요.'
        },
        casaAranda: {
          title: 'Casa Aranda · 츄러스와 초콜릿',
          body: '공식 관광 안내에 따르면 Casa Aranda는 커피·초콜릿·츄러스를 제공하는 카페이며 테라스도 안내되어 있습니다. 주소는 Herrería del Rey 3, Málaga 29005입니다. 영업시간·가격·접근 조건은 확인되지 않았으니 방문 전에 업소에 확인하세요.'
        },
        pedregalejo: {
          title: 'Pedregalejo 해변의 espeto',
          body: '옛 어촌 해안의 작은 만과 어부의 집이 남은 Pedregalejo에서는 Los Baños del Carmen에서 El Palo까지 이어지는 해변가 chiringuitos에서 espeto를 즐길 수 있습니다. 이는 espeto 일반 안내와 구분되는 해안 지역의 음식 문화입니다. 특정 업소의 영업·메뉴는 방문 당일 확인하세요. 석양은 지점·날짜·날씨와 시야에 따라 달라져 보장할 수 없습니다.'
        },
        romanRoute: {
          title: '알카사비야 거리 (Calle Alcazabilla) · 로마 극장과 알카사바',
          body: '말라가 구시가지의 Calle Alcazabilla에서는 로마 극장과 그 위쪽의 알카사바를 함께 볼 수 있습니다. 말라가 시 고고학 안내에 따르면 이 거리의 남북 축은 옛 로마 포럼의 중심 도로 카르도와 겹칩니다. 극장은 아우구스투스 시대인 서기 1세기에 세워져 3세기에 사용이 끝났고, 1951년 재발견됐습니다. 돌과 기둥 등 일부 재료는 뒤에 알카사바에 재사용됐습니다. 말라가 관광청은 성채가 바디스의 명으로 1057~1063년에 세워졌다고 설명합니다. 거리에서 바깥 풍경을 즐기고, 시설 내부는 개방·요금·현장 접근 조건을 각각 확인하세요. 통합 입장권을 가정하지 마세요. 알카사바 안에는 오르막이나 계단이 있을 수 있고, 전체 구간의 평탄함이나 무단차는 보장되지 않습니다. 극장은 폭염 경보 때 임시 폐쇄될 수 있습니다.'
        },
        laConcepcion: {
          title: 'Jardín Botánico-Histórico La Concepción',
          body: '식물원 운영자 공식 안내에 따르면 이 정원에는 5개 대륙의 2,400종 이상이 있으며, 말라가 중심부에서 약 6km 떨어져 있습니다. 도심 안의 산책 코스로 보지 말고 교통편을 별도로 계획하세요. 공식 안내 페이지마다 접근 교통 설명이 다르므로 방문일의 경로는 식물원과 EMT의 최신 안내에서 확인하고, 개장 시간·휴원일도 출발 전에 확인하세요.'
        },
        plazaMayor: {
          title: '말라가 Plaza Mayor는 쇼핑센터',
          body: '말라가의 Plaza Mayor는 도심 중앙 광장이 아니라 공식 관광청이 쇼핑·레저 시설로 분류한 쇼핑센터입니다. 이름이 같은 마드리드의 역사적 Plaza Mayor와 혼동하지 않도록 “말라가 Plaza Mayor 쇼핑센터”라고 표기하세요.'
        }
      }
    },
    en: {
      sourceLabel: 'Official and reference sources',
      topics: {
        atarazanas: {
          title: 'Atarazanas Central Market (Mercado Central de Atarazanas)',
          body: 'Málaga City Council lists the market as open Monday–Saturday, 08:00–15:00, with 260 stalls. The 19th-century market building sells fresh and local foods, and preserves an older monumental gate on its façade. These are market-wide hours, not a promise about each stall or its stock; Sunday opening is not listed. The council page lists no facilities for visitors with reduced mobility, so check current access arrangements before going.'
        },
        casaAranda: {
          title: 'Casa Aranda · churros and chocolate',
          body: 'Official tourism information describes Casa Aranda as a café serving coffee, chocolate and churros, with a terrace listed among its services. Its listed address is Herrería del Rey 3, Málaga 29005. Hours, prices and access details were not confirmed; check with the venue before visiting.'
        },
        pedregalejo: {
          title: 'Espeto on Pedregalejo Beach',
          body: 'In Pedregalejo, an old fishing-coast area with small coves and former fishermen’s houses, seaside chiringuitos between Los Baños del Carmen and El Palo are associated with espeto. This adds a place-specific coastal food setting rather than repeating the general espeto note. Check each venue’s current hours and menu. Sunset visibility varies by viewpoint, date, weather and line of sight, so it is not guaranteed.'
        },
        romanRoute: {
          title: 'Calle Alcazabilla · Roman Theatre and Alcazaba',
          body: 'On Calle Alcazabilla in Málaga’s old town, the Roman Theatre and the Alcazaba fortress above it can be seen together. The city’s archaeological guide says the street’s north–south axis coincides with the cardo, the main road of the ancient Roman forum. The theatre was built in the 1st century CE under Augustus, fell out of use in the 3rd century and was rediscovered in 1951. Some stones and columns were later reused in the Alcazaba. Málaga Tourism dates the fortress to 1057–1063 under Badis. Enjoy the outside views; check opening, fees and access separately for each interior and do not assume a combined ticket. The Alcazaba may involve slopes or steps, and the entire route is not guaranteed level or step-free. The theatre may close temporarily during heat alerts.'
        },
        laConcepcion: {
          title: 'Jardín Botánico-Histórico La Concepción',
          body: 'The garden operator lists more than 2,400 species from five continents, and places La Concepción about 6 km from central Málaga. Treat it as an out-of-centre visit and plan transport separately. Official pages differ in their access directions, so check the garden’s and EMT’s current route information, as well as opening days and hours, before setting out.'
        },
        plazaMayor: {
          title: 'Plaza Mayor Málaga is a shopping centre',
          body: 'Málaga’s Plaza Mayor is a shopping and leisure centre listed by the official tourism site—not a central city square. Call it the “Plaza Mayor shopping centre in Málaga” to distinguish it from Madrid’s historic Plaza Mayor.'
        }
      }
    },
    ja: {
      sourceLabel: '公式・参考情報',
      topics: {
        atarazanas: {
          title: 'アタラサナス中央市場（Mercado Central de Atarazanas）',
          body: 'マラガ市の案内では、月曜～土曜の08:00～15:00に営業し、260の売店がある公設市場です。生鮮食品や地元食品を扱う19世紀の市場建物で、旧記念門が正面に保存されています。時間は市場全体の案内で、各売店の営業や在庫を保証するものではありません。日曜営業は案内に記載されていません。市のページには移動に配慮が必要な方の施設がないと記載されているため、アクセス条件は訪問前に再確認してください。'
        },
        casaAranda: {
          title: 'Casa Aranda · チュロスとチョコレート',
          body: '公式観光案内では、Casa Arandaはコーヒー、チョコレート、チュロスを提供するカフェとして紹介され、テラスも案内されています。住所はHerrería del Rey 3, Málaga 29005です。営業時間・価格・アクセス条件は確認できていないため、訪問前に店舗へお問い合わせください。'
        },
        pedregalejo: {
          title: 'Pedregalejo海岸のエスペト',
          body: '小さな入り江や昔の漁師の家が残る旧漁村の海岸Pedregalejoでは、Baños del CarmenからEl Paloまでの海辺のチリンギートがエスペトの名所として紹介されています。一般的なエスペト案内を繰り返すのではなく、この海岸地域ならではの食文化を補足します。各店の営業・メニューは当日に確認してください。夕日の見え方は場所・日付・天候・視界によって異なり、保証できません。'
        },
        romanRoute: {
          title: 'アルカサビリャ通り（Calle Alcazabilla）· ローマ劇場とアルカサバ',
          body: 'マラガ旧市街のCalle Alcazabillaでは、ローマ劇場とその上のアルカサバを一緒に眺められます。市の考古学案内によると、通りの南北軸は古代ローマのフォルムの幹線道路カルドと重なります。劇場はアウグストゥス時代の紀元1世紀に建てられ、3世紀に使われなくなり、1951年に再発見されました。石や柱の一部は後にアルカサバへ再利用されました。観光局は城塞がバディスの命で1057～1063年に築かれたと説明しています。通りから外観を楽しみ、内部の開放・料金・アクセスは各施設で確認し、共通券があるとは限りません。アルカサバには坂や階段がある場合があり、全区間が平坦・段差なしとは保証できません。高温警報時に劇場が臨時閉鎖される場合があります。'
        },
        laConcepcion: {
          title: 'Jardín Botánico-Histórico La Concepción',
          body: '庭園の運営者公式案内によると、5大陸の2,400種以上があり、マラガ中心部から約6 kmです。市中心部の散策コースとは分けて、交通手段を計画してください。公式ページ間でアクセス案内に違いがあるため、訪問日のルートは庭園とEMTの最新情報で、開園日・時間とともに確認してください。'
        },
        plazaMayor: {
          title: 'マラガのPlaza Mayorはショッピングセンター',
          body: 'マラガのPlaza Mayorは、公式観光サイトがショッピング・レジャー施設として紹介する商業施設で、都心の中央広場ではありません。マドリードの歴史的なPlaza Mayorと区別するため、「マラガのPlaza Mayorショッピングセンター」と表記してください。'
        }
      }
    },
    zh: {
      sourceLabel: '官方与参考来源',
      topics: {
        atarazanas: {
          title: '阿塔拉萨纳斯中央市场（Mercado Central de Atarazanas）',
          body: '马拉加市政府公布该市场周一至周六08:00–15:00营业，共有260个摊位。19世纪的市场建筑内经营生鲜和本地食品，正立面保留着旧纪念门。该时间是市场整体信息，不保证各摊位营业或有货；网页未列周日营业。市政府页面注明没有为行动不便访客设置相关设施，出行前请再次确认通行条件。'
        },
        casaAranda: {
          title: 'Casa Aranda · 吉事果与巧克力',
          body: '官方旅游信息将Casa Aranda介绍为供应咖啡、巧克力和吉事果的咖啡馆，服务项目还列有露台。所列地址为Herrería del Rey 3, Málaga 29005。营业时间、价格和通行条件未能核实，请到访前向店家确认。'
        },
        pedregalejo: {
          title: 'Pedregalejo海滩的espeto',
          body: '在保留小海湾和昔日渔民住宅的Pedregalejo旧渔村海岸，从Baños del Carmen到El Palo一带的海滨小馆（chiringuito）与品尝espeto的地方相关。这是补充espeto的一处海岸地域体验，而非重复介绍这道菜本身。请当天向各店确认营业和菜单。日落能否看见取决于观景位置、日期、天气和视线，不能保证。'
        },
        romanRoute: {
          title: '阿尔卡萨比亚街（Calle Alcazabilla）· 罗马剧场与阿尔卡萨瓦',
          body: '在马拉加旧城区的Calle Alcazabilla，可一同看到罗马剧场和上方的阿尔卡萨瓦。市政府考古指南称，街道的南北轴线与古罗马广场的主要道路cardo重合。剧场建于奥古斯都时期的公元1世纪，3世纪停用，1951年重新发现。部分石材和柱子后来用于阿尔卡萨瓦。马拉加旅游局称城堡由巴迪斯下令于1057至1063年修建。可从街上欣赏外景；参观内部请分别确认开放、费用和通行条件，不要假定有联票。阿尔卡萨瓦内可能有坡道或台阶，不能保证全程平坦或无台阶。高温警报期间剧场可能临时关闭。'
        },
        laConcepcion: {
          title: 'Jardín Botánico-Histórico La Concepción植物园',
          body: '植物园运营方官网称，这里拥有来自五大洲的2,400多种植物，距马拉加市中心约6公里。它不在市中心步行游览范围内，应另行规划交通。官方网页的到达说明存在差异，请在出发前查看植物园和EMT的最新路线、开放日期与时间。'
        },
        plazaMayor: {
          title: '马拉加 Plaza Mayor 是购物中心',
          body: '马拉加的Plaza Mayor是官方旅游网站列出的购物与休闲中心，并非市中心广场。建议写作“马拉加 Plaza Mayor购物中心”，以免与马德里的历史广场Plaza Mayor混淆。'
        }
      }
    }
  };

  var SOURCES = {
    atarazanas: [
      { url: 'https://www.malaga.eu/la-ciudad/instalaciones-y-espacios/detalle-de-la-instalacion/?id=160', label: { ko: '말라가 시청: Atarazanas 시장', en: 'Málaga City Council: Atarazanas Market', ja: 'マラガ市：アタラサナス市場', zh: '马拉加市政府：阿塔拉萨纳斯市场' } },
      { url: 'https://visita.malaga.eu/es/que-ver-y-hacer/visitas/monumentos-historicos/edificios-notables/mercado-central-de-atarazanas-p107808', label: { ko: 'Visita Málaga: Atarazanas 시장 역사·품목', en: 'Visita Málaga: market history and products', ja: 'Visita Málaga：市場の歴史・品目', zh: 'Visita Málaga：市场历史与商品' } }
    ],
    casaAranda: [
      { url: 'https://www.visitacostadelsol.com/que-hacer/casa-aranda-p62121', label: { ko: 'Costa del Sol 공식 관광 안내: Casa Aranda', en: 'Costa del Sol official tourism: Casa Aranda', ja: 'Costa del Sol公式観光案内：Casa Aranda', zh: 'Costa del Sol官方旅游信息：Casa Aranda' } },
      { url: 'https://blog.visitacostadelsol.com/en/four-irresistible-coffee-spots-in-malaga', label: { ko: 'Costa del Sol 관광 블로그: 말라가 카페', en: 'Costa del Sol tourism blog: Málaga cafés', ja: 'Costa del Sol観光ブログ：マラガのカフェ', zh: 'Costa del Sol旅游博客：马拉加咖啡馆' } }
    ],
    pedregalejo: [
      { url: 'https://visita.malaga.eu/es/que-hacer/chiringuitos-de-pedregalejo-p103628', label: { ko: 'Visita Málaga: Pedregalejo chiringuitos', en: 'Visita Málaga: Pedregalejo beach bars', ja: 'Visita Málaga：Pedregalejoの海辺の店', zh: 'Visita Málaga：Pedregalejo海滨餐馆' } },
      { url: 'https://visita.malaga.eu/es/que-ver-y-hacer/blog/de-ruta-por-malaga-este-tradicion-pesquera-playas-y-gastronomia-marinera-p1678', label: { ko: 'Visita Málaga: 동부 해안 어업·해변·해산물', en: 'Visita Málaga: eastern coast, fishing and seafood', ja: 'Visita Málaga：東部海岸の漁業・ビーチ・海鮮', zh: 'Visita Málaga：东海岸渔业、海滩与海鲜' } },
      { url: 'https://www.visitacostadelsol.com/malaga-costa-del-sol/the-best-beaches-on-the-costa-del-sol/pedregalejo-las-acacias-beach-p20501', label: { ko: 'Visit Costa del Sol: Pedregalejo 해변', en: 'Visit Costa del Sol: Pedregalejo beach', ja: 'Visit Costa del Sol：Pedregalejo海岸', zh: 'Visit Costa del Sol：Pedregalejo海滩' } }
    ],
    romanRoute: [
      { url: 'https://rutasarqueologicas.malaga.eu/punto-n-26/', label: { ko: '말라가 시 고고학 코스: 알카사비야 거리', en: 'Málaga archaeological route: Alcazabilla Street', ja: 'マラガ市考古学ルート：アルカサビリャ通り', zh: '马拉加市考古路线：阿尔卡萨比亚街' } },
      { url: 'https://visita.malaga.eu/en/what-to-see-and-do/culture/historic-monuments/monuments/alcazaba-p103303', label: { ko: '말라가 관광청: 알카사바', en: 'Málaga Tourism: Alcazaba', ja: 'マラガ観光局：アルカサバ', zh: '马拉加旅游局：阿尔卡萨瓦' } },
      { url: 'https://visita.malaga.eu/en/what-to-see-and-do/culture/historic-monuments/monuments/teatro-romano-p103562', label: { ko: '말라가 관광청: Roman Theatre', en: 'Málaga Tourism: Roman Theatre', ja: 'マラガ観光局：ローマ劇場', zh: '马拉加旅游局：罗马剧场' } },
      { url: 'https://www.juntadeandalucia.es/aaiicc/enclaves/enclave-arqueologico-teatro-romano-de-malaga', label: { ko: '안달루시아 문화유산 기관: Roman Theatre', en: 'Andalusia heritage authority: Roman Theatre', ja: 'アンダルシア文化遺産機関：ローマ劇場', zh: '安达卢西亚文化遗产机构：罗马剧场' } },
      { url: 'https://alcazabaygibralfaro.malaga.eu/es/visitas/horarios-y-tarifas/', label: { ko: '알카사바 공식 운영기관: 시간·요금', en: 'Alcazaba operator: hours and fares', ja: 'アルカサバ運営機関：時間・料金', zh: '阿尔卡萨瓦运营机构：时间与票价' } }
    ],
    laConcepcion: [
      { url: 'https://laconcepcion.malaga.eu/es/', label: { ko: 'La Concepción 식물원 공식 홈페이지', en: 'La Concepción official garden site', ja: 'La Concepción植物園公式サイト', zh: 'La Concepción植物园官网' } },
      { url: 'https://laconcepcion.malaga.eu/en/visits/', label: { ko: '식물원 공식 방문·교통 안내', en: 'Official garden visits and directions', ja: '植物園公式の見学・アクセス案内', zh: '植物园官方参观与交通信息' } },
      { url: 'https://www.emtmalaga.es/emt-mobile/informacionLinea.html?codLinea=20&sentido=1', label: { ko: 'EMT Málaga: 20번 노선 공식 정보', en: 'EMT Málaga: official route 20 information', ja: 'EMT Málaga：20番路線の公式情報', zh: 'EMT Málaga：20路官方信息' } },
      { url: 'https://visita.malaga.eu/es/que-ver-y-hacer/visitas/monumentos-historicos/parques-y-jardines-historicos/jardin-botanico-historico-la-concepcion-p103600', label: { ko: 'Visita Málaga: 식물원 안내', en: 'Visita Málaga: garden information', ja: 'Visita Málaga：植物園案内', zh: 'Visita Málaga：植物园信息' } }
    ],
    plazaMayor: [
      { url: 'https://visita.malaga.eu/en/what-to-see-and-do/shopping/shopping-centres/plaza-mayor-shopping-mall-p103466', label: { ko: '말라가 관광청: Plaza Mayor 쇼핑센터', en: 'Málaga Tourism: Plaza Mayor Shopping Mall', ja: 'マラガ観光局：Plaza Mayorショッピングモール', zh: '马拉加旅游局：Plaza Mayor购物中心' } },
      { url: 'https://www.plazamayor.es/', label: { ko: 'Plaza Mayor 공식 운영자 사이트', en: 'Plaza Mayor official operator site', ja: 'Plaza Mayor公式運営サイト', zh: 'Plaza Mayor官方运营方网站' } }
    ]
  };

  var ALIASES = {
    atarazanas: [
      'mercado central de atarazanas', 'mercado de atarazanas', 'atarazanas market', 'atarazanas',
      '아타라사나스 시장', '말라가 아타라사나스', 'アタラサナス中央市場', 'アタラサナス市場',
      '阿塔拉萨纳斯中央市场', '阿塔拉萨纳斯市场'
    ],
    casaAranda: [
      'casa aranda', 'churros casa aranda', 'casa aranda churros', '말라가 카사 아란다', '카사 아란다',
      'カサ・アランダ', 'カサ アランダ', '马拉加卡萨阿兰达', '卡萨阿兰达'
    ],
    pedregalejo: [
      'pedregalejo', 'pedregalejo espeto', 'espeto pedregalejo', 'espeto at pedregalejo',
      '페드레갈레호', '페드레갈레호 에스페토', 'エスペト ペドレガレホ', 'ペドレガレホ',
      'Pedregalejo海滩', 'Pedregalejo海岸', '佩德雷加莱霍', '佩德雷加莱霍espeto'
    ],
    romanRoute: [
      'calle alcazabilla', 'alcazabilla street', 'alcazabilla', '알카사비야 거리', '알카사비야', 'アルカサビリャ通り', 'アルカサビリャ', '阿尔卡萨比亚街',
      'roman theatre', 'roman theater', 'teatro romano', 'roman theatre alcazaba', 'roman theater alcazaba',
      'alcazaba roman theatre', 'alcazaba roman theater', '로마 극장', '로마극장', '알카사바 로마극장',
      'ローマ劇場', 'ローマ劇場 アルカサバ', 'ローマ劇場とアルカサバ', '罗马剧场', '罗马剧场 阿尔卡萨瓦'
    ],
    laConcepcion: [
      'la concepcion', 'jardin botanico la concepcion', 'la concepcion botanical garden',
      '라 콘셉시온 식물원', '라 콘셉시온', 'ラ・コンセプシオン植物園', 'ラ コンセプシオン',
      '拉孔塞普西翁植物园', '拉孔塞普西翁'
    ]
  };

  function getLanguage(value) {
    var key = String(value || '').toLowerCase().split(/[-_]/)[0];
    return LANGS.indexOf(key) >= 0 ? key : 'en';
  }

  function normalize(value) {
    return String(value == null ? '' : value).toLocaleLowerCase().normalize('NFKC')
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '').normalize('NFC')
      .replace(/[’']/g, '').replace(/[\s\u3000]+/g, ' ').trim();
  }

  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, function (char) {
      return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char];
    });
  }

  function containsAlias(query, alias) {
    var normalizedAlias = normalize(alias);
    if (!normalizedAlias) return false;
    if (/^[\x00-\x7f]+$/.test(normalizedAlias)) {
      var escaped = normalizedAlias.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      return new RegExp('(^|[^a-z0-9])' + escaped + '([^a-z0-9]|$)', 'i').test(query);
    }
    return query.indexOf(normalizedAlias) !== -1;
  }

  function hasAny(query, aliases) {
    return aliases.some(function (alias) { return containsAlias(query, alias); });
  }

  function selectTopic(query) {
    var normalized = normalize(query);
    if (!normalized) return null;

    var malaga = hasAny(normalized, ['malaga', 'málaga', '말라가', 'マラガ', '马拉加']);
    var madrid = hasAny(normalized, ['madrid', '마드리드', 'マドリード', '马德里']);
    var plazaMention = hasAny(normalized, ['plaza mayor', '플라자 마요르', 'プラサ・マヨール', '普拉萨马约尔']);

    if (plazaMention && malaga && !madrid) return 'plazaMayor';
    if (hasAny(normalized, ALIASES.romanRoute) ||
      (malaga && hasAny(normalized, ['alcazaba', '알카사바', 'アルカサバ', '阿尔卡萨瓦']))) return 'romanRoute';
    if (hasAny(normalized, ALIASES.laConcepcion)) return 'laConcepcion';
    if (hasAny(normalized, ALIASES.casaAranda)) return 'casaAranda';
    if (hasAny(normalized, ALIASES.pedregalejo)) return 'pedregalejo';
    if (hasAny(normalized, ALIASES.atarazanas)) return 'atarazanas';
    return null;
  }

  function renderAddition(topicKey, lang) {
    var data = COPY[lang].topics[topicKey];
    var details = document.createElement('details');
    details.className = 'gm-guide-topic gm-guide-place-addition';
    details.id = 'gm-guide-' + topicKey;

    var summary = document.createElement('summary');
    summary.textContent = data.title;
    details.appendChild(summary);

    var content = document.createElement('div');
    content.className = 'gm-guide-topic-content';
    var paragraph = document.createElement('p');
    paragraph.textContent = data.body;
    content.appendChild(paragraph);

    var list = document.createElement('ul');
    list.className = 'gm-guide-sources';
    SOURCES[topicKey].forEach(function (source) {
      var item = document.createElement('li');
      var link = document.createElement('a');
      link.href = source.url;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.textContent = source.label[lang];
      item.appendChild(link);
      list.appendChild(item);
    });
    content.appendChild(list);
    details.appendChild(content);
    return details;
  }

  function renderAdditions(lang) {
    var mount = document.getElementById('granada-malaga-general-guide');
    if (!mount) return;
    var groups = mount.querySelectorAll('.gm-guide-group');
    if (groups.length < 2) return;
    var malagaGroup = groups[1];
    var oldBlock = malagaGroup.querySelector('.gm-guide-place-additions');
    if (oldBlock) oldBlock.remove();

    var wrapper = document.createElement('div');
    wrapper.className = 'gm-guide-place-additions';
    ['casaAranda', 'pedregalejo', 'romanRoute', 'laConcepcion', 'plazaMayor'].forEach(function (key) {
      wrapper.appendChild(renderAddition(key, lang));
    });
    malagaGroup.appendChild(wrapper);
  }

  function buildAdditionResponse(query, lang) {
    var topicKey = selectTopic(query);
    if (!topicKey) return null;
    var currentLang = getLanguage(lang);
    var data = COPY[currentLang].topics[topicKey];
    var links = SOURCES[topicKey].map(function (source) {
      return '<a href="' + escapeHtml(source.url) + '" target="_blank" rel="noopener noreferrer">' +
        escapeHtml(source.label[currentLang]) + ' ↗</a>';
    }).join('<br>');
    return '<strong>' + escapeHtml(data.title) + '</strong><br>' + escapeHtml(data.body) +
      '<br><br>' + escapeHtml(COPY[currentLang].sourceLabel) + ':<br>' + links;
  }

  var previousRender = window.renderGranadaMalagaGeneralGuide;
  if (typeof previousRender === 'function') {
    window.renderGranadaMalagaGeneralGuide = function (lang) {
      var rendered = previousRender.apply(this, arguments);
      if (rendered) renderAdditions(getLanguage(lang));
      return rendered;
    };
  }

  var previousChat = window.buildGranadaMalagaGeneralChatResponse;
  window.buildGranadaMalagaGeneralChatResponse = function (query, lang) {
    return buildAdditionResponse(query, lang) ||
      (typeof previousChat === 'function' ? previousChat.apply(this, arguments) : null);
  };
}());
