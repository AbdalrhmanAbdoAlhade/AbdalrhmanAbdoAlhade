import { useState } from "react";
import {
  ArrowRight,
  Bell,
  Building2,
  Check,
  Copy,
  CreditCard,
  Database,
  FileText,
  Globe,
  Link2,
  MapPin,
  MessageSquare,
  Plug,
  Server,
  ShieldCheck,
  Smartphone,
  Truck,
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
      className="relative mt-4 overflow-hidden rounded-2xl border border-border/70 bg-[#090D14] text-start font-mono text-xs shadow-inner"
    >
      <div className="flex items-center justify-between border-b border-border/40 bg-[#0E141D] px-3.5 py-2 text-[11px] text-muted-foreground">
        <span className="font-mono font-bold text-emerald-400">{language.toUpperCase()}</span>
        <button
          onClick={handleCopy}
          aria-label="Copy code snippet"
          className="flex items-center gap-1 rounded-md px-2 py-0.5 transition-colors hover:bg-secondary hover:text-emerald-400"
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
      <pre className="overflow-x-auto p-4 leading-relaxed text-slate-300">
        <code>{code}</code>
      </pre>
    </div>
  );
}

export function ArchitectureSection() {
  const { lang } = useApp();
  const isAr = lang === "ar";

  return (
    <section id="architecture" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:py-24">
      {/* Header */}
      <div className="mb-10 text-center sm:mb-14">
        <p className="text-xs font-bold uppercase tracking-widest text-emerald-400 sm:text-sm">
          {isAr ? "الهندسة المعمارية وتصميم الأنظمة" : "System Design & Architecture"}
        </p>
        <h2 className="mt-2 text-2xl font-black sm:text-4xl md:text-5xl">
          {isAr ? "المعمارية التقنية" : "Technical"}{" "}
          <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
            {isAr ? "والتصميم الهيكلي" : "Architecture"}
          </span>
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-xs text-muted-foreground sm:text-sm md:text-base">
          {isAr
            ? "تصميم وبناء أنظمة برمجية متقدمة تضمن عزل البيانات، التوافرية العالية، والأمان الصارم عبر المشاريع الحية (BillPro SA, Lawyers SaaS, Souqna, UMQ)."
            : "Engineering scalable distributed architectures guaranteeing strict tenant isolation, zero-trust RBAC, and high availability in production."}
        </p>
      </div>

      {/* Request Flow Diagram (SVG) */}
      <div className="mb-10 overflow-hidden rounded-3xl border border-border/70 bg-[#090D13] p-5 shadow-2xl sm:p-8">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between border-b border-border/40 pb-4">
          <div className="flex items-center gap-2">
            <Server className="h-5 w-5 text-emerald-400" />
            <h3 className="text-base font-bold text-foreground">
              {isAr
                ? "مخطط تدفق الطلب في بيئة Multi-Tenant"
                : "Multi-Tenant Request Lifecycle Flow"}
            </h3>
          </div>
          <span className="font-mono text-xs text-emerald-400">
            Subdomain → Resolver → Isolated DB → Scope Response
          </span>
        </div>

        {/* Responsive Flow Diagram */}
        <div className="mt-6 flex flex-col items-center justify-between gap-4 md:flex-row md:gap-2">
          {/* Step 1: Request */}
          <div className="flex w-full flex-col items-center rounded-2xl border border-border/70 bg-secondary/30 p-4 text-center md:w-56">
            <Globe className="h-6 w-6 text-cyan-400" />
            <span className="mt-2 font-mono text-xs font-bold text-foreground">
              https://tenant-a.domain.com
            </span>
            <span className="mt-1 text-[11px] text-muted-foreground">
              {isAr ? "الطلب عبر النطاق الفرعي" : "Subdomain Ingress Request"}
            </span>
          </div>

          <ArrowRight className="h-5 w-5 text-emerald-400 shrink-0 rotate-90 md:rotate-0 rtl:md:rotate-180" />

          {/* Step 2: Resolver */}
          <div className="flex w-full flex-col items-center rounded-2xl border border-border/70 bg-secondary/30 p-4 text-center md:w-56">
            <Building2 className="h-6 w-6 text-emerald-400" />
            <span className="mt-2 font-mono text-xs font-bold text-foreground">
              Tenant Middleware
            </span>
            <span className="mt-1 text-[11px] text-muted-foreground">
              {isAr ? "التحقق وتحديد الشركة" : "Resolve Scope & Bind Tenant"}
            </span>
          </div>

          <ArrowRight className="h-5 w-5 text-emerald-400 shrink-0 rotate-90 md:rotate-0 rtl:md:rotate-180" />

          {/* Step 3: Isolated Database */}
          <div className="flex w-full flex-col items-center rounded-2xl border border-emerald-500/40 bg-emerald-500/10 p-4 text-center md:w-56">
            <Database className="h-6 w-6 text-emerald-400" />
            <span className="mt-2 font-mono text-xs font-bold text-emerald-300">
              DB_TENANT_A (Isolated)
            </span>
            <span className="mt-1 text-[11px] text-muted-foreground">
              {isAr ? "عزل كامل للبيانات والمحفظة" : "Isolated DB Schema & Ledger"}
            </span>
          </div>

          <ArrowRight className="h-5 w-5 text-emerald-400 shrink-0 rotate-90 md:rotate-0 rtl:md:rotate-180" />

          {/* Step 4: Response */}
          <div className="flex w-full flex-col items-center rounded-2xl border border-border/70 bg-secondary/30 p-4 text-center md:w-56">
            <ShieldCheck className="h-6 w-6 text-teal-400" />
            <span className="mt-2 font-mono text-xs font-bold text-foreground">
              200 OK Response
            </span>
            <span className="mt-1 text-[11px] text-muted-foreground">
              {isAr ? "استجابة آمنة متوافقة مع ZATCA" : "Secure ZATCA-compliant JSON"}
            </span>
          </div>
        </div>
      </div>

      {/* Bento Grid Layout (4 Pillars) */}
      <div className="grid gap-6 lg:grid-cols-2">
        {ARCHITECTURE_PILLARS.map((pillar) => {
          const Icon = iconMap[pillar.icon] ?? Building2;

          return (
            <article
              key={pillar.id}
              className="flex flex-col justify-between rounded-3xl border border-border/70 bg-secondary/30 p-5 transition-all duration-300 hover:border-emerald-500/40 hover:bg-secondary/50 sm:p-7"
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between border-b border-border/40 pb-3.5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-500/15 text-emerald-400 ring-1 ring-emerald-500/30">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-base font-bold text-foreground sm:text-lg">
                      {isAr ? pillar.titleAr : pillar.titleEn}
                    </h3>
                  </div>
                  <span className="rounded-full bg-secondary/80 px-2.5 py-0.5 font-mono text-[11px] font-bold text-emerald-400 border border-border/60">
                    {pillar.tag}
                  </span>
                </div>

                {/* Description */}
                <p className="mt-3 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                  {isAr ? pillar.descAr : pillar.descEn}
                </p>

                {/* Role Badges for RBAC */}
                {pillar.roles && (
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {pillar.roles.map((role) => (
                      <span
                        key={role}
                        className="rounded-full border border-border bg-secondary/60 px-2.5 py-0.5 text-xs font-semibold text-foreground"
                      >
                        {role}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Code Snippet */}
              <CodeSnippet code={pillar.code} language={pillar.language} />
            </article>
          );
        })}
      </div>

      {/* External Integrations */}
      <div className="mt-10 rounded-3xl border border-border/70 bg-secondary/30 p-6 sm:mt-14 sm:p-8">
        <div className="flex items-center gap-2.5 border-b border-border/40 pb-4">
          <Plug className="h-5 w-5 text-emerald-400" />
          <h3 className="text-base font-bold text-foreground sm:text-lg">
            {isAr ? "التكاملات والربط مع الأنظمة الخارجية" : "Enterprise Integrations"}
          </h3>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {INTEGRATIONS.map((item) => (
            <div
              key={item.nameAr}
              className="flex items-center gap-3 rounded-2xl border border-border/60 bg-secondary/40 p-3.5 transition-colors hover:border-emerald-500/40 hover:bg-secondary/70"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-400">
                <Check className="h-4 w-4" />
              </span>
              <div className="min-w-0 flex-1">
                <div className="truncate text-xs font-bold text-foreground">
                  {isAr ? item.nameAr : item.nameEn}
                </div>
                <div className="text-[11px] text-muted-foreground font-mono">
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
