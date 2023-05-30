import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';

When('I visit the home page', () => {
  cy.visit('https://eport.gotostrata.com/');
});

Then('I should see the welcome message', () => {
  cy.contains('Welcome to ePort').should('be.visible');
});

When('I visit the contact page', () => {
  cy.visit('https://eport.gotostrata.com/contact.aspx');
});

Then('I should see the contact information', () => {
  cy.contains('Contact Information').should('be.visible');
});

When('I visit the about page', () => {
  cy.visit('https://eport.gotostrata.com/about.aspx');
});

Then('I should see the about information', () => {
  cy.contains('About Us').should('be.visible');
});

When('I visit the services page', () => {
  cy.visit('https://eport.gotostrata.com/services.aspx');
});

Then('I should see the available services', () => {
  cy.contains('Our Services').should('be.visible');
});
