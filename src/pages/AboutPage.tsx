import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Award, Compass, ArrowLeft, ArrowRight, Heart, Users, Target, Camera } from 'lucide-react';

interface AboutPageProps {
  onNavigateHome: () => void;
  onNavigateTickets: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({
  onNavigateHome,
  onNavigateTickets,
}) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, []);

  return (
    <div className="w-full min-h-screen bg-[#F8F9FA] text-[#111111] pt-28 pb-20">
      <div className="max-w-6xl mx-auto px-6 sm:px-12">
        {/* Navigation Breadcrumb / Back Button */}
        <div className="mb-8">
          <button
            onClick={onNavigateHome}
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-neutral-500 hover:text-black transition-colors cursor-pointer py-1.5 px-3 rounded-full hover:bg-neutral-200/60"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </button>
        </div>

        {/* Page Hero Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16 sm:mb-20 space-y-4"
        >
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-neutral-500 bg-white border border-neutral-200/80 px-4 py-1.5 rounded-full shadow-xs">
            Our Mission & Story
          </span>

          <h1
            id="about-page-title"
            className="font-headline font-bold text-neutral-900 uppercase tracking-tight"
            style={{ fontSize: '36px', lineHeight: '1.15' }}
          >
            About Us
          </h1>
          <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
            A premier creative platform celebrating fashion, artistic identity, and emerging runway talent.
          </p>
        </motion.div>

        {/* Primary Story / Information Cards with User's Exact Content */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.15 }}
          className="bg-white border border-neutral-200/90 rounded-3xl p-8 sm:p-12 shadow-sm mb-12 relative overflow-hidden"
        >
          {/* Subtle decorative background accent */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-blue-50/50 via-purple-50/30 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

          <div className="max-w-4xl mx-auto space-y-8">
            <div className="border-l-4 border-black pl-6 sm:pl-8 py-1">
              <p className="text-lg sm:text-2xl text-neutral-900 font-medium leading-relaxed">
                We are a creative fashion platform built to bring together aspiring models, creators, performers, and fashion enthusiasts on one stage. Our aim is to create an environment where individuals can express their personality, creativity, talent, and unique style through fashion and performance.
              </p>
            </div>

            <div className="border-l-4 border-neutral-300 pl-6 sm:pl-8 py-1">
              <p className="text-base sm:text-lg text-neutral-700 leading-relaxed">
                From discovering new talent to creating opportunities for networking, showcasing, and collaboration, we focus on making every participant part of a memorable experience. With fashion, creativity, entertainment, and self-expression at its heart, our platform is designed to celebrate individuality and give emerging talent the confidence and space to be seen, heard, and appreciated.
              </p>
            </div>
          </div>
        </motion.div>

        {/* 3 Core Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="p-7 rounded-2xl bg-white border border-neutral-200/80 shadow-xs flex flex-col justify-between gap-6 hover:border-neutral-400 transition-colors"
          >
            <div className="w-12 h-12 rounded-xl bg-neutral-900 text-white flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-neutral-200" />
            </div>
            <div>
              <h3 className="font-headline font-bold text-neutral-900 text-xl mb-2">
                Creative Expression
              </h3>
              <p className="text-sm text-neutral-600 leading-relaxed">
                Empowering bold, unfiltered individuality. We encourage models and designers to tell stories through garments, movement, and runway presence.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="p-7 rounded-2xl bg-white border border-neutral-200/80 shadow-xs flex flex-col justify-between gap-6 hover:border-neutral-400 transition-colors"
          >
            <div className="w-12 h-12 rounded-xl bg-neutral-900 text-white flex items-center justify-center">
              <Award className="w-6 h-6 text-neutral-200" />
            </div>
            <div>
              <h3 className="font-headline font-bold text-neutral-900 text-xl mb-2">
                Talent Discovery
              </h3>
              <p className="text-sm text-neutral-600 leading-relaxed">
                Providing aspiring performers with industry jury evaluations, hands-on runway grooming, and direct casting pathways into commercial modeling.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="p-7 rounded-2xl bg-white border border-neutral-200/80 shadow-xs flex flex-col justify-between gap-6 hover:border-neutral-400 transition-colors"
          >
            <div className="w-12 h-12 rounded-xl bg-neutral-900 text-white flex items-center justify-center">
              <Compass className="w-6 h-6 text-neutral-200" />
            </div>
            <div>
              <h3 className="font-headline font-bold text-neutral-900 text-xl mb-2">
                Network & Community
              </h3>
              <p className="text-sm text-neutral-600 leading-relaxed">
                Building a collaborative ecosystem connecting fashion enthusiasts, media partners, photographers, stylists, and visionary brands.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Bottom Call to Action Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="rounded-3xl bg-neutral-950 text-white p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left"
        >
          <div className="space-y-2 max-w-xl">
            <span className="text-xs uppercase tracking-widest text-neutral-400 font-medium block">
              Join the Experience
            </span>
            <h3 className="font-headline font-bold text-2xl sm:text-3xl text-white">
              Be Part of the SNAPSHOT Stage Era
            </h3>
            <p className="text-neutral-400 text-sm leading-relaxed">
              Register as a runway participant for the upcoming auditions and grand showcase.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 shrink-0">
            <button
              onClick={onNavigateTickets}
              className="bg-white hover:bg-neutral-100 text-black font-semibold px-7 py-3.5 rounded-full transition-all text-sm flex items-center gap-2 cursor-pointer shadow-md"
            >
              <span>Register Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={onNavigateHome}
              className="bg-white/10 hover:bg-white/20 text-white font-medium px-6 py-3.5 rounded-full transition-all text-sm cursor-pointer"
            >
              Explore Runway Schedule
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
