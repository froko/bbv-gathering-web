describe('S.H.I.E.L.D. Members', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200');
  });

  it('should display product name', () => {
    cy.get('[data-cy=product]').should('contain', 'S.H.I.E.L.D.');
  });
});
