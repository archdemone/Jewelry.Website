// Empty service worker to prevent errors
console.log('Service Worker: Empty worker loaded');

// Install event - do nothing
self.addEventListener('install', () => {
  console.log('SW: Install - doing nothing');
  self.skipWaiting();
});

// Activate event - do nothing
self.addEventListener('activate', () => {
  console.log('SW: Activate - doing nothing');
  self.clients.claim();
});

// Fetch event - do nothing, let all requests pass through
self.addEventListener('fetch', () => {
  // Do nothing - let all requests pass through normally
});