'use client';

import { useEffect } from 'react';

// Extend Window interface to include workbox
declare global {
  interface Window {
    workbox?: any;
  }
}

export function ServiceWorkerRegistration() {
  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      'serviceWorker' in navigator &&
      window.workbox === undefined
    ) {
      const wb = new (window as any).Workbox('/sw.js');

      // Add event listeners to handle PWA lifecycle
      wb.addEventListener('installed', (event: any) => {
        console.log('Service Worker installed');
      });

      wb.addEventListener('controlling', (event: any) => {
        console.log('Service Worker controlling');
      });

      wb.addEventListener('activated', (event: any) => {
        console.log('Service Worker activated');
      });

      // Send the skipWaiting message
      wb.messageSkipWaiting();

      // Register the service worker
      wb.register();
    }
  }, []);

  return null;
}
