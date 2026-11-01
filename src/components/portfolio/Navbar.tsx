import { useEffect, useState } from "react";
import { Github, Globe, Menu, MessageSquareCode, Moon, Sun, X } from "lucide-react";
import { useApp, type TKey } from "@/lib/app-context";
import { SITE_CONFIG } from "@/config/site-config";
import { PROFILE } from "@/data/profile";

const navItems: { href: string; label: TKey }[] = [
  { href: "#about", label: "nav_about" },
  { href: "#skills", label: "nav_skills" },
  { href: "#projects", label: "nav_projects" },
  { href: "#workflow", label: "nav_workflow" },
  { href: "#architecture", label: "nav_architecture" },
  { href: "#sites", label: "nav_sites" },
  { href: "#contact", label: "nav_contact" },
];

export function Navbar() {
  const { t, lang, theme, toggleLang, toggleTheme } = useApp();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("about");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const currentProgress = (window.scrollY / totalScroll) * 100;
        setScrollProgress(Math.min(100, Math.max(0, currentProgress)));
      }

      const sections = navItems.map((item) => item.href.slice(1));
      let current = "";
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 140 && rect.bottom >= 140) {
            current = sectionId;
            break;
          }
        }
      }
      if (current) setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [mobileMenuOpen]);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-xl">
      {/* Reading Progress Bar */}
      <div
        className="absolute top-0 start-0 h-[2px] bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400 transition-transform duration-150"
        style={{ width: `${scrollProgress}%` }}
        role="progressbar"
        aria-valuenow={Math.round(scrollProgress)}
        aria-valuemin={0}
        aria-valuemax={100}
      />

      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-3 px-3.5 sm:h-16 sm:gap-8 sm:px-6">
        {/* Zone 1: Brand Wordmark */}
        <a
          href="#top"
          dir="ltr"
          className="font-mono text-[15px] font-extrabold tracking-tight text-foreground whitespace-nowrap shrink-0 sm:text-lg"
        >
          Abdalrhman<span className="text-emerald-500 dark:text-emerald-400">.dev</span>
        </a>

        {/* Zone 2: Desktop Navigation Links */}
        <nav className="hidden items-center gap-5 lg:flex xl:gap-6">
          {navItems.map((item) => {
            const isActive = activeSection === item.href.slice(1);
            return (
              <a
                key={item.href}
                href={item.href}
                className={`text-xs font-semibold transition-colors whitespace-nowrap shrink-0 xl:text-sm ${
                  isActive
                    ? "text-emerald-600 dark:text-emerald-400 underline underline-offset-8 decoration-2 decoration-emerald-500"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {t(item.label)}
              </a>
            );
          })}
        </nav>

        {/* Zone 3: Controls (40px+ Touch Targets on Mobile) */}
        <div className="flex items-center gap-1.5 shrink-0 sm:gap-2">
          {/* Theme Toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={t("toggle_theme")}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-secondary/50 text-foreground transition-colors active:scale-95 hover:border-emerald-500/40 hover:bg-secondary"
          >
            {theme === "dark" ? (
              <Sun className="h-4 w-4 text-emerald-400" />
            ) : (
              <Moon className="h-4 w-4 text-slate-700" />
            )}
          </button>

          {/* Language Toggle */}
          <button
            type="button"
            onClick={toggleLang}
            aria-label={t("toggle_lang")}
            className="inline-flex h-10 items-center gap-1.5 rounded-xl border border-border bg-secondary/50 px-2.5 text-xs font-bold text-foreground transition-colors active:scale-95 hover:border-emerald-500/40 hover:bg-secondary whitespace-nowrap shrink-0 sm:px-3"
          >
            <Globe className="h-3.5 w-3.5 text-emerald-500 dark:text-emerald-400 shrink-0" />
            <span>{lang === "ar" ? "EN" : "عربي"}</span>
          </button>

          {/* Primary GitHub Action (Desktop) */}
          <a
            href={SITE_CONFIG.links.github}
            target="_blank"
            rel="noreferrer"
            dir="ltr"
            className="hidden h-10 items-center gap-2 rounded-xl bg-emerald-500 px-3.5 text-xs font-bold text-emerald-950 transition-colors hover:bg-emerald-400 whitespace-nowrap shrink-0 md:inline-flex"
          >
            <Github className="h-4 w-4" />
            <span>GitHub</span>
          </a>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-secondary/50 text-foreground transition-colors active:scale-95 hover:bg-secondary lg:hidden"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <>
          <div
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 top-14 z-40 bg-black/60 backdrop-blur-xs lg:hidden"
          />
          <div className="fixed inset-x-0 top-14 z-50 max-h-[calc(100dvh-3.5rem)] overflow-y-auto border-b border-border bg-card px-4 py-4 shadow-2xl lg:hidden">
            <div className="grid grid-cols-2 gap-2">
              {navItems.map((item) => {
                const isActive = activeSection === item.href.slice(1);
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex min-h-[46px] items-center rounded-xl border px-3.5 py-2.5 text-sm font-semibold transition-colors active:scale-[0.98] ${
                      isActive
                        ? "border-emerald-500/40 bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-bold"
                        : "border-border/60 bg-secondary/30 text-foreground/85 hover:bg-secondary hover:text-foreground"
                    }`}
                  >
                    {t(item.label)}
                  </a>
                );
              })}
            </div>

            <div className="mt-3.5 grid grid-cols-2 gap-2.5 border-t border-border pt-3.5">
              <a
                href={PROFILE.links.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="flex min-h-[46px] items-center justify-center gap-2 rounded-xl bg-[#25D366] px-3 py-2.5 text-xs font-bold text-white active:scale-[0.98]"
              >
                <MessageSquareCode className="h-4 w-4 shrink-0" />
                <span className="whitespace-nowrap">
                  {lang === "ar" ? "واتساب مباشر" : "WhatsApp"}
                </span>
              </a>
              <a
                href={SITE_CONFIG.links.github}
                target="_blank"
                rel="noreferrer"
                dir="ltr"
                onClick={() => setMobileMenuOpen(false)}
                className="flex min-h-[46px] items-center justify-center gap-2 rounded-xl border border-border bg-secondary/70 px-3 py-2.5 text-xs font-bold text-foreground active:scale-[0.98]"
              >
                <Github className="h-4 w-4 shrink-0" />
                <span className="whitespace-nowrap">GitHub</span>
              </a>
            </div>
          </div>
        </>
      )}
    </header>
  );
}
