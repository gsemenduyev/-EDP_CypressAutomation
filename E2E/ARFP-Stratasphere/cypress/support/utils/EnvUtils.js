const ENV = Cypress.env('ENV');
const DOMAIN = Cypress.env('DOMAIN');
let envProperties;

before(function () {
    if (ENV === 'Production') {
        cy.log(`Environment - ${ENV}`);
        cy.fixture('/environment/prod-param.json').then(function (data) {
            envProperties = data;
        });

        Cypress.env({
            ARFP_CREDENTIALS_FILE: Cypress.env('ARFP_PROD').CREDENTIALS_FILE,
            ARFP_TOKEN_FILE: Cypress.env('ARFP_PROD').TOKEN_FILE,
            SSPHERE_CREDENTIALS_FILE: Cypress.env('SSPHERE_PROD').CREDENTIALS_FILE,
            SSPHERE_TOKEN_FILE: Cypress.env('SSPHERE_PROD').TOKEN_FILE,
        });

    } else if (ENV === 'UAT') {
        cy.log(`Environment - ${ENV}`);
        cy.fixture('/environment/uat-param.json').then(function (data) {
            envProperties = data;
        });

        Cypress.env({
            ARFP_CREDENTIALS_FILE: Cypress.env('ARFP_UAT').CREDENTIALS_FILE,
            ARFP_TOKEN_FILE: Cypress.env('ARFP_UAT').TOKEN_FILE,
            SSPHERE_CREDENTIALS_FILE: Cypress.env('SSPHERE_UAT').CREDENTIALS_FILE,
            SSPHERE_TOKEN_FILE: Cypress.env('SSPHERE_UAT').TOKEN_FILE,
        });

    } else {
        cy.log(`Environment - QA`);
        cy.fixture('/environment/qa-param.json').then(function (data) {
            envProperties = data;
        });

        Cypress.env({
            ARFP_CREDENTIALS_FILE: Cypress.env('ARFP_QA').CREDENTIALS_FILE,
            ARFP_TOKEN_FILE: Cypress.env('ARFP_QA').TOKEN_FILE,
            SSPHERE_CREDENTIALS_FILE: Cypress.env('SSPHERE_QA').CREDENTIALS_FILE,
            SSPHERE_TOKEN_FILE: Cypress.env('SSPHERE_QA').TOKEN_FILE,
        });

    };
});

before(function () {
    cy.writeFile('cypress/reports/run-info/run-env.json', {
        agencyUrl: envProperties.agencyUrl,
        ssphereUrl: envProperties.ssphereUrl,
        mailinatorUrl: envProperties.mailinatorUrl,
        env: envProperties.env,
    })
})

class EnvUtils {
    getAgencyUrl() {
        return envProperties.agencyUrl;
    };
    getAgencyUsername() {
        if (DOMAIN === 'Mailinator') {
            return envProperties.agencyUsername.mailinator;
        } else {
            return envProperties.agencyUsername.gmail;
        };
    };
    getAgencyPassword() {
        return envProperties.agencyPassword;
    };
    getTempAgencyPassword() {
        return envProperties.tempAgencyPassword;
    };
    getSsphereUrl() {
        return envProperties.ssphereUrl;
    };
    getSsphereUsername() {
        if (DOMAIN === 'Mailinator') {
            return envProperties.ssphereUsername.mailinator;
        } else {
            return envProperties.ssphereUsername.gmail;
        };
    };
    getSspherePassword() {
        if (DOMAIN === 'Mailinator') {
            return envProperties.sspherePassword.mailinator;
        } else {
            return envProperties.sspherePassword.gmail;
        };
    };
    getMailinatorUrl() {
        return envProperties.mailinatorUrl;
    };
    getNoReplStrataSsEmail() {
        return envProperties.noReplStrataSsEmail;
    };
    getNoReplStrataArfpEmail() {
        return envProperties.noReplStrataArfpEmail;
    };
}
export default EnvUtils;