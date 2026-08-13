import { createFileRoute } from "@tanstack/react-router";
import {
  Code2,
  Database,
  Github,
  Globe,
  Mail,
  Moon,
  Rocket,
  Server,
  Shield,
  Sparkles,
  Sun,
  Terminal,
} from "lucide-react";
import { ProjectsSection } from "@/components/portfolio/ProjectsSection";
import { SitesSection } from "@/components/portfolio/SitesSection";
import { ArchitectureSection } from "@/components/portfolio/ArchitectureSection";
import {
  WhatsAppFloatingButton,
  WhatsAppLinkButton,
} from "@/components/portfolio/WhatsAppButton";
import { AppProvider, useApp, type TKey } from "@/lib/app-context";

const GITHUB = "https://github.com/AbdalrhmanAbdoAlhade";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "عبدالرحمن عبده | مطور Back-End (Laravel & Go)" },
      {
        name: "description",
        content:
          "بورتفوليو عبدالرحمن عبده – مطور Back-End متخصص في PHP Laravel و Go، بناء APIs آمنة وقابلة للتوسع وأنظمة SaaS متعددة المستأجرين.",
      },
      {
        property: "og:title",
        content: "عبدالرحمن عبده | مطور Back-End (Laravel & Go)",
      },
      {
        property: "og:description",
        content:
          "منصات ويب وتطبيقات موبايل بأنظمة خلفية قوية: Laravel، Go، قواعد بيانات وتكاملات خارجية.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const skills: { icon: typeof Code2; title: TKey; desc: TKey }[] = [
  { icon: Code2, title: "skill_php", desc: "skill_php_d" },
  { icon: Terminal, title: "skill_go", desc: "skill_go_d" },
  { icon: Database, title: "skill_db", desc: "skill_db_d" },
  { icon: Shield, title: "skill_sec", desc: "skill_sec_d" },
  { icon: Server, title: "skill_ops", desc: "skill_ops_d" },
  { icon: Rocket, title: "skill_int", desc: "skill_int_d" },
];

function Portfolio() {
  const { t, dir, lang, theme, toggleLang, toggleTheme } = useApp();

  const stats: { value: string; label: TKey }[] = [
    { value: "+75", label: "stat_projects" },
    { value: "+6", label: "stat_years" },
    { value: "100%", label: "stat_commit" },
  ];

  const navLinks: { href: string; label: TKey }[] = [
    { href: "#about", label: "nav_about" },
    { href: "#skills", label: "nav_skills" },
    { href: "#architecture", label: "nav_architecture" },
    { href: "#projects", label: "nav_projects" },
    { href: "#sites", label: "nav_sites" },
    { href: "#contact", label: "nav_contact" },
  ];

  return (
    <div dir={dir} className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-50 border-b border-border/60 bg-background/70 backdrop-blur-xl">
        <nav className="mx-auto flex max-w-6xl items-center justify-between gap-2 px-3 py-3 sm:gap-3 sm:px-5 sm:py-4">
          <a href="#top" className="text-base font-extrabold tracking-tight sm:text-lg">
            <span className="text-gradient">Abdalrhman</span>.dev
          </a>
          <div className="hidden items-center gap-4 text-xs font-medium text-muted-foreground sm:gap-6 sm:text-sm lg:flex">
            {navLinks.map((l) => (
              <a key={l.href} href={l.href} className="transition-colors hover:text-foreground">
                {t(l.label)}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={toggleTheme}
              aria-label={t("toggle_theme")}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-border transition-colors hover:bg-secondary sm:h-10 sm:w-10"
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <button
              onClick={toggleLang}
              className="inline-flex h-9 items-center gap-1 rounded-full border border-border px-2.5 py-1.5 text-xs font-bold transition-colors hover:bg-secondary sm:gap-1.5 sm:px-3 sm:py-2 sm:text-sm"
            >
              <Globe className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">{lang === "ar" ? "EN" : "ع"}</span>
              <span className="sm:hidden">{lang === "ar" ? "E" : "ع"}</span>
            </button>
            <a
              href={GITHUB}
              target="_blank"
              rel="noreferrer"
              className="hidden items-center gap-2 rounded-full border border-border px-3 py-1.5 text-xs font-semibold transition-colors hover:bg-secondary sm:gap-2 sm:px-4 sm:py-2 sm:text-sm md:inline-flex"
            >
              <Github className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">GitHub</span>
            </a>
          </div>
        </nav>
      </header>

      <main id="top">
        <section
          className="relative overflow-hidden"
          style={{ backgroundImage: "var(--gradient-hero)" }}
        >
          <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-16 sm:gap-10 sm:px-5 sm:py-20 md:gap-12 md:grid-cols-[1.2fr_.8fr] md:py-32 lg:gap-14">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary sm:px-4 sm:py-1.5">
                <Sparkles className="h-3 w-3 sm:h-3.5 sm:w-3.5" /> {t("hero_badge")}
              </span>
              <h1 className="mt-4 text-3xl font-extrabold leading-[1.15] sm:mt-6 sm:text-4xl md:text-5xl lg:text-6xl">
                {t("hero_name")}
                <span className="mt-2 block text-gradient sm:mt-3">{t("hero_role")}</span>
              </h1>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground sm:mt-6 sm:text-lg">
                {t("hero_desc")}
              </p>
              <div className="mt-6 flex flex-wrap gap-2 sm:mt-8 sm:gap-3">
                <a
                  href="#projects"
                  className="glow inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground transition-transform hover:-translate-y-0.5 sm:px-6 sm:py-3 sm:text-base"
                >
                  {t("hero_cta1")}
                </a>
                <a
                  href={GITHUB}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-bold transition-colors hover:bg-secondary sm:px-6 sm:py-3 sm:text-base"
                >
                  <Github className="h-4 w-4 sm:h-5 sm:w-5" /> {t("hero_cta2")}
                </a>
              </div>

              <div className="mt-8 grid max-w-md grid-cols-3 gap-2 sm:mt-12 sm:gap-4">
                {stats.map((s) => (
                  <div key={s.label} className="surface-card rounded-lg p-3 text-center sm:rounded-2xl sm:p-4">
                    <div className="text-xl font-extrabold text-primary sm:text-2xl">{s.value}</div>
                    <div className="mt-0.5 text-xs text-muted-foreground sm:mt-1">{t(s.label)}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-xs sm:max-w-sm">
              <div className="animate-float surface-card rounded-2xl p-4 sm:rounded-3xl sm:p-6">
                <img
                  src="https://avatars.githubusercontent.com/u/161177575?v=4"
                  alt={t("hero_name")}
                  className="mx-auto h-32 w-32 rounded-xl object-cover ring-2 ring-primary/40 sm:h-40 sm:w-40 sm:rounded-2xl"
                />
                <div
                  className="mt-3 rounded-xl bg-secondary/60 p-3 text-start font-mono text-[0.65rem] leading-5 text-muted-foreground sm:mt-5 sm:rounded-2xl sm:p-4 sm:text-xs sm:leading-6"
                  dir="ltr"
                >
                  <div>
                    <span className="text-primary">$</span> php artisan serve
                  </div>
                  <div>
                    <span className="text-primary">$</span> go run main.go
                  </div>
                  <div>
                    <span className="text-accent">✔</span> API ready — 200 OK
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="mx-auto max-w-6xl px-4 py-16 sm:px-5 sm:py-20 lg:py-24">
          <div className="surface-card rounded-2xl p-6 sm:rounded-3xl sm:p-8 md:p-12">
            <h2 className="text-2xl font-extrabold sm:text-3xl md:text-4xl">
              {t("about_title")} <span className="text-gradient">{t("about_title_hl")}</span>
            </h2>
            <p className="mt-3 max-w-3xl text-base leading-relaxed text-muted-foreground sm:mt-4 sm:text-lg">
              {t("about_desc")}
            </p>
          </div>
        </section>

        <section id="skills" className="mx-auto max-w-6xl px-4 py-16 sm:px-5 sm:py-20 lg:py-24">
          <h2 className="text-center text-2xl font-extrabold sm:text-3xl md:text-4xl">
            {t("skills_title")} <span className="text-gradient">{t("skills_title_hl")}</span>
          </h2>
          <div className="mt-8 grid gap-4 sm:mt-10 sm:gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {skills.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="surface-card rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 sm:rounded-3xl sm:p-6"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15 text-primary sm:h-11 sm:w-11 sm:rounded-2xl">
                  <Icon className="h-4.5 w-4.5 sm:h-5 sm:w-5" />
                </div>
                <h3 className="mt-3 text-base font-bold sm:mt-4 sm:text-lg">{t(title)}</h3>
                <p className="mt-1.5 text-xs text-muted-foreground sm:mt-2 sm:text-sm">{t(desc)}</p>
              </div>
            ))}
          </div>
        </section>

        <ArchitectureSection />
        <ProjectsSection />
        <SitesSection />

        <section id="contact" className="mx-auto max-w-6xl px-4 py-16 sm:px-5 sm:py-20 lg:py-24">
          <div
            className="surface-card rounded-2xl p-6 text-center sm:rounded-3xl sm:p-8 md:p-10 lg:p-12"
            style={{ backgroundImage: "var(--gradient-hero)" }}
          >
            <h2 className="text-2xl font-extrabold sm:text-3xl md:text-4xl">
              {t("contact_title")} <span className="text-gradient">{t("contact_title_hl")}</span>
            </h2>
            <p className="mx-auto mt-2 max-w-lg text-sm text-muted-foreground sm:mt-3 sm:text-base">{t("contact_desc")}</p>
            <div className="mt-5 flex flex-col gap-3 sm:mt-7 sm:flex-row sm:flex-wrap sm:justify-center">
              <WhatsAppLinkButton className="flex min-h-[44px] w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-5 py-2.5 font-bold text-white transition-opacity hover:opacity-90 sm:w-auto sm:px-6 sm:py-3" />
              <a
                href={GITHUB}
                target="_blank"
                rel="noreferrer"
                className="glow flex min-h-[44px] w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-2.5 font-bold text-primary-foreground sm:w-auto sm:px-6 sm:py-3"
              >
                <Github className="h-4 w-4 sm:h-5 sm:w-5" /> {t("contact_github")}
              </a>
              <a
                href="mailto:contact@zh-innovation.tech"
                className="flex min-h-[44px] w-full items-center justify-center gap-2 rounded-full border border-border px-5 py-2.5 font-bold transition-colors hover:bg-secondary sm:w-auto sm:px-6 sm:py-3"
              >
                <Mail className="h-4 w-4 sm:h-5 sm:w-5" /> {t("contact_mail")}
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border/60 px-4 py-6 text-center text-xs text-muted-foreground sm:py-8 sm:text-sm">
        © {new Date().getFullYear()} {t("hero_name")} — {t("rights")}
      </footer>

      <WhatsAppFloatingButton />
    </div>
  );
}

function Index() {
  return (
    <AppProvider>
      <Portfolio />
    </AppProvider>
  );
}
