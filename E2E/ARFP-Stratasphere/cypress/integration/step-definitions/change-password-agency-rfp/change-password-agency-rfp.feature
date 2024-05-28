@ARFP @WIP
Feature: Change password Agency RFP

  Feature Description:
  Test functionality Change password in Agency RFP

  Scenario: Agent logs in with Permanent password
    * Login to Agency RFP with 'Permanent' password
    * Logout Agency RFP

  @retries(runMode=10,openMode=10)
  Scenario: Agent Requests new password and set Temporary password
    * Request new password on Agency RFP Forgot Password page
    * Open Forgot Password email and click on restore password link
    * Set 'Temporary' password

  Scenario: Agent logs in with Temporary password
    * Login to Agency RFP with 'Temporary' password
    * Logout Agency RFP

  @retries(runMode=10,openMode=10)
  Scenario: Agent Requests new password and set Permanent password
    * Request new password on Agency RFP Forgot Password page
    * Open Forgot Password email and click on restore password link
    * Set 'Permanent' password

  Scenario: Agent logs in with reseated Permanent password
    * Login to Agency RFP with 'Permanent' password
    * Logout Agency RFP