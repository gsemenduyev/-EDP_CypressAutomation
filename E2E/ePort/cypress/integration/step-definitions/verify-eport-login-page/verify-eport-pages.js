/// <reference types="Cypress" />
/// <reference types="cypress-iframe" />
import 'cypress-data-session';
import 'cypress-iframe';
import { Given } from "@badeball/cypress-cucumber-preprocessor";
import EnvUtils from "../../../support/utils/EnvUtils";
import EPortLoginPage from "../../../support/page-objects/eport-pages/EPortLoginPage";
import EPortHelpPage from "../../../support/page-objects/eport-pages/EPortHelpPage";
import EPortReqPwdPage from "../../../support/page-objects/eport-pages/EPortReqPwdPage";
import EPortHomePage from "../../../support/page-objects/eport-pages/EPortHomePage";

const envUtils = new EnvUtils;
const ePortLoginPage = new EPortLoginPage;
const ePortHelpPage = new EPortHelpPage;
const ePortReqPwdPage = new EPortReqPwdPage;
const ePortHomePage = new EPortHomePage;

Given('Verify ePort Login Page', () => {
    cy.visit(envUtils.getEPortUrl());
    cy.title().should('eq', 'ePort Home');
    cy.screenshot();
    ePortLoginPage.ePortLogo().should('contain', 'ePort_Logo.jpg');
    ePortLoginPage.loginForm()
        .should('contain.text', 'Registered UsersLog In Here')
        .should('contain.text', 'Forgot username/password? Click here');
    ePortLoginPage.forgotPasswordLink().each(($link) => {
        cy.log(`Verifying "${$link.text()}" link`);
        cy.request('HEAD', $link.prop('href'))
            .its('status')
            .should('eq', 200);
    });
    ePortLoginPage.allLinks().eq(1).should('have.text', 'Need to Register for ePort?');
    ePortLoginPage.allLinks().eq(2).should('have.text', 'About STRATA');
    ePortLoginPage.allLinks().eq(3).should('have.text', 'ePort Terms of Use');
    ePortLoginPage.allLinks().eq(4).should('have.text', 'ePort Privacy Policy');
    ePortLoginPage.trainingAndSupportIframe().should('contain.text', 'Read the User Guides');
    ePortLoginPage.trainingAndSupportLinks().each(($link) => {
        cy.log(`Verifying "${$link.text()}" link`);
        cy.request('HEAD', $link.prop('href'))
            .its('status')
            .should('eq', 200);
    })
    ePortLoginPage.allLinks().each(($link) => {
        cy.log(`Verifying "${$link.text()}" link`);
        cy.request('HEAD', $link.prop('href'))
            .its('status')
            .should('eq', 200);
    });

});


Given('Verify ePort User Guides Page', () => {
    cy.visit(envUtils.getEPortUrl());
    cy.title().should('eq', 'ePort Home');
    cy.screenshot();
    ePortLoginPage.trainingAndSupportLinks().eq(0).invoke('attr', 'target', '_parent').click({ force: true });
    cy.title().should('eq', 'ePort Help');
    cy.screenshot();
    ePortHelpPage.userGuidesText().should('have.text', 'User Guides');
    ePortHelpPage.allLinks().eq(0).should('have.text', 'ePort Tutorial');
    ePortHelpPage.allLinks().eq(1).should('have.text', "ePort User's Guide for sellers");
    ePortHelpPage.allLinks().eq(2).should('have.text', 'ePort Organization Admin Guide');
    ePortHelpPage.allLinks().eq(3).should('have.text', 'Getting around popup blocker in IE');
    ePortHelpPage.needHelpText().should('have.text', 'Need Help?');
    ePortHelpPage.allLinks().eq(4).parent().should('have.text', 'Click here to submit a support case.');
    ePortHelpPage.allLinks().each(($link) => {
        cy.log(`Verifying "${$link.text()}" link`);
        cy.request('HEAD', $link.prop('href'))
            .its('status')
            .should('eq', 200);
    });
});

Given('Verify ePort Forgot Password Page', () => {
    cy.visit(envUtils.getEPortUrl());
    cy.title().should('eq', 'ePort Home');
    cy.screenshot();
    ePortLoginPage.forgotPasswordLink().invoke('attr', 'target', '_parent').click({ force: true });
    cy.title().should('eq', 'ePort - Request New Password');
    ePortReqPwdPage.sMessage().should('contain.text', 'Please enter either your Email Address or your Username:')
    ePortReqPwdPage.sEmail().should('contain.text', 'Email Address:')
    ePortReqPwdPage.sUser().should('contain.text', 'OR Username:')
    ePortReqPwdPage.sLowerMessage().should('contain.text', 'Your new password will be emailed to you.')
    ePortReqPwdPage.submitBtn().should('exist')
    ePortReqPwdPage.allLinks().each(($link) => {
        cy.log(`Verifying "${$link.text()}" link`);
        cy.request('HEAD', $link.prop('href'))
            .its('status')
            .should('eq', 200);
    });
});

Given('Login to ePort', () => {
    cy.visit(envUtils.getEPortUrl());
    cy.title().should('eq', 'ePort Home');
    cy.screenshot();
    cy.visit(envUtils.getEPortUrl() + '/Login_New.aspx');
    cy.title().should('eq', 'Login_New');
    cy.screenshot();
    ePortLoginPage.username().type(envUtils.getEPortUsername())
    ePortLoginPage.password().type(envUtils.getEPortPassword())
    ePortLoginPage.submitBtn().click()
    cy.title().should('eq', 'ePort')
    cy.screenshot();
});

Given('Verify ePort Home Page', () => {
    ePortHomePage.welcomeTitle()
        .should('contain.text', `Welcome ${envUtils.getEPortUserFirstName()} ${envUtils.getEPortUserLastName()}!`)
        .should('contain.text', 'You are viewing documents for')
        .should('contain.text', `${envUtils.getEPortUserFirstName()} ${envUtils.getEPortUserLastName()}.`)
    ePortHomePage.quickSearchLink().then(($element) => {
        expect($element.text()).equal('Quick Search');
        cy.log(`Verifying "${$element.text()}" link`);
        cy.request('HEAD', $element.prop('href'))
            .its('status')
            .should('eq', 200);
    });
    ePortHomePage.logoutLink().should('have.text', 'Logout');
    ePortHomePage.needHelpLink().then(($element) => {
        expect($element.text()).equal('Need Help?');
        cy.log(`Verifying "${$element.text()}" link`);
        cy.request('HEAD', $element.prop('href'))
            .its('status')
            .should('eq', 200);
    });
    ePortHomePage.refreshBtn().should('have.text', 'Refresh');
    ePortHomePage.tabInbox().as('tabInbox').click()
    cy.get('@tabInbox')
        .should('have.text', 'Inbox')
        .should('have.class', 'selectedtabbutton');
    ePortHomePage.tabPending().as('tabPending').click()
    cy.get('@tabPending')
        .should('have.text', 'Pending')
        .should('have.class', 'selectedtabbutton');
    ePortHomePage.tabDrafts().as('tabDrafts').click()
    cy.get('@tabDrafts')
        .should('have.text', 'Drafts')
        .should('have.class', 'selectedtabbutton');
    ePortHomePage.tabCompleted().as('tabCompleted').click()
    cy.get('@tabCompleted')
        .should('have.text', 'Completed')
        .should('have.class', 'selectedtabbutton');
    ePortHomePage.tabInbox().click()
    ePortHomePage.ordersBtn().should('contain.text', 'Orders');
    ePortHomePage.revisionsBtn().should('contain.text', 'Revisions');
    ePortHomePage.makegoodsBtn().should('contain.text', 'Makegoods');
    ePortHomePage.logTimesBtn().should('contain.text', 'Log Times');
    ePortHomePage.cashTradeAllocationBtn().should('contain.text', 'C/T Allocations');

    ePortHomePage.inboxGridHeaders()
        .should('contain.text', 'Date Received')
        .should('contain.text', 'Station')
        .should('contain.text', 'Agency')
        .should('contain.text', 'Advertiser')
        .should('contain.text', 'C/P/E')
        .should('contain.text', 'C/T')
        .should('contain.text', 'Ver #')
        .should('contain.text', 'Status')
        .should('contain.text', 'Transactions');
    ePortHomePage.selectActionDropdown().should('exist')
    ePortHomePage.changeUserPasswordLink().then(($element) => {
        expect($element.text()).equal(`${envUtils.getEPortUserFirstName()} ${envUtils.getEPortUserLastName()}`);
        cy.log(`Verifying "${$element.text()}" link`);
        cy.request('HEAD', $element.prop('href'))
            .its('status')
            .should('eq', 200);
    });
});


Given('Verify ePort Change Password Page', () => {
    cy.visit(envUtils.getEPortUrl() + '/changepassword.aspx');
});

Given('Visit youtube', () => {
    cy.visit('https://www.youtube.com');
});

