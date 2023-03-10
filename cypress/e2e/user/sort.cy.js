describe('Check that the offers can be sorted accordingly', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('Sorts offers by date', () => {
        cy.get('[data-cy="date"]').click();

        cy.get('.offers-grid-container').find('.grid-item').first().should('contain.text', 'GigaBang-Shooters');

        cy.get('.offers-grid-container').find('.grid-item').last().should('contain.text', 'Beer-n-Bugs');
    });

    it('Sorts offers by price', () => {
        cy.get('[data-cy="price"]').click();

        cy.get('.offers-grid-container').find('.grid-item').first().should('contain.text', 'Beer-n-Bugs');

        cy.get('.offers-grid-container').find('.grid-item').last().should('contain.text', 'Turn-it-up');
    });

})