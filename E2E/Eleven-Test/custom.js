const fs = require('fs');

// Read the existing results.json file
const results = JSON.parse(fs.readFileSync('cypress/reports/cucumber-reports/results.json'));

// Iterate over the test steps and add the PNG image embeddings
results[0].elements.forEach((element) => {
    element.steps.forEach((step) => {

        const pngFilePath = `cypress/integration/picture/abc.png`; // Adjust the path to your PNG files

        if (fs.existsSync(pngFilePath)) {
            const base64Data = fs.readFileSync(pngFilePath, 'base64');
            console.log(base64Data)
            const embedding = {
                name: 'Screenshot',
                mime_type: 'image/png',
                data: `${base64Data}`,
            };

            step.embeddings = step.embeddings || [];
            step.embeddings.push(embedding);


        }
    });
});

// Write the updated results.json file
fs.writeFileSync('cypress/reports/cucumber-reports/results.json', JSON.stringify(results));

