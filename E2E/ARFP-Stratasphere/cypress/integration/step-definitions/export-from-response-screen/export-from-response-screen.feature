@ARFP
Feature: Export from Response screen

   Feature Description:
   Buyer creates new RFP and sends to Seller, Seller uploads Proposal XML and sends to Buyer,
   Buyer receives the Proposal XML. Buyer navigates to View and Edit Responses page,
   then clicks on hamburger button and exports the XLSX file

   Scenario: Buyer creates new RFP and sends it to Stratashere
      * Login to Agency RFP with 'Permanent' password
      * Create New RFP
      * Validate RFP Creation
      * Logout Agency RFP

   Scenario: Seller Upload Proposal response XML
      * Login to Stratasphere
      * Search for RFP in Stratasphere
      * Validate "RFP Details" Page in Stratasphere
      * Upload XML Response
      * Logout from Stratasphere

   Scenario: Buyer navigates to 'View and Edit Responses' page and exports XLSX file from hamburger dropdown
      * Login to Agency RFP with 'Permanent' password
      * Search for existing RFP
      * Navigate to View and Edit Responses page
      * Export XLSX file from hamburger dropdown
      * Validate XLSX file
      * Logout Agency RFP