import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Ticket,
  Check,
  ShieldCheck,
  Sparkles,
  User,
  Mail,
  Phone,
  Calendar,
  ArrowRight,
  ArrowLeft,
  QrCode,
  MapPin,
  Clock,
  HelpCircle,
  MessageSquare,
  ExternalLink,
  Ruler,
} from 'lucide-react';
import { SnapshotLogo } from '../components/SnapshotLogo';
import { getEventDateStatus } from '../utils/dateStatus';

interface TicketsPageProps {
  onNavigateHome: () => void;
}

export const TicketsPage: React.FC<TicketsPageProps> = ({ onNavigateHome }) => {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [height, setHeight] = useState('');
  const [auditionSlot, setAuditionSlot] = useState<'6-sept' | '13-sept'>('6-sept');
  const [isSuccess, setIsSuccess] = useState(false);
  const [confirmedData, setConfirmedData] = useState<any>(null);

  const contactNumber = '+91 91117 48987';
  const whatsappNumber = '919111748987';

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, []);

  const totalPrice = 2999;

  const generateWhatsAppMessage = (data: {
    fullName: string;
    phone: string;
    email: string;
    age?: string;
    height?: string;
    totalPrice: number;
    auditionSlot: '6-sept' | '13-sept';
  }) => {
    const slotText = data.auditionSlot === '6-sept' ? 'Slot 1 (6 September 2026)' : 'Slot 2 (13 September 2026)';
    return `Hey! I want to register as a participant for the runway audition.\n\n` +
      `• Name: ${data.fullName}\n` +
      `• Phone: ${data.phone}\n` +
      (data.age ? `• Age: ${data.age} years\n` : '') +
      (data.height ? `• Height: ${data.height}\n` : '') +
      (data.email ? `• Email: ${data.email}\n` : '') +
      `• Audition Slot: ${slotText}\n` +
      `• Total Amount: ₹2,999 (All-Inclusive Runway Pass)\n` +
      `• Event: SNAPSHOT Fashion Show (Season 2)\n` +
      `• Location: Bhopal, MP`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone) return;

    const passId = `SNP-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    const bookingDetails = {
      passId,
      fullName,
      phone,
      email,
      age,
      height,
      ticketType: 'participant',
      quantity: 1,
      totalPrice,
      auditionSlot,
      date: auditionSlot === '6-sept' ? '6 September 2026' : '13 September 2026',
    };

    setConfirmedData(bookingDetails);
    setIsSuccess(true);

    // Generate WhatsApp URL with custom structured message
    const message = generateWhatsAppMessage({
      fullName,
      phone,
      email,
      age,
      height,
      totalPrice,
      auditionSlot,
    });

    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    
    // Open WhatsApp in new tab/window
    window.open(whatsappUrl, '_blank');
  };

  const handleOpenWhatsApp = () => {
    if (!confirmedData) return;
    const message = generateWhatsAppMessage({
      fullName: confirmedData.fullName,
      phone: confirmedData.phone,
      email: confirmedData.email,
      age: confirmedData.age,
      height: confirmedData.height,
      totalPrice: confirmedData.totalPrice,
      auditionSlot: confirmedData.auditionSlot,
    });
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleReset = () => {
    setIsSuccess(false);
    setConfirmedData(null);
    setFullName('');
    setPhone('');
    setEmail('');
    setAge('');
    setHeight('');
  };

  return (
    <div className="w-full min-h-screen bg-[#F8F9FA] text-[#111111] pt-28 pb-24">
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
          className="text-center max-w-3xl mx-auto mb-16 space-y-4"
        >
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-neutral-500 bg-white border border-neutral-200/80 px-4 py-1.5 rounded-full shadow-xs">
            Official Registration Platform
          </span>

          <h1
            id="registration-page-title"
            className="font-headline font-bold text-neutral-900 uppercase tracking-tight"
            style={{ fontSize: '36px', lineHeight: '1.15' }}
          >
            Runway Registration
          </h1>
          <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
            Register for official runway auditions & model showcase for SNAPSHOT Fashion Show (Season 2).
          </p>
        </motion.div>

        {/* Main Booking Section Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          {/* Left Column: Participant Audition Registration Info Card */}
          <div className="lg:col-span-6 space-y-5">
            {/* Participant Audition Option - Highlighted Card */}
            <div
              className="p-6 sm:p-8 rounded-3xl bg-white border border-neutral-900 shadow-md ring-2 ring-neutral-900/10 transition-all duration-300 relative overflow-hidden"
            >
              <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-neutral-900 via-neutral-700 to-neutral-900" />
              
              <div className="flex items-start justify-between">
                <div>
                  <span className="inline-block text-[11px] font-semibold uppercase tracking-wider text-neutral-500 mb-1">
                    Official Auditions & Runway
                  </span>
                  <h2 className="font-headline font-bold text-neutral-900 text-2xl">
                    Participant Registration
                  </h2>
                  <p className="text-neutral-500 text-xs mt-1">
                    Audition Slot + Runway Mentorship + Main Showcase
                  </p>
                </div>
                <div className="text-right">
                  <span className="font-headline font-extrabold text-3xl text-neutral-900">
                    ₹2,999
                  </span>
                  <span className="text-xs text-neutral-500 block font-medium">all-inclusive pass</span>
                </div>
              </div>

              <ul className="mt-6 pt-5 border-t border-neutral-100 space-y-3.5 text-xs text-neutral-600">
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-neutral-900 shrink-0" />
                  <span>Official jury audition slot (Choose 6 Sept or 13 Sept 2026)</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-neutral-900 shrink-0" />
                  <span>Professional runway choreography & styling mentorship</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-neutral-900 shrink-0" />
                  <span>Official model portfolio highlight & digital press exposure</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-neutral-900 shrink-0" />
                  <span>Grand runway showcase entry for 27 September 2026</span>
                </li>
              </ul>
            </div>

            {/* Audition Dates Reminder Card */}
            <div className="p-5 rounded-2xl bg-white border border-neutral-200/80 space-y-3">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-neutral-500 block">
                Audition Dates & Venue
              </span>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-neutral-50 border border-neutral-200/60">
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="font-bold text-neutral-900 block font-headline">Audition 01</span>
                    {getEventDateStatus('2026-09-06').isLive ? (
                      <span className="inline-flex items-center gap-1 text-[9px] font-black text-white bg-red-600 px-1.5 py-0.5 rounded-full shadow-xs animate-pulse">
                        LIVE
                      </span>
                    ) : (
                      <span className="text-[9px] font-semibold text-neutral-500">
                        {getEventDateStatus('2026-09-06').label}
                      </span>
                    )}
                  </div>
                  <span className="text-neutral-600">6 September 2026</span>
                </div>
                <div className="p-3 rounded-xl bg-neutral-50 border border-neutral-200/60">
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="font-bold text-neutral-900 block font-headline">Audition 02</span>
                    {getEventDateStatus('2026-09-13').isLive ? (
                      <span className="inline-flex items-center gap-1 text-[9px] font-black text-white bg-red-600 px-1.5 py-0.5 rounded-full shadow-xs animate-pulse">
                        LIVE
                      </span>
                    ) : (
                      <span className="text-[9px] font-semibold text-neutral-500">
                        {getEventDateStatus('2026-09-13').label}
                      </span>
                    )}
                  </div>
                  <span className="text-neutral-600">13 September 2026</span>
                </div>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="p-4 rounded-2xl bg-white border border-neutral-200/80 flex items-center justify-between text-xs text-neutral-600">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-neutral-900" />
                <span>Verified Official Registration</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-neutral-900" />
                <span>Bhopal, MP</span>
              </div>
            </div>
          </div>

          {/* Right Column: Registration Form */}
          <div className="lg:col-span-6 bg-white border border-neutral-200/90 rounded-3xl p-6 sm:p-8 shadow-sm">
            <AnimatePresence mode="wait">
              {isSuccess && confirmedData ? (
                <motion.div
                  key="request-sent-screen"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  className="space-y-5 text-center py-2"
                >
                  <div className="w-14 h-14 bg-amber-100 text-amber-900 rounded-full flex items-center justify-center mx-auto ring-8 ring-amber-50">
                    <MessageSquare className="w-7 h-7" />
                  </div>

                  <div>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-[11px] font-semibold mb-2">
                      <Clock className="w-3.5 h-3.5 text-amber-700" />
                      <span>Registration Forwarded to WhatsApp</span>
                    </div>
                    <h3 className="font-headline font-bold text-2xl text-neutral-900">
                      Registration Request Sent
                    </h3>
                    <p className="text-xs text-neutral-500 mt-1 max-w-sm mx-auto">
                      Your registration details have been sent to our team on WhatsApp (<span className="font-mono text-neutral-800 font-semibold">+91 91117 48987</span>).
                    </p>
                  </div>

                  {/* Registration Request Summary Slip */}
                  <div className="bg-[#0A0A0A] text-white rounded-2xl p-5 text-left border border-neutral-800 space-y-4">
                    <div className="flex justify-between items-start border-b border-neutral-800 pb-3">
                      <div>
                        <span className="text-[10px] text-neutral-400 uppercase font-semibold">
                          Registration Category
                        </span>
                        <p className="font-headline font-bold text-base text-white capitalize">
                          Participant Runway Audition
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] text-neutral-400 uppercase font-semibold block">
                          Registration Ref
                        </span>
                        <span className="px-2 py-0.5 rounded bg-neutral-800 text-[11px] font-mono text-amber-400 font-bold">
                          {confirmedData.passId}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                      <div>
                        <span className="text-neutral-400 block text-[10px]">Name</span>
                        <span className="font-medium text-white">{confirmedData.fullName}</span>
                      </div>
                      <div>
                        <span className="text-neutral-400 block text-[10px]">Phone</span>
                        <span className="font-medium text-white">{confirmedData.phone}</span>
                      </div>
                      {confirmedData.age && (
                        <div>
                          <span className="text-neutral-400 block text-[10px]">Age</span>
                          <span className="font-medium text-white">{confirmedData.age} yrs</span>
                        </div>
                      )}
                      {confirmedData.height && (
                        <div>
                          <span className="text-neutral-400 block text-[10px]">Height</span>
                          <span className="font-medium text-white">{confirmedData.height}</span>
                        </div>
                      )}
                      <div>
                        <span className="text-neutral-400 block text-[10px]">Audition Slot</span>
                        <span className="font-medium text-white">{confirmedData.date}</span>
                      </div>
                      <div>
                        <span className="text-neutral-400 block text-[10px]">Registration Fee</span>
                        <span className="font-medium text-emerald-400 font-headline text-sm">
                          ₹{confirmedData.totalPrice}
                        </span>
                      </div>
                    </div>

                    {/* How Confirmation Works */}
                    <div className="bg-neutral-900/90 rounded-xl p-3.5 border border-neutral-800 text-[11px] space-y-2">
                      <span className="font-semibold text-neutral-200 block text-xs">
                        How to complete your registration:
                      </span>
                      <ol className="space-y-1.5 text-neutral-400 list-decimal list-inside leading-relaxed">
                        <li>
                          <strong className="text-neutral-300">WhatsApp Chat:</strong> Send the pre-filled message to our team coordinator.
                        </li>
                        <li>
                          <strong className="text-neutral-300">Payment:</strong> Complete UPI transfer using the official QR / details shared by team.
                        </li>
                        <li>
                          <strong className="text-neutral-300">Audition Confirmation:</strong> Receive your verified participant ID and reporting schedule directly on WhatsApp.
                        </li>
                      </ol>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <button
                      onClick={handleOpenWhatsApp}
                      className="w-full bg-[#25D366] hover:bg-[#20ba59] text-black font-bold py-3.5 px-4 rounded-full transition-all text-xs cursor-pointer shadow-sm flex items-center justify-center gap-2"
                    >
                      <MessageSquare className="w-4 h-4 fill-black/10" />
                      <span>Open WhatsApp Chat Again (+91 91117 48987)</span>
                    </button>

                    <div className="flex flex-col sm:flex-row gap-3">
                      <button
                        onClick={handleReset}
                        className="flex-1 bg-black hover:bg-neutral-800 text-white font-semibold py-3.5 rounded-full transition-all text-xs cursor-pointer shadow-sm"
                      >
                        Register Another Participant
                      </button>
                      <button
                        onClick={onNavigateHome}
                        className="flex-1 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 font-semibold py-3.5 rounded-full transition-all text-xs cursor-pointer"
                      >
                        Back to Home
                      </button>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.form
                  key="registration-form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-5"
                >
                  <div className="border-b border-neutral-100 pb-3">
                    <h3 className="font-headline font-bold text-lg text-neutral-900">
                      Participant Registration Form
                    </h3>
                    <p className="text-xs text-neutral-500 mt-0.5">
                      Provide contact information to register directly with team via WhatsApp (+91 91117 48987).
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-2">
                      Audition Slot Preference *
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setAuditionSlot('6-sept')}
                        className={`p-3 rounded-xl border text-xs text-left cursor-pointer transition-all ${
                          auditionSlot === '6-sept'
                            ? 'border-neutral-900 bg-neutral-50 font-semibold text-neutral-900 ring-1 ring-neutral-900'
                            : 'border-neutral-200 text-neutral-600 hover:border-neutral-300'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="block font-medium">Slot 1</span>
                          {getEventDateStatus('2026-09-06').isLive && (
                            <span className="inline-flex items-center text-[9px] font-black text-white bg-red-600 px-1.5 py-0.5 rounded-full animate-pulse">
                              LIVE
                            </span>
                          )}
                        </div>
                        <span className="text-neutral-500">6 Sept 2026</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setAuditionSlot('13-sept')}
                        className={`p-3 rounded-xl border text-xs text-left cursor-pointer transition-all ${
                          auditionSlot === '13-sept'
                            ? 'border-neutral-900 bg-neutral-50 font-semibold text-neutral-900 ring-1 ring-neutral-900'
                            : 'border-neutral-200 text-neutral-600 hover:border-neutral-300'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="block font-medium">Slot 2</span>
                          {getEventDateStatus('2026-09-13').isLive && (
                            <span className="inline-flex items-center text-[9px] font-black text-white bg-red-600 px-1.5 py-0.5 rounded-full animate-pulse">
                              LIVE
                            </span>
                          )}
                        </div>
                        <span className="text-neutral-500">13 Sept 2026</span>
                      </button>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-medium text-neutral-700 mb-1">
                        Full Name *
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 text-neutral-400 absolute left-3 top-3" />
                        <input
                          type="text"
                          required
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="e.g. Ananya Roy"
                          className="w-full pl-9 pr-3 py-2.5 text-xs bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:border-neutral-900 focus:bg-white transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-neutral-700 mb-1">
                        Phone Number *
                      </label>
                      <div className="relative">
                        <Phone className="w-4 h-4 text-neutral-400 absolute left-3 top-3" />
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+91 91117 48987"
                          className="w-full pl-9 pr-3 py-2.5 text-xs bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:border-neutral-900 focus:bg-white transition-colors"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-neutral-700 mb-1">
                          Age *
                        </label>
                        <div className="relative">
                          <Calendar className="w-4 h-4 text-neutral-400 absolute left-3 top-3" />
                          <input
                            type="number"
                            min="14"
                            max="60"
                            required
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                            placeholder="e.g. 21"
                            className="w-full pl-9 pr-3 py-2.5 text-xs bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:border-neutral-900 focus:bg-white transition-colors"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-neutral-700 mb-1">
                          Height *
                        </label>
                        <div className="relative">
                          <Ruler className="w-4 h-4 text-neutral-400 absolute left-3 top-3" />
                          <input
                            type="text"
                            required
                            value={height}
                            onChange={(e) => setHeight(e.target.value)}
                            placeholder="e.g. 5'8&quot; / 173 cm"
                            className="w-full pl-9 pr-3 py-2.5 text-xs bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:border-neutral-900 focus:bg-white transition-colors"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-neutral-700 mb-1">
                        Email Address (Optional)
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-neutral-400 absolute left-3 top-3" />
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="ananya@example.com"
                          className="w-full pl-9 pr-3 py-2.5 text-xs bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:border-neutral-900 focus:bg-white transition-colors"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Summary & Confirm Button */}
                  <div className="pt-4 border-t border-neutral-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                    <div>
                      <span className="text-[11px] text-neutral-500 block">Registration Fee</span>
                      <span className="font-headline font-bold text-xl text-neutral-900">
                        ₹{totalPrice}
                      </span>
                    </div>

                    <button
                      type="submit"
                      id="btn-confirm-registration"
                      className="bg-black hover:bg-neutral-800 text-white font-semibold px-6 py-3.5 rounded-full transition-all text-xs flex items-center justify-center gap-2 cursor-pointer shadow-sm active:scale-95"
                    >
                      <span>Register via WhatsApp</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <p className="text-[11px] text-neutral-500 text-center">
                    Clicking register will redirect to WhatsApp with your submitted details to +91 91117 48987
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* FAQs and Important Guidelines */}
        <div className="p-8 sm:p-10 rounded-3xl bg-white border border-neutral-200/90 shadow-xs">
          <div className="flex items-center gap-2 mb-6">
            <HelpCircle className="w-5 h-5 text-neutral-900" />
            <h3 className="font-headline font-bold text-lg text-neutral-900">
              Registration & Audition Guidelines
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-neutral-600 leading-relaxed">
            <div className="space-y-2">
              <h4 className="font-semibold text-neutral-900 text-sm">Audition Reporting</h4>
              <p>
                Please report to the venue 30 minutes before your selected audition slot with a valid government photo ID. Casual/smart fitting attire recommended.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-neutral-900 text-sm">Mentorship & Showcase Access</h4>
              <p>
                Selected participants will undergo professional choreography coaching, ramp styling, and receive full showcase passes for the grand runway on 27 September 2026.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
