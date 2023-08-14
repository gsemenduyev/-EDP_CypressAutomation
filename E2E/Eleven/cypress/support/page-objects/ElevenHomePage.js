class ElevenHomePage{
    welcomeMessage(){
        return cy.get('.header-welcome');
    }
    settingsIcon(){
        return cy.get('#setting-menu');
    }
    toggleHeaderOption(){
        return cy.get('#toggleHeader');
    }
    toggleLeftPaneOption(){
        return cy.get('#toggleLeftPane');
    }
    showFiltersOption(){
        return cy.get('#showFilters');
    }
    showRatingOption(){
        return cy.get('#showRating00');
    }
    manageChangeOption(){
        return cy.get('#manageStandardChangeReason');
    }
    shortCutsOption(){
        return cy.get('#help-menu');
    }
    userGuideOption(){
        return cy.get('[data-menu="help"]');
    }
    supportOption(){
        return cy.get('[data-menu="support"]');
    }
    logoutOption(){
        return cy.get('[data-menu="logout"]');
    }
    versionDialog(){
        return cy.get('#ui-id-5');
    }
    versionOkBtn(){
        return cy.get('.ui-dialog-buttonset > .btn-11');
    }
    firstRecordToDo(){
        return  cy.get('.estimate-item.order-item').first();
    }
    headerSection(){
        return cy.get('#headerBarResults > .estimate-header');
    }
    sideBarSection(){
        return cy.get('#sidebar');
    }
    filtersSection(){
        return cy.get('#filters')
    }
    rating00Option(){
        return cy.get('#lGrp00');
    }  
    ratingOption(){
        return  cy.get('#lGrp');
    }  
    manageChangeReason(){
        return cy.get('#ui-id-7');
    }
    changeReasonCancel(){
        return cy.get('.ui-dialog-buttonset > :nth-child(2)');
    }
    shortCutDialog(){
        return cy.get('#ui-id-6');
    }
    okShortCutDialog(){
        return cy.get('[aria-describedby="ui-id-5"] > .ui-dialog-buttonpane > .ui-dialog-buttonset > .btn-11');
    }
  }
export default  ElevenHomePage;