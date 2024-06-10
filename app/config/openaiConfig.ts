import openai, { OpenAI } from 'openai';

interface OpenAIConfig extends OpenAI {
    api_type: string;
    api_base: string;
    api_version: string;
    api_key: string;
}

const API_KEY = 'd439367339084d87b348a72ee88c9950';
const MODEL_ID = 'deploy-gpt-4';

const openaiConfig: OpenAIConfig = openai as unknown as OpenAIConfig;

openaiConfig.api_type = 'azure';
openaiConfig.api_base = 'https://translate-prod-tcap-openai-001.openai.azure.com/';
openaiConfig.api_version = '2023-09-15-preview';
openaiConfig.api_key = API_KEY;

const generatePrompt = (phrase: string) => {
    return [
        { role: 'system', content: 'Check if there\'s typographical error. Count the correct words and incorrect words. Get the percentage of correct words.' },
        { role: 'user', content: phrase }
    ];
};

export { openaiConfig, MODEL_ID, API_KEY, openai, generatePrompt };
