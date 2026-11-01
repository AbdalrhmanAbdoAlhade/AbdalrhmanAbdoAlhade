import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppProvider } from "@/lib/app-context";
import { Navbar } from "@/components/portfolio/Navbar";
import { HeroSection } from "@/components/portfolio/HeroSection";
import { SkillsSection } from "@/components/portfolio/SkillsSection";
import { ProjectsSection } from "@/components/portfolio/ProjectsSection";
import { WorkflowSection } from "@/components/portfolio/WorkflowSection";
import { ArchitectureSection } from "@/components/portfolio/ArchitectureSection";
import { SitesSection } from "@/components/portfolio/SitesSection";
import { ContactSection, Footer } from "@/components/portfolio/ContactSection";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000,
    },
  },
});

function PortfolioContent() {
  return (
    <div className="min-h-screen bg-background text-foreground antialiased selection:bg-emerald-500/30 selection:text-emerald-300">
      <Navbar />
      <main id="top">
        <HeroSection />
        <SkillsSection />
        {/* المشاريع والمنصات المنفذة مباشرة تحت اللغات وأطر العمل الرئيسية */}
        <ProjectsSection />
        <WorkflowSection />
        <ArchitectureSection />
        <SitesSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <PortfolioContent />
      </AppProvider>
    </QueryClientProvider>
  );
}
