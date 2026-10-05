import { Brain, Sparkles, Bot, Cpu } from "lucide-react";
import { DEFAULT_LEARNING, useSiteContent } from "@/lib/portfolio-data";

const ICONS = [<Brain className="w-4 h-4" />, <Sparkles className="w-4 h-4" />, <Bot className="w-4 h-4" />, <Cpu className="w-4 h-4" />];

export function CurrentlyLearning() {
  const LEARNING = useSiteContent("learning", DEFAULT_LEARNING).map((l, i) => ({ ...l, icon: ICONS[i % ICONS.length] }));
  return (
    <section id="learning" className="relative py-24">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="chip mb-4">// Currently Learning</span>
          <h2 className="text-4xl md:text-5xl font-bold mb-3">Always <span className="neon-text">Leveling Up</span></h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">The AI/ML topics I'm actively studying and shipping right now.</p>
        </div>
        <div className="glass-card p-6 md:p-10 space-y-6">
          {LEARNING.map((l) => (
            <div key={l.label}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2 text-foreground font-medium">
                  <span className="text-primary">{l.icon}</span>{l.label}
                </div>
                <span className="text-xs font-mono text-primary">{l.value}%</span>
              </div>
              <div className="h-2 rounded-full bg-secondary/60 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-primary to-accent neon-glow"
                  style={{ width: `${l.value}%`, transition: "width 1.2s ease-out" }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
