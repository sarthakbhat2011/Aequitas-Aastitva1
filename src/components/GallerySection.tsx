import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GALLERY_ITEMS } from '../data/content';
import { GalleryItem } from '../types';
import { Maximize2, X, Filter, Sparkles } from 'lucide-react';

export const GallerySection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeLightbox, setActiveLightbox] = useState<GalleryItem | null>(null);

  const categories = ['All', 'Diplomacy', 'Heritage', 'Debates', 'Delegates'];

  const filteredItems = selectedCategory === 'All'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((item) => item.category === selectedCategory);

  return (
    <section id="gallery" className="relative py-32 bg-[#141414] overflow-hidden">
      {/* Page Vibe Background Visual Illustration: Archival Gallery Lattice & Floating Frames */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-50 md:opacity-60 transition-opacity duration-1000">
        <svg className="w-full h-full text-[#C9A34E]" viewBox="0 0 1200 900" preserveAspectRatio="xMidYMid slice" fill="none">
          {/* Geometric Diamond Gallery Grid */}
          <pattern id="galleryGrid" width="100" height="100" patternUnits="userSpaceOnUse">
            <path d="M 50 0 L 100 50 L 50 100 L 0 50 Z" stroke="#C9A34E" strokeWidth="0.8" strokeOpacity="0.4" fill="none" />
            <circle cx="50" cy="50" r="3.5" fill="#FFD700" fillOpacity="0.7" />
          </pattern>
          <rect width="1200" height="900" fill="url(#galleryGrid)" />

          {/* Large Floating Archival Gold & Purple Frames */}
          <rect x="120" y="80" width="300" height="220" stroke="#FFD700" strokeWidth="1.8" strokeDasharray="12 8" className="animate-pulse" />
          <rect x="760" y="150" width="340" height="240" stroke="#A855F7" strokeWidth="2" className="animate-pulse" />
          <rect x="380" y="520" width="380" height="260" stroke="#C9A34E" strokeWidth="1.5" strokeDasharray="6 6" />

          {/* Corner Glowing Archival Emblems */}
          <circle cx="270" cy="190" r="12" stroke="#FFD700" strokeWidth="1" fill="#C9A34E" fillOpacity="0.2" className="animate-ping" />
          <circle cx="930" cy="270" r="14" stroke="#A855F7" strokeWidth="1" fill="#7C3AED" fillOpacity="0.2" className="animate-ping" />

          {/* Diagonal Golden Rays */}
          <line x1="0" y1="0" x2="1200" y2="900" stroke="#FFD700" strokeWidth="0.8" strokeOpacity="0.4" />
          <line x1="1200" y1="0" x2="0" y2="900" stroke="#A855F7" strokeWidth="0.8" strokeOpacity="0.4" />
        </svg>
      </div>

      {/* Floating Light Beams Sweep */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-35">
        <div className="w-[150%] h-36 bg-gradient-to-r from-transparent via-[#C9A34E]/30 to-transparent animate-beam" />
      </div>

      {/* Rich Background Radial Spotlights */}
      <div className="absolute top-1/3 right-10 w-[600px] h-[600px] bg-[#4B2D8A]/25 rounded-full blur-[120px] pointer-events-none animate-pulse-glow" />
      <div className="absolute bottom-1/3 left-10 w-[600px] h-[600px] bg-[#C9A34E]/20 rounded-full blur-[120px] pointer-events-none animate-pulse-glow" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-label-caps text-xs text-[#C9A34E] tracking-[0.3em] uppercase block mb-3">
            Archives & Visual Chronicle
          </span>
          <h2 className="font-serif-luxury text-3xl sm:text-5xl text-[#F5F3ED] font-bold text-glow-gold mb-6">
            The Gallery of Assemblies
          </h2>
          <p className="font-sans text-base text-[#D9D7D2]/80 font-light leading-relaxed">
            Moments captured across parliamentary halls, high-level diplomatic caucuses, and constitutional debates.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2 font-label-caps text-xs tracking-widest uppercase transition-all duration-300 ${
                selectedCategory === cat
                  ? 'bg-[#4B2D8A] text-[#F5F3ED] border border-[#C9A34E] shadow-[0_0_15px_rgba(201,163,78,0.3)] font-bold'
                  : 'bg-[#141414] text-[#D9D7D2]/70 border border-white/10 hover:border-[#C9A34E]/40 hover:text-[#F5F3ED]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08, duration: 0.6 }}
              onClick={() => setActiveLightbox(item)}
              className="group cursor-pointer glass-panel relative overflow-hidden aspect-[4/3] border border-white/10 hover:border-[#C9A34E]/60 transition-all duration-500"
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 mix-blend-luminosity group-hover:mix-blend-normal"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

              {/* Info Overlay */}
              <div className="absolute inset-0 p-6 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <span className="font-label-caps text-[9px] px-2.5 py-1 bg-[#141414]/80 border border-[#C9A34E]/30 text-[#C9A34E] uppercase tracking-widest">
                    {item.category}
                  </span>
                  <div className="p-2 bg-[#141414]/80 border border-white/10 text-[#F5F3ED] group-hover:text-[#C9A34E] transition-colors">
                    <Maximize2 className="w-4 h-4" />
                  </div>
                </div>

                <div>
                  <h3 className="font-serif-luxury text-xl text-[#F5F3ED] font-bold mb-1">
                    {item.title}
                  </h3>
                  <p className="font-sans text-xs text-[#D9D7D2]/70 font-light line-clamp-2">
                    {item.caption}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeLightbox && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/95 backdrop-blur-xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              className="glass-panel-gold max-w-4xl w-full p-6 relative border border-[#C9A34E]/50 shadow-[0_0_60px_rgba(201,163,78,0.3)] text-[#F5F3ED] overflow-hidden"
            >
              <button
                onClick={() => setActiveLightbox(null)}
                className="absolute top-4 right-4 z-10 p-2 bg-[#141414]/80 text-[#F5F3ED] hover:text-[#C9A34E] transition-colors border border-white/10"
                aria-label="Close Lightbox"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="space-y-6">
                <div className="aspect-video w-full overflow-hidden bg-[#141414] border border-white/10">
                  <img
                    src={activeLightbox.imageUrl}
                    alt={activeLightbox.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-4 border-t border-white/10">
                  <div>
                    <span className="font-label-caps text-[10px] text-[#C9A34E] uppercase tracking-widest block mb-1">
                      {activeLightbox.category} • Assembly Year {activeLightbox.year}
                    </span>
                    <h3 className="font-serif-luxury text-2xl font-bold text-[#F5F3ED]">
                      {activeLightbox.title}
                    </h3>
                    <p className="font-sans text-sm text-[#D9D7D2] font-light mt-1">
                      {activeLightbox.caption}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
