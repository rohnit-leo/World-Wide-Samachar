import React from 'react';
import { NewsArticle } from '../types';

interface LatestNewsProps {
  articles: NewsArticle[];
  onSelectArticle: (article: NewsArticle) => void;
}

export const LatestNews: React.FC<LatestNewsProps> = ({ articles, onSelectArticle }) => {
  // Articles are already sorted by newest first
  const latestArticles = articles.slice(0, 4);

  if (latestArticles.length === 0) return null;

  return (
    <section className="mb-6">
      <div className="flex items-center justify-between border-b-2 border-[#C60000] pb-2 mb-4">
        <h2 className="text-2xl font-bold font-heading text-gray-900 flex items-center gap-2">
          <span className="w-3 h-3 bg-[#C60000] rounded-full animate-pulse"></span>
          <span>ताज़ा ख़बरें (Latest News)</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {latestArticles.map((article) => (
          <div
            key={article.id}
            onClick={() => onSelectArticle(article)}
            className="group cursor-pointer bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col h-full"
          >
            <div className="relative h-40 overflow-hidden">
              <img
                src={article.imageUrl}
                alt={article.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute top-2 left-2 bg-[#C60000] text-white text-[10px] font-bold px-2 py-0.5 rounded shadow">
                {article.category}
              </div>
            </div>
            <div className="p-3 flex flex-col flex-grow">
              <h3 className="font-bold text-gray-900 text-sm leading-snug group-hover:text-[#C60000] transition-colors line-clamp-3">
                {article.title}
              </h3>
              <div className="mt-auto pt-3 flex items-center justify-between text-[11px] text-gray-500 font-semibold">
                <span>{new Date(article.publishedAt).toLocaleString('hi-IN', { hour: '2-digit', minute: '2-digit', day: '2-digit', month: 'short' })}</span>
                <span className="text-[#C60000]">और पढ़ें &rarr;</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
