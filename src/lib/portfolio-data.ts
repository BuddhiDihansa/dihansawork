import { useEffect, useState } from "react";
import { supabase } from "./supabase";

export const GITHUB_USER = "BuddhiDihansa";
/** Any public repo with this GitHub topic is shown on the portfolio automatically. */
export const PORTFOLIO_TOPIC = "portfolio";

export type Project = {
  id?: string;
  repo?: string | null;
  title: string;
  cat: string;
  desc: string;
  tech: string[];
  link: string;
  hidden?: boolean;
  featured?: boolean;
  sort?: number | null;
};
export type Pair = { label: string; value: number };

const L = `https://github.com/${GITHUB_USER}`;
export const DEFAULT_PROJECTS: Project[] = [
  { title: "YouTube Analytics Dashboard", cat: "Data Science", desc: "Interactive dashboard analyzing channel performance with Streamlit, Plotly & Pandas.", tech: ["Streamlit", "Plotly", "Pandas"], link: L },
  { title: "Customer Churn Prediction", cat: "AI / ML", desc: "End-to-end ML pipeline with SHAP explainability deployed via Streamlit.", tech: ["scikit-learn", "SHAP", "Streamlit"], link: L },
  { title: "Clinical Data Analysis in R", cat: "Data Science", desc: "Statistical exploration of the MSK-CHORD dataset for clinical insights.", tech: ["R", "ggplot2", "Stats"], link: L },
  { title: "AI Companion Robot", cat: "AI / ML", desc: "Experimental project exploring conversational AI and embedded interaction.", tech: ["Python", "LLM", "IoT"], link: L },
  { title: "Lanka Explores", cat: "Web", desc: "Web project showcasing Sri Lankan travel destinations with a modern UI.", tech: ["HTML", "CSS", "PHP"], link: L },
  { title: "PetWorld", cat: "Web", desc: "Group web project — a community platform for pet lovers and adopters.", tech: ["HTML", "CSS", "JS"], link: L },
];
export const DEFAULT_LEARNING: Pair[] = [
  { label: "Deep Learning · PyTorch", value: 65 },
  { label: "LLM Fine-tuning & RAG", value: 55 },
  { label: "Agentic Systems · LangChain", value: 50 },
  { label: "MLOps · MLflow / Docker", value: 40 },
];
export const DEFAULT_RADAR: Pair[] = [
  { label: "Python", value: 90 }, { label: "ML", value: 75 }, { label: "Data Viz", value: 80 },
  { label: "SQL", value: 70 }, { label: "R", value: 65 }, { label: "LLMs", value: 60 },
];
export const DEFAULT_BIO = `About Buddhi:
- BSc (Hons) Data Science undergraduate at NSBM Green University (2025-2028, currently 2nd year).
- Aspiring AI Engineer & future founder from Hambantota, Sri Lanka.
- AI/ML Automation Trainee at HelaNexusIT Solutions.
- Member of AI Society and NForce Club at NSBM.
- Skills: Python, Java, R, JavaScript, scikit-learn, Pandas, SHAP, Streamlit, Plotly, SQL, GitHub.
- Notable projects: YouTube Analytics Dashboard, Customer Churn Prediction (with SHAP), Clinical Data Analysis in R (MSK-CHORD), AI Companion Robot, Lanka Explores, PetWorld.
- Interests: LLMs, MLOps, agentic systems, building startups.
- Contact: dihansabuddhi9@gmail.com, GitHub @BuddhiDihansa.`;

const TOPIC_CAT: Record<string, string> = {
  "ai-ml": "AI / ML", ai: "AI / ML", ml: "AI / ML", "machine-learning": "AI / ML", "deep-learning": "AI / ML", llm: "AI / ML",
  "data-science": "Data Science", "data-analysis": "Data Science", "data-visualization": "Data Science",
  web: "Web", "web-development": "Web", frontend: "Web", website: "Web",
};
const pretty = (s: string) => s.replace(/[-_]+/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

type GhRepo = { name: string; description: string | null; language: string | null; topics?: string[]; html_url: string; homepage: string | null; fork: boolean };

export async function fetchGithubProjects(): Promise<Project[]> {
  const res = await fetch(`https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&sort=updated`);
  if (!res.ok) return [];
  const repos = (await res.json()) as GhRepo[];
  return repos
    .filter((r) => !r.fork && r.topics?.includes(PORTFOLIO_TOPIC))
    .map((r) => {
      const topics = (r.topics ?? []).filter((t) => t !== PORTFOLIO_TOPIC);
      const cat = topics.map((t) => TOPIC_CAT[t]).find(Boolean) ?? "Other";
      const tech = [r.language, ...topics.filter((t) => !TOPIC_CAT[t])].filter(Boolean).slice(0, 5) as string[];
      return { repo: r.name, title: pretty(r.name), cat, desc: r.description ?? "", tech, link: r.html_url };
    });
}

type Row = { id: string; repo: string | null; title: string | null; category: string | null; description: string | null; tech: string[] | null; link: string | null; hidden: boolean; featured: boolean; sort: number | null };
export const rowToProject = (r: Row): Project => ({
  id: r.id, repo: r.repo, title: r.title ?? "", cat: r.category ?? "Other", desc: r.description ?? "",
  tech: r.tech ?? [], link: r.link ?? `https://github.com/${GITHUB_USER}`, hidden: r.hidden, featured: r.featured, sort: r.sort,
});
const nonEmpty = (p: Project): Partial<Project> => {
  const o: Partial<Project> = { id: p.id, hidden: p.hidden, featured: p.featured, sort: p.sort };
  if (p.title) o.title = p.title;
  if (p.cat && p.cat !== "Other") o.cat = p.cat;
  if (p.desc) o.desc = p.desc;
  if (p.tech.length) o.tech = p.tech;
  if (p.link) o.link = p.link;
  return o;
};

export async function fetchRows(): Promise<Project[]> {
  if (!supabase) return [];
  const { data } = await supabase.from("projects").select("*");
  return ((data ?? []) as Row[]).map(rowToProject);
}

/** GitHub (auto) + Supabase (manual / overrides), hidden ones removed. */
export async function loadProjects(): Promise<Project[]> {
  const [gh, rows] = await Promise.all([fetchGithubProjects().catch(() => []), fetchRows()]);
  if (!supabase) return [...gh, ...DEFAULT_PROJECTS.filter((d) => !gh.some((g) => g.title === d.title))];
  const key = (r?: string | null) => r?.toLowerCase();
  const ghKeys = new Set(gh.map((g) => key(g.repo)));
  const out: Project[] = [];
  for (const g of gh) {
    const o = rows.find((r) => r.repo && key(r.repo) === key(g.repo));
    if (o?.hidden) continue;
    out.push(o ? { ...g, ...nonEmpty(o) } : g);
  }
  for (const r of rows) {
    if (r.hidden || (r.repo && ghKeys.has(key(r.repo)))) continue;
    out.push(r);
  }
  return out.sort((a, b) => Number(!!b.featured) - Number(!!a.featured) || (a.sort ?? 999) - (b.sort ?? 999));
}

export function useProjects() {
  const [p, setP] = useState<Project[]>(supabase ? [] : DEFAULT_PROJECTS);
  useEffect(() => { loadProjects().then(setP).catch(() => {}); }, []);
  return p;
}

export async function fetchContent<T>(key: string, fallback: T): Promise<T> {
  if (!supabase) return fallback;
  const { data } = await supabase.from("site_content").select("value").eq("key", key).maybeSingle();
  return (data?.value as T) ?? fallback;
}
export function useSiteContent<T>(key: string, fallback: T) {
  const [v, setV] = useState<T>(fallback);
  useEffect(() => { fetchContent(key, fallback).then(setV).catch(() => {}); /* eslint-disable-next-line */ }, [key]);
  return v;
}
