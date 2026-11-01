import { useEffect, useState } from "react";
import {
  ArrowUpRight,
  CheckCircle2,
  ChevronRight,
  Copy,
  Github,
  MessageSquareCode,
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
  const [avatarError, setAvatarError] = useState(false);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
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

  const formatStatValue = (num: number, suffix: string) => {
    if (suffix === "%") return `${num}%`;
    if (suffix === "M+") return `+${num}M`;
    return `+${num}`;
  };

  return (
    <section
      id="about"
      className="relative overflow-hidden border-b border-border pb-10 pt-6 sm:pb-20 sm:pt-16 lg:pb-24 lg:pt-20 bg-mesh-gradient"
    >
      <div className="pointer-events-none absolute inset-0 -z-10 bg-grid-pattern opacity-50" />

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid items-center gap-7 sm:gap-12 lg:grid-cols-[1.12fr_0.88fr] lg:gap-14">
          {/* Primary Column: Profile Intro + Headlines + CTAs */}
          <div className="min-w-0">
            {/* Mobile-First Top Identity Lockup (Avatar visible immediately above the fold on phones) */}
            <div className="mb-4 flex items-center gap-3.5 lg:hidden">
              <div className="shrink-0 rounded-2xl bg-gradient-to-tr from-emerald-500 via-teal-400 to-cyan-500 p-0.5 shadow-md">
                <div className="h-14 w-14 overflow-hidden rounded-[14px] bg-secondary">
                  {!avatarError ? (
                    <img
                      src={PROFILE.links.avatar}
                      alt={PROFILE.name.en}
                      width={56}
                      height={56}
                      referrerPolicy="no-referrer"
                      onError={() => setAvatarError(true)}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center font-mono text-base font-black text-emerald-500">
                      AA
                    </div>
                  )}
                </div>
              </div>
              <div className="min-w-0">
                <p className="text-[11px] font-bold leading-snug text-emerald-600 dark:text-emerald-400">
                  {isAr
                    ? "متاح لمشاريع ومنصات جديدة · استشارات هندسية"
                    : "Available for New Projects & Platforms"}
                </p>
                <div
                  dir="ltr"
                  className="mt-1 flex flex-wrap items-center gap-x-1.5 gap-y-0.5 font-mono text-[11px] font-semibold text-muted-foreground"
                >
                  <span className="font-bold text-foreground">PHP / Laravel</span>
                  <span aria-hidden="true">·</span>
                  <span className="font-bold text-foreground">Go</span>
                  <span aria-hidden="true">·</span>
                  <span>React & TS</span>
                </div>
              </div>
            </div>

            {/* Desktop Kicker */}
            <p className="hidden text-xs font-bold tracking-wide text-emerald-600 dark:text-emerald-400 lg:block sm:text-sm">
              {isAr
                ? "متاح لمشاريع ومنصات جديدة · استشارات هندسية"
                : "Available for New Projects & Platforms · Engineering Consulting"}
            </p>

            {/* Main Headline (Comfortable Arabic Line-Height on Mobile) */}
            <h1 className="text-[26px] leading-[1.32] font-black tracking-tight text-balance sm:mt-4 sm:text-5xl sm:leading-[1.2] lg:text-6xl">
              <span className="block text-foreground">{PROFILE.name[lang]}</span>
              <span className="mt-1.5 block bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 dark:from-emerald-400 dark:via-teal-300 dark:to-cyan-400 bg-clip-text text-[19px] leading-[1.4] font-extrabold text-transparent sm:mt-2.5 sm:text-3xl lg:text-4xl">
                {PROFILE.title[lang]}
              </span>
            </h1>

            {/* Desktop Core Stack Metadata Line */}
            <div
              dir="ltr"
              className="mt-4 hidden flex-wrap items-center gap-x-2.5 gap-y-1 font-mono text-xs font-semibold text-muted-foreground lg:flex sm:text-sm"
            >
              <span className="text-foreground font-bold">PHP / Laravel</span>
              <span aria-hidden="true">·</span>
              <span className="text-foreground font-bold">Go (Golang)</span>
              <span aria-hidden="true">·</span>
              <span>TypeScript & React</span>
              <span aria-hidden="true">·</span>
              <span className="text-emerald-600 dark:text-emerald-400">Multi-Tenancy & ZATCA</span>
            </div>

            {/* Value Proposition */}
            <p className="mt-3.5 max-w-xl text-[13.5px] leading-[1.7] text-muted-foreground sm:mt-6 sm:text-base lg:text-lg">
              {PROFILE.headline[lang]}
            </p>

            {/* Mobile-Optimized CTAs */}
            <div className="mt-5 flex flex-col gap-2.5 sm:mt-8 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3.5">
              <a
                href={PROFILE.links.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] px-5 py-3 text-sm font-bold text-white shadow-lg shadow-[#25D366]/20 transition-all active:scale-[0.98] hover:-translate-y-0.5 hover:bg-[#20BA5A] whitespace-nowrap sm:w-auto sm:rounded-full sm:px-6 sm:text-base"
              >
                <MessageSquareCode className="h-5 w-5 shrink-0" />
                <span>{isAr ? "تواصل عبر واتساب" : "Chat on WhatsApp"}</span>
                <ArrowUpRight className="h-4 w-4 shrink-0" />
              </a>

              <div className="grid grid-cols-2 gap-2 sm:flex sm:items-center sm:gap-3.5">
                <a
                  href="#projects"
                  className="inline-flex min-h-[46px] items-center justify-center gap-1 rounded-xl border border-emerald-500/40 bg-emerald-500/10 px-3 py-2.5 text-xs font-bold text-emerald-700 dark:text-emerald-300 transition-colors active:scale-[0.98] hover:bg-emerald-500/20 whitespace-nowrap sm:min-h-[48px] sm:gap-1.5 sm:rounded-full sm:px-5 sm:text-sm"
                >
                  <span>{isAr ? "استعرض المشاريع" : "Explore Projects"}</span>
                  <ChevronRight className="h-3.5 w-3.5 shrink-0 rtl:rotate-180 sm:h-4 sm:w-4" />
                </a>

                <a
                  href={PROFILE.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[46px] items-center justify-center gap-1.5 rounded-xl border border-border bg-secondary/70 px-3 py-2.5 text-xs font-bold text-foreground transition-all active:scale-[0.98] hover:border-emerald-500/50 hover:bg-secondary whitespace-nowrap sm:min-h-[48px] sm:gap-2 sm:rounded-full sm:px-5 sm:text-sm"
                >
                  <Github className="h-4 w-4 shrink-0" />
                  <span>{isAr ? "حساب GitHub" : "GitHub"}</span>
                </a>
              </div>
            </div>
          </div>

          {/* Secondary Column: Desktop Avatar Card + Overflow-Safe Live Terminal */}
          <div className="min-w-0 w-full max-w-lg mx-auto lg:max-w-none">
            {/* Desktop Avatar Lockup */}
            <div className="mb-5 hidden items-center gap-4 rounded-2xl border border-border bg-card/80 p-4 lg:flex">
              <div className="relative shrink-0 rounded-2xl bg-gradient-to-tr from-emerald-500 via-teal-400 to-cyan-500 p-0.5 shadow-md">
                <div className="h-20 w-20 overflow-hidden rounded-[14px] bg-secondary">
                  {!avatarError ? (
                    <img
                      src={PROFILE.links.avatar}
                      alt={PROFILE.name.en}
                      width={80}
                      height={80}
                      referrerPolicy="no-referrer"
                      onError={() => setAvatarError(true)}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center font-mono text-xl font-black text-emerald-500">
                      AA
                    </div>
                  )}
                </div>
              </div>

              <div className="min-w-0 flex-1">
                <div className="text-base font-black text-foreground">
                  {isAr ? "هندسة الأنظمة الخلفية السحابية" : "Cloud Backend & Systems Engineering"}
                </div>
                <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground line-clamp-2">
                  {isAr
                    ? "عزل تام لبيانات المستأجرين، صلاحيات RBAC دقيقة، وتكاملات دفع وفوترة إلكترونية."
                    : "Strict tenant isolation, granular RBAC policies, payment gateways & ZATCA Phase 2."}
                </p>
                <div
                  dir="ltr"
                  className="mt-1.5 flex flex-wrap items-center gap-2 font-mono text-[11px] font-bold text-emerald-600 dark:text-emerald-400"
                >
                  <span>Laravel</span>
                  <span aria-hidden="true">·</span>
                  <span>Golang</span>
                  <span aria-hidden="true">·</span>
                  <span>Docker</span>
                </div>
              </div>
            </div>

            {/* Interactive Terminal Emulator */}
            <div
              dir="ltr"
              className="w-full max-w-full overflow-hidden rounded-2xl border border-slate-800 bg-[#090D13] text-left font-mono text-xs shadow-2xl sm:rounded-3xl"
            >
              {/* Terminal Header */}
              <div className="flex items-center justify-between border-b border-slate-800/80 bg-[#0E141D] px-3 py-2 sm:px-4 sm:py-2.5">
                <div className="flex items-center gap-1.5 min-w-0">
                  <span className="h-2.5 w-2.5 rounded-full bg-rose-500/80 shrink-0" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80 shrink-0" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80 shrink-0" />
                  <span className="ms-1.5 truncate text-[10.5px] text-slate-400 sm:ms-2 sm:text-[11px]">
                    abdalrhman@server:~$
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleCopyTerminal}
                  aria-label="Copy terminal log"
                  className="flex min-h-[32px] items-center gap-1 rounded-md px-2 py-1 text-[11px] text-slate-400 transition-colors hover:bg-slate-800 hover:text-emerald-400 whitespace-nowrap shrink-0"
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
              <div className="min-h-[176px] space-y-2 p-3 text-[10.5px] leading-relaxed sm:min-h-[208px] sm:space-y-2.5 sm:p-4 sm:text-[12px]">
                {TERMINAL_LINES.slice(0, currentLineIndex).map((line, idx) => (
                  <div key={idx} className="space-y-0.5">
                    <div className="flex items-start gap-1.5 text-slate-200 sm:gap-2">
                      <span className="text-emerald-400 font-bold shrink-0">{line.prompt}</span>
                      <span className="break-all sm:break-normal">{line.text}</span>
                    </div>
                    <div className="ps-3.5 text-[10px] text-slate-400 sm:ps-4 sm:text-[11px]">
                      {line.output}
                    </div>
                  </div>
                ))}

                {/* Active Typing Line */}
                <div className="space-y-0.5">
                  <div className="flex items-start gap-1.5 text-slate-100 sm:gap-2">
                    <span className="text-emerald-400 font-bold shrink-0">
                      {TERMINAL_LINES[currentLineIndex].prompt}
                    </span>
                    <span className="break-all sm:break-normal">
                      {displayedText}
                      <span className="ms-0.5 inline-block h-3.5 w-1.5 bg-emerald-400 align-middle" />
                    </span>
                  </div>
                  {!isTyping && (
                    <div className="ps-3.5 text-[10px] text-emerald-400 sm:ps-4 sm:text-[11px]">
                      {TERMINAL_LINES[currentLineIndex].output}
                    </div>
                  )}
                </div>
              </div>

              {/* Terminal Footer */}
              <div className="flex items-center justify-between gap-2 border-t border-slate-800/80 bg-[#0B1017] px-3 py-2 text-[10px] text-slate-400 sm:px-4 sm:text-[11px]">
                <span className="truncate">Production Ready · Linux x86_64</span>
                <span className="font-mono text-emerald-400 shrink-0">ZATCA Compliant</span>
              </div>
            </div>
          </div>
        </div>

        {/* Full-Width KPI Metrics Strip */}
        <div className="mt-6 grid grid-cols-2 gap-2.5 border-t border-border pt-5 sm:mt-12 sm:grid-cols-4 sm:gap-4 sm:pt-8">
          {PROFILE.stats.map((s) => (
            <div
              key={s.labelAr}
              className="min-w-0 rounded-2xl border border-border bg-card/75 p-3 text-center transition-colors hover:border-emerald-500/40 sm:p-4"
            >
              <div
                dir="ltr"
                className="font-mono text-xl font-black tabular-nums text-emerald-600 dark:text-emerald-400 sm:text-3xl"
              >
                {formatStatValue(s.num, s.suffix)}
              </div>
              <div className="mt-0.5 text-[11px] font-semibold leading-snug text-muted-foreground sm:mt-1 sm:text-xs">
                {isAr ? s.labelAr : s.labelEn}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
