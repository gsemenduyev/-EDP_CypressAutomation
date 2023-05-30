describe('Eleven Workflow', () => {
  it('Should send an estimate from Eleven to ePort Strata', () => {
    // Login to Eleven using fixtures
    cy.fixture('eleven_login_credentials').then((elevenCredentials) => {
      cy.visit('https://eleven.example.com/login');
      cy.get('#username').type(elevenCredentials.username);
      cy.get('#password').type(elevenCredentials.password);
      cy.get('form').submit();
    });

    // Send an estimate from Eleven to ePort Strata
    cy.contains('Send Estimate').click();
    cy.get('#estimate-id').type('12345'); // Replace with the actual estimate ID
    cy.get('#eport-strata-email').type('eport@example.com'); // Replace with the ePort Strata email address
    cy.get('#send-estimate').click();

    // Assert that the estimate is sent successfully
    cy.contains('Estimate sent successfully').should('be.visible');
  });
});