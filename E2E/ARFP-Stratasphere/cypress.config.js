const { defineConfig } = require("cypress");
const { addCucumberPreprocessorPlugin, afterRunHandler } = require("@badeball/cypress-cucumber-preprocessor");
const browserify = require("@badeball/cypress-cucumber-preprocessor/browserify");
const registerDataSession = require('cypress-data-session/src/plugin');
const allureWriter = require('@shelex/cypress-allure-plugin/writer');
const TestRailReporter = require('cypress-testrail');
const gmailTester = require("gmail-tester");
const path = require("path");
const fs = require('fs');
const xlsx = require('node-xlsx').default;
const RUN_ENV_FILE_PATH = 'cypress/reports/run-info/run-env.json';
const delay = async (ms) => new Promise((res) => setTimeout(res, ms));
const gmail = require("gmail-tester-extended");
require('dotenv').config();

async function setupNodeEvents(cypressOn, config) {
  const on = require('cypress-on-fix')(cypressOn);
  await addCucumberPreprocessorPlugin(on, config, { omitAfterRunHandler: true });
  on("file:preprocessor", browserify.default(config));
  allureWriter(on, config);
  registerDataSession(on, config);
  new TestRailReporter(on, config).register();

  let refreshAccessToken = true;
  on('before:browser:launch', async () => {
    // This If block creates cypress\fixtures\agencyRFP\new-frp-name.json file before:browser:launch 
    if (!fs.existsSync(config.env.NEW_RFP_NAME_PATH)) {
      fs.writeFileSync(config.env.NEW_RFP_NAME_PATH, '[]');
    }

    /*
       This if block calls functions to refresh the Gmail token and save unique dates.
       Currently, we are not able to delete Gmail emails through the API, so
       we are using unique Gmail dates to identify new emails in the Gmail Inbox.
    */
    if (refreshAccessToken) {
      try {
        if (config.env.ENV === 'Production') {
          await refreshGmailTokenSaveUniqDates(
            config.env.ARFP_PROD.CREDENTIALS_FILE,
            config.env.ARFP_PROD.TOKEN_FILE,
            config.env.SSPHERE_PROD.CREDENTIALS_FILE,
            config.env.SSPHERE_PROD.TOKEN_FILE,
            config.env.ARFP_GMAIL_DATES,
            config.env.SSPHERE_GMAIL_DATES
          );
        } else if (config.env.ENV === 'UAT') {
          await refreshGmailTokenSaveUniqDates(
            config.env.ARFP_UAT.CREDENTIALS_FILE,
            config.env.ARFP_UAT.TOKEN_FILE,
            config.env.SSPHERE_UAT.CREDENTIALS_FILE,
            config.env.SSPHERE_UAT.TOKEN_FILE,
            config.env.ARFP_GMAIL_DATES,
            config.env.SSPHERE_GMAIL_DATES
          );
        } else {
          await refreshGmailTokenSaveUniqDates(
            config.env.ARFP_QA.CREDENTIALS_FILE,
            config.env.ARFP_QA.TOKEN_FILE,
            config.env.SSPHERE_QA.CREDENTIALS_FILE,
            config.env.SSPHERE_QA.TOKEN_FILE,
            config.env.ARFP_GMAIL_DATES,
            config.env.SSPHERE_GMAIL_DATES
          );
        }
      } catch (error) {
        console.error('Error refreshing Gmail token and saving unique dates:', error);
        throw error;
      }
      refreshAccessToken = false;
    }
  });

  on('task', {
    parseXlsx({ filePath }) {
      return new Promise((resolve, reject) => {
        try {
          const jsonData = xlsx.parse(fs.readFileSync(filePath));
          resolve(jsonData);
        } catch (e) {
          reject(e);
        }
      });
    },

    // Checks Gmail inbox and returns all emails
    "gmail:get-messages": async (args) => {
      const credentialsPath = args.credentials;
      const tokenPath = args.token;
      const messages = await gmail.get_messages(credentialsPath, tokenPath, args.options);
      return messages;
    },
  });

  // Saves run info into cypress/reports/run-info/run-env.json later it's used for HTML reports
  on('after:run', async (results) => {
    try {
      fs.readFileSync(RUN_ENV_FILE_PATH, { encoding: 'utf8', flag: 'r' });
    } catch (error) {
      fs.writeFileSync(RUN_ENV_FILE_PATH, JSON.stringify({
        agencyUrl: "-",
        ssphereUrl: "-",
        mailinatorUrl: "-",
        env: "-"
      }));
    }
    const data = fs.readFileSync(RUN_ENV_FILE_PATH, { encoding: 'utf8', flag: 'r' });
    const runInfo = JSON.parse(data);
    if (results) {
      await afterRunHandler(config);
      fs.writeFileSync(
        'cypress/reports/run-info/report-metadata.json',
        JSON.stringify({
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
        }, null, '\t')
      );
    }
  });
  return config;
}

/*
Saves unique dates.
Currently, we are not able to delete Gmail emails through the API, so
we are using unique Gmail dates to identify new emails in the Gmail Inbox.
*/
async function saveGmailUniqDates(credentialsPath, tokenPath, dateFilePath) {
  const gmailInfoFilePath = path.dirname(dateFilePath);
  if (!fs.existsSync(gmailInfoFilePath)) {
    fs.mkdirSync(gmailInfoFilePath);
  }
  fs.writeFileSync(dateFilePath, '{}');
  let data;
  try {
    data = JSON.parse(fs.readFileSync(dateFilePath, 'utf8'));
  } catch (err) {
    console.error('Error reading file:', err);
    data = { uniqDatesList: [] };
  }

  const dateList = data.uniqDatesList || [];
  try {
    const $emails = await gmail.get_messages(credentialsPath, tokenPath);
    if ($emails && $emails.length > 0) {
      $emails.forEach(($email) => {
        dateList.push($email.date);
      });
      fs.writeFileSync(dateFilePath, JSON.stringify({ uniqDatesList: dateList }, null, 2));
    } else if ($emails.length < 1) {
      dateList.push("Gmail inbox is empty");
      fs.writeFileSync(dateFilePath, JSON.stringify({ uniqDatesList: dateList }, null, 2));
    }
    return dateList;
  } catch (err_1) {
    console.error('Error getting messages or saving unique dates:', err_1);
    throw err_1;
  }
}

/*
Refreshes the Gmail token and saves unique dates.
Currently, we are not able to delete Gmail emails through the API, so
we are using unique Gmail dates to identify new emails in the Gmail Inbox.
*/

async function refreshGmailTokenSaveUniqDates(
  arfpCredentialsFile,
  arfpTokenFile,
  ssphereCredentialsFile,
  ssphereTokenFile,
  arfpDateFile,
  ssphereDateFile
) {
  try {
    const arfpTokenPromise = gmailTester.refresh_access_token(arfpCredentialsFile, arfpTokenFile);
    const ssphereTokenPromise = gmailTester.refresh_access_token(ssphereCredentialsFile, ssphereTokenFile);
    const arfpDatePromise = saveGmailUniqDates(arfpCredentialsFile, arfpTokenFile, "cypress/fixtures/" + arfpDateFile);
    const ssphereDatePromise = saveGmailUniqDates(ssphereCredentialsFile, ssphereTokenFile, "cypress/fixtures/" + ssphereDateFile);
    await Promise.all([arfpTokenPromise, ssphereTokenPromise, arfpDatePromise, ssphereDatePromise]);
  } catch (error) {
    console.error('Error during Gmail token refresh and unique date save:', error);
    throw error;
  }
}

module.exports = defineConfig({
  viewportWidth: 1920,
  viewportHeight: 1080,
  defaultCommandTimeout: 120000,
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
    GMAIL_HTML_PATH: "cypress/fixtures/gmail-data/gmail-info/gmail-body.html",
    GMAIL_TXT_PATH: "cypress/fixtures/gmail-data/gmail-info/gmail-body.txt",
    GMAIL_HTML_UPDATED_PATH: "cypress/fixtures/gmail-data/gmail-info/gmail-body-updated.html",
    ARFP_GMAIL_DATES: "gmail-data/gmail-info/arfp-emails-dates.json",
    SSPHERE_GMAIL_DATES: "gmail-data/gmail-info/ssphere-emails-dates.json",
    NEW_RFP_NAME_PATH: "cypress/fixtures/agencyRFP/new-frp-name.json",
    ARFP_PROD: {
      CREDENTIALS_FILE: "cypress/fixtures/gmail-data/client-secrets/prod-environment/credentials-arfp.testprod.json",
      TOKEN_FILE: "cypress/fixtures/gmail-data/client-secrets/prod-environment/token-arfp.testprod.json",
    },
    SSPHERE_PROD: {
      CREDENTIALS_FILE: "cypress/fixtures/gmail-data/client-secrets/prod-environment/credentials-ssphere.testprod.json",
      TOKEN_FILE: "cypress/fixtures/gmail-data/client-secrets/prod-environment/token-ssphere.testprod.json"
    },
    ARFP_UAT: {
      CREDENTIALS_FILE: "cypress/fixtures/gmail-data/client-secrets/uat-environment/credentials-arfp.testuat.json",
      TOKEN_FILE: "cypress/fixtures/gmail-data/client-secrets/uat-environment/token-arfp.testuat.json"
    },
    SSPHERE_UAT: {
      CREDENTIALS_FILE: "cypress/fixtures/gmail-data/client-secrets/uat-environment/credentials-ssphere.testuat.json",
      TOKEN_FILE: "cypress/fixtures/gmail-data/client-secrets/uat-environment/token-ssphere.testuat.json"
    },
    ARFP_QA: {
      CREDENTIALS_FILE: "cypress/fixtures/gmail-data/client-secrets/qa-environment/credentials-arfp.testqa.json",
      TOKEN_FILE: "cypress/fixtures/gmail-data/client-secrets/qa-environment/token-arfp.testqa.json"
    },
    SSPHERE_QA: {
      CREDENTIALS_FILE: "cypress/fixtures/gmail-data/client-secrets/qa-environment/credentials-ssphere.testqa.json",
      TOKEN_FILE: "cypress/fixtures/gmail-data/client-secrets/qa-environment/token-ssphere.testqa.json"
    }
  },
  projectId: "p6oru5",
  e2e: {
    setupNodeEvents,
    experimentalOriginDependencies: true,
    chromeWebSecurity: false,
    specPattern: "**/*.feature",
  },
});