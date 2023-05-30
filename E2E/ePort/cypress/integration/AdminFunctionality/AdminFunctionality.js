import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';

Given('I open the login page', () => {
  cy.visit('https://eport.gotostrata.com/login.aspx');
});

When('I enter the admin username and password', () => {
  cy.fixture('admin_credentials').then((admin) => {
    cy.get('#Username').type(admin.username);
    cy.get('#Password').type(admin.password);
  });
});

When('I click the login button', () => {
  cy.get('#LoginButton').click();
});

Then('I should be logged in as an admin', () => {
  cy.url().should('include', '/admin/dashboard');
  cy.contains('Welcome, Admin').should('be.visible');
});

Given('I am logged in as an admin', () => {
  // Perform the login steps here
});

When('I navigate to the user management page', () => {
  // Perform the navigation steps here
});

Then('the user management page should be displayed', () => {
  // Assert that the user management page is displayed
});

When('I click the {string} button', (buttonText) => {
  cy.contains(buttonText).click();
});

When('I fill in the user details', () => {
  // Fill in the user details steps here
});

Then('the user should be created successfully', () => {
  // Assert that the user is created successfully
});