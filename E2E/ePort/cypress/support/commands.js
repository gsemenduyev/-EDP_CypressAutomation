// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
/// <reference types="cypress-data-session" />

/* 
Verifies if element exists in DOM.
[@param] selectorSyntax - Syntax of CSS, class, id...
[@return] - boolean
*/
Cypress.Commands.add("isElementExists", (selectorSyntax) => {
    cy.get("body").then($body => {
        let elementExist;
        if ($body.find(selectorSyntax).length > 0) {
            cy.log('Element Exists')
            elementExist = true;
        } else {
            cy.log("Element doesn't Exists")
            elementExist = false;
        }
        return cy.wrap(elementExist);
    });
});

Cypress.Commands.add("sbms", (keywordTest) => {
    const tc = Cypress.env('TC')
    const projectPath = Cypress.env('PROJECT_PATH')
    cy.log('project Path - ' + projectPath)
    if (tc === 'SessionCreator') {
        cy.log('Launching SessionCreator')
        cy.readFile('credentials.json').then((credentials) => {
            const commands = 'cd "C:\\Program Files (x86)\\SmartBear\\TestExecute 15\\bin" && SessionCreator.exe RunTest /UserName:"' + credentials.testcomplete.username + '" /Password:"' + credentials.testcomplete.password + '" /ScreenResolution:"1920*1020" /ProjectPath:"C:\\Jenkins\\workspace\\Strata\\TestAutomation\\TestComplete_Cypress _Integration\\E2E\\SBMS\\SBMS.pjs" /ExportLog:"C:\\Jenkins\\workspace\\Strata\\TestAutomation\\TestComplete_Cypress _Integration\\E2E\\SBMS\\Test1\\test.html" /project:SBMS /test:"KeyWordTests|OpenSBMS"';
            cy.exec(commands, { timeout: 120000 }).then((result) => {
                if (result.stderr) {
                    cy.log(`Error: ${result.stderr}`);
                } else {
                    cy.log(`Commands output:\n${result.stdout}`);
                }
            });
        });
    } else if (tc === 'TestExecute') {
        cy.log('Launching TestExecute')
        const commands =
            'cd C:/Program Files (x86)/SmartBear/TestExecute 15/bin && SessionCreator.exe RunTest /UserName:"Administrator" /Password:"?C9ZY&xM??Gr(a;keeChodUdds=h-$t" ' +
            '/ProjectPath:"C:/Jenkins/workspace/E2E/SBMS/SBMS.pjs" ' +
            '/r /p:SBMS /t:"KeywordTests|' + keywordTest + '" /e /SilentMode';
        cy.exec(commands, { timeout: 120000 }).then((result) => {
            if (result.stderr) {
                cy.log(`Error: ${result.stderr}`);
            } else {
                cy.log(`Commands output:\n${result.stdout}`);
            }
        });
    } else {
        cy.log('Launching TestComplete');
        const commands = 'cd "C:\\Program Files (x86)\\SmartBear\\TestComplete 15\\Bin" && ' +
            'TestComplete.exe "' + projectPath + '\\SBMS\\SBMS.pjs" ' +
            '/ExportLog:"' + projectPath + '\\ePort\\cypress\\reports\\test-complete-reports\\Test2\\test.html" ' +
            '/run /project:SBMS /test:"KeywordTests|' + keywordTest +
            '" /exit /SilentMode';
        cy.exec(commands, { timeout: 120000 }).then((result) => {
            if (result.stderr) {
                cy.log(`Error: ${result.stderr}`);
            } else {
                cy.log(`Commands output:\n${result.stdout}`);
            }
        });

    };




})