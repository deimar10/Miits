describe('Check that user is notified about expiring offers that are marked as favorite', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('Checks if details about an expiring offer appear in the notification modal', () => {
        cy.get('.offers-grid-container').find('.grid-item').eq(5).find('[data-cy="unmarked"]').click();

        cy.get('[data-cy="favorites"]').click();
        cy.visit('/');

        cy.get('.bell-icon').click();

        cy.get('#notification-title').should('contain.text', 'Beer-n-Bugs');
    });

})

describe('Check that user is notified when list of favorite expiring offers is empty', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('Checks if notifying text appears when there are no expiring offers', () => {
        cy.get('.bell-icon').click();

        cy.get('#expiring-empty').should('contain.text', 'Tundub, et sul ei ole pakkumisi, mis hakkab lähiajal lõppema.');
    });

})