describe('Navigation', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('has a link to the blog page', () => {
    cy.get('nav').within(() => cy.get(`[title="Blog"]`).click())
    cy.location('pathname').should('eq', '/blog')
  })

  it('has a link to the files page', () => {
    cy.get('nav').within(() => cy.get(`[title="Files"]`).click())
    cy.location('pathname').should('eq', '/files')
  })

  it('has a link to GitHub', () => {
    cy.get('nav').within(() =>
      cy
        .get(`[title="GitHub"]`)
        .should('be.visible')
        .should('have.attr', 'href', 'https://github.com/DerYeger')
    )
  })

  it('has a link to XING', () => {
    cy.get('nav').within(() =>
      cy
        .get(`[title="XING"]`)
        .should('be.visible')
        .should(
          'have.attr',
          'href',
          'https://www.xing.com/profile/Jan_Mueller1092/cv'
        )
    )
  })
})
