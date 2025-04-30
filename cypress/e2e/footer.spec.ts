describe('Footer', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('has a link to the about page', () => {
    cy.get('footer').within(() => cy.contains('Legal Notice').click())
    cy.location('pathname').should('eq', '/legal-notice/')
  })

  it('has a link to the Impressum', () => {
    cy.get('footer').within(() => cy.contains('Impressum').click())
    cy.location('pathname').should('eq', '/impressum/')
  })

  it('has a link to the source', () => {
    cy.get('footer').within(() => {
      cy.contains('Source').scrollIntoView()
      cy.contains('Source')
        .should('be.visible')
        .should('have.attr', 'href', 'https://github.com/DerYeger/jan-mueller')
    })
  })

  it('has a copyright notice', () => {
    cy.get('footer').within(() => {
      cy.contains(`${new Date().getFullYear()} © Jan Müller`).scrollIntoView()
      cy.contains(`${new Date().getFullYear()} © Jan Müller`).should(
        'be.visible',
      )
    })
  })
})

export {}
