import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Lock, Key, ShieldAlert, Terminal, Eye, Sparkles, Check, FileQuestion, Crown } from 'lucide-react';

interface SurpriseCommitteeVaultProps {
  onUnlock?: () => void;
}

export const SurpriseCommitteeVault: React.FC<SurpriseCommitteeVaultProps> = ({ onUnlock }) => {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  const handleUnlockVault = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (passcode.trim().toUpperCase() === 'AEQUITAS' || passcode.trim().toUpperCase() === 'AASTITVA' || passcode.trim() === '2026' || passcode.trim().length > 0) {
      setIsUnlocked(true);
      setErrorMsg('');
      if (onUnlock) onUnlock();
    } else {
      setErrorMsg('Clearance Code Invalid. Try entering "AEQUITAS" or click Override.');
    }
  };

  const handleOverrideClearance = () => {
    setPasscode('AEQUITAS-2026');
    setIsUnlocked(true);
    setErrorMsg('');
    if (onUnlock) onUnlock();
  };

  const handleSubscribeClassified = (e: React.FormEvent) => {
    e.preventDefault();
    if (userEmail) {
      setSubscribed(true);
    }
  };

  return (
    <section className="relative min-h-screen py-32 bg-[#0E0E0E] flex items-center justify-center overflow-hidden border-t border-b border-[#C9A34E]/20">
      {/* Dark Corridor Flickering Ambient Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(75,45,138,0.2)_0%,_rgba(14,14,14,0.95)_75%)] pointer-events-none" />

      {/* Grid Scanlines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20 pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10 w-full">
        {/* Lock Seal Icon */}
        <motion.div
          animate={{ scale: [1, 1.05, 1], rotate: [0, 2, -2, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="w-24 h-24 mx-auto mb-8 rounded-full bg-[#141414] border-2 border-[#C9A34E]/60 flex items-center justify-center shadow-[0_0_50px_rgba(201,163,78,0.3)] relative group cursor-pointer"
          onClick={handleOverrideClearance}
        >
          <div className="absolute inset-0 rounded-full border border-[#4B2D8A] animate-ping opacity-25" />
          {isUnlocked ? (
            <Eye className="w-10 h-10 text-[#C9A34E]" />
          ) : (
            <Lock className="w-10 h-10 text-[#C9A34E] group-hover:scale-110 transition-transform" />
          )}
        </motion.div>

        {/* Confidential Header Tag */}
        <span className="font-label-caps text-xs text-[#93000A] tracking-[0.4em] uppercase block mb-4 font-bold bg-[#93000A]/10 py-1 px-4 max-w-xs mx-auto border border-[#93000A]/30">
          [ TOP SECRET // CLASSIFIED ARCHIVE ]
        </span>

        {/* Main Cryptic Titles */}
        <h2 className="font-serif-luxury text-3xl sm:text-5xl md:text-6xl text-[#F5F3ED] font-bold text-glow-gold mb-6 leading-tight">
          Some debates cannot be announced. <br />
          <span className="text-[#C9A34E] italic font-normal">They must be discovered.</span>
        </h2>

        <p className="font-sans text-base md:text-lg text-[#D9D7D2]/70 font-light max-w-2xl mx-auto mb-8 leading-relaxed">
          Behind locked palace vaults lies a secret, non-public crisis simulation designed exclusively for high-clearance delegates.
        </p>

        {/* SURPRISE COMMITTEE FEATURE: MYTHOS & MULTIVERSE ATMOSPHERIC VISUAL SUSPENSE */}
        <div className="mb-12 p-6 sm:p-10 bg-gradient-to-br from-[#1C112B] via-[#0E0E0E] to-[#1A1208] border-2 border-[#C9A34E]/60 shadow-[0_0_60px_rgba(201,163,78,0.25)] text-center relative overflow-hidden">
          {/* Subtle Background Radial Glows */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#C9A34E]/15 rounded-full blur-[100px] pointer-events-none animate-pulse" />
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#7C3AED]/20 rounded-full blur-[120px] pointer-events-none" />

          {/* Background Grid Pattern */}
          <div className="absolute inset-0 bg-[radial-gradient(#C9A34E_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center">
            {/* Classified Tag */}
            <div className="inline-flex items-center gap-2 bg-[#C9A34E]/10 border border-[#C9A34E]/40 px-4 py-1.5 mb-6">
              <Sparkles className="w-4 h-4 text-[#FFD700] animate-spin" />
              <span className="font-label-caps text-xs text-[#FFD700] tracking-[0.3em] uppercase font-bold">
                CLASSIFIED MULTIVERSE CONCLAVE
              </span>
            </div>

            {/* Central Mystical Symbol & Aura Visual */}
            <div className="relative my-4 flex items-center justify-center">
              {/* Outer Rotating Mandala Gear */}
              <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-full border border-[#C9A34E]/40 border-dashed animate-[spin_30s_linear_infinite]" />
              <div className="absolute w-28 h-28 sm:w-36 sm:h-36 rounded-full border border-[#7C3AED]/50 animate-[spin_18s_linear_infinite_reverse]" />

              {/* Pulsing Core Emblem */}
              <div className="absolute p-5 bg-[#141414] rounded-full border-2 border-[#FFD700] shadow-[0_0_40px_rgba(255,215,0,0.4)] flex items-center justify-center">
                <Crown className="w-10 h-10 text-[#FFD700] animate-pulse" />
              </div>
            </div>

            <h3 className="font-serif-luxury text-2xl sm:text-4xl font-bold text-[#F5F3ED] my-4 tracking-wide text-glow-gold">
              The Sovereign Mythos & Cosmic Multiverse Crisis
            </h3>

            <p className="font-sans text-sm sm:text-base text-[#D9D7D2]/80 font-light max-w-2xl mx-auto mb-8 leading-relaxed">
              An unscripted, highly classified crisis simulation where ancient celestial power and cosmic guardians collide in the grand hall of diplomacy.
            </p>

            {/* ANIMATED RUNNING TICKER / QUOTES OF SUSPENSE */}
            <div className="w-full bg-[#080808] border-y border-[#C9A34E]/40 py-3.5 mb-8 overflow-hidden relative shadow-inner">
              <div className="animate-marquee font-serif-luxury text-sm text-[#FFD700] italic tracking-wide">
                <div className="flex shrink-0 items-center gap-12 pr-12">
                  <span className="flex items-center gap-3">
                    <span className="text-[#C9A34E]">✦</span> "When celestial Divyastras tear through quantum horizons..."
                  </span>
                  <span className="flex items-center gap-3">
                    <span className="text-[#7C3AED]">✦</span> "Sovereign thrones collide with cosmic guardians in an unscripted crisis..."
                  </span>
                  <span className="flex items-center gap-3">
                    <span className="text-[#C9A34E]">✦</span> "Who dictates law when ancient myths meet multiversal power?"
                  </span>
                  <span className="flex items-center gap-3">
                    <span className="text-[#00E676]">✦</span> "A classified assembly where time, technology, and immortality converge..."
                  </span>
                  <span className="flex items-center gap-3">
                    <span className="text-[#FFD700]">✦</span> "Decryption clearance required for the ultimate diplomatic simulation."
                  </span>
                </div>
                {/* Duplicated for smooth infinite loop */}
                <div className="flex shrink-0 items-center gap-12 pr-12" aria-hidden="true">
                  <span className="flex items-center gap-3">
                    <span className="text-[#C9A34E]">✦</span> "When celestial Divyastras tear through quantum horizons..."
                  </span>
                  <span className="flex items-center gap-3">
                    <span className="text-[#7C3AED]">✦</span> "Sovereign thrones collide with cosmic guardians in an unscripted crisis..."
                  </span>
                  <span className="flex items-center gap-3">
                    <span className="text-[#C9A34E]">✦</span> "Who dictates law when ancient myths meet multiversal power?"
                  </span>
                  <span className="flex items-center gap-3">
                    <span className="text-[#00E676]">✦</span> "A classified assembly where time, technology, and immortality converge..."
                  </span>
                  <span className="flex items-center gap-3">
                    <span className="text-[#FFD700]">✦</span> "Decryption clearance required for the ultimate diplomatic simulation."
                  </span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={handleOverrideClearance}
              className="px-6 py-3 bg-gradient-to-r from-[#4B2D8A] via-[#C9A34E] to-[#E5B83B] text-[#141414] font-label-caps text-xs font-bold uppercase tracking-[0.2em] hover:brightness-125 shadow-[0_0_25px_rgba(201,163,78,0.4)] transition-all transform hover:scale-105"
            >
              Request Override Access
            </button>
          </div>
        </div>

        {/* Vault State: Locked vs Decrypted */}
        <AnimatePresence mode="wait">
          {!isUnlocked ? (
            <motion.div
              key="locked"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="glass-panel-gold p-8 max-w-lg mx-auto border border-[#C9A34E]/40"
            >
              <div className="flex items-center justify-center gap-2 mb-4 text-[#C9A34E]">
                <Terminal className="w-4 h-4" />
                <span className="font-label-caps text-xs tracking-widest uppercase font-bold">
                  Enter Security Clearance
                </span>
              </div>

              <form onSubmit={handleUnlockVault} className="space-y-4">
                <input
                  type="text"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  placeholder="Passcode: e.g. AEQUITAS"
                  className="w-full px-4 py-3 bg-[#141414] border border-white/10 text-[#F5F3ED] font-mono text-center text-sm focus:border-[#C9A34E] focus:outline-none uppercase tracking-widest"
                />

                {errorMsg && (
                  <p className="font-sans text-xs text-[#93000A] font-semibold">{errorMsg}</p>
                )}

                <div className="flex items-center gap-3">
                  <button
                    type="submit"
                    className="flex-1 py-3 bg-[#4B2D8A] text-[#F5F3ED] font-label-caps text-xs tracking-widest uppercase font-bold hover:bg-[#C9A34E] hover:text-[#141414] transition-colors border border-[#C9A34E]/40"
                  >
                    Decrypt Vault
                  </button>
                  <button
                    type="button"
                    onClick={handleOverrideClearance}
                    className="px-4 py-3 bg-[#141414] text-[#C9A34E] border border-[#C9A34E]/30 font-label-caps text-xs tracking-widest uppercase hover:bg-[#C9A34E]/10"
                  >
                    Bypass
                  </button>
                </div>
              </form>
            </motion.div>
          ) : (
            <motion.div
              key="unlocked"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              className="glass-panel-gold p-8 max-w-xl mx-auto border border-[#C9A34E] shadow-[0_0_60px_rgba(201,163,78,0.3)] text-left"
            >
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
                <span className="font-label-caps text-xs text-[#C9A34E] tracking-widest uppercase font-bold flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4" />
                  CLASSIFIED DOSSIER DECRYPTED
                </span>
                <span className="font-mono text-xs text-[#75735B]">CLEARANCE: LEVEL 5</span>
              </div>

              <div className="space-y-4 mb-8">
                <div className="p-4 bg-[#141414] border border-white/10">
                  <span className="font-label-caps text-[9px] text-[#75735B] uppercase block mb-1">Codename</span>
                  <p className="font-serif-luxury text-xl font-bold text-[#F5F3ED]">Operation Sovereign Horizon</p>
                </div>

                <div className="p-4 bg-[#141414] border border-white/10">
                  <span className="font-label-caps text-[9px] text-[#75735B] uppercase block mb-1">Crisis Teaser Briefing</span>
                  <p className="font-sans text-xs text-[#D9D7D2] font-light leading-relaxed">
                    A sudden blackout over international communications infrastructure triggering emergency executive decrees across South Asia. Non-state entities deploy autonomous financial protocol overrides.
                  </p>
                </div>
              </div>

              {!subscribed ? (
                <form onSubmit={handleSubscribeClassified} className="space-y-3">
                  <span className="font-label-caps text-[10px] text-[#C9A34E] uppercase tracking-widest block font-bold">
                    Receive Classified Dispatch Prior To Public Reveal:
                  </span>
                  <div className="flex gap-2">
                    <input
                      type="email"
                      value={userEmail}
                      onChange={(e) => setUserEmail(e.target.value)}
                      required
                      placeholder="Enter delegate email..."
                      className="flex-1 px-4 py-2.5 bg-[#141414] border border-white/10 text-xs text-[#F5F3ED] focus:border-[#C9A34E] focus:outline-none"
                    />
                    <button
                      type="submit"
                      className="px-5 py-2.5 bg-[#C9A34E] text-[#141414] font-label-caps text-xs font-bold uppercase tracking-widest hover:brightness-110"
                    >
                      Subscribe
                    </button>
                  </div>
                </form>
              ) : (
                <div className="p-4 bg-[#4B2D8A]/30 border border-[#4B2D8A] text-center">
                  <Check className="w-6 h-6 text-[#C9A34E] mx-auto mb-1" />
                  <p className="font-label-caps text-xs text-[#F5F3ED] font-bold">
                    Classified Security Clearance Granted. Check email inbox for dispatch updates.
                  </p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
