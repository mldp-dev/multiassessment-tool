// config/openaiConfig.ts
import openai, { OpenAI } from 'openai';

// Define the OpenAIConfig interface
interface OpenAIConfig {
    apiInstance: any; // Define apiInstance property
    api_type: string;
    api_base: string;
    api_version: string;
    api_key: string;
    model_id: string; // Add model_id property
}

const API_KEY = 'd439367339084d87b348a72ee88c9950'; // Define API_KEY

// Create an instance of the OpenAI API
const apiInstance = new openai.OpenAI({
    apiKey: API_KEY,
});

// Define model_id
const model_id = 'deploy-gpt-4';

// Construct the openaiConfig object
const openaiConfig: OpenAIConfig = {
    apiInstance, // Assign apiInstance to the config object
    api_type: 'azure',
    api_base: 'https://translate-prod-tcap-openai-001.openai.azure.com/',
    api_version: '2023-09-15-preview',
    api_key: API_KEY,
    model_id: model_id,
};

// Export the openaiConfig object
export { openaiConfig };
