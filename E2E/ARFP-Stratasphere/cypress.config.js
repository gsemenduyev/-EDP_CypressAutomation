

const { defineConfig } = require("cypress");
const { addCucumberPreprocessorPlugin, afterRunHandler } = require("@badeball/cypress-cucumber-preprocessor");
const browserify = require("@badeball/cypress-cucumber-preprocessor/browserify");
const registerDataSession = require('cypress-data-session/src/plugin')
const allureWriter = require('@shelex/cypress-allure-plugin/writer');
const TestRailReporter = require('cypress-testrail');
const fs = require('fs');
const data = fs.readFileSync('cypress/fixtures/environment/temp-env.json', { encoding: 'utf8', flag: 'r' });
const runInfo = JSON.parse(data);

async function setupNodeEvents(on, config) {
  await addCucumberPreprocessorPlugin(on, config, { omitAfterRunHandler: true, });
  on("file:preprocessor", browserify.default(config));
  allureWriter(on, config);
  registerDataSession(on, config);
  new TestRailReporter(on, config).register();
  on('after:run', async (results) => {
    if (results) {
      await afterRunHandler(config);
      fs.writeFileSync(
        'cypress/reports/report-metadata.json',
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
            agencyUrl: runInfo['agencyUrl'],
            ssphereUrl: runInfo['ssphereUrl'],
            mailinatorUrl: runInfo['mailinatorUrl'],
          },
          null,
          '\t',
        ),
      );
    }
  });
  return config;
}

module.exports = defineConfig({
  viewportWidth: 1920,
  viewportHeight: 1080,
  defaultCommandTimeout: 15000,
  pageLoadTimeout: 600000,
  screenshotOnRunFailure: true,
  video: true,
  env: {
    allure: true,
    allureOmitPreviousAttemptScreenshots: true,
    allureReuseAfterSpec: true,
    allureAddVideoOnPass: true,
    allureResultsPath: "cypress/reports/allure-results",
  },
  projectId: "p6oru5",
  e2e: {
    setupNodeEvents,
    experimentalOriginDependencies: true,
    specPattern: "**/*.feature",
  },
});