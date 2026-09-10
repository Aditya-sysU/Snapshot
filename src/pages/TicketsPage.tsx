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
  Plus,
  Minus,
} from 'lucide-react';
import { SnapshotLogo } from '../components/SnapshotLogo';
import { getEventDateStatus } from '../utils/dateStatus';

interface TicketsPageProps {
  onNavigateHome: () => void;
}

export const TicketsPage: React.FC<TicketsPageProps> = ({ onNavigateHome }) => {
  const [ticketType, setTicketType] = useState<'audience' | 'participant'>('audience');
  const [quantity, setQuantity] = useState<number>(1);
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

  const unitPrice = ticketType === 'participant' ? 3999 : 200;
  const totalPrice = unitPrice * (ticketType === 'participant' ? 1 : quantity);

  const generateWhatsAppMessage = (data: {
    ticketType: 'audience' | 'participant';
    fullName: string;
    phone: string;
    email: string;
    age?: string;
    height?: string;
    quantity: number;
    totalPrice: number;
    auditionSlot: '6-sept' | '13-sept';
  }) => {
    if (data.ticketType === 'audience') {
      return (
        `Hey! I want to book tickets as an audience member.\n\n` +
        `• Name: ${data.fullName}\n` +
        `• Phone: ${data.phone}\n` +
        (data.email ? `• Email: ${data.email}\n` : '') +
        `• Passes: ${data.quantity} Pass${data.quantity > 1 ? 'es' : ''}\n` +
        `• Total Amount: ₹${data.totalPrice} (₹200/pass)\n` +
        `• Event: SNAPSHOT Fashion Show (Season 2)\n` +
        `• Date: 27 September 2026 (12 PM – 6 PM)\n` +
        `• Venue: Bhopal, MP`
      );
    } else {
      const slotText = data.auditionSlot === '6-sept' ? 'Slot 1 (6 September 2026)' : 'Slot 2 (13 September 2026)';
      return (
        `Hey! I want to register as a participant for the runway audition.\n\n` +
        `• Name: ${data.fullName}\n` +
        `• Phone: ${data.phone}\n` +
        (data.age ? `• Age: ${data.age} years\n` : '') +
        (data.height ? `• Height: ${data.height}\n` : '') +
        (data.email ? `• Email: ${data.email}\n` : '') +
        `• Audition Slot: ${slotText}\n` +
        `• Total Amount: ₹3,999 (All-Inclusive Runway Pass)\n` +
        `• Event: SNAPSHOT Fashion Show (Season 2)\n` +
        `• Location: Bhopal, MP`
      );
    }
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
      age: ticketType === 'participant' ? age : undefined,
      height: ticketType === 'participant' ? height : undefined,
      ticketType,
      quantity: ticketType === 'participant' ? 1 : quantity,
      totalPrice,
      auditionSlot,
      date:
        ticketType === 'participant'
          ? auditionSlot === '6-sept'
            ? '6 September 2026'
            : '13 September 2026'
          : '27 September 2026 (12 PM – 6 PM)',
    };

    setConfirmedData(bookingDetails);
    setIsSuccess(true);

    // Generate WhatsApp URL with custom structured message
    const message = generateWhatsAppMessage({
      ticketType,
      fullName,
      phone,
      email,
      age,
      height,
      quantity: ticketType === 'participant' ? 1 : quantity,
      totalPrice,
      auditionSlot,
    });

    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleOpenWhatsApp = () => {
    if (!confirmedData) return;
    const message = generateWhatsAppMessage({
      ticketType: confirmedData.ticketType,
      fullName: confirmedData.fullName,
      phone: confirmedData.phone,
      email: confirmedData.email,
      age: confirmedData.age,
      height: confirmedData.height,
      quantity: confirmedData.quantity,
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
    setQuantity(1);
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
          className="text-center max-w-3xl mx-auto mb-12 space-y-4"
        >
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-neutral-500 bg-white border border-neutral-200/80 px-4 py-1.5 rounded-full shadow-xs">
            Official Passes & Registration
          </span>

          <h1
            id="registration-page-title"
            className="font-headline font-bold text-neutral-900 uppercase tracking-tight"
            style={{ fontSize: '36px', lineHeight: '1.15' }}
          >
            Passes & Registration
          </h1>
          <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
            Choose between Audience Spectator Passes (₹200) or register as a Runway Participant (₹3,999) for SNAPSHOT Fashion Show (Season 2).
          </p>

          {/* Type Toggle Pills */}
          <div className="inline-flex p-1.5 bg-neutral-200/70 rounded-2xl border border-neutral-300/60">
            <button
              onClick={() => setTicketType('audience')}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                ticketType === 'audience'
                  ? 'bg-neutral-950 text-white shadow-md'
                  : 'text-neutral-600 hover:text-neutral-950'
              }`}
            >
              Audience Pass • ₹200
            </button>
            <button
              onClick={() => setTicketType('participant')}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                ticketType === 'participant'
                  ? 'bg-neutral-950 text-white shadow-md'
                  : 'text-neutral-600 hover:text-neutral-950'
              }`}
            >
              Runway Participant • ₹3,999
            </button>
          </div>
        </motion.div>

        {/* Main Booking Section Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          {/* Left Column: Selectable Options */}
          <div className="lg:col-span-6 space-y-5">
            {/* Audience Pass Option Card */}
            <div
              onClick={() => setTicketType('audience')}
              className={`p-6 sm:p-7 rounded-3xl cursor-pointer transition-all duration-300 border relative overflow-hidden ${
                ticketType === 'audience'
                  ? 'bg-white border-neutral-950 shadow-lg ring-2 ring-neutral-950/10'
                  : 'bg-white/80 hover:bg-white border-neutral-200/80 hover:shadow-sm'
              }`}
            >
              {ticketType === 'audience' && (
                <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-neutral-950 via-neutral-700 to-neutral-950" />
              )}
              <div className="flex items-start justify-between">
                <div>
                  <span className="inline-block text-[11px] font-semibold uppercase tracking-wider text-neutral-500 mb-1">
                    General Admission
                  </span>
                  <h3 className="font-headline font-bold text-neutral-900 text-2xl">
                    Audience Entry Pass
                  </h3>
                  <p className="text-neutral-500 text-xs mt-1">
                    Main Event Access • 27 September 2026 (12 PM – 6 PM)
                  </p>
                </div>
                <div className="text-right">
                  <span className="font-headline font-extrabold text-3xl text-neutral-900">
                    ₹200
                  </span>
                  <span className="text-xs text-neutral-500 block font-medium">per pass</span>
                </div>
              </div>

              <ul className="mt-5 pt-4 border-t border-neutral-100 space-y-2.5 text-xs text-neutral-600">
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-neutral-900 shrink-0" />
                  <span>Full runway showcase viewing & reserved guest seating</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-neutral-900 shrink-0" />
                  <span>Live guest designer walk, musical acts & special choreography</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-neutral-900 shrink-0" />
                  <span>Exclusive official fashion showcase merchandise discount</span>
                </li>
              </ul>
            </div>

            {/* Participant Audition Option Card */}
            <div
              onClick={() => setTicketType('participant')}
              className={`p-6 sm:p-7 rounded-3xl cursor-pointer transition-all duration-300 border relative overflow-hidden ${
                ticketType === 'participant'
                  ? 'bg-white border-neutral-950 shadow-lg ring-2 ring-neutral-950/10'
                  : 'bg-white/80 hover:bg-white border-neutral-200/80 hover:shadow-sm'
              }`}
            >
              {ticketType === 'participant' && (
                <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-neutral-950 via-neutral-700 to-neutral-950" />
              )}
              <div className="flex items-start justify-between">
                <div>
                  <span className="inline-block text-[11px] font-semibold uppercase tracking-wider text-neutral-500 mb-1">
                    Official Auditions & Runway
                  </span>
                  <h3 className="font-headline font-bold text-neutral-900 text-2xl">
                    Participant Registration
                  </h3>
                  <p className="text-neutral-500 text-xs mt-1">
                    Audition Slot + Runway Mentorship + Main Showcase
                  </p>
                </div>
                <div className="text-right">
                  <span className="font-headline font-extrabold text-3xl text-neutral-900">
                    ₹3,999
                  </span>
                  <span className="text-xs text-neutral-500 block font-medium">all-inclusive pass</span>
                </div>
              </div>

              <ul className="mt-5 pt-4 border-t border-neutral-100 space-y-2.5 text-xs text-neutral-600">
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
                  <span>Grand runway showcase entry on 27 September 2026</span>
                </li>
              </ul>
            </div>

            {/* Audition Dates Reminder Card */}
            <div className="p-5 rounded-2xl bg-white border border-neutral-200/80 space-y-3">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-neutral-500 block">
                Audition Dates & Key Timeline
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

          {/* Right Column: Dynamic Registration & Booking Form */}
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
                      <span>Forwarded to WhatsApp</span>
                    </div>
                    <h3 className="font-headline font-bold text-2xl text-neutral-900">
                      {confirmedData.ticketType === 'audience' ? 'Pass Booking Request Sent' : 'Registration Request Sent'}
                    </h3>
                    <p className="text-xs text-neutral-500 mt-1 max-w-sm mx-auto">
                      Your details have been sent to our event coordinator on WhatsApp (<span className="font-mono text-neutral-800 font-semibold">+91 91117 48987</span>).
                    </p>
                  </div>

                  {/* Booking Request Summary Slip */}
                  <div className="bg-[#0A0A0A] text-white rounded-2xl p-5 text-left border border-neutral-800 space-y-4">
                    <div className="flex justify-between items-start border-b border-neutral-800 pb-3">
                      <div>
                        <span className="text-[10px] text-neutral-400 uppercase font-semibold">
                          Category
                        </span>
                        <p className="font-headline font-bold text-base text-white capitalize">
                          {confirmedData.ticketType === 'participant'
                            ? 'Participant Runway Audition'
                            : `Audience Entry Pass (${confirmedData.quantity} Pass${confirmedData.quantity > 1 ? 'es' : ''})`}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] text-neutral-400 uppercase font-semibold block">
                          Booking Ref
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
                        <span className="text-neutral-400 block text-[10px]">
                          {confirmedData.ticketType === 'participant' ? 'Audition Slot' : 'Event Date'}
                        </span>
                        <span className="font-medium text-white">{confirmedData.date}</span>
                      </div>
                      <div>
                        <span className="text-neutral-400 block text-[10px]">Total Amount</span>
                        <span className="font-medium text-emerald-400 font-headline text-sm">
                          ₹{confirmedData.totalPrice}
                        </span>
                      </div>
                    </div>

                    {/* How Confirmation Works */}
                    <div className="bg-neutral-900/90 rounded-xl p-3.5 border border-neutral-800 text-[11px] space-y-2">
                      <span className="font-semibold text-neutral-200 block text-xs">
                        Next steps:
                      </span>
                      <ol className="space-y-1.5 text-neutral-400 list-decimal list-inside leading-relaxed">
                        <li>
                          <strong className="text-neutral-300">WhatsApp Chat:</strong> Review and send the pre-filled message on WhatsApp.
                        </li>
                        <li>
                          <strong className="text-neutral-300">Payment:</strong> Complete UPI transfer using the official QR / details provided.
                        </li>
                        <li>
                          <strong className="text-neutral-300">E-Pass Confirmation:</strong> Receive your verified digital entry pass directly on WhatsApp.
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
                        Book Another Ticket
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
                  key="booking-form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-5"
                >
                  <div className="border-b border-neutral-100 pb-3">
                    <h3 className="font-headline font-bold text-lg text-neutral-900">
                      {ticketType === 'audience' ? 'Audience Pass Booking' : 'Participant Registration'}
                    </h3>
                    <p className="text-xs text-neutral-500 mt-0.5">
                      {ticketType === 'audience'
                        ? 'Book spectator tickets (₹200/pass) for 27 September 2026 directly via WhatsApp.'
                        : 'Register for jury auditions (₹3,999 all-inclusive) directly via WhatsApp.'}
                    </p>
                  </div>

                  {/* Quantity selector for audience passes */}
                  {ticketType === 'audience' && (
                    <div className="bg-neutral-50 border border-neutral-200 rounded-2xl p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-semibold text-neutral-800">
                          Number of Passes:
                        </label>
                        <span className="text-xs font-medium text-neutral-500">
                          ₹200 × {quantity} = <strong className="text-neutral-950 font-bold">₹{totalPrice}</strong>
                        </span>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="flex items-center border border-neutral-300 rounded-xl bg-white overflow-hidden shadow-2xs">
                          <button
                            type="button"
                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                            className="p-2.5 text-neutral-600 hover:bg-neutral-100 cursor-pointer transition-colors"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="w-10 text-center font-bold text-sm text-neutral-900">
                            {quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => setQuantity(Math.min(10, quantity + 1))}
                            className="p-2.5 text-neutral-600 hover:bg-neutral-100 cursor-pointer transition-colors"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <div className="flex items-center gap-1.5 overflow-x-auto py-1">
                          {[1, 2, 3, 4, 5].map((n) => (
                            <button
                              key={n}
                              type="button"
                              onClick={() => setQuantity(n)}
                              className={`px-3 py-1.5 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                                quantity === n
                                  ? 'bg-neutral-900 text-white border-neutral-900 shadow-xs'
                                  : 'bg-white border-neutral-200 text-neutral-600 hover:border-neutral-300'
                              }`}
                            >
                              {n}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Audition Slot Selector for participants */}
                  {ticketType === 'participant' && (
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
                  )}

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

                    {/* Participant-only fields */}
                    {ticketType === 'participant' && (
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
                    )}

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
                      <span className="text-[11px] text-neutral-500 block">
                        {ticketType === 'audience' ? `Total (${quantity} pass${quantity > 1 ? 'es' : ''})` : 'All-Inclusive Fee'}
                      </span>
                      <span className="font-headline font-bold text-2xl text-neutral-900">
                        ₹{totalPrice}
                      </span>
                    </div>

                    <button
                      type="submit"
                      id="btn-confirm-registration"
                      className="bg-black hover:bg-neutral-800 text-white font-semibold px-6 py-3.5 rounded-full transition-all text-xs flex items-center justify-center gap-2 cursor-pointer shadow-sm active:scale-95"
                    >
                      <span>
                        {ticketType === 'audience' ? 'Book Passes via WhatsApp' : 'Register via WhatsApp'}
                      </span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <p className="text-[11px] text-neutral-500 text-center">
                    Submitting will open WhatsApp with your booking details sent to +91 91117 48987
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
