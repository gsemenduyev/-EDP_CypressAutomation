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
    forgotPasswordButton() {
        return cy.get("[href='/RFP/forgotpassword']");
    }
    submitButton() {
        return cy.get('.btn');
    }
    submitButtonSyntax() {
        return '.btn.btn-primary.white';
    }
    forgotPasswordConformation() {
        return cy.get('p');
    }
    newPasswordInput(milliseconds) {
        return cy.get('.form-control.login-input', { timeout: milliseconds }).eq(0);
    }
    conformNewPasswordInput() {
        return cy.get('.form-control.login-input').eq(1);
    }
    resetPasswordConformationMsgSyntax() {
        return '.col-md-offset-2.col-sm-offset-2 p';
    }
    pageTitle(milliseconds) {
        return cy.get('#page-title', { timeout: milliseconds });
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
export default AgencyLoginPage;