# CDN & Caching Notes

- Static assets: `/_next/static/*` and `/public/*` are sent with `Cache-Control: public, max-age=31536000, immutable` via `next.config.js` headers().
- HTML and API: `Cache-Control: max-age=0, must-revalidate` set via `src/middleware.ts` for dynamic content.
- Ensure your CDN honors origin Cache-Control and does not cache HTML when you need SSR freshness.
