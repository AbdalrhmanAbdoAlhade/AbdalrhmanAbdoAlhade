import { useState } from "react";
import {
  CheckCircle2,
  Code2,
  Database,
  Info,
  Layers,
  Server,
  Shield,
  Sparkles,
} from "lucide-react";
import { useApp } from "@/lib/app-context";
import { MAIN_LANGUAGES, SUPPORTING_TOOLS, type LanguageCard } from "@/data/skills";

function LanguageSkillCard({ langData, isAr }: { langData: LanguageCard; isAr: boolean }) {
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

  return (
    <div
      className={`group relative flex flex-col justify-between rounded-3xl border ${
        langData.borderColor
      } bg-secondary/30 p-5 transition-all duration-300 hover:-translate-y-1 hover:bg-secondary/50 hover:shadow-xl sm:p-7 ${
        langData.isPrimarySpecialization
          ? "md:col-span-2 lg:col-span-2 bg-gradient-to-br from-secondary/50 via-secondary/30 to-secondary/20"
          : "md:col-span-1 lg:col-span-1"
      }`}
      style={{
        boxShadow: `0 0 35px -15px ${langData.glowColor}`,
      }}
    >
      <div>
        {/* Card Header */}
        <div className="flex items-center justify-between border-b border-border/40 pb-4">
          <div className="flex items-center gap-3">
            <span
              className={`flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br ${langData.accentColor} font-mono text-base font-black text-white shadow-md`}
            >
              {langData.id === "php"
                ? "PHP"
                : langData.id === "golang"
                  ? "Go"
                  : langData.id === "typescript"
                    ? "TS"
                    : "JS"}
            </span>
            <div>
              <h3 className="text-xl font-black text-foreground">{langData.name}</h3>
              <span className="font-mono text-xs text-muted-foreground">
                {langData.isPrimarySpecialization
                  ? isAr
                    ? "التركيز الأساسي"
                    : "Primary Focus"
                  : isAr
                    ? "لغة ثانوية"
                    : "Secondary"}
              </span>
            </div>
          </div>

          <span className="rounded-full border border-border/60 bg-secondary/80 px-3 py-1 font-mono text-xs font-bold text-foreground">
            {isAr ? langData.badgeAr : langData.badgeEn}
          </span>
        </div>

        {/* Frameworks & Tools Chips */}
        <div className="mt-5">
          <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
            {isAr ? "أشهر أطر العمل والأدوات:" : "Frameworks & Ecosystem:"}
          </p>

          <div className="mt-3 flex flex-wrap gap-2">
            {langData.frameworks.map((fw) => {
              const isHovered = activeTooltip === fw.name;

              return (
                <div
                  key={fw.name}
                  className="relative"
                  onMouseEnter={() => setActiveTooltip(fw.name)}
                  onMouseLeave={() => setActiveTooltip(null)}
                >
                  <button
                    type="button"
                    className={`inline-flex items-center gap-1.5 rounded-xl border px-3.5 py-1.5 font-mono text-xs font-bold transition-all ${
                      fw.isPrimary
                        ? "border-emerald-500/40 bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-500/30"
                        : "border-border/80 bg-secondary/60 text-foreground hover:border-emerald-500/30 hover:bg-secondary"
                    }`}
                  >
                    <span>{fw.name}</span>
                    {fw.isPrimary && (
                      <span className="rounded-full bg-emerald-500/30 px-1.5 py-0.2 text-[9px] text-emerald-300 font-sans">
                        {isAr ? "الأساسي" : "Core"}
                      </span>
                    )}
                  </button>

                  {/* Tooltip on Hover */}
                  {isHovered && (
                    <div
                      role="tooltip"
                      className="absolute bottom-full start-1/2 z-30 mb-2 w-56 -translate-x-1/2 rounded-xl border border-border/80 bg-[#0F141C] p-2.5 text-center text-xs leading-snug text-slate-200 shadow-2xl backdrop-blur-md"
                    >
                      <span className="font-bold text-emerald-400 block mb-0.5">{fw.name}</span>
                      <span>{isAr ? fw.tooltipAr : fw.tooltipEn}</span>
                      <div className="absolute -bottom-1 start-1/2 h-2 w-2 -translate-x-1/2 rotate-45 border-b border-e border-border/80 bg-[#0F141C]" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export function SkillsSection() {
  const { lang } = useApp();
  const isAr = lang === "ar";
  const [activeToolTooltip, setActiveToolTooltip] = useState<string | null>(null);

  return (
    <section id="skills" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:py-24">
      {/* Header */}
      <div className="mb-10 text-center sm:mb-14">
        <p className="text-xs font-bold uppercase tracking-widest text-emerald-400 sm:text-sm">
          {isAr ? "المهارات والترسانة البرمجية" : "Technical Arsenal"}
        </p>
        <h2 className="mt-2 text-2xl font-black sm:text-4xl md:text-5xl">
          {isAr ? "اللغات وأطر العمل" : "Languages & Frameworks"}{" "}
          <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
            {isAr ? "الرئيسية" : "Specialization"}
          </span>
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-xs text-muted-foreground sm:text-sm md:text-base">
          {isAr
            ? "تركيز عميق على بيئتي PHP/Laravel و Go لبناء المنظومات السحابية المستقرة، مدعومة بـ TypeScript و Node.js."
            : "Core focus on PHP/Laravel and Go for resilient backend systems, complemented by modern TypeScript and Node.js."}
        </p>
      </div>

      {/* 4 Language Cards Grid (PHP & Go Prominent) */}
      <div className="grid gap-5 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
        {MAIN_LANGUAGES.map((langData) => (
          <LanguageSkillCard key={langData.id} langData={langData} isAr={isAr} />
        ))}
      </div>

      {/* Supporting Tools Row (No percentages - clean chips with tooltips) */}
      <div className="mt-10 rounded-3xl border border-border/70 bg-secondary/30 p-6 sm:mt-12 sm:p-8">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between border-b border-border/40 pb-4">
          <div className="flex items-center gap-2.5">
            <Server className="h-5 w-5 text-emerald-400" />
            <h3 className="text-base font-bold text-foreground sm:text-lg">
              {isAr ? "الأدوات والبنية التحتية الداعمة" : "Supporting Infrastructure & Tools"}
            </h3>
          </div>
          <span className="text-xs font-mono text-muted-foreground">
            {isAr ? "مرر على أي أداة لمعرفة سيناريو الاستخدام" : "Hover for real-world usage"}
          </span>
        </div>

        <div className="mt-5 flex flex-wrap gap-2.5 sm:gap-3">
          {SUPPORTING_TOOLS.map((tool) => {
            const isHovered = activeToolTooltip === tool.name;

            return (
              <div
                key={tool.name}
                className="relative"
                onMouseEnter={() => setActiveToolTooltip(tool.name)}
                onMouseLeave={() => setActiveToolTooltip(null)}
              >
                <button
                  type="button"
                  className="inline-flex items-center gap-2 rounded-2xl border border-border/80 bg-secondary/60 px-4 py-2.5 text-xs font-bold text-foreground transition-all hover:border-emerald-500/50 hover:bg-secondary hover:text-emerald-400"
                >
                  <span className="h-2 w-2 rounded-full bg-emerald-400" />
                  <span>{tool.name}</span>
                </button>

                {isHovered && (
                  <div
                    role="tooltip"
                    className="absolute bottom-full start-1/2 z-30 mb-2 w-64 -translate-x-1/2 rounded-xl border border-border/80 bg-[#0F141C] p-3 text-center text-xs leading-snug text-slate-200 shadow-2xl backdrop-blur-md"
                  >
                    <span className="font-mono text-[11px] font-bold text-emerald-400 block mb-1">
                      {tool.name} · {isAr ? tool.categoryAr : tool.categoryEn}
                    </span>
                    <span>{isAr ? tool.tooltipAr : tool.tooltipEn}</span>
                    <div className="absolute -bottom-1 start-1/2 h-2 w-2 -translate-x-1/2 rotate-45 border-b border-e border-border/80 bg-[#0F141C]" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
