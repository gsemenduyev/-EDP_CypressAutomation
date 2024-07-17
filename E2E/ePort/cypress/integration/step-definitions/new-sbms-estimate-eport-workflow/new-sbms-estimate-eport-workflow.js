/// <reference types="cypress" />
/// <reference types="cypress-iframe" />
import 'cypress-iframe';
import { Given } from "@badeball/cypress-cucumber-preprocessor";

import EnvUtils from "../../../support/utils/EnvUtils";
import ElevenLoginPage from "../../../support/page-objects/eleven-pages/ElevenLoginPage";
import ElevenHomePage from "../../../support/page-objects/eleven-pages/ElevenHomePage";
import EPortHomePage from "../../../support/page-objects/eport-pages/EPortHomePage";

const envUtils = new EnvUtils;
const elevenLoginPage = new ElevenLoginPage;
const elevenHomePage = new ElevenHomePage;
const ePortHomePage = new EPortHomePage;
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
    });
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

Given('Send order to ePort', () => {
    elevenHomePage.showChangeAEStationLink().click();
    elevenHomePage.selectSellerDropdown().select(envUtils.getSeller());
    elevenHomePage.selectViaDropdown().select(envUtils.getVia());
    elevenHomePage.selectSubRepCoDropdown().select(envUtils.getSubRepCompany());
    elevenHomePage.selectSubRepOfficeDropdown().select(envUtils.getSubRepOffice());
    elevenHomePage.selectChangeAEDropdown()
        .select(`${envUtils.getEPortUserLastName()}, ${envUtils.getEPortUserFirstName()} - spot seller`);
    elevenHomePage.okButton().click();
    elevenHomePage.lstActionName().select('Send Selected Unsent Order(s)');
    elevenHomePage.selectAllCheckbox().check()
    elevenHomePage.submitButton().click();
    elevenHomePage.okButton().click();
    cy.screenshot();
});

Given('Verify new order details in ePort', () => {
    cy.readFile(estNumFilePath).then(($estimateNumber) => {
        let startIndex = 0;
        let endIndex = 120;
        const waitForEstimate = () => {
            ePortHomePage.dateReceivedHeader().find('img').invoke('attr', 'alt').then((altText) => {
                if (altText !== 'Desc') {
                    ePortHomePage.dateReceivedHeader().click();
                }
            });
            ePortHomePage.firstGridRow().invoke('text').then(($firstRowText) => {
                if (!$firstRowText.includes($estimateNumber) && startIndex < endIndex) {
                    cy.log(`Waiting on  ${$estimateNumber} order ${(startIndex + 1) * 5} seconds`)
                    cy.wait(5000);
                    ePortHomePage.refreshBtn().click();
                    startIndex++;
                    waitForEstimate();
                }
            });
        };
        waitForEstimate();

        cy.getFormattedDate().then(($date) => {
            ePortHomePage.firstGridRow()
                .should('contain.text', $date)
                .should('contain.text', $estimateNumber);
            ePortHomePage.firstGridRow().contains('New').click();
            cy.screenshot();
            ePortHomePage.auditTrailText()
                .should('contain.text', $date)
                .should('contain.text', $estimateNumber)
                .should('contain.text', 'ePort has received new order');
            cy.screenshot();
            ePortHomePage.returnButton().click();
        });
    });
});