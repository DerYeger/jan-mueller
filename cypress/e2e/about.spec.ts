describe('About', () => {
  it('has an impressum', () => {
    cy.visit('/impressum')
    cy.contains('Impressum').scrollIntoView().should('be.visible')
  })

  it('has a Datenschutzerklärung', () => {
    cy.visit('/datenschutzerklaerung')
    cy.contains('Datenschutzerklärung').scrollIntoView().should('be.visible')
  })

  it('has a legal notice', () => {
    cy.visit('/legal-notice')
    cy.contains('Legal Notice').scrollIntoView().should('be.visible')
    cy.contains('Privacy Policy').scrollIntoView().should('be.visible')
  })
})

export {}
