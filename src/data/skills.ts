export interface FrameworkChip {
  name: string;
  isPrimary?: boolean;
  tooltipAr: string;
  tooltipEn: string;
}

export interface LanguageCard {
  id: string;
  name: string;
  badgeAr: string;
  badgeEn: string;
  isPrimarySpecialization: boolean; // For PHP & Go (larger card)
  accentColor: string; // Tailwind color class or hex
  borderColor: string;
  glowColor: string;
  frameworks: FrameworkChip[];
}

export const MAIN_LANGUAGES: LanguageCard[] = [
  {
    id: "php",
    name: "PHP",
    badgeAr: "التخصص الرئيسي · الأكثر استخداماً",
    badgeEn: "Core Specialization · Most Used",
    isPrimarySpecialization: true,
    accentColor: "from-indigo-500 to-purple-600",
    borderColor: "border-purple-500/30",
    glowColor: "rgba(168, 85, 247, 0.15)",
    frameworks: [
      {
        name: "Laravel",
        isPrimary: true,
        tooltipAr: "الأساسي: بناء أنظمة SaaS متعددة المستأجرين والربط مع ZATCA",
        tooltipEn: "Primary: Multi-tenant SaaS platforms & ZATCA e-invoicing",
      },
      {
        name: "Sanctum",
        isPrimary: true,
        tooltipAr: "توثيق التوكنات والتحقق من الصلاحيات عند كل طلب API",
        tooltipEn: "Token authentication and request policy authorization",
      },
      {
        name: "Livewire",
        tooltipAr: "واجهات تفاعلية ديناميكية للوحات التحكم الإدارية",
        tooltipEn: "Reactive real-time interfaces for admin dashboards",
      },
      {
        name: "Symfony Components",
        tooltipAr: "مكونات الـ HTTP و Console والـ Serializer لمعالجة البيانات",
        tooltipEn: "HTTP foundation, console commands & data serializers",
      },
    ],
  },
  {
    id: "golang",
    name: "Go (Golang)",
    badgeAr: "التخصص الرئيسي · أداء متزامن فائق",
    badgeEn: "Core Specialization · High Concurrency",
    isPrimarySpecialization: true,
    accentColor: "from-cyan-400 to-blue-500",
    borderColor: "border-cyan-500/30",
    glowColor: "rgba(6, 182, 212, 0.15)",
    frameworks: [
      {
        name: "Gin",
        isPrimary: true,
        tooltipAr: "مايكروسيرفس وAPIs عالية السرعة بمعالجة آلاف الطلبات بالثانية",
        tooltipEn: "High-throughput microservices handling thousands of req/sec",
      },
      {
        name: "Fiber",
        tooltipAr: "محرك REST سريع مبني على Fasthttp للمهام الحساسة للوقت",
        tooltipEn: "Ultra-fast REST engine powered by Fasthttp for low-latency tasks",
      },
      {
        name: "GORM",
        tooltipAr: "التعامل مع قواعد البيانات والعلاقات المعقدة والـ Transactions بأمان",
        tooltipEn: "Type-safe ORM with ACID transaction management and migrations",
      },
    ],
  },
  {
    id: "typescript",
    name: "TypeScript",
    badgeAr: "نمط كتابة صارم وموثوق",
    badgeEn: "Strict Type Safety",
    isPrimarySpecialization: false,
    accentColor: "from-blue-500 to-indigo-600",
    borderColor: "border-blue-500/30",
    glowColor: "rgba(59, 130, 246, 0.15)",
    frameworks: [
      {
        name: "NestJS",
        tooltipAr: "بنية خوادم مؤسسية مع Dependency Injection ونمط Modular نظيف",
        tooltipEn: "Enterprise backend architecture with DI and modular design",
      },
      {
        name: "Next.js",
        tooltipAr: "تطبيقات Full-Stack متقدمة مع SSR و SEO فائق السرعة",
        tooltipEn: "Full-Stack applications with SSR and optimized SEO performance",
      },
      {
        name: "Prisma",
        tooltipAr: "استعلامات ومخططات قواعد بيانات آمنة النوعية بالكامل",
        tooltipEn: "Next-generation type-safe ORM and automated migrations",
      },
    ],
  },
  {
    id: "javascript",
    name: "JavaScript",
    badgeAr: "بيئة الويب والخوادم الشاملة",
    badgeEn: "Full-Stack Ecosystem",
    isPrimarySpecialization: false,
    accentColor: "from-amber-400 to-yellow-500",
    borderColor: "border-amber-500/30",
    glowColor: "rgba(245, 158, 11, 0.15)",
    frameworks: [
      {
        name: "Node.js",
        tooltipAr: "الخدمات غير المتزامنة وWebSockets والمهام المجدولة في الخلفية",
        tooltipEn: "Asynchronous I/O services, WebSockets & background workers",
      },
      {
        name: "Express.js",
        tooltipAr: "بناء واجهات برمجية خفيفة وMiddlewares مخصصة للمصادقة والتحقق",
        tooltipEn: "Lightweight APIs and custom authentication middlewares",
      },
      {
        name: "React",
        tooltipAr: "واجهات مستخدم تفاعلية متجاوبة ولوحات تحكم ERP قوية",
        tooltipEn: "Reactive component-driven UIs and scalable ERP dashboards",
      },
    ],
  },
];

export interface SupportingTool {
  name: string;
  category: "database" | "devops" | "architecture" | "security";
  categoryAr: string;
  categoryEn: string;
  tooltipAr: string;
  tooltipEn: string;
}

export const SUPPORTING_TOOLS: SupportingTool[] = [
  {
    name: "PostgreSQL",
    category: "database",
    categoryAr: "قواعد بيانات",
    categoryEn: "Database",
    tooltipAr: "فهارس متقدمة، JSONB، وعزل كامل لبيانات الشركات في أنظمة Multi-Tenant",
    tooltipEn: "Advanced indexing, JSONB & isolated schemas for multi-tenant SaaS",
  },
  {
    name: "MySQL",
    category: "database",
    categoryAr: "قواعد بيانات",
    categoryEn: "Database",
    tooltipAr: "محرك InnoDB، تحسين الاستعلامات المعقدة، والعمليات المالية المحاسبية",
    tooltipEn: "InnoDB tuning, complex query optimization and financial ledger transactions",
  },
  {
    name: "Redis",
    category: "database",
    categoryAr: "تخزين مؤقت وطوابير",
    categoryEn: "Cache & Queues",
    tooltipAr: "إدارة الـ Queues، الـ Caching السريع، وتحديد معدل الطلبات Rate Limiting",
    tooltipEn: "Queue dispatching, high-speed caching & API rate limiting",
  },
  {
    name: "Docker & Compose",
    category: "devops",
    categoryAr: "البنية والنشر",
    categoryEn: "DevOps",
    tooltipAr: "توحيد بيئات التطوير والإنتاج وعزل الخدمات في الحاويات السحابية",
    tooltipEn: "Containerizing services for consistent dev & production environments",
  },
  {
    name: "CI/CD Pipelines",
    category: "devops",
    categoryAr: "الأتمتة والنشر",
    categoryEn: "Automation",
    tooltipAr: "أتمتة الاختبارات والتجميع والنشر الآلي على الخوادم وVercel",
    tooltipEn: "Automated test runs, build verification and zero-downtime deploys",
  },
  {
    name: "REST APIs & Webhooks",
    category: "architecture",
    categoryAr: "المعمارية",
    categoryEn: "Architecture",
    tooltipAr: "واجهات موثقة بمعايير OpenAPI/Swagger مع Webhooks لإشعارات الأحداث",
    tooltipEn: "OpenAPI compliant contracts with event-driven webhooks",
  },
  {
    name: "JWT & OAuth2 (Sanctum)",
    category: "security",
    categoryAr: "الأمان",
    categoryEn: "Security",
    tooltipAr: "التحقق الآمن من الهوية والتوكنات والصلاحيات عند كل طلب",
    tooltipEn: "Secure token validation and granular permission checks on every request",
  },
  {
    name: "Multi-Tenancy",
    category: "architecture",
    categoryAr: "المعمارية السحابية",
    categoryEn: "Cloud Architecture",
    tooltipAr: "عزل قواعد البيانات والنطاقات الفرعية لكل شركة في نظام سحابي موحد",
    tooltipEn: "Complete database and subdomain isolation per tenant in a shared platform",
  },
];
