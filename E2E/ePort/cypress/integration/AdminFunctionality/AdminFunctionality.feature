Feature: Admin Functionality

  Scenario: Login as an admin
    Given I open the login page
    When I enter the admin username and password
    And I click the login button
    Then I should be logged in as an admin

  Scenario: Navigate to user management page
    Given I am logged in as an admin
    When I navigate to the user management page
    Then the user management page should be displayed

  Scenario: Create a new user
    Given I am logged in as an admin
    When I navigate to the user management page
    And I click the "Create User" button
    And I fill in the user details
    And I click the "Save" button
    Then the user should be created successfully