/**
 * SlowTravel Family Travel Memory Album & AI Multilingual Diary
 * - Offline / Airplane Mode 100% Guaranteed via IndexedDB (Large Photo & Video storage)
 * - City Categorization: Seville, Barcelona, Granada, Madrid, Malaga, Rome, Florence, Naples, Venice, Lisbon, Porto, Dubai, etc.
 * - Local AI Multilingual Travel Diary Generator (KO, EN, JA, ZH)
 * - Social Media Integration: Instagram (@yunwoopk) & Facebook (yunwoopk)
 * - Senior Family Friendly & Responsive UI
 */

(function () {
  'use strict';

  // 1. IndexedDB Config
  const DB_NAME = 'SlowTravelMemoryDB';
  const DB_VERSION = 1;
  const STORE_NAME = 'travel_memories';

  let dbInstance = null;

  function getDB() {
    return new Promise((resolve, reject) => {
      if (dbInstance) return resolve(dbInstance);
      const req = indexedDB.open(DB_NAME, DB_VERSION);
      req.onupgradeneeded = (e) => {
        const db = e.target.result;
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          const store = db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
          store.createIndex('city', 'city', { unique: false });
          store.createIndex('createdAt', 'createdAt', { unique: false });
        }
      };
      req.onsuccess = (e) => {
        dbInstance = e.target.result;
        resolve(dbInstance);
      };
      req.onerror = (e) => reject(e.target.error);
    });
  }

  // Database CRUD helpers
  async function saveMemoryToDB(record) {
    const db = await getDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = record.id ? store.put(record) : store.add(record);
      req.onsuccess = (e) => resolve(e.target.result);
      req.onerror = (e) => reject(e.target.error);
    });
  }

  async function getAllMemoriesFromDB() {
    const db = await getDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.getAll();
      req.onsuccess = (e) => {
        const list = e.target.result || [];
        // Sort descending by date/createdAt
        list.sort((a, b) => new Date(b.date || b.createdAt) - new Date(a.date || a.createdAt));
        resolve(list);
      };
      req.onerror = (e) => reject(e.target.error);
    });
  }

  async function deleteMemoryFromDB(id) {
    const db = await getDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.delete(id);
      req.onsuccess = () => resolve(true);
      req.onerror = (e) => reject(e.target.error);
    });
  }

  // 2. City Definitions with Multilingual Labels & Emojis
  const DIARY_CITIES = [
    { id: 'all', emoji: '🌐', ko: '전체 도시', en: 'All Cities', ja: 'すべての都市', zh: '全部城市' },
    { id: 'barcelona', emoji: '🇪🇸', ko: '바르셀로나', en: 'Barcelona', ja: 'バルセロナ', zh: '巴塞罗那' },
    { id: 'seville', emoji: '💃', ko: '세비야', en: 'Seville', ja: 'セビリア', zh: '塞维利亚' },
    { id: 'granada', emoji: '🏰', ko: '그라나다', en: 'Granada', ja: 'グラナダ', zh: '格拉纳达' },
    { id: 'malaga', emoji: '🏖️', ko: '말라가 & 네르하', en: 'Málaga & Nerja', ja: 'マラガ＆ネルハ', zh: '马拉加与内尔哈' },
    { id: 'madrid', emoji: '🏛️', ko: '마드리드', en: 'Madrid', ja: 'マドリード', zh: '马德里' },
    { id: 'rome', emoji: '🇮🇹', ko: '로마', en: 'Rome', ja: 'ローマ', zh: '罗马' },
    { id: 'florence', emoji: '🎨', ko: '피렌체', en: 'Florence', ja: 'フィレンツェ', zh: '佛罗伦萨' },
    { id: 'naples', emoji: '🍕', ko: '나폴리 & 카프리', en: 'Naples & Capri', ja: 'ナポリ＆カプリ', zh: '那不勒斯与卡普里' },
    { id: 'venice', emoji: '🛶', ko: '베네치아', en: 'Venice', ja: 'ベネチア', zh: '威尼斯' },
    { id: 'lisbon', emoji: '🇵🇹', ko: '리스본 & 신트라', en: 'Lisbon & Sintra', ja: 'リスボン＆シントラ', zh: '里斯本与辛特拉' },
    { id: 'porto', emoji: '🍷', ko: '포르투', en: 'Porto', ja: 'ポルト', zh: '波尔图' },
    { id: 'dubai', emoji: '🇦🇪', ko: '두바이', en: 'Dubai', ja: 'ドバイ', zh: '迪拜' },
    { id: 'flight', emoji: '✈️', ko: '기내 / 이동 중', en: 'In-Flight / Transit', ja: '機内・移動中', zh: '机上·途中' }
  ];

  // 3. AI Multilingual Travel Diary Generator (Offline Intelligent Engine)
  const DIARY_TEMPLATES = {
    barcelona: {
      ko: (spot, mood) => `오늘 바르셀로나에서 ${spot ? spot + '을(를) 거닐며 ' : ''}가족들과 행복한 시간을 보냈다. ${mood || '지중해의 따사로운 햇살과 가우디의 예술적인 곡선'}이 온 도시에 가득했고, 부모님의 미소가 여행의 가장 큰 선물이 되었다. 맛있는 타파스와 함께 하루를 마무리하는 밤.`,
      en: (spot, mood) => `Spent a wonderful day in Barcelona with family${spot ? ' visiting ' + spot : ''}. The Mediterranean breeze and architectural splendor made every moment memorable. Pure happiness seeing my parents enjoy every step!`,
      ja: (spot, mood) => `バルセロナで家族と一緒に${spot ? spot + 'を訪れ、' : ''}かけがえのない素晴らしい一日を過ごしました。ガウディの壮麗な建築と心地よい地中海の風が心に染み渡ります。両親の温かい笑顔が最高の思い出です。`,
      zh: (spot, mood) => `今天和家人漫步在巴塞罗那${spot ? '，游览了' + spot : ''}。地中海和煦的阳光与高迪奇幻的建筑交相辉映，看到父母脸上洋溢的笑容，便是这次旅行最珍贵的收获。`
    },
    seville: {
      ko: (spot, mood) => `열정과 낭만의 도시 세비야! ${spot ? spot + '의 이국적인 정취 속에서 ' : ''}오렌지 나무 향기를 맡으며 부모님과 여유롭게 걸었다. ${mood || '과달키비르 강변의 붉은 노을'}이 한 폭의 그림 같아 가슴 깊이 남는다.`,
      en: (spot, mood) => `Magical Seville filled with orange blossoms and Andalusian charm! ${spot ? 'Strolling around ' + spot + ', ' : ''}watching the sunset along the Guadalquivir river with my beloved family was an unforgettable highlight.`,
      ja: (spot, mood) => `情熱とアンダルシアの風情が漂うセビリア！${spot ? spot + 'の異国情緒の中、' : ''}オレンジの木の並木道を両親とゆったり散策しました。夕暮れの美しい光景が心に深く刻まれました。`,
      zh: (spot, mood) => `充满热情与诗意的塞维利亚！${spot ? '漫步在' + spot + '，' : ''}微风中弥漫着清甜的橙花香气。陪伴父母欣赏夕阳下的动人景致，感受安达卢西亚独有的慢调温情。`
    },
    granada: {
      ko: (spot, mood) => `눈부신 알함브라의 도시 그라나다. ${spot ? spot + '에서 마주한 ' : ''}붉은 궁전과 설산 시에라네바다의 파노라마가 벅찬 감동을 주었다. 부모님께서도 평생 잊지 못할 풍경이라며 감탄하셨다.`,
      en: (spot, mood) => `Granada took our breath away today! ${spot ? 'Standing before ' + spot + ', ' : ''}the dramatic view of the Alhambra against the Sierra Nevada peaks created a truly once-in-a-lifetime family memory.`,
      ja: (spot, mood) => `グラナダの幻想的なアルハンブラ宮殿の景色！${spot ? spot + 'から望む' : ''}歴史の壮大さと山並みのパノラマに息を呑みました。両親も一生の宝物だと大喜びしていました。`,
      zh: (spot, mood) => `沉浸在格拉纳达的奇幻与壮美之中！${spot ? '在' + spot + '眼前，' : ''}远眺巍峨雪山与赭红色宫殿交织的如画风景。父母连连赞叹，这是值得珍藏一生的美好回忆。`
    },
    malaga: {
      ko: (spot, mood) => `온화한 지중해 해변과 네르하의 눈부신 하얀 마을! ${spot ? spot + '에서 ' : ''}시원한 바닷바람을 맞으며 맛본 신선한 해산물과 젤라토, 그리고 '유럽의 발코니'에서 내려다본 에메랄드빛 바다는 완벽한 힐링이었다.`,
      en: (spot, mood) => `Málaga & Nerja coastal bliss! ${spot ? 'Exploring ' + spot + ', ' : ''}feeling the gentle Mediterranean breeze and gazing out from the Balcón de Europa over emerald waters with delicious seafood was absolute perfection.`,
      ja: (spot, mood) => `マラガ＆ネルハの輝く地中海リゾート！${spot ? spot + 'を散策し、' : ''}ヨーロッパのバルコニーから見渡すエメラルドグリーンの大海原と新鮮なシーフード。家族全員にとって極上の癒しのひとときでした。`,
      zh: (spot, mood) => `马拉加与内尔哈蔚蓝海岸的治愈一日！${spot ? '在' + spot + '漫步，' : ''}站在悬崖之巅的“欧洲阳台”俯瞰翡翠般的大海，享用新鲜的海鲜大餐与手工冰淇淋，惬意非凡。`
    },
    rome: {
      ko: (spot, mood) => `살아있는 거대한 박물관 로마! ${spot ? spot + '을(를) 보며 ' : ''}수천 년 역사의 숨결을 부모님과 함께 느꼈다. 걷는 골목마다 감탄이 이어졌고, 저녁에 맛본 젤라토와 진한 에스프레소는 피로를 잊게 해 주었다.`,
      en: (spot, mood) => `The Eternal City of Rome! Walking past millennia of history${spot ? ' at ' + spot : ''} alongside my parents was deeply moving. Authentic pasta, fresh gelato, and awe-inspiring architecture made this day historic.`,
      ja: (spot, mood) => `永遠の都ローマ！${spot ? spot + 'をはじめとする' : ''}数千年の悠久の歴史を両親と一緒に肌で感じました。石畳の街並みと本場のジェラート、美味しいパスタで笑顔があふれる一日でした。`,
      zh: (spot, mood) => `漫步在千载永恒之城罗马！${spot ? '亲眼目睹' + spot + '的磅礴气象，' : ''}和父母一同触摸厚重的历史沧桑。穿行在古朴的石板路上，品尝正宗意面与香浓冰淇淋，倍感温馨。`
    },
    florence: {
      ko: (spot, mood) => `르네상스의 꽃 피렌체! ${spot ? spot + '의 붉은 돔과 두오모 광장을 보며 ' : ''}도시 전체가 예술품이라는 말을 실감했다. 부모님 손을 잡고 아르노 강변을 거닐던 노을빛 순간이 오래도록 기억될 것 같다.`,
      en: (spot, mood) => `Florence, the cradle of the Renaissance! ${spot ? 'Gazing upon ' + spot + ', ' : ''}the terracotta Duomo and tranquil sunset along the Arno River gave our family an unforgettable artistic reverie.`,
      ja: (spot, mood) => `ルネサンスの都フィレンツェ！${spot ? spot + 'やドゥオーモの壮麗なクーポラを眺め、' : ''}街全体が芸術作品であることに感動。アルノ川沿いを両親と歩いた夕暮れが心に深く残ります。`,
      zh: (spot, mood) => `文艺复兴璀璨名城佛罗伦萨！${spot ? '仰望' + spot + '与圣母百花大教堂的宏伟穹顶，' : ''}整座城市如同一件精雕细琢的艺术品。牵着父母的手漫步阿诺河畔，晚霞温柔，时光静好。`
    },
    naples: {
      ko: (spot, mood) => `지중해의 활력 넘치는 나폴리와 카프리! ${spot ? spot + '에서 맛본 ' : ''}갓 구운 쫄깃한 나폴리 피자의 감동과 눈부시게 푸른 바다는 여행의 특별한 활력소가 되었다.`,
      en: (spot, mood) => `Vibrant Naples and Mediterranean coastal spirit! ${spot ? 'Visiting ' + spot + ' and ' : ''}savoring authentic wood-fired Neapolitan pizza together was sheer culinary joy for the whole family.`,
      ja: (spot, mood) => `活気溢れる情熱のナポリ！${spot ? spot + 'で味わった' : ''}本場の薪窯ピッツァの美味しさと、どこまでも青いナポリ湾の美しさに家族みんなで大満足の一日でした。`,
      zh: (spot, mood) => `充满澎湃烟火气的热情那不勒斯！${spot ? '打卡' + spot + '，' : ''}品尝刚出炉的经典柴火窑烤披萨，面香四溢。蔚蓝的海湾与热络的街市，为全家注入了满满的旅行活力。`
    },
    default: {
      ko: (spot, mood) => `사랑하는 가족과 함께한 소중한 여행의 하루. ${spot ? spot + '을(를) 둘러보며 ' : ''}새로운 세상을 함께 눈에 담고 이야기 나누는 매 순간이 큰 행복이다. 내일의 여정도 건강하고 즐겁게!`,
      en: (spot, mood) => `A truly precious day traveling with family${spot ? ' around ' + spot : ''}. Creating memories that will last a lifetime, filled with laughter, great food, and peaceful journeys.`,
      ja: (spot, mood) => `大切な家族と共に過ごしたかけがえのない旅行の一日。${spot ? spot + 'を巡りながら、' : ''}新しい景色と言葉を交わす全ての瞬間が温かい幸福でした。明日も素敵な旅になりますように！`,
      zh: (spot, mood) => `与至亲家人相伴的美好旅程一天。${spot ? '游览了' + spot + '，' : ''}携手走过异国街巷，每刻欢声笑语都值得一生铭记。愿接下来的旅途平安喜乐！`
    }
  };

  function generateMultilingualDiary(cityId, spot, moodKeyword) {
    const tpl = DIARY_TEMPLATES[cityId] || DIARY_TEMPLATES.default;
    return {
      ko: tpl.ko(spot, moodKeyword),
      en: tpl.en(spot, moodKeyword),
      ja: tpl.ja(spot, moodKeyword),
      zh: tpl.zh(spot, moodKeyword)
    };
  }

  // Current State
  let currentFilterCity = 'all';
  let activeLangTab = 'ko';
  let memoriesCache = [];

  // 4. Modal HTML Injection
  function injectMemoryModalHtml() {
    if (document.getElementById('travelMemoryModal')) return;

    const modalHtml = `
      <div id="travelMemoryModal" class="memory-modal-overlay" style="display:none;" aria-hidden="true">
        <div class="memory-modal-container">
          <!-- Modal Header -->
          <div class="memory-modal-header">
            <div class="header-branding">
              <span class="branding-badge">📸 2026 SlowTravel Family Album</span>
              <h2 class="branding-title">가족 여행 사진첩 & AI 포토 다이어리</h2>
              <p class="branding-sub">기내/오프라인에서도 사진·동영상(1분 이내)과 AI 4개 국어 일기를 안전하게 기록하세요.</p>
            </div>
            <button type="button" class="memory-modal-close" onclick="window.closeTravelMemoryModal()" title="닫기" aria-label="닫기">✕</button>
          </div>

          <!-- Author Profile & Social Media Bar -->
          <div class="memory-author-card">
            <div class="author-avatar-wrap">
              <div class="author-avatar">✈️</div>
              <div class="author-info">
                <div class="author-name">
                  <strong>Yunwoo (윤우)</strong>
                  <span class="verified-badge">✓ 가족 여행 기록관</span>
                </div>
                <div class="author-bio">30일간의 스페인 · 이탈리아 · 포르투갈 · 두바이 추억 아카이브</div>
              </div>
            </div>
            <div class="author-social-links">
              <a href="https://www.instagram.com/yunwoopk/?next=" target="_blank" rel="noopener noreferrer" class="social-btn instagram-btn" title="윤우 인스타그램 방문">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                <span>Instagram @yunwoopk</span>
              </a>
              <a href="https://www.facebook.com/yunwoopk/?checkpoint_src=any" target="_blank" rel="noopener noreferrer" class="social-btn facebook-btn" title="윤우 페이스북 방문">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                <span>Facebook yunwoopk</span>
              </a>
            </div>
          </div>

          <!-- New Memory Action Trigger Button -->
          <div class="memory-quick-actions">
            <button type="button" class="btn-create-memory" onclick="window.toggleMemoryEditor(true)">
              <span>➕ 새 사진·동영상 &amp; AI 일기 쓰기</span>
            </button>
            <div class="offline-sync-badge">
              <span>⚡ 오프라인(IndexedDB) 보관 작동 중 · 비행기 모드 지원</span>
            </div>
          </div>

          <!-- Memory Editor Section (Collapsed by default, expandable) -->
          <div id="memoryEditorBox" class="memory-editor-box" style="display:none;">
            <div class="editor-header">
              <h3>📝 오늘의 여행 기억 &amp; 사진 등록</h3>
              <button type="button" class="btn-editor-cancel" onclick="window.toggleMemoryEditor(false)">접기 ✕</button>
            </div>

            <form id="memoryForm" onsubmit="window.handleMemorySubmit(event)">
              <div class="form-row-grid">
                <!-- City Selector -->
                <div class="form-group">
                  <label for="memCitySelect">🏙️ 방문 도시:</label>
                  <select id="memCitySelect" required>
                    <option value="barcelona">🇪🇸 바르셀로나 (Barcelona)</option>
                    <option value="seville" selected>💃 세비야 (Seville)</option>
                    <option value="granada">🏰 그라나다 (Granada)</option>
                    <option value="malaga">🏖️ 말라가 &amp; 네르하 (Málaga &amp; Nerja)</option>
                    <option value="madrid">🏛️ 마드리드 (Madrid)</option>
                    <option value="rome">🇮🇹 로마 (Rome)</option>
                    <option value="florence">🎨 피렌체 (Florence)</option>
                    <option value="naples">🍕 나폴리 &amp; 카프리 (Naples &amp; Capri)</option>
                    <option value="venice">🛶 베네치아 (Venice)</option>
                    <option value="lisbon">🇵🇹 리스본 &amp; 신트라 (Lisbon &amp; Sintra)</option>
                    <option value="porto">🍷 포르투 (Porto)</option>
                    <option value="dubai">🇦🇪 두바이 (Dubai)</option>
                    <option value="flight">✈️ 기내 / 이동 중 (In-Flight)</option>
                  </select>
                </div>

                <!-- Date Picker -->
                <div class="form-group">
                  <label for="memDate">📅 촬영/기록 날짜:</label>
                  <input type="date" id="memDate" required />
                </div>

                <!-- Visited Spot -->
                <div class="form-group">
                  <label for="memSpot">📍 방문 장소 / 명소:</label>
                  <input type="text" id="memSpot" placeholder="예: 스페인 광장, 사그라다 파밀리아, 유럽의 발코니..." />
                </div>
              </div>

              <!-- Media Upload (Photo or Short Video) -->
              <div class="form-group media-upload-group">
                <label>📷 사진 또는 짧은 영상 (1분 이내 권장):</label>
                <div class="upload-dropzone" onclick="document.getElementById('memMediaFile').click()">
                  <input type="file" id="memMediaFile" accept="image/*,video/*" style="display:none;" onchange="window.handleMediaFileSelect(this)" />
                  <div id="uploadPlaceholder">
                    <span class="upload-icon">📁</span>
                    <p><strong>클릭하여 폰이나 PC의 사진·동영상 선택</strong></p>
                    <span class="upload-sub">오프라인에서도 브라우저(IndexedDB)에 안전하게 원본 보관됩니다.</span>
                  </div>
                  <div id="mediaPreviewContainer" style="display:none;position:relative;"></div>
                </div>
              </div>

              <!-- AI Diary Generator Toolbar -->
              <div class="ai-generator-bar">
                <span class="ai-sparkle">✨ AI 감성 다이어리 보조:</span>
                <button type="button" class="btn-ai-compose" onclick="window.generateAiDiaryContent()">
                  🤖 한 번의 클릭으로 4개 국어 감성 일기 자동 생성
                </button>
              </div>

              <!-- Multilingual Diary Editor Tabs -->
              <div class="form-group">
                <div class="lang-tab-row">
                  <button type="button" class="lang-tab-btn active" onclick="window.switchDiaryLangTab('ko')">🇰🇷 한국어</button>
                  <button type="button" class="lang-tab-btn" onclick="window.switchDiaryLangTab('en')">🇬🇧 English</button>
                  <button type="button" class="lang-tab-btn" onclick="window.switchDiaryLangTab('ja')">🇯🇵 日本語</button>
                  <button type="button" class="lang-tab-btn" onclick="window.switchDiaryLangTab('zh')">🇨🇳 中文</button>
                </div>

                <!-- Title Input -->
                <input type="text" id="memTitle" placeholder="일기 제목을 입력하세요 (예: 붉은 노을이 아름답던 과달키비르 강변)" required style="margin-bottom:8px;" />

                <!-- Textarea per language -->
                <textarea id="memContentKo" rows="4" placeholder="한국어 일기 내용을 자유롭게 작성하거나 위 'AI 감성 일기 생성' 버튼을 눌러보세요."></textarea>
                <textarea id="memContentEn" rows="4" placeholder="English travel journal (auto-generated by AI or edit directly)..." style="display:none;"></textarea>
                <textarea id="memContentJa" rows="4" placeholder="日本語の旅行日記（AI自動生成または直接入力）..." style="display:none;"></textarea>
                <textarea id="memContentZh" rows="4" placeholder="中文旅行日记（AI自动生成或直接编辑）..." style="display:none;"></textarea>
              </div>

              <div class="form-actions-row">
                <button type="submit" class="btn-save-memory">💾 이 추억을 사진첩에 저장하기</button>
                <button type="button" class="btn-cancel-edit" onclick="window.toggleMemoryEditor(false)">취소</button>
              </div>
            </form>
          </div>

          <!-- City Filter Pills -->
          <div class="memory-filter-bar">
            <span class="filter-label">🏙️ 도시별 모아보기:</span>
            <div class="city-pill-scroll" id="cityFilterScroll"></div>
          </div>

          <!-- Memory Gallery Grid -->
          <div class="memory-gallery-grid" id="memoryGalleryGrid">
            <div class="empty-memory-state">
              <span class="empty-icon">📸</span>
              <h4>아직 등록된 사진이나 일기가 없습니다.</h4>
              <p>상단의 <strong>[➕ 새 사진·동영상 &amp; AI 일기 쓰기]</strong> 버튼을 눌러 현지에서의 소중한 추억을 첫 페이지로 남겨보세요!</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Lightbox Detail Modal -->
      <div id="memoryLightboxModal" class="lightbox-overlay" style="display:none;" onclick="window.closeMemoryLightbox(event)">
        <div class="lightbox-content" onclick="event.stopPropagation()">
          <button type="button" class="lightbox-close" onclick="window.closeMemoryLightbox()">✕</button>
          <div id="lightboxMediaContainer" class="lightbox-media-box"></div>
          <div class="lightbox-info-box">
            <div class="lightbox-header-row">
              <span id="lbCityBadge" class="lb-badge"></span>
              <span id="lbDate" class="lb-date"></span>
            </div>
            <h3 id="lbTitle" class="lb-title"></h3>
            
            <!-- Language switcher for lightbox -->
            <div class="lb-lang-tabs">
              <button type="button" class="lb-lang-btn active" onclick="window.switchLbLang('ko')">한국어</button>
              <button type="button" class="lb-lang-btn" onclick="window.switchLbLang('en')">English</button>
              <button type="button" class="lb-lang-btn" onclick="window.switchLbLang('ja')">日本語</button>
              <button type="button" class="lb-lang-btn" onclick="window.switchLbLang('zh')">中文</button>
            </div>
            <div id="lbStoryText" class="lb-story"></div>
            
            <div class="lightbox-footer-actions">
              <button type="button" class="btn-copy-story" onclick="window.copyCurrentStory()">📋 본문 복사</button>
              <button type="button" class="btn-delete-memory" onclick="window.handleDeleteMemory()">🗑️ 삭제</button>
            </div>
          </div>
        </div>
      </div>
    `;

    const div = document.createElement('div');
    div.innerHTML = modalHtml;
    document.body.appendChild(div);
  }

  // 5. Render City Filter Buttons
  function renderCityFilters() {
    const container = document.getElementById('cityFilterScroll');
    if (!container) return;
    const currentLang = (typeof window.currentLang !== 'undefined' ? window.currentLang : 'ko');

    container.innerHTML = DIARY_CITIES.map(c => {
      const active = c.id === currentFilterCity ? 'active' : '';
      const name = c[currentLang] || c.ko;
      const count = c.id === 'all' 
        ? memoriesCache.length 
        : memoriesCache.filter(m => m.city === c.id).length;

      return `
        <button type="button" class="city-filter-chip ${active}" onclick="window.filterMemoriesByCity('${c.id}')">
          <span>${c.emoji}</span>
          <span>${name}</span>
          <span class="chip-count">(${count})</span>
        </button>
      `;
    }).join('');
  }

  // 6. Render Gallery Grid
  function renderMemoryGallery() {
    const grid = document.getElementById('memoryGalleryGrid');
    if (!grid) return;
    const currentLang = (typeof window.currentLang !== 'undefined' ? window.currentLang : 'ko');

    let list = memoriesCache;
    if (currentFilterCity !== 'all') {
      list = list.filter(m => m.city === currentFilterCity);
    }

    if (!list.length) {
      grid.innerHTML = `
        <div class="empty-memory-state">
          <span class="empty-icon">📷</span>
          <h4>선택하신 도시의 기록이 아직 없습니다.</h4>
          <p>현지에서 촬영한 사진이나 동영상을 올리고 AI 일기를 기록해 보세요!</p>
        </div>
      `;
      return;
    }

    grid.innerHTML = list.map(item => {
      const cityObj = DIARY_CITIES.find(c => c.id === item.city) || { emoji: '📍', ko: item.city, en: item.city, ja: item.city, zh: item.city };
      const cityName = cityObj[currentLang] || cityObj.ko;
      const storyPreview = (item['content_' + currentLang] || item.content_ko || item.content || '').slice(0, 95);

      let mediaThumb = '';
      const safeMediaUrl = sanitizeMediaUrl(item.mediaUrl);
      if (item.mediaType === 'video' && safeMediaUrl) {
        mediaThumb = `
          <div class="card-video-wrap">
            <video src="${safeMediaUrl}" preload="metadata" muted playsinline></video>
            <span class="video-play-badge">▶ 동영상 (1분)</span>
          </div>
        `;
      } else if (safeMediaUrl) {
        mediaThumb = `<div class="card-img-wrap" style="background-image:url('${safeMediaUrl}')"></div>`;
      } else {
        mediaThumb = `<div class="card-img-placeholder"><span>📖</span></div>`;
      }

      return `
        <div class="memory-card" onclick="window.openMemoryLightbox(${item.id})">
          ${mediaThumb}
          <div class="card-body">
            <div class="card-meta">
              <span class="card-city-badge">${cityObj.emoji} ${cityName}</span>
              <span class="card-date">${item.date || ''}</span>
            </div>
            <h4 class="card-title">${escapeHtml(item.title || '여행의 기록')}</h4>
            <p class="card-preview">${escapeHtml(storyPreview)}...</p>
            <div class="card-footer-action">
              <span>자세히 보기 &amp; 4개국어 읽기 ➔</span>
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  // Helper escape & security sanitation
  function escapeHtml(s) {
    if (!s) return '';
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function sanitizeMediaUrl(url) {
    if (!url || typeof url !== 'string') return '';
    const trimmed = url.trim();
    if (
      trimmed.startsWith('data:image/') ||
      trimmed.startsWith('data:video/') ||
      trimmed.startsWith('blob:') ||
      trimmed.startsWith('https://') ||
      trimmed.startsWith('./') ||
      trimmed.startsWith('/')
    ) {
      return trimmed;
    }
    return '';
  }

  // 7. Handlers for Modal Opening & Editor
  let currentUploadedMedia = null; // { type: 'image'|'video', dataUrl: string }

  window.openTravelMemoryModal = async function () {
    injectMemoryModalHtml();
    const modal = document.getElementById('travelMemoryModal');
    if (modal) {
      modal.style.display = 'flex';
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      // Load from DB
      try {
        memoriesCache = await getAllMemoriesFromDB();
      } catch (err) {
        console.warn('Load memories err:', err);
      }
      renderCityFilters();
      renderMemoryGallery();
    }
  };

  window.closeTravelMemoryModal = function () {
    const modal = document.getElementById('travelMemoryModal');
    if (modal) {
      modal.style.display = 'none';
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  };

  window.toggleMemoryEditor = function (show) {
    const box = document.getElementById('memoryEditorBox');
    if (box) {
      box.style.display = show ? 'block' : 'none';
      if (show) {
        const dInput = document.getElementById('memDate');
        if (dInput && !dInput.value) {
          const now = new Date();
          dInput.value = now.toISOString().split('T')[0];
        }
        box.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  window.filterMemoriesByCity = function (cId) {
    currentFilterCity = cId;
    renderCityFilters();
    renderMemoryGallery();
  };

  function renderMediaPreview(type, url) {
    const safeUrl = sanitizeMediaUrl(url);
    const prev = document.getElementById('mediaPreviewContainer');
    const placeholder = document.getElementById('uploadPlaceholder');
    if (prev && placeholder) {
      placeholder.style.display = 'none';
      prev.style.display = 'block';
      if (type === 'video') {
        prev.innerHTML = `
          <video src="${safeUrl}" controls style="max-height:220px;max-width:100%;border-radius:12px;"></video>
          <button type="button" onclick="window.clearUploadedMedia(event)" class="btn-clear-media">✕ 삭제</button>
        `;
      } else {
        prev.innerHTML = `
          <img src="${safeUrl}" alt="미리보기" style="max-height:220px;max-width:100%;border-radius:12px;object-fit:cover;" />
          <button type="button" onclick="window.clearUploadedMedia(event)" class="btn-clear-media">✕ 삭제</button>
        `;
      }
    }
  }

  window.handleMediaFileSelect = function (input) {
    const file = input.files && input.files[0];
    if (!file) return;

    const isVideo = file.type.startsWith('video');
    const isImage = file.type.startsWith('image');
    if (!isVideo && !isImage) {
      alert('사진 또는 동영상 파일만 업로드할 수 있습니다.');
      return;
    }

    // Video size guard for mobile offline storage (recommend <= 50MB)
    if (isVideo && file.size > 50 * 1024 * 1024) {
      alert('기내/오프라인 모드 브라우저(IndexedDB) 최적화를 위해 동영상은 약 1분 이내(50MB 이하) 업로드를 권장합니다.');
      return;
    }

    const reader = new FileReader();
    reader.onload = function (e) {
      const rawData = e.target.result;

      if (isImage) {
        // High-resolution mobile photo canvas downscaling to max 1920px for optimal IndexedDB offline performance
        const img = new Image();
        img.onload = function () {
          try {
            const maxDim = 1920;
            let width = img.naturalWidth || img.width;
            let height = img.naturalHeight || img.height;
            if (width > maxDim || height > maxDim) {
              if (width > height) {
                height = Math.round((height * maxDim) / width);
                width = maxDim;
              } else {
                width = Math.round((width * maxDim) / height);
                height = maxDim;
              }
            }
            const canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, width, height);
            let optimized = canvas.toDataURL('image/jpeg', 0.85);
            if (!optimized || optimized.length > rawData.length) {
              optimized = rawData;
            }
            currentUploadedMedia = { type: 'image', dataUrl: optimized };
            renderMediaPreview('image', optimized);
          } catch (err) {
            currentUploadedMedia = { type: 'image', dataUrl: rawData };
            renderMediaPreview('image', rawData);
          }
        };
        img.onerror = function () {
          currentUploadedMedia = { type: 'image', dataUrl: rawData };
          renderMediaPreview('image', rawData);
        };
        img.src = rawData;
      } else {
        currentUploadedMedia = { type: 'video', dataUrl: rawData };
        renderMediaPreview('video', rawData);
      }
    };
    reader.readAsDataURL(file);
  };

  window.clearUploadedMedia = function (e) {
    if (e) e.stopPropagation();
    currentUploadedMedia = null;
    const fileInput = document.getElementById('memMediaFile');
    if (fileInput) fileInput.value = '';
    const prev = document.getElementById('mediaPreviewContainer');
    const placeholder = document.getElementById('uploadPlaceholder');
    if (prev && placeholder) {
      prev.style.display = 'none';
      prev.innerHTML = '';
      placeholder.style.display = 'block';
    }
  };

  window.switchDiaryLangTab = function (langKey) {
    activeLangTab = langKey;
    document.querySelectorAll('.lang-tab-btn').forEach(btn => {
      btn.classList.toggle('active', btn.textContent.toLowerCase().includes(langKey) || (langKey === 'ko' && btn.textContent.includes('한국어')) || (langKey === 'en' && btn.textContent.includes('English')) || (langKey === 'ja' && btn.textContent.includes('日本語')) || (langKey === 'zh' && btn.textContent.includes('中文')));
    });

    ['Ko', 'En', 'Ja', 'Zh'].forEach(k => {
      const el = document.getElementById('memContent' + k);
      if (el) el.style.display = (k.toLowerCase() === langKey ? 'block' : 'none');
    });
  };

  window.generateAiDiaryContent = function () {
    const city = document.getElementById('memCitySelect').value;
    const spot = document.getElementById('memSpot').value.trim();
    const titleInput = document.getElementById('memTitle');

    const generated = generateMultilingualDiary(city, spot);

    const cKo = document.getElementById('memContentKo');
    const cEn = document.getElementById('memContentEn');
    const cJa = document.getElementById('memContentJa');
    const cZh = document.getElementById('memContentZh');

    if (cKo) cKo.value = generated.ko;
    if (cEn) cEn.value = generated.en;
    if (cJa) cJa.value = generated.ja;
    if (cZh) cZh.value = generated.zh;

    if (titleInput && !titleInput.value) {
      const cityObj = DIARY_CITIES.find(c => c.id === city);
      const cName = cityObj ? cityObj.ko : '유럽';
      titleInput.value = `${cName}${spot ? ' ' + spot : ''}에서 남긴 소중한 가족의 순간`;
    }

    if (typeof showToast === 'function') {
      showToast('✨ AI가 4개 국어 감성 여행 일기를 완성했습니다!');
    }
  };

  window.handleMemorySubmit = async function (e) {
    e.preventDefault();
    const city = document.getElementById('memCitySelect').value;
    const date = document.getElementById('memDate').value;
    const spot = document.getElementById('memSpot').value.trim();
    const title = document.getElementById('memTitle').value.trim();

    const contentKo = document.getElementById('memContentKo').value.trim();
    const contentEn = document.getElementById('memContentEn').value.trim();
    const contentJa = document.getElementById('memContentJa').value.trim();
    const contentZh = document.getElementById('memContentZh').value.trim();

    const record = {
      city: city,
      date: date,
      spot: spot,
      title: title || '가족 여행의 기록',
      content_ko: contentKo,
      content_en: contentEn,
      content_ja: contentJa,
      content_zh: contentZh,
      mediaType: currentUploadedMedia ? currentUploadedMedia.type : null,
      mediaUrl: currentUploadedMedia ? currentUploadedMedia.dataUrl : null,
      createdAt: new Date().toISOString()
    };

    try {
      await saveMemoryToDB(record);
      memoriesCache = await getAllMemoriesFromDB();
      renderCityFilters();
      renderMemoryGallery();
      window.toggleMemoryEditor(false);

      // Reset form
      document.getElementById('memoryForm').reset();
      window.clearUploadedMedia();

      if (typeof showToast === 'function') {
        showToast('💾 사진과 일기가 안전하게 오프라인 저장소에 보관되었습니다!');
      }
    } catch (err) {
      console.error('Save memory failed:', err);
      alert('저장 중 문제가 발생했습니다: ' + err.message);
    }
  };

  // 8. Lightbox Detail Modal
  let activeLightboxItem = null;
  let activeLbLang = 'ko';

  window.openMemoryLightbox = function (id) {
    const item = memoriesCache.find(m => m.id === id);
    if (!item) return;
    activeLightboxItem = item;

    const modal = document.getElementById('memoryLightboxModal');
    const mediaBox = document.getElementById('lightboxMediaContainer');
    const badge = document.getElementById('lbCityBadge');
    const dateEl = document.getElementById('lbDate');
    const titleEl = document.getElementById('lbTitle');

    const cityObj = DIARY_CITIES.find(c => c.id === item.city) || { emoji: '📍', ko: item.city };
    badge.textContent = `${cityObj.emoji} ${cityObj.ko} ${item.spot ? '· ' + item.spot : ''}`;
    dateEl.textContent = item.date || '';
    titleEl.textContent = item.title;

    const safeLbUrl = sanitizeMediaUrl(item.mediaUrl);
    if (item.mediaType === 'video' && safeLbUrl) {
      mediaBox.innerHTML = `<video src="${safeLbUrl}" controls autoplay playsinline style="max-height:60vh;max-width:100%;border-radius:14px;"></video>`;
    } else if (safeLbUrl) {
      mediaBox.innerHTML = `<img src="${safeLbUrl}" alt="사진" style="max-height:60vh;max-width:100%;border-radius:14px;object-fit:contain;" />`;
    } else {
      mediaBox.innerHTML = `<div style="padding:40px;color:#94a3b8;font-size:3rem;">📖</div>`;
    }

    activeLbLang = (typeof window.currentLang !== 'undefined' ? window.currentLang : 'ko');
    window.switchLbLang(activeLbLang);

    modal.style.display = 'flex';
  };

  window.closeMemoryLightbox = function () {
    const modal = document.getElementById('memoryLightboxModal');
    if (modal) modal.style.display = 'none';
    const mediaBox = document.getElementById('lightboxMediaContainer');
    if (mediaBox) mediaBox.innerHTML = '';
    activeLightboxItem = null;
  };

  window.switchLbLang = function (langKey) {
    activeLbLang = langKey;
    document.querySelectorAll('.lb-lang-btn').forEach(btn => {
      btn.classList.toggle('active', 
        (langKey === 'ko' && btn.textContent.includes('한국어')) ||
        (langKey === 'en' && btn.textContent.includes('English')) ||
        (langKey === 'ja' && btn.textContent.includes('日本語')) ||
        (langKey === 'zh' && btn.textContent.includes('中文'))
      );
    });

    const storyEl = document.getElementById('lbStoryText');
    if (storyEl && activeLightboxItem) {
      const text = activeLightboxItem['content_' + langKey] || activeLightboxItem.content_ko || activeLightboxItem.content || '';
      storyEl.innerHTML = text ? escapeHtml(text).replace(/\n/g, '<br>') : '<em style="color:#94a3b8;">해당 언어로 작성된 내용이 없습니다.</em>';
    }
  };

  window.copyCurrentStory = function () {
    if (!activeLightboxItem) return;
    const text = activeLightboxItem['content_' + activeLbLang] || activeLightboxItem.content_ko || '';
    if (!text) return;
    navigator.clipboard.writeText(text).then(() => {
      if (typeof showToast === 'function') showToast('📋 일기 내용이 클립보드에 복사되었습니다!');
    }).catch(() => {
      alert('복사되었습니다.');
    });
  };

  window.handleDeleteMemory = async function () {
    if (!activeLightboxItem) return;
    if (!confirm('이 소중한 여행 기록을 삭제하시겠습니까?')) return;

    try {
      await deleteMemoryFromDB(activeLightboxItem.id);
      memoriesCache = await getAllMemoriesFromDB();
      window.closeMemoryLightbox();
      renderCityFilters();
      renderMemoryGallery();
      if (typeof showToast === 'function') showToast('🗑️ 기록이 삭제되었습니다.');
    } catch (err) {
      alert('삭제 중 오류가 발생했습니다: ' + err.message);
    }
  };

  // 9. Initial preload & sample seed if empty
  async function seedInitialSampleIfEmpty() {
    try {
      const list = await getAllMemoriesFromDB();
      if (list.length === 0) {
        // Preload an inspiring sample
        await saveMemoryToDB({
          city: 'seville',
          date: '2026-11-12',
          spot: '스페인 광장 (Plaza de España)',
          title: '붉은 노을이 찬란했던 세비야 스페인 광장',
          content_ko: '스페인 광장의 타일 다리 위에서 부모님과 함께 마주한 노을빛. 황금빛으로 물든 회랑을 거닐며 30일 여정의 벅찬 행복을 나눴다. 부모님의 환한 미소가 가장 큰 선물이다.',
          content_en: 'Sunset over Plaza de España in Seville! Walking across the tiled bridges with my parents in the golden hour light was pure magic.',
          content_ja: 'セビリアのスペイン広場に広がる美しい夕焼け！黄金色に輝く回廊をご両親と散策した、感動的なひとときでした。',
          content_zh: '塞维利亚西班牙广场的壮美晚霞！漫步在古朴优美的瓷砖回廊间，陪伴父母沉浸在浓郁的安达卢西亚晚风与暖阳中。',
          mediaType: 'image',
          mediaUrl: 'https://images.unsplash.com/photo-1543783207-ec64e4d95325?auto=format&fit=crop&w=800&q=80',
          createdAt: new Date().toISOString()
        });
        memoriesCache = await getAllMemoriesFromDB();
      } else {
        memoriesCache = list;
      }
    } catch (e) {
      console.warn('Seed memory failed:', e);
    }
  }

  // Pre-seed and mount modal ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      injectMemoryModalHtml();
      seedInitialSampleIfEmpty();
    });
  } else {
    injectMemoryModalHtml();
    seedInitialSampleIfEmpty();
  }

})();

