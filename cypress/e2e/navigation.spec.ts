describe('Navigation', () => {
  beforeEach(() => {
    cy.visit('/legal-notice')
  })

  it('has a link to the home page', () => {
    cy.get('nav').within(() => cy.contains('Home').click())
    cy.location('pathname').should('eq', '/')
  })

  it('has a link to the blog page', () => {
    cy.get('nav').within(() => cy.contains('Blog').click())
    cy.location('pathname').should('eq', '/blog')
  })

  it('has a link to the photography page', () => {
    cy.get('nav').within(() => cy.contains('Photography').click())
    cy.location('pathname').should('eq', '/photography')
  })
})

export {}
