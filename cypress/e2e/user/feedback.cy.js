describe('Check that user can give feedback', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('Checks that feedback is created', () => {
        cy.get('.offers-grid-container').find('.grid-item').first().click();

        cy.get('input[name=name]').type('Deimar');

        cy.get('input[name=comment]').type('Jyrks on bossman');

        cy.get('#form-submit').click();

        cy.get('[data-cy="comment"]').should('contain.text', 'Jyrks on bossman');
    });

    it('Checks that user is given an error message when the name field is left empty', () => {
        cy.get('.offers-grid-container').find('.grid-item').first().click();

        cy.get('input[name=comment]').type('Jyrks on bossman');

        cy.get('#form-submit').click();

        cy.get('[data-cy="name-error"]').should('contain.text', 'Nimi peab olema lisatud!');

    });

})
