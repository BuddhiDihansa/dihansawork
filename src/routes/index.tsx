import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import {
  ArrowRight, Github, Linkedin, Mail, MapPin, Download, Sparkles,
  Code2, Brain, Database, Wrench, GraduationCap, Briefcase,
  Youtube, ExternalLink, Send, Cpu, Zap, Rocket, Terminal,
  Loader2, CheckCircle, AlertCircle,
} from "lucide-react";
import profileImg from "@/assets/profile.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Buddhi Dihansa — Aspiring AI Engineer & Data Science Undergraduate" },
      { name: "description", content: "Portfolio of Buddhi Dihansa, Data Science undergraduate at NSBM Green University building intelligent systems with AI & ML." },
    ],
  }),
  component: Portfolio,
});

const ROLES = [
  "Aspiring AI Engineer",
  "Data Science Undergraduate",
  "ML Enthusiast",
  "Future Founder",
];

function useTyping(words: string[], speed = 80, pause = 1600) {
  const [i, setI] = useState(0);
  const [text, setText] = useState("");
  const [del, setDel] = useState(false);
  useEffect(() => {
    const word = words[i];
    const t = setTimeout(() => {
      if (!del) {
        setText(word.slice(0, text.length + 1));
        if (text.length + 1 === word.length) setTimeout(() => setDel(true), pause);
      } else {
        setText(word.slice(0, text.length - 1));
        if (text.length - 1 === 0) { setDel(false); setI((i + 1) % words.length); }
      }
    }, del ? speed / 2 : speed);
    return () => clearTimeout(t);
  }, [text, del, i, words, speed, pause]);
  return text;
}

function Portfolio() {
  const typed = useTyping(ROLES);
  return (
    <div className="relative min-h-screen">
      <Nav />
      <Hero typed={typed} />
      <About />
      <Education />
      <Skills />
      <Projects />
      <Experience />
      <Contact />
      <Footer />
    </div>
  );
}

function Nav() {
  const links = [
    { href: "#about", label: "About" },
    { href: "#education", label: "Education" },
    { href: "#skills", label: "Skills" },
    { href: "#projects", label: "Projects" },
    { href: "#contact", label: "Contact" },
  ];
  return (
    <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-xl bg-background/40 border-b border-border">
      <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2 font-display font-bold text-lg">
          <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground">
            <Sparkles className="w-4 h-4" />
          </span>
          <span className="neon-text">Buddhi.dev</span>
        </a>
        <ul className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="hover:text-foreground transition-colors">{l.label}</a>
            </li>
          ))}
        </ul>
        <a href="#contact" className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:scale-105 transition-transform neon-glow">
          Let's Talk <ArrowRight className="w-4 h-4" />
        </a>
      </nav>
    </header>
  );
}

function Hero({ typed }: { typed: string }) {
  return (
    <section id="top" className="relative pt-28 pb-20 overflow-hidden min-h-screen flex items-center">
      <div className="absolute inset-0 grid-bg pointer-events-none" />
      <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
      {/* Orbital glows */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-primary/20 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-accent/15 blur-[140px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 w-full">
        {/* Top status bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-10 animate-fade-up">
          <span className="chip">
            <span className="relative flex w-2 h-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-primary opacity-75 animate-ping" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
            </span>
            Available · AI/ML Internships
          </span>
          <div className="hidden md:flex items-center gap-2 text-xs font-mono text-muted-foreground">
            <Terminal className="w-3 h-3 text-primary" />
            <span>~/portfolio</span>
            <span className="text-primary">$</span>
            <span>whoami</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-10 items-center">
          {/* Left: Big name + content */}
          <div className="lg:col-span-7 animate-fade-up" style={{ animationDelay: "100ms" }}>
            <div className="text-sm font-mono text-primary mb-4 tracking-widest uppercase">
              Hello World, I am
            </div>
            <h1 className="font-display font-bold leading-[0.85] mb-6">
              <span className="block text-6xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tighter">
                DIHANSA
              </span>
              <span className="block mt-2 text-2xl sm:text-3xl md:text-4xl font-light text-muted-foreground">
                — <span className="italic neon-text font-display">Building the future,</span>
                <br />
                <span className="text-foreground">one model at a time.</span>
              </span>
            </h1>

            {/* Terminal-like typing */}
            <div className="glass-card inline-flex items-center gap-3 px-4 py-2.5 mb-8 font-mono text-sm">
              <span className="flex gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-destructive/70" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                <span className="w-2.5 h-2.5 rounded-full bg-primary/70" />
              </span>
              <span className="text-primary">~$</span>
              <span className="text-foreground">{typed}</span>
              <span className="animate-blink text-primary">▍</span>
            </div>

            <p className="text-base md:text-lg text-muted-foreground max-w-xl mb-8 leading-relaxed">
              I'm <span className="text-foreground font-semibold">Buddhi Dihansa</span> — a BSc (Hons) Data Science undergraduate at <span className="text-primary">NSBM Green University</span>, crafting intelligent systems with AI, ML and a founder's mindset.
            </p>

            <div className="flex flex-wrap gap-3 mb-10">
              <a href="#projects" className="group relative inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-primary text-primary-foreground font-semibold neon-glow overflow-hidden">
                <span className="relative z-10">View Projects</span>
                <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
                <span className="absolute inset-0 bg-gradient-to-r from-accent to-primary opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
              <a href="#contact" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full glass-card glass-card-hover font-semibold">
                <Mail className="w-4 h-4" /> Contact Me
              </a>
              <a href="#" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full glass-card glass-card-hover font-semibold">
                <Download className="w-4 h-4" /> CV
              </a>
            </div>

            {/* Stats strip */}
            <div className="grid grid-cols-3 gap-3 max-w-lg">
              <Stat n="10+" l="Projects" />
              <Stat n="2nd Yr" l="Undergrad" />
              <Stat n="2028" l="Graduating" />
            </div>
          </div>

          {/* Right: Portrait stack */}
          <div className="lg:col-span-5 relative animate-fade-up" style={{ animationDelay: "300ms" }}>
            <div className="relative max-w-sm mx-auto">
              {/* Background frames */}
              <div className="absolute -inset-6 rounded-[2rem] border border-primary/20 rotate-6" />
              <div className="absolute -inset-3 rounded-[2rem] border border-accent/20 -rotate-3" />
              <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-primary/40 via-transparent to-accent/40 blur-2xl" />

              {/* Portrait */}
              <div className="relative rounded-[2rem] overflow-hidden glass-card border-primary/30 neon-glow">
                <img src={profileImg} alt="Buddhi Dihansa portrait" className="w-full aspect-[4/5] object-cover" width={768} height={960} />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />

                {/* Scanline overlay */}
                <div className="absolute inset-0 pointer-events-none opacity-20" style={{
                  backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, oklch(0.85 0.24 142 / 0.3) 2px, oklch(0.85 0.24 142 / 0.3) 3px)"
                }} />

                {/* Top badge */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                  <div className="glass-card px-3 py-1.5 flex items-center gap-2 text-[10px] font-mono">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                    <span className="text-primary">LIVE</span>
                  </div>
                  <div className="glass-card px-3 py-1.5 text-[10px] font-mono text-muted-foreground">
                    v2.0.28
                  </div>
                </div>

                {/* Bottom info card */}
                <div className="absolute bottom-4 left-4 right-4 glass-card p-4 border-primary/30">
                  <div className="flex items-center gap-2 text-[10px] text-primary font-mono mb-1.5 tracking-wider">
                    <Cpu className="w-3 h-3" /> STATUS · TRAINING_MODE
                  </div>
                  <div className="text-sm font-semibold leading-tight">
                    Exploring LLMs, MLOps & autonomous agents.
                  </div>
                </div>
              </div>

              {/* Floating tech chips */}
              <FloatingChip className="-top-4 -left-6" icon={<Brain className="w-3.5 h-3.5" />} label="ML" />
              <FloatingChip className="top-1/4 -right-8" icon={<Code2 className="w-3.5 h-3.5" />} label="Python" />
              <FloatingChip className="bottom-20 -left-10" icon={<Database className="w-3.5 h-3.5" />} label="Data" />
              <FloatingChip className="-bottom-4 right-4" icon={<Sparkles className="w-3.5 h-3.5" />} label="AI" />
            </div>
          </div>
        </div>

        {/* Marquee tech strip */}
        <div className="mt-16 pt-8 border-t border-border/50 animate-fade-up" style={{ animationDelay: "500ms" }}>
          <div className="flex flex-wrap items-center justify-between gap-6 text-xs font-mono text-muted-foreground">
            <span className="text-primary tracking-widest">STACK //</span>
            {["Python", "Machine Learning", "Streamlit", "Pandas", "scikit-learn", "R", "SQL", "GitHub"].map((t) => (
              <span key={t} className="hover:text-foreground transition-colors">{t}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}


function Stat({ n, l }: { n: string; l: string }) {
  return (
    <div className="glass-card p-4">
      <div className="text-2xl md:text-3xl font-bold neon-text">{n}</div>
      <div className="text-xs text-muted-foreground mt-1">{l}</div>
    </div>
  );
}

function FloatingChip({ className = "", icon, label }: { className?: string; icon: React.ReactNode; label: string }) {
  return (
    <div className={`absolute glass-card px-3 py-2 flex items-center gap-2 text-sm font-mono animate-float ${className}`}>
      <span className="text-primary">{icon}</span>{label}
    </div>
  );
}

function SectionHeader({ tag, title, subtitle }: { tag: string; title: React.ReactNode; subtitle?: string }) {
  return (
    <div className="text-center mb-14">
      <span className="chip mb-4">{tag}</span>
      <h2 className="text-4xl md:text-5xl font-bold mb-3">{title}</h2>
      {subtitle && <p className="text-muted-foreground max-w-2xl mx-auto">{subtitle}</p>}
    </div>
  );
}

function About() {
  return (
    <section id="about" className="relative py-24">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader tag="// About Me" title={<>Everything About <span className="neon-text">Buddhi</span></>} />
        <div className="grid md:grid-cols-5 gap-8 items-start">
          <div className="md:col-span-3 glass-card p-8 md:p-10 space-y-4 text-muted-foreground leading-relaxed">
            <p>
              I'm <span className="text-foreground font-semibold">Buddhi Dihansa</span>, an aspiring AI Engineer and future founder, currently pursuing a <span className="text-primary">BSc (Hons) in Data Science</span> at NSBM Green University. I love turning curiosity into intelligent systems that solve real problems.
            </p>
            <p>
              My journey blends <span className="text-foreground">code, data, and entrepreneurial thinking</span>. From building ML-powered dashboards to experimenting with companion robots, I treat every project as a step toward becoming the AI engineer I'll need to be tomorrow.
            </p>
            <p>
              When I'm not shipping code, I'm creating content on YouTube, learning from the AI community, and sketching out startup ideas. The goal: build technology that genuinely empowers people.
            </p>
            <div className="flex flex-wrap gap-3 pt-4">
              <span className="chip"><MapPin className="w-3 h-3" /> Hambantota, Sri Lanka</span>
              <span className="chip"><GraduationCap className="w-3 h-3" /> NSBM Green University</span>
              <span className="chip"><Youtube className="w-3 h-3" /> Content Creator</span>
            </div>
          </div>
          <div className="md:col-span-2 space-y-4">
            <FactCard icon={<Rocket className="w-5 h-5" />} title="Mission" body="Become an AI Engineer & launch ventures that ship intelligence to everyday users." />
            <FactCard icon={<Zap className="w-5 h-5" />} title="Mindset" body="Growth-first. Ship, learn, iterate. Build in public." />
            <FactCard icon={<Brain className="w-5 h-5" />} title="Currently Learning" body="Deep Learning, LLM fine-tuning, MLOps & agentic systems." />
          </div>
        </div>
      </div>
    </section>
  );
}

function FactCard({ icon, title, body }: { icon: React.ReactNode; title: string; body: string }) {
  return (
    <div className="glass-card glass-card-hover p-6">
      <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-3">{icon}</div>
      <div className="font-semibold mb-1">{title}</div>
      <div className="text-sm text-muted-foreground">{body}</div>
    </div>
  );
}

function Education() {
  const items = [
    { y: "2025 — 2028", t: "BSc (Hons) Data Science", o: "NSBM Green University", d: "Currently 2nd year undergraduate. Focus: AI, ML, statistics & data engineering." },
    { y: "2025 — Present", t: "AI/ML Automation Trainee", o: "HelaNexusIT Solutions", d: "Hands-on with AI workflows, automation pipelines and applied ML tasks." },
    { y: "Memberships", t: "AI Society · NForce Club", o: "NSBM Green University", d: "Active member collaborating on AI events, hackathons and tech workshops." },
  ];
  return (
    <section id="education" className="relative py-24">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader tag="// Education & Journey" title={<>Academic <span className="neon-text">Timeline</span></>} subtitle="From classroom to commit history — the path I'm walking right now." />
        <div className="relative grid md:grid-cols-3 gap-6">
          {items.map((it, i) => (
            <div key={i} className="glass-card glass-card-hover p-6 relative">
              <div className="text-xs font-mono text-primary mb-2">{it.y}</div>
              <h3 className="text-lg font-bold mb-1">{it.t}</h3>
              <div className="text-sm text-accent mb-3">{it.o}</div>
              <p className="text-sm text-muted-foreground">{it.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Skills() {
  const groups = [
    { icon: <Code2 />, title: "Programming", color: "primary", items: ["Python", "Java", "R", "JavaScript"] },
    { icon: <Brain />, title: "AI / ML", color: "accent", items: ["Machine Learning", "scikit-learn", "Pandas", "SHAP"] },
    { icon: <Database />, title: "Data & Viz", color: "primary", items: ["Streamlit", "Plotly", "Jupyter", "MSK-CHORD"] },
    { icon: <Wrench />, title: "Web & Tools", color: "accent", items: ["HTML / CSS", "PHP (Basics)", "GitHub", "VS Code"] },
  ];
  return (
    <section id="skills" className="relative py-24">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader tag="// Skills & Tech Stack" title={<>My <span className="neon-text">Tech Toolbox</span></>} subtitle="The languages, libraries and tools I reach for when building intelligent systems." />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {groups.map((g, i) => (
            <div key={i} className="glass-card glass-card-hover p-6 group">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform">
                {g.icon}
              </div>
              <h3 className="font-bold mb-3">{g.title}</h3>
              <div className="flex flex-wrap gap-2">
                {g.items.map((it) => (
                  <span key={it} className="text-xs px-2.5 py-1 rounded-md bg-secondary/60 border border-border text-secondary-foreground font-mono">{it}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const PROJECTS = [
  { title: "YouTube Analytics Dashboard", cat: "Data Science", desc: "Interactive dashboard analyzing channel performance with Streamlit, Plotly & Pandas.", tech: ["Streamlit", "Plotly", "Pandas"], link: "https://github.com/BuddhiDihansa" },
  { title: "Customer Churn Prediction", cat: "AI / ML", desc: "End-to-end ML pipeline with SHAP explainability deployed via Streamlit.", tech: ["scikit-learn", "SHAP", "Streamlit"], link: "https://github.com/BuddhiDihansa" },
  { title: "Clinical Data Analysis in R", cat: "Data Science", desc: "Statistical exploration of the MSK-CHORD dataset for clinical insights.", tech: ["R", "ggplot2", "Stats"], link: "https://github.com/BuddhiDihansa" },
  { title: "AI Companion Robot", cat: "AI / ML", desc: "Experimental project exploring conversational AI and embedded interaction.", tech: ["Python", "LLM", "IoT"], link: "https://github.com/BuddhiDihansa" },
  { title: "Lanka Explores", cat: "Web", desc: "Web project showcasing Sri Lankan travel destinations with a modern UI.", tech: ["HTML", "CSS", "PHP"], link: "https://github.com/BuddhiDihansa" },
  { title: "PetWorld", cat: "Web", desc: "Group web project — a community platform for pet lovers and adopters.", tech: ["HTML", "CSS", "JS"], link: "https://github.com/BuddhiDihansa" },
];

function Projects() {
  const cats = ["All", "AI / ML", "Data Science", "Web"];
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? PROJECTS : PROJECTS.filter((p) => p.cat === active);
  return (
    <section id="projects" className="relative py-24">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader tag="// Featured Work" title={<>Selected <span className="neon-text">Projects</span></>} subtitle="A snapshot of what I've shipped while learning AI, ML and data science." />
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {cats.map((c) => (
            <button key={c} onClick={() => setActive(c)}
              className={`px-4 py-2 rounded-full text-sm font-mono transition-all border ${active === c ? "bg-primary text-primary-foreground border-primary neon-glow" : "border-border text-muted-foreground hover:text-foreground hover:border-primary/40"}`}>
              {c}
            </button>
          ))}
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((p) => (
            <article key={p.title} className="glass-card glass-card-hover p-6 group flex flex-col">
              <div className="flex items-start justify-between mb-4">
                <div className="w-11 h-11 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center text-primary">
                  <Terminal className="w-5 h-5" />
                </div>
                <span className="chip">{p.cat}</span>
              </div>
              <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">{p.title}</h3>
              <p className="text-sm text-muted-foreground mb-4 flex-1">{p.desc}</p>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {p.tech.map((t) => (
                  <span key={t} className="text-[11px] px-2 py-0.5 rounded-md bg-secondary/60 border border-border font-mono">{t}</span>
                ))}
              </div>
              <a href={p.link} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3 transition-all">
                <Github className="w-4 h-4" /> View on GitHub <ExternalLink className="w-3 h-3" />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section className="relative py-24">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader tag="// Experience" title={<>Training & <span className="neon-text">Growth</span></>} />
        <div className="glass-card p-8 md:p-12 max-w-3xl mx-auto">
          <div className="flex items-start gap-5">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground shrink-0">
              <Briefcase className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3 mb-1">
                <h3 className="text-xl font-bold">AI/ML Automation Trainee</h3>
                <span className="chip">Current</span>
              </div>
              <div className="text-accent font-medium mb-3">HelaNexusIT Solutions</div>
              <p className="text-muted-foreground mb-4">
                Learning AI workflows and ML-driven automation in a real product environment. Working on data pipelines, model experimentation and integrating intelligence into business processes — beginner energy, senior ambition.
              </p>
              <div className="flex flex-wrap gap-2">
                {["AI Workflows", "Automation", "ML Tasks", "Python", "Data Pipelines"].map((t) => (
                  <span key={t} className="text-xs px-2.5 py-1 rounded-md bg-secondary/60 border border-border font-mono">{t}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="relative py-24">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeader tag="// Get in Touch" title={<>Let's Build Something <span className="neon-text">Intelligent</span></>} subtitle="Open to internships, collaborations, AI/ML projects and good conversations." />
        <div className="grid md:grid-cols-5 gap-8">
          <div className="md:col-span-2 space-y-3">
            <ContactCard icon={<Mail />} label="Email" value="dihansabuddhi9@gmail.com" href="mailto:dihansabuddhi9@gmail.com" />
            <ContactCard icon={<Github />} label="GitHub" value="@BuddhiDihansa" href="https://github.com/BuddhiDihansa" />
            <ContactCard icon={<Linkedin />} label="LinkedIn" value="buddhi-dihansa-gamage" href="https://www.linkedin.com/in/buddhi-dihansa-gamage-85073b3a6/" />
            <ContactCard icon={<MapPin />} label="Location" value="Hambantota, Sri Lanka" />
          </div>
          <form onSubmit={(e) => { e.preventDefault(); alert("Thanks! I'll get back to you soon."); }}
            className="md:col-span-3 glass-card p-8 space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Name" name="name" placeholder="Your name" />
              <Field label="Email" name="email" type="email" placeholder="you@domain.com" />
            </div>
            <div>
              <label className="text-xs font-mono text-muted-foreground">Message</label>
              <textarea required rows={5} placeholder="Tell me about your idea..." className="w-full mt-1 rounded-lg bg-input/60 border border-border focus:border-primary focus:outline-none px-4 py-3 text-sm resize-none" />
            </div>
            <button type="submit" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold hover:scale-105 transition-transform neon-glow">
              Send Message <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

function ContactCard({ icon, label, value, href }: { icon: React.ReactNode; label: string; value: string; href?: string }) {
  const inner = (
    <div className="glass-card glass-card-hover p-5 flex items-center gap-4">
      <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">{icon}</div>
      <div className="min-w-0">
        <div className="text-xs text-muted-foreground font-mono">{label}</div>
        <div className="text-sm font-semibold truncate">{value}</div>
      </div>
    </div>
  );
  return href ? <a href={href} target="_blank" rel="noreferrer">{inner}</a> : inner;
}

function Field({ label, name, type = "text", placeholder }: { label: string; name: string; type?: string; placeholder?: string }) {
  return (
    <div>
      <label className="text-xs font-mono text-muted-foreground">{label}</label>
      <input required name={name} type={type} placeholder={placeholder}
        className="w-full mt-1 rounded-lg bg-input/60 border border-border focus:border-primary focus:outline-none px-4 py-3 text-sm" />
    </div>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border py-10">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        <div>© {new Date().getFullYear()} Buddhi Dihansa. Built with intent.</div>
        <div className="flex items-center gap-4">
          <a href="https://github.com/BuddhiDihansa" target="_blank" rel="noreferrer" className="hover:text-primary"><Github className="w-4 h-4" /></a>
          <a href="https://www.linkedin.com/in/buddhi-dihansa-gamage-85073b3a6/" target="_blank" rel="noreferrer" className="hover:text-primary"><Linkedin className="w-4 h-4" /></a>
          <a href="mailto:dihansabuddhi9@gmail.com" className="hover:text-primary"><Mail className="w-4 h-4" /></a>
        </div>
      </div>
    </footer>
  );
}
