import React, { useState, useEffect } from 'react';
import { Menu, X, Home, Compass, Shield, Crown, Sparkles, Image, Volume2, VolumeX } from 'lucide-react';
import { BRAND_LOGOS } from '../data/content';
import { soundEngine } from '../utils/audio';
import { ISTClock } from './ISTClock';

interface NavbarProps {
  onOpenApply: () => void;
  activeSection: string;
  onSelectSection: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenApply, activeSection, onSelectSection }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    setIsMuted(soundEngine.getMuted());
  }, []);

  const toggleSound = () => {
    const muted = soundEngine.toggleMute();
    setIsMuted(muted);
    if (!muted) soundEngine.playClick();
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', id: 'home', icon: Home },
    { name: 'Purpose', id: 'purpose', icon: Compass },
    { name: 'Experiences', id: 'experiences', icon: Shield },
    { name: 'Committees', id: 'committees', icon: Crown },
    { name: 'Gallery', id: 'gallery', icon: Image },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    onSelectSection(id);
    setMobileMenuOpen(false);
    if (window.location.hash !== `#${id}`) {
      window.history.pushState(null, '', `#${id}`);
    }

    // Scroll desktop view smooth to top of page section view
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'py-3 bg-[#141414]/85 backdrop-blur-2xl border-b border-[#C9A34E]/20 shadow-[0_10px_30px_rgba(0,0,0,0.8)]'
            : 'py-6 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Brand Emblem & Logos */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, 'home')}
            className="flex items-center gap-3 group"
          >
            <div className="relative flex items-center -space-x-2">
              <img
                src={BRAND_LOGOS.aequitas}
                alt="Aequitas"
                className="w-9 h-9 rounded-full border border-[#C9A34E]/40 object-cover shadow-[0_0_15px_rgba(201,163,78,0.25)] transition-transform duration-300 group-hover:scale-105"
              />
              <img
                src={BRAND_LOGOS.aastitva}
                alt="Aastitva"
                className="w-9 h-9 rounded-full border border-[#4B2D8A]/50 object-cover shadow-[0_0_15px_rgba(75,45,138,0.3)] transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-serif-luxury text-lg md:text-xl font-bold tracking-tight text-[#F5F3ED] flex items-center gap-1.5">
                Aequitas <span className="text-[#C9A34E] font-sans text-xs">×</span> Aastitva
              </span>
              <span className="font-label-caps text-[9px] text-[#C9A34E] tracking-widest uppercase">
                Youth Diplomatic Assembly
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 bg-[#141414]/60 px-6 py-2.5 rounded-full border border-white/10 backdrop-blur-md">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={(e) => handleNavClick(e, link.id)}
                  className={`font-label-caps text-xs tracking-wider uppercase transition-all duration-300 relative py-1 ${
                    isActive
                      ? 'text-[#C9A34E] font-bold'
                      : 'text-[#D9D7D2]/80 hover:text-[#F5F3ED]'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#C9A34E] to-[#4B2D8A] rounded-full" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Action CTA Button, Audio Toggle & Tiny Aesthetic IST Clock */}
          <div className="hidden md:flex items-center gap-3">
            <ISTClock />

            <button
              onClick={toggleSound}
              onMouseEnter={() => soundEngine.playHover()}
              title={isMuted ? "Unmute Ambient SFX" : "Mute SFX"}
              className="p-2 rounded-full border border-white/15 bg-[#141414]/60 text-[#C9A34E] hover:text-[#F5F3ED] hover:border-[#C9A34E]/50 transition-all duration-300 backdrop-blur-md"
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-[#75735B]" /> : <Volume2 className="w-4 h-4 text-[#C9A34E]" />}
            </button>

            <button
              onClick={() => {
                soundEngine.playClick();
                onOpenApply();
              }}
              onMouseEnter={() => soundEngine.playHover()}
              className="group relative inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-[#4B2D8A] to-[#2A1852] text-[#F5F3ED] font-label-caps text-xs tracking-widest uppercase rounded-none border border-[#C9A34E]/40 hover:border-[#C9A34E] transition-all duration-300 shadow-[0_0_20px_rgba(75,45,138,0.4)] hover:shadow-[0_0_30px_rgba(201,163,78,0.4)] overflow-hidden"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-[#C9A34E]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <Sparkles className="w-3.5 h-3.5 text-[#C9A34E] animate-pulse" />
              <span className="relative z-10 font-bold">Take Your Seat</span>
            </button>
          </div>

          {/* Mobile Right Corner Controls */}
          <div className="flex md:hidden items-center gap-2">
            <ISTClock />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-[#F5F3ED] p-2 hover:text-[#C9A34E] transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Top Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden glass-panel-gold border-b border-[#C9A34E]/30 px-6 py-6 mt-2 space-y-4 animate-in fade-in slide-in-from-top-4 duration-300">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={(e) => handleNavClick(e, link.id)}
                  className={`flex items-center gap-3 font-serif-luxury text-lg py-2 border-b border-white/5 transition-colors ${
                    isActive ? 'text-[#C9A34E] font-bold' : 'text-[#F5F3ED] hover:text-[#C9A34E]'
                  }`}
                >
                  <link.icon className={`w-5 h-5 ${isActive ? 'text-[#C9A34E]' : 'text-[#75735B]'}`} />
                  <span>{link.name} Segment</span>
                </a>
              );
            })}
            <div className="pt-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenApply();
                }}
                className="w-full py-3 bg-gradient-to-r from-[#4B2D8A] to-[#C9A34E]/80 text-[#F5F3ED] font-label-caps text-xs tracking-widest uppercase font-bold text-center border border-[#C9A34E]/50"
              >
                Take Your Seat
              </button>
            </div>
          </div>
        )}
      </header>

      {/* MOBILE BOTTOM PAGE NAVIGATION DOCK (Strictly for Mobile Version Page-by-Page Navigation) */}
      <nav
        className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#0F0E11]/95 backdrop-blur-xl border-t border-[#C9A34E]/30 px-2 py-2 flex items-center justify-around shadow-[0_-10px_30px_rgba(0,0,0,0.9)]"
        aria-label="Mobile Bottom Page Navigation"
      >
        {navLinks.map((link) => {
          const Icon = link.icon;
          const isActive = activeSection === link.id;
          return (
            <button
              key={link.id}
              onClick={(e) => {
                e.preventDefault();
                onSelectSection(link.id);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`relative flex flex-col items-center justify-center flex-1 py-1 transition-all duration-300 ${
                isActive ? 'text-[#C9A34E]' : 'text-[#75735B] hover:text-[#F5F3ED]'
              }`}
            >
              {isActive && (
                <span className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-gradient-to-r from-[#C9A34E] to-[#4B2D8A] rounded-full shadow-[0_0_10px_#C9A34E]" />
              )}
              <Icon className={`w-5 h-5 mb-0.5 transition-transform duration-300 ${isActive ? 'scale-110 text-[#C9A34E]' : ''}`} />
              <span className={`font-label-caps text-[9px] tracking-wider uppercase ${isActive ? 'font-bold text-[#F5F3ED]' : ''}`}>
                {link.name}
              </span>
            </button>
          );
        })}
      </nav>
    </>
  );
};
