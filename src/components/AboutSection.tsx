import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Award, Compass } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section
      id="about-us-section"
      className="relative w-full py-20 sm:py-28 bg-[#F8F9FA] overflow-hidden border-t border-neutral-200/70"
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-12">
        {/* Section Headline in League Spartan at 28px */}
        <div className="text-center mb-12 sm:mb-16">
          <h2
            id="about-us-heading"
            className="font-headline font-bold text-neutral-900 uppercase tracking-tight"
            style={{ fontSize: '28px' }}
          >
            About Us
          </h2>
        </div>

        {/* Content Box with High Fashion Editorial Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center">
          {/* Main Editorial Text Column */}
          <div className="lg:col-span-8 space-y-6 text-neutral-700 leading-relaxed">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-base sm:text-lg text-neutral-900 font-medium leading-relaxed"
            >
              We are a creative fashion platform built to bring together aspiring models, creators, performers, and fashion enthusiasts on one stage. Our aim is to create an environment where individuals can express their personality, creativity, talent, and unique style through fashion and performance.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-base sm:text-lg text-neutral-600 leading-relaxed"
            >
              From discovering new talent to creating opportunities for networking, showcasing, and collaboration, we focus on making every participant part of a memorable experience. With fashion, creativity, entertainment, and self-expression at its heart, our platform is designed to celebrate individuality and give emerging talent the confidence and space to be seen, heard, and appreciated.
            </motion.p>
          </div>

          {/* Editorial Pillars Side Column */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <div className="p-5 rounded-2xl bg-white border border-neutral-200/80 shadow-xs flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-neutral-900 text-white flex items-center justify-center shrink-0">
                <Sparkles className="w-5 h-5 text-neutral-200" />
              </div>
              <div>
                <h3 className="font-headline font-bold text-neutral-900 text-base">Creative Expression</h3>
                <p className="text-xs text-neutral-500 mt-1">
                  Empowering distinct identities through runway poise, design storytelling, and performance.
                </p>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-neutral-200/80 shadow-xs flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-neutral-900 text-white flex items-center justify-center shrink-0">
                <Award className="w-5 h-5 text-neutral-200" />
              </div>
              <div>
                <h3 className="font-headline font-bold text-neutral-900 text-base">Talent Discovery</h3>
                <p className="text-xs text-neutral-500 mt-1">
                  Direct pathways for models, stylists, and creatives to connect with industry agencies.
                </p>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-neutral-200/80 shadow-xs flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-neutral-900 text-white flex items-center justify-center shrink-0">
                <Compass className="w-5 h-5 text-neutral-200" />
              </div>
              <div>
                <h3 className="font-headline font-bold text-neutral-900 text-base">Network & Reach</h3>
                <p className="text-xs text-neutral-500 mt-1">
                  High-profile showcase reach across media, brand partnerships, and creator ecosystems.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
