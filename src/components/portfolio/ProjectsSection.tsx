import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ArrowUpRight, Calendar, ChevronDown, ChevronUp, Clock, Github, Layers } from "lucide-react";
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
    <article className="surface-card group flex flex-col overflow-hidden rounded-2xl transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/40 sm:rounded-3xl">
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
            <Layers className="h-8 w-8 sm:h-10 sm:w-10" />
          </div>
        )}
        {project.project_type && (
          <span className="absolute end-2 top-2 rounded-full bg-background/80 px-2.5 py-0.5 text-xs font-semibold text-primary backdrop-blur sm:end-3 sm:top-3 sm:px-3 sm:py-1">
            {project.project_type}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4 sm:gap-3 sm:p-5">
        <h3 className="text-base font-bold leading-snug sm:text-lg">{project.title}</h3>
        <p className="line-clamp-3 text-xs leading-relaxed text-muted-foreground sm:text-sm">
          {project.description}
        </p>

        <div className="mt-auto flex flex-wrap items-center gap-2 pt-2 text-xs text-muted-foreground sm:gap-3">
          {project.duration && project.duration !== "None" && (
            <span className="inline-flex items-center gap-0.5 sm:gap-1">
              <Clock className="h-3 w-3 sm:h-3.5 sm:w-3.5" /> {project.duration}
            </span>
          )}
          {project.end_date && project.end_date !== "None" && (
            <span className="inline-flex items-center gap-0.5 sm:gap-1">
              <Calendar className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
              {new Date(project.end_date).toLocaleDateString(lang === "ar" ? "ar-EG" : "en-US", {
                year: "numeric",
                month: "long",
              })}
            </span>
          )}
        </div>

        <div className="flex flex-wrap gap-2 pt-2 sm:gap-2 sm:pt-3">
          {live && (
            <a
              href={live}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-[40px] items-center justify-center gap-1 rounded-full bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground transition-opacity hover:opacity-90 sm:px-4 sm:py-2 sm:text-sm"
            >
              {t("live_preview")} <ArrowUpRight className="h-3 w-3 sm:h-4 sm:w-4" />
            </a>
          )}
          {repo && (
            <a
              href={repo}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-[40px] items-center justify-center gap-1 rounded-full border border-border px-3 py-1.5 text-xs font-semibold transition-colors hover:bg-secondary sm:px-4 sm:py-2 sm:text-sm"
            >
              <Github className="h-3 w-3 sm:h-4 sm:w-4" /> {t("code")}
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

const INITIAL_VISIBLE = 6;

export function ProjectsSection() {
  const { t } = useApp();
  const { data, isLoading, isError, refetch } = useQuery(projectsQueryOptions);
  const [filter, setFilter] = useState<string>("__all__");
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    setExpanded(false);
  }, [filter]);

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

  const visibleProjects = expanded ? projects : projects.slice(0, INITIAL_VISIBLE);
  const hasMore = projects.length > INITIAL_VISIBLE;

  return (
    <section id="projects" className="mx-auto max-w-6xl px-4 py-16 sm:px-5 sm:py-20 lg:py-24">
      <div className="mb-6 text-center sm:mb-8 lg:mb-10">
        <p className="text-xs font-semibold uppercase tracking-widest text-primary sm:text-sm">
          {t("projects_kicker")}
        </p>
        <h2 className="mt-2 text-2xl font-extrabold sm:text-3xl md:text-4xl">
          {t("projects_title")} <span className="text-gradient">{t("projects_title_hl")}</span>
        </h2>
        <p className="mx-auto mt-2 max-w-xl text-xs text-muted-foreground sm:mt-3 sm:text-sm md:text-base">
          {t("projects_desc")}
        </p>
      </div>

      {types.length > 1 && (
        <div className="mb-6 flex flex-wrap justify-center gap-2 sm:mb-8">
          {types.map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`min-h-[36px] rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors sm:px-4 sm:py-2 sm:text-sm ${
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
        <div className="grid gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="surface-card h-72 animate-pulse rounded-2xl opacity-60 sm:h-80 sm:rounded-3xl"
            />
          ))}
        </div>
      )}

      {isError && (
        <div className="surface-card mx-auto max-w-md rounded-2xl p-6 text-center sm:rounded-3xl sm:p-8">
          <p className="text-xs text-muted-foreground sm:text-sm">{t("load_error")}</p>
          <button
            onClick={() => refetch()}
            className="mt-3 min-h-[40px] rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground sm:mt-4 sm:px-5 sm:text-sm"
          >
            {t("retry")}
          </button>
        </div>
      )}

      {!isLoading && !isError && (
        <>
          <div className="grid gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {visibleProjects.map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>

          {hasMore && (
            <div className="mt-6 text-center sm:mt-8">
              <button
                onClick={() => setExpanded((v) => !v)}
                className="inline-flex min-h-[40px] items-center justify-center gap-2 rounded-full border border-border px-5 py-2 text-xs font-semibold transition-colors hover:bg-secondary sm:px-6 sm:py-3 sm:text-sm"
              >
                {expanded ? (
                  <>
                    {t("projects_show_less")}
                    <ChevronUp className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  </>
                ) : (
                  <>
                    {t("projects_show_more")} ({projects.length - INITIAL_VISIBLE})
                    <ChevronDown className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  </>
                )}
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
}
