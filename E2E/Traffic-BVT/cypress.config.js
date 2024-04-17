const { defineConfig } = require("cypress");
const { addCucumberPreprocessorPlugin, afterRunHandler } = require("@badeball/cypress-cucumber-preprocessor");
const browserify = require("@badeball/cypress-cucumber-preprocessor/browserify");
const registerDataSession = require('cypress-data-session/src/plugin')
const TestRailReporter = require('cypress-testrail');
const fs = require('fs');
const xlsx = require('node-xlsx').default;
const ENVIRONMENT_FILE_PATH = 'cypress/reports/run-info/run-env.json';
async function setupNodeEvents(cypressOn, config) {
  const on = require('cypress-on-fix')(cypressOn);
  await addCucumberPreprocessorPlugin(on, config, { omitAfterRunHandler: true, });
  on("file:preprocessor", browserify.default(config));
  registerDataSession(on, config);
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
        phone: "phone",
        vendor: "vendor",
        password: "password"
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
    },

    retrieveTabs() {
      return new Promise((resolve, reject) => {
        const tabs = [];
        cy.visit('/', {
          onBeforeLoad(win) {
            const openTabs = win.document.querySelectorAll('iframe');

            openTabs.forEach((tab) => {
              tabs.push({
                id: tab.id,
                url: tab.src
              });
            });

            resolve(tabs);
          }
        });
      });
    },

    log(message) {
      console.log(message)

      return null
    },

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
            arfpUrlQa: trafficUrl['trafficUrl'],
            arfpUrlUat: env['env'],
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
