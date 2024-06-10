// utils/typographicalUtils.ts
import { openaiConfig } from '../config/openaiConfig';

export async function evaluateTypographicalErrors(phrase: string): Promise<string> {
    try {
        if (!openaiConfig.apiInstance) {
            throw new Error("API instance is not available in openaiConfig");
        }

        // Send the phrase for translation using the correct method or property
        const response = await openaiConfig.apiInstance.completions.create({
            // Adjust parameters as needed based on your client library's requirements
            engine: openaiConfig.model_id, // Use the model_id from the config
            prompt: phrase,
            // Add any additional parameters as needed
        });

        const translatedText = response.choices[0].text.trim();

        // Function to evaluate typographical errors
        let points: string;

        // Check if the translated text matches the original phrase
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
}