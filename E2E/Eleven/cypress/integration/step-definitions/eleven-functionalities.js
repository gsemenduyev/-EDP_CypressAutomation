import 'cypress-data-session'
import {  Given } from "@badeball/cypress-cucumber-preprocessor";
import EnvUtils from "../../support/utils/EnvUtils";
import ElevenSigninPage from '../../support/page-objects/ElevenSigninPage';
import ElevenHomePage from '../../support/page-objects/ElevenHomePage';
import ElevenUserGuidePage from '../../support/page-objects/ElevenUserGuidePage';

const envUtils = new EnvUtils;
const elevenSigninPage = new ElevenSigninPage;
const elevenHomePage = new ElevenHomePage;
const elevenUserGuidePage = new ElevenUserGuidePage;

Given('Launch 11 url login into 11', string => {
    
    cy.visit(envUtils.getelevenUrl());
    cy.screenshot();    
    elevenSigninPage.pageTitle().should('have.text', 'Sign in to Eleven');

    //assert the message if admin message element exists
    if(envUtils.getenvironment === 'QA')
    {
        cy.get('#adminMessage').should('exist');
        elevenSigninPage.adminMessage().should('contain.text','Welcome to the 11 QA Environment.')
        cy.log( "Admin message section present on home screen !!");
    }
    if(envUtils.getenvironment === 'UAT')
    {
        elevenSigninPage.adminMessage().should('contain.text','Welcome to the 11 UAT Environment')
        cy.log( "Admin message section present on home screen !!");
    }  
    if(envUtils.getenvironment === 'Production')
    {
        if (cy.get('#adminMessage').should('not.exist').then)
        {
            cy.log( "Admin message section NOT present on home screen !!");
        }     
    } 

    elevenSigninPage.userName().type(envUtils.getelevenUsername());
    elevenSigninPage.passWord().type(envUtils.getelevenPassword(), { log: false });
    elevenSigninPage.signIn().click();
  
    elevenHomePage.welcomeMessage().should('have.text', ('Welcome '+ envUtils.getloggedInPerson())) ;   
    cy.screenshot();
})

Given('Click on Settings icon, validate each option, capture Version Number', string => {
    
    //click on settings icon
    elevenHomePage.settingsIcon().click();
    cy.screenshot();
    elevenHomePage.supportOption().should('contain.text', 'Support');
    elevenHomePage.supportOption().click();
    cy.screenshot();

    //capture 11 version
    cy.get('#ui-id-5').then(function ($div) {
        const text = ($div.text().split(': ')[1]);
        const regex = /\b\d+\.\d+\.\d+\.\d\b/g;
        const Ver = text.match(regex);
        cy.log("Eleven Version: " + Ver);
        //write the version to run-env.json
        cy.writeFile('cypress/reports/run-info/run-env.json', {
            elevenUrl: envUtils.getelevenUrl(),
            elevenUsername: envUtils.getelevenUsername(),
            env: envUtils.getenvironment(),
            elevenVersion: Ver,
        })
    })
    elevenHomePage.versionOkBtn().click();

    //select the first record
    elevenHomePage.firstRecordToDo().click();
    cy.screenshot();
    //Assert each of the options in the settings menu and validate the functionality
    //Show Header/ Hide Header option
    elevenHomePage.settingsIcon().click();
    elevenHomePage.toggleHeaderOption().should('contain.text', 'Hide Header');
    elevenHomePage.headerSection().should('be.visible');
    elevenHomePage.toggleHeaderOption().click();
    elevenHomePage.headerSection().should('not.be.visible').then
    { cy.log("Verified that Header section is hidden !!") };
    cy.screenshot();
    elevenHomePage.settingsIcon().click();
    elevenHomePage.toggleHeaderOption().should('contain.text', 'Show Header');
    elevenHomePage.toggleHeaderOption().click();
    elevenHomePage.headerSection().should('be.visible').then
    { cy.log("Verified that Header section is visible now !!") };
    cy.screenshot();

    //Hide Left Pane/Show Left Pane option
    elevenHomePage.settingsIcon().click();
    elevenHomePage.toggleLeftPaneOption().should('contain.text', 'Hide Left Pane');
    elevenHomePage.toggleLeftPaneOption().click();
    elevenHomePage.sideBarSection().should('not.be.visible').then
    { cy.log("Verified that Left section is hidden !!") };
    cy.screenshot();
    elevenHomePage.settingsIcon().click();
    elevenHomePage.toggleLeftPaneOption().should('contain.text', 'Show Left Pane');
    elevenHomePage.toggleLeftPaneOption().click();
    elevenHomePage.sideBarSection().should('be.visible').then
    { cy.log("Verified that Left section is Visible now !!") };
    cy.screenshot();

    //Show Filter/Hide Filter option
    elevenHomePage.settingsIcon().click();
    elevenHomePage.showFiltersOption().should('contain.text', 'Show Filter');
    elevenHomePage.showFiltersOption().click();
    elevenHomePage.filtersSection().should('be.visible').then
    { cy.log("Verified that filters section is Visible now !!") };
    cy.screenshot();
    elevenHomePage.settingsIcon().click();
    elevenHomePage.showFiltersOption().should('contain.text', 'Hide Filter');
    elevenHomePage.showFiltersOption().click();
    elevenHomePage.filtersSection().should('not.be.visible').then
    { cy.log("Verified that filters section is now Hidden !!") };
    cy.screenshot();

    //Hide Rating/Show Rating Option
    elevenHomePage.settingsIcon().click();
    elevenHomePage.showRatingOption().should('contain.text', 'Hide Rating .00');
    elevenHomePage.showRatingOption().click();
    elevenHomePage.ratingOption().should('contain.text', 'GRP').then
    { cy.log("Verified that Rating.00 option is hidden !!") };
    cy.screenshot();
    elevenHomePage.settingsIcon().click();
    elevenHomePage.showRatingOption().should('contain.text', 'Show Rating .00');
    elevenHomePage.showRatingOption().click();
    elevenHomePage.rating00Option().should('contain.text', 'GRP.00').then
    { cy.log("Verified that Rating.00 option is visible now !!") };
    cy.screenshot();

    // Manage Change Reason option
    elevenHomePage.settingsIcon().click();
    elevenHomePage.manageChangeOption().should('contain.text', 'Manage Change Reason');
    elevenHomePage.manageChangeOption().click();
    elevenHomePage.manageChangeReason().should('contain.text', 'Manage Change Reason').then
    { cy.log("Verified that Manage Change Reason Dialog is displayed !!") };
    cy.screenshot();
    elevenHomePage.changeReasonCancel().click();

    //Shortcuts option  
    elevenHomePage.settingsIcon().click();
    elevenHomePage.shortCutsOption().should('contain.text', 'Shortcuts');
    elevenHomePage.shortCutsOption().click();
    elevenHomePage.shortCutDialog().should('contain.text', 'Shortcuts').then
    { cy.log("Verified that Shortcuts Dialog is displayed") };
    cy.screenshot();
    elevenHomePage.okShortCutDialog().click();

    //Logout option
    elevenHomePage.settingsIcon().click();
    elevenHomePage.logoutOption().should('contain.text', 'LogOut');

    //Userguide option
    elevenHomePage.userGuideOption().should('contain.text', 'User Guide');
    cy.visit(envUtils.getuserguideUrl());

    /* limitation in cypress fails the below assertions. This seems to have been fixed in 12.8.0, once we switch to that version,
       will test this and then enable the assertions.
       https://github.com/cypress-io/cypress/issues/25885
    cy.origin('service.gotostrata.com', () =>{
    elevenUserGuidePage.loginButton().should('contain.text','Log In');
    elevenUserGuidePage.logo().should('contain.value','STRATA Client KB and Case Portal');
    cy.screenshot();
    })
    */
})