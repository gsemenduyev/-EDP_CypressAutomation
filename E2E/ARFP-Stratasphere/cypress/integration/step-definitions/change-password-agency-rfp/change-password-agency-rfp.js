/// <reference types="Cypress" />
import { Given } from "@badeball/cypress-cucumber-preprocessor";
import MailinatorHomePage from "../../../support/page-objects/mailinator-pages/MailinatorHomePage";
import EnvUtils from "../../../support/utils/EnvUtils";

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
    } else if (ENV === 'UAT') {
        cy.log(`Environment - ${ENV}`);
        cy.fixture('/environment/uat-param.json').then(function (data) {
            envProperties = data;
        });
    }
});

// Request new password on Agency RFP Forgot Password page
Given('Request new password on Agency RFP Forgot Password page', () => {
    cy.visit(`${envUtils.getMailinatorUrl()}?to=${envUtils.getAgencyUsername().substr(0, envUtils.getAgencyUsername().indexOf('@'))}`);
    cy.title().should('eq', 'Mailinator');
    cy.visit(envUtils.getAgencyUrl());
    cy.dataSession('startingRfpUrl').then(($startingRfpUrl) => {
        const sentArgs = {
            agencyUsername: envProperties.agencyUsername,
            agencyUrl: envUtils.getAgencyUrl(),
            startingRfpUrl: $startingRfpUrl
        };
        cy.origin($startingRfpUrl, { args: sentArgs }, ({ agencyUsername, agencyUrl, startingRfpUrl }) => {
            const tempPage = Cypress.require('../../../support/page-objects/agency-pages/AgencyLoginPage');
            const tempCentralLoginPage = Cypress.require('../../../support/page-objects/central-login-pages/CentralLoginPage');
            const agencyLoginPage = new tempPage;
            const centralLoginPage = new tempCentralLoginPage;

            if (agencyUrl.includes(startingRfpUrl)) {
                agencyLoginPage.pageTitle(5000).should('have.text', 'Sign In');
                agencyLoginPage.forgotPasswordButton().click();
                agencyLoginPage.pageTitle(5000).should('have.text', 'Forgot Password');
                agencyLoginPage.usernameBox().type(agencyUsername);
                agencyLoginPage.submitButton().click();
                agencyLoginPage.forgotPasswordConformation().should('include.text', 'Email has been sent').screenshot();
            } else {
                // Central Login feature is onn
                centralLoginPage.forgotPassword().click()
                centralLoginPage.resetPasswordText().should('have.text', 'To reset your password,  enter your e-mail address below.');
                centralLoginPage.loginEmail().type(agencyUsername);
                centralLoginPage.submitButton().click();
                centralLoginPage.emailSendText().should('include.text', 'E-mail successfully sent')
            }
        });
    })
})

// Open Forgot Password email and click on restore password link
Given('Open Forgot Password email and click on restore password link', () => {
    var index = 0;
    var endIndex = 30;
    const waitInterval = 5000;
    cy.visit(`${envUtils.getMailinatorUrl()}?to=${envUtils.getAgencyUsername().substr(0, envUtils.getAgencyUsername().indexOf('@'))}`)
    cy.title().should('eq', 'Mailinator');
    cy.dataSession('startingRfpUrl').then(($startingRfpUrl) => {
        if (envUtils.getAgencyUrl().includes($startingRfpUrl)) {
            const waitForgotPasswordEmail = () => {
                cy.is_element_exists(mailinatorHomePage.newRfpEmailSyntax()).then(($element) => {
                    if (!$element && index < endIndex) {
                        if (index % 4 === 0) {
                            mailinatorHomePage.goButton().click()
                        }
                        cy.log(`Waiting ${(index + 1) * waitInterval / 1000} seconds for "Forgot Password RFP" email`)
                        cy.wait(waitInterval);
                        index++;
                        waitForgotPasswordEmail();
                    } else if ($element) {
                        cy.get(mailinatorHomePage.newRfpEmailSyntax()).first().invoke('text').then(($text) => {
                            if (!$text.includes('Forgot Password for RFP') && index < endIndex) {
                                if (index % 4 === 0) {
                                    mailinatorHomePage.goButton().click()
                                }
                                cy.log(`Waiting ${(index + 1) * waitInterval / 1000} seconds for "Forgot Password RFP" email`)
                                cy.wait(waitInterval);
                                index++;
                                waitForgotPasswordEmail();
                            }
                        })
                    } else if (!$element && index === endIndex) {
                        throw new Error(`Email inbox is empty after ${index * waitInterval / 1000} seconds`);
                    }
                })
            }
            waitForgotPasswordEmail();
            const checkEmailExists = () => {
                mailinatorHomePage.emailTiming().then(el => {
                    if (el.text().trim() !== 'just now' && index < endIndex) {
                        if (index % 4 === 0) {
                            mailinatorHomePage.goButton().click()
                        }
                        cy.log(`Waiting ${(index + 1) * waitInterval / 1000} seconds for "Forgot Password RFP" email`)
                        cy.wait(waitInterval);
                        index++;
                        checkEmailExists();
                    } else if (el.text().trim() === 'just now') {
                        mailinatorHomePage.forgotPasswordEmail(300000).click();
                    }
                })
            }
            checkEmailExists();
            mailinatorHomePage.forgotPasswordLink()
                .invoke('attr', 'target', '_parent')
                .click({ force: true });
        } else {
            mailinatorHomePage.resetPasswordEmail(300000).should('exist');
            const checkEmailExists = () => {
                mailinatorHomePage.emailTiming().then(el => {
                    if (el.text().trim() !== 'just now' && index < endIndex) {
                        if (index % 4 === 0) {
                            mailinatorHomePage.goButton().click()
                        }
                        cy.log(`Waiting ${(index + 1) * waitInterval / 1000} seconds for "Forgot Password RFP" email`)
                        cy.wait(waitInterval);
                        index++;
                        checkEmailExists();
                    } else if (el.text().trim() === 'just now') {
                        mailinatorHomePage.resetPasswordEmail().click();
                    };
                });
            };
            checkEmailExists();
            mailinatorHomePage.resetPasswordLink()
                .invoke('attr', 'target', '_parent')
                .click({ force: true });
        };
    });
});

// Set 'Temporary, Permanent' password
Given('Set {string} password', string => {
    var agencyPassword;

    cy.dataSession('startingRfpUrl').then(($startingRfpUrl) => {
        const sentArgs = {
            password: string,
            agencyPermPassword: envProperties.agencyPassword,
            agencyTempPassword: envProperties.tempAgencyPassword,
            passwordResetMsg: PASSWORD_RESET_MSG,
            startingRfpUrl: $startingRfpUrl,
            agencyUrl: envUtils.getAgencyUrl(),
        };

        cy.origin($startingRfpUrl, { args: sentArgs }, ({ password, agencyPermPassword, agencyTempPassword, passwordResetMsg, startingRfpUrl, agencyUrl }) => {
            Cypress.require('../../../support/commands')
            const tempPage = Cypress.require('../../../support/page-objects/agency-pages/AgencyLoginPage')
            const tempCentralLoginPage = Cypress.require('../../../support/page-objects/central-login-pages/CentralLoginPage');
            const agencyLoginPage = new tempPage;
            const centralLoginPage = new tempCentralLoginPage;

            if (password === 'Temporary') {
                agencyPassword = agencyTempPassword;
            } else if (password === 'Permanent') {
                agencyPassword = agencyPermPassword;
            };

            if (agencyUrl.includes(startingRfpUrl)) {
                agencyLoginPage.newPasswordInput(60000).type(agencyPassword, { log: false });
                agencyLoginPage.conformNewPasswordInput().type(agencyPassword, { log: false });
                cy.screenshot();
                agencyLoginPage.submitButton().click();

                // Verify Password has been reset 
                cy.get(agencyLoginPage.resetPasswordConformationMsgSyntax(), { timeout: 60000 }).then((message) => {
                    expect(message.text().trim()).includes(passwordResetMsg);
                    cy.screenshot();
                    if (password === 'Temporary') {
                        cy.wait(60000);
                    }
                })
            } else {
                centralLoginPage.loginPassword().click({ force: true })
                centralLoginPage.loginPassword().type(agencyPassword, { log: false })
                centralLoginPage.confirmPassword().click({ force: true })
                centralLoginPage.confirmPassword().type(agencyPassword, { log: false });
                cy.screenshot();
                centralLoginPage.submitButton().click();

                // Verify Password has been reset 
                cy.get(centralLoginPage.resetPasswordMessageSyntax(), { timeout: 60000 }).then((message) => {
                    expect(message.text().trim()).includes(passwordResetMsg);
                    cy.screenshot();
                    if (password === 'Temporary') {
                        cy.wait(60000);
                    };
                });
            };
        });
    });
});