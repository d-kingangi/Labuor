describe('It navigates', ()=>{
    it('should navigate back and forth', ()=>{
        cy.visit('http://localhost:4200/')
        cy.visit('.registration').click()

        cy.location('pathname').should('equal', '/registration')

        cy.visit('.employer-registration').click()

        cy.location('pathname').should('equal', '/employer-registration')
        
    })
})