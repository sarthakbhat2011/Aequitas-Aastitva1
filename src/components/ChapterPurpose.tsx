import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Shield, Feather, Globe2, Crown, Sparkles, Scale } from 'lucide-react';

export const ChapterPurpose: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

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

  return (
    <section id="purpose" className="relative min-h-screen py-32 bg-[#141414] overflow-hidden flex flex-col justify-center border-t border-b border-[#C9A34E]/25">
      {/* Page Vibe Background Visual Illustration: Gupta Imperial Decree Seal & Geometric Mandala */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-45 md:opacity-55 transition-opacity duration-1000">
        <svg className="w-full h-full text-[#C9A34E]" viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid slice" fill="none">
          {/* Animated Central Mandalic Concentric Rings */}
          <circle cx="500" cy="500" r="440" stroke="#C9A34E" strokeWidth="1.2" strokeDasharray="8 10" className="animate-[spin_70s_linear_infinite]" />
          <circle cx="500" cy="500" r="360" stroke="#FFD700" strokeWidth="1.8" className="animate-[spin_45s_linear_infinite_reverse]" />
          <circle cx="500" cy="500" r="280" stroke="#9333EA" strokeWidth="1.5" strokeDasharray="14 14" className="animate-[spin_30s_linear_infinite]" />
          <circle cx="500" cy="500" r="190" stroke="#C9A34E" strokeWidth="1" strokeDasharray="4 6" className="animate-[spin_20s_linear_infinite_reverse]" />

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
              strokeOpacity="0.5"
            />
          ))}

          {/* Floating Orbiting Star Particles */}
          {[
            { cx: 500, cy: 60, color: "#FFD700", r: 5 },
            { cx: 940, cy: 500, color: "#A855F7", r: 6 },
            { cx: 500, cy: 940, color: "#FFD700", r: 5 },
            { cx: 60, cy: 500, color: "#A855F7", r: 6 },
          ].map((pt, i) => (
            <circle
              key={i}
              cx={pt.cx}
              cy={pt.cy}
              r={pt.r}
              fill={pt.color}
              className="animate-ping"
            />
          ))}

          {/* Corner Imperial Lotus Seals */}
          <g transform="translate(100, 100)" className="animate-pulse">
            <polygon points="0,-35 25,-12 35,0 25,12 0,35 -25,12 -35,0 -25,-12" fill="none" stroke="#FFD700" strokeWidth="1.5" />
          </g>
          <g transform="translate(900, 100)" className="animate-pulse">
            <polygon points="0,-35 25,-12 35,0 25,12 0,35 -25,12 -35,0 -25,-12" fill="none" stroke="#A855F7" strokeWidth="1.5" />
          </g>
          <g transform="translate(100, 900)" className="animate-pulse">
            <polygon points="0,-35 25,-12 35,0 25,12 0,35 -25,12 -35,0 -25,-12" fill="none" stroke="#A855F7" strokeWidth="1.5" />
          </g>
          <g transform="translate(900, 900)" className="animate-pulse">
            <polygon points="0,-35 25,-12 35,0 25,12 0,35 -25,12 -35,0 -25,-12" fill="none" stroke="#FFD700" strokeWidth="1.5" />
          </g>
        </svg>
      </div>

      {/* Floating Light Beams Sweep */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
        <div className="w-[150%] h-32 bg-gradient-to-r from-transparent via-[#C9A34E]/30 to-transparent animate-beam" />
      </div>

      {/* Rich Background Glows */}
      <div className="absolute top-1/4 left-10 w-[500px] h-[500px] bg-[#4B2D8A]/25 rounded-full blur-[110px] pointer-events-none animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-10 w-[500px] h-[500px] bg-[#C9A34E]/20 rounded-full blur-[110px] pointer-events-none animate-pulse-glow" />


      <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10 w-full">
        {/* Chapter Header Badge */}
        <div className="text-center mb-16">
          <span className="font-label-caps text-xs text-[#C9A34E] tracking-[0.3em] uppercase block mb-3">
            Chapter One — Purpose
          </span>
          <h2 className="font-serif-luxury text-xl md:text-2xl text-[#D9D7D2]/60 font-light italic">
            Not About Us.
          </h2>
        </div>

        {/* Cinematic Statement Reveal Container */}
        <div className="min-h-[220px] md:min-h-[280px] flex items-center justify-center text-center my-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, scale: 0.96, filter: 'blur(10px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 1.04, filter: 'blur(10px)' }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-4"
            >
              <span className="font-label-caps text-xs text-[#4B2D8A] tracking-[0.4em] uppercase font-bold block">
                [ Statement 0{activeStep + 1} ]
              </span>
              <p className="font-serif-luxury text-3xl sm:text-5xl md:text-6xl text-[#F5F3ED] font-bold text-glow-gold max-w-4xl leading-tight">
                "{statements[activeStep]}"
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Step Indicator Dots */}
        <div className="flex justify-center items-center gap-3 mb-24">
          {statements.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveStep(idx)}
              className={`h-1.5 transition-all duration-500 rounded-full ${
                activeStep === idx
                  ? 'w-10 bg-[#C9A34E] shadow-[0_0_12px_rgba(201,163,78,0.8)]'
                  : 'w-2 bg-[#75735B]/40 hover:bg-[#D9D7D2]'
              }`}
              aria-label={`Jump to statement ${idx + 1}`}
            />
          ))}
        </div>

        {/* Three Core Ideological Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
        </div>
      </div>
    </section>
  );
};
