NODE.js
JAVA >= 8 

cd E2E/Eleven

npm install
npm update

npx cypress open --env ENV="QA"
npm test
npm run test-Eleven

allure open 'cypress/reports/allure-report'

node ./cucumber-html-report.js

npx cypress open  --env ENV="Production"

npx cypress run --browser chrome --headed --env tags="",ENV="QA"