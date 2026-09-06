import React from 'react';
import { Film, Camera, Trophy, HeartHandshake, Clapperboard, Sparkles } from 'lucide-react';

export const PostEventPromotion: React.FC = () => {
  const postPromotions = [
    {
      title: 'Event Highlights Reel',
      desc: 'Cinematic aftermovie and high-energy highlight reels capturing key fashion moments and audience cheers.',
      icon: Film,
      iconColor: 'bg-rose-50 text-rose-600 border-rose-200/70',
      pill: 'bg-rose-50 text-rose-600 border-rose-200/50',
    },
    {
      title: 'Photoshoot & Event Photos',
      desc: 'High-resolution photo galleries made available for press, models, creators, and agency portfolios.',
      icon: Camera,
      iconColor: 'bg-[#6F8E8A]/10 text-[#4C6864] border-[#6F8E8A]/30',
      pill: 'bg-[#6F8E8A]/10 text-[#4C6864] border-[#6F8E8A]/30',
    },
    {
      title: 'Winner / Participant Posts',
      desc: 'Individual recognition features and achievement posts celebrating standout participants and title winners.',
      icon: Trophy,
      iconColor: 'bg-amber-50 text-amber-600 border-amber-200/70',
      pill: 'bg-amber-50 text-amber-700 border-amber-200/50',
    },
    {
      title: 'Sponsor Appreciation Posts',
      desc: 'Co-branded social thank-you posts and performance recaps celebrating our official partners and brands.',
      icon: HeartHandshake,
      iconColor: 'bg-emerald-50 text-emerald-600 border-emerald-200/70',
      pill: 'bg-emerald-50 text-emerald-700 border-emerald-200/50',
    },
    {
      title: 'Behind-the-Scenes Reels',
      desc: 'Uncut backstage footage, hair & makeup preparations, dressing room candid moments, and rehearsals.',
      icon: Clapperboard,
      iconColor: 'bg-purple-50 text-purple-600 border-purple-200/70',
      pill: 'bg-purple-50 text-purple-700 border-purple-200/50',
    },
    {
      title: 'Next Season Promotion',
      desc: 'Exclusive early announcements and season teaser reveals for the next edition of SNAPSHOT Fashion Show.',
      icon: Sparkles,
      iconColor: 'bg-cyan-50 text-cyan-600 border-cyan-200/70',
      pill: 'bg-cyan-50 text-cyan-700 border-cyan-200/50',
    },
  ];

  return (
    <section id="post-event-promotion-section" className="py-16 sm:py-24 px-6 sm:px-12 md:px-16 lg:px-20 w-full border-t border-neutral-200/50">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4 pb-6 border-b border-neutral-200/70">
        <div>
          <h2
            id="post-event-promotion-headline"
            className="font-headline font-bold text-black uppercase tracking-tight"
            style={{ fontSize: '28px' }}
          >
            POST-EVENT PROMOTION
          </h2>
        </div>
        <p className="text-neutral-600 text-sm sm:text-base max-w-md">
          High-impact media delivery, portfolio releases, and digital coverage rolling out post-event.
        </p>
      </div>

      {/* 6 Post-Event Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
        {postPromotions.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="idle-card idle-card-hover rounded-2xl p-6 sm:p-7 flex flex-col justify-between"
            >
              <div>
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center border mb-5 shadow-2xs ${item.iconColor}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-syne font-bold text-lg text-neutral-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-neutral-600 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center justify-between text-xs font-mono">
                <span className={`px-2 py-0.5 rounded-md border font-semibold text-[11px] ${item.pill}`}>
                  Deliverable 0{idx + 1}
                </span>
                <span className="text-neutral-400">Post-27 Sept</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
