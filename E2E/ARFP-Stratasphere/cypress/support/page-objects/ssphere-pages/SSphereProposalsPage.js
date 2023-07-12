class SSphereProposalsPage {
    campaignSearchBox() {
        return cy.contains('Campaign').eq(0).parent().parent();
    }
    stationDetailsText() {
        return cy.get(".col-md-2.col-sm-3.col-xs-12.lato-bold-16");
    }
    vendor() {
        return cy.get("[ng-bind*='vm.proposal.stationName']");
    }
    market() {
        return cy.get("[ng-bind*='::market.marketName']");
    }
    primaryDemo() {
        return cy.get("[ng-if*='demo.endAge != 99']");
    }
    startDate() {
        return cy.get("[ng-bind=\"::vm.proposal.flight.start | date:'shortDate'\"]");
    }
    endDate() {
        return cy.get("[ng-bind=\"::vm.proposal.flight.end | date:'shortDate'\"]");
    }
    agency() {
        return cy.get("[ng-bind*=\"vm.proposal.advertiser ? vm.proposal.advertiser.name : 'N/A'\"]");
    }
    product() {
        return cy.get("[ng-bind*='::product.name']");
    }
    uploadResponseButton() {
        return cy.get("[ng-click*='vm.uploadOption()']");
    }
    uploadResponseText() {
        return cy.get(".col-md-2.col-sm-3.col-xs-12 span");
    }
    selectXmlFile() {
        return cy.get("input[type='file']");
    }
    uploadVerificationYesButton() {
        return cy.contains('Yes');
    }
    validatedXmlText() {
        return cy.get("[ng-class=\"f.validated ? 'validated' : 'validate-error'\"]");
    }
    uploadResponseNextButton() {
        return cy.contains('Next');
    }
    additionalAttachmentsText() {
        return cy.get('.col-md-2.col-sm-3.col-xs-12').eq(2);
    }
    additionalAttachmentsNextButton() {
        return cy.get("button[type='button']").eq(3);
    }
    commentsText() {
        return cy.get('.col-md-2.col-sm-3.col-xs-12').eq(3);
    }
    commentsRfpNextButton() {
        return cy.get("a[ng-if='!vm.vendorProposal']").eq(3);
    }
    uploadedFileText() {
        return cy.get("[ng-bind*='::p.name']");
    }
    sendToAgencyButton() {
        return cy.contains('Send to Agency').parent();
    }
    sentResponseText(milliseconds) {
        return cy.get('.h4.page-title-content', { timeout: milliseconds }).eq(0);
    }
    fileInput() {
        return cy.get("input[type='file']");
    }
    enterRevisionButton() {
        return cy.contains('Enter Revision');
    }
    enterRevisionTab() {
        return cy.get(".panel-title").eq(1);
    }
    useBuyerRatingsButton() {
        return cy.contains('Use Buyer Ratings');
    }
    useBuyerRateButton() {
        return cy.contains('Use Buyer Rate');
    }
    addBuyLineButton() {
        return cy.contains('Add Buy Line');
    }
    previousButton() {
        return cy.contains('Previous');
    }
    saveContinueButton() {
        return cy.contains('Save & Continue');
    }
    myRateCell() {
        return cy.get("div[role='gridcell'] .ui-grid-cell-contents").eq(10);
    }
    updatedMyRateCell() {
        return cy.get("div[role='gridcell'] .ui-grid-cell-contents").eq(9);
    }
    additionalAttachmentsTab() {
        return cy.get(".col-md-2.col-sm-3.col-xs-12").eq(2);
    }
    includeAdditionalAttachmentsText() {
        return cy.get('.col-md-2.control-label');
    }
    selectFileButton() {
        return cy.contains('Select File');
    }
    additionalAttachmentsPreviousButton() {
        return cy.get('.a-button').eq(3);
    }
    nextButton() {
        return cy.contains('Next');
    }
    sendRevisionTab() {
        return cy.contains('Send Revision');
    }
    commentsNextButton() {
        return cy.get('.form-inline.form-button .btn.btn-primary').eq(3);
    }
    sendRevisionPreviousButton() {
        return cy.get('.a-button').eq(5);
    }
    responseCompleteConformationText() {
        return cy.get('.italic');
    }
    sellerRateCell() {
        return cy.get("[ng-if='grid.getCellValue(row, col) != 0.00']").eq(0);
    }
    startDateCell() {
        return cy.get("[ng-repeat='(colRenderIndex, col) in colContainer.renderedColumns track by col.uid']").eq(14);
    }
    msgsButton() {
        return cy.get('.fa-comments');
    }
    campaignMsgsModal() {
        return cy.get("[aria-label='Campaign Messages']");
    }
    textarea() {
        return cy.get('textarea');
    }
    msgsSendButton() {
        return cy.get("[aria-label='Campaign Messages'] .ui.primary.button");
    }
    sellerMsgsContent() {
        return cy.get('.msg-row.right .msg-content');
    }
    buyerMsgsContent() {
        return cy.get("[class='msg-row'] .msg-content");
    }
    validatedXmlTextSyntax(){
        return '.validated'
    }
    proposalVerificationModalSyntax(){
        return '.modal-body'
    }
}
export default SSphereProposalsPage;
