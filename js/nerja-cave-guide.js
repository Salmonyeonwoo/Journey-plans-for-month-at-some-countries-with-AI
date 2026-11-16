(function () {
  'use strict';

  var LANGS = ['ko', 'en', 'ja', 'zh'];
  var CAVE_URL = 'https://cuevadenerja.es/en/cave/';
  var FAQ_URL = 'https://cuevadenerja.es/en/frequently-asked-questions/';
  var SERVICES_URL = 'https://cuevadenerja.es/en/cave/services/';
  var TOURISM_URL = 'https://www.visitcostadelsol.com/malaga-costa-del-sol/culture-and-museums/monuments-and-areas-of-tourist-interest/nerja-caves-p11621';
  var MAP_URL = 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent('Cueva de Nerja, Carretera de Maro s/n, 29787 Nerja, Málaga');

  var COPY = {
    ko: {
      heading: '네르하 동굴 (선택형 추가 명소)',
      intro: '자연·문화 명소로 둘러볼 만한 곳입니다. 아래 내용은 기존 네르하 일정표에 편입하지 않은 별도 선택지입니다. 운영·입장 조건은 방문일 기준 공식 안내에서 확인하세요.',
      summary: '말라가주 마로(Maro) 인근의 자연·문화 명소입니다. 공식 FAQ는 동굴 내부 관람을 약 50분으로 안내하며, 한국어 오디오 가이드도 제공합니다.',
      accessLabel: '부모님 동행·접근성 참고',
      access: '공식 FAQ 기준 동굴 안에는 458개가 넘는 계단과 여러 단차가 있으며, 거동이 불편하거나 건강 문제가 있는 방문객에게는 권장하지 않는다고 안내합니다. 휠체어와 유모차는 동굴 내부에 들어갈 수 없습니다. 부모님과 방문한다면 평소 계단 보행과 컨디션을 우선 고려하고, 닫힌 미끄럼 방지 신발을 신으세요.',
      alternative: '동굴에 들어가기 어려운 방문객을 위한 가상현실 체험실도 공식 서비스 안내에 소개되어 있습니다. 운영 여부와 이용 조건은 방문 전에 확인하세요.',
      gettingThereLabel: '위치·이동',
      gettingThere: '주소: Ctra. de Maro, s/n, 29787 Nerja, Málaga. 공식 안내는 말라가에서 A-7 알메리아 방향 295번 출구를 안내하며, 네르하 시내에서 도로 관광열차와 버스 정류장 이용도 소개합니다. 실제 운행 여부와 시간은 미리 확인하세요.',
      map: '지도에서 위치 보기',
      officialVisit: '동굴 공식 방문 안내',
      officialFaq: '공식 FAQ·접근성 안내',
      officialServices: '공식 서비스·VR 안내',
      tourismBoard: '코스타 델 솔 관광 안내',
      advice: '계단 수와 접근성 안내는 공식 FAQ의 상세 수치(458개 초과)를 따랐습니다.'
    },
    en: {
      heading: 'Nerja Cave (optional extra stop)',
      intro: 'A natural and cultural attraction to consider. This is an optional suggestion, not an addition to the existing Nerja itinerary. Check the official visitor information for your date.',
      summary: 'A natural and cultural attraction near Maro in Málaga province. The official FAQ estimates about 50 minutes for the cave visit and lists a Korean audio guide.',
      accessLabel: 'For visits with parents · access note',
      access: 'The official FAQ says the cave has more than 458 steps and several level changes, and does not recommend it for people with reduced mobility or health issues. Wheelchairs and strollers are not allowed inside. If visiting with your parents, consider their comfort with sustained stairs and their health first; wear closed shoes with non-slip soles.',
      alternative: 'The official services page also lists a virtual-reality room for visitors who cannot enter the cave. Confirm its availability and terms before planning around it.',
      gettingThereLabel: 'Location · getting there',
      gettingThere: 'Address: Ctra. de Maro, s/n, 29787 Nerja, Málaga. The official site describes A-7 Exit 295 from Málaga toward Almería, plus a bus stop and a road tourist train from Nerja. Check current service and schedules before travelling.',
      map: 'View location on map',
      officialVisit: 'Official cave visit information',
      officialFaq: 'Official FAQ · access information',
      officialServices: 'Official services · VR information',
      tourismBoard: 'Costa del Sol tourism guide',
      advice: 'For step count and access, this guide follows the official FAQ’s more specific figure: over 458 steps.'
    },
    ja: {
      heading: 'ネルハ洞窟（追加の選択肢）',
      intro: '自然・文化スポットとして検討できる場所です。既存のネルハ日程には追加していない別案です。訪問日の営業・入場条件は公式案内でご確認ください。',
      summary: 'マラガ県マロ（Maro）近郊の自然・文化スポットです。公式FAQでは洞窟内の見学は約50分とされ、韓国語の音声ガイドも案内されています。',
      accessLabel: 'ご両親との訪問・アクセス上の注意',
      access: '公式FAQによると、洞窟内には458段を超える階段と複数の段差があり、移動に困難のある方や健康上の問題がある方には推奨されていません。車いす・ベビーカーは洞窟内に持ち込めません。ご両親と訪れる場合は、階段の負担と健康状態を先に考慮し、滑りにくい靴を着用してください。',
      alternative: '洞窟内に入れない方に向け、公式サービス案内ではVR体験室も紹介されています。利用可能日や条件は事前にご確認ください。',
      gettingThereLabel: '場所・アクセス',
      gettingThere: '住所：Ctra. de Maro, s/n, 29787 Nerja, Málaga。公式案内では、マラガからアルメリア方面へA-7を進み、295番出口を利用する方法のほか、ネルハからの道路観光列車とバス停を案内しています。運行状況・時刻は事前にご確認ください。',
      map: '地図で場所を見る',
      officialVisit: '洞窟公式の見学案内',
      officialFaq: '公式FAQ・アクセス情報',
      officialServices: '公式サービス・VR案内',
      tourismBoard: 'コスタ・デル・ソル観光案内',
      advice: '階段数とアクセス上の注意は、より具体的な公式FAQの数値（458段超）を採用しています。'
    },
    zh: {
      heading: '内尔哈洞穴（可选加游）',
      intro: '可考虑作为自然与文化景点。此处是独立的可选建议，并未加入现有内尔哈行程表。请按访问日期查看官方网站的开放与入场信息。',
      summary: '位于马拉加省马罗（Maro）附近的自然与文化景点。官方常见问题称洞内参观约50分钟，并提供韩语语音导览。',
      accessLabel: '与父母同行 · 无障碍与体力提示',
      access: '官方常见问题说明洞内有超过458级台阶和多处高低变化，不建议行动不便或有健康问题者进入。轮椅和婴儿车不能进入洞内。与父母同行时，请先评估他们上下较多台阶的舒适度和健康状况，并穿防滑闭口鞋。',
      alternative: '官方服务页面还介绍了面向无法进入洞穴游客的虚拟现实体验室。请在规划前确认是否开放及相关条件。',
      gettingThereLabel: '位置 · 交通',
      gettingThere: '地址：Ctra. de Maro, s/n, 29787 Nerja, Málaga。官网介绍从马拉加沿A-7朝阿尔梅里亚方向行驶并从295号出口前往；也介绍了内尔哈的公路观光小火车和公交站。出行前请核实实际运营与时刻。',
      map: '在地图中查看位置',
      officialVisit: '洞穴官方参观信息',
      officialFaq: '官方常见问题 · 无障碍信息',
      officialServices: '官方服务 · VR信息',
      tourismBoard: '太阳海岸旅游指南',
      advice: '台阶数量与通行提示采用官方常见问题中更具体的数据：超过458级。'
    }
  };

  var CAVE_ALIASES = [
    'Cueva de Nerja', 'Cuevas de Nerja', 'Nerja Cave', 'Nerja Caves',
    '네르하 동굴', '네르하 동굴 접근성', '네르하 동굴 추천',
    'ネルハ洞窟', 'ネルハの洞窟', 'ネルハ鍾乳洞',
    '内尔哈洞穴', '內爾哈洞穴', '内尔哈洞窟', '內爾哈洞窟'
  ];

  function getLanguage(value) {
    var code = String(value || '').toLowerCase().split(/[-_]/)[0];
    return LANGS.indexOf(code) >= 0 ? code : 'ko';
  }

  function escapeHtml(value) {
    return String(value == null ? '' : value).replace(/[&<>"']/g, function (char) {
      return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char];
    });
  }

  function normalizeQuery(value) {
    return String(value == null ? '' : value).toLocaleLowerCase().normalize('NFKC')
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '').normalize('NFC')
      .replace(/[\s\u3000]+/g, ' ').trim();
  }

  function containsAlias(text, alias) {
    var normalizedAlias = normalizeQuery(alias);
    if (!normalizedAlias) return false;
    if (/^[\x00-\x7f]+$/.test(normalizedAlias)) {
      var escaped = normalizedAlias.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      return new RegExp('(^|[^a-z0-9])' + escaped + '([^a-z0-9]|$)', 'i').test(text);
    }
    return text.indexOf(normalizedAlias) !== -1;
  }

  function matchesAny(text, aliases) {
    return aliases.some(function (alias) { return containsAlias(text, alias); });
  }

  function addLink(container, label, url, className) {
    var link = document.createElement('a');
    link.className = className || '';
    link.href = url;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.textContent = label;
    container.appendChild(link);
  }

  function ensureStyles() {
    if (document.getElementById('nerja-cave-guide-style')) return;
    var style = document.createElement('style');
    style.id = 'nerja-cave-guide-style';
    style.textContent = [
      '#nerja-daytrip-guide .nerja-cave-card{box-sizing:border-box;margin:18px 0 12px;padding:22px;border:1px solid #d5e3d9;border-left:5px solid #1a5249;border-radius:18px;background:#f9fcfa;color:#1d2e2a;line-height:1.62;overflow-wrap:anywhere}',
      '#nerja-daytrip-guide .nerja-cave-card *{box-sizing:border-box}',
      '#nerja-daytrip-guide .nerja-cave-card h3{margin:0 0 7px;color:#1a5249;font-size:clamp(19px,2.4vw,24px);line-height:1.3}',
      '#nerja-daytrip-guide .nerja-cave-card p{margin:9px 0;color:#40534d;font-size:14px}',
      '#nerja-daytrip-guide .nerja-cave-card .nerja-cave-label{display:block;margin-top:14px;color:#263b35;font-size:14px;font-weight:800}',
      '#nerja-daytrip-guide .nerja-cave-card .nerja-cave-warning{padding:12px 14px;border:1px solid #f0d5a6;border-radius:12px;background:#fff9ed;color:#51432b}',
      '#nerja-daytrip-guide .nerja-cave-card .nerja-cave-advice{color:#65736e;font-size:12px}',
      '#nerja-daytrip-guide .nerja-cave-card .nerja-cave-links{display:flex;flex-wrap:wrap;gap:8px 14px;margin-top:13px;font-size:13px}',
      '#nerja-daytrip-guide .nerja-cave-card a{color:#0645ad;text-decoration:underline;text-underline-offset:2px;overflow-wrap:anywhere}',
      '@media(max-width:760px){#nerja-daytrip-guide .nerja-cave-card{padding:17px;border-radius:15px}}',
      '@media(max-width:420px){#nerja-daytrip-guide .nerja-cave-card{margin:15px 0;padding:14px}.nerja-cave-card p{font-size:13px}}'
    ].join('\n');
    document.head.appendChild(style);
  }

  function renderNerjaCaveRecommendation(lang) {
    var mount = document.getElementById('nerja-daytrip-guide');
    if (!mount) return false;
    var currentLang = getLanguage(lang || (typeof window.currentLang !== 'undefined' ? window.currentLang : 'ko'));
    var previous = mount.querySelector('#nerja-cave-recommendation');
    if (previous) previous.remove();
    ensureStyles();

    var copy = COPY[currentLang];
    var section = document.createElement('section');
    section.id = 'nerja-cave-recommendation';
    section.className = 'nerja-cave-card';
    section.lang = currentLang;
    section.setAttribute('aria-labelledby', 'nerja-cave-heading');

    var heading = document.createElement('h3');
    heading.id = 'nerja-cave-heading';
    heading.textContent = copy.heading;
    section.appendChild(heading);

    var intro = document.createElement('p');
    intro.textContent = copy.intro;
    section.appendChild(intro);

    var summary = document.createElement('p');
    summary.textContent = copy.summary;
    section.appendChild(summary);

    var accessLabel = document.createElement('strong');
    accessLabel.className = 'nerja-cave-label';
    accessLabel.textContent = copy.accessLabel;
    section.appendChild(accessLabel);

    var access = document.createElement('p');
    access.className = 'nerja-cave-warning';
    access.textContent = copy.access;
    section.appendChild(access);

    var alternative = document.createElement('p');
    alternative.textContent = copy.alternative;
    section.appendChild(alternative);

    var locationLabel = document.createElement('strong');
    locationLabel.className = 'nerja-cave-label';
    locationLabel.textContent = copy.gettingThereLabel;
    section.appendChild(locationLabel);

    var gettingThere = document.createElement('p');
    gettingThere.textContent = copy.gettingThere;
    section.appendChild(gettingThere);

    var advice = document.createElement('p');
    advice.className = 'nerja-cave-advice';
    advice.textContent = copy.advice;
    section.appendChild(advice);

    var links = document.createElement('div');
    links.className = 'nerja-cave-links';
    addLink(links, copy.map, MAP_URL);
    addLink(links, copy.officialVisit, CAVE_URL);
    addLink(links, copy.officialFaq, FAQ_URL);
    addLink(links, copy.officialServices, SERVICES_URL);
    addLink(links, copy.tourismBoard, TOURISM_URL);
    section.appendChild(links);

    mount.appendChild(section);
    return true;
  }

  function buildChatResponse(lang) {
    var copy = COPY[lang];
    var sources = [
      [copy.officialVisit, CAVE_URL],
      [copy.officialFaq, FAQ_URL],
      [copy.officialServices, SERVICES_URL],
      [copy.tourismBoard, TOURISM_URL]
    ].map(function (item) {
      return '<a href="' + escapeHtml(item[1]) + '" target="_blank" rel="noopener noreferrer">' + escapeHtml(item[0]) + ' ↗</a>';
    }).join('<br>');
    return '<strong>' + escapeHtml(copy.heading) + '</strong><br>' + escapeHtml(copy.summary) +
      '<br><br><strong>' + escapeHtml(copy.accessLabel) + ':</strong><br>' + escapeHtml(copy.access) +
      '<br><br>' + escapeHtml(copy.alternative) +
      '<br><br><strong>' + escapeHtml(copy.gettingThereLabel) + ':</strong><br>' + escapeHtml(copy.gettingThere) +
      '<br><br><a href="' + escapeHtml(MAP_URL) + '" target="_blank" rel="noopener noreferrer">' + escapeHtml(copy.map) + ' ↗</a>' +
      '<br>' + sources;
  }

  function buildNerjaCaveResponse(query, lang) {
    var normalized = normalizeQuery(query);
    if (!normalized) return null;
    var nerjaContext = matchesAny(normalized, ['Nerja', '네르하', 'ネルハ', '内尔哈', '內爾哈']);
    var caveContext = matchesAny(normalized, [
      'cave', 'caves', 'cavern', 'caverns', 'cueva', 'cuevas', 'grotto',
      '동굴', '洞窟', '鍾乳洞', '石窟'
    ]);
    if (!matchesAny(normalized, CAVE_ALIASES) && !(nerjaContext && caveContext)) return null;
    return buildChatResponse(lang);
  }

  var previousRender = window.renderNerjaDiningRecommendations;
  if (typeof previousRender === 'function') {
    window.renderNerjaDiningRecommendations = function (lang) {
      var rendered = previousRender.apply(this, arguments);
      if (rendered) renderNerjaCaveRecommendation(lang);
      return rendered;
    };
  }

  var previousChat = window.buildGranadaMalagaGeneralChatResponse;
  window.buildGranadaMalagaGeneralChatResponse = function (query, lang) {
    var currentLanguage = getLanguage(lang);
    return buildNerjaCaveResponse(query, currentLanguage) ||
      (typeof previousChat === 'function' ? previousChat.apply(this, arguments) : null);
  };

  window.renderNerjaCaveRecommendation = renderNerjaCaveRecommendation;
  window.NERJA_CAVE_GUIDE = { links: { visit: CAVE_URL, faq: FAQ_URL, services: SERVICES_URL, tourism: TOURISM_URL, map: MAP_URL } };
}());
