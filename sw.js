const CACHE_NAME = 'sakura-matrix-v5';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './css/styles.css',
  './assets/sakura-bg.jpg',
  './assets/icon.svg',
  './js/sakura.js',
  './js/fx.js',
  './js/ai.js',
  './js/app.js',
  './js/components/header.js',
  './js/components/metrics.js',
  './js/components/matrix.js',
  './js/components/modal.js',
  './js/components/footer.js',
  './js/components/bonsai.js',
  './js/components/briefing.js',
  './js/components/wrapped.js',
  './js/components/note-modal.js',
  './js/components/ai-coach.js'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE).catch(err => console.warn('Cache pre-fetch note:', err));
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((k) => {
          if (k !== CACHE_NAME) return caches.delete(k);
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;
  const url = new URL(e.request.url);

  // Ignore non-http/https requests (e.g. browser extensions)
  if (!url.protocol.startsWith('http')) return;

  // Do not intercept or cache external AI API requests
  if (url.hostname === 'generativelanguage.googleapis.com' || url.hostname.endsWith('.googleapis.com')) {
    return;
  }

  // Stale-While-Revalidate for app assets
  e.respondWith(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.match(e.request).then((cached) => {
        const fetchPromise = fetch(e.request).then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            cache.put(e.request, networkResponse.clone());
          }
          return networkResponse;
        }).catch(() => {
          // If offline and request is navigation, fallback to cached index.html
          if (e.request.mode === 'navigate') {
            return cache.match('./index.html');
          }
          return cached;
        });

        // Return cached immediately if found, otherwise await network
        return cached || fetchPromise;
      });
    })
  );
});
