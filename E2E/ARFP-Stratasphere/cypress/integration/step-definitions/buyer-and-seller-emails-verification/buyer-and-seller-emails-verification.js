/// <reference types="Cypress" />
/// <reference types="cypress-data-session" />
import 'cypress-data-session'
import { Given } from "@badeball/cypress-cucumber-preprocessor";
import MailinatorHomePage from "../../../support/page-objects/mailinator-pages/MailinatorHomePage";
import EnvUtils from "../../../support/utils/EnvUtils";

const mailinatorHomePage = new MailinatorHomePage;
const envUtils = new EnvUtils;

// Validate email for New RFP Request
Given('Validate {string} email for {string}', (buyerSeller, string) => {
    cy.dataSession('newRfpName').then(newRfpName => {
        mailinatorHomePage.search_email(`${string} for `, newRfpName);
        if (buyerSeller === 'buyer') {
            mailinatorHomePage.buyerEmailBody().should('include.text', `${envUtils.getSsphereUsername()}.`)
        } else if (buyerSeller === 'seller') {
            mailinatorHomePage.sellerEmailBody().should('contain', envUtils.getAgencyUsername())
        }
    })
    cy.screenshot();
})