const fs = require('fs');

// Read the existing results.json file
const results = JSON.parse(fs.readFileSync('cypress/reports/cucumber-reports/results.json'));

// Find the scenario and step by name
const scenarioName = "Create SBMS Radio estimate, send it to Eleven";
const stepName = "Create Radio estimate and Send to Eleven";

const scenario = results[0].elements.find((element) => element.name === scenarioName);

if (scenario) {
    const step = scenario.steps.find((step) => step.name === stepName);

    if (step) {
        const pngFilePath = 'cypress/integration/picture/abc.png'; // Adjust the path to your PNG file

        if (fs.existsSync(pngFilePath)) {
            const base64Data = fs.readFileSync(pngFilePath, 'base64');
            const embedding = {
                name: 'Screenshot',
                mime_type: 'image/png',
                data: base64Data
            };

            step.embeddings = step.embeddings || [];
            step.embeddings.push(embedding);

            console.log(`Added image embedding to step: ${stepName}`);
        } else {
            console.log(`PNG file not found at path: ${pngFilePath}`);
        }
    } else {
        console.log(`Step not found: ${stepName}`);
    }
} else {
    console.log(`Scenario not found: ${scenarioName}`);
}

// Write the updated results.json file
fs.writeFileSync('cypress/reports/cucumber-reports/results.json', JSON.stringify(results));