/// <reference types="Cypress" />
/// <reference types="cypress-data-session" />
/// <reference types="cypress-iframe" />
import 'cypress-data-session'
import 'cypress-iframe'
import { Given } from "@badeball/cypress-cucumber-preprocessor";
import { recurse } from 'cypress-recurse';
import AgencyLoginPage from '../../../support/page-objects/agency-pages/AgencyLoginPage';
import AgencyBasePage from '../../../support/page-objects/agency-pages/AgencyBasePage';
import CreateRfpPage from "../../../support/page-objects/agency-pages/CreateRfpPage";
import RfpDetailsPage from "../../../support/page-objects/agency-pages/RfpDetailsPage";
import SSphereLoginPage from "../../../support/page-objects/ssphere-pages/SSphereLoginPage";
import SSphereProposalsPage from "../../../support/page-objects/ssphere-pages/SSphereProposalsPage";
import SSphereBasePage from "../../../support/page-objects/ssphere-pages/SSphereBasePage";
import SSphereHomePage from "../../../support/page-objects/ssphere-pages/SSphereHomePage";
import SearchRfpPage from "../../../support/page-objects/agency-pages/SearchRfpPage";
import LinearProposalRfpPage from "../../../support/page-objects/agency-pages/LinearProposalRfpPage";
import MailinatorHomePage from "../../../support/page-objects/mailinator-pages/MailinatorHomePage";
import SSphereProposalResponsePage from "../../../support/page-objects/ssphere-pages/SSphereProposalResponsePage";
import EnvUtils from "../../../support/utils/EnvUtils"

const agencyLoginPage = new AgencyLoginPage;
const agencyBasePage = new AgencyBasePage;
const createRfpPage = new CreateRfpPage;
const sSphereLoginPage = new SSphereLoginPage;
const sSphereProposalsPage = new SSphereProposalsPage;
const sSphereBasePage = new SSphereBasePage;
const sSphereHomePage = new SSphereHomePage;
const linearProposalRfpPage = new LinearProposalRfpPage;
const mailinatorHomePage = new MailinatorHomePage;
const sSphereProposalResponsePage = new SSphereProposalResponsePage;
const searchRfpPage = new SearchRfpPage;
const rfpDetailsPage = new RfpDetailsPage;
const envUtils = new EnvUtils;

const FILE_NAME = 'stores/TEST Dallas RTG_IMP Dec2023.xml'
const SELLER_REVISION_RATE = '8';
const BUYER_REVISION_RATE = '$ 5.00';

let newRfpParam;
let sellerXml;
let buyerXml

before(function () {
    cy.fixture('/agencyRFP/new-rfp-param').then(function (data) {
        newRfpParam = data;
    })
    cy.fixture('/agencyRFP/xml-response-param').then(function (data) {
        sellerXml = data;
    })
    cy.fixture('/agencyRFP/import-xml-prebuy-screen-param').then(function (data) {
        buyerXml = data;
    })
})
//Login to Agency RFP with 'Temporary, Permanent' password
Given('Login to Agency RFP with {string} password', string => {
    var agencyPassword;
    if (string === 'Temporary') {
        agencyPassword = envUtils.getTempAgencyPassword();
    } else if (string === 'Permanent') {
        agencyPassword = envUtils.getAgencyPassword();
    }
    cy.visit(envUtils.getAgencyUrl());
    agencyBasePage.pageTitle().should('have.text', 'Sign In');
    agencyLoginPage.usernameBox().type(envUtils.getAgencyUsername());
    agencyLoginPage.passwordBox().type(agencyPassword, { log: false });
    agencyLoginPage.loginButton().click();
    cy.title().should('eq', 'Home - RFP');
})

// Create New RFP
Given('Create New RFP', () => {
    const newRfpNameTemp = "AutomationRFP" + Math.round(Date.now() / 60000 - 24938000);

    agencyBasePage.startNewRfp().click({ force: true });
    agencyBasePage.pageTitle().should('have.text', 'Create RFP');

    createRfpPage.agencySearchBox().click({ force: true });
    createRfpPage.agencySearchInputBox().type(newRfpParam.agency, { force: true });
    createRfpPage.newRfpDropdownOptions(createRfpPage.agencySearchOptions(), newRfpParam.agency);

    createRfpPage.clientSearchBox().click({ force: true });
    createRfpPage.newRfpDropdownOptions(createRfpPage.clientSearchOptions(), newRfpParam.client);

    createRfpPage.newRfpNameInputBox().type(newRfpNameTemp, { force: true });
    createRfpPage.rfpBudgetInputBox().type(newRfpParam.budget, { force: true });

    createRfpPage.officeInputBox().should('have.text', newRfpParam.office);
    createRfpPage.productSearchBox().click({ force: true });
    createRfpPage.newRfpDropdownOptions(createRfpPage.productSearchOptions(), newRfpParam.product);

    createRfpPage.goalTypeSearchBox().click({ force: true });
    createRfpPage.newRfpDropdownOptions(createRfpPage.goalTypeSearchOptions(), newRfpParam.goalType);

    createRfpPage.startDateInputBox().type(newRfpParam.startDate, { force: true });
    createRfpPage.dateOption().click();

    createRfpPage.endDateInputBox().clear({ force: true });
    createRfpPage.endDateInputBox().type(newRfpParam.endDate, { force: true });
    createRfpPage.dateOption().click();

    createRfpPage.dueDateInputBox().type(newRfpParam.dueDate, { force: true });
    createRfpPage.dateOption().click();

    createRfpPage.primaryDemoSearchBox().click({ force: true });
    createRfpPage.newRfpDropdownOptions(createRfpPage.primaryDemoSearchOptions(), newRfpParam.primaryDemo);

    createRfpPage.vendorSearchBox().click({ force: true });
    createRfpPage.vendorInputBox().type(newRfpParam.vendor);
    createRfpPage.newRfpDropdownOptions(createRfpPage.vendorSearchOptions(), newRfpParam.vendor);

    createRfpPage.vendorCheckBox().check().should('be.checked');
    createRfpPage.vendorContact().click();

    createRfpPage.vendorContactOptions().each((element, index, list) => {
        if (element.text().includes(envUtils.getSsphereUsername())) {
            createRfpPage.selectVendorContact().eq(index).click();
        }
    })
    cy.is_element_exists(createRfpPage.marketRequiredSelectorSyntax()).then(isElementExists => {
        if (isElementExists) {
            cy.get('select').select(newRfpParam.market);
        }
    })

    createRfpPage.saveButton().click();
    createRfpPage.newRfpPageTitle().should('include.text', 'AutomationRFP');

    agencyBasePage.pageTitle().then(function (newRfpName) {
        cy.dataSession({
            name: 'newRfpName',
            setup: () => newRfpName.text(),
            validate: false,
            shareAcrossSpecs: true,
        })
    })
    createRfpPage.vendorCheckBox().check().should('be.checked');
    createRfpPage.saveAndSendRfpButton().click();
    cy.dataSession('newRfpName').then(newRfpName => {
        agencyBasePage.pageTitle(60000).should('include.text', newRfpName);
    })
})

// Validate RFP Creation
Given('Validate RFP Creation', () => {
    cy.dataSession('newRfpName').then(newRfpName => {
        agencyBasePage.pageTitle(60000).should('have.text', newRfpName);
    })
    rfpDetailsPage.rfpStatus(1200000).contains('Sent', { timeout: 1200000 });
    rfpDetailsPage.rfpStatus().should('have.text', 'Sent');
    rfpDetailsPage.launchPreBuyButton();
})

// Logout Agency RFP
Given('Logout Agency RFP', () => {
    agencyBasePage.signOutButton().click({ force: true });
    agencyBasePage.pageTitle().should('have.text', 'Sign In');
})

// Login to Stratasphere
Given('Login to Stratasphere', () => {
    cy.visit(envUtils.getSsphereUrl());
    sSphereBasePage.pageTitle().should('include.text', ' Login');
    sSphereLoginPage.usernameBox().type(envUtils.getSsphereUsername());
    sSphereLoginPage.passwordBox().type(envUtils.getSspherePassword(), { log: false });
    sSphereLoginPage.loginButton().click();
    sSphereBasePage.menuDropdownToggle().should('be.visible');
    sSphereBasePage.pageTitle().then(function (titleText) {
        if (titleText.text().includes(' Home')) {
            sSphereHomePage.proposalsField().click()
        } else {
            sSphereBasePage.pageTitle().should('include.text', ' Proposals');
        }
    })
})

// Search for RFP in Stratasphere
Given('Search for RFP in Stratasphere', () => {
    cy.dataSession('newRfpName').then(newRfpName => {
        sSphereProposalsPage.campaignSearchBox().type(newRfpName);
        cy.contains(newRfpName).click();
    })
})

// Validate {string} in Stratasphere'
Given('Validate {string} Page in Stratasphere', string => {
    sSphereProposalsPage.stationDetailsText().should('include.text', string);
    sSphereProposalsPage.vendor().should('include.text', newRfpParam.vendor.slice(0, 4));
    sSphereProposalsPage.market().should('have.text', newRfpParam.market);
    sSphereProposalsPage.primaryDemo().should('have.text', newRfpParam.primaryDemo);
    sSphereProposalsPage.startDate().should('have.text', newRfpParam.startDate.slice(0, 6) + '20' + newRfpParam.startDate.slice(6));
    sSphereProposalsPage.endDate().should('have.text', newRfpParam.endDate.slice(0, 6) + '20' + newRfpParam.endDate.slice(6));
    sSphereProposalsPage.agency().should('have.text', newRfpParam.client);
    sSphereProposalsPage.product().should('have.text', newRfpParam.product);
})

// Upload XML Response
Given('Upload XML Response', () => {
    sSphereProposalsPage.uploadResponseButton().click();
    sSphereProposalsPage.uploadResponseText().should('have.text', 'Upload Response');
    cy.upload_file(FILE_NAME, sSphereProposalsPage.fileInput());
    cy.wait(3000);
    sSphereProposalsPage.validatedXmlText().then(function (el) {
        if (el.text() !== 'Validated') {
            sSphereProposalsPage.uploadVerificationYesButton().click();
        }
    })

    sSphereProposalsPage.validatedXmlText().should('have.text', 'Validated');
    sSphereProposalsPage.uploadResponseNextButton().click();
    sSphereProposalsPage.additionalAttachmentsText().should('include.text', 'Additional Attachments');
    sSphereProposalsPage.additionalAttachmentsNextButton().click();
    sSphereProposalsPage.commentsText().should('include.text', 'Comments');
    sSphereProposalsPage.commentsRfpNextButton().click({ force: true });
    sSphereProposalsPage.uploadedFileText().should('include.text', FILE_NAME);
    sSphereProposalsPage.sendToAgencyButton().click();
    sSphereProposalsPage.sentResponseText(60000).should('include.text', 'Your response has been sent.');
})

// Logout from Stratasphere
Given('Logout from Stratasphere', () => {
    sSphereBasePage.userSettingsDropdown(15000).click({ force: true });
    sSphereBasePage.logOutButton().click({ force: true });
    sSphereBasePage.pageTitle().should('include.text', ' Login');
})

// Search for existing RFP
Given('Search for existing RFP', () => {
    agencyBasePage.searchExistingRfp().click({ force: true });
    cy.title().should('eq', 'Search - RFP');

    cy.dataSession('newRfpName').then(newRfpName => {
        searchRfpPage.rfpNameTextBox().type(newRfpName);
        searchRfpPage.searchButton().click({ force: true });
        cy.contains(newRfpName).click({ force: true });
        recurse(() => rfpDetailsPage.pageTitle().invoke('text'),
            (title) => title === newRfpName,
            {
                limit: 300,
                timeout: 300_000,
                delay: 1000,
            }
        )
        rfpDetailsPage.pageTitle().should('have.text', newRfpName);
    })
})

// Click on Launch Pre-buy button
Given('Click on Launch Pre-buy button', () => {
    rfpDetailsPage.launchPreBuyButton().click();
    cy.title('eq', 'Linear Proposal - RFP');
})

// Validate the response from Agency {string}
Given('Validate the response from {string}', string => {
    cy.dataSession('newRfpName').then(newRfpName => {
        linearProposalRfpPage.campaignHeaderText(15000).should('have.text', newRfpName);
    })

    cy.viewport(2560, 1292);
    cy.wait(500);
    let cellIndex = 1;
    let headerText1;
    let linesValueMap = new Map();
    linearProposalRfpPage.proposalHeaders().then((value) => {
        linearProposalRfpPage.proposalRows().each((element, rowIndex, list) => {
            let tempList = new Array();
            if (rowIndex !== 0 && rowIndex !== list.length - 1) {
                for (let columnIndex = 0; columnIndex < value.length; columnIndex++) {
                    linearProposalRfpPage.proposalHeader(columnIndex).then(function (headerText) {
                        headerText1 = headerText.text();

                    });
                    linearProposalRfpPage.proposalCell(cellIndex++).then(function (cellText) {
                        var cellTextTemp = cellText.text();
                        if (cellTextTemp !== "" && cellTextTemp !== '0') {
                            tempList.push(headerText1 + " - " + cellTextTemp);
                        }
                    });
                }
                cellIndex++;
                linesValueMap.set("Line " + rowIndex, tempList);
            }
        })
    }).then(() => {
        let xmlParam;
        if (string === 'Buyer Imported Xml') {
            xmlParam = buyerXml;
        } else if (string === 'Seller Xml') {
            xmlParam = sellerXml;
        }
        let map1 = xml_proposal_map(xmlParam);
        let map2 = linesValueMap;
        cy.compare_two_maps(map1, map2);
    });
    linearProposalRfpPage.proposalResponse().screenshot({ capture: 'viewport' });
    cy.viewport(1920, 1080);
})

// Delete the Line
Given('Delete the Line', () => {
    cy.title('eq', 'Linear Proposal - RFP');
    cy.dataSession('newRfpName').then(newRfpName => {
        linearProposalRfpPage.campaignHeaderText(15000).should('have.text', newRfpName);
    })

    var linesNumBefore;
    var linesNumAfter = 0;
    linearProposalRfpPage.selectLineCheckBox().each((element, index, list) => {
        linesNumBefore = list.length;
    }).then(() => {
        linearProposalRfpPage.selectLineCheckBox().last().check({ force: true });
        linearProposalRfpPage.deleteButton().click({ force: true });
        linearProposalRfpPage.saveButton().click({ force: true });
    }).then(() => {
        cy.is_element_exists(linearProposalRfpPage.selectLineCheckBoxSelectorSyntax()).then(function (exists) {
            if (exists) {
                linearProposalRfpPage.selectLineCheckBox().each((element, index1, list) => {
                    linesNumAfter = list.length;
                })
            }
        })
    }).then(() => {
        expect(linesNumBefore, "Line was successfully deleted").to.not.equal(linesNumAfter);
    });
})

// Create Type1 Rate Request
Given('Create Type1 Rate Request', () => {
    linearProposalRfpPage.selectLineCheckBox().first().check({ force: true });
    linearProposalRfpPage.myReteTexBox().type(BUYER_REVISION_RATE + '{enter}');
    linearProposalRfpPage.saveButton().click();
    linearProposalRfpPage.myReteTexBoxValue().should('have.text', BUYER_REVISION_RATE);
    linearProposalRfpPage.actionsDropdown().click({ force: true });
    linearProposalRfpPage.sendRateRequestButton().click({ force: true });
    linearProposalRfpPage.sendRateRequestText().should('have.text', 'Send Rate Request');
    linearProposalRfpPage.vendorText().should('have.text', newRfpParam.vendor);
    linearProposalRfpPage.sendButton().click();
    linearProposalRfpPage.myReteTexBoxValue().should('have.text', BUYER_REVISION_RATE);
})

// Search for Stratasphere, AgencyRFP user in Mailinator
Given('Search for {string} user in Mailinator', string => {
    cy.visit(envUtils.getMailinatorUrl());
    cy.title().should('eq', 'Mailinator');
    mailinatorHomePage.userSearchBox().clear();
    if (string === 'Stratasphere') {
        mailinatorHomePage.userSearchBox().type(envUtils.getSsphereUsername());
    } else if (string === 'AgencyRFP') {
        mailinatorHomePage.userSearchBox().type(envUtils.getAgencyUsername());
    }
    mailinatorHomePage.goButton().click({ force: true });

})

// Validate email Proposal Response
Given('Validate email Proposal Response', () => {
    cy.dataSession('newRfpName').then(newRfpName => {
        mailinatorHomePage.search_email('New Rate Request for ', newRfpName);
    })

    const getIframeBody = () => {
        return mailinatorHomePage.emailMsgBodyIframe()
            .its('0.contentDocument.body')
            .then(cy.wrap);
    }

    getIframeBody(mailinatorHomePage.emailMsgBodyIframe()).find(mailinatorHomePage.emailDetailsSyntax()).eq(0).should('have.text', '2');
    getIframeBody(mailinatorHomePage.emailMsgBodyIframe()).find(mailinatorHomePage.emailDetailsSyntax()).eq(1).should('have.text', newRfpParam.agency);
    getIframeBody(mailinatorHomePage.emailMsgBodyIframe()).find(mailinatorHomePage.emailDetailsSyntax()).eq(2)
        .should('include.text', newRfpParam.startDate.slice(0, 6) + '20' + newRfpParam.startDate.slice(6) + ' to '
            + newRfpParam.endDate.slice(0, 6) + '20' + newRfpParam.endDate.slice(6));
    getIframeBody(mailinatorHomePage.emailMsgBodyIframe()).find(mailinatorHomePage.emailDetailsSyntax()).eq(3).should('have.text', newRfpParam.primaryDemo);

    getIframeBody(mailinatorHomePage.emailMsgBodyIframe()).find('a').eq(0).then(function (el) {
        const url = el.prop('href')
        cy.dataSession({
            name: 'redirectSsphereLink',
            setup: () => url,
            validate: false,
            shareAcrossSpecs: true,
        })
    })
    mailinatorHomePage.deleteEmailButton().click();
})

// Redirect from Mailinator to Stratasphere
Given('Redirect from Mailinator to Stratasphere', () => {
    cy.dataSession('redirectSsphereLink').then(redirectSsphereLink => {
        cy.visit(redirectSsphereLink);
    })
    sSphereBasePage.pageTitle().should('include.text', ' Login');
    sSphereLoginPage.usernameBox().type(envUtils.getSsphereUsername());
    sSphereLoginPage.passwordBox().type(envUtils.getSspherePassword());
    sSphereLoginPage.loginButton().click();
})

// Validate Proposal Response Page
Given('Validate Proposal Response Page', () => {
    cy.title().should('eq', "Proposal Response");
    sSphereProposalResponsePage.vendorName().should('include.text', newRfpParam.vendor.slice(0, 4));
    sSphereProposalResponsePage.mediaTypeName().should('include.text', newRfpParam.vendor.slice(5));
    cy.dataSession('newRfpName').then(newRfpName => {
        sSphereProposalResponsePage.campaignName().should('have.text', newRfpName);
    })
    sSphereProposalResponsePage.marketName().should('have.text', newRfpParam.market);
    sSphereProposalResponsePage.primaryDemo().should('have.text', newRfpParam.primaryDemo.slice(0, 9) + ' - ' + newRfpParam.primaryDemo.slice(10));
    sSphereProposalResponsePage.flightStart().should('have.text', newRfpParam.startDate.slice(0, 6) + '20' + newRfpParam.startDate.slice(6));
    sSphereProposalResponsePage.flightEnd().should('have.text', newRfpParam.endDate.slice(0, 6) + '20' + newRfpParam.endDate.slice(6));
    sSphereProposalResponsePage.selectVersion().should('include.text', '2 of 2');
    sSphereProposalResponsePage.buyerRateCell().should('have.text', '$5');
    sSphereProposalResponsePage.selectVersion().click();
    sSphereProposalResponsePage.selectOneOfTwoVersion().click();
    sSphereProposalResponsePage.buyerRateCell().should('not.have.text');
    sSphereProposalResponsePage.reviseButton().click();
})

// Revise the Buy Rate
Given('Revise the Buy Rate', () => {
    sSphereProposalsPage.enterRevisionButton().click({ force: true });
    sSphereProposalsPage.enterRevisionTab().should('include.text', 'Enter Revision');
    sSphereProposalsPage.useBuyerRatingsButton().should('be.visible');
    sSphereProposalsPage.useBuyerRateButton().should('be.visible');
    sSphereProposalsPage.addBuyLineButton().should('be.visible');
    sSphereProposalsPage.previousButton().should('be.visible');
    sSphereProposalsPage.sellerRateCell().type("{selectAll}{backspace}");
    sSphereProposalsPage.startDateCell().click({ force: true });
    sSphereProposalsPage.sellerRateCell().parent().type("{" + SELLER_REVISION_RATE + "}");
    sSphereProposalsPage.startDateCell().click({ force: true });

    sSphereProposalsPage.sellerRateCell().then(function (el) {
        if (el.text() !== '$' + SELLER_REVISION_RATE) {
            sSphereProposalsPage.sellerRateCell().clear().type(SELLER_REVISION_RATE);
        }
    })

    sSphereProposalsPage.saveContinueButton().click();
    sSphereProposalsPage.additionalAttachmentsTab().should('include.text', 'Additional Attachments');
    sSphereProposalsPage.includeAdditionalAttachmentsText().should('include.text', 'Include any additional attachments:');
    sSphereProposalsPage.selectFileButton().should('be.visible');
    sSphereProposalsPage.additionalAttachmentsPreviousButton().should('be.visible');
    sSphereProposalsPage.nextButton().should('be.visible');
    sSphereProposalsPage.nextButton().click();
    sSphereProposalsPage.commentsNextButton().click();
    sSphereProposalsPage.sendRevisionTab().should('include.text', 'Send Revision');
    sSphereProposalsPage.sendRevisionPreviousButton().should('be.visible');
    sSphereProposalsPage.responseCompleteConformationText('include.text', 'Please make sure your response is complete. You will only be able to respond to this RFP once.');
    sSphereProposalsPage.sendToAgencyButton().click();
})

// Buyer Rate Revision Validations
Given('Buyer Rate Revision Validations', () => {
    sSphereProposalResponsePage.pageTitle(150000).should('have.text', " Proposal Response");
    sSphereProposalResponsePage.selectVersion().should('include.text', '3 of 3');
    sSphereProposalsPage.updatedMyRateCell().should('have.text', '$' + SELLER_REVISION_RATE);
})

// Validate Buyer Revision Details
Given('Validate Buyer Revision Details', () => {
    cy.dataSession('newRfpName').then(newRfpName => {
        linearProposalRfpPage.campaignHeaderText(15000).should('have.text', newRfpName);
    })
    linearProposalRfpPage.proposalCell(1).should('have.text', newRfpParam.vendor.slice(0, 4));
    linearProposalRfpPage.proposalCell(9).should('have.text', newRfpParam.startDate);
    linearProposalRfpPage.proposalCell(10).should('have.text', newRfpParam.endDate);
    linearProposalRfpPage.proposalCell(11).should('include.text', BUYER_REVISION_RATE);
    linearProposalRfpPage.proposalCell(13).should('include.text', '$ ' + SELLER_REVISION_RATE);

})

/*
 Helper function that's converting Json file with parameters related to 'Linear Proposal - RFP' page.
 Returns map of parameters
*/
function xml_proposal_map(param) {
    let linesValueMap = new Map();
    param.lines.forEach((lines, index) => {
        let tempList = new Array();
        lines.line.forEach((line) => {
            tempList.push(line);
        })
        linesValueMap.set("Line " + (index + 1), tempList);
    })
    return linesValueMap;
}