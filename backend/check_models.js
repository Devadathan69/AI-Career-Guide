const dotenv = require("dotenv");
dotenv.config();

const apiKey = process.env.GEMINI_API_KEY;

async function listModels() {
    if (!apiKey) {
        console.error("Error: GEMINI_API_KEY is missing from .env");
        return;
    }

    try {
        console.log("Fetching available models...");
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);

        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        if (data.models) {
            console.log("\n--- Available GenerateContent Models ---");
            const generateModels = data.models.filter(m => m.supportedGenerationMethods.includes("generateContent"));
            generateModels.forEach(m => {
                console.log(`- ${m.name.replace('models/', '')} (${m.displayName})`);
            });
        } else {
            console.log("No models found in response:", data);
        }
    } catch (error) {
        console.error("Error listing models:", error);
    }
}

listModels();
