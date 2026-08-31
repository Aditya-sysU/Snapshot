import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import {
  Shirt,
  Camera,
  FolderHeart,
  Sparkles,
  Footprints,
  Users,
  ArrowUpRight
} from 'lucide-react';

interface ParticipantShowcaseProps {
  onRegister: () => void;
}

interface ShowcaseItem {
  id: string;
  title: string;
  category: string;
  location: string;
  desc: string;
  tag: string;
  icon: React.ComponentType<{ className?: string }>;
  accentColor: {
    badge: string;
    iconBg: string;
    iconColor: string;
    topBorder: string;
    hoverGlow: string;
  };
}

export const ParticipantShowcase: React.FC<ParticipantShowcaseProps> = ({ onRegister }) => {
  const stickyContainerRef = useRef<HTMLDivElement | null>(null);

  const showcaseItems: ShowcaseItem[] = [
    {
      id: '01',
      title: 'Traditional & Western Outfits',
      category: 'Fashion / Silhouette',
      location: 'Runway Stage 01',
      desc: 'Express your personal fashion sense across ethnic, fusion, couture, and modern western silhouettes with full stage confidence and presence.',
      tag: 'Fashion',
      icon: Shirt,
      accentColor: {
        badge: 'bg-rose-50 text-rose-700 border-rose-200',
        iconBg: 'bg-rose-100/80 text-rose-600',
        iconColor: 'text-rose-600',
        topBorder: 'border-t-rose-500',
        hoverGlow: 'hover:border-rose-300',
      },
    },
    {
      id: '02',
      title: 'Makeup & Photoshoot',
      category: 'Studio / Editorial',
      location: 'Main Light Stage',
      desc: 'Collaborate with professional makeup artists and photographers with studio lighting, camera framing, and high-definition fashion shoots.',
      tag: 'Studio',
      icon: Camera,
      accentColor: {
        badge: 'bg-amber-50 text-amber-800 border-amber-200',
        iconBg: 'bg-amber-100/80 text-amber-700',
        iconColor: 'text-amber-600',
        topBorder: 'border-t-amber-500',
        hoverGlow: 'hover:border-amber-300',
      },
    },
    {
      id: '03',
      title: 'Portfolio Building',
      category: 'Casting / Comp Cards',
      location: 'Archive Lounge',
      desc: 'Curate your official modeling and talent comp cards with high-res editorial deliverables tailored directly for upcoming industry casting.',
      tag: 'Casting',
      icon: FolderHeart,
      accentColor: {
        badge: 'bg-indigo-50 text-indigo-700 border-indigo-200',
        iconBg: 'bg-indigo-100/80 text-indigo-700',
        iconColor: 'text-indigo-600',
        topBorder: 'border-t-indigo-500',
        hoverGlow: 'hover:border-indigo-300',
      },
    },
    {
      id: '04',
      title: 'Modelling Pose & Form',
      category: 'Runway Masterclass',
      location: 'Training Stage',
      desc: 'Master stage posture, body alignment, geometric poses, facial angles, and walking rhythm guided directly by experienced runway mentors.',
      tag: 'Runway',
      icon: Sparkles,
      accentColor: {
        badge: 'bg-purple-50 text-purple-700 border-purple-200',
        iconBg: 'bg-purple-100/80 text-purple-700',
        iconColor: 'text-purple-600',
        topBorder: 'border-t-purple-500',
        hoverGlow: 'hover:border-purple-300',
      },
    },
    {
      id: '05',
      title: 'Ramp Walk Mastery',
      category: 'Spotlight Walk',
      location: 'Grand Catwalk',
      desc: 'Command the central runway spotlight in front of enthusiastic audiences, industry scouts, brand directors, and media cameras.',
      tag: 'Live Stage',
      icon: Footprints,
      accentColor: {
        badge: 'bg-emerald-50 text-emerald-700 border-emerald-200',
        iconBg: 'bg-emerald-100/80 text-emerald-700',
        iconColor: 'text-emerald-600',
        topBorder: 'border-t-emerald-500',
        hoverGlow: 'hover:border-emerald-300',
      },
    },
    {
      id: '06',
      title: 'Networking & Industry Relations',
      category: 'Brand Relations',
      location: 'Creators Lounge',
      desc: 'Build valuable long-term connections with fashion designers, stylists, emerging creators, brand owners, and talent agency representatives.',
      tag: 'Community',
      icon: Users,
      accentColor: {
        badge: 'bg-cyan-50 text-cyan-800 border-cyan-200',
        iconBg: 'bg-cyan-100/80 text-cyan-700',
        iconColor: 'text-cyan-600',
        topBorder: 'border-t-cyan-500',
        hoverGlow: 'hover:border-cyan-300',
      },
    },
  ];

  // Scroll tracking pinned to the sticky container
  // When user reaches the showcase, the section pins in place and horizontally scrolls through all 6 cards
  const { scrollYProgress } = useScroll({
    target: stickyContainerRef,
    offset: ['start start', 'end end'],
  });

  // Calculate the horizontal translate percentage based on 6 cards so each scroll step exposes the next card in full view
  const x = useTransform(scrollYProgress, [0, 0.95], ['0%', '-78%']);

  return (
    <section id="participant-showcase-section" className="relative bg-[#F8F9FA] select-none w-full">
      {/* Tall container providing natural scroll distance to progress through cards step-by-step */}
      <div ref={stickyContainerRef} className="relative h-[320vh] sm:h-[360vh]">
        {/* Sticky Viewport Window */}
        <div className="sticky top-0 h-screen w-full flex flex-col justify-between pt-24 sm:pt-28 pb-10 sm:pb-14 px-6 sm:px-12 md:px-16 lg:px-20 overflow-hidden">
          
          {/* Top Bar: Headline (28px with League Spartan) */}
          <div className="flex items-center justify-between pb-4 border-b border-neutral-200/90 shrink-0">
            <h2
              id="participant-showcase-headline"
              className="font-headline font-bold text-black uppercase tracking-tight"
              style={{ fontSize: '28px' }}
            >
              PARTICIPANT SHOWCASE
            </h2>
          </div>

          {/* Center Stage: Horizontal Card Rail pinned and translating on scroll */}
          <div className="relative w-full my-auto py-4 overflow-visible">
            <motion.div
              style={{ x }}
              className="flex items-stretch gap-6 sm:gap-8 w-max will-change-transform pl-2"
            >
              {showcaseItems.map((item, idx) => {
                const Icon = item.icon;

                return (
                  <motion.div
                    key={item.id}
                    whileHover={{ y: -6 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    className={`w-[320px] sm:w-[400px] md:w-[460px] lg:w-[500px] rounded-2xl bg-white border border-neutral-200/90 p-6 sm:p-8 flex flex-col justify-between shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_18px_45px_rgba(0,0,0,0.08)] ${item.accentColor.hoverGlow} transition-all duration-300 shrink-0 relative overflow-hidden`}
                  >
                    {/* Subtle Top Accent Border */}
                    <div className={`absolute top-0 inset-x-0 h-1 bg-gradient-to-r ${item.accentColor.topBorder === 'border-t-rose-500' ? 'from-rose-500 to-pink-400' : item.accentColor.topBorder === 'border-t-amber-500' ? 'from-amber-500 to-orange-400' : item.accentColor.topBorder === 'border-t-indigo-500' ? 'from-indigo-600 to-blue-400' : item.accentColor.topBorder === 'border-t-purple-500' ? 'from-purple-600 to-fuchsia-400' : item.accentColor.topBorder === 'border-t-emerald-500' ? 'from-emerald-500 to-teal-400' : 'from-cyan-500 to-blue-400'}`} />

                    {/* Top Row: Icon & Location/Track */}
                    <div className="flex items-center justify-between pb-5 border-b border-neutral-100">
                      <div className={`w-11 h-11 rounded-xl ${item.accentColor.iconBg} flex items-center justify-center shadow-2xs`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <span
                        className="font-mono text-neutral-600 font-medium tracking-tight"
                        style={{ fontSize: '16px' }}
                      >
                        {item.location}
                      </span>
                    </div>

                    {/* Middle Content: Title and Description */}
                    <div className="my-6 space-y-3">
                      <h3
                        className="font-syne font-bold text-neutral-900 tracking-tight leading-snug"
                        style={{ fontSize: '20px' }}
                      >
                        {item.title}
                      </h3>
                      <p
                        className="text-neutral-600 leading-relaxed font-normal"
                        style={{ fontSize: '16px' }}
                      >
                        {item.desc}
                      </p>
                    </div>

                    {/* Bottom Row: Category with colored badge & Track ID */}
                    <div className="flex items-center justify-between pt-5 border-t border-neutral-100">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-mono font-semibold uppercase tracking-wider border ${item.accentColor.badge}`}
                      >
                        {item.category}
                      </span>
                      <span
                        className="font-mono text-neutral-400 font-bold"
                        style={{ fontSize: '16px' }}
                      >
                        {item.id}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
