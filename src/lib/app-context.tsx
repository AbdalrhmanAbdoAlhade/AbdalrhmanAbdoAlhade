import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { SITE_CONFIG } from "@/config/site-config";

export type Lang = "ar" | "en";
export type Theme = "dark" | "light";

export const dict = {
  ar: {
    // Navigation
    nav_about: "نبذة",
    nav_skills: "المهارات",
    nav_architecture: "المعمارية",
    nav_projects: "المشاريع",
    nav_timeline: "رحلة العمل",
    nav_sites: "المواقع",
    nav_contact: "تواصل",

    // Hero
    hero_badge: "متاح لمشاريع ومنصات جديدة",
    hero_name: SITE_CONFIG.name.ar,
    hero_role: SITE_CONFIG.role.ar,
    hero_desc: SITE_CONFIG.tagline.ar,
    hero_cta_projects: "استعرض المشاريع",
    hero_cta_whatsapp: "واتساب مباشر",
    hero_cta_github: "حساب GitHub",

    // Stats
    stat_projects: "مشروع منجز",
    stat_years: "سنوات خبرة",
    stat_commit: "التزام بالتسليم",
    stat_requests: "طلب شهرياً معالج",

    // Terminal
    terminal_title: "abdalrhman@fullstack:~$",
    terminal_status: "متصل بالإنتاج — جاهز للعمل",

    // About
    about_kicker: "About Me",
    about_title: "نبذة",
    about_title_hl: "عني",
    about_desc: SITE_CONFIG.bio.ar,

    // Skills
    skills_kicker: "Tech Stack",
    skills_title: "الترسانة",
    skills_title_hl: "التقنية",
    skills_desc:
      "تطوير Full-Stack متكامل يجمع بين قوة واستقرار الأنظمة الخلفية وسلاسة وتفاعلية الواجهات الأمامية.",
    arch_skills_frontend: "الواجهات الأمامية (Frontend)",
    arch_skills_languages: "لغات البرمجة (Languages)",
    arch_skills_frameworks: "أطر العمل والـ APIs",
    arch_skills_databases: "قواعد البيانات والـ Caching",
    arch_skills_devops: "البنية السحابية والنشر (DevOps)",

    // Architecture
    arch_kicker: "System Design & Architecture",
    arch_title: "المعمارية التقنية",
    arch_title_hl: "والتصميم الهيكلي",
    arch_desc:
      "تصميم وبناء أنظمة برمجية متقدمة لضمان عزل البيانات، التوافرية العالية، والأمان عبر كافة المشاريع الحية (BillPro SA, Lawyers SaaS, Souqna, UMQ).",
    arch_copy_snippet: "نسخ الكود",
    arch_copied: "تم النسخ!",
    arch_pillar_tenant: "معمارية متعددة المستأجرين (Multi-Tenancy)",
    arch_pillar_tenant_d:
      "تطبيق عزل المحتوى وقواعد البيانات مع ربط النطاقات الفرعية لكل شركة/مكتب، بيئة مستقلة تماماً ضمن نظام سحابي موحد ومتوافق مع هيئة الزكاة.",
    arch_pillar_rbac: "الصلاحيات والـ RBAC (5 أدوار)",
    arch_pillar_rbac_d:
      "نظام أمان صارم ينظم العمل بين الأدوار الخمسة مع فحص Sanctum عند كل طلب API في أقل من دقيقة.",
    arch_pillar_api: "واجهات REST APIs للجوال والويب",
    arch_pillar_api_d:
      "Backend عالي الكفاءة يربط تطبيقات الجوال والويب مع Firebase، وتتبع GPS، والمحافظ الرقمية.",
    arch_pillar_payouts: "المحاسبة والتسويات (Ledger & Payouts)",
    arch_pillar_payouts_d:
      "محرك القيد المزدوج، شجرة الحسابات، قيود اليومية الموازنة آليًا، وحساب عمولات المتاجر وتوليد طلبات التحويل.",
    arch_arsenal_title: "المهارات",
    arch_arsenal_hl: "حسب التخصص والنسب",
    arch_arsenal_desc: "تقييم واقعي لمستويات الإتقان البرمجي والخبرة العملية في الإنتاج.",
    arch_integrations: "التكاملات والربط الخارجي",
    arch_integrations_d: "تكامل مدروس مع بوابات الدفع، الشحن، الفوترة، والإشعارات اللحظية.",
    int_payment: "دفع إلكتروني (EdfaPay / Mada)",
    int_shipping: "شحن وتوصيل (Aramex / SMSA / Naqel)",
    int_sms: "رسائل SMS وتوثيق OTP",
    int_notifications: "إشعارات فورية (Firebase FCM)",
    int_maps: "خرائط وتتبع (Google Maps / GPS)",
    int_einvoicing: "فوترة إلكترونية (ZATCA المرحلة الثانية)",
    int_api: "ربط APIs وبوابات خارجية",

    // Roles
    role_admin: "Admin (مدير)",
    role_staff: "Staff (موظف)",
    role_client: "Client (عميل)",
    role_lawyer: "Lawyer (محامي)",
    role_law_firm: "Law Firm (مكتب)",

    // Projects
    projects_kicker: "Portfolio & Case Studies",
    projects_title: "المشاريع",
    projects_title_hl: "والمنصات المنفذة",
    projects_desc: "منصات وتطبيقات واقعية تم بناؤها بمعايير الإنتاج العالمية وربطها بالكامل.",
    projects_search: "ابحث في المشاريع، التقنيات (Laravel, ZATCA, RBAC)...",
    projects_filter_all: "الكل",
    projects_filter_web: "ويب SaaS",
    projects_filter_mobile: "موبايل",
    projects_sort_newest: "الأحدث",
    projects_sort_oldest: "الأقدم",
    projects_sort_title: "أبجدياً",
    projects_featured: "منصات مميزة (Featured)",
    projects_all_list: "باقي المشاريع والأنظمة",
    projects_show_more: "عرض المزيد من المشاريع",
    projects_show_less: "عرض أقل",
    projects_no_results: "لم يتم العثور على مشاريع مطابقة للبحث.",
    projects_clear_filters: "إلغاء الفلاتر",
    project_modal_details: "تفاصيل المشروع الكاملة",
    project_modal_tech: "التقنيات المستخدمة:",
    project_modal_prev: "السابق",
    project_modal_next: "التالي",
    project_modal_close: "إغلاق",
    live_preview: "زيارة المنصة",
    google_play: "Google Play",
    code: "الكود المصدري",
    details: "التفاصيل",
    load_error: "تعذّر تحميل المشاريع من الخادم حالياً.",
    retry: "إعادة المحاولة",

    // Timeline / Work Journey
    timeline_kicker: "Work Journey & Milestones",
    timeline_title: "رحلة",
    timeline_title_hl: "العمل والخبرة",
    timeline_desc:
      "تسلسل زمني لأبرز المحطات وتطور الأنظمة المعقدة من المنصات المتخصصة إلى أنظمة SaaS متعددة المستأجرين.",

    // YouTube / Community Education
    youtube_kicker: "Knowledge Sharing",
    youtube_title: "المحتوى",
    youtube_title_hl: "التعليمي والتقني",
    youtube_desc:
      "مشاركة المعرفة والخبرات العملية في هندسة برمجيات Laravel و Go وبناء الـ APIs المتقدمة.",
    youtube_cta: "قناة YouTube قريباً",

    // Launched Sites
    sites_kicker: "Live Ecosystem",
    sites_title: "مواقع ومنصات",
    sites_title_hl: "تم إطلاقها (+75)",
    sites_desc:
      "منظومة تضم أكثر من 75 موقعاً وتطبيقاً تم إطلاقها وتعمل بكفاءة في بيئات الإنتاج الحقيقية.",
    sites_search: "ابحث عن نطاق أو موقع...",
    sites_all: "الكل",
    sites_web: "مواقع ويب",
    sites_apps: "تطبيقات موبايل",
    sites_count: "رابط متاح",
    sites_show_more: "عرض المزيد",
    sites_show_less: "عرض أقل",
    visit: "زيارة الموقع",

    // Contact & Footer
    contact_kicker: "Get In Touch",
    contact_title: "هل لديك فكرة أو",
    contact_title_hl: "مشروع جديد؟",
    contact_desc:
      "جاهز لبناء وهندسة منصتك من الصفر: من تصميم قواعد البيانات والـ APIs وحتى واجهات المستخدم والنشر النهائي.",
    contact_whatsapp: "محادثة عبر واتساب",
    contact_github: "حساب GitHub",
    contact_linkedin: "حساب LinkedIn",
    contact_mail: "البريد الإلكتروني",
    rights: "جميع الحقوق محفوظة.",
    toggle_theme: "تبديل المظهر (Dark / Light)",
    toggle_lang: "تبديل اللغة",
  },

  en: {
    // Navigation
    nav_about: "About",
    nav_skills: "Skills",
    nav_architecture: "Architecture",
    nav_projects: "Projects",
    nav_timeline: "Journey",
    nav_sites: "Sites",
    nav_contact: "Contact",

    // Hero
    hero_badge: "Open for New Projects & Contracts",
    hero_name: SITE_CONFIG.name.en,
    hero_role: SITE_CONFIG.role.en,
    hero_desc: SITE_CONFIG.tagline.en,
    hero_cta_projects: "Explore Projects",
    hero_cta_whatsapp: "Direct WhatsApp",
    hero_cta_github: "GitHub Profile",

    // Stats
    stat_projects: "Projects Delivered",
    stat_years: "Years Experience",
    stat_commit: "On-time Delivery",
    stat_requests: "Monthly Requests Handled",

    // Terminal
    terminal_title: "abdalrhman@fullstack:~$",
    terminal_status: "Production Node Connected — Ready",

    // About
    about_kicker: "About Me",
    about_title: "About",
    about_title_hl: "Me",
    about_desc: SITE_CONFIG.bio.en,

    // Skills
    skills_kicker: "Tech Stack",
    skills_title: "Technical",
    skills_title_hl: "Arsenal",
    skills_desc:
      "Full-Stack engineering combining the resilience of modern backends with reactive, high-performance UIs.",
    arch_skills_frontend: "Frontend Development",
    arch_skills_languages: "Programming Languages",
    arch_skills_frameworks: "Frameworks & APIs",
    arch_skills_databases: "Databases & Caching",
    arch_skills_devops: "DevOps & Cloud Architecture",

    // Architecture
    arch_kicker: "System Design & Architecture",
    arch_title: "Technical Architecture",
    arch_title_hl: "& Structural Design",
    arch_desc:
      "Engineering robust distributed systems ensuring strict tenant isolation, high availability, and compliance across production platforms.",
    arch_copy_snippet: "Copy Snippet",
    arch_copied: "Copied!",
    arch_pillar_tenant: "Multi-Tenant Architecture",
    arch_pillar_tenant_d:
      "Strict data and database isolation with automatic subdomain switching per tenant, fully compliant with regulatory e-invoicing standards.",
    arch_pillar_rbac: "Granular RBAC (5 Distinct Roles)",
    arch_pillar_rbac_d:
      "Role-based access control safeguarding sensitive domain endpoints with token validation and policy gates.",
    arch_pillar_api: "High-Throughput Mobile & Web REST APIs",
    arch_pillar_api_d:
      "Production-grade APIs serving web and mobile clients with Firebase push notifications, live geolocation, and digital wallets.",
    arch_pillar_payouts: "Double-Entry Ledger & Payouts Engine",
    arch_pillar_payouts_d:
      "Automated journal entries ensuring debit equals credit, merchant commission calculation, and secure batch payouts.",
    arch_arsenal_title: "Proficiency",
    arch_arsenal_hl: "Breakdown & Metrics",
    arch_arsenal_desc:
      "Real-world engineering proficiency proven across high-demand production deployments.",
    arch_integrations: "External Integrations",
    arch_integrations_d:
      "Proven production integrations with enterprise gateways, couriers, and official services.",
    int_payment: "Payment Gateways (EdfaPay / Mada)",
    int_shipping: "Couriers (Aramex / SMSA / Naqel)",
    int_sms: "SMS Gateways & OTP Verification",
    int_notifications: "Instant Push (Firebase FCM)",
    int_maps: "Maps & Geolocation (Google Maps)",
    int_einvoicing: "ZATCA Phase 2 E-Invoicing",
    int_api: "Third-Party APIs & Webhooks",

    // Roles
    role_admin: "Admin",
    role_staff: "Staff",
    role_client: "Client",
    role_lawyer: "Lawyer",
    role_law_firm: "Law Firm",

    // Projects
    projects_kicker: "Portfolio & Case Studies",
    projects_title: "Featured",
    projects_title_hl: "Projects & Platforms",
    projects_desc:
      "Production platforms and mobile backends delivered with rigorous testing and modern architecture.",
    projects_search: "Search projects, technologies (Laravel, ZATCA, RBAC)...",
    projects_filter_all: "All",
    projects_filter_web: "Web SaaS",
    projects_filter_mobile: "Mobile",
    projects_sort_newest: "Newest",
    projects_sort_oldest: "Oldest",
    projects_sort_title: "Alphabetical",
    projects_featured: "Featured Platforms",
    projects_all_list: "All Engineered Projects",
    projects_show_more: "Show More Projects",
    projects_show_less: "Show Less",
    projects_no_results: "No projects match your filter criteria.",
    projects_clear_filters: "Clear Filters",
    project_modal_details: "Project Deep Dive",
    project_modal_tech: "Tech Stack:",
    project_modal_prev: "Previous",
    project_modal_next: "Next",
    project_modal_close: "Close",
    live_preview: "Live Platform",
    google_play: "Google Play",
    code: "Source Code",
    details: "Details",
    load_error: "Unable to load live projects from server.",
    retry: "Try Again",

    // Timeline / Work Journey
    timeline_kicker: "Work Journey & Milestones",
    timeline_title: "Engineering",
    timeline_title_hl: "Journey & Milestones",
    timeline_desc:
      "Chronological milestones showing progressive architectural growth from custom apps to multi-tenant cloud ecosystems.",

    // YouTube / Community Education
    youtube_kicker: "Knowledge Sharing",
    youtube_title: "Technical",
    youtube_title_hl: "Educational Content",
    youtube_desc:
      "Sharing practical software engineering expertise in Laravel, Go, and scalable API design.",
    youtube_cta: "YouTube Channel (Coming Soon)",

    // Launched Sites
    sites_kicker: "Live Ecosystem",
    sites_title: "Launched",
    sites_title_hl: "Platforms (+75)",
    sites_desc:
      "A portfolio of over 75 active production websites, platforms, and mobile apps deployed across the globe.",
    sites_search: "Search domain or title...",
    sites_all: "All",
    sites_web: "Websites",
    sites_apps: "Mobile Apps",
    sites_count: "live links",
    sites_show_more: "Show More",
    sites_show_less: "Show Less",
    visit: "Visit Link",

    // Contact & Footer
    contact_kicker: "Get In Touch",
    contact_title: "Have an ambitious",
    contact_title_hl: "project in mind?",
    contact_desc:
      "Ready to engineer your platform end-to-end: from database architecture and secure APIs to modern responsive UI and deployment.",
    contact_whatsapp: "Chat on WhatsApp",
    contact_github: "GitHub Profile",
    contact_linkedin: "LinkedIn Profile",
    contact_mail: "Send Email",
    rights: "All rights reserved.",
    toggle_theme: "Toggle Theme (Dark / Light)",
    toggle_lang: "Switch Language",
  },
} as const;

export type TKey = keyof (typeof dict)["ar"];

type AppContextType = {
  lang: Lang;
  theme: Theme;
  dir: "rtl" | "ltr";
  t: (key: TKey) => string;
  toggleLang: () => void;
  toggleTheme: () => void;
};

const AppCtx = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("ar");
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const storedLang = localStorage.getItem("portfolio_lang") as Lang | null;
    const storedTheme = localStorage.getItem("portfolio_theme") as Theme | null;
    if (storedLang === "ar" || storedLang === "en") setLang(storedLang);
    if (storedTheme === "dark" || storedTheme === "light") setTheme(storedTheme);
    else setTheme("dark"); // Default dark
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    localStorage.setItem("portfolio_theme", theme);
  }, [theme]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const root = document.documentElement;
    root.lang = lang;
    root.dir = lang === "ar" ? "rtl" : "ltr";
    localStorage.setItem("portfolio_lang", lang);
  }, [lang]);

  const value: AppContextType = {
    lang,
    theme,
    dir: lang === "ar" ? "rtl" : "ltr",
    t: (key: TKey) => (dict[lang] as Record<string, string>)[key] ?? key,
    toggleLang: () => setLang((prev) => (prev === "ar" ? "en" : "ar")),
    toggleTheme: () => setTheme((prev) => (prev === "dark" ? "light" : "dark")),
  };

  return <AppCtx.Provider value={value}>{children}</AppCtx.Provider>;
}

export function useApp() {
  const ctx = useContext(AppCtx);
  if (!ctx) throw new Error("useApp must be used inside AppProvider");
  return ctx;
}
