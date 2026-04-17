import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export type ScorePoint = { t: number; score: number };

export function ScoreHistoryChart({ data }: { data: ScorePoint[] }) {
  return (
    <div className="glass-card rounded-2xl p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="text-sm text-muted-foreground">📈 Sanctum Score History</div>
          <div className="text-xs text-muted-foreground mt-1">Live trajectory of your reputation</div>
        </div>
        <div className="text-xs text-muted-foreground font-mono">{data.length} pts</div>
      </div>
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 5, right: 8, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="scoreFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="oklch(0.72 0.22 295)" stopOpacity={0.6} />
                <stop offset="100%" stopColor="oklch(0.72 0.22 295)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="t"
              tickFormatter={(t) => `T${t}`}
              stroke="oklch(0.6 0.02 270)"
              fontSize={10}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              domain={[0, 100]}
              stroke="oklch(0.6 0.02 270)"
              fontSize={10}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip
              contentStyle={{
                background: "oklch(0.18 0.02 270)",
                border: "1px solid oklch(0.3 0.04 270)",
                borderRadius: 12,
                fontSize: 12,
              }}
              labelStyle={{ color: "oklch(0.7 0.02 270)" }}
              labelFormatter={(t) => `Tick ${t}`}
            />
            <Area
              type="monotone"
              dataKey="score"
              stroke="oklch(0.72 0.22 295)"
              strokeWidth={2}
              fill="url(#scoreFill)"
              isAnimationActive
              animationDuration={600}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
