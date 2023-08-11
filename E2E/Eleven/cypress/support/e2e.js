// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************
import "cypress-cucumber-attach-screenshots-to-failed-steps";
import './commands'
import '@shelex/cypress-allure-plugin';
import 'cypress-mochawesome-reporter/register';

// import failOnConsoleError from 'cypress-fail-on-console-error'
// failOnConsoleError();

module.exports = (on, config) => {
    on('file:preprocessor', cucumber()),
    require('cypress-mochawesome-reporter/plugin')(on);
    }