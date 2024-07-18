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
/// <reference types="cypress" />

let testCompleteHTMLReportName;
/* 
AfterEach hook serves the TestComplete HTML report, 
it checks if the Scenario with SBMS step failed 
then adds "Failed" to the report folder name,
located in "cypress\reports\test-complete-reports"
*/
afterEach(function () {
    const { title, state, parent: suite } = cy.state('test');
    if (state === 'failed') {
        const parentFolder = Cypress.env('PROJECT_PATH') + '\\ePort\\cypress\\reports\\test-complete-reports';
        const oldFolderName = testCompleteHTMLReportName;
        const newFolderName = `Failed-${testCompleteHTMLReportName}`;
        if (oldFolderName && typeof oldFolderName === 'string' && oldFolderName.trim().length > 0) {
            cy.task('searchAndRenameFolder', { parentFolder, oldFolderName, newFolderName })
                .then(
                    () => {
                        cy.log('Folder renamed successfully');
                    },
                    (err) => {
                        cy.log('Failed to rename folder:', err.message);
                    }
                );
        }
    }
});

/* 
Verifies if element exists in DOM.
[@param] selectorSyntax - Syntax of CSS, class, id...
[@return] - boolean
*/
Cypress.Commands.add("is_element_exists", (selectorSyntax) => {
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

Cypress.Commands.add('getFormattedDate', () => {
    const today = new Date();
    const month = today.getMonth() + 1;
    const day = today.getDate();
    const year = today.getFullYear();
    return `${month}/${day}/${year}`;
});

/* 
Executes SBMS TestComplete project.
Sets up Environment for SBMS TestComplete project before the KeywordTest execution starts, location - E2E\SBMS\SBMS\Stores\Files\CypressEnvironmentSwitcher.txt.
[@param] keywordTest - Name of TestComplete KeywordTest
*/
Cypress.Commands.add("sbms", (keywordTest) => {
    const now = new Date();
    cy.clock(now);
    const hour = now.getHours();
    const minute = now.getMinutes();
    const second = now.getSeconds()
    const featureFileName = Cypress.spec.relative.replace(/\\/g, '/').split('/').pop().replace(".feature", "");
    const testContext = cy.state('test');
    const { title, parent: suite } = testContext;
    const testTitleTransformed = title.replace(/\s+/g, '-');
    testCompleteHTMLReportName = `${featureFileName}_${testTitleTransformed}_${keywordTest}_${hour}-${minute}-${second}`;
    const tc = Cypress.env('TC');
    const projectPath = Cypress.env('PROJECT_PATH');
    const tcEnvSwitcherFilePath = `${Cypress.env('PROJECT_PATH')}\\SBMS\\SBMS\\Stores\\Files\\CypressEnvironmentSwitcher.txt`;
    const tcProjectEstNumFilePath = `${Cypress.env('PROJECT_PATH')}\\SBMS\\SBMS\\Stores\\Files\\EstimateNumber.txt`;
    const cyProjectEstNumFilePath = 'cypress/fixtures/sbms-estimate/estimate-number.txt'
    let env;
    if (Cypress.env('ENV') === 'Production') {
        env = 'PROD'
    } else if (Cypress.env('ENV') === 'UAT') {
        env = 'UAT'
    } else {
        env = 'QA'
    };

    // Writes the environment name to SBMS TestComplete project
    cy.writeFile(tcEnvSwitcherFilePath, env);
    cy.readFile(tcEnvSwitcherFilePath).should('eq', env)

    if (tc === 'SessionCreator') {
        cy.log('Launching SessionCreator')
        cy.readFile('credentials.json').then((credentials) => {
            const commands = 'cd "C:\\Program Files (x86)\\SmartBear\\TestExecute 15\\bin" && ' +
                'SessionCreator.exe RunTest ' +
                '/UserName:"' + credentials.testcomplete.username + '" ' +
                '/Password:"' + credentials.testcomplete.password + '" ' +
                '/ScreenResolution:"1920*1020" ' +
                '/ProjectPath:"' + projectPath + '\\SBMS\\SBMS.pjs" ' +
                '/ExportLog:"' + projectPath + '\\ePort\\cypress\\reports\\test-complete-reports\\' + testCompleteHTMLReportName + '\\ViewResults.html" ' +
                '/project:SBMS ' +
                '/test:"KeyWordTests|' + keywordTest + '"';
            cy.exec(commands, { timeout: 600000 }).then((result) => {
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
            };
        });
    } else {
        cy.log('Launching TestComplete');
        const commands = 'cd "C:\\Program Files (x86)\\SmartBear\\TestComplete 15\\Bin" && ' +
            'TestComplete.exe "' + projectPath + '\\SBMS\\SBMS.pjs" ' +
            '/ExportLog:"' + projectPath + '\\ePort\\cypress\\reports\\test-complete-reports\\' + testCompleteHTMLReportName + '\\ViewResults.html" ' +
            '/ExportSummary:"' + projectPath + '\\ePort\\cypress\\reports\\test-complete-reports\\' + testCompleteHTMLReportName + '\\ViewResults.xml" ' +
            // '/ShareResults:"' + projectPath + '\\ePort\\cypress\\reports\\test-complete-reports\\' + testCompleteHTMLReportName + '\\ShareResults.txt" ' +
            '/run /project:SBMS /test:"KeywordTests|' + keywordTest +
            '" /exit /SilentMode';
        cy.exec(commands, { timeout: 3000000 }).then((result) => {
            if (result.stderr) {
                cy.log(`Error: ${result.stderr}`);
            } else {
                cy.log(`Commands output:\n${result.stdout}`);
            }
        });
    };
    // Sets up "Set up environment" as default text
    cy.writeFile(tcEnvSwitcherFilePath, 'Set up environment')
    cy.readFile(tcEnvSwitcherFilePath).should('eq', 'Set up environment');
    /* 
    Copies the SBMS Estimate number from E2E\SBMS\SBMS\Stores\Files\CypressEnvironmentSwitcher.txt
    and writes the SBMS Estimate number to cypress\fixtures\sbms-estimate\estimate-number.txt
    */
    cy.readFile(tcProjectEstNumFilePath).should('not.be.empty');
    cy.readFile(tcProjectEstNumFilePath).then(($estimateNum) => {
        cy.writeFile(cyProjectEstNumFilePath, $estimateNum)
        cy.readFile(cyProjectEstNumFilePath).should('include', $estimateNum)
    })
});