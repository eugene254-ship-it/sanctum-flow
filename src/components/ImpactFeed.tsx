export function ImpactFeed({ events }: { events: string[] }) {
  return (
    <div className="glass-card rounded-2xl p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="text-sm text-muted-foreground">🌍 Impact Feed</div>
        <div className="flex items-center gap-1.5 text-xs text-success">
          <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
          Live
        </div>
      </div>
      <ul className="space-y-3">
        {events.map((e, i) => (
          <li
            key={`${e}-${i}`}
            className="flex items-start gap-3 text-sm animate-float-up"
            style={{ animationDelay: `${i * 60}ms` }}
          >
            <span className="text-success mt-0.5">✔</span>
            <span className="text-foreground/90">{e}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
