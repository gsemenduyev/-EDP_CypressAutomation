@ARFP, @WIP
Feature: Stratasphere and Agency RFP email verification

    Feature Description:
    Buyer creates new RFP and sends to Seller.
    Seller receives the email for New RFP Request then uploads XML Response and sends it to Buyer.
    Buyer receives the email for RFP Response

    Scenario: Buyer creates new RFP and send it to Stratasphere
        * Login to Agency RFP with 'Permanent' password
        * Create New RFP
        * Validate RFP Creation
        * Logout Agency RFP

    Scenario: Seller receives New RFP Request email from buyer
        * Search for 'Stratasphere' user in Mailinator
        * Validate 'seller' email for 'RFP Request'

    Scenario: Seller Upload Proposal response XML
        * Login to Stratasphere
        * Search for RFP in Stratasphere
        * Validate "RFP Details" Page in Stratasphere
        * Upload XML Response
        * Logout from Stratasphere

    Scenario: Buyer receives RFP Response email from buyer
        * Search for 'AgencyRFP' user in Mailinator
        * Validate 'buyer' email for 'RFP Response Received'