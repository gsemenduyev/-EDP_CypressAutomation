/// <reference types="Cypress" />
import { Given } from "@badeball/cypress-cucumber-preprocessor";
import AgencyLoginPage from "../../../support/page-objects/agency-pages/AgencyLoginPage";
import MailinatorHomePage from "../../../support/page-objects/mailinator-pages/MailinatorHomePage";
import EnvUtils from "../../../support/utils/EnvUtils"

const mailinatorHomePage = new MailinatorHomePage;
const agencyLoginPage = new AgencyLoginPage;
const envUtils = new EnvUtils;
const ENV = Cypress.env('ENV');
let envProperties;

before(function () {
    if (ENV === 'Production') {
        cy.log(`Environment - ${ENV}`);
        cy.fixture('/environment/prod-param.json').then(function (data) {
            envProperties = data;
        });
    } else if (ENV === 'QA' || ENV === undefined) {
        cy.log(`Environment - QA`);
        cy.fixture('/environment/qa-param.json').then(function (data) {
            envProperties = data;
        });
    }
});

// Click on Forgot Password then insert Username
Given('Click on Forgot Password then insert Username', () => {
    agencyLoginPage.forgotPasswordButton().click()
    agencyLoginPage.usernameBox().type(envUtils.getAgencyUsername());
    agencyLoginPage.submitButton().click()
    agencyLoginPage.forgotPasswordConformation().should('include.text', 'Email has been sent').screenshot()
});

// Check the email for new password request and set 'Temporary, Permanent' password
Given('Check the email for new password request and set {string} password', string => {

    mailinatorHomePage.search_email('Forgot Password for ', 'RFP');
    mailinatorHomePage.publicMessageText(5000).should('include.text', 'Forgot Password for RFP');
    const getIframeBody = () => {
        return mailinatorHomePage.emailTextMsgBodyIframe()
            .its('0.contentDocument.body')
            .then(cy.wrap);
    }
    const sentArgs = { permanentPassword: envProperties.agencyPassword, tempPassword: envProperties.tempAgencyPassword, stepParam: string }
    getIframeBody(mailinatorHomePage.emailTextMsgBodyIframe()).find('a').eq(0).invoke('attr', 'target', '_parent')
    getIframeBody(mailinatorHomePage.emailTextMsgBodyIframe()).find('a').eq(0).click({ force: true })

    cy.origin(envProperties.agencyUrl, { args: sentArgs }, ({ permanentPassword, tempPassword, stepParam }) => {
        const tempPage = Cypress.require('../../../support/page-objects/agency-pages/AgencyLoginPage')
        const agencyLoginPage = new tempPage;
        var agencyPassword;

        if (stepParam === 'Temporary') {
            agencyPassword = tempPassword;
        } else if (stepParam === 'Permanent') {
            agencyPassword = permanentPassword;
        }
        cy.screenshot()
        agencyLoginPage.newPasswordInput().type(agencyPassword, { log: false })
        agencyLoginPage.conformNewPasswordInput().type(agencyPassword, { log: false })
        agencyLoginPage.submitButton().click()
        cy.screenshot()
    })
    // Delete Forgot Password email
    cy.visit(`${envProperties.mailinatorUrl}?to=${envProperties.agencyUsername.substr(0, envProperties.agencyUsername.indexOf('@'))}`)
    cy.title().should('eq', 'Mailinator')
    mailinatorHomePage.search_email('Forgot Password for ', 'RFP')
    mailinatorHomePage.deleteEmailButton().click()
});