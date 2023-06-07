/// <reference types="Cypress" />
/// <reference types="cypress-data-session" />
/// <reference types="cypress-iframe" />
import 'cypress-data-session'
import 'cypress-iframe'
import { Given } from "@badeball/cypress-cucumber-preprocessor";
import { recurse } from 'cypress-recurse';
import AgencyLoginPage from '../../../support/page-objects/agency-pages/AgencyLoginPage';
import AgencyBasePage from '../../../support/page-objects/agency-pages/AgencyBasePage';
import CreateRFPPage from "../../../support/page-objects/agency-pages/CreateRFPPage";
import RfpDetailsPage from "../../../support/page-objects/agency-pages/RfpDetailsPage";
import SSphereLoginPage from "../../../support/page-objects/ssphere-pages/SSphereLoginPage";
import SSphereProposalsPage from "../../../support/page-objects/ssphere-pages/SSphereProposalsPage";
import SSphereBasePage from "../../../support/page-objects/ssphere-pages/SSphereBasePage";
import SSphereHomePage from "../../../support/page-objects/ssphere-pages/SSphereHomePage";
import SearchRfpPage from "../../../support/page-objects/agency-pages/SearchRfpPage";
import LinearProposalRfpPage from "../../../support/page-objects/agency-pages/LinearProposalRfpPage";
import MailinatorHomePage from "../../../support/page-objects/mailinator-pages/MailinatorHomePage";
import SSphereProposalResponsePage from "../../../support/page-objects/ssphere-pages/SSphereProposalResponsePage";

const agencyLoginPage = new AgencyLoginPage;
const agencyBasePage = new AgencyBasePage;
const createRfpPage = new CreateRFPPage;
const sSphereLoginPage = new SSphereLoginPage;
const sSphereProposalsPage = new SSphereProposalsPage;
const sSphereBasePage = new SSphereBasePage;
const sSphereHomePage = new SSphereHomePage;
const linearProposalRfpPage = new LinearProposalRfpPage;
const mailinatorHomePage = new MailinatorHomePage;
const sSphereProposalResponsePage = new SSphereProposalResponsePage;
const searchRfpPage = new SearchRfpPage;
const rfpDetailsPage = new RfpDetailsPage;

const SELLER_NEGOTIATION_RATE = '61'

let newRfpParam;
let xmlResponseParam;

before(function () {
    cy.fixture('/agencyRFP/new-rfp-param').then(function (data) {
        newRfpParam = data;
    })
    cy.fixture('/agencyRFP/xml-response-param').then(function (data) {
        xmlResponseParam = data;
    })
})

// Change My Rete and Negotiate the line with seller
Given('Change My Rete {string} and Negotiate the line with seller', myRate => {
    linearProposalRfpPage.selectLineCheckBox().first().check({ force: true });
    linearProposalRfpPage.myReteTexBox().type(myRate + '{enter}');
    linearProposalRfpPage.saveButton().click();
    cy.window().then(() => {
        linearProposalRfpPage.alertBox().should('have.text', 'Success! Your data has been saved.');
    });
    linearProposalRfpPage.myReteTexBoxValue().should('have.text', '$ ' + myRate);
    linearProposalRfpPage.selectLineCheckBox().first().check({ force: true });
    linearProposalRfpPage.negotiateButton().click({ force: true });
    linearProposalRfpPage.sendSelectedBuylinesModal().should('exist');
    linearProposalRfpPage.sendSelectedBuylinesModalTitle().should('have.text', 'Send Selected Buylines');
    linearProposalRfpPage.sendSelectedBuylinesModalMyRate(myRate).should('have.text', '$ ' + myRate);
    linearProposalRfpPage.sendButton().click();
    cy.window().then(() => {
        linearProposalRfpPage.alertBox().should('have.text', 'Negotiation successfully sent to ' + newRfpParam.vendor.substr(0, newRfpParam.vendor.indexOf('-')));
    });
});

// "Accept, Reject, Make Changes" negotiation from email and verify user landed on Stratasphere page
//Given('{string} negotiation from email and verify user landed on Stratasphere page', negotiate, {baseUrl: `${Cypress.env('agencyUrl')}`}, function() {
Given('{string} negotiation from email and verify user landed on Stratasphere page', negotiate => {
    cy.dataSession('newRfpName').then(newRfpName => {
        mailinatorHomePage.search_email('New Change Request for ', newRfpName)
    })
    mailinatorHomePage.negotiationLinks(negotiate).then(function (el) {
        const url = el.prop('href')
        mailinatorHomePage.deleteEmailButton().click();
        cy.visit(url);
        const sentArgs = { negotiate, sellerNegotiationRate: SELLER_NEGOTIATION_RATE }
        cy.origin(url, { args: sentArgs }, ({ negotiate, sellerNegotiationRate }) => {
            const tempPage = Cypress.require('../../../support/page-objects/ssphere-pages/SSphereBasePage')
            const sSphereBasePage = new tempPage;
            sSphereBasePage.pageTitle().should('include.text', 'Proposal Response ' + negotiate);
            if (negotiate === "Make Changes") {
                sSphereBasePage.myRateNegotiation().type(sellerNegotiationRate);
                sSphereBasePage.submitButton().click();
            }
            sSphereBasePage.negotiationMessage().should('include.text', 'Your response has been sent. Thanks for using Stratasphere!');
        })
    })
});

// Validate line changes were "accepted, rejected, " by the Seller
Given('Validate line changes were {string} by the Seller', negotiate => {
    if (negotiate === 'Make Changes') {
        linearProposalRfpPage.sellerRateTexBoxValue().should('include.text', SELLER_NEGOTIATION_RATE)
    } else {
        linearProposalRfpPage.actionsDropdown().click({ force: true });
        linearProposalRfpPage.msgAndAttachmentsOption().click();
        linearProposalRfpPage.lineChangesMsg().should('include.text', negotiate);
        linearProposalRfpPage.msgSidebarCloseButton().click();

        if (negotiate === 'accepted') {
            linearProposalRfpPage.myReteTexBoxValue().then(function (myRete) {
                linearProposalRfpPage.sellerRateTexBoxValue().should('include.text', myRete.text())
            })
        } else if (negotiate === 'rejected') {
            linearProposalRfpPage.myReteTexBoxValue().then(function (myRete) {
                linearProposalRfpPage.sellerRateTexBoxValue().should('not.eq', myRete.text())
            })
        }
    }
});