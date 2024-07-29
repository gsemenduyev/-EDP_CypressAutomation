class EPortReqPwdPage {
    sMessage() {
        return cy.get('#sMessage');
    };
    sEmail() {
        return cy.get('#sEmail');
    };
    sUser() {
        return cy.get('#sUser');
    };
    sLowerMessage() {
        return cy.get('#sLowerMessage');
    };
    allLinks() {
        return cy.get('a');
    };
    submitBtn() {
        return cy.get('#bSubmit');
    };
}
export default EPortReqPwdPage;