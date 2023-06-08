
const { defineConfig } = require("cypress");
const preprocessor = require("@badeball/cypress-cucumber-preprocessor");
const browserify = require("@badeball/cypress-cucumber-preprocessor/browserify");
const registerDataSession = require('cypress-data-session/src/plugin')
const allureWriter = require('@shelex/cypress-allure-plugin/writer');

async function setupNodeEvents(on, config) {
  await preprocessor.addCucumberPreprocessorPlugin(on, config);
  on("file:preprocessor", browserify.default(config));
  allureWriter(on, config);
  registerDataSession(on, config);
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
    
    // PROD 
    // agencyUrl: "https://2wayrfp.gotostrata.com/RFP/login",
    // agencyUsername: "agency.one@mail.com",
    // ssphereUrl: "https://stratasphere.media/ui_new/#/",
    // ssphereUsername: "nsingh@mailinator.com",

    agencyUrl: "https://2wayrfpqa.pregotostrata.com/RFP",
    agencyUsername: "agency.three@mail.com",
    ssphereUrl: "https://ssphereqa.pregotostrata.com/ui_new#/",
    ssphereUsername: "laseller2@mailinator.com",

    mailinatorUrl: "https://www.mailinator.com/v4/public/inboxes.jsp?to=laseller2",
    agencyPassword: "Password01!",
    sspherePassword: "abc123!"
  },

  retries: {
    runMode: 1,
  },
  projectId: "p6oru5",
  
  e2e: {
    setupNodeEvents,
    experimentalOriginDependencies: true,
    specPattern: "**/*.feature",
  },
});