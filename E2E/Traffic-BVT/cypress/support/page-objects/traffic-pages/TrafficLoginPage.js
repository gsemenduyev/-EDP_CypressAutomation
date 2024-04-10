class TrafficLoginPage {
    usernameBox() {
        return cy.get('#body_txtUser');
    };
    passwordBox() {
        return cy.get('#body_txtPswd');
    };
    signInBtn() {
        return cy.get('#body_btnLogin');
    };

};
export default TrafficLoginPage;