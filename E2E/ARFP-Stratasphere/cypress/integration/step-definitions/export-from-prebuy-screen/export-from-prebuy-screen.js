/// <reference types="Cypress" />
import { Given } from "@badeball/cypress-cucumber-preprocessor";
import LinearProposalRfpPage from "../../../support/page-objects/agency-pages/LinearProposalRfpPage";

const linearProposalRfpPage = new LinearProposalRfpPage;
const FILE_NAME = 'cypress/downloads/Chicago - TV.prx'
let exportProposalXmlParam

before(function () {
    if (Cypress.env('ENV') === 'Production') {
        cy.fixture('/agencyRFP/export-proposal-xml-expected-param-prod').then(function (data) {
            exportProposalXmlParam = data;
        });
    } else {
        cy.fixture('/agencyRFP/export-proposal-xml-expected-param-qa').then(function (data) {
            exportProposalXmlParam = data;
        });
    }
})

// Export from prebuy screen and validate XML file
Given('Export from prebuy screen and validate XML file', () => {
    linearProposalRfpPage.actionsDropdown().click({ force: true });
    linearProposalRfpPage.manageBuyerDataButton().click()
    linearProposalRfpPage.exportProposalXmlButton().click({ force: true });
    cy.readFile(FILE_NAME).then((file) => {
        exportProposalXmlParam.forEach(text => {
            if (file.includes(text)) {
                expect(true, 'Value \"' + text + '\" is included in file - "' + FILE_NAME + '"').to.equal(true);
            } else {
                expect(true, 'Value \"' + text + '\" is NOT included in file - "' + FILE_NAME + '"').to.not.equal(true);
            }
        })
    })
})