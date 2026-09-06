import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Sparkles, CheckCircle2, Award, Camera, UserCheck } from 'lucide-react';
import { getEventDateStatus } from '../utils/dateStatus';

export const MainShow: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'main' | 'auditions'>('main');

  const auditionDates = [
    {
      phase: 'Audition 01',
      date: '6 September 2026',
      isoDate: '2026-09-06',
      desc: 'First round evaluation: poise, walking posture, outfit presentation, and quick introduction.',
    },
    {
      phase: 'Audition 02',
      date: '13 September 2026',
      isoDate: '2026-09-13',
      desc: 'Second round evaluation: talent showcase, creative concept styling, and final jury callbacks.',
    },
  ];

  const mainEventStatus = getEventDateStatus('2026-09-27');
  const audition1Status = getEventDateStatus('2026-09-06');
  const audition2Status = getEventDateStatus('2026-09-13');
  const isAnyAuditionLive = audition1Status.isLive || audition2Status.isLive;

  const mainSchedule = [
    {
      time: '12:00 PM',
      title: 'Entry & Registration',
      subtitle: 'Participants & Audience Arrival',
      details: 'Gate check-in, pass verification, backstage badge collection for models, and VIP guest seating.',
      tag: 'Check-In',
    },
    {
      time: '12:30 PM onwards',
      title: 'Event Opening & Introduction',
      subtitle: 'Host & Grand Welcome Announcements',
      details: 'Opening audiovisual ceremony, welcoming address by hosts, jury panel introduction, and show overview.',
      tag: 'Opening',
    },
    {
      time: '01:30 PM – 04:30 PM',
      title: 'MAIN SHOW',
      subtitle: 'Runway & Creative Showcases',
      items: [
        'Fashion Presentation (Ethnic, Fusion & Western)',
        'Modelling & Ramp Walk',
        'Participant Showcases',
        'Other Live Performances & Music',
        'Special Talent / Hobby Showcases',
        'Sponsor & Brand Mentions',
      ],
      tag: 'Main Event',
      isHighlight: true,
    },
    {
      time: '04:30 PM – 05:15 PM',
      title: 'FINAL SEGMENT',
      subtitle: 'Grand Finale Runway & Jury Recognition',
      items: [
        'Final Walk & Haute Couture Presentation',
        'Winners & Talent Recognition',
        'Editorial Photos & Video Captures',
      ],
      tag: 'Finale',
    },
    {
      time: '05:15 PM – 06:00 PM',
      title: 'EVENT CLOSING',
      subtitle: 'Awards, Acknowledgement & BTS',
      items: [
        'Winners & Participants Official Announcement',
        'Certificates & Prizes Distribution',
        'Sponsor Acknowledgement & Felicitation',
        'Group Photography on Stage',
        'Behind-The-Scenes (BTS) Content Wrap',
      ],
      tag: 'Wrap Up',
    },
  ];

  return (
    <section id="main-show-section" className="py-16 sm:py-24 px-6 sm:px-12 md:px-16 lg:px-20 w-full bg-[#6F8E8A] text-white relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#4A6561]/40 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

      {/* Section Header */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4 pb-6 border-b border-white/20">
        <div>
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#F5C042] bg-black/25 px-3.5 py-1 rounded-full mb-3 border border-[#F5C042]/40 backdrop-blur-sm">
            Runway & Auditions Timeline
          </span>
          <h2
            id="main-show-headline"
            className="font-headline font-black text-[#F5C042] uppercase tracking-tight"
            style={{ fontSize: '34px' }}
          >
            MAIN SHOW
          </h2>
          <p className="text-white/90 text-sm mt-1 max-w-lg">
            Complete schedule for both the 27 September grand event and preliminary model auditions.
          </p>
        </div>
        
        {/* Toggle between Main Event Schedule & Auditions */}
        <div className="flex bg-[#4A6561]/60 p-1.5 rounded-2xl border border-white/20 backdrop-blur-md">
          <button
            onClick={() => setActiveTab('main')}
            className={`px-4 py-2.5 text-xs font-extrabold rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'main'
                ? 'bg-[#F5C042] text-neutral-950 shadow-md scale-100'
                : 'text-white/80 hover:text-white hover:bg-white/10'
            }`}
          >
            <span>27 Sept Main Event</span>
            {mainEventStatus.isLive && (
              <span className="inline-flex items-center gap-1 text-[9px] font-black text-white bg-red-600 px-1.5 py-0.5 rounded-full shadow-xs animate-pulse">
                <span className="w-1 h-1 rounded-full bg-white animate-ping" />
                LIVE
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('auditions')}
            className={`px-4 py-2.5 text-xs font-extrabold rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'auditions'
                ? 'bg-[#F5C042] text-neutral-950 shadow-md scale-100'
                : 'text-white/80 hover:text-white hover:bg-white/10'
            }`}
          >
            <span>Audition Dates</span>
            {isAnyAuditionLive && (
              <span className="inline-flex items-center gap-1 text-[9px] font-black text-white bg-red-600 px-1.5 py-0.5 rounded-full shadow-xs animate-pulse">
                <span className="w-1 h-1 rounded-full bg-white animate-ping" />
                LIVE
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Main Event Key Specs */}
      <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        <div className="bg-white rounded-2xl p-5 shadow-xl border border-white/90 relative overflow-hidden group hover:-translate-y-1 hover:shadow-2xl hover:border-[#6F8E8A]/40 transition-all duration-300">
          <div className="absolute top-0 inset-x-0 h-1 bg-[#6F8E8A]" />
          <div className="w-9 h-9 rounded-xl bg-[#6F8E8A]/10 text-[#6F8E8A] flex items-center justify-center mb-3 group-hover:bg-[#6F8E8A] group-hover:text-white transition-colors">
            <Sparkles className="w-4 h-4" />
          </div>
          <span className="text-[11px] font-bold text-[#6F8E8A] uppercase tracking-wider block mb-0.5">Event Name</span>
          <p className="font-brand font-black text-base text-neutral-950">S² Stage Era</p>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-xl border border-white/90 relative overflow-hidden group hover:-translate-y-1 hover:shadow-2xl hover:border-[#6F8E8A]/40 transition-all duration-300">
          <div className="absolute top-0 inset-x-0 h-1 bg-[#6F8E8A]" />
          <div className="w-9 h-9 rounded-xl bg-[#6F8E8A]/10 text-[#6F8E8A] flex items-center justify-center mb-3 group-hover:bg-[#6F8E8A] group-hover:text-white transition-colors">
            <Calendar className="w-4 h-4" />
          </div>
          <div className="flex items-center justify-between mb-0.5">
            <span className="text-[11px] font-bold text-[#6F8E8A] uppercase tracking-wider block">Main Event Date</span>
            {mainEventStatus.isLive ? (
              <span className="inline-flex items-center gap-1 text-[10px] font-black text-white bg-red-600 px-2 py-0.5 rounded-full shadow-xs animate-pulse">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-white"></span>
                </span>
                LIVE
              </span>
            ) : mainEventStatus.isUpcoming ? (
              <span className="text-[10px] font-bold text-[#4C6864] bg-[#6F8E8A]/15 border border-[#6F8E8A]/30 px-2 py-0.5 rounded-full">
                Upcoming
              </span>
            ) : (
              <span className="text-[10px] font-medium text-neutral-500 bg-neutral-100 px-2 py-0.5 rounded-full">
                Completed
              </span>
            )}
          </div>
          <p className="font-bold text-base text-neutral-950">27 September 2026</p>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-xl border border-white/90 relative overflow-hidden group hover:-translate-y-1 hover:shadow-2xl hover:border-[#6F8E8A]/40 transition-all duration-300">
          <div className="absolute top-0 inset-x-0 h-1 bg-[#6F8E8A]" />
          <div className="w-9 h-9 rounded-xl bg-[#6F8E8A]/10 text-[#6F8E8A] flex items-center justify-center mb-3 group-hover:bg-[#6F8E8A] group-hover:text-white transition-colors">
            <Clock className="w-4 h-4" />
          </div>
          <span className="text-[11px] font-bold text-[#6F8E8A] uppercase tracking-wider block mb-0.5">Timing & Duration</span>
          <p className="font-bold text-base text-neutral-950">12 PM – 6 PM (6 Hours)</p>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-xl border border-white/90 relative overflow-hidden group hover:-translate-y-1 hover:shadow-2xl hover:border-[#6F8E8A]/40 transition-all duration-300">
          <div className="absolute top-0 inset-x-0 h-1 bg-[#6F8E8A]" />
          <div className="w-9 h-9 rounded-xl bg-[#6F8E8A]/10 text-[#6F8E8A] flex items-center justify-center mb-3 group-hover:bg-[#6F8E8A] group-hover:text-white transition-colors">
            <Award className="w-4 h-4" />
          </div>
          <span className="text-[11px] font-bold text-[#6F8E8A] uppercase tracking-wider block mb-0.5">Other Performers</span>
          <p className="font-bold text-base text-[#6F8E8A]">Yes • Included</p>
        </div>
      </div>

      {activeTab === 'main' ? (
        /* Itinerary Timeline */
        <div className="relative z-10 space-y-4">
          {mainSchedule.map((item, idx) => (
            <div
              key={idx}
              className={`rounded-2xl p-6 sm:p-8 transition-all bg-white text-neutral-900 shadow-xl border ${
                item.isHighlight
                  ? 'border-2 border-[#6F8E8A] bg-gradient-to-br from-white via-[#6F8E8A]/5 to-white ring-4 ring-[#6F8E8A]/20 shadow-2xl'
                  : 'border-white/80 hover:border-[#6F8E8A]/30'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-3">
                  <span className={`font-brand text-xs sm:text-sm font-bold px-3.5 py-1 rounded-full ${
                    item.isHighlight
                      ? 'bg-[#6F8E8A] text-white shadow-md shadow-[#6F8E8A]/30 flex items-center gap-1.5'
                      : 'text-[#4C6864] bg-[#6F8E8A]/15 border border-[#6F8E8A]/30 font-semibold'
                  }`}>
                    {item.isHighlight && <Sparkles className="w-3.5 h-3.5" />}
                    <span>{item.time}</span>
                  </span>
                  <span className={`text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-md ${
                    item.tag === 'Main Event'
                      ? 'text-[#4C6864] bg-[#6F8E8A]/20 border border-[#6F8E8A]/30'
                      : item.tag === 'Finale'
                      ? 'text-[#3E5652] bg-[#6F8E8A]/25 border border-[#6F8E8A]/30 font-bold'
                      : 'text-[#4C6864] bg-[#6F8E8A]/10 border border-[#6F8E8A]/20'
                  }`}>
                    {item.tag}
                  </span>
                </div>
              </div>

              <h3 className="font-syne font-bold text-xl sm:text-2xl text-neutral-950 mb-1">
                {item.title}
              </h3>
              <p className="text-neutral-500 text-sm sm:text-base font-medium mb-3">
                {item.subtitle}
              </p>

              {item.details && (
                <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
                  {item.details}
                </p>
              )}

              {item.items && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mt-4 pt-4 border-t border-neutral-100">
                  {item.items.map((sub, sIdx) => (
                    <div key={sIdx} className="flex items-center gap-2 text-sm text-neutral-800 font-medium">
                      {item.isHighlight ? (
                        <CheckCircle2 className="w-4 h-4 text-[#6F8E8A] shrink-0" />
                      ) : (
                        <div className="w-1.5 h-1.5 rounded-full shrink-0 bg-[#6F8E8A]" />
                      )}
                      <span>{sub}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        /* Auditions Section */
        <div className="relative z-10 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {auditionDates.map((aud, idx) => {
              const statusInfo = getEventDateStatus(aud.isoDate);
              return (
                <div
                  key={idx}
                  className="rounded-2xl p-7 relative overflow-hidden bg-white text-neutral-900 shadow-xl border border-white/90 hover:border-[#6F8E8A]/40 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group"
                >
                  <div className={`absolute top-0 inset-x-0 h-1.5 ${statusInfo.isLive ? 'bg-red-500' : 'bg-[#6F8E8A]'}`} />
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold font-brand text-white bg-[#6F8E8A] px-3.5 py-1 rounded-full shadow-xs">
                      {aud.phase}
                    </span>
                    {statusInfo.isLive ? (
                      <span className="inline-flex items-center gap-1.5 text-xs font-black text-white bg-red-600 border border-red-500 px-3.5 py-1 rounded-full shadow-md animate-pulse">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                        </span>
                        LIVE
                      </span>
                    ) : statusInfo.isUpcoming ? (
                      <span className="text-xs font-bold text-[#4C6864] bg-[#6F8E8A]/15 border border-[#6F8E8A]/30 px-3 py-1 rounded-full">
                        Upcoming
                      </span>
                    ) : (
                      <span className="text-xs font-medium text-neutral-500 bg-neutral-100 border border-neutral-200 px-3 py-1 rounded-full">
                        Completed
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className={`w-5 h-5 ${statusInfo.isLive ? 'text-red-600' : 'text-[#6F8E8A]'}`} />
                    <h3 className="font-syne font-black text-2xl sm:text-3xl text-neutral-950">
                      {aud.date}
                    </h3>
                  </div>
                  <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
                    {aud.desc}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="bg-black/15 backdrop-blur-md border border-white/25 rounded-2xl p-6 sm:p-7 flex items-start gap-4 shadow-lg text-white">
            <UserCheck className="w-6 h-6 text-white shrink-0 mt-0.5" />
            <div>
              <h4 className="font-syne font-bold text-base sm:text-lg text-white mb-1">
                Final Selection Criteria
              </h4>
              <p className="text-white/90 text-sm sm:text-base leading-relaxed">
                After the auditions on 6 September and 13 September, final participants and models will be selected to take the runway on 27 September 2026 for S² Stage Era.
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
