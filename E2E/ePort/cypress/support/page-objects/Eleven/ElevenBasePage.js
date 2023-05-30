class BasePage {
    constructor() {
      this.logo = '.logo';
      this.menu = '.menu';
      this.cartButton = '.cart-button';
      // Add more page elements as needed
    }
  
    visit() {
      cy.visit('https://11orders.com/');
    }
  
    getLogo() {
      return cy.get(this.logo);
    }
  
    getMenu() {
      return cy.get(this.menu);
    }
  
    clickCartButton() {
      cy.get(this.cartButton).click();
    }
  
    // Add more methods for interacting with the base page as needed
  }
  
  export default new BasePage();