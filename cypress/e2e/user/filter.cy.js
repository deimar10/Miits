describe('Check that the offers can be filtered accordingly', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('Filters offers by category: events', () => {
        cy.get('[data-cy="events"]').click();

        cy.get('.offers-grid-container').children('.grid-item').should('have.length', 3);

        cy.get('.offers-grid-container').find('.grid-item').last().should('contain.text', 'Turn-it-up');

    });

    it('Filters offers by category: drinks', () => {
        cy.get('[data-cy="drinks"]').click();

        cy.get('.offers-grid-container').children('.grid-item').should('have.length', 6);

        cy.get('.offers-grid-container').find('.grid-item').last().should('contain.text', 'Cobra');
    });

    it('Filters offers by location: Tartu', () => {
        cy.get('[name="location"]').click();

        cy.get('[data-cy="Tartu"]').click();
        cy.get('.offers-grid-container').children('.grid-item').should('have.length', 5);
    });

    it('Filters offers by location: Pärnu', () => {
        cy.get('[name="location"]').click();

        cy.get('[data-cy="Pärnu"]').click();
        cy.get('.offers-grid-container').children('.grid-item').should('have.length', 2);
    });

    it('Filters offers by location: Tallinn', () => {
        cy.get('[name="location"]').click();

        cy.get('[data-cy="Tallinn"]').click();
        cy.get('.offers-grid-container').children('.grid-item').should('have.length', 2);
    });

})