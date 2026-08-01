import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Lock,
  Key,
  Shield,
  Search,
  Download,
  Trash2,
  X,
  UserCheck,
  Building,
  Mail,
  Phone,
  Award,
  FileText,
  CheckCircle2,
  AlertCircle,
  Eye,
  ChevronDown,
  ChevronUp,
  LogOut
} from 'lucide-react';
import { COMMITTEES } from '../data/content';

interface ApplicationRecord {
  fullName: string;
  email: string;
  phone: string;
  institution: string;
  experienceLevel: string;
  primaryCommittee: string;
  secondaryCommittee: string;
  preferredCountry: string;
  statementOfPurpose: string;
  submittedAt: string;
  passId: string;
}

interface AdminSecretariatModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SECRET_PASSCODE = 'AquitasxAastitvainsansad2026';

export const AdminSecretariatModal: React.FC<AdminSecretariatModalProps> = ({ isOpen, onClose }) => {
  const [passcode, setPasscode] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [applications, setApplications] = useState<ApplicationRecord[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Load applications from localStorage on mount/open
  useEffect(() => {
    if (isOpen) {
      loadApplications();
    } else {
      // Reset sensitive state and revoke clearance on close
      setIsAuthenticated(false);
      setPasscode('');
      setErrorMsg('');
    }
  }, [isOpen]);

  const handleRevokeAccess = () => {
    setIsAuthenticated(false);
    setPasscode('');
    setErrorMsg('');
  };

  const loadApplications = () => {
    try {
      const data = JSON.parse(localStorage.getItem('aequitas_applications') || '[]');
      setApplications(data);
    } catch (e) {
      console.error('Failed to load applications', e);
      setApplications([]);
    }
  };

  const handleAuthenticate = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode.trim() === SECRET_PASSCODE) {
      setIsAuthenticated(true);
      setErrorMsg('');
      loadApplications();
    } else {
      setErrorMsg('Clearance Denied. Invalid Secretariat Passcode.');
    }
  };

  const handleDeleteRecord = (passId: string) => {
    if (window.confirm(`Are you sure you want to purge record ${passId}?`)) {
      const updated = applications.filter((app) => app.passId !== passId);
      setApplications(updated);
      localStorage.setItem('aequitas_applications', JSON.stringify(updated));
    }
  };

  const handleClearAllRecords = () => {
    if (window.confirm('WARNING: Are you sure you want to purge ALL delegate applications? This action cannot be undone.')) {
      setApplications([]);
      localStorage.setItem('aequitas_applications', JSON.stringify([]));
    }
  };

  const handleExportCSV = () => {
    if (applications.length === 0) return;

    const headers = [
      'Pass ID',
      'Full Name',
      'Email',
      'Phone',
      'Institution',
      'Experience Level',
      'Primary Committee',
      'Secondary Committee',
      'Preferred Country',
      'Statement of Purpose',
      'Submitted At'
    ];

    const rows = applications.map((app) => [
      `"${app.passId || ''}"`,
      `"${app.fullName || ''}"`,
      `"${app.email || ''}"`,
      `"${app.phone || ''}"`,
      `"${app.institution || ''}"`,
      `"${app.experienceLevel || ''}"`,
      `"${COMMITTEES.find((c) => c.id === app.primaryCommittee)?.title || app.primaryCommittee || ''}"`,
      `"${COMMITTEES.find((c) => c.id === app.secondaryCommittee)?.title || app.secondaryCommittee || ''}"`,
      `"${app.preferredCountry || ''}"`,
      `"${(app.statementOfPurpose || '').replace(/"/g, '""')}"`,
      `"${app.submittedAt || ''}"`
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Aequitas_Aastitva_Delegates_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredApplications = useMemo(() => {
    if (!searchQuery) return applications;
    const q = searchQuery.toLowerCase();
    return applications.filter((app) => {
      return (
        app.fullName?.toLowerCase().includes(q) ||
        app.email?.toLowerCase().includes(q) ||
        app.institution?.toLowerCase().includes(q) ||
        app.passId?.toLowerCase().includes(q) ||
        app.primaryCommittee?.toLowerCase().includes(q)
      );
    });
  }, [applications, searchQuery]);

  const getCommitteeTitle = (id: string) => {
    return COMMITTEES.find((c) => c.id === id)?.title || id;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-2xl overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 30 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="glass-panel-gold max-w-5xl w-full max-h-[90vh] flex flex-col p-6 sm:p-8 relative rounded-none border border-[#C9A34E]/60 shadow-[0_0_80px_rgba(201,163,78,0.3)] text-[#F5F3ED] my-auto overflow-hidden"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-[#D9D7D2] hover:text-[#C9A34E] transition-colors z-20"
        >
          <X className="w-6 h-6" />
        </button>

        {!isAuthenticated ? (
          /* Passcode Protection Challenge Screen */
          <div className="py-12 px-4 max-w-md mx-auto text-center space-y-6">
            <div className="w-16 h-16 mx-auto rounded-full bg-[#4B2D8A]/30 border-2 border-[#C9A34E] flex items-center justify-center text-[#C9A34E] shadow-[0_0_40px_rgba(201,163,78,0.3)]">
              <Shield className="w-8 h-8" />
            </div>

            <div>
              <span className="font-label-caps text-xs text-[#C9A34E] tracking-[0.3em] uppercase font-bold block mb-1">
                Restricted Secretariat Clearance
              </span>
              <h2 className="font-serif-luxury text-3xl font-bold text-[#F5F3ED]">
                Dev & Admin Portal
              </h2>
              <p className="font-sans text-xs text-[#D9D7D2]/80 mt-1">
                Enter authorized secretariat passcode to inspect delegate credentials and export registration records.
              </p>
            </div>

            <form onSubmit={handleAuthenticate} className="space-y-4 pt-2">
              <div className="relative">
                <Lock className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-[#C9A34E]" />
                <input
                  type="password"
                  required
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  placeholder="Enter Secretariat Passcode..."
                  className="w-full pl-12 pr-4 py-3 bg.141414] border border-white/20 text-sm text-[#F5F3ED] focus:border-[#C9A34E] focus:outline-none"
                />
              </div>

              {errorMsg && (
                <div className="flex items-center gap-2 text-xs text-[#FF5252] bg-[#FF5252]/10 p-3 border border-[#FF5252]/30 text-left">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3.5 bg-gradient-to-r from-[#4B2D8A] to-[#C9A34E] text-[#F5F3ED] font-label-caps text-xs tracking-widest uppercase font-bold shadow-[0_0_25px_rgba(201,163,78,0.3)] hover:brightness-110 flex items-center justify-center gap-2"
              >
                <Key className="w-4 h-4" />
                <span>Verify Clearance</span>
              </button>
            </form>
          </div>
        ) : (
          /* Authenticated Secretariat Registrations Terminal */
          <div className="flex flex-col h-full overflow-hidden">
            {/* Header Toolbar */}
            <div className="border-b border-white/10 pb-6 mb-6 pr-10">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-label-caps text-[10px] px-2.5 py-0.5 bg-[#00E676]/20 border border-[#00E676]/50 text-[#00E676] uppercase font-bold tracking-widest">
                      Secretariat Authenticated
                    </span>
                    <span className="font-mono text-xs text-[#C9A34E]">
                      Total Applications: {applications.length}
                    </span>
                  </div>
                  <h2 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#F5F3ED]">
                    Delegate Registrations Records
                  </h2>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <button
                    onClick={handleExportCSV}
                    disabled={applications.length === 0}
                    className="px-4 py-2.5 bg-[#C9A34E] text-[#141414] font-label-caps text-xs tracking-wider uppercase font-bold hover:bg-[#F5F3ED] transition-colors flex items-center gap-2 disabled:opacity-40"
                  >
                    <Download className="w-4 h-4" />
                    <span>Export CSV</span>
                  </button>

                  <button
                    onClick={handleClearAllRecords}
                    disabled={applications.length === 0}
                    className="px-4 py-2.5 bg-[#93000A]/30 text-[#FF5252] border border-[#93000A]/60 font-label-caps text-xs tracking-wider uppercase font-bold hover:bg-[#93000A] hover:text-[#F5F3ED] transition-colors flex items-center gap-2 disabled:opacity-40"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Purge All</span>
                  </button>

                  <button
                    onClick={handleRevokeAccess}
                    className="px-4 py-2.5 bg-[#141414] text-[#D9D7D2] border border-white/20 font-label-caps text-xs tracking-wider uppercase font-bold hover:border-[#C9A34E] hover:text-[#C9A34E] transition-colors flex items-center gap-2"
                  >
                    <LogOut className="w-4 h-4 text-[#C9A34E]" />
                    <span>Revoke Access & Lock</span>
                  </button>
                </div>
              </div>

              {/* Search Bar */}
              <div className="mt-4 relative">
                <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-[#C9A34E]" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filter by name, email, institution, pass ID, or committee..."
                  className="w-full pl-11 pr-4 py-2.5 bg-[#141414] border border-white/15 text-xs text-[#F5F3ED] focus:border-[#C9A34E] focus:outline-none placeholder:text-[#75735B]"
                />
              </div>
            </div>

            {/* Registrations List */}
            <div className="flex-1 overflow-y-auto pr-2 space-y-4">
              {filteredApplications.length === 0 ? (
                <div className="text-center py-16 border border-white/10 bg-[#141414]/60">
                  <UserCheck className="w-10 h-10 text-[#75735B] mx-auto mb-3" />
                  <h3 className="font-serif-luxury text-lg text-[#F5F3ED]">No Delegate Applications Recorded</h3>
                  <p className="font-sans text-xs text-[#D9D7D2]/60 mt-1 max-w-sm mx-auto">
                    {searchQuery
                      ? 'No applications match your search terms.'
                      : 'Applications submitted through the "Take Your Seat" modal will appear here instantly.'}
                  </p>
                </div>
              ) : (
                filteredApplications.map((app, index) => {
                  const isExpanded = expandedId === (app.passId || index.toString());
                  const recId = app.passId || index.toString();

                  return (
                    <div
                      key={recId}
                      className="bg-[#141414] border border-white/10 hover:border-[#C9A34E]/50 transition-all p-5 relative"
                    >
                      <div className="flex flex-wrap items-start justify-between gap-4">
                        <div className="space-y-1 flex-1 min-w-[240px]">
                          <div className="flex items-center gap-2">
                            <span className="font-serif-luxury text-lg font-bold text-[#F5F3ED]">
                              {app.fullName}
                            </span>
                            <span className="font-mono text-[10px] text-[#C9A34E] bg-[#C9A34E]/10 px-2 py-0.5 border border-[#C9A34E]/30 font-bold">
                              {app.passId || `PASS-${index + 1}`}
                            </span>
                          </div>

                          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 font-sans text-xs text-[#D9D7D2]/80">
                            <span className="flex items-center gap-1.5 text-[#C9A34E] font-medium">
                              <Award className="w-3.5 h-3.5" />
                              {getCommitteeTitle(app.primaryCommittee)}
                            </span>
                            <span className="flex items-center gap-1.5 text-[#D9D7D2]/70">
                              <Building className="w-3.5 h-3.5 text-[#75735B]" />
                              {app.institution}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setExpandedId(isExpanded ? null : recId)}
                            className="px-3 py-1.5 bg-white/5 hover:bg-white/10 text-xs text-[#D9D7D2] font-label-caps uppercase flex items-center gap-1.5 border border-white/10"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>{isExpanded ? 'Hide' : 'Full Details'}</span>
                            {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                          </button>

                          <button
                            onClick={() => handleDeleteRecord(recId)}
                            className="p-1.5 text-[#75735B] hover:text-[#FF5252] transition-colors"
                            title="Delete Record"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Expanded View */}
                      {isExpanded && (
                        <div className="mt-4 pt-4 border-t border-white/10 grid grid-cols-1 md:grid-cols-2 gap-4 font-sans text-xs text-[#D9D7D2]">
                          <div className="space-y-2 bg-[#0E0E0E] p-4 border border-white/5">
                            <div>
                              <span className="font-label-caps text-[9px] text-[#75735B] uppercase block">Email</span>
                              <span className="text-[#F5F3ED] font-mono">{app.email}</span>
                            </div>
                            <div>
                              <span className="font-label-caps text-[9px] text-[#75735B] uppercase block">Phone</span>
                              <span className="text-[#F5F3ED] font-mono">{app.phone}</span>
                            </div>
                            <div>
                              <span className="font-label-caps text-[9px] text-[#75735B] uppercase block">Experience Level</span>
                              <span className="text-[#C9A34E] font-semibold">{app.experienceLevel}</span>
                            </div>
                          </div>

                          <div className="space-y-2 bg-[#0E0E0E] p-4 border border-white/5">
                            <div>
                              <span className="font-label-caps text-[9px] text-[#75735B] uppercase block">Secondary Preference</span>
                              <span className="text-[#F5F3ED]">{getCommitteeTitle(app.secondaryCommittee)}</span>
                            </div>
                            <div>
                              <span className="font-label-caps text-[9px] text-[#75735B] uppercase block">Preferred Country / Matrix</span>
                              <span className="text-[#F5F3ED]">{app.preferredCountry || 'Not Specified'}</span>
                            </div>
                            <div>
                              <span className="font-label-caps text-[9px] text-[#75735B] uppercase block">Submission Timestamp</span>
                              <span className="text-[#75735B] font-mono text-[10px]">{app.submittedAt}</span>
                            </div>
                          </div>

                          <div className="md:col-span-2 bg-[#0E0E0E] p-4 border border-white/5">
                            <span className="font-label-caps text-[9px] text-[#75735B] uppercase block mb-1">
                              Statement of Purpose / Policy Stance
                            </span>
                            <p className="font-sans text-xs text-[#D9D7D2]/90 font-light leading-relaxed whitespace-pre-wrap">
                              {app.statementOfPurpose || 'No statement provided.'}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};
