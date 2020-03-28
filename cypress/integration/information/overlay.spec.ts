context('Factory', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('view information overview', () => {
    cy.get('[aria-label="info"]').click();
    cy.get('.MuiBox-root > .MuiTypography-root');
  });

  it('dismiss information overview', () => {
    cy.get('[aria-label="info"]').click();
    cy.get('.MuiBackdrop-root').click('left');
    cy.get('canvas').click();
  });
});
