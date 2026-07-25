import React from 'react';
import { Newspaper, Sparkles } from 'lucide-react';

export const LoadingScreen: React.FC = () => {
  return (
    <div className="fixed inset-0 z-50 bg-[#1e1e1e] text-white flex flex-col items-center justify-center p-4">
      <div className="relative flex flex-col items-center">
        {/* Animated Brand Logo Icon */}
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#C60000] to-red-800 text-white flex flex-col items-center justify-center font-black shadow-2xl border-2 border-red-500 animate-pulse mb-6">
          <span className="text-3xl font-heading leading-none">WWS</span>
          <span className="text-[10px] tracking-widest text-yellow-300 uppercase font-mono">NEWS</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-black font-heading tracking-tight text-white mb-2">
          वर्ल्ड वाइड समाचार
        </h1>
        <p className="text-sm font-semibold text-amber-400 font-heading mb-8">
          सच्ची खबर • निष्पक्ष पत्रकारिता • सबसे पहले
        </p>

        {/* Progress Spinner */}
        <div className="w-48 h-1.5 bg-gray-800 rounded-full overflow-hidden relative">
          <div className="absolute left-0 top-0 bottom-0 bg-[#C60000] w-1/2 animate-[marquee_1.5s_infinite_linear]" />
        </div>

        <span className="text-xs text-gray-400 mt-4 font-mono">
          लोड हो रहा है... (Loading Portal Data)
        </span>
      </div>
    </div>
  );
};
