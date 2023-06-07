class AgencyLoginPage {
    usernameBox() {
        return cy.get('#Username');
    }
    passwordBox() {
        return cy.get('#Password');
    }
    loginButton() {
        return cy.get('.btn');
    }
}
export default AgencyLoginPage;