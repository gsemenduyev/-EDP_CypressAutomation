class GmailBodyPage {
    salesperson() {
        return cy.get('.nowrapLabel').eq(0).siblings();
    };
    rfpDueDate() {
        return cy.get('.nowrapLabel').eq(1).siblings();
    };
    advertiser() {
        return cy.get('.nowrapLabel').eq(2).siblings();
    };
    flightDates() {
        return cy.get('.nowrapLabel').eq(3).siblings();
    };
    primaryDemo() {
        return cy.get('.nowrapLabel').eq(4).siblings();
    };
    buyer() {
        return cy.get('.nowrapLabel').eq(5).siblings();
    };
    gmailHeader() {
        return cy.get('section');
    };
    arfpResetPswButton() {
        return cy.get('a');
    };
    negotiationGmailHeader() {
        return cy.get('section > :nth-child(2)');
    };
    negotiationGmailAccept() {
        return cy.get('a').eq(0);
    };
    negotiationGmailReject() {
        return cy.get('a').eq(1);
    };
    negotiationGmailMakeChanges() {
        return cy.get('a').eq(2);
    };
    newRequestRedirectionLink() {
        return cy.get('a').eq(0);
    };
};
export default GmailBodyPage;
