/// <reference types="Cypress" />
import { Given, attach } from "@badeball/cypress-cucumber-preprocessor";
import LinearProposalRfpPage from "../../../support/page-objects/agency-pages/LinearProposalRfpPage";
import AgencyBasePage from "../../../support/page-objects/agency-pages/AgencyBasePage";

const linearProposalRfpPage = new LinearProposalRfpPage;
const agencyBasePage = new AgencyBasePage;
let exportProposalXmlParam
const FILE_NAME = 'stores/TEST Dallas RTG_IMP Dec2023.xml'
before(function () {
    cy.fixture('/agencyRFP/import-xml-prebuy-screen-param').then(function (data) {
        exportProposalXmlParam = data;
    })
})

// Import from prebuy screen
Given('Import from prebuy screen', () => {
    cy.upload_file(FILE_NAME, linearProposalRfpPage.importProposalXmlButton());
    linearProposalRfpPage.modalImportXmlButton().click();
    agencyBasePage.alertBox().should('have.text', 'Success! We imported the buylines from the proposal xml.')
    agencyBasePage.alertBox().screenshot()
    linearProposalRfpPage.proposalRows().should('have.length', 8);
});