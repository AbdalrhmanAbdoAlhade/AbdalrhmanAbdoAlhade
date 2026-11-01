import { Database, Layers, Server, ShieldCheck } from "lucide-react";
import { useApp } from "@/lib/app-context";
import { MAIN_LANGUAGES, SUPPORTING_TOOLS, type LanguageCard } from "@/data/skills";

function LanguageSkillCard({ langData, isAr }: { langData: LanguageCard; isAr: boolean }) {
  const isPrimary = langData.isPrimarySpecialization;

  return (
    <article
      className={`group relative flex h-full flex-col justify-between rounded-2xl border ${
        langData.borderColor
      } p-4 transition-all duration-200 hover:border-emerald-500/40 sm:rounded-3xl sm:p-6 ${
        isPrimary
          ? "bg-gradient-to-br from-secondary/60 via-card to-card shadow-sm"
          : "bg-card/80"
      }`}
      style={{
        boxShadow: `0 12px 32px -20px ${langData.glowColor}`,
      }}
    >
      <div>
        {/* Card Header */}
        <div className="flex flex-wrap items-start justify-between gap-3 border-b border-border pb-4">
          <div className="flex items-center gap-3 min-w-0">
            <span
              dir="ltr"
              className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${langData.accentColor} font-mono text-sm font-black text-white shadow-sm sm:h-12 sm:w-12 sm:rounded-2xl sm:text-base`}
            >
              {langData.code}
            </span>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h3 dir="ltr" className="text-lg font-black text-foreground sm:text-xl">
                  {langData.name}
                </h3>
                {isPrimary && (
                  <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                    · {isAr ? "أساسي" : "Primary"}
                  </span>
                )}
              </div>
              <p className="mt-0.5 text-xs text-muted-foreground">
                {isAr ? langData.badgeAr : langData.badgeEn}
              </p>
            </div>
          </div>
        </div>

        {/* Summary */}
        <p className="mt-3.5 text-xs leading-relaxed text-muted-foreground sm:text-sm">
          {isAr ? langData.summaryAr : langData.summaryEn}
        </p>

        {/* Ordered Frameworks List / Sub-grid */}
        <div className="mt-4">
          <div className="mb-2.5 flex items-center justify-between text-[11px] font-semibold text-muted-foreground sm:text-xs">
            <span>{isAr ? "أطر العمل والمكتبات المعتمدة" : "Core Frameworks & Ecosystem"}</span>
            <span className="font-mono tabular-nums">
              {langData.frameworks.length} {isAr ? "أدوات" : "tools"}
            </span>
          </div>

          <div
            className={`grid gap-2.5 ${
              isPrimary ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1"
            }`}
          >
            {langData.frameworks.map((fw) => (
              <div
                key={fw.name}
                className={`flex flex-col justify-between rounded-xl border p-3 transition-colors ${
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
                <p className="mt-1.5 text-[11px] leading-relaxed text-muted-foreground sm:text-xs">
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

  const primaryLanguages = MAIN_LANGUAGES.filter((l) => l.isPrimarySpecialization);
  const secondaryLanguages = MAIN_LANGUAGES.filter((l) => !l.isPrimarySpecialization);

  const infrastructureGroups = [
    {
      key: "data" as const,
      icon: Database,
      titleAr: "قواعد البيانات والتخزين المؤقت",
      titleEn: "Databases & Caching",
      items: SUPPORTING_TOOLS.filter((t) => t.group === "data"),
    },
    {
      key: "architecture" as const,
      icon: ShieldCheck,
      titleAr: "المعمارية السحابية والأمان",
      titleEn: "Cloud Architecture & Security",
      items: SUPPORTING_TOOLS.filter((t) => t.group === "architecture"),
    },
    {
      key: "devops" as const,
      icon: Server,
      titleAr: "البنية التحتية والأتمتة",
      titleEn: "DevOps & CI/CD Automation",
      items: SUPPORTING_TOOLS.filter((t) => t.group === "devops"),
    },
  ];

  return (
    <section id="skills" className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-20 lg:py-24">
      {/* Section Header */}
      <div className="mb-8 text-center sm:mb-12">
        <p className="text-xs font-bold tracking-wide text-emerald-600 dark:text-emerald-400 sm:text-sm">
          {isAr ? "المهارات والترسانة البرمجية" : "Technical Arsenal"}
        </p>
        <h2 className="mt-2 text-2xl font-black text-balance sm:text-4xl md:text-5xl">
          {isAr ? "اللغات وأطر العمل" : "Languages & Frameworks"}{" "}
          <span className="bg-gradient-to-r from-emerald-500 to-cyan-500 dark:from-emerald-400 dark:to-cyan-400 bg-clip-text text-transparent">
            {isAr ? "الرئيسية" : "Specialization"}
          </span>
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-xs leading-relaxed text-muted-foreground sm:text-sm md:text-base">
          {isAr
            ? "ترتيب هندسي واضح يضع بيئتي PHP/Laravel و Go في قلب بناء الأنظمة الخلفية، مدعومة بـ TypeScript و React للواجهات المتكاملة."
            : "Structured engineering stack centered on PHP/Laravel and Go for resilient backends, paired with TypeScript and React across the full stack."}
        </p>
      </div>

      {/* Tier 1: Primary Backend Specializations (PHP & Go - Balanced 2-Column Grid) */}
      <div className="mb-6 sm:mb-8">
        <div className="mb-3.5 flex items-center justify-between gap-2 px-1">
          <div className="flex items-center gap-2">
            <Layers className="h-4 w-4 text-emerald-500 dark:text-emerald-400 shrink-0" />
            <h3 className="text-sm font-bold text-foreground sm:text-base">
              {isAr ? "01. التخصص الأساسي في هندسة الخوادم" : "01. Core Backend Specializations"}
            </h3>
          </div>
          <span className="hidden text-xs text-muted-foreground sm:inline">
            {isAr ? "التركيز اليومي في أنظمة الإنتاج" : "Daily production focus"}
          </span>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-2">
          {primaryLanguages.map((langData) => (
            <LanguageSkillCard key={langData.id} langData={langData} isAr={isAr} />
          ))}
        </div>
      </div>

      {/* Tier 2: Full-Stack & Web Ecosystem (TypeScript & JavaScript - Balanced 2-Column Grid) */}
      <div className="mb-8 sm:mb-10">
        <div className="mb-3.5 flex items-center justify-between gap-2 px-1">
          <h3 className="text-sm font-bold text-foreground sm:text-base">
            {isAr
              ? "02. تطوير الواجهات والبيئة المساندة (Full-Stack)"
              : "02. Full-Stack & Frontend Ecosystem"}
          </h3>
          <span className="hidden text-xs text-muted-foreground sm:inline">
            {isAr ? "واجهات تفاعلية وخدمات مساندة" : "Reactive UIs & supporting services"}
          </span>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2">
          {secondaryLanguages.map((langData) => (
            <LanguageSkillCard key={langData.id} langData={langData} isAr={isAr} />
          ))}
        </div>
      </div>

      {/* Tier 3: Supporting Infrastructure & Tools (Categorized 3-Column Grid) */}
      <div className="rounded-2xl border border-border bg-secondary/25 p-4 sm:rounded-3xl sm:p-6 lg:p-7">
        <div className="mb-5 flex flex-col gap-1 border-b border-border pb-3.5 sm:flex-row sm:items-center sm:justify-between">
          <h3 className="text-sm font-bold text-foreground sm:text-base">
            {isAr
              ? "03. البنية التحتية وقواعد البيانات والأمان"
              : "03. Databases, Architecture & DevOps"}
          </h3>
          <span className="text-xs text-muted-foreground">
            {isAr
              ? "مرتبة حسب الدور الهندسي في منظومة العمل"
              : "Organized by architectural layer in production"}
          </span>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 sm:gap-5">
          {infrastructureGroups.map((group) => {
            const GroupIcon = group.icon;
            return (
              <div
                key={group.key}
                className="flex flex-col rounded-2xl border border-border bg-card/80 p-4"
              >
                <div className="mb-3 flex items-center gap-2 border-b border-border pb-2.5">
                  <GroupIcon className="h-4 w-4 text-emerald-500 dark:text-emerald-400 shrink-0" />
                  <h4 className="text-xs font-bold text-foreground sm:text-sm">
                    {isAr ? group.titleAr : group.titleEn}
                  </h4>
                </div>

                <div className="space-y-3">
                  {group.items.map((tool) => (
                    <div key={tool.name} className="group/tool">
                      <div className="flex items-center justify-between gap-2">
                        <span
                          dir="ltr"
                          className="font-mono text-xs font-bold text-foreground"
                        >
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
