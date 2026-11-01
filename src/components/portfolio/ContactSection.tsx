import { useEffect, useState } from "react";
import {
  ArrowUp,
  ArrowUpRight,
  Github,
  Linkedin,
  Mail,
  MessageSquareCode,
} from "lucide-react";
import { useApp } from "@/lib/app-context";
import { PROFILE } from "@/data/profile";

export function ContactSection() {
  const { lang } = useApp();
  const isAr = lang === "ar";
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section
      id="contact"
      className="relative mx-auto max-w-6xl border-t border-border/60 px-4 py-12 sm:px-6 sm:py-20 lg:py-24"
    >
      <div className="relative overflow-hidden rounded-2xl border border-border bg-gradient-to-b from-secondary/60 via-card to-secondary/40 p-6 text-center shadow-xl sm:rounded-3xl sm:p-12 lg:p-16">
        <div className="pointer-events-none absolute -top-32 left-1/2 -z-10 h-72 w-[420px] -translate-x-1/2 rounded-full bg-emerald-500/12 blur-3xl" />

        <p className="text-xs font-bold tracking-wide text-emerald-600 dark:text-emerald-400 sm:text-sm">
          {isAr ? "بدء التعاون ومناقشة المشاريع" : "Let's Collaborate"}
        </p>

        <h2 className="mt-3 text-2xl font-black tracking-tight text-balance sm:mt-4 sm:text-5xl lg:text-6xl">
          {isAr ? "هل لديك فكرة أو" : "Have an ambitious"}{" "}
          <span className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 dark:from-emerald-400 dark:via-teal-300 dark:to-cyan-400 bg-clip-text text-transparent">
            {isAr ? "مشروع جديد؟" : "project in mind?"}
          </span>
        </h2>

        <p className="mx-auto mt-3.5 max-w-xl text-xs leading-relaxed text-muted-foreground sm:mt-4 sm:text-base md:text-lg">
          {isAr
            ? "جاهز لبناء وهندسة منصتك من الصفر: من تصميم قواعد البيانات والـ APIs الآمنة، وحتى الواجهات المتجاوبة والنشر السحابي المستقر."
            : "Ready to engineer your platform end-to-end: from database schema and secure APIs to reactive frontend and resilient deployment."}
        </p>

        {/* Mobile-Friendly Action Grid */}
        <div className="mt-6 flex flex-col justify-center gap-2.5 sm:mt-8 sm:flex-row sm:flex-wrap sm:gap-3.5">
          <a
            href={PROFILE.links.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[48px] w-full items-center justify-center gap-2.5 rounded-xl bg-[#25D366] px-7 py-3 text-sm font-bold text-white shadow-lg shadow-[#25D366]/20 transition-all hover:-translate-y-0.5 hover:bg-[#20BA5A] whitespace-nowrap sm:w-auto sm:rounded-full sm:text-base"
          >
            <MessageSquareCode className="h-5 w-5 shrink-0" />
            <span>{isAr ? "محادثة مباشرة عبر واتساب" : "Direct WhatsApp Chat"}</span>
            <ArrowUpRight className="h-4 w-4 shrink-0" />
          </a>

          <div className="grid grid-cols-2 gap-2.5 sm:flex sm:flex-wrap sm:items-center sm:gap-3.5">
            <a
              href={PROFILE.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              dir="ltr"
              className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-xl border border-border bg-card px-4 py-2.5 text-xs font-bold text-foreground transition-all hover:border-emerald-500/50 hover:bg-secondary whitespace-nowrap sm:min-h-[48px] sm:rounded-full sm:px-6 sm:text-sm"
            >
              <Linkedin className="h-4 w-4 shrink-0 text-sky-500 dark:text-sky-400" />
              <span>LinkedIn</span>
            </a>

            <a
              href={PROFILE.links.github}
              target="_blank"
              rel="noopener noreferrer"
              dir="ltr"
              className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-xl border border-border bg-card px-4 py-2.5 text-xs font-bold text-foreground transition-all hover:border-emerald-500/50 hover:bg-secondary whitespace-nowrap sm:min-h-[48px] sm:rounded-full sm:px-6 sm:text-sm"
            >
              <Github className="h-4 w-4 shrink-0" />
              <span>GitHub</span>
            </a>
          </div>

          <a
            href={PROFILE.links.email}
            className="inline-flex min-h-[46px] w-full items-center justify-center gap-2 rounded-xl border border-border bg-card px-5 py-2.5 text-xs font-bold text-foreground transition-all hover:border-emerald-500/50 hover:bg-secondary whitespace-nowrap sm:min-h-[48px] sm:w-auto sm:rounded-full sm:px-6 sm:text-sm"
          >
            <Mail className="h-4 w-4 shrink-0 text-emerald-500 dark:text-emerald-400" />
            <span>{isAr ? "راسلني بالبريد الإلكتروني" : "Send Email"}</span>
          </a>
        </div>
      </div>

      {/* Compact Back-to-Top Button */}
      {showBackToTop && (
        <button
          type="button"
          onClick={scrollToTop}
          aria-label={isAr ? "الرجوع لأعلى الصفحة" : "Back to top"}
          className="fixed bottom-4 end-4 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-emerald-500/40 bg-card/90 text-emerald-600 dark:text-emerald-400 shadow-lg backdrop-blur-md transition-all hover:-translate-y-0.5 hover:bg-emerald-500 hover:text-emerald-950 sm:bottom-6 sm:end-6"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      )}
    </section>
  );
}

export function Footer() {
  const { lang } = useApp();
  const isAr = lang === "ar";

  return (
    <footer className="border-t border-border bg-secondary/20 py-7 text-center text-xs text-muted-foreground sm:py-10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div dir="ltr" className="font-mono text-sm font-bold text-foreground">
            Abdalrhman<span className="text-emerald-500 dark:text-emerald-400">.dev</span>
          </div>
          <div>
            © {new Date().getFullYear()} {PROFILE.name.ar} ({PROFILE.name.en}) —{" "}
            {isAr ? "جميع الحقوق محفوظة." : "All rights reserved."}
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-semibold">
            <a href="#about" className="hover:text-foreground whitespace-nowrap">
              {isAr ? "نبذة" : "About"}
            </a>
            <a href="#skills" className="hover:text-foreground whitespace-nowrap">
              {isAr ? "المهارات" : "Skills"}
            </a>
            <a href="#projects" className="hover:text-foreground whitespace-nowrap">
              {isAr ? "المشاريع" : "Projects"}
            </a>
            <a href="#workflow" className="hover:text-foreground whitespace-nowrap">
              {isAr ? "المنهجية" : "Workflow"}
            </a>
            <a href="#architecture" className="hover:text-foreground whitespace-nowrap">
              {isAr ? "المعمارية" : "Architecture"}
            </a>
            <a href="#sites" className="hover:text-foreground whitespace-nowrap">
              {isAr ? "المواقع" : "Sites"}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
