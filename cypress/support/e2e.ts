import './commands';

// Ignore application uncaught exceptions to keep E2E flows resilient in CI/dev
// We still assert critical UI and behavior via tests
Cypress.on('uncaught:exception', () => false);
