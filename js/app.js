// ========================================================
// SLOW TRAVEL IBERIA & DUBAI - APPLICATION LOGIC & CONTROLLER
// ========================================================

let currentHotelCityFilter = 'ALL';

function navigateToTransit() {
  switchTransitHotelSubTab('transit');
  const sec = document.getElementById('transit-hotels');
  if (sec) sec.scrollIntoView({ behavior: 'smooth' });
}

function navigateToHotels() {
  switchTransitHotelSubTab('hotels');
  const sec = document.getElementById('transit-hotels');
  if (sec) sec.scrollIntoView({ behavior: 'smooth' });
}

// 1. PWA Service Worker Registration
function registerPWAOfflineWorker() {
  if ('serviceWorker' in navigator && (window.location.protocol.startsWith('http') || window.location.hostname === 'localhost')) {
    const swCode = `
      const CACHE_NAME = 'slow-travel-pwa-v3';
      const STATIC_ASSETS = [
        './',
        'https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Noto+Sans+KR:wght@400;500;600;700;800&display=swap',
        'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css',
        'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'
      ];
      self.addEventListener('install', event => {
        self.skipWaiting();
        event.waitUntil(
          caches.open(CACHE_NAME).then(cache => cache.addAll(STATIC_ASSETS)).catch(() => {})
        );
      });
      self.addEventListener('activate', event => {
        event.waitUntil(
          caches.keys().then(keys => Promise.all(
            keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
          )).then(() => self.clients.claim())
        );
      });
      self.addEventListener('fetch', event => {
        if (event.request.method !== 'GET') return;
        event.respondWith(
          caches.match(event.request).then(cached => {
            const networked = fetch(event.request).then(response => {
              const cloned = response.clone();
              caches.open(CACHE_NAME).then(cache => cache.put(event.request, cloned)).catch(() => {});
              return response;
            }).catch(() => cached);
            return cached || networked;
          })
        );
      });
    `;
    try {
      const blob = new Blob([swCode], { type: 'application/javascript' });
      const swUrl = URL.createObjectURL(blob);
      navigator.serviceWorker.register(swUrl).then(reg => {
        console.log('PWA ServiceWorker registered:', reg);
      }).catch(err => {
        console.log('SW registration note:', err);
      });
    } catch (e) {
      console.warn('PWA SW registration skipped on current origin:', e);
    }
  }
}

// 2. Dark Mode Toggle & Persistence
let currentTheme = 'light';

function toggleDarkTheme() {
  setTheme(currentTheme === 'dark' ? 'light' : 'dark');
}

function setTheme(theme) {
  currentTheme = theme;
  const btn = document.getElementById('btnThemeToggle');
  const isDark = theme === 'dark';
  if (isDark) {
    document.body.classList.add('dark-theme');
  } else {
    document.body.classList.remove('dark-theme');
  }
  if (btn) {
    const label = isDark
      ? (currentLang === 'en' ? 'Light Mode' : (currentLang === 'ja' ? 'ライト' : (currentLang === 'zh' ? '浅色模式' : '라이트 모드')))
      : (currentLang === 'en' ? 'Dark Mode' : (currentLang === 'ja' ? 'ダーク' : (currentLang === 'zh' ? '深色模式' : '다크 모드')));
    const icon = isDark ? '☀️' : '🌙';
    btn.innerHTML = `${icon} <span id="themeToggleText">${label}</span>`;
  }
  try {
    localStorage.setItem('travel_user_theme', theme);
  } catch (e) {}
  showToast(isDark ? '🌙 다크 모드가 적용되었습니다.' : '☀️ 라이트 모드가 적용되었습니다.');
}

// 3. Section 06 Checklist Interactive Checkboxes & LocalStorage
function initInteractiveChecklist() {
  const container = document.querySelector('.checklist');
  if (!container) return;

  const checks = container.querySelectorAll('.check');
  if (checks.length === 0 && container.querySelectorAll('.check-item-row').length > 0) {
    updateChecklistUI();
    return;
  }

  let savedState = {};
  try {
    const s = localStorage.getItem('travel_checklist_state');
    if (s) savedState = JSON.parse(s);
  } catch (e) {}

  const items = [];
  checks.forEach((chk, idx) => {
    const strong = chk.querySelector('strong');
    const title = strong ? strong.textContent.replace('□', '').trim() : `항목 ${idx + 1}`;
    const desc = chk.textContent.replace(strong ? strong.textContent : '', '').replace(/^[　\s]+/, '').trim();
    items.push({ title, desc });
  });

  if (items.length === 0) return;

  let html = `
    <div class="checklist-progress-wrap" style="grid-column: 1 / -1;">
      <div class="checklist-progress-meta">
        <span class="checklist-progress-label">📋 준비 상태 점검:</span>
        <span class="checklist-progress-count" id="checklistProgressText">0 / ${items.length} 완료 (0%)</span>
      </div>
      <div class="checklist-progress-track">
        <div class="checklist-progress-fill" id="checklistProgressBar" style="width: 0%"></div>
      </div>
    </div>
  `;

  items.forEach((item, idx) => {
    const isChecked = !!savedState[`item_${idx}`];
    html += `
      <label class="check-item-row ${isChecked ? 'is-checked' : ''}" data-check-idx="${idx}">
        <input type="checkbox" class="interactive-check-input" ${isChecked ? 'checked' : ''} onchange="toggleChecklistItem(${idx}, this.checked)">
        <div class="check-item-content">
          <span class="check-item-title">${item.title}</span>
          <span class="check-item-desc">${item.desc}</span>
        </div>
      </label>
    `;
  });

  container.innerHTML = html;
  updateChecklistProgress(items.length);
}

function toggleChecklistItem(index, isChecked) {
  let savedState = {};
  try {
    const s = localStorage.getItem('travel_checklist_state');
    if (s) savedState = JSON.parse(s);
  } catch (e) {}

  savedState[`item_${index}`] = isChecked;
  try {
    localStorage.setItem('travel_checklist_state', JSON.stringify(savedState));
  } catch (e) {}

  const row = document.querySelector(`.check-item-row[data-check-idx="${index}"]`);
  if (row) {
    if (isChecked) row.classList.add('is-checked');
    else row.classList.remove('is-checked');
  }

  updateChecklistProgress();
  showToast(isChecked ? '✅ 체크 완료 (저장됨)' : '체크 해제되었습니다.');
}

function updateChecklistProgress(totalCount) {
  const inputs = document.querySelectorAll('.interactive-check-input');
  const total = totalCount || inputs.length || 6;
  const checkedCount = Array.from(inputs).filter(i => i.checked).length;
  const pct = Math.round((checkedCount / total) * 100);

  const textEl = document.getElementById('checklistProgressText');
  const barEl = document.getElementById('checklistProgressBar');
  if (textEl) textEl.textContent = `${checkedCount} / ${total} 완료 (${pct}%)`;
  if (barEl) barEl.style.width = `${pct}%`;
}

function updateChecklistUI() {
  let savedState = {};
  try {
    const s = localStorage.getItem('travel_checklist_state');
    if (s) savedState = JSON.parse(s);
  } catch (e) {}

  document.querySelectorAll('.check-item-row').forEach(row => {
    const idx = row.getAttribute('data-check-idx');
    const input = row.querySelector('.interactive-check-input');
    const isChecked = !!savedState[`item_${idx}`];
    if (input) input.checked = isChecked;
    if (isChecked) row.classList.add('is-checked');
    else row.classList.remove('is-checked');
  });
  updateChecklistProgress();
}

// 4. Drag and Drop Timeline Reordering
let draggedDayCardIndex = null;

function handleTimelineDragStart(e, idx) {
  draggedDayCardIndex = idx;
  e.dataTransfer.effectAllowed = 'move';
  e.dataTransfer.setData('text/plain', String(idx));
  e.currentTarget.classList.add('is-dragging');
}

function handleTimelineDragOver(e) {
  e.preventDefault();
  e.dataTransfer.dropEffect = 'move';
}

function handleTimelineDragEnter(e, card) {
  e.preventDefault();
  if (card) card.classList.add('drag-over');
}

function handleTimelineDragLeave(e, card) {
  if (card) card.classList.remove('drag-over');
}

function handleTimelineDrop(e, targetIdx) {
  e.preventDefault();
  const card = e.currentTarget;
  if (card) card.classList.remove('drag-over');

  const sourceIdx = parseInt(e.dataTransfer.getData('text/plain'), 10);
  if (isNaN(sourceIdx) || sourceIdx === targetIdx) return;

  const plan = REGIONAL_PLANS[currentActiveRegion] || REGIONAL_PLANS["IBERIA"];
  const rawDays = plan.days || [];
  const totalDays = Math.min(currentDurationDays, rawDays.length);

  let order = getActiveTimelineOrder(totalDays);
  const movedItem = order.splice(sourceIdx, 1)[0];
  order.splice(targetIdx, 0, movedItem);

  saveTimelineOrder(order);
  showToast(`✨ DAY ${sourceIdx + 1}과 DAY ${targetIdx + 1}의 순서가 변경되었습니다! (날짜 자동 재계산)`);
  applyPlanReconfiguration(false);
}

function handleTimelineDragEnd(e) {
  document.querySelectorAll('.day-card').forEach(c => {
    c.classList.remove('is-dragging');
    c.classList.remove('drag-over');
  });
}

function getActiveTimelineOrder(totalDays) {
  const key = `travel_timeline_order_${currentActiveRegion}_${currentDurationDays}`;
  try {
    const s = localStorage.getItem(key);
    if (s) {
      const arr = JSON.parse(s);
      if (Array.isArray(arr) && arr.length === totalDays) return arr;
    }
  } catch (e) {}
  return Array.from({ length: totalDays }, (_, i) => i);
}

function saveTimelineOrder(order) {
  const key = `travel_timeline_order_${currentActiveRegion}_${currentDurationDays}`;
  try {
    localStorage.setItem(key, JSON.stringify(order));
  } catch (e) {}
}

function resetTimelineOrder() {
  const key = `travel_timeline_order_${currentActiveRegion}_${currentDurationDays}`;
  try {
    localStorage.removeItem(key);
  } catch (e) {}
  showToast('🔄 일정 순서가 원래대로 복원되었습니다.');
  applyPlanReconfiguration(false);
}

// 5. Leaflet Interactive Maps (Attractions & Dining)
let landmarksMapInstance = null;
let landmarksMarkerLayer = null;
let diningMapInstance = null;
let diningMarkerLayer = null;
let currentLandmarkView = 'list';
let currentDiningView = 'list';

function setLandmarkView(mode) {
  currentLandmarkView = mode;
  const listBtn = document.getElementById('btnLandmarkListView');
  const mapBtn = document.getElementById('btnLandmarkMapView');
  const grid = document.getElementById('globalLandmarksGrid');
  const mapContainer = document.getElementById('landmarksMapContainer');

  if (mode === 'map') {
    if (listBtn) listBtn.classList.remove('active');
    if (mapBtn) mapBtn.classList.add('active');
    if (grid) grid.style.display = 'none';
    if (mapContainer) mapContainer.style.display = 'block';
    renderLandmarksMap();
  } else {
    if (listBtn) listBtn.classList.add('active');
    if (mapBtn) mapBtn.classList.remove('active');
    if (grid) grid.style.display = 'grid';
    if (mapContainer) mapContainer.style.display = 'none';
  }
}

function renderLandmarksMap() {
  if (typeof L === 'undefined') return;
  const mapContainer = document.getElementById('landmarksMapContainer');
  if (!mapContainer) return;

  if (!landmarksMapInstance) {
    landmarksMapInstance = L.map('landmarksMapContainer').setView([40.4168, -3.7038], 4);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
      maxZoom: 18
    }).addTo(landmarksMapInstance);
    landmarksMarkerLayer = L.layerGroup().addTo(landmarksMapInstance);
  }

  landmarksMarkerLayer.clearLayers();

  const items = window.currentFilteredLandmarksList || GLOBAL_LANDMARKS_DATA;
  const bounds = L.latLngBounds();

  items.forEach(item => {
    const coords = LANDMARK_COORDS[item.name] || [40.4168, -3.7038];
    const latLng = L.latLng(coords[0], coords[1]);
    bounds.extend(latLng);

    const priceText = item.baseKrw ? formatCardPrice(item.baseKrw) : '무료';
    const popupHtml = `
      <div class="map-popup-card">
        <img src="${item.photo}" class="map-popup-img" alt="${item.name}" onerror="this.src='https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=400'">
        <div class="map-popup-region">${item.region} · ${item.city}</div>
        <div class="map-popup-title">${item.name}</div>
        <div class="map-popup-price">From ${priceText}</div>
        <a href="${item.officialUrl || 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(item.name)}" target="_blank" rel="noopener" class="map-popup-btn">📍 구글 지도 길찾기</a>
      </div>
    `;

    L.marker(latLng).bindPopup(popupHtml).addTo(landmarksMarkerLayer);
  });

  setTimeout(() => {
    landmarksMapInstance.invalidateSize();
    if (items.length > 0) {
      landmarksMapInstance.fitBounds(bounds, { padding: [40, 40], maxZoom: 14 });
    }
  }, 150);
}

function setDiningView(mode) {
  currentDiningView = mode;
  const listBtn = document.getElementById('btnDiningListView');
  const mapBtn = document.getElementById('btnDiningMapView');
  const grid = document.getElementById('globalDiningGrid');
  const mapContainer = document.getElementById('diningMapContainer');

  if (mode === 'map') {
    if (listBtn) listBtn.classList.remove('active');
    if (mapBtn) mapBtn.classList.add('active');
    if (grid) grid.style.display = 'none';
    if (mapContainer) mapContainer.style.display = 'block';
    renderDiningMap();
  } else {
    if (listBtn) listBtn.classList.add('active');
    if (mapBtn) mapBtn.classList.remove('active');
    if (grid) grid.style.display = 'grid';
    if (mapContainer) mapContainer.style.display = 'none';
  }
}

function renderDiningMap() {
  if (typeof L === 'undefined') return;
  const mapContainer = document.getElementById('diningMapContainer');
  if (!mapContainer) return;

  if (!diningMapInstance) {
    diningMapInstance = L.map('diningMapContainer').setView([40.4168, -3.7038], 4);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
      maxZoom: 18
    }).addTo(diningMapInstance);
    diningMarkerLayer = L.layerGroup().addTo(diningMapInstance);
  }

  diningMarkerLayer.clearLayers();

  const items = window.currentFilteredDiningList || GLOBAL_DINING_DATA;
  const bounds = L.latLngBounds();

  items.forEach((item, i) => {
    let coords = CITY_DEFAULT_COORDS[item.city] || [40.4168, -3.7038];
    const jitterLat = (coords[0] + (Math.sin(i * 3.7) * 0.008));
    const jitterLng = (coords[1] + (Math.cos(i * 3.7) * 0.008));
    const latLng = L.latLng(jitterLat, jitterLng);
    bounds.extend(latLng);

    const priceText = item.baseKrw ? formatCardPrice(item.baseKrw) : '₩30,000';
    const popupHtml = `
      <div class="map-popup-card">
        <img src="${item.photo}" class="map-popup-img" alt="${item.name}" onerror="this.src='https://images.unsplash.com/photo-1556881286-fc6915169721?w=400'">
        <div class="map-popup-region">${item.region} · ${item.city}</div>
        <div class="map-popup-title">${item.name}</div>
        <div style="font-size:12px;color:#555;">${item.dishName || ''}</div>
        <div class="map-popup-price">From ${priceText}</div>
        <a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item.name + ' ' + (item.city || ''))}" target="_blank" rel="noopener" class="map-popup-btn">📍 구글 지도 길찾기</a>
      </div>
    `;

    L.marker(latLng).bindPopup(popupHtml).addTo(diningMarkerLayer);
  });

  setTimeout(() => {
    diningMapInstance.invalidateSize();
    if (items.length > 0) {
      diningMapInstance.fitBounds(bounds, { padding: [40, 40], maxZoom: 14 });
    }
  }, 150);
}

// 6. Section 16 Transit & Hotels Interactive Handlers
function switchTransitHotelSubTab(tab) {
  const btnTransit = document.getElementById('tabBtnTransitGuide');
  const btnHotel = document.getElementById('tabBtnHotelGuide');
  const panelTransit = document.getElementById('transitGuidePanel');
  const panelHotel = document.getElementById('hotelGuidePanel');

  if (tab === 'hotels') {
    if (btnTransit) btnTransit.classList.remove('active');
    if (btnHotel) btnHotel.classList.add('active');
    if (panelTransit) panelTransit.style.display = 'none';
    if (panelHotel) panelHotel.style.display = 'block';
    renderHotelFilterBar();
    renderHotelsGrid();
  } else {
    if (btnTransit) btnTransit.classList.add('active');
    if (btnHotel) btnHotel.classList.remove('active');
    if (panelTransit) panelTransit.style.display = 'block';
    if (panelHotel) panelHotel.style.display = 'none';
    renderTransitGuide();
  }
}

function renderTransitGuide() {
  const grid = document.getElementById('transitCardsGrid');
  const tableWrap = document.getElementById('transitComparisonWrap');
  if (!grid) return;

  const lang = currentLang || 'ko';
  let cardsHtml = '';

  for (const [cityKey, cData] of Object.entries(TRANSIT_I18N_DATA)) {
    const cityTitle = cData.city[lang] || cData.city.ko;
    const cardName = cData.cardName[lang] || cData.cardName.ko;
    const passTitle = cData.passTitle[lang] || cData.passTitle.ko;
    const passDesc = cData.passDesc[lang] || cData.passDesc.ko;
    const transferTitle = cData.transferTitle[lang] || cData.transferTitle.ko;
    const transferDesc = cData.transferDesc[lang] || cData.transferDesc.ko;
    const airportTitle = cData.airportTitle[lang] || cData.airportTitle.ko;
    const airportDesc = cData.airportDesc[lang] || cData.airportDesc.ko;
    const seniorTitle = cData.seniorTitle[lang] || cData.seniorTitle.ko;
    const seniorDesc = cData.seniorDesc[lang] || cData.seniorDesc.ko;

    cardsHtml += `
      <div class="transit-city-card">
        <div class="transit-city-header">
          <div class="transit-city-title">${cityTitle}</div>
          <span class="transit-card-name">${cardName}</span>
        </div>
        <div class="transit-spec-item">
          <strong>${passTitle}</strong>
          <p>${passDesc}</p>
        </div>
        <div class="transit-spec-item">
          <strong>${transferTitle}</strong>
          <p>${transferDesc}</p>
        </div>
        <div class="transit-spec-item">
          <strong>${airportTitle}</strong>
          <p>${airportDesc}</p>
        </div>
        <div class="transit-spec-item">
          <strong>${seniorTitle}</strong>
          <p>${seniorDesc}</p>
        </div>
      </div>
    `;
  }
  grid.innerHTML = cardsHtml;

  if (tableWrap) {
    const tData = COMPARISON_TABLE_I18N;
    const tTitle = tData.title[lang] || tData.title.ko;
    const thCat = tData.th_category[lang] || tData.th_category.ko;
    const thContact = tData.th_contactless[lang] || tData.th_contactless.ko;
    const thOfficial = tData.th_official[lang] || tData.th_official.ko;

    let rowsHtml = '';
    tData.rows.forEach(r => {
      const lbl = r.label[lang] || r.label.ko;
      const cVal = r.contactless[lang] || r.contactless.ko;
      const oVal = r.official[lang] || r.official.ko;
      rowsHtml += `
        <tr>
          <td><strong>${lbl}</strong></td>
          <td>${cVal}</td>
          <td>${oVal}</td>
        </tr>
      `;
    });

    tableWrap.innerHTML = `
      <h3 style="font-size:18px;margin-bottom:12px;color:var(--ink)">${tTitle}</h3>
      <table class="table">
        <thead>
          <tr>
            <th>${thCat}</th>
            <th>${thContact}</th>
            <th>${thOfficial}</th>
          </tr>
        </thead>
        <tbody>
          ${rowsHtml}
        </tbody>
      </table>
    `;
  }
}

function renderHotelFilterBar() {
  const bar = document.getElementById('hotelFilterBar');
  if (!bar) return;

  const lang = currentLang || 'ko';
  const L = HOTEL_I18N_LABELS;

  const allLabel = L.filterAll[lang] || L.filterAll.ko;
  const westLabel = L.filterWestern[lang] || L.filterWestern.ko;
  const granadaLabel = L.filterGranadaCordoba[lang] || L.filterGranadaCordoba.ko;

  const cities = [
    { id: 'ALL', label: allLabel },
    { id: '바르셀로나', label: lang === 'en' ? 'Barcelona' : (lang === 'ja' ? 'バルセロナ' : (lang === 'zh' ? '巴塞罗那' : '바르셀로나')) },
    { id: '마드리드', label: lang === 'en' ? 'Madrid' : (lang === 'ja' ? 'マドリード' : (lang === 'zh' ? '马德里' : '마드리드')) },
    { id: '세비야', label: lang === 'en' ? 'Seville' : (lang === 'ja' ? 'セビリア' : (lang === 'zh' ? '塞维利亚' : '세비야')) },
    { id: '그라나다', label: granadaLabel },
    { id: '리스본', label: lang === 'en' ? 'Lisbon' : (lang === 'ja' ? 'リスボン' : (lang === 'zh' ? '里斯本' : '리스본')) },
    { id: '포르투', label: lang === 'en' ? 'Porto' : (lang === 'ja' ? 'ポルト' : (lang === 'zh' ? '波尔图' : '포르투')) },
    { id: '두바이', label: lang === 'en' ? 'Dubai' : (lang === 'ja' ? 'ドバイ' : (lang === 'zh' ? '迪拜' : '두바이')) },
    { id: '서유럽', label: westLabel }
  ];

  bar.innerHTML = cities.map(c => `
    <button class="tab-chip ${currentHotelCityFilter === c.id ? 'active' : ''}" onclick="filterHotelsByCity('${c.id}', this)">${c.label}</button>
  `).join('');
}

function renderHotelsGrid(filterCity = currentHotelCityFilter) {
  currentHotelCityFilter = filterCity;
  const grid = document.getElementById('hotelCardsGrid');
  if (!grid) return;
  grid.innerHTML = '';

  const lang = currentLang || 'ko';
  const L = HOTEL_I18N_LABELS;

  let list = FULL_HOTELS_DATA;
  if (filterCity !== 'ALL') {
    if (filterCity === '서유럽') {
      list = list.filter(h => ['영국', '프랑스', '이탈리아'].includes(h.region.ko));
    } else if (filterCity === '그라나다') {
      list = list.filter(h => ['그라나다', '코르도바'].includes(h.city.ko));
    } else {
      list = list.filter(h => h.city.ko.includes(filterCity) || h.region.ko.includes(filterCity));
    }
  }

  list.forEach(hotel => {
    const card = document.createElement('div');
    card.className = 'hotel-card';

    const hName = lang === 'en' ? (hotel.nameEn || hotel.name) : hotel.name;
    const hSub = `${hotel.nameEn} · ${hotel.region[lang] || hotel.region.ko} ${hotel.city[lang] || hotel.city.ko}`;
    const hStars = hotel.stars[lang] || hotel.stars.ko;
    const hStation = hotel.station[lang] || hotel.station.ko;
    const hBus = hotel.busStop[lang] || hotel.busStop.ko;
    const hElevator = hotel.elevator[lang] || hotel.elevator.ko;
    const hFeatures = hotel.features[lang] || hotel.features.ko;
    const priceText = formatCardPrice(hotel.basePriceKrw);
    const perNight = L.perNight[lang] || L.perNight.ko;

    card.innerHTML = `
      <div class="hotel-img-wrap">
        <img src="${hotel.photo}" class="hotel-img" alt="${hName}" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400'">
        <div class="hotel-star-badge">${hStars}</div>
        <div class="hotel-price-badge">From ${priceText} ${perNight}</div>
      </div>
      <div class="hotel-body">
        <div class="hotel-title">${hName}</div>
        <div class="hotel-sub">${hSub}</div>
        
        <div class="hotel-spec-list">
          <div class="hotel-spec-row">
            <strong>🚉 ${L.station[lang] || L.station.ko}:</strong>
            <span>${hStation}</span>
          </div>
          <div class="hotel-spec-row">
            <strong>🚌 ${L.busStop[lang] || L.busStop.ko}:</strong>
            <span>${hBus}</span>
          </div>
          <div class="hotel-spec-row">
            <strong>🛗 ${L.elevator[lang] || L.elevator.ko}:</strong>
            <span>${hElevator}</span>
          </div>
        </div>

        <div class="hotel-feature-box">
          💡 <strong>${L.features[lang] || L.features.ko}:</strong> ${hFeatures}
        </div>

        <div class="hotel-actions">
          <a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(hotel.mapQuery)}" target="_blank" rel="noopener" class="action-btn primary">${L.mapBtn[lang] || L.mapBtn.ko}</a>
          <a href="https://www.booking.com/searchresults.html?ss=${encodeURIComponent(hotel.mapQuery)}" target="_blank" rel="noopener" class="action-btn">${L.bookBtn[lang] || L.bookBtn.ko}</a>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });
}

function filterHotelsByCity(cityName, btn) {
  currentHotelCityFilter = cityName;
  document.querySelectorAll('#hotelFilterBar .tab-chip').forEach(c => c.classList.remove('active'));
  if (btn) btn.classList.add('active');
  renderHotelsGrid(cityName);
}

// 7. Local Storage Auto-Load & Preferences
function loadUserPreferences() {
  try {
    const savedCurr = localStorage.getItem('travel_user_currency');
    if (savedCurr && FX_RATES[savedCurr]) {
      const currBtn = document.getElementById(`currBtn${savedCurr}`);
      setCurrency(savedCurr, currBtn);
    }

    const savedTheme = localStorage.getItem('travel_user_theme');
    if (savedTheme) {
      setTheme(savedTheme);
    }

    const savedFont = localStorage.getItem('travel_user_fontscale');
    if (savedFont) {
      currentFontScale = parseFloat(savedFont);
      applyFontScale();
    }

    const savedRegion = localStorage.getItem('travel_user_region');
    const regEl = document.getElementById('userRegionSelect');
    if (savedRegion && regEl) {
      regEl.value = savedRegion;
      currentActiveRegion = savedRegion;
    }

    const savedDuration = localStorage.getItem('travel_user_duration');
    const durEl = document.getElementById('userDurationSelect');
    if (savedDuration && durEl) {
      durEl.value = savedDuration;
      currentDurationDays = parseInt(savedDuration, 10);
    }

    const savedParty = localStorage.getItem('travel_user_party');
    const partyEl = document.getElementById('userPartySize');
    if (savedParty && partyEl) partyEl.value = savedParty;

    const savedTier = localStorage.getItem('travel_user_tier');
    const tierEl = document.getElementById('userTierSelect');
    if (savedTier && tierEl) tierEl.value = savedTier;

    const savedPacing = localStorage.getItem('travel_user_pacing');
    const pacEl = document.getElementById('userPacingSelect');
    if (savedPacing && pacEl) pacEl.value = savedPacing;

    const savedDate = localStorage.getItem('travel_user_start_date');
    const dateEl = document.getElementById('userStartDate');
    if (savedDate && dateEl) dateEl.value = savedDate;

  } catch (e) {
    console.warn('Preferences load error:', e);
  }
}


let currentLang = 'ko';
let currentPhraseFilter = 'ALL';


// ==============================================================
// 🇦🇪 DUBAI DATASET & PRICES EXTENSION INJECTION
// ==============================================================
(function() {
  const DUBAI_LANDMARKS = [
  {
    "name": "버즈 칼리파 전망대 (Burj Khalifa - At the Top)",
    "region": "두바이",
    "city": "UAE 두바이",
    "photo": "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80",
    "highlight": "세계 최고층 828m 타워. 초고속 엘리베이터로 124·125층 전망대 직행 및 360도 사막·도시 파노라마",
    "seniorAccess": "완전 평지 동선, 휠체어 대응 초고속 더블데크 엘리베이터 완비, 전망층 라운지 푹신한 소파 좌석 다수 구비",
    "hours": "매일 08:30~23:00 (일몰 골든타임 사전 예약 필수)",
    "ticketTip": "공식 사이트에서 At the Top 시간 지정 패스트트랙 예매 시 대기열 없이 즉시 입장 가능",
    "officialUrl": "https://www.burjkhalifa.ae/en/index.aspx",
    "mapQuery": "Burj Khalifa Dubai",
    "baseKrw": 65000
  },
  {
    "name": "미래의 박물관 (Museum of the Future)",
    "region": "두바이",
    "city": "UAE 두바이",
    "photo": "https://images.unsplash.com/photo-1580674684081-7617fbf3d745?auto=format&fit=crop&w=800&q=80",
    "highlight": "세계에서 가장 아름다운 건축물 1위. 아라비아 서예 글귀로 감싼 기둥 없는 7층 도넛형 미래 혁신 공간",
    "seniorAccess": "100% 무장애 배리어프리 설계, 턱이 전혀 없는 완만한 바닥, 초대형 엘리베이터 및 어르신 전용 휠체어 무료 대여",
    "hours": "매일 10:00~19:30",
    "ticketTip": "글로벌 최고 인기 명소로 최소 2~4주 전 공식 홈페이지 사전 티켓팅 필수",
    "officialUrl": "https://museumofthefuture.ae/en",
    "mapQuery": "Museum of the Future Dubai",
    "baseKrw": 55000
  },
  {
    "name": "두바이 분수 쇼 & 두바이 몰 (The Dubai Fountain)",
    "region": "두바이",
    "city": "UAE 두바이",
    "photo": "https://images.unsplash.com/photo-1546412414-e1885259563a?auto=format&fit=crop&w=800&q=80",
    "highlight": "세계 최대 규모 음악 분수 쇼. 150m 높이로 솟구치는 물줄기와 빛·음악의 환상적인 라이트 하모니",
    "seniorAccess": "두바이 몰 실내 100% 평지, 무료 버기카(전동 카트) 서비스 지원, 테라스 레스토랑에서 편안히 앉아 관람 가능",
    "hours": "매일 18:00~23:00 (30분 간격 무료 진행)",
    "ticketTip": "수크 알 바하르 테라스 카페 또는 2층 애플스토어 발코니에서 군중 없이 편안하게 관람 추천",
    "officialUrl": "https://thedubaimall.com/en/entertain-detail/the-dubai-fountain",
    "mapQuery": "The Dubai Fountain",
    "baseKrw": 0
  },
  {
    "name": "더 뷰 앳 더 팜 (The View at The Palm)",
    "region": "두바이",
    "city": "UAE 두바이",
    "photo": "https://images.unsplash.com/photo-1580674285054-bed31e145f59?auto=format&fit=crop&w=800&q=80",
    "highlight": "야자수 모양 인공섬 팜 주메이라를 360도로 한눈에 조망하는 240m 높이의 최고 전망대",
    "seniorAccess": "더 팜 타워 52층까지 초고속 엘리베이터 직행, 무릎 부담 전혀 없는 완전 평지 실내·외 전망 데크",
    "hours": "매일 09:00~20:30 (주말 ~21:00)",
    "ticketTip": "일몰 1시간 전 입장하여 낮 풍경, 노을, 야경을 한 번에 감상하는 골든 아워 티켓 추천",
    "officialUrl": "https://www.theviewpalm.ae/",
    "mapQuery": "The View at The Palm",
    "baseKrw": 37000
  },
  {
    "name": "알 파히디 & 알 시프 역사 지구 (Al Fahidi & Al Seef)",
    "region": "두바이",
    "city": "UAE 두바이",
    "photo": "https://images.unsplash.com/photo-1578895101408-1a36b834405b?auto=format&fit=crop&w=800&q=80",
    "highlight": "19세기 전통 바람탑(Barjeel) 골목과 두바이 크릭을 잇는 올드 두바이의 고즈넉한 문화 유산",
    "seniorAccess": "크릭 강변 산책로 완만한 평지 보행, 카페 정원 그늘 휴식처 다수, 전통 아브라 탑승 시 부축 지원",
    "hours": "상시 개방 (상점 및 갤러리 10:00~22:00)",
    "ticketTip": "알 시프에서 알 파히디를 거쳐 아브라(1 디르함 동전)로 건너편 골드 수크까지 이어지는 코스 추천",
    "officialUrl": "https://dubaiculture.gov.ae/en/heritage/heritage-sites/Al-Fahidi-Historical-Neighbourhood",
    "mapQuery": "Al Fahidi Historical Neighbourhood Dubai",
    "baseKrw": 370
  },
  {
    "name": "두바이 프레임 (Dubai Frame)",
    "region": "두바이",
    "city": "UAE 두바이",
    "photo": "https://images.unsplash.com/photo-1580674684081-7617fbf3d745?auto=format&fit=crop&w=800&q=80",
    "highlight": "150m 높이의 거대한 황금 액자. 북쪽으로는 올드 두바이, 남쪽으로는 현대 두바이의 마천루를 대비 조망",
    "seniorAccess": "초고속 파노라마 엘리베이터, 상층부 투명 바닥 보행로 및 우회 가능한 불투명 평지 보행로 마련",
    "hours": "매일 09:00~21:00",
    "ticketTip": "자빌 파크 내 위치하여 아침 일찍 방문하면 대기 없이 쾌적하게 관람 가능",
    "officialUrl": "https://www.dubaiframe.ae/en",
    "mapQuery": "Dubai Frame Zabeel Park",
    "baseKrw": 18500
  },
  {
    "name": "두바이 미라클 가든 (Dubai Miracle Garden)",
    "region": "두바이",
    "city": "UAE 두바이",
    "photo": "https://images.unsplash.com/photo-1528702748617-c64d49f918af?auto=format&fit=crop&w=800&q=80",
    "highlight": "사막 한가운데 1억 5천만 송이 생화로 에미레이트 A380 비행기와 성을 구현한 세계 최대 천연 꽃 정원",
    "seniorAccess": "넓은 평지 산책로, 걷기 힘드신 어르신을 위한 골프 카트(버기) 투어 운영 및 휠체어 대여 가능",
    "hours": "11월~4월 겨울 시즌 한정 운영 (평일 09:00~21:00, 주말 ~22:00)",
    "ticketTip": "여름엔 휴장하므로 11~12월 겨울 여행객에게 가장 이상적인 계절 한정 명소",
    "officialUrl": "https://www.dubaimiraclegarden.com/",
    "mapQuery": "Dubai Miracle Garden",
    "baseKrw": 35000
  }
];
  const DUBAI_DINING = [
  {
    "name": "Arabian Tea House",
    "region": "두바이",
    "city": "UAE 두바이",
    "country": "UAE",
    "dishName": "에미라티 전통 아침 식사 트레이 & 민트 티 (Emirati Breakfast Tray)",
    "photo": "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
    "signature": "흰색 터키석 천막 정원에서 맛보는 수제 아랍 빵(카미르/체밥), 발루릿, 데이츠 시럽, 시원한 민트 티",
    "seniorTip": "푸른 나무와 하얀 천막 아래 그늘진 정원 평지 좌석. 자극적이지 않고 담백해 어르신 아침 브런치로 환상적",
    "hours": "매일 07:00~23:00",
    "language": "영어 능통 · 친절하고 따뜻한 아라비아 전통 환대",
    "phone": "+971 4 353 7723",
    "booking": "워크인 (오전 10시 이전 방문 시 대기 없음)",
    "mapQuery": "Arabian Tea House Restaurant Al Fahidi",
    "baseKrw": 24000
  },
  {
    "name": "Al Fanar Restaurant & Café",
    "region": "두바이",
    "city": "UAE 두바이",
    "country": "UAE",
    "dishName": "전통 양고기 마크부스 & 살루나 해산물 스튜 (Lamb Machboos)",
    "photo": "https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=800&q=80",
    "signature": "카다멈과 사프란으로 지은 고슬고슬한 아랍 쌀밥 위에 푹 삶아 입에서 살살 녹는 부드러운 양고기",
    "seniorTip": "1960년대 옛 두바이 마을을 재현한 턱 없는 1층 레스토랑. 고기가 아주 연하게 쪄 나와 치아가 약하신 부모님 식사로 최고",
    "hours": "매일 12:00~23:00",
    "language": "영어 완벽 · 사진 메뉴판 구비",
    "phone": "+971 4 396 6669",
    "booking": "공식 웹사이트 및 전화 예약 권장",
    "mapQuery": "Al Fanar Restaurant Al Seef Dubai",
    "baseKrw": 31000
  },
  {
    "name": "Bu Qtair",
    "region": "두바이",
    "city": "UAE 두바이",
    "country": "UAE",
    "dishName": "당일 직송 하무르 생선 구이 & 매콤달콤 왕새우 튀김 (Fried Hamour & Prawns)",
    "photo": "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=800&q=80",
    "signature": "매일 아침 어시장에서 들여온 신선한 흰살 생선 하무르와 왕새우를 아라비안 마살라로 바삭하게 튀겨낸 어부의 맛",
    "seniorTip": "주메이라 비치 인근 현대식 실내 매장으로 이전하여 쾌적한 에어컨과 넓은 평지 테이블 완비",
    "hours": "매일 11:30~23:30 (금요일 13:00~)",
    "language": "영어 능통 · 생선 무게 단위 주문",
    "phone": "+971 55 705 2130",
    "booking": "워크인 선착순 (저녁 18:30 이전 방문 추천)",
    "mapQuery": "Bu Qtair Restaurant Umm Suqeim Dubai",
    "baseKrw": 26000
  },
  {
    "name": "Al Nafoorah",
    "region": "두바이",
    "city": "UAE 두바이",
    "country": "UAE",
    "dishName": "오스만 궁전식 프리미엄 양갈비 구이 & 후무스 (Lebanese Mixed Grill)",
    "photo": "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
    "signature": "참숯에 정성스레 구운 최고급 양갈비, 신선한 타불레 샐러드, 부드러운 병아리콩 후무스 플래터",
    "seniorTip": "주메이라 알 카스르 럭셔리 리조트 내 위치. 호텔 정문에서 카트로 이동 가능하며 호텔급 최고 수준의 정중한 케어",
    "hours": "매일 13:00~15:30, 18:30~23:00",
    "language": "영어 완벽 · VIP 의전급 서비스",
    "phone": "+971 800 323232",
    "booking": "주메이라 공식 사이트 필수 예약",
    "mapQuery": "Al Nafoorah Jumeirah Al Qasr Dubai",
    "baseKrw": 59000
  },
  {
    "name": "Armani/Amal",
    "region": "두바이",
    "city": "UAE 두바이",
    "country": "UAE",
    "dishName": "분수 쇼 테라스 뷰 컨템포러리 다이닝 & 달 카레 (Contemporary Asian / Indian)",
    "photo": "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80",
    "signature": "버즈 칼리파 3층 테라스에서 분수 쇼를 정면으로 바라보며 즐기는 미쉐린 셀렉티드 모던 다이닝 코스",
    "seniorTip": "버즈 칼리파 내부 엘리베이터 직행, 호텔 발레파킹 및 휠체어 완벽 지원, 소음 없이 테라스에서 분수 쇼 조망",
    "hours": "매일 18:30~23:30 (일요일 휴무)",
    "language": "영어 완벽 · 다국어 소믈리에 상주",
    "phone": "+971 4 888 3666",
    "booking": "최소 2~3주 전 아르마니 호텔 공식 예약",
    "mapQuery": "Armani Amal Burj Khalifa Dubai",
    "baseKrw": 81000
  },
  {
    "name": "Logma",
    "region": "두바이",
    "city": "UAE 두바이",
    "country": "UAE",
    "dishName": "사프란 카락 티 & 루카이마트 대추야자 도넛 (Karak Tea & Lugaimat)",
    "photo": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80",
    "signature": "진한 사프란 향의 에미라티 밀크티와 갓 튀겨 따뜻한 조청 시럽을 뿌린 전통 도넛 루카이마트",
    "seniorTip": "두바이 몰 패션 애비뉴 3층 분수 전망 테라스. 쇼핑 중 어르신 당 충전과 다리 쉼터로 제격",
    "hours": "매일 10:00~00:00",
    "language": "영어 완벽 · 태블릿 사진 주문",
    "phone": "+971 800 56462",
    "booking": "워크인 가능",
    "mapQuery": "Logma Dubai Mall",
    "baseKrw": 16500
  },
  {
    "name": "Shabestan",
    "region": "두바이",
    "city": "UAE 두바이",
    "country": "UAE",
    "dishName": "두바이 크릭 야경 정통 사프란 양고기 쿠비데 케밥 (Koobideh Kebab)",
    "photo": "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80",
    "signature": "40년 전통의 두바이 최고 페르시안 레스토랑. 숯불에 구운 육즙 가득한 다진 양고기와 사프란 버터 밥",
    "seniorTip": "래디슨 블루 호텔 엘리베이터 이동, 크릭 야경이 파노라마로 펼쳐지는 넓은 소파 좌석과 전통 악기 라이브 연주",
    "hours": "매일 12:30~23:00",
    "language": "영어 완벽 · 친절한 전통 서비스",
    "phone": "+971 4 222 7127",
    "booking": "호텔 레스토랑 사전 예약 권장",
    "mapQuery": "Shabestan Radisson Blu Hotel Dubai Deira Creek",
    "baseKrw": 39000
  }
];
  const DUBAI_LANDMARK_I18N = {
  "버즈 칼리파 전망대 (Burj Khalifa - At the Top)": {
    "displayName": {
      "ko": "버즈 칼리파 전망대 (Burj Khalifa - At the Top)",
      "ja": "ブルジュ・ハリファ展望台（At the Top）",
      "en": "Burj Khalifa - At the Top Observatory",
      "zh": "哈利法塔观景台 (Burj Khalifa - At the Top)"
    },
    "badge": {
      "ko": "🇦🇪 두바이 · 세계 최고층 828m",
      "ja": "🇦🇪 ドバイ · 世界最高峰828m",
      "en": "🇦🇪 Dubai · World's Tallest 828m",
      "zh": "🇦🇪 迪拜 · 全球最高828米"
    },
    "highlight": {
      "ko": "세계 최고층 828m 타워. 초고속 엘리베이터로 124·125층 전망대 직행 및 360도 파노라마",
      "ja": "世界一の超高層828mタワー。超高速エレベーターで124・125階展望フロアへ直行",
      "en": "World's tallest 828m skyscraper with double-deck high-speed elevators to 124 & 125th floors",
      "zh": "世界第一高楼828米。双层高速电梯直达124和125层全景落地窗观景台"
    },
    "seniorAccess": {
      "ko": "완전 평지 동선, 휠체어 대응 초고속 엘리베이터, 전망층 라운지 안락 소파 좌석 구비",
      "ja": "完全バリアフリー平坦動線、車椅子対応高速エレベーター完備、ゆったりソファ席多数",
      "en": "Step-free walkways, wheelchair-accessible elevators, cushioned viewing lounge seating",
      "zh": "全程无障碍平路通道，无障碍高速直梯直达，观景层设有多处舒适沙发休息区"
    },
    "hours": {
      "ko": "매일 08:30~23:00 (일몰 시간대 사전 예약 필수)",
      "ja": "毎日 08:30〜23:00（夕日鑑賞は事前予約必須）",
      "en": "Daily 08:30–23:00 (Sunset slots advance reservation required)",
      "zh": "每日 08:30~23:00（日落黄金场次须提前预约）"
    },
    "ticketTip": {
      "ko": "공식 사이트 패스트트랙 예매 시 대기열 없이 즉시 입장 가능",
      "ja": "公式サイトのファストトラック予約で並ばずスムーズに入場可能",
      "en": "Pre-book official timed fast-track tickets online to bypass long queues",
      "zh": "建议官网提前预订定时快速通道票，免排长队直达登塔"
    }
  },
  "미래의 박물관 (Museum of the Future)": {
    "displayName": {
      "ko": "미래의 박물관 (Museum of the Future)",
      "ja": "未来博物館（Museum of the Future）",
      "en": "Museum of the Future",
      "zh": "未来博物馆 (Museum of the Future)"
    },
    "badge": {
      "ko": "🇦🇪 두바이 · 세계에서 가장 아름다운 건축",
      "ja": "🇦🇪 ドバイ · 世界で最も美しい建築",
      "en": "🇦🇪 Dubai · World's Most Beautiful Building",
      "zh": "🇦🇪 迪拜 · 全球最美现代建筑奇迹"
    },
    "highlight": {
      "ko": "세계에서 가장 아름다운 건축물 1위. 아라비아 서예 글귀로 감싼 무주형(기둥 없는) 미래 혁신 공간",
      "ja": "世界で最も美しい建築第1位。アラビア書道で包まれた柱のない7階建ての革新空間",
      "en": "Ranked world's most beautiful building with torus architecture covered in Arabic calligraphy",
      "zh": "被评为全球最美建筑之首。阿拉伯书法镂空环形无立柱先锋建筑"
    },
    "seniorAccess": {
      "ko": "100% 무장애 배리어프리 설계, 턱 없는 완만한 바닥, 초대형 엘리베이터 & 휠체어 무료 대여",
      "ja": "100%段差なし完全バリアフリー設計、特大エレベーター＆無料車椅子貸出",
      "en": "100% barrier-free design, gentle sloped floors, spacious elevators & complimentary wheelchairs",
      "zh": "100%零门槛无障碍通道，缓坡防滑地面，宽敞无障碍垂直电梯及免费轮椅租借"
    },
    "hours": {
      "ko": "매일 10:00~19:30",
      "ja": "毎日 10:00〜19:30",
      "en": "Daily 10:00–19:30",
      "zh": "每日 10:00~19:30"
    },
    "ticketTip": {
      "ko": "글로벌 인기 명소로 최소 2~4주 전 공식 홈페이지 사전 티켓팅 필수",
      "ja": "世界的な人気施設のため、最低2〜4週間前の公式サイト事前予約が必須",
      "en": "Ultra-popular global landmark: book at least 2–4 weeks in advance on official portal",
      "zh": "全球超级热门地标，务必提前2至4周在官网预订入场时段"
    }
  },
  "두바이 분수 쇼 & 두바이 몰 (The Dubai Fountain)": {
    "displayName": {
      "ko": "두바이 분수 쇼 & 두바이 몰 (The Dubai Fountain)",
      "ja": "ドバイ・ファウンテン＆ドバイ・モール",
      "en": "The Dubai Fountain & Dubai Mall",
      "zh": "迪拜喷泉与迪拜购物中心 (The Dubai Fountain)"
    },
    "badge": {
      "ko": "🇦🇪 두바이 · 세계 최대 음악 분수 쇼",
      "ja": "🇦🇪 ドバイ · 世界最大級の噴水ショー",
      "en": "🇦🇪 Dubai · World's Largest Dancing Fountain",
      "zh": "🇦🇪 迪拜 · 全球最大音乐喷泉秀"
    },
    "highlight": {
      "ko": "세계 최대 규모 음악 분수 쇼. 150m 높이 물줄기와 빛·음악의 환상적인 라이트 하모니",
      "ja": "世界最大級の噴水ショー。高さ150mまで吹き上がる水と音楽・光のシンフォニー",
      "en": "World's largest choreographed fountain system performing to world-class musical light scores",
      "zh": "世界最大音乐喷泉。高达150米的水柱伴随世界名曲与灯光优雅起舞"
    },
    "seniorAccess": {
      "ko": "두바이 몰 실내 100% 평지, 무료 버기카(전동 카트) 서비스 지원, 테라스 카페 좌석 관람",
      "ja": "モール内完全フラット平坦路、無料電動バギー送迎あり、テラス席から座って鑑賞可能",
      "en": "100% flat indoor mall terrain, free electric buggy transfers, comfortable lakeside cafe seating",
      "zh": "购物中心内部全平整平步通道，提供免费电瓶摆渡车，可在湖畔露台餐厅悠闲坐享"
    },
    "hours": {
      "ko": "매일 18:00~23:00 (30분 간격 무료 진행)",
      "ja": "毎日 18:00〜23:00（30分毎・鑑賞無料）",
      "en": "Daily 18:00–23:00 (Every 30 mins, Free Admission)",
      "zh": "每日 18:00~23:00（每30分钟一场，免费观赏）"
    },
    "ticketTip": {
      "ko": "수크 알 바하르 테라스 카페 또는 2층 애플스토어 발코니에서 쾌적하게 관람",
      "ja": "スーク・アル・バハールのテラス席やアップルストア2階バルコニーが鑑賞ベストスポット",
      "en": "Watch from Souk Al Bahar terrace restaurants or Apple Store 2nd floor balcony",
      "zh": "建议在阿尔巴哈市集露台餐厅或苹果旗舰店2层露台避免拥挤舒适观赏"
    }
  },
  "더 뷰 앳 더 팜 (The View at The Palm)": {
    "displayName": {
      "ko": "더 뷰 앳 더 팜 (The View at The Palm)",
      "ja": "ザ・ビュー・アット・ザ・パーム（The View）",
      "en": "The View at The Palm",
      "zh": "棕榈岛观景台 (The View at The Palm)"
    },
    "badge": {
      "ko": "🇦🇪 두바이 · 팜 주메이라 360도 파노라마",
      "ja": "🇦🇪 ドバイ · パーム・ジュメイラ360度展望",
      "en": "🇦🇪 Dubai · 360° Palm Jumeirah Panorama",
      "zh": "🇦🇪 迪拜 · 棕榈岛360度空中全景"
    },
    "highlight": {
      "ko": "야자수 모양 인공섬 팜 주메이라를 360도로 한눈에 조망하는 240m 높이의 최고 전망대",
      "ja": "ヤシの木型人工島パーム・ジュメイラを地上240mから一望する360度パノラマ展望台",
      "en": "240m-high observation deck offering 360-degree panoramic views of Palm Jumeirah island",
      "zh": "高240米的全景落地观景台，将壮丽的棕榈叶人工岛全貌与阿拉伯湾尽收眼底"
    },
    "seniorAccess": {
      "ko": "더 팜 타워 52층까지 초고속 엘리베이터 직행, 무릎 부담 전혀 없는 완전 평지 실내·외 전망 데크",
      "ja": "52階まで超高速エレベーター直行、膝の負担ゼロの完全平坦展望デッキ",
      "en": "Direct express elevator to Level 52, step-free access across indoor and outdoor viewing decks",
      "zh": "直梯高速直达52层，全程无台阶纯平整观景台，特别关照长辈膝盖"
    },
    "hours": {
      "ko": "매일 09:00~20:30 (주말 ~21:00)",
      "ja": "毎日 09:00〜20:30（週末〜21:00）",
      "en": "Daily 09:00–20:30 (Weekends until 21:00)",
      "zh": "每日 09:00~20:30（周末营业至21:00）"
    },
    "ticketTip": {
      "ko": "일몰 1시간 전 입장하여 주경, 노을, 야경을 모두 감상하는 골든 아워 티켓 추천",
      "ja": "日没1時間前に入場して昼景・夕暮れ・夜景をすべて楽しむゴールデンアワーがおすすめ",
      "en": "Book sunset golden hour slots to enjoy daytime vistas, golden hour, and night lights",
      "zh": "推荐日落前1小时入场，一次饱览日景、晚霞与璀璨夜景"
    }
  },
  "알 파히디 & 알 시프 역사 지구 (Al Fahidi & Al Seef)": {
    "displayName": {
      "ko": "알 파히디 & 알 시프 역사 지구 (Al Fahidi & Al Seef)",
      "ja": "アル・ファヒディ歴史地区＆アル・シーフ",
      "en": "Al Fahidi & Al Seef Heritage District",
      "zh": "阿法迪历史区与阿西夫河畔 (Al Fahidi & Al Seef)"
    },
    "badge": {
      "ko": "🇦🇪 두바이 · 올드 두바이 전통 골목 & 아브라",
      "ja": "🇦🇪 ドバイ · 歴史遺産地区＆アブラ船",
      "en": "🇦🇪 Dubai · Old Dubai Heritage & Abra Boats",
      "zh": "🇦🇪 迪拜 · 老城传统风塔街区与水上的士"
    },
    "highlight": {
      "ko": "19세기 전통 바람탑(Barjeel) 골목과 두바이 크릭을 잇는 올드 두바이의 고즈넉한 문화 유산",
      "ja": "19世紀の伝統的な風の塔（バージール）が連なる静かな歴史街並みとドバイ・クリーク",
      "en": "19th-century wind-tower architecture and winding alleyways along Dubai Creek",
      "zh": "保存完好的19世纪风塔泥砖院落老街，与迪拜湾传统木船相映成趣"
    },
    "seniorAccess": {
      "ko": "크릭 강변 산책로 완만한 평지 보행, 카페 정원 그늘 휴식처 다수, 전통 아브라 탑승 시 부축 지원",
      "ja": "クリーク沿いの平坦遊歩道、木陰カフェ多数、アブラ船乗船時も丁寧なサポートあり",
      "en": "Gentle flat riverfront promenades, shaded courtyard cafes, assisted boarding on traditional boats",
      "zh": "河畔沿岸步道极为平缓，绿树掩映庭院茶社众多，搭乘木船时有专人搀扶"
    },
    "hours": {
      "ko": "상시 개방 (상점 및 갤러리 10:00~22:00)",
      "ja": "常時散策可能（店舗・ギャラリー 10:00〜22:00）",
      "en": "Open 24/7 (Shops & galleries 10:00–22:00)",
      "zh": "全天开放（传统市集店铺 10:00~22:00）"
    },
    "ticketTip": {
      "ko": "알 시프에서 알 파히디를 거쳐 아브라(1 디르함 동전)로 건너편 골드 수크까지 이어지는 코스 추천",
      "ja": "アル・シーフから散策し、1ディルハムのアブラ船で対岸のゴールドスークへ渡るルートが最高",
      "en": "Take the 1 AED traditional abra boat across Dubai Creek to explore Gold & Spice Souks",
      "zh": "体验仅需1迪拉姆的木制水上的士横渡迪拜湾，连接黄金市集与香料市场"
    }
  },
  "두바이 프레임 (Dubai Frame)": {
    "displayName": {
      "ko": "두바이 프레임 (Dubai Frame)",
      "ja": "ドバイ・フレーム（Dubai Frame）",
      "en": "Dubai Frame",
      "zh": "迪拜金相框 (Dubai Frame)"
    },
    "badge": {
      "ko": "🇦🇪 두바이 · 150m 거대 황금 액자 전망대",
      "ja": "🇦🇪 ドバイ · 高さ150mの黄金フレーム",
      "en": "🇦🇪 Dubai · 150m Golden Frame Sky Bridge",
      "zh": "🇦🇪 迪拜 · 150米镀金相框天桥"
    },
    "highlight": {
      "ko": "150m 높이의 거대한 황금 액자. 북쪽으로는 올드 두바이, 남쪽으로는 현대 마천루를 대비 조망",
      "ja": "高さ150mの巨大な金色の額縁。北の旧市街と南の近代超高層ビル群を対比して一望",
      "en": "A 150m-high architectural golden picture frame bridging Old Dubai with futuristic modern Dubai",
      "zh": "高达150米的巨型镀金相框，一桥连接老城历史街区与新城现代摩天楼群"
    },
    "seniorAccess": {
      "ko": "초고속 파노라마 엘리베이터, 상층부 투명 바닥 보행로 및 우회 가능한 불투명 평지 보행로 마련",
      "ja": "高速パノラマエレベーター直行、ガラス床の横に迂回可能な安心の平坦通路完備",
      "en": "Panoramic high-speed elevators; glass walkway has solid opaque bypass paths for timid walkers",
      "zh": "高速景观垂直电梯直达顶层，悬空玻璃桥身两侧设有安全平缓的非透明通道"
    },
    "hours": {
      "ko": "매일 09:00~21:00",
      "ja": "毎日 09:00〜21:00",
      "en": "Daily 09:00–21:00",
      "zh": "每日 09:00~21:00"
    },
    "ticketTip": {
      "ko": "자빌 파크 내 위치하여 아침 일찍 방문하면 대기 없이 쾌적하게 관람 가능",
      "ja": "ザビール公園内にあり、午前中の早い時間帯なら待ち時間なく快適",
      "en": "Located in Zabeel Park; morning visits offer minimal wait times and pleasant temperatures",
      "zh": "坐落于扎比尔公园，建议上午前往避开客流高峰与日晒"
    }
  },
  "두바이 미라클 가든 (Dubai Miracle Garden)": {
    "displayName": {
      "ko": "두바이 미라클 가든 (Dubai Miracle Garden)",
      "ja": "ドバイ・ミラクル・ガーデン",
      "en": "Dubai Miracle Garden",
      "zh": "迪拜奇迹花园 (Dubai Miracle Garden)"
    },
    "badge": {
      "ko": "🇦🇪 두바이 · 1억 5천만 송이 세계 최대 꽃 정원",
      "ja": "🇦🇪 ドバイ · 1億5千万本の奇跡の花園",
      "en": "🇦🇪 Dubai · World's Largest Natural Flower Garden",
      "zh": "🇦🇪 迪拜 · 1.5亿株沙漠花海奇观"
    },
    "highlight": {
      "ko": "사막 한가운데 1억 5천만 송이 생화로 에미레이트 A380 비행기와 성을 구현한 세계 최대 천연 꽃 정원",
      "ja": "砂漠に咲き誇る1億5千万本の生花。等身大のA380航空機や城をかたどった世界最大の花園",
      "en": "World's largest natural floral paradise with over 150 million blooms including a full-scale A380",
      "zh": "沙漠奇迹。1.5亿株鲜花打造的巨型空客A380飞机造型与花卉城堡"
    },
    "seniorAccess": {
      "ko": "넓은 평지 산책로, 걷기 힘드신 어르신을 위한 골프 카트(버기) 투어 운영 및 휠체어 대여 가능",
      "ja": "広々とした平坦遊歩道、シニア向けゴルフカート（バギー）運行＆車椅子貸出完備",
      "en": "Spacious flat pathways, golf buggy tours available for seniors, wheelchairs on site",
      "zh": "全园平坦宽敞步道，专为长辈提供高尔夫电瓶游览车服务及轮椅租赁"
    },
    "hours": {
      "ko": "11월~4월 겨울 시즌 한정 운영 (평일 09:00~21:00, 주말 ~22:00)",
      "ja": "11月〜4月の冬季限定オープン（平日 09:00〜21:00、週末〜22:00）",
      "en": "Winter Season only (Nov–Apr): Weekdays 09:00–21:00, Weekends until 22:00",
      "zh": "仅限11月至次年4月冬季开放（工作日 09:00~21:00，周末至22:00）"
    },
    "ticketTip": {
      "ko": "여름엔 휴장하므로 11~12월 겨울 여행객에게 가장 이상적인 계절 한정 명소",
      "ja": "夏季は休園するため、11〜12月の冬の旅程に最適な期間限定ハイライト",
      "en": "Closed during scorching summer: perfectly timed for November & December family stopovers",
      "zh": "夏季炎热闭园，恰好与11~12月秋冬出行完美契合，不可错过"
    }
  }
};
  const DUBAI_DINING_I18N = {
  "Arabian Tea House": {
    "displayName": {
      "ko": "아라비안 티 하우스 (Arabian Tea House)",
      "ja": "アラビアン・ティーハウス（バスタキヤ本店）",
      "en": "Arabian Tea House (Al Fahidi)",
      "zh": "阿拉伯茶屋 (Arabian Tea House)"
    },
    "dishTitle": {
      "ko": "에미라티 전통 아침 식사 트레이 & 민트 티",
      "ja": "伝統エミレーツ朝食トレイ＆ミントティー",
      "en": "Emirati Breakfast Tray & Fresh Mint Tea",
      "zh": "传统阿联酋特色早餐大拼盘与薄荷茶"
    },
    "badge": {
      "ko": "🇦🇪 두바이 · 올드 두바이 최고 정원 카페",
      "ja": "🇦🇪 ドバイ · 歴史地区の名門中庭カフェ",
      "en": "🇦🇪 Dubai · Old Town Garden Cafe",
      "zh": "🇦🇪 迪拜 · 老城最负盛名花园茶馆"
    },
    "signature": {
      "ko": "흰색 터키석 천막 정원에서 맛보는 수제 아랍 빵(카미르/체밥), 발루릿, 데이츠 시럽, 시원한 민트 티",
      "ja": "白い天幕ガーデンで味わう焼きたてアラブパン、甘いデーツシロップ、爽快なミントティー",
      "en": "Handmade khameer bread, sweet balaleet vermicelli, date syrup, and fragrant iced mint tea in a leafy courtyard",
      "zh": "在白蓝相间的中庭品尝现烤阿联酋传统松饼、椰枣糖浆与提神薄荷茶"
    },
    "seniorTip": {
      "ko": "푸른 나무와 하얀 천막 아래 그늘진 정원 평지 좌석. 자극적이지 않고 담백해 어르신 아침 식사로 환상적",
      "ja": "木陰の涼しいテラス平坦席。刺激が少なく優しい味付けでご両親の朝食に最適",
      "en": "Shaded garden seating on completely flat ground; gentle seasonings ideal for senior palates",
      "zh": "绿植环绕的遮阳庭院平路席位，菜品清淡温和不油腻，深受长辈好评"
    },
    "hours": {
      "ko": "매일 07:00~23:00",
      "ja": "毎日 07:00〜23:00",
      "en": "Daily 07:00–23:00",
      "zh": "每日 07:00~23:00"
    },
    "language": {
      "ko": "영어 능통 · 친절하고 따뜻한 아라비아 전통 환대",
      "ja": "英語堪能 · 心温まる伝統アラビアンホスピタリティ",
      "en": "Fluent English · Warm traditional Arabian hospitality",
      "zh": "流利英语服务 · 热情传统的阿拉伯待客之道"
    },
    "booking": {
      "ko": "워크인 선착순 (오전 10시 이전 방문 시 대기 없음)",
      "ja": "当日順次案内（午前10時前なら並ばず入店可能）",
      "en": "Walk-in (arrive before 10:00 AM for immediate seating)",
      "zh": "现场到店（上午10点前抵达通常无需排队）"
    }
  },
  "Al Fanar Restaurant & Café": {
    "displayName": {
      "ko": "알 파나르 레스토랑 & 카페 (Al Fanar)",
      "ja": "アル・ファナール（伝統エミレーツ料理）",
      "en": "Al Fanar Restaurant & Café",
      "zh": "阿尔法纳传统餐厅 (Al Fanar)"
    },
    "dishTitle": {
      "ko": "전통 양고기 마크부스 & 살루나 해산물 스튜",
      "ja": "伝統ラム肉のマクブース＆サルーナ魚介スープ",
      "en": "Traditional Lamb Machboos & Saloona Seafood Stew",
      "zh": "传统慢炖羊肉马克布斯手抓饭与海鲜炖汤"
    },
    "badge": {
      "ko": "🇦🇪 두바이 · 1960년대 옛 두바이 테마 식당",
      "ja": "🇦🇪 ドバイ · 1960年代の古き良きドバイ",
      "en": "🇦🇪 Dubai · Nostalgic 1960s Emirati Theme",
      "zh": "🇦🇪 迪拜 · 1960年代复古老迪拜风情"
    },
    "signature": {
      "ko": "카다멈과 사프란으로 지은 고슬고슬한 아랍 쌀밥 위에 푹 삶아 입에서 살살 녹는 부드러운 양고기",
      "ja": "サフランとカルダモン香るご飯の上に、じっくり煮込まれた極上ラム肉がたっぷり",
      "en": "Slow-braised tender lamb falling off the bone served over fragrant spiced basmati rice",
      "zh": "藏红花与豆蔻香米焖煮，搭配慢炖至入口即化的鲜嫩羊肉与传统番茄炖汁"
    },
    "seniorTip": {
      "ko": "1960년대 옛 두바이 마을을 재현한 턱 없는 1층 레스토랑. 고기가 아주 연해 치아가 약하신 부모님께 최고",
      "ja": "段差のない1階フロア。お肉がほろほろと極めて柔らかく噛みやすいためご両親に好評",
      "en": "Step-free ground floor access; meat is slow-cooked until meltingly soft, gentle for senior teeth",
      "zh": "全一楼平地无门槛，肉质慢炖软烂酥口，特别便于牙口较弱的年长者进食"
    },
    "hours": {
      "ko": "매일 12:00~23:00",
      "ja": "毎日 12:00〜23:00",
      "en": "Daily 12:00–23:00",
      "zh": "每日 12:00~23:00"
    },
    "language": {
      "ko": "영어 완벽 · 사진 메뉴판 구비",
      "ja": "英語堪能 · わかりやすい写真付きメニューあり",
      "en": "Fluent English · Clear illustrated picture menus",
      "zh": "熟练英语 · 提供全图解照片菜单"
    },
    "booking": {
      "ko": "공식 웹사이트 및 전화 예약 권장",
      "ja": "公式サイトまたは電話事前予約推奨",
      "en": "Official website or phone reservation recommended",
      "zh": "建议官方网站或电话提前订位"
    }
  },
  "Bu Qtair": {
    "displayName": {
      "ko": "부 크타이르 (Bu Qtair)",
      "ja": "ブ・クテール（老舗シーフード）",
      "en": "Bu Qtair (Seafood Landmark)",
      "zh": "布克泰尔传奇海鲜 (Bu Qtair)"
    },
    "dishTitle": {
      "ko": "당일 직송 하무르 생선 구이 & 매콤달콤 왕새우 튀김",
      "ja": "新鮮ハルール鮮魚フライ＆大エビのスパイシーソテー",
      "en": "Fresh Fried Hamour Fish & Jumbo Prawns",
      "zh": "当日现捕炸石斑鱼与香脆罗氏沼虾"
    },
    "badge": {
      "ko": "🇦🇪 두바이 · 40년 전통 어부의 전설적 해산물",
      "ja": "🇦🇪 ドバイ · 40年伝統の漁師名物シーフード",
      "en": "🇦🇪 Dubai · Legendary Fisherman Seafood Shack",
      "zh": "🇦🇪 迪拜 · 40年老字号地道海鲜"
    },
    "signature": {
      "ko": "매일 아침 어시장에서 들여온 신선한 흰살 생선 하무르와 왕새우를 아라비안 마살라로 튀겨낸 어부의 맛",
      "ja": "朝獲れの白身魚ハルールと大エビを自家製スパイスで香ばしく揚げた絶品料理",
      "en": "Catch of the day hamour fish and jumbo prawns marinated in coastal spices and flash-fried to perfection",
      "zh": "每日清晨直采自海鲜市场的石斑鱼和巨大明虾，外酥里嫩，肉质极为鲜美"
    },
    "seniorTip": {
      "ko": "현대식 실내 매장으로 이전하여 쾌적한 에어컨과 넓은 평지 테이블 완비, 가시를 발라내기 쉬운 담백한 생선",
      "ja": "冷房完備の快適な平坦フロア。骨が大きく取り除きやすい上質な白身魚で食べやすい",
      "en": "Air-conditioned indoor dining with flat flooring; fish is meaty with easy-to-remove large bones",
      "zh": "已迁至空调充沛的宽敞现代室内平步餐厅，大块鱼刺易剔除，食用十分方便"
    },
    "hours": {
      "ko": "매일 11:30~23:30 (금요일 13:00~)",
      "ja": "毎日 11:30〜23:30（金曜 13:00〜）",
      "en": "Daily 11:30–23:30 (Fridays from 13:00)",
      "zh": "每日 11:30~23:30（周五13:00开门）"
    },
    "language": {
      "ko": "영어 능통 · 생선 무게 단위 주문",
      "ja": "英語対応 · 量り売りオーダー",
      "en": "Fluent English · Weigh-and-order counter system",
      "zh": "流利英语 · 称重明码标价点单"
    },
    "booking": {
      "ko": "워크인 선착순 (저녁 18:30 이전 방문 추천)",
      "ja": "先着順（夕方18:30前の来店がスムーズ）",
      "en": "Walk-in only (arrive before 6:30 PM to avoid dinner queues)",
      "zh": "现场排队入座（建议傍晚18:30前抵达避开人流）"
    }
  },
  "Al Nafoorah": {
    "displayName": {
      "ko": "알 나푸라 (Al Nafoorah - Jumeirah)",
      "ja": "アル・ナフーラ（名門レバノン料理）",
      "en": "Al Nafoorah (Jumeirah)",
      "zh": "阿尔纳芙拉黎巴嫩盛宴 (Al Nafoorah)"
    },
    "dishTitle": {
      "ko": "오스만 궁전식 프리미엄 양갈비 구이 & 후무스",
      "ja": "宮殿仕立ての最高級ラムチョップ炭火焼＆フムス",
      "en": "Lebanese Mixed Grill & Velvety Hommus Platter",
      "zh": "黎巴嫩奥斯曼宫廷烤羊排与顺滑鹰嘴豆泥拼盘"
    },
    "badge": {
      "ko": "🇦🇪 두바이 · 주메이라 럭셔리 레바논 다이닝",
      "ja": "🇦🇪 ドバイ · 高級リゾート最高峰レバノン料理",
      "en": "🇦🇪 Dubai · Luxury Palatial Lebanese Dining",
      "zh": "🇦🇪 迪拜 · 卓美亚宫殿奢华中东盛宴"
    },
    "signature": {
      "ko": "참숯에 정성스레 구운 최고급 양갈비, 신선한 타불레 샐러드, 부드러운 병아리콩 후무스 플래터",
      "ja": "炭火で香ばしく焼き上げた極上ラムチョップ、新鮮タブレサラダ、滑らかなフムス",
      "en": "Tender charcoal-grilled lamb chops, freshly made parsley tabbouleh, and silky smooth hummus",
      "zh": "精选特级炭火慢烤羊排，佐以新鲜西芹塔布勒沙拉与秘制丝滑鹰嘴豆泥"
    },
    "seniorTip": {
      "ko": "호텔 정문에서 카트로 이동 가능하며 호텔급 최고 수준의 정중한 케어와 푹신한 소파 좌석",
      "ja": "ホテルエントランスからカート送迎可能。五つ星ホテルならではの丁寧なサポートと快適ソファ席",
      "en": "Buggy transfers available from hotel lobby, 5-star service with plush sofa seating",
      "zh": "酒店大堂可派电瓶车接送，五星级无微不至的长辈尊享礼遇与超宽软座"
    },
    "hours": {
      "ko": "매일 13:00~15:30, 18:30~23:00",
      "ja": "毎日 13:00〜15:30、18:30〜23:00",
      "en": "Daily 13:00–15:30, 18:30–23:00",
      "zh": "每日 13:00~15:30、18:30~23:00"
    },
    "language": {
      "ko": "영어 완벽 · VIP 의전급 서비스",
      "ja": "英語堪能 · VIP対応の上質なおもてなし",
      "en": "Fluent English · Concierge-grade hospitality",
      "zh": "流利英语 · 国宾级礼宾周到服务"
    },
    "booking": {
      "ko": "주메이라 공식 사이트 필수 예약",
      "ja": "ジュメイラ公式サイトにて事前予約必須",
      "en": "Advance booking required via Jumeirah official portal",
      "zh": "须在卓美亚酒店官网提前预订"
    }
  },
  "Armani/Amal": {
    "displayName": {
      "ko": "아르마니/아말 (Armani/Amal)",
      "ja": "アルマーニ / アマル（ブルジュ・ハリファ）",
      "en": "Armani/Amal (Burj Khalifa)",
      "zh": "阿玛尼/阿迈尔餐厅 (Armani/Amal)"
    },
    "dishTitle": {
      "ko": "분수 쇼 테라스 뷰 컨템포러리 다이닝 & 달 카레",
      "ja": "噴水ショーを一望するコンテンポラリーディナー",
      "en": "Contemporary Fine Dining with Fountain Terrace Views",
      "zh": "喷泉露台胜景当代精细料理与慢炖豆泥"
    },
    "badge": {
      "ko": "🇦🇪 두바이 · 버즈 칼리파 3층 미쉐린 테라스",
      "ja": "🇦🇪 ドバイ · ミシュラン選定テラスダイニング",
      "en": "🇦🇪 Dubai · Michelin Selected Fountain View",
      "zh": "🇦🇪 迪拜 · 米其林指南精选喷泉观景露台"
    },
    "signature": {
      "ko": "버즈 칼리파 3층 테라스에서 분수 쇼를 정면으로 바라보며 즐기는 미쉐린 셀렉티드 모던 다이닝 코스",
      "ja": "ブルジュ・ハリファ3階テラスから噴水ショーを見下ろすラグジュアリーディナーコース",
      "en": "Michelin-selected multi-course dinner perched on the 3rd-floor terrace overlooking the dancing fountains",
      "zh": "坐拥哈利法塔3层露台正对世界最大喷泉秀，坐享米其林指南精选手工盛宴"
    },
    "seniorTip": {
      "ko": "버즈 칼리파 내부 엘리베이터 직행, 호텔 발레파킹 및 휠체어 지원, 소음 없이 테라스에서 분수 쇼 조망",
      "ja": "ホテル直通エレベーター完備。混雑や人混みなく座ったままテラスで優雅に噴水ショーを鑑賞",
      "en": "Direct hotel elevator; avoids street crowds while seniors enjoy the fountain show from private terrace seating",
      "zh": "酒店内部直梯直达，避开地面拥挤人流，安坐专属露台沙发即可全景尽揽喷泉盛况"
    },
    "hours": {
      "ko": "매일 18:30~23:30 (일요일 휴무)",
      "ja": "毎日 18:30〜23:30（日曜定休）",
      "en": "Daily 18:30–23:30 (Closed Sundays)",
      "zh": "每日 18:30~23:30（周日公休）"
    },
    "language": {
      "ko": "영어 완벽 · 다국어 소믈리에 상주",
      "ja": "英語堪能 · 多言語ソムリエ常駐",
      "en": "Fluent English & multilingual sommeliers",
      "zh": "流利英语及多语种专业侍酒师"
    },
    "booking": {
      "ko": "최소 2~3주 전 아르마니 호텔 공식 예약",
      "ja": "最低2〜3週間前の公式サイト予約必須",
      "en": "Book 2–3 weeks in advance on Armani Hotel official portal",
      "zh": "建议提前2至3周在阿玛尼酒店官网预订"
    }
  },
  "Logma": {
    "displayName": {
      "ko": "로그마 (Logma - Dubai Mall)",
      "ja": "ログマ（ドバイ・モール店）",
      "en": "Logma (The Dubai Mall)",
      "zh": "洛格玛时尚茶歇 (Logma)"
    },
    "dishTitle": {
      "ko": "사프란 카락 티 & 루카이마트 대추야자 도넛",
      "ja": "サフラン・カラクティー＆揚げたてルカイマット",
      "en": "Saffron Karak Tea & Hot Crispy Lugaimat",
      "zh": "藏红花特色卡拉克奶茶与金黄椰枣炸面球"
    },
    "badge": {
      "ko": "🇦🇪 두바이 · 두바이 몰 분수 전망 모던 에미라티",
      "ja": "🇦🇪 ドバイ · ドバイ・モール内ファウンテン展望",
      "en": "🇦🇪 Dubai · Modern Emirati Cafe with Fountain View",
      "zh": "🇦🇪 迪拜 · 购物中心内现代阿拉伯风味茶餐厅"
    },
    "signature": {
      "ko": "진한 사프란 향의 에미라티 밀크티와 갓 튀겨 따뜻한 조청 시럽을 뿌린 전통 도넛 루카이마트",
      "ja": "濃厚なサフラン香るミルクティーと、デーツ蜜をたっぷり絡めた伝統スイーツ",
      "en": "Fragrant saffron-infused sweet milk tea paired with piping-hot Emirati honey-date dumplings",
      "zh": "香醇浓郁的藏红花奶茶，搭配裹满金黄椰枣糖浆的传统酥脆面点"
    },
    "seniorTip": {
      "ko": "두바이 몰 패션 애비뉴 3층 분수 전망 테라스. 쇼핑 중 어르신 당 충전과 다리 쉼터로 제격",
      "ja": "モール3階の噴水ビューテラス。お買い物の途中でほっと一息つける絶好の休憩スポット",
      "en": "Fashion Avenue 3rd-floor terrace; perfect rest stop with comfortable chairs during mall walks",
      "zh": "位于时尚大道3层露台正对喷泉，是购物步行间隙让长辈歇脚品茶的绝佳去处"
    },
    "hours": {
      "ko": "매일 10:00~00:00",
      "ja": "毎日 10:00〜00:00",
      "en": "Daily 10:00–00:00 (Midnight)",
      "zh": "每日 10:00~午夜00:00"
    },
    "language": {
      "ko": "영어 완벽 · 태블릿 사진 주문",
      "ja": "英語対応 · タブレット写真注文",
      "en": "Fluent English · Tablet visual ordering",
      "zh": "流利英语 · 支持平板电脑图文点餐"
    },
    "booking": {
      "ko": "워크인 가능",
      "ja": "予約不要（ウォークイン可能）",
      "en": "Walk-in friendly",
      "zh": "支持随时直接到店"
    }
  },
  "Shabestan": {
    "displayName": {
      "ko": "샤베스탄 (Shabestan - Deira Creek)",
      "ja": "シャベスタン（老舗ペルシャ料理）",
      "en": "Shabestan (Radisson Blu)",
      "zh": "莎贝斯坦正宗波斯料理 (Shabestan)"
    },
    "dishTitle": {
      "ko": "두바이 크릭 야경 정통 사프란 양고기 쿠비데 케밥",
      "ja": "伝統サフラン・ラム肉コビデケバブ炭火焼",
      "en": "Traditional Saffron Lamb Koobideh Kebab",
      "zh": "迪拜湾夜景正宗藏红花烤羊肉库比德肉串"
    },
    "badge": {
      "ko": "🇦🇪 두바이 · 40년 전통 크릭 뷰 페르시안 명가",
      "ja": "🇦🇪 ドバイ · クリーク夜景を望む40年伝統の名店",
      "en": "🇦🇪 Dubai · 40-Year Creekfront Persian Classic",
      "zh": "🇦🇪 迪拜 · 俯瞰迪拜湾夜景40年正宗老店"
    },
    "signature": {
      "ko": "40년 전통의 두바이 최고 페르시안 레스토랑. 숯불에 구운 육즙 가득한 다진 양고기와 사프란 버터 밥",
      "ja": "炭火でジューシーに焼き上げた秘伝のラム挽肉ケバブと芳醇なサフランバターライス",
      "en": "Juicy minced lamb kebabs grilled over open coals served with saffron-infused buttered basmati rice",
      "zh": "40年沉淀的波斯料理招牌。炭火现烤鲜嫩多汁的羊肉肉串配以藏红花黄油长粒香米饭"
    },
    "seniorTip": {
      "ko": "래디슨 블루 호텔 엘리베이터 이동, 크릭 야경이 파노라마로 펼쳐지는 넓은 소파 좌석과 전통 악기 연주",
      "ja": "ホテル専用エレベーター利用、クリーク夜景が広がる広々ソファ席と伝統生演奏",
      "en": "Hotel elevator access; panoramic creek views from comfortable booth seating with soothing live music",
      "zh": "酒店垂直电梯平稳直达，全景落地窗俯瞰迪拜湾浪漫夜景，宽大沙发座配有温和现场民乐"
    },
    "hours": {
      "ko": "매일 12:30~23:00",
      "ja": "毎日 12:30〜23:00",
      "en": "Daily 12:30–23:00",
      "zh": "每日 12:30~23:00"
    },
    "language": {
      "ko": "영어 완벽 · 친절한 전통 서비스",
      "ja": "英語堪能 · 心配りの行き届いた接客",
      "en": "Fluent English & courteous hospitable service",
      "zh": "流利英语 · 体贴热情的五星级传统服务"
    },
    "booking": {
      "ko": "호텔 레스토랑 사전 예약 권장",
      "ja": "ホテルレストラン事前予約推奨",
      "en": "Advance table reservation recommended",
      "zh": "建议提前预订靠窗观景席位"
    }
  }
};
  const ARABIC_PHRASES_GROUP = {
  "langGroup": "ar",
  "langName": "🇦🇪 아랍어 (Arabic)",
  "regionDesc": "아랍에미리트 (두바이, 아부다비) 및 중동 경유지",
  "locale": "ar-AE",
  "phrases": [
    {
      "category": "dining",
      "original": "بدون ملح من فضلك",
      "ko_pron": "비둔 밀흐 민 파들락",
      "ko_meaning": "소금 적게(빼고) 넣어주세요 (어르신 저염식 필수)",
      "en_meaning": "Less / no salt please (low-sodium diet)",
      "ja_meaning": "塩分控えめ（塩抜き）でお願いします",
      "zh_meaning": "请少放盐（免盐清淡饮食）",
      "original_ja": "بدون ملح من فضلك",
      "original_en": "Bedoun maleh min fadlak",
      "original_zh": "بدون ملح من فضلك",
      "original_ko": "بدون ملح من فضلك"
    },
    {
      "category": "dining",
      "original": "ماء بدون غاز من فضلك",
      "ko_pron": "마- 비둔 가-즈 민 파들락",
      "ko_meaning": "탄산 없는 미지근한 일반 생수 주세요",
      "en_meaning": "Still water (no gas), please",
      "ja_meaning": "炭酸なしの常温水をお願いします",
      "zh_meaning": "请给我不带气泡的常温矿泉水",
      "original_ja": "ماء بدون غاز من فضلك",
      "original_en": "Maa bedoun ghaz min fadlak",
      "original_zh": "ماء بدون غاز من فضلك",
      "original_ko": "ماء بدون غاز من فضلك"
    },
    {
      "category": "senior",
      "original": "أين أقرب مصعد من فضلك؟",
      "ko_pron": "아이나 아끄랍 미스아드 민 파들락?",
      "ko_meaning": "가장 가까운 엘리베이터가 어디인가요?",
      "en_meaning": "Where is the nearest elevator, please?",
      "ja_meaning": "最も近いエレベーターはどこですか？",
      "zh_meaning": "请问最近的电梯在哪里？",
      "original_ja": "أين أقرب مصعد من فضلك؟",
      "original_en": "Ayna aqrab mis'ad min fadlak?",
      "original_zh": "أين أقرب مصعد من فضلك؟",
      "original_ko": "أين أقرب مصعد من فضلك؟"
    },
    {
      "category": "senior",
      "original": "هل يمكنك تخفيف التكييف قليلاً؟",
      "ko_pron": "할 윰키누카 타크피프 앗타키이프 갈릴란?",
      "ko_meaning": "실내가 추워서 그런데 에어컨을 줄여주시겠어요?",
      "en_meaning": "Could you please turn down the AC / make it warmer?",
      "ja_meaning": "冷房の冷えを少し弱めていただけますか？",
      "zh_meaning": "空调冷气有点强，能调小一点吗？",
      "original_ja": "هل يمكنك تخفيف التكييف قليلاً؟",
      "original_en": "Hal yumkinuka takhfeef al-takeef qalilan?",
      "original_zh": "هل يمكنك تخفيف التكييف قليلاً؟",
      "original_ko": "هل يمكنك تخفيف التكييف قليلاً؟"
    },
    {
      "category": "basic",
      "original": "أين دورة المياه؟",
      "ko_pron": "아이나 다우라투 알미야-?",
      "ko_meaning": "화장실이 어디에 있나요?",
      "en_meaning": "Where is the restroom / toilet?",
      "ja_meaning": "お手洗いはどこですか？",
      "zh_meaning": "请问洗手间在哪里？",
      "original_ja": "أين دورة المياه؟",
      "original_en": "Ayna dawrat al-miyah?",
      "original_zh": "أين دورة المياه؟",
      "original_ko": "أين دورة المياه؟"
    },
    {
      "category": "dining",
      "original": "الفاتورة من فضلك",
      "ko_pron": "알파투-라 민 파들락",
      "ko_meaning": "계산서(영수증) 부탁합니다",
      "en_meaning": "The bill / check, please",
      "ja_meaning": "お会計をお願いします",
      "zh_meaning": "请买单 / 结账",
      "original_ja": "الفاتورة من فضلك",
      "original_en": "Al-fatura min fadlak",
      "original_zh": "الفاتورة من فضلك",
      "original_ko": "الفاتورة من فضلك"
    },
    {
      "category": "emergency",
      "original": "نحتاج إلى مساعدة طبية عاجلة!",
      "ko_pron": "나흐타-주 일라 무사-아다 티비야 아-질라!",
      "ko_meaning": "의사의 도움이 급히 필요합니다 (응급 상황)",
      "en_meaning": "We need urgent medical assistance!",
      "ja_meaning": "緊急の医療支援が必要です！",
      "zh_meaning": "我们需要紧急医疗救助！",
      "original_ja": "نحتاج إلى مساعدة طبية عاجلة!",
      "original_en": "Nahtaju ila musa'ada tibbiya 'ajila!",
      "original_zh": "نحتاج إلى مساعدة طبية عاجلة!",
      "original_ko": "نحتاج إلى مساعدة طبية عاجلة!"
    },
    {
      "category": "basic",
      "original": "السلام عليكم / مرحباً",
      "ko_pron": "아살라무 알라이쿰 / 마르하반",
      "ko_meaning": "안녕하세요 (아랍 전통 평화의 인사)",
      "en_meaning": "Hello / Peace be upon you",
      "ja_meaning": "こんにちは（平和があなたにありますように）",
      "zh_meaning": "您好（和平与你同在）",
      "original_ja": "السلام عليكم / مرحباً",
      "original_en": "As-salamu alaykum / Marhaban",
      "original_zh": "السلام عليكم / مرحباً",
      "original_ko": "السلام عليكم / مرحباً"
    },
    {
      "category": "basic",
      "original": "شكراً جزيلاً",
      "ko_pron": "슈크란 자질-란",
      "ko_meaning": "대단히 감사합니다",
      "en_meaning": "Thank you very much",
      "ja_meaning": "どうもありがとうございます",
      "zh_meaning": "非常感谢",
      "original_ja": "شكراً جزيلاً",
      "original_en": "Shukran jazilan",
      "original_zh": "شكراً جزيلاً",
      "original_ko": "شكراً جزيلاً"
    },
    {
      "category": "basic",
      "original": "سيارة أجرة إلى المطار من فضلك",
      "ko_pron": "사야-라 우즈라 일랄 마타-르 민 파들락",
      "ko_meaning": "공항으로 가는 택시를 불러주시겠어요?",
      "en_meaning": "A taxi to the airport, please",
      "ja_meaning": "空港までのタクシーをお願いします",
      "zh_meaning": "请帮叫一辆去机场的出租车",
      "original_ja": "سيارة أجرة إلى المطار من فضلك",
      "original_en": "Sayyarat ujra ilal matar min fadlak",
      "original_zh": "سيارة أجرة إلى المطار من فضلك",
      "original_ko": "سيارة أجرة إلى المطار من فضلك"
    }
  ]
};
  const DUBAI_STOPOVER_PLAN = {
  "title": "🇦🇪 두바이 에미레이트 경유 럭셔리 슬로우 스톱오버 (3~5일 핵심)",
  "score": "95점 (사막의 기적 & 무장애 힐링)",
  "season": "11~3월 최고 성수기 · 24도 온화한 쾌적 기후",
  "budget": "890만 원",
  "festivals": "두바이 쇼핑 페스티벌 (DSF) & 분수 쇼 매일 밤 진행",
  "festSub": "세계 최고층 버즈칼리파와 100% 무장애 배리어프리 실내 쇼핑몰",
  "cities": [
    "다운타운 두바이",
    "올드 두바이 크릭",
    "팜 주메이라",
    "자빌/미래지구",
    "DXB 공항/귀국"
  ],
  "days": [
    {
      "city": "다운타운 두바이",
      "isTransfer": true,
      "theme": "인천 출발, 두바이 DXB 도착 및 다운타운 체크인",
      "morning": "인천 국제공항 출발 후 두바이 국제공항(DXB) 도착 및 스마트 패스트트랙 입국",
      "rest": "다운타운 럭셔리 호텔 체크인 후 장거리 비행 피로 회복 온수 스파 휴식",
      "evening": "두바이 몰 시원한 실내 산책 및 두바이 분수 쇼 카페 테라스 커피 타임",
      "walk": "낮음 (완전 평지)",
      "transport": "공항 전용 픽업 렉서스 세단 또는 전용 밴",
      "meal": "Arabian Tea House - 부드러운 에미라티 브런치 & 민트 티",
      "events": [
        "두바이 입성",
        "두바이 분수 쇼"
      ]
    },
    {
      "city": "다운타운 두바이",
      "isTransfer": false,
      "theme": "버즈 칼리파 124·125층 전망대 & 미식의 향연",
      "morning": "10:30 버즈 칼리파 At the Top 더블데크 고속 엘리베이터로 124층 직행 (360도 파노라마)",
      "rest": "13:00 두바이 몰 에어컨 실내 이동 후 Armani/Amal에서 시에스타 휴식",
      "evening": "17:00 두바이 아쿠아리움 대형 수조 터널 관람 및 음악 분수 야경",
      "walk": "낮음 (엘리베이터 완비)",
      "transport": "두바이 몰 내부 무료 버기카(전동 카트) 이용",
      "meal": "Armani/Amal - 분수 쇼 조망 컨템포러리 다이닝 코스",
      "events": [
        "버즈 칼리파",
        "두바이 몰 분수 쇼"
      ]
    },
    {
      "city": "올드 두바이 크릭",
      "isTransfer": false,
      "theme": "올드 두바이 크릭 & 알 파히디 역사 문화 지구",
      "morning": "10:00 알 파히디 19세기 전통 바람탑 골목 산책 및 전통 향수/향신료 수크",
      "rest": "12:30 Al Fanar Restaurant에서 1960년대 옛 두바이 정취 느끼며 점심 휴식",
      "evening": "16:30 전통 목선 아브라(Abra) 탑승하여 두바이 크릭 건너기 & 알 시프 강변 야경",
      "walk": "보통 (평지 보행)",
      "transport": "전통 아브라(1디르함) 및 우버 블랙",
      "meal": "Al Fanar Restaurant - 부드러운 양고기 마크부스 & 해산물 스튜",
      "events": [
        "알 파히디 역사 지구",
        "아브라 크릭 투어"
      ]
    },
    {
      "city": "자빌/미래지구",
      "isTransfer": false,
      "theme": "미래의 박물관 & 황금빛 두바이 프레임",
      "morning": "10:30 미래의 박물관 (기둥 없는 7층 도넛형 미래 건축과 무장애 배리어프리 관람)",
      "rest": "13:30 Logma 카페에서 사프란 카락 티와 따뜻한 루카이마트 도넛으로 당 충전",
      "evening": "16:30 자빌 파크 두바이 프레임에서 올드 두바이와 뉴 두바이 파노라마 조망",
      "walk": "낮음 (100% 무장애 설계)",
      "transport": "우버 XL 전용 차량",
      "meal": "Bu Qtair - 당일 직송 하무르 생선 구이 & 왕새우 튀김",
      "events": [
        "미래의 박물관",
        "두바이 프레임"
      ]
    },
    {
      "city": "팜 주메이라",
      "isTransfer": false,
      "theme": "더 뷰 앳 더 팜 & 주메이라 비치 휴식",
      "morning": "10:00 더 뷰 앳 더 팜 52층 전망대에서 야자수 인공섬 팜 주메이라 360도 감상",
      "rest": "13:00 주메이라 알 카스르 리조트 정원 산책 및 프라이빗 라운지 휴식",
      "evening": "17:30 팜 주메이라 모노레일 탑승 및 아틀란티스 더 로열 해변 석양 감상",
      "walk": "낮음 (모노레일/엘리베이터 완비)",
      "transport": "팜 모노레일 및 우버 블랙",
      "meal": "Al Nafoorah - 오스만 궁전식 프리미엄 양갈비 구이 & 후무스",
      "events": [
        "더 뷰 앳 더 팜",
        "팜 주메이라 석양"
      ]
    },
    {
      "city": "DXB 공항/귀국",
      "isTransfer": true,
      "theme": "두바이 국제공항 면세점 & 안락한 귀국 비행",
      "morning": "호텔 체크아웃 후 전용 차량으로 DXB 공항 에미레이트 터미널 3 이동",
      "rest": "공항 VIP 라운지에서 안락한 소파와 온수 샤워 후 탑승 대기",
      "evening": "인천 국제공항 직항편 탑승 (장거리 비행 숙면)",
      "walk": "낮음",
      "transport": "호텔 리무진 샌딩",
      "meal": "에미레이트 퍼스트/비즈니스 라운지 뷔페",
      "events": [
        "인천 귀국"
      ]
    },
    {
      "city": "미라클 가든/사막",
      "isTransfer": false,
      "theme": "1억 5천만 송이 생화 미라클 가든 & 사막 리조트 티타임",
      "morning": "10:00 두바이 미라클 가든 완만한 꽃길 산책 (버기카 투어 지원)",
      "rest": "13:00 밥 알 샴스 사막 리조트 라운지에서 여유로운 오아시스 휴식",
      "evening": "17:00 붉은 모래사막 너머로 지는 황금빛 일몰 감상 및 전통 바비큐",
      "walk": "낮음 (버기카 지원)",
      "transport": "사막 전용 4WD VIP 차량",
      "meal": "Al Hadheerah - 아라비안 나이트 전통 그릴 바비큐",
      "events": [
        "미라클 가든",
        "사막 선셋"
      ]
    },
    {
      "city": "DXB 공항/귀국",
      "isTransfer": true,
      "theme": "두바이 국제공항 면세점 & 안락한 귀국 비행",
      "morning": "호텔 체크아웃 후 전용 차량으로 DXB 공항 에미레이트 터미널 3 이동",
      "rest": "공항 VIP 라운지에서 안락한 소파와 온수 샤워 후 탑승 대기",
      "evening": "인천 국제공항 직항편 탑승 (장거리 비행 숙면)",
      "walk": "낮음",
      "transport": "호텔 리무진 샌딩",
      "meal": "에미레이트 퍼스트/비즈니스 라운지 뷔페",
      "events": [
        "인천 귀국"
      ]
    },
    {
      "city": "미라클 가든/사막",
      "isTransfer": false,
      "theme": "1억 5천만 송이 생화 미라클 가든 & 사막 리조트 티타임",
      "morning": "10:00 두바이 미라클 가든 완만한 꽃길 산책 (버기카 투어 지원)",
      "rest": "13:00 밥 알 샴스 사막 리조트 라운지에서 여유로운 오아시스 휴식",
      "evening": "17:00 붉은 모래사막 너머로 지는 황금빛 일몰 감상 및 전통 바비큐",
      "walk": "낮음 (버기카 지원)",
      "transport": "사막 전용 4WD VIP 차량",
      "meal": "Al Hadheerah - 아라비안 나이트 전통 그릴 바비큐",
      "events": [
        "미라클 가든",
        "사막 선셋"
      ]
    },
    {
      "city": "DXB 공항/귀국",
      "isTransfer": true,
      "theme": "두바이 국제공항 면세점 & 안락한 귀국 비행",
      "morning": "호텔 체크아웃 후 전용 차량으로 DXB 공항 에미레이트 터미널 3 이동",
      "rest": "공항 VIP 라운지에서 안락한 소파와 온수 샤워 후 탑승 대기",
      "evening": "인천 국제공항 직항편 탑승 (장거리 비행 숙면)",
      "walk": "낮음",
      "transport": "호텔 리무진 샌딩",
      "meal": "에미레이트 퍼스트/비즈니스 라운지 뷔페",
      "events": [
        "인천 귀국"
      ]
    },
    {
      "city": "미라클 가든/사막",
      "isTransfer": false,
      "theme": "1억 5천만 송이 생화 미라클 가든 & 사막 리조트 티타임",
      "morning": "10:00 두바이 미라클 가든 완만한 꽃길 산책 (버기카 투어 지원)",
      "rest": "13:00 밥 알 샴스 사막 리조트 라운지에서 여유로운 오아시스 휴식",
      "evening": "17:00 붉은 모래사막 너머로 지는 황금빛 일몰 감상 및 전통 바비큐",
      "walk": "낮음 (버기카 지원)",
      "transport": "사막 전용 4WD VIP 차량",
      "meal": "Al Hadheerah - 아라비안 나이트 전통 그릴 바비큐",
      "events": [
        "미라클 가든",
        "사막 선셋"
      ]
    },
    {
      "city": "DXB 공항/귀국",
      "isTransfer": true,
      "theme": "두바이 국제공항 면세점 & 안락한 귀국 비행",
      "morning": "호텔 체크아웃 후 전용 차량으로 DXB 공항 에미레이트 터미널 3 이동",
      "rest": "공항 VIP 라운지에서 안락한 소파와 온수 샤워 후 탑승 대기",
      "evening": "인천 국제공항 직항편 탑승 (장거리 비행 숙면)",
      "walk": "낮음",
      "transport": "호텔 리무진 샌딩",
      "meal": "에미레이트 퍼스트/비즈니스 라운지 뷔페",
      "events": [
        "인천 귀국"
      ]
    },
    {
      "city": "미라클 가든/사막",
      "isTransfer": false,
      "theme": "1억 5천만 송이 생화 미라클 가든 & 사막 리조트 티타임",
      "morning": "10:00 두바이 미라클 가든 완만한 꽃길 산책 (버기카 투어 지원)",
      "rest": "13:00 밥 알 샴스 사막 리조트 라운지에서 여유로운 오아시스 휴식",
      "evening": "17:00 붉은 모래사막 너머로 지는 황금빛 일몰 감상 및 전통 바비큐",
      "walk": "낮음 (버기카 지원)",
      "transport": "사막 전용 4WD VIP 차량",
      "meal": "Al Hadheerah - 아라비안 나이트 전통 그릴 바비큐",
      "events": [
        "미라클 가든",
        "사막 선셋"
      ]
    },
    {
      "city": "DXB 공항/귀국",
      "isTransfer": true,
      "theme": "두바이 국제공항 면세점 & 안락한 귀국 비행",
      "morning": "호텔 체크아웃 후 전용 차량으로 DXB 공항 에미레이트 터미널 3 이동",
      "rest": "공항 VIP 라운지에서 안락한 소파와 온수 샤워 후 탑승 대기",
      "evening": "인천 국제공항 직항편 탑승 (장거리 비행 숙면)",
      "walk": "낮음",
      "transport": "호텔 리무진 샌딩",
      "meal": "에미레이트 퍼스트/비즈니스 라운지 뷔페",
      "events": [
        "인천 귀국"
      ]
    },
    {
      "city": "미라클 가든/사막",
      "isTransfer": false,
      "theme": "1억 5천만 송이 생화 미라클 가든 & 사막 리조트 티타임",
      "morning": "10:00 두바이 미라클 가든 완만한 꽃길 산책 (버기카 투어 지원)",
      "rest": "13:00 밥 알 샴스 사막 리조트 라운지에서 여유로운 오아시스 휴식",
      "evening": "17:00 붉은 모래사막 너머로 지는 황금빛 일몰 감상 및 전통 바비큐",
      "walk": "낮음 (버기카 지원)",
      "transport": "사막 전용 4WD VIP 차량",
      "meal": "Al Hadheerah - 아라비안 나이트 전통 그릴 바비큐",
      "events": [
        "미라클 가든",
        "사막 선셋"
      ]
    },
    {
      "city": "DXB 공항/귀국",
      "isTransfer": true,
      "theme": "두바이 국제공항 면세점 & 안락한 귀국 비행",
      "morning": "호텔 체크아웃 후 전용 차량으로 DXB 공항 에미레이트 터미널 3 이동",
      "rest": "공항 VIP 라운지에서 안락한 소파와 온수 샤워 후 탑승 대기",
      "evening": "인천 국제공항 직항편 탑승 (장거리 비행 숙면)",
      "walk": "낮음",
      "transport": "호텔 리무진 샌딩",
      "meal": "에미레이트 퍼스트/비즈니스 라운지 뷔페",
      "events": [
        "인천 귀국"
      ]
    },
    {
      "city": "미라클 가든/사막",
      "isTransfer": false,
      "theme": "1억 5천만 송이 생화 미라클 가든 & 사막 리조트 티타임",
      "morning": "10:00 두바이 미라클 가든 완만한 꽃길 산책 (버기카 투어 지원)",
      "rest": "13:00 밥 알 샴스 사막 리조트 라운지에서 여유로운 오아시스 휴식",
      "evening": "17:00 붉은 모래사막 너머로 지는 황금빛 일몰 감상 및 전통 바비큐",
      "walk": "낮음 (버기카 지원)",
      "transport": "사막 전용 4WD VIP 차량",
      "meal": "Al Hadheerah - 아라비안 나이트 전통 그릴 바비큐",
      "events": [
        "미라클 가든",
        "사막 선셋"
      ]
    },
    {
      "city": "DXB 공항/귀국",
      "isTransfer": true,
      "theme": "두바이 국제공항 면세점 & 안락한 귀국 비행",
      "morning": "호텔 체크아웃 후 전용 차량으로 DXB 공항 에미레이트 터미널 3 이동",
      "rest": "공항 VIP 라운지에서 안락한 소파와 온수 샤워 후 탑승 대기",
      "evening": "인천 국제공항 직항편 탑승 (장거리 비행 숙면)",
      "walk": "낮음",
      "transport": "호텔 리무진 샌딩",
      "meal": "에미레이트 퍼스트/비즈니스 라운지 뷔페",
      "events": [
        "인천 귀국"
      ]
    },
    {
      "city": "미라클 가든/사막",
      "isTransfer": false,
      "theme": "1억 5천만 송이 생화 미라클 가든 & 사막 리조트 티타임",
      "morning": "10:00 두바이 미라클 가든 완만한 꽃길 산책 (버기카 투어 지원)",
      "rest": "13:00 밥 알 샴스 사막 리조트 라운지에서 여유로운 오아시스 휴식",
      "evening": "17:00 붉은 모래사막 너머로 지는 황금빛 일몰 감상 및 전통 바비큐",
      "walk": "낮음 (버기카 지원)",
      "transport": "사막 전용 4WD VIP 차량",
      "meal": "Al Hadheerah - 아라비안 나이트 전통 그릴 바비큐",
      "events": [
        "미라클 가든",
        "사막 선셋"
      ]
    },
    {
      "city": "DXB 공항/귀국",
      "isTransfer": true,
      "theme": "두바이 국제공항 면세점 & 안락한 귀국 비행",
      "morning": "호텔 체크아웃 후 전용 차량으로 DXB 공항 에미레이트 터미널 3 이동",
      "rest": "공항 VIP 라운지에서 안락한 소파와 온수 샤워 후 탑승 대기",
      "evening": "인천 국제공항 직항편 탑승 (장거리 비행 숙면)",
      "walk": "낮음",
      "transport": "호텔 리무진 샌딩",
      "meal": "에미레이트 퍼스트/비즈니스 라운지 뷔페",
      "events": [
        "인천 귀국"
      ]
    },
    {
      "city": "미라클 가든/사막",
      "isTransfer": false,
      "theme": "1억 5천만 송이 생화 미라클 가든 & 사막 리조트 티타임",
      "morning": "10:00 두바이 미라클 가든 완만한 꽃길 산책 (버기카 투어 지원)",
      "rest": "13:00 밥 알 샴스 사막 리조트 라운지에서 여유로운 오아시스 휴식",
      "evening": "17:00 붉은 모래사막 너머로 지는 황금빛 일몰 감상 및 전통 바비큐",
      "walk": "낮음 (버기카 지원)",
      "transport": "사막 전용 4WD VIP 차량",
      "meal": "Al Hadheerah - 아라비안 나이트 전통 그릴 바비큐",
      "events": [
        "미라클 가든",
        "사막 선셋"
      ]
    },
    {
      "city": "DXB 공항/귀국",
      "isTransfer": true,
      "theme": "두바이 국제공항 면세점 & 안락한 귀국 비행",
      "morning": "호텔 체크아웃 후 전용 차량으로 DXB 공항 에미레이트 터미널 3 이동",
      "rest": "공항 VIP 라운지에서 안락한 소파와 온수 샤워 후 탑승 대기",
      "evening": "인천 국제공항 직항편 탑승 (장거리 비행 숙면)",
      "walk": "낮음",
      "transport": "호텔 리무진 샌딩",
      "meal": "에미레이트 퍼스트/비즈니스 라운지 뷔페",
      "events": [
        "인천 귀국"
      ]
    },
    {
      "city": "미라클 가든/사막",
      "isTransfer": false,
      "theme": "1억 5천만 송이 생화 미라클 가든 & 사막 리조트 티타임",
      "morning": "10:00 두바이 미라클 가든 완만한 꽃길 산책 (버기카 투어 지원)",
      "rest": "13:00 밥 알 샴스 사막 리조트 라운지에서 여유로운 오아시스 휴식",
      "evening": "17:00 붉은 모래사막 너머로 지는 황금빛 일몰 감상 및 전통 바비큐",
      "walk": "낮음 (버기카 지원)",
      "transport": "사막 전용 4WD VIP 차량",
      "meal": "Al Hadheerah - 아라비안 나이트 전통 그릴 바비큐",
      "events": [
        "미라클 가든",
        "사막 선셋"
      ]
    },
    {
      "city": "DXB 공항/귀국",
      "isTransfer": true,
      "theme": "두바이 국제공항 면세점 & 안락한 귀국 비행",
      "morning": "호텔 체크아웃 후 전용 차량으로 DXB 공항 에미레이트 터미널 3 이동",
      "rest": "공항 VIP 라운지에서 안락한 소파와 온수 샤워 후 탑승 대기",
      "evening": "인천 국제공항 직항편 탑승 (장거리 비행 숙면)",
      "walk": "낮음",
      "transport": "호텔 리무진 샌딩",
      "meal": "에미레이트 퍼스트/비즈니스 라운지 뷔페",
      "events": [
        "인천 귀국"
      ]
    },
    {
      "city": "미라클 가든/사막",
      "isTransfer": false,
      "theme": "1억 5천만 송이 생화 미라클 가든 & 사막 리조트 티타임",
      "morning": "10:00 두바이 미라클 가든 완만한 꽃길 산책 (버기카 투어 지원)",
      "rest": "13:00 밥 알 샴스 사막 리조트 라운지에서 여유로운 오아시스 휴식",
      "evening": "17:00 붉은 모래사막 너머로 지는 황금빛 일몰 감상 및 전통 바비큐",
      "walk": "낮음 (버기카 지원)",
      "transport": "사막 전용 4WD VIP 차량",
      "meal": "Al Hadheerah - 아라비안 나이트 전통 그릴 바비큐",
      "events": [
        "미라클 가든",
        "사막 선셋"
      ]
    },
    {
      "city": "DXB 공항/귀국",
      "isTransfer": true,
      "theme": "두바이 국제공항 면세점 & 안락한 귀국 비행",
      "morning": "호텔 체크아웃 후 전용 차량으로 DXB 공항 에미레이트 터미널 3 이동",
      "rest": "공항 VIP 라운지에서 안락한 소파와 온수 샤워 후 탑승 대기",
      "evening": "인천 국제공항 직항편 탑승 (장거리 비행 숙면)",
      "walk": "낮음",
      "transport": "호텔 리무진 샌딩",
      "meal": "에미레이트 퍼스트/비즈니스 라운지 뷔페",
      "events": [
        "인천 귀국"
      ]
    },
    {
      "city": "미라클 가든/사막",
      "isTransfer": false,
      "theme": "1억 5천만 송이 생화 미라클 가든 & 사막 리조트 티타임",
      "morning": "10:00 두바이 미라클 가든 완만한 꽃길 산책 (버기카 투어 지원)",
      "rest": "13:00 밥 알 샴스 사막 리조트 라운지에서 여유로운 오아시스 휴식",
      "evening": "17:00 붉은 모래사막 너머로 지는 황금빛 일몰 감상 및 전통 바비큐",
      "walk": "낮음 (버기카 지원)",
      "transport": "사막 전용 4WD VIP 차량",
      "meal": "Al Hadheerah - 아라비안 나이트 전통 그릴 바비큐",
      "events": [
        "미라클 가든",
        "사막 선셋"
      ]
    },
    {
      "city": "DXB 공항/귀국",
      "isTransfer": true,
      "theme": "두바이 국제공항 면세점 & 안락한 귀국 비행",
      "morning": "호텔 체크아웃 후 전용 차량으로 DXB 공항 에미레이트 터미널 3 이동",
      "rest": "공항 VIP 라운지에서 안락한 소파와 온수 샤워 후 탑승 대기",
      "evening": "인천 국제공항 직항편 탑승 (장거리 비행 숙면)",
      "walk": "낮음",
      "transport": "호텔 리무진 샌딩",
      "meal": "에미레이트 퍼스트/비즈니스 라운지 뷔페",
      "events": [
        "인천 귀국"
      ]
    },
    {
      "city": "미라클 가든/사막",
      "isTransfer": false,
      "theme": "1억 5천만 송이 생화 미라클 가든 & 사막 리조트 티타임",
      "morning": "10:00 두바이 미라클 가든 완만한 꽃길 산책 (버기카 투어 지원)",
      "rest": "13:00 밥 알 샴스 사막 리조트 라운지에서 여유로운 오아시스 휴식",
      "evening": "17:00 붉은 모래사막 너머로 지는 황금빛 일몰 감상 및 전통 바비큐",
      "walk": "낮음 (버기카 지원)",
      "transport": "사막 전용 4WD VIP 차량",
      "meal": "Al Hadheerah - 아라비안 나이트 전통 그릴 바비큐",
      "events": [
        "미라클 가든",
        "사막 선셋"
      ]
    },
    {
      "city": "DXB 공항/귀국",
      "isTransfer": true,
      "theme": "두바이 국제공항 면세점 & 안락한 귀국 비행",
      "morning": "호텔 체크아웃 후 전용 차량으로 DXB 공항 에미레이트 터미널 3 이동",
      "rest": "공항 VIP 라운지에서 안락한 소파와 온수 샤워 후 탑승 대기",
      "evening": "인천 국제공항 직항편 탑승 (장거리 비행 숙면)",
      "walk": "낮음",
      "transport": "호텔 리무진 샌딩",
      "meal": "에미레이트 퍼스트/비즈니스 라운지 뷔페",
      "events": [
        "인천 귀국"
      ]
    }
  ]
};

  const LANDMARK_BASE_PRICES = {
  "타워브리지 & 런던탑 (Tower Bridge)": 24000,
  "영국 박물관 (대영박물관, British Museum)": 0,
  "버킹엄 궁전 & 세인트 제임스 공원 (Buckingham Palace)": 0,
  "빅벤 & 웨스트민스터 사원 (Big Ben & Westminster Abbey)": 51000,
  "에펠탑 & 샹드마르스 공원 (Eiffel Tower)": 38000,
  "루브르 박물관 (Musée du Louvre)": 33000,
  "오르세 미술관 (Musée d'Orsay)": 24000,
  "콜로세움 & 포로 로마노 (Colosseo & Foro Romano)": 27000,
  "바티칸 미술관 & 성 베드로 대성당 (Vatican Museums)": 30000,
  "피렌체 두오모 대성당 (Duomo di Firenze)": 45000,
  "사그라다 파밀리아 (Sagrada Família)": 39000,
  "알함브라 궁전 (Alhambra & Generalife)": 28000,
  "동 루이스 1세 다리 & 도루강": 0,
  "제로니무스 수도원 & 벨렝탑": 18000,
  "비엔나 쇤브룬 궁전 & 정원 (Schönbrunn)": 36000,
  "스위스 융프라우요흐 정상 (Jungfraujoch)": 248000,
  "프라하 카를교 & 성 비투스 대성당": 27000,
  "마추픽추 공중도시 (Machu Picchu)": 61000,
  "테오티우아칸 피라미드 (Teotihuacan)": 7500,
  "그랜드캐니언 사우스림 (Grand Canyon South Rim)": 47000,
  "샌프란시스코 금문교 (Golden Gate Bridge)": 0,
  "뉴욕 센트럴 파크 & 록펠러 센터": 54000,
  "하와이 와이키키 비치 & 다이아몬드 헤드": 6800
};
  const DINING_BASE_PRICES = {
  "The Wolseley": 75000,
  "Poppies Fish & Chips (Soho)": 32000,
  "Hawksmoor Seven Dials": 68000,
  "Rules Restaurant (1798년 개업)": 89000,
  "Dishoom Covent Garden": 36000,
  "Applebee's Fish (Borough Market)": 45000,
  "Bistrot Paul Bert": 65000,
  "Bouillon Chartier": 28000,
  "Le Comptoir du Relais": 55000,
  "Angelina Paris (본점)": 32000,
  "Chez René": 58000,
  "Chez Pipo (니스)": 24000,
  "Trattoria Da Enzo al 29": 38000,
  "Trattoria Zà Zà": 72000,
  "Roscioli Salumeria con Cucina": 52000,
  "All'Antico Vinaio": 15000,
  "Cantina Do Spade": 26000,
  "Giolitti (1900년 개업)": 9000,
  "Luini (밀라노 두오모 옆)": 7500,
  "Restaurante 7 Portes": 58000,
  "Cervecería Catalana": 42000,
  "Sobrino de Botín (1725년 개업)": 65000,
  "Chocolatería San Ginés": 9500,
  "El Rinconcillo": 35000,
  "Restaurante Modesto": 42000,
  "Bar Sport (산세바스티안)": 30000,
  "El Pimpi": 36000,
  "Adega São Nicolau": 38000,
  "Brasão Coliseu": 28000,
  "Pastéis de Belém": 6000,
  "Cervejaria Ramiro": 65000,
  "Restaurante O Polar": 34000,
  "Dona Amélia (풍샬)": 32000,
  "Figlmüller Wollzeile": 38000,
  "Café Central": 22000,
  "Plachutta Wollzeile": 58000,
  "Hofbräuhaus München": 35000,
  "Augustiner-Keller": 29000,
  "Restaurant Swiss Chuchi": 62000,
  "Restaurant Taverne (인터라켄)": 45000,
  "U Parlamentu": 26000,
  "Café Imperial": 38000,
  "Gettó Gulyás": 22000,
  "El Cardenal": 28000,
  "Taquería Los Cocuyos": 12000,
  "Casa Oaxaca": 55000,
  "La Mar Cebichería": 48000,
  "Cicciolina (쿠스코)": 52000,
  "Don Julio": 85000,
  "Andrés Carne de Res": 45000,
  "Katz's Delicatessen (1888년 개업)": 42000,
  "Grimaldi's Pizzeria (Brooklyn)": 35000,
  "Peter Luger Steak House": 145000,
  "Boudin Bakery Café": 25000,
  "House of Prime Rib": 98000,
  "Lou Malnati's Pizzeria": 38000,
  "Da Poke Shack": 26000,
  "Grand Central Market / Eggslut": 19000
};

  // 1. Assign baseKrw to existing landmarks
  if (typeof GLOBAL_LANDMARKS_DATA !== 'undefined') {
    GLOBAL_LANDMARKS_DATA.forEach(item => {
      if (LANDMARK_BASE_PRICES[item.name] !== undefined) {
        item.baseKrw = LANDMARK_BASE_PRICES[item.name];
      } else if (item.baseKrw === undefined) {
        item.baseKrw = 25000;
      }
    });
    // Append Dubai landmarks if not already present
    DUBAI_LANDMARKS.forEach(dlm => {
      if (!GLOBAL_LANDMARKS_DATA.some(x => x.name === dlm.name)) {
        GLOBAL_LANDMARKS_DATA.push(dlm);
      }
    });
  }

  // 2. Assign baseKrw to existing dining spots
  if (typeof GLOBAL_DINING_DATA !== 'undefined') {
    GLOBAL_DINING_DATA.forEach(item => {
      if (DINING_BASE_PRICES[item.name] !== undefined) {
        item.baseKrw = DINING_BASE_PRICES[item.name];
      } else if (item.baseKrw === undefined) {
        item.baseKrw = 30000;
      }
    });
    // Append Dubai dining spots if not already present
    DUBAI_DINING.forEach(dd => {
      if (!GLOBAL_DINING_DATA.some(x => x.name === dd.name)) {
        GLOBAL_DINING_DATA.push(dd);
      }
    });
  }

  // 3. Merge i18n data
  if (typeof LANDMARK_I18N_DATA !== 'undefined') {
    Object.assign(LANDMARK_I18N_DATA, DUBAI_LANDMARK_I18N);
  }
  if (typeof DINING_I18N_DATA !== 'undefined') {
    Object.assign(DINING_I18N_DATA, DUBAI_DINING_I18N);
  }

  // 4. Append Arabic Phrases
  if (typeof CLEAN_PHRASES_DATA !== 'undefined') {
    if (!CLEAN_PHRASES_DATA.some(g => g.langGroup === 'ar')) {
      CLEAN_PHRASES_DATA.push(ARABIC_PHRASES_GROUP);
    }
  }

  // 5. Append Regional Plans for Dubai
  if (typeof REGIONAL_PLANS !== 'undefined') {
    REGIONAL_PLANS["DUBAI_STOPOVER"] = DUBAI_STOPOVER_PLAN;
    
    // Create Hybrid Plan: IBERIA_DUBAI (30 days)
    const iberiaPlan = REGIONAL_PLANS["IBERIA"];
    const hybridDays = [
      ...DUBAI_STOPOVER_PLAN.days.slice(0, 3),
      ...(iberiaPlan ? iberiaPlan.days.slice(1, 27) : []),
      {
        city: "귀국",
        isTransfer: true,
        theme: "마데이라/리스본 출발, 두바이 경유 인천 귀국",
        morning: "공항 출발 및 두바이 환승 라운지 휴식",
        rest: "에미레이트 A380 비행 중 편안한 수면",
        evening: "인천 국제공항 안전한 귀국 및 여행 마무리",
        walk: "낮음",
        transport: "에미레이트 항공 직항편",
        meal: "기내 맞춤 영양식 & 라운지 식사",
        events: ["인천 귀국"]
      }
    ];

    REGIONAL_PLANS["IBERIA_DUBAI"] = {
      title: "🇪🇸🇵🇹🇦🇪 남유럽 이베리아 + 두바이 에미레이트 스톱오버 30일 (골든 콤보)",
      score: "96점 (최고의 시너지)",
      season: "11~12월 최적 여행기 · 온화한 기후와 화려한 성탄 축제",
      budget: "2,680만 원",
      festivals: "두바이 분수 쇼 + 리스본·마데이라·말라가 성탄 조명 페스티벌",
      festSub: "에미레이트 A380 직항 경유를 활용한 두바이 3일 휴식 + 이베리아 27일 완주",
      cities: ["두바이", "포르투", "리스본", "세비야", "말라가·그라나다", "마데이라", "귀국"],
      days: hybridDays
    };
  }
})();


// ==============================================================
// 2026 GLOBAL COMMERCIAL LOGIC & UPGRADES
// ==============================================================

// 전역 상태 변수
let currentCurrency = 'KRW';
let currentFontScale = 1.0;
const FX_RATES = {
  KRW: 1,
  USD: 1350,
  EUR: 1480,
  GBP: 1760,
  CHF: 1550,
  AED: 368,
  JPY: 9.1,
  CNY: 192
};

// 1. Toast 알림 시스템
function showToast(message, duration = 2400) {
  const container = document.getElementById('toastContainer');
  if (!container) return;
  const toast = document.createElement('div');
  toast.className = 'toast-box';
  toast.innerHTML = message;
  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('fadeout');
    setTimeout(() => {
      if (toast.parentElement) toast.parentElement.removeChild(toast);
    }, 300);
  }, duration);
}

// 2. 환율 및 통화 표기 포맷터
function formatMoney(krwAmount, curr = currentCurrency) {
  if (krwAmount === 0) {
    const dict = (typeof I18N_DICTIONARY !== 'undefined' && I18N_DICTIONARY[currentLang]) || {};
    return dict['lbl_free'] || (currentLang === 'en' ? 'Free' : (currentLang === 'ja' ? '無料' : (currentLang === 'zh' ? '免费' : '무료')));
  }
  if (curr === 'USD') {
    const usd = Math.round(krwAmount / FX_RATES.USD);
    return `$${usd.toLocaleString()} USD`;
  } else if (curr === 'EUR') {
    const eur = Math.round(krwAmount / FX_RATES.EUR);
    return `€${eur.toLocaleString()} EUR`;
  } else if (curr === 'GBP') {
    const gbp = Math.round(krwAmount / FX_RATES.GBP);
    return `£${gbp.toLocaleString()} GBP`;
  } else if (curr === 'CHF') {
    const chf = Math.round(krwAmount / FX_RATES.CHF);
    return `${chf.toLocaleString()} CHF`;
  } else if (curr === 'AED') {
    const aed = Math.round(krwAmount / FX_RATES.AED);
    return `${aed.toLocaleString()} AED (د.إ)`;
  } else if (curr === 'JPY') {
    const jpy = Math.round(krwAmount / FX_RATES.JPY);
    return `¥${jpy.toLocaleString()} JPY`;
  } else if (curr === 'CNY') {
    const cny = Math.round(krwAmount / FX_RATES.CNY);
    return `¥${cny.toLocaleString()} CNY`;
  } else {
    // KRW
    if (currentLang === 'en') {
      return `₩${krwAmount.toLocaleString()} KRW`;
    } else if (currentLang === 'ja') {
      if (krwAmount >= 100000000) {
        const oku = (krwAmount / 100000000).toFixed(1);
        return `${oku}億ウォン (~₩${krwAmount.toLocaleString()})`;
      } else if (krwAmount >= 10000) {
        const man = Math.round(krwAmount / 10000);
        return `${man.toLocaleString()}万ウォン (~₩${krwAmount.toLocaleString()})`;
      } else {
        return `₩${krwAmount.toLocaleString()}`;
      }
    } else if (currentLang === 'zh') {
      if (krwAmount >= 100000000) {
        const yi = (krwAmount / 100000000).toFixed(1);
        return `${yi}亿韩元 (~₩${krwAmount.toLocaleString()})`;
      } else if (krwAmount >= 10000) {
        const man = Math.round(krwAmount / 10000);
        return `${man.toLocaleString()}万韩元 (~₩${krwAmount.toLocaleString()})`;
      } else {
        return `₩${krwAmount.toLocaleString()}`;
      }
    } else {
      if (krwAmount >= 100000000) {
        const eok = (krwAmount / 100000000).toFixed(1);
        return `${eok}억 원`;
      } else if (krwAmount >= 10000) {
        const man = Math.round(krwAmount / 10000);
        return `${man.toLocaleString()}만 원`;
      } else {
        return `${krwAmount.toLocaleString()}원`;
      }
    }
  }
}

// 2-1. 개별 카드 목록 전용 (From) 가격 포맷터
function formatCardPrice(baseKrw, curr = currentCurrency, isDining = false) {
  if (baseKrw === 0) {
    return currentLang === 'en' ? 'Free' : (currentLang === 'ja' ? '無料' : (currentLang === 'zh' ? '免费' : '무료 (Free)'));
  }
  const krw = typeof baseKrw === 'number' ? baseKrw : (isDining ? 30000 : 25000);
  const prefix = 'From ';
  if (curr === 'KRW') {
    if (krw >= 10000) {
      const man = (krw / 10000).toFixed(1).replace('.0', '');
      if (currentLang === 'en') {
        return `${prefix}₩${krw.toLocaleString()} KRW`;
      } else if (currentLang === 'ja') {
        return `${prefix}${man}万ウォン (~₩${krw.toLocaleString()})`;
      } else if (currentLang === 'zh') {
        return `${prefix}${man}万韩元 (~₩${krw.toLocaleString()})`;
      } else {
        return `${prefix}${man}만 원 (~₩${krw.toLocaleString()})`;
      }
    }
    return `${prefix}₩${krw.toLocaleString()}`;
  } else if (curr === 'USD') {
    const val = Math.round(krw / FX_RATES.USD);
    return `${prefix}$${val.toLocaleString()} (~₩${krw.toLocaleString()})`;
  } else if (curr === 'EUR') {
    const val = Math.round(krw / FX_RATES.EUR);
    return `${prefix}€${val.toLocaleString()} (~₩${krw.toLocaleString()})`;
  } else if (curr === 'GBP') {
    const val = Math.round(krw / FX_RATES.GBP);
    return `${prefix}£${val.toLocaleString()} (~₩${krw.toLocaleString()})`;
  } else if (curr === 'CHF') {
    const val = Math.round(krw / FX_RATES.CHF);
    return `${prefix}CHF ${val.toLocaleString()} (~₩${krw.toLocaleString()})`;
  } else if (curr === 'AED') {
    const val = Math.round(krw / FX_RATES.AED);
    return `${prefix}AED ${val.toLocaleString()} (~₩${krw.toLocaleString()})`;
  } else if (curr === 'JPY') {
    const val = Math.round(krw / FX_RATES.JPY);
    return `${prefix}¥${val.toLocaleString()} (~₩${krw.toLocaleString()})`;
  } else if (curr === 'CNY') {
    const val = Math.round(krw / FX_RATES.CNY);
    return `${prefix}¥${val.toLocaleString()} (~₩${krw.toLocaleString()})`;
  }
  return `${prefix}₩${krw.toLocaleString()}`;
}

function setCurrency(curr, btn) {
  currentCurrency = curr;
  document.querySelectorAll('.currency-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  const target = document.getElementById('currBtn' + curr);
  if (target) target.classList.add('active');

  const dict = I18N_DICTIONARY[currentLang] || I18N_DICTIONARY['ko'];
  showToast(`💱 ${dict['toast_currency_changed'] || '통화가 변경되었습니다'}: <strong>${curr}</strong>`);
  applyPlanReconfiguration(false);
  renderGlobalDining();
  renderGlobalLandmarks();
  if (typeof renderHotelsGrid === 'function') renderHotelsGrid();
  try { localStorage.setItem('travel_user_currency', curr); } catch(e) {}
}

// 3. 어르신을 위한 글자 크기 조절 시스템
function changeFontScale(delta) {
  currentFontScale = Math.min(1.4, Math.max(0.85, currentFontScale + delta));
  applyFontScale();
  const dict = I18N_DICTIONARY[currentLang] || I18N_DICTIONARY['ko'];
  showToast(`🔤 ${dict['toast_font_changed'] || '글자 크기가 조절되었습니다'} (${Math.round(currentFontScale * 100)}%)`);
}

function resetFontScale() {
  currentFontScale = 1.0;
  applyFontScale();
  const dict = I18N_DICTIONARY[currentLang] || I18N_DICTIONARY['ko'];
  showToast(`🔤 ${dict['toast_font_reset'] || '글자 크기가 기본으로 복원되었습니다'}`);
}

function applyFontScale() {
  document.documentElement.style.setProperty('--font-scale', currentFontScale);
  const btnNorm = document.getElementById('btnFontNormal');
  if (btnNorm) {
    if (Math.abs(currentFontScale - 1.0) < 0.05) btnNorm.classList.add('active');
    else btnNorm.classList.remove('active');
  }
  if (currentFontScale >= 1.15) {
    document.body.classList.add('senior-enlarged');
  } else {
    document.body.classList.remove('senior-enlarged');
  }
  try { localStorage.setItem('travel_user_fontscale', String(currentFontScale)); } catch(e) {}
}

// 4. 스크롤 '위로 가기' (Back to Top)
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

window.addEventListener('scroll', () => {
  const btn = document.getElementById('btnBackToTop');
  if (!btn) return;
  if (window.scrollY > 350) {
    btn.classList.add('visible');
  } else {
    btn.classList.remove('visible');
  }
});

// 5. 검색창 'X' (초기화) 버튼 이벤트 핸들러
function handleDiningSearchInput() {
  const input = document.getElementById('globalDiningSearch');
  const clearBtn = document.getElementById('btnDiningClear');
  if (input && clearBtn) {
    clearBtn.style.display = input.value.trim().length > 0 ? 'flex' : 'none';
  }
  filterGlobalDining();
}

function clearDiningSearch() {
  const input = document.getElementById('globalDiningSearch');
  const clearBtn = document.getElementById('btnDiningClear');
  if (input) {
    input.value = '';
    input.focus();
  }
  if (clearBtn) clearBtn.style.display = 'none';
  filterGlobalDining();
}

function handleAiSearchInput() {
  const input = document.getElementById('aiDirectSearchInput');
  const clearBtn = document.getElementById('btnAiClear');
  if (input && clearBtn) {
    clearBtn.style.display = input.value.trim().length > 0 ? 'flex' : 'none';
  }
}

function clearAiSearch() {
  const input = document.getElementById('aiDirectSearchInput');
  const clearBtn = document.getElementById('btnAiClear');
  if (input) {
    input.value = '';
    input.focus();
  }
  if (clearBtn) clearBtn.style.display = 'none';
}

// 6. 동적 예산 계산기 (Dynamic Budget Calculator)
function calculateDynamicBudget(region, durationDays, partySize, tier) {
  const tierMultiplier = tier === 'luxury' ? 1.48 : (tier === 'economy' ? 0.78 : 1.0);
  
  const flightPerPerson = {
    IBERIA: 1800000,
    IBERIA_DUBAI: 1950000,
    DUBAI_STOPOVER: 1100000,
    WEST_CENTRAL_EU: 2100000,
    LATIN_AMERICA: 2300000,
    USA_GRAND: 2400000
  }[region] || 1800000;

  const lodgingDailyBase = {
    IBERIA: 280000,
    IBERIA_DUBAI: 310000,
    DUBAI_STOPOVER: 380000,
    WEST_CENTRAL_EU: 360000,
    LATIN_AMERICA: 250000,
    USA_GRAND: 420000
  }[region] || 280000;

  const livingDailyBase = {
    IBERIA: 160000,
    IBERIA_DUBAI: 180000,
    DUBAI_STOPOVER: 230000,
    WEST_CENTRAL_EU: 220000,
    LATIN_AMERICA: 150000,
    USA_GRAND: 240000
  }[region] || 160000;

  const miscDailyBase = {
    IBERIA: 120000,
    IBERIA_DUBAI: 130000,
    DUBAI_STOPOVER: 160000,
    WEST_CENTRAL_EU: 150000,
    LATIN_AMERICA: 170000,
    USA_GRAND: 180000
  }[region] || 120000;

  const partyRatio = partySize / 3;
  const lodgingPartyFactor = partySize === 2 ? 0.85 : (partySize === 3 ? 1.0 : (partySize === 4 ? 1.3 : 1.55));

  const totalFlight = Math.round(flightPerPerson * partySize * (tier === 'luxury' ? 1.4 : 1.0));
  const totalLodging = Math.round(lodgingDailyBase * durationDays * tierMultiplier * lodgingPartyFactor);
  const totalLiving = Math.round(livingDailyBase * durationDays * partyRatio * (tier === 'luxury' ? 1.25 : (tier === 'economy' ? 0.85 : 1.0)));
  const totalMisc = Math.round(miscDailyBase * durationDays * partyRatio * tierMultiplier);
  const grandTotal = totalFlight + totalLodging + totalLiving + totalMisc;

  return {
    flight: totalFlight,
    lodging: totalLodging,
    living: totalLiving,
    misc: totalMisc,
    total: grandTotal
  };
}

// 7. 도시 필터 탭 바 렌더링
function renderCityFilterTabs() {
  const container = document.getElementById('dynamicCityFilterBar') || document.getElementById('cityFilterTabs');
  if (!container) return;
  const plan = REGIONAL_PLANS[currentActiveRegion] || REGIONAL_PLANS["IBERIA"];
  const cities = ['ALL', ...(plan.cities || [])];
  
  container.innerHTML = cities.map(city => {
    const isAll = city === 'ALL';
    const localizedCity = cleanHangul(city, currentLang);
    const label = isAll ? (currentLang === 'en' ? '🌟 All Itinerary' : (currentLang === 'ja' ? '🌟 全日程' : (currentLang === 'zh' ? '🌟 全部行程' : '🌟 전체 일정'))) : `📍 ${localizedCity}`;
    const activeClass = (window.currentCityFilter || 'ALL') === city ? 'active' : '';
    return `<button class="tab-chip ${activeClass}" onclick="filterTimelineCity('${city}', this)">${label}</button>`;
  }).join('');
}

function cleanHangul(text, lang) {
  if (!text || typeof text !== 'string') return '';
  if (lang === 'ko') return text;
  let t = text;
  const fallbackDict = {
    '말라가·그라나다': { ja: 'マラガ・グラナダ', en: 'Málaga & Granada', zh: '马拉加·格拉纳达' },
    '마데이라': { ja: 'マデイラ', en: 'Madeira', zh: '马德拉' },
    '귀국': { ja: '帰国', en: 'Return Flight', zh: '回国' },
    '로마·피렌체': { ja: 'ローマ・フィレンツェ', en: 'Rome & Florence', zh: '罗马·佛罗伦萨' },
    '리마': { ja: 'リマ', en: 'Lima', zh: '利马' },
    '쿠스코·마추픽추': { ja: 'クスコ・マチュピチュ', en: 'Cusco & Machu Picchu', zh: '库斯科·马丘比丘' },
    '부에노스아이레스': { ja: 'ブエノスアイレス', en: 'Buenos Aires', zh: '布宜诺斯艾利斯' },
    '그랜드캐니언·라스베이거스': { ja: 'グランドキャニオン・ラスベガス', en: 'Grand Canyon & Las Vegas', zh: '大峡谷·拉斯维加斯' },
    '로스앤젤레스': { ja: 'ロサンゼルス', en: 'Los Angeles', zh: '洛杉矶' },
    '하와이': { ja: 'ハワイ', en: 'Hawaii', zh: '夏威夷' },
    '두바이': { ja: 'ドバイ', en: 'Dubai', zh: '迪拜' },
    '아부다비': { ja: 'アブダビ', en: 'Abu Dhabi', zh: '阿布扎比' },
    '신트라': { ja: 'シントラ', en: 'Sintra', zh: '辛特拉' },
    '톨레도': { ja: 'トレド', en: 'Toledo', zh: '托莱多' },
    '론다': { ja: 'ロンダ', en: 'Ronda', zh: '龙达' },
    '코르도바': { ja: 'コルドバ', en: 'Córdoba', zh: '科尔多瓦' },
    '스페인': { ja: 'スペイン', en: 'Spain', zh: '西班牙' },
    '포르투갈': { ja: 'ポルトガル', en: 'Portugal', zh: '葡萄牙' },
    '이탈리아': { ja: 'イタリア', en: 'Italy', zh: '意大利' },
    '프랑스': { ja: 'フランス', en: 'France', zh: '法国' },
    '영국': { ja: 'イギリス', en: 'United Kingdom', zh: '英国' },
    '오스트리아': { ja: 'オーストリア', en: 'Austria', zh: '奥地利' },
    '체코': { ja: 'チェコ', en: 'Czech Republic', zh: '捷克' },
    '독일': { ja: 'ドイツ', en: 'Germany', zh: '德国' },
    '스위스': { ja: 'スイス', en: 'Switzerland', zh: '瑞士' },
    '낮음': { ja: '低（シニア安心）', en: 'Low (Senior-Friendly)', zh: '低（适老舒适）' },
    '보통': { ja: '普通', en: 'Moderate', zh: '中等' },
    '높음': { ja: '高', en: 'High', zh: '较高' },
    '현지 미식': { ja: '地元グルメ', en: 'Local Dining', zh: '当地特色美食' },
    '도시 간 기차 이동': { ja: '都市間鉄道の移動', en: 'Inter-city Rail Travel', zh: '城际铁路出行' },
    '유로 환전 안내': { ja: 'ユーロ両替・決済', en: 'Euro Currency Info', zh: '欧元换汇指南' },
    '유로 환전 및 결제': { ja: 'ユーロ両替・決済', en: 'Euro & Payment Guide', zh: '欧元换汇与支付' },
    '소매치기 안전 수칙': { ja: 'スリ対策と安全', en: 'Pickpocket Safety Rules', zh: '防盗安全守则' },
    '소매치기 안전': { ja: 'スリ対策', en: 'Pickpocket Safety', zh: '防盗安全' },
    '스페인 맛집': { ja: 'スペイン名店', en: 'Spanish Dining', zh: '西班牙名店' },
    '포르투갈 맛집': { ja: 'ポルトガル名店', en: 'Portuguese Dining', zh: '葡萄牙名店' },
    '포르투갈 대표 음식': { ja: 'ポルトガル名物料理', en: 'Iconic Portuguese Food', zh: '葡萄牙代表美食' },
    '두바이 ➔ 아부다비': { ja: 'ドバイ ➔ アブダビ', en: 'Dubai ➔ Abu Dhabi', zh: '迪拜 ➔ 阿布扎比' },
    '부르즈 할리파 & 몰': { ja: 'ブルジュ・ハリファ＆モール', en: 'Burj Khalifa & Mall', zh: '哈利法塔与购物中心' },
    '마드리드 ➔ 세비야 이동': { ja: 'マドリード ➔ セビリア移動', en: 'Madrid ➔ Seville Transit', zh: '马德里 ➔ 塞维利亚交通' },
    '마드리드 ➔ 세비야': { ja: 'マドリード ➔ セビリア', en: 'Madrid ➔ Seville', zh: '马德里 ➔ 塞维利亚' },
    '마드리드 ➔ 리스본 이동': { ja: 'マドリード ➔ リスボン移動', en: 'Madrid ➔ Lisbon Transit', zh: '马德里 ➔ 里斯本交通' },
    '마드리드 ➔ 리스본': { ja: 'マドリード ➔ リスボン', en: 'Madrid ➔ Lisbon', zh: '马德里 ➔ 里斯本' },
    '바르셀로나 ➔ 마드리드': { ja: 'バルセロナ ➔ マドリード', en: 'Barcelona ➔ Madrid', zh: '巴塞罗那 ➔ 马德里' },
    '리스본 ➔ 포르투': { ja: 'リスボン ➔ ポルト', en: 'Lisbon ➔ Porto', zh: '里斯本 ➔ 波尔图' },
    '택스리펀(DIVA)': { ja: '免税手続き（DIVA）', en: 'Tax Refund (DIVA)', zh: '退税办理（DIVA）' },
    '스페인 쇼핑': { ja: 'スペインのお土産', en: 'Spain Souvenirs', zh: '西班牙伴手礼' },
    '포르투갈 쇼핑': { ja: 'ポルトガルのお土産', en: 'Portugal Souvenirs', zh: '葡萄牙伴手礼' },
    '부모님 안심 케어': { ja: 'ご両親安心ケア', en: 'Senior Care Tips', zh: '长辈舒心照护' },
    '고속열차 이동 안전': { ja: '高速鉄道の移動と安全', en: 'High-speed Rail Safety', zh: '高铁出行与安全' },
    '고속열차 렌페 이동': { ja: '高速鉄道Renfeの移動', en: 'Renfe High-Speed Train', zh: 'Renfe高铁出行' },
    '싱겁게 주문하는 법': { ja: '薄味での注文方法', en: 'How to order less salt', zh: '少盐清淡点餐法' },
    '포르투': { ja: 'ポルト', 'en': 'Porto', 'zh': '波尔图' },
    '리스본': { ja: 'リスボン', 'en': 'Lisbon', 'zh': '里斯本' },
    '세비야': { ja: 'セビリア', 'en': 'Seville', 'zh': '塞维利亚' },
    '마드리드': { ja: 'マドリード', 'en': 'Madrid', 'zh': '马德里' },
    '바르셀로나': { ja: 'バルセロナ', 'en': 'Barcelona', 'zh': '巴塞罗那' },
    '그라나다': { ja: 'グラナダ', 'en': 'Granada', 'zh': '格拉纳达' },
    '말라가': { ja: 'マラガ', 'en': 'Málaga', 'zh': '马拉加' },
    '런던': { ja: 'ロンドン', 'en': 'London', 'zh': '伦敦' },
    '파리': { ja: 'パリ', 'en': 'Paris', 'zh': '巴黎' },
    '로마': { ja: 'ローマ', 'en': 'Rome', 'zh': '罗马' },
    '피렌체': { ja: 'フィレンツェ', 'en': 'Florence', 'zh': '佛罗伦萨' },
    '베네치아': { ja: 'ベネチア', 'en': 'Venice', 'zh': '威尼斯' },
    '밀라노': { ja: 'ミラノ', 'en': 'Milan', 'zh': '米兰' },
    '비엔나': { ja: 'ウィーン', 'en': 'Vienna', 'zh': '维也纳' },
    '프라하': { ja: 'プラハ', 'en': 'Prague', 'zh': '布拉格' },
    '뮌헨': { ja: 'ミュンヘン', 'en': 'Munich', 'zh': '慕尼黑' },
    '인터라켄': { ja: 'インターラーケン', 'en': 'Interlaken', 'zh': '因特拉肯' },
    '취리히': { ja: 'チューリッヒ', 'en': 'Zurich', 'zh': '苏黎世' },
    '부다페스트': { ja: 'ブダペスト', 'en': 'Budapest', 'zh': '布达佩斯' },
    '멕시코시티': { ja: 'メキシコシティ', 'en': 'Mexico City', 'zh': '墨西哥城' },
    '오악사카': { ja: 'ワハカ', 'en': 'Oaxaca', 'zh': '瓦哈卡' },
    '쿠스코': { ja: 'クスコ', 'en': 'Cusco', 'zh': '库斯科' },
    '마추픽추': { ja: 'マチュピチュ', 'en': 'Machu Picchu', 'zh': '马丘比丘' },
    '뉴욕': { ja: 'ニューヨーク', 'en': 'New York', 'zh': '纽约' },
    '샌프란시스코': { ja: 'サンフランシスコ', 'en': 'San Francisco', 'zh': '旧金山' },
    '일정': { ja: '日程', 'en': 'Itinerary', 'zh': '行程' },
    '일': { ja: '日', 'en': 'Day', 'zh': '日' },
    '남성': { ja: '男性', 'en': 'male', 'zh': '男性' },
    '여성': { ja: '女性', 'en': 'female', 'zh': '女性' },
    '항공·숙소·식비·교통·예비비 올인원': { ja: '航空券・宿泊・食費・交通・予備費 オールインワン', en: 'All-in-one: Flights, Hotels, Dining, Transit & Buffer', zh: '机票·住宿·餐饮·交通·备用金 全包预算' },
    '크리스마스 조명 & 전통 마켓 매칭': { ja: 'クリスマスイルミネーション＆伝統マーケット連携', en: 'Christmas Lights & Traditional Markets Matched', zh: '圣诞灯光秀与传统市集精准匹配' },
    '온수 샤워 낮잠 슬롯': { ja: '温水シャワー＆シエスタ休息', en: 'Warm Shower & Siesta Recharge', zh: '热水澡与午休西斯塔时段' },
    '개 축제 연계': { ja: '大フェスティバル連携', en: ' Key Festivals Linked', zh: '大节庆活动' },
    '스팟 / 일': { ja: 'スポット / 日', en: 'Spots / Day', zh: '景点 / 天' },
    '구글 실시간 검색': { ja: 'Google リアルタイム検索', en: 'Google Live Search', zh: '谷歌实时搜索' },
    'Perplexity AI 분석': { ja: 'Perplexity AI 分析', en: 'Perplexity AI Analysis', zh: 'Perplexity AI 分析' },
    '운영시간': { ja: '営業時間', en: 'Hours', zh: '营业时间' },
    '예매팁': { ja: '予約のヒント', en: 'Ticket Tip', zh: '门票攻略' },
    '외국어': { ja: '外国語対応', en: 'Language', zh: '外语沟通' },
    '연락처': { ja: '連絡先', en: 'Contact', zh: '联系电话' },
    '예약방식': { ja: '予約方式', en: 'Booking', zh: '预约方式' }
  };
  for (const [k, v] of Object.entries(fallbackDict)) {
    if (v[lang] && t.includes(k)) {
      t = t.split(k).join(v[lang]);
    }
  }
  return t;
}

function renderDiningPresets() {
  const bar = document.getElementById('diningPresetsBar');
  if (!bar) return;
  bar.innerHTML = '';
  const presets = DINING_PRESETS_I18N[currentLang] || DINING_PRESETS_I18N['ko'];
  presets.forEach(p => {
    const span = document.createElement('span');
    span.className = 'preset-btn';
    span.textContent = p.label;
    span.onclick = function() {
      quickFilterDining(p.key);
    };
    bar.appendChild(span);
  });
}

function renderLandmarkFilterTabs() {
  const bar = document.getElementById('landmarkFilterBar');
  if (!bar) return;
  bar.innerHTML = '';
  const tabs = LANDMARK_TABS_I18N[currentLang] || LANDMARK_TABS_I18N['ko'];
  tabs.forEach((t, idx) => {
    const btn = document.createElement('button');
    btn.className = `tab-chip orange-chip ${idx === 0 ? 'active' : ''}`;
    btn.textContent = t.label;
    btn.onclick = function() {
      filterLandmarks(t.key, this);
    };
    bar.appendChild(btn);
  });
}

function renderPhraseFilterTabs() {
  const bar = document.getElementById('phraseFilterBar');
  if (!bar) return;
  bar.innerHTML = '';
  const tabs = PHRASE_TABS_I18N[currentLang] || PHRASE_TABS_I18N['ko'];
  tabs.forEach((t, idx) => {
    const btn = document.createElement('button');
    btn.className = `tab-chip blue-chip ${t.key === currentPhraseFilter ? 'active' : ''}`;
    btn.textContent = t.label;
    btn.onclick = function() {
      filterPhraseLanguage(t.key, this);
    };
    bar.appendChild(btn);
  });
}

function renderAiSearchPresets() {
  const bar = document.getElementById('aiPresetsBar');
  if (!bar) return;
  bar.innerHTML = '';
  const presets = AI_PRESETS_I18N[currentLang] || AI_PRESETS_I18N['ko'];
  presets.forEach(p => {
    const span = document.createElement('span');
    span.className = 'preset-btn';
    span.textContent = p;
    span.onclick = function() {
      fillAndSearch(p.replace('💡 ', ''));
    };
    bar.appendChild(span);
  });
}

function renderPlannerDropdownOptions() {
  const regSel = document.getElementById('userRegionSelect');
  if (regSel) {
    const val = regSel.value;
    const opts = {
      'ko': {
        'IBERIA': '🇪🇸🇵🇹 남유럽 (이베리아 + 안달루시아 + 마데이라 30일)',
        'IBERIA_DUBAI': '🇪🇸🇵🇹🇦🇪 이베리아 + 두바이 에미레이트 경유 결합 (30일 골든)',
        'DUBAI_STOPOVER': '🇦🇪 두바이 경유 & 스톱오버 럭셔리 슬로우 (3~5일 핵심)',
        'WEST_CENTRAL_EU': '🇬🇧🇫🇷🇮🇹🇦🇹🇨🇿 서·중유럽 (런던·파리·로마·비엔나·프라하 30일)',
        'LATIN_AMERICA': '🇲🇽🇵🇪🇦🇷 중남미 (멕시코시티·오악사카·쿠스코·마추픽추 30일)',
        'USA_GRAND': '🇺🇸 미국 전역 (샌프란시스코·그랜드캐니언·LA·뉴욕·하와이 30일)'
      },
      'ja': {
        'IBERIA': '🇪🇸🇵🇹 南欧 (イベリア + アンダルシア + マデイラ 30日)',
        'IBERIA_DUBAI': '🇪🇸🇵🇹🇦🇪 イベリア + ドバイ経由コンボ (30日ゴールデン)',
        'DUBAI_STOPOVER': '🇦🇪 ドバイ経由ストップオーバー ラグジュアリー (3〜5日)',
        'WEST_CENTRAL_EU': '🇬🇧🇫🇷🇮🇹🇦🇹🇨🇿 西・中欧 (ロンドン・パリ・ローマ・ウィーン・プラハ 30日)',
        'LATIN_AMERICA': '🇲🇽🇵🇪🇦🇷 中南米 (メキシコシティ・ワハカ・クスコ・マチュピチュ 30日)',
        'USA_GRAND': '🇺🇸 アメリカ全土 (サンフランシスコ・グランドキャニオン・LA・NY・ハワイ 30日)'
      },
      'en': {
        'IBERIA': '🇪🇸🇵🇹 Southern Europe (Iberia + Andalusia + Madeira 30D)',
        'IBERIA_DUBAI': '🇪🇸🇵🇹🇦🇪 Iberia + Dubai Stopover Combo (30D Golden)',
        'DUBAI_STOPOVER': '🇦🇪 Dubai Stopover Slow Luxury (3-5 Days Core)',
        'WEST_CENTRAL_EU': '🇬🇧🇫🇷🇮🇹🇦🇹🇨🇿 Western & Central EU (London, Paris, Rome, Vienna, Prague 30D)',
        'LATIN_AMERICA': '🇲🇽🇵🇪🇦🇷 Latin America (Mexico City, Oaxaca, Cusco, Machu Picchu 30D)',
        'USA_GRAND': '🇺🇸 USA Nationwide (SF, Grand Canyon, LA, NY, Hawaii 30D)'
      },
      'zh': {
        'IBERIA': '🇪🇸🇵🇹 南欧 (伊比利亚 + 安达卢西亚 + 马德拉 30天)',
        'IBERIA_DUBAI': '🇪🇸🇵🇹🇦🇪 伊比利亚 + 迪拜经停组合 (30天黄金)',
        'DUBAI_STOPOVER': '🇦🇪 迪拜经停慢调奢享 (3~5天核心)',
        'WEST_CENTRAL_EU': '🇬🇧🇫🇷🇮🇹🇦🇹🇨🇿 西欧与中欧 (伦敦·巴黎·罗马·维也纳·布拉格 30天)',
        'LATIN_AMERICA': '🇲🇽🇵🇪🇦🇷 中拉美 (墨西哥城·瓦哈卡·库斯科·马丘比丘 30天)',
        'USA_GRAND': '🇺🇸 美国全境 (旧金山·大峡谷·洛杉矶·纽约·夏威夷 30天)'
      }
    };
    const cOpts = opts[currentLang] || opts['ko'];
    Array.from(regSel.options).forEach(opt => {
      if (cOpts[opt.value]) opt.textContent = cOpts[opt.value];
    });
    regSel.value = val;
  }

  const durSel = document.getElementById('userDurationSelect');
  if (durSel) {
    const val = durSel.value;
    const dOpts = {
      'ko': { '30': '30일 (29박 여유 완주형)', '21': '21일 (3주 핵심 거점형)', '14': '14일 (2주 하이라이트형)' },
      'ja': { '30': '30日（29泊 ゆったり完走型）', '21': '21日（3週間 核心拠点滞在型）', '14': '14日（2週間 ハイライト厳選型）' },
      'en': { '30': '30 Days (29 Nights Relaxed Full Route)', '21': '21 Days (3 Weeks Core Bases)', '14': '14 Days (2 Weeks Highlights)' },
      'zh': { '30': '30天（29晚 轻松全景型）', '21': '21天（3周 核心枢纽型）', '14': '14天（2周 精选经典型）' }
    };
    const cDOpts = dOpts[currentLang] || dOpts['ko'];
    Array.from(durSel.options).forEach(opt => {
      if (cDOpts[opt.value]) opt.textContent = cDOpts[opt.value];
    });
    durSel.value = val;
  }

  const pacSel = document.getElementById('userPacingSelect');
  if (pacSel) {
    const val = pacSel.value;
    const pOpts = {
      'ko': { 'relaxed': '부모님 동행 (오후 시에스타 의무 휴식)', 'balanced': '균형형 (시니어 친화 + 핵심 전망대)' },
      'ja': { 'relaxed': 'ご両親同伴（午後シエスタ必須休息）', 'balanced': 'バランス型（シニア快適＋厳選展望スポット）' },
      'en': { 'relaxed': 'With Parents (Mandatory Afternoon Siesta)', 'balanced': 'Balanced (Senior-Friendly + Key Viewpoints)' },
      'zh': { 'relaxed': '携父母同游（午后强制西斯塔休息）', 'balanced': '均衡型（适老出行＋经典观景台）' }
    };
    const cPOpts = pOpts[currentLang] || pOpts['ko'];
    Array.from(pacSel.options).forEach(opt => {
      if (cPOpts[opt.value]) opt.textContent = cPOpts[opt.value];
    });
    pacSel.value = val;
  }

  const partySel = document.getElementById('userPartySize');
  if (partySel) {
    const val = partySel.value;
    const ptOpts = {
      'ko': { '2': '2인 (부부 / 모녀)', '3': '3인 (부모님 + 자녀 1인)', '4': '4인 (가족 4인)', '5': '5인 (대가족 5인)' },
      'ja': { '2': '2名（夫婦／母娘）', '3': '3名（ご両親＋子ども1名）', '4': '4名（家族4名）', '5': '5名（大家族5名）' },
      'en': { '2': '2 People (Couple / Pair)', '3': '3 People (Parents + 1 Child)', '4': '4 People (Family of 4)', '5': '5 People (Large Family 5)' },
      'zh': { '2': '2人（夫妻／母女）', '3': '3人（父母＋子女1人）', '4': '4人（家庭4人）', '5': '5人（大家庭5人）' }
    };
    const cPtOpts = ptOpts[currentLang] || ptOpts['ko'];
    Array.from(partySel.options).forEach(opt => {
      if (cPtOpts[opt.value]) opt.textContent = cPtOpts[opt.value];
    });
    partySel.value = val;
  }

  const tierSel = document.getElementById('userTierSelect');
  if (tierSel) {
    const val = tierSel.value;
    const tOpts = {
      'ko': { 'economy': '실속 알뜰형 (스마트 가성비)', 'standard': '편안한 4성급 (센트럴 패밀리)', 'luxury': '프리미엄 럭셔리 (5성급 & VIP투어)' },
      'ja': { 'economy': 'スマート節約型（高コスパ重視）', 'standard': '快適な4つ星（セントラル・ファミリー）', 'luxury': 'プレミアム・ラグジュアリー（5つ星＆VIPツアー）' },
      'en': { 'economy': 'Smart Budget (High Value)', 'standard': 'Comfortable 4-Star (Central Family)', 'luxury': 'Premium Luxury (5-Star & VIP Tours)' },
      'zh': { 'economy': '经济实惠型（智能性价比）', 'standard': '舒适4星级（核心区家庭精选）', 'luxury': '尊享奢华型（5星级酒店＆VIP私享）' }
    };
    const cTOpts = tOpts[currentLang] || tOpts['ko'];
    Array.from(tierSel.options).forEach(opt => {
      if (cTOpts[opt.value]) opt.textContent = cTOpts[opt.value];
    });
    tierSel.value = val;
  }
}

function renderGlobalDining(list = GLOBAL_DINING_DATA) {
  window.currentFilteredDiningList = list;
  if (currentDiningView === "map") renderDiningMap();
  const grid = document.getElementById('globalDiningGrid');
  if (!grid) return;
  grid.innerHTML = '';

  const dict = I18N_DICTIONARY[currentLang] || I18N_DICTIONARY['ko'];

  if (list.length === 0) {
    grid.innerHTML = `<div style="grid-column:1/-1;padding:40px;text-align:center;color:var(--muted)">${currentLang === 'en' ? 'No matching dining spots found. Please try another search term (e.g. London, fish and chips, Paris, steak, taco).' : (currentLang === 'ja' ? '一致するグルメ情報がありません。別の検索キーワード（例：ロンドン、フィッシュ＆チップス、パリ、ステーキ）を入力してください。' : (currentLang === 'zh' ? '未找到匹配的美食信息。请尝试其他搜索词（如：伦敦、炸鱼薯条、巴黎、牛排）。' : '일치하는 미식 정보가 없습니다. 다른 검색어(예: 런던, 피시앤칩스, 파리, 스테이크, 타코)를 입력해 보세요.'))}</div>`;
    return;
  }

  list.forEach(item => {
    const card = document.createElement('div');
    card.className = 'photo-card';

    const info = DINING_I18N_DATA[item.name] || {};
    const localizedTitle = (info.dishTitle && info.dishTitle[currentLang]) || item.dishName;
    const localizedName = (info.displayName && info.displayName[currentLang]) || item.name;
    const localizedBadge = (info.badge && info.badge[currentLang]) || `${item.region} · ${item.city}`;
    const localizedSignature = (info.signature && info.signature[currentLang]) || item.signature;
    const localizedSeniorTip = (info.seniorTip && info.seniorTip[currentLang]) || item.seniorTip;
    const localizedHours = (info.hours && info.hours[currentLang]) || item.hours;
    const localizedLanguage = (info.language && info.language[currentLang]) || item.language;
    const localizedBooking = (info.booking && info.booking[currentLang]) || item.booking;

    card.innerHTML = `
      <div>
        <div class="photo-thumb-wrap">
          <img src="${item.photo}" alt="${localizedTitle}" class="photo-thumb" loading="lazy" onload="this.classList.add('loaded');this.parentElement.classList.add('loaded');" onerror="this.onerror=null;this.classList.add('loaded');this.parentElement.classList.add('loaded');this.src='https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80';" />
          <span class="photo-badge">${cleanHangul(localizedBadge, currentLang)}</span>
        </div>
        <div class="photo-body">
          <div class="photo-region">🏪 ${cleanHangul(localizedName, currentLang)}</div>
          <div class="photo-title">${cleanHangul(localizedTitle, currentLang)}</div>
          <div class="photo-desc">${cleanHangul(localizedSignature, currentLang)}</div>
          <div class="dining-features">
            <span class="dining-feature-pill">👴 ${cleanHangul(localizedSeniorTip, currentLang)}</span>
          </div>
          <div class="dining-meta-list">
            <div class="dining-meta-item">
              <span class="meta-label">💰 ${dict['lbl_price_from'] || (currentLang === 'en' ? 'Est. Price (From)' : (currentLang === 'ja' ? '予想料金 (From)' : (currentLang === 'zh' ? '预计消费 (From)' : '1인 예상 (From)')))}</span>
              <span style="font-weight:700;color:var(--accent);">${formatCardPrice(item.baseKrw, currentCurrency, true)}</span>
            </div>
            <div class="dining-meta-item">
              <span class="meta-label">⏰ ${dict['lbl_hours'] || '営業時間'}</span>
              <span>${cleanHangul(localizedHours, currentLang)}</span>
            </div>
            <div class="dining-meta-item">
              <span class="meta-label">🗣 ${dict['lbl_language'] || '外国語対応'}</span>
              <span>${cleanHangul(localizedLanguage, currentLang)}</span>
            </div>
            <div class="dining-meta-item">
              <span class="meta-label">📞 ${dict['lbl_phone'] || '連絡先'}</span>
              <span>${item.phone}</span>
            </div>
            <div class="dining-meta-item">
              <span class="meta-label">🎫 ${dict['lbl_booking'] || '予約方式'}</span>
              <span>${cleanHangul(localizedBooking, currentLang)}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="dining-footer">
        <a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item.mapQuery)}" target="_blank" rel="noopener noreferrer" class="map-link-btn">
          📍 ${dict['btn_google_map'] || 'Googleマップで見る'}
        </a>
      </div>
    `;
    grid.appendChild(card);
  });
}

function renderGlobalLandmarks(list = GLOBAL_LANDMARKS_DATA) {
  window.currentFilteredLandmarksList = list;
  if (currentLandmarkView === "map") renderLandmarksMap();
  const grid = document.getElementById('globalLandmarksGrid');
  if (!grid) return;
  grid.innerHTML = '';

  const dict = I18N_DICTIONARY[currentLang] || I18N_DICTIONARY['ko'];

  list.forEach(item => {
    const card = document.createElement('div');
    card.className = 'photo-card';

    const info = LANDMARK_I18N_DATA[item.name] || {};
    const localizedName = (info.displayName && info.displayName[currentLang]) || item.name;
    const localizedBadge = (info.badge && info.badge[currentLang]) || item.city;
    const localizedHighlight = (info.highlight && info.highlight[currentLang]) || item.highlight;
    const localizedSeniorAccess = (info.seniorAccess && info.seniorAccess[currentLang]) || item.seniorAccess;
    const localizedHours = (info.hours && info.hours[currentLang]) || item.hours;
    const localizedTicketTip = (info.ticketTip && info.ticketTip[currentLang]) || item.ticketTip;

    card.innerHTML = `
      <div>
        <div class="photo-thumb-wrap">
          <img src="${item.photo}" alt="${localizedName}" class="photo-thumb" loading="lazy" onload="this.classList.add('loaded');this.parentElement.classList.add('loaded');" onerror="this.onerror=null;this.classList.add('loaded');this.parentElement.classList.add('loaded');this.src='https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800&q=80';" />
          <span class="photo-badge photo-badge-orange">${cleanHangul(localizedBadge, currentLang)}</span>
        </div>
        <div class="photo-body">
          <div class="photo-title">${cleanHangul(localizedName, currentLang)}</div>
          <div class="photo-desc">${cleanHangul(localizedHighlight, currentLang)}</div>
          <div class="dining-features">
            <span class="dining-feature-pill" style="background:#e0f2fe;color:#0369a1;border-color:#bae6fd">
              ♿ ${cleanHangul(localizedSeniorAccess, currentLang)}
            </span>
          </div>
          <div class="dining-meta-list">
            <div class="dining-meta-item">
              <span class="meta-label">🎟 ${dict['lbl_admission_from'] || (currentLang === 'en' ? 'Admission (From)' : (currentLang === 'ja' ? '入場料 (From)' : (currentLang === 'zh' ? '门票 (From)' : '입장료 (From)')))}</span>
              <span style="font-weight:700;color:var(--accent);">${formatCardPrice(item.baseKrw, currentCurrency, false)}</span>
            </div>
            <div class="dining-meta-item">
              <span class="meta-label">⏰ ${dict['lbl_hours'] || '営業時間'}</span>
              <span>${cleanHangul(localizedHours, currentLang)}</span>
            </div>
            <div class="dining-meta-item">
              <span class="meta-label">🎟 ${dict['lbl_ticket_tip'] || '予約のヒント'}</span>
              <span>${cleanHangul(localizedTicketTip, currentLang)}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="dining-footer" style="display:flex;gap:8px;">
        <a href="${item.officialUrl}" target="_blank" rel="noopener noreferrer" class="map-link-btn" style="flex:1;text-align:center;background:var(--accent);color:white;border-color:var(--accent)">
          🎟 ${dict['btn_official_tickets'] || '公式チケット予約'}
        </a>
        <a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item.mapQuery)}" target="_blank" rel="noopener noreferrer" class="map-link-btn" style="flex:1;text-align:center;">
          📍 ${dict['btn_map'] || 'マップ'}
        </a>
      </div>
    `;
    grid.appendChild(card);
  });
}

function renderLocalPhrases(filterLang = currentPhraseFilter) {
  currentPhraseFilter = filterLang;
  const container = document.getElementById('localPhrasesGrid');
  if (!container) return;
  container.innerHTML = '';

  const meaningKey = currentLang === 'en' ? 'en_meaning' : (currentLang === 'ja' ? 'ja_meaning' : (currentLang === 'zh' ? 'zh_meaning' : 'ko_meaning'));
  const dict = I18N_DICTIONARY[currentLang] || I18N_DICTIONARY['ko'];

  CLEAN_PHRASES_DATA.forEach(group => {
    if (filterLang !== 'ALL' && group.langGroup !== filterLang) {
      return;
    }

    const regDesc = (REGION_DESC_I18N[group.langGroup] && REGION_DESC_I18N[group.langGroup][currentLang]) || group.regionDesc;
    const langPrefix = group.langName.split(' ')[0];

    group.phrases.forEach(p => {
      const card = document.createElement('div');
      card.className = 'phrase-card';
      const origText = currentLang === 'ko' ? p.original_ko : (currentLang === 'ja' ? p.original_ja : (currentLang === 'en' ? p.original_en : p.original_zh));
      const meaningText = p[meaningKey] || p['ko_meaning'];

      const catBadgeObj = CAT_BADGE_I18N[p.category] || CAT_BADGE_I18N['basic'];
      const catBadge = catBadgeObj[currentLang] || catBadgeObj['ko'];

      let pronText = p.ko_pron;
      if (currentLang === 'ja') pronText = p.ja_pron || p.original;
      else if (currentLang === 'en') pronText = p.en_pron || p.original;
      else if (currentLang === 'zh') pronText = p.zh_pron || p.original;

      card.innerHTML = `
        <div>
          <div class="phrase-header">
            <span class="phrase-badge">${langPrefix} ${catBadge}</span>
            <small style="color:var(--muted);font-size:11px;font-weight:700">${cleanHangul(regDesc, currentLang)}</small>
          </div>
          <div class="phrase-orig">${origText}</div>
          <div class="phrase-pron">🗣 [${cleanHangul(pronText, currentLang)}]</div>
          <div class="phrase-meaning">💡 <strong>${cleanHangul(meaningText, currentLang)}</strong></div>
        </div>
        <button class="phrase-speak-btn" onclick="playVoice('${p.original.replace(/'/g, "\'")}', '${group.locale}')">
          ${dict['btn_listen'] || '🗣 발음 듣기'}
        </button>
      `;
      container.appendChild(card);
    });
  });
}

function filterPhraseLanguage(langCode, btn) {
  document.querySelectorAll('#phraseFilterBar .tab-chip').forEach(c => c.classList.remove('active'));
  if (btn) btn.classList.add('active');
  renderLocalPhrases(langCode);
}

function quickFilterDining(key) {
  document.querySelectorAll('#diningPresetsBar .preset-btn').forEach(btn => {
    btn.classList.toggle('active', btn.textContent.includes(key) || (key === 'ALL' && (btn.textContent.includes('전체') || btn.textContent.includes('すべて') || btn.textContent.includes('All') || btn.textContent.includes('全部'))));
  });

  if (key === 'ALL') {
    const sInput = document.getElementById('globalDiningSearch');
    if (sInput) sInput.value = '';
    renderGlobalDining(GLOBAL_DINING_DATA);
    return;
  }

  const filtered = GLOBAL_DINING_DATA.filter(item => {
    const q = key.toLowerCase();
    const info = DINING_I18N_DATA[item.name] || {};
    const dTitle = (info.dishTitle && info.dishTitle[currentLang]) || item.dishName;
    const rName = (info.displayName && info.displayName[currentLang]) || item.name;
    return item.region.toLowerCase().includes(q) ||
           item.city.toLowerCase().includes(q) ||
           item.dishName.toLowerCase().includes(q) ||
           dTitle.toLowerCase().includes(q) ||
           rName.toLowerCase().includes(q);
  });
  renderGlobalDining(filtered);
}

function filterGlobalDining() {
  const input = document.getElementById('globalDiningSearch');
  if (!input) return;
  const q = input.value.trim().toLowerCase();
  if (!q) {
    renderGlobalDining(GLOBAL_DINING_DATA);
    return;
  }

  const filtered = GLOBAL_DINING_DATA.filter(item => {
    const info = DINING_I18N_DATA[item.name] || {};
    const dTitle = (info.dishTitle && info.dishTitle[currentLang]) || item.dishName;
    const rName = (info.displayName && info.displayName[currentLang]) || item.name;
    const sig = (info.signature && info.signature[currentLang]) || item.signature;
    return item.name.toLowerCase().includes(q) ||
           item.region.toLowerCase().includes(q) ||
           item.city.toLowerCase().includes(q) ||
           item.dishName.toLowerCase().includes(q) ||
           dTitle.toLowerCase().includes(q) ||
           rName.toLowerCase().includes(q) ||
           sig.toLowerCase().includes(q);
  });
  renderGlobalDining(filtered);
}

function filterLandmarks(category, btn) {
  document.querySelectorAll('#landmarkFilterBar .tab-chip').forEach(c => c.classList.remove('active'));
  if (btn) btn.classList.add('active');

  if (category === 'ALL') {
    renderGlobalLandmarks(GLOBAL_LANDMARKS_DATA);
    return;
  }

  const filtered = GLOBAL_LANDMARKS_DATA.filter(item => {
    return item.region === category || item.city.includes(category);
  });
  renderGlobalLandmarks(filtered);
}

let currentActiveRegion = "IBERIA";
let currentStartDateStr = "2026-11-20";
let currentDurationDays = 30;
let currentPacing = "relaxed";

function applyPlanReconfiguration(isUserTriggered = false) {
  const regEl = document.getElementById('userRegionSelect');
  const dateEl = document.getElementById('userStartDate');
  const durEl = document.getElementById('userDurationSelect');
  const pacEl = document.getElementById('userPacingSelect');
  const partyEl = document.getElementById('userPartySize');
  const tierEl = document.getElementById('userTierSelect');

  if (!regEl || !dateEl) return;

  currentActiveRegion = regEl.value;
  try {
    localStorage.setItem('travel_user_region', currentActiveRegion);
    localStorage.setItem('travel_user_duration', String(currentDurationDays));
    localStorage.setItem('travel_user_start_date', currentStartDateStr);
    localStorage.setItem('travel_user_party', String(partySize));
    localStorage.setItem('travel_user_tier', tier);
    localStorage.setItem('travel_user_pacing', currentPacing);
  } catch(e) {}

  currentStartDateStr = dateEl.value || "2026-11-20";
  currentDurationDays = durEl ? parseInt(durEl.value, 10) : 30;
  currentPacing = pacEl ? pacEl.value : "relaxed";
  const partySize = partyEl ? parseInt(partyEl.value, 10) : 3;
  const tier = tierEl ? tierEl.value : "standard";

  const planMeta = REGIONAL_PLANS[currentActiveRegion] || REGIONAL_PLANS["IBERIA"];
  const dict = I18N_DICTIONARY[currentLang] || I18N_DICTIONARY['ko'];

  // 동적 예산 실시간 계산
  const budgetData = calculateDynamicBudget(currentActiveRegion, currentDurationDays, partySize, tier);
  const formattedGrandTotal = formatMoney(budgetData.total, currentCurrency);

  // 도시 필터 탭 바 갱신
  renderCityFilterTabs();

  // 토스트 알림 (사용자가 직접 버튼 클릭했을 때)
  if (isUserTriggered) {
    const toastMsg = dict['toast_plan_recalc'] || '✅ 일정이 성공적으로 재조정되었습니다!';
    showToast(toastMsg);
  }

  // Update KPIs
  const scoreMap = {
    ko: { score: '94점 (골든 창)', season: '11월 숄더 시즌 · 대기열 짧고 쾌적', festVal: '4개 축제 연계', festSub: '크리스마스 조명 & 전통 마켓 매칭', seniorVal: '1.5 스팟 / 일', seniorSub: '13:00~15:30 온수 샤워 낮잠 슬롯' },
    ja: { score: '94点（ゴールデンウィンドウ）', season: '11月ショルダーシーズン・混雑少なく温暖な気候', festVal: '4大フェスティバル連携', festSub: 'クリスマスイルミネーション＆伝統マーケット連携', seniorVal: '1.5 スポット / 日', seniorSub: '13:00〜15:30 温水シャワー＆シエスタ休息' },
    en: { score: '94 Pts (Golden Window)', season: 'Nov Shoulder Season · Mild Weather & Low Crowds', festVal: '4 Key Festivals Linked', festSub: 'Christmas Lights & Traditional Markets Matched', seniorVal: '1.5 Spots / Day', seniorSub: '13:00–15:30 Warm Shower & Siesta Recharge' },
    zh: { score: '94分（黄金出行期）', season: '11月平季 · 人流稀少且气候温和', festVal: '联动 4 大节庆活动', festSub: '圣诞灯光秀与传统市集精准匹配', seniorVal: '1.5 景点 / 天', seniorSub: '13:00~15:30 热水澡与午休西斯塔时段' }
  };
  const cScore = scoreMap[currentLang] || scoreMap['ko'];
  const elScore = document.getElementById('kpiScoreText');
  const elSeason = document.getElementById('kpiSeasonText');
  const elBudgetText = document.getElementById('kpiBudgetText');
  const elBudgetSub = document.getElementById('kpiBudgetSub');
  const elFestVal = document.getElementById('kpiFestText');
  const elFestSub = document.getElementById('kpiFestSub');
  const elSeniorVal = document.getElementById('kpiSeniorVal');
  const elSeniorSub = document.getElementById('kpiSeniorSub');
  if (elScore) elScore.textContent = cScore.score;
  if (elSeason) elSeason.textContent = cScore.season;
  if (elBudgetText) elBudgetText.textContent = formattedGrandTotal;
  if (elBudgetSub) {
    const tierMap = {
      luxury: { ko: '프리미엄 럭셔리', en: 'Luxury Tier', ja: 'ラグジュアリー', zh: '奢华档次' },
      economy: { ko: '실속 알뜰형', en: 'Economy Tier', ja: '節約エコノミー', zh: '经济实惠档' },
      standard: { ko: '4성급 표준', en: '4-Star Standard', ja: '4つ星標準', zh: '4星标准' }
    };
    const tObj = tierMap[tier] || tierMap.standard;
    const tierLabel = tObj[currentLang] || tObj.ko;
    const partyLabel = currentLang === 'en' ? `${partySize} People` : (currentLang === 'ja' ? `${partySize}名` : (currentLang === 'zh' ? `${partySize}人` : `${partySize}인`));
    const dayLabel = currentLang === 'en' ? `${currentDurationDays} Days` : (currentLang === 'ja' ? `${currentDurationDays}日` : (currentLang === 'zh' ? `${currentDurationDays}天` : `${currentDurationDays}일`));
    elBudgetSub.textContent = `${partyLabel} · ${dayLabel} · ${tierLabel} (${currentCurrency})`;
  }
  if (elFestVal) elFestVal.textContent = cScore.festVal;
  if (elFestSub) elFestSub.textContent = cScore.festSub;
  if (elSeniorVal) elSeniorVal.textContent = cScore.seniorVal;
  if (elSeniorSub) elSeniorSub.textContent = cScore.seniorSub;

  // Build Day Cards
  const timelineGrid = document.getElementById('timelineGrid') || document.getElementById('dynamicTimelineContainer');
  if (!timelineGrid) return;
  timelineGrid.innerHTML = '';

  const rawDays = planMeta.days || [];
  const totalDays = Math.min(currentDurationDays, rawDays.length);
  const startD = new Date(currentStartDateStr);

  const weekdaysMap = {
    'ko': ["일", "월", "화", "수", "목", "금", "토"],
    'ja': ["日", "月", "火", "水", "木", "金", "土"],
    'en': ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    'zh': ["周日", "周一", "周二", "周三", "周四", "周五", "周六"]
  };
  const weekdays = weekdaysMap[currentLang] || weekdaysMap['ko'];

  const filterCityName = window.currentCityFilter || 'ALL';
  const planI18nList = PLANS_DAYS_I18N_DATA[currentActiveRegion] || [];

  const activeOrder = getActiveTimelineOrder(totalDays);

  for (let slotIdx = 0; slotIdx < totalDays; slotIdx++) {
    const originalDayIndex = activeOrder[slotIdx] !== undefined ? activeOrder[slotIdx] : slotIdx;
    const dItem = rawDays[originalDayIndex] || rawDays[slotIdx];
    if (!dItem) continue;

    if (filterCityName !== 'ALL' && !dItem.city.includes(filterCityName)) {
      continue;
    }

    const curD = new Date(startD);
    curD.setDate(startD.getDate() + slotIdx);
    const dateFormatted = `${curD.getFullYear()}-${String(curD.getMonth() + 1).padStart(2, '0')}-${String(curD.getDate()).padStart(2, '0')}`;
    const dow = weekdays[curD.getDay()];

    const dayI18n = planI18nList[originalDayIndex] || null;
    const localizedTheme = dayI18n ? dayI18n.theme[currentLang] : dItem.theme;
    const localizedMorning = dayI18n ? dayI18n.morning[currentLang] : dItem.morning;
    const localizedRest = dayI18n ? dayI18n.rest[currentLang] : dItem.rest;
    const localizedEvening = dayI18n ? dayI18n.evening[currentLang] : dItem.evening;
    const localizedWalk = dayI18n ? dayI18n.walk[currentLang] : (dItem.walk || '낮음');
    const localizedTransport = dayI18n ? dayI18n.transport[currentLang] : (dItem.transport || 'Uber XL');
    const localizedMeal = dayI18n ? dayI18n.meal[currentLang] : (dItem.meal || '현지 미식');
    const localizedCity = dayI18n ? dayI18n.city[currentLang] : dItem.city;

    const eventBadges = dayI18n && dayI18n.events[currentLang]
      ? dayI18n.events[currentLang].map(e => `<span class="event-pill">${cleanHangul(e, currentLang)}</span>`).join(' ')
      : '';

    const card = document.createElement('div');
    card.className = `day-card ${dItem.isTransfer ? 'transfer' : ''}`;
    card.setAttribute('draggable', 'true');
    card.setAttribute('data-card-index', slotIdx);
    card.addEventListener('dragstart', (e) => handleTimelineDragStart(e, slotIdx));
    card.addEventListener('dragover', (e) => handleTimelineDragOver(e));
    card.addEventListener('dragenter', (e) => handleTimelineDragEnter(e, card));
    card.addEventListener('dragleave', (e) => handleTimelineDragLeave(e, card));
    card.addEventListener('drop', (e) => handleTimelineDrop(e, slotIdx));
    card.addEventListener('dragend', (e) => handleTimelineDragEnd(e));

    const transferBadgeLabel = dict['lbl_transfer_day'] || '거점이동일';
    const morningTitle = dict['timeline_morning_title'] || '오전: 핵심 문화 산책 (피로도 낮음)';
    const restTitle = dict['timeline_rest_title'] || '오후: 필수 휴식 (시에스타 충전)';
    const eveningTitle = dict['timeline_evening_title'] || '저녁: 야경 감상 & 가벼운 식사';

    card.innerHTML = `
      <div class="day-meta">
        <div class="day-num">DAY ${slotIdx + 1}</div>
        <div class="day-date">${dateFormatted} (${dow})</div>
        <span class="city-tag">${cleanHangul(localizedCity, currentLang)}</span>
        <div class="timeline-drag-handle" title="${currentLang === 'en' ? 'Drag to reorder day schedule' : (currentLang === 'ja' ? 'ドラッグして日程の順序を変更' : (currentLang === 'zh' ? '拖拽调整日程顺序' : '드래그하여 일정 순서 변경'))}">${currentLang === 'en' ? '⋮⋮ Drag to reorder' : (currentLang === 'ja' ? '⋮⋮ ドラッグ移動' : (currentLang === 'zh' ? '⋮⋮ 拖拽排序' : '⋮⋮ 드래그 이동'))}</div>
        ${dItem.isTransfer ? `<div class="transfer-badge">${transferBadgeLabel}</div>` : ''}
      </div>
      <div class="day-body">
        <h3>${cleanHangul(localizedTheme, currentLang)} ${eventBadges}</h3>
        <div class="routine-grid">
          <div class="routine-cell cell-morning">
            <div class="cell-title">${morningTitle}</div>
            <p>${cleanHangul(localizedMorning, currentLang)}</p>
          </div>
          <div class="routine-cell cell-rest">
            <div class="cell-title">${restTitle}</div>
            <p>${cleanHangul(localizedRest, currentLang)}</p>
          </div>
          <div class="routine-cell cell-evening">
            <div class="cell-title">${eveningTitle}</div>
            <p>${cleanHangul(localizedEvening, currentLang)}</p>
          </div>
        </div>
        <div class="meta-bottom">
          <div class="meta-item">
            <span class="meta-label">🚶 ${dict['timeline_walk_burden'] || '보행 강도'}</span>
            <span>${cleanHangul(localizedWalk, currentLang)}</span>
          </div>
          <div class="meta-item">
            <span class="meta-label">🚗 ${dict['timeline_transport'] || '이동 수단'}</span>
            <span>${cleanHangul(localizedTransport, currentLang)}</span>
          </div>
          <div class="meta-item">
            <span class="meta-label">🍽 ${dict['timeline_recommended_meal'] || '추천 식사'}</span>
            <span>${cleanHangul(localizedMeal, currentLang)}</span>
          </div>
        </div>
      </div>
    `;
    timelineGrid.appendChild(card);
  }
}

function filterTimelineCity(cityName, btn) {
  window.currentCityFilter = cityName;
  document.querySelectorAll('#dynamicCityFilterBar .tab-chip, #cityFilterTabs .tab-chip').forEach(c => c.classList.remove('active'));
  if (btn) btn.classList.add('active');
  applyPlanReconfiguration(false);
}

// ========================================================
// [CHATBOT I18N] Multi-Language UI & Knowledge Dictionary
// ========================================================


function updateChatbotLanguage(lang) {
  const l = (lang || window.currentLang || 'ko').toLowerCase();
  const dict = CHATBOT_I18N[l] || CHATBOT_I18N['ko'];

  // 1. Update Title & Status
  const titleEl = document.querySelector('.chat-bot-title');
  if (titleEl) titleEl.textContent = dict.title;
  const statusEl = document.querySelector('.chat-bot-status');
  if (statusEl) statusEl.innerHTML = `<span class="status-indicator"></span>${dict.status}`;

  // 2. Update Input Placeholder
  const inputEl = document.getElementById('chatInput');
  if (inputEl) inputEl.placeholder = dict.placeholder;

  // 3. Update Toggle Button Tooltip
  const toggleBtn = document.getElementById('btnChatToggle');
  if (toggleBtn) toggleBtn.title = dict.tooltip;

  // 4. Update Quick Chips Bar
  const quickBar = document.querySelector('.chat-quick-bar');
  if (quickBar && dict.chips) {
    let chipsHtml = '';
    dict.chips.forEach(c => {
      chipsHtml += `<button type="button" class="chat-quick-chip" onclick="handleQuickChatChip('${escapeHtml(c.q)}')">${c.text}</button>\n`;
    });
    quickBar.innerHTML = chipsHtml;
  }

  // 5. Update initial welcome message if only 1 message exists
  const msgContainer = document.getElementById('chatMessages');
  if (msgContainer) {
    const msgs = msgContainer.querySelectorAll('.chat-msg');
    if (msgs.length <= 1) {
      msgContainer.innerHTML = `
        <div class="chat-msg bot-msg">
          <div class="msg-avatar">🤖</div>
          <div class="msg-bubble">${dict.welcome}</div>
        </div>
      `;
    }
  }
}

// Detect language of user query or fall back to active UI language
function getEffectiveLang(query) {
  const q = (query || '').trim();
  if (/[\u3040-\u30ff]/.test(q)) return 'ja';
  if (/[\uac00-\ud7a3]/.test(q)) return 'ko';
  if (/[\u4e00-\u9fa5]/.test(q) && !/[\u3040-\u30ff]/.test(q)) return 'zh';
  if (/^[a-zA-Z0-9\s.,?!'"`~@#$%^&*()_\-+=\[\]{}|\\;:\/<>]+$/.test(q) && /[a-zA-Z]{2,}/.test(q)) {
    return 'en';
  }
  return (window.currentLang || 'ko').toLowerCase();
}

function escapeHtml(str) {
  if (str === null || str === undefined) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function openChatWindow() {
  const win = document.getElementById('chatWindow');
  const btn = document.getElementById('btnChatToggle');
  if (!win) return;
  win.classList.add('active');
  win.style.setProperty('display', 'flex', 'important');
  win.setAttribute('aria-hidden', 'false');
  if (btn) {
    btn.classList.add('hidden');
    btn.style.setProperty('display', 'none', 'important');
  }
  const input = document.getElementById('chatInput');
  if (input) setTimeout(() => input.focus(), 150);
  scrollChatToBottom();
}

function closeChatWindow() {
  const win = document.getElementById('chatWindow');
  const btn = document.getElementById('btnChatToggle');
  if (!win) return;
  win.classList.remove('active');
  win.style.setProperty('display', 'none', 'important');
  win.setAttribute('aria-hidden', 'true');
  if (btn) {
    btn.classList.remove('hidden');
    btn.style.setProperty('display', 'flex', 'important');
  }
}

function toggleChatWindow() {
  const win = document.getElementById('chatWindow');
  if (!win) return;
  const isHidden = !win.classList.contains('active') && (win.style.display === 'none' || !win.style.display);
  if (isHidden) {
    openChatWindow();
  } else {
    closeChatWindow();
  }
}

// Ensure global accessibility
window.openChatWindow = openChatWindow;
window.closeChatWindow = closeChatWindow;
window.toggleChatWindow = toggleChatWindow;

function handleQuickChatChip(query) {
  window.handleQuickChatChip = handleQuickChatChip;
  const input = document.getElementById('chatInput');
  if (input) input.value = query;
  sendChatMessage();
}

function sendChatMessage() {
  try {
    const input = document.getElementById('chatInput');
    if (!input) return;
    const q = input.value.trim();
    if (!q) return;
    input.value = '';

    // 1. Render User Message Bubble
    appendUserBubble(q);
    scrollChatToBottom();

    // 2. Show Typing Indicator
    showTypingIndicator();
    scrollChatToBottom();

    // 3. Process match and render response after ~500ms
    setTimeout(() => {
      try {
        removeTypingIndicator();
        const botResponseHtml = handleLocalChat(q);
        appendBotBubble(botResponseHtml);
        scrollChatToBottom();
      } catch (err) {
        console.error("Chatbot processing error:", err);
        removeTypingIndicator();
        appendBotBubble("I am your local AI companion. Please ask about Portugal/Spain weather, Dubai dining, senior access, or trip budget! ✨");
        scrollChatToBottom();
      }
    }, 500);
  } catch (err) {
    console.error("sendChatMessage error:", err);
  }
}

function appendUserBubble(text) {
  const container = document.getElementById('chatMessages');
  if (!container) return;
  const div = document.createElement('div');
  div.className = 'chat-msg user-msg';
  div.innerHTML = `<div class="msg-bubble">${escapeHtml(text)}</div>`;
  container.appendChild(div);
}

function showTypingIndicator() {
  removeTypingIndicator();
  const container = document.getElementById('chatMessages');
  if (!container) return;
  const div = document.createElement('div');
  div.id = 'chatTypingIndicator';
  div.className = 'chat-msg bot-msg typing-msg';
  div.innerHTML = `
    <div class="msg-avatar">🤖</div>
    <div class="msg-bubble typing-bubble">
      <span></span><span></span><span></span>
    </div>
  `;
  container.appendChild(div);
}

function removeTypingIndicator() {
  const el = document.getElementById('chatTypingIndicator');
  if (el) el.remove();
}

function appendBotBubble(htmlContent) {
  const container = document.getElementById('chatMessages');
  if (!container) return;
  const div = document.createElement('div');
  div.className = 'chat-msg bot-msg';
  div.innerHTML = `
    <div class="msg-avatar">🤖</div>
    <div class="msg-bubble">${htmlContent}</div>
  `;
  container.appendChild(div);
}

function scrollChatToBottom() {
  const container = document.getElementById('chatMessages');
  if (container) {
    container.scrollTop = container.scrollHeight;
  }
}



function switchLanguage(lang, btn) {
  currentLang = lang;
  document.querySelectorAll('.lang-pill').forEach(b => b.classList.remove('active'));
  if (btn) {
    btn.classList.add('active');
  } else {
    const targetBtn = Array.from(document.querySelectorAll('.lang-pill')).find(b => b.textContent.includes(lang.toUpperCase()) || (lang === 'ko' && (b.textContent.includes('한국어') || b.textContent.includes('韓国語') || b.textContent.includes('Korean') || b.textContent.includes('韩语'))));
    if (targetBtn) targetBtn.classList.add('active');
  }

  document.documentElement.lang = lang;

  // 1) 페이지 타이틀 갱신
  if (typeof DOC_TITLES !== 'undefined' && DOC_TITLES[lang]) {
    document.title = DOC_TITLES[lang];
  }

  // 2) Hero 및 섹션 1~10 에디토리얼 전체 교체
  const edContainer = document.getElementById('editorialGuideContainer');
  if (edContainer && typeof EDITORIAL_SECTIONS_HTML !== 'undefined' && EDITORIAL_SECTIONS_HTML[lang]) {
    edContainer.innerHTML = EDITORIAL_SECTIONS_HTML[lang];
  }

  // 3) 푸터 번역 갱신
  const footEl = document.getElementById('mainFooterText');
  if (footEl && typeof FOOTER_TRANSLATIONS !== 'undefined' && FOOTER_TRANSLATIONS[lang]) {
    footEl.innerHTML = FOOTER_TRANSLATIONS[lang];
  }

  // 4) data-i18n 요소 텍스트 갱신
  const dict = I18N_DICTIONARY[lang] || I18N_DICTIONARY['ko'];
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key]) {
      el.innerHTML = dict[key];
    }
  });

  // 5) 한국어 버튼 텍스트 현지화
  const koBtn = document.getElementById('btnLangKo');
  if (koBtn) {
    if (lang === 'ko') koBtn.textContent = '한국어 (KO)';
    else if (lang === 'ja') koBtn.textContent = '韓国語 (KO)';
    else if (lang === 'en') koBtn.textContent = 'Korean (KO)';
    else if (lang === 'zh') koBtn.textContent = '韩语 (KO)';
  }

  // 6) 검색창 placeholder 갱신
  const sInput = document.getElementById('globalDiningSearch');
  if (sInput && dict['dining_search_ph']) {
    sInput.placeholder = dict['dining_search_ph'];
  }
  const aiInput = document.getElementById('aiDirectSearchInput');
  if (aiInput && dict['ai_search_ph']) {
    aiInput.placeholder = dict['ai_search_ph'];
  }

  // 7) 플래너 드롭다운 갱신
  renderPlannerDropdownOptions();

  // 8) 프리셋 바 및 필터 탭 갱신
  renderDiningPresets();
  renderLandmarkFilterTabs();
  renderPhraseFilterTabs();
  renderAiSearchPresets();

  // 9) 동적 섹션 전체 재렌더링
  applyPlanReconfiguration(false);
  renderGlobalDining();
  renderGlobalLandmarks();
  renderLocalPhrases();
  renderTransitGuide();
  renderHotelFilterBar();
  renderHotelsGrid();

  // 10) 서브탭 및 섹션 16 텍스트 갱신
  const subBtnT = document.getElementById('tabBtnTransitGuide');
  const subBtnH = document.getElementById('tabBtnHotelGuide');
  if (subBtnT && typeof HOTEL_I18N_LABELS !== 'undefined') {
    subBtnT.textContent = HOTEL_I18N_LABELS.subTabTransit[lang] || HOTEL_I18N_LABELS.subTabTransit.ko;
  }
  if (subBtnH && typeof HOTEL_I18N_LABELS !== 'undefined') {
    subBtnH.textContent = HOTEL_I18N_LABELS.subTabHotels[lang] || HOTEL_I18N_LABELS.subTabHotels.ko;
  }
  const sTitle = document.getElementById('transitSectionTitle');
  const sSub = document.getElementById('transitSectionSub');
  if (sTitle && dict['transit_hotels_title']) sTitle.textContent = dict['transit_hotels_title'];
  if (sSub && dict['transit_hotels_sub']) sSub.textContent = dict['transit_hotels_sub'];

  // 11) 인터랙티브 체크리스트 상태 복원
  initInteractiveChecklist();

  // 12) 사용자 언어 저장
  try { localStorage.setItem('travel_user_lang', lang); } catch(e) {}
  // 13) Chatbot Language Sync
  if (typeof updateChatbotLanguage === 'function') {
    updateChatbotLanguage(lang);
  }

  // 14) View Toggle Buttons, Counts & Controls localization
  const btnDList = document.getElementById('btnDiningListView');
  const btnDMap = document.getElementById('btnDiningMapView');
  const btnLList = document.getElementById('btnLandmarkListView');
  const btnLMap = document.getElementById('btnLandmarkMapView');
  const dCount = document.getElementById('diningViewCountText');
  const lCount = document.getElementById('landmarkViewCountText');
  const btnClear = document.getElementById('btnDiningClear');
  const btnTop = document.getElementById('btnBackToTop');
  const btnChat = document.getElementById('btnChatToggle');
  const btnSend = document.getElementById('btnChatSend');

  const vTexts = {
    ko: { list: '📋 리스트 뷰', map: '🗺 지도 뷰 (Leaflet Map)', dCount: '전 세계 95대 검증 맛집 리스트', lCount: '전 세계 80대 핵심 랜드마크', clear: '검색어 초기화', top: '맨 위로 이동', chat: 'AI 여행 챗봇 열기', send: '전송' },
    ja: { list: '📋 リスト表示', map: '🗺 地図表示 (Leaflet Map)', dCount: '世界95選 厳選グルメ＆名店リスト', lCount: '世界80選 必訪ランドマーク', clear: '検索ワードをクリア', top: 'トップへ戻る', chat: 'AI旅行コンシェルジュを開く', send: '送信' },
    en: { list: '📋 List View', map: '🗺 Map View (Leaflet Map)', dCount: 'Global Curated 95 Dining Spots', lCount: 'Global Top 80 Essential Landmarks', clear: 'Clear search', top: 'Back to top', chat: 'Open AI Travel Assistant', send: 'Send' },
    zh: { list: '📋 列表视图', map: '🗺 地图视图 (Leaflet Map)', dCount: '全球精选95家特色餐厅名录', lCount: '全球80处必游核心地标', clear: '清空搜索', top: '返回顶部', chat: '打开AI旅行助手', send: '发送' }
  };
  const vt = vTexts[lang] || vTexts['ko'];
  if (btnDList) btnDList.textContent = vt.list;
  if (btnDMap) btnDMap.textContent = vt.map;
  if (btnLList) btnLList.textContent = vt.list;
  if (btnLMap) btnLMap.textContent = vt.map;
  if (dCount) dCount.textContent = vt.dCount;
  if (lCount) lCount.textContent = vt.lCount;
  if (btnClear) btnClear.title = vt.clear;
  if (btnTop) { btnTop.title = vt.top; btnTop.setAttribute('aria-label', vt.top); }
  if (btnChat) { btnChat.title = vt.chat; btnChat.setAttribute('aria-label', vt.chat); }
  if (btnSend) { btnSend.title = vt.send; btnSend.setAttribute('aria-label', vt.send); }
}

function playVoice(text, locale) {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    const cleanText = text.replace(/\(.*?\)/g, '').trim();
    const u = new SpeechSynthesisUtterance(cleanText);
    u.lang = locale;
    u.rate = 0.85;
    window.speechSynthesis.speak(u);
  } else {
    alert(text);
  }
}

function executeAiSearch(engine = 'google') {
  executeLiveSearch(engine);
}

function executeLiveSearch(engine = 'google') {
  const input = document.getElementById('aiDirectSearchInput');
  const rawQ = input ? input.value.trim() : '';
  const q = rawQ || (currentLang === 'en' ? 'Dubai and Europe family travel 2026' : (currentLang === 'ja' ? 'ドバイとヨーロッパ 家族旅行 2026' : (currentLang === 'zh' ? '迪拜与欧洲家庭旅行 2026' : '두바이 및 유럽 시니어 가족 여행 2026')));
  
  const engineTitle = engine === 'perplexity' ? 'Perplexity AI' : 'Google 실시간 검색';
  showToast(`🔍 ${engineTitle} 검색을 시작합니다: <strong>${q.slice(0, 22)}${q.length > 22 ? '...' : ''}</strong>`);

  let url = '';
  if (engine === 'google') {
    url = `https://www.google.com/search?q=${encodeURIComponent(q + ' 2026')}`;
  } else if (engine === 'perplexity') {
    url = `https://www.perplexity.ai/search?q=${encodeURIComponent(q + ' 2026 family travel guide')}`;
  }
  const newWin = window.open(url, '_blank', 'noopener,noreferrer');
  if (!newWin || newWin.closed || typeof newWin.closed === 'undefined') {
    window.location.href = url;
  }
}

function fillAndSearch(keyword) {
  const input = document.getElementById('aiDirectSearchInput');
  if (input) {
    input.value = keyword;
    const clearBtn = document.getElementById('btnAiClear');
    if (clearBtn) clearBtn.style.display = 'inline-flex';
    executeLiveSearch('perplexity');
  }
}

function downloadCustomCalendarIcs() {
  const plan = REGIONAL_PLANS[currentActiveRegion] || REGIONAL_PLANS["IBERIA"];
  const totalDays = Math.min(currentDurationDays, plan.days.length);
  const startD = new Date(currentStartDateStr);

  let icsLines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Slow Travel Global Edition//KR",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH"
  ];

  for (let i = 0; i < totalDays; i++) {
    const dItem = plan.days[i];
    const curD = new Date(startD);
    curD.setDate(startD.getDate() + i);
    const dStr = curD.toISOString().slice(0, 10).replace(/-/g, "");

    icsLines.push("BEGIN:VEVENT");
    icsLines.push(`UID:slowtravel-${currentActiveRegion}-${i+1}-${dStr}@familytravel.com`);
    icsLines.push(`DTSTAMP:${dStr}T090000Z`);
    icsLines.push(`DTSTART;VALUE=DATE:${dStr}`);
    icsLines.push(`SUMMARY:[Day ${i+1}] ${dItem.city} - ${dItem.theme}`);
    icsLines.push(`DESCRIPTION:${dItem.theme}\n오후: ${dItem.rest}\n저녁: ${dItem.evening}\n보행: ${dItem.walk}`);
    icsLines.push("END:VEVENT");
  }

  icsLines.push("END:VCALENDAR");

  const blob = new Blob([icsLines.join("\r\n")], { type: "text/calendar;charset=utf-8" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `SlowTravel_${currentActiveRegion}_${currentStartDateStr}_${totalDays}Days.ics`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  const dict = I18N_DICTIONARY[currentLang] || I18N_DICTIONARY['ko'];
  showToast(dict['toast_cal_download'] || '📅 맞춤 캘린더(.ics) 다운로드가 완료되었습니다!');
}

window.addEventListener('DOMContentLoaded', () => {
  loadUserPreferences();
  registerPWAOfflineWorker();
  initInteractiveChecklist();
  renderDiningPresets();
  renderLandmarkFilterTabs();
  renderPhraseFilterTabs();
  renderAiSearchPresets();
  applyPlanReconfiguration(false);
  renderGlobalDining();
  renderGlobalLandmarks();
  renderLocalPhrases();
  renderTransitGuide();
  renderHotelFilterBar();
  renderHotelsGrid('ALL');
});


// ========================================================
// ========================================================
// [CHAT ENGINE] Multi-Language Intelligent Knowledge Matcher
// ========================================================

function handleLocalChat(query) {
  const rawQ = (query || '').trim();
  const q = rawQ.toLowerCase();
  const lang = getEffectiveLang(rawQ);

  // ----------------------------------------------------
  // Normalize Conversational Prefixes & Follow-up phrasing
  // ----------------------------------------------------
  const cleanQ = q
    .replace(/^(how about the routes from|how about routes from|how about the route from|how about routes between|how about the route between|how about the route|how about routes|how about from|how about to|how about|what about the routes from|what about routes from|what about the route from|what about the route|what about routes|what about from|what about to|what about|how to get from|how do i get from|how to go from|how do i travel from|and how about|tell me about|can you tell me about|show me the route from|show me routes from)\s+/i, '')
    .replace(/^(그럼|그리고|혹시|그러면|저기|대체|그런데|참고로|다음으로|다음은|그 다음|그 다음은)\s+/g, '')
    .replace(/^(じゃあ|ところで|それでは|では|あと|ちなみに|次は|続いて)\s*/g, '')
    .replace(/^(那么|那|请问|还有|另外|顺便问下|接下来|请讲讲)\s*/g, '')
    .trim();

  // Helper for quick follow-up chips generator
  function renderFollowupChips(chips) {
    if (!chips || !chips.length) return '';
    const label = lang === 'ja' ? '💡 続けてよくある質問:' : (lang === 'en' ? '💡 Popular Follow-up Questions:' : (lang === 'zh' ? '💡 接下来您可以追问：' : '💡 이어지는 추천 질문:'));
    let html = `<div style="margin-top:13px;border-top:1px dashed var(--line);padding-top:8px;">`;
    html += `<div style="font-size:11px;color:var(--muted);font-weight:700;margin-bottom:6px;">${label}</div>`;
    html += `<div style="display:flex;flex-wrap:wrap;gap:5px;">`;
    chips.forEach(c => {
      const qText = cleanHangul(c.query || '', lang);
      const lText = cleanHangul(c.label || '', lang);
      const escaped = qText.replace(/'/g, "\\'");
      html += `<button type="button" class="chat-quick-chip" onclick="handleQuickChatChip('${escaped}')">${lText}</button>`;
    });
    html += `</div></div>`;
    return html;
  }

  // ----------------------------------------------------
  // Helper: Card generator for restaurants
  // ----------------------------------------------------
  function renderMatchingDiningCards(cityOrCountryKeyword) {
    if (typeof GLOBAL_DINING_DATA === 'undefined' || !GLOBAL_DINING_DATA.length) return '';
    const kw = cityOrCountryKeyword.toLowerCase();
    const matched = GLOBAL_DINING_DATA.filter(d => {
      const c = (d.city || '').toLowerCase();
      const r = (d.region || '').toLowerCase();
      const cntry = (d.country || '').toLowerCase();
      const n = (d.name || '').toLowerCase();
      return c.includes(kw) || r.includes(kw) || cntry.includes(kw) || n.includes(kw);
    });
    if (!matched.length) return '';
    const shuffled = [...matched].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 2);

    let html = `<div style="margin-top:14px;font-weight:700;font-size:12.5px;color:var(--ink);">`;
    if (lang === 'ja') html += `🍽️ <strong>現地のおすすめ厳選名店ピックアップ:</strong></div>`;
    else if (lang === 'en') html += `🍽️ <strong>Handpicked Local Restaurant Recommendations:</strong></div>`;
    else if (lang === 'zh') html += `🍽️ <strong>为您精选当地特色名店推荐:</strong></div>`;
    else html += `🍽️ <strong>현지 추천 대표 맛집 엄선 리스트:</strong></div>`;

    selected.forEach(d => {
      const price = (typeof formatCardPrice === 'function' && d.baseKrw) ? formatCardPrice(d.baseKrw) : (d.baseKrw ? '₩' + Number(d.baseKrw).toLocaleString() : 'From €25');
      const tipLabel = lang === 'ja' ? 'シニア安心ポイント' : (lang === 'en' ? 'Senior Comfort Tip' : (lang === 'zh' ? '长辈无障碍贴士' : '어르신 안심 팁'));
      const mapLabel = lang === 'ja' ? 'Googleマップで見る' : (lang === 'en' ? 'View on Google Maps' : (lang === 'zh' ? '谷歌地图导航' : '구글 지도 길찾기'));

      const dInfo = (typeof DINING_I18N_DATA !== 'undefined' && DINING_I18N_DATA[d.name]) || {};
      const localizedName = (dInfo.displayName && dInfo.displayName[lang]) || d.name;
      const localizedCity = cleanHangul(d.city, lang);
      const localizedDish = (dInfo.dishTitle && dInfo.dishTitle[lang]) || cleanHangul(d.dishName || d.signature, lang);
      const localizedSeniorTip = (dInfo.seniorTip && dInfo.seniorTip[lang]) || cleanHangul(d.seniorTip, lang);

      html += `
        <div class="chat-card-recommend" style="margin-top:8px;">
          <div class="chat-card-img" style="background-image:url('${d.photo || ''}')">
            <span class="chat-card-tag">${localizedCity}</span>
          </div>
          <div class="chat-card-content">
            <div class="chat-card-title">${localizedName}</div>
            <div class="chat-card-dish">🍽️ ${localizedDish}</div>
            <div class="chat-card-price">💵 ${price}</div>
            <div class="chat-card-tip">👵 <strong>${tipLabel}:</strong> ${localizedSeniorTip}</div>
            <a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(d.mapQuery || d.name)}" target="_blank" rel="noopener" class="chat-card-link">📍 ${mapLabel}</a>
          </div>
        </div>
      `;
    });
    return html;
  }

  // ----------------------------------------------------
  // 1. ENTITY DETECTION (목적지 / 국가 / 도시 식별)
  // ----------------------------------------------------
  const hasBarcelona = ['barcelona', 'bcn', '바르셀로나', 'バルセロナ', '巴塞罗那'].some(w => q.includes(w) || cleanQ.includes(w));
  const hasMadrid = ['madrid', '마드리드', 'マドリード', '马德里'].some(w => q.includes(w) || cleanQ.includes(w));
  const hasSeville = ['seville', 'sevilla', '세비야', 'セビリア', '塞维利亚'].some(w => q.includes(w) || cleanQ.includes(w));
  const hasGranada = ['granada', '그라나다', 'グラナダ', '格拉纳达'].some(w => q.includes(w) || cleanQ.includes(w));
  const hasCordoba = ['cordoba', 'córdoba', '코르도바', 'コルドバ', '科尔多瓦'].some(w => q.includes(w) || cleanQ.includes(w));
  const hasLisbon = ['lisbon', 'lisboa', '리스본', 'リスボン', '里斯本'].some(w => q.includes(w) || cleanQ.includes(w));
  const hasPorto = ['porto', '포르투', 'ポルト', '波尔图'].some(w => q.includes(w) || cleanQ.includes(w));
  const hasSintra = ['sintra', '신트라', 'シントラ', '辛特拉'].some(w => q.includes(w) || cleanQ.includes(w));
  const hasDubai = ['dubai', 'uae', 'emirates', '두바이', '아랍에미리트', 'ドバイ', '迪拜', '阿联酋'].some(w => q.includes(w) || cleanQ.includes(w));
  const hasAbuDhabi = ['abu dhabi', 'abudhabi', '아부다비', 'アブダビ', '阿布扎比'].some(w => q.includes(w) || cleanQ.includes(w));

  const isPortugal = ['portugal', 'algarve', '포르투갈', '알가르베', 'ポルトガル', '葡萄牙'].some(w => q.includes(w)) || hasLisbon || hasPorto || hasSintra;
  const isDubai = ['dubai', 'uae', 'emirates', '두바이', '아랍에미리트', 'ドバイ', '迪拜', '阿联酋', '아부다비', 'abu dhabi', 'アブダビ', '阿布扎比'].some(w => q.includes(w) || cleanQ.includes(w)) || hasDubai || hasAbuDhabi;
  const isSpain = ['spain', 'andalusia', '스페인', '안달루시아', 'スペイン', '西班牙'].some(w => q.includes(w)) || hasBarcelona || hasMadrid || hasSeville || hasGranada || hasCordoba;

  // Route & Transit Intent Keywords
  const hasRouteKeyword = [
    'route', 'routes', 'from', 'to', 'between', 'travel', 'transit', 'train', 'bus', 'flight',
    'how to get', 'how to go', 'how do i get', 'how do i go', 'getting from', 'going from', 'trip from',
    'direction', 'directions', 'distance', 'way to', 'journey', 'connection', 'drive',
    '에서', '부터', '까지', '가는', '이동', '루트', '경로', '어떻게 가', '어떻게가', '어떻게 이동', '기차', '열차', '버스', '비행기', '교통', '차편', '코스',
    'から', 'まで', '行き方', 'ルート', '移動', 'アクセス', '列車', '電車', 'バス', '飛行機', '交通',
    '从', '到', '怎么去', '怎么走', '路线', '交通', '高铁', '火车', '大巴', '飞机', '如何前往'
  ].some(k => q.includes(k) || cleanQ.includes(k));

  // ----------------------------------------------------
  // 2. CONVERSATIONAL & LINGUISTIC INTENTS (대화형 / 일상 회화)
  // ----------------------------------------------------

  // 2-1. Thanks / Gratitude (감사 / 고마움)
  const isThanks = ['고마워', '고맙', '감사', '땡큐', 'thank', 'thanks', 'thx', 'appreciate', 'ありがとう', '感謝', '助かった', 'サンキュー', '谢谢', '感谢', '多谢'].some(w => q.includes(w));
  if (isThanks) {
    const chips = [
      { query: '바르셀로나에서 마드리드 어떻게 가?', label: '🚆 바르셀로나 ➔ 마드리드' },
      { query: '포르투갈 대표 음식 추천', label: '🥧 포르투갈 대표 음식' },
      { query: '소매치기 예방법 알려줘', label: '🚨 소매치기 안전 수칙' }
    ];
    if (lang === 'ja') {
      return `😊 <strong>どういたしまして！お役に立ててとても嬉しいです！</strong><br><br>ご家族皆様が安全で快適に、一生忘れられない素晴らしい旅になりますよういつでもサポートいたします。<br>ポルトガルやスペインの美味しい名物料理、観光名所の予約のコツ、都市間の移動手段など、気になることがあれば続けて何でも気軽に聞いてくださいね！✨` + renderFollowupChips(chips);
    } else if (lang === 'en') {
      return `😊 <strong>You're very welcome! I'm delighted to assist!</strong><br><br>Wishing you and your family an unforgettable, comfortable, and wonder-filled journey across Iberia and Dubai.<br>Feel free to ask me any follow-up questions anytime—whether about city-to-city routes, local dishes, ticket booking tips, or safety! ✨` + renderFollowupChips(chips);
    } else if (lang === 'zh') {
      return `😊 <strong>不客气，很高兴能为您提供帮助！</strong><br><br>祝愿您和家人拥有一段温馨舒适、毫无负担的美妙旅程。<br>如果您在城市间交通路线、特色美食、景点门票预约或防盗安全方面还有任何想了解的，随时都可以继续提问哦！✨` + renderFollowupChips(chips);
    } else {
      return `😊 <strong>도움이 되었다니 정말 기쁩니다!</strong><br><br>부모님과 함께하시는 이번 가족 여행이 평생 기억에 남을 따뜻하고 편안한 여행이 되도록 언제나 함께할게요.<br>도시 간 이동 경로, 포르투갈·스페인의 또 다른 맛집, 관광지 관람 꿀팁 등 궁금한 점이 생기시면 이어서 편하게 물어보세요! ✨` + renderFollowupChips(chips);
    }
  }

  // 2-2. Greetings (인사)
  const isGreeting = ['안녕', '하이', '반가', 'hello', 'hi', 'hey', 'good morning', 'good afternoon', 'こんにちは', 'はじめまして', 'こんばん', '你好', '您好'].some(w => q.includes(w));
  if (isGreeting && q.length < 15) {
    const chips = [
      { query: '바르셀로나에서 마드리드 어떻게 가?', label: '🚆 바르셀로나 ➔ 마드리드' },
      { query: '마드리드에서 리스본 어떻게 가?', label: '✈️ 마드리드 ➔ 리스본' },
      { query: '포르투갈에서 제일 맛있는 음식은 뭐야?', label: '🥧 포르투갈 대표 맛집' }
    ];
    if (lang === 'ja') {
      return `こんにちは！旅の専属コンシェルジュAIです 😊<br>ポルトガル、スペイン、ドバイの旅に関するご質問なら何でもお任せください。<br><br>💡 <em>「バルセロナからマドリードへの移動方法」「ポルトガルで一番人気の食べ物は？」「スリ対策」</em>など、自由にお聞きください！` + renderFollowupChips(chips);
    } else if (lang === 'en') {
      return `Hello there! I'm your dedicated Iberia & Dubai Family Travel AI Concierge 😊<br>Feel free to ask me anything about your trip!<br><br>💡 Try asking: <em>"Routes from Barcelona to Madrid", "Madrid to Lisbon travel", "What is the most popular food in Portugal?"</em>!` + renderFollowupChips(chips);
    } else if (lang === 'zh') {
      return `您好！我是您的伊比利亚与迪拜家庭旅行AI向导 😊<br>很高兴为您服务！<br><br>💡 您可以问我：<em>“巴塞罗那到马德里怎么走？”、“葡萄牙最受欢迎的美食”、“西班牙防盗防偷攻略”</em>等任何问题！` + renderFollowupChips(chips);
    } else {
      return `안녕하세요! 이베리아 & 두바이 가족 여행 AI 컨시어지입니다 😊<br>부모님과 함께하는 편안한 여행이 될 수 있도록 무엇이든 도와드릴게요.<br><br>💡 <em>"바르셀로나에서 마드리드 이동법", "마드리드에서 리스본 어떻게 가?", "포르투갈 대표 음식"</em> 등 편하게 질문해 보세요!` + renderFollowupChips(chips);
    }
  }

  // 2-3. Identity / Bot Info (너는 누구야)
  const isWho = ['누구', '너는', '뭐하는', 'who are you', 'what are you', 'あなたは誰', '何者', '你是谁', '你的功能'].some(w => q.includes(w));
  if (isWho && q.length < 20) {
    const chips = [
      { query: '바르셀로나에서 마드리드 어떻게 가?', label: '🚆 도시 간 기차 이동' },
      { query: '스페인 포르투갈 환전 어떻게 해?', label: '💶 유로 환전 안내' },
      { query: '소매치기 예방법 알려줘', label: '🚨 소매치기 안전' }
    ];
    if (lang === 'ja') {
      return `🤖 <strong>AIトラベルコンシェルジュのご紹介</strong>:<br><br>私はスペイン、ポルトガル、および経由地ドバイの<strong>「シニア同伴・家族旅行」に特化した専属AIコンパニオン</strong>です。<br>• 都市間の高速鉄道・フライト・バスのルート案内<br>• 名物料理や地元レストランの推薦<br>• お土産や免税手続き（DIVA）<br>• スリ対策や安全情報<br>• リアルタイム旅行予算の算出<br>など、旅のあらゆる疑問を瞬時にサポートします！✨` + renderFollowupChips(chips);
    } else if (lang === 'en') {
      return `🤖 <strong>About Your AI Travel Concierge</strong>:<br><br>I am your dedicated AI companion specialized in <strong>Senior-friendly Family Travel across Spain, Portugal, and Dubai stopovers</strong>.<br>I provide instant advice on:<br>• Inter-city routes & high-speed rail (Renfe/CP)<br>• Iconic local dishes & curated dining<br>• Souvenirs & tax refund guides<br>• Pickpocket prevention & safety<br>• Trains & Uber mobility for elderly parents! ✨` + renderFollowupChips(chips);
    } else if (lang === 'zh') {
      return `🤖 <strong>关于您的AI旅行专属向导</strong>:<br><br>我是专门为<strong>西班牙、葡萄牙及经停迪拜的长辈家庭旅行定制的AI智能助手</strong>。<br>竭诚为您提供：<br>• 城市间高铁线路规划（Renfe AVE / CP特快）<br>• 代表性特色美食与名店推荐<br>• 必买特色手信伴手礼与DIVA退税攻略<br>• 热门景区防盗防偷安全铁律<br>• 全程长辈无障碍出行方案！✨` + renderFollowupChips(chips);
    } else {
      return `🤖 <strong>AI 여행 컨시어지 소개</strong>:<br><br>저는 스페인, 포르투갈 및 경유지 두바이를 여행하시는 <strong>부모님 동행 가족 여행 전담 AI 가이드</strong>입니다.<br>다음과 같은 모든 정보를 실시간으로 안내해 드립니다:<br>• 도시 간 고속열차(렌페) 및 항공·버스 최적 경로<br>• 현지 대표 명물 음식과 엄선 맛집 리스트<br>• 국가별 필수 쇼핑 품목 및 텍스리펀 방법<br>• 소매치기 예방 및 치안 안전 수칙<br>• 부모님 우버 이동 팁 및 맞춤 플래너 총 예산! ✨` + renderFollowupChips(chips);
    }
  }

  // ----------------------------------------------------
  // 3. SPECIALIZED INTER-CITY ROUTES & ESSENTIAL PHRASES
  // ----------------------------------------------------

  // 3-1. Less Salt (소금 빼주세요 / 싱겁게)
  const isLessSalt = [
    '소금', '싱겁게', 'sin sal', 'sem sal', 'less salt', 'no salt',
    '塩', '薄味', 'しょっぱい', '塩分',
    '少盐', '淡一点', '不要太咸'
  ].some(w => q.includes(w));
  if (isLessSalt) {
    const chips = [
      { query: '스페인 맛집 추천해줘', label: '🥘 스페인 맛집' },
      { query: '포르투갈 맛집 추천해줘', label: '🥧 포르투갈 맛집' }
    ];
    return `
      🧂 <strong>"Less Salt / No Salt" Essential Dining Phrases</strong>:<br><br>
      Traditional dishes in Spain and Portugal can taste salty to international palates. Show these phrases to your waiter:<br><br>
      <div style="background:#fff3e7;border-left:4px solid var(--orange);padding:10px 14px;border-radius:0 8px 8px 0;margin-bottom:8px;">
        <strong>🇪🇸 Spain:</strong> <em>"Sin sal, por favor"</em> (No salt) / <em>"Poco sal, por favor"</em> (Less salt)<br>
        <span style="font-size:12px;color:#7a5038;">(스페인어: 신 살, 포르 파보르 = 소금 빼주세요)</span>
      </div>
      <div style="background:#e8f4f0;border-left:4px solid var(--green);padding:10px 14px;border-radius:0 8px 8px 0;margin-bottom:8px;">
        <strong>🇵🇹 Portugal:</strong> <em>"Sem sal, por favor"</em> (No salt) / <em>"Pouco sal, por favor"</em> (Less salt)<br>
        <span style="font-size:12px;color:#2c5b52;">(포르투갈어: 셈 살, 포르 파보르 = 소금 빼주세요)</span>
      </div>
      <div style="background:#f4efe6;border-left:4px solid var(--ink);padding:10px 14px;border-radius:0 8px 8px 0;">
        <strong>🇦🇪 Dubai / UK:</strong> <em>"No salt / Less salt, please"</em>
      </div>
    ` + renderFollowupChips(chips);
  }

  // 3-2. Dubai Safari / Desert (사막 사파리)
  const isDubaiSafari = [
    '사막', '사파리', '듄배싱',
    'safari', 'desert', 'dune bashing',
    '砂漠', 'サファリ',
    '冲沙', '沙漠'
  ].some(w => q.includes(w));
  if (isDubaiSafari) {
    const chips = [
      { query: '두바이에서 아부다비 이동법', label: '🚕 두바이 ➔ 아부다비' },
      { query: '두바이 분수쇼 & 부르즈 할리파', label: '🏙️ 부르즈 할리파 & 몰' }
    ];
    if (lang === 'ja') {
      return `
        🏜️ <strong>ドバイ砂漠サファリ＆観光のポイント</strong>:<br><br>
        🐪 <strong>シニア同伴の砂漠サファリの知恵:</strong><br>
        一般的なデューンバッシング（激しい砂丘ドライブ）は腰に負担がかかる場合があります。予約時に**「Gentle Desert Drive（穏やかな砂漠ドライブ）」**や、ヴィンテージカーで巡る**「ヘリテージ・サファリ」**を指定すると、雄大な砂漠の夕日とアラビアンBBQディナーをゆったりとお楽しみいただけます！<br><br>
        👗 <strong>服装マナー:</strong> ドバイモールなどの屋内は冷房が強いため薄手の羽織り物が必要です。モスク訪問時は露出を控えた服装をお選びください。
      ` + renderFollowupChips(chips);
    } else if (lang === 'en') {
      return `
        🏜️ <strong>Dubai Desert Safari & Stopover Guide</strong>:<br><br>
        🐪 <strong>Senior-Friendly Desert Safari Tip:</strong><br>
        Standard roller-coaster dune bashing in 4WDs can be intense for seniors. When booking, request a **"Gentle Desert Drive"** or a **Heritage Safari (Vintage Land Rover)** to enjoy sunset photography, camel encounters, and Arabian BBQ dinner with total comfort!<br><br>
        👗 <strong>Dress Code & Etiquette:</strong> Dubai venues have strong air-conditioning; carry a light cardigan. When visiting mosques, respectful modest clothing covering arms and legs is required.
      ` + renderFollowupChips(chips);
    } else if (lang === 'zh') {
      return `
        🏜️ <strong>迪拜沙漠冲沙与城市经停指南</strong>:<br><br>
        🐪 <strong>适合长辈同行的沙漠之旅建议：</strong><br>
        常规越野车冲沙颠簸剧烈，容易对长辈腰椎造成不适。预定时建议选择**“Gentle Desert Drive（温和沙漠观光）”**或复古路虎的**“遗产探索冲沙（Heritage Safari）”**，长辈可以惬意欣赏壮美红沙日落、骑骆驼并享受正宗贝都因营地烧烤晚宴！<br><br>
        👗 <strong>着装贴士：</strong> 迪拜商场冷气强劲，建议携带披肩薄外套；清真寺参访需着遮盖肩部与脚踝的得体服饰。
      ` + renderFollowupChips(chips);
    } else {
      return `
        🏜️ <strong>두바이 사막 사파리 & 스톱오버 가이드</strong>:<br><br>
        🐪 <strong>부모님 동행 시 사막 사파리 핵심 팁:</strong><br>
        일반적인 사막 듄배싱(사구 질주)은 차량 흔들림이 심해 어르신 허리에 무리가 갈 수 있습니다. 예약 시 <strong>'젠틀 드라이브(Gentle Desert Drive)'</strong> 옵션을 선택하시거나 클래식 랜드로버를 타고 이동하는 <strong>'헤리티지 사파리'</strong>를 선택하시면 붉은 사막의 석양 감상과 베두인 캠프 BBQ 만찬을 편안하게 즐기실 수 있습니다!<br><br>
        👗 <strong>복장 팁:</strong> 사막의 저녁은 쌀쌀할 수 있으므로 가벼운 바람막이나 숄을 지참하시길 권장합니다.
      ` + renderFollowupChips(chips);
    }
  }

  // ----------------------------------------------------
  // [SPECIAL ROUTE 1] BARCELONA ↔ MADRID
  // ----------------------------------------------------
  if ((hasBarcelona && hasMadrid) || (hasBarcelona && hasRouteKeyword && (q.includes('madrid') || cleanQ.includes('madrid')))) {
    let res = '';
    if (lang === 'ja') {
      res = `
        🚆 <strong>🇪🇸 バルセロナ ➔ マドリード 高速鉄道＆移動ガイド</strong>:<br><br>
        1️⃣ <strong>高速鉄道 AVE / iryo / OUIGO（ご両親同伴ならイチ押し・最も推奨！ 🌟）:</strong><br>
        • <strong>所要時間:</strong> 直行便で<strong>約2時間30分</strong>（最高時速300km）<br>
        • <strong>運行区間:</strong> バルセロナ・サンツ（Barcelona Sants）駅 ➔ マドリード・アトーチャ（Madrid Atocha）駅<br>
        • <strong>運行頻度:</strong> 1日15〜20便以上の高密度運行<br>
        • <strong>費用目安:</strong> 事前予約で片道<strong>約€19〜€45</strong>（Renfe、iryo、OUIGO 3社の競合により大変リーズナブル）<br>
        • <strong>おすすめ理由:</strong> 空港への移動や手荷物検査の待ち時間がなく、市内中心部から中心部へ直通。広々とした座席と大きな荷物棚があり、シニア連れの旅に飛行機より圧倒的に快適で時間も節約できます。<br><br>
        2️⃣ <strong>シャトル便（飛行機 - Puente Aéreo）:</strong><br>
        • 飛行時間は約1時間20分ですが、空港への往復移動と保安検査を含めると全体で3時間30分以上かかるため、高速鉄道の利用が断然便利です。<br><br>
        💡 <strong>予約のコツ:</strong> <strong>OmioアプリまたはRenfe公式アプリ</strong>でスケジュールと価格を比較し、前方座席を事前予約するのがおすすめです！
      `;
    } else if (lang === 'en') {
      res = `
        🚆 <strong>🇪🇸 Barcelona ➔ Madrid High-Speed Train & Route Guide</strong>:<br><br>
        1️⃣ <strong>High-Speed Rail (Strongly Recommended for Seniors! 🌟):</strong><br>
        • <strong>Travel Time:</strong> Approx. <strong>2 hrs 30 mins</strong> direct (cruising at 300 km/h).<br>
        • <strong>Route:</strong> <strong>Barcelona Sants</strong> Station ➔ <strong>Madrid Atocha</strong> Station (15–20 daily departures).<br>
        • <strong>Estimated Fare:</strong> Advance booking from <strong>€19 to €45</strong> one-way (Renfe AVE, iryo, and OUIGO compete, keeping prices affordable).<br>
        • <strong>Why It's #1:</strong> Downtown-to-downtown transit with zero airport queues, spacious seating, and generous luggage allowance. Far more relaxing and faster door-to-door than flying!<br><br>
        2️⃣ <strong>Flight (Air Shuttle - Puente Aéreo):</strong><br>
        • Flight time is ~1 hr 20 min, but including airport transfers, check-in, and security, total travel exceeds 3.5–4 hours. The train is much more comfortable.<br><br>
        💡 <strong>Booking Tip:</strong> Compare Renfe AVE, iryo, and Ouigo departures easily using the <strong>Omio app or Renfe app</strong>!
      `;
    } else if (lang === 'zh') {
      res = `
        🚆 <strong>🇪🇸 巴塞罗那 ➔ 马德里 高铁出行与订票全指南</strong>:<br><br>
        1️⃣ <strong>高速铁路（长辈同行强烈推荐 / 首选方案！ 🌟）：</strong><br>
        • <strong>运行耗时：</strong> 直达仅需<strong>约2小时30分钟</strong>（最高时速300公里）。<br>
        • <strong>运行区间：</strong> 巴塞罗那Sants站 ➔ 马德里Atocha核心主车站（每日15~20班密集发车）。<br>
        • <strong>参考票价：</strong> 提前订票单程约<strong>€19 ~ €45</strong>（Renfe、iryo、Ouigo三家充分竞争，性价比极高）。<br>
        • <strong>推荐理由：</strong> 市中心直达市中心，免去往返郊区机场与排队安检的繁琐疲累，车厢宽敞且行李额充裕，长辈乘坐极其省心。<br><br>
        2️⃣ <strong>飞机航班（空中国内线）：</strong><br>
        • 纯飞行时间虽仅1小时20分，但加上机场接驳与值机候机，全程耗时超3.5小时，高铁在舒适度与效率上完胜。<br><br>
        💡 <strong>订票小贴士：</strong> 推荐使用 <strong>Omio App 或 Renfe官网</strong> 一键比对三家运营商班次，尽早选定前排舒适座位！
      `;
    } else {
      res = `
        🚆 <strong>🇪🇸 바르셀로나 ➔ 마드리드 이동 & 고속열차(렌페) 완벽 가이드</strong>:<br><br>
        1️⃣ <strong>고속철도 (부모님 동행 시 가장 강력 추천! 🌟):</strong><br>
        • <strong>소요 시간:</strong> 약 <strong>2시간 30분 직통</strong> (최고 시속 300km)<br>
        • <strong>운행 구간:</strong> 바르셀로나 산츠(Barcelona Sants)역 ➔ 마드리드 아토차(Madrid Atocha)역 (하루 15~20회 수시 운행)<br>
        • <strong>예상 요금:</strong> 조기 예매 시 편도 <strong>€19 ~ €45</strong> (Renfe AVE, iryo, OUIGO 3사 경쟁으로 가성비 매우 우수)<br>
        • <strong>추천 이유:</strong> 공항 왕복 이동과 탑승 수속 번거로움 없이 도심 한복판에서 도심으로 직결되며, 좌석이 넓고 짐 보관이 쉬워 어르신 이동에 비행기보다 훨씬 편안하고 빠릅니다.<br><br>
        2️⃣ <strong>항공편 (Puente Aéreo 셔틀 비행기):</strong><br>
        • 순수 비행시간은 약 1시간 20분이지만, 공항 왕복 이동과 짐 부치기, 보안검색을 합치면 총 3시간 30분 이상 소요되어 기차가 훨씬 유리합니다.<br><br>
        💡 <strong>예매 팁:</strong> <strong>Omio(오미오) 앱 또는 렌페 공식 앱</strong>에서 Renfe(AVE), iryo, Ouigo의 시간표와 요금을 한눈에 비교하고 앞쪽 편안한 좌석을 예매하세요!
      `;
    }
    const chips = [
      { query: '마드리드에서 리스본 어떻게 가?', label: '✈️ 마드리드 ➔ 리스본 이동' },
      { query: '마드리드에서 세비야 이동법', label: '🚄 마드리드 ➔ 세비야 이동' },
      { query: '바르셀로나 맛집 추천해줘', label: '🥘 바르셀로나 맛집' },
      { query: '사그라다 파밀리아 예약 팁', label: '🏛️ 사그라다 파밀리아' }
    ];
    return res + renderFollowupChips(chips);
  }

  // ----------------------------------------------------
  // [SPECIAL ROUTE 2] MADRID ↔ SEVILLE
  // ----------------------------------------------------
  if (hasMadrid && hasSeville) {
    let res = '';
    if (lang === 'ja') {
      res = `
        🚆 <strong>🇪🇸 マドリード ➔ セビリア 高速鉄道移動ガイド</strong>:<br><br>
        1️⃣ <strong>高速鉄道 AVE / iryo（イチ押し！ 🌟）:</strong><br>
        • <strong>所要時間:</strong> 直行で<strong>約2時間40分</strong><br>
        • <strong>運行区間:</strong> マドリード・アトーチャ（Atocha）駅 ➔ セビリア・サンタ・フスタ（Santa Justa）駅<br>
        • <strong>費用目安:</strong> 片道約€25〜€55（事前予約推奨）<br>
        • <strong>特徴:</strong> コルドバを経由して美しいアンダルシアのオリーブ畑を車窓から眺められます。駅前からはタクシーやバスでホテルへ直行可能！
      `;
    } else if (lang === 'en') {
      res = `
        🚆 <strong>🇪🇸 Madrid ➔ Seville High-Speed Train (AVE) Guide</strong>:<br><br>
        1️⃣ <strong>High-Speed Rail AVE / iryo (Recommended! 🌟):</strong><br>
        • <strong>Travel Time:</strong> Approx. <strong>2 hrs 40 mins</strong> direct.<br>
        • <strong>Route:</strong> <strong>Madrid Atocha</strong> ➔ <strong>Seville Santa Justa</strong>.<br>
        • <strong>Fare:</strong> ~€25–€55 one-way with advance booking.<br>
        • <strong>Highlights:</strong> Smooth, scenic passage through the rolling olive groves of Andalusia, stopping briefly in Córdoba. Much more convenient than flights!
      `;
    } else if (lang === 'zh') {
      res = `
        🚆 <strong>🇪🇸 马德里 ➔ 塞维利亚 高铁（AVE）出行指南</strong>:<br><br>
        1️⃣ <strong>西班牙高铁 AVE / iryo（首选推荐！ 🌟）：</strong><br>
        • <strong>运行耗时：</strong> 直达约<strong>2小时40分钟</strong>。<br>
        • <strong>运行区间：</strong> 马德里Atocha站 ➔ 塞维利亚Santa Justa站。<br>
        • <strong>票价参考：</strong> 提前预订单程约€25~€55。<br>
        • <strong>行程体验：</strong> 途经科尔多瓦，沿途可尽情饱览安达卢西亚大片橄榄树庄园的迷人风光。
      `;
    } else {
      res = `
        🚆 <strong>🇪🇸 마드리드 ➔ 세비야 고속열차(AVE/iryo) 이동 가이드</strong>:<br><br>
        1️⃣ <strong>고속철도 (가장 강력 추천! 🌟):</strong><br>
        • <strong>소요 시간:</strong> 약 <strong>2시간 40분 직통</strong><br>
        • <strong>운행 구간:</strong> 마드리드 아토차(Atocha)역 ➔ 세비야 산타 후스타(Santa Justa)역<br>
        • <strong>예상 요금:</strong> 사전 예매 시 편도 €25 ~ €55<br>
        • <strong>특징:</strong> 중간에 코르도바를 거치며 안달루시아의 광활한 올리브 평원 풍경을 감상할 수 있습니다. 세비야 산타 후스타역 도착 후 구시가지까지 택시로 10분(약 €8)이면 호텔 문 앞까지 도착합니다!
      `;
    }
    const chips = [
      { query: '세비야에서 그라나다 이동법', label: '🚆 세비야 ➔ 그라나다' },
      { query: '세비야 맛집 추천해줘', label: '🍽️ 세비야 맛집' },
      { query: '마드리드에서 리스본 어떻게 가?', label: '✈️ 마드리드 ➔ 리스본' }
    ];
    return res + renderFollowupChips(chips);
  }

  // ----------------------------------------------------
  // [SPECIAL ROUTE 3] MADRID ↔ LISBON (CROSS-BORDER)
  // ----------------------------------------------------
  const isMadridToLisbonRoute = (hasMadrid && hasLisbon) || (isSpain && isPortugal && (hasRouteKeyword || ['이동', '국경', '비행기', '버스', '기차', 'transit', 'cross', 'flight', 'bus', 'train'].some(w => q.includes(w)))) || q.includes('alsa') || q.includes('omio') ||
    ['마드리드에서 리스본', '마드리드 리스본', '리스본에서 마드리드', '국경 이동', '국경 이동법', 'madrid to lisbon', 'lisbon to madrid', 'マドリードからリスボン', '马德里到里斯本'].some(w => q.includes(w));

  if (isMadridToLisbonRoute) {
    let res = '';
    if (lang === 'ja') {
      res = `
        ✈️ <strong>🇪🇸 マドリード ➔ 🇵🇹 リスボン（国境移動・予約完全ガイド）</strong>:<br><br>
        マドリード〜リスボン間の移動は<strong>飛行機（所要約1時間20分）が最もおすすめ</strong>です！<br><br>
        1️⃣ <strong>飛行機（イチ押し・最も推奨！ 🌟）:</strong><br>
        • <strong>所要時間:</strong> 約<strong>1時間20分</strong>直行便（エア・ヨーロッパ、ライアンエアー、イージージェット、TAPポルトガル航空）。<br>
        • <strong>運賃のコツ:</strong> 航空券のみの基本料金は3〜5万ウォン（約3〜5千円）程度ですが、<strong>23kgの受託手荷物を追加すると1人あたり約8〜12万ウォン（約€60〜€85）</strong>になります。ご両親同伴なら長距離移動の疲労がなく圧倒的にお得で快適です！<br><br>
        2️⃣ <strong>高速バス（次善の策・長距離）:</strong><br>
        • <strong>所要時間:</strong> 約<strong>8〜9時間</strong>（マドリード「メンデス・アルバロ」バスターミナル発）。<br>
        • <strong>予約のコツ:</strong> 9時間の長旅ですので、<strong>ALSA公式アプリ</strong>または<strong>Omioアプリ</strong>で前方の座席間隔が広い<strong>Supra（優等・プレミアム席）</strong>を必ず事前予約してください。（窓口当日購入は非推奨）<br><br>
        3️⃣ <strong>鉄道・列車（絶対非推奨 ⚠️）:</strong><br>
        • 直行便がなく乗り換え2回以上で<strong>10時間以上</strong>かかるため絶対におすすめしません。<br><br>
        💱 <strong>通貨＆両替の注意点:</strong><br>
        スペインとポルトガルは両国とも<strong>ユーロ（€）</strong>共通ですので、国境を越えても追加の両替は一切不要です！トラベルカードやユーロ現金をそのままご利用いただけます。<br><br>
        🎒 <strong>荷物配送サービス:</strong> 重いスーツケースの移動が大変な場合は、スペイン郵便（Correos）等のホテル間手荷物配送サービスを利用すれば手ぶらで身軽に国境を越えられます！
      `;
    } else if (lang === 'en') {
      res = `
        ✈️ <strong>🇪🇸 Madrid ➔ 🇵🇹 Lisbon (Cross-Border Transit & Booking Guide)</strong>:<br><br>
        For traveling between Madrid and Lisbon, <strong>taking a flight (~1h 20m) is by far the best option</strong>!<br><br>
        1️⃣ <strong>Flight (Highly Recommended! 🌟):</strong><br>
        • <strong>Duration:</strong> Approx. <strong>1 hr 20 mins direct</strong> (Air Europa, Ryanair, easyJet, TAP).<br>
        • <strong>Fare Tip:</strong> Base fare is cheap (~$30), but <strong>adding a 23kg checked bag brings it to ~$80–$120 (₩80,000–₩120,000)</strong> per person. Absolutely worth it to save elderly parents from a grueling bus ride!<br><br>
        2️⃣ <strong>Express Bus (Secondary Option - Budget Friendly):</strong><br>
        • <strong>Duration:</strong> Approx. <strong>8–9 hours</strong> from Madrid 'Méndez Álvaro' Station.<br>
        • <strong>Booking Tip:</strong> Long rides require comfort! Pre-book via the <strong>ALSA app or Omio app</strong> and select the wider, premium <strong>Supra seats</strong> in advance. (Walk-in booking not recommended)<br><br>
        3️⃣ <strong>Train (Strictly Not Recommended ⚠️):</strong><br>
        • There is no direct train between Madrid and Lisbon; requires 2+ transfers and takes <strong>over 10 hours</strong>.<br><br>
        💱 <strong>Currency Notice:</strong><br>
        Both Spain and Portugal use the <strong>Euro (€)</strong>. There is no need to exchange money when crossing the border; your travel cards and euros will work seamlessly!<br><br>
        🎒 <strong>Luggage Forwarding:</strong> If dragging heavy suitcases is a concern, use services like Correos (Spanish Post) or private baggage forwarders to ship luggage between hotels door-to-door!
      `;
    } else if (lang === 'zh') {
      res = `
        ✈️ <strong>🇪🇸 马德里 ➔ 🇵🇹 里斯本（跨境交通与预订全攻略）</strong>:<br><br>
        马德里与里斯本之间的跨境出行，<strong>搭乘飞机（耗时约1小时20分）是最为推荐的首选方案</strong>！<br><br>
        1️⃣ <strong>飞机直飞（长辈同行最强烈推荐！ 🌟）：</strong><br>
        • <strong>飞行耗时：</strong> 直飞仅需约<strong>1小时20分钟</strong>（欧罗巴航空、瑞安航空、易捷航空、葡萄牙航空TAP）。<br>
        • <strong>票价贴士：</strong> 基础裸票仅需200~300元，但<strong>增加23kg托运行李后单人约400~600元（8~12万韩元）</strong>。长辈同行完全免除长途奔波体力消耗，极度推荐！<br><br>
        2️⃣ <strong>长途大巴（次选方案 - 经济实惠）：</strong><br>
        • <strong>运行耗时：</strong> 约<strong>8~9小时</strong>（从马德里门德斯·阿尔瓦罗 Méndez Álvaro 南站发车）。<br>
        • <strong>订票技巧：</strong> 9小时长途较辛苦，请务必通过 <strong>ALSA官方App</strong> 或 <strong>Omio App</strong> 提前预订前排宽敞舒适的 <strong>Supra豪华头等座</strong>。（不推荐现场排队买票）<br><br>
        3️⃣ <strong>火车直通（极不推荐 ⚠️）：</strong><br>
        • 目前两地间无直达列车，需换乘2次以上且全程耗时<strong>超过10小时</strong>，家庭长辈出行绝不推荐。<br><br>
        💱 <strong>货币贴士：</strong><br>
        西班牙与葡萄牙均通用<strong>欧元（€）</strong>，跨越国境完全无需额外兑换货币！常用旅行卡与现金均可无缝直接使用。<br><br>
        🎒 <strong>行李托运服务：</strong> 若携带大件行李不便，可通过西班牙邮政（Correos）或第三方行李寄送服务在酒店间门到门预先转运，轻装惬意过境！
      `;
    } else {
      res = `
        ✈️ <strong>🇪🇸 마드리드 ➔ 🇵🇹 리스본 (국경 이동 & 예매 총정리 가이드)</strong>:<br><br>
        마드리드-리스본 국경 이동은 <strong>비행기(약 1시간 20분)를 가장 추천</strong>하며 수하물 추가 시 인당 약 8~12만 원입니다! 🌟<br><br>
        1️⃣ <strong>비행기 이동 (가장 강력 추천! 🌟):</strong><br>
        • <strong>소요시간:</strong> 직항 약 <strong>1시간 20분</strong>.<br>
        • <strong>추천 항공사:</strong> 에어유로파(Air Europa), 라이언에어(Ryanair), 이지젯(easyJet), 탭 포르투갈(TAP).<br>
        • <strong>요금 팁:</strong> 비행기 깡통 요금은 3~5만 원이지만, <strong>23kg 수하물을 추가하면 인당 약 8~12만 원</strong>이 됩니다. 부모님 동행 시 체력 소모가 없어 압도적으로 이득입니다!<br><br>
        2️⃣ <strong>고속버스 (차선책 - 가성비 여행 시):</strong><br>
        • <strong>소요시간:</strong> 약 <strong>8~9시간</strong>. 마드리드 '멘데스 알바로(Méndez Álvaro)' 남부터미널 출발.<br>
        • <strong>예매 팁:</strong> 9시간 이동은 무리가 가므로, <strong>ALSA 공식 앱</strong>이나 <strong>Omio(오미오) 앱</strong>을 통해 반드시 앞쪽의 넓은 <strong>수프라(Supra) 우등석</strong>을 사전 예매하세요. (현장 발권 비추천)<br><br>
        3️⃣ <strong>기차/철도 이동 (절대 비추천 ⚠️):</strong><br>
        • 직행 열차가 없고 최소 2회 환승하며 <strong>10시간 이상</strong> 걸리므로 부모님 동행 시 절대 비추천합니다.<br><br>
        💱 <strong>통화 및 환전 주의사항:</strong><br>
        스페인과 포르투갈 모두 <strong>유로(€)</strong>를 사용합니다. 국경을 넘어도 화폐를 바꿀 필요 없이, 스페인에서 쓰던 트래블월렛/트래블로그 카드와 유로 현금을 그대로 사용하시면 됩니다!<br><br>
        🎒 <strong>짐 배송 서비스 (Baggage Forwarding):</strong><br>
        무거운 캐리어를 끌고 이동하는 것이 부담스럽다면, 스페인 우체국(Correos)이나 사설 수하물 배송 업체를 이용해 숙소 간 짐을 미리 보내버리세요. 두 손 가볍게 국경을 넘을 수 있습니다!
      `;
    }
    const chips = [
      { query: '스페인 포르투갈 환전 어떻게 해? 유로 써?', label: '💶 유로 환전/통화' },
      { query: '바르셀로나에서 마드리드 어떻게 가?', label: '🚆 바르셀로나 ➔ 마드리드' },
      { query: '리스본에서 포르투 이동법', label: '🚆 리스본 ➔ 포르투' }
    ];
    return res + renderFollowupChips(chips);
  }

  // ----------------------------------------------------
  // [SPECIAL ROUTE 4] LISBON ↔ PORTO
  // ----------------------------------------------------
  if (hasLisbon && hasPorto) {
    let res = '';
    if (lang === 'ja') {
      res = `
        🚆 <strong>🇵🇹 リスボン ➔ ポルト 特急列車（CP）移動ガイド</strong>:<br><br>
        • <strong>所要時間:</strong> 特急列車アルファ・ペンドゥラール（Alfa Pendular - AP）で<strong>約2時間50分直通</strong><br>
        • <strong>乗車駅:</strong> リスボン・サンタ・アポローニャ駅またはオリエンテ駅 ➔ ポルト・カンパニャン（Campanhã）駅<br>
        • <strong>費用目安:</strong> 片道約€22〜€35（ポルトガル鉄道CP公式HPで早期割引チケットあり）<br>
        • <strong>シニア向けポイント:</strong> 車内は非常に静かで快適。カンパニャン駅到着後は市内中心部のサン・ベント駅行きの普通列車に無料乗り換えできます！
      `;
    } else if (lang === 'en') {
      res = `
        🚆 <strong>🇵🇹 Lisbon ➔ Porto Train (CP) Route Guide</strong>:<br><br>
        • <strong>Travel Time:</strong> Approx. <strong>2 hrs 50 mins</strong> on the express *Alfa Pendular (AP)*.<br>
        • <strong>Stations:</strong> Lisbon Santa Apolónia or Oriente ➔ Porto Campanhã.<br>
        • <strong>Fare:</strong> ~€22–€35 one-way (promo fares available on the official CP Portugal website).<br>
        • <strong>Senior Tip:</strong> Smooth and comfortable. Free connection from Porto Campanhã into historic Porto São Bento station is included with your ticket!
      `;
    } else if (lang === 'zh') {
      res = `
        🚆 <strong>🇵🇹 里斯本 ➔ 波尔图 葡铁（CP）特快列车指南</strong>:<br><br>
        • <strong>运行耗时：</strong> 乘坐AP特快（Alfa Pendular）约<strong>2小时50分钟</strong>直达。<br>
        • <strong>发到车站：</strong> 里斯本Santa Apolónia站/Oriente站 ➔ 波尔图Campanhã站。<br>
        • <strong>参考票价：</strong> 单程约€22~€35。<br>
        • <strong>长辈贴士：</strong> 凭长途车票可在Campanhã站免费换乘短驳小火车直接抵达市中心的圣本笃火车站（São Bento）！
      `;
    } else {
      res = `
        🚆 <strong>🇵🇹 리스본 ➔ 포르투 기차(CP) 이동 완벽 가이드</strong>:<br><br>
        • <strong>소요 시간:</strong> 포르투갈 고속열차 알파 펜둘라르(AP) 기준 <strong>약 2시간 50분 직통</strong><br>
        • <strong>출발/도착역:</strong> 리스본 산타 아폴로니아 또는 오리엔테역 ➔ 포르투 캄파냐(Campanhã)역<br>
        • <strong>예상 요금:</strong> 조기 예매 시 편도 €22 ~ €35 (CP 포르투갈 철도 공식 사이트 구매 추천)<br>
        • <strong>부모님 꿀팁:</strong> 열차가 매우 부드럽고 쾌적합니다. 캄파냐역에 내리신 뒤 구시가지 중심의 상벤투(São Bento)역까지 기차표로 무료 환승 열차를 타실 수 있습니다!
      `;
    }
    const chips = [
      { query: '포르투 맛집 추천해줘', label: '🍽️ 포르투 맛집' },
      { query: '리스본에서 신트라 가는 법', label: '🏰 리스본 ➔ 신트라' },
      { query: '마드리드에서 리스본 어떻게 가?', label: '✈️ 마드리드 ➔ 리스본' }
    ];
    return res + renderFollowupChips(chips);
  }

  // ----------------------------------------------------
  // [SPECIAL ROUTE 5] SEVILLE ↔ GRANADA
  // ----------------------------------------------------
  if (hasSeville && hasGranada) {
    let res = '';
    if (lang === 'ja') {
      res = `
        🚆 <strong>🇪🇸 セビリア ➔ グラナダ 移動ガイド</strong>:<br><br>
        • <strong>列車 Renfe Avant（推奨 🌟）:</strong> 直行で<strong>約2時間25分</strong>（サンタ・フスタ駅 ➔ グラナダ駅、片道約€34）。快適で景色も良好。<br>
        • <strong>高速バス ALSA:</strong> プラド・デ・サン・セバスティアン・バスターミナルから約3時間（便数が多く安価）。
      `;
    } else if (lang === 'en') {
      res = `
        🚆 <strong>🇪🇸 Seville ➔ Granada Transit Guide</strong>:<br><br>
        • <strong>Renfe Avant Fast Train (Top Pick 🌟):</strong> Approx. <strong>2 hrs 25 mins</strong> direct from Seville Santa Justa to Granada station (~€34). Highly comfortable for seniors.<br>
        • <strong>ALSA Express Bus:</strong> ~3 hrs from Prado de San Sebastián terminal (frequent departures, ~€15).
      `;
    } else if (lang === 'zh') {
      res = `
        🚆 <strong>🇪🇸 塞维利亚 ➔ 格拉纳达 交通出行指南</strong>:<br><br>
        • <strong>Renfe Avant快速列车（首选 🌟）：</strong> 直达约<strong>2小时25分钟</strong>（Santa Justa站至格拉纳达站，单程约€34），安全平稳舒适。<br>
        • <strong>ALSA长途大巴：</strong> 约3小时（班次频繁，票价约€15）。
      `;
    } else {
      res = `
        🚆 <strong>🇪🇸 세비야 ➔ 그라나다 기차(Avant) & 버스 이동 가이드</strong>:<br><br>
        • <strong>렌페 아반트(Avant) 고속기차 (강력 추천 🌟):</strong> 약 <strong>2시간 25분 직통</strong> (세비야 산타 후스타 ➔ 그라나다역, 편도 약 €34). 어르신 동행 시 가장 편안하고 안전합니다.<br>
        • <strong>ALSA 고속버스:</strong> 프라도 데 산 세바스티안 터미널에서 약 3시간 소요 (운행 횟수가 많고 편도 약 €15로 저렴).
      `;
    }
    const chips = [
      { query: '알함브라 궁전 티켓팅 팁', label: '🏛️ 알함브라 예약 팁' },
      { query: '그라나다 맛집 추천해줘', label: '🍽️ 그라나다 맛집' },
      { query: '마드리드에서 세비야 이동법', label: '🚄 마드리드 ➔ 세비야' }
    ];
    return res + renderFollowupChips(chips);
  }

  // ----------------------------------------------------
  // [SPECIAL ROUTE 6] LISBON ↔ SINTRA
  // ----------------------------------------------------
  if (hasSintra || (hasLisbon && (q.includes('신트라') || q.includes('sintra')))) {
    let res = '';
    if (lang === 'ja') {
      res = `
        🏰 <strong>🇵🇹 リスボン ➔ シントラ 日帰り移動ガイド</strong>:<br><br>
        • <strong>移動方法:</strong> リスボン・ロシオ（Rossio）駅から近郊列車（CP）で<strong>約40分直通</strong>（15〜20分間隔で運行、Navegante Zappingで片道€1.61〜€2.30）。<br>
        • <strong>シニア向け最重要ポイント:</strong> シントラ駅到着後、ペーナ宮殿へ登る山道は徒歩では過酷です。駅前から<strong>Uberタクシーまたは434番循環バス</strong>を利用して宮殿入口まで直接上がるのが必須です！
      `;
    } else if (lang === 'en') {
      res = `
        🏰 <strong>🇵🇹 Lisbon ➔ Sintra Day Trip Transit Guide</strong>:<br><br>
        • <strong>Train:</strong> Take the CP commuter train from <strong>Rossio Station</strong> directly to Sintra in <strong>~40 minutes</strong> (departs every 15–20 mins, €1.61–€2.30 with Navegante card).<br>
        • <strong>Crucial Senior Tip:</strong> Never attempt walking from Sintra station up to Pena Palace (it's a steep mountain hike). Take an <strong>Uber/Bolt or the 434 tourist loop bus</strong> directly up to the palace gates!
      `;
    } else if (lang === 'zh') {
      res = `
        🏰 <strong>🇵🇹 里斯本 ➔ 辛特拉 一日游交通攻略</strong>:<br><br>
        • <strong>城际小火车：</strong> 从里斯本市中心<strong>Rossio火车站</strong>乘车直达辛特拉约<strong>40分钟</strong>（每15~20分钟一班，刷卡仅需€1.61~€2.30）。<br>
        • <strong>长辈同行核心贴士：</strong> 出辛特拉火车站后，前往佩纳宫（Pena Palace）全程为盘山陡坡，切勿步行！务必在站前搭乘<strong>Uber打车（约€8）或434路专线巴士</strong>直达山顶大门！
      `;
    } else {
      res = `
        🏰 <strong>🇵🇹 리스본 ➔ 신트라 당일치기 기차 이동 가이드</strong>:<br><br>
        • <strong>기차 이동법:</strong> 리스본 호시우(Rossio)역에서 신트라행 국철(CP) 탑승 시 <strong>약 40분 직통</strong> (15~20분 간격 수시 운행, 나베간트 카드로 약 €1.61~€2.30).<br>
        • <strong>부모님 동행 필수 팁:</strong> 신트라역 도착 후 페나 궁전까지 걸어 올라가는 것은 매우 가파른 등산길입니다. 역 앞에서 <strong>우버(Uber/Bolt) 택시(약 €7~10) 또는 434번 순환 버스</strong>를 타고 페나 궁전 입구까지 바로 올라가세요!
      `;
    }
    const chips = [
      { query: '리스본에서 포르투 이동법', label: '🚆 리스본 ➔ 포르투' },
      { query: '리스본 에그타르트 맛집', label: '🥧 에그타르트 원조 맛집' },
      { query: '부모님 평지 명소 추천', label: '🦽 부모님 평지 명소' }
    ];
    return res + renderFollowupChips(chips);
  }

  // ----------------------------------------------------
  // [SPECIAL ROUTE 7] DUBAI ↔ ABU DHABI
  // ----------------------------------------------------
  if ((hasDubai && hasAbuDhabi) || (q.includes('아부다비') || q.includes('abu dhabi'))) {
    let res = '';
    if (lang === 'ja') {
      res = `
        🇦🇪 <strong>ドバイ ➔ アブダビ 移動ガイド</strong>:<br><br>
        1️⃣ <strong>タクシー／配車アプリ（Careem / Uber - シニア同伴に最適 🌟）:</strong><br>
        • 所要時間：約1時間15分（ホテル玄関からアブダビ・シェイク・ザイード・グランドモスク前まで直行）。料金目安：約250〜300 AED。<br>
        2️⃣ <strong>都市間急行バス（E100 / E101）:</strong><br>
        • ドバイ・イブン・バトゥータ駅からアブダビ中央バスターミナルまで約1時間30分（ノルカード 25 AED）。
      `;
    } else if (lang === 'en') {
      res = `
        🇦🇪 <strong>Dubai ➔ Abu Dhabi Transit Guide</strong>:<br><br>
        1️⃣ <strong>Taxi / Rideshare (Careem / Uber - Recommended for Families 🌟):</strong><br>
        • Travel Time: ~1 hr 15 mins door-to-door from Dubai to Abu Dhabi Grand Mosque (~250–300 AED total for family).<br>
        2️⃣ <strong>Intercity Express Bus (E100 / E101):</strong><br>
        • From Ibn Battuta Metro Station to Abu Dhabi Central Bus Station in ~1 hr 30 mins (25 AED via Nol Card).
      `;
    } else if (lang === 'zh') {
      res = `
        🇦🇪 <strong>迪拜 ➔ 阿布扎比 交通指南</strong>:<br><br>
        1️⃣ <strong>出租车 / Careem打车（家庭出行最省心 🌟）：</strong><br>
        • 耗时约1小时15分钟，从迪拜酒店直达阿布扎比谢赫扎耶德大清真寺，单程车费约250~300 AED。<br>
        2️⃣ <strong>城际巴士（E100 / E101）：</strong><br>
        • 从Ibn Battuta地铁站前往阿布扎比中央客运站约1小时30分钟（刷Nol卡25 AED）。
      `;
    } else {
      res = `
        🇦🇪 <strong>두바이 ➔ 아부다비 이동 완벽 가이드</strong>:<br><br>
        1️⃣ <strong>택시 / 카림(Careem) / 우버 (가족 여행 강력 추천 🌟):</strong><br>
        • 소요 시간: 약 1시간 15분 도어 투 도어 직결. 요금은 편도 약 250~300 AED (3인 가족이면 인당 3~4만 원으로 쾌적).<br>
        2️⃣ <strong>도시 간 급행버스 (E100 / E101):</strong><br>
        • 이븐 바투타(Ibn Battuta) 메트로역에서 아부다비 중앙 터미널까지 약 1시간 30분 (놀 카드 25 AED).
      `;
    }
    const chips = [
      { query: '두바이 사막 사파리 팁', label: '🐪 사막 사파리 팁' },
      { query: '두바이 맛집 추천해줘', label: '🍽️ 두바이 맛집' }
    ];
    return res + renderFollowupChips(chips);
  }

  // ----------------------------------------------------
  // [SPECIAL ROUTE 8] GENERIC INTERCITY ROUTE DETECTOR
  // ----------------------------------------------------
  if (hasRouteKeyword && (hasCordoba || (isSpain && (hasBarcelona || hasMadrid || hasSeville || hasGranada)) || (isPortugal && (hasLisbon || hasPorto)))) {
    let res = '';
    if (lang === 'ja') {
      res = `
        🚆 <strong>都市間ルート・交通のご案内</strong>:<br><br>
        • <strong>スペイン国内移動:</strong> マドリード、バルセロナ、セビリア、コルドバ、グラナダ間は<strong>高速鉄道 AVE / iryo</strong>の利用が最適です（所要時間：約2時間〜2時間40分）。<br>
        • <strong>ポルトガル国内移動:</strong> リスボンとポルト間は<strong>特急列車 Alfa Pendular（AP）</strong>で約2時間50分です。<br>
        • <strong>予約方法:</strong> <strong>OmioアプリまたはRenfe/CP公式アプリ</strong>で全便のスケジュールと最安値を即時比較できます。
      `;
    } else if (lang === 'en') {
      res = `
        🚆 <strong>Intercity Routes & Transit Overview</strong>:<br><br>
        • <strong>Spain High-Speed Rail:</strong> Travel between Madrid, Barcelona, Seville, Córdoba, and Granada is fastest on <strong>AVE / iryo / Ouigo</strong> trains (2–2.5 hours downtown-to-downtown).<br>
        • <strong>Portugal Rail:</strong> Lisbon to Porto is connected directly by the <strong>Alfa Pendular (AP) express</strong> in ~2h 50m.<br>
        • <strong>Booking Recommendation:</strong> Use the <strong>Omio app or official Renfe/CP apps</strong> to compare timetables and lock in discount promotional fares!
      `;
    } else if (lang === 'zh') {
      res = `
        🚆 <strong>城市间联通路线与高铁出行概览</strong>:<br><br>
        • <strong>西班牙境内：</strong> 马德里、巴塞罗那、塞维利亚、科尔多瓦、格拉纳达之间，乘坐<strong>AVE / iryo高速列车</strong>是最佳选择（耗时2~2.5小时，直达市中心）。<br>
        • <strong>葡萄牙境内：</strong> 里斯本至波尔图推荐乘坐<strong>Alfa Pendular（AP）特快</strong>（直达约2小时50分钟）。<br>
        • <strong>订票指南：</strong> 推荐使用 <strong>Omio App 或官方Renfe/CP</strong> 随时比对发车时刻与优惠票价！
      `;
    } else {
      res = `
        🚆 <strong>도시 간 이동 루트 및 고속열차 안내</strong>:<br><br>
        • <strong>스페인 도시 간 이동:</strong> 마드리드, 바르셀로나, 세비야, 코르도바, 그라나다는 <strong>스페인 고속열차(Renfe AVE / iryo)</strong>로 2시간~2시간 30분 만에 도심에서 도심으로 직결됩니다.<br>
        • <strong>포르투갈 도시 간 이동:</strong> 리스본 ↔ 포르투 구간은 <strong>특급열차 알파 펜둘라르(AP)</strong>로 약 2시간 50분 소요됩니다.<br>
        • <strong>통합 예매 팁:</strong> <strong>Omio(오미오) 앱</strong>을 이용하시면 스페인 렌페와 포르투갈 철도 시간표 및 최저가를 한눈에 비교하고 예매하실 수 있습니다!
      `;
    }
    const chips = [
      { query: '바르셀로나에서 마드리드 어떻게 가?', label: '🚆 바르셀로나 ➔ 마드리드' },
      { query: '마드리드에서 리스본 어떻게 가?', label: '✈️ 마드리드 ➔ 리스본' },
      { query: '리스본에서 포르투 이동법', label: '🚆 리스본 ➔ 포르투' }
    ];
    return res + renderFollowupChips(chips);
  }

  // 3-4. Euro Currency & Cross-Border Exchange (유로 / 환전 / 포르투갈 돈 / 스페인 포르투갈 환전)
  const isEuroCurrencyExchange = [
    '유로', '환전', '포르투갈 돈', '포르투갈돈', '스페인 돈', '스페인돈', '국경 환전', '통화', '화폐',
    'euro', 'euros', 'currency', 'exchange money', 'currency exchange', 'portugal money', 'spain money',
    'ユーロ', '両替', 'ポルトガルのお金', 'スペインのお金', '通貨',
    '欧元', '换汇', '葡萄牙货币', '西班牙货币', '兑换'
  ].some(w => q.includes(w));

  if (isEuroCurrencyExchange) {
    const chips = [
      { query: '마드리드에서 리스본 어떻게 가?', label: '✈️ 마드리드 ➔ 리스본 이동' },
      { query: '스페인 포르투갈 카드 결제 팁', label: '💳 카드/현금/팁 수칙' },
      { query: '택스리펀 받는 법', label: '🛍️ 택스리펀(DIVA) 안내' }
    ];
    if (lang === 'ja') {
      return `
        💶 <strong>スペイン＆ポルトガル 通貨・両替のご案内</strong>:<br><br>
        • <strong>スペインとポルトガルは両国ともユーロ（€）を使用しているため、国境を越えても追加の両替は一切不要です！</strong><br>
        • スペインで使用したユーロ紙幣や硬貨、トラベルカードはそのままポルトガル全土で同じようにご利用いただけます。<br>
        • <strong>カード決済:</strong> 95％以上の店舗・レストラン・タクシーでタッチ決済（Visa/Mastercard/Apple Pay）が使えます。<br>
        • <strong>現金の目安:</strong> 市場や有料公衆トイレ（0.5〜1ユーロ）利用のため、1人1日あたり20〜30ユーロ程度の小額現金を用意しておけば十分です！
      ` + renderFollowupChips(chips);
    } else if (lang === 'en') {
      return `
        💶 <strong>Spain & Portugal Currency & Cross-Border Exchange Guide</strong>:<br><br>
        • <strong>Both Spain and Portugal use the Euro (€), so no additional currency exchange is needed when crossing the border!</strong><br>
        • Any Euros (cash or travel cards like Wise, Revolut, TravelWallet) used in Spain are 100% accepted throughout Portugal without any fees.<br>
        • <strong>Card Payment:</strong> Over 95% of stores, restaurants, and taxis support contactless card payments, eliminating the need to carry large amounts of cash.<br>
        • <strong>Emergency Cash:</strong> Keeping around €20–€30 per person per day in coins and small bills for flea markets and public pay restrooms is more than enough!
      ` + renderFollowupChips(chips);
    } else if (lang === 'zh') {
      return `
        💶 <strong>西班牙与葡萄牙货币及跨境换汇指南</strong>:<br><br>
        • <strong>西班牙和葡萄牙均通用欧元（€），因此跨越国境时完全不需要进行任何额外换汇！</strong><br>
        • 在西班牙使用的欧元纸币、硬币以及多币种芯片旅行卡，在葡萄牙全境均可直接无缝使用，无任何汇差损失。<br>
        • <strong>刷卡便利性：</strong> 当地95%以上的商户、餐厅与出租车全面支持手机感应及无接触刷卡。<br>
        • <strong>备用现金建议：</strong> 仅需准备每人每天约20~30欧元零钱，用于传统小集市及欧洲投币收费洗手间（0.5~1欧元）即可！
      ` + renderFollowupChips(chips);
    } else {
      return `
        💶 <strong>스페인 & 포르투갈 환전 및 통화 안내</strong>:<br><br>
        • <strong>스페인과 포르투갈 모두 유로(€)를 사용하므로 국경을 넘어도 추가 환전이 필요 없습니다.</strong><br>
        • 스페인에서 사용하시던 유로화 지폐와 동전을 포르투갈에서도 그대로 동일하게 사용하시면 됩니다.<br>
        • <strong>카드 결제:</strong> 트래블로그, 트래블월렛, 일반 비자/마스터 카드의 비접촉(컨택트리스) 결제가 95% 이상 지원되므로 현금 환전 부담이 적습니다.<br>
        • <strong>비상 현금:</strong> 전통 시장이나 유료 공중화장실(0.5~1유로) 이용을 위해 1인당 하루 20~30유로 정도의 소액 현금만 챙기시면 충분합니다!
      ` + renderFollowupChips(chips);
    }
  }

  // ----------------------------------------------------
  // 4. CORE TRAVEL INTENTS (핵심 여행 주제)
  // ----------------------------------------------------

  // 4-1. Food / Cuisine / Dishes / Dining (음식 / 요리 / 먹거리 / 맛집)
  const isFood = [
    '음식', '요리', '먹거리', '맛집', '식당', '맛있는', '먹을', '메뉴', '디저트', '푸드',
    'food', 'eat', 'dish', 'dishes', 'restaurant', 'dining', 'cuisine', 'specialty', 'snack', 'gourmet', 'tapas', 'paella', 'bacalhau',
    '料理', 'グルメ', '名物', '美味しい', 'レストラン', '食べ物', '食事', '郷土料理',
    '美食', '特色菜', '餐厅', '吃什么', '小吃', '招牌菜', '餐饮'
  ].some(w => q.includes(w) || cleanQ.includes(w));

  const isSpecificRestaurant = [
    '맛집', '식당', '레스토랑', '추천 맛집', '식당 추천',
    'restaurant', 'dining', 'bistrot', 'taberna', 'cafe',
    'レストラン', '名店', '食事処',
    '餐厅', '饭店', '名店'
  ].some(w => q.includes(w) || cleanQ.includes(w));

  // 4-2. Shopping & Souvenirs (쇼핑 / 기념품 / 선물 / 특산품)
  const isShopping = [
    '쇼핑', '기념품', '선물', '특산품', '살것', '살 것', '사야', '마트',
    'shopping', 'souvenir', 'souvenirs', 'gift', 'buy', 'what to buy', 'market',
    'お土産', '買い物', 'ショッピング', '名産品', '特産品', 'ギフト',
    '伴手礼', '特产', '纪念品', '购物', '买什么'
  ].some(w => q.includes(w) || cleanQ.includes(w));

  // 4-3. Sights / Places / Attractions (관광지 / 명소 / 가볼만한곳 / 코스)
  const isSights = [
    '관광지', '명소', '가볼만한', '볼거리', '여행지', '일정', '코스', '추천 코스', '궁전', '성당',
    'sight', 'sights', 'attraction', 'attractions', 'place', 'places', 'visit', 'highlight', 'cathedral', 'palace',
    '観光地', '見どころ', '名所', 'おすすめスポット', '宮殿', '大聖堂',
    '景点', '必去', '游玩', '名胜', '大教堂', '王宫'
  ].some(w => q.includes(w) || cleanQ.includes(w));

  // 4-4. Weather / Season / Timing / Clothing (날씨 / 기온 / 시기 / 옷차림)
  const isWeather = [
    '날씨', '기온', '추워', '더워', '비', '옷차림', '시기', '시즌', '가장 안 추운', '계절',
    'weather', 'temperature', 'climate', 'clothing', 'pack', 'rain', 'season', 'best time', 'best period', 'cold', 'warm',
    '天気', '気温', '気候', '服装', '季節', 'ベストシーズン', '雨', '寒い', '暖かい',
    '天气', '气温', '气候', '穿衣', '带什么衣服', '最佳季节', '最佳时间', '下雨'
  ].some(w => q.includes(w) || cleanQ.includes(w));

  // 4-5. Safety & Pickpockets (치안 / 소매치기 / 안전)
  const isSafety = [
    '치안', '소매치기', '안전', '위험', '도난', '주의',
    'safety', 'safe', 'danger', 'pickpocket', 'thief', 'security', 'caution',
    '治安', 'スリ', '安全', '危険', '盗難', '注意点',
    '治安', '小偷', '防盗', '安全', '防偷', '注意事项'
  ].some(w => q.includes(w) || cleanQ.includes(w));

  // 4-6. Transit / Trains / Uber (교통 / 기차 / 렌페 / 우버 / 루트)
  const isTransit = [
    '교통', '기차', '열차', '렌페', 'cp', '메트로', '지하철', '택시', '우버', 'bolt', '이동', '루트', '경로', '가는 법', '가는법', '이동법', '어떻게 가',
    'train', 'renfe', 'metro', 'transit', 'uber', 'taxi', 'transport', 'flight', 'station', 'route', 'routes', 'travel',
    '交通', '電車', '列車', 'レンフェ', '地下鉄', 'タクシー', 'ウーバー', '行き方', 'ルート',
    '火车', '高铁', '地铁', '打车', '出租车', '交通', '路线', '怎么去'
  ].some(w => q.includes(w) || cleanQ.includes(w));

  // 4-7. Budget & Expenses (예산 / 비용 / 경비 / 환율)
  const isBudget = [
    '비용', '예산', '얼마', '경비', '환율', '돈',
    'budget', 'cost', 'how much', 'price', 'expense', 'currency',
    '予算', '費用', 'いくら', '価格',
    '预算', '费用', '多少钱', '花费'
  ].some(w => q.includes(w) || cleanQ.includes(w));

  // 4-8. Card, Cash, Tipping & Restroom (결제 / 카드 / 팁 / 화장실)
  const isCardCash = [
    '카드', '현금', '팁', '화장실', '유로화',
    'card', 'cash', 'tip', 'tipping', 'restroom', 'toilet',
    'カード', '現金', 'チップ', 'トイレ',
    '刷卡', '现金', '小费', '厕所', '洗手间'
  ].some(w => q.includes(w) || cleanQ.includes(w));

  // 4-9. Tax Refund (텍스리펀)
  const isTaxRefund = [
    '텍스리펀', '택스리펀', '세금환급', '면세', 'diva',
    'tax refund', 'tax free', 'vat refund', 'tax refund',
    '免税', 'タックスリファンド', '税金還付',
    '退税', '免税'
  ].some(w => q.includes(w) || cleanQ.includes(w));

  // 4-10. Senior Care (시니어 케어 / 부모님 / 휠체어)
  const isSeniorCare = [
    '부모님', '어르신', '시니어', '무릎', '휠체어', '계단', '언덕', '체력',
    'senior', 'elderly', 'parents', 'wheelchair', 'stairs', 'hills', 'rest',
    'シニア', '両親', '高齢者', '車椅子', '階段', '坂道',
    '长辈', '老人', '父母', '轮椅', '台阶', '坡度'
  ].some(w => q.includes(w) || cleanQ.includes(w));

  // ----------------------------------------------------
  // 5. DISPATCH BY INTENT
  // ----------------------------------------------------

  // ====================================================
  // [NEW INTENT 1] IBERIA BORDER TRANSIT & BOOKING (스페인-포르투갈 이동/예매 질문)
  // ====================================================
  const isIberiaTransit = (
    (['마드리드', 'madrid', 'マドリード', '马德里'].some(w => q.includes(w) || cleanQ.includes(w)) &&
     ['리스본', 'lisbon', 'lisboa', 'リスボン', '里斯本'].some(w => q.includes(w) || cleanQ.includes(w))) ||
    (['스페인', 'spain', 'スペイン', '西班牙', '이베리아', 'iberia'].some(w => q.includes(w) || cleanQ.includes(w)) &&
     ['포르투갈', 'portugal', 'ポルトガル', '葡萄牙'].some(w => q.includes(w) || cleanQ.includes(w)) &&
     ['이동', '국경', '교통', 'route', 'transit', 'border', 'cross', 'travel'].some(w => q.includes(w) || cleanQ.includes(w))) ||
    ['국경 이동', '국경이동', '육로 이동', 'border crossing', '国境移動', '跨境交通'].some(w => q.includes(w) || cleanQ.includes(w)) ||
    ['alsa', '알사', '오미오', 'omio', '이지젯', 'easyjet', '에어유로파', 'air europa'].some(w => q.includes(w) || cleanQ.includes(w))
  ) && (
    ['이동', '기차', '열차', '렌페', '버스', '비행기', '항공', 'alsa', 'omio', '오미오', '알사', '이지젯', 'easyjet', '에어유로파', 'air europa', '라이언에어', 'ryanair', 'tap', '예매', '티켓', '표', '수하물', '짐', '소요', '가는', '어떻게',
     'transit', 'travel', 'train', 'bus', 'flight', 'ticket', 'booking', 'baggage', 'luggage', 'how to',
     '移動', '電車', '列車', 'バス', '飛行機', '予約', 'チケット', '荷物', '行き方',
     '交通', '火车', '大巴', '飞机', '订票', '行李', '怎么去', '如何前往'].some(w => q.includes(w) || cleanQ.includes(w))
  );

  if (isIberiaTransit) {
    let res = '';
    if (lang === 'ja') {
      res = `
        ✈️ <strong>🇪🇸 マドリード ➔ 🇵🇹 リスボン（国境移動・予約完全ガイド）</strong>:<br><br>
        マドリード〜リスボン間の移動は<strong>飛行機（所要約1時間20分）が最もおすすめ</strong>です！<br><br>
        1️⃣ <strong>飛行機（イチ押し・最も推奨！ 🌟）:</strong><br>
        • <strong>所要時間:</strong> 約<strong>1時間20分</strong>直行便（エア・ヨーロッパ、ライアンエアー、イージージェット、TAPポルトガル航空）。<br>
        • <strong>運賃のコツ:</strong> 航空券のみの基本料金は3〜5万ウォン（約3〜5千円）程度ですが、<strong>23kgの受託手荷物を追加すると1人あたり約8〜12万ウォン（約€60〜€85）</strong>になります。ご両親同伴なら長距離移動の疲労がなく圧倒的にお得で快適です！<br><br>
        2️⃣ <strong>高速バス（次善の策・長距離）:</strong><br>
        • <strong>所要時間:</strong> 約<strong>8〜9時間</strong>（マドリード「メンデス・アルバロ」バスターミナル発）。<br>
        • <strong>予約のコツ:</strong> 9時間の長旅ですので、<strong>ALSA公式アプリ</strong>または<strong>Omioアプリ</strong>で前方の座席間隔が広い<strong>Supra（優等・プレミアム席）</strong>を必ず事前予約してください。（窓口当日購入は非推奨）<br><br>
        3️⃣ <strong>鉄道・列車（絶対非推奨 ⚠️）:</strong><br>
        • 現在直行便がなく最低2回以上の乗り換えで<strong>10時間以上</strong>かかるため絶対におすすめしません。<br><br>
        💱 <strong>通貨＆両替の注意点:</strong><br>
        スペインとポルトガルは両国とも<strong>ユーロ（€）</strong>を通貨として使用しています。国境を越えても追加の両替は一切不要で、スペインで利用していたトラベルカードやユーロ現金をそのままご利用いただけます！<br><br>
        🎒 <strong>荷物配送サービス:</strong> 重いスーツケースの移動が心配な場合は、スペイン郵便（Correos）等のホテル間手荷物配送サービスを利用して身軽に手ぶらで国境を越えましょう！
      `;
    } else if (lang === 'en') {
      res = `
        ✈️ <strong>🇪🇸 Madrid ➔ 🇵🇹 Lisbon (Cross-Border Transit & Booking Guide)</strong>:<br><br>
        For traveling between Madrid and Lisbon, <strong>taking a flight (~1h 20m) is by far the best option</strong>!<br><br>
        1️⃣ <strong>Flight (Highly Recommended! 🌟):</strong><br>
        • <strong>Duration:</strong> Approx. <strong>1 hr 20 mins direct</strong> (Air Europa, Ryanair, easyJet, TAP).<br>
        • <strong>Fare Tip:</strong> Base fares start around $30, but <strong>adding a 23kg checked bag brings it to ~$80–$120 (₩80,000–₩120,000)</strong> per person. Absolutely worth it to save elderly parents from grueling overland fatigue!<br><br>
        2️⃣ <strong>Express Bus (Secondary Option - Budget Friendly):</strong><br>
        • <strong>Duration:</strong> Approx. <strong>8–9 hours</strong> from Madrid 'Méndez Álvaro' Station.<br>
        • <strong>Booking Tip:</strong> Long rides require comfort! Pre-book via the <strong>ALSA app or Omio app</strong> and select the wider, premium <strong>Supra seats</strong> in advance. (Walk-in booking not recommended)<br><br>
        3️⃣ <strong>Train (Strictly Not Recommended ⚠️):</strong><br>
        • There is no direct train between Madrid and Lisbon; requires 2+ transfers and takes <strong>over 10 hours</strong>.<br><br>
        💱 <strong>Currency Notice:</strong><br>
        Both Spain and Portugal use the <strong>Euro (€)</strong>. There is no need to exchange money when crossing the border; your travel cards and euros will work seamlessly!<br><br>
        🎒 <strong>Luggage Forwarding:</strong> If dragging heavy suitcases is a concern, use services like Correos (Spanish Post) or private baggage forwarders to ship luggage between hotels door-to-door!
      `;
    } else if (lang === 'zh') {
      res = `
        ✈️ <strong>🇪🇸 马德里 ➔ 🇵🇹 里斯本（跨境交通与预订全攻略）</strong>:<br><br>
        马德里与里斯本之间的跨境出行，<strong>搭乘飞机（耗时约1小时20分）是最为推荐的首选方案</strong>！<br><br>
        1️⃣ <strong>飞机直飞（长辈同行最强烈推荐！ 🌟）：</strong><br>
        • <strong>飞行耗时：</strong> 直飞仅需约<strong>1小时20分钟</strong>（欧罗巴航空、瑞安航空、易捷航空、葡萄牙航空TAP）。<br>
        • <strong>票价贴士：</strong> 基础裸票仅需200~300元，但<strong>增加23kg托运行李后单人约400~600元（8~12万韩元）</strong>。长辈同行完全免除长途奔波体力消耗，极度推荐！<br><br>
        2️⃣ <strong>长途大巴（次选方案 - 经济实惠）：</strong><br>
        • <strong>运行耗时：</strong> 约<strong>8~9小时</strong>（从马德里门德斯·阿尔瓦罗 Méndez Álvaro 南站发车）。<br>
        • <strong>订票技巧：</strong> 9小时长途较辛苦，请务必通过 <strong>ALSA官方App</strong> 或 <strong>Omio App</strong> 提前预订前排宽敞舒适的 <strong>Supra豪华头等座</strong>。（不推荐现场排队买票）<br><br>
        3️⃣ <strong>火车直通（极不推荐 ⚠️）：</strong><br>
        • 目前两地间无直达列车，需换乘2次以上且全程耗时<strong>超过10小时</strong>，家庭长辈出行绝不推荐。<br><br>
        💱 <strong>货币贴士：</strong><br>
        西班牙与葡萄牙均通用<strong>欧元（€）</strong>，跨越国境完全无需额外兑换货币！常用旅行卡与现金均可无缝直接使用。<br><br>
        🎒 <strong>行李托运服务：</strong> 若携带大件行李不便，可通过西班牙邮政（Correos）或第三方行李寄送服务在酒店间门到门预先转运，轻装惬意过境！
      `;
    } else {
      res = `
        ✈️ <strong>🇪🇸 마드리드 ➔ 🇵🇹 리스본 (국경 이동 & 예매 총정리 가이드)</strong>:<br><br>
        마드리드-리스본 국경 이동은 <strong>비행기(약 1시간 20분)를 가장 추천</strong>하며 수하물 추가 시 인당 약 8~12만 원입니다! 🌟<br><br>
        1️⃣ <strong>비행기 이동 (가장 강력 추천! 🌟):</strong><br>
        • <strong>소요시간:</strong> 직항 약 <strong>1시간 20분</strong>.<br>
        • <strong>추천 항공사:</strong> 에어유로파(Air Europa), 라이언에어(Ryanair), 이지젯(easyJet), 탭 포르투갈(TAP).<br>
        • <strong>요금 팁:</strong> 비행기 깡통 요금은 3~5만 원이지만, <strong>23kg 수하물을 추가하면 인당 약 8~12만 원</strong>이 됩니다. 부모님 동행 시 체력 소모가 없어 압도적으로 이득입니다!<br><br>
        2️⃣ <strong>고속버스 (차선책 - 가성비 여행 시):</strong><br>
        • <strong>소요시간:</strong> 약 <strong>8~9시간</strong>. 마드리드 '멘데스 알바로(Méndez Álvaro)' 남부터미널 출발.<br>
        • <strong>예매 팁:</strong> 9시간 이동은 무리가 가므로, <strong>ALSA 공식 앱</strong>이나 <strong>Omio(오미오) 앱</strong>을 통해 반드시 앞쪽의 넓은 <strong>수프라(Supra) 우등석</strong>을 사전 예매하세요. (현장 발권 비추천)<br><br>
        3️⃣ <strong>기차/철도 이동 (절대 비추천 ⚠️):</strong><br>
        • 직행 열차가 없고 최소 2회 환승하며 <strong>10시간 이상</strong> 걸리므로 부모님 동행 시 절대 비추천합니다.<br><br>
        💱 <strong>통화 및 환전 주의사항:</strong><br>
        스페인과 포르투갈 모두 <strong>유로(€)</strong>를 사용합니다. 국경을 넘어도 화폐를 바꿀 필요 없이, 스페인에서 쓰던 트래블월렛/트래블로그 카드와 유로 현금을 그대로 사용하시면 됩니다!<br><br>
        🎒 <strong>짐 배송 서비스 (Baggage Forwarding):</strong><br>
        무거운 캐리어를 끌고 이동하는 것이 부담스럽다면, 스페인 우체국(Correos)이나 사설 수하물 배송 업체를 이용해 숙소 간 짐을 미리 보내버리세요. 두 손 가볍게 국경을 넘을 수 있습니다!
      `;
    }
    const chips = [
      { query: '스페인 포르투갈 환전 어떻게 해? 유로 써?', label: '💶 유로 환전/통화' },
      { query: '바르셀로나에서 마드리드 어떻게 가?', label: '🚆 바르셀로나 ➔ 마드리드' },
      { query: '리스본에서 포르투 이동법', label: '🚆 리스본 ➔ 포르투' }
    ];
    return res + renderFollowupChips(chips);
  }

  // ====================================================
  // [NEW INTENT 2] DUBAI 24H STOPOVER & LUGGAGE STORAGE (두바이 스톱오버 / 짐 보관 질문)
  // ====================================================
  const isDubaiStopover = (
    ['에미레이트', '두바이', 'dubai', 'emirates', 'ドバイ', 'エミレーツ', '迪拜', '阿联酋'].some(w => q.includes(w) || cleanQ.includes(w))
  ) && (
    ['경유', '스톱오버', '스탑오버', '24시간', '24h', '짐 보관', '짐보관', '수하물', '보관소', '환승',
     'stopover', 'layover', 'transit', '24 hour', '24hr', '24h', 'luggage', 'baggage', 'storage', 'left luggage',
     '経由', '乗換', '乗り継ぎ', 'ストップオーバー', '24時間', '荷物預かり', '手荷物預かり',
     '经停', '过境', '中转', '24小时', '行李寄存', '寄存'].some(w => q.includes(w) || cleanQ.includes(w))
  );

  if (isDubaiStopover) {
    let res = '';
    if (lang === 'ja') {
      res = `
        🐪 <strong>エミレーツ航空 ドバイ経由 24時間ストップオーバー＆荷物預かり完全ガイド</strong>:<br><br>
        エミレーツ航空を利用してドバイを経由されるなら本当に素晴らしい選択です！長時間のフライトの合間に近未来の魅惑的な都市を軽快に満喫できます。<br><br>
        🧳 <strong>空港での荷物預かり（手荷物一時預かり所）:</strong><br>
        • <strong>場所:</strong> ドバイ国際空港（DXB）<strong>第3ターミナル（Terminal 3）到着階（Arrivals）</strong>のエミレーツセキュリティ手荷物預かり所。<br>
        • <strong>料金:</strong> 12時間あたり荷物1個につき約<strong>35〜40 AED（約1,400〜1,600円）</strong>で安全に利用可能。<br>
        • <strong>利用のコツ:</strong> 重いスーツケースを空港に預けて身軽に市内観光へ出発できます。また、エミレーツ航空の公式ホテルストップオーバーサービスを利用するのも大変おすすめです。<br><br>
        🏙️ <strong>シニア同伴におすすめの24時間ハイライト推奨コース:</strong><br>
        1️⃣ <strong>ドバイ・フレーム（Dubai Frame）:</strong> ドバイの過去と未来をパノラマで一望できる黄金の巨大フレーム展望台（エレベーター完備）。<br>
        2️⃣ <strong>ドバイ・モール＆噴水ショー（The Dubai Mall & Fountain）:</strong> 快適な冷房完備の巨大モールでゆったり散策＆夕暮れの華麗な音楽噴水ショー鑑賞。<br>
        3️⃣ <strong>未来博物館（Museum of the Future）:</strong> 壮麗なアラビア書道の建築美を誇る人気フォトスポット＆先端技術体験。
      `;
    } else if (lang === 'en') {
      res = `
        🐪 <strong>Emirates Airlines Dubai 24h Stopover & Luggage Storage Guide</strong>:<br><br>
        Choosing a Dubai stopover with Emirates Airlines is an exceptional choice! It perfectly breaks up the long journey while allowing you to explore a stunning modern oasis.<br><br>
        🧳 <strong>Airport Luggage Storage:</strong><br>
        • <strong>Location:</strong> Dubai International Airport (DXB) <strong>Terminal 3, Arrivals level</strong> (Emirates secure baggage storage facility).<br>
        • <strong>Fee:</strong> Approx. <strong>35–40 AED (~$10–$11 USD)</strong> per bag for 12 hours.<br>
        • <strong>Pro Tip:</strong> Store your heavy suitcases safely and explore the city hands-free, or make use of the Emirates Stopover Hotel program.<br><br>
        🏙️ <strong>Recommended 24-Hour Senior-Friendly Route:</strong><br>
        1️⃣ <strong>Dubai Frame:</strong> Iconic golden archway bridging historic Dubai and the futuristic skyline (fully elevator equipped).<br>
        2️⃣ <strong>The Dubai Mall & Fountain Show:</strong> World-class indoor climate-controlled stroll followed by the magnificent evening outdoor musical fountain show.<br>
        3️⃣ <strong>Museum of the Future:</strong> Breathtaking architectural landmark featuring Arabic calligraphy, perfect for photos and futuristic exhibits.
      `;
    } else if (lang === 'zh') {
      res = `
        🐪 <strong>阿联酋航空 迪拜经停24小时过境游推荐路线与行李寄存全攻略</strong>:<br><br>
        搭乘阿联酋航空选择在迪拜中转经停过境绝对是明智之选！不仅有效舒缓长途飞行疲劳，还能轻松领略这座奢华现代都市的非凡魅力。<br><br>
        🧳 <strong>机场行李寄存（Luggage Storage）：</strong><br>
        • <strong>位置：</strong> 迪拜国际机场（DXB）<strong>第3航站楼（Terminal 3）到达层（Arrivals）</strong>阿联酋航空安保行李寄存处。<br>
        • <strong>费用：</strong> 12小时每件行李约<strong>35~40迪拉姆（AED，约合人民币70~80元）</strong>。<br>
        • <strong>贴士：</strong> 寄存沉重大件行李后即可轻装进城游玩，也可以选择预订阿联酋航空官方酒店过境经停套餐。<br><br>
        🏙️ <strong>适合长辈的24小时精选推荐路线：</strong><br>
        1️⃣ <strong>迪拜相框（Dubai Frame）：</strong> 纵览老城与新城天际线的金色巨框观景台（全无障碍直梯直达顶部）。<br>
        2️⃣ <strong>迪拜购物中心与音乐喷泉（Dubai Mall & Fountain）：</strong> 全程强力冷气舒适室内漫步，傍晚欣赏震撼迷人的户外音乐喷泉秀。<br>
        3️⃣ <strong>未来博物馆（Museum of the Future）：</strong> 令人叹为观止的阿拉伯书法雕花建筑打卡与未来科技体验。
      `;
    } else {
      res = `
        🐪 <strong>에미레이트 항공 두바이 경유 24시간 스톱오버 & 짐 보관 추천 가이드</strong>:<br><br>
        에미레이트 항공을 이용해 두바이를 경유하신다면 정말 탁월한 선택입니다! 짐 보관은 두바이 공항 제3터미널 도착층(Arrivals)의 에미레이트 보안 수하물 보관소에 유료(약 35~40 AED)로 맡기고 시내를 가볍게 둘러보실 수 있습니다. 또는 호텔 스톱오버 서비스를 이용하세요.<br><br>
        🏙️ <strong>추천 코스:</strong><br>
        '<strong>두바이 프레임 ➔ 두바이 몰(분수 쇼) ➔ 미래의 박물관</strong>' 순서입니다.
      `;
    }
    const chips = [
      { query: '두바이 맛집 추천해줘', label: '🍽️ 두바이 맛집' },
      { query: '두바이 사막 사파리 부모님 주의사항과 복장', label: '🐪 사막 사파리 팁' },
      { query: '두바이에서 아부다비 이동법', label: '🚕 두바이 ➔ 아부다비' }
    ];
    return res + renderFollowupChips(chips);
  }

  // ====================================================
  // [NEW INTENT 3] MENÚ DEL DÍA / COST-EFFECTIVE DINING (식비 가성비 / 메누 델 디아 꿀팁)
  // ====================================================
  const isMenuDelDia = [
    '식비', '절약', '가성비', '점심', '메누 델 디아', '메누델디아', '델 디아', '델디아', 'menu del dia', 'menú del día',
    '점심 코스', '점심코스', '오늘의 메뉴', '가성비 점심', '점심 특선', '점심 식비', '식비 절약', '식비 아끼',
    'lunch budget', 'daily menu', 'cheap lunch', 'lunch special', 'dining budget', 'save food',
    'メニュ・デル・ディア', 'メニュデルディア', '食費節約', 'コスパランチ', '日替わり定食', 'ランチコース',
    '每日套餐', '每日特选', '午餐套餐', '餐饮省钱', '省餐费', '性价比午餐'
  ].some(w => q.includes(w) || cleanQ.includes(w)) || (
    (['식비', '식사비', '음식값', '밥값', 'food budget', 'dining cost', '食費', '餐费'].some(w => q.includes(w) || cleanQ.includes(w))) &&
    (['절약', '아끼', '가성비', '줄이', 'save', 'cheap', 'budget', '節約', '安く', '省钱', '划算'].some(w => q.includes(w) || cleanQ.includes(w)))
  ) || (
    (['점심', 'lunch', 'ランチ', '午餐'].some(w => q.includes(w) || cleanQ.includes(w))) &&
    (['가성비', '코스', '절약', '메뉴', 'course', 'set', 'コスパ', '套餐'].some(w => q.includes(w) || cleanQ.includes(w)))
  );

  if (isMenuDelDia) {
    let res = '';
    if (lang === 'ja') {
      res = `
        🥘 <strong>スペイン食費節約の決定版！「メニュ・デル・ディア（Menú del Día）」活用ガイド</strong>:<br><br>
        スペイン旅行で食費を賢く節約する最大の秘訣は、まさに<strong>「メニュ・デル・ディア（Menú del Día＝本日の日替わりランチコース）」</strong>です！ 🍷<br><br>
        • <strong>提供時間:</strong> スペインの一般的な昼食時間帯である<strong>13:30〜15:30</strong>に街中のレストランで提供されます。<br>
        • <strong>驚きの価格:</strong> 1人あたりわずか<strong>€12〜€15（約1万8千〜2万2千ウォン / 約2,000〜2,500円）</strong>程度！<br>
        • <strong>豪華なフルコース内容:</strong><br>
          1️⃣ <strong>前菜（Primero）:</strong> 新鮮サラダ、パエリア、温かいスープ、ガスパチョなどから選択<br>
          2️⃣ <strong>メイン（Segundo）:</strong> イベリコ豚ステーキ、白身魚のグリル、ローストチキンなどから選択<br>
          3️⃣ <strong>デザート（Postre）:</strong> プリン（フラン）、アイスクリーム、またはコーヒー<br>
          4️⃣ <strong>ドリンク＆パン付き:</strong> ハウスワイン1本（またはビール/水）とバゲットパンが無料セット！<br><br>
        💡 <strong>食費節約の黄金ルール:</strong> お昼は「メニュ・デル・ディア」でしっかり温かいごちそうを食べ、夕食はAirbnbのキッチンやスーパーの生ハム・果物で軽めに済ませると<strong>食費を半分に節約</strong>でき、ご両親の胃腸の負担も減らせます！
      `;
    } else if (lang === 'en') {
      res = `
        🥘 <strong>Spain Dining Budget Secret: The Iconic 'Menú del Día' (Daily Lunch Special)!</strong><br><br>
        The ultimate secret to slashing dining expenses while enjoying authentic Spanish cuisine is the legendary <strong>'Menú del Día' (Menu of the Day)</strong>! 🍷<br><br>
        • <strong>Service Hours:</strong> Served during traditional Spanish lunch hours, roughly <strong>1:30 PM to 3:30 PM</strong> at local restaurants.<br>
        • <strong>Price:</strong> An unbelievable <strong>€12–€15 (~$13–$16 USD / ~₩18,000–₩22,000)</strong> per person!<br>
        • <strong>Full Multi-Course Value:</strong><br>
          1️⃣ <strong>First Course (Primero):</strong> Mixed fresh salad, paella, soup, or gazpacho.<br>
          2️⃣ <strong>Second Course (Segundo):</strong> Grilled Iberian pork steak, tender roast chicken, or catch of the day.<br>
          3️⃣ <strong>Dessert (Postre):</strong> Traditional flan (caramel custard), ice cream, or espresso.<br>
          4️⃣ <strong>Drinks & Bread:</strong> A full bottle of house wine (or beer/water) and artisan baguette included!<br><br>
        💡 <strong>Family Travel Budget Tip:</strong> Feast heartily on the Menú del Día for lunch, then prepare a light dinner with fresh Jamón, bread, and fruits at your Airbnb. You will <strong>cut your food budget in half</strong> while keeping meals comfortable and gentle on digestion for parents!
      `;
    } else if (lang === 'zh') {
      res = `
        🥘 <strong>西班牙餐饮省钱绝招！超高性价比午餐“每日特选套餐（Menú del Día）”秘籍</strong>:<br><br>
        在西班牙旅行中大幅节省餐饮预算的核心秘诀，正是当地经典的<strong>“Menú del Día（每日午餐超值全套套餐）”</strong>！ 🍷<br><br>
        • <strong>供应时段：</strong> 西班牙正统午餐时间 <strong>下午1:30至3:30</strong>，各大本地餐厅均有供应。<br>
        • <strong>超高性价比：</strong> 人均仅需 <strong>€12 ~ €15（约合人民币95~120元 / 2万韩元）</strong>！<br>
        • <strong>丰盛全套配置：</strong><br>
          1️⃣ <strong>头盘前菜（Primero）：</strong> 海鲜饭、鲜蔬沙拉、热汤或西班牙冷汤。<br>
          2️⃣ <strong>主菜（Segundo）：</strong> 现煎伊比利亚黑猪排、烤鸡腿或香煎当日鲜鱼排。<br>
          3️⃣ <strong>甜品（Postre）：</strong> 手工焦糖布丁（Flan）、冰淇淋或浓缩咖啡。<br>
          4️⃣ <strong>免费酒水与面包：</strong> 通常免费赠送整瓶佐餐红葡萄酒（或水/啤酒）及现烤法棍面包！<br><br>
        💡 <strong>家庭省钱黄金法则：</strong> 中午在餐厅享用热腾腾且份量十足的 Menú del Día，晚餐在民宿轻食料理或搭配火腿水果沙拉，<strong>餐费能直接减半</strong>，长辈肠胃也更舒服无负担！
      `;
    } else {
      res = `
        🥘 <strong>스페인 식비 절약의 핵심은 바로 '메누 델 디아(Menú del Día)'입니다!</strong> 🍷<br><br>
        점심(오후 1시 30분 ~ 3시 30분)에 식당에 가면 전식, 본식, 디저트, 와인까지 <strong>12~15유로(약 2만 원)</strong>에 푸짐한 코스 요리를 즐길 수 있습니다.<br><br>
        • <strong>알찬 코스 구성:</strong><br>
          1️⃣ <strong>전식(Primero):</strong> 신선한 샐러드, 파에야, 수프, 가스파초 중 택1<br>
          2️⃣ <strong>본식(Segundo):</strong> 이베리코 돼지고기 스테이크, 생선 구이, 닭요리 등 든든한 메인 요리 중 택1<br>
          3️⃣ <strong>디저트(Postre):</strong> 달콤한 플랑(푸딩), 아이스크림 또는 에스프레소 커피<br>
          4️⃣ <strong>음료 무료 포함:</strong> 하우스 와인 1병(또는 물/맥주)과 바게트 빵 기본 제공!<br><br>
        💡 점심을 든든히 드시고 저녁은 에어비앤비에서 가볍게 해 드시면 <strong>식비를 절반으로 줄일 수 있습니다</strong>. 부모님 소화에도 아주 좋습니다!
      `;
    }
    const chips = [
      { query: '스페인 맛집 추천해줘', label: '🥘 스페인 맛집' },
      { query: '소금 빼주세요 스페인어로 뭐야?', label: '🧂 소금 빼기 표현' },
      { query: '현재 여행 총 예상 경비와 예산 얼마야?', label: '💰 총 여행 예산' }
    ];
    return res + renderFollowupChips(chips);
  }

  // [A] FOOD & CUISINE INTENT
  if (isFood) {
    if (isPortugal || (!isSpain && !isDubai)) {
      let res = '';
      if (lang === 'ja') {
        res = `
          🥧 <strong>ポルトガルを代表する伝統名物料理 TOP 4</strong>:<br><br>
          1️⃣ <strong>バカリャウ（Bacalhau - 塩漬けタラ料理）:</strong> 「国民食」と呼ばれるタラ料理。ほぐしたタラとフライドポテトを卵でとじた<em>『バカリャウ・ア・ブラス』</em>は日本人の口にも合い、ご両親にも大好評です！<br>
          2️⃣ <strong>パステル・デ・ナタ（Pastel de Nata - エッグタルト）:</strong> リスボンのベレン地区発祥。サクサクのパイ生地と濃厚で優しいカスタードクリームにシナモンを振って食べるのが本場のスタイルです。<br>
          3️⃣ <strong>アホス・デ・マリスコ（Arroz de Marisco - 濃厚魚介リゾット）:</strong> エビ、カニ、アサリの旨味が凝縮されたトマト風味の雑炊風スープご飯。シニアの胃腸にも優しく温まります。<br>
          4️⃣ <strong>フランセジーニャ（Francesinha - ポルト名物サンド）:</strong> お肉をたっぷり挟み、とろけるチーズと特製ピリ辛ビールソースをかけた大満足の一品！
        `;
      } else if (lang === 'en') {
        res = `
          🥧 <strong>Iconic Must-Try Portuguese Cuisine TOP 4</strong>:<br><br>
          1️⃣ <strong>Bacalhau à Brás (Salted Cod with Eggs & Potatoes):</strong> Portugal's beloved national staple. Shredded cod sautéed with thin potato matchsticks, sweet onions, and scrambled eggs—mild, savory, and senior-friendly!<br>
          2️⃣ <strong>Pastel de Nata (Custard Tart):</strong> Lisbon's world-famous pastry. Warm, flaky layers cradling a silky, caramelized egg custard, best dusted with cinnamon.<br>
          3️⃣ <strong>Arroz de Marisco (Seafood Rice Stew):</strong> A comforting, rich tomato broth packed with prawns, clams, and crab. Hydrating and deeply satisfying for tired travelers.<br>
          4️⃣ <strong>Francesinha (Porto Specialty Sandwich):</strong> Layers of tender meats smothered under melted cheese and a piping hot beer-tomato gravy!
        `;
      } else if (lang === 'zh') {
        res = `
          🥧 <strong>葡萄牙最负盛名的传统特色美食 TOP 4</strong>:<br><br>
          1️⃣ <strong>布拉斯式马介休（Bacalhau à Brás）：</strong> 葡萄牙国菜鳕鱼料理！将咸鳕鱼撕成细丝与金黄土豆细丝、洋葱及滑嫩鸡蛋炒匀，鲜香温润，非常迎合长辈口味。<br>
          2️⃣ <strong>葡式蛋挞（Pastel de Nata）：</strong> 贝伦区修道院秘方发源地。千层酥皮层层酥脆，内馅蛋奶香浓郁滚烫，撒上少许肉桂粉更添风味。<br>
          3️⃣ <strong>葡式海鲜泡饭（Arroz de Marisco）：</strong> 汇聚大虾、青口贝和螃蟹精华的番茄高汤海鲜饭，口感温润多汁，抚慰旅途肠胃。<br>
          4️⃣ <strong>波尔图湿答答三明治（Francesinha）：</strong> 肉香浓郁的特制吐司，覆盖厚厚拉丝芝士并淋上热腾腾的秘制啤酒番茄酱汁！
        `;
      } else {
        res = `
          🥧 <strong>포르투갈 대표 명물 음식 TOP 4</strong>:<br><br>
          1️⃣ <strong>바칼라우 아 브라스 (Bacalhau à Brás):</strong> 포르투갈의 영혼이 담긴 염장 대구 요리입니다. 가늘게 썬 감자튀김, 대구살, 양파를 달걀과 함께 부드럽게 볶아내어 어르신 입맛에도 자극 없이 아주 담백하고 고소합니다.<br>
          2️⃣ <strong>파스텔 드 나타 (Pastel de Nata - 에그타르트):</strong> 바삭한 페이스트리 안에 부드럽고 따뜻한 커스터드 크림이 가득 차 있으며, 계피 가루를 살짝 뿌려 에스프레소(비카)와 함께 드시면 최고의 궁합입니다.<br>
          3️⃣ <strong>아로스 드 마리스코 (Arroz de Marisco - 해물 국물 밥):</strong> 싱싱한 새우, 게, 조개가 듬뿍 들어간 토마토 베이스의 따뜻한 국물 리조또로, 여행 중 얼큰하고 시원한 국물이 그리우실 때 부모님께 최고의 한 끼가 됩니다.<br>
          4️⃣ <strong>프란세지냐 (Francesinha):</strong> 포르투 대표 샌드위치로 빵 사이에 스테이크와 소시지를 넣고 치즈와 특제 맥주 소스를 듬뿍 얹어 오븐에 구워낸 든든한 별미입니다.
        `;
      }
      if (isSpecificRestaurant) {
        res += renderMatchingDiningCards('portugal');
      }
      const chips = [
        { query: '스페인 맛집 추천해줘', label: '🥘 스페인 대표 음식' },
        { query: '소금 빼주세요 스페인어', label: '🧂 소금 빼주세요 문구' },
        { query: '리스본에서 포르투 이동법', label: '🚆 리스본 ➔ 포르투 이동' }
      ];
      return res + renderFollowupChips(chips);
    }

    if (isSpain) {
      let res = '';
      if (lang === 'ja') {
        res = `
          🥘 <strong>スペインを代表する必食グルメ TOP 4</strong>:<br><br>
          1️⃣ <strong>パエリア（Paella）:</strong> バレンシア発祥のサフラン香る名物鍋ご飯。魚介パエリアは日本人の舌にも馴染みやすく大人気です。<br>
          2️⃣ <strong>タパス各種（Tapas）:</strong> ガンバス・アル・アヒージョ（エビのニンニクオイル煮）、トルティーヤ（スペイン風オムレツ）など小皿で多彩な味を楽しめます。<br>
          3️⃣ <strong>イベリコ豚生ハム（Jamón Ibérico）:</strong> どんぐりを食べて育った最高級ベジョータ（Bellota）は口の中でとろける芳醇な旨味が格別です。<br>
          4️⃣ <strong>チュロス・コン・チョコラテ:</strong> 揚げたてサクサクのチュロスを温かい濃厚チョコレートにディップして食べる伝統の朝食・おやつです。
        `;
      } else if (lang === 'en') {
        res = `
          🥘 <strong>Iconic Spanish Culinary Delights TOP 4</strong>:<br><br>
          1️⃣ <strong>Authentic Paella:</strong> Fragrant saffron-infused rice pan cooked with tender seafood or Valencian meats. A joyous centerpiece for family feasts!<br>
          2️⃣ <strong>Tapas & Pintxos:</strong> Sizzling garlic shrimp (*Gambas al Ajillo*), golden Spanish potato omelette (*Tortilla Española*), and Iberian croquettes.<br>
          3️⃣ <strong>Jamón Ibérico de Bellota:</strong> Acorn-fed cured ham hand-sliced paper-thin. Melts effortlessly at room temperature with rich nutty umami.<br>
          4️⃣ <strong>Churros con Chocolate:</strong> Crispy golden fried churros served alongside rich, molten dark dipping chocolate!
        `;
      } else if (lang === 'zh') {
        res = `
          🥘 <strong>西班牙必尝四大经典殿堂级美食</strong>:<br><br>
          1️⃣ <strong>西班牙海鲜饭（Paella）：</strong> 藏红花金黄米饭浸满海鲜高汤精华，锅底微微焦香的锅巴（Socarrat）更是精髓。<br>
          2️⃣ <strong>特色小吃（Tapas）：</strong> 滚烫油蒜大虾（Gambas al Ajillo）、厚切土豆鸡蛋饼（Tortilla Española）及伊比利亚火腿炸丸子。<br>
          3️⃣ <strong>伊比利亚火腿（Jamón Ibérico de Bellota）：</strong> 橡果喂养最高等级黑猪火腿，现切薄如蝉翼，油脂在唇齿间温润化开。<br>
          4️⃣ <strong>热巧油条（Churros con Chocolate）：</strong> 现炸酥脆金黄西班牙油条，蘸满浓郁滚烫的黑巧克力浆，经典早餐首选！
        `;
      } else {
        res = `
          🥘 <strong>스페인 대표 명물 음식 TOP 4</strong>:<br><br>
          1️⃣ <strong>정통 파에야 (Paella):</strong> 사프란 향이 은은한 전통 쌀 요리로, 싱싱한 해산물이 듬뿍 올라간 마리스코 파에야는 부모님 입맛에도 매우 잘 맞습니다.<br>
          2️⃣ <strong>타파스 (Tapas):</strong> 올리브유와 마늘 향이 일품인 감바스 알 아히요(Gambas al Ajillo), 촉촉한 스페인식 감자 오믈렛(Tortilla) 등 부담 없이 골라 드실 수 있습니다.<br>
          3️⃣ <strong>하몬 이베리코 데 베요타 (Jamón Ibérico):</strong> 도토리를 먹고 자란 최고급 흑돼지 뒷다리를 자연 건조 숙성한 생햄으로, 입안에서 사르르 녹는 깊은 풍미를 자랑합니다.<br>
          4️⃣ <strong>츄러스 콘 초콜라테 (Churros):</strong> 갓 튀겨낸 바삭한 츄러스를 진하고 따뜻한 초콜릿 쇼콜라테에 푹 찍어 드시는 스페인 국민 간식입니다.
        `;
      }
      if (isSpecificRestaurant) {
        res += renderMatchingDiningCards('spain');
      }
      const chips = [
        { query: '바르셀로나에서 마드리드 어떻게 가?', label: '🚆 바르셀로나 ➔ 마드리드' },
        { query: '마드리드에서 세비야 이동법', label: '🚄 마드리드 ➔ 세비야' },
        { query: '소금 빼주세요 스페인어', label: '🧂 소금 빼기 표현' }
      ];
      return res + renderFollowupChips(chips);
    }

    if (isDubai) {
      let res = '';
      if (lang === 'ja') {
        res = `
          🐪 <strong>ドバイ＆中東の代表的ごちそうグルメ</strong>:<br><br>
          • <strong>アル・マチブース（Al Machboos）:</strong> スパイスとラム肉やチキンの旨味が染み込んだ伝統の香り高い炊き込みご飯。<br>
          • <strong>シャワルマ（Shawarma）:</strong> 香ばしく焼き上げたお肉と新鮮野菜を薄焼きピタパンで巻いた手軽で美味しい国民食。<br>
          • <strong>カラクティー＆デーツ（Karak Tea & Dates）:</strong> カルダモンとコンデンスミルクが効いた濃厚チャイティーと、高級デーツ（バティールなど）の甘みは旅の疲れを癒します。
        `;
      } else if (lang === 'en') {
        res = `
          🐪 <strong>Dubai & Arabian Gastronomic Highlights</strong>:<br><br>
          • <strong>Al Machboos:</strong> Traditional spiced rice delicately layered with slow-cooked tender lamb or chicken, infused with dried limes and saffron.<br>
          • <strong>Authentic Shawarma:</strong> Thinly shaved spiced rotisserie meat wrapped in warm flatbread with creamy tahini or garlic toum.<br>
          • <strong>Karak Tea & Royal Dates:</strong> Fragrant cardamom milk tea paired with gourmet Bateel stuffed dates—ideal for soothing stopover fatigue.
        `;
      } else if (lang === 'zh') {
        res = `
          🐪 <strong>迪拜与阿拉伯特色美食代表</strong>:<br><br>
          • <strong>马吉布斯香料手抓饭（Al Machboos）：</strong> 融入藏红花与干柠檬慢炖的羊肉或鸡肉手抓饭，香气四溢。<br>
          • <strong>正宗沙威玛烤肉卷（Shawarma）：</strong> 旋转烤肉薄切裹入刚出炉的松软面饼，佐以香浓蒜酱，极为美味。<br>
          • <strong>卡拉克奶茶与椰枣（Karak Tea）：</strong> 荳蔻与浓香炼乳交织的阿拉伯奶茶，搭配Bateel皇室椰枣，休憩补充能量绝配。
        `;
      } else {
        res = `
          🐪 <strong>두바이 대표 아라비안 별미</strong>:<br><br>
          • <strong>알 마츠부스 (Al Machboos):</strong> 향긋한 사프란과 카다멈, 부드러운 양고기나 닭고기를 얹어 지어낸 아랍 전통 볶음밥입니다.<br>
          • <strong>정통 샤와르마 (Shawarma):</strong> 숯불에 구운 얇은 고기와 채소, 마늘 소스를 쫄깃한 피타 빵에 말아 먹는 국민 간식입니다.<br>
          • <strong>카락 티 & 왕실 대추야자 (Bateel):</strong> 카다멈과 연유 향이 짙은 달콤한 아랍식 밀크티와 바틸(Bateel) 프리미엄 대추야자로 장시간 비행의 피로를 푸세요.
        `;
      }
      res += renderMatchingDiningCards('dubai');
      const chips = [
        { query: '두바이에서 아부다비 이동법', label: '🚕 두바이 ➔ 아부다비' },
        { query: '두바이 사막 사파리 팁', label: '🐪 사막 사파리 팁' }
      ];
      return res + renderFollowupChips(chips);
    }
  }

  // [B] SHOPPING & SOUVENIR INTENT
  if (isShopping) {
    if (isPortugal) {
      const chips = [
        { query: '스페인 쇼핑 기념품 추천', label: '🎁 스페인 쇼핑 추천' },
        { query: '택스리펀 받는 법', label: '🛍️ 택스리펀(DIVA)' }
      ];
      if (lang === 'ja') {
        return `
          🎁 <strong>ポルトガルで絶対に買うべきおすすめ土産 TOP 5</strong>:<br><br>
          1️⃣ <strong>バルセロスの雄鶏（Galo de Barcelos）:</strong> 幸運と正義を運ぶポルトガルの象徴。<br>
          2️⃣ <strong>ポートワイン（Port Wine）:</strong> ポルト・ドウロ渓谷産の芳醇で甘口の酒精強化ワイン（テイラーズ、グラハムなど）。<br>
          3️⃣ <strong>高級オイルサーディン缶詰（Conserveira de Lisboa）:</strong> 美しいヴィンテージデザインでばらまき土産に最適。<br>
          4️⃣ <strong>天然コルク製品（Cork）:</strong> 世界シェア1位の軽くて丈夫なエコバッグ、コースター、財布。<br>
          5️⃣ <strong>ベナモール（Benamôr）ハンドクリーム:</strong> 1925年創業、王室御用達の天然コスメ。
        ` + renderFollowupChips(chips);
      } else if (lang === 'en') {
        return `
          🎁 <strong>Top 5 Authentic Portuguese Souvenirs & Gifts</strong>:<br><br>
          1️⃣ <strong>Rooster of Barcelos (Galo de Barcelos):</strong> The beloved folk emblem of good luck and honest truth.<br>
          2️⃣ <strong>Port Wine:</strong> Rich, velvety dessert wines from the Douro Valley (Taylor's, Graham's, Dow's).<br>
          3️⃣ <strong>Artisanal Canned Sardines:</strong> Vintage hand-wrapped retro tins from historic cannery boutiques (*Conserveira de Lisboa*).<br>
          4️⃣ <strong>Eco-Friendly Cork Products:</strong> Ultralight, water-resistant bags, coasters, and wallets.<br>
          5️⃣ <strong>Benamôr Lisboa 1925 Hand Lotions:</strong> Historic royal botanical cosmetics formulated with sweet almond oil.
        ` + renderFollowupChips(chips);
      } else if (lang === 'zh') {
        return `
          🎁 <strong>葡萄牙必买TOP 5伴手礼与特产精选</strong>:<br><br>
          1️⃣ <strong>巴塞罗斯公鸡（Galo de Barcelos）：</strong> 象征吉祥、幸运与正义的国家图腾小摆件。<br>
          2️⃣ <strong>波特酒（Port Wine）：</strong> 杜罗河谷高品质甜型加度葡萄酒（泰勒Taylor's、葛拉汉Graham's）。<br>
          3️⃣ <strong>复古沙丁鱼鱼罐头：</strong> 拥有百年包装美学的艺术鱼罐头，送礼极具格调。<br>
          4️⃣ <strong>天然软木手工艺品（Cork）：</strong> 世界头号软木产地制作的轻便钱包、杯垫与环保手提包。<br>
          5️⃣ <strong>Benamôr 1925皇室护手霜：</strong> 包装复古精致的天然杏仁植物润肤霜。
        ` + renderFollowupChips(chips);
      } else {
        return `
          🎁 <strong>포르투갈 필수 쇼핑 & 기념품 TOP 5</strong>:<br><br>
          1️⃣ <strong>바르셀로스의 수탉 (Galo de Barcelos):</strong> 행운과 정의를 상징하는 국민 도자기 공예품입니다.<br>
          2️⃣ <strong>포트 와인 (Port Wine):</strong> 도우루 밸리에서 온 달콤하고 묵직한 디저트 와인(테일러, 그라함 등)입니다.<br>
          3️⃣ <strong>디자인 정어리 통조림 (Conserveira de Lisboa):</strong> 100년 전통의 빈티지 포장으로 지인 선물용으로 최고입니다.<br>
          4️⃣ <strong>천연 코르크 제품:</strong> 포르투갈 특산품으로 가볍고 방수성이 뛰어난 파우치, 컵받침, 지갑입니다.<br>
          5️⃣ <strong>베나모르(Benamôr) 핸드크림:</strong> 1925년부터 포르투갈 왕실에 납품된 천연 핸드케어 화장품입니다.
        ` + renderFollowupChips(chips);
      }
    }

    // Spain shopping
    const chips = [
      { query: '포르투갈 쇼핑 기념품 추천', label: '🎁 포르투갈 쇼핑 추천' },
      { query: '택스리펀 받는 법', label: '🛍️ 스페인 DIVA 택스리펀' }
    ];
    if (lang === 'ja') {
      return `
        🎁 <strong>スペインで絶対に買いたい名産土産 TOP 4</strong>:<br><br>
        1️⃣ <strong>エキストラバージン・オリーブオイル:</strong> 世界最大の生産国。アンダルシア産のフルーティーな最高級オイル。<br>
        2️⃣ <strong>真空パック生ハム＆サフラン:</strong> パエリアに欠かせない最高級スパイスとパッカブルな生ハム。<br>
        3️⃣ <strong>ロエベ（LOEWE）＆ZARAグループ:</strong> スペイン発祥ブランドは現地免税（DIVA）でお得に購入可能！<br>
        4️⃣ <strong>カカオ・サンパカ（Cacao Sampaka）チョコ:</strong> 王室御用達の高級ショコラ。
      ` + renderFollowupChips(chips);
    } else if (lang === 'en') {
      return `
        🎁 <strong>Top 4 Unmissable Souvenirs from Spain</strong>:<br><br>
        1️⃣ <strong>Extra Virgin Olive Oil:</strong> Cold-pressed Andalusian oils (Oro Bailén, Castillo de Canena).<br>
        2️⃣ <strong>Spanish Saffron & Cured Cheeses:</strong> Premium saffron threads for paella and aged Manchego cheese.<br>
        3️⃣ <strong>LOEWE & Spanish Fashion:</strong> Spain is home to LOEWE, Massimo Dutti, and Zara—enjoy immediate DIVA digital tax refund savings!<br>
        4️⃣ <strong>Cacao Sampaka Chocolates:</strong> Regal artisan chocolate bars flavored with Mediterranean sea salt and herbs.
      ` + renderFollowupChips(chips);
    } else if (lang === 'zh') {
      return `
        🎁 <strong>西班牙绝不可错过的四大特色伴手礼</strong>:<br><br>
        1️⃣ <strong>特级初榨橄榄油（EVOO）：</strong> 西班牙是全球最大产地，安达卢西亚高品质橄榄油果香馥郁。<br>
        2️⃣ <strong>高品质藏红花（Azafrán）与曼切戈奶酪：</strong> 烹饪正宗海鲜饭不可或缺的顶级香料。<br>
        3️⃣ <strong>LOEWE罗意威及西班牙本土时尚：</strong> 罗意威、Massimo Dutti在西班牙本土购买搭配DIVA免税退税划算。<br>
        4️⃣ <strong>Cacao Sampaka皇室手工巧克力：</strong> 融合地中海特色风味的奢华手工甜品。
      ` + renderFollowupChips(chips);
    } else {
      return `
        🎁 <strong>스페인 필수 쇼핑 & 선물 리스트 TOP 4</strong>:<br><br>
        1️⃣ <strong>최고급 엑스트라 버진 올리브유:</strong> 세계 1위 생산국인 스페인의 안달루시아산 프리미엄 냉압착 올리브유입니다.<br>
        2️⃣ <strong>사프란(Azafrán) & 만체고 치즈:</strong> 정통 파에야의 황금빛을 내는 귀한 향신료와 양젖 숙성 치즈입니다.<br>
        3️⃣ <strong>로에베(LOEWE) 및 자라(Zara) 패션:</strong> 스페인 현지 본고장에서 DIVA 디지털 텍스리펀 혜택을 받아 가장 합리적으로 구매 가능합니다.<br>
        4️⃣ <strong>카카오 삼파카(Cacao Sampaka) 수제 초콜릿:</strong> 스페인 왕실에 진상되던 유서 깊은 프리미엄 초콜릿입니다.
      ` + renderFollowupChips(chips);
    }
  }

  // [C] SIGHTS & ATTRACTIONS INTENT
  if (isSights) {
    if (isPortugal) {
      const chips = [
        { query: '리스본에서 신트라 가는 법', label: '🏰 리스본 ➔ 신트라' },
        { query: '포르투갈 대표 음식 추천', label: '🥧 포르투갈 대표 음식' }
      ];
      if (lang === 'ja') {
        return `
          🏛️ <strong>ポルトガルの必見観光名所 TOP 4</strong>:<br><br>
          1️⃣ <strong>ジェロニモス修道院＆ベレンの塔（リスボン）:</strong> マヌエル様式の最高傑作。チケットは現地での行列を避けオンライン事前購入が必須です！<br>
          2️⃣ <strong>ペーナ宮殿（シントラ）:</strong> おとぎの国のようなカラフルな王宮。山頂にあり急坂が多いため、駅前からタクシー（Uber）の利用をおすすめします。<br>
          3️⃣ <strong>ドン・ルイス1世橋＆ドウロ川リバーサイド（ポルト）:</strong> エッフェル塔の弟子が設計した二重橋。夕暮れ時のパノラマ絶景は圧巻です。<br>
          4️⃣ <strong>サン・ベント駅（ポルト）:</strong> 約2万枚のアズレージョ（青い装飾タイル）が壁面を埋め尽くす世界で最も美しい駅の一つ。
        ` + renderFollowupChips(chips);
      } else if (lang === 'en') {
        return `
          🏛️ <strong>Top 4 Must-Visit Attractions in Portugal</strong>:<br><br>
          1️⃣ <strong>Jerónimos Monastery & Belém Tower (Lisbon):</strong> Manueline architectural triumphs by the Tagus river. Always book mobile tickets in advance to skip lines!<br>
          2️⃣ <strong>Pena National Palace (Sintra):</strong> A fairytale Romanticist castle atop Sintra’s misty hills. Senior tip: Take an Uber or 434 bus directly to the upper gate!<br>
          3️⃣ <strong>Dom Luís I Bridge & Ribeira (Porto):</strong> Double-deck iron arch bridge designed by Eiffel's protégé, offering spellbinding golden-hour vistas over the Douro river.<br>
          4️⃣ <strong>São Bento Railway Station (Porto):</strong> Lined with over 20,000 hand-painted blue azulejo tiles depicting heroic Portuguese historical battles.
        ` + renderFollowupChips(chips);
      } else if (lang === 'zh') {
        return `
          🏛️ <strong>葡萄牙四大必游地标景区指南</strong>:<br><br>
          1️⃣ <strong>热罗尼莫斯修道院与贝伦塔（里斯本）：</strong> 曼努埃尔风格建筑奇迹。务必提前在线购票以避开冗长队伍。<br>
          2️⃣ <strong>佩纳宫（辛特拉）：</strong> 坐落于山巅的童话城堡。长辈同行切勿步行上山，务必乘坐Uber或434路专线直达山顶入口！<br>
          3️⃣ <strong>路易一世大桥与利贝拉河畔（波尔图）：</strong> 埃菲尔弟子设计的双层铁桥，杜罗河畔落日余晖令人陶醉。<br>
          4️⃣ <strong>圣本笃火车站（波尔图）：</strong> 绘有约2万片手工彩绘青花瓷砖（Azulejo），被誉为世界最美火车站之一。
        ` + renderFollowupChips(chips);
      } else {
        return `
          🏛️ <strong>포르투갈 필수 핵심 명소 TOP 4</strong>:<br><br>
          1️⃣ <strong>제로니무스 수도원 & 벨렝탑 (리스본):</strong> 대항해시대의 영광을 담은 마누엘 양식의 걸작입니다. 현장 대기줄이 매우 길므로 공식 모바일 티켓 사전 예매가 필수입니다!<br>
          2️⃣ <strong>페나 국립왕궁 (신트라):</strong> 산 정상에 우뚝 솟은 동화 같은 알록달록한 성입니다. 경사로가 매우 가파르므로 신트라역에서 우버 또는 434번 버스로 정문까지 바로 올라가세요.<br>
          3️⃣ <strong>동 루이스 1세 다리 & 히베이라 (포르투):</strong> 에펠의 제자가 설계한 2층 철교로 도우루강 석양을 한눈에 담을 수 있는 최고의 뷰포인트입니다.<br>
          4️⃣ <strong>상벤투 기차역 (포르투):</strong> 약 2만 장의 푸른 아줄레주 타일 벽화가 역사를 파노라마처럼 보여주는 세상에서 가장 아름다운 기차역입니다.
        ` + renderFollowupChips(chips);
      }
    }

    // Spain sights
    const chips = [
      { query: '바르셀로나에서 마드리드 어떻게 가?', label: '🚆 바르셀로나 ➔ 마드리드' },
      { query: '알함브라 궁전 티켓팅 팁', label: '🏛️ 알함브라 예약 팁' },
      { query: '소매치기 예방법 알려줘', label: '🚨 소매치기 안전' }
    ];
    if (lang === 'ja') {
      return `
        🏛️ <strong>スペインの必見観光名所 TOP 4</strong>:<br><br>
        1️⃣ <strong>サグラダ・ファミリア＆グエル公園（バルセロナ）:</strong> ガウディ建築の至宝。入場枠が完全予約制のため、1〜2ヶ月前の公式予約が必須です！<br>
        2️⃣ <strong>マドリード王宮＆プラド美術館（マドリード）:</strong> ヨーロッパ最大級の豪華絢爛な宮殿とベラスケス、ゴヤの名作を収蔵。<br>
        3️⃣ <strong>セビリア大聖堂＆ヒラルダの塔（セビリア）:</strong> 世界第3位の規模を誇るゴシック様式大聖堂。コロンブスの墓があります。<br>
        4️⃣ <strong>アルハンブラ宮殿（グラナダ）:</strong> イスラム建築の最高峰。ナスル朝宮殿の指定入場時間は世界一予約激戦区のため最優先で確保してください！
      ` + renderFollowupChips(chips);
    } else if (lang === 'en') {
      return `
        🏛️ <strong>Top 4 Must-Visit Attractions in Spain</strong>:<br><br>
        1️⃣ <strong>Sagrada Família & Park Güell (Barcelona):</strong> Antoni Gaudí's unfinished masterwork. Timed admission slots sell out weeks ahead—book via the official app early!<br>
        2️⃣ <strong>Royal Palace of Madrid & Prado Museum (Madrid):</strong> One of Europe's grandest royal residences alongside masterworks by Velázquez and Goya.<br>
        3️⃣ <strong>Seville Cathedral & Giralda Tower (Seville):</strong> The world's 3rd largest cathedral, holding the tomb of Christopher Columbus.<br>
        4️⃣ <strong>The Alhambra & Nasrid Palaces (Granada):</strong> The pinnacle of Moorish palace architecture. Nasrid Palace entry slots are the strict priority—book 2 months prior!
      ` + renderFollowupChips(chips);
    } else if (lang === 'zh') {
      return `
        🏛️ <strong>西班牙四大必游经典地标</strong>:<br><br>
        1️⃣ <strong>圣家堂与奎尔公园（巴塞罗那）：</strong> 高迪建筑艺术巅峰。全实名分时段入场，务必提前1~2个月通过官网预订！<br>
        2️⃣ <strong>马德里王宫与普拉多博物馆（马德里）：</strong> 欧洲第三大奢华王宫，馆藏委拉斯凯兹与戈雅绝世画作。<br>
        3️⃣ <strong>塞维利亚大教堂与希拉尔达塔（塞维利亚）：</strong> 世界第三大教堂，哥伦布灵柩安息于此。<br>
        4️⃣ <strong>阿尔罕布拉宫（格拉纳达）：</strong> 伊斯兰建筑艺术皇冠上的明珠。纳斯里德宫（Nasrid）门票全球极其抢手，请务必作为出行第一优先级抢订！
      ` + renderFollowupChips(chips);
    } else {
      return `
        🏛️ <strong>스페인 필수 핵심 명소 TOP 4</strong>:<br><br>
        1️⃣ <strong>사그라다 파밀리아 & 구엘 공원 (바르셀로나):</strong> 가우디 예술의 정점입니다. 시간대별 정원 제한이 엄격하므로 최소 1~2개월 전 공식 앱 사전 예매가 필수입니다!<br>
        2️⃣ <strong>마드리드 왕궁 & 프라도 미술관 (마드리드):</strong> 유럽 3대 궁전의 화려한 내부와 벨라스케스, 고야의 걸작들을 편안하게 감상할 수 있습니다.<br>
        3️⃣ <strong>세비야 대성당 & 히랄다탑 (세비야):</strong> 세계에서 세 번째로 큰 고딕 성당으로 콜럼버스의 유골이 안치되어 있습니다.<br>
        4️⃣ <strong>알함브라 궁전 (그라나다):</strong> 이슬람 건축의 최고 정점입니다. 특히 나스르 궁전(Nasrid) 지정 입장권은 전 세계에서 예약 경쟁이 가장 치열하므로 가장 먼저 예매하셔야 합니다!
      ` + renderFollowupChips(chips);
    }
  }

  // [D] WEATHER, BEST PERIOD, TIMING & CLOTHING INTENT
  if (isWeather) {
    const chips = [
      { query: '소매치기 예방법 알려줘', label: '🚨 소매치기 안전 수칙' },
      { query: '바르셀로나에서 마드리드 어떻게 가?', label: '🚆 고속열차 이동법' },
      { query: '포르투갈 대표 음식 추천', label: '🥧 포르투갈 대표 음식' }
    ];
    if (lang === 'ja') {
      return `
        🌤️ <strong>11〜12月の気候・旅行時期・おすすめ服装ガイド</strong>:<br><br>
        1️⃣ <strong>ポルトガル（リスボン＆ポルト - 11〜12月）:</strong><br>
        • 気温：10℃〜17℃前後。穏やかな地中海性気候ですが、大西洋からの雨が時折降るため<strong>軽量の折りたたみ傘やフード付きウィンドブレーカー</strong>が重宝します。<br><br>
        2️⃣ <strong>スペイン（マドリード vs アンダルシア）:</strong><br>
        • <strong>マドリード:</strong> 内陸性気候のため朝晩は5℃〜8℃まで冷え込みます。薄手のウルトラライトダウンやヒートテックの重ね着が安心です。<br>
        • <strong>セビリア＆アンダルシア:</strong> 昼間は18℃〜22℃まで上がり、日差しが暖かく観光に最適なベストシーズンです！<br><br>
        3️⃣ <strong>経由地ドバイ:</strong><br>
        • 24℃〜29℃前後の爽やかな快晴。夏の酷暑がなく、観光に年間で最も快適なベストシーズンです！室内は冷房が効いているため薄手のカーディガンを持参してください。
      ` + renderFollowupChips(chips);
    } else if (lang === 'en') {
      return `
        🌤️ <strong>Nov–Dec Weather, Best Travel Period & Packing Guide</strong>:<br><br>
        1️⃣ <strong>Portugal (Lisbon & Porto - Nov to Dec):</strong><br>
        • Mild Atlantic-Mediterranean climate (10°C to 17°C). Occasional rain showers occur, so bring a lightweight windbreaker and compact travel umbrella.<br><br>
        2️⃣ <strong>Spain (Madrid vs Andalusia):</strong><br>
        • <strong>Madrid:</strong> Continental climate means crisp evenings dipping to 5°C–8°C. Pack warm layers (thermal innerwear and light down jacket).<br>
        • <strong>Seville & Granada:</strong> Sunny and pleasant (16°C–21°C during the day), making winter one of the finest times to explore southern Spain without summer heat waves!<br><br>
        3️⃣ <strong>Dubai Stopover:</strong><br>
        • Perfect golden weather (24°C to 29°C), completely clear of extreme summer heat. Bring lightweight clothing plus a shawl for air-conditioned indoor spaces.
      ` + renderFollowupChips(chips);
    } else if (lang === 'zh') {
      return `
        🌤️ <strong>11~12月气候、最佳旅游时段与出行穿衣指南</strong>:<br><br>
        1️⃣ <strong>葡萄牙（里斯本与波尔图）：</strong><br>
        • 气温在10℃~17℃之间，大西洋海洋性气候温和湿润。偶有阵雨，建议携带连帽防风外套与便携折叠伞。<br><br>
        2️⃣ <strong>西班牙（马德里 与 安达卢西亚地区）：</strong><br>
        • <strong>马德里：</strong> 内陆高原气候，早晚温差大，夜间约5℃~8℃，建议准备轻薄羽绒服与发热保暖内衣。<br>
        • <strong>塞维利亚/南部：</strong> 白天阳光明媚温暖（18℃~22℃），完全避开盛夏酷暑，属于全年中游览南部最舒适的黄金季节！<br><br>
        3️⃣ <strong>经停迪拜：</strong><br>
        • 气温约24℃~29℃，告别盛夏炙烤，迎来一年中最宜人的旅游黄金月！商场室内冷气充足，备好薄开衫即可。
      ` + renderFollowupChips(chips);
    } else {
      return `
        🌤️ <strong>11~12월 날씨, 추천 여행 시기 및 옷차림 가이드</strong>:<br><br>
        1️⃣ <strong>포르투갈 (리스본 & 포르투):</strong><br>
        • 평균 기온 10℃~17℃로 서울의 늦가을처럼 온화합니다. 대서양의 영향으로 비가 종종 내릴 수 있으므로 <strong>가벼운 방수 바람막이와 경량 우산</strong>을 꼭 챙기세요.<br><br>
        2️⃣ <strong>스페인 (마드리드 vs 안달루시아 남부):</strong><br>
        • <strong>마드리드:</strong> 해발 600m 고지대라 아침저녁으로 5℃~8℃까지 쌀쌀해집니다. 경량 패딩과 히트텍을 겹쳐 입으시는 것이 좋습니다.<br>
        • <strong>세비야 & 그라나다:</strong> 낮에는 18℃~22℃까지 올라가 햇살이 따뜻하여 부모님과 걷기에 연중 가장 쾌적한 최적의 시기입니다!<br><br>
        3️⃣ <strong>경유지 두바이:</strong><br>
        • 24℃~29℃로 한여름 폭염이 끝나 관광하기 가장 환상적인 골든 시즌입니다. 실내 쇼핑몰은 에어컨이 강하므로 얇은 가디건이나 숄을 휴대하세요.
      ` + renderFollowupChips(chips);
    }
  }

  // [E] SAFETY & PICKPOCKET INTENT
  if (isSafety) {
    const chips = [
      { query: '바르셀로나에서 마드리드 어떻게 가?', label: '🚆 고속열차 이동 안전' },
      { query: '스페인 포르투갈 환전 어떻게 해?', label: '💶 현금 소지 주의/환전' },
      { query: '부모님 동행 시 주의할 점', label: '👵 부모님 안심 케어' }
    ];
    if (lang === 'ja') {
      return `
        🚨 <strong>欧州旅行スリ対策＆安全の鉄則 TOP 4</strong>:<br><br>
        1️⃣ <strong>高警戒エリア:</strong> バルセロナのランブラス通り・地下鉄、マドリードのソル広場、リスボンのトラム28番線ではスマートフォンや財布の出し入れに最大の注意を払ってください。<br>
        2️⃣ <strong>持ち歩き方:</strong> リュックは体の前で抱え、パスポートやクレジットカードは<strong>衣服の内側のセキュリティポーチ</strong>に保管しましょう。<br>
        3️⃣ <strong>親切な声かけに注意:</strong> 署名運動、服が汚れていると知らせる人、写真を撮ってあげると近づく人には「No, gracias」と毅然と断り立ち去りましょう。<br>
        4️⃣ <strong>シニア移動の知恵:</strong> 混雑した公共交通機関を避け、駅や観光地間の移動には<strong>Uberや正規タクシー</strong>を活用するのが最も安全です！
      ` + renderFollowupChips(chips);
    } else if (lang === 'en') {
      return `
        🚨 <strong>Essential Pickpocket Prevention & Safety Rules</strong>:<br><br>
        1️⃣ <strong>High-Alert Hotspots:</strong> Barcelona's Las Ramblas & metro, Madrid's Puerta del Sol, and Lisbon's historic Tram 28. Keep phones and wallets secured inside zipped compartments.<br>
        2️⃣ <strong>Carry Gear Safely:</strong> Wear backpacks in front in crowded areas or use an RFID-blocking neck pouch worn beneath your shirt.<br>
        3️⃣ <strong>Beware Common Distraction Scams:</strong> Petition clipboards, people alerting you to bird droppings or spilled sauce, or overly eager photo-takers. Say firmly: *"No, thank you"* and keep moving.<br>
        4️⃣ <strong>Elderly Protection:</strong> Taking **Uber / Bolt rides** door-to-door between hotels and attractions completely avoids crowded metro station stairs and pickpocket risks!
      ` + renderFollowupChips(chips);
    } else if (lang === 'zh') {
      return `
        🚨 <strong>欧洲家庭旅行四大核心防盗防偷铁律</strong>:<br><br>
        1️⃣ <strong>高度戒备区域：</strong> 巴塞罗那兰布拉大道及地铁、马德里太阳门广场、里斯本28路复古电车内，切勿将手机随意放置在外侧口袋。<br>
        2️⃣ <strong>随身物品管理：</strong> 人多时双肩包务必前背，护照和备用信用卡建议放置于贴身防盗隐形腰包中。<br>
        3️⃣ <strong>警惕搭讪分心陷阱：</strong> 签名请愿纸板、假意提醒衣服脏了、主动要求帮您拍照等均属典型套路，请果断回答“No, gracias”并迅速离开。<br>
        4️⃣ <strong>长辈安全防护：</strong> 往返景点建议优先使用**Uber、Bolt打车**，点对点直达，彻底规避拥挤地铁与扒手隐患！
      ` + renderFollowupChips(chips);
    } else {
      return `
        🚨 <strong>유럽 가족 여행 소매치기 예방 4대 철칙</strong>:<br><br>
        1️⃣ <strong>집중 주의 구역:</strong> 바르셀로나 람블라스 거리·지하철역, 마드리드 솔 광장, 리스본 28번 트램 내부에서는 스마트폰과 지갑 노출을 최소화하세요.<br>
        2️⃣ <strong>소지품 보관법:</strong> 백팩은 사람이 많은 곳에서 반드시 앞으로 메시고, 여권과 비상 카드는 옷 안쪽 <strong>복대(시큐리티 파우치)</strong>에 보관하세요.<br>
        3️⃣ <strong>친절한 접근 주의:</strong> 서명 요구, 옷에 오물이 묻었다고 닦아주는 척하는 사람, 사진을 찍어주겠다고 다가오는 사람은 단호하게 "No"라고 거절하고 지나치세요.<br>
        4️⃣ <strong>어르신 보호 꿀팁:</strong> 혼잡한 지하철 대신 도심 이동 시 <strong>우버(Uber) 택시</strong>를 이용하시면 소매치기 위험과 계단 오르내림을 100% 원천 차단할 수 있습니다!
      ` + renderFollowupChips(chips);
    }
  }

  // [F] TRANSIT & HIGH-SPEED TRAINS
  if (isTransit) {
    const chips = [
      { query: '바르셀로나에서 마드리드 어떻게 가?', label: '🚆 바르셀로나 ➔ 마드리드' },
      { query: '마드리드에서 리스본 어떻게 가?', label: '✈️ 마드리드 ➔ 리스본' },
      { query: '마드리드에서 세비야 이동법', label: '🚄 마드리드 ➔ 세비야' },
      { query: '리스본에서 포르투 이동법', label: '🚆 리스본 ➔ 포르투' }
    ];
    if (lang === 'ja') {
      return `
        🚆 <strong>高速鉄道（レンフェ）＆都市部交通の移動のコツ</strong>:<br><br>
        🇪🇸 <strong>スペイン高速鉄道（Renfe AVE / Iryo / OUIGO）:</strong><br>
        • マドリード ↔ バルセロナ：約2時間30分直通<br>
        • マドリード ↔ セビリア：約2時間40分直通<br>
        駅が市中心部にあり空港手続きがないため、シニア同伴には飛行機より列車が圧倒的に快適です。<br><br>
        🇵🇹 <strong>ポルトガル鉄道（CP）:</strong> リスボン ↔ ポルト 特急列車（AP）約2時間50分。<br><br>
        🚖 <strong>市内移動の知恵（Uber・Bolt配車タクシー）:</strong><br>
        ヨーロッパの地下鉄は階段が多いため、3人以上の家族旅行では**Uber / Bolt**を活用すると、料金も地下鉄3人分と同等（約8〜14ユーロ）でホテルの玄関口まで楽に移動できます！
      ` + renderFollowupChips(chips);
    } else if (lang === 'en') {
      return `
        🚆 <strong>High-Speed Train (Renfe) & Urban Transit Tips</strong>:<br><br>
        🇪🇸 <strong>Spain High-Speed Trains (Renfe AVE / Iryo / Ouigo):</strong><br>
        • Madrid ↔ Barcelona: ~2 hrs 30 mins direct<br>
        • Madrid ↔ Seville: ~2 hrs 40 mins direct<br>
        High-speed rail is far more convenient than flying: stations are downtown and luggage allowance is generous, sparing senior family members airport fatigue.<br><br>
        🇵🇹 <strong>Portugal Rail (CP):</strong> Lisbon ↔ Porto on the express *Alfa Pendular (AP)* in ~2 hrs 50 mins.<br><br>
        🚖 <strong>Senior & Family City Mobility (Uber/Bolt Rideshare):</strong><br>
        European historic subway stations have steep stairs. For families of 3+, short 3–5km city rides via **Uber or Bolt** cost only €8–€14 (comparable to 3 metro tickets) and drop you door-to-door!
      ` + renderFollowupChips(chips);
    } else if (lang === 'zh') {
      return `
        🚆 <strong>城市间高铁（Renfe）与市内交通出行指南</strong>:<br><br>
        🇪🇸 <strong>西班牙高铁（Renfe AVE / Iryo / Ouigo）:</strong><br>
        • 马德里 ↔ 巴塞罗那：约2小时30分钟直达<br>
        • 马德里 ↔ 塞维利亚：约2小时40分钟直达<br>
        车站位于市中心，无需提前数小时去机场安检，长辈家庭出行乘坐高铁更加舒适惬意。<br><br>
        🇵🇹 <strong>葡萄牙铁路（CP）:</strong> 里斯本 ↔ 波尔图乘坐AP特快仅约2小时50分钟。<br><br>
        🚖 <strong>长辈家庭市内出行秘诀（善用Uber/Bolt打车）:</strong><br>
        欧洲历史城区地铁站台阶较多。3人及以上家庭在市内3~5公里移动时，使用**Uber、Bolt**打车仅需8~14欧元，费用与3人地铁票相当，长辈免受爬楼梯之苦！
      ` + renderFollowupChips(chips);
    } else {
      return `
        🚆 <strong>도시 간 기차(렌페) & 시내 교통 필수 이동 팁</strong>:<br><br>
        🇪🇸 <strong>스페인 고속열차 렌페(Renfe / Iryo / Ouigo):</strong><br>
        • 마드리드 ↔ 바르셀로나: 약 2시간 30분 직통<br>
        • 마드리드 ↔ 세비야: 약 2시간 40분 직통<br>
        비행기보다 도심 접근성이 좋고 수속 시간이 없어 어르신 동행 시 기차가 훨씬 편안합니다.<br><br>
        🇵🇹 <strong>포르투갈 철도(CP):</strong> 리스본 ↔ 포르투 고속열차(AP) 약 2시간 50분.<br><br>
        🚖 <strong>부모님 동행 시내 이동 황금 팁 (우버/볼트 적극 활용):</strong><br>
        유럽 구도심 지하철은 계단이 많아 어르신 무릎에 무리가 갑니다. 3인 가족 기준 3~5km 시내 이동은 <strong>우버(Uber), 볼트(Bolt)</strong> 호출 택시를 이용하시면 요금도 지하철 3인권과 비슷(8~14유로)하며 호텔 문 앞까지 편안하게 이동하실 수 있습니다!
      ` + renderFollowupChips(chips);
    }
  }

  // [G] BUDGET & EXPENSES
  if (isBudget) {
    const kpiText = (typeof document !== 'undefined' && document.getElementById('kpiBudgetText')?.textContent?.trim()) || '약 15,480,000원 (₩)';
    const chips = [
      { query: '스페인 포르투갈 환전 어떻게 해?', label: '💶 유로 환전 및 결제' },
      { query: '택스리펀 받는 법', label: '🛍️ 택스리펀(DIVA)' }
    ];
    if (lang === 'ja') {
      return `
        💰 <strong>シニア同伴・家族旅行（3名基準）リアルタイム予算分析</strong>:<br><br>
        • <strong>現在プランの総予算目安:</strong> <strong>${kpiText}</strong>（航空券、全日程4〜5星級ホテル、都市間AVE・フライト、食事・観光入場料込み）<br>
        • <strong>1日あたり食事予算目安:</strong> 1名あたり約€45〜€70（上質なタパスや海鮮ディナー基準）<br>
        • <strong>交通費の知恵:</strong> 3人なら市内移動は地下鉄よりUber利用が同等の費用で圧倒的に楽でお得です！
      ` + renderFollowupChips(chips);
    } else if (lang === 'en') {
      return `
        💰 <strong>Estimated Family Travel Budget Analysis (3 Persons)</strong>:<br><br>
        • <strong>Total Estimated Package Cost:</strong> <strong>${kpiText}</strong> (includes round-trip flights, 4–5 star accommodations, high-speed rail, dining, and admission tickets).<br>
        • <strong>Daily Dining Budget:</strong> ~€45–€70 per person for generous tapas, seafood, and café stops.<br>
        • <strong>Mobility Savings:</strong> For 3 people, Uber/Bolt rides across city centers cost almost the same as 3 single metro tickets!
      ` + renderFollowupChips(chips);
    } else if (lang === 'zh') {
      return `
        💰 <strong>长辈同行三人家庭旅行实时定制预算分析</strong>:<br><br>
        • <strong>当前方案全程核算总预算：</strong> <strong>${kpiText}</strong>（已包含国际往返机票、全程4~5星级酒店、城际高铁/航班、正餐与主要景点门票）。<br>
        • <strong>每日餐饮参考：</strong> 人均约€45~€70（享受地道海鲜饭、优质Tapas与咖啡点心）。<br>
        • <strong>交通性价比秘诀：</strong> 3人同行时，市内短途打车（Uber/Bolt）综合花费与3张单程地铁票几乎持平！
      ` + renderFollowupChips(chips);
    } else {
      return `
        💰 <strong>부모님 동행 3인 가족 여행 실시간 예산 분석</strong>:<br><br>
        • <strong>현재 플래너 기준 총 예상 경비:</strong> <strong>${kpiText}</strong> (국제선 왕복 항공, 전 일정 4~5성급 호텔, 도시 간 고속열차/국내선, 식비 및 주요 명소 입장권 포함)<br>
        • <strong>1일 식비 예산:</strong> 1인당 약 6~10만 원 (€45~€70 내외, 수준 높은 타파스 및 해산물 코스 기준)<br>
        • <strong>교통비 절약 팁:</strong> 3인 가족 기준 시내 3~5km 이동은 지하철 3명 티켓값과 우버(Uber) 택시비가 거의 같으므로 무조건 우버가 유리합니다!
      ` + renderFollowupChips(chips);
    }
  }

  // [H] CARDS, CASH, TIPPING & RESTROOMS
  if (isCardCash) {
    const chips = [
      { query: '스페인 포르투갈 환전 어떻게 해?', label: '💶 유로 환전 안내' },
      { query: '택스리펀 받는 법', label: '🛍️ 택스리펀(DIVA)' }
    ];
    if (lang === 'ja') {
      return `
        💳 <strong>カード・現金・チップ＆トイレ利用ガイド</strong>:<br><br>
        1️⃣ <strong>カード決済比率:</strong> 95％以上の店舗、カフェ、タクシーでタッチ決済（Visa/Mastercard/Apple Pay）が利用可能です。<br>
        2️⃣ <strong>現金の目安:</strong> 市場や有料トイレ（0.5〜1ユーロ）利用のため、1人1日あたり約20〜30ユーロの小銭・小額紙幣があれば十分です。<br>
        3️⃣ <strong>チップの習慣:</strong> 義務ではありません。良いサービスを受けた際に端数を切り上げるか、5〜10％程度を置くのがスマートです。<br>
        4️⃣ <strong>トイレのコツ:</strong> デパート（エル・コルテ・イングレス）や美術館、立ち寄ったカフェの清潔なトイレを利用するのが鉄則です！
      ` + renderFollowupChips(chips);
    } else if (lang === 'en') {
      return `
        💳 <strong>Cards, Cash, Tipping & Restroom Tips</strong>:<br><br>
        1️⃣ <strong>Card Acceptance:</strong> Over 95% of stores, bistros, and cabs support contactless card payments (Visa, Mastercard, Apple Pay).<br>
        2️⃣ <strong>Cash Needs:</strong> Keep €20–€30 per person per day in small coins/bills for public restrooms and traditional markets.<br>
        3️⃣ <strong>Tipping Culture:</strong> Tipping is not mandatory. Rounding up the bill or leaving 5–10% for exceptional dining service is appreciated.<br>
        4️⃣ <strong>Clean Restrooms:</strong> European public pay toilets can be sparse. Use immaculate restrooms at El Corte Inglés department stores, museums, or order an espresso at a café!
      ` + renderFollowupChips(chips);
    } else if (lang === 'zh') {
      return `
        💳 <strong>刷卡、备用现金、小费与洗手间出行贴士</strong>:<br><br>
        1️⃣ <strong>刷卡普及度：</strong> 当地95%以上的商户、餐厅与出租车支持感应式无接触刷卡（Visa/Mastercard/Apple Pay）。<br>
        2️⃣ <strong>现金准备：</strong> 仅需准备每人每天20~30欧元小面额零钱，用于投币洗手间与传统小市场。<br>
        3️⃣ <strong>小费习俗：</strong> 欧洲非强制小费制。若对服务满意，可将账单零头向上取整或留下5%~10%作为心意。<br>
        4️⃣ <strong>卫生间攻略：</strong> 尽量利用英国宫百货（El Corte Inglés）、各大博物馆以及用餐餐厅内的干净卫生间！
      ` + renderFollowupChips(chips);
    } else {
      return `
        💳 <strong>결제(카드/현금), 팁 문화 및 화장실 이용 안내</strong>:<br><br>
        1️⃣ <strong>카드 결제율:</strong> 트래블로그, 트래블월렛 등 컨택트리스 카드가 95% 이상 지원되어 현금 휴대가 거의 필요 없습니다.<br>
        2️⃣ <strong>비상 현금:</strong> 전통 시장이나 유럽 유료 화장실(0.5~1유로) 이용을 위해 1인 하루 20~30유로 정도의 소액 현금만 챙기시면 충분합니다.<br>
        3️⃣ <strong>팁 문화:</strong> 팁은 의무가 아닙니다. 고급 식당에서 만족스러운 서비스를 받으셨을 때 거스름돈 잔돈을 두시거나 5~10% 정도 두시면 충분합니다.<br>
        4️⃣ <strong>화장실 팁:</strong> 길거리 유료 화장실보다 엘 코르테 잉글레스(El Corte Inglés) 백화점이나 박물관, 또는 카페에서 에스프레소 한 잔 주문 후 내부 화장실을 이용하시는 것이 가장 청결합니다!
      ` + renderFollowupChips(chips);
    }
  }

  // [I] TAX REFUND
  if (isTaxRefund) {
    const chips = [
      { query: '스페인 쇼핑 기념품 추천', label: '🎁 스페인 쇼핑' },
      { query: '포르투갈 쇼핑 기념품 추천', label: '🎁 포르투갈 쇼핑' }
    ];
    if (lang === 'ja') {
      return `
        🛍️ <strong>スペイン＆ポルトガル タックスリファンド（免税）完全攻略</strong>:<br><br>
        1️⃣ <strong>最低購入額の撤廃:</strong> スペイン・ポルトガルともに最低購入金額の制限がなく、少額のお買い物でも免税対象となります！<br>
        2️⃣ <strong>スペイン DIVAデジタル認証:</strong> 店舗でDIVA免税書類を受け取り、出国空港の「DIVA専用キオスク端末」でバーコードをスキャンするだけで即時電子税関承認が完了します。<br>
        3️⃣ <strong>手続きのタイミング:</strong> 受託手荷物に免税品を入れる場合は、航空会社のカウンターでチェックインする前に必ず税関（DIVA）端末で認証を済ませてください！
      ` + renderFollowupChips(chips);
    } else if (lang === 'en') {
      return `
        🛍️ <strong>Spain & Portugal Digital Tax Refund (DIVA) Guide</strong>:<br><br>
        1️⃣ <strong>No Minimum Spend:</strong> Both Spain and Portugal have abolished minimum spending thresholds, allowing tax refunds even on modest shopping purchases!<br>
        2️⃣ <strong>Spain DIVA Electronic Kiosks:</strong> Ask for a DIVA tax refund form at checkout. At the departure airport, simply scan the barcodes at the digital DIVA machines for instant customs validation without standing in line!<br>
        3️⃣ <strong>Packing Rule:</strong> If packing tax-free goods inside checked baggage, validate your forms at the airport DIVA kiosk *before* checking your luggage!
      ` + renderFollowupChips(chips);
    } else if (lang === 'zh') {
      return `
        🛍️ <strong>西班牙与葡萄牙电子退税（DIVA）核心指南</strong>:<br><br>
        1️⃣ <strong>无最低消费门槛：</strong> 西班牙与葡萄牙现已取消最低消费限额，小额购物亦可申请退税！<br>
        2️⃣ <strong>西班牙DIVA自助扫码：</strong> 购物时向店员索取DIVA退税单。在离境机场海关退税区，只需在DIVA自助电子机上扫描条形码，数十秒即可完成海关盖章核验！<br>
        3️⃣ <strong>托运先盖章原则：</strong> 若退税商品需要托运，务必在前往值机柜台托运行李前先完成DIVA机扫码盖章！
      ` + renderFollowupChips(chips);
    } else {
      return `
        🛍️ <strong>스페인 & 포르투갈 텍스리펀(DIVA) 완벽 가이드</strong>:<br><br>
        1️⃣ <strong>최저 구매 금액 폐지:</strong> 스페인과 포르투갈 모두 텍스리펀 최저 구매 기준액이 없어 소액 쇼핑 건도 환급이 가능합니다!<br>
        2️⃣ <strong>스페인 DIVA 디지털 키오스크:</strong> 매장에서 DIVA 환급 서류를 받으신 후, 출국 공항의 'DIVA 기기'에 바코드를 스캔하면 줄 설 필요 없이 전자 세관 승인이 완료됩니다.<br>
        3️⃣ <strong>수하물 위탁 순서:</strong> 구매 품목을 부치는 캐리어에 넣으실 경우, 반드시 항공사 카운터에서 짐을 부치기 전에 DIVA 기기 인증을 먼저 마치셔야 합니다!
      ` + renderFollowupChips(chips);
    }
  }

  // [J] SENIOR CARE & ACCESSIBILITY
  if (isSeniorCare) {
    const chips = [
      { query: '바르셀로나에서 마드리드 어떻게 가?', label: '🚆 고속열차 렌페 이동' },
      { query: '소금 빼주세요 스페인어', label: '🧂 싱겁게 주문하는 법' },
      { query: '소매치기 예방법 알려줘', label: '🚨 소매치기 안전' }
    ];
    if (lang === 'ja') {
      return `
        👵 <strong>シニアご両親同伴旅行・安心の心得 TOP 4</strong>:<br><br>
        1️⃣ <strong>坂道と石畳の攻略:</strong> リスボンやポルトは急勾配の坂と石畳が多いため、無理に歩かず<strong>Uberタクシー</strong>を積極的に利用して目的地のエレベーターや玄関前まで直行しましょう。<br>
        2️⃣ <strong>ゆとりのある日程設定:</strong> 午前1箇所、午後1箇所を基本とし、午後にカフェで温かいお茶とスイーツを楽しむ休憩時間を確保してください。<br>
        3️⃣ <strong>食事の塩分配慮:</strong> レストランでは「塩控えめ（Sem sal / Sin sal）」と伝えると、ご両親のお口に合う優しい味付けで召し上がれます。<br>
        4️⃣ <strong>高速鉄道の活用:</strong> 都市間移動は空港手続きの負担がない<strong>高速鉄道（AVE/CP）</strong>の前方座席を予約するのが最も快適です！
      ` + renderFollowupChips(chips);
    } else if (lang === 'en') {
      return `
        👵 <strong>Top 4 Senior Care & Accessibility Principles for Family Travel</strong>:<br><br>
        1️⃣ <strong>Hills & Cobblestones:</strong> Lisbon and Porto feature steep hills. Never hesitate to use **Uber/Bolt** door-to-door to bypass tiring ascents.<br>
        2️⃣ <strong>Relaxed Daily Pacing:</strong> Limit schedules to 1 primary sight in the morning and 1 in the afternoon, leaving generous mid-day café respites.<br>
        3️⃣ <strong>Dietary Comfort:</strong> Request *"Sin sal, por favor"* in Spain and *"Sem sal, por favor"* in Portugal for milder seasonings tailored to senior palates.<br>
        4️⃣ <strong>Comfortable Rail Transit:</strong> Choose direct high-speed trains (Renfe AVE / CP Alfa Pendular) with spacious seating over flights to avoid airport queues!
      ` + renderFollowupChips(chips);
    } else if (lang === 'zh') {
      return `
        👵 <strong>长辈同行家庭旅行四大舒适关怀准则</strong>:<br><br>
        1️⃣ <strong>坡道与石子路应对：</strong> 里斯本与波尔图山城起伏较大，善用**Uber打车**直达景点门口，有效保护长辈膝盖。<br>
        2️⃣ <strong>慢节奏节奏安排：</strong> 每天安排上午1处、下午1处核心景点即可，中途预留充足的咖啡下午茶慢享时光。<br>
        3️⃣ <strong>清淡饮食沟通：</strong> 点餐时出示“少盐（Sin sal / Sem sal）”短语，让长辈品尝鲜美原汁原味。<br>
        4️⃣ <strong>高铁优选出行：</strong> 城市间优先乘坐无需提前冗长安检的AVE与CP高铁，座椅宽敞舒适平稳！
      ` + renderFollowupChips(chips);
    } else {
      return `
        👵 <strong>부모님 안심 동행 4대 케어 원칙</strong>:<br><br>
        1️⃣ <strong>언덕길과 돌바닥 극복:</strong> 리스본과 포르투는 경사로와 울퉁불퉁한 돌바닥이 많으므로 무리하게 걷지 마시고 <strong>우버(Uber) 택시</strong>로 목적지 바로 앞까지 이동하세요.<br>
        2️⃣ <strong>1일 2명소 여유로운 일정:</strong> 오전 1곳, 오후 1곳으로 일정을 여유롭게 잡고, 중간중간 야외 테라스 카페에서 휴식 시간을 충분히 가지세요.<br>
        3️⃣ <strong>식사 간 조절:</strong> 주문 시 <strong>"Sin sal(스페인)" / "Sem sal(포르투갈)"</strong>을 말씀하셔서 짜지 않게 건강한 식사를 즐기세요.<br>
        4️⃣ <strong>고속기차(렌페/CP) 이용:</strong> 도심 직결 고속철도를 이용해 공항 검색대의 긴 대기줄 없이 편안한 좌석에서 이동하세요!
      ` + renderFollowupChips(chips);
    }
  }

  // ----------------------------------------------------
  // [K] DEFAULT FALLBACK (자연스러운 연속 대화 안내)
  // ----------------------------------------------------
  const fallbackChips = [
    { query: '바르셀로나에서 마드리드 어떻게 가?', label: '🚆 바르셀로나 ➔ 마드리드' },
    { query: '마드리드에서 리스본 어떻게 가?', label: '✈️ 마드리드 ➔ 리스본 이동' },
    { query: '포르투갈 대표 음식 추천', label: '🥧 포르투갈 대표 음식' },
    { query: '스페인 포르투갈 환전 어떻게 해?', label: '💶 유로 환전 및 결제' },
    { query: '소매치기 예방법 알려줘', label: '🚨 소매치기 안전 수칙' }
  ];

  if (lang === 'ja') {
    return `
      😊 <strong>旅行に関するご質問に何でもお答えいたします！</strong><br><br>
      都市間の高速鉄道ルート（バルセロナ↔マドリード、マドリード↔リスボン等）や、現地のおすすめグルメ、気候・服装、安全情報、旅行予算など、何回でも続けてご質問いただけます。<br><br>
      💡 <strong>気になるテーマをクリックするか、自由に入力してください:</strong>
    ` + renderFollowupChips(fallbackChips);
  } else if (lang === 'en') {
    return `
      😊 <strong>I'm here to assist with every step of your journey!</strong><br><br>
      You can ask me continuous questions about city-to-city routes (e.g. Barcelona to Madrid, Madrid to Lisbon), local dining, ticket reservations, weather, safety, and budgets anytime.<br><br>
      💡 <strong>Try clicking any topic below or type your question:</strong>
    ` + renderFollowupChips(fallbackChips);
  } else if (lang === 'zh') {
    return `
      😊 <strong>随时为您提供伊比利亚与迪拜旅行全方位解答！</strong><br><br>
      您可以连续向我咨询城市间交通路线（如巴塞罗那到马德里、马德里到里斯本等）、特色美食名店、天气与穿衣、防盗安全或旅行预算等任何问题。<br><br>
      💡 <strong>请点击下方推荐话题或直接输入您的问题：</strong>
    ` + renderFollowupChips(fallbackChips);
  } else {
    return `
      😊 <strong>이베리아 & 두바이 여행에 관한 모든 질문을 환영합니다!</strong><br><br>
      도시 간 이동 경로(바르셀로나↔마드리드, 마드리드↔리스본 등), 현지 대표 맛집, 11~12월 날씨 및 옷차림, 소매치기 안전 수칙, 여행 총 예산까지 몇 번이든 계속 질문하실 수 있습니다.<br><br>
      💡 <strong>아래 추천 질문을 누르시거나 궁금한 점을 자유롭게 입력해 보세요:</strong>
    ` + renderFollowupChips(fallbackChips);
  }
}


// Attach event listener for Chat Form on load
window.addEventListener('DOMContentLoaded', () => {
  // Outside-click & Escape key handlers to close chat when clicking outside or pressing Escape
  document.addEventListener('click', (e) => {
    const win = document.getElementById('chatWindow');
    const btn = document.getElementById('btnChatToggle');
    if (!win || !win.classList.contains('active')) return;
    if (!win.contains(e.target) && !btn.contains(e.target)) {
      closeChatWindow();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const win = document.getElementById('chatWindow');
      if (win && win.classList.contains('active')) {
        closeChatWindow();
      }
    }
  });

  
  if (typeof updateChatbotLanguage === 'function') {
    updateChatbotLanguage(typeof currentLang !== 'undefined' ? currentLang : 'ko');
  }
const form = document.getElementById('chatForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      sendChatMessage();
      return false;
    });
  }
  const input = document.getElementById('chatInput');
  if (input) {
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        sendChatMessage();
      }
    });
  }
});
