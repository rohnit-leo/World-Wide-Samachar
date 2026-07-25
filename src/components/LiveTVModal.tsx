import React, { useState } from 'react';
import { X, Tv, Radio, Play, Pause, Volume2, VolumeX, Flame, Share2, Maximize } from 'lucide-react';
import { BREAKING_NEWS_TICKERS } from '../data/newsData';

interface LiveTVModalProps {
  onClose: () => void;
}

export const LiveTVModal: React.FC<LiveTVModalProps> = ({ onClose }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);

  return (
    <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 text-white">
      <div className="bg-slate-900 border border-slate-800 max-w-5xl w-full rounded-2xl overflow-hidden shadow-2xl relative flex flex-col">
        {/* Header Bar */}
        <div className="bg-black border-b border-slate-800 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#C60000] text-white flex items-center justify-center font-bold">
              <Tv className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold font-heading text-white flex items-center gap-2">
                <span>वर्ल्ड वाइड समाचार - लाइव टीवी (LIVE)</span>
                <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-ping"></span>
              </h2>
              <span className="text-[11px] text-gray-400">24x7 निरंतर हिंदी न्यूज़ ब्रॉडकास्ट</span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-slate-800 hover:bg-red-600 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Screen Area */}
        <div className="relative aspect-video w-full bg-black overflow-hidden flex items-center justify-center">
          <img
            src="https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=1600&auto=format&fit=crop&q=80"
            alt="Live TV Stream"
            className="w-full h-full object-cover opacity-75"
          />

          {/* Overlaid News Graphics Anchor Studio */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30 pointer-events-none" />

          {/* Live Watermark Logo */}
          <div className="absolute top-4 left-4 bg-red-600 text-white font-black text-xs px-3 py-1 rounded shadow-lg flex items-center gap-1.5 z-20">
            <Radio className="w-4 h-4 animate-pulse" />
            <span>WWS LIVE</span>
          </div>

          {/* Player Overlay Controls */}
          <div className="absolute inset-0 flex items-center justify-center">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-16 h-16 rounded-full bg-[#C60000]/90 hover:bg-[#C60000] text-white flex items-center justify-center shadow-2xl transition-transform hover:scale-110"
            >
              {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 fill-white ml-1" />}
            </button>
          </div>

          {/* Bottom Live Ticker Banner Overlay */}
          <div className="absolute bottom-0 left-0 right-0 bg-red-950/90 text-white border-t-2 border-[#C60000] p-2 flex items-center overflow-hidden">
            <div className="bg-[#C60000] text-white px-3 py-1 text-xs font-bold shrink-0 flex items-center gap-1">
              <Flame className="w-3.5 h-3.5 text-yellow-300 animate-bounce" />
              <span>ब्रेकिंग न्यूज़</span>
            </div>
            <div className="overflow-hidden relative w-full">
              <div className="animate-marquee flex items-center gap-8 whitespace-nowrap text-xs font-semibold text-amber-200">
                {BREAKING_NEWS_TICKERS.ticker1.map((item, idx) => (
                  <span key={idx}>★ {item}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Video Player Bottom Controls & Information */}
        <div className="bg-slate-900 p-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="p-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-white"
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
            </button>
            <span className="text-gray-300">एचडी स्ट्रीमिंग: 1080p Ultra HD</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-gray-400">2,410 दर्शक ऑनलाइन</span>
          </div>
        </div>
      </div>
    </div>
  );
};
