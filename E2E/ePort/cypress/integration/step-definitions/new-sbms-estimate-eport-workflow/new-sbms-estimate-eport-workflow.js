/// <reference types="cypress" />
/// <reference types="cypress-iframe" />
import 'cypress-iframe';
import { Given } from "@badeball/cypress-cucumber-preprocessor";

import EnvUtils from "../../../support/utils/EnvUtils";
import ElevenLoginPage from "../../../support/page-objects/eleven-pages/ElevenLoginPage";
import ElevenHomePage from "../../../support/page-objects/eleven-pages/ElevenHomePage";

const envUtils = new EnvUtils;
const elevenLoginPage = new ElevenLoginPage;
const elevenHomePage = new ElevenHomePage;
const estNumFilePath = 'cypress/fixtures/sbms-estimate/estimate-number.txt'


Given('Create new SBMS estimate and send to Eleven', () => {
    cy.sbms('SendNewTvEstimateToEleven');
});

Given('Verify new SBMS estimate is created', () => {
    cy.readFile(estNumFilePath).should('include', 'New Estimate')
    cy.readFile(estNumFilePath).then(($estNum) => {
        $estNum = $estNum.split('-').pop()
        cy.writeFile(estNumFilePath, $estNum)
        cy.readFile(estNumFilePath).should('eq', $estNum)
    })
});

Given('Login to Eleven', () => {
    cy.visit(envUtils.getElevenUrl())
    cy.title().should('eq', 'Eleven: Login')
    cy.screenshot();
    elevenLoginPage.usernameBox().type(envUtils.getElevenUsername());
    elevenLoginPage.passwordBox().type(envUtils.getElevenPassword());
    elevenLoginPage.loginButton().click();
    cy.title().should('eq', 'Eleven');
    cy.screenshot();
});

Given('Search for order in Eleven', () => {
    var outerIndex = 1;
    cy.readFile(estNumFilePath).then(($estimateNumber) => {
        const waitForEstimate = () => {
            var innerIdex = 1;
            elevenHomePage.orderSearchBox().type($estimateNumber);
            elevenHomePage.goButton().click();
            const waitForOrder = () => {
                cy.wait(500)
                cy.is_element_exists(elevenHomePage.headerEstimateTextSyntax()).then($elementExists => {
                    if ($elementExists === true) {
                        innerIdex = 10;
                    } else if (innerIdex < 10 && $elementExists === false) {
                        innerIdex++;
                        waitForOrder();
                    }
                })
            }
            waitForOrder();
            cy.is_element_exists(elevenHomePage.headerEstimateTextSyntax()).then($elementExists => {
                if ($elementExists === true) {
                    outerIndex = 10;
                } else if (outerIndex < 10 && $elementExists === false) {
                    outerIndex++;
                    cy.wait(5000)
                    cy.reload()
                    waitForEstimate();
                }
            });
        }
        waitForEstimate();
        elevenHomePage.headerEstimateText().should('contain.text', $estimateNumber);
        cy.screenshot();
    })
});

Given('Verify TV order status is {string}', $orderStatus => {
    elevenHomePage.toggleAll().click()
    elevenHomePage.orderStatus().should('include.text', $orderStatus)
    cy.screenshot();
});

Given('Send order to Stratasphere', () => {
    elevenHomePage.lstActionName().select('Send Selected Unsent Order(s)');
    elevenHomePage.selectAllCheckbox().check()
    elevenHomePage.submitButton().click();
    elevenHomePage.okButton().click();
});