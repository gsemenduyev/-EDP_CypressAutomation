class EPortLoginPage {
    ePortLogo() {
        return cy.get('img').first().invoke('attr', 'src');
    };
    loginForm() {
        return cy.get("[src='Login_New.aspx']")
            .its('0.contentDocument')
            .then(cy.wrap)
            .find('#Table1');
    };
    forgotPasswordLink() {
        return cy.get("[src='Login_New.aspx']")
            .its('0.contentDocument')
            .then(cy.wrap)
            .find('a');
    };

    trainingAndSupportIframe() {
        return cy.get("[src='ClientHelpLink.aspx']")
            .its('0.contentDocument')
            .then(cy.wrap)
            .find('table');
    };
    trainingAndSupportLinks() {
        return cy.get("[src='ClientHelpLink.aspx']")
            .its('0.contentDocument')
            .then(cy.wrap)
            .find('a');
    };
    allLinks() {
        return cy.get('a')
    };
}
export default EPortLoginPage;
