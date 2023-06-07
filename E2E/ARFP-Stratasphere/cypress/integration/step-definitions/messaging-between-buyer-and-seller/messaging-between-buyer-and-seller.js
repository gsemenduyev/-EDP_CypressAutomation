/// <reference types="Cypress" />
/// <reference types="cypress-data-session" />
/// <reference types="cypress-xpath" />
import 'cypress-data-session';
import { Given } from "@badeball/cypress-cucumber-preprocessor";
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

const sellerMessage = 'Hi Buyer';
const buyerMessage = 'Hi Seller';

// Send a message from Seller to Buyer
Given('Send a message from Seller to Buyer', () => {
    sSphereProposalsPage.msgsButton().click({ force: true });
    sSphereProposalsPage.campaignMsgsModal().should('be.visible');
    sSphereProposalsPage.textarea('be.visible').type(sellerMessage);
    sSphereProposalsPage.msgsSendButton().click({ force: true });
    sSphereProposalsPage.sellerMsgsContent().should('have.text', sellerMessage);
})

// Validate message from Buyer
Given('Validate message from Buyer', () => {
    linearProposalRfpPage.actionsDropdown().click({ force: true });
    linearProposalRfpPage.msgAndAttachmentsOption().click();
    linearProposalRfpPage.sellerMsgContent().should('have.text', sellerMessage);
    linearProposalRfpPage.msgSidebarCloseButton().click();
}) 

// Send a message from Buyer to Seller
Given('Send a message from Buyer to Seller', () => {
    linearProposalRfpPage.actionsDropdown().click({ force: true });
    linearProposalRfpPage.msgAndAttachmentsOption().click();
    linearProposalRfpPage.textarea().type(buyerMessage)
    linearProposalRfpPage.sentMsgButton().click()
    linearProposalRfpPage.buyerMsgContent().should('have.text', buyerMessage);
    linearProposalRfpPage.msgSidebarCloseButton().click();
}) 

// Validate the message from Buyer
Given('Validate the message from Buyer', () => {
    sSphereProposalsPage.msgsButton().click({ force: true });
    sSphereProposalsPage.campaignMsgsModal().should('be.visible');
    sSphereProposalsPage.buyerMsgsContent().should('have.text', buyerMessage)
})