class HomePage {
    constructor() {
      this.logoutButton = 'a[href="/logout"]';
      this.welcomeMessage = '.welcome-message';
      this.sidebar = '.sidebar';
      // Add more page elements as needed
    }
  
    visit() {
      cy.visit('https://eport.gotostrata.com/login');
    }
  
    clickLogoutButton() {
      cy.get(this.logoutButton).click();
    }
  
    getWelcomeMessage() {
      return cy.get(this.welcomeMessage);
    }
  
    isSidebarVisible() {
      return cy.get(this.sidebar).should('be.visible');
    }
  
    // Add more methods for interacting with the home page as needed
  }
  
  export default new HomePage();
  