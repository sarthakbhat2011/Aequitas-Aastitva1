import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  MessageSquare,
  Star,
  Pencil,
  Trash2,
  Search,
  ShieldCheck,
  Sparkles,
  UserCheck,
  X,
  Send,
  Lock,
  MessageCircle,
  PenTool,
  Zap,
  Award,
  CheckCircle2,
  Flame,
  Lightbulb,
  ArrowRight
} from 'lucide-react';
import { FeedbackItem } from '../types';
import { soundEngine } from '../utils/audio';

const PROMPT_IDEAS = [
  { label: '🏆 Best Committee Moment', text: 'My defining moment in committee was during the intense resolution voting when...' },
  { label: '📜 Landmark Resolution Passed', text: 'Drafting statutory clauses for our committee agenda taught me...' },
  { label: '⚡ High-Stakes Debate', text: 'Navigating floor decorum and unmoderated caucuses pushed my diplomatic skills...' },
  { label: '⚖️ Executive Board Review', text: 'The moderation and guidance from our Executive Board were...' },
];

export const FeedbackSection: React.FC = () => {
  const [feedbacks, setFeedbacks] = useState<FeedbackItem[]>([]);
  const [myToken, setMyToken] = useState<string>('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<FeedbackItem | null>(null);

  // Inline Form State for quick intrusion / feedback creation
  const [authorName, setAuthorName] = useState('');
  const [institution, setInstitution] = useState('');
  const [roleOrCommittee, setRoleOrCommittee] = useState('');
  const [feedbackText, setFeedbackText] = useState('');
  const [rating, setRating] = useState(5);
  const [submittedSuccessMsg, setSubmittedSuccessMsg] = useState(false);

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  // Clear legacy seed data and initialize clean storage
  useEffect(() => {
    // Device ownership token setup
    let token = localStorage.getItem('aequitas_device_token');
    if (!token) {
      token = `dev_token_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem('aequitas_device_token', token);
    }
    setMyToken(token);

    // ERADICATE any old legacy seed data saved from prior mock sessions
    localStorage.removeItem('aequitas_feedbacks');

    // Load authentic user-written feedbacks from dedicated storage
    try {
      const saved = localStorage.getItem('aequitas_user_written_feedbacks');
      if (saved) {
        const parsed = JSON.parse(saved);
        setFeedbacks(Array.isArray(parsed) ? parsed : []);
      } else {
        setFeedbacks([]);
      }
    } catch (e) {
      console.error('Failed to load user feedbacks', e);
      setFeedbacks([]);
    }
  }, []);

  // Save user feedbacks to localStorage
  const saveFeedbacksToStorage = (updatedList: FeedbackItem[]) => {
    setFeedbacks(updatedList);
    try {
      localStorage.setItem('aequitas_user_written_feedbacks', JSON.stringify(updatedList));
    } catch (e) {
      console.error('Failed to save feedback to storage', e);
    }
  };

  // Open modal form for creating or editing feedback
  const handleOpenNewForm = () => {
    soundEngine.playClick();
    setEditingItem(null);
    setAuthorName('');
    setInstitution('');
    setRoleOrCommittee('');
    setFeedbackText('');
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
    setFeedbackText(item.quote);
    setRating(item.rating);
    setIsFormOpen(true);
  };

  // Delete feedback (ONLY allowed for author)
  const handleDeleteFeedback = (id: string, authorToken: string) => {
    soundEngine.playClick();
    if (authorToken !== myToken) return;

    if (window.confirm('Are you sure you want to delete your feedback?')) {
      const updated = feedbacks.filter((item) => item.id !== id);
      saveFeedbacksToStorage(updated);
    }
  };

  // Use Prompt Idea helper
  const handleUsePromptIdea = (ideaText: string) => {
    soundEngine.playClick();
    setFeedbackText(ideaText);
  };

  // Submit Form (Create or Update)
  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !feedbackText.trim()) return;

    if (editingItem) {
      // Update existing item
      const updated = feedbacks.map((item) => {
        if (item.id === editingItem.id && item.authorToken === myToken) {
          return {
            ...item,
            authorName: authorName.trim(),
            institution: institution.trim() || 'Independent Delegation',
            roleOrCommittee: roleOrCommittee.trim() || 'Assembly Delegate',
            quote: feedbackText.trim(),
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
        id: `fb_user_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
        authorName: authorName.trim(),
        institution: institution.trim() || 'Independent Delegation',
        roleOrCommittee: roleOrCommittee.trim() || 'Assembly Delegate',
        quote: feedbackText.trim(),
        rating,
        timestamp: new Date().toISOString(),
        authorToken: myToken,
        verifiedBadge: 'Verified Delegate',
        isFeatured: true,
      };
      saveFeedbacksToStorage([newItem, ...feedbacks]);
    }

    soundEngine.playSuccess();
    setSubmittedSuccessMsg(true);
    setTimeout(() => setSubmittedSuccessMsg(false), 4000);

    // Reset inline form fields
    setFeedbackText('');
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

    if (selectedFilter === 'my-feedbacks') {
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
      className="relative min-h-screen py-28 md:py-36 bg-[#141414] overflow-hidden flex flex-col justify-center border-t border-b border-[#C9A34E]/40"
    >
      {/* VIVID & HIGH-IMPACT BACKGROUND EFFECTS & DYNAMIC ANIMATIONS */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-90">
        {/* Animated Radial Spotlight Beams & Nebulae */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-radial-gradient from-[#4B2D8A]/45 via-[#C9A34E]/20 to-transparent rounded-full blur-[150px] animate-float-orb-1" />
        <div className="absolute top-[-100px] left-[-100px] w-[750px] h-[750px] bg-[#C9A34E]/25 rounded-full blur-[140px] animate-float-orb-2" />
        <div className="absolute bottom-[-100px] right-[-100px] w-[800px] h-[800px] bg-[#4B2D8A]/40 rounded-full blur-[150px] animate-float-orb-3" />
        <div className="absolute top-1/2 right-10 w-[550px] h-[550px] bg-[#9B6BFF]/20 rounded-full blur-[120px] animate-pulse-glow" />

        {/* Shimmering Lattice Grid Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(#C9A34E_1.2px,transparent_1.2px)] [background-size:36px_36px] animate-shimmer-grid" />

        {/* Sweeping Diagonal Laser Light Beams */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#C9A34E]/15 to-transparent h-1 w-full animate-beam top-1/3" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#9B6BFF]/20 to-transparent h-1 w-full animate-beam top-2/3" style={{ animationDelay: '5s' }} />

        {/* High-Contrast Vivid Mandalic Sacred Geometry & Dynamic SVGs */}
        <svg
          className="w-full h-full text-[#C9A34E]"
          viewBox="0 0 1000 1000"
          preserveAspectRatio="xMidYMid slice"
          fill="none"
        >
          <circle
            cx="500"
            cy="500"
            r="460"
            stroke="#C9A34E"
            strokeWidth="2.5"
            strokeDasharray="14 18"
            className="animate-[spin_40s_linear_infinite] opacity-80"
          />
          <circle
            cx="500"
            cy="500"
            r="390"
            stroke="#4B2D8A"
            strokeWidth="3.5"
            strokeDasharray="10 14"
            className="animate-[spin_28s_linear_infinite_reverse] opacity-85"
          />
          <circle
            cx="500"
            cy="500"
            r="300"
            stroke="#C9A34E"
            strokeWidth="2"
            className="animate-[spin_20s_linear_infinite] opacity-70"
          />
          <circle
            cx="500"
            cy="500"
            r="200"
            stroke="#9B6BFF"
            strokeWidth="1.5"
            strokeDasharray="6 10"
            className="animate-[spin_15s_linear_infinite_reverse] opacity-60"
          />

          <g className="animate-pulse-glow origin-center">
            <polygon
              points="500,320 525,475 680,500 525,525 500,680 475,525 320,500 475,475"
              fill="none"
              stroke="url(#goldStarGrad)"
              strokeWidth="1.5"
              className="opacity-40"
            />
          </g>

          <line x1="0" y1="0" x2="1000" y2="1000" stroke="url(#goldGradBeam)" strokeWidth="2" className="opacity-50 animate-laser-pulse" />
          <line x1="1000" y1="0" x2="0" y2="1000" stroke="url(#purpleGradBeam)" strokeWidth="2" className="opacity-50 animate-laser-pulse" style={{ animationDelay: '2s' }} />

          <defs>
            <linearGradient id="goldGradBeam" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#C9A34E" stopOpacity="0" />
              <stop offset="50%" stopColor="#C9A34E" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#C9A34E" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="purpleGradBeam" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#4B2D8A" stopOpacity="0" />
              <stop offset="50%" stopColor="#9B6BFF" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#4B2D8A" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="goldStarGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#C9A34E" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#9B6BFF" stopOpacity="0.3" />
            </linearGradient>
          </defs>

          {[
            [150, 150, 'animate-particle-rise-1'],
            [850, 150, 'animate-particle-rise-2'],
            [150, 850, 'animate-particle-rise-3'],
            [850, 850, 'animate-particle-rise-1'],
            [500, 100, 'animate-particle-rise-2'],
            [500, 900, 'animate-particle-rise-3'],
            [100, 500, 'animate-particle-rise-1'],
            [900, 500, 'animate-particle-rise-2'],
            [300, 250, 'animate-particle-rise-3'],
            [700, 750, 'animate-particle-rise-1'],
            [250, 700, 'animate-particle-rise-2'],
            [750, 250, 'animate-particle-rise-3']
          ].map(([cx, cy, animClass], i) => (
            <g key={i} className={animClass as string}>
              <circle cx={cx as number} cy={cy as number} r="7" fill="#C9A34E" className="animate-ping opacity-75" />
              <circle cx={cx as number} cy={cy as number} r="3.5" fill="#F5F3ED" />
            </g>
          ))}
        </svg>

        <motion.div
          animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-20 left-12 w-24 h-24 border border-[#C9A34E]/30 rounded-full flex items-center justify-center bg-[#141414]/40 backdrop-blur-sm"
        >
          <Sparkles className="w-8 h-8 text-[#C9A34E]/60 animate-pulse" />
        </motion.div>
        <motion.div
          animate={{ y: [0, 20, 0], rotate: [0, -10, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute bottom-24 right-16 w-28 h-28 border border-[#9B6BFF]/30 rounded-full flex items-center justify-center bg-[#141414]/40 backdrop-blur-sm"
        >
          <ShieldCheck className="w-10 h-10 text-[#9B6BFF]/60 animate-pulse" />
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 w-full">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#4B2D8A]/30 border border-[#C9A34E]/50 rounded-full mb-4 shadow-[0_0_20px_rgba(201,163,78,0.2)]">
            <Sparkles className="w-4 h-4 text-[#C9A34E] animate-pulse" />
            <span className="font-label-caps text-xs text-[#C9A34E] tracking-[0.25em] uppercase font-bold">
              Delegate Voice Conclave
            </span>
          </div>

          <h2 className="font-serif-luxury text-3xl sm:text-5xl text-[#F5F3ED] font-bold text-glow-gold mb-4 leading-tight">
            Share Your Delegate Experience
          </h2>
          <p className="font-sans text-base text-[#D9D7D2]/90 font-light leading-relaxed">
            Your voice shapes the legacy of Aequitas × Aastitva. Share your authentic committee feedback, reviews, and insights to feature on the Assembly Wall.
          </p>
        </div>

        {/* INTRUDING & ALLURING INLINE FEEDBACK COMPOSER CARD */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16 bg-[#141414]/95 border-2 border-[#C9A34E] p-6 md:p-10 shadow-[0_0_60px_rgba(201,163,78,0.35)] relative overflow-hidden backdrop-blur-xl"
        >
          {/* Subtle Corner Accents */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#C9A34E]/20 to-transparent pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-[#4B2D8A]/30 to-transparent pointer-events-none" />

          <div className="relative z-10">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6 pb-6 border-b border-[#C9A34E]/30">
              <div>
                <span className="font-label-caps text-xs text-[#C9A34E] tracking-widest uppercase font-bold flex items-center gap-2">
                  <PenTool className="w-4 h-4 text-[#C9A34E]" />
                  Write Your Review & Publish Stance
                </span>
                <h3 className="font-serif-luxury text-2xl md:text-3xl font-bold text-[#F5F3ED] mt-1">
                  What Was Your Defining Conclave Moment?
                </h3>
              </div>

              {submittedSuccessMsg && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center gap-2 bg-[#C9A34E]/20 border border-[#C9A34E] px-4 py-2 text-[#C9A34E] font-label-caps text-xs font-bold shadow-[0_0_15px_rgba(201,163,78,0.3)]"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  Your Feedback Published to Wall!
                </motion.div>
              )}
            </div>

            {/* Inspiring Prompt Ideas Helper Badges */}
            <div className="mb-6">
              <span className="font-sans text-xs text-[#D9D7D2]/70 font-semibold block mb-2">
                Need inspiration? Click a prompt to start your review:
              </span>
              <div className="flex flex-wrap gap-2.5">
                {PROMPT_IDEAS.map((idea, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleUsePromptIdea(idea.text)}
                    className="px-3.5 py-1.5 bg-[#0E0E0E] border border-[#C9A34E]/40 hover:border-[#C9A34E] text-[#D9D7D2] hover:text-[#F5F3ED] text-xs font-sans rounded-none transition-all flex items-center gap-1.5 hover:shadow-[0_0_15px_rgba(201,163,78,0.2)]"
                  >
                    <Lightbulb className="w-3.5 h-3.5 text-[#C9A34E]" />
                    <span>{idea.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Interactive Feedback Form */}
            <form onSubmit={handleSubmitForm} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Author Name */}
                <div>
                  <label className="font-label-caps text-[10px] text-[#C9A34E] tracking-wider uppercase block mb-1 font-semibold">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    placeholder="e.g. Aarav Mehta / Delegate Stance"
                    className="w-full bg-[#0E0E0E] border border-white/20 px-4 py-3 text-xs font-sans text-[#F5F3ED] focus:border-[#C9A34E] focus:outline-none"
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
                    className="w-full bg-[#0E0E0E] border border-white/20 px-4 py-3 text-xs font-sans text-[#F5F3ED] focus:border-[#C9A34E] focus:outline-none"
                  />
                </div>

                {/* Committee & Role */}
                <div>
                  <label className="font-label-caps text-[10px] text-[#C9A34E] tracking-wider uppercase block mb-1 font-semibold">
                    Committee & Role / Stance
                  </label>
                  <input
                    type="text"
                    value={roleOrCommittee}
                    onChange={(e) => setRoleOrCommittee(e.target.value)}
                    placeholder="e.g. Delegate of Lok Sabha / UN Women"
                    className="w-full bg-[#0E0E0E] border border-white/20 px-4 py-3 text-xs font-sans text-[#F5F3ED] focus:border-[#C9A34E] focus:outline-none"
                  />
                </div>
              </div>

              {/* Rating Selector */}
              <div>
                <label className="font-label-caps text-[10px] text-[#C9A34E] tracking-wider uppercase block mb-1 font-semibold">
                  Rate Your Experience
                </label>
                <div className="flex items-center gap-3 bg-[#0E0E0E] p-3 border border-white/20 w-fit">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => {
                        soundEngine.playClick();
                        setRating(star);
                      }}
                      onMouseEnter={() => soundEngine.playHover()}
                      className="p-1 transition-transform hover:scale-125"
                    >
                      <Star
                        className={`w-6 h-6 ${
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

              {/* Feedback Message */}
              <div>
                <label className="font-label-caps text-[10px] text-[#C9A34E] tracking-wider uppercase block mb-1 font-semibold">
                  Your Review & Feedback Message *
                </label>
                <textarea
                  required
                  rows={4}
                  value={feedbackText}
                  onChange={(e) => setFeedbackText(e.target.value)}
                  placeholder="Share your authentic thoughts, resolution debate highlights, committee atmosphere, or reviews..."
                  className="w-full bg-[#0E0E0E] border border-white/20 p-4 text-xs font-sans text-[#F5F3ED] focus:border-[#C9A34E] focus:outline-none leading-relaxed"
                />
              </div>

              {/* Submit CTA Row */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/15">
                <div className="flex items-center gap-2 text-[#D9D7D2]/80 text-xs font-sans">
                  <Lock className="w-4 h-4 text-[#C9A34E]" />
                  <span>Your feedback is saved locally on your device with full edit & delete control.</span>
                </div>

                <button
                  type="submit"
                  onMouseEnter={() => soundEngine.playHover()}
                  className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-[#4B2D8A] via-[#351E63] to-[#C9A34E] text-[#F5F3ED] font-label-caps text-xs tracking-widest uppercase font-bold border-2 border-[#C9A34E] shadow-[0_0_25px_rgba(201,163,78,0.4)] hover:shadow-[0_0_45px_rgba(201,163,78,0.7)] hover:scale-105 transition-all flex items-center justify-center gap-2 group"
                >
                  <Send className="w-4 h-4 text-[#C9A34E] group-hover:translate-x-1 transition-transform" />
                  <span>Publish My Review to Assembly Wall</span>
                </button>
              </div>
            </form>
          </div>
        </motion.div>

        {/* Filter Tabs & Search Bar Row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 bg-[#141414]/95 p-5 border-2 border-[#C9A34E]/40 rounded-none backdrop-blur-2xl shadow-[0_10px_40px_rgba(0,0,0,0.8)]">
          {/* Filter Buttons */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {[
              { id: 'all', label: `Published Reviews (${feedbacks.length})` },
              { id: 'my-feedbacks', label: 'My Reviews' },
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
                className={`px-4 py-2.5 font-label-caps text-[11px] tracking-wider uppercase font-semibold transition-all duration-300 ${
                  selectedFilter === tab.id
                    ? 'bg-[#C9A34E] text-[#141414] font-bold shadow-[0_0_20px_rgba(201,163,78,0.5)] border border-[#F5F3ED]'
                    : 'bg-[#0E0E0E] text-[#D9D7D2]/80 border border-white/15 hover:border-[#C9A34E] hover:text-[#F5F3ED]'
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
              placeholder="Search reviews by delegate or keyword..."
              className="w-full bg-[#0E0E0E] text-[#F5F3ED] placeholder-[#75735B] pl-9 pr-4 py-2.5 text-xs font-sans border border-white/20 focus:border-[#C9A34E] focus:outline-none transition-colors"
            />
          </div>
        </div>

        {/* Feedback Cards Gallery Grid */}
        {filteredFeedbacks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredFeedbacks.map((item) => {
                const isMyFeedback = item.authorToken === myToken;

                return (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4 }}
                    className={`glass-panel p-8 relative flex flex-col justify-between group transition-all duration-500 hover:shadow-[0_15px_45px_rgba(201,163,78,0.3)] ${
                      isMyFeedback
                        ? 'border-2 border-[#C9A34E] bg-[#1E192B]/95 shadow-[0_0_25px_rgba(201,163,78,0.25)]'
                        : 'border border-[#C9A34E]/30 bg-[#141414]/90 hover:border-[#C9A34E]'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-6">
                        <div className="p-3 bg-[#0E0E0E] border border-[#C9A34E]/50 text-[#C9A34E] shadow-[0_0_15px_rgba(201,163,78,0.2)]">
                          <MessageSquare className="w-5 h-5 text-[#C9A34E]" />
                        </div>

                        <div className="flex items-center gap-2">
                          {isMyFeedback ? (
                            <span className="inline-flex items-center gap-1 font-label-caps text-[9px] text-[#C9A34E] bg-[#C9A34E]/20 border border-[#C9A34E] px-2.5 py-1 uppercase tracking-wider font-bold shadow-[0_0_10px_rgba(201,163,78,0.3)]">
                              <UserCheck className="w-3.5 h-3.5 text-[#C9A34E]" />
                              Your Review
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 font-label-caps text-[9px] text-[#E6DEFF] bg-[#4B2D8A]/30 border border-[#4B2D8A] px-2.5 py-1 uppercase tracking-wider font-semibold">
                              <ShieldCheck className="w-3.5 h-3.5 text-[#E6DEFF]" />
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
                            className={`w-4 h-4 ${
                              star <= item.rating
                                ? 'text-[#C9A34E] fill-[#C9A34E]'
                                : 'text-[#75735B]/40'
                            }`}
                          />
                        ))}
                      </div>

                      {/* Feedback Body Text */}
                      <p className="font-sans text-sm text-[#F5F3ED] leading-relaxed mb-6 font-normal">
                        "{item.quote}"
                      </p>
                    </div>

                    {/* Bottom Author Info & Action Controls */}
                    <div className="pt-6 border-t border-white/15">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-serif-luxury text-base font-bold text-[#F5F3ED] group-hover:text-[#C9A34E] transition-colors">
                            {item.authorName}
                          </h4>
                          <p className="font-sans text-xs text-[#C9A34E] font-semibold">
                            {item.roleOrCommittee}
                          </p>
                          <p className="font-sans text-[11px] text-[#D9D7D2]/70 font-light truncate max-w-[200px]">
                            {item.institution}
                          </p>
                        </div>

                        {/* Edit & Delete Controls */}
                        {isMyFeedback && (
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleOpenEditForm(item)}
                              className="p-2.5 bg-[#0E0E0E] border border-[#C9A34E] text-[#C9A34E] hover:bg-[#C9A34E] hover:text-[#141414] transition-all shadow-[0_0_10px_rgba(201,163,78,0.2)]"
                              title="Edit Your Feedback"
                            >
                              <Pencil className="w-3.5 h-3.5" />
                            </button>

                            <button
                              onClick={() => handleDeleteFeedback(item.id, item.authorToken)}
                              className="p-2.5 bg-[#0E0E0E] border border-red-500/60 text-red-400 hover:bg-red-500 hover:text-white transition-all shadow-[0_0_10px_rgba(239,68,68,0.2)]"
                              title="Delete Your Feedback"
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
        ) : (
          /* Empty State when zero reviews exist */
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16 px-6 glass-panel border-2 border-[#C9A34E]/40 max-w-2xl mx-auto my-6 bg-[#141414]/95 shadow-[0_0_50px_rgba(201,163,78,0.2)]"
          >
            <MessageCircle className="w-14 h-14 text-[#C9A34E] mx-auto mb-4 opacity-80 animate-bounce" />
            <h3 className="font-serif-luxury text-2xl font-bold text-[#F5F3ED]">
              The Assembly Wall Awaits Your Voice
            </h3>
            <p className="font-sans text-sm text-[#D9D7D2]/80 mt-2 mb-6 max-w-md mx-auto leading-relaxed">
              No reviews have been published yet on this device. Use the feedback composer above to submit your review and feature your stance!
            </p>
          </motion.div>
        )}
      </div>

      {/* EDIT FEEDBACK MODAL */}
      <AnimatePresence>
        {isFormOpen && editingItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-xl bg-[#141414] border-2 border-[#C9A34E] p-6 md:p-8 shadow-[0_0_70px_rgba(201,163,78,0.4)] my-8"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsFormOpen(false)}
                className="absolute top-6 right-6 text-[#D9D7D2] hover:text-[#C9A34E] p-1 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Form Header */}
              <div className="mb-6">
                <span className="font-label-caps text-xs text-[#C9A34E] tracking-widest uppercase font-bold block mb-1">
                  Delegate Voice Conclave
                </span>
                <h3 className="font-serif-luxury text-2xl font-bold text-[#F5F3ED]">
                  Edit Your Submitted Feedback
                </h3>
                <p className="font-sans text-xs text-[#D9D7D2]/80 mt-1">
                  Modify your review details below. Changes will update instantly on the Assembly Wall.
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
                      className="w-full bg-[#0E0E0E] border border-white/20 px-3.5 py-2.5 text-xs font-sans text-[#F5F3ED] focus:border-[#C9A34E] focus:outline-none"
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
                      className="w-full bg-[#0E0E0E] border border-white/20 px-3.5 py-2.5 text-xs font-sans text-[#F5F3ED] focus:border-[#C9A34E] focus:outline-none"
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
                    className="w-full bg-[#0E0E0E] border border-white/20 px-3.5 py-2.5 text-xs font-sans text-[#F5F3ED] focus:border-[#C9A34E] focus:outline-none"
                  />
                </div>

                {/* Rating Selection */}
                <div>
                  <label className="font-label-caps text-[10px] text-[#C9A34E] tracking-wider uppercase block mb-1 font-semibold">
                    Overall Experience Rating
                  </label>
                  <div className="flex items-center gap-2 bg-[#0E0E0E] p-3 border border-white/20 w-fit">
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

                {/* Feedback Message Area */}
                <div>
                  <label className="font-label-caps text-[10px] text-[#C9A34E] tracking-wider uppercase block mb-1 font-semibold">
                    Feedback Message & Review *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={feedbackText}
                    onChange={(e) => setFeedbackText(e.target.value)}
                    className="w-full bg-[#0E0E0E] border border-white/20 p-3.5 text-xs font-sans text-[#F5F3ED] focus:border-[#C9A34E] focus:outline-none leading-relaxed"
                  />
                </div>

                {/* Form Action Buttons */}
                <div className="pt-4 flex items-center justify-end gap-3 border-t border-white/15">
                  <button
                    type="button"
                    onClick={() => setIsFormOpen(false)}
                    className="px-5 py-2.5 bg-transparent text-[#D9D7D2] font-label-caps text-xs tracking-wider uppercase border border-white/20 hover:border-white/40"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="px-7 py-2.5 bg-gradient-to-r from-[#4B2D8A] to-[#C9A34E] text-[#F5F3ED] font-label-caps text-xs tracking-widest uppercase font-bold border border-[#C9A34E] shadow-[0_0_20px_rgba(201,163,78,0.4)] hover:brightness-110 flex items-center gap-2"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Save Updated Feedback</span>
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
