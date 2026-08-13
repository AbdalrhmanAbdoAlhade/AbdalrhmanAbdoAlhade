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
    <section id="architecture" className="mx-auto max-w-6xl px-4 py-16 sm:px-5 sm:py-20 lg:py-24">
      <div className="mb-8 text-center sm:mb-10 lg:mb-12">
        <p className="text-xs font-semibold uppercase tracking-widest text-primary sm:text-sm">
          {t("arch_kicker")}
        </p>
        <h2 className="mt-2 text-2xl font-extrabold sm:text-3xl md:text-4xl">
          {t("arch_title")} <span className="text-gradient">{t("arch_title_hl")}</span>
        </h2>
        <p className="mx-auto mt-3 max-w-3xl text-xs leading-relaxed text-muted-foreground sm:mt-4 sm:text-sm md:text-base">
          {t("arch_desc")}
        </p>
        <p className="mt-2 text-xs font-semibold text-accent sm:mt-3 sm:text-sm">
          BillPro SA · Lawyers SaaS · Souqna · UMQ
        </p>
      </div>

      <div className="grid gap-4 sm:gap-5 sm:grid-cols-2">
        {architecturePillars.map((pillar) => {
          const Icon = pillarIconMap[pillar.icon];
          return (
            <article
              key={pillar.id}
              className="surface-card overflow-hidden rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 sm:rounded-3xl sm:p-6"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15 text-primary sm:h-11 sm:w-11 sm:rounded-2xl">
                <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
              </div>
              <h3 className="mt-3 text-base font-bold sm:mt-4 sm:text-lg">{t(pillar.titleKey)}</h3>
              <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground sm:mt-2 sm:text-sm">
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
                <div className="mt-3 flex flex-wrap gap-1.5 sm:mt-4 sm:gap-2">
                  {pillar.roles.map((role) => (
                    <span
                      key={role}
                      className="rounded-full border border-border px-2 py-0.5 text-xs font-semibold sm:px-3 sm:py-1"
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

      <div className="mt-12 sm:mt-16 lg:mt-20">
        <h3 className="text-center text-xl font-extrabold sm:text-2xl md:text-3xl">
          {t("arch_arsenal_title")}{" "}
          <span className="text-gradient">{t("arch_arsenal_hl")}</span>
        </h3>
        <p className="mx-auto mt-2 max-w-2xl text-center text-xs text-muted-foreground sm:mt-3 sm:text-sm md:text-base">
          {t("arch_arsenal_desc")}
        </p>
        <div className="mt-6 grid gap-4 sm:mt-8 sm:gap-5 lg:mt-10 lg:grid-cols-2">
          {skillGroups.map((group) => (
            <div key={group.titleKey} className="surface-card rounded-2xl p-5 sm:rounded-3xl sm:p-6">
              <h4 className="text-sm font-bold sm:text-base">{t(group.titleKey)}</h4>
              <div className="mt-3 space-y-3 sm:mt-4 sm:space-y-4">
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

      <div className="surface-card mt-8 rounded-2xl p-5 sm:mt-10 sm:rounded-3xl sm:p-6 lg:mt-12 lg:p-8">
        <div className="flex items-center gap-2">
          <Plug className="h-4 w-4 text-primary sm:h-5 sm:w-5" />
          <h4 className="text-sm font-bold sm:text-base lg:text-lg">{t("arch_integrations")}</h4>
        </div>
        <p className="mt-1.5 text-xs text-muted-foreground sm:mt-2 sm:text-sm">{t("arch_integrations_d")}</p>
        <div className="mt-4 grid gap-2 sm:mt-5 sm:gap-3 sm:grid-cols-2 lg:mt-6 lg:grid-cols-3">
          {integrationCategories.map(({ icon, labelKey }) => {
            const Icon = integrationIconMap[icon];
            return (
              <div
                key={labelKey}
                className="flex items-center gap-2 rounded-lg border border-border bg-secondary/30 px-3 py-2.5 sm:gap-3 sm:rounded-2xl sm:px-4 sm:py-3"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/15 text-primary sm:h-9 sm:w-9 sm:rounded-xl">
                  <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                </span>
                <span className="text-xs font-semibold sm:text-sm">{t(labelKey)}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
