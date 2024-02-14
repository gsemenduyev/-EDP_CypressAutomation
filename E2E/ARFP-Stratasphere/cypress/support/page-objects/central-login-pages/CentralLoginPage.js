class CentralLoginPage {
    loginEmail(milliseconds) {
        return cy.get('#email', { timeout: milliseconds });
    }
    loginNextButton(milliseconds) {
        return cy.get('#btnNext', { timeout: milliseconds });
    }
    loginPassword(milliseconds) {
        return cy.get('#password', { timeout: milliseconds });
    }
    confirmPassword(milliseconds) {
        return cy.get('#confirmPassword', { timeout: milliseconds });
    }
    loginButton(milliseconds) {
        return cy.get('#btnLogin', { timeout: milliseconds });
    }
    forgotPassword(milliseconds) {
        return cy.get('.issueLink', { timeout: milliseconds });
    }
    resetPasswordText(milliseconds) {
        return cy.get('.reset-pwd-reminder-text', { timeout: milliseconds });
    }
    submitButton(milliseconds) {
        return cy.get('#btnSubmit', { timeout: milliseconds });
    }
    emailSendText(milliseconds) {
        return cy.get('[style="width:500px"] > div', { timeout: milliseconds });
    }
    resetPasswordMessageSyntax() {
        return '.message-success';
    }
}
export default CentralLoginPage;