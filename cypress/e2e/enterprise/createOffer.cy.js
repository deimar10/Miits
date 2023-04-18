describe('Check that enterprise can create new offers', () => {
    beforeEach(() => {
        cy.visit('/enterprise/login');
    });

    it('Creates a new offer & checks if action modal is displayed', () => {
        cy.get('input[name=username]').type('KolmTilli');

        cy.get('input[name=password]').type('Lollakas312456');

        cy.get('#login').click();

        cy.get('[data-cy="nav-to-create-offer"]').click();

        cy.wait(1000);

        cy.get('input[name=title]').type('Weekend');

        cy.get('input[name=location]').type('Pärnu');

        cy.get('textarea[name=description]').type('Metsik festival suve pealinnas!');

        cy.get('input[name=date]').type('04.16.2023');

        cy.get('input[name=price]').clear().type('10.00');

        cy.get('[data-cy="category"]').click();

        cy.contains('Drinks').click();

        cy.get('[data-cy="image"]').attachFile('illustration.jpg');
        
        cy.get('#create-submit').click();

        cy.get('[data-cy="action-description"]').should('contain.text', 'Pakkumine (371) edukalt loodud');

        cy.get('[data-cy="nav-to-offers"]').click();

        cy.get('[data-cy="offer-title"]').should('contain.text', 'Weekend');
    });

})