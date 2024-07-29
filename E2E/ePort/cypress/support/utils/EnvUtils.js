/// <reference types="cypress" />

const ENV = Cypress.env('ENV');
let envProperties;

before(function () {
    if (ENV === 'Production') {
        cy.log(`Environment - ${ENV}`);
        cy.fixture('/environment/prod-param.json').then(function (data) {
            envProperties = data;
        });
    } else if (ENV === 'UAT') {
        cy.log(`Environment - ${ENV}`);
        cy.fixture('/environment/uat-param.json').then(function (data) {
            envProperties = data;
        });
    } else {
        cy.log(`Environment - QA`);
        cy.fixture('/environment/qa-param.json').then(function (data) {
            envProperties = data;
        });
    };
});

class EnvUtils {
    getEPortUrl() {
        return envProperties.ePortUrl;
    };
    getEPortUsername() {
        return envProperties.ePortUsername;
    };
    getEPortPassword() {
        return envProperties.ePortPassword;
    };
    getEPortUserFirstName() {
        return envProperties.ePortUserFirstName;
    };
    getEPortUserLastName() {
        return envProperties.ePortUserLastName;
    };
    getElevenUrl() {
        return envProperties.elevenUrl;
    };
    getElevenUsername() {
        return envProperties.elevenUsername;
    };
    getElevenPassword() {
        return envProperties.elevenPassword;
    };
    getSeller() {
        return envProperties.seller;
    };
    getVia() {
        return envProperties.via;
    };
    getSubRepCompany() {
        return envProperties.subRepCompany;
    };
    getSubRepOffice() {
        return envProperties.subRepOffice;
    };
}
export default EnvUtils;