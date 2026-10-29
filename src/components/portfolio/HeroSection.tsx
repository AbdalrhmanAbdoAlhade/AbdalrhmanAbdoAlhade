import { useEffect, useState } from "react";
import {
  ArrowUpRight,
  CheckCircle2,
  ChevronRight,
  Copy,
  Github,
  MessageSquareCode,
  Sparkles,
  Terminal,
} from "lucide-react";
import { useApp } from "@/lib/app-context";
import { PROFILE } from "@/data/profile";

const TERMINAL_LINES = [
  {
    prompt: "$",
    text: "php artisan serve --port=8000",
    output: "INFO  Server running on [http://127.0.0.1:8000]",
  },
  {
    prompt: "$",
    text: "go run cmd/api/main.go",
    output: "INFO  gRPC & REST clusters listening on :50051",
  },
  {
    prompt: "$",
    text: "curl -I https://api.zh-innovation.tech/health",
    output: "HTTP/2 200 OK · Database: connected · Redis: ready",
  },
  {
    prompt: "✔",
    text: "Multi-Tenant Architecture Online",
    output: "Tenancy isolation verified · ZATCA Phase 2 active",
  },
];

export function HeroSection() {
  const { lang } = useApp();
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [copiedTerminal, setCopiedTerminal] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const currentTarget = TERMINAL_LINES[currentLineIndex].text;

    if (isTyping) {
      if (displayedText.length < currentTarget.length) {
        timeout = setTimeout(() => {
          setDisplayedText(currentTarget.slice(0, displayedText.length + 1));
        }, 40);
      } else {
        timeout = setTimeout(() => {
          setIsTyping(false);
        }, 2000);
      }
    } else {
      timeout = setTimeout(() => {
        const nextIndex = (currentLineIndex + 1) % TERMINAL_LINES.length;
        setCurrentLineIndex(nextIndex);
        setDisplayedText("");
        setIsTyping(true);
      }, 600);
    }

    return () => clearTimeout(timeout);
  }, [displayedText, isTyping, currentLineIndex]);

  const handleCopyTerminal = () => {
    const fullLog = TERMINAL_LINES.map((l) => `${l.prompt} ${l.text}\n${l.output}`).join("\n\n");
    navigator.clipboard.writeText(fullLog);
    setCopiedTerminal(true);
    setTimeout(() => setCopiedTerminal(false), 2000);
  };

  const isAr = lang === "ar";

  return (
    <section className="relative overflow-hidden border-b border-border/30 pb-16 pt-12 sm:pb-24 sm:pt-20 lg:pb-28 lg:pt-24 bg-mesh-gradient">
      {/* Subtle Background Grid Pattern */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-grid-pattern opacity-60" />

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
          {/* Left Column: Headlines, CTAs, Counters */}
          <div>
            {/* Status Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1.5 text-xs font-semibold text-emerald-400">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              <Sparkles className="h-3.5 w-3.5" />
              <span>
                {isAr ? "متاح لمشاريع وأنظمة جديدة" : "Available for SaaS & API Projects"}
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="mt-5 text-3xl font-black tracking-tight sm:text-5xl lg:text-6xl">
              <span>{PROFILE.name[lang]}</span>
              <span className="mt-2 block bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-2xl font-extrabold text-transparent sm:mt-3 sm:text-4xl lg:text-5xl">
                {PROFILE.title[lang]}
              </span>
            </h1>

            {/* Core Tech Stack Badges */}
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span className="rounded-lg border border-purple-500/40 bg-purple-500/10 px-3 py-1 font-mono text-xs font-bold text-purple-300">
                PHP / Laravel
              </span>
              <span className="rounded-lg border border-cyan-500/40 bg-cyan-500/10 px-3 py-1 font-mono text-xs font-bold text-cyan-300">
                Go (Golang)
              </span>
              <span className="rounded-lg border border-blue-500/40 bg-blue-500/10 px-3 py-1 font-mono text-xs font-bold text-blue-300">
                TypeScript / React
              </span>
              <span className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 font-mono text-xs font-bold text-emerald-400">
                Multi-Tenant Architecture
              </span>
            </div>

            {/* Value Proposition */}
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              {PROFILE.headline[lang]}
            </p>

            {/* Primary & Secondary CTAs */}
            <div className="mt-8 flex flex-wrap items-center gap-3.5 sm:gap-4">
              {/* WhatsApp Direct */}
              <a
                href={PROFILE.links.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[48px] items-center justify-center gap-2.5 rounded-full bg-[#25D366] px-6 py-3 text-sm font-bold text-white shadow-lg shadow-[#25D366]/20 transition-all hover:-translate-y-0.5 hover:bg-[#20BA5A] sm:text-base"
              >
                <MessageSquareCode className="h-5 w-5" />
                <span>{isAr ? "تواصل عبر واتساب" : "Chat on WhatsApp"}</span>
                <ArrowUpRight className="h-4 w-4" />
              </a>

              {/* GitHub */}
              <a
                href={PROFILE.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[48px] items-center justify-center gap-2.5 rounded-full border border-border/80 bg-secondary/60 px-6 py-3 text-sm font-bold text-foreground transition-all hover:-translate-y-0.5 hover:border-emerald-500/50 hover:bg-secondary sm:text-base"
              >
                <Github className="h-5 w-5" />
                <span>{isAr ? "كود المشاريع على GitHub" : "GitHub Repositories"}</span>
              </a>

              {/* Explore Projects Button */}
              <a
                href="#projects"
                className="inline-flex min-h-[48px] items-center justify-center gap-1.5 rounded-full border border-border/60 px-5 py-3 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
              >
                <span>{isAr ? "استعرض المشاريع" : "Explore Projects"}</span>
                <ChevronRight className="h-4 w-4 rtl:rotate-180" />
              </a>
            </div>

            {/* Stats Metric Row */}
            <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4 border-t border-border/40 pt-8">
              {PROFILE.stats.map((s) => (
                <div
                  key={s.labelAr}
                  className="rounded-2xl border border-border/60 bg-secondary/30 p-3.5 text-center transition-all hover:border-emerald-500/40 hover:bg-secondary/60 sm:p-4"
                >
                  <div className="font-mono text-2xl font-black text-emerald-400 sm:text-3xl">
                    {s.suffix === "%" ? `${s.num}%` : `+${s.num}`}
                  </div>
                  <div className="mt-1 text-xs font-semibold text-muted-foreground">
                    {isAr ? s.labelAr : s.labelEn}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Profile with Gradient Frame & Floating Badges + Terminal Card */}
          <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            {/* Profile Avatar Card with Floating Badges */}
            <div className="relative mb-6 flex items-center justify-center">
              <div className="relative rounded-3xl p-1 bg-gradient-to-tr from-emerald-500 via-teal-400 to-cyan-500 shadow-2xl shadow-emerald-500/10">
                <div className="overflow-hidden rounded-[22px] bg-background">
                  <img
                    src={PROFILE.links.avatar}
                    alt={PROFILE.name.en}
                    width={180}
                    height={180}
                    loading="eager"
                    className="h-36 w-36 sm:h-44 sm:w-44 object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
              </div>

              {/* Floating Badges with Subtle Motion */}
              <div className="absolute -top-3 -start-2 sm:-start-4 animate-float rounded-xl border border-purple-500/40 bg-[#0E131A]/90 px-3 py-1.5 shadow-xl backdrop-blur-md">
                <span className="font-mono text-xs font-black text-purple-400">
                  PHP 8.3 · Laravel 12
                </span>
              </div>

              <div className="absolute -bottom-3 -end-2 sm:-end-4 animate-float-delayed rounded-xl border border-cyan-500/40 bg-[#0E131A]/90 px-3 py-1.5 shadow-xl backdrop-blur-md">
                <span className="font-mono text-xs font-black text-cyan-400">
                  Go (Golang) Microservices
                </span>
              </div>

              <div className="absolute top-1/2 -start-6 -translate-y-1/2 hidden sm:block animate-float rounded-xl border border-blue-500/40 bg-[#0E131A]/90 px-2.5 py-1 shadow-xl backdrop-blur-md">
                <span className="font-mono text-[11px] font-bold text-blue-400">
                  TypeScript & React
                </span>
              </div>
            </div>

            {/* Interactive Terminal Emulator */}
            <div
              dir="ltr"
              className="overflow-hidden rounded-3xl border border-border/80 bg-[#090D13] text-start font-mono text-xs shadow-2xl"
            >
              {/* Terminal Header */}
              <div className="flex items-center justify-between border-b border-border/50 bg-[#0E141D] px-4 py-2.5">
                <div className="flex items-center gap-1.5">
                  <span className="h-3 w-3 rounded-full bg-rose-500/80" />
                  <span className="h-3 w-3 rounded-full bg-amber-500/80" />
                  <span className="h-3 w-3 rounded-full bg-emerald-500/80" />
                  <span className="ms-2 text-[11px] text-muted-foreground">
                    abdalrhman@server:~$
                  </span>
                </div>
                <button
                  onClick={handleCopyTerminal}
                  aria-label="Copy terminal log"
                  className="flex items-center gap-1 rounded px-2 py-0.5 text-[11px] text-muted-foreground transition-colors hover:bg-secondary hover:text-emerald-400"
                >
                  {copiedTerminal ? (
                    <>
                      <CheckCircle2 className="h-3 w-3 text-emerald-400" />
                      <span className="text-emerald-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3 w-3" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              {/* Terminal Screen */}
              <div className="space-y-3 p-4 text-[12px] leading-relaxed">
                {TERMINAL_LINES.slice(0, currentLineIndex).map((line, idx) => (
                  <div key={idx} className="space-y-0.5">
                    <div className="flex items-center gap-2 text-slate-200">
                      <span
                        className={
                          line.prompt === "✔" ? "text-emerald-400 font-bold" : "text-emerald-400"
                        }
                      >
                        {line.prompt}
                      </span>
                      <span>{line.text}</span>
                    </div>
                    <div className="text-[11px] text-slate-400">{line.output}</div>
                  </div>
                ))}

                {/* Active Typing Line */}
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2 text-slate-100">
                    <span className="text-emerald-400 font-bold">
                      {TERMINAL_LINES[currentLineIndex].prompt}
                    </span>
                    <span>{displayedText}</span>
                    <span className="inline-block h-3.5 w-1.5 animate-pulse bg-emerald-400 align-middle" />
                  </div>
                  {!isTyping && (
                    <div className="text-[11px] text-emerald-400">
                      {TERMINAL_LINES[currentLineIndex].output}
                    </div>
                  )}
                </div>
              </div>

              {/* Terminal Footer Status Bar */}
              <div className="flex items-center justify-between border-t border-border/40 bg-[#0B1017] px-4 py-2 text-[11px] text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  <span>Production Ready · Linux x86_64</span>
                </span>
                <span className="font-mono text-emerald-400/80">ZATCA Compliant</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
