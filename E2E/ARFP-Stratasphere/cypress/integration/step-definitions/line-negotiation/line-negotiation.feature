@ARFP
Feature: Line negotiation

  Feature Description: Negotiation worflow between Buyer and Seller

  Scenario: Buyer creates new RFP and send it to Stratashere (LN).
    * Login to Agency RFP
    * Create New RFP
    * Validate RFP Creation
    * Logout Agency RFP

  Scenario: Seller Upload Proposal response XML (LN)
    * Login to Stratasphere
    * Search for RFP in Stratasphere
    * Validate "RFP Details" Page in Stratasphere
    * Upload XML Response
    * Logout from Stratasphere

  Scenario: Buyer negotiate Seller rate (LN)
    * Login to Agency RFP
    * Search for existing RFP
    * Click on Launch Pre-buy button
    * Validate the response from Agency
    * Change My Rete "5.00" and Negotiate the line with seller
    * Logout Agency RFP

  Scenario: Seller validates the email from buyer and Accepts the Buyer rate (LN)
    * Search Stratasphere user in Mailinator
    * "Accept" negotiation from email and verify user landed on Stratasphere page

  Scenario: Buyer received confirmation message for line negotiation Accepted and change the rate.
    * Login to Agency RFP
    * Search for existing RFP
    * Click on Launch Pre-buy button
    * Validate line changes were "accepted" by the Seller
    * Change My Rete "3.00" and Negotiate the line with seller
    * Logout Agency RFP

  Scenario: Seller validates the email from buyer and Rejects the Buyer rate (LN)
    * Search Stratasphere user in Mailinator
    * "Reject" negotiation from email and verify user landed on Stratasphere page

  Scenario: Buyer received confirmation message for line negotiation Rejected and change the rate.
    * Login to Agency RFP
    * Search for existing RFP
    * Click on Launch Pre-buy button
    * Validate line changes were "rejected" by the Seller
    * Change My Rete "4.00" and Negotiate the line with seller
    * Logout Agency RFP

  Scenario: Seller validates the email from buyer and Makes Changes to the Buyer rate (LN)
    * Search Stratasphere user in Mailinator
    * "Make Changes" negotiation from email and verify user landed on Stratasphere page

  Scenario: Buyer received confirmation message for line negotiation Make Changes.
    * Login to Agency RFP
    * Search for existing RFP
    * Click on Launch Pre-buy button
    * Validate line changes were "Make Changes" by the Seller
    * Logout Agency RFP