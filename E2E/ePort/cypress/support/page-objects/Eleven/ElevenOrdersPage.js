class OrdersPage {
    constructor() {
      this.ordersTable = '.orders-table';
      this.orderStatusFilter = '#order-status-filter';
      this.applyFilterButton = '#apply-filter-button';
    }
  
    visit() {
      cy.visit('https://11orders.com/orders');
    }
  
    getOrdersTable() {
      return cy.get(this.ordersTable);
    }
  
    setOrderStatusFilter(status) {
      cy.get(this.orderStatusFilter).select(status);
    }
  
    clickApplyFilterButton() {
      cy.get(this.applyFilterButton).click();
    }
  
    // Add more methods for interacting with the orders page as needed
  }
  
  export default new OrdersPage();
  