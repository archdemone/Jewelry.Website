describe('Checkout Flow', () => {
  it('adds product to cart and proceeds to checkout steps', () => {
    cy.visit('/products');
    cy.get('[data-testid="product-card"]').first().click();
    cy.get('[data-testid^="add-to-cart"]').first().click({ force: true });
    cy.get('[data-testid="cart-icon"]').first().click({ force: true });
    cy.url().should('include', '/cart');
    cy.get('[data-testid="checkout-button"]').first().click({ force: true });
    cy.url().should('include', '/checkout');
    cy.get('[data-testid="checkout-continue"]').first().click({ force: true });
    cy.get('[data-testid="checkout-continue"]').first().click({ force: true });
  });
});
