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
        return '[index="1"] > .modal-dialog > .modal-content';
    }
    pastDueRfpModalNoButton() {
        return cy.get(".osu-button.ghost").first();
    }
    alertBox() {
        return cy.get('.s-alert-box-inner span');
    }
    versionNumber() {
        return cy.get('.footer .text-right');
    }
}
export default AgencyBasePage;