/// <reference types="Cypress" />
/// <reference types="cypress-data-session" />
/// <reference types="cypress-iframe" />
import 'cypress-data-session';
import 'cypress-iframe';
import { Given } from "@badeball/cypress-cucumber-preprocessor";
import LoginPage from '../../support/page-objects/LoginPage';
import HomePage from '../../support/page-objects/HomePage';
const loginPage = new LoginPage;
const homePage = new HomePage;

let environmentsParam;

before(function () {
    cy.fixture('/environment/qa-param.json').then((data) => {
        environmentsParam = data;
    });
});

Given('Create Radio estimate and Send to Eleven', () => {
    cy.sbms('createRadioEstimate')
    cy.copyAndDeleteFiles('C:\\CypressAutomation\\EDP_CypressAutomation\\E2E\\SBMS\\SBMS\\NameMapping\\Images\\',
        'C:\\CypressAutomation\\EDP_CypressAutomation\\E2E\\Eleven-Test\\cypress\\screenshots\\');
});

Given('Verify Radio estimate is created', () => {

});


Given('Login to Eleven', () => {
    cy.visit(environmentsParam.elevenUrl)
    cy.title().should('eq', 'Eleven: Login')
    cy.screenshot();
    loginPage.usernameBox().type(environmentsParam.elevenUsername);
    loginPage.passwordBox().type(environmentsParam.elevenPassword);
    loginPage.loginButton().click();
    cy.title().should('eq', 'Eleven');
    cy.screenshot();
});

Given('Search for estimate', () => {
    var index = 1;
    cy.readFile('cypress/fixtures/estimete-number.txt').then(($estimateNumber) => {
        const waitForEstimate = () => {
            homePage.orderSearchBox().type($estimateNumber);
            homePage.goButton().click()
            cy.is_element_exists(homePage.headerEstimateTextSyntax()).then($elementExists => {
                if ($elementExists === true) {
                    index = 15;
                } else if (index < 15 && $elementExists === false) {
                    index++;
                    cy.reload()
                    cy.wait(5000)
                    waitForEstimate();
                }
            })
        }
        waitForEstimate();
        homePage.headerEstimateText().should('contain.text', $estimateNumber)
    })
});


Given('Verify Radio order status is {string}', $string => {
    homePage.toggleAll().click()
    homePage.statusSendFailed().should('include.text', $string)
});

Given('Revise Radio estimate and Send to eleven', () => {
    cy.sbms('reviseRadioEstimate')
});

Given('Verify revised Radio estimate', () => {

});
