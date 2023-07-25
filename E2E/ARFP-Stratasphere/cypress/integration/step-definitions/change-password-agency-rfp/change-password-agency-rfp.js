/// <reference types="Cypress" />
import { Given } from "@badeball/cypress-cucumber-preprocessor";
import MailinatorHomePage from "../../../support/page-objects/mailinator-pages/MailinatorHomePage";
import EnvUtils from "../../../support/utils/EnvUtils"

const mailinatorHomePage = new MailinatorHomePage;
const envUtils = new EnvUtils;
const ENV = Cypress.env('ENV');
const PASSWORD_RESET_MSG = 'Password has been reset';
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

// Delete 'Forgot Password' email
afterEach(function () {
    cy.visit(`${envProperties.mailinatorUrl}?to=${envProperties.agencyUsername.substr(0, envProperties.agencyUsername.indexOf('@'))}`)
    cy.title().should('eq', 'Mailinator')
    mailinatorHomePage.search_email('Forgot Password for ', 'RFP')
    cy.log('Delete Forgot Password email')
    mailinatorHomePage.deleteEmailButton().click({ force: true })
})

//Requests new password link and set 'Temporary, Permanent' password {string} minute
Given('Request new password link and set {string} password', string => {
    var agencyPassword;
    cy.visit(`${envUtils.getMailinatorUrl()}?to=${envUtils.getAgencyUsername().substr(0, envUtils.getAgencyUsername().indexOf('@'))}`)
    cy.title().should('eq', 'Mailinator');

    // Requests new password
    cy.request_agency_password(envUtils.getAgencyUrl(), envProperties.agencyUsername)
    cy.visit(`${envUtils.getMailinatorUrl()}?to=${envUtils.getAgencyUsername().substr(0, envUtils.getAgencyUsername().indexOf('@'))}`)
    cy.title().should('eq', 'Mailinator');
    mailinatorHomePage.search_email('Forgot Password for ', 'RFP')
    mailinatorHomePage.publicMessageText(600).should('include.text', 'Forgot Password for RFP');
    mailinatorHomePage.forgotPasswordLink()
        .invoke('attr', 'target', '_parent')
        .click({ force: true })

    // Verify Requests for new password was sent.
    const sentArgs = {
        password: string,
        agencyPermPassword: envProperties.agencyPassword,
        agencyTempPassword: envProperties.tempAgencyPassword,
        passwordResetMsg: PASSWORD_RESET_MSG,
    };

    cy.origin(envUtils.getAgencyUrl(), { args: sentArgs }, ({ password, agencyPermPassword, agencyTempPassword, passwordResetMsg }) => {
        Cypress.require('../../../support/commands')
        const tempPage = Cypress.require('../../../support/page-objects/agency-pages/AgencyLoginPage')
        const agencyLoginPage = new tempPage;
        cy.is_element_exists(agencyLoginPage.submitButtonSyntax()).then(submitButton => {
            if (submitButton === true) {
                if (password === 'Temporary') {
                    agencyPassword = agencyTempPassword;
                } else if (password === 'Permanent') {
                    agencyPassword = agencyPermPassword;
                }
                agencyLoginPage.newPasswordInput().type(agencyPassword, { log: false })
                agencyLoginPage.conformNewPasswordInput().type(agencyPassword, { log: false })
                agencyLoginPage.submitButton().click()
                cy.screenshot()
            }
        })

        // Verify 'Requests sent' for new password was 
        cy.get(agencyLoginPage.resetPasswordConformationMsgSyntax()).then((message) => {
            expect(message.text().trim()).includes(passwordResetMsg)
            cy.screenshot()
        })
    })
})