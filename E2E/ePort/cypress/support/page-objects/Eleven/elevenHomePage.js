class HomePage {
    constructor() {
      this.searchInput = 'input[name="search"]';
      this.searchButton = 'button[type="submit"]';
      this.resultsContainer = '.search-results';
      // Add more page elements as needed
    }
  
    visit() {
      cy.visit('https://11orders.com/');
    }
  
    setSearchQuery(query) {
      cy.get(this.searchInput).clear().type(query);
    }
  
    clickSearchButton() {
      cy.get(this.searchButton).click();
    }
  
    getSearchResults() {
      return cy.get(this.resultsContainer);
    }
  
    search(query) {
      this.setSearchQuery(query);
      this.clickSearchButton();
    }
  
    // Add more methods for interacting with the home page as needed
  }
  
  export default new HomePage();
  
  