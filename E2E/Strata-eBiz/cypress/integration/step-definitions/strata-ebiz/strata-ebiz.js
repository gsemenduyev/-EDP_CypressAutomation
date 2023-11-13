/// <reference types="Cypress" />

import { Given } from "@badeball/cypress-cucumber-preprocessor";

import ArfpPages from '../../../support/page-objects/ArfpPages';
import SSpherePages from '../../../support/page-objects/SSpherePages';
import StrafficPages from '../../../support/page-objects/StrafficPages';
import TrafficPages from '../../../support/page-objects/TrafficPages';
import AEInboxPages from '../../../support/page-objects/AEInboxPages';
import ElevenPages from '../../../support/page-objects/ElevenPages';
import EportPages from '../../../support/page-objects/EportPages';

const arfpPages = new ArfpPages;
const sSpherePages = new SSpherePages;
const sTrafficPages = new StrafficPages;
const trafficPages = new TrafficPages;
const aeInboxPages = new AEInboxPages;
const elevenPages = new ElevenPages;
const ePortPages = new EportPages;

let environmentsParam;

before(function () {
    cy.fixture('/environment/environments.json').then((data) => {
        environmentsParam = data;
    });
});

Given('Visit ARFP {string} environment', environment => {
    if (environment === 'QA') {
        cy.visit(environmentsParam.arfpUrlQa);
    } else if (environment === 'UAT') {
        cy.visit(environmentsParam.arfpUrlUat);
    };
    arfpPages.pageTitle().should('have.text', 'Sign In');
    cy.screenshot();
});

Given('Login to {string} ARFP home page', environment => {
    if (environment === 'QA') {
        arfpPages.usernameBox().type(environmentsParam.arfpUrlUsernameQa);
        arfpPages.passwordBox().type(environmentsParam.arfpUrlPasswordQa);
    } else if (environment === 'UAT') {
        arfpPages.usernameBox().type(environmentsParam.arfpUrlUsernameUat);
        arfpPages.passwordBox().type(environmentsParam.arfpUrlPasswordUat);
    };
    arfpPages.loginButton().click();
    cy.title().should('eq', 'Home - RFP');
    cy.screenshot();
});

Given('Logout from ARFP', () => {
    arfpPages.signOutButton().click({ force: true });
    arfpPages.pageTitle().should('have.text', 'Sign In');
    cy.screenshot();
});

Given('Visit Stratasphere {string} environment', environment => {
    if (environment === 'QA') {
        cy.visit(environmentsParam.ssphereUrlQa);
    } else if (environment === 'UAT') {
        cy.visit(environmentsParam.ssphereUrlUat);
    };
    sSpherePages.pageTitle().should('include.text', ' Login');
    cy.screenshot();
});

Given('Login to {string} Stratasphere home page', environment => {
    if (environment === 'QA') {
        sSpherePages.usernameBox().type(environmentsParam.ssphereUsernameQa);
        sSpherePages.passwordBox().type(environmentsParam.sspherePasswordQa);
    } else if (environment === 'UAT') {
        sSpherePages.usernameBox().type(environmentsParam.ssphereUsernameUat);
        sSpherePages.passwordBox().type(environmentsParam.sspherePasswordUat);
    };
    sSpherePages.loginButton().click();
    sSpherePages.menuDropdownToggle().should('be.visible');
    cy.screenshot();
});

Given('Logout from Stratasphere', () => {
    sSpherePages.userSettingsDropdown(15000).click({ force: true });
    sSpherePages.logOutButton().click({ force: true });
    sSpherePages.pageTitle().should('include.text', ' Login');
    cy.screenshot();
});

Given('Visit sTraffic {string} environment', environment => {
    if (environment === 'QA') {
        cy.visit(environmentsParam.sTrafficUrlQa);
    } else if (environment === 'UAT') {
        cy.visit(environmentsParam.sTrafficUrlUat);
    };
    cy.title().should('eq', 'Sign In');
    cy.screenshot();
});

Given('Login to {string} sTraffic home page', environment => {
    if (environment === 'QA') {
        sTrafficPages.usernameBox().type(environmentsParam.sTrafficUsernameQa);
        sTrafficPages.passwordBox().type(environmentsParam.sTrafficPasswordQa);
    } else if (environment === 'UAT') {
        sTrafficPages.usernameBox().type(environmentsParam.sTrafficUsernameUat);
        sTrafficPages.passwordBox().type(environmentsParam.sTrafficPasswordUat);
    };
    sTrafficPages.loginButton().click();
    cy.title().should('eq', 'STRATA sTraffic Traffic Status');
    cy.screenshot();
});

Given('Logout from sTraffic', () => {
    sTrafficPages.logoutButton().click({ force: true })
    cy.title().should('eq', 'Sign In')
    cy.screenshot();
});

Given('Visit Traffic {string} environment', environment => {
    if (environment === 'QA') {
        cy.visit(environmentsParam.trafficUrlQa);
    } else if (environment === 'UAT') {
        cy.visit(environmentsParam.trafficUrlUat);
    };
    cy.title().should('eq', 'AEINBOX® for Traffic Instruction - Login')
    cy.screenshot();
});

Given('Login to {string} Traffic home page', environment => {
    if (environment === 'QA') {
        trafficPages.usernameBox().type(environmentsParam.trafficUsernameQa);
        trafficPages.passwordBox().type(environmentsParam.trafficPasswordQa);
    } else if (environment === 'UAT') {
        trafficPages.usernameBox().type(environmentsParam.trafficUsernameUat);
        trafficPages.passwordBox().type(environmentsParam.trafficPasswordUat);
    };
    trafficPages.loginButton().click();
    cy.title().should('eq', 'Traffic Instruction - Manage User');
    cy.screenshot();

});

Given('Logout from Traffic', () => {
    trafficPages.logoutButton().click();
    cy.title().should('eq', 'AEINBOX® for Traffic Instruction - Login');
    cy.screenshot();
});

Given('Visit AEInbox {string} environment', environment => {
    if (environment === 'QA') {
        cy.visit(environmentsParam.aeInboxUrlQa);
    } else if (environment === 'UAT') {
        cy.visit(environmentsParam.aeInboxUrlUat);
    }
    cy.title().should('eq', 'AEInbox®');
    cy.screenshot();
});

Given('Login to {string} AEInbox home page', environment => {
    if (environment === 'QA') {
        aeInboxPages.usernameBox().type(environmentsParam.aeInboxUsernameQa);
        aeInboxPages.passwordBox().type(environmentsParam.aeInboxPasswordQa);
    } else if (environment === 'UAT') {
        aeInboxPages.usernameBox().type(environmentsParam.aeInboxUsernameUat);
        aeInboxPages.passwordBox().type(environmentsParam.aeInboxPasswordUat);
    };
    aeInboxPages.loginButton().click();
    cy.title().should('eq', 'AEInbox - Administration');
    cy.screenshot();
});

Given('Logout from AEInbox', () => {
    aeInboxPages.logoutButton().click();
    cy.title().should('eq', 'AEInbox®');
    cy.screenshot();
});

Given('Visit ePort {string} environment', environment => {
    if (environment === 'QA') {
        cy.visit(environmentsParam.ePortUrlQa);
    } else if (environment === 'UAT') {
        cy.visit(environmentsParam.ePortUrlUat);
    };
    cy.title().should('eq', 'ePort');
    cy.screenshot();
});

Given('Login to {string} ePort home page', environment => {
    if (environment === 'QA') {
        ePortPages.usernameBox().type(environmentsParam.ePortUsernameQa);
        ePortPages.passwordBox().type(environmentsParam.ePortPasswordQa);
    } else if (environment === 'UAT') {
        ePortPages.usernameBox().type(environmentsParam.ePortUsernameUat);
        ePortPages.passwordBox().type(environmentsParam.ePortPasswordUat);
    };
    ePortPages.loginButton().click();
    cy.title().should('eq', 'ePort');
    cy.screenshot();
});

Given('Logout from ePort', () => {
    ePortPages.logoutButton().click();
    cy.title().should('eq', 'ePort Home');
    cy.screenshot();
});

Given('Visit Eleven {string} environment', environment => {
    if (environment === 'QA') {
        cy.visit(environmentsParam.elevenUrlQa);
    } else if (environment === 'UAT') {
        cy.visit(environmentsParam.elevenUrlUat);
    };
    cy.title().should('eq', 'Eleven: Login')
    cy.screenshot();
});

Given('Login to {string} Eleven home page', environment => {
    if (environment === 'QA') {
        elevenPages.usernameBox().type(environmentsParam.elevenUsernameQa);
        elevenPages.passwordBox().type(environmentsParam.elevenPasswordQa);
    } else if (environment === 'UAT') {
        elevenPages.usernameBox().type(environmentsParam.elevenUsernameUat);
        elevenPages.passwordBox().type(environmentsParam.elevenPasswordUat);
    };
    elevenPages.loginButton().click();
    cy.title().should('eq', 'Eleven');
    cy.screenshot();
});

Given('Logout from Eleven', () => {
    elevenPages.logoutButton().click({ force: true });
    cy.title().should('eq', 'Eleven: Login');
    cy.screenshot();
});