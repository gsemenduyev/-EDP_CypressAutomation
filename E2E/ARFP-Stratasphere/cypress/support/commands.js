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
Parse XLSX file.
[@param] filePath- file path.
*/
Cypress.Commands.add("parse_xlsx", (inputFile) => {
    cy.readFile(inputFile).should('exist');
    return cy.task('parseXlsx', { filePath: inputFile });
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
});

Cypress.Commands.add('txt_file_to_html', (txtFile, htmlFile) => {
    cy.readFile(txtFile)
        .then((content) => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(content, 'text/html');
            const newDiv = Cypress.$('<div id="file-content"></div>');
            const lines = content.split('\n');
            lines.forEach((line) => {
                newDiv.append(line);
                newDiv.append('<br>');
            });
            cy.writeFile(htmlFile, newDiv.prop('outerHTML'));
        });
})

Cypress.Commands.add('check_gmail_inbox', (datesFilePath, credentialsFilePath, tokenFilePath) => {
    cy.writeFile(datesFilePath, {})
    cy.readFile(datesFilePath).then(($data) => {
        const uniqDatesList = $data.uniqDatesList || [];
        cy.task("gmail:get-messages", {
            credentials: credentialsFilePath,
            token: tokenFilePath,
        }).then(($emails) => {
            if ($emails.length < 1) {
                return $emails
            } else {
                console.log($emails)
                $emails.forEach(($email) => {
                    uniqDatesList.push($email.date);
                })
                cy.writeFile(datesFilePath, JSON.stringify({ uniqDatesList }));
            };
        });
    });
});

Cypress.Commands.add('get_gmail', (
    datesFilePath,
    credentialsFilePath,
    tokenFilePath,
    from,
    subject,
    attempts,
    msecInterval
) => {
    let index = 0;
    let endIndex = attempts;
    const checkEmailExists = () => {
        cy.task("gmail:get-messages", {
            credentials: credentialsFilePath,
            token: tokenFilePath,
            options: {
                from: from,
                subject: subject,
                include_body: true,
            },
        }).then(($emails) => {
            cy.fixture(datesFilePath).then((jsonData) => {
                if ($emails.length < 1 && index < endIndex) {
                    index++;
                    cy.log(`Waiting ${(msecInterval * index / 60000).toFixed(2)} minutes for ${subject} gmail`);
                    cy.wait(msecInterval)
                    checkEmailExists()
                } else if ($emails.length > 0) {
                    if (!jsonData.uniqDatesList.includes($emails[0].date)) {
                        console.log($emails[0]);
                        index == endIndex;
                        cy.writeFile(Cypress.env('GMAIL_HTML_PATH'), $emails[0].body.html);
                        cy.writeFile(Cypress.env('GMAIL_TXT_PATH'), $emails[0].body.text);
                        cy.check_gmail_inbox('cypress/fixtures/' + datesFilePath, credentialsFilePath, tokenFilePath);
                    } else if (index < endIndex) {
                        index++;
                        cy.log(`Waiting ${(msecInterval * index / 60000).toFixed(2)} minutes for ${subject} gmail`)
                        cy.wait(msecInterval)
                        checkEmailExists();
                    }
                }
            });
        });
    }
    checkEmailExists();
});