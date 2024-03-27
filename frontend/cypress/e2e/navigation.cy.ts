
describe('Navigation', () => {
    it('should navigate back and forth between pages', () => {

        cy.visit('http://localhost:4200/');

        cy.get('[data-testid=sign-up]').click();

        cy.location('pathname').should('equal', '/registration');

        cy.get('[data-testid=employer-registration]').click();

        cy.location('pathname').should('equal', '/employer-registration');

        cy.go('back');

        cy.location('pathname').should('equal', '/registration');

        cy.get('[data-testid=talent-registration]').click();

        cy.location('pathname').should('equal', '/talent-registration')

        cy.go('back');

        cy.go('back')

        cy.location('pathname').should('equal', '/')

        cy.get('[data-testid=jobs]').click();

        cy.location('pathname').should('equal', '/jobs')

        // cy.get('[data-testid=jobInfo]').click({ multiple: true })

        // cy.location('pathname').should('equal', '/job-info')

        // cy.location('pathname').should('not.equal', '/job-info/:jobId')

        cy.go('back')

        cy.location('pathname').should('equal', '/')

        cy.get('[data-testid=talents]').click()

        cy.location('pathname').should('equal', '/talents')

        // cy.get('[data-testid=talentInfo]').should('exist').click({ multiple: true })

        // cy.location('pathname').should('match', /^\/talent-profile\/[a-zA-Z0-9-]+$/);

        // cy.location('pathname').should('equal', '/talent-profile')

        // cy.location('pathname').should('not.equal', 'talent-profile/:talentId')

        cy.go('back')

        cy.location('pathname').should('equal', '/')

        cy.get('[data-testid=employers]').click()

        cy.location('pathname').should('equal', '/employers')


    });
});