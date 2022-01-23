context('Navigation', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('has a link to the blog page', () => {
    cy.get(`[title="Blog"]`).click()
    cy.location('pathname').should('eq', '/blog')
  })

  it('has a link to the files page', () => {
    cy.get(`[title="Files"]`).click()
    cy.location('pathname').should('eq', '/files')
  })
})
