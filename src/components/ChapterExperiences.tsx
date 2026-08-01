import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { EXPERIENCE_PILLARS } from '../data/content';
import { ExperiencePillar } from '../types';
import {
  Landmark,
  Globe,
  Crown,
  FileSearch,
  Handshake,
  Scroll,
  Mic,
  Users,
  Compass,
  ArrowRight,
  CheckCircle2,
  X
} from 'lucide-react';

export const ChapterExperiences: React.FC = () => {
  const [selectedPillar, setSelectedPillar] = useState<ExperiencePillar | null>(null);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Landmark': return <Landmark className="w-7 h-7 text-[#C9A34E]" />;
      case 'Globe': return <Globe className="w-7 h-7 text-[#E6DEFF]" />;
      case 'Crown': return <Crown className="w-7 h-7 text-[#C9A34E]" />;
      case 'FileSearch': return <FileSearch className="w-7 h-7 text-[#8A6743]" />;
      case 'Handshake': return <Handshake className="w-7 h-7 text-[#C9A34E]" />;
      case 'Scroll': return <Scroll className="w-7 h-7 text-[#E6DEFF]" />;
      case 'Mic': return <Mic className="w-7 h-7 text-[#C9A34E]" />;
      case 'Users': return <Users className="w-7 h-7 text-[#8A6743]" />;
      case 'Compass': return <Compass className="w-7 h-7 text-[#C9A34E]" />;
      default: return <Landmark className="w-7 h-7 text-[#C9A34E]" />;
    }
  };

  return (
    <section id="experiences" className="relative py-32 bg-[#141414] overflow-hidden">
      {/* Page Vibe Background Visual Illustration: Celestial Globe & Orbital Ley Lines */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-50 md:opacity-60 transition-opacity duration-1000">
        <svg className="w-full h-full text-[#C9A34E]" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice" fill="none">
          {/* Orbital Ellipses */}
          <ellipse cx="600" cy="400" rx="570" ry="240" stroke="#FFD700" strokeWidth="1.5" strokeDasharray="10 8" className="animate-[spin_80s_linear_infinite]" />
          <ellipse cx="600" cy="400" rx="440" ry="360" stroke="#A855F7" strokeWidth="1.8" className="animate-[spin_50s_linear_infinite_reverse]" />
          <ellipse cx="600" cy="400" rx="300" ry="140" stroke="#C9A34E" strokeWidth="1.2" className="animate-[spin_30s_linear_infinite]" />

          {/* Glowing Constellation Nodes */}
          {[[200, 250], [400, 180], [800, 220], [1000, 300], [300, 550], [700, 620], [950, 580], [600, 160], [600, 640]].map(([x, y], i) => (
            <g key={i}>
              <circle cx={x} cy={y} r="5" fill="#FFD700" className="animate-ping" />
              <circle cx={x} cy={y} r="10" stroke="#C9A34E" strokeWidth="1" fill="none" />
              <line x1={x} y1={y} x2="600" y2="400" stroke={i % 2 === 0 ? "#FFD700" : "#A855F7"} strokeWidth="0.6" strokeOpacity="0.5" />
            </g>
          ))}

          {/* World Latitude Lines */}
          <circle cx="600" cy="400" r="240" stroke="#C9A34E" strokeWidth="1.2" strokeOpacity="0.7" />
          <line x1="360" y1="400" x2="840" y2="400" stroke="#FFD700" strokeWidth="1.5" strokeOpacity="0.8" />
          <line x1="600" y1="160" x2="600" y2="640" stroke="#A855F7" strokeWidth="1.5" strokeOpacity="0.8" />
        </svg>
      </div>

      {/* Floating Light Beams Sweep */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
        <div className="w-[150%] h-40 bg-gradient-to-r from-transparent via-[#7C3AED]/30 to-transparent animate-beam" />
      </div>

      {/* Background Radial Spotlights */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-gradient-to-r from-[#4B2D8A]/25 via-[#C9A34E]/15 to-transparent rounded-full blur-[130px] pointer-events-none animate-pulse-glow" />


      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="font-label-caps text-xs text-[#C9A34E] tracking-[0.3em] uppercase block mb-3">
            Chapter Two — Experiences
          </span>
          <h2 className="font-serif-luxury text-3xl sm:text-5xl text-[#F5F3ED] font-bold text-glow-gold mb-6">
            Architects of Diplomatic Mastery
          </h2>
          <p className="font-sans text-base text-[#D9D7D2]/80 font-light leading-relaxed">
            Nine distinct pillars engineered to transform theoretical debate into high-impact leadership, statutory eloquence, and strategic negotiation.
          </p>
        </div>

        {/* 9 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {EXPERIENCE_PILLARS.map((pillar, idx) => (
            <motion.div
              key={pillar.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08, duration: 0.6 }}
              onClick={() => setSelectedPillar(pillar)}
              className="group cursor-pointer glass-panel p-8 relative overflow-hidden border border-white/5 hover:border-[#C9A34E]/40 transition-all duration-500 hover:shadow-[0_10px_30px_rgba(201,163,78,0.15)] flex flex-col justify-between min-h-[280px]"
            >
              {/* Top Row: Icon & Pillar Number */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="p-3 bg-[#141414] border border-[#C9A34E]/20 group-hover:border-[#C9A34E]/60 transition-colors">
                    {getIcon(pillar.iconName)}
                  </div>
                  <span className="font-serif-luxury text-sm text-[#C9A34E]/60 group-hover:text-[#C9A34E] font-bold transition-colors">
                    0{idx + 1}
                  </span>
                </div>

                <h3 className="font-serif-luxury text-2xl text-[#F5F3ED] font-bold group-hover:text-[#C9A34E] transition-colors mb-2">
                  {pillar.title}
                </h3>

                <p className="font-sans text-xs text-[#C9A34E] tracking-wider font-semibold uppercase mb-3">
                  {pillar.tagline}
                </p>

                <p className="font-sans text-sm text-[#D9D7D2]/70 font-light line-clamp-3 leading-relaxed">
                  {pillar.description}
                </p>
              </div>

              {/* Bottom Action Footer */}
              <div className="pt-6 mt-6 border-t border-white/5 flex items-center justify-between">
                <span className="font-label-caps text-[10px] text-[#75735B] group-hover:text-[#D9D7D2] transition-colors">
                  {pillar.metrics}
                </span>
                <span className="inline-flex items-center gap-1.5 font-label-caps text-xs text-[#C9A34E] group-hover:translate-x-1 transition-transform">
                  <span>Explore Curriculum</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Expanded Interactive Detail Modal */}
      <AnimatePresence>
        {selectedPillar && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="glass-panel-gold max-w-2xl w-full p-8 relative rounded-none border border-[#C9A34E]/50 shadow-[0_0_50px_rgba(201,163,78,0.25)] text-[#F5F3ED]"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedPillar(null)}
                className="absolute top-6 right-6 p-2 text-[#D9D7D2] hover:text-[#C9A34E] transition-colors"
                aria-label="Close detail modal"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-[#141414] border border-[#C9A34E]/40">
                  {getIcon(selectedPillar.iconName)}
                </div>
                <div>
                  <span className="font-label-caps text-[10px] text-[#C9A34E] tracking-widest uppercase block">
                    Diplomatic Pillar
                  </span>
                  <h3 className="font-serif-luxury text-3xl font-bold text-[#F5F3ED]">
                    {selectedPillar.title}
                  </h3>
                </div>
              </div>

              <p className="font-serif-luxury text-lg text-[#C9A34E] italic mb-4">
                "{selectedPillar.tagline}"
              </p>

              <p className="font-sans text-sm text-[#D9D7D2] font-light leading-relaxed mb-8">
                {selectedPillar.description}
              </p>

              {/* Core Skill Outcomes */}
              <div className="space-y-3 mb-8">
                <h4 className="font-label-caps text-xs text-[#C9A34E] tracking-widest uppercase font-bold">
                  Core Skills & Statutory Outcomes
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {selectedPillar.outcomes.map((outcome, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 p-3 bg-[#141414]/60 border border-white/5">
                      <CheckCircle2 className="w-4 h-4 text-[#C9A34E] shrink-0 mt-0.5" />
                      <span className="font-sans text-xs text-[#F5F3ED]">{outcome}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-white/10">
                <span className="font-label-caps text-xs text-[#75735B]">
                  Impact Metric: <strong className="text-[#C9A34E]">{selectedPillar.metrics}</strong>
                </span>
                <button
                  onClick={() => setSelectedPillar(null)}
                  className="px-6 py-2.5 bg-[#4B2D8A] text-[#F5F3ED] font-label-caps text-xs tracking-widest uppercase font-bold hover:bg-[#C9A34E] hover:text-[#141414] transition-colors"
                >
                  Close Detail
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
