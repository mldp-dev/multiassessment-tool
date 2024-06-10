// utils/typographicalUtils.ts
import { openaiConfig, MODEL_ID } from "../config/openaiConfig";

export async function evaluateTypographicalErrors(phrase: string): Promise<string> {
    // Send the phrase for translation using OpenAI's Completions
    const response = await openaiConfig.completions.create({
        model: MODEL_ID,
        prompt: phrase, // Provide the phrase as the prompt
        max_tokens: 100, // Example of other parameters you might want to include
        n: 1
    });

    const translatedText = response.choices[0].text.trim();

    // Function to evaluate typographical errors
    let points: string;

    // Check if the translated text matches the original phrase
    if (translatedText.toLowerCase() === phrase.toLowerCase()) {
        points = "0 Points: Have both typographical and spelling errors";  // No errors
    } else if (translatedText === phrase) {
        points = "1 Point: Have at least one typographical or spelling error";  // At least one error
    } else {
        points = "2 Points: No typographical and spelling errors";  // No errors
    }

    return points;
}
