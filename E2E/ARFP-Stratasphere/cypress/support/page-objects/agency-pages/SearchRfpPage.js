class SearchRfpPage {
    rfpNameTextBox() {
        return cy.get("[placeholder='RFP Name']");
    }
    searchButton() {
        return cy.get('.btn.btn-primary.btn-sm').eq(1);
    }
}
export default SearchRfpPage;