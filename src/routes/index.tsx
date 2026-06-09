import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  ArrowRight, Github, Linkedin, Mail, MapPin, Download, Sparkles,
  Code2, Brain, Database, Wrench, GraduationCap, Briefcase,
  Youtube, ExternalLink, Send, Cpu, Zap, Rocket, Terminal,
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
    <section id="top" className="relative pt-32 pb-24 overflow-hidden">
      <div className="absolute inset-0 grid-bg pointer-events-none" />
      <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
      <div className="relative max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
        <div className="animate-fade-up">
          <span className="chip mb-6"><span className="w-2 h-2 rounded-full bg-primary animate-pulse" /> Available for AI/ML opportunities</span>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] mb-6">
            Building <span className="neon-text">Intelligent</span><br />
            Systems for the<br />
            <span className="italic font-display">Future</span> 🚀
          </h1>
          <div className="text-lg md:text-xl text-muted-foreground mb-2 font-mono h-8">
            <span className="text-primary">&gt;</span> {typed}<span className="animate-blink">|</span>
          </div>
          <p className="text-base md:text-lg text-muted-foreground max-w-xl mb-8 mt-4">
            Hi, I'm <span className="text-foreground font-semibold">Buddhi Dihansa</span> — a BSc (Hons) Data Science undergraduate at NSBM Green University, passionate about Artificial Intelligence, Machine Learning, and building real-world systems that matter.
          </p>
          <div className="flex flex-wrap gap-4 mb-12">
            <a href="#projects" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold hover:scale-105 transition-transform neon-glow">
              View Projects <ArrowRight className="w-4 h-4" />
            </a>
            <a href="#contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass-card glass-card-hover font-semibold">
              <Mail className="w-4 h-4" /> Contact Me
            </a>
            <a href="#" className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass-card glass-card-hover font-semibold">
              <Download className="w-4 h-4" /> Download CV
            </a>
          </div>
          <div className="grid grid-cols-3 gap-4 max-w-md">
            <Stat n="10+" l="Projects Built" />
            <Stat n="3+" l="Years Learning" />
            <Stat n="2028" l="Graduation" />
          </div>
        </div>

        <div className="relative animate-fade-up" style={{ animationDelay: "200ms" }}>
          <div className="relative aspect-square max-w-md mx-auto">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/30 to-accent/30 blur-3xl animate-pulse" />
            <div className="absolute inset-4 rounded-3xl border border-primary/30 animate-pulse-ring" />
            <div className="relative w-full h-full rounded-3xl overflow-hidden glass-card border-primary/40 neon-glow">
              <img src={profileImg} alt="Buddhi Dihansa portrait" className="w-full h-full object-cover" width={768} height={1024} />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 glass-card p-4">
                <div className="flex items-center gap-2 text-xs text-primary font-mono mb-1">
                  <Cpu className="w-3 h-3" /> AI ENGINEER · IN TRAINING
                </div>
                <div className="text-sm font-semibold">Currently exploring LLMs, MLOps & autonomous agents.</div>
              </div>
            </div>
            <FloatingChip className="-top-4 -left-4" icon={<Brain className="w-4 h-4" />} label="ML" />
            <FloatingChip className="top-1/3 -right-6" icon={<Code2 className="w-4 h-4" />} label="Python" />
            <FloatingChip className="bottom-12 -left-8" icon={<Database className="w-4 h-4" />} label="Data" />
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
