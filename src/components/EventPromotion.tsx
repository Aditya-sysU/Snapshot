import React from 'react';
import { Instagram, Video, Image, Megaphone, Users, Timer, Bell } from 'lucide-react';

export const EventPromotion: React.FC = () => {
  const promoPhases = [
    {
      title: 'Instagram Promotion',
      desc: 'Dedicated social media rollouts spotlighting models, designers, and creative concepts across official channels.',
      icon: Instagram,
      accent: 'bg-rose-50 text-rose-600 border-rose-200/80',
      pill: 'text-rose-600 bg-rose-50 border-rose-200/60',
    },
    {
      title: 'Reels & Promotional Videos',
      desc: 'High-production short-form video teasers, talent spotlights, and runway hype cuts.',
      icon: Video,
      accent: 'bg-red-50 text-red-600 border-red-200/80',
      pill: 'text-red-600 bg-red-50 border-red-200/60',
    },
    {
      title: 'Official Posters',
      desc: 'Digital and printed poster campaigns placed across key partner venues and cultural hubs.',
      icon: Image,
      accent: 'bg-indigo-50 text-indigo-600 border-indigo-200/80',
      pill: 'text-indigo-600 bg-indigo-50 border-indigo-200/60',
    },
    {
      title: 'Sponsor Promotion',
      desc: 'Brand integrations, partner logo highlights, and collaborative product announcements.',
      icon: Megaphone,
      accent: 'bg-amber-50 text-amber-600 border-amber-200/80',
      pill: 'text-amber-700 bg-amber-50 border-amber-200/60',
    },
    {
      title: 'Contestant / Group Promotion',
      desc: 'Personal feature cards and squad reveal stories celebrating every selected participant.',
      icon: Users,
      accent: 'bg-emerald-50 text-emerald-600 border-emerald-200/80',
      pill: 'text-emerald-700 bg-emerald-50 border-emerald-200/60',
    },
    {
      title: 'Event Countdown',
      desc: 'Daily countdown updates leading up to the grand 27 September main event at 12 PM.',
      icon: Timer,
      accent: 'bg-purple-50 text-purple-600 border-purple-200/80',
      pill: 'text-purple-700 bg-purple-50 border-purple-200/60',
    },
    {
      title: 'Final Event Announcement',
      desc: 'Full reveal of the main runway lineup, schedule details, celebrity guests, and opening acts.',
      icon: Bell,
      accent: 'bg-neutral-900 text-amber-400 border-neutral-800 shadow-md',
      pill: 'text-amber-600 bg-amber-50 border-amber-200/60',
    },
  ];

  return (
    <section id="event-promotion-section" className="py-16 sm:py-24 px-6 sm:px-12 md:px-16 lg:px-20 w-full border-t border-neutral-200/50">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4 pb-6 border-b border-neutral-200/70">
        <div>
          <h2
            id="event-promotion-headline"
            className="font-headline font-bold text-black uppercase tracking-tight"
            style={{ fontSize: '28px' }}
          >
            EVENT PROMOTION
          </h2>
        </div>
        <p className="text-neutral-600 text-sm sm:text-base max-w-md">
          Structured digital rollouts and social media blitz initiated immediately after the auditions.
        </p>
      </div>

      {/* Grid of Promotional Activities */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {promoPhases.map((phase, idx) => {
          const Icon = phase.icon;
          return (
            <div
              key={idx}
              className={`idle-card idle-card-hover rounded-2xl p-6 flex flex-col justify-between ${
                idx === promoPhases.length - 1 ? 'sm:col-span-2 lg:col-span-3 xl:col-span-2 bg-gradient-to-br from-white via-amber-50/20 to-neutral-50 border-amber-200/60' : ''
              }`}
            >
              <div>
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center border mb-4 shadow-2xs ${phase.accent}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-syne font-bold text-lg text-neutral-900 mb-2">
                  {phase.title}
                </h3>
                <p className="text-neutral-600 text-sm leading-relaxed">
                  {phase.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center justify-between text-xs font-mono">
                <span className={`px-2 py-0.5 rounded-md border text-[11px] font-semibold ${phase.pill}`}>
                  Phase 0{idx + 1}
                </span>
                <span className="text-neutral-400">Post-Auditions</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
