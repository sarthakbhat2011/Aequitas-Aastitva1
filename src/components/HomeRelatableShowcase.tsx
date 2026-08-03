import React, { useState } from 'react';
import { motion } from 'motion/react';
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
  ChevronRight
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
    glowColor: 'rgba(201, 163, 78, 0.2)',
  },
  {
    id: 'crisis',
    icon: Zap,
    title: 'Live Crisis Simulation',
    tagline: 'Real-Time Intelligence Feeds',
    description: 'Navigate unscripted press leaks, emergency intelligence directives, and high-stakes crisis warfare requiring split-second strategic diplomacy.',
    color: '#9B6BFF',
    glowColor: 'rgba(155, 107, 255, 0.2)',
  },
  {
    id: 'eb',
    icon: Crown,
    title: 'World-Class Executive Moderation',
    tagline: 'Mentorship from Seasoned Chairs',
    description: 'Engage with top-tier Executive Boards who provide continuous constructive guidance, procedural clarity, and impartial assessment.',
    color: '#C9A34E',
    glowColor: 'rgba(201, 163, 78, 0.2)',
  },
  {
    id: 'distinction',
    icon: Award,
    title: 'Verified Portfolio & Distinction',
    tagline: 'Institutional Recognition',
    description: 'Claim your digital delegate pass, receive verified participation credentials, and compete for coveted Best Delegate and High Recommendation awards.',
    color: '#E6DEFF',
    glowColor: 'rgba(230, 222, 255, 0.2)',
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
    <section className="relative py-24 md:py-32 bg-[#141414] overflow-hidden border-t border-[#C9A34E]/30">
      {/* Ambient Radial Glowing Orbs */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-60">
        <div className="absolute top-10 left-1/4 w-[700px] h-[700px] bg-[#4B2D8A]/25 rounded-full blur-[140px] animate-pulse-glow" />
        <div className="absolute bottom-10 right-1/4 w-[750px] h-[750px] bg-[#C9A34E]/15 rounded-full blur-[150px] animate-float-orb-2" />
        <div className="absolute inset-0 bg-[radial-gradient(#C9A34E_1px,transparent_1px)] [background-size:40px_40px] opacity-15" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#4B2D8A]/30 border border-[#C9A34E]/50 rounded-full mb-4 shadow-[0_0_20px_rgba(201,163,78,0.2)]">
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
          <div className="mt-8 inline-flex p-1.5 bg-[#0E0E0E] border border-[#C9A34E]/40 rounded-none shadow-[0_0_25px_rgba(0,0,0,0.8)]">
            <button
              onClick={() => {
                soundEngine.playClick();
                setActiveTab('pillars');
              }}
              className={`px-5 py-2.5 font-label-caps text-xs tracking-wider uppercase font-bold transition-all duration-300 ${
                activeTab === 'pillars'
                  ? 'bg-[#C9A34E] text-[#141414] shadow-[0_0_15px_rgba(201,163,78,0.4)]'
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
                  ? 'bg-[#C9A34E] text-[#141414] shadow-[0_0_15px_rgba(201,163,78,0.4)]'
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
                  ? 'bg-[#C9A34E] text-[#141414] shadow-[0_0_15px_rgba(201,163,78,0.4)]'
                  : 'text-[#D9D7D2]/80 hover:text-[#F5F3ED]'
              }`}
            >
              Assembly Itinerary
            </button>
          </div>
        </div>

        {/* TAB 1: CORE PILLARS SHOWCASE */}
        {activeTab === 'pillars' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {DELEGATE_HIGHLIGHTS.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                  onMouseEnter={() => soundEngine.playHover()}
                  className="glass-panel p-7 border border-[#C9A34E]/30 bg-[#141414]/90 hover:border-[#C9A34E] relative group transition-all duration-500 hover:shadow-[0_15px_40px_rgba(201,163,78,0.25)] flex flex-col justify-between"
                >
                  <div>
                    <div
                      className="w-12 h-12 mb-6 flex items-center justify-center bg-[#0E0E0E] border border-[#C9A34E]/50 group-hover:scale-110 transition-transform"
                      style={{ boxShadow: `0 0 20px ${item.glowColor}` }}
                    >
                      <IconComp className="w-6 h-6" style={{ color: item.color }} />
                    </div>

                    <span className="font-label-caps text-[10px] text-[#C9A34E] tracking-widest uppercase font-bold block mb-1">
                      {item.tagline}
                    </span>
                    <h3 className="font-serif-luxury text-xl font-bold text-[#F5F3ED] mb-3 group-hover:text-[#C9A34E] transition-colors">
                      {item.title}
                    </h3>
                    <p className="font-sans text-xs text-[#D9D7D2]/80 font-light leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between">
                    <span className="font-mono text-[10px] text-[#C9A34E] uppercase font-bold tracking-wider">
                      Pillar 0{idx + 1}
                    </span>
                    <button
                      onClick={() => onSelectSection('experiences')}
                      className="text-xs text-[#F5F3ED] group-hover:text-[#C9A34E] flex items-center gap-1 font-semibold transition-colors"
                    >
                      Learn More <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* TAB 2: CHAMBERS SPOTLIGHT PREVIEW */}
        {activeTab === 'chambers' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {SOVEREIGN_CHAMBERS_PREVIEW.map((chamber, idx) => (
              <motion.div
                key={chamber.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className="glass-panel p-8 border border-[#C9A34E]/40 bg-[#141414]/95 relative overflow-hidden group hover:border-[#C9A34E] transition-all shadow-[0_0_30px_rgba(0,0,0,0.8)]"
              >
                <div className="flex items-start justify-between mb-4">
                  <span className="font-label-caps text-xs text-[#C9A34E] tracking-widest uppercase font-bold">
                    {chamber.category}
                  </span>
                  <div className="px-2.5 py-1 bg-[#4B2D8A]/30 border border-[#4B2D8A] text-[#E6DEFF] font-label-caps text-[9px] uppercase tracking-wider font-semibold">
                    Applications Open
                  </div>
                </div>

                <h3 className="font-serif-luxury text-2xl font-bold text-[#F5F3ED] mb-3 group-hover:text-[#C9A34E] transition-colors">
                  {chamber.title}
                </h3>
                <p className="font-sans text-xs text-[#D9D7D2]/90 leading-relaxed mb-6 font-light">
                  <strong className="text-[#C9A34E] font-semibold">Key Agenda: </strong>
                  {chamber.agenda}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <button
                    onClick={() => onSelectSection('committees')}
                    className="font-label-caps text-xs text-[#D9D7D2] hover:text-[#C9A34E] transition-colors font-semibold"
                  >
                    View Full Chamber Details →
                  </button>

                  <button
                    onClick={() => onOpenApply(chamber.id)}
                    className="px-5 py-2.5 bg-gradient-to-r from-[#4B2D8A] to-[#C9A34E] text-[#F5F3ED] font-label-caps text-[11px] tracking-wider uppercase font-bold border border-[#C9A34E] shadow-[0_0_15px_rgba(201,163,78,0.3)] hover:scale-105 transition-all"
                  >
                    Claim Stance
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* TAB 3: ASSEMBLY ITINERARY TIMELINE */}
        {activeTab === 'schedule' && (
          <div className="max-w-4xl mx-auto space-y-6">
            {ASSEMBLY_TIMELINE.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.12, duration: 0.5 }}
                className="glass-panel p-6 md:p-8 border border-[#C9A34E]/30 bg-[#141414]/95 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:border-[#C9A34E] transition-all shadow-[0_0_20px_rgba(0,0,0,0.8)]"
              >
                <div className="flex items-center gap-4">
                  <div className="px-4 py-3 bg-[#0E0E0E] border-2 border-[#C9A34E] text-[#C9A34E] font-serif-luxury font-bold text-lg shadow-[0_0_15px_rgba(201,163,78,0.3)] shrink-0">
                    {item.day}
                  </div>

                  <div>
                    <h4 className="font-serif-luxury text-xl font-bold text-[#F5F3ED]">
                      {item.phase}
                    </h4>
                    <p className="font-sans text-xs text-[#D9D7D2]/80 mt-1 font-light">
                      {item.details}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs font-label-caps text-[#C9A34E] bg-[#C9A34E]/10 border border-[#C9A34E]/30 px-3.5 py-1.5 shrink-0 uppercase tracking-wider font-semibold">
                  <Clock className="w-3.5 h-3.5 text-[#C9A34E]" />
                  <span>Scheduled Plenary</span>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Intriguing Call To Action Banner */}
        <div className="mt-16 bg-gradient-to-r from-[#1E192B] via-[#141414] to-[#261B3D] border-2 border-[#C9A34E]/50 p-8 md:p-12 text-center relative overflow-hidden shadow-[0_0_50px_rgba(201,163,78,0.3)]">
          <div className="relative z-10 max-w-2xl mx-auto">
            <span className="font-label-caps text-xs text-[#C9A34E] tracking-[0.25em] uppercase font-bold block mb-2">
              Sovereign Assembly Registration
            </span>
            <h3 className="font-serif-luxury text-2xl sm:text-4xl text-[#F5F3ED] font-bold mb-4">
              Ready to Shape Policy & Claim Your Portfolio?
            </h3>
            <p className="font-sans text-xs md:text-sm text-[#D9D7D2]/80 mb-8 font-light leading-relaxed">
              Step into the sovereign chambers. Register your delegate profile or apply for executive board appointment today.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={() => onOpenApply()}
                onMouseEnter={() => soundEngine.playHover()}
                className="px-9 py-4 bg-gradient-to-r from-[#4B2D8A] via-[#351E63] to-[#C9A34E] text-[#F5F3ED] font-label-caps text-xs tracking-widest uppercase font-bold border-2 border-[#C9A34E] shadow-[0_0_30px_rgba(201,163,78,0.4)] hover:shadow-[0_0_50px_rgba(201,163,78,0.7)] hover:scale-105 transition-all duration-300 flex items-center gap-2 group"
              >
                <span>Register Delegate Portfolio</span>
                <ArrowRight className="w-4 h-4 text-[#C9A34E] group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => onSelectSection('committees')}
                className="px-7 py-4 bg-[#0E0E0E] text-[#D9D7D2] font-label-caps text-xs tracking-wider uppercase font-semibold border border-white/20 hover:border-[#C9A34E] hover:text-[#F5F3ED] transition-all"
              >
                Explore All Chambers
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
