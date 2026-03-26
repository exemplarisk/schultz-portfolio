import type { NextApiRequest, NextApiResponse } from "next";
import https from "https";

const MODEL_HOST = "models.readyplayer.me";
const DOH_ENDPOINT = "https://cloudflare-dns.com/dns-query?name=models.readyplayer.me&type=A";

const getModelId = (req: NextApiRequest): string | null => {
  const raw = Array.isArray(req.query.id) ? req.query.id[0] : req.query.id;
  if (!raw) {
    return null;
  }

  const trimmed = raw.trim();
  return /^[a-zA-Z0-9]+$/.test(trimmed) ? trimmed : null;
};

const fetchModel = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok || !response.body) {
    throw new Error("Upstream response invalid.");
  }

  const arrayBuffer = await response.arrayBuffer();
  return {
    contentType: response.headers.get("content-type") ?? "application/octet-stream",
    buffer: Buffer.from(arrayBuffer),
  };
};

const resolveModelIp = async (): Promise<string | null> => {
  const response = await fetch(DOH_ENDPOINT, {
    headers: { accept: "application/dns-json" },
  });

  if (!response.ok) {
    return null;
  }

  const payload = (await response.json()) as { Answer?: Array<{ data?: string }> };
  const answer = payload.Answer?.find((entry) => entry.data);
  return answer?.data ?? null;
};

const fetchModelViaIp = (ip: string, path: string) =>
  new Promise<{ contentType: string; buffer: Buffer }>((resolve, reject) => {
    const request = https.request(
      {
        hostname: ip,
        port: 443,
        path,
        method: "GET",
        headers: {
          Host: MODEL_HOST,
        },
        servername: MODEL_HOST,
      },
      (response) => {
        if (response.statusCode && response.statusCode >= 400) {
          reject(new Error("Upstream response invalid."));
          return;
        }

        const chunks: Uint8Array[] = [];
        response.on("data", (chunk) => chunks.push(chunk));
        response.on("end", () => {
          const totalLength = chunks.reduce((sum, chunk) => sum + chunk.byteLength, 0);
          const buffer = Buffer.allocUnsafe(totalLength);
          let offset = 0;

          chunks.forEach((chunk) => {
            buffer.set(chunk, offset);
            offset += chunk.byteLength;
          });

          resolve({
            contentType: response.headers["content-type"] || "application/octet-stream",
            buffer,
          });
        });
      }
    );

    request.on("error", reject);
    request.end();
  });

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const modelId = getModelId(req);

  if (!modelId) {
    res.status(400).json({ error: "Invalid model id." });
    return;
  }

  try {
    const path = `/${modelId}.glb`;
    const targetUrl = `https://${MODEL_HOST}${path}`;
    let modelResponse;

    try {
      modelResponse = await fetchModel(targetUrl);
    } catch {
      const ip = await resolveModelIp();
      if (!ip) {
        throw new Error("Failed to resolve model host.");
      }
      modelResponse = await fetchModelViaIp(ip, path);
    }

    res.setHeader("Content-Type", modelResponse.contentType);
    res.setHeader("Cache-Control", "public, max-age=86400, s-maxage=86400");
    res.status(200).send(modelResponse.buffer);
  } catch {
    res.status(502).json({ error: "Model proxy failed." });
  }
}
