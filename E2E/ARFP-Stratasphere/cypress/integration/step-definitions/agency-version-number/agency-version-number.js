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

Given('Check all gmail', () => {
    cy.task("gmail:check-inbox", {
        credentials: 'cypress/fixtures/gmail-data/client-secrets/qa-environment/credentials-ssphere.sellerqa.json',
        token: 'cypress/fixtures/gmail-data/client-secrets/qa-environment/token-cypress-exampel.json',
        subject: 'Welcome to Stratasphere!',
        from: 'no-reply@gotostrata.com',
        to: 'ssphere.sellerqa@gmail.com',
        wait_time_sec: 1000,
        max_wait_time_sec: 30000,
    }).then(($emails) => {
        console.log($emails)
        cy.log($emails)
    });
});

Given('Visit', () => {
    //  cy.visit('webpage.html');
    cy.readFile('cypress/fixtures/gmail-data/gmail-info/gmail-body.txt').then((text) => {
        const urlPattern = /(https?:\/\/\S+)/g;
        const urls = text.match(urlPattern)[0];
        cy.visit(urls)

    });
})


Given('Check gmail inbox', () => {
    cy.check_gmail_inbox(
        'cypress/fixtures/gmail-data/client-secrets/qa-environment/credentials-ssphere.sellerqa.json',
        'cypress/fixtures/gmail-data/client-secrets/qa-environment/token-cypress-exampel.json'
    );
});

Given('Test', () => {
    cy.wait_for_gmail(
        'cypress/fixtures/gmail-data/client-secrets/qa-environment/credentials-ssphere.sellerqa.json',
        'cypress/fixtures/gmail-data/client-secrets/qa-environment/token-cypress-exampel.json',
        'no-reply@bounce.gotostrata.com',
        'Forgot Password for RFP',
        120000,
        1000
    )





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
});