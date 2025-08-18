// Basic service worker for caching
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('v1').then((cache) => {
      return cache.addAll(['/', '/offline', '/manifest.json']);
    }),
  );
});
