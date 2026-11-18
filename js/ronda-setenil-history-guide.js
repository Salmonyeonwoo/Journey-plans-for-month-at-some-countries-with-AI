(function () {
  'use strict';

  var LANGS = ['ko', 'en', 'ja', 'zh'];
  var COPY = {
    ko: {
      heading: '론다 & 세테닐 · 역사와 건축',
      intro: '두 마을의 역사·건축을 소개하는 일반 안내입니다. 일정이나 예약은 변경하지 않습니다. 치수와 연대가 자료마다 다른 경우에는 그 차이를 함께 밝혔습니다.',
      sourceLabel: '근거 자료',
      imageSource: '사용자 제공 사진',
      photoCropBystander: '사진 아래쪽의 방문객을 제외해 크롭했습니다.',
      photoCropPerson: '왼쪽 전경의 행인을 제외해 크롭했습니다.',
      cards: {
        tajo: {
          title: '엘 타호 협곡 · 지질과 자연 방어',
          body: '엘 타호는 과달레빈강의 침식으로 형성된 협곡입니다. 기반 지층은 후기 미오세 퇴적물로, 역암·모래·석회질 사암 등을 포함합니다. 강의 침식 기간을 “수백만 년”이라고 단정하는 것과 암석을 석회암 하나로 설명하는 것은 정확하지 않습니다. 공식 안내 치수도 다릅니다. 안달루시아 자치정부는 길이 약 500m·깊이 100m·너비 50m, 말라가 주정부는 깊이 120m·너비 약 70m로 소개하며 측정 기준은 밝히지 않습니다. 협곡과 강은 무어 시대 도시 방어에 유리했지만, 성벽과 성문도 방어 체계의 일부였습니다. 따라서 “난공불락의 해자”나 도시 형성의 단일 원인으로 단정하지 않습니다.'
        },
        church: {
          title: '산타 마리아 라 마요르 성당 · 모스크와 종탑',
          body: '론다는 1485년 가톨릭 군주에게 정복되었고, 산타 마리아 라 마요르 성당은 옛 금요 대사원(알자마 모스크) 터에 세워졌습니다. 모스크의 미흐랍과 장식 일부가 남아 있으며, 종탑에는 옛 사각형 미나렛의 기단 잔존부가 포함됩니다. 안내 자료는 탑을 무데하르 양식, 꼭대기 종루를 고딕 이사벨 양식으로 설명합니다. 성당은 여러 단계에 걸쳐 조성되었습니다. 성당·교구 안내는 1486년 착수를 적지만, 최근 학술 연구는 첫 성당 건립을 16세기 초로 봅니다. 따라서 1485년 정복 직후 건립 명령이 내려졌다고 단정하지 않습니다.'
        },
        socorro: {
          title: '소코로 광장 · 1918년 론다 총회',
          body: '1918년 안달루시아 지역주의 총회는 소코로 광장에 면한 Círculo de Artistas에서 Centro Andaluz의 주최로 열렸습니다. 블라스 인판테가 제안한 흰색·녹색 깃발과 헤라클레스 문장이 안달루시아의 상징으로 채택되었습니다. 당시 회의록은 남아 있지 않고 개최 기간 표기도 자료마다 다릅니다. 따라서 이곳을 상징 채택의 장소로 소개하되, 깃발이 이 광장에서 역사상 처음 게양되었다고 단정하지 않습니다.'
        },
        setenilName: {
          title: '세테닐 · 이름의 전승과 재정복',
          body: '세테닐은 중세 이슬람기의 성곽 취락이었습니다. 시청 연혁에 따르면 1407년 공성은 실패했고, 이후 총 일곱 차례 포위된 끝에 1484년 9월 21일 함락되었습니다. 따라서 “일곱 번 실패한 뒤 함락”보다는 “총 일곱 차례 포위되었고 마지막 포위에서 함락”이라고 설명하는 편이 시청 기록에 맞습니다. Setenil이 라틴어 septem nihil(“일곱 번 헛수고”)에서 왔다는 설명은 널리 전해지는 전승일 뿐, 확정된 어원은 아닙니다. “de las Bodegas”는 포도 재배·와인 저장 전통과 연결되며 일부 학자는 15세기 포도 재배 정착기와 관련짓지만, 정확한 명칭 채택 시기는 확인되지 않았습니다.'
        },
        setenilRock: {
          title: '세테닐 · 바위 주거와 성채',
          body: '마을의 풍경은 강이 만든 협곡과 암반에 적응한 주거가 함께 빚어냈습니다. 안내 자료는 협곡 구간의 강 이름을 과달포르쿤강과 트레호강으로 각각 표기합니다. 집들은 암반 아래에 자리하거나 바위에 기대고 그 위에 놓이기도 하며, 일부는 바위 처마를 지붕처럼 활용합니다. 모든 집이 한 가지 공법으로 지어졌거나 늘 시원·따뜻하다고 단정할 수는 없습니다. 그늘과 암반은 직사광과 실내 온도 변동을 줄이는 데 도움을 줄 수 있지만 주택마다 조건이 다릅니다. 보존된 토레 델 오메나헤는 관광 안내에서 13세기 중반 나자리 건축으로, 탑 아래 저수조는 알모하드 시기의 것으로 설명됩니다. 성채 전체의 연대는 다른 안내에서 14~15세기로도 제시되므로 탑·저수조·성채를 구분해 보는 편이 정확합니다.'
        }
      }
    },
    en: {
      heading: 'Ronda & Setenil · history and architecture',
      intro: 'A general guide to the history and architecture of the two towns. It does not change the itinerary or bookings. Where sources differ on measurements or dates, the difference is stated.',
      sourceLabel: 'Sources',
      imageSource: 'User-provided photo',
      photoCropBystander: 'The lower plaza visitors were cropped out.',
      photoCropPerson: 'The foreground bystander on the left was cropped out.',
      cards: {
        tajo: {
          title: 'El Tajo Gorge · geology and natural defense',
          body: 'El Tajo is a gorge shaped by erosion from the Guadalevín River. The underlying strata are Late Miocene sediments, including conglomerate, sand and calcareous sandstone. It is too simple to say that the river carved limestone for “millions of years”: the age of the rock and the duration of gorge erosion are different questions. Official measurements also differ. The Andalusian regional government gives about 500 m in length, 100 m in depth and 50 m in width; Málaga Provincial Council gives 120 m in depth and about 70 m in width. Neither page states a common measurement method. The gorge and river helped defend the Moorish-era town, alongside its walls and gates. Calling it an “impenetrable moat” or the single cause of the town’s foundation would overstate the evidence.'
        },
        church: {
          title: 'Santa María la Mayor · mosque and bell tower',
          body: 'Ronda was taken by the Catholic Monarchs in 1485, and Santa María la Mayor stands on the site of the former Friday (aljama) mosque. Parts of the mosque, including the mihrab and decoration, survive. The bell tower incorporates surviving remains of the base of an earlier square minaret. Visitor information describes the tower as Mudéjar and the upper bell tier as Gothic-Isabelline. The church was built in stages. Church and diocesan pages give a start in 1486, while recent scholarship places the first church in the early 16th century. The evidence does not establish an immediate building order in 1485.'
        },
        socorro: {
          title: 'Plaza del Socorro · the 1918 Ronda Assembly',
          body: 'The 1918 Andalusian regionalist assembly was held at the Círculo de Artistas, facing Plaza del Socorro, and organized by the Centro Andaluz. The white-and-green flag and the emblem of Hercules proposed by Blas Infante were adopted as Andalusian symbols. No minutes of the meeting survive, and sources give slightly different date ranges. The square can be described as the place associated with adopting the symbols, but the evidence does not prove that the flag was first raised there.'
        },
        setenilName: {
          title: 'Setenil · the name tradition and reconquest',
          body: 'Setenil was a fortified settlement in the medieval Islamic period. The town hall’s history says a siege in 1407 failed and that the settlement was besieged seven times in total before it fell on 21 September 1484. In that account, the final siege succeeded, so “besieged seven times, finally captured in the last siege” is more accurate than “captured after seven failed sieges.” The derivation of Setenil from Latin septem nihil (“seven times nothing”) is a widely repeated tradition, not a confirmed etymology. “De las Bodegas” is linked to grape-growing and wine-storage traditions; some scholars connect the suffix with 15th-century vineyards, but its precise adoption date is not established.'
        },
        setenilRock: {
          title: 'Setenil · rock-shelter homes and the fortress',
          body: 'The townscape combines a river-cut gorge with homes adapted to the rock. Sources use both the names Guadalporcún and Trejo for the river in this stretch. Some homes sit beneath rock overhangs; others lean against or stand above the rock. It would be inaccurate to say that every house was built in the same way or is always cool in summer and warm in winter. Shade and rock cover can reduce direct sun and indoor temperature swings, but conditions vary by house. Tourism sources describe the surviving Torre del Homenaje as a mid-13th-century Nasrid work and the cistern below it as Almohad. Other guidance dates the fortress as a whole to the 14th–15th centuries, so the tower, cistern and fortress should not be assigned one date.'
        }
      }
    },
    ja: {
      heading: 'ロンダ＆セテニル · 歴史と建築',
      intro: '2つの町の歴史・建築を紹介する一般ガイドです。旅行日程や予約は変更しません。寸法や年代が資料によって異なる場合は、その違いを明記しています。',
      sourceLabel: '参考資料',
      imageSource: 'ユーザー提供写真',
      photoCropBystander: '広場下部の来訪者を避けてトリミングしています。',
      photoCropPerson: '左側手前の通行人を避けてトリミングしています。',
      cards: {
        tajo: {
          title: 'エル・タホ渓谷 · 地質と自然の防御',
          body: 'エル・タホはグアダレビン川の浸食によって形成された渓谷です。基盤には後期中新世の堆積層があり、礫岩・砂・石灰質砂岩などを含みます。「川が何百万年も石灰岩を削った」と一括りにするのは正確ではありません。岩石の形成時代と渓谷の浸食期間は別の問題です。公式案内の寸法も一致しません。アンダルシア州政府は長さ約500m・深さ100m・幅50m、マラガ県議会は深さ120m・幅約70mと紹介していますが、測定基準は共通して示されていません。渓谷と川はムーア時代の町の防御に役立ち、城壁や門も防御の一部でした。「難攻不落の堀」や町の成立の唯一の理由と断定するのは行き過ぎです。'
        },
        church: {
          title: 'サンタ・マリア・ラ・マヨール教会 · モスクと鐘楼',
          body: 'ロンダは1485年にカトリック両王に征服され、サンタ・マリア・ラ・マヨール教会は旧金曜大モスク（アルハマ・モスク）の跡地に建てられました。ミフラーブや装飾など、モスクの一部が残っています。鐘楼には、かつての四角いミナレットの基部の遺構が取り込まれています。教会の案内では塔をムデハル様式、上部の鐘楼部分をイサベル様式ゴシックと説明しています。建設は段階的に進みました。教会・教区の案内は1486年着工とする一方、近年の研究は最初の教会を16世紀初頭と位置づけています。1485年の直後に建設命令が出たと断定できる根拠はありません。'
        },
        socorro: {
          title: 'ソコロ広場 · 1918年ロンダ会議',
          body: '1918年のアンダルシア地域主義会議は、ソコロ広場に面したCírculo de Artistasで、Centro Andaluzの主催により開かれました。ブラス・インファンテが提案した白と緑の旗、ヘラクレスの紋章がアンダルシアのシンボルとして採択されました。会議録は残っておらず、開催期間も資料によって少し異なります。この場所はシンボル採択の場として説明できますが、旗がここで史上初めて掲揚されたと断定することはできません。'
        },
        setenilName: {
          title: 'セテニル · 地名の伝承と再征服',
          body: 'セテニルは中世イスラム期の城塞集落でした。町役場の沿革によると、1407年の包囲は失敗し、その後合計7回包囲された末、1484年9月21日に陥落しました。この記録では最後の包囲で陥落したため、「7回の失敗の後に陥落」より「合計7回包囲され、最後の包囲で陥落」が正確です。Setenilがラテン語のseptem nihil（「7回の空振り」）に由来するという説明は広く伝わる伝承で、確定した語源ではありません。「de las Bodegas」はブドウ栽培やワイン貯蔵の伝統と結びつけられ、一部の研究者は15世紀のブドウ畑に関連づけていますが、名称が付いた正確な時期は確認されていません。'
        },
        setenilRock: {
          title: 'セテニル · 岩陰の住居と城塞',
          body: '町並みは川が刻んだ渓谷と、岩盤に合わせて建てられた住居が一体となって形づくられています。この区間の川名は資料によってグアダルポルクン川、トレホ川と記されています。岩の張り出しの下にある家もあれば、岩に寄り添ったり岩上に建つ家もあります。すべての家が同じ工法で造られ、夏は涼しく冬は暖かいと一律に言うことはできません。岩陰は直射日光や室温変化を抑える助けになりますが、住居ごとに条件は異なります。観光資料は現存するトーレ・デル・オメナヘを13世紀半ばのナスル朝建築、その下の貯水槽をムワッヒド朝時代のものと説明します。一方、城塞全体は14〜15世紀とする案内もあるため、塔・貯水槽・城塞を分けて見る必要があります。'
        }
      }
    },
    zh: {
      heading: '龙达与塞特尼尔 · 历史与建筑',
      intro: '这是一份介绍两座小镇历史与建筑的一般指南，不会更改行程或预订。资料中的尺寸和年代不一致时，文中会说明差异。',
      sourceLabel: '参考来源',
      imageSource: '用户提供的照片',
      photoCropBystander: '已裁掉广场下方的游客。',
      photoCropPerson: '已裁掉左侧前景中的行人。',
      cards: {
        tajo: {
          title: '塔霍峡谷 · 地质与自然防御',
          body: '塔霍峡谷由瓜达莱温河的侵蚀作用形成。其地层主要为晚中新世沉积物，包括砾岩、砂和钙质砂岩等。把它概括为“河流用数百万年切割石灰岩”并不准确：岩石形成的年代与峡谷受侵蚀的时段是两个问题。官方资料给出的尺寸也不同。安达卢西亚自治区政府介绍其长约500米、深100米、宽50米；马拉加省政府则给出深120米、宽约70米，且两者都没有说明统一的测量标准。峡谷与河流有助于防守摩尔时期的城镇，但城墙和城门也是防御体系的一部分。因此不宜称其为“坚不可摧的护城河”，也不应说它是城镇形成的唯一原因。'
        },
        church: {
          title: '圣玛丽亚·拉·马约尔教堂 · 清真寺与钟楼',
          body: '龙达于1485年被天主教双王征服，圣玛丽亚·拉·马约尔教堂建在旧主麻大清真寺（aljama清真寺）遗址上。清真寺的米哈拉布和部分装饰仍有遗存。钟楼包含旧方形宣礼塔基座的遗迹。教堂资料将塔身描述为穆德哈尔式，顶部钟楼层为伊莎贝尔式哥特建筑。教堂经历了多个建设阶段。教堂和教区资料记载1486年开工，而近期学术研究把最初教堂的建设时间放在16世纪初。因此，不能断言它是在1485年征服后立即奉命兴建。'
        },
        socorro: {
          title: '索科罗广场 · 1918年龙达大会',
          body: '1918年安达卢西亚地方主义大会在面向索科罗广场的Círculo de Artistas举行，由Centro Andaluz组织。布拉斯·因凡特提议的白绿旗帜与赫拉克勒斯徽章被采纳为安达卢西亚象征。会议记录没有留存，而且不同资料记载的会期略有差异。可以将此处介绍为象征获采纳的地点，但现有证据不足以断言旗帜在这里“首次升起”。'
        },
        setenilName: {
          title: '塞特尼尔 · 名称传说与收复',
          body: '塞特尼尔是中世纪伊斯兰时期的堡垒聚落。市政府沿革称，1407年的围城失败，之后该地总共遭围困七次，最终于1484年9月21日陷落。按这一记载，最后一次围城取得成功，因此“总共围困七次，最后一次陷落”比“七次失败后才陷落”准确。“Setenil”源自拉丁语septem nihil（“七次徒劳”）的说法广为流传，但只是传说，并非已确认的词源。“de las Bodegas”与葡萄种植和酒窖传统有关；部分学者将其与15世纪葡萄种植联系起来，但该名称确切出现的时间尚未确定。'
        },
        setenilRock: {
          title: '塞特尼尔 · 岩下住宅与城堡',
          body: '这里的景观由河流切出的峡谷和适应岩壁建造的住宅共同形成。资料对这一段河流使用瓜达尔波尔昆河和特雷霍河两个名称。有些房屋位于岩檐下，也有房屋依岩而建或建在岩石上。不能笼统地说所有房屋采用同一种建法，或一年四季都冬暖夏凉。岩石遮阴可能减少直射阳光和室内温度波动，但每栋房屋的条件不同。旅游资料将现存的主塔称为13世纪中期纳斯里王朝建筑，并把塔下蓄水池归为阿尔摩哈德时期。其他资料则把整座堡垒定为14至15世纪，因此应区分塔楼、蓄水池和城堡整体的年代。'
        }
      }
    }
  };

  var IMAGES = {
    tajo: [
      {
        src: 'img/user-ronda-setenil/ronda-el-tajo-overlook.webp',
        alt: {
          ko: '론다 구시가지와 엘 타호 협곡의 절벽 가장자리 풍경',
          en: 'Ronda’s old town along the edge of El Tajo Gorge',
          ja: 'エル・タホ渓谷の崖沿いに広がるロンダ旧市街',
          zh: '龙达老城沿塔霍峡谷边缘分布的景色'
        },
        caption: {
          ko: '엘 타호와 절벽 위 구시가지 · 원본 사진의 먼 거리 인물은 식별하기 어렵습니다.',
          en: 'El Tajo and the cliff-top old town · people in the distance are not identifiable.',
          ja: 'エル・タホと崖上の旧市街 · 写真内の遠景の人物は判別できません。',
          zh: '塔霍峡谷与悬崖上的老城 · 远处人物无法辨认。'
        }
      },
      {
        src: 'img/user-ronda-setenil/ronda-el-tajo-cliff-view-cropped.webp',
        alt: {
          ko: '엘 타호 협곡 전망 파노라마',
          en: 'Panoramic view over El Tajo Gorge',
          ja: 'エル・タホ渓谷のパノラマ',
          zh: '塔霍峡谷全景'
        },
        caption: {
          ko: '사용자 제공 사진 · 왼쪽 전경의 행인을 제외해 크롭했습니다.',
          en: 'User photo · cropped to remove the foreground bystander on the left.',
          ja: 'ユーザー提供写真 · 左側手前の通行人を避けてトリミングしました。',
          zh: '用户提供的照片 · 已裁掉左侧前景中的行人。'
        }
      }
    ],
    church: [
      {
        src: 'img/user-ronda-setenil/ronda-santa-maria-tower-cropped.webp',
        alt: {
          ko: '론다 산타 마리아 라 마요르 성당의 종탑',
          en: 'Bell tower of Santa María la Mayor in Ronda',
          ja: 'ロンダのサンタ・マリア・ラ・マヨール教会の鐘楼',
          zh: '龙达圣玛丽亚·拉·马约尔教堂钟楼'
        },
        caption: {
          ko: '사용자 제공 사진 · 종탑을 남기고 광장 아래쪽 방문객을 제외했습니다.',
          en: 'User photo · the tower is retained and visitors in the lower plaza are cropped out.',
          ja: 'ユーザー提供写真 · 鐘楼を残し、広場下部の来訪者を除いています。',
          zh: '用户提供的照片 · 保留钟楼，并裁掉广场下方的游客。'
        }
      }
    ],
    socorro: [
      {
        src: 'img/user-ronda-setenil/ronda-plaza-socorro-user.webp',
        alt: {
          ko: '소코로 광장 안내에 사용자가 제공한 사진',
          en: 'User-provided photo for the Plaza del Socorro guide',
          ja: 'ソコロ広場の案内用にユーザーが提供した写真',
          zh: '用户为索科罗广场指南提供的照片'
        },
        caption: {
          ko: '소코로 광장 항목에 제공된 사진 · 전경 인물을 제외하도록 아래쪽을 크롭했습니다.',
          en: 'Photo supplied for Plaza del Socorro · the lower foreground was cropped to remove people.',
          ja: 'ソコロ広場の項目に提供された写真 · 手前の人物を避けて下部をトリミングしました。',
          zh: '用户为索科罗广场部分提供的照片 · 已裁掉下方前景人物。'
        }
      }
    ],
    setenilName: [
      {
        src: 'img/user-ronda-setenil/setenil-village-user.webp',
        alt: {
          ko: '세테닐 데 라스 보데가스 안내에 사용자가 제공한 사진',
          en: 'User-provided photo for the Setenil de las Bodegas guide',
          ja: 'セテニル・デ・ラス・ボデガスの案内用にユーザーが提供した写真',
          zh: '用户为塞特尼尔·德·拉斯·博德加斯指南提供的照片'
        },
        caption: {
          ko: '사용자 확인: 세테닐에서 촬영한 마을 전경입니다. 마을 안의 정확한 위치는 확인되지 않았으며 하단부를 크롭했습니다.',
          en: 'User confirmed this village view was taken in Setenil. The exact spot in town is unverified; the lower part was cropped.',
          ja: 'ユーザー確認済み：セテニルで撮影された町の眺めです。町内の正確な場所は未確認で、下部をトリミングしています。',
          zh: '用户已确认此小镇远景拍摄于塞特尼尔。镇内具体地点尚未核实；已裁掉下部。'
        }
      }
    ]
  };

  var SOURCES = {
    tajo: [
      ['Junta de Andalucía: Tajo de Ronda', 'https://www.juntadeandalucia.es/medioambiente/portal/web/ventanadelvisitante/detalle-buscador-mapa/-/asset_publisher/Jlbxh2qB3NwR/content/tajo-de-ronda/255035'],
      ['Málaga Provincial Council: geology of Tajo de Ronda', 'https://www.malaga.es/es/laprovincia/naturaleza/lis_cd-13623/tajo-de-ronda'],
      ['Ronda Tourism: Walls of Ronda', 'https://www.turismoderonda.es/en/ronda/que_ver/arquitectura_plazas_monumentos/murallas_de_ronda']
    ],
    church: [
      ['Real Colegiata de Santa María la Mayor: cultural visit', 'http://www.colegiataronda.com/index.php/es/visita-cultural-es'],
      ['Cobaleda & Ramírez González, Arts (2025): the Friday Mosque mihrab', 'https://www.mdpi.com/2076-0752/14/3/63'],
      ['Málaga Provincial Council: history of Ronda', 'https://www.malaga.es/en/laprovincia/tradiciones/lis_cd-3662/history-of-ronda']
    ],
    socorro: [
      ['Junta de Andalucía: Ronda and Andalusian autonomy', 'https://www.juntadeandalucia.es/presidencia/28f2022/ronda-donde-nacio-la-andalucia-autonomica/'],
      ['Centro de Estudios Andaluces: documents from the Ronda Assembly', 'https://www.centrodeestudiosandaluces.es/exposiciones/muestra-documental-sobre-la-bandera-con-originales-de-la-asamblea-de-ronda'],
      ['Ronda City Council: Andalusian Flag Day at the Círculo de Artistas', 'https://ayuntamientoronda.es/el-ayuntamiento-de-ronda-celebra-el-dia-de-la-bandera-andaluza-con-un-acto-ante-el-circulo-de-artistas/'],
      ['Museum of the Autonomy of Andalucía: from the Ronda Assembly to autonomy', 'https://www.museodelaautonomia.es/exposiciones/de-la-asamblea-de-ronda-al-4d-y-el-pacto-de-antequera']
    ],
    setenilName: [
      ['Setenil Town Hall: history', 'https://www.setenildelasbodegas.es/turismo/historia'],
      ['SUR in English: the uncertain origin of the name', 'https://www.surinenglish.com/andalucia/setenil-bodegas-seven-times-20230519121300-nt.html'],
      ['Setenil Town Hall: culture and the 1484 inscription', 'https://www.setenildelasbodegas.es/areas/cultura']
    ],
    setenilRock: [
      ['Andalucía Tourism: Setenil de las Bodegas', 'https://www.andalucia.org/blog/post/setenil-de-las-bodegas-la-perla-escondida-de-cadiz/'],
      ['Los Pueblos Más Bonitos de España: Río Trejo Canyon', 'https://lospueblosmasbonitosdeespana.org/recursos/canon-del-rio-trejo-setenil-de-las-bodegas'],
      ['Guía de Cádiz: Torre del Homenaje and cistern', 'https://www.guiadecadiz.com/es/torre-homenaje'],
      ['Los Pueblos Más Bonitos de España: tower and cistern', 'https://lospueblosmasbonitosdeespana.org/patrimonio/setenil-de-las-bodegas/torreon-y-aljibe']
    ]
  };

  var SOURCE_LABELS = {
    ko: {
      'Junta de Andalucía: Tajo de Ronda': '안달루시아 자치정부: 엘 타호',
      'Málaga Provincial Council: geology of Tajo de Ronda': '말라가 주정부: 엘 타호 지질유산',
      'Ronda Tourism: Walls of Ronda': '론다 관광청: 론다 성벽',
      'Real Colegiata de Santa María la Mayor: cultural visit': '산타 마리아 라 마요르 성당: 문화 관람 안내',
      'Cobaleda & Ramírez González, Arts (2025): the Friday Mosque mihrab': 'Cobaleda·Ramírez González, Arts 학술 논문(2025): 금요 대사원 미흐랍',
      'Málaga Provincial Council: history of Ronda': '말라가 주정부: 론다 역사',
      'Junta de Andalucía: Ronda and Andalusian autonomy': '안달루시아 자치정부: 론다와 안달루시아 자치의 역사',
      'Centro de Estudios Andaluces: documents from the Ronda Assembly': '안달루시아 연구센터: 론다 총회 사료',
      'Ronda City Council: Andalusian Flag Day at the Círculo de Artistas': '론다 시청: Círculo de Artistas의 안달루시아 깃발의 날',
      'Museum of the Autonomy of Andalucía: from the Ronda Assembly to autonomy': '안달루시아 자치 박물관: 론다 총회에서 자치로',
      'Setenil Town Hall: history': '세테닐 시청: 역사',
      'SUR in English: the uncertain origin of the name': 'SUR in English: 확정되지 않은 지명 유래',
      'Setenil Town Hall: culture and the 1484 inscription': '세테닐 시청: 문화유산과 1484년 명문',
      'Andalucía Tourism: Setenil de las Bodegas': '안달루시아 관광청: 세테닐 데 라스 보데가스',
      'Los Pueblos Más Bonitos de España: Río Trejo Canyon': '스페인 아름다운 마을 협회: 트레호강 협곡',
      'Guía de Cádiz: Torre del Homenaje and cistern': '카디스 안내: 토레 델 오메나헤와 저수조',
      'Los Pueblos Más Bonitos de España: tower and cistern': '스페인 아름다운 마을 협회: 탑과 저수조'
    },
    en: {},
    ja: {
      'Junta de Andalucía: Tajo de Ronda': 'アンダルシア州政府：ロンダのタホ',
      'Málaga Provincial Council: geology of Tajo de Ronda': 'マラガ県議会：タホの地質',
      'Ronda Tourism: Walls of Ronda': 'ロンダ観光局：ロンダの城壁',
      'Real Colegiata de Santa María la Mayor: cultural visit': 'サンタ・マリア・ラ・マヨール教会：見学案内',
      'Cobaleda & Ramírez González, Arts (2025): the Friday Mosque mihrab': 'Cobaleda・Ramírez González, Arts（2025）：金曜モスクのミフラーブ',
      'Málaga Provincial Council: history of Ronda': 'マラガ県議会：ロンダの歴史',
      'Junta de Andalucía: Ronda and Andalusian autonomy': 'アンダルシア州政府：ロンダと自治の歴史',
      'Centro de Estudios Andaluces: documents from the Ronda Assembly': 'アンダルシア研究センター：ロンダ会議の史料',
      'Ronda City Council: Andalusian Flag Day at the Círculo de Artistas': 'ロンダ市役所：Círculo de Artistasのアンダルシア旗の日',
      'Museum of the Autonomy of Andalucía: from the Ronda Assembly to autonomy': 'アンダルシア自治博物館：ロンダ会議から自治へ',
      'Setenil Town Hall: history': 'セテニル市役所：歴史',
      'SUR in English: the uncertain origin of the name': 'SUR in English：地名の未確定な語源',
      'Setenil Town Hall: culture and the 1484 inscription': 'セテニル市役所：文化遺産と1484年の碑文',
      'Andalucía Tourism: Setenil de las Bodegas': 'アンダルシア観光局：セテニル・デ・ラス・ボデガス',
      'Los Pueblos Más Bonitos de España: Río Trejo Canyon': 'スペインで最も美しい村：トレホ川の渓谷',
      'Guía de Cádiz: Torre del Homenaje and cistern': 'カディス案内：トーレ・デル・オメナヘと貯水槽',
      'Los Pueblos Más Bonitos de España: tower and cistern': 'スペインで最も美しい村：塔と貯水槽'
    },
    zh: {
      'Junta de Andalucía: Tajo de Ronda': '安达卢西亚自治区政府：龙达塔霍峡谷',
      'Málaga Provincial Council: geology of Tajo de Ronda': '马拉加省政府：塔霍峡谷地质',
      'Ronda Tourism: Walls of Ronda': '龙达旅游局：龙达城墙',
      'Real Colegiata de Santa María la Mayor: cultural visit': '圣玛丽亚·拉·马约尔教堂：文化参观指南',
      'Cobaleda & Ramírez González, Arts (2025): the Friday Mosque mihrab': 'Cobaleda与Ramírez González，《Arts》（2025）：主麻清真寺米哈拉布研究',
      'Málaga Provincial Council: history of Ronda': '马拉加省政府：龙达历史',
      'Junta de Andalucía: Ronda and Andalusian autonomy': '安达卢西亚自治区政府：龙达与安达卢西亚自治史',
      'Centro de Estudios Andaluces: documents from the Ronda Assembly': '安达卢西亚研究中心：龙达大会史料',
      'Ronda City Council: Andalusian Flag Day at the Círculo de Artistas': '龙达市政府：艺术家协会的安达卢西亚旗帜日活动',
      'Museum of the Autonomy of Andalucía: from the Ronda Assembly to autonomy': '安达卢西亚自治博物馆：从龙达大会到自治',
      'Setenil Town Hall: history': '塞特尼尔市政府：历史',
      'SUR in English: the uncertain origin of the name': 'SUR in English：尚未确定的地名词源',
      'Setenil Town Hall: culture and the 1484 inscription': '塞特尼尔市政府：文化遗产与1484年铭文',
      'Andalucía Tourism: Setenil de las Bodegas': '安达卢西亚旅游局：塞特尼尔·德·拉斯·博德加斯',
      'Los Pueblos Más Bonitos de España: Río Trejo Canyon': '西班牙最美小镇协会：特雷霍河峡谷',
      'Guía de Cádiz: Torre del Homenaje and cistern': '加的斯指南：主塔与蓄水池',
      'Los Pueblos Más Bonitos de España: tower and cistern': '西班牙最美小镇协会：塔楼与蓄水池'
    }
  };

  var TOPIC_ORDER = ['tajo', 'church', 'socorro', 'setenilName', 'setenilRock'];
  var TOPIC_ALIASES = {
    tajo: ['el tajo', 'tajo de ronda', 'guadalevin', 'guadalevín', '엘 타호', '엘타호', '과달레빈', '타호 협곡', 'エル・タホ', 'タホ渓谷', 'グアダレビン', '塔霍峡谷', '瓜达莱温'],
    church: ['santa maria la mayor', 'santa maría la mayor', 'colegiata de santa maria', 'mihrab', 'minaret', 'mudéjar tower', '산타 마리아 라 마요르', '미흐랍', '미나렛', '무데하르', 'サンタ・マリア・ラ・マヨール', 'ミフラーブ', 'ミナレット', '圣玛丽亚', '米哈拉布', '宣礼塔'],
    socorro: ['plaza del socorro', 'circulo de artistas', 'círculo de artistas', 'blas infante', 'andalusian flag', '안달루시아 깃발', '블라스 인판테', '소코로 광장', 'ソコロ広場', 'ブラス・インファンテ', 'アンダルシア旗', '索科罗广场', '布拉斯·因凡特', '安达卢西亚旗'],
    setenilName: ['septem nihil', 'seven times nothing', 'seven times no', 'de las bodegas', 'setenil history', '세테닐 이름', '세테닐 어원', 'セテニルの名前', 'セテニルの語源', '塞特尼尔名称', '塞特尼尔词源'],
    setenilRock: ['rock houses', 'rock-shelter', 'cave houses', 'cave dwellings', 'torre del homenaje', 'castillo de setenil', 'setenil castle', 'setenil fortress', '세테닐 바위', '세테닐 암굴', '세테닐 성채', '세테닐 성', 'トーレ・デル・オメナヘ', 'セテニルの岩', '岩窟住居', 'セテニル城', '塞特尼尔岩屋', '岩下住宅', '主塔', '塞特尼尔城堡']
  };

  function language(value) {
    var candidate = String(value || (typeof window !== 'undefined' && window.currentLang) || 'ko').toLowerCase();
    return LANGS.indexOf(candidate) >= 0 ? candidate : 'ko';
  }

  function escapeHtml(value) {
    return String(value == null ? '' : value).replace(/[&<>"']/g, function (char) {
      return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char];
    });
  }

  function normalizeQuery(value) {
    return String(value || '').normalize('NFKC').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').normalize('NFC').replace(/[’‘]/g, "'").replace(/\s+/g, ' ').trim();
  }

  function includesAlias(query, aliases) {
    return aliases.some(function (alias) {
      var needle = normalizeQuery(alias);
      if (!needle) return false;
      if (/^[a-z0-9]/i.test(needle)) {
        var escaped = needle.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        return new RegExp('(^|[^a-z0-9])' + escaped + '([^a-z0-9]|$)', 'i').test(query);
      }
      return query.indexOf(needle) >= 0;
    });
  }

  function itineraryOrDirections(query) {
    return /\b(?:itinerary|schedule|booking|booked|reservation|flight|airport|hotel|lodging|accommodation|route|directions|transit|transport|bus|train|taxi|metro|today|tomorrow|opening hours|tickets?|price|cost|day trip|mobility|wheelchair|accessibility|weather|forecast|parking|open|restaurant|restaurants|food|dining|lunch|dinner)\b/i.test(query) ||
      /(?:숙소|항공|비행|공항|예약|일정|동선|경로|가는 법|가는 방법|길 안내|교통|이동|버스|기차|택시|오늘|내일|영업시간|입장권|요금|가격|휠체어|접근성|날씨|기상|주차|맛집|식당|음식|점심|저녁|日程|旅程|予約|飛行機|空港|ホテル|経路|行き方|道順|交通|移動|バス|電車|今日|明日|営業時間|チケット|料金|車椅子|アクセス|天気|駐車場|レストラン|グルメ|昼食|夕食|行程|预订|航班|机场|酒店|路线|怎么去|交通|公交|火车|出租车|今天|明天|开放时间|门票|票价|价格|轮椅|无障碍|天气|停车|餐厅|美食|午饭|晚餐)/i.test(query);
  }

  function renderImages(topicId, lang) {
    var images = IMAGES[topicId] || [];
    if (!images.length) return '';
    return '<div class="rsh-photos">' + images.map(function (image) {
      return '<figure><img src="' + escapeHtml(image.src) + '" alt="' + escapeHtml(image.alt[lang]) + '" loading="lazy" decoding="async"><figcaption>' + escapeHtml(image.caption[lang]) + '</figcaption></figure>';
    }).join('') + '</div>';
  }

  function renderSources(topicId, lang) {
    var sources = SOURCES[topicId] || [];
    if (!sources.length) return '';
    var links = sources.map(function (source) {
      var label = (SOURCE_LABELS[lang] && SOURCE_LABELS[lang][source[0]]) || source[0];
      return '<li><a href="' + escapeHtml(source[1]) + '" target="_blank" rel="noopener noreferrer">' + escapeHtml(label) + ' ↗</a></li>';
    }).join('');
    return '<details class="rsh-sources"><summary>' + escapeHtml(COPY[lang].sourceLabel) + '</summary><ul>' + links + '</ul></details>';
  }

  function renderCard(topicId, lang) {
    var card = COPY[lang].cards[topicId];
    var place = topicId === 'setenilName' || topicId === 'setenilRock'
      ? (lang === 'ko' ? '세테닐' : (lang === 'en' ? 'Setenil' : (lang === 'ja' ? 'セテニル' : '塞特尼尔')))
      : (lang === 'ko' ? '론다' : (lang === 'en' ? 'Ronda' : (lang === 'ja' ? 'ロンダ' : '龙达')));
    return '<article class="rsh-card" data-rsh-topic="' + escapeHtml(topicId) + '">' +
      '<div class="rsh-card-heading"><span>' + escapeHtml(place) + '</span><h3>' + escapeHtml(card.title) + '</h3></div>' +
      renderImages(topicId, lang) +
      '<p>' + escapeHtml(card.body) + '</p>' +
      renderSources(topicId, lang) +
      '</article>';
  }

  function renderRondaSetenilHistoryGuide(lang) {
    var mount = document.getElementById('ronda-setenil-history-guide');
    if (!mount) return false;
    var currentLang = language(lang);
    var copy = COPY[currentLang];
    mount.innerHTML = '<section class="rsh-guide" lang="' + currentLang + '" aria-labelledby="rsh-title">' +
      '<header class="rsh-header"><div class="rsh-kicker">ANDALUCÍA · HISTORY & ARCHITECTURE</div><h2 id="rsh-title">' + escapeHtml(copy.heading) + '</h2><p>' + escapeHtml(copy.intro) + '</p></header>' +
      '<div class="rsh-grid">' + TOPIC_ORDER.map(function (id) { return renderCard(id, currentLang); }).join('') + '</div>' +
      '</section>';
    return true;
  }

  function buildRondaSetenilHistoryChatResponse(query, lang) {
    var normalized = normalizeQuery(query);
    if (!normalized || itineraryOrDirections(normalized)) return null;

    var currentLang = language(lang);
    var matched = TOPIC_ORDER.filter(function (id) { return includesAlias(normalized, TOPIC_ALIASES[id]); });
    var hasRonda = includesAlias(normalized, ['ronda', '론다', 'ロンダ', '龙达']);
    var hasSetenil = includesAlias(normalized, ['setenil', '세테닐', 'セテニル', '塞特尼尔']);
    if (!matched.length) {
      var isHistory = /\b(?:history|historical|heritage|architecture|background|guide)\b/i.test(normalized) || /(?:역사|건축|문화유산|소개|가이드|歴史|建築|文化遺産|紹介|ガイド|历史|建筑|文化遗产|介绍|指南)/.test(normalized);
      var isBarePlace = /^(?:ronda|setenil|론다|세테닐|ロンダ|セテニル|龙达|塞特尼尔)[?？!！. ]*$/.test(normalized);
      if (!isHistory && !isBarePlace) return null;
      if (hasSetenil) matched = ['setenilName', 'setenilRock'];
      else if (hasRonda) matched = ['tajo', 'church', 'socorro'];
      else return null;
    }

    var copy = COPY[currentLang];
    var answers = matched.map(function (topicId) {
      var card = copy.cards[topicId];
      var links = (SOURCES[topicId] || []).map(function (source) {
        var label = (SOURCE_LABELS[currentLang] && SOURCE_LABELS[currentLang][source[0]]) || source[0];
        return '<a href="' + escapeHtml(source[1]) + '" target="_blank" rel="noopener noreferrer">' + escapeHtml(label) + ' ↗</a>';
      }).join('<br>');
      return '<div class="chat-history-answer"><strong>' + escapeHtml(card.title) + '</strong><p>' + escapeHtml(card.body) + '</p><div><strong>' + escapeHtml(copy.sourceLabel) + ':</strong><br>' + links + '</div></div>';
    });
    return answers.join('<br>');
  }

  window.renderRondaSetenilHistoryGuide = renderRondaSetenilHistoryGuide;
  window.buildRondaSetenilHistoryChatResponse = buildRondaSetenilHistoryChatResponse;
}());
