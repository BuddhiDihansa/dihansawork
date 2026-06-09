import { useEffect, useState } from "react";
import { Github, Star, GitFork, Users, BookOpen } from "lucide-react";

type GH = { public_repos: number; followers: number; following: number; avatar_url: string; bio: string | null; name: string };

export function GitHubStats({ username = "BuddhiDihansa" }: { username?: string }) {
  const [data, setData] = useState<GH | null>(null);
  const [stars, setStars] = useState<number | null>(null);

  useEffect(() => {
    let cancel = false;
    fetch(`https://api.github.com/users/${username}`)
      .then((r) => r.json())
      .then((d) => { if (!cancel) setData(d); })
      .catch(() => {});
    fetch(`https://api.github.com/users/${username}/repos?per_page=100`)
      .then((r) => r.json())
      .then((repos) => {
        if (!cancel && Array.isArray(repos)) {
          setStars(repos.reduce((s: number, r: { stargazers_count: number }) => s + (r.stargazers_count || 0), 0));
        }
      })
      .catch(() => {});
    return () => { cancel = true; };
  }, [username]);

  const items = [
    { icon: <BookOpen className="w-4 h-4" />, label: "Repos", value: data?.public_repos ?? "—" },
    { icon: <Star className="w-4 h-4" />, label: "Stars", value: stars ?? "—" },
    { icon: <Users className="w-4 h-4" />, label: "Followers", value: data?.followers ?? "—" },
    { icon: <GitFork className="w-4 h-4" />, label: "Following", value: data?.following ?? "—" },
  ];

  return (
    <div className="glass-card p-6 md:p-8">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground">
            <Github className="w-5 h-5" />
          </div>
          <div>
            <div className="font-bold">@{username}</div>
            <div className="text-xs text-muted-foreground font-mono">live · github.com</div>
          </div>
        </div>
        <a href={`https://github.com/${username}`} target="_blank" rel="noreferrer" className="text-xs font-mono text-primary hover:underline">View profile →</a>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {items.map((it) => (
          <div key={it.label} className="rounded-lg border border-border bg-secondary/30 p-4">
            <div className="flex items-center gap-2 text-primary mb-1">{it.icon}<span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">{it.label}</span></div>
            <div className="text-2xl font-bold neon-text">{it.value}</div>
          </div>
        ))}
      </div>

      <div className="rounded-lg overflow-hidden border border-border bg-secondary/20 p-4">
        <div className="text-xs font-mono text-muted-foreground mb-3">// Contribution graph</div>
        <img
          src={`https://ghchart.rshah.org/3DD68C/${username}`}
          alt={`${username} GitHub contributions`}
          className="w-full"
          loading="lazy"
        />
      </div>
    </div>
  );
}

export function SkillsRadar() {
  const skills = [
    { label: "Python", value: 0.9 },
    { label: "ML", value: 0.75 },
    { label: "Data Viz", value: 0.8 },
    { label: "SQL", value: 0.7 },
    { label: "R", value: 0.65 },
    { label: "LLMs", value: 0.6 },
  ];
  const size = 260;
  const cx = size / 2;
  const cy = size / 2;
  const radius = 100;
  const n = skills.length;

  const point = (i: number, r: number) => {
    const angle = (Math.PI * 2 * i) / n - Math.PI / 2;
    return [cx + Math.cos(angle) * r, cy + Math.sin(angle) * r];
  };

  const polygon = skills.map((s, i) => point(i, radius * s.value).join(",")).join(" ");
  const rings = [0.25, 0.5, 0.75, 1].map((f) =>
    Array.from({ length: n }, (_, i) => point(i, radius * f).join(",")).join(" "),
  );

  return (
    <div className="glass-card p-6 md:p-8 flex flex-col items-center">
      <div className="text-xs font-mono text-primary mb-2 self-start">// Skill radar</div>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {rings.map((pts, i) => (
          <polygon key={i} points={pts} fill="none" stroke="oklch(0.85 0.24 142 / 0.15)" strokeWidth="1" />
        ))}
        {skills.map((_, i) => {
          const [x, y] = point(i, radius);
          return <line key={i} x1={cx} y1={cy} x2={x} y2={y} stroke="oklch(0.85 0.24 142 / 0.15)" />;
        })}
        <polygon points={polygon} fill="oklch(0.85 0.24 142 / 0.25)" stroke="oklch(0.85 0.24 142)" strokeWidth="2" />
        {skills.map((s, i) => {
          const [x, y] = point(i, radius + 18);
          return (
            <text key={s.label} x={x} y={y} textAnchor="middle" dominantBaseline="middle"
              className="fill-foreground text-[11px] font-mono">{s.label}</text>
          );
        })}
      </svg>
    </div>
  );
}
