import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { ProjectCard } from "@/components/ProjectCard";
import { fetchAllProjects, type StoredProject } from "@/lib/projectStore";
import { ArrowRight, Zap, TrendingUp, Globe } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Atlas Sanctum — Explore Living Creator Economies" },
      { name: "description", content: "Discover tokenized creator projects with real-time Sanctum Scores and on-chain impact." },
    ],
  }),
  loader: () => fetchAllProjects(),
  errorComponent: ({ error }) => {
    const router = useRouter();
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-muted-foreground">Failed to load projects: {error.message}</p>
        <button onClick={() => router.invalidate()} className="px-4 py-2 rounded-lg glass-card">Retry</button>
      </div>
    );
  },
  component: ExplorePage,
});

function ExplorePage() {
  const projects = Route.useLoaderData() as StoredProject[];
  const top = [...projects].sort((a, b) => b.sanctumScore - a.sanctumScore).slice(0, 3);

  return (
    <div className="min-h-screen">
      <Navbar />
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 pt-20 pb-16 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-card text-xs text-muted-foreground mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
          Sanctum v1 — Live on Solana Devnet
        </div>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.05]">
          Living Creator Economies<br />
          <span className="gradient-text glow-text">Powered by Impact</span>
        </h1>
        <p className="mt-6 max-w-2xl mx-auto text-lg text-muted-foreground">
          Launch a token. Grow your Sanctum Score. Automatically distribute value to creators,
          holders, contributors, and the planet.
        </p>
        <div className="mt-8 flex items-center justify-center gap-3">
          <Link
            to="/launch"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-secondary text-primary-foreground font-semibold hover:opacity-90 transition glow-ring"
          >
            🚀 Launch Your Project <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/dashboard"
            className="px-6 py-3 rounded-xl glass-card font-semibold hover:border-primary/50 transition"
          >
            View a Live Demo
          </Link>
        </div>
      </section>

      {/* Stats strip */}
      <section className="max-w-7xl mx-auto px-6 mb-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: Zap, label: "Active Projects", value: String(projects.length) },
            { icon: TrendingUp, label: "Total Volume", value: "$12.4M" },
            { icon: Globe, label: "Impact Events", value: "98K" },
            { icon: ArrowRight, label: "Creators Onboarded", value: "1,830" },
          ].map((s) => (
            <div key={s.label} className="glass-card rounded-xl p-4">
              <s.icon className="w-4 h-4 text-primary mb-2" />
              <div className="text-2xl font-bold">{s.value}</div>
              <div className="text-xs text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Top creators */}
      <section className="max-w-7xl mx-auto px-6 mb-12">
        <div className="flex items-end justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold">📊 Live Sanctum Scores</h2>
            <p className="text-sm text-muted-foreground mt-1">Top creators ranked by living reputation</p>
          </div>
        </div>
        <div className="glass-card rounded-2xl divide-y divide-border overflow-hidden">
          {top.map((p, i) => (
            <Link
              to="/project/$id"
              params={{ id: p.id }}
              key={p.id}
              className="flex items-center gap-4 p-4 hover:bg-accent/30 transition"
            >
              <div className="w-8 text-center text-lg font-bold gradient-text">#{i + 1}</div>
              <div className="flex-1">
                <div className="font-semibold">{p.creator}</div>
                <div className="text-xs text-muted-foreground">{p.token} · {p.category}</div>
              </div>
              <div className="hidden md:flex gap-1">{p.impact.map((e, idx) => <span key={idx}>{e}</span>)}</div>
              <div className="text-right">
                <div className="text-xl font-bold gradient-text">{p.sanctumScore}</div>
                <div className="text-[10px] text-muted-foreground uppercase">Sanctum</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured projects */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <h2 className="text-2xl font-bold mb-6">🔥 Featured Projects</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {projects.map((p) => <ProjectCard key={p.id} project={p} />)}
        </div>
      </section>
    </div>
  );
}
