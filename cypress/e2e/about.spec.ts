describe('About', () => {
  before(() => {
    cy.visit('/about')
  })

  it('has a German section', () => {
    cy.contains('Impressum').scrollIntoView().should('be.visible')
    cy.contains('Datenschutzerklärung').scrollIntoView().should('be.visible')
  })

  it('has an English section', () => {
    cy.contains('Legal Notice').scrollIntoView().should('be.visible')
    cy.contains('Privacy policy').scrollIntoView().should('be.visible')
  })
})
