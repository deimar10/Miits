describe('Check that enterprise offers can be updated', () => {
    beforeEach(() => {
        cy.visit('/enterprise/login');
    });

    it('Edits an enterprise offer & checks if action modal is displayed', () => {
        cy.get('input[name=username]').type('KolmTilli');

        cy.get('input[name=password]').type('Lollakas312456');

        cy.get('#login').click();

        cy.get('[data-cy="nav-to-offers"]').click();

        cy.get('[data-cy="371"]').click();

        cy.get('input[name=price]').clear().type('17.99');

        cy.get('#edit-submit').click();

        cy.get('[data-cy="action-description"]').should('contain.text', 'Pakkumine (371) edukalt muudetud');

        cy.get('[data-cy="nav-to-offers"]').click();

        cy.get('[data-cy="offer-price"]').should('contain.text', '17.99');
    });
    
})