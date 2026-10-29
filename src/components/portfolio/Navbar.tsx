import { useEffect, useState } from "react";
import { Github, Globe, Menu, Moon, Sun, X } from "lucide-react";
import { useApp, type TKey } from "@/lib/app-context";
import { SITE_CONFIG } from "@/config/site-config";

const navItems: { href: string; label: TKey }[] = [
  { href: "#about", label: "nav_about" },
  { href: "#skills", label: "nav_skills" },
  { href: "#architecture", label: "nav_architecture" },
  { href: "#projects", label: "nav_projects" },
  { href: "#timeline", label: "nav_timeline" },
  { href: "#sites", label: "nav_sites" },
  { href: "#contact", label: "nav_contact" },
];

export function Navbar() {
  const { t, lang, theme, toggleLang, toggleTheme } = useApp();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const currentProgress = (window.scrollY / totalScroll) * 100;
        setScrollProgress(Math.min(100, Math.max(0, currentProgress)));
      }

      // Scroll Spy
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

  return (
    <header className="sticky top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-xl">
      {/* Reading Progress Bar */}
      <div
        className="absolute top-0 start-0 h-[2.5px] bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400 transition-all duration-150"
        style={{ width: `${scrollProgress}%` }}
        role="progressbar"
        aria-valuenow={Math.round(scrollProgress)}
        aria-valuemin={0}
        aria-valuemax={100}
      />

      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        {/* Brand */}
        <a
          href="#top"
          className="group flex items-center gap-2 font-mono text-base font-extrabold tracking-tight sm:text-lg"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500/10 font-mono text-sm font-black text-emerald-400 ring-1 ring-emerald-500/30 transition-transform group-hover:scale-105">
            A
          </span>
          <span>
            Abdalrhman<span className="text-emerald-400">.dev</span>
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <div className="hidden items-center gap-1 lg:flex xl:gap-2">
          {navItems.map((item) => {
            const isActive = activeSection === item.href.slice(1);
            return (
              <a
                key={item.href}
                href={item.href}
                className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-all duration-200 xl:px-3.5 xl:text-sm ${
                  isActive
                    ? "bg-emerald-500/15 text-emerald-400 ring-1 ring-emerald-500/30"
                    : "text-muted-foreground hover:bg-secondary/80 hover:text-foreground"
                }`}
              >
                {t(item.label)}
              </a>
            );
          })}
        </div>

        {/* Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            aria-label={t("toggle_theme")}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border/60 bg-secondary/50 text-foreground transition-all hover:border-emerald-500/40 hover:bg-secondary sm:h-10 sm:w-10"
          >
            {theme === "dark" ? (
              <Sun className="h-4 w-4 text-emerald-400 transition-transform duration-300 hover:rotate-45" />
            ) : (
              <Moon className="h-4 w-4 text-slate-700 transition-transform duration-300 hover:-rotate-12" />
            )}
          </button>

          {/* Language Toggle */}
          <button
            onClick={toggleLang}
            aria-label={t("toggle_lang")}
            className="inline-flex h-9 items-center gap-1 rounded-full border border-border/60 bg-secondary/50 px-3 text-xs font-bold text-foreground transition-all hover:border-emerald-500/40 hover:bg-secondary sm:h-10 sm:gap-1.5 sm:px-3.5 sm:text-sm"
          >
            <Globe className="h-3.5 w-3.5 text-emerald-400" />
            <span>{lang === "ar" ? "English" : "العربية"}</span>
          </button>

          {/* GitHub link */}
          <a
            href={SITE_CONFIG.links.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub Profile"
            className="hidden items-center gap-2 rounded-full border border-border/60 bg-secondary/50 px-3.5 py-2 text-xs font-bold transition-all hover:border-emerald-500/40 hover:bg-secondary md:inline-flex"
          >
            <Github className="h-4 w-4" />
            <span className="font-mono text-xs">GitHub</span>
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Open menu"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border/60 bg-secondary/50 text-foreground transition-colors hover:bg-secondary lg:hidden"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="border-b border-border/60 bg-background/95 px-4 py-4 backdrop-blur-2xl lg:hidden">
          <div className="flex flex-col gap-1.5">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors ${
                  activeSection === item.href.slice(1)
                    ? "bg-emerald-500/15 text-emerald-400 font-bold"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                }`}
              >
                {t(item.label)}
              </a>
            ))}
            <div className="mt-2 border-t border-border/40 pt-3">
              <a
                href={SITE_CONFIG.links.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 rounded-xl bg-secondary/60 px-4 py-2.5 text-sm font-semibold"
              >
                <Github className="h-4 w-4" />
                <span>GitHub Profile</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
