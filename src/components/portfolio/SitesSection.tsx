import { useEffect, useMemo, useState } from "react";
import { ArrowUpRight, ChevronDown, Globe, Search, Smartphone } from "lucide-react";
import { LAUNCHED_SITES, type LiveSiteItem } from "@/config/sites";
import { useApp } from "@/lib/app-context";

type Filter = "all" | "web" | "app";

const INITIAL_VISIBLE_COUNT = 15;
const STEP_COUNT = 15;

function SiteCard({ site }: { site: LiveSiteItem }) {
  const [faviconFailed, setFaviconFailed] = useState(false);
  const faviconUrl = site.isApp
    ? null
    : `https://www.google.com/s2/favicons?domain=${site.host}&sz=64`;

  return (
    <a
      href={site.url}
      target="_blank"
      rel="noreferrer"
      className="group flex min-h-[52px] items-center gap-3 rounded-xl border border-border bg-card/85 px-3.5 py-2.5 transition-all duration-200 hover:-translate-y-0.5 hover:border-emerald-500/40 sm:rounded-2xl"
    >
      <span className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-secondary/80">
        {site.isApp ? (
          <Smartphone className="h-4 w-4 text-emerald-500 dark:text-emerald-400" />
        ) : faviconUrl && !faviconFailed ? (
          <img
            src={faviconUrl}
            alt={site.host}
            loading="lazy"
            referrerPolicy="no-referrer"
            onError={() => setFaviconFailed(true)}
            className="h-5 w-5 rounded object-contain"
          />
        ) : (
          <Globe className="h-4 w-4 text-emerald-500 dark:text-emerald-400" />
        )}
      </span>

      <div className="min-w-0 flex-1">
        <div
          dir="ltr"
          className="truncate text-xs font-bold text-foreground transition-colors group-hover:text-emerald-600 dark:group-hover:text-emerald-400 sm:text-sm"
        >
          {site.label}
        </div>
        <div dir="ltr" className="truncate font-mono text-[10px] text-muted-foreground">
          {site.host}
        </div>
      </div>

      <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground transition-colors group-hover:text-emerald-500 dark:group-hover:text-emerald-400 rtl:-scale-x-100" />
    </a>
  );
}

export function SitesSection() {
  const { t } = useApp();
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<Filter>("all");
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_COUNT);

  useEffect(() => {
    setVisibleCount(INITIAL_VISIBLE_COUNT);
  }, [query, activeFilter]);

  const filteredSites = useMemo(() => {
    const q = query.trim().toLowerCase();
    return LAUNCHED_SITES.filter((site) => {
      const matchesFilter =
        activeFilter === "all" || (activeFilter === "app" ? site.isApp : !site.isApp);

      const matchesQuery =
        !q || site.label.toLowerCase().includes(q) || site.host.toLowerCase().includes(q);

      return matchesFilter && matchesQuery;
    });
  }, [query, activeFilter]);

  const visibleSites = filteredSites.slice(0, visibleCount);
  const hasMore = filteredSites.length > visibleCount;

  const filters: { key: Filter; label: string; count: number }[] = [
    { key: "all", label: t("sites_all"), count: LAUNCHED_SITES.length },
    {
      key: "web",
      label: t("sites_web"),
      count: LAUNCHED_SITES.filter((s) => !s.isApp).length,
    },
    {
      key: "app",
      label: t("sites_apps"),
      count: LAUNCHED_SITES.filter((s) => s.isApp).length,
    },
  ];

  return (
    <section
      id="sites"
      className="mx-auto max-w-6xl border-t border-border/60 px-4 py-12 sm:px-6 sm:py-20 lg:py-24"
    >
      {/* Header */}
      <div className="mb-8 text-center sm:mb-12">
        <p className="text-xs font-bold tracking-wide text-emerald-600 dark:text-emerald-400 sm:text-sm">
          {t("sites_kicker")}
        </p>
        <h2 className="mt-2 text-2xl font-black text-balance sm:text-4xl md:text-5xl">
          {t("sites_title")}{" "}
          <span className="bg-gradient-to-r from-emerald-500 to-cyan-500 dark:from-emerald-400 dark:to-cyan-400 bg-clip-text text-transparent">
            {t("sites_title_hl")}
          </span>
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-xs leading-relaxed text-muted-foreground sm:text-sm md:text-base">
          {t("sites_desc")}
        </p>
        <p className="mt-2 font-mono text-xs font-bold tabular-nums text-emerald-600 dark:text-emerald-400 sm:text-sm">
          {LAUNCHED_SITES.length} {t("sites_count")}
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="mb-6 flex flex-col gap-3 sm:mb-9 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar rounded-xl border border-border bg-secondary/40 p-1">
          {filters.map((f) => (
            <button
              key={f.key}
              type="button"
              onClick={() => setActiveFilter(f.key)}
              className={`inline-flex min-h-[38px] flex-1 items-center justify-center gap-1.5 rounded-lg px-3.5 py-1.5 text-xs font-bold transition-all whitespace-nowrap shrink-0 sm:flex-initial sm:text-sm ${
                activeFilter === f.key
                  ? "bg-emerald-500 text-emerald-950 shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <span>{f.label}</span>
              <span className="font-mono text-[11px] tabular-nums opacity-80">({f.count})</span>
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-72">
          <Search className="pointer-events-none absolute start-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("sites_search")}
            className="min-h-[42px] w-full rounded-xl border border-border bg-secondary/40 pe-3.5 ps-10 text-xs text-foreground placeholder:text-muted-foreground focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500/40 sm:text-sm"
          />
        </div>
      </div>

      {/* Sites Grid */}
      <div className="grid gap-2.5 sm:gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {visibleSites.map((site) => (
          <SiteCard key={site.url} site={site} />
        ))}
      </div>

      {/* Show More Pagination */}
      {hasMore && (
        <div className="mt-7 text-center sm:mt-10">
          <button
            type="button"
            onClick={() => setVisibleCount((prev) => prev + STEP_COUNT)}
            className="inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-border bg-secondary/50 px-6 py-2.5 text-xs font-bold text-foreground transition-all hover:border-emerald-500/50 hover:bg-secondary whitespace-nowrap sm:rounded-full sm:text-sm"
          >
            <span>
              {t("sites_show_more")} ({filteredSites.length - visibleCount})
            </span>
            <ChevronDown className="h-4 w-4" />
          </button>
        </div>
      )}
    </section>
  );
}
