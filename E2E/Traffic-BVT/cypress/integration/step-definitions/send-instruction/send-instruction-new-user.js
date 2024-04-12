/// <reference types="Cypress" />
/// <reference types="cypress-data-session" />
/// <reference types="cypress-real-events"/>
import 'cypress-data-session';
import { Given } from "@badeball/cypress-cucumber-preprocessor";
import EnvUtils from "../../../support/utils/EnvUtils";
import TrafficLoginPage from "../../../support/page-objects/traffic-pages/TrafficLoginPage";
import TrafficHomePage from "../../../support/page-objects/traffic-pages/TrafficHomePage";
import sTrafficLoginPage from "../../../support/page-objects/straffic-pages/sTrafficLoginPage";
import sTrafficHomePage from "../../../support/page-objects/straffic-pages/sTrafficHomePage";


const envUtils = new EnvUtils;
const trafficLoginPage = new TrafficLoginPage;
const trafficHomePage = new TrafficHomePage;
const strafficLoginPage = new sTrafficLoginPage;
const strafficHomePage = new sTrafficHomePage;


const NEW_USER_FILE = 'cypress/fixtures/new-user/new-user-param.json';
let estimateParam;

before(function () {
    cy.fixture('estimate/estimate-param.json').then(function (data) {
        estimateParam = data;
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
        cy.readFile(NEW_USER_FILE).then(($newUserParam) => {
            trafficLoginPage.usernameBox().type($newUserParam.email);
        })
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
    save_new_user_param();
    cy.readFile(NEW_USER_FILE).then(($newUserParam) => {
        trafficHomePage.manageUserTab().click();
        trafficHomePage.createButton().click();
        trafficHomePage.cr8UserForm().should('be.visible');
        trafficHomePage.cr8UserLoginNameTxtBox().type($newUserParam.email);
        trafficHomePage.cr8UserFirstNameTxtBox().type($newUserParam.firstName);
        trafficHomePage.cr8UserLastNameTxtBox().type($newUserParam.lastName);
        trafficHomePage.cr8UserPrimaryEmailTxtBox().type($newUserParam.email);
        trafficHomePage.cr8UserSecondaryEmailTxtBox().type($newUserParam.email);
        trafficHomePage.cr8UserPhoneTxtBox().type($newUserParam.phone);
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
    });
});

Given('Verify new user was created', () => {
    trafficHomePage.manageUserTab().click();
    cy.readFile(NEW_USER_FILE).then(($newUserParam) => {
        trafficHomePage.searchTxtBox().type($newUserParam.email);
        trafficHomePage.searchButton().click();
        trafficHomePage.gridCell(0).should('be.visible');
        trafficHomePage.gridCell(0).should('have.text', $newUserParam.firstName);
        trafficHomePage.gridCell(1).should('have.text', $newUserParam.lastName);
        trafficHomePage.gridCell(2).should('have.text', $newUserParam.email);
        trafficHomePage.gridCell(3).should('have.text', $newUserParam.phone);
        trafficHomePage.gridCell(4).should('have.text', $newUserParam.email);
        trafficHomePage.gridCell(5).should('have.text', 'Traffic');
        trafficHomePage.gridCell(5).should('have.text', 'Traffic');
        trafficHomePage.gridCell(7).children().children().should('be.checked');
    });
});

Given('Assign Vendor to {string} user', user => {
    trafficHomePage.assignVendorTab().click();
    cy.readFile(NEW_USER_FILE).then(($newUserParam) => {
        if (user === 'New') {
            trafficHomePage.searchTxtBox().type($newUserParam.email);
        }
        trafficHomePage.searchButton().click();
        trafficHomePage.gridCell(0).should('be.visible');
        trafficHomePage.gridCell(0).should('have.text', $newUserParam.firstName);
        trafficHomePage.gridCell(1).should('have.text', $newUserParam.lastName);
        trafficHomePage.gridCell(2).should('have.text', $newUserParam.email);
        trafficHomePage.gridCell(3).should('have.text', $newUserParam.phone);
        trafficHomePage.gridCell(4).should('have.text', $newUserParam.email);
        trafficHomePage.gridCell(6).children().click();
        trafficHomePage.assignedVenForm().should('be.visible');
        trafficHomePage.assignedVenFormTitle().should('include.text', `View Assigned Vendors of '${$newUserParam.firstName} ${$newUserParam.lastName}`);
        trafficHomePage.goToAssignBtn().click();
        trafficHomePage.assignedVenForm().should('be.visible');
        trafficHomePage.assignedVenFormTitle().should('include.text', `Assign Vendors to '${$newUserParam.firstName} ${$newUserParam.lastName}`);
        trafficHomePage.assignVenTextBox().type($newUserParam.vendor);
        trafficHomePage.assignVenSearchBtn().click();
        trafficHomePage.assignVenGridCell(1).should('have.text', $newUserParam.vendor.split('-')[0])
        trafficHomePage.assignVenGridCell(2).should('have.text', $newUserParam.vendor.split('-')[1])
        trafficHomePage.assignVenGridCell(0).children().children().check().should('be.checked');
        trafficHomePage.assignVenBtn().click();
        trafficHomePage.assignVenGoToViewBtn().click({ timeout: 60000 });
        trafficHomePage.assignVenGridCell(1).should('have.text', $newUserParam.vendor.split('-')[0])
        trafficHomePage.assignVenGridCell(2).should('have.text', $newUserParam.vendor.split('-')[1])
        trafficHomePage.assignVenCancelBtn().click();
    });
});

Given('Login to sTraffic', () => {
    cy.visit(envUtils.getsTrafficUrl());
    cy.title().should('eq', 'Sign In')
    strafficLoginPage.usernameTxtBox().type(envUtils.getsTrafficUsername());
    strafficLoginPage.passwordTxtBox().type(envUtils.getsTrafficPassword());
    strafficLoginPage.loginBtn().click();
    cy.title().should('eq', 'STRATA sTraffic Traffic Status')
});

Given('Search for Estimate in sTraffic', () => {
    strafficHomePage.trafficStatusBtn().click();
    strafficHomePage.searchBtn().should('be.disabled');
    strafficHomePage.agencyTxtBox().type(estimateParam.agency);
    cy.contains(estimateParam.agency).click();
    strafficHomePage.loadingSign().should('be.hidden');
    var index = 0;
    const waitForDropdown = () => {
        strafficHomePage.estimateTxtBox().click();
        strafficHomePage.estimateTxtBox().should('not.have.attr', 'disabled')
        strafficHomePage.estimateTxtBox().type(`{selectall}{backspace}${envUtils.getEstimate()}`);
        cy.is_element_exists(strafficHomePage.estimateSelectSyntax()).then(($dropdown) => {
            if ($dropdown === false && index < 10) {
                index++;
                cy.wait(500);
                waitForDropdown();
            } else if ($dropdown === true || index < 10) {
                cy.contains(`${envUtils.getEstimate()} - `).click();
                index = 10;
            };
        });
    };
    waitForDropdown();
    cy.contains(envUtils.getEstimate()).should('be.visible');
    strafficHomePage.searchBtn().click();
    strafficHomePage.estimateCell().should('have.text', envUtils.getEstimate());
});

Given('Navigate to eSend Contact Editor', () => {
    strafficHomePage.estimateCell().should('have.text', envUtils.getEstimate());
    strafficHomePage.sendEstimateCell().click();
    strafficHomePage.sendSelectedStnRadioBtn().check().should('be.checked');

    var index = 0;
    const waitForDeselectAllCheckBox = () => {
        strafficHomePage.selectDeselectAllCheckBox().should('be.visible');
        strafficHomePage.selectDeselectAllCheckBox().click()
        cy.is_element_exists(strafficHomePage.selDslAllCheckBoxSyntax()).then(($dropdown) => {
            if ($dropdown === false && index < 10) {
                index++;
                cy.wait(500);
                waitForDeselectAllCheckBox();
            } else if ($dropdown === true || index < 10) {

                index = 10;
            };
        });
    };
    waitForDeselectAllCheckBox();
    strafficHomePage.selectDeselectAllCheckBox().should('be.checked');
    strafficHomePage.selectSendOption().parent().click();
    strafficHomePage.selectSendOption().select('Electronic');
    strafficHomePage.inviteMoreLink().click()
    strafficHomePage.inviteMoreCancelBtn().click()
    strafficHomePage.selectSendOption().should('have.text', 'Electronic');
    strafficHomePage.eSendContactEditor().click();
    strafficHomePage.eSendContactEditorModalBody().should('be.visible');
});

Given('Verify {string} user is listed in eSend Contact Editor', user => {
    cy.readFile(NEW_USER_FILE).then(($newUserParam) => {
        let eSendContacts;
        strafficHomePage.eSendContactRows().each(($element) => {
            eSendContacts += $element.text();
        }).then(() => {
            if (!eSendContacts.includes($newUserParam.email)) {
                cy.wait(30000);
            };
        }).then(() => {
            expect(eSendContacts).to.contain($newUserParam.email);
        });
    });
});

Given('Send Estimate from sTraffic to {string} Traffic user', user => {
    cy.readFile(NEW_USER_FILE).then(($newUserParam) => {
        strafficHomePage.eSendContactRows().each(($element) => {
            if (!$element.text().includes($newUserParam.email)
                && $element.find('img').attr('src').includes('accept')) {
                cy.wrap($element).find('img').click();
            } else if ($element.text().includes($newUserParam.email)
                && $element.find('img').attr('src').includes('cancel')) {
                cy.wrap($element).find('img').click();
            };
        })
    });
    strafficHomePage.eSendContactDoneBtn().click();
    cy.is_element_exists(strafficHomePage.toastMsgSyntax()).then(($message) => {
        if ($message === true) {
            strafficHomePage.eSendContactCancelBtn().click();
        }
    });
    strafficHomePage.trafficInstructionSendBtn().click();
    strafficHomePage.modalProgressMsg().should('not.be.visible');
    strafficHomePage.instructionSendMessage().should('include.text', 'Instructions have been sent');
    strafficHomePage.instructionSendMessageOkBtn().click();
    strafficHomePage.trafficSendCancelBtn().click();
});

Given('Logout from sTraffic', () => {
    strafficHomePage.signOutBtn().click({ force: true });
    cy.title().should('eq', 'Sign In');
});


Given('test', () => {


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
    cy.readFile(NEW_USER_FILE).its('email').should('eq', email)
};
