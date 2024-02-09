class EportPages {
    usernameBox() {
        return cy.get('#tbUsername');
    };

    passwordBox() {
        return cy.get('#tbPassword')
    }
    loginButton() {
        return cy.get('#bSubmit')
    }
    logoutButton() {
        return cy.get('#PageHeader_Logout')
    }
    welcomeText() {
        return cy.get('#viewOtherOrders')
    }
}
export default EportPages;