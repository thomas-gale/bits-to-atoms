context('Window', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('get the global window object', () => {
    cy.window().should('have.property', 'top');
    // Take a snapshot for visual diffing
    cy.percySnapshot();
  });

  it('get the document object', () => {
    cy.document().should('have.property', 'charset').and('eq', 'UTF-8');
  });

  it('get the title', () => {
    cy.title().should('include', 'bits-to-atoms');
  });
});
