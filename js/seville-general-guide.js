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
          body: '세비야의 전통 음식 예시로 시금치와 병아리콩(Espinacas con garbanzos), 볼살 조림(carrillada), 대구 튀김 파비아스(pavías de bacalao), 생선 튀김(fried fish), 살모레호(salmorejo)가 소개됩니다. 실제 제공 여부는 가게와 시기에 따라 다르며, 음료와 함께 무료로 나온다고 가정하지 마세요. 위치 정정: La Cantina는 트리아나 시장이 아니라 페리아 시장(Mercado de Feria, Calle Feria)에 있습니다.',
          sources: [
            ['세비야 관광청: 타파스', 'https://www.legacy.visitasevilla.es/en/tapas'],
            ['세비야 관광청: 타파스로 세비야 알아보기', 'https://visitasevilla.es/en/discover-seville-through-its-tapas/'],
            ['트리아나 시장 공식 안내', 'https://visitasevilla.es/en/mercado-de-triana/'],
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
          body: 'Examples of traditional Seville dishes include spinach with chickpeas (espinacas con garbanzos), braised pork cheek (carrillada), cod pavías, fried fish and salmorejo. Availability varies by venue and time; do not assume a dish is served or included free with a drink. Location correction: La Cantina is at Mercado de Feria on Calle Feria, not Triana Market.',
          sources: [
            ['Seville Tourism: tapas', 'https://www.legacy.visitasevilla.es/en/tapas'],
            ['Seville Tourism: discover Seville through its tapas', 'https://visitasevilla.es/en/discover-seville-through-its-tapas/'],
            ['Triana Market: official visitor information', 'https://visitasevilla.es/en/mercado-de-triana/'],
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
          body: 'セビリアの伝統料理の例として、ほうれん草とひよこ豆（espinacas con garbanzos）、豚ほほ肉の煮込み（carrillada）、タラのフライ（pavías de bacalao）、魚のフライ、サルモレホがあります。提供状況は店や時期によって異なり、飲み物に無料で付くとは限りません。場所の訂正：La Cantinaはトリアナ市場ではなく、Calle Feriaにあるフェリア市場（Mercado de Feria）にあります。',
          sources: [
            ['セビリア観光局：タパス', 'https://www.legacy.visitasevilla.es/en/tapas'],
            ['セビリア観光局：タパスで知るセビリア', 'https://visitasevilla.es/en/discover-seville-through-its-tapas/'],
            ['トリアナ市場：公式案内', 'https://visitasevilla.es/en/mercado-de-triana/'],
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
          body: '塞维利亚传统菜肴示例包括菠菜鹰嘴豆（espinacas con garbanzos）、炖猪脸颊肉（carrillada）、鳕鱼炸条（pavías de bacalao）、炸鱼和冷汤salmorejo。是否供应因店铺和时间而异；不要假定会供应或随饮料免费赠送。位置更正：La Cantina位于Calle Feria的费里亚市场（Mercado de Feria），不在特里亚纳市场。',
          sources: [
            ['塞维利亚旅游局：塔帕斯', 'https://www.legacy.visitasevilla.es/en/tapas'],
            ['塞维利亚旅游局：通过塔帕斯探索塞维利亚', 'https://visitasevilla.es/en/discover-seville-through-its-tapas/'],
            ['特里亚纳市场：官方信息', 'https://visitasevilla.es/en/mercado-de-triana/'],
            ['La Cantina：地址与信息', 'https://la-cantina.metro.bar/?lang=en']
          ]
        }
      }
    }
  };

  var ALIASES = {
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
    var sourceLinks = data.sources.map(function (source) {
      return '<li><a href="' + escapeHtml(source[1]) + '" target="_blank" rel="noopener noreferrer">' + escapeHtml(source[0]) + '</a></li>';
    }).join('');
    return '<details class="sg-guide-topic"><summary>' + escapeHtml(data.title) + '</summary>' +
      '<div class="sg-guide-content"><p>' + escapeHtml(data.body) + '</p><ul class="sg-guide-sources">' + sourceLinks + '</ul></div></details>';
  }

  function renderSevilleGeneralGuide(lang) {
    var mount = document.getElementById('seville-general-guide');
    if (!mount) return false;
    var currentLang = language(lang);
    var copy = COPY[currentLang];
    mount.innerHTML = '<section class="sg-guide" lang="' + currentLang + '"><h2>' + escapeHtml(copy.heading) + '</h2>' +
      '<p class="sg-guide-intro">' + escapeHtml(copy.intro) + '</p>' +
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
    var selected = null;
    if (ALIASES.pilatos.some(function (alias) { return containsAlias(normalized, alias); })) selected = 'pilatos';
    else if (ALIASES.archivo.some(function (alias) { return containsAlias(normalized, alias); })) selected = 'archivo';
    else if (ALIASES.maestranza.some(function (alias) { return containsAlias(normalized, alias); })) selected = 'maestranza';
    else if (ALIASES.comercio.some(function (alias) { return containsAlias(normalized, alias); })) selected = 'comercio';
    else if (ALIASES.cantina.some(function (alias) { return containsAlias(normalized, alias); })) selected = 'tapas';
    else if (sevilleContext && /(?:\btapas?\b|타파스|タパス|塔帕斯)/i.test(normalized)) selected = 'tapas';
    if (!selected) return null;

    var data = COPY[currentLang].topics[selected];
    var sources = data.sources.map(function (source) {
      return '<a href="' + escapeHtml(source[1]) + '" target="_blank" rel="noopener noreferrer">' + escapeHtml(source[0]) + ' ↗</a>';
    }).join('<br>');
    return '<strong>' + escapeHtml(data.title) + '</strong><br>' + escapeHtml(data.body) + '<br><br>' +
      escapeHtml(COPY[currentLang].sourcesLabel) + ':<br>' + sources;
  }

  window.renderSevilleGeneralGuide = renderSevilleGeneralGuide;
  window.buildSevilleGeneralChatResponse = buildSevilleGeneralChatResponse;
}());
