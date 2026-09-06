import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ParticipantShowcase } from './components/ParticipantShowcase';
import { EventPromotion } from './components/EventPromotion';
import { Sponsorship } from './components/Sponsorship';
import { MainShow } from './components/MainShow';
import { PostEventPromotion } from './components/PostEventPromotion';
import { Footer } from './components/Footer';
import { SponsorModal } from './components/SponsorModal';
import { AboutPage } from './pages/AboutPage';
import { TicketsPage } from './pages/TicketsPage';
import { AnimatePresence, motion } from 'motion/react';

type Page = 'home' | 'about' | 'registration' | 'tickets';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>(() => {
    const hash = window.location.hash.replace('#', '').toLowerCase();
    if (hash === 'about') return 'about';
    if (hash === 'registration' || hash === 'tickets') return 'registration';
    return 'home';
  });

  const [sponsorModalOpen, setSponsorModalOpen] = useState(false);

  // Sync hash changes with browser navigation
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      if (hash === 'about') {
        setCurrentPage('about');
      } else if (hash === 'registration' || hash === 'tickets') {
        setCurrentPage('registration');
      } else {
        setCurrentPage('home');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (page: Page, targetSectionId?: string) => {
    const targetPage = page === 'tickets' ? 'registration' : page;
    setCurrentPage(targetPage);
    window.location.hash = targetPage === 'home' ? '' : targetPage;

    if (targetPage === 'home' && targetSectionId) {
      setTimeout(() => {
        const el = document.getElementById(targetSectionId);
        if (el) {
          const yOffset = -90;
          const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const scrollToSchedule = () => {
    if (currentPage !== 'home') {
      navigateTo('home', 'main-show-section');
    } else {
      const el = document.getElementById('main-show-section');
      if (el) {
        const yOffset = -90;
        const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#111111] font-sans antialiased selection:bg-black selection:text-white flex flex-col justify-between">
      {/* Floating Header with Active Navigation State */}
      <Header
        currentPage={currentPage}
        onNavigateHome={() => navigateTo('home')}
        onNavigateAbout={() => navigateTo('about')}
        onNavigateTickets={() => navigateTo('tickets')}
        onNavigateSchedule={scrollToSchedule}
      />

      {/* Main Content with Smooth Page Routing Animations */}
      <main className="flex-1">
        <AnimatePresence mode="wait">
          {currentPage === 'home' && (
            <motion.div
              key="home-page"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* 1. Hero Section */}
              <Hero
                onOpenTickets={() => navigateTo('tickets')}
                onOpenSchedule={scrollToSchedule}
              />

              {/* 2. Participant Showcase (Register CTA navigates to Tickets Page) */}
              <ParticipantShowcase
                onRegister={() => navigateTo('tickets')}
              />

              {/* 3. Event Promotion & Highlights */}
              <EventPromotion />

              {/* 4. Sponsorship & Brand Partnerships */}
              <Sponsorship
                onOpenSponsorModal={() => setSponsorModalOpen(true)}
              />

              {/* 5. Main Show & Auditions Schedule */}
              <MainShow />

              {/* 6. Post Event Promotion */}
              <PostEventPromotion />
            </motion.div>
          )}

          {currentPage === 'about' && (
            <motion.div
              key="about-page"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
            >
              <AboutPage
                onNavigateHome={() => navigateTo('home')}
                onNavigateTickets={() => navigateTo('tickets')}
              />
            </motion.div>
          )}

          {(currentPage === 'registration' || currentPage === 'tickets') && (
            <motion.div
              key="registration-page"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
            >
              <TicketsPage
                onNavigateHome={() => navigateTo('home')}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Deep Black Footer with Icon-Only Contacts */}
      <Footer />

      {/* Interactive Sponsor Inquiry Modal */}
      <SponsorModal
        isOpen={sponsorModalOpen}
        onClose={() => setSponsorModalOpen(false)}
      />
    </div>
  );
}
