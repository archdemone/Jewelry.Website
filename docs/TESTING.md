# Testing Guide

## Running Tests

### Unit Tests
```bash
npm run test
npm run test:coverage
```

### E2E Tests
```bash
npm run cypress:open  # Interactive
npm run cypress:run   # Headless
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
Tests run automatically on:
- Pull requests
- Pre-deployment
- Scheduled (nightly)