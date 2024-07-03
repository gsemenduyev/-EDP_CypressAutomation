/// <reference types="Cypress" />
/// <reference types="cypress-iframe" />
import 'cypress-data-session';
import 'cypress-iframe';
import { Given } from "@badeball/cypress-cucumber-preprocessor";
import EnvUtils from "../../../support/utils/EnvUtils";
import EPortLoginPage from "../../../support/page-objects/eport-pages/EPortLoginPage";

const envUtils = new EnvUtils;
const ePortLoginPage = new EPortLoginPage;

Given('Visit ePort Login Page', () => {
    cy.visit(envUtils.getEPortUrl());
    cy.title().should('eq', 'ePort Home');
    ePortLoginPage.ePortLogo().should('contain', 'ePort_Logo.jpg');
    ePortLoginPage.loginForm()
        .should('contain.text', 'Registered UsersLog In Here')
        .should('contain.text', 'Forgot username/password? Click here');
    ePortLoginPage.registerLink().should('have.text', 'Need to Register for ePort?')
    ePortLoginPage.allLinks('a').each(($link) => {
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

