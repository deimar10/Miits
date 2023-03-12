describe('Check that correct offer info is displayed on the offer-details page', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('Cheks if correct info is displayed about a selected offer', () => {
        cy.get('.offers-grid-container').find('.grid-item').first().click();

        cy.get('[data-cy="title"]').should('contain.text', 'GigaBang-Shooters');

        cy.get('[data-cy="category"]').should('contain.text', 'Event');

        cy.get('[data-cy="location"]').should('contain.text', 'Tartu');

        cy.get('[data-cy="description"]').should('contain.text', 'Tänavune suurim üritus, kus Dj Matrix & Lulle astuvad taas kord Shoortersis lavale.');

        cy.get('[data-cy="price"]').should('contain.text', '35€');
    });

})

describe('Check that offer-details page can be accessed from favorites', () => {
   
    it('Navigates to detailed view from favorites', () => {
        cy.visit('/');

        cy.get('.offers-grid-container').find('.grid-item').first().find('[data-cy="unmarked"]').click();

        cy.get('[data-cy="favorites"]').click();
        
        cy.get('#read-more').click();

        cy.get('[data-cy="title"]').should('contain.text', 'GigaBang-Shooters');
    });

})