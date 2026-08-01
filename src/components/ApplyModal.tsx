import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { COMMITTEES, BRAND_LOGOS } from '../data/content';
import { ApplicationFormData } from '../types';
import { X, Check, Sparkles, Award, Shield, FileText, ChevronRight, Printer, Loader2 } from 'lucide-react';

interface ApplyModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedCommitteeId?: string;
  onApplicationSuccess?: (name: string, committeeTitle: string) => void;
}

export const ApplyModal: React.FC<ApplyModalProps> = ({
  isOpen,
  onClose,
  preselectedCommitteeId,
  onApplicationSuccess,
}) => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<ApplicationFormData>({
    fullName: '',
    email: '',
    phone: '',
    institution: '',
    experienceLevel: 'Intermediate',
    primaryCommittee: preselectedCommitteeId || 'ccc',
    secondaryCommittee: 'lok-sabha',
    primaryPreferredCountry: '',
    secondaryPreferredCountry: '',
    statementOfPurpose: '',
    targetEbRole: 'Chairperson',
    ebCommitteePreferences: ['ccc', 'lok-sabha', 'unhrc'],
    pastEbExperience: '',
    whyJoinAequitas: '',
  });

  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 4) {
      setStep(step + 1);
    } else {
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        setSubmitted(true);

        // Save application to localStorage
        try {
          const existing = JSON.parse(localStorage.getItem('aequitas_applications') || '[]');
          existing.push({
            ...formData,
            submittedAt: new Date().toISOString(),
            passId: `PASS-2026-${Math.floor(1000 + Math.random() * 9000)}`,
          });
          localStorage.setItem('aequitas_applications', JSON.stringify(existing));
        } catch (err) {
          console.error('Failed to save application locally', err);
        }

        const commTitle = COMMITTEES.find((c) => c.id === formData.primaryCommittee)?.title || formData.primaryCommittee;
        if (onApplicationSuccess) {
          onApplicationSuccess(formData.fullName, commTitle);
        }
      }, 1000);
    }
  };

  const getCommitteeTitle = (id: string) => {
    return COMMITTEES.find((c) => c.id === id)?.title || id;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-2xl overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 30 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="glass-panel-gold max-w-2xl w-full p-8 relative rounded-none border border-[#C9A34E]/60 shadow-[0_0_80px_rgba(201,163,78,0.3)] text-[#F5F3ED] my-8"
      >
        {/* Close Modal */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-[#D9D7D2] hover:text-[#C9A34E] transition-colors"
          aria-label="Close Application Window"
        >
          <X className="w-6 h-6" />
        </button>

        {!submitted ? (
          <div>
            {/* Header */}
            <div className="mb-8 pr-8">
              <span className="font-label-caps text-[10px] text-[#C9A34E] tracking-[0.3em] uppercase block mb-1">
                Official Delegate Convocation
              </span>
              <h2 className="font-serif-luxury text-3xl font-bold text-[#F5F3ED] text-glow-gold">
                Claim Your Delegate Portfolio
              </h2>
              <p className="font-sans text-xs text-[#D9D7D2]/80 mt-1 font-light">
                Step into the assembly hall. Your voice will shape the policy records of tomorrow.
              </p>
            </div>

            {/* Step Tracker */}
            <div className="flex items-center gap-2 mb-8 border-b border-white/10 pb-4">
              {[1, 2, 3, 4].map((s) => (
                <div key={s} className="flex-1 flex items-center gap-2">
                  <div
                    className={`h-1 flex-1 transition-colors ${
                      s <= step ? 'bg-[#C9A34E]' : 'bg-white/10'
                    }`}
                  />
                  <span
                    className={`font-mono text-[10px] ${
                      s === step ? 'text-[#C9A34E] font-bold' : 'text-[#75735B]'
                    }`}
                  >
                    0{s}
                  </span>
                </div>
              ))}
            </div>

            <form onSubmit={handleNext} className="space-y-6">
              {/* STEP 1: Personal Credentials */}
              {step === 1 && (
                <div className="space-y-4">
                  <h3 className="font-label-caps text-xs text-[#C9A34E] tracking-widest uppercase font-bold">
                    Step 1: Personal Credentials & Academic Profile
                  </h3>

                  <div>
                    <label className="block font-label-caps text-[10px] text-[#D9D7D2] mb-1 uppercase">
                      Full Legal Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="e.g. Vikramaditya Sharma"
                      className="w-full px-4 py-3 bg-[#141414] border border-white/10 text-sm text-[#F5F3ED] focus:border-[#C9A34E] focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-label-caps text-[10px] text-[#D9D7D2] mb-1 uppercase">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="delegate@institution.edu"
                        className="w-full px-4 py-3 bg-[#141414] border border-white/10 text-sm text-[#F5F3ED] focus:border-[#C9A34E] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block font-label-caps text-[10px] text-[#D9D7D2] mb-1 uppercase">
                        Contact Phone *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="w-full px-4 py-3 bg-[#141414] border border-white/10 text-sm text-[#F5F3ED] focus:border-[#C9A34E] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-label-caps text-[10px] text-[#D9D7D2] mb-1 uppercase">
                      Institution / School / University *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.institution}
                      onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                      placeholder="e.g. St. Stephen's College / National Law School"
                      className="w-full px-4 py-3 bg-[#141414] border border-white/10 text-sm text-[#F5F3ED] focus:border-[#C9A34E] focus:outline-none"
                    />
                  </div>
                </div>
              )}

              {/* STEP 2: Experience & Track */}
              {step === 2 && (
                <div className="space-y-4">
                  <h3 className="font-label-caps text-xs text-[#C9A34E] tracking-widest uppercase font-bold">
                    Step 2: Parliamentary Experience Level
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      'First-time Delegate',
                      'Intermediate',
                      'Veteran Delegate',
                      'Executive Board',
                    ].map((level) => (
                      <button
                        type="button"
                        key={level}
                        onClick={() =>
                          setFormData({
                            ...formData,
                            experienceLevel: level as any,
                          })
                        }
                        className={`p-4 text-left border transition-all ${
                          formData.experienceLevel === level
                            ? 'bg-[#4B2D8A]/40 border-[#C9A34E] text-[#F5F3ED]'
                            : 'bg-[#141414] border-white/10 text-[#D9D7D2]/80 hover:border-white/30'
                        }`}
                      >
                        <span className="font-label-caps text-xs font-bold block mb-1">
                          {level}
                        </span>
                        <span className="font-sans text-[11px] text-[#D9D7D2]/60">
                          {level === 'First-time Delegate' && 'Guided orientation & committee mentorship'}
                          {level === 'Intermediate' && '1-3 previous MUN or parliamentary experiences'}
                          {level === 'Veteran Delegate' && '4+ conferences, awards & crisis expertise'}
                          {level === 'Executive Board' && 'Applying for Chair / Director General roster'}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 3: Committee & Portfolio / EB Preferences */}
              {step === 3 && (
                formData.experienceLevel === 'Executive Board' ? (
                  <div className="space-y-5">
                    <div className="flex items-center justify-between border-b border-[#C9A34E]/30 pb-2">
                      <h3 className="font-label-caps text-xs text-[#C9A34E] tracking-widest uppercase font-bold">
                        Step 3: Executive Board Role & Committee Preferences
                      </h3>
                      <span className="font-mono text-[9px] px-2 py-0.5 bg-[#4B2D8A]/50 border border-[#C9A34E] text-[#C9A34E] font-bold">
                        EB ROSTER
                      </span>
                    </div>

                    <div>
                      <label className="block font-label-caps text-[10px] text-[#D9D7D2] mb-1 uppercase">
                        Target Executive Board Role *
                      </label>
                      <select
                        value={formData.targetEbRole || 'Chairperson'}
                        onChange={(e) => setFormData({ ...formData, targetEbRole: e.target.value })}
                        className="w-full px-4 py-3 bg-[#141414] border border-[#C9A34E]/40 text-sm text-[#F5F3ED] focus:border-[#C9A34E] focus:outline-none"
                      >
                        <option value="Chairperson">Chairperson / Co-Chair</option>
                        <option value="Vice-Chairperson">Vice-Chairperson / Deputy Director</option>
                        <option value="Director General">Director General / Moderator</option>
                        <option value="Rapporteur">Rapporteur / Executive Board Secretary</option>
                        <option value="Executive Board Roster">Executive Board Open Roster (Any Assigned Committee)</option>
                      </select>
                    </div>

                    <div className="p-4 bg-[#141414]/90 border border-white/10 space-y-4">
                      <span className="font-label-caps text-[10px] text-[#C9A34E] uppercase font-bold tracking-wider block">
                        Rank All Preferred Committee Assignments
                      </span>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div>
                          <label className="block font-label-caps text-[9px] text-[#D9D7D2]/80 mb-1 uppercase">
                            1st Choice Committee *
                          </label>
                          <select
                            value={formData.primaryCommittee}
                            onChange={(e) => setFormData({ ...formData, primaryCommittee: e.target.value })}
                            className="w-full px-3 py-2 bg-[#0E0E0E] border border-white/10 text-xs text-[#F5F3ED] focus:border-[#C9A34E] focus:outline-none"
                          >
                            {COMMITTEES.map((c) => (
                              <option key={c.id} value={c.id}>
                                {c.abbreviation} - {c.title}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block font-label-caps text-[9px] text-[#D9D7D2]/80 mb-1 uppercase">
                            2nd Choice Committee *
                          </label>
                          <select
                            value={formData.secondaryCommittee}
                            onChange={(e) => setFormData({ ...formData, secondaryCommittee: e.target.value })}
                            className="w-full px-3 py-2 bg-[#0E0E0E] border border-white/10 text-xs text-[#F5F3ED] focus:border-[#C9A34E] focus:outline-none"
                          >
                            {COMMITTEES.map((c) => (
                              <option key={c.id} value={c.id}>
                                {c.abbreviation} - {c.title}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block font-label-caps text-[9px] text-[#D9D7D2]/80 mb-1 uppercase">
                            3rd Choice Committee
                          </label>
                          <select
                            value={formData.ebCommitteePreferences?.[2] || 'unhrc'}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                ebCommitteePreferences: [
                                  formData.primaryCommittee,
                                  formData.secondaryCommittee,
                                  e.target.value,
                                ],
                              })
                            }
                            className="w-full px-3 py-2 bg-[#0E0E0E] border border-white/10 text-xs text-[#F5F3ED] focus:border-[#C9A34E] focus:outline-none"
                          >
                            {COMMITTEES.map((c) => (
                              <option key={c.id} value={c.id}>
                                {c.abbreviation} - {c.title}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-5">
                    <h3 className="font-label-caps text-xs text-[#C9A34E] tracking-widest uppercase font-bold">
                      Step 3: Committee & Portfolio Preferences
                    </h3>

                    {/* Primary Preference Block */}
                    <div className="p-4 bg-[#141414]/80 border border-[#C9A34E]/30 space-y-3">
                      <span className="font-label-caps text-[10px] text-[#C9A34E] uppercase font-bold tracking-wider block">
                        1st Preference (Primary)
                      </span>
                      <div>
                        <label className="block font-label-caps text-[10px] text-[#D9D7D2] mb-1 uppercase">
                          Primary Committee Preference *
                        </label>
                        <select
                          value={formData.primaryCommittee}
                          onChange={(e) =>
                            setFormData({ ...formData, primaryCommittee: e.target.value })
                          }
                          className="w-full px-4 py-2.5 bg-[#0E0E0E] border border-white/10 text-xs text-[#F5F3ED] focus:border-[#C9A34E] focus:outline-none"
                        >
                          {COMMITTEES.map((c) => (
                            <option key={c.id} value={c.id}>
                              {c.title} ({c.abbreviation})
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block font-label-caps text-[10px] text-[#D9D7D2] mb-1 uppercase">
                          Primary Preferred Country / Portfolio / MP Stance
                        </label>
                        <input
                          type="text"
                          value={formData.primaryPreferredCountry}
                          onChange={(e) =>
                            setFormData({ ...formData, primaryPreferredCountry: e.target.value })
                          }
                          placeholder="e.g. Delegate of India / MP for New Delhi / Mumbai Indians Franchise"
                          className="w-full px-4 py-2.5 bg-[#0E0E0E] border border-white/10 text-xs text-[#F5F3ED] focus:border-[#C9A34E] focus:outline-none placeholder:text-[#75735B]"
                        />
                      </div>
                    </div>

                    {/* Secondary Preference Block */}
                    <div className="p-4 bg-[#141414]/80 border border-white/10 space-y-3">
                      <span className="font-label-caps text-[10px] text-[#D9D7D2]/80 uppercase font-bold tracking-wider block">
                        2nd Preference (Secondary)
                      </span>
                      <div>
                        <label className="block font-label-caps text-[10px] text-[#D9D7D2] mb-1 uppercase">
                          Secondary Committee Preference *
                        </label>
                        <select
                          value={formData.secondaryCommittee}
                          onChange={(e) =>
                            setFormData({ ...formData, secondaryCommittee: e.target.value })
                          }
                          className="w-full px-4 py-2.5 bg-[#0E0E0E] border border-white/10 text-xs text-[#F5F3ED] focus:border-[#C9A34E] focus:outline-none"
                        >
                          {COMMITTEES.map((c) => (
                            <option key={c.id} value={c.id}>
                              {c.title} ({c.abbreviation})
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block font-label-caps text-[10px] text-[#D9D7D2] mb-1 uppercase">
                          Secondary Preferred Country / Portfolio / MP Stance
                        </label>
                        <input
                          type="text"
                          value={formData.secondaryPreferredCountry}
                          onChange={(e) =>
                            setFormData({ ...formData, secondaryPreferredCountry: e.target.value })
                          }
                          placeholder="e.g. Delegate of USA / MP for Varanasi / Chennai Super Kings"
                          className="w-full px-4 py-2.5 bg-[#0E0E0E] border border-white/10 text-xs text-[#F5F3ED] focus:border-[#C9A34E] focus:outline-none placeholder:text-[#75735B]"
                        />
                      </div>
                    </div>
                  </div>
                )
              )}

              {/* STEP 4: SOP & Executive Board Vision */}
              {step === 4 && (
                formData.experienceLevel === 'Executive Board' ? (
                  <div className="space-y-4">
                    <h3 className="font-label-caps text-xs text-[#C9A34E] tracking-widest uppercase font-bold">
                      Step 4: Executive Board Credentials & Firm Vision
                    </h3>

                    <div>
                      <label className="block font-label-caps text-[10px] text-[#D9D7D2] mb-1 uppercase">
                        Past Chairing & EB Experience *
                      </label>
                      <textarea
                        required
                        rows={3}
                        value={formData.pastEbExperience || ''}
                        onChange={(e) =>
                          setFormData({ ...formData, pastEbExperience: e.target.value })
                        }
                        placeholder="List your previous Executive Board positions, conferences chaired, secretariat experience, and awards..."
                        className="w-full px-4 py-2.5 bg-[#141414] border border-white/10 text-xs text-[#F5F3ED] focus:border-[#C9A34E] focus:outline-none leading-relaxed font-light placeholder:text-[#75735B]"
                      />
                    </div>

                    <div>
                      <label className="block font-label-caps text-[10px] text-[#D9D7D2] mb-1 uppercase">
                        Why do you wish to join the Executive Board of Aequitas × Aastitva? *
                      </label>
                      <textarea
                        required
                        rows={3}
                        value={formData.whyJoinAequitas || ''}
                        onChange={(e) =>
                          setFormData({ ...formData, whyJoinAequitas: e.target.value })
                        }
                        placeholder="Detail your motivation, alignment with our parliamentary standards, and leadership vision..."
                        className="w-full px-4 py-2.5 bg-[#141414] border border-white/10 text-xs text-[#F5F3ED] focus:border-[#C9A34E] focus:outline-none leading-relaxed font-light placeholder:text-[#75735B]"
                      />
                    </div>

                    <div>
                      <label className="block font-label-caps text-[10px] text-[#D9D7D2] mb-1 uppercase">
                        Committee Moderation & Crisis Strategy *
                      </label>
                      <textarea
                        required
                        rows={3}
                        value={formData.statementOfPurpose}
                        onChange={(e) =>
                          setFormData({ ...formData, statementOfPurpose: e.target.value })
                        }
                        placeholder="Outline your approach to committee dynamics, resolution drafting, and delegate guidance..."
                        className="w-full px-4 py-2.5 bg-[#141414] border border-white/10 text-xs text-[#F5F3ED] focus:border-[#C9A34E] focus:outline-none leading-relaxed font-light placeholder:text-[#75735B]"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <h3 className="font-label-caps text-xs text-[#C9A34E] tracking-widest uppercase font-bold">
                      Step 4: Statement of Purpose
                    </h3>

                    <div>
                      <label className="block font-label-caps text-[10px] text-[#D9D7D2] mb-1 uppercase">
                        Why do you wish to take your seat at Aequitas × Aastitva? *
                      </label>
                      <textarea
                        required
                        rows={4}
                        value={formData.statementOfPurpose}
                        onChange={(e) =>
                          setFormData({ ...formData, statementOfPurpose: e.target.value })
                        }
                        placeholder="Outline your stance, legislative goals, and expectations for committee deliberations..."
                        className="w-full px-4 py-3 bg-[#141414] border border-white/10 text-sm text-[#F5F3ED] focus:border-[#C9A34E] focus:outline-none leading-relaxed font-light"
                      />
                    </div>
                  </div>
                )
              )}

              {/* Footer Controls */}
              <div className="flex items-center justify-between pt-6 border-t border-white/10">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={() => setStep(step - 1)}
                    className="px-5 py-2.5 bg-[#141414] text-[#D9D7D2] border border-white/10 font-label-caps text-xs uppercase"
                  >
                    Back
                  </button>
                ) : (
                  <div />
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 py-3 bg-gradient-to-r from-[#4B2D8A] to-[#C9A34E] text-[#F5F3ED] font-label-caps text-xs tracking-widest uppercase font-bold shadow-[0_0_20px_rgba(201,163,78,0.3)] hover:brightness-110 flex items-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-[#C9A34E]" />
                      <span>Registering Seat...</span>
                    </>
                  ) : (
                    <>
                      <span>{step === 4 ? 'Confirm Application' : 'Proceed'}</span>
                      <ChevronRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        ) : (
          /* Confirmation & Generated Delegate Badge */
          <div className="text-center py-6 space-y-6">
            <div className="w-16 h-16 mx-auto rounded-full bg-[#4B2D8A]/40 border-2 border-[#C9A34E] flex items-center justify-center text-[#C9A34E] shadow-[0_0_40px_rgba(201,163,78,0.4)]">
              <Award className="w-8 h-8" />
            </div>

            <div>
              <span className="font-label-caps text-xs text-[#C9A34E] tracking-widest uppercase font-bold block mb-1">
                Seat Allocation Confirmed
              </span>
              <h2 className="font-serif-luxury text-3xl font-bold text-[#F5F3ED]">
                Welcome to the Assembly, {formData.fullName}
              </h2>
              <p className="font-sans text-xs text-[#D9D7D2]/80 mt-1 max-w-md mx-auto">
                Your portfolio application has been registered into the official secretariat records.
              </p>
            </div>

            {/* Printable Delegate Badge */}
            <div id="printable-delegate-pass" className="p-6 bg-[#141414] border border-[#C9A34E]/50 text-left max-w-md mx-auto relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#C9A34E]/20 to-transparent pointer-events-none" />

              <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <img
                    src={BRAND_LOGOS.aequitas}
                    alt="Logo"
                    className="w-6 h-6 rounded-full border border-[#C9A34E]"
                  />
                  <span className="font-serif-luxury text-sm font-bold text-[#F5F3ED]">
                    Aequitas × Aastitva
                  </span>
                </div>
                <span className="font-mono text-[9px] text-[#C9A34E] font-bold">
                  PASS-2026-0892
                </span>
              </div>

              <div className="space-y-2 mb-4">
                <div>
                  <span className="font-label-caps text-[9px] text-[#75735B] uppercase block">Delegate Name</span>
                  <p className="font-serif-luxury text-lg font-bold text-[#F5F3ED]">{formData.fullName}</p>
                </div>
                <div>
                  <span className="font-label-caps text-[9px] text-[#75735B] uppercase block">Assigned Chamber</span>
                  <p className="font-sans text-xs text-[#C9A34E] font-semibold">{getCommitteeTitle(formData.primaryCommittee)}</p>
                </div>
                <div>
                  <span className="font-label-caps text-[9px] text-[#75735B] uppercase block">Institution</span>
                  <p className="font-sans text-xs text-[#D9D7D2]">{formData.institution}</p>
                </div>
              </div>

              <div className="pt-3 border-t border-white/10 flex justify-between items-center text-[10px] text-[#75735B]">
                <span>Status: <strong className="text-[#00E676]">Confirmed</strong></span>
                <span>Secretariat Verification</span>
              </div>
            </div>

            <div className="flex items-center justify-center gap-4 pt-2">
              <button
                onClick={() => window.print()}
                className="px-6 py-3 bg-[#141414] text-[#C9A34E] border border-[#C9A34E]/60 font-label-caps text-xs tracking-widest uppercase font-bold hover:bg-[#C9A34E] hover:text-[#141414] transition-colors flex items-center gap-2"
              >
                <Printer className="w-4 h-4" />
                <span>Print Delegate Pass</span>
              </button>

              <button
                onClick={onClose}
                className="px-6 py-3 bg-[#4B2D8A] text-[#F5F3ED] font-label-caps text-xs tracking-widest uppercase font-bold hover:bg-[#C9A34E] hover:text-[#141414] transition-colors"
              >
                Return To Assembly
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};
