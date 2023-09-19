<h1 align="center"> Cypress Code - JavaScript (Cucumber) - test on ARFP and Stratasphere applications)  </h1> <br>

<p align="center">
  Description: This is End to End automated Smoke test for ARFP and Stratasphere projects.
</p>

## System Requirements
* [NODE.js](https://nodejs.org/en)
* [Java 11 SDK](https://www.oracle.com/au/java/technologies/javase/jdk11-archive-downloads.html) - For Allure Report

## Features
Cypress Tests

## Project Installation Instructions
* [Clone EDP_Automation Project from GitHub](https://github.freewheel.tv/HS/EDP_CypressAutomation.git)
* Open Terminal
* Navigate to ARFP-Stratasphere directory - `cd E2E/ARFP-Stratasphere`
* Install libraries - `npm install`



<p align="left">
  Description: Currently the ARFP-Stratasphere project could be executed in QA and Production environments.
</p>

* ARFP 
[QA](https://2wayrfpqa.pregotostrata.com/RFP)
[Production](https://2wayrfp.gotostrata.com/RFP)
* Stratasphere 
[QA](https://ssphereqa.pregotostrata.com/ui_new#/)
[Production](https://2wayrfp.gotostrata.com/RFP)
* [Mailinator](https://www.mailinator.com/v4/public/inboxes.jsp)

## Execution modes 🤖 Starting up

* Open the Cypress Test Runner

`npx cypress open --env ENV="QA"`

`npx cypress open --env ENV="Production"`


* Run Cypress Tests using Cypress CLI

`npx cypress run --browser chrome --headed --env tags="@ARFP",ENV="QA",VERSION="v 8.4.0"`

`npx cypress run --browser chrome --headed --env tags="@ARFP",ENV="Production",VERSION="v 8.3.6.60524"`

## Generate Cucumber report
`node ./cucumber-html-report.js`

Report Path - `E2E\ARFP-Stratasphere\cypress\reports\multi-html-report\index.html`

## Save and share Cucumber report
<p align="left">
  Description: In order to save and share Cucumber report, first deploy the multi-html-report directory on Netlify app then use Save Page WE chrome extension to save the page.
</p>

* [Netlify](https://app.netlify.com/)
* [Save Page WE](https://chrome.google.com/webstore/detail/save-page-we/dhhpefjklgkmgeafimnjhojgjamoafof)

## Generate Allure Report 
* `npm run test-Stratasphere`
* `allure open 'cypress/reports/allure-report'`

## Jenkins pipelines
* [ARFP_Stratasphere_CypressAutomation](https://jenkins-strata.freewheel.tv/job/Strata/job/TestAutomation/job/ARFP_Stratasphere_CypressAutomation/)
* [Cypress_DockerTest](https://jenkins-strata.freewheel.tv/job/Strata/job/TestAutomation/job/Cypress_DockerTest/)

## Useful VSCode extensions
* [Code Spell Checker](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker)
* [Cucumber (Gherkin) Full Support](https://marketplace.visualstudio.com/items?itemName=alexkrechik.cucumberautocomplete)