import { createFileRoute } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { createContext, useContext, useEffect, useState } from "react";
import {
  ArrowLeft,
  BadgeCheck,
  Braces,
  Database,
  ExternalLink,
  Github,
  Globe,
  Layers,
  Menu,
  MessageCircle,
  ScrollText,
  Server,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Terminal,
  X,
  Zap,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { fetchProjects, type ProjectDTO } from "@/lib/projects.functions";
import { content, type Content, type Lang } from "@/lib/i18n";

const projectsQueryOptions = () =>
  queryOptions({
    queryKey: ["projects"],
    queryFn: () => fetchProjects(),
    staleTime: 5 * 60_000,
  });

const INITIAL_PROJECTS = 6;

export const Route = createFileRoute("/")({
  loader: ({ context }) => {
    void context.queryClient.ensureQueryData(projectsQueryOptions());
  },
  component: Index,
  errorComponent: ({ error }) => (
    <div className="flex min-h-screen items-center justify-center px-4 text-center">
      <div className="max-w-md">
        <h1 className="text-2xl font-bold">حدث خطأ غير متوقع</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {error instanceof Error ? error.message : "حاول تحديث الصفحة والمحاولة مرة أخرى."}
        </p>
      </div>
    </div>
  ),
  notFoundComponent: () => (
    <div className="flex min-h-screen items-center justify-center px-4 text-center">
      <p className="text-muted-foreground">الصفحة غير موجودة.</p>
    </div>
  ),
  head: () => ({
    meta: [
      {
        title: "عبدالرحمن عبده — مطوّر Full-Stack | بورتفوليو",
      },
      {
        name: "description",
        content:
          "بورتفوليو عبدالرحمن عبده، مطوّر Full-Stack متخصص في Laravel وGo وقواعد البيانات وأنظمة SaaS متعددة المستأجرين — مشاريع حية في التجارة الإلكترونية والتوصيل والفوترة الإلكترونية.",
      },
      {
        property: "og:title",
        content: "عبدالرحمن عبده — مطوّر Full-Stack",
      },
      {
        property: "og:description",
        content:
          "مطوّر Full-Stack: Laravel، Go، PostgreSQL، وأنظمة خلفية قابلة للتوسع — استعرض المشاريع الحية.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

const GITHUB_URL = "https://github.com/AbdalrhmanAbdoAlhade";
const WHATSAPP_URL = "https://wa.me/201023402756";

const ECOSYSTEM = [
  "billpro-sa.com",
  "souqna-sa.com",
  "alimny.zh-innovation.tech",
  "asas-al-jawhara.rouqy-jewellery.com",
  "quickcart.rouqy-jewellery.com",
  "playprodammam.com",
  "gefco.sa",
  "alahrm.com",
  "edustationsegy.com",
  "ast-oman.com",
];

type LanguageState = { lang: Lang; setLang: (l: Lang) => void };

const LanguageContext = createContext<LanguageState>({ lang: "ar", setLang: () => {} });

function useLanguage(): LanguageState {
  return useContext(LanguageContext);
}

function LangToggle({ size = "sm" }: { size?: "sm" | "default" }) {
  const { lang, setLang } = useLanguage();
  return (
    <Button
      variant="outline"
      size={size}
      onClick={() => setLang(lang === "ar" ? "en" : "ar")}
      aria-label={lang === "ar" ? "Switch to English" : "التبديل إلى العربية"}
    >
      <Globe className="size-4" />
      {lang === "ar" ? "EN" : "عربي"}
    </Button>
  );
}

function SectionHeading({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <span className="font-mono text-sm text-primary" dir="ltr">
        {"<"}{eyebrow} {"/>"}
      </span>
      <h2 className="mt-3 text-2xl font-extrabold tracking-tight sm:text-4xl">{title}</h2>
    </div>
  );
}

function Nav() {
  const { lang } = useLanguage();
  const t = content[lang];
  const [open, setOpen] = useState(false);

  const links = t.nav.links;

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-lg">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <a href="#top" className="font-mono text-lg font-bold" dir="ltr">
          abdalrhman<span className="text-primary">.dev</span>
        </a>
        <div className="hidden items-center gap-7 text-sm font-semibold text-muted-foreground md:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="transition-colors hover:text-foreground">
              {l.label}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <LangToggle />
          <Button asChild variant="hero" size="sm" className="hidden sm:inline-flex">
            <a href={WHATSAPP_URL} target="_blank" rel="noreferrer">
              <MessageCircle className="size-4" />
              {t.nav.cta}
            </a>
          </Button>
          <Button asChild variant="outline" size="icon" className="size-9" aria-label="GitHub">
            <a href={GITHUB_URL} target="_blank" rel="noreferrer">
              <Github className="size-4" />
            </a>
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="size-9 md:hidden"
            aria-label={open ? t.nav.menuClose : t.nav.menuOpen}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </Button>
        </div>
      </nav>
      {open && (
        <div className="border-t border-border bg-background/95 px-4 py-4 md:hidden">
          <div className="flex flex-col gap-1">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-semibold text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                {l.label}
              </a>
            ))}
            <Button asChild variant="hero" size="sm" className="mt-2">
              <a href={WHATSAPP_URL} target="_blank" rel="noreferrer">
                <MessageCircle className="size-4" />
                {t.nav.cta}
              </a>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}

function Hero() {
  const { lang } = useLanguage();
  const t = content[lang];
  return (
    <section id="top" className="ambient-glow relative overflow-hidden pt-28 pb-14 sm:pt-36 sm:pb-20">
      <div className="grid-lines pointer-events-none absolute inset-0" aria-hidden />
      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="animate-fade-up">
          <Badge variant="glow" className="gap-2 px-4 py-1.5 text-sm">
            <Sparkles className="size-3.5" />
            {t.hero.badge}
          </Badge>
          <h1 className="mt-6 text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            {t.hero.name}
            <span className="mt-2 block text-gradient" dir="ltr">
              {t.hero.role}
            </span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            {t.hero.desc}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button asChild variant="hero" size="lg">
              <a href="#projects">
                {t.hero.ctaProjects}
                <ArrowLeft className="size-4 rtl:rotate-0 ltr:rotate-180" />
              </a>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href={GITHUB_URL} target="_blank" rel="noreferrer">
                <Github className="size-4" />
                {t.hero.ctaGithub}
              </a>
            </Button>
          </div>
          <dl className="mt-10 grid max-w-md grid-cols-3 gap-4 border-t border-border pt-8 sm:mt-12">
            {t.hero.stats.map((s) => (
              <div key={s.label}>
                <dt className="text-xs text-muted-foreground">{s.label}</dt>
                <dd className="mt-1 font-mono text-2xl font-bold text-primary" dir="ltr">
                  {s.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="animate-fade-up [animation-delay:150ms]">
          <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-2xl">
            <div className="flex items-center gap-2 border-b border-border bg-secondary px-4 py-3">
              <span className="size-3 rounded-full bg-destructive/80" />
              <span className="size-3 rounded-full bg-accent/80" />
              <span className="size-3 rounded-full bg-primary/80" />
              <span className="ms-2 font-mono text-xs text-muted-foreground" dir="ltr">
                {t.hero.terminal}
              </span>
            </div>
            <pre
              dir="ltr"
              className="min-h-56 overflow-x-auto p-4 font-mono text-[12px] leading-7 text-muted-foreground sm:min-h-64 sm:p-5 sm:text-[13px]"
            >
              <code>
                <span className="text-primary">$</span> php artisan serve{"\n"}
                <span className="text-primary">$</span> go run main.go{"\n"}
                <span className="text-primary">$</span> docker compose up -d{"\n"}
                <span className="text-accent">✔</span> migrations done — 87 ms{"\n"}
                <span className="text-accent">✔</span> API ready — 200 OK{"\n"}
                <span className="text-primary">$</span> npm run deploy --prod{"\n"}
                <span className="text-foreground">
                  Building the future, one system at a time
                  <span className="animate-blink text-primary">▊</span>
                </span>
              </code>
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
}

function About() {
  const { lang } = useLanguage();
  const t = content[lang];
  return (
    <section id="about" className="scroll-mt-20 py-14 sm:py-20">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeading eyebrow={t.about.eyebrow} title={t.about.title} />
        <div className="mx-auto mt-8 max-w-3xl rounded-2xl border border-border bg-card p-6 text-center card-hover sm:mt-10 sm:p-8">
          <p className="text-base leading-loose text-muted-foreground sm:text-lg">
            {t.about.body}
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {["Laravel", "Go", "PostgreSQL", "Redis", "Docker", "REST APIs", "SaaS"].map((k) => (
              <Badge key={k} variant="outline" className="font-mono" dir="ltr">
                {k}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Skills() {
  const { lang } = useLanguage();
  const t = content[lang];
  const icons = [Braces, Server, Database, ShieldCheck];
  return (
    <section id="skills" className="scroll-mt-20 bg-secondary/40 py-14 sm:py-20">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeading eyebrow={t.skills.eyebrow} title={t.skills.title} />
        <div className="mt-10 grid gap-6 sm:mt-12 md:grid-cols-2">
          {t.skills.groups.map((group, gi) => {
            const Icon = icons[gi % icons.length];
            return (
              <div
                key={group.title}
                className="rounded-2xl border border-border bg-card p-5 card-hover sm:p-6"
              >
                <div className="flex items-center gap-3">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="size-5" />
                  </span>
                  <h3 className="text-lg font-bold">{group.title}</h3>
                </div>
                <ul className="mt-6 space-y-4">
                  {group.items.map(([name, pct]) => (
                    <li key={name}>
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-semibold" dir="auto">
                          {name}
                        </span>
                        <span className="font-mono text-muted-foreground" dir="ltr">
                          {pct}%
                        </span>
                      </div>
                      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-secondary">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-primary to-glow"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
        <div className="mt-8 rounded-2xl border border-border bg-card p-5 sm:p-6">
          <h3 className="text-center text-sm font-bold text-muted-foreground">
            {t.skills.integrationsTitle}
          </h3>
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {t.skills.integrations.map((i) => (
              <Badge key={i} variant="secondary" className="px-3 py-1.5 text-sm">
                {i}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Architecture() {
  const { lang } = useLanguage();
  const t = content[lang];
  const icons = [Layers, ShieldCheck, Zap, ScrollText];
  return (
    <section className="py-14 sm:py-20">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeading eyebrow={t.arch.eyebrow} title={t.arch.title} />
        <p className="mx-auto mt-4 max-w-2xl text-center text-muted-foreground">
          {t.arch.subtitle}
        </p>
        <div className="mt-10 grid gap-6 sm:mt-12 md:grid-cols-2">
          {t.arch.cards.map((card, ci) => {
            const Icon = icons[ci % icons.length];
            return (
              <div
                key={card.title}
                className="rounded-2xl border border-border bg-card p-5 card-hover sm:p-6"
              >
                <div className="flex items-center gap-3">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="size-5" />
                  </span>
                  <h3 className="text-lg font-bold">{card.title}</h3>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{card.body}</p>
                <pre
                  dir="ltr"
                  className="mt-4 overflow-x-auto rounded-xl border border-border bg-secondary/60 p-4 font-mono text-xs leading-6 text-primary"
                >
                  <code>{card.code}</code>
                </pre>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, t }: { project: ProjectDTO; t: Content }) {
  const typeLabel = project.projectType === "web" ? t.projects.typeWeb : t.projects.typeMobile;
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card card-hover">
      {project.image ? (
        <div className="relative aspect-video overflow-hidden bg-secondary">
          <img
            src={project.image}
            alt={project.title}
            loading="lazy"
            className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      ) : (
        <div className="flex aspect-video items-center justify-center bg-gradient-to-br from-secondary to-card text-6xl">
          <Server className="size-14 text-primary/40" />
        </div>
      )}
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Badge variant="glow" className="gap-1">
            {project.projectType === "web" ? (
              <Globe className="size-3" />
            ) : (
              <Smartphone className="size-3" />
            )}
            {typeLabel}
          </Badge>
          {project.year && (
            <span className="font-mono" dir="ltr">
              {project.year}
            </span>
          )}
          {project.duration && <span>· {project.duration}</span>}
        </div>
        <h3 className="mt-3 line-clamp-2 text-base font-bold leading-relaxed" dir="auto">
          {project.title}
        </h3>
        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground" dir="auto">
          {project.description}
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-2 pt-2">
          {project.liveLink && (
            <Button asChild variant="hero" size="sm">
              <a href={project.liveLink} target="_blank" rel="noreferrer">
                <ExternalLink className="size-3.5" />
                {t.projects.visit}
              </a>
            </Button>
          )}
          {project.githubLink && (
            <Button asChild variant="outline" size="sm">
              <a href={project.githubLink} target="_blank" rel="noreferrer">
                <Github className="size-3.5" />
                GitHub
              </a>
            </Button>
          )}
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="ghost" size="sm" className="ms-auto text-muted-foreground">
                {t.projects.details}
              </Button>
            </DialogTrigger>
            <DialogContent className="max-h-[85vh] max-w-lg overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-start leading-relaxed" dir="auto">
                  {project.title}
                </DialogTitle>
                <DialogDescription className="flex items-center gap-2 text-start">
                  <BadgeCheck className="size-4 shrink-0 text-primary" />
                  {typeLabel}
                  {project.duration && <span>· {project.duration}</span>}
                </DialogDescription>
              </DialogHeader>
              <p
                className="whitespace-pre-line text-sm leading-loose text-muted-foreground"
                dir="auto"
              >
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.liveLink && (
                  <Button asChild variant="hero" size="sm">
                    <a href={project.liveLink} target="_blank" rel="noreferrer">
                      <ExternalLink className="size-3.5" />
                      {t.projects.visitProject}
                    </a>
                  </Button>
                )}
                {project.githubLink && (
                  <Button asChild variant="outline" size="sm">
                    <a href={project.githubLink} target="_blank" rel="noreferrer">
                      <Github className="size-3.5" />
                      GitHub
                    </a>
                  </Button>
                )}
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </article>
  );
}

function Projects() {
  const { lang } = useLanguage();
  const t = content[lang];
  const { data: projects } = useSuspenseQuery(projectsQueryOptions());
  const [filter, setFilter] = useState<"all" | "web" | "mobile">("all");
  const [visibleCount, setVisibleCount] = useState(INITIAL_PROJECTS);

  const filtered = projects.filter((p) => filter === "all" || p.projectType === filter);
  const visible = filtered.slice(0, visibleCount);
  const remaining = filtered.length - visible.length;

  return (
    <section id="projects" className="scroll-mt-20 bg-secondary/40 py-14 sm:py-20">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeading eyebrow={t.projects.eyebrow} title={t.projects.title} />
        <p className="mx-auto mt-4 max-w-2xl text-center text-muted-foreground">
          {t.projects.subtitle}
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {t.projects.filters.map((f) => (
            <Button
              key={f.key}
              variant={filter === f.key ? "hero" : "outline"}
              size="sm"
              onClick={() => {
                setFilter(f.key);
                setVisibleCount(INITIAL_PROJECTS);
              }}
            >
              {f.label}
            </Button>
          ))}
        </div>
        {visible.length === 0 ? (
          <p className="mt-12 text-center text-muted-foreground">{t.projects.empty}</p>
        ) : (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((p) => (
              <ProjectCard key={p.id} project={p} t={t} />
            ))}
          </div>
        )}
        {remaining > 0 && (
          <div className="mt-10 flex justify-center">
            <Button variant="outline" size="lg" onClick={() => setVisibleCount((c) => c + 6)}>
              {t.projects.more}
              <span className="font-mono text-xs text-muted-foreground" dir="ltr">
                +{remaining}
              </span>
              <ArrowLeft className="size-4 ltr:rotate-180 rtl:rotate-0" />
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}

function Ecosystem() {
  const { lang } = useLanguage();
  const t = content[lang];
  return (
    <section className="overflow-hidden py-12 sm:py-16">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-8 flex items-center justify-center gap-3">
          <span className="h-px flex-1 bg-border" />
          <span className="font-mono text-sm text-primary" dir="ltr">
            {t.ecosystem.label}
          </span>
          <span className="h-px flex-1 bg-border" />
        </div>
      </div>
      <div
        dir="ltr"
        className="relative flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]"
      >
        <div className="marquee-track flex w-max shrink-0">
          {[0, 1].map((half) => (
            <div key={half} className="flex items-center gap-3 pe-3" aria-hidden={half === 1}>
              {ECOSYSTEM.map((domain) => (
                <span
                  key={`${half}-${domain}`}
                  className="rounded-full border border-border bg-card px-4 py-2 font-mono text-xs text-muted-foreground sm:px-5 sm:py-2 sm:text-sm"
                >
                  {domain}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const { lang } = useLanguage();
  const t = content[lang];
  return (
    <section id="contact" className="scroll-mt-20 pb-16 pt-8 sm:pb-24">
      <div className="mx-auto max-w-4xl px-4">
        <div className="ambient-glow rounded-3xl border border-border bg-card p-6 text-center card-hover sm:p-10">
          <span className="font-mono text-sm text-primary" dir="ltr">
            {"<"}{t.contact.eyebrow} {"/>"}
          </span>
          <h2 className="mt-4 text-2xl font-extrabold sm:text-3xl">{t.contact.title}</h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">{t.contact.body}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild variant="hero" size="lg">
              <a href={WHATSAPP_URL} target="_blank" rel="noreferrer">
                <MessageCircle className="size-4" />
                {t.contact.whatsapp}
              </a>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href={GITHUB_URL} target="_blank" rel="noreferrer">
                <Github className="size-4" />
                {t.contact.github}
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const { lang } = useLanguage();
  const t = content[lang];
  return (
    <footer className="border-t border-border py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-4 text-center text-sm text-muted-foreground sm:flex-row sm:justify-between sm:text-start">
        <span>{t.footer.rights}</span>
        <span className="font-mono" dir="ltr">
          built with TanStack Start
        </span>
      </div>
    </footer>
  );
}

function Index() {
  const [lang, setLangState] = useState<Lang>("ar");

  useEffect(() => {
    const saved = window.localStorage.getItem("lang");
    if (saved === "en" || saved === "ar") setLangState(saved);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = content[lang].dir;
    window.localStorage.setItem("lang", lang);
  }, [lang]);

  const value: LanguageState = { lang, setLang: setLangState };

  return (
    <LanguageContext.Provider value={value}>
      <div className="min-h-screen">
        <Nav />
        <main>
          <Hero />
          <About />
          <Skills />
          <Architecture />
          <Projects />
          <Ecosystem />
          <Contact />
        </main>
        <Footer />
      </div>
    </LanguageContext.Provider>
  );
}
