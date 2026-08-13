import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ArrowUpRight, Calendar, Clock, Github, Layers } from "lucide-react";
import {
  imageUrl,
  link,
  projectsQueryOptions,
  type ApiProject,
} from "@/lib/projects";
import { useApp } from "@/lib/app-context";

function ProjectCard({ project }: { project: ApiProject }) {
  const { t, lang } = useApp();
  const img = imageUrl(project.image);
  const live = link(project.live_link);
  const repo = link(project.github_link);

  return (
    <article className="surface-card group flex flex-col overflow-hidden rounded-3xl transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/40">
      <div className="relative aspect-[16/10] overflow-hidden bg-secondary">
        {img ? (
          <img
            src={img}
            alt={project.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-muted-foreground">
            <Layers className="h-10 w-10" />
          </div>
        )}
        {project.project_type && (
          <span className="absolute end-3 top-3 rounded-full bg-background/80 px-3 py-1 text-xs font-semibold text-primary backdrop-blur">
            {project.project_type}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <h3 className="text-lg font-bold leading-snug">{project.title}</h3>
        <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">
          {project.description}
        </p>

        <div className="mt-auto flex flex-wrap items-center gap-3 pt-2 text-xs text-muted-foreground">
          {project.duration && project.duration !== "None" && (
            <span className="inline-flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" /> {project.duration}
            </span>
          )}
          {project.end_date && project.end_date !== "None" && (
            <span className="inline-flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" />
              {new Date(project.end_date).toLocaleDateString(lang === "ar" ? "ar-EG" : "en-US", {
                year: "numeric",
                month: "long",
              })}
            </span>
          )}
        </div>

        <div className="flex flex-wrap gap-2 pt-3">
          {live && (
            <a
              href={live}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            >
              {t("live_preview")} <ArrowUpRight className="h-4 w-4" />
            </a>
          )}
          {repo && (
            <a
              href={repo}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 rounded-full border border-border px-4 py-2 text-sm font-semibold transition-colors hover:bg-secondary"
            >
              <Github className="h-4 w-4" /> {t("code")}
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

export function ProjectsSection() {
  const { t } = useApp();
  const { data, isLoading, isError, refetch } = useQuery(projectsQueryOptions);
  const [filter, setFilter] = useState<string>("__all__");

  const types = useMemo(() => {
    const set = new Set<string>();
    (data ?? []).forEach((p) => p.project_type && set.add(p.project_type));
    return ["__all__", ...Array.from(set)];
  }, [data]);

  const projects = useMemo(
    () =>
      (data ?? []).filter((p) => filter === "__all__" || p.project_type === filter),
    [data, filter],
  );

  return (
    <section id="projects" className="mx-auto max-w-6xl px-5 py-24">
      <div className="mb-10 text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-primary">
          {t("projects_kicker")}
        </p>
        <h2 className="mt-2 text-3xl font-extrabold sm:text-4xl">
          {t("projects_title")} <span className="text-gradient">{t("projects_title_hl")}</span>
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
          {t("projects_desc")}
        </p>
      </div>

      {types.length > 1 && (
        <div className="mb-8 flex flex-wrap justify-center gap-2">
          {types.map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
                filter === type
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border text-muted-foreground hover:bg-secondary"
              }`}
            >
              {type === "__all__" ? t("all") : type}
            </button>
          ))}

        </div>
      )}

      {isLoading && (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="surface-card h-80 animate-pulse rounded-3xl opacity-60"
            />
          ))}
        </div>
      )}

      {isError && (
        <div className="surface-card mx-auto max-w-md rounded-3xl p-8 text-center">
          <p className="text-muted-foreground">{t("load_error")}</p>
          <button
            onClick={() => refetch()}
            className="mt-4 rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground"
          >
            {t("retry")}
          </button>
        </div>
      )}

      {!isLoading && !isError && (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>
      )}
    </section>
  );
}
