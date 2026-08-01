import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { COMMITTEES } from '../data/content';
import { Committee } from '../types';
import {
  Flame,
  ShieldAlert,
  Crown,
  Landmark,
  Globe2,
  Trophy,
  ArrowRight,
  X,
  Sparkles,
  FileText,
  DollarSign,
  TrendingUp,
  ChevronRight,
  Search,
  Filter
} from 'lucide-react';

interface ChapterCommitteesProps {
  onOpenApplyForCommittee: (committeeId: string) => void;
}

export const ChapterCommittees: React.FC<ChapterCommitteesProps> = ({ onOpenApplyForCommittee }) => {
  const [selectedCommittee, setSelectedCommittee] = useState<Committee | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  // IPL Auction interactive state
  const [biddingPlayer, setBiddingPlayer] = useState({
    name: 'Jasprit Bumrah',
    basePrice: 2.0,
    currentBid: 14.5,
    highestBidder: 'Mumbai Indians',
  });
  const [userPurse, setUserPurse] = useState(45.0);

  const handlePlaceBid = () => {
    const nextBid = Number((biddingPlayer.currentBid + 0.5).toFixed(1));
    if (userPurse >= nextBid) {
      setBiddingPlayer((prev) => ({
        ...prev,
        currentBid: nextBid,
        highestBidder: 'Your Franchise',
      }));
      setUserPurse((prev) => Number((prev - 0.5).toFixed(1)));
    }
  };

  const filteredCommittees = useMemo(() => {
    return COMMITTEES.filter((comm) => {
      const matchesCategory =
        activeCategory === 'All' ||
        comm.category.toLowerCase().includes(activeCategory.toLowerCase()) ||
        (activeCategory === 'Crisis' && comm.id === 'ccc') ||
        (activeCategory === 'National' && (comm.id === 'lok-sabha' || comm.id === 'jkla')) ||
        (activeCategory === 'International' && (comm.id === 'unhrc' || comm.id === 'un-women')) ||
        (activeCategory === 'Specialized' && comm.id === 'ipl-auction');

      const matchesSearch =
        searchQuery === '' ||
        comm.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        comm.abbreviation.toLowerCase().includes(searchQuery.toLowerCase()) ||
        comm.agenda.toLowerCase().includes(searchQuery.toLowerCase()) ||
        comm.keyTopics.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const getCommitteeIcon = (id: string) => {
    switch (id) {
      case 'ccc': return <Flame className="w-6 h-6 text-[#93000A]" />;
      case 'jkla': return <ShieldAlert className="w-6 h-6 text-[#00E676]" />;
      case 'un-women': return <Crown className="w-6 h-6 text-[#E6DEFF]" />;
      case 'lok-sabha': return <Landmark className="w-6 h-6 text-[#C9A34E]" />;
      case 'unhrc': return <Globe2 className="w-6 h-6 text-[#D9D7D2]" />;
      case 'ipl-auction': return <Trophy className="w-6 h-6 text-[#FFD700]" />;
      default: return <Landmark className="w-6 h-6 text-[#C9A34E]" />;
    }
  };

  return (
    <section id="committees" className="relative py-32 bg-[#141414] overflow-hidden">
      {/* Page Vibe Background Visual Illustration: Nagara Gateway Arches & Assembly Chamber Radial Seating */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-20">
        <svg className="w-full h-full text-[#C9A34E]" viewBox="0 0 1000 900" preserveAspectRatio="xMidYMid slice" fill="none">
          {/* Parliamentary Chamber Concentric Radial Arc Rows */}
          <path d="M 100 800 A 400 400 0 0 1 900 800" stroke="currentColor" strokeWidth="1" strokeDasharray="10 8" />
          <path d="M 200 800 A 300 300 0 0 1 800 800" stroke="currentColor" strokeWidth="1.5" />
          <path d="M 300 800 A 200 200 0 0 1 700 800" stroke="#7C3AED" strokeWidth="1" strokeDasharray="6 6" />

          {/* Central Throne Sceptre Rays */}
          <line x1="500" y1="800" x2="500" y2="100" stroke="currentColor" strokeWidth="1.5" className="animate-pulse" />
          <line x1="500" y1="800" x2="200" y2="150" stroke="currentColor" strokeWidth="0.5" />
          <line x1="500" y1="800" x2="800" y2="150" stroke="currentColor" strokeWidth="0.5" />

          {/* Nagara Temple Arch Silhouette Outer Gate */}
          <path d="M 250 800 L 250 350 L 500 150 L 750 350 L 750 800" stroke="currentColor" strokeWidth="1.5" fill="none" />
          <path d="M 320 800 L 320 400 L 500 250 L 680 400 L 680 800" stroke="#7C3AED" strokeWidth="1" fill="none" />

          {/* Floating Sacred Crest */}
          <circle cx="500" cy="150" r="25" stroke="#FFD700" strokeWidth="1.5" fill="none" className="animate-ping" />
        </svg>
      </div>

      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#C9A34E]/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="font-label-caps text-xs text-[#C9A34E] tracking-[0.3em] uppercase block mb-3">
            Chapter Three — Committees
          </span>
          <h2 className="font-serif-luxury text-3xl sm:text-5xl text-[#F5F3ED] font-bold text-glow-gold mb-6">
            The Six Sovereign Chambers
          </h2>
          <p className="font-sans text-base text-[#D9D7D2]/80 font-light leading-relaxed">
            Each committee represents an immersive environment with tailored agendas, distinct atmospheres, and rigorous parliamentary scrutiny.
          </p>
        </div>

        {/* Committee Filter & Search Bar */}
        <div className="max-w-4xl mx-auto mb-16 space-y-6">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-[#C9A34E]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by committee title, agenda, or keyword..."
              className="w-full pl-12 pr-4 py-3.5 bg-[#181818] border border-white/15 text-sm text-[#F5F3ED] focus:border-[#C9A34E] focus:outline-none transition-colors rounded-none placeholder:text-[#75735B]"
            />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2">
            {['All', 'Crisis', 'National', 'International', 'Specialized'].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`font-label-caps text-xs px-4 py-2 uppercase tracking-wider transition-all duration-300 ${
                  activeCategory === cat
                    ? 'bg-[#C9A34E] text-[#141414] font-bold shadow-[0_0_20px_rgba(201,163,78,0.3)]'
                    : 'bg-[#181818] text-[#D9D7D2] border border-white/10 hover:border-[#C9A34E]/50'
                }`}
              >
                {cat === 'All' ? 'All Chambers' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Bento Grid Layout */}
        {filteredCommittees.length === 0 ? (
          <div className="text-center py-16 px-6 glass-panel border border-white/10 max-w-md mx-auto">
            <Search className="w-8 h-8 text-[#C9A34E] mx-auto mb-3 opacity-60" />
            <h3 className="font-serif-luxury text-lg text-[#F5F3ED] font-bold">No Chambers Match Your Search</h3>
            <p className="font-sans text-xs text-[#D9D7D2]/70 mt-1 mb-4">Try searching for keywords like "Crisis", "Lok Sabha", "IPL", or "UN".</p>
            <button
              onClick={() => { setSearchQuery(''); setActiveCategory('All'); }}
              className="px-4 py-2 bg-[#C9A34E] text-[#141414] font-label-caps text-xs font-bold uppercase"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {filteredCommittees.map((comm, idx) => {
              // Span sizes for Bento design
              const isWide = idx === 0 || idx === 3;
              const spanClass = isWide ? 'md:col-span-8' : 'md:col-span-4';

            return (
              <motion.div
                key={comm.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.7 }}
                onClick={() => setSelectedCommittee(comm)}
                className={`group cursor-pointer ${spanClass} relative min-h-[360px] p-8 flex flex-col justify-between overflow-hidden glass-panel border border-white/10 hover:border-[#C9A34E]/60 transition-all duration-500 hover:shadow-[0_15px_40px_rgba(201,163,78,0.2)]`}
              >
                {/* Background Image Overlay with Blend */}
                {comm.bgImageUrl && (
                  <div
                    className="absolute inset-0 z-0 bg-cover bg-center opacity-25 group-hover:scale-105 group-hover:opacity-35 transition-all duration-700 mix-blend-luminosity"
                    style={{ backgroundImage: `url(${comm.bgImageUrl})` }}
                  />
                )}

                {/* Atmosphere Specific Gradient Layer */}
                <div
                  className="absolute inset-0 z-0 opacity-80 group-hover:opacity-90 transition-opacity"
                  style={{
                    background: `linear-gradient(135deg, ${comm.colorScheme.bgGlow} 0%, #141414 80%)`,
                  }}
                />

                {/* Top Content: Badge & Title */}
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className="font-label-caps text-[10px] px-3 py-1 font-bold uppercase tracking-widest border"
                      style={{
                        borderColor: comm.colorScheme.border,
                        color: comm.colorScheme.accent,
                        backgroundColor: 'rgba(20, 20, 20, 0.85)',
                      }}
                    >
                      {comm.category}
                    </span>
                    <div className="p-2 bg-[#141414]/80 border border-white/10">
                      {getCommitteeIcon(comm.id)}
                    </div>
                  </div>

                  <h3 className="font-serif-luxury text-2xl md:text-3xl text-[#F5F3ED] font-bold group-hover:text-[#C9A34E] transition-colors mb-2">
                    {comm.title}
                  </h3>

                  <p className="font-sans text-xs text-[#C9A34E] tracking-wider uppercase font-semibold mb-4">
                    {comm.abbreviation} — {comm.theme}
                  </p>

                  <div className="p-4 bg-[#141414]/90 border border-white/5 rounded-none mb-4">
                    <span className="font-label-caps text-[9px] text-[#75735B] block mb-1 uppercase tracking-widest">
                      Official Agenda
                    </span>
                    <p className="font-sans text-xs text-[#D9D7D2] font-light italic line-clamp-3 leading-relaxed">
                      "{comm.agenda}"
                    </p>
                  </div>
                </div>

                {/* Bottom Footer Action */}
                <div className="relative z-10 pt-4 border-t border-white/10 flex items-center justify-between">
                  <span className="font-label-caps text-[10px] text-[#75735B]">
                    Atmosphere: <span className="text-[#D9D7D2]">{comm.atmosphere}</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5 font-label-caps text-xs text-[#C9A34E] group-hover:translate-x-1 transition-transform">
                    <span>Inspect Chamber</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
        )}
      </div>

      {/* Committee Detail Drawer Modal */}
      <AnimatePresence>
        {selectedCommittee && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 30 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="glass-panel-gold max-w-3xl w-full max-h-[90vh] overflow-y-auto p-8 relative rounded-none border border-[#C9A34E]/50 shadow-[0_0_60px_rgba(201,163,78,0.3)] text-[#F5F3ED]"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedCommittee(null)}
                className="absolute top-6 right-6 p-2 text-[#D9D7D2] hover:text-[#C9A34E] transition-colors"
                aria-label="Close committee view"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Committee Modal Header */}
              <div className="flex items-start gap-4 mb-6 pr-8">
                <div className="p-3.5 bg-[#141414] border border-[#C9A34E]/40 shrink-0">
                  {getCommitteeIcon(selectedCommittee.id)}
                </div>
                <div>
                  <span className="font-label-caps text-[10px] text-[#C9A34E] tracking-widest uppercase block mb-1">
                    {selectedCommittee.category} • {selectedCommittee.abbreviation}
                  </span>
                  <h3 className="font-serif-luxury text-2xl sm:text-4xl font-bold text-[#F5F3ED]">
                    {selectedCommittee.title}
                  </h3>
                </div>
              </div>

              {/* Agenda Box */}
              <div className="p-5 bg-[#141414] border border-[#C9A34E]/30 mb-6">
                <span className="font-label-caps text-[10px] text-[#C9A34E] tracking-widest uppercase block mb-2 font-bold">
                  Official Committee Mandate & Agenda
                </span>
                <p className="font-serif-luxury text-base sm:text-lg text-[#F5F3ED] italic leading-relaxed">
                  "{selectedCommittee.agenda}"
                </p>
              </div>

              <p className="font-sans text-sm text-[#D9D7D2] font-light leading-relaxed mb-6">
                {selectedCommittee.description}
              </p>

              {/* IPL Live Auction Simulator Interactive Widget */}
              {selectedCommittee.id === 'ipl-auction' && (
                <div className="p-6 bg-gradient-to-br from-[#141414] via-[#1F172E] to-[#141414] border border-[#FFD700]/40 mb-8 rounded-none shadow-[0_0_30px_rgba(255,215,0,0.15)]">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Trophy className="w-5 h-5 text-[#FFD700]" />
                      <span className="font-label-caps text-xs text-[#FFD700] tracking-widest uppercase font-bold">
                        Live Auction Simulator
                      </span>
                    </div>
                    <span className="font-label-caps text-xs text-[#E6DEFF]">
                      Your Remaining Purse: <strong className="text-[#FFD700]">₹{userPurse} Cr</strong>
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-[#141414]/80 border border-white/10 mb-4">
                    <div>
                      <span className="font-label-caps text-[9px] text-[#75735B] uppercase block">Marquee Player</span>
                      <span className="font-serif-luxury text-lg font-bold text-[#F5F3ED]">{biddingPlayer.name}</span>
                    </div>
                    <div>
                      <span className="font-label-caps text-[9px] text-[#75735B] uppercase block">Current Highest Bid</span>
                      <span className="font-serif-luxury text-xl font-bold text-[#FFD700]">₹{biddingPlayer.currentBid} Cr</span>
                      <span className="text-[10px] text-[#D9D7D2]/60 block">({biddingPlayer.highestBidder})</span>
                    </div>
                  </div>

                  <button
                    onClick={handlePlaceBid}
                    className="w-full py-3 bg-gradient-to-r from-[#FF3D00] to-[#FFD700] text-[#141414] font-label-caps text-xs tracking-widest uppercase font-bold shadow-lg hover:brightness-110 transition-all flex items-center justify-center gap-2"
                  >
                    <DollarSign className="w-4 h-4" />
                    <span>Raise Bid to ₹{(biddingPlayer.currentBid + 0.5).toFixed(1)} Cr</span>
                  </button>
                </div>
              )}

              {/* Key Discussion Topics */}
              <div className="mb-8">
                <h4 className="font-label-caps text-xs text-[#C9A34E] tracking-widest uppercase font-bold mb-3">
                  Key Deliberation Vectors
                </h4>
                <div className="space-y-2">
                  {selectedCommittee.keyTopics.map((topic, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3 bg-[#141414]/70 border border-white/5">
                      <ChevronRight className="w-4 h-4 text-[#C9A34E] shrink-0 mt-0.5" />
                      <span className="font-sans text-xs text-[#D9D7D2]">{topic}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Modal Footer Actions */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-white/10">
                <span className="font-label-caps text-xs text-[#75735B]">
                  Simulated Chamber: <strong className="text-[#F5F3ED]">{selectedCommittee.abbreviation}</strong>
                </span>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    onClick={() => {
                      const commId = selectedCommittee.id;
                      setSelectedCommittee(null);
                      onOpenApplyForCommittee(commId);
                    }}
                    className="flex-1 sm:flex-none px-6 py-3 bg-[#4B2D8A] text-[#F5F3ED] font-label-caps text-xs tracking-widest uppercase font-bold hover:bg-[#C9A34E] hover:text-[#141414] transition-colors border border-[#C9A34E]/40"
                  >
                    Claim Portfolio
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
