'use client';

import { Header } from './Header';
import { Hero } from './Hero';
import { ProblemSection } from './ProblemSection';
import { ConstruLeadProcess } from './ConstruLeadProcess';
import { CaseSection } from './CaseSection';
import { QualificationFormSection } from './QualificationFormSection';
import { QualificationProfile } from './QualificationProfile';
import { HowItWorks } from './HowItWorks';
import { FAQ } from './FAQ';
import { FinalCTA } from './FinalCTA';
import { Footer } from './Footer';
import { scrollToQualificationForm } from './qualification';

export function Brinde04Landing() {
  const openModal = scrollToQualificationForm;

  return (
    <div className="brinde04-root min-h-screen bg-background">
      <Header onOpenModal={openModal} />
      <main>
        <Hero onOpenModal={openModal} />
        <ProblemSection />
        <ConstruLeadProcess />
        <CaseSection />
        <QualificationFormSection />
        <QualificationProfile />
        <HowItWorks onOpenModal={openModal} />
        <FAQ />
        <FinalCTA onOpenModal={openModal} />
      </main>
      <Footer />
    </div>
  );
}
