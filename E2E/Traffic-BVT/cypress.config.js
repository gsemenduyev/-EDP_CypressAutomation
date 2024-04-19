const { defineConfig } = require("cypress");
const { addCucumberPreprocessorPlugin, afterRunHandler } = require("@badeball/cypress-cucumber-preprocessor");
const browserify = require("@badeball/cypress-cucumber-preprocessor/browserify");
const TestRailReporter = require('cypress-testrail');
const fs = require('fs');
const ENVIRONMENT_FILE_PATH = 'cypress/reports/run-info/run-env.json';
async function setupNodeEvents(cypressOn, config) {
  const on = require('cypress-on-fix')(cypressOn);
  await addCucumberPreprocessorPlugin(on, config, { omitAfterRunHandler: true, });
  on("file:preprocessor", browserify.default(config));
  new TestRailReporter(on, config).register();

  // Creates new user json file.
  on('before:browser:launch', () => {
    if (!fs.existsSync('cypress/fixtures/new-user/new-user-param.json')) {
      console.log("Doesn't exists new-user-param.json ")
      fs.mkdir('cypress/fixtures/new-user/', { recursive: true }, (err) => {
        if (err) {
          console.log(err);
        };
      });
      const data = {
        email: "email",
        firstName: "firstName",
        lastName: "lastName",
        phoneNumber: "phone",
        vendor: "vendor",
        password: "password",
        jobTitle: "title"
      };
      const jsonContent = JSON.stringify(data);
      fs.writeFileSync('cypress/fixtures/new-user/new-user-param.json', jsonContent);
    }

  });

  on('before:spec', () => {
    fs.mkdir('cypress/reports/run-info/', { recursive: true }, (err) => {
      if (err) {
        console.log(err);
      };
    });
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
            trafficUrl: runInfo['trafficUrl'],
            sTrafficUrl: runInfo['sTrafficUrl'],
            env: runInfo['env'],
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
  pageLoadTimeout: 90000,
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
