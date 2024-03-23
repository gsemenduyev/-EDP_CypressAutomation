#!/usr/bin/env groovy
import groovy.json.*

def REPORT_DIR = 'E2E/ARFP-Stratasphere/cypress/reports';

pipeline {
    agent {
        docker {
            label 'al2'
            image 'cypress/browsers:node18.12.0-chrome107'
            args '--ipc=host'
    }
}

    options{
        ansiColor('xterm')
    }

    stages {

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