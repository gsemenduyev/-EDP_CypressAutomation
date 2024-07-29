/// <reference types="Cypress" />
import { Given } from "@badeball/cypress-cucumber-preprocessor";
import TrafficHomePage from "../../../support/page-objects/traffic-pages/TrafficHomePage";

const trafficHomePage = new TrafficHomePage;

const RANDOM = Math.floor(Math.random() * (1000000, 9999999)) + 1000000;
const CALL_LETTERS = `TEST_VENDOR${RANDOM}`;
const MEDIA = 'Radio';
const BAND_CODE = 'FM';

Given('Navigate to Add Vendor window', () => {
    trafficHomePage.manageVendorTab().click();
    trafficHomePage.addVendorButton().click();
    trafficHomePage.addVendorWnd().should('be.visible');
    cy.screenshot()
});

Given('Add vendor info', () => {
    trafficHomePage.callLettersTxtBox().type(CALL_LETTERS);
    trafficHomePage.selectMedia().select(MEDIA);
    trafficHomePage.bandCodeTxtBox().type(BAND_CODE);
    trafficHomePage.selectMarket().should('be.visible');
    trafficHomePage.selectCompany().should('be.visible');
    trafficHomePage.selectForwarding().should('be.visible');
    trafficHomePage.disableEmailCheckBox().should('be.disabled');
    trafficHomePage.disabledCheckBox().should('not.be.checked');
    trafficHomePage.addVendorCancelBtn().should('be.visible');
    cy.screenshot()
    trafficHomePage.addVendorCreateBtn().click();
    trafficHomePage.addVendorWnd().should('not.be.visible');
});

Given('Verify new vendor was created', () => {
    trafficHomePage.manageVendorTab().click();
    trafficHomePage.searchTxtBox().type(CALL_LETTERS);
    trafficHomePage.searchButton().click();
    trafficHomePage.gridRows()
        .should('include.text', CALL_LETTERS)
        .and('include.text', BAND_CODE)
        .and('include.text', MEDIA.toUpperCase());
    cy.screenshot();
});