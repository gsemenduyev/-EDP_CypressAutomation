/// <reference types="Cypress" />
import { Given } from "@badeball/cypress-cucumber-preprocessor";
import EnvUtils from "../../../support/utils/EnvUtils";
import TrafficLoginPage from "../../../support/page-objects/traffic-pages/TrafficLoginPage";
import TrafficRegRequestPage from "../../../support/page-objects/traffic-pages/TrafficRegRequestPage";

const envUtils = new EnvUtils;
const trafficLoginPage = new TrafficLoginPage;
const trafficRegRequestPage = new TrafficRegRequestPage;

const NEW_USER_FILE = 'cypress/fixtures/new-user/new-user-param.json';
const RANDOM = Math.floor(Math.random() * (1000000, 9999999)) + 1000000;
const NEW_USER_DATA = {
    email: `TestUser${RANDOM}@mailinator.com`,
    firstName: 'Test',
    lastName: `User${RANDOM}`,
    phoneNumber: '123-456-7890',
    vendor: 'TEST TRAFFIC-AM',
    password: '-',
    jobTitle: 'QA Tester'
};

Given('Visit Traffic login page', () => {
    cy.visit(envUtils.getTrafficUrl());
    cy.title().should('eq', 'AEINBOX® for Traffic Instruction - Login')
    trafficLoginPage.usernameBox().should('exist');
    trafficLoginPage.passwordBox().should('exist');
    trafficLoginPage.signInBtn().should('exist');
    trafficLoginPage.requestBtn().should('exist');
    trafficLoginPage.userGuideBtn().should('exist');
    // Verifies link "Forgot your password?"
    verify_link(trafficLoginPage.forgotPasswordLink());
    // Verifies link "User Agreement"
    verify_link(trafficLoginPage.footerLinks(0));
    // Verifies link "Privacy Policy"
    verify_link(trafficLoginPage.footerLinks(1));
    // Verifies link "Request Help"
    verify_link(trafficLoginPage.footerLinks(2));
    cy.screenshot();
});

Given('Visit Forgot your password page', () => {
    trafficLoginPage.forgotPasswordLink().click();
    cy.title().should('eq', 'Traffic Instruction - Reset password')
    trafficLoginPage.forgotPswUserNameBox().should('exist');
    trafficLoginPage.forgotPswEmailBox().should('exist');
    trafficLoginPage.regeneratePswBtn().should('exist');
    // Verifies link "Need Help? Click here to submit a support case."
    verify_link(cy.get('a').eq(1));
    cy.screenshot();
    cy.go('back');
});

Given('Visit User Agreement page', () => {
    trafficLoginPage.footerLinks(0).invoke('removeAttr', 'target').click();
    cy.title().should('eq', 'Traffic Instruction - Terms of Service')
    const actualUserAgreement = [];
    trafficLoginPage.userAgreementParagraphs().each(($actualArgument) => {
        actualUserAgreement.push($actualArgument.text().trim());
    }).then(() => {
        cy.readFile('cypress/fixtures/stores/expected-user-agreement.json').each(($data, $index) => {
            expect(actualUserAgreement).contain($data[`Paragraph - ${$index}`].trim())
        });
    });
    cy.screenshot();
    cy.go('back');
});

Given('Visit Privacy Policy page', () => {
    trafficLoginPage.footerLinks(1).invoke('removeAttr', 'target').click();
    cy.title().should('eq', 'Privacy Policy')
    trafficLoginPage.privacyPolicyParagraphs()
    // Verify Privacy Policy Text
    const actualPrivacyPolicy = [];
    trafficLoginPage.privacyPolicyParagraphs().each(($actualPrivacyPolicy) => {
        actualPrivacyPolicy.push($actualPrivacyPolicy.text().trim());
    }).then(() => {
        cy.readFile('cypress/fixtures/stores/privacy-policy.json').each(($data, $index) => {
            expect(actualPrivacyPolicy).contain($data[`Paragraph - ${$index}`].trim())
        });
    });
    verify_link(cy.get('a').eq(1));
    verify_link(cy.get('a').eq(4));
    cy.screenshot();
    cy.go('back');
});

Given('Navigate to Registration Request Form page', () => {
    trafficLoginPage.requestBtn().click();
    // Verifies text in Google alert window pop-up
    cy.on('window:confirm', ($popupMsg) => {
        expect($popupMsg).to.contains(
            'This system is intended only for use by traffic managers ' +
            'to receive and approve traffic instructions. If you are a ' +
            'sales user, you can register for an account at http://aeinbox.com, ' +
            'or contact 1-800-9STRATA for assistance. If you are a traffic user, ' +
            'click OK to register for an account.'
        );
    });
    cy.title().should('eq', 'AEINBOX® for Traffic Instruction - Registration')
    cy.screenshot();
    trafficRegRequestPage.step1Ctr().should('exist').and('have.class', 'current-step');
    trafficRegRequestPage.step2Ctr().should('exist');
    trafficRegRequestPage.step3Ctr().should('exist');
});

Given('Add user information to the Registration Request Form', () => {
    cy.save_new_user_data(NEW_USER_FILE, NEW_USER_DATA)
    trafficRegRequestPage.step1Ctr().should('exist').and('have.class', 'current-step');
    cy.readFile(NEW_USER_FILE).then(($newUserParam) => {
        trafficRegRequestPage.firstNameTxtBox().type($newUserParam.firstName);
        trafficRegRequestPage.lastNameTxtBox().type($newUserParam.lastName);
        trafficRegRequestPage.phoneTxtBox().type($newUserParam.phoneNumber);
        trafficRegRequestPage.emailTxtBox().type($newUserParam.email);
        trafficRegRequestPage.jobTitleTxtBox().type($newUserParam.jobTitle);
        cy.screenshot();
        trafficRegRequestPage.nextStep1Btn().click();
    });
});

Given('Add station information to the Registration Request Form', () => {
    trafficRegRequestPage.step2Ctr().should('exist').and('have.class', 'current-step');
    trafficRegRequestPage.showNewStationBtn().click();
    trafficRegRequestPage.newStationTxtBox().should('be.visible');
    trafficRegRequestPage.listNewStationBand().select('AM').should('have.value', 'AM');
    trafficRegRequestPage.listNewStationBand().select('FM').should('have.value', 'FM');
    trafficRegRequestPage.listNewStationBand().select('cable').should('have.value', 'cable');
    trafficRegRequestPage.addNewStationBtn().should('be.visible');
    trafficRegRequestPage.cancelNewStationBtn().click();
    trafficRegRequestPage.addNewStationBtn().should('not.be.visible');
    cy.readFile(NEW_USER_FILE).then(($newUserParam) => {
        trafficRegRequestPage.stationSearchTxtBox().type($newUserParam.vendor.split('-')[0]);
        trafficRegRequestPage.searchStationBtn().click();
        trafficRegRequestPage.lstAvailableStations().should('include.text', $newUserParam.vendor);
        trafficRegRequestPage.lstAvailableStations().select($newUserParam.vendor);
        cy.contains($newUserParam.vendor).dblclick();
        trafficRegRequestPage.selectedStationsStep2().should('have.text', $newUserParam.vendor);
        trafficRegRequestPage.selectedStationsDeleteStep2().should('be.visible');
        trafficRegRequestPage.backStep2Btn().should('be.visible');
        cy.screenshot();
        trafficRegRequestPage.nextStep2Btn().click();
    });
});

Given('Confirm the information in to the Registration Request Form', () => {
    trafficRegRequestPage.step3Ctr().should('exist').and('have.class', 'current-step');
    cy.readFile(NEW_USER_FILE).then(($newUserParam) => {
        trafficRegRequestPage.UserInfoGridStep3().should('include.text', $newUserParam.firstName);
        trafficRegRequestPage.UserInfoGridStep3().should('include.text', $newUserParam.lastName);
        trafficRegRequestPage.UserInfoGridStep3().should('include.text', $newUserParam.phoneNumber);
        trafficRegRequestPage.UserInfoGridStep3().should('include.text', $newUserParam.email);
        trafficRegRequestPage.UserInfoGridStep3().should('include.text', $newUserParam.jobTitle);
        trafficRegRequestPage.selectedStationsStep3().should('have.text', $newUserParam.vendor);
    });
    trafficRegRequestPage.backStep3Btn().should('be.visible');
    trafficRegRequestPage.cancelStep3Btn().should('be.visible');
    trafficRegRequestPage.submitBtn().click();
    trafficRegRequestPage.conformationMsg().should('have.text',
        'Thank you for registering for an account. ' +
        'Your account details will be emailed to you within 1 business day');
    cy.screenshot();
    trafficRegRequestPage.conformationMsgOkBtn().click()
    cy.title().should('eq', 'AEINBOX® for Traffic Instruction - Login')
});

// Checks the functionality of the links
function verify_link(element) {
    element.then(($link) => {
        cy.request('HEAD', $link.prop('href'))
            .its('status')
            .should('eq', 200);
    });
};