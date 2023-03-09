describe('Check that Offers are appearing in the grid', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('Checks the number of offers', () => {
        cy.get('.offers-grid-container').children('.grid-item').should('have.length', 9);
    });

    it('Checks for a specific offer', () => {
        cy.get('.grid-item').should('contain.text', 'LevelUp');
    });

})