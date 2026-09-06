import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Ticket, Check, ShieldCheck, Sparkles, User, Mail, Phone, Calendar, ArrowRight, QrCode, MessageSquare, Clock, Ruler } from 'lucide-react';
import { SnapshotLogo } from './SnapshotLogo';
import { getEventDateStatus } from '../utils/dateStatus';

export const TicketsSection: React.FC = () => {
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

  const whatsappNumber = '919111748987';

  const unitPrice = ticketType === 'participant' ? 2999 : 200;
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
      return `Hey! I want to book tickets as a audience.\n\n` +
        `• Name: ${data.fullName}\n` +
        `• Phone: ${data.phone}\n` +
        (data.email ? `• Email: ${data.email}\n` : '') +
        `• Passes: ${data.quantity} Pass${data.quantity > 1 ? 'es' : ''}\n` +
        `• Total Amount: ₹${data.totalPrice}\n` +
        `• Event: SNAPSHOT Fashion Show (Season 2)\n` +
        `• Date: 27 September 2026 (12 PM – 6 PM)\n` +
        `• Venue: Bhopal, MP`;
    } else {
      const slotText = data.auditionSlot === '6-sept' ? 'Slot 1 (6 September 2026)' : 'Slot 2 (13 September 2026)';
      return `Hey! I want to book tickets as a participant for the runway audition.\n\n` +
        `• Name: ${data.fullName}\n` +
        `• Phone: ${data.phone}\n` +
        (data.age ? `• Age: ${data.age} years\n` : '') +
        (data.height ? `• Height: ${data.height}\n` : '') +
        (data.email ? `• Email: ${data.email}\n` : '') +
        `• Audition Slot: ${slotText}\n` +
        `• Total Amount: ₹2,999 (All-Inclusive Runway Pass)\n` +
        `• Event: SNAPSHOT Fashion Show (Season 2)\n` +
        `• Location: Bhopal, MP`;
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
      date: ticketType === 'participant' ? (auditionSlot === '6-sept' ? '6 September 2026' : '13 September 2026') : '27 September 2026',
    };

    setConfirmedData(bookingDetails);
    setIsSuccess(true);

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
    <section
      id="tickets-section"
      className="relative w-full py-20 sm:py-28 bg-[#F8F9FA] overflow-hidden border-t border-neutral-200/70"
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-12">
        {/* Section Headline in League Spartan at 28px */}
        <div className="text-center mb-12 sm:mb-16">
          <h2
            id="tickets-heading"
            className="font-headline font-bold text-neutral-900 uppercase tracking-tight"
            style={{ fontSize: '28px' }}
          >
            Official Passes & Registration
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Ticket Options / Tier Cards */}
          <div className="lg:col-span-6 space-y-5">
            {/* Audience Pass Option */}
            <div
              onClick={() => setTicketType('audience')}
              className={`p-6 sm:p-7 rounded-2xl cursor-pointer transition-all duration-300 border ${
                ticketType === 'audience'
                  ? 'bg-white border-neutral-900 shadow-md ring-1 ring-neutral-900'
                  : 'bg-white/80 hover:bg-white border-neutral-200/80'
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="inline-block text-[11px] font-semibold uppercase tracking-wider text-neutral-500 mb-1">
                    General Admission
                  </span>
                  <h3 className="font-headline font-bold text-neutral-900 text-xl">Audience Entry Pass</h3>
                  <p className="text-neutral-500 text-xs mt-1">
                    Main Event Access • 27 September 2026 (12 PM – 6 PM)
                  </p>
                </div>
                <div className="text-right">
                  <span className="font-headline font-extrabold text-2xl text-neutral-900">₹200</span>
                  <span className="text-xs text-neutral-500 block">per pass</span>
                </div>
              </div>

              <ul className="mt-4 pt-4 border-t border-neutral-100 space-y-2 text-xs text-neutral-600">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-neutral-900" />
                  <span>Full runway show viewing & guest seat access</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-neutral-900" />
                  <span>Official fashion showcase merchandise discount</span>
                </li>
              </ul>
            </div>

            {/* Participant Audition Option */}
            <div
              onClick={() => setTicketType('participant')}
              className={`p-6 sm:p-7 rounded-2xl cursor-pointer transition-all duration-300 border ${
                ticketType === 'participant'
                  ? 'bg-white border-neutral-900 shadow-md ring-1 ring-neutral-900'
                  : 'bg-white/80 hover:bg-white border-neutral-200/80'
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="inline-block text-[11px] font-semibold uppercase tracking-wider text-neutral-500 mb-1">
                    Runway Registration
                  </span>
                  <h3 className="font-headline font-bold text-neutral-900 text-xl">Participant Audition Entry</h3>
                  <p className="text-neutral-500 text-xs mt-1">
                    Audition Slot + Runway Mentorship + Main Event Staging
                  </p>
                </div>
                <div className="text-right">
                  <span className="font-headline font-extrabold text-2xl text-neutral-900">₹2,999</span>
                  <span className="text-xs text-neutral-500 block">all-inclusive</span>
                </div>
              </div>

              <ul className="mt-4 pt-4 border-t border-neutral-100 space-y-2 text-xs text-neutral-600">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-neutral-900" />
                  <span>Official jury audition slot (6 Sept or 13 Sept)</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-neutral-900" />
                  <span>Casting mentorship, grooming & choreography sessions</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-neutral-900" />
                  <span>Official model portfolio showcase & media exposure</span>
                </li>
              </ul>
            </div>

            <div className="flex items-center gap-2 text-xs text-neutral-500 px-2">
              <ShieldCheck className="w-4 h-4 text-neutral-700" />
              <span>Instant digital QR e-pass delivered upon booking</span>
            </div>
          </div>

          {/* Right Column: Direct In-Page Checkout Form */}
          <div className="lg:col-span-6 bg-white border border-neutral-200/90 rounded-2xl p-6 sm:p-8 shadow-sm">
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
                      <span>Request Forwarded to WhatsApp</span>
                    </div>
                    <h3 className="font-headline font-bold text-2xl text-neutral-900">Booking Request Sent</h3>
                    <p className="text-xs text-neutral-500 mt-1 max-w-sm mx-auto">
                      Your details were forwarded to our team on WhatsApp (<span className="font-mono text-neutral-800 font-semibold">+91 91117 48987</span>).
                    </p>
                  </div>

                  {/* Booking Request Summary Slip */}
                  <div className="bg-[#0A0A0A] text-white rounded-2xl p-5 text-left border border-neutral-800 space-y-4">
                    <div className="flex justify-between items-start border-b border-neutral-800 pb-3">
                      <div>
                        <span className="text-[10px] text-neutral-400 uppercase font-semibold">Requested Pass</span>
                        <p className="font-headline font-bold text-base text-white capitalize">
                          {confirmedData.ticketType === 'participant' ? 'Participant Runway Audition' : `Audience Guest Pass (${confirmedData.quantity}x)`}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] text-neutral-400 uppercase font-semibold block">Request Ref</span>
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
                        <span className="text-neutral-400 block text-[10px]">Date</span>
                        <span className="font-medium text-white">{confirmedData.date}</span>
                      </div>
                      <div>
                        <span className="text-neutral-400 block text-[10px]">Amount Payable</span>
                        <span className="font-medium text-emerald-400 font-headline">₹{confirmedData.totalPrice}</span>
                      </div>
                    </div>

                    <div className="bg-neutral-900/90 rounded-xl p-3.5 border border-neutral-800 text-[11px] space-y-1.5 text-neutral-400">
                      <span className="font-semibold text-neutral-200 block text-xs">Next Steps:</span>
                      <p>Send the message on WhatsApp, complete the payment with the organizers, and your verified digital entry pass will be issued directly on WhatsApp.</p>
                    </div>
                  </div>

                  <button
                    onClick={handleReset}
                    className="w-full bg-black hover:bg-neutral-800 text-white font-semibold py-3.5 rounded-full transition-all text-xs cursor-pointer shadow-sm"
                  >
                    Submit Another Request
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="checkout-form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-5"
                >
                  <div className="border-b border-neutral-100 pb-3">
                    <h3 className="font-headline font-bold text-lg text-neutral-900">
                      {ticketType === 'participant' ? 'Participant Registration' : 'Audience Pass Booking'}
                    </h3>
                    <p className="text-xs text-neutral-500 mt-0.5">
                      Fill out attendee details to generate your digital entry pass.
                    </p>
                  </div>

                  {ticketType === 'participant' && (
                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-2">
                        Audition Slot Preference
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          type="button"
                          onClick={() => setAuditionSlot('6-sept')}
                          className={`p-3 rounded-xl border text-xs text-left cursor-pointer transition-all ${
                            auditionSlot === '6-sept'
                              ? 'border-neutral-900 bg-neutral-50 font-semibold text-neutral-900'
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
                              ? 'border-neutral-900 bg-neutral-50 font-semibold text-neutral-900'
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

                  {ticketType === 'audience' && (
                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-2">
                        Number of Passes
                      </label>
                      <div className="flex items-center gap-3">
                        {[1, 2, 3, 4, 5].map((num) => (
                          <button
                            key={num}
                            type="button"
                            onClick={() => setQuantity(num)}
                            className={`flex-1 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                              quantity === num
                                ? 'bg-black text-white'
                                : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                            }`}
                          >
                            {num}
                          </button>
                        ))}
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
                          placeholder="e.g. Maya Sharma"
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
                          placeholder="maya@example.com"
                          className="w-full pl-9 pr-3 py-2.5 text-xs bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:border-neutral-900 focus:bg-white transition-colors"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Summary & Submit */}
                  <div className="pt-3 border-t border-neutral-100 flex items-center justify-between gap-4">
                    <div>
                      <span className="text-[11px] text-neutral-500 block">Total Payable</span>
                      <span className="font-headline font-bold text-xl text-neutral-900">
                        ₹{totalPrice}
                      </span>
                    </div>

                    {/* Black Button */}
                    <button
                      type="submit"
                      id="btn-confirm-tickets-section"
                      className="bg-black hover:bg-neutral-800 text-white font-semibold px-6 py-3.5 rounded-full transition-all text-xs flex items-center gap-2 cursor-pointer shadow-sm active:scale-95"
                    >
                      <span>Confirm & Generate Pass</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
