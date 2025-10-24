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
      organization: process.env.OPENAI_ORG_ID || process.env.OPENAI_ORGANIZATION,
    });

    const { message } = req.body;

    try {
      const personalContext = `Jonatan is a software developer specializing in Next.js, React, TypeScript, and CSS. He has built numerous web applications, including portfolio websites, e-commerce sites, and apartment rental platforms. Jonatan is passionate about creating intuitive, user-friendly interfaces and optimizing web performance. Jonatan lives in Sweden and his CV is available at the top of the page. The two avatars showing are created using ReadyPlayerMe.`;
      const completePrompt = `${personalContext}\n\n${message}`;
      
      const gptResponse = await openai.completions.create({
        model: "gpt-3.5-turbo-instruct",
        prompt: completePrompt,
        max_tokens: 200,
        temperature: 0.5,
      });

      res.status(200).json({ botMessage: gptResponse.choices[0].text.trim() });
    } catch (error: any) {
      const status = error?.status || error?.response?.status || 500;
      const details = error?.response?.data || error?.message || "Unknown error";
      console.error("Error during OpenAI API call:", details);
      if (status === 429) {
        return res.status(429).json({
          error: "OpenAI quota exceeded",
          details,
        });
      }
      return res.status(status).json({
        error: "Error during OpenAI API call",
        details,
      });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}