import { useEffect } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Calendar,
  Clock,
  ExternalLink,
  Github,
  Layers,
  Play,
  X,
} from "lucide-react";
import { useApp } from "@/lib/app-context";
import type { NormalizedProject } from "@/lib/projects";

interface ProjectModalProps {
  project: NormalizedProject | null;
  allProjects: NormalizedProject[];
  onClose: () => void;
  onSelectProject: (p: NormalizedProject) => void;
}

export function ProjectModal({
  project,
  allProjects,
  onClose,
  onSelectProject,
}: ProjectModalProps) {
  const { t, lang } = useApp();

  // Keyboard navigation (Escape to close, Left/Right arrows to navigate)
  useEffect(() => {
    if (!project) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowRight") {
        handleNavigate(lang === "ar" ? -1 : 1);
      } else if (e.key === "ArrowLeft") {
        handleNavigate(lang === "ar" ? 1 : -1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [project, lang, allProjects]);

  if (!project) return null;

  const currentIndex = allProjects.findIndex((p) => p.id === project.id);
  const prevProject = currentIndex > 0 ? allProjects[currentIndex - 1] : null;
  const nextProject = currentIndex < allProjects.length - 1 ? allProjects[currentIndex + 1] : null;

  const handleNavigate = (direction: number) => {
    const newIndex = currentIndex + direction;
    if (newIndex >= 0 && newIndex < allProjects.length) {
      onSelectProject(allProjects[newIndex]);
    }
  };

  const durationStr = lang === "ar" ? project.durationAr : project.durationEn;
  const dateStr = lang === "ar" ? project.formattedDateAr : project.formattedDateEn;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5"
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
      />

      {/* Modal Container */}
      <div className="relative z-10 flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-3xl border border-border/80 bg-[#0E141D] text-foreground shadow-2xl">
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between border-b border-border/60 bg-secondary/40 px-5 py-3.5">
          <div className="flex items-center gap-2">
            <span className="text-xl">{project.icon}</span>
            <span className="font-mono text-xs font-bold text-emerald-400">
              #{project.id} · {project.platforms.join(" & ")}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            {/* Prev / Next buttons */}
            <button
              onClick={() => handleNavigate(-1)}
              disabled={!prevProject}
              aria-label={t("project_modal_prev")}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-border/60 transition-colors hover:bg-secondary disabled:opacity-30"
            >
              <ArrowLeft className="h-4 w-4 rtl:rotate-180" />
            </button>
            <button
              onClick={() => handleNavigate(1)}
              disabled={!nextProject}
              aria-label={t("project_modal_next")}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-border/60 transition-colors hover:bg-secondary disabled:opacity-30"
            >
              <ArrowRight className="h-4 w-4 rtl:rotate-180" />
            </button>
            <button
              onClick={onClose}
              aria-label={t("project_modal_close")}
              className="ms-2 flex h-8 w-8 items-center justify-center rounded-full border border-border/60 bg-secondary/80 text-foreground transition-colors hover:bg-secondary"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-5 sm:p-7">
          {/* Cover Media */}
          <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-border/60 bg-secondary/30">
            {project.image ? (
              <img src={project.image} alt={project.title} className="h-full w-full object-cover" />
            ) : (
              <div
                className={`flex h-full w-full flex-col items-center justify-center bg-gradient-to-br ${project.placeholderBg} p-6 text-center`}
              >
                <span className="text-5xl">{project.icon}</span>
                <span className="mt-3 font-mono text-lg font-bold text-slate-300">
                  {project.title}
                </span>
                <span className="mt-1 text-xs text-emerald-400">
                  {project.platforms.join(" · ")}
                </span>
              </div>
            )}

            {/* Badges Overlay */}
            <div className="absolute end-3 top-3 flex flex-wrap gap-1.5">
              {project.platforms.map((p) => (
                <span
                  key={p}
                  className="rounded-full bg-black/70 px-3 py-1 font-mono text-xs font-bold text-emerald-400 backdrop-blur-md"
                >
                  {p}
                </span>
              ))}
            </div>
          </div>

          {/* Title & Metadata */}
          <div className="mt-5">
            <h2 id="modal-title" className="text-xl font-black text-foreground sm:text-2xl">
              {project.title}
            </h2>

            {/* Meta Tags: duration, date */}
            <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
              {durationStr && (
                <span className="flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5 text-emerald-400" />
                  <span>{durationStr}</span>
                </span>
              )}
              {dateStr && (
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5 text-emerald-400" />
                  <span>{dateStr}</span>
                </span>
              )}
              {project.isFeatured && (
                <span className="rounded-full bg-emerald-500/15 px-2.5 py-0.5 font-mono text-xs font-bold text-emerald-400 ring-1 ring-emerald-500/30">
                  Featured Platform
                </span>
              )}
            </div>
          </div>

          {/* Tech Stack Chips */}
          {project.techStack.length > 0 && (
            <div className="mt-5 border-t border-border/40 pt-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                {t("project_modal_tech")}
              </h4>
              <div className="mt-2.5 flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-xl border border-border/70 bg-secondary/60 px-3 py-1 font-mono text-xs font-semibold text-emerald-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Full Formatted Description */}
          <div className="mt-6 border-t border-border/40 pt-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              {t("project_modal_details")}
            </h4>
            <div className="mt-3 space-y-3 whitespace-pre-line text-sm leading-relaxed text-slate-300">
              {project.fullDescriptionFormatted || project.description}
            </div>
          </div>

          {/* Action Links */}
          <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-border/40 pt-5">
            {project.liveLink && (
              <a
                href={project.liveLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-emerald-500 px-6 py-2.5 text-sm font-bold text-emerald-950 transition-all hover:bg-emerald-400"
              >
                {project.isGooglePlay ? (
                  <>
                    <Play className="h-4 w-4 fill-current" />
                    <span>{t("google_play")}</span>
                  </>
                ) : (
                  <>
                    <ExternalLink className="h-4 w-4" />
                    <span>{t("live_preview")}</span>
                  </>
                )}
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            )}

            {project.githubLink && (
              <a
                href={project.githubLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-border/70 bg-secondary px-5 py-2.5 text-sm font-bold transition-colors hover:border-emerald-500/40 hover:bg-secondary/80"
              >
                <Github className="h-4 w-4" />
                <span>{t("code")}</span>
              </a>
            )}

            <button
              onClick={onClose}
              className="ms-auto inline-flex min-h-[44px] items-center rounded-full border border-border/60 px-5 py-2.5 text-xs font-bold text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              {t("project_modal_close")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
