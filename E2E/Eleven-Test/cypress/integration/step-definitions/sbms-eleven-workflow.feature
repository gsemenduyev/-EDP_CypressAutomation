Feature: SBMS Eleven workflow

    #   Scenario: Create SBMS Radio estimate, send it to Eleven
    # * Create Radio estimate and Send to Eleven
    # * Verify Radio estimate is created

    # Scenario: Verify Eleven user receives Radio estimate
    #     * Login to Eleven
    #     * Search for estimate
    #     * Verify Radio order status is 'New'

    # Scenario: Revise SBMS Radio estimate, send it to Eleven
    #     * Revise Radio estimate and Send to eleven
    #     * Verify revised Radio estimate

    Scenario: Verify Eleven user receives Radio estimate
        * Login to Eleven
        * Search for estimate
        * * Verify Radio order status is 'Revision'