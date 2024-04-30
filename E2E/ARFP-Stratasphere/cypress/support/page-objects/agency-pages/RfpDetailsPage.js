class RfpDetailsPage {
    rfpStatus(milliseconds) {
        return cy.get("a[href='#']").eq(5, { timeout: milliseconds });
    }
    pageTitle() {
        return cy.get('#page-title');
    }
    responseButton() {
        return cy.get("[ng-show='!request.$hideResponses'] a");
    }
    manageResponsesButton() {
        return cy.get("[ng-click='openPrebuy(proposal.id)']");
    }
}
export default RfpDetailsPage;