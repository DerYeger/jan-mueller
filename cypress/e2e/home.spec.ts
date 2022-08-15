describe('Home', () => {
  before(() => {
    cy.visit('/')
  })

  it('has an avatar', () => {
    cy.get('.avatar').scrollIntoView().should('be.visible')
  })

  it('shows badges', () => {
    cy.contains('Languages').scrollIntoView().should('be.visible')
    cy.contains('Frameworks & Libraries').scrollIntoView().should('be.visible')
    cy.contains('Tools & Databases').scrollIntoView().should('be.visible')
  })

  it('shows projects', () => {
    cy.contains('Projects')
      .parent()
      .within(() => {
        cy.get('[title="Apollo"]').scrollIntoView().should('be.visible')
        cy.get('[title="d3-graph-controller"]')
          .scrollIntoView()
          .should('be.visible')
        cy.get('[title="Vecti"]').scrollIntoView().should('be.visible')
        cy.contains('And more')
          .scrollIntoView()
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
      .parent()
      .within(() => {
        cy.contains('Yatta Solutions GmbH')
          .scrollIntoView()
          .should('be.visible')
          .parentsUntil('li')
          .within(() => {
            cy.contains('Software Engineer (Internship)').should('be.visible')
            cy.contains('Nov 2020').should('be.visible')
            cy.contains('Dec 2020').should('be.visible')
          })
        cy.get('ul').find('li').its('length').should('eq', 6)
      })
  })

  it('shows education', () => {
    cy.contains('Education')
      .parent()
      .parent()
      .within(() => {
        cy.contains('Computer Science (B.Sc.)')
          .scrollIntoView()
          .should('be.visible')
          .parentsUntil('li')
          .within(() => {
            cy.contains('University of Kassel').should('be.visible')
            cy.contains('Oct 2016').should('be.visible')
            cy.contains('Mar 2021').should('be.visible')
          })
        cy.get('ul').find('li').its('length').should('eq', 3)
      })
  })

  it('shows awards', () => {
    cy.contains('Awards')
      .parent()
      .parent()
      .within(() => {
        cy.contains('DPG-Abiturpreis')
          .scrollIntoView()
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
