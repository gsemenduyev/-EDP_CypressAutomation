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
    userAgreementParagraphs() {
        return cy.get('.auto-style1');
    };
    requestBtn() {
        return cy.get("[name='ctl00$body$ctl03']");
    };
    userGuideBtn() {
        return cy.get("[name='ctl00$body$ctl04']");
    };
    forgotPasswordLink() {
        return cy.get('.bti-sz-plus.bti-rgb-txt');
    };
    footerLinks(index) {
        return cy.get('.footer.bti-rgb-txt').eq(index);
    };
    privacyPolicyParagraphs() {
        return cy.get('p');
    };
    forgotPswUserNameBox() {
        return cy.get("[name='ctl00$body$txtUser']");
    };
    forgotPswEmailBox() {
        return cy.get('#body_txtEmail');
    };
    regeneratePswBtn() {
        return cy.get('#body_btnDoit');
    };

};
export default TrafficLoginPage;