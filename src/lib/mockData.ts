export type Project = {
  id: string;
  creator: string;
  token: string;
  category: "Music" | "Climate" | "Education" | "Art";
  description: string;
  sanctumScore: number;
  impact: string[];
  marketCap: string;
};

export const featuredProjects: Project[] = [
  {
    id: "musicx",
    creator: "Lyra Nova",
    token: "$MUSICX",
    category: "Music",
    description: "Tokenized indie music label rewarding listeners and contributors.",
    sanctumScore: 82,
    impact: ["🌱", "🌍", "🎵"],
    marketCap: "$1.2M",
  },
  {
    id: "foresta",
    creator: "Foresta DAO",
    token: "$FRST",
    category: "Climate",
    description: "On-chain reforestation with verified satellite impact data.",
    sanctumScore: 91,
    impact: ["🌳", "🌍", "💧"],
    marketCap: "$3.4M",
  },
  {
    id: "scholar",
    creator: "Scholar Net",
    token: "$EDU",
    category: "Education",
    description: "Decentralized learning rewards for students and educators.",
    sanctumScore: 74,
    impact: ["📚", "🧠", "🌍"],
    marketCap: "$890K",
  },
  {
    id: "lumen",
    creator: "Lumen Studio",
    token: "$LUMEN",
    category: "Art",
    description: "Generative art collective with shared royalties.",
    sanctumScore: 68,
    impact: ["🎨", "✨", "🤝"],
    marketCap: "$540K",
  },
];
