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
    <section id="sites" className="mx-auto max-w-6xl px-5 py-24">
      <div className="mb-8 text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-primary">
          {t("sites_kicker")}
        </p>
        <h2 className="mt-2 text-3xl font-extrabold sm:text-4xl">
          {t("sites_title")} <span className="text-gradient">{t("sites_title_hl")}</span>
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-muted-foreground">{t("sites_desc")}</p>
        <p className="mt-2 text-sm font-semibold text-accent">
          {liveSites.length} {t("sites_count")}
        </p>
      </div>

      <div className="mb-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
                filter === f.key
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border text-muted-foreground hover:bg-secondary"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
        <label className="surface-card flex w-full items-center gap-2 rounded-full px-4 py-2 sm:w-72">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={t("sites_search")}
            className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
        </label>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {visibleSites.map((s) => (
          <a
            key={s.url}
            href={s.url}
            target="_blank"
            rel="noreferrer"
            className="surface-card group flex items-center gap-3 rounded-2xl px-4 py-3 transition-all duration-300 hover:-translate-y-1 hover:border-primary/50"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary">
              {s.isApp ? <Smartphone className="h-4 w-4" /> : <Globe className="h-4 w-4" />}
            </span>
            <span className="min-w-0 flex-1 truncate text-sm font-semibold" dir="ltr">
              {s.label}
            </span>
            <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground transition-colors group-hover:text-primary" />
          </a>
        ))}
      </div>

      {hasMore && (
        <div className="mt-8 text-center">
          <button
            onClick={() => setExpanded((v) => !v)}
            className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-semibold transition-colors hover:bg-secondary"
          >
            {expanded ? (
              <>
                {t("sites_show_less")}
                <ChevronUp className="h-4 w-4" />
              </>
            ) : (
              <>
                {t("sites_show_more")} ({sites.length - INITIAL_VISIBLE})
                <ChevronDown className="h-4 w-4" />
              </>
            )}
          </button>
        </div>
      )}
    </section>
  );
}
