describe ('Test App', () => {
    it ('launches', () => {
      cy.visit ('/');
    });

    it('sets the time to the minutes/seconds field when user clicks set time', () => {
        cy.visit ('/');
        cy.get('[data-cy=timeDisplayCy]').should('contain' ,'0:00');
        cy.get('[data-cy=timeFieldCy] input').should('have.value' ,'15:00');
        //cy.get('[data-cy=startButtonCy]').click();
        cy.get('[data-cy=setButtonCy]').click();
        cy.get('[data-cy=timeDisplayCy]').should('contain' ,'15:00');
    })

    //cy.get('[data-cy=timeFieldCy]').type("20:21");
});