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
    centralLoginEmail(milliseconds) {
        return cy.get('#email', { timeout: milliseconds });
    }
    centralLoginNextButton(milliseconds) {
        return cy.get('#btnNext', { timeout: milliseconds });
    }
    centralLoginPassword(milliseconds) {
        return cy.get('#password', { timeout: milliseconds });
    }
    centralLoginButton(milliseconds) {
        return cy.get('#btnLogin', { timeout: milliseconds });
    }
}
export default ArfpPages;