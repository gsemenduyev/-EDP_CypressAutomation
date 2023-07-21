/// <reference types="Cypress" />
import { Given } from "@badeball/cypress-cucumber-preprocessor";
import AgencyLoginPage from "../../../support/page-objects/agency-pages/AgencyLoginPage";
import MailinatorHomePage from "../../../support/page-objects/mailinator-pages/MailinatorHomePage";
import EnvUtils from "../../../support/utils/EnvUtils"
import AgencyBasePage from '../../../support/page-objects/agency-pages/AgencyBasePage';

const agencyBasePage = new AgencyBasePage;
const agencyLoginPage = new AgencyLoginPage;
const envUtils = new EnvUtils;

const ENV = Cypress.env('ENV');
const PASSWORD_RESET_MSG = 'Password has been reset';

//Requests new password link and set 'Temporary, Permanent' password {string}
Given('Request new password link and set {string} password', string => {
    var agencyPassword;
    var index = 0;
    var retries = 20;

    // Requests new password
    const requestPassword = () => {
        if (index === retries) {
            throw new Error(`Can't reset the password after ${retries} attempts.`)
        }
        cy.visit(envUtils.getAgencyUrl());
        agencyBasePage.pageTitle().should('have.text', 'Sign In');
        agencyLoginPage.forgotPasswordButton().click()
        agencyLoginPage.usernameBox().type(envUtils.getAgencyUsername());
        agencyLoginPage.submitButton().click()
        agencyLoginPage.forgotPasswordConformation().should('include.text', 'Email has been sent').screenshot()

        cy.visit(`${envUtils.getMailinatorUrl()}?to=${envUtils.getAgencyUsername().substr(0, envUtils.getAgencyUsername().indexOf('@'))}`).then(() => {
            cy.origin(envUtils.getMailinatorUrl(), () => {
                cy.title().should('eq', 'Mailinator');
                const tempPage = Cypress.require('../../../support/page-objects/mailinator-pages/MailinatorHomePage')
                const mailinatorHomePage = new tempPage;
                cy.reload()
                mailinatorHomePage.publicInboxes().click()
                mailinatorHomePage.forgotPasswordEmail(120000).should('exist')
                mailinatorHomePage.emailTiming().then(el => {
                   if (el.text().trim() === 'just now' || el.text().trim() === '1 min') {
                        mailinatorHomePage.forgotPasswordEmail().click();
                   }
                })
                mailinatorHomePage.publicMessageText(120000).should('include.text', 'Forgot Password for RFP');
                mailinatorHomePage.forgotPasswordLink()
                    .invoke('attr', 'target', '_parent')
                    .click({ force: true })
            })
        });

        // Verify Requests for new password was sent
        cy.is_element_exists(agencyLoginPage.submitButtonSyntax()).then(el => {
            if (el === false && index < retries) {
                index++;
                requestPassword();
            } else {
                if (string === 'Temporary') {
                    agencyPassword = envUtils.getTempAgencyPassword();
                } else if (string === 'Permanent') {
                    agencyPassword = envUtils.getAgencyPassword();
                }
                cy.screenshot()
                agencyLoginPage.newPasswordInput().type(agencyPassword, { log: false })
                agencyLoginPage.conformNewPasswordInput().type(agencyPassword, { log: false })
                agencyLoginPage.submitButton().click()
                cy.is_element_exists(agencyLoginPage.resetPasswordConformationMsgSyntax()).then(el => {
                    if (el === false && index < retries) {
                        index++;
                        requestPassword();
                    } else {
                        cy.get(agencyLoginPage.resetPasswordConformationMsgSyntax()).then((message) => {
                            if (message.text().trim().includes(PASSWORD_RESET_MSG)) {
                                expect(message.text().trim()).includes(PASSWORD_RESET_MSG)
                                cy.screenshot()
                            } else {
                                index++;
                                requestPassword();
                            }
                        })
                    }
                })
            }
        })
    }
    requestPassword()
})