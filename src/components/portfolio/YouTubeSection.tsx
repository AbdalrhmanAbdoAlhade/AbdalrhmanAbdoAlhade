import { ExternalLink, Play, Sparkles, Video, Youtube } from "lucide-react";
import { useApp } from "@/lib/app-context";
import { SITE_CONFIG } from "@/config/site-config";

export function YouTubeSection() {
  const { t } = useApp();

  return (
    <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <div className="relative overflow-hidden rounded-3xl border border-border/70 bg-gradient-to-r from-secondary/60 via-secondary/30 to-secondary/60 p-6 sm:p-10">
        {/* Ambient Glow */}
        <div className="pointer-events-none absolute -end-20 -top-20 h-60 w-60 rounded-full bg-red-500/10 blur-3xl" />

        <div className="relative z-10 flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-3 py-1 text-xs font-semibold text-red-400">
              <Youtube className="h-3.5 w-3.5" />
              <span>{t("youtube_kicker")}</span>
            </div>

            <h3 className="mt-3 text-2xl font-black text-foreground sm:text-3xl">
              {t("youtube_title")}{" "}
              <span className="bg-gradient-to-r from-red-400 via-rose-300 to-amber-300 bg-clip-text text-transparent">
                {t("youtube_title_hl")}
              </span>
            </h3>

            <p className="mt-2 text-xs leading-relaxed text-muted-foreground sm:text-sm">
              {t("youtube_desc")}
            </p>

            <div className="mt-4 flex flex-wrap gap-2 text-xs text-muted-foreground">
              {[
                "Laravel Architecture",
                "Multi-Tenant Deep Dive",
                "Go Microservices",
                "ZATCA Integration",
              ].map((topic) => (
                <span
                  key={topic}
                  className="rounded-lg border border-border/60 bg-secondary/60 px-2.5 py-1 font-mono text-[11px] font-medium"
                >
                  #{topic}
                </span>
              ))}
            </div>
          </div>

          <a
            href={SITE_CONFIG.links.youtube}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-[46px] items-center gap-2.5 rounded-full bg-red-600 px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-red-600/20 transition-all hover:-translate-y-0.5 hover:bg-red-500 hover:shadow-red-600/30"
          >
            <Play className="h-4 w-4 fill-current" />
            <span>{t("youtube_cta")}</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
