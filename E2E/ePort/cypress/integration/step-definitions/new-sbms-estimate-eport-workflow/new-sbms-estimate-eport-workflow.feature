Feature: New SBMS estimate ePort workflow.

    Feature Description:
    Create new Estimate In SBMS - Send To ELEVEN - Submit To EPort And Confirm The Order

    Scenario: Login to ePort
        * Login to ePort

    Scenario: Create new SBMS estimate and send to Eleven
        * Create new SBMS estimate and send to Eleven
        * Verify new SBMS estimate is created

    Scenario: Send new order from Eleven to ePort
        * Login to Eleven
        * Search for order in Eleven
        * Verify TV order status is 'New'
        * Send order to ePort

    Scenario: Verify new order in ePort
        * Login to ePort
        * Verify new order details in ePort
        * Logout from ePort