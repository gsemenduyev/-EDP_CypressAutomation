class LinearProposalRfpPage {
    campaignHeaderText(milliseconds) {
        return cy.get(".campaign-header span", { timeout: milliseconds });
    }
    proposalRows() {
        return cy.get("div[role='row']");
    }
    proposalHeader(index) {
        return cy.get(".rdg-header-sort-name").eq(index);
    }
    proposalHeaders() {
        return cy.get(".rdg-header-sort-name");
    }
    proposalCell(index) {
        return cy.get("div[role='gridcell']").eq(index);
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
}
export const linearProposalRfpPage = new LinearProposalRfpPage;