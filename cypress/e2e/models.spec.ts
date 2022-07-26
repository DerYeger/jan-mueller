describe('Models', () => {
  before(() => {
    cy.visit('/files/models/an-26')
  })

  it('shows the title', () => {
    cy.contains('An-26').should('be.visible')
  })

  it.skip('loads the model viewer', () => {
    cy.get('.marmoset-viewer-host')
      .should('be.visible')
      .within(() => {
        cy.get('input')
          .click()
          .get('font')
          .within(() => cy.contains('Jan Mueller'))
      })
  })
})
