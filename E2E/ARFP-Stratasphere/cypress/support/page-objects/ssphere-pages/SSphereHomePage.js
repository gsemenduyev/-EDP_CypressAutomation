class SSphereHomePage{
    proposalsField() {
        return cy.get('a[ui-sref="proposals"]');
    }
    proposalsFieldSelectorSyntax() {
        return 'a[ui-sref="proposals"]';
    }
}
export default SSphereHomePage;