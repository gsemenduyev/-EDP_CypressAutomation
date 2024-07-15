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
    showChangeAEStationLink() {
        return cy.get("[data-action='show-changeAE']")
    };
    selectSellerDropdown() {
        return cy.get('#changeAE-master-rep')
    };
    selectViaDropdown() {
        return cy.get('#changeAE-transport')
    };
    selectSubRepCoDropdown() {
        return cy.get('#changeAE-sub-rep')
    };
    selectSubRepOfficeDropdown() {
        return cy.get('#changeAE-office')
    };
    selectChangeAEDropdown() {
        return cy.get('#changeAE-ae')
    };
};
export default ElevenHomePage;