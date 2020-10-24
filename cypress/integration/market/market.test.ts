context('Market', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000', { timeout: 60000 });
  });

  it('get the first build request summary', () => {
    cy.wait(100); // eslint-disable-line cypress/no-unnecessary-waiting
    cy.contains('Build Request');
  });

  it('bid on first build request summary', () => {
    // Act
    cy.wait(100); // eslint-disable-line cypress/no-unnecessary-waiting
    cy.contains('Build Request').parent().find('button').click();
  });
});
