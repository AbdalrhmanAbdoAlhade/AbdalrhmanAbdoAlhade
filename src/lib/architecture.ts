export const WHATSAPP_URL = "https://wa.me/201023402756";

export type PillarIcon = "Building2" | "ShieldCheck" | "Smartphone" | "Wallet";

export type ArchitecturePillar = {
  id: string;
  icon: PillarIcon;
  titleKey: "arch_pillar_tenant" | "arch_pillar_rbac" | "arch_pillar_api" | "arch_pillar_payouts";
  descKey: "arch_pillar_tenant_d" | "arch_pillar_rbac_d" | "arch_pillar_api_d" | "arch_pillar_payouts_d";
  flow?: string;
  roles?: readonly ("role_admin" | "role_staff" | "role_client" | "role_lawyer" | "role_law_firm")[];
  code?: string;
};

export const architecturePillars: ArchitecturePillar[] = [
  {
    id: "multi-tenancy",
    icon: "Building2",
    titleKey: "arch_pillar_tenant",
    descKey: "arch_pillar_tenant_d",
    flow: `Request: https://tenant-a.billpro-sa.com
├── Identify Subdomain: 'tenant-a'
├── Switch Database Connection: DB_TENANT_A
├── Apply Storage Context: tenant_asset('invoice.pdf')
└── Return Isolated Scope JSON Response`,
  },
  {
    id: "rbac",
    icon: "ShieldCheck",
    titleKey: "arch_pillar_rbac",
    descKey: "arch_pillar_rbac_d",
    roles: ["role_admin", "role_staff", "role_client", "role_lawyer", "role_law_firm"],
    code: "@can('manage-case', $case)",
  },
  {
    id: "mobile-api",
    icon: "Smartphone",
    titleKey: "arch_pillar_api",
    descKey: "arch_pillar_api_d",
    code: `POST /api/v1/orders/checkout
Authorization: Bearer 89|sanctum_token
Payload: { store_id: 12, coords: { lat, lng } }
Status: 200 OK | Firebase Notification Broadcasted`,
  },
  {
    id: "payouts",
    icon: "Wallet",
    titleKey: "arch_pillar_payouts",
    descKey: "arch_pillar_payouts_d",
    code: `Ledger Entry: Debit = Credit
Dr. Merchant Wallet: 1,500 SAR
Cr. Platform Commission (5%): 75 SAR
Cr. Payable Payout: 1,425 SAR`,
  },
];

export type SkillGroupTitleKey =
  | "arch_skills_languages"
  | "arch_skills_frameworks"
  | "arch_skills_databases"
  | "arch_skills_devops";

export const skillGroups: {
  titleKey: SkillGroupTitleKey;
  skills: { name: string; pct: number }[];
}[] = [
  {
    titleKey: "arch_skills_languages",
    skills: [
      { name: "PHP 8.3", pct: 98 },
      { name: "Go (Golang)", pct: 90 },
      { name: "SQL", pct: 95 },
      { name: "Bash / Shell", pct: 85 },
    ],
  },
  {
    titleKey: "arch_skills_frameworks",
    skills: [
      { name: "Laravel 12", pct: 98 },
      { name: "RESTful API Design", pct: 96 },
      { name: "Node.js & Express.js", pct: 88 },
      { name: "Laravel Sanctum & OAuth", pct: 94 },
    ],
  },
  {
    titleKey: "arch_skills_databases",
    skills: [
      { name: "PostgreSQL", pct: 95 },
      { name: "MySQL", pct: 95 },
      { name: "Redis (Cache & Queues)", pct: 90 },
      { name: "Database Design & Indexing", pct: 92 },
    ],
  },
  {
    titleKey: "arch_skills_devops",
    skills: [
      { name: "Docker & Docker Compose", pct: 88 },
      { name: "CI/CD Pipelines", pct: 85 },
      { name: "Multi-Tenant Architecture", pct: 98 },
      { name: "RBAC & API Security", pct: 96 },
    ],
  },
];

export type IntegrationIcon =
  | "CreditCard"
  | "Truck"
  | "MessageSquare"
  | "Bell"
  | "MapPin"
  | "FileText"
  | "Link2";

export type IntegrationCategory = {
  icon: IntegrationIcon;
  labelKey:
    | "int_payment"
    | "int_shipping"
    | "int_sms"
    | "int_notifications"
    | "int_maps"
    | "int_einvoicing"
    | "int_api";
};

export const integrationCategories: IntegrationCategory[] = [
  { icon: "CreditCard", labelKey: "int_payment" },
  { icon: "Truck", labelKey: "int_shipping" },
  { icon: "MessageSquare", labelKey: "int_sms" },
  { icon: "Bell", labelKey: "int_notifications" },
  { icon: "MapPin", labelKey: "int_maps" },
  { icon: "FileText", labelKey: "int_einvoicing" },
  { icon: "Link2", labelKey: "int_api" },
];
