Feature: Messaging between Seller and Buyer

  Feature Description: Validate messaging between Seller and Buyer

  Scenario: Buyer creates new RFP and send it to Stratashere.
    * Login to Agency RFP
    * Create New RFP
    * Validate RFP Creation
    * Logout Agency RFP

  Scenario: Seller Validates RFP Details Page and sends a message to buyer
    * Login to Stratasphere
    * Search for RFP in Stratasphere
    * Validate "RFP Details" Page in Stratasphere
    * Send a message from Seller to Buyer
    * Logout from Stratasphere

  Scenario: Seller Validates RFP Details Page and sends a message to Buyer
    * Login to Agency RFP
    * Search for existing RFP
    * Click on Launch Pre-buy button
    * Validate message from Buyer
    * Send a message from Buyer to Seller
    * Logout Agency RFP

  Scenario: Seller receives the massage from Buyer
    * Login to Stratasphere
    * Search for RFP in Stratasphere
    * Validate "RFP Details" Page in Stratasphere
    * Validate the message from Buyer
    * Logout from Stratasphere