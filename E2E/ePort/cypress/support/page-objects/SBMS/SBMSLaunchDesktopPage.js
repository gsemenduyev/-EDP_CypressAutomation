class SBMSDesktopPage {
    constructor() {
      // Define the page elements
      this.sidebar = '[data-testid="sidebar"]';
      this.dashboardButton = '[data-testid="dashboard-button"]';
      // Add more elements as needed
    }
  
    visit() {
      // Define the visit action to launch the desktop application
      cy.exec('start path/to/SBMS.exe');
      cy.wait(5000); // Adjust the wait time as needed for the application to launch
    }
  
    navigateToDashboard() {
      // Define the action to navigate to the dashboard
      cy.get(this.sidebar).contains('Dashboard').click();
    }
  
   
  }
  
  export default new SBMSDesktopPage();