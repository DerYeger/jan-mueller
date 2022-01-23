context('Footer', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('has a link to the about page', () => {
    cy.contains('About / Impressum').click()
    cy.location('pathname').should('eq', '/about')
  })
})
