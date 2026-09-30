import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { ProblemSection } from "@/components/ProblemSection";
import { ConstruLeadProcess } from "@/components/ConstruLeadProcess";
import { CaseSection } from "@/components/CaseSection";
import { QualificationProfile } from "@/components/QualificationProfile";
import { HowItWorks } from "@/components/HowItWorks";
import { FAQ } from "@/components/FAQ";
import { FinalCTA } from "@/components/FinalCTA";
import { Footer } from "@/components/Footer";
import { QualificationModal } from "@/components/QualificationModal";

const TITLE = "ConstruLead para Marmorarias | Agência Brinde";
const DESCRIPTION =
  "Estrutura de geração de novos pedidos de orçamento para marmorarias que já faturam e têm capacidade para crescer. Agende seu diagnóstico gratuito.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [modalOpen, setModalOpen] = useState(false);
  const openModal = () => setModalOpen(true);

  return (
    <div className="min-h-screen bg-background">
      <Header onOpenModal={openModal} />
      <main>
        <Hero onOpenModal={openModal} />
        <ProblemSection />
        <ConstruLeadProcess />
        <CaseSection />
        <QualificationProfile />
        <HowItWorks onOpenModal={openModal} />
        <FAQ />
        <FinalCTA onOpenModal={openModal} />
      </main>
      <Footer />
      <QualificationModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
