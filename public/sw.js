// Service worker with manifest bypass
console.log('SW: Worker loaded - bypassing manifest requests');

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  if (url.pathname.endsWith('/manifest.webmanifest')) {
    console.log('SW: Bypassing manifest request');
    return; // let network handle it
  }
  // ...other strategies
});
