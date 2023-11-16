const report = require('multiple-cucumber-html-reporter');

var dayjs = require("dayjs")
var utc = require("dayjs/plugin/utc")
var timezone = require("dayjs/plugin/timezone")
var advanced = require("dayjs/plugin/advancedFormat")

dayjs.extend(timezone)
dayjs.extend(utc)
dayjs.extend(advanced)

const fs = require('fs');
const data = fs.readFileSync('cypress/reports/run-info/report-metadata.json', { encoding: 'utf8', flag: 'r' });
const runInfo = JSON.parse(data);

const osName = () => {
  switch (runInfo['osName']) {
    case 'darwin':
      return 'osx';
    case 'win32':
      return 'windows';
    case 'ubuntu':
      return 'ubuntu';
    case 'linux':
      return 'linux';
    default:
      console.log('Undefined browser');
  }
};

report.generate({
  jsonDir: './cypress/reports/cucumber-reports/',
  reportPath: 'cypress/reports/multi-html-report',
  metadata: {
    browser: {
      name: runInfo['browserName'],
      version: runInfo['browserVersion'],
    },
    device: 'Local Test Machine',
    platform: {
      name: osName(),
      version: runInfo['osVersion'],
    },
  },
  customData: {
    title: 'Run Info',
    data: [
      { label: 'ARFP QA Environment', value: runInfo['arfpUrlQa'] },
      { label: 'ARFP UAT Environment', value: runInfo['arfpUrlUat'] },
      { label: 'Stratasphere QA Environment', value: runInfo['ssphereUrlQa'] },
      { label: 'Stratasphere UAT Environment', value: runInfo['ssphereUrlUat'] },
      { label: 'sTraffic QA Environment', value: runInfo['sTrafficUrlQa'] },
      {
        label: 'Execution Start Time',
        value: dayjs(runInfo['startedTestsAt']).tz('America/Chicago').format('YYYY-MM-DD HH:mm:ss'),
      },
      {
        label: 'Execution End Time',
        value: dayjs(runInfo['endedTestsAt']).tz('America/Chicago').format('YYYY-MM-DD HH:mm:ss'),
      },
    ],
  },
  disableLog: true,
  pageTitle: 'Cypress Cucumber Html Report',
  displayDuration: true,
});