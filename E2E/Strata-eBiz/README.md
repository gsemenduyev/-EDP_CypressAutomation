<h1 align="center"> Cypress Code - JavaScript (Cucumber) - for Strata-eBiz applications  </h1> <br>

<p align="center">
  Description: This is automated Strata-eBiz Daily Sanity Test.
</p>

## System Requirements
* [NODE.js](https://nodejs.org/en)

## Features
Cypress Tests

## Project Installation Instructions
* Clone EDP_Automation Project from GitHub - `https://github.freewheel.tv/HS/EDP_CypressAutomation.git`
* Open Terminal
* Navigate to ARFP-Stratasphere directory - `cd E2E/Strata-eBiz`
* Install libraries - `npm install`
* Copy paste [Config file](https://jenkins-strata.freewheel.tv/job/Strata/job/TestAutomation/configfiles/editConfig?id=16d93a3a-a4a4-4764-9cb5-231f80e7261f) to the current project - `cypress/fixtures/environment/environments.json`

<p align="left">
  Description: Currently the Strata-eBiz project could be executed in QA environment.
</p>

* ARFP 
[QA](https://2wayrfpqa.pregotostrata.com/RFP)
* Stratasphere 
[QA](https://ssphereqa.pregotostrata.com/ui_new#/)
* sTraffic
[QA](https://strafficqa.pregotostrata.com) 
* Traffic
[QA](https://aeinboxqa.pregotostrata.com/Traffic/login.aspx) 
* AEInbox
[QA](https://aeinboxqa.pregotostrata.com/aeinbox/default.aspx)
* ePort
[QA](https://eportqa.pregotostrata.com/main.aspx)
* Eleven
[QA](https://11qa.pregotostrata.com/11Orders)

## Execution modes 🤖 Starting up
* Open the Cypress Test Runner

`npx cypress open --env`

* Run Cypress Tests using Cypress CLI

`npx cypress run --browser chrome --headed`

## Generate Cucumber report
`node ./cucumber-html-report.js`

Report Path - `E2E\Strata-eBiz\cypress\reports\multi-html-report\index.html`

## Save and share Cucumber report
<p align="left">
  Description: In order to save and share Cucumber report, first deploy the multi-html-report directory on Netlify app then use Save Page WE chrome extension to save the page.
</p>

* [Netlify](https://app.netlify.com/)
* [Save Page WE](https://chrome.google.com/webstore/detail/save-page-we/dhhpefjklgkmgeafimnjhojgjamoafof)


## Jenkins pipeline
* [Strata-eBiz_Daily_Sanity_Test](https://jenkins-strata.freewheel.tv/job/Strata/job/TestAutomation/job/Strata-eBiz_Daily_Sanity_Test/)

## Recommendations for Future Development 
* Use [VSCode](https://code.visualstudio.com/download) as source-code editor
* Follow [coding standards](https://wiki.freewheel.tv/display/FWMVPD/Cypress+Knowledge+Base)

## Useful VSCode extensions
* [Code Spell Checker](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker)
* [Cucumber (Gherkin) Full Support](https://marketplace.visualstudio.com/items?itemName=alexkrechik.cucumberautocomplete)