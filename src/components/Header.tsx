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
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
        className={`w-full max-w-5xl pointer-events-auto rounded-2xl sm:rounded-full transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-lg shadow-black/5 border border-neutral-200/80 py-2.5 px-4 sm:px-6'
            : 'bg-white/90 backdrop-blur-sm shadow-md shadow-black/3 border border-neutral-200/60 py-3 px-4 sm:px-6'
        }`}
      >
        <div className="flex items-center justify-between gap-2 sm:gap-6">
          {/* Brand Logo */}
          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
            <a
              href="#home"
              onClick={handleHomeClick}
              className="flex items-center gap-2 group"
              id="header-brand-logo"
            >
              <SnapshotLogo size={36} color="#111111" strokeWidth={2} />
              <span className="font-brand font-black text-sm sm:text-base tracking-widest text-black uppercase">
                SNAPSHOT
              </span>
            </a>
          </div>

          {/* Desktop Navigation Links: About Us and Schedule */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            <button
              id="nav-link-about"
              onClick={handleAboutClick}
              className={`transition-colors flex items-center gap-1.5 cursor-pointer py-1 ${
                currentPage === 'about'
                  ? 'text-black font-bold'
                  : 'text-neutral-600 hover:text-black'
              }`}
            >
              About Us
            </button>

            <button
              id="nav-link-schedule"
              onClick={handleScheduleClick}
              className="text-neutral-600 hover:text-black transition-colors flex items-center gap-1.5 cursor-pointer py-1"
            >
              Schedule
            </button>
          </nav>

          {/* Right Action: Solid Black Pill Button for dedicated Tickets page */}
          <div className="flex items-center gap-2">
            <button
              id="header-tickets-cta-btn"
              onClick={handleTicketsClick}
              className={`text-xs sm:text-sm font-semibold px-4 sm:px-5 py-2 sm:py-2.5 rounded-full transition-all duration-200 shadow-sm hover:shadow hover:scale-[1.02] active:scale-[0.98] flex items-center gap-1.5 cursor-pointer shrink-0 ${
                currentPage === 'tickets'
                  ? 'bg-neutral-900 ring-2 ring-neutral-400 text-white'
                  : 'bg-black hover:bg-neutral-800 text-white'
              }`}
            >
              <span>Tickets</span>
              <Ticket className="w-3.5 h-3.5 text-neutral-300" />
            </button>

            {/* Mobile Menu Toggle */}
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-neutral-700 hover:text-black rounded-lg transition-colors cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pt-3 pb-2 mt-2 border-t border-neutral-100 flex flex-col gap-2 animate-in fade-in duration-200">
            <button
              id="mobile-nav-home"
              onClick={handleHomeClick}
              className={`flex items-center justify-between py-2 px-3 rounded-lg text-sm font-medium ${
                currentPage === 'home' ? 'bg-neutral-100 font-bold text-black' : 'text-neutral-700 hover:bg-neutral-100/70'
              }`}
            >
              <span>Home</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400" />
            </button>

            <button
              id="mobile-nav-about"
              onClick={handleAboutClick}
              className={`flex items-center justify-between py-2 px-3 rounded-lg text-sm font-medium ${
                currentPage === 'about' ? 'bg-neutral-100 font-bold text-black' : 'text-neutral-700 hover:bg-neutral-100/70'
              }`}
            >
              <span className="flex items-center gap-2">
                <Info className="w-4 h-4 text-neutral-500" /> About Us
              </span>
              <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400" />
            </button>

            <button
              id="mobile-nav-schedule"
              onClick={handleScheduleClick}
              className="flex items-center justify-between py-2 px-3 rounded-lg text-sm font-medium text-neutral-700 hover:bg-neutral-100/70"
            >
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-neutral-500" /> Schedule & Auditions
              </span>
              <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400" />
            </button>

            <button
              id="mobile-nav-tickets"
              onClick={handleTicketsClick}
              className={`flex items-center justify-between py-2 px-3 rounded-lg text-sm font-medium ${
                currentPage === 'tickets' ? 'bg-neutral-100 font-bold text-black' : 'text-neutral-700 hover:bg-neutral-100/70'
              }`}
            >
              <span className="flex items-center gap-2">
                <Ticket className="w-4 h-4 text-neutral-500" /> Passes & Registration
              </span>
              <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400" />
            </button>
          </div>
        )}
      </div>
    </header>
  );
};
