<h1 align="center"> Cypress Code - JavaScript (Cucumber) - for ARFP and Stratasphere applications  </h1> <br>

<p align="center">
  Description: This is End to End automated Smoke test for ARFP and Stratasphere projects.
</p>

## System Requirements
* [NODE.js](https://nodejs.org/en)
* [Java 11 SDK](https://www.oracle.com/au/java/technologies/javase/jdk11-archive-downloads.html) - For Allure Report

## Features
Cypress Tests

## Project Installation Instructions
* Clone EDP_Automation Project from GitHub - `https://github.freewheel.tv/HS/EDP_CypressAutomation.git`
* Open Terminal
* Navigate to ARFP-Stratasphere directory - `cd E2E/ARFP-Stratasphere`
* Install libraries - `npm install`
* Copy and paste the [QA environment file](https://jenkins-strata.freewheel.tv/job/Strata/job/TestAutomation/configfiles/editConfig?id=2a6e4dde-90fd-4b33-870c-94e1ac74261e) into the current project - `cypress/fixtures/environment/qa-param.json`
* Copy and paste the [Ssphere QA credentials file](https://jenkins-strata.freewheel.tv/job/Strata/job/TestAutomation/configfiles/editConfig?id=9bc10f95-6d44-4f34-80fe-e76bb167b9a8) into the current project - `cypress/fixtures/gmail-data/client-secrets/qa-environment/credentials-ssphere.testqa.json`
* Copy and paste the [Ssphere QA token file](https://jenkins-strata.freewheel.tv/job/Strata/job/TestAutomation/configfiles/editConfig?id=bed5c51f-2bbd-404a-899e-3dc864d4442f) into the current project - `cypress/fixtures/gmail-data/client-secrets/qa-environment/token-ssphere.testqa.json`
* Copy and paste the [ARFP QA credentials file](https://jenkins-strata.freewheel.tv/job/Strata/job/TestAutomation/configfiles/editConfig?id=4255826b-6415-484f-87f8-43aa8cadabb3) into the current project - `cypress/fixtures/gmail-data/client-secrets/qa-environment/credentials-arfp.testqa.json`
* Copy and paste the [ARFP QA token file](https://jenkins-strata.freewheel.tv/job/Strata/job/TestAutomation/configfiles/editConfig?id=35f198df-dd05-428b-aee4-791ae062328e) into the current project - `cypress/fixtures/gmail-data/client-secrets/qa-environment/token-arfp.testqa.json`
* Copy and paste the [UAT environment file](https://jenkins-strata.freewheel.tv/job/Strata/job/TestAutomation/configfiles/editConfig?id=10596465-25c2-4869-93fe-1b8c63a3dec6) into the current project - `cypress/fixtures/environment/uat-param.json`
* Copy and paste the [Ssphere UAT credentials file](https://jenkins-strata.freewheel.tv/job/Strata/job/TestAutomation/configfiles/editConfig?id=57fe633a-ea69-44de-8322-8bc705fa9332) into the current project - `cypress/fixtures/gmail-data/client-secrets/uat-environment/credentials-ssphere.testuat.json`
* Copy and paste the [Ssphere UAT token file](https://jenkins-strata.freewheel.tv/job/Strata/job/TestAutomation/configfiles/editConfig?id=bb5e457e-bef5-4a87-83f4-936df7a1c85d) into the current project - `cypress/fixtures/gmail-data/client-secrets/uat-environment/token-ssphere.testuat.json`
* Copy and paste the [ARFP UAT credentials file](https://jenkins-strata.freewheel.tv/job/Strata/job/TestAutomation/configfiles/editConfig?id=29d743f1-0e58-4bb1-b04d-dfbe2f7f79d8) into the current project - `cypress/fixtures/gmail-data/client-secrets/uat-environment/credentials-arfp.testuat.json`
* Copy and paste the [ARFP UAT token file](https://jenkins-strata.freewheel.tv/job/Strata/job/TestAutomation/configfiles/editConfig?id=d9e342ab-5464-42cd-9d93-5c1db7c5d9f3) into the current project - `cypress/fixtures/gmail-data/client-secrets/uat-environment/token-arfp.testuat.json`
* Copy and paste the [PROD environment file](https://jenkins-strata.freewheel.tv/job/Strata/job/TestAutomation/configfiles/editConfig?id=1ad0b80a-404d-45ac-81b1-71cd259794d1) into the current project - `cypress/fixtures/environment/prod-param.json`
* Copy and paste the [Ssphere PROD credentials file](https://jenkins-strata.freewheel.tv/job/Strata/job/TestAutomation/configfiles/editConfig?id=f12eeccf-0cbc-4732-86b9-4b7699c45cbd) into the current project - `cypress/fixtures/gmail-data/client-secrets/prod-environment/credentials-ssphere.testprod.json`
* Copy and paste the [Ssphere PROD token file](https://jenkins-strata.freewheel.tv/job/Strata/job/TestAutomation/configfiles/editConfig?id=8ab00118-f24e-4d98-90cc-7d1b56524bea) into the current project - `cypress/fixtures/gmail-data/client-secrets/prod-environment/token-ssphere.testprod.json`

* Copy and paste the [ARFP PROD credentials file](https://jenkins-strata.freewheel.tv/job/Strata/job/TestAutomation/configfiles/editConfig?id=8b27df77-7989-498b-9a59-9e3b417777e6) into the current project - `cypress/fixtures/gmail-data/client-secrets/prod-environment/credentials-arfp.testprod.json`

* Copy and paste the [ARFP PROD token file](https://jenkins-strata.freewheel.tv/job/Strata/job/TestAutomation/configfiles/editConfig?id=344cddea-4dd2-4626-8901-01172620eb96) into the current project - `cypress/fixtures/gmail-data/client-secrets/prod-environment/token-arfp.testprod.json`

<p align="left">
  Description: Currently the ARFP-Stratasphere project could be executed in QA, UAT and Production environments.
</p>

* ARFP 
[QA](https://2wayrfpqa.pregotostrata.com/RFP)
[UAT](https://2wayrfpuat.gotostrata.com/RFP)
[Production](https://2wayrfp.gotostrata.com/RFP)
* Stratasphere 
[QA](https://ssphereqa.pregotostrata.com/ui_new#/)
[UAT](https://ssphereuat.gotostrata.com/ui_new#/)
[Production](https://2wayrfp.gotostrata.com/RFP)

## Execution modes 🤖 Starting up
* Open the Cypress Test Runner

`npx cypress open --env ENV="QA"`

`npx cypress open --env ENV="UAT"`

`npx cypress open --env ENV="Production"`

* Run Cypress Tests using Cypress CLI

`npx cypress run --browser chrome --headed --env tags="@ARFP",ENV="QA",VERSION="v 8.4.0"`

`npx cypress run --browser chrome --headed --env tags="@ARFP",ENV="UAT",VERSION="v 8.4.0"`

`npx cypress run --browser chrome --headed --env tags="@ARFP",ENV="Production",VERSION="v 8.4.0"`

  Description: We have two types of users with domains `@mailinator.com` and `@gmail.com`. By default, automation works with`@gmail.com` domains. But to run with `@mailinator.com` users we need to add `DOMAIN="Mailinator"` to the execution commands..

  Example:
* Open the Cypress Test Runner
`npx cypress open --env ENV="QA",DOMAIN="Mailinator"`
* Run Cypress Tests using Cypress CLI
`npx cypress run --browser chrome --headed --env tags="@ARFP",ENV="QA",DOMAIN="Mailinator",VERSION="v 8.4.0"`

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

## Jenkins pipeline
* [ARFP_Stratasphere_CypressAutomation](https://jenkins-strata.freewheel.tv/job/Strata/job/TestAutomation/job/ARFP_Stratasphere_CypressAutomation/)


## Recommendations for Future Development 
* Use [VSCode](https://code.visualstudio.com/download) as source-code editor
* Follow [coding standards](https://wiki.freewheel.tv/display/FWMVPD/Cypress+Knowledge+Base)

## Useful VSCode extensions
* [Code Spell Checker](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker)
* [Cucumber (Gherkin) Full Support](https://marketplace.visualstudio.com/items?itemName=alexkrechik.cucumberautocomplete)