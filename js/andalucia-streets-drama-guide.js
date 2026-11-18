/* Independent review content; no changes to the personal itinerary. */
(function () {
  'use strict';
  var LANGS = ['ko', 'en', 'ja', 'zh'];
  var DATA = {
    ko: {
      avenueTitle: '헌법 대로와 거리 풍경 (Avenida de la Constitución)',
      photoAlt: '세비야 헌법 대로의 트램 선로와 거리 건축물', photoCaption: '사용자 제공 사진 · 개인정보 보호를 위해 크롭',
      avenue: [
        ['거리의 역사', '세비야 구시가지의 Avenida de la Constitución은 대성당과 인디아스 고문서관 곁을 지나는 거리입니다. 시 기록에 따르면 과거 Calle Génova라고 불린 부분이 있습니다. 20minutos는 2006년 차량 통행 폐쇄와 보행자화, 2007년 10월 Metrocentro 개통을 보도했습니다. 선로에서는 트램이 다니므로 보행 중 주의하세요. 원문의 차량·오염 수치와 대성당 피해의 인과관계는 검증하지 못했습니다.'],
        ['2026년 크리스마스와 히랄디요', '시청의 2026년 11월 13일 발표는 히랄디요를 본뜬 높이 6.5m의 발광 장식 32개를 설치하고 11월 27일 점등할 예정이라고 밝혔습니다. 원문의 35개·9m와 다르며 색상과 전체 설치 완료 여부는 공식 발표로 확인되지 않았습니다. 일정과 현장 상태는 방문 전 다시 확인하세요. 히랄디요는 대성당 히랄다 탑 꼭대기의 청동 풍향계상으로, 루이스 데 바르가스가 디자인하고 바르톨로메 모렐이 주조해 1568년 설치했습니다. 승리한 신앙을 상징하는 여성 형상이며 종려 가지와 방패를 듭니다. 현재 이름은 후대에 붙었고, 풍향계에서 탑 이름 히랄다가 유래했습니다.'],
        ['사그라리오 성당 (Iglesia del Sagrario)', '대성당에 붙은 이 교구 성당은 1618년 주춧돌을 놓고 1662년 완공했습니다. 외관의 고전적 입구와 달리 내부에는 바로크 장식이 풍부합니다. 공식 대성당 안내는 내부를 측면 예배당이 있는 직사각형 구조로 설명합니다. 현재 주제대는 프란시스코 디오니시오 데 리바스의 구조, 페드로 롤단의 십자가에서 내려지는 그리스도 부조, 발데스 레알의 채색으로 이루어져 있습니다. 옛 산 프란시스코 수도원의 비스카이노스 예배당에서 1840년 옮겨왔습니다. 외관에는 세 층의 벽기둥과 불꽃 모양 지붕 장식이 있고, 내부에는 채광창이 있는 돔이 있습니다. 위쪽 회랑의 교부와 복음사가 석상 8기는 호세 데 아르세가 1657년 제작한 작품으로 소개됩니다. 관람 가능 여부는 공식 안내를 확인하세요.'],
        ['세비야 시청사와 아르키요', '산 프란시스코 광장 쪽 시청사(Casa Consistorial)는 성당이 아니라 시민 행정 건물입니다. 디에고 데 리아뇨가 이끈 16세기 건물은 플라테레스코 건축의 중요한 사례이고, 19세기 확장에는 누에바 광장 쪽 신고전주의 정면이 더해졌습니다. 옛 수도원과 연결한 아르키요는 후안 산체스의 작업으로 전해지며 정면에 헤라클레스와 율리우스 카이사르의 형상이 있습니다. 시청의 내부에는 Sala Capitular와 Salón Colón 등이 있습니다. 출입 가능 여부는 방문 전 확인하세요. 세비야 상징 NO8DO와 알폰소 10세의 ‘나를 버리지 않았다’ 이야기는 전승이며, 시 역사 전시는 동시대 문서 증거가 없다고 설명합니다.'],
        ['거리의 20세기 건축', '지역주의 건축 경로에 속한 건물로는 Antonio González 주거건물 24–26번지(호세 에스피아우, 1927–1929), 비야마르타 후작 저택 14번지(아니발 곤살레스, 1915–1917), La Adriática 2번지(호세 에스피아우, 1914–1922)가 있습니다. 외관의 벽돌·장식과 주변 건물의 차이를 살펴보세요. 개별 실내와 현장 출입은 별도로 확인해야 합니다.']
      ],
      dramaTitle: '《알함브라 궁전의 추억》 검증된 촬영지 · 그라나다',
      dramaIntro: '현빈과 박신혜가 출연한 드라마의 촬영지 가운데 2018년 현지 보도로 확인된 곳을 선별했습니다. 전체 촬영지 목록은 아닙니다. 특정 장면이나 정확한 카메라 위치는 확인하지 않았습니다.',
      dramaCaution: '알함브라 궁전은 이야기 속 중요한 장소이지만 궁전 현장 촬영은 확인하지 못해 위 촬영지에 포함하지 않았습니다. 학교 내부 출입을 가정하지 말고, 전망대 접근에는 오르막·계단과 고르지 않은 노면이 있을 수 있으니 방문 전 경로를 확인하세요.',
      sources: '공식·현지 보도 출처'
    },
    en: {
      avenueTitle: 'Avenida de la Constitución · the street and its landmarks',
      photoAlt: 'Tram tracks and architecture on Avenida de la Constitución, Seville', photoCaption: 'User-provided photo · cropped for privacy',
      avenue: [
        ['The avenue', 'Avenida de la Constitución passes Seville Cathedral and the Archivo de Indias in the old town. City archives identify a former section as Calle Génova. The newspaper 20minutos reports closure to cars and pedestrianisation in 2006 and the Metrocentro opening in October 2007. Watch for trams on the tracks. The original traffic and pollution figures and claimed causal damage to the cathedral could not be verified.'],
        ['Christmas 2026 and the Giraldillo', 'In its 13 November 2026 announcement, the city planned 32 illuminated ornaments, 6.5 metres high, inspired by the Giraldillo, and a switch-on on 27 November. These figures differ from the original 35 and 9 metres; the city announcement does not confirm the colour or completion of installation. Check current arrangements before visiting. The Giraldillo is the bronze weather-vane figure atop the cathedral’s Giralda tower, designed by Luis de Vargas and cast by Bartolomé Morel, installed in 1568. This female figure represents victorious Faith and carries a palm branch and shield. Its present name came later, while the tower’s name Giralda derives from the weather vane.'],
        ['Iglesia del Sagrario', 'This parish church adjoins the cathedral: its cornerstone was laid in 1618 and it was completed in 1662. Its classical entrance contrasts with a richly Baroque interior. The cathedral describes a rectangular-plan interior with side chapels. The present high altarpiece combines Francisco Dionisio de Rivas’s structure, Pedro Roldán’s relief of the Descent from the Cross, and Valdés Leal’s polychromy. It was moved in 1840 from the Vizcaínos chapel of the former San Francisco convent. The exterior has three levels of pilasters and flame-shaped roof ornaments; the interior has a dome with a lantern. Eight stone figures of Church Fathers and Evangelists on the upper galleries are attributed to José de Arce in 1657. Check official visitor access.'],
        ['Town hall and the arquillo', 'The Casa Consistorial by Plaza de San Francisco is a civic building, not a church. Its 16th-century part, led by Diego de Riaño, is an important Plateresque example; 19th-century expansion added the Neoclassical Plaza Nueva façade. The arquillo, which connected the former convent, is attributed to Juan Sánchez; Hercules and Julius Caesar appear among the façade’s figures. Rooms include the Sala Capitular and Salón Colón. Check access before visiting. The NO8DO story about Alfonso X saying the city “did not abandon me” is a tradition; the city’s historical exhibit says there is no contemporary documentary evidence for it.'],
        ['20th-century buildings', 'Buildings on Seville’s regionalist architecture route include the Antonio González residential building at 24–26 (José Espiau, 1927–1929), Casa del Marqués de Villamarta at 14 (Aníbal González, 1915–1917), and La Adriática at 2 (José Espiau, 1914–1922). Look at the brickwork, decoration and contrasting façades. Confirm interior access separately.']
      ],
      dramaTitle: 'Memories of the Alhambra · verified Granada filming locations',
      dramaIntro: 'This curated selection of filming locations for the drama starring Hyun Bin and Park Shin-hye is supported by 2018 local reporting. It is not an exhaustive filming map. Specific scenes and camera positions were not verified.',
      dramaCaution: 'The Alhambra is important to the story, but filming on the palace site was not verified and it is not counted in the list above. Do not assume access inside the school. The viewpoint approach may involve slopes, steps and uneven surfaces: check the route before visiting.',
      sources: 'Official and local reporting'
    },
    ja: {
      avenueTitle: 'コンスティトゥシオン大通りと街並み（Avenida de la Constitución）',
      photoAlt: 'セビリアのコンスティトゥシオン大通りの路面電車と建築', photoCaption: '利用者提供写真・プライバシー保護のためトリミング',
      avenue: [
        ['通りの歴史', 'セビリア旧市街のAvenida de la Constituciónは大聖堂やインディアス古文書館のそばを通ります。市の記録によると、かつてCalle Génovaと呼ばれた区間があります。20minutosは2006年の車両通行止めと歩行者空間化、2007年10月のMetrocentro開業を報じています。線路上の路面電車に注意してください。原文の交通量・汚染数値と大聖堂の損傷との因果関係は検証できませんでした。'],
        ['2026年のクリスマスとヒラルディリョ', '市の2026年11月13日の発表では、ヒラルディリョを模した高さ6.5mの発光装飾32体を設置し、11月27日に点灯する予定です。原文の35体・9mとは異なり、色や全体の設置完了は公式発表では確認できません。訪問前に最新情報をご確認ください。ヒラルディリョは大聖堂のヒラルダ塔頂部にある青銅の風見像で、ルイス・デ・バルガスが設計し、バルトロメ・モレルが鋳造、1568年に設置されました。勝利した信仰を象徴する女性像で、棕櫚の枝と盾を持ちます。現在の像の名は後世のもので、塔の名ヒラルダは風見に由来します。'],
        ['サグラリオ教会（Iglesia del Sagrario）', '大聖堂に隣接するこの教区教会は1618年に礎石が置かれ、1662年に完成しました。古典的な入口に対し、内部には豊かなバロック装飾があります。大聖堂の公式案内は、側面礼拝堂を持つ長方形の内部構造を説明します。現在の主祭壇衝立はフランシスコ・ディオニシオ・デ・リバスの構造、ペドロ・ロルダンのキリスト降架の浮彫、バルデス・レアルの彩色からなり、旧サン・フランシスコ修道院のビスカイノス礼拝堂から1840年に移されました。外観には三層の壁柱と炎形の屋上装飾があり、内部には採光塔付きのドームがあります。上部の回廊の教父と福音記者の石像8体は、1657年のホセ・デ・アルセの作品として紹介されています。見学条件は公式案内で確認してください。'],
        ['市庁舎とアーチ（Arquillo）', 'サン・フランシスコ広場に面するCasa Consistorialは教会ではなく市庁舎です。ディエゴ・デ・リアーニョが主導した16世紀部分はプラテレスコ建築の重要な例で、19世紀の拡張ではヌエバ広場側に新古典主義の正面が加わりました。旧修道院をつないだアーチはフアン・サンチェス作とされ、正面にはヘラクレスとユリウス・カエサルの像があります。内部には議事堂やコロンの間などがあり、見学条件は事前に確認してください。都市の象徴NO8DOについて、アルフォンソ10世の「私を見捨てなかった」という話は伝承で、市の歴史展示は同時代の文書証拠がないと説明しています。'],
        ['20世紀の建築', 'セビリアの地域主義建築ルートには、Antonio Gonzálezの住宅24–26番地（ホセ・エスピアウ、1927～1929年）、ビジャマルタ侯爵邸14番地（アニバル・ゴンサレス、1915～1917年）、La Adriática 2番地（ホセ・エスピアウ、1914～1922年）があります。レンガや装飾、建物ごとの違いを眺めましょう。内部への立ち入りは別途確認してください。']
      ],
      dramaTitle: '『アルハンブラ宮殿の思い出』検証済み撮影地・グラナダ',
      dramaIntro: 'ヒョンビンとパク・シネ出演ドラマの撮影地から、2018年の現地報道で確認できる場所を選びました。撮影地の完全な一覧ではなく、特定の場面やカメラ位置は検証していません。',
      dramaCaution: 'アルハンブラ宮殿は物語の重要な舞台ですが、宮殿現地での撮影は確認できず、上の撮影地には含めていません。学校内部に入れるとは限りません。展望台への道は坂・階段・不均一な路面があり得るため、事前に経路をご確認ください。',
      sources: '公式情報・現地報道'
    },
    zh: {
      avenueTitle: '宪法大道与街景（Avenida de la Constitución）',
      photoAlt: '塞维利亚宪法大道上的有轨电车轨道和街道建筑', photoCaption: '用户提供的照片 · 已裁剪以保护隐私',
      avenue: [
        ['大道历史', '塞维利亚老城区的Avenida de la Constitución经过大教堂和西印度档案馆。市档案显示，过去部分路段称为Calle Génova。20minutos报道这里于2006年关闭汽车通行、改为步行区，Metrocentro于2007年10月开通。经过轨道时请注意有轨电车。原文中的车流、污染数值及其造成大教堂损伤的因果关系未能核实。'],
        ['2026年圣诞装饰与Giraldillo', '市政府2026年11月13日宣布，计划安装32个高6.5米、以Giraldillo为灵感的发光装饰，并于11月27日亮灯。这与原文的35个、9米不同；官方公告未确认颜色或全部安装完毕。到访前请查看最新安排。Giraldillo是大教堂希拉尔达塔顶部的青铜风向标雕像，由路易斯·德·巴尔加斯设计、巴托洛梅·莫雷尔铸造，于1568年安装。这一女性形象象征胜利的信仰，手持棕榈枝和盾牌。雕像现在的名称是后世称呼，塔名Giralda源自风向标。'],
        ['圣体堂（Iglesia del Sagrario）', '这座毗邻大教堂的堂区教堂于1618年奠基、1662年完工。古典式入口与内部丰富的巴洛克装饰形成对比。大教堂官方资料将内部描述为两侧设有小礼拜堂的长方形结构。现存主祭坛屏由弗朗西斯科·迪奥尼西奥·德·里瓦斯设计结构、佩德罗·罗尔丹雕刻基督下十字架浮雕、巴尔德斯·莱亚尔施彩；1840年从原圣弗朗西斯科修道院的比斯开人礼拜堂迁入。外部有三层壁柱和火焰形屋顶装饰，内部有带采光塔的穹顶。上方回廊的八尊教父和福音书作者石像被介绍为何塞·德·阿尔塞1657年的作品。参观前请核实官方开放信息。'],
        ['市政厅与小拱门', '圣弗朗西斯科广场旁的Casa Consistorial是市政建筑，而不是教堂。迭戈·德·里亚尼奥主导的16世纪部分是重要的银匠式建筑实例，19世纪扩建增添了面向新广场的新古典主义立面。曾连接旧修道院的小拱门归属于胡安·桑切斯，立面人物包括赫拉克勒斯和尤利乌斯·凯撒。内部有议事厅和哥伦布厅等，入内条件请事先确认。有关城市标志NO8DO及阿方索十世“她没有抛弃我”的故事是传说；市历史展称缺乏同时代文献证据。'],
        ['20世纪建筑', '塞维利亚地方主义建筑路线包括24–26号Antonio González住宅（何塞·埃斯皮奥，1927–1929年）、14号比利亚马尔塔侯爵住宅（阿尼瓦尔·冈萨雷斯，1915–1917年）和2号La Adriática（何塞·埃斯皮奥，1914–1922年）。可留意砖砌与装饰，以及不同建筑立面的差异。内部是否开放需另行确认。']
      ],
      dramaTitle: '《阿尔罕布拉宫的回忆》· 格拉纳达核实过的拍摄地',
      dramaIntro: '以下精选由玄彬与朴信惠主演的电视剧拍摄地，均有2018年当地报道支持。这不是完整拍摄地图，也未核实具体场景或摄影机位置。',
      dramaCaution: '阿尔罕布拉宫是故事中的重要地点，但未能证实宫殿现场拍摄，因此不计入以上拍摄地。不要假定可以进入学校内部；前往观景台的道路可能有坡道、台阶与不平路面，请提前确认路线。',
      sources: '官方资料与当地报道'
    }
  };
  var AVENUE_SOURCES = [
    ['Seville Cathedral · access / El Sagrario', 'https://www.catedraldesevilla.es/la-catedral/edificio/los-anadidos-barrocos-el-sagrario/'],
    ['Seville Cathedral · history of the Giralda (PDF)', 'https://www.catedraldesevilla.es/wp-content/uploads/2017/05/cuaderno-del-profesor-catedral.pdf'],
    ['Seville municipal archives · Calle Génova', 'https://www.sevilla.org/no8do-digital/expo-no8do/espana-ilustrada-hauser-y-menet/imagenes'],
    ['Fundación Iberdrola · El Sagrario restoration study (PDF)', 'https://static.fundacioniberdrolaespana.org/fundacioniberdrola/wp-content/uploads/sagrario-santa-iglesia-catedral-sevilla-cuadernos-restauracion-recuperacion-publicaciones-fundacioniberdrola-espana.pdf'],
    ['Seville City · Christmas 2026', 'https://www.sevilla.org/actualidad/noticias/2026/los-primeros-giraldillos-de-la-navidad-llegan-a-la-avenida-de-la-constitucion'],
    ['Andalusia Archives · Giraldillo', 'https://www.juntadeandalucia.es/organismos/culturapatrimoniohistoricoydeporte/servicios/actualidad/noticias/detalle/387250.html'],
    ['Seville City · Casa Consistorial', 'https://www.sevilla.org/ciudad/sevilla-ciudad-patrimonial/casa-consistorial'],
    ['IAPH · Ayuntamiento', 'https://guiadigital.iaph.es/sys/productos/Velazquez/velazquezSevilla/laCiudad/granCiudad/ayuntamiento.html'],
    ['Seville City · NO8DO', 'https://www.sevilla.org/no8do-digital/expo-no8do/el-nomadejado-el-simbolo-de-la-ciudad-de-sevilla'],
    ['Visit Sevilla · architecture guide (PDF)', 'https://tic.visitasevilla.es/vsev/web_php/imatges/guias/9686253e7ae8e41d000974671.pdf'],
    ['COACan · Antonio González', 'https://patrimonio.coacan.es/casa-de-viviendas-para-antonio-gonzalez/'],
    ['20minutos · avenue pedestrianisation', 'https://www.20minutos.es/noticia/4659895/0/avenida-constitucion-cumple-15-anos-libre-coches-humo/'],
    ['University of Almería · José de Arce sculptures', 'https://www2.ual.es/ideimand/jose-de-arce-o-de-aerst-escultor-flandes-c-1607-sevilla-1666/'],
    ['Sevillaxm2 · El Sagrario architecture', 'https://sevillaxm2.com/iglesia-del-sagrario/']
  ];
  var DRAMA_SOURCES = [
    ['Europa Press · Granada filming', 'https://www.europapress.es/andalucia/noticia-granada-acoge-rodaje-serie-coreana-recuerdos-alhambra-equipo-mas-200-personas-20180529141405.html'],
    ['El Mundo · filming locations', 'https://www.elmundo.es/andalucia/2018/05/29/5b0daa9f46163f75478b45f5.html'],
    ['El Independiente de Granada · Puente Espinosa', 'https://www.elindependientedegranada.es/cultura/ciudad-acoge-rodaje-serie-coreana-recuerdos-alhambra-con-equipo-mas-200-personas'],
    ['Granada Hoy · locations', 'https://www.granadahoy.com/ocio/Alhambra-Netflix-Recuerdos-serie-video_0_1303969845.html'],
    ['National Geographic · story setting', 'https://www.nationalgeographic.com/travel/article/korean-tv-series-filming-locations']
  ];
  var SOURCE_LABELS = {
    ko: [
      ['세비야 대성당 · 사그라리오 성당', '세비야 대성당 · 히랄다 역사 (PDF)', '세비야 시 기록관 · Calle Génova', '이베르드롤라 재단 · 사그라리오 복원 연구 (PDF)', '세비야 시청 · 2026년 크리스마스', '안달루시아 기록관 · 히랄디요', '세비야 시청 · 시청사', '안달루시아 유산연구소 · 시청사', '세비야 시청 · NO8DO', '세비야 관광청 · 건축 가이드 (PDF)', '건축가협회 · 안토니오 곤살레스 건물', '20minutos · 거리 보행자화', '알메리아대학교 · 호세 데 아르세 조각', 'Sevillaxm2 · 사그라리오 건축'],
      ['Europa Press · 그라나다 촬영', 'El Mundo · 촬영지', 'El Independiente de Granada · 에스피노사 다리', 'Granada Hoy · 촬영지', 'National Geographic · 작품의 배경']
    ],
    en: [AVENUE_SOURCES.map(function (s) { return s[0]; }), DRAMA_SOURCES.map(function (s) { return s[0]; })],
    ja: [
      ['セビリア大聖堂 · サグラリオ教会', 'セビリア大聖堂 · ヒラルダの歴史（PDF）', 'セビリア市文書館 · Calle Génova', 'イベルドローラ財団 · 修復研究（PDF）', 'セビリア市 · 2026年クリスマス', 'アンダルシア文書館 · ヒラルディリョ', 'セビリア市 · 市庁舎', 'アンダルシア歴史遺産研究所 · 市庁舎', 'セビリア市 · NO8DO', 'セビリア観光局 · 建築ガイド（PDF）', '建築家協会 · Antonio González住宅', '20minutos · 歩行者空間化', 'アルメリア大学 · ホセ・デ・アルセの彫刻', 'Sevillaxm2 · サグラリオの建築'],
      ['Europa Press · グラナダ撮影', 'El Mundo · 撮影地', 'El Independiente de Granada · エスピノサ橋', 'Granada Hoy · 撮影地', 'National Geographic · 物語の舞台']
    ],
    zh: [
      ['塞维利亚大教堂 · 圣体堂', '塞维利亚大教堂 · 希拉尔达历史（PDF）', '塞维利亚市档案馆 · Calle Génova', '伊贝德罗拉基金会 · 修复研究（PDF）', '塞维利亚市政府 · 2026年圣诞节', '安达卢西亚档案馆 · Giraldillo', '塞维利亚市政府 · 市政厅', '安达卢西亚历史遗产研究所 · 市政厅', '塞维利亚市政府 · NO8DO', '塞维利亚旅游局 · 建筑指南（PDF）', '建筑师协会 · Antonio González住宅', '20minutos · 大道步行化', '阿尔梅里亚大学 · 何塞·德·阿尔塞雕塑', 'Sevillaxm2 · 圣体堂建筑'],
      ['Europa Press · 格拉纳达拍摄', 'El Mundo · 拍摄地', 'El Independiente de Granada · 埃斯皮诺萨桥', 'Granada Hoy · 拍摄地', 'National Geographic · 故事背景']
    ]
  };
  var LOCATIONS = ['Calle Correo Viejo', 'Calle Calderería Nueva', 'Mirador de San Miguel Alto', 'Puente Espinosa', 'Colegio Ave María', 'Fuente de las Granadas'];
  function lang(value) { var x = String(value || '').toLowerCase().split(/[-_]/)[0]; return LANGS.indexOf(x) >= 0 ? x : 'en'; }
  function esc(v) { return String(v).replace(/[&<>"']/g, function (c) { return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]; }); }
  function links(sources, l) { var labels = SOURCE_LABELS[lang(l)][sources === AVENUE_SOURCES ? 0 : 1]; return sources.map(function (s, i) { return '<li><a href="' + esc(s[1]) + '" target="_blank" rel="noopener noreferrer">' + esc(labels[i]) + '</a></li>'; }).join(''); }
  function avenueBody(d) { return d.avenue.map(function (p) { return '<p><strong>' + esc(p[0]) + '.</strong> ' + esc(p[1]) + '</p>'; }).join(''); }
  function dramaBody(d) { return '<p>' + esc(d.dramaIntro) + '</p><ul>' + LOCATIONS.map(function (p) { return '<li>' + esc(p) + '</li>'; }).join('') + '</ul><p>' + esc(d.dramaCaution) + '</p>'; }
  function addAvenue(l) {
    var target = document.querySelector('#seville-general-guide .sg-guide'); if (!target) return;
    var d = DATA[lang(l)], details = document.createElement('details');
    details.className = 'sg-guide-topic'; details.id = 'sg-avenida-constitucion';
    details.innerHTML = '<summary>' + esc(d.avenueTitle) + '</summary><div class="sg-guide-content"><figure class="sg-guide-photo"><img src="img/user-seville-landmarks/avenida-constitucion-20261118.webp" alt="' + esc(d.photoAlt) + '" loading="lazy" decoding="async"><figcaption>' + esc(d.photoCaption) + '</figcaption></figure>' + avenueBody(d) + '<p><strong>' + esc(d.sources) + '</strong></p><ul class="sg-guide-sources">' + links(AVENUE_SOURCES, l) + '</ul></div>';
    var old = target.querySelector('#sg-avenida-constitucion'); if (old) old.remove();
    var first = target.querySelector('.sg-guide-topic'); target.insertBefore(details, first);
  }
  function addDrama(l) {
    var group = document.querySelector('#granada-malaga-general-guide .gm-guide-group'); if (!group) return;
    var d = DATA[lang(l)], details = document.createElement('details');
    details.className = 'gm-guide-topic'; details.id = 'gm-memories-alhambra';
    details.innerHTML = '<summary>' + esc(d.dramaTitle) + '</summary><div class="gm-guide-topic-content">' + dramaBody(d) + '<p><strong>' + esc(d.sources) + '</strong></p><ul class="gm-guide-sources">' + links(DRAMA_SOURCES, l) + '</ul></div>';
    var old = group.querySelector('#gm-memories-alhambra'); if (old) old.remove();
    group.insertBefore(details, group.querySelector('.gm-guide-topic'));
  }
  var previousSevilleRender = window.renderSevilleGeneralGuide;
  window.renderSevilleGeneralGuide = function (l) { var result = previousSevilleRender.apply(this, arguments); if (result) addAvenue(l); return result; };
  var previousGranadaRender = window.renderGranadaMalagaGeneralGuide;
  window.renderGranadaMalagaGeneralGuide = function (l) { var result = previousGranadaRender.apply(this, arguments); if (result) addDrama(l); return result; };
  function excluded(q) { return /(?:\b(?:itinerary|schedule|booking|reservation|flight|airport|hotel|route|directions|transit|transport|bus|taxi|train|ticket|tomorrow|today|how to reach|how do i get|how can i reach|get to)\b|숙소|항공|비행|공항|예약|일정|동선|경로|교통|이동|버스|기차|택시|오늘|내일|가는 방법|어떻게 가|찾아가는 길|行程|日程|予約|交通|経路|移動|タクシー|ホテル|行き方|どうやって行|今天|明天|预订|路线|酒店|如何前往|怎么去|\b20\d\d\b|\b\d{1,2}:\d{2}\b)/i.test(q); }
  var previousSevilleChat = window.buildSevilleGeneralChatResponse;
  window.buildSevilleGeneralChatResponse = function (q, l) {
    q = String(q || '');
    if (!excluded(q) && /(?:avenida de la constituci[oó]n|헌법 대로|コンスティトゥシオン大通り|宪法大道|giraldillo|히랄디요|ヒラルディリョ|サグラリオ教会|sagrario|사그라리오 성당|圣体堂|arquillo del ayuntamiento)/i.test(q)) {
      var d = DATA[lang(l)]; return '<strong>' + esc(d.avenueTitle) + '</strong><br>' + avenueBody(d) + '<br>' + esc(d.sources) + ':<ul>' + links(AVENUE_SOURCES, l) + '</ul>';
    }
    return previousSevilleChat.apply(this, arguments);
  };
  var previousGranadaChat = window.buildGranadaMalagaGeneralChatResponse;
  window.buildGranadaMalagaGeneralChatResponse = function (q, l) {
    q = String(q || '');
    if (!excluded(q) && /(?:memories of the alhambra|recuerdos de la alhambra|알함브라 궁전의 추억|アルハンブラ宮殿の思い出|阿尔罕布拉宫的回忆)/i.test(q)) {
      var d = DATA[lang(l)]; return '<strong>' + esc(d.dramaTitle) + '</strong><br>' + dramaBody(d) + '<br>' + esc(d.sources) + ':<ul>' + links(DRAMA_SOURCES, l) + '</ul>';
    }
    return previousGranadaChat.apply(this, arguments);
  };
}());
