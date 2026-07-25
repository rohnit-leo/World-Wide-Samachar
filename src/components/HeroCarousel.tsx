import React, { useState, useEffect } from 'react';
import { NewsArticle } from '../types';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface HeroCarouselProps {
  articles: NewsArticle[];
  onSelectArticle: (article: NewsArticle) => void;
}

export const HeroCarousel: React.FC<HeroCarouselProps> = ({ articles, onSelectArticle }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // We use the top 5 most recent or important articles for the slideshow
  const heroArticles = articles.slice(0, 5);

  useEffect(() => {
    if (heroArticles.length === 0) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroArticles.length);
    }, 5000); // 5 seconds per slide
    return () => clearInterval(timer);
  }, [heroArticles.length]);

  if (heroArticles.length === 0) return null;

  const currentArticle = heroArticles[currentIndex];

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % heroArticles.length);
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + heroArticles.length) % heroArticles.length);

  return (
    <div className="relative w-full h-[400px] sm:h-[500px] mb-8 overflow-hidden rounded-2xl group">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-in-out cursor-pointer group-hover:scale-105"
        style={{ backgroundImage: `url(${currentArticle.imageUrl})` }}
        onClick={() => onSelectArticle(currentArticle)}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10 pointer-events-none">
        <span className="inline-block bg-[#C60000] text-white px-3 py-1 rounded-md text-xs font-bold mb-3 shadow-lg">
          {currentArticle.category}
        </span>
        <h2 className="text-white text-2xl sm:text-4xl font-extrabold font-heading leading-tight mb-2 drop-shadow-lg line-clamp-3">
          {currentArticle.title}
        </h2>
        <div className="flex items-center gap-4 text-gray-300 text-xs sm:text-sm font-semibold">
          <span>{currentArticle.source || 'World Wide Samachar'}</span>
          <span>•</span>
          <span>{new Date(currentArticle.publishedAt).toLocaleString('hi-IN', { hour: '2-digit', minute: '2-digit', day: '2-digit', month: 'short' })}</span>
        </div>
      </div>

      {/* Controls */}
      <button 
        onClick={(e) => { e.stopPropagation(); prevSlide(); }}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/30 hover:bg-[#C60000] text-white rounded-full flex items-center justify-center backdrop-blur-sm transition-colors z-10"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button 
        onClick={(e) => { e.stopPropagation(); nextSlide(); }}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/30 hover:bg-[#C60000] text-white rounded-full flex items-center justify-center backdrop-blur-sm transition-colors z-10"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 right-6 flex gap-2 z-10">
        {heroArticles.map((_, idx) => (
          <button
            key={idx}
            onClick={(e) => { e.stopPropagation(); setCurrentIndex(idx); }}
            className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${idx === currentIndex ? 'bg-[#C60000] w-8' : 'bg-white/50 hover:bg-white'}`}
          />
        ))}
      </div>
    </div>
  );
};
