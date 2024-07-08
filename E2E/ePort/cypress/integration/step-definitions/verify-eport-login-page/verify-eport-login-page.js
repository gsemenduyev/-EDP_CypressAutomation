/// <reference types="Cypress" />
/// <reference types="cypress-iframe" />
import 'cypress-data-session';
import 'cypress-iframe';
import { Given } from "@badeball/cypress-cucumber-preprocessor";
import EnvUtils from "../../../support/utils/EnvUtils";
import EPortLoginPage from "../../../support/page-objects/eport-pages/EPortLoginPage";
import EPortUserGuidesPage from "../../../support/page-objects/eport-pages/EPortUserGuidesPage";


const envUtils = new EnvUtils;
const ePortLoginPage = new EPortLoginPage;
const ePortUserGuidesPage = new EPortUserGuidesPage;

Given('Verify ePort Login Page', () => {
    cy.visit(envUtils.getEPortUrl());
    cy.title().should('eq', 'ePort Home');
    ePortLoginPage.ePortLogo().should('contain', 'ePort_Logo.jpg');
    ePortLoginPage.loginForm()
        .should('contain.text', 'Registered UsersLog In Here')
        .should('contain.text', 'Forgot username/password? Click here');
    ePortLoginPage.forgotPasswordLink().each(($link) => {
        cy.log(`Verifying "${$link.text()}" link`)
        cy.request('HEAD', $link.prop('href'))
            .its('status')
            .should('eq', 200);
    })
    ePortLoginPage.allLinks().eq(1).should('have.text', 'Need to Register for ePort?')
    ePortLoginPage.allLinks().eq(2).should('have.text', 'About STRATA')
    ePortLoginPage.allLinks().eq(3).should('have.text', 'ePort Terms of Use')
    ePortLoginPage.allLinks().eq(4).should('have.text', 'ePort Privacy Policy')
    ePortLoginPage.trainingAndSupportIframe().should('contain.text', 'Read the User Guides')
    ePortLoginPage.trainingAndSupportLinks().each(($link) => {
        cy.log(`Verifying "${$link.text()}" link`)
        cy.request('HEAD', $link.prop('href'))
            .its('status')
            .should('eq', 200);
    })
    ePortLoginPage.allLinks().each(($link) => {
        cy.log(`Verifying "${$link.text()}" link`)
        cy.request('HEAD', $link.prop('href'))
            .its('status')
            .should('eq', 200);
    })
    // cy.visit("https://eportqa.pregotostrata.com/Login_New.aspx")
    // cy.get('#tbUsername').type('kchow')
    // cy.get('#tbPassword').type('password1')
    // cy.get('#bSubmit').click()
    // cy.title().should('eq', 'ePort')
    // cy.log('REPO_PATH - ' + Cypress.env('REPO_PATH'))
});

Given('Visit youtube', () => {
    cy.visit('https://www.youtube.com');
});


Given('Verify ePort User Guides Page', () => {
    ePortLoginPage.trainingAndSupportLinks().eq(0).invoke('attr', 'target', '_parent').click({ force: true });
    ePortUserGuidesPage.userGuidesText().should('have.text', 'User Guides');
    ePortUserGuidesPage.allLinks().eq(0).should('have.text', 'ePort Tutorial');
    ePortUserGuidesPage.allLinks().eq(1).should('have.text', "ePort User's Guide for sellers");
    ePortUserGuidesPage.allLinks().eq(2).should('have.text', 'ePort Organization Admin Guide');
    ePortUserGuidesPage.allLinks().eq(3).should('have.text', 'Getting around popup blocker in IE');
    ePortUserGuidesPage.needHelpText().should('have.text', 'Need Help?');
    ePortUserGuidesPage.allLinks().eq(4).parent().should('have.text', 'Click here to submit a support case.');
    ePortUserGuidesPage.allLinks().each(($link) => {
        cy.log(`Verifying "${$link.text()}" link`)
        cy.request('HEAD', $link.prop('href'))
            .its('status')
            .should('eq', 200);
    })


});

