class sTrafficHomePage {
    trafficStatusBtn() {
        return cy.get('#trafficStatusMenu');
    };
    agencyTxtBox() {
        return cy.contains('Select An Agency...');
    };
    officeTxtBox() {
        return cy.contains('Select An Office...');
    };
    estimateTxtBox() {
        return cy.get('#s2id_estimateFilter input');
    };
    searchBtn() {
        return cy.get('#btnSearch');
    };
    estimateSelectSyntax() {
        return '.estimate';
    };
    loadingSign() {
        return cy.get('.loading-large');
    };
    estimateCell() {
        return cy.get('.l1');
    };
    sendEstimateCell() {
        return cy.get('.command.trafficAlert-send');
    };
    sendSelectedStnRadioBtn() {
        return cy.get('#SendOnlyToSelectedStationNetworks');
    };
    selectDeselectAllCheckBox() {
        return cy.get('.slick-column-name > input');
    };
    selectSendOption() {
        return cy.get('select');
    };
    selDslAllCheckBoxSyntax() {
        return ".slick-column-name [checked='checked']";
    };
    eSendContactEditor() {
        return cy.get('.eSendContactEditor');
    };
    inviteMoreLink() {
        return cy.get('.text-underline');
    };
    inviteMoreCancelBtn() {
        return cy.get('#divESendInvitationModal #btnCancel');
    };
    eSendContactEditorModalBody() {
        return cy.get('#ESendContactEditorModalBody');
    };
    eSendContactRows() {
        return cy.get('#ESendContactEditorModalBody .ui-widget-content.slick-row');
    };
    eSendContactDoneBtn() {
        return cy.get('#btnManagerSave');
    };
    toastMsgSyntax() {
        return '.toast';
    };
    eSendContactCancelBtn() {
        return cy.get('#btnManagerCancel');
    };
    trafficInstructionSendBtn() {
        return cy.get('#btnSend');
    };
    modalProgressMsg() {
        return cy.get('#divModalProgressMsg');
    };
    instructionSendMessage() {
        return cy.get('#divModalMessage > .modal-body');
    };
    instructionSendMessageOkBtn() {
        return cy.get('#btnMessageOk');
    };
    trafficSendCancelBtn() {
        return cy.get('#btnCancel');
    };
    signOutBtn() {
        return cy.contains('Sign Out');
    };
    editInstructionBtn() {
        return cy.get('.trafficAlert-edit');
    };
    instructionHeader() {
        return cy.get('#Header');
    };
    createTrafficRevisionBtn() {
        return cy.get('#btnCreateTrafficRevision');
    };
    extendInstrDateDialogSyntax() {
        return '#divExtendInstructionDateDialog';
    };
    extendInstrDateDialogYesBtn() {
        return cy.get('#divExtendInstructionDateDialog #btnSubmit');
    };
    extendInstrDateDialogYesBtn() {
        return cy.get('#divExtendInstructionDateDialog #btnSubmit');
    };
    createRevisionModal() {
        return cy.get('#divCreateRevisionModal');
    };
    createRevisionSelAllCheckbox() {
        return cy.get(".slick-column-name > input");
    };
    createRevisionSubmitBtn() {
        return cy.get('#divCreateRevisionModal .center > #btnSubmit');
    };
    validateInstructionBtn() {
        return cy.get('#btnValidate')
    };
    cancelBtn() {
        return cy.get('#Cancel')
    };
    validateInstructionGrid() {
        return cy.get('.instructionDiv .grid-canvas')
    };
};
export default sTrafficHomePage;