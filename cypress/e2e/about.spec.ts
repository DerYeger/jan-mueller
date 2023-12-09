describe('About', () => {
  it('has an impressum', () => {
    cy.visit('/impressum')
    cy.contains('Impressum').scrollIntoView()
    cy.contains('Impressum').should('be.visible')
  })

  it('has a Datenschutzerklärung', () => {
    cy.visit('/datenschutzerklaerung')
    cy.contains('Datenschutzerklärung').scrollIntoView()
    cy.contains('Datenschutzerklärung').should('be.visible')
  })

  it('has a legal notice', () => {
    cy.visit('/legal-notice')
    cy.contains('Legal Notice').scrollIntoView()
    cy.contains('Legal Notice').should('be.visible')
    cy.contains('Privacy Policy').scrollIntoView()
    cy.contains('Privacy Policy').should('be.visible')
  })
})

export {}
