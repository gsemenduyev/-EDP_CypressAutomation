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
        * Login to Traffic as 'New' user
        * Verify Traffic 'New' user home page
        * Logout from Traffic


