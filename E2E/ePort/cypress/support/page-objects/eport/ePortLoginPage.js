class LoginPage {
    constructor() {
      this.usernameInput = '#username';
      this.passwordInput = '#password';
      this.loginButton = 'button[type="submit"]';
      this.errorMessage = '.error-message';
    }
  
    visit() {
      cy.visit('https://eport.gotostrata.com/login');
    }
  
    setUsername(username) {
      cy.get(this.usernameInput).clear().type(username);
    }
  
    setPassword(password) {
      cy.get(this.passwordInput).clear().type(password);
    }
  
    clickLoginButton() {
      cy.get(this.loginButton).click();
    }
  
    getErrorMessage() {
      return cy.get(this.errorMessage);
    }
  
    login(username, password) {
      this.setUsername(username);
      this.setPassword(password);
      this.clickLoginButton();
    }
  }
  
  export default new LoginPage();
  
  
  
  