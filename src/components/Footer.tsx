import React, { useState } from 'react';
import { SnapshotLogo } from './SnapshotLogo';
import { Instagram, Mail, Phone, ArrowUp, Check, Copy } from 'lucide-react';
import { motion } from 'motion/react';

export const Footer: React.FC = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const emailAddress = 'contact@snapshotfashionshow.com';
  const phoneNumber = '+91 91117 48987';
  const whatsappNumber = '919111748987';
  const instagramUrl =
    'https://www.instagram.com/snapshot_bhopal?utm_source=ig_web_button_share_sheet&igsi=ZDNlZDc0MzIxNw==';

  const handleCopy = (text: string, type: 'email' | 'phone') => {
    navigator.clipboard.writeText(text);
    if (type === 'email') {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } else {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      id="main-footer"
      className="relative w-full min-h-[75vh] sm:min-h-[85vh] flex flex-col justify-between overflow-hidden text-white bg-black"
    >
      {/* 1. Deep Black Luxury Fashion Atmosphere with Subtle Ambient Accents */}
      <div className="absolute inset-0 w-full h-full bg-[#000000] -z-10 pointer-events-none">
        {/* Subtle Ambient Radial Lighting for Depth */}
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.15, 0.28, 0.15],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[800px] h-[350px] sm:h-[450px] rounded-full bg-gradient-to-r from-neutral-800 via-neutral-700 to-neutral-800 blur-[130px]"
        />

        {/* Top subtle border line */}
        <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-neutral-800 to-transparent" />
      </div>

      {/* 2. Main Footer Body */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 sm:px-12 pt-20 sm:pt-28 pb-12 flex-1 flex flex-col justify-between items-center text-center">
        
        {/* Top Brand Mark */}
        <div className="flex flex-col items-center gap-4">
          <SnapshotLogo size={48} color="#FFFFFF" strokeWidth={2} />
          <h3 className="font-brand font-black text-2xl sm:text-3xl text-white uppercase tracking-widest">
            SNAPSHOT
          </h3>
          <p className="text-neutral-500 text-xs sm:text-sm tracking-wide">
            Official Fashion Showcase Platform
          </p>
        </div>

        {/* Center: Icon-Only Social Media & Direct Contact Channels */}
        <div className="my-16 sm:my-20 flex flex-col items-center gap-6">
          <div className="flex items-center justify-center gap-5 sm:gap-7">
            
            {/* 1. Instagram Icon Only */}
            <a
              id="footer-icon-instagram"
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-neutral-950 border border-neutral-800 hover:border-neutral-500 flex items-center justify-center text-white transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-[0_0_30px_rgba(255,255,255,0.12)] cursor-pointer"
              aria-label="Instagram"
              title="Visit Instagram @snapshot_bhopal"
            >
              <Instagram className="w-7 h-7 sm:w-8 sm:h-8 text-neutral-300 group-hover:text-white transition-colors" />
              {/* Tooltip */}
              <span className="absolute -bottom-8 px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-[10px] text-neutral-400 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                Instagram
              </span>
            </a>

            {/* 2. Email Icon Only */}
            <div className="relative group">
              <a
                id="footer-icon-email"
                href={`mailto:${emailAddress}`}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-neutral-950 border border-neutral-800 hover:border-neutral-500 flex items-center justify-center text-white transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-[0_0_30px_rgba(255,255,255,0.12)] cursor-pointer"
                aria-label="Email"
                title={`Send email to ${emailAddress}`}
              >
                <Mail className="w-7 h-7 sm:w-8 sm:h-8 text-neutral-300 group-hover:text-white transition-colors" />
              </a>
              {/* Tooltip */}
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleCopy(emailAddress, 'email');
                }}
                className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-[10px] text-neutral-400 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap flex items-center gap-1 cursor-pointer"
                title="Click to copy email"
              >
                {copiedEmail ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copiedEmail ? 'Copied' : 'Email'}</span>
              </button>
            </div>

            {/* 3. Phone Number Icon Only */}
            <div className="relative group">
              <a
                id="footer-icon-phone"
                href={`tel:${phoneNumber.replace(/\s+/g, '')}`}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-neutral-950 border border-neutral-800 hover:border-neutral-500 flex items-center justify-center text-white transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-[0_0_30px_rgba(255,255,255,0.12)] cursor-pointer"
                aria-label="Phone Helpline"
                title={`Call ${phoneNumber}`}
              >
                <Phone className="w-7 h-7 sm:w-8 sm:h-8 text-neutral-300 group-hover:text-white transition-colors" />
              </a>
              {/* Tooltip */}
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleCopy(phoneNumber, 'phone');
                }}
                className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-[10px] text-neutral-400 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap flex items-center gap-1 cursor-pointer"
                title="Click to copy phone number"
              >
                {copiedPhone ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copiedPhone ? 'Copied' : 'Helpline'}</span>
              </button>
            </div>

          </div>
        </div>

        {/* Bottom Bar: Clean Copyright & Back To Top */}
        <div className="w-full pt-8 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <span>© 2026 SNAPSHOT FASHION SHOW. All rights reserved.</span>
          
          <button
            onClick={scrollToTop}
            className="p-2.5 rounded-full bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white transition-colors cursor-pointer flex items-center justify-center"
            aria-label="Back to top"
            title="Back to Top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

      </div>
    </footer>
  );
};
