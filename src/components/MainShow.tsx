import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Sparkles, CheckCircle2, Award, Camera, UserCheck } from 'lucide-react';

export const MainShow: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'main' | 'auditions'>('main');

  const auditionDates = [
    {
      phase: 'Audition 01',
      date: '6 September 2026',
      desc: 'First round evaluation: poise, walking posture, outfit presentation, and quick introduction.',
      status: 'Upcoming',
    },
    {
      phase: 'Audition 02',
      date: '13 September 2026',
      desc: 'Second round evaluation: talent showcase, creative concept styling, and final jury callbacks.',
      status: 'Upcoming',
    },
  ];

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
    <section id="main-show-section" className="py-16 sm:py-24 px-6 sm:px-12 md:px-16 lg:px-20 w-full border-t border-neutral-200/50">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4 pb-6 border-b border-neutral-200/70">
        <div>
          <h2
            id="main-show-headline"
            className="font-headline font-bold text-black uppercase tracking-tight"
            style={{ fontSize: '28px' }}
          >
            MAIN SHOW
          </h2>
        </div>
        
        {/* Toggle between Main Event Schedule & Auditions */}
        <div className="flex bg-neutral-100 p-1 rounded-xl border border-neutral-200/80">
          <button
            onClick={() => setActiveTab('main')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              activeTab === 'main'
                ? 'bg-white text-black shadow-xs'
                : 'text-neutral-600 hover:text-black'
            }`}
          >
            27 Sept Main Event
          </button>
          <button
            onClick={() => setActiveTab('auditions')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              activeTab === 'auditions'
                ? 'bg-white text-black shadow-xs'
                : 'text-neutral-600 hover:text-black'
            }`}
          >
            Audition Dates
          </button>
        </div>
      </div>

      {/* Main Event Key Specs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        <div className="bg-white border border-indigo-100/90 rounded-xl p-5 shadow-2xs relative overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r from-indigo-500 to-blue-500" />
          <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wider block mb-1">Event Name</span>
          <p className="font-brand font-bold text-base text-neutral-900">S² Stage Era</p>
        </div>
        <div className="bg-white border border-amber-100/90 rounded-xl p-5 shadow-2xs relative overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r from-amber-500 to-orange-500" />
          <span className="text-xs font-semibold text-amber-600 uppercase tracking-wider block mb-1">Main Event Date</span>
          <p className="font-semibold text-base text-neutral-900">27 September 2026</p>
        </div>
        <div className="bg-white border border-purple-100/90 rounded-xl p-5 shadow-2xs relative overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r from-purple-500 to-fuchsia-500" />
          <span className="text-xs font-semibold text-purple-600 uppercase tracking-wider block mb-1">Timing & Duration</span>
          <p className="font-semibold text-base text-neutral-900">12 PM – 6 PM (6 Hours)</p>
        </div>
        <div className="bg-white border border-emerald-100/90 rounded-xl p-5 shadow-2xs relative overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r from-emerald-500 to-teal-500" />
          <span className="text-xs font-semibold text-emerald-600 uppercase tracking-wider block mb-1">Other Performers</span>
          <p className="font-semibold text-base text-emerald-700">Yes • Included</p>
        </div>
      </div>

      {activeTab === 'main' ? (
        /* Itinerary Timeline */
        <div className="space-y-4">
          {mainSchedule.map((item, idx) => (
            <div
              key={idx}
              className={`idle-card rounded-2xl p-6 sm:p-8 transition-all ${
                item.isHighlight
                  ? 'border-amber-300/80 bg-gradient-to-r from-amber-50/40 via-white to-orange-50/30 ring-1 ring-amber-400/20 shadow-[0_10px_30px_rgba(245,158,11,0.06)]'
                  : ''
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-3">
                  <span className={`font-brand text-xs sm:text-sm font-bold px-3.5 py-1 rounded-full ${
                    item.isHighlight
                      ? 'bg-amber-500 text-white shadow-xs'
                      : 'text-black bg-neutral-100 border border-neutral-200/80'
                  }`}>
                    {item.time}
                  </span>
                  <span className={`text-xs font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-md ${
                    item.tag === 'Main Event'
                      ? 'text-amber-700 bg-amber-100/80'
                      : item.tag === 'Finale'
                      ? 'text-purple-700 bg-purple-50'
                      : item.tag === 'Opening'
                      ? 'text-blue-700 bg-blue-50'
                      : item.tag === 'Wrap Up'
                      ? 'text-rose-700 bg-rose-50'
                      : 'text-neutral-500 bg-neutral-100'
                  }`}>
                    {item.tag}
                  </span>
                </div>
              </div>

              <h3 className="font-syne font-bold text-xl sm:text-2xl text-neutral-900 mb-1">
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
                    <div key={sIdx} className="flex items-center gap-2 text-sm text-neutral-700">
                      <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${item.isHighlight ? 'bg-amber-500' : 'bg-neutral-900'}`} />
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
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {auditionDates.map((aud, idx) => (
              <div key={idx} className="idle-card rounded-2xl p-7 relative overflow-hidden bg-gradient-to-br from-white to-neutral-50/50">
                <div className={`absolute top-0 inset-x-0 h-1 bg-gradient-to-r ${idx === 0 ? 'from-rose-500 to-amber-500' : 'from-indigo-500 to-purple-500'}`} />
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold font-brand text-neutral-800 bg-neutral-100 px-3.5 py-1 rounded-full border border-neutral-200/60">
                    {aud.phase}
                  </span>
                  <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200/80 px-3 py-1 rounded-full">
                    {aud.status}
                  </span>
                </div>
                <h3 className="font-syne font-bold text-2xl sm:text-3xl text-black mb-2">
                  {aud.date}
                </h3>
                <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
                  {aud.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="bg-indigo-50/50 border border-indigo-100 rounded-2xl p-6 sm:p-7 flex items-start gap-4">
            <UserCheck className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-syne font-bold text-base sm:text-lg text-indigo-950 mb-1">
                Final Selection Criteria
              </h4>
              <p className="text-indigo-900/80 text-sm sm:text-base leading-relaxed">
                After the auditions on 6 September and 13 September, final participants and models will be selected to take the runway on 27 September 2026 for S² Stage Era.
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
