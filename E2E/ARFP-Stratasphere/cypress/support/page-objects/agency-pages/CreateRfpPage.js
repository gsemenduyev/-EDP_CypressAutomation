class CreateRfpPage {
    agencySearchBox() {
        return cy.contains('Required; select an Agency');
    }
    agencySearchInputBox() {
        return cy.get("input[placeholder='Required; select an Agency']");
    }
    agencySearchOptions() {
        return cy.get('#ui-select-choices-0 .ui-select-choices-row');
    }
    clientSearchBox() {
        return cy.contains('Required; select a Client');
    }
    clientSearchInputBox() {
        return cy.get("input[placeholder='Required; select a Client']");
    }
    clientSearchOptions() {
        return cy.get('#ui-select-choices-2 .ui-select-choices-row');
    }
    newRfpNameInputBox() {
        return cy.get('#name');
    }
    rfpBudgetInputBox() {
        return cy.get('#budget');
    }
    officeInputBox() {
        return cy.get("div[placeholder='Required; select an Office'] span span span");
    }
    productSearchBox() {
        return cy.contains('Optional unless Estimate(s) is selected');
    }
    productSearchOptions() {
        return cy.get('#ui-select-choices-3 .ui-select-choices-row');
    }
    goalTypeSearchBox() {
        return cy.contains('Required; select a goal type');
    }
    goalTypeSearchOptions() {
        return cy.get('#ui-select-choices-5  .ui-select-choices-row');
    }
    startDateSearchBox() {
        return cy.get('#startDate');
    }
    startDateInputBox() {
        return cy.get('#startDate input');
    }
    dateOption() {
        return cy.get("[class*='active day']");
    }
    endDateSearchBox() {
        return cy.get('#endDate');
    }
    endDateInputBox() {
        return cy.get('#endDate input');
    }
    dueDateInputBox() {
        return cy.get('#dueDate input');
    }
    primaryDemoSearchBox() {
        return cy.contains('Select the primary demographic; required for linear only');
    }
    primaryDemoSearchOptions() {
        return cy.get('#ui-select-choices-7 .ui-select-choices-row');
    }
    vendorSearchBox() {
        return cy.contains('Type to search vendor');
    }
    vendorInputBox() {
        return cy.get("input[placeholder='Type to search vendors'");
    }
    vendorSearchOptions() {
        return cy.get('#ui-select-choices-11 .ui-select-highlight');
    }
    vendorContact() {
        return cy.get('.vendor-contact a');
    }
    vendorContactOptions() {
        return cy.get("[ng-repeat*='contact in contacts']");
    }

    selectVendorContact() {
        return cy.get("[ng-repeat*='contact in contacts'] a");
    }
    vendorCheckBox() {
        return cy.get('.text-center input');
    }
    saveAndSendRfpButton() {
        return cy.contains('Save and Send RFP');
    }
    marketRequiredSelectorSyntax() {
        return "[ng-if*='!request.marketName'] span";
    }
    saveButton() {
        return cy.contains('Save');
    }
    newRfpPageTitle() {
        return cy.get('#page-title');
    }
    newRfpDropdownOptions(elementList, option) {
        elementList.each((element, index, list) => {
            if (element.text().trim() === option) {
                element.click();
            }
        })
    }
    selectMarket(market) {
        cy.get("body").then($body => {
            if ($body.find('span.required').length > 0) {
                cy.get('select').select(market);
            }
        });
    }
}
export default CreateRfpPage;