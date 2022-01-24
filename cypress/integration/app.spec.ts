describe('App', () => {
  it('respects the preferred color scheme', () => {
    cy.visit('/', {
      onBeforeLoad(win: Cypress.AUTWindow) {
        cy.stub(win, 'matchMedia')
          .withArgs('(prefers-color-scheme: dark)')
          .returns({
            matches: false,
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            addListener: () => {},
          })
      },
    })
    cy.get('html.dark').should('not.exist')
  })

  it('has a theme toggle', () => {
    cy.visit('/', {
      onBeforeLoad(win: Cypress.AUTWindow) {
        cy.stub(win, 'matchMedia')
          .withArgs('(prefers-color-scheme: dark)')
          .returns({
            matches: true,
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            addListener: () => {},
          })
      },
    })
    cy.get('html.dark').should('exist')
    cy.get('nav').within(() =>
      cy.get(`[title="Toggle dark mode"]`).should('be.visible').click()
    )
    cy.get('html.dark').should('not.exist')
    cy.get('nav').within(() =>
      cy.get(`[title="Toggle dark mode"]`).should('be.visible').click()
    )
    cy.get('html.dark').should('exist')
  })
})
