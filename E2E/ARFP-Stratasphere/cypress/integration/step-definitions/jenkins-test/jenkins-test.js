/// <reference types="Cypress" />
import { Given } from "@badeball/cypress-cucumber-preprocessor";
import AgencyLoginPage from "../../../support/page-objects/agency-pages/AgencyLoginPage";
import AgencyBasePage from "../../../support/page-objects/agency-pages/AgencyBasePage";
import EnvUtils from "../../../support/utils/EnvUtils"



const agencyLoginPage = new AgencyLoginPage;
const agencyBasePage = new AgencyBasePage;
const envUtils = new EnvUtils;
let baseURLsParam;
const ENV = Cypress.env('ENV');

// Login to Agency RFP Jenkins test
Given('Login to Agency RFP Jenkins test', () => {
    //    cy.log(`Hello URL ------  ${Cypress.env('agencyUrl')}`)

    cy.log('Hi')
})


// Logout Agency RFP Jenkins test
Given('Logout Agency RFP Jenkins test', () => {

    // let a =   Cypress.env('agencyUrl')
    cy.log('By')

})