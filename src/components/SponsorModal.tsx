import React, { useState } from 'react';
import { X, Send, Check, Building2, User, Phone, Mail, MessageSquare } from 'lucide-react';
import { SnapshotLogo } from './SnapshotLogo';

interface SponsorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SponsorModal: React.FC<SponsorModalProps> = ({ isOpen, onClose }) => {
  const [brandName, setBrandName] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!brandName || !phone) return;

    const whatsappMessage = `Hey! I am inquiring about Sponsorship opportunities for SNAPSHOT Fashion Show (Season 2).\n\n` +
      `• Brand / Company: ${brandName}\n` +
      (contactPerson ? `• Contact Person: ${contactPerson}\n` : '') +
      `• Phone / WhatsApp: ${phone}\n` +
      (email ? `• Email: ${email}\n` : '') +
      (message ? `• Requirements: ${message}\n` : '');

    const whatsappUrl = `https://wa.me/919111748987?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(whatsappUrl, '_blank');
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setBrandName('');
    setContactPerson('');
    setPhone('');
    setEmail('');
    setMessage('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white border border-neutral-200 rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl relative max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-neutral-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <SnapshotLogo size={32} color="#111" strokeWidth={2} />
            <div>
              <h3 className="font-brand font-black text-base text-neutral-900 uppercase tracking-wide">
                SPONSORSHIP INQUIRY
              </h3>
              <p className="text-xs text-neutral-500">Contact Team Snapshot via DM</p>
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
        <div className="p-5 sm:p-6 overflow-y-auto flex-1">
          {submitted ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <Check className="w-6 h-6" />
              </div>
              <h4 className="font-syne font-bold text-xl text-black">Inquiry Submitted</h4>
              <p className="text-sm text-neutral-600 max-w-xs mx-auto">
                Thank you for your interest in partnering with SNAPSHOT Season 2. Our partnership director will get in touch via DM/WhatsApp shortly.
              </p>
              <button
                onClick={handleReset}
                className="mt-4 bg-black text-white px-6 py-2.5 rounded-full text-xs font-semibold hover:bg-neutral-800 transition-all cursor-pointer"
              >
                Close Window
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="bg-neutral-50 border border-neutral-200/70 rounded-xl p-3 text-xs text-neutral-600">
                Interested brands can connect directly for Brand/Logo Placement, Social Media Collaborations, Event Visibility, and Stage Mentions.
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  Brand / Organization Name *
                </label>
                <div className="relative">
                  <Building2 className="w-4 h-4 text-neutral-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Acme Fashion Co."
                    value={brandName}
                    onChange={(e) => setBrandName(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border border-neutral-200 focus:border-black focus:outline-none bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  Contact Person Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-neutral-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    placeholder="e.g. Jordan Lee"
                    value={contactPerson}
                    onChange={(e) => setContactPerson(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border border-neutral-200 focus:border-black focus:outline-none bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  Direct Contact / WhatsApp Number *
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-neutral-400 absolute left-3 top-3" />
                  <input
                    type="tel"
                    required
                    placeholder="+91 91117 48987"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border border-neutral-200 focus:border-black focus:outline-none bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-neutral-400 absolute left-3 top-3" />
                  <input
                    type="email"
                    placeholder="brand@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border border-neutral-200 focus:border-black focus:outline-none bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  Message / Specific Requirements
                </label>
                <textarea
                  rows={3}
                  placeholder="Tell us about your brand and expected deliverables..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full p-3 text-sm rounded-xl border border-neutral-200 focus:border-black focus:outline-none bg-white resize-none"
                />
              </div>

              <div className="pt-2 border-t border-neutral-100 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 text-xs font-semibold text-neutral-600 hover:text-black cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-black hover:bg-neutral-800 text-white text-xs font-semibold px-6 py-2.5 rounded-full transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send via WhatsApp</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
