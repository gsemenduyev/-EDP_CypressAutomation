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
}
export default EnvUtils;