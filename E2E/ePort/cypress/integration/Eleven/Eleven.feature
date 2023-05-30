Feature: Eleven Workflow

  Scenario: Send an estimate from Eleven to ePort Strata
    Given I am logged in to Eleven
    When I send an estimate to ePort Strata
    Then the estimate should be sent successfully