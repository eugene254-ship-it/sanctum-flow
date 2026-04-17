import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { ProjectDashboard } from "@/components/ProjectDashboard";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Project Dashboard — Atlas Sanctum" },
      { name: "description", content: "Track your Sanctum Score, value flow, and live impact in one place." },
    ],
  }),
  component: DashboardPage,
});

function DashboardPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <ProjectDashboard projectName="Lyra Nova Records" token="$MUSICX" initialScore={78} />
    </div>
  );
}
