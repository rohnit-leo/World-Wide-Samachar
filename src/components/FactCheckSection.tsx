import React from 'react';
import { ShieldCheck, CheckCircle2, AlertTriangle } from 'lucide-react';
import { ALL_NEWS_ARTICLES } from '../data/newsData';
import { NewsArticle } from '../types';

interface FactCheckSectionProps {
  onSelectArticle: (article: NewsArticle) => void;
}

export const FactCheckSection: React.FC<FactCheckSectionProps> = ({ onSelectArticle }) => {
  const factCheckArticles = ALL_NEWS_ARTICLES.filter((a) => a.isFactCheck || a.tags.includes('फैक्ट चेक'));

  if (factCheckArticles.length === 0) return null;

  return (
    <section className="my-8 bg-emerald-950 text-white rounded-2xl p-4 sm:p-6 shadow-xl border border-emerald-800">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-emerald-800 pb-3 mb-5 gap-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center text-white">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold font-heading text-emerald-300">
              फैक्ट चेक (Fact Check & Verification)
            </h2>
            <p className="text-xs text-emerald-200">वायरल खबरों और दावों का सत्य एवं सटीक विश्लेषण</p>
          </div>
        </div>

        <span className="text-xs bg-emerald-900 text-emerald-300 border border-emerald-700 px-3 py-1 rounded-full font-bold flex items-center gap-1">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
          सत्यापित रिपोर्ट
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {factCheckArticles.map((article) => (
          <div
            key={article.id}
            onClick={() => onSelectArticle(article)}
            className="group cursor-pointer bg-emerald-900/60 rounded-xl p-4 border border-emerald-800 hover:border-emerald-400 transition-all shadow-md flex flex-col sm:flex-row gap-4 items-center"
          >
            <div className="relative w-full sm:w-40 aspect-[4/3] rounded-lg overflow-hidden shrink-0 bg-black">
              <img
                src={article.imageUrl}
                alt={article.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-90"
              />
              <span className="absolute top-2 left-2 bg-rose-600 text-white font-extrabold text-[10px] px-2 py-0.5 rounded flex items-center gap-1">
                <AlertTriangle className="w-3 h-3" />
                दावा फर्जी है
              </span>
            </div>

            <div className="flex-1">
              <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider">
                {article.category} • वायरल दावा
              </span>
              <h3 className="font-bold text-sm sm:text-base text-zinc-100 group-hover:text-amber-300 line-clamp-2 leading-snug font-heading my-1">
                {article.title}
              </h3>
              <p className="text-xs text-emerald-100 line-clamp-2">
                {article.summary}
              </p>
              <span className="text-[11px] text-emerald-400 font-semibold mt-2 inline-block">
                पूरा फैक्ट चेक देखें →
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
