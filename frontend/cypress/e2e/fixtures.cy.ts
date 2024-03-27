// login

describe('working with fixture data to login', () => {
    
    it('iterates through login data and tries to login', () => {
        cy.visit('/login')

        cy.fixture('login.json').then((dataarray)=>{
            dataarray.forEach((data:{email: string, password: string})=>{
                cy.get('[data-cy="email"]').type(data.email)
                cy.get('[data-cy="password"]').type(data.password)

                if(data.email == 'wanguru@gmail.com'  && data.password == 'password123'){
                    cy.get('[data-cy="submit-login-btn"]').click().then(el=>{
                        cy.location('pathname').should('equal', '/')
                        cy.get('[data-testid=logout]').click()
                        cy.visit('/login')
                    })
                }
                else if (data.email == 'wanguru@gmail.com'  && data.password == 'notpassword123'){
                    cy.get('[data-cy="submit-login-btn"]').click().then(el=>{
                        // cy.get('[data-testid=login-error]').should('exist')
                    })
                }
            })
        })
    })
})