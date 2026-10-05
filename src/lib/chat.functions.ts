import { createServerFn } from "@tanstack/react-start";
import { generateText } from "ai";
import { createOpenAICompatible } from "@ai-sdk/openai-compatible";
import { createLovableAiGatewayProvider } from "./ai-gateway.server";
import { DEFAULT_BIO } from "./portfolio-data";

const buildSystem = (bio: string) => `You are "Dihansa AI", a friendly assistant representing Buddhi Dihansa.
${bio}

Answer questions about Buddhi's background, skills, projects, or AI/ML topics. Be concise (2-4 sentences), warm, and confident. If asked something unrelated, politely steer back. Never invent details not listed above.`;

// Reads the editable bio from Supabase (managed in /admin); falls back to the default.
async function getBio(): Promise<string> {
  const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
  const key = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;
  if (!url || !key) return DEFAULT_BIO;
  try {
    const r = await fetch(`${url}/rest/v1/site_content?key=eq.bio&select=value`, { headers: { apikey: key, Authorization: `Bearer ${key}` } });
    const rows = (await r.json()) as { value: string }[];
    return typeof rows?.[0]?.value === "string" ? rows[0].value : DEFAULT_BIO;
  } catch {
    return DEFAULT_BIO;
  }
}

// Works on Vercel with GEMINI_API_KEY; falls back to the Lovable gateway inside Lovable.
function getModel() {
  const gem = process.env.GEMINI_API_KEY;
  if (gem) {
    return createOpenAICompatible({
      name: "gemini",
      baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
      apiKey: gem,
    })(process.env.GEMINI_MODEL || "gemini-2.5-flash");
  }
  const key = process.env.LOVABLE_API_KEY;
  if (!key) throw new Error("Missing GEMINI_API_KEY (or LOVABLE_API_KEY)");
  return createLovableAiGatewayProvider(key)("google/gemini-3-flash-preview");
}

export const askDihansa = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => {
    const x = d as { message?: string };
    if (!x?.message || typeof x.message !== "string" || x.message.length > 1000) {
      throw new Error("Invalid message");
    }
    return { message: x.message };
  })
  .handler(async ({ data }) => {
    const { text } = await generateText({
      model: getModel(),
      system: buildSystem(await getBio()),
      prompt: data.message,
    });
    return { reply: text };
  });
