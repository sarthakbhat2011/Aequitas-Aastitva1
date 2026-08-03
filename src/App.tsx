import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { LoadingScreen } from './components/LoadingScreen';
import { Navbar } from './components/Navbar';
import { Hero3D } from './components/Hero3D';
import { ChapterPurpose } from './components/ChapterPurpose';
import { ChapterExperiences } from './components/ChapterExperiences';
import { ChapterCommittees } from './components/ChapterCommittees';
import { SurpriseCommitteeVault } from './components/SurpriseCommitteeVault';
import { GallerySection } from './components/GallerySection';
import { FeedbackSection } from './components/FeedbackSection';
import { ApplyModal } from './components/ApplyModal';
import { Footer } from './components/Footer';
import { ToastContainer, ToastMessage } from './components/Toast';
import { AdminSecretariatModal } from './components/AdminSecretariatModal';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isApplyOpen, setIsApplyOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [preselectedCommittee, setPreselectedCommittee] = useState<string | undefined>(undefined);
  const [activeSection, setActiveSection] = useState('home');
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const handleLoadingComplete = React.useCallback(() => {
    setIsLoading(false);
  }, []);

  const addToast = (type: 'success' | 'info' | 'gold', title: string, message: string) => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, type, title, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // URL Hash Sync and Back/Forward Navigation Listener
  useEffect(() => {
    const parseHash = () => {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      if (hash === 'apply') {
        setIsApplyOpen(true);
      } else if (['home', 'purpose', 'experiences', 'committees', 'gallery', 'feedback'].includes(hash)) {
        setActiveSection(hash);
      }
    };

    parseHash();
    window.addEventListener('popstate', parseHash);
    window.addEventListener('hashchange', parseHash);
    return () => {
      window.removeEventListener('popstate', parseHash);
      window.removeEventListener('hashchange', parseHash);
    };
  }, []);

  // Update document title dynamically based on active section
  useEffect(() => {
    const titleMap: Record<string, string> = {
      home: 'Aequitas × Aastitva | Where Justice Meets Identity',
      purpose: 'Purpose & Ethos | Aequitas × Aastitva',
      experiences: 'Delegate Experience & Pillars | Aequitas × Aastitva',
      committees: 'Sovereign Chambers & Agendas | Aequitas × Aastitva',
      gallery: 'Assembly Gallery & Archives | Aequitas × Aastitva',
      feedback: 'Diplomatic Feedback & Passed Quotes | Aequitas × Aastitva',
    };
    document.title = titleMap[activeSection] || 'Aequitas × Aastitva | MUN Assembly';
  }, [activeSection]);

  const handleOpenApply = (committeeId?: string) => {
    setPreselectedCommittee(committeeId);
    setIsApplyOpen(true);
    window.history.pushState(null, '', '#apply');
  };

  const handleCloseApply = () => {
    setIsApplyOpen(false);
    if (window.location.hash === '#apply') {
      window.history.pushState(null, '', `#${activeSection}`);
    }
  };

  const handleSelectSection = (sectionId: string) => {
    setActiveSection(sectionId);
    if (window.location.hash !== `#${sectionId}`) {
      window.history.pushState(null, '', `#${sectionId}`);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-[#141414] text-[#F5F3ED] min-h-screen font-sans selection:bg-[#4B2D8A] selection:text-[#F5F3ED] overflow-x-hidden relative">
      {/* Brand Loading Screen Experience */}
      <AnimatePresence>
        {isLoading && (
          <LoadingScreen onLoadingComplete={handleLoadingComplete} />
        )}
      </AnimatePresence>

      {/* Top Floating Navbar & Navigation Dock */}
      <Navbar
        onOpenApply={() => handleOpenApply()}
        activeSection={activeSection}
        onSelectSection={handleSelectSection}
      />

      {/* Main Content Area */}
      <main className="pb-20 pt-16 min-h-screen">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="w-full min-h-[80vh]"
          >
            {activeSection === 'home' && (
              <>
                <Hero3D onOpenApply={() => handleOpenApply()} />
                <Footer onOpenApply={() => handleOpenApply()} onOpenAdmin={() => setIsAdminOpen(true)} />
              </>
            )}

            {activeSection === 'purpose' && (
              <>
                <ChapterPurpose />
                <Footer onOpenApply={() => handleOpenApply()} onOpenAdmin={() => setIsAdminOpen(true)} />
              </>
            )}

            {activeSection === 'experiences' && (
              <>
                <ChapterExperiences />
                <Footer onOpenApply={() => handleOpenApply()} onOpenAdmin={() => setIsAdminOpen(true)} />
              </>
            )}

            {activeSection === 'committees' && (
              <>
                <ChapterCommittees onOpenApplyForCommittee={handleOpenApply} />
                <SurpriseCommitteeVault onUnlock={() => addToast('gold', 'Vault Unlocked!', 'Secret Committee classified details revealed.')} />
                <Footer onOpenApply={() => handleOpenApply()} onOpenAdmin={() => setIsAdminOpen(true)} />
              </>
            )}

            {activeSection === 'gallery' && (
              <>
                <GallerySection />
                <Footer onOpenApply={() => handleOpenApply()} onOpenAdmin={() => setIsAdminOpen(true)} />
              </>
            )}

            {activeSection === 'feedback' && (
              <>
                <FeedbackSection />
                <Footer onOpenApply={() => handleOpenApply()} onOpenAdmin={() => setIsAdminOpen(true)} />
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Delegate Application / Portfolio Claim Modal */}
      <ApplyModal
        isOpen={isApplyOpen}
        onClose={handleCloseApply}
        preselectedCommitteeId={preselectedCommittee}
        onApplicationSuccess={(name, committee) => {
          addToast(
            'success',
            'Portfolio Registered!',
            `Welcome ${name}. Application for ${committee} submitted.`
          );
        }}
      />

      {/* Secretariat Admin & Dev Portal Modal */}
      <AdminSecretariatModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
      />

      {/* Global Toast Container */}
      <ToastContainer toasts={toasts} onDismiss={removeToast} />
    </div>
  );
}
