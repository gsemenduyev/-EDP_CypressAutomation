/// <reference types="Cypress" />
/// <reference types="cypress-data-session" />
/// <reference types="cypress-iframe" />
import 'cypress-data-session';
import 'cypress-iframe';
import { Given } from "@badeball/cypress-cucumber-preprocessor";



Given('Create Radio estimate and Send to Eleven', () => {
    cy.sbms('createRadioEstimate')
    cy.copyAndDeleteFiles('C:\\CypressAutomation\\EDP_CypressAutomation\\E2E\\SBMS\\SBMS\\NameMapping\\Images\\',
        'C:\\CypressAutomation\\EDP_CypressAutomation\\E2E\\Eleven-Test\\cypress\\screenshots\\');
});

Given('Verify Radio estimate is created', () => {

});


Given('Login to Eleven', () => {

});
