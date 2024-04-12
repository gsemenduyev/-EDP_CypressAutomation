class sTrafficLoginPage {
    usernameTxtBox() {
        return cy.get('#Username');
    };
    passwordTxtBox() {
        return cy.get('#Password');
    };
    loginBtn() {
        return cy.get('.btn');
    };

};
export default sTrafficLoginPage;