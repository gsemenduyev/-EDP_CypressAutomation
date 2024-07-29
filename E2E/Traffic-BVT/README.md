<h1 align="center"> Cypress Code - JavaScript (Cucumber) - for Traffic application  </h1> <br>

<p align="center">
  Description: This is End to End automated Smoke test for Traffic-BVT project.
</p>

## System Requirements
* [NODE.js](https://nodejs.org/en)
* [Java 11 SDK](https://www.oracle.com/au/java/technologies/javase/jdk11-archive-downloads.html) - For Allure Report

## Features
Cypress Tests

## Project Installation Instructions
* Clone EDP_Automation Project from GitHub - `https://github.freewheel.tv/HS/EDP_CypressAutomation.git`
* Open Terminal
* Navigate to Traffic-BVT directory - `cd E2E/Traffic-BVT`
* Install libraries - `npm install`
* Copy paste [QA config file](https://jenkins-strata.freewheel.tv/job/Strata/job/TestAutomation/configfiles/editConfig?id=3983071e-2eb1-424b-aa52-71dec9a33d8a) to the current project - `cypress/fixtures/environment/qa-param.json`
* Copy paste [PROD config file](https://jenkins-strata.freewheel.tv/job/Strata/job/TestAutomation/configfiles/editConfig?id=2bf30fa4-2bec-4c94-8f05-6cbc80663a9c) to the current project - `cypress/fixtures/environment/prod-param.json`

<p align="left">
  Description: Currently the ARFP-Stratasphere project could be executed in QA and Production environments.
</p>

* Traffic
[QA](https://aeinboxqa.pregotostrata.com/Traffic/login.aspx)
[Production](https://www.11aeinbox.com/Traffic/login.aspx)
* sTraffic
[QA](https://strafficqa.pregotostrata.com/sTraffic/)
[Production](https://straffic.gotostrata.com/sTraffic/)


## Execution modes 🤖 Starting up
* Open the Cypress Test Runner

`npx cypress open --env ENV="QA"`

`npx cypress open --env ENV="Production"`

* Run Cypress Tests using Cypress CLI

`npx cypress run --browser chrome --headed --env tags="@Smoke",ENV="QA"`

`npx cypress run --browser chrome --headed --env tags="@Regression",ENV="QA"`

`npx cypress run --browser chrome --headed --env tags="@Smoke",ENV="Production"`

`npx cypress run --browser chrome --headed --env tags="@Regression",ENV="Production"`

## Generate Cucumber report
`node ./cucumber-html-report.js`

Report Path - `E2E\ARFP-Stratasphere\cypress\reports\multi-html-report\index.html`

## Save and share Cucumber report
<p align="left">
  Description: In order to save and share Cucumber report, first deploy the multi-html-report directory on Netlify app then use Save Page WE chrome extension to save the page.
</p>

* [Netlify](https://app.netlify.com/)
* [Save Page WE](https://chrome.google.com/webstore/detail/save-page-we/dhhpefjklgkmgeafimnjhojgjamoafof)

## Jenkins pipeline
* [Traffic-BVT_CypressAutomation](https://jenkins-strata.freewheel.tv/job/Strata/job/TestAutomation/job/Traffic-BVT_CypressAutomation/)


## Recommendations for Future Development 
* Use [VSCode](https://code.visualstudio.com/download) as source-code editor
* Follow [coding standards](https://wiki.freewheel.tv/display/FWMVPD/Cypress+Knowledge+Base)

## Useful VSCode extensions
* [Code Spell Checker](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker)
* [Cucumber (Gherkin) Full Support](https://marketplace.visualstudio.com/items?itemName=alexkrechik.cucumberautocomplete)