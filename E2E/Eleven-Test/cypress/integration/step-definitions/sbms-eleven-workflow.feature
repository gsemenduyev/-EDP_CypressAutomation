Feature: SBMS Eleven workflow

    Scenario: Create SBMS Radio estimate, send it to Eleven
        * Create Radio estimate and Send to Eleven
        * Verify Radio estimate is created

    Scenario: Verify Eleven user receives Radio estimate
        # * Test
        * Login to Eleven
        * Search for order
        * Verify Radio order status is 'New'
        * Send order to Stratasphere

    Scenario: Revise SBMS Radio estimate, send it to Eleven
        * Revise Radio estimate and Send to eleven
        * Verify Radio estimate is created

    Scenario: Verify Eleven user receives Radio estimate
        * Login to Eleven
        * Search for order
        * Verify Radio order status is 'Revision'