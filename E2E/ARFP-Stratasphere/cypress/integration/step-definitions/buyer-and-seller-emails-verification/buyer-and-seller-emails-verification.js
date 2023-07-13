/// <reference types="Cypress" />
/// <reference types="cypress-data-session" />
import 'cypress-data-session'
import { Given } from "@badeball/cypress-cucumber-preprocessor";
import MailinatorHomePage from "../../../support/page-objects/mailinator-pages/MailinatorHomePage";
import EnvUtils from "../../../support/utils/EnvUtils";

const mailinatorHomePage = new MailinatorHomePage;
const envUtils = new EnvUtils;

// Validate email for New RFP Request
Given('Validate email for {string}', string => {
    cy.dataSession('newRfpName').then(newRfpName => {
        mailinatorHomePage.search_email(`${string} for `, newRfpName);
        mailinatorHomePage.publicMessageText(10000).should('include.text', `${string} for ${newRfpName}`);
        mailinatorHomePage.emailHeader(1).invoke('text').then(user => {
            if (string === 'New RFP Request') {
                expect(user.trim()).to.equal(envUtils.getSsphereUsername().substr(0, envUtils.getSsphereUsername().indexOf('@')).toLowerCase());
            } else if (string === 'RFP Response Received') {
                expect(user.trim()).to.equal(envUtils.getAgencyUsername().substr(0, envUtils.getAgencyUsername().indexOf('@')).toLowerCase());
            }
        })
    })
    cy.screenshot();
})