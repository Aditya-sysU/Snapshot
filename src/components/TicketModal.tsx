import React, { useState } from 'react';
import { X, Check, Ticket, Sparkles, User, Mail, Phone, Calendar, ArrowRight, ShieldCheck, QrCode, Ruler, Plus, Minus, MessageSquare } from 'lucide-react';
import { SnapshotLogo } from './SnapshotLogo';
import { getEventDateStatus } from '../utils/dateStatus';

interface TicketModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialType?: string;
}

export const TicketModal: React.FC<TicketModalProps> = ({
  isOpen,
  onClose,
  initialType = 'audience',
}) => {
  const [ticketType, setTicketType] = useState<'audience' | 'participant'>(
    initialType === 'participant' ? 'participant' : 'audience'
  );
  const [quantity, setQuantity] = useState<number>(1);
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [height, setHeight] = useState('');
  const [auditionSlot, setAuditionSlot] = useState<'6-sept' | '13-sept'>('6-sept');
  const [isSuccess, setIsSuccess] = useState(false);
  const [confirmedData, setConfirmedData] = useState<any>(null);

  if (!isOpen) return null;

  const unitPrice = ticketType === 'participant' ? 3999 : 200;
  const totalPrice = unitPrice * (ticketType === 'participant' ? 1 : quantity);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone) return;

    const passId = `SNP-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    const details = {
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
    setConfirmedData(details);
    setIsSuccess(true);
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
                SNAPSHOT PASSES
              </h3>
              <p className="text-xs text-neutral-500">Season 2 • Passes & Registration</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-neutral-400 hover:text-black rounded-full hover:bg-neutral-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1">
          {isSuccess && confirmedData ? (
            <div className="text-center py-4 space-y-5">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <Check className="w-7 h-7" />
              </div>

              <div>
                <h4 className="font-syne font-bold text-2xl text-black">Booking Confirmed!</h4>
                <p className="text-xs text-neutral-500 mt-1">
                  Your official pass for SNAPSHOT Season 2 has been generated.
                </p>
              </div>

              {/* Digital Pass Card */}
              <div className="bg-neutral-900 text-white rounded-2xl p-5 text-left relative overflow-hidden border border-neutral-800">
                <div className="flex justify-between items-start border-b border-neutral-800 pb-3 mb-3">
                  <div>
                    <span className="text-[10px] text-neutral-400 uppercase font-semibold">Pass Type</span>
                    <p className="font-syne font-bold text-base text-white capitalize">
                      {confirmedData.ticketType === 'participant' ? 'Participant Registration' : `Audience Pass (${confirmedData.quantity})`}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-neutral-400 uppercase font-semibold">Pass ID</span>
                    <p className="font-mono text-xs text-emerald-400">{confirmedData.passId}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs mb-3">
                  <div>
                    <span className="text-neutral-400 block text-[10px]">Name</span>
                    <span className="font-medium">{confirmedData.fullName}</span>
                  </div>
                  {confirmedData.age && (
                    <div>
                      <span className="text-neutral-400 block text-[10px]">Age</span>
                      <span className="font-medium">{confirmedData.age} yrs</span>
                    </div>
                  )}
                  {confirmedData.height && (
                    <div>
                      <span className="text-neutral-400 block text-[10px]">Height</span>
                      <span className="font-medium">{confirmedData.height}</span>
                    </div>
                  )}
                  <div>
                    <span className="text-neutral-400 block text-[10px]">
                      {confirmedData.ticketType === 'participant' ? 'Audition Slot' : 'Event Date'}
                    </span>
                    <span className="font-medium">{confirmedData.date}</span>
                  </div>
                  <div>
                    <span className="text-neutral-400 block text-[10px]">Venue / Timing</span>
                    <span className="font-medium">12 PM – 6 PM</span>
                  </div>
                  <div>
                    <span className="text-neutral-400 block text-[10px]">Amount Paid</span>
                    <span className="font-bold text-emerald-400">₹{confirmedData.totalPrice}</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-neutral-800 flex items-center justify-between text-[11px] text-neutral-400">
                  <span>Show this digital pass at entry gate.</span>
                  <QrCode className="w-5 h-5 text-white" />
                </div>
              </div>

              <button
                onClick={handleReset}
                className="w-full bg-black text-white py-3 rounded-full font-semibold text-sm hover:bg-neutral-800 transition-all cursor-pointer"
              >
                Close & Return
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Type Switcher */}
              <div className="grid grid-cols-2 gap-2 p-1 bg-neutral-100 rounded-2xl border border-neutral-200">
                <button
                  type="button"
                  onClick={() => setTicketType('audience')}
                  className={`py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    ticketType === 'audience'
                      ? 'bg-black text-white shadow-xs'
                      : 'text-neutral-600 hover:text-black'
                  }`}
                >
                  Audience Pass (₹200)
                </button>
                <button
                  type="button"
                  onClick={() => setTicketType('participant')}
                  className={`py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    ticketType === 'participant'
                      ? 'bg-black text-white shadow-xs'
                      : 'text-neutral-600 hover:text-black'
                  }`}
                >
                  Participant (₹3,999)
                </button>
              </div>

              {/* Category Info */}
              <div className="p-4 rounded-2xl border border-black bg-neutral-50 ring-1 ring-black">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-neutral-900">
                    {ticketType === 'audience' ? 'Audience General Admission' : 'Runway Participant Entry'}
                  </span>
                  <span className="font-brand font-bold text-base text-black">
                    {ticketType === 'audience' ? '₹200' : '₹3,999'}
                  </span>
                </div>
                <p className="text-xs text-neutral-600">
                  {ticketType === 'audience'
                    ? 'Spectator admission to grand 6-hour runway show on 27 September 2026.'
                    : 'Audition slot, professional choreography coaching, styling & grand runway showcase.'}
                </p>
              </div>

              {/* Quantity selector for Audience */}
              {ticketType === 'audience' && (
                <div className="bg-neutral-50 border border-neutral-200 rounded-2xl p-3.5 space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-neutral-700">
                      Pass Quantity:
                    </label>
                    <span className="text-xs text-neutral-500 font-medium">
                      ₹200 × {quantity} = <strong className="text-black font-bold">₹{totalPrice}</strong>
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-2 rounded-lg border border-neutral-300 bg-white hover:bg-neutral-100 cursor-pointer"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-8 text-center font-bold text-sm">{quantity}</span>
                    <button
                      type="button"
                      onClick={() => setQuantity(Math.min(10, quantity + 1))}
                      className="p-2 rounded-lg border border-neutral-300 bg-white hover:bg-neutral-100 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}

              {/* Participant Audition Date choice */}
              {ticketType === 'participant' && (
                <div className="bg-neutral-50 border border-neutral-200 rounded-2xl p-3.5 space-y-2">
                  <label className="block text-xs font-semibold text-neutral-700">
                    Preferred Audition Slot:
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <label className={`flex items-center gap-2 p-2 rounded-xl border text-xs cursor-pointer ${auditionSlot === '6-sept' ? 'border-black bg-white font-semibold' : 'border-neutral-200'}`}>
                      <input
                        type="radio"
                        name="auditionSlot"
                        checked={auditionSlot === '6-sept'}
                        onChange={() => setAuditionSlot('6-sept')}
                        className="accent-black"
                      />
                      <span className="flex items-center gap-1">
                        Audition 1 (6 Sept)
                        {getEventDateStatus('2026-09-06').isLive && (
                          <span className="text-[8px] font-black text-white bg-red-600 px-1 py-0.2 rounded-full animate-pulse">
                            LIVE
                          </span>
                        )}
                      </span>
                    </label>
                    <label className={`flex items-center gap-2 p-2 rounded-xl border text-xs cursor-pointer ${auditionSlot === '13-sept' ? 'border-black bg-white font-semibold' : 'border-neutral-200'}`}>
                      <input
                        type="radio"
                        name="auditionSlot"
                        checked={auditionSlot === '13-sept'}
                        onChange={() => setAuditionSlot('13-sept')}
                        className="accent-black"
                      />
                      <span className="flex items-center gap-1">
                        Audition 2 (13 Sept)
                        {getEventDateStatus('2026-09-13').isLive && (
                          <span className="text-[8px] font-black text-white bg-red-600 px-1 py-0.2 rounded-full animate-pulse">
                            LIVE
                          </span>
                        )}
                      </span>
                    </label>
                  </div>
                </div>
              )}

              {/* User Details */}
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-neutral-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alex Rivera"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 text-sm rounded-xl border border-neutral-200 focus:border-black focus:outline-none bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    WhatsApp / Contact Number *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-neutral-400 absolute left-3 top-3" />
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 text-sm rounded-xl border border-neutral-200 focus:border-black focus:outline-none bg-white"
                    />
                  </div>
                </div>

                {ticketType === 'participant' && (
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 mb-1">
                        Age *
                      </label>
                      <div className="relative">
                        <Calendar className="w-4 h-4 text-neutral-400 absolute left-3 top-3" />
                        <input
                          type="number"
                          min="14"
                          max="60"
                          required
                          placeholder="e.g. 21"
                          value={age}
                          onChange={(e) => setAge(e.target.value)}
                          className="w-full pl-9 pr-3 py-2.5 text-sm rounded-xl border border-neutral-200 focus:border-black focus:outline-none bg-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 mb-1">
                        Height *
                      </label>
                      <div className="relative">
                        <Ruler className="w-4 h-4 text-neutral-400 absolute left-3 top-3" />
                        <input
                          type="text"
                          required
                          placeholder="e.g. 5'8&quot; / 173 cm"
                          value={height}
                          onChange={(e) => setHeight(e.target.value)}
                          className="w-full pl-9 pr-3 py-2.5 text-sm rounded-xl border border-neutral-200 focus:border-black focus:outline-none bg-white"
                        />
                      </div>
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    Email Address (Optional)
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-neutral-400 absolute left-3 top-3" />
                    <input
                      type="email"
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 text-sm rounded-xl border border-neutral-200 focus:border-black focus:outline-none bg-white"
                    />
                  </div>
                </div>
              </div>

              {/* Summary & Submit */}
              <div className="pt-3 border-t border-neutral-100 flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-neutral-400 block font-medium">Total Amount</span>
                  <span className="font-brand font-bold text-xl text-neutral-900">₹{totalPrice}</span>
                </div>

                <button
                  type="submit"
                  className="bg-black hover:bg-neutral-800 text-white text-sm font-semibold px-6 py-3 rounded-full transition-all flex items-center gap-2 cursor-pointer shadow-sm"
                >
                  <span>{ticketType === 'audience' ? 'Book Pass' : 'Register Participant'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
