describe('Blog', () => {
  beforeEach(() => {
    cy.viewport('iphone-xr')
    cy.visit('/blog')
  })

  it('can navigate to a post', () => {
    cy.contains('Masonry layout').click({ force: true })
    cy.location('pathname').should('eq', '/blog/vue-masonry-wall')
  })

  it('shows the details of a blog post', () => {
    cy.contains('Masonry layout').parentsUntil('a').as('card')
    cy.get('@card').within(() => {
      cy.contains('Aug 16, 2021').should('be.visible')
      cy.contains('SSR support').should('be.visible')
    })
  })
})

export {}
