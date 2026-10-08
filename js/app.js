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

// 2-1. 개별 카드 목록 전용 (From) 가격 포맷터
function formatCardPrice(baseKrw, curr = currentCurrency, isDining = false) {
  if (baseKrw === 0) {
    return currentLang === 'en' ? 'Free (무료)' : (currentLang === 'ja' ? '無料 (Free)' : (currentLang === 'zh' ? '免费 (Free)' : '무료 (Free)'));
  }
  const krw = typeof baseKrw === 'number' ? baseKrw : (isDining ? 30000 : 25000);
  const prefix = 'From ';
  if (curr === 'KRW') {
    if (krw >= 10000) {
      const man = (krw / 10000).toFixed(1).replace('.0', '');
      return `${prefix}${man}만 원 (~₩${krw.toLocaleString()})`;
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
    const label = isAll ? (currentLang === 'en' ? '🌟 All Itinerary' : (currentLang === 'ja' ? '🌟 全日程' : (currentLang === 'zh' ? '🌟 全部行程' : '🌟 전체 일정'))) : `📍 ${city}`;
    const activeClass = (window.currentCityFilter || 'ALL') === city ? 'active' : '';
    return `<button class="tab-chip ${activeClass}" onclick="filterTimelineCity('${city}', this)">${label}</button>`;
  }).join('');
}

function cleanHangul(text, lang) {
  if (!text || typeof text !== 'string') return '';
  if (lang === 'ko') return text;
  let t = text;
  const fallbackDict = {
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
          <img src="${item.photo}" alt="${localizedName}" class="photo-thumb" loading="lazy" onerror="this.onerror=null;this.src='https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800&q=80';" />
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
        <div class="timeline-drag-handle" title="드래그하여 일정 순서 변경">⋮⋮ 드래그 이동</div>
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

function toggleChatWindow() {
  const win = document.getElementById('chatWindow');
  const btn = document.getElementById('btnChatToggle');
  if (!win) return;
  const isHidden = win.style.display === 'none' || !win.style.display;
  win.style.display = isHidden ? 'flex' : 'none';
  if (btn) btn.style.display = isHidden ? 'none' : 'flex';
  if (isHidden) {
    const input = document.getElementById('chatInput');
    if (input) setTimeout(() => input.focus(), 150);
    scrollChatToBottom();
  }
}

function handleQuickChatChip(query) {
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

      html += `
        <div class="chat-card-recommend" style="margin-top:8px;">
          <div class="chat-card-img" style="background-image:url('${d.photo || ''}')">
            <span class="chat-card-tag">${d.city}</span>
          </div>
          <div class="chat-card-content">
            <div class="chat-card-title">${d.name}</div>
            <div class="chat-card-dish">🍽️ ${d.dishName || d.signature}</div>
            <div class="chat-card-price">💵 ${price}</div>
            <div class="chat-card-tip">👵 <strong>${tipLabel}:</strong> ${d.seniorTip}</div>
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
  const isPortugal = ['portugal', 'lisbon', 'porto', 'sintra', 'algarve', '포르투갈', '리스본', '포르투', '신트라', '알가르베', 'ポルトガル', 'リスボン', 'ポルト', 'シントラ', '葡萄牙', '里斯本', '波尔图', '辛特拉'].some(w => q.includes(w));
  const isSpain = ['spain', 'madrid', 'barcelona', 'seville', 'granada', 'andalusia', '스페인', '마드리드', '바르셀로나', '세비야', '그라나다', '안달루시아', 'スペイン', 'マドリード', 'バルセロナ', 'セビリア', 'グラナダ', '西班牙', '马德里', '巴塞罗那', '塞维利亚', '格拉纳达'].some(w => q.includes(w));
  const isDubai = ['dubai', 'uae', 'emirates', '두바이', '아랍에미리트', 'ドバイ', '迪拜', '阿联酋'].some(w => q.includes(w));

  // ----------------------------------------------------
  // 2. CONVERSATIONAL & LINGUISTIC INTENTS (대화형 / 일상 회화)
  // ----------------------------------------------------

  // 2-1. Thanks / Gratitude (감사 / 고마움)
  const isThanks = ['고마워', '고맙', '감사', '땡큐', 'thank', 'thanks', 'thx', 'appreciate', 'ありがとう', '感謝', '助かった', 'サンキュー', '谢谢', '感谢', '多谢'].some(w => q.includes(w));
  if (isThanks) {
    if (lang === 'ja') {
      return `😊 <strong>どういたしまして！お役に立ててとても嬉しいです！</strong><br><br>ご家族皆様が安全で快適に、一生忘れられない素晴らしい旅になりますよういつでもサポートいたします。<br>ポルトガルやスペインの美味しい名物料理、観光名所の予約のコツ、移動手段など、気になることがあればいつでも何でも気軽に聞いてくださいね！✨`;
    } else if (lang === 'en') {
      return `😊 <strong>You're very welcome! I'm delighted to assist!</strong><br><br>Wishing you and your family an unforgettable, comfortable, and wonder-filled journey across Iberia and Dubai.<br>Feel free to ask me anything else anytime—whether about local dishes, ticket tips, scenic routes, or transit options! ✨`;
    } else if (lang === 'zh') {
      return `😊 <strong>不客气，很高兴能为您提供帮助！</strong><br><br>祝愿您和家人拥有一段温馨舒适、毫无负担的美妙旅程。<br>如果您在特色美食、景点门票预约、路线规划或交通出行方面还有任何想了解的，随时都可以提问哦！✨`;
    } else {
      return `😊 <strong>도움이 되었다니 정말 기쁩니다!</strong><br><br>부모님과 함께하시는 이번 가족 여행이 평생 기억에 남을 따뜻하고 편안한 여행이 되도록 언제나 함께할게요.<br>포르투갈·스페인의 또 다른 맛집, 관광지 관람 꿀팁, 교통편 등 궁금한 점이 생기시면 언제든 편하게 물어보세요! ✨`;
    }
  }

  // 2-2. Greetings (인사)
  const isGreeting = ['안녕', '하이', '반가', 'hello', 'hi', 'hey', 'good morning', 'good afternoon', 'こんにちは', 'はじめまして', 'こんばん', '你好', '您好'].some(w => q.includes(w));
  if (isGreeting && q.length < 15) {
    if (lang === 'ja') {
      return `こんにちは！旅の専属コンシェルジュAIです 😊<br>ポルトガル、スペイン、ドバイの旅に関するご質問なら何でもお任せください。<br><br>💡 <em>「ポルトガルで一番人気の食べ物は？」「スリ対策の注意点」「旅行の総予算」</em>など、自由にお聞きください！`;
    } else if (lang === 'en') {
      return `Hello there! I'm your dedicated Iberia & Dubai Family Travel AI Concierge 😊<br>Feel free to ask me anything about your trip!<br><br>💡 Try asking: <em>"What is the most popular food in Portugal?", "Pickpocket prevention tips", or "Total trip budget"</em>!`;
    } else if (lang === 'zh') {
      return `您好！我是您的伊比利亚与迪拜家庭旅行AI向导 😊<br>很高兴为您服务！<br><br>💡 您可以问我：<em>“葡萄牙最受欢迎的美食是什么？”、“西班牙防盗防偷攻略”、“全程预算多少”</em>等任何问题！`;
    } else {
      return `안녕하세요! 이베리아 & 두바이 가족 여행 AI 컨시어지입니다 😊<br>부모님과 함께하는 편안한 여행이 될 수 있도록 무엇이든 도와드릴게요.<br><br>💡 <em>"포르투갈에서 제일 맛있는 음식은?", "소매치기 예방법", "총 여행 예산"</em> 등 편하게 질문해 보세요!`;
    }
  }

  // 2-3. Identity / Bot Info (너는 누구야)
  const isWho = ['누구', '너는', '뭐하는', 'who are you', 'what are you', 'あなたは誰', '何者', '你是谁', '你的功能'].some(w => q.includes(w));
  if (isWho && q.length < 20) {
    if (lang === 'ja') {
      return `🤖 <strong>AIトラベルコンシェルジュのご紹介</strong>:<br><br>私はスペイン、ポルトガル、および経由地ドバイの<strong>「シニア同伴・家族旅行」に特化した専属AIコンパニオン</strong>です。<br>• 11〜12月の気候と服装<br>• 各国の名物料理やレストラン<br>• お土産やショッピング<br>• スリ対策や安全情報<br>• レンフェや配車タクシーの乗り方<br>• リアルタイム旅行予算の算出<br>など、旅のあらゆる疑問を瞬時にサポートします！✨`;
    } else if (lang === 'en') {
      return `🤖 <strong>About Your AI Travel Concierge</strong>:<br><br>I am your dedicated AI companion specialized in <strong>Senior-friendly Family Travel across Spain, Portugal, and Dubai stopovers</strong>.<br>I provide instant advice on:<br>• Nov–Dec climate & route pacing<br>• Iconic local dishes & curated dining<br>• Souvenirs & tax refund guides<br>• Pickpocket prevention & safety<br>• Trains (Renfe/CP) & Uber mobility<br>• Dynamic real-time trip budgeting! ✨`;
    } else if (lang === 'zh') {
      return `🤖 <strong>关于您的AI旅行专属向导</strong>:<br><br>我是专门为<strong>西班牙、葡萄牙及经停迪拜的长辈家庭旅行定制的AI智能助手</strong>。<br>竭诚为您提供：<br>• 11~12月气候与穿衣指南<br>• 西葡与迪拜代表性特色美食与名店<br>• 必买特色手信伴手礼与DIVA退税攻略<br>• 热门景区防盗防偷安全铁律<br>• 高铁Renfe、葡铁CP与Uber打车秘诀<br>• 全程定制预算实时核算！✨`;
    } else {
      return `🤖 <strong>AI 여행 컨시어지 소개</strong>:<br><br>저는 스페인, 포르투갈 및 경유지 두바이를 여행하시는 <strong>부모님 동행 가족 여행 전담 AI 가이드</strong>입니다.<br>다음과 같은 모든 정보를 실시간으로 안내해 드립니다:<br>• 11~12월 최적 시기·날씨와 추천 옷차림<br>• 현지 대표 명물 음식과 엄선 맛집 리스트<br>• 국가별 필수 쇼핑 품목 및 텍스리펀 방법<br>• 소매치기 예방 및 치안 안전 수칙<br>• 렌페 기차 및 어르신 우버 이동 팁<br>• 맞춤 플래너 실시간 총 예산 계산! ✨`;
    }
  }

  // ----------------------------------------------------
  // 3. SPECIALIZED PHRASES & ACTIVITIES (구체적 표현 / 특정 액티비티)
  // ----------------------------------------------------

  // 3-1. Less Salt (소금 빼주세요 / 싱겁게) - Must take precedence over general food
  const isLessSalt = [
    '소금', '싱겁게', 'sin sal', 'sem sal', 'less salt', 'no salt',
    '塩', '薄味', 'しょっぱい', '塩分',
    '少盐', '淡一点', '不要太咸'
  ].some(w => q.includes(w));
  if (isLessSalt) {
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
    `;
  }

  // 3-2. Dubai Safari / Desert (사막 사파리) - Must take precedence over general transit/Dubai
  const isDubaiSafari = [
    '사막', '사파리', '듄배싱',
    'safari', 'desert', 'dune bashing',
    '砂漠', 'サファリ',
    '冲沙', '沙漠'
  ].some(w => q.includes(w));
  if (isDubaiSafari) {
    if (lang === 'ja') {
      return `
        🏜️ <strong>ドバイ砂漠サファリ＆観光のポイント</strong>:<br><br>
        🐪 <strong>シニア同伴の砂漠サファリの知恵:</strong><br>
        一般的なデューンバッシング（激しい砂丘ドライブ）は腰に負担がかかる場合があります。予約時に**「Gentle Desert Drive（穏やかな砂漠ドライブ）」**や、ヴィンテージカーで巡る**「ヘリテージ・サファリ」**を指定すると、雄大な砂漠の夕日とアラビアンBBQディナーをゆったりとお楽しみいただけます！<br><br>
        👗 <strong>服装マナー:</strong> ドバイモールなどの屋内は冷房が強いため薄手の羽織り物が必要です。モスク訪問時は露出を控えた服装をお選びください。
      `;
    } else if (lang === 'en') {
      return `
        🏜️ <strong>Dubai Desert Safari & Stopover Guide</strong>:<br><br>
        🐪 <strong>Senior-Friendly Desert Safari Tip:</strong><br>
        Standard roller-coaster dune bashing in 4WDs can be intense for seniors. When booking, request a **"Gentle Desert Drive"** or a **Heritage Safari (Vintage Land Rover)** to enjoy sunset photography, camel encounters, and Arabian BBQ dinner with total comfort!<br><br>
        👗 <strong>Dress Code & Etiquette:</strong> Dubai venues have strong air-conditioning; carry a light cardigan. When visiting mosques, respectful modest clothing covering arms and legs is required.
      `;
    } else if (lang === 'zh') {
      return `
        🏜️ <strong>迪拜沙漠冲沙与城市经停指南</strong>:<br><br>
        🐪 <strong>适合长辈同行的沙漠之旅建议：</strong><br>
        常规越野车冲沙颠簸剧烈，容易对长辈腰椎造成不适。预定时建议选择**“Gentle Desert Drive（温和沙漠观光）”**或复古路虎的**“遗产探索冲沙（Heritage Safari）”**，长辈可以惬意欣赏壮美红沙日落、骑骆驼并享受正宗贝都因营地烧烤晚宴！<br><br>
        👗 <strong>着装贴士：</strong> 迪拜商场冷气强劲，建议携带披肩薄外套；清真寺参访需着遮盖肩部与脚踝的得体服饰。
      `;
    } else {
      return `
        🏜️ <strong>두바이 사막 사파리 & 스톱오버 필수 팁</strong>:<br><br>
        🐪 <strong>부모님 동행 사막 사파리 팁:</strong><br>
        일반 사파리의 모래언덕 질주(듄배싱)는 격렬하여 어르신 허리에 무리가 갈 수 있습니다. 투어 예약 시 사전에 **'Gentle Desert Drive (부드러운 사막 드라이브)'** 또는 **'헤리티지 사파리'**를 요청하시면 부모님도 편안하게 사막 일몰과 베두인 바비큐 디너를 즐기실 수 있습니다!<br><br>
        👗 <strong>두바이 복장 에티켓:</strong> 두바이몰 등 실내는 냉방이 매우 강하므로 얇은 긴팔 옷이나 숄을 챙기시고, 모스크 방문 시에는 단정한 복장을 착용해 주세요.
      `;
    }
  }

  // 3-3. Madrid to Lisbon Route & Booking (마드리드에서 리스본 이동 / 버스 예매 / ALSA / Omio)
  const isMadridToLisbonRoute = [
    '마드리드에서 리스본', '마드리드 리스본', '리스본에서 마드리드', '리스본 마드리드',
    '국경 이동', '국경 이동법', '국경 넘', '어떻게 가', '어떻게가', '어떻게 이동', '버스 예매', '오미오', '알사',
    'madrid to lisbon', 'lisbon to madrid', 'cross border', 'how to get to lisbon', 'how to get from madrid', 'bus booking',
    'マドリードからリスボン', 'リスボンからマドリード', '国境移動', 'バス予約',
    '马德里到里斯本', '里斯本到马德里', '跨境交通', '大巴预订'
  ].some(w => q.includes(w)) ||
  ((q.includes('마드리드') || q.includes('madrid') || q.includes('マドリード') || q.includes('马德里')) &&
   (q.includes('리스본') || q.includes('lisbon') || q.includes('リスボン') || q.includes('里斯本'))) ||
  q.includes('alsa') || q.includes('omio');

  if (isMadridToLisbonRoute) {
    if (lang === 'ja') {
      return `
        ✈️ <strong>🇪🇸 マドリード ➔ 🇵🇹 リスボン 国境移動＆予約ガイド</strong>:<br><br>
        1️⃣ <strong>飛行機（ご両親同伴ならイチ押し・最も推奨！ 🌟）:</strong><br>
        • <strong>所要時間:</strong> 直行便で約1時間20分（EasyJet、Air Europaなど）<br>
        • <strong>費用目安:</strong> 預け入れ荷物込みで1人あたり約10万ウォン（約€70）<br>
        • <strong>おすすめ理由:</strong> 長時間の陸路移動による体力消耗がなく、シニア連れの旅に圧倒的に快適で安心です。<br><br>
        2️⃣ <strong>高速バス（次善の策 - コスパ重視）:</strong><br>
        • <strong>所要時間:</strong> 約8〜9時間<br>
        • <strong>出発ターミナル:</strong> マドリード南バスターミナル（メンデス・アルバロ駅 / Estación Sur）<br>
        • <strong>予約のコツ:</strong> 窓口での当日購入は満席のリスクがあるため、<strong>ALSAアプリまたはOmioアプリでの事前予約が必須</strong>です！乗り心地のため座席間隔の広い<strong>前方プレミアム席（Supra）の指定予約</strong>を強くおすすめします。<br><br>
        3️⃣ <strong>鉄道・列車（非推奨 ⚠️）:</strong><br>
        • 直行列車がなく、2回以上の乗り換えで10時間以上要するためシニア旅行にはおすすめしません。<br><br>
        💶 <strong>通貨のご案内:</strong> スペインとポルトガルは両国とも<strong>ユーロ（€）</strong>を通貨として使用しているため、国境を越えても追加の両替は一切不要です！
      `;
    } else if (lang === 'en') {
      return `
        ✈️ <strong>🇪🇸 Madrid ➔ 🇵🇹 Lisbon Cross-Border Transit & Booking Guide</strong>:<br><br>
        1️⃣ <strong>Flight (Strongly Recommended for Seniors! 🌟):</strong><br>
        • <strong>Travel Time:</strong> Approx. 1 hr 20 min direct (EasyJet, Air Europa, TAP, etc.)<br>
        • <strong>Estimated Cost:</strong> ~₩100,000 (€70) per person with checked baggage<br>
        • <strong>Why Recommended:</strong> Zero physical fatigue from long overland trips, saving valuable energy for elderly parents.<br><br>
        2️⃣ <strong>Express Bus (Secondary Option - Budget Friendly):</strong><br>
        • <strong>Travel Time:</strong> Approx. 8–9 hours<br>
        • <strong>Departure:</strong> Madrid South Bus Terminal (Estación Sur / Méndez Álvaro)<br>
        • <strong>Booking Tip:</strong> Walk-in ticket purchase is NOT recommended. <strong>Pre-book via the ALSA app or Omio app</strong>! Be sure to select the front premium <strong>'Supra' class seats</strong> for spacious legroom and comfort.<br><br>
        3️⃣ <strong>Train (Not Recommended ⚠️):</strong><br>
        • No direct train connection exists; requires 2+ transfers and takes over 10 hours.<br><br>
        💶 <strong>Currency Tip:</strong> Both Spain and Portugal use the <strong>Euro (€)</strong>, so no additional currency exchange is needed when crossing the border!
      `;
    } else if (lang === 'zh') {
      return `
        ✈️ <strong>🇪🇸 马德里 ➔ 🇵🇹 里斯本 跨境交通与预订指南</strong>:<br><br>
        1️⃣ <strong>飞机航班（长辈同行强烈推荐 / 首选方案！ 🌟）：</strong><br>
        • <strong>飞行耗时：</strong> 约1小时20分钟直飞（EasyJet、Air Europa、TAP等）<br>
        • <strong>参考票价：</strong> 含托运行李单人约10万韩元（约€70）<br>
        • <strong>推荐理由：</strong> 耗时最短、完全免去长途陆路颠簸疲劳，长辈出行最舒适省力。<br><br>
        2️⃣ <strong>长途大巴（次选方案 - 追求经济实惠）：</strong><br>
        • <strong>运行耗时：</strong> 约8~9小时<br>
        • <strong>发车站台：</strong> 马德里南站（Estación Sur / Méndez Álvaro站）<br>
        • <strong>订票核心技巧：</strong> 不建议现场购票（易无票）。务必提前通过 <strong>ALSA App 或 Omio App</strong> 在线预订！建议务必选购间距宽敞舒适的<strong>前排豪华头等座（Supra座席）</strong>。<br><br>
        3️⃣ <strong>火车（不推荐 ⚠️）：</strong><br>
        • 两地间目前无直达列车，需换乘2次以上且全程耗时10小时以上，长辈出行体力负担大。<br><br>
        💶 <strong>货币贴士：</strong> 西班牙与葡萄牙均通用<strong>欧元（€）</strong>，跨越国境时完全无需额外兑换货币！
      `;
    } else {
      return `
        ✈️ <strong>🇪🇸 마드리드 ➔ 🇵🇹 리스본 국경 이동 & 예매 가이드</strong>:<br><br>
        1️⃣ <strong>비행기 항공편 (부모님 동행 시 가장 강력 추천! 🌟):</strong><br>
        • <strong>소요 시간:</strong> 약 1시간 20분 직항 (EasyJet, Air Europa, TAP 등)<br>
        • <strong>예상 비용:</strong> 위탁 수하물 포함 1인 약 10만 원 (€70 내외)<br>
        • <strong>추천 이유:</strong> 장거리 육로 이동에 따른 어르신 허리·체력 부담이 전혀 없어 가장 안전하고 편안합니다.<br><br>
        2️⃣ <strong>고속버스 (차선책 - 가성비 여행 시):</strong><br>
        • <strong>소요 시간:</strong> 약 8~9시간 소요<br>
        • <strong>출발 터미널:</strong> 마드리드 남부터미널(Estación Sur / 멘데스 알바로역)<br>
        • <strong>예매 필수 팁:</strong> 현장 발권은 매진 위험이 크므로 <strong>ALSA 앱 또는 Omio 앱</strong>으로 반드시 사전 예매하세요! 어르신 승차감을 위해 좌석 간격이 넓은 <strong>'앞쪽 우등석(Supra)' 좌석 필수 지정 예매</strong>를 강력 추천합니다.<br><br>
        3️⃣ <strong>기차/철도 (비추천 ⚠️):</strong><br>
        • 직행 열차가 없어 최소 2회 이상 환승해야 하며 10시간 이상 소요되므로 추천하지 않습니다.<br><br>
        💶 <strong>환전 안내:</strong> 스페인과 포르투갈 모두 동일하게 <strong>유로(€)</strong>를 사용하므로 국경을 넘어도 추가 환전이 전혀 필요 없습니다!
      `;
    }
  }

  // 3-4. Euro Currency & Cross-Border Exchange (유로 / 환전 / 포르투갈 돈 / 스페인 포르투갈 환전)
  const isEuroCurrencyExchange = [
    '유로', '환전', '포르투갈 돈', '포르투갈돈', '스페인 돈', '스페인돈', '국경 환전', '통화', '화폐',
    'euro', 'euros', 'currency', 'exchange money', 'currency exchange', 'portugal money', 'spain money',
    'ユーロ', '両替', 'ポルトガルのお金', 'スペインのお金', '通貨',
    '欧元', '换汇', '葡萄牙货币', '西班牙货币', '兑换'
  ].some(w => q.includes(w));

  if (isEuroCurrencyExchange) {
    if (lang === 'ja') {
      return `
        💶 <strong>スペイン＆ポルトガル 通貨・両替のご案内</strong>:<br><br>
        • <strong>スペインとポルトガルは両国ともユーロ（€）を使用しているため、国境を越えても追加の両替は一切不要です！</strong><br>
        • スペインで使用したユーロ紙幣や硬貨、トラベルカードはそのままポルトガル全土で同じようにご利用いただけます。<br>
        • <strong>カード決済:</strong> 95％以上の店舗・レストラン・タクシーでタッチ決済（Visa/Mastercard/Apple Pay）が使えます。<br>
        • <strong>現金の目安:</strong> 市場や有料公衆トイレ（0.5〜1ユーロ）利用のため、1人1日あたり20〜30ユーロ程度の小額現金を用意しておけば十分です！
      `;
    } else if (lang === 'en') {
      return `
        💶 <strong>Spain & Portugal Currency & Cross-Border Exchange Guide</strong>:<br><br>
        • <strong>Both Spain and Portugal use the Euro (€), so no additional currency exchange is needed when crossing the border!</strong><br>
        • Any Euros (cash or travel cards like Wise, Revolut, TravelWallet) used in Spain are 100% accepted throughout Portugal without any fees.<br>
        • <strong>Card Payment:</strong> Over 95% of stores, restaurants, and taxis support contactless card payments, eliminating the need to carry large amounts of cash.<br>
        • <strong>Emergency Cash:</strong> Keeping around €20–€30 per person per day in coins and small bills for flea markets and public pay restrooms is more than enough!
      `;
    } else if (lang === 'zh') {
      return `
        💶 <strong>西班牙与葡萄牙货币及跨境换汇指南</strong>:<br><br>
        • <strong>西班牙和葡萄牙均通用欧元（€），因此跨越国境时完全不需要进行任何额外换汇！</strong><br>
        • 在西班牙使用的欧元纸币、硬币以及多币种芯片旅行卡，在葡萄牙全境均可直接无缝使用，无任何汇差损失。<br>
        • <strong>刷卡便利性：</strong> 当地95%以上的商户、餐厅与出租车全面支持手机感应及无接触刷卡。<br>
        • <strong>备用现金建议：</strong> 仅需准备每人每天约20~30欧元零钱，用于传统小集市及欧洲投币收费洗手间（0.5~1欧元）即可！
      `;
    } else {
      return `
        💶 <strong>스페인 & 포르투갈 환전 및 통화 안내</strong>:<br><br>
        • <strong>스페인과 포르투갈 모두 유로(€)를 사용하므로 국경을 넘어도 추가 환전이 필요 없습니다.</strong><br>
        • 스페인에서 사용하시던 유로화 지폐와 동전을 포르투갈에서도 그대로 동일하게 사용하시면 됩니다.<br>
        • <strong>카드 결제:</strong> 트래블로그, 트래블월렛, 일반 비자/마스터 카드의 비접촉(컨택트리스) 결제가 95% 이상 지원되므로 현금 환전 부담이 적습니다.<br>
        • <strong>비상 현금:</strong> 전통 시장이나 유료 공중화장실(0.5~1유로) 이용을 위해 1인당 하루 20~30유로 정도의 소액 현금만 챙기시면 충분합니다!
      `;
    }
  }

  // ----------------------------------------------------
  // 4. CORE TRAVEL INTENTS (핵심 여행 주제)
  // ----------------------------------------------------

  // 4-1. Food / Cuisine / Dishes / Dining (음식 / 요리 / 먹거리 / 맛집)
  const isFood = [
    '음식', '요리', '먹거리', '맛집', '식당', '맛있는', '먹을', '메뉴', '디저트', '푸드',
    'food', 'dish', 'dishes', 'eat', 'eating', 'cuisine', 'specialty', 'specialties', 'delicious', 'tasty', 'restaurant', 'dining',
    '食べ物', 'グルメ', '料理', '食事', '名物', '美味しい', 'スイーツ', 'レストラン',
    '美食', '特色菜', '小吃', '好吃的', '必吃', '菜肴', '点心', '餐厅', '吃什么'
  ].some(w => q.includes(w));

  const isSpecificRestaurant = [
    '맛집', '식당', '레스토랑', 'restaurant', 'restaurants', 'dining', 'レストラン', '餐厅'
  ].some(w => q.includes(w));

  // 4-2. Shopping & Souvenirs (쇼핑 / 기념품 / 선물 / 특산품)
  const isShopping = [
    '쇼핑', '기념품', '선물', '특산품', '사올', '살만한', '살 거', '선물용',
    'shopping', 'souvenir', 'souvenirs', 'gifts', 'gift', 'buy', 'products', 'what to buy',
    'お土産', 'おみやげ', '買い物', 'ショッピング', '特産品', '名産品', '買うべき',
    '购物', '纪念品', '特产', '伴手礼', '买什么', '必买'
  ].some(w => q.includes(w));

  // 4-3. Sights / Places / Attractions (관광지 / 명소 / 가볼만한곳 / 코스)
  const isSights = [
    '관광지', '명소', '가볼만한곳', '코스', '루트', '볼거리', '추천지', '어디',
    'sights', 'places', 'attractions', 'where to go', 'must see', 'sightseeing', 'itinerary',
    '観光地', 'おすすめスポット', '名所', 'どこに行く', '見どころ', '観光',
    '景点', '必去', '值得去', '推荐景点', '看点', '去哪', '游览'
  ].some(w => q.includes(w));

  // 4-4. Weather / Season / Timing / Clothing (날씨 / 기온 / 시기 / 계절 / 옷차림)
  const isWeather = [
    '날씨', '기온', '시기', '계절', '옷차림', '언제', '추워', '추위', '안 추', '더워', '더위', '우기', '비', '일교차',
    'weather', 'period', 'season', 'temperature', 'when', 'climate', 'cold', 'warm', 'clothes', 'clothing', 'pack', 'packing',
    'ベストシーズン', '気候', '時期', '天気', '服装', '季節', '気温', '寒い', '暖かい',
    '最佳时间', '最佳旅游', '天气', '气候', '温度', '穿衣', '季节', '冷', '暖和', '月份'
  ].some(w => q.includes(w));

  // 4-5. Safety & Pickpockets (치안 / 소매치기 / 안전)
  const isSafety = [
    '치안', '소매치기', '안전', '도난', '경찰', '가방', '분실', '여권', '위험', '사기',
    'pickpocket', 'safety', 'security', 'thief', 'danger', 'police', 'scam', 'stolen', 'rob',
    'スリ', '治安', '安全', '盗難', '防犯', '危険',
    '小偷', '防盗', '治安', '安全', '被偷', '危险', '护照'
  ].some(w => q.includes(w));

  // 4-6. Transit / Trains / Uber (교통 / 기차 / 렌페 / 우버)
  const isTransit = [
    '교통', '기차', '열차', '렌페', 'cp', '메트로', '지하철', '택시', '우버', 'bolt', '이동',
    'train', 'renfe', 'metro', 'transit', 'uber', 'taxi', 'transport', 'flight', 'station',
    '交通', '電車', '列車', 'レンフェ', '地下鉄', 'タクシー', 'ウーバー',
    '火车', '高铁', '地铁', '打车', '出租车'
  ].some(w => q.includes(w));

  // 4-7. Budget & Expenses (예산 / 비용 / 경비 / 환율)
  const isBudget = [
    '비용', '예산', '얼마', '경비', '환율', '돈',
    'budget', 'cost', 'how much', 'price', 'expense', 'currency',
    '予算', '費用', 'いくら', '価格',
    '预算', '费用', '多少钱', '花费'
  ].some(w => q.includes(w));

  // 4-8. Card, Cash, Tipping & Restroom (결제 / 환전 / 팁 / 화장실)
  const isCardCash = [
    '환전', '카드', '트래블로그', '트래블월렛', '현금', '팁 문화', '팁 얼마', '팁 줘야', '봉사료', '화장실',
    'contactless', 'cash', 'tipping etiquette', 'service charge', 'toilet', 'restroom',
    '両替', '決済', 'チップ文化', 'トイレ',
    '换汇', '刷卡', '小费', '厕所'
  ].some(w => q.includes(w)) || (q.includes('팁') && (q.includes('식당') || q.includes('호텔') || q.includes('계산') || q.includes('얼마')));

  // 4-9. Tax Refund (텍스리펀)
  const isTaxRefund = [
    '텍스리펀', '택스리펀', '세금', '환급', '면세',
    'tax refund', 'vat', 'diva', 'tax free',
    '免税', 'タックスリファンド',
    '退税'
  ].some(w => q.includes(w));

  // 4-10. Senior Care (시니어 케어 / 부모님 / 휠체어)
  const isSeniorCare = [
    '휠체어', '부모님', '평지', '어르신', '시니어', '배리어프리', '엘리베이터', '무릎',
    'senior', 'parents', 'wheelchair', 'barrier-free', 'flat', 'elevator',
    'シニア', '両親', '車椅子', 'バリアフリー', '足腰',
    '父母', '长辈', '老年人', '轮椅', '无障碍'
  ].some(w => q.includes(w));


  // ----------------------------------------------------
  // 5. DISPATCH BY INTENT
  // ----------------------------------------------------

  // [A] FOOD & CUISINE INTENT
  if (isFood) {
    // A-1. PORTUGAL FOOD
    if (isPortugal || (!isSpain && !isDubai)) {
      let res = '';
      if (lang === 'ja') {
        res = `
          🇵🇹 <strong>ポルトガルで一番人気のある代表的名物料理・グルメ TOP 5</strong>:<br><br>
          大西洋の新鮮な魚介と優しい出汁が特徴で、日本人の口に最もよく合うヨーロッパ料理と言われています！<br><br>
          1. 🥧 <strong>パステル・デ・ナタ（Pastéis de Belém / エッグタルト）</strong><br>
          リスボンのベレン地区にある元祖修道院発祥の国民的スイーツ。サクサクのパイ生地にとろけるカスタード、シナモンと粉糖をかけて温かいうちに食べるのが最高です！<br><br>
          2. 🐟 <strong>バカリャウ・ア・ブラス（Bacalhau à Brás / 干し鱈の卵炒め）</strong><br>
          ポルトガル名物の干し鱈（バカリャウ）を細切りフライドポテト、玉ねぎ、卵と一緒にふんわり炒めた家庭料理。マイルドで塩加減も絶妙です。<br><br>
          3. 🐙 <strong>ポリヴォ・ア・ラガレイロ（Polvo à Lagareiro / タコのオーブン焼き）</strong><br>
          柔らかくボイルしたタコを丸ごと、たっぷりの上質オリーブオイルと潰しニンニク、小芋とともに香ばしくグリルした絶品シーフード。<br><br>
          4. 🥘 <strong>アローシュ・デ・マリスコ（Arroz de Marisco / ポルトガル風海鮮リゾット）</strong><br>
          エビ、カニ、アサリの濃厚な旨味スープでお米を煮込んだポルトガル風の海鮮雑炊。スープが染み込んでいて絶品です。<br><br>
          5. 🥪 <strong>フランセジーニャ（Francesinha / ポルト名物サンドイッチ）</strong><br>
          牛肉ステーキ、ソーセージ、ハムを挟んでチーズで覆い、特製ビール・トマトソースをたっぷりかけたポルト発祥のソウルフード！<br><br>
          💡 <strong>美味しく食べるコツ:</strong> 塩分が気になる場合は注文時に<em>「Sem sal, por favor（セム・サル＝塩控えめで）」</em>とお伝えください。また、テーブルに最初に出てくるパンやチーズ（クーヴェール）は食べると有料になります。
        `;
      } else if (lang === 'en') {
        res = `
          🇵🇹 <strong>Top 5 Most Popular & Delicious Portuguese Dishes</strong>:<br><br>
          Renowned for pristine Atlantic seafood and comforting flavors, Portuguese cuisine is widely loved by international travelers!<br><br>
          1. 🥧 <strong>Pastéis de Belém (World-Famous Portuguese Egg Tart)</strong><br>
          Born in Lisbon's Jerónimos Monastery in 1837. Incredibly flaky, crispy puff pastry filled with warm custard. Dust with cinnamon and powdered sugar for perfection!<br><br>
          2. 🐟 <strong>Bacalhau à Brás (Shredded Salt Cod with Eggs & Potatoes)</strong><br>
          The #1 comfort food: tender salted cod shredded and sautéed with shoestring potatoes, caramelized onions, and fluffy eggs.<br><br>
          3. 🐙 <strong>Polvo à Lagareiro (Roasted Octopus with Olive Oil & Garlic)</strong><br>
          Tenderized whole octopus baked with generous extra virgin olive oil, fragrant roasted garlic cloves, and smashed jacket potatoes.<br><br>
          4. 🥘 <strong>Arroz de Marisco (Portuguese Soupy Seafood Rice)</strong><br>
          Unlike dry Spanish paella, this is a hearty, stew-like rice cooked in rich seafood broth overflowing with jumbo shrimp, clams, and crab.<br><br>
          5. 🥪 <strong>Francesinha (Porto's Iconic Gourmet Sandwich)</strong><br>
          Stuffed with steak, sausages, and ham, enveloped in molten cheese, and smothered in a secret spicy tomato-beer gravy.<br><br>
          💡 <strong>Ordering Tip:</strong> For milder seasoning, simply tell your server <em>"Sem sal, por favor"</em> (less salt, please). Starter breads/olives on table (couvert) are billed if eaten.
        `;
      } else if (lang === 'zh') {
        res = `
          🇵🇹 <strong>葡萄牙最受欢迎、必吃的五大特色美食与名物</strong>:<br><br>
          葡萄牙美食以大西洋鲜美海味、橄榄油与温和滋味著称，深受亚洲旅行者喜爱！<br><br>
          1. 🥧 <strong>葡式蛋挞（Pastéis de Belém / Pastel de Nata）</strong><br>
          自1837年传承至今的里斯本贝伦区百年元祖秘方。多层极酥外皮裹着热乎丝滑的奶香馅料，撒上肉桂粉与糖粉，外脆里嫩！<br><br>
          2. 🐟 <strong>布拉斯式鳕鱼（Bacalhau à Brás）</strong><br>
          葡萄牙国菜鳕鱼最经典吃法：精选鳕鱼肉丝与炸至金黄的土豆细丝、洋葱及嫩滑鸡蛋同炒，香醇不腻，极受长辈欢迎。<br><br>
          3. 🐙 <strong>橄榄油烤章鱼（Polvo à Lagareiro）</strong><br>
          大章鱼文火慢炖至软嫩，再浸润在大量特级初榨橄榄油、大蒜碎与拍扁的小土豆中烤至金黄焦香，鲜美无韧劲。<br><br>
          4. 🥘 <strong>葡式海鲜泡饭（Arroz de Marisco）</strong><br>
          富含大虾、蛤蜊、螃蟹精华浓汁的慢炖海鲜饭，汤汁丰盈，鲜暖开胃。<br><br>
          5. 🥪 <strong>湿润三明治（Francesinha / 法式小火腿热狗）</strong><br>
          波尔图的代表性灵魂小吃。厚切牛排、香肠、火腿夹于吐司间，表面铺满融化芝士并浸泡在特制啤酒番茄浓郁肉汁中。<br><br>
          💡 <strong>点餐贴士：</strong>若口味喜淡，可对服务员说：<em>“Sem sal, por favor”</em>（请少放盐）。餐前桌上摆放的餐包奶酪如食用会按件计费。
        `;
      } else {
        res = `
          🇵🇹 <strong>포르투갈에서 가장 인기 있고 맛있는 대표 음식 TOP 5</strong>:<br><br>
          대서양의 신선한 해산물과 친숙한 쌀 요리가 많아 부모님과 함께하는 가족 여행객 입맛에 가장 잘 맞습니다!<br><br>
          1. 🥧 <strong>파스텔 드 벨렝 (Pastéis de Belém / 원조 에그타르트)</strong><br>
          1837년 제로니무스 수도원 수녀원의 비법 그대로! 파삭한 페이스트리와 따뜻하고 부드러운 커스터드 크림 위에 시나몬 가루를 톡톡 뿌려 드세요.<br><br>
          2. 🐟 <strong>바칼라우 아 브라스 (Bacalhau à Brás / 대구 요리)</strong><br>
          포르투갈의 국민 생선 '대구(바칼라우)'를 가늘게 채 썬 바삭한 감자, 양파, 부드러운 계란과 함께 볶아낸 요리. 자극적이지 않아 어르신들도 아주 좋아하십니다.<br><br>
          3. 🐙 <strong>폴보 아 라가레이루 (Polvo à Lagareiro / 문어 구이)</strong><br>
          부드럽게 익힌 통통한 문어 다리를 최상급 올리브유와 통마늘, 으깬 알감자와 함께 오븐에 노릇하게 구워낸 요리. 전혀 질기지 않고 촉촉합니다.<br><br>
          4. 🥘 <strong>아로스 드 마리스쿠 (Arroz de Marisco / 포르투갈식 해물 밥)</strong><br>
          스페인 빠에야와 달리 자작한 국물이 있는 해물 국밥/리조또 스타일! 꽃게, 새우, 조개 육수가 진하게 배어 있어 속이 확 풀립니다.<br><br>
          5. 🥪 <strong>프랑세지냐 (Francesinha / 포르투 명물 샌드위치)</strong><br>
          스테이크, 소시지, 햄을 넣고 모차렐라 치즈를 듬뿍 덮은 뒤 특제 맥주·토마토 매콤 소스를 부어 먹는 포르투 대표 소울푸드.<br><br>
          💡 <strong>식당 이용 팁:</strong> 음식이 짤까 봐 걱정되시면 주문 시 <em>"Sem sal, por favor (셈 살, 포르 파보르 - 소금 적게)"</em>를 꼭 외쳐주세요! (식전 빵과 올리브는 드신 만큼만 계산됩니다)
        `;
      }
      if (isSpecificRestaurant) {
        res += renderMatchingDiningCards('리스본');
      }
      return res;
    }

    // A-2. SPAIN FOOD
    if (isSpain) {
      let res = '';
      if (lang === 'ja') {
        res = `
          🇪🇸 <strong>スペインで一番人気のある代表的名物料理・タパス TOP 5</strong>:<br><br>
          1. 🥘 <strong>パエリア（Paella）:</strong> バレンシア発祥。サフランの香りと魚介の旨味が染み込んだ本場の炊き込みご飯。<br>
          2. 🍖 <strong>イベリコ豚生ハム（Jamón Ibérico de Bellota）:</strong> ドングリを食べて育った最高級黒豚の生ハム。口の中でとろけます。<br>
          3. 🍤 <strong>ガンバス・アル・アヒージョ（Gambas al Ajillo）:</strong> 熱々のオリーブオイルにニンニクとプリプリ海老を入れた人気タパス。<br>
          4. ☕ <strong>チュロス＆濃厚ホットチョコレート（Churros con Chocolate）:</strong> 揚げたてサクサクのチュロスをとろみのあるチョコにディップ！<br>
          5. 🥩 <strong>コチニーリョ・アサード（Cochinillo Asado）:</strong> セゴビア・マドリード名物の仔豚の丸焼き。皮はパリパリ、肉は驚くほどジューシー。<br><br>
          💡 スペインは夕食時間が20:30〜21:00と遅いため、昼食（13:30〜15:30）をしっかり召し上がるのがコツです！
        `;
      } else if (lang === 'en') {
        res = `
          🇪🇸 <strong>Top 5 Most Popular & Iconic Spanish Dishes</strong>:<br><br>
          1. 🥘 <strong>Authentic Paella (Seafood / Valencian):</strong> Saffron-infused shallow-pan rice with golden crispy bottom crust (socarrat).<br>
          2. 🍖 <strong>Jamón Ibérico de Bellota:</strong> Acorn-fed free-range cured ham sliced wafer-thin, melting with sweet nutty aromas.<br>
          3. 🍤 <strong>Tapas Highlights (Gambas al Ajillo & Patatas Bravas):</strong> Sizzling garlic prawns and spiced potato tapas in atmospheric taverns.<br>
          4. ☕ <strong>Churros con Chocolate:</strong> Crispy hot churros dipped in thick molten dark drinking chocolate.<br>
          5. 🥩 <strong>Cochinillo Asado:</strong> Segovia/Castilian roast suckling pig, featuring shatteringly crisp skin and tender meat.<br><br>
          💡 Dinner in Spain typically begins after 20:30; lunch (13:30–15:30) is the main leisurely meal!
        `;
      } else if (lang === 'zh') {
        res = `
          🇪🇸 <strong>西班牙最受欢迎、必吃的五大经典特色美食</strong>:<br><br>
          1. 🥘 <strong>西班牙海鲜铁盘饭（Paella）：</strong> 藏红花与海鲜原汁烹制的经典米饭，底部微焦的锅巴（Socarrat）香脆绝伦。<br>
          2. 🍖 <strong>小橡果伊比利亚火腿（Jamón Ibérico de Bellota）：</strong> 吃天然橡果长大的纯种黑猪火腿，现切薄片入口即化。<br>
          3. 🍤 <strong>经典小吃（Gambas al Ajillo蒜香大虾 & 辣汁土豆）：</strong> 西班牙Tapas精髓，配面包蘸橄榄油汁非常满足。<br>
          4. ☕ <strong>吉事果配热巧（Churros con Chocolate）：</strong> 现炸酥脆吉事果蘸浓郁微苦热巧，是马德里的经典早餐与下午茶。<br>
          5. 🥩 <strong>烤乳猪（Cochinillo Asado）：</strong> 塞戈维亚名菜，皮脆如玻璃，肉质鲜嫩多汁。<br><br>
          💡 西班牙晚餐一般20:30后才开始，午餐（13:30~15:30）分量最足！
        `;
      } else {
        res = `
          🇪🇸 <strong>스페인에서 가장 인기 있고 유명한 대표 미식 TOP 5</strong>:<br><br>
          1. 🥘 <strong>원조 빠에야 (Paella):</strong> 향긋한 사프란과 해산물/토끼·닭고기 육수가 배어든 쌀 요리. 바닥의 누룽지(소카랏)가 핵심!<br>
          2. 🍖 <strong>하몬 이베리코 데 베요타 (Jamón Ibérico):</strong> 도토리만 먹고 자란 최상급 흑돼지 생햄. 입안에 넣으면 고소한 기름이 사르르 녹아내립니다.<br>
          3. 🍤 <strong>감바스 알 아히요 & 타파스 (Tapas):</strong> 지글지글 끓는 올리브유와 마늘, 통통한 새우 요리. 바게트에 오일을 찍어 드시면 별미입니다.<br>
          4. ☕ <strong>츄러스 & 핫초콜릿 (Churros con Chocolate):</strong> 갓 튀긴 바삭한 츄러스를 걸쭉한 다크 초콜릿에 푹 찍어 먹는 마드리드 대표 간식.<br>
          5. 🥩 <strong>코치니요 아사도 (Cochinillo Asado):</strong> 세고비아/마드리드 전통 새끼돼지 구이. 겉은 바삭하고 속은 믿기지 않을 만큼 부드럽습니다.<br><br>
          💡 스페인은 점심이 메인(13:30~15:30)이며, 저녁 식사는 보통 20:30 이후에 시작되므로 낮에 든든히 드시는 것을 추천합니다!
        `;
      }
      if (isSpecificRestaurant) {
        res += renderMatchingDiningCards('마드리드');
      }
      return res;
    }

    // A-3. DUBAI FOOD
    if (isDubai) {
      let res = '';
      if (lang === 'ja') {
        res = `
          🇦🇪 <strong>ドバイで人気のおすすめグルメ・アラビア名物</strong>:<br><br>
          1. <strong>マチュブース（Al Machboos）:</strong> カルダモンやサフランで炊き上げたアラブ風ラム／チキン炊き込みご飯。<br>
          2. <strong>ルカイマット（Luqaimat）:</strong> デーツシロップと白ごまをかけた揚げたてのアラビアン・ドーナツ。<br>
          3. <strong>ラクダミルクのスイーツ＆カフェ:</strong> ドバイ名物のラクダミルクカプチーノやジェラート。<br><br>
          💡 ドバイの有名店（Arabian Tea Houseなど）は涼しい室内席が完備され、ご両親連れでも快適にお食事できます。
        `;
      } else if (lang === 'en') {
        res = `
          🇦🇪 <strong>Top Traditional Emirati & Dubai Culinary Specialties</strong>:<br><br>
          1. <strong>Al Machboos:</strong> Fragrant spiced basmati rice slow-cooked with tender lamb or chicken and dried limes.<br>
          2. <strong>Luqaimat:</strong> Golden fried dough balls drizzled with date syrup and toasted sesame seeds.<br>
          3. <strong>Camel Milk Gelato & Karak Chai:</strong> Rich camel milk ice cream and spiced milk tea.<br><br>
          💡 Dubai restaurants offer full indoor air-conditioning and flat step-free access, ideal for senior travelers.
        `;
      } else if (lang === 'zh') {
        res = `
          🇦🇪 <strong>迪拜当地代表性阿拉伯特色美食指南</strong>:<br><br>
          1. <strong>阿拉伯手抓饭（Al Machboos）：</strong> 加入豆蔻、干柠檬与藏红花慢炖的羊肉/鸡肉香米饭。<br>
          2. <strong>椰枣蜜糖丸（Luqaimat）：</strong> 外酥内软的炸面丸，淋上香甜纯正的椰枣糖浆与芝麻。<br>
          3. <strong>骆驼奶冰淇淋与特调茶：</strong> 迪拜独有的清香骆驼奶甜品与香浓卡拉克奶茶。<br><br>
          💡 迪拜餐厅室内冷气充足，无障碍设施完善，非常适宜长辈家庭就餐。
        `;
      } else {
        res = `
          🇦🇪 <strong>두바이에서 꼭 맛봐야 할 전통 아라비안 대표 미식</strong>:<br><br>
          1. <strong>알 마츠부스 (Al Machboos):</strong> 사프란과 말린 라임 등 특유의 향신료를 넣고 부드러운 양고기/닭고기와 함께 볶아낸 아랍 전통 볶음밥.<br>
          2. <strong>루카이마트 (Luqaimat):</strong> 갓 튀긴 쫄깃한 반죽에 달콤한 대추야자(데이트) 시럽과 통깨를 뿌린 전통 디저트.<br>
          3. <strong>낙타유 아이스크림 & 카락 차이:</strong> 고소하고 산뜻한 낙타유 디저트와 향긋한 홍차 음료.<br><br>
          💡 두바이 맛집(아라비안 티 하우스 등)은 100% 쾌적한 실내 에어컨과 단차 없는 평지 진입로가 있어 부모님 식사에 아주 좋습니다.
        `;
      }
      res += renderMatchingDiningCards('두바이');
      return res;
    }
  }

  // [B] SHOPPING & SOUVENIR INTENT
  if (isShopping) {
    if (isPortugal) {
      if (lang === 'ja') {
        return `
          🎁 <strong>ポルトガルで買うべき人気のお土産・ショッピング厳選</strong>:<br><br>
          1. 🍷 <strong>ポートワイン（Porto Wine）:</strong> ドウロ渓谷の甘口酒精強化ワイン。ドウロ川沿いの老舗ワイナリーで試飲して購入できます。<br>
          2. 🐟 <strong>高級オイルサーディン缶詰（Sardinha）:</strong> まるで本のようなおしゃれなデザイン缶（O Mundo Fantástico da Sardinha Portuguesa）。<br>
          3. 🐓 <strong>バルセロスの雄鶏（Galo de Barcelos）:</strong> 幸運と奇跡のシンボルとして愛される伝統工芸品。<br>
          4. 🧼 <strong>王室御用達クラウス・ポルト（Claus Porto）石鹸:</strong> 美しいアール・デコ調パッケージの上品な香水石鹸。<br>
          5. 👜 <strong>コルク製品＆アズレージョ陶器タイル:</strong> 世界一のコルク生産国ならではの軽くて丈夫なバッグやコースター。
        `;
      } else if (lang === 'en') {
        return `
          🎁 <strong>Top Souvenirs & What to Buy in Portugal</strong>:<br><br>
          1. 🍷 <strong>Authentic Port Wine:</strong> Rich, sweet fortified wine from Porto's historic Gaia cellars (Taylor's, Graham's, Sandeman).<br>
          2. 🐟 <strong>Designer Gourmet Sardine Tins:</strong> Fairytale-themed vintage tins from <em>O Mundo Fantástico da Sardinha Portuguesa</em>.<br>
          3. 🐓 <strong>Rooster of Barcelos (Galo de Barcelos):</strong> The beloved folk emblem of good luck, honesty, and joy.<br>
          4. 🧼 <strong>Claus Porto / Castelbel Luxury Soaps:</strong> 130-year-old historic perfumed soaps wrapped in vintage Art Deco papers.<br>
          5. 👜 <strong>Natural Cork Accessories & Handpainted Azulejo Tiles:</strong> Eco-friendly, waterproof cork purses, hats, and iconic ceramic tiles.
        `;
      } else if (lang === 'zh') {
        return `
          🎁 <strong>葡萄牙最值得买的热门特色伴手礼与纪念品</strong>:<br><br>
          1. 🍷 <strong>波特酒（Port Wine）：</strong> 杜罗河谷特产的高甜度加度葡萄酒，果香醇厚。<br>
          2. 🐟 <strong>童话复古沙丁鱼罐头：</strong> 包装华丽如童话书的沙丁鱼名店（世界奇妙沙丁鱼），极具收藏价值。<br>
          3. 🐓 <strong>公鸡吉祥物（Galo de Barcelos）：</strong> 象征幸运、公正与正义的葡萄牙国家吉祥物瓷器或饰品。<br>
          4. 🧼 <strong>百年皇室香皂（Claus Porto / Castelbel）：</strong> 130年历史手工天然植物精油皂，包装典雅。<br>
          5. 👜 <strong>软木工艺品与彩绘瓷砖（Azulejo）：</strong> 葡萄牙作为全球最大软木产国，软木包包轻便防水耐磨。
        `;
      } else {
        return `
          🎁 <strong>포르투갈에서 꼭 사와야 할 쇼핑 & 기념품 BEST 5</strong>:<br><br>
          1. 🍷 <strong>포트 와인 (Port Wine):</strong> 포르투 가이아 지구 와이너리에서 숙성된 달콤하고 깊은 맛의 주정강화 와인.<br>
          2. 🐟 <strong>동화 같은 정어리 통조림:</strong> '환상적인 정어리 세계' 매장에서 판매하는 출생연도별 빈티지 디자인 통조림 선물.<br>
          3. 🐓 <strong>바르셀로스의 수탉 (행운의 상징):</strong> 행운과 정의를 부르는 포르투갈의 국민 마스코트 수탉 기념품.<br>
          4. 🧼 <strong>클라우스 포르토 (Claus Porto) 왕실 비누:</strong> 130년 전통의 빈티지 아르데코 포장지와 천연 향기로 선물용 1위!<br>
          5. 👜 <strong>천연 코르크 제품 & 아줄레주 타일:</strong> 세계 최대 코르크 생산국만의 가볍고 질긴 코르크 가방, 파우치, 냄비받침.
        `;
      }
    } else {
      // Spain shopping
      if (lang === 'ja') {
        return `
          🎁 <strong>スペインで買うべき人気のお土産・特産品 BEST 5</strong>:<br><br>
          1. 🫒 <strong>最高級エクストラバージンオリーブオイル:</strong> スペインは世界一の生産国。BIO認定の上質なオイルが手頃な価格で。<br>
          2. 🍖 <strong>真空パック イベリコ豚生ハム:</strong> 高級スーパー（El Corte Inglés）で購入できる持ち帰り用生ハム。<br>
          3. 🌿 <strong>サフラン（Azafrán）:</strong> パエリアに欠かせない高級スパイス。現地のスーパーなら格安で購入可能。<br>
          4. 🍬 <strong>トゥロン（Turrón / スペイン風ヌガー）:</strong> アーモンドと蜂蜜を練り上げた伝統菓子。<br>
          5. 🛍️ <strong>スペイン発ブランド（LOEWE、Zara、Massimo Dutti）:</strong> 最低購入金額制限のない免税制度（DIVA）により本場でお得に購入できます！
        `;
      } else if (lang === 'en') {
        return `
          🎁 <strong>Top Souvenirs & What to Buy in Spain</strong>:<br><br>
          1. 🫒 <strong>Extra Virgin Olive Oil:</strong> Spain produces over 45% of the world's olive oil—premium estate bottles are incredible values.<br>
          2. 🍖 <strong>Vacuum-Packed Jamón Ibérico:</strong> Premium acorn-fed jamón packets available at gourmet markets and El Corte Inglés.<br>
          3. 🌿 <strong>Spanish Saffron (Azafrán):</strong> The world-renowned golden spice for paella, sold at fraction of international prices.<br>
          4. 🍬 <strong>Turrón (Spanish Almond Nougat):</strong> Traditional holiday sweet with honey, egg whites, and toasted Mediterranean almonds.<br>
          5. 🛍️ <strong>Spanish Fashion Brands (Loewe, Zara, Massimo Dutti):</strong> Significant price advantage in Spain plus 0-euro minimum tax refund!
        `;
      } else if (lang === 'zh') {
        return `
          🎁 <strong>西班牙必买特色伴手礼与购物推荐 BEST 5</strong>:<br><br>
          1. 🫒 <strong>特级初榨橄榄油（EVOO）：</strong> 西班牙是全球第一大橄榄油产国，高品质庄园油性价比极高。<br>
          2. 🍖 <strong>真空包装伊比利亚火腿：</strong> 英国宫百货（El Corte Inglés）地下一层即可买到专业真空切片。<br>
          3. 🌿 <strong>天然藏红花（Azafrán）：</strong> 制作海鲜饭的灵魂香料，在西班牙本地药妆店或超市价格亲民。<br>
          4. 🍬 <strong>杜隆糖（Turrón / 杏仁牛轧糖）：</strong> 西班牙传统节日甜点，口感香甜浓郁。<br>
          5. 🛍️ <strong>本土品牌（Loewe罗意威、Massimo Dutti、Zara）：</strong> 西班牙本地退税零门槛，定价显著低于亚洲！
        `;
      } else {
        return `
          🎁 <strong>스페인에서 꼭 사와야 할 필수 쇼핑 & 기념품 BEST 5</strong>:<br><br>
          1. 🫒 <strong>엑스트라 버진 올리브유:</strong> 전 세계 올리브유 생산량 1위 스페인! 오로바일렌 등 프리미엄 오일을 매우 저렴하게 구매 가능.<br>
          2. 🍖 <strong>진공포장 하몬 이베리코:</strong> 엘 코르테 잉글레스 백화점 식품관에서 진공포장된 베요타 등급 하몬 팩.<br>
          3. 🌿 <strong>사프란 (Azafrán):</strong> 빠에야의 노란빛과 깊은 향을 내는 귀한 향신료. 현지 슈퍼마켓에서 가성비 최고!<br>
          4. 🍬 <strong>뚜론 (Turrón):</strong> 볶은 아몬드와 꿀, 계란 흰자로 만든 스페인 전통 견과류 엿.<br>
          5. 🛍️ <strong>로에베(LOEWE) 및 자라/마시모두띠:</strong> 스페인 현지 본사 가격 + 최소 구매액 없는 텍스리펀(DIVA) 혜택으로 가격 메리트 극대화!
        `;
      }
    }
  }

  // [C] SIGHTS & ATTRACTIONS INTENT
  if (isSights) {
    if (isPortugal) {
      if (lang === 'ja') {
        return `
          🏰 <strong>ポルトガルの必見おすすめ観光名所 TOP 4</strong>:<br><br>
          1. <strong>リスボン・ベレン地区:</strong> 世界遺産ジェロニモス修道院とベレンの塔。名物エッグタルト本店もすぐそば！<br>
          2. <strong>シントラ（Sintra）:</strong> おとぎ話のカラフルなペーナ宮殿とレガレイラ宮殿（坂道はUber利用推奨）。<br>
          3. <strong>ポルト・ドウロ川:</strong> ドン・ルイス1世橋の絶景とワイナリーが並ぶカイス・ダ・リベイラ地区。<br>
          4. <strong>アルガルヴェ南部海岸:</strong> 黄金の断崖絶壁とベナギル洞窟。冬でも穏やかな日差しが降り注ぎます。
        `;
      } else if (lang === 'en') {
        return `
          🏰 <strong>Top 4 Must-Visit Sights in Portugal</strong>:<br><br>
          1. <strong>Lisbon (Belém & Baixa):</strong> UNESCO Jerónimos Monastery, Belém Tower, and flat Baixa plazas.<br>
          2. <strong>Sintra Fairy-tale Palaces:</strong> Vibrant Pena Palace & mystical Quinta da Regaleira (take an Uber up the hill).<br>
          3. <strong>Porto & Douro River:</strong> Iconic Dom Luís I Bridge, Livraria Lello, and historic port wine cellars.<br>
          4. <strong>The Algarve Coast:</strong> Stunning golden cliffs and Benagil sea caves in sunny southern Portugal.
        `;
      } else if (lang === 'zh') {
        return `
          🏰 <strong>葡萄牙最值得游览的4大标志性名胜</strong>:<br><br>
          1. <strong>里斯本贝伦区：</strong> 世界遗产热罗尼莫斯修道院、贝伦塔及百年蛋挞本店。<br>
          2. <strong>辛特拉童话小镇：</strong> 绚丽的佩纳宫与神秘雷加莱拉庄园（建议打车上山保护膝盖）。<br>
          3. <strong>波尔图杜罗河畔：</strong> 路易一世大桥壮观日落、莱罗书店与加亚新城酒庄。<br>
          4. <strong>阿尔加维南部海岸：</strong> 避冬胜地，拥有壮丽的悬崖海景与贝纳吉尔洞穴。
        `;
      } else {
        return `
          🏰 <strong>포르투갈 대표 추천 핵심 명소 TOP 4</strong>:<br><br>
          1. <strong>리스본 벨렝 지구:</strong> 세계유산 제로니무스 수도원, 벨렝탑, 원조 에그타르트 본점.<br>
          2. <strong>신트라 동화마을:</strong> 알록달록한 페나 궁전 & 헤갈레이라 별장 (언덕길은 우버 탑승 권장).<br>
          3. <strong>포르투 도루강변:</strong> 동루이스 1세 다리, 렐루 서점, 와인 와이너리 투어.<br>
          4. <strong>알가르베 남부 해안:</strong> 온화한 대서양 절벽과 베나길 동굴의 이국적 풍광.
        `;
      }
    } else {
      // Spain sights
      if (lang === 'ja') {
        return `
          🏰 <strong>スペインの必見おすすめ観光名所 TOP 4</strong>:<br><br>
          1. <strong>バルセロナ:</strong> サグラダ・ファミリア、グエル公園、カサ・バトリョ（ガウディ建築群）。<br>
          2. <strong>マドリード:</strong> プラド美術館、王宮、活気あふれるマヨール広場。<br>
          3. <strong>セビリア:</strong> スペイン広場、大聖堂、ヒラルダの塔（フラメンコ発祥の地）。<br>
          4. <strong>グラナダ:</strong> イスラム建築の最高峰アルハンブラ宮殿（事前予約必須）。
        `;
      } else if (lang === 'en') {
        return `
          🏰 <strong>Top 4 Must-Visit Landmarks in Spain</strong>:<br><br>
          1. <strong>Barcelona:</strong> Gaudí masterpieces—Sagrada Família, Park Güell, Casa Batlló.<br>
          2. <strong>Madrid:</strong> The Royal Palace, Prado Museum, and lively Plaza Mayor.<br>
          3. <strong>Seville:</strong> Plaza de España, Seville Cathedral, and royal Alcázar palace.<br>
          4. <strong>Granada:</strong> The breathtaking Moorish Alhambra Palace (book tickets weeks in advance!).
        `;
      } else if (lang === 'zh') {
        return `
          🏰 <strong>西班牙最值得游览的4大标志性名胜</strong>:<br><br>
          1. <strong>巴塞罗那：</strong> 高迪建筑奇迹——圣家堂、奎尔公园、巴特罗之家。<br>
          2. <strong>马德里：</strong> 普拉多博物馆、马德里王宫与热闹非凡的马约尔广场。<br>
          3. <strong>塞维利亚：</strong> 壮丽的西班牙广场、大教堂与弗拉门戈故乡。<br>
          4. <strong>格拉纳达：</strong> 阿尔罕布拉宫（摩尔艺术巅峰，需提前数周预约！）。
        `;
      } else {
        return `
          🏰 <strong>스페인 대표 추천 핵심 명소 TOP 4</strong>:<br><br>
          1. <strong>바르셀로나:</strong> 가우디의 걸작 사그라다 파밀리아 성당, 구엘 공원, 카사 바트요.<br>
          2. <strong>마드리드:</strong> 프라도 미술관, 마드리드 왕궁, 솔 광장 및 마요르 광장.<br>
          3. <strong>세비야:</strong> 영화 촬영지로 유명한 스페인 광장, 세비야 대성당, 알카사르.<br>
          4. <strong>그라나다:</strong> 이슬람 건축의 정점 알함브라 궁전 (사전 예약 필수!).
        `;
      }
    }
  }

  // [D] WEATHER, BEST PERIOD, TIMING & CLOTHING INTENT (진짜 날씨/시기 질문일 때만 실행)
  if (isWeather) {
    if (lang === 'ja') {
      return `
        🌤️ <strong>ポルトガル・スペイン 11〜12月 ベストシーズン＆気候ガイド</strong>:<br><br>
        🏆 <strong>最も寒くない絶好の黄金期：【11月1日〜11月15日（11月上旬〜中旬）】</strong><br>
        東京の10月中旬のような穏やかで快適な気候。観光地の混雑が落ち着くためシニア同伴の家族旅行に最適です。<br><br>
        📍 <strong>地域別の気候と気温（11月〜12月）:</strong>
        <ul style="margin:4px 0;padding-left:18px;font-size:12.5px;line-height:1.65;">
          <li><strong>ポルトガル（リスボン・ポルト）：</strong> 日中 17〜21℃ / 夜間 11〜13℃。大西洋の海洋性気候により初冬でも温暖です。</li>
          <li><strong>スペイン南部アンダルシア（セビリア・グラナダ）：</strong> 日中 19〜22℃ とヨーロッパ本土で最も暖かく日差しが心地よいエリア。</li>
          <li><strong>スペイン内陸（マドリード）：</strong> 標高660mの高原のため、11月下旬〜12月は日中10〜12℃／夜間3〜6℃と冷え込みます。</li>
        </ul>
        🗺️ <strong>おすすめルート（北 ➔ 南）:</strong> 冷え込みやすいマドリードから入り、温暖なセビリア・リスボンへ南下するルートが最も暖かく快適です！<br><br>
        🧥 <strong>服装のポイント:</strong> 長袖シャツ＋カーディガン＋<strong>朝晩用の軽量ライトダウン</strong>の重ね着がベストです。
      `;
    } else if (lang === 'en') {
      return `
        🌤️ <strong>Best Period & Climate Guide for Portugal & Spain</strong>:<br><br>
        🏆 <strong>The Warmest & Most Pleasant Window: [November 1 – November 15]</strong><br>
        Mild temperatures, minimal rainfall, short ticket queues, and lower accommodation rates make this the golden shoulder season!<br><br>
        📍 <strong>Nov–Dec Regional Climate:</strong>
        <ul style="margin:4px 0;padding-left:18px;font-size:12.5px;line-height:1.65;">
          <li><strong>Portugal (Lisbon & Porto):</strong> Daytime highs 17°C–21°C, nights 11°C–13°C. Atlantic maritime warmth prevents bitter cold.</li>
          <li><strong>Southern Spain (Seville, Granada, Malaga):</strong> Sunny highs of 19°C–22°C—Europe's warmest winter haven!</li>
          <li><strong>Central Spain (Madrid):</strong> High plateau altitude cools Madrid down to 10°C–12°C in late Nov and 5°C–9°C in Dec.</li>
        </ul>
        🗺️ <strong>Recommended Route (North ➔ South):</strong><br>
        Start in Madrid/Barcelona in early Nov before it chills, then travel south to Seville and Lisbon in mid-to-late Nov to chase the sun!<br><br>
        🧥 <strong>Clothing Tips:</strong> Light sweaters + cardigan/jacket + a packable lightweight down jacket for mornings/evenings.
      `;
    } else if (lang === 'zh') {
      return `
        🌤️ <strong>葡萄牙与西班牙 11~12月最佳旅游时间与气候穿衣指南</strong>:<br><br>
        🏆 <strong>最不冷、气候最宜人的黄金时段：【11月1日 ~ 11月15日（11月上旬至中旬）】</strong><br>
        避开盛夏酷暑与大客流，景点无需排长队，气温适宜，非常适合携带父母长辈漫游！<br><br>
        📍 <strong>地区气候对比 (11月~12月):</strong>
        <ul style="margin:4px 0;padding-left:18px;font-size:12.5px;line-height:1.65;">
          <li><strong>葡萄牙（里斯本、波尔图）：</strong> 日间 17℃ ~ 21℃，夜间 11℃ ~ 13℃。受大西洋暖流滋润，气候极其温和。</li>
          <li><strong>西班牙南部安达卢西亚（塞维利亚、格拉纳达）：</strong> 日间 19℃ ~ 22℃，阳光充沛，是欧洲最温暖的度假胜地！</li>
          <li><strong>西班牙中部内陆（马德里）：</strong> 海拔660米高地，11月下旬至12月日间约10℃~12℃，早晚约3℃~6℃。</li>
        </ul>
        🗺️ <strong>推荐路线（由北向南）：</strong> 先游玩较凉的马德里（11月初），随后南下前往温暖的塞维利亚与里斯本（11月中下旬），一路追随温暖阳光！<br><br>
        🧥 <strong>穿衣指南：</strong> 长袖+薄外套+<strong>早晚轻便羽绒服</strong>，洋葱式叠穿最实用。
      `;
    } else {
      return `
        🌤️ <strong>스페인·포르투갈 11~12월 최적 여행 시기 & 날씨 총정리</strong>:<br><br>
        🏆 <strong>가장 안 추운 황금 시기: [11월 1일 ~ 11월 15일 (11월 상순~중순)]</strong><br>
        한국의 쾌적한 10월 초가을 날씨와 비슷하여 어르신과 함께 걷기에 가장 적합한 최적기입니다.<br><br>
        📍 <strong>지역별 11~12월 기온 비교:</strong>
        <ul style="margin:4px 0;padding-left:18px;font-size:12.5px;line-height:1.65;">
          <li><strong>스페인 남부 안달루시아(세비야·그라나다):</strong> 낮 18~22℃ / 아침 10~13℃로 온화한 햇살. 11월 내내 가장 따뜻합니다.</li>
          <li><strong>포르투갈(리스본·포르투):</strong> 낮 16~20℃ / 아침 11~14℃. 대서양 해양성 기후로 한겨울에도 영하로 내려가지 않습니다.</li>
          <li><strong>스페인 중부(마드리드):</strong> 해발 660m 고원으로 11월 말~12월에 낮 10~12℃ / 아침 3~6℃로 꽤 쌀쌀해집니다.</li>
        </ul>
        🗺️ <strong>체감 기온을 높이는 [북 ➡️ 남 이동 루트] 추천:</strong><br>
        쌀쌀해지기 전 <strong>마드리드/바르셀로나(11월 초)</strong>를 먼저 관람하고, 11월 중순 이후 기온이 높은 <strong>남부 세비야 & 리스본</strong>으로 내려오시면 훨씬 따뜻하게 여행하실 수 있습니다!<br><br>
        🧥 <strong>부모님 추천 옷차림 (레이어드 룩):</strong> 얇은 니트 + 자켓 + <strong>아침저녁용 경량 패딩 1벌</strong> 필수!
      `;
    }
  }

  // [E] SAFETY & PICKPOCKET INTENT
  if (isSafety) {
    if (lang === 'ja') {
      return `
        🚨 <strong>スペイン・ポルトガルのスリ対策と治安ガイド</strong>:<br><br>
        凶悪犯罪は極めて稀ですが、観光地や混雑した公共交通機関での<strong>スリ（置き引き・スリ）</strong>には注意が必要です。<br><br>
        🛡️ <strong>被害を防ぐ4大防犯ルール:</strong>
        <ol style="margin:4px 0;padding-left:18px;font-size:12.5px;line-height:1.65;">
          <li><strong>スマホ落下・盗難防止ストラップ:</strong> 手から奪って逃げるひったくり対策に必須。</li>
          <li><strong>バッグは常に体の前（斜めがけ）:</strong> レストランやカフェでバッグを椅子の背もたれに掛けたり床に置かない。</li>
          <li><strong>アンケート・署名詐欺の無視:</strong> 話しかけられても立ち止まらず<em>「No, gracias（結構です）」</em>と言って歩き続ける。</li>
          <li><strong>パスポートと大金はホテルの金庫へ:</strong> 外出時はコピーと決済カード（タッチ決済）のみを携帯。</li>
        </ol>
      `;
    } else if (lang === 'en') {
      return `
        🚨 <strong>Safety & Pickpocket Prevention Guide for Spain & Portugal</strong>:<br><br>
        Violent crime is rare, but opportunistic <strong>pickpockets</strong> target tourists in crowded areas.<br><br>
        🛡️ <strong>4 Golden Rules for Peace of Mind:</strong>
        <ol style="margin:4px 0;padding-left:18px;font-size:12.5px;line-height:1.65;">
          <li><strong>Phone Coil Strap:</strong> Clip your smartphone to your wrist or bag to prevent snatch-and-grab thefts.</li>
          <li><strong>Crossbody Bags Kept in Front:</strong> Never leave bags hung on chair backs or on restaurant floors.</li>
          <li><strong>Ignore Distractions:</strong> Fake clipboard petitions or people offering flowers—firmly say <em>"No, thank you"</em> and keep walking.</li>
          <li><strong>Leave Original Passports in Safe:</strong> Carry a smartphone copy and contactless card instead of cash.</li>
        </ol>
      `;
    } else if (lang === 'zh') {
      return `
        🚨 <strong>西班牙与葡萄牙防盗防偷·安全指南</strong>:<br><br>
        西葡两国严重暴力犯罪极少，但热门景区针对游客的<strong>轻微盗窃与扒手（Pickpocket）</strong>较为普遍。<br><br>
        🛡️ <strong>防盗防骗4大黄金铁律:</strong>
        <ol style="margin:4px 0;padding-left:18px;font-size:12.5px;line-height:1.65;">
          <li><strong>手机防坠防盗弹簧挂绳:</strong> 手机不离手时务必佩戴挂绳，防止被抢夺飞奔逃窜。</li>
          <li><strong>随身包务必胸前斜跨:</strong> 就餐喝咖啡时切勿将包挂在椅背后或放在脚边地面。</li>
          <li><strong>无视任何借故搭讪:</strong> 假借签名请愿、故意递花等注意力骗局，切勿驻足，果断说<em>“No, gracias”</em>大步向前！</li>
          <li><strong>护照现金锁在酒店保险箱:</strong> 外出仅携带护照复印件与境外刷卡卡片，避免携带大额现金。</li>
        </ol>
      `;
    } else {
      return `
        🚨 <strong>스페인·포르투갈 치안 & 소매치기 100% 예방 수칙</strong>:<br><br>
        유럽 주요 도시는 강력 범죄(강도 등) 위험은 매우 낮으나, 부주의를 노린 <strong>소매치기(Pickpocket)</strong>가 빈번합니다.<br><br>
        ⚠️ <strong>주의 구역:</strong> 바르셀로나 람블라스 거리/지하철 환승역, 마드리드 솔 광장, 파리 북역/루브르 주변.<br><br>
        🛡️ <strong>현지 소매치기 방지 4대 철칙:</strong>
        <ol style="margin:4px 0;padding-left:18px;font-size:12.5px;line-height:1.65;">
          <li><strong>스마트폰 도난방지 스프링 스트랩:</strong> 손에 든 폰을 낚아채 달아나는 날치기 원천 방지.</li>
          <li><strong>가방은 항상 몸 앞쪽으로(크로스백):</strong> 식당/카페에서 가방을 의자 뒤에 걸거나 바닥에 절대 두지 마세요.</li>
          <li><strong>주의 분산 수법 무시하기:</strong> 서명 요구, 설문조사, 꽃 건네기 시 절대 멈추지 말고 <em>"No, gracias"</em> 하며 직진!</li>
          <li><strong>여권/비상금 분산 보관:</strong> 여권 원본과 큰돈은 호텔 금고에 두고, 외출 시엔 사본과 트래블 카드만 소지.</li>
        </ol>
      `;
    }
  }

  // [F] TRANSIT & HIGH-SPEED TRAINS
  if (isTransit) {
    if (lang === 'ja') {
      return `
        🚆 <strong>高速鉄道（レンフェ）＆都市部交通の移動のコツ</strong>:<br><br>
        🇪🇸 <strong>スペイン高速鉄道（Renfe AVE / Iryo）:</strong><br>
        • マドリード ↔ バルセロナ：約2時間30分<br>
        • マドリード ↔ セビリア：約2時間40分<br>
        駅が市中心部にあり空港手続きがないため、シニア同伴には飛行機より列車が圧倒的に快適です。<br><br>
        🚖 <strong>市内移動の知恵（Uber・Bolt配車タクシー）:</strong><br>
        ヨーロッパの地下鉄は階段が多いため、3人以上の家族旅行では**Uber / Bolt**を活用すると、料金も地下鉄3人分と同等（約8〜14ユーロ）でホテルの玄関口まで楽に移動できます！
      `;
    } else if (lang === 'en') {
      return `
        🚆 <strong>High-Speed Train (Renfe) & Urban Transit Tips</strong>:<br><br>
        🇪🇸 <strong>Spain High-Speed Trains (Renfe AVE / Iryo / Ouigo):</strong><br>
        • Madrid ↔ Barcelona: ~2 hrs 30 mins<br>
        • Madrid ↔ Seville: ~2 hrs 40 mins<br>
        High-speed rail is far more convenient than flying: stations are downtown and luggage allowance is generous, sparing senior family members airport fatigue.<br><br>
        🚖 <strong>Senior & Family City Mobility (Uber/Bolt Rideshare):</strong><br>
        European historic subway stations have steep stairs. For families of 3+, short 3–5km city rides via **Uber or Bolt** cost only €8–€14 (comparable to 3 metro tickets) and drop you door-to-door!
      `;
    } else if (lang === 'zh') {
      return `
        🚆 <strong>城市间高铁（Renfe）与市内交通出行指南</strong>:<br><br>
        🇪🇸 <strong>西班牙高铁（Renfe AVE / Iryo / Ouigo）:</strong><br>
        • 马德里 ↔ 巴塞罗那：约2小时30分钟<br>
        • 马德里 ↔ 塞维利亚：约2小时40分钟<br>
        车站位于市中心，无需提前数小时去机场安检，长辈家庭出行乘坐高铁更加舒适惬意。<br><br>
        🚖 <strong>长辈家庭市内出行秘诀（善用Uber/Bolt打车）:</strong><br>
        欧洲历史城区地铁站台阶较多。3人及以上家庭在市内3~5公里移动时，使用**Uber、Bolt**打车仅需8~14欧元，费用与3人地铁票相当，长辈免受爬楼梯之苦！
      `;
    } else {
      return `
        🚆 <strong>도시 간 기차(렌페) & 시내 교통 필수 이동 팁</strong>:<br><br>
        🇪🇸 <strong>스페인 고속열차 렌페(Renfe / Iryo / Ouigo):</strong><br>
        • 마드리드 ↔ 바르셀로나: 약 2시간 30분<br>
        • 마드리드 ↔ 세비야: 약 2시간 40분<br>
        비행기보다 도심 접근성이 좋고 수속 시간이 없어 어르신 동행 시 기차가 훨씬 편안합니다.<br><br>
        🇵🇹 <strong>포르투갈 철도(CP):</strong> 리스본 ↔ 포르투 고속열차(AP) 약 2시간 50분.<br><br>
        🚖 <strong>부모님 동행 시내 이동 황금 팁 (우버/볼트 적극 활용):</strong><br>
        유럽 구도심 지하철은 계단이 많아 어르신 무릎에 무리가 갑니다. 3인 가족 기준 3~5km 시내 이동은 <strong>우버(Uber), 볼트(Bolt)</strong> 호출 택시를 이용하시면 요금도 지하철 3인권과 비슷(8~14유로)하며 호텔 문 앞까지 편안하게 이동하실 수 있습니다!
      `;
    }
  }

  // [G] BUDGET & EXPENSES
  if (isBudget) {
    const kpiText = document.getElementById('kpiBudgetText')?.textContent?.trim() || '약 15,480,000원 (₩)';
    const days = document.getElementById('planDays')?.value || '17';
    const party = document.getElementById('planParty')?.value || '3';
    const tierElem = document.getElementById('planTier');
    const tier = (tierElem && tierElem.options && tierElem.selectedIndex >= 0) ? tierElem.options[tierElem.selectedIndex].text : 'Comfort';

    if (lang === 'ja') {
      return `
        💰 <strong>リアルタイム旅行総予算のご案内</strong>:<br><br>
        <div style="background:#f4efe6;border:1px solid var(--line);border-radius:12px;padding:12px;margin-bottom:8px;">
          <div style="font-size:11px;color:var(--muted);font-weight:700;">プランナー自動計算 合計</div>
          <div style="font-size:20px;font-weight:800;color:var(--green);margin:4px 0;">${kpiText}</div>
          <div style="font-size:12px;color:var(--muted);">👨‍👩‍👧 条件: <strong>${party}名様ご家族 · ${days}日間日程 (${tier})</strong></div>
        </div>
        📊 <strong>支出配分:</strong> 航空券約33％、宿泊費約34％、グルメ約18％、入場料約9％、交通予備費約6％。<br>
        💡 上部バーで通貨（EUR, JPY, USD, AED, GBP, CHF）をワンクリックで切り替えられます！
      `;
    } else if (lang === 'en') {
      return `
        💰 <strong>Live Custom Planner Budget Overview</strong>:<br><br>
        <div style="background:#f4efe6;border:1px solid var(--line);border-radius:12px;padding:12px;margin-bottom:8px;">
          <div style="font-size:11px;color:var(--muted);font-weight:700;">REAL-TIME AUTO CALCULATED TOTAL</div>
          <div style="font-size:20px;font-weight:800;color:var(--green);margin:4px 0;">${kpiText}</div>
          <div style="font-size:12px;color:var(--muted);">👨‍👩‍👧 Profile: <strong>Family of ${party} · ${days}-Day Itinerary (${tier})</strong></div>
        </div>
        📊 <strong>Breakdown:</strong> Flights ~33%, Hotels ~34%, Dining ~18%, Sights ~9%, Transit/Buffer ~6%.<br>
        💡 You can switch currency (EUR, USD, AED, GBP, JPY, CHF) in the top utility bar instantly!
      `;
    } else if (lang === 'zh') {
      return `
        💰 <strong>当前实时定制规划总预算明细</strong>:<br><br>
        <div style="background:#f4efe6;border:1px solid var(--line);border-radius:12px;padding:12px;margin-bottom:8px;">
          <div style="font-size:11px;color:var(--muted);font-weight:700;">系统实时计算总额</div>
          <div style="font-size:20px;font-weight:800;color:var(--green);margin:4px 0;">${kpiText}</div>
          <div style="font-size:12px;color:var(--muted);">👨‍👩‍👧 出行概况: <strong>${party}人家庭 · ${days}天行程 (${tier})</strong></div>
        </div>
        📊 <strong>支出配比:</strong> 国际航班约33%，市中心酒店约34%，餐饮美食约18%，门票体验约9%，市内交通备用金约6%。
      `;
    } else {
      return `
        💰 <strong>현재 맞춤 플래너 총 예상 경비 안내</strong>:<br><br>
        <div style="background:#f4efe6;border:1px solid var(--line);border-radius:12px;padding:12px;margin-bottom:8px;">
          <div style="font-size:11px;color:var(--muted);font-weight:700;">실시간 자동 계산 합계</div>
          <div style="font-size:20px;font-weight:800;color:var(--green);margin:4px 0;">${kpiText}</div>
          <div style="font-size:12px;color:var(--muted);">👨‍👩‍👧 여행 조건: <strong>${party}인 가족 · ${days}일 일정 (${tier})</strong></div>
        </div>
        📊 <strong>권장 카테고리별 지출 배분:</strong> 항공권 ~33%, 호텔 ~34%, 식음료 ~18%, 입장권 ~9%, 교통/비상금 ~6%.<br>
        💡 상단 유틸리티 바에서 통화(EUR, USD, AED, GBP, JPY, CHF)를 변경하시면 실시간 변환됩니다!
      `;
    }
  }

  // [H] CARDS, CASH, TIPPING & RESTROOMS
  if (isCardCash) {
    if (lang === 'ja') {
      return `
        💳 <strong>カード決済・現金両替・チップ文化＆トイレの知恵</strong>:<br><br>
        • <strong>タッチ決済普及率95%以上:</strong> スペイン、ポルトガル、英国、ドバイではVISA/Masterのタッチ決済（Apple Pay含む）がほぼ全店舗で使えます。<br>
        • <strong>現金目安:</strong> 露店や有料公衆トイレ（0.50〜1ユーロ小銭）用に<strong>1人1日あたり20〜30ユーロ程度</strong>で充分です。<br><br>
        🍽️ <strong>チップ文化:</strong><br>
        • スペイン・ポルトガル：チップは義務ではありません。サービスに満足した際に端数（1〜2ユーロ）を置く程度で歓迎されます。<br>
        • ドバイ：請求書に10%のサービス料が含まれるのが一般的です。<br><br>
        🚻 <strong>トイレのコツ:</strong> ヨーロッパは街中の無料公衆トイレが少ないため、美術館やレストラン、カフェの利用時に必ず済ませておくのが鉄則です！
      `;
    } else if (lang === 'en') {
      return `
        💳 <strong>Card Payment · Cash · Tipping & Restrooms Guide</strong>:<br><br>
        • <strong>95%+ Contactless Acceptance:</strong> Spain, Portugal, Dubai, and UK accept contactless cards (Apple Pay, Visa, Mastercard) everywhere.<br>
        • <strong>Emergency Cash:</strong> Keep only €20–€30 per person per day for flea markets and public pay restrooms (0.50–1.00 euro coins).<br><br>
        🍽️ <strong>Tipping Etiquette:</strong><br>
        • Spain & Portugal: Tipping is not obligatory! Leaving small change (€1–€2) or 5% for good service is plenty.<br>
        • Dubai: 10% service charge is usually included on bills.<br><br>
        🚻 <strong>Restroom Tip:</strong> Public restrooms are rare; always take advantage of restrooms inside museums, cafes, and restaurants before heading out!
      `;
    } else if (lang === 'zh') {
      return `
        💳 <strong>境外刷卡·换汇·小费文化与卫生间指南</strong>:<br><br>
        • <strong>刷卡普及率超95%：</strong> 西班牙、葡萄牙、英国及迪拜支持境外信用卡与手机无感触碰支付。<br>
        • <strong>现金准备建议：</strong> 仅需每人每天备好<strong>20~30欧元现金零钱</strong>即可（用于跳蚤市场及投币收费公厕）。<br><br>
        🍽️ <strong>小费习俗：</strong><br>
        • 西班牙与葡萄牙：小费绝非强制！服务满意时留1~2欧元零钱即可。<br>
        • 迪拜：通常账单已自动包含10%服务费。<br><br>
        🚻 <strong>卫生间小贴士：</strong> 欧洲街头公共厕所较少，每次在博物馆、咖啡馆或餐厅离开前务必先使用洗手间！
      `;
    } else {
      return `
        💳 <strong>현지 결제(트래블 카드) · 환전 · 팁 · 화장실 가이드</strong>:<br><br>
        • <strong>카드 결제율 95% 이상:</strong> 스페인, 포르투갈, 영국, 두바이는 거의 모든 곳에서 **컨택리스(Contactless) 카드(트래블로그, 트래블월렛, 애플페이)**로 수수료 없이 결제 가능합니다.<br>
        • <strong>비상금 현금 준비:</strong> 노점, 유료 공용 화장실(0.5~1유로 동전) 대비 <strong>1인당 하루 20~30유로</strong> 정도만 소지하시면 충분합니다.<br><br>
        🍽️ <strong>팁(Tip) 문화:</strong><br>
        • 스페인·포르투갈: 팁이 의무가 아닙니다! 서비스 만족 시 잔돈(1~2유로)이나 총액의 5% 정도면 충분합니다.<br>
        • 두바이: 통상 10% 서비스 요금이 계산서에 포함되어 나옵니다.<br><br>
        🚻 <strong>화장실 꿀팁:</strong> 유럽은 무료 공중화장실이 귀하므로 박물관, 식당, 카페에서 나오시기 전 반드시 화장실을 이용하세요!
      `;
    }
  }

  // [I] TAX REFUND
  if (isTaxRefund) {
    if (lang === 'ja') {
      return `
        🛍️ <strong>スペインの免税手続き（DIVAキオスク）完全ガイド</strong>:<br><br>
        🎉 <strong>最低購入金額制限なし:</strong> スペインは0.01ユーロ以上のすべての買い物で付加価値税の還付（約10〜15％）が受けられます！<br><br>
        📋 <strong>空港での手続き手順:</strong>
        <ol style="margin:4px 0;padding-left:18px;font-size:12.5px;line-height:1.65;">
          <li><strong>店舗にて:</strong> パスポートを提示し、DIVAバーコード付き免税書類を発行してもらう。</li>
          <li><strong>空港出発フロア（荷物預け前）:</strong> DIVAデジタルキオスクでバーコードをスキャンし緑色の認証画面を確認。</li>
          <li><strong>還付窓口:</strong> 保安検査後、Global Blue等の窓口でクレジットカードまたは現金で還付を受け取る。</li>
        </ol>
      `;
    } else if (lang === 'en') {
      return `
        🛍️ <strong>Spain & Europe Tax Refund (DIVA Kiosk) Guide</strong>:<br><br>
        🎉 <strong>No Minimum Spend in Spain:</strong> Every purchase of €0.01+ qualifies for a tax refund (typically 10%–15% back)!<br><br>
        📋 <strong>Step-by-Step Airport Procedure:</strong>
        <ol style="margin:4px 0;padding-left:18px;font-size:12.5px;line-height:1.65;">
          <li><strong>At Store:</strong> Show passport and request a tax refund receipt with a DIVA barcode.</li>
          <li><strong>At Airport (Before Check-in):</strong> Scan receipts at the DIVA digital kiosks in departures.</li>
          <li><strong>Refund Desk:</strong> Pass security and visit Global Blue or Planet desk for card or cash payout.</li>
        </ol>
      `;
    } else if (lang === 'zh') {
      return `
        🛍️ <strong>西班牙退税（DIVA自助扫码机）全攻略</strong>:<br><br>
        🎉 <strong>无最低消费门槛：</strong> 西班牙购物满0.01欧元即可申请退税（通常退税率10%~15%）！<br><br>
        📋 <strong>机场办理流程：</strong>
        <ol style="margin:4px 0;padding-left:18px;font-size:12.5px;line-height:1.65;">
          <li><strong>店内购物：</strong> 出示护照，获取印有DIVA条形码的退税单。</li>
          <li><strong>机场值机前：</strong> 在马德里/巴塞罗那机场出发层的DIVA扫码机上扫描条形码，屏幕出现绿勾即完成海关验证。</li>
          <li><strong>领款柜台：</strong> 安检后前往Global Blue或Planet柜台，退回信用卡或现金。</li>
        </ol>
      `;
    } else {
      return `
        🛍️ <strong>스페인 텍스리펀(Tax Refund) 완벽 가이드</strong>:<br><br>
        🎉 <strong>스페인 쇼핑의 특권:</strong> 최소 구매 금액 제한이 없어 <strong>0유로 이상 모든 쇼핑 품목</strong>에 대해 세금 환급이 가능합니다! (통상 10~15% 환급)<br><br>
        📋 <strong>출국 전 공항 환급 절차:</strong>
        <ol style="margin:4px 0;padding-left:18px;font-size:12.5px;line-height:1.65;">
          <li><strong>매장에서:</strong> 구매 시 여권을 제시하고 DIVA 바코드가 인쇄된 텍스리펀 서류 수령.</li>
          <li><strong>공항에서(체크인 전):</strong> 마드리드/바르셀로나 공항 출발층 DIVA 키오스크에서 영수증 바코드를 스캔(초록색 화면 확인).</li>
          <li><strong>환급 부스:</strong> 보안검색대 통과 후 Global Blue 또는 Planet 부스에서 신용카드(권장)로 환급.</li>
        </ol>
      `;
    }
  }

  // [J] SENIOR CARE & ACCESSIBILITY
  if (isSeniorCare) {
    if (lang === 'ja') {
      return `
        🦽 <strong>ご両親・シニア安心の旅行計画＆バリアフリー心得</strong>:<br><br>
        👴 <strong>体調管理4大原則:</strong>
        <ul style="margin:4px 0 10px;padding-left:18px;font-size:12.5px;line-height:1.65;">
          <li><strong>1日1〜2箇所の見学に厳選:</strong> 午前1箇所 ➔ 13〜15時はホテルでお昼寝休憩 ➔ 夕方に平坦な散策。</li>
          <li><strong>石畳（コブルストーン）対策:</strong> 足腰への負担を減らすため、クッション性の高いスニーカーを必ず着用。</li>
          <li><strong>常備薬の持参:</strong> 胃腸薬、鎮痛消炎パップ剤、風邪薬は飲み慣れたものをご持参ください。</li>
          <li><strong>市内移動は配車アプリ活用:</strong> 地下鉄の階段を避け、Uber/Boltでのドアツードア移動をおすすめします。</li>
        </ul>
      `;
    } else if (lang === 'en') {
      return `
        🦽 <strong>Senior Comfort & Barrier-Free Travel Highlights</strong>:<br><br>
        👴 <strong>4 Core Senior Pacing Principles:</strong>
        <ul style="margin:4px 0 10px;padding-left:18px;font-size:12.5px;line-height:1.65;">
          <li><strong>1–2 Highlights Per Day:</strong> Morning exploration ➔ 13:00–15:00 hotel afternoon rest/nap ➔ gentle evening stroll.</li>
          <li><strong>Supportive Footwear:</strong> European cobblestones are bumpy; cushioned walking shoes are mandatory.</li>
          <li><strong>Home Emergency Medicines:</strong> Bring plenty of digestion, anti-inflammatory, and motion sickness medicines.</li>
          <li><strong>Prefer Taxis/Uber Over Subway Stairs:</strong> Door-to-door rides spare elderly knees from steep metro staircases.</li>
        </ul>
      `;
    } else if (lang === 'zh') {
      return `
        🦽 <strong>长辈陪伴·老年人舒适无障碍慢游心得</strong>:<br><br>
        👴 <strong>长辈体力节奏管理4大原则：</strong>
        <ul style="margin:4px 0 10px;padding-left:18px;font-size:12.5px;line-height:1.65;">
          <li><strong>每天仅安排1~2个核心景点：</strong> 上午1处 ➔ 13:00~15:00回酒店午休 ➔ 傍晚平缓散步。</li>
          <li><strong>备足防滑软底运动鞋：</strong> 欧洲碎石路不平整，厚底缓震运动鞋是保护膝盖的关键。</li>
          <li><strong>备齐常用家庭药品：</strong> 肠胃药、膏药贴、感冒止痛药等常备药请务必备足。</li>
          <li><strong>多利用打车代替爬楼梯：</strong> 欧洲老地铁站台阶多，推荐使用Uber/Bolt直达景区门口。</li>
        </ul>
      `;
    } else {
      return `
        🦽 <strong>부모님 동행 시니어 안심 케어 & 배리어프리 원칙</strong>:<br><br>
        👴 <strong>부모님 컨디션 관리 4대 원칙:</strong>
        <ul style="margin:4px 0 10px;padding-left:18px;font-size:12.5px;line-height:1.65;">
          <li><strong>1일 1~2개 핵심 명소만:</strong> 오전 1곳 ➜ 13~15시 호텔 낮잠 휴식 ➜ 늦은 오후 여유로운 평지 산책.</li>
          <li><strong>유럽 돌바닥(코블스톤) 대비:</strong> 바닥이 울퉁불퉁하므로 푹신한 에어 워킹화와 두툼한 양말 착용.</li>
          <li><strong>한국 상비약 넉넉히:</strong> 소화제, 지사제, 진통소염제, 파스는 한국 약이 부모님 몸에 가장 잘 맞습니다.</li>
          <li><strong>지하철 계단 대신 우버/택시 적극 이용:</strong> 무릎 관절 보호를 위해 시내 이동은 우버/볼트 호출을 권장합니다.</li>
        </ul>
      `;
    }
  }

  // [K] DEFAULT FALLBACK
  if (lang === 'ja') {
    return `
      旅行に関するご質問にいつでもお答えいたします！✨<br><br>
      <strong>気になるテーマをクリックしてお試しください:</strong>
      <div style="display:flex;flex-wrap:wrap;gap:6px;margin-top:10px;">
        <button type="button" class="chat-quick-chip" onclick="handleQuickChatChip('ポルトガルで一番人気がある食べ物は？')">🥧 ポルトガル名物料理</button>
        <button type="button" class="chat-quick-chip" onclick="handleQuickChatChip('スペインのお土産は何がおすすめ？')">🎁 スペインのお土産</button>
        <button type="button" class="chat-quick-chip" onclick="handleQuickChatChip('ポルトガル旅行のベストシーズンと気候は？')">📅 ベストシーズン</button>
        <button type="button" class="chat-quick-chip" onclick="handleQuickChatChip('スリ対策と治安の注意点')">🚨 スリ対策</button>
      </div>
    `;
  } else if (lang === 'en') {
    return `
      I'm here to help with all aspects of your journey! ✨<br><br>
      <strong>Try tapping any popular question below:</strong>
      <div style="display:flex;flex-wrap:wrap;gap:6px;margin-top:10px;">
        <button type="button" class="chat-quick-chip" onclick="handleQuickChatChip('What is the most popular food in Portugal?')">🥧 Portugal Top Dishes</button>
        <button type="button" class="chat-quick-chip" onclick="handleQuickChatChip('What souvenirs should I buy in Spain and Portugal?')">🎁 Top Souvenirs</button>
        <button type="button" class="chat-quick-chip" onclick="handleQuickChatChip('when is the best period for any tourists to go to Portugal?')">📅 Best Season & Weather</button>
        <button type="button" class="chat-quick-chip" onclick="handleQuickChatChip('pickpocket prevention tips')">🚨 Pickpocket Tips</button>
      </div>
    `;
  } else if (lang === 'zh') {
    return `
      很高兴为您服务！请输入任何关于美食、路线、天气、购物或交通的问题！✨<br><br>
      <strong>您也可以点击下方快捷问题：</strong>
      <div style="display:flex;flex-wrap:wrap;gap:6px;margin-top:10px;">
        <button type="button" class="chat-quick-chip" onclick="handleQuickChatChip('葡萄牙最受欢迎的特色美食是什么？')">🥧 葡萄牙代表美食</button>
        <button type="button" class="chat-quick-chip" onclick="handleQuickChatChip('西班牙和葡萄牙买什么纪念品伴手礼？')">🎁 必买特产手信</button>
        <button type="button" class="chat-quick-chip" onclick="handleQuickChatChip('什么时候去葡萄牙旅游最合适？')">📅 最佳旅游时间</button>
        <button type="button" class="chat-quick-chip" onclick="handleQuickChatChip('防盗防偷攻略')">🚨 防盗安全攻略</button>
      </div>
    `;
  } else {
    return `
      이베리아 & 두바이 여행에 관한 모든 질문을 편하게 물어보세요! ✨<br><br>
      <strong>자주 묻는 추천 질문을 눌러보세요:</strong>
      <div style="display:flex;flex-wrap:wrap;gap:6px;margin-top:10px;">
        <button type="button" class="chat-quick-chip" onclick="handleQuickChatChip('포르투갈에서 제일 유명하고 맛있는 음식은 뭐야?')">🥧 포르투갈 대표 음식</button>
        <button type="button" class="chat-quick-chip" onclick="handleQuickChatChip('스페인 포르투갈 쇼핑 기념품 추천')">🎁 추천 기념품/쇼핑</button>
        <button type="button" class="chat-quick-chip" onclick="handleQuickChatChip('11~12월 스페인 포르투갈 가장 안 추운 시기는?')">📅 11~12월 추천 시기/날씨</button>
        <button type="button" class="chat-quick-chip" onclick="handleQuickChatChip('소매치기 예방법 알려줘')">🚨 소매치기/치안 수칙</button>
      </div>
    `;
  }
}

// Attach event listener for Chat Form on load
window.addEventListener('DOMContentLoaded', () => {
  
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
