import React from 'react';
import { X, Sparkles, Calendar, Clock, CheckCircle } from 'lucide-react';
import { SnapshotLogo } from './SnapshotLogo';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenTickets: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({
  isOpen,
  onClose,
  onOpenTickets,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white border border-neutral-200 rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl relative max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-neutral-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <SnapshotLogo size={32} color="#111" strokeWidth={2} />
            <div>
              <h3 className="font-brand font-black text-base text-neutral-900 uppercase tracking-wide">
                ABOUT SNAPSHOT
              </h3>
              <p className="text-xs text-neutral-500">Season 2 • S² Stage Era</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-neutral-400 hover:text-black rounded-full hover:bg-neutral-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4 text-sm text-neutral-600 leading-relaxed">
          <div className="bg-neutral-50 rounded-2xl p-4 border border-neutral-200/80">
            <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider block mb-1">
              Event Identity
            </span>
            <p className="font-syne font-bold text-lg text-black">
              SNAPSHOT Fashion Show – Season 2 (S² Stage Era)
            </p>
          </div>

          <p>
            SNAPSHOT Fashion Show is an inclusive runway platform designed to celebrate authentic personal style, diverse talent, and creative fashion aesthetics.
          </p>

          <p>
            In Season 2 — <strong>S² Stage Era</strong> — participants showcase traditional & western outfits, engage in high-fashion studio photoshoots, build professional portfolios, and take the runway across an immersive 6-hour spectacle on 27 September 2026.
          </p>

          <div className="pt-2 border-t border-neutral-100 space-y-2">
            <h4 className="font-syne font-bold text-sm text-neutral-900">Key Highlights</h4>
            <div className="grid grid-cols-1 gap-2 text-xs">
              <div className="flex items-center gap-2 text-neutral-700">
                <CheckCircle className="w-4 h-4 text-neutral-900 shrink-0" />
                <span>Auditions on 6 & 13 September 2026</span>
              </div>
              <div className="flex items-center gap-2 text-neutral-700">
                <CheckCircle className="w-4 h-4 text-neutral-900 shrink-0" />
                <span>Main Runway Event on 27 September (12 PM – 6 PM)</span>
              </div>
              <div className="flex items-center gap-2 text-neutral-700">
                <CheckCircle className="w-4 h-4 text-neutral-900 shrink-0" />
                <span>Participant Fee: ₹2,999 | Audience Pass: ₹200</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action */}
        <div className="p-5 border-t border-neutral-100 flex items-center justify-end gap-3 bg-neutral-50/50">
          <button
            onClick={onClose}
            className="px-4 py-2.5 text-xs font-semibold text-neutral-600 hover:text-black cursor-pointer"
          >
            Close
          </button>
          <button
            onClick={() => {
              onClose();
              onOpenTickets();
            }}
            className="bg-black hover:bg-neutral-800 text-white text-xs font-semibold px-5 py-2.5 rounded-full transition-all cursor-pointer"
          >
            Get Tickets / Register
          </button>
        </div>
      </div>
    </div>
  );
};
