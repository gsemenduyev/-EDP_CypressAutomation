class ViewEditResponsesPage {
    responsesTable() {
        return cy.get('.ui-grid-canvas');
    }
    hamburgerButton() {
        return cy.get('.ui-grid-icon-menu');
    }
    exportButton() {
        return cy.get('.ui-grid-menu-item').eq(0);
    }
    tableHeaders() {
        return cy.get('.sortable');
    }
    tableCells() {
        return cy.get('.ui-grid-cell-contents');;
    }
}
export default ViewEditResponsesPage;
