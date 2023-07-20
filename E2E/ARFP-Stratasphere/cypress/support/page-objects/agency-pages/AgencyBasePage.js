class AgencyBasePage {
    pageTitle(milliseconds) {
        return cy.get('#page-title', { timeout: milliseconds })
    }
    startNewRfp() {
        return cy.get('.dropdown-menu.right [href*="proposals"]');
    }
    signOutButton() {
        return cy.get("[href='/RFP/login/SignOut']");
    }
    searchExistingRfp() {
        return cy.get("[href*='search']");
    }
    pastDueRfpModalSyntax() {
        return '.modal-content';
    }
    pastDueRfpModalNoButton() {
        return cy.get(".osu-button.ghost").eq(0);
    }
    alertBox() {
        return cy.get('.s-alert-box-inner span');
    }
    versionNumber() {
        return cy.get('.footer .text-right');
    }
}
export default AgencyBasePage;