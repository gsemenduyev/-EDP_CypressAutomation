class TrafficHomePage {
    manageUserTab() {
        return cy.contains('Manage User');
    };
    assignVendorTab() {
        return cy.contains('Assign Vendor');
    };
    manageVendorTab() {
        return cy.contains('Manage Vendor');
    };
    searchBar() {
        return cy.get('#searchBar');
    };
    searchTxtBox() {
        return cy.get("#searchBar > [type='text']");
    };
    searchButton() {
        return cy.get("#searchBar > [value='Search']");
    };
    clearButton() {
        return cy.get("#searchBar > [value='Clear']");
    };
    importButton() {
        return cy.get("[value='Import']");
    };
    createButton() {
        return cy.get("[value='Create']");
    };
    addVendorButton() {
        return cy.get('#vendorCreation');
    };
    importVendorButton() {
        return cy.get('#importVendor');
    };
    gridCell(index) {
        return cy.get('.slick-cell').eq(index);
    };
    cr8UserForm() {
        return cy.get('#dlgUser');
    };
    cr8UserLoginNameTxtBox() {
        return cy.get("[name='da_lg']");
    };
    cr8UserFirstNameTxtBox() {
        return cy.get("[name='da_fn']");
    };
    cr8UserLastNameTxtBox() {
        return cy.get("[name='da_ln']");
    };
    cr8UserPrimaryEmailTxtBox() {
        return cy.get("[name='da_em']");
    };
    cr8UserSecondaryEmailTxtBox() {
        return cy.get("[name='da_em2']");
    };
    cr8UserPhoneTxtBox() {
        return cy.get("[name='da_ph']");
    };
    cr8UserCheckbox(index) {
        return cy.get("#dlgUser [type='checkbox']").eq(index);
    };
    cr8UserPasswordTxtBox() {
        return cy.get("[name='da_pw']");
    };
    cr8UserConfirmPasswordTxtBox() {
        return cy.get("[name='da_pw2']");
    };
    cr8UserSecurityQuestionTxtBox() {
        return cy.get("[name='da_sq']");
    };
    cr8UserSecurityAnswerTxtBox() {
        return cy.get("[name='da_sa']");
    };
    cr8UserCreateBtn() {
        return cy.get('.ui-dialog-buttonset').contains('span', 'Create');
    };
    assignedVenForm() {
        return cy.get('#dlgVndr')
    };
    assignedVenFormTitle() {
        return cy.get('.ui-dialog-title')
    };
    goToAssignBtn() {
        return cy.contains('Go to Assign');
    };
    assignVenTextBox() {
        return cy.get("[title='Enter partial vendor name to search']");
    };
    assignVenSearchBtn() {
        return cy.get("#dlgVndr [value='Search']");
    };
    assignVenGridCell(index) {
        return cy.get('#dlgVndr .slick-cell').eq(index);
    };
    assignVenBtn() {
        return cy.get('.ui-dialog-buttonset').contains('span', 'Assign Vendors');
    };
    assignVenGoToViewBtn() {
        return cy.get('.ui-dialog-buttonset').contains('span', 'Go to View');
    };
    assignVenCancelBtn() {
        return cy.get('.ui-dialog-buttonset').contains('span', 'Cancel');
    };
    inboxTab() {
        return cy.contains('Inbox');
    };
    acceptedTab() {
        return cy.contains('Accepted');
    };
    acceptInstructionsBtn() {
        return cy.get("#headerright_confirm [title='Accept Instructions']");
    };
    logoutLink() {
        return cy.contains('Logout');
    };
};
export default TrafficHomePage;