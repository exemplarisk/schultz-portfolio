import type { NextApiRequest, NextApiResponse } from "next";
import { OpenAI } from "openai";

const SYSTEM_PROMPT = `You are Jonatan Schultz's digital assistant on his portfolio website.
Answer helpfully, briefly, and in a friendly natural voice.
Facts about Jonatan:
- System / frontend developer specializing in Next.js, React, TypeScript, and CSS
- Builds web apps, portfolio sites, e-commerce, and rental platforms
- Lives in Sweden; born in Ulricehamn; family in Antigua, Guatemala; family house in Torrevieja, Spain; studied in Shanghai, China
- Visitors can explore those places on the hero globe
- His CV is not publicly available; direct people to Contact or LinkedIn
If a question is unrelated to Jonatan, still answer helpfully in one short paragraph, then offer to help with Jonatan-related questions.
Keep answers under 120 words.`;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
    return;
  }

  if (!process.env.OPENAI_API_KEY) {
    res.status(500).json({
      error: "OPENAI_API_KEY is not set",
      botMessage:
        "The assistant is not configured in this environment yet. Add OPENAI_API_KEY locally, or use Contact / LinkedIn instead.",
    });
    return;
  }

  const message =
    typeof req.body?.message === "string" ? req.body.message.trim() : "";

  if (!message) {
    res.status(400).json({
      error: "Message is required",
      botMessage: "Send me a short question and I will try again.",
    });
    return;
  }

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    organization: process.env.OPENAI_ORG_ID || process.env.OPENAI_ORGANIZATION,
  });

  try {
    const model = process.env.OPENAI_CHAT_MODEL || "gpt-4o-mini";
    const gptResponse = await openai.chat.completions.create({
      model,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: message },
      ],
      max_tokens: 220,
      temperature: 0.6,
    });

    const botMessage = gptResponse.choices?.[0]?.message?.content?.trim();
    if (!botMessage) {
      res.status(502).json({
        error: "Empty model response",
        botMessage: "I blanked for a second. Please try that question again.",
      });
      return;
    }

    res.status(200).json({ botMessage });
  } catch (error: any) {
    const status = error?.status || error?.response?.status || 500;
    const details = error?.error?.message || error?.message || "Unknown error";
    console.error("Error during OpenAI API call:", details);

    if (status === 429) {
      res.status(429).json({
        error: "OpenAI quota exceeded",
        details,
        botMessage:
          "The assistant is temporarily unavailable due to rate limits or quota. Please try again in a bit.",
      });
      return;
    }

    res.status(status >= 400 && status < 600 ? status : 500).json({
      error: "Error during OpenAI API call",
      details,
      botMessage:
        "Sorry, I hit a snag answering that. Please try again in a moment, or reach out via Contact.",
    });
  }
}
