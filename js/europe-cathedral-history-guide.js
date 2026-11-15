(function () {
  'use strict';

  var LANGS = ['ko', 'en', 'ja', 'zh'];
  var UI = {
    ko: {
      title: '유럽 성당·종탑 역사 노트',
      intro: '명소의 건립 연혁과 눈에 띄는 건축을 정리했습니다. 구전 일화와 과장된 인과관계는 확인된 사실과 구분하고, 방문·입장 정보는 공식 사이트에서 다시 확인하세요.',
      sources: '공식·참고 출처'
    },
    en: {
      title: 'European Cathedral & Bell-Tower History Notes',
      intro: 'Explore each site’s building history and distinctive architecture. Popular stories and claims of direct cause are separated from verified facts; check official sources for current visiting information.',
      sources: 'Official and reference sources'
    },
    ja: {
      title: 'ヨーロッパ大聖堂・鐘楼の歴史ノート',
      intro: '各地の建設史と特徴的な建築を紹介します。よく知られた逸話や単純化された因果関係は確認済みの事実と区別し、見学・入場情報は公式サイトでご確認ください。',
      sources: '公式・参考資料'
    },
    zh: {
      title: '欧洲大教堂与钟楼历史札记',
      intro: '了解各处的建造历程与建筑特色。流行传说和过度简化的因果说法会与已核实事实区分；参观与入场信息请以官方网站为准。',
      sources: '官方及参考资料'
    }
  };

  var ITEMS = [
    {
      id: 'notre-dame-paris',
      place: {
        ko: '프랑스 · 파리', en: 'France · Paris', ja: 'フランス・パリ', zh: '法国·巴黎'
      },
      name: {
        ko: '노트르담 대성당', en: 'Notre-Dame Cathedral', ja: 'ノートルダム大聖堂', zh: '巴黎圣母院'
      },
      history: {
        ko: '노트르담 대성당은 1163년경 공사가 시작돼 14세기까지 이어진 프랑스 고딕 건축의 대표작입니다. 리브 볼트와 플라잉 버트레스 같은 구조 요소가 높은 실내와 큰 창을 가능하게 했습니다. 프랑스 혁명기에 훼손과 용도 변경을 겪은 뒤, 빅토르 위고의 1831년 소설은 성당에 대한 대중의 관심을 키우는 데 기여했지만 복원의 유일한 원인은 아니었습니다. 1844년 복원 계획이 채택됐습니다. 2019년 화재 피해를 복구한 성당은 2024년 12월 다시 문을 열었고, 별도의 보존 작업은 이어지고 있습니다.',
        en: 'Work on Notre-Dame de Paris began around 1163 and continued into the 14th century, making it a landmark of French Gothic architecture. Structural features such as rib vaults and flying buttresses helped shape its lofty interior and large windows. The cathedral was damaged and repurposed during the French Revolution; Victor Hugo’s 1831 novel helped renew public interest, but it was not the sole cause of restoration. A restoration plan was selected in 1844. After repairs for the 2019 fire, the cathedral reopened in December 2024, while separate conservation work continues.',
        ja: 'ノートルダム大聖堂は1163年頃に建設が始まり、14世紀まで工事が続いたフランス・ゴシック建築の代表作です。リブ・ヴォールトやフライング・バットレスなどの構造が、高い内部空間と大きな窓を支えています。フランス革命期には損傷や用途変更を受けました。ヴィクトル・ユゴーの1831年の小説は大聖堂への関心を高める一助となりましたが、修復の唯一の原因ではありません。1844年に修復計画が採択されました。2019年の火災被害を修復した大聖堂は2024年12月に再開し、別途必要な保存作業は続いています。',
        zh: '巴黎圣母院约于1163年开工，工程延续至14世纪，是法国哥特式建筑的代表作。肋架拱顶和飞扶壁等结构支撑起高耸的内部空间与大型窗户。法国大革命期间，大教堂遭到破坏并曾被改作他用；维克多·雨果1831年的小说推动了公众重新关注，但并非修复工程的唯一原因。修复方案于1844年获选。2019年火灾后的修复使大教堂于2024年12月重新开放，另有日常保护工作继续进行。'
      },
      aliases: ['Notre-Dame', 'Notre Dame Cathedral', '노트르담', '노트르담 대성당', 'ノートルダム', 'ノートルダム大聖堂', '巴黎圣母院', '巴黎圣母大教堂'],
      sources: [
        {
          url: 'https://whc.unesco.org/en/urban-heritage-atlas/Paris/',
          label: {
            ko: 'UNESCO 세계유산센터 — 파리와 노트르담', en: 'UNESCO World Heritage Centre — Paris and Notre-Dame',
            ja: 'UNESCO世界遺産センター — パリとノートルダム', zh: '联合国教科文组织世界遗产中心——巴黎与圣母院'
          }
        },
        {
          url: 'https://exhibitions.bgc.bard.edu/drawing-worlds/notre-dame-de-paris/',
          label: {
            ko: 'Bard Graduate Center — 노트르담과 19세기 복원', en: 'Bard Graduate Center — Notre-Dame and its 19th-century restoration',
            ja: 'Bard Graduate Center — ノートルダムと19世紀の修復', zh: 'Bard Graduate Center——圣母院与19世纪修复'
          }
        },
        {
          url: 'https://rebatirnotredamedeparis.fr/en/support-projects/faq',
          label: {
            ko: '노트르담 복원 공공기관 — 재개방과 후속 보존', en: 'Rebâtir Notre-Dame de Paris — Reopening and continuing conservation',
            ja: 'ノートルダム再建公的機関 — 再開と継続中の保存作業', zh: '巴黎圣母院重建公共机构——重新开放与持续保护'
          }
        }
      ]
    },
    {
      id: 'westminster-big-ben',
      place: {
        ko: '영국 · 런던', en: 'United Kingdom · London', ja: 'イギリス・ロンドン', zh: '英国·伦敦'
      },
      name: {
        ko: '웨스트민스터 사원과 빅벤', en: 'Westminster Abbey & Big Ben', ja: 'ウェストミンスター寺院とビッグ・ベン', zh: '威斯敏斯特教堂与大本钟'
      },
      history: {
        ko: '웨스트민스터 사원은 1066년 윌리엄 정복왕의 대관식 이래 영국 군주의 대관식 장소로 쓰여 왔습니다. 사원에는 약 3,300명의 매장이 있으며, 다른 인물은 기념물과 추모 명판으로 기려집니다. 의회 건물의 시계탑은 2012년 엘리자베스 타워로 이름이 바뀌었습니다. ‘빅벤’은 탑 전체가 아니라 안의 13.7톤 대종을 가리킵니다. 제2차 세계대전 중 시계 문자판 조명은 정전 규정에 따라 꺼졌으며, 전쟁 내내 종이 끊임없이 울렸다는 이야기는 여기서 확인된 사실로 단정하지 않습니다.',
        en: 'Westminster Abbey has been the setting for English and British coronations since William the Conqueror’s in 1066. Around 3,300 people are buried in the Abbey; many others are commemorated with monuments and plaques. The clock tower at the Palace of Westminster was renamed Elizabeth Tower in 2012. “Big Ben” properly refers to the 13.7-ton Great Bell inside it, not the whole tower. During the Second World War the clock dials were darkened under blackout rules; the claim that the bell rang continuously throughout the war is not stated here as established fact.',
        ja: 'ウェストミンスター寺院は、1066年のウィリアム征服王以来、イングランドおよび英国君主の戴冠式が行われてきた場所です。寺院には約3,300人が埋葬され、ほかの多くの人々は記念碑や銘板で追悼されています。ウェストミンスター宮殿の時計塔は2012年にエリザベス・タワーと改称されました。「ビッグ・ベン」は塔全体ではなく、内部にある13.7トンの大鐘を指します。第二次世界大戦中、時計の文字盤は灯火管制により暗くされました。戦争中ずっと鐘が鳴り続けたという話は、確認済みの事実としては扱っていません。',
        zh: '威斯敏斯特教堂自1066年征服者威廉加冕以来，一直是英格兰及英国君主举行加冕礼的场所。教堂内约有3300人安葬，另有许多人通过纪念碑和铭牌受到纪念。威斯敏斯特宫的钟楼于2012年更名为伊丽莎白塔。“大本钟”严格来说指塔内重13.7吨的大钟，而非整座塔。第二次世界大战期间，钟面灯光按灯火管制要求熄灭；“战争期间大钟始终不停敲响”的说法在此不作为已证实事实。'
      },
      aliases: ['Westminster Abbey', 'Westminster', 'Big Ben', 'Elizabeth Tower', '웨스트민스터 사원', '웨스트민스터', '빅벤', '엘리자베스 타워', 'ウェストミンスター寺院', 'ビッグ・ベン', 'エリザベス・タワー', '威斯敏斯特教堂', '大本钟', '伊丽莎白塔'],
      sources: [
        {
          url: 'https://www.westminster-abbey.org/history/history-of-westminster-abbey',
          label: {
            ko: '웨스트민스터 사원 — 공식 역사', en: 'Westminster Abbey — Official history',
            ja: 'ウェストミンスター寺院 — 公式の歴史', zh: '威斯敏斯特教堂——官方历史'
          }
        },
        {
          url: 'https://www.parliament.uk/about/living-heritage/building/palace/big-ben/facts-figures/',
          label: {
            ko: '영국 의회 — 빅벤·엘리자베스 타워의 사실과 수치', en: 'UK Parliament — Big Ben and Elizabeth Tower: facts and figures',
            ja: '英国議会 — ビッグ・ベンとエリザベス・タワーの概要', zh: '英国议会——大本钟与伊丽莎白塔：事实与数据'
          }
        },
        {
          url: 'https://www.parliament.uk/about/living-heritage/building/palace/big-ben/building-clock-tower/key-dates-/',
          label: {
            ko: '영국 의회 — 시계탑 주요 연혁', en: 'UK Parliament — Elizabeth Tower key dates',
            ja: '英国議会 — 時計塔の主な年表', zh: '英国议会——钟楼重要时间节点'
          }
        }
      ]
    },
    {
      id: 'cologne-cathedral',
      place: {
        ko: '독일 · 쾰른', en: 'Germany · Cologne', ja: 'ドイツ・ケルン', zh: '德国·科隆'
      },
      name: {
        ko: '쾰른 대성당', en: 'Cologne Cathedral', ja: 'ケルン大聖堂', zh: '科隆大教堂'
      },
      history: {
        ko: '쾰른 대성당은 1248년에 초석을 놓았지만, 공사는 16세기부터 300년 넘게 중단됐다가 19세기에 재개되어 1880년 완공됐습니다. 서쪽 정면의 중세 설계도 일부가 1814년과 1816년에 다시 발견되어 완공 과정의 길잡이가 됐습니다. 제2차 세계대전 중 성당은 여러 차례 폭탄을 맞아 큰 피해를 입었지만 구조가 남았습니다. 항법 기준점으로 쓰였다는 설명은 있지만, 연합군이 일부러 폭격을 피했다는 근거는 확인되지 않았습니다. 산업·도시 오염은 석재 일부에 검은 풍화 피각이 생기는 데 기여했지만, 모든 어두운 표면을 매연만으로 설명할 수는 없습니다.',
        en: 'The foundation stone of Cologne Cathedral was laid in 1248. Work stopped for more than 300 years from the 16th century, resumed in the 19th century and reached completion in 1880. Parts of a medieval design for the west front were rediscovered in 1814 and 1816 and helped guide the finish. The cathedral was hit repeatedly and badly damaged during the Second World War, though its structure survived. It served as a visible navigation reference, but there is no verified basis for saying Allied forces deliberately spared it from bombing. Urban and industrial pollution contributed to dark weathering crusts on some stone; not every dark surface can be attributed to soot alone.',
        ja: 'ケルン大聖堂は1248年に定礎されましたが、16世紀から300年以上工事が中断し、19世紀に再開されて1880年に完成しました。西正面の中世設計図の一部が1814年と1816年に再発見され、完成時の指針となりました。第二次世界大戦中、大聖堂は何度も爆撃を受けて大きな損傷を受けましたが、構造は残りました。航法上の目印になったという説明はありますが、連合軍が意図的に爆撃を避けたという根拠は確認されていません。都市・産業汚染は一部の石材に黒色の風化皮膜を生じさせましたが、暗い表面すべてを煤だけで説明することはできません。',
        zh: '科隆大教堂于1248年奠基，但工程从16世纪起中断了300多年，直到19世纪才恢复，并于1880年建成。西立面的部分中世纪设计图于1814年和1816年重新发现，为后续完工提供了依据。第二次世界大战期间，大教堂多次遭到轰炸并严重受损，但主体结构留存。它曾是醒目的导航参照物，但没有可靠依据证明盟军因此有意避免轰炸。城市与工业污染促成了部分石材表面黑色风化层的形成，但不能把所有暗色表面都归因于烟尘。'
      },
      aliases: ['Cologne Cathedral', 'Kölner Dom', 'Kolner Dom', '쾰른 대성당', '쾰른 성당', 'ケルン大聖堂', '科隆大教堂'],
      sources: [
        {
          url: 'https://www.koelner-dom.de/erleben/geschichte',
          label: {
            ko: '쾰른 대성당 — 공식 역사', en: 'Cologne Cathedral — Official history',
            ja: 'ケルン大聖堂 — 公式の歴史', zh: '科隆大教堂——官方历史'
          }
        },
        {
          url: 'https://www.nationalww2museum.org/war/articles/ruins-cologne',
          label: {
            ko: '미국 국립 제2차대전 박물관 — 폐허 속 쾰른', en: 'The National WWII Museum — Cologne in ruins',
            ja: '米国国立第二次世界大戦博物館 — 廃墟のケルン', zh: '美国国家二战博物馆——废墟中的科隆'
          }
        },
        {
          url: 'https://link.springer.com/article/10.1007/s12665-012-2161-6',
          label: {
            ko: 'Environmental Earth Sciences — 대기오염과 석재 풍화 연구', en: 'Environmental Earth Sciences — Study of air pollution and stone decay',
            ja: 'Environmental Earth Sciences — 大気汚染と石材劣化の研究', zh: 'Environmental Earth Sciences——空气污染与石材风化研究'
          }
        }
      ]
    },
    {
      id: 'granada-cathedral',
      place: {
        ko: '스페인 · 그라나다', en: 'Spain · Granada', ja: 'スペイン・グラナダ', zh: '西班牙·格拉纳达'
      },
      name: {
        ko: '그라나다 대성당', en: 'Granada Cathedral', ja: 'グラナダ大聖堂', zh: '格拉纳达大教堂'
      },
      history: {
        ko: '그라나다 대성당은 1492년 정복 직후 세워진 건물이 아니라, 1523년 초석을 놓고 공사를 시작해 1704년에 주요 공사가 마무리됐습니다. 엔리케 에가스가 고딕 양식으로 시작한 설계는 1528년 디에고 데 실로에가 이어받아 르네상스식으로 크게 바뀌었습니다. 내부에서는 흰빛의 공간과 금빛 별이 그려진 푸른 천장이 돋보입니다. 대성당의 공식 연혁은 1704년 옛 도심 모스크가 철거된 일을 기록하지만, 그 모스크 자리에 세운 건물은 대성당이 아니라 이웃한 사그라리오 성당으로 구분합니다.',
        en: 'Granada Cathedral was not built immediately after the 1492 conquest: its foundation stone was laid in 1523, and the main building work was recorded as ending in 1704. Enrique Egas began with a Gothic design; Diego de Siloé took over in 1528 and substantially reshaped it in Renaissance style. Inside, the bright space and a blue ceiling with gold stars stand out. The cathedral’s official history records the demolition of an old city mosque in 1704, but identifies the church built on that site as the adjoining Sagrario, not the cathedral itself.',
        ja: 'グラナダ大聖堂は1492年の征服直後に建てられたものではありません。1523年に定礎され、主要な建設工事は1704年に終了したと記録されています。エンリケ・エガスがゴシック様式で始めた設計を、1528年に引き継いだディエゴ・デ・シロエがルネサンス様式へ大きく変更しました。内部では明るい空間と、金色の星が描かれた青い天井が目を引きます。大聖堂の公式沿革は1704年に旧市街のモスクが取り壊されたことを記録していますが、その跡地に建てられたのは大聖堂ではなく、隣接するサグラリオ教会と区別しています。',
        zh: '格拉纳达大教堂并非在1492年征服后立即兴建：其奠基时间为1523年，主要建筑工程记载于1704年结束。恩里克·埃加斯最初采用哥特式设计；1528年接手的迭戈·德·西洛埃将方案大幅改为文艺复兴风格。内部明亮的空间与绘有金色星星的蓝色天顶尤为醒目。大教堂官方沿革记载，1704年旧城一座清真寺被拆除；但建在该址的是相邻的萨格拉里奥教堂，而非大教堂本身。'
      },
      aliases: ['Granada Cathedral', 'Catedral de Granada', '그라나다 대성당', '그라나다 성당', 'グラナダ大聖堂', '格拉纳达大教堂'],
      sources: [
        {
          url: 'https://catedraldegranada.com/la-catedral/su-historia/historia-la-catedral/1506-1528-comienzos-de-la-construccion/',
          label: {
            ko: '그라나다 대성당 — 건설 초기 공식 연혁', en: 'Granada Cathedral — Official history of its early construction',
            ja: 'グラナダ大聖堂 — 建設初期の公式沿革', zh: '格拉纳达大教堂——早期建造官方沿革'
          }
        },
        {
          url: 'https://catedraldegranada.com/la-catedral/arquitectura-decoracion-2/la-luz-interior/',
          label: {
            ko: '그라나다 대성당 — 내부의 빛과 장식', en: 'Granada Cathedral — Light and interior decoration',
            ja: 'グラナダ大聖堂 — 内部の光と装飾', zh: '格拉纳达大教堂——内部光线与装饰'
          }
        },
        {
          url: 'https://catedraldegranada.com/la-catedral/su-historia/datos-y-fechas/siglo-xviii/',
          label: {
            ko: '그라나다 대성당 — 18세기 연혁', en: 'Granada Cathedral — 18th-century chronology',
            ja: 'グラナダ大聖堂 — 18世紀の沿革', zh: '格拉纳达大教堂——18世纪沿革'
          }
        }
      ]
    },
    {
      id: 'granada-royal-chapel',
      place: {
        ko: '스페인 · 그라나다', en: 'Spain · Granada', ja: 'スペイン・グラナダ', zh: '西班牙·格拉纳达'
      },
      name: {
        ko: '그라나다 왕실 예배당', en: 'Royal Chapel of Granada', ja: 'グラナダ王室礼拝堂', zh: '格拉纳达王室礼拜堂'
      },
      history: {
        ko: '그라나다 왕실 예배당은 이사벨 1세와 페르난도 2세가 자신들의 안식처로 정해 세우게 한 왕실 묘소입니다. 예배당은 1505~1517년에 지어졌습니다. 이사벨은 1504년 사망 뒤 먼저 알함브라의 프란치스코회 수도원에 안치됐고, 두 군주의 유해는 1521년 예배당 지하 묘실로 옮겨졌습니다. 위의 정교한 대리석 무덤은 기념 조각이며, 실제 매장 장소는 그 아래의 소박한 묘실입니다. 그라나다를 매장지로 정한 것은 확인되지만, 이를 정복 업적 때문이라고 직접 말한 인용문은 확인되지 않았습니다.',
        en: 'The Royal Chapel of Granada was commissioned as the burial place chosen by Isabella I and Ferdinand II. It was built between 1505 and 1517. Isabella was first laid to rest at a Franciscan convent at the Alhambra after her death in 1504; the monarchs’ remains were moved to the chapel’s crypt in 1521. The elaborate marble tombs above are sculpted monuments, while the actual burial place is the simpler crypt below. Their choice of Granada is documented, but no verified quotation directly says it was because of the conquest.',
        ja: 'グラナダ王室礼拝堂は、イサベル1世とフェルナンド2世が自らの埋葬地として定め、建設を命じた王室墓所です。礼拝堂は1505～1517年に建てられました。イサベルは1504年の死後、まずアルハンブラのフランシスコ会修道院に埋葬され、両君主の遺骸は1521年に礼拝堂の地下墓所へ移されました。上部の精巧な大理石墓は彫刻による記念碑で、実際の埋葬場所はその下にある質素な地下墓所です。グラナダを選んだ事実は確認できますが、征服が理由だと直接述べた確かな引用は確認されていません。',
        zh: '格拉纳达王室礼拜堂是伊莎贝拉一世与费尔南多二世指定的王室安葬地，建于1505至1517年。伊莎贝拉于1504年去世后，最初安葬在阿尔罕布拉的一座方济各会修道院；两位君主的遗骸于1521年迁入礼拜堂地下墓室。上方精美的大理石陵墓是雕刻纪念碑，实际安葬地点是下方较为朴素的墓室。两人选择格拉纳达作为安葬地有史料记录，但尚未找到“因为征服成就而选择这里”的可靠直接引语。'
      },
      aliases: ['Royal Chapel of Granada', 'Granada Royal Chapel', 'Capilla Real', 'Capilla Real de Granada', '그라나다 왕실 예배당', '왕실 예배당', 'グラナダ王室礼拝堂', '王室礼拝堂', '格拉纳达王室礼拜堂', '王室礼拜堂'],
      sources: [
        {
          url: 'https://capillarealgranada.com/en/the-history/',
          label: {
            ko: '그라나다 왕실 예배당 — 공식 역사', en: 'Royal Chapel of Granada — Official history',
            ja: 'グラナダ王室礼拝堂 — 公式の歴史', zh: '格拉纳达王室礼拜堂——官方历史'
          }
        },
        {
          url: 'https://capillarealgranada.com/en/the-temple/the-royal-mausoleums-and-the-crypt/',
          label: {
            ko: '그라나다 왕실 예배당 — 왕실 묘소와 지하 묘실', en: 'Royal Chapel of Granada — Royal mausoleums and crypt',
            ja: 'グラナダ王室礼拝堂 — 王室墓所と地下墓所', zh: '格拉纳达王室礼拜堂——王室陵墓与地下墓室'
          }
        }
      ]
    },
    {
      id: 'almudena-cathedral',
      place: {
        ko: '스페인 · 마드리드', en: 'Spain · Madrid', ja: 'スペイン・マドリード', zh: '西班牙·马德里'
      },
      name: {
        ko: '알무데나 대성당', en: 'Almudena Cathedral', ja: 'アルムデナ大聖堂', zh: '阿穆德纳主教座堂'
      },
      history: {
        ko: '알무데나 대성당은 1883년 기초석을 놓을 때 왕비 마리아 데 라스 메르세데스를 기리는 교회로 계획됐습니다. 1885년 마드리드 교구가 세워지면서 대성당 계획으로 이어졌고, 처음 구상된 네오고딕 설계는 왕궁과 조화를 이루는 고전주의적 외관으로 바뀌었습니다. 지하 성당은 네오로마네스크 양식입니다. 성 요한 바오로 2세 교황은 1993년 이 성당을 봉헌했습니다. 다양한 건축 양식은 공사가 오래 걸린 도시·교회 역사를 보여줍니다.',
        en: 'When its foundation stone was laid in 1883, the Almudena project was planned as a church commemorating Queen María de las Mercedes. After the Diocese of Madrid was established in 1885, the plan developed into a cathedral. An initial Neo-Gothic design gave way to a more classical exterior intended to harmonize with the Royal Palace; the crypt is Neo-Romanesque. Pope John Paul II consecrated the cathedral in 1993. Its different architectural languages reflect a long history of changing plans.',
        ja: 'アルムデナ大聖堂は、1883年に定礎された当初、マリア・デ・ラス・メルセデス王妃を記念する教会として計画されました。1885年にマドリード教区が設置されると、大聖堂の計画へと発展しました。当初のネオ・ゴシック案は王宮と調和する古典主義的な外観へ変更され、地下聖堂はネオ・ロマネスク様式です。ヨハネ・パウロ2世教皇は1993年に大聖堂を献堂しました。異なる建築様式には、計画が長い年月をかけて変化した歴史が表れています。',
        zh: '阿穆德纳大教堂于1883年奠基时，最初计划建成纪念玛丽亚·德·拉斯·梅塞德斯王后的教堂。1885年马德里教区成立后，项目转为建造主教座堂。最初的新哥特式方案后来改为与王宫协调的古典主义外观；地下教堂则为新罗曼式。教皇约翰·保罗二世于1993年为大教堂举行祝圣仪式。不同建筑风格展现了项目历经多年变更的城市与教会历史。'
      },
      aliases: ['Almudena Cathedral', 'Catedral de la Almudena', 'Almudena', '알무데나 대성당', '알무데나', 'アルムデナ大聖堂', 'アルムデナ', '阿穆德纳主教座堂', '阿穆德纳大教堂'],
      sources: [
        {
          url: 'https://catedraldelaalmudena.es/historia-de-la-catedral/',
          label: {
            ko: '알무데나 대성당 — 공식 역사', en: 'Almudena Cathedral — Official history',
            ja: 'アルムデナ大聖堂 — 公式の歴史', zh: '阿穆德纳大教堂——官方历史'
          }
        },
        {
          url: 'https://www.esmadrid.com/en/tourist-information/catedral-de-la-almudena',
          label: {
            ko: '마드리드 공식 관광 안내 — 알무데나 대성당', en: 'Official Madrid tourism — Almudena Cathedral',
            ja: 'マドリード公式観光案内 — アルムデナ大聖堂', zh: '马德里官方旅游信息——阿穆德纳大教堂'
          }
        },
        {
          url: 'https://www.esmadrid.com/en/tourist-information/crypt-almudena-cathedral',
          label: {
            ko: '마드리드 공식 관광 안내 — 지하 성당 양식', en: 'Official Madrid tourism — The cathedral crypt',
            ja: 'マドリード公式観光案内 — 地下聖堂', zh: '马德里官方旅游信息——大教堂地下堂'
          }
        }
      ]
    }
  ];

  function getLanguage(value) {
    var code = String(value || (typeof window !== 'undefined' && window.currentLang) || 'ko').toLowerCase().split(/[-_]/)[0];
    return LANGS.indexOf(code) >= 0 ? code : 'ko';
  }

  function escapeHtml(value) {
    return String(value == null ? '' : value).replace(/[&<>"']/g, function (char) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char];
    });
  }

  function cardHtml(item, lang, labels) {
    var sourceLinks = item.sources.map(function (source) {
      return '<li><a href="' + escapeHtml(source.url) + '" target="_blank" rel="noopener noreferrer">' + escapeHtml(source.label[lang]) + ' ↗</a></li>';
    }).join('');
    return '<article class="cathedral-history-card" id="cathedral-history-' + escapeHtml(item.id) + '">' +
      '<div class="cathedral-history-place">' + escapeHtml(item.place[lang]) + '</div>' +
      '<h4>' + escapeHtml(item.name[lang]) + '</h4>' +
      '<p>' + escapeHtml(item.history[lang]) + '</p>' +
      '<div class="cathedral-history-sources"><strong>' + escapeHtml(labels.sources) + '</strong><ul>' + sourceLinks + '</ul></div>' +
      '</article>';
  }

  function renderEuropeanCathedralHistoryGuide(lang) {
    var mount = document.getElementById('europe-cathedral-history-guide');
    if (!mount) return false;
    var currentLang = getLanguage(lang);
    var labels = UI[currentLang];
    mount.innerHTML = '<section class="cathedral-history-guide" lang="' + currentLang + '">' +
      '<style>' +
      '#europe-cathedral-history-guide .cathedral-history-guide{box-sizing:border-box;max-width:1180px;margin:1.4rem auto 2rem;padding:clamp(16px,2.4vw,28px);border:1px solid #d7dfdc;border-radius:18px;background:linear-gradient(145deg,#fbf9f3,#fff);color:#20322d;font:inherit;line-height:1.65;overflow-wrap:anywhere;box-shadow:0 8px 24px rgba(35,51,44,.07)}' +
      '#europe-cathedral-history-guide .cathedral-history-guide *{box-sizing:border-box}' +
      '#europe-cathedral-history-guide .cathedral-history-header{margin:0 0 18px;padding:0 0 14px;border-bottom:1px solid #dce5e0}' +
      '#europe-cathedral-history-guide h3{margin:0 0 7px;font-size:clamp(1.2rem,2.4vw,1.65rem);line-height:1.3;color:#163d32}' +
      '#europe-cathedral-history-guide .cathedral-history-intro{margin:0;color:#4d5c56;max-width:76ch}' +
      '#europe-cathedral-history-guide .cathedral-history-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px}' +
      '#europe-cathedral-history-guide .cathedral-history-card{min-width:0;padding:17px 18px;border:1px solid #e1e6e2;border-radius:13px;background:#fff;box-shadow:0 3px 12px rgba(22,61,50,.045)}' +
      '#europe-cathedral-history-guide .cathedral-history-place{margin-bottom:3px;color:#557065;font-size:.82rem;font-weight:700;letter-spacing:.02em}' +
      '#europe-cathedral-history-guide h4{margin:0 0 9px;color:#173f33;font-size:1.08rem;line-height:1.4}' +
      '#europe-cathedral-history-guide .cathedral-history-card p{margin:0;color:#2f3c37;line-height:1.68}' +
      '#europe-cathedral-history-guide .cathedral-history-sources{margin-top:12px;padding-top:10px;border-top:1px solid #edf0ee;font-size:.88rem}' +
      '#europe-cathedral-history-guide .cathedral-history-sources strong{color:#476158}' +
      '#europe-cathedral-history-guide .cathedral-history-sources ul{margin:5px 0 0;padding-left:1.2rem}' +
      '#europe-cathedral-history-guide .cathedral-history-sources li{margin:3px 0}' +
      '#europe-cathedral-history-guide a{color:#075985;text-decoration:underline;text-underline-offset:2px;overflow-wrap:anywhere}' +
      '@media(max-width:700px){#europe-cathedral-history-guide .cathedral-history-grid{grid-template-columns:1fr}#europe-cathedral-history-guide .cathedral-history-card{padding:15px 14px}#europe-cathedral-history-guide .cathedral-history-guide{border-radius:12px;margin:1rem auto 1.5rem}}' +
      '</style>' +
      '<div class="cathedral-history-header"><h3>' + escapeHtml(labels.title) + '</h3><p class="cathedral-history-intro">' + escapeHtml(labels.intro) + '</p></div>' +
      '<div class="cathedral-history-grid">' + ITEMS.map(function (item) { return cardHtml(item, currentLang, labels); }).join('') + '</div>' +
      '</section>';
    return true;
  }

  var HISTORY_TERMS = [
    'history', 'historical', 'story', 'origin', 'origins', 'heritage', 'tell me about', 'what is', 'what was', 'architecture', 'architectural', 'background', 'why is', 'facts', 'details', 'what to see', 'highlights', 'look for',
    '역사', '유래', '연혁', '기원', '배경', '역사적', '건축', '설명', '알려줘', '관람 포인트', '볼거리', '어떤 곳', '무엇인가', '역사 이야기', '건립', '건설',
    '歴史', '由来', '沿革', '起源', '背景', '建築', '説明', '教えて', '紹介', '見どころ', '鑑賞ポイント', '見るべき', 'どんな場所', 'とは',
    '历史', '来历', '沿革', '由来', '背景', '建筑', '介绍', '讲讲', '看点', '必看', '参观重点', '看什么', '是什么', '为什么'
  ];

  function normalizeQuery(value) {
    return String(value || '').toLocaleLowerCase().normalize('NFKC').normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '').normalize('NFC')
      .replace(/[’'`]/g, ' ').replace(/[^a-z0-9\u3040-\u30ff\u3400-\u9fff\uac00-\ud7af]+/g, ' ').trim().replace(/\s+/g, ' ');
  }

  function buildEuropeanCathedralHistoryChatResponse(query, lang) {
    var normalized = normalizeQuery(query);
    if (!normalized || !HISTORY_TERMS.some(function (term) { return normalized.indexOf(normalizeQuery(term)) !== -1; })) return null;
    var currentLang = getLanguage(lang);
    var match = ITEMS.find(function (item) {
      return item.aliases.some(function (alias) {
        var candidate = normalizeQuery(alias);
        return candidate && normalized.indexOf(candidate) !== -1;
      });
    });
    if (!match) return null;
    var sourceLinks = match.sources.map(function (source) {
      return '<a href="' + escapeHtml(source.url) + '" target="_blank" rel="noopener noreferrer">' + escapeHtml(source.label[currentLang]) + ' ↗</a>';
    }).join('<br>');
    var labels = UI[currentLang];
    return '<div class="chat-history-answer" style="background:#f2f8f5;border:1px solid #d4e0d7;border-radius:14px;padding:12px 14px;line-height:1.65;">' +
      '<strong style="color:#1a5249;">🏛️ ' + escapeHtml(match.name[currentLang]) + '</strong>' +
      '<p style="white-space:pre-line;margin:7px 0;color:#40534e;">' + escapeHtml(match.history[currentLang]) + '</p>' +
      '<strong>' + escapeHtml(labels.sources) + ':</strong><br>' + sourceLinks + '</div>';
  }

  if (typeof window !== 'undefined') {
    window.renderEuropeanCathedralHistoryGuide = renderEuropeanCathedralHistoryGuide;
    window.buildEuropeanCathedralHistoryChatResponse = buildEuropeanCathedralHistoryChatResponse;
    window.EUROPEAN_CATHEDRAL_HISTORY_DATA = ITEMS;
  }
}());
