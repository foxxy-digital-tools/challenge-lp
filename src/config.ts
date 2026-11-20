import { Compass, Search, Send, Store } from 'lucide-react';

export const CHALLENGE_CONFIG = {
  durationDays: 21,
  priceINR: "₹999",
  originalPriceINR: "₹4,999",
  savingsPercent: "80%",
  gstLabel: "Incl. 18% GST • One-Time Cohort Pass",
  cohortLabel: "COHORT 01 // WHATSAPP IMPLEMENTATION",
  seatsLeft: 38,
  totalSeats: 200,
  dailyTimeCommitment: "45 Mins/Day",
  whatsappSupportNumber: "+91 9918991805",
} as const;

export const NAV_ITEMS = [
  { id: 'diagnostics', label: 'Diagnostics' },
  { id: 'curriculum', label: '4-Phase Roadmap' },
  { id: 'comparison', label: 'Comparison' },
  { id: 'coach', label: 'Coach Ravikant' },
  { id: 'enroll', label: 'Cohort Pass' },
  { id: 'faq', label: 'FAQ' },
] as const;

export const PHASES_DATA = [
  {
    num: '01',
    colorTheme: {
      accent: '#D97706',
      tagBg: 'bg-[#FEF3C7] text-[#D97706]',
      border: 'border-[#FCD34D]',
    },
    days: 'DAYS 01–03',
    milestones: 'MILESTONES M1–M2',
    assetType: 'SPREADSHEET TEMPLATE',
    icon: Compass,
    title: 'Direction & Personal Baseline Audit',
    mission: 'Establish your objective starting point. Audit your past 90 days of Reels, isolate your own top outperformers, and define your non-negotiable target audience persona.',
    deliverable: 'Output M1 & M2: Account Direction Card + Personal Baseline Snapshot',
    lensA: {
      badge: 'CREATOR / AUDIENCE LENS',
      focus: 'Find your highest-retention topics and identify which format kept viewers watching past the 3-second drop-off curve for organic discovery.',
      metric: 'Baseline Metric: Median 3-Second Retention & Follower Conversion Rate'
    },
    lensB: {
      badge: 'FOUNDER / COACH LENS',
      focus: 'Pinpoint which past posts brought your most qualified inbound messages and map content pillars to your ideal client buying journey.',
      metric: 'Baseline Metric: Profile Visit-to-DM Ratio & Qualified Inquiry Velocity'
    }
  },
  {
    num: '02',
    colorTheme: {
      accent: '#4F46E5',
      tagBg: 'bg-[#E0E7FF] text-[#4F46E5]',
      border: 'border-[#C7D2FE]',
    },
    days: 'DAYS 04–08',
    milestones: 'MILESTONES M3–M6',
    assetType: 'AI PROMPT PACK & VAULT',
    icon: Search,
    title: '10-Account Outlier Investigation & AI Pattern Decoding',
    mission: 'Identify ~10 comparable niche accounts, isolate 10–15 true statistical outlier Reels (5x–15x their baseline), assemble verbatim transcripts, and extract testable pattern formulas using our supplied AI prompt frameworks.',
    deliverable: 'Output M3–M6: 10-Account Outlier Vault + Decoded Pattern Matrix',
    lensA: {
      badge: 'CREATOR / AUDIENCE LENS',
      focus: 'Decode visual hook cadences, sound pacing, and share-worthy tension arcs that turn casual scrollers into repeat profile visitors.',
      metric: 'Primary Output: 5 High-Retention Visual Hook Structures for Broad Reach'
    },
    lensB: {
      badge: 'FOUNDER / COACH LENS',
      focus: 'Decode authority-building contrast hooks and case-study frameworks that establish credibility without pitching or sounding salesy.',
      metric: 'Primary Output: 5 Authority-Positioning Pattern Blueprints for Inbound Trust'
    }
  },
  {
    num: '03',
    colorTheme: {
      accent: '#EA580C',
      tagBg: 'bg-[#FFEDD5] text-[#EA580C]',
      border: 'border-[#FDBA74]',
    },
    days: 'DAYS 09–15',
    milestones: 'MILESTONES M7–M9a',
    assetType: 'PRODUCTION CHECKLIST & LOG',
    icon: Send,
    title: 'Original Hypothesis Creation & Test Cycle 01',
    mission: 'Translate decoded patterns into 3–4 original hypotheses in your authentic voice (never copying scripts). Script, film, publish Test Batch 1, and log real 48–72hr Instagram distribution telemetry.',
    deliverable: 'Output M7–M9a: Original Test Reels Published + 72h Distribution Signal Log',
    lensA: {
      badge: 'CREATOR / AUDIENCE LENS',
      focus: 'Test 3 different visual hook tempos. Track watch time, saves, and explore-page distribution percentage over 72 real hours.',
      metric: 'Success Signal: Test Reels beating 90-day baseline median by ≥ 2.5x'
    },
    lensB: {
      badge: 'FOUNDER / COACH LENS',
      focus: 'Test 3 problem-awareness hypotheses. Track profile clicks, link bio taps, and unsolicited DM conversations from target buyers.',
      metric: 'Success Signal: High-intent DM interactions & website click velocity'
    }
  },
  {
    num: '04',
    colorTheme: {
      accent: '#059669',
      tagBg: 'bg-[#D1FAE5] text-[#059669]',
      border: 'border-[#A7F3D0]',
    },
    days: 'DAYS 16–21',
    milestones: 'MILESTONES M9b–M11',
    assetType: 'PROFILE FUNNEL BLUEPRINT',
    icon: Store,
    title: 'Opportunity Storefront, Cycle 02 Iteration & Weekly SOP',
    mission: 'Optimize your profile bio, pinned post trust architecture, and next-step CTA. Compare Cycle 1 data against your baseline, iterate a refined Cycle 2 test, and lock in your repeatable weekly content engine.',
    deliverable: 'Output M10–M11: High-Clarity Profile Funnel + Sustainable Weekly Content SOP',
    lensA: {
      badge: 'CREATOR / AUDIENCE LENS',
      focus: 'Turn your profile into a high-converting follower magnet with pinned introductory series, clear bio value proposition, and community prompts.',
      metric: 'Graduation Asset: Weekly 3-Reel Batching SOP + Community Growth Engine'
    },
    lensB: {
      badge: 'FOUNDER / COACH LENS',
      focus: 'Transform your Instagram profile into a frictionless Opportunity Storefront with a high-trust pinned lead asset and clear DM entry point.',
      metric: 'Graduation Asset: Repeatable Client-Acquisition Content SOP (45 Mins/Day)'
    }
  },
];

export const OLD_WAY_POINTS = [
  '40+ hours of generic video lectures that collect digital dust',
  '"Just copy viral audio" advice that ruins your credibility',
  'Forced generic sales scripts that alienate creators without an offer',
  'Zero real-world publishing feedback loop or accountability',
  'Solo self-paced binge watching with 4% average completion rates',
  'Certificate of completion with zero tangible assets produced',
] as const;

export const NEW_WAY_POINTS = [
  'One 45-minute practical daily output with zero theoretical fluff',
  'Supplied AI/LLM prompt frameworks for mathematical pattern extraction',
  'Unified structure that excels for pure reach or high-ticket client inquiries',
  'Two full live publishing & 72-hour Instagram distribution review cycles',
  'Single active WhatsApp cohort with daily verification checkpoints',
  'Graduation with a verified 10-Account Outlier Vault & Weekly Content SOP',
] as const;

export const TESTIMONIALS_DATA = [
  {
    name: "Siddharth Verma",
    role: "Founder & Director",
    company: "GrowthBridge (Gurugram)",
    headline: "From 300 Views to 42,000 Outlier on Day 12",
    metricBeforeAfter: "320 MEDIAN → 42,000 OUTLIER",
    quote: "Before this challenge, I posted daily for three months and never crossed 400 views. Coach Ravikant's 10-account investigation isolated the contrast hook formula in our niche. My test Reel reached 42,000 views and closed 2 high-ticket clients.",
    result: "42K Outlier Views",
    tag: "Consulting Founder"
  },
  {
    name: "Pooja Hegde",
    role: "Head of Marketing",
    company: "CloudScale (Bengaluru)",
    headline: "Beat Our 90-Day Account Baseline by 4.8x",
    metricBeforeAfter: "920 BASELINE → 4,410 AVG VIEWS",
    quote: "The AI Pattern Decoding Matrix cut out 80% of script guesswork. Testing hypotheses in two 72-hour distribution batches gave our team concrete proof of what works. Highest ROI cohort we have taken.",
    result: "4.8x Baseline Growth",
    tag: "Growth Lead"
  },
  {
    name: "Arjun Nair",
    role: "Agency Founder",
    company: "Nair Digital (Mumbai)",
    headline: "4 Qualified Inbound DMs in the First 72 Hours",
    metricBeforeAfter: "0 INBOUND/MO → 4 QUALIFIED DMS IN 72H",
    quote: "Most Instagram advice is about generic dancing or viral audio. Coach Ravikant's Opportunity Storefront framework re-architected my bio and pinned posts. Inbound inquiries turned into real discovery calls without paid ads.",
    result: "4 Client Inquiries",
    tag: "Agency Founder"
  },
  {
    name: "Neha Khurana",
    role: "Executive Coach",
    company: "Leadership Impact (Delhi NCR)",
    headline: "The 45-Min Daily Routine Stopped My Burnout",
    metricBeforeAfter: "22% RETENTION → 68% RETENTION RATE",
    quote: "I was spending 3 hours daily recording random reels with zero traction. Following the 45-minute daily mission gave me absolute structure. My average retention jumped from 22% to 68%.",
    result: "68% Retention Rate",
    tag: "Executive Coach"
  },
  {
    name: "Rohan Kulkarni",
    role: "Strategy Consultant",
    company: "Apex Advisory (Pune)",
    headline: "Landed a ₹85,000 Retainer from Reel #07",
    metricBeforeAfter: "0 BOOKINGS → ₹85,000 RETAINER",
    quote: "The contrast hook framework from Phase 02 positioned me as a distinct authority. A prospect who watched my second test cycle booked a call directly from my profile link and signed an ₹85k retainer.",
    result: "₹85k Retainer",
    tag: "Strategy Consultant"
  },
  {
    name: "Ananya Sen",
    role: "Creative Director",
    company: "Zenith Studio (Hyderabad)",
    headline: "10-Account Outlier Vault Is Pure Gold",
    metricBeforeAfter: "RANDOM POSTING → 3 VALIDATED OUTLIERS",
    quote: "Having the exact spreadsheet to track outlier ratios completely changed how I look at competitors. It is not copying — it is reverse-engineering proven distribution mechanics.",
    result: "3 Viral Outliers",
    tag: "Creative Director"
  }
];

export const INCLUSIONS_DATA = [
  { title: `${CHALLENGE_CONFIG.durationDays} Daily Action Briefs`, desc: 'Step-by-step WhatsApp missions (45 mins/day)', tag: 'CORE' },
  { title: 'Single WhatsApp Implementation Cohort', desc: 'Active accountability with Coach Ravikant review', tag: 'COMMUNITY' },
  { title: '10-Account Outlier Research Spreadsheet', desc: 'Pre-formatted mathematical ratio tracking sheet', tag: 'TEMPLATE' },
  { title: 'AI/LLM Pattern Decoding Prompt Pack', desc: 'Custom prompts to reverse-engineer viral scripts', tag: 'TOOLKIT' },
  { title: 'Universal Profile-to-Opportunity Funnel', desc: 'Positioning framework for audience or clients', tag: 'FRAMEWORK' },
  { title: 'Post-Challenge Repeatable Weekly SOP', desc: 'Your permanent weekly 3-Reel production system', tag: 'SYSTEM' },
];

export const FAQS_DATA = [
  {
    q: "What if I don't have a product or service to sell yet?",
    a: "The challenge features a unified assignment structure. Every daily research and publishing mission is 100% relevant whether you are aiming for pure follower growth or immediate client acquisition. The Goal Lens in Phase 04 simply directs your profile funnel toward future audience depth or private consultation inquiries.",
  },
  {
    q: "Do I need any paid software, AI subscriptions, or complex tools?",
    a: "No. Everything is completed with free tools: your smartphone, Instagram, a basic spreadsheet, and our provided AI prompt pack (compatible with free ChatGPT, Claude, or Gemini). Zero recurring tool subscriptions required.",
  },
  {
    q: "Why 21 days instead of a weekend workshop?",
    a: "Instagram distribution algorithms physically require 48 to 72 hours of live user telemetry before a post settles into explore and feed distribution. Sourcing 10 accounts, testing Batch 1, analyzing 72h data, and testing an iterated Batch 2 physically requires 21 real calendar days. A weekend workshop can only teach theory.",
  },
  {
    q: "Does this guarantee viral Reels or specific revenue figures?",
    a: "No — and anyone making algorithmic guarantees is lying to you. We provide a repeatable, evidence-based decision framework: how to identify outlier patterns, formulate testable hypotheses, and read signal distribution. Your results depend on your execution, niche consistency, and creative iteration.",
  },
  {
    q: "Can I complete this while managing a busy full-time job or business?",
    a: "Yes. Every daily mission is specifically engineered for 45 minutes of practical output. You won't be trapped watching long theoretical lectures. You receive one clear action prompt at 8:00 AM, execute it on your account, and submit your checkpoint before midnight. It easily fits into a lunch break or evening session.",
  },
  {
    q: "How does Coach Ravikant review my account during the cohort?",
    a: "Throughout the 21 days, there are 4 structured milestone checkpoints where Coach Ravikant reviews your 10-Account Outlier Vault, original hypothesis scripts, and 72-hour distribution logs directly inside the WhatsApp cohort, providing direct feedback before you publish each test batch.",
  },
];

