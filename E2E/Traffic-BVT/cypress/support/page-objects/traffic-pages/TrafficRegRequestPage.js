class TrafficRegRequestPage {
    firstNameTxtBox() {
        return cy.get('#txtFName');
    };
    lastNameTxtBox() {
        return cy.get('#txtLName');
    };
    phoneTxtBox() {
        return cy.get('#txtPhone');
    };
    emailTxtBox() {
        return cy.get('#txtEmail');
    };
    jobTitleTxtBox() {
        return cy.get('#txtTitle');
    };
    step1Ctr() {
        return cy.get('#n_step1');
    };
    step2Ctr() {
        return cy.get('#n_step2');
    };
    step3Ctr() {
        return cy.get('#n_step3');
    };
    activeStep() {
        return cy.get('#n_step2');
    };
    nextStep1Btn() {
        return cy.get('#cmdStep1toStep2');
    };
    showNewStationBtn() {
        return cy.get('#trNewStationQuestion > .footer');
    };
    newStationTxtBox() {
        return cy.get('#txtNewStation');
    };
    listNewStationBand() {
        return cy.get('#lstNewStationBand');
    };
    addNewStationBtn() {
        return cy.get('#cmdSaveNewStation');
    };
    cancelNewStationBtn() {
        return cy.get('#cmdCancel');
    };
    stationSearchTxtBox() {
        return cy.get('#txtStationSearch');
    };
    searchStationBtn() {
        return cy.get('#cmdSearch');
    };
    lstAvailableStations() {
        return cy.get('#lstAvailableStations');
    };
    selectedStationsStep2() {
        return cy.get('#divResults .DataGrid_RowItem .stnTVCol_atreg');
    };
    selectedStationsDeleteStep2() {
        return cy.get('#divResults .DataGrid_RowItem .delTVCol_atreg');
    };
    nextStep2Btn() {
        return cy.get('#cmdStep2toStep3');
    };
    backStep2Btn() {
        return cy.get('#cmdStep2toStep1');
    };
    UserInfoGridStep3() {
        return cy.get('.yui3-u-1-3 .DataGrid_Object');
    };
    selectedStationsStep3() {
        return cy.get('#divResults1 tbody .stnTVCol_atreg');
    };
    selectedStationsDeleteStep3() {
        return cy.get('#divResults1 tbody .delTVCol_atreg');
    };
    submitBtn() {
        return cy.get('#submit');
    };
    backStep3Btn() {
        return cy.get('#cmdStep3toStep2');
    };
    cancelStep3Btn() {
        return cy.get('#cancel');
    };
    conformationMsg() {
        return cy.get('#dlgBody');
    };
    conformationMsgOkBtn() {
        return cy.get('.ui-dialog-buttonset .ui-button-text');
    };

};
export default TrafficRegRequestPage;