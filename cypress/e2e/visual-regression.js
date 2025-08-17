describe('Visual Regression', () => {
  it('homepage matches baseline', () => {
    cy.visit('/');
    // cy.percySnapshot('Homepage')
  });

  it('product page matches baseline', () => {
    cy.visit('/products/diamond-solitaire-ring');
    // cy.percySnapshot('Product Page')
  });

  it('cart matches baseline', () => {
    cy.visit('/cart');
    // cy.percySnapshot('Cart')
  });
});
