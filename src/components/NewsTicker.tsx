import React from 'react';
import { Flame } from 'lucide-react';
import { BREAKING_NEWS_TICKERS } from '../data/newsData';
import { NewsArticle } from '../types';

interface NewsTickerProps {
  tickers?: string[];
  articles?: NewsArticle[];
  onSelectHeadline?: (headlineText: string) => void;
  onSelectArticle?: (article: NewsArticle) => void;
}

export const NewsTicker: React.FC<NewsTickerProps> = ({
  tickers,
  articles = [],
  onSelectHeadline,
  onSelectArticle
}) => {
  const displayTickers = tickers && tickers.length > 0 ? tickers : BREAKING_NEWS_TICKERS.ticker1;

  const handleClickTickerItem = (tickerText: string) => {
    if (onSelectArticle && articles.length > 0) {
      // Find article by title or search match
      const matched = articles.find(
        (a) =>
          a.title.toLowerCase().includes(tickerText.toLowerCase().slice(0, 15)) ||
          tickerText.toLowerCase().includes(a.title.toLowerCase().slice(0, 15))
      );
      if (matched) {
        onSelectArticle(matched);
        return;
      }
      // Fallback: select first breaking/top article
      const fallback = articles.find((a) => a.isBreaking || a.isTopStory) || articles[0];
      if (fallback) {
        onSelectArticle(fallback);
        return;
      }
    }

    if (onSelectHeadline) {
      onSelectHeadline(tickerText);
    }
  };

  return (
    <div className="w-full my-2 font-sans select-none">
      {/* Clickable Breaking News Marquee Ticker */}
      <div className="bg-[#C60000] text-white py-1 px-4 flex items-center overflow-hidden h-9 shrink-0 rounded-md shadow-xs">
        <div className="bg-white text-[#C60000] text-[10px] font-extrabold px-2.5 py-1 rounded mr-3 flex-shrink-0 uppercase tracking-wider shadow-xs flex items-center gap-1.5">
          <Flame className="w-3.5 h-3.5 text-[#C60000] fill-[#C60000] animate-bounce" />
          <span>ब्रेकिंग न्यूज़</span>
        </div>

        <div className="overflow-hidden relative w-full flex items-center h-full">
          <div className="animate-marquee flex items-center gap-12 whitespace-nowrap text-xs font-semibold text-white">
            {displayTickers.concat(displayTickers).map((item, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleClickTickerItem(item)}
                className="cursor-pointer hover:underline hover:text-yellow-300 transition-colors flex items-center gap-2 text-left bg-transparent border-none p-0 outline-none"
                title="पूरा समाचार पढ़ने के लिए क्लिक करें"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-yellow-300 animate-pulse"></span>
                <span>{item}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
