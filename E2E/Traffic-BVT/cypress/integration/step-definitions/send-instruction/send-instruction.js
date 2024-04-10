/// <reference types="Cypress" />
/// <reference types="cypress-data-session" />

import 'cypress-data-session';
import { Given } from "@badeball/cypress-cucumber-preprocessor";
import EnvUtils from "../../../support/utils/EnvUtils";
import TrafficLoginPage from "../../../support/page-objects/traffic-pages/TrafficLoginPage";
import TrafficHomePage from "../../../support/page-objects/traffic-pages/TrafficHomePage";

const envUtils = new EnvUtils;
const trafficLoginPage = new TrafficLoginPage;
const trafficHomePage = new TrafficHomePage;

// const FIRST_NAME = 'Test';
// const LAST_NAME = `User${Math.floor(Math.random() * (1000000, 9999999)) + 1000000}`;
// const EMAIL = `${FIRST_NAME}${LAST_NAME}@mailinator.com`;

const FIRST_NAME = 'Test';
const LAST_NAME = `User10464427`;
const EMAIL = `TestUser10464427@mailinator.com`;
const PHONE = '123-456-7890';
const VENDOR = 'TEST-FM';

let qaParam;

before(function () {
    cy.fixture('/environment/qa-param.json').then(function (data) {
        qaParam = data;
    })
})

Given('Login to Traffic as {string} user', user => {
    let username;
    let password;
    let title = 'Traffic Instruction - Inbox';
    if (user === 'Admin') {
        username = envUtils.getTrafficAdminUsername();
        password = envUtils.getTrafficAdminPassword();
        title = 'Traffic Instruction - Manage User';
    };

    cy.visit(envUtils.getTrafficUrl());
    trafficLoginPage.usernameBox().type(username);
    trafficLoginPage.passwordBox().type(password);
    trafficLoginPage.signInBtn().click();
    cy.title().should('eq', title);
});

Given('Verify Traffic {string} home page', user => {
    if (user === 'Admin') {
        trafficHomePage.manageUserTab().click();
        trafficHomePage.searchBar().should('include.text', 'Search User:');
        trafficHomePage.searchTxtBox().should('exist');
        trafficHomePage.searchButton().should('exist');
        trafficHomePage.searchButton().should('exist');
        trafficHomePage.clearButton().should('exist');
        trafficHomePage.importButton().should('exist');
        trafficHomePage.createButton().should('exist');
        trafficHomePage.gridCell(0).should('be.visible')
        cy.screenshot();
        trafficHomePage.assignVendorTab().should('exist');
        trafficHomePage.assignVendorTab().click();
        trafficHomePage.searchBar().should('include.text', 'Search User:');
        trafficHomePage.searchTxtBox().should('exist');
        trafficHomePage.searchButton().should('exist');
        trafficHomePage.searchButton().should('exist');
        trafficHomePage.clearButton().should('exist');
        trafficHomePage.gridCell(0).should('be.visible')
        cy.screenshot();
        trafficHomePage.manageVendorTab().should('exist');
        trafficHomePage.manageVendorTab().click();
        trafficHomePage.searchBar().should('include.text', 'Search Vendor:  by Syscode');
        trafficHomePage.searchTxtBox().should('exist');
        trafficHomePage.searchButton().should('exist');
        trafficHomePage.searchButton().should('exist');
        trafficHomePage.clearButton().should('exist');
        trafficHomePage.addVendorButton().should('exist');
        trafficHomePage.importVendorButton().should('exist');
        trafficHomePage.gridCell(0).should('be.visible');
        cy.screenshot();
    };
});

Given('Create new user', () => {
    trafficHomePage.manageUserTab().click();
    trafficHomePage.createButton().click();
    trafficHomePage.cr8UserForm().should('be.visible');
    trafficHomePage.cr8UserLoginNameTxtBox().type(EMAIL);
    trafficHomePage.cr8UserFirstNameTxtBox().type(FIRST_NAME);
    trafficHomePage.cr8UserLastNameTxtBox().type(LAST_NAME);
    trafficHomePage.cr8UserPrimaryEmailTxtBox().type(EMAIL);
    trafficHomePage.cr8UserSecondaryEmailTxtBox().type(EMAIL);
    trafficHomePage.cr8UserPhoneTxtBox().type(PHONE);
    // Click on "Active" checkbox
    trafficHomePage.cr8UserCheckbox(0).check().should('be.checked');
    // Click on "Traffic Instruction" checkbox
    trafficHomePage.cr8UserCheckbox(1).check().should('be.checked');
    trafficHomePage.cr8UserPasswordTxtBox().type(envUtils.getTrafficAdminPassword());
    trafficHomePage.cr8UserConfirmPasswordTxtBox().type(envUtils.getTrafficAdminPassword());
    trafficHomePage.cr8UserSecurityQuestionTxtBox().type('Job Title');
    trafficHomePage.cr8UserSecurityAnswerTxtBox().type('QA Tester');
    trafficHomePage.cr8UserCreateBtn().click();
    trafficHomePage.cr8UserForm().should('not.be.visible');
    trafficHomePage.gridCell(0).should('be.visible');
    cy.dataSession({
        name: 'newUserLoginName',
        setup: () => EMAIL,
        validate: false,
        shareAcrossSpecs: true,
    });
});

Given('Verify new user was created', () => {
    trafficHomePage.manageUserTab().click();
    // cy.dataSession('newUserLoginName').then($newUserLoginName => {
    //     trafficHomePage.searchTxtBox().type($newUserLoginName);

    // trafficHomePage.searchTxtBox().type('TestUser5659555@mailinator.com');EMAIL
    trafficHomePage.searchTxtBox().type(EMAIL)
    trafficHomePage.searchButton().click();
    trafficHomePage.gridCell(0).should('be.visible');
    trafficHomePage.gridCell(0).should('have.text', FIRST_NAME);
    trafficHomePage.gridCell(1).should('have.text', LAST_NAME);
    trafficHomePage.gridCell(2).should('have.text', EMAIL);
    trafficHomePage.gridCell(3).should('have.text', PHONE);
    trafficHomePage.gridCell(4).should('have.text', EMAIL);
    trafficHomePage.gridCell(5).should('have.text', 'Traffic');
    trafficHomePage.gridCell(5).should('have.text', 'Traffic');
    trafficHomePage.gridCell(7).children().children().should('be.checked');
    // });


});

Given('Assign Vendor to newly created user', () => {
    trafficHomePage.assignVendorTab().click();
    // trafficHomePage.searchTxtBox().type('TestUser5659555@mailinator.com');
    trafficHomePage.searchTxtBox().type(EMAIL);
    trafficHomePage.searchButton().click();
    trafficHomePage.gridCell(0).should('be.visible');
    trafficHomePage.gridCell(0).should('have.text', FIRST_NAME);
    trafficHomePage.gridCell(1).should('have.text', LAST_NAME);
    trafficHomePage.gridCell(2).should('have.text', EMAIL);
    trafficHomePage.gridCell(3).should('have.text', PHONE);
    trafficHomePage.gridCell(4).should('have.text', EMAIL);
    trafficHomePage.gridCell(6).children().click();
    trafficHomePage.assignedVendorsForm().should('be.visible');
    trafficHomePage.assignedVendorsFormTitle().should('include.text', `View Assigned Vendors of '${FIRST_NAME} ${LAST_NAME}`);
    trafficHomePage.goToAssignBtn().click();
    trafficHomePage.assignedVendorsForm().should('be.visible');
    trafficHomePage.assignedVendorsFormTitle().should('include.text', `Assign Vendors to '${FIRST_NAME} ${LAST_NAME}`);
    trafficHomePage.assignVendorsTextBox().type(VENDOR);
    trafficHomePage.assignVendorsSearchBtn().click();
    trafficHomePage.assignVendorsGridCell(1).should('have.text', VENDOR.split('-')[0])
    trafficHomePage.assignVendorsGridCell(2).should('have.text', VENDOR.split('-')[1])

});
