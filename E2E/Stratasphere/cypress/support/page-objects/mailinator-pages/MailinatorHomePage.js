class MailinatorHomePage{
    userSearchBox() {
        return cy.get('#inbox_field');
    }
    newRfpEmailSyntax() {
        return "tr[ng-repeat='email in emails']";
    }

    publicMessageText(milliseconds) {
        return cy.get('.gray-color', { timeout: milliseconds });
    }
    emailBodyIframe(){
        return cy.get('#html_msg_body');
    }
    goButton() {
        return cy.get('.primary-btn');
    }
    emailName() {
        return cy.get("tr[ng-repeat='email in emails'] .ng-binding");
    }
    emailDetailsSyntax() {
        return '.nowrapLabel + td';
    }
    clickHereSsphereLinkSyntax() {
        return "[rel*='nofollow']";
    }
    redirectSsphereLink() {
        return cy.get('a').eq(0)
    }
}
export const mailinatorHomePage = new MailinatorHomePage;