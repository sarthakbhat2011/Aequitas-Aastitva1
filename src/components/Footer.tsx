import React from 'react';
import { BRAND_LOGOS } from '../data/content';
import { Sparkles, Compass, Shield, Lock } from 'lucide-react';

interface FooterProps {
  onOpenApply: () => void;
  onOpenAdmin?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenApply, onOpenAdmin }) => {
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

            <div className="pt-2">
              <button
                onClick={onOpenApply}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#4B2D8A] to-[#C9A34E] text-[#F5F3ED] font-label-caps text-xs tracking-widest uppercase font-bold border border-[#C9A34E] shadow-[0_0_20px_rgba(201,163,78,0.3)] hover:brightness-110 transition-all"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Take Your Seat In Assembly</span>
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

        {/* Legal, Copyright & Dev Option */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-sans text-xs text-[#75735B]">
          <p>© 2026 Aequitas × Aastitva Diplomatic Summit. All Rights Reserved.</p>
          <div className="flex items-center gap-6">
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
    </footer>
  );
};
