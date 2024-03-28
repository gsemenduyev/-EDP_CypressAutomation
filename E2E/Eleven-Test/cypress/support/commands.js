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

Cypress.Commands.add('copyScreenShotTC', (fileNme) => {
    const featureFileName = Cypress.spec.relative;
    const segments = featureFileName.split("\\");
    const lastSegment = segments.pop();
    const sourceFile = 'C:\\CypressAutomation\\EDP_CypressAutomation\\E2E\\SBMS\\SBMS\\NameMapping\\Images\\3723187.png'
    const destinationFile = 'C:\\CypressAutomation\\EDP_CypressAutomation\\E2E\\Eleven-Test\\cypress\\screenshots\\' +
        lastSegment + '\\' + fileNme + '.png'

    // cy.createFolder('C:\\CypressAutomation\\EDP_CypressAutomation\\E2E\\Eleven-Test\\cypress\\screenshots')
    cy.createFolder('C:\\CypressAutomation\\EDP_CypressAutomation\\E2E\\Eleven-Test\\cypress\\screenshots\\' +
        lastSegment)
    return cy.task('copyScreenShotTC', { sourceFile, destinationFile });
});

Cypress.Commands.add('createFolder', (folderPath) => {
    return cy.task('createFolder', { folderPath });
});


Cypress.Commands.add('copyAndDeleteFiles', (sourceFolderPath, destinationFolderPath) => {
    cy.task('getFiles', { folderPath: sourceFolderPath }).then((filePaths) => {
        filePaths.forEach((filePath) => {
            const fileName = Cypress._.last(filePath.split('/'));

            if (fileName.endsWith('.png')) {
                const destinationPath = `${destinationFolderPath}/${fileName}`;

                cy.task('copyFile', { sourcePath: filePath, destinationPath }).then(() => {
                    cy.task('deleteFile', { filePath });
                });
            }
        });
    });
});


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