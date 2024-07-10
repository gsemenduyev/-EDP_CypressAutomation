/// <reference types="cypress" />
/// <reference types="cypress-iframe" />
import 'cypress-iframe';
import { Given } from "@badeball/cypress-cucumber-preprocessor";

Given('Launch SBMS', () => {
    cy.sbms('OpenSBMS')
});