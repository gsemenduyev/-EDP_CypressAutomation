/// <reference types="Cypress" />
/// <reference types="cypress-data-session" />
/// <reference types="cypress-iframe" />
import 'cypress-data-session';
import 'cypress-iframe';
import { Given } from "@badeball/cypress-cucumber-preprocessor";
import AgencyBasePage from '../../../support/page-objects/agency-pages/AgencyBasePage';
import EnvUtils from "../../../support/utils/EnvUtils";

const envUtils = new EnvUtils;
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

Given('Check all gmail', () => {
    cy.task("gmail:check-inbox", {
        credentials: 'cypress/fixtures/gmail-data/client-secrets/qa-environment/credentials-ssphere.testqa.json',
        token: 'cypress/fixtures/gmail-data/client-secrets/qa-environment/token-ssphere.testqa.json',
        subject: 'New RFP Request for Test Gmail 572024 at TEST-TV from FWAAuto Testing at Test Agency',
        from: 'no-reply@gotostrata.com',
        to: 'ssphere.testqa@gmail.com',
        wait_time_sec: 1000,
        max_wait_time_sec: 30000,
    }).then(($emails) => {
        console.log($emails)
        cy.log($emails)
    });
});

Given('Visit', () => {
    cy.visit('cypress/fixtures/gmail-data/gmail-info/gmail-body.html');
    // cy.readFile('cypress/fixtures/gmail-data/gmail-info/gmail-body.txt').then((text) => {
    //     const urlPattern = /(https?:\/\/\S+)/g;
    //     const urls = text.match(urlPattern)[0];
    //     cy.visit(urls)

    // });
    cy.get('[href="https://ssphereqa.pregotostrata.com/ui_new/#/proposal-response-line-specific-accept?id=f1b9ecc6-5fe9-4a67-957d-697e0db9837e"]').click()
})


Given('Check gmail inbox', () => {
    cy.visit('https://2wayrfp.gotostrata.com/RFP/')
    cy.check_gmail_inbox(
        'cypress/fixtures/gmail-data/client-secrets/qa-environment/credentials-ssphere.testqa.json',
        'cypress/fixtures/gmail-data/client-secrets/qa-environment/token-ssphere.testqa.json'
    );
});

Given('Test', () => {
    cy.wait_for_gmail(
        'cypress/fixtures/gmail-data/client-secrets/qa-environment/credentials-ssphere.testqa.json',
        'cypress/fixtures/gmail-data/client-secrets/qa-environment/token-ssphere.testqa.json',
        'no-reply@gotostrata.com',
        'New Change Request for Test Gmail 572024 at TEST-TV from FWAAuto Testing at Test Agency',
        120000,
        1000
    )
});
Given('User 1', () => {

    cy.readFile('cypress/fixtures/gmail-data/gmail-info/ssphere-emails-dates.json').its('uniqDatesList').should('contain', "2024-05-29T01:46:15.000Z");

    // cy.log("Hello - 2 " + Cypress.env('ARFP_CREDENTIALS_FILE'))
    // const emailAddress = "arfp.testqa@gmail.com";

    // // Split the email address into an array using the "." as the separator
    // const parts = emailAddress.split(".");

    // // Extract the first part (arfp) and the second part (testqa)
    // const arfp = parts[0];
    // const testqa = parts[1];

    // // Output: "arfp"
    // cy.log("testqa:", envUtils.getSsphereUsername().split(".")[0]);

})





// const checkEmailExists = () => {
//     cy.task("gmail:get-messages", {
//         credentials: 'cypress/plugins/credentials-ssphere.sellerqa.json',
//         token: 'cypress/plugins/token-cypress-exampel.json',
//         options: {
//             from: 'no-reply@gotostrata.com',
//             subject: 'Welcome to Stratasphere!',
//             include_body: true,
//         },

//     }).then((emails) => {
//         console.log(emails.length)
//         if (emails.length < 1) {
//             cy.wait(6000)
//             checkEmailExists()
//         } else {
//             const body = emails[0].body.html;
//             console.log(body)
//             cy.writeFile('webpage.html', body);
//         }
//     });
// }
// checkEmailExists();
