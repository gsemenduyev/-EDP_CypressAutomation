Feature: Pages without login

  Scenario: Visit the home page
    When I visit the home page
    Then I should see the welcome message

  Scenario: Visit the contact page
    When I visit the contact page
    Then I should see the contact information

  Scenario: Visit the about page
    When I visit the about page
    Then I should see the about information

  Scenario: Visit the services page
    When I visit the services page
    Then I should see the available services