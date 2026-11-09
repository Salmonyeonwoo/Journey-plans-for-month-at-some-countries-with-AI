// SlowTravel Mobile Offline Service Worker (v20261109_02)
// Guaranteed Offline & Airplane Mode Support for iOS Safari & Android Chrome.

const CACHE_NAME = 'slowtravel-offline-v20261109_02';

const PRECACHE_ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './css/style.css',
  './css/activity-guide.css',
  './css/barcelona-transit-guide.css',
  './css/flamenco-guide.css',
  './css/mobile-first.css',
  './css/guidebook-navigation.css',
  './js/data.js',
  './js/spanish-market-food-guide.js',
  './js/barcelona-dining-guide.js',
  './js/activity-guide.js',
  './js/flamenco-guide.js',
  './js/barcelona-transit-guide.js',
  './js/spanish-bus-directions.js',
  './js/barcelona-local-guide.js',
  './js/barcelona-day-options.js',
  './js/barcelona-final-day-plan.js',
  './img/gourmet/barcelona-pan-con-tomate-user.jpg',
  './img/gourmet/barcelona-prawns-user.jpg',
  './img/gourmet/barcelona-jamon-user.jpg',
  './img/gourmet/barcelona-croquetas-user.jpg',
  './js/practical-place-additions.js',
  './js/curated-places-guide.js',
  './js/travel-diary.js',
  './js/components.js',
  './js/app.js',
  './js/guidebook-navigation.js',
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css',
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'
];

self.addEventListener('install', (event) => {
  // Pre-cache all core assets individually so a failure on one external asset never aborts caching
  event.waitUntil(
    caches.open(CACHE_NAME).then(async (cache) => {
      await Promise.allSettled(
        PRECACHE_ASSETS.map(async (url) => {
          try {
            const req = new Request(url, { cache: 'reload' });
            const res = await fetch(req);
            if (res && (res.ok || res.type === 'opaque')) {
              await cache.put(req, res);
            }
          } catch (err) {
            console.warn('[SlowTravel SW] Precache item skip/fail:', url, err);
          }
        })
      );
      // Explicitly cache root and index.html relative to registration scope
      try {
        const rootUrl = new URL('./', self.registration.scope).href;
        const indexUrl = new URL('./index.html', self.registration.scope).href;
        const indexRes = await cache.match('./index.html') || await cache.match('./');
        if (indexRes) {
          await cache.put(rootUrl, indexRes.clone());
          await cache.put(indexUrl, indexRes.clone());
        }
      } catch (e) {}
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((name) => {
          if (name !== CACHE_NAME) {
            return caches.delete(name);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);

  // 1. Navigation requests (HTML document): Network-first with short timeout and robust offline cache fallback
  if (req.mode === 'navigate' || req.headers.get('accept')?.includes('text/html')) {
    event.respondWith(
      (async () => {
        try {
          // Attempt network fetch with 2-second timeout to handle flaky airplane/transit network
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 2000);
          const networkRes = await fetch(req, { signal: controller.signal });
          clearTimeout(timeoutId);

          if (networkRes && networkRes.status === 200) {
            const resClone = networkRes.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(req, resClone);
              cache.put('./index.html', networkRes.clone());
              cache.put('./', networkRes.clone());
            });
            return networkRes;
          }
        } catch (fetchErr) {
          // Network failed (Airplane mode, Subway, Disconnected)
        }

        // Offline Fallback
        const cache = await caches.open(CACHE_NAME);
        const cached = (await cache.match(req, { ignoreSearch: true }))
          || (await cache.match('./index.html', { ignoreSearch: true }))
          || (await cache.match('./', { ignoreSearch: true }))
          || (await cache.match('index.html', { ignoreSearch: true }))
          || (await cache.match(new URL('./index.html', self.registration.scope).href))
          || (await cache.match(self.registration.scope));

        if (cached) return cached;

        // Deep fallback: search any cached HTML
        const keys = await cache.keys();
        for (const k of keys) {
          if (k.url.endsWith('index.html') || k.url === self.registration.scope || k.url.endsWith('/')) {
            const res = await cache.match(k);
            if (res) return res;
          }
        }

        return new Response(
          '<!DOCTYPE html><html><head><meta charset="utf-8"><title>SlowTravel Offline</title><meta name="viewport" content="width=device-width,initial-scale=1"></head><body style="font-family:sans-serif;padding:32px;text-align:center;background:#faf8f5;"><h2>✈️ SlowTravel 비행기 모드</h2><p>오프라인 캐시를 준비 중입니다. 온라인 상태에서 한 번 접속하시면 오프라인에서도 모든 일정이 정상 표시됩니다.</p></body></html>',
          { headers: { 'Content-Type': 'text/html; charset=utf-8' } }
        );
      })()
    );
    return;
  }

  // 2. Ignore non-essential 3rd-party domains (Google Maps embeds, YouTube, etc.)
  if (url.origin !== self.location.origin && !url.hostname.includes('unpkg.com')) {
    return;
  }

  // 3. Static assets (CSS, JS, manifest, fonts): Stale-While-Revalidate with search query ignored
  event.respondWith(
    caches.match(req, { ignoreSearch: true }).then((cachedRes) => {
      const fetchPromise = fetch(req)
        .then((networkRes) => {
          if (networkRes && networkRes.status === 200) {
            const resClone = networkRes.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(req, resClone));
          }
          return networkRes;
        })
        .catch(() => {
          // If network failed and nothing cached, try clean URL without query string
          const cleanUrl = req.url.split('?')[0];
          return caches.match(cleanUrl);
        });

      // Return cached version immediately if available, while refreshing in background
      return cachedRes || fetchPromise;
    })
  );
});
