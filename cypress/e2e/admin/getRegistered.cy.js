describe('Check that admin can login to panel', () => {
    beforeEach(() => {
        cy.visit('/enterprise/login');
    });

    it('Checks that all registered accounts are displayed when logging in as admin', () => {
        cy.get('input[name=username]').type('Admin');

        cy.get('input[name=password]').type('Lollakas312456');

        cy.get('#login').click();

        cy.get('[data-cy="registered"]').should(($divs) => {
            const registeredDivs = $divs.filter('[data-cy="registered"]');

            expect(registeredDivs).to.have.lengthOf(8);
        });

        cy.url().should('eq', 'http://localhost:3000/admin');
    });

})