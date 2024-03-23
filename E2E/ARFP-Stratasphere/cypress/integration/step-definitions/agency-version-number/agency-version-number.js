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
        'cd C:\\Program Files (x86)\\SmartBear\\TestComplete 15\\Bin',
        'TestComplete.exe "C:\\CypressAutomation\\EDP_CypressAutomation\\E2E\\SBMS\\SBMS.pjs" /r /p:SBMS /t:' +
        '"KeywordTests|OpenSBMS"' +
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

Given('Test 2', () => {
    cy.visit('https://www.homedepot.com/').screenshot()
})
