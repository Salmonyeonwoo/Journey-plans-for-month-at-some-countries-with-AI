/**
 * SlowTravel Curated Places & Malaga-Nerja Day Trip Guide
 * - Malaga -> Nerja & Frigiliana ALSA Bus & Taxi Day Trip Guide
 * - Curated 31 Google Maps Heart-Saved Places (Barcelona, Malaga, Seville)
 * - Seville Sevici Bike Share & Flamenco Performance Tips
 * - Full 4-Language Support: Korean (ko), English (en), Japanese (ja), Chinese (zh)
 */

(function () {
  'use strict';

  // 1. 말라가 출발 네르하 & 프리힐리아나 ALSA 버스 당일치기 데이터
  const NERJA_DAYTRIP_DATA = {
    badge: {
      ko: '🚌 말라가 출발 근교 소도시 당일치기 완전정복',
      en: '🚌 Day Trip from Málaga: Complete Coach & Taxi Guide',
      ja: '🚌 マラガ発 近郊の白い村＆海岸リゾート日帰り完全ガイド',
      zh: '🚌 马拉加出发周边白色小镇与蔚蓝海岸一日游全攻略'
    },
    title: {
      ko: "말라가 출발 '네르하 & 프리힐리아나' ALSA 버스 당일치기 가이드",
      en: "Málaga Day Trip: Nerja & Frigiliana ALSA Bus & Taxi Master Guide",
      ja: "マラガ発「ネルハ＆フリヒリアナ」ALSAバス日帰りマスターガイド",
      zh: "马拉加出发“内尔哈与弗里希利亚纳”ALSA大巴与出租车一日游指南"
    },
    intro: {
      ko: '동생분께서 강력 추천하신 네르하와 프리힐리아나는 말라가(Malaga)에서 당일치기로 다녀오기 가장 완벽한 근교 소도시입니다. 확정된 전체 일정을 바탕으로 가장 추천하는 날짜와 이동 방법을 정리했습니다.',
      en: 'Highly recommended by family, Nerja and Frigiliana are the absolute best whitewashed hillside and Mediterranean coastal day trip from Málaga. Based on the confirmed 30-day itinerary, here is the optimal schedule, route, and senior-friendly transit plan.',
      ja: 'ご家族イチオシのネルハとフリヒリアナは、マラガ滞在中に日帰りで訪れるのに最も美しいアンダルシアの白い村＆海岸リゾートです。確定日程に基づいた最適日と快適な移動方法をまとめました。',
      zh: '家人强烈推荐的内尔哈与弗里希利亚纳（Frigiliana），是马拉加周边最完美的安达卢西亚白色山城与地中海蔚蓝海岸一日游目的地。基于已确认的30天行程，为您梳理最佳日期与舒适出行方式。'
    },
    dateRec: {
      date: '11월 17일 (화) · 말라가 체류 3일 차',
      dateEn: 'Nov 17 (Tue) · Málaga Day 3',
      dateJa: '11月17日 (火)・マラガ滞在3日目',
      dateZh: '11月17日（周二）· 马拉加停留第3天',
      reason: {
        ko: '11/15(일)은 저녁에 말라가에 도착하시고, 11/16(월)은 말라가 시내(피카소 미술관, 요트 크루즈)를 즐기셔야 합니다. 따라서 온전히 하루가 비는 11/17(화)에 아침 일찍 다녀오시는 것이 체력적으로나 동선상으로 가장 완벽합니다.',
        en: '11/15 (Sun) is an evening arrival in Málaga, and 11/16 (Mon) is reserved for central Málaga highlights (Picasso Museum & yacht cruise). Therefore, 11/17 (Tue)—a completely open day—is optimal both physically and route-wise for an early-morning day excursion.',
        ja: '11/15(日)夜にマラガ到着、11/16(月)はマラガ市内（ピカソ美術館、ヨットクルーズ）を満喫。そのため丸一日自由に使える11/17(火)の朝一番に出発するのが、体力・動線ともに最も理想的です。',
        zh: '11/15（周日）傍晚抵达马拉加，11/16（周一）集中游览马拉加市区（毕加索博物馆、游艇巡航）。因此整天充裕的11/17（周二）一早出行，体力与行程动线最为完美。'
      }
    },
    step1: {
      title: {
        ko: '1단계: 말라가 시내 ➔ 네르하 (ALSA 직행 버스)',
        en: 'Step 1: Málaga City ➔ Nerja (ALSA Coach)',
        ja: '第1段階: マラガ市内 ➔ ネルハ (ALSA長距離バス)',
        zh: '第1步：马拉加市区 ➔ 内尔哈 (ALSA城际大巴)'
      },
      board: {
        ko: '말라가 버스터미널 (Estación de Autobuses de Málaga) 또는 말라가 항구 근처(Puerto Malaga) 정류장',
        en: 'Málaga Central Bus Station (Estación de Autobuses) or Puerto Málaga Port Stop',
        ja: 'マラガバスターミナル（Estación de Autobuses）または港近くの停留所（Puerto Málaga）',
        zh: '马拉加长途汽车总站（Estación de Autobuses）或港口附近站台（Puerto Málaga）'
      },
      drop: {
        ko: '네르하 버스 정류장 (Nerja Bus Station)',
        en: 'Nerja Bus Stop (Estación de Autobuses de Nerja)',
        ja: 'ネルハバス停留所（Nerja）',
        zh: '内尔哈大巴车站（Nerja）'
      },
      duration: '약 1시간 ~ 1시간 15분 (Approx. 1h ~ 1h 15m)',
      fare: '편도 1인 약 5 EUR 내외 (Around €5 per person one-way)',
      tip: {
        ko: '예매 팁: ALSA 웹사이트/앱에서 출발지 Málaga / 도착지 Nerja 선택. 시간대별로 완행과 직행이 있습니다. 가급적 정차 역이 적고 1시간 이내로 끊는 직행(Directo) 표를 끊으세요!',
        en: 'Booking Tip: On the ALSA website or app, select Origin: Málaga / Destination: Nerja. Note that some buses make frequent local stops. Always book the "Directo" (express) schedule with minimal stops (under 1 hour)!',
        ja: '予約のコツ: ALSA公式サイト/アプリで出発地Málaga、目的地Nerjaを選択。各駅停車便と直行便があります。停車駅が少なく所要1時間以内の「Directo（直行便）」を予約してください！',
        zh: '订票技巧：在ALSA官网或App选择出发地Málaga/目的地Nerja。班次分慢车和直达车，务必选购经停站少、1小时以内的“Directo”（直达特快）车票！'
      }
    },
    step2: {
      title: {
        ko: '2단계: 네르하 ➔ 프리힐리아나 (로컬 버스 vs 🚕 택시)',
        en: 'Step 2: Nerja ➔ Frigiliana (Local Minibus vs 🚕 Taxi)',
        ja: '第2段階: ネルハ ➔ フリヒリアナ (路線バス vs 🚕 タクシー)',
        zh: '第2步：内尔哈 ➔ 弗里希利亚纳 (当地小巴 vs 🚕 出租车)'
      },
      warning: {
        ko: 'ALSA 버스는 프리힐리아나 산꼭대기 마을까지 올라가지 않습니다. 네르하에 내리신 후 반드시 환승하셔야 합니다.',
        en: 'ALSA long-distance coaches do not drive up to the hilltop village of Frigiliana. You must transfer after arriving in Nerja.',
        ja: 'ALSA長距離バスは山頂の村フリヒリアナまでは行きません。ネルハ到着後に必ず乗り換える必要があります。',
        zh: 'ALSA长途大巴不上山顶小镇弗里希利亚纳。抵达内尔哈后必须进行交通换乘。'
      },
      optA: {
        title: {
          ko: '옵션 A (로컬 버스 - 비추천)',
          en: 'Option A (Local Minibus - Not Recommended)',
          ja: 'オプションA（路線ミニバス・非推奨）',
          zh: '方案A（当地小巴·不推荐）'
        },
        desc: {
          ko: '네르하 정류장에서 프리힐리아나행 빨간색 미니버스를 탑승합니다. (편도 약 1.20 EUR, 현금 결제, 15분 소요). 하지만 배차 간격이 길고 사람이 꽉 차면 서서 가야 합니다.',
          en: 'Take the red local minibus from Nerja stop (~€1.20 one-way, cash only, ~15 mins). However, intervals are long and you may have to stand when crowded.',
          ja: 'ネルハ停留所から赤いミニバスに乗車（片道約€1.20、現金払い、所要15分）。ただし運行間隔が長く、混雑時は立ち乗りになります。',
          zh: '在内尔哈站乘坐前往弗里希利亚纳的红色小巴（单程约1.20欧元，仅收现金，约15分钟）。但班次间隔长，若客满需要全程站立。'
        }
      },
      optB: {
        title: {
          ko: '옵션 B (택시 - 👑 부모님 동행 시 강력 추천!)',
          en: 'Option B (Taxi - 👑 Highly Recommended for Senior Parents!)',
          ja: 'オプションB（タクシー・👑ご両親同伴なら絶対おすすめ！）',
          zh: '方案B（出租车·👑 陪同父母强烈推荐！）'
        },
        desc: {
          ko: '네르하 버스 정류장 바로 근처에 택시들이 상시 대기하고 있습니다. 3인 가족 기준 편도 약 15 EUR 내외면 프리힐리아나 마을 입구까지 10~15분 만에 아주 편안하게 올라갑니다. 버스비 3인(약 4 EUR)과 비교하면 10 EUR 정도 차이 나지만, 부모님의 무릎 건강과 기다리는 시간을 생각하면 무조건 택시를 타시는 것이 압도적으로 현명합니다.',
          en: 'Taxis wait directly beside the Nerja bus stop. For a family of 3, a one-way ride costs around €15 and reaches the entrance of Frigiliana comfortably in 10–15 minutes. The difference compared to 3 bus fares (~€4) is only ~€10, but protecting your parents’ knees and skipping hot waiting times makes a taxi overwhelmingly worthwhile.',
          ja: 'ネルハ停留所のすぐ横にタクシーが常時待機しています。3人家族で片道約€15、わずか10〜15分でフリヒリアナ村の入口まで快適に直行できます。バス3人分（約€4）との差額はわずか€10程度。ご両親の膝の健康と待ち時間短縮を考えれば、絶対にタクシー利用が賢明です。',
          zh: '内尔哈大巴站旁常年有出租车候客。3人家庭单程仅需约15欧元，10~15分钟即可极其舒适地直达小镇入口。相较3人小巴票价（约4欧）仅多支出约10欧，却能极大保护父母膝关节并免受日晒等车之苦，绝对是最明智的选择。'
        }
      }
    },
    timeline: [
      {
        time: '09:30',
        icon: '🚌',
        title: { ko: '말라가 터미널 출발', en: 'Depart Málaga Terminal', ja: 'マラガターミナル出発', zh: '马拉加总站出发' },
        desc: { ko: '네르하행 ALSA 직행(Directo) 버스 탑승', en: 'Board ALSA Directo coach bound for Nerja', ja: 'ネルハ行きALSA直行便（Directo）乗車', zh: '乘坐前往内尔哈的ALSA直达大巴' }
      },
      {
        time: '10:45',
        icon: '🚕',
        title: { ko: '네르하 도착 ➔ 택시 환승', en: 'Arrive Nerja ➔ Transfer to Taxi', ja: 'ネルハ到着 ➔ タクシー乗換', zh: '抵达内尔哈 ➔ 出租车换乘' },
        desc: { ko: '네르하 정류장 도착 후 곧바로 대기 중인 택시 타고 프리힐리아나로 편안히 이동', en: 'Arrive at Nerja stop, take waiting taxi straight up to Frigiliana', ja: 'ネルハ到着後、待機中のタクシーでフリヒリアナへ快適に直行', zh: '抵达车站后随即搭乘候客出租车舒适直奔弗里希利亚纳' }
      },
      {
        time: '11:00 ~ 13:00',
        icon: '📸',
        title: { ko: '[프리힐리아나] 하얀 골목 산책', en: '[Frigiliana] Whitewashed Alleys', ja: '[フリヒリアナ] 白い路地散策', zh: '[弗里希利亚纳] 漫步洁白山城' },
        desc: { ko: '스페인에서 가장 아름다운 하얀 마을 산책, 인생 사진 촬영, 예쁜 테라스 카페에서 커피 한 잔', en: 'Stroll Spain’s most picturesque white village, scenic photo spots & terrace coffee break', ja: 'スペインで最も美しい白い村の散策、記念写真撮影、テラスカフェで優雅な一杯', zh: '漫步西班牙最美白色小镇，拍摄绝美人像，在景观露台享用香浓咖啡' }
      },
      {
        time: '13:00 ~ 13:20',
        icon: '🚕',
        title: { ko: '네르하 시내로 복귀', en: 'Return Taxi to Nerja', ja: 'タクシーでネルハへ戻る', zh: '乘出租车返回内尔哈' },
        desc: { ko: '다시 택시(또는 로컬 버스)를 타고 네르하 해변/시내 중심부로 하차', en: 'Take taxi (or local minibus) back down to Nerja coastal center', ja: 'タクシーでネルハの海岸・中心街へ戻る', zh: '乘坐出租车（或小巴）轻松返回内尔哈市中心海滨' }
      },
      {
        time: '13:30 ~ 15:00',
        icon: '🥘',
        title: { ko: '[네르하] 지중해 해산물 점심', en: '[Nerja] Mediterranean Seafood Lunch', ja: '[ネルハ] 地中海シーフードランチ', zh: '[内尔哈] 地中海海鲜大餐' },
        desc: { ko: '지중해 에메랄드빛 바다가 펼쳐진 해변 식당에서 신선한 해산물 구이 & 빠에야 만찬', en: 'Scenic lunch at a beachfront restaurant: grilled fresh seafood & authentic paella', ja: 'エメラルドグリーンの地中海を望む海辺のレストランで絶品シーフード＆パエリア', zh: '在面向翡翠般碧蓝地中海的海边餐厅，享用鲜美海鲜杂烤与地道海鲜饭' }
      },
      {
        time: '15:00 ~ 16:30',
        icon: '🌊',
        title: { ko: '[유럽의 발코니] 산책 & 젤라토', en: '[Balcón de Europa] Promenade & Gelato', ja: '[ヨーロッパのバルコニー] 散策＆ジェラート', zh: '[欧洲阳台] 绝美漫步与意式冰淇淋' },
        desc: { ko: "탁 트인 지중해 절벽 전망대 '유럽의 발코니(Balcón de Europa)' 산책 및 이탈리안 수제 젤라토 먹방", en: "Stroll the open cliffside observatory 'Balcón de Europa' and enjoy artisan Italian gelato", ja: "絶景の断崖展望台「ヨーロッパのバルコニー」散策＆本格イタリアンジェラート", zh: "漫步悬崖之巅开阔壮丽的“欧洲阳台(Balcón de Europa)”，品尝手工意式冰淇淋" }
      },
      {
        time: '17:00 ~ 18:00',
        icon: '🏨',
        title: { ko: '말라가 복귀 후 휴식', en: 'Return to Málaga & Evening Rest', ja: 'マラガ帰着・ホテル休養', zh: '返回马拉加市区休息' },
        desc: { ko: '네르하 정류장에서 말라가행 ALSA 버스 탑승 ➔ 18:00경 말라가 복귀 후 숙소에서 안락한 휴식', en: 'Board ALSA coach at Nerja ➔ Arrive in Málaga around 18:00 for a relaxing evening', ja: 'ネルハ停留所からマラガ行きALSAバス乗車 ➔ 18:00頃マラガ帰着・ゆっくり休養', zh: '在内尔哈乘ALSA大巴返程 ➔ 约18:00抵达马拉加，在住处舒适休整' }
      }
    ]
  };

  // 2. 바르셀로나, 말라가, 세비야 구글 지도 31개 큐레이션 하트 리스트
  const CURATED_PLACES_DATA = [
    // === 바르셀로나 (14개) ===
    {
      id: 'cur-bcn-anxoita',
      city: 'barcelona',
      cityBadge: { ko: '바르셀로나', en: 'Barcelona', ja: 'バルセロナ', zh: '巴塞罗那' },
      category: 'dining',
      catBadge: { ko: '⭐⭐⭐ 꿀대구 맛집', en: '⭐⭐⭐ Honey Cod Top Pick', ja: '⭐⭐⭐ 極上ハニーコッド名店', zh: '⭐⭐⭐ 招牌蜂蜜烤鳕鱼顶级名店' },
      name: 'Anxoita Bodega',
      title: {
        ko: 'Anxoita Bodega (꿀대구 맛집 ⭐⭐⭐)',
        en: 'Anxoita Bodega (3-Star Honey Cod Pick)',
        ja: 'Anxoita Bodega (絶品ハニーコッド ⭐⭐⭐)',
        zh: 'Anxoita Bodega (蜂蜜鳕鱼三大星名店 ⭐⭐⭐)'
      },
      desc: {
        ko: '현지인과 여행자 모두에게 극찬받는 바르셀로나 최고의 꿀대구(Bacalao con Miel) 맛집. 달콤한 꿀 알리올리 소스와 촉촉한 대구 살의 조화가 예술적입니다.',
        en: 'Acclaimed local favorite renowned for the finest honey cod (Bacalao con Miel) in Barcelona. Heavenly balance of sweet honey alioli sauce and flaky cod.',
        ja: '地元客・旅行者の双方が絶賛するバルセロナ最高のハニーコッド（タラの蜂蜜アリオリグラタン）名店。しっとりしたタラと濃厚なソースが絶品。',
        zh: '本地人与食客一致盛赞的巴塞罗那顶级蜂蜜鳕鱼（Bacalao con Miel）名店。香甜蒜味蛋黄酱与柔嫩鳕鱼的融合堪称艺术。'
      },
      tip: {
        ko: '웨이팅이 있을 수 있으니 오픈 시간 직후 방문을 권장합니다.',
        en: 'Can get busy; visiting right around opening time is recommended.',
        ja: '行列ができることがあるため、開店直後の訪問をおすすめします。',
        zh: '可能需要排队，建议开门营业前后即刻前往。'
      },
      mapUrl: 'https://maps.app.goo.gl/XkAg7PzUgqzTdsKZ7'
    },
    {
      id: 'cur-bcn-ciutat-comtal',
      city: 'barcelona',
      cityBadge: { ko: '바르셀로나', en: 'Barcelona', ja: 'バルセロナ', zh: '巴塞罗那' },
      category: 'dining',
      catBadge: { ko: '⭐⭐ 꿀대구 맛집', en: '⭐⭐ Honey Cod Famous Pick', ja: '⭐⭐ 有名ハニーコッド老舗', zh: '⭐⭐ 经典蜂蜜鳕鱼老牌名店' },
      name: 'Ciutat Comtal (시우다드 콘달)',
      title: {
        ko: 'Ciutat Comtal (꿀대구 맛집 ⭐⭐)',
        en: 'Ciutat Comtal (2-Star Honey Cod & Tapas)',
        ja: 'Ciutat Comtal (名物ハニーコッド＆タパス ⭐⭐)',
        zh: 'Ciutat Comtal (蜂蜜鳕鱼与经典小食 ⭐⭐)'
      },
      desc: {
        ko: '카탈루냐 광장 인근 활기찬 전통 타파스 명가. 꿀대구와 소고기 안심 몬타디토스, 새우 꼬치 등 실패 없는 메뉴 구성.',
        en: 'Vibrant, historic tapas institution near Plaça de Catalunya. Renowned for crispy honey cod, beef tenderloin montaditos, and grilled prawns.',
        ja: 'カタルーニャ広場近くの活気あふれる老舗タパス店。ハニーコッド、牛ヒレ肉のピンチョス、エビ串焼きなど何を食べても大満足。',
        zh: '加泰罗尼亚广场旁的传奇百年Tapas老店。招牌蜂蜜鳕鱼、牛柳串与铁板大虾每道都是招牌必点。'
      },
      tip: {
        ko: '카운터 바 좌석은 워크인으로 비교적 빠르게 착석 가능합니다.',
        en: 'Bar counter seating usually has shorter walk-in waits.',
        ja: 'カウンター席なら比較的短い待ち時間で着席できます。',
        zh: '吧台座位无需长时间等候，适合快速入座点餐。'
      },
      mapUrl: 'https://maps.app.goo.gl/AWN93PJSJf5TEbyZ7'
    },
    {
      id: 'cur-bcn-casa-lolea',
      city: 'barcelona',
      cityBadge: { ko: '바르셀로나', en: 'Barcelona', ja: 'バルセロナ', zh: '巴塞罗那' },
      category: 'dining',
      catBadge: { ko: '트러플 빠에야 맛집 (전화 예약 권장)', en: 'Truffle Paella (Phone Booking Avail)', ja: 'トリュフパエリア (電話予約可)', zh: '松露烩饭名店 (支持电话订位)' },
      name: 'Casa Lolea Barcelona (카사 롤레아)',
      title: {
        ko: 'Casa Lolea Barcelona (트러플 빠에야 & 상그리아)',
        en: 'Casa Lolea Barcelona (Truffle Paella & Sangria)',
        ja: 'Casa Lolea Barcelona (トリュフパエリア＆特製サングリア)',
        zh: 'Casa Lolea Barcelona (松露海鲜饭与经典果酒)'
      },
      desc: {
        ko: '진한 풍미의 트러플 빠에야(리조또 스타일)와 프리미엄 상그리아로 유명한 세련된 비스트로. 전화로 사전 예약 가능하여 부모님 동행 시 대기 없이 편안합니다.',
        en: 'Chic bistro celebrated for aromatic truffle paella (creamy risotto style) and bottled artisan sangria. Phone reservations accepted to skip lines with parents.',
        ja: '濃厚な香りのトリュフパエリア（リゾット風）とプレミアムサングリアで大人気のビストロ。電話予約可能で親御様連れでも安心です。',
        zh: '以馥郁松露烩饭（西班牙风味奶油饭）和特调瓶装果酒闻名的时尚小馆。支持提前电话预订，免去长辈排队辛苦。'
      },
      tip: {
        ko: '전화 예약(+34 936 24 10 16)으로 미리 테이블을 확보하세요.',
        en: 'Call in advance (+34 936 24 10 16) to secure a comfortable table.',
        ja: '事前にお電話でテーブルを確保することをおすすめします。',
        zh: '建议提前致电场馆锁定座位，就餐更从容。'
      },
      mapUrl: 'https://maps.app.goo.gl/o6tWhtUoa5xC1cGX8'
    },
    {
      id: 'cur-bcn-can-framis',
      city: 'barcelona',
      cityBadge: { ko: '바르셀로나', en: 'Barcelona', ja: 'バルセロナ', zh: '巴塞罗那' },
      category: 'dining',
      catBadge: { ko: '트러플 빠에야 맛집 (카사 롤레아 대표)', en: 'Truffle Paella (Casa Lolea Sister)', ja: 'トリュフパエリア (Casa Lolea系列)', zh: '松露烩饭名店 (Casa Lolea姐妹店)' },
      name: 'Can Framis by Casa Lolea (칸 프라미스)',
      title: {
        ko: 'Can Framis by Casa Lolea (트러플 빠에야)',
        en: 'Can Framis by Casa Lolea (Truffle Paella)',
        ja: 'Can Framis by Casa Lolea (トリュフパエリア)',
        zh: 'Can Framis by Casa Lolea (松露海鲜饭)'
      },
      desc: {
        ko: '카사 롤레아와 같은 대표가 운영하는 자매 매장. 동일한 명품 트러플 빠에야 레시피와 세련된 카탈루냐 퀴진을 여유로운 공간에서 즐길 수 있습니다.',
        en: 'Operated by the same founders of Casa Lolea. Offers the same exquisite truffle paella recipe and elevated Catalan dining in a spacious setting.',
        ja: 'Casa Loleaと同じオーナーが手掛ける系列店。同等の極上トリュフパエリアと洗練されたカタルーニャ料理を落ち着いた空間で楽しめます。',
        zh: '由Casa Lolea同主理人操刀的品质餐厅。延续同样惊艳的松露烩饭与加泰罗尼亚美食，用餐环境更显舒展优雅。'
      },
      tip: {
        ko: '카사 롤레아 본점 예약이 꽉 찼을 때 훌륭한 대안입니다.',
        en: 'Excellent alternative when Casa Lolea main branch is fully booked.',
        ja: '本店が満席の場合のスマートな代替候補としても最適です。',
        zh: '若总店订满，这里是极佳的高水准体验之选。'
      },
      mapUrl: 'https://maps.app.goo.gl/m4VE6CAeDVTesFvd8'
    },
    {
      id: 'cur-bcn-quimet',
      city: 'barcelona',
      cityBadge: { ko: '바르셀로나', en: 'Barcelona', ja: 'バルセロナ', zh: '巴塞罗那' },
      category: 'dining',
      catBadge: { ko: '전설의 타파스 맛집', en: 'Legendary Tapas Bar', ja: '伝説の立ち飲みタパス', zh: '传奇站立式Tapas酒吧' },
      name: 'Quimet & Quimet (퀴멧 이 퀴멧)',
      title: {
        ko: 'Quimet & Quimet (연어 꿀 몬타디토스 타파스)',
        en: 'Quimet & Quimet (Salmon Honey Montaditos)',
        ja: 'Quimet & Quimet (サーモン蜂蜜モンタディート)',
        zh: 'Quimet & Quimet (三文鱼蜂蜜小食传奇名店)'
      },
      desc: {
        ko: '100년 넘는 역사를 지닌 바르셀로나 최고의 타파스 명소. 연어와 트러플 꿀, 리코타 치즈가 어우러진 몬타디토스와 최고급 해산물 보존 식품 요리.',
        en: 'Centuries-old historic tapas jewel. Famous for smoked salmon montaditos topped with truffle honey and ricotta, plus artisan canned seafood tapas.',
        ja: '100年以上の歴史を誇る伝説のタパス店。スモークサーモンにトリュフ蜂蜜とリコッタチーズをのせた名物モンタディートは必食。',
        zh: '拥有百年历史的巴塞罗那传奇酒吧。招牌三文鱼搭配松露蜂蜜与乳清芝士的小吃，入口层次惊艳绝伦。'
      },
      tip: {
        ko: '스탠딩 형태 매장이라 60대 부모님과 방문 시 20~30분 가볍게 미식 체험 후 이동하는 코스로 추천합니다.',
        en: 'Standing-only bar; best planned as a brief 20-30 minute gourmet tasting stop with senior parents.',
        ja: '立ち席のみのため、ご両親連れなら20〜30分の軽食立ち寄りとして計画するのがおすすめです。',
        zh: '站立用餐性质，建议陪同长辈作为20~30分钟的特色美食品尝站短暂停留。'
      },
      mapUrl: 'https://maps.app.goo.gl/RuBAaQ9qmStEXiZX7'
    },
    {
      id: 'cur-bcn-paradeta-sants',
      city: 'barcelona',
      cityBadge: { ko: '바르셀로나', en: 'Barcelona', ja: 'バルセロナ', zh: '巴塞罗那' },
      category: 'dining',
      catBadge: { ko: '수산시장식 해산물 맛집', en: 'Market-style Fresh Seafood', ja: '市場直結風シーフード', zh: '自选现称海鲜餐厅' },
      name: 'La Paradeta Sants (라 파라데타 산츠)',
      title: {
        ko: 'La Paradeta Sants (각종 해산물 맛집)',
        en: 'La Paradeta Sants (Fresh Seafood Market Feast)',
        ja: 'La Paradeta Sants (新鮮シーフードマーケット)',
        zh: 'La Paradeta Sants (水产自选海鲜大餐)'
      },
      desc: {
        ko: '수산시장 매대에서 원하는 새우, 랍스터, 게, 오징어, 조개 등을 직접 골라 담으면 주방에서 즉석 그릴 또는 튀김으로 푸짐하게 요리해주는 합리적인 해산물 천국.',
        en: 'Seafood-market style kitchen: choose your fresh prawns, lobster, squid, and razor clams on ice, which are cooked instantly on the grill or fried to perfection.',
        ja: '市場のカウンターのように氷の上に並んだエビ、ロブスター、カニ、イカ、マテ貝を選び、その場で鉄板焼きや揚げ物にしてくれる豪快な海鮮処。',
        zh: '水产市场式选餐模式：在冰鲜台上亲手挑选大虾、龙虾、膏蟹、鱿鱼与蛏子，由后厨即刻铁板香煎或酥炸，鲜美超值。'
      },
      tip: {
        ko: '가격이 정직하고 양이 푸짐하여 부모님과 해산물 포식하기 가장 좋습니다.',
        en: 'Honest pricing and generous portions—ideal for a relaxed family seafood feast.',
        ja: '明朗会計でボリューム満点、ご両親とお腹いっぱい魚介を味わうのに最高です。',
        zh: '价格透明分量扎实，全家一同尽享海鲜大餐的绝佳去处。'
      },
      mapUrl: 'https://maps.app.goo.gl/oJsTwJMMxwZdrZVk9'
    },
    {
      id: 'cur-bcn-puertecillo',
      city: 'barcelona',
      cityBadge: { ko: '바르셀로나', en: 'Barcelona', ja: 'バルセロナ', zh: '巴塞罗那' },
      category: 'dining',
      catBadge: { ko: '보른지구 감성 해산물 맛집', en: 'El Born Fresh Seafood', ja: 'ボルン地区の海鮮名店', zh: '波恩区冰鲜海鲜名店' },
      name: 'Puertecillo Born (푸에르테시요 보른)',
      title: {
        ko: 'Puertecillo Born (보른지구 해산물 맛집)',
        en: 'Puertecillo Born (Seafood Market in El Born)',
        ja: 'Puertecillo Born (ボルン地区 鮮魚マーケット)',
        zh: 'Puertecillo Born (波恩区精致海鲜餐馆)'
      },
      desc: {
        ko: '감각적인 보른 지구에 위치한 수산시장형 해산물 식당. 얼음 위 싱싱한 해산물을 골라 화이트 와인과 곁들여 먹는 즐거움이 가득합니다.',
        en: 'Atmospheric market-style seafood spot in fashionable El Born. Pick fresh catches from ice counters, served sizzling with chilled Catalan white wine.',
        ja: 'お洒落なボルン地区にある市場スタイルの鮮魚レストラン。氷上の新鮮な魚介を選び、白ワインと一緒に味わう贅沢なひととき。',
        zh: '坐落于富有艺术气息的波恩区。在冰鲜台自选心仪海鲜，搭配冰爽白葡萄酒，体验地道西班牙海滨风情。'
      },
      tip: {
        ko: '식사 후 인근 피카소 미술관이나 산타 마리아 델 마르 성당 산책과 연결하기 좋습니다.',
        en: 'Pairs perfectly with a visit to the nearby Picasso Museum or Santa Maria del Mar.',
        ja: '食後は近くのピカソ美術館やサンタ・マリア・デル・マル聖堂の散策に便利です。',
        zh: '餐后可顺道漫步附近的毕加索博物馆或海洋圣母大教堂。'
      },
      mapUrl: 'https://maps.app.goo.gl/8EXe4KKhxStZ7SUU7'
    },
    {
      id: 'cur-bcn-el-chigre',
      city: 'barcelona',
      cityBadge: { ko: '바르셀로나', en: 'Barcelona', ja: 'バルセロナ', zh: '巴塞罗那' },
      category: 'dining',
      catBadge: { ko: '버섯 리조또 & 전통 시드라', en: 'Mushroom Risotto & Cider', ja: 'キノコリゾット＆シードル樽', zh: '野生菌菇烩饭与苹果酒' },
      name: 'El Chigre 1769 (엘 치그레)',
      title: {
        ko: 'El Chigre 1769 (버섯 리조또 & 타파스)',
        en: 'El Chigre 1769 (Wild Mushroom Risotto & Tapas)',
        ja: 'El Chigre 1769 (キノコリゾット＆タパス)',
        zh: 'El Chigre 1769 (菌菇烩饭与传统Tapas)'
      },
      desc: {
        ko: '카탈루냐와 아스투리아스 전통을 융합한 미식 펍. 깊은 풍미의 버섯 리조또와 신선한 해산물 타파스, 전통 방식으로 따르는 사과 발효주 시드라(Sidra)가 일품입니다.',
        en: 'Unique gastropub uniting Catalan and Asturian traditions. Known for savory wild mushroom risotto, seafood tapas, and traditional poured natural cider (sidra).',
        ja: 'カタルーニャとアストゥリアスの伝統が融合した名酒場。深い旨みのキノコリゾット、海鮮タパス、名物シードル（りんご酒）が名物。',
        zh: '加泰罗尼亚与阿斯图里亚斯传统交融的美食酒馆。浓郁野生菌菇烩饭、鲜美海产小食与传统高空倒流苹果酒（Sidra）体验极佳。'
      },
      tip: {
        ko: '고즈넉한 고딕 골목에 있어 분위기가 아늑합니다.',
        en: 'Tucked in historic Gothic quarter alleys with charming ambiance.',
        ja: '歴史ある路地にあり、落ち着いた居心地の良さが魅力です。',
        zh: '隐匿于哥特区静谧巷陌，氛围格外温馨舒适。'
      },
      mapUrl: 'https://maps.app.goo.gl/J65qrHH96JDxgALM9'
    },
    {
      id: 'cur-bcn-don-asador',
      city: 'barcelona',
      cityBadge: { ko: '바르셀로나', en: 'Barcelona', ja: 'バルセロナ', zh: '巴塞罗那' },
      category: 'dining',
      catBadge: { ko: '아르헨티나 숯불 스테이크', en: 'Argentine Charcoal Steak', ja: 'アルゼンチン炭火ステーキ', zh: '阿根廷炭烤特级牛排' },
      name: 'Don Asador (돈 아사도르)',
      title: {
        ko: 'Don Asador (아르헨티나식 숯불 그릴 스테이크)',
        en: 'Don Asador (Authentic Argentine Steakhouse)',
        ja: 'Don Asador (本格アルゼンチン炭火アサード)',
        zh: 'Don Asador (地道阿根廷炭火牛排馆)'
      },
      desc: {
        ko: '참나무 숯불에 천천히 구워낸 아르헨티나 정통 아사도(Asado) 스테이크 전문점. 극도로 부드러운 안심과 꽃등심 부위가 부모님 입맛에도 딱 맞습니다.',
        en: 'Authentic Argentine asado steakhouse slow-cooked over charcoal. Succulent tenderloin and ribeye cuts tender enough for senior parents to enjoy effortlessly.',
        ja: '炭火でじっくり焼き上げる本場アルゼンチンのアサード専門店。驚くほど柔らかいヒレ肉やリブアイはご両親にも大好評。',
        zh: '橡木炭火慢烤的阿根廷正宗烤肉专卖店。极度软嫩的菲力与肉眼牛排，肉香浓郁，长辈咀嚼也完全不费力。'
      },
      tip: {
        ko: '해산물 위주의 식사가 물릴 때 든든한 육류 보양식으로 최고입니다.',
        en: 'Ideal protein-rich feast when craving hearty grilled meat after days of seafood.',
        ja: '海鮮続きの旅で、しっかりお肉を食べたい時のスタミナ補給に最適です。',
        zh: '连续品尝海鲜后，若想换换口味补充高品质蛋白质，这里是绝佳选择。'
      },
      mapUrl: 'https://maps.app.goo.gl/MTr2EjW1XFqcBQ3N7'
    },
    {
      id: 'cur-bcn-cal-robert',
      city: 'barcelona',
      cityBadge: { ko: '바르셀로나', en: 'Barcelona', ja: 'バルセロナ', zh: '巴塞罗那' },
      category: 'dining',
      catBadge: { ko: '뽈뽀 (문어 요리) 맛집', en: 'Galician Pulpo Specialist', ja: '極上ポルポ（タコ）名店', zh: '加利西亚章鱼（Pulpo）名店' },
      name: 'Cal Robert (칼 로베르트)',
      title: {
        ko: 'Cal Robert (뽈뽀 문어 요리 맛집)',
        en: 'Cal Robert (Galician Pulpo Specialist)',
        ja: 'Cal Robert (名物ポルポ・タコ料理)',
        zh: 'Cal Robert (地道加利西亚章鱼小馆)'
      },
      desc: {
        ko: '갈리시아 전통 방식으로 푹 삶아내 입안에서 사르르 녹는 부드러운 뽈뽀(Pulpo a la Gallega) 전문점. 올리브유와 굵은 소금, 훈제 파프리카 향이 완벽합니다.',
        en: 'Tender Galician-style octopus (Pulpo a la Gallega) braised until melt-in-your-mouth soft. Drizzled with extra virgin olive oil, coarse sea salt, and smoked paprika.',
        ja: 'ガリシアの伝統手法で驚くほど柔らかく茹で上げたポルポ（タコ）の専門店。上質なオリーブオイルとパプリカパウダーの風味が抜群。',
        zh: '传统加利西亚风味章鱼名店。慢煮至入口即化的软嫩章鱼，淋上特级初榨橄榄油与烟熏红椒粉，风味正宗地道。'
      },
      tip: {
        ko: '문어가 질기지 않고 극도로 부드러워 치아가 약하신 부모님도 편히 드실 수 있습니다.',
        en: 'The octopus is ultra-tender and never chewy, perfectly suited for elderly family members.',
        ja: 'タコがとても柔らかいので、歯の弱いご両親でも無理なく美味しく召し上がれます。',
        zh: '章鱼软烂无渣绝不干硬，牙口一般的长辈也能吃得十分舒心。'
      },
      mapUrl: 'https://maps.app.goo.gl/fkqC15pyZSA1XfRZ6'
    },
    {
      id: 'cur-bcn-colom',
      city: 'barcelona',
      cityBadge: { ko: '바르셀로나', en: 'Barcelona', ja: 'バルセロナ', zh: '巴塞罗那' },
      category: 'dining',
      catBadge: { ko: '정통 빠에야 맛집', en: 'Classic Paella Restaurant', ja: '本場パエリア名店', zh: '传统经典海鲜饭名店' },
      name: 'Colom Restaurant (콜롬 레스토랑)',
      title: {
        ko: 'Colom Restaurant (레이알 광장 빠에야 맛집)',
        en: 'Colom Restaurant (Classic Paella near Plaça Reial)',
        ja: 'Colom Restaurant (レイアル広場近くの本場パエリア)',
        zh: 'Colom Restaurant (皇家广场经典西班牙海鲜饭)'
      },
      desc: {
        ko: '레이알 광장 바로 옆, 진한 해산물 육수에 알알이 간이 밴 푸짐한 빠에야와 상그리아를 맛볼 수 있는 가성비 최고 맛집.',
        en: 'Located right next to Plaça Reial, renowned for richly flavored seafood paella infused with homemade shellfish broth, paired with refreshing sangria.',
        ja: 'レイアル広場すぐ隣。濃厚な魚介出汁が米の一粒一粒に染み渡った絶品パエリアとサングリアが評判の良心的な名店。',
        zh: '位于皇家广场旁。浓郁海鲜高汤焖煮的粒粒入味海鲜饭，焦香锅巴口感扎实，性价比极高。'
      },
      tip: {
        ko: '주문 시 "Sin sal, por favor"(소금 적게 해주세요)를 요청하시면 한국인 입맛에 딱 맞습니다.',
        en: 'Asking for "Sin sal, por favor" (less salt) adjusts the seasoning to a gentle, balanced flavor.',
        ja: '「Sin sal, por favor（塩分控えめで）」と伝えると、日本人の口にぴったりの優しい塩梅になります。',
        zh: '点餐时可提示“Sin sal, por favor”（少盐），更契合东方人口味。'
      },
      mapUrl: 'https://maps.app.goo.gl/HZ4sSUzx5aJhLMC9A'
    },
    {
      id: 'cur-bcn-hanki',
      city: 'barcelona',
      cityBadge: { ko: '바르셀로나', en: 'Barcelona', ja: 'バルセロナ', zh: '巴塞罗那' },
      category: 'dining',
      catBadge: { ko: '속 편한 정갈한 한식 맛집', en: 'Comforting Korean Restaurant', ja: '本格韓国料理HANKI', zh: '地道温馨韩餐厅' },
      name: 'HANKI (한키 바르셀로나)',
      title: {
        ko: 'HANKI (바르셀로나 한식 맛집)',
        en: 'HANKI (Warm Korean Dining in Barcelona)',
        ja: 'HANKI (バルセロナの本格韓国料理)',
        zh: 'HANKI (巴塞罗那暖胃韩餐厅)'
      },
      desc: {
        ko: '따뜻한 찌개, 제육볶음, 불고기, 정갈한 밑반찬과 따끈한 공깃밥으로 유럽 여행 중 부모님의 위장을 포근하게 달래주는 바르셀로나 대표 한식당.',
        en: 'Cozy Korean dining offering hot kimchi/doenjang stews, bulgogi, and freshly cooked rice—an absolute lifesaver when parents crave comforting home meals.',
        ja: '温かいチゲ、プルコギ、美味しいご飯と小皿料理が揃い、ヨーロッパ旅行中に親御様の胃袋を優しく癒やす救世主のような韓国料理店。',
        zh: '暖心热腾腾的泡菜大酱锅、烤牛肉与精致家常小菜，在异国长途旅行中让长辈胃肠倍感妥帖惬意。'
      },
      tip: {
        ko: '여행 중반 피로가 누적되었을 때 점심 한 끼로 부모님 기력을 보충해 드리세요.',
        en: 'Perfect midway comfort meal to restore energy and vitality during the trip.',
        ja: '旅行中盤、少し疲れが出た日のランチに訪れると元気回復に最適です。',
        zh: '行程中段稍感疲惫时，在此享用一餐热腾腾的中餐/韩餐极佳。'
      },
      mapUrl: 'https://maps.app.goo.gl/wTaV6GCKtGXorbSn6'
    },
    {
      id: 'cur-bcn-bubo',
      city: 'barcelona',
      cityBadge: { ko: '바르셀로나', en: 'Barcelona', ja: 'バルセロナ', zh: '巴塞罗那' },
      category: 'dessert',
      catBadge: { ko: '세계 챔피언 디저트 카페', en: 'World Champion Pâtisserie', ja: '世界最高峰パティスリー', zh: '世界冠军甜品烘焙名店' },
      name: 'bubó Barcelona (부보)',
      title: {
        ko: 'bubó Barcelona (세계 1위 초콜릿 케이크)',
        en: 'bubó Barcelona (World-Champion Xabina Cake)',
        ja: 'bubó Barcelona (世界一のXabinaチョコレート)',
        zh: 'bubó Barcelona (世界第一黑巧蛋糕名店)'
      },
      desc: {
        ko: '세계 제과 챔피언십에서 최우수 초콜릿 케이크 상을 받은 명작 자바라(Xabina) 케이크로 전 세계 디저트 마니아들을 사로잡은 유명 부티크.',
        en: 'Iconic pastry boutique famous for the award-winning "Xabina" chocolate cake, crowned Best Chocolate Cake in the World at the World Pastry Cup.',
        ja: '世界パティスリー杯で「世界一のチョコレートケーキ」に輝いた名作Xabinaを擁する、世界中のスイーツ愛好家が集う名店。',
        zh: '以斩获世界甜点大赛“全球最佳巧克力蛋糕”桂冠的Xabina黑巧蛋糕名扬四海的殿堂级甜品店。'
      },
      tip: {
        ko: '산타 마리아 델 마르 성당 앞 테라스에서 커피와 함께 고급스러운 디저트 타임을 즐기세요.',
        en: 'Enjoy on the outdoor terrace overlooking Santa Maria del Mar with a fresh espresso.',
        ja: 'サンタ・マリア・デル・マル聖堂前のテラスで、美味しいエスプレッソと共に至福のひとときを。',
        zh: '坐在海洋圣母大教堂前露台，佐以一杯浓缩咖啡慢享悠闲午后。'
      },
      mapUrl: 'https://maps.app.goo.gl/tCpbt3Ve11XuNm7N7'
    },
    {
      id: 'cur-bcn-portuguesa',
      city: 'barcelona',
      cityBadge: { ko: '바르셀로나', en: 'Barcelona', ja: 'バルセロナ', zh: '巴塞罗那' },
      category: 'dessert',
      catBadge: { ko: '정통 포르투갈 에그타르트', en: 'Authentic Portuguese Pastry', ja: '本場エッグタルト名店', zh: '正宗葡式蛋挞烘焙坊' },
      name: 'A Casa Portuguesa (아 카사 포르투게사)',
      title: {
        ko: 'A Casa Portuguesa (정통 에그타르트 & 패스츄리)',
        en: 'A Casa Portuguesa (Egg Tarts & Artisan Pastries)',
        ja: 'A Casa Portuguesa (エッグタルト＆伝統菓子)',
        zh: 'A Casa Portuguesa (现烤葡式蛋挞与酥皮点心)'
      },
      desc: {
        ko: '바삭하게 부서지는 페이스트리 겹과 부드럽고 달콤한 커스터드 크림이 가득 찬 포르투갈 정통 에그타르트(Pastel de Nata) 전문점.',
        en: 'Artisan Portuguese bakery famed for authentic warm Pastel de Nata with flaky laminated crust and caramelized vanilla custard.',
        ja: 'サクサク何層ものパイ生地と、とろけるカスタードクリームが詰まった本場ポルトガルのエッグタルト（パステル・デ・ナタ）専門店。',
        zh: '千层起酥层层轻盈薄脆、内馅奶香浓郁醇厚的正宗葡式蛋挞（Pastel de Nata）老铺。'
      },
      tip: {
        ko: '갓 구워져 나왔을 때 시나몬 파우더를 살짝 뿌려 드시면 황홀합니다.',
        en: 'Sprinkle a dusting of cinnamon and powdered sugar when served warm.',
        ja: '焼き立ての温かいタルトにシナモンパウダーを軽く振って食べるのが本場の流儀。',
        zh: '刚出炉温热时轻撒少许肉桂粉，风味更加地道惊艳。'
      },
      mapUrl: 'https://maps.app.goo.gl/FrTwyCyiygCLfy2q8'
    },

    // === 말라가 & 네르하 (7개) ===
    {
      id: 'cur-agp-balcon-europa',
      city: 'malaga',
      cityBadge: { ko: '말라가 & 네르하', en: 'Málaga & Nerja', ja: 'マラガ＆ネルハ', zh: '马拉加与内尔哈' },
      category: 'sight',
      catBadge: { ko: '네르하 꼭 가야하는 곳', en: 'Must-Visit Viewpoint', ja: 'ネルハ必須の絶景名所', zh: '内尔哈必游悬崖名胜' },
      name: 'Balcón de Europa (유럽의 발코니)',
      title: {
        ko: "Balcón de Europa (네르하 '유럽의 발코니')",
        en: "Balcón de Europa (Nerja Balcony of Europe)",
        ja: "Balcón de Europa (ネルハ ヨーロッパのバルコニー)",
        zh: "Balcón de Europa (内尔哈 欧洲阳台观景台)"
      },
      desc: {
        ko: "스페인 국왕 알폰소 12세가 '유럽의 발코니'라 감탄했던 지중해 절벽 위 탁 트인 전망대. 푸른 바다와 하얀 모래사장, 멀리 병풍처럼 펼쳐진 산맥이 장관입니다.",
        en: "Famous cliffside promontory christened the 'Balcony of Europe' by King Alfonso XII. Panoramic 180° views of crystal-clear turquoise waters and Andalusian peaks.",
        ja: "スペイン国王アルフォンソ12世が「ヨーロッパのバルコニー」と称賛した断崖絶壁の展望台。見渡す限りの地中海ブルーが広がります。",
        zh: "西班牙国王阿方索十二世由衷赞叹并命名的“欧洲阳台”。地中海开阔悬崖平台，碧海蓝天与远山连绵一览无遗。"
      },
      tip: {
        ko: '주변에 그늘 벤치가 잘 마련되어 있어 부모님께서 편안히 바닷바람을 쐬시며 휴식하기에 최적입니다.',
        en: 'Plentiful shady benches allow parents to relax comfortably while admiring ocean vistas.',
        ja: '日陰のベンチが多く整備されており、ご両親が心地よい海風を感じながら休むのに最適です。',
        zh: '周边设有绿荫长椅，长辈迎着地中海海风悠闲歇脚极为舒适。'
      },
      mapUrl: 'https://maps.app.goo.gl/aLnsbZxvwB41Mi9Z6'
    },
    {
      id: 'cur-agp-casa-guardia',
      city: 'malaga',
      cityBadge: { ko: '말라가', en: 'Málaga', ja: 'マラガ', zh: '马拉加' },
      category: 'dining',
      catBadge: { ko: '1840년 설립 최고령 타파스', en: 'Oldest Bodega (Est. 1840)', ja: '1840年創業 最古の老舗バル', zh: '创于1840年 最古老酒庄' },
      name: 'Antigua Casa de Guardia (안티과 카사 데 과르디아)',
      title: {
        ko: 'Antigua Casa de Guardia (1840년 전통 타파스 바)',
        en: 'Antigua Casa de Guardia (Historic Wine & Tapas)',
        ja: 'Antigua Casa de Guardia (1840年創業の樽出しワイン)',
        zh: 'Antigua Casa de Guardia (百年橡木桶甜葡萄酒馆)'
      },
      desc: {
        ko: '말라가에서 가장 오래된 역사적인 전통 와인 보데가. 벽면을 가득 채운 대형 오크통에서 즉석으로 따르는 말라가 스위트 와인과 분필로 카운터에 계산서를 적는 정겨운 아날로그 감성.',
        en: 'The oldest surviving tavern in Málaga (1840). Sweet and dry Málaga dessert wines tapped straight from huge wooden barrels, with the tab chalked on the wooden bar.',
        ja: 'マラガで最も歴史ある伝説のボデガ（1840年創業）。巨大な古樽から注ぐ名物マラガワインと、木製カウンターにチョークで書くお会計が旅情をそそります。',
        zh: '马拉加现存最古老的名酒庄（1840年创立）。从整面巨型橡木桶直取芬芳甜白葡萄酒，吧台上用粉笔记账充满年代质感。'
      },
      tip: {
        ko: '달콤한 말라가 와인(Pajarete 등) 한 잔과 신선한 하몬 핀초를 곁들여 보세요.',
        en: 'Try a glass of sweet Málaga wine paired with a slice of cured jamón.',
        ja: '芳醇な甘口マラガワインとハモン生ハムの小皿を是非お試しください。',
        zh: '点一杯果香馥郁的甜葡萄酒，搭配一片香浓生火腿别有一番风味。'
      },
      mapUrl: 'https://maps.app.goo.gl/3hJ2HYUCXHSLwjA78'
    },
    {
      id: 'cur-agp-madeinterranea',
      city: 'malaga',
      cityBadge: { ko: '말라가', en: 'Málaga', ja: 'マラガ', zh: '马拉加' },
      category: 'dining',
      catBadge: { ko: '숯불 뽈뽀 (문어) 맛집', en: 'Char-grilled Octopus', ja: '炭火焼きポルポ名店', zh: '炭烤章鱼特味小馆' },
      name: 'Madeinterranea brasas y tapas (마데인테라네아)',
      title: {
        ko: 'Madeinterranea brasas y tapas (숯불 뽈뽀 맛집)',
        en: 'Madeinterranea brasas y tapas (Grilled Octopus)',
        ja: 'Madeinterranea brasas y tapas (炭火焼きタコ)',
        zh: 'Madeinterranea brasas y tapas (炭火海鲜章鱼)'
      },
      desc: {
        ko: '숯불 화로 구이 전문 타파스 바로, 불향이 솔솔 풍기는 야들야들한 문어 구이(뽈뽀)와 부드러운 감자 퓌레의 조합이 일품인 말라가 인기 식당.',
        en: 'Charcoal grill specialist celebrated for tender braised octopus grilled over coals, served over velvety potato purée and paprika oil.',
        ja: '炭火焼き専門の人気タパスバル。香ばしい香りをまとった柔らかいタコの炭火焼きと、なめらかなポテトピューレが絶妙。',
        zh: '主打炭烤料理的精致Tapas餐厅。炭香扑鼻、柔韧爆汁的烤章鱼搭配丝滑土豆泥，是马拉加的人气口碑担当。'
      },
      tip: {
        ko: '테이블 좌석이 편안하여 가족 저녁 식사 장소로 쾌적합니다.',
        en: 'Comfortable table seating—ideal for family dinners.',
        ja: 'テーブル席がゆったりしており、ご家族でのディナーに快適です。',
        zh: '散座空间宽敞整洁，适合一家人悠闲共进晚餐。'
      },
      mapUrl: 'https://maps.app.goo.gl/RumkbEyu7gfFnaTLA'
    },
    {
      id: 'cur-agp-puerto-cristal',
      city: 'malaga',
      cityBadge: { ko: '말라가', en: 'Málaga', ja: 'マラガ', zh: '马拉加' },
      category: 'dining',
      catBadge: { ko: '빠에야 & 감바스 알 아히요', en: 'Paella & Sizzling Gambas', ja: 'パエリア＆アヒージョ', zh: '海鲜饭与热蒜大虾' },
      name: 'Puerto Cristal Restaurante (푸에르토 크리스탈)',
      title: {
        ko: 'Puerto Cristal (빠에야 & 감바스 알 아히요)',
        en: 'Puerto Cristal (Paella & Garlic Prawns)',
        ja: 'Puerto Cristal (海鮮パエリア＆アヒージョ)',
        zh: 'Puerto Cristal (海鲜饭与蒜香鲜虾)'
      },
      desc: {
        ko: '뜨거운 토기 냄비에 지글지글 끓여 나오는 마늘 올리브유 새우(감바스 알 아히요)와 신선한 조개, 새우를 듬뿍 넣은 해산물 빠에야 명소.',
        en: 'Generous traditional restaurant renowned for sizzling clay-pot garlic prawns (Gambas al Ajillo) and rich Mediterranean seafood paella.',
        ja: '熱々の土鍋でグツグツと運ばれる本場のガーリックシュリンプ（アヒージョ）と、大粒の魚介が贅沢に入ったパエリアが絶品。',
        zh: '热气腾腾的陶锅蒜香橄榄油浸大虾，虾肉弹牙多汁，搭配大份地中海海鲜饭，饱腹感十足。'
      },
      tip: {
        ko: '감바스 기름에 바게트 빵을 찍어 드시면 한국인 입맛에 가장 친숙하고 맛있습니다.',
        en: 'Dip crusty bread into the garlic prawn oil for an irresistible treat.',
        ja: '旨味が溶け出したガーリックオイルにパンを浸して食べるのが格別です。',
        zh: '用现烤法棍蘸取饱含蒜香鲜甜的初榨橄榄油，极其开胃。'
      },
      mapUrl: 'https://maps.app.goo.gl/YnhGia3789iUof569'
    },
    {
      id: 'cur-agp-bouganvilla',
      city: 'malaga',
      cityBadge: { ko: '말라가', en: 'Málaga', ja: 'マラガ', zh: '马拉加' },
      category: 'dining',
      catBadge: { ko: '오징어튀김 & 빠에야 맛집', en: 'Crispy Calamari & Paella', ja: 'イカフリット＆パエリア', zh: '酥炸鱿鱼圈与海鲜饭' },
      name: 'Restaurante Bar La Bouganvilla (라 부간빌랴)',
      title: {
        ko: 'La Bouganvilla (오징어튀김 & 빠에야)',
        en: 'La Bouganvilla (Crispy Calamari & Paella)',
        ja: 'La Bouganvilla (カラマリイカ揚げ＆パエリア)',
        zh: 'La Bouganvilla (酥炸鱿鱼与海鲜饭名店)'
      },
      desc: {
        ko: '겉은 바삭하고 속은 부드러운 안달루시아식 오징어 튀김(Calamari)과 해산물 빠에야가 훌륭하며, 친절하고 세심한 서비스가 돋보이는 식당.',
        en: 'Beloved dining spot serving golden crispy Andalusian calamari and rich seafood paella with genuinely warm, attentive service.',
        ja: '外はサクッ、中は柔らかいアンダルシア風イカフライ（カラマリ）と魚介パエリアが自慢。親切で温かい接客も高評価。',
        zh: '外酥里软的安达卢西亚黄金酥炸鱿鱼圈与海产海鲜饭，服务热忱贴心。'
      },
      tip: {
        ko: '레몬즙을 듬뿍 뿌린 오징어 튀김은 어르신들도 기름지지 않게 아주 맛있게 드십니다.',
        en: 'Squeezing plenty of fresh lemon over the calamari keeps it light and refreshing.',
        ja: 'レモンをたっぷり搾ると油っぽさが消え、シニアの方もさっぱり召し上がれます。',
        zh: '挤上满满的新鲜柠檬汁，炸物清爽不油腻，深受长辈喜爱。'
      },
      mapUrl: 'https://maps.app.goo.gl/PBhdTfCCRshYwiB18'
    },
    {
      id: 'cur-agp-cambara',
      city: 'malaga',
      cityBadge: { ko: '말라가', en: 'Málaga', ja: 'マラガ', zh: '马拉加' },
      category: 'dining',
      catBadge: { ko: '바닷가 앞 오션뷰 테라스', en: 'Marina Waterfront Dining', ja: '港沿い絶景オーシャンビュー', zh: '游艇码头一线海景露台' },
      name: 'Cambara (캄바라)',
      title: {
        ko: 'Cambara (말라가 항구 Muelle Uno 바닷가 맛집)',
        en: 'Cambara (Muelle Uno Waterfront Dining)',
        ja: 'Cambara (Muelle Uno 港テラス海辺レストラン)',
        zh: 'Cambara (Muelle Uno 码头海滨景观餐厅)'
      },
      desc: {
        ko: '말라가 신항구 Muelle Uno 요트 산책로에 자리 잡아, 지중해 바다와 정박된 보트들을 바라보며 우아한 점심·저녁 식사를 즐길 수 있는 전망 맛집.',
        en: 'Chic waterfront restaurant right along the Muelle Uno marina promenade. Dine on refined Mediterranean cuisine while gazing at yachts and sunsets.',
        ja: 'マラガ新港Muelle Unoの遊歩道沿い。停泊するヨットと美しい海を眺めながら優雅な食事を楽しめる絶景テラスレストラン。',
        zh: '坐落于马拉加新港Muelle Uno滨海漫步道旁，一边欣赏蔚蓝游艇海景一边享用地中海现代美馔。'
      },
      tip: {
        ko: '일몰 무렵 테라스 석을 예약하면 낭만적인 노을 뷰를 만끽할 수 있습니다.',
        en: 'Sunset terrace tables offer breathtaking golden-hour sea views.',
        ja: '日没時間帯のテラス席は夕焼けが海を染める感動の絶景です。',
        zh: '日落时分入座露台，可尽览落日余晖洒满海面的动人美景。'
      },
      mapUrl: 'https://maps.app.goo.gl/evygt9qJNXv1J63b6'
    },
    {
      id: 'cur-agp-vicens-turron',
      city: 'malaga',
      cityBadge: { ko: '말라가', en: 'Málaga', ja: 'マラガ', zh: '马拉加' },
      category: 'dessert',
      catBadge: { ko: '전통 디저트 뚜론 (Turrón) 명가', en: 'Artisan Turrón Nougat', ja: '伝統銘菓トゥロン老舗', zh: '传统坚果杜隆糖名店' },
      name: 'Vicens Turrones Málaga (토론스 비센스)',
      title: {
        ko: 'Vicens Turrones Málaga (스페인 전통 뚜론 명가)',
        en: 'Vicens Turrones Málaga (Historic Spanish Nougat)',
        ja: 'Vicens Turrones Málaga (スペイン伝統トゥロン)',
        zh: 'Vicens Turrones Málaga (西班牙百年手工杜隆糖)'
      },
      desc: {
        ko: '1775년부터 이어온 스페인 국보급 수제 뚜론(Turrón, 아몬드 누가) 전문점. 바삭한 아몬드 뚜론과 부드러운 에그 요크 뚜론 등 부모님과 친지 선물 1순위.',
        en: 'Master artisan nougat confectioners since 1775. Offers premium soft and crunchy almond turrón, chocolate creations, and beautifully packaged holiday gifts.',
        ja: '1775年創業、スペインを代表する伝統銘菓トゥロン（アーモンドヌガー）の老舗。歯触りの良いハードタイプや上品なソフトタイプはお土産に最適。',
        zh: '创立于1775年的西班牙国宝级手工杜隆糖（坚果牛轧糖）名家。香脆杏仁糖与软滑蛋黄糖是给亲友带伴手礼的首选。'
      },
      tip: {
        ko: '매장에서 다양한 뚜론을 무료 시식해본 후 입맛에 맞는 것을 골라 구매할 수 있습니다.',
        en: 'Free tasting samples available in store to discover your favorite varieties.',
        ja: '店内で様々なフレーバーを試食してから好みの品を選べます。',
        zh: '店内核验提供丰富试吃，尝合口味后再行选购。'
      },
      mapUrl: 'https://maps.app.goo.gl/8Lpb9q3f3cNB5twM9'
    },

    // === 세비야 (10개 + 2개 꿀팁) ===
    {
      id: 'cur-svq-pelayo',
      city: 'seville',
      cityBadge: { ko: '세비야', en: 'Seville', ja: 'セビリア', zh: '塞维利亚' },
      category: 'dining',
      catBadge: { ko: '뽈뽀 (문어 요리) 맛집', en: 'Cathedral Pulpo Tapas', ja: '大聖堂横のポルポ名店', zh: '大教堂旁章鱼名店' },
      name: 'Pelayo Bar (펠라요 바)',
      title: {
        ko: 'Pelayo Bar (세비야 대성당 옆 뽈뽀 맛집)',
        en: 'Pelayo Bar (Tender Pulpo beside Cathedral)',
        ja: 'Pelayo Bar (大聖堂横の名物タコ料理)',
        zh: 'Pelayo Bar (塞维利亚大教堂旁章鱼名店)'
      },
      desc: {
        ko: '세비야 대성당에서 도보 1분 거리에 위치한 인기 타파스 바로, 입안에서 부드럽게 씹히는 특제 갈리시아 문어 요리(뽈뽀)와 이베리코 하몬이 유명합니다.',
        en: 'Charming tapas bar just 1 minute from Seville Cathedral, famed for melt-in-the-mouth Galician octopus, Iberian jamón, and refreshing sangria.',
        ja: 'セビリア大聖堂から徒歩1分。柔らかく風味豊かなガリシア風タコ料理（ポルポ）と最高級イベリコ生ハムが自慢の超人気店。',
        zh: '距塞维利亚大教堂仅1分钟步程。极具口碑的加利西亚慢炖章鱼软糯鲜嫩，搭配伊比利亚火腿回味无穷。'
      },
      tip: {
        ko: '대성당 관람 직후 점심 식사 동선으로 매우 편리합니다.',
        en: 'Extremely convenient for lunch immediately after touring the Cathedral.',
        ja: '大聖堂の見学直後のランチとして動線が完璧です。',
        zh: '非常适合参观大教堂完毕后直接作为无缝衔接的午餐据点。'
      },
      mapUrl: 'https://maps.app.goo.gl/f7swS1HX44CGcKgF9'
    },
    {
      id: 'cur-svq-la-brunilda',
      city: 'seville',
      cityBadge: { ko: '세비야', en: 'Seville', ja: 'セビリア', zh: '塞维利亚' },
      category: 'dining',
      catBadge: { ko: '타파스 유명 맛집 (사전예약 필수)', en: 'Acclaimed Tapas (Reservation Req)', ja: '名物タパス (事前予約必須)', zh: '超高人气Tapas (必须提前预约)' },
      name: 'La Brunilda Tapas (라 브루닐다)',
      title: {
        ko: 'La Brunilda Tapas (미슐랭 빕구르망급 타파스)',
        en: 'La Brunilda Tapas (Top-Tier Gourmet Tapas)',
        ja: 'La Brunilda Tapas (予約必須の人気創作タパス)',
        zh: 'La Brunilda Tapas (米其林必比登级别创意Tapas)'
      },
      desc: {
        ko: '세비야에서 가장 예약하기 힘든 최고 인기 타파스 명가. 소꼬리 찜(Rabo de Toro), 오리 가슴살 요리, 튀긴 버섯 등 독창적이고 섬세한 맛의 향연.',
        en: 'Widely hailed as one of Seville’s absolute best tapas restaurants. Celebrated for slow-braised oxtail (Rabo de Toro), duck confit, and crispy croquetas. Advance booking essential.',
        ja: 'セビリアで最も予約困難と言われる最高峰のタパス名店。柔らかい牛テール煮込み、鴨肉のグリルなど一皿一皿が感動の美味しさ。',
        zh: '塞维利亚极其难订但好评如潮的顶级Tapas。经典慢炖牛尾（Rabo de Toro）、香煎鸭胸与松露炸丸子道道惊艳。'
      },
      tip: {
        ko: '사전 예약이 필수이며, 예약에 실패했을 경우 오픈 15분 전 현장 대기줄을 서야 입장 가능합니다.',
        en: 'Online booking essential; otherwise queue 15 minutes before opening doors.',
        ja: '事前予約が必須。予約なしの場合は開店15分前から並ぶ必要があります。',
        zh: '必须提前订位；若未订到，建议在开餐前15分钟提前到店门口排队。'
      },
      mapUrl: 'https://maps.app.goo.gl/2GrJW5ZFfS5XnKd18'
    },
    {
      id: 'cur-svq-moon',
      city: 'seville',
      cityBadge: { ko: '세비야', en: 'Seville', ja: 'セビリア', zh: '塞维利亚' },
      category: 'dining',
      catBadge: { ko: '⭐⭐ 한식 맛집', en: '⭐⭐ Top-Rated Korean Food', ja: '⭐⭐ 本格韓国料理名店', zh: '⭐⭐ 塞维利亚超赞韩餐厅' },
      name: 'Moon (문 한식당)',
      title: {
        ko: 'Moon (세비야 한식 맛집 ⭐⭐)',
        en: 'Moon Korean Restaurant (Seville ⭐⭐)',
        ja: 'Moon (セビリアの韓国料理名店 ⭐⭐)',
        zh: 'Moon (塞维利亚星级地道韩餐厅 ⭐⭐)'
      },
      desc: {
        ko: '정통 한국식 김치찌개, 된장찌개, 소불고기, 제육볶음과 윤기 흐르는 쌀밥을 정성스레 내어주어 안달루시아 여행 중 부모님 만족도가 가장 높은 한식당.',
        en: 'Top-rated Korean kitchen in Seville offering bubbling hot kimchi stew, savory beef bulgogi, and hearty Korean comfort fare that senior parents thoroughly enjoy.',
        ja: '熱々のキムチチゲ、牛プルコギ、美味しいご飯で長旅の疲れを癒やすセビリア随一の韓国料理店。ご両親の満足度抜群。',
        zh: '正宗滚烫的泡菜汤、喷香嫩滑的牛肉烤肉与可口家常米饭，旅途疲劳时长辈打分极高的暖心慰藉。'
      },
      tip: {
        ko: '스페인 음식 특유의 짠맛이나 기름진 맛에 지친 날 저녁 식사로 최고의 힐링이 됩니다.',
        en: 'An incredible restorative dinner when palate fatigue sets in from olive oils and cured hams.',
        ja: 'オリーブオイル続きで胃が疲れた日の夕食に最高の癒やしとなります。',
        zh: '连日西餐感到油腻或味咸时，作为晚间充电回血的一餐效果绝佳。'
      },
      mapUrl: 'https://maps.app.goo.gl/cXz8kJM41sdgb5tX8'
    },
    {
      id: 'cur-svq-vuela',
      city: 'seville',
      cityBadge: { ko: '세비야', en: 'Seville', ja: 'セビリア', zh: '塞维利亚' },
      category: 'dining',
      catBadge: { ko: '타파스 맛집', en: 'Cozy Tapas & Drinks', ja: '心地よいタパスバル', zh: '舒适惬意Tapas酒吧' },
      name: 'Vuela Tapas & Cocktail (부에라)',
      title: {
        ko: 'Vuela Tapas & Cocktail (분위기 좋은 타파스)',
        en: 'Vuela Tapas & Cocktail (Modern Andalusian Tapas)',
        ja: 'Vuela Tapas & Cocktail (モダンタパスバル)',
        zh: 'Vuela Tapas & Cocktail (摩登安达卢西亚Tapas)'
      },
      desc: {
        ko: '친절한 직원 응대와 푹신하고 편안한 좌석, 감각적인 플레이팅의 안달루시아 타파스를 합리적인 가격에 즐길 수 있는 숨은 명소.',
        en: 'Welcoming modern gastrobar featuring comfortable seating, attentive hospitality, and artfully plated Andalusian small plates at very reasonable prices.',
        ja: '心地よいソファー席と親切な接客、洗練されたモダンタパスが手頃な価格で楽しめる隠れた名店。',
        zh: '座席舒适松软、服务细致体贴，以平实亲民的价格呈现充满现代巧思的安达卢西亚风味小食。'
      },
      tip: {
        ko: '좌석 간격이 넉넉하여 60대 부모님께서 느긋하게 식사하시기에 참 좋습니다.',
        en: 'Spacious table layout provides a relaxed, unhurried dining environment for elderly family.',
        ja: '席の間隔が広く、ご両親連れでも焦らずゆっくり食事ができます。',
        zh: '桌位间隔宽裕不嘈杂，适合长辈慢节奏舒适用餐。'
      },
      mapUrl: 'https://maps.app.goo.gl/RemnQaifXweM2DBB9'
    },
    {
      id: 'cur-svq-antonio-garcia',
      city: 'seville',
      cityBadge: { ko: '세비야', en: 'Seville', ja: 'セビリア', zh: '塞维利亚' },
      category: 'shopping',
      catBadge: { ko: '꼭 가야하는 가죽 맛집 (자켓/벨트 필수)', en: 'Must-Visit Leather Shop', ja: '必見の革製品・老舗帽子店', zh: '必逛顶级皮革名店 (皮衣/皮带必买)' },
      name: 'Sombrerería Antonio García (안토니오 가르시아)',
      title: {
        ko: 'Antonio García (꼭 가야하는 전통 가죽·모자 명가)',
        en: 'Antonio García (Historic Leather & Hat Artisan)',
        ja: 'Antonio García (1847年創業 伝説の革・帽子名店)',
        zh: 'Antonio García (创于1847年 传奇皮革与手作帽子名店)'
      },
      desc: {
        ko: '1847년부터 이어온 세비야 최고의 가죽 및 전통 모자 장인 매장. 최상급 스페인산 양가죽 자켓, 평생 쓰는 튼튼한 통가죽 벨트, 고급 장갑 등 가죽 제품 구매 필수 코스.',
        en: 'Heritage leather and millinery shop founded in 1847. World-class Spanish lambskin leather jackets, indestructible full-grain belts, and handcrafted accessories.',
        ja: '1847年創業、セビリア最古級の革製品・伝統帽子専門店。極上の本革レザージャケット、一生モノの厚手レザーベルト、手袋など、本革ショッピングの最重要スポット。',
        zh: '始于1847年的塞维利亚国宝级手工皮具与礼帽工坊。特级纯羊皮夹克、结实耐用可用一生的整张纯牛皮皮带与皮手套，是皮具选购绝对不可错过的朝圣站。'
      },
      tip: {
        ko: '품질 대비 가격이 매우 훌륭하며, 부모님 선물용 가죽 벨트와 자켓 피팅을 꼭 받아보세요.',
        en: 'Exceptional heirloom quality at fair prices—highly recommended for parent gift shopping.',
        ja: '品質に対して良心的な価格設定。ご両親への記念プレゼントにベルトやジャケットの試着を是非。',
        zh: '皮质顶级做工扎实，价格远优于一线奢侈品大牌，为父母试穿选购皮衣皮带极佳。'
      },
      mapUrl: 'https://maps.app.goo.gl/ZciexTiDn1DmsDC88'
    },
    {
      id: 'cur-svq-dorantes',
      city: 'seville',
      cityBadge: { ko: '세비야', en: 'Seville', ja: 'セビリア', zh: '塞维利亚' },
      category: 'shopping',
      catBadge: { ko: '수제 가죽 가방 & 소품', en: 'Handmade Leather Handbags', ja: 'ハンドメイド革バッグ・小物', zh: '纯手工真皮包袋与皮具配件' },
      name: 'Dorantes Harness (도란테스 하네스)',
      title: {
        ko: 'Dorantes Harness (장인 수제 가죽 가방 & 소품)',
        en: 'Dorantes Harness (Artisan Leather Handbags)',
        ja: 'Dorantes Harness (高級ハンドメイド革バッグ)',
        zh: 'Dorantes Harness (大师级手工皮包工坊)'
      },
      desc: {
        ko: '안달루시아 전통 마구(馬具) 제작 기법에서 출발한 최고급 수제 가죽 공방. 부드럽고 질긴 최고급 스페인 천연 가죽으로 정밀하게 바느질한 가방과 지갑, 소품들.',
        en: 'Elite bespoke leather atelier rooted in Andalusian saddlery craftsmanship. Masterfully stitched handbags, totes, and wallets made from supple Spanish hides.',
        ja: 'アンダルシア伝統の馬具作り技術を受け継ぐ高級革工房。最高品質のスペイン天然レザーで作られた手縫いバッグや財布、小物が並びます。',
        zh: '源于安达卢西亚传统马具精湛缝纫工艺的顶级手工皮具工坊。选用天然丰腴皮料精心手工缝制的手袋、皮夹与配件，极富质感。'
      },
      tip: {
        ko: '어머님을 위한 품격 있는 데일리 가죽 가방 선물로 최고의 만족도를 자랑합니다.',
        en: 'An elegant, long-lasting gift handbag for mothers with timeless style.',
        ja: 'お母様への上品で長く愛用できるデイリー革バッグの贈り物として大人気です。',
        zh: '作为送给母亲的高雅实用皮包伴手礼，深受长辈喜爱。'
      },
      mapUrl: 'https://maps.app.goo.gl/uGce2EjU7Wqr5GUp8'
    },
    {
      id: 'cur-svq-catedral',
      city: 'seville',
      cityBadge: { ko: '세비야', en: 'Seville', ja: 'セビリア', zh: '塞维利亚' },
      category: 'sight',
      catBadge: { ko: '꼭 가야하는 곳 (유네스코)', en: 'Must-Visit UNESCO Site', ja: '必見の世界遺産', zh: '必游胜地 (世界文化遗产)' },
      name: 'Catedral de Sevilla (세비야 대성당 & 히랄다탑)',
      title: {
        ko: 'Catedral de Sevilla (세비야 대성당 & 히랄다탑)',
        en: 'Catedral de Sevilla & Giralda Tower',
        ja: 'Catedral de Sevilla (セビリア大聖堂＆ヒラルダの塔)',
        zh: 'Catedral de Sevilla (塞维利亚大教堂与吉拉达钟楼)'
      },
      desc: {
        ko: '세계에서 세 번째로 큰 성당이자 최대 규모의 고딕 양식 성당. 콜럼버스의 유골을 멘 스페인 4대 왕 석상과 오렌지 중정, 완만한 경사로로 오르는 히랄다 탑.',
        en: 'The world’s largest Gothic cathedral and third-largest church overall. Houses the tomb of Christopher Columbus and the iconic Giralda bell tower climbed via ramps.',
        ja: '世界最大のゴシック大聖堂。コロンブスの棺を担ぐ4人の王の像や、階段ではなく緩やかなスロープで登れる名塔ヒラルダが必見。',
        zh: '世界最大哥特式教堂与第三大天主教堂。安放哥伦布灵柩，内部金碧辉煌，登顶吉拉达钟楼为平缓无台阶斜坡，视野极佳。'
      },
      tip: {
        ko: '히랄다 탑은 계단이 아닌 완만한 경사로로 설계되어 부모님께서도 무릎에 무리 없이 천천히 올라가실 수 있습니다.',
        en: 'The Giralda uses gentle inclined ramps instead of stairs, making it surprisingly gentle on senior knees.',
        ja: 'ヒラルダの塔は階段ではなく緩やかなスロープ構造のため、ご両親の膝への負担が少なく登れます。',
        zh: '吉拉达塔内部设计为宽缓斜坡而非阶梯，陪同长辈缓缓步登毫无负担。'
      },
      mapUrl: 'https://maps.app.goo.gl/pvpdKLePBzrtv7Qr8'
    },
    {
      id: 'cur-svq-plaza-espana',
      city: 'seville',
      cityBadge: { ko: '세비야', en: 'Seville', ja: 'セビリア', zh: '塞维利亚' },
      category: 'sight',
      catBadge: { ko: '꼭 가야하는 곳 (스페인 최고 광장)', en: 'Iconic Plaza of Spain', ja: '必見のスペイン広場', zh: '必游胜地 (西班牙最壮丽广场)' },
      name: 'Plaza de España (스페인 광장)',
      title: {
        ko: 'Plaza de España (세비야 스페인 광장)',
        en: 'Plaza de España (Seville)',
        ja: 'Plaza de España (セビリア スペイン広場)',
        zh: 'Plaza de España (塞维利亚 西班牙广场)'
      },
      desc: {
        ko: '1929년 이베로-아메리카 박람회를 위해 건설된 스페인에서 가장 웅장하고 아름다운 광장. 화려한 채색 타일 모자이크, 인공 수로와 아치형 다리, 밤의 황홀한 야경.',
        en: 'Monumental semi-circular plaza built for the 1929 Ibero-American Expo. Features tiled provincial alcoves, scenic bridges over canals, and breathtaking illuminated nightscapes.',
        ja: '1929年万博のために建てられたスペインで最も壮大な半円形広場。58の州を描いた美しいタイルベンチ、運河の小舟、ロマンチックな夜景が圧巻。',
        zh: '1929年伊比利亚美洲博览会主会场。宏伟半圆形宫殿回廊、西班牙各省精美彩釉瓷砖壁龛、运河小桥与如梦如幻的夜晚照明。'
      },
      tip: {
        ko: '낮의 화사한 풍경과 밤의 웅장한 야간 조명 산책을 모두 즐기시는 것을 강력 추천합니다 (무료 입장).',
        en: 'Visiting both by daylight and during evening illuminations is highly recommended (free entry).',
        ja: '昼の青空と夜のライトアップ、両方訪れるのが断然おすすめです（入場無料）。',
        zh: '白天日光明媚与夜晚金色华灯初上各有千秋，免费开放，推荐早晚各赏一次。'
      },
      mapUrl: 'https://maps.app.goo.gl/SHA5d5vaY19KNmEr6'
    },
    {
      id: 'cur-svq-metropol',
      city: 'seville',
      cityBadge: { ko: '세비야', en: 'Seville', ja: 'セビリア', zh: '塞维利亚' },
      category: 'sight',
      catBadge: { ko: '꼭 가야하는 곳 (현대 랜드마크)', en: 'Iconic Modern Wooden Landmark', ja: '必見の巨大木造建築', zh: '必游胜地 (世界最大木结构地标)' },
      name: 'Metropol Parasol (메트로폴 파라솔 / 라스 세타스)',
      title: {
        ko: 'Metropol Parasol (라스 세타스 데 세비야)',
        en: 'Metropol Parasol (Setas de Sevilla)',
        ja: 'Metropol Parasol (セタス・デ・セビリア)',
        zh: 'Metropol Parasol (都市阳伞 / 塞维利亚大蘑菇)'
      },
      desc: {
        ko: "세계 최대 규모의 버섯 모양 목조 건축물 '세타스 데 세비야'. 지상 광장은 무료로 관람하며, 지하에서 티켓을 끊고 엘리베이터를 타면 세비야 구시가지 전경이 내려다보이는 지붕 산책로로 이어집니다.",
        en: "The world's largest wooden waffle structure ('Mushrooms of Seville'). Stroll the open plaza freely, or purchase an elevator pass to walk the rooftop skyline skybridge at dusk.",
        ja: "「セビリアのキノコ」の愛称で親しまれる世界最大の木造建築。地上広場は自由散策可能。エレベーターで屋上歩道に上がればセビリア市街の絶景を一望。",
        zh: "被誉为“塞维利亚大蘑菇”的全球最大木造建筑。地面广场为自由步行的公共空间；购票乘电梯至顶层漫步曲面空中步道，俯瞰古城天际线。"
      },
      tip: {
        ko: '지붕 산책로는 엘리베이터로 직행하므로 부모님께서도 계단 고생 없이 편안히 일몰을 감상하실 수 있습니다.',
        en: 'Rooftop skybridge is accessed via elevator, making it accessible for senior parents.',
        ja: '屋上へはエレベーターで上がれるため、ご両親も階段の負担なく夕景パノラマを楽しめます。',
        zh: '屋顶步道由电梯直达，长辈无需攀爬繁重台阶即可尽赏黄昏日落。'
      },
      mapUrl: 'https://maps.app.goo.gl/YSParsUd9n6CWtra9'
    },
    {
      id: 'cur-svq-puente-isabel',
      city: 'seville',
      cityBadge: { ko: '세비야', en: 'Seville', ja: 'セビリア', zh: '塞维利亚' },
      category: 'sight',
      catBadge: { ko: '꼭 가야하는 곳 (트리아나 다리)', en: 'Historic Triana Iron Bridge', ja: '必見の歴史的トリアナ橋', zh: '必游胜地 (特里亚纳百年铁桥)' },
      name: 'Puente de Isabel II (이사벨 2세 다리)',
      title: {
        ko: 'Puente de Isabel II (트리아나 다리 & 강변 산책)',
        en: 'Puente de Isabel II (Triana Bridge Riverwalk)',
        ja: 'Puente de Isabel II (イサベル2世橋＆川辺散策)',
        zh: 'Puente de Isabel II (伊莎贝尔二世大桥与河畔步道)'
      },
      desc: {
        ko: '과달키비르 강을 가로질러 플라멩코와 도자기의 본고장 트리아나 지구로 이어지는 19세기 철제 다리. 황금빛 석양과 강변 테라스 카페들이 낭만을 더합니다.',
        en: 'Iconic 19th-century cast-iron bridge spanning the Guadalquivir to historic Triana, the cradle of flamenco and ceramics. Splendid golden-hour sunset vistas.',
        ja: 'グアダルキビル川を渡り、フラメンコと陶芸の本場トリアナ地区へ渡る19世紀の歴史ある鉄橋。夕暮れ時の川辺のカフェテラス散歩は格別の情緒。',
        zh: '跨越瓜达尔基维尔河、连接弗拉门戈发源地特里亚纳区的19世纪著名铸铁桥。夕阳漫天时漫步桥上，两岸酒馆与河畔倒影极尽浪漫。'
      },
      tip: {
        ko: '다리를 건넌 후 트리아나 시장(Mercado de Triana)과 베티스 거리(Calle Betis) 강변 야경을 감상하세요.',
        en: 'Cross to visit Mercado de Triana and stroll vibrant Calle Betis along the river.',
        ja: '橋を渡った先のトリアナ市場や、対岸の夜景が美しいベティス通りの散策がおすすめ。',
        zh: '过桥后可直接探访特里亚纳传统市场与著名的贝蒂斯河景街（Calle Betis）。'
      },
      mapUrl: 'https://maps.app.goo.gl/rGLxP2qKzkfvrMg5A'
    }
  ];

  // 3. 세비야 추가 꿀팁 (세비시 공공 자전거 & 플라멩코)
  const SEVILLE_BONUS_TIPS = {
    sevici: {
      icon: '🚲',
      title: {
        ko: '세비시 (Sevici) 공공 자전거 서비스 이용 꿀팁',
        en: 'Sevici Public Bike Share System Guide',
        ja: 'セビシ (Sevici) 公共レンタサイクル活用術',
        zh: 'Sevici公共自行车租借全攻略'
      },
      desc: {
        ko: '스마트폰에 공식 어플 "Sevici"를 설치하면 신용카드 등록 후 세비야 시내 250여 개 스테이션 어디서든 자전거를 대여·반납할 수 있습니다. 세비야는 언덕이 거의 없는 완전한 평지 도시이며, 스페인 광장, 마리아 루이사 공원, 과달키비르 강변을 따라 자전거 전용 도로가 완벽하게 분리 정비되어 있어 상쾌한 라이딩에 강력 추천합니다.',
        en: 'Install the official "Sevici" smartphone app to register and rent bicycles from 250+ stations throughout Seville. The city is blissfully flat with dedicated, segregated bike pathways across Plaza de España, Maria Luisa Park, and along the scenic riverbanks.',
        ja: '公式アプリ「Sevici」をインストールしてカード登録すると、セビリア市内250カ所以上のステーションで手軽に自転車の貸出・返却が可能です。セビリアは坂道のない平坦な街で、スペイン広場や公園、川沿いに完璧な自転車専用レーンが整備されており爽快なサイクリングが楽しめます。',
        zh: '在手机上下载官方“Sevici”App并绑定信用卡，即可在塞维利亚全城250多个站点随借随还。塞维利亚全城几乎无坡度、极其平坦，西班牙广场、玛丽亚路易莎公园及河畔均设有极其完备的专用自行车道，骑行体验极其舒适。'
      }
    },
    flamenco: {
      icon: '💃',
      title: {
        ko: '세비야 정통 플라멩코 (Flamenco) 관람 꿀팁',
        en: 'Authentic Flamenco Performance Guide in Seville',
        ja: 'セビリア本場フラメンコ鑑賞の極意',
        zh: '塞维利亚正宗弗拉门戈歌舞鉴赏贴士'
      },
      desc: {
        ko: '플라멩코의 발상지 세비야에서 라이브 공연은 필수 코스입니다. 플라멩코 박물관(Museo del Baile Flamenco), 유서 깊은 타블라오 엘 아레날(Tablao El Arenal), 로스 가요스(Los Gallos) 등을 공식 사이트에서 사전에 좌석 지정 예약하세요. 60대 부모님께서도 편안히 의자에 앉아 땀방울과 발구름, 기타 연주를 눈앞에서 생생하게 만끽하실 수 있습니다.',
        en: 'Seville is the beating heart of flamenco. Secure advance seated tickets at reputable venues like Museo del Baile Flamenco, Tablao El Arenal, or Los Gallos. This ensures comfortable seated viewing for senior parents to experience raw vocal power, intricate footwork, and live guitar up close.',
        ja: 'フラメンコ発祥の地セビリアで本場の舞台鑑賞は欠かせません。「フラメンコ舞踊博物館」や老舗タブラオ「エル・アレナル」「ロス・ガヨス」等を事前予約しておくと、ご両親もゆったり着席して、目の前で迫力のステップとギターの音色に酔いしれることができます。',
        zh: '塞维利亚是弗拉门戈的灵魂发源地。强烈建议通过官方渠道提前预订有固定座位的演出票，如弗拉门戈舞蹈博物馆、历史悠久的Tablao El Arenal或Los Gallos小剧场。长辈可从容就座，近距离感受踏步与吉他共振的震撼生命力。'
      }
    }
  };

  // 4. UI 다국어 사전
  const UI_TEXTS = {
    ko: {
      subnavHeartPlaces: '💖 구글지도 하트 맛집·쇼핑·명소 (31선)',
      subnavNerjaGuide: '🚌 말라가↔네르하·프리힐리아나 당일치기',
      headerHeartPlaces: '구글 지도 엄선 하트 장소 (31선)',
      descHeartPlaces: '바르셀로나, 말라가·네르하, 세비야 현지에서 직접 검증한 맛집, 디저트, 쇼핑 및 필수 명소 큐레이션',
      cityAll: '🌐 전체 도시',
      cityBcn: '🇪🇸 바르셀로나',
      cityAgp: '🇪🇸 말라가 & 네르하',
      citySvq: '🇪🇸 세비야',
      catAll: '전체 유형',
      catDining: '🥘 맛집',
      catDessert: '🍰 디저트 & 카페',
      catShopping: '🛍️ 쇼핑 & 가죽',
      catSight: '🏛️ 꼭 가야하는 곳',
      searchPlaceholder: '식당명, 메뉴, 꿀대구, 뽈뽀, 쇼핑 등 검색...',
      btnOpenMap: '💖 구글 지도 열기 / 하트 저장 ↗',
      emptyPlaces: '검색 및 필터 조건에 해당하는 장소가 없습니다.',
      nerjaTimelineTitle: '⏰ 추천 당일치기 타임라인 (예시)',
      alsaBookingBtn: '🎟️ ALSA 버스 공식 예매 사이트 열기 (alsa.com) ↗',
      nerjaMapBtn: '📍 네르하 유럽의 발코니 구글 지도 열기 ↗',
      bestDateBadge: '📅 최적 방문 추천일',
      stepBoard: '탑승:',
      stepDrop: '하차:',
      stepDuration: '소요 및 요금:',
      tipLabel: '💡 동행 배려 팁:',
      bonusTipsHeader: '✨ 세비야 현지 2대 필수 여행 꿀팁'
    },
    en: {
      subnavHeartPlaces: '💖 Curated Google Maps Places (31 Picks)',
      subnavNerjaGuide: '🚌 Málaga ➔ Nerja & Frigiliana Day Trip',
      headerHeartPlaces: 'Curated Google Maps Saved Places (31 Picks)',
      descHeartPlaces: 'Carefully curated dining, desserts, shopping, and essential sights across Barcelona, Málaga & Nerja, and Seville.',
      cityAll: '🌐 All Cities',
      cityBcn: '🇪🇸 Barcelona',
      cityAgp: '🇪🇸 Málaga & Nerja',
      citySvq: '🇪🇸 Seville',
      catAll: 'All Categories',
      catDining: '🥘 Dining & Tapas',
      catDessert: '🍰 Desserts & Cafes',
      catShopping: '🛍️ Shopping & Leather',
      catSight: '🏛️ Must-Visit Sights',
      searchPlaceholder: 'Search restaurant, dish, cod, pulpo, leather...',
      btnOpenMap: '💖 Open Google Maps / Save Heart ↗',
      emptyPlaces: 'No places found matching your filter criteria.',
      nerjaTimelineTitle: '⏰ Recommended Day Trip Timeline (Sample)',
      alsaBookingBtn: '🎟️ Official ALSA Coach Booking Portal (alsa.com) ↗',
      nerjaMapBtn: '📍 Open Balcón de Europa on Google Maps ↗',
      bestDateBadge: '📅 Best Day Recommendation',
      stepBoard: 'Boarding:',
      stepDrop: 'Drop-off:',
      stepDuration: 'Duration & Fare:',
      tipLabel: '💡 Senior Family Tip:',
      bonusTipsHeader: '✨ Seville Essential Local Travel Highlights'
    },
    ja: {
      subnavHeartPlaces: '💖 Googleマップお気に入り必須リスト (31選)',
      subnavNerjaGuide: '🚌 マラガ発 ネルハ＆フリヒリアナ日帰り',
      headerHeartPlaces: 'Googleマップ厳選お気に入りスポット (31選)',
      descHeartPlaces: 'バルセロナ、マラガ・ネルハ、セビリアの現地で厳選したグルメ、スイーツ、ショッピング、必見スポット',
      cityAll: '🌐 すべての都市',
      cityBcn: '🇪🇸 バルセロナ',
      cityAgp: '🇪🇸 マラガ＆ネルハ',
      citySvq: '🇪🇸 セビリア',
      catAll: 'すべての分類',
      catDining: '🥘 グルメ＆タパス',
      catDessert: '🍰 スイーツ＆カフェ',
      catShopping: '🛍️ ショッピング＆革製品',
      catSight: '🏛️ 必見スポット',
      searchPlaceholder: '店名、メニュー、ハニーコッド、タコ、革製品など検索...',
      btnOpenMap: '💖 Googleマップを開く / お気に入り保存 ↗',
      emptyPlaces: '条件に一致するスポットが見つかりません。',
      nerjaTimelineTitle: '⏰ おすすめ日帰りタイムライン (目安)',
      alsaBookingBtn: '🎟️ ALSAバス公式サイトで予約 (alsa.com) ↗',
      nerjaMapBtn: '📍 ネルハ ヨーロッパのバルコニーの地図を開く ↗',
      bestDateBadge: '📅 おすすめ訪問日',
      stepBoard: '乗車:',
      stepDrop: '下車:',
      stepDuration: '所要時間・料金:',
      tipLabel: '💡 シニア配慮のヒント:',
      bonusTipsHeader: '✨ セビリア現地 2大旅行ワンポイント'
    },
    zh: {
      subnavHeartPlaces: '💖 谷歌地图红心收藏精选清单 (31选)',
      subnavNerjaGuide: '🚌 马拉加至内尔哈·弗里希利亚纳一日游',
      headerHeartPlaces: '谷歌地图精选红心收藏 (31选)',
      descHeartPlaces: '巴塞罗那、马拉加与内尔哈、塞维利亚当地精选的美食、甜品、购物及必游景点',
      cityAll: '🌐 全部城市',
      cityBcn: '🇪🇸 巴塞罗那',
      cityAgp: '🇪🇸 马拉加与内尔哈',
      citySvq: '🇪🇸 塞维利亚',
      catAll: '全部分类',
      catDining: '🥘 经典美食',
      catDessert: '🍰 甜品咖啡',
      catShopping: '🛍️ 精品购物与皮具',
      catSight: '🏛️ 必游名胜',
      searchPlaceholder: '搜索餐厅、菜品、蜂蜜鳕鱼、章鱼、皮具...',
      btnOpenMap: '💖 在谷歌地图查看 / 加红心收藏 ↗',
      emptyPlaces: '未找到符合条件的地点。',
      nerjaTimelineTitle: '⏰ 推荐一日游时间表（参考）',
      alsaBookingBtn: '🎟️ 打开ALSA大巴官方预订网站 (alsa.com) ↗',
      nerjaMapBtn: '📍 在谷歌地图打开内尔哈欧洲阳台 ↗',
      bestDateBadge: '📅 最佳游览日推荐',
      stepBoard: '上车:',
      stepDrop: '下车:',
      stepDuration: '耗时与票价:',
      tipLabel: '💡 陪同长辈贴士:',
      bonusTipsHeader: '✨ 塞维利亚两大独家本地游锦囊'
    }
  };

  // State
  window.curatedPlacesFilterState = window.curatedPlacesFilterState || {
    city: 'all',
    category: 'all',
    search: ''
  };

  // 5. 렌더링 함수: 말라가 출발 네르하 & 프리힐리아나 당일치기 가이드
  function renderNerjaDaytripGuide(lang) {
    const mount = document.getElementById('nerja-daytrip-guide');
    if (!mount) return;

    const currentL = (lang && ['ko', 'en', 'ja', 'zh'].includes(lang))
      ? lang
      : ((typeof currentLang !== 'undefined' && ['ko', 'en', 'ja', 'zh'].includes(currentLang)) ? currentLang : 'ko');

    const ui = UI_TEXTS[currentL] || UI_TEXTS.ko;
    const d = NERJA_DAYTRIP_DATA;

    const badge = d.badge[currentL] || d.badge.ko;
    const title = d.title[currentL] || d.title.ko;
    const intro = d.intro[currentL] || d.intro.ko;

    const dateTitle = currentL === 'en' ? '📅 When is the Best Day to Go?' : (currentL === 'ja' ? '📅 いつ行くのがベスト？' : (currentL === 'zh' ? '📅 哪天出行最为适宜？' : '📅 언제 가는 것이 가장 좋을까요?'));
    const dateText = d.dateRec[currentL === 'en' ? 'dateEn' : (currentL === 'ja' ? 'dateJa' : (currentL === 'zh' ? 'dateZh' : 'date'))];
    const dateReason = d.dateRec.reason[currentL] || d.dateRec.reason.ko;

    const routeTitle = currentL === 'en' ? '🗺️ Core Public Transit (ALSA) Route' : (currentL === 'ja' ? '🗺️ 公共交通機関 (ALSA) 移動のゴールデンルート' : (currentL === 'zh' ? '🗺️ 公共交通(ALSA)出行核心路线' : '🗺️ 대중교통(ALSA) 이동 핵심 루트'));
    const routeIntro = currentL === 'en' ? 'This excursion is best completed combining ALSA coaches with local waiting taxis.' : (currentL === 'ja' ? 'このコースはALSA長距離バスと現地のタクシーを組み合わせるのが最も快適です。' : (currentL === 'zh' ? '此路线推荐采用ALSA城际大巴与当地出租车无缝接驳。' : '이 코스는 ALSA 버스와 현지 로컬 버스(또는 택시)를 조합해서 이동해야 합니다.'));

    const s1 = d.step1;
    const s2 = d.step2;

    const timelineHtml = d.timeline.map(item => `
      <div class="nerja-time-item">
        <div class="time-col">
          <span class="time-badge">${item.time}</span>
          <span class="time-icon">${item.icon}</span>
        </div>
        <div class="content-col">
          <h4>${item.title[currentL] || item.title.ko}</h4>
          <p>${item.desc[currentL] || item.desc.ko}</p>
        </div>
      </div>
    `).join('');

    mount.innerHTML = `
      <div class="nerja-daytrip-card" style="background:#fff;border:1.5px solid #d4e0d7;border-radius:24px;padding:28px;margin-bottom:28px;box-shadow:0 12px 36px rgba(26,82,73,0.06);">
        <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;margin-bottom:16px;">
          <span style="background:#e8f4ed;color:#1a5249;font-size:12px;font-weight:800;padding:6px 14px;border-radius:20px;letter-spacing:0.04em;">${badge}</span>
          <span style="background:#fff2eb;color:#d8754d;font-size:12px;font-weight:700;padding:6px 14px;border-radius:20px;">${ui.bestDateBadge}</span>
        </div>
        <h3 style="font-size:clamp(20px, 3.2vw, 26px);color:#1c2e2c;margin:0 0 12px;font-weight:800;letter-spacing:-0.03em;">${title}</h3>
        <p style="font-size:14.5px;color:#4a5c58;line-height:1.75;margin:0 0 22px;">${intro}</p>

        <!-- 언제 가는 것이 좋을까요 -->
        <div style="background:#faf8f4;border:1px solid #e7ded0;border-left:5px solid #1a5249;border-radius:14px;padding:18px 20px;margin-bottom:22px;">
          <h4 style="margin:0 0 8px;font-size:15px;color:#1a5249;font-weight:800;">${dateTitle}</h4>
          <div style="font-size:14px;font-weight:700;color:#1c2e2c;margin-bottom:6px;">✨ ${dateText}</div>
          <p style="margin:0;font-size:13.5px;color:#5c6b68;line-height:1.65;">${dateReason}</p>
        </div>

        <!-- 2단계 이동 루트 -->
        <h4 style="font-size:17px;color:#1c2e2c;font-weight:800;margin:0 0 14px;">${routeTitle}</h4>
        <p style="font-size:13.5px;color:#6b7c78;margin:0 0 18px;">${routeIntro}</p>

        <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(290px, 1fr));gap:16px;margin-bottom:24px;">
          <!-- 1단계 -->
          <div style="background:#ffffff;border:1px solid #dde6e0;border-radius:18px;padding:20px;box-shadow:0 4px 14px rgba(0,0,0,0.03);">
            <div style="display:flex;align-items:center;gap:8px;margin-bottom:12px;">
              <span style="background:#1a5249;color:#fff;font-size:11px;font-weight:800;padding:3px 9px;border-radius:8px;">STEP 1</span>
              <strong style="font-size:15px;color:#1c2e2c;">${s1.title[currentL] || s1.title.ko}</strong>
            </div>
            <ul style="margin:0;padding-left:18px;font-size:13px;color:#4a5c58;line-height:1.75;">
              <li><strong>${ui.stepBoard}</strong> ${s1.board[currentL] || s1.board.ko}</li>
              <li><strong>${ui.stepDrop}</strong> ${s1.drop[currentL] || s1.drop.ko}</li>
              <li><strong>${ui.stepDuration}</strong> ${s1.duration} · ${s1.fare}</li>
            </ul>
            <div style="margin-top:12px;background:#f3f8f5;border-radius:10px;padding:10px 12px;font-size:12px;color:#1a5249;line-height:1.55;">
              <strong>💡 ${s1.tip[currentL] || s1.tip.ko}</strong>
            </div>
          </div>

          <!-- 2단계 -->
          <div style="background:#ffffff;border:1px solid #dde6e0;border-radius:18px;padding:20px;box-shadow:0 4px 14px rgba(0,0,0,0.03);">
            <div style="display:flex;align-items:center;gap:8px;margin-bottom:12px;">
              <span style="background:#d8754d;color:#fff;font-size:11px;font-weight:800;padding:3px 9px;border-radius:8px;">STEP 2</span>
              <strong style="font-size:15px;color:#1c2e2c;">${s2.title[currentL] || s2.title.ko}</strong>
            </div>
            <div style="font-size:12.5px;color:#85542f;background:#fff6ef;padding:8px 10px;border-radius:8px;margin-bottom:10px;">
              ⚠️ ${s2.warning[currentL] || s2.warning.ko}
            </div>
            <div style="font-size:12.5px;color:#6b7c78;margin-bottom:8px;">
              <strong>${s2.optA.title[currentL] || s2.optA.title.ko}:</strong> ${s2.optA.desc[currentL] || s2.optA.desc.ko}
            </div>
            <div style="font-size:13px;color:#1a5249;background:#eef7f2;border-radius:10px;padding:10px 12px;border:1px solid #cce5d6;line-height:1.55;">
              <strong>${s2.optB.title[currentL] || s2.optB.title.ko}:</strong><br>
              ${s2.optB.desc[currentL] || s2.optB.desc.ko}
            </div>
          </div>
        </div>

        <!-- 타임라인 -->
        <h4 style="font-size:16px;color:#1c2e2c;font-weight:800;margin:0 0 16px;">${ui.nerjaTimelineTitle}</h4>
        <div class="nerja-timeline-grid" style="display:grid;grid-template-columns:repeat(auto-fit, minmax(240px, 1fr));gap:12px;margin-bottom:22px;">
          ${timelineHtml}
        </div>

        <!-- 하단 바로가기 버튼들 -->
        <div style="display:flex;flex-wrap:wrap;gap:10px;padding-top:14px;border-top:1px solid #e7ded0;">
          <a href="https://www.alsa.com/en/web/bus/home" target="_blank" rel="noopener noreferrer" style="display:inline-flex;align-items:center;gap:6px;background:#1a5249;color:#fff;text-decoration:none;font-size:13px;font-weight:700;padding:10px 18px;border-radius:12px;transition:opacity 0.2s;">
            ${ui.alsaBookingBtn}
          </a>
          <a href="https://maps.app.goo.gl/aLnsbZxvwB41Mi9Z6" target="_blank" rel="noopener noreferrer" style="display:inline-flex;align-items:center;gap:6px;background:#fff;color:#1c2e2c;border:1px solid #cad8ce;text-decoration:none;font-size:13px;font-weight:700;padding:10px 18px;border-radius:12px;">
            ${ui.nerjaMapBtn}
          </a>
        </div>
      </div>
    `;
  }

  // 6. 렌더링 함수: 31개 구글 지도 큐레이션 하트 리스트
  function renderCuratedHeartPlaces(lang) {
    const mount = document.getElementById('curated-family-places');
    if (!mount) return;

    const currentL = (lang && ['ko', 'en', 'ja', 'zh'].includes(lang))
      ? lang
      : ((typeof currentLang !== 'undefined' && ['ko', 'en', 'ja', 'zh'].includes(currentLang)) ? currentLang : 'ko');

    const ui = UI_TEXTS[currentL] || UI_TEXTS.ko;
    const state = window.curatedPlacesFilterState;

    // Filter items
    const filtered = CURATED_PLACES_DATA.filter(item => {
      if (state.city !== 'all' && item.city !== state.city) return false;
      if (state.category !== 'all' && item.category !== state.category) return false;
      if (state.search && state.search.trim() !== '') {
        const q = state.search.trim().toLowerCase();
        const hay = `${item.name} ${item.title[currentL] || ''} ${item.title.ko || ''} ${item.desc[currentL] || ''} ${item.tip[currentL] || ''}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });

    // Counts
    const cAll = CURATED_PLACES_DATA.length;
    const cBcn = CURATED_PLACES_DATA.filter(x => x.city === 'barcelona').length;
    const cAgp = CURATED_PLACES_DATA.filter(x => x.city === 'malaga').length;
    const cSvq = CURATED_PLACES_DATA.filter(x => x.city === 'seville').length;

    // City Buttons
    const cityButtons = `
      <div class="curated-pill-row" style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:12px;">
        <button type="button" class="cur-pill ${state.city === 'all' ? 'active' : ''}" onclick="window.setCuratedPlacesCity('all')">${ui.cityAll} (${cAll})</button>
        <button type="button" class="cur-pill ${state.city === 'barcelona' ? 'active' : ''}" onclick="window.setCuratedPlacesCity('barcelona')">${ui.cityBcn} (${cBcn})</button>
        <button type="button" class="cur-pill ${state.city === 'malaga' ? 'active' : ''}" onclick="window.setCuratedPlacesCity('malaga')">${ui.cityAgp} (${cAgp})</button>
        <button type="button" class="cur-pill ${state.city === 'seville' ? 'active' : ''}" onclick="window.setCuratedPlacesCity('seville')">${ui.citySvq} (${cSvq})</button>
      </div>
    `;

    // Category Buttons
    const catButtons = `
      <div class="curated-pill-row" style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:16px;">
        <button type="button" class="cur-pill-sm ${state.category === 'all' ? 'active' : ''}" onclick="window.setCuratedPlacesCat('all')">${ui.catAll}</button>
        <button type="button" class="cur-pill-sm ${state.category === 'dining' ? 'active' : ''}" onclick="window.setCuratedPlacesCat('dining')">${ui.catDining}</button>
        <button type="button" class="cur-pill-sm ${state.category === 'dessert' ? 'active' : ''}" onclick="window.setCuratedPlacesCat('dessert')">${ui.catDessert}</button>
        <button type="button" class="cur-pill-sm ${state.category === 'shopping' ? 'active' : ''}" onclick="window.setCuratedPlacesCat('shopping')">${ui.catShopping}</button>
        <button type="button" class="cur-pill-sm ${state.category === 'sight' ? 'active' : ''}" onclick="window.setCuratedPlacesCat('sight')">${ui.catSight}</button>
      </div>
    `;

    // Cards HTML
    const cardsHtml = filtered.map(item => {
      const cityBadge = item.cityBadge[currentL] || item.cityBadge.ko;
      const catBadge = item.catBadge[currentL] || item.catBadge.ko;
      const title = item.title[currentL] || item.title.ko;
      const desc = item.desc[currentL] || item.desc.ko;
      const tip = item.tip[currentL] || item.tip.ko;

      return `
        <div class="curated-place-card" style="background:#fff;border:1px solid #e2dbce;border-radius:18px;padding:20px;box-shadow:0 4px 16px rgba(0,0,0,0.04);display:flex;flex-direction:column;justify-content:space-between;transition:transform 0.2s, box-shadow 0.2s;">
          <div>
            <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:6px;margin-bottom:10px;">
              <span style="font-size:11px;font-weight:800;color:#1a5249;background:#eef6f2;padding:3px 9px;border-radius:12px;">${cityBadge}</span>
              <span style="font-size:11.5px;font-weight:700;color:#d8754d;background:#fff3ee;padding:3px 9px;border-radius:12px;">${catBadge}</span>
            </div>
            <h4 style="font-size:16.5px;font-weight:800;color:#1c2e2c;margin:0 0 8px;letter-spacing:-0.02em;">${title}</h4>
            <p style="font-size:13px;color:#556663;line-height:1.65;margin:0 0 12px;">${desc}</p>
            ${tip ? `<div style="background:#faf8f4;border-radius:10px;padding:9px 12px;font-size:12px;color:#70523d;margin-bottom:16px;border-left:3px solid #d8754d;"><strong>${ui.tipLabel}</strong> ${tip}</div>` : ''}
          </div>
          <div style="margin-top:8px;">
            <a href="${item.mapUrl}" target="_blank" rel="noopener noreferrer" style="display:inline-flex;align-items:center;justify-content:center;gap:6px;width:100%;background:#fff;color:#d8754d;border:1.5px solid #d8754d;text-decoration:none;font-size:12.5px;font-weight:800;padding:9px 14px;border-radius:12px;transition:all 0.2s;" onmouseover="this.style.background='#d8754d';this.style.color='#fff';" onmouseout="this.style.background='#fff';this.style.color='#d8754d';">
              ${ui.btnOpenMap}
            </a>
          </div>
        </div>
      `;
    }).join('');

    // Seville Bonus Tips Box
    const b1 = SEVILLE_BONUS_TIPS.sevici;
    const b2 = SEVILLE_BONUS_TIPS.flamenco;
    const bonusHtml = (state.city === 'all' || state.city === 'seville') ? `
      <div style="background:linear-gradient(135deg, #fefbf6 0%, #f6f3eb 100%);border:1.5px solid #e8decb;border-radius:20px;padding:24px;margin-top:28px;">
        <h4 style="font-size:16px;font-weight:800;color:#1a5249;margin:0 0 16px;">${ui.bonusTipsHeader}</h4>
        <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(280px, 1fr));gap:16px;">
          <div style="background:#fff;padding:16px 18px;border-radius:14px;border:1px solid #e4ded1;">
            <div style="font-size:14.5px;font-weight:800;color:#1c2e2c;margin-bottom:6px;">${b1.icon} ${b1.title[currentL] || b1.title.ko}</div>
            <p style="font-size:12.5px;color:#556663;line-height:1.65;margin:0;">${b1.desc[currentL] || b1.desc.ko}</p>
          </div>
          <div style="background:#fff;padding:16px 18px;border-radius:14px;border:1px solid #e4ded1;">
            <div style="font-size:14.5px;font-weight:800;color:#1c2e2c;margin-bottom:6px;">${b2.icon} ${b2.title[currentL] || b2.title.ko}</div>
            <p style="font-size:12.5px;color:#556663;line-height:1.65;margin:0;">${b2.desc[currentL] || b2.desc.ko}</p>
          </div>
        </div>
      </div>
    ` : '';

    mount.innerHTML = `
      <div class="curated-places-container" style="margin-bottom:32px;">
        <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;margin-bottom:14px;">
          <div>
            <div style="font-size:11px;font-weight:800;color:#d8754d;letter-spacing:0.12em;text-transform:uppercase;">05-B / CURATED GOOGLE MAPS SHORTLIST</div>
            <h3 style="font-size:clamp(19px, 3vw, 24px);color:#1c2e2c;margin:6px 0 4px;font-weight:800;letter-spacing:-0.03em;">${ui.headerHeartPlaces || '구글 지도 엄선 하트 장소 (31선)'}</h3>
            <p style="font-size:13.5px;color:#6b7c78;margin:0;">${ui.descHeartPlaces || '바르셀로나, 말라가·네르하, 세비야 현지에서 직접 검증한 맛집, 디저트, 쇼핑 및 필수 명소 큐레이션'}</p>
          </div>
          <div style="min-width:240px;flex:1;max-width:340px;">
            <input type="text" id="curatedPlacesSearchInput" value="${state.search}" placeholder="${ui.searchPlaceholder}" oninput="window.setCuratedPlacesSearch(this.value)" style="width:100%;padding:10px 14px;border-radius:12px;border:1px solid #cad8ce;font-size:13px;background:#fff;outline:none;">
          </div>
        </div>

        ${cityButtons}
        ${catButtons}

        <div style="display:grid;grid-template-columns:repeat(auto-fill, minmax(300px, 1fr));gap:16px;">
          ${cardsHtml.length ? cardsHtml : `<div style="grid-column:1/-1;text-align:center;padding:36px;color:#859692;font-size:14px;">${ui.emptyPlaces}</div>`}
        </div>

        ${bonusHtml}
      </div>
    `;
  }

  // Filter setters
  window.setCuratedPlacesCity = function (c) {
    window.curatedPlacesFilterState.city = c;
    renderCuratedHeartPlaces();
  };
  window.setCuratedPlacesCat = function (cat) {
    window.curatedPlacesFilterState.category = cat;
    renderCuratedHeartPlaces();
  };
  window.setCuratedPlacesSearch = function (q) {
    window.curatedPlacesFilterState.search = q;
    renderCuratedHeartPlaces();
  };

  // 7. 일정 플래너 17일차(11/17 화) 내용 강화 반영
  function patchDay17Planner() {
    if (typeof PLANS_DAYS_I18N_DATA !== 'undefined' && PLANS_DAYS_I18N_DATA['IBERIA'] && PLANS_DAYS_I18N_DATA['IBERIA'][16]) {
      const d17 = PLANS_DAYS_I18N_DATA['IBERIA'][16];
      d17.theme = {
        ko: "🚌 말라가 ➔ 네르하 & 프리힐리아나 당일치기 (ALSA 직행 & 택시 환승) & 유럽의 발코니 해산물 만찬",
        en: "🚌 Málaga ➔ Nerja & Frigiliana Day Trip (ALSA Directo & Taxi Transfer) & Balcón de Europa Seafood",
        ja: "🚌 マラガ ➔ ネルハ＆フリヒリアナ日帰り (ALSA直行＆タクシー乗換) ＆ 絶景シーフード",
        zh: "🚌 马拉加 ➔ 内尔哈与弗里希利亚纳一日游 (ALSA直达与出租车接驳) ＆ 欧洲阳台海鲜大餐"
      };
      d17.morning = {
        ko: "09:30 말라가 터미널에서 네르하행 ALSA 직행 버스 탑승 ➔ 10:45 네르하 도착 후 택시로 15분 만에 프리힐리아나 직행 ➔ 눈부신 하얀 골목길 산책 & 인생 사진 촬영",
        en: "09:30 Board ALSA Directo coach to Nerja ➔ 10:45 Arrive Nerja and take a comfortable 15-min taxi up to Frigiliana ➔ Stroll whitewashed streets & enjoy scenic terrace coffee",
        ja: "09:30 マラガからネルハ行きALSA直行バス乗車 ➔ 10:45 ネルハ到着後タクシーで15分、フリヒリアナ直行 ➔ 白い路地散策と絶景テラスカフェ",
        zh: "09:30 马拉加车站乘坐ALSA直达大巴 ➔ 10:45 抵内尔哈后打车15分钟直达弗里希利亚纳 ➔ 漫步纯白山城小巷，拍摄人生照片"
      };
      d17.rest = {
        ko: "13:00~13:30 택시로 네르하 시내 복귀 후 해변 식당에서 신선한 해산물 점심 식사 및 온화한 바닷바람 쐬며 1시간 휴식",
        en: "13:00~13:30 Taxi return to Nerja, fresh seafood lunch by the beach, and relaxing 1-hour sea-breeze rest",
        ja: "13:00~13:30 タクシーでネルハ市内に戻り、海辺レストランで新鮮シーフードランチ＆海風を感じて1時間休養",
        zh: "13:00~13:30 乘坐出租车返回内尔哈海滨，享用鲜美海产午餐并在海风中惬意休整"
      };
      d17.evening = {
        ko: "15:00~16:30 '유럽의 발코니' 절벽 전망대 산책 및 이탈리안 젤라토 ➔ 17:00 ALSA 버스 탑승 후 18:00경 말라가 복귀 ➔ Marisquería Godoy 항구 해산물 만찬",
        en: "15:00~16:30 Stroll Balcón de Europa cliff promenade & gelato ➔ 17:00 Board ALSA bus back to Málaga (18:00) ➔ Marisquería Godoy harbor seafood dinner",
        ja: "15:00~16:30 「ヨーロッパのバルコニー」散策＆ジェラート ➔ 17:00 ALSAバスで18:00頃マラガ帰着 ➔ Marisquería Godoy港テラス海鮮ディナー",
        zh: "15:00~16:30 漫步“欧洲阳台”海天一色悬崖观景台品尝冰淇淋 ➔ 17:00乘大巴约18:00返回马拉加 ➔ Marisquería Godoy海港露台海鲜盛宴"
      };
      d17.transport = {
        ko: "ALSA 직행 버스 & 로컬 택시",
        en: "ALSA Directo Coach & Local Taxi",
        ja: "ALSA直行バス＆現地タクシー",
        zh: "ALSA直达大巴与当地出租车"
      };
    }
  }

  // 8. 페이지 내비게이션 점프 헬퍼 (어디서든 한 번에 열기)
  window.goToCuratedPlaces = function (city) {
    if (city) window.curatedPlacesFilterState.city = city;
    if (typeof switchGuidebookChapter === 'function') {
      switchGuidebookChapter('chapter-practical', false);
    }
    if (typeof goToBookPage === 'function') {
      goToBookPage('chapter-practical', 0);
    }
    renderCuratedHeartPlaces();
    setTimeout(function () {
      const el = document.getElementById('curated-family-places');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 120);
  };

  window.goToNerjaGuide = function () {
    if (typeof switchGuidebookChapter === 'function') {
      switchGuidebookChapter('chapter-practical', false);
    }
    if (typeof goToBookPage === 'function') {
      goToBookPage('chapter-practical', 0);
    }
    renderNerjaDaytripGuide();
    setTimeout(function () {
      const el = document.getElementById('nerja-daytrip-guide');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 120);
  };

  // 9. 초기 마운트 및 언어 전환 훅
  function initCuratedModules() {
    patchDay17Planner();
    const l = (typeof currentLang !== 'undefined' && ['ko', 'en', 'ja', 'zh'].includes(currentLang)) ? currentLang : 'ko';
    renderNerjaDaytripGuide(l);
    renderCuratedHeartPlaces(l);
  }

  window.renderNerjaDaytripGuide = renderNerjaDaytripGuide;
  window.renderCuratedHeartPlaces = renderCuratedHeartPlaces;
  window.MALAGA_NERJA_DAYTRIP_DATA = NERJA_DAYTRIP_DATA;
  window.CURATED_HEART_PLACES_DATA = CURATED_PLACES_DATA;
  window.initCuratedModules = initCuratedModules;

  // DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCuratedModules);
  } else {
    initCuratedModules();
  }

  // Periodic polling to guarantee mounting after components.js
  var retryCount = 0;
  var retryTimer = setInterval(function () {
    retryCount++;
    const m1 = document.getElementById('curated-family-places');
    const m2 = document.getElementById('nerja-daytrip-guide');
    if (m1 && !m1.innerHTML.trim()) {
      initCuratedModules();
    }
    if (retryCount >= 12) clearInterval(retryTimer);
  }, 250);

  // Watch for language changes & window load
  window.addEventListener('load', function () {
    initCuratedModules();
    document.querySelectorAll('.lang-pill, .lang-btn, [data-lang]').forEach(btn => {
      btn.addEventListener('click', function () {
        setTimeout(initCuratedModules, 80);
      });
    });
  });

})();

