/// <reference types="Cypress" />
import { Given, attach } from "@badeball/cypress-cucumber-preprocessor";
import LinearProposalRfpPage from "../../../support/page-objects/agency-pages/LinearProposalRfpPage";

const linearProposalRfpPage = new LinearProposalRfpPage;
let exportProposalXmlParam
const FILE_NAME = 'stores/TEST Dallas RTG_IMP Dec2023.xml'
before(function () {
    cy.fixture('/agencyRFP/import-xml-prebuy-screen-param').then(function (data) {
        exportProposalXmlParam = data;
    })
})

// Import from prebuy screen and validate the response
Given('Import from prebuy screen and validate the response', () => {
    cy.upload_file(FILE_NAME, linearProposalRfpPage.importProposalXmlButton());
    linearProposalRfpPage.modalImportXmlButton().click();
    linearProposalRfpPage.proposalRows().should('have.length', 8);
    cy.screenshot();
});