describe('Check that offers count is displayed', () => {
    beforeEach(() => {
        cy.visit('/enterprise/login');
    });

    it('Checks that enterprise can see the number of total offers in the enteprise sidebar', () => {
        cy.get('input[name=username]').type('KolmTilli');

        cy.get('input[name=password]').type('Lollakas312456');

        cy.get('#login').click();

        cy.get('#offer-count').should('have.text', '4');
    });

})