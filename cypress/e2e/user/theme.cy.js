describe('Check that the theme switch works across pages', () => {

    it('Changes theme to darkmode from the homepage', () => {
        cy.visit('/');

        cy.get('[data-cy="dark"]').click();

        cy.get('body').should('have.css', 'background-color', 'rgb(22, 22, 22)');

        cy.get('.offers-grid-container').find('.grid-item').first().click();

        cy.get('body').should('have.css', 'background-color', 'rgb(22, 22, 22)');

        cy.get('[data-cy="favorites"]').click();

        cy.get('body').should('have.css', 'background-color', 'rgb(22, 22, 22)');
    });

})