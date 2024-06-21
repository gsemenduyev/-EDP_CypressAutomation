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
    cy.visit('https://eportqa.pregotostrata.com/')
    cy.get("[src='Login_New.aspx']")
        .its('0.contentDocument')
        .then(cy.wrap)
        .find('#tbUsername').type('hello')
});