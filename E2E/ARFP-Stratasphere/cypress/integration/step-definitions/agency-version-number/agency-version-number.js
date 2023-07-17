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
        if(VERSION === undefined || VERSION === null){
            throw new Error(`Set Agency RFP version ${version.trim()} as Environment veritable.`)
        } else {
            expect(version.trim()).to.equal(Cypress.env('VERSION')) 
        }
    })
})