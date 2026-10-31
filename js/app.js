
// Global Direct Jump to Master Gourmet & Survival Phrases
window.jumpToMasterGourmet = function (targetSection) {
  targetSection = targetSection || 'summary-master-gourmet';
  if (targetSection === 'practical-master-gourmet') {
    switchGuidebookChapter('chapter-practical');
    goToBookPage('chapter-practical', 0);
  } else {
    switchGuidebookChapter('chapter-planner');
    goToBookPage('chapter-planner', 0);
  }
  if (typeof renderMasterGourmetGuide === 'function') {
    renderMasterGourmetGuide(typeof currentLang !== 'undefined' ? currentLang : 'ko', 'all');
  }
  setTimeout(function () {
    var el = document.getElementById(targetSection);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, 120);
};


// ========================================================
// BIG LANDMARKS INTERACTIVE MAP (CHAPTER 3 PAGE 4)
// ========================================================
let landmarksBigMapInstance = null;
let landmarksBigMapMarkerLayer = null;
let currentBigMapFilter = 'ALL';

function filterBigLandmarksMap(category) {
  currentBigMapFilter = category;
  ['btnBigMapAll', 'btnBigMapIberia', 'btnBigMapEurope', 'btnBigMapLatin', 'btnBigMapDubai'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.classList.remove('active');
  });

  const activeBtnId = {
    'ALL': 'btnBigMapAll',
    'IBERIA': 'btnBigMapIberia',
    'EUROPE': 'btnBigMapEurope',
    'LATIN': 'btnBigMapLatin',
    'DUBAI': 'btnBigMapDubai'
  }[category] || 'btnBigMapAll';

  const activeBtn = document.getElementById(activeBtnId);
  if (activeBtn) activeBtn.classList.add('active');

  renderBigLandmarksMap();
}

function resetBigLandmarksMapView() {
  if (landmarksBigMapInstance && landmarksBigMapMarkerLayer) {
    const bounds = L.latLngBounds();
    landmarksBigMapMarkerLayer.eachLayer(layer => {
      if (layer.getLatLng) bounds.extend(layer.getLatLng());
    });
    if (bounds.isValid()) {
      landmarksBigMapInstance.fitBounds(bounds, { padding: [50, 50], maxZoom: 12 });
    }
  }
}

function renderBigLandmarksMap() {
  if (typeof L === 'undefined') return;
  const container = document.getElementById('landmarksBigMapContainer');
  if (!container) return;

  if (!landmarksBigMapInstance) {
    landmarksBigMapInstance = L.map('landmarksBigMapContainer', {
      zoomControl: true,
      scrollWheelZoom: false,
      tap: true
    }).setView([32.0, -10.0], 3);

    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 18
    }).addTo(landmarksBigMapInstance);

    landmarksBigMapMarkerLayer = L.layerGroup().addTo(landmarksBigMapInstance);
  }

  landmarksBigMapMarkerLayer.clearLayers();

  const dict = (typeof I18N_DICTIONARY !== 'undefined' && I18N_DICTIONARY[currentLang]) ? I18N_DICTIONARY[currentLang] : (I18N_DICTIONARY ? I18N_DICTIONARY['ko'] : {});
  const allItems = (typeof GLOBAL_LANDMARKS_DATA !== 'undefined' ? [...GLOBAL_LANDMARKS_DATA] : []);

  if (typeof DUBAI_LANDMARKS !== 'undefined') {
    DUBAI_LANDMARKS.forEach(dlm => {
      if (!allItems.some(x => x.name === dlm.name)) {
        allItems.push(dlm);
      }
    });
  }

  // Filter by currentBigMapFilter
  let filteredItems = allItems;
  if (currentBigMapFilter === 'IBERIA') {
    filteredItems = allItems.filter(x => x.region === '스페인' || x.region === '포르투갈' || x.group === '이베리아');
  } else if (currentBigMapFilter === 'EUROPE') {
    filteredItems = allItems.filter(x =>
      x.region !== '스페인' && x.region !== '포르투갈' &&
      x.region !== '중남미' && x.region !== '두바이' && x.region !== '미국' &&
      !x.city.includes('두바이') && !x.city.includes('Dubai') &&
      !x.city.includes('페루') && !x.city.includes('브라질') && !x.city.includes('아르헨티나') && !x.city.includes('멕시코')
    );
  } else if (currentBigMapFilter === 'LATIN') {
    filteredItems = allItems.filter(x =>
      x.region === '중남미' || x.region === '페루' || x.region === '볼리비아' ||
      x.region === '아르헨티나' || x.region === '브라질' || x.region === '멕시코' || x.region === '칠레' ||
      x.city.includes('페루') || x.city.includes('브라질') || x.city.includes('아르헨티나') || x.city.includes('멕시코') || x.city.includes('쿠스코')
    );
  } else if (currentBigMapFilter === 'DUBAI') {
    filteredItems = allItems.filter(x =>
      x.region === '두바이' || x.city.includes('두바이') || x.city.includes('Dubai') ||
      x.name.includes('버즈') || x.name.includes('Burj') || x.name.includes('미래의 박물관')
    );
  }

  const bounds = L.latLngBounds();

  filteredItems.forEach(item => {
    let coords = (typeof LANDMARK_COORDS !== 'undefined' && LANDMARK_COORDS[item.name]) ? LANDMARK_COORDS[item.name] : null;
    if (!coords) {
      if (item.city.includes('두바이') || item.city.includes('Dubai')) coords = [25.1972, 55.2744];
      else if (item.region === '스페인') coords = [40.4168, -3.7038];
      else if (item.region === '포르투갈') coords = [38.7223, -9.1393];
      else if (item.city.includes('페루') || item.city.includes('쿠스코')) coords = [-13.5160, -71.9789];
      else if (item.city.includes('브라질') || item.city.includes('리우')) coords = [-22.9519, -43.2105];
      else if (item.city.includes('아르헨티나') || item.city.includes('부에노스')) coords = [-34.6037, -58.3816];
      else if (item.city.includes('멕시코')) coords = [19.4326, -99.1332];
      else coords = [46.2276, 2.2137];
    }

    const latLng = L.latLng(coords[0], coords[1]);
    bounds.extend(latLng);

    const info = (typeof LANDMARK_I18N_DATA !== 'undefined' && LANDMARK_I18N_DATA[item.name]) ? LANDMARK_I18N_DATA[item.name] : {};
    const localizedName = (info.displayName && info.displayName[currentLang]) || item.name;
    const localizedBadge = (info.badge && info.badge[currentLang]) || item.city;
    const localizedHighlight = (info.highlight && info.highlight[currentLang]) || item.highlight || '';
    const localizedSenior = (info.seniorAccess && info.seniorAccess[currentLang]) || item.seniorAccess || '';
    const priceText = item.baseKrw ? formatCardPrice(item.baseKrw, currentCurrency, false) : (dict['badge_booking_free'] || '무료');

    // Category pin color
    let pinColor = '#10b981'; // Iberia green
    if (item.region === '두바이' || item.city.includes('두바이') || item.city.includes('Dubai')) pinColor = '#f59e0b'; // Gold
    else if (item.region === '중남미' || item.city.includes('페루') || item.city.includes('멕시코') || item.city.includes('브라질')) pinColor = '#ef4444'; // Red
    else if (item.region !== '스페인' && item.region !== '포르투갈') pinColor = '#3b82f6'; // Blue

    const customIcon = L.divIcon({
      className: 'custom-map-pin',
      html: `<div style="background:${pinColor};width:24px;height:24px;border-radius:50%;border:2.5px solid #fff;box-shadow:0 3px 10px rgba(0,0,0,0.35);display:flex;align-items:center;justify-content:center;color:#fff;font-size:11px;font-weight:900;">📍</div>`,
      iconSize: [24, 24],
      iconAnchor: [12, 12]
    });

    const popupHtml = `
      <div class="map-popup-card">
        <img src="${item.photo}" class="map-popup-img" alt="${localizedName}" onerror="this.onerror=null;this.src='https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=400&q=80';" />
        <div class="map-popup-region" style="color:${pinColor};font-weight:800;font-size:11px;margin-top:2px;">${cleanHangul(localizedBadge, currentLang)}</div>
        <div class="map-popup-title" style="font-size:14px;font-weight:800;line-height:1.3;margin:2px 0;">${cleanHangul(localizedName, currentLang)}</div>
        <div class="map-popup-price" style="font-weight:700;color:var(--accent,#0d5c3a);font-size:12.5px;">🎟 ${dict['lbl_price'] || '입장료'}: ${priceText}</div>
        ${localizedHighlight ? `<p style="font-size:11.5px;color:#475569;margin:3px 0 6px;line-height:1.4;">${cleanHangul(localizedHighlight, currentLang).slice(0, 85)}...</p>` : ''}
        ${localizedSenior ? `<div style="font-size:11px;background:#e0f2fe;color:#0369a1;padding:4px 6px;border-radius:6px;margin-bottom:6px;">♿ ${cleanHangul(localizedSenior, currentLang).slice(0, 60)}</div>` : ''}
        <div style="display:flex;gap:6px;margin-top:4px;">
          <a href="${item.officialUrl || '#'}" target="_blank" rel="noopener noreferrer" class="map-popup-btn" style="flex:1;background:var(--accent, #0d5c3a);text-align:center;padding:6px 8px;border-radius:8px;color:#fff;text-decoration:none;font-size:11px;font-weight:700;">
            ${dict['map_official_ticket'] || '공식 예매처 ↗'}
          </a>
          <a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item.mapQuery || item.name)}" target="_blank" rel="noopener noreferrer" class="map-popup-btn" style="flex:1;background:#334155;text-align:center;padding:6px 8px;border-radius:8px;color:#fff;text-decoration:none;font-size:11px;font-weight:700;">
            📍 ${dict['map_google_directions'] || '길찾기'}
          </a>
        </div>
      </div>
    `;

    L.marker(latLng, { icon: customIcon }).bindPopup(popupHtml, { maxWidth: 280 }).addTo(landmarksBigMapMarkerLayer);
  });

  if (filteredItems.length > 0 && bounds.isValid()) {
    setTimeout(() => {
      if (landmarksBigMapInstance) {
        landmarksBigMapInstance.invalidateSize();
        landmarksBigMapInstance.fitBounds(bounds, { padding: [50, 50], maxZoom: 12 });
      }
    }, 120);
    setTimeout(() => {
      if (landmarksBigMapInstance) {
        landmarksBigMapInstance.invalidateSize();
      }
    }, 300);
  }
}

window.renderBigLandmarksMap = renderBigLandmarksMap;
window.filterBigLandmarksMap = filterBigLandmarksMap;
window.resetBigLandmarksMapView = resetBigLandmarksMapView;

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
  // Purge old stale caches on start
  if ('caches' in window) {
    caches.keys().then(function (keys) {
      keys.forEach(function (k) {
        if (k !== 'slow-travel-pwa-v7') {
          caches.delete(k);
        }
      });
    }).catch(function () { });
  }

  if ('serviceWorker' in navigator && (window.location.protocol.startsWith('http') || window.location.hostname === 'localhost')) {
    const swCode = `
      const CACHE_NAME = 'slow-travel-pwa-v7';
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
      // Network-First with Cache Fallback for instant updates
      self.addEventListener('fetch', event => {
        if (event.request.method !== 'GET') return;
        event.respondWith(
          fetch(event.request)
            .then(response => {
              if (response && response.status === 200 && (response.type === 'basic' || response.type === 'cors')) {
                const cloned = response.clone();
                caches.open(CACHE_NAME).then(cache => cache.put(event.request, cloned)).catch(() => {});
              }
              return response;
            })
            .catch(() => caches.match(event.request))
        );
      });
    `;
    try {
      const blob = new Blob([swCode], { type: 'application/javascript' });
      const swUrl = URL.createObjectURL(blob);
      navigator.serviceWorker.register(swUrl).then(function (reg) {
        if (reg && typeof reg.update === 'function') {
          reg.update();
        }
      }).catch(function (err) {
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
  } catch (e) { }
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
  } catch (e) { }

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
  } catch (e) { }

  savedState[`item_${index}`] = isChecked;
  try {
    localStorage.setItem('travel_checklist_state', JSON.stringify(savedState));
  } catch (e) { }

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
  } catch (e) { }

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
  } catch (e) { }
  return Array.from({ length: totalDays }, (_, i) => i);
}

function saveTimelineOrder(order) {
  const key = `travel_timeline_order_${currentActiveRegion}_${currentDurationDays}`;
  try {
    localStorage.setItem(key, JSON.stringify(order));
  } catch (e) { }
}

function resetTimelineOrder() {
  const key = `travel_timeline_order_${currentActiveRegion}_${currentDurationDays}`;
  try {
    localStorage.removeItem(key);
  } catch (e) { }
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

/* ==========================================================================
   ENHANCED TRANSIT SUBTABS & RENDERERS FOR ITALY & 5 EUROPEAN NATIONS
   ========================================================================== */
function switchTransitHotelSubTab(tab) {
  const btnSpain = document.getElementById('tabBtnTransitGuide');
  const btnItaly = document.getElementById('tabBtnTransitItaly');
  const btnEurope = document.getElementById('tabBtnTransitEurope');
  const btnHotel = document.getElementById('tabBtnHotelGuide');

  const panelSpain = document.getElementById('transitGuidePanel');
  const panelItaly = document.getElementById('italyTransitGuidePanel');
  const panelEurope = document.getElementById('europeTransitGuidePanel');
  const panelHotel = document.getElementById('hotelGuidePanel');

  [btnSpain, btnItaly, btnEurope, btnHotel].forEach(b => { if (b) b.classList.remove('active'); });
  [panelSpain, panelItaly, panelEurope, panelHotel].forEach(p => { if (p) p.style.display = 'none'; });

  if (tab === 'spain' || tab === 'transit') {
    if (btnSpain) btnSpain.classList.add('active');
    if (panelSpain) panelSpain.style.display = 'block';
    renderTransitGuide();
  } else if (tab === 'italy') {
    if (btnItaly) btnItaly.classList.add('active');
    if (panelItaly) panelItaly.style.display = 'block';
    renderItalyTransitGuide();
  } else if (tab === 'europe') {
    if (btnEurope) btnEurope.classList.add('active');
    if (panelEurope) panelEurope.style.display = 'block';
    renderEuropeTransitGuide();
  } else if (tab === 'hotels') {
    if (btnHotel) btnHotel.classList.add('active');
    if (panelHotel) panelHotel.style.display = 'block';
    renderHotelFilterBar();
  }
}

function renderItalyTransitGuide() {
  const panel = document.getElementById('italyTransitGuidePanel');
  const itGuide = (typeof ITALY_TRANSIT_GUIDE_I18N !== 'undefined') ? ITALY_TRANSIT_GUIDE_I18N : (typeof window !== 'undefined' ? window.ITALY_TRANSIT_GUIDE_I18N : null);
  if (!panel || !itGuide) return;

  const lang = (typeof currentLang !== 'undefined' && currentLang) ? currentLang : 'ko';
  const it = itGuide[lang] || itGuide.ko;

  panel.innerHTML = `
    <div class="transit-guide-hero-card">
      <div class="transit-hero-badge">${it.badge}</div>
      <h3 class="transit-hero-title">${it.title}</h3>
      <p class="transit-hero-intro">${it.intro}</p>
    </div>

    <!-- 파트 1: 고속열차 -->
    <div class="transit-part-section">
      <h4 class="transit-part-title">${it.part1_title}</h4>
      <div class="transit-cards-trio-grid">
        <div class="transit-spec-card">
          <div class="spec-card-head">
            <span class="spec-icon">🚄</span>
            <strong>${it.part1_sec1_title}</strong>
          </div>
          <div class="spec-card-body">${it.part1_sec1_desc}</div>
        </div>
        <div class="transit-spec-card highlight-card">
          <div class="spec-card-head">
            <span class="spec-icon">💺</span>
            <strong>${it.part1_sec2_title}</strong>
          </div>
          <div class="spec-card-body">${it.part1_sec2_desc}</div>
        </div>
        <div class="transit-spec-card">
          <div class="spec-card-head">
            <span class="spec-icon">📺</span>
            <strong>${it.part1_sec3_title}</strong>
          </div>
          <div class="spec-card-body">${it.part1_sec3_desc}</div>
        </div>
      </div>
    </div>

    <!-- 파트 2: 로마 시내 이동 -->
    <div class="transit-part-section">
      <h4 class="transit-part-title">${it.part2_title}</h4>
      <div class="transit-cards-trio-grid">
        <div class="transit-spec-card highlight-card">
          <div class="spec-card-head">
            <span class="spec-icon">🚕</span>
            <strong>${it.part2_sec1_title}</strong>
          </div>
          <div class="spec-card-body">${it.part2_sec1_desc}</div>
        </div>
        <div class="transit-spec-card warning-card">
          <div class="spec-card-head">
            <span class="spec-icon">🚌</span>
            <strong>${it.part2_sec2_title}</strong>
          </div>
          <div class="spec-card-body">${it.part2_sec2_desc}</div>
        </div>
        <div class="transit-spec-card">
          <div class="spec-card-head">
            <span class="spec-icon">🚇</span>
            <strong>${it.part2_sec3_title}</strong>
          </div>
          <div class="spec-card-body">${it.part2_sec3_desc}</div>
        </div>
      </div>
    </div>

    <!-- 파트 3: 결제 & 벌금 함정 -->
    <div class="transit-part-section">
      <h4 class="transit-part-title">${it.part3_title}</h4>
      <div class="transit-cards-duo-grid">
        <div class="transit-spec-card">
          <div class="spec-card-head">
            <span class="spec-icon">💳</span>
            <strong>${it.part3_sec1_title}</strong>
          </div>
          <div class="spec-card-body">${it.part3_sec1_desc}</div>
        </div>
        <div class="transit-spec-card alert-card">
          <div class="spec-card-head">
            <span class="spec-icon">🚨</span>
            <strong>${it.part3_sec2_title}</strong>
          </div>
          <div class="spec-card-body">${it.part3_sec2_desc}</div>
        </div>
      </div>
    </div>

    <!-- 요약 공식 배너 -->
    <div class="transit-formula-banner">
      <div class="formula-icon">💡</div>
      <div class="formula-content">
        <strong>${it.summary_formula_title}</strong>
        <p>${it.summary_formula_desc}</p>
      </div>
    </div>
  `;
}

function renderEuropeTransitGuide() {
  const panel = document.getElementById('europeTransitGuidePanel');
  const euGuide = (typeof EUROPE_TRANSIT_GUIDE_I18N !== 'undefined') ? EUROPE_TRANSIT_GUIDE_I18N : (typeof window !== 'undefined' ? window.EUROPE_TRANSIT_GUIDE_I18N : null);
  if (!panel || !euGuide) return;

  const lang = (typeof currentLang !== 'undefined' && currentLang) ? currentLang : 'ko';
  const eu = euGuide[lang] || euGuide.ko;

  panel.innerHTML = `
    <div class="transit-guide-hero-card">
      <div class="transit-hero-badge">${eu.badge}</div>
      <h3 class="transit-hero-title">${eu.title}</h3>
      <p class="transit-hero-intro">${eu.intro}</p>
    </div>

    <div class="europe-countries-grid">
      <!-- 1. 영국 -->
      <div class="transit-country-card">
        <h4 class="country-card-title">${eu.uk_title}</h4>
        <div class="country-tip-row">
          <strong>${eu.uk_sec1_title}</strong>
          <p>${eu.uk_sec1_desc}</p>
        </div>
        <div class="country-tip-row">
          <strong>${eu.uk_sec2_title}</strong>
          <p>${eu.uk_sec2_desc}</p>
        </div>
        <div class="country-tip-row">
          <strong>${eu.uk_sec3_title}</strong>
          <p>${eu.uk_sec3_desc}</p>
        </div>
      </div>

      <!-- 2. 프랑스 -->
      <div class="transit-country-card">
        <h4 class="country-card-title">${eu.fr_title}</h4>
        <div class="country-tip-row">
          <strong>${eu.fr_sec1_title}</strong>
          <p>${eu.fr_sec1_desc}</p>
        </div>
        <div class="country-tip-row warning-tip">
          <strong>${eu.fr_sec2_title}</strong>
          <p>${eu.fr_sec2_desc}</p>
        </div>
        <div class="country-tip-row">
          <strong>${eu.fr_sec3_title}</strong>
          <p>${eu.fr_sec3_desc}</p>
        </div>
      </div>

      <!-- 3. 네덜란드 -->
      <div class="transit-country-card">
        <h4 class="country-card-title">${eu.nl_title}</h4>
        <div class="country-tip-row">
          <strong>${eu.nl_sec1_title}</strong>
          <p>${eu.nl_sec1_desc}</p>
        </div>
        <div class="country-tip-row alert-tip">
          <strong>${eu.nl_sec2_title}</strong>
          <p>${eu.nl_sec2_desc}</p>
        </div>
      </div>

      <!-- 4. 독일 -->
      <div class="transit-country-card">
        <h4 class="country-card-title">${eu.de_title}</h4>
        <div class="country-tip-row alert-tip">
          <strong>${eu.de_sec1_title}</strong>
          <p>${eu.de_sec1_desc}</p>
        </div>
        <div class="country-tip-row">
          <strong>${eu.de_sec2_title}</strong>
          <p>${eu.de_sec2_desc}</p>
        </div>
      </div>

      <!-- 5. 오스트리아 -->
      <div class="transit-country-card">
        <h4 class="country-card-title">${eu.at_title}</h4>
        <div class="country-tip-row">
          <strong>${eu.at_sec1_title}</strong>
          <p>${eu.at_sec1_desc}</p>
        </div>
        <div class="country-tip-row">
          <strong>${eu.at_sec2_title}</strong>
          <p>${eu.at_sec2_desc}</p>
        </div>
        <div class="country-tip-row highlight-tip">
          <strong>${eu.at_sec3_title}</strong>
          <p>${eu.at_sec3_desc}</p>
        </div>
      </div>
    </div>

    <!-- 핵심 요약 치트시트 -->
    <div class="transit-cheat-sheet-box">
      <h4 class="cheat-sheet-title">${eu.core_summary_title}</h4>
      <div class="cheat-sheet-list">
        <div class="cheat-item"><span>💳</span> <div>${eu.core_summary_uk_nl}</div></div>
        <div class="cheat-item"><span>🎒</span> <div>${eu.core_summary_fr}</div></div>
        <div class="cheat-item"><span>🚨</span> <div>${eu.core_summary_de_at}</div></div>
      </div>
    </div>
  `;
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
window.currentLang = 'ko';
let currentPhraseFilter = 'ALL';


// ==============================================================
// 🇦🇪 DUBAI DATASET & PRICES EXTENSION INJECTION
// ==============================================================
(function () {
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
  try { localStorage.setItem('travel_user_currency', curr); } catch (e) { }
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
  try { localStorage.setItem('travel_user_fontscale', String(currentFontScale)); } catch (e) { }
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
  const isLuxury = tier === 'luxury' || tier === 'premium';
  const isEconomy = tier === 'economy' || tier === 'budget';
  const tierMultiplier = isLuxury ? 1.48 : (isEconomy ? 0.78 : 1.0);

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
    span.onclick = function () {
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
    btn.onclick = function () {
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
    btn.onclick = function () {
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
    span.onclick = function () {
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

  const dict = I18N_DICTIONARY[currentLang] || I18N_DICTIONARY['ko'];

  const createCard = (item) => {
    const card = document.createElement('div');
    card.className = 'photo-card';

    const slug = item.slug || (item.name ? item.name.toLowerCase().replace(/[^a-z0-9가-힣]+/g, '-').replace(/^-|-$/g, '') : '');
    card.id = 'landmark-card-' + slug;

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
          <div class="senior-access-block">
            <div class="access-head">
              <span class="access-icon">♿</span>
              <strong>${dict['lbl_senior_access'] || '보행 및 접근성 (팩트 검증)'}</strong>
            </div>
            <p class="access-desc">${cleanHangul(localizedSeniorAccess, currentLang)}</p>
            ${item.verifiedDate ? `<div class="verified-source-tag"><span class="verify-check">✓</span> <span>${item.verifiedDate}</span></div>` : ''}
          </div>
          <div class="dining-meta-list">
            <div class="dining-meta-item">
              <span class="meta-label">🎟 ${dict['lbl_admission_from'] || '입장료 (From)'}</span>
              <span style="font-weight:700;color:var(--accent);">${formatCardPrice(item.baseKrw, currentCurrency, false)}</span>
            </div>
            <div class="dining-meta-item">
              <span class="meta-label">⏰ ${dict['lbl_hours'] || '관람 시간'}</span>
              <span>${cleanHangul(localizedHours, currentLang)}</span>
            </div>
            <div class="dining-meta-item">
              <span class="meta-label">🎟 ${dict['lbl_ticket_tip'] || '예약 팁'}</span>
              <span>${cleanHangul(localizedTicketTip, currentLang)}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="dining-footer" style="display:flex;gap:8px;">
        <a href="${item.officialUrl}" target="_blank" rel="noopener noreferrer" class="map-link-btn" style="flex:1;text-align:center;background:var(--accent);color:white;border-color:var(--accent)" title="공식 티켓 및 최신 시간표 확인">
          🎟 ${dict['btn_official_tickets'] || (currentLang === 'en' ? 'Official Tickets / Access' : (currentLang === 'ja' ? '公式チケット / アクセス' : (currentLang === 'zh' ? '官方门票 / 无障碍' : '공식 예매처 / 접근성')))}
        </a>
        <a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item.mapQuery || item.name)}" target="_blank" rel="noopener noreferrer" class="map-link-btn" style="flex:1;text-align:center;">
          📍 ${dict['btn_map'] || 'Google Map'}
        </a>
      </div>
    `;
    return card;
  };

  // Populate Spain Grid (18 items)
  const spainGrid = document.getElementById('landmarksSpainGrid');
  if (spainGrid) {
    spainGrid.innerHTML = '';
    const spainItems = list.filter(x => x.region === '스페인');
    spainItems.forEach(item => spainGrid.appendChild(createCard(item)));
  }

  // Populate Portugal Grid (18 items)
  const portGrid = document.getElementById('landmarksPortugalGrid');
  if (portGrid) {
    portGrid.innerHTML = '';
    const portItems = list.filter(x => x.region === '포르투갈');
    portItems.forEach(item => portGrid.appendChild(createCard(item)));
  }

  // Populate Europe/Other Grid (37 items)
  const europeGrid = document.getElementById('landmarksEuropeGrid');
  if (europeGrid) {
    europeGrid.innerHTML = '';
    const europeItems = list.filter(x => x.region !== '스페인' && x.region !== '포르투갈' && x.region !== '이탈리아' && x.city !== '로마' && x.city !== '피렌체' && x.city !== '베네치아');
    europeItems.forEach(item => europeGrid.appendChild(createCard(item)));
  }

  // Fallback for globalLandmarksGrid
  const grid = document.getElementById('globalLandmarksGrid');
  if (grid) {
    grid.innerHTML = '';
    list.forEach(item => grid.appendChild(createCard(item)));
  }
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
let currentStartDateStr = "2026-11-05";
let currentDurationDays = 30;
let currentPacing = "relaxed";

// On script load, initialize from saved localStorage or STANDARD_TRIP_SCHEDULE
try {
  const savedStart = localStorage.getItem('travel_user_start_date');
  if (savedStart) currentStartDateStr = savedStart;
  const savedDur = localStorage.getItem('travel_user_duration');
  if (savedDur) currentDurationDays = parseInt(savedDur, 10);
  const savedReg = localStorage.getItem('travel_user_region');
  if (savedReg) currentActiveRegion = savedReg;
  const savedPace = localStorage.getItem('travel_user_pacing');
  if (savedPace) currentPacing = savedPace;
} catch (e) { }

function resetToStandardSchedule() {
  const std = (typeof STANDARD_TRIP_SCHEDULE !== 'undefined') ? STANDARD_TRIP_SCHEDULE : { startDate: "2026-11-05", totalDays: 30 };
  currentStartDateStr = std.startDate;
  currentDurationDays = std.totalDays || 30;

  const dateEl = document.getElementById('userStartDate');
  if (dateEl) dateEl.value = currentStartDateStr;
  const durEl = document.getElementById('userDurationSelect');
  if (durEl) durEl.value = String(currentDurationDays);

  try {
    localStorage.setItem('travel_user_start_date', currentStartDateStr);
    localStorage.setItem('travel_user_duration', String(currentDurationDays));
  } catch (e) { }

  applyPlanReconfiguration(false);

  const dict = (typeof I18N_DICTIONARY !== 'undefined' && I18N_DICTIONARY[currentLang]) || {};
  const msg = dict['toast_dates_reset'] || '🔄 표준 확정 일정(2026.11.05~12.04, 29박 30일)으로 초기화되었습니다.';
  if (typeof showToast === 'function') showToast(msg);
}
window.resetToStandardSchedule = resetToStandardSchedule;

function updateAppliedScheduleDisplay() {
  const elAppliedText = document.getElementById('appliedScheduleText');
  const elAppliedDesc = document.getElementById('appliedScheduleDesc');
  if (!elAppliedText) return;

  const sD = new Date(currentStartDateStr);
  const eD = new Date(sD);
  eD.setDate(sD.getDate() + (currentDurationDays - 1));
  const sStr = `${sD.getFullYear()}.${String(sD.getMonth() + 1).padStart(2, '0')}.${String(sD.getDate()).padStart(2, '0')}`;
  const eStr = `${eD.getFullYear()}.${String(eD.getMonth() + 1).padStart(2, '0')}.${String(eD.getDate()).padStart(2, '0')}`;
  const nights = Math.max(0, currentDurationDays - 1);

  if (currentLang === 'en') {
    elAppliedText.textContent = `${sStr} ~ ${eStr} (${currentDurationDays} Days · ${nights} Nights)`;
  } else if (currentLang === 'ja') {
    elAppliedText.textContent = `${sStr}〜${eStr}（${currentDurationDays}日間・${nights}泊）`;
  } else if (currentLang === 'zh') {
    elAppliedText.textContent = `${sStr} ~ ${eStr}（${currentDurationDays}天 · ${nights}晚）`;
  } else {
    elAppliedText.textContent = `${sStr} ~ ${eStr} (${currentDurationDays}일 · ${nights}박)`;
  }

  if (elAppliedDesc) {
    if (currentStartDateStr === '2026-11-05' && currentDurationDays === 30) {
      if (currentLang === 'en') {
        elAppliedDesc.textContent = 'Barcelona 6N (11.05–11.11) · Seville 11N (11.11–11.22) · Italy 12N (11.22–12.04)';
      } else if (currentLang === 'ja') {
        elAppliedDesc.textContent = 'バルセロナ6泊（11.05〜11.11）・セビリア11泊（11.11〜11.22）・イタリア12泊（11.22〜12.04）';
      } else if (currentLang === 'zh') {
        elAppliedDesc.textContent = '巴塞罗那 6晚 (11.05~11.11) · 塞维利亚 11晚 (11.11~11.22) · 意大利 12晚 (11.22~12.04)';
      } else {
        elAppliedDesc.textContent = '바르셀로나 6박(11.05~11.11) · 안달루시아 11박(11.11~11.22) · 이탈리아 12박(11.22~12.04) [9대 숙소 100% 확정]';
      }
    } else {
      if (currentLang === 'en') {
        elAppliedDesc.textContent = 'Custom dates applied · Click [Reset to Standard Schedule] to restore standard itinerary';
      } else if (currentLang === 'ja') {
        elAppliedDesc.textContent = 'カスタム日程適用中 · [標準日程にリセット] で標準行程に復元できます';
      } else if (currentLang === 'zh') {
        elAppliedDesc.textContent = '自定义日期生效中 · 点击【重置为标准行程】可恢复标准行程';
      } else {
        elAppliedDesc.textContent = '사용자 맞춤 설정 기간 적용 중 · 표준 일정 복원을 원하시면 [표준 일정으로 초기화]를 누르세요';
      }
    }
  }
}
window.updateAppliedScheduleDisplay = updateAppliedScheduleDisplay;

function applyPlanReconfiguration(isUserTriggered = false) {

  const regEl = document.getElementById('userRegionSelect');
  const dateEl = document.getElementById('userStartDate');
  const durEl = document.getElementById('userDurationSelect');
  const pacEl = document.getElementById('userPacingSelect');
  const partyEl = document.getElementById('userPartySize');
  const tierEl = document.getElementById('userTierSelect');

  if (!regEl || !dateEl) return;

  currentActiveRegion = regEl.value;
  currentStartDateStr = dateEl.value || "2026-11-05";
  currentDurationDays = durEl ? parseInt(durEl.value, 10) : 30;
  currentPacing = pacEl ? pacEl.value : "relaxed";
  const partySize = partyEl ? parseInt(partyEl.value, 10) : 3;
  let tier = tierEl ? tierEl.value : "standard";
  if (tier === 'budget') tier = 'economy';
  if (tier === 'premium') tier = 'luxury';

  try {
    localStorage.setItem('travel_user_region', currentActiveRegion);
    localStorage.setItem('travel_user_duration', String(currentDurationDays));
    localStorage.setItem('travel_user_start_date', currentStartDateStr);
    localStorage.setItem('travel_user_party', String(partySize));
    localStorage.setItem('travel_user_tier', tier);
    localStorage.setItem('travel_user_pacing', currentPacing);
  } catch (e) { }

  updateAppliedScheduleDisplay();

  const planMeta = REGIONAL_PLANS[currentActiveRegion] || REGIONAL_PLANS["IBERIA"];
  const dict = I18N_DICTIONARY[currentLang] || I18N_DICTIONARY['ko'];

  // 동적 예산 실시간 계산
  const budgetData = calculateDynamicBudget(currentActiveRegion, currentDurationDays, partySize, tier);
  const formattedGrandTotal = formatMoney(budgetData.total, currentCurrency);
  if (typeof renderFestivalsAndNightViews === "function") renderFestivalsAndNightViews();

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
  const g1 = document.getElementById('timelineGrid1');
  const g2 = document.getElementById('timelineGrid2');
  const g3 = document.getElementById('timelineGrid3');

  if (!timelineGrid && !g1 && !g2 && !g3) return;

  if (timelineGrid) timelineGrid.innerHTML = '';
  if (g1) g1.innerHTML = '';
  if (g2) g2.innerHTML = '';
  if (g3) g3.innerHTML = '';


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

    const isInitiallyExpanded = window.allTimelineDaysExpanded || false;
    const expandBtnLabel = isInitiallyExpanded
      ? (dict['timeline_collapse_detail'] || '세부 일정 접기 ▲')
      : (dict['timeline_expand_detail'] || '세부 일정 펼치기 ▼');

    card.innerHTML = `
      <div class="day-meta">
        <div class="day-num">DAY ${slotIdx + 1}</div>
        <div class="day-date">${dateFormatted} (${dow})</div>
        <span class="city-tag">${cleanHangul(localizedCity, currentLang)}</span>
        <div class="timeline-drag-handle" title="${currentLang === 'en' ? 'Drag to reorder day schedule' : (currentLang === 'ja' ? 'ドラッグして日程の順序を変更' : (currentLang === 'zh' ? '拖拽调整日程顺序' : '드래그하여 일정 순서 변경'))}">${currentLang === 'en' ? '⋮⋮ Drag to reorder' : (currentLang === 'ja' ? '⋮⋮ ドラッグ移動' : (currentLang === 'zh' ? '⋮⋮ 拖拽排序' : '⋮⋮ 드래그 이동'))}</div>
        ${dItem.isTransfer ? `<div class="transfer-badge">${transferBadgeLabel}</div>` : ''}
      </div>
      <div class="day-body">
        <div class="day-header-summary">
          <h3>${cleanHangul(localizedTheme, currentLang)} ${eventBadges}</h3>
          <button type="button" class="btn-toggle-day-detail" id="btnToggleDay-${slotIdx}" onclick="toggleDayDetail(${slotIdx}, this)" aria-expanded="${isInitiallyExpanded}" title="${dict['timeline_toggle_title'] || (currentLang === 'en' ? 'Check 1.5 spots/day siesta daily schedule' : (currentLang === 'ja' ? '1日1.5スポット シエスタ詳細日程を確認' : (currentLang === 'zh' ? '查看每日1.5景点午休详细日程' : '1일 1.5스팟 시에스타 세부 일정 확인')))}">
            <span class="toggle-text">${expandBtnLabel}</span>
          </button>
        </div>
        <div class="day-detail-collapse" id="dayDetail-${slotIdx}" style="display:${isInitiallyExpanded ? 'block' : 'none'};">
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
      </div>
    `;
    // Distribute to 10-day book pages (preserves event listeners)
    const dayNum = slotIdx + 1;
    let appendedToBook = false;
    if (dayNum <= 10 && g1) {
      g1.appendChild(card);
      appendedToBook = true;
    } else if (dayNum > 10 && dayNum <= 20 && g2) {
      g2.appendChild(card);
      appendedToBook = true;
    } else if (dayNum > 20 && g3) {
      g3.appendChild(card);
      appendedToBook = true;
    }

    if (timelineGrid) {
      timelineGrid.appendChild(appendedToBook ? card.cloneNode(true) : card);
    }

  }
}

window.applyPlanReconfiguration = applyPlanReconfiguration;

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
    if (dict[key] !== undefined) {
      el.innerHTML = dict[key];
    }
  });

  // data-i18n-title 요소 툴팁 속성 갱신
  document.querySelectorAll('[data-i18n-title]').forEach(el => {
    const key = el.getAttribute('data-i18n-title');
    if (dict[key] !== undefined) {
      el.setAttribute('title', dict[key]);
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

  // 7) 플래너 드롭다운 및 적용 기간 바 갱신
  renderPlannerDropdownOptions();
  if (typeof updateAppliedScheduleDisplay === 'function') updateAppliedScheduleDisplay();
  if (typeof renderItalyCityGuide === 'function') renderItalyCityGuide(lang);

  // 8) 프리셋 바 및 필터 탭 갱신
  renderDiningPresets();
  renderLandmarkFilterTabs();
  renderPhraseFilterTabs();
  renderAiSearchPresets();

  // 9) 동적 섹션 전체 재렌더링
  applyPlanReconfiguration(false);
  renderGlobalDining();
  renderGlobalLandmarks();
  if (typeof renderSeniorDistrictRoutes === "function") renderSeniorDistrictRoutes(lang);
  if (typeof renderItalyCityGuide === "function") renderItalyCityGuide(lang);
  if (typeof renderMasterGourmetGuide === "function") renderMasterGourmetGuide(lang, window.masterGourmetActiveCountry || 'all');

  // 14-B) Synchronize Floating Book Badge & Mobile TOC with selected language
  const actChap = (typeof window !== "undefined" && window.currentActiveChapter) || 'chapter-overview';
  const pageIdx = (typeof window !== "undefined" && window.currentBookPage && window.currentBookPage[actChap]) || 0;
  if (typeof goToBookPage === 'function') {
    goToBookPage(actChap, pageIdx, false);
  }
  const curDict = (typeof I18N_DICTIONARY !== 'undefined' && I18N_DICTIONARY[lang]) || {};
  const curChapNames = {
    'chapter-overview': curDict['chapter_name_overview'] || (lang === 'en' ? 'Ch. 1 Trip Overview' : (lang === 'ja' ? '第1章 旅行概要' : (lang === 'zh' ? '第1章 旅行概览' : '01. 여행 개요'))),
    'chapter-planner': curDict['chapter_name_planner'] || (lang === 'en' ? 'Ch. 2 Itinerary Planner' : (lang === 'ja' ? '第2章 日程プランナー' : (lang === 'zh' ? '第2章 行程规划' : '02. 일정 플래너'))),
    'chapter-guide': curDict['chapter_name_guide'] || (lang === 'en' ? 'Ch. 3 Regional Guide' : (lang === 'ja' ? '第3章 地域ガイド' : (lang === 'zh' ? '第3章 区域指南' : '03. 지역 가이드'))),
    'chapter-festivals': curDict['chapter_name_festivals'] || (lang === 'en' ? 'Ch. 4 Festivals & Nightlife' : (lang === 'ja' ? '第4章 祭り＆夜景' : (lang === 'zh' ? '第4章 节日与夜景' : '04. 축제 & 야경'))),
    'chapter-practical': curDict['chapter_name_practical'] || (lang === 'en' ? 'Ch. 5 Practical Info' : (lang === 'ja' ? '第5章 旅行実用情報' : (lang === 'zh' ? '第5章 实用旅行信息' : '05. 여행 실용정보')))
  };
  const tocTitleEl = document.getElementById('mobileTocTitleText');
  if (tocTitleEl) {
    const prefix = (lang === 'en' ? 'Guidebook TOC: ' : (lang === 'ja' ? 'ガイドブック目次: ' : (lang === 'zh' ? '指南目录: ' : '가이드북 목차: ')));
    tocTitleEl.textContent = prefix + (curChapNames[actChap] || '');
  }
  const floatBadgeEl = document.getElementById('floatBookBadge');
  if (floatBadgeEl) {
    const maxP = (typeof CHAPTER_PAGE_COUNTS !== 'undefined' && CHAPTER_PAGE_COUNTS[actChap]) || 3;
    floatBadgeEl.textContent = '📖 ' + (curChapNames[actChap] || '') + ' · P. ' + (pageIdx + 1) + ' / ' + maxP;
  }
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
  try { localStorage.setItem('travel_user_lang', lang); } catch (e) { }
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

if (typeof window !== 'undefined') { window.switchLanguage = switchLanguage; }

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
    icsLines.push(`UID:slowtravel-${currentActiveRegion}-${i + 1}-${dStr}@familytravel.com`);
    icsLines.push(`DTSTAMP:${dStr}T090000Z`);
    icsLines.push(`DTSTART;VALUE=DATE:${dStr}`);
    icsLines.push(`SUMMARY:[Day ${i + 1}] ${dItem.city} - ${dItem.theme}`);
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
  showToast(dict['toast_cal_download'] || '📅 맞춤 캘린더(.ics) 다운로드가 완료되었습니다!'); window.downloadCustomCalendarIcs = downloadCustomCalendarIcs; window.downloadIcsCalendar = downloadCustomCalendarIcs;
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
  if (typeof renderSeniorDistrictRoutes === "function") renderSeniorDistrictRoutes(currentLang);
  if (typeof renderMasterGourmetGuide === "function") renderMasterGourmetGuide(currentLang, 'all');
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
      const qText = (typeof cleanHangul === 'function') ? cleanHangul(c.query || '', lang) : (c.query || '');
      const lText = (typeof cleanHangul === 'function') ? cleanHangul(c.label || '', lang) : (c.label || '');
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
      const localizedCity = (typeof cleanHangul === 'function') ? cleanHangul(d.city, lang) : d.city;
      const localizedDish = (dInfo.dishTitle && dInfo.dishTitle[lang]) || ((typeof cleanHangul === 'function') ? cleanHangul(d.dishName || d.signature, lang) : (d.dishName || d.signature));
      const localizedSeniorTip = (dInfo.seniorTip && dInfo.seniorTip[lang]) || ((typeof cleanHangul === 'function') ? cleanHangul(d.seniorTip, lang) : d.seniorTip);

      html += `
        <div class="chat-card-recommend" style="margin-top:8px;">
          <div class="chat-card-img" style="background-image:url('${d.photo || ''}')">
            <span class="chat-card-badge">${localizedCity}</span>
          </div>
          <div class="chat-card-body">
            <div class="chat-card-title">${localizedName}</div>
            <div class="chat-card-sub">${localizedDish}</div>
            <div class="chat-card-tip">👵 ${tipLabel}: ${localizedSeniorTip}</div>
            <div class="chat-card-footer">
              <span class="chat-card-price">${price}</span>
              ${d.mapUrl ? `<a href="${d.mapUrl}" target="_blank" rel="noopener noreferrer" class="chat-card-btn">${mapLabel} ➔</a>` : ''}
            </div>
          </div>
        </div>
      `;
    });
    return html;
  }

  // ----------------------------------------------------
  // City & Country Context Helpers
  // ----------------------------------------------------
  const hasBarcelona = ['barcelona', 'bcn', '바르셀로나', 'バルセロナ', '巴塞罗那'].some(w => q.includes(w) || cleanQ.includes(w));
  const hasMadrid = ['madrid', '마드리드', 'マドリード', '马德里'].some(w => q.includes(w) || cleanQ.includes(w));
  const hasSeville = ['seville', 'sevilla', '세비야', 'セビリア', '塞维利亚'].some(w => q.includes(w) || cleanQ.includes(w));
  const hasGranada = ['granada', '그라나다', 'グラナダ', '格拉纳达'].some(w => q.includes(w) || cleanQ.includes(w));
  const hasCordoba = ['cordoba', 'córdoba', '코르도바', 'コルドバ', '科尔多瓦'].some(w => q.includes(w) || cleanQ.includes(w));
  const hasMalaga = ['malaga', 'málaga', '말라가', 'マラガ', '马拉加'].some(w => q.includes(w) || cleanQ.includes(w));
  const hasLisbon = ['lisbon', 'lisboa', '리스본', 'リスボン', '里斯本'].some(w => q.includes(w) || cleanQ.includes(w));
  const hasPorto = ['porto', '포르투', 'ポルト', '波尔图'].some(w => q.includes(w) || cleanQ.includes(w));
  const hasSintra = ['sintra', '신트라', 'シントラ', '辛特拉'].some(w => q.includes(w) || cleanQ.includes(w));
  const hasDubai = ['dubai', 'uae', 'emirates', '두바이', '아랍에미리트', 'ドバイ', '迪拜', '阿联酋'].some(w => q.includes(w) || cleanQ.includes(w));
  const hasAbuDhabi = ['abu dhabi', 'abudhabi', '아부다비', 'アブダビ', '阿布扎比'].some(w => q.includes(w) || cleanQ.includes(w));
  const hasRome = ['rome', 'roma', '로마', 'ローマ', '罗马'].some(w => q.includes(w) || cleanQ.includes(w));
  const hasFlorence = ['florence', 'firenze', '피렌체', 'フィレンツェ', '佛罗伦萨'].some(w => q.includes(w) || cleanQ.includes(w));
  const hasNaples = ['napoli', 'naples', '나폴리', 'ナポリ', '那不勒斯'].some(w => q.includes(w) || cleanQ.includes(w));
  const hasVenice = ['venice', 'venezia', '베네치아', '베니스', 'ベネチア', '威尼斯'].some(w => q.includes(w) || cleanQ.includes(w));
  const hasMilan = ['milan', 'milano', '밀라노', 'ミラノ', '米兰'].some(w => q.includes(w) || cleanQ.includes(w));
  const hasCapri = ['capri', '카프리', 'カプリ', '卡普里'].some(w => q.includes(w) || cleanQ.includes(w));

  const isItaly = ['italy', 'italia', '이탈리아', '이태리', 'イタリア', '意大利'].some(w => q.includes(w) || cleanQ.includes(w)) || hasRome || hasFlorence || hasNaples || hasVenice || hasMilan || hasCapri;
  const isPortugal = ['portugal', 'algarve', '포르투갈', '알가르베', 'ポルトガル', '葡萄牙'].some(w => q.includes(w) || cleanQ.includes(w)) || hasLisbon || hasPorto || hasSintra;
  const isDubai = ['dubai', 'uae', 'emirates', '두바이', '아랍에미리트', 'ドバイ', '迪拜', '阿联酋', '아부다비', 'abu dhabi', 'アブダビ', '阿布扎比'].some(w => q.includes(w) || cleanQ.includes(w)) || hasDubai || hasAbuDhabi;
  const isSpain = ['spain', 'andalusia', '스페인', '안달루시아', 'スペイン', '西班牙'].some(w => q.includes(w) || cleanQ.includes(w)) || hasBarcelona || hasMadrid || hasSeville || hasGranada || hasCordoba || hasMalaga;

  const hasRouteKeyword = [
    '어떻게 가', '가는 법', '이동법', '이동 방법', '이동', '교통', '루트', '경로', '기차', '비행기', '버스', '렌페',
    'how to get', 'how do i get', 'how to travel', 'how to go', 'transit', 'route', 'train', 'flight', 'bus', 'direction',
    '行き方', '移動方法', '移動', '交通', 'ルート', 'アクセス', '列車', '飛行機', 'バス',
    '怎么走', '怎么去', '交通方式', '交通', '路线', '高铁', '火车', '飞机', '大巴'
  ].some(w => q.includes(w) || cleanQ.includes(w));

  // ----------------------------------------------------
  // Intent 0: Polite Courtesy & Small Talk
  // ----------------------------------------------------
  const isToilet = [
    '화장실', '해우소', '변기', '골든 루틴', '골든루틴', '골든 팁',
    '사그라다 파밀리아 화장실', '구엘 공원 화장실', '구엘공원 화장실',
    '알함브라 화장실', '나스르 궁전 화장실', '나스르 화장실', '카를로스 5세 화장실',
    '알카사르 화장실', '대성당 화장실', '세비야 대성당 화장실',
    '바티칸 화장실', '시스티나 화장실', '시스티나 예배당 화장실',
    '콜로세움 화장실', '포로 로마노 화장실', '우피치 화장실', '우피치 미술관 화장실',
    '백화점 화장실', '엘 코르테 잉글레스', '엘코르테잉글레스', '변기 커버', '변기 시트',
    '영수증 코드', '영수증 비밀번호', 'toilet', 'restroom', 'washroom', 'bathroom',
    'wc', 'water closet', 'lavatory', 'bano', 'baño', 'bagno', 'toilette',
    'donde esta el bano', 'donde esta el baño', "dov'e il bagno", "dov'è il bagno",
    'where is the toilet', 'where is the restroom', 'where is the bathroom',
    'golden routine', 'toilet routine', 'toilet tips', 'toilet seat', 'toilet code',
    'sagrada familia toilet', 'alhambra toilet', 'nasrid toilet', 'vatican toilet',
    'sistine chapel toilet', 'colosseum toilet', 'uffizi toilet',
    'トイレ', 'お手洗い', '化粧室', 'サグラダファミリア トイレ', 'アルハンブラ トイレ',
    'ナスル宮殿 トイレ', 'バチカン トイレ', 'システィーナ トイレ', 'コロッセオ トイレ',
    'ウフィツィ トイレ', '便座', 'トイレ 暗証番号',
    '洗手间', '厕所', '卫生间', '如厕', '黄金法则', '黄金守则', '圣家堂 厕所', '圣家堂 洗手间',
    '阿尔罕布拉宫 洗手间', '纳斯瑞德 洗手间', '纳斯尔 洗手间', '梵蒂冈 洗手间', '西斯廷 洗手间',
    '斗兽场 洗手间', '乌菲兹 洗手间', '马桶垫', '马桶圈', '小票 密码', '百货 洗手间'
  ].some(w => q.includes(w) || cleanQ.includes(w));

  const isThanks = ['고마워', '고맙', '감사', '땡큐', 'thank', 'thanks', 'thx', 'appreciate', 'ありがとう', '感謝', '助かった', 'サンキュー', '谢谢', '感谢', '多谢'].some(w => q.includes(w));
  if (isThanks) {
    const chips = [
      { query: '30일 마스터 플래너 요약해줘', label: '📅 30일 마스터 플래너' },
      { query: '빠에야 피자 말고 다른 음식 추천', label: '🍽️ 빠에야·피자 외 미식' },
      { query: '식당 필수 생존 회화 알려줘', label: '🗣️ 식당 필수 회화' }
    ];
    if (lang === 'ja') return 'どういたしまして！😊 お役に立てて何よりです。旅の計画や現地での疑問があれば、いつでもお気軽にご質問ください！' + renderFollowupChips(chips);
    if (lang === 'en') return 'You are very welcome! 😊 Glad I could help. Feel free to ask anytime if you need more tips about hotels, transit, or hidden gourmet spots!' + renderFollowupChips(chips);
    if (lang === 'zh') return '不客气！非常高兴能帮到您。😊 如果您在行程规划或旅途中还有任何疑问，随时都可以向我提问！' + renderFollowupChips(chips);
    return '천만에요! 도움이 되어서 정말 기쁩니다. 😊 여행 준비하시면서 더 궁금한 숙소, 교통, 숨은 미식 정보가 생기면 언제든 편하게 물어보세요!' + renderFollowupChips(chips);
  }

  const isGreeting = ['안녕', '하이', '반가', 'hello', 'hi', 'hey', 'good morning', 'good afternoon', 'こんにちは', 'はじめまして', 'こんばん', '你好', '您好'].some(w => q.includes(w));
  if (isGreeting && q.length < 15) {
    const chips = [
      { query: '30일 마스터 플래너 요약해줘', label: '📅 30일 플래너 & 숙소' },
      { query: '빠에야 피자 말고 다른 음식 추천', label: '🍽️ 대표 미식 12선' },
      { query: '식당 필수 생존 회화 알려줘', label: '🗣️ 24선 필수 회화' }
    ];
    if (lang === 'ja') return 'こんにちは！✈️ <strong>スペイン・イタリア・ポルトガル・ドバイ家族旅行専属AIコンシェルジュ</strong>です。30日マスタープランナー、名物グルメ、交通公式、大聖堂の服装など何でもご案内します！' + renderFollowupChips(chips);
    if (lang === 'en') return 'Hello! ✈️ I am your dedicated <strong>Spain · Italy · Portugal · Dubai Family Travel AI Companion</strong>. Ask me anything about the 30-day master planner, confirmed hotels, 6 transit formulas, signature gourmet, or cathedral dress codes!' + renderFollowupChips(chips);
    if (lang === 'zh') return '您好！✈️ 我是您的<strong>西班牙 · 意大利 · 葡萄牙 · 迪拜家庭旅行AI向导</strong>。无论关于30天大师规划师、9大确定酒店、6大交通公式、特色招牌美食还是大教堂着装规定，随时为您解答！' + renderFollowupChips(chips);
    return '안녕하세요! ✈️ <strong>스페인 · 이탈리아 · 포르투갈 · 두바이 가족 여행 전담 로컬 AI 가이드</strong>입니다. 30일 마스터 플래너, 9대 확정 숙소, 6대 교통 공식, 빠에야·피자 외 시그니처 미식, 성당 복장 규정 등 궁금하신 점을 편하게 질문해 보세요!' + renderFollowupChips(chips);
  }

  const isWho = ['누구', '너는', '뭐하는', 'who are you', 'what are you', 'あなたは誰', '何者', '你是谁', '你的功能'].some(w => q.includes(w));
  if (isWho && q.length < 20) {
    const chips = [
      { query: '30일 마스터 플래너 요약해줘', label: '📅 30일 마스터 플래너' },
      { query: '빠에야 피자 말고 다른 음식 추천', label: '🍽️ 빠에야·피자 외 미식' },
      { query: '이탈리아 기차 예매 팁', label: '🚄 이탈리아 기차 팁' }
    ];
    if (lang === 'ja') return '私はこのガイドブックに内蔵された<strong>ローカルAI旅行コンシェルジュ</strong>です。外部サーバー通信なしで、30日マスタープランナー、9大確定ホテル、6大黄金交通公式、7都市12大名物料理、24選必須サバイバル会話、大聖堂服装規定など、厳選された現地情報を即座にご案内します！' + renderFollowupChips(chips);
    if (lang === 'en') return 'I am your private <strong>Local Travel AI Companion</strong> built into this guidebook. Operating 100% offline without external API latency, I provide instant guidance on the 30-Day Master Planner (9 confirmed hotels & 6 transit formulas), 12 signature dishes, 24 survival phrases, and senior safety!' + renderFollowupChips(chips);
    if (lang === 'zh') return '我是内置于本旅行指南的<strong>专属本地AI旅行助手</strong>。无需连接外部服务器，完全基于离线精选知识库为您提供30天大师规划师、9大确定酒店、6大黄金交通公式、12大特色招牌菜、24句生存日常口语以及大教堂着装避坑贴士！' + renderFollowupChips(chips);
    return '저는 본 가이드북에 내장된 <strong>가족 여행 전담 로컬 AI 가이드</strong>입니다. 외부 API 통신 없이 브라우저 내 엄선된 지식(30일 마스터 플래너, 9대 확정 숙소, 6대 교통 공식, 7대 도시 12대 대체불가 미식, 24선 필수 서바이벌 회화, 성당 복장 규정, 15대 야경 명소, 실시간 맞춤 예산)을 바탕으로 즉각 답변해 드립니다!' + renderFollowupChips(chips);
  }


  // ====================================================
  // 1. 30-DAY MASTER PLANNER (9대 확정 숙소 & 6대 교통 공식)
  // ====================================================
  const isMasterPlanner = [
    '마스터 플래너', '30일 플래너', '30일 일정', '확정 숙소', '호텔 9선', '숙소 9선', '9대 숙소', '교통 공식', '이동 공식', '6대 교통', '6대 이동', '숙소 리스트',
    'master planner', '30-day planner', '30 day itinerary', 'confirmed hotels', '9 hotels', 'hotel list', '6 transit formulas', 'golden transit formulas', '30-day master',
    'マスタープランナー', '30日プランナー', '30日間日程', '確定ホテル', '9大ホテル', '宿泊先一覧', '6大交通公式', '移動公式',
    '大师规划师', '30天规划', '30天行程', '9大确定酒店', '推荐住宿', '6大交通公式', '城市间交通公式'
  ].some(w => q.includes(w) || cleanQ.includes(w));

  if (isMasterPlanner) {
    const chips = [
      { query: '빠에야 피자 말고 다른 음식 추천', label: '🍽️ 빠에야·피자 외 미식' },
      { query: '식당과 여행 필수 서바이벌 회화', label: '🗣️ 24선 필수 회화' },
      { query: '나폴리에서 피렌체 이동법', label: '🚆 나폴리 ➔ 피렌체' }
    ];

    let res = '';
    if (lang === 'ja') {
      res = `
        📅 <strong>スペイン＆イタリア 30日マスタープランナー総まとめ</strong>:<br><br>
        ご両親の疲労を最小限に抑え、旅行の効率を最大化した<strong>9大確定ホテル＆6大黄金交通公式</strong>の概要です:<br><br>

        <div style="background:#fdfcf9;border:1.5px solid #2d6a4f;padding:12px 14px;border-radius:10px;margin-bottom:8px;">
          <strong style="color:#1b4332;">🏨 9大確定ホテル（駅近・平坦な立地・エレベーター完備）</strong>:<br>
          1️⃣ <strong>バルセロナ:</strong> H10 カサ・ミモザ 4星（カサ・ミラ徒歩1分の平坦な並木道）<br>
          2️⃣ <strong>セビリア:</strong> ホテル・フェルナンド3世 4星（サンタクルス街の平地、静かな旧市街）<br>
          3️⃣ <strong>マドリード:</strong> ペスターナ・プラザ・マヨール 4星（マヨール広場直結、市内散策に最適）<br>
          4️⃣ <strong>ナポリ:</strong> グランド・ホテル・オリエンテ 4星（トレド通り徒歩3分、安心の治安環境）<br>
          5️⃣ <strong>フィレンツェ:</strong> グランド・ホテル・バリオーニ 4星（SMN駅から200m、絶景ルーフトップテラス）<br>
          6️⃣ <strong>ローマ:</strong> ホテル・インディゴ・ローマ - セント・ジョージ 5星（ナヴォーナ広場徒歩圏、ジュリア通り）<br>
          7️⃣ <strong>グラナダ:</strong> ホテル・アルハンブラ・パレス 5星（坂道を登らず宮殿直結）<br>
          8️⃣ <strong>マラガ:</strong> ACホテル・マラガ・パラシオ 4星（港と大聖堂を一望）<br>
          9️⃣ <strong>ベネチア:</strong> ホテル・ダニエリ / サンタ・キアラ（大運河沿い・水上バス至近）
        </div>

        <div style="background:#f0fdf4;border-left:4px solid #16a34a;padding:12px 14px;border-radius:0 10px 10px 0;margin-bottom:8px;">
          <strong style="color:#15803d;">🚆 6大黄金交通公式（空港での疲労と荷物移動を最小化）</strong>:<br>
          • <strong>バルセロナ ➔ マドリード:</strong> iryo / Renfe AVE 高速鉄道 直通2時間30分<br>
          • <strong>マドリード ➔ セビリア:</strong> Renfe AVE 高速鉄道 直通2時間40分<br>
          • <strong>マドリード ➔ ナポリ:</strong> イベリア航空直行便 2時間35分（ローマ乗継ぎ不要で体力温存）<br>
          • <strong>ナポリ ➔ フィレンツェ:</strong> Italo（イタロ）ビジネスクラスPrima直通 2時間50分<br>
          • <strong>フィレンツェ ➔ ローマ:</strong> Frecciarossa 高速鉄道 直通1時間35分<br>
          • <strong>ローマ ↔ ナポリ（日帰り）:</strong> 高速鉄道 直通1時間10分
        </div>

        <div style="margin-top:10px;">
          <button type="button" class="chat-quick-chip" onclick="switchGuidebookChapter('chapter-planner'); goToBookPage('chapter-planner', 0); setTimeout(() => { const el = document.getElementById('plannerMasterSummaryCard'); if(el) el.scrollIntoView({behavior:'smooth'}); }, 120);" style="background:#1b4332;color:#fff;font-weight:700;padding:8px 14px;border-radius:20px;border:none;cursor:pointer;display:inline-flex;align-items:center;gap:6px;box-shadow:0 2px 6px rgba(0,0,0,0.15);">
            <span>📅</span> <span>[第2章] マスタープランナー5大まとめカード全体を見る ➔</span>
          </button>
        </div>
      `;
    } else if (lang === 'en') {
      res = `
        📅 <strong>Spain & Italy 30-Day Master Planner Overview</strong>:<br><br>
        A senior-optimized itinerary summary featuring <strong>9 Confirmed Accommodations & 6 Golden Transit Formulas</strong> to minimize fatigue and airport transfers:<br><br>

        <div style="background:#fdfcf9;border:1.5px solid #2d6a4f;padding:12px 14px;border-radius:10px;margin-bottom:8px;">
          <strong style="color:#1b4332;">🏨 9 Confirmed Accommodations (Station Proximity, Flat Walking, Elevators)</strong>:<br>
          1️⃣ <strong>Barcelona:</strong> H10 Casa Mimosa 4★ (1 min walk to Casa Milà on flat, paved boulevard)<br>
          2️⃣ <strong>Seville:</strong> Hotel Fernando III 4★ (Flat Santa Cruz historic district, senior elevator)<br>
          3️⃣ <strong>Madrid:</strong> Pestana Plaza Mayor 4★ (Right on Plaza Mayor, central courtyard elevator)<br>
          4️⃣ <strong>Naples:</strong> Grand Hotel Oriente 4★ (3 mins walk to Toledo Metro, flat shopping promenade)<br>
          5️⃣ <strong>Florence:</strong> Grand Hotel Baglioni 4★ (200m from Santa Maria Novella Station, panoramic terrace)<br>
          6️⃣ <strong>Rome:</strong> Hotel Indigo Rome - St. George 5★ (Via Giulia, flat walk to Piazza Navona & Vatican)<br>
          7️⃣ <strong>Granada:</strong> Hotel Alhambra Palace 5★ (Direct Alhambra access without steep hill climb)<br>
          8️⃣ <strong>Malaga:</strong> AC Hotel Málaga Palacio 4★ (Cathedral & Mediterranean harbor panorama)<br>
          9️⃣ <strong>Venice:</strong> Hotel Danieli / Santa Chiara (Grand Canal & water bus accessibility)
        </div>

        <div style="background:#f0fdf4;border-left:4px solid #16a34a;padding:12px 14px;border-radius:0 10px 10px 0;margin-bottom:8px;">
          <strong style="color:#15803d;">🚆 6 Golden Transit Formulas (Minimizing Airport Fatigue)</strong>:<br>
          • <strong>Barcelona ➔ Madrid:</strong> iryo / Renfe AVE high-speed train in 2 hrs 30 mins direct<br>
          • <strong>Madrid ➔ Seville:</strong> Renfe AVE high-speed train in 2 hrs 40 mins direct<br>
          • <strong>Madrid ➔ Naples:</strong> Iberia direct flight in 2 hrs 35 mins (spares land transit fatigue from Rome)<br>
          • <strong>Naples ➔ Florence:</strong> Italo Prima business class direct in 2 hrs 50 mins<br>
          • <strong>Florence ➔ Rome:</strong> Frecciarossa high-speed rail in 1 hr 35 mins direct<br>
          • <strong>Rome ↔ Naples (Day Trip):</strong> High-speed train in just 1 hr 10 mins direct
        </div>

        <div style="margin-top:10px;">
          <button type="button" class="chat-quick-chip" onclick="switchGuidebookChapter('chapter-planner'); goToBookPage('chapter-planner', 0); setTimeout(() => { const el = document.getElementById('plannerMasterSummaryCard'); if(el) el.scrollIntoView({behavior:'smooth'}); }, 120);" style="background:#1b4332;color:#fff;font-weight:700;padding:8px 14px;border-radius:20px;border:none;cursor:pointer;display:inline-flex;align-items:center;gap:6px;box-shadow:0 2px 6px rgba(0,0,0,0.15);">
            <span>📅</span> <span>[Chapter 2] View Full Master Planner Summary Cards ➔</span>
          </button>
        </div>
      `;
    } else if (lang === 'zh') {
      res = `
        📅 <strong>西班牙与意大利 30天大师规划师全景精要</strong>:<br><br>
        专为父母家庭旅行量身打造，大幅降低奔波疲劳的<strong>9大确定住宿酒店与6大黄金城际交通公式</strong>：<br><br>

        <div style="background:#fdfcf9;border:1.5px solid #2d6a4f;padding:12px 14px;border-radius:10px;margin-bottom:8px;">
          <strong style="color:#1b4332;">🏨 9大确定住宿酒店（枢纽黄金地段·平地无障碍·电梯齐全）</strong>：<br>
          1️⃣ <strong>巴塞罗那：</strong> H10 Casa Mimosa 四星级（米拉之家步行1分钟平坦林荫大道）<br>
          2️⃣ <strong>塞维利亚：</strong> Hotel Fernando III 四星级（圣十字区平坦石板路，舒适电梯）<br>
          3️⃣ <strong>马德里：</strong> Pestana Plaza Mayor 四星级（紧邻马约尔广场，老城核心）<br>
          4️⃣ <strong>那不勒斯：</strong> Grand Hotel Oriente 四星级（托莱多地铁站步行3分钟，治安良好繁华街区）<br>
          5️⃣ <strong>佛罗伦萨：</strong> Grand Hotel Baglioni 四星级（距SMN火车站仅200米，历史全景露台）<br>
          6️⃣ <strong>罗马：</strong> Hotel Indigo Rome - St. George 五星级（朱利亚大道，平步直达纳沃纳广场与梵蒂冈）<br>
          7️⃣ <strong>格拉纳达：</strong> Hotel Alhambra Palace 五星级（免去徒步爬坡直抵阿尔罕布拉宫）<br>
          8️⃣ <strong>马拉加：</strong> AC Hotel Málaga Palacio 四星级（大教堂与地中海海港全景）<br>
          9️⃣ <strong>威尼斯：</strong> Hotel Danieli / Santa Chiara（大运河畔水上巴士无缝直达）
        </div>

        <div style="background:#f0fdf4;border-left:4px solid #16a34a;padding:12px 14px;border-radius:0 10px 10px 0;margin-bottom:8px;">
          <strong style="color:#15803d;">🚆 6大黄金城际交通公式（告别繁琐转机与搬行李劳顿）</strong>：<br>
          • <strong>巴塞罗那 ➔ 马德里：</strong> iryo / Renfe AVE 高铁直达 2小时30分钟<br>
          • <strong>马德里 ➔ 塞维利亚：</strong> Renfe AVE 高铁直达 2小时40分钟<br>
          • <strong>马德里 ➔ 那不勒斯：</strong> 伊比利亚航空直飞 2小时35分钟（免去罗马陆路转乘劳顿）<br>
          • <strong>那不勒斯 ➔ 佛罗伦萨：</strong> Italo商务舱Prima直达 2小时50分钟<br>
          • <strong>佛罗伦萨 ➔ 罗马：</strong> 意铁红箭Frecciarossa高铁 1小时35分钟直达<br>
          • <strong>罗马 ↔ 那不勒斯（一日游）：</strong> 高铁直达仅需 1小时10分钟
        </div>

        <div style="margin-top:10px;">
          <button type="button" class="chat-quick-chip" onclick="switchGuidebookChapter('chapter-planner'); goToBookPage('chapter-planner', 0); setTimeout(() => { const el = document.getElementById('plannerMasterSummaryCard'); if(el) el.scrollIntoView({behavior:'smooth'}); }, 120);" style="background:#1b4332;color:#fff;font-weight:700;padding:8px 14px;border-radius:20px;border:none;cursor:pointer;display:inline-flex;align-items:center;gap:6px;box-shadow:0 2px 6px rgba(0,0,0,0.15);">
            <span>📅</span> <span>[第2章] 查看大师规划师5大精要卡片 ➔</span>
          </button>
        </div>
      `;
    } else {
      res = `
        📅 <strong>스페인 &amp; 이탈리아 30일 마스터 플래너 총정리</strong>:<br><br>
        가족 여행의 피로도를 최소화하고 효율을 극대화한 <strong>9대 확정 숙소 &amp; 6대 이동 공식</strong> 요약입니다:<br><br>

        <div style="background:#fdfcf9;border:1.5px solid #2d6a4f;padding:12px 14px;border-radius:10px;margin-bottom:8px;">
          <strong style="color:#1b4332;">🏨 9대 확정 숙소 (역세권 &amp; 부모님 맞춤 평지·엘리베이터 완비)</strong>:<br>
          1️⃣ <strong>바르셀로나:</strong> H10 까사 미모사 4성급 (카사 밀라 도보 1분 평지 가로수길)<br>
          2️⃣ <strong>세비야:</strong> 호텔 페르난도 3세 4성급 (산타크루즈 평지 도보, 정숙한 객실)<br>
          3️⃣ <strong>마드리드:</strong> 페스타나 플라자 마요르 4성급 (마요르 광장 바로 옆 중심가)<br>
          4️⃣ <strong>나폴리:</strong> 그랜드 호텔 오리엔테 4성급 (톨레도역 도보 3분 번화가 안심 치안)<br>
          5️⃣ <strong>피렌체:</strong> 그랜드 호텔 발리오니 4성급 (산타 마리아 노벨라역 200m, 환상 루프탑 테라스)<br>
          6️⃣ <strong>로마:</strong> 호텔 인디고 로마 - 세인트 조지 5성급 (줄리아 거리, 나보나·바티칸 도보)<br>
          7️⃣ <strong>그라나다:</strong> 호텔 알함브라 팰리스 5성급 (언덕 도보 등반 없이 알함브라 직결)<br>
          8️⃣ <strong>말라가:</strong> AC 호텔 말라가 팔라시오 4성급 (대성당과 지중해 항구 파노라마)<br>
          9️⃣ <strong>베네치아:</strong> 호텔 다니엘리 / 산타 키아라 (대운하 및 수상버스 접근성 최상)
        </div>

        <div style="background:#f0fdf4;border-left:4px solid #16a34a;padding:12px 14px;border-radius:0 10px 10px 0;margin-bottom:8px;">
          <strong style="color:#15803d;">🚆 6대 황금 교통 공식 (공항 대기와 무거운 짐 이동 최소화)</strong>:<br>
          • <strong>바르셀로나 ➔ 마드리드:</strong> 이료(iryo) / 렌페 고속열차 직통 2시간 30분<br>
          • <strong>마드리드 ➔ 세비야:</strong> 렌페 AVE 고속열차 직통 2시간 40분<br>
          • <strong>마드리드 ➔ 나폴리:</strong> 이베리아 항공 직항 2시간 35분 (로마 경유 육로 환승 피로 배제)<br>
          • <strong>나폴리 ➔ 피렌체:</strong> 이탈로(Italo) 프리마석 직통 2시간 50분<br>
          • <strong>피렌체 ➔ 로마:</strong> 프레차로사(Frecciarossa) 고속열차 직통 1시간 35분<br>
          • <strong>로마 ↔ 나폴리 (당일치기/이동):</strong> 고속열차 직통 1시간 10분
        </div>

        <div style="margin-top:10px;">
          <button type="button" class="chat-quick-chip" onclick="switchGuidebookChapter('chapter-planner'); goToBookPage('chapter-planner', 0); setTimeout(() => { const el = document.getElementById('plannerMasterSummaryCard'); if(el) el.scrollIntoView({behavior:'smooth'}); }, 120);" style="background:#1b4332;color:#fff;font-weight:700;padding:8px 14px;border-radius:20px;border:none;cursor:pointer;display:inline-flex;align-items:center;gap:6px;box-shadow:0 2px 6px rgba(0,0,0,0.15);">
            <span>📅</span> <span>[제2장] 마스터 플래너 5대 요약 카드 전체보기 ➔</span>
          </button>
        </div>
      `;
    }
    return res + renderFollowupChips(chips);
  }


  // ====================================================
  // 2. SPAIN & ITALY MASTER GOURMET GUIDE (빠에야 & 피자 외 대체 불가 미식 12선 & 15대 검증식당)
  // ====================================================
  const isMasterGourmet = [
    '빠에야 피자 말고', '피자 말고', '빠에야 말고', '빠에야 외', '피자 외', '빠에야 피자 외', '미식 마스터', '마스터 미식', '대체 불가 미식', '시그니처 요리', '7대 도시 미식', '12대 미식', '검증 식당', '가지 튀김', '소꼬리찜', '피데우아', '비스테카', '라구', '쿠오포', '리볼리타', '살팀보카', '해산물 튀김',
    'other than paella', 'other than pizza', 'besides paella', 'besides pizza', 'without paella', 'without pizza', 'master gourmet', 'signature dishes', '12 signature dishes', 'verified restaurants', 'fideua', 'carrillada', 'berenjenas con miel', 'bistecca alla fiorentina', 'ragu napoletano', 'saltimbocca',
    'パエリア以外', 'ピザ以外', 'マスターグルメ', '7大都市グルメ', '12大名物料理', '厳選レストラン', 'フィデウア', '牛テール煮込み', 'ビステッカ', 'ナポリ風ラグー', '郷土料理',
    '除海鲜饭', '除了海鲜饭', '除披萨', '除了披萨', '不要披萨', '不要海鲜饭', '不吃海鲜饭', '不吃披萨', '除海鲜饭外', '除披萨外', '除西班牙海鲜饭外', '大师美食', '12大招牌美食', '7大城市美食', '精选餐厅', '佛罗伦萨牛排', '那不勒斯肉酱', '炖牛尾', '特色佳肴'
  ].some(w => q.includes(w) || cleanQ.includes(w));

  if (isMasterGourmet) {
    const chips = [
      { query: '식당과 여행 필수 서바이벌 회화', label: '🗣️ 24선 필수 회화' },
      { query: '30일 마스터 플래너 요약해줘', label: '📅 30일 마스터 플래너' },
      { query: '이탈리아어 식당 필수 회화', label: '🇮🇹 이탈리아어 회화' }
    ];

    let res = '';
    if (lang === 'ja') {
      res = `
        🍽️ <strong>スペイン＆イタリア 30日マスターグルメガイド（パエリア＆ピザ以外の絶品12選）</strong>:<br><br>
        「毎日パエリアとピザばかりでは飽きてしまう…」というご両親のために、<strong>胃に優しく滋味深い7大都市の代替不可名物料理</strong>を厳選しました:<br><br>

        <div style="background:#fffcf7;border:1.5px solid #b45309;padding:12px 14px;border-radius:10px;margin-bottom:8px;">
          <strong style="color:#92400e;">🇪🇸 スペイン代表の必食名物（パエリア以外）</strong>:<br>
          • <strong>バルセロナ:</strong> フィデウア（Fideuà - 魚介の旨味を吸わせた極細パスタのパエリア風）<br>
          • <strong>セビリア:</strong> イベリコ豚の赤ワイン煮込み（Carrillada Ibérica - 歯が弱いご両親でもとろける柔らかさ）<br>
          • <strong>グラナダ:</strong> 茄子のフリット黒蜜添え（Berenjenas con Miel - 外サク中フワの甘じょっぱい逸品）<br>
          • <strong>マラガ:</strong> マラガ風ミックスシーフードフリット（Fritura Malagueña）＆白身魚のフライ（Cazón en Adobo）
        </div>

        <div style="background:#fef2f2;border:1.5px solid #b91c1c;padding:12px 14px;border-radius:10px;margin-bottom:8px;">
          <strong style="color:#991b1b;">🇮🇹 イタリア代表の必食名物（ピザ以外）</strong>:<br>
          • <strong>ナポリ:</strong> 10時間煮込んだナポリ風牛肉ラグー（Ragù Napoletano）＆黒胡椒香るムール貝のワイン蒸し（Impepatata di Cozze）<br>
          • <strong>フィレンツェ:</strong> ビステッカ・アッラ・フィオレンティーナ（Tボーン炭火ステーキ）＆トスカーナ風豆と野菜の食べるスープ「リボッリータ（Ribollita）」<br>
          • <strong>ローマ:</strong> ローマ伝統の牛テールトマト煮込み（Coda alla Vaccinara）＆仔牛肉とセージの生ハム巻き「サルティンボッカ（Saltimbocca）」
        </div>

        <div style="margin-top:10px;">
          <button type="button" class="chat-quick-chip" onclick="if(window.jumpToMasterGourmet){window.jumpToMasterGourmet('summary-master-gourmet');}else{switchGuidebookChapter('chapter-practical');}" style="background:#b45309;color:#fff;font-weight:700;padding:8px 14px;border-radius:20px;border:none;cursor:pointer;display:inline-flex;align-items:center;gap:6px;box-shadow:0 2px 6px rgba(0,0,0,0.15);">
            <span>🍽️</span> <span>[要約 5] 7大都市の厳選レストラン15選＆詳細を見る ➔</span>
          </button>
        </div>
      `;
    } else if (lang === 'en') {
      res = `
        🍽️ <strong>Spain & Italy 30-Day Master Gourmet Guide (12 Signature Dishes Beyond Paella & Pizza)</strong>:<br><br>
        Tired of daily paella and pizza? Here are <strong>12 senior-friendly, deeply comforting regional culinary masterworks</strong> across 7 historic cities:<br><br>

        <div style="background:#fffcf7;border:1.5px solid #b45309;padding:12px 14px;border-radius:10px;margin-bottom:8px;">
          <strong style="color:#92400e;">🇪🇸 Spain Signature Dishes (Beyond Paella)</strong>:<br>
          • <strong>Barcelona:</strong> Fideuà (toasty short angel-hair noodles simmered in rich saffron shellfish broth with allioli)<br>
          • <strong>Seville:</strong> Carrillada Ibérica (melt-in-your-mouth braised pork/beef cheeks slow-cooked in Pedro Ximénez red wine)<br>
          • <strong>Granada:</strong> Berenjenas con Miel (crispy tempura-style eggplant batons drizzled with sugarcane molasses)<br>
          • <strong>Malaga:</strong> Fritura Malagueña (ultralight olive-oil fried baby squids and fish) & Cazón en Adobo (marinated dogfish)
        </div>

        <div style="background:#fef2f2;border:1.5px solid #b91c1c;padding:12px 14px;border-radius:10px;margin-bottom:8px;">
          <strong style="color:#991b1b;">🇮🇹 Italy Signature Dishes (Beyond Pizza)</strong>:<br>
          • <strong>Naples:</strong> Ragù Napoletano (10-hour slow-simmered rich beef & tomato ragù) & Impepatata di Cozze (steamed black pepper mussels)<br>
          • <strong>Florence:</strong> Bistecca alla Fiorentina (dry-aged Chianina T-bone steak over wood coals) & Ribollita (warm hearty Tuscan bean & cavolo nero stew)<br>
          • <strong>Rome:</strong> Coda alla Vaccinara (braised oxtail in savory tomato, celery and pine nut sauce) & Saltimbocca alla Romana (veal cutlet with fresh sage and prosciutto)
        </div>

        <div style="margin-top:10px;">
          <button type="button" class="chat-quick-chip" onclick="if(window.jumpToMasterGourmet){window.jumpToMasterGourmet('summary-master-gourmet');}else{switchGuidebookChapter('chapter-practical');}" style="background:#b45309;color:#fff;font-weight:700;padding:8px 14px;border-radius:20px;border:none;cursor:pointer;display:inline-flex;align-items:center;gap:6px;box-shadow:0 2px 6px rgba(0,0,0,0.15);">
            <span>🍽️</span> <span>[Summary 5] View 15 Verified Restaurants & Food Photos ➔</span>
          </button>
        </div>
      `;
    } else if (lang === 'zh') {
      res = `
        🍽️ <strong>西班牙与意大利 30天美食大师指南（海鲜饭与披萨外的12大必尝特色）</strong>:<br><br>
        每天吃海鲜饭和披萨难免单调，为您精选<strong>深受父母喜爱、口感软烂鲜美且温和养胃的7大名城特色料理</strong>：<br><br>

        <div style="background:#fffcf7;border:1.5px solid #b45309;padding:12px 14px;border-radius:10px;margin-bottom:8px;">
          <strong style="color:#92400e;">🇪🇸 西班牙不可替代特色美馔（海鲜饭之外）</strong>：<br>
          • <strong>巴塞罗那：</strong> 细面海鲜煲（Fideuà - 浓郁海鲜高汤煨煮短细面，配蒜黄酱）<br>
          • <strong>塞维利亚：</strong> 红酒炖伊比利亚猪面颊肉（Carrillada Ibérica - 入口即化，老少皆宜）<br>
          • <strong>格拉纳达：</strong> 甘蔗蜜汁炸茄条（Berenjenas con Miel - 外酥里嫩，咸甜交织绝妙口感）<br>
          • <strong>马拉加：</strong> 马拉加什锦炸海鲜（Fritura Malagueña）与香料腌炸白身鱼（Cazón en Adobo）
        </div>

        <div style="background:#fef2f2;border:1.5px solid #b91c1c;padding:12px 14px;border-radius:10px;margin-bottom:8px;">
          <strong style="color:#991b1b;">🇮🇹 意大利不可替代特色美馔（披萨之外）</strong>：<br>
          • <strong>那不勒斯：</strong> 10小时慢火精炖肉酱（Ragù Napoletano）与黑椒白葡萄酒蒸青口贝（Impepatata di Cozze）<br>
          • <strong>佛罗伦萨：</strong> 托斯卡纳炭烤T骨牛排（Bistecca alla Fiorentina）与暖胃经典白豆蔬菜浓汤（Ribollita）<br>
          • <strong>罗马：</strong> 屠夫风味番茄炖牛尾（Coda alla Vaccinara）与鼠尾草帕尔玛火腿煎小牛肉（Saltimbocca）
        </div>

        <div style="margin-top:10px;">
          <button type="button" class="chat-quick-chip" onclick="if(window.jumpToMasterGourmet){window.jumpToMasterGourmet('summary-master-gourmet');}else{switchGuidebookChapter('chapter-practical');}" style="background:#b45309;color:#fff;font-weight:700;padding:8px 14px;border-radius:20px;border:none;cursor:pointer;display:inline-flex;align-items:center;gap:6px;box-shadow:0 2px 6px rgba(0,0,0,0.15);">
            <span>🍽️</span> <span>[总结 5] 查看7大城市15家精选认证餐厅详情 ➔</span>
          </button>
        </div>
      `;
    } else {
      res = `
        🍽️ <strong>스페인 &amp; 이탈리아 30일 미식 마스터 가이드 (빠에야 &amp; 피자 외 12대 시그니처)</strong>:<br><br>
        매일 빠에야와 피자만 드실 수는 없죠! 부모님의 입맛(한식과 결이 비슷한 따뜻한 국물, 부드러운 고기)을 완벽하게 저격하는 <strong>도시별 대체 불가 시그니처 요리 12선</strong>입니다:<br><br>

        <div style="background:#fffcf7;border:1.5px solid #b45309;padding:12px 14px;border-radius:10px;margin-bottom:8px;">
          <strong style="color:#92400e;">🇪🇸 스페인 4대 도시 대체 불가 미식 (빠에야 외)</strong>:<br>
          • <strong>바르셀로나:</strong> 피데우아 (Fideuà - 해산물 육수를 듬뿍 머금은 얇은 면 파스타에 알리올리 소스)<br>
          • <strong>세비야:</strong> 이베리코 볼살/소꼬리찜 (Carrillada - 레드와인에 푹 조려 이가 안 좋으신 부모님도 입에서 살살 녹음)<br>
          • <strong>그라나다:</strong> 사탕수수 꿀을 곁들인 가지 튀김 (Berenjenas con Miel - 겉바속촉 단짠의 극치)<br>
          • <strong>말라가:</strong> 모둠 해산물 튀김 (Fritura Malagueña) &amp; 마리네이드 생선튀김 (Cazón en Adobo)
        </div>

        <div style="background:#fef2f2;border:1.5px solid #b91c1c;padding:12px 14px;border-radius:10px;margin-bottom:8px;">
          <strong style="color:#991b1b;">🇮🇹 이탈리아 3대 도시 대체 불가 미식 (피자 외)</strong>:<br>
          • <strong>나폴리:</strong> 10시간 정성 나폴리식 라구 (Ragù Napoletano) &amp; 칼칼한 통후추 홍합찜 (Impepatata di Cozze)<br>
          • <strong>피렌체:</strong> 티본스테이크 (Bistecca alla Fiorentina) &amp; 토스카나 채소 콩스프 리볼리타 (Ribollita - 속이 확 풀리는 해장감)<br>
          • <strong>로마:</strong> 로마 전통 소꼬리 토마토 스튜 (Coda alla Vaccinara) &amp; 송아지고기 살팀보카 (Saltimbocca alla Romana)
        </div>

        <div style="margin-top:10px;">
          <button type="button" class="chat-quick-chip" onclick="if(window.jumpToMasterGourmet){window.jumpToMasterGourmet('summary-master-gourmet');}else{switchGuidebookChapter('chapter-practical');}" style="background:#b45309;color:#fff;font-weight:700;padding:8px 14px;border-radius:20px;border:none;cursor:pointer;display:inline-flex;align-items:center;gap:6px;box-shadow:0 2px 6px rgba(0,0,0,0.15);">
            <span>🍽️</span> <span>[요약 5] 7대 도시 대체 불가 미식 상세 &amp; 검증식당 15선 보기 ➔</span>
          </button>
        </div>
      `;
    }
    return res + renderFollowupChips(chips);
  }


  // ====================================================
  // 3. MASTER SURVIVAL PHRASES & DINING EXPRESSIONS (24선 서바이벌 회화 / 스페인어·이탈리아어 주문 표현)
  // ====================================================
  const isSurvivalPhrases = (
    [
      '회화', '서바이벌', '서바이벌 회화', '필수 표현', '주문 표현', '스페인어 회화', '이탈리아어 회화', '스페인어 표현', '이탈리아어 표현', '식당 회화', '식당 표현', '주문할 때',
      '소금', '싱겁게', '짠', '짜지 않게', 'sin sal', 'sem sal', 'poco sale', 'meno sale', 'less salt', 'no salt',
      '설탕', '달지 않게', '노슈가', 'sin azucar', 'sin azúcar', 'senza zucchero', 'no sugar',
      '따뜻한 물', '미온수', '뜨거운 물', 'agua caliente', 'acqua calda', 'agua sin gas', 'acqua naturale', 'warm water', 'hot water', 'still water',
      '계산서', '영수증', 'la cuenta', 'il conto', 'bill please', 'check please', 'cuanto cuesta', 'quanto costa',
      '카드 결제', '카드 되나요', '신용카드 결제', 'tarjeta', 'carta',
      '화장실 어디', 'donde esta el bano', 'donde esta el baño', 'dov e il bagno', "dov'è il bagno", 'where is the bathroom', 'where is the restroom',
      '남은 음식 포장', '음식 싸주세요', 'para llevar', 'da portare via', 'takeaway', 'takeout',
      '메뉴 추천', '음식 추천', '추천 메뉴', 'que me recomienda', 'qué me recomienda', 'cosa mi consiglia',
      '하나 주세요', '이거 주세요', 'uno de esto', 'uno di questo',
      '실례합니다', '저기요', '여기요', 'disculpe', 'perdon', 'scusi',
      '감사합니다', '고맙습니다', 'gracias', 'grazie',
      'スペイン語会話', 'イタリア語会話', 'サバイバル会話', '注文フレーズ', '塩分控えめ', '砂糖なし', '温かいお湯', 'お会計をお願い', 'トイレはどこ', '持ち帰りにして',
      '西语日常口语', '意大利语日常口语', '生存口语', '点餐口语', '少放盐', '不加糖', '温开水', '请买单', '洗手间在哪里', '打包带走'
    ].some(w => q.includes(w) || cleanQ.includes(w)) ||
    /\b(sin sal|poco sale|sin azucar|sin azúcar|senza zucchero|agua caliente|acqua calda|la cuenta|il conto|para llevar|da portare via|disculpe|scusi|takeaway|takeout)\b/i.test(q)
  );

  // 10-2B. RESTROOM & GOLDEN ROUTINES INTENT (SPAIN & ITALY)
  if (isToilet) {
    const isSagrada = ['사그라다', 'sagrada', '구엘', 'guell', '바르셀로나', 'barcelona', 'サグラダ', 'グエル', 'バルセロナ', '圣家堂', '奎尔', '巴塞罗那'].some(w => q.includes(w));
    const isAlhambra = ['알함브라', '나스르', 'alhambra', 'nasrid', '카를로스', '그라나다', 'granada', 'アルハンブラ', 'ナスル', 'カルロス', 'グラナダ', '阿尔罕布拉', '纳斯瑞德', '纳斯尔', '卡洛斯', '格拉纳达'].some(w => q.includes(w));
    const isVatican = ['바티칸', 'vatican', '시스티나', 'sistine', '베드로', 'バチカン', 'システィーナ', 'サンピエトロ', '梵蒂冈', '西斯廷', '圣伯多禄'].some(w => q.includes(w));
    const isColosseum = ['콜로세움', '포로', 'colosseum', 'roman forum', 'foro romano', 'コロッセオ', 'フォロ', '斗兽场', '古罗马广场'].some(w => q.includes(w));
    const isUffizi = ['우피치', 'uffizi', '피렌체', 'florence', 'firenze', 'ウフィツィ', 'フィレンツェ', '乌菲兹', '佛罗伦萨'].some(w => q.includes(w));
    const isSeville = ['세비야', 'seville', 'sevilla', '알카사르', 'alcazar', 'セビリア', 'アルカサル', '塞维利亚', '王宫'].some(w => q.includes(w));
    const isSurvivalTip = ['백화점', '영수증', '변기', '시트', '커버', 'department', 'receipt', 'seat', 'デパート', '便座', '百货', '马桶垫', '马桶圈'].some(w => q.includes(w));

    let chips = [];
    if (lang === 'ja') {
      chips = [
        { query: 'アルハンブラ宮殿とナスル朝宮殿のトイレ注意点', label: '⚠️ ナスル朝宮殿の注意点' },
        { query: 'バチカン美術館とシスティーナ礼拝堂のトイレ情報', label: '⚠️ バチカン最後の砦' },
        { query: 'ヨーロッパ旅行トイレの3大ゴールデンルール', label: '💡 3大ゴールデンルール' },
        { query: 'ヨーロッパのトイレ裏ワザ（デパート＆便座事情）', label: '🏬 トイレ裏ワザ3選' }
      ];
    } else if (lang === 'en') {
      chips = [
        { query: 'Alhambra & Nasrid Palaces strict restroom rules', label: '⚠️ Nasrid Zero-Toilet Rule' },
        { query: 'Vatican Sistine Chapel restroom last chance', label: '⚠️ Sistine Chapel Last Chance' },
        { query: '3 golden routines for European restrooms', label: '💡 3 Golden Routines' },
        { query: 'European restroom insider survival tips', label: '🏬 Restroom Survival Hacks' }
      ];
    } else if (lang === 'zh') {
      chips = [
        { query: '阿尔罕布拉宫与纳斯瑞德宫殿洗手间特级注意', label: '⚠️ 纳斯瑞德宫绝无厕所' },
        { query: '梵蒂冈西斯廷礼拜堂洗手间最后关口', label: '⚠️ 西斯廷最后关口' },
        { query: '欧洲旅行如厕3大黄金法则', label: '💡 3大黄金法则' },
        { query: '欧洲如厕求生秘籍（百货与无马桶垫）', label: '🏬 如厕求生秘籍' }
      ];
    } else {
      chips = [
        { query: '알함브라 나스르 궁전 화장실 주의사항', label: '⚠️ 나스르 궁전 화장실 전무' },
        { query: '바티칸 시스티나 예배당 직전 화장실 팁', label: '⚠️ 바티칸 마지막 화장실' },
        { query: '사그라다 파밀리아 화장실 위치 알려줘', label: '⛪ 사그라다 파밀리아' },
        { query: '피렌체 우피치 미술관 층별 화장실 위치', label: '🎨 피렌체 우피치 미술관' },
        { query: '유럽 화장실 서바이벌 3대 현지 리얼 팁', label: '💡 유럽 화장실 3대 비법' }
      ];
    }

    if (lang === 'ja') {
      let res = `🚻 <strong>ヨーロッパ主要名所トイレ完全ガイド＆3大ゴールデンルール</strong><br><br>`;
      if (isAlhambra) {
        res += `⚠️ <strong>グラナダ・アルハンブラ（ナスル朝宮殿）の超厳格警告:</strong><br>
        • <strong>宮殿内トイレ皆無:</strong> イスラム建築保護のため内部配管が禁止されており、入場から退場まで宮殿内にトイレは一切ありません！<br>
        • <strong>対策:</strong> 30分刻みの時間指定列に並ぶ前に、すぐ隣にある<strong>【カルロス5世宮殿1階のトイレ】</strong>を必ず利用してください。<br>
        • 敷地内のチケット売り場、カルロス5世宮殿、ヘネラリフェ庭園入口には清潔な無料トイレがあります。<br><br>`;
      }
      if (isVatican) {
        res += `⚠️ <strong>ローマ・バチカン美術館（システィーナ礼拝堂）の注意点:</strong><br>
        • <strong>一方通行で後戻り不可:</strong> システィーナ礼拝堂内にはトイレがなく、サン・ピエトロ大聖堂へ抜けると戻れません！<br>
        • <strong>最後の砦:</strong> 礼拝堂に入る直前、回廊突き当たりのカフェテリア付近のトイレで必ず済ませてください。<br><br>`;
      }
      if (isSagrada) {
        res += `⛪ <strong>バルセロナ・サグラダファミリア＆グエル公園:</strong><br>
        • <strong>サグラダファミリア:</strong> 本堂内部にはトイレがありません。<strong>地下博物館（ショップ隣）や出口付近</strong>に無料トイレがあります。入場前や塔に登る前に必ず地下博物館へ！<br>
        • <strong>グエル公園:</strong> 正門入口や自然の広場遊歩道沿いに清潔な無料トイレがあります。<br><br>`;
      }
      if (isUffizi) {
        res += `🎨 <strong>フィレンツェ・ウフィツィ美術館（フロア別トイレ）:</strong><br>
        • 0階（クローク向かい地下）、2階（カフェテリア下）、1階（特展エリア）に無料トイレ完備。<br>
        • 3階鑑賞中は2階カフェテリアテラスのトイレへ降りるのが最短動線です。<em>「Dov'è il bagno?」</em>とお尋ねください。<br><br>`;
      }
      res += `💡 <strong>ヨーロッパ旅行トイレ「3大ゴールデンルール」:</strong><br>
      1️⃣ <strong>美術館・宮殿は入場直前に必ず済ませる:</strong> 展示室内にトイレがないため、ロビーやカフェテリアで事前に済ませるのが鉄則です。<br>
      2️⃣ <strong>カフェやレストラン出発前に必ず済ませる:</strong> 街中の公衆トイレは有料（€0.5〜€2）かつ希少。店を出る直前の利用が必須です。<br>
      3️⃣ <strong>1ユーロ・50セント硬貨を常備する:</strong> 駅や高速SAの有料ゲート用に小銭をポケットに用意しておきましょう。<br><br>
      🏬 <strong>現地リアル裏ワザ3選:</strong><br>
      • <strong>大手デパート（無料オアシス）:</strong> カタルーニャ広場のエル・コルテ・イングレスやイタリアのCoin、リナシェンテの清潔な改装トイレを活用！<br>
      • <strong>レシートの解錠コード:</strong> マクドナルドやスタバのトイレはレシート最下部の暗証番号が必要です。捨てないで！<br>
      • <strong>便座がない理由:</strong> イタリアでは衛生と破損防止のため便座がない陶器便器が一般的。除菌シートを持参すると安心です。
      `;
      return res + renderFollowupChips(chips);
    } else if (lang === 'en') {
      let res = `🚻 <strong>Europe Major Sights Restroom Guide & 3 Golden Routines</strong><br><br>`;
      if (isAlhambra) {
        res += `⚠️ <strong>Granada Alhambra & Nasrid Palaces Strict Rule:</strong><br>
        • <strong>Zero Toilets Inside:</strong> To preserve delicate Islamic plasterwork, no restrooms exist inside the Nasrid Palaces from entrance to exit!<br>
        • <strong>Action Plan:</strong> Before queuing for your strict 30-min timeslot, visit the <strong>restrooms inside the Palace of Charles V</strong> without fail.<br>
        • Free restrooms are placed at the main ticket office, Charles V Palace, and Generalife entrance.<br><br>`;
      }
      if (isVatican) {
        res += `⚠️ <strong>Rome Vatican Museums (Sistine Chapel) Last Chance:</strong><br>
        • <strong>Strict One-Way Route:</strong> No restrooms exist inside the Sistine Chapel, and the exit toward St. Peter's Basilica allows no return!<br>
        • <strong>Last Bastion:</strong> Always use the cafeteria restrooms at the end of the gallery immediately before entering the Sistine Chapel.<br><br>`;
      }
      if (isSagrada) {
        res += `⛪ <strong>Barcelona Sagrada Família & Park Güell:</strong><br>
        • <strong>Sagrada Família:</strong> No restrooms inside the church nave itself. Clean free facilities are in the <strong>underground Museum (next to gift shop) & exit area</strong>. Use them before entering the nave or tower lifts.<br>
        • <strong>Park Güell:</strong> Free restrooms at main entrance gates and around Plaça de la Natura walking trails.<br><br>`;
      }
      if (isUffizi) {
        res += `🎨 <strong>Florence Uffizi Gallery Layout:</strong><br>
        • Floor 0 (opposite cloakroom basement), Floor 2 (cafeteria mezzanine), Floor 1 (special exhibitions).<br>
        • When viewing Floor 3 masterpieces, descending to Floor 2 cafeteria terrace is fastest. Ask staff: <em>"Dov'è il bagno?"</em>.<br><br>`;
      }
      res += `💡 <strong>3 Golden Routines for European Restroom Survival:</strong><br>
      1️⃣ <strong>Always go right before entering palaces/museums:</strong> Exhibition galleries rarely have facilities; always use lobby/cafeteria restrooms beforehand.<br>
      2️⃣ <strong>Empty bladders before departing cafes/restaurants:</strong> Street toilets charge €0.50–€2.00 coins. Always use dining venue restrooms before leaving.<br>
      3️⃣ <strong>Keep €1.00 & €0.50 coins accessible:</strong> Train stations and highway stops use coin turnstiles. Keep loose change handy.<br><br>
      🏬 <strong>3 Insider Real Hacks:</strong><br>
      • <strong>Department Stores:</strong> El Corte Inglés (Pl. Catalunya, Barcelona) and Coin / Rinascente in Italy provide luxury, clean, free restrooms.<br>
      • <strong>Receipt Door Codes:</strong> Fast-food chains (McDonald's, Starbucks) print 4–6 digit door codes at the bottom of purchase receipts.<br>
      • <strong>Italian Toilet Seat Mystery:</strong> Many Italian public toilets lack plastic seats for sanitation & anti-vandalism. Carry pocket tissues & sanitizer wipes!
      `;
      return res + renderFollowupChips(chips);
    } else if (lang === 'zh') {
      let res = `🚻 <strong>欧洲主要名胜洗手间实地核实指南与3大黄金法则</strong><br><br>`;
      if (isAlhambra) {
        res += `⚠️ <strong>格拉纳达 阿尔罕布拉宫（纳斯瑞德宫殿）特级警告:</strong><br>
        • <strong>殿内绝无厕所:</strong> 为保护伊斯兰历史古迹，纳斯瑞德宫内部严禁通水，检票后直至完全离开全程无任何洗手间！<br>
        • <strong>避坑秘籍:</strong> 纳斯瑞德宫严格30分钟定点检票，在前往排队前，务必先上紧邻的<strong>【卡洛斯五世宫殿内部洗手间】</strong>。<br>
        • 景区售票处正门、卡洛斯五世宫殿、夏宫花园入口均有免费洗手间。<br><br>`;
      }
      if (isVatican) {
        res += `⚠️ <strong>罗马 梵蒂冈博物馆（西斯廷礼拜堂）最后关口:</strong><br>
        • <strong>单向通行严禁逆行:</strong> 西斯廷礼拜堂内无洗手间，穿过礼拜堂通往圣伯多禄大殿后无法返回！<br>
        • <strong>最后关卡:</strong> 进入西斯廷前长廊尽头咖啡厅/简餐处的洗手间是最后机会，务必全家在此解决。<br><br>`;
      }
      if (isSagrada) {
        res += `⛪ <strong>巴塞罗那 圣家堂与奎尔公园:</strong><br>
        • <strong>圣家堂:</strong> 主堂内部完全没有洗手间！免费洗手间位于<strong>地下博物馆（纪念品店旁）及出口闸机处</strong>，入堂与登塔前务必先去！<br>
        • <strong>奎尔公园:</strong> 正门入口处及中心自然大广场步道旁均设有免费干净公厕。<br><br>`;
      }
      if (isUffizi) {
        res += `🎨 <strong>佛罗伦萨 乌菲兹美术馆分层指南:</strong><br>
        • 0层存包处对面地下、2层咖啡厅夹层、1层特展区均有洗手间。<br>
        • 3层欣赏名画时，顺路下到2层咖啡厅露台侧洗手间最顺畅。可向工作人员询问：<em>"Dov'è il bagno?"</em>。<br><br>`;
      }
      res += `💡 <strong>欧洲旅行如厕防坑「3大黄金法则」:</strong><br>
      1️⃣ <strong>进博物馆宫殿前务必先上洗手间:</strong> 展厅内部不设公厕，趁在门厅或存包处时先解决是铁则。<br>
      2️⃣ <strong>离开餐厅咖啡馆前务必清空膀胱:</strong> 街头公厕罕见且收费（€0.5~€2），离店前带长辈上店内厕所可免后顾之忧。<br>
      3️⃣ <strong>口袋常备€1与50欧分硬币:</strong> 火车站与高速服务区收费闸机需投币，随身备好零钱急用。<br><br>
      🏬 <strong>本地独家求生秘籍3则:</strong><br>
      • <strong>百货商场免费避风港:</strong> 巴塞罗那加泰罗尼亚广场英国宫百货（El Corte Inglés）、意大利Coin与Rinascente百货均有豪华免费洗手间。<br>
      • <strong>保留小票查开门密码:</strong> 麦当劳、星巴克等快餐店洗手间大门装有密码锁，密码清晰印在小票最底部。<br>
      • <strong>意大利无马桶圈之谜:</strong> 当地为高温消毒和防踩踏故意拆除塑料坐圈，随身备好便携抽纸和消毒湿巾即可安心使用。
      `;
      return res + renderFollowupChips(chips);
    } else {
      let res = `🚻 <strong>유럽 주요 명소 화장실 완벽 가이드 &amp; 이용 수칙 '골든 루틴'</strong><br><br>`;
      if (isAlhambra) {
        res += `⚠️ <strong>그라나다 알함브라 궁전 (나스르 궁전) 초특급 주의:</strong><br>
        • <strong>궁전 내부 화장실 전무:</strong> 이슬람 건축 보존을 위해 배관 설치가 제한되어, <strong>나스르 궁전은 입장 후 관람 종료까지 화장실이 전혀 없습니다!</strong><br>
        • <strong>골든 팁:</strong> 30분 엄격 입장 대기줄을 서기 전, 바로 인근 <strong>[카를로스 5세 궁전 1층 화장실]</strong>을 반드시 이용하고 입장하셔야 합니다.<br>
        • 알함브라 전체 부지는 매표소 정문, 카를로스 5세 궁전, 헤네랄리페 정원 입구에 무료 화장실이 완비되어 있습니다.<br><br>`;
      }
      if (isVatican) {
        res += `⚠️ <strong>로마 바티칸 미술관 (시스티나 예배당 직전) 라스트 찬스:</strong><br>
        • <strong>일방통행 되돌아오기 불가:</strong> 시스티나 예배당 내부에는 화장실이 절대 없으며, 성 베드로 대성당으로 넘어가면 동선상 다시 돌아올 수 없습니다.<br>
        • <strong>마지막 보루:</strong> 예배당 들어가기 직전 회랑 끝 카페테리아/매점 구역 화장실이 마지막 기회이니 무조건 비우고 입장하세요!<br><br>`;
      }
      if (isSagrada) {
        res += `⛪ <strong>바르셀로나 사그라다 파밀리아 &amp; 구엘 공원:</strong><br>
        • <strong>사그라다 파밀리아:</strong> 성당 본당(예배당 내부) 안에는 화장실이 없습니다! 무료 화장실은 <strong>지하 박물관(Museum) 구역(기념품숍 옆) 및 출구 근처</strong>에 모여 있으니, 본당 입장 전이나 타워 탑승 전에 지하 박물관 쪽 화장실을 먼저 들르세요.<br>
        • <strong>구엘 공원:</strong> 정문 입구 및 자연 광장(Plaça de la Natura) 주변 산책로 중간에 무료 공중화장실이 잘 마련되어 있습니다.<br><br>`;
      }
      if (isColosseum) {
        res += `🏛️ <strong>로마 콜로세움 &amp; 포로 로마노:</strong><br>
        • <strong>콜로세움:</strong> 내부 1층(Ground Floor) 개찰구 통과 직후 무료 화장실 완비.<br>
        • <strong>포로 로마노:</strong> 매표소 근처에 무료 화장실이 있으며, 방대한 야외 유적지 안으로 들어가면 찾기 어려우니 입장 직전에 미리 해결하세요.<br><br>`;
      }
      if (isUffizi) {
        res += `🎨 <strong>피렌체 우피치 미술관 (층별 안내):</strong><br>
        • <strong>0층(지상층):</strong> 물품보관소 맞은편 지하 / <strong>2층(중앙층):</strong> 카페테리아 아래 메자닌 / <strong>1층:</strong> 특별전시회 구역에 무료 화장실 분산.<br>
        • 3층 감상 중 급할 때는 <strong>2층 카페테리아 테라스 화장실</strong>로 내려가는 것이 가장 빠릅니다. 직원에게 <em>"Dov'è il bagno? (도베 일 바뇨?)"</em> 또는 <em>"Where is the restroom?"</em> 문의하세요.<br><br>`;
      }
      if (isSeville) {
        res += `🏰 <strong>세비야 알카사르 &amp; 세비야 대성당:</strong><br>
        • 두 곳 모두 유네스코 세계유산으로 내부 화장실이 매우 청결합니다. 관람 동선 초기(정원 및 중정 로비)와 중간 휴게 공간에 완비되어 있으니 입장 직후 픽토그램을 확인하세요.<br><br>`;
      }
      res += `💡 <strong>유럽 여행 중 화장실 이용 '골든 루틴' 3대 원칙:</strong><br>
      1️⃣ <strong>박물관/궁전은 입장 직전에 무조건 다녀오기:</strong> 전시실 안에는 화장실이 없는 경우가 많으므로 로비/카페테리아 구역에서 무조건 먼저 들르는 것이 철칙입니다.<br>
      2️⃣ <strong>카페나 식당에 들렀을 때 무조건 비우기:</strong> 길거리 공중화장실은 드물거나 유료(0.5~2유로 동전). 식사/커피 후 출발 직전 매장 화장실을 들르는 습관이 부모님 고생을 막습니다.<br>
      3️⃣ <strong>동전(유로화 1유로 / 50센트) 항상 품고 다니기:</strong> 기차역, 광장, 고속도로 휴게소의 유료 화장실(턴스타일)을 대비해 주머니에 1유로, 50센트 동전을 항상 소지하세요.<br><br>
      🏬 <strong>유럽 화장실 서바이벌 3대 현지 리얼 팁:</strong><br>
      • <strong>무료 치트키 '백화점':</strong> 바르셀로나 카탈루냐 광장의 엘 코르테 잉글레스(El Corte Inglés)나 이탈리아의 Coin, Rinascente 백화점은 리모델링된 최고급 무료 화장실을 운영하는 도심의 오아시스!<br>
      • <strong>영수증 코드를 확인하세요:</strong> 맥도날드, 스타벅스 등 프랜차이즈 화장실 문 도어락 비밀번호는 주문 영수증 맨 하단에 인쇄되어 있습니다.<br>
      • <strong>이탈리아 화장실의 비밀 (변기 시트 없음):</strong> 위생 관리와 파손 방지를 위해 변기 커버 없이 도기만 둔 곳이 많습니다. 고장이 아니니 당황하지 마시고 휴대용 미니 티슈나 소독 물티슈를 챙기시면 쾌적하게 이용하실 수 있습니다.
      `;
      return res + renderFollowupChips(chips);
    }
  }


  if (isSurvivalPhrases) {
    const isItalianFocus = isItaly || ['이탈리아', '이태리', 'italian', 'poco sale', 'senza zucchero', 'quanto costa', 'il conto', 'il bagno', 'acqua calda', 'イタリア語', '意大利语'].some(w => q.includes(w) || cleanQ.includes(w));
    const isSugarFocus = ['설탕', '달지 않게', '노슈가', 'azucar', 'azúcar', 'zucchero', 'sugar', '砂糖'].some(w => q.includes(w) || cleanQ.includes(w));
    const isSaltFocus = ['소금', '싱겁게', '짠', '짜지', 'sal', 'sale', 'salt', '塩'].some(w => q.includes(w) || cleanQ.includes(w));
    const isWaterFocus = ['물', '생수', '따뜻한 물', '미온수', '뜨거운 물', 'agua', 'acqua', 'water', 'お湯', 'お水', '温水'].some(w => q.includes(w) || cleanQ.includes(w));
    const isBillFocus = ['얼마', '가격', '계산서', '영수증', '카드', 'cuenta', 'conto', 'quanto', 'cuanto', 'bill', 'check', 'いくら', 'お会計', '买单', '多少钱'].some(w => q.includes(w) || cleanQ.includes(w));
    const isToiletFocus = ['화장실', 'baño', 'bano', 'bagno', 'toilet', 'restroom', 'トイレ', '洗手间'].some(w => q.includes(w) || cleanQ.includes(w));
    const isTakeoutFocus = ['포장', '싸주', '남은', 'llevar', 'portare', 'takeout', 'takeaway', 'to go', '持ち帰り', '打包'].some(w => q.includes(w) || cleanQ.includes(w));

    let res = '';
    const chips = [
      { query: '빠에야 피자 말고 다른 음식 추천', label: '🍽️ 빠에야·피자 외 미식' },
      { query: '30일 마스터 플래너 요약해줘', label: '📅 30일 마스터 플래너' },
      { query: '소매치기 예방법 알려줘', label: '🚨 소매치기 안전' }
    ];

    if (lang === 'ja') {
      res = `
        🗣️ <strong>スペイン＆イタリア旅行 厳選サバイバル実戦会話</strong>:<br><br>
        ヨーロッパのレストランは日本人・アジア人の味覚には塩分が強めです。ご両親とのお食事や街歩きで役立つ魔法のフレーズ集です:<br><br>

        <div style="background:#fffcf7;border:1.5px solid #d97706;padding:12px 14px;border-radius:10px;margin-bottom:8px;">
          <strong style="color:#b45309;">🧂 塩分＆砂糖控えめ（健康配慮）</strong>:<br>
          • 🇪🇸 <strong>Sin sal, por favor.</strong>（シン・サル、ポル・ファボール）: 塩抜き・薄味にしてください<br>
          • 🇮🇹 <strong>Poco sale, per favore.</strong>（ポコ・サーレ、ペル・ファヴォーレ）: 塩分控えめにしてください<br>
          • 🇪🇸 <strong>Sin azúcar, por favor.</strong> / 🇮🇹 <strong>Senza zucchero, per favore.</strong>: 砂糖なし・甘さ控えめ
        </div>

        <div style="background:#f0fdf4;border:1.5px solid #16a34a;padding:12px 14px;border-radius:10px;margin-bottom:8px;">
          <strong style="color:#15803d;">💧 水・お湯＆お会計</strong>:<br>
          • 🇪🇸 <strong>Agua caliente, por favor.</strong> / 🇮🇹 <strong>Acqua calda, per favore.</strong>: 温かいお湯をください（胃もたれ防止）<br>
          • 🇪🇸 <strong>Agua sin gas</strong> / 🇮🇹 <strong>Acqua naturale</strong>: 炭酸なしの普通のミネラルウォーター<br>
          • 🇪🇸 <strong>La cuenta, por favor.</strong> / 🇮🇹 <strong>Il conto, per favore.</strong>: お会計をお願いします<br>
          • 🇪🇸 <strong>¿Puedo pagar con tarjeta?</strong> / 🇮🇹 <strong>Posso pagare con carta?</strong>: クレジットカード使えますか？
        </div>

        <div style="background:#eff6ff;border:1.5px solid #2563eb;padding:12px 14px;border-radius:10px;margin-bottom:8px;">
          <strong style="color:#1d4ed8;">🚶 トイレ・持ち帰り＆丁寧な呼びかけ</strong>:<br>
          • 🇪🇸 <strong>¿Dónde está el baño?</strong> / 🇮🇹 <strong>Dov'è il bagno?</strong>: お手洗いはどこですか？<br>
          • 🇪🇸 <strong>Para llevar, por favor.</strong> / 🇮🇹 <strong>Da portare via, per favore.</strong>: 残りを持ち帰り用に包んでください<br>
          • 🇪🇸 <strong>¡Disculpe!</strong> / 🇮🇹 <strong>Scusi!</strong>: すみません（店員への呼びかけ）<br>
          • 🇪🇸 <strong>Muchas gracias</strong> / 🇮🇹 <strong>Grazie mille</strong>: 本当にありがとうございます
        </div>
      `;
    } else if (lang === 'en') {
      res = `
        🗣️ <strong>Spain & Italy Dining & Travel Survival Phrases (24 Key Expressions)</strong>:<br><br>
        European dishes can be quite salty for senior palates, and water/bread is usually charged. Keep these magic phrases handy on your smartphone:<br><br>

        <div style="background:#fffcf7;border:1.5px solid #d97706;padding:12px 14px;border-radius:10px;margin-bottom:8px;">
          <strong style="color:#b45309;">🧂 Salt & Sugar Control (Senior Health)</strong>:<br>
          • 🇪🇸 <strong>Sin sal, por favor.</strong> (Seen sahl, por fah-vor): No salt / less salt, please.<br>
          • 🇮🇹 <strong>Poco sale, per favore.</strong> (Poh-koh sah-leh, pehr fah-voh-reh): Light on the salt, please.<br>
          • 🇪🇸 <strong>Sin azúcar, por favor.</strong> / 🇮🇹 <strong>Senza zucchero, per favore.</strong>: No sugar / unsweetened, please.
        </div>

        <div style="background:#f0fdf4;border:1.5px solid #16a34a;padding:12px 14px;border-radius:10px;margin-bottom:8px;">
          <strong style="color:#15803d;">💧 Water & Payment</strong>:<br>
          • 🇪🇸 <strong>Agua caliente, por favor.</strong> / 🇮🇹 <strong>Acqua calda, per favore.</strong>: Hot/warm drinking water, please.<br>
          • 🇪🇸 <strong>Agua sin gas</strong> / 🇮🇹 <strong>Acqua naturale</strong>: Still bottled water (non-carbonated).<br>
          • 🇪🇸 <strong>La cuenta, por favor.</strong> / 🇮🇹 <strong>Il conto, per favore.</strong>: The check / bill, please.<br>
          • 🇪🇸 <strong>¿Puedo pagar con tarjeta?</strong> / 🇮🇹 <strong>Posso pagare con carta?</strong>: Can I pay by card?
        </div>

        <div style="background:#eff6ff;border:1.5px solid #2563eb;padding:12px 14px;border-radius:10px;margin-bottom:8px;">
          <strong style="color:#1d4ed8;">🚶 Restroom, Takeaway & Courtesies</strong>:<br>
          • 🇪🇸 <strong>¿Dónde está el baño?</strong> / 🇮🇹 <strong>Dov'è il bagno?</strong>: Where is the restroom?<br>
          • 🇪🇸 <strong>Para llevar, por favor.</strong> / 🇮🇹 <strong>Da portare via, per favore.</strong>: Pack this to-go / takeaway, please.<br>
          • 🇪🇸 <strong>¡Disculpe!</strong> / 🇮🇹 <strong>Scusi!</strong>: Excuse me! (Calling server politely)<br>
          • 🇪🇸 <strong>Muchas gracias</strong> / 🇮🇹 <strong>Grazie mille</strong>: Thank you very much!
        </div>
      `;
    } else if (lang === 'zh') {
      res = `
        🗣️ <strong>西班牙与意大利旅行 必备24句点餐与实用生存口语</strong>:<br><br>
        欧洲餐厅口味对亚洲长辈偏咸，且水和面包通常收费。点餐和游览时长辈同行可直接出示以下常用短语：<br><br>

        <div style="background:#fffcf7;border:1.5px solid #d97706;padding:12px 14px;border-radius:10px;margin-bottom:8px;">
          <strong style="color:#b45309;">🧂 少盐与控糖（长辈健康贴士）</strong>：<br>
          • 🇪🇸 <strong>Sin sal, por favor.</strong>：请少放盐 / 做清淡一点<br>
          • 🇮🇹 <strong>Poco sale, per favore.</strong>：少放盐，清淡点<br>
          • 🇪🇸 <strong>Sin azúcar, por favor.</strong> / 🇮🇹 <strong>Senza zucchero, per favore.</strong>：不加糖 / 无糖
        </div>

        <div style="background:#f0fdf4;border:1.5px solid #16a34a;padding:12px 14px;border-radius:10px;margin-bottom:8px;">
          <strong style="color:#15803d;">💧 饮水与结账买单</strong>：<br>
          • 🇪🇸 <strong>Agua caliente, por favor.</strong> / 🇮🇹 <strong>Acqua calda, per favore.</strong>：请给一杯温水/开水<br>
          • 🇪🇸 <strong>Agua sin gas</strong> / 🇮🇹 <strong>Acqua naturale</strong>：纯净矿泉水（无气泡水）<br>
          • 🇪🇸 <strong>La cuenta, por favor.</strong> / 🇮🇹 <strong>Il conto, per favore.</strong>：请买单结账<br>
          • 🇪🇸 <strong>¿Puedo pagar con tarjeta?</strong> / 🇮🇹 <strong>Posso pagare con carta?</strong>：可以刷信用卡吗？
        </div>

        <div style="background:#eff6ff;border:1.5px solid #2563eb;padding:12px 14px;border-radius:10px;margin-bottom:8px;">
          <strong style="color:#1d4ed8;">🚶 洗手间、打包与常用礼貌用语</strong>：<br>
          • 🇪🇸 <strong>¿Dónde está el baño?</strong> / 🇮🇹 <strong>Dov'è il bagno?</strong>：请问洗手间在哪里？<br>
          • 🇪🇸 <strong>Para llevar, por favor.</strong> / 🇮🇹 <strong>Da portare via, per favore.</strong>：麻烦帮我打包带走<br>
          • 🇪🇸 <strong>¡Disculpe!</strong> / 🇮🇹 <strong>Scusi!</strong>：打扰一下/劳驾（招呼服务员）<br>
          • 🇪🇸 <strong>Muchas gracias</strong> / 🇮🇹 <strong>Grazie mille</strong>：非常感谢！
        </div>
      `;
    } else {
      res = `
        🗣️ <strong>스페인 &amp; 이탈리아 식당 및 여행 필수 서바이벌 회화 (24선)</strong>:<br><br>
        유럽 식당은 음식이 한국인 입맛에 꽤 짜고, 물/빵이 유료인 경우가 많습니다. 부모님 동행 시 주문 시 아래 마법의 표현을 보여주시거나 읽어주세요:<br><br>

        <div style="background:#fffcf7;border:1.5px solid #d97706;padding:12px 14px;border-radius:10px;margin-bottom:8px;">
          <strong style="color:#b45309;">🧂 1. 덜 짜게 / 설탕 빼기 (혈압 &amp; 건강 케어)</strong>:<br>
          • 🇪🇸 <strong>Sin sal, por favor.</strong> (신 살, 포르 파보르): 소금 빼주세요 / 싱겁게 해주세요<br>
          • 🇮🇹 <strong>Poco sale, per favore.</strong> (포코 살레, 페르 파보레): 소금 적게 넣어주세요<br>
          • 🇪🇸 <strong>Sin azúcar, por favor.</strong> (신 아수카르, 포르 파보르) / 🇮🇹 <strong>Senza zucchero, per favore.</strong> (센차 주케로, 페르 파보레): 설탕 빼주세요
        </div>

        <div style="background:#f0fdf4;border-left:4px solid #16a34a;background:#f0fdf4;padding:12px 14px;border-radius:10px;margin-bottom:8px;">
          <strong style="color:#15803d;">💧 2. 따뜻한 물 &amp; 계산서/카드 결제</strong>:<br>
          • 🇪🇸 <strong>Agua caliente, por favor.</strong> (아과 칼리엔테, 포르 파보르) / 🇮🇹 <strong>Acqua calda, per favore.</strong> (아콰 칼다, 페르 파보레): 따뜻한 물 주세요 (부모님 소화에 최고)<br>
          • 🇪🇸 <strong>Agua sin gas</strong> (아과 신 가스) / 🇮🇹 <strong>Acqua naturale</strong> (아콰 나투랄레): 탄산 없는 일반 생수<br>
          • 🇪🇸 <strong>La cuenta, por favor.</strong> (라 쿠엔타, 포르 파보르) / 🇮🇹 <strong>Il conto, per favore.</strong> (일 콘토, 페르 파보레): 계산서 주세요<br>
          • 🇪🇸 <strong>¿Puedo pagar con tarjeta?</strong> (푸에도 파가르 콘 타르헤타?) / 🇮🇹 <strong>Posso pagare con carta?</strong> (포소 파가레 콘 카르타?): 카드로 결제할 수 있나요?
        </div>

        <div style="background:#eff6ff;border:1.5px solid #2563eb;padding:12px 14px;border-radius:10px;margin-bottom:8px;">
          <strong style="color:#1d4ed8;">🚶 3. 화장실, 포장 &amp; 정중한 호칭</strong>:<br>
          • 🇪🇸 <strong>¿Dónde está el baño?</strong> (돈데 에스타 엘 바뇨?) / 🇮🇹 <strong>Dov'è il bagno?</strong> (도베 일 바뇨?): 화장실 어디인가요?<br>
          • 🇪🇸 <strong>Para llevar, por favor.</strong> (파라 예바르, 포르 파보르) / 🇮🇹 <strong>Da portare via, per favore.</strong> (다 포르타레 비아, 페르 파보레): 남은 음식 포장해 주세요<br>
          • 🇪🇸 <strong>¡Disculpe!</strong> (디스쿨페!) / 🇮🇹 <strong>Scusi!</strong> (스쿠지!): 실례합니다 / 여기요<br>
          • 🇪🇸 <strong>Muchas gracias</strong> (무차스 그라시아스) / 🇮🇹 <strong>Grazie mille</strong> (그라치에 밀레): 정말 감사합니다
        </div>
      `;
    }
    return res + renderFollowupChips(chips);
  }


  // ====================================================
  // 4. INTERCITY TRANSIT ROUTES (6대 황금 공식 및 핵심 구간)
  // ====================================================

  // 4-1. NAPLES ➔ FLORENCE (나폴리 ➔ 피렌체)
  if ((hasNaples && hasFlorence) || ['나폴리에서 피렌체', '피렌체에서 나폴리', 'naples to florence', 'florence to naples', 'ナポリからフィレンツェ', '从那不勒斯到佛罗伦萨'].some(w => q.includes(w) || cleanQ.includes(w))) {
    const chips = [
      { query: '피렌체에서 로마 이동법', label: '🚆 피렌체 ➔ 로마' },
      { query: '이탈리아 기차 예매 팁', label: '🚄 이탈리아 기차 팁' },
      { query: '피렌체 티본스테이크 맛집', label: '🥩 피렌체 비스테카' }
    ];
    let res = '';
    if (lang === 'ja') {
      res = `
        🚆 <strong>🇮🇹 ナポリ ➔ フィレンツェ 高速鉄道移動ガイド</strong>:<br><br>
        1️⃣ <strong>Italo（イタロ）または Trenitalia（フレッチャロッサ）:</strong><br>
        • <strong>所要時間:</strong> 直通で<strong>約2時間50分</strong>（乗換なし）<br>
        • <strong>運行区間:</strong> ナポリ中央駅（Napoli Centrale）➔ フィレンツェ・サンタ・マリア・ノヴェッラ駅（Firenze SMN）<br>
        • <strong>シニア快適クラス（一押し）:</strong> <strong>Italo Prima（ビジネス席）</strong>がおすすめ。座席が広く静かで、ウェルカムドリンクと軽食サービスがあり、荷物置き場も座席から近いため安心です。<br>
        • <strong>費用目安:</strong> 事前早期予約（1〜2ヶ月前）で片道 €29〜€55（直前は€80超）。
      `;
    } else if (lang === 'en') {
      res = `
        🚆 <strong>🇮🇹 Naples ➔ Florence High-Speed Train Guide</strong>:<br><br>
        1️⃣ <strong>Italo or Frecciarossa High-Speed Rail:</strong><br>
        • <strong>Travel Time:</strong> Approx. <strong>2 hrs 50 mins direct</strong> (no transfers).<br>
        • <strong>Route:</strong> <strong>Napoli Centrale</strong> ➔ <strong>Firenze Santa Maria Novella (SMN)</strong>.<br>
        • <strong>Senior Comfort Recommendation:</strong> Book <strong>Italo Prima (Business Class)</strong>. Offers spacious reclining leather seats, complimentary espresso and snacks, quiet carriages, and clear eye-lines to luggage racks.<br>
        • <strong>Fare:</strong> €29–€55 one-way when booked 1–2 months in advance.
      `;
    } else if (lang === 'zh') {
      res = `
        🚆 <strong>🇮🇹 那不勒斯 ➔ 佛罗伦萨 高铁直达出行指南</strong>:<br><br>
        1️⃣ <strong>法拉利高铁Italo 或 意铁红箭Frecciarossa：</strong><br>
        • <strong>运行耗时：</strong> 直达仅需<strong>约2小时50分钟</strong>（中途免换乘）。<br>
        • <strong>运行区间：</strong> 那不勒斯中央车站（Napoli Centrale）➔ 佛罗伦萨SMN车站（Firenze SMN）。<br>
        • <strong>长辈尊享推荐：</strong> 强烈推荐选择 <strong>Italo Prima（商务舱）</strong>，座椅宽敞舒适，免费提供意式浓缩咖啡与精美点心，车厢静音且行李架视线清晰安全。<br>
        • <strong>参考票价：</strong> 提前1~2个月预定单程约 €29~€55。
      `;
    } else {
      res = `
        🚆 <strong>🇮🇹 나폴리 ➔ 피렌체 고속철도 이동 완벽 가이드</strong>:<br><br>
        1️⃣ <strong>이탈로(Italo) 또는 트랜이탈리아(Frecciarossa) 직통:</strong><br>
        • <strong>소요 시간:</strong> 환승 없이 <strong>약 2시간 50분 직통</strong><br>
        • <strong>운행 구간:</strong> 나폴리 중앙역(Napoli Centrale) ➔ 피렌체 산타 마리아 노벨라역(Firenze SMN)<br>
        • <strong>부모님 추천 좌석:</strong> <strong>이탈로 프리마(Prima - 비즈니스석)</strong>를 강력 추천합니다. 좌석이 넓고 리클라이닝이 편안하며, 웰컴 커피/스낵 제공 및 짐칸이 시야에 들어와 도난 걱정 없이 편안히 쉬실 수 있습니다.<br>
        • <strong>예상 요금:</strong> 1~2개월 전 조기 예매 시 편도 €29 ~ €55 (역세권 호텔 발리오니까지 도보 3분).
      `;
    }
    return res + renderFollowupChips(chips);
  }

  // 4-2. FLORENCE ➔ ROME (피렌체 ➔ 로마)
  if ((hasFlorence && hasRome) || ['피렌체에서 로마', '로마에서 피렌체', 'florence to rome', 'rome to florence', 'フィレンツェからローマ', '从佛罗伦萨到罗马'].some(w => q.includes(w) || cleanQ.includes(w))) {
    const chips = [
      { query: '로마 12일 분산 일정 테마', label: '🏛️ 로마 12일 일정' },
      { query: '성당 복장 규정 알려줘', label: '⛪ 성당 복장 규정' },
      { query: '이탈리아 기차 예매 팁', label: '🚄 이탈리아 기차 팁' }
    ];
    let res = '';
    if (lang === 'ja') {
      res = `
        🚆 <strong>🇮🇹 フィレンツェ ➔ ローマ 高速鉄道移動ガイド</strong>:<br><br>
        1️⃣ <strong>Frecciarossa（フレッチャロッサ）または Italo（イタロ）:</strong><br>
        • <strong>所要時間:</strong> 直通で<strong>約1時間35分</strong>（15〜20分間隔で頻繁に運行）<br>
        • <strong>運行区間:</strong> フィレンツェ SMN駅 ➔ ローマ・テルミニ駅（Roma Termini）またはティブルティーナ駅<br>
        • <strong>特徴:</strong> トスカーナの美しい田園風景を抜け、あっという間にローマ市中心部に到着します。駅からはタクシーでホテルへ直行するのがシニアには最も安全です。
      `;
    } else if (lang === 'en') {
      res = `
        🚆 <strong>🇮🇹 Florence ➔ Rome High-Speed Rail Guide</strong>:<br><br>
        1️⃣ <strong>Frecciarossa or Italo High-Speed Train:</strong><br>
        • <strong>Travel Time:</strong> Only <strong>1 hr 35 mins direct</strong> (departures every 15–20 mins).<br>
        • <strong>Route:</strong> <strong>Firenze SMN</strong> ➔ <strong>Roma Termini</strong> (or Roma Tiburtina).<br>
        • <strong>Highlights:</strong> Seamless downtown-to-downtown connection. Sparing all airport checks and dropping you right in the historic heart of Rome.
      `;
    } else if (lang === 'zh') {
      res = `
        🚆 <strong>🇮🇹 佛罗伦萨 ➔ 罗马 高铁直达出行指南</strong>:<br><br>
        1️⃣ <strong>意铁红箭Frecciarossa 或 法拉利Italo：</strong><br>
        • <strong>运行耗时：</strong> 直达仅需<strong>约1小时35分钟</strong>（班次密集，每15~20分钟一班）。<br>
        • <strong>运行区间：</strong> 佛罗伦萨SMN站 ➔ 罗马特米尼中央火车站（Roma Termini）。<br>
        • <strong>行程优势：</strong> 真正市中心到市中心，出站后打车直达酒店即可，完全省去去郊区机场的舟车劳顿。
      `;
    } else {
      res = `
        🚆 <strong>🇮🇹 피렌체 ➔ 로마 고속열차 이동 완벽 가이드</strong>:<br><br>
        1️⃣ <strong>프레차로사(Frecciarossa) 또는 이탈로(Italo):</strong><br>
        • <strong>소요 시간:</strong> 직통 <strong>약 1시간 35분</strong> (15~20분 간격으로 수시 운행)<br>
        • <strong>운행 구간:</strong> 피렌체 SMN역 ➔ 로마 테르미니역(Roma Termini) 또는 티부르티나역<br>
        • <strong>특징:</strong> 토스카나 구릉지대를 지나 로마 도심 한복판으로 직결됩니다. 테르미니역 도착 후 소매치기가 많은 대중교통 대신 역사 앞 정식 택시 승차장(또는 FREE NOW 앱)에서 택시를 타시면 호텔까지 안전하게 이동합니다!
      `;
    }
    return res + renderFollowupChips(chips);
  }

  // 4-3. ROME ↔ NAPLES (로마 ↔ 나폴리 당일치기 / 이동)
  if ((hasRome && hasNaples) || ['로마에서 나폴리', '나폴리에서 로마', 'rome to naples', 'naples to rome', 'ローマからナポリ', '从罗马到那不勒斯'].some(w => q.includes(w) || cleanQ.includes(w))) {
    const chips = [
      { query: '카프리 섬 페리랑 푸른 동굴 팁', label: '⛵ 카프리 페리' },
      { query: '나폴리 화덕피자 맛집 추천', label: '🍕 나폴리 피자' },
      { query: '피렌체에서 로마 이동법', label: '🚆 피렌체 ➔ 로마' }
    ];
    let res = '';
    if (lang === 'ja') {
      res = `
        🚆 <strong>🇮🇹 ローマ ↔ ナポリ 高速鉄道移動ガイド</strong>:<br><br>
        • <strong>所要時間:</strong> 高速鉄道直通で<strong>わずか1時間10分</strong>！<br>
        • <strong>運行区間:</strong> ローマ・テルミニ駅 ↔ ナポリ中央駅<br>
        • <strong>活用法:</strong> 非常に近いため、ローマ滞在中のナポリ・ポンペイ日帰り旅行、あるいは拠点移動のどちらにも最適です。
      `;
    } else if (lang === 'en') {
      res = `
        🚆 <strong>🇮🇹 Rome ↔ Naples High-Speed Rail Guide</strong>:<br><br>
        • <strong>Travel Time:</strong> Just <strong>1 hr 10 mins direct</strong> via Frecciarossa or Italo!<br>
        • <strong>Route:</strong> Roma Termini ↔ Napoli Centrale.<br>
        • <strong>Pro Tip:</strong> At just over an hour, it serves effortlessly as either a smooth hotel relocation or a day trip to Naples and Pompeii.
      `;
    } else if (lang === 'zh') {
      res = `
        🚆 <strong>🇮🇹 罗马 ↔ 那不勒斯 高铁直达出行指南</strong>:<br><br>
        • <strong>运行耗时：</strong> 高铁直达<strong>仅需1小时10分钟</strong>！<br>
        • <strong>运行区间：</strong> 罗马Termini车站 ↔ 那不勒斯中央火车站。<br>
        • <strong>行程优势：</strong> 耗时极短，既适合作为城市换宿的大件行李轻松直达，也适合以罗马为据点进行那不勒斯与庞贝一日游。
      `;
    } else {
      res = `
        🚆 <strong>🇮🇹 로마 ↔ 나폴리 고속열차 이동 가이드</strong>:<br><br>
        • <strong>소요 시간:</strong> 초고속 열차 직통으로 <strong>단 1시간 10분</strong>!<br>
        • <strong>운행 구간:</strong> 로마 테르미니역 ↔ 나폴리 중앙역<br>
        • <strong>활용 팁:</strong> 거리가 가까워 로마에서 나폴리/폼페이 당일치기 투어로도 훌륭하며, 캐리어를 싣고 숙소를 옮길 때도 피로감이 전혀 없는 황금 구간입니다.
      `;
    }
    return res + renderFollowupChips(chips);
  }

  // 4-4. BARCELONA ➔ MADRID (바르셀로나 ➔ 마드리드)
  if ((hasBarcelona && hasMadrid) || ['바르셀로나에서 마드리드', '마드리드에서 바르셀로나', 'barcelona to madrid', 'madrid to barcelona', 'バルセロナからマドリード', '从巴塞罗那到马德里'].some(w => q.includes(w) || cleanQ.includes(w))) {
    const chips = [
      { query: '마드리드에서 세비야 이동법', label: '🚆 마드리드 ➔ 세비야' },
      { query: '마드리드 맛집 추천해줘', label: '🍽️ 마드리드 맛집' },
      { query: '바르셀로나 가우디 투어 팁', label: '🏛️ 가우디 명소' }
    ];
    let res = '';
    if (lang === 'ja') {
      res = `
        🚆 <strong>🇪🇸 バルセロナ ➔ マドリード 高速鉄道移動ガイド</strong>:<br><br>
        • <strong>所要時間:</strong> iryo / Renfe AVE 直通で<strong>約2時間30分</strong><br>
        • <strong>運行区間:</strong> バルセロナ・サンツ駅（Sants）➔ マドリード・アトーチャ駅（Atocha）<br>
        • <strong>特徴:</strong> 市中心部同士を結ぶため、空港での荷物預け入れや保安検査の行列が不要で、飛行機よりはるかに快適です。
      `;
    } else if (lang === 'en') {
      res = `
        🚆 <strong>🇪🇸 Barcelona ➔ Madrid High-Speed Train Guide</strong>:<br><br>
        • <strong>Travel Time:</strong> Approx. <strong>2 hrs 30 mins direct</strong> via iryo or Renfe AVE.<br>
        • <strong>Route:</strong> Barcelona Sants ➔ Madrid Puerta de Atocha.<br>
        • <strong>Why Train over Flight:</strong> Downtown station-to-station routing eliminates long airport transfer commutes and stringent baggage weigh-ins.
      `;
    } else if (lang === 'zh') {
      res = `
        🚆 <strong>🇪🇸 巴塞罗那 ➔ 马德里 高铁直达指南</strong>:<br><br>
        • <strong>运行耗时：</strong> iryo / Renfe AVE 高铁直达约<strong>2小时30分钟</strong>。<br>
        • <strong>运行区间：</strong> 巴塞罗那Sants车站 ➔ 马德里Atocha阿托查火车站。<br>
        • <strong>出行建议：</strong> 比乘坐飞机省去两头去机场的时间，行李无额外严苛限制，父母出行首选。
      `;
    } else {
      res = `
        🚆 <strong>🇪🇸 바르셀로나 ➔ 마드리드 고속열차(iryo/AVE) 이동 가이드</strong>:<br><br>
        • <strong>소요 시간:</strong> 고속철도 직통으로 <strong>약 2시간 30분</strong><br>
        • <strong>운행 구간:</strong> 바르셀로나 산츠(Sants)역 ➔ 마드리드 아토차(Atocha)역<br>
        • <strong>기차 추천 이유:</strong> 공항 이동, 위탁 수하물 검사, 탑승 대기 시간을 감안할 때 비행기보다 기차가 시간적으로 1시간 이상 절약되며 부모님의 무릎과 허리 피로도가 극적으로 줄어듭니다!
      `;
    }
    return res + renderFollowupChips(chips);
  }

  // 4-5. MADRID ➔ NAPLES (마드리드 ➔ 나폴리 항공 직항)
  if ((hasMadrid && hasNaples) || ['마드리드에서 나폴리', 'madrid to naples', 'マドリードからナポリ', '从马德里到那不勒斯'].some(w => q.includes(w) || cleanQ.includes(w))) {
    const chips = [
      { query: '나폴리에서 피렌체 이동법', label: '🚆 나폴리 ➔ 피렌체' },
      { query: '30일 마스터 플래너 요약해줘', label: '📅 30일 마스터 플래너' },
      { query: '나폴리 맛집 추천해줘', label: '🍕 나폴리 맛집' }
    ];
    let res = '';
    if (lang === 'ja') {
      res = `
        ✈️ <strong>🇪🇸 マドリード ➔ 🇮🇹 ナポリ 直行便移動公式</strong>:<br><br>
        • <strong>航空会社:</strong> イベリア航空（Iberia）直行便<br>
        • <strong>所要時間:</strong> <strong>2時間35分</strong><br>
        • <strong>区間:</strong> マドリード・バラハス空港（MAD）➔ ナポリ・カポディキーノ空港（NAP）<br>
        • <strong>マスター公式の利点:</strong> ローマ経由の陸路移動（飛行機＋列車乗換）を避け、ナポリ空港から市内中心部ホテル（グランド・ホテル・オリエンテ）へタクシーで約15分（定額約€20）で楽々チェックインできます！
      `;
    } else if (lang === 'en') {
      res = `
        ✈️ <strong>🇪🇸 Madrid ➔ 🇮🇹 Naples Direct Flight Formula</strong>:<br><br>
        • <strong>Airlines:</strong> Iberia Direct Non-Stop Flight.<br>
        • <strong>Flight Duration:</strong> <strong>2 hrs 35 mins</strong>.<br>
        • <strong>Route:</strong> Madrid-Barajas (MAD) ➔ Naples Capodichino (NAP).<br>
        • <strong>Master Formula Rationale:</strong> Flying directly into Naples bypasses the exhausting multi-leg transfer of landing in Rome and hauling bags across trains. Fixed-rate airport taxis reach Naples downtown in just 15 mins (~€20)!
      `;
    } else if (lang === 'zh') {
      res = `
        ✈️ <strong>🇪🇸 马德里 ➔ 🇮🇹 那不勒斯 直飞跨国出行公式</strong>:<br><br>
        • <strong>执飞航司：</strong> 西班牙国家航空（Iberia）直飞航班。<br>
        • <strong>飞行耗时：</strong> <strong>2小时35分钟</strong>。<br>
        • <strong>航线：</strong> 马德里巴拉哈斯机场（MAD）➔ 那不勒斯卡波迪基诺机场（NAP）。<br>
        • <strong>行程智慧：</strong> 避开飞往罗马后再倒大巴和火车拖行李的疲累，抵达那不勒斯机场后乘坐正规出租车（固定一口价约€20）15分钟即可直达市中心酒店！
      `;
    } else {
      res = `
        ✈️ <strong>🇪🇸 마드리드 ➔ 🇮🇹 나폴리 직항 이동 공식</strong>:<br><br>
        • <strong>추천 항공:</strong> 이베리아 항공(Iberia) 직항편<br>
        • <strong>비행 시간:</strong> <strong>약 2시간 35분 직항</strong><br>
        • <strong>운항 구간:</strong> 마드리드 바라하스 공항(MAD) ➔ 나폴리 카포디키노 공항(NAP)<br>
        • <strong>마스터 플래너 핵심 이유:</strong> 로마로 입국해 무거운 캐리어를 끌고 기차로 환승하는 극심한 피로를 없애고, 나폴리 공항 도착 즉시 정찰제 택시(약 €20, 15분)로 톨레도역 앞 그랜드 호텔 오리엔테까지 직행하여 부모님 체력을 온전히 보존합니다!
      `;
    }
    return res + renderFollowupChips(chips);
  }


  // ====================================================
  // 5. ITALY TRANSIT MASTER GUIDE & CONVALIDA FINE TRAP
  // ====================================================
  const isItalyTransit = [
    '이탈리아 기차', '이탈리아 교통', '트랜이탈리아', '이탈로', '프레차로사', '펀칭', '검표', '콘발리다', 'convalida', '64번 버스', '40번 버스', '이탈리아 버스', '이탈리아 지하철', '로마 지하철', '이탈리아 택시', 'free now', '프리나우',
    'italy train', 'italy transit', 'trenitalia', 'italo', 'frecciarossa', 'ticket validation', 'convalida', 'bus 64', 'rome bus', 'rome metro', 'tap and go italy', 'free now italy',
    'イタリア鉄道', 'トレニタリア', 'イタロ', '打刻', '刻印', 'コンヴァリダ', 'ローマ64番バス', 'ローマ地下鉄', 'イタリア交通',
    '意大利火车', '意铁', '法拉利高铁', '打票', '检票机', '罗马64路公交', '罗马地铁', '意大利交通'
  ].some(w => q.includes(w) || cleanQ.includes(w));

  if (isItalyTransit) {
    const chips = [
      { query: '나폴리에서 피렌체 이동법', label: '🚆 나폴리 ➔ 피렌체' },
      { query: '성당 복장 규정 알려줘', label: '⛪ 성당 복장 규정' },
      { query: '소매치기 예방법 알려줘', label: '🚨 소매치기 안전' }
    ];

    let res = '';
    if (lang === 'ja') {
      res = `
        🚄 <strong>🇮🇹 イタリア公共交通＆高速鉄道 必読マスターガイド</strong>:<br><br>
        ご両親の体力保護と<strong>「イタリア特有の落とし穴（罰金・スリ）」</strong>を回避する最重要ポイントです:<br><br>

        <div style="background:#fffcf7;border:1.5px solid #d97706;padding:12px 14px;border-radius:10px;margin-bottom:8px;">
          <strong style="color:#b45309;">1️⃣ 高速鉄道（Trenitalia vs Italo）の選び方:</strong><br>
          • <strong>Italo Prima（ビジネス席）がおすすめ:</strong> 料金差はわずか€10〜€15程度ですが、ゆったりとしたリクライニング本革シート、無料エスプレッソ＆スナック、荷物置き場が座席から近いため、シニア旅行に最も安心です。<br>
          • 指定席付き高速鉄道（Frecciarossa/Italo）は電子チケットでそのまま乗車可能です（打刻不要）。
        </div>

        <div style="background:#fef2f2;border:1.5px solid #dc2626;padding:12px 14px;border-radius:10px;margin-bottom:8px;">
          <strong style="color:#b91c1c;">2️⃣ 【厳重注意】紙の切符の「打刻（Convalida）」義務:</strong><br>
          • <strong>Regionale（普通列車）や市内バス・トラムの紙切符</strong>は、乗車前に必ず駅ホームや車内の<strong>黄色・緑色の打刻機（刻印機）</strong>に通して日時の刻印を行ってください！<br>
          • 未打刻の場合、有効な切符を持っていても<strong>1人あたり€50〜€100の即時罰金</strong>が科せられます。
        </div>

        <div style="background:#eff6ff;border:1.5px solid #2563eb;padding:12px 14px;border-radius:10px;margin-bottom:8px;">
          <strong style="color:#1d4ed8;">3️⃣ ローマ64番・40番バスのスリ警告 ＆ タクシー活用:</strong><br>
          • テルミニ駅 ↔ バチカンを結ぶ64番・40番バスはヨーロッパ屈指のスリ多発路線です。ご両親連れは地下鉄（Tap & Go対応）または<strong>FREE NOW（タクシー配車アプリ）</strong>の利用を強く推奨します！
        </div>
      `;
    } else if (lang === 'en') {
      res = `
        🚄 <strong>🇮🇹 Italy Transit & High-Speed Rail Survival Guide</strong>:<br><br>
        Essential rules focused on <strong>senior comfort</strong> and <strong>avoiding Italy's classic traps (hefty fines & pickpockets)</strong>:<br><br>

        <div style="background:#fffcf7;border:1.5px solid #d97706;padding:12px 14px;border-radius:10px;margin-bottom:8px;">
          <strong style="color:#b45309;">1️⃣ Train Booking (Trenitalia vs Italo):</strong><br>
          • <strong>Italo Prima (Business Class) is strongly recommended:</strong> For only €10–€15 extra, you gain extra-wide reclining leather seating, complimentary espresso & gourmet biscuits, quiet carriages, and direct line-of-sight to luggage racks.<br>
          • High-speed trains with assigned seats (Frecciarossa/Italo) do NOT require paper stamping—e-tickets on smartphones are scanned onboard.
        </div>

        <div style="background:#fef2f2;border:1.5px solid #dc2626;padding:12px 14px;border-radius:10px;margin-bottom:8px;">
          <strong style="color:#b91c1c;">2️⃣ 【MAJOR WARNING】 Ticket Validation (*Convalida*) Fine Trap:</strong><br>
          • All physical paper tickets for <strong>Regionale trains, city buses, and trams MUST be validated</strong> in the small yellow/green stamping machines BEFORE boarding!<br>
          • Failure to validate results in on-the-spot fines of <strong>€50–€100 per person</strong>, even if you bought a valid ticket!
        </div>

        <div style="background:#eff6ff;border:1.5px solid #2563eb;padding:12px 14px;border-radius:10px;margin-bottom:8px;">
          <strong style="color:#1d4ed8;">3️⃣ Rome Bus 64/40 Pickpocket Advisory & Tap & Go:</strong><br>
          • Buses 64 and 40 (Termini ↔ Vatican) are notorious pickpocket havens. Use the Metro (Tap & Go with contactless credit cards) or **FREE NOW app taxis** for seamless door-to-door comfort!
        </div>
      `;
    } else if (lang === 'zh') {
      res = `
        🚄 <strong>🇮🇹 意大利公共交通与高铁乘车避坑指南</strong>:<br><br>
        专为长辈出行省力、防范<strong>“意大利典型交通罚款与小偷陷阱”</strong>的核心指南：<br><br>

        <div style="background:#fffcf7;border:1.5px solid #d97706;padding:12px 14px;border-radius:10px;margin-bottom:8px;">
          <strong style="color:#b45309;">1️⃣ 高铁选择（Trenitalia意铁 vs 法拉利Italo）：</strong><br>
          • <strong>首选推荐 Italo Prima（商务舱）：</strong> 差价通常仅约 €10~€15，但拥有超大真皮调节座椅、免费意式浓缩咖啡与精美点心，行李架视线清晰，长辈乘坐极度舒心。<br>
          • 凡含对号入座的高铁（Frecciarossa/Italo）手机出示二维码电子票即可，无需打票。
        </div>

        <div style="background:#fef2f2;border:1.5px solid #dc2626;padding:12px 14px;border-radius:10px;margin-bottom:8px;">
          <strong style="color:#b91c1c;">2️⃣ 【重中之重】 实体纸质票“打票（Convalida）”罚款陷阱：</strong><br>
          • 所有乘坐<strong>慢车（Regionale）、市内公交和大巴的纸质车票</strong>，上车或上站台前必须插入黄色或绿色打票机打印日期时间！<br>
          • 即使买了正规车票，只要未打票即被视作逃票，当场被处以每人<strong>€50~€100的重额罚款</strong>！
        </div>

        <div style="background:#eff6ff;border:1.5px solid #2563eb;padding:12px 14px;border-radius:10px;margin-bottom:8px;">
          <strong style="color:#1d4ed8;">3️⃣ 罗马64/40路公交防盗警示 与 FREE NOW叫车：</strong><br>
          • 往返特米尼火车站与梵蒂冈的64路和40路是欧洲著名小偷聚集线路。建议长辈乘坐罗马地铁（支持Tap & Go刷外币信用卡过闸）或使用 <strong>FREE NOW 官方打车软件</strong>直接点对点抵达。
        </div>
      `;
    } else {
      res = `
        🚄 <strong>🇮🇹 이탈리아 대중교통 및 고속철도 완벽 마스터 가이드</strong>:<br><br>
        부모님의 체력을 아끼고 <strong>‘이탈리아 특유의 함정(벌금 폭탄 &amp; 소매치기)’</strong>을 피하기 위한 핵심 요약입니다:<br><br>

        <div style="background:#fffcf7;border:1.5px solid #d97706;padding:12px 14px;border-radius:10px;margin-bottom:8px;">
          <strong style="color:#b45309;">1️⃣ 고속열차 선택: 트랜이탈리아 vs 이탈로(Italo)</strong><br>
          • <strong>이탈로 프리마(Prima - 비즈니스석) 강력 추천:</strong> 일반석과 편도 약 €10~€15 차이에 불과하지만, 넓은 좌석, 웰컴 음료/스낵 카트 서비스, 짐칸이 좌석 근처에 있어 캐리어 도난 걱정이 전혀 없습니다.<br>
          • 좌석 지정 고속열차(Frecciarossa, Italo)는 스마트폰 전자 티켓 QR코드로 탑승하며 펀칭이 필요 없습니다.
        </div>

        <div style="background:#fef2f2;border:1.5px solid #dc2626;padding:12px 14px;border-radius:10px;margin-bottom:8px;">
          <strong style="color:#b91c1c;">2️⃣ 【절대 주의】 완행열차(Regionale) &amp; 시내버스 티켓 '펀칭(Convalida)' 의무:</strong><br>
          • <strong>종이 티켓</strong>을 구매하셨다면 플랫폼이나 버스 내부의 <strong>노란색 또는 초록색 펀칭기</strong>에 넣어 날짜/시간을 반드시 각인해야 합니다!<br>
          • 표를 샀더라도 펀칭하지 않으면 무임승차로 간주되어 현장에서 <strong>1인당 €50 ~ €100의 즉결 벌금</strong>을 물게 됩니다.
        </div>

        <div style="background:#eff6ff;border:1.5px solid #2563eb;padding:12px 14px;border-radius:10px;margin-bottom:8px;">
          <strong style="color:#1d4ed8;">3️⃣ 로마 64번·40번 버스 소매치기 주의 &amp; 택시(FREE NOW) 활용:</strong><br>
          • 테르미니역 ↔ 바티칸을 오가는 64번/40번 버스는 유럽에서 소매치기가 가장 악명 높은 노선입니다. 부모님 동행 시 로마 메트로(컨택트리스 카드 Tap &amp; Go 지원)를 타시거나 <strong>FREE NOW 앱</strong>으로 정식 택시를 불러 이동하세요!
        </div>
      `;
    }
    return res + renderFollowupChips(chips);
  }

  // ====================================================
  // 6. CATHEDRAL & CHURCH DRESS PROTOCOL (성당 복장 규정)
  // ====================================================
  const isCathedralDress = (
    [
      '성당 복장', '바티칸 복장', '교회 복장', '복장 규정', '반바지 성당', '민소매 성당', '두오모 복장', '드레스코드', '슬리퍼 성당',
      'cathedral dress code', 'church dress code', 'vatican dress code', 'dress protocol', 'shorts cathedral', 'sleeveless cathedral', 'duomo dress code',
      '大聖堂ドレスコード', '教会服装', 'バチカン服装', 'ノースリーブ教会', 'ドゥオーモ服装', '服装規定',
      '大教堂着装', '教堂着装规定', '梵蒂冈着装', '短裤教堂', '吊带无袖教堂', '大教堂着装要求', '着装要求'
    ].some(w => q.includes(w) || cleanQ.includes(w)) ||
    ((q.includes('大聖堂') || q.includes('教会') || q.includes('バチカン') || q.includes('ドゥオーモ')) && (q.includes('服装') || q.includes('ドレスコード') || q.includes('規定'))) ||
    ((q.includes('教堂') || q.includes('梵蒂冈') || q.includes('大教堂')) && (q.includes('着装') || q.includes('服装') || q.includes('规定') || q.includes('要求'))) ||
    ((q.includes('성당') || q.includes('바티칸') || q.includes('교회')) && (q.includes('복장') || q.includes('옷') || q.includes('규정')))
  );

  if (isCathedralDress) {
    const chips = [
      { query: '로마 12일 분산 일정 테마', label: '🏛️ 로마 12일 일정' },
      { query: '이탈리아 기차 예매 팁', label: '🚄 이탈리아 기차 팁' },
      { query: '소매치기 예방법 알려줘', label: '🚨 소매치기 안전' }
    ];

    let res = '';
    if (lang === 'ja') {
      res = `
        ⛪ <strong>イタリア・スペイン大聖堂 入場ドレスコード完全チェック</strong>:<br><br>
        バチカンのサン・ピエトロ大聖堂、フィレンツェのドゥオーモ、バルセロナのサグラダ・ファミリアなどでは<strong>極めて厳格な服装検査</strong>が行われます:<br><br>

        <div style="background:#fef2f2;border:1.5px solid #dc2626;padding:12px 14px;border-radius:10px;margin-bottom:8px;">
          <strong style="color:#b91c1c;">🚫 入場禁止となる服装:</strong><br>
          • <strong>肩の露出:</strong> ノースリーブ、キャミソール、タンクトップ<br>
          • <strong>膝の露出:</strong> 膝上丈のショートパンツ、ミニスカート（膝が隠れる必要があります）<br>
          • <strong>帽子:</strong> 堂内に入る際は必ず脱帽<br>
          • <strong>露出度の高い履物:</strong> ビーチサンダルや過度のスリッパ
        </div>

        <div style="background:#f0fdf4;border:1.5px solid #16a34a;padding:12px 14px;border-radius:10px;margin-bottom:8px;">
          <strong style="color:#15803d;">💡 シニア安心・旅のエチケット裏技:</strong><br>
          • デイパックに<strong>薄手のストールやカーディガン</strong>を1枚入れておき、入場時だけ肩や腰にサッと巻けば100%スムーズに入場できます！
        </div>
      `;
    } else if (lang === 'en') {
      res = `
        ⛪ <strong>Italy & Spain Cathedral Dress Protocol & Checklist</strong>:<br><br>
        Strict inspections are enforced at major basilicas including <strong>St. Peter's Basilica (Vatican), Florence Duomo, and Sagrada Família</strong>:<br><br>

        <div style="background:#fef2f2;border:1.5px solid #dc2626;padding:12px 14px;border-radius:10px;margin-bottom:8px;">
          <strong style="color:#b91c1c;">🚫 Strictly Prohibited Attire:</strong><br>
          • <strong>Bare Shoulders:</strong> Sleeveless tops, tank tops, halter tops.<br>
          • <strong>Bare Knees:</strong> Shorts or skirts ending above the kneecap (knees must be fully covered).<br>
          • <strong>Hats:</strong> Men and women must remove hats/caps before entering holy sites.<br>
          • <strong>Footwear:</strong> Beach flip-flops are strongly discouraged.
        </div>

        <div style="background:#f0fdf4;border:1.5px solid #16a34a;padding:12px 14px;border-radius:10px;margin-bottom:8px;">
          <strong style="color:#15803d;">💡 Pro Senior Travel Tip:</strong><br>
          • Pack a <strong>lightweight pashmina scarf or shawl</strong> in your daypack. Simply drape it over shoulders or wrap it around the waist upon entry for 100% effortless compliance!
        </div>
      `;
    } else if (lang === 'zh') {
      res = `
        ⛪ <strong>意大利与西班牙大教堂 入场着装规范与避坑清单</strong>:<br><br>
        在梵蒂冈圣彼得大教堂、佛罗伦萨百花大教堂、巴塞罗那圣家堂等宗教圣地，安检极其严格：<br><br>

        <div style="background:#fef2f2;border:1.5px solid #dc2626;padding:12px 14px;border-radius:10px;margin-bottom:8px;">
          <strong style="color:#b91c1c;">🚫 严禁入场的服装要求：</strong><br>
          • <strong>露肩装：</strong> 无袖上衣、吊带背心、抹胸。<br>
          • <strong>露膝盖：</strong> 膝盖以上的短裤、超短裙（裤裙长度必须遮住膝盖）。<br>
          • <strong>帽子：</strong> 进入教堂内部必须脱下帽子。<br>
          • <strong>鞋履：</strong> 严禁穿着沙滩人字拖。
        </div>

        <div style="background:#f0fdf4;border:1.5px solid #16a34a;padding:12px 14px;border-radius:10px;margin-bottom:8px;">
          <strong style="color:#15803d;">💡 长辈出行实用小妙招：</strong><br>
          • 随身背包里放一条<strong>轻便的披肩或丝巾</strong>，进教堂时披在肩头或系在腰间遮住双腿，即可确保100%顺利入场！
        </div>
      `;
    } else {
      res = `
        ⛪ <strong>이탈리아 &amp; 스페인 대성당 복장 규정 (드레스코드 완벽 체크리스트)</strong>:<br><br>
        바티칸 성 베드로 대성당, 피렌체 두오모, 바르셀로나 사그라다 파밀리아 등은 <strong>복장 검사가 매우 엄격</strong>하여 기준에 맞지 않으면 입장이 즉시 거부됩니다:<br><br>

        <div style="background:#fef2f2;border:1.5px solid #dc2626;padding:12px 14px;border-radius:10px;margin-bottom:8px;">
          <strong style="color:#b91c1c;">🚫 입장 불가 복장:</strong><br>
          • <strong>어깨 노출:</strong> 민소매, 나시, 끈나시(탱크탑)<br>
          • <strong>무릎 노출:</strong> 무릎 위로 올라오는 반바지, 짧은 치마 (남녀 모두 무릎을 덮어야 함)<br>
          • <strong>모자:</strong> 성당 내부 입장 시 반드시 탈의<br>
          • <strong>신발:</strong> 비치 샌들, 조리(플립플랍) 형태
        </div>

        <div style="background:#f0fdf4;border:1.5px solid #16a34a;padding:12px 14px;border-radius:10px;margin-bottom:8px;">
          <strong style="color:#15803d;">💡 부모님 동행 필수 꿀팁:</strong><br>
          • 가방에 <strong>얇은 스카프(숄)나 가디건</strong>을 1개 넣어두셨다가, 성당 입구에서 어깨나 허리에 둘러주시면 아무런 제지 없이 100% 안전하게 입장하실 수 있습니다!
        </div>
      `;
    }
    return res + renderFollowupChips(chips);
  }

  // ====================================================
  // 7. CAPRI ISLAND & FERRY & BLUE GROTTO (카프리 섬 & 페리)
  // ====================================================
  const isCapriGuide = [
    '카프리', '카프리섬', '카프리 페리', '푸른 동굴', '카프리 당일치기', 'snav', 'caremar',
    'capri', 'capri island', 'capri ferry', 'blue grotto', 'grotta azzurra', 'snav ferry', 'caremar',
    'カプリ島', 'カプリフェリー', '青の洞窟',
    '卡普里', '卡普里岛', '卡普里轮渡', '蓝洞'
  ].some(w => q.includes(w) || cleanQ.includes(w));

  if (isCapriGuide) {
    const chips = [
      { query: '나폴리에서 피렌체 이동법', label: '🚆 나폴리 ➔ 피렌체' },
      { query: '나폴리 정통 화덕피자 맛집', label: '🍕 나폴리 피자' },
      { query: '30일 마스터 플래너 요약해줘', label: '📅 30일 마스터 플래너' }
    ];

    let res = '';
    if (lang === 'ja') {
      res = `
        ⛵ <strong>🇮🇹 カプリ島フェリー＆青の洞窟 実戦検証ガイド</strong>:<br><br>
        1️⃣ <strong>高速船（フェリー）の乗り方:</strong><br>
        • <strong>出発港:</strong> ナポリ・ベヴェレッロ港（Molo Beverello - トレド通りから平坦な徒歩圏）<br>
        • <strong>船会社:</strong> SNAVまたはCaremar 高速水中翼船で<strong>約45〜50分</strong><br><br>
        2️⃣ <strong>青の洞窟（Grotta Azzurra）の冬季リアルチェック:</strong><br>
        • 冬場（11月〜2月）は波やうねりが高く、洞窟入口の水位が上がるため<strong>入場不可となる日が非常に多い</strong>です。フェリー運航状況と青の洞窟オープン状況は別個に確認が必要です。<br><br>
        3️⃣ <strong>シニア安心の旅程戦略:</strong><br>
        • 荷物はナポリのホテル（グランド・ホテル・オリエンテ）に預け、身軽なデイパックで日帰り訪問してください。天候不良時は無理せずナポリ旧市街（スパッカ・ナポリ）やポンペイ観光に切り替えるのが安心です！
      `;
    } else if (lang === 'en') {
      res = `
        ⛵ <strong>🇮🇹 Capri Island Ferry & Blue Grotto Practical Guide</strong>:<br><br>
        1️⃣ <strong>High-Speed Ferry Access:</strong><br>
        • <strong>Departure Port:</strong> Naples Molo Beverello Port (short flat walk from Toledo station).<br>
        • <strong>Operators:</strong> SNAV or Caremar hydrofoils take approx. <strong>45–50 mins</strong>.<br><br>
        2️⃣ <strong>Blue Grotto Winter Reality Check:</strong><br>
        • Off-peak/winter seasons (Nov–Feb) frequently experience high tide and rough swells that completely close the tiny cave mouth. Ferry departures and Blue Grotto entries are separate status checks!<br><br>
        3️⃣ <strong>Senior Travel Strategy:</strong><br>
        • Keep heavy luggage stationed at Grand Hotel Oriente in Naples and take a light daypack to Capri. If seas are choppy, pivot seamlessly to Naples Historic Center (Spaccanapoli) or Pompeii!
      `;
    } else if (lang === 'zh') {
      res = `
        ⛵ <strong>🇮🇹 卡普里岛轮渡与蓝洞实战攻略</strong>:<br><br>
        1️⃣ <strong>高速水翼轮渡乘坐方式：</strong><br>
        • <strong>出发码头：</strong> 那不勒斯Molo Beverello码头（距托莱多商圈平坦步行可达）。<br>
        • <strong>主要船司：</strong> SNAV 或 Caremar 高速水翼客船，航程约 <strong>45~50分钟</strong>。<br><br>
        2️⃣ <strong>蓝洞（Grotta Azzurra）冬季游览现实考量：</strong><br>
        • 11月~2月冬季风浪较大、海潮水位高，洞口狭窄极易关闭。轮渡开航与蓝洞开放是两个独立事项，务必提前查验！<br><br>
        3️⃣ <strong>长辈同行游览建议：</strong><br>
        • 将大件行李安放在那不勒斯酒店（Grand Hotel Oriente），携带轻便双肩包一日游。若遇恶劣天气，果断切换为那不勒斯老城（斯帕卡老街）或庞贝古城游览更为稳妥！
      `;
    } else {
      res = `
        ⛵ <strong>🇮🇹 카프리 섬 페리 탑승 &amp; 푸른 동굴 실전 검증 가이드</strong>:<br><br>
        1️⃣ <strong>페리 탑승 공식:</strong><br>
        • <strong>출발 항구:</strong> 나폴리 몰로 베베렐로(Molo Beverello) 항구 (톨레도역 번화가에서 도보 이동 가능)<br>
        • <strong>운항 선사:</strong> SNAV 또는 Caremar 고속 하이드로포일로 <strong>약 45 ~ 50분 소요</strong><br><br>
        2️⃣ <strong>푸른 동굴(Grotta Azzurra) 현실 체크:</strong><br>
        • 겨울철(11월~2월)에는 파도가 높거나 수위가 올라가 동굴 입구가 통제되는 날이 많습니다. 페리가 정상 운항하더라도 푸른 동굴 진입 가능 여부는 당일 아침 현지 상황을 별도로 확인하셔야 합니다.<br><br>
        3️⃣ <strong>부모님 동행 전략:</strong><br>
        • 캐리어는 나폴리 호텔(그랜드 호텔 오리엔테)에 맡겨두고 가벼운 데이팩 가방만 들고 다녀오세요. 날씨가 궂다면 무리해서 배를 타기보다 나폴리 구시가지(스파카 나폴리)나 폼페이 유적으로 대체하는 것이 현명합니다!
      `;
    }
    return res + renderFollowupChips(chips);
  }

  // ====================================================
  // 8. ROME 12-DAY FLEXIBLE PLAN & 4 THEMES (로마 12일 분산 일정)
  // ====================================================
  const isRomeFlexiblePlan = [
    '로마 12일', '로마 일정', '로마 테마', '로마 분산', '로마 코스', 'rome 12-day', 'rome 12 day', 'rome itinerary', 'rome themes', 'rome pacing',
    'ローマ12日間', 'ローマ日程', 'ローマテーマ', '罗马12天', '罗马行程', '罗马主题'
  ].some(w => q.includes(w) || cleanQ.includes(w));

  if (isRomeFlexiblePlan) {
    const chips = [
      { query: '성당 복장 규정 알려줘', label: '⛪ 성당 복장 규정' },
      { query: '피렌체에서 로마 이동법', label: '🚆 피렌체 ➔ 로마' },
      { query: '로마 3대 파스타 맛집', label: '🍝 로마 파스타' }
    ];

    let res = '';
    if (lang === 'ja') {
      res = `
        🏛️ <strong>🇮🇹 ローマ12日間 4大テーマゆったり分散日程ガイド</strong>:<br><br>
        ご両親の膝と体力を守るため、<strong>「午前1箇所観光 ➔ 午後ホテル休憩 ➔ 夕暮れ散歩」</strong>のリズムで楽しむ4大テーマです:<br><br>

        • <strong>テーマ 1: 古代ローマ帝国の栄光:</strong> コロッセオ、フォロ・ロマーノ、パンテオン（午前中の涼しい時間帯に平坦路を選んで散策）<br>
        • <strong>テーマ 2: バチカンと聖なる大聖堂:</strong> サン・ピエトロ大聖堂、バチカン美術館（オンライン事前予約で長蛇の列を完全回避）<br>
        • <strong>テーマ 3: ルネサンス＆バロックの路地:</strong> ナヴォーナ広場、トレビの泉、スペイン広場（石畳に疲れたらジェラート休憩）<br>
        • <strong>テーマ 4: テヴェレ川とトラステヴェレの美食:</strong> サンタンジェロ城の夜景と、トラステヴェレ地区の温かい下町トラットリア
      `;
    } else if (lang === 'en') {
      res = `
        🏛️ <strong>🇮🇹 Rome 12-Day Flexible Itinerary & 4 Senior Pacing Themes</strong>:<br><br>
        Structured around <strong>"1 morning major sight ➔ afternoon hotel rest ➔ leisurely sunset piazza stroll"</strong> to protect senior energy:<br><br>

        • <strong>Theme 1: Ancient Imperial Rome:</strong> Colosseum, Roman Forum, Pantheon (visited during gentle morning hours).<br>
        • <strong>Theme 2: Vatican & Papal Splendor:</strong> St. Peter's Basilica, Vatican Museums (advance timed skip-the-line reservations mandatory).<br>
        • <strong>Theme 3: Renaissance & Baroque Piazzas:</strong> Piazza Navona, Trevi Fountain, Spanish Steps with frequent espresso breaks.<br>
        • <strong>Theme 4: Tiber River & Trastevere Culinary:</strong> Castel Sant'Angelo panoramic sunset and authentic evening trattoria dinners in Trastevere.
      `;
    } else if (lang === 'zh') {
      res = `
        🏛️ <strong>🇮🇹 罗马12天 4大主题舒缓分流游览指南</strong>:<br><br>
        遵循<strong>“上午打卡一处核心胜地 ➔ 下午酒店午休调养 ➔ 傍晚漫步广场”</strong>的长辈专属节奏：<br><br>

        • <strong>主题 1：古罗马帝国辉煌：</strong> 斗兽场、古罗马广场、万神殿（清晨气温舒适平地漫步）。<br>
        • <strong>主题 2：梵蒂冈教廷圣境：</strong> 圣彼得大教堂、梵蒂冈博物馆（务必提前订好免排队门票）。<br>
        • <strong>主题 3：文艺复兴巴洛克街巷：</strong> 纳沃纳广场、特雷维许愿池、西班牙广场漫步品尝冰淇淋。<br>
        • <strong>主题 4：台伯河畔与特拉斯提弗列风味：</strong> 圣天使堡浪漫日落与地道平民餐馆慢调晚餐。
      `;
    } else {
      res = `
        🏛️ <strong>🇮🇹 로마 12일 분산 일정 &amp; 4대 테마 완벽 가이드</strong>:<br><br>
        부모님의 무릎과 허리를 지키기 위해 <strong>‘오전 핵심 1곳 ➔ 오후 호텔 휴식 ➔ 해질녘 광장 산책’</strong>의 여유로운 페이싱으로 구성된 4대 테마입니다:<br><br>

        • <strong>테마 1: 고대 로마 제국의 숨결:</strong> 콜로세움, 포로 로마노, 판테온 (아침 시간대 평지 위주 관람)<br>
        • <strong>테마 2: 바티칸과 가톨릭 성지:</strong> 성 베드로 대성당, 바티칸 박물관 (공식 앱 사전 모바일 예약 필수)<br>
        • <strong>테마 3: 르네상스 &amp; 바로크 낭만 골목:</strong> 나보나 광장, 트레비 분수, 스페인 계단 (중간중간 노천 카페 휴식)<br>
        • <strong>테마 4: 테베레 강변 &amp; 트라스테베레 미식:</strong> 산탄젤로 성 야경 산책과 정겨운 로컬 식당(다 엔초 등)의 정통 파스타 만찬
      `;
    }
    return res + renderFollowupChips(chips);
  }

  // ====================================================
  // 9. FESTIVALS & 15 PANORAMIC NIGHT VIEWS (축제 & 15대 야경)
  // ====================================================
  const isFestivalsNightviews = [
    '야경', '야시장', '축제', '전망대', '석양', '일몰', '미켈란젤로 광장', '산 니콜라스', '몬주익', '산탄젤로 야경', '스페인 야경', '이탈리아 야경',
    'night view', 'night views', 'night market', 'festivals', 'sunset spots', 'mirador', 'piazzale michelangelo', 'san nicolas', 'montjuic', 'sant angelo night',
    '夜景', 'ナイトビュー', '夜市', '祭り', 'フェスティバル', '夕日', 'ミケランジェロ広場', 'サン・ニコラス展望台', 'モンジュイック',
    '夜景', '夜市', '节日', '观景台', '日落', '米开朗基罗广场', '圣尼古拉斯观景台', '蒙锥克山'
  ].some(w => q.includes(w) || cleanQ.includes(w));

  if (isFestivalsNightviews) {
    const chips = [
      { query: '30일 마스터 플래너 요약해줘', label: '📅 30일 마스터 플래너' },
      { query: '빠에야 피자 말고 다른 음식 추천', label: '🍽️ 빠에야·피자 외 미식' },
      { query: '소매치기 예방법 알려줘', label: '🚨 소매치기 안전' }
    ];

    let res = '';
    if (lang === 'ja') {
      res = `
        🌃 <strong>スペイン＆イタリア 厳選パノラマ夜景＆名物フェスティバル TOP 5</strong>:<br><br>
        日没の40分前から始まる美しいマジックアワーを家族で満喫できる名所です:<br><br>

        1️⃣ <strong>フィレンツェ・ミケランジェロ広場（Piazzale Michelangelo）:</strong> アルノ川とドゥオーモの赤いクーポラが夕陽に染まるトスカーナ随一の絶景（タクシー利用推奨）。<br>
        2️⃣ <strong>グラナダ・サン・ニコラス展望台（Mirador de San Nicolás）:</strong> シェラネバダ山脈を背景に黄金色にライトアップされるアルハンブラ宮殿の幻想美。<br>
        3️⃣ <strong>セビリア・スペイン広場＆トリアナ川辺:</strong> 夕暮れの暖かい街灯が反射する運河とフラメンコの生演奏。<br>
        4️⃣ <strong>ローマ・サンタンジェロ城の橋＆ピンチョの丘:</strong> ポポロ広場を見下ろすローマ最高のサンセットポイント。<br>
        5️⃣ <strong>バルセロナ・カルメルのブンカー（Bunkers）＆モンジュイックの丘:</strong> サグラダ・ファミリアと地中海を360度見渡すパノラマ。<br><br>
        🎉 <strong>代表的フェスティバル:</strong> セビリア春祭り（Feria de Abril - 華やかな衣装と馬車パレード）、フィレンツェ復活祭の山車爆発（Scoppio del Carro）など。
      `;
    } else if (lang === 'en') {
      res = `
        🌃 <strong>Top 5 Panoramic Night Views & Festivals in Spain & Italy</strong>:<br><br>
        Magnificent spots to experience the golden hour and twilight illumination without strenuous uphill climbs:<br><br>

        1️⃣ <strong>Florence · Piazzale Michelangelo:</strong> Spellbinding sunset panorama overlooking the Arno River, Ponte Vecchio, and Brunelleschi's Duomo dome (take a taxi up).<br>
        2️⃣ <strong>Granada · Mirador de San Nicolás:</strong> The illuminated Alhambra palace glowing gold against the snow-capped Sierra Nevada.<br>
        3️⃣ <strong>Seville · Plaza de España & Triana Waterfront:</strong> Golden lamplight illuminating the sweeping curved neo-Mudejar galleries and guitar melodies.<br>
        4️⃣ <strong>Rome · Castel Sant'Angelo Bridge & Pincio Terrace:</strong> Romantic view of St. Peter's dome and Piazza del Popolo bathed in amber twilight.<br>
        5️⃣ <strong>Barcelona · Bunkers del Carmel & Montjuïc Hill:</strong> 360-degree panorama over the Sagrada Família out to the Mediterranean Sea.<br><br>
        🎉 <strong>Key Festivals:</strong> Seville April Fair (Feria de Abril), Valencia Fallas, Florence Easter Cart Explosion (Scoppio del Carro).
      `;
    } else if (lang === 'zh') {
      res = `
        🌃 <strong>西班牙与意大利 5大巅峰全景夜景与传统节日精选</strong>:<br><br>
        无需过度劳累爬坡即可饱览日落余晖黄金时刻的绝美胜地：<br><br>

        1️⃣ <strong>佛罗伦萨 · 米开朗基罗广场（Piazzale Michelangelo）：</strong> 眺望阿尔诺河、老桥与百花大教堂穹顶日落霞光的托斯卡纳绝景（建议打车直达）。<br>
        2️⃣ <strong>格拉纳达 · 圣尼古拉斯观景台（Mirador de San Nicolás）：</strong> 远眺内华达雪山映衬下金碧辉煌的阿尔罕布拉宫全景。<br>
        3️⃣ <strong>塞维利亚 · 西班牙广场与特里亚纳河畔：</strong> 华灯初上时倒映在运河中的新穆德哈尔宫殿长廊与吉他声。<br>
        4️⃣ <strong>罗马 · 圣天使城堡桥与平丘山露台：</strong> 俯瞰人民广场与圣彼得大教堂穹顶的罗马最佳落日观景位。<br>
        5️⃣ <strong>巴塞罗那 · 迦密山碉堡（Bunkers）与蒙锥克山：</strong> 360度纵览圣家堂与地中海海天一色的广阔夜景。<br><br>
        🎉 <strong>特色民俗盛会：</strong> 塞维利亚四月节（盛装与马车游行）、瓦伦西亚法雅节、佛罗伦萨复活节彩车爆破盛典。
      `;
    } else {
      res = `
        🌃 <strong>스페인 &amp; 이탈리아 15대 파노라마 야경 &amp; 축제 가이드 TOP 5</strong>:<br><br>
        일몰 40분 전부터 펼쳐지는 황금빛 매직아워를 부모님과 함께 안전하고 편안하게 감상할 수 있는 대표 야경 포인트입니다:<br><br>

        1️⃣ <strong>피렌체 미켈란젤로 광장 (Piazzale Michelangelo):</strong> 아르노강과 두오모 쿠폴라가 붉게 물드는 토스카나 최고의 석양 명소 (올라가실 땐 택시 추천).<br>
        2️⃣ <strong>그라나다 산 니콜라스 전망대 (Mirador de San Nicolás):</strong> 시에라 네바다 눈 덮인 설산을 배경으로 알함브라 궁전이 황금빛으로 빛나는 환상의 야경.<br>
        3️⃣ <strong>세비야 스페인 광장 &amp; 트리아나 강변:</strong> 가로등 불빛이 반사되는 웅장한 아치 회랑과 거리 악사들의 플라멩코 선율.<br>
        4️⃣ <strong>로마 카스텔 산탄젤로 천사의 다리 &amp; 핀초 언덕:</strong> 포폴로 광장과 베드로 대성당 돔을 붉은 노을 속에서 바라보는 로맨틱 뷰포인트.<br>
        5️⃣ <strong>바르셀로나 몬주익 언덕 &amp; 카르멜 벙커:</strong> 사그라다 파밀리아와 지중해 바다가 한눈에 내려다보이는 360도 파노라마 전망대.<br><br>
        🎉 <strong>추천 축제:</strong> 세비야 4월 봄 축제(Feria de Abril - 마차와 플라멩코 의상 행렬), 피렌체 부활절 불의 마차 축제(Scoppio del Carro) 등.
      `;
    }
    return res + renderFollowupChips(chips);
  }


  // ====================================================
  // 10. CATEGORY GUIDES (FOOD, SHOPPING, SIGHTS, SAFETY, TRANSIT, ETC.)
  // ====================================================

  // Intent: Specific City Routes (Madrid-Seville, Madrid-Lisbon, Lisbon-Porto, Seville-Granada, Sintra)
  if (hasMadrid && hasSeville) {
    const chips = [
      { query: '세비야에서 그라나다 이동법', label: '🚆 세비야 ➔ 그라나다' },
      { query: '세비야 맛집 추천해줘', label: '🍽️ 세비야 맛집' },
      { query: '마드리드에서 리스본 어떻게 가?', label: '✈️ 마드리드 ➔ 리스본' }
    ];
    let res = '';
    if (lang === 'ja') {
      res = `
        🚆 <strong>🇪🇸 マドリード ➔ セビリア 高速鉄道移動ガイド</strong>:<br><br>
        1️⃣ <strong>高速鉄道 AVE / iryo:</strong><br>
        • <strong>所要時間:</strong> 直行で<strong>約2時間40分</strong><br>
        • <strong>運行区間:</strong> マドリード・アトーチャ（Atocha）駅 ➔ セビリア・サンタ・フスタ（Santa Justa）駅<br>
        • <strong>特徴:</strong> コルドバを経由して美しいアンダルシアのオリーブ畑を車窓から眺められます。駅前からはタクシーでホテルへ直行可能！
      `;
    } else if (lang === 'en') {
      res = `
        🚆 <strong>🇪🇸 Madrid ➔ Seville High-Speed Train (AVE) Guide</strong>:<br><br>
        1️⃣ <strong>High-Speed Rail AVE / iryo:</strong><br>
        • <strong>Travel Time:</strong> Approx. <strong>2 hrs 40 mins direct</strong>.<br>
        • <strong>Route:</strong> Madrid Atocha ➔ Seville Santa Justa.<br>
        • <strong>Highlights:</strong> Smooth, scenic passage through the rolling olive groves of Andalusia. Much more convenient than flights!
      `;
    } else if (lang === 'zh') {
      res = `
        🚆 <strong>🇪🇸 马德里 ➔ 塞维利亚 高铁（AVE）出行指南</strong>:<br><br>
        1️⃣ <strong>西班牙高铁 AVE / iryo：</strong><br>
        • <strong>运行耗时：</strong> 直达约<strong>2小时40分钟</strong>。<br>
        • <strong>运行区间：</strong> 马德里Atocha站 ➔ 塞维利亚Santa Justa站。<br>
        • <strong>行程体验：</strong> 途经科尔多瓦，沿途可尽情饱览安达卢西亚大片橄榄树庄园的迷人风光。
      `;
    } else {
      res = `
        🚆 <strong>🇪🇸 마드리드 ➔ 세비야 고속열차(AVE/iryo) 이동 가이드</strong>:<br><br>
        1️⃣ <strong>고속철도 직통:</strong><br>
        • <strong>소요 시간:</strong> 약 <strong>2시간 40분 직통</strong><br>
        • <strong>운행 구간:</strong> 마드리드 아토차(Atocha)역 ➔ 세비야 산타 후스타(Santa Justa)역<br>
        • <strong>특징:</strong> 코르도바를 거치며 안달루시아의 광활한 올리브 평원 풍경을 감상할 수 있습니다. 산타 후스타역 도착 후 구시가지 호텔 페르난도 3세까지 택시로 10분이면 편안히 도착합니다!
      `;
    }
    return res + renderFollowupChips(chips);
  }

  const isMadridToLisbonRoute = (hasMadrid && hasLisbon) || (isSpain && isPortugal && (hasRouteKeyword || ['이동', '국경', '비행기', '버스', '기차', 'transit', 'cross', 'flight', 'bus', 'train'].some(w => q.includes(w)))) || q.includes('alsa') || q.includes('omio') ||
    ['마드리드에서 리스본', '마드리드 리스본', '리스본에서 마드리드', '국경 이동', '국경 이동법', 'madrid to lisbon', 'lisbon to madrid', 'マドリードからリスボン', '马德里到里斯本'].some(w => q.includes(w));

  if (isMadridToLisbonRoute) {
    const chips = [
      { query: '리스본에서 포르투 이동법', label: '🚆 리스본 ➔ 포르투' },
      { query: '포르투갈 대표 음식 추천', label: '🥧 포르투갈 음식' },
      { query: '유로 환전 어떻게 해?', label: '💶 화폐/환전' }
    ];
    let res = '';
    if (lang === 'ja') {
      res = `
        ✈️ <strong>🇪🇸 マドリード ↔ 🇵🇹 リスボン 国境移動ベストガイド</strong>:<br><br>
        1️⃣ <strong>直行便（イベリア航空 / TAPポルトガル航空）- 一押し！ 🌟:</strong><br>
        • 所要時間: <strong>約1時間20分</strong><br>
        • シニア同伴時は長時間の陸路移動（8時間超）を避け、直行便を利用するのが圧倒的に疲労が少なくなります。<br><br>
        2️⃣ <strong>高速長距離バス（ALSA / FlixBus）:</strong><br>
        • 所要時間: 昼行約8時間 / 夜行約7時間30分<br>
        • 直前予約で航空券が高騰した際のバックアップとして有効です。
      `;
    } else if (lang === 'en') {
      res = `
        ✈️ <strong>🇪🇸 Madrid ↔ 🇵🇹 Lisbon Cross-Border Transit Guide</strong>:<br><br>
        1️⃣ <strong>Direct Flight (Iberia / TAP Portugal) - Strongly Recommended! 🌟:</strong><br>
        • Flight Duration: <strong>1 hr 20 mins</strong>.<br>
        • For families traveling with seniors, a short direct flight is vastly superior to grueling 8-hour bus journeys.<br><br>
        2️⃣ <strong>Express Coach (ALSA / FlixBus):</strong><br>
        • Travel Time: ~8 hours daytime / ~7.5 hours overnight.<br>
        • Budget fallback option if airfares spike last minute.
      `;
    } else if (lang === 'zh') {
      res = `
        ✈️ <strong>🇪🇸 马德里 ↔ 🇵🇹 里斯本 跨国跨境交通指南</strong>:<br><br>
        1️⃣ <strong>直飞航班（西班牙国家航空Iberia / 葡萄牙航空TAP）- 首选推荐！ 🌟：</strong><br>
        • 飞行耗时： 仅需<strong>1小时20分钟</strong>。<br>
        • 携父母同行务必选择直飞，可彻底免去乘坐8小时长途大巴的腰背劳顿。<br><br>
        2️⃣ <strong>城际长途大巴（ALSA / FlixBus）：</strong><br>
        • 行驶耗时： 日行约8小时 / 夜行约7.5小时。<br>
        • 临近出发机票价格飙升时的实惠备选方案。
      `;
    } else {
      res = `
        ✈️ <strong>🇪🇸 마드리드 ↔ 🇵🇹 리스본 국경 이동 완벽 가이드</strong>:<br><br>
        1️⃣ <strong>직항 항공편 (이베리아 / TAP 항공) - 가장 강력 추천! 🌟:</strong><br>
        • 비행 시간: <strong>약 1시간 20분</strong><br>
        • 부모님 동행 시 장거리 육로 이동(8시간 이상)의 피로를 피하려면 항공 직항이 정답입니다.<br><br>
        2️⃣ <strong>국제선 고속버스 (ALSA / FlixBus):</strong><br>
        • 소요 시간: 주간 약 8시간 / 야간 약 7시간 30분<br>
        • 직전에 항공권 가격이 급등했을 때의 경제적 대안입니다.
      `;
    }
    return res + renderFollowupChips(chips);
  }

  if (hasLisbon && hasPorto) {
    const chips = [
      { query: '포르투갈 대표 음식 추천', label: '🥧 포르투갈 음식' },
      { query: '리스본에서 신트라 가는 법', label: '🏰 리스본 ➔ 신트라' }
    ];
    let res = '';
    if (lang === 'ja') {
      res = `
        🚆 <strong>🇵🇹 リスボン ↔ ポルト 特急列車移動ガイド</strong>:<br><br>
        • <strong>ポルトガル鉄道（CP）特急 Alfa Pendular（AP）:</strong><br>
        • 所要時間: <strong>約2時間50分</strong> 直通<br>
        • 区間: リスボン・サンタ・アポローニア駅 ➔ ポルト・カンパーニャ駅（Campanhã）<br>
        • シニアの座席指定には1等車（Conforto）が静かで快適です。
      `;
    } else if (lang === 'en') {
      res = `
        🚆 <strong>🇵🇹 Lisbon ↔ Porto Express Train Guide</strong>:<br><br>
        • <strong>CP High-Speed Train Alfa Pendular (AP):</strong><br>
        • Travel Time: <strong>2 hrs 50 mins direct</strong>.<br>
        • Route: Lisbon Santa Apolónia ➔ Porto Campanhã.<br>
        • First Class (*Conforto*) is recommended for seniors with spacious seats and power sockets.
      `;
    } else if (lang === 'zh') {
      res = `
        🚆 <strong>🇵🇹 里斯本 ↔ 波尔图 特快火车出行指南</strong>:<br><br>
        • <strong>葡萄牙国铁（CP）特快列车 Alfa Pendular（AP）：</strong><br>
        • 运行耗时： 直达约<strong>2小时50分钟</strong>。<br>
        • 运行区间： 里斯本Santa Apolónia站 ➔ 波尔图Campanhã站。<br>
        • 推荐选择一等座（Conforto），车厢宽敞安静。
      `;
    } else {
      res = `
        🚆 <strong>🇵🇹 리스본 ↔ 포르투 특급열차 이동 가이드</strong>:<br><br>
        • <strong>포르투갈 국철(CP) 특급열차 알파 펜둘라르 (Alfa Pendular):</strong><br>
        • 소요 시간: 직통 <strong>약 2시간 50분</strong><br>
        • 운행 구간: 리스본 산타 아폴로니아역 ➔ 포르투 캄파냐(Campanhã)역<br>
        • 부모님 동행 시 좌석 간격이 넓고 조용한 1등석(Conforto)을 추천합니다.
      `;
    }
    return res + renderFollowupChips(chips);
  }

  if (hasSeville && hasGranada) {
    const chips = [
      { query: '알함브라 궁전 티켓팅 팁', label: '🏛️ 알함브라 예약 팁' },
      { query: '세비야 맛집 추천해줘', label: '🍽️ 세비야 맛집' }
    ];
    let res = '';
    if (lang === 'ja') {
      res = `
        🚆 <strong>🇪🇸 セビリア ➔ グラナダ 中距離列車＆バス移動ガイド</strong>:<br><br>
        • <strong>Renfe 中距離特急 Avant 列車:</strong> 所要時間約2時間30分直通（セビリア・サンタ・フスタ駅 ➔ グラナダ駅）<br>
        • <strong>ALSA 高級バス:</strong> 所要時間約3時間（プラサ・德・アルマス バスターミナル発）
      `;
    } else if (lang === 'en') {
      res = `
        🚆 <strong>🇪🇸 Seville ➔ Granada Medium-Distance Rail & Coach Guide</strong>:<br><br>
        • <strong>Renfe Avant High-Speed Train:</strong> ~2 hrs 30 mins direct from Seville Santa Justa to Granada.<br>
        • <strong>ALSA Premium Bus:</strong> ~3 hrs from Plaza de Armas station.
      `;
    } else if (lang === 'zh') {
      res = `
        🚆 <strong>🇪🇸 塞维利亚 ➔ 格拉纳达 交通指南</strong>:<br><br>
        • <strong>Renfe Avant 中距离特快列车：</strong> 直达耗时约2小时30分钟。<br>
        • <strong>ALSA 大巴：</strong> 耗时约3小时。
      `;
    } else {
      res = `
        🚆 <strong>🇪🇸 세비야 ➔ 그라나다 기차 &amp; 버스 이동 가이드</strong>:<br><br>
        • <strong>렌페 아반트 (Renfe Avant) 중거리 고속열차:</strong> 소요 시간 약 2시간 30분 직통 (세비야 산타 후스타 ➔ 그라나다역)<br>
        • <strong>ALSA 직행 버스:</strong> 소요 시간 약 3시간 (플라사 데 아르마스 터미널 발)
      `;
    }
    return res + renderFollowupChips(chips);
  }

  if (hasSintra || (hasLisbon && (q.includes('신트라') || q.includes('sintra')))) {
    const chips = [
      { query: '포르투갈 대표 음식 추천', label: '🥧 포르투갈 음식' },
      { query: '리스본에서 포르투 이동법', label: '🚆 리스본 ➔ 포르투' }
    ];
    let res = '';
    if (lang === 'ja') {
      res = `
        🏰 <strong>🇵🇹 リスボン ➔ シントラ（ペーナ宮殿）日帰り移動ガイド</strong>:<br><br>
        1️⃣ <strong>近郊列車（CP Urban Trains）:</strong> リスボン・ロシオ（Rossio）駅から約40分でシントラ駅に到着。<br>
        2️⃣ <strong>シニア同伴の最重要コツ:</strong> シントラ駅前からペーナ宮殿の山頂入口までは非常に急な坂道です。無理に歩かず<strong>Uberタクシーまたは434番循環バス</strong>で宮殿ゲートまで直行してください！
      `;
    } else if (lang === 'en') {
      res = `
        🏰 <strong>🇵🇹 Lisbon ➔ Sintra (Pena Palace) Day Trip Guide</strong>:<br><br>
        1️⃣ <strong>CP Urban Train:</strong> Depart from Rossio Station downtown, arriving at Sintra in ~40 mins.<br>
        2️⃣ <strong>Crucial Senior Comfort Advice:</strong> The ascent from Sintra Station to Pena Palace is steep and winding. Always hire an **Uber or board the 434 tourist bus** directly to the palace entry gate!
      `;
    } else if (lang === 'zh') {
      res = `
        🏰 <strong>🇵🇹 里斯本 ➔ 辛特拉（佩纳宫）一日游出行指南</strong>:<br><br>
        1️⃣ <strong>市郊轻轨（CP Urban Trains）：</strong> 从市区Rossio罗西奥火车站出发，车程约40分钟抵辛特拉火车站。<br>
        2️⃣ <strong>长辈同行无障碍贴士：</strong> 辛特拉火车站至佩纳宫山顶山路极度陡峭，切勿尝试步行，出站后直接搭乘 <strong>Uber网约车或434路专线巴士</strong>直达景区正门口！
      `;
    } else {
      res = `
        🏰 <strong>🇵🇹 리스본 ➔ 신트라(페나성) 당일치기 이동 가이드</strong>:<br><br>
        1️⃣ <strong>교외선 기차 (CP Urban Trains):</strong> 리스본 시내 로시오(Rossio)역에서 탑승, 약 40분 만에 신트라역 도착.<br>
        2️⃣ <strong>부모님 동행 시 필수 팁:</strong> 신트라역에서 페나 궁전 매표소까지는 경사가 매우 심한 산길입니다. 걸어 올라가지 마시고 역 앞에서 <strong>우버(Uber) 택시 또는 434번 순환 버스</strong>를 타고 궁전 정문까지 바로 올라가세요!
      `;
    }
    return res + renderFollowupChips(chips);
  }

  // Common Intent Flags
  const isFood = ['음식', '맛집', '먹거리', '식당', '미식', '푸드', '요리', '맛있는', 'food', 'restaurant', 'dining', 'eat', 'dish', 'cuisine', 'グルメ', 'レストラン', '料理', '美味しい', '名物', '美食', '餐厅', '吃', '菜肴'].some(w => q.includes(w) || cleanQ.includes(w));
  const isSpecificRestaurant = ['추천 식당', '추천 맛집', '식당 추천', '맛집 추천', '유명한 식당', '유명한 맛집', '어디서 먹', '레스토랑', 'restaurant', 'restaurants', 'dining place', 'おすすめレストラン', '名店', '推荐餐厅', '哪家好'].some(w => q.includes(w) || cleanQ.includes(w));
  const isShopping = ['쇼핑', '선물', '기념품', '특산품', '살것', '살만한', '기념', 'shopping', 'souvenir', 'gift', 'souvenirs', 'お土産', 'ショッピング', '買い物', '名産', '购物', '纪念品', '伴手礼', '特产'].some(w => q.includes(w) || cleanQ.includes(w));
  const isSights = ['관광', '명소', '볼거리', '가볼만한', '유적지', '핫플', '관광지', '투어', 'attraction', 'sights', 'sightseeing', 'must visit', 'tourist', '観光', '名所', '見どころ', 'スポット', '景点', '地标', '必去', '游览'].some(w => q.includes(w) || cleanQ.includes(w));
  const isWeather = ['날씨', '기온', '옷차림', '시기', '월', '겨울', '가을', '비', '추워', '따뜻', 'weather', 'climate', 'temperature', 'clothes', 'packing', 'when to visit', 'season', '天気', '気温', '服装', '季節', 'ベストシーズン', '雨', '寒い', '天气', '气温', '穿衣', '季节', '月份', '下雨'].some(w => q.includes(w) || cleanQ.includes(w));
  const isWater = ['생수', '물', '수돗물', '물갈이', '석회수', 'sin gas', 'con gas', 'carbonated', 'sparkling', 'mineral water', 'water', 'お水', '水', 'ミネラルウォーター', '炭酸水', '水道水', '矿泉水', '自来水', '气泡水'].some(w => q.includes(w) || cleanQ.includes(w));
  const isSafety = ['소매치기', '치안', '안전', '도난', '위험', '조심', '안전수칙', '사기', '경찰', 'pickpocket', 'safety', 'security', 'safe', 'theft', 'danger', 'scam', 'スリ', '治安', '安全', '盗難', '防犯', '危険', '詐欺', '防盗', '治安', '安全', '小偷', '危险', '骗局'].some(w => q.includes(w) || cleanQ.includes(w));
  const isTransit = ['기차', '지하철', '버스', '교통', '렌페', '메트로', '택시', '우버', '이동', '열차', 'train', 'metro', 'subway', 'bus', 'transit', 'transport', 'taxi', 'uber', 'renfe', '列車', '電車', '地下鉄', 'バス', '交通', 'タクシー', '移動', '火车', '高铁', '地铁', '公交', '大巴', '出租车', '打车', '交通'].some(w => q.includes(w) || cleanQ.includes(w));
  const isBudget = ['예산', '경비', '비용', '총액', '얼마', 'budget', 'cost', 'expense', 'price', 'total cost', '予算', '費用', '経費', 'いくら', '総額', '预算', '花费', '费用', '多少钱', '总价'].some(w => q.includes(w) || cleanQ.includes(w));
  const isCardCash = ['환전', '유로', '카드', '현금', '팁', '트래블로그', '트래블월렛', '화폐', '통화', 'card', 'cash', 'exchange', 'currency', 'euro', 'tip', 'tipping', '両替', 'カード', '現金', 'チップ', '通貨', 'ユーロ', '换汇', '刷卡', '现金', '小费', '货币', '欧元'].some(w => q.includes(w) || cleanQ.includes(w));
  const isTaxRefund = ['텍스리펀', '택스리펀', '세금환급', '면세', 'diva', 'tax refund', 'tax free', '免税', 'タックスリファンド', '税金還付', '退税', '免税退税'].some(w => q.includes(w) || cleanQ.includes(w));
  const isSeniorCare = ['부모님', '어르신', '노인', '휠체어', '평지', '무릎', '피로', '계단', 'senior', 'parents', 'elderly', 'wheelchair', 'accessible', 'barrier free', '高齢者', '両親', 'シニア', '車椅子', 'バリアフリー', '階段', '平坦', '父母', '长辈', '老人', '轮椅', '无障碍', '平地', '膝盖'].some(w => q.includes(w) || cleanQ.includes(w));

  // 10-1. FOOD & DINING INTENT
  if (isFood) {
    if (isItaly) {
      let res = '';
      if (lang === 'ja') {
        res = `
          🍕 <strong>イタリアを代表する必食グルメ TOP 4</strong>:<br><br>
          1️⃣ <strong>ナポリ本場の薪窯ピッツァ（Pizza Napoletana）:</strong> 外はサクッ、中はモチモチの生地に水牛モッツァレラとトマトの黄金比。<br>
          2️⃣ <strong>フィレンツェ風Tボーンステーキ（Bistecca alla Fiorentina）:</strong> キアニーナ牛の赤身肉を炭火で香ばしくレアに焼き上げた極上の肉料理。<br>
          3️⃣ <strong>ローマ3大パスタ:</strong> 本場カルボナーラ（生クリーム不使用）、アマトリチャーナ、カチョ・エ・ペペ。<br>
          4️⃣ <strong>インペパータ・ディ・コッツェ:</strong> ナポリ名物の黒胡椒を効かせたムール貝の白ワイン蒸し！
        `;
      } else if (lang === 'en') {
        res = `
          🍕 <strong>Iconic Italian Culinary Delights TOP 4</strong>:<br><br>
          1️⃣ <strong>Neapolitan Wood-Fired Pizza:</strong> Fluffy, airy crust charred to perfection with sweet San Marzano tomatoes and creamy buffalo mozzarella.<br>
          2️⃣ <strong>Bistecca alla Fiorentina:</strong> Florence's legendary thick-cut T-bone steak, grilled rare over wood embers with fragrant olive oil.<br>
          3️⃣ <strong>Rome's Holy Trinity of Pastas:</strong> Authentic Carbonara (guanciale & pecorino, no cream!), Amatriciana, and Cacio e Pepe.<br>
          4️⃣ <strong>Impepatata di Cozze:</strong> Neapolitan steamed mussels bursting with cracked black pepper and fresh lemon.
        `;
      } else if (lang === 'zh') {
        res = `
          🍕 <strong>意大利四大殿堂级必尝美食</strong>:<br><br>
          1️⃣ <strong>那不勒斯柴火窑烤披萨（Pizza Napoletana）：</strong> 边缘焦香蜂窝气孔，水牛奶酪配圣马扎诺番茄酸甜多汁。<br>
          2️⃣ <strong>佛罗伦萨T骨牛排（Bistecca alla Fiorentina）：</strong> 托斯卡纳奎宁牛原切厚炙，外焦里嫩，肉香四溢。<br>
          3️⃣ <strong>罗马三大灵魂意面：</strong> 正宗无奶油培根蛋酱面（Carbonara）、番茄风干猪面颊肉面（Amatriciana）与黑椒绵羊奶酪面（Cacio e Pepe）。<br>
          4️⃣ <strong>那不勒斯胡椒青口贝（Impepatata di Cozze）：</strong> 鲜美多汁，黑胡椒提味去腥，鲜掉眉毛！
        `;
      } else {
        res = `
          🍕 <strong>이탈리아 대표 명물 음식 TOP 4</strong>:<br><br>
          1️⃣ <strong>나폴리 정통 화덕피자:</strong> 겉은 바삭하고 속은 쫄깃한 도우에 신선한 산 마르차노 토마토와 버팔로 모짜렐라 치즈의 완벽한 풍미입니다.<br>
          2️⃣ <strong>피렌체 티본스테이크 (비스테카):</strong> 숯불에 겉은 바삭하게, 속은 부드러운 레어로 구워낸 토스카나 대표 고기 요리로 부모님 몸보신에 최고입니다.<br>
          3️⃣ <strong>로마 3대 정통 파스타:</strong> 생크림 없이 관찰레와 달걀노른자, 페코리노 치즈로만 맛을 낸 정통 카르보나라, 아마트리치아나, 카초 에 페페.<br>
          4️⃣ <strong>나폴리식 홍합찜 (임페파타 디 코체):</strong> 신선한 홍합에 통후추와 레몬즙을 듬뿍 뿌려 쪄낸 시원하고 칼칼한 해산물 요리입니다.
        `;
      }
      if (isSpecificRestaurant) res += renderMatchingDiningCards('italy');
      const chips = [
        { query: '이탈리아어 식당 필수 회화', label: '🇮🇹 이탈리아어 회화' },
        { query: '빠에야 피자 말고 다른 음식 추천', label: '🍽️ 빠에야·피자 외 미식' },
        { query: '나폴리에서 피렌체 이동법', label: '🚆 나폴리 ➔ 피렌체' }
      ];
      return res + renderFollowupChips(chips);
    }

    if (isPortugal) {
      let res = '';
      if (lang === 'ja') {
        res = `
          🥧 <strong>ポルトガルを代表する必食グルメ TOP 4</strong>:<br><br>
          1️⃣ <strong>パステル・デ・ナタ（エッグタルト）:</strong> ベレン地区発祥、サクサクのパイ生地に濃厚カスタード。<br>
          2️⃣ <strong>バカリャウ（干し鱈料理）:</strong> 365種類のレシピがある国民食。バカリャウ・ア・ブラスが食べやすくおすすめ。<br>
          3️⃣ <strong>フランセジーニャ（ポルト名物サンドイッチ）:</strong> チーズと肉を重ね特製ビールソースをかけた名物。<br>
          4️⃣ <strong>タコ料理（Polvo à Lagareiro）:</strong> オリーブオイルとガーリックで柔らかくローストしたタコ。
        `;
      } else if (lang === 'en') {
        res = `
          🥧 <strong>Iconic Portuguese Culinary Delights TOP 4</strong>:<br><br>
          1️⃣ <strong>Pastel de Nata (Custard Tart):</strong> Flaky caramelized puff pastry filled with warm velvety custard from Belém.<br>
          2️⃣ <strong>Bacalhau (Salted Cod):</strong> Cooked 365 ways, with Bacalhau à Brás being the most popular shred-potato dish.<br>
          3️⃣ <strong>Francesinha:</strong> Porto's legendary hearty sandwich stacked with meats, smothered in molten cheese and beer sauce.<br>
          4️⃣ <strong>Polvo à Lagareiro:</strong> Ultra-tender oven-roasted octopus drenched in aromatic garlic extra-virgin olive oil.
        `;
      } else if (lang === 'zh') {
        res = `
          🥧 <strong>葡萄牙四大必尝传统美食指南</strong>:<br><br>
          1️⃣ <strong>葡式蛋挞（Pastel de Nata）：</strong> 贝伦区发祥，外皮酥脆层次分明，蛋奶馅焦香滑嫩。<br>
          2️⃣ <strong>马介休鳕鱼（Bacalhau）：</strong> 拥有365种做法的国菜，金黄土豆丝炒鳕鱼（Bacalhau à Brás）最适宜长辈。<br>
          3️⃣ <strong>湿答答三明治（Francesinha）：</strong> 波尔图代表肉食夹心三明治，覆盖厚浓奶酪与微辣秘制酱汁。<br>
          4️⃣ <strong>橄榄油烤章鱼（Polvo à Lagareiro）：</strong> 大蒜优质橄榄油慢烤，章鱼肉质软烂弹牙。
        `;
      } else {
        res = `
          🥧 <strong>포르투갈 대표 명물 음식 TOP 4</strong>:<br><br>
          1️⃣ <strong>파스텔 드 나타 (에그타르트):</strong> 바삭한 페이스트리에 부드러운 커스터드 크림이 어우러진 대표 디저트입니다.<br>
          2️⃣ <strong>바칼라우 (대구 요리):</strong> 365가지 조리법이 있는 국민 요리로, 잘게 찢은 대구와 감자를 볶은 '바칼라우 아 브라스'를 추천합니다.<br>
          3️⃣ <strong>프란세지냐:</strong> 포르투의 명물 샌드위치로 햄, 소시지, 치즈를 듬뿍 올리고 특제 맥주 소스를 얹은 별미입니다.<br>
          4️⃣ <strong>문어 요리 (뽈보 아 라가레이루):</strong> 올리브 오일과 마늘을 둘러 오븐에 구워낸 연하고 쫄깃한 문어 요리입니다.
        `;
      }
      if (isSpecificRestaurant) res += renderMatchingDiningCards('portugal');
      const chips = [
        { query: '포르투갈 쇼핑 기념품 추천', label: '🎁 포르투갈 쇼핑 추천' },
        { query: '리스본에서 포르투 이동법', label: '🚆 리스본 ➔ 포르투' }
      ];
      return res + renderFollowupChips(chips);
    }

    if (isSpain || (!isItaly && !isPortugal && !isDubai)) {
      let res = '';
      if (lang === 'ja') {
        res = `
          🥘 <strong>スペインを代表する必食グルメ TOP 4</strong>:<br><br>
          1️⃣ <strong>イベリコ生ハム（Jamón Ibérico de Bellota）:</strong> どんぐりを食べて育った最高級黒豚の生ハム。<br>
          2️⃣ <strong>パエリア（Paella）:</strong> バレンシア発祥、サフランの香りと魚介の旨味を吸わせた伝統の米料理。<br>
          3️⃣ <strong>タパス＆ピンチョス（Tapas & Pintxos）:</strong> ガンバス・アル・アヒージョなど小皿料理の食べ歩き。<br>
          4️⃣ <strong>チュロス＆濃厚ホットチョコレート:</strong> 揚げたてサクサクのチュロスをビターチョコにディップ！
        `;
      } else if (lang === 'en') {
        res = `
          🥘 <strong>Iconic Spanish Culinary Delights TOP 4</strong>:<br><br>
          1️⃣ <strong>Jamón Ibérico de Bellota:</strong> Melt-in-your-mouth acorn-fed cured cured ham.<br>
          2️⃣ <strong>Authentic Paella:</strong> Traditional Valencian saffron rice simmered with rich seafood or rabbit & beans.<br>
          3️⃣ <strong>Tapas & Pintxos:</strong> Vibrant small plates ranging from sizzling garlic prawns (*Gambas al Ajillo*) to Iberian croquettes.<br>
          4️⃣ <strong>Churros con Chocolate:</strong> Crispy piped fritters dipped in thick, velvety dark drinking chocolate.
        `;
      } else if (lang === 'zh') {
        res = `
          🥘 <strong>西班牙四大地道美食名吃指南</strong>:<br><br>
          1️⃣ <strong>橡果饲伊比利亚火腿（Jamón Ibérico）：</strong> 油脂如大理石花纹般细腻，入口融化带有坚果香。<br>
          2️⃣ <strong>西班牙藏红花海鲜饭（Paella）：</strong> 颗粒饱满吸收浓郁高汤，伴有焦香黄金锅巴。<br>
          3️⃣ <strong>经典Tapas小吃：</strong> 蒜香大虾（Gambas al Ajillo）、土豆蛋饼与火腿炸丸子。<br>
          4️⃣ <strong>西班牙吉事果配热巧（Churros）：</strong> 刚出锅外脆里软的吉事果蘸上醇厚浓郁黑巧克力。
        `;
      } else {
        res = `
          🥘 <strong>스페인 대표 명물 음식 TOP 4</strong>:<br><br>
          1️⃣ <strong>이베리코 하몽 (Jamón Ibérico de Bellota):</strong> 도토리만 먹고 자란 흑돼지로 만든 풍미 깊은 최고급 생햄입니다.<br>
          2️⃣ <strong>정통 빠에야 (Paella):</strong> 사프란 향이 솔솔 나는 쌀에 신선한 해산물과 채소를 넣고 볶아낸 전통 쌀요리입니다.<br>
          3️⃣ <strong>타파스 (Tapas):</strong> 감바스 알 아히요(마늘 새우), 이베리코 크로켓 등 다양한 스페인식 핑거푸드입니다.<br>
          4️⃣ <strong>츄러스 &amp; 핫초콜릿:</strong> 갓 튀겨 바삭한 츄러스를 진한 다크 초콜릿에 푹 찍어 먹는 국민 간식입니다.
        `;
      }
      if (isSpecificRestaurant) res += renderMatchingDiningCards('spain');
      const chips = [
        { query: '빠에야 피자 말고 다른 음식 추천', label: '🍽️ 빠에야 외 미식 12선' },
        { query: '스페인 쇼핑 기념품 추천', label: '🎁 스페인 쇼핑 추천' },
        { query: '스페인 식당 소금 빼주세요 표현', label: '🧂 싱겁게 주문하는 법' }
      ];
      return res + renderFollowupChips(chips);
    }
  }

  // 10-2. SHOPPING & SOUVENIRS INTENT
  if (isShopping) {
    if (isItaly) {
      const chips = [
        { query: '스페인 쇼핑 기념품 추천', label: '🎁 스페인 쇼핑' },
        { query: '택스리펀 받는 법', label: '🛍️ 택스리펀 절차' }
      ];
      if (lang === 'ja') {
        return `
          🎁 <strong>イタリアで絶対に買うべきおすすめ土産 TOP 5</strong>:<br><br>
          1️⃣ <strong>フィレンツェ本革製品:</strong> 職人が手作業で仕立てる財布、ベルト、バッグ（サン・ロレンツォ市場など）。<br>
          2️⃣ <strong>トスカーナ産キャンティ・クラシコ＆最高級オリーブオイル:</strong> 肉料理に最高の芳醇な赤ワイン。<br>
          3️⃣ <strong>エスプレッソ豆（illy / Lavazza）＆ビアレッティ・モカエキスプレス:</strong> 自宅で本場カフェの味を再現。<br>
          4️⃣ <strong>トリュフオイル＆バルサミコ酢:</strong> パ스타やサラダに数滴で贅沢な香りが広がる美食土産。<br>
          5️⃣ <strong>ベネチアン・ムラーノガラス細工:</strong> 繊細で美しいペンダントやインテリア雑貨。
        ` + renderFollowupChips(chips);
      } else if (lang === 'en') {
        return `
          🎁 <strong>Top 5 Authentic Italian Souvenirs & Gifts</strong>:<br><br>
          1️⃣ <strong>Florence Artisanal Leather Goods:</strong> Handcrafted supple leather bags, jackets, and wallets from Tuscan tanneries.<br>
          2️⃣ <strong>Tuscan Chianti Classico Wine & Extra-Virgin Olive Oil:</strong> Robust world-renowned red wines and cold-pressed oils.<br>
          3️⃣ <strong>Italian Espresso Beans & Bialetti Moka Pot:</strong> Iconic stovetop coffee makers with Illy or Lavazza roast beans.<br>
          4️⃣ <strong>White Truffle Oil & Aged Modenese Balsamic Vinegar:</strong> Gourmet culinary delicacies for food lovers.<br>
          5️⃣ <strong>Murano Blown Glass:</strong> Hand-blown colorful jewelry and tableware from Venice.
        ` + renderFollowupChips(chips);
      } else if (lang === 'zh') {
        return `
          🎁 <strong>意大利必买TOP 5伴手礼与特产精选</strong>:<br><br>
          1️⃣ <strong>佛罗伦萨手工真皮皮具：</strong> 托斯卡纳传统手工制作的皮包、皮带与皮夹，质感极佳。<br>
          2️⃣ <strong>托斯卡纳经典基安蒂红酒（Chianti）与特级初榨橄榄油：</strong> 纯正地中海风味馈赠佳品。<br>
          3️⃣ <strong>意式浓缩咖啡豆与比乐蒂摩卡壶（Bialetti）：</strong> 在家轻松复刻正宗意式咖啡醇香。<br>
          4️⃣ <strong>白松露油与摩德纳陈年黑醋：</strong> 极具高级感的厨房提味神器。<br>
          5️⃣ <strong>威尼斯穆拉诺彩色手工玻璃工艺品：</strong> 色彩绚丽的吊坠与摆件。
        ` + renderFollowupChips(chips);
      } else {
        return `
          🎁 <strong>이탈리아 필수 쇼핑 &amp; 기념품 TOP 5</strong>:<br><br>
          1️⃣ <strong>피렌체 수제 가죽제품:</strong> 수백 년 가죽 공방의 장인들이 만든 지갑, 가방, 가죽 재킷 (가성비 최상).<br>
          2️⃣ <strong>토스카나 끼안티 클라시코 와인 &amp; 엑스트라 버진 올리브유:</strong> 깊은 풍미를 자랑하는 이탈리아 대표 특산품.<br>
          3️⃣ <strong>비알레티 모카포트 &amp; 일리/라바짜 커피 원두:</strong> 이탈리아 에스프레소의 감성을 집으로 가져가는 필수템.<br>
          4️⃣ <strong>화이트 트러플(송로버섯) 오일 &amp; 모데나 발사믹 식초:</strong> 파스타와 샐러드의 품격을 올려주는 고급 미식 선물.<br>
          5️⃣ <strong>베네치아 무라노 유리공예품:</strong> 영롱하고 다채로운 핸드메이드 유리잔과 액세서리.
        ` + renderFollowupChips(chips);
      }
    }

    if (isPortugal) {
      const chips = [
        { query: '스페인 쇼핑 기념품 추천', label: '🎁 스페인 쇼핑' },
        { query: '이탈리아 쇼핑 선물 추천', label: '🎁 이탈리아 쇼핑' }
      ];
      if (lang === 'ja') {
        return `
          🎁 <strong>ポルトガルで絶対に買うべきおすすめ土産 TOP 5</strong>:<br><br>
          1️⃣ <strong>バルセロスの雄鶏（Galo de Barcelos）:</strong> 幸運を呼ぶ陶器の置き物。<br>
          2️⃣ <strong>ポートワイン（Port Wine）:</strong> ドウロ渓谷産の芳醇で甘口の酒精強化ワイン。<br>
          3️⃣ <strong>高級デザイン缶詰（Conserveira de Lisboa）:</strong> 100年の伝統を誇るレトロなオイルサーディン。<br>
          4️⃣ <strong>天然コルク製品（Cork）:</strong> 世界シェア1位の軽くて丈夫なエコバッグや財布。<br>
          5️⃣ <strong>ベナモール（Benamôr）ハンドクリーム:</strong> 王室御用達の天然コスメ。
        ` + renderFollowupChips(chips);
      } else if (lang === 'en') {
        return `
          🎁 <strong>Top 5 Authentic Portuguese Souvenirs</strong>:<br><br>
          1️⃣ <strong>Rooster of Barcelos:</strong> Iconic ceramic symbol of good fortune.<br>
          2️⃣ <strong>Douro Port Wine:</strong> Velvety rich dessert wine from historic cellars.<br>
          3️⃣ <strong>Vintage Canned Sardines:</strong> Artistically wrapped historic tins.<br>
          4️⃣ <strong>Natural Cork Accessories:</strong> Water-resistant, ultralight bags and wallets.<br>
          5️⃣ <strong>Benamôr 1925 Hand Lotions:</strong> Historic royal botanical cosmetics.
        ` + renderFollowupChips(chips);
      } else if (lang === 'zh') {
        return `
          🎁 <strong>葡萄牙必买TOP 5伴手礼特产</strong>:<br><br>
          1️⃣ <strong>巴塞罗斯公鸡：</strong> 象征好运与正义的国家图腾吉祥摆件。<br>
          2️⃣ <strong>杜罗河波特酒：</strong> 醇厚香甜的高品质加度甜葡萄酒。<br>
          3️⃣ <strong>复古沙丁鱼鱼罐头：</strong> 拥有百年包装美学的艺术鱼罐头。<br>
          4️⃣ <strong>天然软木手工艺品：</strong> 轻便环保的软木钱包与杯垫。<br>
          5️⃣ <strong>Benamôr 1925皇室护手霜：</strong> 复古精致的天然杏仁润肤霜。
        ` + renderFollowupChips(chips);
      } else {
        return `
          🎁 <strong>포르투갈 필수 쇼핑 &amp; 기념품 TOP 5</strong>:<br><br>
          1️⃣ <strong>바르셀로스의 수탉:</strong> 행운을 상징하는 국민 도자기 공예품.<br>
          2️⃣ <strong>포트 와인:</strong> 달콤하고 묵직한 디저트 와인(테일러, 그라함 등).<br>
          3️⃣ <strong>디자인 정어리 통조림:</strong> 100년 전통의 빈티지 포장 선물.<br>
          4️⃣ <strong>천연 코르크 제품:</strong> 가볍고 방수성이 뛰어난 파우치와 지갑.<br>
          5️⃣ <strong>베나모르(Benamôr) 핸드크림:</strong> 왕실 납품 천연 핸드케어 화장품.
        ` + renderFollowupChips(chips);
      }
    }

    // Default: Spain Shopping
    const chips = [
      { query: '이탈리아 쇼핑 선물 추천', label: '🎁 이탈리아 쇼핑' },
      { query: '택스리펀 받는 법', label: '🛍️ 택스리펀(DIVA)' }
    ];
    if (lang === 'ja') {
      return `
        🎁 <strong>スペインで絶対に買うべきおすすめ土産 TOP 5</strong>:<br><br>
        1️⃣ <strong>最高級イベリコ生ハム（真空パック）:</strong> ハモン・イベリコ・デ・ベジョータ。<br>
        2️⃣ <strong>エキストラバージンオリーブオイル＆ラ・チナータ（La Chinata）コスメ:</strong> オリーブ由来の高品質オイルと石鹸。<br>
        3️⃣ <strong>トゥロン（Turrón）:</strong> アーモンドと蜂蜜で作るスペインの伝統銘菓。<br>
        4️⃣ <strong>エスパドリーユ靴:</strong> 天然ジュート底の履き心地の良いサンダル。<br>
        5️⃣ <strong>ロエベ（LOEWE）革製品＆ワイン（リオハ・リベラ）:</strong> スペイン王室御用達の高級ラグジュアリー。
      ` + renderFollowupChips(chips);
    } else if (lang === 'en') {
      return `
        🎁 <strong>Top 5 Authentic Spanish Souvenirs & Gifts</strong>:<br><br>
        1️⃣ <strong>Vacuum-Sealed Jamón Ibérico de Bellota:</strong> Top-tier cured Iberian ham slices.<br>
        2️⃣ <strong>Extra-Virgin Olive Oil & La Chinata Cosmetics:</strong> Cold-pressed oils and olive-oil botanical soaps.<br>
        3️⃣ <strong>Turrón Nougat:</strong> Traditional Spanish almond and honeycomb nougat confection.<br>
        4️⃣ <strong>Artisanal Espadrilles:</strong> Hand-stitched natural jute-sole canvas shoes (*alpargatas*).<br>
        5️⃣ <strong>LOEWE Luxury Leather & Rioja Red Wine:</strong> Royal warrant Spanish luxury fashion and vintage reds.
      ` + renderFollowupChips(chips);
    } else if (lang === 'zh') {
      return `
        🎁 <strong>西班牙必买TOP 5伴手礼与特产精选</strong>:<br><br>
        1️⃣ <strong>真空包装伊比利亚火腿切片：</strong> 顶级橡果黑猪肉火腿切片。<br>
        2️⃣ <strong>特级初榨橄榄油与La Chinata天然护肤品：</strong> 纯正橄榄油皂与护手霜。<br>
        3️⃣ <strong>杜隆杏仁糖（Turrón）：</strong> 西班牙百年传统坚果杏仁牛轧糖。<br>
        4️⃣ <strong>手工草编帆布鞋（Espadrilles）：</strong> 纯天然轻便透气。<br>
        5️⃣ <strong>LOEWE罗意威皮具与里奥哈顶级红酒：</strong> 西班牙皇室御用奢侈品与佳酿。
      ` + renderFollowupChips(chips);
    } else {
      return `
        🎁 <strong>스페인 필수 쇼핑 &amp; 기념품 TOP 5</strong>:<br><br>
        1️⃣ <strong>진공포장 이베리코 하몽 슬라이스:</strong> 최고 등급 베요타(Bellota) 등급의 깊은 풍미.<br>
        2️⃣ <strong>엑스트라 버진 올리브유 &amp; 라 치나타(La Chinata) 화장품:</strong> 천연 올리브로 만든 핸드크림과 비누.<br>
        3️⃣ <strong>뚜론 (Turrón):</strong> 꿀과 아몬드를 듬뿍 넣은 스페인 전통 간식.<br>
        4️⃣ <strong>에스파드류 (에스파드리유 신발):</strong> 천연 밑창으로 통풍이 잘되고 가벼운 전통 신발.<br>
        5️⃣ <strong>로에베(LOEWE) 가죽제품 &amp; 리오하 레드 와인:</strong> 스페인 왕실 납품 가죽 브랜드와 명품 와인.
      ` + renderFollowupChips(chips);
    }
  }

  // 10-3. SIGHTS & ATTRACTIONS INTENT
  if (isSights) {
    if (isItaly) {
      const chips = [
        { query: '성당 복장 규정 알려줘', label: '⛪ 성당 복장 규정' },
        { query: '로마 12일 분산 일정 테마', label: '🏛️ 로마 12일 일정' },
        { query: '나폴리에서 피렌체 이동법', label: '🚆 나폴리 ➔ 피렌체' }
      ];
      if (lang === 'ja') {
        return `
          🏛️ <strong>イタリア必見の主要観光名所 TOP 4</strong>:<br><br>
          1️⃣ <strong>コロッセオ＆フォロ・ロマーノ（ローマ）:</strong> 古代帝国の中心地。入場には時間指定予約が必須です。<br>
          2️⃣ <strong>サン・ピエトロ大聖堂＆バチカン美術館（バチカン）:</strong> カトリックの総本山とミケランジェロのシスティーナ礼拝堂（服装規定に注意）。<br>
          3️⃣ <strong>ドゥオーモ＆ウフィツィ美術館（フィレンツェ）:</strong> ルネサンス発祥の地。花の大聖堂とボッティチェリの名作群。<br>
          4️⃣ <strong>スパッカ・ナポリ＆ポンペイ遺跡（ナポリ）:</strong> 活気あふれるナポリ旧市街と、時が止まった古代ローマのポンペイ。
        ` + renderFollowupChips(chips);
      } else if (lang === 'en') {
        return `
          🏛️ <strong>Top 4 Must-Visit Attractions in Italy</strong>:<br><br>
          1️⃣ <strong>Colosseum & Roman Forum (Rome):</strong> Heart of the ancient empire. Timed mobile tickets mandatory in advance.<br>
          2️⃣ <strong>St. Peter's Basilica & Vatican Museums (Vatican):</strong> Michelangelo's Sistine Chapel and papal treasures (strict dress code applies!).<br>
          3️⃣ <strong>Florence Duomo & Uffizi Gallery:</strong> The epicenter of the Renaissance, featuring Botticelli's *Birth of Venus*.<br>
          4️⃣ <strong>Spaccanapoli & Pompeii Archaeological Park (Naples):</strong> Vibrant Neapolitan alleys and ancient Roman streets preserved in volcanic ash.
        ` + renderFollowupChips(chips);
      } else if (lang === 'zh') {
        return `
          🏛️ <strong>意大利四大必游核心地标指南</strong>:<br><br>
          1️⃣ <strong>古罗马斗兽场与古罗马广场（罗马）：</strong> 帝国千年底蕴所在，务必提前预约分时门票。<br>
          2️⃣ <strong>圣彼得大教堂与梵蒂冈博物馆（梵蒂冈）：</strong> 教廷艺术宝库与西斯廷礼拜堂（安检着装要求严格）。<br>
          3️⃣ <strong>圣母百花大教堂与乌菲兹美术馆（佛罗伦萨）：</strong> 文艺复兴摇篮与波提切利传世画作。<br>
          4️⃣ <strong>那不勒斯老街与庞贝古城遗址（那不勒斯）：</strong> 充满市井烟火气的历史街区与凝固千年的古罗马城市。
        ` + renderFollowupChips(chips);
      } else {
        return `
          🏛️ <strong>이탈리아 필수 핵심 명소 TOP 4</strong>:<br><br>
          1️⃣ <strong>콜로세움 &amp; 포로 로마노 (로마):</strong> 고대 로마 제국의 위엄을 느낄 수 있는 핵심 유적 (사전 모바일 시간 예약 필수).<br>
          2️⃣ <strong>성 베드로 대성당 &amp; 바티칸 미술관 (바티칸):</strong> 미켈란젤로의 천지창조와 피에타가 있는 성지 (복장 규정 철저 준수).<br>
          3️⃣ <strong>피렌체 두오모 &amp; 우피치 미술관:</strong> 르네상스의 꽃을 피운 붉은 쿠폴라와 보티첼리의 걸작 비너스의 탄생.<br>
          4️⃣ <strong>나폴리 구시가지(스파카 나폴리) &amp; 폼페이 유적:</strong> 활기찬 남부의 삶과 화산재 속에 보존된 고대 도시의 흔적.
        ` + renderFollowupChips(chips);
      }
    }

    if (isPortugal) {
      const chips = [
        { query: '리스본에서 신트라 가는 법', label: '🏰 리스본 ➔ 신트라' },
        { query: '포르투갈 대표 음식 추천', label: '🥧 포르투갈 대표 음식' }
      ];
      if (lang === 'ja') {
        return `
          🏛️ <strong>ポルトガルの必見観光名所 TOP 4</strong>:<br><br>
          1️⃣ <strong>ジェロニモス修道院＆ベレンの塔（リスボン）:</strong> マヌエル様式の最高傑作。<br>
          2️⃣ <strong>ペーナ宮殿（シントラ）:</strong> カラフルな山頂の王宮（Uber利用推奨）。<br>
          3️⃣ <strong>ドン・ルイス1世橋（ポルト）:</strong> ドウロ川の壮大なパノラマ二重鉄橋。<br>
          4️⃣ <strong>サン・ベント駅（ポルト）:</strong> 2万枚のアズレージョ装飾タイル。
        ` + renderFollowupChips(chips);
      } else if (lang === 'en') {
        return `
          🏛️ <strong>Top 4 Must-Visit Attractions in Portugal</strong>:<br><br>
          1️⃣ <strong>Jerónimos Monastery & Belém Tower (Lisbon):</strong> Manueline architectural triumphs by the Tagus river.<br>
          2️⃣ <strong>Pena Palace (Sintra):</strong> Fairytale Romanticist castle atop Sintra’s misty hills.<br>
          3️⃣ <strong>Dom Luís I Bridge (Porto):</strong> Double-deck iron arch bridge overlooking the Douro river.<br>
          4️⃣ <strong>São Bento Railway Station (Porto):</strong> 20,000 hand-painted blue azulejo tiles.
        ` + renderFollowupChips(chips);
      } else if (lang === 'zh') {
        return `
          🏛️ <strong>葡萄牙四大必游地标景区指南</strong>:<br><br>
          1️⃣ <strong>热罗尼莫斯修道院与贝伦塔（里斯本）：</strong> 曼努埃尔风格建筑奇迹。<br>
          2️⃣ <strong>佩纳宫（辛特拉）：</strong> 山巅童话城堡（建议搭乘Uber直达山顶入口）。<br>
          3️⃣ <strong>路易一世大桥（波尔图）：</strong> 杜罗河畔落日双层铁桥。<br>
          4️⃣ <strong>圣本笃火车站（波尔图）：</strong> 2万片手工彩绘青花瓷砖世界最美火车站。
        ` + renderFollowupChips(chips);
      } else {
        return `
          🏛️ <strong>포르투갈 필수 핵심 명소 TOP 4</strong>:<br><br>
          1️⃣ <strong>제로니무스 수도원 &amp; 벨렝탑 (리스본):</strong> 대항해시대의 영광을 담은 마누엘 양식 걸작.<br>
          2️⃣ <strong>페나 국립왕궁 (신트라):</strong> 산 정상에 우뚝 솟은 동화 같은 알록달록한 성 (우버/버스 탑승 권장).<br>
          3️⃣ <strong>동 루이스 1세 다리 &amp; 히베이라 (포르투):</strong> 에펠의 제자가 설계한 2층 철교 석양 뷰포인트.<br>
          4️⃣ <strong>상벤투 기차역 (포르투):</strong> 2만 장의 푸른 아줄레주 타일 벽화가 펼쳐지는 역.
        ` + renderFollowupChips(chips);
      }
    }

    // Default: Spain Sights
    const chips = [
      { query: '바르셀로나에서 마드리드 어떻게 가?', label: '🚆 바르셀로나 ➔ 마드리드' },
      { query: '알함브라 궁전 티켓팅 팁', label: '🏛️ 알함브라 예약 팁' },
      { query: '소매치기 예방법 알려줘', label: '🚨 소매치기 안전' }
    ];
    if (lang === 'ja') {
      return `
        🏛️ <strong>スペインの必見観光名所 TOP 4</strong>:<br><br>
        1️⃣ <strong>サグラダ・ファミリア＆グエル公園（バルセロナ）:</strong> ガウディ芸術の頂点。入場制限があるため1〜2ヶ月前の予約が必須！<br>
        2️⃣ <strong>アルハンブラ宮殿（グラナダ）:</strong> イスラム建築の最高峰ナスル朝宮殿。<br>
        3️⃣ <strong>セビリア大聖堂＆スペイン広場:</strong> コロンブスの棺が眠る世界最大級の大聖堂。<br>
        4️⃣ <strong>プラド美術館＆王宮（マドリード）:</strong> ベラスケスやゴヤの名作を収蔵。
      ` + renderFollowupChips(chips);
    } else if (lang === 'en') {
      return `
        🏛️ <strong>Top 4 Must-Visit Attractions in Spain</strong>:<br><br>
        1️⃣ <strong>Sagrada Família & Park Güell (Barcelona):</strong> Antoni Gaudí's unfinished architectural marvel (book 1–2 months ahead!).<br>
        2️⃣ <strong>Alhambra Palace (Granada):</strong> The pinnacle of Moorish Islamic architecture and Generalife gardens.<br>
        3️⃣ <strong>Seville Cathedral & Plaza de España:</strong> Christopher Columbus's tomb and vast neo-Mudejar pavilions.<br>
        4️⃣ <strong>Prado Museum & Royal Palace (Madrid):</strong> Masterpieces by Velázquez, Goya, and El Greco.
      ` + renderFollowupChips(chips);
    } else if (lang === 'zh') {
      return `
        🏛️ <strong>西班牙四大必游核心景点指南</strong>:<br><br>
        1️⃣ <strong>圣家堂与古埃尔公园（巴塞罗那）：</strong> 高迪建筑巅峰杰作，务必提前1~2个月预定门票！<br>
        2️⃣ <strong>阿尔罕布拉宫（格拉纳达）：</strong> 摩尔伊斯兰文明辉煌绝唱与轩辕花园。<br>
        3️⃣ <strong>塞维利亚大教堂与西班牙广场：</strong> 哥伦布灵柩安息地与壮美新穆德哈尔回廊。<br>
        4️⃣ <strong>普拉多博物馆与马德里王宫（马德里）：</strong> 收藏委拉斯开兹与戈雅绝世画作。
      ` + renderFollowupChips(chips);
    } else {
      return `
        🏛️ <strong>스페인 필수 핵심 명소 TOP 4</strong>:<br><br>
        1️⃣ <strong>사그라다 파밀리아 &amp; 구엘 공원 (바르셀로나):</strong> 가우디 예술의 정점입니다. 시간대별 정원 제한이 엄격하므로 최소 1~2개월 전 공식 앱 사전 예매가 필수입니다!<br>
        2️⃣ <strong>알함브라 궁전 (그라나다):</strong> 이슬람 건축의 극치 나스르 궁전과 헤네랄리페 정원.<br>
        3️⃣ <strong>세비야 대성당 &amp; 스페인 광장:</strong> 콜럼버스의 유해가 안치된 유럽 3대 성당과 웅장한 반원형 회랑.<br>
        4️⃣ <strong>프라도 미술관 &amp; 마드리드 왕궁:</strong> 벨라스케스, 고야의 명작이 가득한 세계 3대 미술관.
      ` + renderFollowupChips(chips);
    }
  }

  // 10-4. SAFETY & PICKPOCKETS INTENT
  if (isSafety) {
    const chips = [
      { query: '이탈리아 기차 예매 팁', label: '🚄 이탈리아 기차 팁' },
      { query: '부모님 모시고 가기 좋은 평지 휠체어 코스', label: '🦽 부모님 평지 코스' },
      { query: '트래블로그 카드 결제랑 현금 환전 비율', label: '💳 카드/환전 비율' }
    ];
    if (lang === 'ja') {
      return `
        🚨 <strong>スペイン・イタリア旅行 スリ予防＆治安対策完全ガイド</strong>:<br><br>
        📸 <strong>1. 写真撮影の注意（見知らぬ人にスマホを渡しても大丈夫？）:</strong><br>
        • ❌ <strong>絶対に頼んではいけない相手:</strong> 観光地周辺を暇そうにうろつく人、先に「撮ってあげようか？」と声をかけてくる人（100%持ち逃げの手口）、ジプシー風集団。<br>
        • ⭕ <strong>安全に頼める相手:</strong> 日本人・韓国人観光客、望遠一眼レフを首に提げた欧米人観光客、ベビーカーを押すファミリー、レストラン店員や警備員。<br><br>
        🎒 <strong>2. ご両親と守る「所持品防御の3箇条」:</strong><br>
        ① <strong>カバンは必ず「前」、手は「ファスナーの上」:</strong> リュックは厳禁。斜め掛けバッグを前に掛けましょう。<br>
        ② <strong>飲食店のテーブルにスマホを置かない:</strong> 地図や新聞紙を広げて視界を遮り、紙の下のスマホを盗み取ります。<br>
        ③ <strong>要注意エリア:</strong> ローマの64番・40番バス、バルセロナ地下鉄3号線、テルミニ駅周辺。<br><br>
        🚖 <strong>シニア移動の知恵:</strong> 駅や観光地間の移動には<strong>Uber・FREE NOW配車タクシー</strong>を利用すれば、階段の昇降とスリの危険を100%回避できます！
      ` + renderFollowupChips(chips);
    } else if (lang === 'en') {
      return `
        🚨 <strong>Spain & Italy Travel Pickpocket Prevention & Safety Guide</strong>:<br><br>
        📸 <strong>1. Photo Rules: Can I Hand My Phone to Strangers?</strong><br>
        • ❌ <strong>NEVER ask:</strong> Idly loitering locals; anyone approaching first asking *"Take a picture?"* (100% snatch & run scam); Romani/gypsy dressed groups.<br>
        • ⭕ <strong>Safe to ask:</strong> Asian tourists; Western travelers carrying expensive telephoto DSLR cameras; families with strollers; restaurant staff or museum security guards.<br><br>
        🎒 <strong>2. The 3 Golden Defense Rules:</strong><br>
        ① <strong>Bags always worn in FRONT with hand resting on the zipper:</strong> Never keep valuables in rear backpacks or jacket pockets.<br>
        ② <strong>Never leave phones on outdoor dining tables:</strong> Distraction thieves drape maps or cardboard over your phone to swipe it.<br>
        ③ <strong>High-risk hotspots:</strong> Rome Buses 64 & 40, Barcelona Metro Line 3 (Liceu/Catalunya), Madrid Sol station.<br><br>
        🚖 <strong>Senior Comfort Tip:</strong> Using **Uber / FREE NOW taxis** door-to-door eliminates pickpocket exposure and tiring subway staircases!
      ` + renderFollowupChips(chips);
    } else if (lang === 'zh') {
      return `
        🚨 <strong>西班牙与意大利防盗防偷全方位安全攻略</strong>:<br><br>
        📸 <strong>1. 拍照安全（能让路人帮忙拍合影吗？）:</strong><br>
        • ❌ <strong>绝对不能委托的人群：</strong> 景区附近闲逛搭讪者、主动上前问“帮你拍照好吗？”的人（100%夺机抢跑）、吉普赛装束团伙。<br>
        • ⭕ <strong>安全可委托的人群：</strong> 亚洲游客、胸前挂着昂贵长焦单反相机的欧美摄影游客、推婴儿车的家庭、餐馆服务员与展馆安保。<br><br>
        🎒 <strong>2. 与长辈同行的“防盗三大铁律”：</strong><br>
        ① <strong>包包必须背在正前方，手搭在拉链上：</strong> 严禁背双肩包或将手机放在外衣口袋。<br>
        ② <strong>餐厅就餐切勿把手机放在餐桌上：</strong> 调虎离山盗贼会拿地图或硬纸板遮挡视线趁机顺走手机。<br>
        ③ <strong>高危区域重点提防：</strong> 罗马64路/40路公交、巴塞罗那地铁3号线、马德里太阳门广场。<br><br>
        🚖 <strong>长辈省力避坑：</strong> 城市间短途游览多用 <strong>Uber 或 FREE NOW 官方打车软件</strong>，既免除地铁爬楼梯，又可100%隔绝小偷！
      ` + renderFollowupChips(chips);
    } else {
      return `
        🚨 <strong>스페인 &amp; 이탈리아 여행 소매치기 예방 및 치안 실전 가이드</strong>:<br><br>
        📸 <strong>1. 사진 촬영 주의 (모르는 사람에게 핸드폰 맡겨도 될까요?):</strong><br>
        • ❌ <strong>절대 맡기면 안 되는 상대:</strong> 관광지 주변을 배회하는 사람, 먼저 다가와 "사진 찍어줄까?" 묻는 사람 (100% 들고 튀는 수법), 집시풍 무리.<br>
        • ⭕ <strong>안전하게 부탁할 수 있는 상대:</strong> 한국인/동양인 관광객, 목에 무거운 망원 DSLR 카메라를 멘 서양인 여행객 (자기 장비가 더 비싸 도주 위험 0%), 유모차를 끄는 가족, 식당 직원이나 유적지 경비원.<br><br>
        🎒 <strong>2. 부모님과 함께 지킬 '소지품 방어 3대 원칙':</strong><br>
        ① <strong>가방은 무조건 '앞으로', 손은 '지퍼 위'에:</strong> 백팩은 절대 금물입니다. 크로스백을 앞으로 메고 손을 지퍼에 얹으세요.<br>
        ② <strong>식당 야외 테이블 위에 스마트폰 올려두지 않기:</strong> 지도나 종이를 들이밀어 시야를 가린 뒤 밑의 폰을 가로챕니다.<br>
        ③ <strong>고위험 주의 구간:</strong> 로마 64번·40번 버스, 바르셀로나 지하철 3호선, 마드리드 솔 광장.<br><br>
        🚖 <strong>부모님 안심 팁:</strong> 관광지 간 이동 시 <strong>우버(Uber) 또는 FREE NOW 택시</strong>를 타시면 계단 오르내림과 소매치기 위험을 100% 차단할 수 있습니다!
      ` + renderFollowupChips(chips);
    }
  }

  // 10-5. WATER & GROCERIES INTENT
  if (isWater) {
    const chips = [
      { query: '식당과 여행 필수 서바이벌 회화', label: '🗣️ 24선 필수 회화' },
      { query: '소매치기 예방법 알려줘', label: '🚨 소매치기 안전' }
    ];
    if (lang === 'ja') {
      return `
        💧 <strong>スペイン＆イタリア スーパーでの水の見分け方＆お湯の頼み方</strong>:<br><br>
        1️⃣ <strong>炭酸水 vs 普通の水の区別:</strong><br>
        • 🇪🇸 <strong>Agua sin gas</strong>（アグア・シン・ガス）/ 🇮🇹 <strong>Acqua naturale</strong>（アクア・ナチュラーレ）: 炭酸なしの普通のミネラルウォーター（ピンクや青のキャップが多い）。<br>
        • 🇪🇸 <strong>Agua con gas</strong> / 🇮🇹 <strong>Acqua frizzante</strong>: シュワシュワした炭酸水。<br><br>
        2️⃣ <strong>石灰水と体調管理:</strong><br>
        • ヨーロッパの水道水は硬水（石灰分）のため、お腹の弱いご両親には市販のボトル入りの水を常時携行してください。<br>
        • レストランでは「温かいお湯（Agua caliente / Acqua calda）」を注文できます！
      ` + renderFollowupChips(chips);
    } else if (lang === 'en') {
      return `
        💧 <strong>Spain & Italy Supermarket Bottled Water & Warm Water Guide</strong>:<br><br>
        1️⃣ <strong>Still vs Sparkling Water:</strong><br>
        • 🇪🇸 <strong>Agua sin gas</strong> / 🇮🇹 <strong>Acqua naturale</strong>: Plain still mineral water (usually blue or pink caps).<br>
        • 🇪🇸 <strong>Agua con gas</strong> / 🇮🇹 <strong>Acqua frizzante</strong>: Carbonated sparkling water.<br><br>
        2️⃣ <strong>Tap Water Caution for Seniors:</strong><br>
        • Tap water across Southern Europe is hard with high mineral/lime content. Always purchase bottled still mineral water for elderly travelers to avoid upset stomachs.<br>
        • Request warm drinking water at restaurants using *"Agua caliente, por favor"* or *"Acqua calda, per favore"*.
      `;
    } else if (lang === 'zh') {
      return `
        💧 <strong>西班牙与意大利 超市选购矿泉水与温水实用指南</strong>:<br><br>
        1️⃣ <strong>纯净水与气泡水区分：</strong><br>
        • 🇪🇸 <strong>Agua sin gas</strong> / 🇮🇹 <strong>Acqua naturale</strong>：普通纯净水（无气泡水，多为蓝盖或粉盖）。<br>
        • 🇪🇸 <strong>Agua con gas</strong> / 🇮🇹 <strong>Acqua frizzante</strong>：含气气泡矿泉水。<br><br>
        2️⃣ <strong>长辈水质胃肠呵护：</strong><br>
        • 南欧自来水多为富含钙镁的硬水，肠胃敏感的长辈务必饮用超市瓶装水。<br>
        • 餐馆用餐可礼貌索取温开水：西语 *“Agua caliente”* / 意语 *“Acqua calda”*。
      `;
    } else {
      return `
        💧 <strong>스페인 &amp; 이탈리아 마트 생수 구별법 &amp; 온수 요청 꿀팁</strong>:<br><br>
        1️⃣ <strong>탄산수 vs 일반 생수 라벨 구별:</strong><br>
        • 🇪🇸 <strong>Agua sin gas</strong> (아과 신 가스) / 🇮🇹 <strong>Acqua naturale</strong> (아콰 나투랄레): 탄산 없는 일반 생수 (주로 파란색/분홍색 뚜껑).<br>
        • 🇪🇸 <strong>Agua con gas</strong> (아과 콘 가스) / 🇮🇹 <strong>Acqua frizzante</strong> (아콰 프리잔테): 톡 쏘는 탄산수.<br><br>
        2️⃣ <strong>석회수 주의 &amp; 부모님 온수 보온병:</strong><br>
        • 유럽 수돗물은 석회질이 많아 배탈이 나기 쉬우니 양치 후 헹굼이나 음용수는 반드시 마트 생수를 이용하세요.<br>
        • 식당에서 "아과 칼리엔테, 포르 파보르(Agua caliente)" 또는 "아콰 칼다(Acqua calda)"라고 하시면 따뜻한 물을 친절하게 내어줍니다!
      `;
    }
    return res + renderFollowupChips(chips);
  }

  // 10-6. SENIOR MOBILITY & BARRIER-FREE INTENT
  if (isSeniorCare) {
    const chips = [
      { query: '30일 마스터 플래너 요약해줘', label: '📅 30일 마스터 플래너' },
      { query: '식당과 여행 필수 서바이벌 회화', label: '🗣️ 24선 필수 회화' },
      { query: '소매치기 예방법 알려줘', label: '🚨 소매치기 안전' }
    ];
    if (lang === 'ja') {
      return `
        👵 <strong>シニアご両親同伴旅行・安心の心得 TOP 4</strong>:<br><br>
        1️⃣ <strong>石畳と坂道の攻略:</strong> リスボンやローマの石畳は足腰に負担がかかるため、無理に歩かず<strong>Uberやタクシー</strong>を積極的に利用して目的地のエレベーターや玄関前まで直行しましょう。<br>
        2️⃣ <strong>ゆとりのある日程設定:</strong> 午前1箇所、午後1箇所を基本とし、午後にカフェで温かいお茶とスイーツを楽しむ休憩時間を確保してください。<br>
        3️⃣ <strong>食事の塩分配慮:</strong> レストランでは「塩控えめ（Sin sal / Poco sale）」と伝えると、ご両親のお口に合う優しい味付けで召し上がれます。<br>
        4️⃣ <strong>高速鉄道の活用:</strong> 都市間移動は空港手続きの負担がない<strong>高速鉄道（AVE/Italo）のビジネスクラス</strong>を予約するのが最も快適です！
      ` + renderFollowupChips(chips);
    } else if (lang === 'en') {
      return `
        👵 <strong>Top 4 Senior Care & Accessibility Principles for Family Travel</strong>:<br><br>
        1️⃣ <strong>Cobblestones & Hill Navigation:</strong> Never hesitate to take an **Uber/taxi** directly to site entry gates to bypass fatiguing uneven paving.<br>
        2️⃣ <strong>Relaxed Daily Pacing:</strong> Limit schedules to 1 primary sight in the morning and 1 in the afternoon, with a dedicated mid-day café/siesta respite.<br>
        3️⃣ <strong>Dietary Comfort:</strong> Request *"Sin sal"* (Spain) or *"Poco sale"* (Italy) for gentler seasoning tailored to senior palates.<br>
        4️⃣ <strong>Door-to-Door High-Speed Rail:</strong> Opt for high-speed train business classes (Italo Prima / AVE) over taxing airport connections.
      ` + renderFollowupChips(chips);
    } else if (lang === 'zh') {
      return `
        👵 <strong>带父母长辈出行 · 舒心无障碍四大准则</strong>:<br><br>
        1️⃣ <strong>告别石板路疲劳：</strong> 老城坡道碎石路极易磨损膝盖，善用<strong>Uber与正规打车</strong>点对点直达景点门口与电梯。<br>
        2️⃣ <strong>张弛有度的松弛节奏：</strong> 严格遵循“上午一处主景点 ➔ 下午酒店午休或景观咖啡馆”，杜绝赶场。<br>
        3️⃣ <strong>点餐关照健康：</strong> 牢记西语“Sin sal”与意语“Poco sale”少放盐，保护长辈血压肠胃。<br>
        4️⃣ <strong>首选高铁商务座：</strong> 城际交通首选Italo Prima或AVE高铁，免去反复安检候机劳顿。
      ` + renderFollowupChips(chips);
    } else {
      return `
        👵 <strong>시니어 부모님 동행 가족 여행 · 4대 안심 원칙</strong>:<br><br>
        1️⃣ <strong>돌바닥과 경사로 피하기:</strong> 유럽의 울퉁불퉁한 돌바닥은 무릎에 무리가 가므로, 걷기 힘드실 때는 주저 없이 <strong>우버나 택시</strong>를 타셔서 유적지 입구 바로 앞까지 직행하세요.<br>
        2️⃣ <strong>1일 1핵심 여유로운 페이싱:</strong> 오전 핵심 1곳 ➔ 오후 호텔 휴식/노천카페 ➔ 해질녘 광장 산책의 리듬을 지켜주세요.<br>
        3️⃣ <strong>식단 건강 배려:</strong> 식당에서 꼭 "신 살(Sin sal)" 또는 "포코 살레(Poco sale)"를 외쳐 덜 짜게 드시도록 챙겨드립니다.<br>
        4️⃣ <strong>도심 직결 고속철도 활용:</strong> 공항 대기와 무거운 짐 검사 스트레스가 없는 고속철도 프리마석/1등석으로 쾌적하게 이동합니다!
      ` + renderFollowupChips(chips);
    }
  }

  // 10-7. BUDGET & COSTS INTENT
  if (isBudget) {
    const kpiText = (typeof document !== 'undefined' && document.getElementById('kpi-total-budget')) ? document.getElementById('kpi-total-budget').innerText : '₩13,500,000 ~ ₩16,800,000';
    const chips = [
      { query: '30일 마스터 플래너 요약해줘', label: '📅 30일 마스터 플래너' },
      { query: '트래블로그 카드 결제랑 현금 환전 비율', label: '💳 카드/환전 비율' },
      { query: '택스리펀 받는 법', label: '🛍️ 택스리펀 절차' }
    ];
    if (lang === 'ja') {
      return `
        💰 <strong>30日間 家族旅行の総予算および内訳ガイド</strong>:<br><br>
        • <strong>現在の目安総予算:</strong> 約 <strong>${kpiText}</strong>（3〜4名・ホテルランクや為替により変動）<br><br>
        📊 <strong>主要項目の予算構成:</strong><br>
        1️⃣ <strong>宿泊費（約40%）:</strong> エレベーター・駅近の4〜5星級厳選ホテル（9大確定ホテルベース）<br>
        2️⃣ <strong>航空券＆都市間交通（約25%）:</strong> 国際線長距離便＋iryo/Renfe/Italo高速鉄道<br>
        3️⃣ <strong>食費（約20%）:</strong> 名物レストランディナー＋カフェ・タパス巡り<br>
        4️⃣ <strong>観光入場料・予備費（約15%）:</strong> サグラダ・ファミリア、バチカン美術館、現地タクシー代など
      ` + renderFollowupChips(chips);
    } else if (lang === 'en') {
      return `
        💰 <strong>30-Day Family Travel Total Budget & Expense Breakdown</strong>:<br><br>
        • <strong>Estimated Total Budget:</strong> Approx. <strong>${kpiText}</strong> (based on 3–4 persons, subject to seasonality & exchange rates).<br><br>
        📊 <strong>Key Expense Categories:</strong><br>
        1️⃣ <strong>Accommodations (~40%):</strong> 9 Confirmed station-proximate 4–5★ hotels with verified senior elevators.<br>
        2️⃣ <strong>Flights & Intercity Trains (~25%):</strong> International long-haul flights + iryo/Renfe/Italo high-speed rail.<br>
        3️⃣ <strong>Dining (~20%):</strong> Verified pick dinners, lunchtime Menú del Día, and relaxed café stops.<br>
        4️⃣ <strong>Attraction Tickets & Contingency (~15%):</strong> Advance skip-the-line admissions and local rideshare/taxis.
      `;
    } else if (lang === 'zh') {
      return `
        💰 <strong>30天家庭旅行总预算与花费明细指南</strong>:<br><br>
        • <strong>当前预估总预算：</strong> 约 <strong>${kpiText}</strong>（基于3~4人家庭，受汇率与季节浮动）。<br><br>
        📊 <strong>主要预算构成比例：</strong><br>
        1️⃣ <strong>住宿费用（约40%）：</strong> 9大确定四至五星级平地无障碍电梯酒店。<br>
        2️⃣ <strong>大交通与城际高铁（约25%）：</strong> 国际长途往返机票＋西班牙与意大利城际高铁。<br>
        3️⃣ <strong>特色美食餐饮（约20%）：</strong> 15大精选认证名店晚宴、午间套餐与下午茶点。<br>
        4️⃣ <strong>门票与应急备用金（约15%）：</strong> 圣家堂、梵蒂冈博物馆预约门票及市内出租车费用。
      `;
    } else {
      return `
        💰 <strong>30일 가족 여행 총 예상 경비 및 예산 분석</strong>:<br><br>
        • <strong>현재 플래너 기준 예상 총액:</strong> 약 <strong>${kpiText}</strong> (3~4인 기준, 환율 및 시즌에 따라 유동적)<br><br>
        📊 <strong>주요 지출 구성비:</strong><br>
        1️⃣ <strong>숙박비 (약 40%):</strong> 역세권 평지 &amp; 엘리베이터가 완비된 9대 확정 4~5성급 호텔<br>
        2️⃣ <strong>항공 및 도시 간 고속열차 (약 25%):</strong> 국제선 항공권 + iryo/이탈로/프레차로사 고속열차<br>
        3️⃣ <strong>미식 식비 (약 20%):</strong> 15대 검증 식당 만찬, 메누 델 디아 점심, 젤라또 &amp; 카페<br>
        4️⃣ <strong>입장료 및 시내 교통/예비비 (약 15%):</strong> 사그라다 파밀리아, 바티칸 투어 및 우버/택시비
      `;
    }
    return res + renderFollowupChips(chips);
  }

  // 10-8. CARDS, CASH & TIPPING INTENT
  if (isCardCash) {
    const chips = [
      { query: '택스리펀 받는 법', label: '🛍️ 택스리펀 절차' },
      { query: '소매치기 예방법 알려줘', label: '🚨 소매치기 안전' }
    ];
    if (lang === 'ja') {
      return `
        💳 <strong>クレジットカード、現金両替、チップ文化のまとめ</strong>:<br><br>
        1️⃣ <strong>カード決済比率（95%以上）:</strong> コンタクトレス決済対応カード（Apple Pay、クレジットカード）がほぼ全土で利用可能。現金を持ち歩く必要性は極めて低いです。<br>
        2️⃣ <strong>持参する現金の目安:</strong> 緊急時用として家族全体で<strong>€150〜€200程度</strong>あれば充分です。<br>
        3️⃣ <strong>チップ文化:</strong> スペイン・イタリアともにチップ義務はありません。サービスに満足した場合、小銭のお釣りを置くか5〜10%程度添えれば喜ばれます。
      ` + renderFollowupChips(chips);
    } else if (lang === 'en') {
      return `
        💳 <strong>Card Payments, Cash Exchange & Tipping Etiquette</strong>:<br><br>
        1️⃣ <strong>Contactless Acceptance (95%+):</strong> Tap-to-pay credit cards and Apple Pay are accepted virtually everywhere. Carrying large cash bundles is totally unnecessary.<br>
        2️⃣ <strong>Emergency Cash Reserve:</strong> Carrying <strong>€150–€200 in cash</strong> per family is plenty for small coin restrooms and gelato shops.<br>
        3️⃣ <strong>Tipping Culture:</strong> Tipping is not obligatory in Spain or Italy. Rounding up small change or leaving 5–10% for exceptional table service is appreciated.
      `;
    } else if (lang === 'zh') {
      return `
        💳 <strong>刷卡消费、现金换汇与小费文化指南</strong>:<br><br>
        1️⃣ <strong>刷卡普及率（95%以上）：</strong> 支持免密感应的信用卡与手机Apple Pay几乎随处可用，切勿随身携带大量现金以免引贼注意。<br>
        2️⃣ <strong>随身现金建议：</strong> 全家准备 <strong>€150~€200 欧元现金零钱</strong>以备收费洗手间或零食小摊即可。<br>
        3️⃣ <strong>小费习俗：</strong> 西班牙与意大利均无强制小费传统，对周到服务结账时留下零钱或5~10%即可。
      `;
    } else {
      return `
        💳 <strong>결제(트래블로그 카드/현금), 환전 및 팁 문화 안내</strong>:<br><br>
        1️⃣ <strong>카드 결제율 (95% 이상):</strong> 트래블로그, 트래블월렛 등 컨택트리스(비접촉) 카드가 식당, 마트, 교통에 완벽 지원되므로 현금을 많이 들고 다닐 필요가 없습니다.<br>
        2️⃣ <strong>현금 환전 권장액:</strong> 유료 화장실이나 동전 전용 젤라또 가게를 대비해 가족 전체 기준 <strong>€150 ~ €200 정도</strong>의 소액 지폐만 챙기시면 충분합니다.<br>
        3️⃣ <strong>팁(Tip) 문화:</strong> 스페인과 이탈리아 모두 팁이 의무가 아닙니다. 서비스가 훌륭했을 때 거스름돈 동전을 남기거나 식사 금액의 5~10% 정도를 테이블에 두고 나오시면 아주 좋아합니다.
      `;
    }
    return res + renderFollowupChips(chips);
  }

  // 10-9. TAX REFUND INTENT
  if (isTaxRefund) {
    const chips = [
      { query: '스페인 쇼핑 기념품 추천', label: '🎁 스페인 쇼핑' },
      { query: '이탈리아 쇼핑 선물 추천', label: '🎁 이탈리아 쇼핑' }
    ];
    if (lang === 'ja') {
      return `
        🛍️ <strong>空港タックスリファンド（免税手続き）完全ガイド</strong>:<br><br>
        • 🇪🇸 <strong>スペイン（DIVAシステム）:</strong> 店舗で発行された免税書類のバーコードを空港の手荷物預け入れ前に<strong>DIVA専用キオスク端末</strong>でスキャン（緑色のチェックマークで認証完了）。税関窓口の長蛇の列に並ぶ必要がありません。<br>
        • 🇮🇹 <strong>イタリア（Global Blue / Planet）:</strong> 空港の免税カウンターでスタンプ認証と返金手続きを行います。<br>
        • ⚠️ <strong>注意点:</strong> 免税対象品はスーツケースに入れて預ける前に手続きが必要です。搭乗の3時間前には空港に到着してください！
      ` + renderFollowupChips(chips);
    } else if (lang === 'en') {
      return `
        🛍️ <strong>Airport Tax Refund (DIVA Kiosk & Customs) Guide</strong>:<br><br>
        • 🇪🇸 <strong>Spain (DIVA Digital System):</strong> Scan the barcode of your tax-free forms at the automated <strong>DIVA digital kiosks</strong> prior to bag drop. A green confirmation tick validates your stamp instantly without queuing for customs officers!<br>
        • 🇮🇹 <strong>Italy:</strong> Process your refund at airport Global Blue, Planet, or customs validation desks.<br>
        • ⚠️ <strong>Important Rule:</strong> Complete tax refund validation BEFORE checking in luggage containing duty-free purchases. Arrive at least 3 hours before departure!
      `;
    } else if (lang === 'zh') {
      return `
        🛍️ <strong>欧洲机场退税（DIVA自助机与海关流程）指南</strong>:<br><br>
        • 🇪🇸 <strong>西班牙（DIVA电子自助退税系统）：</strong> 在托运行李前，直接在机场<strong>DIVA自助扫码机</strong>上扫描退税单条形码，屏幕显示绿色对勾即完成海关验证，无需排长队。<br>
        • 🇮🇹 <strong>意大利：</strong> 在机场Global Blue或Planet退税柜台直接办理海关盖章与退税领款。<br>
        • ⚠️ <strong>长辈注意：</strong> 托运含退税商品的行李前务必先完成退税盖章，建议至少提前3小时到达机场！
      `;
    } else {
      return `
        🛍️ <strong>공항 텍스리펀 (DIVA 무인 키오스크) 절차 안내</strong>:<br><br>
        • 🇪🇸 <strong>스페인 (DIVA 디지털 시스템):</strong> 매장에서 발급받은 면세 서류를 수하물 부치기 전 공항 출국장의 <strong>DIVA 무인 키오스크 기계</strong>에 바코드만 스캔하면 즉시 승인(초록색 체크)됩니다. 세관원 대면 줄을 설 필요가 없습니다.<br>
        • 🇮🇹 <strong>이탈리아:</strong> 공항 내 글로벌블루 또는 플래닛 카운터에서 면세 확인 및 환급을 진행합니다.<br>
        • ⚠️ <strong>필수 주의:</strong> 쇼핑 물품을 부치는 수하물(캐리어)에 넣으실 경우, 반드시 짐을 부치기 전에 먼저 키오스크 스캔을 마치셔야 합니다. 출발 3시간 전 공항 도착을 권장합니다!
      `;
    }
    return res + renderFollowupChips(chips);
  }

  // 10-10. WEATHER & PACKING INTENT
  if (isWeather) {
    const chips = [
      { query: '소매치기 예방법 알려줘', label: '🚨 소매치기 안전' },
      { query: '식당과 여행 필수 서바이벌 회화', label: '🗣️ 24선 필수 회화' }
    ];
    if (lang === 'ja') {
      return `
        ☀️ <strong>スペイン＆イタリア 気候・ベストシーズン＆服装ガイド</strong>:<br><br>
        • <strong>10月〜12月の気候:</strong> 地中海性気候のため東京やソウルより穏やかで温暖です（平均12〜18℃）。日中は日差しが暖かく観光に最適ですが、朝晩は冷え込みます。<br>
        • <strong>おすすめの服装:</strong> 「玉ねぎ式の重ね着」が基本です。長袖シャツの上に薄手のウルトラライトダウンやカーディガンを羽織り、脱ぎ着しやすく調整してください。<br>
        • <strong>シニア必需品:</strong> クッション性の高いウォーキングシューズ、急な雨に備える軽量折りたたみ傘。
      ` + renderFollowupChips(chips);
    } else if (lang === 'en') {
      return `
        ☀️ <strong>Spain & Italy Weather, Best Seasons & Packing Guide</strong>:<br><br>
        • <strong>Autumn/Winter Climate (Oct–Dec):</strong> Mild Mediterranean temperatures ranging from 12°C to 18°C. Sunny afternoons are pleasant, while mornings and evenings turn brisk.<br>
        • <strong>Recommended Layering:</strong> Dress in breathable onion layers—long-sleeve tees paired with a lightweight packable down jacket or cozy cardigan.<br>
        • <strong>Senior Essentials:</strong> Supportive walking sneakers with memory foam soles and a compact travel umbrella.
      `;
    } else if (lang === 'zh') {
      return `
        ☀️ <strong>西班牙与意大利 天气气候、穿衣指南与行李建议</strong>:<br><br>
        • <strong>秋冬季气候（10~12月）：</strong> 地中海气候温和宜人，平均气温在12℃~18℃之间，日照充足舒适，但早晚温差显著。<br>
        • <strong>穿衣搭配：</strong> 建议采用“洋葱式多层穿搭法”，内穿长袖T恤，外搭轻便羽绒服或羊毛开衫，方便随时穿脱。<br>
        • <strong>长辈出行必备：</strong> 舒适减震防滑运动鞋与轻便折叠雨伞。
      `;
    } else {
      return `
        ☀️ <strong>스페인 &amp; 이탈리아 날씨, 추천 시기 &amp; 부모님 옷차림 가이드</strong>:<br><br>
        • <strong>가을/겨울 날씨 (10월~12월):</strong> 한국의 늦가을보다 훨씬 온화한 지중해성 기후(낮 기온 12~18℃)로 햇살이 따스해 걷기 좋습니다. 다만 일교차가 커 아침저녁으로는 쌀쌀합니다.<br>
        • <strong>추천 옷차림:</strong> '양파 껍질식 레이어드 룩'이 정답입니다. 가벼운 긴팔 티셔츠 위에 경량 패딩이나 가디건을 겹쳐 입으셔서 기온에 맞게 쉽게 벗고 입으실 수 있게 챙겨주세요.<br>
        • <strong>부모님 필수 준비물:</strong> 돌바닥 충격을 흡수하는 편안한 쿠션 운동화와 가벼운 3단 접이식 우산.
      `;
    }
    return res + renderFollowupChips(chips);
  }

  // 10-11. DUBAI STOPOVER & SAFARI
  const isDubaiStopover = (
    q.includes('경유') || q.includes('스톱오버') || q.includes('stopover') || q.includes('layover') ||
    q.includes('짐 보관') || q.includes('수하물 보관') || q.includes('luggage') || q.includes('storage') ||
    q.includes('24시간') || q.includes('24h') || q.includes('半日') || q.includes('一日') ||
    ['ストップオーバー', '乗り継ぎ', '荷物預かり', '荷物一時預かり', '过境', '中转', '行李寄存', '24小时'].some(w => q.includes(w) || cleanQ.includes(w))
  ) && (isDubai || q.includes('에미레이트') || q.includes('emirates') || q.includes('エミレーツ') || q.includes('阿联酋航空'));

  if (isDubaiStopover) {
    const chips = [
      { query: '두바이 사막 사파리 부모님 주의사항과 복장', label: '🐪 사막 사파리 팁' },
      { query: '두바이 맛집 추천해줘', label: '🍽️ 두바이 맛집' }
    ];
    let res = '';
    if (lang === 'ja') {
      res = `
        🐪 <strong>ドバイ24時間ストップオーバー＆荷物預かり 完全ガイド</strong>:<br><br>
        1️⃣ <strong>空港での荷物預かり（手ぶら観光）:</strong> ドバイ空港第3ターミナル到着ロビーに24時間対応の公認手荷物預かり所（Left Luggage）があります。<br>
        2️⃣ <strong>シニア向け24時間ハイライトコース:</strong><br>
        • 午前: ブルジュ・ハリファ（展望台）＆ドバイ・モール（冷房完備の平坦フロア）<br>
        • 夕暮れ: ドバイ・ファウンテン噴水ショー鑑賞＆テ라스レストランでディナー
      `;
    } else if (lang === 'en') {
      res = `
        🐪 <strong>Dubai 24h Stopover & Luggage Storage Master Guide</strong>:<br><br>
        1️⃣ <strong>Airport Luggage Storage:</strong> Terminal 3 arrivals hall features a 24/7 official Left Luggage facility (~AED 40-50 per bag).<br>
        2️⃣ <strong>Senior-Optimized 24h Route:</strong><br>
        • Morning: Burj Khalifa & Dubai Mall (fully air-conditioned, elevator-equipped flat floors).<br>
        • Evening: Dubai Fountain Show dinner overlooking the illuminated lake.
      `;
    } else if (lang === 'zh') {
      res = `
        🐪 <strong>迪拜24小时过境游与行李寄存出行指南</strong>:<br><br>
        1️⃣ <strong>机场行李寄存服务：</strong> 迪拜机场T3航站楼到达层设有24小时官方行李寄存处（Left Luggage）。<br>
        2️⃣ <strong>长辈尊享24小时经典路线：</strong><br>
        • 上午： 哈利法塔与迪拜购物中心（全空调环境，无障碍电梯齐全）。<br>
        • 傍晚： 观赏迪拜音乐喷泉水舞秀并在湖畔露台餐厅享用丰盛晚宴。
      `;
    } else {
      res = `
        🐪 <strong>에미레이트 항공 두바이 24시간 스톱오버 &amp; 짐 보관 완벽 가이드</strong>:<br><br>
        1️⃣ <strong>공항 짐 보관소 (Left Luggage):</strong> 두바이 공항 3터미널 입국장에 24시간 공식 수하물 보관소가 있어 큰 캐리어를 안전하게 맡기고 가벼운 복장으로 시내로 나갈 수 있습니다.<br>
        2️⃣ <strong>부모님 맞춤 24시간 추천 동선:</strong><br>
        • 오전: 버즈 할리파 전망대 &amp; 두바이 몰 (전 구역 에어컨 완비 및 완벽한 평지/엘리베이터)<br>
        • 저녁: 두바이 분수쇼 명당 레스토랑에서 만찬 감상 후 공항 복귀
      `;
    }
    return res + renderFollowupChips(chips);
  }

  const isDubaiSafari = [
    '사막', '사파리', '사막투어', '사막 사파리', '듄베이싱', 'desert', 'safari', 'dune', 'bashing',
    '砂漠', 'サファリ', 'デザートサファリ', '砂漠ツアー', '沙漠', '冲沙', '沙漠冲沙', '沙漠游'
  ].some(w => q.includes(w) || cleanQ.includes(w));

  if (isDubaiSafari) {
    const chips = [
      { query: '두바이 24시간 스톱오버 추천 코스', label: '🐪 24h 스톱오버' },
      { query: '두바이 맛집 추천해줘', label: '🍽️ 두바이 맛집' }
    ];
    let res = '';
    if (lang === 'ja') {
      res = `
        🐪 <strong>ドバイ砂漠サファリ シニア同伴の注意点と服装</strong>:<br><br>
        1️⃣ <strong>デューンバッシング（砂丘ドライブ）の免除要請:</strong> 激しい揺れを伴うため、ご両親は4WDの激しい走行をスキップし、平坦なルートで砂漠キャンプへ直行する「ジェントルサファリ」をお選びください。<br>
        2️⃣ <strong>服装と持ち物:</strong> 砂が靴に入らないサンダルやスニーカー、日没後は砂漠の気温が急降下するため薄手の上着が必須です。
      `;
    } else if (lang === 'en') {
      res = `
        🐪 <strong>Dubai Desert Safari Senior Safety & Packing Guide</strong>:<br><br>
        1️⃣ <strong>Opt Out of Aggressive Dune Bashing:</strong> Request a gentle scenic desert drive directly to the Bedouin heritage camp to safeguard senior spines and neck comfort.<br>
        2️⃣ <strong>Evening Warmth:</strong> Desert temperatures drop rapidly after sunset—bring a light windbreaker or shawl.
      `;
    } else if (lang === 'zh') {
      res = `
        🐪 <strong>迪拜沙漠冲沙长辈安全须知与着装建议</strong>:<br><br>
        1️⃣ <strong>免去剧烈冲沙颠簸：</strong> 预订时务必选择温和的传统游览路线（Gentle Safari），直接前往贝都因营地享受日落与晚宴。<br>
        2️⃣ <strong>温差防寒：</strong> 沙漠日落后气温骤降，务必随身携带防风外套或披肩。
      `;
    } else {
      res = `
        🐪 <strong>두바이 사막 사파리 부모님 동행 시 안전 수칙 &amp; 복장</strong>:<br><br>
        1️⃣ <strong>듄배싱(급경사 모래언덕 질주) 건너뛰기:</strong> 허리와 목에 충격이 갈 수 있으므로, 예약 시 부모님은 부드러운 평지 주행으로 사막 캠프에 바로 도착하는 '젠틀 사파리' 코스를 선택하세요.<br>
        2️⃣ <strong>일몰 후 보온 겉옷:</strong> 사막은 해가 지면 급격히 쌀쌀해지므로 가벼운 바람막이나 숄을 꼭 지참하세요.
      `;
    }
    return res + renderFollowupChips(chips);
  }

  // 10-12. CURRENCY & EXCHANGE INTENT
  const isEuroCurrencyExchange = [
    '유로 써', '유로 사용', '환전 어떻게', '화폐', '통화', '환전', '유로화',
    'currency', 'euro', 'money exchange', 'use euro', '両替', '通貨', 'ユーロ', '货币', '换汇', '用欧元吗'
  ].some(w => q.includes(w) || cleanQ.includes(w));

  if (isEuroCurrencyExchange) {
    const chips = [
      { query: '트래블로그 카드 결제랑 현금 환전 비율', label: '💳 카드/환전 비율' },
      { query: '택스리펀 받는 법', label: '🛍️ 택스리펀 절차' }
    ];
    let res = '';
    if (lang === 'ja') {
      res = `
        💶 <strong>スペイン・イタリア・ポルトガルの通貨と両替公式</strong>:<br><br>
        1️⃣ <strong>同一通貨ユーロ（EUR, €）:</strong> 3カ国とも共通通貨ユーロを使用しているため、国境を越えても再両替の必要が一切ありません。<br>
        2️⃣ <strong>最もお得な決済手段:</strong> 手数料無料の海外決済カード（Apple Pay対応）を活用するのが最もお得で安全です。
      `;
    } else if (lang === 'en') {
      res = `
        💶 <strong>Spain, Italy & Portugal Currency & Exchange Guide</strong>:<br><br>
        1️⃣ <strong>Single Currency Euro (EUR, €):</strong> All three nations belong to the Eurozone and Schengen area, requiring zero currency exchange when crossing borders.<br>
        2️⃣ <strong>Optimal Payment Strategy:</strong> Zero-fee international contactless travel cards and Apple Pay offer optimal exchange rates without kiosk commissions.
      `;
    } else if (lang === 'zh') {
      res = `
        💶 <strong>西班牙、意大利与葡萄牙 货币换汇指南</strong>:<br><br>
        1️⃣ <strong>通用欧元（EUR, €）：</strong> 三国均属欧元区与申根区，跨国游玩无需重复换汇，畅行无阻。<br>
        2️⃣ <strong>最佳刷卡方式：</strong> 优先使用免境外交易手续费的外币芯片卡或手机闪付，汇率最优且安全。
      `;
    } else {
      res = `
        💶 <strong>스페인 · 이탈리아 · 포르투갈 화폐 및 환전 안내</strong>:<br><br>
        1️⃣ <strong>모두 동일한 유로(EUR, €) 사용:</strong> 스페인, 이탈리아, 포르투갈 모두 유로화를 공통으로 사용하여 국경을 넘나들 때마다 재환전할 필요가 전혀 없습니다.<br>
        2️⃣ <strong>가장 유리한 결제:</strong> 트래블로그, 트래블월렛 등 수수료 우대 체크카드를 현지에서 바로 결제하시는 것이 은행 환전 수수료를 100% 아끼는 비결입니다.
      `;
    }
    return res + renderFollowupChips(chips);
  }

  // 10-13. MENU DEL DIA INTENT
  const isMenuDelDia = [
    '메누 델 디아', '메뉴 델 디아', 'menu del dia', 'menú del día', '가성비 식당', '런치 메뉴', '점심 특선',
    'lunch special', 'fixed price lunch', 'ランチメニュー', '日替わり定食', '午市套餐', '每日特餐'
  ].some(w => q.includes(w) || cleanQ.includes(w));

  if (isMenuDelDia) {
    const chips = [
      { query: '빠에야 피자 말고 다른 음식 추천', label: '🍽️ 빠에야·피자 외 미식' },
      { query: '식당과 여행 필수 서바이벌 회화', label: '🗣️ 24선 필수 회화' }
    ];
    let res = '';
    if (lang === 'ja') {
      res = `
        🥘 <strong>スペインの神コスパランチ「メヌ・デル・ディア（Menú del Día）」活用術</strong>:<br><br>
        • <strong>構成:</strong> 前菜（プリメル・プラト）＋主菜（セグンド・プラト）＋パン＋デザート＋ワイン1杯（または水）のフルセット！<br>
        • <strong>価格相場:</strong> 1人あたり <strong>約€12〜€18</strong>（アラカルト注文の半額以下）<br>
        • <strong>提供時間:</strong> 平日のランチタイム（13:30〜16:00限定）
      `;
    } else if (lang === 'en') {
      res = `
        🥘 <strong>Spain's Ultimate Lunch Value: Menú del Día</strong>:<br><br>
        • <strong>What's Included:</strong> First Course (starter) + Second Course (meat/fish) + Crusty Bread + Dessert + Beverage (entire glass or half bottle of wine / beer / water)!<br>
        • <strong>Price Range:</strong> Incredible value at <strong>€12–€18 per person</strong>.<br>
        • <strong>Timing:</strong> Weekdays during Spanish lunch hours (1:30 PM – 4:00 PM).
      `;
    } else if (lang === 'zh') {
      res = `
        🥘 <strong>西班牙超高性价比“今日每日特餐（Menú del Día）”攻略</strong>:<br><br>
        • <strong>套餐包含：</strong> 头盘（汤或沙拉）＋ 主菜（牛排或鲜鱼）＋ 面包 ＋ 甜点 ＋ 饮品（红酒整瓶或啤酒矿泉水）！<br>
        • <strong>价格参考：</strong> 仅需 <strong>€12~€18 欧元/人</strong>。<br>
        • <strong>供餐时间：</strong> 工作日午餐时段（13:30~16:00）。
      `;
    } else {
      res = `
        🥘 <strong>스페인의 초특급 가성비 점심 코스 '메누 델 디아(Menú del Día)'</strong>:<br><br>
        • <strong>알찬 코스 구성:</strong> 에피타이저(전채) + 메인 고기/생선 요리 + 빵 + 디저트 + 와인 1병(또는 음료/물)까지 전부 포함!<br>
        • <strong>가격:</strong> 1인당 단돈 <strong>€12 ~ €18 (약 1만 8천원~2만 6천원)</strong><br>
        • <strong>이용 시간:</strong> 평일 점심시간 (13:30 ~ 16:00)에 식당 입구 칠판에 적힌 'Menú del Día'를 확인하세요!
      `;
    }
    return res + renderFollowupChips(chips);
  }

  // General Transit Fallback if 'isTransit' wasn't matched above
  if (isTransit) {
    const chips = [
      { query: '이탈리아 기차 예매 팁', label: '🚄 이탈리아 기차 팁' },
      { query: '바르셀로나에서 마드리드 어떻게 가?', label: '🚆 바르셀로나 ➔ 마드리드' },
      { query: '나폴리에서 피렌체 이동법', label: '🚆 나폴리 ➔ 피렌체' }
    ];
    if (lang === 'ja') {
      return `
        🚆 <strong>スペイン＆イタリア 都市間高速鉄道・公共交通のコツ</strong>:<br><br>
        • 🇪🇸 <strong>スペイン:</strong> iryo / Renfe AVE 高速鉄道でマドリード ↔ バルセロナ約2時間30分直通。<br>
        • 🇮🇹 <strong>イタリア:</strong> Frecciarossa / Italo 高速鉄道でフィレンツェ ↔ ローマ約1時間35分直通。<br>
        • 🚖 <strong>シニア移動の知恵:</strong> 重い荷物や階段を避けるため、市内移動にはUberやFREE NOW配車アプリを活用すればドア・ツー・ドアで快適に移動できます！
      ` + renderFollowupChips(chips);
    } else if (lang === 'en') {
      return `
        🚆 <strong>Spain & Italy Intercity High-Speed Rail & City Transit Tips</strong>:<br><br>
        • 🇪🇸 <strong>Spain:</strong> iryo and Renfe AVE link Madrid and Barcelona in 2 hrs 30 mins direct.<br>
        • 🇮🇹 <strong>Italy:</strong> Frecciarossa and Italo link Florence and Rome in 1 hr 35 mins direct.<br>
        • 🚖 <strong>Door-to-Door Rideshare:</strong> For families of 3+, utilizing Uber or FREE NOW taxis for short 3–5km city transfers spares subway stairs and pickpocket risks!
      `;
    } else if (lang === 'zh') {
      return `
        🚆 <strong>西意城际高铁与市内公共交通指南</strong>:<br><br>
        • 🇪🇸 <strong>西班牙：</strong> iryo 与 Renfe AVE 高铁连接马德里与巴塞罗那仅需2小时30分钟。<br>
        • 🇮🇹 <strong>意大利：</strong> 意铁红箭与法拉利Italo连接佛罗伦萨与罗马仅需1小时35分钟。<br>
        • 🚖 <strong>长辈出行打车贴士：</strong> 3人以上同行建议多用 Uber 与 FREE NOW 叫车，免去地铁爬楼梯劳顿。
      `;
    } else {
      return `
        🚆 <strong>스페인 &amp; 이탈리아 고속철도 및 시내 교통 필수 이동 팁</strong>:<br><br>
        • 🇪🇸 <strong>스페인:</strong> 이료(iryo) 및 렌페 AVE 고속열차로 바르셀로나 ↔ 마드리드 2시간 30분 직통.<br>
        • 🇮🇹 <strong>이탈리아:</strong> 이탈로(Italo) 및 프레차로사로 피렌체 ↔ 로마 1시간 35분, 나폴리 ↔ 피렌체 2시간 50분 직통.<br>
        • 🚖 <strong>부모님 맞춤 시내 이동:</strong> 3인 이상 가족은 무거운 짐을 들고 계단을 오르내리지 마시고 <strong>우버 또는 FREE NOW 앱 택시</strong>를 타시면 문 앞까지 안전하고 편안하게 모셔다드립니다!
      `;
    }
  }

  // ====================================================
  // 11. GENERAL FALLBACK WELCOME RESPONSE
  // ====================================================
  const fallbackChips = [
    { query: '30일 마스터 플래너 요약해줘', label: '📅 30일 마스터 플래너' },
    { query: '빠에야 피자 말고 다른 음식 추천', label: '🍽️ 빠에야·피자 외 미식' },
    { query: '식당과 여행 필수 서바이벌 회화', label: '🗣️ 24선 필수 회화' },
    { query: '이탈리아 기차 예매 팁', label: '🚄 이탈리아 기차 팁' },
    { query: '성당 복장 규정 알려줘', label: '⛪ 성당 복장 규정' },
    { query: '소매치기 예방법 알려줘', label: '🚨 소매치기 안전' }
  ];

  if (lang === 'ja') {
    return `
      😊 <strong>旅行に関するご質問に何でもお答えいたします！</strong><br><br>
      30日マスタープランナー（9大確定ホテル＆6大交通公式）、7大都市の代替不可名物料理、24選サバイバル会話、イタリア高速鉄道や大聖堂の服装規定、スリ対策、リアルタイム予算など、何回でも続けてご質問いただけます。<br><br>
      💡 <strong>気になるテーマを下記から選ぶか、自由に質問をご入力ください：</strong>
    ` + renderFollowupChips(fallbackChips);
  } else if (lang === 'en') {
    return `
      😊 <strong>I am always here to assist your European journey!</strong><br><br>
      Ask me about the 30-Day Master Planner (9 confirmed accommodations & 6 golden transit formulas), signature dishes beyond paella and pizza, 24 dining & travel survival phrases, Italy high-speed trains, cathedral dress codes, or pickpocket safety.<br><br>
      💡 <strong>Click a quick topic below or type your question:</strong>
    ` + renderFollowupChips(fallbackChips);
  } else if (lang === 'zh') {
    return `
      😊 <strong>随时为您提供欧洲家庭旅行全方位解答！</strong><br><br>
      您可以向我咨询30天大师规划师（9大确定酒店与6大交通公式）、除海鲜饭和披萨外的特色美食名店、24句常用生存口语、意大利高铁乘车避坑、大教堂着装规定、防盗安全或旅行预算等任何问题。<br><br>
      💡 <strong>请点击下方推荐话题或直接输入您的问题：</strong>
    ` + renderFollowupChips(fallbackChips);
  } else {
    return `
      😊 <strong>여행에 대해 무엇이든 편하게 물어보세요!</strong><br><br>
      스페인 &amp; 이탈리아 30일 마스터 플래너(9대 확정 숙소 &amp; 6대 교통 공식), 빠에야·피자 외 12대 대체 불가 미식, 24선 필수 서바이벌 회화, 이탈리아 고속철도 &amp; 성당 복장 규정, 15대 야경 명소, 소매치기 예방법 등 모든 궁금증을 즉시 답변해 드립니다.<br><br>
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


// ==========================================
// 2026 Redesign Helpers (Settings, Accordions, Curated Plan)
// ==========================================

function ensureEditorialGuideContent(lang) {
  const current = lang || (typeof currentLang !== 'undefined' ? currentLang : 'ko');
  const edContainer = document.getElementById('editorialGuideContainer');
  if (edContainer && typeof EDITORIAL_SECTIONS_HTML !== 'undefined') {
    const htmlToInject = EDITORIAL_SECTIONS_HTML[current] || EDITORIAL_SECTIONS_HTML['ko'];
    if (htmlToInject) {
      edContainer.innerHTML = htmlToInject;
      if (typeof initInteractiveChecklist === 'function') {
        initInteractiveChecklist();
      }
    }
  }
}

function toggleSettingsPanel() {
  const panel = document.getElementById('settingsDropdownPanel');
  const btn = document.getElementById('btnSettingsToggle');
  if (!panel) return;
  const isHidden = panel.style.display === 'none' || !panel.style.display;
  if (isHidden) {
    panel.style.display = 'block';
    if (btn) btn.setAttribute('aria-expanded', 'true');
  } else {
    panel.style.display = 'none';
    if (btn) btn.setAttribute('aria-expanded', 'false');
  }
}

function closeSettingsPanel() {
  const panel = document.getElementById('settingsDropdownPanel');
  const btn = document.getElementById('btnSettingsToggle');
  if (panel) panel.style.display = 'none';
  if (btn) btn.setAttribute('aria-expanded', 'false');
}

function toggleAdvancedPlannerOptions() {
  const panel = document.getElementById('advancedControlsPanel');
  const icon = document.getElementById('advancedOptionsIcon');
  if (!panel) return;
  const dict = (typeof I18N_DICTIONARY !== 'undefined' && I18N_DICTIONARY[currentLang]) || {};
  const isHidden = panel.style.display === 'none';
  if (isHidden) {
    panel.style.display = 'block';
    if (icon) icon.textContent = dict['planner_adv_collapse'] || (currentLang === 'en' ? '▲ Collapse' : (currentLang === 'ja' ? '▲ 閉じる' : (currentLang === 'zh' ? '▲ 收起' : '▲ 접기')));
  } else {
    panel.style.display = 'none';
    if (icon) icon.textContent = dict['planner_adv_expand'] || (currentLang === 'en' ? '▼ Expand' : (currentLang === 'ja' ? '▼ 開く' : (currentLang === 'zh' ? '▼ 展开' : '▼ 펼치기')));
  }
}

function toggleEditorialGuide() {
  const body = document.getElementById('editorialCollapseBody');
  const arrow = document.getElementById('editorialAccordionArrow');
  const btn = document.getElementById('btnToggleEditorialGuide');
  const edContainer = document.getElementById('editorialGuideContainer');
  if (!body) return;
  const dict = (typeof I18N_DICTIONARY !== 'undefined' && I18N_DICTIONARY[currentLang]) || {};
  const isHidden = body.style.display === 'none' || !body.style.display;
  if (isHidden) {
    body.style.display = 'block';
    if (arrow) arrow.textContent = dict['editorial_arrow_collapse'] || (currentLang === 'en' ? 'Collapse ▲' : (currentLang === 'ja' ? '閉じる ▲' : (currentLang === 'zh' ? '收起 ▲' : '접기 ▲')));
    if (btn) btn.setAttribute('aria-expanded', 'true');
    // Ensure content is loaded and ready
    ensureEditorialGuideContent();
  } else {
    body.style.display = 'none';
    if (arrow) arrow.textContent = dict['editorial_arrow_expand'] || (currentLang === 'en' ? 'Read More ▼' : (currentLang === 'ja' ? '詳しく見る ▼' : (currentLang === 'zh' ? '展开查看 ▼' : '펼쳐보기 ▼')));
    if (btn) btn.setAttribute('aria-expanded', 'false');
  }
}

function selectCuratedPlan(regionCode) {
  const select = document.getElementById('userRegionSelect');
  if (select) {
    select.value = regionCode;
  }
  if (typeof applyPlanReconfiguration === 'function') {
    applyPlanReconfiguration(true);
  }
  const plannerEl = document.getElementById('planner');
  if (plannerEl) {
    plannerEl.scrollIntoView({ behavior: 'smooth' });
  }
  const titles = {
    'IBERIA': {
      ko: '스페인 & 포르투갈 남유럽 30일 여정이 플래너에 적용되었습니다!',
      en: 'Spain & Portugal 30-Day Southern Europe itinerary applied to planner!',
      ja: 'スペイン＆ポルトガル南欧30日日程がプランナーに適用されました！',
      zh: '西班牙与葡萄牙南欧30天行程已成功应用至规划器！'
    },
    'LATIN_AMERICA': {
      ko: '중남미 30일 탐험 여정이 플래너에 적용되었습니다!',
      en: 'Latin America 30-Day exploration itinerary applied to planner!',
      ja: '中南米30日間探訪日程がプランナーに適用されました！',
      zh: '中南美洲30天探索行程已成功应用至规划器！'
    }
  };
  const tMap = titles[regionCode] || {};
  const msg = tMap[currentLang] || tMap.ko || (currentLang === 'en' ? 'Selected itinerary applied to planner!' : (currentLang === 'ja' ? '選択した日程がプランナーに適用されました！' : (currentLang === 'zh' ? '所选路线已成功应用至规划器！' : '선택한 코스가 플래너에 적용되었습니다!')));
  if (typeof showToast === 'function') {
    showToast(msg);
  }
}

// Global click to close settings when clicking outside
document.addEventListener('click', (e) => {
  const panel = document.getElementById('settingsDropdownPanel');
  const btn = document.getElementById('btnSettingsToggle');
  if (panel && panel.style.display === 'block') {
    if (!panel.contains(e.target) && (!btn || !btn.contains(e.target))) {
      closeSettingsPanel();
    }
  }
});


// ==========================================================================
// 📅 일정 세부사항 펼치기/접기 (시니어 보행 친화 아코디언)
// ==========================================================================
window.allTimelineDaysExpanded = false;

function toggleDayDetail(slotIdx, btn) {
  const detail = document.getElementById(`dayDetail-${slotIdx}`);
  if (!detail) return;
  const dict = I18N_DICTIONARY[currentLang] || I18N_DICTIONARY['ko'];
  const isHidden = detail.style.display === 'none' || !detail.style.display;
  if (isHidden) {
    detail.style.display = 'block';
    if (btn) {
      btn.setAttribute('aria-expanded', 'true');
      const txt = btn.querySelector('.toggle-text') || btn;
      txt.textContent = dict['timeline_collapse_detail'] || '세부 일정 접기 ▲';
    }
  } else {
    detail.style.display = 'none';
    if (btn) {
      btn.setAttribute('aria-expanded', 'false');
      const txt = btn.querySelector('.toggle-text') || btn;
      txt.textContent = dict['timeline_expand_detail'] || '세부 일정 펼치기 ▼';
    }
  }
}
window.toggleDayDetail = toggleDayDetail;

function toggleAllTimelineDays() {
  window.allTimelineDaysExpanded = !window.allTimelineDaysExpanded;
  const dict = I18N_DICTIONARY[currentLang] || I18N_DICTIONARY['ko'];
  const details = document.querySelectorAll('.day-detail-collapse');
  const buttons = document.querySelectorAll('.btn-toggle-day-detail');

  details.forEach(d => {
    d.style.display = window.allTimelineDaysExpanded ? 'block' : 'none';
  });

  buttons.forEach(b => {
    b.setAttribute('aria-expanded', String(window.allTimelineDaysExpanded));
    const txt = b.querySelector('.toggle-text') || b;
    txt.textContent = window.allTimelineDaysExpanded
      ? (dict['timeline_collapse_detail'] || '세부 일정 접기 ▲')
      : (dict['timeline_expand_detail'] || '세부 일정 펼치기 ▼');
  });

  const icon = document.getElementById('toggleAllTimelineIcon');
  const text = document.getElementById('toggleAllTimelineText');
  if (icon) icon.textContent = window.allTimelineDaysExpanded ? '▲' : '▼';
  if (text) {
    text.textContent = window.allTimelineDaysExpanded
      ? (dict['timeline_collapse_all'] || '모든 날짜 세부일정 접기 ▲')
      : (dict['timeline_expand_all'] || '모든 날짜 세부일정 펼치기 ▼');
  }
}
window.toggleAllTimelineDays = toggleAllTimelineDays;

// ==========================================================================
// 🎪 지역별 공식 축제 & 🌃 파노라마 야경 명소 인터랙티브 로직
// ==========================================================================
let currentFestNightSubTab = 'festivals'; // 'festivals', 'nightviews', 'saved'
let currentFestRegionFilter = 'ALL';      // 'ALL', 'EU', 'LATIN'
let currentFestSeasonFilter = 'ALL';      // 'ALL', 'spring_summer', 'autumn_winter'

function switchFestNightSubTab(tab) {
  currentFestNightSubTab = tab;
  document.querySelectorAll('#festNightSubTabs .tab-chip').forEach(btn => btn.classList.remove('active'));

  const targetBtn = document.getElementById(
    tab === 'festivals' ? 'tabBtnFestivals' : (tab === 'nightviews' ? 'tabBtnNightviews' : 'tabBtnSavedCandidates')
  );
  if (targetBtn) targetBtn.classList.add('active');

  const pFest = document.getElementById('festivalsPanel');
  const pNight = document.getElementById('nightviewsPanel');
  const pSaved = document.getElementById('savedCandidatesPanel');

  if (pFest) pFest.style.display = tab === 'festivals' ? 'block' : 'none';
  if (pNight) pNight.style.display = tab === 'nightviews' ? 'block' : 'none';
  if (pSaved) pSaved.style.display = tab === 'saved' ? 'block' : 'none';

  renderFestivalsAndNightViews();
}
window.switchFestNightSubTab = switchFestNightSubTab;

function setFestRegionFilter(region, btn) {
  currentFestRegionFilter = region;
  document.querySelectorAll('#festRegionFilterGroup .ctrl-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  renderFestivalsAndNightViews();
}
window.setFestRegionFilter = setFestRegionFilter;

function setFestSeasonFilter(season, btn) {
  currentFestSeasonFilter = season;
  document.querySelectorAll('#festSeasonFilterGroup .ctrl-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  renderFestivalsAndNightViews();
}
window.setFestSeasonFilter = setFestSeasonFilter;

// 여행 후보 저장소 유틸리티
function getSavedCandidates() {
  try {
    const raw = localStorage.getItem('slowtravel_saved_candidates');
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

function updateSavedCandidatesCount() {
  const list = getSavedCandidates();
  const badge = document.getElementById('savedCandidatesCount');
  if (badge) badge.textContent = String(list.length);
}

function toggleSaveCandidate(type, id) {
  let list = getSavedCandidates();
  const dict = I18N_DICTIONARY[currentLang] || I18N_DICTIONARY['ko'];
  const existsIndex = list.findIndex(item => item.id === id);

  if (existsIndex >= 0) {
    list.splice(existsIndex, 1);
    localStorage.setItem('slowtravel_saved_candidates', JSON.stringify(list));
    updateSavedCandidatesCount();
    showToast(dict['toast_candidate_removed'] || '🗑️ 여행 후보에서 삭제되었습니다.');
  } else {
    list.push({ type, id, savedAt: new Date().toISOString() });
    localStorage.setItem('slowtravel_saved_candidates', JSON.stringify(list));
    updateSavedCandidatesCount();
    showToast(dict['toast_candidate_saved'] || '⭐ 여행 후보로 저장되었습니다! (후보 목록에서 확인 가능)');
  }

  renderFestivalsAndNightViews();
}
window.toggleSaveCandidate = toggleSaveCandidate;

function clearAllSavedCandidates() {
  const dict = I18N_DICTIONARY[currentLang] || I18N_DICTIONARY['ko'];
  localStorage.removeItem('slowtravel_saved_candidates');
  updateSavedCandidatesCount();
  showToast(dict['toast_candidate_removed'] || '🗑️ 모든 저장 목록이 비워졌습니다.');
  renderFestivalsAndNightViews();
}
window.clearAllSavedCandidates = clearAllSavedCandidates;

// 축제 및 야경 명소 렌더링 코어
function renderFestivalsAndNightViews() {
  const dict = I18N_DICTIONARY[currentLang] || I18N_DICTIONARY['ko'];
  updateSavedCandidatesCount();

  const festData = window.FESTIVALS_GUIDE_DATA || [];
  const nightData = window.NIGHTVIEWS_GUIDE_DATA || []; if (typeof window.renderPracticalCityCandidates === 'function') window.renderPracticalCityCandidates();
  const savedCandidates = getSavedCandidates();

  // 사용자 현재 여행 기간 계산 (표준 확정 일정 연계)
  const userStartDate = new Date(currentStartDateStr || '2026-11-05');
  const userEndDate = new Date(userStartDate);
  userEndDate.setDate(userStartDate.getDate() + ((currentDurationDays || 30) - 1));

  const startFormatted = `${userStartDate.getFullYear()}.${String(userStartDate.getMonth() + 1).padStart(2, '0')}.${String(userStartDate.getDate()).padStart(2, '0')}`;
  const endFormatted = `${userEndDate.getFullYear()}.${String(userEndDate.getMonth() + 1).padStart(2, '0')}.${String(userEndDate.getDate()).padStart(2, '0')}`;

  // 1. 기간 매칭 축제 계산
  let matchedFestCount = 0;
  const matchedFestNames = [];
  festData.forEach(item => {
    if (item.statusType === 'confirmed' && item.officialConfirmedDates) {
      const fStart = new Date(item.officialConfirmedDates.start);
      const fEnd = new Date(item.officialConfirmedDates.end);
      if (fStart <= userEndDate && fEnd >= userStartDate) {
        matchedFestCount++;
        const i18n = (item.i18n && item.i18n[currentLang]) || {};
        const localizedName = i18n.name || item.name;
        matchedFestNames.push(localizedName.split('(')[0].trim());
      }
    }
  });

  const getIndicatorHtml = () => {
    if (matchedFestCount > 0) {
      if (currentLang === 'en') {
        return `🎯 <strong>Selected Trip Dates (${startFormatted} - ${endFormatted}, ${currentDurationDays} days)</strong>: <strong>${matchedFestCount} festival(s) overlap</strong> (Verify actual operations before visit: ${matchedFestNames.join(', ')})`;
      } else if (currentLang === 'ja') {
        return `🎯 <strong>選択した旅行期間（${startFormatted}〜${endFormatted}、${currentDurationDays}日間）</strong>内に<strong>${matchedFestCount}件</strong>の祭典が重なります（訪問前に公式運営要確認: ${matchedFestNames.join(', ')}）`;
      } else if (currentLang === 'zh') {
        return `🎯 <strong>所选出行期间（${startFormatted} ~ ${endFormatted}，共${currentDurationDays}天）</strong>内有<strong>${matchedFestCount}个</strong>节庆重合（出行前须核对官方实际运营: ${matchedFestNames.join(', ')}）`;
      } else {
        return `🎯 <strong>선택된 여행 기간(${startFormatted} ~ ${endFormatted}, ${currentDurationDays}일)</strong> 내 축제 <strong>${matchedFestCount}개</strong> 일정 중첩 (방문 전 공식 운영 확인 필수: ${matchedFestNames.join(', ')})`;
      }
    } else {
      if (currentLang === 'en') {
        return `🗓️ <strong>Selected Trip Dates: ${startFormatted} - ${endFormatted} (${currentDurationDays} days)</strong> · No official festivals overlap with these dates. Permanent viewpoints & historic sites recommended.`;
      } else if (currentLang === 'ja') {
        return `🗓️ <strong>選択した旅行期間：${startFormatted}〜${endFormatted}（${currentDurationDays}日間）</strong> · 公式確定祭典と重複しないため、常設名所や夜景ビュースポットの訪問をおすすめします。`;
      } else if (currentLang === 'zh') {
        return `🗓️ <strong>所选出行期间：${startFormatted} ~ ${endFormatted}（共${currentDurationDays}天）</strong> · 暂无重合的官方确定节庆，建议游览常设景点与全景夜景观景台。`;
      } else {
        return `🗓️ <strong>선택된 여행 기간: ${startFormatted} ~ ${endFormatted} (${currentDurationDays}일간)</strong> · 공식 확정 축제와 날짜가 겹치지 않으므로 상시 명소 및 야경 뷰포인트 방문을 권장합니다.`;
      }
    }
  };

  const indHtml = getIndicatorHtml();
  ['festMatchIndicatorText', 'festMatchIndicatorTextSpring', 'festMatchIndicatorTextAutumn'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.innerHTML = indHtml;
  });

  const renderFestCard = (item) => {
    const i18n = (item.i18n && item.i18n[currentLang]) || {};
    const localizedCountry = i18n.country || item.country;
    const localizedCity = i18n.city || item.city;
    const localizedName = i18n.name || item.name;
    const localizedTiming = i18n.typicalTiming || item.typicalTiming;
    const localizedStatus = i18n.statusLabel || item.statusLabel;
    const localizedVenue = i18n.venue || item.venue;
    const localizedDesc = i18n.description || item.description;
    const localizedCrowd = i18n.crowdsBooking || item.crowdsBooking;
    const localizedDiff = i18n.difficultyDesc || item.difficultyDesc;
    const localizedPrice = (item.priceInfo && item.priceInfo[currentLang]) || (item.priceInfo && item.priceInfo.ko) || '무료';
    const localizedNecessity = (item.bookingNecessity && item.bookingNecessity[currentLang]) || (item.bookingNecessity && item.bookingNecessity.ko) || '예매 불필요';

    let isOverlap = false;
    if (item.statusType === 'confirmed' && item.officialConfirmedDates) {
      const fStart = new Date(item.officialConfirmedDates.start);
      const fEnd = new Date(item.officialConfirmedDates.end);
      isOverlap = (fStart <= userEndDate && fEnd >= userStartDate);
    }

    const isSaved = savedCandidates.some(c => c.id === item.id);
    const saveBtnText = isSaved ? (dict['btn_saved_candidate'] || '✓ 저장됨') : (dict['btn_save_candidate'] || '⭐ 후보 저장');

    let statusBadgeClass = item.statusType === 'confirmed' ? 'confirmed' : (item.statusType === 'concluded_2026' ? 'concluded' : 'unconfirmed');

    let bookingBadgeText = dict['badge_booking_free'] || '🆓 무료 관람 · 예매 불필요';
    if (item.bookingBadge === 'required') {
      bookingBadgeText = dict['badge_booking_required'] || '🎟️ 사전 예매 필수 · 매진 주의';
    } else if (item.bookingBadge === 'optional') {
      bookingBadgeText = dict['badge_booking_optional'] || '🎫 부분 유료 · 선택 예매';
    }

    return `
      <article class="photo-card fest-card" id="card-${item.id}">
        <div class="photo-thumb-wrap loaded">
          <img src="${item.image}" alt="${localizedName}" class="photo-thumb loaded" loading="lazy"
               onload="this.classList.add('loaded');if(this.parentElement)this.parentElement.classList.add('loaded');"
               onerror="this.onerror=null;this.classList.add('loaded');if(this.parentElement)this.parentElement.classList.add('loaded');this.src='https://images.unsplash.com/photo-1543783207-ec64e4d95325?auto=format&fit=crop&w=800&q=80';" />
          <span class="photo-badge">${localizedCountry} · ${localizedCity}</span>
        </div>
        <div class="photo-body">
          ${isOverlap ? `<div class="badge-overlap-match">${dict['badge_overlap_check'] || dict['badge_overlap_match'] || (currentLang === 'en' ? '🎯 Trip Dates Overlap · Verify Before Visit' : (currentLang === 'ja' ? '🎯 旅行期間と重複 · 訪問前に要確認' : (currentLang === 'zh' ? '🎯 与行程重合 · 访问前须核实' : '🎯 여행 기간 중첩 · 방문 전 확인 필요')))}</div>` : ''}
          <div class="badge-fest-status ${statusBadgeClass}">${localizedStatus}</div>
          <h3 class="photo-title" style="margin-top:6px">${localizedName}</h3>
          <div class="photo-region">📍 ${localizedVenue}</div>
          <p class="photo-desc">${localizedDesc}</p>
          
          <div class="photo-highlight">
            <strong>📅 ${dict['lbl_typical_timing'] || '통상 시기'}:</strong> ${localizedTiming}<br>
            <strong>📌 ${dict['lbl_confirmed_dates'] || '확정 일정'}:</strong> ${item.confirmedDateRangeStr}
          </div>

          <!-- 티켓 가격 & 예매 필요성 안내 박스 -->
          <div class="fest-price-box">
            <div class="badge-booking ${item.bookingBadge || 'free'}">${bookingBadgeText}</div>
            <div class="price-row">
              <strong>💰 ${dict['lbl_price'] || '티켓 요금'}:</strong>
              <span>${localizedPrice}</span>
            </div>
            <div class="price-row">
              <strong>🎟️ ${dict['lbl_booking_need'] || '예매 필요성'}:</strong>
              <span>${localizedNecessity}</span>
            </div>
          </div>

          <div class="photo-meta-list">
            <div>
              <strong>👥 ${dict['lbl_crowd_booking'] || '혼잡/예약'}:</strong>
              <span>${localizedCrowd}</span>
            </div>
            <div style="margin-top:4px">
              <span class="badge-difficulty ${item.difficultyLevel || 'warning'}">${item.difficultyBadge}</span>
            </div>
            <div>
              <strong>👣 ${dict['lbl_walking_difficulty'] || '보행 가이드'}:</strong>
              <span>${localizedDiff}</span>
            </div>
          </div>

          <div class="card-action-bar">
            <a href="${item.bookingUrl || item.sourceUrl}" target="_blank" rel="noopener noreferrer" class="btn-booking-site" title="공식 예매 및 축제 사이트 이동">
              ${dict['btn_booking_portal'] || '🎫 공식 예매처 ↗'}
            </a>
            <a href="${item.videoUrl}" target="_blank" rel="noopener noreferrer" class="btn-video-preview" title="4K 현장 영상 및 랜선 투어 보기">
              ${dict['btn_watch_4k_video'] || '🎥 4K 현장 영상 ↗'}
            </a>
            <button type="button" class="btn-candidate-save ${isSaved ? 'saved' : ''}" onclick="toggleSaveCandidate('fest', '${item.id}')">
              ${saveBtnText}
            </button>
          </div>
        </div>
      </article>
    `;
  };

  // 2. 분할 그리드 렌더링 (봄/여름 4선 vs 가을/겨울 5선)
  const springFests = festData.filter(item => item.season === 'spring' || item.season === 'summer');
  const autumnFests = festData.filter(item => item.season === 'autumn' || item.season === 'winter');

  const springGrid = document.getElementById('festivalsSpringGrid');
  if (springGrid) {
    springGrid.innerHTML = springFests.map(renderFestCard).join('');
  }

  const autumnGrid = document.getElementById('festivalsAutumnGrid');
  if (autumnGrid) {
    autumnGrid.innerHTML = autumnFests.map(renderFestCard).join('');
  }

  // 기존 전체 그리드 호환
  const festGrid = document.getElementById('festivalsCardsGrid');
  if (festGrid) {
    festGrid.innerHTML = festData.map(renderFestCard).join('');
  }

  // 3. 야경 명소 카드 그리드 렌더링
  const nightGrid = document.getElementById('nightviewsCardsGrid');
  if (nightGrid) {
    nightGrid.innerHTML = nightData.map(item => {
      const i18n = (item.i18n && item.i18n[currentLang]) || {};
      const localizedCountry = i18n.country || item.country;
      const localizedCity = i18n.city || item.city;
      const localizedSpot = i18n.spot || item.spot;
      const localizedViewType = i18n.viewType || item.viewType;
      const localizedTime = i18n.recommendedTime || item.recommendedTime;
      const localizedTicket = i18n.operatingAndTicket || item.operatingAndTicket;
      const localizedDiff = i18n.difficultyDesc || item.difficultyDesc;
      const localizedNightReturn = i18n.nightReturnNotes || item.nightReturnNotes;
      const localizedPrice = (item.priceInfo && item.priceInfo[currentLang]) || (item.priceInfo && item.priceInfo.ko) || localizedTicket;
      const localizedNecessity = (item.bookingNecessity && item.bookingNecessity[currentLang]) || (item.bookingNecessity && item.bookingNecessity.ko) || '예매 불필요';

      const isSaved = savedCandidates.some(c => c.id === item.id);
      const saveBtnText = isSaved ? (dict['btn_saved_candidate'] || '✓ 저장됨') : (dict['btn_save_candidate'] || '⭐ 후보 저장');

      let bookingBadgeText = dict['badge_booking_free'] || '🆓 무료 관람 · 예매 불필요';
      if (item.bookingBadge === 'required') {
        bookingBadgeText = dict['badge_booking_required'] || '🎟️ 사전 예매 필수 · 매진 주의';
      } else if (item.bookingBadge === 'optional') {
        bookingBadgeText = dict['badge_booking_optional'] || '🎫 부분 유료 · 선택 예매';
      }

      return `
        <article class="photo-card night-card" id="card-${item.id}">
          <div class="photo-thumb-wrap loaded">
            <img src="${item.image}" alt="${localizedSpot}" class="photo-thumb loaded" loading="lazy"
                 onload="this.classList.add('loaded');if(this.parentElement)this.parentElement.classList.add('loaded');"
                 onerror="this.onerror=null;this.classList.add('loaded');if(this.parentElement)this.parentElement.classList.add('loaded');this.src='https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=800&q=80';" />
            <span class="photo-badge photo-badge-orange">${localizedCountry} · ${localizedCity}</span>
          </div>
          <div class="photo-body">
            <h3 class="photo-title">${localizedSpot}</h3>
            <div class="photo-region">🌃 ${dict['lbl_view_type'] || '전망 유형'}: ${localizedViewType}</div>
            <div class="photo-highlight">
              <strong>⏰ ${dict['lbl_best_view_time'] || '추천 조망 시간'}:</strong> ${localizedTime}<br>
              <strong>🎫 ${dict['lbl_admission_hours'] || '입장 & 요금'}:</strong> ${localizedTicket}
            </div>

            <!-- 티켓 요금 & 예매 필요성 안내 박스 -->
            <div class="fest-price-box">
              <div class="badge-booking ${item.bookingBadge || 'free'}">${bookingBadgeText}</div>
              <div class="price-row">
                <strong>💰 ${dict['lbl_price'] || '티켓 요금'}:</strong>
                <span>${localizedPrice}</span>
              </div>
              <div class="price-row">
                <strong>🎟️ ${dict['lbl_booking_need'] || '예매 필요성'}:</strong>
                <span>${localizedNecessity}</span>
              </div>
            </div>

            <div class="photo-meta-list">
              <div>
                <span class="badge-difficulty ${item.difficultyLevel || 'warning'}">${item.difficultyBadge}</span>
              </div>
              <div style="margin-top:4px">
                <strong>👣 ${dict['lbl_walking_difficulty'] || '보행 가이드'}:</strong>
                <span>${localizedDiff}</span>
              </div>
              <div style="margin-top:4px">
                <strong>🚕 ${dict['lbl_night_return_safety'] || '야간 안전 귀가 팁'}:</strong>
                <span style="color:#b91c1c">${localizedNightReturn}</span>
              </div>
            </div>

            <div class="card-action-bar">
              <a href="${item.bookingUrl || item.sourceUrl}" target="_blank" rel="noopener noreferrer" class="btn-booking-site" title="공식 예매 및 관광청 사이트 이동">
                ${dict['lbl_official_booking_site'] || '🎟️ 공식 예매처 ↗'}
              </a>
              <a href="${item.videoUrl}" target="_blank" rel="noopener noreferrer" class="btn-video-preview" title="4K 노을 및 야경 영상 보기">
                ${dict['lbl_watch_4k_video'] || '🎥 4K 현장 영상 ↗'}
              </a>
              <button type="button" class="btn-candidate-save ${isSaved ? 'saved' : ''}" onclick="toggleSaveCandidate('night', '${item.id}')">
                ${saveBtnText}
              </button>
            </div>
          </div>
        </article>
      `;
    }).join('');
  }

  // 4. 저장된 후보 목록 렌더링
  const savedGrid = document.getElementById('savedCandidatesGrid');
  if (savedGrid) {
    if (savedCandidates.length === 0) {
      savedGrid.innerHTML = `
        <div style="grid-column:1/-1;text-align:center;padding:48px 20px;background:#ffffff;border:1px dashed #d8cebe;border-radius:16px;">
          <div style="font-size:32px;margin-bottom:8px">⭐</div>
          <div style="font-weight:700;color:var(--primary);font-size:16px;">${dict['saved_empty_title'] || '아직 저장된 여행 후보가 없습니다.'}</div>
          <p style="font-size:13.5px;color:var(--muted);margin-top:6px;">
            ${dict['saved_empty_desc'] || '축제 및 야경 카드의 [⭐ 후보 저장] 버튼을 누르면 이 페이지에 모아서 한눈에 공부하고 비교할 수 있습니다.'}
          </p>
        </div>
      `;
    } else {
      savedGrid.innerHTML = savedCandidates.map(c => {
        if (c.type === 'fest') {
          const item = festData.find(x => x.id === c.id);
          return item ? renderFestCard(item) : '';
        } else if (c.type === 'practical_candidate' && typeof renderSavedPracticalCandidateCard === 'function') { return renderSavedPracticalCandidateCard(c.id); } else {
          const item = nightData.find(x => x.id === c.id);
          if (!item) return '';
          const i18n = (item.i18n && item.i18n[currentLang]) || {};
          const localizedCountry = i18n.country || item.country;
          const localizedCity = i18n.city || item.city;
          const localizedSpot = i18n.spot || item.spot;
          const localizedTime = i18n.recommendedTime || item.recommendedTime;
          const localizedDiff = i18n.difficultyDesc || item.difficultyDesc;
          const localizedPrice = (item.priceInfo && item.priceInfo[currentLang]) || (item.priceInfo && item.priceInfo.ko) || '무료';

          return `
            <article class="photo-card night-card" id="saved-card-${item.id}">
              <div class="photo-thumb-wrap loaded">
                <img src="${item.image}" alt="${localizedSpot}" class="photo-thumb loaded" loading="lazy" />
                <span class="photo-badge photo-badge-orange">${localizedCountry} · ${localizedCity}</span>
              </div>
              <div class="photo-body">
                <h3 class="photo-title">${localizedSpot}</h3>
                <div class="photo-highlight">
                  <strong>⏰ ${dict['lbl_best_view_time'] || '추천 조망 시간'}:</strong> ${localizedTime}<br>
                  <strong>💰 ${dict['lbl_price'] || '티켓 요금'}:</strong> ${localizedPrice}
                </div>
                <div class="photo-meta-list">
                  <div>${localizedDiff}</div>
                </div>
                <div class="card-action-bar">
                  <a href="${item.videoUrl}" target="_blank" rel="noopener noreferrer" class="btn-video-preview">
                    ${dict['lbl_watch_4k_video'] || '🎥 4K 영상 ↗'}
                  </a>
                  <button type="button" class="btn-candidate-save saved" onclick="toggleSaveCandidate('night', '${item.id}')">
                    ${dict['btn_saved_candidate'] || '✓ 저장됨 (제거)'}
                  </button>
                </div>
              </div>
            </article>
          `;
        }
      }).join('');
    }
  }
}

window.renderFestivalsAndNightViews = renderFestivalsAndNightViews;

// Initialize festivals and night views on initial script execution
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    if (typeof renderFestivalsAndNightViews === 'function') renderFestivalsAndNightViews();
  });
} else {
  setTimeout(() => {
    if (typeof renderFestivalsAndNightViews === 'function') renderFestivalsAndNightViews();
  }, 100);
}


// ==========================================================================
// 📚 디지털 여행 가이드북 (Digital Travel Guidebook) 장별(Chapter) 전환 시스템
// ==========================================================================
window.currentActiveChapter = 'chapter-overview';

const GUIDEBOOK_CHAPTERS = [
  'chapter-overview',
  'chapter-planner',
  'chapter-guide',
  'chapter-festivals',
  'chapter-practical'
];

// ==========================================================================
// 📖 디지털 가이드북 책장 넘기기 (Book Page Flip & Turn) 시스템 변수
// ==========================================================================
window.currentBookPage = {
  'chapter-overview': 0,
  'chapter-planner': 0,
  'chapter-guide': 0,
  'chapter-festivals': 0,
  'chapter-practical': 0
};

const CHAPTER_PAGE_COUNTS = {
  'chapter-overview': 3,
  'chapter-planner': 4,
  'chapter-guide': 5,
  'chapter-festivals': 4,
  'chapter-practical': 5
};
window.CHAPTER_PAGE_COUNTS = CHAPTER_PAGE_COUNTS;

function switchGuidebookChapter(chapterId, shouldScroll = true) {
  try { localStorage.setItem('slowtravel_last_chapter', chapterId); } catch (e) { }
  if (!GUIDEBOOK_CHAPTERS.includes(chapterId)) {
    chapterId = 'chapter-overview';
  }

  window.currentActiveChapter = chapterId;
  if (typeof renderMasterGourmetGuide === 'function') { renderMasterGourmetGuide(typeof currentLang !== 'undefined' ? currentLang : 'ko', window.masterGourmetActiveCountry || 'all'); }

  // 1. 본문 챕터 표시 전환
  document.querySelectorAll('.guidebook-chapter').forEach(ch => {
    if (ch.id === chapterId) {
      ch.classList.add('active');
    } else {
      ch.classList.remove('active');
    }
  });

  // 2. 좌측 목차 사이드바(데스크톱) 활성 상태 동기화
  document.querySelectorAll('#sidebarChapterNav .sidebar-nav-item').forEach(item => {
    const isTarget = item.getAttribute('data-chapter') === chapterId;
    item.classList.toggle('active', isTarget);
    item.setAttribute('aria-selected', isTarget ? 'true' : 'false');
  });

  // 3. 모바일 하단 메뉴 활성 상태 동기화
  document.querySelectorAll('#mobileBottomNav .mobile-nav-btn').forEach(btn => {
    const isTarget = btn.getAttribute('data-chapter') === chapterId;
    btn.classList.toggle('active', isTarget);
  });

  // 3-B. 모바일 접이식 목차 토글 바 상태 및 라벨 동기화
  document.querySelectorAll('#mobileTocDropdown .mobile-toc-link-item').forEach(item => {
    const isTarget = item.getAttribute('data-chapter') === chapterId;
    item.classList.toggle('active', isTarget);
  });
  const tocLabelEl = document.getElementById('mobileTocTitleText');
  if (tocLabelEl) {
    const dict = (typeof I18N_DICTIONARY !== 'undefined' && I18N_DICTIONARY[currentLang]) || {};
    const chapterNamesMap = {
      'chapter-overview': dict['chapter_name_overview'] || '제1장 여행 개요',
      'chapter-planner': dict['chapter_name_planner'] || '제2장 일정 플래너',
      'chapter-guide': dict['chapter_name_guide'] || '제3장 지역 가이드',
      'chapter-festivals': dict['chapter_name_festivals'] || '제4장 축제 & 야경',
      'chapter-practical': dict['chapter_name_practical'] || '제5장 여행 실용정보'
    };
    const prefix = (currentLang === 'en' ? 'Guidebook TOC: ' : (currentLang === 'ja' ? 'ガイドブック目次: ' : (currentLang === 'zh' ? '指南目录: ' : '가이드북 목차: ')));
    tocLabelEl.textContent = prefix + (chapterNamesMap[chapterId] || '');
  }

  // 4. 상단 헤더 내비게이션 활성 상태 동기화
  document.querySelectorAll('#globalNav .nav-link').forEach(link => {
    const isTarget = link.getAttribute('data-chapter') === chapterId;
    link.classList.toggle('active', isTarget);
  });

  // 5. URL 해시 동기화 (#planner, #guide, #festivals, #practical, #overview)
  const hashSlug = chapterId.replace('chapter-', '');
  if (window.location.hash !== '#' + hashSlug) {
    history.replaceState(null, '', '#' + hashSlug);
  }

  // 6. 페이지 상태 및 플로팅 배지 동기화
  const activePageIdx = (window.currentBookPage && window.currentBookPage[chapterId]) || 0;
  goToBookPage(chapterId, activePageIdx, false);

  // 6-B. 페이지 상단 스크롤
  if (shouldScroll) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // 7. 챕터별 데이터 렌더러 보장 및 Leaflet 지도 리사이즈
  try {
    if (chapterId === 'chapter-planner') {
      if (typeof applyPlanReconfiguration === 'function') {
        applyPlanReconfiguration(false);
      }
    } else if (chapterId === 'chapter-guide') {
      if (typeof renderGlobalLandmarks === 'function') {
        renderGlobalLandmarks();
      }
      if (typeof renderSeniorDistrictRoutes === 'function') {
        renderSeniorDistrictRoutes();
        if (typeof renderItalyCityGuide === "function") renderItalyCityGuide();
      }
      setTimeout(() => {
        if (window.landmarksMap && typeof window.landmarksMap.invalidateSize === 'function') {
          window.landmarksMap.invalidateSize();
        }
      }, 100);
    } else if (chapterId === 'chapter-festivals') {
      if (typeof renderFestivalsAndNightViews === 'function') {
        renderFestivalsAndNightViews();
      }
    } else if (chapterId === 'chapter-practical') {
      if (typeof renderGlobalDining === 'function') {
        renderGlobalDining();
      }
      if (typeof renderLocalPhrases === 'function') {
        renderLocalPhrases();
      }
      if (typeof renderTransitGuide === 'function') {
        renderTransitGuide();
      }
      if (typeof renderHotelsGrid === 'function') {
        renderHotelsGrid();
      }
      setTimeout(() => {
        if (window.diningMap && typeof window.diningMap.invalidateSize === 'function') {
          window.diningMap.invalidateSize();
        }
      }, 100);
    }
  } catch (err) {
    console.error('Error during chapter renderer activation:', err);
  }
}
window.switchGuidebookChapter = switchGuidebookChapter;

// 해시 기반 챕터 라우팅 (외부 링크, 즐겨찾기, #planner 호환)
function handleGuidebookHashRouting(scrollIntoElement = false) {
  const hash = (window.location.hash || '').toLowerCase();
  let targetChapter = (function () {
    try {
      const saved = localStorage.getItem('slowtravel_last_chapter');
      if (saved && GUIDEBOOK_CHAPTERS.includes(saved) && !window.location.hash) return saved;
    } catch (e) { }
    return 'chapter-overview';
  })();
  let targetElementId = null;

  if (hash === '#planner' || hash === '#route-itinerary' || hash === '#budget' || hash === '#timelinegrid' || hash === '#gourmet' || hash === '#food' || hash === '#snacks' || hash === '#summary-gourmet') {
    targetChapter = 'chapter-planner';
    targetElementId = (hash === '#gourmet' || hash === '#food' || hash === '#snacks') ? 'summary-gourmet' : hash.replace('#', '');
  } else if (hash === '#festivals' || hash === '#festivals-nightviews' || hash === '#nightviews') {
    targetChapter = 'chapter-festivals';
    targetElementId = 'festivals-nightviews';
  } else if (hash === '#guide' || hash === '#attractions' || hash === '#route' || hash === '#recommend' || hash === '#travel-guide') {
    targetChapter = 'chapter-guide';
    targetElementId = hash.replace('#', '');
  } else if (hash === '#practical' || hash === '#dining' || hash === '#phrases' || hash === '#transit-hotels' || hash === '#ai-search' || hash === '#travel-tools') {
    targetChapter = 'chapter-practical';
    targetElementId = hash.replace('#', '');
  } else if (hash === '#overview' || hash === '#hero' || hash === '#editorial-guide' || hash === '#curated-options' || hash === '#compare') {
    targetChapter = 'chapter-overview';
    targetElementId = hash.replace('#', '');
  }

  switchGuidebookChapter(targetChapter, !targetElementId);

  if (targetElementId && scrollIntoElement) {
    setTimeout(() => {
      const el = document.getElementById(targetElementId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  }
}
window.handleGuidebookHashRouting = handleGuidebookHashRouting;

// 키보드 단축키로 장 전환 ([ / ] 또는 1~5)
document.addEventListener('keydown', (e) => {
  const tag = (e.target.tagName || '').toLowerCase();
  if (tag === 'input' || tag === 'textarea' || tag === 'select' || e.target.isContentEditable) return;
  if (e.altKey || e.ctrlKey || e.metaKey) return;

  const currentIdx = GUIDEBOOK_CHAPTERS.indexOf(window.currentActiveChapter);

  if (e.key === '[' || e.key === 'ArrowLeft') {
    if (currentIdx > 0) {
      switchGuidebookChapter(GUIDEBOOK_CHAPTERS[currentIdx - 1]);
    }
  } else if (e.key === ']' || e.key === 'ArrowRight') {
    if (currentIdx < GUIDEBOOK_CHAPTERS.length - 1) {
      switchGuidebookChapter(GUIDEBOOK_CHAPTERS[currentIdx + 1]);
    }
  } else if (['1', '2', '3', '4', '5'].includes(e.key)) {
    const idx = parseInt(e.key, 10) - 1;
    if (GUIDEBOOK_CHAPTERS[idx]) {
      switchGuidebookChapter(GUIDEBOOK_CHAPTERS[idx]);
    }
  }
});

// 해시 변경 이벤트 리스너
window.addEventListener('hashchange', () => {
  handleGuidebookHashRouting(true);
});

// 초기 실행 시 해시 라우팅 적용
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    handleGuidebookHashRouting(false);
  });
} else {
  handleGuidebookHashRouting(false);
}


// (CHAPTER_PAGE_COUNTS moved above switchGuidebookChapter to avoid TDZ)

function goToBookPage(chapterId, pageIndex, shouldScroll = true) {
  const maxPages = CHAPTER_PAGE_COUNTS[chapterId] || 1;
  if (pageIndex < 0) pageIndex = 0;
  if (pageIndex >= maxPages) pageIndex = maxPages - 1;

  if (!window.currentBookPage) window.currentBookPage = {};
  window.currentBookPage[chapterId] = pageIndex;
  window.currentActiveChapter = chapterId;

  // 1. 해당 챕터 내 book-page 클래스 활성화 전환
  const chapterEl = document.getElementById(chapterId);
  if (chapterEl) {
    const pages = chapterEl.querySelectorAll('.book-page');
    pages.forEach((p, idx) => {
      const isTarget = idx === pageIndex;
      p.classList.toggle('active', isTarget);
    });

    // 2. 북마크 탭 활성 상태 동기화
    const tabContainer = document.getElementById('tabs-' + chapterId);
    if (tabContainer) {
      tabContainer.querySelectorAll('.bookmark-chip').forEach((chip, idx) => {
        chip.classList.toggle('active', idx === pageIndex);
      });
    }

    // 3. 페이지 카운터 갱신 (P. 1 / 4)
    const counterEl = document.getElementById('counter-' + chapterId);
    if (counterEl) {
      counterEl.textContent = 'P. ' + (pageIndex + 1) + ' / ' + maxPages;
    }

    // 3-B. 상단 글로벌 헤더 메뉴 및 목차 사이드바 동기화
    document.querySelectorAll('#globalNav .nav-link').forEach(link => {
      link.classList.toggle('active', link.getAttribute('data-chapter') === chapterId);
    });
    document.querySelectorAll('#sidebarChapterNav .sidebar-nav-item').forEach(item => {
      const isTarget = item.getAttribute('data-chapter') === chapterId;
      item.classList.toggle('active', isTarget);
      item.setAttribute('aria-selected', isTarget ? 'true' : 'false');
    });
    document.querySelectorAll('#mobileBottomNav .mobile-nav-btn').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-chapter') === chapterId);
    });
    document.querySelectorAll('#mobileTocDropdown .mobile-toc-link-item').forEach(item => {
      item.classList.toggle('active', item.getAttribute('data-chapter') === chapterId);
    });

    // 4. 하단 플로팅 북 리더 뱃지 갱신
    const dict = (typeof I18N_DICTIONARY !== 'undefined' && I18N_DICTIONARY[currentLang]) || {};
    const chapNames = {
      'chapter-overview': dict['chapter_name_overview'] || (currentLang === 'en' ? 'Ch. 1 Trip Overview' : (currentLang === 'ja' ? '第1章 旅行概要' : (currentLang === 'zh' ? '第1章 旅行概览' : '01. 여행 개요'))),
      'chapter-planner': dict['chapter_name_planner'] || (currentLang === 'en' ? 'Ch. 2 Itinerary Planner' : (currentLang === 'ja' ? '第2章 日程プランナー' : (currentLang === 'zh' ? '第2章 行程规划' : '02. 일정 플래너'))),
      'chapter-guide': dict['chapter_name_guide'] || (currentLang === 'en' ? 'Ch. 3 Regional Guide' : (currentLang === 'ja' ? '第3章 地域ガイド' : (currentLang === 'zh' ? '第3章 区域指南' : '03. 지역 가이드'))),
      'chapter-festivals': dict['chapter_name_festivals'] || (currentLang === 'en' ? 'Ch. 4 Festivals & Nightlife' : (currentLang === 'ja' ? '第4章 祭り＆夜景' : (currentLang === 'zh' ? '第4章 节日与夜景' : '04. 축제 & 야경'))),
      'chapter-practical': dict['chapter_name_practical'] || (currentLang === 'en' ? 'Ch. 5 Practical Info' : (currentLang === 'ja' ? '第5章 旅行実用情報' : (currentLang === 'zh' ? '第5章 实用旅行信息' : '05. 여행 실용정보')))
    };
    const tocLabelEl = document.getElementById('mobileTocTitleText');
    if (tocLabelEl) {
      const prefix = (currentLang === 'en' ? 'Guidebook TOC: ' : (currentLang === 'ja' ? 'ガイドブック目次: ' : (currentLang === 'zh' ? '指南目录: ' : '가이드북 목차: ')));
      tocLabelEl.textContent = prefix + (chapNames[chapterId] || '');
    }
    const floatEl = document.getElementById('floatBookBadge');
    if (floatEl) {
      const shortName = chapNames[chapterId] || '';
      floatEl.textContent = '📖 ' + shortName + ' · P. ' + (pageIndex + 1) + ' / ' + maxPages;
    }

    // 5. Chapter 3의 경우 4페이지(index 3) 대형 지도 뷰 활성화
    if (chapterId === 'chapter-guide' && pageIndex === 3) {
      setTimeout(() => {
        if (typeof renderBigLandmarksMap === 'function') {
          renderBigLandmarksMap();
        } else if (window.landmarksMapInstance && typeof window.landmarksMapInstance.invalidateSize === 'function') {
          window.landmarksMapInstance.invalidateSize();
        }
      }, 150);
    }

    // 6. Chapter 4의 경우 렌더링 갱신
    if (chapterId === 'chapter-festivals') {
      if (typeof renderFestivalsAndNightViews === 'function') {
        renderFestivalsAndNightViews();
      }
    }
  }

  if (shouldScroll) {
    const barEl = document.getElementById('bookBar-' + chapterId);
    if (barEl) {
      barEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
}
window.goToBookPage = goToBookPage;

function turnBookPage(chapterId, delta) {
  const currentIdx = window.currentBookPage[chapterId] || 0;
  const maxPages = CHAPTER_PAGE_COUNTS[chapterId] || 1;
  const nextIdx = currentIdx + delta;

  if (nextIdx >= 0 && nextIdx < maxPages) {
    goToBookPage(chapterId, nextIdx, true);
  } else if (nextIdx >= maxPages) {
    // 다음 장으로 넘어가기
    const chapList = GUIDEBOOK_CHAPTERS;
    const currentChapIdx = chapList.indexOf(chapterId);
    if (currentChapIdx < chapList.length - 1) {
      const nextChap = chapList[currentChapIdx + 1];
      switchGuidebookChapter(nextChap, true);
      goToBookPage(nextChap, 0, true);
    }
  } else if (nextIdx < 0) {
    // 이전 장의 마지막 페이지로 넘어가기
    const chapList = GUIDEBOOK_CHAPTERS;
    const currentChapIdx = chapList.indexOf(chapterId);
    if (currentChapIdx > 0) {
      const prevChap = chapList[currentChapIdx - 1];
      switchGuidebookChapter(prevChap, true);
      goToBookPage(prevChap, (CHAPTER_PAGE_COUNTS[prevChap] || 1) - 1, true);
    }
  }
}
window.turnBookPage = turnBookPage;

// 키보드 PageUp / PageDown 책 넘기기 연동
document.addEventListener('keydown', (e) => {
  const tag = (e.target.tagName || '').toLowerCase();
  if (tag === 'input' || tag === 'textarea' || tag === 'select' || e.target.isContentEditable) return;

  if (e.key === 'PageDown' || (e.shiftKey && e.key === 'ArrowRight')) {
    e.preventDefault();
    turnBookPage(window.currentActiveChapter, 1);
  } else if (e.key === 'PageUp' || (e.shiftKey && e.key === 'ArrowLeft')) {
    e.preventDefault();
    turnBookPage(window.currentActiveChapter, -1);
  }
});


// ========================================================
// SAFETY & WATER INTERACTIVE CONTROLS
// ========================================================
function filterSafetyWaterSection(mode) {
  const blockSafety = document.getElementById('blockSafetyProtocol');
  const blockWater = document.getElementById('blockWaterProtocol');
  const blockDress = document.getElementById('blockDressProtocol');
  const blockToilet = document.getElementById('blockToiletProtocol');
  const btnAll = document.getElementById('tabBtnSafetyAll');
  const btnSafety = document.getElementById('tabBtnSafetyOnly');
  const btnWater = document.getElementById('tabBtnWaterOnly');
  const btnDress = document.getElementById('tabBtnDressOnly');
  const btnToilet = document.getElementById('tabBtnToiletOnly');

  [btnAll, btnSafety, btnWater, btnDress, btnToilet].forEach(b => { if (b) b.classList.remove('active'); });

  if (mode === 'safety') {
    if (blockSafety) blockSafety.style.display = 'flex';
    if (blockWater) blockWater.style.display = 'none';
    if (blockDress) blockDress.style.display = 'none';
    if (blockToilet) blockToilet.style.display = 'none';
    if (btnSafety) btnSafety.classList.add('active');
  } else if (mode === 'water') {
    if (blockSafety) blockSafety.style.display = 'none';
    if (blockWater) blockWater.style.display = 'flex';
    if (blockDress) blockDress.style.display = 'none';
    if (blockToilet) blockToilet.style.display = 'none';
    if (btnWater) btnWater.classList.add('active');
  } else if (mode === 'dress') {
    if (blockSafety) blockSafety.style.display = 'none';
    if (blockWater) blockWater.style.display = 'none';
    if (blockDress) blockDress.style.display = 'flex';
    if (blockToilet) blockToilet.style.display = 'none';
    if (btnDress) btnDress.classList.add('active');
  } else if (mode === 'toilet') {
    if (blockSafety) blockSafety.style.display = 'none';
    if (blockWater) blockWater.style.display = 'none';
    if (blockDress) blockDress.style.display = 'none';
    if (blockToilet) blockToilet.style.display = 'flex';
    if (btnToilet) btnToilet.classList.add('active');
  } else {
    if (blockSafety) blockSafety.style.display = 'flex';
    if (blockWater) blockWater.style.display = 'flex';
    if (blockDress) blockDress.style.display = 'flex';
    if (blockToilet) blockToilet.style.display = 'flex';
    if (btnAll) btnAll.classList.add('active');
  }
}

function toggleDressChecklist() {
  const content = document.getElementById('dressChecklistContent');
  const btn = document.getElementById('btnToggleDressChecklist');
  const label = document.getElementById('dressToggleLabel');
  if (!content) return;
  const isHidden = content.style.display === 'none';
  content.style.display = isHidden ? 'block' : 'none';
  if (btn) btn.setAttribute('aria-expanded', isHidden ? 'true' : 'false');
  if (label) {
    const lang = (typeof currentLang !== 'undefined' ? currentLang : 'ko');
    const dict = (typeof I18N_DICTIONARY !== 'undefined' && I18N_DICTIONARY[lang]) || {};
    if (isHidden) {
      label.textContent = dict['btn_collapse'] || (lang === 'en' ? 'Collapse ▲' : (lang === 'ja' ? '折りたたむ ▲' : (lang === 'zh' ? '收起 ▲' : '접어두기 ▲')));
    } else {
      label.textContent = dict['btn_expand'] || (lang === 'en' ? 'Expand ▼' : (lang === 'ja' ? '展開する ▼' : (lang === 'zh' ? '展开 ▼' : '펼쳐보기 ▼')));
    }
  }
}
window.toggleDressChecklist = toggleDressChecklist;
window.filterSafetyWaterSection = filterSafetyWaterSection;

function testWaterSqueeze(type) {
  const lang = (typeof currentLang !== 'undefined' ? currentLang : window.currentLang) || document.documentElement.lang || 'ko';
  const dict = (typeof I18N_DICTIONARY !== 'undefined' && I18N_DICTIONARY[lang]) || {};

  if (type === 'still') {
    const waist = document.getElementById('waistStill');
    const finger = document.getElementById('fingerStill');
    const feedback = document.getElementById('dentFeedbackStill');
    const pill = document.getElementById('resStillBottle');

    if (waist) waist.classList.add('is-squished');
    if (finger) finger.classList.add('finger-push');
    if (feedback) feedback.classList.add('show-feedback');
    if (pill) {
      pill.classList.add('pulse-anim');
      const fallbackStill = (lang === 'en' ? '💧 Easily Indents! (Zero Gas Pressure · Soft & Flexible)' : (lang === 'ja' ? '💧 柔らかくへこむ！（ガス圧ゼロ・軟水）' : (lang === 'zh' ? '💧 轻松捏瘪凹陷！（无内部气压·轻柔纯净水）' : '💧 쑥 들어감! (가스 압력 없음 · 부드러운 맹물)')));
      pill.innerHTML = (dict && dict['res_squeeze_still']) || fallbackStill;
    }

    setTimeout(() => {
      if (waist) waist.classList.remove('is-squished');
      if (finger) finger.classList.remove('finger-push');
      if (feedback) feedback.classList.remove('show-feedback');
      if (pill) pill.classList.remove('pulse-anim');
    }, 1300);

    const msgs = {
      ko: '🟢 일반 생수 (Agua sin gas): 손으로 꾹 누르면 말랑말랑하게 쑥 들어갑니다! (압력 0.0 bar)',
      en: '🟢 Still Water (Agua sin gas): Squeezes smoothly inward! Zero internal gas pressure (0.0 bar).',
      ja: '🟢 普通の水（Agua sin gas）: 指で押すとペコペコと柔らかくへこみます！（ガス圧 0.0 bar）',
      zh: '🟢 普通饮用水（Agua sin gas）：手指按压轻松捏瘪凹陷！无内部气体压力（0.0 bar）。'
    };
    if (typeof showToast === 'function') showToast(msgs[lang] || msgs.ko);
  } else {
    const bottle = document.getElementById('bottleGraphicSpark');
    const finger = document.getElementById('fingerSpark');
    const feedback = document.getElementById('dentFeedbackSpark');
    const pill = document.getElementById('resSparkBottle');

    if (bottle) bottle.classList.add('is-deflecting');
    if (finger) finger.classList.add('finger-repelled');
    if (feedback) feedback.classList.add('show-feedback');
    if (pill) {
      pill.classList.add('pulse-anim');
      const fallbackSpark = (lang === 'en' ? '⚡ Deflects Rigidly! (High Carbonation · Rock-Hard)' : (lang === 'ja' ? '⚡ ガチガチ！弾き返す（高圧炭酸・石のように硬い）' : (lang === 'zh' ? '⚡ 坚硬紧绷反弹！（高压碳酸气体·坚硬如石）' : '⚡ 팅! 튕겨냄 (고압 탄산 가스 · 돌덩이처럼 팽팽)')));
      pill.innerHTML = (dict && dict['res_squeeze_spark']) || fallbackSpark;
    }

    setTimeout(() => {
      if (bottle) bottle.classList.remove('is-deflecting');
      if (finger) finger.classList.remove('finger-repelled');
      if (feedback) feedback.classList.remove('show-feedback');
      if (pill) pill.classList.remove('pulse-anim');
    }, 1300);

    const msgs = {
      ko: '🔴 탄산수 (Agua con gas): 빵빵한 탄산가스 압력(3.8 bar) 때문에 돌덩이처럼 팽팽하게 손을 튕겨냅니다!',
      en: '🔴 Sparkling Water (Agua con gas): High carbonation pressure (3.8 bar) makes it rock-hard, deflecting fingers!',
      ja: '🔴 炭酸水（Agua con gas）: 強い炭酸ガス内圧（3.8 bar）のため石のように硬く、指を跳ね返します！',
      zh: '🔴 气泡水（Agua con gas）：内部高压碳酸气体（3.8 bar）如磐石般坚硬紧绷，瞬间弹开手指！'
    };
    if (typeof showToast === 'function') showToast(msgs[lang] || msgs.ko);
  }
}
window.testWaterSqueeze = testWaterSqueeze;


// ==========================================================================
// 🧭 부모님 동행 루트 & 명소 카드 연계 및 모바일 목차 내비게이션 헬퍼
// ==========================================================================
function scrollToLandmarkCard(cardId) {
  if (window.currentActiveChapter !== 'chapter-guide') {
    switchGuidebookChapter('chapter-guide', false);
  }
  goToBookPage('chapter-guide', 1, false);

  setTimeout(() => {
    const el = document.getElementById(cardId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      el.classList.add('highlight-card-pulse');
      setTimeout(() => el.classList.remove('highlight-card-pulse'), 3000);
    }
  }, 150);
}
window.scrollToLandmarkCard = scrollToLandmarkCard;

function scrollToDistrict(districtId) {
  if (window.currentActiveChapter !== 'chapter-guide') {
    switchGuidebookChapter('chapter-guide', false);
  }
  goToBookPage('chapter-guide', 0, false);

  setTimeout(() => {
    const el = document.getElementById(districtId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      el.classList.add('highlight-card-pulse');
      setTimeout(() => el.classList.remove('highlight-card-pulse'), 2500);
    }
  }, 150);
}
window.scrollToDistrict = scrollToDistrict;

// ==========================================================================
// 🇪🇸 60대 부모님 동행 스페인 구역별 루트 & 이동 비교 동적 다국어 렌더러
// ==========================================================================
function renderSeniorDistrictRoutes(lang = (typeof currentLang !== 'undefined' ? currentLang : 'ko')) {
  const allData = (typeof SENIOR_DISTRICTS_I18N !== 'undefined' ? SENIOR_DISTRICTS_I18N : (typeof window !== 'undefined' ? window.SENIOR_DISTRICTS_I18N : null));
  if (!allData) return;
  const data = allData[lang] || allData['ko'];
  if (!data) return;

  // 1. Fact-checking principle banner
  const bannerEl = document.getElementById('verifiedPrincipleBanner');
  if (bannerEl && data.banner) {
    bannerEl.innerHTML = `
      <div class="vp-icon">⚠️</div>
      <div class="vp-content">
        <strong>${data.banner.title}</strong>
        <span>${data.banner.text}</span>
      </div>
    `;
  }

  // 2. District Nav Bar
  const navEl = document.getElementById('districtNavBar');
  if (navEl && data.nav) {
    navEl.innerHTML = `
      <span class="d-nav-label">${data.nav.label}</span>
      <div class="d-nav-chips">
        ${(data.nav.chips || []).map(c => `
          <button type="button" class="d-chip ${c.class || ''}" onclick="${c.id === 'landmarksCollectionHead' ? "document.getElementById('landmarksCollectionHead').scrollIntoView({behavior:'smooth'})" : "scrollToDistrict('" + c.id + "')"}">${c.text}</button>
        `).join('')}
      </div>
    `;
  }

  // 3. District Routes Container
  const containerEl = document.getElementById('districtRoutesContainer');
  if (containerEl && data.districts) {
    const lbl = data.labels || {};
    let html = '';

    // First 4 Barcelona districts
    data.districts.slice(0, 4).forEach(d => {
      html += renderSingleDistrictCardHtml(d, lbl);
    });

    // Transit Table Card
    if (data.transitTable) {
      html += renderTransitTableCardHtml(data.transitTable, lbl);
    }

    // Remaining 4 Seville districts & 2 Candidate day trips
    data.districts.slice(4).forEach(d => {
      html += renderSingleDistrictCardHtml(d, lbl);
    });

    // 5. Rome 12-Day Extension Section
    if (data.romeSection) {
      // Rome is now rendered in premier Italy City Guide (Page 0)
    }

    containerEl.innerHTML = html;
  }

  // 4. Landmarks Collection Head
  const headEl = document.getElementById('landmarksCollectionHead');
  if (headEl && data.collectionHead) {
    headEl.innerHTML = `
      <div class="kicker">${data.collectionHead.kicker}</div>
      <h3 style="font-size:22px;color:var(--primary);margin:4px 0 8px;">${data.collectionHead.title}</h3>
      <p style="font-size:14px;color:#555;margin:0 0 20px;">${data.collectionHead.desc}</p>
    `;
  }
}
window.renderSeniorDistrictRoutes = renderSeniorDistrictRoutes;

function renderSingleDistrictCardHtml(d, lbl) {
  return `
    <article class="district-route-card" id="${d.id}">
      <div class="district-card-header">
        <div class="d-badge-row">
          <span class="d-badge ${d.badgeClass || ''}">${d.badge}</span>
          <span class="d-time-badge">${d.timing}</span>
        </div>
        <h3 class="district-title">${d.title}</h3>
        <p class="district-desc">${d.desc}</p>
      </div>
      <div class="district-card-body">
        <div class="d-row">
          <span class="d-row-label">🏛️ ${lbl.keySpots || '핵심 명소:'}</span>
          <div class="d-landmarks-pills">
            ${(d.landmarks || []).map(lm => `
              <button type="button" class="d-lm-pill" onclick="scrollToLandmarkCard('${lm.cardId}')">${lm.name}</button>
            `).join('')}
          </div>
        </div>
        <div class="d-row">
          <span class="d-row-label">🚶 ${lbl.recSequence || '추천 순서:'}</span>
          <span class="d-row-text">${d.sequence}</span>
        </div>
        <div class="d-row">
          <span class="d-row-label">🚕 ${lbl.transitTip || '구간 이동 팁:'}</span>
          <span class="d-row-text">${d.transit}</span>
        </div>
        <div class="d-row">
          <span class="d-row-label">👟 ${lbl.walkingEst || '예상 보행 부담:'}</span>
          <span class="d-row-text">${d.walking}</span>
        </div>
        <div class="d-row warning">
          <span class="d-row-label">⚠️ ${lbl.walkingWarn || '계단·경사·노면:'}</span>
          <div class="d-row-text">${d.warning}</div>
        </div>
        <div class="d-row">
          <span class="d-row-label">🚻 ${lbl.restStops || '화장실·쉼터:'}</span>
          <span class="d-row-text">${d.rest}</span>
        </div>
        <div class="d-row">
          <span class="d-row-label">🛑 ${lbl.skipAlt || '피로 시 생략/대안:'}</span>
          <span class="d-row-text">${d.skip}</span>
        </div>
        <div class="district-card-footer">
          <span class="d-source-label">✓ ${lbl.officialSource || '공식 검증 출처:'}</span>
          <div class="d-source-links">
            ${(d.sources || []).map(s => `
              <a href="${s.url}" target="_blank" rel="noopener noreferrer">${s.name} ↗</a>
            `).join('')}
            <span class="d-verify-date">${d.verifyNote || ''}</span>
          </div>
        </div>
      </div>
    </article>
  `;
}

function renderTransitTableCardHtml(t, lbl) {
  return `
    <article class="district-route-card transit-comparison-card" id="${t.id || 'district-transit-bcn-svq'}">
      <div class="district-card-header">
        <div class="d-badge-row">
          <span class="d-badge transit-badge">${t.badge}</span>
          <span class="d-time-badge">${t.timing}</span>
        </div>
        <h3 class="district-title">${t.title}</h3>
        <p class="district-desc">${t.desc}</p>
      </div>
      <div class="district-card-body">
        <div class="transit-unconfirmed-notice">
          ${t.unconfirmedNotice}
        </div>
        <div class="transit-table-wrapper">
          <table class="transit-compare-table">
            <thead>
              <tr>
                <th>${t.headers[0]}</th>
                <th class="col-train">${t.headers[1]}</th>
                <th class="col-flight">${t.headers[2]}</th>
              </tr>
            </thead>
            <tbody>
              ${t.rows.map(r => `
                <tr>
                  <td><strong>${r.label}</strong></td>
                  <td class="${r.isRec ? 'rec-cell' : ''}">${r.train}</td>
                  <td>${r.flight}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
        <div class="district-card-footer" style="margin-top:12px;">
          <span class="d-source-label">✓ ${lbl.officialSource || '공식 검증 출처:'}</span>
          <div class="d-source-links">
            <a href="${t.source.url}" target="_blank" rel="noopener noreferrer">${t.source.name} ↗</a>
            <span class="d-verify-date">${t.source.verifyNote}</span>
          </div>
        </div>
      </div>
    </article>
  `;
}

function toggleMobileToc(force) {
  const dropdown = document.getElementById('mobileTocDropdown');
  const btn = document.getElementById('mobileTocToggleBtn');
  const arrow = document.getElementById('mobileTocArrow');
  if (!dropdown) return;
  const isCurrentlyOpen = dropdown.style.display !== 'none';
  const shouldOpen = force !== undefined ? force : !isCurrentlyOpen;
  dropdown.style.display = shouldOpen ? 'block' : 'none';
  if (btn) btn.setAttribute('aria-expanded', shouldOpen ? 'true' : 'false');
  if (arrow) arrow.textContent = shouldOpen ? '▲' : '▼';
}
window.toggleMobileToc = toggleMobileToc;


// ==========================================================================
// 🏛️ 로마 약 10일 체류 섹션 동적 렌더러 (도시 간 타임라인, 대표 사진 카드, 2열 명소 카드)
// ==========================================================================
function renderRomeExtensionSectionHtml(rome, lbl) {
  if (!rome) return '';
  return '<section class="district-route-card rome-extension-card" id="district-rome-extension">' +
    '<div class="district-card-header rome-header">' +
      '<div class="d-badge-row">' +
        '<span class="d-badge rome-badge">' + (rome.badge || '로마 약 10일 체류') + '</span>' +
        '<span class="d-time-badge rome-time-badge">' + (rome.statusBadge || '세비야 이후 · 약 10일 체류 · 날짜/항공편 확인 필요') + '</span>' +
      '</div>' +
      '<h3 class="district-title rome-main-title">' + (rome.title || '') + '</h3>' +
      '<p class="district-desc rome-main-desc">' + (rome.desc || '') + '</p>' +
    '</div>' +
    '<div class="district-card-body">' +
      '<!-- 1. 도시 간 이동 타임라인 -->' +
      '<div class="rome-transit-box">' +
        '<div class="r-transit-head">' +
          '<span class="r-t-icon">🚆</span>' +
          '<div>' +
            '<h4 class="r-t-title">' + (rome.transit ? rome.transit.title : '') + '</h4>' +
            '<span class="r-t-sub">' + (rome.transit ? rome.transit.sub : '') + '</span>' +
          '</div>' +
        '</div>' +
        '<div class="transit-unconfirmed-notice">' +
          (rome.transit ? rome.transit.notice : '') +
        '</div>' +
        '<div class="r-steps-grid">' +
          ((rome.transit && rome.transit.steps) || []).map((st, idx) => 
            '<div class="r-step-item">' +
              '<div class="r-step-badge">' + (idx + 1) + '</div>' +
              '<div class="r-step-body">' +
                '<strong class="r-step-h">' + st.title + '</strong>' +
                '<p class="r-step-p">' + st.desc + '</p>' +
                (st.tip ? '<div class="r-step-tip">💡 ' + st.tip + '</div>' : '') +
              '</div>' +
            '</div>'
          ).join('') +
        '</div>' +
      '</div>' +

      '<!-- 2. 대표 사진 카드 -->' +
      '<div class="rome-hero-feature-card">' +
        '<div class="r-hero-img-wrap">' +
          '<img src="' + rome.hero.photo + '" alt="' + rome.hero.alt + '" loading="lazy" />' +
          '<span class="r-hero-badge-tag">' + rome.hero.badge + '</span>' +
        '</div>' +
        '<div class="r-hero-text-wrap">' +
          '<h4 class="r-hero-title">' + rome.hero.title + '</h4>' +
          '<p class="r-hero-desc">' + rome.hero.desc + '</p>' +
          '<div class="r-badges-row">' +
            (rome.hero.badges || []).map(b => '<span class="r-pill-badge ' + (b.class || '') + '">' + b.text + '</span>').join('') +
          '</div>' +
        '</div>' +
      '</div>' +

      '<!-- 3. 2열 명소 카드 컬렉션 (4대 핵심 테마 · 모바일 1열 스택) -->' +
      '<div class="rome-cards-2col-grid">' +
        (rome.cards || []).map(c => 
          '<div class="rome-theme-card" id="' + c.id + '">' +
            '<div class="r-card-img-wrap">' +
              '<img src="' + c.photo + '" alt="' + c.alt + '" loading="lazy" />' +
              '<span class="r-card-tag">' + c.themeTag + '</span>' +
            '</div>' +
            '<div class="r-card-content">' +
              '<div class="r-card-pill-row">' +
                (c.badges || []).map(b => '<span class="r-sub-pill ' + (b.class || '') + '">' + b.text + '</span>').join('') +
              '</div>' +
              '<h4 class="r-card-h4">' + c.title + '</h4>' +
              '<p class="r-card-lead">' + c.desc + '</p>' +

              '<div class="d-row">' +
                '<span class="d-row-label">🏛️ ' + (lbl.keySpots || '핵심 명소:') + '</span>' +
                '<span class="d-row-text">' + c.spots + '</span>' +
              '</div>' +
              '<div class="d-row">' +
                '<span class="d-row-label">🚶 ' + (lbl.recSequence || '추천 동선:') + '</span>' +
                '<span class="d-row-text">' + c.sequence + '</span>' +
              '</div>' +
              '<div class="d-row warning">' +
                '<span class="d-row-label">👟 ' + (lbl.walkingEst || '보행 및 노면:') + '</span>' +
                '<div class="d-row-text">' + c.walking + '</div>' +
              '</div>' +
              '<div class="d-row">' +
                '<span class="d-row-label">☕ ' + (lbl.restStops || '휴식 안내:') + '</span>' +
                '<span class="d-row-text">' + c.rest + '</span>' +
              '</div>' +
              '<div class="d-row official-check-row">' +
                '<span class="d-row-label">✓ ' + (lbl.officialSource || '공식 확인:') + '</span>' +
                '<div class="d-row-text">' + c.officialCheck + '</div>' +
              '</div>' +
            '</div>' +
          '</div>'
        ).join('') +
      '</div>' +
    '</div>' +
  '</section>';
}
window.renderRomeExtensionSectionHtml = renderRomeExtensionSectionHtml;

// 하단 플로팅 북 바 스마트 스크롤 제어: 스크롤 시 선명, 2.5초 유휴 시 은은하게 페이드
(function() {
  let floatBarTimer = null;
  window.addEventListener('scroll', function() {
    const bar = document.getElementById('floatingBookBar');
    if (!bar) return;
    bar.classList.remove('bar-idle');
    clearTimeout(floatBarTimer);
    floatBarTimer = setTimeout(function() {
      if (!bar.matches(':hover')) {
        bar.classList.add('bar-idle');
      }
    }, 2500);
  }, { passive: true });
})();


// ==========================================================================
// 🇮🇹 ITALY CITIES GUIDE CONTROLLER & DYNAMIC RENDERER (100% MULTILINGUAL)
// ==========================================================================
window.currentItalyCity = window.currentItalyCity || 'rome';
window.currentItalySubTab = window.currentItalySubTab || 'attractions';

function selectItalyCity(cityId) {
  window.currentItalyCity = cityId;
  
  const navBar = document.getElementById('italyCityNavBar');
  if (navBar) {
    navBar.querySelectorAll('.italy-city-tab').forEach(btn => {
      const match = btn.getAttribute('data-city') === cityId;
      btn.classList.toggle('active', match);
      btn.setAttribute('aria-selected', match ? 'true' : 'false');
    });
  }

  const subTabBar = document.getElementById('italySubTabBar');
  if (subTabBar) {
    subTabBar.style.display = (cityId === 'itinerary' || cityId === 'capri') ? 'none' : 'flex';
  }

  renderItalyCityGuide();
}
window.selectItalyCity = selectItalyCity;

function selectItalySubTab(subTabId) {
  window.currentItalySubTab = subTabId;

  const subTabBar = document.getElementById('italySubTabBar');
  if (subTabBar) {
    subTabBar.querySelectorAll('.italy-subtab').forEach(btn => {
      const match = btn.getAttribute('data-subtab') === subTabId;
      btn.classList.toggle('active', match);
      btn.setAttribute('aria-selected', match ? 'true' : 'false');
    });
  }

  renderItalyCityGuide();
}
window.selectItalySubTab = selectItalySubTab;

function renderItalyCityGuide(lang = (typeof currentLang !== 'undefined' ? currentLang : 'ko')) {
  const container = document.getElementById('italyCityContentContainer');
  if (!container) return;

  const data = (typeof ITALY_CITIES_GUIDE_DATA !== 'undefined') ? ITALY_CITIES_GUIDE_DATA : (typeof window !== 'undefined' ? window.ITALY_CITIES_GUIDE_DATA : null);
  if (!data) return;

  const cityId = window.currentItalyCity || 'rome';
  const subTabId = window.currentItalySubTab || 'attractions';
  const dict = (typeof I18N_DICTIONARY !== 'undefined' && I18N_DICTIONARY[lang]) || {};

  // Localized UI helper terms
  const L = {
    transitLoad: lang === 'en' ? 'Transit Load' : (lang === 'ja' ? '移動負担' : (lang === 'zh' ? '交通负荷' : '이동 부담')),
    kneeLoad: lang === 'en' ? 'Knee Strain' : (lang === 'ja' ? '膝の負担' : (lang === 'zh' ? '膝盖负荷' : '무릎 부담')),
    pros: lang === 'en' ? 'Advantages' : (lang === 'ja' ? 'メリット' : (lang === 'zh' ? '优势特点' : '장점')),
    cons: lang === 'en' ? 'Cautions' : (lang === 'ja' ? '留意点' : (lang === 'zh' ? '注意事项' : '유의점')),
    trainPrefix: lang === 'en' ? 'Train: ' : (lang === 'ja' ? '列車: ' : (lang === 'zh' ? '列车在途: ' : '기차: ')),
    d2dPrefix: lang === 'en' ? 'Actual Door-to-Door: ' : (lang === 'ja' ? '実際の宿泊間所要時間: ' : (lang === 'zh' ? '全程门到门实际耗时: ' : '실제 도어투도어: ')),
    tableType: lang === 'en' ? 'Type' : (lang === 'ja' ? '種類' : (lang === 'zh' ? '车票种类' : '종류')),
    tableRule: lang === 'en' ? 'Details & Validity' : (lang === 'ja' ? '内容＆有効時間' : (lang === 'zh' ? '规则与有效期' : '내용 및 유효시간')),
    tableFare: lang === 'en' ? 'Fare' : (lang === 'ja' ? '運賃' : (lang === 'zh' ? '票价' : '요금')),
    tapAndGoTitle: lang === 'en' ? 'Contactless Tap & Go (Easy Ride)' : (lang === 'ja' ? 'タッチ決済 Tap & Go (簡単乗車)' : (lang === 'zh' ? '非接闪付 Tap & Go (便捷乘车)' : '컨택리스 Tap & Go (간편 승차)')),
    officialFaresBtn: lang === 'en' ? 'Official Fares & Ticket Portal ➔' : (lang === 'ja' ? '公式運賃＆チケットポータル ➔' : (lang === 'zh' ? '官方票价与购票指南 ➔' : '공식 요금 및 티켓 안내 확인 ➔'))
  };

  // Case 1: 12-Night Itinerary & Senior Comparison Analysis
  if (cityId === 'itinerary') {
    const itData = data.itineraryAnalysis;
    let html = '<div class="itinerary-analysis-wrapper">';
    
    // Header
    html += '<div class="it-head-card">' +
      '<div class="it-badge">12 NIGHTS / 13 DAYS PACING GUIDE</div>' +
      '<h3 class="it-title">' + (itData.title[lang] || itData.title.ko) + '</h3>' +
      '<p class="it-context">' + (itData.context[lang] || itData.context.ko) + '</p>' +
    '</div>';

    // 3 Options Comparison Cards Grid
    html += '<div class="it-options-grid">';
    (itData.options || []).forEach(opt => {
      html += '<div class="it-option-card ' + opt.class + '">' +
        '<div class="opt-head">' +
          '<span class="opt-badge">' + (opt.badge[lang] || opt.badge.ko) + '</span>' +
          '<h4 class="opt-name">' + (opt.name[lang] || opt.name.ko) + '</h4>' +
        '</div>' +
        '<div class="opt-metrics">' +
          '<div class="metric-row"><span class="m-label">🚆 ' + L.transitLoad + ':</span> <strong>' + (opt.transitLoad[lang] || opt.transitLoad.ko) + '</strong></div>' +
          '<div class="metric-row"><span class="m-label">🦵 ' + L.kneeLoad + ':</span> <strong>' + (opt.kneeLoad[lang] || opt.kneeLoad.ko) + '</strong></div>' +
        '</div>' +
        '<div class="opt-pros"><span class="check-icon">✓ ' + L.pros + ':</span> ' + (opt.pros[lang] || opt.pros.ko) + '</div>' +
        '<div class="opt-cons"><span class="warn-icon">⚠️ ' + L.cons + ':</span> ' + (opt.cons[lang] || opt.cons.ko) + '</div>' +
      '</div>';
    });
    html += '</div>';

    // Door-to-Door Transit Comparison
    const trD = itData.transitDetails;
    const r2fSteps = (trD.romeToFlorence.steps[lang] || trD.romeToFlorence.steps.ko || []);
    const r2vSteps = (trD.romeToVenice.steps[lang] || trD.romeToVenice.steps.ko || []);

    html += '<div class="door-to-door-card">' +
      '<div class="d2d-head">' +
        '<span class="d2d-icon">🚆</span>' +
        '<div>' +
          '<h4>' + (trD.title[lang] || trD.title.ko) + '</h4>' +
          '<p>' + (trD.desc[lang] || trD.desc.ko) + '</p>' +
        '</div>' +
      '</div>' +
      '<div class="d2d-grid">' +
        '<div class="d2d-box rec">' +
          '<div class="d2d-box-title">🟢 ' + (trD.romeToFlorence.title[lang] || trD.romeToFlorence.title.ko) + '</div>' +
          '<div class="d2d-time">' + L.trainPrefix + (trD.romeToFlorence.trainTime[lang] || trD.romeToFlorence.trainTime.ko) + '</div>' +
          '<div class="d2d-real"><strong>' + L.d2dPrefix + (trD.romeToFlorence.realTime[lang] || trD.romeToFlorence.realTime.ko) + '</strong></div>' +
          '<ul class="d2d-steps">' + r2fSteps.map(s => '<li>' + s + '</li>').join('') + '</ul>' +
          '<a href="' + trD.romeToFlorence.officialLink + '" target="_blank" rel="noopener noreferrer" class="d2d-link-btn">' + (trD.romeToFlorence.linkText[lang] || trD.romeToFlorence.linkText.ko) + '</a>' +
        '</div>' +
        '<div class="d2d-box warn">' +
          '<div class="d2d-box-title">🔴 ' + (trD.romeToVenice.title[lang] || trD.romeToVenice.title.ko) + '</div>' +
          '<div class="d2d-time">' + L.trainPrefix + (trD.romeToVenice.trainTime[lang] || trD.romeToVenice.trainTime.ko) + '</div>' +
          '<div class="d2d-real"><strong>' + L.d2dPrefix + (trD.romeToVenice.realTime[lang] || trD.romeToVenice.realTime.ko) + '</strong></div>' +
          '<ul class="d2d-steps">' + r2vSteps.map(s => '<li>' + s + '</li>').join('') + '</ul>' +
          '<a href="' + trD.romeToVenice.officialLink + '" target="_blank" rel="noopener noreferrer" class="d2d-link-btn">' + (trD.romeToVenice.linkText[lang] || trD.romeToVenice.linkText.ko) + '</a>' +
        '</div>' +
      '</div>' +
    '</div>';

    // Day-by-Day Timeline
    const tl = itData.suggestedTimeline;
    html += '<div class="timeline-card">' +
      '<div class="tl-head">' +
        '<h4>' + (tl.title[lang] || tl.title.ko) + '</h4>' +
        '<p class="tl-note">' + (tl.note[lang] || tl.note.ko) + '</p>' +
      '</div>' +
      '<div class="tl-list">' +
        (tl.days || []).map(d => {
          const dTitle = (d.title && (d.title[lang] || d.title.ko)) || d.title;
          const dDesc = (d.desc && (d.desc[lang] || d.desc.ko)) || d.desc;
          return '<div class="tl-day-item">' +
            '<div class="tl-day-badge">' + d.day + '</div>' +
            '<div class="tl-day-body">' +
              '<strong>' + dTitle + '</strong>' +
              '<p>' + dDesc + '</p>' +
            '</div>' +
          '</div>';
        }).join('') +
      '</div>' +
    '</div>';

    html += '</div>';
    container.innerHTML = html;
    return;
  }

  // Case 1.5: Naples & Capri Optional Weather-Dependent Guide
  if (cityId === 'capri') {
    const capri = data.cities.capri;
    if (!capri) return;

    let html = '<div class="capri-guide-wrapper">';

    // 1. Header Card
    html += '<div class="capri-header-card">' +
      '<div class="capri-tag-row">' +
        '<span class="city-pill-badge">' + (capri.tag[lang] || capri.tag.ko) + '</span>' +
        '<span class="badge-unverified-official">⚠️ ' + (capri.statusBadge[lang] || capri.statusBadge.ko) + '</span>' +
      '</div>' +
      '<h3 class="capri-title">⛵ ' + (capri.name[lang] || capri.name.ko) + '</h3>' +
      '<p class="capri-intro">' + (capri.intro[lang] || capri.intro.ko) + '</p>' +
    '</div>';

    // 2. tvN Broadcast Box
    html += '<div class="capri-tvn-box">' +
      '<div class="tvn-head-row">' +
        '<span class="tvn-badge">' + (capri.tvn.badge[lang] || capri.tvn.badge.ko) + '</span>' +
        '<a href="' + capri.tvn.url + '" target="_blank" rel="noopener noreferrer" class="tvn-link-btn">' +
          (capri.tvn.linkText[lang] || capri.tvn.linkText.ko) +
        '</a>' +
      '</div>' +
      '<p class="tvn-desc">' + (capri.tvn.desc[lang] || capri.tvn.desc.ko) + '</p>' +
    '</div>';

    // 3. 4 Overview & Burden Cards Grid
    html += '<div class="capri-overview-grid">';
    (capri.overviewItems || []).forEach(item => {
      html += '<div class="capri-overview-card ' + item.id + '">' +
        '<h4 class="ov-title">' + (item.title[lang] || item.title.ko) + '</h4>' +
        '<p class="ov-content">' + (item.content[lang] || item.content.ko) + '</p>' +
      '</div>';
    });
    html += '</div>';

    // 4. Operational Verification Section
    html += '<div class="capri-verification-box">' +
      '<div class="verif-head">' +
        '<h4>🔍 ' + (lang === 'en' ? 'Operational Verification & Official Channels' : (lang === 'ja' ? '運航・開閉の確認と公式窓口' : (lang === 'zh' ? '运营核实与官方查询渠道' : '운영 확인과 공식 창구'))) + '</h4>' +
        '<p class="verif-sub">' + (lang === 'en' ? 'Ferry transport and Blue Grotto admission are strictly separate verification items. Real-time conditions must be verified directly via official sources.' : (lang === 'ja' ? '船舶の運航と青の洞窟の入場は完全に別個の確認項目です。リアルタイムの運航・開閉は公式案内で直接ご確認ください。' : (lang === 'zh' ? '渡轮交通与蓝洞入内游览属于两个相互独立的核查项。即时状态须通过官方渠道亲自核实。' : '선박 운항과 푸른 동굴 입장은 별개의 확인 항목입니다. 실시간 상황은 공식 안내에서 직접 확인해야 합니다.'))) + '</p>' +
      '</div>' +
      '<div class="verif-items-list">';
    
    (capri.verificationItems || []).forEach(v => {
      html += '<div class="verif-item-card">' +
        '<div class="verif-item-header">' +
          '<strong class="verif-item-name">' + (v.name[lang] || v.name.ko) + '</strong>' +
          '<span class="verif-status-tag">⚠️ ' + (v.status[lang] || v.status.ko) + '</span>' +
        '</div>' +
        '<p class="verif-note">' + (v.note[lang] || v.note.ko) + '</p>' +
        '<div class="verif-links-row">' +
          '<a href="' + v.url + '" target="_blank" rel="noopener noreferrer" class="official-verif-btn">' +
            '🌐 ' + (v.linkText[lang] || v.linkText.ko) +
          '</a>';
      if (v.url2) {
        html += '<a href="' + v.url2 + '" target="_blank" rel="noopener noreferrer" class="official-verif-btn secondary">' +
          '🌐 ' + (v.linkText2[lang] || v.linkText2.ko) +
        '</a>';
      }
      html += '</div></div>';
    });
    html += '</div></div>';

    // 5. Step-by-Step Verification Checklist
    const ch = capri.checklist;
    html += '<div class="capri-checklist-box">' +
      '<h4 class="checklist-title">' + (ch.title[lang] || ch.title.ko) + '</h4>' +
      '<div class="checklist-steps-grid">';
    (ch.steps || []).forEach((st, idx) => {
      html += '<div class="check-step-item">' +
        '<div class="step-num">Step ' + (idx + 1) + ' · ' + (st.time[lang] || st.time.ko) + '</div>' +
        '<div class="step-action">' + (st.action[lang] || st.action.ko) + '</div>' +
      '</div>';
    });
    html += '</div></div>';

    // 6. 3 Weather Scenarios Grid (A, B, C)
    const sc = capri.scenarios;
    html += '<div class="capri-scenarios-wrapper">' +
      '<h4 class="scenarios-main-title">' + (sc.title[lang] || sc.title.ko) + '</h4>' +
      '<div class="capri-scenarios-grid">';
    (sc.list || []).forEach(s => {
      html += '<div class="scenario-card ' + s.id + '">' +
        '<div class="sc-badge">' + (s.badge[lang] || s.badge.ko) + '</div>' +
        '<h5 class="sc-title">' + (s.title[lang] || s.title.ko) + '</h5>' +
        '<p class="sc-desc">' + (s.content[lang] || s.content.ko) + '</p>' +
      '</div>';
    });
    html += '</div></div>';

    // 7. Planner Conflict Check Action Bar
    html += '<div class="capri-planner-guardrail-bar">' +
      '<div class="guardrail-info">' +
        '<strong>🗓️ ' + (lang === 'en' ? 'Planner Schedule Safety Guardrail' : (lang === 'ja' ? 'プランナー日程の安全ガードレール' : (lang === 'zh' ? '行程规划安全防线' : '플래너 일정 안전 가드레일'))) + '</strong>' +
        '<p>' + (lang === 'en' ? 'Naples/Capri is an optional excursion. It is never auto-inserted into your planner to protect your Rome rest days.' : (lang === 'ja' ? 'ナポリ・カプリは追加の選択肢です。ローマの休息日程を保護するため、プランナー日程へ自動挿入されません。' : (lang === 'zh' ? '那不勒斯与卡普里仅为备选方案，绝不自动插入日程以守护罗马充分休息。' : '나폴리·카프리는 추가 선택지입니다. 로마 휴식 일정을 보존하기 위해 플래너에 자동으로 삽입되지 않습니다.'))) + '</p>' +
      '</div>' +
      '<button type="button" class="btn-check-conflict" onclick="checkCapriPlannerConflict()">' +
        '⚠️ ' + (lang === 'en' ? 'Check Schedule Conflict Alert' : (lang === 'ja' ? '日程衝突の警告を確認' : (lang === 'zh' ? '查看日程冲突预警' : '일정 충돌 여부 확인하기'))) +
      '</button>' +
    '</div>';

    html += '</div>';
    container.innerHTML = html;
    return;
  }

  // Case 2: City Guide (Rome, Florence, Venice)
  const city = data.cities[cityId];
  if (!city) return;

  let html = '<div class="city-guide-wrapper">';

  // City Intro Header Banner
  html += '<div class="city-intro-banner">' +
    '<div class="city-tag-row">' +
      '<span class="city-pill-badge">' + (city.tag[lang] || city.tag.ko) + '</span>' +
      '<span class="city-status-badge">' + (city.statusBadge[lang] || city.statusBadge.ko) + '</span>' +
    '</div>' +
    '<h3 class="city-title">' + (city.name[lang] || city.name.ko) + '</h3>' +
    '<p class="city-desc">' + (city.intro[lang] || city.intro.ko) + '</p>' +
  '</div>';

  // Sub-Tab Content: 1. Attractions (명소)
  if (subTabId === 'attractions') {
    html += '<div class="city-attractions-view">';

    if (cityId === 'rome' && city.districts) {
      city.districts.forEach(dist => {
        html += '<div class="district-group-block" id="dist-' + dist.id + '">' +
          '<div class="dist-group-head">' +
            '<span class="dist-badge">' + (dist.badge[lang] || dist.badge.ko) + '</span>' +
            '<h4 class="dist-title">' + (dist.name[lang] || dist.name.ko) + '</h4>' +
          '</div>' +
          '<div class="italy-cards-grid">';
        
        (dist.spots || []).forEach(spot => {
          html += renderSingleSpotCard(spot, lang, dict);
        });

        html += '</div></div>';
      });
    } else if (city.spots) {
      html += '<div class="italy-cards-grid">';
      city.spots.forEach(spot => {
        html += renderSingleSpotCard(spot, lang, dict);
      });
      html += '</div>';
    }

    html += '</div>';
  } 
  // Sub-Tab Content: 2. Dining (대표 미식)
  else if (subTabId === 'dining') {
    html += '<div class="city-dining-view">' +
      '<div class="dining-view-intro">' +
        '<h4>🍝 ' + (city.name[lang] || city.name.ko) + ' ' + (dict['subtab_dining'] || '대표 미식') + '</h4>' +
        '<p class="season-disclaimer-note">' + (data.meta.seasonNote[lang] || data.meta.seasonNote.ko) + '</p>' +
      '</div>' +
      '<div class="italy-food-grid">';

    (city.dining || []).forEach(dish => {
      html += '<div class="italy-food-card">' +
        '<div class="food-img-wrap">' +
          '<img src="' + dish.photo + '" alt="' + (dish.name[lang] || dish.name.ko) + '" loading="lazy" onerror="this.src=\'https://images.unsplash.com/photo-1498579150354-977475b7ea0b?auto=format&fit=crop&w=800&q=80\';" />' +
          '<span class="food-it-badge">' + dish.italianName + '</span>' +
        '</div>' +
        '<div class="food-body">' +
          '<h5 class="food-title">' + (dish.name[lang] || dish.name.ko) + '</h5>' +
          '<div class="food-field">' +
            '<span class="field-label">🥬 ' + (dict['lbl_ingredients'] || '핵심 재료') + ':</span>' +
            '<p class="field-val">' + (dish.ingredients[lang] || dish.ingredients.ko) + '</p>' +
          '</div>' +
          '<div class="food-field">' +
            '<span class="field-label">✨ ' + (dict['lbl_taste_profile'] || '맛의 특징') + ':</span>' +
            '<p class="field-val">' + (dish.taste[lang] || dish.taste.ko) + '</p>' +
          '</div>' +
        '</div>' +
      '</div>';
    });

    html += '</div></div>';
  }
  // Sub-Tab Content: 3. Transit (대중교통)
  else if (subTabId === 'transit') {
    const tr = city.transit;
    html += '<div class="city-transit-view">';

    if (tr.disclaimer) {
      html += '<div class="transit-alert-box">' + (tr.disclaimer[lang] || tr.disclaimer.ko) + '</div>';
    }
    if (tr.stairsWarning) {
      html += '<div class="transit-alert-box">' + (tr.stairsWarning[lang] || tr.stairsWarning.ko) + '</div>';
    }
    if (tr.tramsAndStation) {
      html += '<div class="transit-info-card">' + (tr.tramsAndStation[lang] || tr.tramsAndStation.ko) + '</div>';
    }

    const verifiedTagText = lang === 'en' ? 'Verified 2026-10-18' : (lang === 'ja' ? '2026-10-18 確認済' : (lang === 'zh' ? '2026-10-18 已核实' : '2026-10-18 확인'));

    html += '<div class="transit-fares-card">' +
      '<div class="fares-head">' +
        '<h4>🎫 ' + (dict['lbl_fares_summary'] || '대중교통 요금 & 승차권 체계') + ' (' + tr.operator + ')</h4>' +
        '<div class="verified-tag">✓ ' + verifiedTagText + '</div>' +
      '</div>' +
      '<div class="fares-table-wrap">' +
        '<table class="transit-table">' +
          '<thead><tr><th>' + L.tableType + '</th><th>' + L.tableRule + '</th><th>' + L.tableFare + '</th></tr></thead>' +
          '<tbody>' +
            (tr.fares || []).map(f => {
              const fName = (f.name && (f.name[lang] || f.name.ko)) || f.name;
              const fDesc = (f.desc && (f.desc[lang] || f.desc.ko)) || f.desc;
              return '<tr><td><strong>' + fName + '</strong></td><td>' + fDesc + '</td><td class="price-cell">' + f.price + '</td></tr>';
            }).join('') +
          '</tbody>' +
        '</table>' +
      '</div>' +
    '</div>';

    if (tr.tapAndGo) {
      html += '<div class="tap-and-go-card">' +
        '<div class="tg-icon">💳</div>' +
        '<div>' +
          '<strong>' + L.tapAndGoTitle + '</strong>' +
          '<p>' + (tr.tapAndGo[lang] || tr.tapAndGo.ko) + '</p>' +
        '</div>' +
      '</div>';
    }

    html += '<div class="transit-official-card">' +
      '<a href="' + tr.officialUrl + '" target="_blank" rel="noopener noreferrer" class="official-portal-btn">' +
        '🌐 ' + tr.operator + ' ' + L.officialFaresBtn +
      '</a>' +
    '</div>';

    html += '</div>';
  }

  html += '</div>';
  container.innerHTML = html;
}
window.renderItalyCityGuide = renderItalyCityGuide;

function renderSingleSpotCard(spot, lang, dict) {
  const pLevel = spot.priorityLevel || 'good';
  const wLevel = spot.walkingLevel || 'medium';

  const hoursLabel = lang === 'en' ? 'Hours:' : (lang === 'ja' ? '営業時間:' : (lang === 'zh' ? '开放时间:' : '운영시간:'));
  const admissionLabel = lang === 'en' ? 'Admission:' : (lang === 'ja' ? '入場料:' : (lang === 'zh' ? '门票费用:' : '입장료:'));
  const bookBtnText = lang === 'en' ? '🎟 Official Site Booking / Details' : (lang === 'ja' ? '🎟 公式サイト予約 / 詳細案内' : (lang === 'zh' ? '🎟 官方网站预订 / 详情指南' : '🎟 공식 사이트 예매 / 상세 안내'));
  const accessBtnText = lang === 'en' ? '♿ Official Accessibility Details' : (lang === 'ja' ? '♿ 公式アクセシビリティ案内' : (lang === 'zh' ? '♿ 官方无障碍信息' : '♿ 공식 접근성 안내'));
  const verifiedDate = spot.verifiedDate || '2026-10-18';
  const verifiedTagText = lang === 'en' ? 'Verified ' + verifiedDate : (lang === 'ja' ? verifiedDate + ' 確認済' : (lang === 'zh' ? verifiedDate + ' 已核实' : verifiedDate + ' 확인'));

  const spotHours = (spot.hours && (spot.hours[lang] || spot.hours.ko)) || spot.hours;
  const spotAdmission = (spot.admission && (spot.admission[lang] || spot.admission.ko)) || spot.admission;

  return '<div class="italy-spot-card" id="spot-' + spot.id + '">' +
    '<div class="spot-img-wrap">' +
      '<img src="' + spot.photo + '" alt="' + (spot.name[lang] || spot.name.ko) + '" loading="lazy" onerror="this.src=\'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=800&q=80\';" />' +
      '<span class="spot-it-tag">' + spot.italianName + '</span>' +
    '</div>' +
    '<div class="spot-content">' +
      '<div class="spot-badges-row">' +
        '<span class="spot-badge badge-p-' + pLevel + '">🎟 ' + (spot.priority[lang] || spot.priority.ko) + '</span>' +
        '<span class="spot-badge badge-w-' + wLevel + '">🚶 ' + (spot.walking[lang] || spot.walking.ko) + '</span>' +
      '</div>' +
      '<h4 class="spot-h4">' + (spot.name[lang] || spot.name.ko) + '</h4>' +
      '<p class="spot-lead">' + (spot.desc[lang] || spot.desc.ko) + '</p>' +
      '<div class="spot-senior-box">' +
        '<div class="s-box-head">♿ ' + (dict['lbl_senior_access'] || '부모님 보행 및 접근성 안내') + '</div>' +
        '<div class="s-box-desc">' + (spot.details[lang] || spot.details.ko) + '</div>' +
      '</div>' +
      '<div class="spot-meta-row">' +
        '<div class="meta-item"><span>⏰ ' + hoursLabel + '</span> <strong>' + spotHours + '</strong></div>' +
        '<div class="meta-item"><span>💶 ' + admissionLabel + '</span> <strong>' + spotAdmission + '</strong></div>' +
      '</div>' +
      '<div class="spot-footer">' +
        '<a href="' + spot.officialUrl + '" target="_blank" rel="noopener noreferrer" class="spot-btn primary">' +
          bookBtnText +
        '</a>' +
        (spot.accessibilityUrl ? '<a href="' + spot.accessibilityUrl + '" target="_blank" rel="noopener noreferrer" class="spot-btn primary">' + accessBtnText + '</a>' : '') +
        '<span class="spot-verify-tag">✓ ' + verifiedTagText + '</span>' +
      '</div>' +
    '</div>' +
  '</div>';
}
window.renderSingleSpotCard = renderSingleSpotCard;

function checkCapriPlannerConflict() {
  let msg = '';
  if (currentLang === 'en') {
    msg = '⚠️ [Schedule Conflict Alert]\nThe Italy segment (Nov 22 ~ Dec 4, 12 nights) is designed around a relaxed ~10-day Rome stay with parent fatigue care (1.5 spots/day + afternoon siestas).\n\nA same-day round trip from Rome to Naples/Capri entails over 6 hours of high-speed train, taxi, and ferry transfers each way. To preserve the confirmed Rome rest schedule, this optional trip is NOT automatically added to the planner, nor will it alter or delete existing rest days.\n\nPlease choose it flexibly on-site only if real-time weather and sea conditions are fully favorable and family stamina allows.';
  } else if (currentLang === 'ja') {
    msg = '⚠️【日程衝突の警告】\nイタリア日程（11月22日〜12月4日、12泊）は、ご両親の疲労ケア（1日1.5スポット＋シエスタ休息）を考慮し、ローマ約10泊のゆったりした滞在を中心に構成されています。\n\nローマからナポリ・カプリ島への日帰りは往復6時間以上の高速鉄道・タクシー・船の乗換が発生します。確定済みのローマ休息日程を損なわないため、プランナー日程へ自動挿入されたり既存の予定が削除・変更されることはありません。\n\n海況・気象が完全に良好で、ご家族全員の体力が十分な場合にのみ現地で柔軟にご判断ください。';
  } else if (currentLang === 'zh') {
    msg = '⚠️【行程冲突预警】\n意大利行程（11月22日~12月4日，共12晚）以罗马约10天慢游逗留为核心，充分兼顾长辈体力照护（每日1.5景点＋午休休息）。\n\n从罗马出发往返那不勒斯与卡普里岛单日往返将产生6小时以上的火车、出租车与渡轮连续换乘。为避免打乱已确认的罗马修整节奏，系统不会将此候选自动添加进主日程，亦绝不会自动删改现有日程与休息日。\n\n建议仅在当地海况天象完全平稳良好、全人体力充沛时，再作现场弹性决择。';
  } else {
    msg = '⚠️ [일정 충돌 경고 및 안내]\n현재 2026.11.22~12.04 이탈리아 일정은 로마 약 10일 체류를 중심으로 부모님의 피로도(1.5 스팟/일, 시에스타 휴식)를 고려하여 구성되어 있습니다.\n\n로마에서 나폴리·카프리 당일치기는 왕복 6시간 이상의 기차+택시+페리 연속 환승이 수반됩니다. 기존 확정된 로마 10일 휴식 일정을 훼손하지 않기 위해 플래너에 자동 끼워넣지 않으며, 기존 일정을 자동 삭제하거나 변경하지 않습니다.\n\n당일 기상과 파도가 온전히 양호하고 가족 모두의 컨디션이 충분할 때 현지에서 자율적으로 선택하시기 바랍니다.';
  }
  
  if (typeof showToast === 'function') {
    showToast(msg, 6000);
  } else {
    alert(msg);
  }
}
window.checkCapriPlannerConflict = checkCapriPlannerConflict;

window.downloadIcsCalendar = downloadCustomCalendarIcs;



// ==========================================================================
// 🍽️ MASTER GOURMET GUIDE (Beyond Paella & Pizza - Senior Tailored)
// ==========================================================================
window.masterGourmetActiveCountry = 'all';
window.masterSurvivalCountry = 'all';
window.masterSurvivalCategory = 'all';

function buildMasterGourmetGuideHtml(data, l, filterCountry) {
  if (!data || !data.meta) return '';
  l = l || 'ko';
  filterCountry = filterCountry || 'all';
  const meta = data.meta;
  const badgeText = (meta.badge && meta.badge[l]) || meta.badge['ko'];
  const titleText = (meta.title && meta.title[l]) || meta.title['ko'];
  const introText = (meta.intro && meta.intro[l]) || meta.intro['ko'];
  const survivalTitle = (meta.survivalTitle && meta.survivalTitle[l]) || meta.survivalTitle['ko'];
  const survivalDesc = (meta.survivalDesc && meta.survivalDesc[l]) || meta.survivalDesc['ko'];

  const filterLabels = {
    all: { ko: "🌍 전체 7대 도시", en: "🌍 All 7 Cities", ja: "🌍 全7都市", zh: "🌍 全部7大城市" },
    spain: { ko: "🇪🇸 스페인 편 (4개 도시)", en: "🇪🇸 Spain Edition (4 Cities)", ja: "🇪🇸 スペイン編 (4都市)", zh: "🇪🇸 西班牙篇 (4城)" },
    italy: { ko: "🇮🇹 이탈리아 편 (3개 도시)", en: "🇮🇹 Italy Edition (3 Cities)", ja: "🇮🇹 イタリア編 (3都市)", zh: "🇮🇹 意大利篇 (3城)" }
  };

  const survCountryLabels = {
    all: { ko: "🌍 전체 24선", en: "🌍 All 24", ja: "🌍 全24選", zh: "🌍 全部24句" },
    es: { ko: "🇪🇸 스페인어 12선", en: "🇪🇸 Spanish (12)", ja: "🇪🇸 スペイン語 12選", zh: "🇪🇸 西班牙语 12句" },
    it: { ko: "🇮🇹 이탈리아어 12선", en: "🇮🇹 Italian (12)", ja: "🇮🇹 イタリア語 12選", zh: "🇮🇹 意大利语 12句" }
  };

  const survCategoryLabels = {
    all: { ko: "전체 상황", en: "All Scenarios", ja: "すべての場面", zh: "全部情景" },
    health: { ko: "🧂 간·건강 (소금/설탕)", en: "🧂 Seasoning (Salt/Sugar)", ja: "🧂 味付け（塩・砂糖）", zh: "🧂 口味（少盐/免糖）" },
    drinks: { ko: "☕ 물·음료 (따뜻한물/생수)", en: "☕ Water (Hot/Still)", ja: "☕ お水（お湯・ナチュラル水）", zh: "☕ 饮水（温水/纯净水）" },
    billing: { ko: "💶 가격·계산 (얼마에요/영수증)", en: "💶 Price & Bill (How much/Check)", ja: "💶 お会計（いくら/レシート）", zh: "💶 结账（多少钱/买单）" },
    ordering: { ko: "🍽️ 주문·추천 (이거주세요/추천)", en: "🍽️ Ordering (This one/Picks)", ja: "🍽️ 注文（これ/おすすめ）", zh: "🍽️ 点单（来一份/推荐菜）" },
    convenience: { ko: "🚻 화장실·포장", en: "🚻 Restroom & Takeout", ja: "🚻 トイレ・お持ち帰り", zh: "🚻 洗手间与打包" },
    courtesy: { ko: "👏 매너·감사 (여기요/감사합니다)", en: "👏 Courtesy (Excuse me/Thanks)", ja: "👏 マナー（すみません/感謝）", zh: "👏 礼貌（劳驾/谢谢）" }
  };

  const btnListenText = { ko: "🔊 원어 발음 듣기", en: "🔊 Listen Audio", ja: "🔊 発音を聞く", zh: "🔊 播放原声" };
  const verifiedPicksLabel = { ko: "⭐ 픽업 맛집 (추천 식당)", en: "⭐ Verified Pick Restaurants", ja: "⭐ 厳選ピックアップ名店", zh: "⭐ 严选精选餐厅" };
  const mapBtnText = { ko: "🗺️ Google 지도", en: "🗺️ Google Maps", ja: "🗺️ Google マップ", zh: "🗺️ 谷歌地图" };

  // Survival phrases HTML
  const phrasesHtml = (meta.survivalPhrases || []).map(p => {
    const cName = (p.countryName && p.countryName[l]) || p.countryName['ko'];
    const catName = (p.categoryName && p.categoryName[l]) || p.categoryName['ko'];
    const pron = (p.pronunciation && p.pronunciation[l]) || p.pronunciation['ko'];
    const mean = (p.meaning && p.meaning[l]) || p.meaning['ko'];
    const tip = (p.seniorTip && p.seniorTip[l]) || p.seniorTip['ko'];

    return `
      <div class="mg-phrase-box ${p.country}" data-country="${p.country}" data-category="${p.category}">
        <div class="mg-phrase-top">
          <div class="mg-phrase-tags">
            <span class="mg-phrase-flag">${cName}</span>
            <span class="mg-phrase-cat-badge">${catName}</span>
          </div>
          <button type="button" class="mg-phrase-audio-btn" onclick="playVoice('${p.original.replace(/'/g, "\\'")}', '${p.locale}')" title="${btnListenText[l] || btnListenText['ko']}">
            ${btnListenText[l] || btnListenText['ko']}
          </button>
        </div>
        <div class="mg-phrase-quote">"${p.original}"</div>
        <div class="mg-phrase-pronun">🗣️ ${pron}</div>
        <div class="mg-phrase-meaning">💡 <strong>${mean}</strong></div>
        <div class="mg-phrase-tip">👴 ${tip}</div>
      </div>
    `;
  }).join('');

  // Filter countries
  const countriesToRender = (data.countries || []).filter(c => filterCountry === 'all' || c.id === filterCountry);

  const countriesHtml = countriesToRender.map(country => {
    const cName = (country.name && country.name[l]) || country.name['ko'];
    const cTheme = (country.theme && country.theme[l]) || country.theme['ko'];
    const isSpain = country.id === 'spain';
    const flagSvg = isSpain
      ? `<svg width="22" height="15" viewBox="0 0 750 500" style="border-radius:3px;vertical-align:middle;box-shadow:0 1px 3px rgba(0,0,0,0.2);"><rect width="750" height="500" fill="#c60b1e"/><rect width="750" height="250" y="125" fill="#ffc400"/></svg>`
      : `<svg width="22" height="15" viewBox="0 0 3 2" style="border-radius:3px;vertical-align:middle;box-shadow:0 1px 3px rgba(0,0,0,0.2);"><rect width="1" height="2" fill="#009246"/><rect width="1" height="2" x="1" fill="#fff"/><rect width="1" height="2" x="2" fill="#ce2b37"/></svg>`;

    const citiesHtml = (country.cities || []).map(city => {
      const cityName = (city.name && city.name[l]) || city.name['ko'];

      const dishesHtml = (city.dishes || []).map(dish => {
        const dName = (dish.name && dish.name[l]) || dish.name['ko'];
        const dLabel = (dish.label && dish.label[l]) || dish.label['ko'];
        const dDesc = (dish.desc && dish.desc[l]) || dish.desc['ko'];
        const dHighlight = (dish.parentsHighlight && dish.parentsHighlight[l]) || dish.parentsHighlight['ko'];

        return `
          <div class="mg-dish-card">
            <div class="mg-dish-photo-wrap">
              <img src="${dish.photo}" alt="${dName}" class="mg-dish-img" loading="lazy" onerror="if(this.src!=='${dish.fallbackPhoto}') this.src='${dish.fallbackPhoto}';" />
              <span class="mg-dish-badge">${dLabel}</span>
            </div>
            <div class="mg-dish-body">
              <h5 class="mg-dish-title">${dName}</h5>
              <p class="mg-dish-desc">${dDesc}</p>
              <div class="mg-dish-highlight">
                ${dHighlight}
              </div>
            </div>
          </div>
        `;
      }).join('');

      const picksHtml = (city.picks || []).map(pick => {
        const pName = (pick.name && pick.name[l]) || pick.name['ko'];
        const pBadge = (pick.badge && pick.badge[l]) || pick.badge['ko'];
        const pDesc = (pick.desc && pick.desc[l]) || pick.desc['ko'];
        const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(pick.mapQuery)}`;

        return `
          <div class="mg-pick-item">
            <div class="mg-pick-header">
              <div class="mg-pick-title-wrap">
                <span class="mg-pick-star">⭐</span>
                <strong class="mg-pick-name">${pName}</strong>
              </div>
              <span class="mg-pick-badge">${pBadge}</span>
            </div>
            <p class="mg-pick-desc">${pDesc}</p>
            <div class="mg-pick-actions">
              <a href="${mapUrl}" target="_blank" rel="noopener noreferrer" class="mg-map-btn" title="${mapBtnText[l] || mapBtnText['ko']}">
                <span>${mapBtnText[l] || mapBtnText['ko']}</span>
                <span style="font-size:11px;">↗</span>
              </a>
            </div>
          </div>
        `;
      }).join('');

      return `
        <div class="mg-city-block">
          <div class="mg-city-header">
            <div class="mg-city-title-group">
              <span class="mg-city-num">${city.num}</span>
              <h4 class="mg-city-name">${cityName}</h4>
            </div>
            <span class="mg-country-pill ${country.id}">${country.flag} ${cName}</span>
          </div>

          <div class="mg-dishes-grid">
            ${dishesHtml}
          </div>

          <div class="mg-picks-section">
            <div class="mg-picks-title">
              <span>🍽️</span> <strong>${verifiedPicksLabel[l] || verifiedPicksLabel['ko']}</strong>
            </div>
            <div class="mg-picks-grid">
              ${picksHtml}
            </div>
          </div>
        </div>
      `;
    }).join('');

    return `
      <div class="mg-country-group ${country.id}">
        <div class="mg-country-header">
          <div class="mg-country-title">
            ${flagSvg}
            <span>[${cName}]</span>
            <span class="mg-country-theme">${cTheme}</span>
          </div>
        </div>
        <div class="mg-cities-list">
          ${citiesHtml}
        </div>
      </div>
    `;
  }).join('');

  return `
    <div class="master-gourmet-wrapper">
      <!-- Master Header -->
      <div class="mg-hero-box">
        <div class="mg-hero-badge">${badgeText}</div>
        <h3 class="mg-hero-title">${titleText}</h3>
        <p class="mg-hero-intro">${introText}</p>

        <!-- Expanded Survival Phrases Banner (24 Expressions with Filters) -->
        <div class="mg-survival-container">
          <div class="mg-survival-lead">
            <span class="mg-survival-lead-icon">💡</span>
            <div>
              <strong class="mg-survival-lead-title">${survivalTitle}</strong>
              <p class="mg-survival-lead-desc">${survivalDesc}</p>
            </div>
          </div>

          <!-- Country Filter Row -->
          <div class="mg-survival-filter-row">
            <div class="mg-survival-country-tabs">
              <button type="button" class="mg-surv-pill active" data-surv-country="all" onclick="filterMasterSurvival('country', 'all', this)">
                ${survCountryLabels.all[l] || survCountryLabels.all['ko']}
              </button>
              <button type="button" class="mg-surv-pill" data-surv-country="es" onclick="filterMasterSurvival('country', 'es', this)">
                ${survCountryLabels.es[l] || survCountryLabels.es['ko']}
              </button>
              <button type="button" class="mg-surv-pill" data-surv-country="it" onclick="filterMasterSurvival('country', 'it', this)">
                ${survCountryLabels.it[l] || survCountryLabels.it['ko']}
              </button>
            </div>
          </div>

          <!-- Category Filter Chips -->
          <div class="mg-survival-category-chips">
            <button type="button" class="mg-surv-chip active" data-surv-cat="all" onclick="filterMasterSurvival('category', 'all', this)">
              ${survCategoryLabels.all[l] || survCategoryLabels.all['ko']}
            </button>
            <button type="button" class="mg-surv-chip" data-surv-cat="health" onclick="filterMasterSurvival('category', 'health', this)">
              ${survCategoryLabels.health[l] || survCategoryLabels.health['ko']}
            </button>
            <button type="button" class="mg-surv-chip" data-surv-cat="drinks" onclick="filterMasterSurvival('category', 'drinks', this)">
              ${survCategoryLabels.drinks[l] || survCategoryLabels.drinks['ko']}
            </button>
            <button type="button" class="mg-surv-chip" data-surv-cat="billing" onclick="filterMasterSurvival('category', 'billing', this)">
              ${survCategoryLabels.billing[l] || survCategoryLabels.billing['ko']}
            </button>
            <button type="button" class="mg-surv-chip" data-surv-cat="ordering" onclick="filterMasterSurvival('category', 'ordering', this)">
              ${survCategoryLabels.ordering[l] || survCategoryLabels.ordering['ko']}
            </button>
            <button type="button" class="mg-surv-chip" data-surv-cat="convenience" onclick="filterMasterSurvival('category', 'convenience', this)">
              ${survCategoryLabels.convenience[l] || survCategoryLabels.convenience['ko']}
            </button>
            <button type="button" class="mg-surv-chip" data-surv-cat="courtesy" onclick="filterMasterSurvival('category', 'courtesy', this)">
              ${survCategoryLabels.courtesy[l] || survCategoryLabels.courtesy['ko']}
            </button>
          </div>

          <!-- 24 Phrase Cards Grid -->
          <div class="mg-survival-grid">
            ${phrasesHtml}
          </div>
        </div>

        <!-- City Filter Tabs -->
        <div class="mg-tabs-bar">
          <button type="button" class="mg-tab-pill ${filterCountry === 'all' ? 'active' : ''}" onclick="switchMasterGourmetFilter('all', this)">
            ${filterLabels.all[l] || filterLabels.all['ko']}
          </button>
          <button type="button" class="mg-tab-pill ${filterCountry === 'spain' ? 'active' : ''}" onclick="switchMasterGourmetFilter('spain', this)">
            ${filterLabels.spain[l] || filterLabels.spain['ko']}
          </button>
          <button type="button" class="mg-tab-pill ${filterCountry === 'italy' ? 'active' : ''}" onclick="switchMasterGourmetFilter('italy', this)">
            ${filterLabels.italy[l] || filterLabels.italy['ko']}
          </button>
        </div>
      </div>

      <!-- Countries & Cities -->
      <div class="mg-content-area">
        ${countriesHtml}
      </div>
    </div>
  `;
}

function renderMasterGourmetGuide(lang, filterCountry) {
  if (typeof MASTER_GOURMET_GUIDE_DATA === 'undefined') return;
  const mounts = document.querySelectorAll('.master-gourmet-mount');
  if (!mounts.length) return;

  const currentL = lang || (typeof currentLang !== 'undefined' ? currentLang : 'ko');
  const activeCountry = filterCountry || window.masterGourmetActiveCountry || 'all';
  window.masterGourmetActiveCountry = activeCountry;

  const html = buildMasterGourmetGuideHtml(MASTER_GOURMET_GUIDE_DATA, currentL, activeCountry);
  mounts.forEach(mount => {
    mount.innerHTML = html;
  });

  if (typeof renderPracticalCityCandidates === 'function') renderPracticalCityCandidates(currentL);

  // Re-apply survival filters if active
  if (window.masterSurvivalCountry !== 'all' || window.masterSurvivalCategory !== 'all') {
    applySurvivalPhrasesFilter();
  }
}

function switchMasterGourmetFilter(country, btn) {
  window.masterGourmetActiveCountry = country;
  const currentL = typeof currentLang !== 'undefined' ? currentLang : 'ko';
  renderMasterGourmetGuide(currentL, country);
}

function filterMasterSurvival(type, value, btn) {
  if (type === 'country') {
    window.masterSurvivalCountry = value;
    document.querySelectorAll('.mg-surv-pill').forEach(p => {
      p.classList.toggle('active', p.getAttribute('data-surv-country') === value);
    });
  } else if (type === 'category') {
    window.masterSurvivalCategory = value;
    document.querySelectorAll('.mg-surv-chip').forEach(c => {
      c.classList.toggle('active', c.getAttribute('data-surv-cat') === value);
    });
  }
  applySurvivalPhrasesFilter();
}

function applySurvivalPhrasesFilter() {
  const selectedCountry = window.masterSurvivalCountry || 'all';
  const selectedCat = window.masterSurvivalCategory || 'all';

  document.querySelectorAll('.mg-phrase-box').forEach(box => {
    const boxCountry = box.getAttribute('data-country');
    const boxCat = box.getAttribute('data-category');

    const matchCountry = selectedCountry === 'all' || boxCountry === selectedCountry;
    const matchCat = selectedCat === 'all' || boxCat === selectedCat;

    if (matchCountry && matchCat) {
      box.style.display = 'flex';
    } else {
      box.style.display = 'none';
    }
  });
}

if (typeof window !== 'undefined') {
  window.renderMasterGourmetGuide = renderMasterGourmetGuide;
  window.switchMasterGourmetFilter = switchMasterGourmetFilter;
  window.filterMasterSurvival = filterMasterSurvival;
  window.applySurvivalPhrasesFilter = applySurvivalPhrasesFilter;
}



// ==========================================================================
// 🍽️🌃 PRACTICAL INFO: CITY-BY-CITY DINING, MARKET & EVENING VIEW CANDIDATES (17 ITEMS)
// ==========================================================================
window.practicalCandidatesFilterState = window.practicalCandidatesFilterState || {
  city: 'all',
  type: 'all',
  oneStopOnly: false,
  savedOnly: false,
  searchQuery: '',
  dedupOpen: false
};

function getPracticalCandidateTypeBadgeClass(typeKey) {
  switch (typeKey) {
    case 'day_market':
      return 'pc-badge-day-market';
    case 'evening_food_hall':
      return 'pc-badge-food-hall';
    case 'christmas_market':
      return 'pc-badge-christmas';
    case 'cultural_site':
      return 'pc-badge-cultural-site';
    case 'evening_view':
      return 'pc-badge-evening-view';
    default:
      return 'pc-badge-default';
  }
}

function filterPracticalCandidatesCity(cityId) {
  window.practicalCandidatesFilterState.city = cityId;
  renderPracticalCityCandidates();
}

function filterPracticalCandidatesType(typeKey) {
  window.practicalCandidatesFilterState.type = typeKey;
  renderPracticalCityCandidates();
}

function togglePracticalCandidatesOneStop() {
  window.practicalCandidatesFilterState.oneStopOnly = !window.practicalCandidatesFilterState.oneStopOnly;
  renderPracticalCityCandidates();
}

function togglePracticalCandidatesSavedOnly() {
  window.practicalCandidatesFilterState.savedOnly = !window.practicalCandidatesFilterState.savedOnly;
  renderPracticalCityCandidates();
}

function handlePracticalCandidateSearch(val) {
  window.practicalCandidatesFilterState.searchQuery = val || '';
  renderPracticalCityCandidates();
  const input = document.getElementById('pcSearchInput');
  if (input) {
    input.focus();
    const len = input.value.length;
    input.setSelectionRange(len, len);
  }
}

function resetPracticalCandidatesFilters() {
  window.practicalCandidatesFilterState.city = 'all';
  window.practicalCandidatesFilterState.type = 'all';
  window.practicalCandidatesFilterState.oneStopOnly = false;
  window.practicalCandidatesFilterState.savedOnly = false;
  window.practicalCandidatesFilterState.searchQuery = '';
  renderPracticalCityCandidates();
}

function togglePracticalDedupBox() {
  window.practicalCandidatesFilterState.dedupOpen = !window.practicalCandidatesFilterState.dedupOpen;
  renderPracticalCityCandidates();
}

// ==========================================================================
// 🌐 MULTILINGUAL OVERRIDE FOR PRACTICAL CITY CANDIDATES (ko / en / ja / zh)
// ==========================================================================
function mapPracticalCategoryToFilterKey(categoryKey, typeKey) {
  if (typeKey) return typeKey;
  switch (categoryKey) {
    case 'daymarket':
    case 'day_market':
      return 'day_market';
    case 'foodhall':
    case 'restaurant':
    case 'evening_food_hall':
      return 'evening_food_hall';
    case 'xmasmarket':
    case 'christmas_market':
      return 'christmas_market';
    case 'viewpoint':
    case 'rooftop':
    case 'evening_view':
      return 'evening_view';
    case 'attraction':
    case 'historic_site':
      return 'cultural_site';
    default:
      return 'evening_food_hall';
  }
}

function getPracticalCandidateLocalizedItem(rawItem, lang) {
  const activeLang = (lang && ['ko', 'en', 'ja', 'zh'].includes(lang)) ? lang : (typeof currentLang !== 'undefined' && ['ko', 'en', 'ja', 'zh'].includes(currentLang) ? currentLang : 'ko');
  const i18nRoot = window.PRACTICAL_CANDIDATES_I18N || (typeof PRACTICAL_CANDIDATES_I18N !== 'undefined' ? PRACTICAL_CANDIDATES_I18N : null);
  const ui = (i18nRoot && i18nRoot.ui && i18nRoot.ui[activeLang]) ? i18nRoot.ui[activeLang] : (i18nRoot && i18nRoot.ui ? i18nRoot.ui.ko : {});
  const itemTrans = (activeLang !== 'ko' && i18nRoot && i18nRoot.items && i18nRoot.items[rawItem.id] && i18nRoot.items[rawItem.id][activeLang])
    ? i18nRoot.items[rawItem.id][activeLang]
    : null;

  const filterKey = mapPracticalCategoryToFilterKey(rawItem.categoryKey, rawItem.typeKey);
  const cityLabel = (ui.cities && ui.cities[rawItem.cityId]) ? ui.cities[rawItem.cityId] : `${rawItem.flag || ''} ${rawItem.cityName || rawItem.cityKo || ''}`;
  const cityEn = (ui.cityEnMap && ui.cityEnMap[rawItem.cityId]) ? ui.cityEnMap[rawItem.cityId] : (rawItem.cityEn || rawItem.cityId || '');
  const defaultSubTag = (ui.subTypeTags && ui.subTypeTags[rawItem.categoryKey]) ? ui.subTypeTags[rawItem.categoryKey] : (rawItem.subTypeTag || '');

  const rawName = (itemTrans && itemTrans.name) ? itemTrans.name : (rawItem.name || '');
  let mainTitle = rawName;
  let subTitle = rawItem.subtitle || '';
  if (!subTitle && rawName.includes('(') && rawName.endsWith(')')) {
    const idx = rawName.indexOf('(');
    mainTitle = rawName.slice(0, idx).trim();
    subTitle = rawName.slice(idx + 1, -1).trim();
  }

  const localizedSources = (rawItem.sources || []).map((src, idx) => ({
    url: src.url,
    label: (itemTrans && Array.isArray(itemTrans.sourceLabels) && itemTrans.sourceLabels[idx]) ? itemTrans.sourceLabels[idx] : src.label
  }));

  return {
    id: rawItem.id,
    cityId: rawItem.cityId,
    cityDisplay: cityLabel,
    cityEn: cityEn,
    filterKey: filterKey,
    categoryKey: rawItem.categoryKey,
    name: mainTitle,
    subtitle: subTitle,
    typeLabel: (itemTrans && itemTrans.typeBadge) ? itemTrans.typeBadge : (rawItem.typeBadge || rawItem.typeLabel || ''),
    subTypeTag: (itemTrans && itemTrans.subTypeTag) ? itemTrans.subTypeTag : defaultSubTag,
    verifyBadge: (itemTrans && itemTrans.verifyBadge) ? itemTrans.verifyBadge : (rawItem.verifyNotice || rawItem.verifyBadge || ''),
    oneStopParentRec: Boolean(rawItem.isOneStopRecommended || rawItem.oneStopParentRec),
    oneStopReason: (itemTrans && typeof itemTrans.oneStopReason === 'string') ? itemTrans.oneStopReason : (rawItem.oneStopReason || ''),
    highlights: (itemTrans && itemTrans.highlights) ? itemTrans.highlights : (rawItem.highlights || ''),
    verifiedHours: (itemTrans && itemTrans.hours) ? itemTrans.hours : (rawItem.hours || rawItem.verifiedHours || ''),
    seniorCaution: (itemTrans && itemTrans.seniorCaution) ? itemTrans.seniorCaution : (rawItem.seniorCaution || ''),
    broadcastNote: (itemTrans && itemTrans.broadcastNote) ? itemTrans.broadcastNote : (rawItem.broadcastNote || ''),
    sources: localizedSources,
    verifiedDate: ((rawItem.verifiedDate || '').match(/\d{4}-\d{2}-\d{2}/) || [])[0] || '',
    mapQuery: rawItem.mapQuery || `${mainTitle} ${cityEn}`,
    ui: ui
  };
}

function renderPracticalCandidateCardHtml(rawItem, savedIdsSet, lang) {
  const item = getPracticalCandidateLocalizedItem(rawItem, lang);
  const ui = item.ui || {};
  const isSaved = savedIdsSet && savedIdsSet.has(item.id);
  const badgeClass = getPracticalCandidateTypeBadgeClass(item.filterKey);
  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item.mapQuery)}`;

  const sourcesLinksHtml = (item.sources || []).map(src => `
    <a href="${src.url}" target="_blank" rel="noopener noreferrer" class="pc-source-link">
      🔗 ${src.label} ↗
    </a>
  `).join('');

  const oneStopBannerHtml = (item.oneStopParentRec && item.oneStopReason) ? `
    <div class="pc-onestop-banner">
      <div class="pc-onestop-title">${ui.oneStopBannerTitle || '🌟 부모님 동행 우선 추천 (식사+전망·산책 원스톱)'}</div>
      <div class="pc-onestop-desc">${item.oneStopReason}</div>
    </div>
  ` : '';

  const formatMultiline = (txt) => String(txt || '').replace(/\n/g, '<br>');

  return `
    <article class="pc-card ${item.oneStopParentRec ? 'pc-card-onestop' : ''}" id="pc-card-${item.id}" data-city="${item.cityId}" data-type="${item.filterKey}">
      <div class="pc-card-top">
        <div class="pc-card-city-row">
          <span class="pc-city-pill">${item.cityDisplay} <small>(${item.cityEn})</small></span>
          <span class="pc-verify-pill">🔎 ${item.verifyBadge}</span>
        </div>
        <div class="pc-type-row">
          <span class="pc-type-badge ${badgeClass}">${item.typeLabel}</span>
          ${item.subTypeTag ? `<span class="pc-subtype-tag">${item.subTypeTag}</span>` : ''}
        </div>
        <h3 class="pc-card-title">${item.name}</h3>
        ${item.subtitle ? `<p class="pc-card-subtitle">${item.subtitle}</p>` : ''}
        ${item.broadcastNote ? `<div class="pc-broadcast-note">📺 ${item.broadcastNote}</div>` : ''}
      </div>

      ${oneStopBannerHtml}

      <div class="pc-card-body">
        <div class="pc-info-block">
          <div class="pc-info-label">${ui.labelHighlights || '🍴 대표 먹거리 · 전망'}</div>
          <div class="pc-info-text">${formatMultiline(item.highlights)}</div>
        </div>

        <div class="pc-info-block pc-info-hours">
          <div class="pc-info-label">${ui.labelHours || '⏰ 확인된 운영시간'} <span class="pc-hours-caveat">${ui.labelHoursCaveat || '(방문 당일 변경 가능성 있음 · 방문 전 확인)'}</span></div>
          <div class="pc-info-text">${formatMultiline(item.verifiedHours)}</div>
        </div>

        <div class="pc-info-block pc-info-caution">
          <div class="pc-info-label">${ui.labelSeniorCaution || '🦯 부모님 동행 시 계단·경사·이동 주의'}</div>
          <div class="pc-info-text">${formatMultiline(item.seniorCaution)}</div>
        </div>
      </div>

      <div class="pc-card-footer">
        <div class="pc-sources-box">
          <div class="pc-sources-meta">
            <span>${ui.labelOfficialSource || '📌 공식 출처'}</span>
            <span class="pc-verified-date">${ui.labelVerifiedDate || '공식 출처 확인:'} ${item.verifiedDate}</span>
          </div>
          <div class="pc-sources-links">
            ${sourcesLinksHtml}
          </div>
        </div>

        <div class="pc-card-actions">
          <a href="${mapUrl}" target="_blank" rel="noopener noreferrer" class="pc-btn-map">
            ${ui.btnMap || '📍 구글 지도 ↗'}
          </a>
          <button type="button" class="btn-candidate-save pc-btn-save ${isSaved ? 'saved' : ''}" onclick="toggleSaveCandidate('practical_candidate', '${item.id}')">
            ${isSaved ? (ui.btnSaved || '✓ 후보 저장됨') : (ui.btnSave || '⭐ 후보 저장')}
          </button>
        </div>
      </div>
    </article>
  `;
}

function renderSavedPracticalCandidateCard(itemId) {
  const dataObj = window.PRACTICAL_CITY_CANDIDATES_DATA || (typeof PRACTICAL_CITY_CANDIDATES_DATA !== 'undefined' ? PRACTICAL_CITY_CANDIDATES_DATA : null);
  if (!dataObj || !Array.isArray(dataObj.items)) return '';
  const item = dataObj.items.find(x => x.id === itemId);
  if (!item) return '';
  const savedList = typeof getSavedCandidates === 'function' ? getSavedCandidates() : [];
  const savedIdsSet = new Set(savedList.map(c => c.id));
  const activeLang = (typeof currentLang !== 'undefined' && ['ko', 'en', 'ja', 'zh'].includes(currentLang)) ? currentLang : 'ko';
  return renderPracticalCandidateCardHtml(item, savedIdsSet, activeLang);
}

function updatePracticalSubnavBarI18n(ui) {
  if (!ui) return;
  const bars = document.querySelectorAll('.practical-subnav-bar');
  bars.forEach(bar => {
    const labelEl = bar.querySelector('.practical-subnav-label');
    if (labelEl && ui.subnavLabel) labelEl.textContent = ui.subnavLabel;
    const chips = bar.querySelectorAll('.practical-subnav-chip');
    if (chips[0] && ui.subnavCandidates) chips[0].textContent = ui.subnavCandidates;
    if (chips[1] && ui.subnavMaster) chips[1].textContent = ui.subnavMaster;
    if (chips[2] && ui.subnavDirectory) chips[2].textContent = ui.subnavDirectory;
  });
}

function renderPracticalCityCandidates(lang) {
  const mount = document.getElementById('practical-city-candidates');
  if (!mount) return;

  const dataObj = window.PRACTICAL_CITY_CANDIDATES_DATA || (typeof PRACTICAL_CITY_CANDIDATES_DATA !== 'undefined' ? PRACTICAL_CITY_CANDIDATES_DATA : null);
  if (!dataObj || !Array.isArray(dataObj.items)) return;

  const activeLang = (lang && ['ko', 'en', 'ja', 'zh'].includes(lang))
    ? lang
    : ((typeof currentLang !== 'undefined' && ['ko', 'en', 'ja', 'zh'].includes(currentLang)) ? currentLang : 'ko');

  const i18nRoot = window.PRACTICAL_CANDIDATES_I18N || (typeof PRACTICAL_CANDIDATES_I18N !== 'undefined' ? PRACTICAL_CANDIDATES_I18N : null);
  const ui = (i18nRoot && i18nRoot.ui && i18nRoot.ui[activeLang]) ? i18nRoot.ui[activeLang] : (i18nRoot && i18nRoot.ui ? i18nRoot.ui.ko : {});

  updatePracticalSubnavBarI18n(ui);

  window.practicalCandidatesFilterState = window.practicalCandidatesFilterState || {
    city: 'all',
    type: 'all',
    oneStopOnly: false,
    savedOnly: false,
    searchQuery: '',
    dedupOpen: false
  };
  const state = window.practicalCandidatesFilterState;
  const allItems = dataObj.items;
  const savedList = typeof getSavedCandidates === 'function' ? getSavedCandidates() : [];
  const savedIdsSet = new Set(savedList.map(c => c.id));
  const savedPracticalCount = allItems.filter(it => savedIdsSet.has(it.id)).length;

  const cities = [
    { id: 'all', label: ui.cityAll || '🌐 전체 도시', count: allItems.length },
    { id: 'barcelona', label: (ui.cities && ui.cities.barcelona) || '🇪🇸 바르셀로나', count: allItems.filter(x => x.cityId === 'barcelona').length },
    { id: 'granada', label: (ui.cities && ui.cities.granada) || '🇪🇸 그라나다', count: allItems.filter(x => x.cityId === 'granada').length },
    { id: 'malaga', label: (ui.cities && ui.cities.malaga) || '🇪🇸 말라가', count: allItems.filter(x => x.cityId === 'malaga').length },
    { id: 'seville', label: (ui.cities && ui.cities.seville) || '🇪🇸 세비야', count: allItems.filter(x => x.cityId === 'seville').length },
    { id: 'naples', label: (ui.cities && ui.cities.naples) || '🇮🇹 나폴리', count: allItems.filter(x => x.cityId === 'naples').length },
    { id: 'florence', label: (ui.cities && ui.cities.florence) || '🇮🇹 피렌체', count: allItems.filter(x => x.cityId === 'florence').length },
    { id: 'rome', label: (ui.cities && ui.cities.rome) || '🇮🇹 로마', count: allItems.filter(x => x.cityId === 'rome').length }
  ];

  const types = [
    { key: 'all', label: (ui.types && ui.types.all) || '전체 유형', icon: '🗂️', count: allItems.length },
    { key: 'evening_food_hall', label: (ui.types && ui.types.evening_food_hall) || '저녁까지 운영하는 식당가/푸드홀·식당', icon: '🍽️', count: allItems.filter(x => mapPracticalCategoryToFilterKey(x.categoryKey, x.typeKey) === 'evening_food_hall').length },
    { key: 'evening_view', label: (ui.types && ui.types.evening_view) || '일몰·초저녁·야경 전망 & 루프톱', icon: '🌅', count: allItems.filter(x => mapPracticalCategoryToFilterKey(x.categoryKey, x.typeKey) === 'evening_view').length },
    { key: 'day_market', label: (ui.types && ui.types.day_market) || '낮 시간 전통 시장 (야시장 아님)', icon: '☀️', count: allItems.filter(x => mapPracticalCategoryToFilterKey(x.categoryKey, x.typeKey) === 'day_market').length },
    { key: 'cultural_site', label: (ui.types && ui.types.cultural_site) || '박물관·궁전·정원·문화 명소', icon: '🏛️', count: allItems.filter(x => mapPracticalCategoryToFilterKey(x.categoryKey, x.typeKey) === 'cultural_site').length },
    { key: 'christmas_market', label: (ui.types && ui.types.christmas_market) || '기간 한정 크리스마스 마켓', icon: '🎄', count: allItems.filter(x => mapPracticalCategoryToFilterKey(x.categoryKey, x.typeKey) === 'christmas_market').length }
  ];

  const filteredItems = allItems.filter(rawItem => {
    const loc = getPracticalCandidateLocalizedItem(rawItem, activeLang);
    if (state.city !== 'all' && loc.cityId !== state.city) return false;
    if (state.type !== 'all' && loc.filterKey !== state.type) return false;
    if (state.oneStopOnly && !loc.oneStopParentRec) return false;
    if (state.savedOnly && !savedIdsSet.has(loc.id)) return false;
    if (state.searchQuery && state.searchQuery.trim() !== '') {
      const q = state.searchQuery.trim().toLowerCase();
      const hay = `${rawItem.cityName || ''} ${loc.cityDisplay} ${loc.cityEn} ${rawItem.name || ''} ${loc.name} ${loc.subtitle} ${loc.typeLabel} ${loc.subTypeTag} ${rawItem.highlights || ''} ${loc.highlights} ${loc.verifiedHours} ${loc.seniorCaution} ${loc.broadcastNote}`.toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });

  const dedupRowsHtml = (dataObj.deduplicationBaseline || []).map(row => {
    const cId = row.cityId;
    const dedupTrans = (activeLang !== 'ko' && i18nRoot && i18nRoot.dedup && i18nRoot.dedup[cId] && i18nRoot.dedup[cId][activeLang])
      ? i18nRoot.dedup[cId][activeLang]
      : null;
    const cityText = dedupTrans ? dedupTrans.city : (row.city || `${row.flag || ''} ${row.cityName || ''} (${row.stayInfo || ''})`);
    const existingText = dedupTrans ? dedupTrans.existing : (row.existingItems || row.existing || '');
    const addedText = dedupTrans ? dedupTrans.added : (row.addedSummary || row.added || '');

    return `
      <div class="pc-dedup-row">
        <div class="pc-dedup-city">${cityText}</div>
        <div class="pc-dedup-existing"><strong>${ui.dedupExistingLabel || '기존 수록:'}</strong> ${existingText}</div>
        <div class="pc-dedup-added"><strong>${ui.dedupAddedLabel || '신규 추가·보강:'}</strong> ${addedText}</div>
      </div>
    `;
  }).join('');

  const cityTabsHtml = cities.map(c => `
    <button type="button" class="pc-city-tab ${state.city === c.id ? 'active' : ''}" onclick="filterPracticalCandidatesCity('${c.id}')">
      <span>${c.label}</span>
      <span class="pc-tab-count">${c.count}</span>
    </button>
  `).join('');

  const typeChipsHtml = types.map(t => `
    <button type="button" class="pc-type-chip ${state.type === t.key ? 'active' : ''}" onclick="filterPracticalCandidatesType('${t.key}')">
      <span>${t.icon} ${t.label}</span>
      <span class="pc-chip-count">${t.count}</span>
    </button>
  `).join('');

  const cardsHtml = filteredItems.length > 0
    ? filteredItems.map(item => renderPracticalCandidateCardHtml(item, savedIdsSet, activeLang)).join('')
    : `
      <div class="pc-empty-state">
        <div style="font-size:28px;margin-bottom:8px;">🔍</div>
        <div style="font-weight:700;font-size:16px;color:var(--text);">${ui.emptyTitle || '선택하신 필터 조건에 해당하는 후보 장소가 없습니다.'}</div>
        <p style="font-size:13.5px;color:var(--muted);margin-top:6px;">${ui.emptyDesc || '도시나 유형 필터를 초기화하면 7개 도시 17개 추가 후보를 모두 확인하실 수 있습니다.'}</p>
        <button type="button" class="pc-reset-btn" onclick="resetPracticalCandidatesFilters()">${ui.emptyResetBtn || '필터 전체 초기화'}</button>
      </div>
    `;

  mount.innerHTML = `
    <section class="practical-candidates-section" aria-label="${ui.mainTitle || '도시별 추가 맛집·시장·전망 후보 컬렉션'}">
      <div class="pc-header-banner">
        <div class="pc-header-top">
          <div>
            <span class="pc-kicker">${ui.kicker || '05-A / VERIFIED CITY-BY-CITY CANDIDATE DIRECTORY (NON-DUPLICATE)'}</span>
            <h3 class="pc-main-title">${ui.mainTitle || '🗂️ 도시별 추가 맛집 · 전통시장 · 푸드홀 · 일몰·야경 후보 17선'}</h3>
            <p class="pc-main-desc">
              ${ui.mainDesc || ''}
            </p>
          </div>
          <div class="pc-header-badges">
            <span class="pc-policy-pill">${ui.policyNoNightMarket || '🚫 전통 야시장 오표기 배제'}</span>
            <span class="pc-policy-pill">${ui.policySameDayChange || '🔎 방문 당일 운영 변경 가능성 명시'}</span>
            <span class="pc-policy-pill">${ui.policyVerifiedDate || '📌 공식 출처 · 확인일(2026-10-29) 표기'}</span>
          </div>
        </div>

        <div class="pc-dedup-toggle-bar">
          <div class="pc-dedup-summary">
            <span>${ui.dedupSummary || ''}</span>
          </div>
          <button type="button" class="pc-dedup-btn" onclick="togglePracticalDedupBox()">
            ${state.dedupOpen ? (ui.dedupBtnOpen || '기존 수록 장소 vs 신규 추가 대조표 접기 ▲') : (ui.dedupBtnClosed || '기존 수록 장소 vs 신규 추가 대조표 보기 ▼')}
          </button>
        </div>

        <div class="pc-dedup-panel" style="display: ${state.dedupOpen ? 'grid' : 'none'};">
          ${dedupRowsHtml}
        </div>
      </div>

      <div class="pc-controls-panel">
        <div class="pc-filter-group">
          <div class="pc-filter-label">${ui.cityFilterLabel || '📍 도시별 바로 찾기 (7개 도시)'}</div>
          <div class="pc-city-tabs" role="tablist">
            ${cityTabsHtml}
          </div>
        </div>

        <div class="pc-filter-group">
          <div class="pc-filter-label">${ui.typeFilterLabel || '🏷️ 장소 유형별 필터'}</div>
          <div class="pc-type-chips">
            ${typeChipsHtml}
          </div>
        </div>

        <div class="pc-toolbar-row">
          <div class="pc-quick-toggles">
            <button type="button" class="pc-special-toggle ${state.oneStopOnly ? 'active' : ''}" onclick="togglePracticalCandidatesOneStop()">
              ${ui.oneStopToggle || '🌟 부모님 동행 원스톱 추천만 보기'}
            </button>
            <button type="button" class="pc-special-toggle pc-saved-toggle ${state.savedOnly ? 'active' : ''}" onclick="togglePracticalCandidatesSavedOnly()">
              ${ui.savedToggle || '⭐ 저장한 후보만 보기'} (${savedPracticalCount})
            </button>
          </div>

          <div class="pc-search-box">
            <input
              type="search"
              id="pcSearchInput"
              class="pc-search-input"
              placeholder="${(ui.searchPlaceholder || '').replace(/"/g, '&quot;')}"
              value="${(state.searchQuery || '').replace(/"/g, '&quot;')}"
              oninput="handlePracticalCandidateSearch(this.value)"
            />
            ${(state.city !== 'all' || state.type !== 'all' || state.oneStopOnly || state.savedOnly || state.searchQuery) ? `
              <button type="button" class="pc-clear-filter-btn" onclick="resetPracticalCandidatesFilters()">${ui.clearFilterBtn || '초기화 ✕'}</button>
            ` : ''}
          </div>
        </div>

        <div class="pc-result-status">
          <span>${ui.resultCountPrefix || '현재 표시 중:'} <strong>${filteredItems.length}${ui.resultCountMiddle || ''}</strong> ${ui.resultCountSuffix || '/ 17'}</span>
          <span>${ui.resultDisclaimer || ''}</span>
        </div>
      </div>

      <div class="pc-cards-grid">
        ${cardsHtml}
      </div>
    </section>
  `;
}

function downloadIcsCalendar() {
  return downloadCustomCalendarIcs();
}

if (typeof window !== 'undefined') {
  window.downloadCustomCalendarIcs = downloadCustomCalendarIcs;
  window.downloadIcsCalendar = downloadIcsCalendar;
  window.filterPracticalCandidatesCity = filterPracticalCandidatesCity;
  window.filterPracticalCandidatesType = filterPracticalCandidatesType;
  window.togglePracticalCandidatesOneStop = togglePracticalCandidatesOneStop;
  window.togglePracticalCandidatesSavedOnly = togglePracticalCandidatesSavedOnly;
  window.handlePracticalCandidateSearch = handlePracticalCandidateSearch;
  window.resetPracticalCandidatesFilters = resetPracticalCandidatesFilters;
  window.togglePracticalDedupBox = togglePracticalDedupBox;
  window.renderPracticalCandidateCardHtml = renderPracticalCandidateCardHtml;
  window.renderSavedPracticalCandidateCard = renderSavedPracticalCandidateCard;
  window.renderPracticalCityCandidates = renderPracticalCityCandidates;
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      renderPracticalCityCandidates();
    });
  } else {
    renderPracticalCityCandidates();
  }
}
