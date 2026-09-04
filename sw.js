const CACHE_NAME = 'sakura-matrix-v3';
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
      return cache.addAll(ASSETS_TO_CACHE).catch(err => console.log("Cache pre-fetch error", err));
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
  e.respondWith(
    caches.match(e.request).then((cached) => {
      return cached || fetch(e.request).catch(() => cached);
    })
  );
});
