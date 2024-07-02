const { defineConfig } = require("cypress");
const { addCucumberPreprocessorPlugin, afterRunHandler } = require("@badeball/cypress-cucumber-preprocessor");
const browserify = require("@badeball/cypress-cucumber-preprocessor/browserify");
const registerDataSession = require('cypress-data-session/src/plugin')
const fs = require('fs');
const path = require('path');
// Setup Node Events
async function setupNodeEvents(on, config) {
  await addCucumberPreprocessorPlugin(on, config, { omitAfterRunHandler: true, });
  on("file:preprocessor", browserify.default(config));
  registerDataSession(on, config);

  // Sets up environment variable
  const currentPath = process.cwd();
  config.env.REPO_PATH = path.dirname(currentPath);

  // on('task', {
  //   getRepositoryPath() {
  //     const currentPath = process.cwd();
  //     const repositoryPath = path.dirname(currentPath);
  //     return repositoryPath;
  //   }
  // });

  on('after:run', async (results) => {
    const envParamProd = 'cypress/fixtures/environment/prod-param.json';
    const envParamQa = 'cypress/fixtures/environment/qa-param.json';
    const metaDataFilePath = 'cypress/reports/run-info/report-metadata.json';
    const metaDataDirPathFilePath = path.dirname(metaDataFilePath);

    let envFilePath;

    if (config.env.ENV === 'Production') {
      envFilePath = envParamProd;
    } else {
      envFilePath = envParamQa;
    }

    fs.access(envFilePath, fs.constants.F_OK, (err) => {
      if (err) {
        throw new Error(`File does not exist: ${envFilePath}. Follow the project installation instructions in the README.md file`);
      }
    });

    // Creates report metadata json file
    if (!fs.existsSync(metaDataFilePath)) {
      if (!fs.existsSync(metaDataDirPathFilePath)) {
        fs.mkdirSync(metaDataDirPathFilePath, { recursive: true });
      }
      fs.writeFileSync(metaDataFilePath, '', 'utf8');
      console.log(`File and directory created: ${metaDataFilePath}`);
    } else {
      fs.writeFileSync(metaDataFilePath, '', 'utf8');
    }


    const data = fs.readFileSync(envFilePath, { encoding: 'utf8', flag: 'r' });
    const runInfo = JSON.parse(data);
    if (results) {
      await afterRunHandler(config);
      fs.writeFileSync(
        metaDataFilePath,
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
          },
          null,
          '\t',
        ),
      );
    }
  });
  return config;
};

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
  e2e: {
    setupNodeEvents,
    experimentalOriginDependencies: true,
    chromeWebSecurity: false,
    specPattern: "**/*.feature",
  },
});