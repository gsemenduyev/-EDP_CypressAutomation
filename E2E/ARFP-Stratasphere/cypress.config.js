const { defineConfig } = require("cypress");
const { addCucumberPreprocessorPlugin, afterRunHandler } = require("@badeball/cypress-cucumber-preprocessor");
const browserify = require("@badeball/cypress-cucumber-preprocessor/browserify");
const registerDataSession = require('cypress-data-session/src/plugin')
const allureWriter = require('@shelex/cypress-allure-plugin/writer');
const TestRailReporter = require('cypress-testrail');
const fs = require('fs');
const xlsx = require('node-xlsx').default;
const path = require('path')
const RUN_ENV_FILE_PATH = 'cypress/reports/run-info/run-env.json';
const delay = async (ms) => new Promise((res) => setTimeout(res, ms));
async function setupNodeEvents(cypressOn, config) {
  const on = require('cypress-on-fix')(cypressOn)
  await addCucumberPreprocessorPlugin(on, config, { omitAfterRunHandler: true, });
  on("file:preprocessor", browserify.default(config));
  allureWriter(on, config);
  registerDataSession(on, config);
  new TestRailReporter(on, config).register();

  on('task', {
    parseXlsx({ filePath }) {
      return new Promise((resolve, reject) => {
        try {
          const jsonData = xlsx.parse(fs.readFileSync(filePath));
          resolve(jsonData);
        } catch (e) {
          reject(e)
        }
      })
    }
  });
  on('before:run', () => {
    const currentFolderPath = process.cwd();
    const filePath = 'path.txt';

    fs.writeFile(filePath, currentFolderPath, (err) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log(`Current folder path has been written to ${filePath}`);
    });
  })

  on('after:run', async (results) => {
    try {
      fs.readFileSync(RUN_ENV_FILE_PATH, { encoding: 'utf8', flag: 'r' });
    } catch (error) {
      fs.writeFileSync(RUN_ENV_FILE_PATH,
        JSON.stringify({
          agencyUrl: "-",
          ssphereUrl: "-",
          mailinatorUrl: "-",
          env: "-"
        }))
    }
    const data = fs.readFileSync(RUN_ENV_FILE_PATH, { encoding: 'utf8', flag: 'r' });
    const runInfo = JSON.parse(data);
    if (results) {
      await afterRunHandler(config);
      fs.writeFileSync(
        'cypress/reports/run-info/report-metadata.json',
        JSON.stringify(
          {
            browserName: results.browserName,
            browserVersion: results.browserVersion,
            osName: results.osName,
            osVersion: results.osVersion,
            nodeVersion: results.config.resolvedNodeVersion,
            cypressVersion: results.cypressVersion,
            startedTestsAt: results.startedTestsAt,
            endedTestsAt: results.endedTestsAt,
            env: runInfo['env'],
            agencyUrl: runInfo['agencyUrl'],
            ssphereUrl: runInfo['ssphereUrl'],
            mailinatorUrl: runInfo['mailinatorUrl'],
          },
          null,
          '\t',
        ),
      );
    }
    // Step 1: Read the source JSON file
    const sourceFileName = 'C:\\CypressAutomation\\EDP_CypressAutomation\\E2E\\ARFP-Stratasphere\\cypress\\reports\\cucumber-reports\\results.json';
    const sourceData = JSON.parse(fs.readFileSync(sourceFileName, 'utf-8'));

    // Step 2: Read the destination JSON file (if it exists)
    const destinationFileName = 'C:\\CypressAutomation\\EDP_CypressAutomation\\E2E/ARFP-Stratasphere\\cypress\\reports\\sbms-arfp-stratasphere-report\\sbms-arfp-stratasphere-report.json';
    let destinationData = [];

    if (fs.existsSync(destinationFileName)) {
      destinationData = JSON.parse(fs.readFileSync(destinationFileName, 'utf-8'));


      // Step 3: Append data from the source to the destination
      destinationData = destinationData.concat(sourceData);

      // Step 4: Write the updated data back to the destination JSON file
      fs.writeFileSync(destinationFileName, JSON.stringify(destinationData, null, 2));

      console.log('Data copied and appended successfully.');


    } else {
      console.log('Destination file doesnt exists.');
    }
  });
  return config;
}

module.exports = defineConfig({
  viewportWidth: 1920,
  viewportHeight: 1080,
  defaultCommandTimeout: 60000,
  pageLoadTimeout: 600000,
  screenshotOnRunFailure: true,
  video: true,
  retries: {
    runMode: 0,
    openMode: 0
  },
  env: {
    allure: true,
    allureOmitPreviousAttemptScreenshots: true,
    allureReuseAfterSpec: true,
    allureAddVideoOnPass: true,
    allureResultsPath: "cypress/videos/allure-results",
    //allureResultsPath: "cypress/reports/allure-results",
  },
  projectId: "p6oru5",
  e2e: {
    setupNodeEvents,
    experimentalOriginDependencies: true,
    specPattern: "**/*.feature",
  },
});