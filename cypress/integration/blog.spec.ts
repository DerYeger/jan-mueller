context('Blog', () => {
  beforeEach(() => {
    cy.visit('/blog')
  })

  it('can navigate to a post', () => {
    cy.contains('Masonry layout').click()
    cy.location('pathname').should('eq', '/blog/vue-masonry-wall')
  })
})
