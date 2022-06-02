describe('About', () => {
  before(() => {
    cy.visit('/about')
  })

  it('has a German section', () => {
    cy.contains('Impressum').should('be.visible')
    cy.contains('Datenschutzerklärung').should('be.visible')
  })

  it('has an English section', () => {
    cy.contains('Legal Notice').should('be.visible')
    cy.contains('Privacy policy').should('be.visible')
  })
})
