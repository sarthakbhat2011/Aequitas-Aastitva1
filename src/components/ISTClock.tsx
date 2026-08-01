import React, { useState, useEffect } from 'react';

export const ISTClock: React.FC = () => {
  const [istDate, setIstDate] = useState<Date>(new Date());
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      // Get current date string converted to Asia/Kolkata timezone
      const now = new Date();
      const istString = now.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' });
      setIstDate(new Date(istString));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const hours = istDate.getHours();
  const minutes = istDate.getMinutes();
  const seconds = istDate.getSeconds();

  // Analog hands angles
  const hourAngle = (hours % 12) * 30 + minutes * 0.5;
  const minuteAngle = minutes * 6;
  const secondAngle = seconds * 6;

  // Formatted digital IST time
  const formattedDigital = istDate.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });

  return (
    <div
      className="relative flex items-center shrink-0 group cursor-pointer"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      onClick={() => setShowTooltip(!showTooltip)}
      title={`Indian Standard Time: ${formattedDigital} IST`}
    >
      {/* Tiny Aesthetic Circular Clock Face */}
      <div className="relative w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#141414]/90 border border-[#C9A34E]/50 flex items-center justify-center shadow-[0_0_12px_rgba(201,163,78,0.25)] hover:border-[#C9A34E] hover:scale-105 transition-all duration-300 backdrop-blur-md shrink-0">
        {/* Clock SVG Dial */}
        <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 100 100">
          {/* Dial Circle */}
          <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(201, 163, 78, 0.2)" strokeWidth="4" />
          
          {/* Hour Markers */}
          {[0, 90, 180, 270].map((deg, i) => (
            <line
              key={i}
              x1="50"
              y1="10"
              x2="50"
              y2="16"
              stroke="#C9A34E"
              strokeWidth="5"
              strokeLinecap="round"
              transform={`rotate(${deg} 50 50)`}
            />
          ))}

          {/* Hour Hand */}
          <line
            x1="50"
            y1="50"
            x2="50"
            y2="28"
            stroke="#F5F3ED"
            strokeWidth="6"
            strokeLinecap="round"
            transform={`rotate(${hourAngle} 50 50)`}
          />

          {/* Minute Hand */}
          <line
            x1="50"
            y1="50"
            x2="50"
            y2="18"
            stroke="#C9A34E"
            strokeWidth="4"
            strokeLinecap="round"
            transform={`rotate(${minuteAngle} 50 50)`}
          />

          {/* Second Hand */}
          <line
            x1="50"
            y1="50"
            x2="50"
            y2="14"
            stroke="#8A6743"
            strokeWidth="2"
            strokeLinecap="round"
            transform={`rotate(${secondAngle} 50 50)`}
          />

          {/* Center Pivot Point */}
          <circle cx="50" cy="50" r="4" fill="#C9A34E" />
        </svg>

        {/* Live Pulse Dot */}
        <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#C9A34E] rounded-full animate-ping opacity-75" />
        <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#C9A34E] rounded-full" />
      </div>

      {/* Floating IST Digital Time Tag */}
      <div
        className={`absolute right-0 top-9 sm:top-10 whitespace-nowrap bg-[#141414]/95 border border-[#C9A34E]/40 px-2.5 sm:px-3 py-1 rounded-md text-[10px] font-mono text-[#F5F3ED] shadow-xl backdrop-blur-xl transition-all duration-200 pointer-events-none z-50 flex items-center gap-1.5 ${
          showTooltip ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-1 pointer-events-none'
        }`}
      >
        <span className="text-[#C9A34E] font-bold">IST</span>
        <span>{formattedDigital}</span>
        <span className="text-[8px] text-[#75735B] uppercase hidden sm:inline">(UTC+5:30)</span>
      </div>
    </div>
  );
};
