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
    }
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
    }
    getAgencyUsername() {
        return envProperties.agencyUsername;
    }
    getAgencyPassword() {
        return envProperties.agencyPassword;
    }
    getTempAgencyPassword() {
        return envProperties.tempAgencyPassword;
    }
    getSsphereUrl() {
        return envProperties.ssphereUrl;
    }
    getSsphereUsername() {
        return envProperties.ssphereUsername;
    }
    getSspherePassword() {
        return envProperties.sspherePassword;
    }
    getMailinatorUrl() {
        return envProperties.mailinatorUrl;
    }
}
export default EnvUtils;