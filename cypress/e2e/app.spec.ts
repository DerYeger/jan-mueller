describe('App', () => {
  it('respects the preferred color scheme', () => {
    cy.visit('/', {
      onBeforeLoad(win: Cypress.AUTWindow) {
        cy.stub(win, 'matchMedia')
          .withArgs('(prefers-color-scheme: dark)')
          .returns({
            matches: false,
            addListener: () => {},
          })
      },
    })
    cy.get('html.dark').should('not.exist')
  })

  it('has a theme toggle', () => {
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(1)
    cy.visit('/', {
      onBeforeLoad(win: Cypress.AUTWindow) {
        cy.stub(win, 'matchMedia')
          .withArgs('(prefers-color-scheme: dark)')
          .returns({
            matches: true,
            addListener: () => {},
          })
      },
    })
    cy.get('html.dark').should('exist')
    cy.get('button').should('be.visible').click()
    cy.get('html.dark').should('not.exist')
    cy.get('button').should('be.visible').click()
    cy.get('html.dark').should('exist')
  })
})
