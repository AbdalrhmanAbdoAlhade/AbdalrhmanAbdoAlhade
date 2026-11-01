import { useState } from "react";
import { Database, Layers, Server, ShieldCheck } from "lucide-react";
import { useApp } from "@/lib/app-context";
import { MAIN_LANGUAGES, SUPPORTING_TOOLS, type LanguageCard } from "@/data/skills";

function LanguageSkillCard({ langData, isAr }: { langData: LanguageCard; isAr: boolean }) {
  const isPrimary = langData.isPrimarySpecialization;

  return (
    <article
      className={`group relative flex h-full min-w-0 flex-col justify-between rounded-2xl border ${
        langData.borderColor
      } p-3.5 transition-all duration-200 hover:border-emerald-500/40 sm:rounded-3xl sm:p-6 ${
        isPrimary
          ? "bg-gradient-to-br from-secondary/60 via-card to-card shadow-sm"
          : "bg-card/85"
      }`}
      style={{
        boxShadow: `0 12px 32px -20px ${langData.glowColor}`,
      }}
    >
      <div>
        {/* Card Header */}
        <div className="flex items-center gap-3 border-b border-border pb-3 sm:pb-4">
          <span
            dir="ltr"
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${langData.accentColor} font-mono text-xs font-black text-white shadow-sm sm:h-12 sm:w-12 sm:rounded-2xl sm:text-base`}
          >
            {langData.code}
          </span>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              <h3 dir="ltr" className="text-base font-black text-foreground sm:text-xl">
                {langData.name}
              </h3>
              {isPrimary && (
                <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                  · {isAr ? "أساسي" : "Primary"}
                </span>
              )}
            </div>
            <p className="mt-0.5 truncate text-[11px] text-muted-foreground sm:text-xs">
              {isAr ? langData.badgeAr : langData.badgeEn}
            </p>
          </div>
        </div>

        {/* Summary */}
        <p className="mt-2.5 text-xs leading-relaxed text-muted-foreground sm:mt-3.5 sm:text-sm">
          {isAr ? langData.summaryAr : langData.summaryEn}
        </p>

        {/* Ordered Frameworks Sub-grid */}
        <div className="mt-3 sm:mt-4">
          <div className="mb-2 flex items-center justify-between text-[11px] font-semibold text-muted-foreground sm:mb-2.5 sm:text-xs">
            <span>{isAr ? "أطر العمل والمكتبات" : "Core Frameworks"}</span>
            <span className="font-mono tabular-nums">
              {langData.frameworks.length} {isAr ? "أدوات" : "tools"}
            </span>
          </div>

          <div
            className={`grid gap-2 sm:gap-2.5 ${
              isPrimary ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1"
            }`}
          >
            {langData.frameworks.map((fw) => (
              <div
                key={fw.name}
                className={`flex flex-col justify-between rounded-xl border px-3 py-2.5 transition-colors sm:p-3 ${
                  fw.isPrimary
                    ? "border-emerald-500/30 bg-emerald-500/[0.06] dark:bg-emerald-500/[0.08]"
                    : "border-border bg-secondary/40 hover:border-emerald-500/25"
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span
                    dir="ltr"
                    className="font-mono text-xs font-bold text-foreground sm:text-[13px]"
                  >
                    {fw.name}
                  </span>
                  {fw.isPrimary && (
                    <span className="shrink-0 text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                      {isAr ? "الأساسي" : "Core"}
                    </span>
                  )}
                </div>
                <p className="mt-1 text-[11px] leading-snug text-muted-foreground sm:mt-1.5 sm:text-xs sm:leading-relaxed">
                  {isAr ? fw.tooltipAr : fw.tooltipEn}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}

export function SkillsSection() {
  const { lang } = useApp();
  const isAr = lang === "ar";
  const [activeInfraTab, setActiveInfraTab] = useState<"data" | "architecture" | "devops">("data");

  const primaryLanguages = MAIN_LANGUAGES.filter((l) => l.isPrimarySpecialization);
  const secondaryLanguages = MAIN_LANGUAGES.filter((l) => !l.isPrimarySpecialization);

  const infrastructureGroups = [
    {
      key: "data" as const,
      icon: Database,
      shortAr: "قواعد البيانات",
      shortEn: "Databases",
      titleAr: "قواعد البيانات والتخزين المؤقت",
      titleEn: "Databases & Caching",
      items: SUPPORTING_TOOLS.filter((t) => t.group === "data"),
    },
    {
      key: "architecture" as const,
      icon: ShieldCheck,
      shortAr: "المعمارية والأمان",
      shortEn: "Architecture",
      titleAr: "المعمارية السحابية والأمان",
      titleEn: "Cloud Architecture & Security",
      items: SUPPORTING_TOOLS.filter((t) => t.group === "architecture"),
    },
    {
      key: "devops" as const,
      icon: Server,
      shortAr: "البنية والأتمتة",
      shortEn: "DevOps",
      titleAr: "البنية التحتية والأتمتة",
      titleEn: "DevOps & CI/CD Automation",
      items: SUPPORTING_TOOLS.filter((t) => t.group === "devops"),
    },
  ];

  const activeMobileGroup =
    infrastructureGroups.find((g) => g.key === activeInfraTab) ?? infrastructureGroups[0];

  return (
    <section id="skills" className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-20 lg:py-24">
      {/* Section Header */}
      <div className="mb-6 text-center sm:mb-12">
        <p className="text-xs font-bold tracking-wide text-emerald-600 dark:text-emerald-400 sm:text-sm">
          {isAr ? "المهارات والترسانة البرمجية" : "Technical Arsenal"}
        </p>
        <h2 className="mt-1.5 text-2xl font-black text-balance sm:mt-2 sm:text-4xl md:text-5xl">
          {isAr ? "اللغات وأطر العمل" : "Languages & Frameworks"}{" "}
          <span className="bg-gradient-to-r from-emerald-500 to-cyan-500 dark:from-emerald-400 dark:to-cyan-400 bg-clip-text text-transparent">
            {isAr ? "الرئيسية" : "Specialization"}
          </span>
        </h2>
        <p className="mx-auto mt-2.5 max-w-2xl text-xs leading-relaxed text-muted-foreground sm:mt-3 sm:text-sm md:text-base">
          {isAr
            ? "ترتيب هندسي واضح يضع بيئتي PHP/Laravel و Go في قلب بناء الأنظمة الخلفية، مدعومة بـ TypeScript و React للواجهات المتكاملة."
            : "Structured engineering stack centered on PHP/Laravel and Go for resilient backends, paired with TypeScript and React across the full stack."}
        </p>
      </div>

      {/* Tier 1: Primary Backend Specializations */}
      <div className="mb-5 sm:mb-8">
        <div className="mb-3 flex items-center justify-between gap-2 px-0.5 sm:mb-3.5">
          <div className="flex items-center gap-2">
            <Layers className="h-4 w-4 shrink-0 text-emerald-500 dark:text-emerald-400" />
            <h3 className="text-xs font-bold text-foreground sm:text-base">
              {isAr ? "01. التخصص الأساسي في هندسة الخوادم" : "01. Core Backend Specializations"}
            </h3>
          </div>
          <span className="hidden text-xs text-muted-foreground sm:inline">
            {isAr ? "التركيز اليومي في أنظمة الإنتاج" : "Daily production focus"}
          </span>
        </div>

        <div className="grid grid-cols-1 gap-3.5 sm:gap-6 lg:grid-cols-2">
          {primaryLanguages.map((langData) => (
            <LanguageSkillCard key={langData.id} langData={langData} isAr={isAr} />
          ))}
        </div>
      </div>

      {/* Tier 2: Full-Stack & Web Ecosystem */}
      <div className="mb-6 sm:mb-10">
        <div className="mb-3 flex items-center justify-between gap-2 px-0.5 sm:mb-3.5">
          <h3 className="text-xs font-bold text-foreground sm:text-base">
            {isAr
              ? "02. تطوير الواجهات والبيئة المساندة (Full-Stack)"
              : "02. Full-Stack & Frontend Ecosystem"}
          </h3>
          <span className="hidden text-xs text-muted-foreground sm:inline">
            {isAr ? "واجهات تفاعلية وخدمات مساندة" : "Reactive UIs & supporting services"}
          </span>
        </div>

        <div className="grid grid-cols-1 gap-3.5 sm:gap-6 md:grid-cols-2">
          {secondaryLanguages.map((langData) => (
            <LanguageSkillCard key={langData.id} langData={langData} isAr={isAr} />
          ))}
        </div>
      </div>

      {/* Tier 3: Supporting Infrastructure & Tools (Segmented Tabs on Mobile, 3-Column Grid on md+) */}
      <div className="rounded-2xl border border-border bg-secondary/25 p-3.5 sm:rounded-3xl sm:p-6 lg:p-7">
        <div className="mb-3.5 flex flex-col gap-1 border-b border-border pb-3 sm:mb-5 sm:flex-row sm:items-center sm:justify-between sm:pb-3.5">
          <h3 className="text-xs font-bold text-foreground sm:text-base">
            {isAr
              ? "03. البنية التحتية وقواعد البيانات والأمان"
              : "03. Databases, Architecture & DevOps"}
          </h3>
          <span className="text-[11px] text-muted-foreground sm:text-xs">
            {isAr
              ? "مرتبة حسب الدور الهندسي في منظومة العمل"
              : "Organized by architectural layer in production"}
          </span>
        </div>

        {/* Mobile Segmented Tabs (Saves massive vertical scrolling on smartphones) */}
        <div className="md:hidden">
          <div className="mb-3 grid grid-cols-3 gap-1 rounded-xl border border-border bg-card/70 p-1">
            {infrastructureGroups.map((group) => {
              const isActive = group.key === activeInfraTab;
              return (
                <button
                  key={group.key}
                  type="button"
                  onClick={() => setActiveInfraTab(group.key)}
                  className={`min-h-[40px] rounded-lg px-2 py-1.5 text-[11px] font-bold transition-colors whitespace-nowrap truncate ${
                    isActive
                      ? "bg-emerald-500 text-emerald-950 shadow-xs"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {isAr ? group.shortAr : group.shortEn}
                </button>
              );
            })}
          </div>

          <div className="rounded-2xl border border-border bg-card/85 p-3.5">
            <div className="space-y-3">
              {activeMobileGroup.items.map((tool, idx) => (
                <div
                  key={tool.name}
                  className={idx > 0 ? "border-t border-border/60 pt-2.5" : ""}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span dir="ltr" className="font-mono text-xs font-bold text-foreground">
                      {tool.name}
                    </span>
                    <span className="text-[10px] text-muted-foreground">
                      {isAr ? tool.categoryAr : tool.categoryEn}
                    </span>
                  </div>
                  <p className="mt-0.5 text-[11px] leading-relaxed text-muted-foreground">
                    {isAr ? tool.tooltipAr : tool.tooltipEn}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Desktop 3-Column Grid */}
        <div className="hidden gap-4 md:grid md:grid-cols-3 sm:gap-5">
          {infrastructureGroups.map((group) => {
            const GroupIcon = group.icon;
            return (
              <div
                key={group.key}
                className="flex min-w-0 flex-col rounded-2xl border border-border bg-card/85 p-4"
              >
                <div className="mb-3 flex items-center gap-2 border-b border-border pb-2.5">
                  <GroupIcon className="h-4 w-4 shrink-0 text-emerald-500 dark:text-emerald-400" />
                  <h4 className="text-xs font-bold text-foreground sm:text-sm">
                    {isAr ? group.titleAr : group.titleEn}
                  </h4>
                </div>

                <div className="space-y-3">
                  {group.items.map((tool) => (
                    <div key={tool.name}>
                      <div className="flex items-center justify-between gap-2">
                        <span dir="ltr" className="font-mono text-xs font-bold text-foreground">
                          {tool.name}
                        </span>
                        <span className="text-[10px] text-muted-foreground">
                          {isAr ? tool.categoryAr : tool.categoryEn}
                        </span>
                      </div>
                      <p className="mt-0.5 text-[11px] leading-relaxed text-muted-foreground">
                        {isAr ? tool.tooltipAr : tool.tooltipEn}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
