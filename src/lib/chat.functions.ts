import { createServerFn } from "@tanstack/react-start";
import { generateText } from "ai";
import { createLovableAiGatewayProvider } from "./ai-gateway.server";

const SYSTEM = `You are "Dihansa AI", a friendly assistant representing Buddhi Dihansa.
About Buddhi:
- BSc (Hons) Data Science undergraduate at NSBM Green University (2025-2028, currently 2nd year).
- Aspiring AI Engineer & future founder from Hambantota, Sri Lanka.
- AI/ML Automation Trainee at HelaNexusIT Solutions.
- Member of AI Society and NForce Club at NSBM.
- Skills: Python, Java, R, JavaScript, scikit-learn, Pandas, SHAP, Streamlit, Plotly, SQL, GitHub.
- Notable projects: YouTube Analytics Dashboard, Customer Churn Prediction (with SHAP), Clinical Data Analysis in R (MSK-CHORD), AI Companion Robot, Lanka Explores, PetWorld.
- Interests: LLMs, MLOps, agentic systems, building startups.
- Contact: dihansabuddhi9@gmail.com, GitHub @BuddhiDihansa.

Answer questions about Buddhi's background, skills, projects, or AI/ML topics. Be concise (2-4 sentences), warm, and confident. If asked something unrelated, politely steer back. Never invent details not listed above.`;

export const askDihansa = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => {
    const x = d as { message?: string };
    if (!x?.message || typeof x.message !== "string" || x.message.length > 1000) {
      throw new Error("Invalid message");
    }
    return { message: x.message };
  })
  .handler(async ({ data }) => {
    const key = process.env.LOVABLE_API_KEY;
    if (!key) throw new Error("Missing LOVABLE_API_KEY");
    const gateway = createLovableAiGatewayProvider(key);
    const { text } = await generateText({
      model: gateway("google/gemini-3-flash-preview"),
      system: SYSTEM,
      prompt: data.message,
    });
    return { reply: text };
  });
