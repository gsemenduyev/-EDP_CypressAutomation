/// <reference types="Cypress" />
import { Given } from "@badeball/cypress-cucumber-preprocessor";
import EnvUtils from "../../../support/utils/EnvUtils";
import TrafficHomePage from "../../../support/page-objects/traffic-pages/TrafficHomePage";

const envUtils = new EnvUtils;
const trafficHomePage = new TrafficHomePage;

Given('Verify user assigned vendors', () => {
    trafficHomePage.assignVendorTab().click();
    trafficHomePage.searchTxtBox().type(envUtils.getTrafficUsername());
    trafficHomePage.searchButton().click();
    trafficHomePage.gridRows().should('have.length', 1);
    trafficHomePage.gridRows().should('include.text', envUtils.getTrafficUsername());
    trafficHomePage.gridRows().children().each(($cell) => {
        cy.log($cell.text())
        if ($cell.text().includes('Vendor')) {
            cy.wrap($cell.find('a')).click();
        }
    })
    trafficHomePage.assignedVenFormTitle().should('be.visible');
    trafficHomePage.assignedVenFormTitle().should('include.text', `View Assigned Vendors of `);
    trafficHomePage.assignVendorsRows().should('be.visible');
    trafficHomePage.assignVendorsRows().should('include.text', envUtils.getVendor().split('-')[0])
    cy.screenshot();
    trafficHomePage.viewAssignVendorsCancelBtn().click();
    trafficHomePage.assignedVenFormTitle().should('not.be.visible');
});