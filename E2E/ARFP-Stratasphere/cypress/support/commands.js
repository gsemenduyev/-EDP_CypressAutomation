// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
/// <reference types="cypress-data-session" />
import 'cypress-file-upload';
/*
Upload File into Webpage.
[@param] fileName - name of the file.
[@param] element - input location
*/
Cypress.Commands.add("upload_file", (fileName, element) => {
    cy.fixture(fileName, 'binary')
        .then(Cypress.Blob.binaryStringToBlob)
        .then(fileContent => {
            element.attachFile({ fileContent, fileName, mimeType: 'text/xml', encoding: 'utf8' })
        })
})

/* 
Verifies if element exists in DOM.
[@param] selectorSyntax - Syntax of CSS, class, id...
[@return] - boolean
*/
Cypress.Commands.add("is_element_exists", (selectorSyntax) => {
    cy.get("body").then($body => {
        let elementExist;
        if ($body.find(selectorSyntax).length > 0) {
            cy.log('Element Exists')
            elementExist = true;
        } else {
            cy.log("Element doesn't Exists")
            elementExist = false;
        }
        return cy.wrap(elementExist);
    });
})

/*
Compares two maps
[@param] map1 - first map
[@param] map2 - second map
*/
Cypress.Commands.add("compare_two_maps", (map1, map2) => {
    map1.forEach((v, k) => {
        map1.get(k).forEach((lines, index) => {
            expect(lines, k).to.equal(map2.get(k)[index]);
        })
    });
})

// Handles uncaught exception.
Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
})