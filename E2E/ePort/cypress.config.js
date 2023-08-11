
const { defineConfig } = require("cypress");
const preprocessor = require("@badeball/cypress-cucumber-preprocessor");
const browserify = require("@badeball/cypress-cucumber-preprocessor/browserify");
const browserify = require('@cypress/browserify-preprocessor');
const registerDataSession = require('cypress-data-session/src/plugin');
async function setupNodeEvents(on, config) {
  await preprocessor.addCucumberPreprocessorPlugin(on, config);
  on("file:preprocessor", browserify.default(config));
  registerDataSession(on, config)

  return config;
}

module.exports = defineConfig({
  viewportWidth: 1920,
  viewportHeight: 1080,
  defaultCommandTimeout: 15000,
  pageLoadTimeout: 300000,

  env: {
    // PROD 
    eportUrl: "https://eport.gotostrata.com/login",
    eportUsername: "admin",
    ePortPassword: "abc123!",

    SBMS: "C:/FWA/SBMS/SBMS.exe",
   SBMSUsername: "admin",

    ElevenUrl: "https://Eleven.gotostrata.com",
    agencyPassword: "kvelvadapu",
    sspherePassword: "abc123!"
  },

  retries: {
    runMode: 1,

  },
  

  e2e: {
    setupNodeEvents,
    specPattern: "**/*.feature",
    //specPattern: 'cypress/integration/examples/*.js'
  },
});