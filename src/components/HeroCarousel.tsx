import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Eye, Clock, User, Flame, ArrowRight, MapPin } from 'lucide-react';
import { NewsArticle } from '../types';

interface HeroCarouselProps {
  articles: NewsArticle[];
  onSelectArticle: (article: NewsArticle) => void;
}

export const HeroCarousel: React.FC<HeroCarouselProps> = ({ articles, onSelectArticle }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const heroArticles = articles
    .filter((a) => a.isTopStory || a.isBreaking || a.isEditorsPick || (a.slideshowOrder !== undefined && a.slideshowOrder > 0))
    .sort((a, b) => {
      const orderA = a.slideshowOrder !== undefined && a.slideshowOrder > 0 ? a.slideshowOrder : 9999;
      const orderB = b.slideshowOrder !== undefined && b.slideshowOrder > 0 ? b.slideshowOrder : 9999;
      if (orderA !== orderB) return orderA - orderB;
      return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
    })
    .slice(0, 8);

  useEffect(() => {
    if (heroArticles.length === 0) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroArticles.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [heroArticles.length]);

  if (heroArticles.length === 0) return null;

  const current = heroArticles[currentIndex];

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % heroArticles.length);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + heroArticles.length) % heroArticles.length);
  };

  return (
    <div className="w-full relative my-4 rounded-xl overflow-hidden shadow-sm border border-[#E5E5E5] bg-[#222222] group font-sans">
      {/* Background Image with Gradient Overlay */}
      <div
        onClick={() => onSelectArticle(current)}
        className="relative aspect-[16/9] sm:aspect-[21/9] w-full cursor-pointer overflow-hidden"
      >
        <img
          src={current.imageUrl}
          alt={current.title}
          className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10" />

        {/* Floating Top Badges */}
        <div className="absolute top-4 left-4 flex flex-wrap items-center gap-2 z-20">
          <span className="bg-[#C60000] text-white text-[10px] px-2 py-0.5 rounded uppercase font-extrabold shadow-xs">
            {current.category}
          </span>
          {current.isBreaking && (
            <span className="bg-white text-[#C60000] font-bold text-[10px] px-2 py-0.5 rounded shadow-xs flex items-center gap-1 animate-pulse">
              <Flame className="w-3.5 h-3.5 text-[#C60000]" />
              मुख्य ब्रेकिंग
            </span>
          )}
          {current.location && (
            <span className="bg-black/60 text-gray-200 backdrop-blur-xs text-[10px] px-2 py-0.5 rounded border border-white/20 inline-flex items-center gap-1">
              <MapPin className="w-3 h-3 text-red-400" />
              <span>{current.location}</span>
            </span>
          )}
        </div>

        {/* Content Box */}
        <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 text-white z-20">
          <div className="flex items-center gap-3 text-[11px] text-white/80 font-medium mb-2">
            <span className="flex items-center gap-1">
              <User className="w-3.5 h-3.5 text-amber-300" />
              {current.author.name}
            </span>
            <span>|</span>
            <span className="flex items-center gap-1">
              <Eye className="w-3.5 h-3.5 text-gray-300" />
              <span>{current.views.toLocaleString('hi-IN')}</span>
            </span>
            <span>|</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-gray-300" />
              {current.readingTimeMinutes} मिनट
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold font-heading text-white line-clamp-2 leading-tight group-hover:text-amber-200 transition-colors drop-shadow-sm">
            {current.title}
          </h2>

          <p className="text-xs sm:text-sm text-gray-200 line-clamp-2 mt-2 max-w-3xl hidden sm:block">
            {current.subtitle || current.summary}
          </p>

          <div className="mt-3 flex items-center gap-3">
            <button
              onClick={() => onSelectArticle(current)}
              className="bg-[#C60000] hover:bg-red-700 text-white font-semibold text-xs px-4 py-2 rounded-md transition-colors flex items-center gap-2 shadow-sm"
            >
              <span>पूरा समाचार पढ़ें</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Slide Navigation Buttons */}
      <button
        onClick={handlePrev}
        className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/40 hover:bg-[#C60000] text-white backdrop-blur-xs transition-colors border border-white/20 z-30"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <button
        onClick={handleNext}
        className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/40 hover:bg-[#C60000] text-white backdrop-blur-xs transition-colors border border-white/20 z-30"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Pagination Indicators */}
      <div className="absolute bottom-2 right-6 flex items-center gap-1.5 z-30 bg-black/60 px-2.5 py-1 rounded-full backdrop-blur-xs border border-white/10">
        {heroArticles.map((_, idx) => (
          <button
            key={idx}
            onClick={(e) => {
              e.stopPropagation();
              setCurrentIndex(idx);
            }}
            className={`h-1.5 rounded-full transition-all ${
              currentIndex === idx ? 'w-5 bg-[#C60000]' : 'w-1.5 bg-white/50 hover:bg-white'
            }`}
          />
        ))}
      </div>
    </div>
  );
};
