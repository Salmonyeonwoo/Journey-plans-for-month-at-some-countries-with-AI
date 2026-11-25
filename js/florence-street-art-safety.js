/* Translation module for the user-supplied Florence sidewalk-art guide. */
(function (root) {
  'use strict';

  const LANGS = ['ko', 'en', 'ja', 'zh'];
  const ID = 'florence-street-art-safety-guide';
  const COPY = {
    ko: {
      title: "🚨 피렌체 '길바닥 그림 밟기'의 정체 & 완벽 대처 가이드",
      sections: [
        {
          title: '1. 팩트 체크: 이탈리아 문화? 법적 벌금? ❌ 100% 불법 사기!',
          lines: [
            '정체: 예술가가 아니라 무허가 불법 노점 사기꾼들입니다.',
            '바닥에 깔린 그림의 정체: 직접 그린 원화가 아니라 공장에서 대량 인쇄한 장당 €1~€2짜리 싸구려 종이 포스터(복사본)입니다.',
            '법적 의무: 허가 없이 보행자 도로에 물건을 깔아두고 장사하는 것 자체가 이탈리아 법 위반(불법)이므로, 실수로 밟았더라도 배상할 의무가 전혀 없습니다. 실제로 근처에 경찰만 나타나면 사기꾼들이 돗자리째 돌돌 말아 1초 만에 도망칩니다.'
          ]
        },
        {
          title: '2. 🎭 사기 수법 3단계 (특히 아시아 관광객 집중 타깃!)',
          lines: [
            '1. 함정 설치: 사람들이 하늘(두오모 돔·건물 외벽)을 올려다보거나 구글맵을 보며 걷는 좁은 보행자 도로 한복판에 포스터를 쫙 펼쳐 놓습니다.',
            '2. 유도 및 연기: 관광객이 실수로 가장자리를 살짝 밟거나 스치기만 해도(심지어 미리 얼룩을 묻혀두거나 발밑으로 슬쩍 미는 경우도 있음), 갑자기 소리를 지르며 *"내 귀한 수제 작품을 망쳤다!"*고 과장된 분노 연기를 시작합니다.',
            '3. 강매 및 공갈: 관광객이 미안해서 당황하는 틈을 타, 밟은 그림을 돌돌 말아 강제로 손이나 가방에 쑤셔 넣으며 €50 ~ €200(7만~30만 원)을 현금으로 내라고 협박합니다. (예의 바르고 다툼을 싫어하는 한국·일본 여행객들이 죄책감에 지갑을 여는 심리를 악용합니다.)'
          ]
        },
        {
          title: '3. 📍 피렌체 내 최다 출몰 4대 주의 구역',
          lines: [
            '오늘 오후부터 피렌체 시내를 걸으실 때 아래 구역에서는 반드시 발밑을 보며 크게 피해 걸으세요!',
            '두오모 광장 (Piazza del Duomo) 주변 보행로: 관광객 대부분이 고개를 들어 대성당 돔과 종탑을 찍느라 발밑을 못 봐서 피해가 가장 잦습니다.',
            'Via dei Calzaiuoli (칼차이우올리 거리): 두오모 광장과 시뇨리아 광장을 잇는 가장 번화하고 좁은 보행자 메인 거리.',
            '시뇨리아 광장 (Piazza della Signoria) 및 주요 미술관 진입 골목',
            '베키오 다리 (Ponte Vecchio) 앞 진입로'
          ]
        },
        {
          title: "4. 🛡️ 혹시라도 밟았을 때 '1유로도 안 내는' 4단계 대처법",
          lines: [
            '1. ❌ 절대 멈춰 서서 사과하거나 지갑을 꺼내지 마세요!',
            '미안하다며 걸음을 멈추는 순간 2~3명이 몰려와 심리적 압박을 겁니다. 단호하게 "No!" 한마디만 하고 절대 멈추지 말고 사람 많은 곳이나 상점 안으로 바로 걸어가세요.',
            '2. 🖐️ 억지로 그림을 손·가방에 쥐여줘도 바로 떨구고 가세요!',
            '*"돈 냈으니 가져가라 / 네가 망쳤으니 사라"*며 강제로 안겨주는 그림을 받아 들면 빠져나오기 힘들어집니다. 절대 받지 마시고, 억지로 쥐여주면 그 자리에 내려놓고 그냥 가세요.',
            '3. 🚔 100% 먹히는 필살기: "Polizia! (폴리치아!)" & 112 전화 시늉',
            '계속 따라오며 돈을 요구하면 휴대폰을 높이 들고 큰 소리로 "Polizia! (경찰!)" 또는 "Chiamo la polizia! (경찰 부르겠다!)"라고 외치며 이탈리아 긴급번호 112를 누르는 시늉을 하세요. 본인들이 불법 노점이라 경찰이 오면 벌금·물건 압수를 당하므로 99% 즉시 욕을 중얼거리며 물러납니다.',
            '4. 👨‍👩‍👧 부모님께 도착 전 미리 드릴 1줄 브리핑:',
            '"피렌체 길바닥에 종이 그림 깔려 있는 건 일부러 밟게 해서 돈 뜯는 사기꾼들이니 무조건 멀리 돌아가고, 혹시 실수로 스쳐도 절대 \'미안하다\'며 지갑 열지 마시고 그냥 제 뒤만 따라 쭉 걸어오세요!"'
          ]
        },
        {
          title: '💡 5. 헷갈리지 마세요: 진짜 합법 거리 화가 (Madonnari)와의 구분법',
          lines: [
            '❌ 사기꾼: 인쇄된 종이 포스터 여러 장을 길바닥 한가운데 펼쳐둠 ➔ 밟으면 화내며 거액 요구.',
            '⭕ 진짜 거리 화가 (Madonnari): 종이가 아니라 돌바닥에 직접 분필·파스텔로 명화를 그림. 보통 시의 허가를 받고 테두리 경계를 쳐둔 채, 옆에 모자나 작은 통을 놓아 자율 팁만 받습니다. (물론 예의상 그림 위를 밟지 않도록 돌아서 걸어주시면 됩니다!)'
          ]
        }
      ],
      chatbotQuestion: '피렌체 길바닥 그림 밟기 안내',
      chatbotChip: '🛡️ 피렌체 그림 안내',
      chatbotTitle: '피렌체 길바닥 그림 안내',
      chatbotAnswer: '요청하신 안내의 전체 원문을 아래 가이드에서 확인하세요.',
      viewGuide: '전체 안내 열기'
    },
    en: {
      title: '🚨 The Truth About Florence’s “Stepping on Street Art” Scam & the Perfect Response Guide',
      sections: [
        {
          title: '1. Fact Check: Italian Culture? Legal Fines? ❌ 100% Illegal Scam!',
          lines: [
            'What it is: They are not artists, but unlicensed, illegal street-vending scammers.',
            'What the pictures laid out on the ground really are: Not original works they painted themselves, but cheap paper posters (copies) mass-printed in factories for €1–€2 each.',
            'Legal obligation: Laying out goods and selling them on a pedestrian walkway without a permit is itself a violation of Italian law (illegal), so you have absolutely no obligation to pay compensation even if you accidentally step on one. In fact, as soon as the police show up nearby, the scammers roll up their mats and flee in one second.'
          ]
        },
        {
          title: '2. 🎭 The Scam in 3 Steps (Asian Tourists Are Especially Targeted!)',
          lines: [
            '1. Setting the trap: They spread posters across the middle of narrow pedestrian walkways where people look up at the sky (the Duomo dome and building facades) or walk while looking at Google Maps.',
            '2. Luring and acting: Even if a tourist accidentally steps lightly on the edge or merely brushes against one (sometimes they even smear it beforehand or slyly slide it underfoot), they suddenly start shouting and put on an exaggerated display of anger, saying, *“You ruined my precious handmade artwork!”*',
            '3. Forced sale and extortion: While the tourist is flustered and feels sorry, they roll up the picture that was stepped on, force it into the tourist’s hand or bag, and threaten them into paying €50–€200 (70,000–300,000 won) in cash. (They exploit the guilt felt by polite Korean and Japanese travelers who dislike conflict, and the tendency to open their wallets.)'
          ]
        },
        {
          title: '3. 📍 The 4 Most Common Scam Hotspots in Florence',
          lines: [
            'Starting this afternoon, when walking around central Florence, be sure to watch your step and take a wide detour around the following areas!',
            'Pedestrian walkways around Piazza del Duomo: Incidents are most frequent here because most tourists look up to photograph the cathedral dome and bell tower and don’t watch where they’re going.',
            'Via dei Calzaiuoli: The busiest and narrowest main pedestrian street connecting Piazza del Duomo and Piazza della Signoria.',
            'Piazza della Signoria and the alleyways leading to major art museums',
            'The approach in front of Ponte Vecchio'
          ]
        },
        {
          title: '4. 🛡️ What to Do If You Step on One: 4 Steps to “Not Pay Even 1 Euro”',
          lines: [
            '1. ❌ Never stop to apologize or take out your wallet!',
            'The moment you stop walking to say you’re sorry, two or three people will gather around and put you under psychological pressure. Firmly say just one word, “No!” and do not stop; walk straight into a crowded place or a shop.',
            '2. 🖐️ Even if they force a picture into your hand or bag, drop it right away and walk on!',
            'If you accept a picture they force on you, saying *“You paid for it, so take it / You ruined it, so buy it,”* it will be hard to get away. Do not accept it under any circumstances; if they force it into your hands, put it down right there and just leave.',
            '3. 🚔 The 100%-effective secret weapon: “Polizia! (Police!)” & Pretend to Call 112',
            'If they keep following you and demanding money, hold your phone up high and shout “Polizia! (Police!)” or “Chiamo la polizia! (I’m calling the police!)” while pretending to dial Italy’s emergency number, 112. Since they are illegal street vendors, they’ll be fined and have their goods confiscated if the police arrive, so 99% of the time they immediately mutter insults and back off.',
            '4. 👨‍👩‍👧 One-line briefing to give your parents before you arrive:',
            '“Those paper pictures laid out on the ground in Florence are a scam by people who make you step on them on purpose to extort money, so always take a wide detour, and even if you accidentally brush against one, absolutely don’t open your wallet saying ‘I’m sorry’—just keep walking right behind me!”'
          ]
        },
        {
          title: '💡 5. Don’t Get Confused: How to Tell Real, Legal Street Painters (Madonnari) Apart',
          lines: [
            '❌ Scammers: Spread several printed paper posters across the middle of the street ➔ Get angry if you step on them and demand a large sum.',
            '⭕ Real street painters (Madonnari): They paint masterpieces directly onto the stone pavement with chalk or pastels, not on paper. They usually have the city’s permission and mark off the area with a boundary, placing a hat or small container beside them to accept voluntary tips only. (Of course, out of courtesy, you can walk around so you don’t step on the artwork!)'
          ]
        }
      ],
      chatbotQuestion: 'Florence sidewalk-art stepping guide',
      chatbotChip: '🛡️ Florence picture guide',
      chatbotTitle: 'Florence sidewalk-art guide',
      chatbotAnswer: 'Open the full text of the requested guide below.',
      viewGuide: 'Open the full guide'
    },
    ja: {
      title: '🚨 フィレンツェ「路上の絵を踏ませる」詐欺の正体＆完璧な対処ガイド',
      sections: [
        {
          title: '1. ファクトチェック：イタリア文化？法的な罰金？❌ 100％違法な詐欺！',
          lines: [
            '正体：芸術家ではなく、無許可で営業する違法な露店詐欺師たちです。',
            '路上に敷かれた絵の正体：自分で描いた原画ではなく、工場で大量印刷された1枚€1～€2の安っぽい紙ポスター（複製品）です。',
            '法的義務：許可なく歩道に物を敷いて商売すること自体がイタリアの法律違反（違法）なので、うっかり踏んでしまっても賠償する義務はまったくありません。実際、近くに警察が現れるだけで詐欺師たちは敷物ごとくるくる巻いて、1秒で逃げていきます。'
          ]
        },
        {
          title: '2. 🎭 詐欺の手口3段階（特にアジア人観光客が集中的に狙われます！）',
          lines: [
            '1. 罠を仕掛ける：人々が空（ドゥオーモのドーム・建物の外壁）を見上げたり、Googleマップを見ながら歩いたりする狭い歩道のど真ん中に、ポスターを広げて敷いておきます。',
            '2. 誘導して演技：観光客がうっかり端を少し踏んだり、かすったりしただけでも（あらかじめシミをつけておいたり、足元にさっと押し込んだりする場合さえあります）、突然大声を上げ、*「私の大切な手作り作品を台無しにした！」*と大げさに怒る演技を始めます。',
            '3. 押し売りと恐喝：観光客が申し訳なさで慌てている隙に、踏まれた絵をくるくる巻いて無理やり手やバッグに押し込み、€50～€200（7万～30万ウォン）を現金で払えと脅します。（礼儀正しく、口論を嫌う韓国・日本の旅行者が罪悪感から財布を開く心理につけ込みます。）'
          ]
        },
        {
          title: '3. 📍 フィレンツェで特に多発する4大注意エリア',
          lines: [
            '今日の午後からフィレンツェ市内を歩く際は、以下のエリアでは必ず足元を見て、大きく避けて歩いてください！',
            'ドゥオーモ広場（Piazza del Duomo）周辺の歩道：観光客の大半が大聖堂のドームや鐘楼を撮影するために上を向き、足元を見ていないので、被害が最も多いです。',
            'Via dei Calzaiuoli（カルツァイウオーリ通り）：ドゥオーモ広場とシニョリーア広場を結ぶ、最もにぎやかで狭い歩行者専用のメインストリート。',
            'シニョリーア広場（Piazza della Signoria）および主要美術館へ入る路地',
            'ヴェッキオ橋（Ponte Vecchio）前の進入路'
          ]
        },
        {
          title: '4. 🛡️ もし踏んでしまったとき「1ユーロも払わない」ための4段階対処法',
          lines: [
            '1. ❌ 絶対に立ち止まって謝ったり、財布を取り出したりしないでください！',
            '申し訳ないと思って足を止めた瞬間、2～3人が集まってきて心理的な圧力をかけてきます。きっぱり「No!」と一言だけ言い、絶対に立ち止まらず、人の多い場所か店の中へすぐ歩いて行ってください。',
            '2. 🖐️ 無理やり絵を手やバッグに押しつけられても、すぐに置いて立ち去ってください！',
            '*「お金を払ったんだから持っていけ／お前が台無しにしたんだから買え」*と無理やり渡される絵を受け取ると、逃げ出しにくくなります。絶対に受け取らず、無理に押しつけられたらその場に置いて、そのまま立ち去ってください。',
            '3. 🚔 100％効く必殺技：「Polizia!（ポリツィア！）」＆112に電話するふり',
            'つきまとって金を要求し続けるなら、携帯電話を高く掲げ、大声で「Polizia!（警察！）」または「Chiamo la polizia!（警察を呼ぶ！）」と叫び、イタリアの緊急番号112に電話するふりをしてください。自分たちが違法露店なので、警察が来ると罰金を科され、物を押収されるため、99％はすぐに悪態をつぶやきながら引き下がります。',
            '4. 👨‍👩‍👧 ご両親に到着前に伝えておく1行ブリーフィング：',
            '「フィレンツェの路上に紙の絵が敷いてあるのは、わざと踏ませて金を巻き上げる詐欺師たちだから、必ず大きく迂回して、もしうっかりかすっても絶対に『ごめんなさい』と言って財布を開かず、ただ私の後ろについてそのまま歩いてきてください！」'
          ]
        },
        {
          title: '💡 5. 混同しないでください：本物の合法なストリートアーティスト（Madonnari）との見分け方',
          lines: [
            '❌ 詐欺師：印刷された紙ポスターを何枚も路上の真ん中に広げて敷く ➔ 踏むと怒り、法外な金額を要求。',
            '⭕ 本物のストリートアーティスト（Madonnari）：紙ではなく、石畳にチョークやパステルで名画を直接描きます。通常は市の許可を得て、周囲に境界線を引き、横に帽子や小さな容器を置いて、任意のチップだけを受け取ります。（もちろん、礼儀として絵を踏まないよう迂回して歩いてください！）'
          ]
        }
      ],
      chatbotQuestion: 'フィレンツェの路上絵を踏ませる案内',
      chatbotChip: '🛡️ フィレンツェの絵の案内',
      chatbotTitle: 'フィレンツェの路上絵の案内',
      chatbotAnswer: '依頼された案内の全文を、下のガイドでご確認ください。',
      viewGuide: 'ガイド全文を開く'
    },
    zh: {
      title: '🚨 佛罗伦萨“踩路面画”骗局真相 & 完美应对指南',
      sections: [
        {
          title: '1. 事实核查：意大利文化？法律罚款？❌ 100%是非法骗局！',
          lines: [
            '真相：他们不是艺术家，而是无证经营的非法摊贩骗子。',
            '铺在地上的画是什么：不是亲手绘制的原作，而是工厂批量印刷、每张€1~€2的廉价纸质海报（复制品）。',
            '法律义务：未经许可就在行人道上铺放物品做生意，本身就违反意大利法律（属于违法行为），所以即使不小心踩到了，也完全没有赔偿义务。实际上，只要附近一出现警察，这些骗子就会连垫子一起卷起来，1秒内逃走。'
          ]
        },
        {
          title: '2. 🎭 骗局的3个步骤（尤其集中针对亚洲游客！）',
          lines: [
            '1. 设下陷阱：在人们仰望天空（大教堂穹顶、建筑外墙）或看着谷歌地图走路的狭窄行人道正中央，铺开一大片海报。',
            '2. 诱导与演戏：游客哪怕不小心轻轻踩到边缘，或只是擦过（甚至有时他们会事先弄上污渍，或悄悄把画推到你的脚下），他们也会突然大喊大叫，开始夸张地愤怒演戏，嚷着*“你把我珍贵的手工作品弄坏了！”*。',
            '3. 强卖与敲诈：趁游客因为不好意思而慌张时，他们会把被踩的画卷起来，强行塞进游客手里或包里，威胁要求支付€50 ~ €200（7万~30万韩元）现金。（他们利用韩国和日本游客有礼貌、不喜欢争吵、会因内疚而掏钱包的心理。）'
          ]
        },
        {
          title: '3. 📍 佛罗伦萨最常出没的4大警惕区域',
          lines: [
            '从今天下午起，在佛罗伦萨市内步行时，经过以下区域务必看好脚下，绕远一点走！',
            '大教堂广场（Piazza del Duomo）周边步行道：大多数游客抬头拍摄大教堂穹顶和钟楼，看不到脚下，因此这里受骗情况最频繁。',
            'Via dei Calzaiuoli（卡尔扎伊奥利街）：连接大教堂广场和领主广场、最繁华且狭窄的主要步行街。',
            '领主广场（Piazza della Signoria）及主要美术馆入口的小巷',
            '老桥（Ponte Vecchio）前的入口通道'
          ]
        },
        {
          title: '4. 🛡️ 万一踩到时“1欧元也不付”的4步应对法',
          lines: [
            '1. ❌ 绝对不要停下来道歉或掏钱包！',
            '你一停下脚步说抱歉，2～3个人就会围上来施加心理压力。坚决只说一句“No!”，绝对不要停下，立刻走到人多的地方或店里去。',
            '2. 🖐️ 就算他们硬把画塞到你手里或包里，也立刻放下然后离开！',
            '如果接过他们强塞给你的画，他们会说*“你付了钱就拿走 / 是你弄坏的，所以买下来”*，你就很难脱身。绝对不要接；如果他们硬塞给你，就把画放在原地，直接离开。',
            '3. 🚔 100%管用的杀手锏：“Polizia!（警察！）”&假装拨打112',
            '如果他们继续跟着你要钱，就高高举起手机，大声喊“Polizia!（警察！）”或“Chiamo la polizia!（我要叫警察！）”，并假装拨打意大利紧急电话号码112。他们自己是非法摊贩，一旦警察来了就会被罚款、物品被没收，所以99%会立刻一边嘟囔着骂人一边退开。',
            '4. 👨‍👩‍👧 抵达前提前给父母的一句话提醒：',
            '“佛罗伦萨路面上铺着的纸画，是骗子故意让人踩到后讹钱的，所以一定要绕远点走；万一不小心擦到了，也千万别说‘对不起’然后掏钱包，就跟在我后面一直往前走！”'
          ]
        },
        {
          title: '💡 5. 别搞混：如何区分真正合法的街头画家（Madonnari）',
          lines: [
            '❌ 骗子：把好几张印刷的纸质海报铺在路面正中央 ➔ 被踩到就发火，索要巨额赔偿。',
            '⭕ 真正的街头画家（Madonnari）：不是画在纸上，而是直接用粉笔、粉彩在石板路上画名画。通常会获得市政府许可，画作周围会划出边界，旁边放一顶帽子或一个小盒子，只接受自愿打赏。（当然，出于礼貌，请绕着走，不要踩在画上！）'
          ]
        }
      ],
      chatbotQuestion: '佛罗伦萨地面画踩踏指南',
      chatbotChip: '🛡️ 佛罗伦萨地面画指南',
      chatbotTitle: '佛罗伦萨地面画指南',
      chatbotAnswer: '请在下方指南中查看你要求的完整原文。',
      viewGuide: '打开完整指南'
    }
  };

  function h(value) {
    return String(value).replace(/[&<>"']/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[ch]);
  }

  function inline(value) {
    return h(value).replace(/\*(.+?)\*/g, '<em>$1</em>');
  }

  function currentLang() {
    const lang = String(root.currentLang || (root.document && root.document.documentElement.lang) || 'ko').toLowerCase();
    return COPY[lang] ? lang : 'ko';
  }

  function render(lang) {
    const l = COPY[lang] ? lang : 'ko';
    const t = COPY[l];
    const sections = t.sections.map(section =>
      `<article class="fsa-card"><h4>${h(section.title)}</h4><div class="fsa-copy">${section.lines.map(line => `<p>${inline(line)}</p>`).join('')}</div></article>`
    ).join('');
    return `<section class="florence-street-art-safety" id="${ID}" lang="${l}" aria-labelledby="fsa-title">
      <div class="fsa-heading"><h3 id="fsa-title">${h(t.title)}</h3></div>
      <div class="fsa-grid">${sections}</div>
    </section>`;
  }

  function isRelevant(query) {
    const q = String(query || '').toLocaleLowerCase();
    const florence = /florence|firenze|피렌체|フィレンツェ|佛罗伦萨|duomo|두오모|ドゥオーモ|主教座堂|ponte vecchio|베키오 다리|ヴェッキオ橋|老桥|via dei calzaiuoli|calzaiuoli|시뇨리아|signoria|シニョリーア|领主广场/.test(q);
    const streetArtOrScam = /madonnari|마돈나리|路上絵|路上アート|街头画|街头艺术|地面画|street[-\s]?art|street[-\s]?painting|sidewalk|pavement|chalk|printed picture|picture scam|scam|fraud|바닥 그림|길바닥|거리 그림|분필|인쇄 그림|그림 밟|작품을 밟|그림 사기|강매|돈을 요구|사기|詐欺|チョーク|地面の絵|絵を踏|絵の代金|支払いを要求|诈骗|粉笔|踩到画|踩到作品|索要现金|要求赔偿/.test(q);
    return florence && streetArtOrScam;
  }

  function openGuide() {
    if (typeof root.switchGuidebookChapter === 'function') root.switchGuidebookChapter('chapter-planner');
    if (typeof root.goToBookPage === 'function') root.goToBookPage('chapter-planner', 3, false);
    root.setTimeout(() => {
      const target = root.document && root.document.getElementById(ID);
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 150);
  }
  root.openFlorenceStreetArtSafetyGuide = openGuide;

  function answer(query) {
    if (!isRelevant(query)) return null;
    const lang = typeof root.getEffectiveLang === 'function' ? root.getEffectiveLang(query) : currentLang();
    const l = COPY[lang] ? lang : currentLang();
    const t = COPY[l];
    return `<div class="fsa-chat-answer"><strong>🛡️ ${h(t.chatbotTitle)}</strong><p>${h(t.chatbotAnswer)}</p><button type="button" class="chat-quick-chip fsa-chat-link" onclick="openFlorenceStreetArtSafetyGuide()">${h(t.viewGuide)} ↗</button></div>`;
  }

  function mount() {
    const doc = root.document;
    if (!doc) return;
    const grids = Array.prototype.slice.call(doc.querySelectorAll('#timelineGrid1, #timelineGrid2, #timelineGrid3'));
    const cityNames = ['피렌체', 'Florence', 'フィレンツェ', '佛罗伦萨'];
    const cards = [];
    grids.forEach(grid => {
      Array.prototype.forEach.call(grid.querySelectorAll('.day-card'), card => {
        const city = card.querySelector('.city-tag');
        if (city && cityNames.some(name => String(city.textContent || '').includes(name))) cards.push(card);
      });
    });
    let guide = doc.getElementById(ID);
    if (!cards.length) {
      if (guide && guide.parentNode) guide.parentNode.removeChild(guide);
      lastRenderedLang = '';
      return;
    }
    const lastCard = cards[cards.length - 1];
    const gallery = doc.getElementById('florence-photo-review-gallery');
    const anchor = gallery || lastCard;
    const lang = currentLang();
    if (!guide) {
      const holder = doc.createElement('div');
      holder.innerHTML = render(lang);
      guide = holder.firstElementChild;
      lastRenderedLang = lang;
    } else if (lastRenderedLang !== lang) {
      guide.outerHTML = render(lang);
      guide = doc.getElementById(ID);
      lastRenderedLang = lang;
    }
    if (guide && (guide.parentElement !== anchor.parentElement || guide.previousElementSibling !== anchor)) {
      anchor.insertAdjacentElement('afterend', guide);
    }
  }

  let lastRenderedLang = '';
  let scheduled = false;
  function scheduleUpdate() {
    if (scheduled) return;
    scheduled = true;
    root.requestAnimationFrame(() => {
      scheduled = false;
      mount();
    });
  }
  function init() {
    const doc = root.document;
    if (!doc || !doc.body) return;
    const planner = doc.getElementById('chapter-planner') || doc.body;
    const plannerObserver = new root.MutationObserver(scheduleUpdate);
    plannerObserver.observe(planner, { childList: true, subtree: true });
    const languageObserver = new root.MutationObserver(scheduleUpdate);
    languageObserver.observe(doc.documentElement, { attributes: true, attributeFilter: ['lang'] });
    mount();
  }
  if (typeof root.switchLanguage === 'function') {
    const originalSwitchLanguage = root.switchLanguage;
    root.switchLanguage = function () {
      const result = originalSwitchLanguage.apply(this, arguments);
      scheduleUpdate();
      return result;
    };
  }
  if (typeof root.handleLocalChat === 'function') {
    const originalHandleLocalChat = root.handleLocalChat;
    root.handleLocalChat = function (query) {
      return answer(query) || originalHandleLocalChat.apply(this, arguments);
    };
  }

  const chatbotI18n = root.CHATBOT_I18N;
  if (chatbotI18n) {
    LANGS.forEach(lang => {
      const dictionary = chatbotI18n[lang];
      const text = COPY[lang];
      if (!dictionary || !Array.isArray(dictionary.chips) || dictionary.chips.some(chip => String(chip.q || '') === text.chatbotQuestion)) return;
      dictionary.chips.push({ q: text.chatbotQuestion, text: text.chatbotChip });
    });
    if (typeof root.updateChatbotLanguage === 'function') root.updateChatbotLanguage(currentLang());
  }

  root.FLORENCE_STREET_ART_SAFETY = { render, answer, isRelevant, openGuide, copy: COPY };
  if (root.document && root.document.readyState === 'loading') {
    root.document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})(window);
