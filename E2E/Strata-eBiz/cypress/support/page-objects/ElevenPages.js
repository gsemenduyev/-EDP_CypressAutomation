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
};
export default ElevenPages;