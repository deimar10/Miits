describe('Check that enterprise can filter offers by status', () => {
    beforeEach(() => {
        cy.visit('/enterprise/login');
    });

    it('Checks that only upcoming offers are displayed after selecting the filter option', () => {
        cy.get('input[name=username]').type('KolmTilli');

        cy.get('input[name=password]').type('Lollakas312456');

        cy.get('#login').click();

        cy.get('[data-cy="nav-to-offers"]').click();

        cy.get('[data-cy="filter-option"]').click();

        cy.get('#filter-status').check();

        cy.get('[data-cy="offer"]').should(($divs) => {
            const offers = $divs.filter('[data-cy="offer"]');

            expect(offers).to.have.lengthOf(2);
        });
    });

})