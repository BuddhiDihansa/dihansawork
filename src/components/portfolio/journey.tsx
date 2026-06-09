import { GraduationCap, Rocket, Brain, Code2, Trophy } from "lucide-react";

const STEPS = [
  { year: "2024", icon: <Code2 className="w-4 h-4" />, title: "Coding Foundations", body: "Started exploring Python, web dev and discovered my love for data." },
  { year: "2025", icon: <GraduationCap className="w-4 h-4" />, title: "BSc Data Science @ NSBM", body: "Joined NSBM Green University as a Data Science undergraduate." },
  { year: "2025", icon: <Brain className="w-4 h-4" />, title: "AI/ML Automation Trainee", body: "Working at HelaNexusIT on real ML workflows and automation." },
  { year: "2026", icon: <Trophy className="w-4 h-4" />, title: "Shipping projects", body: "Building dashboards, ML pipelines and exploring LLM applications." },
  { year: "2028+", icon: <Rocket className="w-4 h-4" />, title: "AI Engineer & Founder", body: "Graduating ready to launch ventures that ship intelligence to users." },
];

export function Journey() {
  return (
    <section id="journey" className="relative py-24">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-14">
          <span className="chip mb-4">// The Journey</span>
          <h2 className="text-4xl md:text-5xl font-bold mb-3">Student → <span className="neon-text">AI Engineer</span> → Founder</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">A roadmap of the transformation I'm walking — one milestone at a time.</p>
        </div>

        <div className="relative">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary/40 to-transparent md:-translate-x-px" />
          <div className="space-y-10">
            {STEPS.map((s, i) => {
              const right = i % 2 === 1;
              return (
                <div key={i} className={`relative flex md:items-center gap-6 ${right ? "md:flex-row-reverse" : ""}`}>
                  <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-primary neon-glow ring-4 ring-background" />
                  <div className={`flex-1 ml-12 md:ml-0 ${right ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                    <div className="glass-card glass-card-hover p-5 inline-block w-full md:w-auto md:max-w-md">
                      <div className={`flex items-center gap-2 mb-2 text-primary ${right ? "md:justify-end" : ""}`}>
                        {s.icon}<span className="text-xs font-mono tracking-wider">{s.year}</span>
                      </div>
                      <h3 className="font-bold mb-1">{s.title}</h3>
                      <p className="text-sm text-muted-foreground">{s.body}</p>
                    </div>
                  </div>
                  <div className="hidden md:block flex-1" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
