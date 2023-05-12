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
}
export const sSphereBasePage = new SSphereBasePage;