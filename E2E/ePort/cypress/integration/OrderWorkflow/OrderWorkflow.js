import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';

Given('I am logged in as an admin', () => {
  // Perform the login steps here
});

Given('I navigate to the orders page', () => {
  // Navigate to the orders page
});

When('I click on the {string} button', (buttonText) => {
  cy.contains(buttonText).click();
});

When('I fill in the order details', () => {
  // Fill in the order details steps here
});

When('I submit the order', () => {
  // Submit the order steps here
});

Then('the order should be created successfully', () => {
  // Assert that the order is created successfully
});

When('I search for an order by order number', () => {
  // Search for an order by order number steps here
});

When('I click on the order details', () => {
  // Click on the order details steps here
});

Then('the order should be approved', () => {
  // Assert that the order is approved
});

Then('the order should be rejected', () => {
  // Assert that the order is rejected
});