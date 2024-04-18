@WIP
Feature: Admin is not able to import existing user from CSV file

    Feature Description:
    Admin is not able to import existing user from CSV file.

    Scenario: Create new Traffic user.
        * Login to Traffic as 'Admin' user
        * Verify Traffic 'Admin' user home page
        * Verify user exists
        * Navigate to Import User page
        * Import user from CSV file
        * Logout from Traffic