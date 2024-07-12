class EPortHelpPage {
    userGuidesText() {
        return cy.get('.SubHeadBlue').eq(0);
    };
    needHelpText() {
        return cy.get('.SubHeadBlue').eq(1);
    };
    allLinks() {
        return cy.get('a');
    };
};
export default EPortHelpPage;