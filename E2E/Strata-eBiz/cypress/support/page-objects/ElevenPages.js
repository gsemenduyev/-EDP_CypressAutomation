class ElevenPages {
    usernameBox() {
        return cy.get('#Username');
    };
    passwordBox() {
        return cy.get('#Password');
    };
    loginButton() {
        return cy.get('#SignIn');
    };
    logoutButton() {
        return cy.get('[data-menu="logout"]');
    };
    skipButtonSyntax() {
        return '.ui-dialog-buttonset > :nth-child(2)';
    };
};
export default ElevenPages;