import { createFileRoute, Link, notFound, useRouter } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { ProjectDashboard } from "@/components/ProjectDashboard";
import { fetchProjectById } from "@/lib/projectStore";

export const Route = createFileRoute("/project/$id")({
  loader: async ({ params }) => {
    const project = await fetchProjectById(params.id);
    if (!project) throw notFound();
    return { project };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.project.creator ?? "Project"} — Atlas Sanctum` },
      { name: "description", content: loaderData?.project.description ?? "Live project on Atlas Sanctum." },
    ],
  }),
  errorComponent: ({ error }) => {
    const router = useRouter();
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-muted-foreground">Failed to load project: {error.message}</p>
        <button onClick={() => router.invalidate()} className="px-4 py-2 rounded-lg glass-card">Retry</button>
      </div>
    );
  },
  notFoundComponent: () => (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <h1 className="text-2xl font-bold">Project not found</h1>
      <Link to="/" className="text-primary hover:text-secondary">← Back to Explore</Link>
    </div>
  ),
  component: ProjectPage,
});

function ProjectPage() {
  const { project } = Route.useLoaderData();
  return (
    <div className="min-h-screen">
      <Navbar />
      <ProjectDashboard
        projectName={project.creator}
        token={project.token}
        initialScore={project.sanctumScore}
      />
    </div>
  );
}
