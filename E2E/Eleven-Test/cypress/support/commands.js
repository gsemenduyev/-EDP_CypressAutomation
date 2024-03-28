// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add("sbms", (keywordTest) => {
    const commands = [
        'cd C:\\Program Files (x86)\\SmartBear\\TestComplete 15\\Bin',
        `TestComplete.exe C:\\CypressAutomation\\EDP_CypressAutomation\\E2E\\SBMS\\SBMS.pjs ` +
        `/r /p:SBMS /t:"KeywordTests|${keywordTest}" /e ` +
        `/ExportLog:"C:\\CypressAutomation\\EDP_CypressAutomation\\E2E\\SBMS\\Log-eleven-integration" ` +
        `/SilentMode`
    ];
    cy.exec(commands.join(' && '), { timeout: 1000000 }).then((result) => {
        if (result.stderr) {
            // Handle the error
            cy.log(`Error: ${result.stderr}`);
        } else {
            // Use the output
            cy.log(`Commands output:\n${result.stdout}`);
        }
    });
});