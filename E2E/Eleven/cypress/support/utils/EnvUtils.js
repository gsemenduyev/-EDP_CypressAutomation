const ENV = Cypress.env('ENV');
let envProperties;

before(function () {
    if (ENV === 'Production') {
        cy.log(`Environment - ${ENV}`);
        cy.fixture('/environment/11prod-param.json').then(function (data) {
            envProperties = data;
        });
    } else {
        cy.log(`Environment - QA`);
        cy.fixture('/environment/11qa-param.json').then(function (data) {
            envProperties = data;
        });
    }
});
before(function () {
    cy.writeFile('cypress/reports/run-info/run-env.json', {
        elevenUrl: envProperties.elevenUrl,
        elevenUsername: envProperties.elevenUsername,
        aeInboxUrl: envProperties.aeInboxUrl,
        env: envProperties.env,
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
}
  export default EnvUtils;