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
    { value: "+13", label: "stat_projects" },
    { value: "+4", label: "stat_years" },
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
        <nav className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-5 py-4">
          <a href="#top" className="text-lg font-extrabold tracking-tight">
            <span className="text-gradient">Abdalrhman</span>.dev
          </a>
          <div className="hidden items-center gap-6 text-sm font-medium text-muted-foreground lg:flex">
            {navLinks.map((l) => (
              <a key={l.href} href={l.href} className="transition-colors hover:text-foreground">
                {t(l.label)}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              aria-label={t("toggle_theme")}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border transition-colors hover:bg-secondary"
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <button
              onClick={toggleLang}
              className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-2 text-sm font-bold transition-colors hover:bg-secondary"
            >
              <Globe className="h-4 w-4" />
              {lang === "ar" ? "EN" : "ع"}
            </button>
            <a
              href={GITHUB}
              target="_blank"
              rel="noreferrer"
              className="hidden items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-semibold transition-colors hover:bg-secondary sm:inline-flex"
            >
              <Github className="h-4 w-4" /> GitHub
            </a>
          </div>
        </nav>
      </header>

      <main id="top">
        <section
          className="relative overflow-hidden"
          style={{ backgroundImage: "var(--gradient-hero)" }}
        >
          <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-24 md:grid-cols-[1.2fr_.8fr] md:py-32">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary">
                <Sparkles className="h-3.5 w-3.5" /> {t("hero_badge")}
              </span>
              <h1 className="mt-6 text-4xl font-extrabold leading-[1.15] sm:text-5xl md:text-6xl">
                {t("hero_name")}
                <span className="mt-3 block text-gradient">{t("hero_role")}</span>
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
                {t("hero_desc")}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#projects"
                  className="glow inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-bold text-primary-foreground transition-transform hover:-translate-y-0.5"
                >
                  {t("hero_cta1")}
                </a>
                <a
                  href={GITHUB}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 font-bold transition-colors hover:bg-secondary"
                >
                  <Github className="h-5 w-5" /> {t("hero_cta2")}
                </a>
              </div>

              <div className="mt-12 grid max-w-md grid-cols-3 gap-4">
                {stats.map((s) => (
                  <div key={s.label} className="surface-card rounded-2xl p-4 text-center">
                    <div className="text-2xl font-extrabold text-primary">{s.value}</div>
                    <div className="mt-1 text-xs text-muted-foreground">{t(s.label)}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-sm">
              <div className="animate-float surface-card rounded-3xl p-6">
                <img
                  src="https://avatars.githubusercontent.com/u/161177575?v=4"
                  alt={t("hero_name")}
                  className="mx-auto h-40 w-40 rounded-2xl object-cover ring-2 ring-primary/40"
                />
                <div
                  className="mt-5 rounded-2xl bg-secondary/60 p-4 text-start font-mono text-xs leading-6 text-muted-foreground"
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

        <section id="about" className="mx-auto max-w-6xl px-5 py-20">
          <div className="surface-card rounded-3xl p-8 md:p-12">
            <h2 className="text-3xl font-extrabold">
              {t("about_title")} <span className="text-gradient">{t("about_title_hl")}</span>
            </h2>
            <p className="mt-4 max-w-3xl text-lg leading-relaxed text-muted-foreground">
              {t("about_desc")}
            </p>
          </div>
        </section>

        <section id="skills" className="mx-auto max-w-6xl px-5 pb-4">
          <h2 className="text-center text-3xl font-extrabold sm:text-4xl">
            {t("skills_title")} <span className="text-gradient">{t("skills_title_hl")}</span>
          </h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {skills.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="surface-card rounded-3xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/15 text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-lg font-bold">{t(title)}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{t(desc)}</p>
              </div>
            ))}
          </div>
        </section>

        <ArchitectureSection />
        <ProjectsSection />
        <SitesSection />

        <section id="contact" className="mx-auto max-w-6xl px-5 pb-24">
          <div
            className="surface-card rounded-3xl p-10 text-center"
            style={{ backgroundImage: "var(--gradient-hero)" }}
          >
            <h2 className="text-3xl font-extrabold sm:text-4xl">
              {t("contact_title")} <span className="text-gradient">{t("contact_title_hl")}</span>
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-muted-foreground">{t("contact_desc")}</p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <WhatsAppLinkButton />
              <a
                href={GITHUB}
                target="_blank"
                rel="noreferrer"
                className="glow inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-bold text-primary-foreground"
              >
                <Github className="h-5 w-5" /> {t("contact_github")}
              </a>
              <a
                href="mailto:contact@zh-innovation.tech"
                className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 font-bold transition-colors hover:bg-secondary"
              >
                <Mail className="h-5 w-5" /> {t("contact_mail")}
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border/60 py-8 text-center text-sm text-muted-foreground">
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
