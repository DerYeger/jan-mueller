describe('Home', () => {
  before(() => {
    cy.visit('/')
  })

  it('has an avatar', () => {
    cy.get('.avatar').should('be.visible')
  })

  it('shows badges', () => {
    cy.contains('Languages').should('be.visible')
    cy.contains('Frameworks & Libraries').should('be.visible')
    cy.contains('Tools & Databases').should('be.visible')
  })

  it('shows projects', () => {
    cy.contains('Projects')
      .parent()
      .within(() => {
        cy.get('[title="Apollo"]').should('be.visible')
        cy.get('[title="d3-graph-controller"]').should('be.visible')
        cy.get('[title="Vecti"]').should('be.visible')
        cy.contains('And more')
          .should('be.visible')
          .should(
            'have.attr',
            'href',
            'https://github.com/DerYeger?tab=repositories'
          )
      })
  })

  it('shows experience', () => {
    cy.contains('Experience')
      .parent()
      .within(() => {
        cy.contains('Yatta Solutions GmbH')
          .should('be.visible')
          .parentsUntil('li')
          .within(() => {
            cy.contains('Software Engineer (Internship)').should('be.visible')
            cy.contains('Nov 2020 – Dec 2020').should('be.visible')
          })
        cy.get('ul').find('li').its('length').should('eq', 6)
      })
  })

  it('shows education', () => {
    cy.contains('Education')
      .parent()
      .within(() => {
        cy.contains('Computer Science (B.Sc.)')
          .should('be.visible')
          .parentsUntil('li')
          .within(() => {
            cy.contains('University of Kassel').should('be.visible')
            cy.contains('Oct 2016 – Mar 2021').should('be.visible')
          })
        cy.get('ul').find('li').its('length').should('eq', 3)
      })
  })

  it('shows awards', () => {
    cy.contains('Awards')
      .parent()
      .within(() => {
        cy.contains('DPG-Abiturpreis')
          .should('be.visible')
          .parentsUntil('li')
          .within(() => {
            cy.contains('Details')
              .should('be.visible')
              .should('have.attr', 'href')
            cy.contains('Jul 2016').should('be.visible')
          })
        cy.get('ul').find('li').its('length').should('eq', 3)
      })
  })
})
