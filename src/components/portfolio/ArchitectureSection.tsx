import { useState } from "react";
import {
  ArrowRight,
  Building2,
  Check,
  Copy,
  Database,
  Globe,
  Plug,
  Server,
  ShieldCheck,
  Smartphone,
  Wallet,
} from "lucide-react";
import { useApp } from "@/lib/app-context";
import { ARCHITECTURE_PILLARS, INTEGRATIONS, type PillarIcon } from "@/data/architecture";

const iconMap: Record<PillarIcon, typeof Building2> = {
  Building2,
  ShieldCheck,
  Smartphone,
  Wallet,
};

function CodeSnippet({ code, language }: { code: string; language: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      dir="ltr"
      className="relative mt-3.5 w-full max-w-full overflow-hidden rounded-xl border border-slate-800 bg-[#090D14] text-left font-mono text-[10.5px] shadow-inner sm:mt-4 sm:rounded-2xl sm:text-xs"
    >
      <div className="flex items-center justify-between border-b border-slate-800/80 bg-[#0E141D] px-3 py-2 text-[11px] text-slate-400 sm:px-3.5">
        <span className="font-mono font-bold text-emerald-400">{language.toUpperCase()}</span>
        <button
          type="button"
          onClick={handleCopy}
          aria-label="Copy code snippet"
          className="flex min-h-[30px] items-center gap-1 rounded-md px-2 py-0.5 transition-colors hover:bg-slate-800 hover:text-emerald-400 whitespace-nowrap"
        >
          {copied ? (
            <>
              <Check className="h-3 w-3 text-emerald-400" />
              <span className="text-emerald-400">Copied</span>
            </>
          ) : (
            <>
              <Copy className="h-3 w-3" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      <pre className="w-full max-w-full overflow-x-auto p-3 leading-relaxed text-slate-200 sm:p-4">
        <code>{code}</code>
      </pre>
    </div>
  );
}

export function ArchitectureSection() {
  const { lang } = useApp();
  const isAr = lang === "ar";

  return (
    <section
      id="architecture"
      className="mx-auto max-w-6xl border-t border-border/60 px-4 py-10 sm:px-6 sm:py-20 lg:py-24"
    >
      {/* Header */}
      <div className="mb-6 text-center sm:mb-12">
        <p className="text-xs font-bold tracking-wide text-emerald-600 dark:text-emerald-400 sm:text-sm">
          {isAr ? "الهندسة المعمارية وتصميم الأنظمة" : "System Design & Architecture"}
        </p>
        <h2 className="mt-1.5 text-2xl font-black text-balance sm:mt-2 sm:text-4xl md:text-5xl">
          {isAr ? "المعمارية التقنية" : "Technical"}{" "}
          <span className="bg-gradient-to-r from-emerald-500 to-cyan-500 dark:from-emerald-400 dark:to-cyan-400 bg-clip-text text-transparent">
            {isAr ? "والتصميم الهيكلي" : "Architecture"}
          </span>
        </h2>
        <p className="mx-auto mt-2.5 max-w-2xl text-xs leading-relaxed text-muted-foreground sm:mt-3 sm:text-sm md:text-base">
          {isAr
            ? "تصميم وبناء أنظمة برمجية متقدمة تضمن عزل البيانات، التوافرية العالية، والأمان الصارم عبر المشاريع الحية (BillPro SA, Lawyers SaaS, Souqna, UMQ)."
            : "Engineering scalable distributed architectures guaranteeing strict tenant isolation, zero-trust RBAC, and high availability in production."}
        </p>
      </div>

      {/* Multi-Tenant Request Lifecycle Diagram */}
      <div className="mb-6 overflow-hidden rounded-2xl border border-border bg-card p-3.5 shadow-sm sm:mb-10 sm:rounded-3xl sm:p-7">
        <div className="flex flex-col gap-1 border-b border-border pb-3 sm:flex-row sm:items-center sm:justify-between sm:pb-3.5">
          <div className="flex items-center gap-2">
            <Server className="h-4 w-4 shrink-0 text-emerald-500 dark:text-emerald-400 sm:h-5 sm:w-5" />
            <h3 className="text-xs font-bold text-foreground sm:text-base">
              {isAr
                ? "مخطط تدفق الطلب في بيئة Multi-Tenant"
                : "Multi-Tenant Request Lifecycle Flow"}
            </h3>
          </div>
          <span
            dir="ltr"
            className="font-mono text-[10.5px] text-emerald-600 dark:text-emerald-400 sm:text-[11px]"
          >
            Subdomain → Resolver → Isolated DB → Response
          </span>
        </div>

        <div className="mt-4 flex flex-col items-stretch justify-between gap-2 md:mt-5 md:flex-row md:items-center">
          {/* Step 1 */}
          <div className="flex min-w-0 flex-1 items-center gap-3 rounded-xl border border-border bg-secondary/40 p-3 text-start md:flex-col md:p-3.5 md:text-center">
            <Globe className="h-5 w-5 shrink-0 text-cyan-500 dark:text-cyan-400 md:h-6 md:w-6" />
            <div className="min-w-0">
              <div dir="ltr" className="truncate font-mono text-xs font-bold text-foreground">
                tenant-a.domain.com
              </div>
              <div className="mt-0.5 text-[11px] text-muted-foreground">
                {isAr ? "الطلب عبر النطاق الفرعي" : "Subdomain Ingress Request"}
              </div>
            </div>
          </div>

          <ArrowRight className="mx-auto h-3.5 w-3.5 shrink-0 rotate-90 text-emerald-500 dark:text-emerald-400 md:mx-0 md:h-4 md:w-4 md:rotate-0 rtl:md:rotate-180" />

          {/* Step 2 */}
          <div className="flex min-w-0 flex-1 items-center gap-3 rounded-xl border border-border bg-secondary/40 p-3 text-start md:flex-col md:p-3.5 md:text-center">
            <Building2 className="h-5 w-5 shrink-0 text-emerald-500 dark:text-emerald-400 md:h-6 md:w-6" />
            <div className="min-w-0">
              <div dir="ltr" className="font-mono text-xs font-bold text-foreground">
                Tenant Middleware
              </div>
              <div className="mt-0.5 text-[11px] text-muted-foreground">
                {isAr ? "التحقق وتحديد الشركة" : "Resolve Scope & Bind Tenant"}
              </div>
            </div>
          </div>

          <ArrowRight className="mx-auto h-3.5 w-3.5 shrink-0 rotate-90 text-emerald-500 dark:text-emerald-400 md:mx-0 md:h-4 md:w-4 md:rotate-0 rtl:md:rotate-180" />

          {/* Step 3 */}
          <div className="flex min-w-0 flex-1 items-center gap-3 rounded-xl border border-emerald-500/40 bg-emerald-500/10 p-3 text-start md:flex-col md:p-3.5 md:text-center">
            <Database className="h-5 w-5 shrink-0 text-emerald-600 dark:text-emerald-400 md:h-6 md:w-6" />
            <div className="min-w-0">
              <div
                dir="ltr"
                className="font-mono text-xs font-bold text-emerald-700 dark:text-emerald-300"
              >
                DB_TENANT_A
              </div>
              <div className="mt-0.5 text-[11px] text-muted-foreground">
                {isAr ? "عزل كامل للبيانات والمحفظة" : "Isolated DB Schema & Ledger"}
              </div>
            </div>
          </div>

          <ArrowRight className="mx-auto h-3.5 w-3.5 shrink-0 rotate-90 text-emerald-500 dark:text-emerald-400 md:mx-0 md:h-4 md:w-4 md:rotate-0 rtl:md:rotate-180" />

          {/* Step 4 */}
          <div className="flex min-w-0 flex-1 items-center gap-3 rounded-xl border border-border bg-secondary/40 p-3 text-start md:flex-col md:p-3.5 md:text-center">
            <ShieldCheck className="h-5 w-5 shrink-0 text-teal-500 dark:text-teal-400 md:h-6 md:w-6" />
            <div className="min-w-0">
              <div dir="ltr" className="font-mono text-xs font-bold text-foreground">
                200 OK Response
              </div>
              <div className="mt-0.5 text-[11px] text-muted-foreground">
                {isAr ? "استجابة آمنة متوافقة مع ZATCA" : "Secure ZATCA-compliant JSON"}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Architecture Pillars (min-w-0 prevents <pre> code blocks from expanding grid width on mobile!) */}
      <div className="grid gap-3.5 sm:gap-6 lg:grid-cols-2">
        {ARCHITECTURE_PILLARS.map((pillar) => {
          const Icon = iconMap[pillar.icon] ?? Building2;

          return (
            <article
              key={pillar.id}
              className="flex min-w-0 flex-col justify-between overflow-hidden rounded-2xl border border-border bg-card/85 p-3.5 transition-colors hover:border-emerald-500/40 sm:rounded-3xl sm:p-6"
            >
              <div className="min-w-0">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border pb-2.5 sm:pb-3">
                  <div className="flex min-w-0 items-center gap-2.5 sm:gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 sm:h-10 sm:w-10 sm:rounded-2xl">
                      <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                    </div>
                    <h3 className="text-sm font-bold text-foreground sm:text-lg">
                      {isAr ? pillar.titleAr : pillar.titleEn}
                    </h3>
                  </div>
                  <span
                    dir="ltr"
                    className="font-mono text-[10.5px] font-bold text-emerald-600 dark:text-emerald-400 sm:text-[11px]"
                  >
                    {pillar.tag}
                  </span>
                </div>

                <p className="mt-2.5 text-xs leading-relaxed text-muted-foreground sm:mt-3 sm:text-sm">
                  {isAr ? pillar.descAr : pillar.descEn}
                </p>

                {pillar.roles && (
                  <div
                    dir="ltr"
                    className="mt-2.5 flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[11px] font-semibold text-foreground/85 sm:mt-3 sm:text-xs"
                  >
                    {pillar.roles.map((role, idx) => (
                      <span key={role} className="inline-flex items-center gap-2">
                        {idx > 0 && <span className="text-muted-foreground/50">·</span>}
                        <span>{role}</span>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <CodeSnippet code={pillar.code} language={pillar.language} />
            </article>
          );
        })}
      </div>

      {/* Enterprise Integrations */}
      <div className="mt-6 rounded-2xl border border-border bg-secondary/25 p-3.5 sm:mt-12 sm:rounded-3xl sm:p-7">
        <div className="flex items-center gap-2 border-b border-border pb-3 sm:gap-2.5 sm:pb-3.5">
          <Plug className="h-4 w-4 shrink-0 text-emerald-500 dark:text-emerald-400 sm:h-5 sm:w-5" />
          <h3 className="text-xs font-bold text-foreground sm:text-lg">
            {isAr ? "التكاملات والربط مع الأنظمة الخارجية" : "Enterprise Integrations"}
          </h3>
        </div>

        <div className="mt-3.5 grid gap-2 sm:mt-5 sm:gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {INTEGRATIONS.map((item) => (
            <div
              key={item.nameAr}
              className="flex min-w-0 items-center gap-3 rounded-xl border border-border bg-card/85 p-3 transition-colors hover:border-emerald-500/40 sm:rounded-2xl sm:p-3.5"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 sm:h-9 sm:w-9 sm:rounded-xl">
                <Check className="h-4 w-4" />
              </span>
              <div className="min-w-0 flex-1">
                <div className="truncate text-xs font-bold text-foreground">
                  {isAr ? item.nameAr : item.nameEn}
                </div>
                <div className="font-mono text-[11px] text-muted-foreground">
                  {isAr ? item.categoryAr : item.categoryEn}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
