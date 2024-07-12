/// <reference types="cypress" />
/// <reference types="cypress-iframe" />
import 'cypress-iframe';
import { Given } from "@badeball/cypress-cucumber-preprocessor";

import EnvUtils from "../../../support/utils/EnvUtils";
const envUtils = new EnvUtils;
Given('Launch SBMS', () => {
    cy.sbms('SendNewTvEstimateToEleven')
    cy.log("HELLOLOLO - " + Cypress.env('ESTIMATE'))
});