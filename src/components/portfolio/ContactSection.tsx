import { useEffect, useState } from "react";
import {
  ArrowUp,
  ArrowUpRight,
  Github,
  Linkedin,
  Mail,
  MessageSquareCode,
  Sparkles,
} from "lucide-react";
import { useApp } from "@/lib/app-context";
import { PROFILE } from "@/data/profile";

export function ContactSection() {
  const { lang } = useApp();
  const isAr = lang === "ar";
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
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
      className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:py-28 relative"
    >
      <div className="relative overflow-hidden rounded-3xl border border-border/80 bg-gradient-to-b from-secondary/70 via-secondary/40 to-secondary/70 p-8 text-center shadow-2xl backdrop-blur-xl sm:p-12 lg:p-16">
        {/* Ambient Top Glow */}
        <div className="pointer-events-none absolute -top-32 start-1/2 -z-10 h-72 w-[500px] -translate-x-1/2 rounded-full bg-emerald-500/15 blur-3xl" />

        <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 text-xs font-semibold text-emerald-400">
          <Sparkles className="h-3.5 w-3.5" />
          <span>{isAr ? "بدء التعاون ومناقشة المشاريع" : "Let's Collaborate"}</span>
        </span>

        <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-5xl lg:text-6xl">
          {isAr ? "هل لديك فكرة أو" : "Have an ambitious"}{" "}
          <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
            {isAr ? "مشروع جديد؟" : "project in mind?"}
          </span>
        </h2>

        <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base md:text-lg">
          {isAr
            ? "جاهز لبناء وهندسة منصتك من الصفر: من تصميم قواعد البيانات والـ APIs الآمنة، وحتى الواجهات المتجاوبة والنشر السحابي المستقر."
            : "Ready to engineer your platform end-to-end: from database schema and secure APIs to reactive frontend and resilient deployment."}
        </p>

        {/* Action Buttons Row */}
        <div className="mt-8 flex flex-col justify-center gap-3.5 sm:flex-row sm:flex-wrap sm:gap-4">
          {/* WhatsApp Direct */}
          <a
            href={PROFILE.links.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[48px] items-center justify-center gap-2.5 rounded-full bg-[#25D366] px-7 py-3 text-sm font-bold text-white shadow-lg shadow-[#25D366]/20 transition-all hover:-translate-y-0.5 hover:bg-[#20BA5A] sm:text-base"
          >
            <MessageSquareCode className="h-5 w-5" />
            <span>{isAr ? "محادثة مباشرة عبر واتساب" : "Direct WhatsApp Chat"}</span>
            <ArrowUpRight className="h-4 w-4" />
          </a>

          {/* LinkedIn */}
          <a
            href={PROFILE.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[48px] items-center justify-center gap-2.5 rounded-full border border-border/80 bg-secondary/80 px-6 py-3 text-sm font-bold text-foreground transition-all hover:-translate-y-0.5 hover:border-emerald-500/50 hover:bg-secondary sm:text-base"
          >
            <Linkedin className="h-5 w-5 text-sky-400" />
            <span>LinkedIn Profile</span>
          </a>

          {/* GitHub */}
          <a
            href={PROFILE.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[48px] items-center justify-center gap-2.5 rounded-full border border-border/80 bg-secondary/80 px-6 py-3 text-sm font-bold text-foreground transition-all hover:-translate-y-0.5 hover:border-emerald-500/50 hover:bg-secondary sm:text-base"
          >
            <Github className="h-5 w-5" />
            <span>GitHub Profile</span>
          </a>

          {/* Email */}
          <a
            href={PROFILE.links.email}
            className="inline-flex min-h-[48px] items-center justify-center gap-2.5 rounded-full border border-border/80 bg-secondary/80 px-6 py-3 text-sm font-bold text-foreground transition-all hover:-translate-y-0.5 hover:border-emerald-500/50 hover:bg-secondary sm:text-base"
          >
            <Mail className="h-5 w-5 text-emerald-400" />
            <span>{isAr ? "راسلني بالبريد" : "Send Email"}</span>
          </a>
        </div>
      </div>

      {/* Floating Back-to-Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          aria-label={isAr ? "الرجوع لأعلى الصفحة" : "Back to top"}
          className="fixed bottom-6 end-6 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-emerald-500/40 bg-secondary/90 text-emerald-400 shadow-xl backdrop-blur-md transition-all hover:-translate-y-1 hover:bg-emerald-500 hover:text-emerald-950"
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
    <footer className="border-t border-border/40 bg-secondary/20 py-8 text-center text-xs text-muted-foreground sm:py-10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="font-mono text-sm font-bold text-foreground">
            Abdalrhman<span className="text-emerald-400">.dev</span>
          </div>
          <div>
            © {new Date().getFullYear()} {PROFILE.name.ar} ({PROFILE.name.en}) —{" "}
            {isAr ? "جميع الحقوق محفوظة." : "All rights reserved."}
          </div>
          <div className="flex items-center gap-4 text-xs font-semibold">
            <a href="#about" className="hover:text-foreground">
              {isAr ? "نبذة" : "About"}
            </a>
            <a href="#skills" className="hover:text-foreground">
              {isAr ? "المهارات" : "Skills"}
            </a>
            <a href="#architecture" className="hover:text-foreground">
              {isAr ? "المعمارية" : "Architecture"}
            </a>
            <a href="#projects" className="hover:text-foreground">
              {isAr ? "المشاريع" : "Projects"}
            </a>
            <a href="#sites" className="hover:text-foreground">
              {isAr ? "المواقع" : "Sites"}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
