NODE.js
JAVA >= 8 

cd E2E/ARFP-Stratasphere


npm install
npm update

npx cypress open
npm test
npm run test-Stratasphere
npm run test-ARFP
npm run test-WIP

allure open 'cypress/reports/allure-report'

npx cypress run --browser chrome --headed --env tags=@WIP
node ./cucumber-html-report.js

npx cypress open  --env ENV="QA"

npx cypress run  --env ENV="Production"

npx cypress open  --env ENV="Production"

npx cypress run --browser chrome --headed --env tags="@WIP",ENV="Production"

npx cypress open --config-file production-config.json --env tags="@WIP"
npx cypress open --config-file cypress.qa.json
production.config.js

npx cypress open --env configFile=production

@WIP