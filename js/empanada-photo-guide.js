/* Evidence-led reading guide for the user-provided Barcelona empanada-counter photos. */
(function () {
  'use strict';

  const copy = {
    ko: {
      title: '🥟 바르셀로나 진열대 엠파나다: 사진 라벨 읽기',
      intro: '사진에서 읽히는 이름표를 풀이한 안내입니다. 라벨은 재료·조리법·맵기·알레르기 성분을 완전히 설명하지 않으므로 주문 전에 매장에 확인하세요.',
      note: '사진으로 확인할 수 없는 점: 정확한 속재료·향신료·알레르기 유발 성분, 실제 가격(€1.90 포함), 재가열 가능 여부. 아래 메뉴 이름은 사진 판독이며 매장 확인은 아닙니다.',
      labelsTitle: '이름표를 이렇게 이해하세요',
      labels: [
        ['CARN SUAU', '카탈루냐어로 “순한 고기”라는 뜻에 가깝습니다. 맵지 않다는 보증이나 소고기라는 뜻은 아니므로 속재료와 향신료를 물어보세요.'],
        ['PERNIL I FORMATGE', '“햄과 치즈”라는 뜻입니다. 햄·치즈의 종류와 양, 알레르기 성분은 매장에서 확인해야 합니다.'],
        ['POLLASTRE ESPECIAL', '“특제 닭고기”라는 뜻입니다. 부드럽거나 소화가 쉽다는 점은 이름표만으로 단정할 수 없습니다.'],
        ['CARN ARGENTINA · ROSTIT ESPECIAL', '각각 “아르헨티나식 고기”와 “특제 로스트”에 가까운 표기입니다. 소고기 부위·양념·조리 시간까지 이름표가 증명하지는 않습니다.']
      ],
      cultureTitle: '스페인 음식인가요?',
      culture: '엠파나다는 스페인과 아르헨티나를 포함한 여러 지역에 각기 다른 형태로 있습니다. 갈리시아에도 지역 음식으로 알려진 empanada gallega가 있습니다. 다만 사진의 카탈루냐어 이름표와 “Argentina” 표기는 이 진열대가 아르헨티나식 메뉴를 내는 곳임을 시사할 뿐, 엠파나다가 스페인 전체의 대표 국민 음식이라거나 스페인 어디서나 같은 방식으로 유명하다는 뜻은 아닙니다.',
      alfajorTitle: '🍪 알파호르 마이세나(Alfajor de maicena)',
      alfajor: '전형적인 아르헨티나식 maicena 알파호르는 옥수수전분을 넣은 부드러운 쿠키 두 장 사이에 둘세 데 레체(dulce de leche)를 넣고 가장자리에 코코넛을 묻히는 과자입니다. “흰 빵”이나 마카롱은 아니며, 사진만으로 진열품이 이 종류인지 또는 €1.90인지 확인할 수 없습니다. 가격·재료·알레르기 성분은 현장에서 물어보세요.',
      orderTitle: '주문할 때 쓸 말',
      order: '<strong>Una empanada, por favor.</strong> (엠파나다 하나 주세요.) · <strong>Dos, por favor.</strong> (두 개 주세요.) · <strong>Tres, por favor.</strong> (세 개 주세요.)',
      warm: '<strong>¿Me la puede calentar, por favor?</strong> (따뜻하게 데워 주실 수 있나요?) — 데워 줄 수 있는지는 매장에 먼저 물어보세요.',
      sourcesTitle: '확인 자료',
      sources: [
        ['아르헨티나 외교부·대사관: 아르헨티나 음식 문화', 'https://ecana.cancilleria.gob.ar/en/argentinian-gastronomy'],
        ['갈리시아 관광청: 갈리시아 엠파나다 지역 축제 소개', 'https://www.turismo.gal/achegate-a-galicia/detalle?langId=en_US&id=MTUyOTE7MTUyOTM7MTUyOTY'],
        ['Barcelona Metropolitan: 카탈루냐 식재료 용어 사전', 'https://www.webarcelona.net/dictionary-catalan-and-spanish-cuisine'],
        ['The Floured Table: Alfajores de maicena 재료·설명', 'https://www.theflouredtable.com/alfajores-de-maicena-argentine-alfajores/']
      ]
    },
    en: {
      title: '🥟 Reading the empanada-counter labels in Barcelona',
      intro: 'This guide interprets the labels that appear legible in the supplied photos. A label does not fully establish ingredients, preparation, heat level or allergens—please confirm with the shop before ordering.',
      note: 'Not verifiable from the photos: exact fillings, spices, allergens, the actual price (including €1.90), or whether the shop can reheat an item. These are photo readings, not shop-confirmed descriptions.',
      labelsTitle: 'What the visible names mean',
      labels: [
        ['CARN SUAU', 'Catalan for roughly “mild meat.” It does not guarantee no chili or identify the meat as beef; ask about the filling and seasoning.'],
        ['PERNIL I FORMATGE', '“Ham and cheese.” The type and amount of ham or cheese, and allergens, need to be confirmed at the counter.'],
        ['POLLASTRE ESPECIAL', '“Special chicken.” The name alone does not establish that it is especially tender or easy to digest.'],
        ['CARN ARGENTINA · ROSTIT ESPECIAL', 'Roughly “Argentine-style meat” and “special roast.” The labels do not establish the cut, seasoning or cooking time.']
      ],
      cultureTitle: 'Is it a Spanish food?',
      culture: 'Empanadas have distinct forms across several places, including Spain and Argentina. Galicia, for example, has its own well-known regional empanada gallega. The Catalan labels and “Argentina” wording in these photos suggest an Argentine-style counter menu; they do not prove that this is a single national Spanish staple or that it is equally famous throughout Spain.',
      alfajorTitle: '🍪 Alfajor de maicena',
      alfajor: 'A typical Argentine alfajor de maicena is made with soft cookies containing cornstarch, dulce de leche between them, and often coconut on the edge. It is not “white bread” or a macaron. The photos do not confirm that the displayed sweets are this exact type or that the price is €1.90. Check the price, ingredients and allergens with the shop.',
      orderTitle: 'Useful ordering phrases',
      order: '<strong>Una empanada, por favor.</strong> (One empanada, please.) · <strong>Dos, por favor.</strong> (Two, please.) · <strong>Tres, por favor.</strong> (Three, please.)',
      warm: '<strong>¿Me la puede calentar, por favor?</strong> (Could you warm it for me, please?) — Ask first; reheating may not be available.',
      sourcesTitle: 'Sources checked',
      sources: [
        ['Argentine Embassy / Foreign Ministry: Argentine gastronomy', 'https://ecana.cancilleria.gob.ar/en/argentinian-gastronomy'],
        ['Galicia Tourism: regional empanada festival', 'https://www.turismo.gal/achegate-a-galicia/detalle?langId=en_US&id=MTUyOTE7MTUyOTM7MTUyOTY'],
        ['Barcelona Metropolitan: Catalan food-term dictionary', 'https://www.webarcelona.net/dictionary-catalan-and-spanish-cuisine'],
        ['The Floured Table: alfajor de maicena ingredients and method', 'https://www.theflouredtable.com/alfajores-de-maicena-argentine-alfajores/']
      ]
    },
    ja: {
      title: '🥟 バルセロナのエンパナーダ店：写真のラベルを読む',
      intro: '提供写真で読めるラベルを解説します。表示名だけでは具材・調理法・辛さ・アレルゲンは確定できないため、注文前に店員へ確認してください。',
      note: '写真だけでは、正確な具材・香辛料・アレルゲン、実際の価格（€1.90を含む）、温め直しの可否は確認できません。以下は写真からの読み取りで、店舗確認済みの情報ではありません。',
      labelsTitle: '見える名前の意味',
      labels: [
        ['CARN SUAU', 'カタルーニャ語でおおむね「マイルドな肉」。唐辛子なしや牛肉を保証する表示ではありません。具材と味付けを尋ねてください。'],
        ['PERNIL I FORMATGE', '「ハムとチーズ」。種類や量、アレルゲンは店頭で確認してください。'],
        ['POLLASTRE ESPECIAL', '「特製チキン」。名前だけでは、柔らかさや消化のしやすさは判断できません。'],
        ['CARN ARGENTINA · ROSTIT ESPECIAL', 'おおむね「アルゼンチン風の肉」「特製ロースト」。肉の部位、味付け、調理時間までは表示から分かりません。']
      ],
      cultureTitle: 'スペイン料理なの？',
      culture: 'エンパナーダにはスペインやアルゼンチンなど、地域ごとに異なる種類があります。ガリシアにも地域料理として知られる empanada gallega があります。写真のカタルーニャ語表記と「Argentina」はアルゼンチン風の品ぞろえを示唆しますが、スペイン全国共通の代表料理、あるいは全国どこでも同じように有名だと証明するものではありません。',
      alfajorTitle: '🍪 アルファホール・デ・マイセナ',
      alfajor: '典型的なアルゼンチンのアルファホール・デ・マイセナは、コーンスターチ入りの柔らかなクッキー2枚でドゥルセ・デ・レチェを挟み、縁にココナッツを付けた菓子です。「白いパン」やマカロンではありません。写真だけでは陳列品がこの種類か、価格が€1.90かは確認できません。価格・材料・アレルゲンを店に尋ねてください。',
      orderTitle: '注文に使えるスペイン語',
      order: '<strong>Una empanada, por favor.</strong>（1個ください） · <strong>Dos, por favor.</strong>（2個ください） · <strong>Tres, por favor.</strong>（3個ください）',
      warm: '<strong>¿Me la puede calentar, por favor?</strong>（温めてもらえますか？）— 温められるか先に尋ねてください。',
      sourcesTitle: '確認した資料',
      sources: [
        ['アルゼンチン大使館・外務省：アルゼンチンの食文化', 'https://ecana.cancilleria.gob.ar/en/argentinian-gastronomy'],
        ['ガリシア観光局：地域のエンパナーダ祭り', 'https://www.turismo.gal/achegate-a-galicia/detalle?langId=en_US&id=MTUyOTE7MTUyOTM7MTUyOTY'],
        ['Barcelona Metropolitan：カタルーニャ料理用語辞典', 'https://www.webarcelona.net/dictionary-catalan-and-spanish-cuisine'],
        ['The Floured Table：アルファホール・デ・マイセナの材料', 'https://www.theflouredtable.com/alfajores-de-maicena-argentine-alfajores/']
      ]
    },
    zh: {
      title: '🥟 巴塞罗那柜台上的馅饼：读懂照片标签',
      intro: '本指南解读所给照片中可辨认的标签。标签不能完整证明馅料、做法、辣度或过敏原，下单前请向店员确认。',
      note: '仅凭照片无法核实具体馅料、香料、过敏原、实际价格（包括€1.90）或是否可以加热。以下是照片辨读，不是店家确认的信息。',
      labelsTitle: '标签大意',
      labels: [
        ['CARN SUAU', '加泰罗尼亚语大致是“温和口味的肉”。这不能保证完全不辣，也没有说明一定是牛肉；请向店员确认馅料和调味。'],
        ['PERNIL I FORMATGE', '意为“火腿和奶酪”。具体种类、分量和过敏原需在柜台确认。'],
        ['POLLASTRE ESPECIAL', '意为“特制鸡肉”。仅凭名称无法判断是否更嫩或更易消化。'],
        ['CARN ARGENTINA · ROSTIT ESPECIAL', '大致意为“阿根廷风味肉馅”和“特制烤肉”。标签没有说明肉的部位、调味或烹饪时长。']
      ],
      cultureTitle: '这是西班牙美食吗？',
      culture: '馅饼在西班牙、阿根廷等地都有各自不同的版本。加利西亚也有著名的地方馅饼 empanada gallega。照片中的加泰罗尼亚语标签和“Argentina”字样提示这家柜台提供阿根廷风格菜单，但不能据此说它是整个西班牙统一的代表性国民美食，或在西班牙各地都同样有名。',
      alfajorTitle: '🍪 Maicena 玉米淀粉夹心饼（Alfajor）',
      alfajor: '典型的阿根廷 maicena alfajor 是含玉米淀粉的柔软饼干，中间夹 dulce de leche（焦糖奶酱），边缘常裹椰丝。它不是“白面包”或马卡龙。照片无法确认陈列甜点是否正是这种口味，也无法确认价格为€1.90；请向店家确认价格、配料和过敏原。',
      orderTitle: '点单西班牙语',
      order: '<strong>Una empanada, por favor.</strong>（请给我一个） · <strong>Dos, por favor.</strong>（两个） · <strong>Tres, por favor.</strong>（三个）',
      warm: '<strong>¿Me la puede calentar, por favor?</strong>（可以帮我加热一下吗？）— 请先询问店家是否提供加热。',
      sourcesTitle: '核对来源',
      sources: [
        ['阿根廷驻加拿大使馆／外交部：阿根廷饮食文化', 'https://ecana.cancilleria.gob.ar/en/argentinian-gastronomy'],
        ['加利西亚旅游局：地方馅饼节', 'https://www.turismo.gal/achegate-a-galicia/detalle?langId=en_US&id=MTUyOTE7MTUyOTM7MTUyOTY'],
        ['Barcelona Metropolitan：加泰罗尼亚食材词典', 'https://www.webarcelona.net/dictionary-catalan-and-spanish-cuisine'],
        ['The Floured Table：maicena alfajor 的配料与做法', 'https://www.theflouredtable.com/alfajores-de-maicena-argentine-alfajores/']
      ]
    }
  };

  function esc(value) {
    return String(value || '').replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
  }

  function render(lang) {
    const l = copy[lang] ? lang : 'ko';
    const host = document.querySelector('.spanish-market-guide-mount');
    if (!host) return;
    let mount = document.getElementById('empanada-photo-guide-mount');
    if (!mount) {
      mount = document.createElement('section');
      mount.id = 'empanada-photo-guide-mount';
      mount.className = 'local-food-guide empanada-photo-guide';
      mount.style.margin = '0 0 32px';
      host.insertAdjacentElement('afterend', mount);
    }
    const c = copy[l];
    mount.lang = l;
    mount.innerHTML = `<div class="local-food-guide-inner">
      <div class="local-food-guide-head"><span class="local-food-kicker">PHOTO LABEL CHECK · BARCELONA</span><h2>${c.title}</h2><p>${c.intro}</p></div>
      <p class="local-food-note">${c.note}</p>
      <h3>${c.labelsTitle}</h3>
      <div class="local-food-label-grid">${c.labels.map(([name, desc]) => `<article class="local-food-label-card"><h4>${esc(name)}</h4><p>${desc}</p></article>`).join('')}</div>
      <div class="local-food-info-card"><h3>${c.cultureTitle}</h3><p>${c.culture}</p></div>
      <div class="local-food-info-card alfajor-card"><h3>${c.alfajorTitle}</h3><p>${c.alfajor}</p></div>
      <div class="local-food-info-card"><h3>${c.orderTitle}</h3><p>${c.order}</p><p>${c.warm}</p></div>
      <details class="local-food-sources"><summary>${c.sourcesTitle}</summary><ul>${c.sources.map(([label, url]) => `<li><a href="${esc(url)}" target="_blank" rel="noopener noreferrer">${esc(label)} ↗</a></li>`).join('')}</ul></details>
    </div>`;
  }

  window.renderEmpanadaPhotoGuide = render;
  document.addEventListener('DOMContentLoaded', () => render(window.currentLang || localStorage.getItem('travel_user_lang') || 'ko'));
})();
