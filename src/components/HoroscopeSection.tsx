import React, { useState } from 'react';
import { Sparkles, X, Calendar, Compass, ShieldCheck } from 'lucide-react';
import { HOROSCOPE_SIGNS } from '../data/newsData';
import { ZodiacSign } from '../types';

export const HoroscopeSection: React.FC = () => {
  const [selectedSign, setSelectedSign] = useState<ZodiacSign | null>(null);

  return (
    <section className="my-8 bg-gradient-to-r from-purple-950 via-slate-900 to-indigo-950 text-white rounded-2xl p-4 sm:p-6 shadow-xl border border-purple-900/50 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
      
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-purple-800/60 pb-3 mb-5 gap-2">
        <div className="flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-amber-400 animate-spin" style={{ animationDuration: '8s' }} />
          <h2 className="text-xl sm:text-2xl font-bold font-heading text-amber-300">
            दैनिक राशिफल (Daily Horoscope)
          </h2>
        </div>
        <span className="text-xs text-purple-200 bg-purple-900/80 px-3 py-1 rounded-full border border-purple-700">
          आज का भाग्यफल • सभी 12 राशियां
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {HOROSCOPE_SIGNS.map((sign) => (
          <div
            key={sign.id}
            onClick={() => setSelectedSign(sign)}
            className="group cursor-pointer bg-purple-900/40 hover:bg-purple-800/60 border border-purple-700/50 hover:border-amber-400/80 rounded-xl p-3 text-center transition-all duration-300 hover:-translate-y-1 shadow-md flex flex-col items-center"
          >
            <div className="text-3xl mb-1 group-hover:scale-110 transition-transform">{sign.symbol}</div>
            <h3 className="font-bold text-sm text-amber-200 font-heading">{sign.nameHi}</h3>
            <span className="text-[10px] text-purple-300">{sign.nameEn}</span>
            <span className="mt-2 text-[10px] bg-purple-950 text-amber-400 px-2 py-0.5 rounded-full font-semibold border border-purple-800">
              राशिफल देखें →
            </span>
          </div>
        ))}
      </div>

      {/* Detailed Horoscope Modal */}
      {selectedSign && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 text-white rounded-2xl border border-purple-500/40 max-w-lg w-full p-6 shadow-2xl relative animate-in fade-in zoom-in duration-200">
            <button
              onClick={() => setSelectedSign(null)}
              className="absolute top-4 right-4 p-1 rounded-full bg-slate-800 text-gray-300 hover:text-white hover:bg-red-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 border-b border-purple-800 pb-4 mb-4">
              <span className="text-4xl bg-purple-950 p-3 rounded-xl border border-purple-700">{selectedSign.symbol}</span>
              <div>
                <h3 className="text-2xl font-bold text-amber-300 font-heading">{selectedSign.nameHi} ({selectedSign.nameEn})</h3>
                <div className="flex items-center gap-1.5 text-xs text-purple-300 mt-0.5">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{selectedSign.datesHi}</span>
                </div>
              </div>
            </div>

            <div className="space-y-4 text-sm text-slate-200">
              <div className="bg-purple-950/60 p-4 rounded-xl border border-purple-800/80 leading-relaxed">
                <span className="text-amber-400 font-bold block mb-1.5 flex items-center gap-1.5 text-xs">
                  <Sparkles className="w-4 h-4" /> आज की भविष्यवाणी:
                </span>
                {selectedSign.prediction}
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="bg-slate-800/80 p-3 rounded-lg border border-slate-700 flex items-center gap-2">
                  <Compass className="w-4 h-4 text-emerald-400" />
                  <div>
                    <span className="text-slate-400 block">शुभ अंक:</span>
                    <span className="font-bold text-amber-300 text-sm">{selectedSign.luckyNumber}</span>
                  </div>
                </div>

                <div className="bg-slate-800/80 p-3 rounded-lg border border-slate-700 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-sky-400" />
                  <div>
                    <span className="text-slate-400 block">शुभ रंग:</span>
                    <span className="font-bold text-sky-300 text-sm">{selectedSign.luckyColor}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800 text-center">
              <button
                onClick={() => setSelectedSign(null)}
                className="bg-[#C60000] hover:bg-red-700 text-white font-bold text-xs px-6 py-2 rounded-lg transition-colors"
              >
                बन्द करें
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
