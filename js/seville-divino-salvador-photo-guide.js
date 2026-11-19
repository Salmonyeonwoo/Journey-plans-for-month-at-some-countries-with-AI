/* Additive photo guide for the Collegiate Church of El Divino Salvador. */
(function () {
  'use strict';
  var LANGS = ['ko', 'en', 'ja', 'zh'];
  var ROOT = 'img/user-seville-divino-salvador-review/';
  var SOURCES = [
    'https://www.turismosevilla.org/en/what-see-and-do/heritage/monuments/iglesia-colegial-del-divino-salvador',
    'https://www.catedraldesevilla.es/en/collegiate-salvador/collegiate-church/history/',
    'https://www.spain.info/en/places-of-interest/collegiate-church-divino-salvador/'
  ];
  var DATA = {
    ko: {
      title: '엘 살바도르 참사회 성당과 피네다 가문 예배당 (Iglesia Colegial del Divino Salvador)',
      parts: [
        ['한 장소에 겹친 역사', '현재의 엘 살바도르 성당은 바로크 양식이지만, 이 터에는 로마·서고트 시대와 이슬람 시대의 흔적이 겹쳐 있습니다. 성당 공식 연혁은 옛 이븐 아다바스 모스크의 중정과 미나렛이 이후 교회 공간과 종탑으로 이어진 역사를 설명합니다.'],
        ['성당 내부', '공식 관광 안내에 따르면 성당은 직사각형 평면의 세 개 본당과 배럴 볼트·교차 볼트를 갖추고 있습니다. 주 제단화와 성체 예배당이 주요 볼거리로 꼽힙니다. 사용자 사진에는 높은 석조 기둥, 신자석, 금빛 제단화와 장식 목조 좌석 등 내부 모습이 담겨 있습니다.'],
        ['피네다 가문 예배당', '오렌지 나무 중정에는 14세기 무데하르 고딕 양식의 피네다 가문 장례 예배당이 있습니다. 사용자가 촬영한 현장 안내문은 피네다 가문이 14세기 말 매장용 사설 예배당으로 세웠으며, 타일 장식 묘비 세 점 가운데 현재 한 점만 남았다고 설명합니다.']
      ],
      sourceLabel: '공식 자료',
      sourceNames: ['세비야 관광청 · 엘 살바도르 성당', '세비야 대성당 · 엘 살바도르 성당 연혁', '스페인 공식 관광 포털 · 엘 살바도르 성당'],
      photoAlt: '세비야 엘 살바도르 성당 내부의 사용자 제공 사진',
      captions: {
        'salvador-2388.webp': '성당의 금빛 제단과 높은 천장',
        'salvador-2390.webp': '석조 기둥 너머로 보이는 금빛 제단과 신자석',
        'salvador-2391.webp': '제단과 석조 강단, 신자석이 보이는 성당 내부',
        'salvador-2392.webp': '성당 중앙 제단의 금빛 조각 장식',
        'salvador-2393.webp': '석조 기둥 사이로 보이는 장식 제단',
        'salvador-2394.webp': '스테인드글라스 아래 측면 제단과 회랑',
        'salvador-2400.webp': '조각 목조 좌석과 대형 종교화 액자',
        'salvador-2401.webp': '금빛 액자 그림과 목조 좌석이 있는 예배 공간',
        'salvador-2402.webp': '벽의 종교화와 조각 목조 좌석, 관람 경계선',
        'salvador-2406.webp': '엘 살바도르 성당 연혁 안내판',
        'salvador-2407.webp': '피네다 가문 예배당 현장 안내판',
        'salvador-2410.webp': '신자석과 제단이 보이는 예배 공간'
      }
    },
    en: {
      title: 'Collegiate Church of El Divino Salvador & the Pineda Family Chapel',
      parts: [
        ['Layers of history on one site', 'The present Church of El Salvador is Baroque, while the site preserves traces of Roman, Visigothic and Islamic-era use. The church’s official history describes how the courtyard and minaret of the former Ibn Adabbas Mosque were later incorporated into the Christian church complex and its bell tower.'],
        ['Inside the church', 'Official tourism information describes a rectangular church with three naves, barrel vaults and groin vaults. The main altarpiece and Sacramental Chapel are highlights. Your photos show the interior, including tall stone piers, pews, gilded altarpieces and carved wooden seating.'],
        ['The Pineda Family Chapel', 'The orange-tree courtyard gives access to the 14th-century funerary chapel of the Pineda family, described by Seville Tourism as Mudejar Gothic. The site notice in your photo says the family founded it at the end of the 14th century as a private burial chapel; of three tiled grave slabs, only one survives.']
      ],
      sourceLabel: 'Official sources',
      sourceNames: ['Seville Tourism · El Salvador Church', 'Seville Cathedral · History of the Collegiate Church', 'Spain.info · Collegiate Church of El Divino Salvador'],
      photoAlt: 'User-provided interior photo of the Collegiate Church of El Divino Salvador in Seville',
      captions: {
        'salvador-2388.webp': 'Gilded altar and high vaults in the church',
        'salvador-2390.webp': 'Gilded altar and pews beyond a stone pier',
        'salvador-2391.webp': 'Church interior with altar, stone pulpit and pews',
        'salvador-2392.webp': 'Gilded carving on the central altar',
        'salvador-2393.webp': 'Ornate altar seen between stone piers',
        'salvador-2394.webp': 'Side altarpiece beneath stained glass and a gallery',
        'salvador-2400.webp': 'Carved wooden seating and a large framed religious painting',
        'salvador-2401.webp': 'Framed painting and carved wooden seating in a chapel space',
        'salvador-2402.webp': 'Religious paintings, carved seating and a visitor barrier',
        'salvador-2406.webp': 'History information panel at El Salvador Church',
        'salvador-2407.webp': 'On-site sign for the Pineda Family Chapel',
        'salvador-2410.webp': 'Chapel interior with pews and an altar'
      }
    },
    ja: {
      title: 'エル・サルバドール参事会教会とピネダ家礼拝堂',
      parts: [
        ['一つの場所に重なる歴史', '現在のエル・サルバドール教会はバロック様式ですが、この場所にはローマ・西ゴート時代とイスラム時代の痕跡が重なっています。教会の公式沿革によると、イブン・アダッバス・モスクの中庭とミナレットは、後のキリスト教会の複合施設や鐘楼へと受け継がれました。'],
        ['教会内部', '公式観光情報では、教会は長方形平面の三身廊で、筒形ヴォールトと交差ヴォールトを備えると紹介されています。主祭壇衝立と聖体礼拝堂が見どころです。提供写真には、高い石柱、信者席、金色の祭壇装飾、彫刻が施された木製座席などが写っています。'],
        ['ピネダ家礼拝堂', 'オレンジの木がある中庭から、14世紀のピネダ家の葬祭礼拝堂へ入れます。セビリア観光局はムデハル・ゴシック様式と紹介しています。写真に写る現地案内板によると、ピネダ家が14世紀末に一族の埋葬用私設礼拝堂として建立し、タイル装飾の墓碑3基のうち現存するのは1基です。']
      ],
      sourceLabel: '公式情報',
      sourceNames: ['セビリア観光局 · エル・サルバドール教会', 'セビリア大聖堂 · 参事会教会の沿革', 'Spain.info · エル・サルバドール参事会教会'],
      photoAlt: 'セビリアのエル・サルバドール参事会教会内部の提供写真',
      captions: {
        'salvador-2388.webp': '教会の金色の祭壇と高いヴォールト',
        'salvador-2390.webp': '石柱の向こうに見える金色の祭壇と信者席',
        'salvador-2391.webp': '祭壇、石造の説教壇、信者席が見える教会内部',
        'salvador-2392.webp': '中央祭壇の金色の彫刻装飾',
        'salvador-2393.webp': '石柱の間から見える装飾祭壇',
        'salvador-2394.webp': 'ステンドグラスの下にある側面祭壇と回廊',
        'salvador-2400.webp': '彫刻を施した木製座席と大きな宗教画',
        'salvador-2401.webp': '礼拝室の額装された絵画と木製座席',
        'salvador-2402.webp': '宗教画、彫刻入りの座席、見学者用の柵',
        'salvador-2406.webp': 'エル・サルバドール教会の沿革案内板',
        'salvador-2407.webp': 'ピネダ家礼拝堂の現地案内板',
        'salvador-2410.webp': '信者席と祭壇が見える礼拝空間'
      }
    },
    zh: {
      title: '救世主学院教堂与皮内达家族礼拜堂',
      parts: [
        ['同一地点的历史层次', '如今的救世主教堂为巴洛克风格，但这处场地还保留着罗马、西哥特和伊斯兰时期的历史层次。教堂官方沿革介绍，伊本·阿达巴斯清真寺的庭院和宣礼塔后来被纳入基督教教堂建筑群，宣礼塔也成为钟楼的一部分。'],
        ['教堂内部', '官方旅游资料将教堂描述为长方形平面、三座中殿，设有筒形拱顶和交叉拱顶。主祭坛屏与圣体礼拜堂是主要看点。你提供的照片展示了高大的石柱、长椅、镀金祭坛装饰和雕刻木座椅等内部景象。'],
        ['皮内达家族礼拜堂', '橙树庭院通往14世纪的皮内达家族墓葬礼拜堂。塞维利亚旅游局将其描述为穆德哈尔哥特式。你拍摄的现场说明牌称，皮内达家族于14世纪末建造这座私人墓葬礼拜堂；原有三块装饰瓷砖的墓碑，如今仅存一块。']
      ],
      sourceLabel: '官方资料',
      sourceNames: ['塞维利亚旅游局 · 救世主教堂', '塞维利亚大教堂 · 学院教堂沿革', 'Spain.info · 救世主学院教堂'],
      photoAlt: '用户提供的塞维利亚救世主学院教堂内部照片',
      captions: {
        'salvador-2388.webp': '教堂内的镀金祭坛与高耸拱顶',
        'salvador-2390.webp': '石柱后方可见的镀金祭坛和长椅',
        'salvador-2391.webp': '可见祭坛、石质讲坛和长椅的教堂内部',
        'salvador-2392.webp': '中央祭坛上的镀金雕刻装饰',
        'salvador-2393.webp': '石柱之间的装饰祭坛',
        'salvador-2394.webp': '彩色玻璃窗下的侧祭坛与回廊',
        'salvador-2400.webp': '雕花木座椅和大型宗教画框',
        'salvador-2401.webp': '礼拜空间内的镀金画框与木座椅',
        'salvador-2402.webp': '宗教画、雕花座椅和参观隔离绳',
        'salvador-2406.webp': '救世主教堂历史介绍牌',
        'salvador-2407.webp': '皮内达家族礼拜堂现场说明牌',
        'salvador-2410.webp': '可见长椅与祭坛的礼拜空间'
      }
    }
  };
  function lang(value) {
    var key = String(value || '').toLowerCase().split(/[-_]/)[0];
    return LANGS.indexOf(key) >= 0 ? key : 'en';
  }
  function esc(value) {
    return String(value).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function bodyHtml(d) {
    return d.parts.map(function (part) {
      return '<p><strong>' + esc(part[0]) + '.</strong> ' + esc(part[1]) + '</p>';
    }).join('');
  }
  function photoHtml(d) {
    return Object.keys(d.captions).map(function (name) {
      var caption = d.captions[name];
      return '<figure class="sg-salvador-photo"><img src="' + ROOT + esc(name) + '" alt="' + esc(d.photoAlt + ' — ' + caption) + '" loading="lazy" decoding="async"><figcaption>' + esc(caption) + '</figcaption></figure>';
    }).join('');
  }
  function sourceHtml(d) {
    return '<p><strong>' + esc(d.sourceLabel) + '</strong></p><ul class="sg-guide-sources">' + SOURCES.map(function (url, i) {
      return '<li><a href="' + esc(url) + '" target="_blank" rel="noopener noreferrer">' + esc(d.sourceNames[i]) + '</a></li>';
    }).join('') + '</ul>';
  }
  function addGuide(value) {
    var root = document.querySelector('#seville-general-guide .sg-guide');
    if (!root) return;
    var d = DATA[lang(value)];
    var details = document.createElement('details');
    details.id = 'sg-divino-salvador';
    details.className = 'sg-guide-topic';
    details.innerHTML = '<summary>' + esc(d.title) + '</summary><div class="sg-guide-content"><div class="sg-salvador-gallery">' + photoHtml(d) + '</div>' + bodyHtml(d) + sourceHtml(d) + '</div>';
    var old = root.querySelector('#sg-divino-salvador');
    if (old) old.remove();
    root.insertBefore(details, root.firstChild);
  }
  var previousRender = window.renderSevilleGeneralGuide;
  if (typeof previousRender === 'function') {
    window.renderSevilleGeneralGuide = function (value) {
      var result = previousRender.apply(this, arguments);
      if (result) addGuide(value);
      return result;
    };
  }
  var previousChat = window.buildSevilleGeneralChatResponse;
  var aliases = /(?:iglesia\s+(?:(?:colegial|colegiata)\s+del\s+)?(?:divino\s+)?salvador|collegiate\s+church\s+of\s+(?:el\s+)?(?:divino\s+)?salvador|el\s+salvador\s+church|pineda\s+(?:family\s+)?chapel|capilla\s+de\s+los\s+pineda|피네다(?:\s*가문|\s*가족)?\s*(?:예배당|성당)|엘\s*살바도르\s*(?:참사회\s*)?성당|ピネダ家(?:の)?礼拝堂|ピネダ礼拝堂|エル・サルバドール(?:参事会)?教会|救世主学院教堂|救世主教堂|皮内达家族礼拜堂|皮内达礼拜堂)/i;
  var logistics = /(?:\b(?:route|directions?|how to get|how do i get|opening hours?|hours|tickets?|booking|reservation|itinerary|schedule|today|tomorrow)\b|가는\s*방법|찾아가는\s*길|경로|교통|예약|운영\s*시간|개관\s*시간|오늘|내일|行き方|経路|交通|予約|営業時間|今日|明日|怎么去|如何前往|路线|交通|预订|开放时间|今天|明天)/i;
  window.buildSevilleGeneralChatResponse = function (query, language) {
    var text = String(query || '');
    if (!logistics.test(text) && aliases.test(text)) {
      var d = DATA[lang(language)];
      return '<strong>' + esc(d.title) + '</strong><br>' + bodyHtml(d) + '<br>' + sourceHtml(d);
    }
    return typeof previousChat === 'function' ? previousChat.apply(this, arguments) : null;
  };
}());
