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
    newPasswordInput() {
        return cy.get('.form-control.login-input').eq(0);
    }
    conformNewPasswordInput() {
        return cy.get('.form-control.login-input').eq(1);
    }
    resetPasswordConformationMsgSyntax() {
        return '.col-md-offset-2.col-sm-offset-2 p';
    }
    pageTitle() {
        return cy.get('#page-title');
    }
}
export default AgencyLoginPage;