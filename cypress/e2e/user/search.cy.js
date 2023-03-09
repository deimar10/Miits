describe('Check that the offers are filtered according to the search parameter', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('Searches for offers specific to the search-input', () => {
        cy.get('input[name=search]').type('GigaBang-Shooters');

        cy.get('.offers-grid-container').children('.grid-item').should('have.length', 1);

        cy.get('input[name=search]').clear();
        cy.get('input[name=search]').type('Le');

        cy.get('.offers-grid-container').children('.grid-item').should('have.length', 3);
    });
    
})