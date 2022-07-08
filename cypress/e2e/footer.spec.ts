describe('Footer', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('has a link to the about page', () => {
    cy.get('footer').within(() => cy.contains('About / Impressum').click())
    cy.location('pathname').should('eq', '/about')
  })

  it('has a link to the source', () => {
    cy.get('footer').within(() =>
      cy
        .contains('Source')
        .scrollIntoView()
        .should('be.visible')
        .should('have.attr', 'href', 'https://github.com/DerYeger/jan-mueller')
    )
  })

  it('has a copyright notice', () => {
    cy.get('footer').within(() =>
      cy
        .contains(`2021 - ${new Date().getFullYear()} © Jan Müller`)
        .scrollIntoView()
        .should('be.visible')
    )
  })
})
