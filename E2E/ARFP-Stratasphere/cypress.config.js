const { defineConfig } = require("cypress");
const { addCucumberPreprocessorPlugin, afterRunHandler } = require("@badeball/cypress-cucumber-preprocessor");
const browserify = require("@badeball/cypress-cucumber-preprocessor/browserify");
const registerDataSession = require('cypress-data-session/src/plugin')
const allureWriter = require('@shelex/cypress-allure-plugin/writer');
const TestRailReporter = require('cypress-testrail');
const gmailTester = require("gmail-tester");
const path = require("path");
const fs = require('fs');
const xlsx = require('node-xlsx').default;
const RUN_ENV_FILE_PATH = 'cypress/reports/run-info/run-env.json';
const delay = async (ms) => new Promise((res) => setTimeout(res, ms));
const gmail = require("gmail-tester-extended");
require('dotenv').config()
async function setupNodeEvents(cypressOn, config) {
  const on = require('cypress-on-fix')(cypressOn)
  await addCucumberPreprocessorPlugin(on, config, { omitAfterRunHandler: true, });
  on("file:preprocessor", browserify.default(config));
  allureWriter(on, config);
  registerDataSession(on, config);
  new TestRailReporter(on, config).register();

  on('before:browser:launch', () => {
    gmailTester.refresh_access_token(
      'cypress/fixtures/gmail-data/client-secrets/qa-environment/credentials-ssphere.sellerqa.json',
      'cypress/fixtures/gmail-data/client-secrets/qa-environment/token-cypress-exampel.json'
    )
  });

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
    },

  });


  on("task", {
    "gmail:get-all-emails": async (args) => {
      const credentialsPath = args.credentials;
      const tokenPath = args.token;
      const messages = await gmail.get_all_emails(credentialsPath, tokenPath, args.options);
      return messages;
    },
  });

  on("task", {
    "gmail:get-messages": async (args) => {
      const credentialsPath = args.credentials;
      const tokenPath = args.token;
      const messages = await gmail.get_messages(credentialsPath, tokenPath, args.options);
      return messages;
    },
  });

  on("task", {
    "gmail:check-inbox": async (args) => {
      const credentialsPath = args.credentials;
      const tokenPath = args.token;
      const subject = args.subject;
      const from = args.from;
      const to = args.to;
      const wait_time_sec = args.wait_time_sec;
      const max_wait_time_sec = args.max_wait_time_sec;
      const messages = await gmail.check_inbox(
        credentialsPath,
        tokenPath,
        subject,
        from,
        to,
        wait_time_sec,
        max_wait_time_sec,
        args.options
      );
      return messages;
    },
  });


  // on("task", {
  //   "gmail:get-messages": async (args) => {

  //     const messages = await gmail.get_messages(
  //       path.resolve(__dirname, "cypress/plugins/credentials-ssphere.sellerqa.json"),
  //       path.resolve(__dirname, "cypress/plugins/token-cypress-exampel.json"),
  //       args.options
  //     );
  //     // const messages = await gmailTester.get_messages(
  //     //   path.resolve(__dirname, "cypress/plugins/credentials-ssphere.sellerqa.json"),
  //     //   path.resolve(__dirname, "cypress/plugins/token-cypress-exampel.json"),
  //     //   args.options
  //     // );
  //     return messages;
  //   },
  // });


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
    chromeWebSecurity: false,
    specPattern: "**/*.feature",
  },
});