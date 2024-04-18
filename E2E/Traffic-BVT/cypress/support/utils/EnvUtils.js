const ENV = Cypress.env('ENV');
let envProperties;
before(function () {
    if (ENV === 'Production') {
        cy.log(`Environment - ${ENV}`);
        cy.fixture('/environment/prod-param.json').then(function (data) {
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
        trafficUrl: envProperties.trafficUrl,
        sTrafficUrl: envProperties.sTrafficUrl,
        env: envProperties.env
    })
})

class EnvUtils {
    getTrafficUrl() {
        return envProperties.trafficUrl;
    };
    getTrafficAdminUsername() {
        return envProperties.trafficAdminUsername;
    };
    getTrafficAdminPassword() {
        return envProperties.trafficAdminPassword;
    };
    getTrafficUsername() {
        return envProperties.trafficUsername;
    };
    getTrafficPassword() {
        return envProperties.trafficPassword;
    };
    getsTrafficUrl() {
        return envProperties.sTrafficUrl;
    };
    getsTrafficUsername() {
        return envProperties.sTrafficUsername;
    };
    getsTrafficPassword() {
        return envProperties.sTrafficPassword;
    };
    getEstimate() {
        return envProperties.estimate;
    };
};
export default EnvUtils;