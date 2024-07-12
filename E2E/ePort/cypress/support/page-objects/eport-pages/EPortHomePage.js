class EPortHomePage {
    welcomeTitle() {
        return cy.get('.separator')
    };
    password() {
        return cy.get('#tbPassword')
    };
    submitBtn() {
        return cy.get('#bSubmit')
    };
    quickSearchLink() {
        return cy.get('a').eq(3)
    };
    logoutLink() {
        return cy.get('a').eq(2)
    };
    needHelpLink() {
        return cy.get('a').eq(1)
    };
    refreshBtn() {
        return cy.get('#lb_Refresh')
    };
    tabInbox() {
        return cy.get('#tabInbox')
    };
    tabPending() {
        return cy.get('#tabPending')
    };
    tabDrafts() {
        return cy.get('#tabDrafts')
    };
    tabCompleted() {
        return cy.get('#tabCompleted')
    };
    ordersBtn() {
        return cy.get('#subOrders2')
    };
    revisionsBtn() {
        return cy.get('#subRevisions2')
    };
    makegoodsBtn() {
        return cy.get('#subMakegoods2')
    };
    logTimesBtn() {
        return cy.get('#subLogTimes')
    };
    cashTradeAllocationBtn() {
        return cy.get('#subCashTradeAllocation')
    };
    inboxGridHeaders() {
        return cy.get('.DataGrid_Header')
    };
    selectActionDropdown() {
        return cy.get('#SelectAction')
    };
    changeUserPasswordLink() {
        return cy.get('#a_User')
    };
    userViewLink() {
        return cy.get('#a_userViewLink')
    };
    userViewDropdown() {
        return cy.get('#userViewDrop')
    };
}
export default EPortHomePage;