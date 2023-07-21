@ARFP
Feature: Change password Agency RFP

  Feature Description:
  Test functionality Change password in Agency RFP

  Scenario: Agent logs in with Permanent password
    * Login to Agency RFP with 'Permanent' password
    * Logout Agency RFP

  Scenario: Agent Requests new password and set Temporary password
    * Request new password link and set 'Temporary' password

  Scenario: Agent logs in with Temporary password
    * Login to Agency RFP with 'Temporary' password
    * Logout Agency RFP

  Scenario: Agent Requests new password and set Permanent password
    * Request new password link and set 'Permanent' password

  Scenario: Agent logs in with reseated Permanent password
    * Login to Agency RFP with 'Permanent' password
    * Logout Agency RFP