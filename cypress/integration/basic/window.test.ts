context('Window', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000', { timeout: 120000 });
    cy.wait(100); // eslint-disable-line cypress/no-unnecessary-waiting
  });

  it('get the global window object', () => {
    cy.window().should('have.property', 'top');
    cy.percySnapshot('Started App');
  });

  it('get the document object', () => {
    cy.document().should('have.property', 'charset').and('eq', 'UTF-8');
  });

  it('get the title', () => {
    cy.title().should('include', 'bits-to-atoms');
  });
});
