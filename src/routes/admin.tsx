import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";
import {
  DEFAULT_BIO, DEFAULT_LEARNING, DEFAULT_RADAR, fetchContent, fetchGithubProjects, fetchRows,
  type Pair, type Project,
} from "@/lib/portfolio-data";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin · Portfolio" }, { name: "robots", content: "noindex" }] }),
  component: Admin,
});

const input = "w-full rounded-lg border border-border bg-secondary/30 px-3 py-2 text-sm outline-none focus:border-primary";
const btn = "px-4 py-2 rounded-full text-sm font-semibold border border-border hover:border-primary/60 transition-colors";
const btnPrimary = "px-4 py-2 rounded-full text-sm font-semibold bg-primary text-primary-foreground hover:scale-105 transition-transform";
const CATS = ["AI / ML", "Data Science", "Web", "Other"];

function Admin() {
  const [session, setSession] = useState<Session | null>(null);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    if (!supabase) { setReady(true); return; }
    supabase.auth.getSession().then(({ data }) => { setSession(data.session); setReady(true); });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    return () => sub.subscription.unsubscribe();
  }, []);

  return (
    <div className="min-h-screen px-4 py-10">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Portfolio <span className="neon-text">Dashboard</span></h1>
          <div className="flex gap-2">
            <a href="/" className={btn}>View site</a>
            {session && <button className={btn} onClick={() => supabase?.auth.signOut()}>Sign out</button>}
          </div>
        </div>
        {!ready ? <p className="text-muted-foreground">Loading…</p>
          : !supabase ? <div className="glass-card p-6">Set <code>VITE_SUPABASE_URL</code> and <code>VITE_SUPABASE_ANON_KEY</code> first (see SETUP.md).</div>
          : !session ? <Login />
          : <Panel />}
      </div>
    </div>
  );
}

function Login() {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [err, setErr] = useState("");
  const go = async () => {
    const { error } = await supabase!.auth.signInWithPassword({ email, password: pw });
    setErr(error?.message ?? "");
  };
  return (
    <div className="glass-card p-6 max-w-sm mx-auto space-y-3">
      <input className={input} placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input className={input} type="password" placeholder="Password" value={pw} onChange={(e) => setPw(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && go()} />
      {err && <p className="text-sm text-red-400">{err}</p>}
      <button className={btnPrimary + " w-full"} onClick={go}>Sign in</button>
    </div>
  );
}

function Panel() {
  const [tab, setTab] = useState<"projects" | "content">("projects");
  return (
    <>
      <div className="flex gap-2 mb-6">
        {(["projects", "content"] as const).map((t) => (
          <button key={t} onClick={() => setTab(t)}
            className={`${btn} ${tab === t ? "bg-primary text-primary-foreground border-primary" : ""}`}>
            {t === "projects" ? "Projects" : "Skills · Learning · Chatbot"}
          </button>
        ))}
      </div>
      {tab === "projects" ? <ProjectsTab /> : <ContentTab />}
    </>
  );
}

/* ---------------- Projects ---------------- */
function ProjectsTab() {
  const [gh, setGh] = useState<Project[]>([]);
  const [rows, setRows] = useState<Project[]>([]);
  const [edit, setEdit] = useState<Project | null>(null);
  const [msg, setMsg] = useState("");
  const load = useCallback(async () => {
    const [g, r] = await Promise.all([fetchGithubProjects().catch(() => []), fetchRows()]);
    setGh(g); setRows(r);
  }, []);
  useEffect(() => { load(); }, [load]);

  const save = async (p: Project) => {
    const payload = {
      repo: p.repo ?? null, title: p.title, category: p.cat, description: p.desc, tech: p.tech,
      link: p.link, hidden: !!p.hidden, featured: !!p.featured, sort: p.sort ?? null,
    };
    const q = p.id ? supabase!.from("projects").update(payload).eq("id", p.id)
      : p.repo ? supabase!.from("projects").upsert(payload, { onConflict: "repo" })
      : supabase!.from("projects").insert(payload);
    const { error } = await q;
    setMsg(error ? error.message : "Saved ✓");
    if (!error) { setEdit(null); load(); }
  };
  const del = async (id: string) => {
    if (!confirm("Delete this project?")) return;
    await supabase!.from("projects").delete().eq("id", id);
    load();
  };
  const overrideOf = (repo?: string | null) => rows.find((r) => r.repo?.toLowerCase() === repo?.toLowerCase());
  const manual = rows.filter((r) => !r.repo || !gh.some((g) => g.repo?.toLowerCase() === r.repo?.toLowerCase()));

  return (
    <div className="space-y-8">
      {msg && <p className="text-sm text-primary">{msg}</p>}
      {edit && <ProjectForm p={edit} onSave={save} onCancel={() => setEdit(null)} />}

      <section>
        <h2 className="font-bold mb-1">Auto from GitHub</h2>
        <p className="text-sm text-muted-foreground mb-3">
          Add the topic <code>portfolio</code> to a repo (and <code>ai-ml</code>, <code>data-science</code> or <code>web</code> for the category) and it appears here and on the site automatically.
        </p>
        <div className="space-y-2">
          {gh.length === 0 && <p className="text-sm text-muted-foreground">No repos with the “portfolio” topic yet.</p>}
          {gh.map((g) => {
            const o = overrideOf(g.repo);
            return (
              <div key={g.repo} className="glass-card p-4 flex items-center justify-between gap-3">
                <div>
                  <div className="font-semibold">{o?.title || g.title} {o?.hidden && <span className="chip ml-2">hidden</span>}</div>
                  <div className="text-xs text-muted-foreground font-mono">{g.repo} · {o?.cat && o.cat !== "Other" ? o.cat : g.cat}</div>
                </div>
                <div className="flex gap-2">
                  <button className={btn} onClick={() => setEdit({ ...g, ...(o ?? {}), title: o?.title || g.title, desc: o?.desc || g.desc, tech: o?.tech?.length ? o.tech : g.tech, link: o?.link || g.link, cat: o?.cat && o.cat !== "Other" ? o.cat : g.cat })}>Edit</button>
                  <button className={btn} onClick={() => save({ ...g, ...(o ?? {}), hidden: !o?.hidden })}>{o?.hidden ? "Show" : "Hide"}</button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-bold">My projects (manual)</h2>
          <button className={btnPrimary} onClick={() => setEdit({ title: "", cat: "AI / ML", desc: "", tech: [], link: "https://github.com/BuddhiDihansa" })}>+ Add project</button>
        </div>
        <div className="space-y-2">
          {manual.map((r) => (
            <div key={r.id} className="glass-card p-4 flex items-center justify-between gap-3">
              <div>
                <div className="font-semibold">{r.title} {r.hidden && <span className="chip ml-2">hidden</span>} {r.featured && <span className="chip ml-2">featured</span>}</div>
                <div className="text-xs text-muted-foreground font-mono">{r.cat} · {r.tech.join(", ")}</div>
              </div>
              <div className="flex gap-2">
                <button className={btn} onClick={() => setEdit(r)}>Edit</button>
                <button className={btn} onClick={() => save({ ...r, hidden: !r.hidden })}>{r.hidden ? "Show" : "Hide"}</button>
                <button className={btn} onClick={() => del(r.id!)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function ProjectForm({ p, onSave, onCancel }: { p: Project; onSave: (p: Project) => void; onCancel: () => void }) {
  const [f, setF] = useState<Project>(p);
  const [tech, setTech] = useState(p.tech.join(", "));
  const set = <K extends keyof Project>(k: K, v: Project[K]) => setF((s) => ({ ...s, [k]: v }));
  return (
    <div className="glass-card p-6 space-y-3 border-primary/40">
      <div className="grid sm:grid-cols-2 gap-3">
        <input className={input} placeholder="Title" value={f.title} onChange={(e) => set("title", e.target.value)} />
        <input className={input} list="cats" placeholder="Category" value={f.cat} onChange={(e) => set("cat", e.target.value)} />
        <datalist id="cats">{CATS.map((c) => <option key={c} value={c} />)}</datalist>
      </div>
      <textarea className={input} rows={3} placeholder="Description" value={f.desc} onChange={(e) => set("desc", e.target.value)} />
      <input className={input} placeholder="Tech (comma separated)" value={tech} onChange={(e) => setTech(e.target.value)} />
      <input className={input} placeholder="Link (GitHub / live demo)" value={f.link} onChange={(e) => set("link", e.target.value)} />
      <div className="flex flex-wrap items-center gap-5 text-sm">
        <label className="flex items-center gap-2"><input type="checkbox" checked={!!f.featured} onChange={(e) => set("featured", e.target.checked)} /> Featured (show first)</label>
        <label className="flex items-center gap-2"><input type="checkbox" checked={!!f.hidden} onChange={(e) => set("hidden", e.target.checked)} /> Hidden</label>
        <label className="flex items-center gap-2">Order <input className={input + " w-20"} type="number" value={f.sort ?? ""} onChange={(e) => set("sort", e.target.value === "" ? null : Number(e.target.value))} /></label>
      </div>
      <div className="flex gap-2">
        <button className={btnPrimary} onClick={() => onSave({ ...f, tech: tech.split(",").map((t) => t.trim()).filter(Boolean) })}>Save</button>
        <button className={btn} onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
}

/* ---------------- Skills / Learning / Chatbot ---------------- */
function ContentTab() {
  return (
    <div className="space-y-8">
      <PairEditor title="Currently learning (progress bars)" k="learning" fallback={DEFAULT_LEARNING} />
      <PairEditor title="Skill radar (0–100)" k="radar" fallback={DEFAULT_RADAR} />
      <BioEditor />
    </div>
  );
}

function useSaver(k: string) {
  const [msg, setMsg] = useState("");
  const save = async (value: unknown) => {
    const { error } = await supabase!.from("site_content").upsert({ key: k, value, updated_at: new Date().toISOString() });
    setMsg(error ? error.message : "Saved ✓");
  };
  return { msg, save };
}

function PairEditor({ title, k, fallback }: { title: string; k: string; fallback: Pair[] }) {
  const [items, setItems] = useState<Pair[]>(fallback);
  const { msg, save } = useSaver(k);
  useEffect(() => { fetchContent(k, fallback).then(setItems); /* eslint-disable-next-line */ }, [k]);
  const upd = (i: number, patch: Partial<Pair>) => setItems((a) => a.map((x, j) => (j === i ? { ...x, ...patch } : x)));
  return (
    <section className="glass-card p-6 space-y-3">
      <h2 className="font-bold">{title}</h2>
      {items.map((it, i) => (
        <div key={i} className="flex gap-2">
          <input className={input} value={it.label} onChange={(e) => upd(i, { label: e.target.value })} />
          <input className={input + " w-24"} type="number" min={0} max={100} value={it.value} onChange={(e) => upd(i, { value: Number(e.target.value) })} />
          <button className={btn} onClick={() => setItems((a) => a.filter((_, j) => j !== i))}>✕</button>
        </div>
      ))}
      <div className="flex items-center gap-2">
        <button className={btn} onClick={() => setItems((a) => [...a, { label: "", value: 50 }])}>+ Add</button>
        <button className={btnPrimary} onClick={() => save(items.filter((x) => x.label.trim()))}>Save</button>
        <span className="text-sm text-primary">{msg}</span>
      </div>
    </section>
  );
}

function BioEditor() {
  const [bio, setBio] = useState(DEFAULT_BIO);
  const { msg, save } = useSaver("bio");
  useEffect(() => { fetchContent("bio", DEFAULT_BIO).then(setBio); }, []);
  return (
    <section className="glass-card p-6 space-y-3">
      <h2 className="font-bold">“Ask Dihansa” chatbot — what it knows about you</h2>
      <p className="text-sm text-muted-foreground">The chatbot only answers from this text. Add new projects/skills here too.</p>
      <textarea className={input + " font-mono"} rows={12} value={bio} onChange={(e) => setBio(e.target.value)} />
      <div className="flex items-center gap-2">
        <button className={btnPrimary} onClick={() => save(bio)}>Save</button>
        <span className="text-sm text-primary">{msg}</span>
      </div>
    </section>
  );
}
