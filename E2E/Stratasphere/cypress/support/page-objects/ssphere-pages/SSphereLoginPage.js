class SSphereLoginPage{
    usernameBox() {
        return cy.get('#username');
    }

    passwordBox() {
        return cy.get('#password');
    }

    loginButton() {
        return cy.get('.btn.btn-primary');
    }
}
export const sSphereLoginPage = new SSphereLoginPage;