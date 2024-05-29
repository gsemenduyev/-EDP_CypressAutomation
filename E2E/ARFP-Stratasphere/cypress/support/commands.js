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

/*
Converts text file to simple html file.
*/
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
});

/* 
Saves unique dates.
Currently, we are not able to delete Gmail emails through the API, so
we are using unique Gmail dates to identify new emails in the Gmail Inbox
cypress\fixtures\gmail-data\gmail-info\arfp-emails-dates.json
or
cypress\fixtures\gmail-data\gmail-info\ssphere-emails-dates.json
*/
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

/* 
Accesses Gmail and returns New Gmail. 
Saves new Gmail email body in text and html files
cypress\fixtures\gmail-data\gmail-info\gmail-body.txt
and
cypress\fixtures\gmail-data\gmail-info\gmail-body.html
Saves unique dates.
Currently, we are not able to delete Gmail emails through the API, so
we are using unique Gmail dates to identify new emails in the Gmail Inbox
cypress\fixtures\gmail-data\gmail-info\arfp-emails-dates.json
or
cypress\fixtures\gmail-data\gmail-info\ssphere-emails-dates.json
*/
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
            if ($emails.length > 0) {
                const emailDate = $emails[0].date;
                cy.log("Email Date - " + emailDate);
                cy.readFile('cypress/fixtures/' + datesFilePath)
                    .its('uniqDatesList')
                    .then(($uniqDatesList) => {
                        if (!$uniqDatesList.includes(emailDate)) {
                            cy.readFile('cypress/fixtures/' + datesFilePath).its('uniqDatesList').should('not.contain', emailDate);
                            cy.writeFile(Cypress.env('GMAIL_HTML_PATH'), $emails[0].body.html);
                            cy.writeFile(Cypress.env('GMAIL_TXT_PATH'), $emails[0].body.text);
                            cy.check_gmail_inbox('cypress/fixtures/' + datesFilePath, credentialsFilePath, tokenFilePath);
                            cy.readFile('cypress/fixtures/' + datesFilePath).its('uniqDatesList').should('contain', emailDate);
                        } else if (index < endIndex) {
                            index++;
                            cy.log(`Waiting ${(msecInterval * index / 60000).toFixed(2)} minutes for ${subject} gmail`);
                            cy.wait(msecInterval).then(checkEmailExists);
                        };
                    });
            } else if (index < endIndex) {
                index++;
                cy.log(`Waiting ${(msecInterval * index / 60000).toFixed(2)} minutes for ${subject} gmail`);
                cy.wait(msecInterval).then(checkEmailExists);
            };
        });
    };
    checkEmailExists();
});