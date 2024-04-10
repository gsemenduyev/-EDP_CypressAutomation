const { defineConfig } = require("cypress");
const { addCucumberPreprocessorPlugin, afterRunHandler } = require("@badeball/cypress-cucumber-preprocessor");
const browserify = require("@badeball/cypress-cucumber-preprocessor/browserify");
const registerDataSession = require('cypress-data-session/src/plugin')
const TestRailReporter = require('cypress-testrail');
const fs = require('fs');
const xlsx = require('node-xlsx').default;
const ENVIRONMENT_FILE_PATH = 'cypress/fixtures/environment/environments.json';

async function setupNodeEvents(cypressOn, config) {
  const on = require('cypress-on-fix')(cypressOn);
  await addCucumberPreprocessorPlugin(on, config, { omitAfterRunHandler: true, });
  on("file:preprocessor", browserify.default(config));
  registerDataSession(on, config);
  new TestRailReporter(on, config).register();

  on('before:spec', () => {
    fs.mkdir('cypress/reports/run-info/', { recursive: true }, (err) => {
      if (err) {
        console.log(err);
      };
    });
  });

  on('task', {
    parseXlsx({ filePath }) {
      return new Promise((resolve, reject) => {
        try {
          const jsonData = xlsx.parse(fs.readFileSync(filePath));
          resolve(jsonData);
        } catch (e) {
          reject(e);
        };
      });
    }
  });

  on('after:run', async (results) => {
    const data = fs.readFileSync(ENVIRONMENT_FILE_PATH, { encoding: 'utf8', flag: 'r' });
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
            arfpUrlQa: runInfo['arfpUrlQa'],
            arfpUrlUat: runInfo['arfpUrlUat'],
            ssphereUrlQa: runInfo['ssphereUrlQa'],
            ssphereUrlUat: runInfo['ssphereUrlUat'],
            sTrafficUrlQa: runInfo['sTrafficUrlQa'],
            sTrafficUrlUat: runInfo['sTrafficUrlUat'],
            trafficUrlQa: runInfo['trafficUrlQa'],
            trafficUrlUat: runInfo['arfpUrlUat'],
            aeInboxUrlQa: runInfo['aeInboxUrlQa'],
            aeInboxUrlUat: runInfo['aeInboxUrlUat'],
            ePortUrlQa: runInfo['ePortUrlQa'],
            ePortUrlUat: runInfo['ePortUrlUat'],
            elevenUrlQa: runInfo['elevenUrlQa'],
            elevenUrlUat: runInfo['elevenUrlQa'],

          },
          null,
          '\t',
        ),
      );
    };
  });
  return config;
}

module.exports = defineConfig({
  viewportWidth: 1920,
  viewportHeight: 1080,
  defaultCommandTimeout: 60000,
  pageLoadTimeout: 60000,
  screenshotOnRunFailure: true,
  video: true,
  retries: {
    runMode: 0,
    openMode: 0
  },
  projectId: "",
  e2e: {
    setupNodeEvents,
    experimentalOriginDependencies: true,
    specPattern: "**/*.feature",
  },
});
