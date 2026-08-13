import { useEffect, useMemo, useState } from "react";
import { ArrowUpRight, ChevronDown, ChevronUp, Globe, Search, Smartphone } from "lucide-react";
import { liveSites } from "@/lib/live-sites";
import { useApp } from "@/lib/app-context";

type Filter = "all" | "web" | "app";

const INITIAL_VISIBLE = 6;

export function SitesSection() {
  const { t } = useApp();
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState<Filter>("all");
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    setExpanded(false);
  }, [q, filter]);

  const sites = useMemo(() => {
    const query = q.trim().toLowerCase();
    return liveSites.filter((s) => {
      const byType =
        filter === "all" || (filter === "app" ? s.isApp : !s.isApp);
      const byQuery = !query || s.label.toLowerCase().includes(query) || s.host.toLowerCase().includes(query);
      return byType && byQuery;
    });
  }, [q, filter]);

  const visibleSites = expanded ? sites : sites.slice(0, INITIAL_VISIBLE);
  const hasMore = sites.length > INITIAL_VISIBLE;

  const filters: { key: Filter; label: string }[] = [
    { key: "all", label: t("sites_all") },
    { key: "web", label: t("sites_web") },
    { key: "app", label: t("sites_apps") },
  ];

  return (
    <section id="sites" className="mx-auto max-w-6xl px-4 py-16 sm:px-5 sm:py-20 lg:py-24">
      <div className="mb-6 text-center sm:mb-8 lg:mb-10">
        <p className="text-xs font-semibold uppercase tracking-widest text-primary sm:text-sm">
          {t("sites_kicker")}
        </p>
        <h2 className="mt-2 text-2xl font-extrabold sm:text-3xl md:text-4xl">
          {t("sites_title")} <span className="text-gradient">{t("sites_title_hl")}</span>
        </h2>
        <p className="mx-auto mt-2 max-w-xl text-xs text-muted-foreground sm:mt-3 sm:text-sm md:text-base">{t("sites_desc")}</p>
        <p className="mt-1.5 text-xs font-semibold text-accent sm:mt-2 sm:text-sm">
          {liveSites.length} {t("sites_count")}
        </p>
      </div>

      <div className="mb-6 flex flex-col items-stretch gap-3 sm:mb-8 sm:items-center sm:flex-row sm:justify-between sm:gap-4">
        <div className="flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`min-h-[36px] rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors sm:px-4 sm:py-2 sm:text-sm ${
                filter === f.key
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border text-muted-foreground hover:bg-secondary"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
        <label className="surface-card flex min-h-[40px] w-full items-center gap-2 rounded-full px-3 py-2 sm:px-4 sm:py-2.5 sm:w-72">
          <Search className="h-3.5 w-3.5 shrink-0 text-muted-foreground sm:h-4 sm:w-4" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={t("sites_search")}
            className="w-full bg-transparent text-xs outline-none placeholder:text-muted-foreground sm:text-sm"
          />
        </label>
      </div>

      <div className="grid gap-2 sm:gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {visibleSites.map((s) => (
          <a
            key={s.url}
            href={s.url}
            target="_blank"
            rel="noreferrer"
            className="surface-card group flex min-h-[44px] items-center gap-2 rounded-lg px-3 py-2.5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 sm:gap-3 sm:rounded-2xl sm:px-4 sm:py-3"
          >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/15 text-primary sm:h-9 sm:w-9 sm:rounded-xl">
              {s.isApp ? <Smartphone className="h-3.5 w-3.5 sm:h-4 sm:w-4" /> : <Globe className="h-3.5 w-3.5 sm:h-4 sm:w-4" />}
            </span>
            <span className="min-w-0 flex-1 truncate text-xs font-semibold sm:text-sm" dir="ltr">
              {s.label}
            </span>
            <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground transition-colors group-hover:text-primary sm:h-4 sm:w-4" />
          </a>
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
                {t("sites_show_less")}
                <ChevronUp className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              </>
            ) : (
              <>
                {t("sites_show_more")} ({sites.length - INITIAL_VISIBLE})
                <ChevronDown className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              </>
            )}
          </button>
        </div>
      )}
    </section>
  );
}
