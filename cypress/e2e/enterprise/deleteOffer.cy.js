describe('Check that enterprise offers can be deleted from the table', () => {
    beforeEach(() => {
        cy.visit('/enterprise/login');
    });

    it('Deletes an offer from the table & checks if action modal is displayed', () => {
        cy.get('input[name=username]').type('KolmTilli');

        cy.get('input[name=password]').type('Lollakas312456');

        cy.get('#login').click();

        cy.get('[data-cy="nav-to-offers"]').click();

        cy.get('#delete-icon').click();

        cy.get('[data-cy="offer-title"]').should('not.exist');

        cy.get('[data-cy="action-description"]').should('contain.text', 'Pakkumine (109) edukalt eemaldatud');
    });

})