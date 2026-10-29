export const SITE_CONFIG = {
  name: {
    ar: "عبدالرحمن عبده",
    en: "Abdalrhman Abdo",
  },
  role: {
    ar: "Full-Stack Developer",
    en: "Full-Stack Developer",
  },
  techBadges: ["Laravel", "Go", "React", "TypeScript"],
  tagline: {
    ar: "أبني منصات SaaS وتجارة إلكترونية متعددة المستأجرين — من الـ API للواجهة للنشر",
    en: "Building multi-tenant SaaS & e-commerce platforms — from API to UI to deployment",
  },
  bio: {
    ar: "مطور Full-Stack متخصص في هندسة وبناء المنظومات السحابية المعقدة (Laravel & Go) والواجهات الحديثة سريعة الاستجابة (React & TypeScript). خبرة تزيد عن 6 سنوات في تصميم معماريات Multi-Tenant، أنظمة الصلاحيات RBAC، بوابات الدفع والربط مع ZATCA والأنظمة الحكومية، والربط مع تطبيقات الموبايل والمحافظ الإلكترونية.",
    en: "Full-Stack Developer specializing in robust cloud backends (Laravel & Go) and modern reactive interfaces (React & TypeScript). Over 6 years of experience engineering multi-tenant SaaS architectures, granular RBAC systems, ZATCA e-invoicing integrations, payment gateways, and high-performance REST APIs.",
  },
  stats: [
    { value: "+75", labelKey: "stat_projects" as const, num: 75, suffix: "+" },
    { value: "+6", labelKey: "stat_years" as const, num: 6, suffix: "+" },
    { value: "100%", labelKey: "stat_commit" as const, num: 100, suffix: "%" },
    { value: "+15M", labelKey: "stat_requests" as const, num: 15, suffix: "M+" },
  ],
  links: {
    github: "https://github.com/AbdalrhmanAbdoAlhade",
    linkedin: "https://www.linkedin.com/in/abdalrhman-abdalnabe/",
    whatsapp: "https://wa.me/201023402756",
    email: "mailto:contact@zh-innovation.tech",
    youtube: "https://youtube.com/@AbdalrhmanAbdo", // placeholder for Laravel educational content
    avatar: "https://avatars.githubusercontent.com/u/161177575?v=4",
  },
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || "https://api.zh-innovation.tech",
} as const;

export type SiteConfig = typeof SITE_CONFIG;
