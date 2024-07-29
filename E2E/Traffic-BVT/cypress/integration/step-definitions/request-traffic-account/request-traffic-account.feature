@Regression @Smoke
Feature: Request Traffic account

    Feature Description:
    User Requests new Traffic account and Verifies login page.

    Scenario: Verify Login page.
        * Visit Traffic login page
        * Visit Forgot your password page
        * Visit User Agreement page
        * Visit Privacy Policy page
        * Visit Request Help page

    Scenario: Request new Traffic account.
        * Visit Traffic login page
        * Navigate to Registration Request Form page
        * Add user information to the Registration Request Form
        * Add station information to the Registration Request Form
        * Confirm the information in to the Registration Request Form