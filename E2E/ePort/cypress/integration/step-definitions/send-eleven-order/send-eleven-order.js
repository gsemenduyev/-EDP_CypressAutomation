/// <reference types="Cypress" />
/// <reference types="cypress-iframe" />
import 'cypress-data-session';
import 'cypress-iframe';
import { Given } from "@badeball/cypress-cucumber-preprocessor";
//import AgencyBasePage from '../../../support/page-objects/agency-pages/AgencyBasePage';

// const agencyBasePage = new AgencyBasePage;
// const VERSION = Cypress.env('VERSION')

// Validate Agency RFP version number
Given('Validate Agency RFP version number', () => {
    cy.visit('https://eportqa.pregotostrata.com/default.htm')
    cy.visit("https://eportqa.pregotostrata.com/Login_New.aspx")
    cy.get('#tbUsername').type('kchow')
    cy.get('#tbPassword').type('password1')
    cy.get('#bSubmit').click()
    cy.title().should('eq', 'ePort')
    // cy.get("[src='Login_New.aspx']")
    //     .its('0.contentDocument')
    //     .then(cy.wrap)
    //     .find('#tbUsername').type('kchow')

    // cy.get("[src='Login_New.aspx']")
    //     .its('0.contentDocument')
    //     .then(cy.wrap)
    //     .find('#tbPassword').type('password1')

    // cy.get("[src='Login_New.aspx']")
    //     .its('0.contentDocument')
    //     .then(cy.wrap)
    //     .find('#bSubmit').click()

    // cy.visit('https://eportqa.pregotostrata.com/main.aspx')
    // cy.get('#tbUsername').type('kchow')
    // cy.get('#tbPassword').type('password1')
    //     .type('password1').click()




    // cy.task('getRepositoryPath').then(($repositoryPath) => {
    //     cy.log('Current path:', `${$repositoryPath}\\SBMS\\Stores\\Files\\CypressEnvironmentSwitcher.txt`);
    //     cy.writeFile(`${$repositoryPath}\\SBMS\\Stores\\Files\\CypressEnvironmentSwitcher.txt`, 'hiiii')
    // });
});