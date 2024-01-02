class RfpDetailsPage {
    rfpStatus(milliseconds) {
        return cy.get("a[href='#']").eq(5, { timeout: milliseconds });
    }
    pageTitle(milliseconds) {
        return cy.get('#page-title', { timeout: milliseconds });
    }
    responseButton(milliseconds) {
        return cy.get("[ng-show='!request.$hideResponses'] a", { timeout: milliseconds });
    }
    manageResponsesButton(milliseconds) {
        return cy.get("[ng-click='openPrebuy(proposal.id)']", { timeout: milliseconds });
    }
}
export default RfpDetailsPage;