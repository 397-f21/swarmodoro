describe ('Will Test App', () => {
    it ('launches', () => {
      cy.visit ('/');
    });

    it('user presses "start", button changes to "pause". user presses "pause", button changes to "resume".', () => {
        cy.visit ('/');
        cy.get('[data-cy=startBtn-cy]').click();
        cy.get('[data-cy=pauseBtn-cy]').should("contain", "Pause")
        cy.get('[data-cy=pauseBtn-cy]').click();
        cy.get('[data-cy=resumeBtn-cy]').should("contain", "Resume")

    })
});