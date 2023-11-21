#!/usr/bin/env groovy
import groovy.json.*

    // def strataEBizTeamEmail = "StrataeBusiness@freewheel.com";
    // def qaTeamEmail = "cableqa@freewheel.com";


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
    triggers {
        cron("0 15 * * *")
    }
    stages {
        stage('Config file setup'){
            steps {   
                script {

                    // Copy paste environments.json file from Jenkins to current project
                    // configFileProvider([configFile(fileId: '16d93a3a-a4a4-4764-9cb5-231f80e7261f', variable: 'configFile')]) {
                    //     def fileContent = readFile configFile
                    //     def jsonFileContent = readJSON text: fileContent
                    //     def json = JsonOutput.toJson(jsonFileContent)
                    //     json = JsonOutput.prettyPrint(json)
                    //     writeFile(file: 'E2E/Strata-eBiz/cypress/fixtures/environment/environments.json', text: json)
                    //     }
                    writeFile(file: 'E2E/Strata-eBiz/cypress/fixtures/environment/environments.json', text: read_config_file('16d93a3a-a4a4-4764-9cb5-231f80e7261f'))
                    echo "The first value is: ${read_config_file('16d93a3a-a4a4-4764-9cb5-231f80e7261f').arfpUrlUsernameQa}"
                    // Copy paste Test Rail Credentials from Jenkins to current project
                    withCredentials([[$class: 'UsernamePasswordMultiBinding', credentialsId: 'TestRail_GS', passwordVariable: 'PASSWORD', usernameVariable: 'USERNAME']])  {
                        def domain = "https://testrail-strata.freewheel.tv/testrail/"
                        def username = "${USERNAME}"
                        def password = "${PASSWORD}"
                        def runId = "R5383"
                        def reporterConfig = readJSON file: 'E2E/Strata-eBiz/cypress.env.json'
                        def testrail = [
                            'domain': (domain),
                            'username': (username),
                            'password': (password),
                            'runId': (runId)
                        ]
                        reporterConfig.put("testrail", testrail)
                        def json = JsonOutput.toJson(reporterConfig)
                        json = JsonOutput.prettyPrint(json)
                        writeFile(file: 'E2E/Strata-eBiz/cypress.env.json', text: json)

                       def reporterConfig1 = readJSON file: 'E2E/Strata-eBiz/cypress.env.json'
                        testrail = [
                            'domain': reporterConfig1.testrail.domain,
                            'username': reporterConfig1.testrail.username.values[0],
                            'password': reporterConfig1.testrail.password.values[0],
                            'runId': reporterConfig1.testrail.runId
                        ]
                        reporterConfig.put("testrail", testrail)
                        json = JsonOutput.toJson(reporterConfig)
                        json = JsonOutput.prettyPrint(json)
                        writeFile(file: 'E2E/Strata-eBiz/cypress.env.json', text: json)
                    }
                }
            }
        }
        stage('Test') {
            steps {
            sh "cd E2E/Strata-eBiz && npm cache clean --force && npm ci --prefer-offline && npx cypress run --browser chrome"
            }
        }
    }

    post{
        always{
            script {

                // Teardown cypress.env.json and environments.json files
                def reporterConfig = readJSON file: 'E2E/Strata-eBiz/cypress.env.json'
                def testrail = [
                    'domain': '-',
                    'username': '-',
                    'password': '-',
                    'runId': '-'
                ]
                reporterConfig.put("testrail", testrail)
                def json = JsonOutput.toJson(reporterConfig)
                json = JsonOutput.prettyPrint(json)
                writeFile(file: 'E2E/Strata-eBiz/cypress.env.json', text: json)
                writeFile(file: 'E2E/Strata-eBiz/cypress/fixtures/environment/environments.json', text: json)

                // Copy paste failed scenarios from failed-scenarios-title.txt into email
                def fileContent = readFile(file: 'E2E/Strata-eBiz/cypress/reports/run-info/failed-scenarios-title.txt').trim()
                def lines = fileContent.readLines()
                def formattedContent = '<br><br>' + lines.join('<br>')

                // mail(
                //     subject: "${currentBuild.currentResult}: '${env.JOB_NAME}' (${env.BUILD_NUMBER})",
                //     body: "${currentBuild.currentResult}: Please visit  ${env.BUILD_URL} for further information. ${formattedContent}",
                //     to: qaTeamEmail, 
                //     mimeType: 'text/html'
                // );

                sh "cd E2E/Strata-eBiz && node ./cucumber-html-report.js"
            }
            publishHTML(target : [allowMissing: true,
                alwaysLinkToLastBuild: true,
                keepAll: true,
                reportDir: 'E2E/Strata-eBiz/cypress/reports',
                reportFiles: 'cucumber-reports/cucumber-html-report/index.html',
                reportName: 'Cucumber Report',
                reportTitles: 'Cucumber Report'])
            publishHTML(target : [allowMissing: true,
                alwaysLinkToLastBuild: true,
                keepAll: true,
                reportDir: 'E2E/Strata-eBiz/cypress/reports',
                reportFiles: 'multi-html-report/index.html',
                reportName: 'Multi HTML Report',
                reportTitles: 'Multi HTML Report'])
        }
        failure{
                script {
                    def fileContent = readFile(file: 'E2E/Strata-eBiz/cypress/reports/run-info/failed-scenarios-title.txt').trim()
                    def lines = fileContent.readLines()
                    def formattedContent = '<br><br>' + lines.join('<br>')
                // mail(
                //     subject: "${currentBuild.currentResult}: '${env.JOB_NAME}' (${env.BUILD_NUMBER})",
                //     body: "${currentBuild.currentResult}: Please visit  ${env.BUILD_URL} for further information. ${formattedContent}",
                //     to: strataEBizTeamEmail, 
                //     mimeType: 'text/html'
                // );
            }
        }
    }
}


    def read_config_file(String fileId){
            configFileProvider([configFile(fileId: fileId, variable: 'configFile')]) {
            def fileContent = readFile configFile
            def jsonFileContent = readJSON text: fileContent
            def json = JsonOutput.toJson(jsonFileContent)
            return json = JsonOutput.prettyPrint(json)
            } 
    }