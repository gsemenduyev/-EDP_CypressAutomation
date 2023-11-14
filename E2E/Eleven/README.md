NODE.js
JAVA >= 8 

cd E2E/Eleven

npm install
npm update

npx cypress open --env ENV="QA"
npx cypress open --env ENV="UAT"
npx cypress open --env ENV="Production"

npx cypress run --browser chrome --headed --env tags="",ENV="QA"

npm test
npm run test-Eleven

node ./cucumber-html-report.js


