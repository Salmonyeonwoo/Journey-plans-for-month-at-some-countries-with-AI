// SlowTravel Mobile Offline Service Worker (v20261031_02)
// Optimized for iOS Safari, Android Chrome, and mobile airplane mode.

const CACHE_NAME = 'slowtravel-offline-v20261031_02';

const PRECACHE_URLS = [
  './',
  './index.html',
  './manifest.json',
  './css/style.css',
  './css/style.css?v=20261031_01',
  './js/data.js',
  './js/data.js?v=20261029_06',
  './js/practical-place-additions.js',
  './js/practical-place-additions.js?v=20261031_01',
  './js/components.js',
  './js/components.js?v=20261029_06',
  './js/app.js',
  './js/app.js?v=20261031_01',
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css',
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE_URLS).catch((err) => {
        console.warn('[SlowTravel SW] Precache partial error:', err);
      });
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

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);

  // 1. Navigation requests (HTML page): Network-first with Cache fallback for airplane mode
  if (req.mode === 'navigate' || req.headers.get('accept')?.includes('text/html')) {
    event.respondWith(
      fetch(req)
        .then((networkRes) => {
          if (networkRes && networkRes.status === 200) {
            const resClone = networkRes.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(req, resClone));
          }
          return networkRes;
        })
        .catch(() => {
          return caches.match(req).then((cached) => {
            return cached || caches.match('./index.html') || caches.match('./');
          });
        })
    );
    return;
  }

  // 2. Ignore non-CDN external requests (Google Maps, YouTube external API, etc.)
  if (url.origin !== self.location.origin && !url.hostname.includes('unpkg.com')) {
    return;
  }

  // 3. Static assets: Cache-first with background auto-update (Stale-While-Revalidate)
  event.respondWith(
    caches.match(req, { ignoreSearch: true }).then((cachedRes) => {
      if (cachedRes) {
        fetch(req)
          .then((networkRes) => {
            if (networkRes && networkRes.status === 200) {
              caches.open(CACHE_NAME).then((cache) => cache.put(req, networkRes));
            }
          })
          .catch(() => {});
        return cachedRes;
      }

      return fetch(req)
        .then((networkRes) => {
          if (networkRes && networkRes.status === 200) {
            const resClone = networkRes.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(req, resClone));
          }
          return networkRes;
        })
        .catch(() => {
          // If network failed and exact match failed, try matching base URL without query params
          const cleanUrl = req.url.split('?')[0];
          return caches.match(cleanUrl);
        });
    })
  );
});
