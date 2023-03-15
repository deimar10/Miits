describe('Check that the theme switch works across pages', () => {
    beforeEach(() => {
        cy.visit('/enterprise/login');
    });

    it('Changes theme to darkmode from the homepage', () => {
        cy.get('input[name=username]').type('KolmTilli');

        cy.get('input[name=password]').type('Lollakas312456');

        cy.get('#login').click();
        
        cy.get('#theme').click();

        cy.get('body').should('have.css', 'background-color', 'rgb(22, 22, 22)');

        cy.get('[data-cy="nav-to-offers"]').click();

        cy.get('body').should('have.css', 'background-color', 'rgb(22, 22, 22)');

        cy.get('[data-cy="nav-to-create-offer"]').click();

        cy.get('body').should('have.css', 'background-color', 'rgb(22, 22, 22)');
    });

})