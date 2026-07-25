import React from 'react';
import { Flame, BellRing, Megaphone } from 'lucide-react';
import { BREAKING_NEWS_TICKERS } from '../data/newsData';

interface NewsTickerProps {
  onSelectHeadline?: (text: string) => void;
}

export const NewsTicker: React.FC<NewsTickerProps> = ({ onSelectHeadline }) => {
  return (
    <div className="w-full space-y-1.5 my-2 font-sans">
      {/* Ticker 1: Red Breaking News Ticker */}
      <div className="bg-[#C60000] text-white py-1 px-4 flex items-center overflow-hidden h-8 shrink-0 rounded-md shadow-xs">
        <div className="bg-white text-[#C60000] text-[10px] font-extrabold px-2 py-0.5 rounded mr-3 flex-shrink-0 uppercase tracking-wider shadow-xs flex items-center gap-1">
          <Flame className="w-3.5 h-3.5 text-[#C60000]" />
          <span>ब्रेकिंग न्यूज़</span>
        </div>
        <div className="overflow-hidden relative w-full flex items-center h-full">
          <div className="animate-marquee flex items-center gap-12 whitespace-nowrap text-xs font-medium text-white">
            {BREAKING_NEWS_TICKERS.ticker1.concat(BREAKING_NEWS_TICKERS.ticker1).map((item, idx) => (
              <span
                key={idx}
                onClick={() => onSelectHeadline && onSelectHeadline(item)}
                className="cursor-pointer hover:underline hover:text-amber-200 transition-colors flex items-center gap-2"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Ticker 2: Latest Updates */}
      <div className="bg-[#222222] text-white py-1 px-4 flex items-center overflow-hidden h-7 shrink-0 rounded-md text-xs">
        <div className="bg-white/15 text-white text-[10px] font-bold px-2 py-0.5 rounded mr-3 flex-shrink-0 flex items-center gap-1">
          <BellRing className="w-3 h-3 text-amber-300" />
          <span>ताज़ा अपडेट्स</span>
        </div>
        <div className="overflow-hidden relative w-full flex items-center h-full">
          <div className="animate-marquee-fast flex items-center gap-10 whitespace-nowrap text-xs text-gray-200">
            {BREAKING_NEWS_TICKERS.ticker2.concat(BREAKING_NEWS_TICKERS.ticker2).map((item, idx) => (
              <span key={idx} className="hover:text-white transition-colors flex items-center gap-2">
                <span className="text-amber-400 font-bold">•</span>
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
