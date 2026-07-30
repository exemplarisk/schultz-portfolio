import type { NextApiRequest, NextApiResponse } from "next";
import { OpenAI } from "openai";

const SYSTEM_PROMPT = `You are Jonatan Schultz's digital assistant on his portfolio website.
Answer helpfully, briefly, and in a friendly natural voice.
Facts about Jonatan:
- Ideas engineer who shapes concepts into working products, with a strong frontend craft in Next.js, React, TypeScript, and CSS
- Builds web apps, portfolio sites, e-commerce, and rental platforms
- Lives in Sweden; born in Ulricehamn; family in Antigua, Guatemala; family house in Torrevieja, Spain; studied in Shanghai, China
- Visitors can explore those places on the hero globe
- His CV is not publicly available; direct people to Contact or LinkedIn
If a question is unrelated to Jonatan, still answer helpfully in one short paragraph, then offer to help with Jonatan-related questions.
Keep answers under 120 words.`;

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 10;
const INSTRUCT_MODEL = "gpt-3.5-turbo-instruct";

type RateBucket = {
  count: number;
  resetAt: number;
};

const rateBuckets = new Map<string, RateBucket>();

function getClientIp(req: NextApiRequest): string {
  const forwarded = req.headers["x-forwarded-for"];
  if (typeof forwarded === "string" && forwarded.length > 0) {
    return forwarded.split(",")[0]?.trim() || "unknown";
  }
  if (Array.isArray(forwarded) && forwarded[0]) {
    return forwarded[0].split(",")[0]?.trim() || "unknown";
  }
  return req.socket.remoteAddress || "unknown";
}

function checkRateLimit(ip: string): { allowed: boolean; retryAfterSec: number } {
  const now = Date.now();
  const existing = rateBuckets.get(ip);

  if (!existing || now >= existing.resetAt) {
    rateBuckets.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return { allowed: true, retryAfterSec: 0 };
  }

  if (existing.count >= RATE_LIMIT_MAX_REQUESTS) {
    return {
      allowed: false,
      retryAfterSec: Math.max(1, Math.ceil((existing.resetAt - now) / 1000)),
    };
  }

  existing.count += 1;
  return { allowed: true, retryAfterSec: 0 };
}

function pruneRateBuckets(now: number) {
  if (rateBuckets.size < 500) {
    return;
  }
  Array.from(rateBuckets.entries()).forEach(([key, bucket]) => {
    if (now >= bucket.resetAt) {
      rateBuckets.delete(key);
    }
  });
}

function getOrganizationId(): string | undefined {
  const raw =
    process.env.OPENAI_ORG_ID || process.env.OPENAI_ORGANIZATION || "";
  const trimmed = raw.trim();
  if (!trimmed || !trimmed.startsWith("org-")) {
    return undefined;
  }
  return trimmed;
}

function createOpenAIClient(organization?: string) {
  return new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    ...(organization ? { organization } : {}),
  });
}

function errorStatus(error: any): number {
  return error?.status || error?.response?.status || 500;
}

function errorMessage(error: any): string {
  return error?.error?.message || error?.message || "Unknown error";
}

function isModelAccessError(error: any): boolean {
  const status = errorStatus(error);
  const message = errorMessage(error).toLowerCase();
  return (
    status === 403 ||
    status === 404 ||
    message.includes("does not have access to model") ||
    message.includes("model_not_found") ||
    message.includes("not a chat model")
  );
}

async function createInstructCompletion(openai: OpenAI, message: string) {
  const prompt = `${SYSTEM_PROMPT}\n\nUser: ${message}\nAssistant:`;
  const response = await openai.completions.create({
    model: process.env.OPENAI_INSTRUCT_MODEL || INSTRUCT_MODEL,
    prompt,
    max_tokens: 220,
    temperature: 0.6,
  });
  return response.choices?.[0]?.text?.trim() || "";
}

async function createChatCompletion(
  openai: OpenAI,
  message: string,
  model: string
) {
  const response = await openai.chat.completions.create({
    model,
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      { role: "user", content: message },
    ],
    max_tokens: 220,
    temperature: 0.6,
  });
  return response.choices?.[0]?.message?.content?.trim() || "";
}

async function generateBotMessage(openai: OpenAI, message: string) {
  // This OpenAI project only allows the legacy instruct model. Prefer that
  // unless an explicit chat model is configured and accessible.
  const chatModel = process.env.OPENAI_CHAT_MODEL?.trim();

  if (chatModel) {
    try {
      return await createChatCompletion(openai, message, chatModel);
    } catch (error) {
      if (!isModelAccessError(error)) {
        throw error;
      }
      console.error(
        "Chat model unavailable, falling back to instruct completions:",
        errorStatus(error),
        errorMessage(error)
      );
    }
  }

  return createInstructCompletion(openai, message);
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
    return;
  }

  const ip = getClientIp(req);
  pruneRateBuckets(Date.now());
  const rate = checkRateLimit(ip);

  if (!rate.allowed) {
    res.setHeader("Retry-After", String(rate.retryAfterSec));
    res.status(429).json({
      error: "Too many requests",
      botMessage:
        "Whoa, slow down a bit. Too many questions too quickly. Try again in a minute.",
    });
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

  const organization = getOrganizationId();

  try {
    let openai = createOpenAIClient(organization);
    let botMessage = "";

    try {
      botMessage = await generateBotMessage(openai, message);
    } catch (firstError: any) {
      // Wrong org binding can also 403. Retry once with the key alone.
      if (organization && (errorStatus(firstError) === 401 || errorStatus(firstError) === 403)) {
        console.error(
          "OpenAI rejected organization-scoped request; retrying without organization:",
          errorMessage(firstError)
        );
        openai = createOpenAIClient(undefined);
        botMessage = await generateBotMessage(openai, message);
      } else {
        throw firstError;
      }
    }

    if (!botMessage) {
      res.status(502).json({
        error: "Empty model response",
        botMessage: "I blanked for a second. Please try that question again.",
      });
      return;
    }

    res.status(200).json({ botMessage });
  } catch (error: any) {
    const status = errorStatus(error);
    const details = errorMessage(error);
    console.error("Error during OpenAI API call:", status, details);

    if (status === 429) {
      res.status(429).json({
        error: "OpenAI quota exceeded",
        botMessage:
          "The assistant is temporarily unavailable due to rate limits or quota. Please try again in a bit.",
      });
      return;
    }

    res.status(502).json({
      error: "Error during OpenAI API call",
      botMessage:
        "Sorry, I hit a snag answering that. Please try again in a moment, or reach out via Contact.",
    });
  }
}
