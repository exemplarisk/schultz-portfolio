import type { NextApiRequest, NextApiResponse } from "next";
import { OpenAI } from "openai";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    if (!process.env.OPENAI_API_KEY) {
      res.status(500).json({ error: "OPENAI_API_KEY is not set" });
      return;
    }

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const { message } = req.body;

    try {
      // Make the call to the OpenAI API with the message
      const gptResponse = await openai.completions.create({
        model: "text-davinci-003", // Replace with your model of choice
        prompt: message,
        max_tokens: 200,
        temperature: 0.5,
      });

      // Send back the response from OpenAI
      res.status(200).json({ botMessage: gptResponse.choices[0].text.trim() });
    } catch (error) {
      console.error("Error during OpenAI API call:", error);
      res.status(500).json({ error: "Error during OpenAI API call" });
    }
  } else {
    // Handle any other HTTP methods
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}