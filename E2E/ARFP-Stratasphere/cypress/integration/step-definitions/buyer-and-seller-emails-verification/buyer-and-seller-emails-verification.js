/// <reference types="Cypress" />
/// <reference types="cypress-data-session" />
import 'cypress-data-session'
import { Given } from "@badeball/cypress-cucumber-preprocessor";
import MailinatorHomePage from "../../../support/page-objects/mailinator-pages/MailinatorHomePage";

const mailinatorHomePage = new MailinatorHomePage;

// Validate email for New RFP Request
Given('Validate email for {string}', string => {
    cy.dataSession('newRfpName').then(newRfpName => {
        mailinatorHomePage.search_email(`${string} for `, newRfpName);
        mailinatorHomePage.publicMessageText(10000).should('include.text', `${string} for ${newRfpName}`).screenshot()
    })
})