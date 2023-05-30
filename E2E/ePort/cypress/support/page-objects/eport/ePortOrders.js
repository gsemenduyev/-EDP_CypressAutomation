class OrderPage {
    constructor() {
      this.orderNumberInput = '#order-number';
      this.searchButton = '#search-button';
      this.orderDetails = '.order-details';
    }
  
    visit() {
      cy.visit('https://eport.gotostrata.com/login/order');
    }
  
    setOrderNumber(orderNumber) {
      cy.get(this.orderNumberInput).clear().type(orderNumber);
    }
  
    clickSearchButton() {
      cy.get(this.searchButton).click();
    }
  
    getOrderDetails() {
      return cy.get(this.orderDetails);
    }
  
    searchOrder(orderNumber) {
      this.setOrderNumber(orderNumber);
      this.clickSearchButton();
    }
  }
  
  export default new OrderPage();