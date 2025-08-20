4) CI / automation (minimum viable)

On PR / main:

npm ci

npm run type-check:strict + npm run lint

npm run build

Smoke: start on random port, wait-on /:200, curl /api/healthz expect 200

Artifacts: upload .next and Lighthouse JSON if you run perf in CI.

Secrets: CI uses repo/environment secrets; never echo secret values.