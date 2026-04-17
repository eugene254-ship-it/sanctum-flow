import { Link } from "@tanstack/react-router";
import type { Project } from "@/lib/mockData";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="glass-card rounded-2xl p-5 hover:border-primary/50 transition-all hover:-translate-y-1 group">
      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="text-xs text-muted-foreground uppercase tracking-wider">{project.category}</div>
          <h3 className="font-semibold text-lg mt-1">{project.creator}</h3>
          <div className="text-secondary text-sm font-mono mt-0.5">{project.token}</div>
        </div>
        <div className="text-right">
          <div className="text-xs text-muted-foreground">Score</div>
          <div className="text-xl font-bold gradient-text">{project.sanctumScore}</div>
        </div>
      </div>
      <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{project.description}</p>
      <div className="flex items-center justify-between">
        <div className="flex gap-1 text-lg">
          {project.impact.map((i, idx) => <span key={idx}>{i}</span>)}
        </div>
        <Link
          to="/project/$id"
          params={{ id: project.id }}
          className="text-xs font-semibold text-primary hover:text-secondary transition"
        >
          View Project →
        </Link>
      </div>
    </div>
  );
}
