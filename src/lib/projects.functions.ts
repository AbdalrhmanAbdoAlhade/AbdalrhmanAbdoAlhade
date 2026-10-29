import { createServerFn } from "@tanstack/react-start";

const API_BASE = "https://api.zh-innovation.tech";

interface RawProject {
  id: number | string;
  title?: string | null;
  description?: string | null;
  image?: string | null;
  github_link?: string | null;
  live_link?: string | null;
  project_type?: string | null;
  duration?: string | null;
  end_date?: string | null;
}

export interface ProjectDTO {
  id: number;
  title: string;
  description: string;
  image: string | null;
  githubLink: string | null;
  liveLink: string | null;
  projectType: "web" | "mobile";
  duration: string | null;
  year: string | null;
}

function clean(value: string | null | undefined): string | null {
  if (!value) return null;
  const v = value.trim();
  if (!v || v.toLowerCase() === "none" || v.toLowerCase() === "null") return null;
  return v;
}

function normalizeDuration(raw: string | null | undefined): string | null {
  const v = clean(raw);
  if (!v) return null;
  if (/^\d+$/.test(v)) return `${v} شهور`;
  return v;
}

function toAbsoluteImage(raw: string | null | undefined): string | null {
  const v = clean(raw);
  if (!v) return null;
  if (v.startsWith("http")) return v;
  return `${API_BASE}${v.startsWith("/") ? "" : "/"}${v}`;
}

export const fetchProjects = createServerFn({ method: "GET" }).handler(async () => {
  try {
    const res = await fetch(`${API_BASE}/api/projects`, {
      headers: { Accept: "application/json" },
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) return [] as ProjectDTO[];
    const raw = (await res.json()) as RawProject[];
    if (!Array.isArray(raw)) return [] as ProjectDTO[];
    const projects = raw.map((p) => {
      const type = (p.project_type ?? "").toLowerCase();
      return {
        id: Number(p.id),
        title: p.title ?? "",
        description: p.description ?? "",
        image: toAbsoluteImage(p.image),
        githubLink: clean(p.github_link),
        liveLink: clean(p.live_link),
        projectType: type.includes("web") ? ("web" as const) : ("mobile" as const),
        duration: normalizeDuration(p.duration),
        year: (p.end_date ?? "").slice(0, 4) || null,
      };
    });
    return projects;
  } catch (error) {
    console.error("fetchProjects failed", error);
    return [] as ProjectDTO[];
  }
});
