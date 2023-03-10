describe('Check that offers can be marked as favorite', () => {

    it('Adds offer to favorites on the homepage', () => {
        cy.visit('/');

        cy.get('.offers-grid-container').find('.grid-item').first().find('[data-cy="unmarked"]').click();

        cy.get('[data-cy="favorites"]').click();

        cy.get('.favorites-grid-item').should('contain.text', 'Tänavune suurim üritus, kus Dj Matrix & Lulle astuvad taas kord Shoortersis lavale.');
    });

    it('Adds offer to favorites on the offer-details page', () => {
        cy.visit('/');

        cy.get('.offers-grid-container').find('.grid-item').first().click();

        cy.get('[data-cy="unmarked"]').click();

        cy.get('[data-cy="favorites"]').click();

        cy.get('.favorites-grid-item').should('contain.text', 'Tänavune suurim üritus, kus Dj Matrix & Lulle astuvad taas kord Shoortersis lavale.');
    });

})

describe('Check that offers marked as favorite can be removed from favorites', () => {

    it('Adds offer to favorites on the homepage & then removes it', () => {
        cy.visit('/');

        cy.get('.offers-grid-container').find('.grid-item').first().find('[data-cy="unmarked"]').click();

        cy.get('[data-cy="favorites"]').click();

        cy.get('.favorites-grid-item').should('contain.text', 'Tänavune suurim üritus, kus Dj Matrix & Lulle astuvad taas kord Shoortersis lavale.');

        cy.get('button').should('contain.text', 'Eemalda').click();

        cy.get('.favorites-grid-item').should('not.exist');
    });

})