import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  ArrowUpRight,
  ChevronDown,
  ChevronUp,
  Clock,
  ExternalLink,
  Eye,
  Filter,
  Github,
  Play,
  RotateCcw,
  Search,
} from "lucide-react";
import { projectsQueryOptions, type NormalizedProject } from "@/lib/projects";
import { useApp } from "@/lib/app-context";
import { ProjectModal } from "./ProjectModal";

type FilterTab = "all" | "web" | "mobile";
type SortOption = "newest" | "oldest" | "title";

const INITIAL_VISIBLE_COUNT = 6;

function ProjectCard({
  project,
  onOpenDetails,
  isFeaturedCard = false,
}: {
  project: NormalizedProject;
  onOpenDetails: (p: NormalizedProject) => void;
  isFeaturedCard?: boolean;
}) {
  const { t, lang } = useApp();
  const [imgError, setImgError] = useState(false);
  const durationStr = lang === "ar" ? project.durationAr : project.durationEn;

  return (
    <article
      onClick={() => onOpenDetails(project)}
      className={`group relative flex min-w-0 cursor-pointer flex-col overflow-hidden rounded-2xl border bg-card/85 transition-all duration-200 active:scale-[0.99] hover:-translate-y-1 hover:border-emerald-500/50 hover:shadow-lg sm:rounded-3xl ${
        isFeaturedCard
          ? "border-emerald-500/35 bg-gradient-to-b from-secondary/40 to-card"
          : "border-border"
      }`}
    >
      {/* Media Header (Sleek height on mobile, 16:9 on sm+) */}
      <div className="relative aspect-[16/9] max-h-44 w-full overflow-hidden bg-secondary/60 sm:max-h-none">
        {project.image && !imgError ? (
          <img
            src={project.image}
            alt={project.title}
            loading="lazy"
            referrerPolicy="no-referrer"
            onError={() => setImgError(true)}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div
            className={`flex h-full w-full flex-col items-center justify-center bg-gradient-to-br ${project.placeholderBg} p-4 text-center`}
          >
            <span className="text-3xl transition-transform duration-300 group-hover:scale-110 sm:text-4xl">
              {project.icon}
            </span>
            <span className="mt-1.5 line-clamp-1 font-mono text-xs font-bold text-slate-200 sm:mt-2">
              {project.title}
            </span>
          </div>
        )}

        {/* Scrim + Clean Metadata Overlay */}
        <div className="pointer-events-none absolute inset-x-0 top-0 bg-gradient-to-b from-black/75 via-black/30 to-transparent p-2.5 sm:p-3">
          <div
            dir="ltr"
            className="flex items-center justify-end gap-1.5 font-mono text-[11px] font-bold text-white"
          >
            <span>{project.platforms.join(" · ")}</span>
            {project.isFeatured && (
              <>
                <span aria-hidden="true">·</span>
                <span className="text-emerald-300">Featured</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Card Body */}
      <div className="flex flex-1 flex-col p-3.5 sm:p-5">
        <div className="flex items-start gap-2">
          <span className="mt-0.5 shrink-0 text-base sm:text-lg">{project.icon}</span>
          <h3 className="line-clamp-1 text-[15px] font-bold text-foreground transition-colors group-hover:text-emerald-600 dark:group-hover:text-emerald-400 sm:text-lg">
            {project.title}
          </h3>
        </div>

        <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-muted-foreground sm:mt-2 sm:text-sm">
          {project.shortDescription || project.description}
        </p>

        {/* Unboxed Tech Stack Line */}
        {project.techStack.length > 0 && (
          <div
            dir="ltr"
            className="mt-2.5 flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 sm:mt-3"
          >
            {project.techStack.slice(0, 4).map((tech, index) => (
              <span key={tech} className="inline-flex items-center gap-2">
                {index > 0 && (
                  <span aria-hidden="true" className="text-muted-foreground/50">
                    ·
                  </span>
                )}
                <span>{tech}</span>
              </span>
            ))}
            {project.techStack.length > 4 && (
              <span className="text-muted-foreground">+{project.techStack.length - 4}</span>
            )}
          </div>
        )}

        {/* Duration & Details Link */}
        <div className="mt-auto flex items-center justify-between border-t border-border pt-2.5 text-xs text-muted-foreground sm:pt-3">
          {durationStr ? (
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5 text-emerald-500 dark:text-emerald-400" />
              <span>{durationStr}</span>
            </span>
          ) : (
            <span className="font-mono text-[11px] tabular-nums">#{project.id}</span>
          )}

          <span className="inline-flex items-center gap-1 font-semibold text-emerald-600 dark:text-emerald-400 group-hover:underline">
            <span>{t("details")}</span>
            <ArrowUpRight className="h-3.5 w-3.5 rtl:-scale-x-100" />
          </span>
        </div>

        {/* Touch-Friendly Action Buttons (42px min-height on mobile) */}
        <div
          onClick={(e) => e.stopPropagation()}
          className="mt-2.5 flex items-center gap-2 border-t border-border/60 pt-2.5 sm:mt-3 sm:pt-3"
        >
          {project.liveLink ? (
            <a
              href={project.liveLink}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-[42px] flex-1 items-center justify-center gap-1.5 rounded-xl bg-emerald-500/15 px-3 py-2 text-xs font-bold text-emerald-700 dark:text-emerald-300 transition-colors active:scale-[0.98] hover:bg-emerald-500 hover:text-emerald-950 whitespace-nowrap"
            >
              {project.isGooglePlay ? (
                <>
                  <Play className="h-3.5 w-3.5 fill-current shrink-0" />
                  <span>Google Play</span>
                </>
              ) : (
                <>
                  <ExternalLink className="h-3.5 w-3.5 shrink-0" />
                  <span>{t("live_preview")}</span>
                </>
              )}
            </a>
          ) : (
            <button
              type="button"
              onClick={() => onOpenDetails(project)}
              className="inline-flex min-h-[42px] flex-1 items-center justify-center gap-1.5 rounded-xl border border-border bg-secondary/50 px-3 py-2 text-xs font-bold text-foreground transition-colors active:scale-[0.98] hover:border-emerald-500/40 whitespace-nowrap"
            >
              <Eye className="h-3.5 w-3.5 shrink-0" />
              <span>{t("details")}</span>
            </button>
          )}

          {project.githubLink && (
            <a
              href={project.githubLink}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub Repository"
              className="inline-flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-xl border border-border bg-secondary/60 text-foreground transition-colors active:scale-95 hover:border-emerald-500/40 hover:bg-secondary"
            >
              <Github className="h-4 w-4" />
            </a>
          )}

          {project.liveLink && (
            <button
              type="button"
              onClick={() => onOpenDetails(project)}
              aria-label="View Project Details"
              className="inline-flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-xl border border-border bg-secondary/60 text-muted-foreground transition-colors active:scale-95 hover:border-emerald-500/40 hover:text-foreground"
            >
              <Eye className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </article>
  );
}

export function ProjectsSection() {
  const { t, lang } = useApp();
  const { data, isLoading, isError, refetch } = useQuery(projectsQueryOptions);

  const [activeTab, setActiveTab] = useState<FilterTab>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState<SortOption>("newest");
  const [expanded, setExpanded] = useState(false);
  const [selectedProject, setSelectedProject] = useState<NormalizedProject | null>(null);

  const counts = useMemo(() => {
    const list = data ?? [];
    return {
      all: list.length,
      web: list.filter((p) => p.platforms.includes("Web")).length,
      mobile: list.filter((p) => p.platforms.includes("Mobile")).length,
    };
  }, [data]);

  const filteredProjects = useMemo(() => {
    if (!data) return [];
    const q = searchQuery.trim().toLowerCase();

    return data
      .filter((project) => {
        const matchesTab =
          activeTab === "all" ||
          (activeTab === "web" && project.platforms.includes("Web")) ||
          (activeTab === "mobile" && project.platforms.includes("Mobile"));

        const matchesQuery =
          !q ||
          project.title.toLowerCase().includes(q) ||
          project.description.toLowerCase().includes(q) ||
          project.techStack.some((tech) => tech.toLowerCase().includes(q));

        return matchesTab && matchesQuery;
      })
      .sort((a, b) => {
        if (sortOption === "title") {
          return a.title.localeCompare(b.title);
        }
        if (sortOption === "oldest") {
          if (!a.endDate) return 1;
          if (!b.endDate) return -1;
          return new Date(a.endDate).getTime() - new Date(b.endDate).getTime();
        }
        if (a.isFeatured && !b.isFeatured) return -1;
        if (!a.isFeatured && b.isFeatured) return 1;
        if (!a.endDate) return 1;
        if (!b.endDate) return -1;
        return new Date(b.endDate).getTime() - new Date(a.endDate).getTime();
      });
  }, [data, activeTab, searchQuery, sortOption]);

  const featuredList = useMemo(
    () => filteredProjects.filter((p) => p.isFeatured),
    [filteredProjects],
  );
  const regularList = useMemo(
    () => filteredProjects.filter((p) => !p.isFeatured),
    [filteredProjects],
  );

  const visibleRegularList = expanded ? regularList : regularList.slice(0, INITIAL_VISIBLE_COUNT);
  const hasMore = regularList.length > INITIAL_VISIBLE_COUNT;

  const handleResetFilters = () => {
    setActiveTab("all");
    setSearchQuery("");
    setSortOption("newest");
  };

  return (
    <section
      id="projects"
      className="mx-auto max-w-6xl border-t border-border/60 px-4 py-10 sm:px-6 sm:py-20 lg:py-24"
    >
      {/* Section Header */}
      <div className="mb-6 text-center sm:mb-12">
        <p className="text-xs font-bold tracking-wide text-emerald-600 dark:text-emerald-400 sm:text-sm">
          {t("projects_kicker")}
        </p>
        <h2 className="mt-1.5 text-2xl font-black text-balance sm:mt-2 sm:text-4xl md:text-5xl">
          {t("projects_title")}{" "}
          <span className="bg-gradient-to-r from-emerald-500 to-cyan-500 dark:from-emerald-400 dark:to-cyan-400 bg-clip-text text-transparent">
            {t("projects_title_hl")}
          </span>
        </h2>
        <p className="mx-auto mt-2.5 max-w-2xl text-xs leading-relaxed text-muted-foreground sm:mt-3 sm:text-sm md:text-base">
          {t("projects_desc")}
        </p>
      </div>

      {/* Compact Mobile-Responsive Filter, Search & Sort Toolbar */}
      <div className="mb-6 flex flex-col gap-2.5 sm:mb-10 lg:flex-row lg:items-center lg:justify-between">
        {/* Segmented Filter Controls */}
        <div className="grid grid-cols-3 gap-1 rounded-xl border border-border bg-secondary/40 p-1 sm:flex sm:items-center sm:gap-1.5">
          {(
            [
              { id: "all", label: t("projects_filter_all"), count: counts.all },
              { id: "web", label: t("projects_filter_web"), count: counts.web },
              { id: "mobile", label: t("projects_filter_mobile"), count: counts.mobile },
            ] as const
          ).map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`inline-flex min-h-[40px] items-center justify-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-bold transition-all whitespace-nowrap sm:px-4 sm:text-sm ${
                activeTab === tab.id
                  ? "bg-emerald-500 text-emerald-950 shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <span>{tab.label}</span>
              {counts.all > 0 && (
                <span className="font-mono text-[11px] tabular-nums opacity-80">
                  ({tab.count})
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Single-Row Search & Sort (16px font on mobile prevents iOS Safari auto-zoom) */}
        <div className="flex items-center gap-2 lg:w-[440px]">
          <div className="relative min-w-0 flex-1">
            <Search className="pointer-events-none absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={
                lang === "ar" ? "ابحث عن مشروع أو تقنية..." : "Search projects or stack..."
              }
              className="min-h-[44px] w-full rounded-xl border border-border bg-secondary/40 pe-3 ps-9 text-base text-foreground placeholder:text-xs placeholder:text-muted-foreground focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500/40 sm:min-h-[42px] sm:text-sm sm:placeholder:text-sm"
            />
          </div>

          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value as SortOption)}
            aria-label="Sort projects"
            className="min-h-[44px] shrink-0 rounded-xl border border-border bg-secondary/60 px-3 text-base font-semibold text-foreground focus:border-emerald-500 focus:outline-none sm:min-h-[42px] sm:px-3.5 sm:text-sm"
          >
            <option value="newest">{t("projects_sort_newest")}</option>
            <option value="oldest">{t("projects_sort_oldest")}</option>
            <option value="title">{t("projects_sort_title")}</option>
          </select>
        </div>
      </div>

      {/* Loading Skeleton */}
      {isLoading && (
        <div className="grid gap-3.5 sm:gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-72 animate-pulse rounded-2xl border border-border bg-secondary/30 sm:h-80 sm:rounded-3xl"
            />
          ))}
        </div>
      )}

      {/* Error State */}
      {isError && (
        <div className="mx-auto max-w-md rounded-2xl border border-border bg-secondary/40 p-6 text-center sm:rounded-3xl sm:p-8">
          <p className="text-sm font-semibold text-muted-foreground">{t("load_error")}</p>
          <button
            type="button"
            onClick={() => refetch()}
            className="mt-4 inline-flex min-h-[44px] items-center gap-2 rounded-xl bg-emerald-500 px-6 py-2 text-xs font-bold text-emerald-950 transition-opacity hover:opacity-90 whitespace-nowrap sm:text-sm"
          >
            <RotateCcw className="h-4 w-4" />
            <span>{t("retry")}</span>
          </button>
        </div>
      )}

      {/* Empty State */}
      {!isLoading && !isError && filteredProjects.length === 0 && (
        <div className="mx-auto max-w-md rounded-2xl border border-border bg-secondary/30 p-6 text-center sm:rounded-3xl sm:p-8">
          <Filter className="mx-auto h-8 w-8 text-muted-foreground" />
          <h4 className="mt-3 text-base font-bold text-foreground">{t("projects_no_results")}</h4>
          <button
            type="button"
            onClick={handleResetFilters}
            className="mt-4 inline-flex min-h-[42px] items-center gap-2 rounded-xl border border-emerald-500/40 bg-secondary px-5 py-2 text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:bg-secondary/80 whitespace-nowrap"
          >
            <span>{t("projects_clear_filters")}</span>
          </button>
        </div>
      )}

      {/* Projects Grid: Regular Projects on Top, Featured Platforms Below */}
      {!isLoading && !isError && filteredProjects.length > 0 && (
        <div className="space-y-8 sm:space-y-12">
          {regularList.length > 0 && (
            <div>
              <div className="mb-3 flex items-center justify-between px-0.5 sm:mb-3.5">
                <h3 className="text-sm font-bold text-foreground sm:text-base">
                  {t("projects_all_list")}{" "}
                  <span className="font-mono text-muted-foreground tabular-nums">
                    ({regularList.length})
                  </span>
                </h3>
              </div>
              <div className="grid gap-3.5 sm:gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {visibleRegularList.map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    onOpenDetails={setSelectedProject}
                    isFeaturedCard={false}
                  />
                ))}
              </div>

              {hasMore && (
                <div className="mt-6 text-center sm:mt-10">
                  <button
                    type="button"
                    onClick={() => setExpanded(!expanded)}
                    className="inline-flex min-h-[46px] w-full items-center justify-center gap-2 rounded-xl border border-border bg-secondary/50 px-6 py-2.5 text-xs font-bold text-foreground transition-all active:scale-[0.98] hover:border-emerald-500/50 hover:bg-secondary whitespace-nowrap sm:w-auto sm:rounded-full sm:text-sm"
                  >
                    {expanded ? (
                      <>
                        <span>{t("projects_show_less")}</span>
                        <ChevronUp className="h-4 w-4" />
                      </>
                    ) : (
                      <>
                        <span>
                          {t("projects_show_more")} ({regularList.length - INITIAL_VISIBLE_COUNT})
                        </span>
                        <ChevronDown className="h-4 w-4" />
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          )}

          {featuredList.length > 0 && (
            <div className={regularList.length > 0 ? "border-t border-border pt-7 sm:pt-8" : ""}>
              <div className="mb-3 flex items-center justify-between px-0.5 sm:mb-3.5">
                <h3 className="text-sm font-bold text-emerald-600 dark:text-emerald-400 sm:text-base">
                  {t("projects_featured")}
                </h3>
                <span className="font-mono text-xs tabular-nums text-muted-foreground">
                  ({featuredList.length})
                </span>
              </div>
              <div className="grid gap-3.5 sm:gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {featuredList.map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    onOpenDetails={setSelectedProject}
                    isFeaturedCard={true}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Modal Dialog */}
      <ProjectModal
        project={selectedProject}
        allProjects={[...regularList, ...featuredList]}
        onClose={() => setSelectedProject(null)}
        onSelectProject={setSelectedProject}
      />
    </section>
  );
}
