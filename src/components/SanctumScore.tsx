type Props = {
  score: number;
  delta?: number;
  size?: "sm" | "lg";
  breakdown?: { label: string; value: number }[];
};

export function SanctumScore({ score, delta, size = "sm", breakdown }: Props) {
  const isLarge = size === "lg";
  const circumference = 2 * Math.PI * 52;
  const offset = circumference - (score / 100) * circumference;

  if (!isLarge) {
    return (
      <div className="flex items-center gap-2">
        <div className="text-2xl">🔮</div>
        <div>
          <div className="text-xs text-muted-foreground">Sanctum Score</div>
          <div className="font-bold text-lg gradient-text">{score}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card rounded-2xl p-6 animate-pulse-glow">
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="text-sm text-muted-foreground">🔮 Sanctum Score</div>
          <div className="text-xs text-muted-foreground mt-1">Your living reputation</div>
        </div>
        {delta !== undefined && (
          <div className="text-success text-sm font-semibold animate-float-up" key={delta}>
            ↑ +{delta} this week
          </div>
        )}
      </div>
      <div className="flex items-center gap-8">
        <div className="relative w-32 h-32 shrink-0">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
            <circle cx="60" cy="60" r="52" fill="none" stroke="var(--muted)" strokeWidth="8" />
            <circle
              cx="60" cy="60" r="52" fill="none"
              stroke="url(#scoreGrad)" strokeWidth="8" strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              style={{ transition: "stroke-dashoffset 0.8s ease-out" }}
            />
            <defs>
              <linearGradient id="scoreGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="oklch(0.72 0.22 295)" />
                <stop offset="100%" stopColor="oklch(0.78 0.16 220)" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-4xl font-bold gradient-text glow-text" key={score}>{score}</div>
            <div className="text-[10px] text-muted-foreground uppercase tracking-wider">/ 100</div>
          </div>
        </div>
        {breakdown && (
          <div className="flex-1 space-y-2">
            {breakdown.map((b) => (
              <div key={b.label}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-muted-foreground">{b.label}</span>
                  <span className="text-foreground font-medium">{b.value}</span>
                </div>
                <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-700"
                    style={{ width: `${b.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
