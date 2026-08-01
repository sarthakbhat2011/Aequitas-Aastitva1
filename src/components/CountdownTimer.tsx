import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Sparkles } from 'lucide-react';

interface CountdownTimerProps {
  targetDate?: string; // ISO string or date
}

export const CountdownTimer: React.FC<CountdownTimerProps> = ({
  targetDate = '2026-11-14T09:00:00+05:30',
}) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTime = () => {
      const difference = +new Date(targetDate) - +new Date();
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div className="inline-flex items-center gap-3 md:gap-6 bg-[#141414]/90 border border-[#C9A34E]/30 rounded-full px-5 py-2.5 backdrop-blur-xl shadow-[0_0_25px_rgba(201,163,78,0.15)]">
      <div className="flex items-center gap-2 text-[#C9A34E]">
        <Clock className="w-4 h-4 animate-pulse" />
        <span className="font-label-caps text-[10px] md:text-xs tracking-widest uppercase text-[#D9D7D2] font-semibold hidden sm:inline">
          Assembly Conclave In:
        </span>
      </div>

      <div className="flex items-center gap-2 font-mono text-xs md:text-sm font-bold text-[#F5F3ED]">
        <div className="flex flex-col items-center">
          <span className="text-[#C9A34E]">{String(timeLeft.days).padStart(2, '0')}</span>
          <span className="font-label-caps text-[8px] text-[#75735B] uppercase">Days</span>
        </div>
        <span className="text-[#C9A34E]/40 font-normal">:</span>
        <div className="flex flex-col items-center">
          <span className="text-[#F5F3ED]">{String(timeLeft.hours).padStart(2, '0')}</span>
          <span className="font-label-caps text-[8px] text-[#75735B] uppercase">Hrs</span>
        </div>
        <span className="text-[#C9A34E]/40 font-normal">:</span>
        <div className="flex flex-col items-center">
          <span className="text-[#F5F3ED]">{String(timeLeft.minutes).padStart(2, '0')}</span>
          <span className="font-label-caps text-[8px] text-[#75735B] uppercase">Min</span>
        </div>
        <span className="text-[#C9A34E]/40 font-normal">:</span>
        <div className="flex flex-col items-center">
          <span className="text-[#C9A34E]">{String(timeLeft.seconds).padStart(2, '0')}</span>
          <span className="font-label-caps text-[8px] text-[#75735B] uppercase">Sec</span>
        </div>
      </div>
    </div>
  );
};
