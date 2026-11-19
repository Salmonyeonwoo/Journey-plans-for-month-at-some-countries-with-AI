(function () {
  'use strict';

  var LANGS = ['ko', 'en', 'ja', 'zh'];
  var COPY = {
    ko: {
      heading: '세비야 독립 명소·음식 안내',
      intro: '기존 일정과 별도로 참고할 수 있는 세비야의 명소와 음식 정보입니다. 입장·운영·현장 접근 조건은 방문 전 공식 안내에서 확인하세요.',
      sourcesLabel: '관련 공식·참고 링크',
      topics: {
        pilatos: {
          title: '카사 데 필라토스 (Casa de Pilatos)',
          body: '15~16세기에 형성된 귀족 저택으로 고딕-무데하르 양식과 르네상스 요소가 함께 보입니다. 타일 장식 중정과 정원이 특징이며, 전체 관람에는 위층과 장식 계단이 포함될 수 있습니다. 위층을 포함한 관람 범위와 접근 조건은 방문 전에 운영처에 확인하세요.',
          sources: [
            ['메디나셀리 재단: 필라토스 저택', 'https://fundacionmedinaceli.org/en/monuments/house-of-pilate/'],
            ['세비야 관광청: 필라토스 저택', 'https://visitasevilla.es/en/pilatos-house/']
          ]
        },
        archivo: {
          title: '인디아스 고문서관 (Archivo General de Indias)',
          body: '세비야 대성당·알카사르와 함께 유네스코 세계유산을 이루는 기록 보관소입니다. 15~19세기 아메리카와 필리핀 제국 행정 기록, 지도와 도면을 보존하며 마젤란-엘카노 관련 자료도 일부 있습니다(탐험가들의 항해일지를 모두 소장한다는 뜻은 아닙니다). 일반 관람은 현재 무료로 안내되지만 요금·조건은 바뀔 수 있습니다. 거동이 불편한 방문객의 건물 출입은 플라사 델 트리운포 쪽에서 직원에게 전화해 도움을 요청하도록 안내되어 있습니다. 이는 전체 동선의 접근성을 보장하는 뜻이 아닙니다.',
          sources: [
            ['유네스코: 세비야 대성당·알카사르·인디아스 고문서관', 'https://whc.unesco.org/en/list/383/'],
            ['스페인 문화부: 관람 안내', 'https://www.cultura.gob.es/cultura/areas/archivos/mc/archivos/agi/visitas.html'],
            ['스페인 문화부: 문서 컬렉션 소개', 'https://www.cultura.gob.es/cultura/areas/archivos/mc/archivos/agi/fondos-documentales/introduccion.html'],
            ['스페인 문화부: 마젤란·엘카노 관련 전시', 'https://www.cultura.gob.es/cultura/areas/archivos/mc/archivos/agi/exposiciones-y-actividades/exposiciones/el-viaje-mas-largo.html']
          ]
        },
        maestranza: {
          title: '레알 마에스트란사 투우장 (Plaza de Toros de la Real Maestranza)',
          body: '건축은 1761~1881년에 걸쳐 진행됐습니다. 관람 시설에는 투우 역사 박물관이 있으며 회화와 판화 등을 볼 수 있습니다. 방문 방식과 관람 조건은 달라질 수 있으므로 이용 전 운영처 안내를 확인하세요. 이 안내는 투우 행사 일정이나 관람 시간을 제시하지 않습니다.',
          sources: [
            ['레알 마에스트란사: 건축 역사', 'https://www.realmaestranza.com/en/royal-bullring/history-of-the-construction/'],
            ['세비야 투우장 관람 안내', 'https://visitaplazadetorosdesevilla.com/en/how-to-visit/']
          ]
        },
        comercio: {
          title: '바르 엘 코메르시오 (Bar El Comercio)',
          body: '지역 언론 보도에 따르면 이 바는 1904년에 설립됐고, 추로스는 나중에 메뉴에 더해졌습니다. 추로스와 초콜릿을 제공한다는 참고 안내가 있습니다. 현재 메뉴와 영업 여부·시간은 여기서 보장하지 않으므로 방문 전에 확인하세요.',
          sources: [
            ['La Voz del Sur: 바르 엘 코메르시오의 역사', 'https://www.lavozdelsur.es/la-voz-seleccion/reportajes/el-bar-de-sevilla-donde-comerciantes-y-vecinos-se-sienten-como-en-casa-desde-hace-mas-de-un-siglo_263026_102.html'],
            ['Azahar Sevilla: 바르 엘 코메르시오 참고 안내', 'https://azahar-sevilla.com/sevilletapas/bar-el-comercio/']
          ]
        },
        tapas: {
          title: '세비야 타파스와 시장 위치 참고',
          body: '세비야의 전통 음식 예시로 시금치와 병아리콩(Espinacas con garbanzos), 볼살 조림(carrillada), 대구 튀김 파비아스(pavías de bacalao), 생선 튀김(fried fish), 살모레호(salmorejo)가 소개됩니다. 사용자는 구시가지 C. Albareda 5의 Bodega Góngora를 강력 추천하며, 양에 비해 가격이 합리적이라고 평가했습니다(개인 방문 추천). 방문 전 공식 메뉴와 현행 가격을 확인하세요. 실제 제공 여부는 가게와 시기에 따라 다르며, 음료와 함께 무료로 나온다고 가정하지 마세요. 위치 정정: La Cantina는 트리아나 시장이 아니라 페리아 시장(Mercado de Feria, Calle Feria)에 있습니다.',
          sources: [
            ['세비야 관광청: 타파스', 'https://www.legacy.visitasevilla.es/en/tapas'],
            ['세비야 관광청: 타파스로 세비야 알아보기', 'https://visitasevilla.es/en/discover-seville-through-its-tapas/'],
            ['트리아나 시장 공식 안내', 'https://visitasevilla.es/en/mercado-de-triana/'],
            ['Bodega Góngora: 공식 메뉴', 'https://www.bodegagongora.com/carta/'],
            ['Bodega Góngora: 공식 주소·안내', 'https://www.bodegagongora.com/'],
            ['La Cantina: 주소 및 안내', 'https://la-cantina.metro.bar/?lang=en']
          ]
        }
      }
    },
    en: {
      heading: 'Seville: independent places & food guide',
      intro: 'A short general reference to complement—not replace—the existing personal itinerary. Check official visitor information for current entry, opening and on-site access conditions.',
      sourcesLabel: 'Related official and reference links',
      topics: {
        pilatos: {
          title: 'Casa de Pilatos',
          body: 'This 15th–16th-century noble residence combines Gothic-Mudéjar and Renaissance elements. Notable features include a tiled courtyard and gardens. A fuller visit may include the upper floor and its decorative staircase; confirm the included areas and access conditions with the venue before visiting.',
          sources: [
            ['Fundación Medinaceli: House of Pilate', 'https://fundacionmedinaceli.org/en/monuments/house-of-pilate/'],
            ['Seville Tourism: Pilatos House', 'https://visitasevilla.es/en/pilatos-house/']
          ]
        },
        archivo: {
          title: 'Archivo General de Indias (General Archive of the Indies)',
          body: 'Together with Seville Cathedral and the Alcázar, the archive forms a UNESCO-listed World Heritage property. Its holdings include 15th–19th-century records of imperial administration in the Americas and the Philippines, as well as maps and plans; some material relates to Magellan and Elcano, not the complete logs of all explorers. General admission is currently listed as free, but fees and conditions can change. For building access from Plaza del Triunfo, visitors with reduced mobility are directed to call staff for assistance. This is not a guarantee of accessibility throughout the site.',
          sources: [
            ['UNESCO: Cathedral, Alcázar and Archivo de Indias', 'https://whc.unesco.org/en/list/383/'],
            ['Spain’s Ministry of Culture: visitor information', 'https://www.cultura.gob.es/cultura/areas/archivos/mc/archivos/agi/visitas.html'],
            ['Spain’s Ministry of Culture: collection introduction', 'https://www.cultura.gob.es/cultura/areas/archivos/mc/archivos/agi/fondos-documentales/introduccion.html'],
            ['Spain’s Ministry of Culture: Magellan–Elcano exhibition', 'https://www.cultura.gob.es/cultura/areas/archivos/mc/archivos/agi/exposiciones-y-actividades/exposiciones/el-viaje-mas-largo.html']
          ]
        },
        maestranza: {
          title: 'Plaza de Toros de la Real Maestranza',
          body: 'Construction took place from 1761 to 1881. The visitor facilities include a museum with paintings and prints. Visit formats and conditions can vary, so check the venue’s current information before going. This guide does not state event dates or tour duration.',
          sources: [
            ['Real Maestranza: construction history', 'https://www.realmaestranza.com/en/royal-bullring/history-of-the-construction/'],
            ['Seville Bullring: how to visit', 'https://visitaplazadetorosdesevilla.com/en/how-to-visit/']
          ]
        },
        comercio: {
          title: 'Bar El Comercio',
          body: 'Regional reporting says the bar was founded in 1904 and added churros later. A reference guide lists churros and chocolate. Current menu, opening status and hours are not guaranteed here; check before visiting.',
          sources: [
            ['La Voz del Sur: history of Bar El Comercio', 'https://www.lavozdelsur.es/la-voz-seleccion/reportajes/el-bar-de-sevilla-donde-comerciantes-y-vecinos-se-sienten-como-en-casa-desde-hace-mas-de-un-siglo_263026_102.html'],
            ['Azahar Sevilla: Bar El Comercio reference', 'https://azahar-sevilla.com/sevilletapas/bar-el-comercio/']
          ]
        },
        tapas: {
          title: 'Seville tapas & a market-location note',
          body: 'Examples of traditional Seville dishes include spinach with chickpeas (espinacas con garbanzos), braised pork cheek (carrillada), cod pavías, fried fish and salmorejo. The user also strongly recommends Bodega Góngora at C. Albareda 5 in the Old Town, noting good value for portion size; this is a personal experience. Check its official menu and current prices before visiting. Availability varies by venue and time; do not assume a dish is served or included free with a drink. Location correction: La Cantina is at Mercado de Feria on Calle Feria, not Triana Market.',
          sources: [
            ['Seville Tourism: tapas', 'https://www.legacy.visitasevilla.es/en/tapas'],
            ['Seville Tourism: discover Seville through its tapas', 'https://visitasevilla.es/en/discover-seville-through-its-tapas/'],
            ['Triana Market: official visitor information', 'https://visitasevilla.es/en/mercado-de-triana/'],
            ['Bodega Góngora: official menu', 'https://www.bodegagongora.com/carta/'],
            ['Bodega Góngora: official address and information', 'https://www.bodegagongora.com/'],
            ['La Cantina: address and information', 'https://la-cantina.metro.bar/?lang=en']
          ]
        }
      }
    },
    ja: {
      heading: 'セビリアの独立スポット・食ガイド',
      intro: '既存の個人旅行日程とは別に参照できる、セビリアの基本情報です。入場・営業・現地でのアクセス条件は訪問前に公式情報をご確認ください。',
      sourcesLabel: '関連する公式・参考リンク',
      topics: {
        pilatos: {
          title: 'カサ・デ・ピラトス（Casa de Pilatos）',
          body: '15～16世紀に築かれた貴族の邸宅で、ゴシック・ムデハル様式とルネサンス様式が見られます。タイル張りの中庭や庭園が特徴です。上階と装飾階段を含む見学もありますが、見学範囲やアクセス条件は訪問前に施設へご確認ください。',
          sources: [
            ['メディナセリ財団：ピラトの家', 'https://fundacionmedinaceli.org/en/monuments/house-of-pilate/'],
            ['セビリア観光局：ピラトスの家', 'https://visitasevilla.es/en/pilatos-house/']
          ]
        },
        archivo: {
          title: 'インディアス総合古文書館（Archivo General de Indias）',
          body: 'セビリア大聖堂・アルカサルとともにユネスコ世界遺産を構成する文書館です。15～19世紀のアメリカ・フィリピンにおける帝国行政記録、地図や図面を所蔵し、マゼラン／エルカーノ関連資料も一部あります（すべての探検家の航海日誌を所蔵するという意味ではありません）。一般見学は現在無料と案内されていますが、料金や条件は変更されることがあります。移動に配慮が必要な方の建物への入場は、プラサ・デル・トリウンフォ側からスタッフに電話して支援を依頼するよう案内されています。施設全体のアクセシビリティを保証するものではありません。',
          sources: [
            ['ユネスコ：大聖堂・アルカサル・インディアス古文書館', 'https://whc.unesco.org/en/list/383/'],
            ['スペイン文化省：見学案内', 'https://www.cultura.gob.es/cultura/areas/archivos/mc/archivos/agi/visitas.html'],
            ['スペイン文化省：所蔵資料の紹介', 'https://www.cultura.gob.es/cultura/areas/archivos/mc/archivos/agi/fondos-documentales/introduccion.html'],
            ['スペイン文化省：マゼラン・エルカーノ関連展示', 'https://www.cultura.gob.es/cultura/areas/archivos/mc/archivos/agi/exposiciones-y-actividades/exposiciones/el-viaje-mas-largo.html']
          ]
        },
        maestranza: {
          title: 'レアル・マエストランサ闘牛場（Plaza de Toros de la Real Maestranza）',
          body: '建設は1761年から1881年にかけて行われました。見学施設には絵画や版画を展示する博物館があります。見学方法や条件は変わることがあるため、訪問前に施設の最新案内をご確認ください。開催日や見学所要時間は記載していません。',
          sources: [
            ['レアル・マエストランサ：建設の歴史', 'https://www.realmaestranza.com/en/royal-bullring/history-of-the-construction/'],
            ['セビリア闘牛場：見学案内', 'https://visitaplazadetorosdesevilla.com/en/how-to-visit/']
          ]
        },
        comercio: {
          title: 'バル・エル・コメルシオ（Bar El Comercio）',
          body: '地域報道によると1904年創業で、チュロスは後にメニューへ加わりました。参考案内ではチュロスとチョコレートを提供すると紹介されています。現在のメニュー、営業状況・時間は保証していないため、訪問前にご確認ください。',
          sources: [
            ['La Voz del Sur：バル・エル・コメルシオの歴史', 'https://www.lavozdelsur.es/la-voz-seleccion/reportajes/el-bar-de-sevilla-donde-comerciantes-y-vecinos-se-sienten-como-en-casa-desde-hace-mas-de-un-siglo_263026_102.html'],
            ['Azahar Sevilla：バル・エル・コメルシオ参考情報', 'https://azahar-sevilla.com/sevilletapas/bar-el-comercio/']
          ]
        },
        tapas: {
          title: 'セビリアのタパスと市場の場所について',
          body: 'セビリアの伝統料理の例として、ほうれん草とひよこ豆（espinacas con garbanzos）、豚ほほ肉の煮込み（carrillada）、タラのフライ（pavías de bacalao）、魚のフライ、サルモレホがあります。ユーザーは旧市街C. Albareda 5のBodega Góngoraを強くおすすめし、量に対して価格も手頃との個人的な評価です。訪問前に公式メニューと最新価格をご確認ください。料理の提供状況は店や時期によって異なり、飲み物に無料で付くとは限りません。場所の訂正：La Cantinaはトリアナ市場ではなく、Calle Feriaにあるフェリア市場（Mercado de Feria）にあります。',
          sources: [
            ['セビリア観光局：タパス', 'https://www.legacy.visitasevilla.es/en/tapas'],
            ['セビリア観光局：タパスで知るセビリア', 'https://visitasevilla.es/en/discover-seville-through-its-tapas/'],
            ['トリアナ市場：公式案内', 'https://visitasevilla.es/en/mercado-de-triana/'],
            ['Bodega Góngora：公式メニュー', 'https://www.bodegagongora.com/carta/'],
            ['Bodega Góngora：公式所在地・案内', 'https://www.bodegagongora.com/'],
            ['La Cantina：所在地・案内', 'https://la-cantina.metro.bar/?lang=en']
          ]
        }
      }
    },
    zh: {
      heading: '塞维利亚独立景点与美食指南',
      intro: '这里提供可独立参考的塞维利亚景点与美食信息，不改变现有个人行程。入场、营业及现场通行条件请在出发前查看官方信息。',
      sourcesLabel: '相关官方与参考链接',
      topics: {
        pilatos: {
          title: '皮拉托之家（Casa de Pilatos）',
          body: '这座贵族宅邸形成于15至16世纪，融合哥特-穆德哈尔与文艺复兴元素。特色包括铺设瓷砖的庭院和花园。较完整的参观可能包括上层及装饰楼梯；请在到访前向场馆确认参观范围和通行条件。',
          sources: [
            ['梅迪纳塞利基金会：皮拉托之家', 'https://fundacionmedinaceli.org/en/monuments/house-of-pilate/'],
            ['塞维利亚旅游局：皮拉托之家', 'https://visitasevilla.es/en/pilatos-house/']
          ]
        },
        archivo: {
          title: '印度档案总馆（Archivo General de Indias）',
          body: '它与塞维利亚大教堂、王宫共同构成联合国教科文组织世界遗产。馆藏包括15至19世纪美洲和菲律宾帝国行政档案、地图和图纸，也有部分麦哲伦—埃尔卡诺相关资料（并非收藏了所有探险家的航海日志）。目前官方列示普通参观免费，但费用与条件可能变化。行动不便的访客从凯旋广场（Plaza del Triunfo）一侧进入建筑时，官方指示致电工作人员请求协助；这不代表整个场馆均可无障碍通行。',
          sources: [
            ['联合国教科文组织：大教堂、王宫与印度档案总馆', 'https://whc.unesco.org/en/list/383/'],
            ['西班牙文化部：参观信息', 'https://www.cultura.gob.es/cultura/areas/archivos/mc/archivos/agi/visitas.html'],
            ['西班牙文化部：馆藏介绍', 'https://www.cultura.gob.es/cultura/areas/archivos/mc/archivos/agi/fondos-documentales/introduccion.html'],
            ['西班牙文化部：麦哲伦—埃尔卡诺相关展览', 'https://www.cultura.gob.es/cultura/areas/archivos/mc/archivos/agi/exposiciones-y-actividades/exposiciones/el-viaje-mas-largo.html']
          ]
        },
        maestranza: {
          title: '皇家骑士团斗牛场（Plaza de Toros de la Real Maestranza）',
          body: '斗牛场建于1761至1881年。参观设施内设有博物馆，展出绘画和版画等。参观方式与条件可能变化，请在到访前查看场馆最新信息。本指南不提供活动日期或参观时长。',
          sources: [
            ['皇家骑士团：建筑历史', 'https://www.realmaestranza.com/en/royal-bullring/history-of-the-construction/'],
            ['塞维利亚斗牛场：参观指南', 'https://visitaplazadetorosdesevilla.com/en/how-to-visit/']
          ]
        },
        comercio: {
          title: 'El Comercio酒吧（Bar El Comercio）',
          body: '当地媒体报道该酒吧创立于1904年，吉事果（churros）是后来加入的。参考指南介绍其供应吉事果和巧克力。此处不保证现行菜单、营业状态或营业时间；到访前请核实。',
          sources: [
            ['La Voz del Sur：El Comercio酒吧的历史', 'https://www.lavozdelsur.es/la-voz-seleccion/reportajes/el-bar-de-sevilla-donde-comerciantes-y-vecinos-se-sienten-como-en-casa-desde-hace-mas-de-un-siglo_263026_102.html'],
            ['Azahar Sevilla：El Comercio酒吧参考信息', 'https://azahar-sevilla.com/sevilletapas/bar-el-comercio/']
          ]
        },
        tapas: {
          title: '塞维利亚塔帕斯与市场位置提示',
          body: '塞维利亚传统菜肴示例包括菠菜鹰嘴豆（espinacas con garbanzos）、炖猪脸颊肉（carrillada）、鳕鱼炸条（pavías de bacalao）、炸鱼和冷汤salmorejo。用户强烈推荐位于老城 C. Albareda 5 的 Bodega Góngora，并认为份量与价格相比很划算（个人体验）。到访前请查看官方菜单和当前价格。是否供应因店铺和时间而异；不要假定会供应或随饮料免费赠送。位置更正：La Cantina位于Calle Feria的费里亚市场（Mercado de Feria），不在特里亚纳市场。',
          sources: [
            ['塞维利亚旅游局：塔帕斯', 'https://www.legacy.visitasevilla.es/en/tapas'],
            ['塞维利亚旅游局：通过塔帕斯探索塞维利亚', 'https://visitasevilla.es/en/discover-seville-through-its-tapas/'],
            ['特里亚纳市场：官方信息', 'https://visitasevilla.es/en/mercado-de-triana/'],
            ['Bodega Góngora：官方菜单', 'https://www.bodegagongora.com/carta/'],
            ['Bodega Góngora：官方地址与信息', 'https://www.bodegagongora.com/'],
            ['La Cantina：地址与信息', 'https://la-cantina.metro.bar/?lang=en']
          ]
        }
      }
    }
  };

  var PHOTO_GUIDE_TOPICS = {
    plaza: {
      image: 'img/user-seville-landmarks/plaza-espana-tower-cropped.webp',
      ko: {
        title: '세비야 스페인 광장 쌍둥이 탑 (Torres de la Plaza de España)',
        body: '스페인 광장은 아니발 곤살레스가 1929년 이베로아메리카 박람회를 위해 설계했습니다. 남·북쪽 탑은 피뢰침을 제외해 각각 약 74.1m입니다. 안달루시아 문화유산 자료는 탑을 둘러싼 미술아카데미 등의 논쟁과 당시 도시 스카이라인의 변화를 기록하지만, “히랄다와 높이 경쟁을 벌였다”는 단정적 일화는 뒷받침하지 않습니다. 탑과 반원형 회랑, 운하, 스페인 각 지방을 그린 타일 벤치를 함께 살펴보세요.',
        imageAlt: '세비야 스페인 광장 탑으로 소개된 사용자 제공 사진', caption: '사용자 제공 사진',
        sources: [
          ['안달루시아 문화유산 일정: 세비야 스페인 광장', 'https://www.juntadeandalucia.es/cultura/agendaculturaldeandalucia/evento/plaza-de-espana-de-sevilla'],
          ['세비야대학교 연구: 스페인 광장 탑의 기초와 건축', 'https://idus.us.es/items/59a54a31-cbe0-46f2-b94f-ad708c5de39a'],
          ['세비야 관광청: 지역주의 건축 산책', 'https://visitasevilla.es/en/route-through-regionalist-seville-rediscover-the-city-through-its-architecture/']
        ]
      },
      en: {
        title: 'Plaza de España’s twin towers (Torres de la Plaza de España)',
        body: 'Aníbal González designed Plaza de España for the 1929 Ibero-American Exhibition. Its north and south towers are about 74.1 m high, excluding lightning rods. Andalusian heritage records describe debate involving the Academy of Fine Arts and a change to the city skyline, but do not substantiate the popular claim that the towers were built to compete with the Giralda in height. Look for the towers, semicircular arcade, canal and tiled benches depicting Spain’s provinces.',
        imageAlt: 'User-provided photo associated with the Plaza de España towers in Seville', caption: 'User-provided photo',
        sources: [
          ['Andalusia Cultural Heritage: Plaza de España in Seville', 'https://www.juntadeandalucia.es/cultura/agendaculturaldeandalucia/evento/plaza-de-espana-de-sevilla'],
          ['University of Seville research: foundations of the Plaza de España towers', 'https://idus.us.es/items/59a54a31-cbe0-46f2-b94f-ad708c5de39a'],
          ['Visit Seville: Regionalist Seville architecture route', 'https://visitasevilla.es/en/route-through-regionalist-seville-rediscover-the-city-through-its-architecture/']
        ]
      },
      ja: {
        title: 'セビリア・スペイン広場の双塔（Torres de la Plaza de España）',
        body: 'スペイン広場は、アニバル・ゴンサレスが1929年イベロアメリカ博覧会のために設計しました。南北の塔は避雷針を除き、それぞれ約74.1mです。アンダルシアの文化遺産資料は、美術アカデミーなどを巻き込んだ塔をめぐる論争と当時の市街景観の変化を記録していますが、「ヒラルダと高さを競うために建てた」とする逸話は裏付けられていません。双塔、半円形の回廊、運河、スペイン各地方を描いたタイル張りのベンチに注目してください。',
        imageAlt: 'セビリア・スペイン広場の塔として紹介された提供写真', caption: '提供写真',
        sources: [
          ['アンダルシア文化遺産情報：セビリアのスペイン広場', 'https://www.juntadeandalucia.es/cultura/agendaculturaldeandalucia/evento/plaza-de-espana-de-sevilla'],
          ['セビリア大学研究：スペイン広場双塔の基礎', 'https://idus.us.es/items/59a54a31-cbe0-46f2-b94f-ad708c5de39a'],
          ['Visit Seville：地域主義建築の街歩き', 'https://visitasevilla.es/en/route-through-regionalist-seville-rediscover-the-city-through-its-architecture/']
        ]
      },
      zh: {
        title: '塞维利亚西班牙广场双塔（Torres de la Plaza de España）',
        body: '西班牙广场由安尼巴尔·冈萨雷斯为1929年伊比利亚美洲博览会设计。南北两座塔高约74.1米（不含避雷针）。安达卢西亚文化遗产资料记载，双塔曾引发艺术学院等方面的争论，并改变了当时的城市天际线；但资料并未证实“建塔是为了与希拉尔达塔比高度”的说法。可留意双塔、半圆形回廊、运河，以及描绘西班牙各地区的瓷砖长椅。',
        imageAlt: '用户提供、介绍为塞维利亚西班牙广场塔楼的照片', caption: '用户提供的照片',
        sources: [
          ['安达卢西亚文化遗产：塞维利亚西班牙广场', 'https://www.juntadeandalucia.es/cultura/agendaculturaldeandalucia/evento/plaza-de-espana-de-sevilla'],
          ['塞维利亚大学研究：西班牙广场双塔基础', 'https://idus.us.es/items/59a54a31-cbe0-46f2-b94f-ad708c5de39a'],
          ['塞维利亚旅游局：地方主义建筑路线', 'https://visitasevilla.es/en/route-through-regionalist-seville-rediscover-the-city-through-its-architecture/']
        ]
      }
    },
    casino: {
      image: 'img/user-seville-landmarks/casino-exposicion-cropped.webp',
      ko: {
        title: '카지노 데 라 엑스포시시온 (Casino de la Exposición)',
        body: '이곳은 강변의 황금의 탑(Torre del Oro)과 다른 건물입니다. 1929년 박람회 때 세비야 전시관·극장 단지의 행사 공간으로 마련됐으며, 원래 “그랑 살롱 데 피에스타스”였던 부분이 오늘날 Casino de la Exposición으로 불립니다. 비센테 트라베르 이 토마스가 1926년에 설계했습니다. 기둥이 있는 현관과 중앙 원형 홀을 덮은 돔의 실루엣을 살펴보세요. 현재 문화 전시·행사 공간이므로 프로그램과 개방 여부는 방문 전 공식 안내에서 확인하세요.',
        imageAlt: '세비야 Casino de la Exposición으로 소개된 사용자 제공 사진', caption: '사용자 제공 사진',
        sources: [
          ['안달루시아 문화부: 1929년 이베로아메리카 박람회 카지노', 'https://www.juntadeandalucia.es/cultura/agendaculturaldeandalucia/evento/casino-de-la-exposicion-iberoamericana-de-1929'],
          ['세비야 주 관광청: Casino de la Exposición', 'https://www.turismosevilla.org/es/que-ver-y-hacer/patrimonio/monumentos/casino-de-la-exposicion'],
          ['안달루시아 주 기록관: 1929년 박람회의 유산', 'https://www.juntadeandalucia.es/cultura/archivos/web_es/contenido?id=db9250b1-8548-11ea-8ea7-000ae4865a5f&idActivo=&idContArch=d45fb2fd-393e-11dd-97cd-31450f5b9dd5']
        ]
      },
      en: {
        title: 'Casino de la Exposición',
        body: 'This is not Torre del Oro, the historic riverside tower. The Casino was part of the Seville pavilion and theatre complex for the 1929 Ibero-American Exhibition; the space once called the Gran Salón de Fiestas is now known as Casino de la Exposición. Vicente Traver y Tomás designed it in 1926. From outside, notice the portico and the dome over the central round hall. It now hosts cultural exhibitions and events, so check official information for current programmes and access.',
        imageAlt: 'User-provided photo associated with Casino de la Exposición in Seville', caption: 'User-provided photo',
        sources: [
          ['Andalusia Culture: Casino of the 1929 Ibero-American Exhibition', 'https://www.juntadeandalucia.es/cultura/agendaculturaldeandalucia/evento/casino-de-la-exposicion-iberoamericana-de-1929'],
          ['Seville Province Tourism: Casino de la Exposición', 'https://www.turismosevilla.org/es/que-ver-y-hacer/patrimonio/monumentos/casino-de-la-exposicion'],
          ['Andalusia Provincial Archives: legacy of the 1929 Exhibition', 'https://www.juntadeandalucia.es/cultura/archivos/web_es/contenido?id=db9250b1-8548-11ea-8ea7-000ae4865a5f&idActivo=&idContArch=d45fb2fd-393e-11dd-97cd-31450f5b9dd5']
        ]
      },
      ja: {
        title: 'カジノ・デ・ラ・エクスポシシオン（Casino de la Exposición）',
        body: 'ここは川沿いの歴史的な塔、トーレ・デル・オロとは別の建物です。1929年イベロアメリカ博覧会のセビリア館・劇場複合施設の催事空間として整備され、かつて「グラン・サロン・デ・フィエスタス」と呼ばれた部分が現在のCasino de la Exposiciónです。ビセンテ・トラベール・イ・トマスが1926年に設計しました。外からは柱廊と中央円形ホールを覆うドームの輪郭に注目してください。現在は文化展示・催事に使われるため、開催内容や入場方法は公式情報をご確認ください。',
        imageAlt: 'セビリアのCasino de la Exposiciónとして紹介された提供写真', caption: '提供写真',
        sources: [
          ['アンダルシア文化局：1929年イベロアメリカ博覧会のカジノ', 'https://www.juntadeandalucia.es/cultura/agendaculturaldeandalucia/evento/casino-de-la-exposicion-iberoamericana-de-1929'],
          ['セビリア県観光局：Casino de la Exposición', 'https://www.turismosevilla.org/es/que-ver-y-hacer/patrimonio/monumentos/casino-de-la-exposicion'],
          ['アンダルシア州立文書館：1929年博覧会の遺産', 'https://www.juntadeandalucia.es/cultura/archivos/web_es/contenido?id=db9250b1-8548-11ea-8ea7-000ae4865a5f&idActivo=&idContArch=d45fb2fd-393e-11dd-97cd-31450f5b9dd5']
        ]
      },
      zh: {
        title: '博览会赌场（Casino de la Exposición）',
        body: '这里不是河畔的历史防御塔黄金塔（Torre del Oro）。它属于1929年伊比利亚美洲博览会的塞维利亚展馆与剧院建筑群；原称“Gran Salón de Fiestas”的空间如今称为Casino de la Exposición。建筑由比森特·特拉维尔·托马斯于1926年设计。可从外部留意柱廊入口和覆盖中央圆形大厅的穹顶轮廓。这里现用于文化展览与活动，具体节目和开放情况请查看官方信息。',
        imageAlt: '用户提供、介绍为塞维利亚博览会赌场的照片', caption: '用户提供的照片',
        sources: [
          ['安达卢西亚文化部门：1929年伊比利亚美洲博览会赌场', 'https://www.juntadeandalucia.es/cultura/agendaculturaldeandalucia/evento/casino-de-la-exposicion-iberoamericana-de-1929'],
          ['塞维利亚省旅游局：Casino de la Exposición', 'https://www.turismosevilla.org/es/que-ver-y-hacer/patrimonio/monumentos/casino-de-la-exposicion'],
          ['安达卢西亚省档案馆：1929年博览会遗产', 'https://www.juntadeandalucia.es/cultura/archivos/web_es/contenido?id=db9250b1-8548-11ea-8ea7-000ae4865a5f&idActivo=&idContArch=d45fb2fd-393e-11dd-97cd-31450f5b9dd5']
        ]
      }
    },
    santelmo: {
      image: 'img/user-seville-landmarks/palacio-san-telmo.webp',
      ko: {
        title: '산 텔모 궁전 (Palacio de San Telmo)',
        body: '이 건물은 1682년 선원 교육기관의 공사가 시작됐고, 고아·무연고 소년에게 항해와 선박 운용 등을 가르치려 했습니다. 1849년 몽팡시에 공작 가족의 거처가 된 뒤 “궁전”으로 불리기 시작했으며, 지금은 안달루시아 자치정부 대통령실이 자리합니다. 외부에서는 바로크 양식의 정문과 세비야 명사 조각상 갤러리를 살펴볼 수 있습니다. 내부는 상시 자유 관람이 아니지만, 자치정부가 예약제 무료 투어를 운영합니다. 일정과 출입 가능 공간은 바뀔 수 있으니 방문 전에 공식 예약 안내를 확인하세요.',
        imageAlt: '세비야 산 텔모 궁전으로 소개된 사용자 제공 사진', caption: '사용자 제공 사진',
        sources: [
          ['안달루시아 자치정부: 산 텔모 연혁', 'https://www.juntadeandalucia.es/organismos/presidenciasanidadyemergencias/consejeria/transparencia/informacion-sectorial/san-telmo/cronologia-santelmo.html'],
          ['안달루시아 자치정부: 예약제 방문 안내', 'https://www.juntadeandalucia.es/organismos/presidenciasanidadyemergencias/consejeria/transparencia/informacion-sectorial/san-telmo/visitas.html'],
          ['세비야 주 관광청: 산 텔모 궁전', 'https://www.turismosevilla.org/en/what-see-and-do/heritage/monuments/palace-san-telmo']
        ]
      },
      en: {
        title: 'Palacio de San Telmo (San Telmo Palace)',
        body: 'Construction began in 1682 for a maritime school intended to train orphaned and otherwise unaccompanied boys in navigation and ship-related skills. The building became the residence of the Duke and Duchess of Montpensier in 1849, after which it came to be called a palace. It is now the seat of the Presidency of the Andalusian regional government. Outside, look for the Baroque main portal and the gallery of statues of notable Sevillians. It is not open for unrestricted walk-in visits, but the regional government offers free guided tours by reservation; check the official schedule and access details before going.',
        imageAlt: 'User-provided photo associated with Palacio de San Telmo in Seville', caption: 'User-provided photo',
        sources: [
          ['Junta de Andalucía: San Telmo chronology', 'https://www.juntadeandalucia.es/organismos/presidenciasanidadyemergencias/consejeria/transparencia/informacion-sectorial/san-telmo/cronologia-santelmo.html'],
          ['Junta de Andalucía: visits by appointment', 'https://www.juntadeandalucia.es/organismos/presidenciasanidadyemergencias/consejeria/transparencia/informacion-sectorial/san-telmo/visitas.html'],
          ['Seville Province Tourism: Palace of San Telmo', 'https://www.turismosevilla.org/en/what-see-and-do/heritage/monuments/palace-san-telmo']
        ]
      },
      ja: {
        title: 'サン・テルモ宮殿（Palacio de San Telmo）',
        body: '1682年、航海や船の運用を学ぶ海事学校の建設が始まり、孤児や身寄りのない少年の教育を目的としていました。1849年にモンパンシエ公爵家の住居となった後、「宮殿」と呼ばれるようになりました。現在はアンダルシア州政府大統領府の所在地です。外観ではバロック様式の正門と、セビリアの著名人を表す彫像のギャラリーに注目してください。いつでも自由に入れる施設ではありませんが、州政府による無料の予約制ガイドツアーがあります。訪問前に公式日程と見学可能範囲をご確認ください。',
        imageAlt: 'セビリアのサン・テルモ宮殿として紹介された提供写真', caption: '提供写真',
        sources: [
          ['アンダルシア州政府：サン・テルモの年表', 'https://www.juntadeandalucia.es/organismos/presidenciasanidadyemergencias/consejeria/transparencia/informacion-sectorial/san-telmo/cronologia-santelmo.html'],
          ['アンダルシア州政府：予約制見学案内', 'https://www.juntadeandalucia.es/organismos/presidenciasanidadyemergencias/consejeria/transparencia/informacion-sectorial/san-telmo/visitas.html'],
          ['セビリア県観光局：サン・テルモ宮殿', 'https://www.turismosevilla.org/en/what-see-and-do/heritage/monuments/palace-san-telmo']
        ]
      },
      zh: {
        title: '圣特尔莫宫（Palacio de San Telmo）',
        body: '这座建筑于1682年开始施工，最初计划作为海事学校，教授孤儿及无依少年航海和船舶操作等技能。1849年成为蒙庞西埃公爵夫妇的住所后，才逐渐以“宫殿”之名为人所知。如今这里是安达卢西亚自治区政府主席府所在地。外观可留意巴洛克式主入口，以及展示塞维利亚名人雕像的长廊。这里并非随时可自由入内，但自治区政府提供免费的预约导览；到访前请查看官方时段和可参观区域。',
        imageAlt: '用户提供、介绍为塞维利亚圣特尔莫宫的照片', caption: '用户提供的照片',
        sources: [
          ['安达卢西亚自治区政府：圣特尔莫年表', 'https://www.juntadeandalucia.es/organismos/presidenciasanidadyemergencias/consejeria/transparencia/informacion-sectorial/san-telmo/cronologia-santelmo.html'],
          ['安达卢西亚自治区政府：预约参观信息', 'https://www.juntadeandalucia.es/organismos/presidenciasanidadyemergencias/consejeria/transparencia/informacion-sectorial/san-telmo/visitas.html'],
          ['塞维利亚省旅游局：圣特尔莫宫', 'https://www.turismosevilla.org/en/what-see-and-do/heritage/monuments/palace-san-telmo']
        ]
      }
    },
    tabacos: {
      image: 'img/user-seville-landmarks/real-fabrica-tabacos.webp',
      ko: {
        title: '구 왕립 담배 공장 / 세비야대학교 본관 (Real Fábrica de Tabacos)',
        body: '건설은 1728년에 시작됐고 공장은 1758년 가동을 시작해 1770년에 공사가 마무리됐습니다. 당시 스페인의 담배 독점 제도와 연결된 대형 공장으로, “유럽 최초”라는 설명은 대학 자료에 나옵니다. 여성 담배 노동자(cigarreras)는 1812년 말~1813년부터 일하기 시작해 이후 중요한 노동 집단이 됐습니다. 오페라 《카르멘》의 주인공은 이 공장과 연결된 허구 인물이지 실존 노동자가 아닙니다. 지금은 세비야대학교 총장실과 여러 학부가 사용합니다. 내부는 무예약 자유 관람을 보장하지 않으므로 대학의 예약제 투어 안내를 확인하세요.',
        imageAlt: '세비야 구 왕립 담배 공장으로 소개된 사용자 제공 사진', caption: '사용자 제공 사진',
        sources: [
          ['세비야대학교: 담배 공장 건물의 역사', 'https://www.us.es/actualidad-de-la-us/la-fabrica-de-tabacos-de-sevilla-historia-de-un-edificio-unico-0'],
          ['안달루시아 역사기록관: 여성 담배 노동자', 'https://www.juntadeandalucia.es/cultura/archivos/web_es/contenido?id=eab62e15-9ec0-11ec-bec7-000ae4865a5f&idActivo=&idContArch=549b9259-53f8-11de-b13b-000ae4865a5f&idArchivo=d9f0f1ac-58a4-11dd-b44b-31450f5b9dd5'],
          ['세비야대학교 문화유산 담당부서: 총장실 가이드 투어', 'https://patrimoniocultural.us.es/visitas-guiadas-rectorado'],
          ['안달루시아 문화유산청: 오페라 《카르멘》의 세 기념일', 'https://www.juntadeandalucia.es/organismos/culturapatrimoniohistoricoydeporte/servicios/actualidad/noticias/detalle/567502.html']
        ]
      },
      en: {
        title: 'Former Royal Tobacco Factory / University of Seville (Real Fábrica de Tabacos)',
        body: 'Construction began in 1728; the factory started operating in 1758 and building work was completed in 1770. It was a large factory linked to Spain’s tobacco monopoly, and the University of Seville describes it as Europe’s first tobacco factory. Women known as cigarreras began this work around 1812–13 and later formed a major part of the workforce. Carmen, the opera character associated with the factory, is fictional—not a documented worker. Today the complex houses the University of Seville rectorate and several faculties. Do not assume unrestricted walk-in access; check the university’s reservation-based tour information.',
        imageAlt: 'User-provided photo associated with the former Royal Tobacco Factory in Seville', caption: 'User-provided photo',
        sources: [
          ['University of Seville: history of the Tobacco Factory building', 'https://www.us.es/actualidad-de-la-us/la-fabrica-de-tabacos-de-sevilla-historia-de-un-edificio-unico-0'],
          ['Seville Provincial Historical Archive: women tobacco workers', 'https://www.juntadeandalucia.es/cultura/archivos/web_es/contenido?id=eab62e15-9ec0-11ec-bec7-000ae4865a5f&idActivo=&idContArch=549b9259-53f8-11de-b13b-000ae4865a5f&idArchivo=d9f0f1ac-58a4-11dd-b44b-31450f5b9dd5'],
          ['University of Seville: guided visits to the rectorate', 'https://patrimoniocultural.us.es/visitas-guiadas-rectorado'],
          ['Andalusia Culture and Heritage: three anniversaries of Carmen', 'https://www.juntadeandalucia.es/organismos/culturapatrimoniohistoricoydeporte/servicios/actualidad/noticias/detalle/567502.html']
        ]
      },
      ja: {
        title: '旧王立たばこ工場／セビリア大学（Real Fábrica de Tabacos）',
        body: '建設は1728年に始まり、工場は1758年に操業を開始、建物の工事は1770年に完了しました。スペインのたばこ専売制度に関連する大規模工場で、セビリア大学はヨーロッパ初のたばこ工場と紹介しています。女性たばこ労働者（シガレラス）は1812年末～1813年ごろから働き始め、その後大きな労働集団となりました。工場に結び付けられるオペラ《カルメン》の主人公は架空の人物で、実在した労働者ではありません。現在はセビリア大学の本部や複数の学部が置かれています。自由な飛び入り見学ができるとは限らないため、予約制ツアーの公式案内をご確認ください。',
        imageAlt: 'セビリアの旧王立たばこ工場として紹介された提供写真', caption: '提供写真',
        sources: [
          ['セビリア大学：たばこ工場建物の歴史', 'https://www.us.es/actualidad-de-la-us/la-fabrica-de-tabacos-de-sevilla-historia-de-un-edificio-unico-0'],
          ['セビリア県立歴史文書館：女性たばこ労働者', 'https://www.juntadeandalucia.es/cultura/archivos/web_es/contenido?id=eab62e15-9ec0-11ec-bec7-000ae4865a5f&idActivo=&idContArch=549b9259-53f8-11de-b13b-000ae4865a5f&idArchivo=d9f0f1ac-58a4-11dd-b44b-31450f5b9dd5'],
          ['セビリア大学：本部のガイドツアー', 'https://patrimoniocultural.us.es/visitas-guiadas-rectorado'],
          ['アンダルシア文化遺産局：カルメンの三つの記念年', 'https://www.juntadeandalucia.es/organismos/culturapatrimoniohistoricoydeporte/servicios/actualidad/noticias/detalle/567502.html']
        ]
      },
      zh: {
        title: '旧皇家烟草厂／塞维利亚大学（Real Fábrica de Tabacos）',
        body: '建筑工程始于1728年，工厂于1758年投产，整体工程到1770年完成。这是一座与西班牙烟草专卖制度相关的大型工厂；塞维利亚大学称其为欧洲第一家烟草厂。女性烟草工人（cigarreras）约从1812年底至1813年开始工作，后来成为重要的劳动群体。与工厂相关联的歌剧《卡门》主角是虚构人物，并非有档案记录的真实工人。如今这里设有塞维利亚大学校长办公室和多个院系。不要默认可免预约自由入内；请查看大学的预约导览信息。',
        imageAlt: '用户提供、介绍为塞维利亚旧皇家烟草厂的照片', caption: '用户提供的照片',
        sources: [
          ['塞维利亚大学：烟草厂建筑史', 'https://www.us.es/actualidad-de-la-us/la-fabrica-de-tabacos-de-sevilla-historia-de-un-edificio-unico-0'],
          ['塞维利亚省历史档案馆：女性烟草工人', 'https://www.juntadeandalucia.es/cultura/archivos/web_es/contenido?id=eab62e15-9ec0-11ec-bec7-000ae4865a5f&idActivo=&idContArch=549b9259-53f8-11de-b13b-000ae4865a5f&idArchivo=d9f0f1ac-58a4-11dd-b44b-31450f5b9dd5'],
          ['塞维利亚大学：校长办公室导览', 'https://patrimoniocultural.us.es/visitas-guiadas-rectorado'],
          ['安达卢西亚文化遗产部门：卡门的三个纪念日', 'https://www.juntadeandalucia.es/organismos/culturapatrimoniohistoricoydeporte/servicios/actualidad/noticias/detalle/567502.html']
        ]
      }
    }
  };

  var ALIASES = {
    plaza: ['plaza de españa', 'plaza de espana', 'plaza de españa towers', 'spain square', '세비야 스페인 광장', '스페인 광장 탑', '에스파냐 광장 탑', 'スペイン広場', 'スペイン広場の塔', '塞维利亚西班牙广场', '西班牙广场'],
    casino: ['casino de la exposición', 'casino de la exposicion', 'casino de la exposicion sevilla', 'casino de la exposición sevilla', 'teatro de la exposición casino', '세비야 엑스포시시온 카지노', '카지노 데 라 엑스포시시온', 'カジノ・デ・ラ・エクスポシシオン', '塞维利亚博览会赌场', '博览会赌场'],
    santelmo: ['palacio de san telmo', 'san telmo palace', 'palace of san telmo', '산 텔모 궁전', '산텔모 궁전', 'サン・テルモ宮殿', '圣特尔莫宫', '圣特尔莫宫殿'],
    tabacos: ['real fábrica de tabacos', 'real fabrica de tabacos', 'royal tobacco factory', 'seville tobacco factory', 'old tobacco factory', 'universidad de sevilla', 'university of seville', '구 왕립 담배 공장', '세비야 담배 공장', '세비야 대학교 담배 공장', '旧王立たばこ工場', 'セビリア大学たばこ工場', '旧皇家烟草厂', '塞维利亚烟草厂'],
    pilatos: ['casa de pilatos', 'casa pilatos', 'casa de pilato', 'house of pilate', '카사 데 필라토스', '카사 필라토스', '필라토스의 집', '필라토스 저택', '필라토스', 'カサ・デ・ピラトス', 'カサデピラトス', '皮拉托之家', '皮拉托斯之家'],
    archivo: ['archivo general de indias', 'archivo de indias', 'general archive of the indies', 'archive of the indies', '인디아스 고문서관', '인디아스 문서관', '인디아스 종합 고문서관', 'インディアス総合古文書館', 'インディアス古文書館', '印度档案总馆', '印度档案馆'],
    maestranza: ['plaza de toros de la real maestranza', 'real maestranza bullring', 'real maestranza', 'la maestranza', '레알 마에스트란사', '마에스트란사 투우장', '마에스트란사', 'レアル・マエストランサ', 'マエストランサ闘牛場', '皇家骑士团斗牛场', '马埃斯特兰萨斗牛场'],
    comercio: ['bar el comercio', 'el comercio churros', '바르 엘 코메르시오', '엘 코메르시오', '바르 엘 코메르시오 추로스', 'バル・エル・コメルシオ', 'エル・コメルシオ', 'El Comercio酒吧', '埃尔科梅尔西奥酒吧'],
    cantina: ['la cantina', 'mercado de feria la cantina', '라 칸티나', '라칸티나', 'ラ・カンティナ', '拉坎蒂娜']
  };

  function language(value) {
    var key = String(value || '').toLowerCase().split(/[-_]/)[0];
    return LANGS.indexOf(key) >= 0 ? key : 'en';
  }

  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, function (char) {
      return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char];
    });
  }

  function normalizeQuery(value) {
    return String(value == null ? '' : value).toLocaleLowerCase().normalize('NFKC')
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '').normalize('NFC').replace(/[\s\u3000]+/g, ' ').trim();
  }

  function containsAlias(text, alias) {
    var normalizedAlias = normalizeQuery(alias);
    if (!normalizedAlias) return false;
    if (/^[\x00-\x7f]+$/.test(normalizedAlias)) {
      return new RegExp('(^|[^a-z0-9])' + normalizedAlias.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '([^a-z0-9]|$)', 'i').test(text);
    }
    return text.indexOf(normalizedAlias) !== -1;
  }

  function renderTopic(topic, lang) {
    var data = topic[lang];
    var image = topic.image || data.image;
    var photo = image
      ? '<figure class="sg-guide-photo"><img src="' + escapeHtml(image) + '" alt="' + escapeHtml(data.imageAlt || data.title) + '" loading="lazy" decoding="async"><figcaption>' + escapeHtml(data.caption || '') + '</figcaption></figure>'
      : '';
    var sourceLinks = data.sources.map(function (source) {
      return '<li><a href="' + escapeHtml(source[1]) + '" target="_blank" rel="noopener noreferrer">' + escapeHtml(source[0]) + '</a></li>';
    }).join('');
    return '<details class="sg-guide-topic"><summary>' + escapeHtml(data.title) + '</summary>' +
      '<div class="sg-guide-content">' + photo + '<p>' + escapeHtml(data.body) + '</p><ul class="sg-guide-sources">' + sourceLinks + '</ul></div></details>';
  }

  function renderSevilleGeneralGuide(lang) {
    var mount = document.getElementById('seville-general-guide');
    if (!mount) return false;
    var currentLang = language(lang);
    var copy = COPY[currentLang];
    mount.innerHTML = '<section class="sg-guide" lang="' + currentLang + '"><h2>' + escapeHtml(copy.heading) + '</h2>' +
      '<p class="sg-guide-intro">' + escapeHtml(copy.intro) + '</p>' +
      renderTopic(PHOTO_GUIDE_TOPICS.plaza, currentLang) +
      renderTopic(PHOTO_GUIDE_TOPICS.casino, currentLang) +
      renderTopic(PHOTO_GUIDE_TOPICS.santelmo, currentLang) +
      renderTopic(PHOTO_GUIDE_TOPICS.tabacos, currentLang) +
      renderTopic({ ko: COPY.ko.topics.pilatos, en: COPY.en.topics.pilatos, ja: COPY.ja.topics.pilatos, zh: COPY.zh.topics.pilatos }, currentLang) +
      renderTopic({ ko: COPY.ko.topics.archivo, en: COPY.en.topics.archivo, ja: COPY.ja.topics.archivo, zh: COPY.zh.topics.archivo }, currentLang) +
      renderTopic({ ko: COPY.ko.topics.maestranza, en: COPY.en.topics.maestranza, ja: COPY.ja.topics.maestranza, zh: COPY.zh.topics.maestranza }, currentLang) +
      renderTopic({ ko: COPY.ko.topics.comercio, en: COPY.en.topics.comercio, ja: COPY.ja.topics.comercio, zh: COPY.zh.topics.comercio }, currentLang) +
      renderTopic({ ko: COPY.ko.topics.tapas, en: COPY.en.topics.tapas, ja: COPY.ja.topics.tapas, zh: COPY.zh.topics.tapas }, currentLang) +
      '</section>';
    return true;
  }

  function buildSevilleGeneralChatResponse(query, lang) {
    var currentLang = language(lang);
    var normalized = normalizeQuery(query);
    if (!normalized) return null;

    // Keep personal plans, date/time questions, transport and bookings with existing itinerary behavior.
    var itineraryOrMobility = /\b(?:itinerary|schedule|booking|booked|reservation|flight|airport|hotel|lodging|accommodation|route|directions|transit|transport|bus|train|taxi|metro|today|tomorrow|yesterday|day trip|horaire|reserva|vuelo|aeropuerto|itineraire|horario)\b/i.test(normalized) ||
      /(?:숙소|항공|비행|공항|예약|일정|동선|경로|교통|이동|버스|기차|택시|오늘|내일|旅程|日程|予約|フライト|空港|ホテル|経路|交通|移動|バス|電車|タクシー|今日|明日|行程|预订|航班|机场|酒店|路线|交通|公交|火车|出租车|今天|明天)/i.test(normalized) ||
      /\b(?:202\d|\d{1,2}:\d{2}|\d{1,2}\/\d{1,2}|\d{4}-\d{1,2}-\d{1,2})\b/.test(normalized) ||
      /(?:nov(?:ember)?|dec(?:ember)?|oct(?:ober)?|sept?(?:ember)?|11월|12월|10월|11月|12月|10月|月\s*\d{1,2}|日程|行程|예약|일정)/i.test(normalized);
    if (itineraryOrMobility) return null;

    var asksForDirections = /(?:\bget to\b|\bhow to reach\b|\broute to\b|\bdirections to\b|\bhow do i get\b|\bhow can i reach\b|\bcómo llegar\b|\bcómo ir\b|가는 방법|어떻게 가|찾아가는 길|行き方|どうやって行|如何前往|怎么去)/i.test(normalized);
    if (asksForDirections) return null;

    var sevilleContext = /(?:seville|sevilla|세비야|セビリア|塞维利亚)/i.test(normalized);
    if (/(?:bodega\s*g[óo]?ngora|gongora|공고라|곤고라|戈贡戈拉|ゴンゴラ)/i.test(normalized)) return null;
    var selected = null;
    if (ALIASES.plaza.some(function (alias) { return containsAlias(normalized, alias); })) selected = 'plaza';
    else if (ALIASES.casino.some(function (alias) { return containsAlias(normalized, alias); })) selected = 'casino';
    else if (ALIASES.santelmo.some(function (alias) { return containsAlias(normalized, alias); })) selected = 'santelmo';
    else if (ALIASES.tabacos.some(function (alias) { return containsAlias(normalized, alias); })) selected = 'tabacos';
    else if (ALIASES.pilatos.some(function (alias) { return containsAlias(normalized, alias); })) selected = 'pilatos';
    else if (ALIASES.archivo.some(function (alias) { return containsAlias(normalized, alias); })) selected = 'archivo';
    else if (ALIASES.maestranza.some(function (alias) { return containsAlias(normalized, alias); })) selected = 'maestranza';
    else if (ALIASES.comercio.some(function (alias) { return containsAlias(normalized, alias); })) selected = 'comercio';
    else if (ALIASES.cantina.some(function (alias) { return containsAlias(normalized, alias); })) selected = 'tapas';
    else if (sevilleContext && /(?:\btapas?\b|타파스|タパス|塔帕斯)/i.test(normalized)) selected = 'tapas';
    if (!selected) return null;

    var data = (PHOTO_GUIDE_TOPICS[selected] && PHOTO_GUIDE_TOPICS[selected][currentLang]) || COPY[currentLang].topics[selected];
    var sources = data.sources.map(function (source) {
      return '<a href="' + escapeHtml(source[1]) + '" target="_blank" rel="noopener noreferrer">' + escapeHtml(source[0]) + ' ↗</a>';
    }).join('<br>');
    return '<strong>' + escapeHtml(data.title) + '</strong><br>' + escapeHtml(data.body) + '<br><br>' +
      escapeHtml(COPY[currentLang].sourcesLabel) + ':<br>' + sources;
  }

  window.renderSevilleGeneralGuide = renderSevilleGeneralGuide;
  window.buildSevilleGeneralChatResponse = buildSevilleGeneralChatResponse;
}());
