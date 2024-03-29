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
    // cy.copyAndDeleteFiles('C:\\CypressAutomation\\EDP_CypressAutomation\\E2E\\SBMS\\SBMS\\NameMapping\\Images\\',
    //     'C:\\CypressAutomation\\EDP_CypressAutomation\\E2E\\Eleven-Test\\cypress\\screenshots\\');
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

Given('Search for order', () => {
    var outerIndex = 1;
    cy.readFile('cypress/fixtures/estimate-number.txt').then(($estimateNumber) => {

        const waitForEstimate = () => {
            var innerIdex = 1;
            homePage.orderSearchBox().type($estimateNumber);
            homePage.goButton().click();
            const waitForOrder = () => {
                cy.wait(500)
                cy.is_element_exists(homePage.headerEstimateTextSyntax()).then($elementExists => {
                    if ($elementExists === true) {
                        innerIdex = 10;
                    } else if (innerIdex < 10 && $elementExists === false) {
                        innerIdex++;
                        waitForOrder();
                    }
                })
            }
            waitForOrder();

            cy.is_element_exists(homePage.headerEstimateTextSyntax()).then($elementExists => {
                if ($elementExists === true) {
                    outerIndex = 10;
                } else if (outerIndex < 10 && $elementExists === false) {
                    outerIndex++;
                    cy.wait(5000)
                    cy.reload()
                    waitForEstimate();
                }
            })
        }
        waitForEstimate();
        homePage.headerEstimateText().should('contain.text', $estimateNumber)
        cy.screenshot();
    })
});


Given('Verify Radio order status is {string}', $orderStatus => {
    homePage.toggleAll().click()
    homePage.orderStatus().should('include.text', $orderStatus)
    cy.screenshot();
});

Given('Send order to Stratasphere', () => {
    homePage.lstActionName().select('Send Selected Unsent Order(s)');
    homePage.selectAllCheckbox().check()
    homePage.submitButton().click();
    homePage.okButton().click();

});

Given('Revise Radio estimate and Send to eleven', () => {
    cy.sbms('reviseRadioEstimate')
});


Given('Test', () => {
    cy.visit('https://translate.google.com/')
});
