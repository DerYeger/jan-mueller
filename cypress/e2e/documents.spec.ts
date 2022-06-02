describe('Documents', () => {
  before(() => {
    cy.visit('/files/documents/bachelor-thesis')
  })

  it('loads the document', () => {
    cy.get('embed').should('be.visible')
  })
})
