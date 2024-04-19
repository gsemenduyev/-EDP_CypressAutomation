/// <reference types="Cypress" />
import 'cypress-file-upload';
import { Given } from "@badeball/cypress-cucumber-preprocessor";
import EnvUtils from "../../../support/utils/EnvUtils";
import TrafficHomePage from "../../../support/page-objects/traffic-pages/TrafficHomePage";
import TrafficImportUserPage from "../../../support/page-objects/traffic-pages/TrafficImportUserPage";

const envUtils = new EnvUtils;
const trafficHomePage = new TrafficHomePage;
const trafficImportUserPage = new TrafficImportUserPage;

Given('Verify user exists', () => {
    trafficHomePage.manageUserTab().click();
    trafficHomePage.searchTxtBox().type(envUtils.getTrafficUsername());
    trafficHomePage.searchButton().click();
    trafficHomePage.gridRows().should('have.length', 1);
    trafficHomePage.gridRows().should('include.text', envUtils.getTrafficUsername());
    cy.screenshot();
    trafficHomePage.gridRows().find('input').should('be.checked');
});

Given('Navigate to Import User page', () => {
    trafficHomePage.manageUserTab().click();
    trafficHomePage.importButton().click();
    trafficImportUserPage.userImportMsg(0).invoke('text').then(($text) => {
        cy.readFile('cypress/fixtures/stores/user-import-inform-msg.txt').then(($fileText) => {
            expect($text).to.equal($fileText)
        })
    })
    trafficImportUserPage.chooseFileBtn().should('exist');;
    trafficImportUserPage.uploadBtn().should('exist');
    cy.screenshot()
    trafficImportUserPage.cancelBtn().should('exist');
});

Given('Import user from CSV file', () => {
    cy.upload_file('stores/UserImport.csv', trafficImportUserPage.chooseFileBtn());
    cy.screenshot();
    trafficImportUserPage.uploadBtn().click();
    trafficImportUserPage.uploadedUserForm().should('include.text', envUtils.getTrafficUsername());
    trafficImportUserPage.uploadedUserForm().should('include.text', 'User exist');
    cy.screenshot();
    trafficImportUserPage.uploadedUserImportBtn().should('exist');
    trafficImportUserPage.uploadedUserCancelBtn().should('exist');
    trafficImportUserPage.uploadedUserHeader().should('have.text', 'Uploaded Users:');
    trafficImportUserPage.uploadedUserImportBtn().click();
    trafficImportUserPage.uploadedUserForm().should('include.text', envUtils.getTrafficUsername());
    trafficImportUserPage.uploadedUserForm().should('include.text', 'User exist');
    cy.screenshot();
    trafficImportUserPage.importedUserDownloadListBtn().should('exist');
    trafficImportUserPage.importedUserCloseBtn().should('exist');
    trafficImportUserPage.uploadedUserHeader().should('have.text', 'Imported Users:');
    trafficImportUserPage.importedUserCloseBtn().click();
});