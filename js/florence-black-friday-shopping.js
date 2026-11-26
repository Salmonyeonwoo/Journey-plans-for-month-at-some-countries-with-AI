/* Florence Black Friday shopping guide: eight product ideas with local photos,
 * official product/store links, and translated copy for the site's four locales.
 * Mounted after the last Florence itinerary card; no purchase or sale is implied. */
(function (root) {
  'use strict';

  var ID = 'florence-black-friday-shopping';
  var LANGS = ['ko', 'en', 'zh', 'ja'];
  var CITY_NAMES = ['피렌체', 'Florence', '佛罗伦萨', 'フィレンツェ'];
  var PRODUCTS = [
    {
      id: 'furla', category: 'bag', image: 'assets/florence-black-friday/furla.jpg',
      productUrl: 'https://www.furla.com/cn/zh/eshop/furla-1927-BAFKACOARE0001007B4L00.html',
      storeUrl: 'https://www.barberinooutlet.com/en/store/furla/',
      copy: {
        ko: { name: 'Furla(훌라) 1927 Crossbody MINI 미니 크로스바디 백', alt: 'Furla 1927 미니 크로스바디 백 제품 사진', description: '작은 필수품 위주로 가볍게 들기 좋은 컴팩트한 크로스바디. 조사한 공식 페이지의 해당 사양은 19.5 × 12 × 7cm입니다. 이탈리아 아울렛의 판매 여부나 가격을 뜻하지 않으므로, 방문 전 매장에 모델·색상·재고를 확인하세요.', standout: '작고 정돈된 형태를 찾는 분께 — 모델 코드 BAFKACO_ARE000_1007_B4L00를 참고하세요.', location: 'Barberino Designer Outlet의 Furla 매장 안내' },
        en: { name: 'Furla 1927 Crossbody MINI', alt: 'Product photograph of the Furla 1927 mini crossbody bag', description: 'A compact crossbody for a few everyday essentials. The researched official product page lists dimensions of 19.5 × 12 × 7 cm for that version. This does not confirm Italian outlet availability or pricing; ask the store about the model, color, and stock before visiting.', standout: 'A neat, small-format option; use style code BAFKACO_ARE000_1007_B4L00 as a reference.', location: 'Furla store information at Barberino Designer Outlet' },
        zh: { name: 'Furla（芙拉）1927 Crossbody MINI 迷你斜挎包', alt: 'Furla 1927迷你斜挎包产品照片', description: '适合携带少量日常必需品的紧凑型斜挎包。所查阅的官方商品页列出的该款尺寸为19.5 × 12 × 7厘米。这不代表意大利奥特莱斯有售或有特定价格；出发前请向门店确认款号、颜色和库存。', standout: '适合喜欢小巧利落款式的人；可用款号 BAFKACO_ARE000_1007_B4L00 作参考。', location: 'Barberino Designer Outlet 的 Furla 门店信息' },
        ja: { name: 'Furla（フルラ）1927 Crossbody MINI ミニクロスボディバッグ', alt: 'Furla 1927 ミニクロスボディバッグの商品写真', description: '日常の必需品を少量持ち歩くのに向くコンパクトなクロスボディです。調査した公式商品ページでは、この仕様のサイズは19.5 × 12 × 7 cmと記載されています。イタリアのアウトレットでの販売や価格を示すものではありません。訪問前に型番・色・在庫を店舗へ確認してください。', standout: '小ぶりですっきりした形を探す方に。型番 BAFKACO_ARE000_1007_B4L00 が参考になります。', location: 'Barberino Designer Outlet の Furla 店舗案内' }
      }
    },
    {
      id: 'michael-kors', category: 'bag', image: 'assets/florence-black-friday/michael-kors.jpg',
      productUrl: 'https://www.michaelkors.com/jet-set-travel-large-3-in-1-signature-logo-tote-bag/35T6STVT7B.html',
      storeUrl: 'https://www.barberinooutlet.com/en/store/michael-kors/',
      copy: {
        ko: { name: 'Michael Kors(마이클 코어스) Jet Set Travel Large 3-in-1 Signature Logo Tote Bag 대형 3-in-1 로고 토트백', alt: 'Michael Kors Jet Set Travel 3-in-1 로고 토트백 제품 사진', description: '토트백, 분리형 크로스바디 파우치, 지갑으로 구성된 3-in-1 스타일입니다. 공식 설명은 태블릿과 여행 서류, 일상 필수품 수납을 언급하며 노트북 전용 가방이라고 보장하지 않습니다.', standout: '여러 수납 구성을 한 세트로 원하는 분께. 스타일 번호 35T6STVT7B를 매장 문의에 활용하세요.', location: 'Barberino Designer Outlet의 Michael Kors 매장 안내' },
        en: { name: 'Michael Kors Jet Set Travel Large 3-in-1 Signature Logo Tote Bag', alt: 'Product photograph of the Michael Kors Jet Set Travel 3-in-1 logo tote', description: 'A three-piece setup with a tote, a detachable crossbody pouch, and a wallet. The official description mentions a tablet, travel documents, and daily essentials; it does not promise a dedicated laptop compartment.', standout: 'For someone who likes multiple carry options in one set. Ask about style 35T6STVT7B.', location: 'Michael Kors store information at Barberino Designer Outlet' },
        zh: { name: 'Michael Kors（迈克高仕）Jet Set Travel Large 3-in-1 Signature Logo Tote Bag 大号三合一标志托特包', alt: 'Michael Kors Jet Set Travel三合一标志托特包产品照片', description: '三件组合包括托特包、可拆卸斜挎小包和钱包。官方介绍提到可放平板电脑、旅行文件和日常用品；并未承诺设有专用笔记本电脑隔层。', standout: '适合希望一套拥有多种携带方式的人。可向门店询问款号35T6STVT7B。', location: 'Barberino Designer Outlet 的 Michael Kors 门店信息' },
        ja: { name: 'Michael Kors（マイケル・コース）Jet Set Travel Large 3-in-1 Signature Logo Tote Bag 大型3-in-1ロゴトートバッグ', alt: 'Michael Kors Jet Set Travel 3-in-1ロゴトートの商品写真', description: 'トート、取り外し可能なクロスボディポーチ、財布の3点セットです。公式説明ではタブレット、旅行書類、日常の必需品に触れていますが、ノートパソコン専用の収納を保証するものではありません。', standout: 'ひとつのセットで複数の持ち方を求める方に。型番35T6STVT7Bを店舗への問い合わせにお使いください。', location: 'Barberino Designer Outlet の Michael Kors 店舗案内' }
      }
    },
    {
      id: 'ferragamo', category: 'bag', image: 'assets/florence-black-friday/ferragamo.jpg',
      productUrl: 'https://www.ferragamo.com/shop/us/en/women/handbags/minibags/hug-mini-768850',
      storeUrl: 'https://firenze.themall.it/en/brands/salvatore-ferragamo',
      copy: {
        ko: { name: 'Ferragamo(페라가모) Hug handbag (XS) XS 핸드백', alt: 'Ferragamo Hug XS 핸드백 제품 사진', description: '컴팩트한 가죽 백으로, 양쪽 스트랩 디테일과 골든 Gancini 버클, 탈착형 숄더 스트랩이 특징입니다. 조사한 공식 페이지의 크기는 14 × 22.4 × 10.9cm이며, 제품 버전에 따라 세부 사양이 다를 수 있습니다.', standout: '구조감 있는 작은 가죽 백을 찾는 분께. 코드 215975 768850을 확인하세요.', location: 'The Mall Firenze의 Salvatore Ferragamo 브랜드 안내' },
        en: { name: 'Ferragamo Hug handbag (XS)', alt: 'Product photograph of the Ferragamo Hug XS handbag', description: 'A compact leather bag with side strap details, a gold Gancini buckle, and a detachable shoulder strap. The researched official page lists dimensions of 14 × 22.4 × 10.9 cm; specifications may vary by version.', standout: 'For someone looking for a small, structured leather bag. Reference code 215975 768850.', location: 'Salvatore Ferragamo brand information at The Mall Firenze' },
        zh: { name: 'Ferragamo（菲拉格慕）Hug handbag (XS) XS号手提包', alt: 'Ferragamo Hug XS手提包产品照片', description: '小巧皮革包，带有两侧肩带细节、金色Gancini扣和可拆卸肩带。所查阅的官方页面列出的尺寸为14 × 22.4 × 10.9厘米；不同版本的规格可能不同。', standout: '适合寻找小巧、廓形挺括皮包的人。参考编号215975 768850。', location: 'The Mall Firenze 的 Salvatore Ferragamo 品牌信息' },
        ja: { name: 'Ferragamo（フェラガモ）Hug handbag (XS) XSハンドバッグ', alt: 'Ferragamo Hug XSハンドバッグの商品写真', description: 'サイドのストラップディテール、ゴールドのGanciniバックル、取り外し可能なショルダーストラップを備えたコンパクトなレザーバッグです。調査した公式ページのサイズ表記は14 × 22.4 × 10.9 cm。仕様はモデルにより異なる場合があります。', standout: '小さくても形のしっかりしたレザーバッグを探す方に。品番215975 768850を参考にしてください。', location: 'The Mall Firenze の Salvatore Ferragamo ブランド案内' }
      }
    },
    {
      id: 'gucci', category: 'bag', image: 'assets/florence-black-friday/gucci.jpg',
      productUrl: 'https://www.gucci.com/us/en/pr/women/handbags/crossbody-bags-for-women/ophidia-small-shoulder-bag-p-735132FABLE9442',
      storeUrl: 'https://firenze.themall.it/en/brands/gucci',
      copy: {
        ko: { name: 'Gucci(구찌) Ophidia small shoulder bag 스몰 숄더백', alt: 'Gucci Ophidia 스몰 숄더백 제품 사진', description: 'GG 패턴 캔버스, 녹색·적색 Web 디테일, Double G 하드웨어가 돋보이는 숄더백입니다. 공식 페이지 제품 코드 735132 FABLE 9442를 기준으로 하며, 소재·크기·구성은 현지에서 판매되는 버전을 확인하세요.', standout: '브랜드의 상징적인 GG와 Web 요소를 찾는 분께.', location: 'The Mall Firenze의 Gucci 브랜드 안내' },
        en: { name: 'Gucci Ophidia small shoulder bag', alt: 'Product photograph of the Gucci Ophidia small shoulder bag', description: 'A shoulder bag featuring GG-pattern canvas, green-and-red Web detail, and Double G hardware. The researched official page is style 735132 FABLE 9442; confirm the materials, dimensions, and configuration of any local version.', standout: 'For someone drawn to the house’s recognizable GG and Web details.', location: 'Gucci brand information at The Mall Firenze' },
        zh: { name: 'Gucci（古驰）Ophidia small shoulder bag 小号肩背包', alt: 'Gucci Ophidia小号肩背包产品照片', description: '肩背包采用GG图案帆布、红绿织带细节和Double G五金。所查阅的官方商品页款号为735132 FABLE 9442；请以当地实际销售版本为准核对材质、尺寸和配置。', standout: '适合喜欢品牌标志性GG与织带元素的人。', location: 'The Mall Firenze 的 Gucci 品牌信息' },
        ja: { name: 'Gucci（グッチ）Ophidia small shoulder bag スモールショルダーバッグ', alt: 'Gucci Ophidia スモールショルダーバッグの商品写真', description: 'GGパターンのキャンバス、グリーン・レッドのWebディテール、Double Gハードウェアが特徴のショルダーバッグです。調査した公式ページの型番は735132 FABLE 9442。現地で販売されるモデルの素材・サイズ・仕様を確認してください。', standout: 'ブランドを象徴するGGやWebのディテールが好きな方に。', location: 'The Mall Firenze の Gucci ブランド案内' }
      }
    },
    {
      id: 'bottega', category: 'bag', image: 'assets/florence-black-friday/bottega.jpg',
      productUrl: 'https://www.bottegaveneta.com/en-us/the-mini-jodie-nero-651876VCPP58803.html',
      storeUrl: 'https://firenze.themall.it/en/brands/bottega-veneta',
      copy: {
        ko: { name: 'Bottega Veneta(보테가 베네타) The Mini Jodie 미니 백', alt: 'Bottega Veneta Mini Jodie 가방 제품 사진', description: '둥근 실루엣, 인트레치아토 가죽 짜임과 매듭 디테일의 상단 핸들이 특징인 미니 백입니다. 조사한 공식 페이지는 Nero 색상, 스타일 651876VCPP58803을 안내합니다.', standout: '로고보다 가죽의 질감과 형태를 강조한 가방을 선호하는 분께.', location: 'The Mall Firenze의 Bottega Veneta 브랜드 안내' },
        en: { name: 'Bottega Veneta The Mini Jodie', alt: 'Product photograph of the Bottega Veneta Mini Jodie bag', description: 'A mini bag with a rounded silhouette, an intrecciato leather upper handle, and a signature knot detail. The researched official page shows Nero, style 651876VCPP58803.', standout: 'For someone who prefers leather texture and shape over prominent logos.', location: 'Bottega Veneta brand information at The Mall Firenze' },
        zh: { name: 'Bottega Veneta（葆蝶家）The Mini Jodie 迷你包', alt: 'Bottega Veneta Mini Jodie迷你包产品照片', description: '迷你包采用圆润廓形、Intrecciato编织皮革手柄和标志性结饰。所查阅的官方页面展示Nero黑色款，款号651876VCPP58803。', standout: '适合偏爱皮革质感与廓形、而非醒目Logo的人。', location: 'The Mall Firenze 的 Bottega Veneta 品牌信息' },
        ja: { name: 'Bottega Veneta（ボッテガ・ヴェネタ）The Mini Jodie ミニバッグ', alt: 'Bottega Veneta Mini Jodieバッグの商品写真', description: '丸みのあるシルエット、イントレチャートレザーのトップハンドル、シグネチャーのノットディテールが特徴のミニバッグです。調査した公式ページにはNero、品番651876VCPP58803が掲載されています。', standout: '大きなロゴより、レザーの質感やフォルムを重視する方に。', location: 'The Mall Firenze の Bottega Veneta ブランド案内' }
      }
    },
    {
      id: 'ralph-lauren', category: 'apparel', image: 'assets/florence-black-friday/ralph-lauren.jpg',
      productUrl: 'https://www.ralphlauren.com/men-clothing-sweaters/cable-knit-cotton-sweater/515061.html',
      storeUrl: 'https://www.barberinooutlet.com/en/store/ralph-lauren/',
      copy: {
        ko: { name: 'Polo Ralph Lauren(폴로 랄프 로렌) Cable-Knit Cotton Sweater 케이블 니트 코튼 스웨터', alt: 'Polo Ralph Lauren 케이블 니트 코튼 스웨터 제품 사진', description: '면 100% 케이블 니트 스웨터로, 레귤러 핏과 왼쪽 가슴 Pony 자수가 특징입니다. 선물용이면 평소 입는 옷과 핏·사이즈표를 비교하고, 교환·반품 조건을 확인하세요.', standout: '클래식한 니트 선물 아이디어. 스타일 515061을 참고하세요.', location: 'Barberino Designer Outlet의 Ralph Lauren 매장 안내' },
        en: { name: 'Polo Ralph Lauren Cable-Knit Cotton Sweater', alt: 'Product photograph of the Polo Ralph Lauren cable-knit cotton sweater', description: 'A 100% cotton cable-knit sweater with a regular fit and embroidered Pony at the left chest. For a gift, compare the recipient’s usual fit and the size chart, and check exchange and return terms.', standout: 'A classic knitwear gift idea. Reference style 515061.', location: 'Ralph Lauren store information at Barberino Designer Outlet' },
        zh: { name: 'Polo Ralph Lauren（拉夫劳伦）Cable-Knit Cotton Sweater 绞花针织棉毛衣', alt: 'Polo Ralph Lauren绞花针织棉毛衣产品照片', description: '100%棉绞花针织毛衣，常规版型，左胸有Pony刺绣。作为礼物购买时，请对照收礼人的常穿版型和尺码表，并确认换货、退货条件。', standout: '经典针织礼物选择。参考款号515061。', location: 'Barberino Designer Outlet 的 Ralph Lauren 门店信息' },
        ja: { name: 'Polo Ralph Lauren（ポロ ラルフ ローレン）Cable-Knit Cotton Sweater ケーブルニットコットンセーター', alt: 'Polo Ralph Laurenケーブルニットコットンセーターの商品写真', description: '綿100％のケーブルニットセーター。レギュラーフィットで、左胸にPony刺繍があります。贈り物なら普段のフィット感とサイズ表を照らし合わせ、交換・返品条件も確認してください。', standout: '定番のニットギフト案。品番515061を参考にしてください。', location: 'Barberino Designer Outlet の Ralph Lauren 店舗案内' }
      }
    },
    {
      id: 'north-face', category: 'apparel', image: 'assets/florence-black-friday/north-face.jpg',
      productUrl: 'https://www.thenorthface.com/it-it/p/uomo-211701/giacca-retro-nuptse-1996-da-uomo-NF0A3C8D',
      storeUrl: 'https://www.barberinooutlet.com/en/store/the-north-face/',
      copy: {
        ko: { name: 'The North Face(노스페이스) insulated outerwear (1996 Retro Nuptse as an example) 보온 아우터', alt: 'The North Face 보온 아우터 제품 사진', description: '겨울용 보온 아우터를 비교할 때 참고할 브랜드 예시입니다. 1996 Retro Nuptse는 공식 이탈리아 페이지에 700-fill RDS 다운과 접어 넣을 수 있는 수납 기능 등이 안내되어 있지만, Barberino 매장의 특정 모델·사이즈 재고를 뜻하지 않습니다. 보온재 종류와 관리법도 살펴보세요.', standout: '따뜻함과 휴대·수납 편의성을 함께 비교해 보고 싶은 분께.', location: 'Barberino Designer Outlet의 The North Face 매장 안내' },
        en: { name: 'The North Face insulated outerwear (1996 Retro Nuptse as an example)', alt: 'Product photograph of The North Face insulated outerwear', description: 'A brand example to consider when comparing winter outerwear. The official Italian page for the 1996 Retro Nuptse describes 700-fill RDS down and packable storage, but this does not establish that a particular model or size is in stock at Barberino. Check insulation type and care instructions too.', standout: 'For comparing warmth alongside packability and storage.', location: 'The North Face store information at Barberino Designer Outlet' },
        zh: { name: 'The North Face（北面）insulated outerwear (1996 Retro Nuptse as an example) 保暖外套', alt: 'The North Face保暖外套产品照片', description: '比较冬季外套时可参考的品牌示例。意大利官方页面介绍1996 Retro Nuptse采用700蓬RDS认证羽绒并可收纳，但这并不表示Barberino门店有特定款式或尺码库存。也请查看填充物类型和护理说明。', standout: '适合想同时比较保暖性、便携性与收纳方式的人。', location: 'Barberino Designer Outlet 的 The North Face 门店信息' },
        ja: { name: 'The North Face（ザ・ノース・フェイス）insulated outerwear (1996 Retro Nuptse as an example) 保温アウター', alt: 'The North Faceの保温アウターの商品写真', description: '冬用アウターを比較する際のブランド例です。1996 Retro Nuptseのイタリア公式ページには700フィルパワーのRDSダウンや収納可能な仕様が記載されていますが、Barberino店で特定モデル・サイズの在庫があるという意味ではありません。中綿の種類や手入れ方法も確認しましょう。', standout: '暖かさに加え、携帯性や収納性も比べたい方に。', location: 'Barberino Designer Outlet の The North Face 店舗案内' }
      }
    },
    {
      id: 'nike', category: 'shoes', image: 'assets/florence-black-friday/nike.jpg',
      productUrl: 'https://www.nike.com/t/air-force-1-07-mens-shoes-DZejrQoC',
      storeUrl: 'https://www.nike.com/id/retail/s/barberino-nike-factory-store',
      copy: {
        ko: { name: "Nike(나이키) everyday sneakers (Air Force 1 '07 as an example) 일상용 스니커즈", alt: "Nike Air Force 1 '07 스니커즈 제품 사진", description: '일상용 스니커즈를 찾을 때 참고할 만한 대표 모델 예시입니다. 공식 설명에는 가죽 갑피, 쿠셔닝, 고무 밑창이 안내되어 있습니다. 발볼과 사이즈는 직접 착화해 확인하고, 이 모델이 Barberino 매장에 있다는 뜻은 아닙니다.', standout: '활용도 높은 클래식 스타일을 찾는 분께. 매장에는 현재 입고된 모델과 사이즈를 문의하세요.', location: 'Nike Barberino Factory Store 안내' },
        en: { name: "Nike everyday sneakers (Air Force 1 '07 as an example)", alt: "Product photograph of Nike Air Force 1 '07 sneakers", description: 'A familiar model to use as a reference when looking for everyday sneakers. The official description lists a leather upper, cushioning, and a rubber outsole. Try the fit and width in person; this does not mean this model is stocked at the Barberino store.', standout: 'For someone seeking a versatile classic. Ask the store which models and sizes it currently carries.', location: 'Nike Barberino Factory Store information' },
        zh: { name: "Nike（耐克）everyday sneakers (Air Force 1 '07 as an example) 日常运动鞋", alt: "Nike Air Force 1 '07运动鞋产品照片", description: '寻找日常运动鞋时可参考的经典款。官方介绍列出皮革鞋面、缓震和橡胶外底。请现场试穿确认脚型与尺码；这并不表示Barberino门店有售该款。', standout: '适合寻找百搭经典鞋款的人。请向门店询问目前销售的型号和尺码。', location: 'Nike Barberino Factory Store 门店信息' },
        ja: { name: "Nike（ナイキ）everyday sneakers (Air Force 1 '07 as an example) 普段使いスニーカー", alt: "Nike Air Force 1 '07スニーカーの商品写真", description: '普段使いのスニーカーを探す際の参考モデルです。公式説明にはレザーアッパー、クッショニング、ラバーアウトソールが記載されています。幅やサイズは実際に試着して確認してください。Barberino店にこのモデルがあるという意味ではありません。', standout: '合わせやすい定番を探す方に。店舗で現在の取扱モデルとサイズを確認してください。', location: 'Nike Barberino Factory Store の店舗案内' }
      }
    }
  ];

  var COPY = {
    ko: {
      title: '피렌체 블랙 프라이데이 쇼핑 가이드', subtitle: '핸드백 5가지와 의류·아우터·스니커즈 3가지 — 제품 사진과 공식 참고 링크를 함께 소개합니다.',
      dateTitle: '2026년 날짜와 유래', date: '미국 추수감사절은 2026년 11월 26일(목), 블랙 프라이데이는 다음 날인 11월 27일(금)입니다. 사이버 먼데이는 11월 30일(월)입니다.',
      history: '블랙 프라이데이라는 쇼핑 명칭은 1950년대 필라델피아에서 추수감사절 다음 날의 혼잡을 가리킨 표현에서 널리 알려졌습니다. “적자(red)에서 흑자(black)로 바뀌는 날”이라는 회계 설명은 후대에 퍼진 상업적 재해석이지 최초의 유래로 단정할 수 없습니다.',
      caveatTitle: '세일·영업시간·재고 확인 안내', caveat: '이 안내는 쇼핑 아이디어이지 2026년 특정 할인이나 행사 확정 공지가 아닙니다. The Mall Firenze의 과거 공식 게시물에 “최대 70%” 문구가 있었지만 연도가 표시되지 않아 2026년 행사로 볼 수 없습니다. 할인율은 일부 상품·점포에만 적용될 수 있습니다. Barberino, The Mall, Rinascente 및 각 브랜드의 공식 채널에서 방문 당일 행사, 영업시간, 교통편과 특정 모델·색상·사이즈 재고를 확인하세요. 점포 입점은 특정 상품의 재고를 보장하지 않습니다.',
      bag: '가방', apparel: '의류·아우터', shoes: '신발', pick: '이 상품이 돋보이는 점', productLink: '공식 상품 페이지', storeLink: '공식 매장 안내', price: '가격은 현지 통화·세금·시점에 따라 달라질 수 있어 여기서는 특정 가격을 제시하지 않습니다.',
      tipsTitle: '구매 전 짧은 체크리스트', tips: ['가방은 실제 크기, 무게, 스트랩 길이, 수납 구성을 확인하세요.', '의류와 신발은 사이즈표를 확인하고 가능하면 착용해 보세요. 선물이라면 교환·반품 정책을 먼저 확인하세요.', '최종 결제 가격과 할인 적용 대상·조건을 확인하고 영수증을 보관하세요.', '택스프리 자격과 발급 절차는 구매 국가·판매자·여행자 조건에 따라 달라질 수 있습니다. 매장과 이탈리아 세관의 최신 안내를 확인하세요.', '액체류·관세·수하물 규정은 항공사 및 도착 국가의 현행 규정을 확인하세요.'],
      sourcesTitle: '공식 참고 자료', historyLink: 'Black Friday의 역사 · HISTORY', mallLink: 'The Mall Firenze 브랜드·방문 안내', barberinoLink: 'Barberino Designer Outlet 매장 안내', rinascenteLink: 'Rinascente 공식 Black Friday 페이지 (게시 내용 확인 필요)', photoLabel: '제품 사진', storeQualifier: '매장 정보는 입점을 안내할 뿐, 특정 상품 판매나 재고를 보장하지 않습니다.'
    },
    en: {
      title: 'Florence Black Friday shopping guide', subtitle: 'Five handbag ideas plus three apparel, outerwear, and sneaker picks — each with a product photo and official reference links.',
      dateTitle: '2026 date and the name’s history', date: 'U.S. Thanksgiving is Thursday, November 26, 2026; Black Friday falls on Friday, November 27. Cyber Monday is Monday, November 30.',
      history: 'The shopping name Black Friday became widely associated with Philadelphia’s post-Thanksgiving crowds in the 1950s. The “red to black” accounting story is a later commercial reinterpretation, not a confirmed original origin.',
      caveatTitle: 'Check promotions, hours, and stock', caveat: 'This is a shopping idea list, not confirmation of any specific 2026 discount or event. A past official post from The Mall Firenze used the phrase “up to 70%,” but gave no year, so it cannot be treated as a 2026 offer. A maximum advertised discount may apply only to selected items or stores. Check official channels for The Mall, Barberino, Rinascente, and each brand on the day of your visit for current offers, opening hours, transport, and the exact model, color, and size. A listed store does not guarantee a particular item is in stock.',
      bag: 'Handbag', apparel: 'Apparel & outerwear', shoes: 'Shoes', pick: 'What makes it stand out', productLink: 'Official product page', storeLink: 'Official store information', price: 'Prices vary by market, tax, and date, so no specific price is quoted here.',
      tipsTitle: 'Quick checks before buying', tips: ['For bags, check actual dimensions, weight, strap drop, and how the compartments are arranged.', 'Check size charts and try clothing or shoes when possible. If buying a gift, review exchange and return terms first.', 'Confirm the final checkout price and which items qualify for any offer; keep your receipt.', 'Tax-free eligibility and paperwork depend on the purchase country, retailer, and traveler. Check current store and Italian Customs guidance.', 'Check current airline and destination-country rules for liquids, customs, and baggage.'],
      sourcesTitle: 'Official references', historyLink: 'Black Friday history · HISTORY', mallLink: 'The Mall Firenze brand and visitor information', barberinoLink: 'Barberino Designer Outlet store directory', rinascenteLink: 'Rinascente official Black Friday page (check for current details)', photoLabel: 'Product photograph', storeQualifier: 'A store listing confirms the location, not the availability of a specific item.'
    },
    zh: {
      title: '佛罗伦萨黑色星期五购物指南', subtitle: '5款手袋建议，加上3款服装、外套与运动鞋；每项均配产品照片和官方参考链接。',
      dateTitle: '2026年日期与名称由来', date: '2026年美国感恩节为11月26日（星期四）；黑色星期五是次日11月27日（星期五）。网络星期一是11月30日（星期一）。',
      history: '“黑色星期五”作为购物名称，普遍认为与20世纪50年代费城感恩节后的人潮拥堵有关。“从红字转为黑字”的会计说法是后来流行的商业化解释，并非已确认的最初来源。',
      caveatTitle: '促销、营业时间与库存请另行确认', caveat: '本指南提供购物灵感，并不代表已确认2026年的任何具体折扣或活动。The Mall Firenze过去的官方帖子曾写“最高70%优惠”，但没有标明年份，因此不能视为2026年活动。最高折扣可能只适用于部分商品或门店。请在出发当天查看The Mall、Barberino、Rinascente及各品牌官方渠道，确认活动、营业时间、交通，以及具体款式、颜色和尺码。门店名录不保证特定商品有库存。',
      bag: '手袋', apparel: '服装与外套', shoes: '鞋履', pick: '亮点', productLink: '官方商品页', storeLink: '官方门店信息', price: '价格会因市场、税费和日期而异，因此此处不列具体价格。',
      tipsTitle: '购买前快速核对', tips: ['购买手袋时，确认实际尺寸、重量、肩带长度和内部收纳布局。', '查看尺码表，条件允许时试穿衣物和鞋子。购买礼物前先了解换货与退货条款。', '确认结账总价及促销适用商品，并保留收据。', '免税资格和手续取决于购买国家、商家及旅客条件；请查看门店和意大利海关的最新说明。', '液体、海关和行李规定请以航空公司及目的地现行规定为准。'],
      sourcesTitle: '官方参考资料', historyLink: '黑色星期五的历史 · HISTORY', mallLink: 'The Mall Firenze 品牌与访客信息', barberinoLink: 'Barberino Designer Outlet 门店目录', rinascenteLink: 'Rinascente 官方黑色星期五页面（请核实最新信息）', photoLabel: '产品照片', storeQualifier: '门店名录仅表示该品牌有门店信息，不代表特定商品有货。'
    },
    ja: {
      title: 'フィレンツェのブラックフライデー買い物ガイド', subtitle: 'ハンドバッグ5点と、衣類・アウター・スニーカー3点を、商品写真と公式参考リンクとともに紹介します。',
      dateTitle: '2026年の日付と名称の由来', date: '2026年の米国感謝祭は11月26日（木）、ブラックフライデーは翌日の11月27日（金）です。サイバーマンデーは11月30日（月）です。',
      history: 'ショッピング用語としてのブラックフライデーは、1950年代のフィラデルフィアで感謝祭翌日の混雑を指した表現と広く結び付けられています。「赤字から黒字へ」という会計の説明は後世に広まった商業的な再解釈で、最初の由来と断定できるものではありません。',
      caveatTitle: 'セール・営業時間・在庫は要確認', caveat: 'このガイドは買い物の候補であり、2026年の特定の割引やイベントを確約するものではありません。The Mall Firenzeの過去の公式投稿には「最大70％」という表現がありましたが、年が示されていないため2026年のセールとはみなせません。最大割引は一部商品・店舗のみの場合があります。訪問当日にThe Mall、Barberino、Rinascenteおよび各ブランドの公式情報で、セール、営業時間、交通手段、モデル・色・サイズの在庫を確認してください。店舗の掲載は特定商品の在庫を保証しません。',
      bag: 'バッグ', apparel: '衣類・アウター', shoes: 'シューズ', pick: 'おすすめポイント', productLink: '公式商品ページ', storeLink: '公式店舗案内', price: '価格は市場・税・時期によって異なるため、ここでは特定価格を掲載していません。',
      tipsTitle: '購入前の簡単チェック', tips: ['バッグは実際の寸法、重さ、ストラップの長さ、収納の仕切りを確認しましょう。', 'サイズ表を確認し、可能なら衣類や靴を試着してください。贈り物なら交換・返品条件を先に確認しましょう。', '最終支払額とセール対象・条件を確認し、レシートを保管してください。', '免税の対象条件や手続きは購入国、販売店、旅行者の条件によって異なります。店舗とイタリア税関の最新案内を確認してください。', '液体、税関、手荷物の規則は航空会社と渡航先の最新情報を確認してください。'],
      sourcesTitle: '公式参考情報', historyLink: 'ブラックフライデーの歴史 · HISTORY', mallLink: 'The Mall Firenze ブランド・来訪案内', barberinoLink: 'Barberino Designer Outlet 店舗一覧', rinascenteLink: 'Rinascente 公式ブラックフライデーページ（最新情報を要確認）', photoLabel: '商品写真', storeQualifier: '店舗一覧は店舗情報を示すもので、特定商品の在庫を保証するものではありません。'
    }
  };

  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, function (char) {
      return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char];
    });
  }

  function language() {
    var selected = root.currentLang || (root.document && root.document.documentElement.lang);
    if (!selected && root.localStorage) {
      try { selected = root.localStorage.getItem('travel_user_lang'); } catch (error) { /* private mode */ }
    }
    return LANGS.indexOf(selected) >= 0 ? selected : 'ko';
  }

  function render(lang) {
    lang = LANGS.indexOf(lang) >= 0 ? lang : 'ko';
    var labels = COPY[lang];
    var originalHtml = typeof root.florenceShoppingOriginalHTML === 'function'
      ? root.florenceShoppingOriginalHTML(lang)
      : '';
    var productCards = PRODUCTS.map(function (product, index) {
      var text = product.copy[lang];
      var category = product.category === 'bag' ? labels.bag : (product.category === 'shoes' ? labels.shoes : labels.apparel);
      return '<article class="fbb-product-card" data-product="' + escapeHtml(product.id) + '">' +
        '<a class="fbb-photo-link" href="' + escapeHtml(product.productUrl) + '" target="_blank" rel="noopener noreferrer" aria-label="' + escapeHtml(text.name + ' — ' + labels.productLink) + '">' +
          '<img src="' + escapeHtml(product.image) + '" alt="' + escapeHtml(text.alt) + '" loading="lazy" decoding="async">' +
        '</a>' +
        '<div class="fbb-card-content"><p class="fbb-category">' + escapeHtml(category) + ' · ' + String(index + 1).padStart(2, '0') + '</p>' +
          '<h3><a href="' + escapeHtml(product.productUrl) + '" target="_blank" rel="noopener noreferrer">' + escapeHtml(text.name) + '</a></h3>' +
          '<p>' + escapeHtml(text.description) + '</p><p class="fbb-standout"><strong>' + escapeHtml(labels.pick) + ':</strong> ' + escapeHtml(text.standout) + '</p>' +
          '<p class="fbb-card-links"><a href="' + escapeHtml(product.productUrl) + '" target="_blank" rel="noopener noreferrer">' + escapeHtml(labels.productLink) + '</a>' +
            '<span aria-hidden="true"> · </span><a href="' + escapeHtml(product.storeUrl) + '" target="_blank" rel="noopener noreferrer">' + escapeHtml(text.location) + '</a></p>' +
        '</div></article>';
    }).join('');
    var tips = labels.tips.map(function (tip) { return '<li>' + escapeHtml(tip) + '</li>'; }).join('');
    return '<div class="fbb-inner" lang="' + lang + '">' +
      '<header class="fbb-heading"><p class="fbb-eyebrow">FLORENCE · 2026</p><h2>' + escapeHtml(labels.title) + '</h2><p>' + escapeHtml(labels.subtitle) + '</p></header>' +
      '<section class="fbb-context" aria-labelledby="fbb-date-heading"><h3 id="fbb-date-heading">' + escapeHtml(labels.dateTitle) + '</h3><p>' + escapeHtml(labels.date) + '</p><p>' + escapeHtml(labels.history) + ' <a href="https://www.history.com/articles/black-friday-thanksgiving-origins-history" target="_blank" rel="noopener noreferrer">' + escapeHtml(labels.historyLink) + '</a></p></section>' +
      '<section class="fbb-caveat" aria-labelledby="fbb-caveat-heading"><h3 id="fbb-caveat-heading">' + escapeHtml(labels.caveatTitle) + '</h3><p>' + escapeHtml(labels.caveat) + '</p></section>' +
      '<section class="fbb-products" aria-label="' + escapeHtml(labels.title) + '"><div class="fbb-product-grid">' + productCards + '</div></section>' +
      (originalHtml ? '<section class="fbb-original-source" aria-label="' + escapeHtml(labels.sourcesTitle) + '">' + originalHtml + '</section>' : '') +
      '<section class="fbb-tips"><h3>' + escapeHtml(labels.tipsTitle) + '</h3><ul>' + tips + '</ul><p>' + escapeHtml(labels.price) + '</p></section>' +
      '<footer class="fbb-sources"><h3>' + escapeHtml(labels.sourcesTitle) + '</h3><ul>' +
        '<li><a href="https://firenze.themall.it/en/" target="_blank" rel="noopener noreferrer">' + escapeHtml(labels.mallLink) + '</a></li>' +
        '<li><a href="https://www.barberinooutlet.com/en/" target="_blank" rel="noopener noreferrer">' + escapeHtml(labels.barberinoLink) + '</a></li>' +
        '<li><a href="https://www.rinascente.it/en/black-friday" target="_blank" rel="noopener noreferrer">' + escapeHtml(labels.rinascenteLink) + '</a></li>' +
      '</ul><p>' + escapeHtml(labels.storeQualifier) + '</p></footer>' +
    '</div>';
  }

  function isFlorenceCard(card) {
    var city = card.querySelector('.city-tag');
    if (!city) return false;
    var label = city.textContent || '';
    return CITY_NAMES.some(function (name) { return label.indexOf(name) !== -1; });
  }

  function update() {
    if (!root.document) return;
    var grids = Array.prototype.slice.call(root.document.querySelectorAll('#timelineGrid1, #timelineGrid2, #timelineGrid3'));
    var cards = [];
    grids.forEach(function (grid) {
      Array.prototype.forEach.call(grid.querySelectorAll('.day-card'), function (card) {
        if (isFlorenceCard(card)) cards.push(card);
      });
    });
    var existing = root.document.getElementById(ID);
    if (!cards.length) {
      if (existing && existing.parentNode) existing.parentNode.removeChild(existing);
      return;
    }
    var section = existing || root.document.createElement('section');
    section.id = ID;
    section.className = 'florence-black-friday-shopping';
    var lang = language();
    if (section.getAttribute('data-rendered-lang') !== lang) {
      section.innerHTML = render(lang);
      section.setAttribute('data-rendered-lang', lang);
      section.setAttribute('aria-label', COPY[lang].title);
    }
    var lastCard = cards[cards.length - 1];
    if (section.parentElement !== lastCard.parentElement || section.previousElementSibling !== lastCard) {
      lastCard.insertAdjacentElement('afterend', section);
    }
  }

  var scheduled = false;
  function scheduleUpdate() {
    if (scheduled || !root.document) return;
    scheduled = true;
    (root.requestAnimationFrame || function (callback) { return root.setTimeout(callback, 0); })(function () {
      scheduled = false;
      update();
    });
  }

  function init() {
    if (!root.document || !root.MutationObserver) return;
    var observer = new root.MutationObserver(scheduleUpdate);
    var planner = root.document.getElementById('chapter-planner') || root.document.body;
    observer.observe(planner, { childList: true, subtree: true, characterData: true });
    var languageObserver = new root.MutationObserver(scheduleUpdate);
    languageObserver.observe(root.document.documentElement, { attributes: true, attributeFilter: ['lang'] });
    scheduleUpdate();
  }

  var api = { products: PRODUCTS, copy: COPY, render: render, update: update, language: language };
  root.FlorenceBlackFridayShopping = api;

  if (root.document) {
    if (root.document.readyState === 'loading') root.document.addEventListener('DOMContentLoaded', init, { once: true });
    else init();
  }
})(typeof window !== 'undefined' ? window : globalThis);
