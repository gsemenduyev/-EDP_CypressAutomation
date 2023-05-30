Feature: Order Workflow

  Scenario: Create an order
    Given I am logged in as an admin
    And I navigate to the orders page
    When I click on the "Create Order" button
    And I fill in the order details
    And I submit the order
    Then the order should be created successfully

  Scenario: Approve an order
    Given I am logged in as an admin
    And I navigate to the orders page
    When I search for an order by order number
    And I click on the order details
    And I click on the "Approve" button
    Then the order should be approved

  Scenario: Reject an order
    Given I am logged in as an admin
    And I navigate to the orders page
    When I search for an order by order number
    And I click on the order details
    And I click on the "Reject" button
    Then the order should be rejected