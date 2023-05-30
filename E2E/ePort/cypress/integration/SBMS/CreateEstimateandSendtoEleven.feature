Feature: Estimate Workflow

  Scenario: Create an estimate and send it to Eleven
    Given I am logged in to SBMS Strata
    When I create a new estimate
    And I provide the estimate details
    And I save the estimate
    And I send the estimate to Eleven
    Then the estimate should be sent successfully