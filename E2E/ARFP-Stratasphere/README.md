NODE.js
JAVA >= 8 

cd E2E
cd ARFP-Stratasphere

npm install
npm update

npx cypress open
npm test
npm run test-stratasphere
npm run test-arfp
npm run test-wip

allure open 'cypress/reports/allure-report'

npx cypress run --browser chrome --headed --env tags=@wip
node ./cucumber-html-report.js