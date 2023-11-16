class EportPages {
    usernameBox() {
        return cy.get('#tbUsername');
        // return cy.get('iframe')
        //     .eq(0)
        //     .its('0.contentDocument')
        //     .then(cy.wrap)
        //     .find('#tbUsername')
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
}
export default EportPages;