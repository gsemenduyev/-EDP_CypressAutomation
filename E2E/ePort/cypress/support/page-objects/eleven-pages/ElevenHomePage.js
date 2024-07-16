class ElevenHomePage {
    orderSearchBox() {
        return cy.get('#gotoSidebarItem');
    };
    goButton() {
        return cy.get('#btnGotoSidebarItem');
    };
    headerEstimateText() {
        return cy.get('#headerEstimateText');
    };
    headerEstimateTextSyntax() {
        return '#headerEstimateText';
    };
    toggleAll() {
        return cy.get('.toggle-all')
    };
    orderStatus() {
        return cy.get("[data-action='show-audit']")
    };
    lstActionName() {
        return cy.get('#lstActionName')
    };
    selectAllCheckbox() {
        return cy.get('.slick-column-name > input')
    };
    submitButton() {
        return cy.get('.button-bar-main > .save')
    };
    okButton() {
        return cy.get('.button-bar-confirm > .text-right > .save')
    };
};
export default ElevenHomePage;