import { Youtube, BookOpen, Mic, ExternalLink } from "lucide-react";

const ITEMS = [
  { icon: <Youtube className="w-5 h-5" />, tag: "YouTube", title: "Sharing my AI/ML learning journey", body: "Tutorials, project breakdowns and behind-the-scenes of becoming an AI engineer.", href: "https://youtube.com" },
  { icon: <BookOpen className="w-5 h-5" />, tag: "Now", title: "Currently exploring", body: "Deep Learning fundamentals, LangChain, LLM fine-tuning and MLOps with MLflow.", href: "#" },
  { icon: <Mic className="w-5 h-5" />, tag: "Community", title: "AI Society & NForce Club", body: "Collaborating on hackathons, AI talks and tech workshops at NSBM.", href: "#" },
];

export function Content() {
  return (
    <section id="content" className="relative py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <span className="chip mb-4">// Content & Community</span>
          <h2 className="text-4xl md:text-5xl font-bold mb-3">Building in <span className="neon-text">Public</span></h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">Where I share learnings, projects and what I'm currently focused on.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {ITEMS.map((it) => (
            <a key={it.title} href={it.href} target="_blank" rel="noreferrer"
              className="glass-card glass-card-hover p-6 group flex flex-col">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 text-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                {it.icon}
              </div>
              <span className="chip mb-3 self-start">{it.tag}</span>
              <h3 className="font-bold mb-2 group-hover:text-primary transition-colors">{it.title}</h3>
              <p className="text-sm text-muted-foreground flex-1">{it.body}</p>
              <div className="mt-4 inline-flex items-center gap-2 text-xs text-primary font-mono">
                Explore <ExternalLink className="w-3 h-3" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
