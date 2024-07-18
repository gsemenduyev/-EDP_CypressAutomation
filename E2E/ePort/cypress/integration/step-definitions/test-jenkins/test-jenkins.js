/// <reference types="cypress" />
/// <reference types="cypress-iframe" />

import 'cypress-iframe';
import { Given } from "@badeball/cypress-cucumber-preprocessor";

Given('Visit to ePort', () => {
    cy.visit('https://11qa.pregotostrata.com/11Orders/')
    cy.screenshot();
});

Given('Launch SBMS', () => {
    cy.sbms('SendNewTvEstimateToEleven');
});