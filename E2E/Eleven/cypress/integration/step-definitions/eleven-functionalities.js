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
const year = new Date().getFullYear();

Given('Launch 11 application and login into 11, verify the copyright info and Validate the cable disclaimer',() => {    
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
        if (elevenSigninPage.noAdminMessage().should('not.exist').then)
        {
            cy.log( "Admin message section NOT present on home screen !!");
        }     
    } 

    elevenSigninPage.userName().type(envUtils.getelevenUsername());
    elevenSigninPage.passWord().type(envUtils.getelevenPassword(), { log: false });
    elevenSigninPage.signIn().click();
  
    elevenHomePage.welcomeMessage().should('have.text', ('Welcome '+ envUtils.getloggedInPerson())) ;   
    //Verify the copright info is upto date
    elevenHomePage.copyRightInfo().should('contain.text',('#copyright', `${year} FreeWheel Advertisers, Inc. - All Rights Reserved`));

    cy.screenshot();   
    //Filter for a particular Estimate number
    elevenHomePage.searchEstimateNumber().type(envUtils.getEstimateNumber());
    elevenHomePage.btnGoSideBar().click();
    //click on disclaimer
    elevenHomePage.disclaimerIcon().click();
    elevenHomePage.disclaimerWindow().should('contain.text','Disclaimer');
    elevenHomePage.disclaimerText().should('contain.text','ABC Client Disclaimer--- Cable Disclaimer from SBMS');
    cy.screenshot();
    elevenHomePage.versionOkBtn().click();

})

Given('Generate the xls reports - Order Detail, Order Detail with Totals By Calendar Month', () => {
     //Filter for a particular Estimate number
     elevenHomePage.searchEstimateNumber().type(envUtils.getEstimateNumber());
     elevenHomePage.btnGoSideBar().click();
    //Order Detail Report
    elevenHomePage.selectEvenCheckBox().check();
    elevenHomePage.expandEvenStation().click();
    elevenHomePage.whatDoYouWantToDo().should('be.visible').select('16');
    elevenHomePage.submitButton().click();   
    cy.screenshot();
    cy.wait(2000); // Wait for the download to complete 
    cy.verifyDownload('export.xls');
    cy.log('Verified that Order Details report downloaded successfully !!');
    //Compare the downloaded file against the saved file in the fixtures folder
    cy.compare_Excel_Files('cypress/fixtures/comparisonReports/OrderDetail.xls', 'cypress/downloads/export.xls');
    
    //Order Detail With Totals by Calendar Month
    elevenHomePage.whatDoYouWantToDo().should('be.visible').select('20');
    elevenHomePage.submitButton().click();   
    cy.screenshot();
    cy.wait(2000); // Wait for the download to complete 
    cy.verifyDownload('export.xls');
    cy.log('Verified that Order Details report downloaded successfully !!');
    //Compare the downloaded file against the saved file in the fixtures folder
    cy.compare_Excel_Files('cypress/fixtures/comparisonReports/OrderDetailWithTotals.xls', 'cypress/downloads/export.xls');
    
    //select the first record
    //elevenHomePage.firstRecordToDo().click();
    //select Order Confirmation Report from drop down
    //elevenHomePage.whatDoYouWantToDo().should('be.visible').select('10');
    //elevenHomePage.submitButton().click();
    /*cy.task('https://11qa.pregotostrata.com/11Orders/rptOrder.aspx?oper=0&est_id=240047&hide_conf=0&sort_field=&sort_type=&grp_gimp_selection=1&show_columns=1_2_3_4_5_6_9_7_8&show_comments=false&is_rating_00=true').then($res => {
        expect($res).to.equal('Eleven Order Confirmation Report')
    })*/
    // cy.screenshot();
     //cy.get('@windowOpen').should('have.been.calledOnce','','Eleven Order Confirmation Report');
     //cy.title().should('contain','Eleven Order Confirmation Report')
     //cy.window().then((win) => {
     //win.close();
      //});
    //elevenHomePage.submitButton().click();
    
  /*  cy.open('../rptOrder.aspx?oper=1').then((win) =>{
        cy.spy(win, 'open').as ('open')        
    })
    cy.get('@open').should('have.been.calledOnce','','Eleven Order Confirmation Report');
    cy.title().should('contain','Eleven Order Confirmation Report');*/

})

Given('Click on Settings icon, validate each option, capture Version Number', () => {
	
    //click on settings icon
    elevenHomePage.settingsIcon().click();
    cy.screenshot();
    elevenHomePage.supportOption().should('contain.text', 'Support');
    elevenHomePage.supportOption().click();
    cy.screenshot();

    //capture 11 version
    elevenHomePage.versionDialog().then(function ($div) {
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