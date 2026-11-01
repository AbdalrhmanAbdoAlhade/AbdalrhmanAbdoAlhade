import { useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Calendar,
  Clock,
  ExternalLink,
  Github,
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
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    setImgError(false);
  }, [project?.id]);

  useEffect(() => {
    if (!project) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const currentIndex = allProjects.findIndex((p) => p.id === project.id);
    const navigateBy = (dir: number) => {
      const nextIdx = currentIndex + dir;
      if (nextIdx >= 0 && nextIdx < allProjects.length) {
        onSelectProject(allProjects[nextIdx]);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowRight") {
        navigateBy(lang === "ar" ? -1 : 1);
      } else if (e.key === "ArrowLeft") {
        navigateBy(lang === "ar" ? 1 : -1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, lang, allProjects, onClose, onSelectProject]);

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
      className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-5"
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
      />

      {/* Modal Bottom Sheet Container */}
      <div className="relative z-10 flex max-h-[90dvh] w-full max-w-3xl flex-col overflow-hidden rounded-t-3xl border border-border bg-card text-card-foreground shadow-2xl sm:rounded-3xl">
        {/* Mobile Drag Handle Affordance */}
        <div className="mx-auto mt-2.5 h-1.5 w-10 shrink-0 rounded-full bg-muted-foreground/30 sm:hidden" />

        {/* Top Bar (40px+ Touch Targets) */}
        <div className="flex items-center justify-between border-b border-border bg-secondary/30 px-4 py-2.5 sm:px-5 sm:py-3.5">
          <div className="flex min-w-0 items-center gap-2">
            <span className="shrink-0 text-lg">{project.icon}</span>
            <span
              dir="ltr"
              className="truncate font-mono text-xs font-bold text-emerald-600 dark:text-emerald-400"
            >
              #{project.id} · {project.platforms.join(" & ")}
            </span>
          </div>

          <div className="flex shrink-0 items-center gap-1.5">
            <button
              type="button"
              onClick={() => handleNavigate(-1)}
              disabled={!prevProject}
              aria-label={t("project_modal_prev")}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border transition-colors active:scale-95 hover:bg-secondary disabled:opacity-30"
            >
              <ArrowLeft className="h-4 w-4 rtl:rotate-180" />
            </button>
            <button
              type="button"
              onClick={() => handleNavigate(1)}
              disabled={!nextProject}
              aria-label={t("project_modal_next")}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border transition-colors active:scale-95 hover:bg-secondary disabled:opacity-30"
            >
              <ArrowRight className="h-4 w-4 rtl:rotate-180" />
            </button>
            <button
              type="button"
              onClick={onClose}
              aria-label={t("project_modal_close")}
              className="ms-1 flex h-10 w-10 items-center justify-center rounded-full border border-border bg-secondary text-foreground transition-colors active:scale-95 hover:bg-secondary/80"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Body */}
        <div className="overflow-y-auto p-4 sm:p-6">
          {/* Cover Media */}
          <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-border bg-secondary/30">
            {project.image && !imgError ? (
              <img
                src={project.image}
                alt={project.title}
                referrerPolicy="no-referrer"
                onError={() => setImgError(true)}
                className="h-full w-full object-cover"
              />
            ) : (
              <div
                className={`flex h-full w-full flex-col items-center justify-center bg-gradient-to-br ${project.placeholderBg} p-6 text-center`}
              >
                <span className="text-4xl sm:text-5xl">{project.icon}</span>
                <span className="mt-2 font-mono text-sm font-bold text-slate-200 sm:mt-3 sm:text-lg">
                  {project.title}
                </span>
                <span className="mt-1 text-xs text-emerald-300">
                  {project.platforms.join(" · ")}
                </span>
              </div>
            )}
          </div>

          {/* Title & Metadata */}
          <div className="mt-4 sm:mt-5">
            <h2 id="modal-title" className="text-lg font-black text-foreground sm:text-2xl">
              {project.title}
            </h2>

            <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
              {durationStr && (
                <span className="flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5 text-emerald-500 dark:text-emerald-400" />
                  <span>{durationStr}</span>
                </span>
              )}
              {dateStr && (
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5 text-emerald-500 dark:text-emerald-400" />
                  <span>{dateStr}</span>
                </span>
              )}
              {project.isFeatured && (
                <span className="font-mono text-xs font-bold text-emerald-600 dark:text-emerald-400">
                  · Featured Platform
                </span>
              )}
            </div>
          </div>

          {/* Tech Stack */}
          {project.techStack.length > 0 && (
            <div className="mt-4 border-t border-border pt-3.5">
              <h4 className="text-xs font-bold text-muted-foreground">{t("project_modal_tech")}</h4>
              <div
                dir="ltr"
                className="mt-2 flex flex-wrap items-center gap-x-2.5 gap-y-1.5 font-mono text-xs font-semibold text-emerald-600 dark:text-emerald-400"
              >
                {project.techStack.map((tech, idx) => (
                  <span key={tech} className="inline-flex items-center gap-2.5">
                    {idx > 0 && <span className="text-muted-foreground/50">·</span>}
                    <span>{tech}</span>
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Description */}
          <div className="mt-4 border-t border-border pt-3.5">
            <h4 className="text-xs font-bold text-muted-foreground">
              {t("project_modal_details")}
            </h4>
            <div className="mt-2 whitespace-pre-line text-xs leading-relaxed text-foreground/90 sm:text-sm">
              {project.fullDescriptionFormatted || project.description}
            </div>
          </div>
        </div>

        {/* Sticky Bottom Action Bar with Safe-Area Padding */}
        <div className="flex flex-wrap items-center gap-2 border-t border-border bg-secondary/30 px-4 pt-3 pb-[max(0.85rem,env(safe-area-inset-bottom))] sm:gap-2.5 sm:px-6 sm:py-4">
          {project.liveLink && (
            <a
              href={project.liveLink}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-[46px] flex-1 items-center justify-center gap-2 rounded-xl bg-emerald-500 px-5 py-2.5 text-xs font-bold text-emerald-950 transition-colors active:scale-[0.98] hover:bg-emerald-400 whitespace-nowrap sm:flex-initial sm:rounded-full sm:text-sm"
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
              className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-xl border border-border bg-secondary px-4 py-2.5 text-xs font-bold text-foreground transition-colors active:scale-[0.98] hover:border-emerald-500/40 whitespace-nowrap sm:rounded-full sm:text-sm"
            >
              <Github className="h-4 w-4" />
              <span>{t("code")}</span>
            </a>
          )}

          <button
            type="button"
            onClick={onClose}
            className="ms-auto inline-flex min-h-[46px] items-center justify-center rounded-xl border border-border px-4 py-2.5 text-xs font-bold text-muted-foreground transition-colors active:scale-[0.98] hover:bg-secondary hover:text-foreground whitespace-nowrap sm:rounded-full"
          >
            {t("project_modal_close")}
          </button>
        </div>
      </div>
    </div>
  );
}
