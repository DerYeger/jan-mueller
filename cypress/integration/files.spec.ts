describe('Files', () => {
  beforeEach(() => {
    cy.viewport('iphone-xr')
    cy.visit('/files')
  })

  it('can navigate to a document', () => {
    cy.contains('Koffee documentation').click({ force: true })
    cy.location('pathname').should('eq', '/files/documents/koffee')
  })

  it('can navigate to a model', () => {
    cy.contains('An-26').click({ force: true })
    cy.location('pathname').should('eq', '/files/models/an-26')
  })

  it('has a single column on mobile', () => {
    cy.get('.masonry-wall')
      .find('.masonry-column')
      .its('length')
      .should('eq', 1)
  })

  it.skip('has multiple columns on desktop', () => {
    cy.viewport('macbook-16')
    cy.get('.masonry-wall')
      .find('.masonry-column')
      .its('length')
      .should('eq', 2)
  })

  describe('shows the details of a', () => {
    it('document', () => {
      cy.contains('Koffee documentation').parentsUntil('.card').as('card')
      cy.get('@card').within(() => {
        cy.contains('Oct 21, 2020').should('be.visible')
        cy.contains('German').should('be.visible')
        cy.contains('University project').should('be.visible')
      })
    })

    it('model', () => {
      cy.contains('An-26').parentsUntil('.card').as('card')
      cy.get('@card').within(() => {
        cy.contains('Oct 2020').should('be.visible')
        cy.contains('3D model').should('be.visible')
      })
    })
  })
})
