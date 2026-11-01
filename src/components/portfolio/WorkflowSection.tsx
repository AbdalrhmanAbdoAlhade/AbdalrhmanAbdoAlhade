import { CheckCircle2, Code2, Compass, Cpu, Rocket } from "lucide-react";
import { useApp } from "@/lib/app-context";
import { WORKFLOW_STEPS } from "@/data/workflow";

const stepIcons = {
  Compass,
  Cpu,
  Code2,
  Rocket,
};

export function WorkflowSection() {
  const { lang } = useApp();
  const isAr = lang === "ar";

  return (
    <section
      id="workflow"
      className="mx-auto max-w-6xl border-t border-border/60 px-4 py-10 sm:px-6 sm:py-20 lg:py-24"
    >
      {/* Header */}
      <div className="mb-6 text-center sm:mb-14">
        <p className="text-xs font-bold tracking-wide text-emerald-600 dark:text-emerald-400 sm:text-sm">
          {isAr ? "منهجية العمل الهندسية" : "Engineering Methodology"}
        </p>
        <h2 className="mt-1.5 text-2xl font-black text-balance sm:mt-2 sm:text-4xl md:text-5xl">
          {isAr ? "كيف أقوم ببناء" : "How I Build"}{" "}
          <span className="bg-gradient-to-r from-emerald-500 to-cyan-500 dark:from-emerald-400 dark:to-cyan-400 bg-clip-text text-transparent">
            {isAr ? "الأنظمة والمنصات؟" : "Production Platforms"}
          </span>
        </h2>
        <p className="mx-auto mt-2.5 max-w-2xl text-xs leading-relaxed text-muted-foreground sm:mt-3 sm:text-sm md:text-base">
          {isAr
            ? "دورة حياة هندسية واضحة من الاستكشاف والتحليل وحتى المعمارية والبناء والنشر المستقر."
            : "A disciplined 4-stage engineering lifecycle from requirements discovery to resilient cloud deployment."}
        </p>
      </div>

      {/* 4 Steps Grid */}
      <div className="grid gap-3.5 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
        {WORKFLOW_STEPS.map((stepItem) => {
          const Icon = stepIcons[stepItem.icon as keyof typeof stepIcons] ?? Compass;

          return (
            <div
              key={stepItem.step}
              className="group relative flex min-w-0 flex-col justify-between rounded-2xl border border-border bg-card/85 p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-emerald-500/40 sm:rounded-3xl sm:p-6"
            >
              <div>
                {/* Compact Inline Header on Mobile, Stacked on sm+ */}
                <div className="flex items-center justify-between gap-3 border-b border-border pb-3 sm:pb-3.5">
                  <div className="flex items-center gap-2.5 min-w-0 sm:block">
                    <span className="font-mono text-xl font-black tabular-nums text-emerald-600 dark:text-emerald-400 sm:text-3xl">
                      {stepItem.step}
                    </span>
                    <h3 className="truncate text-sm font-bold text-foreground sm:hidden">
                      {isAr ? stepItem.titleAr : stepItem.titleEn}
                    </h3>
                  </div>
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 sm:h-10 sm:w-10 sm:rounded-2xl">
                    <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                  </div>
                </div>

                <h3 className="mt-3.5 hidden text-base font-bold text-foreground sm:block">
                  {isAr ? stepItem.titleAr : stepItem.titleEn}
                </h3>

                <p className="mt-2.5 text-xs leading-relaxed text-muted-foreground sm:mt-2">
                  {isAr ? stepItem.descAr : stepItem.descEn}
                </p>
              </div>

              <div className="mt-3.5 border-t border-border/60 pt-3 sm:mt-6 sm:pt-4">
                <span className="mb-1.5 block text-[11px] font-bold text-emerald-600 dark:text-emerald-400 sm:mb-2">
                  {isAr ? "المخرجات الرئيسية:" : "Key Deliverables:"}
                </span>
                <ul className="space-y-1 text-xs text-foreground/85 sm:space-y-1.5">
                  {(isAr ? stepItem.deliverablesAr : stepItem.deliverablesEn).map((d) => (
                    <li key={d} className="flex items-start gap-1.5">
                      <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-500 dark:text-emerald-400" />
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
