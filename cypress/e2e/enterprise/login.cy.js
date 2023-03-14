describe('Check that enterprise can login with an existing account', () => {
    beforeEach(() => {
        cy.visit('/enterprise/login');
    });

    it('Checks that enterprise is redirected to menu after successful login', () => {
        cy.get('input[name=username]').type('KolmTilli');

        cy.get('input[name=password]').type('Lollakas312456');

        cy.get('#login').click();

        cy.get('[data-cy="login-info"]').should('contain.text', 'KolmTilli');

        cy.url().should('eq', 'http://localhost:3000/enterprise/menu');
    });

    it('Checks that register validation errors appear', () => {
        cy.get('input[name=username]').type('KolmTilli');

        cy.get('input[name=password]').type('Lollakas31245');

        cy.get('#login').click();

        cy.get('#password-error').should('contain.text', 'Paroolid ei ühti. Sissepääs keelatud.');
    });
    
})