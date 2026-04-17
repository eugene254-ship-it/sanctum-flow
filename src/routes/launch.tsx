import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Sparkles, TrendingUp } from "lucide-react";

export const Route = createFileRoute("/launch")({
  head: () => ({
    meta: [
      { title: "Launch Your Project — Atlas Sanctum" },
      { name: "description", content: "Spin up a tokenized creator economy in minutes. Live Sanctum Score preview as you build." },
    ],
  }),
  component: LaunchPage,
});

function LaunchPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    token: "",
    description: "",
    category: "Music",
    supply: "1000000",
  });

  // Live computed preview
  const completion =
    (form.name ? 20 : 0) +
    (form.token ? 20 : 0) +
    (form.description ? 25 : 0) +
    (form.category ? 15 : 0) +
    (Number(form.supply) > 0 ? 20 : 0);
  const initialScore = Math.max(40, Math.min(72, 40 + Math.round(completion * 0.32)));
  const growth = completion > 70 ? "High 📈" : completion > 40 ? "Medium" : "Low";

  const update = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const inputCls = "w-full px-4 py-2.5 rounded-lg bg-input/50 border border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 transition text-sm";

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="mb-10">
          <h1 className="text-4xl font-bold">🚀 Launch Your Project</h1>
          <p className="text-muted-foreground mt-2">Configure your token. We'll predict your Sanctum trajectory live.</p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Form */}
          <form
            className="lg:col-span-3 glass-card rounded-2xl p-6 space-y-5"
            onSubmit={(e) => { e.preventDefault(); navigate({ to: "/dashboard" }); }}
          >
            <div>
              <label className="text-xs text-muted-foreground uppercase tracking-wider">Project Name</label>
              <input className={inputCls + " mt-1.5"} placeholder="Lyra Nova Records" value={form.name} onChange={(e) => update("name", e.target.value)} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-muted-foreground uppercase tracking-wider">Token Symbol</label>
                <input className={inputCls + " mt-1.5 font-mono"} placeholder="$MUSICX" value={form.token} onChange={(e) => update("token", e.target.value.toUpperCase())} />
              </div>
              <div>
                <label className="text-xs text-muted-foreground uppercase tracking-wider">Initial Supply</label>
                <input type="number" className={inputCls + " mt-1.5"} value={form.supply} onChange={(e) => update("supply", e.target.value)} />
              </div>
            </div>
            <div>
              <label className="text-xs text-muted-foreground uppercase tracking-wider">Category</label>
              <div className="grid grid-cols-4 gap-2 mt-1.5">
                {["Music", "Climate", "Education", "Art"].map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => update("category", c)}
                    className={`py-2 rounded-lg text-sm border transition ${
                      form.category === c
                        ? "bg-gradient-to-r from-primary to-secondary text-primary-foreground border-transparent"
                        : "bg-input/30 border-border hover:border-primary/50"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-xs text-muted-foreground uppercase tracking-wider">Description</label>
              <textarea
                rows={4}
                className={inputCls + " mt-1.5 resize-none"}
                placeholder="What is your project building?"
                value={form.description}
                onChange={(e) => update("description", e.target.value)}
              />
            </div>
            <button
              type="submit"
              disabled={completion < 60}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-primary to-secondary text-primary-foreground font-semibold hover:opacity-90 transition glow-ring disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Deploy to Sanctum →
            </button>
          </form>

          {/* Live Preview */}
          <aside className="lg:col-span-2 space-y-4 sticky top-24 self-start">
            <div className="glass-card rounded-2xl p-6 animate-pulse-glow">
              <div className="flex items-center gap-2 text-xs text-muted-foreground uppercase tracking-wider">
                <Sparkles className="w-3 h-3 text-primary" /> Live Preview
              </div>
              <div className="mt-4">
                <div className="text-xs text-muted-foreground">Initial Sanctum Score</div>
                <div className="text-5xl font-bold gradient-text glow-text mt-1" key={initialScore}>{initialScore}</div>
                <div className="h-2 rounded-full bg-muted mt-3 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-500" style={{ width: `${initialScore}%` }} />
                </div>
              </div>
              <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-lg bg-input/40 p-3">
                  <div className="text-[10px] text-muted-foreground uppercase">Form Complete</div>
                  <div className="font-bold mt-0.5">{completion}%</div>
                </div>
                <div className="rounded-lg bg-input/40 p-3">
                  <div className="text-[10px] text-muted-foreground uppercase">Projected Growth</div>
                  <div className="font-bold mt-0.5 flex items-center gap-1"><TrendingUp className="w-3.5 h-3.5 text-success" />{growth}</div>
                </div>
              </div>
            </div>

            <div className="glass-card rounded-2xl p-6">
              <div className="text-xs text-muted-foreground uppercase tracking-wider mb-4">Auto-Configured Royalty Split</div>
              <div className="space-y-2 text-sm">
                {[
                  ["Creator", 50],
                  ["Holders", 20],
                  ["Contributors", 15],
                  ["Treasury", 10],
                  ["Burn", 5],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between">
                    <span className="text-muted-foreground">{k}</span>
                    <span className="font-semibold">{v}%</span>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
