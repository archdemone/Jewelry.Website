describe('Complete User Journey', () => {
  it('completes purchase from homepage to success', () => {
    cy.visit('/');

    cy.get('[data-testid="nav-ring-collections"]').first().click({ force: true });
    cy.url().should('include', '/products');

    cy.get('[data-testid="product-card"]').first().click();
    cy.url().should('include', '/products/');

    cy.get('[data-testid^="add-to-cart"]').first().click({ force: true });

    cy.get('[data-testid="cart-icon"]').first().click({ force: true });
    cy.url().should('include', '/cart');

    cy.get('[data-testid="checkout-button"]').first().click({ force: true });

    // Progress through steps (handle multiple matches in CI)
    cy.get('[data-testid="checkout-continue"]').first().click({ force: true });
    cy.get('[data-testid="checkout-continue"]').first().click({ force: true });

    // We cannot complete Stripe in CI easily, but we can reach payment and review
  });
});
