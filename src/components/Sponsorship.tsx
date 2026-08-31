import React from 'react';
import { MessageSquare, ArrowRight } from 'lucide-react';
import {
  StylishFashionStudioCard,
  KamjuCreativesCard,
  TheChourasiyasCard,
} from './SponsorLogos';

interface SponsorshipProps {
  onOpenSponsorModal: () => void;
}

export const Sponsorship: React.FC<SponsorshipProps> = ({ onOpenSponsorModal }) => {
  return (
    <section id="sponsorship-section" className="py-16 sm:py-24 px-6 sm:px-12 md:px-16 lg:px-20 w-full border-t border-neutral-200/50">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4 pb-6 border-b border-neutral-200/70">
        <div>
          <h2
            id="sponsorship-headline"
            className="font-headline font-bold text-black uppercase tracking-tight"
            style={{ fontSize: '28px' }}
          >
            OUR PROUD SPONSORS
          </h2>
        </div>
        <p className="text-neutral-600 text-sm sm:text-base max-w-md">
          Proudly supported by visionary brands powering SNAPSHOT Fashion Show Season 2.
        </p>
      </div>

      {/* 3 Sponsor Logos Side by Side in Equal Card Sizes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 items-stretch">
        <StylishFashionStudioCard />
        <KamjuCreativesCard />
        <TheChourasiyasCard />
      </div>

      {/* Deep Black Sponsoring CTA Card with Luxury Accent Glows */}
      <div className="bg-[#0A0D14] border border-neutral-800 text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-2xl">
        {/* Subtle luxury ambient glows */}
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-gradient-to-br from-indigo-500/20 to-purple-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-gradient-to-tr from-amber-500/15 to-rose-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-xs font-mono font-medium text-amber-300 mb-1">
              <span>Partnership Opportunities</span>
            </div>
            <h3 className="font-syne font-bold text-2xl sm:text-3xl md:text-4xl text-white tracking-tight leading-snug">
              Interested in Sponsoring S² Stage Era?
            </h3>
            <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
              Interested brands can contact us through DM for custom sponsorship packages, booth spaces, and title partnership opportunities.
            </p>
          </div>

          <button
            id="btn-sponsor-contact-dm"
            onClick={onOpenSponsorModal}
            className="bg-gradient-to-r from-amber-400 to-amber-300 hover:from-amber-300 hover:to-amber-200 text-neutral-950 text-sm font-bold px-8 py-4 rounded-full transition-all duration-200 shadow-[0_4px_20px_rgba(245,158,11,0.25)] hover:scale-105 flex items-center gap-2.5 cursor-pointer shrink-0"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Contact Us via DM</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </button>
        </div>
      </div>
    </section>
  );
};

