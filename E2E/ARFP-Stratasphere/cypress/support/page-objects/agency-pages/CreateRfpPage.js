class CreateRfpPage {
    agencySearchBox() {
        return cy.contains('Required; select an Agency');
    }
    agencySearchInputBox() {
        return cy.get("input[placeholder='Required; select an Agency']");
    }
    agencySearchOptions() {
        return cy.get("[repeat='item in agencies | filter: {name: $select.search}'] .ui-select-choices-row");
    }
    clientSearchBox() {
        return cy.contains('Required; select a Client');
    }
    clientSearchInputBox() {
        return cy.get("input[placeholder='Required; select a Client']");
    }
    clientSearchOptions() {
        return cy.get("[repeat='item in clients | filter: {name: $select.search}'] .ui-select-choices-row");
    }
    newRfpNameInputBox() {
        return cy.get('#name');
    }
    rfpBudgetInputBox() {
        return cy.get('#budget');
    }
    officeInputBox() {
        return cy.get("div[placeholder='Required; select an Office'] .ui-select-match-text.pull-left");
    }
    productSearchBox() {
        return cy.contains('Optional unless Estimate(s) is selected');
    }
    productSearchOptions() {
        return cy.get("[repeat='item in products | filter: {name: $select.search}'] .ui-select-choices-row");
    }
    goalTypeSearchBox() {
        return cy.contains('Required; select a goal type');
    }
    goalTypeSearchOptions() {
        return cy.get("[repeat='item.name as item in goalType'] .ui-select-choices-row");
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
        return cy.get("[repeat='item in demos| demoFilter: {primaryDemo:$select.search}'] .ui-select-choices-row");
    }
    vendorSearchBox() {
        return cy.contains('Type to search vendor');
    }
    vendorInputBox() {
        return cy.get("input[placeholder='Type to search vendors'");
    }
    vendorSearchOptions() {
        return cy.get("[repeat='item in registryVendors'] .vendor-list-name-div");
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
        elementList.each(($element) => {
            if ($element.text().trim() === option) {
                $element.click();
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