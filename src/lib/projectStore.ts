import { supabase } from "@/integrations/supabase/client";
import { featuredProjects, type Project } from "./mockData";

export type StoredProject = Project & { isUserCreated?: boolean };

const CATEGORY_IMPACT: Record<string, string[]> = {
  Music: ["🎵", "🌍", "🤝"],
  Climate: ["🌳", "🌍", "💧"],
  Education: ["📚", "🧠", "🌍"],
  Art: ["🎨", "✨", "🤝"],
};

function rowToProject(row: any): StoredProject {
  const cat = (CATEGORY_IMPACT[row.category] ? row.category : "Music") as Project["category"];
  return {
    id: row.id,
    creator: row.name,
    token: row.token,
    category: cat,
    description: row.description || "Newly launched on Atlas Sanctum.",
    sanctumScore: row.sanctum_score ?? 50,
    impact: CATEGORY_IMPACT[cat],
    marketCap: "—",
    isUserCreated: true,
  };
}

export async function fetchAllProjects(): Promise<StoredProject[]> {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) {
    console.error("Failed to load projects", error);
    return featuredProjects as StoredProject[];
  }
  const launched = (data ?? []).map(rowToProject);
  return [...launched, ...(featuredProjects as StoredProject[])];
}

export async function fetchProjectById(id: string): Promise<StoredProject | null> {
  const seeded = featuredProjects.find((p) => p.id === id);
  if (seeded) return seeded;
  const { data, error } = await supabase.from("projects").select("*").eq("id", id).maybeSingle();
  if (error || !data) return null;
  return rowToProject(data);
}

export async function createProject(input: {
  name: string;
  token: string;
  description: string;
  category: string;
  supply: number;
  sanctum_score: number;
}) {
  const { data, error } = await supabase.from("projects").insert(input).select("id").single();
  if (error) throw error;
  return data.id as string;
}
