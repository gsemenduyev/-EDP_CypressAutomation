/// <reference types="cypress" />

import { Given } from "@badeball/cypress-cucumber-preprocessor";
import EPortHomePage from "../../../support/page-objects/eport-pages/EPortHomePage";
import EPortOrgAdminPage from "../../../support/page-objects/eport-pages/EPortOrgAdminPage";

const ePortHomePage = new EPortHomePage;
const ePortOrgAdminPage = new EPortOrgAdminPage;

const RANDOM = Math.floor(Math.random() * (1000000, 9999999)) + 1000000;
const FIRST_NAME = 'Test';
const LAST_NAME = `User${RANDOM}`;
const PHONE_NUMBER = '(123) 456-7891';
const PRIMARY_EMAIL = `${FIRST_NAME}${LAST_NAME}@mailinator.com`;
const USER_TYPE = 'Org Admin Seller';
const LOGIN_NAME = `${FIRST_NAME}${LAST_NAME}`;
const NEW_PASSWORD = 'password1';
const ORGANIZATION = (() => {
    if (Cypress.env('ENV') === 'Production') {
        return 'WTVB (S)';
    } else if (Cypress.env('ENV') === 'UAT') {
        return 'TEST (S)'
    } else {
        return 'KDVR (S)';
    }
})();

Given('Navigate to ePort Org Admin Page', () => {
    ePortHomePage.selectActionDropdown().select('Org Admin');
    cy.title().should('eq', 'ePort - Administration');
    cy.screenshot();
    ePortOrgAdminPage.title().should('have.text', 'Administration');
    ePortOrgAdminPage.tabUserMgr().as('tabUserMgr').click();
    cy.get('@tabUserMgr')
        .should('have.text', 'User Manager')
        .should('have.class', 'selectedtabbutton');
});

Given('Verify Org Admin page User Manager grid', () => {
    ePortOrgAdminPage.userMgrGridHeaders()
        .should('contain.text', 'First Name')
        .should('contain.text', 'Last Name')
        .should('contain.text', 'Login Name')
        .should('contain.text', 'Organizations')
        .should('contain.text', 'Office')
        .should('contain.text', 'User Type')
        .should('contain.text', 'Phone')
        .should('contain.text', 'Email')
        .should('contain.text', 'Active')
        .should('contain.text', 'Last Updated');
    cy.screenshot();
});

Given('Create new ePort user', () => {
    ePortOrgAdminPage.userMgrFirstName().type(FIRST_NAME);
    ePortOrgAdminPage.userMgrLastName().type(LAST_NAME);
    ePortOrgAdminPage.userMgrPhone().type(PHONE_NUMBER);
    ePortOrgAdminPage.userMgrEmail().type(PRIMARY_EMAIL);
    ePortOrgAdminPage.userMgrTypeDropdown().select(USER_TYPE);
    ePortOrgAdminPage.userMgrLoginName().type(LOGIN_NAME);
    ePortOrgAdminPage.userMgrNewPass().type(NEW_PASSWORD);
    ePortOrgAdminPage.userMgrAvailOrgs().select(ORGANIZATION);
    ePortOrgAdminPage.userMgrAddBtn().click();
    ePortOrgAdminPage.userMgrSelectedOrgs().should('contain.text', ORGANIZATION);
    ePortOrgAdminPage.userMgrCreateBtn().click();
    cy.screenshot();
    ePortOrgAdminPage.userMgrMessage().should('have.text', `User ${LOGIN_NAME} has been created successfully.`);
    cy.screenshot();
});

Given('Verify new user created', () => {
    ePortOrgAdminPage.tabUserMgr().as('tabUserMgr').click()
    cy.get('@tabUserMgr')
        .should('have.text', 'User Manager')
        .should('have.class', 'selectedtabbutton');
    ePortOrgAdminPage.searchOrganization().select(ORGANIZATION.split(' ')[0]);
    ePortOrgAdminPage.userMgrSearchOffice().should('exist');
    ePortOrgAdminPage.showActiveUserCheckbox().as('showActiveUserCheckbox').check();
    cy.get('@showActiveUserCheckbox').should('be.checked');
    ePortOrgAdminPage.userMgrSearchFirstName().type(FIRST_NAME);
    ePortOrgAdminPage.userMgrSearchLastName().type(LAST_NAME);
    ePortOrgAdminPage.userMgrSearchClearBtn().should('exist');
    ePortOrgAdminPage.userMgrSearchBtn().click();
    ePortOrgAdminPage.userMgrGridEvenRow().should('not.exist');
    cy.screenshot();
    ePortOrgAdminPage.userMgrGridOddRow()
        .should('have.length', 1)
        .should('contain.text', FIRST_NAME)
        .should('contain.text', LAST_NAME)
        .should('contain.text', LOGIN_NAME)
        .should('contain.text', ORGANIZATION.split(' ')[0])
        .should('contain.text', USER_TYPE)
        .should('contain.text', PHONE_NUMBER)
        .should('contain.text', PRIMARY_EMAIL);
    ePortOrgAdminPage.userMgrGridActiveCheckboxes()
        .should('have.length', 1)
        .should('be.checked');
    ePortOrgAdminPage.userMgrGridEditBtn()
        .should('have.length', 1)
        .should('have.value', 'Edit');
});