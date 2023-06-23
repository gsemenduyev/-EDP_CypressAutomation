const report = require('multiple-cucumber-html-reporter');
const dayjs = require('dayjs');
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
      { label: 'Environment', value: runInfo['env'] },
      { label: 'Agency RFP URL', value: runInfo['agencyUrl'] },
      { label: 'Stratasphere URL', value: runInfo['ssphereUrl'] },
      { label: 'Seller Email URL', value: runInfo['mailinatorUrl'] },
      { label: 'Release', value: '1.0.0' },
      { label: 'Cypress Version', value: runInfo['cypressVersion'] },
      { label: 'Node Version', value: runInfo['nodeVersion'] },
      {
        label: 'Execution Start Time',
        value: dayjs(runInfo['startedTestsAt']).format('YYYY-MM-DD HH:mm:ss.SSS'),
      },
      {
        label: 'Execution End Time',
        value: dayjs(runInfo['endedTestsAt']).format('YYYY-MM-DD HH:mm:ss.SSS'),
      },
    ],
  },
  disableLog: true,
  pageTitle: 'Cypress Cucumber Html Report',
  displayDuration: true,
});