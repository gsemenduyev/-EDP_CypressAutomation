/// <reference types="Cypress" />
/// <reference types="cypress-data-session" />
/// <reference types="cypress-iframe" />
import 'cypress-data-session';
import 'cypress-iframe';
import { Given } from "@badeball/cypress-cucumber-preprocessor";

let environmentsParam;

before(function () {
    cy.fixture('/environment/qa-param.json').then((data) => {
        environmentsParam = data;
    });
});

Given('Launch SBMS', () => {
    cy.sbms('OpenSBMS')
});

Given('Login to Eleven', () => {
    cy.visit(environmentsParam.elevenUrl)
    cy.title().should('eq', 'Eleven: Login')
    cy.screenshot();
});
