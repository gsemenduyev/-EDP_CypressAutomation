class TrafficPages {
    usernameBox() {
        return cy.get('#body_txtUser');
    }
    passwordBox() {
        return cy.get('#body_txtPswd');
    }
    loginButton() {
        return cy.get('#body_btnLogin');
    }
    logoutButton() {
        return cy.contains('Logout');
    }

}
export default TrafficPages;