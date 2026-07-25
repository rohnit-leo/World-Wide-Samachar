import React from 'react';
import { Quote, Feather, ArrowRight } from 'lucide-react';
import { ALL_NEWS_ARTICLES } from '../data/newsData';
import { NewsArticle } from '../types';

interface OpinionSectionProps {
  onSelectArticle: (article: NewsArticle) => void;
}

export const OpinionSection: React.FC<OpinionSectionProps> = ({ onSelectArticle }) => {
  const opinionArticles = ALL_NEWS_ARTICLES.filter((a) => a.isOpinion || a.category === 'व्यापार एवं अर्थव्यवस्था').slice(0, 3);

  return (
    <section className="my-8 bg-amber-50/60 rounded-2xl p-4 sm:p-6 border border-amber-200/80 shadow-sm">
      <div className="flex items-center justify-between border-b-2 border-amber-700 pb-3 mb-5">
        <div className="flex items-center gap-2">
          <Feather className="w-6 h-6 text-amber-800" />
          <h2 className="text-xl sm:text-2xl font-bold font-heading text-amber-950">
            विचार एवं संपादकीय (Editorial & Opinion)
          </h2>
        </div>
        <span className="text-xs font-bold text-amber-800 bg-amber-200/80 px-3 py-1 rounded-full">
          विशेषज्ञों के विचार
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {opinionArticles.map((article) => (
          <div
            key={article.id}
            onClick={() => onSelectArticle(article)}
            className="group cursor-pointer bg-white rounded-xl p-4 border border-amber-200/60 hover:border-amber-500 hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-3 mb-3">
                <img
                  src={article.author.avatar}
                  alt={article.author.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-amber-400"
                />
                <div>
                  <h4 className="font-bold text-xs text-gray-900 font-heading">{article.author.name}</h4>
                  <span className="text-[11px] text-amber-700 font-medium block">{article.author.role}</span>
                </div>
              </div>

              <div className="relative pl-4 border-l-2 border-amber-400 my-2">
                <Quote className="w-4 h-4 text-amber-300 absolute -top-1 -left-2 fill-amber-100" />
                <h3 className="font-bold text-sm text-gray-900 group-hover:text-[#C60000] line-clamp-2 leading-snug font-heading">
                  {article.title}
                </h3>
              </div>

              <p className="text-xs text-gray-600 line-clamp-3 mt-2 leading-relaxed">
                {article.summary}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-amber-800 font-semibold">
              <span>विचार-विमर्श पढ़ें</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
