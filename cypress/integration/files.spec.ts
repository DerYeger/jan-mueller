context('Files', () => {
  beforeEach(() => {
    cy.visit('/files')
  })

  it('can navigate to a document', () => {
    cy.contains('Koffee documentation').click()
    cy.location('pathname').should('eq', '/files/documents/koffee')
  })

  it('can navigate to a model', () => {
    cy.contains('An-26').click()
    cy.location('pathname').should('eq', '/files/models/an-26')
  })
})
