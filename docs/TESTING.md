# Testing Guide

## Running Tests

### Unit Tests

```bash
npm run test
npm run test:coverage
```

### E2E Tests

```bash
npm run test:e2e      # Headless, with dynamic port and seeded DB
npm run cypress:open  # Interactive
```

### Performance Tests

```bash
npm run test:lighthouse
```

### Load Tests

```bash
k6 run k6-load-test.js
```

## Test Coverage Goals

- Unit Tests: > 80%
- Integration Tests: > 70%
- E2E Tests: Critical paths

## CI/CD Pipeline

GitHub Actions runs unit and E2E tests on push/PR to `main` using Node 20. Workflow lives in `.github/workflows/ci.yml` and calls `npm run test:ci`.
