export const API_BASE = "https://api-faz.rouqy-jewellery.com";

export type ApiProject = {
  id: number | string;
  title: string;
  description: string;
  image: string | null;
  github_link: string | null;
  live_link: string | null;
  project_type: string | null;
  duration: string | null;
  end_date: string | null;
  location: string | null;
};

const clean = (v: string | null | undefined) =>
  !v || v === "None" || v === "null" ? null : v;

export const imageUrl = (path: string | null | undefined) => {
  const p = clean(path);
  if (!p) return null;
  return p.startsWith("http") ? p : `${API_BASE}${p}`;
};

export const link = clean;

export async function fetchProjects(): Promise<ApiProject[]> {
  const res = await fetch(`${API_BASE}/api/projects`);
  if (!res.ok) throw new Error("failed to load projects");
  const data = await res.json();
  return Array.isArray(data) ? data : (data?.data ?? []);
}

export const projectsQueryOptions = {
  queryKey: ["projects"],
  queryFn: fetchProjects,
  staleTime: 5 * 60 * 1000,
};
