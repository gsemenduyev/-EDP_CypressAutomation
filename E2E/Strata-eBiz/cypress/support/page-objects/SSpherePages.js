class SSpherePages {
    pageTitle() {
        return cy.get("[data-ng-bind='title']");
    }
    usernameBox() {
        return cy.get('#username');
    }
    passwordBox() {
        return cy.get('#password');
    }
    loginButton() {
        return cy.get('.btn.btn-primary');
    }
    menuDropdownToggle() {
        return cy.get(".fa.fa-bars");
    }
    userSettingsDropdown(milliseconds) {
        return cy.get('.dropdown-toggle', { timeout: milliseconds }).eq(0);
    }
    logOutButton() {
        return cy.contains('Log Out');
    }
}
export default SSpherePages;