export interface FrameworkChip {
  name: string;
  isPrimary?: boolean;
  tooltipAr: string;
  tooltipEn: string;
}

export interface LanguageCard {
  id: string;
  code: string;
  name: string;
  badgeAr: string;
  badgeEn: string;
  summaryAr: string;
  summaryEn: string;
  isPrimarySpecialization: boolean;
  accentColor: string;
  borderColor: string;
  glowColor: string;
  frameworks: FrameworkChip[];
}

export const MAIN_LANGUAGES: LanguageCard[] = [
  {
    id: "php",
    code: "PHP",
    name: "PHP",
    badgeAr: "التخصص الأساسي · الأكثر استخداماً",
    badgeEn: "Core Specialization · Most Used",
    summaryAr: "العمود الفقري لبناء منصات الـ SaaS متعددة المستأجرين والأنظمة المالية المتوافقة مع ZATCA.",
    summaryEn: "Backbone for multi-tenant SaaS platforms, ERP systems, and ZATCA-compliant billing.",
    isPrimarySpecialization: true,
    accentColor: "from-indigo-500 to-purple-600",
    borderColor: "border-purple-500/30",
    glowColor: "rgba(168, 85, 247, 0.14)",
    frameworks: [
      {
        name: "Laravel",
        isPrimary: true,
        tooltipAr: "بناء أنظمة SaaS متعددة المستأجرين والربط المباشر مع ZATCA وبوابات الدفع",
        tooltipEn: "Multi-tenant SaaS platforms, ZATCA Phase 2 e-invoicing & payment gateways",
      },
      {
        name: "Sanctum",
        isPrimary: true,
        tooltipAr: "توثيق التوكنات وفحص الصلاحيات الدقيقة (RBAC) عند كل طلب API",
        tooltipEn: "Stateless API token authentication and granular RBAC policy gates",
      },
      {
        name: "Livewire",
        tooltipAr: "واجهات تفاعلية ديناميكية فورية للوحات التحكم والتقارير الإدارية",
        tooltipEn: "Reactive server-driven interfaces for real-time admin dashboards",
      },
      {
        name: "Symfony Components",
        tooltipAr: "مكونات HTTP و Console و Serializer لمعالجة البيانات عالية الكثافة",
        tooltipEn: "HTTP foundation, CLI workers & high-performance data serializers",
      },
    ],
  },
  {
    id: "golang",
    code: "Go",
    name: "Go (Golang)",
    badgeAr: "التخصص الأساسي · تزامن وأداء فائق",
    badgeEn: "Core Specialization · High Concurrency",
    summaryAr: "محرك الخدمات المصغرة (Microservices) والـ APIs فائقة السرعة ذات الاستهلاك المنخفض للذاكرة.",
    summaryEn: "Engine for low-latency microservices, concurrent workers, and high-throughput APIs.",
    isPrimarySpecialization: true,
    accentColor: "from-cyan-500 to-blue-600",
    borderColor: "border-cyan-500/30",
    glowColor: "rgba(6, 182, 212, 0.14)",
    frameworks: [
      {
        name: "Gin",
        isPrimary: true,
        tooltipAr: "بناء مايكروسيرفس وAPIs عالية السرعة لمعالجة آلاف الطلبات بالثانية",
        tooltipEn: "High-throughput REST microservices handling thousands of req/sec",
      },
      {
        name: "Fiber",
        isPrimary: true,
        tooltipAr: "محرك REST فائق السرعة مبني على Fasthttp للمهام الحساسة للزمن",
        tooltipEn: "Ultra-fast HTTP engine built on Fasthttp for latency-critical services",
      },
      {
        name: "GORM",
        tooltipAr: "إدارة قواعد البيانات والعلاقات المعقدة والـ ACID Transactions بأمان",
        tooltipEn: "Type-safe ORM with strict ACID transaction management and migrations",
      },
      {
        name: "Goroutines & gRPC",
        tooltipAr: "معالجة متزامنة في الخلفية وتواصل سريع وموثوق بين الخدمات الموزعة",
        tooltipEn: "Concurrent background pipelines and typed inter-service RPC communication",
      },
    ],
  },
  {
    id: "typescript",
    code: "TS",
    name: "TypeScript",
    badgeAr: "تطوير شامل · أمان نوعي صارم",
    badgeEn: "Full-Stack · Strict Type Safety",
    summaryAr: "تطوير واجهات حديثة وخوادم معيارية بعقود بيانات صارمة تمنع الأخطاء وقت البناء.",
    summaryEn: "End-to-end type-safe frontends and modular backends with zero runtime contract drift.",
    isPrimarySpecialization: false,
    accentColor: "from-blue-500 to-indigo-600",
    borderColor: "border-blue-500/25",
    glowColor: "rgba(59, 130, 246, 0.1)",
    frameworks: [
      {
        name: "Next.js",
        isPrimary: true,
        tooltipAr: "تطبيقات ويب متكاملة مع SSR وأداء استثنائي لمحركات البحث SEO",
        tooltipEn: "Full-stack web platforms with SSR, routing, and high-speed SEO",
      },
      {
        name: "NestJS",
        tooltipAr: "بنية خوادم مؤسسية مع Dependency Injection وتصميم Modular نظيف",
        tooltipEn: "Enterprise Node architecture with DI and clean modular boundaries",
      },
      {
        name: "Prisma",
        tooltipAr: "مخططات واستعلامات قواعد بيانات آمنة النوعية بالكامل مع ترحيل آلي",
        tooltipEn: "Strongly typed database schemas, queries, and automated migrations",
      },
    ],
  },
  {
    id: "javascript",
    code: "JS",
    name: "JavaScript",
    badgeAr: "بيئة الويب والواجهات التفاعلية",
    badgeEn: "Reactive UI & Web Ecosystem",
    summaryAr: "بناء لوحات تحكم تفاعلية وخدمات لحظية غير متزامنة عبر الويب والخوادم.",
    summaryEn: "Interactive single-page dashboards, WebSockets, and asynchronous event services.",
    isPrimarySpecialization: false,
    accentColor: "from-amber-500 to-orange-500",
    borderColor: "border-amber-500/25",
    glowColor: "rgba(245, 158, 11, 0.1)",
    frameworks: [
      {
        name: "React",
        isPrimary: true,
        tooltipAr: "واجهات مستخدم تفاعلية متجاوبة ولوحات تحكم ERP سلسة وسريعة",
        tooltipEn: "Component-driven responsive UIs and complex interactive ERP dashboards",
      },
      {
        name: "Node.js",
        tooltipAr: "الخدمات غير المتزامنة وWebSockets والمهام المجدولة في الخلفية",
        tooltipEn: "Asynchronous I/O services, real-time WebSockets & background workers",
      },
      {
        name: "Express.js",
        tooltipAr: "بناء بوابات API خفيفة وMiddlewares مخصصة للمصادقة والتوجيه",
        tooltipEn: "Lightweight API gateways and custom authentication middlewares",
      },
    ],
  },
];

export interface SupportingTool {
  name: string;
  group: "data" | "architecture" | "devops";
  categoryAr: string;
  categoryEn: string;
  tooltipAr: string;
  tooltipEn: string;
}

export const SUPPORTING_TOOLS: SupportingTool[] = [
  {
    name: "PostgreSQL",
    group: "data",
    categoryAr: "قواعد بيانات",
    categoryEn: "Database",
    tooltipAr: "فهارس متقدمة، JSONB، وعزل كامل لبيانات الشركات في أنظمة Multi-Tenant",
    tooltipEn: "Advanced indexing, JSONB & isolated schemas for multi-tenant SaaS",
  },
  {
    name: "MySQL",
    group: "data",
    categoryAr: "قواعد بيانات",
    categoryEn: "Database",
    tooltipAr: "محرك InnoDB، تحسين الاستعلامات المعقدة، والعمليات المالية المحاسبية",
    tooltipEn: "InnoDB tuning, complex query optimization and financial ledger transactions",
  },
  {
    name: "Redis",
    group: "data",
    categoryAr: "تخزين مؤقت وطوابير",
    categoryEn: "Cache & Queues",
    tooltipAr: "إدارة الطوابير Queues، التخزين المؤقت السريع، وتحديد معدل الطلبات",
    tooltipEn: "Queue dispatching, high-speed caching & API rate limiting",
  },
  {
    name: "Multi-Tenancy",
    group: "architecture",
    categoryAr: "المعمارية السحابية",
    categoryEn: "Cloud Architecture",
    tooltipAr: "عزل قواعد البيانات والنطاقات الفرعية لكل شركة في نظام سحابي موحد",
    tooltipEn: "Complete database and subdomain isolation per tenant in a shared platform",
  },
  {
    name: "REST APIs & Webhooks",
    group: "architecture",
    categoryAr: "واجهات الربط",
    categoryEn: "API Contracts",
    tooltipAr: "واجهات قياسية موثقة بمعايير OpenAPI مع Webhooks لإشعارات الأحداث",
    tooltipEn: "OpenAPI compliant contracts with reliable event-driven webhooks",
  },
  {
    name: "JWT & OAuth (Sanctum)",
    group: "architecture",
    categoryAr: "الأمان والصلاحيات",
    categoryEn: "Security & RBAC",
    tooltipAr: "التحقق الآمن من الهوية والتوكنات وعزل الصلاحيات عند كل طلب",
    tooltipEn: "Secure token validation and granular permission checks on every request",
  },
  {
    name: "Docker & Compose",
    group: "devops",
    categoryAr: "الحاويات السحابية",
    categoryEn: "Containers",
    tooltipAr: "توحيد بيئات التطوير والإنتاج وعزل الخدمات في حاويات مستقلة",
    tooltipEn: "Containerizing services for consistent dev & production environments",
  },
  {
    name: "CI/CD Pipelines",
    group: "devops",
    categoryAr: "الأتمتة والنشر",
    categoryEn: "Automation",
    tooltipAr: "أتمتة الاختبارات والتجميع والنشر الآلي بدون توقف للخدمة",
    tooltipEn: "Automated test runs, build verification and zero-downtime deploys",
  },
];
