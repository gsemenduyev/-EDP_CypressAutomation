/// <reference types="Cypress" />
/// <reference types="cypress-data-session" />
/// <reference types="cypress-xpath" />
import 'cypress-data-session';
import { Given } from "@badeball/cypress-cucumber-preprocessor";
import SSphereProposalsPage from "../../../support/page-objects/ssphere-pages/SSphereProposalsPage";
import LinearProposalRfpPage from "../../../support/page-objects/agency-pages/LinearProposalRfpPage";

const sSphereProposalsPage = new SSphereProposalsPage;
const linearProposalRfpPage = new LinearProposalRfpPage;

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
    linearProposalRfpPage.textarea().type(buyerMessage);
    linearProposalRfpPage.sentMsgButton().click();
    linearProposalRfpPage.buyerMsgContent().should('have.text', buyerMessage);
    linearProposalRfpPage.msgSidebarCloseButton().click();
}) 

// Validate the message from Buyer
Given('Validate the message from Buyer', () => {
    sSphereProposalsPage.msgsButton().click({ force: true });
    sSphereProposalsPage.campaignMsgsModal().should('be.visible');
    sSphereProposalsPage.buyerMsgsContent().should('have.text', buyerMessage);
})