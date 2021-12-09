describe ('Will Test App', () => {
    it ('launches', () => {
      cy.visit ('/');
    });

    it('user types name into name bar and clicks go, and their name is added to the team.', () => {
        cy.visit ('/');
        cy.get('[data-cy=nameBar-cy]').click().type('Will\n');
        cy.get('[data-cy=goButton-cy]').click();
        cy.should('include', 'Will')
    })
});