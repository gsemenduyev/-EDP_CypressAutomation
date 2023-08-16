class ElevenSigninPage{
    pageTitle() {
        return cy.get('legend');
    }
    signIn() {
        return cy.get('#SignIn');
    }
    userName() {
        return cy.get('#Username');
    }
    passWord() {
        return cy.get('#Password');
    }
    adminMessage(){
        return cy.get('#adminMessage');
    }
    noAdminMessage(){
        return '#adminMessage';
    }
    welcomeMessage(){
        return cy.get('.header-welcome');
    }
   
  }
export default  ElevenSigninPage;