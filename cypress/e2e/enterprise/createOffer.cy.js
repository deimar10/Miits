describe('Check that enterprise can create new offers', () => {
    beforeEach(() => {
        cy.visit('/enterprise/login');
    });

    it('Creates a new offer & checks if action modal is displayed', () => {
        cy.get('input[name=username]').type('KolmTilli');

        cy.get('input[name=password]').type('Lollakas312456');

        cy.get('#login').click();

        cy.get('[data-cy="nav-to-create-offer"]').click();

        cy.get('input[name=title]').type('Weekend');

        cy.get('input[name=location]').type('Pärnu');

        cy.get('input[name=date]').type('04.16.2023');

        cy.get('input[name=price]').type('50.00');

        cy.get('textarea[name=description]').type('Metsik festival suve pealinnas!');

        cy.get('select[name=category]').select('Drinks');

        cy.get('select[name=category]').select('Event');
        
        cy.get('[data-cy="image-upload"]').attachFile('illustration.jpg');
        
        cy.get('[data-cy="create-submit"]').click();

        cy.get('[data-cy="action-description"]').should('contain.text', 'Pakkumine (130) edukalt loodud');

        cy.get('[data-cy="nav-to-offers"]').click();

        cy.get('[data-cy="offer-title"]').should('contain.text', 'Weekend');
    });

    it('Checks that validation error appears', () => {
        cy.get('input[name=username]').type('KolmTilli');

        cy.get('input[name=password]').type('Lollakas312456');

        cy.get('#login').click();

        cy.get('[data-cy="nav-to-create-offer"]').click();

        cy.get('input[name=title]').type('Weekend');

        cy.get('[data-cy="create-submit"]').click();

        cy.get('#error-validate').should('contain.text', 'Palun täida pakkumise loomisel kõik väljad');
    });

})