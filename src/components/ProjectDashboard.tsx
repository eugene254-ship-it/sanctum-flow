import { useState } from "react";
import { SanctumScore } from "@/components/SanctumScore";
import { ValueFlow } from "@/components/ValueFlow";
import { ImpactFeed } from "@/components/ImpactFeed";
import { ScoreHistoryChart, type ScorePoint } from "@/components/ScoreHistoryChart";
import { Rocket, TrendingUp } from "lucide-react";

const baseEvents = [
  "1,200 new users joined",
  "300 trees verified 🌱",
  "5,000 streams 🎵",
  "12 new contributors onboarded",
  "$2,400 distributed to holders",
];

type Props = {
  projectName: string;
  token: string;
  initialScore: number;
};

export function ProjectDashboard({ projectName, token, initialScore }: Props) {
  const [score, setScore] = useState(initialScore);
  const [delta, setDelta] = useState(5);
  const [revenue, setRevenue] = useState(10000);
  const [events, setEvents] = useState(baseEvents);
  const [history, setHistory] = useState<ScorePoint[]>([
    { t: 0, score: Math.max(0, initialScore - 12) },
    { t: 1, score: Math.max(0, initialScore - 8) },
    { t: 2, score: Math.max(0, initialScore - 5) },
    { t: 3, score: Math.max(0, initialScore - 2) },
    { t: 4, score: initialScore },
  ]);
  const [breakdown, setBreakdown] = useState([
    { label: "Engagement", value: Math.min(100, initialScore + 2) },
    { label: "Impact", value: Math.max(40, initialScore - 13) },
    { label: "Retention", value: Math.max(40, initialScore - 6) },
    { label: "Reputation", value: Math.max(40, initialScore - 3) },
  ]);

  const simulateGrowth = () => {
    const bump = Math.floor(Math.random() * 5) + 3;
    const newScore = Math.min(100, score + bump);
    setScore(newScore);
    setDelta(bump);
    setRevenue((r) => r + Math.floor(Math.random() * 5000) + 2000);
    setBreakdown((b) => b.map((x) => ({ ...x, value: Math.min(100, x.value + Math.floor(Math.random() * 6) + 1) })));
    setHistory((h) => [...h, { t: h.length, score: newScore }].slice(-20));
    const newEvents = [
      `+${Math.floor(Math.random() * 500) + 100} new wallets joined`,
      `+${Math.floor(Math.random() * 50) + 10} trees verified 🌱`,
      `+${Math.floor(Math.random() * 2000) + 500} streams 🎵`,
      `$${(Math.floor(Math.random() * 3) + 1) * 1000} sent to contributors`,
    ];
    setEvents((prev) => [...newEvents, ...prev].slice(0, 6));
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div>
          <div className="text-xs text-muted-foreground uppercase tracking-wider">Project</div>
          <h1 className="text-3xl font-bold mt-1">
            {projectName} <span className="text-secondary font-mono text-xl">{token}</span>
          </h1>
        </div>
        <button
          onClick={simulateGrowth}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-primary to-secondary text-primary-foreground font-semibold hover:opacity-90 transition glow-ring"
        >
          <Rocket className="w-4 h-4" /> Simulate Growth
        </button>
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        <SanctumScore score={score} delta={delta} size="lg" breakdown={breakdown} />
        <ValueFlow revenue={revenue} />
      </div>

      <div className="mb-6">
        <ScoreHistoryChart data={history} />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ImpactFeed events={events} />
        </div>
        <div className="glass-card rounded-2xl p-6 space-y-3">
          <div className="text-sm text-muted-foreground">👥 Token Actions</div>
          <button className="w-full py-3 rounded-xl bg-gradient-to-r from-primary to-secondary text-primary-foreground font-semibold hover:opacity-90 transition">
            Buy {token}
          </button>
          <button className="w-full py-3 rounded-xl glass-card font-semibold hover:border-primary/50 transition">
            Stake Token
          </button>
          <button className="w-full py-3 rounded-xl glass-card font-semibold hover:border-primary/50 transition">
            Contribute
          </button>
          <div className="pt-3 border-t border-border space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-muted-foreground">Price</span><span className="font-medium">$0.42</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">24h</span><span className="text-success font-medium flex items-center gap-1"><TrendingUp className="w-3 h-3" />+12.4%</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Holders</span><span className="font-medium">1,820</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}
