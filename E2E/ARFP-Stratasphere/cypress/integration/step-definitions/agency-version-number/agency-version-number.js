/// <reference types="Cypress" />
/// <reference types="cypress-data-session" />
/// <reference types="cypress-iframe" />
import 'cypress-data-session';
import 'cypress-iframe';
import { Given } from "@badeball/cypress-cucumber-preprocessor";
import AgencyBasePage from '../../../support/page-objects/agency-pages/AgencyBasePage';

const agencyBasePage = new AgencyBasePage;
const VERSION = Cypress.env('VERSION')

// Validate Agency RFP version number
Given('Validate Agency RFP version number', () => {
    agencyBasePage.versionNumber().invoke('text').then(version => {
        if (VERSION === undefined || VERSION === null) {
            throw new Error(`Set Agency RFP version ${version.trim()} as Environment veritable.`)
        } else {
            expect(version.trim()).to.equal(VERSION)
        }
    })
})

Given('Test', () => {
    const commands = [
        'cd C:\\CypressAutomation\\EDP_CypressAutomation\\E2E\\SBMS',
        'call mvn clean test -Dcucumber.options="--tags @wip"',
        'echo Command 3'
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

// Given('Test 2', () => {
//     cy.exec('commands.bat', { timeout: 1000000 }).then((result) => {
//         if (result.stderr) {
//             // Handle the error
//             cy.log(`Error: ${result.stderr}`);
//         } else {
//             // Use the output
//             cy.log(`Commands output:\n${result.stdout}`);
//         }
//     });
// });

Given('Test 2', () => {
    const commands = [
        'cd C:\\Program Files (x86)\\SmartBear\\TestComplete 15\\Bin',
        'TestComplete.exe "C:\\Trunk\\EDP_Automation\\EDP_Automation\\EDP_Automation.pjs" /r /p:AE-Inbox /t:' +
        '"KeywordTests|Test1"' +
        ' /e'
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