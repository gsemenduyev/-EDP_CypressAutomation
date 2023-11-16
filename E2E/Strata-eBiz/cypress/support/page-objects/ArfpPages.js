class ArfpPages {
    pageTitle(milliseconds) {
        return cy.get('#page-title', { timeout: milliseconds });
    }
    usernameBox() {
        return cy.get('#Username');
    }
    passwordBox() {
        return cy.get('#Password');
    }
    loginButton() {
        return cy.get('.btn');
    }
    signOutButton() {
        return cy.get("[href='/RFP/login/SignOut']");
    }
}
export default ArfpPages;