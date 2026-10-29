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
    <section id="workflow" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:py-24">
      {/* Header */}
      <div className="mb-12 text-center sm:mb-16">
        <p className="text-xs font-bold uppercase tracking-widest text-emerald-400 sm:text-sm">
          {isAr ? "منهجية العمل الهندسية" : "Engineering Methodology"}
        </p>
        <h2 className="mt-2 text-2xl font-black sm:text-4xl md:text-5xl">
          {isAr ? "كيف أقوم ببناء" : "How I Build"}{" "}
          <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
            {isAr ? "الأنظمة والمنصات؟" : "Production Platforms"}
          </span>
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-xs text-muted-foreground sm:text-sm md:text-base">
          {isAr
            ? "دورة حياة هندسية واضحة من الاستكشاف والتحليل وحتى المعمارية والبناء والنشر المستقر."
            : "A disciplined 4-stage engineering lifecycle from requirements discovery to resilient cloud deployment."}
        </p>
      </div>

      {/* 4 Steps Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {WORKFLOW_STEPS.map((stepItem, idx) => {
          const Icon = stepIcons[stepItem.icon as keyof typeof stepIcons] ?? Compass;

          return (
            <div
              key={stepItem.step}
              className="group relative flex flex-col justify-between rounded-3xl border border-border/70 bg-secondary/30 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/40 hover:bg-secondary/50"
            >
              <div>
                {/* Step Number Badge */}
                <div className="flex items-center justify-between border-b border-border/40 pb-4">
                  <span className="font-mono text-3xl font-black text-emerald-400/80">
                    {stepItem.step}
                  </span>
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-400 ring-1 ring-emerald-500/20">
                    <Icon className="h-5 w-5" />
                  </div>
                </div>

                <h3 className="mt-4 text-base font-bold text-foreground">
                  {isAr ? stepItem.titleAr : stepItem.titleEn}
                </h3>

                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                  {isAr ? stepItem.descAr : stepItem.descEn}
                </p>
              </div>

              {/* Deliverables */}
              <div className="mt-6 border-t border-border/30 pt-4">
                <span className="font-mono text-[11px] font-bold text-emerald-400 block mb-2">
                  {isAr ? "المخرجات الرئيسية:" : "Key Deliverables:"}
                </span>
                <ul className="space-y-1.5 text-xs text-foreground/80">
                  {(isAr ? stepItem.deliverablesAr : stepItem.deliverablesEn).map((d) => (
                    <li key={d} className="flex items-start gap-1.5">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
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
