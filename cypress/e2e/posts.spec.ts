describe('Posts', () => {
  before(() => {
    cy.visit('/blog/vue-masonry-wall')
  })

  it('shows the blog post', () => {
    cy.contains('Masonry layout').should('be.visible')
  })
})

export {}
