class AEInboxPages {
    usernameBox() {
        return cy.get('#tbUsername');
    }
    passwordBox() {
        return cy.get('#tbPassword');
    }
    loginButton() {
        return cy.get('#bSubmit');
    }
    logoutButton() {
        return cy.get('#lb_Logout');
    }
}
export default AEInboxPages;