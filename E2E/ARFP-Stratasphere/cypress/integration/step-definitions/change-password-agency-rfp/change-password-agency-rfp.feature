@WIP
Feature: Change password Agency RFP

  Feature Description:
  Test functionality Change password in Agency RFP

  Scenario: Agent Requests new password
    * Login to Agency RFP with 'Permanent' password
    * Logout Agency RFP
    * Click on Forgot Password then insert Username

  Scenario: Agent checks the email for password reset link and resets the password
    * Search for 'AgencyRFP' user in Mailinator
    * Check the email for new password request and set 'Temporary' password

  Scenario: Agent is able to login with Temporary password and Request new password
    * Login to Agency RFP with 'Temporary' password
    * Logout Agency RFP
    * Click on Forgot Password then insert Username

  Scenario: Agent checks the email for password reset link and resets the password
    * Search for 'AgencyRFP' user in Mailinator
    * Check the email for new password request and set 'Permanent' password

  Scenario: Agent is able to login with Permanent password
    * Login to Agency RFP with 'Permanent' password
    * Logout Agency RFP