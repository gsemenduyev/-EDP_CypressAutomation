/// <reference types="Cypress" />
import { Given } from "@badeball/cypress-cucumber-preprocessor";
import AgencyLoginPage from "../../../support/page-objects/agency-pages/AgencyLoginPage";
import AgencyBasePage from "../../../support/page-objects/agency-pages/AgencyBasePage";
const agencyLoginPage = new AgencyLoginPage;
const agencyBasePage = new AgencyBasePage;
// Login to Agency RFP Jenkins test
Given('Login to Agency RFP Jenkins test', () => {
    cy.visit(Cypress.env('agencyUrl') + "/Login");
    agencyBasePage.pageTitle().should('have.text', 'Sign In');
    agencyLoginPage.usernameBox().type(Cypress.env('agencyUsername'));
    agencyLoginPage.passwordBox().type(Cypress.env('agencyPassword'), { log: false });
    cy.screenshot('Agency RFP Sign In page after inserting credentials', {log: true})
    agencyLoginPage.loginButton().click();
    cy.title().should('eq', 'Home - RFP');
    cy.screenshot('Agency RFP Home page', {log: true})
    
})

// Logout Agency RFP Jenkins test
Given('Logout Agency RFP Jenkins test', () => {
    agencyBasePage.signOutButton().click({ force: true });
    agencyBasePage.pageTitle().should('have.text', 'Sign In');
    cy.screenshot();
})