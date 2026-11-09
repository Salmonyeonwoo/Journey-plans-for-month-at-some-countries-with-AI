/* Review proposal: optional Barcelona replacement candidates only.
 * No itinerary, booking, payment, cancellation or calendar mutation.
 */
(function () {
  'use strict';
  const guide = window.BARCELONA_LOCAL_GUIDE;
  if (!guide || !guide.content || !guide.sources) return;
  const sources = {
    candidateGlopBranch: { url: 'https://elglop.com/en/contact/', names: { ko: 'El Glop 공식 지점·예약', en: 'El Glop official branches & booking', ja: 'El Glop公式店舗・予約', zh: 'El Glop官方门店与预约' } },
    candidateGlopHours: { url: 'https://elglop.com/en/restaurantes-en-barcelona/', names: { ko: 'El Glop 공식 영업시간', en: 'El Glop official hours', ja: 'El Glop公式営業時間', zh: 'El Glop官方营业时间' } },
    candidateGlopMenu: { url: 'https://elglopbarcelona.com/home-en/', names: { ko: 'El Glop 공식 메뉴·가격·주문 단위', en: 'El Glop official menu, prices & order units', ja: 'El Glop公式メニュー・価格・注文単位', zh: 'El Glop官方菜单、价格与点单单位' } },
    candidateTxapelaBranch: { url: 'https://www.txapelarestaurant.com/en/reservations/txapela-passeig-de-gracia/', names: { ko: 'Txapela 58번지 공식 지점·시간·예약', en: 'Txapela no. 58 official branch, hours & booking', ja: 'Txapela 58番地公式店舗・時間・予約', zh: 'Txapela 58号官方门店、时间与预约' } },
    candidateTxapelaMenu: { url: 'https://hundreds-wordpress-uploads.s3.amazonaws.com/txapela/uploads/2025/01/20261007-TX-Carta-General-BCN-S-ENG.pdf', names: { ko: 'Txapela 공식 연결 메뉴 PDF', en: 'Txapela officially linked menu PDF', ja: 'Txapela公式リンクのメニューPDF', zh: 'Txapela官网链接的菜单PDF' } },
    candidateFlautaGroup: { url: 'https://www.laflautagroup.com/en', names: { ko: 'La Flauta Group 공식 브랜드 소개', en: 'La Flauta Group official brand guide', ja: 'La Flauta Group公式ブランド紹介', zh: 'La Flauta Group官方品牌介绍' } },
    candidateFlautaAddress: { url: 'https://www.tripadvisor.com/Restaurant_Review-g187497-d10103030-Reviews-La_Flauta_Rambla-Barcelona_Catalonia.html', names: { ko: 'La Flauta Rambla 주소 참고 · Tripadvisor(비공식)', en: 'La Flauta Rambla address · Tripadvisor (third party)', ja: 'La Flauta Rambla住所参考・Tripadvisor（第三者）', zh: 'La Flauta Rambla地址参考·Tripadvisor（第三方）' } },
    candidateSagradaHours: { url: 'https://sagradafamilia.org/en/schedules-how-to-get', names: { ko: '사그라다 파밀리아 공식 11월 시간', en: 'Sagrada Família official November hours', ja: 'サグラダ・ファミリア公式11月時間', zh: '圣家堂官方11月开放时间' } },
    candidateSantPauHours: { url: 'https://santpaubarcelona.org/en/visita/visita-lliure/', names: { ko: 'Sant Pau 공식 관람시간', en: 'Sant Pau official visiting hours', ja: 'サン・パウ公式見学時間', zh: '圣保罗官方参观时间' } }
  };
  Object.assign(guide.sources, sources);
  const copy = {
    ko: {
      title: '식당 대체 후보 · 새 일정이나 예약 아님',
      paragraphs: [
        '기준: 2026년 11월 10일 사그라다 파밀리아 입장은 사용자 정정에 따라 16:45 확정입니다. El Nacional은 사용자가 취소해 후보에서 제외했습니다. 아래는 방문 시각을 배정하지 않은 선택지이며 어떤 식당도 새로 예약하지 않았습니다.',
        '1) El Glop Plaça Catalunya — 밥·고기 식사를 원할 때 먼저 비교할 후보. 주소는 Carrer de Casp 21이며 Rambla de Catalunya 65의 동명 업장이나 성당 인근 Gaudí 지점과 다릅니다. 공식 공통 메뉴 게시가격은 먹물 밥 €20.50/인, 해산물 빠에야 €20.85/인으로 쌀·피데우아류는 최소 2인 주문입니다. 이베리코 세크레토는 €24.55로 게시됩니다. 음료·곁들임을 더한 식사 총액이 €20–30이라고 보장하지 않습니다. Plaça Catalunya 지점 게시시간은 월–금 08:00–24:00, 토·일 11:00–24:00이며 주방 마감은 따로 확인해야 합니다. 공식 온라인 예약 또는 지점 WhatsApp 안내가 있지만 좌석 가능 여부는 조회하지 않았습니다.',
        '2) Txapela Passeig de Gràcia — 가볍게 여러 가지를 고를 때의 후보. 확인한 지점은 Passeig de Gràcia 58입니다. 공식 지점 페이지에 연결된 메뉴는 핀초스 €2.95–4.75/개, 브라바스 €6.95, 오징어튀김 €9.75로 게시하며 VAT 포함입니다. 고른 수량에 따라 총액이 늘어나므로 저렴하게 배부른 식사를 보장하지 않습니다. 월–목 08:00–24:00, 금–일 09:00–24:00, 주방은 폐점 30분 전 마감으로 안내합니다. 공식 예약에서 높은 테이블·낮은 테이블·바 좌석을 안내하므로 부모님과는 낮은 테이블을 요청하고 실제 배정을 확인하세요. 예약이나 좌석 확보는 하지 않았습니다.',
        '3) La Flauta Rambla — 운영·가격을 먼저 확인한 뒤 고를 조건부 타파스 후보. Rambla de Catalunya 91이라는 주소는 제3자 지점 자료 기준이며 Aribau 23 지점과 구분해야 합니다. 공식 그룹은 La Flauta와 Ciutat Comtal을 같은 그룹 브랜드로 소개하지만 동일 메뉴나 맛·품질을 보장하지 않습니다. Rambla 지점의 최신 공식 메뉴·가격표·영업시간·예약 정책은 확인하지 못했습니다. 비공식 시간표도 서로 달라 캡처의 €20–30, 08:00 개점, 특정 꿀대구·새우꼬치 제공을 확정 정보로 옮기지 않았습니다. 대기나 좌석 여부를 확인한 뒤 선택하세요.',
        '16:45 입장과의 관계: 세 식당은 도심의 Passeig de Gràcia·Rambla de Catalunya·카탈루냐 광장 권역이며 성당 바로 앞 식당은 아닙니다. 관람 종료를 임의로 정하거나 도보로 모두 잇지 말고, 한 곳을 고른 뒤 실제 교통·하차 후 보행을 확인하세요. 사그라다의 11–2월 일반 폐장은 18:00입니다. 기존 명소인 Sant Pau는 11–3월 17:00 폐장·16:30 마지막 입장이므로 16:45 성당 관람 뒤의 실내 대안으로 묶지 않습니다. 나머지 명소는 기존 가이드의 선택지를 그대로 두고 새 유료 관람·고정 시각을 추가하지 않습니다.'
      ],
      note: '정보 확인: 2026.11.09. 게시 메뉴·가격·영업시간은 당일 달라질 수 있습니다. 계단·좌석 높이·화장실·접근성·소음·대기시간은 확인되지 않았습니다. 부모님 컨디션에 따라 한 곳만 선택하거나 식사 후 바로 귀환하세요. 예약·취소·캘린더 추가는 하지 않았습니다.',
      chip: '바르셀로나 식당 대체 후보', query: '바르셀로나 식당 대체 후보 La Flauta El Glop Txapela', link: '후보와 확인 자료 보기',
      maps: ['El Glop Plaça Catalunya 지도', 'Txapela 58번지 지도', 'La Flauta Rambla 지도']
    },
    en: {
      title: 'Restaurant alternatives · not a new itinerary or booking',
      paragraphs: [
        'Anchor: Sagrada Família entry on 10 November 2026 is confirmed at 16:45, following the user’s correction. El Nacional is excluded because the user cancelled it. These are options without assigned visit times; no new restaurant reservation has been made.',
        '1) El Glop Plaça Catalunya — the first comparison if you want rice or a meat main. Its address is Carrer de Casp 21, not the similarly named venue at Rambla de Catalunya 65 or the Gaudí branch near the Basilica. The official shared menu lists black rice at €20.50 per person and seafood paella at €20.85 per person; rice and fideuà require a minimum order for two people. Iberian secreto is listed at €24.55. A full meal with drinks and sides is not guaranteed to cost €20–30. Published branch hours are Mon–Fri 08:00–24:00 and Sat–Sun 11:00–24:00; kitchen closing needs separate confirmation. Official online booking and branch WhatsApp are offered, but table availability has not been checked.',
        '2) Txapela Passeig de Gràcia — an option for a lighter selection of small dishes. The verified branch is Passeig de Gràcia 58. The menu linked from its official branch page lists pintxos at €2.95–4.75 each, bravas at €6.95 and calamari at €9.75, including VAT. The bill increases with the quantity ordered; a cheap, filling meal is not guaranteed. Listed hours are Mon–Thu 08:00–24:00 and Fri–Sun 09:00–24:00, with the kitchen closing 30 minutes earlier. Official booking mentions high tables, low tables and bar seats: request a low table for your parents and confirm the actual allocation. No reservation or seat has been secured.',
        '3) La Flauta Rambla — a conditional tapas backup after checking operations and prices. Third-party branch listings place it at Rambla de Catalunya 91; distinguish it from Aribau 23. The official group lists La Flauta and Ciutat Comtal as its brands, but this does not guarantee identical menus, taste or quality. A current official Rambla menu, price list, timetable or reservation policy could not be verified. Third-party timetables also conflict, so the screenshot’s €20–30 range, 08:00 opening and specific honey-cod or prawn-skewer claims are not carried over as confirmed facts. Check seating and any wait before choosing it.',
        'Fit with the 16:45 entry: these restaurants are in the Passeig de Gràcia / Rambla de Catalunya / Plaça Catalunya area, not immediately outside the Basilica. Do not assume a visit end time or walk between all of them; choose one and check the actual transport route and walking after drop-off. Sagrada Família’s normal Nov–Feb closing time is 18:00. Existing attraction Sant Pau closes at 17:00 in Nov–Mar, with last entry at 16:30, so it is not an indoor add-on after the 16:45 Basilica visit. Keep the other existing attraction options without adding paid visits or fixed timings.'
      ],
      note: 'Checked 9 Nov 2026. Posted menus, prices and hours can change. Steps, seat height, toilets, accessibility, noise and wait times have not been verified. Choose one place or return straight after the meal to suit your parents’ energy. No booking, cancellation or calendar item was made.',
      chip: 'Barcelona restaurant alternatives', query: 'Barcelona restaurant alternative candidates La Flauta El Glop Txapela', link: 'See candidates and evidence',
      maps: ['El Glop Plaça Catalunya map', 'Txapela no. 58 map', 'La Flauta Rambla map']
    },
    ja: {
      title: 'レストランの代替候補 · 新しい行程・予約ではありません',
      paragraphs: [
        '基準：2026年11月10日のサグラダ・ファミリア入場は、ユーザーの訂正により16:45で確定しています。El Nacionalはユーザーがキャンセルしたため候補から外しています。以下は訪問時刻を決めない選択肢で、新規のレストラン予約はしていません。',
        '1）El Glop Plaça Catalunya — ご飯料理や肉の主菜を希望するときに、まず比較したい候補。住所はCarrer de Casp 21で、Rambla de Catalunya 65の同名店や聖堂近くのGaudí店とは異なります。公式共通メニューの掲載価格はイカ墨ご飯€20.50／人、魚介パエリア€20.85／人で、米料理・フィデウアは最低2人前からです。イベリコ豚セクレトは€24.55と掲載されています。飲み物や付け合わせを含む総額が€20～30になるとは保証できません。店舗の掲載時間は月～金08:00～24:00、土・日11:00～24:00で、厨房の終了時刻は別途確認が必要です。公式オンライン予約と店舗WhatsAppの案内はありますが、空席は照会していません。',
        '2）Txapela Passeig de Gràcia — 少量ずついろいろ選ぶ軽めの食事候補。確認した店舗はPasseig de Gràcia 58です。公式店舗ページからリンクされたメニューではピンチョス€2.95～4.75／個、ブラバス€6.95、イカフライ€9.75で、VAT込みです。注文量に応じて会計が増えるため、安く満腹になるとは保証しません。掲載時間は月～木08:00～24:00、金～日09:00～24:00、厨房は閉店30分前に終了します。公式予約にはハイテーブル・ローテーブル・カウンター席の案内があるため、ご両親にはローテーブルを希望し、実際の配席を確認してください。予約・席の確保はしていません。',
        '3）La Flauta Rambla — 営業と価格を確認してから選ぶ、条件付きのタパス候補。第三者の店舗情報ではRambla de Catalunya 91で、Aribau 23店と区別が必要です。公式グループはLa FlautaとCiutat Comtalを同グループのブランドとして紹介していますが、同じメニューや味・品質の保証ではありません。Rambla店の最新公式メニュー・価格表・営業時間・予約方針は確認できませんでした。第三者の時間表も食い違うため、画像の€20～30、08:00開店、特定のハニーコッドやエビ串の提供は確定情報として転記していません。待ち時間や席を確認してから選びましょう。',
        '16:45入場との関係：3店はPasseig de Gràcia・Rambla de Catalunya・カタルーニャ広場周辺で、聖堂のすぐ前ではありません。見学終了時刻を決めつけたり全店を徒歩でつないだりせず、一店を選んで交通と降車後の歩行を確認してください。サグラダの11～2月の通常閉館は18:00です。既存候補のサン・パウは11～3月17:00閉館、最終入場16:30なので、16:45の聖堂見学後の屋内追加訪問にはできません。ほかの名所は既存ガイドの候補を残し、有料見学や固定時刻を新たに追加しません。'
      ],
      note: '情報確認：2026年11月9日。掲載メニュー・価格・営業時間は変わる場合があります。段差・座席の高さ・トイレ・アクセシビリティ・騒音・待ち時間は未確認です。ご両親の体調に合わせ一店だけ選ぶか、食後はそのまま戻りましょう。予約・キャンセル・カレンダー追加はしていません。',
      chip: 'バルセロナのレストラン代替候補', query: 'バルセロナ レストラン 代替候補 La Flauta El Glop Txapela', link: '候補と確認資料を見る',
      maps: ['El Glop Plaça Catalunya 地図', 'Txapela 58番地 地図', 'La Flauta Rambla 地図']
    },
    zh: {
      title: '餐厅替代候选 · 不是新行程或预订',
      paragraphs: [
        '前提：根据用户更正，2026年11月10日圣家堂入场已确定为16:45。用户已取消El Nacional，因此不再把它作为候选。以下只是未安排具体到店时间的选项，没有新订任何餐厅。',
        '1）El Glop Plaça Catalunya — 想吃米饭或肉类主菜时优先比较的候选。地址为Carrer de Casp 21，不是Rambla de Catalunya 65的同名店，也不是圣家堂附近的Gaudí店。官方共用菜单标价为墨鱼汁饭€20.50／人、海鲜饭€20.85／人；米饭和fideuà至少点两人份。伊比利亚猪secreto标价€24.55。不能保证加上饮料和配菜后，一顿饭总价仍在€20–30。该店公布时间为周一至周五08:00–24:00、周六周日11:00–24:00，厨房结束时间需另行确认。官方提供在线预约和门店WhatsApp，但未查询空位。',
        '2）Txapela Passeig de Gràcia — 适合少量多样、轻食选择的候选。核实的门店是Passeig de Gràcia 58。官方门店页面链接的菜单列出pintxos €2.95–4.75／个、辣酱土豆€6.95、炸鱿鱼€9.75，含VAT。账单随点单数量增加，不能保证便宜又吃饱。公布时间为周一至周四08:00–24:00、周五至周日09:00–24:00，厨房在关门前30分钟结束。官方预约介绍高桌、低桌和吧台座位；陪父母可要求低桌，并确认实际安排。未预约，也未保证有座位。',
        '3）La Flauta Rambla — 先核对营业和价格，再决定的条件性tapas备选。第三方门店资料列出的地址为Rambla de Catalunya 91，需要与Aribau 23门店区分。集团官网把La Flauta与Ciutat Comtal列为旗下品牌，但这不保证菜单相同、味道或品质。未能核实Rambla店最新的官方菜单、价目表、营业时间或预约政策。第三方时间表也有冲突，因此没有把截图中的€20–30、08:00开门、特定蜂蜜鳕鱼或虾串供应当作确定信息。选择前请确认等位和座位情况。',
        '与16:45入场的关系：三家餐厅位于Passeig de Gràcia、Rambla de Catalunya和加泰罗尼亚广场一带，不在圣家堂门口。不要假定参观结束时刻，也不要把三店都串成步行路线；选定一家后再确认实际交通及下车后的步行。圣家堂11月至次年2月通常18:00闭馆。已有候选圣保罗在11月至次年3月17:00闭馆、16:30停止入场，因此不能作为16:45圣家堂参观之后的室内追加景点。其他景点保留原指南中的候选，不新增付费参观或固定时间。'
      ],
      note: '核实于2026年11月9日。菜单、价格和营业时间可能变动。台阶、座椅高度、洗手间、无障碍条件、噪音和等候时间均未核实。请按长辈体力只选一家，或用餐后直接返回。没有进行预约、取消或添加日历事项。',
      chip: '巴塞罗那餐厅替代候选', query: '巴塞罗那 餐厅 替代候选 La Flauta El Glop Txapela', link: '查看候选与核实资料',
      maps: ['El Glop Plaça Catalunya 地图', 'Txapela 58号 地图', 'La Flauta Rambla 地图']
    }
  };
  const addresses = ['El Glop Braseria, Carrer de Casp 21, Barcelona', 'Txapela, Passeig de Gràcia 58, Barcelona', 'La Flauta Rambla, Rambla de Catalunya 91, Barcelona'];
  const cardByLocale = {};
  Object.keys(copy).forEach(lang => {
    const text = copy[lang];
    const card = {
      id: 'bcn-card-candidate-options', icon: '', title: text.title,
      paragraphs: text.paragraphs, note: text.note,
      links: addresses.map((query, index) => ({ label: text.maps[index], query })),
      sources: Object.keys(sources)
    };
    cardByLocale[lang] = card;
    if (!guide.content[lang].guide.cards.some(item => item.id === card.id)) guide.content[lang].guide.cards.push(card);
    guide.content[lang].candidateOptions = text;
    if (typeof CHATBOT_I18N !== 'undefined' && Array.isArray(CHATBOT_I18N[lang]?.chips) && !CHATBOT_I18N[lang].chips.some(item => item.q === text.query)) {
      CHATBOT_I18N[lang].chips.unshift({ text: text.chip, q: text.query });
    }
  });
  function esc(value) { return String(value == null ? '' : value).replace(/[&<>"']/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch])); }
  function localeFor(lang) { return copy[lang] ? lang : 'ko'; }
  const previousChat = window.buildBarcelonaLocalChatResponse;
  const venuePattern = /(?:la\s*flauta|라\s*플라우타|ラ[・\s]*フラウタ|txapela|차펠라|챠펠라|チャペラ|el\s*na(?:cional|tional)|엘\s*나시오날|엘\s*나셔널|エル[・\s]*ナシオナル|el\s*glop|엘\s*(?:글롭|그롭)|エル[・\s]*グロップ)/i;
  const barcelonaPattern = /(?:barcelona|바르셀로나|バルセロナ|巴塞罗那)/i;
  const optionPattern = /(?:alternative|replacement|candidate|cheaper|대체|후보|저렴|代替|候補|替代|备选|候选)/i;
  const otherGlopBranch = /(?:(?:el\s*glop|엘\s*(?:글롭|그롭)|エル[・\s]*グロップ)\s*[-|·:,]?\s*(?:gaud[ií]|gr[aà]cia|가우디|그라시아|ガウディ|グラシア|高迪|格拉西亚)|(?:가우디|그라시아)\s*엘\s*(?:글롭|그롭))/i;
  function buildCandidateResponse(query, lang) {
    const q = String(query || '');
    const asksOtherGlop = /(?:el\s*glop|엘\s*(?:글롭|그롭)|エル[・\s]*グロップ)/i.test(q) && otherGlopBranch.test(q) && !/(?:txapela|la\s*flauta|pla[cç]a|plaza|catalu|카탈루냐|カタルーニャ|加泰罗尼亚)/i.test(q);
    if (asksOtherGlop || !(venuePattern.test(q) || (barcelonaPattern.test(q) && optionPattern.test(q) && /(?:restaurant|dining|food|식당|맛집|レストラン|餐厅)/i.test(q)))) {
      return null;
    }
    const locale = localeFor(lang || window.currentLang || 'ko');
    const text = copy[locale];
    const paragraphs = text.paragraphs.map(p => `<p>${esc(p)}</p>`).join('');
    const refs = Object.values(sources).map(source => `<a class="bcn-transit-source" href="${esc(source.url)}" target="_blank" rel="noopener noreferrer">${esc(source.names[locale])}</a>`).join('');
    return `<div class="bcn-transit-chat-answer"><strong>${esc(text.title)}</strong>${paragraphs}<p>${esc(text.note)}</p><div class="bcn-transit-sources">${refs}</div><button type="button" class="chat-quick-chip" onclick="openBarcelonaLocalTopic('candidate-options')">${esc(text.link)}</button></div>`;
  }
  window.buildBarcelonaCandidateOptionsChatResponse = buildCandidateResponse;
  window.buildBarcelonaLocalChatResponse = function (query, lang) {
    return buildCandidateResponse(query, lang) || (typeof previousChat === 'function' ? previousChat(query, lang) : null);
  };
  const previousOpenTopic = window.openBarcelonaLocalTopic;
  window.openBarcelonaLocalTopic = function (topic) {
    if (topic !== 'candidate-options') return typeof previousOpenTopic === 'function' ? previousOpenTopic(topic) : undefined;
    window.switchGuidebookChapter?.('chapter-practical', false);
    window.goToBookPage?.('chapter-practical', 4, false);
    window.setTimeout(() => {
      const card = document.getElementById('bcn-card-candidate-options');
      if (card) { card.open = true; card.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    }, 160);
    window.closeChatWindow?.();
  };
  window.BARCELONA_CANDIDATE_OPTIONS = { content: copy, sources, cardByLocale };
  if (!document.getElementById('bcn-candidate-options-styles')) {
    const style = document.createElement('style');
    style.id = 'bcn-candidate-options-styles';
    style.textContent = '#bcn-card-candidate-options{grid-column:1/-1}#bcn-card-candidate-options .bcn-local-card-body>p{line-height:1.75;overflow-wrap:anywhere}';
    document.head.appendChild(style);
  }
  guide.render?.(window.currentLang || 'ko');
})();
