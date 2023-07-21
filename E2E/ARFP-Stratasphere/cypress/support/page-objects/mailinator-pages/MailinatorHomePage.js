class MailinatorHomePage {
    userSearchBox() {
        return cy.get('#inbox_field');
    }
    newRfpEmailSyntax() {
        return "tr[ng-repeat='email in emails']";
    }

    publicMessageText(milliseconds) {
        return cy.get('.gray-color', { timeout: milliseconds });
    }
    emailMsgBodyIframe() {
        return cy.get('#html_msg_body');
    }
    goButton() {
        return cy.get('.primary-btn');
    }
    emailName() {
        return cy.get("tr[ng-repeat='email in emails'] .ng-binding");
    }
    emailDetailsSyntax() {
        return '.nowrapLabel + td';
    }
    clickHereSsphereLinkSyntax() {
        return "[rel*='nofollow']";
    }
    redirectSsphereLink() {
        return cy.get('a').eq(0);
    }
    linksTab() {
        return cy.get('#pills-links-tab');
    }
    negotiationLinks(negotiate) {
        return cy.get('#pills-links-content').contains(negotiate).siblings().children('a')
    }
    deleteEmailButton() {
        return cy.get("a[onclick='deleteEmail();']");
    }
    emailTextMsgBodyIframe() {
        return cy.get('#texthtml_msg_body');
    }
    emailHeader(index) {
        return cy.get('.wrapper-info-title.d-flex div').eq(index);
    }
    userSearchBox() {
        return cy.get('#inbox_field');
    }
    forgotPasswordEmail(milliseconds) {
        return cy.contains('Forgot Password for RFP', { timeout: milliseconds }).first();
    }
    emailTiming() {
        return cy.get('.ng-binding').eq(8);
    }
    publicInboxes() {
        return cy.get("[href='inboxes.jsp']")
    }
    forgotPasswordLink() {
        return cy.get('#texthtml_msg_body')
            .its('0.contentDocument')
            .then(cy.wrap)
            .find('a')
            .eq(0);
    }

    /* 
    Utils function that searches for email in https://www.mailinator.com/v4/public/inboxes.jsp
    [@param] emailTitle - Email Title.
    [@param] newRfpName - RFP Name
    */
    search_email(emailTitle, newRfpName) {
        const mailinatorHomePage = new MailinatorHomePage;
        let index = 0;
        const checkEmailExists = () => {
            cy.is_element_exists(mailinatorHomePage.newRfpEmailSyntax()).then(function (el) {
                if (index < 60 && !el) {
                    mailinatorHomePage.goButton().click();
                    cy.wait(5000);
                    index++;
                    checkEmailExists();
                }
            })
        }
        checkEmailExists();
        index = 0;
        const checkEmailName = () => {
            mailinatorHomePage.emailName().each((el) => {
                if (el.text().trim().includes(emailTitle + newRfpName)) {
                    cy.log(el.text().trim());
                    cy.wrap(el).click();
                    mailinatorHomePage.publicMessageText().should('include.text', newRfpName);
                    return false;
                }
            })
            mailinatorHomePage.publicMessageText().then(function (titleRfp) {
                if (index < 60 && (!titleRfp.text().trim().includes(emailTitle + newRfpName))) {
                    mailinatorHomePage.goButton().click();
                    cy.wait(5000);
                    index++
                    checkEmailName();
                }
            })
        }
        checkEmailName();
        mailinatorHomePage.publicMessageText().should('include.text', newRfpName);
    }
}
export default MailinatorHomePage;