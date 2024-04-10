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
    userAgreementTxt() {
        return cy.get('#body_secEula div');
    };
    acceptBtn() {
        return cy.get('#body_btnAgree');
    };
    doNotAcceptBtn() {
        return cy.get('#body_btnDisagree');
    };
    doNotAcceptBtn() {
        return cy.get('#body_btnDisagree');
    };

};
export default TrafficLoginPage;