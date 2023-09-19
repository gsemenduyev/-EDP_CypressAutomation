class LinearProposalRfpPage {
    campaignHeaderText(milliseconds) {
        return cy.get("h2", { timeout: milliseconds }).first();
    }
    proposalRows() {
        return cy.get("div[role='row']", { log: false });
    }
    proposalHeader(index) {
        return cy.get(".rdg-header-sort-name", { log: false }).eq(index, { log: false });
    }
    proposalHeaders() {
        return cy.get(".rdg-header-sort-name", { log: false });
    }
    proposalResponse() {
        return cy.get("[role='grid']");
    }
    proposalCell(index) {
        return cy.get("div[role='gridcell']", { log: false }).eq(index, { log: false });
    }
    selectLineCheckBox() {
        return cy.get("input[aria-label='Select']");
    }
    selectLineCheckBox() {
        return cy.get("input[aria-label='Select']");
    }
    selectLineCheckBoxSelectorSyntax() {
        return "input[aria-label='Select']";
    }
    deleteButton() {
        return cy.contains('Delete');
    }
    saveButton() {
        return cy.contains('Save');
    }
    myReteTexBox() {
        return cy.get('[aria-rowindex="2"] [aria-colindex="12"]');
    }
    actionsDropdown() {
        return cy.get('.ui.dropdown.icon.button.right.labeled.osu-button.osu-la-dropdown-button.secondary');
    }
    sendRateRequestButton() {
        return cy.contains('Send Rate Request');
    }
    myReteTexBoxValue() {
        return cy.get('[aria-rowindex="2"] [aria-colindex="12"] .text-right');
    }
    sendRateRequestText() {
        return cy.get('.osu-overlay-header');
    }
    vendorText() {
        return cy.get('.fluid > .ui');
    }
    sendButton() {
        return cy.contains('SEND');
    }
    msgAndAttachmentsOption() {
        return cy.contains('Messages & Attachments');
    }
    sellerMsgContent() {
        return cy.get("[class='msg-row'] .msg-content");
    }
    msgSidebarCloseButton() {
        return cy.get(".sidebar-panel-body  [class='osu-link'] .MuiSvgIcon-root");
    }
    textarea() {
        return cy.get('textarea');
    }
    sentMsgButton() {
        return cy.get('.bodySidebarContent.flex-column-display.flex-column-fill-height .osu-button.osu-button-primary');
    }
    buyerMsgContent() {
        return cy.get("[class='msg-row right'] .msg-content");
    }
    negotiateButton() {
        return cy.get('.negotiate-tooltip-button .ink');
    }
    sendSelectedBuylinesModal() {
        return cy.get('.osu-surface.osu-surface-level-7.osu-overlay.osu-modal.small-modal');
    }
    sendSelectedBuylinesModalTitle() {
        return cy.get('.osu-overlay-header');
    }
    sendSelectedBuylinesModalMyRate(myRate) {
        return cy.get("div[title='$ " + myRate + "']").last();
    }
    alertBox() {
        return cy.get('.s-alert-box-inner > span');
    }
    lineChangesMsg() {
        return cy.get('.osu-banner-body').last();
    }
    sellerRateTexBoxValue() {
        return cy.get('[aria-rowindex="2"] [aria-colindex="14"] .text-right');
    }
    exportProposalXmlButton() {
        return cy.contains('Export Proposal XML');
    }
    importProposalXmlButton() {
        return cy.get("input[type='file']");
    }
    modalImportXmlButton() {
        return cy.contains("Import XML");
    }
    manageBuyerDataButton() {
        return cy.get(".item.manager-buyer-data-item");
    }
    campaignHeaderTextProd(milliseconds) {
        return cy.get(".campaign-header span", { timeout: milliseconds });
    }
}
export default LinearProposalRfpPage;