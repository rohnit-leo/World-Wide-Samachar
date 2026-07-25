import React from 'react';
import { Eye, Clock, Share2, Bookmark, Flame, MapPin, UserCheck, Play } from 'lucide-react';
import { NewsArticle } from '../types';

interface ArticleCardProps {
  article: NewsArticle;
  variant?: 'grid' | 'horizontal' | 'compact' | 'hero' | 'video';
  onSelect: (article: NewsArticle) => void;
  onShare?: (article: NewsArticle, e: React.MouseEvent) => void;
  onBookmark?: (articleId: string, e: React.MouseEvent) => void;
  isBookmarked?: boolean;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({
  article,
  variant = 'grid',
  onSelect,
  onShare,
  onBookmark,
  isBookmarked = false
}) => {
  const formatDate = (isoString: string) => {
    try {
      const date = new Date(isoString);
      return date.toLocaleDateString('hi-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      });
    } catch {
      return isoString;
    }
  };

  if (variant === 'hero') {
    return (
      <div
        onClick={() => onSelect(article)}
        className="group relative cursor-pointer overflow-hidden rounded-xl shadow-md border border-gray-200 bg-white hover:shadow-xl transition-all duration-300 flex flex-col h-full"
      >
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-gray-100">
          <img
            src={article.imageUrl}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
          
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
            <span className="bg-[#C60000] text-white text-xs font-bold px-2.5 py-1 rounded shadow-sm uppercase tracking-wide">
              {article.category}
            </span>
            {article.isBreaking && (
              <span className="bg-amber-500 text-black font-extrabold text-xs px-2.5 py-1 rounded shadow-sm flex items-center gap-1 animate-pulse">
                <Flame className="w-3.5 h-3.5" />
                ब्रेकिंग
              </span>
            )}
            {article.isFactCheck && (
              <span className="bg-emerald-600 text-white font-bold text-xs px-2.5 py-1 rounded shadow-sm flex items-center gap-1">
                <UserCheck className="w-3.5 h-3.5" />
                फैक्ट चेक
              </span>
            )}
          </div>

          <div className="absolute bottom-3 left-3 right-3 text-white">
            <div className="flex items-center gap-3 text-xs text-gray-200 mb-1.5">
              {article.location && (
                <span className="flex items-center gap-1 bg-black/40 px-2 py-0.5 rounded backdrop-blur-sm">
                  <MapPin className="w-3 h-3 text-red-400" />
                  {article.location}
                </span>
              )}
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3 text-gray-300" />
                {formatDate(article.publishedAt)}
              </span>
              <span className="flex items-center gap-1">
                <Eye className="w-3 h-3 text-gray-300" />
                {article.views.toLocaleString('hi-IN')}
              </span>
            </div>
            <h2 className="text-lg sm:text-2xl font-bold font-heading line-clamp-2 text-white group-hover:text-yellow-300 transition-colors leading-tight">
              {article.title}
            </h2>
          </div>
        </div>

        <div className="p-4 flex flex-col justify-between flex-1">
          <p className="text-gray-600 text-xs sm:text-sm line-clamp-2 mb-3">
            {article.subtitle || article.summary}
          </p>

          <div className="flex items-center justify-between text-xs text-gray-500 pt-3 border-t border-gray-100 mt-auto">
            <div className="flex items-center gap-2">
              <img
                src={article.author.avatar}
                alt={article.author.name}
                className="w-6 h-6 rounded-full object-cover border border-gray-200"
              />
              <span className="font-medium text-gray-700">{article.author.name}</span>
            </div>

            <div className="flex items-center gap-2">
              {onBookmark && (
                <button
                  onClick={(e) => onBookmark(article.id, e)}
                  className="p-1.5 hover:bg-gray-100 rounded-full text-gray-500 hover:text-[#C60000] transition-colors"
                  title="बुकमार्क करें"
                >
                  <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-[#C60000] text-[#C60000]' : ''}`} />
                </button>
              )}
              {onShare && (
                <button
                  onClick={(e) => onShare(article, e)}
                  className="p-1.5 hover:bg-gray-100 rounded-full text-gray-500 hover:text-blue-600 transition-colors"
                  title="शेयर करें"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'horizontal') {
    return (
      <div
        onClick={() => onSelect(article)}
        className="group cursor-pointer bg-white rounded-lg p-3 border border-gray-200 hover:border-red-300 hover:shadow-md transition-all flex gap-3 sm:gap-4 items-center"
      >
        <div className="relative w-28 sm:w-36 h-20 sm:h-24 shrink-0 overflow-hidden rounded bg-gray-100">
          <img
            src={article.imageUrl}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
          <span className="absolute bottom-1 left-1 bg-black/70 text-white text-[10px] px-1.5 py-0.5 rounded backdrop-blur-sm">
            {article.category}
          </span>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 text-[11px] text-gray-500 mb-1">
            <span>{formatDate(article.publishedAt)}</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Eye className="w-3 h-3" />
              {article.views}
            </span>
          </div>
          <h3 className="font-bold text-xs sm:text-sm text-gray-900 group-hover:text-[#C60000] line-clamp-2 leading-snug font-heading">
            {article.title}
          </h3>
          <p className="text-gray-500 text-xs line-clamp-1 mt-1 hidden sm:block">
            {article.summary}
          </p>
        </div>
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div
        onClick={() => onSelect(article)}
        className="group cursor-pointer py-2.5 border-b border-gray-100 last:border-0 hover:bg-red-50/40 px-2 rounded transition-colors"
      >
        <div className="flex items-center gap-2 text-[11px] text-[#C60000] font-semibold mb-0.5">
          <span>{article.category}</span>
          <span className="text-gray-300">•</span>
          <span className="text-gray-400 font-normal">{formatDate(article.publishedAt)}</span>
        </div>
        <h4 className="font-semibold text-xs sm:text-sm text-gray-800 group-hover:text-[#C60000] line-clamp-2 leading-snug font-heading">
          {article.title}
        </h4>
      </div>
    );
  }

  if (variant === 'video') {
    return (
      <div
        onClick={() => onSelect(article)}
        className="group cursor-pointer relative bg-slate-900 text-white rounded-lg overflow-hidden border border-slate-800 hover:border-red-500 transition-all shadow-md"
      >
        <div className="relative aspect-video w-full overflow-hidden bg-black">
          <img
            src={article.imageUrl}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 opacity-85 transition-transform duration-300"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/10 transition-colors">
            <div className="w-12 h-12 rounded-full bg-[#C60000] text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
              <Play className="w-6 h-6 fill-white ml-0.5" />
            </div>
          </div>
          <span className="absolute bottom-2 right-2 bg-black/80 text-xs text-white px-2 py-0.5 rounded font-mono">
            {article.readingTimeMinutes}:00
          </span>
        </div>
        <div className="p-3">
          <span className="text-[10px] uppercase tracking-wider font-bold text-red-400 bg-red-950/80 px-2 py-0.5 rounded">
            वीडियो
          </span>
          <h4 className="font-bold text-xs sm:text-sm text-slate-100 group-hover:text-amber-300 line-clamp-2 mt-2 leading-snug">
            {article.title}
          </h4>
        </div>
      </div>
    );
  }

  // Standard Grid Card
  return (
    <div
      onClick={() => onSelect(article)}
      className="group cursor-pointer bg-white rounded-xl overflow-hidden border border-[#E5E5E5] hover:border-[#C60000] shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full font-sans"
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#F8F9FA]">
        <img
          src={article.imageUrl}
          alt={article.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
          <span className="bg-[#C60000] text-white text-[10px] font-extrabold px-2 py-0.5 rounded uppercase shadow-xs">
            {article.category}
          </span>
          {article.isBreaking && (
            <span className="bg-amber-500 text-black font-extrabold text-[10px] px-1.5 py-0.5 rounded flex items-center gap-0.5 shadow-xs">
              <Flame className="w-3 h-3" />
              ब्रेकिंग
            </span>
          )}
        </div>
      </div>

      <div className="p-3.5 flex flex-col justify-between flex-1">
        <div>
          <div className="flex items-center gap-2 text-[11px] text-gray-500 mb-1.5">
            <span>{formatDate(article.publishedAt)}</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Eye className="w-3 h-3" />
              👁️ {article.views}
            </span>
          </div>

          <h3 className="font-bold text-sm sm:text-base text-[#222222] group-hover:text-[#C60000] line-clamp-2 leading-snug font-heading mb-2 transition-colors">
            {article.title}
          </h3>

          <p className="text-gray-600 text-xs line-clamp-2 mb-3 leading-relaxed">
            {article.summary}
          </p>
        </div>

        <div className="flex items-center justify-between text-xs text-gray-500 pt-2.5 border-t border-[#E5E5E5]">
          <span className="text-[11px] text-gray-500 truncate max-w-[140px]">
            {article.author.name}
          </span>

          <div className="flex items-center gap-2">
            {onBookmark && (
              <button
                onClick={(e) => onBookmark(article.id, e)}
                className="p-1 hover:bg-[#F8F9FA] rounded text-gray-400 hover:text-[#C60000]"
              >
                <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-[#C60000] text-[#C60000]' : ''}`} />
              </button>
            )}
            {onShare && (
              <button
                onClick={(e) => onShare(article, e)}
                className="p-1 hover:bg-[#F8F9FA] rounded text-gray-400 hover:text-[#C60000]"
              >
                <Share2 className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
