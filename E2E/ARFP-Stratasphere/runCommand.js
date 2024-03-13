const { exec } = require('child_process');
const commands = [
    'cd C:\\CypressAutomation\\EDP_CypressAutomation\\E2E\\SBMS',
    'call mvn clean test -Dcucumber.options="--tags @wip"',
    'echo Command 3'
];

// Execute each command in a loop
commands.forEach((command) => {
    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error executing command: ${error.message}`);
            return;
        }
        if (stderr) {
            console.error(`Command stderr: ${stderr}`);
            return;
        }
        console.log(`Command output:\n${stdout}`);
    });
});