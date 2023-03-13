describe('Check that enterprise can register a new account', () => {
    beforeEach(() => {
        cy.visit('/enterprise/register');
    });

    it('Checks that enterprise is redirected to login after successful register', () => {
        cy.get('input[name=username]').type('Maasikas');

        cy.get('input[name=password]').type('Lollakas!123');

        cy.get('input[name=password_repeat]').type('Lollakas!123');

        cy.get('#register').click();

        cy.url().should('eq', 'http://localhost:3000/enterprise/login');
    });

    it('Checks that register validation errors appear', () => {
        cy.get('input[name=username]').type('Maasikas');

        cy.get('input[name=password]').type('Lollakas!123');

        cy.get('input[name=password_repeat]').type('Lollakas');

        cy.get('#register').click();

        cy.get('[data-cy="password_repeat"]').should('contain.text', 'Paroolid peavad ühtima');
    });

})