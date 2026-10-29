export type Lang = "ar" | "en";

export const content = {
  ar: {
    dir: "rtl" as const,
    nav: {
      links: [
        { href: "#about", label: "نبذة" },
        { href: "#skills", label: "المهارات" },
        { href: "#projects", label: "المشاريع" },
        { href: "#contact", label: "تواصل" },
      ],
      cta: "تواصل معي",
      menuOpen: "فتح القائمة",
      menuClose: "إغلاق القائمة",
    },
    hero: {
      badge: "متاح لمشاريع جديدة",
      name: "عبدالرحمن عبده",
      role: "Full-Stack Developer",
      desc: "أبني أنظمة خلفية آمنة وقابلة للتوسع باستخدام Laravel وGo، وأصمّم واجهات برمجية تربط منصات التجارة الإلكترونية والتوصيل والفوترة الإلكترونية — من قاعدة البيانات حتى الإطلاق.",
      ctaProjects: "استعرض المشاريع",
      ctaGithub: "حسابي على GitHub",
      terminal: "abdalrhman@prod ~ % ",
      stats: [
        { value: "+75", label: "مشروع منجز" },
        { value: "+6", label: "سنوات خبرة" },
        { value: "100%", label: "التزام بالتسليم" },
      ],
    },
    about: {
      eyebrow: "about",
      title: "نبذة عني",
      body: "أركّز على تصميم أنظمة نظيفة المعمارية وسهلة الصيانة: بنية متعددة المستأجرين، صلاحيات دقيقة لكل دور، دورات حياة كاملة للطلبات والعمليات، وتقارير ولوحات تحكم. أعمل على منصات تجارة إلكترونية وتوصيل وتعليم وفوترة إلكترونية مرتبطة بمتطلبات جهات رسمية.",
    },
    skills: {
      eyebrow: "skills",
      title: "الترسانة التقنية",
      groups: [
        {
          title: "لغات البرمجة",
          items: [
            ["PHP 8.3", 98],
            ["Go (Golang)", 90],
            ["SQL", 95],
            ["Bash / Shell", 85],
          ],
        },
        {
          title: "أطر العمل & APIs",
          items: [
            ["Laravel 12", 98],
            ["RESTful API Design", 96],
            ["Node.js & Express", 88],
            ["Sanctum & OAuth", 94],
          ],
        },
        {
          title: "قواعد البيانات",
          items: [
            ["PostgreSQL", 95],
            ["MySQL", 95],
            ["Redis (Cache & Queues)", 90],
            ["Database Design", 92],
          ],
        },
        {
          title: "البنية والأمان",
          items: [
            ["Docker & CI/CD", 88],
            ["Multi-Tenant Architecture", 98],
            ["RBAC & API Security", 96],
            ["Monitoring & Performance", 85],
          ],
        },
      ] as [string, number][][],
      integrationsTitle: "التكاملات الخارجية — أنظمة لا مزوّدين، قابلة للتوسع لأي بوابة",
      integrations: [
        "دفع إلكتروني",
        "شحن وتوصيل",
        "رسائل SMS",
        "إشعارات فورية",
        "خرائط وGPS",
        "فوترة إلكترونية ZATCA",
        "ربط APIs خارجية",
      ],
    },
    arch: {
      eyebrow: "system-design",
      title: "تصميم وبناء أنظمة برمجية متقدمة",
      subtitle: "لضمان عزل البيانات، التوافرية العالية، والأمان عبر المشاريع الحية.",
      cards: [
        {
          title: "معمارية متعددة المستأجرين",
          body: "عزل كامل للبيانات والمحتوى مع نطاق فرعي مستقل لكل تاجر أو مكتب داخل نظام سحابي واحد.",
          code: "Request: https://tenant-a.billpro-sa.com\n├── Identify Subdomain: 'tenant-a'\n├── Switch DB: DB_TENANT_A\n└── Return Isolated Scope",
        },
        {
          title: "الصلاحيات والـ RBAC",
          body: "نظام صلاحيات دقيق ينظّم العمل بين خمسة أدوار مع فحص Sanctum عند كل طلب API.",
          code: "Admin · Staff · Client\nLawyer · Law Firm\n@can('manage-case', $case)",
        },
        {
          title: "واجهات REST للجوال",
          body: "خلفيات جاهزة للإنتاج تربط تطبيقات التوصيل والمتاجر مع Firebase وGPS والمحافظ الإلكترونية.",
          code: "POST /api/v1/orders/checkout\nAuthorization: Bearer ****\nStatus: 200 OK | Firebase ✓",
        },
        {
          title: "المحاسبة والتسويات",
          body: "محرك القيد المزدوج وشجرة الحسابات مع احتساب العمولات وتوليد طلبات التحويل آليًا.",
          code: "Dr. Merchant Wallet    1,500\nCr. Commission (5%)       75\nCr. Payable Payout     1,425",
        },
      ],
    },
    projects: {
      eyebrow: "portfolio",
      title: "أحدث المشاريع",
      subtitle: "منصات ويب وتطبيقات موبايل بأنظمة خلفية قوية وقابلة للتوسع.",
      filters: [
        { key: "all", label: "الكل" },
        { key: "web", label: "مواقع" },
        { key: "mobile", label: "تطبيقات" },
      ] as { key: "all" | "web" | "mobile"; label: string }[],
      typeWeb: "منصة ويب",
      typeMobile: "تطبيق جوال",
      visit: "زيارة",
      visitProject: "زيارة المشروع",
      details: "التفاصيل",
      more: "المزيد",
      empty: "لا توجد مشاريع لعرضها حاليًا — تأكد من تشغيل خدمة المشاريع ثم حدّث الصفحة.",
    },
    contact: {
      eyebrow: "contact",
      title: "لديك فكرة مشروع؟",
      body: "يسعدني مناقشة متطلباتك وبناء نظام خلفي يناسب نمو مشروعك.",
      whatsapp: "تواصل عبر واتساب",
      github: "تابعني على GitHub",
    },
    ecosystem: { label: "live-ecosystem" },
    footer: { rights: "© 2026 عبدالرحمن عبده — جميع الحقوق محفوظة." },
  },
  en: {
    dir: "ltr" as const,
    nav: {
      links: [
        { href: "#about", label: "About" },
        { href: "#skills", label: "Skills" },
        { href: "#projects", label: "Projects" },
        { href: "#contact", label: "Contact" },
      ],
      cta: "Contact me",
      menuOpen: "Open menu",
      menuClose: "Close menu",
    },
    hero: {
      badge: "Available for new projects",
      name: "Abdalrhman Abdo",
      role: "Full-Stack Developer",
      desc: "I build secure, scalable backend systems with Laravel and Go, and design APIs that connect e-commerce, delivery, and e-invoicing platforms — from database to launch.",
      ctaProjects: "Explore projects",
      ctaGithub: "My GitHub profile",
      terminal: "abdalrhman@prod ~ % ",
      stats: [
        { value: "+75", label: "Projects delivered" },
        { value: "+6", label: "Years of experience" },
        { value: "100%", label: "On-time delivery" },
      ],
    },
    about: {
      eyebrow: "about",
      title: "About me",
      body: "I focus on designing clean, maintainable system architectures: multi-tenant structures, fine-grained per-role permissions, complete order and operation lifecycles, and dashboards and reports. I work on e-commerce, delivery, education, and e-invoicing platforms tied to official regulatory requirements.",
    },
    skills: {
      eyebrow: "skills",
      title: "The Tech Arsenal",
      groups: [
        {
          title: "Languages",
          items: [
            ["PHP 8.3", 98],
            ["Go (Golang)", 90],
            ["SQL", 95],
            ["Bash / Shell", 85],
          ],
        },
        {
          title: "Frameworks & APIs",
          items: [
            ["Laravel 12", 98],
            ["RESTful API Design", 96],
            ["Node.js & Express", 88],
            ["Sanctum & OAuth", 94],
          ],
        },
        {
          title: "Databases",
          items: [
            ["PostgreSQL", 95],
            ["MySQL", 95],
            ["Redis (Cache & Queues)", 90],
            ["Database Design", 92],
          ],
        },
        {
          title: "Infrastructure & Security",
          items: [
            ["Docker & CI/CD", 88],
            ["Multi-Tenant Architecture", 98],
            ["RBAC & API Security", 96],
            ["Monitoring & Performance", 85],
          ],
        },
      ] as [string, number][][],
      integrationsTitle: "External integrations — systems, not vendors, extensible to any gateway",
      integrations: [
        "Electronic payments",
        "Shipping & delivery",
        "SMS messaging",
        "Instant notifications",
        "Maps & GPS",
        "E-invoicing (ZATCA)",
        "External API integrations",
      ],
    },
    arch: {
      eyebrow: "system-design",
      title: "Advanced system design & engineering",
      subtitle: "Ensuring data isolation, high availability, and security across live projects.",
      cards: [
        {
          title: "Multi-Tenant Architecture",
          body: "Full data and content isolation with a dedicated subdomain for every merchant or office inside a single cloud system.",
          code: "Request: https://tenant-a.billpro-sa.com\n├── Identify Subdomain: 'tenant-a'\n├── Switch DB: DB_TENANT_A\n└── Return Isolated Scope",
        },
        {
          title: "Permissions & RBAC",
          body: "A strict permission system organizing work across five roles, with a Sanctum check on every API request.",
          code: "Admin · Staff · Client\nLawyer · Law Firm\n@can('manage-case', $case)",
        },
        {
          title: "REST APIs for Mobile",
          body: "Production-ready backends connecting delivery and marketplace apps with Firebase, GPS, and e-wallets.",
          code: "POST /api/v1/orders/checkout\nAuthorization: Bearer ****\nStatus: 200 OK | Firebase ✓",
        },
        {
          title: "Accounting & Payouts",
          body: "A double-entry ledger engine and chart of accounts with automated commissions and payout requests.",
          code: "Dr. Merchant Wallet    1,500\nCr. Commission (5%)       75\nCr. Payable Payout     1,425",
        },
      ],
    },
    projects: {
      eyebrow: "portfolio",
      title: "Latest Projects",
      subtitle: "Web platforms and mobile apps powered by strong, scalable backends.",
      filters: [
        { key: "all", label: "All" },
        { key: "web", label: "Websites" },
        { key: "mobile", label: "Apps" },
      ] as { key: "all" | "web" | "mobile"; label: string }[],
      typeWeb: "Web platform",
      typeMobile: "Mobile app",
      visit: "Visit",
      visitProject: "Visit project",
      details: "Details",
      more: "Show more",
      empty: "No projects to show right now — make sure the projects service is running, then refresh.",
    },
    contact: {
      eyebrow: "contact",
      title: "Have a project idea?",
      body: "I'd love to discuss your requirements and build a backend system that fits your growth.",
      whatsapp: "Chat on WhatsApp",
      github: "Follow me on GitHub",
    },
    ecosystem: { label: "live-ecosystem" },
    footer: { rights: "© 2026 Abdalrhman Abdo — All rights reserved." },
  },
};

export type Content = (typeof content)["ar"];
