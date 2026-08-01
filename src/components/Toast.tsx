import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, Info, Sparkles, X } from 'lucide-react';

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'gold';
  title: string;
  message: string;
}

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const ToastContainer: React.FC<ToastProps> = ({ toasts, onDismiss }) => {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className={`pointer-events-auto p-4 rounded-none border shadow-2xl flex items-start gap-3 backdrop-blur-xl ${
              toast.type === 'gold'
                ? 'bg-[#181510]/95 border-[#C9A34E] text-[#F5F3ED] shadow-[0_0_30px_rgba(201,163,78,0.25)]'
                : toast.type === 'success'
                ? 'bg-[#0E1A14]/95 border-[#00E676]/60 text-[#F5F3ED] shadow-[0_0_30px_rgba(0,230,118,0.2)]'
                : 'bg-[#141414]/95 border-white/20 text-[#F5F3ED]'
            }`}
          >
            {toast.type === 'gold' && <Sparkles className="w-5 h-5 text-[#C9A34E] shrink-0 mt-0.5" />}
            {toast.type === 'success' && <CheckCircle2 className="w-5 h-5 text-[#00E676] shrink-0 mt-0.5" />}
            {toast.type === 'info' && <Info className="w-5 h-5 text-[#7C3AED] shrink-0 mt-0.5" />}

            <div className="flex-1 min-w-0">
              <h4 className="font-serif-luxury text-sm font-bold text-[#F5F3ED]">{toast.title}</h4>
              <p className="font-sans text-xs text-[#D9D7D2]/80 mt-0.5 leading-snug">{toast.message}</p>
            </div>

            <button
              onClick={() => onDismiss(toast.id)}
              className="text-[#75735B] hover:text-[#F5F3ED] transition-colors p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
