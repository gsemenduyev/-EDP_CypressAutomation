const ENV = Cypress.env('ENV');
let envProperties;

before(function () {
    if (ENV === 'Production') {
        cy.log(`Environment - ${ENV}`);
        cy.fixture('/environment/prod-param.json').then(function (data) {
            envProperties = data;
        });
    } else if (ENV === 'QA' || ENV === undefined) {
        cy.log(`Environment - ${ENV}`);
        cy.fixture('/environment/qa-param.json').then(function (data) {
            envProperties = data;
        });
    }
});

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
    setReportRunInfoEnv(){
     //   cy.writeFile('cypress/fixtures/environment/temp-env.json', {'cypress/reports/temp-env.json'
         cy.writeFile('cypress/reports/run-info/run-env.json', {
         agencyUrl: envProperties.agencyUrl,
         ssphereUrl: envProperties.ssphereUrl,
         mailinatorUrl: envProperties.mailinatorUrl
     })
    }
}
export default EnvUtils;