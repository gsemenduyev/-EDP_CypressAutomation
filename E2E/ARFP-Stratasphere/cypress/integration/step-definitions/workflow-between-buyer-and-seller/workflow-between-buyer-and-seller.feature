@Stratasphere @ARFP
Feature: Workflow between buyer and seller

  Feature Description:
  Buyer creates new RFP and sends to Seller, Seller uploads Proposal XML and sends to Buyer,
  Buyer receives the Proposal XML changes the Rate and sends Rate request to Seller,
  Seller receives the email from Buyer with the new Rate,
  Seller updates Rate request and sends it back to Buyer.

  Scenario: Buyer creates new RFP and send it to Stratasphere (WBBS)
    * Login to Agency RFP with 'Permanent' password
    * Create New RFP
    * Validate RFP Creation
    * Logout Agency RFP

  Scenario: Seller Upload Proposal response XML (WBBS)
    * Login to Stratasphere
    * Search for RFP in Stratasphere
    * Validate "RFP Details" Page in Stratasphere
    * Upload XML Response
    * Logout from Stratasphere

  Scenario: Buyer validate the Proposal response and creates Type1 Rate Request (WBBS)
    * Login to Agency RFP with 'Permanent' password
    * Search for existing RFP
    * Click on Launch Pre-buy button
    * Validate the response from "Seller Xml"
    * Delete the Line
    * Create Type1 Rate Request
    * Logout Agency RFP

  Scenario: Seller validates the email from buyer (WBBS)
    * Search for 'Stratasphere' user email
    * Validate email for New Rate Request

  Scenario: Seller Redirects from Email to Stratasphere and Revise the Buy Rate (WBBS)
    * Redirect from email to Stratasphere
    * Validate Proposal Response Page
    * Validate "Proposal Details" Page in Stratasphere
    * Revise the Buy Rate
    * Buyer Rate Revision Validations
    * Logout from Stratasphere

  Scenario: Buyer receives new Rate from Seller (WBBS)
    * Login to Agency RFP with 'Permanent' password
    * Search for existing RFP
    * Click on Launch Pre-buy button
    * Validate Buyer Revision Details
    * Logout Agency RFP