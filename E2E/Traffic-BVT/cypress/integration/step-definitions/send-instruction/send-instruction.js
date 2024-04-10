/// <reference types="Cypress" />
/// <reference types="cypress-data-session" />

import 'cypress-data-session';
import { Given } from "@badeball/cypress-cucumber-preprocessor";
import EnvUtils from "../../../support/utils/EnvUtils";
import TrafficLoginPage from "../../../support/page-objects/traffic-pages/TrafficLoginPage";
import TrafficHomePage from "../../../support/page-objects/traffic-pages/TrafficHomePage";
import { should } from 'chai';

const envUtils = new EnvUtils;
const trafficLoginPage = new TrafficLoginPage;
const trafficHomePage = new TrafficHomePage;

const NEW_USER_FILE = 'cypress/fixtures/new-user/new-user-param.json';
let newUserParam
before(function () {
    save_new_user_param();
    cy.fixture('new-user/new-user-param.json').then(function (data) {
        newUserParam = data;
    });
});

Given('Login to Traffic as {string} user', user => {
    cy.visit(envUtils.getTrafficUrl());
    cy.title().should('eq', 'AEINBOX® for Traffic Instruction - Login')
    if (user === 'Admin') {
        trafficLoginPage.usernameBox().type(envUtils.getTrafficAdminUsername());
        trafficLoginPage.passwordBox().type(envUtils.getTrafficAdminPassword());
        trafficLoginPage.signInBtn().click();
        cy.title().should('eq', 'Traffic Instruction - Manage User');
    } else if (user === 'New') {
        trafficLoginPage.usernameBox().type(newUserParam.email);
        trafficLoginPage.passwordBox().type(envUtils.getTrafficAdminPassword());
        trafficLoginPage.signInBtn().click();
        trafficLoginPage.acceptBtn().should('exist');
        trafficLoginPage.doNotAcceptBtn().should('exist');
        trafficLoginPage.userAgreementTxt().invoke('text').then(($elementText) => {
            cy.readFile('cypress/fixtures/stores/user-agreement.txt').then(($fileContent) => {
                expect($elementText.trim()).to.equal($fileContent.trim());
            });
        });
        trafficLoginPage.acceptBtn().click();
        cy.title().should('eq', 'Traffic Instruction - Inbox');
    };
});


Given('Logout from Traffic', () => {
    trafficHomePage.logoutLink().click();
    cy.title().should('eq', 'AEINBOX® for Traffic Instruction - Login')
});

Given('Verify Traffic {string} user home page', user => {
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
    } else if (user === 'New') {
        trafficHomePage.inboxTab().should('exist');
        trafficHomePage.acceptedTab().should('exist');
        trafficHomePage.acceptInstructionsBtn().should('exist');
        cy.screenshot();
    };
});

Given('Create new user', () => {
    trafficHomePage.manageUserTab().click();
    trafficHomePage.createButton().click();
    trafficHomePage.cr8UserForm().should('be.visible');
    trafficHomePage.cr8UserLoginNameTxtBox().type(newUserParam.email);
    trafficHomePage.cr8UserFirstNameTxtBox().type(newUserParam.firstName);
    trafficHomePage.cr8UserLastNameTxtBox().type(newUserParam.lastName);
    trafficHomePage.cr8UserPrimaryEmailTxtBox().type(newUserParam.email);
    trafficHomePage.cr8UserSecondaryEmailTxtBox().type(newUserParam.email);
    trafficHomePage.cr8UserPhoneTxtBox().type(newUserParam.phone);
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
    // cy.dataSession({
    //     name: 'newUserLoginName',
    //     setup: () => EMAIL,
    //     validate: false,
    //     shareAcrossSpecs: true,
    // });
});

Given('Verify new user was created', () => {
    trafficHomePage.manageUserTab().click();
    // cy.dataSession('newUserLoginName').then($newUserLoginName => {
    //     trafficHomePage.searchTxtBox().type($newUserLoginName);

    // trafficHomePage.searchTxtBox().type('TestUser5659555@mailinator.com');EMAIL
    trafficHomePage.searchTxtBox().type(newUserParam.email);
    trafficHomePage.searchButton().click();
    trafficHomePage.gridCell(0).should('be.visible');
    trafficHomePage.gridCell(0).should('have.text', newUserParam.firstName);
    trafficHomePage.gridCell(1).should('have.text', newUserParam.lastName);
    trafficHomePage.gridCell(2).should('have.text', newUserParam.email);
    trafficHomePage.gridCell(3).should('have.text', newUserParam.phone);
    trafficHomePage.gridCell(4).should('have.text', newUserParam.email);
    trafficHomePage.gridCell(5).should('have.text', 'Traffic');
    trafficHomePage.gridCell(5).should('have.text', 'Traffic');
    trafficHomePage.gridCell(7).children().children().should('be.checked');
});

Given('Assign Vendor to {string} user', user => {
    trafficHomePage.assignVendorTab().click();
    // trafficHomePage.searchTxtBox().type('TestUser5659555@mailinator.com');
    if (user === 'New') {
        trafficHomePage.searchTxtBox().type(newUserParam.email);
    }
    trafficHomePage.searchButton().click();
    trafficHomePage.gridCell(0).should('be.visible');
    trafficHomePage.gridCell(0).should('have.text', newUserParam.firstName);
    trafficHomePage.gridCell(1).should('have.text', newUserParam.lastName);
    trafficHomePage.gridCell(2).should('have.text', newUserParam.email);
    trafficHomePage.gridCell(3).should('have.text', newUserParam.phone);
    trafficHomePage.gridCell(4).should('have.text', newUserParam.email);
    trafficHomePage.gridCell(6).children().click();
    trafficHomePage.assignedVenForm().should('be.visible');
    trafficHomePage.assignedVenFormTitle().should('include.text', `View Assigned Vendors of '${newUserParam.firstName} ${newUserParam.lastName}`);
    trafficHomePage.goToAssignBtn().click();
    trafficHomePage.assignedVenForm().should('be.visible');
    trafficHomePage.assignedVenFormTitle().should('include.text', `Assign Vendors to '${newUserParam.firstName} ${newUserParam.lastName}`);
    trafficHomePage.assignVenTextBox().type(newUserParam.vendor);
    trafficHomePage.assignVenSearchBtn().click();
    trafficHomePage.assignVenGridCell(1).should('have.text', newUserParam.vendor.split('-')[0])
    trafficHomePage.assignVenGridCell(2).should('have.text', newUserParam.vendor.split('-')[1])
    trafficHomePage.assignVenGridCell(0).children().children().check().should('be.checked');
    trafficHomePage.assignVenBtn().click();
    trafficHomePage.assignVenGoToViewBtn().click({ timeout: 60000 });
    trafficHomePage.assignVenGridCell(1).should('have.text', newUserParam.vendor.split('-')[0])
    trafficHomePage.assignVenGridCell(2).should('have.text', newUserParam.vendor.split('-')[1])
    trafficHomePage.assignVenCancelBtn().click();
});


Given('test', () => {

    cy.log(newUserParam.email);
})

// Saves new user parameters into Json file
function save_new_user_param() {
    const firstName = 'Test';
    const lastName = `User${Math.floor(Math.random() * (1000000, 9999999)) + 1000000}`;
    const email = `${firstName}${lastName}@mailinator.com`;
    const phone = '123-456-7890';
    const vendor = 'TEST TRAFFIC-AM';

    const data = {
        email: email,
        firstName: firstName,
        lastName: lastName,
        phone: phone,
        vendor: vendor
    };
    const jsonContent = JSON.stringify(data);
    cy.writeFile(NEW_USER_FILE, jsonContent);
};
