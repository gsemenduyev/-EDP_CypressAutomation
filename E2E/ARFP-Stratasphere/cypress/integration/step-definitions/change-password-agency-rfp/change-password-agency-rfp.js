/// <reference types="Cypress" />
import { Given } from "@badeball/cypress-cucumber-preprocessor";
import MailinatorHomePage from "../../../support/page-objects/mailinator-pages/MailinatorHomePage";
import CentralLoginPage from "../../../support/page-objects/central-login-pages/CentralLoginPage";
import GmailBodyPage from "../../../support/page-objects/gmail-pages/GmailBodyPage";
import AgencyLoginPage from '../../../support/page-objects/agency-pages/AgencyLoginPage';
import EnvUtils from "../../../support/utils/EnvUtils";

const mailinatorHomePage = new MailinatorHomePage;
const centralLoginPage = new CentralLoginPage
const gmailBodyPage = new GmailBodyPage;
const agencyLoginPage = new AgencyLoginPage;

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
    if (envUtils.getSsphereUsername().endsWith('mailinator.com')) {
        request_password_mailinator_user();
    } else if (envUtils.getSsphereUsername().endsWith('gmail.com')) {
        request_password_gmail_user();
    };
});

// Open Forgot Password email and click on restore password link
Given('Open Forgot Password email and click on restore password link', () => {
    if (envUtils.getSsphereUsername().endsWith('mailinator.com')) {
        forgot_password_email_mailinator_user();
    } else if (envUtils.getSsphereUsername().endsWith('gmail.com')) {
        forgot_password_email_gmail_user();
    };
});

// Set 'Temporary, Permanent' password
Given('Set {string} password', password => {
    if (envUtils.getSsphereUsername().endsWith('mailinator.com')) {
        set_password_mailinator_user(password);
    } else if (envUtils.getSsphereUsername().endsWith('gmail.com')) {
        set_password_gmail_user(password);
    };
});

function request_password_mailinator_user() {
    cy.visit(`${envUtils.getMailinatorUrl()}?to=${envUtils.getAgencyUsername().substr(0, envUtils.getAgencyUsername().indexOf('@'))}`);
    cy.title().should('eq', 'Mailinator');
    cy.visit(envUtils.getAgencyUrl());
    cy.dataSession('startingRfpUrl').then(($startingRfpUrl) => {
        const sentArgs = {
            agencyUsername: envProperties.agencyUsername.mailinator,
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
                centralLoginPage.forgotPassword().click();
                centralLoginPage.resetPasswordText().should('have.text', 'To reset your password,  enter your e-mail address below.');
                centralLoginPage.loginEmail().type(agencyUsername);
                centralLoginPage.submitButton().click();
                centralLoginPage.emailSendText().should('include.text', 'E-mail successfully sent');
            };
        });
    });
};

function request_password_gmail_user() {
    cy.visit(envUtils.getAgencyUrl());
    cy.dataSession('startingRfpUrl').then(($startingRfpUrl) => {

        if (envUtils.getAgencyUrl().includes($startingRfpUrl)) {
            agencyLoginPage.pageTitle(5000).should('have.text', 'Sign In');
            agencyLoginPage.forgotPasswordButton().click();
            agencyLoginPage.pageTitle(5000).should('have.text', 'Forgot Password');
            agencyLoginPage.usernameBox().type(envUtils.getAgencyUsername());
            agencyLoginPage.submitButton().click();
            agencyLoginPage.forgotPasswordConformation().should('include.text', 'Email has been sent').screenshot();
        } else {
            // Central Login feature is onn
            centralLoginPage.forgotPassword().click();
            centralLoginPage.resetPasswordText().should('have.text', 'To reset your password,  enter your e-mail address below.');
            centralLoginPage.loginEmail().type(envUtils.getAgencyUsername());
            centralLoginPage.submitButton().click();
            centralLoginPage.emailSendText().should('include.text', 'E-mail successfully sent');
        };
    });
    cy.screenshot()
};

function forgot_password_email_mailinator_user() {
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
};

function forgot_password_email_gmail_user() {
    let emailSubject;
    let from;
    if (Cypress.env('CENTRAL_LOGIN_ONN')) {
        emailSubject = 'Reset your password';
        from = envUtils.getNoReplStrataEmail();
    } else if (!Cypress.env('CENTRAL_LOGIN_ONN')) {
        emailSubject = 'Forgot Password for RFP';
        from = envUtils.getNoReplBounceStrataEmail();
    };
    cy.get_gmail(
        Cypress.env('ARFP_GMAIL_DATES'),
        Cypress.env('ARFP_CREDENTIALS_FILE'),
        Cypress.env('ARFP_TOKEN_FILE'),
        from,
        emailSubject,
        60,
        5000
    );
};

function set_password_mailinator_user(password) {
    var agencyPassword;
    cy.dataSession('startingRfpUrl').then(($startingRfpUrl) => {
        const sentArgs = {
            password: password,
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
};

function set_password_gmail_user(password) {
    if (Cypress.env('CENTRAL_LOGIN_ONN')) {
        cy.visit(Cypress.env('GMAIL_HTML_PATH'));
    } else if (!Cypress.env('CENTRAL_LOGIN_ONN')) {
        cy.txt_file_to_html(Cypress.env('GMAIL_TXT_PATH'), Cypress.env('GMAIL_HTML_UPDATED_PATH'));
        cy.visit(Cypress.env('GMAIL_HTML_UPDATED_PATH'));
    };
    cy.screenshot();
    gmailBodyPage.arfpResetPswButton().invoke('attr', 'target', '_parent').click({ force: true });
    let agencyPassword;
    cy.dataSession('startingRfpUrl').then(($startingRfpUrl) => {
        if (password === 'Temporary') {
            agencyPassword = envProperties.tempAgencyPassword;
        } else if (password === 'Permanent') {
            agencyPassword = envProperties.agencyPassword;
        };

        if (envUtils.getAgencyUrl().includes($startingRfpUrl)) {
            agencyLoginPage.newPasswordInput(60000).type(agencyPassword, { log: false });
            agencyLoginPage.conformNewPasswordInput().type(agencyPassword, { log: false });
            cy.screenshot();
            agencyLoginPage.submitButton().click();

            // Verify Password has been reset 
            cy.get(agencyLoginPage.resetPasswordConformationMsgSyntax(), { timeout: 60000 }).then((message) => {
                expect(message.text().trim()).includes(PASSWORD_RESET_MSG);
                cy.screenshot();
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
                expect(message.text().trim()).includes(PASSWORD_RESET_MSG);
                cy.screenshot();
            });
        };
    });
}