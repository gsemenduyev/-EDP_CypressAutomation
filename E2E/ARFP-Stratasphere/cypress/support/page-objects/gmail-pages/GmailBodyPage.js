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
    }

}
export default GmailBodyPage;
