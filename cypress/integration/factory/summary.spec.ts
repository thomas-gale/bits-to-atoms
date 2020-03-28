context('Factory', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
    cy.wait(100); // eslint-disable-line cypress/no-unnecessary-waiting
    cy.contains('Build Request').parent().find('button').click();
  });

  it('switch to the factory overview', () => {
    cy.get('[aria-label="factory"]').click();
  });

  it('view factory overview active build request details', () => {
    cy.get('[aria-label="factory"]').click();
    cy.contains('Active Build Requests').parent().find('button').click();
  });
});
