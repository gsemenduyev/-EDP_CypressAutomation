@Smoke @WIP
Feature: Send sTraffic instruction to existing Traffic user

    Feature Description:
    Send sTraffic instruction to existing Traffic user.

    Scenario: Admin verifies user Traffic exists.
        * Login to Traffic as 'Admin' user
        * Verify Traffic 'Admin' user home page
        * Verify user exists
        * Verify user assigned vendors
        * Logout from Traffic

    Scenario: Existing Traffic user is able to login.
        * Login to Traffic as 'Existing' user
        * Verify Traffic 'Existing' user home page
        * Logout from Traffic

    Scenario: Send sTraffic instruction to Traffic user.
        * Login to sTraffic
        * Verify 'Existing' Traffic user is synced in sTraffic
        * Search for Estimate in sTraffic
        * Create Traffic Revision
        * Validate Traffic Revision
        * Navigate to eSend Contact Editor
        * Verify 'Existing' user is listed in eSend Contact Editor
        * Send Estimate from sTraffic to 'Existing' Traffic user
        * Logout from sTraffic

    Scenario: New Traffic user Validate instruction.
        * Login to Traffic as 'Existing' user
        * Verify Traffic 'Existing' user home page
        * Validate new instruction

    Scenario: New Traffic user Accept instruction.
        * Login to Traffic as 'Existing' user
        * Verify Traffic 'Existing' user home page
        * Accept new instruction
        * Logout from Traffic