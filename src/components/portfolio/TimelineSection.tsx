import { Briefcase, Calendar, CheckCircle2, ChevronRight, Layers, Sparkles } from "lucide-react";
import { useApp } from "@/lib/app-context";

interface Milestone {
  year: string;
  periodAr: string;
  periodEn: string;
  titleAr: string;
  titleEn: string;
  descriptionAr: string;
  descriptionEn: string;
  projects: string[];
  tech: string[];
}

const MILESTONES: Milestone[] = [
  {
    year: "2026",
    periodAr: "الحاضر · أنظمة SaaS والمؤسسات الكبرى",
    periodEn: "Current · Enterprise & Multi-Tenant SaaS",
    titleAr: "هندسة أنظمة Multi-Tenant والربط المالي مع ZATCA",
    titleEn: "Engineering Multi-Tenant SaaS & ZATCA Integration",
    descriptionAr:
      "تطوير منصات Enterprise متقدمة مثل BillPro SA ونظام إدارة مكاتب المحاماة Lawyers SaaS ERP. تطبيق عزل البيانات التام لكل مستأجر، بناء محرك القيود المزدوجة والتسويات المالية Payouts، والربط مع هيئة الزكاة والضريبة والجمارك.",
    descriptionEn:
      "Architecting enterprise-scale platforms including BillPro SA and Lawyers SaaS ERP. Implemented complete tenant isolation, double-entry balanced ledger engines, automated payout calculations, and ZATCA Phase 2 compliance.",
    projects: ["BillPro SA", "Lawyers SaaS ERP", "Jewelry Souqna SA", "Asas Al-Jawhara"],
    tech: ["Laravel 12", "Go", "Multi-Tenancy", "ZATCA", "RBAC", "Docker"],
  },
  {
    year: "2025",
    periodAr: "2025 · منصات التوصيل والتجارة والتطبيقات الحية",
    periodEn: "2025 · Live Delivery Platforms & On-Demand Ecosystems",
    titleAr: "أنظمة متعددة المتاجر وواجهات REST APIs للجوال",
    titleEn: "Multi-Vendor Systems & Production Mobile APIs",
    descriptionAr:
      "بناء الـ Backend والـ APIs لمنصات حية تخدم آلاف المستخدمين والرحلات: منصة سوقنا SOUQNA SA، منصة أُمَق UMQ للرياضات البحرية، تطبيق فاز FAZ للسياحة، وتسواق QuickCart للتوصيل. دعم التتبع الحي GPS والإشعارات اللحظية ومحافظ الدفع.",
    descriptionEn:
      "Built high-throughput production backends and APIs serving thousands of active users: Souqna SA marketplace, UMQ Marine Sports platform, FAZ Travel ecosystem, and QuickCart Taswaq delivery. Integrated GPS geolocation, Firebase FCM, and digital wallets.",
    projects: ["Souqna SA", "UMQ Maritime App", "FAZ Travel", "QuickCart Taswaq", "PlayPro"],
    tech: ["Laravel", "REST APIs", "Firebase FCM", "GPS / Maps", "EdfaPay", "Sanctum"],
  },
  {
    year: "2024",
    periodAr: "2024 · التوسع في قواعد البيانات والخدمات السحابية",
    periodEn: "2024 · Database Optimization & Scalable Services",
    titleAr: "بناء منصات الويب والمشاريع الخدمية والخيرية",
    titleEn: "Scalable Web Platforms & Community Applications",
    descriptionAr:
      "تصميم وإطلاق مشاريع رقمية واسعة شملت AST Oman، تطبيق خيرات لتوزيع التبرعات المائية والغذائية عبر الخرائط، وتطبيق البوابة. التركيز على تحسين استعلامات SQL وقواعد البيانات والتكامل مع بوابات الدفع والشحن.",
    descriptionEn:
      "Designed and launched scalable digital platforms including AST Oman, Khayrat donation logistics app, and Al-Bawaba. Focused on SQL query optimization, robust caching layers, and external payment/shipping integrations.",
    projects: ["AST Oman", "Khayrat App", "Al-Bawaba"],
    tech: ["PHP 8", "MySQL", "PostgreSQL", "Redis", "REST APIs"],
  },
];

export function TimelineSection() {
  const { t, lang } = useApp();

  return (
    <section id="timeline" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:py-24">
      {/* Header */}
      <div className="mb-12 text-center sm:mb-16">
        <p className="text-xs font-bold uppercase tracking-widest text-emerald-400 sm:text-sm">
          {t("timeline_kicker")}
        </p>
        <h2 className="mt-2 text-2xl font-black sm:text-4xl md:text-5xl">
          {t("timeline_title")}{" "}
          <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
            {t("timeline_title_hl")}
          </span>
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-xs text-muted-foreground sm:text-sm md:text-base">
          {t("timeline_desc")}
        </p>
      </div>

      {/* Timeline Stream */}
      <div className="relative">
        {/* Vertical Line */}
        <div className="absolute bottom-0 start-4 top-4 w-[2px] bg-gradient-to-b from-emerald-500 via-teal-500/50 to-transparent sm:start-8" />

        <div className="space-y-8 sm:space-y-12">
          {MILESTONES.map((m, idx) => (
            <div key={m.year} className="relative flex items-start gap-4 ps-10 sm:gap-8 sm:ps-20">
              {/* Year Node Badge */}
              <div className="absolute start-0 top-1.5 flex h-8 w-8 items-center justify-center rounded-full border-2 border-emerald-500 bg-background font-mono text-xs font-black text-emerald-400 shadow-md shadow-emerald-500/30 sm:h-12 sm:w-12 sm:text-sm">
                {m.year.slice(2)}
              </div>

              {/* Milestone Card */}
              <div className="flex-1 rounded-3xl border border-border/70 bg-secondary/30 p-5 transition-all duration-300 hover:border-emerald-500/40 hover:bg-secondary/50 sm:p-7">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border/40 pb-3">
                  <span className="inline-flex items-center gap-1.5 font-mono text-xs font-bold text-emerald-400">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>{lang === "ar" ? m.periodAr : m.periodEn}</span>
                  </span>
                  <span className="rounded-full bg-secondary/80 px-2.5 py-0.5 font-mono text-xs font-bold text-muted-foreground">
                    {m.year}
                  </span>
                </div>

                <h3 className="mt-3 text-lg font-bold text-foreground sm:text-xl">
                  {lang === "ar" ? m.titleAr : m.titleEn}
                </h3>

                <p className="mt-2 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                  {lang === "ar" ? m.descriptionAr : m.descriptionEn}
                </p>

                {/* Projects Highlights */}
                <div className="mt-4 flex flex-wrap items-center gap-1.5">
                  <span className="text-xs font-semibold text-foreground/80 me-1">
                    {lang === "ar" ? "أبرز المنصات:" : "Key Platforms:"}
                  </span>
                  {m.projects.map((p) => (
                    <span
                      key={p}
                      className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-xs font-bold text-emerald-300"
                    >
                      {p}
                    </span>
                  ))}
                </div>

                {/* Tech Chips */}
                <div className="mt-3 flex flex-wrap gap-1.5 border-t border-border/30 pt-3">
                  {m.tech.map((t) => (
                    <span
                      key={t}
                      className="rounded-md bg-secondary/70 px-2 py-0.5 font-mono text-[11px] text-muted-foreground"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
