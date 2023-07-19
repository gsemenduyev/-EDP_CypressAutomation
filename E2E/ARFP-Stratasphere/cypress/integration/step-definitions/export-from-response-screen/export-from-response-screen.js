/// <reference types="Cypress" />
import { Given } from "@badeball/cypress-cucumber-preprocessor";
import RfpDetailsPage from "../../../support/page-objects/agency-pages/RfpDetailsPage";
import ViewEditResponsesPage from "../../../support/page-objects/agency-pages/ViewEditResponsesPage";
const rfpDetailsPage = new RfpDetailsPage;
const viewEditResponsesPage = new ViewEditResponsesPage;

const PARSED_XLSX_FILE_PATH = 'cypress/fixtures/agencyRFP/parsed-xlsx-from-response-screen.json';
const EXPECTED_XLSX_FILE_PATH = 'cypress/fixtures/agencyRFP/expected-xlsx-from-response-screen.json';
const UI_TABLE_JSON_FILE_PATH = 'cypress/fixtures/agencyRFP/ui-table-from-response-screen.json';
const LINEAR_RESPONSE_FILE_PATH = 'cypress/downloads/Linear response detail.xlsx';

// Navigate to View and Edit Responses page
Given('Navigate to View and Edit Responses page', () => {
    rfpDetailsPage.responseButton().click();
    viewEditResponsesPage.responsesTable().should('exist').screenshot();
});

// Export XLSX file from hamburger dropdown
Given('Export XLSX file from hamburger dropdown', () => {
    viewEditResponsesPage.hamburgerButton().should('be.visible')
    viewEditResponsesPage.hamburgerButton().click();
    viewEditResponsesPage.exportButton().should('be.visible')
    viewEditResponsesPage.exportButton().click();

});


// Validate XLSX file
Given('Validate XLSX file', () => {
    xlsxToJson(LINEAR_RESPONSE_FILE_PATH, PARSED_XLSX_FILE_PATH);
    uiTableToJson(UI_TABLE_JSON_FILE_PATH);
    cy.readFile(EXPECTED_XLSX_FILE_PATH)
        .then(expectedData => cy.readFile(PARSED_XLSX_FILE_PATH)
            .should('deep.equal', expectedData))
        .then(expectedData => cy.readFile(UI_TABLE_JSON_FILE_PATH)
            .should('deep.equal', expectedData));
});

// Parse XLSX file to Json file
function xlsxToJson(downloadedXlsxPath, parsedXlsxPath) {
    cy.writeFile(parsedXlsxPath, '[', { log: false });
    cy.parse_xlsx(downloadedXlsxPath).then((jsonData) => {
        const row = Cypress.$(jsonData[0].data);
        for (let i = 0; i < row.length - 1; i++) {
            const column = jsonData[0].data[i];
            for (let j = 0; j < column.length; j++) {
                var cellText;
                if (column[j] !== '') {
                    cellText = column[j];
                    if (cellText.includes('/')) {
                        cellText = cellText.replaceAll(' ', '');
                    } else if (cellText.startsWith('$')) {
                        cellText = cellText.slice(1, cellText.length - 3);
                    } else if (cellText.charAt(1) === '.') {
                        cellText += '0';
                    }
                    cellText = cellText.toLowerCase();
                    if (j === column.length - 1 && i === row.length - 2) {
                        cy.writeFile(parsedXlsxPath,
                            `"${cellText}"`, { flag: 'a+', log: false });
                    } else {
                        cy.writeFile(parsedXlsxPath,
                            `"${cellText}",`, { flag: 'a+', log: false });
                    }
                }
            }
        }
    })
    cy.writeFile(parsedXlsxPath,
        `]`, { flag: 'a+', log: false });
}

//Stores text of UI table into Json file
function uiTableToJson(jsoFilePath) {
    cy.writeFile(jsoFilePath, '[', { log: false });
    viewEditResponsesPage.tableHeaders().each((element) => {
        cy.writeFile(jsoFilePath,
            `"${element.text().trim().toLowerCase()}",`, { flag: 'a+', log: false });
    });
    viewEditResponsesPage.tableCells().each((element, index, list) => {
        var cellText = element.text();
        if (index > 14 && index < list.length - 1 && cellText !== '') {
            if (cellText.includes('/')) {
                cellText = cellText.replaceAll(' ', '');
            } else if (cellText.startsWith('$')) {
                cellText = cellText.slice(1, cellText.length - 3);
            }
            cellText = cellText.toLowerCase();
            cy.writeFile(jsoFilePath,
                `"${cellText.trim()}",`, { flag: 'a+', log: false });
        } else if (index + 1 === list.length) {
            cy.writeFile(jsoFilePath,
                `"${cellText.trim()}"`, { flag: 'a+', log: false });
        }
    })
    cy.writeFile(jsoFilePath,
        `]`, { flag: 'a+', log: false });
}