#!/usr/bin/env groovy
import groovy.json.*
pipeline {
    agent {
        label 'testexecute'
    }
    stages {
        stage('Git'){
		    steps {
		    	git branch: 'TC_Integration',
		    	credentialsId: '22',
			    url: 'https://github.freewheel.tv/HS/EDP_CypressAutomation.git'
			}
        }
        
         stage('Set up settion') {
            steps {
                script{
                withCredentials([usernameColonPassword(credentialsId: 'MasTEUser', variable: 'Password1')]) {
                testcompletetest actionOnWarnings: 'MAKE_UNSTABLE', 
                credentialsId: "${Password1}", 
                executorType: 'TE', 
                executorVersion: '15.0', 
                generateMHT: true, 
                launchType: 'lcKdt', 
                project: 'SBMS', 
                publishJUnitReports: false, 
                suite: 'E2E\\SBMS\\SBMS.pjs', 
                test: 'OpenSBMS', 
                useTCService: true,
                useActiveSession: true
            }
        }    
   }
       
         }

    }
}