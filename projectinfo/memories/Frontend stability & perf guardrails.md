5) Frontend stability & perf guardrails

LCP hero:

Use next/image with priority on the first visible hero image only.

Real dimensions (avoid CLS), serve WebP/AVIF, target ≤ 200 KB.

Avoid JS-driven carousels for LCP element; use CSS scroll-snap or render first slide statically.

TBT / main-thread:

Dynamic import heavy UI (next/dynamic({ ssr:false })) below the fold.

Defer/idle-load third-party scripts; remove unused.

Caching / headers:

Static assets: long max-age + immutable.

HTML/JSON: short max-age, ETag enabled.

SW pitfalls: never cache HTML as “cache-first”; prefer network-first with fallback.

Budgets (don’t break them):

LCP < 2.5s, TBT < 300 ms, CLS < 0.1, First Load JS (route) < 2 MB.