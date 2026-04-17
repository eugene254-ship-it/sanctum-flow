import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Wallet, Award, Coins } from "lucide-react";

export const Route = createFileRoute("/wallet")({
  head: () => ({
    meta: [
      { title: "Your Wallet — Atlas Sanctum" },
      { name: "description", content: "Your holdings, staking positions, and contribution rank inside the Sanctum." },
    ],
  }),
  component: WalletPage,
});

const holdings = [
  { token: "$SCT", name: "Sanctum", amount: "12,400", value: "$8,680", change: "+8.2%" },
  { token: "$MUSICX", name: "Lyra Nova", amount: "3,200", value: "$1,344", change: "+12.4%" },
  { token: "$FRST", name: "Foresta DAO", amount: "850", value: "$2,210", change: "+22.1%" },
  { token: "$EDU", name: "Scholar Net", amount: "1,500", value: "$675", change: "-3.4%" },
];

function WalletPage() {
  const total = 12909;
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex items-center gap-3 mb-2">
          <Wallet className="w-5 h-5 text-primary" />
          <span className="text-xs text-muted-foreground uppercase tracking-wider">Your Wallet</span>
        </div>
        <h1 className="text-4xl font-bold gradient-text glow-text">${total.toLocaleString()}</h1>
        <p className="text-sm text-muted-foreground mt-1">Total portfolio value across the Sanctum</p>

        <div className="grid lg:grid-cols-3 gap-6 mt-8">
          {/* Holdings */}
          <div className="lg:col-span-2 glass-card rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <Coins className="w-4 h-4 text-primary" />
              <h2 className="font-semibold">Holdings</h2>
            </div>
            <div className="divide-y divide-border">
              {holdings.map((h) => (
                <div key={h.token} className="py-4 flex items-center justify-between">
                  <div>
                    <div className="font-mono font-semibold text-secondary">{h.token}</div>
                    <div className="text-xs text-muted-foreground">{h.name}</div>
                  </div>
                  <div className="text-right hidden sm:block">
                    <div className="text-sm">{h.amount}</div>
                    <div className="text-xs text-muted-foreground">tokens</div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">{h.value}</div>
                    <div className={`text-xs ${h.change.startsWith("+") ? "text-success" : "text-destructive"}`}>{h.change}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Stake + Score */}
          <div className="space-y-6">
            <div className="glass-card rounded-2xl p-6">
              <div className="text-sm text-muted-foreground mb-2">🔒 Staking</div>
              <div className="text-2xl font-bold">$4,200</div>
              <div className="text-xs text-muted-foreground">Locked for 30 days</div>
              <div className="mt-4 pt-4 border-t border-border flex justify-between text-sm">
                <span className="text-muted-foreground">Rewards earned</span>
                <span className="text-success font-semibold">+$182.40</span>
              </div>
              <button className="mt-4 w-full py-2.5 rounded-lg bg-gradient-to-r from-primary to-secondary text-primary-foreground text-sm font-semibold hover:opacity-90 transition">
                Claim Rewards
              </button>
            </div>

            <div className="glass-card rounded-2xl p-6 animate-pulse-glow">
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                <Award className="w-4 h-4 text-primary" /> Contribution Score
              </div>
              <div className="text-4xl font-bold gradient-text">847</div>
              <div className="mt-2 inline-block px-3 py-1 rounded-full bg-success/15 text-success text-xs font-semibold">
                Top 10% Contributor 🏆
              </div>
              <p className="text-xs text-muted-foreground mt-3">Earn more by staking, voting, and verifying impact events.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
