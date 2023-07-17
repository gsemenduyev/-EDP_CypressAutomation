NODE.js
JAVA >= 8 

cd E2E/ARFP-Stratasphere

npm install
npm update

npx cypress open --env ENV="Production",VERSION="v 8.4.1.39508"
npm test
npm run test-Stratasphere
npm run test-ARFP
npm run test-WIP

allure open 'cypress/reports/allure-report'

node ./cucumber-html-report.js

npx cypress open  --env ENV="QA",VERSION="v 8.4.1.39508"

npx cypress run --browser chrome --headed --env tags="@WIP",ENV="QA",VERSION="v 8.4.1.39508"