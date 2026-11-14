(function () {
  'use strict';

  var LANGS = ['ko', 'en', 'ja', 'zh'];
  var COPY = {
    ko: {
      heading: '그라나다 · 말라가 지역 안내',
      intro: '장소별 기본 정보와 확인할 점을 간단히 정리했습니다. 운영 여부와 현장 접근 조건은 방문 전 공식 안내를 확인해 주세요.',
      sectionLabels: ['그라나다 지역 참고', '말라가 지역 참고'],
      topics: {
        alcaiceria: {
          title: '알카이세리아 (Alcaicería)',
          body: '알카이세리아는 옛 나스르 왕조 비단시장이 있던 자리에 형성된 구역으로, 1843년 화재 뒤 더 작은 규모로 재건되었습니다. 좁은 골목에 공예품·기념품점이 모여 있으며, 일요일에는 점포별 영업 여부를 따로 확인하는 편이 좋습니다. 주변 골목은 좁고 자갈 포장이나 계단이 있는 곳도 있어 접근성을 일률적으로 보장하기 어렵습니다.',
          sources: [
            ['그라나다 관광청: 알카이세리아', 'https://turismo.granada.org/es/monumento/calle-emblematica/alcaiceria'],
            ['안달루시아 공식 관광 안내: 알카이세리아와 엘 바뉴엘로', 'https://www.andalucia.org/blog/post/alcaiceria-y-banos-arabes-de-el-banuelo/']
          ]
        },
        paseo: {
          title: '파세오 데 로스 트리스테스 (Paseo de los Tristes)',
          body: '파세오 데 로스 트리스테스(파세오 델 파드레 만혼)는 다로 강변의 카레라 델 다로에서 이어지며 알함브라를 바라볼 수 있는 곳입니다. 보행자 우선 구간이지만 허가 차량과 버스도 통행합니다. 거리, 경사, 노면 상태와 무단차 여부는 이 안내에서 검증되지 않았으므로 걷기 편한 지점에서 쉬거나 되돌아가는 식으로 살펴보세요. 알함브라 방향의 쿠에스타 델 레이 치코는 오르막입니다.',
          sources: [
            ['Visit Granada: Paseo de los Tristes에 관한 안내', 'https://visitgranada.com/ten-curiosities-about-the-paseo-de-los-tristes/'],
            ['그라나다 교통 안내: Carrera del Darro', 'http://www.movilidadgranada.com/carrera-del-darro.php'],
            ['알함브라 공식 FAQ', 'https://www.alhambra-patronato.es/en/visit/faq']
          ]
        },
        tapas: {
          title: '그라나다의 타파스',
          body: '그라나다의 많은 바에서는 음료 주문에 무료 타파스가 함께 나오지만, 모든 바나 모든 음료에 적용되는 것은 아닙니다. 주문 전에 포함 여부와 조건을 확인해 보세요. 이 관행을 말라가에도 동일하게 적용된다고 가정하지 마세요.',
          sources: [
            ['그라나다 관광청: 그라나다에서 타파스 즐기기', 'https://turismo.granada.org/en/what-do/tapas-granada']
          ]
        },
        muelle: {
          title: '말라가 지역 참고',
          body: '말라가 항구의 Muelle Uno는 산책로와 식당이 있는 구역이며, 운영자 안내에 따르면 Zoco는 보통 매월 첫 세 일요일에 열리지만 계절이나 특별 일정에 따라 달라질 수 있습니다. 공예·패션·식품 등이 소개되지만 특정 노점이나 음식이 있을 것으로 보장되지는 않습니다. 행사별 시간은 공식 공지를 확인하고, 야시장이나 야간 운영이라고 단정하지 마세요. 주변 보행로 일부는 비교적 넓어 짧게 둘러볼 수 있지만, 모든 구역이 평지이거나 무단차인 것은 아닙니다. 야경 감상과 행사의 운영 시간은 별개로 확인하는 것이 좋습니다.',
          sources: [
            ['Muelle Uno: El Zoco', 'https://www.muelleuno.com/el-zoco/'],
            ['Muelle Uno: 행사 일정', 'https://www.muelleuno.com/agenda-malaga/'],
            ['Muelle Uno: Schedule', 'https://www.muelleuno.com/en/schedule/']
          ]
        },
        gibralfaro: {
          title: '미라도르 데 히브랄파로 (Mirador de Gibralfaro)',
          body: '미라도르 데 히브랄파로에서는 말라가 도심과 항구 전망을 볼 수 있습니다. 공식 관광 안내는 오르막 경로나 차량·버스를 언급합니다. EMT 35번 노선은 카스티요 데 히브랄파로 정류장까지 확인되지만, 그곳에서 전망대까지의 마지막 보행 구간과 경사, 택시의 정확한 하차 지점은 여기서 확인되지 않았습니다. 이동 수단이나 하차 위치를 이용하기 전에 최신 현장 정보를 확인하세요. 말라가에서 Uber와 Cabify 서비스를 안내하는 공식 페이지가 있지만, 특정 시각의 배차·요금이나 전망대 진입을 보장하지는 않습니다.',
          sources: [
            ['말라가 관광청: 높은 곳에서 바라본 말라가', 'https://visita.malaga.eu/es/que-ver-y-hacer/blog/malaga-desde-las-alturas-p1587'],
            ['EMT 말라가: 35번 노선', 'https://www.emtmalaga.es/emt-mobile/informacionLinea.html?codLinea=35.0&sentido=1'],
            ['Uber: 말라가 서비스 안내', 'https://www.uber.com/global/en/r/cities/malaga-es-an-es/'],
            ['Cabify: 말라가 요금 안내', 'https://cabify.com/es/tarifas/malaga']
          ]
        }
      }
    },
    en: {
      heading: 'Granada · Málaga area guide',
      intro: 'A concise overview of local places and things to verify. Check official updates before visiting, as opening and access conditions can vary.',
      sectionLabels: ['Granada area notes', 'Málaga area notes'],
      topics: {
        alcaiceria: {
          title: 'Alcaicería',
          body: 'The Alcaicería occupies the area of the former Nasrid silk market and was rebuilt on a smaller scale after the 1843 fire. Its narrow lanes have craft and souvenir shops; check individual shops for Sunday opening. Nearby lanes are narrow, and some have cobbles or steps, so accessibility cannot be assumed throughout.',
          sources: [
            ['Granada Tourism: Alcaicería', 'https://turismo.granada.org/es/monumento/calle-emblematica/alcaiceria'],
            ['Official Andalusia tourism: Alcaicería and El Bañuelo', 'https://www.andalucia.org/blog/post/alcaiceria-y-banos-arabes-de-el-banuelo/']
          ]
        },
        paseo: {
          title: 'Paseo de los Tristes (Paseo del Padre Manjón)',
          body: 'Paseo de los Tristes (Paseo del Padre Manjón) continues from Carrera del Darro beside the Darro River and offers views of the Alhambra. It is pedestrian-priority, but authorized vehicles and buses also pass through. The distance, gradient, surface and step-free access have not been verified here; consider taking a break or turning back wherever feels comfortable. Cuesta del Rey Chico, the route uphill toward the Alhambra, is an ascent.',
          sources: [
            ['Visit Granada: notes on Paseo de los Tristes', 'https://visitgranada.com/ten-curiosities-about-the-paseo-de-los-tristes/'],
            ['Granada mobility information: Carrera del Darro', 'http://www.movilidadgranada.com/carrera-del-darro.php'],
            ['Official Alhambra FAQ', 'https://www.alhambra-patronato.es/en/visit/faq']
          ]
        },
        tapas: {
          title: 'Tapas in Granada',
          body: 'Many bars in Granada serve a complimentary tapa with a drink, but this does not apply to every bar or every drink. Check whether it is included and what conditions apply before ordering. Do not assume the same practice in Málaga.',
          sources: [
            ['Granada Tourism: Tapas in Granada', 'https://turismo.granada.org/en/what-do/tapas-granada']
          ]
        },
        muelle: {
          title: 'Málaga area notes',
          body: 'Málaga’s port-side Muelle Uno has a promenade and restaurants. Its operator says Zoco usually takes place on the first three Sundays of each month, though seasonal or special schedules may differ. The market features crafts, fashion and food, but no particular stall or food item is guaranteed. Check official event notices for individual times; do not assume it is a night market or that it operates at night. Some nearby walkways are relatively wide and may suit a short visit, but not every area is guaranteed to be level or step-free. Treat evening views and event operating hours as separate questions.',
          sources: [
            ['Muelle Uno: El Zoco', 'https://www.muelleuno.com/el-zoco/'],
            ['Muelle Uno: event agenda', 'https://www.muelleuno.com/agenda-malaga/'],
            ['Muelle Uno: schedule', 'https://www.muelleuno.com/en/schedule/']
          ]
        },
        gibralfaro: {
          title: 'Mirador de Gibralfaro',
          body: 'Mirador de Gibralfaro offers views of Málaga city and its port. The official tourism site mentions an uphill route or access by vehicle or bus. EMT route 35 is confirmed to the Castillo de Gibralfaro stop, but the final walk and gradient from there to the viewpoint, as well as the precise taxi drop-off point, have not been verified here. Check current local information before relying on a mode of access or drop-off. Uber and Cabify have Málaga service information, but this does not guarantee availability, fares at a particular time or access to the viewpoint.',
          sources: [
            ['Málaga Tourism: Málaga from above', 'https://visita.malaga.eu/es/que-ver-y-hacer/blog/malaga-desde-las-alturas-p1587'],
            ['EMT Málaga: route 35', 'https://www.emtmalaga.es/emt-mobile/informacionLinea.html?codLinea=35.0&sentido=1'],
            ['Uber: Málaga service information', 'https://www.uber.com/global/en/r/cities/malaga-es-an-es/'],
            ['Cabify: Málaga fares', 'https://cabify.com/es/tarifas/malaga']
          ]
        }
      }
    },
    ja: {
      heading: 'グラナダ・マラガ地域ガイド',
      intro: '地域の基本情報と確認事項を簡潔にまとめています。営業状況や現地のアクセス条件は変わることがあるため、訪問前に公式情報をご確認ください。',
      sectionLabels: ['グラナダ周辺の案内', 'マラガ周辺の案内'],
      topics: {
        alcaiceria: {
          title: 'アルカイセリア（Alcaicería）',
          body: 'アルカイセリアは、かつてのナスル朝時代の絹市場があった場所に広がる地区で、1843年の火災後、より小規模に再建されました。細い路地には工芸品や土産物の店があります。日曜日の営業は店舗ごとにご確認ください。周辺には狭い路地のほか、石畳や階段のある場所もあるため、全域での移動しやすさは保証できません。',
          sources: [
            ['グラナダ観光局：アルカイセリア', 'https://turismo.granada.org/es/monumento/calle-emblematica/alcaiceria'],
            ['アンダルシア公式観光案内：アルカイセリアとエル・バニュエロ', 'https://www.andalucia.org/blog/post/alcaiceria-y-banos-arabes-de-el-banuelo/']
          ]
        },
        paseo: {
          title: 'パセオ・デ・ロス・トリステス（Paseo del Padre Manjón）',
          body: 'パセオ・デ・ロス・トリステス（パセオ・デル・パドレ・マンホン）は、ダロ川沿いのカレーラ・デル・ダロから続き、アルハンブラを望める場所です。歩行者優先ですが、許可車両やバスも通行します。距離、勾配、路面、段差のないアクセスはここでは確認できていません。無理のない場所で休憩したり、引き返したりしながら散策してください。アルハンブラへ上るクエスタ・デル・レイ・チコは上り坂です。',
          sources: [
            ['Visit Granada：パセオ・デ・ロス・トリステスの案内', 'https://visitgranada.com/ten-curiosities-about-the-paseo-de-los-tristes/'],
            ['グラナダ交通案内：カレーラ・デル・ダロ', 'http://www.movilidadgranada.com/carrera-del-darro.php'],
            ['アルハンブラ公式FAQ', 'https://www.alhambra-patronato.es/en/visit/faq']
          ]
        },
        tapas: {
          title: 'グラナダのタパス',
          body: 'グラナダでは多くのバルで飲み物に無料のタパスが付きますが、すべての店・すべての飲み物が対象ではありません。注文前に含まれるか、条件があるかを確認してください。マラガでも同じ慣習があるとは限りません。',
          sources: [
            ['グラナダ観光局：グラナダのタパス', 'https://turismo.granada.org/en/what-do/tapas-granada']
          ]
        },
        muelle: {
          title: 'マラガ周辺の案内',
          body: 'マラガ港沿いのMuelle Unoには遊歩道や飲食店があります。運営者によると、Zocoは通常、毎月最初の3回の日曜日に開催されますが、季節や特別日程で変わる場合があります。工芸品、ファッション、食品などが紹介されますが、特定の出店や食品があるとは限りません。個別の開催時間は公式のお知らせをご確認ください。ナイトマーケットや夜間開催と決めつけないでください。周辺には比較的幅の広い歩道もあり短時間の散策に利用できる場合がありますが、全域が平坦または段差なしとは限りません。夜景の鑑賞とイベントの開催時間は分けてご確認ください。',
          sources: [
            ['Muelle Uno：El Zoco', 'https://www.muelleuno.com/el-zoco/'],
            ['Muelle Uno：イベント案内', 'https://www.muelleuno.com/agenda-malaga/'],
            ['Muelle Uno：スケジュール', 'https://www.muelleuno.com/en/schedule/']
          ]
        },
        gibralfaro: {
          title: 'ヒブラルファロ展望台（Mirador de Gibralfaro）',
          body: 'ヒブラルファロ展望台からはマラガの市街地と港を眺められます。公式観光案内では、坂道のルートまたは車・バスでのアクセスに触れています。EMTの35番はカスティージョ・デ・ヒブラルファロ停留所まで確認できますが、そこから展望台までの最後の徒歩区間や勾配、タクシーの正確な降車場所はここでは確認できていません。利用前に最新の現地情報をご確認ください。UberとCabifyにはマラガのサービス案内がありますが、特定時刻の配車・料金や展望台への乗り入れを保証するものではありません。',
          sources: [
            ['マラガ観光局：高台から見るマラガ', 'https://visita.malaga.eu/es/que-ver-y-hacer/blog/malaga-desde-las-alturas-p1587'],
            ['EMTマラガ：35番路線', 'https://www.emtmalaga.es/emt-mobile/informacionLinea.html?codLinea=35.0&sentido=1'],
            ['Uber：マラガのサービス案内', 'https://www.uber.com/global/en/r/cities/malaga-es-an-es/'],
            ['Cabify：マラガの料金', 'https://cabify.com/es/tarifas/malaga']
          ]
        }
      }
    },
    zh: {
      heading: '格拉纳达 · 马拉加地区指南',
      intro: '简要整理当地地点信息与注意事项。营业情况和现场通行条件可能变化，出发前请查看官方最新信息。',
      sectionLabels: ['格拉纳达地区参考', '马拉加地区参考'],
      topics: {
        alcaiceria: {
          title: '阿尔卡伊塞里亚（Alcaicería）',
          body: '阿尔卡伊塞里亚所在区域曾是纳斯里王朝的丝绸市场，1843年火灾后以较小规模重建。狭窄巷道里有手工艺品和纪念品商店；周日是否营业应逐家确认。附近巷道较窄，部分路面为鹅卵石或有台阶，因此不能保证整个区域都方便通行。',
          sources: [
            ['格拉纳达旅游局：阿尔卡伊塞里亚', 'https://turismo.granada.org/es/monumento/calle-emblematica/alcaiceria'],
            ['安达卢西亚官方旅游指南：阿尔卡伊塞里亚与埃尔巴纽埃洛', 'https://www.andalucia.org/blog/post/alcaiceria-y-banos-arabes-de-el-banuelo/']
          ]
        },
        paseo: {
          title: '悲伤者漫步道（Paseo de los Tristes / Paseo del Padre Manjón）',
          body: '悲伤者漫步道（Paseo del Padre Manjón）从达罗河畔的卡雷拉·德尔·达罗延伸而来，可眺望阿尔罕布拉宫。这里以行人为主，但获准车辆和公交车也会通行。此处未核实路程、坡度、路面和无台阶通行情况；可在感觉舒适的位置休息或折返。通往阿尔罕布拉宫的雷伊奇科坡道（Cuesta del Rey Chico）是上坡路。',
          sources: [
            ['Visit Granada：悲伤者漫步道介绍', 'https://visitgranada.com/ten-curiosities-about-the-paseo-de-los-tristes/'],
            ['格拉纳达交通信息：卡雷拉·德尔·达罗', 'http://www.movilidadgranada.com/carrera-del-darro.php'],
            ['阿尔罕布拉宫官方常见问题', 'https://www.alhambra-patronato.es/en/visit/faq']
          ]
        },
        tapas: {
          title: '格拉纳达的塔帕斯',
          body: '格拉纳达许多酒吧会在点饮品时赠送免费塔帕斯，但并非每家酒吧或每种饮品都适用。点单前请确认是否包含以及相关条件；不要默认马拉加也有相同做法。',
          sources: [
            ['格拉纳达旅游局：格拉纳达塔帕斯', 'https://turismo.granada.org/en/what-do/tapas-granada']
          ]
        },
        muelle: {
          title: '马拉加地区参考',
          body: '马拉加港区的Muelle Uno设有步行区域和餐饮场所。运营方称，Zoco通常在每月前三个星期日举办，但季节或特别安排可能不同。活动涉及手工艺、时尚和食品等，但不保证有某个特定摊位或食物。具体时间请查看官方活动公告，不要断定它是夜市或在夜间举办。附近部分步道相对宽阔，可能适合短暂散步，但不能保证所有区域平坦或无台阶。夜景观赏与活动营业时间应分别确认。',
          sources: [
            ['Muelle Uno：El Zoco', 'https://www.muelleuno.com/el-zoco/'],
            ['Muelle Uno：活动日程', 'https://www.muelleuno.com/agenda-malaga/'],
            ['Muelle Uno：Schedule', 'https://www.muelleuno.com/en/schedule/']
          ]
        },
        gibralfaro: {
          title: '希布拉尔法罗观景台（Mirador de Gibralfaro）',
          body: '希布拉尔法罗观景台可眺望马拉加市区和港口。官方旅游信息提到上坡路线，也提及车辆或公交到达。已确认EMT 35路可到Castillo de Gibralfaro站，但从该站到观景台的最后一段步行路线及坡度、出租车的准确下车位置尚未核实。出行前请确认最新现场信息。Uber和Cabify有马拉加服务介绍，但不能保证特定时段有车、具体价格或车辆可驶入观景台。',
          sources: [
            ['马拉加旅游局：从高处看马拉加', 'https://visita.malaga.eu/es/que-ver-y-hacer/blog/malaga-desde-las-alturas-p1587'],
            ['EMT马拉加：35路', 'https://www.emtmalaga.es/emt-mobile/informacionLinea.html?codLinea=35.0&sentido=1'],
            ['Uber：马拉加服务信息', 'https://www.uber.com/global/en/r/cities/malaga-es-an-es/'],
            ['Cabify：马拉加价格信息', 'https://cabify.com/es/tarifas/malaga']
          ]
        }
      }
    }
  };

  var ALIASES = {
    alcaiceria: [
      'alcaiceria', 'alcaicería', '알카이세리아', '알카이세리아 시장', '실크 시장', '비단시장',
      'アルカイセリア', 'アルカイセリア市場', '阿尔卡伊塞里亚', '阿尔卡伊塞里亚市场'
    ],
    paseo: [
      'paseo de los tristes', 'paseo del padre manjon', 'paseo del padre manjón', 'carrera del darro',
      '파세오 데 로스 트리스테스', '파세오 델 파드레 만혼', '다로 강변', '다로강', '카레라 델 다로',
      'パセオ・デ・ロス・トリステス', 'パセオ デ ロス トリステス', 'カレーラ・デル・ダロ',
      '悲伤者漫步道', '悲伤者步道', '卡雷拉·德尔·达罗'
    ],
    tapas: [
      'granada tapas', 'tapas in granada', 'free tapas in granada', 'complimentary tapas',
      '그라나다 타파스', '그라나다 무료 타파스', '타파스 무료', '무료 타파스', '음료 타파스', '타파스 포함',
      'グラナダのタパス', 'グラナダ タパス', '無料タパス', '飲み物 タパス', 'タパス 無料',
      '格拉纳达塔帕斯', '格拉纳达的塔帕斯', '免费塔帕斯', '饮料 塔帕斯', '塔帕斯免费'
    ],
    muelle: [
      'muelle uno', 'zoco', 'mercado zoco', 'night market', 'night market in malaga', 'market in malaga',
      '말라가 무에예 우노', '무에예 우노', '무에예우노', '말라가 조코', '말라가 야시장',
      'マラガ ムエジェ・ウノ', 'ムエジェ・ウノ', 'マラガ ナイトマーケット', 'ゾコ',
      '马拉加穆埃列乌诺', '穆埃列乌诺', '马拉加夜市', '佐科市集'
    ],
    gibralfaro: [
      'mirador de gibralfaro', 'gibralfaro viewpoint', 'gibralfaro', '35 bus gibralfaro',
      '히브랄파로', '말라가 전망대',
      'ヒブラルファロ展望台', 'ヒブラルファロ', 'マラガ 展望台',
      '希布拉尔法罗观景台', '希布拉尔法罗', '马拉加观景台'
    ]
  };

  var SOURCE_LABELS = {
    ko: '관련 공식·참고 링크',
    en: 'Related official and reference links',
    ja: '関連する公式・参考リンク',
    zh: '相关官方与参考链接'
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

  function renderTopic(topic, lang, extraClass) {
    var data = topic[lang];
    var sourceLinks = data.sources.map(function (source) {
      return '<li><a href="' + escapeHtml(source[1]) + '" target="_blank" rel="noopener noreferrer">' + escapeHtml(source[0]) + '</a></li>';
    }).join('');
    return '<details class="gm-guide-topic' + (extraClass ? ' ' + extraClass : '') + '"><summary>' + escapeHtml(data.title) + '</summary>' +
      '<div class="gm-guide-topic-content"><p>' + escapeHtml(data.body) + '</p><ul class="gm-guide-sources">' + sourceLinks + '</ul></div></details>';
  }

  function renderGranadaMalagaGeneralGuide(lang) {
    var mount = document.getElementById('granada-malaga-general-guide');
    if (!mount) return false;
    var currentLang = language(lang);
    var copy = COPY[currentLang];
    var html = '<section class="gm-guide" lang="' + currentLang + '">' +
      '<style>' +
      '#granada-malaga-general-guide .gm-guide{box-sizing:border-box;width:100%;max-width:860px;margin:1rem auto;padding:clamp(1rem,3vw,1.5rem);border:1px solid #d9dee8;border-radius:14px;background:#fff;color:#1d2633;font:inherit;line-height:1.65;overflow-wrap:anywhere}' +
      '#granada-malaga-general-guide .gm-guide *{box-sizing:border-box}' +
      '#granada-malaga-general-guide .gm-guide h2{margin:0 0 .4rem;font-size:1.35rem;line-height:1.35}' +
      '#granada-malaga-general-guide .gm-guide-intro{margin:.25rem 0 1rem;color:#465365}' +
      '#granada-malaga-general-guide .gm-guide-group{margin:.9rem 0}' +
      '#granada-malaga-general-guide .gm-guide-group h3{margin:1rem 0 .4rem;font-size:1.05rem}' +
      '#granada-malaga-general-guide .gm-guide-topic{margin:.5rem 0;border:1px solid #e2e6ed;border-radius:9px;background:#fbfcfe}' +
      '#granada-malaga-general-guide .gm-guide-topic summary{padding:.75rem .9rem;font-weight:650;cursor:pointer;line-height:1.45}' +
      '#granada-malaga-general-guide .gm-guide-topic summary:focus-visible{outline:3px solid #2463eb;outline-offset:2px;border-radius:5px}' +
      '#granada-malaga-general-guide .gm-guide-topic-content{padding:0 .9rem .9rem}' +
      '#granada-malaga-general-guide .gm-guide-topic-content p{margin:.15rem 0 .65rem}' +
      '#granada-malaga-general-guide .gm-guide-sources{margin:.4rem 0 0;padding-left:1.25rem}' +
      '#granada-malaga-general-guide .gm-guide-sources li{margin:.25rem 0}' +
      '#granada-malaga-general-guide .gm-guide a{color:#0645ad;text-decoration:underline;text-underline-offset:2px;overflow-wrap:anywhere}' +
      '@media(max-width:480px){#granada-malaga-general-guide .gm-guide{border-radius:8px;margin:.5rem auto;padding:1rem}#granada-malaga-general-guide .gm-guide-topic summary{padding:.7rem}}' +
      '</style>' +
      '<h2>' + escapeHtml(copy.heading) + '</h2><p class="gm-guide-intro">' + escapeHtml(copy.intro) + '</p>' +
      '<div class="gm-guide-group"><h3>' + escapeHtml(copy.sectionLabels[0]) + '</h3>' +
      renderTopic({ ko: COPY.ko.topics.alcaiceria, en: COPY.en.topics.alcaiceria, ja: COPY.ja.topics.alcaiceria, zh: COPY.zh.topics.alcaiceria }, currentLang) +
      renderTopic({ ko: COPY.ko.topics.paseo, en: COPY.en.topics.paseo, ja: COPY.ja.topics.paseo, zh: COPY.zh.topics.paseo }, currentLang) +
      renderTopic({ ko: COPY.ko.topics.tapas, en: COPY.en.topics.tapas, ja: COPY.ja.topics.tapas, zh: COPY.zh.topics.tapas }, currentLang) +
      '</div><div class="gm-guide-group"><h3>' + escapeHtml(copy.sectionLabels[1]) + '</h3>' +
      '<p class="gm-guide-muelle-note">' + escapeHtml(COPY[currentLang].topics.muelle.body) + '</p><ul class="gm-guide-sources">' +
      COPY[currentLang].topics.muelle.sources.map(function (source) { return '<li><a href="' + escapeHtml(source[1]) + '" target="_blank" rel="noopener noreferrer">' + escapeHtml(source[0]) + '</a></li>'; }).join('') +
      '</ul>' +
      renderTopic({ ko: COPY.ko.topics.gibralfaro, en: COPY.en.topics.gibralfaro, ja: COPY.ja.topics.gibralfaro, zh: COPY.zh.topics.gibralfaro }, currentLang) +
      '</div></section>';
    mount.innerHTML = html;
    return true;
  }

  function normalizeQuery(query) {
    return String(query == null ? '' : query).toLocaleLowerCase().normalize('NFKC')
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

  function buildGranadaMalagaGeneralChatResponse(query, lang) {
    var currentLang = language(lang);
    var normalized = normalizeQuery(query);
    if (!normalized) return null;

    var selected = null;
    var malagaContext = [
      'malaga', 'málaga', '말라가', 'マラガ', '马拉加', 'muelle uno', '무에예 우노', 'ムエジェ・ウノ', '穆埃列乌诺'
    ].some(function (alias) { return containsAlias(normalized, alias); });

    // Specific place queries take precedence, so a tapas mention cannot hijack another topic.
    if (ALIASES.alcaiceria.some(function (alias) { return containsAlias(normalized, alias); })) {
      selected = 'alcaiceria';
    } else if (ALIASES.paseo.some(function (alias) { return containsAlias(normalized, alias); })) {
      selected = 'paseo';
    } else if (ALIASES.gibralfaro.some(function (alias) { return containsAlias(normalized, alias); })) {
      selected = 'gibralfaro';
    } else if (ALIASES.muelle.some(function (alias) { return containsAlias(normalized, alias); }) && (malagaContext || /(?:zoco|조코|ゾコ|佐科)/i.test(normalized))) {
      selected = 'muelle';
    } else if (malagaContext && /(?:night market|mercado nocturno|야시장|ナイトマーケット|夜市)/i.test(normalized)) {
      selected = 'muelle';
    } else if (ALIASES.tapas.some(function (alias) { return containsAlias(normalized, alias); }) ||
      (/(?:tapa|tapas|타파스|タパス|塔帕斯)/i.test(normalized) && /(?:free|complimentary|included|gratis|gratuit|무료|포함|無料|免费|赠送|包含)/i.test(normalized))) {
      var granadaContext = /(?:granada|그라나다|グラナダ|格拉纳达)/i.test(normalized);
      if (malagaContext || !granadaContext || /(?:맛집|식당|restaurant|おすすめ|餐厅|diamantes|carmela)/i.test(normalized)) return null;
      selected = 'tapas';
    }

    if (!selected) return null;
    var data = COPY[currentLang].topics[selected];
    var sources = data.sources.map(function (source) {
      return '<a href="' + escapeHtml(source[1]) + '" target="_blank" rel="noopener noreferrer">' + escapeHtml(source[0]) + ' ↗</a>';
    }).join('<br>');
    return '<strong>' + escapeHtml(data.title) + '</strong><br>' + escapeHtml(data.body) + '<br><br>' + escapeHtml(SOURCE_LABELS[currentLang]) + ':<br>' + sources;
  }

  window.renderGranadaMalagaGeneralGuide = renderGranadaMalagaGeneralGuide;
  window.buildGranadaMalagaGeneralChatResponse = buildGranadaMalagaGeneralChatResponse;
}());
