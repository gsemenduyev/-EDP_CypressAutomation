class SSphereHomePage{
    proposalsField() {
        return cy.get('a[ui-sref="proposals"]');
    }
    proposalsFieldSelectorSyntax() {
        return 'a[ui-sref="proposals"]';
    }
}
export const sSphereHomePage = new SSphereHomePage;