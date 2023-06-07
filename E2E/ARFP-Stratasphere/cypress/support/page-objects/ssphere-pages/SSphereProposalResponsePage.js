class SSphereProposalResponsePage{
    pageTitle(milliseconds) {
        return cy.get("[data-ng-bind='title']", { timeout: milliseconds });
    }
    vendorName() {
        return cy.get('#proposalVendors');
    }
    mediaTypeName() {
        return cy.get('.col-md-2.single-line-text').eq(0);
    }

    campaignName() {
        return cy.get('.col-md-2.single-line-text').eq(1);
    }
    marketName() {
        return cy.get('.col-md-2.col-sm-1').eq(1);
    }
    primaryDemo() {
        return cy.get('.col-md-2.col-sm-1.single-line-text');
    }
    flightStart() {
        return cy.get('.col-md-2.col-sm-1').eq(2);
    }
    flightEnd() {
        return cy.get('.col-md-2.col-sm-2').eq(11);
    }
    selectVersion() {
        return cy.get('.ui-select-match-text.pull-left');
    }
    buyerRateCell() {
        return cy.get("div[class='ui-grid-cell-contents'] span").first();
    }
    selectOneOfTwoVersion() {
        return cy.contains('1 of 2');
    }
    reviseButton() {
        return cy.contains('Revise');
    }
}
export default SSphereProposalResponsePage;