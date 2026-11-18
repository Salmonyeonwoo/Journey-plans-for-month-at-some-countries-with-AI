/* Review-only addition: Puerta de Jerez and Avenida de la Constitución.
 * Independent of personal itinerary and reservation data. */
(function () {
  'use strict';

  var LANGS = ['ko', 'en', 'ja', 'zh'];
  var DATA = {
    ko: {
      heading: '푸에르타 데 헤레스와 헌법 대로의 장소 안내',
      intro: '사용자 제공 사진 두 장에 담긴 세비야 광장과 거리의 참고 안내입니다. 개인 일정과 예약은 바꾸지 않습니다.',
      sourcesLabel: '확인에 참고한 자료',
      topics: {
        plaza: {
          id: 'sg-puerta-jerez-plaza',
          title: '푸에르타 데 헤레스 광장 · Fuente de Híspalis',
          image: 'img/user-seville-landmarks/puerta-jerez-fuente-hispalis-20261118.webp',
          alt: '세비야 푸에르타 데 헤레스 광장의 나무와 분수 일부가 보이는 사용자 제공 사진',
          caption: '사용자 제공 사진 · 원본 비율을 유지한 웹용 사본',
          paragraphs: [
            '광장은 세비야 중세 성벽의 옛 출입구가 있던 자리에 있습니다. 그 문은 Jerez de la Frontera와 Cádiz 방향의 길로 이어졌습니다. 원래 문은 1846년에 신고전주의 문으로 대체됐고, 1864년에 철거된 것은 그 후대의 문입니다.',
            '세비야 시청은 분수를 Fuente de Híspalis라고 부릅니다. 시청의 문화·역사 기록은 조각가 Manuel Delgado Brackembury가 1928~1929년에 이 분수를 작업했다고 적고, 시 관광 안내는 1929년 작품으로 소개합니다. Juan Bautista Míguez Roca의 설계 참여는 일부 지역 자료가 전하지만, 공식적인 독립 기록으로 확인하지 못해 여기서는 확정적으로 표기하지 않습니다.',
            '지역 해설은 중앙의 튜닉 차림 여인상을 세비야의 의인화로 소개합니다. 조각군에는 거북 여섯 마리와 어린이 형상들, 조개껍데기 형태의 물분출구를 든 어린이상 네 점도 있습니다. 톱니바퀴·카두케우스·거북이 각각이 산업·무역·꾸준한 발전을 뜻한다는 설명은 공식 제작 해설로 확인되지 않아 확정된 상징처럼 싣지 않았습니다.',
            '네 어린이상은 조개껍데기에서 물줄기가 나와 ‘Los Meones(오줌 누는 아이들)’라는 별칭을 얻었습니다. 1939년 시장의 철거 명령은 기록상 미관과 조각군의 조화 문제를 이유로 들며, 외설·풍기 문란 때문이라는 설명은 확인되지 않습니다. 2015년에는 원본이 아닌 복제품 네 점이 돌아왔습니다. 분수 본체는 지하철 공사 때문에 별도로 1980년 해체되고 1987년 5월 재조립됐습니다.',
            '뒤쪽의 Jardines de Cristina는 1830년 7월 문을 연 공공정원으로, 시청은 Melchor Cano가 설계하고 식물학자 Claudio Boutelou가 자문했다고 기록합니다. 1929년 박람회 전후 호텔 건설로 정원 면적이 줄었습니다. 세비야의 쓴오렌지는 봄에 향기로운 꽃을 피우고 겨울 수거 캠페인의 대상이 되지만, 거리 열매 전체가 마멀레이드용으로 수출된다고 단정하지 않습니다. Sevilla FC의 2023년 우승 행사에서 이 분수에 우승컵을 봉헌한 기록은 있으나, 모든 축하 행사가 분수에서만 열린다는 뜻은 아닙니다.'
          ],
          sources: [
            ['세비야 관광청 · 푸에르타 데 헤레스', 'https://visitasevilla.es/en/puerta-de-jerez/'],
            ['세비야 시청 · Manuel Delgado Brackembury 기록', 'https://www.sevilla.org/servicios/cementerio-municipal/historia-y-espacio-cultural/55-panteon-de-d-juan-vazquez'],
            ['세비야 시청 · Fuente de Híspalis 복원 안내', 'https://www.sevilla.org/actualidad/noticias/2025/el-ayuntamiento-restaura-la-fuente-de-hispalis-de-la-puerta-de-jerez-tras-diez-anos-sin-intervenciones'],
            ['ABC Sevilla · 네 어린이상 철거·복제품 설치', 'https://www.abc.es/sevilla/ciudad/20150401/sevi-ninos-meones-vuelven-puerta-201503312112.html'],
            ['세비야 시청 · Jardines de Cristina', 'https://www.sevilla.org/servicios/medio-ambiente-parques-jardines/parques/jardines-de-distrito/jardines-de-cristina'],
            ['세비야대학교 · 쓴오렌지(Citrus aurantium)', 'https://asignatura.us.es/abotcam/especies/Citrus_aurantium.html'],
            ['Sevilla FC · 2023 유로파리그 우승 축하', 'https://sevillafc.es/es/actualidad/noticias/celebracion-uel-2023']
          ]
        },
        avenue: {
          id: 'sg-avenida-architecture-review',
          title: '헌법 대로 · 사진 속 건축과 옛 대학 예배당',
          image: 'img/user-seville-landmarks/avenida-constitucion-puerta-jerez-20261118.webp',
          alt: '세비야 헌법 대로의 트램 선로와 발코니형 건물들이 보이는 사용자 제공 사진',
          caption: '사용자 제공 사진 · 원본 비율을 유지한 웹용 사본',
          paragraphs: [
            'Avenida de la Constitución은 1906년부터 1927년까지 단계적으로 개설된 도시개조 사업이었습니다. 옛 Colegio-Universidad de Santa María de Jesús는 대로를 내기 위해 1909년 철거됐고 예배당은 남았습니다. 세비야 성벽의 철거는 이미 1867년에 시작된 별도의 장기 과정이므로, 성벽과 대학을 모두 1929년 박람회 직전 한꺼번에 없앴다고 설명하는 것은 정확하지 않습니다.',
            '세비야대학교의 기원인 Colegio-Universidad는 1505년 교황 교서로 설립·교육 허가를 받았습니다. 부속 Capilla de Santa María de Jesús는 1506년 개관했고, 대학 기록관은 학교 교육이 1518년 시작됐다고 구분합니다. 후기 고딕-무데하르 양식의 예배당은 옛 단지에서 남은 유일한 건물이며 주소는 Avenida de la Constitución 27입니다. 옛 대학의 석조 정문은 이곳에 남아 있는 것이 아니라 산타 클라라 수도원으로 옮겨졌습니다.',
            '사진의 23번지 건물은 전문 건축물 자료에서 ‘Edificio Seguros Santa Lucía’로 식별되며, José Espiau y Muñoz와 1910년이 연결됩니다. 다만 다른 학술 자료는 주소를 23–25번지로 적고, 최초 의뢰자·양식 분류에도 차이가 있어 세부 귀속은 유보했습니다. 사진의 발코니와 철제 난간을 거리 풍경으로 살펴보는 편이 안전합니다.',
            'Avenida de la Constitución 21(B)는 2010년 세비야 관광 안내 자료에서 관광정보 사무소 주소로 확인됩니다. 그러나 21번지 건물의 정확한 준공연도와 ‘네오 무데하르’ 양식, Aníbal González 설계라는 세부 귀속은 검토한 신뢰도 높은 공식 자료로 독립 확인되지 않아 확정 사실로 적지 않았습니다.'
          ],
          sources: [
            ['CSIC · Avenida 개설 연구(1906–1927)', 'https://informesdelaconstruccion.revistas.csic.es/index.php/informesdelaconstruccion/article/view/4677'],
            ['세비야대학교 저장소 · Santa María de Jesús 대학·예배당 연구', 'https://idus.us.es/items/8b3a490c-9bdc-4376-964f-5a0e385395ce'],
            ['세비야 대교구 · Capilla de Santa María de Jesús 주소', 'https://www.archisevilla.org/iglesia/capilla-de-santa-maria-de-jesus-sevilla/'],
            ['세비야 시청 · 산타 클라라에 옮겨진 옛 대학 정문', 'https://www.sevilla.org/ciudad/sevilla-ciudad-patrimonial/espacio-santa-clara'],
            ['PSS 건축 데이터베이스 · Seguros Santa Lucía', 'https://www.pss-archi.eu/immeubles/ES-41091-94030.html'],
            ['세비야 관광 안내 PDF(2010) · Avenida 21 B', 'https://tic.visitasevilla.es/vsev/web_php/imatges/guias/4526624ea66a1feb4582070409.pdf']
          ]
        }
      }
    },
    en: {
      heading: 'Puerta de Jerez and Avenida de la Constitución',
      intro: 'A reference guide to the Seville square and street in your two photos. Personal plans and reservations are unchanged.',
      sourcesLabel: 'Sources checked',
      topics: {
        plaza: {
          id: 'sg-puerta-jerez-plaza',
          title: 'Puerta de Jerez · Fuente de Híspalis',
          image: 'img/user-seville-landmarks/puerta-jerez-fuente-hispalis-20261118.webp',
          alt: 'User-provided photo of Puerta de Jerez square in Seville, with trees and part of a fountain',
          caption: 'User-provided photo · web copy preserves the original aspect ratio',
          paragraphs: [
            'The square occupies the site of a former gate in Seville’s medieval walls. That gate opened routes towards Jerez de la Frontera and Cádiz. The original gate was replaced by a Neoclassical one in 1846; it was this later gate that was demolished in 1864.',
            'Seville City Hall calls the fountain Fuente de Híspalis. Its cultural-history record says sculptor Manuel Delgado Brackembury worked on it in 1928–29, and the city tourism guide dates the work to 1929. Some local accounts credit Juan Bautista Míguez Roca with the design, but we could not independently confirm that attribution in an official record, so it is not stated as settled fact here.',
            'Local accounts describe the central woman in a tunic as an allegory or personification of Seville. The sculptural group also includes six tortoises with child figures and four children holding shell-shaped water spouts around the basin. The gear, caduceus and tortoises are sometimes assigned meanings such as industry, trade and steady progress, but we found no official commissioning-era explanation that establishes those as definitive symbols.',
            'Water jets from the shell-shaped spouts gave the four children the nickname Los Meones (“the peeing children”). The recorded 1939 removal order cited visual harmony and the fountain’s aesthetic; we found no support for the story that they were removed for indecency. Four replicas—not the originals—returned in 2015. Separately, the fountain itself was dismantled for Metro works in 1980 and reassembled in May 1987.',
            'Jardines de Cristina behind the square opened in July 1830. The city credits architect Melchor Cano with the design and botanist Claudio Boutelou with advice; the garden later lost area to hotel construction around the 1929 Exhibition. Seville’s bitter-orange trees flower in spring and are collected in winter campaigns, but it would be too broad to say that all street fruit is exported for marmalade. Sevilla FC’s 2023 title celebrations included presenting the trophy at this fountain; that was one stop in a wider celebration, not the only venue for every victory.'
          ],
          sources: [
            ['Visit Seville · Puerta de Jerez', 'https://visitasevilla.es/en/puerta-de-jerez/'],
            ['Seville City · Manuel Delgado Brackembury record', 'https://www.sevilla.org/servicios/cementerio-municipal/historia-y-espacio-cultural/55-panteon-de-d-juan-vazquez'],
            ['Seville City · Fuente de Híspalis restoration', 'https://www.sevilla.org/actualidad/noticias/2025/el-ayuntamiento-restaura-la-fuente-de-hispalis-de-la-puerta-de-jerez-tras-diez-anos-sin-intervenciones'],
            ['ABC Sevilla · removal and 2015 replicas', 'https://www.abc.es/sevilla/ciudad/20150401/sevi-ninos-meones-vuelven-puerta-201503312112.html'],
            ['Seville City · Jardines de Cristina', 'https://www.sevilla.org/servicios/medio-ambiente-parques-jardines/parques/jardines-de-distrito/jardines-de-cristina'],
            ['University of Seville · bitter orange (Citrus aurantium)', 'https://asignatura.us.es/abotcam/especies/Citrus_aurantium.html'],
            ['Sevilla FC · 2023 Europa League celebrations', 'https://sevillafc.es/es/actualidad/noticias/celebracion-uel-2023']
          ]
        },
        avenue: {
          id: 'sg-avenida-architecture-review',
          title: 'Avenida de la Constitución · architecture and the former university chapel',
          image: 'img/user-seville-landmarks/avenida-constitucion-puerta-jerez-20261118.webp',
          alt: 'User-provided photo of tram tracks and balconied buildings on Avenida de la Constitución, Seville',
          caption: 'User-provided photo · web copy preserves the original aspect ratio',
          paragraphs: [
            'Avenida de la Constitución was opened through a phased urban project from 1906 to 1927. The former Colegio-Universidad de Santa María de Jesús was demolished in 1909 to make way for the avenue, while its chapel survived. Seville’s wall demolitions were a separate, longer process already under way by 1867; it is inaccurate to group the walls and the university buildings as removals made all at once just before the 1929 Exhibition.',
            'The institution that became the University of Seville received papal permission for its foundation and teaching in 1505. Its chapel, Capilla de Santa María de Jesús, opened in 1506; the university archive separately dates the start of teaching to 1518. The late Gothic-Mudéjar chapel is the only surviving building of the former complex and is addressed at Avenida de la Constitución 27. The old stone college portal is not still at this address: it was moved to the Convent of Santa Clara.',
            'The building at number 23 is identified by a specialist architecture database as Edificio Seguros Santa Lucía and associated with José Espiau y Muñoz and 1910. Another academic source gives the address as 23–25, and accounts differ on the original client and style, so those details remain qualified. The photo is a good place to notice the balconies and iron railings without treating every façade detail as a confirmed attribution.',
            'A 2010 Seville tourism guide lists a tourist-information office at Avenida de la Constitución 21(B). We could not independently verify the exact completion date, “Neo-Mudéjar” label or Aníbal González attribution for the number-21 building in a reliable official record, so this guide does not present those claims as established facts.'
          ],
          sources: [
            ['CSIC · study of the avenue project (1906–1927)', 'https://informesdelaconstruccion.revistas.csic.es/index.php/informesdelaconstruccion/article/view/4677'],
            ['University of Seville repository · Santa María de Jesús study', 'https://idus.us.es/items/8b3a490c-9bdc-4376-964f-5a0e385395ce'],
            ['Archdiocese of Seville · chapel address', 'https://www.archisevilla.org/iglesia/capilla-de-santa-maria-de-jesus-sevilla/'],
            ['Seville City · former college portal at Santa Clara', 'https://www.sevilla.org/ciudad/sevilla-ciudad-patrimonial/espacio-santa-clara'],
            ['PSS architecture database · Seguros Santa Lucía', 'https://www.pss-archi.eu/immeubles/ES-41091-94030.html'],
            ['Seville tourist guide (2010) · Avenida 21 B', 'https://tic.visitasevilla.es/vsev/web_php/imatges/guias/4526624ea66a1feb4582070409.pdf']
          ]
        }
      }
    },
    ja: {
      heading: 'ヘレス門広場とコンスティトゥシオン大通り',
      intro: '2枚の写真に写るセビリアの広場と通りを紹介します。個人旅行の日程や予約は変更しません。',
      sourcesLabel: '確認した資料',
      topics: {
        plaza: {
          id: 'sg-puerta-jerez-plaza',
          title: 'ヘレス門広場 · Fuente de Híspalis',
          image: 'img/user-seville-landmarks/puerta-jerez-fuente-hispalis-20261118.webp',
          alt: '木々と噴水の一部が写る、利用者提供のセビリア・ヘレス門広場の写真',
          caption: '利用者提供写真・元の縦横比を保ったウェブ用コピー',
          paragraphs: [
            '広場は、セビリアの中世城壁にあった旧門の跡地にあります。この門からヘレス・デ・ラ・フロンテラとカディス方面へ道が延びていました。元の門は1846年に新古典主義様式の門へ置き換えられ、1864年に撤去されたのはその後の門です。',
            'セビリア市は噴水をFuente de Híspalisと呼んでいます。市の文化・歴史資料によると、彫刻家マヌエル・デルガド・ブラッケンベリーは1928～1929年にこの噴水を制作しました。市の観光案内は1929年の作品として紹介しています。フアン・バウティスタ・ミゲス・ロカを設計者とする説は一部の地域資料にありますが、公式記録で独立して確認できなかったため、確定事項としては記していません。',
            '地域の解説では、中央のチュニック姿の女性像はセビリアの寓意・擬人像とされています。彫刻群には6匹のカメと子ども像、貝殻形の水口を持つ4体の子ども像も含まれます。歯車・カドゥケウス・カメをそれぞれ産業・交易・着実な発展の象徴とする説明もありますが、制作当時の公式解説では確認できず、確定した意味とはしていません。',
            '貝殻形の水口から水が出る4体の子ども像は、親しみを込めてLos Meones（おしっこをする子どもたち）と呼ばれました。1939年の撤去命令が記録に挙げる理由は美観と全体の調和であり、わいせつさを理由に撤去したという話は確認できません。2015年に戻ったのは原作ではなく4体の複製です。噴水本体は別件として、地下鉄工事のため1980年に解体され、1987年5月に再組み立てされました。',
            '広場の奥にあるクリスティーナ庭園は1830年7月に開園しました。市は設計を建築家メルチョル・カノ、植物学上の助言をクロード・ブトゥルーに帰属させています。1929年博覧会前後のホテル建設で庭園の面積は縮小しました。セビリアのビターオレンジは春に香り高い花を咲かせ、冬の回収キャンペーンの対象となりますが、街路樹の実がすべてマーマレード用に輸出されるとは断定できません。セビージャFCの2023年優勝祝賀ではこの噴水でトロフィーを奉納しましたが、これは複数会場の一つで、毎回すべての祝賀がここだけで行われるわけではありません。'
          ],
          sources: [
            ['セビリア観光局 · ヘレス門広場', 'https://visitasevilla.es/en/puerta-de-jerez/'],
            ['セビリア市 · マヌエル・デルガド・ブラッケンベリーの記録', 'https://www.sevilla.org/servicios/cementerio-municipal/historia-y-espacio-cultural/55-panteon-de-d-juan-vazquez'],
            ['セビリア市 · Fuente de Híspalisの修復', 'https://www.sevilla.org/actualidad/noticias/2025/el-ayuntamiento-restaura-la-fuente-de-hispalis-de-la-puerta-de-jerez-tras-diez-anos-sin-intervenciones'],
            ['ABC Sevilla · 4体の子ども像と2015年の複製', 'https://www.abc.es/sevilla/ciudad/20150401/sevi-ninos-meones-vuelven-puerta-201503312112.html'],
            ['セビリア市 · クリスティーナ庭園', 'https://www.sevilla.org/servicios/medio-ambiente-parques-jardines/parques/jardines-de-distrito/jardines-de-cristina'],
            ['セビリア大学 · ビターオレンジ', 'https://asignatura.us.es/abotcam/especies/Citrus_aurantium.html'],
            ['セビージャFC · 2023年ヨーロッパリーグ優勝祝賀', 'https://sevillafc.es/es/actualidad/noticias/celebracion-uel-2023']
          ]
        },
        avenue: {
          id: 'sg-avenida-architecture-review',
          title: 'コンスティトゥシオン大通り · 建築と旧大学の礼拝堂',
          image: 'img/user-seville-landmarks/avenida-constitucion-puerta-jerez-20261118.webp',
          alt: 'セビリアのコンスティトゥシオン大通り、路面電車の線路とバルコニーのある建物を写した利用者提供写真',
          caption: '利用者提供写真・元の縦横比を保ったウェブ用コピー',
          paragraphs: [
            'Avenida de la Constituciónは1906年から1927年まで段階的に進められた都市整備事業です。旧Colegio-Universidad de Santa María de Jesúsは大通りを開くため1909年に取り壊され、礼拝堂は残りました。セビリアの城壁撤去は別の長期過程で、少なくとも1867年には始まっていました。城壁と大学建物が1929年博覧会直前に一斉に撤去されたとする説明は正確ではありません。',
            'セビリア大学の起源となったColegio-Universidadは、1505年に教皇勅書で設立と教育を認可されました。付属のCapilla de Santa María de Jesúsは1506年に開堂し、大学文書館は授業開始を1518年と別に記録しています。後期ゴシック・ムデハル様式の礼拝堂は旧施設で唯一残る建物で、住所はAvenida de la Constitución 27です。旧大学の石造正門はこの場所に残っておらず、サンタ・クララ修道院へ移されています。',
            '23番地の建物は専門建築データベースでEdificio Seguros Santa Lucíaとされ、José Espiau y Muñozおよび1910年と関連付けられています。一方、別の学術資料は住所を23～25番地と記し、最初の発注者や様式の分類にも差があります。そのため細部の帰属は留保しました。写真では街並みのバルコニーや鉄製手すりに注目できます。',
            '2010年のセビリア観光案内には、Avenida de la Constitución 21(B)の観光案内所が記載されています。ただし21番地の正確な完成年、「ネオ・ムデハル」という様式、アニバル・ゴンサレスの設計という詳細は、信頼できる公式資料で独立確認できなかったため確定事項として扱っていません。'
          ],
          sources: [
            ['CSIC · 大通り開設の研究（1906～1927年）', 'https://informesdelaconstruccion.revistas.csic.es/index.php/informesdelaconstruccion/article/view/4677'],
            ['セビリア大学リポジトリ · Santa María de Jesús研究', 'https://idus.us.es/items/8b3a490c-9bdc-4376-964f-5a0e385395ce'],
            ['セビリア大司教区 · 礼拝堂の住所', 'https://www.archisevilla.org/iglesia/capilla-de-santa-maria-de-jesus-sevilla/'],
            ['セビリア市 · Santa Claraに移された旧大学正門', 'https://www.sevilla.org/ciudad/sevilla-ciudad-patrimonial/espacio-santa-clara'],
            ['PSS建築データベース · Seguros Santa Lucía', 'https://www.pss-archi.eu/immeubles/ES-41091-94030.html'],
            ['セビリア観光案内PDF（2010年） · Avenida 21 B', 'https://tic.visitasevilla.es/vsev/web_php/imatges/guias/4526624ea66a1feb4582070409.pdf']
          ]
        }
      }
    },
    zh: {
      heading: '赫雷斯门广场与宪法大道',
      intro: '为您提供的两张照片中的塞维利亚广场和街道补充说明；不更改个人行程或预订。',
      sourcesLabel: '核对资料',
      topics: {
        plaza: {
          id: 'sg-puerta-jerez-plaza',
          title: '赫雷斯门广场 · Fuente de Híspalis',
          image: 'img/user-seville-landmarks/puerta-jerez-fuente-hispalis-20261118.webp',
          alt: '用户提供的塞维利亚赫雷斯门广场照片，可见树木和部分喷泉',
          caption: '用户提供的照片 · 网页副本保留原始宽高比例',
          paragraphs: [
            '广场位于塞维利亚中世纪城墙旧城门的原址。城门通往赫雷斯-德拉弗龙特拉和加的斯方向。原城门于1846年被一座新古典主义城门取代；1864年拆除的是这座后建的城门。',
            '塞维利亚市政府称这座喷泉为Fuente de Híspalis。市政府文化历史资料记载，雕塑家Manuel Delgado Brackembury于1928至1929年参与制作；市旅游指南将作品年代标为1929年。部分当地资料把设计归于Juan Bautista Míguez Roca，但我们未能在官方资料中独立核实，因此不把这一归属写成定论。',
            '当地介绍常把中央身穿长袍的女性像解释为塞维利亚的寓意或拟人像。雕塑群还包括六只乌龟和儿童形象，以及四尊手持贝壳形喷水口的儿童像。齿轮、商神杖和乌龟分别象征工业、贸易与稳步发展等说法虽有流传，但未能在委托时期的官方解说中得到确认，因此不作为确定的象征含义。',
            '四尊儿童像的贝壳形喷水口会喷水，因此得名Los Meones（“撒尿的孩子们”）。1939年拆除命令的记录理由是外观协调与审美问题；没有证据支持因“伤风败俗”而拆除的说法。2015年重新安装的是四尊复制品，并非原作。喷泉主体则因地铁工程于1980年另行拆除，并于1987年5月重建。',
            '广场后方的克里斯蒂娜花园于1830年7月开放。市政府资料称其由建筑师Melchor Cano设计，植物学家Claudio Boutelou提供建议；1929年博览会前后修建酒店时，花园面积有所缩减。塞维利亚的苦橙树春季开花，冬季开展采收活动；但不能笼统地说所有街树果实都会出口用于制作橘子酱。塞维利亚足球俱乐部2023年的夺冠庆祝曾在喷泉前呈献奖杯，不过这只是庆祝路线的一站，并非每次庆祝都只在此举行。'
          ],
          sources: [
            ['塞维利亚旅游局 · 赫雷斯门', 'https://visitasevilla.es/en/puerta-de-jerez/'],
            ['塞维利亚市政府 · Manuel Delgado Brackembury资料', 'https://www.sevilla.org/servicios/cementerio-municipal/historia-y-espacio-cultural/55-panteon-de-d-juan-vazquez'],
            ['塞维利亚市政府 · Fuente de Híspalis修复公告', 'https://www.sevilla.org/actualidad/noticias/2025/el-ayuntamiento-restaura-la-fuente-de-hispalis-de-la-puerta-de-jerez-tras-diez-anos-sin-intervenciones'],
            ['ABC Sevilla · 儿童像拆除与2015年复制品', 'https://www.abc.es/sevilla/ciudad/20150401/sevi-ninos-meones-vuelven-puerta-201503312112.html'],
            ['塞维利亚市政府 · 克里斯蒂娜花园', 'https://www.sevilla.org/servicios/medio-ambiente-parques-jardines/parques/jardines-de-distrito/jardines-de-cristina'],
            ['塞维利亚大学 · 苦橙（Citrus aurantium）', 'https://asignatura.us.es/abotcam/especies/Citrus_aurantium.html'],
            ['塞维利亚足球俱乐部 · 2023年欧联杯夺冠庆祝', 'https://sevillafc.es/es/actualidad/noticias/celebracion-uel-2023']
          ]
        },
        avenue: {
          id: 'sg-avenida-architecture-review',
          title: '宪法大道 · 街景建筑与旧大学礼拜堂',
          image: 'img/user-seville-landmarks/avenida-constitucion-puerta-jerez-20261118.webp',
          alt: '用户提供的塞维利亚宪法大道照片，可见有轨电车轨道和带阳台的建筑',
          caption: '用户提供的照片 · 网页副本保留原始宽高比例',
          paragraphs: [
            'Avenida de la Constitución是1906至1927年间分阶段实施的城市改造工程。为了开辟大道，旧Colegio-Universidad de Santa María de Jesús于1909年拆除，但其礼拜堂得以保留。塞维利亚城墙的拆除则是另一项更长期的过程，至少在1867年已经开始。因此，把城墙和大学建筑说成是在1929年博览会前一次性拆除，并不准确。',
            '塞维利亚大学的前身Colegio-Universidad于1505年获教皇诏书批准设立和授课。附属的Capilla de Santa María de Jesús于1506年开放；大学档案另将教学开始时间记为1518年。该礼拜堂属于晚期哥特—穆德哈尔风格，是旧建筑群唯一保留下来的建筑，地址为Avenida de la Constitución 27。旧大学的石雕门廊并未留在此处，而是迁至Santa Clara修道院。',
            '专业建筑数据库将23号建筑识别为Edificio Seguros Santa Lucía，并与José Espiau y Muñoz及1910年联系起来。另一份学术资料将地址写为23至25号；关于最初委托方和建筑风格的说法也不完全一致，因此这些细节应谨慎看待。照片中可以观察沿街阳台和铁栏杆。',
            '塞维利亚2010年旅游指南将旅游信息办公室地址记为Avenida de la Constitución 21(B)。但我们未能通过可靠的官方记录独立确认21号建筑的准确竣工年份、“新穆德哈尔”风格或由Aníbal González设计等说法，因此不把它们作为已确认事实。'
          ],
          sources: [
            ['CSIC · 大道开辟研究（1906—1927年）', 'https://informesdelaconstruccion.revistas.csic.es/index.php/informesdelaconstruccion/article/view/4677'],
            ['塞维利亚大学资料库 · Santa María de Jesús研究', 'https://idus.us.es/items/8b3a490c-9bdc-4376-964f-5a0e385395ce'],
            ['塞维利亚总教区 · 礼拜堂地址', 'https://www.archisevilla.org/iglesia/capilla-de-santa-maria-de-jesus-sevilla/'],
            ['塞维利亚市政府 · 迁至Santa Clara的旧大学门廊', 'https://www.sevilla.org/ciudad/sevilla-ciudad-patrimonial/espacio-santa-clara'],
            ['PSS建筑数据库 · Seguros Santa Lucía', 'https://www.pss-archi.eu/immeubles/ES-41091-94030.html'],
            ['塞维利亚旅游指南（2010年）· Avenida 21 B', 'https://tic.visitasevilla.es/vsev/web_php/imatges/guias/4526624ea66a1feb4582070409.pdf']
          ]
        }
      }
    }
  };

  var ALIASES = {
    plaza: [
      'puerta de jerez', 'puerta jerez', 'fuente de híspalis', 'fuente de hispalis', 'híspalis fountain', 'hispalis fountain', 'fountain of hispalis', 'los meones',
      '푸에르타 데 헤레스', '푸에르타데헤레스', '히스팔리스 분수', '히스팔리스', '오줌싸개 분수',
      'プエルタ・デ・ヘレス', 'ヘレス門', 'ヒスパリスの噴水', 'ヒスパリス',
      '赫雷斯门', '赫雷斯门广场', '希斯帕利斯喷泉', '希斯帕利斯', '尿童喷泉'
    ],
    avenue: [
      'avenida de la constitución', 'avenida de la constitucion', 'avenida constitución', 'avenida constitucion', 'constitution avenue',
      '헌법 대로', '헌법대로', 'コンスティトゥシオン大通り', 'コンスティトゥシオン通り', '宪法大道', '宪法大街'
    ]
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
    return /\b(?:itinerary|schedule|booking|booked|reservation|flight|airport|hotel|lodging|accommodation|route|directions|transit|transport|bus|train|taxi|metro|today|tomorrow|yesterday|day trip|how to reach|how do i get|how can i reach|get to)\b/i.test(query) ||
      /(?:숙소|항공|비행|공항|예약|일정|동선|경로|교통|이동|버스|기차|택시|오늘|내일|가는 방법|어떻게 가|찾아가는 길|旅程|日程|予約|フライト|空港|ホテル|経路|交通|移動|バス|電車|タクシー|今日|明日|行き方|どうやって行|行程|预订|航班|机场|酒店|路线|交通|公交|火车|出租车|今天|明天|怎么去|如何前往)/i.test(query) ||
      /\b(?:202\d|\d{1,2}:\d{2}|\d{1,2}\/\d{1,2}|\d{4}-\d{1,2}-\d{1,2})\b/.test(query);
  }

  function renderTopic(data, sourceLabel) {
    var paragraphs = data.paragraphs.map(function (text) { return '<p>' + escapeHtml(text) + '</p>'; }).join('');
    var sources = data.sources.map(function (source) {
      return '<li><a href="' + escapeHtml(source[1]) + '" target="_blank" rel="noopener noreferrer">' + escapeHtml(source[0]) + '</a></li>';
    }).join('');
    return '<details class="sg-guide-topic" id="' + escapeHtml(data.id) + '"><summary>' + escapeHtml(data.title) + '</summary>' +
      '<div class="sg-guide-content"><figure class="sg-guide-photo"><img src="' + escapeHtml(data.image) + '" alt="' + escapeHtml(data.alt) + '" loading="lazy" decoding="async"><figcaption>' + escapeHtml(data.caption) + '</figcaption></figure>' +
      paragraphs + '<p><strong>' + escapeHtml(sourceLabel) + '</strong></p><ul class="sg-guide-sources">' + sources + '</ul></div></details>';
  }

  function render(lang) {
    var mount = document.getElementById('seville-general-guide');
    if (!mount) return;
    var current = language(lang), d = DATA[current];
    var old = mount.querySelector('#sg-puerta-jerez-review');
    if (old) old.remove();
    var section = document.createElement('section');
    section.className = 'sg-guide';
    section.id = 'sg-puerta-jerez-review';
    section.setAttribute('lang', current);
    section.innerHTML = '<h2>' + escapeHtml(d.heading) + '</h2><p class="sg-guide-intro">' + escapeHtml(d.intro) + '</p>' +
      renderTopic(d.topics.plaza, d.sourcesLabel) + renderTopic(d.topics.avenue, d.sourcesLabel);
    mount.appendChild(section);
  }

  var previousRender = window.renderSevilleGeneralGuide;
  if (typeof previousRender === 'function') {
    window.renderSevilleGeneralGuide = function (lang) {
      var result = previousRender.apply(this, arguments);
      if (result) render(lang);
      return result;
    };
  }

  function response(topic, lang) {
    var d = DATA[language(lang)], item = d.topics[topic];
    var body = item.paragraphs.map(function (text) { return escapeHtml(text); }).join('<br><br>');
    var links = item.sources.map(function (source) {
      return '<a href="' + escapeHtml(source[1]) + '" target="_blank" rel="noopener noreferrer">' + escapeHtml(source[0]) + ' ↗</a>';
    }).join('<br>');
    return '<strong>' + escapeHtml(item.title) + '</strong><br>' + body + '<br><br><strong>' + escapeHtml(d.sourcesLabel) + ':</strong><br>' + links;
  }

  var previousChatResponse = window.buildSevilleGeneralChatResponse;
  if (typeof previousChatResponse === 'function') {
    window.buildSevilleGeneralChatResponse = function (query, lang) {
      var text = String(query || ''), normalized = normalize(text);
      if (!isPlanOrDirectionsQuery(text)) {
        if (ALIASES.plaza.some(function (alias) { return contains(normalized, alias); })) return response('plaza', lang);
        if (ALIASES.avenue.some(function (alias) { return contains(normalized, alias); })) return response('avenue', lang);
      }
      return previousChatResponse.apply(this, arguments);
    };
  }
}());
