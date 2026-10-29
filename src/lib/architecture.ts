import { SITE_CONFIG } from "@/config/site-config";

export const WHATSAPP_URL = SITE_CONFIG.links.whatsapp;

export type PillarIcon = "Building2" | "ShieldCheck" | "Smartphone" | "Wallet" | "Layers" | "Cpu";

export type ArchitecturePillar = {
  id: string;
  icon: PillarIcon;
  titleKey: "arch_pillar_tenant" | "arch_pillar_rbac" | "arch_pillar_api" | "arch_pillar_payouts";
  descKey:
    "arch_pillar_tenant_d" | "arch_pillar_rbac_d" | "arch_pillar_api_d" | "arch_pillar_payouts_d";
  language: "bash" | "php" | "http" | "typescript" | "go";
  tag: string;
  flow?: string;
  roles?: readonly (
    "role_admin" | "role_staff" | "role_client" | "role_lawyer" | "role_law_firm"
  )[];
  code: string;
};

export const architecturePillars: ArchitecturePillar[] = [
  {
    id: "multi-tenancy",
    icon: "Building2",
    titleKey: "arch_pillar_tenant",
    descKey: "arch_pillar_tenant_d",
    tag: "Isolation & Routing",
    language: "bash",
    flow: `Request: https://tenant-a.billpro-sa.com
├── Resolve Subdomain: 'tenant-a'
├── Switch DB Connection: DB_TENANT_A
├── Storage Path: storage/tenants/tenant-a/invoices/
└── Return Isolated Scope JSON Response (ZATCA Compliant)`,
    code: `// Multi-Tenancy Middleware & DB Switcher
public function handle(Request $request, Closure $next) {
    $tenant = Tenant::where('subdomain', $request->subdomain())->firstOrFail();
    DB::purge('tenant');
    config(['database.connections.tenant.database' => $tenant->database_name]);
    DB::reconnect('tenant');
    app()->instance('current_tenant', $tenant);
    return $next($request);
}`,
  },
  {
    id: "rbac",
    icon: "ShieldCheck",
    titleKey: "arch_pillar_rbac",
    descKey: "arch_pillar_rbac_d",
    tag: "Security & Permissions",
    language: "php",
    roles: ["role_admin", "role_staff", "role_client", "role_lawyer", "role_law_firm"],
    code: `// Granular Policy Guard with Sanctum Context
public function updateCase(User $user, LegalCase $case): bool {
    if ($user->hasRole('admin')) return true;
    if ($user->hasRole('lawyer') && $case->assigned_lawyer_id === $user->id) {
        return $case->status->allowsLawyerEdits();
    }
    return $user->hasRole('law_firm') && $case->firm_id === $user->firm_id;
}`,
  },
  {
    id: "mobile-api",
    icon: "Smartphone",
    titleKey: "arch_pillar_api",
    descKey: "arch_pillar_api_d",
    tag: "High Concurrency & REST",
    language: "http",
    code: `POST /api/v1/orders/checkout HTTP/1.1
Host: api.zh-innovation.tech
Authorization: Bearer 89|sanctum_token_verified
Content-Type: application/json

{
  "cart_id": "cart_9921",
  "payment_method": "edfapay",
  "coordinates": { "lat": 24.7136, "lng": 46.6753 },
  "idempotency_key": "idem_8823f9a12c"
}

HTTP/1.1 200 OK
{ "status": "processing", "order_id": 40219, "fcm_dispatched": true }`,
  },
  {
    id: "payouts",
    icon: "Wallet",
    titleKey: "arch_pillar_payouts",
    descKey: "arch_pillar_payouts_d",
    tag: "Fintech & Automated Ledger",
    language: "go",
    code: `// Double-Entry Balanced Payout Transaction
func ProcessPayout(ctx context.Context, merchantID string, amountCents int64) error {
    commissionCents := int64(float64(amountCents) * 0.05) // 5% fee
    netPayable := amountCents - commissionCents

    tx := ledger.NewTransaction()
    tx.Debit("MerchantWallet:"+merchantID, amountCents)
    tx.Credit("PlatformCommission", commissionCents)
    tx.Credit("PayableGateway", netPayable)
    return tx.CommitIfBalanced(ctx) // Ensures Debit == Credit
}`,
  },
];

export type SkillGroupTitleKey =
  | "arch_skills_frontend"
  | "arch_skills_languages"
  | "arch_skills_frameworks"
  | "arch_skills_databases"
  | "arch_skills_devops";

export const skillGroups: {
  titleKey: SkillGroupTitleKey;
  skills: { name: string; pct: number }[];
}[] = [
  {
    titleKey: "arch_skills_frontend",
    skills: [
      { name: "React 19 & Next.js", pct: 95 },
      { name: "TypeScript & Strict Typing", pct: 94 },
      { name: "Tailwind CSS & Shadcn UI", pct: 96 },
      { name: "TanStack Router & Start", pct: 92 },
      { name: "Flutter & Mobile Integration", pct: 88 },
    ],
  },
  {
    titleKey: "arch_skills_languages",
    skills: [
      { name: "PHP 8.3 & Modern Features", pct: 98 },
      { name: "Go (Golang) Microservices", pct: 90 },
      { name: "SQL & Query Tuning", pct: 95 },
      { name: "Bash & Linux Shell", pct: 88 },
    ],
  },
  {
    titleKey: "arch_skills_frameworks",
    skills: [
      { name: "Laravel 12 / 11 Ecosystem", pct: 98 },
      { name: "RESTful API & RPC Design", pct: 96 },
      { name: "Node.js & Express / Fastify", pct: 88 },
      { name: "Laravel Sanctum, Passport, JWT", pct: 95 },
    ],
  },
  {
    titleKey: "arch_skills_databases",
    skills: [
      { name: "PostgreSQL & Complex Indexes", pct: 95 },
      { name: "MySQL & InnoDB Performance", pct: 95 },
      { name: "Redis (Cache, Pub/Sub, Queues)", pct: 92 },
      { name: "Database Schema Architecture", pct: 94 },
    ],
  },
  {
    titleKey: "arch_skills_devops",
    skills: [
      { name: "Multi-Tenant Architecture", pct: 98 },
      { name: "RBAC & Enterprise Security", pct: 96 },
      { name: "Docker & Containerization", pct: 90 },
      { name: "CI/CD & Cloud Deployment (Vercel/VPS)", pct: 88 },
    ],
  },
];

export type IntegrationIcon =
  "CreditCard" | "Truck" | "MessageSquare" | "Bell" | "MapPin" | "FileText" | "Link2";

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
