/// <reference types="Cypress" />
/// <reference types="cypress-data-session" />
import 'cypress-data-session'
import { Given } from "@badeball/cypress-cucumber-preprocessor";
import MailinatorHomePage from "../../../support/page-objects/mailinator-pages/MailinatorHomePage";
import GmailBodyPage from "../../../support/page-objects/gmail-pages/GmailBodyPage";
import EnvUtils from "../../../support/utils/EnvUtils";

const mailinatorHomePage = new MailinatorHomePage;
const gmailBodyPage = new GmailBodyPage;
const envUtils = new EnvUtils;

let newRfpParam;

before(function () {
    cy.fixture('/agencyRFP/new-rfp-param').then(function (data) {
        newRfpParam = data;
    })
})

// Validate email for New RFP Request
Given('Validate {string} email for {string}', (buyerSeller, string) => {
    cy.dataSession('newRfpName').then(newRfpName => {
        if (envUtils.getSsphereUsername().endsWith('mailinator.com')) {
            mailinatorHomePage.search_email(`${string} for `, newRfpName);
            if (buyerSeller === 'buyer') {
                mailinatorHomePage.buyerEmailBody().should('include.text', `${envUtils.getSsphereUsername()}.`)
            } else if (buyerSeller === 'seller') {
                mailinatorHomePage.sellerEmailBody().should('contain', envUtils.getAgencyUsername())
            }
        } else if (envUtils.getSsphereUsername().endsWith('gmail.com')) {
            if (buyerSeller === 'buyer') {
                cy.txt_file_to_html(
                    Cypress.env('GMAIL_TXT_PATH'),
                    Cypress.env('GMAIL_HTML_UPDATED_PATH')
                );
                cy.visit(Cypress.env('GMAIL_HTML_UPDATED_PATH'));
                cy.readFile(Cypress.env('GMAIL_TXT_PATH'))
                    .then(($content) => {
                        expect($content).to.contain(`Dear ${envUtils.getAgencyUsername().split(".")[0]} ${envUtils.getAgencyUsername().split(".")[1].split("@")[0]},`);
                        expect($content).to.contain(
                            `You have received a new RFP Response for ${newRfpName} from ${envUtils.getSsphereUsername().split(".")[0]} ${envUtils.getSsphereUsername().split(".")[1].split("@")[0]} at ${newRfpParam.vendor}.`);
                        expect($content).to.contain(`Please send questions regarding this notification to ${envUtils.getSsphereUsername()}.`);
                    });
            } else if (buyerSeller === 'seller') {
                cy.visit(Cypress.env('GMAIL_HTML_PATH'))
                gmailBodyPage.gmailHeader().should('contain.text', `Dear ${envUtils.getSsphereUsername().split(".")[0].replace(/^./, (match) => match.toUpperCase())} ${envUtils.getSsphereUsername().split(".")[1].split("@")[0]},`);
                gmailBodyPage.buyer().should('contain.text', envUtils.getAgencyUsername().split(".")[0] + ' ' + envUtils.getAgencyUsername().split(".")[1].split("@")[0]);
                gmailBodyPage.salesperson().should('have.text', envUtils.getSsphereUsername());
            };
        };
    });
    cy.screenshot();
})