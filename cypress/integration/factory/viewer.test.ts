context('Factory', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000', { timeout: 120000 });
  });

  it('can click in center of factory view', () => {
    cy.get('canvas').click('center');
    cy.percySnapshot();
  });

  it('can orbit camera of factory view', () => {
    cy.get('canvas')
      .trigger('mousedown', { button: 0 })
      .trigger('mousemove', {
        clientX: 550,
        clientY: 250,
      })
      .trigger('mouseup', { force: true });
  });
});
