import React, { useState } from 'react';
import { motion } from 'motion/react';

interface HeroProps {
  onOpenTickets?: () => void;
  onOpenSchedule?: () => void;
}

export const Hero: React.FC<HeroProps> = () => {
  const [leftSrc, setLeftSrc] = useState('/assets/hero-left-nobg.png');
  const [rightSrc, setRightSrc] = useState('/assets/hero-right-nobg.png');

  const words = ['A', 'stage', 'for', 'new', 'beginning'];

  return (
    <section
      id="hero-section"
      className="relative w-full h-[65vh] min-h-[460px] sm:h-[75vh] sm:min-h-[580px] md:h-[82vh] md:min-h-[660px] lg:h-[88vh] lg:min-h-[740px] flex items-center justify-between overflow-hidden px-1 sm:px-3 md:px-6 lg:px-8 mb-0"
    >
      {/* 1. Atmospheric Runway Ambient Backdrop */}
      <div className="absolute inset-0 w-full h-full bg-[#FAF6F2] overflow-hidden -z-20">
        <div className="absolute inset-0 bg-gradient-to-br from-[#FFF5EE] via-[#FAF6F2] to-[#F1F6FE]" />

        {/* Ambient runway lighting glow */}
        <motion.div
          animate={{
            x: [-25, 35, -25],
            y: [-15, 25, -15],
            scale: [1, 1.12, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute -top-28 -left-20 w-[500px] sm:w-[700px] h-[500px] sm:h-[700px] rounded-full bg-gradient-to-tr from-[#FFD7C9]/45 via-[#F7D3FD]/35 to-[#C8DFFE]/45 blur-[120px] pointer-events-none"
        />

        <motion.div
          animate={{
            x: [25, -35, 25],
            y: [20, -20, 20],
            scale: [1.1, 0.95, 1.1],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute -bottom-28 -right-20 w-[500px] sm:w-[700px] h-[500px] sm:h-[700px] rounded-full bg-gradient-to-bl from-[#CCE0FF]/45 via-[#E8DCFE]/40 to-[#FEDFE9]/50 blur-[120px] pointer-events-none"
        />

        <div className="absolute bottom-0 inset-x-0 h-6 sm:h-16 bg-gradient-to-t from-[#F8F9FA] via-[#F8F9FA]/40 to-transparent pointer-events-none" />
      </div>

      {/* 2. LEFT CUTOUT MODEL (Full Top-to-Bottom, No Background) */}
      <motion.div
        initial={{ opacity: 0, x: -40, scale: 0.96 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="h-full w-[100px] xs:w-[125px] sm:w-[220px] md:w-[290px] lg:w-[380px] xl:w-[440px] shrink-0 flex items-center justify-center pointer-events-auto select-none relative z-10"
      >
        <img
          src={leftSrc}
          alt="Snapshot Runway Model Left"
          onError={() => setLeftSrc('/hero-left-nobg.png')}
          className="h-full w-full object-contain object-center drop-shadow-[0_16px_32px_rgba(0,0,0,0.14)] transition-transform duration-700 ease-out hover:scale-[1.02]"
          referrerPolicy="no-referrer"
        />
      </motion.div>

      {/* 3. CENTER HEADLINE (14px on Mobile, Centered Between Equal Height Models) */}
      <div className="relative z-20 flex-1 flex items-center justify-center text-center px-1 sm:px-4 md:px-6">
        <div className="relative inline-flex flex-col items-center justify-center select-none max-w-2xl">
          <h1
            id="hero-headline"
            className="relative flex flex-wrap items-center justify-center gap-x-1.5 sm:gap-x-3.5 md:gap-x-4.5 gap-y-0.5 sm:gap-y-2 font-headline font-bold uppercase tracking-tight text-[14px] sm:text-[clamp(20px,3.8vw,48px)] leading-tight sm:leading-snug"
          >
            {words.map((word, index) => (
              <motion.span
                key={index}
                initial={{
                  opacity: 0,
                  y: 22,
                  filter: 'blur(6px)',
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  filter: 'blur(0px)',
                }}
                transition={{
                  duration: 0.85,
                  delay: 0.15 + index * 0.08,
                  ease: [0.215, 0.61, 0.355, 1],
                }}
                className="inline-block relative bg-gradient-to-r from-[#021B4D] via-[#0A2660] to-[#0A0A0A] bg-clip-text text-transparent drop-shadow-xs transition-transform duration-300 hover:scale-105"
              >
                {word}
              </motion.span>
            ))}

            {/* Subtle Runway Text Glint Sweep */}
            <motion.span
              aria-hidden="true"
              animate={{
                x: ['-120%', '240%'],
              }}
              transition={{
                duration: 5.5,
                repeat: Infinity,
                ease: 'easeInOut',
                repeatDelay: 2.5,
              }}
              className="absolute inset-0 w-1/3 bg-gradient-to-r from-transparent via-white/50 to-transparent skew-x-[-20deg] pointer-events-none mix-blend-overlay"
            />
          </h1>
        </div>
      </div>

      {/* 4. RIGHT CUTOUT MODEL (Full Top-to-Bottom, No Background) */}
      <motion.div
        initial={{ opacity: 0, x: 40, scale: 0.96 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="h-full w-[100px] xs:w-[125px] sm:w-[220px] md:w-[290px] lg:w-[380px] xl:w-[440px] shrink-0 flex items-center justify-center pointer-events-auto select-none relative z-10"
      >
        <img
          src={rightSrc}
          alt="Snapshot Runway Model Right"
          onError={() => setRightSrc('/hero-right-nobg.png')}
          className="h-full w-full object-contain object-center drop-shadow-[0_16px_32px_rgba(0,0,0,0.14)] transition-transform duration-700 ease-out hover:scale-[1.02]"
          referrerPolicy="no-referrer"
        />
      </motion.div>
    </section>
  );
};
