class SBMSEstimatePage {
  constructor() {
    // Define the page elements
    this.userInput = '#user-input';
    this.marketInput = '#market-input';
    this.demoInput = '#demo-input';
    this.createEstimateButton = '#create-estimate-button';
    // Add more elements as needed
  }

  setuser(user) {
    // Define the action to set the user
    cy.get(this.userInput).type(user);
  }

  setmarket(market) {
    // Define the action to set the market
    cy.get(this.marketInput).type(market);
  }

  setDemo(demo) {
    // Define the action to set the demo
    cy.get(this.demoInput).type(demo);
  }

  clickCreateEstimateButton() {
    // Define the action to click the create estimate button
    cy.get(this.createEstimateButton).click();
  }
}

export default new SBMSEstimatePage();