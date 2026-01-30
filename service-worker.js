const CACHE_NAME = "entom-cache-v2";

const urlsToCache = [
  "./",              // raíz (sirve index.html)
  "./index.html",     // tu app real
  "./logo.png",
  "./manifest.json",
  "./service-worker.js"
];

// INSTALACIÓN DEL SERVICE WORKER (precaching)
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
  );
  self.skipWaiting();
});

// ACTIVACIÓN (limpia caches viejos)
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.map((k) => (k !== CACHE_NAME ? caches.delete(k) : null)))
    )
  );
  self.clients.claim();
});

// FETCH: cache-first con fallback a red
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});