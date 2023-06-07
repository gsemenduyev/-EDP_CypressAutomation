class SSphereBasePage{
    userSettingsDropdown(milliseconds) {
        return cy.get('.dropdown-toggle',{ timeout: milliseconds }).eq(0);
    }
    logOutButton() {
        return cy.contains('Log Out');
    }
    pageTitle() {
        return cy.get("[data-ng-bind='title']");
    }
    manuDropdownToggle() {
        return cy.get(".fa.fa-bars");
    }
    negotiationMessage(){
        return cy.get('.h4');
    }
    myRateNegotiation(){
        return cy.get(".ui-grid-cell-contents [ng-if='grid.getCellValue(row, col) != 0.00']");
    }
    submitButton(){
        return cy.get(".btn.btn-primary");
    }
}
export default  SSphereBasePage;