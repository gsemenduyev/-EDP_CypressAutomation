class sTrafficPages {
    usernameBox() {
        return cy.get('#Username');
    }
    passwordBox() {
        return cy.get('#Password');
    }
    loginButton() {
        return cy.get('.btn');
    }
    logoutButton() {
        return cy.get('.user-dropdown-span').eq(1);
    }

}
export default sTrafficPages;