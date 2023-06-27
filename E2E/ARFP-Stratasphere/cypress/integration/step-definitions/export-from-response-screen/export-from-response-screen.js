/// <reference types="Cypress" />
import { Given, attach } from "@badeball/cypress-cucumber-preprocessor";
import RfpDetailsPage from "../../../support/page-objects/agency-pages/RfpDetailsPage";

const rfpDetailsPage = new RfpDetailsPage;
let exportProposalXmlParam
const FILE_NAME = 'stores/TEST Dallas RTG_IMP Dec2023.xml'
before(function () {
    cy.fixture('/agencyRFP/import-xml-prebuy-screen-param').then(function (data) {
        exportProposalXmlParam = data;
    })
})

// Click on Response button
Given('Click on Response button', () => {
    rfpDetailsPage.responseButton().click();
    cy.title('eq', 'Linear Proposal - RFP');
});