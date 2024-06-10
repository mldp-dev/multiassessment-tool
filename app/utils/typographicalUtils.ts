import { generatePrompt, openai, MODEL_ID } from '../config/openaiConfig';

export const evaluateTypographicalErrors = async (phrase: string): Promise<string> => {
    try {
        const prompt = generatePrompt(phrase);

        // Send a request to OpenAI to evaluate typographical errors
        const response = await openai.ChatCompletion.create({
            engine: MODEL_ID,
            messages: prompt,
        });

        // Extract translated text from the response
        const translatedText = response.choices[0].message.content.trim();

        // Evaluate typographical errors
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
