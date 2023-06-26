@ARFP
Feature: Import from prebuy screen

    Feature Description:
    Buyer creates new RFP and Imports from prebuy screen

    Scenario: Buyer creates new RFP and validates the imported Xml
        * Login to Agency RFP
        * Create New RFP
        * Validate RFP Creation
        * Search for existing RFP
        * Click on Launch Pre-buy button
        * Import from prebuy screen
        * Validate the response from 'Buyer Imported Xml'
        * Logout Agency RFP