describe('About', () => {
  it('has an impressum', () => {
    cy.visit('/impressum')
    cy.contains('Impressum').scrollIntoView()
    cy.contains('Impressum').should('be.visible')
  })

  it('has a legal notice', () => {
    cy.visit('/legal-notice')
    cy.contains('Legal Notice').scrollIntoView()
    cy.contains('Legal Notice').should('be.visible')
  })
})

export {}
