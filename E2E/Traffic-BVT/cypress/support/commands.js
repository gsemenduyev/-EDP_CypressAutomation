// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

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
            cy.log("Element doesn't Exist")
            elementExist = false;
        }
        return cy.wrap(elementExist);
    });
});

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

Cypress.Commands.add("save_new_user_data", (newUserFile, newUserData) => {
    const jsonContent = JSON.stringify(newUserData);
    cy.writeFile(newUserFile, jsonContent);
    cy.readFile(newUserFile).its('firstName').should('eq', 'Test')
})

Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
});