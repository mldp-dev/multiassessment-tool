import axios from 'axios';
import { generatePrompt } from '../config/openaiConfig';

const AZURE_API_URL = 'https://YOUR_AZURE_REGION.api.cognitive.microsoft.com/';

export const evaluateTypographicalErrors = async (phrase: string): Promise<string> => {
    try {
        const prompt = generatePrompt(phrase);

        const response = await axios.post(`${AZURE_API_URL}/openai/deployments/deploy-gpt-4/chat/completions?api-version=2023-12-01-preview`, {
            prompt: prompt
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Ocp-Apim-Subscription-Key': 'YOUR_AZURE_API_KEY' // Replace with your Azure OpenAI API key
            }
        });

        const translatedText = response.data.choices[0].message.content.trim();

        let points: string;

        if (translatedText.toLowerCase() === phrase.toLowerCase()) {
            points = "0 Points: Have both typographical and spelling errors";
        } else if (translatedText === phrase) {
            points = "1 Point: Have at least one typographical or spelling error";
        } else {
            points = "2 Points: No typographical and spelling errors";
        }

        return points;
    } catch (error) {
        console.error("Error evaluating typographical errors:", error);
        throw error;
    }
};
