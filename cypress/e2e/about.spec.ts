describe('About', () => {
  it('has a German section', () => {
    cy.visit('/impressum')
    cy.contains('Impressum').scrollIntoView().should('be.visible')
    cy.contains('Datenschutzerklärung').scrollIntoView().should('be.visible')
  })

  it('has an English section', () => {
    cy.visit('/about')
    cy.contains('Legal Notice').scrollIntoView().should('be.visible')
    cy.contains('Privacy policy').scrollIntoView().should('be.visible')
  })
})
