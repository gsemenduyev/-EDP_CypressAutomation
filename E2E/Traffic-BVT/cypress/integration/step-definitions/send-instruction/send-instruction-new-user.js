/// <reference types="Cypress" />
import { Given } from "@badeball/cypress-cucumber-preprocessor";
import EnvUtils from "../../../support/utils/EnvUtils";
import TrafficLoginPage from "../../../support/page-objects/traffic-pages/TrafficLoginPage";
import TrafficHomePage from "../../../support/page-objects/traffic-pages/TrafficHomePage";
import sTrafficLoginPage from "../../../support/page-objects/straffic-pages/sTrafficLoginPage";
import sTrafficHomePage from "../../../support/page-objects/straffic-pages/sTrafficHomePage";


const envUtils = new EnvUtils;
const trafficLoginPage = new TrafficLoginPage;
const trafficHomePage = new TrafficHomePage;
const strafficLoginPage = new sTrafficLoginPage;
const strafficHomePage = new sTrafficHomePage;


const NEW_USER_FILE = 'cypress/fixtures/new-user/new-user-param.json';
let estimateParam;

before(function () {
    cy.fixture('estimate/estimate-param.json').then(function (data) {
        estimateParam = data;
    });
});

Given('Login to Traffic as {string} user', user => {
    cy.visit(envUtils.getTrafficUrl());
    cy.title().should('eq', 'AEINBOX® for Traffic Instruction - Login');
    trafficLoginPage.usernameBox().should('be.visible');
    cy.screenshot();
    trafficLoginPage.signInBtn().should('be.visible')
    if (user === 'Admin') {
        trafficLoginPage.usernameBox().type(envUtils.getTrafficAdminUsername());
        trafficLoginPage.passwordBox().type(envUtils.getTrafficAdminPassword());
        trafficLoginPage.signInBtn().click();
        cy.title().should('eq', 'Traffic Instruction - Manage User');
    } else if (user === 'New') {
        cy.readFile(NEW_USER_FILE).then(($newUserParam) => {
            trafficLoginPage.usernameBox().type($newUserParam.email);
            trafficLoginPage.passwordBox().type($newUserParam.password);
        });
        trafficLoginPage.signInBtn().click();
        cy.title().should('eq', 'Traffic Instruction - Inbox');
    };
    trafficHomePage.theGrid().should('not.be.disabled');
    cy.screenshot();
});

Given('Login to Traffic as New user and validate user agreement', () => {
    cy.visit(envUtils.getTrafficUrl());
    cy.readFile(NEW_USER_FILE).then(($newUserParam) => {
        trafficLoginPage.usernameBox().type($newUserParam.email);
        trafficLoginPage.passwordBox().type($newUserParam.password);
    })
    trafficLoginPage.signInBtn().click();
    trafficLoginPage.acceptBtn().should('exist');
    trafficLoginPage.doNotAcceptBtn().should('exist');

    // Verify user agreement
    const actualUserAgreement = [];;
    trafficLoginPage.userAgreementParagraphs().each(($actualArgument) => {
        actualUserAgreement.push($actualArgument.text().trim());
    }).then(() => {
        cy.readFile('cypress/fixtures/stores/expected-user-agreement.json').each(($data, $index) => {
            expect(actualUserAgreement).contain($data[`Paragraph - ${$index}`].trim())
        });
    });
    cy.screenshot();
    trafficLoginPage.acceptBtn().click();
    cy.title().should('eq', 'Traffic Instruction - Inbox');
    cy.screenshot();
});


Given('Logout from Traffic', () => {
    trafficHomePage.logoutLink().click();
    cy.title().should('eq', 'AEINBOX® for Traffic Instruction - Login');
    cy.screenshot();
});

Given('Verify Traffic {string} user home page', user => {
    if (user === 'Admin') {
        trafficHomePage.manageUserTab().click();
        trafficHomePage.searchBar().should('include.text', 'Search User:');
        trafficHomePage.searchTxtBox().should('exist');
        trafficHomePage.searchButton().should('exist');
        trafficHomePage.searchButton().should('exist');
        trafficHomePage.clearButton().should('exist');
        trafficHomePage.importButton().should('exist');
        trafficHomePage.createButton().should('exist');
        trafficHomePage.gridCell(0).should('be.visible')
        cy.screenshot();
        trafficHomePage.assignVendorTab().should('exist');
        trafficHomePage.assignVendorTab().click();
        trafficHomePage.searchBar().should('include.text', 'Search User:');
        trafficHomePage.searchTxtBox().should('exist');
        trafficHomePage.searchButton().should('exist');
        trafficHomePage.searchButton().should('exist');
        trafficHomePage.clearButton().should('exist');
        trafficHomePage.gridCell(0).should('be.visible')
        cy.screenshot();
        trafficHomePage.manageVendorTab().should('exist');
        trafficHomePage.manageVendorTab().click();
        trafficHomePage.searchBar().should('include.text', 'Search Vendor:  by Syscode');
        trafficHomePage.searchTxtBox().should('exist');
        trafficHomePage.searchButton().should('exist');
        trafficHomePage.searchButton().should('exist');
        trafficHomePage.clearButton().should('exist');
        trafficHomePage.addVendorButton().should('exist');
        trafficHomePage.importVendorButton().should('exist');
        trafficHomePage.gridCell(0).should('be.visible');
        cy.screenshot();
    } else if (user === 'New') {
        trafficHomePage.inboxTab().should('exist');
        trafficHomePage.acceptedTab().should('exist');
        trafficHomePage.acceptInstructionsBtn().should('exist');
        cy.screenshot();
    };
});

Given('Create new user', () => {
    save_new_user_param();
    cy.readFile(NEW_USER_FILE).then(($newUserParam) => {
        trafficHomePage.manageUserTab().click();
        trafficHomePage.createButton().click();
        trafficHomePage.cr8UserForm().should('be.visible');
        trafficHomePage.cr8UserLoginNameTxtBox().type($newUserParam.email);
        trafficHomePage.cr8UserFirstNameTxtBox().type($newUserParam.firstName);
        trafficHomePage.cr8UserLastNameTxtBox().type($newUserParam.lastName);
        trafficHomePage.cr8UserPrimaryEmailTxtBox().type($newUserParam.email);
        trafficHomePage.cr8UserSecondaryEmailTxtBox().type($newUserParam.email);
        trafficHomePage.cr8UserPhoneTxtBox().type($newUserParam.phone);
        // Click on "Active" checkbox
        trafficHomePage.cr8UserCheckbox(0).check().should('be.checked');
        // Click on "Traffic Instruction" checkbox
        trafficHomePage.cr8UserCheckbox(1).check().should('be.checked');
        trafficHomePage.cr8UserPasswordTxtBox().type($newUserParam.password);
        trafficHomePage.cr8UserConfirmPasswordTxtBox().type($newUserParam.password);
        trafficHomePage.cr8UserSecurityQuestionTxtBox().type('Job Title');
        trafficHomePage.cr8UserSecurityAnswerTxtBox().type('QA Tester');
        cy.screenshot();
        trafficHomePage.cr8UserCreateBtn().should('not.be.hidden');
        trafficHomePage.cr8UserCreateBtn().click();
        trafficHomePage.cr8UserForm().should('not.be.visible');
        trafficHomePage.gridCell(0).should('be.visible');
        cy.screenshot();
    });
});

Given('Verify new user was created', () => {
    trafficHomePage.manageUserTab().should('not.be.hidden');
    trafficHomePage.manageUserTab().click();
    cy.readFile(NEW_USER_FILE).then(($newUserParam) => {
        trafficHomePage.searchTxtBox().type($newUserParam.email);
        trafficHomePage.searchButton().click();
        trafficHomePage.gridCell(0).should('be.visible');
        trafficHomePage.gridCell(0).should('have.text', $newUserParam.firstName);
        trafficHomePage.gridCell(1).should('have.text', $newUserParam.lastName);
        trafficHomePage.gridCell(2).should('have.text', $newUserParam.email);
        trafficHomePage.gridCell(3).should('have.text', $newUserParam.phone);
        trafficHomePage.gridCell(4).should('have.text', $newUserParam.email);
        trafficHomePage.gridCell(5).should('have.text', 'Traffic');
        trafficHomePage.gridCell(5).should('have.text', 'Traffic');
        trafficHomePage.gridCell(7).children().children().should('be.checked');
        cy.screenshot();
    });
});

Given('Assign Vendor to {string} user', user => {
    trafficHomePage.assignVendorTab().click();
    cy.readFile(NEW_USER_FILE).then(($newUserParam) => {
        if (user === 'New') {
            search_new_user(false, true)
        };
        trafficHomePage.goToAssignBtn().click();
        trafficHomePage.assignedVenForm().should('be.visible');
        trafficHomePage.assignedVenFormTitle().should('include.text', `Assign Vendors to '${$newUserParam.firstName} ${$newUserParam.lastName}`);
        trafficHomePage.assignVenTextBox().type($newUserParam.vendor);
        trafficHomePage.assignVenSearchBtn().click();
        cy.screenshot();
        trafficHomePage.assignVenGridCell(1).should('have.text', $newUserParam.vendor.split('-')[0])
        trafficHomePage.assignVenGridCell(2).should('have.text', $newUserParam.vendor.split('-')[1])
        trafficHomePage.assignVenGridCell(0).children().children().check().should('be.checked');
        trafficHomePage.assignVenBtn().click();
        trafficHomePage.assignVenGoToViewBtn().click({ timeout: 60000 });
        cy.screenshot();
        trafficHomePage.assignVenGridCell(1).should('have.text', $newUserParam.vendor.split('-')[0])
        trafficHomePage.assignVenGridCell(2).should('have.text', $newUserParam.vendor.split('-')[1])
        trafficHomePage.assignVenCancelBtn().click();
    });
});

Given('Login to sTraffic', () => {
    cy.visit(envUtils.getsTrafficUrl());
    cy.title().should('eq', 'Sign In')
    strafficLoginPage.usernameTxtBox().type(envUtils.getsTrafficUsername());
    strafficLoginPage.passwordTxtBox().type(envUtils.getsTrafficPassword());
    strafficLoginPage.loginBtn().click();
    cy.title().should('eq', 'STRATA sTraffic Traffic Status')
    cy.screenshot();
    strafficHomePage.trafficStatusBtn().should('be.visible');
});

Given('Verify new Traffic user is synced in sTraffic', () => {
    let index = 0;
    const endIndex = 20;
    const wait = 60000;
    cy.readFile(NEW_USER_FILE).then(($newUserParam) => {
        const waitForTrafficUser = () => {
            search_straffic_estimate();
            navigate_eSend_contact_editor();
            traffic_user_listed_eSend_contacts().then(($trafficContact) => {
                if ($trafficContact === false && index < endIndex) {
                    index++;
                    cy.reload();
                    cy.log(`Waiting ${wait / 60000 * index} minutes for Traffic newly created user to be synced with sTraffic`);
                    cy.wait(wait);
                    waitForTrafficUser();
                } else if ($trafficContact === true && index < endIndex) {
                    cy.reload();
                    index = endIndex;
                } else if (index === endIndex) {
                    throw new Error(`Traffic user ${$newUserParam.email} wasn't sync with sTraffic after ${wait * endIndex / 60000} minutes`);
                };
            });
        };
        waitForTrafficUser()
    });
    cy.screenshot();

});

Given('Search for Estimate in sTraffic', () => {
    search_straffic_estimate();
    cy.screenshot();
});

Given('Create Traffic Revision', () => {
    strafficHomePage.estimateCell().should('have.text', envUtils.getEstimate());
    strafficHomePage.editInstructionBtn().click();
    strafficHomePage.instructionHeader().should('include.text', estimateParam.startDate);
    strafficHomePage.instructionHeader().should('include.text', estimateParam.agency);
    strafficHomePage.instructionHeader().should('include.text', estimateParam.client);
    strafficHomePage.instructionHeader().should('include.text', estimateParam.product);
    strafficHomePage.createTrafficRevisionBtn().click();
    cy.is_element_exists(strafficHomePage.extendInstrDateDialogSyntax()).then(($extendInstrDateDialog) => {
        if ($extendInstrDateDialog) {
            strafficHomePage.extendInstrDateDialogYesBtn().click();
        }
    });
    cy.get(strafficHomePage.extendInstrDateDialogSyntax()).should('not.exist');
    strafficHomePage.createRevisionModal().should('exist');
    strafficHomePage.createRevisionSelAllCheckbox().check();
    strafficHomePage.createRevisionSelAllCheckbox().should('be.checked')
    cy.screenshot();
    strafficHomePage.createRevisionSubmitBtn().click();
    strafficHomePage.createRevisionModal().should('not.exist');
    cy.screenshot();
});

Given('Validate Traffic Revision', () => {
    strafficHomePage.validateInstructionGrid().should('be.visible')
    strafficHomePage.validateInstructionBtn().click();
    strafficHomePage.instructionSendMessage().should('include.text', 'Instructions are valid.');
    cy.screenshot();
    strafficHomePage.instructionSendMessageOkBtn().click();
    strafficHomePage.cancelBtn().click();
    strafficHomePage.instructionHeader().should('not.exist')
})

Given('Navigate to eSend Contact Editor', () => {
    navigate_eSend_contact_editor();
    cy.screenshot();
});

Given('Verify {string} user is listed in eSend Contact Editor', user => {
    cy.readFile(NEW_USER_FILE).then(($newUserParam) => {
        traffic_user_listed_eSend_contacts().then(($trafficContact) => {
            expect($trafficContact, `User ${$newUserParam.email} is listed in eSend Contact Editor`).to.eq(true);
        })
    });
    cy.screenshot();
});

Given('Send Estimate from sTraffic to {string} Traffic user', user => {
    cy.readFile(NEW_USER_FILE).then(($newUserParam) => {
        strafficHomePage.eSendContactRows().each(($cell) => {
            if (!$cell.text().includes($newUserParam.email)
                && $cell.find('img').attr('src').includes('accept')) {
                cy.wrap($cell).find('img').click();
            } else if ($cell.text().includes($newUserParam.email)
                && $cell.find('img').attr('src').includes('cancel')) {
                cy.wrap($cell).find('img').click();
            };
        });
    });
    cy.screenshot();
    strafficHomePage.eSendContactDoneBtn().should('be.visible');
    strafficHomePage.eSendContactDoneBtn().click();
    cy.is_element_exists(strafficHomePage.toastMsgSyntax()).then(($message) => {
        if ($message === true) {
            strafficHomePage.eSendContactCancelBtn().click();
        };
    });
    strafficHomePage.trafficInstructionSendBtn().click();
    strafficHomePage.modalProgressMsg().should('not.be.visible');
    cy.screenshot();
    strafficHomePage.instructionSendMessage().should('include.text', 'Instructions have been sent');
    strafficHomePage.instructionSendMessageOkBtn().click();
    strafficHomePage.trafficSendCancelBtn().click({ force: true });
});

Given('Logout from sTraffic', () => {
    strafficHomePage.signOutBtn().click({ force: true });
    cy.title().should('eq', 'Sign In');
    cy.screenshot();
});


Given('Validate new instruction', () => {
    var index = 0;
    var endIndex = 10;
    trafficHomePage.inboxTab().click();
    const waitInboxInstruction = () => {
        cy.is_element_exists(trafficHomePage.gridRowsSyntax()).then(($instruction) => {
            if ($instruction === false && index < endIndex) {
                index++;
                cy.wait(1000);
                cy.reload()
                waitInboxInstruction();
            } else if ($instruction === true || index < endIndex) {
                index = endIndex;
                trafficHomePage.gridRows().each(($row) => {
                    if ($row.text().includes(envUtils.getEstimate())) {
                        assert_traffic_estimate($row, 'View')
                        cy.wrap($row).find('a.pdfDownload').click();
                    };
                });
            } else if (index === endIndex) {
                throw new Error(`Instruction - ${envUtils.getEstimate()} wasn't send from sTraffic`);
            };;
        });
    };
    waitInboxInstruction();
    cy.screenshot();
    trafficHomePage.gridRows().each(($row) => {
        if ($row.text().includes(envUtils.getEstimate())) {
            assert_traffic_estimate($row, 'View')
            cy.wrap($row).find('a.pdfDownload').click();
            cy.wait(1000)
        };
    });
});

Given('Accept new instruction', () => {
    var index = 0;
    var endIndex = 10;
    trafficHomePage.inboxTab().click()
        .then(() => {
            const waitInboxInstruction = () => {
                cy.is_element_exists(trafficHomePage.gridRowsSyntax()).then(($instruction) => {
                    if ($instruction === false && index < endIndex) {
                        index++;
                        cy.wait(1000);
                        cy.reload()
                        waitInboxInstruction();
                    } else if ($instruction === true || index < endIndex) {
                        index = endIndex;
                        trafficHomePage.gridRows().each(($row) => {
                            if ($row.text().includes(envUtils.getEstimate())) {
                                assert_traffic_estimate($row, 'Viewed')
                                cy.wrap($row).find('input').check().should('be.checked');
                                trafficHomePage.acceptInstructionsBtn().click();
                                trafficHomePage.acceptInstructionComment().type(`Accepting ${envUtils.getEstimate()} Instruction`);
                                trafficHomePage.commentAcceptBtn().click();
                                trafficHomePage.acceptedTab().click();
                                trafficHomePage.acceptInstructionsBtn().should('not.exist');
                            };
                        });
                    } else if (index === endIndex) {
                        throw new Error(`Instruction - ${envUtils.getEstimate()} wasn't send from sTraffic`);
                    };;
                });
            };
            waitInboxInstruction();
            cy.screenshot();
        }).then(() => {
            index = 0;
            trafficHomePage.acceptedTab().click();
            trafficHomePage.acceptInstructionsBtn().should('not.exist');
            const waitAcceptedInstruction = () => {
                cy.is_element_exists(trafficHomePage.gridRowsSyntax()).then(($row) => {
                    if ($row === false && index < endIndex) {
                        index++;
                        cy.wait(1000);
                        cy.reload()
                        trafficHomePage.acceptedTab().should('be.visible')
                        waitAcceptedInstruction();
                    } else if ($row || index < endIndex) {
                        index = endIndex;
                        trafficHomePage.gridRows().should('be.visible')
                        trafficHomePage.gridRows().each(($row) => {
                            if ($row.text().includes(envUtils.getEstimate())) {
                                assert_traffic_estimate($row, 'View')
                            };
                        });
                    } else if (index === endIndex) {
                        throw new Error(`Instruction - ${envUtils.getEstimate()} wasn't accepted`);
                    };
                });
            };
            waitAcceptedInstruction();
            cy.screenshot();
        });
});

Given('Disable New Traffic user', () => {
    trafficHomePage.manageUserTab().click();
    search_new_user(true, false);
    cy.screenshot();
});

Given('Unassign vendor from New user', () => {
    trafficHomePage.assignVendorTab().click();
    search_new_user(false, true);
    trafficHomePage.assignVendorsRows().each(($row) => {
        expect($row.text()).to.contain(estimateParam.media.toUpperCase());
        expect($row.text()).to.contain(estimateParam.vendor.split('-')[0]);
        expect($row.text()).to.contain(estimateParam.vendor.split('-')[1]);
        cy.wrap($row).find('input').check().should('be.checked');
    });
    cy.screenshot();
    trafficHomePage.removeVendorsBtn().click();
    trafficHomePage.assignVendorsRows().should('not.exist');
    cy.screenshot();
    trafficHomePage.assignVenCancelBtn().click()
    trafficHomePage.assignedVenForm().should('not.be.visible');

})


// Saves new user parameters into Json file
function save_new_user_param() {
    const firstName = 'Test';
    const lastName = `User${Math.floor(Math.random() * (1000000, 9999999)) + 1000000}`;
    const email = `${firstName}${lastName}@mailinator.com`;
    const phone = '123-456-7890';
    const vendor = 'TEST TRAFFIC-AM';
    const password = 'abc123!'

    const data = {
        email: email,
        firstName: firstName,
        lastName: lastName,
        phone: phone,
        vendor: vendor,
        password: password
    };
    const jsonContent = JSON.stringify(data);
    cy.writeFile(NEW_USER_FILE, jsonContent);
    cy.readFile(NEW_USER_FILE).its('email').should('eq', email)
};

function assert_traffic_estimate(row, pdfDownload) {
    expect(row.text()).to.contain(estimateParam.instructionName);
    expect(row.text()).to.contain(estimateParam.startDate);
    expect(row.text()).to.contain(estimateParam.endDate);
    expect(row.text()).to.contain(estimateParam.agency);
    expect(row.text()).to.contain(estimateParam.client);
    expect(row.text()).to.contain(estimateParam.vendor);
    expect(row.text()).to.contain(pdfDownload);
}

function search_new_user(disableUser, assignVendor) {
    cy.readFile(NEW_USER_FILE).then(($newUserParam) => {
        trafficHomePage.searchTxtBox().type($newUserParam.email);
        trafficHomePage.searchButton().click();
        trafficHomePage.gridRows().should('have.length', 1)
        trafficHomePage.gridRows().each(($row) => {
            expect($row.text()).to.contain($newUserParam.email);
            expect($row.text()).to.contain($newUserParam.firstName);
            expect($row.text()).to.contain($newUserParam.lastName);
            expect($row.text()).to.contain($newUserParam.phone);
            if (disableUser === true) {
                cy.wrap($row).find('input').uncheck().should('not.be.checked')
            }
            if (assignVendor === true) {
                cy.wrap($row).find('a').click();
                trafficHomePage.assignedVenForm().should('be.visible');
                trafficHomePage.assignedVenFormTitle().should('include.text', `View Assigned Vendors of '${$newUserParam.firstName} ${$newUserParam.lastName}`);
            }
        });
    });
}

function search_straffic_estimate() {
    var index = 0;
    var endIndex = 10;
    strafficHomePage.trafficStatusBtn().click();
    strafficHomePage.searchBtn().should('be.disabled');
    strafficHomePage.agencyTxtBox().type(estimateParam.agency);
    cy.contains(estimateParam.agency).click();
    strafficHomePage.loadingSign().should('be.hidden');

    // Retries and waits on Estimate dropdown to exist 
    const waitForDropdown = () => {
        // Retries and waits on Estimate text box to become Enabled 
        const watForTxtBoxEnabled = () => {
            let innerIndex = 0;
            const innerEndIndex = 10;
            strafficHomePage.estimateTxtBox().click();
            strafficHomePage.estimateTxtBox().should('not.be.disabled');
            cy.is_element_exists(strafficHomePage.estimateTxtBoxEnabledSyntax()).then(($txtBoxEnabled) => {
                if ($txtBoxEnabled && innerIndex < innerEndIndex) {
                    cy.get(strafficHomePage.estimateTxtBoxEnabledSyntax()).should('exist').type(`{selectall}{backspace}${envUtils.getEstimate()}`);
                    innerIndex = innerEndIndex;
                } else if ($txtBoxEnabled === false && innerIndex < innerEndIndex) {
                    cy.wait(1000);
                    innerIndex++;
                    watForTxtBoxEnabled();
                }
            })
        }
        watForTxtBoxEnabled();

        cy.is_element_exists(strafficHomePage.estimateSelectSyntax()).then(($dropdown) => {
            if ($dropdown === false && index < endIndex) {
                index++;
                cy.wait(500);
                waitForDropdown();
            } else if ($dropdown === true || index < endIndex) {
                cy.is_element_exists('.estimate').then(($estimateExists) => {
                    // Verifies specific Estimate to become visible in the Estimate dropdown
                    if ($estimateExists === false && index < endIndex) {
                        index++;
                        waitForDropdown();
                    }
                })
                cy.wait(500)
                cy.contains(`${envUtils.getEstimate()} - `).click();
                cy.wait(500)
                index = endIndex;
            };
        });
    };
    waitForDropdown();
    cy.contains(envUtils.getEstimate()).should('be.visible');
    strafficHomePage.searchBtn().click();
    strafficHomePage.estimateCell().should('have.text', envUtils.getEstimate());
}

function navigate_eSend_contact_editor() {
    var index = 0;
    var endIndex = 10;
    strafficHomePage.estimateCell().should('have.text', envUtils.getEstimate());
    strafficHomePage.sendEstimateCell().click();
    strafficHomePage.sendSelectedStnRadioBtn().check().should('be.checked');
    const waitForDeselectAllCheckBox = () => {
        strafficHomePage.selectDeselectAllCheckBox().should('be.visible');
        strafficHomePage.selectDeselectAllCheckBox().click()
        cy.is_element_exists(strafficHomePage.selDslAllCheckBoxSyntax()).then(($dropdown) => {
            if ($dropdown === false && index < endIndex) {
                index++;
                cy.wait(500);
                waitForDeselectAllCheckBox();
            } else if ($dropdown === true || index < endIndex) {
                index = endIndex;
            };
        });
    };
    waitForDeselectAllCheckBox();
    strafficHomePage.selectDeselectAllCheckBox().should('be.checked');
    strafficHomePage.selectSendOption().parent().click();
    strafficHomePage.selectSendOption().select('Electronic');
    strafficHomePage.inviteMoreLink().click()
    strafficHomePage.inviteMoreCancelBtn({ multiple: true }).click()
    strafficHomePage.selectSendOption().should('have.text', 'Electronic');
    strafficHomePage.eSendContactEditor().click();
    strafficHomePage.eSendContactEditorModalBody().should('be.visible');
}


function traffic_user_listed_eSend_contacts() {
    return cy.readFile(NEW_USER_FILE).then(($newUserParam) => {
        let found = false;
        return strafficHomePage.eSendContactRows().each(($element) => {
            const rowText = $element.text();
            if (rowText.includes($newUserParam.email)) {
                found = true;
                return false;
            }
        }).then(() => {
            return found;
        });
    });
}