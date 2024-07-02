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
    registerLink() {
        return cy.get("[href='autoRegister.aspx']").last()
    };
    allLinks() {
        return cy.get('a')
    };
}
export default EPortLoginPage;


// 