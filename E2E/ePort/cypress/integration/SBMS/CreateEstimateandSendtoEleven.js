describe('Estimate Workflow', () => {
  it('Should create an estimate and send it to Eleven', () => {
    cy.exec('C:/FWA/SBMS/SBMS.exe/'); // Replace with the URL of SBMS Strata

    // Login to SBMS Strata using fixtures
    cy.fixture('login_credentials').then((credentials) => {
      cy.get('#username').type(credentials.username);
      cy.get('#password').type(credentials.password);
      cy.get('form').submit();
    });

    // Create an estimate
    cy.contains('Create Estimate').click();
    cy.get('#estimate-name').type('New Estimate');
    cy.get('#estimate-details').type('Estimate details...');
    cy.get('#save-estimate').click();

    // Send the estimate to Eleven
    cy.contains('Send to Eleven').click();
    cy.get('#eleven-email').type('eleven@example.com');
    cy.get('#send-to-eleven').click();

    // Assert that the estimate is sent successfully
    cy.contains('Estimate sent successfully').should('be.visible');
  });
});
