import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { SITE_CONFIG } from "@/config/site-config";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 text-foreground">
      <div className="max-w-md text-center">
        <h1 className="font-mono text-7xl font-bold text-primary">404</h1>
        <h2 className="mt-4 text-2xl font-bold">الصفحة غير موجودة | Page Not Found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          الصفحة التي تبحث عنها غير متوفرة أو تم نقلها.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-2.5 text-sm font-bold text-primary-foreground transition-transform hover:-translate-y-0.5"
          >
            العودة للرئيسية / Home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 text-foreground">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-bold tracking-tight">حدث خطأ غير متوقع</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          نعتذر، تعذّر تحميل الصفحة بشكل سليم. يمكنك إعادة المحاولة.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            إعادة المحاولة
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-full border border-border bg-secondary px-5 py-2 text-sm font-semibold transition-colors hover:bg-secondary/80"
          >
            الرئيسية
          </a>
        </div>
      </div>
    </div>
  );
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://abdalrhman-abdo-alhade.vercel.app/#person",
      name: SITE_CONFIG.name.ar,
      alternateName: SITE_CONFIG.name.en,
      jobTitle: "Full-Stack Software Engineer",
      description: SITE_CONFIG.bio.en,
      url: "https://abdalrhman-abdo-alhade.vercel.app",
      image: SITE_CONFIG.links.avatar,
      sameAs: [SITE_CONFIG.links.github, SITE_CONFIG.links.linkedin],
      knowsAbout: [
        "PHP",
        "Laravel",
        "Go (Golang)",
        "React",
        "TypeScript",
        "Multi-Tenancy",
        "REST APIs",
        "ZATCA E-Invoicing",
        "PostgreSQL",
        "Docker",
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://abdalrhman-abdo-alhade.vercel.app/#website",
      url: "https://abdalrhman-abdo-alhade.vercel.app",
      name: `${SITE_CONFIG.name.ar} | Full-Stack Developer`,
      publisher: {
        "@id": "https://abdalrhman-abdo-alhade.vercel.app/#person",
      },
      inLanguage: ["ar", "en"],
    },
  ],
};

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
      { name: "theme-color", content: "#0B0F14" },
      {
        title: "عبدالرحمن عبده | Full-Stack Developer (Laravel · Go · React)",
      },
      {
        name: "description",
        content:
          "بورتفوليو عبدالرحمن عبده – مطور Full-Stack متخصص في منصات SaaS متعددة المستأجرين، Laravel 12، Go، React/TypeScript، وتكاملات ZATCA وبوابات الدفع.",
      },
      { name: "author", content: "Abdalrhman Abdo" },
      {
        name: "keywords",
        content:
          "Full-Stack Developer, Laravel, Go, Golang, React, TypeScript, Multi-Tenant, ZATCA, Saudi Arabia, Backend API, عبدالرحمن عبده",
      },
      // Open Graph
      { property: "og:site_name", content: "Abdalrhman Abdo Portfolio" },
      { property: "og:title", content: "عبدالرحمن عبده | مطور Full-Stack (Laravel · Go · React)" },
      {
        property: "og:description",
        content:
          "أبني منصات SaaS وتجارة إلكترونية متعددة المستأجرين — من الـ API للواجهة للنشر. خبرة +6 سنوات في هندسة البرمجيات.",
      },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "https://abdalrhman-abdo-alhade.vercel.app/og-image.svg" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:url", content: "https://abdalrhman-abdo-alhade.vercel.app" },
      // Twitter Card
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "عبدالرحمن عبده | Full-Stack & Back-End Engineer" },
      {
        name: "twitter:description",
        content: "SaaS Platforms & E-Commerce Engineering (Laravel · Go · Multi-Tenant)",
      },
      { name: "twitter:image", content: "https://abdalrhman-abdo-alhade.vercel.app/og-image.svg" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cairo:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600;700&display=swap",
      },
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
      { rel: "alternate", hrefLang: "ar", href: "https://abdalrhman-abdo-alhade.vercel.app" },
      { rel: "alternate", hrefLang: "en", href: "https://abdalrhman-abdo-alhade.vercel.app" },
      {
        rel: "alternate",
        hrefLang: "x-default",
        href: "https://abdalrhman-abdo-alhade.vercel.app",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(jsonLd),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="ar" dir="rtl" className="dark">
      <head>
        <HeadContent />
      </head>
      <body className="min-h-screen bg-background font-sans text-foreground antialiased selection:bg-emerald-500/30 selection:text-emerald-300">
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}
