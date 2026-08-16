import { useState } from 'react';
import { Navbar } from './components/common/Navbar';
import { Hero } from './components/features/Hero';
import { Properties } from './components/features/Properties';
import { GalleryLightbox } from './components/features/GalleryLightbox';
import { Amenities } from './components/features/Amenities';
import { LocationSection } from './components/features/LocationSection';
import { LegalDocSection } from './components/features/LegalDocSection';
import { Testimonials } from './components/features/Testimonials';
import { FAQSection } from './components/features/FAQSection';
import { ContactForm } from './components/features/ContactForm';
import { MarketingPosters } from './components/features/MarketingPosters';
import { ShareablePoster } from './components/features/ShareablePoster';
import { FurnitureIncluded } from './components/features/FurnitureIncluded';
import { Footer } from './components/common/Footer';
import { FloatingActions } from './components/common/FloatingActions';
import { BookSiteVisitModal } from './components/features/BookSiteVisitModal';
import { EmiCalculatorModal } from './components/features/EmiCalculatorModal';
import { AdminLeadsModal } from './components/features/AdminLeadsModal';
import { Toast } from './components/common/Toast';
import { AIAssistant } from './components/features/AIAssistant';
import { PromotionalBanner } from './components/features/PromotionalBanner';

export function App() {
  const [isBookVisitOpen, setIsBookVisitOpen] = useState(false);
  const [isEmiOpen, setIsEmiOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  return (
    <div className="min-h-screen bg-navy-950 text-slate-100 selection:bg-gold-500 selection:text-navy-950 font-sans">
      <PromotionalBanner />
      <Navbar onOpenBookVisit={() => setIsBookVisitOpen(true)} />
      <main>
        <Hero onOpenBookVisit={() => setIsBookVisitOpen(true)} onOpenEmi={() => setIsEmiOpen(true)} />
        <Properties onOpenBookVisit={() => setIsBookVisitOpen(true)} onOpenEmi={() => setIsEmiOpen(true)} />
        <FurnitureIncluded />
        <GalleryLightbox />
        <Amenities />
        <LocationSection />
        <LegalDocSection />
        <Testimonials />
        <FAQSection />
        <ContactForm onShowToast={showToast} />
        <MarketingPosters onShowToast={showToast} />
        <ShareablePoster />
      </main>
      <Footer onOpenAdmin={() => setIsAdminOpen(true)} />
      <FloatingActions onOpenBookVisit={() => setIsBookVisitOpen(true)} />
      <BookSiteVisitModal isOpen={isBookVisitOpen} onClose={() => setIsBookVisitOpen(false)} onShowToast={showToast} />
      <EmiCalculatorModal isOpen={isEmiOpen} onClose={() => setIsEmiOpen(false)} />
      <AdminLeadsModal isOpen={isAdminOpen} onClose={() => setIsAdminOpen(false)} onShowToast={showToast} />
      <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
      <AIAssistant />
    </div>
  );
}

export default App;
