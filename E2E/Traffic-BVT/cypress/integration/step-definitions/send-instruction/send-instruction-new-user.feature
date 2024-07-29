@Regression
Feature: Send sTraffic instruction to newly created Traffic user

    Feature Description:
    Create new Traffic user and assign a vendor. Send sTraffic instruction to the user.

    Scenario: Create new Traffic user.
        * Login to Traffic as 'Admin' user
        * Verify Traffic 'Admin' user home page
        * Create new user
        * Verify new user was created
        * Assign Vendor to 'New' user
        * Logout from Traffic

    Scenario: Login with newly created user.
        * Login to Traffic as New user and validate user agreement
        * Login to Traffic as 'New' user
        * Verify Traffic 'New' user home page
        * Logout from Traffic

    @retries(runMode=5,openMode=5)
    Scenario: Send sTraffic instruction to new Traffic user.
        * Login to sTraffic
        * Verify 'New' Traffic user is synced in sTraffic
        * Search for Estimate in sTraffic
        * Create Traffic Revision
        * Validate Traffic Revision
        * Navigate to eSend Contact Editor
        * Verify 'New' user is listed in eSend Contact Editor
        * Send Estimate from sTraffic to 'New' Traffic user
        * Logout from sTraffic

    Scenario: New Traffic user Validate instruction.
        * Login to Traffic as 'New' user
        * Verify Traffic 'New' user home page
        * Validate new instruction

    Scenario: New Traffic user Accept instruction.
        * Login to Traffic as 'New' user
        * Verify Traffic 'New' user home page
        * Accept new instruction

    Scenario: Deactivate New user.
        * Login to Traffic as 'Admin' user
        * Verify Traffic 'Admin' user home page
        * Disable New Traffic user
        * Unassign vendor from New user
        * Logout from Traffic