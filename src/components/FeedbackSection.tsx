import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Quote,
  Star,
  Plus,
  Pencil,
  Trash2,
  Search,
  Filter,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  MessageSquareQuote,
  UserCheck,
  Building,
  Award,
  X,
  Send,
  Lock,
  Heart
} from 'lucide-react';
import { FeedbackItem } from '../types';
import { soundEngine } from '../utils/audio';

// Seed initial delegate quotes (Ahsaaz / Seed Grove style)
const INITIAL_FEEDBACKS: FeedbackItem[] = [
  {
    id: 'seed-1',
    authorName: 'Aarav Mehta',
    institution: "St. Xavier's College, Mumbai",
    roleOrCommittee: 'Delegate of Lok Sabha',
    quote:
      'The parliamentary decorum and procedural intensity of Lok Sabha was beyond anything I have experienced. Aastitva provided a true battleground for policy intelligence and statutory negotiation.',
    rating: 5,
    timestamp: '2026-07-28T14:30:00.000Z',
    authorToken: 'seed_author_1',
    verifiedBadge: 'Verified Parliamentarian',
    isFeatured: true,
  },
  {
    id: 'seed-2',
    authorName: 'Priyanjali Roy',
    institution: 'Hindu College, Delhi University',
    roleOrCommittee: 'Delegate of Continuous Crisis Committee',
    quote:
      'The Continuous Crisis Committee pushed my diplomatic limits. Managing real-time intelligence feeds and press leaks while keeping floor decorum intact was exhilarating.',
    rating: 5,
    timestamp: '2026-07-29T09:15:00.000Z',
    authorToken: 'seed_author_2',
    verifiedBadge: 'Crisis Strategist',
    isFeatured: true,
  },
  {
    id: 'seed-3',
    authorName: 'Kabir Varma',
    institution: 'NLSIU Bengaluru',
    roleOrCommittee: 'Speaker, JKLA Executive Board',
    quote:
      'Aequitas × Aastitva sets a new gold benchmark for academic diplomacy in India. The study guides, executive moderation, and overall decorum were world-class.',
    rating: 5,
    timestamp: '2026-07-30T18:45:00.000Z',
    authorToken: 'seed_author_3',
    verifiedBadge: 'Executive Board',
    isFeatured: true,
  },
  {
    id: 'seed-4',
    authorName: 'Diya Sengupta',
    institution: 'Ashoka University',
    roleOrCommittee: 'Delegate of UN Women',
    quote:
      'Constructing progressive legal frameworks on gender mobility safety in UN Women was deeply empowering. The intellectual caliber of fellow delegates made every resolution vote memorable.',
    rating: 5,
    timestamp: '2026-07-31T11:20:00.000Z',
    authorToken: 'seed_author_4',
    verifiedBadge: 'UN Ambassador',
    isFeatured: false,
  },
  {
    id: 'seed-5',
    authorName: 'Rohan Deshmukh',
    institution: 'IIT Bombay',
    roleOrCommittee: 'Director General, Crisis Bureau',
    quote:
      'From the WebGL 3D interface to the real-time crisis directives, every element of this conclave reflects precision, royal heritage, and administrative excellence.',
    rating: 5,
    timestamp: '2026-08-01T16:00:00.000Z',
    authorToken: 'seed_author_5',
    verifiedBadge: 'Secretariat Director',
    isFeatured: false,
  },
];

export const FeedbackSection: React.FC = () => {
  const [feedbacks, setFeedbacks] = useState<FeedbackItem[]>([]);
  const [myToken, setMyToken] = useState<string>('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<FeedbackItem | null>(null);

  // Form State
  const [authorName, setAuthorName] = useState('');
  const [institution, setInstitution] = useState('');
  const [roleOrCommittee, setRoleOrCommittee] = useState('');
  const [quoteText, setQuoteText] = useState('');
  const [rating, setRating] = useState(5);

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  // Initialize device token and load feedback items from localStorage
  useEffect(() => {
    // Device ownership token setup
    let token = localStorage.getItem('aequitas_device_token');
    if (!token) {
      token = `dev_token_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem('aequitas_device_token', token);
    }
    setMyToken(token);

    // Load feedbacks from localStorage or initialize with seed data
    try {
      const saved = localStorage.getItem('aequitas_feedbacks');
      if (saved) {
        setFeedbacks(JSON.parse(saved));
      } else {
        setFeedbacks(INITIAL_FEEDBACKS);
        localStorage.setItem('aequitas_feedbacks', JSON.stringify(INITIAL_FEEDBACKS));
      }
    } catch (e) {
      console.error('Failed to load feedbacks', e);
      setFeedbacks(INITIAL_FEEDBACKS);
    }
  }, []);

  // Save feedbacks to localStorage
  const saveFeedbacksToStorage = (updatedList: FeedbackItem[]) => {
    setFeedbacks(updatedList);
    try {
      localStorage.setItem('aequitas_feedbacks', JSON.stringify(updatedList));
    } catch (e) {
      console.error('Failed to save feedback to storage', e);
    }
  };

  // Open form for creating new feedback
  const handleOpenNewForm = () => {
    soundEngine.playClick();
    setEditingItem(null);
    setAuthorName('');
    setInstitution('');
    setRoleOrCommittee('');
    setQuoteText('');
    setRating(5);
    setIsFormOpen(true);
  };

  // Open form for editing existing feedback (ONLY allowed for author)
  const handleOpenEditForm = (item: FeedbackItem) => {
    soundEngine.playClick();
    if (item.authorToken !== myToken) return;
    setEditingItem(item);
    setAuthorName(item.authorName);
    setInstitution(item.institution);
    setRoleOrCommittee(item.roleOrCommittee);
    setQuoteText(item.quote);
    setRating(item.rating);
    setIsFormOpen(true);
  };

  // Delete feedback (ONLY allowed for author)
  const handleDeleteFeedback = (id: string, authorToken: string) => {
    soundEngine.playClick();
    if (authorToken !== myToken) return;

    if (window.confirm('Purge your quote from the conclave archives?')) {
      const updated = feedbacks.filter((item) => item.id !== id);
      saveFeedbacksToStorage(updated);
    }
  };

  // Submit Form (Create or Update)
  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !quoteText.trim()) return;

    if (editingItem) {
      // Update existing item
      const updated = feedbacks.map((item) => {
        if (item.id === editingItem.id && item.authorToken === myToken) {
          return {
            ...item,
            authorName: authorName.trim(),
            institution: institution.trim() || 'Independent Delegation',
            roleOrCommittee: roleOrCommittee.trim() || 'Assembly Delegate',
            quote: quoteText.trim(),
            rating,
            timestamp: new Date().toISOString(),
          };
        }
        return item;
      });
      saveFeedbacksToStorage(updated);
    } else {
      // Add new feedback item
      const newItem: FeedbackItem = {
        id: `fb_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
        authorName: authorName.trim(),
        institution: institution.trim() || 'Independent Delegation',
        roleOrCommittee: roleOrCommittee.trim() || 'Assembly Delegate',
        quote: quoteText.trim(),
        rating,
        timestamp: new Date().toISOString(),
        authorToken: myToken,
        verifiedBadge: 'Verified Delegate',
        isFeatured: false,
      };
      saveFeedbacksToStorage([newItem, ...feedbacks]);
    }

    soundEngine.playSuccess();
    setIsFormOpen(false);
  };

  // Filtered & Searched Feedbacks
  const filteredFeedbacks = feedbacks.filter((item) => {
    const matchesSearch =
      item.authorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.quote.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.institution.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.roleOrCommittee.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    if (selectedFilter === 'my-quotes') {
      return item.authorToken === myToken;
    }
    if (selectedFilter === 'lok-sabha') {
      return item.roleOrCommittee.toLowerCase().includes('lok sabha');
    }
    if (selectedFilter === 'crisis') {
      return item.roleOrCommittee.toLowerCase().includes('crisis');
    }
    if (selectedFilter === 'eb') {
      return (
        item.roleOrCommittee.toLowerCase().includes('board') ||
        item.roleOrCommittee.toLowerCase().includes('speaker') ||
        item.roleOrCommittee.toLowerCase().includes('director')
      );
    }

    return true;
  });

  return (
    <section
      id="feedback"
      className="relative min-h-screen py-28 md:py-36 bg-[#141414] overflow-hidden flex flex-col justify-center border-t border-b border-[#C9A34E]/25"
    >
      {/* Background Visual Illustration: Diplomatic Quill & Ley Lines */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-35 transition-opacity duration-1000">
        <svg
          className="w-full h-full text-[#C9A34E]"
          viewBox="0 0 1000 1000"
          preserveAspectRatio="xMidYMid slice"
          fill="none"
        >
          {/* Orbital Quote Rings */}
          <circle
            cx="500"
            cy="500"
            r="420"
            stroke="#C9A34E"
            strokeWidth="1.2"
            strokeDasharray="6 8"
            className="animate-[spin_60s_linear_infinite]"
          />
          <circle
            cx="500"
            cy="500"
            r="320"
            stroke="#4B2D8A"
            strokeWidth="1.8"
            className="animate-[spin_40s_linear_infinite_reverse]"
          />
          {/* Floating Constellation Nodes */}
          {[[250, 200], [750, 200], [250, 800], [750, 800], [500, 100]].map(([cx, cy], i) => (
            <circle key={i} cx={cx} cy={cy} r="4" fill="#C9A34E" className="animate-ping" />
          ))}
        </svg>
      </div>

      {/* Atmospheric Ambient Glows */}
      <div className="absolute top-1/3 left-10 w-[500px] h-[500px] bg-[#4B2D8A]/20 rounded-full blur-[130px] pointer-events-none animate-pulse-glow" />
      <div className="absolute bottom-1/3 right-10 w-[500px] h-[500px] bg-[#C9A34E]/15 rounded-full blur-[130px] pointer-events-none animate-pulse-glow" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 w-full">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-label-caps text-xs text-[#C9A34E] tracking-[0.3em] uppercase block mb-3">
            Chapter Six — Voices of the Conclave
          </span>
          <h2 className="font-serif-luxury text-3xl sm:text-5xl text-[#F5F3ED] font-bold text-glow-gold mb-6 leading-tight">
            Diplomatic Feedback & Passed Quotes
          </h2>
          <p className="font-sans text-base text-[#D9D7D2]/80 font-light leading-relaxed">
            Where delegates, parliamentarians, and chairs record their views, pass quotes into conclave archives, and leave their mark on history.
          </p>

          {/* Action CTA: Pass a Quote */}
          <div className="mt-8">
            <button
              onClick={handleOpenNewForm}
              onMouseEnter={() => soundEngine.playHover()}
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-[#4B2D8A] via-[#351E63] to-[#C9A34E]/80 text-[#F5F3ED] font-label-caps text-xs tracking-widest uppercase font-bold border border-[#C9A34E]/60 shadow-[0_0_25px_rgba(201,163,78,0.3)] hover:shadow-[0_0_40px_rgba(201,163,78,0.5)] hover:border-[#C9A34E] transition-all duration-300 group"
            >
              <MessageSquareQuote className="w-4 h-4 text-[#C9A34E] group-hover:scale-110 transition-transform" />
              <span>Pass Your Quote To The Assembly</span>
            </button>
          </div>
        </div>

        {/* Filter Tabs & Search Bar Row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-12 bg-[#141414]/90 p-4 border border-[#C9A34E]/30 rounded-none backdrop-blur-xl">
          {/* Filter Buttons */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {[
              { id: 'all', label: 'All Conclave Quotes' },
              { id: 'my-quotes', label: 'My Passed Quotes' },
              { id: 'lok-sabha', label: 'Lok Sabha' },
              { id: 'crisis', label: 'Crisis Committee' },
              { id: 'eb', label: 'Executive Board' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  soundEngine.playClick();
                  setSelectedFilter(tab.id);
                }}
                className={`px-4 py-2 font-label-caps text-[11px] tracking-wider uppercase font-semibold transition-all duration-300 ${
                  selectedFilter === tab.id
                    ? 'bg-[#C9A34E] text-[#141414] font-bold shadow-[0_0_15px_rgba(201,163,78,0.4)]'
                    : 'bg-[#141414] text-[#D9D7D2]/70 border border-white/10 hover:border-[#C9A34E]/50 hover:text-[#F5F3ED]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-[#C9A34E] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search quotes by delegate or topic..."
              className="w-full bg-[#0E0E0E] text-[#F5F3ED] placeholder-[#75735B] pl-9 pr-4 py-2 text-xs font-sans border border-white/15 focus:border-[#C9A34E] focus:outline-none transition-colors"
            />
          </div>
        </div>

        {/* Quotes Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredFeedbacks.map((item) => {
              const isMyFeedback = item.authorToken === myToken;

              return (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  className={`glass-panel p-8 relative flex flex-col justify-between group transition-all duration-500 hover:shadow-[0_10px_30px_rgba(201,163,78,0.2)] ${
                    isMyFeedback
                      ? 'border-2 border-[#C9A34E]/80 bg-[#1A1624]/90'
                      : 'border border-white/10 hover:border-[#C9A34E]/50'
                  }`}
                >
                  {/* Top Quote Icon & Badge */}
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="p-2.5 bg-[#141414] border border-[#C9A34E]/30 text-[#C9A34E]">
                        <Quote className="w-5 h-5" />
                      </div>

                      <div className="flex items-center gap-2">
                        {isMyFeedback ? (
                          <span className="inline-flex items-center gap-1 font-label-caps text-[9px] text-[#C9A34E] bg-[#C9A34E]/15 border border-[#C9A34E]/40 px-2 py-0.5 uppercase tracking-wider font-bold">
                            <UserCheck className="w-3 h-3 text-[#C9A34E]" />
                            Your Passed Quote
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 font-label-caps text-[9px] text-[#E6DEFF] bg-[#4B2D8A]/20 border border-[#4B2D8A]/40 px-2 py-0.5 uppercase tracking-wider font-semibold">
                            <ShieldCheck className="w-3 h-3 text-[#E6DEFF]" />
                            {item.verifiedBadge || 'Verified Delegate'}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Star Rating */}
                    <div className="flex items-center gap-1 mb-4">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-3.5 h-3.5 ${
                            star <= item.rating
                              ? 'text-[#C9A34E] fill-[#C9A34E]'
                              : 'text-[#75735B]/40'
                          }`}
                        />
                      ))}
                    </div>

                    {/* Quote Content */}
                    <p className="font-serif-luxury text-base text-[#F5F3ED] italic leading-relaxed mb-6 font-normal">
                      "{item.quote}"
                    </p>
                  </div>

                  {/* Bottom Author & Action Controls Footer */}
                  <div className="pt-6 border-t border-white/10">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-serif-luxury text-sm font-bold text-[#F5F3ED] group-hover:text-[#C9A34E] transition-colors">
                          {item.authorName}
                        </h4>
                        <p className="font-sans text-xs text-[#C9A34E] font-medium">
                          {item.roleOrCommittee}
                        </p>
                        <p className="font-sans text-[11px] text-[#D9D7D2]/60 font-light truncate max-w-[200px]">
                          {item.institution}
                        </p>
                      </div>

                      {/* STRICT USER OWNERSHIP: Edit & Delete buttons render ONLY for the author! */}
                      {isMyFeedback && (
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleOpenEditForm(item)}
                            className="p-2 bg-[#141414] border border-[#C9A34E]/40 text-[#C9A34E] hover:bg-[#C9A34E] hover:text-[#141414] transition-colors"
                            title="Edit Your Quote"
                          >
                            <Pencil className="w-3.5 h-3.5" />
                          </button>

                          <button
                            onClick={() => handleDeleteFeedback(item.id, item.authorToken)}
                            className="p-2 bg-[#141414] border border-red-500/40 text-red-400 hover:bg-red-500 hover:text-white transition-colors"
                            title="Delete Your Quote"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Empty Search Result Fallback */}
        {filteredFeedbacks.length === 0 && (
          <div className="text-center py-16 glass-panel border border-[#C9A34E]/30 max-w-xl mx-auto my-8">
            <MessageSquareQuote className="w-12 h-12 text-[#C9A34E] mx-auto mb-3 opacity-60" />
            <h3 className="font-serif-luxury text-xl font-bold text-[#F5F3ED]">
              No Quotes Found
            </h3>
            <p className="font-sans text-xs text-[#D9D7D2]/70 mt-1 mb-6">
              Be the first to pass a quote or feedback in this category!
            </p>
            <button
              onClick={handleOpenNewForm}
              className="px-6 py-2.5 bg-[#4B2D8A] text-[#F5F3ED] font-label-caps text-xs tracking-widest uppercase font-bold border border-[#C9A34E]"
            >
              Pass A Quote Now
            </button>
          </div>
        )}
      </div>

      {/* CREATE / EDIT FEEDBACK MODAL */}
      <AnimatePresence>
        {isFormOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-xl bg-[#141414] border border-[#C9A34E]/50 p-6 md:p-8 shadow-[0_0_50px_rgba(75,45,138,0.5)] my-8"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsFormOpen(false)}
                className="absolute top-6 right-6 text-[#D9D7D2] hover:text-[#C9A34E] p-1 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Form Title */}
              <div className="mb-6">
                <span className="font-label-caps text-xs text-[#C9A34E] tracking-widest uppercase font-bold block mb-1">
                  Conclave Archives
                </span>
                <h3 className="font-serif-luxury text-2xl font-bold text-[#F5F3ED]">
                  {editingItem ? 'Edit Your Passed Quote' : 'Pass Your Quote & Feedback'}
                </h3>
                <p className="font-sans text-xs text-[#D9D7D2]/70 mt-1">
                  {editingItem
                    ? 'Update your views or testimonial. Changes will reflect instantly.'
                    : 'Share your diplomatic experience, committee insights, or words of wisdom.'}
                </p>
              </div>

              {/* Form Body */}
              <form onSubmit={handleSubmitForm} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Delegate Name */}
                  <div>
                    <label className="font-label-caps text-[10px] text-[#C9A34E] tracking-wider uppercase block mb-1 font-semibold">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={authorName}
                      onChange={(e) => setAuthorName(e.target.value)}
                      placeholder="e.g. Aarav Mehta"
                      className="w-full bg-[#0E0E0E] border border-white/15 px-3 py-2 text-xs font-sans text-[#F5F3ED] focus:border-[#C9A34E] focus:outline-none"
                    />
                  </div>

                  {/* Institution */}
                  <div>
                    <label className="font-label-caps text-[10px] text-[#C9A34E] tracking-wider uppercase block mb-1 font-semibold">
                      Institution / Delegation
                    </label>
                    <input
                      type="text"
                      value={institution}
                      onChange={(e) => setInstitution(e.target.value)}
                      placeholder="e.g. St. Xavier's College, Mumbai"
                      className="w-full bg-[#0E0E0E] border border-white/15 px-3 py-2 text-xs font-sans text-[#F5F3ED] focus:border-[#C9A34E] focus:outline-none"
                    />
                  </div>
                </div>

                {/* Role / Committee */}
                <div>
                  <label className="font-label-caps text-[10px] text-[#C9A34E] tracking-wider uppercase block mb-1 font-semibold">
                    Committee & Role / Stance
                  </label>
                  <input
                    type="text"
                    value={roleOrCommittee}
                    onChange={(e) => setRoleOrCommittee(e.target.value)}
                    placeholder="e.g. Delegate of Lok Sabha / Chair of UN Women"
                    className="w-full bg-[#0E0E0E] border border-white/15 px-3 py-2 text-xs font-sans text-[#F5F3ED] focus:border-[#C9A34E] focus:outline-none"
                  />
                </div>

                {/* Rating Stars Selection */}
                <div>
                  <label className="font-label-caps text-[10px] text-[#C9A34E] tracking-wider uppercase block mb-1 font-semibold">
                    Diplomatic Experience Honor Rating
                  </label>
                  <div className="flex items-center gap-2 bg-[#0E0E0E] p-2.5 border border-white/15 w-fit">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => {
                          soundEngine.playClick();
                          setRating(star);
                        }}
                        className="p-1 transition-transform hover:scale-125"
                      >
                        <Star
                          className={`w-5 h-5 ${
                            star <= rating ? 'text-[#C9A34E] fill-[#C9A34E]' : 'text-[#75735B]/40'
                          }`}
                        />
                      </button>
                    ))}
                    <span className="font-mono text-xs text-[#C9A34E] font-bold ml-2">
                      {rating} / 5 Stars
                    </span>
                  </div>
                </div>

                {/* Quote Text Area */}
                <div>
                  <label className="font-label-caps text-[10px] text-[#C9A34E] tracking-wider uppercase block mb-1 font-semibold">
                    Passed Quote / Feedback Statement *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={quoteText}
                    onChange={(e) => setQuoteText(e.target.value)}
                    placeholder="Share your quote, resolution insights, or experience at Aequitas × Aastitva..."
                    className="w-full bg-[#0E0E0E] border border-white/15 p-3 text-xs font-serif-luxury italic text-[#F5F3ED] focus:border-[#C9A34E] focus:outline-none leading-relaxed"
                  />
                </div>

                {/* Ownership Note */}
                <div className="p-3 bg-[#1A1624] border border-[#4B2D8A]/50 flex items-center gap-2">
                  <Lock className="w-4 h-4 text-[#C9A34E] shrink-0" />
                  <p className="font-sans text-[11px] text-[#D9D7D2]/80 font-light">
                    <strong>Device Ownership Protection:</strong> You will be able to edit or delete your quote anytime from this device.
                  </p>
                </div>

                {/* Form Action Buttons */}
                <div className="pt-4 flex items-center justify-end gap-3 border-t border-white/10">
                  <button
                    type="button"
                    onClick={() => setIsFormOpen(false)}
                    className="px-5 py-2.5 bg-transparent text-[#D9D7D2] font-label-caps text-xs tracking-wider uppercase border border-white/20 hover:border-white/40"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="px-7 py-2.5 bg-gradient-to-r from-[#4B2D8A] to-[#C9A34E] text-[#F5F3ED] font-label-caps text-xs tracking-widest uppercase font-bold border border-[#C9A34E] shadow-[0_0_20px_rgba(201,163,78,0.3)] hover:brightness-110 flex items-center gap-2"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{editingItem ? 'Save Updated Quote' : 'Pass Quote To Conclave'}</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
