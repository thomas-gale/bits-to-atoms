context('Market', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('get the first build request summary', () => {
    cy.wait(100);
    cy.contains('Build Request');  
  });

  it('bid on first build request summary', () => {
    // Act
    cy.wait(100);
    cy.contains('Build Request').parent().find('button').click();  
  });

});
