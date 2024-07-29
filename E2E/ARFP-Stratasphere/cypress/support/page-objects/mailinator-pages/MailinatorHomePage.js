class MailinatorHomePage {
    userSearchBox() {
        return cy.get('#inbox_field');
    }
    newRfpEmailSyntax() {
        return "tr[ng-repeat='email in emails']";
    }

    publicMessageText() {
        return cy.get('.gray-color');
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
        return cy.get('#pills-links-content').contains(negotiate).siblings().children('a');
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
    resetPasswordEmail(milliseconds) {
        return cy.contains('Reset your password', { timeout: milliseconds }).first();
    }
    emailTiming() {
        return cy.get('.ng-binding').eq(8);
    }
    publicInboxes() {
        return cy.get("[href='inboxes.jsp']");
    }
    forgotPasswordLink() {
        return cy.get('#texthtml_msg_body')
            .its('0.contentDocument')
            .then(cy.wrap)
            .find('a')
            .eq(0);
    };
    resetPasswordLink() {
        return cy.get('#html_msg_body')
            .its('0.contentDocument')
            .then(cy.wrap)
            .find('a')
            .eq(0);
    };
    sellerEmailBody() {
        return cy.get('#html_msg_body')
            .its('0.contentDocument')
            .then(cy.wrap)
            .find('a')
            .eq(2)
            .invoke('attr', 'href');
    }

    buyerEmailBody() {
        return cy.get('#texthtml_msg_body')
            .its('0.contentDocument')
            .then(cy.wrap)
            .find('body')
            .contains('body', 'Please send questions regarding this notification to')
    };

    emailTitleSyntax(title) {
        return `td:contains("${title}")`;
    };

    version() {
        return cy.get('#html_msg_body')
            .its('0.contentDocument')
            .then(cy.wrap)
            .find('.nowrapLabel + td')
            .eq(0);
    }

    advertiser() {
        return cy.get('#html_msg_body')
            .its('0.contentDocument')
            .then(cy.wrap)
            .find('.nowrapLabel + td')
            .eq(1);
    }

    flightDates() {
        return cy.get('#html_msg_body')
            .its('0.contentDocument')
            .then(cy.wrap)
            .find('.nowrapLabel + td')
            .eq(2);
    }


    primaryDemo() {
        return cy.get('#html_msg_body')
            .its('0.contentDocument')
            .then(cy.wrap)
            .find('.nowrapLabel + td')
            .eq(3);
    }

    redirectSsphereNegotiationLink() {
        return cy.get('#html_msg_body')
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
            cy.is_element_exists(mailinatorHomePage.emailTitleSyntax(emailTitle + newRfpName)).then(function (el) {
                if (index < 60 && !el) {
                    if (index === 30) {
                        mailinatorHomePage.goButton().click();
                    };
                    cy.wait(5000);
                    cy.log(`Waiting ${(index + 1) * 5} seconds for "${emailTitle} ${newRfpName}" email`)
                    index++;
                    checkEmailExists();
                } else {
                    cy.get(mailinatorHomePage.emailTitleSyntax(emailTitle + newRfpName)).click()
                }
            })
        }
        checkEmailExists();
    }
}
export default MailinatorHomePage;