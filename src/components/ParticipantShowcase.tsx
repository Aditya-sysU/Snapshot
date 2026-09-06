import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import {
  Shirt,
  Camera,
  FolderHeart,
  Sparkles,
  Footprints,
  Users,
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
    },
    {
      id: '02',
      title: 'Makeup & Photoshoot',
      category: 'Studio / Editorial',
      location: 'Main Light Stage',
      desc: 'Collaborate with professional makeup artists and photographers with studio lighting, camera framing, and high-definition fashion shoots.',
      tag: 'Studio',
      icon: Camera,
    },
    {
      id: '03',
      title: 'Portfolio Building',
      category: 'Casting / Comp Cards',
      location: 'Archive Lounge',
      desc: 'Curate your official modeling and talent comp cards with high-res editorial deliverables tailored directly for upcoming industry casting.',
      tag: 'Casting',
      icon: FolderHeart,
    },
    {
      id: '04',
      title: 'Modelling Pose & Form',
      category: 'Runway Masterclass',
      location: 'Training Stage',
      desc: 'Master stage posture, body alignment, geometric poses, facial angles, and walking rhythm guided directly by experienced runway mentors.',
      tag: 'Runway',
      icon: Sparkles,
    },
    {
      id: '05',
      title: 'Ramp Walk Mastery',
      category: 'Spotlight Walk',
      location: 'Grand Catwalk',
      desc: 'Command the central runway spotlight in front of enthusiastic audiences, industry scouts, brand directors, and media cameras.',
      tag: 'Live Stage',
      icon: Footprints,
    },
    {
      id: '06',
      title: 'Networking & Industry Relations',
      category: 'Brand Relations',
      location: 'Creators Lounge',
      desc: 'Build valuable long-term connections with fashion designers, stylists, emerging creators, brand owners, and talent agency representatives.',
      tag: 'Community',
      icon: Users,
    },
  ];

  const [maxTranslateX, setMaxTranslateX] = useState(0);
  const trackRef = useRef<HTMLDivElement | null>(null);

  // Measure exact horizontal distance needed so card 6 is 100% visible with margin on all devices
  useEffect(() => {
    const updateDistance = () => {
      if (trackRef.current) {
        const scrollWidth = trackRef.current.scrollWidth;
        const clientWidth = window.innerWidth;
        // On mobile, give 24px right gutter so the 6th card is centered and fully visible
        const endPadding = window.innerWidth < 640 ? 32 : 80;
        const distance = Math.max(0, scrollWidth - clientWidth + endPadding);
        setMaxTranslateX(distance);
      }
    };

    updateDistance();
    const timer1 = setTimeout(updateDistance, 100);
    const timer2 = setTimeout(updateDistance, 500);
    window.addEventListener('resize', updateDistance);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      window.removeEventListener('resize', updateDistance);
    };
  }, []);

  // Scroll tracking pinned to the sticky container
  const { scrollYProgress } = useScroll({
    target: stickyContainerRef,
    offset: ['start start', 'end end'],
  });

  // Calculate translation: reaches full 6th card at 88% scroll progress, then stays resting till 100%
  const x = useTransform(
    scrollYProgress,
    [0, 0.88, 1],
    [0, -maxTranslateX, -maxTranslateX]
  );

  return (
    <section id="participant-showcase-section" className="relative bg-[#F8F9FA] select-none w-full">
      {/* Tall container providing natural scroll distance to progress through cards step-by-step */}
      <div ref={stickyContainerRef} className="relative h-[380vh] sm:h-[360vh]">
        {/* Sticky Viewport Window - Zero extra top margin/padding on mobile to seamlessly attach to Hero */}
        <div className="sticky top-0 h-screen w-full flex flex-col justify-between pt-2 sm:pt-28 pb-4 sm:pb-14 px-3 sm:px-12 md:px-16 lg:px-20 overflow-hidden">
          
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
              ref={trackRef}
              style={{ x }}
              className="flex items-stretch gap-4 sm:gap-8 w-max will-change-transform pl-1 sm:pl-2 pr-6 sm:pr-12"
            >
              {showcaseItems.map((item, idx) => {
                const Icon = item.icon;

                return (
                  <motion.div
                    key={item.id}
                    whileHover={{ y: -6 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    className="w-[85vw] max-w-[340px] sm:w-[400px] md:w-[460px] lg:w-[500px] rounded-2xl bg-white border border-neutral-200/90 p-5 sm:p-8 flex flex-col justify-between shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(111,142,138,0.2)] hover:border-[#6F8E8A] transition-all duration-300 shrink-0 relative overflow-hidden group"
                  >
                    {/* Top Accent Border - Sage Green Palette */}
                    <div className="absolute top-0 inset-x-0 h-1 bg-[#6F8E8A]" />

                    {/* Top Row: Icon & Location/Track */}
                    <div className="flex items-center justify-between pb-5 border-b border-neutral-100">
                      <div className="w-11 h-11 rounded-xl bg-[#6F8E8A]/10 text-[#6F8E8A] group-hover:bg-[#6F8E8A] group-hover:text-white flex items-center justify-center shadow-2xs transition-colors duration-300">
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
                        className="font-syne font-bold text-neutral-900 group-hover:text-[#6F8E8A] transition-colors tracking-tight leading-snug"
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

                    {/* Bottom Row: Category with sage green badge & Track ID */}
                    <div className="flex items-center justify-between pt-5 border-t border-neutral-100">
                      <span
                        className="inline-flex items-center px-3 py-1 rounded-full text-xs font-mono font-semibold uppercase tracking-wider border bg-[#6F8E8A]/10 text-[#4C6864] border-[#6F8E8A]/30"
                      >
                        {item.category}
                      </span>
                      <span
                        className="font-mono text-neutral-400 group-hover:text-[#6F8E8A] transition-colors font-bold"
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
