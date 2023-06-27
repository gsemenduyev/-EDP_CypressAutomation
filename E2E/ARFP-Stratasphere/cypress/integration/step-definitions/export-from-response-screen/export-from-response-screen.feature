@ARFP
Feature: Export from Response screen

    Feature Description:
    Buyer creates new RFP and sends to Seller, Seller uploads Proposal XML and sends to Buyer,
    Buyer receives the Proposal XML. Buyer navigates to Response screen,
    then clicks on hamburger button and exports the XML file

   # Scenario: Buyer creates new RFP and sends it to Stratashere (EFPS)
   #     * Login to Agency RFP
   #     * Create New RFP
   #     * Validate RFP Creation
   #     * Logout Agency RFP

   # Scenario: Seller Upload Proposal response XML (EFPS)
   #     * Login to Stratasphere
   #     * Search for RFP in Stratasphere
   #     * Validate "RFP Details" Page in Stratasphere
   #     * Upload XML Response
   #     * Logout from Stratasphere

    Scenario: Buyer validate the Proposal response and exports from prebuy screen (EFPS)
        * Login to Agency RFP
        * Search for existing RFP
        * Click on Response button
  