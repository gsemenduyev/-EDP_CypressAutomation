class EPortChangePwdPage {
    oldPwdTxtBox() {
        return cy.get('#tb_OldPwd');
    };
    newPwdTxtBox() {
        return cy.get('#tb_NewPwd');
    };
    confirmPwdTxtBox() {
        return cy.get('#tb_ConfirmPwd');
    };
    submitBtn() {
        return cy.get('#b_Submit');
    };
    cancelBtn() {
        return cy.get('#b_Cancel');
    };
}
export default EPortChangePwdPage;