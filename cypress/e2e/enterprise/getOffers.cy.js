describe('Check that enterprise offers are displayed', () => {
    beforeEach(() => {
        cy.visit('/enterprise/login');
    });

    it('Checks that enterprise offers are displayed in a table', () => {
        cy.get('input[name=username]').type('KolmTilli');

        cy.get('input[name=password]').type('Lollakas312456');

        cy.get('#login').click();
        
        cy.get('[data-cy="nav-to-offers"]').click();

        cy.url().should('eq', 'http://localhost:3000/enterprise/management/KolmTilli');

        cy.get('[data-cy="offer"]').should('have.length', 4);
    });

})