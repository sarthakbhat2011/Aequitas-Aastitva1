import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Shield,
  Feather,
  Globe2,
  Crown,
  Sparkles,
  Scale,
  BookOpen,
  Award,
  ShieldCheck,
  Compass,
  CheckCircle2,
  Building2,
  FileCheck
} from 'lucide-react';
import { soundEngine } from '../utils/audio';

export const ChapterPurpose: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [activeTab, setActiveTab] = useState<'charter' | 'forces'>('charter');

  const statements = [
    "We don't organize conferences.",
    "We create leaders.",
    "We train negotiators.",
    "We prepare diplomats.",
    "We amplify voices."
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % statements.length);
    }, 3200);
    return () => clearInterval(interval);
  }, [statements.length]);

  const corePurposes = [
    {
      id: '01',
      title: 'Simulate Multilateral Governance',
      description:
        'We host meticulously designed committee sessions modeled after major organs of the United Nations, regional bodies, and crisis councils.',
      icon: Globe2,
      accentColor: '#C9A34E',
      bgGlow: 'rgba(201, 163, 78, 0.12)'
    },
    {
      id: '02',
      title: 'Elevate Debate Standards',
      description:
        'Through comprehensive study guides, expert Executive Board direction, and balanced floor moderation, we ensure committees achieve meaningful, high-level resolution drafting.',
      icon: BookOpen,
      accentColor: '#4B2D8A',
      bgGlow: 'rgba(75, 45, 138, 0.15)'
    },
    {
      id: '03',
      title: 'Develop Executive Skills',
      description:
        'Participants refine high-order skills essential for modern professional careers, including strategic policy analysis, persuasive public speaking, international law application, and consensus-building.',
      icon: Award,
      accentColor: '#C9A34E',
      bgGlow: 'rgba(201, 163, 78, 0.12)'
    }
  ];

  return (
    <section
      id="purpose"
      className="relative min-h-screen py-24 md:py-32 bg-[#141414] overflow-hidden flex flex-col justify-center border-t border-b border-[#C9A34E]/25"
    >
      {/* Background Visual Illustration: Central Mandalic Rings */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-35 md:opacity-50 transition-opacity duration-1000">
        <svg
          className="w-full h-full text-[#C9A34E]"
          viewBox="0 0 1000 1000"
          preserveAspectRatio="xMidYMid slice"
          fill="none"
        >
          {/* Animated Central Concentric Rings */}
          <circle
            cx="500"
            cy="500"
            r="440"
            stroke="#C9A34E"
            strokeWidth="1.2"
            strokeDasharray="8 10"
            className="animate-[spin_70s_linear_infinite]"
          />
          <circle
            cx="500"
            cy="500"
            r="360"
            stroke="#FFD700"
            strokeWidth="1.8"
            className="animate-[spin_45s_linear_infinite_reverse]"
          />
          <circle
            cx="500"
            cy="500"
            r="280"
            stroke="#9333EA"
            strokeWidth="1.5"
            strokeDasharray="14 14"
            className="animate-[spin_30s_linear_infinite]"
          />

          {/* Radial Rays of Ideology */}
          {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
            <line
              key={deg}
              x1="500"
              y1="500"
              x2={500 + 470 * Math.cos((deg * Math.PI) / 180)}
              y2={500 + 470 * Math.sin((deg * Math.PI) / 180)}
              stroke="#D9D7D2"
              strokeWidth="0.8"
              strokeOpacity="0.4"
            />
          ))}
        </svg>
      </div>

      {/* Atmospheric Glow Effects */}
      <div className="absolute top-1/4 left-10 w-[500px] h-[500px] bg-[#4B2D8A]/20 rounded-full blur-[120px] pointer-events-none animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-10 w-[500px] h-[500px] bg-[#C9A34E]/15 rounded-full blur-[120px] pointer-events-none animate-pulse-glow" />

      <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10 w-full">
        {/* Chapter Header Badge */}
        <div className="text-center mb-12">
          <span className="font-label-caps text-xs text-[#C9A34E] tracking-[0.3em] uppercase block mb-3">
            Chapter One — Purpose & Identity
          </span>
          <h2 className="font-serif-luxury text-2xl sm:text-3xl md:text-4xl text-[#F5F3ED] font-bold tracking-tight">
            Aastitva Alliance <span className="text-[#C9A34E]">×</span> Institutional Ethos
          </h2>
        </div>

        {/* Cinematic Statement Reveal Container */}
        <div className="min-h-[160px] md:min-h-[200px] flex items-center justify-center text-center my-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, scale: 0.96, filter: 'blur(10px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 1.04, filter: 'blur(10px)' }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-3"
            >
              <span className="font-label-caps text-[11px] text-[#4B2D8A] tracking-[0.4em] uppercase font-bold block">
                [ Statement 0{activeStep + 1} ]
              </span>
              <p className="font-serif-luxury text-2xl sm:text-4xl md:text-5xl text-[#F5F3ED] font-bold text-glow-gold max-w-4xl leading-tight">
                "{statements[activeStep]}"
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Step Indicator Dots */}
        <div className="flex justify-center items-center gap-3 mb-16">
          {statements.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                soundEngine.playClick();
                setActiveStep(idx);
              }}
              className={`h-1.5 transition-all duration-500 rounded-full ${
                activeStep === idx
                  ? 'w-10 bg-[#C9A34E] shadow-[0_0_12px_rgba(201,163,78,0.8)]'
                  : 'w-2 bg-[#75735B]/40 hover:bg-[#D9D7D2]'
              }`}
              aria-label={`Jump to statement ${idx + 1}`}
            />
          ))}
        </div>

        {/* Interactive View Switcher Tabs (Charter vs Forces) */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex p-1.5 bg-[#141414]/90 border border-[#C9A34E]/30 rounded-full backdrop-blur-xl shadow-lg">
            <button
              onClick={() => {
                soundEngine.playClick();
                setActiveTab('charter');
              }}
              className={`px-6 py-2 rounded-full font-label-caps text-xs tracking-widest uppercase font-bold transition-all duration-300 ${
                activeTab === 'charter'
                  ? 'bg-gradient-to-r from-[#4B2D8A] to-[#2A1852] text-[#F5F3ED] border border-[#C9A34E]/50 shadow-[0_0_15px_rgba(75,45,138,0.4)]'
                  : 'text-[#D9D7D2]/70 hover:text-[#F5F3ED]'
              }`}
            >
              Aastitva Alliance Charter
            </button>
            <button
              onClick={() => {
                soundEngine.playClick();
                setActiveTab('forces');
              }}
              className={`px-6 py-2 rounded-full font-label-caps text-xs tracking-widest uppercase font-bold transition-all duration-300 ${
                activeTab === 'forces'
                  ? 'bg-gradient-to-r from-[#4B2D8A] to-[#2A1852] text-[#F5F3ED] border border-[#C9A34E]/50 shadow-[0_0_15px_rgba(75,45,138,0.4)]'
                  : 'text-[#D9D7D2]/70 hover:text-[#F5F3ED]'
              }`}
            >
              The Three Core Forces
            </button>
          </div>
        </div>

        {/* TAB 1: AASTITVA ALLIANCE CHARTER */}
        {activeTab === 'charter' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-12"
          >
            {/* Top Overview & Identity Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              {/* Overview Executive Preamble (Col 7) */}
              <div className="md:col-span-7 glass-panel-gold p-8 md:p-10 relative flex flex-col justify-between group hover:border-[#C9A34E]/60 transition-all duration-500">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="p-2 bg-[#C9A34E]/10 border border-[#C9A34E]/40 rounded-none text-[#C9A34E]">
                      <Building2 className="w-5 h-5" />
                    </span>
                    <span className="font-label-caps text-xs text-[#C9A34E] tracking-widest uppercase font-bold">
                      Institutional Overview
                    </span>
                  </div>
                  <h3 className="font-serif-luxury text-2xl md:text-3xl text-[#F5F3ED] font-bold leading-tight">
                    Cultivating Global Leaders & Policy Strategists
                  </h3>
                  <p className="font-sans text-sm md:text-base text-[#D9D7D2]/90 leading-relaxed font-light">
                    Aastitva Alliance is a premier academic diplomacy forum established to cultivate the next generation of global leaders, policy strategists, and diplomats. Rooted in the Latin ethos of Aastitva—representing justice, equity, and procedural fairness—our organization provides an immersive platform where young minds engage with complex international relations, articulate foreign policy, and negotiate solutions to critical global challenges.
                  </p>
                </div>
                <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between">
                  <span className="font-serif-luxury text-xs text-[#C9A34E] italic">
                    Latin Ethos: Justice, Equity & Procedural Fairness
                  </span>
                  <Sparkles className="w-4 h-4 text-[#C9A34E] opacity-60" />
                </div>
              </div>

              {/* Our Identity Card (Col 5) */}
              <div className="md:col-span-5 glass-panel p-8 md:p-10 relative flex flex-col justify-between group hover:border-[#4B2D8A]/70 transition-all duration-500">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="p-2 bg-[#4B2D8A]/20 border border-[#4B2D8A]/50 rounded-none text-[#E6DEFF]">
                      <ShieldCheck className="w-5 h-5" />
                    </span>
                    <span className="font-label-caps text-xs text-[#E6DEFF] tracking-widest uppercase font-bold">
                      Our Identity
                    </span>
                  </div>
                  <h3 className="font-serif-luxury text-2xl text-[#F5F3ED] font-bold">
                    Elite Diplomatic Simulation Platform
                  </h3>
                  <p className="font-sans text-sm text-[#D9D7D2]/80 leading-relaxed font-light">
                    Aastitva Alliance operates as an elite, diplomatic simulation platform. We bridge theoretical knowledge and practical diplomacy by recreating the proceedings of international governance bodies, specialized agencies, and historic cabinet assemblies. By simulating multilateral negotiations, Aastitva Alliance challenges participants to navigate geopolitical complexities with strategic precision, intellectual rigor, and diplomatic tact.
                  </p>
                </div>
                <div className="pt-6 mt-6 border-t border-white/10">
                  <span className="font-label-caps text-[10px] text-[#75735B] uppercase tracking-widest block">
                    Multilateral Simulation Standard
                  </span>
                </div>
              </div>
            </div>

            {/* Core Purpose Header */}
            <div className="text-center pt-6">
              <span className="font-label-caps text-xs text-[#C9A34E] tracking-widest uppercase font-bold block mb-2">
                Foundational Objectives
              </span>
              <h3 className="font-serif-luxury text-2xl md:text-3xl text-[#F5F3ED] font-bold">
                Our Core Purpose
              </h3>
            </div>

            {/* Core Purpose 3 Pillars Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {corePurposes.map((purpose) => {
                const Icon = purpose.icon;
                return (
                  <div
                    key={purpose.id}
                    className="glass-panel p-8 relative group hover:border-[#C9A34E]/50 transition-all duration-500 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-6">
                        <div
                          className="w-12 h-12 rounded-none bg-[#141414] border flex items-center justify-center text-[#C9A34E] group-hover:scale-110 transition-transform"
                          style={{ borderColor: purpose.accentColor }}
                        >
                          <Icon className="w-6 h-6" style={{ color: purpose.accentColor }} />
                        </div>
                        <span className="font-mono text-xs font-bold text-[#75735B]">
                          [ Purpose {purpose.id} ]
                        </span>
                      </div>

                      <h4 className="font-serif-luxury text-xl text-[#F5F3ED] font-bold mb-3 group-hover:text-[#C9A34E] transition-colors">
                        {purpose.title}
                      </h4>

                      <p className="font-sans text-sm text-[#D9D7D2]/80 leading-relaxed font-light">
                        {purpose.description}
                      </p>
                    </div>

                    <div className="pt-6 mt-6 border-t border-white/10 flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#C9A34E]" />
                      <span className="font-label-caps text-[10px] text-[#D9D7D2]/60 uppercase tracking-wider">
                        Executive Mandate
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* TAB 2: THE THREE CORE FORCES */}
        {activeTab === 'forces' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {/* Pillar 1 */}
            <div className="glass-panel p-8 relative group hover:border-[#C9A34E]/50 transition-all duration-500">
              <div className="w-12 h-12 rounded-none bg-[#141414] border border-[#C9A34E]/30 flex items-center justify-center mb-6 text-[#C9A34E] group-hover:scale-110 transition-transform">
                <Scale className="w-6 h-6" />
              </div>
              <span className="font-label-caps text-[10px] text-[#C9A34E] tracking-widest uppercase block mb-2">
                Force One
              </span>
              <h3 className="font-serif-luxury text-2xl text-[#F5F3ED] font-bold mb-3">
                Justice with Identity
              </h3>
              <p className="font-sans text-sm text-[#D9D7D2]/80 leading-relaxed font-light">
                Aequitas brings constitutional order, legal scrutiny, and international structure. Aastitva injects youthful identity, individual passion, and creative defiance.
              </p>
            </div>

            {/* Pillar 2 */}
            <div className="glass-panel p-8 relative group hover:border-[#4B2D8A]/70 transition-all duration-500">
              <div className="w-12 h-12 rounded-none bg-[#141414] border border-[#4B2D8A]/50 flex items-center justify-center mb-6 text-[#E6DEFF] group-hover:scale-110 transition-transform">
                <Crown className="w-6 h-6" />
              </div>
              <span className="font-label-caps text-[10px] text-[#E6DEFF] tracking-widest uppercase block mb-2">
                Force Two
              </span>
              <h3 className="font-serif-luxury text-2xl text-[#F5F3ED] font-bold mb-3">
                Tradition with Innovation
              </h3>
              <p className="font-sans text-sm text-[#D9D7D2]/80 leading-relaxed font-light">
                Rooted in the timeless legislative decorum of Rashtrapati Bhavan and the Lok Sabha, elevated through modern crisis engines, real-time analytics, and dynamic simulation models.
              </p>
            </div>

            {/* Pillar 3 */}
            <div className="glass-panel p-8 relative group hover:border-[#C9A34E]/50 transition-all duration-500">
              <div className="w-12 h-12 rounded-none bg-[#141414] border border-[#C9A34E]/30 flex items-center justify-center mb-6 text-[#C9A34E] group-hover:scale-110 transition-transform">
                <Globe2 className="w-6 h-6" />
              </div>
              <span className="font-label-caps text-[10px] text-[#C9A34E] tracking-widest uppercase block mb-2">
                Force Three
              </span>
              <h3 className="font-serif-luxury text-2xl text-[#F5F3ED] font-bold mb-3">
                India with the World
              </h3>
              <p className="font-sans text-sm text-[#D9D7D2]/80 leading-relaxed font-light">
                Bringing an authentic Indian perspective to multilateral global forums. Preparing young delegates to advocate for sovereign security, economic justice, and human dignity.
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};
