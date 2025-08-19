# Performance Optimization

## Next.js Config

- `swcMinify: true`
- `compress: true`
- `poweredByHeader: false`
- `optimizeCss: true`
- SplitChunks for client bundles

## Images

- Use `next/image` with AVIF/WebP
- Serve via CDN

## Caching

- Set appropriate Cache-Control headers
- Use Redis for session/cache where possible

## Code Splitting

- Dynamic import heavy components
- Avoid large libraries on critical path

## Monitoring

- Track Core Web Vitals
- Lighthouse CI
