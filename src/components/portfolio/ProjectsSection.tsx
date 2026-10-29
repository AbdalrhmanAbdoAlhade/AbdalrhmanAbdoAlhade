import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  ArrowUpRight,
  Calendar,
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
  Sparkles,
} from "lucide-react";
import { projectsQueryOptions, type NormalizedProject, type ProjectPlatform } from "@/lib/projects";
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
  const durationStr = lang === "ar" ? project.durationAr : project.durationEn;

  return (
    <article
      onClick={() => onOpenDetails(project)}
      className={`group relative flex cursor-pointer flex-col overflow-hidden rounded-3xl border border-border/70 bg-secondary/30 transition-all duration-300 hover:-translate-y-1.5 hover:border-emerald-500/50 hover:bg-secondary/60 hover:shadow-xl hover:shadow-emerald-500/5 ${
        isFeaturedCard
          ? "border-emerald-500/30 bg-gradient-to-b from-secondary/50 to-secondary/20"
          : ""
      }`}
    >
      {/* 16:9 Image or Gradient Fallback */}
      <div className="relative aspect-video w-full overflow-hidden bg-secondary/60">
        {project.image ? (
          <img
            src={project.image}
            alt={project.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div
            className={`flex h-full w-full flex-col items-center justify-center bg-gradient-to-br ${project.placeholderBg} p-4 text-center`}
          >
            <span className="text-4xl transition-transform duration-300 group-hover:scale-110">
              {project.icon}
            </span>
            <span className="mt-2 line-clamp-1 font-mono text-xs font-bold text-slate-300">
              {project.title}
            </span>
          </div>
        )}

        {/* Platform Badges */}
        <div className="absolute end-2.5 top-2.5 flex flex-wrap gap-1">
          {project.platforms.map((p) => (
            <span
              key={p}
              className="rounded-full bg-black/75 px-2.5 py-0.5 font-mono text-[11px] font-bold text-emerald-400 backdrop-blur-md"
            >
              {p}
            </span>
          ))}
          {project.isFeatured && (
            <span className="flex items-center gap-1 rounded-full bg-emerald-500/90 px-2.5 py-0.5 font-mono text-[11px] font-black text-emerald-950">
              <Sparkles className="h-2.5 w-2.5" />
              Featured
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        {/* Title */}
        <div className="flex items-start gap-2">
          <span className="mt-0.5 text-lg shrink-0">{project.icon}</span>
          <h3 className="line-clamp-1 text-base font-bold text-foreground transition-colors group-hover:text-emerald-400 sm:text-lg">
            {project.title}
          </h3>
        </div>

        {/* Short Excerpt */}
        <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-muted-foreground sm:text-sm">
          {project.shortDescription || project.description}
        </p>

        {/* Tech Chips (Max 5) */}
        {project.techStack.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {project.techStack.slice(0, 5).map((tech) => (
              <span
                key={tech}
                className="rounded-lg border border-border/60 bg-secondary/60 px-2 py-0.5 font-mono text-[10px] font-semibold text-emerald-300/90"
              >
                {tech}
              </span>
            ))}
            {project.techStack.length > 5 && (
              <span className="rounded-lg bg-secondary/80 px-1.5 py-0.5 font-mono text-[10px] font-bold text-muted-foreground">
                +{project.techStack.length - 5}
              </span>
            )}
          </div>
        )}

        {/* Duration & Metadata Row */}
        <div className="mt-auto flex items-center justify-between border-t border-border/40 pt-3 text-xs text-muted-foreground">
          {durationStr ? (
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3 text-emerald-400" />
              <span>{durationStr}</span>
            </span>
          ) : (
            <span className="font-mono text-[11px] text-muted-foreground/80">#{project.id}</span>
          )}

          <span className="font-semibold text-emerald-400 group-hover:underline flex items-center gap-1">
            {t("details")} <ArrowUpRight className="h-3 w-3 rtl:rotate-90" />
          </span>
        </div>

        {/* Action Buttons */}
        <div
          onClick={(e) => e.stopPropagation()}
          className="mt-3 flex flex-wrap items-center gap-2 pt-2 border-t border-border/30"
        >
          {project.liveLink && (
            <a
              href={project.liveLink}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-[34px] flex-1 items-center justify-center gap-1.5 rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-bold text-emerald-400 transition-colors hover:bg-emerald-500 hover:text-emerald-950"
            >
              {project.isGooglePlay ? (
                <>
                  <Play className="h-3 w-3 fill-current" />
                  <span>Google Play</span>
                </>
              ) : (
                <>
                  <ExternalLink className="h-3 w-3" />
                  <span>{t("live_preview")}</span>
                </>
              )}
            </a>
          )}

          {project.githubLink && (
            <a
              href={project.githubLink}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub Repository"
              className="inline-flex min-h-[34px] items-center justify-center rounded-full border border-border/60 bg-secondary/60 px-3 py-1 text-xs font-bold text-foreground transition-colors hover:border-emerald-500/40 hover:bg-secondary"
            >
              <Github className="h-3.5 w-3.5" />
            </a>
          )}

          <button
            onClick={() => onOpenDetails(project)}
            aria-label="View Project Details"
            className="inline-flex min-h-[34px] items-center justify-center rounded-full border border-border/60 bg-secondary/60 px-3 py-1 text-xs font-bold text-muted-foreground transition-colors hover:border-emerald-500/40 hover:text-foreground"
          >
            <Eye className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </article>
  );
}

export function ProjectsSection() {
  const { t } = useApp();
  const { data, isLoading, isError, refetch } = useQuery(projectsQueryOptions);

  const [activeTab, setActiveTab] = useState<FilterTab>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState<SortOption>("newest");
  const [expanded, setExpanded] = useState(false);
  const [selectedProject, setSelectedProject] = useState<NormalizedProject | null>(null);

  // Filter & Sort Logic
  const filteredProjects = useMemo(() => {
    if (!data) return [];
    const q = searchQuery.trim().toLowerCase();

    return data
      .filter((project) => {
        // Platform filter
        const matchesTab =
          activeTab === "all" ||
          (activeTab === "web" && project.platforms.includes("Web")) ||
          (activeTab === "mobile" && project.platforms.includes("Mobile"));

        // Search query filter (matches title, techStack, description)
        const matchesQuery =
          !q ||
          project.title.toLowerCase().includes(q) ||
          project.description.toLowerCase().includes(q) ||
          project.techStack.some((t) => t.toLowerCase().includes(q));

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
        // newest (default)
        if (a.isFeatured && !b.isFeatured) return -1;
        if (!a.isFeatured && b.isFeatured) return 1;
        if (!a.endDate) return 1;
        if (!b.endDate) return -1;
        return new Date(b.endDate).getTime() - new Date(a.endDate).getTime();
      });
  }, [data, activeTab, searchQuery, sortOption]);

  // Featured vs Regular Projects
  const featuredList = useMemo(() => {
    return filteredProjects.filter((p) => p.isFeatured);
  }, [filteredProjects]);

  const regularList = useMemo(() => {
    return filteredProjects.filter((p) => !p.isFeatured);
  }, [filteredProjects]);

  const visibleRegularList = expanded ? regularList : regularList.slice(0, INITIAL_VISIBLE_COUNT);

  const hasMore = regularList.length > INITIAL_VISIBLE_COUNT;

  const handleResetFilters = () => {
    setActiveTab("all");
    setSearchQuery("");
    setSortOption("newest");
  };

  return (
    <section id="projects" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:py-24">
      {/* Section Header */}
      <div className="mb-10 text-center sm:mb-14">
        <p className="text-xs font-bold uppercase tracking-widest text-emerald-400 sm:text-sm">
          {t("projects_kicker")}
        </p>
        <h2 className="mt-2 text-2xl font-black sm:text-4xl md:text-5xl">
          {t("projects_title")}{" "}
          <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
            {t("projects_title_hl")}
          </span>
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-xs text-muted-foreground sm:text-sm md:text-base">
          {t("projects_desc")}
        </p>
      </div>

      {/* Interactive Controls Bar: Filters, Search, Sort */}
      <div className="mb-8 flex flex-col gap-3.5 sm:mb-10 md:flex-row md:items-center md:justify-between">
        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          {(
            [
              { id: "all", label: t("projects_filter_all") },
              { id: "web", label: t("projects_filter_web") },
              { id: "mobile", label: t("projects_filter_mobile") },
            ] as const
          ).map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`min-h-[38px] rounded-full px-4 py-1.5 text-xs font-bold transition-all sm:text-sm ${
                activeTab === tab.id
                  ? "bg-emerald-500 text-emerald-950 shadow-md shadow-emerald-500/20"
                  : "border border-border/70 bg-secondary/40 text-muted-foreground hover:bg-secondary hover:text-foreground"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search & Sort Row */}
        <div className="flex flex-1 items-center gap-2.5 md:max-w-md md:justify-end">
          {/* Instant Search Input */}
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute start-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t("projects_search")}
              className="min-h-[40px] w-full rounded-full border border-border/70 bg-secondary/40 pe-3 ps-9 text-xs text-foreground placeholder:text-muted-foreground focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500/40 sm:text-sm"
            />
          </div>

          {/* Sort Dropdown */}
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value as SortOption)}
            className="min-h-[40px] rounded-full border border-border/70 bg-secondary/60 px-3 text-xs font-semibold text-foreground focus:border-emerald-500 focus:outline-none sm:text-sm"
          >
            <option value="newest">{t("projects_sort_newest")}</option>
            <option value="oldest">{t("projects_sort_oldest")}</option>
            <option value="title">{t("projects_sort_title")}</option>
          </select>
        </div>
      </div>

      {/* Loading Skeleton */}
      {isLoading && (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-80 animate-pulse rounded-3xl border border-border/50 bg-secondary/30"
            />
          ))}
        </div>
      )}

      {/* Error State */}
      {isError && (
        <div className="mx-auto max-w-md rounded-3xl border border-border/80 bg-secondary/40 p-8 text-center shadow-lg">
          <p className="text-sm font-semibold text-muted-foreground">{t("load_error")}</p>
          <button
            onClick={() => refetch()}
            className="mt-4 inline-flex min-h-[40px] items-center gap-2 rounded-full bg-emerald-500 px-6 py-2 text-xs font-bold text-emerald-950 transition-opacity hover:opacity-90 sm:text-sm"
          >
            <RotateCcw className="h-4 w-4" />
            <span>{t("retry")}</span>
          </button>
        </div>
      )}

      {/* Empty State */}
      {!isLoading && !isError && filteredProjects.length === 0 && (
        <div className="mx-auto max-w-md rounded-3xl border border-border/60 bg-secondary/30 p-8 text-center">
          <Filter className="mx-auto h-8 w-8 text-muted-foreground" />
          <h4 className="mt-3 text-base font-bold text-foreground">{t("projects_no_results")}</h4>
          <button
            onClick={handleResetFilters}
            className="mt-4 inline-flex min-h-[38px] items-center gap-2 rounded-full border border-emerald-500/40 bg-secondary px-5 py-2 text-xs font-bold text-emerald-400 hover:bg-secondary/80"
          >
            <span>{t("projects_clear_filters")}</span>
          </button>
        </div>
      )}

      {/* Projects Grid */}
      {!isLoading && !isError && filteredProjects.length > 0 && (
        <div className="space-y-10 sm:space-y-12">
          {/* Featured Showcase */}
          {featuredList.length > 0 && (
            <div>
              <div className="mb-4 flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-emerald-400" />
                <h3 className="text-sm font-bold uppercase tracking-wider text-emerald-400">
                  {t("projects_featured")}
                </h3>
              </div>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
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

          {/* Regular Projects List */}
          {regularList.length > 0 && (
            <div>
              {featuredList.length > 0 && (
                <div className="mb-4 border-t border-border/40 pt-8">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
                    {t("projects_all_list")} ({regularList.length})
                  </h3>
                </div>
              )}
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {visibleRegularList.map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    onOpenDetails={setSelectedProject}
                    isFeaturedCard={false}
                  />
                ))}
              </div>

              {/* Show More Button */}
              {hasMore && (
                <div className="mt-8 text-center sm:mt-10">
                  <button
                    onClick={() => setExpanded(!expanded)}
                    className="inline-flex min-h-[42px] items-center gap-2 rounded-full border border-border/80 bg-secondary/50 px-6 py-2.5 text-xs font-bold text-foreground transition-all hover:border-emerald-500/50 hover:bg-secondary sm:text-sm"
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
        </div>
      )}

      {/* Modal Dialog */}
      <ProjectModal
        project={selectedProject}
        allProjects={filteredProjects}
        onClose={() => setSelectedProject(null)}
        onSelectProject={setSelectedProject}
      />
    </section>
  );
}
