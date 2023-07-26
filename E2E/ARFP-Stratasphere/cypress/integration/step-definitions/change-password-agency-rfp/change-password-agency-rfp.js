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

//Requests new password link and set 'Temporary, Permanent' password
Given('Request new password link and set {string} password', string => {
    var agencyPassword;
    var index = 0;
    cy.visit(`${envUtils.getMailinatorUrl()}?to=${envUtils.getAgencyUsername().substr(0, envUtils.getAgencyUsername().indexOf('@'))}`)
    cy.title().should('eq', 'Mailinator');

    // Requests new password
    cy.request_agency_password(envUtils.getAgencyUrl(), envProperties.agencyUsername);
    cy.visit(`${envUtils.getMailinatorUrl()}?to=${envUtils.getAgencyUsername().substr(0, envUtils.getAgencyUsername().indexOf('@'))}`)
    cy.title().should('eq', 'Mailinator');
    mailinatorHomePage.forgotPasswordEmail(300000).should('exist');
    const checkEmailExists = () => {
        mailinatorHomePage.emailTiming().then(el => {
            if (el.text().trim() !== 'just now' && index < 20) {
                cy.reload();
                cy.wait(5000);
                index++;
                checkEmailExists();
            } else if (el.text().trim() === 'just now') {
                mailinatorHomePage.forgotPasswordEmail().click();
            }
        })
    }
    checkEmailExists();

    mailinatorHomePage.publicMessageText(600).should('include.text', 'Forgot Password for RFP');
    mailinatorHomePage.forgotPasswordLink()
        .invoke('attr', 'target', '_parent')
        .click({ force: true })

    // Reset password.
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
        if (password === 'Temporary') {
            agencyPassword = agencyTempPassword;
        } else if (password === 'Permanent') {
            agencyPassword = agencyPermPassword;
        }
        agencyLoginPage.newPasswordInput(60000).type(agencyPassword, { log: false })
        agencyLoginPage.conformNewPasswordInput().type(agencyPassword, { log: false })
        agencyLoginPage.submitButton().click()

        // Verify Password has been reset 
        cy.get(agencyLoginPage.resetPasswordConformationMsgSyntax(), { timeout: 60000 }).then((message) => {
            expect(message.text().trim()).includes(passwordResetMsg)
            cy.screenshot()
        })
        if (password === 'Temporary') {
            cy.wait(60000);
        }

    })
})