// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
require('cy-verify-downloads').addCustomCommand();
const fs = require('fs');
const XLSX = require('xlsx');
const cheerio = require('cheerio');

Cypress.Commands.add("compareExcelFiles", (filePath1, filePath2) => {
  cy.readFile(filePath1, 'utf-8').then(file1Data => {
    cy.readFile(filePath2, 'utf-8').then(file2Data => {
      const title1 = getTitleFromHTML(file1Data);
      const title2 = getTitleFromHTML(file2Data);
      //assert the report title  
      cy.expect(title1).to.equal(title2);

      const data1 = getTableDataFromHTML(file1Data);
      const data2 = getTableDataFromHTML(file2Data);

      cy.expect(data1).to.deep.equal(data2);
    });
  });
});

function getTitleFromHTML(htmlContent) {
  const $ = cheerio.load(htmlContent);
  return $('title').text();
}

function getTableDataFromHTML(htmlContent) {
  const $ = cheerio.load(htmlContent);
  const tableData = [];

  $('table tr').each((index, row) => {
    const rowData = [];
    $(row).find('td').each((index, cell) => {
      rowData.push($(cell).text());
    });
    tableData.push(rowData);
  });
  return tableData;
}


// Handles uncaught exception.
Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
})

 
  
  
  
  
  