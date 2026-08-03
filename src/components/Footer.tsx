import React, { useState } from 'react';
import { BRAND_LOGOS } from '../data/content';
import { Sparkles, Compass, Shield, Lock, Instagram, ExternalLink, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { soundEngine } from '../utils/audio';

interface FooterProps {
  onOpenApply: () => void;
  onOpenAdmin?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenApply, onOpenAdmin }) => {
  const [isInstaModalOpen, setIsInstaModalOpen] = useState(false);

  const handleOpenInsta = (url: string) => {
    soundEngine.playClick();
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <footer className="relative bg-[#0E0E0E] text-[#F5F3ED] border-t border-[#C9A34E]/20 overflow-hidden pt-20 pb-12">
      {/* Background Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#4B2D8A]/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          
          {/* Brand Identity & Mission */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-3">
              <div className="flex items-center -space-x-2">
                <img
                  src={BRAND_LOGOS.aequitas}
                  alt="Aequitas"
                  className="w-10 h-10 rounded-full border border-[#C9A34E]"
                />
                <img
                  src={BRAND_LOGOS.aastitva}
                  alt="Aastitva"
                  className="w-10 h-10 rounded-full border border-[#4B2D8A]"
                />
              </div>
              <span className="font-serif-luxury text-2xl font-bold tracking-tight text-[#F5F3ED]">
                Aequitas <span className="text-[#C9A34E]">×</span> Aastitva
              </span>
            </div>

            <p className="font-sans text-sm text-[#D9D7D2]/80 font-light max-w-lg leading-relaxed">
              India’s premier youth-led diplomatic alliance redefining Model United Nations, parliamentary simulations, policy debates, and crisis leadership. Where Justice finds Identity.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={() => {
                  soundEngine.playClick();
                  onOpenApply();
                }}
                onMouseEnter={() => soundEngine.playHover()}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#4B2D8A] to-[#C9A34E] text-[#F5F3ED] font-label-caps text-xs tracking-widest uppercase font-bold border border-[#C9A34E] shadow-[0_0_20px_rgba(201,163,78,0.3)] hover:brightness-110 transition-all"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Take Your Seat In Assembly</span>
              </button>

              {/* Instagram Handle Selector CTA Button */}
              <button
                onClick={() => {
                  soundEngine.playClick();
                  setIsInstaModalOpen(true);
                }}
                onMouseEnter={() => soundEngine.playHover()}
                className="inline-flex items-center gap-2 px-5 py-3 bg-[#141414] hover:bg-[#1f1a29] text-[#F5F3ED] font-label-caps text-xs tracking-widest uppercase font-semibold border border-white/20 hover:border-[#E1306C] shadow-[0_0_15px_rgba(225,48,108,0.15)] transition-all duration-300 group"
              >
                <Instagram className="w-4 h-4 text-[#E1306C] group-hover:scale-110 transition-transform" />
                <span>Official Instagram Handles</span>
              </button>
            </div>
          </div>

          {/* Assembly Navigation */}
          <div className="lg:col-span-3 space-y-4">
            <span className="font-label-caps text-xs text-[#C9A34E] tracking-widest uppercase font-bold block">
              The Assembly
            </span>
            <ul className="space-y-2.5 font-sans text-sm text-[#D9D7D2]/80">
              <li>
                <a href="#home" className="hover:text-[#C9A34E] transition-colors">
                  01. Main Portal
                </a>
              </li>
              <li>
                <a href="#purpose" className="hover:text-[#C9A34E] transition-colors">
                  02. Purpose & Manifesto
                </a>
              </li>
              <li>
                <a href="#experiences" className="hover:text-[#C9A34E] transition-colors">
                  03. Diplomatic Pillars
                </a>
              </li>
              <li>
                <a href="#committees" className="hover:text-[#C9A34E] transition-colors">
                  04. Sovereign Chambers
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-[#C9A34E] transition-colors">
                  05. Archives & Gallery
                </a>
              </li>
              <li>
                <a href="#feedback" className="hover:text-[#C9A34E] transition-colors">
                  06. Delegate Feedback
                </a>
              </li>
            </ul>
          </div>

          {/* Institutional Values */}
          <div className="lg:col-span-3 space-y-4">
            <span className="font-label-caps text-xs text-[#C9A34E] tracking-widest uppercase font-bold block">
              Foundational Stance
            </span>
            <div className="p-4 bg-[#141414] border border-white/10 space-y-2">
              <span className="font-serif-luxury text-xs text-[#C9A34E] italic block">
                "Leadership Is Not Given. It Is Earned."
              </span>
              <p className="font-sans text-[11px] text-[#D9D7D2]/60 font-light leading-relaxed">
                Empowering negotiators, diplomats, and policy architects across the Indian subcontinent.
              </p>
            </div>
          </div>
        </div>

        {/* Legal, Copyright, Dev Option & Instagram Quick Link */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-sans text-xs text-[#75735B]">
          <p>© 2026 Aequitas × Aastitva Diplomatic Summit. All Rights Reserved.</p>
          <div className="flex flex-wrap items-center gap-6">
            <button
              onClick={() => setIsInstaModalOpen(true)}
              className="hover:text-[#E1306C] transition-colors flex items-center gap-1.5 text-[#E1306C] font-semibold"
            >
              <Instagram className="w-3.5 h-3.5" />
              <span>@aequitas_summit / @alliancesby_aastitva_</span>
            </button>
            <span className="hover:text-[#D9D7D2] transition-colors cursor-pointer">Constitutional Framework</span>
            <span className="hover:text-[#D9D7D2] transition-colors cursor-pointer">Diplomatic Code of Ethics</span>
            {onOpenAdmin && (
              <button
                onClick={onOpenAdmin}
                className="hover:text-[#C9A34E] transition-colors text-[#C9A34E]/80 flex items-center gap-1.5 font-label-caps text-[10px] font-bold tracking-widest uppercase bg-[#C9A34E]/10 px-2.5 py-1 border border-[#C9A34E]/30"
              >
                <Lock className="w-3 h-3 text-[#C9A34E]" />
                <span>Secretariat Dev Portal</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Instagram Handle Selection Modal */}
      <AnimatePresence>
        {isInstaModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md bg-[#141414] border border-[#C9A34E]/40 p-6 md:p-8 rounded-none shadow-[0_0_50px_rgba(75,45,138,0.5)] overflow-hidden"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsInstaModalOpen(false)}
                className="absolute top-4 right-4 text-[#D9D7D2] hover:text-[#C9A34E] p-1 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Header */}
              <div className="text-center mb-6">
                <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] p-0.5 flex items-center justify-center shadow-lg">
                  <div className="w-full h-full bg-[#141414] rounded-full flex items-center justify-center">
                    <Instagram className="w-6 h-6 text-[#E1306C]" />
                  </div>
                </div>
                <h3 className="font-serif-luxury text-xl font-bold text-[#F5F3ED]">
                  Official Instagram Channels
                </h3>
                <p className="font-sans text-xs text-[#D9D7D2]/70 mt-1">
                  Select an official handle to visit on Instagram
                </p>
              </div>

              {/* Handle Options */}
              <div className="space-y-4">
                {/* Option 1: Aequitas Summit */}
                <button
                  onClick={() => handleOpenInsta('https://www.instagram.com/aequitas_summit/')}
                  onMouseEnter={() => soundEngine.playHover()}
                  className="w-full flex items-center justify-between p-4 bg-[#1C1A22] border border-[#C9A34E]/30 hover:border-[#C9A34E] hover:bg-[#25222E] transition-all duration-300 group text-left shadow-md"
                >
                  <div className="flex items-center gap-3.5">
                    <img
                      src={BRAND_LOGOS.aequitas}
                      alt="Aequitas Summit"
                      className="w-10 h-10 rounded-full border border-[#C9A34E]/60 object-cover"
                    />
                    <div>
                      <h4 className="font-serif-luxury text-base font-bold text-[#F5F3ED] group-hover:text-[#C9A34E] transition-colors">
                        Aequitas Summit
                      </h4>
                      <p className="font-mono text-xs text-[#C9A34E]">@aequitas_summit</p>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-[#D9D7D2]/60 group-hover:text-[#C9A34E] group-hover:translate-x-0.5 transition-all" />
                </button>

                {/* Option 2: Aastitva Alliances */}
                <button
                  onClick={() => handleOpenInsta('https://www.instagram.com/alliancesby_aastitva_/')}
                  onMouseEnter={() => soundEngine.playHover()}
                  className="w-full flex items-center justify-between p-4 bg-[#1C1A22] border border-[#4B2D8A]/40 hover:border-[#7C3AED] hover:bg-[#25222E] transition-all duration-300 group text-left shadow-md"
                >
                  <div className="flex items-center gap-3.5">
                    <img
                      src={BRAND_LOGOS.aastitva}
                      alt="Aastitva Alliances"
                      className="w-10 h-10 rounded-full border border-[#4B2D8A]/60 object-cover"
                    />
                    <div>
                      <h4 className="font-serif-luxury text-base font-bold text-[#F5F3ED] group-hover:text-[#E6DEFF] transition-colors">
                        Aastitva Alliances
                      </h4>
                      <p className="font-mono text-xs text-[#E6DEFF]/80">@alliancesby_aastitva_</p>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-[#D9D7D2]/60 group-hover:text-[#E6DEFF] group-hover:translate-x-0.5 transition-all" />
                </button>
              </div>

              {/* Modal Footer Note */}
              <div className="mt-6 text-center">
                <span className="font-label-caps text-[10px] text-[#75735B] uppercase tracking-widest">
                  Aequitas × Aastitva Communications
                </span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </footer>
  );
};

