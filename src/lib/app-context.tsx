import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type Lang = "ar" | "en";
export type Theme = "dark" | "light";

const dict = {
  ar: {
    nav_about: "نبذة",
    nav_skills: "المهارات",
    nav_architecture: "المعمارية",
    nav_projects: "المشاريع",
    nav_sites: "المواقع",
    nav_contact: "تواصل",
    hero_badge: "متاح لمشاريع جديدة",
    hero_name: "عبدالرحمن عبده",
    hero_role: "Back-End Developer",
    hero_desc:
      "أبني واجهات برمجية آمنة وقابلة للتوسع باستخدام PHP (Laravel) و Go، وأدير قواعد بيانات معقدة وتكاملات خارجية لأنظمة SaaS ومنصات التجارة الإلكترونية.",
    hero_cta1: "استعرض المشاريع",
    hero_cta2: "حسابي على GitHub",
    stat_projects: "مشروع منجز",
    stat_years: "سنوات خبرة",
    stat_commit: "التزام بالتسليم",
    about_title: "نبذة",
    about_title_hl: "عني",
    about_desc:
      "مطور Back-End أركّز على تصميم أنظمة نظيفة المعمارية وسهلة الصيانة: بنية متعددة المستأجرين، صلاحيات دقيقة لكل دور، دورات حياة للطلبات والعمليات، وتقارير ولوحات تحكم. أعمل على منصات تجارة إلكترونية وتوصيل وتعليم وفوترة إلكترونية مرتبطة بمتطلبات جهات رسمية.",
    skills_title: "المهارات",
    skills_title_hl: "التقنية",
    skill_php: "PHP / Laravel",
    skill_php_d: "REST APIs، Queues، أنظمة متعددة المستأجرين",
    skill_go: "Golang",
    skill_go_d: "خدمات عالية الأداء ومعالجة متزامنة",
    skill_db: "قواعد البيانات",
    skill_db_d: "MySQL / PostgreSQL / Redis وتحسين الاستعلامات",
    skill_sec: "الأمان",
    skill_sec_d: "JWT، صلاحيات دقيقة، حماية البيانات",
    skill_ops: "البنية والنشر",
    skill_ops_d: "Docker، CI/CD، مراقبة وأداء",
    skill_int: "التكاملات",
    skill_int_d: "الدفع، ZATCA، الإشعارات، خرائط ورسائل",
    arch_kicker: "System Design",
    arch_title: "المعمارية التقنية",
    arch_title_hl: "والتصميم الهيكلي",
    arch_desc:
      "تصميم وبناء أنظمة برمجية متقدمة لضمان عزل البيانات، التوافرية العالية، والأمان عبر كافة المشاريع الحية (BillPro SA, Lawyers SaaS, Souqna, UMQ).",
    arch_pillar_tenant: "معمارية متعددة المستأجرين",
    arch_pillar_tenant_d:
      "تطبيق عزل المحتوى والبيانات مع ربط النطاقات الفرعية لكل تاجر/مكتب، بيئة مستقلة لكل شركة ضمن نظام سحابي واحد.",
    arch_pillar_rbac: "الصلاحيات والـ RBAC (5 أدوار)",
    arch_pillar_rbac_d:
      "نظام أمان صارم ينظم العمل بين الأدوار الخمسة مع فحص Sanctum عند كل طلب API في أقل من دقيقة.",
    arch_pillar_api: "واجهات REST APIs للجوال",
    arch_pillar_api_d:
      "Backend جاهز للإنتاج يربط QuickCart, UMQ, FAZ, Souqna مع Firebase، GPS، والمحافظ الإلكترونية.",
    arch_pillar_payouts: "المحاسبة والتسويات Payouts",
    arch_pillar_payouts_d:
      "محرك القيد المزدوج، شجرة الحسابات، قيود اليومية الموازنة آليًا، وحساب عمولات المتاجر وتوليد طلبات التحويل.",
    arch_arsenal_title: "الترسانة",
    arch_arsenal_hl: "التقنية والمهارات",
    arch_arsenal_desc:
      "لغات البرمجة، أطر العمل، قواعد البيانات، وأدوات البنية التحتية الخاصة بتطوير الـ Back-End.",
    arch_skills_languages: "لغات البرمجة",
    arch_skills_frameworks: "أطر العمل & APIs",
    arch_skills_databases: "قواعد البيانات",
    arch_skills_devops: "البنية التحتية & المعمارية",
    arch_integrations: "الربط مع الخدمات الخارجية",
    arch_integrations_d: "تكامل مع أنواع الخدمات وليس مزودًا واحدًا — قابل للتوسع لأي بوابة أو مزود.",
    int_payment: "دفع إلكتروني",
    int_shipping: "شحن وتوصيل",
    int_sms: "رسائل SMS",
    int_notifications: "إشعارات فورية",
    int_maps: "خرائط وGPS",
    int_einvoicing: "فوترة إلكترونية",
    int_api: "ربط APIs خارجية",
    role_admin: "Admin (مدير)",
    role_staff: "Staff (موظف)",
    role_client: "Client (عميل)",
    role_lawyer: "Lawyer (محامي)",
    role_law_firm: "Law Firm (مكتب)",
    projects_kicker: "Portfolio",
    projects_title: "أحدث",
    projects_title_hl: "المشاريع",
    projects_desc: "منصات ويب وتطبيقات موبايل بأنظمة خلفية قوية وقابلة للتوسع.",
    all: "الكل",
    live_preview: "معاينة مباشرة",
    code: "الكود",
    load_error: "تعذّر تحميل المشاريع الآن.",
    retry: "إعادة المحاولة",
    sites_kicker: "Live Ecosystem",
    sites_title: "مواقع",
    sites_title_hl: "تم إطلاقها",
    sites_desc: "قائمة بالمواقع والتطبيقات التي عملت عليها وهي تعمل الآن.",
    sites_search: "ابحث عن موقع...",
    sites_all: "الكل",
    sites_web: "مواقع",
    sites_apps: "تطبيقات",
    sites_count: "رابط",
    sites_show_more: "عرض المزيد",
    sites_show_less: "عرض أقل",
    visit: "زيارة",
    contact_title: "لديك فكرة",
    contact_title_hl: "مشروع؟",
    contact_desc: "يسعدني مناقشة متطلباتك وبناء نظام خلفي يناسب نمو مشروعك.",
    contact_github: "تابعني على GitHub",
    contact_mail: "راسلني",
    contact_whatsapp: "تواصل عبر واتساب",
    rights: "جميع الحقوق محفوظة.",
    toggle_theme: "تبديل المظهر",
  },
  en: {
    nav_about: "About",
    nav_skills: "Skills",
    nav_architecture: "Architecture",
    nav_projects: "Projects",
    nav_sites: "Websites",
    nav_contact: "Contact",
    hero_badge: "Available for new projects",
    hero_name: "Abdalrhman AbdoAlhade",
    hero_role: "Back-End Developer",
    hero_desc:
      "I build secure, scalable APIs with PHP (Laravel) and Go, manage complex databases and integrate external services for SaaS and e-commerce platforms.",
    hero_cta1: "View projects",
    hero_cta2: "My GitHub",
    stat_projects: "Projects delivered",
    stat_years: "Years experience",
    stat_commit: "On-time delivery",
    about_title: "About",
    about_title_hl: "me",
    about_desc:
      "A back-end developer focused on clean, maintainable architecture: multi-tenant systems, fine-grained role permissions, full order and operation lifecycles, reporting and dashboards. I work on e-commerce, delivery, education and e-invoicing platforms integrated with official requirements.",
    skills_title: "Technical",
    skills_title_hl: "skills",
    skill_php: "PHP / Laravel",
    skill_php_d: "REST APIs, queues, multi-tenant SaaS",
    skill_go: "Golang",
    skill_go_d: "High-performance concurrent services",
    skill_db: "Databases",
    skill_db_d: "MySQL / PostgreSQL / Redis, query tuning",
    skill_sec: "Security",
    skill_sec_d: "JWT, granular permissions, data protection",
    skill_ops: "Infra & deployment",
    skill_ops_d: "Docker, CI/CD, monitoring and performance",
    skill_int: "Integrations",
    skill_int_d: "Payments, ZATCA, notifications, maps and SMS",
    arch_kicker: "System Design",
    arch_title: "Technical architecture",
    arch_title_hl: "& structural design",
    arch_desc:
      "Designing and building advanced software systems for data isolation, high availability, and security across live projects (BillPro SA, Lawyers SaaS, Souqna, UMQ).",
    arch_pillar_tenant: "Multi-tenant architecture",
    arch_pillar_tenant_d:
      "Content and data isolation with per-merchant/firm subdomains — fully independent environments within one cloud platform.",
    arch_pillar_rbac: "Permissions & RBAC (5 roles)",
    arch_pillar_rbac_d:
      "Strict access control across five roles with Sanctum token validation on every API request in under a minute.",
    arch_pillar_api: "Mobile REST APIs",
    arch_pillar_api_d:
      "Production-ready back-ends for QuickCart, UMQ, FAZ, and Souqna with Firebase, GPS, and digital wallets.",
    arch_pillar_payouts: "Accounting & payouts",
    arch_pillar_payouts_d:
      "Double-entry ledger, chart of accounts, auto-balanced journal entries, commission calculation, and payout requests.",
    arch_arsenal_title: "Technical",
    arch_arsenal_hl: "arsenal & skills",
    arch_arsenal_desc:
      "Programming languages, frameworks, databases, and infrastructure tools for back-end development.",
    arch_skills_languages: "Programming languages",
    arch_skills_frameworks: "Frameworks & APIs",
    arch_skills_databases: "Databases",
    arch_skills_devops: "Infrastructure & architecture",
    arch_integrations: "External service integrations",
    arch_integrations_d:
      "Integration by service type — not tied to a single provider, scalable to any gateway or vendor.",
    int_payment: "Electronic payments",
    int_shipping: "Shipping & delivery",
    int_sms: "SMS messaging",
    int_notifications: "Push notifications",
    int_maps: "Maps & GPS",
    int_einvoicing: "E-invoicing",
    int_api: "External API integration",
    role_admin: "Admin",
    role_staff: "Staff",
    role_client: "Client",
    role_lawyer: "Lawyer",
    role_law_firm: "Law Firm",
    projects_kicker: "Portfolio",
    projects_title: "Latest",
    projects_title_hl: "projects",
    projects_desc: "Web platforms and mobile apps powered by robust, scalable back-ends.",
    all: "All",
    live_preview: "Live preview",
    code: "Code",
    load_error: "Could not load projects right now.",
    retry: "Try again",
    sites_kicker: "Live Ecosystem",
    sites_title: "Launched",
    sites_title_hl: "websites",
    sites_desc: "Websites and apps I worked on that are live today.",
    sites_search: "Search a website...",
    sites_all: "All",
    sites_web: "Websites",
    sites_apps: "Apps",
    sites_count: "links",
    sites_show_more: "Show more",
    sites_show_less: "Show less",
    visit: "Visit",
    contact_title: "Got a project",
    contact_title_hl: "in mind?",
    contact_desc:
      "Happy to discuss your requirements and build a back-end that scales with you.",
    contact_github: "Follow me on GitHub",
    contact_mail: "Email me",
    contact_whatsapp: "Chat on WhatsApp",
    rights: "All rights reserved.",
    toggle_theme: "Toggle theme",
  },
} as const;

export type TKey = keyof (typeof dict)["ar"];

type Ctx = {
  lang: Lang;
  theme: Theme;
  dir: "rtl" | "ltr";
  t: (key: TKey) => string;
  toggleLang: () => void;
  toggleTheme: () => void;
};

const AppCtx = createContext<Ctx | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("ar");
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const storedLang = localStorage.getItem("lang") as Lang | null;
    const storedTheme = localStorage.getItem("theme") as Theme | null;
    if (storedLang) setLang(storedLang);
    if (storedTheme) setTheme(storedTheme);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const root = document.documentElement;
    root.lang = lang;
    root.dir = lang === "ar" ? "rtl" : "ltr";
    localStorage.setItem("lang", lang);
  }, [lang]);

  const value: Ctx = {
    lang,
    theme,
    dir: lang === "ar" ? "rtl" : "ltr",
    t: (key) => dict[lang][key],
    toggleLang: () => setLang((l) => (l === "ar" ? "en" : "ar")),
    toggleTheme: () => setTheme((t) => (t === "dark" ? "light" : "dark")),
  };

  return <AppCtx.Provider value={value}>{children}</AppCtx.Provider>;
}

export function useApp() {
  const ctx = useContext(AppCtx);
  if (!ctx) throw new Error("useApp must be used inside AppProvider");
  return ctx;
}
