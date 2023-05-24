const report = require('multiple-cucumber-html-reporter');

report.generate({
	jsonDir: './cypress/CucumberReports',
	reportPath: 'cypress/CucumberReports/cucumber-htmlreport.html',
	metadata:{
        browser: {
            name: 'chrome',
            version: '100'
        },
        device: 'Local test machine',
        platform: {
            name: 'ubuntu',
            version: '16.04'
        }
    },
    customData: {
        title: 'Run info',
        data: [
            {label: 'Project', value: 'Stratasphere'},
            {label: 'Release', value: 'v 8.3.6.60524'},
            {label: 'Cycle', value: 'B11221.34321'},
            {label: 'Execution Start Time', value: '5/11/2023'},
            {label: 'Execution End Time', value: '5/11/2023'}
        ]
    }
});