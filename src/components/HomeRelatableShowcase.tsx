import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Landmark,
  Zap,
  Shield,
  Crown,
  Sparkles,
  ArrowRight,
  Calendar,
  Users,
  CheckCircle2,
  Globe,
  Award,
  FileText,
  Clock,
  MapPin,
  ChevronRight,
  Scroll,
  Scale,
  Compass
} from 'lucide-react';
import { soundEngine } from '../utils/audio';

interface HomeRelatableShowcaseProps {
  onOpenApply: (committeeId?: string) => void;
  onSelectSection: (sectionId: string) => void;
}

const DELEGATE_HIGHLIGHTS = [
  {
    id: 'decorum',
    icon: Landmark,
    title: 'Authentic Statutory Decorum',
    tagline: 'Beyond Superficial Speeches',
    description: 'Experience real parliamentary procedure, statutory clause amendments, and rigorous legislative debates modeled after sovereign chambers.',
    color: '#C9A34E',
    glowColor: 'rgba(201, 163, 78, 0.25)',
  },
  {
    id: 'crisis',
    icon: Zap,
    title: 'Live Crisis Simulation',
    tagline: 'Real-Time Intelligence Feeds',
    description: 'Navigate unscripted press leaks, emergency intelligence directives, and high-stakes crisis warfare requiring split-second strategic diplomacy.',
    color: '#9B6BFF',
    glowColor: 'rgba(155, 107, 255, 0.25)',
  },
  {
    id: 'eb',
    icon: Crown,
    title: 'World-Class Executive Moderation',
    tagline: 'Mentorship from Seasoned Chairs',
    description: 'Engage with top-tier Executive Boards who provide continuous constructive guidance, procedural clarity, and impartial assessment.',
    color: '#C9A34E',
    glowColor: 'rgba(201, 163, 78, 0.25)',
  },
  {
    id: 'distinction',
    icon: Award,
    title: 'Verified Portfolio & Distinction',
    tagline: 'Institutional Recognition',
    description: 'Claim your digital delegate pass, receive verified participation credentials, and compete for coveted Best Delegate and High Recommendation awards.',
    color: '#E6DEFF',
    glowColor: 'rgba(230, 222, 255, 0.25)',
  },
];

const SOVEREIGN_CHAMBERS_PREVIEW = [
  {
    id: 'lok-sabha',
    title: 'Lok Sabha',
    category: 'Indian Constitutional & Legislative Assembly',
    agenda: 'Formulating Statutory Safeguards on National Cyber Sovereignty & Electoral Integrity.',
    accent: '#C9A34E',
  },
  {
    id: 'crisis-committee',
    title: 'Continuous Crisis Committee',
    category: 'Historical & Geopolitical Intelligence Operations',
    agenda: 'Mitigating Multilateral Escalation during Indo-Pacific Maritime & Territorial Flashpoints.',
    accent: '#9B6BFF',
  },
  {
    id: 'un-women',
    title: 'UN Women',
    category: 'International Human Rights & Legal Frameworks',
    agenda: 'Institutionalizing Gender-Responsive Legal Protections in Post-Conflict Zones.',
    accent: '#4B2D8A',
  },
  {
    id: 'jkla-eb',
    title: 'Joint Legal Assembly & EB',
    category: 'Jurisprudence & Statutory Synthesis',
    agenda: 'Synthesizing International Law Protocols with National Constitutional Doctrines.',
    accent: '#8A6743',
  },
];

const ASSEMBLY_TIMELINE = [
  {
    day: 'Day 01',
    phase: 'Invocation & Diplomatic Plenary',
    details: 'Delegate Registration, Opening Keynote, Press Briefing & First Committee Session',
  },
  {
    day: 'Day 02',
    phase: 'Substantive Negotiations & Crisis Directive',
    details: 'Unmoderated Caucuses, Working Paper Submissions & Emergency Directive Response',
  },
  {
    day: 'Day 03',
    phase: 'Statutory Voting & Valedictory Gala',
    details: 'Draft Resolution Voting, Executive Moderation Review & Grand Award Ceremony',
  },
];

export const HomeRelatableShowcase: React.FC<HomeRelatableShowcaseProps> = ({
  onOpenApply,
  onSelectSection,
}) => {
  const [activeTab, setActiveTab] = useState<'pillars' | 'chambers' | 'schedule'>('pillars');

  return (
    <section className="relative py-28 md:py-36 bg-[#141414] overflow-hidden border-t border-[#C9A34E]/30">
      {/* VIVID CELESTIAL BACKGROUND ARTWORK & ANIMATED ILLUSTRATIONS */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-90">
        {/* Animated Radiant Nebulae Spotlight Orbs */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[1100px] h-[1100px] bg-radial-gradient from-[#4B2D8A]/45 via-[#C9A34E]/20 to-transparent rounded-full blur-[160px] animate-float-orb-1" />
        <div className="absolute top-[-100px] left-[-100px] w-[800px] h-[800px] bg-[#C9A34E]/25 rounded-full blur-[140px] animate-float-orb-2" />
        <div className="absolute bottom-[-100px] right-[-100px] w-[850px] h-[850px] bg-[#9B6BFF]/30 rounded-full blur-[150px] animate-float-orb-3" />

        {/* Shimmering Lattice Grid Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(#C9A34E_1.2px,transparent_1.2px)] [background-size:36px_36px] animate-shimmer-grid" />

        {/* Sweeping Laser Light Beams */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#C9A34E]/20 to-transparent h-1 w-full animate-beam top-1/4" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#9B6BFF]/25 to-transparent h-1 w-full animate-beam top-3/4" style={{ animationDelay: '6s' }} />

        {/* High-Contrast Sacred Geometry & Celestial Globe Vector Illustration */}
        <svg
          className="w-full h-full text-[#C9A34E]"
          viewBox="0 0 1200 900"
          preserveAspectRatio="xMidYMid slice"
          fill="none"
        >
          {/* Dual Rotating Concentric Circles */}
          <circle
            cx="600"
            cy="450"
            r="480"
            stroke="#C9A34E"
            strokeWidth="2.5"
            strokeDasharray="14 18"
            className="animate-[spin_60s_linear_infinite] opacity-75"
          />
          <circle
            cx="600"
            cy="450"
            r="380"
            stroke="#4B2D8A"
            strokeWidth="3"
            strokeDasharray="10 14"
            className="animate-[spin_40s_linear_infinite_reverse] opacity-80"
          />
          <circle
            cx="600"
            cy="450"
            r="280"
            stroke="#C9A34E"
            strokeWidth="1.8"
            className="animate-[spin_25s_linear_infinite] opacity-65"
          />

          {/* Central Pulsing 8-Pointed Starburst */}
          <g className="animate-pulse-glow origin-center">
            <polygon
              points="600,270 630,420 780,450 630,480 600,630 570,480 420,450 570,420"
              fill="none"
              stroke="url(#showcaseGoldStar)"
              strokeWidth="2"
              className="opacity-50"
            />
          </g>

          {/* Celestial Latitude & Longitude Vectors */}
          <ellipse cx="600" cy="450" rx="550" ry="220" stroke="#C9A34E" strokeWidth="1" strokeOpacity="0.4" className="animate-[spin_90s_linear_infinite]" />
          <ellipse cx="600" cy="450" rx="420" ry="320" stroke="#9B6BFF" strokeWidth="1.2" strokeOpacity="0.5" className="animate-[spin_70s_linear_infinite_reverse]" />

          {/* Gradients */}
          <defs>
            <linearGradient id="showcaseGoldStar" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#C9A34E" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#9B6BFF" stopOpacity="0.4" />
            </linearGradient>
          </defs>

          {/* Constellation Nodes */}
          {[
            [180, 200], [1020, 200], [180, 700], [1020, 700],
            [600, 100], [600, 800], [100, 450], [1100, 450]
          ].map(([cx, cy], i) => (
            <g key={i}>
              <circle cx={cx} cy={cy} r="6" fill="#C9A34E" className="animate-ping opacity-75" />
              <circle cx={cx} cy={cy} r="3" fill="#F5F3ED" />
              <line x1={cx} y1={cy} x2="600" y2="450" stroke={i % 2 === 0 ? "#C9A34E" : "#9B6BFF"} strokeWidth="0.5" strokeOpacity="0.3" />
            </g>
          ))}
        </svg>

        {/* Floating Animated Illustrative Vector Emblems */}
        <motion.div
          animate={{ y: [0, -18, 0], rotate: [0, 8, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-24 left-16 w-24 h-24 border-2 border-[#C9A34E]/40 rounded-full flex items-center justify-center bg-[#141414]/60 backdrop-blur-md shadow-[0_0_30px_rgba(201,163,78,0.25)]"
        >
          <Scale className="w-10 h-10 text-[#C9A34E]" />
        </motion.div>

        <motion.div
          animate={{ y: [0, 20, 0], rotate: [0, -8, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute bottom-28 right-20 w-28 h-28 border-2 border-[#9B6BFF]/40 rounded-full flex items-center justify-center bg-[#141414]/60 backdrop-blur-md shadow-[0_0_35px_rgba(155,107,255,0.3)]"
        >
          <Crown className="w-12 h-12 text-[#9B6BFF]" />
        </motion.div>

        <motion.div
          animate={{ y: [0, -15, 0], scale: [1, 1.08, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute top-1/3 right-12 w-20 h-20 border border-[#C9A34E]/30 rounded-full flex items-center justify-center bg-[#141414]/50 backdrop-blur-sm"
        >
          <Compass className="w-8 h-8 text-[#C9A34E]/80" />
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#4B2D8A]/30 border border-[#C9A34E]/50 rounded-full mb-4 shadow-[0_0_25px_rgba(201,163,78,0.25)]">
            <Sparkles className="w-4 h-4 text-[#C9A34E] animate-pulse" />
            <span className="font-label-caps text-xs text-[#C9A34E] tracking-[0.25em] uppercase font-bold">
              The Delegate Experience
            </span>
          </div>

          <h2 className="font-serif-luxury text-3xl sm:text-5xl text-[#F5F3ED] font-bold text-glow-gold mb-6 leading-tight">
            Why Aequitas × Aastitva Stands Apart
          </h2>
          <p className="font-sans text-base text-[#D9D7D2]/90 font-light leading-relaxed">
            Designed for passionate parliamentarians, strategists, and diplomats seeking authentic parliamentary decorum, intense crisis warfare, and institutional distinction.
          </p>

          {/* Interactive Showcase Navigation Switcher */}
          <div className="mt-8 inline-flex p-1.5 bg-[#0E0E0E] border-2 border-[#C9A34E]/50 rounded-none shadow-[0_0_30px_rgba(0,0,0,0.8)] backdrop-blur-xl">
            <button
              onClick={() => {
                soundEngine.playClick();
                setActiveTab('pillars');
              }}
              className={`px-5 py-2.5 font-label-caps text-xs tracking-wider uppercase font-bold transition-all duration-300 ${
                activeTab === 'pillars'
                  ? 'bg-[#C9A34E] text-[#141414] shadow-[0_0_20px_rgba(201,163,78,0.5)] border border-[#F5F3ED]'
                  : 'text-[#D9D7D2]/80 hover:text-[#F5F3ED]'
              }`}
            >
              Core Pillars
            </button>
            <button
              onClick={() => {
                soundEngine.playClick();
                setActiveTab('chambers');
              }}
              className={`px-5 py-2.5 font-label-caps text-xs tracking-wider uppercase font-bold transition-all duration-300 ${
                activeTab === 'chambers'
                  ? 'bg-[#C9A34E] text-[#141414] shadow-[0_0_20px_rgba(201,163,78,0.5)] border border-[#F5F3ED]'
                  : 'text-[#D9D7D2]/80 hover:text-[#F5F3ED]'
              }`}
            >
              Chambers Spotlight
            </button>
            <button
              onClick={() => {
                soundEngine.playClick();
                setActiveTab('schedule');
              }}
              className={`px-5 py-2.5 font-label-caps text-xs tracking-wider uppercase font-bold transition-all duration-300 ${
                activeTab === 'schedule'
                  ? 'bg-[#C9A34E] text-[#141414] shadow-[0_0_20px_rgba(201,163,78,0.5)] border border-[#F5F3ED]'
                  : 'text-[#D9D7D2]/80 hover:text-[#F5F3ED]'
              }`}
            >
              Assembly Itinerary
            </button>
          </div>
        </div>

        {/* TAB CONTENT SWITCHER WITH SMOOTH ANIMATIONS */}
        <AnimatePresence mode="wait">
          {/* TAB 1: CORE PILLARS SHOWCASE */}
          {activeTab === 'pillars' && (
            <motion.div
              key="pillars"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {DELEGATE_HIGHLIGHTS.map((item, idx) => {
                const IconComp = item.icon;
                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1, duration: 0.5 }}
                    onMouseEnter={() => soundEngine.playHover()}
                    className="glass-panel p-8 border border-[#C9A34E]/40 bg-[#141414]/95 hover:border-[#C9A34E] relative group transition-all duration-500 hover:shadow-[0_20px_50px_rgba(201,163,78,0.3)] flex flex-col justify-between"
                  >
                    <div>
                      <div
                        className="w-14 h-14 mb-6 flex items-center justify-center bg-[#0E0E0E] border-2 border-[#C9A34E] group-hover:scale-110 transition-transform shadow-[0_0_20px_rgba(201,163,78,0.3)]"
                        style={{ boxShadow: `0 0 25px ${item.glowColor}` }}
                      >
                        <IconComp className="w-7 h-7" style={{ color: item.color }} />
                      </div>

                      <span className="font-label-caps text-[10px] text-[#C9A34E] tracking-widest uppercase font-bold block mb-1">
                        {item.tagline}
                      </span>
                      <h3 className="font-serif-luxury text-xl font-bold text-[#F5F3ED] mb-3 group-hover:text-[#C9A34E] transition-colors">
                        {item.title}
                      </h3>
                      <p className="font-sans text-xs text-[#D9D7D2]/90 font-light leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    <div className="pt-6 mt-6 border-t border-white/15 flex items-center justify-between">
                      <span className="font-mono text-[10px] text-[#C9A34E] uppercase font-bold tracking-wider">
                        Pillar 0{idx + 1}
                      </span>
                      <button
                        onClick={() => onSelectSection('experiences')}
                        className="text-xs text-[#F5F3ED] group-hover:text-[#C9A34E] flex items-center gap-1 font-semibold transition-colors"
                      >
                        Explore <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          )}

          {/* TAB 2: CHAMBERS SPOTLIGHT PREVIEW */}
          {activeTab === 'chambers' && (
            <motion.div
              key="chambers"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {SOVEREIGN_CHAMBERS_PREVIEW.map((chamber, idx) => (
                <motion.div
                  key={chamber.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                  className="glass-panel p-8 border-2 border-[#C9A34E]/40 bg-[#141414]/95 relative overflow-hidden group hover:border-[#C9A34E] transition-all shadow-[0_0_35px_rgba(0,0,0,0.85)] hover:shadow-[0_15px_45px_rgba(201,163,78,0.25)]"
                >
                  <div className="flex items-start justify-between mb-4">
                    <span className="font-label-caps text-xs text-[#C9A34E] tracking-widest uppercase font-bold">
                      {chamber.category}
                    </span>
                    <div className="px-3 py-1 bg-[#4B2D8A]/40 border border-[#4B2D8A] text-[#E6DEFF] font-label-caps text-[9px] uppercase tracking-wider font-semibold shadow-[0_0_10px_rgba(75,45,138,0.3)]">
                      Applications Open
                    </div>
                  </div>

                  <h3 className="font-serif-luxury text-2xl md:text-3xl font-bold text-[#F5F3ED] mb-3 group-hover:text-[#C9A34E] transition-colors">
                    {chamber.title}
                  </h3>
                  <p className="font-sans text-xs text-[#D9D7D2]/90 leading-relaxed mb-6 font-light">
                    <strong className="text-[#C9A34E] font-semibold">Key Agenda: </strong>
                    {chamber.agenda}
                  </p>

                  <div className="flex items-center justify-between pt-5 border-t border-white/15">
                    <button
                      onClick={() => onSelectSection('committees')}
                      className="font-label-caps text-xs text-[#D9D7D2] hover:text-[#C9A34E] transition-colors font-semibold"
                    >
                      View Chamber Details →
                    </button>

                    <button
                      onClick={() => onOpenApply(chamber.id)}
                      onMouseEnter={() => soundEngine.playHover()}
                      className="px-6 py-2.5 bg-gradient-to-r from-[#4B2D8A] via-[#351E63] to-[#C9A34E] text-[#F5F3ED] font-label-caps text-[11px] tracking-wider uppercase font-bold border border-[#C9A34E] shadow-[0_0_20px_rgba(201,163,78,0.35)] hover:scale-105 transition-all"
                    >
                      Claim Stance
                    </button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* TAB 3: ASSEMBLY ITINERARY TIMELINE */}
          {activeTab === 'schedule' && (
            <motion.div
              key="schedule"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="max-w-4xl mx-auto space-y-6"
            >
              {ASSEMBLY_TIMELINE.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.12, duration: 0.5 }}
                  className="glass-panel p-6 md:p-8 border-2 border-[#C9A34E]/40 bg-[#141414]/95 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:border-[#C9A34E] transition-all shadow-[0_0_30px_rgba(0,0,0,0.85)] hover:shadow-[0_10px_35px_rgba(201,163,78,0.2)]"
                >
                  <div className="flex items-center gap-5">
                    <div className="px-4 py-3 bg-[#0E0E0E] border-2 border-[#C9A34E] text-[#C9A34E] font-serif-luxury font-bold text-xl shadow-[0_0_20px_rgba(201,163,78,0.35)] shrink-0">
                      {item.day}
                    </div>

                    <div>
                      <h4 className="font-serif-luxury text-xl font-bold text-[#F5F3ED]">
                        {item.phase}
                      </h4>
                      <p className="font-sans text-xs text-[#D9D7D2]/85 mt-1 font-light leading-relaxed">
                        {item.details}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs font-label-caps text-[#C9A34E] bg-[#C9A34E]/15 border border-[#C9A34E]/40 px-4 py-2 shrink-0 uppercase tracking-wider font-semibold shadow-[0_0_10px_rgba(201,163,78,0.2)]">
                    <Clock className="w-4 h-4 text-[#C9A34E] animate-pulse" />
                    <span>Scheduled Plenary</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Intriguing Call To Action Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 bg-gradient-to-r from-[#1E192B] via-[#141414] to-[#261B3D] border-2 border-[#C9A34E] p-8 md:p-12 text-center relative overflow-hidden shadow-[0_0_60px_rgba(201,163,78,0.4)]"
        >
          <div className="relative z-10 max-w-2xl mx-auto">
            <span className="font-label-caps text-xs text-[#C9A34E] tracking-[0.25em] uppercase font-bold block mb-2">
              Sovereign Assembly Registration
            </span>
            <h3 className="font-serif-luxury text-2xl sm:text-4xl text-[#F5F3ED] font-bold mb-4">
              Ready to Shape Policy & Claim Your Portfolio?
            </h3>
            <p className="font-sans text-xs md:text-sm text-[#D9D7D2]/85 mb-8 font-light leading-relaxed">
              Step into the sovereign chambers. Register your delegate profile or apply for executive board appointment today.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={() => onOpenApply()}
                onMouseEnter={() => soundEngine.playHover()}
                className="px-9 py-4 bg-gradient-to-r from-[#4B2D8A] via-[#351E63] to-[#C9A34E] text-[#F5F3ED] font-label-caps text-xs tracking-widest uppercase font-bold border-2 border-[#C9A34E] shadow-[0_0_30px_rgba(201,163,78,0.45)] hover:shadow-[0_0_50px_rgba(201,163,78,0.75)] hover:scale-105 transition-all duration-300 flex items-center gap-2 group"
              >
                <span>Register Delegate Portfolio</span>
                <ArrowRight className="w-4 h-4 text-[#C9A34E] group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => onSelectSection('committees')}
                onMouseEnter={() => soundEngine.playHover()}
                className="px-7 py-4 bg-[#0E0E0E] text-[#D9D7D2] font-label-caps text-xs tracking-wider uppercase font-semibold border border-white/20 hover:border-[#C9A34E] hover:text-[#F5F3ED] transition-all"
              >
                Explore All Chambers
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
