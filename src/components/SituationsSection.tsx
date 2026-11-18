import React from 'react';

const cn = (...classes: (string | boolean | undefined | null)[]) =>
  classes.filter(Boolean).join(' ');

const FlatlineOscilloscope: React.FC = () => (
  <svg viewBox="0 0 200 90" className="w-full h-24" aria-hidden="true">
    {[20, 45, 70].map(y => (
      <line key={y} x1="0" y1={y} x2="200" y2={y} stroke="#E5E4DE" strokeWidth="0.8" />
    ))}
    {[40, 80, 120, 160].map(x => (
      <line key={x} x1={x} y1="0" x2={x} y2="90" stroke="#E5E4DE" strokeWidth="0.8" />
    ))}
    <line x1="0" y1="30" x2="200" y2="30" stroke="#EA580C" strokeWidth="1.2" strokeDasharray="4 3" />
    <rect x="110" y="18" width="85" height="15" rx="3" fill="#FFF7ED" stroke="#FDBA74" strokeWidth="0.8" />
    <text x="115" y="29" fill="#EA580C" fontSize="8" fontFamily="JetBrains Mono, monospace" fontWeight="bold">CEILING: 500 VIEWS</text>
    <path 
      d="M 0 55 Q 12 34 24 55 T 48 55 T 72 38 T 96 58 T 120 40 T 144 56 T 168 42 T 192 55 L 200 55" 
      fill="none" 
      stroke="#71717A" 
      strokeWidth="2" 
      strokeLinecap="round" 
    />
    <circle cx="168" cy="42" r="3" fill="#EA580C" />
  </svg>
);

const OnceSpikeSVG: React.FC = () => (
  <svg viewBox="0 0 200 90" className="w-full h-24" aria-hidden="true">
    {[20, 45, 70].map(y => (
      <line key={y} x1="0" y1={y} x2="200" y2={y} stroke="#E5E4DE" strokeWidth="0.8" />
    ))}
    {[14, 34, 54, 114, 134, 154, 174].map(x => (
      <rect key={x} x={x} y="55" width="12" height="25" fill="#D4D4D0" rx="2" />
    ))}
    <rect x="80" y="10" width="14" height="70" fill="#EA580C" rx="2" />
    <circle cx="87" cy="6" r="3" fill="#EA580C" />
    <line x1="94" y1="30" x2="140" y2="30" stroke="#EA580C" strokeWidth="1" strokeDasharray="3 2" />
    <circle cx="152" cy="30" r="12" fill="#FAF9F6" stroke="#EA580C" strokeWidth="1.5" />
    <text x="148" y="34" fill="#EA580C" fontSize="11" fontFamily="JetBrains Mono, monospace" fontWeight="bold">?</text>
    <rect x="55" y="0" width="64" height="12" rx="2" fill="#FFF7ED" stroke="#FDBA74" strokeWidth="0.8" />
    <text x="59" y="9" fill="#EA580C" fontSize="7" fontFamily="JetBrains Mono, monospace" fontWeight="bold">18.4K SPIKE</text>
  </svg>
);

const FunnelLeakSVG: React.FC = () => (
  <svg viewBox="0 0 200 95" className="w-full h-24" aria-hidden="true">
    <polygon points="30,12 170,12 130,50 70,50" fill="#ECFDF5" stroke="#E5E4DE" strokeWidth="1.2" />
    <polygon points="70,50 130,50 110,80 90,80" fill="#F4F3EE" stroke="#E5E4DE" strokeWidth="1.2" />
    <path d="M 45 32 L 18 48" stroke="#EA580C" strokeWidth="1.5" strokeDasharray="3 2" />
    <polygon points="18,48 24,42 26,50" fill="#EA580C" />
    <path d="M 155 32 L 182 48" stroke="#EA580C" strokeWidth="1.5" strokeDasharray="3 2" />
    <polygon points="182,48 174,50 176,42" fill="#EA580C" />
    <text x="75" y="26" fill="#059669" fontSize="8" fontFamily="JetBrains Mono, monospace" fontWeight="bold">100K+ VIEWS</text>
    <text x="82" y="66" fill="#71717A" fontSize="7" fontFamily="JetBrains Mono, monospace">FOLLOWS</text>
    <rect x="75" y="82" width="50" height="12" rx="3" fill="#FFF7ED" stroke="#FDBA74" strokeWidth="0.8" />
    <text x="79" y="91" fill="#EA580C" fontSize="7" fontFamily="JetBrains Mono, monospace" fontWeight="bold">0 INQUIRIES</text>
  </svg>
);

const situations = [
  {
    pill: 'SITUATION A // REACH PLATEAU',
    badgeColor: 'bg-[#FFF7ED] text-[#EA580C] border-[#FDBA74]',
    diagnosis: 'DIAGNOSIS: Publishing without outlier pattern contrast',
    graphic: <FlatlineOscilloscope />,
    headline: 'I keep posting consistently, but stay stuck at 200–500 views.',
    body: "You try new topics, hooks, and posting times, but effort isn't turning into progress because you lack a structured way to isolate which variables actually trigger distribution signals.",
  },
  {
    pill: 'SITUATION B // THE ONE-HIT MYSTERY',
    badgeColor: 'bg-[#FEF3C7] text-[#D97706] border-[#FCD34D]',
    diagnosis: 'DIAGNOSIS: Accidental hit without a repeatable script formula',
    graphic: <OnceSpikeSVG />,
    headline: 'One Reel exploded once, but I cannot repeat what made it work.',
    body: 'You experienced a sudden spike in views and followers on a past post, yet every Reel after it dropped back to baseline. You had an accidental hit, but no framework to reverse-engineer and re-test the pattern.',
  },
  {
    pill: 'SITUATION C // ATTENTION WITHOUT CONVERSION',
    badgeColor: 'bg-[#EEF2FF] text-[#4F46E5] border-[#C7D2FE]',
    diagnosis: 'DIAGNOSIS: High vanity views leaking through passive bios',
    graphic: <FunnelLeakSVG />,
    headline: 'I have views and followers, but zero paying clients or inquiries.',
    body: "You've built attention, but lack the profile positioning, trust architecture, and intentional calls-to-action that systematically convert casual reel viewers into qualified direct conversations.",
  },
];

export const SituationsSection: React.FC = () => {
  return (
    <section id="diagnostics" className="relative py-12 sm:py-16">
      <div className="px-6 sm:px-10 lg:px-12 mb-10">
        <div className="flex items-center gap-2 mb-3">
          <span className="font-mono text-[10px] text-[#A1A1AA] tracking-[0.08em] uppercase font-semibold">
            [DIAGNOSTIC // 01]
          </span>
          <span className="w-1 h-1 rounded-full bg-[#EA580C]" />
          <span className="font-mono text-[10px] text-[#EA580C] tracking-[0.05em] uppercase font-semibold">
            ROOT CAUSE ANALYSIS
          </span>
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[#09090B] leading-[1.15] max-w-[800px]">
          Three common frustrations. One underlying cause:{' '}
          <span className="font-serif italic font-normal text-[#EA580C]">
            publishing without a structured feedback loop.
          </span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#E5E4DE] border-y border-[#E5E4DE] bg-white">
        {situations.map((sit, i) => (
          <div
            key={i}
            className="p-6 sm:p-8 flex flex-col justify-between hover:bg-[#FAF9F6] transition-colors"
          >
            <div>
              <div className="mb-4">
                <span className={cn('font-mono text-[9px] font-bold px-2.5 py-1 rounded-full border tracking-[0.05em]', sit.badgeColor)}>
                  {sit.pill}
                </span>
              </div>

              <div className="border border-[#E5E4DE] rounded-xl bg-[#FAF9F6] overflow-hidden p-3 mb-5 shadow-xs">
                {sit.graphic}
              </div>

              <div className="mb-2">
                <span className="font-mono text-[9px] font-bold text-[#EA580C] uppercase tracking-wider block">
                  {sit.diagnosis}
                </span>
              </div>

              <h3 className="text-[17px] font-bold tracking-tight text-[#09090B] leading-[1.3] mb-3">
                {sit.headline}
              </h3>

              <p className="text-[13px] text-[#52525B] leading-[1.65]">
                {sit.body}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-[#F4F3EE] flex items-center justify-between font-mono text-[10px] text-[#A1A1AA]">
              <span>RESOLVED IN</span>
              <span className="font-bold text-[#09090B]">
                {i === 0 ? 'PHASE 01 & 02' : i === 1 ? 'PHASE 02 & 03' : 'PHASE 04'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
