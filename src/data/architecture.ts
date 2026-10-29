export type PillarIcon = "Building2" | "ShieldCheck" | "Smartphone" | "Wallet";

export interface ArchitecturePillar {
  id: string;
  icon: PillarIcon;
  titleAr: string;
  titleEn: string;
  tag: string;
  descAr: string;
  descEn: string;
  language: string;
  roles?: readonly string[];
  code: string;
}

export const ARCHITECTURE_PILLARS: ArchitecturePillar[] = [
  {
    id: "multi-tenancy",
    icon: "Building2",
    titleAr: "معمارية متعددة المستأجرين (Multi-Tenancy)",
    titleEn: "Multi-Tenant Cloud Architecture",
    tag: "Isolation & Routing",
    descAr:
      "تطبيق عزل تام لقواعد البيانات والملفات لكل شركة ومكتب عبر النطاقات الفرعية (Subdomains). بيئة مستقلة تماماً داخل نظام سحابي موحد، متوافق مع معايير هيئة الزكاة والضريبة والجمارك (ZATCA).",
    descEn:
      "Complete database and storage isolation per firm via dynamic subdomain routing. Entirely independent tenant scopes within a unified, ZATCA-compliant cloud infrastructure.",
    language: "php",
    code: `// Multi-Tenancy Middleware: Dynamic Connection & Isolation
public function handle(Request $request, Closure $next): Response 
{
    $subdomain = $request->route('subdomain') ?? $this->extractSubdomain($request);
    $tenant = Tenant::where('subdomain', $subdomain)->firstOrFail();

    // Purge old connection and bind dedicated tenant database
    DB::purge('tenant');
    config(['database.connections.tenant.database' => $tenant->database_name]);
    DB::reconnect('tenant');

    // Scope storage and tenancy context
    app()->instance('current_tenant', $tenant);
    return $next($request);
}`,
  },
  {
    id: "rbac",
    icon: "ShieldCheck",
    titleAr: "إدارة الصلاحيات الدقيقة (RBAC - 5 أدوار)",
    titleEn: "Granular RBAC Authorization (5 Roles)",
    tag: "Access Control & Security",
    descAr:
      "نظام أمان صارم يفصل الأدوار الخمسة مع التحقق من التوكن والصلاحيات عند كل طلب API بدقة وكفاءة عبر سياسات Laravel Policies وSanctum.",
    descEn:
      "Strict security model governing 5 core personas with token validation and granular policy authorization checked on every incoming API request.",
    roles: ["Admin (مدير)", "Staff (موظف)", "Client (عميل)", "Lawyer (محامي)", "Law Firm (مكتب)"],
    language: "php",
    code: `// Policy Gate: Granular Legal Case Authorization
public function manageCase(User $user, LegalCase $case): bool 
{
    if ($user->hasRole('admin')) return true;

    if ($user->hasRole('lawyer')) {
        return $case->assigned_lawyer_id === $user->id 
            && $case->status->allowsLawyerEdits();
    }

    if ($user->hasRole('law_firm')) {
        return $case->firm_id === $user->firm_id;
    }

    return false;
}`,
  },
  {
    id: "mobile-api",
    icon: "Smartphone",
    titleAr: "واجهات برمجية عالية الأداء (REST APIs)",
    titleEn: "High-Throughput Mobile & Web REST APIs",
    tag: "Performance & Integrations",
    descAr:
      "أنظمة خلفية جاهزة للإنتاج تخدم تطبيقات الجوال ولوحات التحكم مع دعم التتبع الجغرافي GPS، إشعارات Firebase الفورية، ومفاتيح عدم التكرار Idempotency.",
    descEn:
      "Production-ready backends serving mobile apps and reactive web dashboards with live GPS geolocation, Firebase FCM notifications, and idempotency guarantees.",
    language: "http",
    code: `POST /api/v1/orders/checkout HTTP/1.1
Host: api.zh-innovation.tech
Authorization: Bearer 89|sanctum_verified_token
X-Idempotency-Key: idem_948f2c81e9b2
Content-Type: application/json

{
  "cart_id": "cart_9921",
  "payment_method": "edfapay",
  "coordinates": { "lat": 24.7136, "lng": 46.6753 }
}

HTTP/1.1 200 OK
{
  "status": "processing",
  "order_id": 40219,
  "fcm_dispatched": true,
  "zatca_status": "reported"
}`,
  },
  {
    id: "payouts",
    icon: "Wallet",
    titleAr: "محرك القيود المحاسبية والتسويات (Ledger & Payouts)",
    titleEn: "Double-Entry Ledger & Automated Payouts",
    tag: "Fintech & ACID Accounting",
    descAr:
      "نظام محاسبي يعتمد على القيد المزدوج لضمان توازن الحسابات آلياً (Debit = Credit)، وحساب عمولات المنصة وتوليد أوامر التحويل المالي للمتاجر والمحامين بأمان تام.",
    descEn:
      "Double-entry bookkeeping engine ensuring automated mathematical balance (Debit = Credit), platform commission splits, and automated bank payout reconciliation.",
    language: "go",
    code: `// Go Microservice: Double-Entry Balanced Transaction
func ProcessMerchantPayout(ctx context.Context, merchantID string, amountCents int64) error {
    commissionCents := int64(float64(amountCents) * 0.05) // 5% fee
    netPayable := amountCents - commissionCents

    tx := ledger.NewTransaction()
    tx.Debit(fmt.Sprintf("MerchantWallet:%s", merchantID), amountCents)
    tx.Credit("PlatformCommissionAccount", commissionCents)
    tx.Credit("GatewayPayableAccount", netPayable)

    // Strictly verifies Debit == Credit before atomic commit
    return tx.CommitIfBalanced(ctx)
}`,
  },
];

export interface IntegrationBadge {
  nameAr: string;
  nameEn: string;
  categoryAr: string;
  categoryEn: string;
  icon: string;
}

export const INTEGRATIONS: IntegrationBadge[] = [
  {
    nameAr: "بوابات الدفع الإلكتروني (EdfaPay / Mada)",
    nameEn: "Payment Gateways (EdfaPay / Mada)",
    categoryAr: "مدفوعات",
    categoryEn: "Fintech",
    icon: "CreditCard",
  },
  {
    nameAr: "شركات الشحن والتوصيل (Aramex / SMSA / Naqel)",
    nameEn: "Couriers (Aramex / SMSA / Naqel)",
    categoryAr: "شحن ولوجستيات",
    categoryEn: "Logistics",
    icon: "Truck",
  },
  {
    nameAr: "الفوترة الإلكترونية (ZATCA المرحلة الثانية)",
    nameEn: "ZATCA Phase 2 E-Invoicing",
    categoryAr: "امتثال حكومي",
    categoryEn: "Compliance",
    icon: "FileText",
  },
  {
    nameAr: "الإشعارات الفورية (Firebase FCM)",
    nameEn: "Push Notifications (Firebase FCM)",
    categoryAr: "إشعارات",
    categoryEn: "Real-time",
    icon: "Bell",
  },
  {
    nameAr: "رسائل التوثيق (SMS Gateways / OTP)",
    nameEn: "SMS & OTP Verification",
    categoryAr: "أمان",
    categoryEn: "Security",
    icon: "MessageSquare",
  },
  {
    nameAr: "الخرائط والتتبع الحي (Google Maps / GPS)",
    nameEn: "Live Geolocation (Google Maps / GPS)",
    categoryAr: "خرائط",
    categoryEn: "Maps",
    icon: "MapPin",
  },
];
