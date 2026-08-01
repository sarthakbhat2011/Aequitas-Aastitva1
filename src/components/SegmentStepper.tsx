import React from 'react';
import { ChevronLeft, ChevronRight, Compass } from 'lucide-react';

interface SegmentStepperProps {
  currentSegment: string;
  onSelectSegment: (segmentId: string) => void;
}

const SEGMENTS = [
  { id: 'home', title: 'Home & Welcome', chapter: '01 / 05' },
  { id: 'purpose', title: 'Purpose & Manifesto', chapter: '02 / 05' },
  { id: 'experiences', title: 'Diplomatic Experiences', chapter: '03 / 05' },
  { id: 'committees', title: 'Committees & Chambers', chapter: '04 / 05' },
  { id: 'gallery', title: 'Diplomatic Gallery', chapter: '05 / 05' },
];

export const SegmentStepper: React.FC<SegmentStepperProps> = ({ currentSegment, onSelectSegment }) => {
  const currentIndex = SEGMENTS.findIndex((s) => s.id === currentSegment);
  const activeIndex = currentIndex >= 0 ? currentIndex : 0;

  const prevSegment = activeIndex > 0 ? SEGMENTS[activeIndex - 1] : null;
  const nextSegment = activeIndex < SEGMENTS.length - 1 ? SEGMENTS[activeIndex + 1] : null;

  return (
    <div className="w-full bg-[#0E0E0E] border-t border-b border-[#C9A34E]/30 py-8 px-6 my-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Previous Page Button */}
        <div className="w-full md:w-1/3 flex justify-start">
          {prevSegment ? (
            <button
              onClick={() => onSelectSegment(prevSegment.id)}
              className="group flex items-center gap-3 px-5 py-3 bg-[#141414] border border-[#C9A34E]/30 hover:border-[#C9A34E] text-left transition-all duration-300 hover:shadow-[0_0_20px_rgba(201,163,78,0.2)] w-full md:w-auto"
            >
              <div className="p-2 bg-[#0E0E0E] border border-white/10 group-hover:border-[#C9A34E] text-[#C9A34E] shrink-0">
                <ChevronLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
              </div>
              <div>
                <span className="font-label-caps text-[9px] text-[#75735B] uppercase block">Previous Page</span>
                <span className="font-serif-luxury text-sm font-bold text-[#F5F3ED] group-hover:text-[#C9A34E] transition-colors">
                  {prevSegment.title}
                </span>
              </div>
            </button>
          ) : (
            <div className="hidden md:block" />
          )}
        </div>

        {/* Center Progress Steps */}
        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center gap-2">
            {SEGMENTS.map((seg, idx) => {
              const isActive = idx === activeIndex;
              return (
                <button
                  key={seg.id}
                  onClick={() => onSelectSegment(seg.id)}
                  title={`Go to ${seg.title}`}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    isActive
                      ? 'w-10 bg-gradient-to-r from-[#4B2D8A] via-[#C9A34E] to-[#E5B83B] shadow-[0_0_10px_#C9A34E]'
                      : 'w-2.5 bg-white/20 hover:bg-white/50'
                  }`}
                  aria-label={`Segment ${seg.title}`}
                />
              );
            })}
          </div>
          <span className="font-label-caps text-[10px] text-[#C9A34E] tracking-widest uppercase font-bold">
            Page {activeIndex + 1} of {SEGMENTS.length} — {SEGMENTS[activeIndex].title}
          </span>
        </div>

        {/* Next Page Button */}
        <div className="w-full md:w-1/3 flex justify-end">
          {nextSegment ? (
            <button
              onClick={() => onSelectSegment(nextSegment.id)}
              className="group flex items-center justify-end gap-3 px-5 py-3 bg-gradient-to-r from-[#4B2D8A]/80 to-[#141414] border border-[#C9A34E]/40 hover:border-[#C9A34E] text-right transition-all duration-300 hover:shadow-[0_0_20px_rgba(201,163,78,0.3)] w-full md:w-auto"
            >
              <div>
                <span className="font-label-caps text-[9px] text-[#C9A34E] uppercase block font-bold">Next Page</span>
                <span className="font-serif-luxury text-sm font-bold text-[#F5F3ED] group-hover:text-[#C9A34E] transition-colors">
                  {nextSegment.title}
                </span>
              </div>
              <div className="p-2 bg-[#0E0E0E] border border-[#C9A34E]/50 group-hover:border-[#FFD700] text-[#FFD700] shrink-0">
                <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </button>
          ) : (
            <button
              onClick={() => onSelectSegment('home')}
              className="group flex items-center justify-end gap-3 px-5 py-3 bg-[#141414] border border-[#C9A34E]/30 hover:border-[#C9A34E] text-right transition-all duration-300"
            >
              <div>
                <span className="font-label-caps text-[9px] text-[#C9A34E] uppercase block">Return to Beginning</span>
                <span className="font-serif-luxury text-sm font-bold text-[#F5F3ED]">Home & Welcome</span>
              </div>
              <div className="p-2 bg-[#0E0E0E] border border-white/10 text-[#C9A34E] shrink-0">
                <Compass className="w-4 h-4" />
              </div>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
