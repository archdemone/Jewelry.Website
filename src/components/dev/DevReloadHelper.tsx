'use client';

import { useEffect } from 'react';

/**
 * Development helper component that ensures changes are immediately visible
 * This component only runs in development mode
 */
export function DevReloadHelper() {
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      // Force reload on CSS changes
      const forceReload = () => {
        // Add a timestamp to force reload
        const timestamp = Date.now();
        const links = document.querySelectorAll('link[rel="stylesheet"]');
        
        links.forEach((link: Element) => {
          const linkElement = link as HTMLLinkElement;
          if (linkElement.href && linkElement.href.includes('localhost')) {
            const url = new URL(linkElement.href);
            url.searchParams.set('v', timestamp.toString());
            linkElement.href = url.toString();
          }
        });
      };

      // Listen for file changes via WebSocket
      if (typeof window !== 'undefined' && 'WebSocket' in window) {
        const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
        const ws = new WebSocket(`${protocol}//${window.location.host}/_next/webpack-hmr`);
        
        ws.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data);
            if (data.type === 'hash' || data.type === 'ok') {
              // Force reload on significant changes
              setTimeout(() => {
                window.location.reload();
              }, 100);
            }
          } catch (error) {
            // If parsing fails, force reload anyway
            setTimeout(() => {
              window.location.reload();
            }, 100);
          }
        };

        ws.onerror = () => {
          // If WebSocket fails, set up polling
          setInterval(() => {
            forceReload();
          }, 2000);
        };

        return () => ws.close();
      }

      // Fallback: Poll for changes every 2 seconds
      const interval = setInterval(() => {
        forceReload();
      }, 2000);

      return () => clearInterval(interval);
    }
  }, []);

  // This component doesn't render anything
  return null;
}
