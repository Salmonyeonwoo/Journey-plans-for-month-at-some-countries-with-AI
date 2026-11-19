/* Review-only addition: Seville Cathedral, its chapels, and the Antecabildo.
 * Keeps personal itineraries untouched. Claims are limited to checked sources. */
(function () {
  'use strict';

  var LANGS = ['ko', 'en', 'ja', 'zh'];
  var ROOT = 'img/user-seville-cathedral-review/';

  var SOURCE = {
    unesco: {
      url: 'https://whc.unesco.org/en/list/383/',
      label: { ko: '유네스코 세계유산센터 · 세비야 유산', en: 'UNESCO World Heritage Centre · Seville', ja: 'ユネスコ世界遺産センター · セビリア', zh: '联合国教科文组织世界遗产中心 · 塞维利亚' }
    },
    construction: {
      url: 'https://www.catedraldesevilla.es/en/the-cathedral-of-seville-the-great-construction-project-of-the-15th-century/',
      label: { ko: '세비야 대성당 · 15세기 대건축 프로젝트', en: 'Seville Cathedral · The great construction project', ja: 'セビリア大聖堂 · 15世紀の大建築計画', zh: '塞维利亚主教座堂 · 15世纪大型建造工程' }
    },
    gothic: {
      url: 'https://www.catedraldesevilla.es/en/the-cathedral/building/the-gothic-cathedral-main-altarpiece-choir-side-chapels-and-doorways/',
      label: { ko: '세비야 대성당 · 주 제단화·성가대·문', en: 'Seville Cathedral · Altarpiece, choir and doorways', ja: 'セビリア大聖堂 · 主祭壇衝立・聖歌隊席・門', zh: '塞维利亚主教座堂 · 主祭坛屏、唱诗班席与门' }
    },
    sculpture: {
      url: 'https://www.catedraldesevilla.es/en/the-cathedral/artistic-heritage/sculpture/',
      label: { ko: '세비야 대성당 · 조각 유산', en: 'Seville Cathedral · Sculpture collection', ja: 'セビリア大聖堂 · 彫刻', zh: '塞维利亚主教座堂 · 雕塑藏品' }
    },
    columbus: {
      url: 'https://www.catedraldesevilla.es/el-proyecto-ganador-de-arturo-melida-para-el-monumento-funerario-de-cristobal-colon/',
      label: { ko: '세비야 대성당 · 콜럼버스 묘 설계와 도상', en: 'Seville Cathedral · Columbus monument design', ja: 'セビリア大聖堂 · コロンブス記念墓の設計', zh: '塞维利亚主教座堂 · 哥伦布墓纪念碑设计' }
    },
    giralda: {
      url: 'https://www.catedraldesevilla.es/en/the-cathedral/building/the-giralda/',
      label: { ko: '세비야 대성당 · 히랄다', en: 'Seville Cathedral · The Giralda', ja: 'セビリア大聖堂 · ヒラルダ', zh: '塞维利亚主教座堂 · 吉拉尔达塔' }
    },
    phaseVI: {
      url: 'https://www.catedraldesevilla.es/en/phase-vi-of-the-giralda-intervention-begins/',
      label: { ko: '세비야 대성당 · 히랄다 보존 공사 발표(2026)', en: 'Seville Cathedral · Giralda conservation announcement (2026)', ja: 'セビリア大聖堂 · ヒラルダ保存工事の発表（2026年）', zh: '塞维利亚主教座堂 · 吉拉尔达塔保护工程公告（2026年）' }
    },
    renAdditions: {
      url: 'https://www.catedraldesevilla.es/en/the-cathedral/building/renaissance-additions-royal-chapel-chapter-house-and-main-sacristy/',
      label: { ko: '세비야 대성당 · 르네상스 증축과 참사회실', en: 'Seville Cathedral · Renaissance additions and Chapter House', ja: 'セビリア大聖堂 · ルネサンス期の増築と参事会室', zh: '塞维利亚主教座堂 · 文艺复兴时期增建与议事厅' }
    },
    sacristia: {
      url: 'https://www.catedraldesevilla.es/la-sacristia-de-calices-de-la-catedral-de-sevilla-alberga-una-excepcional-coleccion-pictorica/',
      label: { ko: '세비야 대성당 · 성작 성구실의 회화', en: 'Seville Cathedral · Paintings in the Chalice Sacristy', ja: 'セビリア大聖堂 · 聖杯の聖具室の絵画', zh: '塞维利亚主教座堂 · 圣杯圣器室绘画' }
    },
    goya: {
      url: 'https://fundaciongoyaenaragon.es/eng/obra/santas-justa-y-rufina/146',
      label: { ko: '고야 연구재단 · 《성녀 후스타와 루피나》', en: 'Goya Foundation · Saints Justa and Rufina', ja: 'ゴヤ財団 · 《聖女フスタとルフィナ》', zh: '戈雅基金会 · 《圣女胡斯塔与鲁菲娜》' }
    },
    nunez: {
      url: 'https://www.catedraldesevilla.es/obras/la-piedad-con-san-vicente-san-miguel-y-un-donante/',
      label: { ko: '세비야 대성당 · 후안 누녜스의 피에타', en: 'Seville Cathedral · Pietà by Juan Núñez', ja: 'セビリア大聖堂 · フアン・ヌニェスのピエタ', zh: '塞维利亚主教座堂 · 胡安·努涅斯《哀悼基督》' }
    },
    spinola: {
      url: 'https://www.archisevilla.org/hoy-19-de-enero-fiesta-del-beato-marcelo-spinola-tras-115-anos-de-su-fallecimiento/',
      label: { ko: '세비야 대교구 · 복자 마르셀로 스피놀라', en: 'Archdiocese of Seville · Blessed Marcelo Spínola', ja: 'セビリア大司教区 · 福者マルセロ・スピノラ', zh: '塞维利亚总教区 · 真福马塞洛·斯皮诺拉' }
    },
    spinolaTomb: {
      url: 'https://www.catedraldesevilla.es/en/the-cathedral/artistic-heritage/sculpture/',
      label: { ko: '세비야 대성당 · 스피놀라 묘 조각 안내', en: 'Seville Cathedral · Spínola tomb sculpture', ja: 'セビリア大聖堂 · スピノラ墓碑彫刻', zh: '塞维利亚主教座堂 · 斯皮诺拉墓雕' }
    },
    dolores: {
      url: 'https://www.catedraldesevilla.es/la-catedral-de-sevilla-celebra-hoy-la-festividad-de-la-virgen-de-los-dolores-con-su-capilla-especialmente-decorada/',
      label: { ko: '세비야 대성당 · 고통의 성모 예배당', en: 'Seville Cathedral · Chapel of Our Lady of Sorrows', ja: 'セビリア大聖堂 · 悲しみの聖母礼拝堂', zh: '塞维利亚主教座堂 · 苦难圣母小堂' }
    },
    cervantes: {
      url: 'https://www.catedraldesevilla.es/el-cardenal-juan-de-cervantes-en-la-catedral-de-sevilla/',
      label: { ko: '세비야 대성당 · 후안 데 세르반테스 추기경', en: 'Seville Cathedral · Cardinal Juan de Cervantes', ja: 'セビリア大聖堂 · フアン・デ・セルバンテス枢機卿', zh: '塞维利亚主教座堂 · 胡安·德·塞万提斯枢机' }
    },
    stained: {
      url: 'https://www.catedraldesevilla.es/en/the-cathedral/artistic-heritage/stained-glass/',
      label: { ko: '세비야 대성당 · 스테인드글라스', en: 'Seville Cathedral · Stained glass', ja: 'セビリア大聖堂 · ステンドグラス', zh: '塞维利亚主教座堂 · 彩绘玻璃' }
    },
    doloresMary: {
      url: 'https://www.catedraldesevilla.es/la-catedral-de-sevilla-celebra-hoy-la-festividad-de-la-virgen-de-los-dolores-con-su-capilla-especialmente-decorada/',
      label: { ko: '세비야 대성당 · 십자가상과 고통의 성모상', en: 'Seville Cathedral · Crucifix and Our Lady of Sorrows', ja: 'セビリア大聖堂 · 十字架像と悲しみの聖母像', zh: '塞维利亚主教座堂 · 苦难圣母像与十字架像' }
    },
    anteTimeline: {
      url: 'https://www.catedraldesevilla.es/en/timeline_slider_post/s-xvi/',
      label: { ko: '세비야 대성당 공식 연표 · 16세기', en: 'Seville Cathedral timeline · 16th century', ja: 'セビリア大聖堂公式年表 · 16世紀', zh: '塞维利亚主教座堂年表 · 16世纪' }
    },
    luke: {
      url: 'https://vulgate.org/nt/gospel/luke_24.htm',
      label: { ko: '누가복음 24장 라틴어 본문', en: 'Luke 24 · Latin Vulgate', ja: 'ルカによる福音書24章 · ラテン語', zh: '《路加福音》第24章 · 拉丁通行本' }
    },
    psalm: {
      url: 'https://catholicbible.online/side_by_side/OT/Ps/ch_4',
      label: { ko: '시편 4편 라틴어 본문과 번역', en: 'Psalm 4 · Latin text and translations', ja: '詩編4編 · ラテン語本文と翻訳', zh: '《诗篇》第4篇 · 拉丁文与译文' }
    },
    anteSupplement: {
      url: 'https://www.latinyroma.es/l/antecabildo-catedral-sevilla/',
      label: { ko: 'Latin y Roma · 안테카빌도 보조 해설', en: 'Latin y Roma · Supplementary Antecabildo notes', ja: 'Latin y Roma · アンテカビルドの補足解説', zh: 'Latin y Roma · 安特卡比尔多补充说明' }
    }
  };

  var PHOTO = {
    'cathedral-pier.webp': {
      alt: { ko: '세비야 대성당 내부의 높은 석조 기둥', en: 'A tall stone pier inside Seville Cathedral', ja: 'セビリア大聖堂内部の高い石造柱', zh: '塞维利亚主教座堂内部的高大石柱' },
      caption: { ko: '대성당 내부의 석조 기둥', en: 'Stone pier inside the cathedral', ja: '大聖堂内部の石造柱', zh: '主教座堂内部的石柱' }
    },
    'cathedral-vaults.webp': {
      alt: { ko: '기둥 위로 솟은 고딕 리브 궁륭', en: 'Gothic rib vaulting rising above the piers', ja: '石柱の上に広がるゴシックのリブ・ヴォールト', zh: '石柱上方的哥特式肋架拱顶' },
      caption: { ko: '기둥과 고딕 리브 궁륭', en: 'Piers and Gothic rib vaults', ja: '石柱とゴシックのリブ・ヴォールト', zh: '石柱与哥特式肋架拱顶' }
    },
    'cathedral-retablo-mayor.webp': {
      alt: { ko: '세비야 대성당의 주 제단화', en: 'The main altarpiece of Seville Cathedral', ja: 'セビリア大聖堂の主祭壇衝立', zh: '塞维利亚主教座堂的主祭坛屏' },
      caption: { ko: '주 제단화(레타블로 마요르)', en: 'Main altarpiece (Retablo Mayor)', ja: '主祭壇衝立（レタブロ・マヨール）', zh: '主祭坛屏（Retablo Mayor）' }
    },
    'cathedral-cervantes-tomb.webp': {
      alt: { ko: '후안 데 세르반테스 추기경의 조각 묘와 인접한 창', en: 'The sculpted tomb of Cardinal Juan de Cervantes and a nearby window', ja: 'フアン・デ・セルバンテス枢機卿の墓碑と隣接する窓', zh: '胡安·德·塞万提斯枢机的雕像墓与邻近窗户' },
      caption: { ko: '후안 데 세르반테스 추기경의 묘와 인접한 창', en: 'Cardinal Juan de Cervantes’s tomb and a nearby window', ja: 'フアン・デ・セルバンテス枢機卿の墓碑と隣接する窓', zh: '胡安·德·塞万提斯枢机墓与邻近的窗' }
    },
    'chapel-marcelo-spinola-tomb.webp': {
      alt: { ko: '무릎을 꿇은 복자 마르셀로 스피놀라의 묘 조각', en: 'Sculpted kneeling tomb of Blessed Marcelo Spínola', ja: 'ひざまずく福者マルセロ・スピノラの墓碑彫刻', zh: '跪姿的真福马塞洛·斯皮诺拉墓雕' },
      caption: { ko: '복자 마르셀로 스피놀라의 묘', en: 'Tomb of Blessed Marcelo Spínola', ja: '福者マルセロ・スピノラの墓碑', zh: '真福马塞洛·斯皮诺拉墓' }
    },
    'chapel-dolores-altarpiece.webp': {
      alt: { ko: '십자가상과 고통의 성모상, 제단 전면의 수난 상징', en: 'Crucifix, image of Our Lady of Sorrows and Passion emblems on the altar front', ja: '十字架像、悲しみの聖母像、祭壇前面の受難の象徴', zh: '十字架像、苦难圣母像及祭坛正面的受难象征' },
      caption: { ko: '고통의 성모 예배당의 십자가상과 제단', en: 'Crucifix and altar in the Chapel of Our Lady of Sorrows', ja: '悲しみの聖母礼拝堂の十字架像と祭壇', zh: '苦难圣母小堂的十字架像与祭坛' }
    },
    'sacristia-paintings.webp': {
      alt: { ko: '성벽에 나란히 걸린 두 점의 회화', en: 'Two paintings displayed side by side on a wall', ja: '壁に並んで展示された2点の絵画', zh: '墙上并列展示的两幅画作' },
      caption: { ko: '벽면에 나란히 걸린 두 점의 회화', en: 'Two paintings displayed side by side', ja: '壁に並んで展示された2点の絵画', zh: '墙上并列展示的两幅画作' }
    },
    'antecabilido-apelles-relief.webp': {
      alt: { ko: '안테카빌도의 조각 부조와 석조 명문', en: 'A carved relief and stone inscription in the Antecabildo', ja: 'アンテカビルドの浮彫と石造銘文', zh: '安特卡比尔多的浮雕与石刻铭文' },
      caption: { ko: '안테카빌도의 조각 부조', en: 'Carved relief in the Antecabildo', ja: 'アンテカビルドの彫刻浮彫', zh: '安特卡比尔多浮雕' }
    },
    'antecabilido-jesus-in-temple-relief.webp': {
      alt: { ko: '안테카빌도의 조각 부조와 석조 명문', en: 'A carved relief and stone inscription in the Antecabildo', ja: 'アンテカビルドの浮彫と石造銘文', zh: '安特卡比尔多的浮雕与石刻铭文' },
      caption: { ko: '안테카빌도의 조각 부조', en: 'Carved relief in the Antecabildo', ja: 'アンテカビルドの彫刻浮彫', zh: '安特卡比尔多浮雕' }
    },
    'antecabilido-wisdom-relief.webp': {
      alt: { ko: '안테카빌도의 조각 부조와 석조 명문', en: 'A carved relief and stone inscription in the Antecabildo', ja: 'アンテカビルドの浮彫と石造銘文', zh: '安特卡比尔多的浮雕与石刻铭文' },
      caption: { ko: '안테카빌도의 조각 부조', en: 'Carved relief in the Antecabildo', ja: 'アンテカビルドの彫刻浮彫', zh: '安特卡比尔多浮雕' }
    },
    'antecabilido-pentecost-relief.webp': {
      alt: { ko: '안테카빌도의 조각 부조와 주변 건축', en: 'A relief and surrounding architecture in the Antecabildo', ja: 'アンテカビルドの浮彫と周辺建築', zh: '安特卡比尔多的浮雕与周边建筑' },
      caption: { ko: '안테카빌도의 부조와 주변 건축', en: 'Relief and surrounding architecture in the Antecabildo', ja: 'アンテカビルドの浮彫と周辺建築', zh: '安特卡比尔多浮雕与周边建筑' }
    },
    'antecabilido-coffered-ceiling-pax-vobis.webp': {
      alt: { ko: '기하학적 카세톤 장식 천장과 아래쪽의 “PAX VOBIS” 명문', en: 'Geometric coffered ceiling and the “PAX VOBIS” inscription below', ja: '幾何学模様の格天井と下部の「PAX VOBIS」の銘文', zh: '几何纹样的藻井天花板及下方的“PAX VOBIS”铭文' },
      caption: { ko: '카세톤 장식 천장과 “PAX VOBIS”', en: 'Coffered ceiling and “PAX VOBIS”', ja: '格天井と「PAX VOBIS」', zh: '藻井天花板与“PAX VOBIS”' }
    },
    'antecabilido-coffered-ceiling-view.webp': {
      alt: { ko: '사각 채광부가 보이는 카세톤 장식 천장의 두 번째 구도', en: 'A second view of the coffered ceiling with a square opening', ja: '四角い開口部が見える格天井の別角度', zh: '可见方形开口的藻井天花板另一视角' },
      caption: { ko: '카세톤 장식 천장의 다른 구도', en: 'A second view of the coffered ceiling', ja: '格天井を別の角度から撮影', zh: '藻井天花板的另一视角' }
    },
    'antecabilido-babel-relief.webp': {
      alt: { ko: '안테카빌도의 조각 부조와 석조 명문', en: 'A carved relief and stone inscription in the Antecabildo', ja: 'アンテカビルドの浮彫と石造銘文', zh: '安特卡比尔多的浮雕与石刻铭文' },
      caption: { ko: '안테카빌도의 조각 부조', en: 'Carved relief in the Antecabildo', ja: 'アンテカビルドの彫刻浮彫', zh: '安特卡比尔多浮雕' }
    },
    'antecabilido-babylon-relief.webp': {
      alt: { ko: '안테카빌도의 조각 부조와 석조 명문', en: 'A carved relief and stone inscription in the Antecabildo', ja: 'アンテカビルドの浮彫と石造銘文', zh: '安特卡比尔多的浮雕与石刻铭文' },
      caption: { ko: '안테카빌도의 조각 부조', en: 'Carved relief in the Antecabildo', ja: 'アンテカビルドの彫刻浮彫', zh: '安特卡比尔多浮雕' }
    },
    'antecabilido-moses-aaron-relief.webp': {
      alt: { ko: '안테카빌도의 조각 부조와 석조 명문', en: 'A carved relief and stone inscription in the Antecabildo', ja: 'アンテカビルドの浮彫と石造銘文', zh: '安特卡比尔多的浮雕与石刻铭文' },
      caption: { ko: '안테카빌도의 조각 부조', en: 'Carved relief in the Antecabildo', ja: 'アンテカビルドの彫刻浮彫', zh: '安特卡比尔多浮雕' }
    },
    'antecabilido-haman-relief.webp': {
      alt: { ko: '안테카빌도의 조각 부조와 석조 명문', en: 'A carved relief and stone inscription in the Antecabildo', ja: 'アンテカビルドの浮彫と石造銘文', zh: '安特卡比尔多的浮雕与石刻铭文' },
      caption: { ko: '안테카빌도의 조각 부조', en: 'Carved relief in the Antecabildo', ja: 'アンテカビルドの彫刻浮彫', zh: '安特卡比尔多浮雕' }
    }
  };

var DATA = {
    ko: {
      heading: '세비야 대성당과 주변 예술 공간',
      intro: '세비야 대성당의 역사와 대표 작품, 주변 예배 공간을 사진과 함께 살펴봅니다. 작품명이나 장면을 확인하기 어려운 경우에는 보이는 모습 중심으로 소개합니다.',
      sourcesLabel: '참고 자료',
      topics: {
        history: {
          title: '모스크의 터에서 고딕 대성당으로', photos: ['cathedral-pier.webp', 'cathedral-vaults.webp'],
          paragraphs: [
            '세비야 대성당·알카사르·인디아스 고문서관은 1987년 함께 유네스코 세계유산에 등재되었습니다. 대성당은 알모하드 대모스크 터에 세워졌고, 히랄다는 옛 미나렛을 바탕으로 한 탑이며 오렌지 중정도 옛 모스크의 흔적입니다.',
            '1248년 카스티야 정복 뒤 모스크는 기독교 예배 공간으로 전용되었습니다. 참사회는 1401년 새 고딕 성당 건설을 결정했고, 공식 건축사는 공사 완성을 1519년으로 기록합니다. 대성당은 5랑식이며 옛 공간 배치와 고딕 건축이 결합했습니다. 유네스코는 유럽에서 가장 큰 고딕 건물로 소개합니다.',
            '히랄다의 높이는 유네스코 자료에서 지면부터 풍향계까지 97.52m로 제시됩니다. 2026년 대성당 발표는 종탑 르네상스 상부의 보존 공사가 약 22개월 걸릴 것으로 예상하고, 공사 중에도 관람을 이어갈 계획이라고 밝혔습니다. 이는 당시의 계획이므로 방문 전 최신 공식 안내를 확인하세요. “후세가 우리를 미쳤다고 할 만큼 크게 짓자”는 1401년 직접 인용과 1356년 지진을 공사의 직접 원인으로 보는 설명은 확인된 동시대 근거가 없어 여기서는 사실처럼 인용하지 않습니다.'
          ],
          sources: ['unesco', 'construction', 'giralda', 'phaseVI']
        },
        interior: {
          title: '주 제단화와 대성당의 주요 조각', photos: ['cathedral-retablo-mayor.webp', 'cathedral-cervantes-tomb.webp'],
          paragraphs: [
            '주 제단화(레타블로 마요르)는 플랑드르 조각가 피터 당카르트의 설계로 1482년 시작되어 여러 장인이 작업을 이어 갔고, 1564년에 완성되었습니다. 대성당은 높이 약 30m·폭 약 20m, 44개 부조와 이를 둘러싼 200여 성인상을 기록합니다. 중앙의 성좌의 성모상은 13세기 후반부터 주 제단을 지켜 왔습니다.',
            '콜럼버스의 유해는 1899년 세비야에 도착해 1902년 현재의 묘에 안치되었습니다. 아르투로 멜리다의 설계에서 네 전령은 카스티야·레온·아라곤·나바라를 나타냅니다. 시계의 제작자·연도와 크로노스라는 해석은 확인할 만한 기관 자료가 없어 단정하지 않습니다.',
            '성가대석은 117석이며 공식 자료는 누프로 산체스와 피터 단카르의 제작 참여를 설명합니다. 성가대 중앙의 르네상스 악보대는 1562–1565년 목재·청동으로 제작되었고, 바르톨로메 모렐이 청동 부조를 주조했습니다. 이곳의 후안 데 세르반테스 추기경 묘와 인접한 1819년 창도 눈여겨볼 만합니다. 은의 제단은 주요 전례 때 주 제단 앞에 놓던 구조물이며, 2026년 5월 공식 공지는 현장 조립의 마지막 단계라고 했습니다. 그 뒤 완료 여부는 확인된 자료가 없어 최신 상태를 단정하지 않습니다.'
          ],
          sources: ['gothic', 'columbus', 'sculpture', 'cervantes', 'stained', 'renAdditions']
        },
        chapels: {
          title: '성작 성구실과 고통의 성모 예배당', photos: ['chapel-marcelo-spinola-tomb.webp', 'chapel-dolores-altarpiece.webp', 'sacristia-paintings.webp'],
          paragraphs: [
            '성작의 성구실은 1509년 Alonso Rodríguez가 공사를 시작했고, 현재 대성당 소장 회화 중 일부를 전시합니다. 고야의 《성녀 후스타와 루피나》는 1817년작(309×177cm)입니다. 대성당 참사회가 의뢰했고 Ceán Bermúdez가 중재했으며, 고야는 28,000레알을 받고 1818년에 그림을 인도했습니다. 성녀들의 도공 도구·순교의 종려가지와 사자 등은 역사적으로 확인된 생애라기보다 성인전 전승과 그림의 도상으로 소개합니다.',
            '알레호 페르난데스의 네 패널은 1508–1512년 작품입니다. 대성당은 주제를 《성 요아킴과 성 안나의 포옹》, 《성모 탄생》, 《동방박사의 경배》, 《아기 예수의 성전 봉헌》으로 기록합니다. 대성당 목록에는 후안 누녜스의 《성 빈첸시오·성 미카엘 및 기증자가 함께 있는 피에타》도 수록되어 있습니다.',
            '복자 마르셀로 스피놀라는 법률 경력과 빈민 무료 변론을 거쳐 사제가 되었고 말라가 주교·세비야 대주교를 지냈으며, 1899년 《El Correo de Andalucía》를 창간했습니다. 호아킨 빌바오의 묘는 대성당 조각 안내상 1912년에 완성되었습니다. 고통의 성모 예배당에서는 십자가상을 16세기 말 후안 바우티스타 바스케스 엘 비에호의 작품으로, 성모상은 페드로 데 메나의 약 1680년 귀속작으로 설명합니다. 제단 전면에는 수난 도상이 보이며, 벽면의 두 회화는 작가·제목을 확인하기 어려워 작품명을 단정하지 않습니다.'
          ],
          sources: ['sacristia', 'goya', 'nunez', 'spinola', 'spinolaTomb', 'dolores']
        },
        antecabildo: {
          title: '안테카빌도: 참사회실 앞의 르네상스 공간', photos: [
            'antecabilido-apelles-relief.webp', 'antecabilido-jesus-in-temple-relief.webp', 'antecabilido-wisdom-relief.webp', 'antecabilido-pentecost-relief.webp',
            'antecabilido-coffered-ceiling-pax-vobis.webp', 'antecabilido-coffered-ceiling-view.webp', 'antecabilido-babel-relief.webp', 'antecabilido-babylon-relief.webp', 'antecabilido-moses-aaron-relief.webp', 'antecabilido-haman-relief.webp'
          ],
          paragraphs: [
            '안테카빌도는 안쪽 타원형 참사회실(Sala Capitular)에 앞선 공간입니다. 세비야 대성당의 공식 연표는 에르난 루이스가 1560년에 설계하고 1583년에 완공했다고 기록합니다. 안테카빌도와 참사회실은 별개 공간이므로, 참사회실의 도상 프로그램과 조각가 귀속을 이 방 전체에 옮겨 붙이지 않습니다.',
            '벽면의 부조와 라틴어 명문은 이 공간의 중요한 시각 요소입니다. 다만 작품별 제목·작가·연대와 긴 라틴어 해석을 확정할 만한 자료가 충분하지 않아, 여기서는 구체적인 장면명이나 상징을 단정하지 않습니다.',
            '천장과 출입구 주변을 담은 사진 한 장에는 “PAX VOBIS”가 보이며, 라틴어 성경 누가복음 24장 36절의 “너희에게 평화가 있기를”이라는 인사와 일치합니다. 다른 천장 사진에서는 “IN PACE IN IDIPSVM”를 확인할 수 없어 특정 위치의 명문으로 연결하지 않습니다. 시편 4편의 라틴어 구절 자체는 “평안히 눕고 쉬리라”에 가깝고, “하나 되어”라는 표현은 직역이 아닌 해석입니다.'
          ],
          sources: ['anteTimeline', 'renAdditions', 'anteSupplement', 'luke', 'psalm']
        }
      }
    },
    en: {
      heading: 'Seville Cathedral and its surrounding art spaces',
      intro: 'Explore the cathedral’s history, major works and adjoining chapels through photographs. Where a work’s title or scene cannot be confirmed, the guide describes only what is visible.',
      sourcesLabel: 'Sources',
      topics: {
        history: {
          title: 'From mosque precinct to Gothic cathedral', photos: ['cathedral-pier.webp', 'cathedral-vaults.webp'],
          paragraphs: [
            'The Cathedral, Alcázar and Archivo de Indias in Seville were inscribed together on the UNESCO World Heritage List in 1987. The cathedral stands on the site of the Almohad Great Mosque. The Giralda is based on its former minaret, and the Patio de los Naranjos also preserves traces of the mosque.',
            'After the Castilian conquest in 1248, the mosque was adapted for Christian worship. The chapter decided to build a new Gothic cathedral in 1401; the cathedral’s official construction history dates completion to 1519. The five-aisled building combines the earlier site layout with later Gothic construction. UNESCO describes it as Europe’s largest Gothic building.',
            'UNESCO gives the Giralda’s height as 97.52 m from ground level to the weather vane. In a 2026 announcement, the cathedral projected about 22 months for Phase VI conservation of the Renaissance upper section and said visits were expected to continue during the work. That was a plan at the time, not a guarantee of current access. A popular “build it so large that future generations will think us mad” quotation and a direct causal link to the 1356 earthquake could not be confirmed in contemporary institutional evidence, so they are not quoted as established fact here.'
          ],
          sources: ['unesco', 'construction', 'giralda', 'phaseVI']
        },
        interior: {
          title: 'The main altarpiece and major works inside', photos: ['cathedral-retablo-mayor.webp', 'cathedral-cervantes-tomb.webp'],
          paragraphs: [
            'The main altarpiece (Retablo Mayor) began in 1482 to a design by Flemish sculptor Pieter Dancart. Several artists continued the work, completed in 1564. The cathedral records dimensions of about 30 m high by 20 m wide, with 44 relief panels and more than 200 saint figures around them. The central Virgin of the See has stood at the high altar since the late 13th century.',
            'Columbus’s remains reached Seville in 1899 and were placed in the present monument in 1902. In Arturo Mélida’s design, the four heralds represent Castile, León, Aragon and Navarre. The clock’s maker, date and proposed identification as Chronos are not supported by the institutional sources available, so they are left unasserted.',
            'The choir has 117 seats; the cathedral records the work of Nufro Sánchez and Pieter Dancart. Its Renaissance central music stand was made in wood and bronze between 1562 and 1565, with Bartolomé Morel casting the bronze reliefs. Also look for Cardinal Juan de Cervantes’s tomb and a nearby window dated 1819. The Silver/Jubilee Altar was a structure set before the high altar for major liturgies. A May 2026 cathedral notice still described final on-site assembly, so its later completion and current display location are not asserted here.'
          ],
          sources: ['gothic', 'columbus', 'sculpture', 'cervantes', 'stained', 'renAdditions']
        },
        chapels: {
          title: 'The Chalice Sacristy and Chapel of Our Lady of Sorrows', photos: ['chapel-marcelo-spinola-tomb.webp', 'chapel-dolores-altarpiece.webp', 'sacristia-paintings.webp'],
          paragraphs: [
            'Work on the Chalice Sacristy began in 1509 under Alonso Rodríguez; today it displays selected paintings from the cathedral collection. Goya’s Saints Justa and Rufina dates to 1817 and measures 309 × 177 cm. The cathedral chapter commissioned it through Ceán Bermúdez; Goya received 28,000 reales and delivered it in 1818. The saints’ pottery, martyr’s palms and lion are best described as hagiographic tradition and pictorial attributes, not independently verified biography.',
            'Four panels by Alejo Fernández date to 1508–1512. The cathedral lists their subjects as The Embrace of Saints Joachim and Anne, The Birth of the Virgin, The Adoration of the Magi and The Presentation of Jesus at the Temple. Its catalogue also lists Juan Núñez’s Pietà with Saints Vincent and Michael and a Donor.',
            'Blessed Marcelo Spínola studied law and offered free legal help to poor people before becoming a priest. He served as bishop of Málaga and archbishop of Seville, and founded El Correo de Andalucía in 1899. The cathedral’s sculpture guide dates Joaquín Bilbao’s tomb to 1912. In the Chapel of Our Lady of Sorrows, the crucifix is attributed to Juan Bautista Vázquez el Viejo and dated to the late 16th century; the Virgin is attributed to Pedro de Mena around 1680. Passion emblems are visible on the altar front, but their detailed individual meanings are not confirmed. The two wall paintings are shown without artist or title because their identities cannot be established from the image alone.'
          ],
          sources: ['sacristia', 'goya', 'nunez', 'spinola', 'spinolaTomb', 'dolores']
        },
        antecabildo: {
          title: 'The Antecabildo: Renaissance anteroom to the Chapter House', photos: [
            'antecabilido-apelles-relief.webp', 'antecabilido-jesus-in-temple-relief.webp', 'antecabilido-wisdom-relief.webp', 'antecabilido-pentecost-relief.webp',
            'antecabilido-coffered-ceiling-pax-vobis.webp', 'antecabilido-coffered-ceiling-view.webp', 'antecabilido-babel-relief.webp', 'antecabilido-babylon-relief.webp', 'antecabilido-moses-aaron-relief.webp', 'antecabilido-haman-relief.webp'
          ],
          paragraphs: [
            'The Antecabildo is the space before the oval Chapter House (Sala Capitular). The cathedral’s official timeline says Hernán Ruiz designed it in 1560 and it was completed in 1583. The two rooms are distinct, so the Chapter House’s iconographic programme and sculptor attributions should not be transferred wholesale to the Antecabildo.',
            'The reliefs and Latin inscriptions are among the room’s notable details. Reliable object-by-object records were not available to confirm the individual titles, makers, dates or long Latin interpretations, so the guide avoids assigning specific scenes or symbolism.',
            'One photograph of the ceiling and doorway shows “PAX VOBIS”, matching the greeting “Peace be with you” in Luke 24:36. A second ceiling view does not show “IN PACE IN IDIPSVM”, so that phrase is not assigned to a specific location. The Psalm 4 phrase itself is closer to “In peace I will lie down and sleep”; “united in peace” is an interpretation rather than a literal translation.'
          ],
          sources: ['anteTimeline', 'renAdditions', 'anteSupplement', 'luke', 'psalm']
        }
      }
    },
    ja: {
      heading: 'セビリア大聖堂と周辺の美術空間',
      intro: 'セビリア大聖堂の歴史、主な作品、隣接する礼拝堂を写真とともに紹介します。作品名や場面を確認できない場合は、写真で見える範囲を中心に説明します。',
      sourcesLabel: '参考資料',
      topics: {
        history: {
          title: 'モスク跡からゴシック大聖堂へ', photos: ['cathedral-pier.webp', 'cathedral-vaults.webp'],
          paragraphs: [
            'セビリア大聖堂、アルカサル、インディアス古文書館は1987年に共同でユネスコ世界遺産に登録されました。大聖堂はアルモハド朝の大モスク跡に建ちます。ヒラルダは旧ミナレットを基礎とする塔で、オレンジの中庭にもモスクの痕跡が残っています。',
            '1248年のカスティーリャによる征服後、モスクはキリスト教の礼拝に転用されました。参事会は1401年に新しいゴシック大聖堂の建設を決定し、公式建築史は完成を1519年としています。5廊式の建物には旧来の配置と後代のゴシック建築が組み合わされています。ユネスコはヨーロッパ最大のゴシック建築と紹介しています。',
            'ユネスコ資料によるヒラルダの高さは、地面から風向計まで97.52mです。大聖堂は2026年の発表で、ルネサンス期の上部を対象とする保存工事第6段階を約22か月と見込み、工事中も見学を続ける予定としました。これは当時の計画であり、現在の見学状況を保証するものではありません。「後世に狂人と思われるほど大きく建てよう」という有名な言葉や、1356年の地震を建設の直接原因とする同時代の機関資料は確認できなかったため、確定事実としては引用していません。'
          ],
          sources: ['unesco', 'construction', 'giralda', 'phaseVI']
        },
        interior: {
          title: '主祭壇衝立と大聖堂内の主な作品', photos: ['cathedral-retablo-mayor.webp', 'cathedral-cervantes-tomb.webp'],
          paragraphs: [
            '主祭壇衝立（レタブロ・マヨール）はフランドルの彫刻家ピーテル・ダンカールトの設計で1482年に着工し、複数の職人が制作を引き継いで1564年に完成しました。大聖堂の資料は高さ約30m、幅約20m、44枚の浮彫パネルと周囲の200体を超える聖人像を記録しています。中央の「聖座の聖母」は13世紀後半から主祭壇にあります。',
            'コロンブスの遺骸は1899年にセビリアへ到着し、1902年に現在の記念墓へ安置されました。アルトゥーロ・メリダの設計にある4人の伝令はカスティーリャ、レオン、アラゴン、ナバラを表します。時計の制作年・作者やクロノスの象徴という説明は、確認できる機関資料による裏付けがないため断定していません。',
            '聖歌隊席は117席で、大聖堂資料はヌフロ・サンチェスとピーテル・ダンカールの制作参加を記しています。中央のルネサンス様式の譜面台は1562～1565年に木と青銅で作られ、青銅浮彫はバルトロメ・モレルが鋳造しました。フアン・デ・セルバンテス枢機卿の墓と近くの1819年の窓も見どころです。「銀の祭壇／聖年祭壇」は大きな典礼の際に主祭壇前に設置された構造物です。2026年5月の公式発表では現地で最終組立中だったため、その後の完成や現在の展示場所は断定していません。'
          ],
          sources: ['gothic', 'columbus', 'sculpture', 'cervantes', 'stained', 'renAdditions']
        },
        chapels: {
          title: '聖杯の聖具室と悲しみの聖母礼拝堂', photos: ['chapel-marcelo-spinola-tomb.webp', 'chapel-dolores-altarpiece.webp', 'sacristia-paintings.webp'],
          paragraphs: [
            '聖杯の聖具室は1509年にアロンソ・ロドリゲスのもとで工事が始まり、現在は大聖堂所蔵絵画の一部を展示しています。ゴヤの《聖女フスタとルフィナ》は1817年作で、寸法は309×177cmです。参事会がセアン・ベルムデスを介して依頼し、ゴヤは28,000レアルを受け取り、1818年に納品しました。陶器、殉教の棕櫚、ライオンなどは確認済みの生涯ではなく、聖人伝の伝承と絵画の図像として紹介します。',
            'アレホ・フェルナンデスの4枚のパネルは1508～1512年作です。大聖堂は主題を《聖ヨアキムと聖アンナの抱擁》《聖母の誕生》《東方三博士の礼拝》《幼子イエスの神殿奉献》と記録しています。大聖堂の作品目録には、フアン・ヌニェス作《聖ビセンテ、聖ミカエル、寄進者を伴うピエタ》も掲載されています。',
            '福者マルセロ・スピノラは法律を学び、貧しい人々に無料で法的支援を行った後に司祭となりました。マラガ司教、セビリア大司教を務め、1899年に《El Correo de Andalucía》を創刊しました。大聖堂の彫刻案内はホアキン・ビルバオの墓碑を1912年完成としています。悲しみの聖母礼拝堂では、十字架像は16世紀末のフアン・バウティスタ・バスケス・エル・ビエホ作、聖母像はペドロ・デ・メナへの帰属作で1680年頃と説明します。祭壇前面には受難の象徴が見えますが、個々の記号の詳細な意味は確認できていません。壁面の2点の絵画は、画像だけでは作者・題名を特定できないため、作品名を付けずに紹介します。'
          ],
          sources: ['sacristia', 'goya', 'nunez', 'spinola', 'spinolaTomb', 'dolores']
        },
        antecabildo: {
          title: 'アンテカビルド：参事会室前のルネサンス空間', photos: [
            'antecabilido-apelles-relief.webp', 'antecabilido-jesus-in-temple-relief.webp', 'antecabilido-wisdom-relief.webp', 'antecabilido-pentecost-relief.webp',
            'antecabilido-coffered-ceiling-pax-vobis.webp', 'antecabilido-coffered-ceiling-view.webp', 'antecabilido-babel-relief.webp', 'antecabilido-babylon-relief.webp', 'antecabilido-moses-aaron-relief.webp', 'antecabilido-haman-relief.webp'
          ],
          paragraphs: [
            'アンテカビルドは、内側の楕円形の参事会室（Sala Capitular）に先立つ空間です。大聖堂の公式年表は、エルナン・ルイスが1560年に設計し、1583年に完成したと記録しています。両室は別の空間なので、参事会室の図像プログラムや彫刻家の帰属をアンテカビルド全体にそのまま当てはめません。',
            '壁面の浮彫とラテン語銘文は、この部屋の見どころです。作品ごとの題名・作者・年代や長いラテン語解釈は、信頼できる資料で十分に確認できないため、具体的な場面名や象徴を断定せずに紹介します。',
            '天井と出入口を写した写真の一枚には「PAX VOBIS」が見え、ルカ24章36節の「あなたがたに平和があるように」という挨拶と一致します。もう一枚の天井写真では「IN PACE IN IDIPSVM」を確認できないため、特定の場所の銘文としては扱いません。詩編4編の句自体は「安らかに横たわり、眠ろう」に近く、「平和のうちに一つになって」は直訳ではなく解釈です。'
          ],
          sources: ['anteTimeline', 'renAdditions', 'anteSupplement', 'luke', 'psalm']
        }
      }
    },
    zh: {
      heading: '塞维利亚主教座堂及周边艺术空间',
      intro: '通过照片了解塞维利亚主教座堂的历史、重要作品及相邻小堂。无法确认作品题名或场景时，仅介绍画面中可见的内容。',
      sourcesLabel: '参考资料',
      topics: {
        history: {
          title: '从清真寺旧址到哥特式主教座堂', photos: ['cathedral-pier.webp', 'cathedral-vaults.webp'],
          paragraphs: [
            '塞维利亚主教座堂、王宫和西印度群岛档案馆于1987年共同列入联合国教科文组织世界遗产名录。主教座堂建在阿尔摩哈德大清真寺旧址上。吉拉尔达塔以原清真寺宣礼塔为基础，橘园中庭也保留了清真寺的遗迹。',
            '卡斯蒂利亚于1248年征服塞维利亚后，清真寺被改作基督教礼拜空间。参事会于1401年决定建造新的哥特式主教座堂；主教座堂官方建筑史记载工程于1519年完成。这座五中殿建筑结合了旧有空间布局与后来的哥特式建造。联合国教科文组织称其为欧洲最大的哥特式建筑。',
            '联合国教科文组织给出的吉拉尔达塔高度为从地面至风向标97.52米。主教座堂在2026年的公告中预计文艺复兴时期塔身上部的第六阶段保护工程约需22个月，并表示工程期间计划继续开放参观。这是当时的计划，并非对目前开放状况的保证。关于“建得足以让后人认为我们疯了”的名言，以及1356年地震直接导致建造新堂的说法，未能在同时代机构资料中确认，因此不作为已证实事实引用。'
          ],
          sources: ['unesco', 'construction', 'giralda', 'phaseVI']
        },
        interior: {
          title: '主祭坛屏与堂内重要作品', photos: ['cathedral-retablo-mayor.webp', 'cathedral-cervantes-tomb.webp'],
          paragraphs: [
            '主祭坛屏（Retablo Mayor）于1482年按佛兰德雕塑家彼得·丹卡特的设计开工，之后由多位艺术家接续完成，工程于1564年结束。主教座堂资料记载其约高30米、宽20米，包含44幅浮雕，周围另有200多尊圣人雕像。中央的“圣座圣母”自13世纪后期起便位于主祭坛。',
            '哥伦布遗骸于1899年抵达塞维利亚，并于1902年安放在现有纪念墓中。阿图罗·梅利达设计中的四名传令官象征卡斯蒂利亚、莱昂、阿拉贡和纳瓦拉。有关钟表年代、制作者及其象征克洛诺斯的说法，未能从可靠的机构资料中确认，因此不作断言。',
            '唱诗班席有117个座位；主教座堂资料记录了努弗罗·桑切斯和彼得·丹卡特的参与。中央文艺复兴式乐谱架于1562至1565年间以木和青铜制成，青铜浮雕由巴托洛梅·莫雷尔铸造。枢机胡安·德·塞万提斯的墓及其附近一扇1819年的彩绘玻璃窗也值得留意。“银祭坛／禧年祭坛”曾在重要礼仪时置于主祭坛前。主教座堂2026年5月公告称现场组装仍处于最后阶段，因此不推断之后是否完成或目前陈列在哪里。'
          ],
          sources: ['gothic', 'columbus', 'sculpture', 'cervantes', 'stained', 'renAdditions']
        },
        chapels: {
          title: '圣杯圣器室与苦难圣母小堂', photos: ['chapel-marcelo-spinola-tomb.webp', 'chapel-dolores-altarpiece.webp', 'sacristia-paintings.webp'],
          paragraphs: [
            '圣杯圣器室于1509年在阿隆索·罗德里格斯主持下开工，如今陈列主教座堂藏画中的部分作品。戈雅的《圣女胡斯塔与鲁菲娜》作于1817年，尺寸为309×177厘米。主教座堂参事会经塞安·贝尔穆德斯委托此画；戈雅获得28,000雷亚尔，并于1818年交付。画中的陶器、殉道棕榈枝和狮子应作为圣徒传说与图像属性介绍，而非已独立证实的生平事实。',
            '阿莱霍·费尔南德斯的四幅画板作于1508至1512年。主教座堂列出的主题为《圣约阿敬与圣安娜相拥》《圣母诞生》《三王来朝》和《献耶稣于圣殿》。主教座堂目录还收录了胡安·努涅斯的《圣母怜子图（圣文森特、圣米迦勒与捐赠者）》。',
            '真福马塞洛·斯皮诺拉曾学习法律并为贫困者提供免费法律帮助，之后成为司铎。他先后担任马拉加主教和塞维利亚总主教，并于1899年创办《El Correo de Andalucía》。主教座堂雕塑资料将华金·毕尔巴鄂的墓雕完工时间记为1912年。在苦难圣母小堂，十字架像归于胡安·包蒂斯塔·巴斯克斯·埃尔·别霍，年代为16世纪末；圣母像则归于佩德罗·德·梅纳，约作于1680年。祭坛正面可见受难象征，但各个符号的具体含义尚未核实。墙上的两幅画在照片中可见，但仅凭图像难以确定作者与题名，因此不标注作品名称。'
          ],
          sources: ['sacristia', 'goya', 'nunez', 'spinola', 'spinolaTomb', 'dolores']
        },
        antecabildo: {
          title: '安特卡比尔多：议事厅前的文艺复兴空间', photos: [
            'antecabilido-apelles-relief.webp', 'antecabilido-jesus-in-temple-relief.webp', 'antecabilido-wisdom-relief.webp', 'antecabilido-pentecost-relief.webp',
            'antecabilido-coffered-ceiling-pax-vobis.webp', 'antecabilido-coffered-ceiling-view.webp', 'antecabilido-babel-relief.webp', 'antecabilido-babylon-relief.webp', 'antecabilido-moses-aaron-relief.webp', 'antecabilido-haman-relief.webp'
          ],
          paragraphs: [
            '安特卡比尔多是通往内部椭圆形议事厅（Sala Capitular）之前的空间。主教座堂官方年表记载，埃尔南·鲁伊斯于1560年设计该空间，并于1583年完工。两处是不同空间，因此不能把议事厅的图像方案和雕塑家归属直接套用于整个安特卡比尔多。',
            '墙面浮雕和拉丁文铭文是房间的重要看点。由于缺少可靠的逐件目录，具体作品题名、作者、年代及较长的拉丁文解读尚无法充分确认，因此不对场景和象征含义作定论。',
            '一张拍摄天花板与门口的照片中可见“PAX VOBIS”，与《路加福音》24:36中“愿你们平安”的问候相符。另一张天花板照片未显示“IN PACE IN IDIPSVM”，因此不将该语句对应到具体位置。《诗篇》第4篇的拉丁文原句更接近“我必安然躺下睡觉”；“在和平中合而为一”属于解释，而非直译。'
          ],
          sources: ['anteTimeline', 'renAdditions', 'anteSupplement', 'luke', 'psalm']
        }
      }
    }
  };

  var ALIASES = {
    antecabildo: [
      'antecábildo', 'antecabilido', 'antecabildo', 'chapter house anteroom', 'chapter house vestibule', 'anteroom to the chapter house',
      '안테카빌도', '참사회 대기실', '참사회실 앞', 'アンテカビルド', '参事会室前室', '参事会議室前室', '安特卡比尔多', '安特卡比尔多前厅', '议事厅前室'
    ],
    chapels: [
      'sacristía de los cálices', 'sacristia de los calices', 'chalice sacristy', 'chalices sacristy', 'sacristy', 'goya', 'justa and rufina', 'saints justa',
      'capilla de los dolores', 'chapel of our lady of sorrows', 'our lady of sorrows chapel', 'virgen de los dolores', 'dolores chapel', 'marcelo spínola', 'marcelo spinola', 'spinola tomb',
      '성작 성구실', '성작의 성구실', '고통의 성모', '고통의 성모 예배당', '스피놀라', '후스타와 루피나', '고야',
      '聖杯の聖具室', '悲しみの聖母礼拝堂', '聖女フスタ', 'スピノラ', 'ゴヤ',
      '圣杯圣器室', '苦难圣母小堂', '圣女胡斯塔', '斯皮诺拉', '戈雅'
    ],
    interior: [
      'retablo mayor', 'main altarpiece', 'high altar', 'altar de plata', 'altar del jubileo', 'silver altar', 'jubilee altar', 'columbus tomb', 'tomb of columbus', 'tumba de cristóbal colón', 'tumba de cristobal colon', 'coro de la catedral', 'cathedral choir', 'facistol', 'juan de cervantes', 'san hermenegildo',
      '주 제단화', '레타블로', '콜럼버스 묘', '콜롬버스 묘', '성가대', '은의 제단', '은 제단', '희년 제단', '악보대', '세르반테스 추기경',
      '主祭壇衝立', 'コロンブスの墓', '聖歌隊席', '銀の祭壇', '聖年祭壇', '譜面台', 'セルバンテス枢機卿',
      '主祭坛屏', '哥伦布墓', '唱诗班席', '银祭坛', '禧年祭坛', '乐谱架', '塞万提斯枢机'
    ],
    history: [
      'catedral de sevilla', 'seville cathedral', 'cathedral of seville', 'cathedral history', 'giralda', 'la giralda', 'patio de los naranjos', 'puerta del perdón', 'puerta del perdon', 'puerta de palos',
      '세비야 대성당', '세비야 대성당 역사', '히랄다', '오렌지 중정', '용서의 문', '팔로스의 문',
      'セビリア大聖堂', 'セビリア大聖堂の歴史', 'ヒラルダ', 'オレンジの中庭', '許しの門',
      '塞维利亚主教座堂', '塞维利亚大教堂', '塞维利亚主教座堂历史', '吉拉尔达塔', '橘园中庭'
    ]
  };

  function language(value) {
    var key = String(value || '').toLowerCase().split(/[-_]/)[0];
    return LANGS.indexOf(key) >= 0 ? key : 'en';
  }

  function escapeHtml(value) {
    return String(value == null ? '' : value).replace(/[&<>"']/g, function (char) {
      return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char];
    });
  }

  function normalize(value) {
    return String(value == null ? '' : value).toLocaleLowerCase().normalize('NFKC')
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '').normalize('NFC').replace(/[\s\u3000]+/g, ' ').trim();
  }

  function contains(text, alias) {
    var needle = normalize(alias);
    if (!needle) return false;
    if (/^[\x00-\x7f]+$/.test(needle)) {
      return new RegExp('(^|[^a-z0-9])' + needle.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '([^a-z0-9]|$)', 'i').test(text);
    }
    return text.indexOf(needle) !== -1;
  }

  function isPlanOrDirectionsQuery(query) {
    return /\b(?:itinerary|schedule|booking|booked|reservation|flight|airport|hotel|lodging|accommodation|route|directions|transit|transport|bus|train|taxi|metro|today|tomorrow|yesterday|day trip|how to reach|how do i get|how can i reach|get to|opening hours|opening time|hours|admission|ticket|price|cost|accessibility|wheelchair|mass time|closed|opening day)\b/i.test(query) ||
      /(?:숙소|항공|비행|공항|예약|일정|동선|경로|교통|이동|기차|택시|오늘|내일|가는 방법|어떻게 가|찾아가는 길|운영 시간|운영시간|영업시간|입장료|티켓|입장권|가격|요금|접근성|휠체어|미사 시간|미사시간|휴관|예배 시간|예배시간|行程|日程|予約|フライト|空港|ホテル|経路|交通|移動|バス|電車|タクシー|今日|明日|行き方|どうやって行|開館時間|営業時間|入場料|チケット|料金|価格|アクセス|車椅子|ミサの時間|休館日|怎么去|如何前往|路线|交通|公交|火车|出租车|今天|明天|开放时间|营业时间|门票|票价|价格|预订|无障碍|轮椅|弥撒时间|闭馆|开放日|horario|horarios|entradas|precio|cómo llegar|como llegar|accesibilidad)/i.test(query) ||
      /(?:^|[^가-힣])버스(?:$|[^가-힣])/.test(query) ||
      /\b(?:202\d|\d{1,2}:\d{2}|\d{1,2}\/\d{1,2}|\d{4}-\d{1,2}-\d{1,2})\b/.test(query);
  }

  function renderPhoto(filename, lang) {
    var info = PHOTO[filename];
    if (!info) return '';
    var caption = info.caption[lang], alt = info.alt[lang];
    return '<figure class="sg-guide-photo sg-cathedral-photo"><img src="' + escapeHtml(ROOT + filename) + '" alt="' + escapeHtml(alt) + '" loading="lazy" decoding="async"><figcaption>' + escapeHtml(caption) + '</figcaption></figure>';
  }

  function renderTopic(topic, lang, sourceLabel) {
    var paragraphs = topic.paragraphs.map(function (text) {
      return '<p>' + escapeHtml(text) + '</p>';
    }).join('');
    var photos = topic.photos.length ? '<div class="sg-cathedral-gallery">' + topic.photos.map(function (filename) { return renderPhoto(filename, lang); }).join('') + '</div>' : '';
    var sources = topic.sources.map(function (sourceId) {
      var source = SOURCE[sourceId];
      return '<li><a href="' + escapeHtml(source.url) + '" target="_blank" rel="noopener noreferrer">' + escapeHtml(source.label[lang]) + '</a></li>';
    }).join('');
    return '<details class="sg-guide-topic sg-cathedral-topic"><summary>' + escapeHtml(topic.title) + '</summary>' +
      '<div class="sg-guide-content">' + photos + paragraphs + '<p><strong>' + escapeHtml(sourceLabel) + '</strong></p>' +
      '<ul class="sg-guide-sources">' + sources + '</ul></div></details>';
  }

  function render(lang) {
    var mount = document.getElementById('seville-general-guide');
    if (!mount) return false;
    var current = language(lang), data = DATA[current];
    var old = mount.querySelector('#sg-seville-cathedral-review');
    if (old) old.remove();
    var section = document.createElement('section');
    section.className = 'sg-guide sg-cathedral-guide';
    section.id = 'sg-seville-cathedral-review';
    section.setAttribute('lang', current);
    section.innerHTML = '<h2>' + escapeHtml(data.heading) + '</h2><p class="sg-guide-intro">' + escapeHtml(data.intro) + '</p>' +
      renderTopic(data.topics.history, current, data.sourcesLabel) +
      renderTopic(data.topics.interior, current, data.sourcesLabel) +
      renderTopic(data.topics.chapels, current, data.sourcesLabel) +
      renderTopic(data.topics.antecabildo, current, data.sourcesLabel);
    mount.appendChild(section);
    return true;
  }

  var previousRender = window.renderSevilleGeneralGuide;
  if (typeof previousRender === 'function') {
    window.renderSevilleGeneralGuide = function (lang) {
      var result = previousRender.apply(this, arguments);
      if (result) render(lang);
      return result;
    };
  }

  function response(topicName, lang) {
    var data = DATA[language(lang)], topic = data.topics[topicName];
    var body = topic.paragraphs.map(function (text) { return escapeHtml(text); }).join('<br><br>');
    var links = topic.sources.map(function (sourceId) {
      var source = SOURCE[sourceId];
      return '<a href="' + escapeHtml(source.url) + '" target="_blank" rel="noopener noreferrer">' + escapeHtml(source.label[language(lang)]) + ' ↗</a>';
    }).join('<br>');
    return '<strong>' + escapeHtml(topic.title) + '</strong><br>' + body + '<br><br><strong>' + escapeHtml(data.sourcesLabel) + ':</strong><br>' + links;
  }

  var previousChatResponse = window.buildSevilleGeneralChatResponse;
  if (typeof previousChatResponse === 'function') {
    window.buildSevilleGeneralChatResponse = function (query, lang) {
      var text = String(query || ''), normalized = normalize(text);
      if (!isPlanOrDirectionsQuery(text)) {
        if (ALIASES.antecabildo.some(function (alias) { return contains(normalized, alias); })) return response('antecabildo', lang);
        if (ALIASES.chapels.some(function (alias) { return contains(normalized, alias); })) return response('chapels', lang);
        if (ALIASES.interior.some(function (alias) { return contains(normalized, alias); })) return response('interior', lang);
        if (ALIASES.history.some(function (alias) { return contains(normalized, alias); })) return response('history', lang);
      }
      return previousChatResponse.apply(this, arguments);
    };
  }
}());
