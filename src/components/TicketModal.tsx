import React, { useState } from 'react';
import { X, Check, Ticket, Sparkles, User, Mail, Phone, Calendar, ArrowRight, ShieldCheck, QrCode } from 'lucide-react';
import { SnapshotLogo } from './SnapshotLogo';

interface TicketModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialType?: 'participant' | 'audience';
}

export const TicketModal: React.FC<TicketModalProps> = ({
  isOpen,
  onClose,
  initialType = 'audience',
}) => {
  const [ticketType, setTicketType] = useState<'participant' | 'audience'>(initialType);
  const [quantity, setQuantity] = useState<number>(1);
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
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
    setConfirmedData({
      passId,
      fullName,
      phone,
      email,
      ticketType,
      quantity: ticketType === 'participant' ? 1 : quantity,
      totalPrice,
      auditionSlot: ticketType === 'participant' ? auditionSlot : null,
      date: ticketType === 'participant' ? (auditionSlot === '6-sept' ? '6 September 2026' : '13 September 2026') : '27 September 2026',
    });
    setIsSuccess(true);
  };

  const handleReset = () => {
    setIsSuccess(false);
    setConfirmedData(null);
    setFullName('');
    setPhone('');
    setEmail('');
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
                SNAPSHOT TICKETS
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

                <div className="grid grid-cols-2 gap-3 text-xs mb-3">
                  <div>
                    <span className="text-neutral-400 block text-[10px]">Name</span>
                    <span className="font-medium">{confirmedData.fullName}</span>
                  </div>
                  <div>
                    <span className="text-neutral-400 block text-[10px]">Date</span>
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
              {/* Type Selection */}
              <div>
                <label className="block text-xs font-bold text-neutral-600 uppercase tracking-wider mb-2">
                  Select Pass Category
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setTicketType('audience')}
                    className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                      ticketType === 'audience'
                        ? 'border-black bg-neutral-50 ring-1 ring-black'
                        : 'border-neutral-200 hover:border-neutral-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-semibold text-neutral-600">Audience</span>
                      <span className="font-brand font-bold text-sm text-black">₹200</span>
                    </div>
                    <p className="text-[11px] text-neutral-500">
                      Full day entry for fashion show on 27 Sept.
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setTicketType('participant')}
                    className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                      ticketType === 'participant'
                        ? 'border-black bg-neutral-50 ring-1 ring-black'
                        : 'border-neutral-200 hover:border-neutral-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-semibold text-neutral-600">Participant</span>
                      <span className="font-brand font-bold text-sm text-black">₹3,999</span>
                    </div>
                    <p className="text-[11px] text-neutral-500">
                      Audition, modeling showcase, photoshoot & ramp walk.
                    </p>
                  </button>
                </div>
              </div>

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
                      <span>Audition 1 (6 Sept)</span>
                    </label>
                    <label className={`flex items-center gap-2 p-2 rounded-xl border text-xs cursor-pointer ${auditionSlot === '13-sept' ? 'border-black bg-white font-semibold' : 'border-neutral-200'}`}>
                      <input
                        type="radio"
                        name="auditionSlot"
                        checked={auditionSlot === '13-sept'}
                        onChange={() => setAuditionSlot('13-sept')}
                        className="accent-black"
                      />
                      <span>Audition 2 (13 Sept)</span>
                    </label>
                  </div>
                </div>
              )}

              {/* Quantity selector for audience */}
              {ticketType === 'audience' && (
                <div className="flex items-center justify-between bg-neutral-50 p-3 rounded-xl border border-neutral-200">
                  <span className="text-xs font-semibold text-neutral-700">Pass Quantity</span>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-7 h-7 rounded-lg bg-white border border-neutral-200 font-bold text-sm flex items-center justify-center hover:bg-neutral-100 cursor-pointer"
                    >
                      -
                    </button>
                    <span className="font-bold text-sm text-neutral-900 w-4 text-center">{quantity}</span>
                    <button
                      type="button"
                      onClick={() => setQuantity(Math.min(10, quantity + 1))}
                      className="w-7 h-7 rounded-lg bg-white border border-neutral-200 font-bold text-sm flex items-center justify-center hover:bg-neutral-100 cursor-pointer"
                    >
                      +
                    </button>
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
                  <span>Confirm Pass</span>
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
