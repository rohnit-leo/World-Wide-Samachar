import React from 'react';
import { TrendingUp, TrendingDown, Trophy } from 'lucide-react';
import { STOCK_DATA, CRICKET_MATCHES } from '../data/newsData';

export const CricketStockBar: React.FC = () => {
  return (
    <div className="w-full bg-white text-[#222222] rounded-xl p-2.5 my-3 shadow-xs border border-[#E5E5E5]">
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 text-xs">
        {/* Stock Market Ticker */}
        <div className="flex items-center gap-3 overflow-x-auto pb-1 lg:pb-0 scrollbar-none border-b lg:border-b-0 lg:border-r border-[#E5E5E5] pr-0 lg:pr-4">
          <div className="flex items-center gap-1 font-bold text-[#C60000] shrink-0">
            <TrendingUp className="w-4 h-4" />
            <span>बाजार का हाल:</span>
          </div>
          {STOCK_DATA.map((stock) => (
            <div key={stock.symbol} className="flex items-center gap-1.5 shrink-0 bg-[#F8F9FA] px-2.5 py-1 rounded-md border border-[#E5E5E5]">
              <span className="font-bold text-[#222222]">{stock.symbol}</span>
              <span className="font-mono text-gray-800">{stock.value}</span>
              <span className={`font-bold flex items-center ${stock.isPositive ? 'text-[#0F9D58]' : 'text-[#C60000]'}`}>
                {stock.isPositive ? <TrendingUp className="w-3 h-3 mr-0.5 inline" /> : <TrendingDown className="w-3 h-3 mr-0.5 inline" />}
                {stock.change}
              </span>
            </div>
          ))}
        </div>

        {/* Cricket Score Ticker */}
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-none shrink-0">
          <div className="flex items-center gap-1 font-bold text-[#C60000] shrink-0">
            <Trophy className="w-4 h-4 text-amber-500" />
            <span>लाइव स्कोर:</span>
          </div>
          {CRICKET_MATCHES.map((match, idx) => (
            <div key={idx} className="flex items-center gap-2 bg-[#F8F9FA] px-2.5 py-1 rounded-md border border-[#E5E5E5]">
              <span className="text-gray-600 font-medium">{match.tournament}</span>
              <span className="font-bold text-[#222222]">{match.team1} {match.team1Score}</span>
              <span className="text-gray-400">vs</span>
              <span className="font-bold text-[#222222]">{match.team2} {match.team2Score}</span>
              <span className="text-[10px] bg-red-100 text-[#C60000] px-1.5 py-0.5 rounded font-bold ml-1">
                {match.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
