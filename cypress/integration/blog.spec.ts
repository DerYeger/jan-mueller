context('Blog', () => {
  beforeEach(() => {
    cy.viewport('iphone-xr')
    cy.visit('/blog')
  })

  it('can navigate to a post', () => {
    cy.contains('Masonry layout').click()
    cy.location('pathname').should('eq', '/blog/vue-masonry-wall')
  })

  it('has a single column on mobile', () => {
    cy.get('.masonry-wall')
      .find('.masonry-column')
      .its('length')
      .should('eq', 1)
  })

  it('has multiple columns on desktop', () => {
    cy.viewport('macbook-16')
    cy.get('.masonry-wall')
      .find('.masonry-column')
      .its('length')
      .should('eq', 2)
  })

  it('shows the details of a blog post', () => {
    cy.contains('Masonry layout').parentsUntil('.card').as('card')
    cy.get('@card').within(() => {
      cy.contains('Aug 16, 2021').should('be.visible')
      cy.contains('English').should('be.visible')
      cy.contains('SSR support').should('be.visible')
    })
  })
})
