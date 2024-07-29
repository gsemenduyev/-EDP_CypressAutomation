class EPortOrgAdminPage {
    title() {
        return cy.get('#title')
    };
    refreshBtn() {
        return cy.get('#PageHeader_lb_Refresh')
    };
    closeBtn() {
        return cy.get('#PageHeader_Close')
    };
    tabUserMgr() {
        return cy.get('#tabUserManager')
    };
    tabUserDelegates() {
        return cy.get('#tabUserDelegates')
    };
    tabOrgSettings() {
        return cy.get('#tabOrgSettings')
    };
    tabOfficeManager() {
        return cy.get('#tabOfficeManager')
    };
    tabGateway() {
        return cy.get('#tabGateway')
    };
    tabForwarding() {
        return cy.get('#tabForwarding')
    };
    tabRegistryUser() {
        return cy.get('#tabRegistryUser')
    };
    userMgrGridHeaders() {
        return cy.get('.DataGrid_Header')
    };
    userMgrFirstName() {
        return cy.get('#UserManagerFirstName')
    };
    userMgrLastName() {
        return cy.get('#UserManagerLastName')
    };
    userMgrPhone() {
        return cy.get('#UserManagerPhone')
    };
    userMgrEmail() {
        return cy.get('#UserManagerEmail')
    };
    userMgrTypeDropdown() {
        return cy.get('#UserManagerType')
    };
    userMgrLoginName() {
        return cy.get('#UserManagerUserName')
    };
    userMgrNewPass() {
        return cy.get('#UserManagerNewPass')
    };
    userMgrNewPass() {
        return cy.get('#UserManagerNewPass')
    };
    userMgrAvailOrgs() {
        return cy.get('#UserManagerAvailOrgs')
    };
    userMgrAddBtn() {
        return cy.get('#UserManagerAdd')
    };
    userMgrSelectedOrgs() {
        return cy.get('#UserManagerSelectedOrgs')
    };
    userMgrCreateBtn() {
        return cy.get('#Anthem_UserManagerCreate__')
    };
    userMgrMessage() {
        return cy.get('#UserManagerMessage')
    };
    searchOrganization() {
        return cy.get('#UserManagerSearchOrganization')
    };
    showActiveUserCheckbox() {
        return cy.get('#chbUsrShowActv')
    };
    userMgrSearchOffice() {
        return cy.get('#UserManagerSearchOffice')
    };
    userMgrSearchFirstName() {
        return cy.get('#UserManagerSearchFirstName')
    };
    userMgrSearchLastName() {
        return cy.get('#UserManagerSearchLastName')
    };
    userMgrSearchBtn() {
        return cy.get('#UserManagerSearch')
    };
    userMgrSearchClearBtn() {
        return cy.get('#UserManagerSearchClear')
    };
    userMgrGridOddRow() {
        return cy.get('.DataGrid_RowItem')
    };
    userMgrGridEvenRow() {
        return cy.get('.DataGrid_RowAlternateItem')
    };
    userMgrGridActiveCheckboxes() {
        return cy.get(".DataGrid_Object [type='checkbox']")
    };
    userMgrGridEditBtn() {
        return cy.get(".DataGrid_Object [value='Edit']")
    };
}
export default EPortOrgAdminPage;