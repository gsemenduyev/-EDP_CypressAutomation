@echo off
echo Running the Maven project
cd C:\CypressAutomation\EDP_CypressAutomation\E2E\SBMS
call mvn clean test -Dcucumber.options="--tags @wip"
cd C:\CypressAutomation\EDP_CypressAutomation\E2E\ARFP-Stratasphere