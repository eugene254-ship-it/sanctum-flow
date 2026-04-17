type Flow = { name: string; value: number; color: string };

export function ValueFlow({ revenue }: { revenue: number }) {
  const data: Flow[] = [
    { name: "Creator", value: 50, color: "from-primary to-primary/70" },
    { name: "Holders", value: 20, color: "from-secondary to-secondary/70" },
    { name: "Contributors", value: 15, color: "from-success to-success/70" },
    { name: "Treasury", value: 10, color: "from-accent-foreground/60 to-accent-foreground/40" },
    { name: "Burn", value: 5, color: "from-destructive to-destructive/70" },
  ];

  return (
    <div className="glass-card rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="text-sm text-muted-foreground">💰 Value Flow</div>
          <div className="text-xs text-muted-foreground mt-1">Auto-distributed in real time</div>
        </div>
        <div className="text-right">
          <div className="text-xs text-muted-foreground">Revenue</div>
          <div className="text-2xl font-bold gradient-text" key={revenue}>
            ${revenue.toLocaleString()}
          </div>
        </div>
      </div>
      <div className="flex h-3 rounded-full overflow-hidden mb-6">
        {data.map((d) => (
          <div
            key={d.name}
            className={`bg-gradient-to-r ${d.color} transition-all duration-500`}
            style={{ width: `${d.value}%` }}
          />
        ))}
      </div>
      <div className="space-y-3">
        {data.map((d) => (
          <div key={d.name} className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-3">
              <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${d.color}`} />
              <span className="text-foreground">{d.name}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-muted-foreground text-xs">
                ${Math.round((revenue * d.value) / 100).toLocaleString()}
              </span>
              <span className="font-semibold text-foreground w-10 text-right">{d.value}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
