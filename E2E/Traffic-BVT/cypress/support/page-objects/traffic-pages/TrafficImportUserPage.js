class TrafficImportUserPage {
    userImportMsg(index) {
        return cy.get("[style='margin-left:5ex; width:150ex;'] div").eq(index);
    };
    chooseFileBtn() {
        return cy.get('#body_flUsers');
    };
    uploadBtn() {
        return cy.get('[name="ctl00$body$ctl00"]');
    };
    cancelBtn() {
        return cy.get('[name="ctl00$body$ctl01"]');
    };
    uploadedUserForm() {
        return cy.get('.body tbody tr').eq(1);
    };
    uploadedUserImportBtn() {
        return cy.get('[name="ctl00$body$ctl02"]');
    };
    uploadedUserCancelBtn() {
        return cy.get('[name="ctl00$body$ctl03"]');
    };
    uploadedUserHeader() {
        return cy.get('header');
    };
    importedUserDownloadListBtn() {
        return cy.get('[name="ctl00$body$ctl04"]');
    };
    importedUserCloseBtn() {
        return cy.get('[name="ctl00$body$ctl05"]');
    };

};
export default TrafficImportUserPage;