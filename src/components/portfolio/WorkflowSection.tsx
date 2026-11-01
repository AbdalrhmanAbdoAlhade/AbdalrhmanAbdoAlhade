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
      className="mx-auto max-w-6xl border-t border-border/60 px-4 py-12 sm:px-6 sm:py-20 lg:py-24"
    >
      {/* Header */}
      <div className="mb-8 text-center sm:mb-14">
        <p className="text-xs font-bold tracking-wide text-emerald-600 dark:text-emerald-400 sm:text-sm">
          {isAr ? "منهجية العمل الهندسية" : "Engineering Methodology"}
        </p>
        <h2 className="mt-2 text-2xl font-black text-balance sm:text-4xl md:text-5xl">
          {isAr ? "كيف أقوم ببناء" : "How I Build"}{" "}
          <span className="bg-gradient-to-r from-emerald-500 to-cyan-500 dark:from-emerald-400 dark:to-cyan-400 bg-clip-text text-transparent">
            {isAr ? "الأنظمة والمنصات؟" : "Production Platforms"}
          </span>
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-xs leading-relaxed text-muted-foreground sm:text-sm md:text-base">
          {isAr
            ? "دورة حياة هندسية واضحة من الاستكشاف والتحليل وحتى المعمارية والبناء والنشر المستقر."
            : "A disciplined 4-stage engineering lifecycle from requirements discovery to resilient cloud deployment."}
        </p>
      </div>

      {/* 4 Steps Grid */}
      <div className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
        {WORKFLOW_STEPS.map((stepItem) => {
          const Icon = stepIcons[stepItem.icon as keyof typeof stepIcons] ?? Compass;

          return (
            <div
              key={stepItem.step}
              className="group relative flex flex-col justify-between rounded-2xl border border-border bg-card/85 p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-emerald-500/40 sm:rounded-3xl sm:p-6"
            >
              <div>
                <div className="flex items-center justify-between border-b border-border pb-3.5">
                  <span className="font-mono text-2xl font-black tabular-nums text-emerald-600 dark:text-emerald-400 sm:text-3xl">
                    {stepItem.step}
                  </span>
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 sm:h-10 sm:w-10 sm:rounded-2xl">
                    <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                  </div>
                </div>

                <h3 className="mt-3.5 text-base font-bold text-foreground">
                  {isAr ? stepItem.titleAr : stepItem.titleEn}
                </h3>

                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                  {isAr ? stepItem.descAr : stepItem.descEn}
                </p>
              </div>

              <div className="mt-4 border-t border-border/60 pt-3.5 sm:mt-6 sm:pt-4">
                <span className="mb-2 block text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                  {isAr ? "المخرجات الرئيسية:" : "Key Deliverables:"}
                </span>
                <ul className="space-y-1.5 text-xs text-foreground/85">
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
