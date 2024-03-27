#!/usr/bin/env groovy
import groovy.json.*

def CURRENT_PROJECT_PATH = 'E2E/ARFP-Stratasphere';
def PROD_CONFIG_FILE_ID = '1ad0b80a-404d-45ac-81b1-71cd259794d1';
def QA_CONFIG_FILE_ID = '2a6e4dde-90fd-4b33-870c-94e1ac74261e';
def UAT_CONFIG_FILE_ID = '10596465-25c2-4869-93fe-1b8c63a3dec6';
def EMAILS_SLACK_CONTACTS = '72f4f5fc-2d3c-415d-891d-943c990e74a1';
def PROD_CONFIG_FILE_DESTINATION = 'E2E/ARFP-Stratasphere/cypress/fixtures/environment/prod-param.json';
def QA_CONFIG_FILE_DESTINATION = 'E2E/ARFP-Stratasphere/cypress/fixtures/environment/qa-param.json';
def UAT_CONFIG_FILE_DESTINATION = 'E2E/ARFP-Stratasphere/cypress/fixtures/environment/uat-param.json';
def TEST_RAIL_CONFIG_FILE_PATH = 'E2E/ARFP-Stratasphere/cypress.env.json';
def REPORT_DIR = 'E2E/ARFP-Stratasphere/cypress/reports';

pipeline {
    agent {
        docker {
            label 'al2'
            image 'cypress/browsers:node18.12.0-chrome107'
            args '--ipc=host'
    }
}
    parameters{
        choice(name: 'ENVIRONMENT', choices: ['Production', 'QA', 'UAT'], description: "Choose the Environment to run");
        choice(name: 'PROJECTS', choices: ['Stratasphere', 'ARFP', 'WIP'], description: "Choose the Project to run");
        string(name: 'VERSION',defaultValue: 'v 8.4.0',  trim: true, description: "When ARFP project is selected, input Agency RFP version (Production and QA versions may vary)");
    }
    options{
        ansiColor('xterm')
    }
    triggers {
        parameterizedCron('''
            H 21 * * 0 %ENVIRONMENT=QA;PROJECTS=ARFP;VERSION=v 8.4.0
            H 22 * * 0 %ENVIRONMENT=UAT;PROJECTS=ARFP;VERSION=v 8.4.0
            H 23 * * 0 %ENVIRONMENT=Production;PROJECTS=ARFP;VERSION=v 8.4.0
        ''')
    }
    stages {
        stage('Config file setup'){
            steps {
                script {
                        // Copy paste environments.json file from Jenkins to current project
                        inject_config_file(QA_CONFIG_FILE_ID, QA_CONFIG_FILE_DESTINATION);
                        inject_config_file(UAT_CONFIG_FILE_ID, UAT_CONFIG_FILE_DESTINATION);
                        inject_config_file(PROD_CONFIG_FILE_ID, PROD_CONFIG_FILE_DESTINATION);
                  
                        // Copy paste Test Rail Credentials from Jenkins to current project
                        withCredentials([[$class: 'UsernamePasswordMultiBinding', credentialsId: 'TestRail_GS', passwordVariable: 'PASSWORD', usernameVariable: 'USERNAME']])  {
                        def domain = "https://testrail-strata.freewheel.tv/testrail/";
                        def username = "${USERNAME}";
                        def password = "${PASSWORD}";
                        def runId = "R5383";
                        // Update cypress.env.json
                        def reporterConfig = readJSON file: TEST_RAIL_CONFIG_FILE_PATH;
                        def testrail = [
                       'domain': (domain),
                       'username': (username),
                       'password': (password),
                       'runId': (runId)
                        ];
                        reporterConfig.put("testrail", testrail);
                        def json = JsonOutput.toJson(reporterConfig);
                        json = JsonOutput.prettyPrint(json);
                        writeFile(file: TEST_RAIL_CONFIG_FILE_PATH, text: json);

                       def reporterConfig1 = readJSON file: TEST_RAIL_CONFIG_FILE_PATH;
                       testrail = [
                       'domain': reporterConfig1.testrail.domain,
                       'username': reporterConfig1.testrail.username.values[0],
                       'password': reporterConfig1.testrail.password.values[0],
                       'runId': runId
                        ];
                        reporterConfig.put("testrail", testrail);
                        json = JsonOutput.toJson(reporterConfig);
                        json = JsonOutput.prettyPrint(json);
                        writeFile(file: TEST_RAIL_CONFIG_FILE_PATH, text: json);
                    }
                }
            }
        }
        stage('Test') {
            steps {
            sh "cd ${CURRENT_PROJECT_PATH} && npm cache clean --force && npm ci --prefer-offline && npx cypress run --browser chrome --env tags=\"@${PROJECTS}\",ENV=\"${ENVIRONMENT}\",VERSION=\"${VERSION}\"";
            }
        }
    }
    post{
        always{
            script {
                // Config files clean up.
                def reporterConfig = readJSON file: TEST_RAIL_CONFIG_FILE_PATH;
                def testrail = [
                    'domain': '-',
                    'username': '-',
                    'password': '-',
                    'runId': '-'
                        ];
                    reporterConfig.put("testrail", testrail);
                def json = JsonOutput.toJson(reporterConfig);
                    json = JsonOutput.prettyPrint(json);
                    writeFile(file: TEST_RAIL_CONFIG_FILE_PATH, text: json);
                    writeFile(file: QA_CONFIG_FILE_DESTINATION, text: json);
                    writeFile(file: UAT_CONFIG_FILE_DESTINATION, text: json);
                    writeFile(file: PROD_CONFIG_FILE_DESTINATION, text: json);
                mail(
                    subject: "${currentBuild.currentResult} ${params.PROJECTS} run for ${params.ENVIRONMENT}: '${env.JOB_NAME}' (${env.BUILD_NUMBER})",
                    body: "${currentBuild.currentResult} ${params.PROJECTS} run for ${params.ENVIRONMENT}: Please visit  ${env.BUILD_URL} for further information.",
                    to: read_config_file(EMAILS_SLACK_CONTACTS).qaTeamEmail, 
                );
                
                // Sends daily build results to Slack
                def color = 'warning'
                 if (currentBuild.currentResult == "FAILURE") {
                    color = 'danger'
                 } else if (currentBuild.currentResult == "SUCCESS") {
                    color = 'good'
                 }
                def slackChannel = read_config_file(EMAILS_SLACK_CONTACTS).agencyEbizAutobuild;
                slackSend channel: slackChannel, message: "${currentBuild.currentResult} ${params.PROJECTS} run for ${params.ENVIRONMENT} environment: ${env.JOB_NAME} ${env.BUILD_NUMBER} (<${env.BUILD_URL}|Open>)", color: color
                
                sh "cd ${CURRENT_PROJECT_PATH} && node ./cucumber-html-report.js";
            }
            publishHTML (target : [allowMissing: true,
            alwaysLinkToLastBuild: true,
            keepAll: true,
            reportDir: REPORT_DIR,
            reportFiles: 'cucumber-reports/cucumber-html-report/index.html',
            reportName: 'Cucumber Report',
            reportTitles: 'Cucumber Report']);
            publishHTML (target : [allowMissing: true,
            alwaysLinkToLastBuild: true,
            keepAll: true,
            reportDir: REPORT_DIR,
            reportFiles: 'multi-html-report/index.html',
            reportName: 'Multi HTML Report',
            reportTitles: 'Multi HTML Report']);
        }
    }
}

    /*
      Reads the Jenkins config file
      [@param] configFileId: accepts Jenkins config file unique ID
      [@return] values of Jenkins config file
     */ 
    def read_config_file(String configFileId){
        configFileProvider([configFile(fileId: configFileId, variable: 'configFile')]) {
            def fileContent = readFile configFile;
            def jsonFileContent = readJSON text: fileContent;
            return jsonFileContent;
        } 
    }

     /*
      Copies the Jenkins configuration file and adds it to the current project
      [@param] configFileId: accepts Jenkins config file unique ID
      [@param] destinationFilePath: destination file path
     */ 
    def inject_config_file(String configFileId, String destinationFilePath){    
        configFileProvider([configFile(fileId: configFileId, variable: 'configFile')]) {
            def fileContent = readFile configFile;
            def jsonFileContent = readJSON text: fileContent;
            def json = JsonOutput.toJson(jsonFileContent);
            json = JsonOutput.prettyPrint(json);
            writeFile(file: destinationFilePath, text: json);
        }
    } 