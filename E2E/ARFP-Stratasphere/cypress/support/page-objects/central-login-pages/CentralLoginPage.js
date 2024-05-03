class CentralLoginPage {
    loginEmail() {
        return cy.get('#email');
    }
    loginNextButton() {
        return cy.get('#btnNext');
    }
    loginPassword() {
        return cy.get('#password');
    }
    confirmPassword() {
        return cy.get('#confirmPassword');
    }
    loginButton() {
        return cy.get('#btnLogin');
    }
    forgotPassword() {
        return cy.get('.issueLink');
    }
    resetPasswordText() {
        return cy.get('.reset-pwd-reminder-text');
    }
    submitButton() {
        return cy.get('#btnSubmit');
    }
    emailSendText() {
        return cy.get('[style="width:500px"] > div');
    }
    resetPasswordMessageSyntax() {
        return '.message-success';
    }
}
export default CentralLoginPage;