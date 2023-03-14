describe('Check that enterprise can logout', () => {
    beforeEach(() => {
        cy.visit('/enterprise/login');
    });

    it('Checks that enterprise is redirected back to login page', () => {
        cy.get('input[name=username]').type('KolmTilli');

        cy.get('input[name=password]').type('Lollakas312456');

        cy.get('#login').click();

        cy.get('[data-cy="logout"]').click();

        cy.url().should('eq', 'http://localhost:3000/enterprise/login');
    });

})