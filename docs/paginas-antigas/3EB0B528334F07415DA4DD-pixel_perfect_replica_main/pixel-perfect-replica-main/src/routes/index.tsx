import { createFileRoute } from "@tanstack/react-router";
import { Header, IconSprite } from "@/components/landing/Header";
import { Hero, IconStrip } from "@/components/landing/Hero";
import { VideoSection, Metrics } from "@/components/landing/VideoSection";
import { Testimonials } from "@/components/landing/Testimonials";
import { ProcessSection } from "@/components/landing/ProcessSection";
import { FAQ, FinalCTA, Footer } from "@/components/landing/FAQ";

const DESC =
  "Landing page da Agência Brinde para atrair marmorarias por meio de um sistema de geração de novos orçamentos qualificados.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Brinde | ConstruLead para Marmorarias" },
      { name: "description", content: DESC },
      { property: "og:title", content: "Brinde | ConstruLead para Marmorarias" },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap",
      },
      { rel: "stylesheet", href: "/landing.css" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <IconSprite />
      <Header />
      <main id="top">
        <Hero />
        <IconStrip />
        <VideoSection />
        <Metrics />
        <Testimonials />
        <ProcessSection />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
