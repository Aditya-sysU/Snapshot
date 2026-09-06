import React, { useState, useEffect } from 'react';
import { SnapshotLogo } from './SnapshotLogo';
import { Ticket, Calendar, Info, Menu, X, ArrowUpRight } from 'lucide-react';

interface HeaderProps {
  currentPage: 'home' | 'about' | 'tickets';
  onNavigateHome: () => void;
  onNavigateAbout: () => void;
  onNavigateTickets: () => void;
  onNavigateSchedule: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPage,
  onNavigateHome,
  onNavigateAbout,
  onNavigateTickets,
  onNavigateSchedule,
}) => {
  const [isPastHero, setIsPastHero] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const heroElement = document.getElementById('hero-section');
      if (heroElement) {
        const rect = heroElement.getBoundingClientRect();
        // Header height + padding is ~75px. When hero bottom reaches navbar level, it has passed
        setIsPastHero(rect.bottom <= 75);
      } else {
        setIsPastHero(window.scrollY > 40);
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [currentPage]);

  const handleHomeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onNavigateHome();
    setMobileMenuOpen(false);
  };

  const handleAboutClick = () => {
    onNavigateAbout();
    setMobileMenuOpen(false);
  };

  const handleTicketsClick = () => {
    onNavigateTickets();
    setMobileMenuOpen(false);
  };

  const handleScheduleClick = () => {
    onNavigateSchedule();
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4 sm:pt-6 pointer-events-none">
      <div
        id="navbar-container"
        className={`w-full max-w-5xl pointer-events-auto rounded-2xl sm:rounded-full transition-all duration-300 py-2.5 px-4 sm:px-6 ${
          isPastHero
            ? 'bg-black/95 backdrop-blur-md shadow-2xl shadow-black/70 border border-neutral-800 ring-1 ring-white/15 text-white scale-[0.99]'
            : 'bg-white/95 backdrop-blur-md shadow-xl shadow-black/8 border border-neutral-200/90 ring-1 ring-black/5 text-neutral-900 scale-100'
        }`}
      >
        <div className="flex items-center justify-between gap-2 sm:gap-6">
          {/* Brand Logo */}
          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
            <a
              href="#home"
              onClick={handleHomeClick}
              className="flex items-center gap-2 group cursor-pointer"
              id="header-brand-logo"
            >
              <SnapshotLogo size={36} color={isPastHero ? '#FFFFFF' : '#000000'} strokeWidth={2} />
              <span className={`font-brand font-black text-sm sm:text-base tracking-widest uppercase transition-colors ${
                isPastHero ? 'text-white' : 'text-neutral-950'
              }`}>
                SNAPSHOT
              </span>
            </a>
          </div>

          {/* Desktop Navigation Links: About Us and Schedule */}
          <nav className="hidden md:flex items-center gap-4 lg:gap-6 text-sm font-medium">
            <button
              id="nav-link-about"
              onClick={handleAboutClick}
              className={`transition-colors flex items-center gap-1.5 cursor-pointer py-1 px-3.5 rounded-full text-sm font-medium ${
                currentPage === 'about'
                  ? isPastHero
                    ? 'bg-white/20 text-white font-bold'
                    : 'bg-neutral-900 text-white font-bold'
                  : isPastHero
                  ? 'text-neutral-300 hover:text-white hover:bg-white/10'
                  : 'text-neutral-700 hover:text-black hover:bg-neutral-100'
              }`}
            >
              About Us
            </button>

            <button
              id="nav-link-schedule"
              onClick={handleScheduleClick}
              className={`transition-colors flex items-center gap-1.5 cursor-pointer py-1 px-3.5 rounded-full text-sm font-medium ${
                isPastHero
                  ? 'text-neutral-300 hover:text-white hover:bg-white/10'
                  : 'text-neutral-700 hover:text-black hover:bg-neutral-100'
              }`}
            >
              Schedule
            </button>
          </nav>

          {/* Right Action: Pill Button for dedicated Registration page */}
          <div className="flex items-center gap-2">
            <button
              id="header-registration-cta-btn"
              onClick={handleTicketsClick}
              className={`text-xs sm:text-sm font-bold px-4 sm:px-5 py-2 sm:py-2.5 rounded-full transition-all duration-200 shadow-sm hover:shadow-md hover:scale-[1.02] active:scale-[0.98] flex items-center gap-1.5 cursor-pointer shrink-0 ${
                isPastHero
                  ? 'bg-white text-black hover:bg-neutral-200 ring-1 ring-white/20'
                  : 'bg-neutral-950 text-white hover:bg-neutral-800 ring-1 ring-black/10'
              }`}
            >
              <span>Registration</span>
              <Ticket className={`w-3.5 h-3.5 ${isPastHero ? 'text-black' : 'text-white'}`} />
            </button>

            {/* Mobile Menu Toggle */}
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`md:hidden p-2 rounded-lg transition-colors cursor-pointer ${
                isPastHero ? 'text-white hover:bg-neutral-800' : 'text-neutral-900 hover:bg-neutral-100'
              }`}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className={`w-5 h-5 ${isPastHero ? 'text-white' : 'text-neutral-900'}`} />
              ) : (
                <Menu className={`w-5 h-5 ${isPastHero ? 'text-white' : 'text-neutral-900'}`} />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className={`md:hidden pt-3 pb-2 mt-2 border-t flex flex-col gap-2 animate-in fade-in duration-200 ${
            isPastHero ? 'border-neutral-800 text-white' : 'border-neutral-200 text-neutral-900'
          }`}>
            <button
              id="mobile-nav-home"
              onClick={handleHomeClick}
              className={`flex items-center justify-between py-2 px-3 rounded-lg text-sm font-medium ${
                currentPage === 'home'
                  ? isPastHero ? 'bg-white/20 font-bold text-white' : 'bg-neutral-900 font-bold text-white'
                  : isPastHero ? 'text-neutral-300 hover:bg-neutral-900 hover:text-white' : 'text-neutral-700 hover:bg-neutral-100 hover:text-black'
              }`}
            >
              <span>Home</span>
              <ArrowUpRight className={`w-3.5 h-3.5 ${isPastHero ? 'text-white/60' : 'text-neutral-400'}`} />
            </button>

            <button
              id="mobile-nav-about"
              onClick={handleAboutClick}
              className={`flex items-center justify-between py-2 px-3 rounded-lg text-sm font-medium ${
                currentPage === 'about'
                  ? isPastHero ? 'bg-white/20 font-bold text-white' : 'bg-neutral-900 font-bold text-white'
                  : isPastHero ? 'text-neutral-300 hover:bg-neutral-900 hover:text-white' : 'text-neutral-700 hover:bg-neutral-100 hover:text-black'
              }`}
            >
              <span className="flex items-center gap-2">
                <Info className={`w-4 h-4 ${isPastHero ? 'text-white/80' : 'text-neutral-500'}`} /> About Us
              </span>
              <ArrowUpRight className={`w-3.5 h-3.5 ${isPastHero ? 'text-white/60' : 'text-neutral-400'}`} />
            </button>

            <button
              id="mobile-nav-schedule"
              onClick={handleScheduleClick}
              className={`flex items-center justify-between py-2 px-3 rounded-lg text-sm font-medium ${
                isPastHero ? 'text-neutral-300 hover:bg-neutral-900 hover:text-white' : 'text-neutral-700 hover:bg-neutral-100 hover:text-black'
              }`}
            >
              <span className="flex items-center gap-2">
                <Calendar className={`w-4 h-4 ${isPastHero ? 'text-white/80' : 'text-neutral-500'}`} /> Schedule & Auditions
              </span>
              <ArrowUpRight className={`w-3.5 h-3.5 ${isPastHero ? 'text-white/60' : 'text-neutral-400'}`} />
            </button>

            <button
              id="mobile-nav-registration"
              onClick={handleTicketsClick}
              className={`flex items-center justify-between py-2 px-3 rounded-lg text-sm font-bold ${
                isPastHero ? 'bg-white text-black' : 'bg-neutral-950 text-white'
              }`}
            >
              <span className="flex items-center gap-2">
                <Ticket className="w-4 h-4" /> Registration
              </span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    </header>
  );
};
