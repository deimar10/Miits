describe('Check that enterprise offers can be deleted from the table', () => {
    beforeEach(() => {
        cy.visit('/enterprise/login');
    });

    it('Deletes an offer from the table after confirmation & checks if action modal is displayed', () => {
        cy.get('input[name=username]').type('KolmTilli');

        cy.get('input[name=password]').type('Lollakas312456');

        cy.get('#login').click();

        cy.get('[data-cy="nav-to-offers"]').click();

        cy.get('#offer-delete').click();

        cy.get('#delete-submit').should('have.text', 'Kustuta').click();

        cy.get('[data-cy="offer-title"]').should('not.exist');

        cy.get('[data-cy="action-description"]').should('contain.text', 'Pakkumine (120) edukalt eemaldatud');
    });

})