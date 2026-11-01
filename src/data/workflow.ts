export interface WorkflowStep {
  step: string;
  titleAr: string;
  titleEn: string;
  descAr: string;
  descEn: string;
  deliverablesAr: string[];
  deliverablesEn: string[];
  icon: string;
}

export const WORKFLOW_STEPS: WorkflowStep[] = [
  {
    step: "01",
    titleAr: "الاستكشاف وتحليل المتطلبات (Discovery)",
    titleEn: "Discovery & Requirements Analysis",
    descAr:
      "فهم عميق لنموذج العمل، دورات حياة الطلبات، أنواع المستخدمين، حجم الترافيك المتوقع، والأنظمة الخارجية المطلوب التكامل معها (بوابات دفع، شحن، جهات رسمية).",
    descEn:
      "In-depth comprehension of business logic, request lifecycles, user personas, expected traffic throughput, and third-party integration constraints.",
    deliverablesAr: [
      "مخطط تدفق العمليات (Flow Diagram)",
      "هيكلة البيانات وقواعد البيانات",
      "تحديد معايير الأمان والأداء",
    ],
    deliverablesEn: [
      "Process Flow Diagrams",
      "Schema Specifications",
      "Security & Latency Baselines",
    ],
    icon: "Compass",
  },
  {
    step: "02",
    titleAr: "التصميم المعماري والهيكلي (Architecture)",
    titleEn: "System Design & Technical Architecture",
    descAr:
      "اختيار الأنماط المعمارية المناسبة: عزل المستأجرين (Multi-Tenancy)، تصميم مصفوفة الصلاحيات (RBAC)، عقود الـ APIs، واستراتيجيات التخزين المؤقت (Caching).",
    descEn:
      "Architecting tenant isolation models, RBAC role-permission matrices, OpenAPI contracts, and Redis caching/queue strategies.",
    deliverablesAr: [
      "مخطط المعمارية السحابية",
      "توثيق عقود الـ APIs",
      "نموذج عزل المستأجرين والصلاحيات",
    ],
    deliverablesEn: [
      "Cloud Architecture Diagrams",
      "API Contract Specifications",
      "Tenant Isolation Blueprint",
    ],
    icon: "Cpu",
  },
  {
    step: "03",
    titleAr: "البناء والتطوير النظيف (Build & Testing)",
    titleEn: "Clean Coding & Rigorous Testing",
    descAr:
      "كتابة كود نظيف وقابل للصيانة يتبع مبادئ SOLID، تطبيق المعاملات البنكية المحاسبية الدقيقة (ACID)، وإجراء اختبارات وحدات وتكامل مؤتمتة لضمان استقرار كل نقطة وصول.",
    descEn:
      "Writing clean, test-driven code adhering to SOLID principles, ensuring ACID guarantees on ledger entries, and validating endpoints with automated tests.",
    deliverablesAr: [
      "أنظمة خلفية جاهزة للإنتاج",
      "معاملات آمنة ومشفّرة بالكامل",
      "تغطية باختبارات مؤتمتة",
    ],
    deliverablesEn: [
      "Production-Ready Backend",
      "Strictly Validated Endpoints",
      "Automated Test Coverage",
    ],
    icon: "Code2",
  },
  {
    step: "04",
    titleAr: "النشر والمراقبة المستمرة (Delivery & Monitoring)",
    titleEn: "Deployment & Continuous Monitoring",
    descAr:
      "نشر المنظومة عبر بيئات سحابية مؤمنة وحاويات Docker، إعداد الـ CI/CD، تهيئة مراقبة الأداء وLogs الأخطاء، مع توثيق شامل وسلس لتسليم الفريق.",
    descEn:
      "Containerized deployment with zero-downtime CI/CD pipelines, live logging, health monitoring, and comprehensive developer documentation.",
    deliverablesAr: [
      "نشر مباشر ومستقر",
      "مراقبة التوافرية والأداء",
      "توثيق كامل للـ APIs والإدارة",
    ],
    deliverablesEn: [
      "Zero-Downtime Deployment",
      "Live Health Monitoring",
      "Complete API & Admin Docs",
    ],
    icon: "Rocket",
  },
];
