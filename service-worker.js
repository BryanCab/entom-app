
const CACHE_NAME = "entom-cache-v1";
const urlsToCache = [
  "./",
  "./prueba27.html",
  "./logo.png",
  "./manifest.json"
];

// INSTALACIÓN DEL SERVICE WORKER
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

// SERVIR DESDE CACHE (offline)
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
