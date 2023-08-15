const ENV = Cypress.env('ENV');
let envProperties;

before(function () {
    if (ENV === 'Production') {
        cy.log(`Environment - ${ENV}`);
        cy.fixture('/environment/11prod-param.json').then(function (data) {
            envProperties = data;
        });
    } else if (ENV === 'QA'){
        cy.log(`Environment - QA`);
        cy.fixture('/environment/11qa-param.json').then(function (data) {
            envProperties = data;
        });
    }
    else if (ENV === 'UAT'){
        cy.log(`Environment - UAT`);
        cy.fixture('/environment/11uat-param.json').then(function (data) {
            envProperties = data;
        });
    }
});
before(function () {
    cy.writeFile('cypress/reports/run-info/run-env.json', {
        elevenUrl: envProperties.elevenUrl,
        elevenUsername: envProperties.elevenUsername,
        env: envProperties.env,
        elevenVersion: '' ,
    })
})

class EnvUtils {
    getelevenUrl() {
        return envProperties.elevenUrl;
    }
    getelevenUsername() {
        return envProperties.elevenUsername;
    }
    getelevenPassword() {
        return envProperties.elevenPassword;
    }
    getaeInboxUrl() {
        return envProperties.aeInboxUrl;
    }
    getaeInboxUsername() {
        return envProperties.aeInboxUsername;
    }
    getaeInboxPassword() {
        return envProperties.aeInboxPassword;
    }
    getloggedInPerson() {
        return envProperties.loggedInPerson;
    }
    getenvironment(){
        return envProperties.env;
    }
    getuserguideUrl(){
        return ('https://service.gotostrata.com/login?ec=302&startURL=%2Fs%2Fknowledge%3Fkeyword%3Deleven');
    }
}
  export default EnvUtils;