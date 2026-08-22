import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BRAND_LOGOS } from '../data/content';
import { Sparkles, Shield, Compass, Crown } from 'lucide-react';

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onLoadingComplete }) => {
  const [progress, setProgress] = useState(0);
  const [statusIndex, setStatusIndex] = useState(0);

  const statusMessages = [
    "INITIALIZING PARLIAMENTARY CHAMBERS...",
    "VERIFYING DIPLOMATIC CREDENTIALS...",
    "LOADING SOVEREIGN ARCHIVES & PROTOCOLS...",
    "DECRYPTING LEGISLATIVE CLEARANCE...",
    "ASSEMBLY PREPARED. WELCOME DELEGATE."
  ];

  const onCompleteRef = React.useRef(onLoadingComplete);
  useEffect(() => {
    onCompleteRef.current = onLoadingComplete;
  }, [onLoadingComplete]);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          timeoutId = setTimeout(() => {
            if (onCompleteRef.current) onCompleteRef.current();
          }, 350);
          return 100;
        }

        // Smooth smaller progress steps
        const diff = Math.floor(Math.random() * 8) + 5;
        const next = Math.min(100, prev + diff);

        if (next >= 100) {
          clearInterval(interval);
          timeoutId = setTimeout(() => {
            if (onCompleteRef.current) onCompleteRef.current();
          }, 350);
          return 100;
        }

        // Update status index based on progress
        if (next > 80) setStatusIndex(4);
        else if (next > 60) setStatusIndex(3);
        else if (next > 40) setStatusIndex(2);
        else if (next > 20) setStatusIndex(1);

        return next;
      });
    }, 60);

    return () => {
      clearInterval(interval);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.02, filter: 'blur(12px)' }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0E0E0E] text-[#F5F3ED] overflow-hidden select-none"
    >
      {/* Radial Gold/Purple Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-r from-[#4B2D8A]/25 via-[#C9A34E]/15 to-transparent rounded-full blur-[150px] pointer-events-none animate-pulse-glow" />

      {/* Subtle Grid Lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20 pointer-events-none" />

      {/* Main Loading Emblem & Content */}
      <div className="relative z-10 flex flex-col items-center max-w-lg mx-auto px-6 text-center">
        
        {/* Animated Emblem Ring */}
        <div className="relative mb-8 flex items-center justify-center">
          {/* Rotating Outer Royal Seal Ring */}
          <div className="absolute w-40 h-40 rounded-full border border-[#C9A34E]/30 border-dashed animate-[spin_20s_linear_infinite]" />
          <div className="absolute w-32 h-32 rounded-full border border-[#4B2D8A]/50 animate-[spin_12s_linear_infinite_reverse]" />
          
          {/* Central Logo Emblem Pair */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1 }}
            className="relative flex items-center gap-4 p-3 bg-[#141414] rounded-full border border-[#C9A34E]/50 shadow-[0_0_50px_rgba(201,163,78,0.4)]"
          >
            <img
              src={BRAND_LOGOS.aequitas}
              alt="Aequitas Emblem"
              className="w-16 h-16 rounded-full object-cover border border-[#C9A34E]"
            />
            <img
              src={BRAND_LOGOS.aastitva}
              alt="Aastitva Emblem"
              className="w-16 h-16 rounded-full object-cover border border-[#4B2D8A]"
            />
          </motion.div>
        </div>

        {/* Title */}
        <motion.div
          initial={{ y: 15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="space-y-1 mb-8"
        >
          <span className="font-label-caps text-[10px] text-[#C9A34E] tracking-[0.4em] uppercase font-bold block">
            The Flagship Indian Youth Diplomatic Assembly
          </span>
          <h1 className="font-serif-luxury text-2xl sm:text-3xl font-bold tracking-tight text-[#F5F3ED] text-glow-gold">
            Aequitas <span className="text-[#C9A34E]">×</span> Aastitva
          </h1>
          <p className="font-serif-luxury text-xs text-[#D9D7D2]/60 italic">
            Where Justice Meets Identity
          </p>
        </motion.div>

        {/* Dynamic Status Text */}
        <div className="min-h-[24px] mb-6 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.span
              key={statusIndex}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.3 }}
              className="font-label-caps text-[10px] text-[#C9A34E] tracking-[0.2em] uppercase font-semibold flex items-center gap-2"
            >
              <Sparkles className="w-3 h-3 text-[#C9A34E] animate-spin" />
              <span>{statusMessages[statusIndex]}</span>
            </motion.span>
          </AnimatePresence>
        </div>

        {/* Progress Bar Container */}
        <div className="w-full bg-[#141414] border border-[#C9A34E]/30 p-1 rounded-none shadow-[0_0_20px_rgba(201,163,78,0.2)] mb-4">
          <div
            className="h-1.5 bg-gradient-to-r from-[#4B2D8A] via-[#C9A34E] to-[#F5F3ED] transition-all duration-300 ease-out shadow-[0_0_15px_rgba(201,163,78,0.8)]"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Percentage Counter */}
        <div className="flex justify-between items-center w-full font-mono text-[10px] text-[#75735B] uppercase tracking-widest">
          <span>CLEARANCE PROTOCOL 2026</span>
          <span className="text-[#C9A34E] font-bold">{progress}%</span>
        </div>

      </div>
    </motion.div>
  );
};
