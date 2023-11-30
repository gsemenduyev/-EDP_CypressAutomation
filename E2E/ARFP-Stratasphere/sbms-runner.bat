@echo off
mkdir C:\CypressAutomation\EDP_CypressAutomation\E2E\ARFP-Stratasphere\cypress\reports\sbms-arfp-stratasphere-report
echo [] > C:\CypressAutomation\EDP_CypressAutomation\E2E\ARFP-Stratasphere\cypress\reports\sbms-arfp-stratasphere-report\sbms-arfp-stratasphere-report.json
echo Running the Maven project
cd C:\CypressAutomation\EDP_CypressAutomation\E2E\SBMS
call mvn clean test -Dcucumber.options="--tags @wip"
cd C:\CypressAutomation\EDP_CypressAutomation\E2E\ARFP-Stratasphere
echo Maven project completed
cd ..
echo Running the Cypress project
cd C:\CypressAutomation\EDP_CypressAutomation\E2E\ARFP-Stratasphere
call npx cypress run --browser chrome --headed --spec cypress/integration/step-definitions/agency-version-number/agency-version-number.feature --env ENV="Production",VERSION="v 8.3.6.60524"
echo Cypress project completed
call node ./sbms-stratasphere-html-report.js