Feature: New SBMS estimate ePort workflow.

    Feature Description:
    Create new Estimate In SBMS - Send To ELEVEN - Submit To EPort And Confirm The Order

    Scenario: Login to ePort
        * Login to ePort

    Scenario: Create new SBMS estimate and send to Eleven
        * Create new SBMS estimate and send to Eleven
        * Verify new SBMS estimate is created

    Scenario: Verify estimate made it to eleven
        * Login to Eleven
        * Search for order in Eleven
        * Verify TV order status is 'New'

