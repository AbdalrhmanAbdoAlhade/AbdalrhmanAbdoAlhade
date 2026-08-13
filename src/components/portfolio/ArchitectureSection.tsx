import {
  Bell,
  Building2,
  CreditCard,
  FileText,
  Link2,
  MapPin,
  MessageSquare,
  Plug,
  ShieldCheck,
  Smartphone,
  Truck,
  Wallet,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useApp, type TKey } from "@/lib/app-context";
import {
  architecturePillars,
  integrationCategories,
  skillGroups,
  type IntegrationIcon,
  type PillarIcon,
} from "@/lib/architecture";

const pillarIconMap: Record<PillarIcon, typeof Building2> = {
  Building2,
  ShieldCheck,
  Smartphone,
  Wallet,
};

const integrationIconMap: Record<IntegrationIcon, typeof CreditCard> = {
  CreditCard,
  Truck,
  MessageSquare,
  Bell,
  MapPin,
  FileText,
  Link2,
};

export function ArchitectureSection() {
  const { t } = useApp();

  return (
    <section id="architecture" className="mx-auto max-w-6xl px-5 py-24">
      <div className="mb-12 text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-primary">
          {t("arch_kicker")}
        </p>
        <h2 className="mt-2 text-3xl font-extrabold sm:text-4xl">
          {t("arch_title")} <span className="text-gradient">{t("arch_title_hl")}</span>
        </h2>
        <p className="mx-auto mt-4 max-w-3xl leading-relaxed text-muted-foreground">
          {t("arch_desc")}
        </p>
        <p className="mt-3 text-sm font-semibold text-accent">
          BillPro SA · Lawyers SaaS · Souqna · UMQ
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        {architecturePillars.map((pillar) => {
          const Icon = pillarIconMap[pillar.icon];
          return (
            <article
              key={pillar.id}
              className="surface-card rounded-3xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/15 text-primary">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-lg font-bold">{t(pillar.titleKey)}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {t(pillar.descKey)}
              </p>

              {pillar.flow && (
                <pre
                  dir="ltr"
                  className="mt-4 overflow-x-auto rounded-2xl bg-secondary/60 p-4 text-start font-mono text-xs leading-6 text-muted-foreground"
                >
                  {pillar.flow}
                </pre>
              )}

              {pillar.roles && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {pillar.roles.map((role) => (
                    <span
                      key={role}
                      className="rounded-full border border-border px-3 py-1 text-xs font-semibold"
                    >
                      {t(role as TKey)}
                    </span>
                  ))}
                </div>
              )}

              {pillar.code && (
                <pre
                  dir="ltr"
                  className="mt-4 overflow-x-auto rounded-2xl bg-secondary/60 p-4 text-start font-mono text-xs leading-6 text-muted-foreground"
                >
                  {pillar.code}
                </pre>
              )}
            </article>
          );
        })}
      </div>

      <div className="mt-20">
        <h3 className="text-center text-2xl font-extrabold sm:text-3xl">
          {t("arch_arsenal_title")}{" "}
          <span className="text-gradient">{t("arch_arsenal_hl")}</span>
        </h3>
        <p className="mx-auto mt-3 max-w-2xl text-center text-sm text-muted-foreground">
          {t("arch_arsenal_desc")}
        </p>
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {skillGroups.map((group) => (
            <div key={group.titleKey} className="surface-card rounded-3xl p-6">
              <h4 className="font-bold">{t(group.titleKey)}</h4>
              <div className="mt-4 space-y-4">
                {group.skills.map((skill) => (
                  <div key={skill.name}>
                    <div className="mb-1.5 flex justify-between gap-3 text-sm">
                      <span>{skill.name}</span>
                      <span className="shrink-0 font-bold text-primary">{skill.pct}%</span>
                    </div>
                    <Progress value={skill.pct} className="h-2" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="surface-card mt-12 rounded-3xl p-8">
        <div className="flex items-center gap-2">
          <Plug className="h-5 w-5 text-primary" />
          <h4 className="text-lg font-bold">{t("arch_integrations")}</h4>
        </div>
        <p className="mt-2 text-sm text-muted-foreground">{t("arch_integrations_d")}</p>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {integrationCategories.map(({ icon, labelKey }) => {
            const Icon = integrationIconMap[icon];
            return (
              <div
                key={labelKey}
                className="flex items-center gap-3 rounded-2xl border border-border bg-secondary/30 px-4 py-3"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary">
                  <Icon className="h-4 w-4" />
                </span>
                <span className="text-sm font-semibold">{t(labelKey)}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
