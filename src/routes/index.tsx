import { createFileRoute } from "@tanstack/react-router";
import { AppProvider } from "@/lib/app-context";
import { Navbar } from "@/components/portfolio/Navbar";
import { HeroSection } from "@/components/portfolio/HeroSection";
import { SkillsSection } from "@/components/portfolio/SkillsSection";
import { WorkflowSection } from "@/components/portfolio/WorkflowSection";
import { ArchitectureSection } from "@/components/portfolio/ArchitectureSection";
import { ProjectsSection } from "@/components/portfolio/ProjectsSection";
import { SitesSection } from "@/components/portfolio/SitesSection";
import { ContactSection, Footer } from "@/components/portfolio/ContactSection";
import { PROFILE } from "@/data/profile";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
      { name: "theme-color", content: "#0B0F14" },
      {
        title: "عبدالرحمن عبده | مطور برمجيات خلفية وتطوير شامل (Laravel · Go · React)",
      },
      {
        name: "description",
        content:
          "بورتفوليو عبدالرحمن عبده – مهندس برمجيات متخصص في بناء منصات SaaS متعددة المستأجرين (Multi-Tenancy)، Laravel 12، Go، React/TypeScript، وتكاملات ZATCA وبوابات الدفع.",
      },
      { name: "author", content: PROFILE.name.ar },
      {
        property: "og:title",
        content: "عبدالرحمن عبده | Senior Back-End & Full-Stack Engineer",
      },
      {
        property: "og:description",
        content:
          "أبني منصات SaaS وتجارة إلكترونية متعددة المستأجرين — من هندسة المعمارية والـ APIs حتى الواجهات والنشر السحابي.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: PROFILE.links.siteUrl },
      { property: "og:image", content: "https://abdalrhman-abdo-alhade.vercel.app/og-image.svg" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: `${PROFILE.name.ar} | Full-Stack Architect` },
      { name: "twitter:description", content: PROFILE.headline.en },
      { name: "twitter:image", content: "https://abdalrhman-abdo-alhade.vercel.app/og-image.svg" },
    ],
  }),
  component: PortfolioPage,
});

function PortfolioContent() {
  return (
    <div className="min-h-screen bg-background text-foreground antialiased selection:bg-emerald-500/30 selection:text-emerald-300">
      <Navbar />

      <main id="top">
        <HeroSection />
        <SkillsSection />
        <WorkflowSection />
        <ArchitectureSection />
        <ProjectsSection />
        <SitesSection />
        <ContactSection />
      </main>

      <Footer />
    </div>
  );
}

function PortfolioPage() {
  return (
    <AppProvider>
      <PortfolioContent />
    </AppProvider>
  );
}
