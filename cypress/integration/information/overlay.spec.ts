context('Factory', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('view information overview', () => {
    cy.get('[aria-label="info"]').click();
    cy.get('[id="InformationOverlay"]');
  });

  it('dismiss information overview', () => {
    cy.get('[aria-label="info"]').click();
    cy.get('[id="InformationOverlay"]').click('left');
    cy.get('canvas').click();
  });
});
